import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { consumeToken } from "@/lib/auth-tokens";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const token = typeof body?.token === "string" ? body.token : "";

  const userId = await consumeToken(token, "email_verify");
  if (!userId) {
    return NextResponse.json(
      { error: "Link za potvrdu nije važeći ili je istekao." },
      { status: 400 },
    );
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), updatedAt: new Date() })
    .where(eq(users.id, userId));

  return NextResponse.json({ ok: true });
}
