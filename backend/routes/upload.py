import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.speech_to_text import transcribe_audio
from services.sign_mapper import map_to_signs

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Simple in-memory store: job_id -> result dict
# NOTE: resets when the server restarts. Fine for now, swap for a DB/file store later.
job_results = {}

@router.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())
    ext = file.filename.split(".")[-1]
    video_path = f"{UPLOAD_DIR}/{job_id}.{ext}"
    with open(video_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    transcript = transcribe_audio(video_path)
    signs = map_to_signs(transcript)

    result = {"job_id": job_id, "transcript": transcript, "signs": signs}
    job_results[job_id] = result
    return result

@router.get("/result/{job_id}")
async def get_result(job_id: str):
    result = job_results.get(job_id)
    if not result:
        raise HTTPException(status_code=404, detail="Job not found")
    return result