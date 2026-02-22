import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { targetFaculty } = await req.json();

  if (!targetFaculty || typeof targetFaculty !== "string") {
    return NextResponse.json({ error: "Fakultet je obavezan." }, { status: 400 });
  }

  await db
    .update(users)
    .set({ targetFaculty, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return NextResponse.json({ ok: true, targetFaculty });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const [user] = await db.select({ targetFaculty: users.targetFaculty }).from(users).where(eq(users.id, userId)).limit(1);

  return NextResponse.json({ targetFaculty: user?.targetFaculty || null });
}
