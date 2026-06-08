import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { sql, desc, or, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const search = req.nextUrl.searchParams.get("search") || "";

  const where = search
    ? or(
        ilike(users.displayName, `%${search}%`),
        ilike(users.email, `%${search}%`)
      )
    : undefined;

  const [rows, countResult] = await Promise.all([
    db
      .select({
        id: users.id,
        email: users.email,
        displayName: users.displayName,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        lastActiveDate: users.lastActiveDate,
        streakCurrent: users.streakCurrent,
        avatarUrl: users.avatarUrl,
        hasGoogle: sql<boolean>`${users.googleId} IS NOT NULL`,
        hasPassword: sql<boolean>`${users.passwordHash} IS NOT NULL`,
      })
      .from(users)
      .where(where)
      .orderBy(desc(users.createdAt))
      .limit(100),
    db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(where),
  ]);

  return NextResponse.json({
    users: rows,
    total: Number(countResult[0]?.count ?? 0),
  });
}
