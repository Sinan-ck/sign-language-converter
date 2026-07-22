import json
import os

DICT_PATH = os.path.join(os.path.dirname(__file__), 'anysign_dictionary.json')

with open(DICT_PATH, 'r') as f:
    ANYSIGN_DICTIONARY = json.load(f)

CONTRACTIONS = {
    "i'm": "i am", "don't": "do not", "isn't": "is not", "you're": "you are",
    "let's": "let us", "what's": "what", "today's": "today", "it's": "it is",
    "we're": "we are", "won't": "will not", "you'd": "you would", "i'll": "i will",
    "can't": "can not", "didn't": "did not", "doesn't": "does not",
    "haven't": "have not", "hasn't": "has not", "wouldn't": "would not",
    "couldn't": "could not", "shouldn't": "should not", "that's": "that is",
    "there's": "there is", "here's": "here is", "who's": "who is",
    "she's": "she is", "he's": "he is", "we've": "we have", "they're": "they are",
    "they've": "they have", "i've": "i have", "you've": "you have",
    "wasn't": "was not", "weren't": "were not", "aren't": "are not",
}

def clean_word(word):
    return word.lower().strip(".,!?\"()[]")

def lookup(word):
    video_url = ANYSIGN_DICTIONARY.get(word, None)
    if not video_url and word.endswith('s') and len(word) > 3:
        video_url = ANYSIGN_DICTIONARY.get(word[:-1], None)
    return video_url

def map_to_signs(transcript: str):
    raw_words = transcript.split()
    result = []

    for raw in raw_words:
        w = clean_word(raw)
        if not w:
            continue

        if w in CONTRACTIONS:
            expanded = CONTRACTIONS[w].split()
        else:
            expanded = [w]

        for piece in expanded:
            piece_clean = piece.strip(".,!?\"'()[]")
            video_url = lookup(piece_clean)
            result.append({
                'word': piece_clean,
                'sign_word': piece_clean if video_url else None,
                'video_url': video_url
            })

    return result
