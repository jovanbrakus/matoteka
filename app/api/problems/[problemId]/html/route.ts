import { auth } from "@/lib/auth";
import { MATHJAX_INLINE_SCRIPT, MATHJAX_SRC } from "@/lib/mathjax-config";
import { getProblemHtml } from "@/lib/problems";
import { checkSolutionRateLimit, recordSolutionView } from "@/lib/utils/solution-rate-limit";
import { injectWatermark } from "@/lib/utils/watermark";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; worker-src 'self' blob:; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data:; connect-src 'self' https://cdn.jsdelivr.net;",
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

/**
 * Inject a comment button into each <div data-card> and each .step inside
 * [data-card="step-solution"]. The button posts a `matoteka-comment-open`
 * message to the parent on click; the parent opens the CommentPanel in
 * response. Badge counts are updated via `matoteka-comment-counts` messages
 * from the parent after it fetches the comments for the problem.
 *
 * Scoped to run on the full-solution HTML only (not the extracted statement),
 * since the statement view only renders the problem-statement card and would
 * clutter the problem-load screen with a button users can't act on anyway.
 */
function injectCommentButtons(fragment: string): string {
  const $ = cheerio.load(fragment, { xml: false }, false);

  const makeButton = (cardType: string, step?: number): string => {
    const stepAttr = step != null ? ` data-anchor-step="${step}"` : "";
    return (
      `<button type="button" class="matoteka-comment-btn" ` +
      `data-anchor-card="${cardType}"${stepAttr} ` +
      `aria-label="Komentari">` +
      `<span class="matoteka-comment-icon" aria-hidden="true">` +
      // Simple chat bubble glyph — avoids needing an external icon font.
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ` +
      `viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
      `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>` +
      `</svg></span>` +
      `<span class="matoteka-comment-count" hidden>0</span>` +
      `</button>`
    );
  };

  // One button per data-card div (skip the title h1 + subtitle p variants).
  $("div[data-card]").each((_, el) => {
    const cardType = $(el).attr("data-card");
    if (!cardType) return;
    $(el).prepend(makeButton(cardType));
  });

  // One button per .step inside the step-solution card. The data-step
  // attribute carries a 1-indexed step number in the generated HTML.
  $('div[data-card="step-solution"] .step').each((_, el) => {
    const stepStr = $(el).attr("data-step");
    const step = stepStr ? Number(stepStr) : NaN;
    if (!Number.isInteger(step) || step < 1) return;
    $(el).prepend(makeButton("step-solution", step));
  });

  return $.html();
}

function wrapV2Fragment(fragment: string, theme: string): string {
  const themeClass = theme === "light" ? "light" : "dark";
  const sanitized = sanitizeV2Fragment(stripRedundantV2Cards(fragment));
  const withButtons = injectCommentButtons(sanitized);
  return `<!DOCTYPE html>
<html lang="sr" class="${themeClass}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>${MATHJAX_INLINE_SCRIPT}</script>
<script async src="${MATHJAX_SRC}"></script>
<style>${SOLUTION_V2_CSS}</style>
${ANTI_COPY_CSS}
</head>
<body>
<div class="solution-container">
${withButtons}
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

  // Inject the comment button into the problem-statement card so users can
  // ask questions / report issues about the problem text itself.
  const statementWithButton = injectCommentButtons(statementDiv);

  return `<!DOCTYPE html>
<html lang="sr" class="${themeClass}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script>${MATHJAX_INLINE_SCRIPT}</script>
<script async src="${MATHJAX_SRC}"></script>
<style>${SOLUTION_V2_CSS}</style>
<style>
  body { padding: 0; margin: 0; }
  .answer-option, .answer-grid { display: none !important; }
</style>
</head>
<body>
<div class="solution-container">
  ${statementWithButton}
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

/** postMessage-based resize reporting + theme listener (replaces contentDocument access).
 *  Also handles comment-button click → parent notification and
 *  parent → iframe comment count updates. */
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

  function anchorKeyFromEl(btn){
    var card=btn.getAttribute('data-anchor-card');
    var step=btn.getAttribute('data-anchor-step');
    if(card==='step-solution'&&step)return 'step-solution:'+step;
    return card;
  }

  // Report comment button clicks to the parent window.
  document.addEventListener('click',function(e){
    var btn=e.target&&e.target.closest?e.target.closest('.matoteka-comment-btn'):null;
    if(!btn)return;
    e.preventDefault();e.stopPropagation();
    var card=btn.getAttribute('data-anchor-card');
    var stepAttr=btn.getAttribute('data-anchor-step');
    var step=stepAttr?Number(stepAttr):null;
    window.parent.postMessage({
      type:'matoteka-comment-open',
      cardType:card,
      stepNumber:step
    },'*');
  },true);

  // Receive theme updates + comment count updates from the parent.
  window.addEventListener('message',function(e){
    if(!e.data)return;
    if(e.data.type==='matoteka-theme'){
      document.documentElement.className=e.data.theme;
      return;
    }
    if(e.data.type==='matoteka-comment-counts'&&e.data.counts){
      var counts=e.data.counts;
      var btns=document.querySelectorAll('.matoteka-comment-btn');
      for(var i=0;i<btns.length;i++){
        var b=btns[i];
        var key=anchorKeyFromEl(b);
        var n=counts[key]||0;
        var span=b.querySelector('.matoteka-comment-count');
        if(!span)continue;
        if(n>0){span.textContent=String(n);span.hidden=false;b.classList.add('has-comments');}
        else{span.textContent='0';span.hidden=true;b.classList.remove('has-comments');}
      }
      return;
    }
  });
})();</script>`;

const ANTI_COPY_CSS = `<style>
  body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
  @media print{body{display:none!important}}
</style>`;

const ANTI_COPY_SCRIPT = `<script>document.addEventListener('contextmenu',function(e){e.preventDefault()});</script>`;


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
