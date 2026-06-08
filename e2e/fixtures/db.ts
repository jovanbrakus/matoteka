import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

// DATABASE_URL is loaded from e2e/.env.e2e by playwright.config.ts (dotenv) and
// is available in the test runner process.
const sql = neon(process.env.DATABASE_URL!);

export type DbUser = {
  id: string;
  email: string;
  email_verified: string | null;
  password_hash: string | null;
};

export async function getUser(email: string): Promise<DbUser | undefined> {
  const rows = await sql`
    SELECT id, email, email_verified, password_hash
    FROM users WHERE email = ${email} LIMIT 1`;
  return rows[0] as DbUser | undefined;
}

export async function markVerified(email: string): Promise<void> {
  await sql`UPDATE users SET email_verified = NOW() WHERE email = ${email}`;
}

export async function deleteUser(email: string): Promise<void> {
  // auth_tokens cascade-delete with the user row.
  await sql`DELETE FROM users WHERE email = ${email}`;
}

/**
 * Seed a single-use token the way the app does (raw token in the link, only its
 * SHA-256 hash stored). Returns the RAW token to drive the verify/reset link UI —
 * the email itself isn't sent in e2e (no RESEND_API_KEY), so this is how we get a
 * usable link.
 */
export async function seedToken(
  userId: string,
  type: "email_verify" | "password_reset",
  ttlMs = 60 * 60 * 1000,
): Promise<string> {
  const raw = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const expiresAt = new Date(Date.now() + ttlMs);
  await sql`DELETE FROM auth_tokens WHERE user_id = ${userId} AND type = ${type}`;
  await sql`
    INSERT INTO auth_tokens (user_id, token_hash, type, expires_at)
    VALUES (${userId}, ${tokenHash}, ${type}, ${expiresAt})`;
  return raw;
}
