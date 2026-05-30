"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";

const GLYPHS = ["π", "∫", "√", "x²", "=", "∑", "∞", "θ", "Δ", "∂"];

const SCALE_LABELS = ["Najlošije", "Loše", "Solidno", "Dobro", "Najbolje"];

const RATINGS = [
  { key: "ratingUi", label: "Kvalitet korisničkog interfejsa" },
  { key: "ratingIntuitive", label: "Intuitivnost (lakoća korišćenja)" },
  { key: "ratingSolutions", label: "Kvalitet rešenja zadataka" },
  { key: "ratingCategories", label: "Podela zadataka na kategorije" },
] as const;

type RatingKey = (typeof RATINGS)[number]["key"];

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span
          className="text-sm font-semibold text-heading"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          {label}
        </span>
        <span className="shrink-0 text-xs text-text-secondary tabular-nums">
          {value ? `${value}/5 · ${SCALE_LABELS[value - 1]}` : "Nije ocenjeno"}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${n} — ${SCALE_LABELS[n - 1]}`}
              aria-pressed={selected}
              className={`rounded-xl border py-2.5 text-base font-bold transition-all hover:scale-[1.03] active:scale-[0.97] ${
                selected
                  ? "border-[#ec5b13] bg-[#ec5b13] text-white shadow-[0_0_16px_rgba(236,91,19,0.35)]"
                  : "border-border bg-card text-text-secondary hover:border-[#ec5b13]/40 hover:text-heading"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-text-secondary/80">
        <span>1 · Najlošije</span>
        <span>5 · Najbolje</span>
      </div>
    </div>
  );
}

export default function SurveyFlow() {
  const [ratings, setRatings] = useState<Record<RatingKey, number>>({
    ratingUi: 0,
    ratingIntuitive: 0,
    ratingSolutions: 0,
    ratingCategories: 0,
  });
  const [feedback, setFeedback] = useState("");
  const [featureRequest, setFeatureRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const allRated = RATINGS.every((r) => ratings[r.key] > 0);

  const submit = useCallback(
    async (skipped: boolean) => {
      if (!skipped && !allRated) {
        setError("Ocenite sve četiri stavke da biste poslali.");
        return;
      }
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/anketa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            skipped
              ? { skipped: true }
              : {
                  ...ratings,
                  feedback: feedback.trim() || null,
                  featureRequest: featureRequest.trim() || null,
                }
          ),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Greška pri slanju.");
        }
        if (skipped) {
          window.location.assign("/vezba");
          return;
        }
        setDone(true);
        setTimeout(() => window.location.assign("/vezba"), 1400);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Greška pri slanju.");
        setSubmitting(false);
      }
    },
    [allRated, ratings, feedback, featureRequest]
  );

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 15% -10%, rgba(236,91,19,0.18), transparent 50%), " +
          "radial-gradient(circle at 90% 110%, rgba(14,165,233,0.14), transparent 55%), " +
          "var(--color-bg)",
      }}
    >
      {/* Floating math glyphs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {GLYPHS.map((g, i) => {
          const top = `${(i * 9 + 7) % 90}%`;
          const left = `${(i * 17 + 5) % 95}%`;
          const size = 36 + (i % 4) * 14;
          const rot = ((i * 11) % 30) - 15;
          const dx = (i % 2 === 0 ? 1 : -1) * (6 + (i % 5));
          const dy = (i % 3 === 0 ? -1 : 1) * (8 + (i % 4));
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top,
                left,
                fontFamily: "var(--font-fredoka), serif",
                fontSize: size,
                color: "var(--color-heading)",
                opacity: 0.06,
                ["--rot" as string]: `${rot}deg`,
                ["--dx" as string]: `${dx}px`,
                ["--dy" as string]: `${dy}px`,
                animation: `drift ${10 + (i % 6)}s ease-in-out ${i * 0.4}s infinite`,
                userSelect: "none",
              }}
            >
              {g}
            </span>
          );
        })}
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          <span
            className="text-xl"
            style={{
              fontFamily: "var(--font-fredoka), sans-serif",
              fontWeight: 600,
              color: "var(--color-heading)",
            }}
          >
            Matoteka
          </span>
        </Link>

        {!done && (
          <button
            onClick={() => submit(true)}
            disabled={submitting}
            className="text-sm transition hover:underline disabled:opacity-50"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-manrope), sans-serif",
            }}
          >
            Preskoči
          </button>
        )}
      </header>

      {/* Content */}
      <main className="relative z-10 flex flex-1 items-start justify-center overflow-y-auto px-5 py-4 md:px-10">
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div
              className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "rgba(74,222,128,0.12)",
                boxShadow: "0 0 32px rgba(74,222,128,0.25)",
              }}
            >
              <Check size={40} className="text-[#4ade80]" />
            </div>
            <h1
              className="text-3xl font-bold text-heading"
              style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
            >
              Hvala vam! 🎉
            </h1>
            <p
              className="mt-2 max-w-sm text-sm text-text-secondary"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Vaše mišljenje nam mnogo znači i pomaže da Matoteku učinimo boljom.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl pb-8">
            <div className="mb-6 text-center">
              <h1
                className="text-3xl font-bold text-heading md:text-4xl"
                style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
              >
                Vaše mišljenje
              </h1>
              <p
                className="mx-auto mt-2 max-w-md text-sm text-text-secondary"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Pomozite nam da poboljšamo Matoteku. Ocenite stavke od 1 (najlošije)
                do 5 (najbolje) — traje oko 2 minuta.
              </p>
            </div>

            <div className="space-y-6 rounded-2xl border border-[var(--glass-border)] bg-card p-6 md:p-8">
              {/* Ratings */}
              <div className="space-y-6">
                {RATINGS.map((r) => (
                  <RatingRow
                    key={r.key}
                    label={r.label}
                    value={ratings[r.key]}
                    onChange={(v) =>
                      setRatings((prev) => ({ ...prev, [r.key]: v }))
                    }
                  />
                ))}
              </div>

              <div className="h-px w-full bg-[var(--glass-border)]" />

              {/* Free-text feedback */}
              <div>
                <label
                  className="text-sm font-semibold text-heading"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  Bilo kakav komentar ili predlog
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value.slice(0, 2000))}
                  placeholder="Šta vam se sviđa, a šta bi moglo bolje?"
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-secondary/60 focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
                />
              </div>

              {/* Feature request */}
              <div>
                <label
                  className="text-sm font-semibold text-heading"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  Koju funkcionalnost biste voleli da vidite?
                </label>
                <textarea
                  value={featureRequest}
                  onChange={(e) => setFeatureRequest(e.target.value.slice(0, 2000))}
                  placeholder="Opišite funkcionalnost koja vam nedostaje..."
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-bg/50 px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-secondary/60 focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-[#f87171]">{error}</p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  onClick={() => submit(true)}
                  disabled={submitting}
                  className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:text-heading disabled:opacity-50"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  Preskoči
                </button>
                <button
                  onClick={() => submit(false)}
                  disabled={submitting || !allRated}
                  className="group flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  style={{
                    background: "var(--color-primary)",
                    fontFamily: "var(--font-manrope), sans-serif",
                    boxShadow: "0 0 24px rgba(236,91,19,0.4)",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Slanje...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Pošalji
                    </>
                  )}
                </button>
              </div>
              {!allRated && (
                <p className="-mt-3 text-right text-xs text-text-secondary/80">
                  Ocenite sve četiri stavke da biste poslali.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
