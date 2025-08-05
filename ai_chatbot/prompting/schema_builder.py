import json
import os
from typing import Dict, List, Optional, Any, Set
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


class SchemaBuilder:
    """
    Advanced prompt builder for SQL generation with bilingual support and smart table selection
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
                'schema_template': """Table: {table_name}
                Columns: {columns}
                Description: {description}""",
                'examples_intro': "Here are some example queries:",
                'error_context': "The previous query had an error. Please fix it:"
            },
            'romanian': {
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

        # Keywords to table mapping for Romanian and English questions
        self.table_keywords = {
            # IT and Home department
            'it': ['acasa', 'it'],
            'home': ['acasa'],
            'acasa': ['acasa'],
            'departament': ['acasa'],

            # Financial
            'financiar': ['financiar', 'facturi'],
            'financial': ['financiar', 'facturi'],
            'facturi': ['facturi', 'financiar'],
            'invoices': ['facturi', 'financiar'],
            'plata': ['financiar'],
            'payment': ['financiar'],
            'bani': ['financiar'],
            'money': ['financiar'],

            # Commercial
            'comercial': ['comercial', 'comenzi_comercial', 'oferte_comercial', 'clienti_comercial'],
            'commercial': ['comercial', 'comenzi_comercial', 'oferte_comercial', 'clienti_comercial'],
            'comenzi': ['comenzi_comercial', 'comenzi_proiectare', 'comenzi_aprovizionare'],
            'orders': ['comenzi_comercial', 'comenzi_proiectare', 'comenzi_aprovizionare'],
            'oferte': ['oferte_comercial', 'oferte_proiectare'],
            'offers': ['oferte_comercial', 'oferte_proiectare'],
            'clienti': ['clienti_comercial'],
            'clients': ['clienti_comercial'],
            'customers': ['clienti_comercial'],

            # Procurement
            'aprovizionare': ['aprovizionare', 'cereri_aprovizionare', 'comenzi_aprovizionare', 'nir_aprovizionare',
                              'bon_aprovizionare'],
            'procurement': ['aprovizionare', 'cereri_aprovizionare', 'comenzi_aprovizionare'],
            'purchasing': ['aprovizionare'],
            'cereri': ['cereri_aprovizionare'],
            'requests': ['cereri_aprovizionare'],
            'nir': ['nir_aprovizionare'],
            'bon': ['bon_aprovizionare'],
            'articole': ['articole_aprovizionare'],
            'articles': ['articole_aprovizionare'],

            # Production
            'productie': ['productie'],
            'production': ['productie'],
            'fabricatie': ['productie'],
            'manufacturing': ['productie'],

            # Engineering/Design
            'proiectare': ['proiectare_inginerie', 'comenzi_proiectare', 'oferte_proiectare'],
            'inginerie': ['proiectare_inginerie'],
            'engineering': ['proiectare_inginerie'],
            'design': ['proiectare_inginerie'],

            # Human Resources
            'resurse': ['resurse_umane'],
            'umane': ['resurse_umane'],
            'hr': ['resurse_umane'],
            'human': ['resurse_umane'],
            'resources': ['resurse_umane'],
            'angajati': ['resurse_umane'],
            'employees': ['resurse_umane'],
            'pontaj': ['resurse_umane', 'productie', 'proiectare_inginerie'],
            'timesheet': ['resurse_umane', 'productie', 'proiectare_inginerie'],

            # Management
            'management': ['management'],
            'conducere': ['management'],
            'leadership': ['management'],

            # Events
            'evenimente': ['evenimente'],
            'events': ['evenimente'],
            'activitati': ['evenimente'],
            'activities': ['evenimente'],

            # TODO
            'todo': ['to_do'],
            'task': ['to_do'],
            'sarcina': ['to_do'],
            'sarcini': ['to_do'],
            'tasks': ['to_do'],
            'lista': ['to_do'],
            'list': ['to_do'],

            # SMI (Integrated Management System)
            'smi': ['smi', 'smi_calitate', 'smi_mediu', 'smi_ssm'],
            'calitate': ['smi_calitate', 'smi'],
            'quality': ['smi_calitate', 'smi'],
            'mediu': ['smi_mediu', 'smi'],
            'environment': ['smi_mediu', 'smi'],
            'ssm': ['smi_ssm', 'smi'],
            'safety': ['smi_ssm', 'smi'],
            'securitate': ['smi_ssm', 'smi'],
            'sanatate': ['smi_ssm', 'smi'],
            'health': ['smi_ssm', 'smi'],

            # Maintenance
            'mentenanta': ['mentenanta'],
            'maintenance': ['mentenanta'],
            'reparatii': ['mentenanta'],
            'repairs': ['mentenanta'],

            # Deliveries
            'livrari': ['livrari'],
            'deliveries': ['livrari'],
            'transport': ['livrari', 'comenzi_aprovizionare'],

            # Service & Support
            'service': ['service_support'],
            'support': ['service_support'],
            'technical': ['service_support'],
            'tehnic': ['service_support'],

            # Vehicle Fleet
            'parc': ['parc_auto'],
            'auto': ['parc_auto'],
            'masini': ['parc_auto'],
            'cars': ['parc_auto'],
            'vehicles': ['parc_auto'],
            'fleet': ['parc_auto'],

            # Reports
            'rapoarte': ['rapoarte'],
            'reports': ['rapoarte'],
            'situatii': ['rapoarte', 'financiar'],
            'status': ['rapoarte'],

            # Registry
            'registru': ['registru', 'resurse_umane'],
            'registry': ['registru'],
            'evidenta': ['registru', 'smi_ssm'],
            'records': ['registru'],

            # Intrabooking
            'intrabooking': ['intrabooking'],
            'booking': ['intrabooking'],
            'rezervare': ['intrabooking'],
            'reservation': ['intrabooking'],

            # Utilities
            'utile': ['utile'],
            'utilities': ['utile'],
            'formulare': ['utile'],
            'forms': ['utile'],
            'fisiere': ['utile', 'smi'],
            'files': ['utile', 'smi'],
            'proceduri': ['utile'],
            'procedures': ['utile']
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

    def get_relevant_tables(self, user_question: str, max_tables: int = 5) -> Set[str]:
        """
        Analyze user question and return relevant table names

        Args:
            user_question (str): The user's question
            max_tables (int): Maximum number of tables to return

        Returns:
            Set[str]: Set of relevant table names
        """
        relevant_tables = set()
        question_lower = user_question.lower()

        # Remove common Romanian articles and prepositions for better matching
        words_to_remove = ['din', 'de', 'la', 'cu', 'pentru', 'despre', 'cum', 'ce', 'care', 'unde', 'cand', 'how',
                           'what', 'where', 'when', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'about']
        question_words = [word for word in question_lower.split() if word not in words_to_remove]

        # Score tables based on keyword matches
        table_scores = {}

        for keyword, tables in self.table_keywords.items():
            # Check if keyword appears in the question
            if keyword in question_lower or any(keyword in word for word in question_words):
                for table in tables:
                    if table in self.schemas:
                        table_scores[table] = table_scores.get(table, 0) + 1

        # If no specific matches, include main department tables
        if not table_scores:
            main_tables = ['acasa', 'financiar', 'comercial', 'aprovizionare', 'productie', 'resurse_umane']
            for table in main_tables:
                if table in self.schemas:
                    table_scores[table] = 1

        # Sort by score and take top tables
        sorted_tables = sorted(table_scores.items(), key=lambda x: x[1], reverse=True)
        relevant_tables = set([table for table, score in sorted_tables[:max_tables]])

        return relevant_tables

    def create_optimized_schema_info(self, user_question: str, format_type: str = "sql") -> str:
        """
        Create optimized schema information based on user question

        Args:
            user_question (str): The user's question
            format_type (str): Format type ('sql' for CREATE TABLE format, 'description' for readable format)

        Returns:
            str: Formatted schema information for relevant tables only
        """
        relevant_tables = self.get_relevant_tables(user_question)

        if not relevant_tables:
            return "-- No relevant schema information found"

        if format_type == "sql":
            return self._format_sql_schema(relevant_tables)
        else:
            return self._format_description_schema(relevant_tables)

    def _format_sql_schema(self, table_names: Set[str]) -> str:
        """Format schema as SQL CREATE TABLE statements"""
        schema_info = ""

        for table_name in sorted(table_names):
            if table_name in self.schemas:
                schema = self.schemas[table_name]
                columns_def = []

                for col in schema.columns:
                    col_def = f"{col['name']} {col['type']}"
                    if 'constraints' in col and 'PRIMARY KEY' in col['constraints']:
                        col_def += f" {col['constraints']}"
                    columns_def.append(col_def)

                columns_str = ",\n    ".join(columns_def)
                schema_info += f"CREATE TABLE {table_name} (\n    {columns_str}\n);\n\n"

        return schema_info.strip()

    def _format_description_schema(self, table_names: Set[str]) -> str:
        """Format schema as readable descriptions"""
        schema_parts = []

        for table_name in sorted(table_names):
            if table_name in self.schemas:
                schema = self.schemas[table_name]
                columns_str = ", ".join([
                    f"{col['name']} ({col['type']})"
                    for col in schema.columns
                ])

                schema_info = f"Table: {table_name}\nColumns: {columns_str}\nDescription: {schema.description or 'No description available'}"
                schema_parts.append(schema_info)

        return "\n\n".join(schema_parts)

    def _format_schema_info(self, language: str) -> str:
        """Format schema information for the prompt (legacy method - now returns optimized version)"""
        if not self.schemas:
            return "No table schemas available."

        # For backward compatibility, return all schemas in description format
        all_table_names = set(self.schemas.keys())
        return self._format_description_schema(all_table_names)

    def create_sqlcoder_prompt(self, user_question: str, include_examples: bool = False) -> str:
        """
        Create an optimized prompt specifically for SQLCoder model

        Args:
            user_question (str): The user's question
            include_examples (bool): Whether to include example queries

        Returns:
            str: Formatted prompt for SQLCoder
        """
        schema_info = self.create_optimized_schema_info(user_question, format_type="sql")

        prompt = f"""### Task
        Generate a SQL query to answer the following question. You will always need to return just the 'answer' column of the table you extract information from.
        
        ### Database Schema
        The query will run on a database with the following schema:
        
        {schema_info}
        
        ### Question
        {user_question}
        
        ### SQL
        """

        return prompt

    def get_table_info(self, table_name: str) -> Optional[TableSchema]:
        """Get information about a specific table"""
        return self.schemas.get(table_name)

    def list_all_tables(self) -> List[str]:
        """Get list of all available table names"""
        return list(self.schemas.keys())

    def search_tables_by_description(self, search_term: str) -> List[str]:
        """Search tables by description content"""
        matching_tables = []
        search_lower = search_term.lower()

        for table_name, schema in self.schemas.items():
            if schema.description and search_lower in schema.description.lower():
                matching_tables.append(table_name)

        return matching_tables