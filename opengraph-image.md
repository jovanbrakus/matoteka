# Task: Per-Lesson OpenGraph Image Generation

## Problem

Each lesson's hero image is 896x1200 (portrait). Social media platforms (Facebook, Twitter/X, LinkedIn, Telegram, Discord) expect landscape OG images, ideally **1200x630**. The current portrait images get awkwardly cropped or letterboxed in link previews, resulting in poor visual impact when lessons are shared.

## Goal

Generate a branded, landscape (1200x630) OG image for each lesson using **Gemini `gemini-3.1-flash-image-preview`** image generation. When someone shares `https://matoteka.com/znanje/aritmeticki-niz-progresija`, the link preview shows a polished card with the lesson's hero image, title, and Matoteka branding.

## Design Spec

```
+------------------------------------------------------------------+
|                                                                    |
|  +------------------+                                              |
|  |                  |    MATOTEKA · CENTAR ZNANJA · LEKCIJA 55     |
|  |   Hero Image     |                                              |
|  |   (portrait,     |    Aritmeticki niz (progresija)              |
|  |    cropped to    |                                              |
|  |    fill box)     |                                              |
|  |                  |    #algebra                                  |
|  +------------------+                                              |
|                                                                    |
|                                           [brain logo]   Matoteka  |
+------------------------------------------------------------------+
```

**Layout**: Dark background (#0a0a0a or similar to match site theme). Left ~40% is the hero image (cropped center, covers the area). Right ~60% is text content.

**Typography**:
- Eyebrow: small, uppercase, orange (#FF6B00), letter-spaced — "MATOTEKA · CENTAR ZNANJA · LEKCIJA {N}"
- Title: large, bold, white — lesson title (may need line clamping for long titles)
- Meta line: small, muted gray — reading time + category badge
- Bottom-right: Matoteka logo (pixel-art brain) + "Matoteka" wordmark

**Colors**:
- Background: `#0a0a0a` (dark, matches site dark theme)
- Accent: `#FF6B00` (Matoteka orange)
- Text: white for title, `#999` for meta
- Subtle gradient overlay on the hero image edge to blend into the dark background

## Implementation

### Approach: Gemini `gemini-3.1-flash-image-preview` Image Generation

Use the **`gemini-3.1-flash-image-preview`** model from Google GenAI to generate OG images. This is the **only** model to use — do not use Satori, `next/og` `ImageResponse`, DALL-E, or any other image generation approach.

### Script: `scripts/generate-og-images.ts`

A standalone script (similar to `scripts/generate-category-images.ts`) that:
1. Reads lesson metadata from `database/lessons-index.json`
2. Sends a detailed prompt to `gemini-3.1-flash-image-preview` describing the desired OG card layout (without logo — the prompt tells Gemini to leave the bottom-right corner empty)
3. Composites the real `public/logo-brain.png` (pixel-art brain) + "Matoteka" wordmark onto the bottom-right corner using **sharp**
4. Saves the final PNG to `public/images/og/lesson{N}.png` (1200x630)

### Prompt Design

Each prompt should instruct Gemini to generate a 1200x630 landscape image that matches the design spec above, including:
- Dark background with the lesson title as prominent text
- Category color accent
- Math-themed decorative elements relevant to the lesson topic
- **No logo or branding in the bottom-right** — that area is reserved for the composited real logo

### Logo Compositing (post-generation)

After Gemini generates the base image, the script uses **sharp** to composite:
- The pixel-art brain logo (`public/logo-brain.png`) resized to 56x56px
- A "Matoteka" wordmark rendered as SVG text (30px, white, semi-bold)
- Positioned in the bottom-right corner with consistent margins

### Integration with Next.js

After generation, update `generateMetadata()` in `app/znanje/[lessonSlug]/page.tsx` to reference the static OG image:

```typescript
images: [{ url: `/images/og/lesson${lesson.lessonNumber}.png`, width: 1200, height: 630 }]
```

### Dimensions

Output images must be **1200x630** pixels (landscape, standard OG ratio).

## Edge Cases

- **Long titles**: Some lesson titles are very long (e.g., "Funkcije (preslikavanja, injekcija, surjekcija, bijekcija i inverzna funkcija)"). The title text must truncate or wrap gracefully within the available space. Use `text-overflow: ellipsis` or limit to 2-3 lines.
- **Missing hero images**: 3 lessons (45, 47, 48) have empty `heroImage` fields but the hero files exist at `knowledge/lesson{N}_hero.png`. The `getLessonHeroPath()` function handles this. Fall back to a default gradient if the image truly doesn't exist.
- **Cyrillic/Latin Serbian**: All titles are Latin Serbian. No special character rendering issues expected with Inter font.
- **Generation time**: Gemini image generation takes ~5-15 seconds per image. Generate in batches with delays to avoid rate limiting. Full 59-lesson run may take ~5-10 minutes.

## Files to Modify

| File | Change |
|------|--------|
| `scripts/generate-og-images.ts` | **New** — Gemini-based OG image generation script |
| `app/znanje/[lessonSlug]/page.tsx` | Update `images` array in `generateMetadata()` to point to static OG images |

## Verification

1. Run `GEMINI_API_KEY=... npx tsx scripts/generate-og-images.ts --lesson 1` to test a single lesson
2. Verify the output image at `public/images/og/lesson1.png` is 1200x630 and looks correct
3. Run full generation: `GEMINI_API_KEY=... npx tsx scripts/generate-og-images.ts`
4. `npm run build` — verify no errors
5. View page source — `<meta property="og:image">` should point to the static OG image URL
6. Test with https://developers.facebook.com/tools/debug/ or https://cards-dev.twitter.com/validator (after deployment)
