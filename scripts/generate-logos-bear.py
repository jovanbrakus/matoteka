#!/usr/bin/env python3
"""Generate 3 more bear cub logo variants."""

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
Create a logo icon/mascot for "Matoteka" — a Serbian math exam preparation platform for university entrance exams.
The logo should work as an app icon (square, clean edges, no text in the image).
Style: modern, friendly, professional, minimal complexity, bold shapes, vibrant colors.
Primary brand color: orange (#E46C18). Secondary: dark navy (#021B36). Background: pure white.
DO NOT include any text, letters, words, or floating symbols in the image. Icon/mascot only.
DO NOT include any mathematical symbols floating around the character. Keep it clean."""

prompts = [
    # 11 - Bear with book, no floating symbols
    f"""{BASE_CONTEXT}
Design: A round, cute bear cub mascot sitting and holding an open book. The bear is reading the book with a focused, happy expression.
Rendered in warm orange with navy outlines. Large friendly eyes.
Chunky geometric style like modern app mascots (Notion bear, Slack dog).
NO floating symbols, NO math symbols outside the bear. Just the bear and the book. Clean and simple.""",

    # 12 - Bear with pencil, minimal
    f"""{BASE_CONTEXT}
Design: A round, cute bear cub mascot holding a pencil, looking upward with a curious, thoughtful expression.
Rendered in warm orange with navy outlines. Large friendly round eyes. Small rounded ears.
Chunky geometric style, very minimal — just the bear and a pencil, nothing else.
Ultra-clean, no extra details, no accessories. The simplest possible version. Premium minimalist app icon.""",

    # 13 - Bear waving, clean
    f"""{BASE_CONTEXT}
Design: A round, adorable bear cub mascot sitting front-facing with one paw resting on a closed book and the other paw raised in a small friendly wave.
Warm orange body with navy outlines. Big expressive eyes, gentle smile. Small round ears.
Chunky geometric flat illustration style. Very clean — no floating elements, no extra props.
Think Google/Apple emoji quality — simple, bold, instantly readable at 32px.""",
]

descriptions = [
    "Bear reading book (no symbols)",
    "Bear with pencil (ultra-clean)",
    "Bear waving with book (minimal)",
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

print("Generating 3 bear variants...\n")
for i, (prompt, desc) in enumerate(zip(prompts, descriptions)):
    idx = 11 + i
    print(f"[{i+1}/3] {desc}...")
    generate_image(prompt, idx)
    if i < 2:
        time.sleep(2)
print("\nDone!")
