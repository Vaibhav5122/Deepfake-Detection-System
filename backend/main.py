import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import detection_router

app = FastAPI(title="Deepfake Detection API", version="1.0.0")

# Enable CORS (critical for Vercel integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(detection_router)

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
