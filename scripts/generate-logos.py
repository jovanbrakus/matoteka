#!/usr/bin/env python3
"""Generate 10 logo variants for Matoteka using Gemini image generation."""

import base64
import json
import os
import sys
import urllib.request
import urllib.error
import time

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not set")
    sys.exit(1)

MODEL = "gemini-3-pro-image-preview"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "logo", "generated-v2")
os.makedirs(OUTPUT_DIR, exist_ok=True)

BASE_CONTEXT = """You are a world-class logo designer from a premium design studio.
Create a logo icon/mascot for "Matoteka" — a Serbian math exam preparation platform for university entrance exams.
The logo should work as an app icon (square, clean edges, no text in the image).
Style: modern, friendly, professional, minimal complexity, bold shapes, vibrant colors.
Primary brand color: orange (#E46C18). Secondary: dark navy (#021B36). Background: pure white.
The design should feel premium, polished, and immediately recognizable at small sizes.
DO NOT include any text, letters, or words in the image. Icon/mascot only."""

prompts = [
    # 1 - Refined beaver (close to current)
    f"""{BASE_CONTEXT}
Design: A friendly, modern beaver mascot wearing round glasses, holding a pencil.
The beaver should be rendered in a clean, geometric style with bold orange body and navy outlines.
Think Duolingo-owl level of polish but as a beaver. Front-facing, symmetrical, cheerful expression.""",

    # 2 - Owl with math
    f"""{BASE_CONTEXT}
Design: A wise owl mascot perched on a stack of books, with one wing raised holding a small golden compass.
The owl has large expressive eyes with round glasses. Rendered in bold orange and navy, geometric flat style.
Modern and minimal, like a premium EdTech brand icon.""",

    # 3 - Fox scholar
    f"""{BASE_CONTEXT}
Design: A clever fox mascot wearing a tiny graduation cap, holding a ruler in one paw.
Sleek, modern geometric design. The fox has a confident, friendly smile.
Bold orange fur with navy accents. Flat illustration style, clean vector look.""",

    # 4 - Abstract math symbol
    f"""{BASE_CONTEXT}
Design: An abstract logo mark combining the letter M shape with mathematical symbols (integral, sigma, pi).
Flowing, modern, geometric. Bold orange gradient with navy accents.
Premium and sophisticated, like a fintech or top-tier SaaS brand logo. No animal, purely abstract.""",

    # 5 - Lightbulb + brain
    f"""{BASE_CONTEXT}
Design: A creative combination of a lightbulb and a brain, where the brain's folds subtly form mathematical symbols.
Clean geometric style, bold orange with navy outlines. The lightbulb's filament forms a "+" sign.
Modern, clever, immediately communicates "smart learning." No animal.""",

    # 6 - Cat mathematician
    f"""{BASE_CONTEXT}
Design: An adorable cat mascot sitting upright, wearing small round glasses, with a protractor balanced on its head like a hat.
The cat has an orange tabby pattern in bold flat colors. Navy outlines, geometric shapes.
Playful yet professional. Think premium app icon quality.""",

    # 7 - Rocket pencil
    f"""{BASE_CONTEXT}
Design: A pencil-rocket hybrid blasting off with small mathematical symbols (pi, plus, equals) as exhaust trail stars.
Bold orange rocket body with navy tip and fins. Dynamic upward angle.
Energetic, modern, flat illustration. Communicates progress and achievement. No animal.""",

    # 8 - Bear cub
    f"""{BASE_CONTEXT}
Design: A round, cute bear cub mascot sitting and holding an open book with math symbols floating above it.
Rendered in warm orange with navy details. Large friendly eyes, no glasses.
Chunky geometric style like modern app mascots (Notion bear, Slack dog). Approachable and premium.""",

    # 9 - Geometric hexagon
    f"""{BASE_CONTEXT}
Design: A hexagonal badge/shield containing an abstract stylized pencil crossing with a compass/protractor.
Bold geometric lines, orange and navy color scheme. Mathematical precision in the geometry itself.
Premium, clean, modern — like a university crest reimagined for a tech startup. No animal.""",

    # 10 - Squirrel with acorn
    f"""{BASE_CONTEXT}
Design: A playful squirrel mascot holding an acorn that has a "+" symbol carved into it.
The squirrel has a big fluffy tail and wears tiny round glasses. Bold orange fur, navy outlines.
Geometric flat style, symmetrical front-facing pose. Charming and memorable.
Premium quality like Duolingo or Headspace mascot design.""",
]

def generate_image(prompt: str, index: int) -> bool:
    """Generate a single image using Gemini API."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"]
        }
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode("utf-8"))

        # Extract image from response
        candidates = result.get("candidates", [])
        if not candidates:
            print(f"  WARNING: No candidates in response")
            return False

        parts = candidates[0].get("content", {}).get("parts", [])
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
            elif "text" in part:
                print(f"  Text response: {part['text'][:200]}")

        print(f"  WARNING: No image data found in response")
        return False

    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP Error {e.code}: {body[:300]}")
        return False
    except Exception as e:
        print(f"  Error: {e}")
        return False


def main():
    descriptions = [
        "Refined beaver mascot",
        "Wise owl scholar",
        "Fox with graduation cap",
        "Abstract M + math symbols",
        "Lightbulb-brain fusion",
        "Cat mathematician",
        "Rocket pencil",
        "Bear cub with book",
        "Geometric hexagon badge",
        "Squirrel with math acorn",
    ]

    print(f"Generating 10 logo variants...\n")
    successes = 0

    for i, (prompt, desc) in enumerate(zip(prompts, descriptions), 1):
        print(f"[{i}/10] {desc}...")
        if generate_image(prompt, i):
            successes += 1
        if i < 10:
            time.sleep(2)  # rate limiting

    print(f"\nDone! {successes}/10 images generated in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
