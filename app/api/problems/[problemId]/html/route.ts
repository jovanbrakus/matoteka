import { getProblemHtml } from "@/lib/problems";
import { NextResponse } from "next/server";

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  "X-Frame-Options": "SAMEORIGIN",
};

/**
 * Strip CSS properties that cause infinite iframe resize loops.
 * Problem HTML files use `min-height: 100vh` on body, which expands
 * with the iframe viewport, triggering ResizeObserver endlessly.
 */
function sanitizeForIframe(html: string): string {
  return html
    .replace(/min-height:\s*100vh;?/gi, "")
    .replace(/max-width:\s*\d+px;?/gi, "")
    .replace(/margin:\s*0\s+auto;?/gi, "");
}

function extractStatementHtml(html: string): string {
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

  return `<!DOCTYPE html>
<html lang="sr">
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
</body>
</html>`;
}

export async function GET(req: Request, { params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const url = new URL(req.url);
  const section = url.searchParams.get("section");

  const html = getProblemHtml(problemId);

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  const safeHtml = sanitizeForIframe(html);

  if (section === "statement") {
    const statementHtml = extractStatementHtml(safeHtml);
    if (!statementHtml) {
      return new NextResponse("Statement not found", { status: 404 });
    }
    return new NextResponse(statementHtml, { headers: HEADERS });
  }

  return new NextResponse(safeHtml, { headers: HEADERS });
}
