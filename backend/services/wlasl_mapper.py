import json
import os

WLASL_DIR = os.path.join(os.path.dirname(__file__), '..', 'wlasl')
GLOSS_FILE = os.path.join(WLASL_DIR, 'WLASL_v0.3.json')

gloss_map = {}

def load_wlasl():
    global gloss_map
    if not os.path.exists(GLOSS_FILE):
        print("WLASL dataset not found yet")
        return
    with open(GLOSS_FILE, 'r') as f:
        data = json.load(f)
    for entry in data:
        word = entry['gloss'].lower()
        instances = entry.get('instances', [])
        if instances:
            gloss_map[word] = instances[0].get('video_id', None)
    print(f"Loaded {len(gloss_map)} signs from WLASL")

def get_video_url(word: str):
    word = word.lower().strip(".,!?'\"")
    video_id = gloss_map.get(word)
    if not video_id:
        return None
    video_path = os.path.join(WLASL_DIR, 'videos', f'{video_id}.mp4')
    if os.path.exists(video_path):
        return f'/wlasl-video/{video_id}'
    return None

load_wlasl()