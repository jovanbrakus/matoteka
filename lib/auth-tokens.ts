import crypto from "crypto";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { authTokens } from "@/drizzle/schema";

export type TokenType = "email_verify" | "password_reset";

const TTL_MS: Record<TokenType, number> = {
  email_verify: 24 * 60 * 60 * 1000, // 24h
  password_reset: 60 * 60 * 1000, // 1h
};

export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Issue a fresh single-use token of `type` for `userId`. Any prior tokens of the
 * same type for that user are cleared first. Returns the RAW token to embed in the
 * email link — only its SHA-256 hash is persisted.
 */
export async function issueToken(userId: string, type: TokenType): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TTL_MS[type]);

  await db
    .delete(authTokens)
    .where(and(eq(authTokens.userId, userId), eq(authTokens.type, type)));
  await db.insert(authTokens).values({ userId, tokenHash, type, expiresAt });

  return rawToken;
}

/**
 * Validate and consume a token. Returns the userId on success, or null if the
 * token is unknown, the wrong type, or expired. The matched row is always deleted
 * (single-use), so an expired token is also cleaned up.
 */
export async function consumeToken(
  rawToken: string,
  type: TokenType,
): Promise<string | null> {
  if (!rawToken) return null;
  const tokenHash = hashToken(rawToken);

  const rows = await db
    .select()
    .from(authTokens)
    .where(and(eq(authTokens.tokenHash, tokenHash), eq(authTokens.type, type)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;

  await db.delete(authTokens).where(eq(authTokens.id, row.id));

  if (!row.expiresAt || new Date(row.expiresAt).getTime() < Date.now()) return null;
  return row.userId;
}

/**
 * Simple in-memory per-key rate limiter (same approach as the credentials limiter
 * in lib/auth.ts). Returns true while under `max` hits inside `windowMs`. Note:
 * in-memory state is per server instance — adequate as a basic abuse/Resend-cap
 * guard, not a hard global limit.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= max;
}
