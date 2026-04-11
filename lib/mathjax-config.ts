/**
 * Single source of truth for MathJax configuration.
 *
 * Two consumers:
 *   1. React path — `better-react-mathjax` <MathJaxContext> on /primer and
 *      other React pages. Imports MATHJAX_CONFIG (object) + MATHJAX_SRC (url).
 *   2. Iframe path — app/api/problems/[problemId]/html/route.ts serves full
 *      HTML docs into sandboxed iframes. Imports MATHJAX_INLINE_SCRIPT (string)
 *      + MATHJAX_SRC (url) and injects them into a <script> tag.
 *
 * Keeping these aligned means any tweak (new delimiters, linebreak config,
 * MathJax version bump) happens in one place.
 */

/** Config for the React path (`better-react-mathjax` <MathJaxContext>). */
export const MATHJAX_CONFIG = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    packages: { "[+]": ["ams"] },
  },
  svg: { fontCache: "global" },
};

export const MATHJAX_SRC =
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";

/**
 * Config for the iframe path. Historically accepts `$...$` as an inline
 * delimiter in addition to `\(...\)` because v1/v2 problem HTML files emit
 * both. The React path does not need `$...$` (primer and lesson pages only
 * use `\(...\)`), so it's kept iframe-specific to avoid surprising MathJax
 * with stray `$` characters in Serbian prose.
 */
const IFRAME_MATHJAX_CONFIG = {
  ...MATHJAX_CONFIG,
  tex: {
    ...MATHJAX_CONFIG.tex,
    inlineMath: [
      ["\\(", "\\)"],
      ["$", "$"],
    ],
  },
};

/**
 * Stringified config for inlining into an HTML document served to an iframe.
 * JSON.stringify is safe because the config contains only JSON-serializable
 * values (no functions, no undefineds).
 */
export const MATHJAX_INLINE_SCRIPT = `window.MathJax=${JSON.stringify(
  IFRAME_MATHJAX_CONFIG,
)};`;
