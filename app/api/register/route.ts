import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { issueToken, rateLimit } from "@/lib/auth-tokens";
import { sendVerificationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_OK = { ok: true } as const;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  // Input validation (these messages are not enumeration leaks).
  if (!displayName || displayName.length < 2 || displayName.length > 50) {
    return NextResponse.json({ error: "Unesi ime (2–50 karaktera)." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Unesi ispravnu email adresu." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Lozinka mora imati najmanje 8 karaktera." }, { status: 400 });
  }

  // Throttle per email to protect the Resend daily cap. When exceeded we still
  // return the generic success (no enumeration) but skip creating/sending.
  if (!rateLimit(`register:${email}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json(GENERIC_OK);
  }

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = existing[0];

  try {
    if (!user) {
      // Brand-new account: create unverified, email a verification link.
      const passwordHash = await bcrypt.hash(password, 10);
      const inserted = await db
        .insert(users)
        .values({ email, displayName, passwordHash, role: "student" })
        .returning({ id: users.id });
      const rawToken = await issueToken(inserted[0].id, "email_verify");
      await sendVerificationEmail(email, displayName, rawToken);
    } else if (user.passwordHash && !user.emailVerified) {
      // Unverified password signup — resend a fresh verification link. Never
      // overwrites the existing row (no password change from this endpoint).
      const rawToken = await issueToken(user.id, "email_verify");
      await sendVerificationEmail(email, user.displayName, rawToken);
    }
    // Else: a verified password account or a Google account already exists. Do
    // nothing to the row (registering must never attach a password to an
    // existing account — that would be an account-takeover vector). Such users
    // set/recover a password via the "Zaboravljena lozinka" flow.
  } catch (err) {
    // Don't leak which branch ran. The user can re-trigger via "pošalji ponovo".
    console.error("[register] failed to process signup:", err);
  }

  return NextResponse.json(GENERIC_OK);
}
