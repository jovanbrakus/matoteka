# Design System: The Friendly Coach

## 1. Overview & Creative North Star: "The Kinetic Atelier"

This design system rejects the cold, sterile nature of traditional educational platforms. Instead of a clinical "learning management system," we are building **"The Kinetic Atelier."** 

The creative vision is a space that feels like a sun-drenched studio—warm, tactile, and vibrating with potential. We move beyond the "standard" web grid by embracing **Organic Editorialism**. This means intentional asymmetry, generous breathing room (white space that feels like "fresh air"), and a layering system that mimics physical sheets of high-end paper. We avoid the "template" look by overlapping decorative math-themed illustrations with UI containers, breaking the bounds of the container to suggest growth and energy.

---

## 2. Colors: Tonal Warmth & Vitality

Our palette is rooted in the earth and the sun. It is designed to reduce cognitive load while maintaining a high "energy" floor.

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders for sectioning or containment.** We define space through background shifts. For example, a `surface-container-low` section should sit against a `surface` background to denote a change in context. Boundaries are felt, not seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use Material-style nesting to create depth without clutter:
- **Base Layer:** `surface` (#FFF5EC) – The foundation.
- **Secondary Sections:** `surface-container-low` (#F9EFE5) – For sidebar or secondary content.
- **Interactive Cards:** `surface-container-lowest` (#FFFFFF) – To create a "pop" of clean white for focus areas.
- **Topmost Priority:** `surface-container-highest` (#E6DBD0) – For persistent navigation or structural anchors.

### The "Glass & Gradient" Rule
To elevate the "Friendly Coach" from a standard app to a premium experience, use **Glassmorphism** for floating elements (like toast notifications or floating action buttons). Use `surface` colors at 70% opacity with a `20px` backdrop blur.

**Signature Texture:** Major CTAs and Hero sections should utilize a subtle linear gradient (135°) from `primary` (#954400) to `primary-container` (#FF7B04). This adds "soul" and a sense of internal light that flat colors lack.

---

## 3. Typography: Confident Editorial

We pair **Plus Jakarta Sans** (Display/Headlines) with **Inter** (Body/Labels) to balance high-energy charisma with clinical legibility.

| Level | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | Bold, tight tracking. The "Voice" of the coach. |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | Energetic and motivating. |
| **Title** | `title-lg` | Inter | 1.375rem | Medium weight. Friendly and direct. |
| **Body** | `body-lg` | Inter | 1rem | High readability, generous line height (1.6). |
| **Label** | `label-md` | Inter | 0.75rem | Uppercase with 0.05em letter spacing for metadata. |

**Hierarchy Strategy:** Headlines should often be "broken" across two lines with intentional asymmetry to create a more bespoke, editorial feel. Use `on-surface-variant` (#615A54) for long-form body text to reduce eye strain against the cream background.

---

## 4. Elevation & Depth: Tonal Layering

We do not use "drop shadows" in the traditional sense. We use **Ambient Light.**

- **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, soft lift.
- **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    - *Example:* `box-shadow: 0 20px 40px rgba(51, 46, 40, 0.06);` 
    - The shadow color is a tinted version of `on-surface`, never pure black.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (#B4ACA4) at **15% opacity**. It should be a "whisper" of a line, barely perceptible.
- **Glassmorphism:** Use for overlays to maintain the "Friendly Coach" transparency. A blurred background suggests the content is still there, just momentarily stepped back.

---

## 5. Components: Tactile & Friendly

### Buttons (The Energy Drivers)
- **Primary:** Gradient fill (`primary` to `primary-container`), `XL` roundedness (3rem), and a soft `primary` tinted shadow.
- **Secondary:** `surface-container-highest` fill with `primary` text. No border.
- **Tertiary:** Pure text in `primary`, but with a `0.5rem` underline in `surface-variant` that expands on hover.

### Cards & Progress
- **The "No Divider" Rule:** Forbid the use of divider lines in lists or cards. Separate items using `md` (1.5rem) spacing or subtle background shifts between `surface-container-low` and `surface-container-high`.
- **Corner Radii:** Use `lg` (2rem) for main cards and `md` (1.5rem) for nested elements. This "nested roundness" creates a cohesive, soft aesthetic.

### Input Fields
- Avoid box-style inputs. Use a "Soft Tray" approach: a `surface-container-highest` background with `none` border and `md` roundedness. On focus, transition to a `primary` ghost border (20% opacity).

### Specialized Math Components
- **The "Success Path":** Use `secondary` (#006A34) for "Strong" states with a `secondary-container` (#6DFE9C) soft glow.
- **Progress Illustrations:** Use decorative math-themed vector elements that "bleed" off the edge of cards to suggest the subject matter is larger than the screen.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use intentional white space. If a layout feels "full," it’s too corporate. Add 24px of breathing room.
- **Do** overlap elements. Let a math illustration or a "Coach Chip" sit halfway off a card to break the grid.
- **Do** use the `XL` roundedness (3rem) for all main interactive surfaces to maintain the "approachable" personality.

### Don’t:
- **Don't** use 100% black text. Always use `on-surface` (#332E28) to maintain the warm, organic feel.
- **Don't** use sharp corners. Any radius under `0.5rem` is considered "too sharp" for this brand.
- **Don't** use traditional grid-lines or dividers. If you need to separate content, use a tonal shift or a larger vertical gap.
- **Don't** use clinical imagery. Use high-quality, hand-drawn or stylized 3D math illustrations that feel premium and bespoke.