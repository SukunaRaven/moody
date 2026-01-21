from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import torch

# --------------------
# FastAPI App
# --------------------

app = FastAPI(title="Free Local LLM API", version="2.0")

# --------------------
# Load Model
# --------------------
MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

device = 0 if torch.cuda.is_available() else -1

llm = pipeline(
    "text-generation",
    model=MODEL_NAME,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device=device
)

# --------------------
# Schemas
# --------------------

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# --------------------
# LLM Logic
# --------------------

def send_to_llm(message: str) -> str:
    try:
        prompt = (
            "<|system|>\n"
            "You are a friendly, helpful conversational assistant.\n"
            "<|user|>\n"
            f"{message}\n"
            "<|assistant|>\n"
        )

        output = llm(
            prompt,
            max_new_tokens=150,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.1,
            eos_token_id=llm.tokenizer.eos_token_id,
        )

        text = output[0]["generated_text"]

        return text.split("<|assistant|>")[-1].strip()

    except Exception as e:
        raise RuntimeError(f"LLM error: {e}")

# --------------------
# API Endpoint
# --------------------

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        reply = send_to_llm(request.message)
        return ChatResponse(response=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --------------------
# Health Check
# --------------------

@app.get("/health")
def health():
    return {"status": "ok"}

# Run with:
# uvicorn model:app --reload
