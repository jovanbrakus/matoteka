import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { issueToken, rateLimit } from "@/lib/auth-tokens";
import { sendPasswordResetEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_OK = { ok: true } as const;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Unesi ispravnu email adresu." }, { status: 400 });
  }

  // Always generic to avoid email enumeration / abuse of the Resend cap.
  if (!rateLimit(`forgot:${email}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json(GENERIC_OK);
  }

  try {
    const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = rows[0];
    // Works for any existing account — including a Google-only account that wants
    // to set its first password. The reset token sent to the inbox proves
    // ownership, so reset-password may write a passwordHash where there was none.
    if (user) {
      const rawToken = await issueToken(user.id, "password_reset");
      await sendPasswordResetEmail(email, user.displayName, rawToken);
    }
  } catch (err) {
    console.error("[forgot-password] failed:", err);
  }

  return NextResponse.json(GENERIC_OK);
}
