import { auth } from "@/lib/auth";
import { getProblemHtml, getProblemMeta } from "@/lib/problems";
import { checkSolutionRateLimit, recordSolutionView } from "@/lib/utils/solution-rate-limit";
import { injectWatermark } from "@/lib/utils/watermark";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';",
  "X-Frame-Options": "SAMEORIGIN",
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  "X-Content-Type-Options": "nosniff",
};

const UNAUTHORIZED_HTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: 'Inter', sans-serif; display: flex; align-items: center;
         justify-content: center; height: 100vh; margin: 0; color: #64748b;
         background: transparent; }
  .msg { text-align: center; }
  h2 { color: #334155; margin-bottom: 8px; }
</style></head>
<body><div class="msg">
  <h2>Potrebna prijava</h2>
  <p>Prijavi se da bi video rešenje.</p>
</div></body></html>`;

function rateLimitHtml(used: number, limit: number): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: 'Inter', sans-serif; display: flex; align-items: center;
         justify-content: center; height: 100vh; margin: 0; color: #64748b;
         background: transparent; }
  .msg { text-align: center; max-width: 400px; }
  h2 { color: #334155; margin-bottom: 8px; }
  .count { font-size: 2rem; color: #f97316; font-weight: 700; }
</style></head>
<body><div class="msg">
  <div class="count">${used}/${limit}</div>
  <h2>Dnevni limit dostignut</h2>
  <p>Pregledao si maksimalan broj resenja za danas. Vrati se sutra!</p>
</div></body></html>`;
}

/**
 * Strip CSS patterns that cause infinite iframe resize loops and inject
 * a script to block window resize listeners (which create feedback loops
 * with the parent's ResizeObserver that manages iframe height).
 */
