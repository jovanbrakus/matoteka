"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Target,
  Timer,
  Users,
  ClipboardCheck,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import { sr } from "date-fns/locale";

/* ─── types ─── */

interface CategoryData {
  name: string;
  correct: number;
  total: number;
  percent: number;
}

interface TrendPoint {
  week: string;
  avgScore: number;
  examCount: number;
}

interface StrengthWeakness {
  id: string;
  name: string;
  percent: number;
}

interface CategoryGroup {
  id: string;
  name: string;
  categories: string[];
}

interface ReadinessBreakdown {
  finalScore: number;
  rawScore: number;
  groupScores: Record<string, {
    score: number;
    weight: number;
    subcategories: Record<string, {
      score: number;
      accuracy: number;
      confidence: number;
      recentCorrect: number;
      recentTotal: number;
    }>;
  }>;
}

interface Analytics {
  accuracyPercent: number;
  avgSolveTimeSec: number;
  percentileRank: number;
  totalSimulations: number;
  problemsSolved: number;
  problemsAttempted: number;
  categoryBreakdown: Record<string, CategoryData>;
  strengths: StrengthWeakness[];
  weaknesses: StrengthWeakness[];
  trendData: TrendPoint[];
  readinessScore: number;
  readinessBreakdown: ReadinessBreakdown | null;
  updatedAt: string;
}

interface RecentExam {
  id: string;
  facultyId: string;
  facultyName: string;
  scorePercent: number;
  timeSpent: number;
  numCorrect: number;
  numWrong: number;
  numBlank: number;
  finishedAt: string;
  mode: string;
}

/* ─── helpers ─── */

