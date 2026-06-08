import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { issueToken, rateLimit } from "@/lib/auth-tokens";
import { sendVerificationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_OK = { ok: true } as const;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Unesi ispravnu email adresu." }, { status: 400 });
  }

  // Always generic to avoid email enumeration / abuse of the Resend cap.
  if (!rateLimit(`resend:${email}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json(GENERIC_OK);
  }

  try {
    const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = rows[0];
    // Only an unverified password account can re-trigger verification.
    if (user && user.passwordHash && !user.emailVerified) {
      const rawToken = await issueToken(user.id, "email_verify");
      await sendVerificationEmail(email, user.displayName, rawToken);
    }
  } catch (err) {
    console.error("[resend-verification] failed:", err);
  }

  return NextResponse.json(GENERIC_OK);
}
