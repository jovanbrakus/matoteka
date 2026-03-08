import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { displayName } = await req.json();

  if (!displayName || typeof displayName !== "string") {
    return NextResponse.json({ error: "Ime je obavezno." }, { status: 400 });
  }

  if (displayName.length < 3 || displayName.length > 20) {
    return NextResponse.json({ error: "Ime mora imati između 3 i 20 karaktera." }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_]+$/.test(displayName)) {
    return NextResponse.json({ error: "Samo slova, brojevi i donja crta." }, { status: 400 });
  }

  // Check uniqueness
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.displayName, displayName))
    .limit(1);

  if (existing.length > 0 && existing[0].id !== userId) {
    return NextResponse.json({ error: "Ovo ime je već zauzeto." }, { status: 409 });
  }

  await db
    .update(users)
    .set({ displayName, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return NextResponse.json({ ok: true, displayName });
}
