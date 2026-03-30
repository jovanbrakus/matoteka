import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { aiSolutions } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { createLLMProvider } from "@/lib/llm/factory";
import { checkAndIncrementAiUsage } from "@/lib/utils/rate-limit";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const { allowed, used, limit } = await checkAndIncrementAiUsage(userId);
  if (!allowed) {
    return NextResponse.json({ error: "Iskoristio si sve AI zahteve za danas. Dođi sutra!", used, limit }, { status: 429 });
  }

  const formData = await req.formData();
  const promptText = formData.get("promptText") as string | null;
  const screenshot = formData.get("screenshot") as File | null;

  if (!promptText && !screenshot) {
    return NextResponse.json({ error: "Unesi tekst ili dodaj sliku zadatka." }, { status: 400 });
  }

  let screenshotBase64: string | undefined;
  let screenshotMimeType: string | undefined;

  if (screenshot) {
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    screenshotBase64 = buffer.toString("base64");
    screenshotMimeType = screenshot.type;
  }

  try {
    const provider = createLLMProvider();
    const result = await provider.generateSolution({
      promptText: promptText || undefined,
      screenshotBase64,
      screenshotMimeType,
    });

    const [solution] = await db.insert(aiSolutions).values({
      userId,
      contextType: "standalone",
      title: result.title,
      promptText,
      hadScreenshot: !!screenshot,
      htmlContent: result.html,
      llmProvider: process.env.LLM_PROVIDER || "anthropic",
      llmModel: process.env.LLM_MODEL || "claude-sonnet-4-5-20250929",
      inputTokens: result.tokenUsage.inputTokens,
      outputTokens: result.tokenUsage.outputTokens,
      costUsd: result.costUsd.toFixed(6),
      latencyMs: result.latencyMs,
    }).returning();

    return NextResponse.json({ id: solution.id, title: result.title });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "AI greška" }, { status: 500 });
  }
}
