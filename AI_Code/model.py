from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
import torch

# --------------------
# FastAPI App
# --------------------

app = FastAPI(title="Free Local LLM API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

class ChatMessage(BaseModel):
    role: str   # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

class ChatResponse(BaseModel):
    response: str

# --------------------
# LLM Logic (with memory)
# --------------------

def build_prompt(messages: list[ChatMessage]) -> str:
    """
    Converts conversation history into TinyLlama-style prompt.
    """

    prompt = "<|system|>\nYou are a friendly, helpful conversational assistant.\n"

    for m in messages:
        if m.role == "user":
            prompt += f"<|user|>\n{m.content}\n"
        elif m.role == "assistant":
            prompt += f"<|assistant|>\n{m.content}\n"

    # Tell model to generate next assistant message
    prompt += "<|assistant|>\n"

    return prompt


def send_to_llm(messages: list[ChatMessage]) -> str:
    try:
        prompt = build_prompt(messages)

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

        # Get the last assistant turn
        return text.split("<|assistant|>")[-1].strip()

    except Exception as e:
        raise RuntimeError(f"LLM error: {e}")

# --------------------
# API Endpoint
# --------------------

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        reply = send_to_llm(request.messages)
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
