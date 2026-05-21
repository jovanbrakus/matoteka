import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { displayName, targetFaculties } = body ?? {};

  const userId = session.user.id;
  const updates: Record<string, unknown> = {
    onboardedAt: new Date(),
    updatedAt: new Date(),
  };

  if (displayName !== undefined) {
    if (typeof displayName !== "string" || displayName.length < 3 || displayName.length > 20) {
      return NextResponse.json({ error: "Ime mora imati između 3 i 20 karaktera." }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(displayName)) {
      return NextResponse.json({ error: "Samo slova, brojevi i donja crta." }, { status: 400 });
    }
    const existing = await db.select().from(users).where(eq(users.displayName, displayName)).limit(1);
    if (existing.length > 0 && existing[0].id !== userId) {
      return NextResponse.json({ error: "Ovo ime je već zauzeto." }, { status: 409 });
    }
    updates.displayName = displayName;
  }

  if (targetFaculties !== undefined) {
    if (!Array.isArray(targetFaculties) || targetFaculties.length === 0 || targetFaculties.length > 3) {
      return NextResponse.json({ error: "Izaberi 1-3 fakulteta." }, { status: 400 });
    }
    updates.targetFaculties = targetFaculties;
  }

  await db.update(users).set(updates).where(eq(users.id, userId));

  const res = NextResponse.json({ ok: true });
  // Short-lived hint cookie so the proxy doesn't bounce the user back to
  // /onboarding before their JWT has been refreshed.
  res.cookies.set("mt-onboarded", "1", {
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
