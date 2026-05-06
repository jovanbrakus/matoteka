import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json(
      { error: "Ne možete onemogućiti sopstveni nalog." },
      { status: 400 }
    );
  }

  const target = await db
    .select({ id: users.id, isActive: users.isActive, role: users.role })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (target.length === 0) {
    return NextResponse.json({ error: "Korisnik ne postoji." }, { status: 404 });
  }

  if (target[0].role === "admin") {
    return NextResponse.json(
      { error: "Administratorski nalog se ne može onemogućiti." },
      { status: 400 }
    );
  }

  const newActive = !target[0].isActive;
  await db
    .update(users)
    .set({ isActive: newActive, updatedAt: new Date() })
    .where(eq(users.id, id));

  return NextResponse.json({ id, isActive: newActive });
}
