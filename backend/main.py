from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, youtube

app = FastAPI(title="Sign Language Converter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(youtube.router)

@app.get("/")
def root():
    return {"status": "API is running"}