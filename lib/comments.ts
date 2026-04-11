/**
 * Shared types, constants, and validation helpers for the card-commenting system.
 * Comments are anchored to (problem_id, card_type, step_number) — see plan for rationale.
 */

/** All card types that ship in v2 solution HTML fragments.
 *  Mirrors the enum in the prijemni generator (`prompt_v2.ts`). */
export const CARD_TYPES = [
  "problem-title",
  "problem-subtitle",
  "problem-statement",
  "plan",
  "theory",
  "visual-aid",
  "step-solution",
  "key-insight",
  "final-answer",
  "pitfalls",
  "challenge",
] as const;

export type CardType = (typeof CARD_TYPES)[number];

/** Subset of cards that are users can comment on. We skip problem-title /
 *  problem-subtitle because they're not rendered as cards in the full view.
 *  All real data-card divs are commentable. */
const COMMENTABLE_CARD_TYPES: readonly CardType[] = [
  "problem-statement",
  "plan",
  "theory",
  "visual-aid",
  "step-solution",
  "key-insight",
  "final-answer",
  "pitfalls",
  "challenge",
];

export function isCommentableCardType(x: unknown): x is CardType {
  return typeof x === "string" && COMMENTABLE_CARD_TYPES.includes(x as CardType);
}

export const COMMENT_KINDS = ["question", "suggestion", "bug_report"] as const;
export type CommentKind = (typeof COMMENT_KINDS)[number];

export function isCommentKind(x: unknown): x is CommentKind {
  return typeof x === "string" && COMMENT_KINDS.includes(x as CommentKind);
}

export const REPORT_REASONS = [
  "spam",
  "off_topic",
  "abuse",
  "wrong_info",
  "other",
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

export function isReportReason(x: unknown): x is ReportReason {
  return typeof x === "string" && REPORT_REASONS.includes(x as ReportReason);
}

export const COMMENT_STATUSES = ["open", "resolved", "hidden"] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];

export function isCommentStatus(x: unknown): x is CommentStatus {
  return typeof x === "string" && COMMENT_STATUSES.includes(x as CommentStatus);
}

/** Body length limits (characters, after trim). */
export const MIN_BODY_LENGTH = 1;
export const MAX_BODY_LENGTH = 2000;

/** Per-user daily comment rate limit. */
export const DAILY_COMMENT_LIMIT = 20;

/** Auto-hide threshold: when reportCount reaches this many, the comment is auto-hidden
 *  pending admin review. */
export const AUTO_HIDE_REPORT_THRESHOLD = 3;

/** Window during which an author can edit their own comment body. */
export const EDIT_WINDOW_MS = 15 * 60 * 1000;

/** Serbian display labels for comment kinds. */
export const KIND_LABELS: Record<CommentKind, string> = {
  question: "Pitanje",
  suggestion: "Sugestija",
  bug_report: "Greška",
};

/** Serbian display labels for report reasons. */
export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  spam: "Spam",
  off_topic: "Nije u vezi sa temom",
  abuse: "Uvrede / neprikladan sadržaj",
  wrong_info: "Netačna informacija",
  other: "Drugo",
};

/** Serbian display labels for card types, used in the comment panel header. */
const CARD_TYPE_LABELS: Record<CardType, string> = {
  "problem-title": "Naslov zadatka",
  "problem-subtitle": "Podnaslov",
  "problem-statement": "Tekst zadatka",
  plan: "Plan rešavanja",
  theory: "Podsetnik iz teorije",
  "visual-aid": "Vizuelni prikaz",
  "step-solution": "Rešenje korak po korak",
  "key-insight": "Ključni uvid",
  "final-answer": "Konačan odgovor",
  pitfalls: "Česte greške",
  challenge: "Dodatni izazov",
};

/** Build a human-readable anchor label for the comment panel header. */
export function anchorLabel(cardType: CardType, stepNumber: number | null): string {
  const cardLabel = CARD_TYPE_LABELS[cardType] ?? cardType;
  if (cardType === "step-solution" && typeof stepNumber === "number") {
    return `Korak ${stepNumber} · ${cardLabel}`;
  }
  return cardLabel;
}

/** Client + server share this key to index comments by anchor. */
export function anchorKey(cardType: CardType, stepNumber: number | null): string {
  if (cardType === "step-solution" && typeof stepNumber === "number") {
    return `step-solution:${stepNumber}`;
  }
  return cardType;
}

/** Parse an anchor key back into its parts. Returns null on malformed input. */
export function parseAnchorKey(
  key: string
): { cardType: CardType; stepNumber: number | null } | null {
  if (key.startsWith("step-solution:")) {
    const n = Number(key.slice("step-solution:".length));
    if (!Number.isInteger(n) || n < 1 || n > 99) return null;
    return { cardType: "step-solution", stepNumber: n };
  }
  if (isCommentableCardType(key)) {
    return { cardType: key, stepNumber: null };
  }
  return null;
}

/** Server-side body validation. Trims and enforces length bounds.
 *  Returns the normalized body on success, or an error message on failure. */
export function validateBody(raw: unknown): { ok: true; body: string } | { ok: false; error: string } {
  if (typeof raw !== "string") return { ok: false, error: "Body must be a string" };
  const trimmed = raw.trim();
  if (trimmed.length < MIN_BODY_LENGTH) return { ok: false, error: "Komentar ne sme biti prazan" };
  if (trimmed.length > MAX_BODY_LENGTH)
    return { ok: false, error: `Komentar ne sme biti duži od ${MAX_BODY_LENGTH} znakova` };
  return { ok: true, body: trimmed };
}

/** Validates that a (cardType, stepNumber) pair is coherent. */
export function validateAnchor(
  cardType: unknown,
  stepNumber: unknown
): { ok: true; cardType: CardType; stepNumber: number | null } | { ok: false; error: string } {
  if (!isCommentableCardType(cardType)) return { ok: false, error: "Invalid cardType" };
  if (cardType === "step-solution") {
    if (stepNumber == null) {
      // step-solution anchored to the whole card (not a specific step) is allowed
      return { ok: true, cardType, stepNumber: null };
    }
    if (typeof stepNumber !== "number" || !Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > 99) {
      return { ok: false, error: "Invalid stepNumber" };
    }
    return { ok: true, cardType, stepNumber };
  }
  if (stepNumber != null) {
    return { ok: false, error: "stepNumber is only valid for card_type = step-solution" };
  }
  return { ok: true, cardType, stepNumber: null };
}

/** Comment row as returned from DB + to the client. */
export interface CommentRow {
  id: string;
  userId: string;
  problemId: string;
  cardType: CardType;
  stepNumber: number | null;
  parentCommentId: string | null;
  kind: CommentKind;
  body: string;
  status: CommentStatus;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
  /** Joined: author display name. */
  authorDisplayName: string;
}

export interface CommentThread {
  comment: CommentRow;
  replies: CommentRow[];
}

export interface CommentsResponse {
  /** Keyed by anchorKey(cardType, stepNumber). */
  anchors: Record<string, CommentThread[]>;
  counts: Record<string, number>;
}
