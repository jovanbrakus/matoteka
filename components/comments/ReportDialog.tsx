"use client";

import { useState } from "react";
import { Flag, Loader2, X } from "lucide-react";
import {
  REPORT_REASONS,
  REPORT_REASON_LABELS,
  ReportReason,
} from "@/lib/comments";

interface ReportDialogProps {
  commentId: string;
  onClose: () => void;
  onReported: () => void;
}

export default function ReportDialog({
  commentId,
  onClose,
  onReported,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason>("spam");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/comments/${commentId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, note: note.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Greška" }));
        setError(data.error || "Greška pri prijavi");
        return;
      }
      onReported();
    } catch {
      setError("Greška pri prijavi. Pokušaj ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary transition hover:text-text"
          aria-label="Zatvori"
        >
          <X size={18} />
        </button>
        <div className="mb-2 flex items-center gap-2">
          <Flag size={18} className="text-[#f87171]" />
          <h2 className="text-base font-bold text-text">Prijavi komentar</h2>
        </div>
        <p className="mb-4 text-xs text-text-secondary">
          Izaberi razlog za prijavu:
        </p>

        <div className="mb-4 space-y-1.5">
          {REPORT_REASONS.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                reason === r
                  ? "border-[#f87171] bg-[#f87171]/10 text-text"
                  : "border-border bg-bg/40 text-text-secondary hover:border-[#f87171]/30"
              }`}
            >
              <input
                type="radio"
                name="reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="sr-only"
              />
              <span>{REPORT_REASON_LABELS[r]}</span>
            </label>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 500))}
          placeholder="Dodatni komentar (opciono)"
          rows={2}
          className="mb-3 w-full resize-none rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-[#f87171]/60 focus:outline-none"
        />

        {error && <p className="mb-3 text-xs text-[#f87171]">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition hover:text-text"
          >
            Otkaži
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 rounded-lg bg-[#f87171] px-3 py-1.5 text-sm font-bold text-white transition hover:bg-[#ef4444] disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Flag size={14} />
            )}
            Prijavi
          </button>
        </div>
      </div>
    </div>
  );
}
