#!/usr/bin/env python3
"""Generate variant-8 redo v2 — sitting pose, matching color style."""

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

def load_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

ref_8 = load_image(os.path.join(OUTPUT_DIR, "variant-08.jpg"))
ref_11 = load_image(os.path.join(OUTPUT_DIR, "variant-11.jpg"))
ref_14 = load_image(os.path.join(OUTPUT_DIR, "variant-14.jpg"))

prompt = """I'm showing you three reference images:
1. First image: the POSE I want — a bear cub sitting upright, reading a book, with math symbols (pi, sigma, integral) floating above. Keep this exact pose and composition.
2. Second and third images: the COLOR STYLE I want — dark navy inside the ears, light orange/tan muzzle area (not white).

Create a new version that combines:
- The EXACT SAME sitting pose and composition from image 1 (sitting upright, holding book, math symbols floating above)
- The COLOR PALETTE from images 2 and 3 (dark navy ear insides, light tan/orange muzzle, warm orange body, navy outlines, white background)

The bear must be SITTING UPRIGHT (not lying down), holding an open book in front of it, with pi/sigma/integral floating above the book.
Chunky geometric flat illustration style. No text. Premium app icon quality.
DO NOT change the pose — keep it sitting front-facing like image 1."""

url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
payload = {
    "contents": [{
        "parts": [
            {"inlineData": {"mimeType": "image/jpeg", "data": ref_8}},
            {"inlineData": {"mimeType": "image/jpeg", "data": ref_11}},
            {"inlineData": {"mimeType": "image/jpeg", "data": ref_14}},
            {"text": prompt}
        ]
    }],
    "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
}

print("Generating variant-8 redo v2 (sitting pose + correct colors)...")
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
            filename = f"variant-17.{ext}"
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
