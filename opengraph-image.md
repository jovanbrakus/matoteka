# Task: Per-Lesson OpenGraph Image Generation

## Problem

Each lesson's hero image is 896x1200 (portrait). Social media platforms (Facebook, Twitter/X, LinkedIn, Telegram, Discord) expect landscape OG images, ideally **1200x630**. The current portrait images get awkwardly cropped or letterboxed in link previews, resulting in poor visual impact when lessons are shared.

## Goal

Generate a branded, landscape (1200x630) OG image for each lesson at build time using Next.js `ImageResponse`. When someone shares `https://matoteka.com/znanje/aritmeticki-niz-progresija`, the link preview shows a polished card with the lesson's hero image, title, and Matoteka branding.

## Design Spec

```
+------------------------------------------------------------------+
|                                                                    |
|  +------------------+                                              |
|  |                  |    MATOTEKA · CENTAR ZNANJA · LEKCIJA 55     |
|  |   Hero Image     |                                              |
|  |   (portrait,     |    Aritmeticki niz (progresija)              |
|  |    cropped to    |                                              |
|  |    fill box)     |    ~40 min citanja                           |
|  |                  |    #algebra                                   |
|  +------------------+                                              |
|                                                                    |
|                                           [beaver logo]  Matoteka  |
+------------------------------------------------------------------+
```

**Layout**: Dark background (#0a0a0a or similar to match site theme). Left ~40% is the hero image (cropped center, covers the area). Right ~60% is text content.

**Typography**:
- Eyebrow: small, uppercase, orange (#FF6B00), letter-spaced — "MATOTEKA · CENTAR ZNANJA · LEKCIJA {N}"
- Title: large, bold, white — lesson title (may need line clamping for long titles)
- Meta line: small, muted gray — reading time + category badge
- Bottom-right: Matoteka logo (beaver) + "Matoteka" wordmark

**Colors**:
- Background: `#0a0a0a` (dark, matches site dark theme)
- Accent: `#FF6B00` (Matoteka orange)
- Text: white for title, `#999` for meta
- Subtle gradient overlay on the hero image edge to blend into the dark background

## Implementation

### File: `app/znanje/[lessonSlug]/opengraph-image.tsx`

Next.js convention file. When placed in a route directory, Next.js automatically:
- Generates the image at build time (for static routes with `generateStaticParams`)
- Sets the `<meta property="og:image">` tag
- Sets proper `Content-Type`, `width`, and `height` meta tags

This **replaces** the manual `images` array in `generateMetadata()` — Next.js handles it automatically.

### What to use

- `next/og` `ImageResponse` — renders JSX to a PNG using Satori (SVG-based renderer)
- Satori supports a subset of CSS (flexbox, basic text styling, borders, images)
- Satori does **NOT** support: CSS Grid, `position: absolute` inside `position: relative` (use flexbox instead), `box-shadow`, `text-shadow`, `background-blend-mode`, `filter`, gradients on text
- Fonts must be loaded explicitly as ArrayBuffer (not CSS @font-face)

### Font loading

Load Inter (bold + regular) from the local `public/` or `node_modules` directory. Satori requires `.ttf` or `.woff` font files passed as ArrayBuffer:

```typescript
const interBold = fetch(new URL('/fonts/Inter-Bold.ttf', import.meta.url))
  .then(res => res.arrayBuffer());
```

Alternatively, fetch from Google Fonts CDN at build time. Since this runs at build time for static pages, network fetches are fine.

**Note**: Fredoka (the logo font) can be loaded similarly if the wordmark should match exact branding. Otherwise, Inter Bold is acceptable for the wordmark.

### Hero image loading

The hero images are in `public/images/lessons/`. Since `opengraph-image.tsx` runs server-side, read the image via:
- `fs.readFileSync()` to get the buffer, then convert to base64 data URL, OR
- Reference via absolute URL: `https://matoteka.com/api/lessons/{id}/hero` (works at build time if the dev server is running)
- Simplest: use a relative file path read with `fs` since this is a build-time operation

### Dimensions

```typescript
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
```

### Static generation

Add `generateStaticParams` (can re-export from the page) so OG images are generated at build time for all 59 lessons:

```typescript
export { generateStaticParams } from './page';
```

### After implementation

Remove the `images` array from `generateMetadata()` in the page — Next.js will auto-detect the `opengraph-image.tsx` file and inject the correct `<meta>` tags with proper dimensions.

## Edge Cases

- **Long titles**: Some lesson titles are very long (e.g., "Funkcije (preslikavanja, injekcija, surjekcija, bijekcija i inverzna funkcija)"). The title text must truncate or wrap gracefully within the available space. Use `text-overflow: ellipsis` or limit to 2-3 lines.
- **Missing hero images**: 3 lessons (45, 47, 48) have empty `heroImage` fields but the hero files exist at `knowledge/lesson{N}_hero.png`. The `getLessonHeroPath()` function handles this. Fall back to a default gradient if the image truly doesn't exist.
- **Cyrillic/Latin Serbian**: All titles are Latin Serbian. No special character rendering issues expected with Inter font.
- **Build time**: 59 PNG images at 1200x630 will add some build time. Satori is fast (~100ms per image), so expect ~6-10 seconds total.

## Files to Modify

| File | Change |
|------|--------|
| `app/znanje/[lessonSlug]/opengraph-image.tsx` | **New** — OG image generation |
| `app/znanje/[lessonSlug]/page.tsx` | Remove `images` array from `generateMetadata()` return |

## Verification

1. `npm run build` — should generate 59 OG images without errors
2. Check a generated image: `curl http://localhost:3000/znanje/aritmeticki-niz-progresija/opengraph-image` — should return a 1200x630 PNG
3. View page source — `<meta property="og:image">` should point to the auto-generated image URL
4. Test with https://developers.facebook.com/tools/debug/ or https://cards-dev.twitter.com/validator (after deployment)
5. Verify long-title lessons render without text overflow issues
