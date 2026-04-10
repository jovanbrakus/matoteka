/**
 * Generate OG images using shared category base graphics.
 * Instead of 59 Gemini calls, generates 2 base images per category (10 total),
 * then composites lesson-specific text onto them for all 59 lessons.
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx scripts/generate-og-category-bases.ts --generate-bases          # generate 10 base images
 *   npx tsx scripts/generate-og-category-bases.ts --composite                                   # composite all 59 lessons
 *   npx tsx scripts/generate-og-category-bases.ts --composite --lesson 14                       # composite single lesson
 *   GEMINI_API_KEY=... npx tsx scripts/generate-og-category-bases.ts --generate-bases --composite  # both steps
 */
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUTPUT_DIR = path.join(process.cwd(), "public/images/og");
const BASES_DIR = path.join(process.cwd(), "assets/og-bases");
const LOGO_PATH = path.join(process.cwd(), "public/logo-brain.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// --- Category definitions (matching actual DB category names) ---

interface CategoryDef {
  accent: string;
  accentHex: string;
  label: string;
  prompts: [string, string, string]; // three variant prompts per category
}

const CATEGORIES: Record<string, CategoryDef> = {
  algebra: {
    accent: "golden amber (#FFB347)",
    accentHex: "#FFB347",
    label: "Algebra",
    prompts: [
      `Algebraic concepts: polynomial curves with visible roots crossing axes, matrix brackets,
       factorization trees, golden ratio spirals, algebraic identities visualized as geometric transforms.
       Flowing polynomial curves of different degrees interweaving, with glowing root points where they cross zero.`,
      `Abstract algebra: systems of equations as intersecting luminous planes, complex number spirals
       on the Argand plane, binomial expansion pyramid, logarithmic and exponential curves mirroring each other,
       wireframe algebraic surfaces twisting through space.`,
      `Number theory and sequences: prime number spirals (Ulam spiral), Fibonacci sequence as growing golden
       rectangles, modular arithmetic clock faces, infinite series converging as nested luminous rings,
       Pascal's triangle glowing with binomial coefficients highlighted.`,
    ],
  },
  jednacine: {
    accent: "violet purple (#BB86FC)",
    accentHex: "#BB86FC",
    label: "Jednačine",
    prompts: [
      `Equations and inequalities: balanced scales made of light, intersecting curves showing solution points
       with bright sparks, number line with highlighted intervals for inequalities, parabolas and lines
       crossing at solution points, quadratic formula components floating as luminous elements.`,
      `Systems of equations: multiple glowing curves intersecting in 3D space, matrix determinant visualized
       as a rotating cube of light, graphical solutions with coordinate grids, inequality regions shaded
       with translucent color planes, absolute value V-shapes reflecting symmetrically.`,
      `Functional equations: nested function compositions as recursive spirals of light, exponential growth
       curves shooting upward, logarithmic curves gently bending, inverse functions mirrored across a
       luminous diagonal line, parametric curves tracing paths through coordinate space.`,
    ],
  },
  trigonometrija: {
    accent: "rose pink (#FF6B9D)",
    accentHex: "#FF6B9D",
    label: "Trigonometrija",
    prompts: [
      `Trigonometry: luminous unit circle with sine and cosine waves emanating outward like sound waves,
       angle arcs drawn as light trails, right triangle with glowing hypotenuse, periodic wave functions
       flowing through space, compass-like angle construction lines.`,
      `Advanced trigonometry: overlapping sine, cosine and tangent waves in different phases,
       trigonometric identities visualized as geometric transformations, polar coordinate roses and spirals,
       Lissajous curves forming elegant patterns, spherical triangle on a translucent globe.`,
      `Wave interference and harmonics: multiple sine waves combining into complex waveforms, standing wave
       patterns with nodes and antinodes glowing, Fourier series building a square wave from harmonics,
       circular motion projecting shadows as sinusoidal curves on glowing planes.`,
    ],
  },
  geometrija: {
    accent: "sky blue (#4FC3F7)",
    accentHex: "#4FC3F7",
    label: "Geometrija",
    prompts: [
      `Geometry: luminous Platonic solids — icosahedron, dodecahedron — made of translucent glass with
       visible edges, golden ratio spirals, compass and straightedge construction lines as light traces,
       circles with inscribed and circumscribed polygons, Euler line and nine-point circle.`,
      `Analytic geometry: coordinate planes with conic sections — ellipse, hyperbola, parabola — as glowing
       curves, vectors as luminous arrows in 3D space, transformation matrices visualized as morphing shapes,
       distance and midpoint formulas as connecting light beams between points.`,
      `Solid geometry and symmetry: cross-sections of luminous cylinders, cones and spheres revealing
       ellipses and circles, tessellation patterns tiling a curved surface, reflection and rotation
       symmetries shown as kaleidoscopic light patterns, unfolded polyhedra nets glowing flat.`,
    ],
  },
  analiza: {
    accent: "teal cyan (#4DD0E1)",
    accentHex: "#4DD0E1",
    label: "Analiza",
    prompts: [
      `Mathematical analysis: smooth function curves with tangent lines touching at glowing contact points
       (derivatives), area under curves filled with translucent color (integrals), limit approaching arrows
       converging to a point, sequences visualized as spiraling dots converging.`,
      `Calculus and analysis: 3D surface plots with gradient vectors, series partial sums stacking up as
       luminous bars approaching a limit, continuity visualized as an unbroken light ribbon,
       differential equations as flow fields with glowing streamlines.`,
      `Sequences and series: arithmetic and geometric progressions as stepping stones of light growing
       or shrinking, sigma notation unfurling into summed luminous bars, convergence radius as a glowing
       circle boundary, Riemann sums as columns of light approximating an area under a curve.`,
    ],
  },
};

// --- Prompt builder for base images ---

function buildBasePrompt(category: string, variant: 0 | 1 | 2): string {
  const cat = CATEGORIES[category];
  if (!cat) throw new Error(`Unknown category: ${category}`);

  return `Create a landscape image, exactly 1200x630 pixels. This is ONLY the graphic/visual — do NOT include any text, titles, labels, or words anywhere in the image.

SUBJECT: An artistic, abstract mathematical visualization for the "${cat.label}" category of mathematics.
${cat.prompts[variant]}
Be SPECIFIC to these math concepts, not generic.

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

// --- Text compositing (same as generate-og-images.ts) ---

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

interface LessonEntry {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  category: string;
  topicTags: string[];
  slug: string;
}

async function compositeText(
  basePath: string,
  finalPath: string,
  lesson: LessonEntry
): Promise<void> {
  const logo = await sharp(LOGO_PATH)
    .resize(68, 68, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const textLeft = 540;
  const textAreaWidth = OG_WIDTH - textLeft - 40;
  const eyebrowY = 140;
  const titleStartY = 195;
  const titleLineHeight = 60;
  const titleFontSize = 50;
  const maxCharsPerLine = 24;

  const titleLines = wrapTitle(lesson.title, maxCharsPerLine);
  const titleEndY = titleStartY + titleLines.length * titleLineHeight;
  const hashtagY = titleEndY + 30;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="0" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const eyebrow = `MATOTEKA · CENTAR ZNANJA · LEKCIJA ${lesson.lessonNumber}`;

  // Display proper Serbian Latin with diacritics for hashtag
  const CATEGORY_DISPLAY: Record<string, string> = {
    jednacine: "jednačine",
  };
  const categoryDisplay = CATEGORY_DISPLAY[lesson.category] ?? lesson.category;

  const textSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${textAreaWidth}" height="${OG_HEIGHT}">
      <text x="0" y="${eyebrowY}" font-family="sans-serif" font-weight="600" font-size="16" fill="#FF6B00" letter-spacing="2">${escapeXml(eyebrow)}</text>
      <text x="0" y="${titleStartY}" font-family="sans-serif" font-weight="700" font-size="${titleFontSize}" fill="white">${titleTspans}</text>
      <text x="0" y="${hashtagY}" font-family="sans-serif" font-weight="400" font-size="30" fill="#888888">#${escapeXml(categoryDisplay)}</text>
    </svg>
  `);
  const textBuf = await sharp(textSvg).png().toBuffer();

  const wordmarkSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="48">
      <text x="0" y="36" font-family="sans-serif" font-weight="600" font-size="36" fill="white">Matoteka</text>
    </svg>
  `);
  const wordmarkBuf = await sharp(wordmarkSvg).png().toBuffer();
  const wordmarkMeta = await sharp(wordmarkBuf).metadata();
  const wordmarkWidth = wordmarkMeta.width ?? 220;
  const wordmarkHeight = wordmarkMeta.height ?? 48;

  const logoSize = 68;
  const logoGap = 14;
  const marginRight = 30;
  const marginBottom = 20;
  const totalBrandWidth = logoSize + logoGap + wordmarkWidth;
  const brandLeft = OG_WIDTH - totalBrandWidth - marginRight;
  const logoTop = OG_HEIGHT - marginBottom - logoSize;
  const wordmarkTop = logoTop + Math.round((logoSize - wordmarkHeight) / 2);

  // Gradient mask: fade graphic from 33% to 43%
  const fadeStart = Math.round(OG_WIDTH * 0.33);
  const fadeEnd = Math.round(OG_WIDTH * 0.43);
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

  const result = await sharp(basePath)
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

  // Optimize: convert to JPEG (no transparency needed for OG images)
  const jpegPath = finalPath.replace(/\.png$/, ".jpg");
  const optimized = await sharp(result)
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(jpegPath, optimized);

  const jpgKB = (optimized.length / 1024).toFixed(0);
  console.log(`  ✓ Composited → ${path.basename(jpegPath)} (${jpgKB}KB)`);
}

// --- Base image generation ---

async function generateBases(): Promise<void> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is required for --generate-bases");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  for (const [category, def] of Object.entries(CATEGORIES)) {
    for (const variant of [0, 1, 2] as const) {
      const label = `${category}_${variant + 1}`;
      console.log(`Generating base: ${label} (${def.label})...`);

      const prompt = buildBasePrompt(category, variant);

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image-preview",
          contents: prompt,
          config: { responseModalities: ["image", "text"] },
        });

        if (response.candidates && response.candidates[0]) {
          const parts = response.candidates[0].content?.parts ?? [];
          for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
              const buffer = Buffer.from(part.inlineData.data, "base64");
              const outPath = path.join(BASES_DIR, `base_${label}.png`);
              fs.writeFileSync(outPath, buffer);
              console.log(
                `  ✓ Saved: ${path.basename(outPath)} (${(buffer.length / 1024).toFixed(0)}KB)`
              );
              break;
            }
          }
        }
      } catch (error: any) {
        console.error(`  ✗ Error for ${label}:`, error.message || error);
      }

      // Rate limit delay
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

// --- Composite lessons ---

function getBasePath(category: string, lessonNumber: number): string {
  const variant = (lessonNumber % 3) + 1; // cycles through 1, 2, 3
  return path.join(BASES_DIR, `base_${category}_${variant}.png`);
}

async function compositeAll(singleLesson?: number): Promise<void> {
  const indexPath = path.join(process.cwd(), "database/lessons-index.json");
  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  let lessons: LessonEntry[] = Object.values(index.lessons);

  if (singleLesson !== undefined) {
    const lesson = lessons.find((l) => l.lessonNumber === singleLesson);
    if (!lesson) {
      console.error(`Lesson ${singleLesson} not found`);
      process.exit(1);
    }
    lessons = [lesson];
  } else {
    lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
  }

  console.log(`Compositing ${lessons.length} lesson(s)...\n`);
  let success = 0;
  let fail = 0;

  for (const lesson of lessons) {
    const basePath = getBasePath(lesson.category, lesson.lessonNumber);
    if (!fs.existsSync(basePath)) {
      console.log(
        `  ✗ Base image missing for ${lesson.category}: ${path.basename(basePath)} — run --generate-bases first`
      );
      fail++;
      continue;
    }

    const finalPath = path.join(
      OUTPUT_DIR,
      `lesson${lesson.lessonNumber}.png`
    );
    try {
      await compositeText(basePath, finalPath, lesson);
      success++;
    } catch (error: any) {
      console.error(
        `  ✗ Error compositing lesson ${lesson.lessonNumber}:`,
        error.message || error
      );
      fail++;
    }
  }

  console.log(`\nDone! ${success} succeeded, ${fail} failed.`);
}

// --- Main ---

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const args = process.argv.slice(2);
  const doGenerateBases = args.includes("--generate-bases");
  const doComposite = args.includes("--composite");

  if (!doGenerateBases && !doComposite) {
    console.log(
      "Usage:\n" +
        "  --generate-bases             Generate 15 base images (requires GEMINI_API_KEY)\n" +
        "  --composite                  Composite all 59 lessons from bases\n" +
        "  --composite --lesson 14      Composite a single lesson\n" +
        "  --generate-bases --composite Both steps"
    );
    process.exit(0);
  }

  if (doGenerateBases) {
    fs.mkdirSync(BASES_DIR, { recursive: true });
    await generateBases();
    console.log("");
  }

  if (doComposite) {
    const lessonArg = args.indexOf("--lesson");
    const singleLesson =
      lessonArg !== -1 ? parseInt(args[lessonArg + 1], 10) : undefined;
    await compositeAll(singleLesson);
  }
}

main();
