/**
 * Generate square card-format category images for the /onboarding slide
 * "Cela matematika u 5 kraljevstava" using Gemini image generation.
 *
 * Each card is rendered ~200x240 in the UI; we generate 1024x1024 so the same
 * asset works on retina and full-bleed mobile. Brand: warm dark canvas with
 * one dominant accent per category.
 *
 * Run with:
 *   GEMINI_API_KEY=... npx tsx scripts/generate-onboarding-images.ts
 */
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is required");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const OUTPUT_DIR = path.join(process.cwd(), "public/images/onboarding/categories");

const SHARED = `Square 1:1 format, centered subject with generous breathing room.
Background: deep warm-black gradient from #1a1210 corners to #0a0705 center, with a soft directional spotlight from the top-left.
No text, no labels, no captions.
Photorealistic CGI render, luminous glass-like 3D objects with soft inner glow, bokeh light particles, subtle film grain.
Dark academia meets holographic editorial illustration — confident, refined, never childish.
Composition should read clearly at 240px height on a glass card.`;

const CATEGORIES: Record<string, string> = {
  algebra: `${SHARED}
Subject: a glowing 3D glass letter "x" with a small superscript "²" floating just above-right, surrounded by a polynomial curve traced as a luminous light ribbon weaving through the scene. A faint √ glyph and a Σ glyph drift in the background bokeh.
Dominant color: warm amber-orange (#ec5b13 → #ff9a4d). Reflections cast soft golden light across the canvas.`,

  jednacine: `${SHARED}
Subject: a glowing 3D balance scale made of glass and brass, the left tray holding a translucent "x" symbol, the right tray holding the equals sign "=" and a small "0" — perfectly level. Faint equation traces float around it as light filaments.
Dominant color: sunny amber-gold (#fe9d00 → #ffd07a). Warm chrome highlights on the brass.`,

  geometrija: `${SHARED}
Subject: a floating translucent 3D icosahedron made of cyan glass with visible edges glowing like neon wireframe, alongside a smaller floating sphere and a thin platonic tetrahedron. Faint compass-construction arcs trace through the negative space.
Dominant color: sky-cyan (#0ea5e9 → #7dd3fc). Cool blue rim-lighting and subtle reflections.`,

  analiza: `${SHARED}
Subject: a luminous sine-like curve flowing as a ribbon of cool purple light through 3D space, with a single tangent line touching the curve at a bright spark of light (representing a derivative). A faint integral area glows softly beneath one segment of the curve.
Dominant color: lavender-violet (#a78bfa → #c4b5fd). Soft purple bloom and depth-of-field blur on the edges.`,

  trigonometrija: `${SHARED}
Subject: a luminous unit circle made of electric chartreuse-yellow light, with a single triangle inscribed inside (showing one marked angle), and sine and cosine waves emanating outward as soft glowing wave-fronts.
Dominant color: neon yellow-green / "banana" (#ccff00 → #d4ff4d). Bright but elegant glow, like a holographic readout.`,
};

async function generateImage(categoryId: string, prompt: string): Promise<boolean> {
  console.log(`Generating: ${categoryId}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["image", "text"],
      },
    });

    if (response.candidates && response.candidates[0]) {
      const parts = response.candidates[0].content?.parts ?? [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          const outputPath = path.join(OUTPUT_DIR, `${categoryId}.png`);
          fs.writeFileSync(outputPath, buffer);
          console.log(`  ✓ ${outputPath} (${(buffer.length / 1024).toFixed(0)}KB)`);
          return true;
        }
      }
    }
    console.log(`  ✗ No image data for ${categoryId}`);
    return false;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ ${categoryId}: ${msg}`);
    return false;
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Output: ${OUTPUT_DIR}\n`);
  for (const [id, prompt] of Object.entries(CATEGORIES)) {
    await generateImage(id, prompt);
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\nDone.");
}

main();
