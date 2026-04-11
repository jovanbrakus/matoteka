"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import {
  CardType,
  CommentKind,
  COMMENT_KINDS,
  KIND_LABELS,
  MAX_BODY_LENGTH,
} from "@/lib/comments";

interface CommentComposerProps {
  problemId: string;
  cardType: CardType;
  stepNumber: number | null;
  parentCommentId?: string;
  placeholder?: string;
  /** Called after a successful POST; parent should refetch to refresh state. */
  onPosted: () => void;
  /** Optional: allow canceling an inline reply composer. */
  onCancel?: () => void;
  autoFocus?: boolean;
}

export default function CommentComposer({
  problemId,
  cardType,
  stepNumber,
  parentCommentId,
  placeholder,
  onPosted,
  onCancel,
  autoFocus,
}: CommentComposerProps) {
  const [kind, setKind] = useState<CommentKind>("question");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/problems/${problemId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardType,
          stepNumber,
          kind,
          body: trimmed,
          parentCommentId,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Greška pri slanju" }));
        setError(data.error || "Greška pri slanju");
        return;
      }
      setBody("");
      setKind("question");
      onPosted();
    } catch {
      setError("Greška pri slanju. Pokušaj ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      {!parentCommentId && (
        <div className="flex flex-wrap gap-1.5">
          {COMMENT_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                kind === k
                  ? "border-[#ec5b13] bg-[#ec5b13]/10 text-[#ec5b13]"
                  : "border-[var(--glass-border)] text-text-secondary hover:border-[#ec5b13]/40 hover:text-text"
              }`}
            >
              {KIND_LABELS[k]}
            </button>
          ))}
        </div>
      )}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY_LENGTH))}
        placeholder={placeholder ?? "Napiši komentar..."}
        rows={parentCommentId ? 2 : 3}
        autoFocus={autoFocus}
        className="w-full resize-none rounded-lg border border-[var(--glass-border)] bg-bg/50 px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-[#ec5b13]/60 focus:outline-none"
      />
      {error && (
        <p className="text-xs text-[#f87171]">{error}</p>
      )}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-text-secondary/80">
          {body.length}/{MAX_BODY_LENGTH}
        </span>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg px-3 py-1.5 text-xs text-text-secondary transition hover:text-text"
            >
              Otkaži
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!body.trim() || submitting}
            className="flex items-center gap-1.5 rounded-lg bg-[#ec5b13] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ec5b13]/90 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Send size={12} />
            )}
            {parentCommentId ? "Odgovori" : "Pošalji"}
          </button>
        </div>
      </div>
    </div>
  );
}
