#!/usr/bin/env python3
"""Generate variant-8 redo matching the style of variant-11 and variant-14."""

import base64
import json
import os
import sys
import urllib.request

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not set")
    sys.exit(1)

MODEL = "gemini-3-pro-image-preview"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "logo", "generated-v2")

# Read variant-11 and variant-14 as reference images
def load_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

ref_11 = load_image(os.path.join(OUTPUT_DIR, "variant-11.jpg"))
ref_14 = load_image(os.path.join(OUTPUT_DIR, "variant-14.jpg"))

prompt = """You are a world-class logo designer. I'm providing two reference images that show the style I want.

Create a new logo icon of a cute bear cub mascot sitting and reading an open book, with math symbols (pi, sigma, integral) floating above the book.

CRITICAL STYLE REQUIREMENTS — match the reference images exactly:
- Bear body: warm orange (#E46C18)
- Outlines: thick dark navy (#021B36)
- EARS: dark navy/black INSIDE the ears (NOT white)
- NOSE/MUZZLE area: lighter orange/tan tone (NOT white)
- Eyes: dark navy with white highlight dots
- Background: pure white
- Style: chunky geometric flat illustration, bold shapes
- The bear should be sitting, holding an open book, with math symbols floating above

DO NOT use white for the ear insides or muzzle. Use the same warm color palette as the reference images.
DO NOT include any text or letters. Icon only.
The design should work as an app icon at small sizes."""

url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
payload = {
    "contents": [{
        "parts": [
            {"inlineData": {"mimeType": "image/jpeg", "data": ref_11}},
            {"inlineData": {"mimeType": "image/jpeg", "data": ref_14}},
            {"text": prompt}
        ]
    }],
    "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
}

print("Generating variant-8 redo with matching style...")
data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read().decode("utf-8"))
    parts = result.get("candidates", [{}])[0].get("content", {}).get("parts", [])
    for part in parts:
        if "inlineData" in part:
            img_data = base64.b64decode(part["inlineData"]["data"])
            mime = part["inlineData"].get("mimeType", "image/png")
            ext = "png" if "png" in mime else "jpg" if "jpeg" in mime or "jpg" in mime else "webp"
            filename = f"variant-16.{ext}"
            filepath = os.path.join(OUTPUT_DIR, filename)
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"Saved: {filename} ({len(img_data)} bytes)")
            break
    else:
        print("WARNING: No image data found")
except Exception as e:
    print(f"Error: {e}")

print("Done!")
