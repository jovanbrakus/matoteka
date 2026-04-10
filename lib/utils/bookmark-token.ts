import crypto from "crypto";

function getSecret(): string {
  const secret = process.env.WATERMARK_SECRET;
  if (!secret) {
    throw new Error("WATERMARK_SECRET environment variable is required");
  }
  return secret;
}

/**
 * Generate a 12-hex-char token unique to a (userId, problemId) pair.
 * Used to reference bookmarks in URLs without exposing the real problem ID.
 */
export function generateBookmarkToken(
  userId: string,
  problemId: string,
): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${userId}:${problemId}`)
    .digest("hex")
    .slice(0, 12);
}

/**
 * Given a token and the user's bookmarked problem IDs, find the matching problemId.
 * Returns null if no match (max 30 iterations).
 */
export function resolveBookmarkToken(
  userId: string,
  token: string,
  bookmarkedProblemIds: string[],
): string | null {
  for (const problemId of bookmarkedProblemIds) {
    if (generateBookmarkToken(userId, problemId) === token) {
      return problemId;
    }
  }
  return null;
}