function sanitizeForIframe(html: string): string {
  const cleaned = html
    .replace(/min-height:\s*100vh;?/gi, "")
    .replace(/max-width:\s*\d+px;?/gi, "")
    .replace(/margin:\s*0\s+auto;?/gi, "")
    // Replace hardcoded dark-theme text colors with CSS variables.
    // In dark mode the variables resolve to the same values, so no visual change.
    // In light mode they resolve to dark, readable text.
    .replace(/color:\s*#e2e8f0/gi, "color: var(--sol-text)")
    .replace(/color:\s*#cbd5e1/gi, "color: var(--sol-text)")
    .replace(/color:\s*#94a3b8/gi, "color: var(--sol-text-secondary)");

  // Inject a script early in <head> to block resize listeners before any problem scripts run.
  // Canvas draw functions re-read DPR-scaled canvas.width on resize and scale again,
  // doubling the canvas size each cycle until the page crashes.
  const blockResize = `<script>(function(){var o=window.addEventListener;window.addEventListener=function(t){if(t==="resize")return;return o.apply(this,arguments)}})();</script>`;
  return cleaned.replace(/<head([^>]*)>/i, `<head$1>${blockResize}`);
}

// Read solution-v1.css once at startup and inline it as a <style> block.
// External <link> stylesheets are blocked by CSP in sandboxed iframes (without
// allow-same-origin, 'self' resolves to the opaque null origin, not the parent).
const SOLUTION_THEME_CSS = fs.readFileSync(
  path.join(process.cwd(), "public", "solution-v1.css"),
  "utf-8"
);
const THEME_LINKS = `<style>${SOLUTION_THEME_CSS}</style>`;

// v2 fragment CSS (loaded once at startup)
const SOLUTION_V2_CSS_PATH = path.join(process.cwd(), "public", "solution-v2.css");
const SOLUTION_V2_CSS = fs.existsSync(SOLUTION_V2_CSS_PATH)
  ? fs.readFileSync(SOLUTION_V2_CSS_PATH, "utf-8")
  : "";

function stripRedundantV2Cards(fragment: string): string {
  // Remove title and subtitle (already shown above the solution)
  let result = fragment
    .replace(/<h1\s+data-card="problem-title"[^>]*>[\s\S]*?<\/h1>/, '')
    .replace(/<p\s+data-card="problem-subtitle"[^>]*>[\s\S]*?<\/p>/, '');

  // Remove problem-statement card (nested divs — use depth tracking)
  const marker = result.match(/<div\s+data-card="problem-statement"/);
  if (marker && marker.index !== undefined) {
    const startIdx = marker.index;
    let depth = 0;
    let i = startIdx;
    while (i < result.length) {
      if (result.startsWith("<div", i)) { depth++; i += 4; }
      else if (result.startsWith("</div>", i)) { depth--; if (depth === 0) { i += 6; break; } i += 6; }
      else { i++; }
    }
    result = result.substring(0, startIdx) + result.substring(i);
  }

  return result;
}

function sanitizeV2Fragment(fragment: string): string {
  return fragment
    .replace(/<script\s+type="text\/info"\s+id="logic-scratchpad">[\s\S]*?<\/script>/, '')
    .replace(/<!--BRAINSPARK_META[\s\S]*?BRAINSPARK_META-->/, '');
}

function wrapV2Fragment(fragment: string, theme: string): string {
  const themeClass = theme === "light" ? "light" : "dark";
  const solutionOnly = sanitizeV2Fragment(stripRedundantV2Cards(fragment));
  return `<!DOCTYPE html>
<html lang="sr" class="${themeClass}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>MathJax={tex:{inlineMath:[['\\\\(','\\\\)'],['$','$']],displayMath:[['\\\\[','\\\\]']]},svg:{fontCache:'global'}};</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<style>${SOLUTION_V2_CSS}</style>
${ANTI_COPY_CSS}
</head>
<body>
<div class="solution-container">
${solutionOnly}
</div>
${POST_MESSAGE_SCRIPT}
${ANTI_COPY_SCRIPT}
</body>
</html>`;
}

function extractV2StatementHtml(fragment: string, theme: string): string {
  const themeClass = theme === "light" ? "light" : "dark";
  // Extract the problem-statement card using depth tracking (nested divs)
  const marker = fragment.match(/<div\s+data-card="problem-statement"/);
  if (!marker || marker.index === undefined) return "";
  const startIdx = marker.index;
  let depth = 0;
  let i = startIdx;
  while (i < fragment.length) {
    if (fragment.startsWith("<div", i)) { depth++; i += 4; }
    else if (fragment.startsWith("</div>", i)) { depth--; if (depth === 0) { i += 6; break; } i += 6; }
    else { i++; }
  }
  const statementDiv = fragment.substring(startIdx, i);
  if (!statementDiv) return "";

  return `<!DOCTYPE html>
<html lang="sr" class="${themeClass}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>MathJax={tex:{inlineMath:[['\\\\(','\\\\)'],['$','$']],displayMath:[['\\\\[','\\\\]']]},svg:{fontCache:'global'}};</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<style>${SOLUTION_V2_CSS}</style>
<style>
  body { padding: 10px; margin: 0; }
  .answer-option, .answer-grid { display: none !important; }
</style>
</head>
<body>
<div class="solution-container">
  ${statementDiv}
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.answer-option, .answer-grid').forEach(function(el) { el.remove(); });
});
</script>
${POST_MESSAGE_SCRIPT}
</body>
</html>`;
}

/** postMessage-based resize reporting + theme listener (replaces contentDocument access) */
const POST_MESSAGE_SCRIPT = `<script>(function(){
  function reportHeight(){
    var body=document.body;if(!body)return;
    var s=window.getComputedStyle(body);
    var h=body.offsetHeight+parseInt(s.marginTop||'0',10)+parseInt(s.marginBottom||'0',10)+1;
    window.parent.postMessage({type:'matoteka-resize',height:h},'*');
  }
  if(window.ResizeObserver)new ResizeObserver(reportHeight).observe(document.body);
  setTimeout(reportHeight,1000);setTimeout(reportHeight,3000);setTimeout(reportHeight,8000);
  if(document.readyState==='complete')reportHeight();
  else window.addEventListener('load',reportHeight);
  window.addEventListener('message',function(e){
    if(e.data&&e.data.type==='matoteka-theme')document.documentElement.className=e.data.theme;
  });
})();</script>`;

const ANTI_COPY_CSS = `<style>
  body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
  @media print{body{display:none!important}}
</style>`;

const ANTI_COPY_SCRIPT = `<script>document.addEventListener('contextmenu',function(e){e.preventDefault()});</script>`;

function injectPostMessageScript(html: string): string {
  return html.replace(/<\/body>/i, `${POST_MESSAGE_SCRIPT}\n</body>`);
}

function injectAntiCopy(html: string): string {
  const withCss = html.replace(/<\/head>/i, `${ANTI_COPY_CSS}\n</head>`);
  return withCss.replace(/<\/body>/i, `${ANTI_COPY_SCRIPT}\n</body>`);
}

/**
 * Inject the shared theme stylesheet link after the last embedded <style> block
 * so it wins the CSS cascade naturally.
 */
function injectThemeLink(html: string): string {
  // Insert after the last </style> in <head> for cascade priority
  const headEnd = html.search(/<\/head>/i);
  if (headEnd === -1) return html;
  const headSection = html.substring(0, headEnd);
  const lastStyleClose = headSection.lastIndexOf("</style>");
  if (lastStyleClose !== -1) {
    const insertAt = lastStyleClose + "</style>".length;
    return html.substring(0, insertAt) + "\n" + THEME_LINKS + html.substring(insertAt);
  }
  // Fallback: insert before </head>
  return html.replace(/<\/head>/i, `${THEME_LINKS}\n</head>`);
}

/**
 * Set the theme class on the <html> element so solution-v1.css variables apply.
 */
function injectThemeClass(html: string, theme: string): string {
  const themeClass = theme === "light" ? "light" : "dark";
  // Handle <html> with existing attributes but no class
  return html.replace(/<html([^>]*)>/i, (match, attrs: string) => {
    if (/class\s*=/.test(attrs)) {
      // Replace existing class value
      return `<html${attrs.replace(/class\s*=\s*["'][^"']*["']/, `class="${themeClass}"`)}>`;
    }
    return `<html${attrs} class="${themeClass}">`;
  });
}

/**
 * Inject CSS to neutralize correct-answer highlighting in the problem statement
 * (top section) while preserving it in the final answer section (bottom).
 */
function neutralizeAnswerHighlights(html: string): string {
  const css = `<style>
  .answer-option.correct,
  .answer-chip.correct,
  .answer-option.selected-correct,
  .answer-option.incorrect,
  .given-item.answer-option.correct,
  .given-item.answer-option.incorrect {
    border-color: var(--sol-accent-border) !important;
    background: var(--sol-accent-tint) !important;
    color: var(--sol-text) !important;
    font-weight: normal !important;
  }
</style>`;
  return html.replace(/<\/head>/i, `${css}\n</head>`);
}

function extractStatementHtml(html: string, theme: string): string {
  // Match all class variations: "card problem-statement", "problem-statement", "problem-statement card"
  let markerMatch = html.match(/<div\s+class="[^"]*problem-statement[^"]*">/);
  // Fallback: older files use the first <div class="card"> as the statement container
  if (!markerMatch) {
    markerMatch = html.match(/<div\s+class="card">/);
  }
  if (!markerMatch) return "";
  const startIdx = html.indexOf(markerMatch[0]);

  let depth = 0;
  let i = startIdx;
  while (i < html.length) {
    if (html.startsWith("<div", i)) {
      depth++;
      i += 4;
    } else if (html.startsWith("</div>", i)) {
      depth--;
      if (depth === 0) {
        i += 6;
        break;
      }
      i += 6;
    } else {
      i++;
    }
  }

  let statementDiv = html.substring(startIdx, i);

  // Strip "Ponudjeni odgovori:" label text (appears as <p> or <h3> depending on the file)
  statementDiv = statementDiv.replace(/<(p|h[1-6])[^>]*>[^<]*(?:Ponud|Ponuđ)[^<]*odgovor[^<]*<\/\1>/gi, "");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const headContent = headMatch ? headMatch[1] : "";
  const cleanHead = headContent.replace(/<script[^>]*id="logic-scratchpad"[^>]*>[\s\S]*?<\/script>/i, "");

  const themeClass = theme === "light" ? "light" : "dark";

  const lightOverrides = theme === "light" ? `<style>
  /* Force MathJax text to dark color in light theme */
  html.light mjx-container, html.light mjx-math, html.light mjx-mi,
  html.light mjx-mo, html.light mjx-mn, html.light mjx-mfrac,
  html.light mjx-msup, html.light mjx-msub, html.light mjx-mrow,
  html.light mjx-mtext, html.light mjx-msqrt {
    color: #334155 !important;
  }
</style>` : "";

  return `<!DOCTYPE html>
<html lang="sr" class="${themeClass}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${cleanHead}
<style>
  body { padding: 10px; margin: 0; }
  .container { padding: 0; }
  .card, .problem-statement { margin-bottom: 0; }
  /* Preemptively hide answer options to prevent flash before JS removal */
  .answer-option, .answer-chip, .answer-options-row, .options-grid { display: none !important; }
</style>
${THEME_LINKS}
${lightOverrides}
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Remove answer option elements entirely so they don't affect layout
  document.querySelectorAll('.answer-option, .answer-chip, .answer-options-row, .options-grid').forEach(el => el.remove());
  // Remove empty .given-grid containers left behind
  document.querySelectorAll('.given-grid').forEach(el => {
    if (el.children.length === 0) el.remove();
  });
});
</script>
</head>
<body>
<div class="container">
  ${statementDiv}
</div>
${POST_MESSAGE_SCRIPT}
</body>
</html>`;
}

export async function GET(req: Request, { params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const url = new URL(req.url);
  const section = url.searchParams.get("section");
  const theme = url.searchParams.get("theme") || "light";

  // All problem HTML (statements and solutions) requires authentication
  const session = await auth();
  if (!session?.user) {
    return new NextResponse(UNAUTHORIZED_HTML, { status: 401, headers: HEADERS });
  }

  const html = getProblemHtml(problemId);

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Detect v2 format
  const meta = getProblemMeta(problemId);
  const isV2 = meta?.format === "v2";

  if (isV2) {
    // --- v2 fragment path ---
    if (section === "statement") {
      const statementHtml = extractV2StatementHtml(html, theme);
      if (!statementHtml) {
        return new NextResponse("Statement not found", { status: 404 });
      }
      return new NextResponse(statementHtml, { headers: HEADERS });
    }

    const userId = session.user.id;
    const role = session.user.role;

    if (role !== "admin") {
      const { allowed, used, limit } = await checkSolutionRateLimit(userId);
      if (!allowed) {
        return new NextResponse(rateLimitHtml(used, limit), { status: 429, headers: HEADERS });
      }
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const ua = req.headers.get("user-agent");
    await recordSolutionView(userId, problemId, ip, ua);

    const wrapped = wrapV2Fragment(html, theme);
    const watermarked = injectWatermark(wrapped, userId, problemId);
    return new NextResponse(watermarked, { headers: HEADERS });
  }

  // --- v1 full-HTML path ---
  const safeHtml = sanitizeForIframe(html);

  if (section === "statement") {
    const statementHtml = extractStatementHtml(safeHtml, theme);
    if (!statementHtml) {
      return new NextResponse("Statement not found", { status: 404 });
    }
    return new NextResponse(injectPostMessageScript(statementHtml), { headers: HEADERS });
  }

  const userId = session.user.id;
  const role = session.user.role;

  // Rate limit full solutions (admins bypass)
  if (role !== "admin") {
    const { allowed, used, limit } = await checkSolutionRateLimit(userId);
    if (!allowed) {
      return new NextResponse(rateLimitHtml(used, limit), { status: 429, headers: HEADERS });
    }
  }

  // Record view (audit log is fire-and-forget)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const ua = req.headers.get("user-agent");
  await recordSolutionView(userId, problemId, ip, ua);

  const themed = injectThemeClass(injectThemeLink(neutralizeAnswerHighlights(safeHtml)), theme);
  const watermarked = injectWatermark(themed, userId, problemId);
  const protected_ = injectAntiCopy(injectPostMessageScript(watermarked));
  return new NextResponse(protected_, { headers: HEADERS });
}
