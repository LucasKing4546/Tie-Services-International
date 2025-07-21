import re
from typing import Dict


class LanguageDetector:
    """
    Language detection utility for SQL chatbot supporting English and another language
    (likely Romanian based on your location, but can be adapted for any language)
    """

    def __init__(self):
        # Common English words in SQL queries
        self.english_keywords = {
            'what', 'show', 'get', 'find', 'list', 'give', 'display', 'tell', 'how',
            'many', 'much', 'count', 'sum', 'average', 'total', 'maximum', 'minimum',
            'all', 'every', 'each', 'which', 'where', 'when', 'who', 'whose',
            'employees', 'workers', 'users', 'customers', 'orders', 'products',
            'salary', 'name', 'age', 'department', 'role', 'position', 'company',
            'table', 'database', 'record', 'column', 'row', 'data', 'information',
            'between', 'greater', 'less', 'than', 'equal', 'like', 'contains',
            'starts', 'ends', 'with', 'from', 'in', 'on', 'at', 'by', 'for',
            'and', 'or', 'not', 'but', 'also', 'only', 'just', 'most', 'least'
        }

        # Romanian keywords (can be replaced with other languages)
        self.romanian_keywords = {
            'ce', 'arată', 'obține', 'găsește', 'listează', 'dă', 'afișează', 'spune',
            'câți', 'cât', 'numărul', 'suma', 'media', 'totalul', 'maximul', 'minimul',
            'toți', 'fiecare', 'care', 'unde', 'când', 'cine', 'al', 'căror',
            'angajați', 'lucrători', 'utilizatori', 'clienți', 'comenzi', 'produse',
            'salariu', 'nume', 'vârstă', 'departament', 'rol', 'poziție', 'companie',
            'tabel', 'bază', 'date', 'înregistrare', 'coloană', 'rând', 'informații',
            'între', 'mai', 'mare', 'mic', 'decât', 'egal', 'conține', 'începe',
            'se', 'termină', 'cu', 'din', 'în', 'pe', 'la', 'pentru', 'prin',
            'și', 'sau', 'nu', 'dar', 'de', 'asemenea', 'doar', 'cel', 'puțin'
        }

        # Language-specific patterns
        self.language_patterns = {
            'english': [
                r'\b(what|show|get|find|list|give|display|tell)\b',
                r'\b(how many|how much|count|sum|average|total)\b',
                r'\b(all|every|each|which|where|when|who)\b',
                r'\b(employees|workers|users|customers|orders)\b',
                r'\b(salary|name|age|department|role|position)\b',
                r'\b(greater than|less than|equal to|like|contains)\b'
            ],
            'romanian': [
                r'\b(ce|arată|obține|găsește|listează|dă|afișează|spune)\b',
                r'\b(câți|cât|numărul|suma|media|totalul)\b',
                r'\b(toți|fiecare|care|unde|când|cine)\b',
                r'\b(angajați|lucrători|utilizatori|clienți|comenzi)\b',
                r'\b(salariu|nume|vârstă|departament|rol|poziție)\b',
                r'\b(mai mare|mai mic|egal cu|conține)\b'
            ]
        }

    def detect_language(self, text: str) -> str:
        """
        Detect the language of the input text

        Args:
            text (str): Input text to analyze

        Returns:
            str: Detected language ('english' or 'romanian')
        """
        if not text or not text.strip():
            return 'english'  # Default to English for empty input

        text_lower = text.lower().strip()

        # Calculate language scores
        english_score = self._calculate_language_score(text_lower, 'english')
        romanian_score = self._calculate_language_score(text_lower, 'romanian')

        # Determine language based on scores
        if romanian_score > english_score:
            return 'romanian'
        else:
            return 'english'

    def _calculate_language_score(self, text: str, language: str) -> float:
        """
        Calculate language score based on keyword matching and patterns

        Args:
            text (str): Lowercased text to analyze
            language (str): Language to score against

        Returns:
            float: Language score
        """
        score = 0.0
        words = text.split()

        # Score based on keyword matching
        if language == 'english':
            keywords = self.english_keywords
        else:
            keywords = self.romanian_keywords

        # Count keyword matches
        keyword_matches = sum(1 for word in words if word in keywords)
        score += keyword_matches * 2.0

        # Score based on pattern matching
        patterns = self.language_patterns.get(language, [])
        for pattern in patterns:
            matches = len(re.findall(pattern, text, re.IGNORECASE))
            score += matches * 1.5

        # Normalize score by text length
        if len(words) > 0:
            score = score / len(words)

        return score

    def get_language_confidence(self, text: str) -> Dict[str, float]:
        """
        Get confidence scores for both languages

        Args:
            text (str): Input text to analyze

        Returns:
            Dict[str, float]: Dictionary with confidence scores for each language
        """
        if not text or not text.strip():
            return {'english': 1.0, 'romanian': 0.0}

        text_lower = text.lower().strip()

        english_score = self._calculate_language_score(text_lower, 'english')
        romanian_score = self._calculate_language_score(text_lower, 'romanian')

        total_score = english_score + romanian_score

        if total_score == 0:
            return {'english': 0.5, 'romanian': 0.5}

        return {
            'english': english_score / total_score,
            'romanian': romanian_score / total_score
        }

# Convenience function for quick language detection
def detect_language(text: str) -> str:
    """
    Quick language detection function

    Args:
        text (str): Input text to analyze

    Returns:
        str: Detected language ('english' or 'romanian')
    """
    detector = LanguageDetector()
    return detector.detect_language(text)


# Example usage and testing
if __name__ == "__main__":
    detector = LanguageDetector()

    # Test cases
    test_cases = [
        "What is the average salary of engineers?",
        "Show me all employees in the IT department",
        "Care este salariul mediu al inginerilor?",
        "Arată-mi toți angajații din departamentul IT",
        "How many users are there?",
        "Câți utilizatori sunt?",
    ]

    print("Language Detection Tests:")
    print("-" * 50)

    for text in test_cases:
        language = detector.detect_language(text)
        confidence = detector.get_language_confidence(text)

        print(f"Text: '{text}'")
        print(f"Detected Language: {language}")
        print(f"Confidence: English={confidence['english']:.2f}, Romanian={confidence['romanian']:.2f}")
        print("-" * 50)