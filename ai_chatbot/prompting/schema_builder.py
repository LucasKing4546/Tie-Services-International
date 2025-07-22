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


class SchemaBuilder:
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