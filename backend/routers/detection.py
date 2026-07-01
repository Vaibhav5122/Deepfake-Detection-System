import os
import uuid
import asyncio
from typing import Any
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse

from services import image_model, video_model, audio_model
from auth.logic import get_current_user

router = APIRouter(prefix="/api/detect", tags=["detection"])

# Configure uploads directory relative to this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "temp_uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def handle_media_upload(file: UploadFile, model: Any):
    try:
        # Create a unique filename to prevent collisions and save
        ext = file.filename.split('.')[-1]
        temp_filepath = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.{ext}")
        
        # Save file to disk
        content = await file.read()
        
        def save_file():
            with open(temp_filepath, "wb") as f:
                f.write(content)
        await asyncio.to_thread(save_file)
            
        # Run inference using the loaded model inside a thread to prevent blocking
        result = await asyncio.to_thread(model.predict, temp_filepath)
        
        # Cleanup
        def remove_file():
            if os.path.exists(temp_filepath):
                os.remove(temp_filepath)
        await asyncio.to_thread(remove_file)
            
        return result
        
    except Exception as e:
        print(f"Error processing upload: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Error analyzing media.")


async def handle_media_upload_memory(file: UploadFile, model: Any):
    try:
        content = await file.read()
        # Run inference using the loaded model inside a thread to prevent blocking
        result = await asyncio.to_thread(model.predict, content)
        return result
    except Exception as e:
        print(f"Error processing memory upload: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Error analyzing media.")


@router.post("/image")
async def detect_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Expected image.")
    result = await handle_media_upload_memory(file, image_model)
    return JSONResponse(content=result)


@router.post("/video")
async def detect_video(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Expected video.")
    result = await handle_media_upload(file, video_model)
    return JSONResponse(content=result)


@router.post("/audio")
async def detect_audio(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Expected audio.")
    result = await handle_media_upload_memory(file, audio_model)
    return JSONResponse(content=result)
