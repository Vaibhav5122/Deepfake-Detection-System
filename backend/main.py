import os
import uvicorn
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from fastapi import FastAPI, Header, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import detection_router
from auth import auth_router

app = FastAPI(title="Deepfake Detection API", version="1.0.0")

# API Key Validation Dependency
API_KEY = os.getenv("API_KEY", "")

async def verify_api_key(x_api_key: str = Header(None)):
    # If no API key is configured on the backend, skip validation (convenient for local dev)
    if not API_KEY:
        return
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key"
        )

# Configure Allowed Origins for CORS (restricting to localhost + production Vercel domains)
origins_env = os.getenv("ALLOWED_ORIGINS", "")
if origins_env:
    allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()]
    # Always allow local dev domains for convenience
    allowed_origins.extend(["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"])
else:
    # Default to wildcard if not configured in environment
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register authentication routes
app.include_router(auth_router)

# Register routes with API Key protection
app.include_router(detection_router, dependencies=[Depends(verify_api_key)])

# Health Check / Welcome Endpoint
@app.get("/")
async def read_root():
    return JSONResponse(
        content={
            "status": "Deepfake Detection API is running",
            "docs": "/docs",
            "version": "1.0.0"
        }
    )

if __name__ == "__main__":
    print("API is running on http://127.0.0.1:8000")
    # reload=True is disabled because it re-loads ONNX model sessions on file changes.
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
