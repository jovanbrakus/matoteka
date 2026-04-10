/**
 * Generate per-lesson OpenGraph images using Gemini image generation.
 * Gemini generates ONLY the visual/graphic. All text and branding is
 * composited programmatically via sharp for consistent typography.
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx scripts/generate-og-images.ts            # all lessons
 *   GEMINI_API_KEY=... npx tsx scripts/generate-og-images.ts --lesson 1 # single lesson
 */
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is required");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const OUTPUT_DIR = path.join(process.cwd(), "public/images/og");
const LOGO_PATH = path.join(process.cwd(), "public/logo-brain.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const CATEGORY_COLORS: Record<string, { accent: string; accentHex: string }> = {
  algebra: { accent: "golden amber (#FFB347)", accentHex: "#FFB347" },
  trigonometry: { accent: "rose pink (#FF6B9D)", accentHex: "#FF6B9D" },
  geometry: { accent: "sky blue (#4FC3F7)", accentHex: "#4FC3F7" },
  analysis: { accent: "teal cyan (#4DD0E1)", accentHex: "#4DD0E1" },
  combinatorics_and_probability: {
    accent: "emerald green (#66BB6A)",
    accentHex: "#66BB6A",
  },
};

interface LessonEntry {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  category: string;
  topicTags: string[];
  slug: string;
}

function buildPrompt(lesson: LessonEntry): string {
  const cat = CATEGORY_COLORS[lesson.category] ?? {
    accent: "orange (#FF6B00)",
    accentHex: "#FF6B00",
  };

  const tags = lesson.topicTags.join(", ");

  return `Create a landscape image, exactly 1200x630 pixels. This is ONLY the graphic/visual — do NOT include any text, titles, labels, or words anywhere in the image.

SUBJECT: An artistic, abstract mathematical visualization specifically about "${lesson.title}".
Description: ${lesson.description}
Key concepts: ${tags}.
Create visuals that directly represent these mathematical concepts — for example, if the topic is polynomials show polynomial curves and their roots, if it's complex numbers show the complex plane with Argand diagrams, if it's trigonometry show unit circles and sine waves, if it's Horner's scheme show a cascading division table, etc. Be SPECIFIC to the math topic, not generic.

LAYOUT:
- The illustration occupies the LEFT ~40% (about 480 pixels) of the image, filling it edge-to-edge — touching the top, bottom, and left edges with ZERO padding or margin
- The RIGHT ~60% must be solid dark background (#0a0a0a) — completely empty, no visual elements at all (text will be added later)
- The illustration fades out smoothly on its right edge, dissolving seamlessly into the #0a0a0a dark background with soft gradients and transparency

STYLE:
- Dark, cinematic, premium feel
- Use ${cat.accent} as the primary color for the illustration elements — luminous, glowing, translucent 3D objects, light trails, particles, bokeh
- Background: #0a0a0a (nearly black)
- Variety: use flowing curves, mathematical plots, wireframe surfaces, particle systems, holographic effects — NOT generic cubes and pyramids
- Photorealistic CGI render quality with depth of field

CRITICAL: No text anywhere. No labels. No equations written as text. Only visual/graphical elements. The right half must be solid #0a0a0a dark background.
This must be exactly 1200 pixels wide and 630 pixels tall.`;
}

