import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, surveyResponses } from "@/drizzle/schema";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin";

// GET — survey responses + aggregate averages, for the admin viewer.
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [agg] = await db
    .select({
      count: sql<number>`count(*)`,
      avgUi: sql<number | null>`avg(${surveyResponses.ratingUi})`,
      avgIntuitive: sql<number | null>`avg(${surveyResponses.ratingIntuitive})`,
      avgSolutions: sql<number | null>`avg(${surveyResponses.ratingSolutions})`,
      avgCategories: sql<number | null>`avg(${surveyResponses.ratingCategories})`,
    })
    .from(surveyResponses);

  const responses = await db
    .select({
      id: surveyResponses.id,
      displayName: users.displayName,
      ratingUi: surveyResponses.ratingUi,
      ratingIntuitive: surveyResponses.ratingIntuitive,
      ratingSolutions: surveyResponses.ratingSolutions,
      ratingCategories: surveyResponses.ratingCategories,
      feedback: surveyResponses.feedback,
      featureRequest: surveyResponses.featureRequest,
      createdAt: surveyResponses.createdAt,
    })
    .from(surveyResponses)
    .leftJoin(users, eq(surveyResponses.userId, users.id))
    .orderBy(desc(surveyResponses.createdAt))
    .limit(200);

  const num = (v: number | null) => (v == null ? null : Number(v));

  return NextResponse.json({
    total: Number(agg?.count ?? 0),
    averages: {
      ui: num(agg?.avgUi ?? null),
      intuitive: num(agg?.avgIntuitive ?? null),
      solutions: num(agg?.avgSolutions ?? null),
      categories: num(agg?.avgCategories ?? null),
    },
    responses,
  });
}

// POST — flag active students to be auto-shown the survey on their next visit.
// Only users who have NOT already completed it are flagged, and surveyCompletedAt
// is never cleared — so completion is permanent. This is what guarantees that a
// user who answered via the emailed /anketa link (which sets surveyCompletedAt the
// same way) is never auto-shown the survey again, regardless of when the admin runs
// this bulk request. The 1-week-since-registration rule is enforced at display time
// (proxy.ts); newer accounts start seeing it once they cross the one-week mark.
export async function POST() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const flagged = await db
    .update(users)
    .set({ surveyRequestedAt: new Date() })
    .where(
      and(
        eq(users.isActive, true),
        eq(users.role, "student"),
        isNull(users.surveyCompletedAt)
      )
    )
    .returning({ id: users.id });

  return NextResponse.json({ ok: true, count: flagged.length });
}
