"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* ─── types ─── */

interface DashboardProps {
  user: {
    displayName: string;
    email: string;
    avatarUrl?: string | null;
    targetFaculties: string[];
    role: string;
  };
}

interface CategoryData {
  id: string;
  name: string;
  total: number;
  solved: number;
  percent: number;
  readinessScore?: number;
}

interface CategoryGroupData {
  id: string;
  name: string;
  total: number;
  solved: number;
  percent: number;
  readinessScore?: number;
  categories: CategoryData[];
}

interface DashboardData {
  user: {
    displayName: string;
    avatarUrl: string | null;
    streakCurrent: number;
    streakBest: number;
    targetFaculties: string[];
  };
  progress: {
    total: number;
    solved: number;
    dailyGoal: number;
    solvedToday: number;
  };
  lastExam: {
    scorePercent: string;
    facultyName: string;
    startedAt: string;
  } | null;
  countdown: string | null;
  categoryGroups: CategoryGroupData[];
  rank: {
    position: number | null;
    totalParticipants: number;
    totalScore: string;
    problemsSolved: number;
    avgScore: string;
  };
  facultyExamDates: Array<{
    id: string;
    name: string;
    shortName: string;
    examDate: string | null;
  }>;
  readinessScore: number;
  recommendations: Array<{
    type: "practice" | "simulation" | "lesson";
    title: string;
    subtitle: string;
    href: string;
    icon: string;
    badge: string;
  }>;
  recentExams: Array<{
    id: string;
    facultyName: string;
    scorePercent: string;
    numCorrect: number;
    numWrong: number;
    numBlank: number;
    timeSpent: number;
    durationLimit: number | null;
    testSize: string;
    startedAt: string;
  }>;
}

/* ─── exam table helpers ─── */

function getStatusBadge(percent: number) {
  if (percent >= 85) return { label: "Odlično", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
  if (percent >= 65) return { label: "Dobro", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
  return { label: "Potrebna vežba", color: "bg-[#ec5b13]/10 text-[#ec5b13] border-[#ec5b13]/20" };
}

function getTestTypeInfo(testSize: string) {
  switch (testSize) {
    case "full": return { label: "Kompletan test", icon: "assignment", iconColor: "text-emerald-500", bgColor: "bg-emerald-500/10" };
    case "medium": return { label: "Srednji test", icon: "edit_note", iconColor: "text-blue-500", bgColor: "bg-blue-500/10" };
    case "quick": return { label: "Brzi test", icon: "bolt", iconColor: "text-orange-500", bgColor: "bg-orange-500/10" };
    default: return { label: testSize, icon: "assignment", iconColor: "text-text-secondary", bgColor: "bg-slate-400/10" };
  }
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "--";
  return `${Math.floor(seconds / 60)}m`;
}

function formatExamDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];
  const days = ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"];
  return {
    date: `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`,
    detail: `${days[d.getDay()]}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}h`,
  };
}

function getTestProblemCount(testSize: string): number {
  switch (testSize) { case "full": return 20; case "medium": return 14; case "quick": return 8; default: return 20; }
}

/* ─── faculty icons ─── */

const FACULTY_ICONS: Record<string, string> = {
  etf: "school",
  fon: "science",
  matf: "calculate",
  masf: "precision_manufacturing",
  grf: "apartment",
  rgf: "settings",
  tmf: "biotech",
  sf: "commute",
  ff: "experiment",
};

/* ─── category images ─── */

const CATEGORY_IMAGES: Record<string, { dark: string; light: string }> = {
  algebra: { dark: "/images/categories/algebra.png", light: "/images/categories/light/algebra.png" },
  trigonometry: { dark: "/images/categories/trigonometry.png", light: "/images/categories/light/trigonometry.png" },
  geometry: { dark: "/images/categories/geometry.png", light: "/images/categories/light/geometry.png" },
  analysis: { dark: "/images/categories/analysis.png", light: "/images/categories/light/analysis.png" },
  combinatorics_and_probability: { dark: "/images/categories/combinatorics_and_probability.png", light: "/images/categories/light/combinatorics_and_probability.png" },
};

