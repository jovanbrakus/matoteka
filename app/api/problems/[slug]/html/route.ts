import { db } from "@/lib/db";
import { problems } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  "X-Frame-Options": "SAMEORIGIN",
};

function extractStatementHtml(html: string): string {
  // Extract the problem-statement div
  const startMarker = '<div class="card problem-statement">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return "";

  // Find the matching closing div
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

  // Extract <head> content (styles and MathJax scripts)
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const headContent = headMatch ? headMatch[1] : "";

  // Remove the logic-scratchpad script from head
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

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = new URL(req.url);
  const section = url.searchParams.get("section");

  const result = await db
    .select({ htmlContent: problems.htmlContent })
    .from(problems)
    .where(eq(problems.slug, slug))
    .limit(1);

  if (result.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = result[0].htmlContent;

  if (section === "statement") {
    const statementHtml = extractStatementHtml(html);
    if (!statementHtml) {
      return new NextResponse("Statement not found", { status: 404 });
    }
    return new NextResponse(statementHtml, { headers: HEADERS });
  }

  return new NextResponse(html, { headers: HEADERS });
}