// --- Text compositing ---

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wrap title text into lines that fit within maxWidth (approximate) */
function wrapTitle(title: string, maxCharsPerLine: number): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function compositeText(
  rawPath: string,
  finalPath: string,
  lesson: LessonEntry
): Promise<void> {
  const logo = await sharp(LOGO_PATH)
    .resize(68, 68, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // Text layout constants
  const textLeft = 540;
  const textAreaWidth = OG_WIDTH - textLeft - 40;
  const eyebrowY = 140;
  const titleStartY = 195;
  const titleLineHeight = 56;
  const titleFontSize = 46;
  const maxCharsPerLine = 26;

  // Wrap title
  const titleLines = wrapTitle(lesson.title, maxCharsPerLine);
  const titleEndY = titleStartY + titleLines.length * titleLineHeight;
  const hashtagY = titleEndY + 30;

  // Build title tspans
  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="0" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  // Eyebrow text
  const eyebrow = `MATOTEKA · CENTAR ZNANJA · LEKCIJA ${lesson.lessonNumber}`;

  // Full text overlay SVG
  const svgWidth = textAreaWidth;
  const svgHeight = OG_HEIGHT;
  const textSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <!-- Eyebrow -->
      <text x="0" y="${eyebrowY}" font-family="sans-serif" font-weight="600" font-size="16" fill="#FF6B00" letter-spacing="2">${escapeXml(eyebrow)}</text>
      <!-- Title -->
      <text x="0" y="${titleStartY}" font-family="sans-serif" font-weight="700" font-size="${titleFontSize}" fill="white">${titleTspans}</text>
      <!-- Hashtag -->
      <text x="0" y="${hashtagY}" font-family="sans-serif" font-weight="400" font-size="22" fill="#888888">#${escapeXml(lesson.category)}</text>
    </svg>
  `);

  const textBuf = await sharp(textSvg).png().toBuffer();

  // Matoteka wordmark SVG
  const wordmarkSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="48">
      <text x="0" y="36" font-family="sans-serif" font-weight="600" font-size="36" fill="white">Matoteka</text>
    </svg>
  `);
  const wordmarkBuf = await sharp(wordmarkSvg).png().toBuffer();
  const wordmarkMeta = await sharp(wordmarkBuf).metadata();
  const wordmarkWidth = wordmarkMeta.width ?? 220;
  const wordmarkHeight = wordmarkMeta.height ?? 48;

  // Logo + wordmark positioning (bottom-right)
  const logoSize = 68;
  const logoGap = 14;
  const marginRight = 30;
  const marginBottom = 20;
  const totalBrandWidth = logoSize + logoGap + wordmarkWidth;
  const brandLeft = OG_WIDTH - totalBrandWidth - marginRight;
  const logoTop = OG_HEIGHT - marginBottom - logoSize;
  const wordmarkTop =
    logoTop + Math.round((logoSize - wordmarkHeight) / 2);

  // Gradient mask: fade graphic from 33% to 50% width, solid dark after 50%
  const fadeStart = Math.round(OG_WIDTH * 0.33); // 396px
  const fadeEnd = Math.round(OG_WIDTH * 0.43);   // 516px
  const maskWidth = OG_WIDTH - fadeStart;
  const maskSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${maskWidth}" height="${OG_HEIGHT}">
      <defs><linearGradient id="m" x1="0" y1="0" x2="${(fadeEnd - fadeStart) / maskWidth}" y2="0">
        <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1"/>
      </linearGradient></defs>
      <rect width="${maskWidth}" height="${OG_HEIGHT}" fill="url(#m)"/>
      <rect x="${fadeEnd - fadeStart}" width="${maskWidth - (fadeEnd - fadeStart)}" height="${OG_HEIGHT}" fill="#0a0a0a"/>
    </svg>
  `);
  const maskBuf = await sharp(maskSvg).png().toBuffer();

  const result = await sharp(rawPath)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover" })
    .composite([
      { input: maskBuf, left: fadeStart, top: 0 },
      { input: textBuf, left: textLeft, top: 0 },
      { input: logo, left: brandLeft, top: logoTop },
      {
        input: wordmarkBuf,
        left: brandLeft + logoSize + logoGap,
        top: wordmarkTop,
      },
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(finalPath, result);
  console.log(`  ✓ Text composited → ${path.basename(finalPath)}`);
}

// --- Generation ---

async function generateOgImage(lesson: LessonEntry): Promise<boolean> {
  console.log(
    `Generating OG image for lesson ${lesson.lessonNumber}: ${lesson.title}...`
  );

  const prompt = buildPrompt(lesson);

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
          const rawPath = path.join(
            OUTPUT_DIR,
            `lesson${lesson.lessonNumber}_raw.png`
          );
          const finalPath = path.join(
            OUTPUT_DIR,
            `lesson${lesson.lessonNumber}.png`
          );
          fs.writeFileSync(rawPath, buffer);
          console.log(
            `  ✓ Raw saved: ${path.basename(rawPath)} (${(buffer.length / 1024).toFixed(0)}KB)`
          );
          await compositeText(rawPath, finalPath, lesson);
          return true;
        }
      }
    }

    console.log(
      `  ✗ No image data in response for lesson ${lesson.lessonNumber}`
    );
    return false;
  } catch (error: any) {
    console.error(
      `  ✗ Error for lesson ${lesson.lessonNumber}:`,
      error.message || error
    );
    return false;
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Load lessons index
  const indexPath = path.join(process.cwd(), "database/lessons-index.json");
  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  const lessons: LessonEntry[] = Object.values(index.lessons);

  // Parse --lesson N flag
  const lessonArg = process.argv.indexOf("--lesson");
  if (lessonArg !== -1 && process.argv[lessonArg + 1]) {
    const num = parseInt(process.argv[lessonArg + 1], 10);
    const lesson = lessons.find((l) => l.lessonNumber === num);
    if (!lesson) {
      console.error(`Lesson ${num} not found in index`);
      process.exit(1);
    }
    await generateOgImage(lesson);
    return;
  }

  // Generate all
  console.log(`Generating OG images for ${lessons.length} lessons...\n`);
  let success = 0;
  let fail = 0;

  for (const lesson of lessons.sort(
    (a, b) => a.lessonNumber - b.lessonNumber
  )) {
    const ok = await generateOgImage(lesson);
    if (ok) success++;
    else fail++;
    // Delay between requests to avoid rate limiting
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log(`\nDone! ${success} succeeded, ${fail} failed.`);
}

main();
