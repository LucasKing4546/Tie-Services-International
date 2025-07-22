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
                 "python-multipart")
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


# Chat endpoint
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

        # Load schema information
        from prompting.schema_builder import SchemaBuilder
        builder = SchemaBuilder("data/table_schemas.json")

        # Create SQLCoder specific prompt format
        schema_info = ""
        for schema_name, schema in builder.schemas.items():
            columns = ", ".join([f"{col['name']} {col['type']}" for col in schema.columns])
            schema_info += f"CREATE TABLE {schema_name} (\n    {columns}\n);\n\n"

        if not schema_info:
            schema_info = "-- No schema information available"

        sqlcoder_prompt = f"""### Task
        Generate a SQL query to answer this question: `{last_user_message}`
        
        ### Database Schema
        The query will run on a database with the following schema:
        ```sql
        {schema_info.strip()}
        ```
        
        ### SQL
        """
        # Generate SQL using the SQLCoder format
        sql_response = model.generate_sql(sqlcoder_prompt, use_sampling=True)
        response_text = f"Here's the SQL query for your request:\n\n```sql\n{sql_response}\n```"

        # Format response to match expected structure
        response = ChatResponse(
            candidates=[
                {
                    "content": {
                        "parts": [{"text": response_text}],
                        "role": "model"
                    },
                    "finishReason": "STOP",
                    "index": 0
                }
            ]
        )
        return response

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
# Health check endpoint
@web_app.get("/health")
async def health_check():
    return {"status": "healthy", "model": HF_MODEL_NAME}


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
    pass