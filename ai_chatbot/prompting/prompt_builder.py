import json
import os
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from utils.language_detection import LanguageDetector


@dataclass
class TableSchema:
    """Represents a database table schema"""
    name: str
    columns: List[Dict[str, str]]
    description: Optional[str] = None

    def __post_init__(self):
        """Validate column structure"""
        for col in self.columns:
            if 'name' not in col or 'type' not in col:
                raise ValueError("Each column must have 'name' and 'type' fields")


class PromptBuilder:
    """
    Advanced prompt builder for SQL generation with bilingual support
    """

    def __init__(self, schemas_path: str = "data/table_schemas.json"):
        """
        Initialize the prompt builder

        Args:
            schemas_path (str): Path to the table schemas JSON file
        """
        self.schemas_path = schemas_path
        self.schemas = self._load_schemas()
        self.language_detector = LanguageDetector()

        # Language-specific templates
        self.templates = {
            'english': {
                'system_prompt': """You are an expert SQL query generator. Convert natural language questions into valid SQL queries.

Rules:
1. Generate only SELECT statements unless explicitly asked for INSERT, UPDATE, or DELETE
2. Use proper SQL syntax and formatting
3. Include appropriate WHERE clauses for filtering
4. Use JOINs when querying multiple tables
5. Handle aggregations (COUNT, SUM, AVG, MAX, MIN) correctly
6. Return only the SQL query without explanations
7. Use standard SQL syntax compatible with most databases

Available tables and schemas:
{schema_info}

Examples:
{examples}""",
                'user_template': """Question: {question}
SQL:""",
                'schema_template': """Table: {table_name}
Columns: {columns}
Description: {description}""",
                'examples_intro': "Here are some example queries:",
                'error_context': "The previous query had an error. Please fix it:"
            },
            'romanian': {
                'system_prompt': """Ești un generator expert de interogări SQL. Convertește întrebările în limbaj natural în interogări SQL valide.

Reguli:
1. Generează doar declarații SELECT dacă nu se cere explicit INSERT, UPDATE sau DELETE
2. Folosește sintaxa SQL corectă și formatarea
3. Include clauze WHERE corespunzătoare pentru filtrare
4. Folosește JOIN-uri când interoghezi mai multe tabele
5. Gestionează agregările (COUNT, SUM, AVG, MAX, MIN) corect
6. Returnează doar interogarea SQL fără explicații
7. Folosește sintaxa SQL standard compatibilă cu majoritatea bazelor de date

Tabele și scheme disponibile:
{schema_info}

Exemple:
{examples}""",
                'user_template': """Întrebare: {question}
SQL:""",
                'schema_template': """Tabel: {table_name}
Coloane: {columns}
Descriere: {description}""",
                'examples_intro': "Iată câteva exemple de interogări:",
                'error_context': "Interogarea anterioară a avut o eroare. Te rog să o corectezi:"
            }
        }

        # Default examples for different languages
        self.default_examples = {
            'english': [
                {
                    'question': "What is the average salary of engineers?",
                    'sql': "SELECT AVG(salary) FROM workers WHERE role = 'engineer';"
                },
                {
                    'question': "Show me all employees in the IT department",
                    'sql': "SELECT * FROM workers WHERE department = 'IT';"
                },
                {
                    'question': "How many users are there?",
                    'sql': "SELECT COUNT(*) FROM users;"
                }
            ],
            'romanian': [
                {
                    'question': "Care este salariul mediu al inginerilor?",
                    'sql': "SELECT AVG(salary) FROM workers WHERE role = 'engineer';"
                },
                {
                    'question': "Arată-mi toți angajații din departamentul IT",
                    'sql': "SELECT * FROM workers WHERE department = 'IT';"
                },
                {
                    'question': "Câți utilizatori sunt?",
                    'sql': "SELECT COUNT(*) FROM users;"
                }
            ]
        }

    def _load_schemas(self) -> Dict[str, TableSchema]:
        """Load table schemas from JSON file"""
        schemas = {}

        if os.path.exists(self.schemas_path):
            try:
                with open(self.schemas_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)

                for table_name, table_data in data.items():
                    schemas[table_name] = TableSchema(
                        name=table_name,
                        columns=table_data.get('columns', []),
                        description=table_data.get('description')
                    )
            except Exception as e:
                print(f"Warning: Could not load schemas from {self.schemas_path}: {e}")

        return schemas

    def _format_schema_info(self, language: str) -> str:
        """Format schema information for the prompt"""
        if not self.schemas:
            return "No table schemas available."

        template = self.templates[language]['schema_template']
        schema_parts = []

        for schema in self.schemas.values():
            columns_str = ", ".join([
                f"{col['name']} ({col['type']}) - {col.get('description', '')}"
                for col in schema.columns
            ])

            schema_info = template.format(
                table_name=schema.name,
                columns=columns_str,
                description=schema.description or "No description available"
            )
            schema_parts.append(schema_info)

        return "\n\n".join(schema_parts)

    def _format_examples(self, language: str, custom_examples: Optional[List[Dict]] = None) -> str:
        """Format examples for the prompt"""
        examples = custom_examples or self.default_examples.get(language, [])

        if not examples:
            return ""

        examples_intro = self.templates[language]['examples_intro']
        formatted_examples = []

        for example in examples:
            formatted_examples.append(f"Q: {example['question']}\nA: {example['sql']}")

        return f"{examples_intro}\n\n" + "\n\n".join(formatted_examples)

    def build_system_prompt(self,
                            language: str = 'english',
                            custom_examples: Optional[List[Dict]] = None,
                            include_schemas: bool = True) -> str:
        """
        Build the system prompt for SQL generation

        Args:
            language (str): Language for the prompt ('english' or 'romanian')
            custom_examples (List[Dict], optional): Custom examples to include
            include_schemas (bool): Whether to include schema information

        Returns:
            str: Formatted system prompt
        """
        if language not in self.templates:
            language = 'english'

        template = self.templates[language]['system_prompt']

        # Format schema information
        schema_info = self._format_schema_info(language) if include_schemas else ""

        # Format examples
        examples = self._format_examples(language, custom_examples)

        return template.format(
            schema_info=schema_info,
            examples=examples
        )

    def build_user_prompt(self,
                          question: str,
                          language: Optional[str] = None,
                          context: Optional[str] = None,
                          previous_error: Optional[str] = None) -> str:
        """
        Build the user prompt for a specific question

        Args:
            question (str): The natural language question
            language (str, optional): Language for the prompt (auto-detected if None)
            context (str, optional): Additional context for the query
            previous_error (str, optional): Previous error to fix

        Returns:
            str: Formatted user prompt
        """
        # Auto-detect language if not provided
        if language is None:
            language = self.language_detector.detect_language(question)

        if language not in self.templates:
            language = 'english'

        template = self.templates[language]['user_template']

        # Build the prompt
        prompt_parts = []

        # Add context if provided
        if context:
            prompt_parts.append(f"Context: {context}")

        # Add error context if fixing a previous error
        if previous_error:
            error_context = self.templates[language]['error_context']
            prompt_parts.append(f"{error_context}\nError: {previous_error}")

        # Add the main question
        main_prompt = template.format(question=question)
        prompt_parts.append(main_prompt)

        return "\n\n".join(prompt_parts)

    def build_complete_prompt(self,
                              question: str,
                              language: Optional[str] = None,
                              custom_examples: Optional[List[Dict]] = None,
                              context: Optional[str] = None,
                              previous_error: Optional[str] = None,
                              include_schemas: bool = True) -> Dict[str, str]:
        """
        Build complete prompt with system and user messages

        Args:
            question (str): The natural language question
            language (str, optional): Language for the prompt (auto-detected if None)
            custom_examples (List[Dict], optional): Custom examples to include
            context (str, optional): Additional context for the query
            previous_error (str, optional): Previous error to fix
            include_schemas (bool): Whether to include schema information

        Returns:
            Dict[str, str]: Dictionary with 'system' and 'user' prompts
        """
        # Auto-detect language if not provided
        if language is None:
            language = self.language_detector.detect_language(question)

        system_prompt = self.build_system_prompt(
            language=language,
            custom_examples=custom_examples,
            include_schemas=include_schemas
        )

        user_prompt = self.build_user_prompt(
            question=question,
            language=language,
            context=context,
            previous_error=previous_error
        )

        return {
            'system': system_prompt,
            'user': user_prompt,
            'language': language
        }

    def add_custom_example(self, language: str, question: str, sql: str):
        """
        Add a custom example to the default examples

        Args:
            language (str): Language for the example
            question (str): Natural language question
            sql (str): Corresponding SQL query
        """
        if language not in self.default_examples:
            self.default_examples[language] = []

        self.default_examples[language].append({
            'question': question,
            'sql': sql
        })

    def get_relevant_tables(self, question: str) -> List[str]:
        """
        Get relevant table names based on the question

        Args:
            question (str): Natural language question

        Returns:
            List[str]: List of relevant table names
        """
        question_lower = question.lower()
        relevant_tables = []

        for table_name, schema in self.schemas.items():
            # Check if table name is mentioned
            if table_name.lower() in question_lower:
                relevant_tables.append(table_name)
                continue

            # Check if any column names are mentioned
            for column in schema.columns:
                if column['name'].lower() in question_lower:
                    relevant_tables.append(table_name)
                    break

        return relevant_tables

    def validate_question(self, question: str) -> Dict[str, Any]:
        """
        Validate if a question can be answered with available schemas

        Args:
            question (str): Natural language question

        Returns:
            Dict[str, Any]: Validation result with suggestions
        """
        relevant_tables = self.get_relevant_tables(question)

        result = {
            'is_valid': len(relevant_tables) > 0,
            'relevant_tables': relevant_tables,
            'language': self.language_detector.detect_language(question),
            'suggestions': []
        }

        if not result['is_valid']:
            available_tables = list(self.schemas.keys())
            result['suggestions'].append(f"Available tables: {', '.join(available_tables)}")

        return result

    def get_schema_summary(self) -> Dict[str, Any]:
        """
        Get a summary of available schemas

        Returns:
            Dict[str, Any]: Schema summary
        """
        summary = {
            'total_tables': len(self.schemas),
            'tables': {}
        }

        for name, schema in self.schemas.items():
            summary['tables'][name] = {
                'column_count': len(schema.columns),
                'columns': [col['name'] for col in schema.columns],
                'description': schema.description
            }

        return summary


