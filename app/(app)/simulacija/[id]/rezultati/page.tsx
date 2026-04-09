"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Minus,
  Clock,
  Trophy,
  BarChart3,
  Target,
  ChevronRight,
  ArrowLeft,
  Award,
  TrendingUp,
  History,
} from "lucide-react";

interface ExamResult {
  exam: {
    id: string;
    testSize: string;
    mode: string;
    status: string;
    score: string;
    maxScore: string;
    scorePercent: string;
    numCorrect: number;
    numWrong: number;
    numBlank: number;
    timeSpent: number;
    durationLimit: number | null;
    startedAt: string;
    finishedAt: string;
  };
  faculty: {
    id: string;
    shortName: string;
    name: string;
  };
  problems: {
    position: number;
    pointValue: string;
    answer: string | null;
    isCorrect: boolean | null;
    isFlagged: boolean;
    title: string;
    correctAnswer: string;
  }[];
}

function getStatusBadge(percent: number) {
  if (percent >= 85)
    return {
      label: "Odlično",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
  if (percent >= 65)
    return {
      label: "Dobro",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
  return {
    label: "Potrebna vežba",
    color: "bg-[#ec5b13]/10 text-[#ec5b13] border-[#ec5b13]/20",
  };
}

export default function SimulationResultsPage() {
  const params = useParams();
  const examId = params.id as string;
  const [data, setData] = useState<ExamResult | null>(null);

  useEffect(() => {
    fetch(`/api/simulation/${examId}/results`)
      .then((r) => r.json())
      .then(setData);
  }, [examId]);

  if (!data)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
          <p className="mt-4 text-text-secondary">Učitavanje rezultata...</p>
        </div>
      </div>
    );

  const { exam, faculty, problems } = data;
  const pct = parseFloat(exam.scorePercent || "0");
  const badge = getStatusBadge(pct);
  const score = parseFloat(exam.score || "0");
  const maxScore = parseFloat(exam.maxScore || "0");

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${sec}s`;
  }

  function formatDuration(s: number | null) {
    if (!s) return "--";
    const m = Math.floor(s / 60);
    return `${m} min`;
  }

  const testLabel =
    exam.testSize === "full"
      ? "Kompletan test"
      : exam.testSize === "medium"
      ? "Srednji test"
      : "Brzi test";

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Back link */}
        <Link
          href="/simulacija/istorija"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-heading transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Istorija testova
        </Link>

        {/* Main Result Card */}
        <div className="rounded-3xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] backdrop-blur-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Score Circle */}
            <div className="relative w-40 h-40 shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(236,91,19,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#ec5b13"
                  strokeWidth="8"
                  strokeDasharray={`${(pct / 100) * 440} 440`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-heading">
                  {pct.toFixed(0)}%
                </span>
                <span
                  className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full mt-1 border ${badge.color}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-heading mb-2">
                Rezultati simulacije
              </h1>
              <p className="text-text-secondary mb-6">
                {testLabel} - {faculty?.shortName}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl bg-[var(--tint)] border border-[var(--glass-border)] p-4 text-center">
                  <Trophy size={20} className="mx-auto mb-2 text-emerald-400" />
                  <div className="text-xl font-black text-heading">
                    {exam.numCorrect}/{problems.length}
                  </div>
                  <div className="text-xs text-text-secondary">Tačnih</div>
                </div>
                <div className="rounded-xl bg-[var(--tint)] border border-[var(--glass-border)] p-4 text-center">
                  <BarChart3
                    size={20}
                    className="mx-auto mb-2 text-[#ec5b13]"
                  />
                  <div className="text-xl font-black text-heading">
                    {score.toFixed(1)}/{maxScore.toFixed(0)}
                  </div>
                  <div className="text-xs text-text-secondary">Bodovi</div>
                </div>
                <div className="rounded-xl bg-[var(--tint)] border border-[var(--glass-border)] p-4 text-center">
                  <Clock size={20} className="mx-auto mb-2 text-blue-400" />
                  <div className="text-xl font-black text-heading">
                    {formatTime(exam.timeSpent || 0)}
                  </div>
                  <div className="text-xs text-text-secondary">Vreme</div>
                </div>
                <div className="rounded-xl bg-[var(--tint)] border border-[var(--glass-border)] p-4 text-center">
                  <Target size={20} className="mx-auto mb-2 text-yellow-400" />
                  <div className="text-xl font-black text-heading">
                    {exam.numWrong}
                  </div>
                  <div className="text-xs text-text-secondary">Pogrešnih</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] p-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Ukupan rezultat</span>
            <span className="font-bold text-heading">{pct.toFixed(0)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[var(--tint-strong)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ec5b13] to-[#ff7a33] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted mt-2">
            <span>
              Tačno: {exam.numCorrect} | Pogrešno: {exam.numWrong} | Prazno:{" "}
              {exam.numBlank}
            </span>
            <span>
              {exam.durationLimit
                ? `${formatTime(exam.timeSpent || 0)} / ${formatDuration(exam.durationLimit)}`
                : formatTime(exam.timeSpent || 0)}
            </span>
          </div>
        </div>

        {/* Per-problem breakdown */}
        <div className="rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[var(--glass-border)]">
            <h2 className="text-lg font-bold text-heading">
              Pregled po zadacima
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--glass-border)] text-left">
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider">
                    Zadatak
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider text-center">
                    Tvoj odgovor
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider text-center">
                    Tačan
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider text-center">
                    Bodovi
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right">
                    Akcija
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p) => {
                  const pv = parseFloat(p.pointValue);
                  let earnedPoints: number;
                  if (p.isCorrect === true) {
                    earnedPoints = pv;
                  } else if (p.isCorrect === false) {
                    earnedPoints = -(pv * 0.16);
                  } else {
                    earnedPoints = 0;
                  }

                  return (
                    <tr
                      key={p.position}
                      className="border-b border-[var(--glass-border)] hover:bg-[var(--tint)] transition-colors"
                    >
                      <td className="px-6 py-4 text-heading font-bold">
                        {p.position}
                      </td>
                      <td className="px-6 py-4 text-text max-w-[200px] truncate">
                        {p.title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.isCorrect === true && (
                          <CheckCircle
                            size={18}
                            className="inline text-emerald-400"
                          />
                        )}
                        {p.isCorrect === false && (
                          <XCircle
                            size={18}
                            className="inline text-red-400"
                          />
                        )}
                        {p.isCorrect === null && (
                          <Minus size={18} className="inline text-muted" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-heading">
                        {p.answer ? `(${p.answer})` : "—"}
                      </td>
                      <td className="px-6 py-4 text-center text-emerald-400 font-medium">
                        ({p.correctAnswer})
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold ${
                            earnedPoints > 0
                              ? "text-emerald-400"
                              : earnedPoints < 0
                              ? "text-red-400"
                              : "text-muted"
                          }`}
                        >
                          {earnedPoints > 0 ? "+" : ""}
                          {earnedPoints.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/simulacija/${examId}/resenje/${p.position}`}
                          className="inline-flex items-center gap-1 text-xs text-[#ec5b13] hover:text-[#ff7a33] font-bold"
                        >
                          Rešenje
                          <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/simulacija/istorija"
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] px-6 py-3 text-sm font-bold text-text hover:bg-[var(--tint)] transition-all"
          >
            <History size={16} />
            Istorija testova
          </Link>
          <Link
            href="/simulacija"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#ec5b13] px-6 py-3 text-sm font-bold text-white hover:bg-[#ec5b13]/90 transition-all shadow-[0_0_15px_rgba(236,91,19,0.3)]"
          >
            <TrendingUp size={16} />
            Nova simulacija
          </Link>
        </div>
      </div>
    </div>
  );
}
