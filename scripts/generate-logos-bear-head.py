#!/usr/bin/env python3
"""Generate 2 bear head-only favicon variants."""

import base64
import json
import os
import sys
import urllib.request
import time

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not set")
    sys.exit(1)

MODEL = "gemini-3-pro-image-preview"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "logo", "generated-v2")

BASE_CONTEXT = """You are a world-class logo designer from a premium design studio.
Create a favicon-style icon for "Matoteka" — a math exam preparation platform.
The icon must be ONLY the bear's head — no body, no hands, no props, no book, no pencil.
Style: modern, friendly, bold geometric shapes, flat illustration.
Primary color: orange (#E46C18). Outlines: dark navy (#021B36). Background: pure white.
The head should fill most of the canvas. Must be instantly recognizable at 16x16 and 32x32 pixels.
DO NOT include any text, letters, body parts below the neck, or any objects."""

prompts = [
    f"""{BASE_CONTEXT}
Design: A round, cute bear cub face — front-facing, perfectly symmetrical.
Big friendly round eyes with white highlights, small navy nose, gentle smile.
Round ears on top. Clean navy outlines, orange fill with subtle shading.
Extremely simple and bold — every detail must read at tiny favicon sizes.""",

    f"""{BASE_CONTEXT}
Design: A round bear cub face with a slightly cheeky, confident grin.
One eyebrow slightly raised, giving personality. Big round eyes.
Round ears, orange fill, navy outlines. Minimal detail — no extra accessories.
Should feel like a premium tech brand mascot favicon (like GitHub's octocat or Firefox).""",
]

descriptions = [
    "Bear head — friendly, symmetrical",
    "Bear head — cheeky grin, personality",
]

def generate_image(prompt, index):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }
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
                filename = f"variant-{index:02d}.{ext}"
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, "wb") as f:
                    f.write(img_data)
                print(f"  Saved: {filename} ({len(img_data)} bytes)")
                return True
        print("  WARNING: No image data found")
        return False
    except Exception as e:
        print(f"  Error: {e}")
        return False

print("Generating 2 bear head favicon variants...\n")
for i, (prompt, desc) in enumerate(zip(prompts, descriptions)):
    idx = 14 + i
    print(f"[{i+1}/2] {desc}...")
    generate_image(prompt, idx)
    if i < 1:
        time.sleep(2)
print("\nDone!")
