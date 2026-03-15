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
  const startMarker = '<div class="card problem-statement">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return "";

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

  const statementDiv = html.substring(startIdx, i);

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
  body { padding: 10px; }
  .container { padding: 0; }
  .card { margin-bottom: 0; }
</style>
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
