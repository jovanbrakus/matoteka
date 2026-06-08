import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { consumeToken } from "@/lib/auth-tokens";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Lozinka mora imati najmanje 8 karaktera." },
      { status: 400 },
    );
  }

  const userId = await consumeToken(token, "password_reset");
  if (!userId) {
    return NextResponse.json(
      { error: "Link za promenu lozinke nije važeći ili je istekao." },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db
    .update(users)
    .set({
      passwordHash,
      // A successful reset proves the user controls the inbox — mark verified so
      // the login gate passes (also lets a Google-only account gain a password).
      emailVerified: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  return NextResponse.json({ ok: true });
}