/* ─── helpers ─── */

function getCountdown(targetDate: string | null) {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0 };
  const now = new Date();
  const target = new Date(targetDate + "T10:00:00");
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

function getMotivationalMessage(): string {
  const messages = [
    "Danas je odličan dan za naprednu trigonometriju.",
    "Svaki rešeni zadatak te približava cilju!",
    "Fokus i upornost donose rezultate.",
    "Nastavi tako, na dobrom si putu!",
    "Matematika je jezik univerzuma.",
  ];
  const dayIndex = new Date().getDate() % messages.length;
  return messages[dayIndex];
}

/* ─── component ─── */

export default function Dashboard({ user }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showCategoryBreakdown, setShowCategoryBreakdown] = useState(false);

  useEffect(() => {
    fetch("/api/user/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* loading skeleton */
  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-10 h-12 w-96 animate-pulse rounded-lg bg-[var(--tint)]" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 space-y-6 lg:col-span-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="h-40 animate-pulse rounded-2xl bg-[var(--tint)]" />
              <div className="h-40 animate-pulse rounded-2xl bg-[var(--tint)]" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-52 animate-pulse rounded-2xl bg-[var(--tint)]" />
              ))}
            </div>
            <div className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
          </div>
          <div className="col-span-12 space-y-6 lg:col-span-4">
            <div className="h-44 animate-pulse rounded-2xl bg-[#ec5b13]/20" />
            <div className="h-72 animate-pulse rounded-2xl bg-[var(--tint)]" />
          </div>
        </div>
      </div>
    );
  }

  const progress = data?.progress ?? { total: 0, solved: 0, dailyGoal: 20, solvedToday: 0 };
  const countdown = getCountdown(data?.countdown ?? "2026-06-15");
  const rank = data?.rank;
  const streak = data?.user?.streakCurrent ?? 0;
  const categoryGroups = data?.categoryGroups ?? [];

  const recommendations = data?.recommendations ?? [];

  return (
    <div className="relative p-8">
        {/* Header */}
        <header className="mb-10 flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-heading">
              Zdravo, {user.displayName}!
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              {progress.solvedToday >= progress.dailyGoal
                ? <>Dnevni cilj: <span className="font-bold text-emerald-500">ispunjen!</span></>
                : <>Dnevni cilj: <span className="font-bold text-heading">{progress.solvedToday}/{progress.dailyGoal}</span> rešeno danas</>
              }
            </p>
          </div>
          {(() => {
            const sz = 52;
            const sw = sz * 0.08;
            const r = (sz - sw) / 2;
            const circ = 2 * Math.PI * r;
            const pct = progress.dailyGoal > 0 ? Math.min(progress.solvedToday / progress.dailyGoal, 1) : 0;
            const filled = pct * circ;
            return (
              <div className="relative shrink-0" style={{ width: sz, height: sz }}>
                <svg width={sz} height={sz} className="-rotate-90">
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#0d9488" strokeWidth={sw} opacity={0.15} />
                  <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#0d9488" strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={circ - filled} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[#0d9488]">
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                </span>
              </div>
            );
          })()}
          <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
            {(() => {
              const fsz = 52;
              const fsw = fsz * 0.08;
              const fr = (fsz - fsw) / 2;
              const fcirc = 2 * Math.PI * fr;
              const goalMet = progress.solvedToday >= progress.dailyGoal;
              return (
                <svg width={fsz} height={fsz} className="-rotate-90">
                  <circle cx={fsz/2} cy={fsz/2} r={fr} fill="none" stroke={goalMet ? '#ec5b13' : 'var(--glass-border)'} strokeWidth={fsw} opacity={goalMet ? 0.15 : 1} />
                  {goalMet && <circle cx={fsz/2} cy={fsz/2} r={fr} fill="none" stroke="#ec5b13" strokeWidth={fsw} strokeDasharray={fcirc} strokeDashoffset={0} strokeLinecap="round" />}
                </svg>
              );
            })()}
            <span className="absolute inset-0 flex items-center justify-center">
              <Flame size={28} className="text-[#ec5b13]" fill="currentColor" />
            </span>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ec5b13] px-2.5 py-0.5 text-[10px] font-black text-white">
              {streak} {streak === 1 ? 'DAN' : 'DANA'}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* ─── LEFT COLUMN (9 cols) ─── */}
          <div className="col-span-12 space-y-6 lg:col-span-9">
            {/* Focus Card + Subject Grid */}
            {(() => {
              const sorted = [...categoryGroups].sort((a, b) => (a.readinessScore ?? 0) - (b.readinessScore ?? 0));
              const weakest = sorted[0];
              const rest = sorted.slice(1);
              if (!weakest) return null;

              const ws = weakest.readinessScore ?? 0;
              const barColor = ws === 0 ? '#f9a8a8' : ws <= 30 ? '#dc2626' : ws <= 60 ? '#ec5b13' : '#22c55e';

              // Find 2 weakest subcategories for the hint text
              const weakSubs = [...(weakest.categories || [])]
                .sort((a, b) => (a.readinessScore ?? 0) - (b.readinessScore ?? 0))
                .slice(0, 2)
                .map(c => c.name);
              const hint = weakSubs.length > 0
                ? `Najslabija oblast. Fokusiraj se na: ${weakSubs.join(' i ')}.`
                : 'Najslabija oblast.';

              return (
                <div className="space-y-8">
                  {/* Focus Card */}
                  <Link
                    href={`/zadaci?group=${weakest.id}`}
                    className="block glass-card rounded-2xl p-6 border-2 border-[#ec5b13]/30 transition-all hover:border-[#ec5b13]/60"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-black text-heading">{weakest.name}</h3>
                          <span className="rounded-full bg-[#ec5b13]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#ec5b13]">Fokus</span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">{hint}</p>
                      </div>
                      <p className="text-5xl font-black leading-none" style={{ color: barColor }}>{ws}<span className="text-2xl text-muted font-bold">/100</span></p>
                    </div>
                    <div className="mt-4 w-full py-3.5 rounded-xl bg-[#ec5b13] text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                      VEŽBAJ ODMAH <span className="material-symbols-outlined text-base">rocket_launch</span>
                    </div>
                  </Link>

                  {/* Subject Grid */}
                  <div className="grid grid-cols-2 gap-5">
                    {rest.map((group) => {
                      const score = group.readinessScore ?? 0;
                      const color = score === 0 ? '#f9a8a8' : score <= 30 ? '#dc2626' : score <= 60 ? '#ec5b13' : '#0d9488';
                      return (
                        <Link
                          key={group.id}
                          href={`/zadaci?group=${group.id}`}
                          className="group rounded-xl p-5 transition-all border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5 hover:scale-[1.02]"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold text-heading">{group.name}</h4>
                            <p className="text-3xl font-black leading-none" style={{ color }}>{score}<span className="text-base text-muted font-bold">/100</span></p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-[10px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--tint-strong)' }}>
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${Math.max(score, score === 0 ? 100 : 0)}%`, backgroundColor: color }}
                              />
                            </div>
                            <span className="text-xs font-bold text-muted group-hover:text-[#ec5b13] transition-colors shrink-0">
                              VEŽBAJ →
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Recent Simulations — temporarily hidden
            {data?.recentExams && data.recentExams.length > 0 && (
              <div className="glass-card rounded-2xl border-l-4 border-[#ec5b13] overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#ec5b13]">history</span>
                    <h3 className="text-lg font-bold">Poslednje simulacije</h3>
                  </div>
                  <Link
                    href="/simulacija/istorija"
                    className="text-xs font-bold uppercase text-[#ec5b13] hover:underline"
                  >
                    Sve simulacije
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[var(--tint)] border-b border-[#ec5b13]/10">
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">Datum</th>
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">Tip testa</th>
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">Trajanje</th>
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">Rezultat</th>
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-right">Akcija</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ec5b13]/5">
                      {data.recentExams.map((exam) => {
                        const pct = parseFloat(exam.scorePercent || "0");
                        const badge = getStatusBadge(pct);
                        const typeInfo = getTestTypeInfo(exam.testSize);
                        const dateInfo = formatExamDate(exam.startedAt);
                        const problemCount = getTestProblemCount(exam.testSize);

                        return (
                          <tr key={exam.id} className="hover:bg-[#ec5b13]/5 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="font-bold text-heading">{dateInfo.date}</span>
                                <span className="text-xs text-muted">{dateInfo.detail}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg ${typeInfo.bgColor} flex items-center justify-center`}>
                                  <span className={`material-symbols-outlined text-base ${typeInfo.iconColor}`}>{typeInfo.icon}</span>
                                </div>
                                <span className="font-medium text-text">{typeInfo.label}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-sm font-mono text-text-secondary">
                                {formatDuration(exam.timeSpent)} / {formatDuration(exam.durationLimit)}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-lg font-black text-[#ec5b13]">
                                {exam.numCorrect}/{problemCount}
                              </span>
                              <span className="text-xs text-text-secondary block font-bold">{pct.toFixed(0)}%</span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <Link
                                href={`/simulacija/${exam.id}/rezultati`}
                                className="inline-flex items-center gap-2 font-bold text-sm text-text-secondary hover:text-[#ec5b13] transition-all group-hover:translate-x-[-4px]"
                              >
                                Pogledaj rešenja
                                <ChevronRight size={16} />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            */}
          </div>

          {/* ─── RIGHT COLUMN (3 cols) ─── */}
          <div className="col-span-12 space-y-6 lg:col-span-3">
            {/* Readiness Score */}
            {(() => {
              const score = data?.readinessScore ?? 0;
              const color =
                score >= 80
                  ? "#10b981"
                  : score >= 60
                    ? "#f59e0b"
                    : score >= 40
                      ? "#f97316"
                      : "#ef4444";
              const label =
                score >= 80
                  ? "Odlična pripremljenost"
                  : score >= 60
                    ? "Dobra pripremljenost"
                    : score >= 40
                      ? "Potrebno još vežbanja"
                      : "Tek na početku";
              const sz = 80;
              const sw = sz * 0.1;
              const r = (sz - sw) / 2;
              const circ = 2 * Math.PI * r;
              const filled = (score / 100) * circ;

              return (
                <div className="glass-card relative overflow-hidden rounded-2xl p-6">
                  {/* Readiness */}
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0" style={{ width: sz, height: sz }}>
                      <svg width={sz} height={sz} className="-rotate-90">
                        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={sw} opacity={0.15} />
                        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={circ - filled} strokeLinecap="round" className="transition-all duration-700" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-heading">{score}<span className="text-lg text-muted font-bold">/100</span></p>
                      <p className="text-sm font-bold text-text-secondary">Spremnost</p>
                      <p className="text-xs" style={{ color }}>{label}</p>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="my-5 border-t border-[var(--glass-border)]" />

                  {/* Countdown */}
                  <div className="text-center mb-4">
                    <p className="text-4xl font-black text-heading uppercase">{countdown.days} DANA</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-secondary mt-1">Do prijemnog ispita</p>
                  </div>
                  {data?.facultyExamDates && data.facultyExamDates.length > 0 && (() => {
                    const sorted = [...data.facultyExamDates]
                      .filter((f) => f.examDate)
                      .sort((a, b) => new Date(a.examDate!).getTime() - new Date(b.examDate!).getTime());
                    if (sorted.length === 0) return null;
                    const months = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"];
                    return (
                      <div className={`grid gap-3 ${sorted.length === 1 ? "grid-cols-1 max-w-[100px] mx-auto" : sorted.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {sorted.map((fac) => {
                          const d = new Date(fac.examDate!);
                          const dateStr = `${d.getDate()}. ${months[d.getMonth()]}`;
                          return (
                            <div key={fac.id} className="flex flex-col items-center rounded-xl bg-[var(--tint-strong)] py-3 px-2">
                              <span className="text-sm font-black text-heading">{fac.shortName}</span>
                              <span className="text-xs text-text-secondary">{dateStr}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              );
            })()}


          </div>
        </div>
      </div>
  );
}
