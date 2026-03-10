"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Minus, Clock, Trophy, BarChart3 } from "lucide-react";

export default function ExamResultsPage() {
  const params = useParams();
  const examId = params.id as string;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/exams/${examId}/results`).then((r) => r.json()).then(setData);
  }, [examId]);

  if (!data) return <div className="py-20 text-center text-text-secondary">Učitavanje...</div>;

  const { exam, faculty, problems } = data;
  const pct = parseFloat(exam.scorePercent || "0");

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-text">
        Rezultati — {faculty?.shortName} Probni ispit
      </h1>

      {/* Score cards */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <BarChart3 className="mx-auto mb-2 text-[#60a5fa]" size={24} />
          <div className="text-2xl font-bold text-text">{exam.score}/{exam.maxScore}</div>
          <div className="text-xs text-text-secondary">Bodovi</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <Trophy className="mx-auto mb-2 text-[#4ade80]" size={24} />
          <div className="text-2xl font-bold text-[#4ade80]">{exam.numCorrect}/{problems.length}</div>
          <div className="text-xs text-text-secondary">Tačnih</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <Clock className="mx-auto mb-2 text-[#a78bfa]" size={24} />
          <div className="text-2xl font-bold text-text">{formatTime(exam.timeSpent || 0)}</div>
          <div className="text-xs text-text-secondary">Vreme</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-text-secondary">Rezultat</span>
          <span className="font-medium text-text">{pct.toFixed(0)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-card">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#60a5fa] to-[#4ade80]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Per-problem breakdown */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-secondary">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tvoj odgovor</th>
              <th className="px-4 py-3">Tačan</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p: any) => (
              <tr key={p.position} className="border-b border-border/50">
                <td className="px-4 py-3 text-text">{p.position}</td>
                <td className="px-4 py-3">
                  {p.isCorrect === true && <CheckCircle size={16} className="text-[#4ade80]" />}
                  {p.isCorrect === false && <XCircle size={16} className="text-[#f87171]" />}
                  {p.isCorrect === null && <Minus size={16} className="text-text-secondary" />}
                </td>
                <td className="px-4 py-3 text-text">{p.answer ? `(${p.answer})` : "\u2014"}</td>
                <td className="px-4 py-3 text-[#4ade80]">({p.correctAnswer})</td>
                <td className="px-4 py-3">
                  <Link href={`/zadaci/${p.slug}`} className="text-xs text-[#60a5fa] hover:underline">
                    Rešenje
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/rang-lista" className="rounded-lg border border-border px-5 py-2.5 text-sm text-text-secondary">
          Rang lista
        </Link>
        <Link href="/ispit" className="rounded-lg border border-border px-5 py-2.5 text-sm text-text-secondary">
          Novi ispit
        </Link>
        <Link href="/zadaci" className="rounded-lg bg-[#60a5fa] px-5 py-2.5 text-sm font-medium text-white">
          Nazad na zadatke
        </Link>
      </div>
    </div>
  );
}