# Convenience function for quick prompt generation
def generate_sql_prompt(question: str,
                        schemas_path: str = "data/table_schemas.json",
                        language: Optional[str] = None) -> Dict[str, str]:
    """
    Quick function to generate SQL prompt

    Args:
        question (str): Natural language question
        schemas_path (str): Path to schemas file
        language (str, optional): Language for prompt

    Returns:
        Dict[str, str]: Complete prompt dictionary
    """
    builder = PromptBuilder(schemas_path)
    return builder.build_complete_prompt(question, language)


# Example usage and testing
if __name__ == "__main__":
    # Initialize prompt builder
    builder = PromptBuilder()

    # Test questions
    test_questions = [
        "What is the average salary of engineers?",
        "Show me all employees in the IT department",
        "Care este salariul mediu al inginerilor?",
        "Arată-mi toți angajații din departamentul IT"
    ]

    print("Prompt Builder Tests:")
    print("=" * 60)

    for question in test_questions:
        print(f"\nQuestion: '{question}'")
        print("-" * 40)

        # Generate complete prompt
        prompt = builder.build_complete_prompt(question)

        print(f"Detected Language: {prompt['language']}")
        print(f"System Prompt Length: {len(prompt['system'])} characters")
        print(f"User Prompt: {prompt['user']}")

        # Validate question
        validation = builder.validate_question(question)
        print(f"Valid: {validation['is_valid']}")
        print(f"Relevant Tables: {validation['relevant_tables']}")

        print("=" * 60)