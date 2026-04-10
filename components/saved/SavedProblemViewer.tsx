"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Trash2,
} from "lucide-react";
import ProblemView from "@/components/problems/ProblemView";
import MathTitle from "@/components/ui/math-title";
import type { SavedProblemEntry } from "@/app/(app)/sacuvano/[token]/page";

interface SavedProblemViewerProps {
  problemId: string;
  token: string;
  allSaved: SavedProblemEntry[];
  currentIndex: number;
}

export default function SavedProblemViewer({
  problemId,
  token,
  allSaved: initialSaved,
  currentIndex,
}: SavedProblemViewerProps) {
  const router = useRouter();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [allSaved, setAllSaved] = useState(initialSaved);
  const [removing, setRemoving] = useState<string | null>(null);

  const prev = currentIndex > 0 ? allSaved[currentIndex - 1] : null;
  const next =
    currentIndex < allSaved.length - 1 ? allSaved[currentIndex + 1] : null;

  const handleRemove = useCallback(
    async (tokenToRemove: string) => {
      setRemoving(tokenToRemove);
      try {
        const res = await fetch("/api/bookmarks/remove-by-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenToRemove }),
        });
        if (!res.ok) return;

        const updated = allSaved.filter((s) => s.token !== tokenToRemove);
        setAllSaved(updated);

        // If we removed the currently viewed problem, navigate away
        if (tokenToRemove === token) {
          if (updated.length === 0) {
            router.push("/sacuvano");
          } else {
            // Go to the next problem, or the previous if we were at the end
            const nextIdx = Math.min(currentIndex, updated.length - 1);
            router.push(`/sacuvano/${updated[nextIdx].token}`);
          }
        }
      } finally {
        setRemoving(null);
      }
    },
    [allSaved, token, currentIndex, router],
  );

  return (
    <div className="w-full">
      {/* Navigation bar */}
      <div className="sticky top-0 z-30 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: prev */}
          <div className="flex items-center gap-2">
            {prev ? (
              <Link
                href={`/sacuvano/${prev.token}`}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-[var(--tint)] hover:text-heading"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prethodni</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted opacity-40">
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prethodni</span>
              </span>
            )}
          </div>

          {/* Center: counter + picker button */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-heading">
              {currentIndex + 1}
              <span className="text-muted font-normal">
                {" "}
                / {allSaved.length}
              </span>
            </span>
            <button
              onClick={() => setPickerOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
            >
              <List size={14} />
              Izaberi zadatak
            </button>
          </div>

          {/* Right: next */}
          <div className="flex items-center gap-2">
            {next ? (
              <Link
                href={`/sacuvano/${next.token}`}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-[var(--tint)] hover:text-heading"
              >
                <span className="hidden sm:inline">Sledeći</span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted opacity-40">
                <span className="hidden sm:inline">Sledeći</span>
                <ChevronRight size={16} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Problem viewer */}
      <ProblemView problemId={problemId} initialBookmarked />

      {/* Problem picker dialog */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPickerOpen(false)}
          />

          {/* Dialog */}
          <div className="relative flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-heading">
                  Sačuvani zadaci
                </h2>
                <p className="text-xs text-text-secondary">
                  {allSaved.length} / 30 sačuvano
                </p>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="text-text-secondary transition hover:text-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {allSaved.map((entry, idx) => {
                const isCurrent = entry.token === token;
                return (
                  <div
                    key={entry.token}
                    className={`flex items-center gap-3 border-b border-[var(--glass-border)] px-6 py-3 transition-colors ${
                      isCurrent
                        ? "bg-primary/10"
                        : "hover:bg-[var(--tint)]"
                    }`}
                  >
                    {/* Problem info — clickable */}
                    <Link
                      href={`/sacuvano/${entry.token}`}
                      onClick={() => setPickerOpen(false)}
                      className="flex min-w-0 flex-1 flex-col gap-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted">
                          {idx + 1}.
                        </span>
                        <MathTitle
                          text={entry.title}
                          className={`text-sm font-bold ${
                            isCurrent ? "text-primary" : "text-heading"
                          }`}
                        />
                        {isCurrent && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                            Trenutni
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        {entry.category && <span>{entry.category}</span>}
                        {entry.difficulty != null && (
                          <span>
                            Težina: {entry.difficulty}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(entry.token)}
                      disabled={removing === entry.token}
                      className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-40"
                      title="Ukloni iz sačuvanih"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}

              {allSaved.length === 0 && (
                <div className="py-12 text-center text-sm text-muted">
                  Nema sačuvanih zadataka.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
