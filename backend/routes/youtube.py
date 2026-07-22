import os
import uuid
import subprocess
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.speech_to_text import transcribe_audio
from services.sign_mapper import map_to_signs

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

YTDLP_PATH = "/Library/Frameworks/Python.framework/Versions/3.14/bin/yt-dlp"

class YoutubeRequest(BaseModel):
    url: str

@router.post("/youtube")
async def process_youtube(req: YoutubeRequest):
    job_id = str(uuid.uuid4())
    output_path = f"{UPLOAD_DIR}/{job_id}.mp4"

    try:
        result = subprocess.run(
            [YTDLP_PATH, "-f", "best[height<=480]", "-o", output_path, req.url],
            capture_output=True, text=True, timeout=300
        )
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=f"Download failed: {result.stderr[-500:]}")

        if not os.path.exists(output_path):
            raise HTTPException(status_code=400, detail="Download completed but file not found")

        transcript = transcribe_audio(output_path)
        signs = map_to_signs(transcript)

        return {"job_id": job_id, "transcript": transcript, "signs": signs}

    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=408, detail="Download timed out (video too long or slow connection)")
