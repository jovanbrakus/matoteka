import { db } from "@/lib/db";
import { seasons } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db
    .select()
    .from(seasons)
    .where(eq(seasons.isActive, true))
    .limit(1);

  if (result.length === 0) {
    // Default fallback season
    return NextResponse.json({
      id: "2026",
      name: "Sezona 2026",
      examPeriodStart: "2026-06-15",
      isActive: true,
    });
  }

  return NextResponse.json(result[0]);
}
