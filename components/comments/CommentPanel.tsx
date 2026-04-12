"use client";

import { useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  anchorLabel,
  CardType,
  CommentThread as CommentThreadType,
} from "@/lib/comments";
import CommentThread from "./CommentThread";
import CommentComposer from "./CommentComposer";

interface CommentPanelProps {
  open: boolean;
  problemId: string;
  anchor: { cardType: CardType; stepNumber: number | null } | null;
  threads: CommentThreadType[];
  currentUserId: string | null;
  isAdmin: boolean;
  rateLimitMessage?: string | null;
  onClose: () => void;
  onRefresh: () => void;
}

export default function CommentPanel({
  open,
  problemId,
  anchor,
  threads,
  currentUserId,
  isAdmin,
  onClose,
  onRefresh,
}: CommentPanelProps) {
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !anchor) return null;

  const title = anchorLabel(anchor.cardType, anchor.stepNumber);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Side panel */}
      <aside
        role="dialog"
        aria-label="Komentari"
        className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-[#ec5b13]" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#ec5b13]">
                Komentari
              </h2>
              <p className="text-sm text-text">{title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary transition hover:bg-bg/50 hover:text-text"
            aria-label="Zatvori"
          >
            <X size={20} />
          </button>
        </div>

        {/* Thread list (scrollable) */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {threads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--glass-border)] bg-bg/20 px-4 py-8 text-center">
              <MessageCircle
                size={24}
                className="mx-auto mb-2 text-text-secondary/50"
              />
              <p className="text-sm text-text-secondary">
                Još nema komentara.
              </p>
              <p className="mt-1 text-xs text-text-secondary/70">
                Budi prvi koji će postaviti pitanje ili prijaviti grešku.
              </p>
            </div>
          ) : (
            threads.map((thread) => (
              <CommentThread
                key={thread.comment.id}
                thread={thread}
                problemId={problemId}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onChanged={onRefresh}
              />
            ))
          )}
        </div>

        {/* Composer (sticky bottom) */}
        <div className="border-t border-border bg-card/95 px-5 py-4">
          {currentUserId ? (
            <CommentComposer
              problemId={problemId}
              cardType={anchor.cardType}
              stepNumber={anchor.stepNumber}
              placeholder="Postavi pitanje, sugestiju ili prijavi grešku..."
              onPosted={onRefresh}
            />
          ) : (
            <p className="text-center text-sm text-text-secondary">
              Prijavi se da bi ostavio komentar.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
