#!/usr/bin/env python3
"""Generate illustrations for the "Priprema za prijemni iz matematike" guide
page (app/(public)/kako-se-pripremiti-za-prijemni-iz-matematike) using Gemini
Nano Banana Pro (gemini-3-pro-image-preview).

Stdlib only — no @google/genai or sharp needed. Same REST pattern as
scripts/generate-logos.py.

Output: public/images/blog/<key>.png  (the page renders each image only if the
file exists, so partial runs degrade gracefully).

Run with:
  GEMINI_API_KEY=... python3 scripts/generate-blog-images.py            # all images
  GEMINI_API_KEY=... python3 scripts/generate-blog-images.py hero plan  # only some keys
"""

import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not set")
    sys.exit(1)

MODEL = "gemini-3-pro-image-preview"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "blog")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Shared brand/style language (matches scripts/generate-onboarding-images.ts).
SHARED = """Brand: Matoteka, a premium Serbian platform for university math
entrance-exam preparation. Warm, focused, aspirational mood — never childish.
Background: deep warm-black gradient (#1a1210 corners to #0a0705 center) with a
soft directional spotlight. Dominant accent color: vivid orange #ec5b13 fading
to #ff9a4d, with subtle cool-cyan secondary highlights.
Style: photorealistic CGI / editorial illustration, luminous glass-like 3D
objects with soft inner glow, gentle bokeh light particles, subtle film grain,
shallow depth of field.
ABSOLUTELY NO text, letters, numbers, words, captions or logos anywhere in the
image. Visual only."""

# key -> (aspect_ratio, prompt)
IMAGES = {
    "hero": (
        "16:9",
        f"""{SHARED}
Subject: a focused high-school student at a tidy wooden desk at night,
seen from a cinematic three-quarter angle, working through math on paper.
Above the desk, elegant mathematical curves, a parabola and a few geometric
shapes float as glowing orange light-ribbons and luminous glass symbols.
A warm desk lamp pools orange light over open notebooks. Calm, determined,
"preparing for the entrance exam" atmosphere.""",
    ),
    "plan": (
        "4:3",
        f"""{SHARED}
Subject: an organized study plan visualized as a floating 3D weekly planner /
calendar grid made of glowing glass panels, with small checkmarks lighting up
in sequence and a luminous orange path/arrow weaving through the milestones
like a roadmap. A few faint math glyphs drift in the background bokeh.
Communicates structure, progress and a step-by-step plan.""",
    ),
    "vezbanje": (
        "4:3",
        f"""{SHARED}
Subject: a hand holding a pencil mid-solution over a sheet of math problems on
a desk, beside a softly glowing 3D hourglass / stopwatch made of brass and
glass. Faint equation traces and a small graph float as light filaments above
the page. Conveys focused, timed practice and repetition.""",
    ),
    "dan-ispita": (
        "4:3",
        f"""{SHARED}
Subject: a calm, confident young person seen from behind entering a bright
exam hall, soft morning light streaming through tall windows, rows of desks
suggested in soft focus. A subtle orange glow of confidence surrounds them.
Serene, ready, "exam day" mood — reassuring rather than stressful.""",
    ),
    "priprema-og": (
        "16:9",
        f"""{SHARED}
Subject: a clean, premium hero composition for social sharing: a glowing 3D
glass parabola and a few floating math symbols (integral, sigma, pi rendered
as luminous glass objects) arranged with generous negative space on the left
for breathing room, warm orange spotlight. Editorial, balanced, brand-forward.""",
    ),
}


def generate_image(key: str, aspect_ratio: str, prompt: str) -> bool:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"],
            "imageConfig": {"aspectRatio": aspect_ratio},
        },
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read().decode("utf-8"))

        candidates = result.get("candidates", [])
        if not candidates:
            print("  WARNING: no candidates in response")
            return False

        parts = candidates[0].get("content", {}).get("parts", [])
        for part in parts:
            if "inlineData" in part:
                img_data = base64.b64decode(part["inlineData"]["data"])
                filepath = os.path.join(OUTPUT_DIR, f"{key}.png")
                with open(filepath, "wb") as f:
                    f.write(img_data)
                print(f"  Saved: {key}.png ({len(img_data) // 1024} KB)")
                return True
            elif "text" in part:
                print(f"  Text: {part['text'][:160]}")

        print("  WARNING: no image data in response")
        return False

    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP Error {e.code}: {body[:300]}")
        return False
    except Exception as e:  # noqa: BLE001
        print(f"  Error: {e}")
        return False


def main():
    selected = sys.argv[1:] or list(IMAGES.keys())
    unknown = [k for k in selected if k not in IMAGES]
    if unknown:
        print(f"Unknown keys: {', '.join(unknown)}")
        print(f"Available: {', '.join(IMAGES.keys())}")
        sys.exit(1)

    print(f"Output: {os.path.abspath(OUTPUT_DIR)}\n")
    successes = 0
    for i, key in enumerate(selected, 1):
        aspect_ratio, prompt = IMAGES[key]
        print(f"[{i}/{len(selected)}] {key} ({aspect_ratio})...")
        if generate_image(key, aspect_ratio, prompt):
            successes += 1
        if i < len(selected):
            time.sleep(2)  # rate limiting

    print(f"\nDone! {successes}/{len(selected)} images generated in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
