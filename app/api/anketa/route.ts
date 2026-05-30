import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, surveyResponses } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const RATING_KEYS = [
  "ratingUi",
  "ratingIntuitive",
  "ratingSolutions",
  "ratingCategories",
] as const;
const MAX_TEXT = 2000;

function cleanText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, MAX_TEXT) : null;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const body = await req.json().catch(() => ({}));
  const skipped = body?.skipped === true;

  if (!skipped) {
    // Validate the four ratings (integers 1–5).
    const ratings: Record<(typeof RATING_KEYS)[number], number> = {} as never;
    for (const key of RATING_KEYS) {
      const v = body?.[key];
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        return NextResponse.json(
          { error: "Sve ocene moraju biti između 1 i 5." },
          { status: 400 }
        );
      }
      ratings[key] = v;
    }

    await db.insert(surveyResponses).values({
      userId,
      ratingUi: ratings.ratingUi,
      ratingIntuitive: ratings.ratingIntuitive,
      ratingSolutions: ratings.ratingSolutions,
      ratingCategories: ratings.ratingCategories,
      feedback: cleanText(body?.feedback),
      featureRequest: cleanText(body?.featureRequest),
    });
  }

  // Mark complete either way (submit or skip) so the survey never auto-appears again.
  await db
    .update(users)
    .set({ surveyCompletedAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, userId));

  const res = NextResponse.json({ ok: true });
  // Hint cookie so the proxy doesn't bounce the user back to /anketa before the
  // next DB check; doubles as the proxy's "no survey pending" negative cache.
  res.cookies.set("mt-survey", "done", {
    maxAge: 86400,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
