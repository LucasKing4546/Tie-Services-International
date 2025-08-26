from models.hf_model import SQL_Model
import modal
import os
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

# Define the app
app = modal.App("ai_chatbot")

# Define the image with local Python source
HF_MODEL_NAME = "defog/sqlcoder-7b-2"

# Create a volume to cache the model
model_volume = modal.Volume.from_name("huggingface-models", create_if_missing=True)

image = (
    modal.Image.debian_slim()
    .pip_install("transformers", "torch", "huggingface_hub", "accelerate", "bitsandbytes", "fastapi", "uvicorn",
                 "python-multipart", "mysql-connector-python")
    .add_local_python_source("models")
    .add_local_python_source("prompting")
    .add_local_python_source("utils")
    .add_local_dir("data", "/root/data")
)

# Define a new, dedicated mount point for the volume
VOLUME_MOUNT_PATH = "/vol_cache"
CUSTOM_HF_CACHE_DIR = f"{VOLUME_MOUNT_PATH}/huggingface_cache"

# Global variable to store the model instance
model_instance = None

# Pydantic models for API
class ChatMessage(BaseModel):
    role: str
    parts: List[Dict[str, str]]


class ChatRequest(BaseModel):
    contents: List[ChatMessage]


class ChatResponse(BaseModel):
    candidates: List[Dict[str, Any]]


# Function to download and cache the model
@app.function(
    image=image,
    volumes={VOLUME_MOUNT_PATH: model_volume},
    timeout=1800,
)
def download_model_to_cache():
    os.makedirs(CUSTOM_HF_CACHE_DIR, exist_ok=True)
    os.environ["HF_HOME"] = CUSTOM_HF_CACHE_DIR
    os.environ["TRANSFORMERS_CACHE"] = CUSTOM_HF_CACHE_DIR

    print(f"Downloading {HF_MODEL_NAME} to cache...")
    tokenizer = AutoTokenizer.from_pretrained(HF_MODEL_NAME, cache_dir=CUSTOM_HF_CACHE_DIR)
    model = AutoModelForCausalLM.from_pretrained(HF_MODEL_NAME, cache_dir=CUSTOM_HF_CACHE_DIR)
    print("Model and tokenizer downloaded and cached successfully")

    model_volume.commit()
    return f"Model {HF_MODEL_NAME} cached successfully"


# Create FastAPI app
web_app = FastAPI()

# Add CORS middleware to allow frontend connections
from fastapi.middleware.cors import CORSMiddleware

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


# Initialize model function
def initialize_model():
    global model_instance

    os.makedirs(CUSTOM_HF_CACHE_DIR, exist_ok=True)
    os.environ["HF_HOME"] = CUSTOM_HF_CACHE_DIR
    os.environ["TRANSFORMERS_CACHE"] = CUSTOM_HF_CACHE_DIR

    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    model_cache_path = Path(CUSTOM_HF_CACHE_DIR) / f"models--{HF_MODEL_NAME.replace('/', '--')}"
    if not model_cache_path.exists():
        print("Model not found in cache, downloading...")
        download_model_to_cache.local()

    if model_instance is None:
        print("Initializing SQL model from cache...")
        model_instance = SQL_Model(HF_MODEL_NAME, cache_dir=CUSTOM_HF_CACHE_DIR)

    return model_instance


