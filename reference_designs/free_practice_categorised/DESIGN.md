# Design System Strategy: Mathematical Luminance

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Luminous Monolith."** 

We are moving away from the "educational dashboard" trope of cluttered sidebars and white cards. Instead, we treat mathematics as a high-end, elite pursuit—akin to a premium tech startup’s IDE or a luxury automotive interface. The aesthetic is built on "Obsidian Depth": a vast, dark canvas where knowledge is revealed through light, glassmorphism, and neon-orange precision. 

By leveraging intentional asymmetry, we break the rigid "online course" feel. We use the **Space Grotesk** display face to echo geometric engineering, while the layout uses overlapping "frosted" layers to create a sense of physical, world-class architecture.

---

## 2. Color Theory & Surface Logic
This system thrives on the absence of light and the strategic use of "Neon Sunset" accents.

### The "No-Line" Rule
**Strict Directive:** 1px solid borders are prohibited for sectioning. We do not use "lines" to separate math modules or lessons. Boundaries are defined exclusively through:
*   **Background Shifts:** Transitioning from `surface` (#0e0e0e) to `surface-container-low` (#131313).
*   **Tonal Transitions:** Using subtle gradients to suggest an edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked obsidian sheets.
*   **Base Layer:** `surface-dim` (#0e0e0e) for the main viewport background.
*   **Section Layer:** `surface-container-low` (#131313) for large content areas.
*   **Interactive Layer:** `surface-container-highest` (#262626) for active cards or hover states.

### The "Glass & Gradient" Rule
To achieve the "Elite Tech" look, main interactive elements should use **Glassmorphism**.
*   **The Recipe:** Use `surface-variant` (#262626) at 60% opacity with a `backdrop-blur` of 20px. 
*   **Signature Textures:** Apply a linear gradient from `primary` (#ff9159) to `secondary` (#fe9d00) at 135° for high-impact CTAs and lesson progress indicators. This isn't just color; it’s "energy."

---

## 3. Typography: The Geometric Voice
We use typography to convey authority and precision.

*   **Display & Headlines (Space Grotesk):** This is our "Mathematical" face. Its geometric apertures feel engineered. Use `display-lg` for hero stats and "Mastery" levels to celebrate achievement with scale.
*   **Body & Titles (Manrope):** A modern, highly legible sans-serif. It provides the "Professional" counterweight to the sharp headlines.
*   **Labels (Inter):** Used for micro-data, like "Lesson 04" or "Time to Complete." Inter’s neutrality ensures that data is readable at even the smallest `label-sm` (0.6875rem) scale.

---

## 4. Elevation & Depth
Depth is not a shadow; it is a **Tonal Layering** of dark light.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container-low` section. The contrast in "darkness" creates a natural lift without a single pixel of stroke.
*   **Ambient Shadows:** For floating glass modals, use a shadow with a 40px blur, 0% spread, and an opacity of 8% using the `primary` color. This simulates a neon glow reflecting off a dark surface.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use `outline-variant` (#494847) at **15% opacity**. It should feel like a faint reflection on the edge of a lens, not a drawn line.

---

## 5. Components & Interface Elements

### Lesson Cards
*   **Structure:** No borders. Use `surface-container` background.
*   **Visual Separator:** Instead of dividers, use `1.4rem` (spacing scale 4) of vertical whitespace.
*   **Progress Visualization:** Use a 2px tall "Neon Sunset" gradient bar at the very bottom of the card, bleeding edge-to-edge.

### Buttons
*   **Primary:** Background: `primary` (#ff9159) to `secondary` (#fe9d00) gradient. Text: `on_primary_fixed` (#000000) for maximum punch. Corner Radius: `md` (0.375rem) for a sharp, professional look.
*   **Tertiary/Ghost:** No background. Text: `primary`. Hover state: `surface-variant` at 20% opacity.

### Progress Gauges (Signature Component)
For math hubs, visualizing progress is key. Use a "concentric circle" approach with `secondary_fixed_dim` (#ffb55e) for the inactive track and the `primary` neon gradient for the active progress. Apply a subtle `blur(4px)` to the active stroke to create a "light-pipe" effect.

### Input Fields
*   **Style:** `surface-container-highest` background. 
*   **State:** On focus, the bottom edge glows with a 1px `primary` accent. Avoid the "box focus" look; focus on the "underline glow."

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Align headline text to the left while keeping lesson cards in a 3-column structured grid to create visual tension.
*   **Embrace the Dark:** Let the #0e0e0e background breathe. Large negative spaces make the neon orange accents feel "elite."
*   **Layer Glass:** Use semi-transparent glass layers for navigation bars to allow mathematical geometric patterns to peek through from the background.

### Don’t:
*   **Don't use white backgrounds:** Even for "light mode" requests, stay within the `surface-bright` (#2c2c2c) range.
*   **Don't use standard shadows:** Never use a #000000 25% opacity shadow. It looks "cheap." Use tinted ambient glows.
*   **Don't use Dividers:** Avoid `<hr>` or border-bottom tags. Use the Spacing Scale (Step 6 or 8) to create "Structural Silence."

### Accessibility Note:
Ensure that all `label-sm` text on `surface` backgrounds maintains a contrast ratio of at least 4.5:1. Use `on_surface_variant` (#adaaaa) only for non-critical decorative metadata. Primary instructional text must always be `on_surface` (#ffffff).