import json
import os
from typing import Dict, List, Optional, Set
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
        # Keywords to table mapping for Romanian and English questions
        self.table_keywords = {
            # IT
            'it': ['ai_it'],

            # Financial
            'financiar': ['ai_financiar', 'ai_facturi'],
            'financial': ['ai_financiar', 'ai_facturi'],
            'facturi': ['ai_facturi', 'ai_financiar'],
            'invoices': ['ai_facturi', 'ai_financiar'],
            'plata': ['ai_financiar'],
            'payment': ['ai_financiar'],
            'bani': ['ai_financiar'],
            'money': ['ai_financiar'],

            # Commercial
            'comercial': ['ai_comercial', 'ai_omenzi_comercial', 'ai_oferte_comercial', 'ai_clienti_comercial'],
            'commercial': ['ai_comercial', 'ai_omenzi_comercial', 'ai_oferte_comercial', 'ai_clienti_comercial'],
            'comenzi': ['ai_omenzi_comercial', 'ai_comenzi_proiectare', 'ai_comenzi_aprovizionare'],
            'orders': ['ai_omenzi_comercial', 'ai_comenzi_proiectare', 'ai_comenzi_aprovizionare'],
            'oferte': ['ai_oferte_comercial', 'ai_oferte_proiectare'],
            'offers': ['ai_oferte_comercial', 'ai_oferte_proiectare'],
            'clienti': ['ai_clienti_comercial'],
            'clients': ['ai_clienti_comercial'],
            'customers': ['ai_clienti_comercial'],

            # Procurement
            'aprovizionare': ['ai_aprovizionare', 'ai_cereri_aprovizionare', 'ai_comenzi_aprovizionare',
                              'ai_nir_aprovizionare', 'ai_bon_aprovizionare'],
            'procurement': ['ai_aprovizionare', 'ai_cereri_aprovizionare', 'ai_comenzi_aprovizionare'],
            'purchasing': ['ai_aprovizionare'],
            'cereri': ['ai_cereri_aprovizionare'],
            'requests': ['ai_cereri_aprovizionare'],
            'nir': ['ai_nir_aprovizionare'],
            'bon': ['ai_bon_aprovizionare'],
            'articole': ['ai_articole_aprovizionare'],
            'articles': ['ai_articole_aprovizionare'],

            # Production
            'productie': ['ai_productie'],
            'production': ['ai_productie'],
            'fabricatie': ['ai_productie'],
            'manufacturing': ['ai_productie'],

            # Engineering/Design
            'proiectare': ['ai_proiectare_inginerie', 'ai_comenzi_proiectare', 'ai_oferte_proiectare'],
            'inginerie': ['ai_proiectare_inginerie'],
            'engineering': ['ai_proiectare_inginerie'],
            'design': ['ai_proiectare_inginerie'],

            # Human Resources
            'resurse': ['ai_resurse_umane'],
            'umane': ['ai_resurse_umane'],
            'hr': ['ai_resurse_umane'],
            'human': ['ai_resurse_umane'],
            'resources': ['ai_resurse_umane'],
            'angajati': ['ai_resurse_umane'],
            'employees': ['ai_resurse_umane'],
            'pontaj': ['ai_resurse_umane', 'ai_productie', 'ai_proiectare_inginerie'],
            'timesheet': ['ai_resurse_umane', 'ai_productie', 'ai_proiectare_inginerie'],

            # Management
            'management': ['ai_management'],
            'conducere': ['ai_management'],
            'leadership': ['ai_management'],

            # Events
            'evenimente': ['ai_evenimente'],
            'events': ['ai_evenimente'],
            'activitati': ['ai_evenimente'],
            'activities': ['ai_evenimente'],

            # TODO
            'todo': ['ai_to_do'],
            'task': ['ai_to_do'],
            'sarcina': ['ai_to_do'],
            'sarcini': ['ai_to_do'],
            'tasks': ['ai_to_do'],
            'lista': ['ai_to_do'],
            'list': ['ai_to_do'],

            # SMI (Integrated Management System)
            'smi': ['ai_smi', 'ai_smi_calitate', 'ai_smi_mediu', 'ai_smi_ssm'],
            'calitate': ['ai_smi_calitate', 'ai_smi'],
            'quality': ['ai_smi_calitate', 'ai_smi'],
            'mediu': ['ai_smi_mediu', 'ai_smi'],
            'environment': ['ai_smi_mediu', 'ai_smi'],
            'ssm': ['ai_smi_ssm', 'ai_smi'],
            'safety': ['ai_smi_ssm', 'ai_smi'],
            'securitate': ['ai_smi_ssm', 'ai_smi'],
            'sanatate': ['ai_smi_ssm', 'ai_smi'],
            'health': ['ai_smi_ssm', 'ai_smi'],

            # Maintenance
            'mentenanta': ['ai_mentenanta'],
            'maintenance': ['ai_mentenanta'],
            'reparatii': ['ai_mentenanta'],
            'repairs': ['ai_mentenanta'],

            # Deliveries
            'livrari': ['ai_livrari'],
            'deliveries': ['ai_livrari'],
            'transport': ['ai_livrari', 'ai_comenzi_aprovizionare'],

            # Service & Support
            'service': ['ai_service_support'],
            'support': ['ai_service_support'],
            'technical': ['ai_service_support'],
            'tehnic': ['ai_service_support'],

            # Vehicle Fleet
            'parc': ['ai_parc_auto'],
            'auto': ['ai_parc_auto'],
            'masini': ['ai_parc_auto'],
            'cars': ['ai_parc_auto'],
            'vehicles': ['ai_parc_auto'],
            'fleet': ['ai_parc_auto'],

            # Reports
            'rapoarte': ['ai_rapoarte'],
            'reports': ['ai_rapoarte'],
            'situatii': ['ai_rapoarte', 'ai_financiar'],
            'status': ['ai_rapoarte'],

            # Registry
            'registru': ['ai_registru', 'ai_resurse_umane'],
            'registry': ['ai_registru'],
            'evidenta': ['ai_registru', 'ai_smi_ssm'],
            'records': ['ai_registru'],

            # Intrabooking
            'intrabooking': ['ai_intrabooking'],
            'booking': ['ai_intrabooking'],
            'rezervare': ['ai_intrabooking'],
            'reservation': ['ai_intrabooking'],

            # Utilities
            'utile': ['ai_utile'],
            'utilities': ['ai_utile'],
            'formulare': ['ai_utile'],
            'forms': ['ai_utile'],
            'fisiere': ['ai_utile', 'ai_smi'],
            'files': ['ai_utile', 'ai_smi'],
            'proceduri': ['ai_utile'],
            'procedures': ['ai_utile']
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
        # If no specific matches, include main department tables
        if not table_scores:
            main_tables = ['ai_financiar', 'ai_comercial', 'ai_aprovizionare', 'ai_productie',
                           'ai_resurse_umane']
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

    def _format_schema_info(self) -> str:
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
        """Get a list of all available table names"""
        return list(self.schemas.keys())

    def search_tables_by_description(self, search_term: str) -> List[str]:
        """Search tables by description content"""
        matching_tables = []
        search_lower = search_term.lower()

        for table_name, schema in self.schemas.items():
            if schema.description and search_lower in schema.description.lower():
                matching_tables.append(table_name)

        return matching_tables