function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function formatExamTime(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("sr-Latn", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatWeekLabel(dateStr: string, index: number, total: number): string {
  if (index === total - 1) return "DANAS";
  return `NED ${index + 1}`;
}

/* ─── component ─── */

export default function AnalytikaPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [recentExams, setRecentExams] = useState<RecentExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/prijava");
      return;
    }
    if (sessionStatus !== "authenticated") return;

    fetch("/api/analytics")
      .then((r) => r.json())
      .then((data) => {
        setAnalytics(data.analytics);
        setCategoryGroups(data.categoryGroups ?? []);
        setRecentExams(data.recentExams ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sessionStatus, router]);

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      await fetch("/api/analytics/recalculate", { method: "POST" });
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setAnalytics(data.analytics);
      setRecentExams(data.recentExams ?? []);
    } catch (e) {
      console.error("Recalculation error:", e);
    } finally {
      setRecalculating(false);
    }
  };

  const userName =
    session?.user?.displayName || session?.user?.name || "Korisnik";

  /* ─── chart data ─── */
  const chartData =
    analytics?.trendData?.map((point, i, arr) => ({
      name: formatWeekLabel(point.week, i, arr.length),
      score: point.avgScore,
    })) ?? [];


  /* ─── loading ─── */
  if (loading || sessionStatus === "loading") {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8">
        <div className="mb-6 h-8 w-64 animate-pulse rounded-lg bg-card" />
        <div className="mb-8">
          <div className="h-32 animate-pulse rounded-2xl bg-card" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="h-80 animate-pulse rounded-3xl bg-card lg:col-span-2" />
          <div className="h-80 animate-pulse rounded-3xl bg-card" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-3xl bg-card lg:col-span-2" />
          <div className="h-64 animate-pulse rounded-3xl bg-card" />
        </div>
      </div>
    );
  }

  /* ─── empty state ─── */
  const hasData = analytics && analytics.problemsAttempted > 0;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Analitika uspeha
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {hasData
              ? `Dobrodošli nazad, ${userName}. Vaš napredak je konstantan.`
              : `${userName}, počnite sa vežbanjem da biste videli analitiku.`}
          </p>
        </div>
        <button
          onClick={handleRecalculate}
          disabled={recalculating}
          className="flex items-center gap-2 self-start rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-4 py-2 text-sm font-semibold text-[#ec5b13] transition hover:bg-[#ec5b13]/20 disabled:opacity-50"
        >
          <RefreshCw size={16} className={recalculating ? "animate-spin" : ""} />
          {recalculating ? "Preračunavanje..." : "Preračunaj"}
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="mb-8">
        <div className="glass-panel relative overflow-hidden rounded-2xl p-6">
          <div className="relative z-10">
            <p className="text-sm font-semibold text-text-secondary">
              Prosečna preciznost
            </p>
            <h3 className="mt-1 text-3xl font-black text-text">
              {hasData ? `${analytics.accuracyPercent.toFixed(1)}%` : "—"}
            </h3>
            {hasData && (
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-500">
                <TrendingUp size={14} />
                {analytics.problemsSolved} od {analytics.problemsAttempted}{" "}
                tačno
              </div>
            )}
          </div>
          <Target
            size={40}
            className="absolute right-4 top-4 text-[#ec5b13]/20"
          />
        </div>
      </div>

      {/* Main Analytics Section: Trend + Categories */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Trend Chart */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-2">
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-text">
                Trend uspesnosti
              </h4>
              <p className="text-xs text-text-secondary">
                Stopa uspeha kroz poslednjih 12 nedelja
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ec5b13] shadow-[0_0_8px_rgba(236,91,19,0.6)]" />
              <span className="text-xs font-bold uppercase tracking-tighter text-text-secondary">
                Uspeh %
              </span>
            </div>
          </div>

          {chartData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ec5b13"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ec5b13"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid rgba(236,91,19,0.3)",
                      borderRadius: "8px",
                      color: "var(--color-text)",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value}%`, "Uspeh"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#ec5b13"
                    strokeWidth={2}
                    fill="url(#chartGradient)"
                    dot={{
                      r: 4,
                      fill: "#ec5b13",
                      stroke: "#ec5b13",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#ec5b13",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto mb-3 text-border" />
                <p className="text-sm text-text-secondary">
                  Završeni ispiti će se prikazati ovde.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Category Breakdown — grouped by readiness score */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <h4 className="mb-6 text-lg font-bold text-text">
            Uspeh po kategorijama
          </h4>
          {categoryGroups.length > 0 && analytics?.readinessBreakdown ? (
            <div className="space-y-4">
              {categoryGroups.map((group) => {
                const gs = analytics.readinessBreakdown?.groupScores?.[group.id];
                const groupScore = Math.round(gs?.score ?? 0);
                const isExpanded = expandedGroups.has(group.id);
                const childCats = group.categories.map((id) => ({
                  id,
                  name: analytics.categoryBreakdown[id]?.name ?? id,
                  score: Math.round(gs?.subcategories?.[id]?.score ?? 0),
                }));

                return (
                  <div key={group.id} className="rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] overflow-hidden">
                    <button
                      onClick={() => setExpandedGroups((prev) => {
                        const next = new Set(prev);
                        if (next.has(group.id)) next.delete(group.id);
                        else next.add(group.id);
                        return next;
                      })}
                      className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--tint-strong)]"
                    >
                      <span
                        className="material-symbols-outlined text-sm text-muted transition-transform"
                        style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                      >
                        chevron_right
                      </span>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-heading">{group.name}</span>
                          <span className="text-sm font-bold text-[#ec5b13]">{groupScore}</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
                          <div
                            className="h-full rounded-full bg-[#ec5b13] transition-all duration-700"
                            style={{ width: `${groupScore}%` }}
                          />
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="space-y-3 border-t border-[var(--glass-border)] px-4 py-3 pl-11">
                        {childCats.map((cat) => (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-text-secondary">{cat.name}</span>
                              <span className="font-semibold text-text-secondary">{cat.score}</span>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-card">
                              <div
                                className="h-full rounded-full bg-[#ec5b13]/60 transition-all duration-700"
                                style={{ width: `${cat.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {analytics.weaknesses && analytics.weaknesses.length > 0 && (
                <div className="mt-4 rounded-xl border border-[#ec5b13]/10 bg-[#ec5b13]/5 p-4">
                  <p className="text-xs italic text-text-secondary">
                    Vaš fokus bi trebalo da ostane na{" "}
                    <span className="font-bold text-[#ec5b13]">
                      {analytics.weaknesses[0].name}
                    </span>{" "}
                    gde je primećen blagi pad preciznosti.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <p className="text-sm text-text-secondary">
                Rešavajte zadatke da vidite statistiku.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lower Section: Recent Simulations + Strengths/Weaknesses */}
      <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-3">
        {/* Recent Simulations */}
        <div className="glass-panel overflow-hidden rounded-3xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#ec5b13]/10 px-6 py-5 sm:px-8">
            <h4 className="text-lg font-bold text-text">
              Nedavne simulacije
            </h4>
            <button
              onClick={() => router.push("/simulacija")}
              className="text-xs font-bold text-[#ec5b13] hover:underline"
            >
              Sve simulacije
            </button>
          </div>
          {recentExams.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-bg/50 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  <tr>
                    <th className="px-6 py-4 sm:px-8">Naziv simulacije</th>
                    <th className="px-6 py-4 text-center sm:px-8">Uspeh</th>
                    <th className="hidden px-6 py-4 text-center sm:table-cell sm:px-8">
                      Vreme
                    </th>
                    <th className="px-6 py-4 text-right sm:px-8">Datum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ec5b13]/5">
                  {recentExams.map((exam) => {
                    const score = exam.scorePercent;
                    const scoreColor =
                      score >= 80
                        ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                        : score >= 60
                          ? "text-orange-500 bg-orange-500/10 border-orange-500/20"
                          : "text-red-400 bg-red-400/10 border-red-400/20";
                    return (
                      <tr
                        key={exam.id}
                        className="cursor-pointer transition-colors hover:bg-[#ec5b13]/5"
                        onClick={() =>
                          router.push(`/simulacija/${exam.id}/rezultati`)
                        }
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-text sm:px-8">
                          {exam.facultyName} simulacija
                        </td>
                        <td className="px-6 py-4 text-center sm:px-8">
                          <span
                            className={`rounded border px-2 py-1 text-xs font-bold ${scoreColor}`}
                          >
                            {score.toFixed(0)}%
                          </span>
                        </td>
                        <td className="hidden px-6 py-4 text-center font-mono text-sm text-text-secondary sm:table-cell sm:px-8">
                          {formatExamTime(exam.timeSpent)}
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-text-secondary sm:px-8">
                          {formatDate(exam.finishedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ClipboardCheck
                size={40}
                className="mb-3 text-border"
              />
              <p className="text-sm text-text-secondary">
                Nemate završenih simulacija.
              </p>
              <button
                onClick={() => router.push("/simulacija")}
                className="mt-3 text-sm font-semibold text-[#ec5b13] hover:underline"
              >
                Započnite prvu simulaciju
              </button>
            </div>
          )}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="glass-panel flex flex-col rounded-3xl p-6 sm:p-8">
          <h4 className="mb-6 text-lg font-bold text-text">
            Snage i slabosti
          </h4>

          <div className="flex-1 space-y-8">
            {/* Strengths */}
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                Masterirano
              </p>
              <div className="flex flex-wrap gap-2">
                {analytics?.strengths && analytics.strengths.length > 0 ? (
                  analytics.strengths.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-500"
                    >
                      {s.name}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-text-secondary">
                    Rešavajte više zadataka da otkrijete vaše snage.
                  </p>
                )}
              </div>
            </div>

            {/* Weaknesses */}
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-orange-500">
                Potreban fokus
              </p>
              <div className="flex flex-wrap gap-2">
                {analytics?.weaknesses && analytics.weaknesses.length > 0 ? (
                  analytics.weaknesses.map((w) => (
                    <span
                      key={w.id}
                      className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-500"
                    >
                      {w.name}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-text-secondary">
                    {analytics?.strengths && analytics.strengths.length > 0
                      ? "Odlično! Nema oblasti koje zahtevaju posebnu pažnju."
                      : "Rešavajte više zadataka da identifikujemo slabosti."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recommended next step */}
          <div className="mt-8 border-t border-[#ec5b13]/10 pt-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ec5b13]/20 text-[#ec5b13]">
                <Lightbulb size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-text">
                  Sledeći preporučeni korak
                </p>
                <p className="text-[11px] text-text-secondary">
                  {analytics?.weaknesses && analytics.weaknesses.length > 0
                    ? `Vežbajte: ${analytics.weaknesses[0].name}`
                    : "Pokrenite novu simulaciju"}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/simulacija")}
              className="w-full rounded-xl bg-[#ec5b13] py-3 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:bg-orange-600"
            >
              Započni vežbu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