# Updated chat endpoint using the new SchemaBuilder methods
@web_app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Initialize model if not already done
        model = initialize_model()

        # Get the last user message
        user_messages = [msg for msg in request.contents if msg.role == "user"]
        if not user_messages:
            raise HTTPException(status_code=400, detail="No user message found")

        last_user_message = user_messages[-1].parts[0]["text"]

        # Load schema information using optimized SchemaBuilder
        from prompting.schema_builder import SchemaBuilder
        builder = SchemaBuilder("data/table_schemas.json")

        # Use the new optimized prompt creation method
        sqlcoder_prompt = builder.create_sqlcoder_prompt(last_user_message)

        print(f"DEBUG - Optimized prompt length: {len(sqlcoder_prompt)} characters")
        print(f"DEBUG - Relevant tables: {builder.get_relevant_tables(last_user_message)}")

        # Generate SQL using the SQLCoder format
        sql_response = model.generate_sql(sqlcoder_prompt, use_sampling=True)

        if not sql_response or sql_response.strip() == "":
            return ChatResponse(
                candidates=[{
                    "content": {
                        "parts": [
                            {"text": "I couldn't generate a valid SQL query. Please try a more specific question."}],
                        "role": "model"
                    },
                    "finishReason": "STOP",
                    "index": 0
                }]
            )

        response_text = sql_response

        # Removed semicolon to return a correct SQL query
        if response_text[-1] == ';':
            response_text = response_text[:-1]

        # Validate the SQL if validator is available
        try:
            from models.sql_validator import SQLValidator
            validator = SQLValidator("data/table_schemas.json")
            validation_result = validator.validate(sql_response)

            if validation_result['is_valid']:
                response = ChatResponse(
                    candidates=[{
                        "content": {
                            "parts": [{"text": response_text}],
                            "role": "model"
                        },
                        "finishReason": "STOP",
                        "index": 0
                    }]
                )
                return response
            else:
                error_text = f"The generated SQL query has validation errors:\n\n```sql\n{sql_response}\n```\n\nErrors: {validation_result.get('errors', [])}"
                return ChatResponse(
                    candidates=[{
                        "content": {
                            "parts": [{"text": error_text}],
                            "role": "model"
                        },
                        "finishReason": "STOP",
                        "index": 0
                    }]
                )
        except ImportError:
            # If validator not available, return the SQL anyway
            return ChatResponse(
                candidates=[{
                    "content": {
                        "parts": [{"text": response_text}],
                        "role": "model"
                    },
                    "finishReason": "STOP",
                    "index": 0
                }]
            )
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# Health check endpoint
@web_app.get("/health")
async def health_check():
    return {"status": "healthy", "model": HF_MODEL_NAME}


# Test function to debug the model directly
@app.function(
    image=image,
    gpu="A10G",
    timeout=600,
    volumes={VOLUME_MOUNT_PATH: model_volume},
)
def test_model_generation():
    """Test function with optimized prompt"""
    model = initialize_model()

    # Test with optimized schema builder
    from prompting.schema_builder import SchemaBuilder
    builder = SchemaBuilder("data/table_schemas.json")

    test_question = "Show me all IT department information"
    test_prompt = builder.create_sqlcoder_prompt(test_question)

    print(f"Testing with question: {test_question}")
    print(f"Relevant tables: {builder.get_relevant_tables(test_question)}")
    print(f"Prompt length: {len(test_prompt)} characters")

    result = model.generate_sql(test_prompt, use_sampling=False)
    print(f"Generated SQL: {repr(result)}")
    return result


# Modal function to serve the FastAPI app
@app.function(
    image=image,
    gpu="A10G",
    timeout=3600,
    volumes={VOLUME_MOUNT_PATH: model_volume},
    scaledown_window=300,  # Force shutdown after 5 minutes of inactivity
    min_containers=0,  # Don't keep containers warm when idle
)
@modal.concurrent(max_inputs=10)
@modal.asgi_app()
def serve_api():
    return web_app


# Helper function to setup cache
@app.function()
def setup_model_cache():
    print("Setting up model cache...")
    result = download_model_to_cache.remote()
    print(result)
    return "Cache setup complete"


# For local development
@app.local_entrypoint()
def main():
    print("Starting local development server...")
    print("Testing model generation...")
    result = test_model_generation.remote()
    print(f"Test result: {result}")
    return result


# Add a separate test entrypoint
@app.local_entrypoint()
def test():
    print("Testing model generation...")
    result = test_model_generation.remote()
    print(f"Test result: {result}")
    return result