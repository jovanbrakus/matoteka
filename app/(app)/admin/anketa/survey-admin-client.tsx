"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ResponseRow {
  id: string;
  displayName: string | null;
  ratingUi: number | null;
  ratingIntuitive: number | null;
  ratingSolutions: number | null;
  ratingCategories: number | null;
  feedback: string | null;
  featureRequest: string | null;
  createdAt: string | null;
}

interface SurveyData {
  total: number;
  averages: {
    ui: number | null;
    intuitive: number | null;
    solutions: number | null;
    categories: number | null;
  };
  responses: ResponseRow[];
}

const RATING_FIELDS: { key: keyof ResponseRow; label: string }[] = [
  { key: "ratingUi", label: "Interfejs" },
  { key: "ratingIntuitive", label: "Intuitivnost" },
  { key: "ratingSolutions", label: "Rešenja" },
  { key: "ratingCategories", label: "Kategorije" },
];

const AVG_CARDS: { key: keyof SurveyData["averages"]; label: string }[] = [
  { key: "ui", label: "Interfejs" },
  { key: "intuitive", label: "Intuitivnost" },
  { key: "solutions", label: "Rešenja" },
  { key: "categories", label: "Kategorije" },
];

function fmtAvg(v: number | null): string {
  return v == null ? "—" : v.toFixed(2);
}

export default function SurveyAdminClient() {
  const [data, setData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  function load() {
    fetch("/api/admin/survey")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(load, []);

  async function sendSurvey() {
    if (
      !confirm(
        "Anketa će se automatski prikazati svim aktivnim korisnicima koji su registrovani duže od nedelju dana. Nastaviti?"
      )
    )
      return;
    setSending(true);
    try {
      const res = await fetch("/api/admin/survey", { method: "POST" });
      const d = await res.json();
      if (!res.ok) {
        alert(d?.error || "Greška pri slanju.");
        return;
      }
      alert(`Anketa je označena za ${d.count} korisnika.`);
    } catch {
      alert("Greška pri slanju.");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-10 h-12 w-80 animate-pulse rounded-lg bg-[var(--tint)]" />
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-[var(--tint)]" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-2xl bg-[var(--tint)]" />
      </div>
    );
  }

  return (
    <div className="relative p-8">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="mb-2 inline-flex items-center gap-1 text-xs font-bold text-text-secondary hover:text-[#ec5b13]"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kontrolna tabla
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-heading">
            Anketa — povratne informacije
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Prosečne ocene i komentari korisnika
          </p>
        </div>
        <button
          onClick={sendSurvey}
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ec5b13] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ec5b13]/90 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">campaign</span>
          {sending ? "Slanje..." : "Pošalji anketu korisnicima"}
        </button>
      </header>

      {/* Average cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {AVG_CARDS.map((c) => (
          <div key={c.key} className="glass-card rounded-2xl p-5">
            <p className="text-xs font-medium text-text-secondary">{c.label}</p>
            <p className="mt-2 text-3xl font-black text-heading">
              {fmtAvg(data?.averages[c.key] ?? null)}
              <span className="text-base font-bold text-text-secondary"> / 5</span>
            </p>
          </div>
        ))}
        <div className="glass-card rounded-2xl border-l-4 border-[#ec5b13] p-5">
          <p className="text-xs font-medium text-text-secondary">Odgovora</p>
          <p className="mt-2 text-3xl font-black text-heading">{data?.total ?? 0}</p>
        </div>
      </div>

      {/* Responses */}
      <div className="space-y-4">
        {(data?.responses ?? []).map((r) => {
          const hasText = r.feedback || r.featureRequest;
          return (
            <div key={r.id} className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-heading">
                  {r.displayName || "Nepoznat korisnik"}
                </span>
                <span className="text-xs text-text-secondary">
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleString("sr-Latn-RS")
                    : "—"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {RATING_FIELDS.map((f) => (
                  <span
                    key={f.key}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--tint)] px-3 py-1 text-xs font-bold text-text-secondary"
                  >
                    {f.label}
                    <span className="text-[#ec5b13]">
                      {(r[f.key] as number | null) ?? "—"}
                    </span>
                  </span>
                ))}
              </div>
              {hasText && (
                <div className="mt-3 space-y-2 text-sm">
                  {r.feedback && (
                    <p className="text-text">
                      <span className="font-semibold text-text-secondary">
                        Komentar:{" "}
                      </span>
                      {r.feedback}
                    </p>
                  )}
                  {r.featureRequest && (
                    <p className="text-text">
                      <span className="font-semibold text-text-secondary">
                        Želja:{" "}
                      </span>
                      {r.featureRequest}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {(data?.responses ?? []).length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center text-text-secondary">
            Još nema odgovora na anketu.
          </div>
        )}
      </div>
    </div>
  );
}
