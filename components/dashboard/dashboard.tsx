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
  season: { name: string; examPeriodStart: string } | null;
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
    "Danas je odlican dan za naprednu trigonometriju.",
    "Svaki reseni zadatak te priblizava cilju!",
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
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-heading mb-1">
            Zdravo, {user.displayName}!
          </h1>
          <p className="text-sm text-text-secondary">{getMotivationalMessage()}</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* ─── LEFT COLUMN (9 cols) ─── */}
          <div className="col-span-12 space-y-6 lg:col-span-9">
            {/* AI Recommendations */}
            <div className="glass-card rounded-2xl border-l-4 border-[#ec5b13] p-6">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles size={22} className="text-[#ec5b13]" />
                <h3 className="text-lg font-bold">Preporuka za danas</h3>
              </div>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.badge} className="flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-2xl font-black leading-none text-[#ec5b13]/30">{rec.badge}</span>
                        <span className="material-symbols-outlined text-sm text-[#ec5b13]/50">{rec.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-heading">{rec.title}</h4>
                        <p className="text-xs text-text-secondary">{rec.subtitle}</p>
                      </div>
                    </div>
                    <Link
                      href={rec.href}
                      className="flex-shrink-0 rounded-xl bg-[#ec5b13] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(236,91,19,0.2)] transition-transform hover:scale-105"
                    >
                      KRENI
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Categories */}
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                {categoryGroups.map((group) => {
                  const score = (group as any).readinessScore ?? 0;
                  const image = CATEGORY_IMAGES[group.id];
                  const sz = 48;
                  const sw = sz * 0.1;
                  const r = (sz - sw) / 2;
                  const circ = 2 * Math.PI * r;
                  const filled = (score / 100) * circ;

                  return (
                    <Link
                      key={group.id}
                      href={`/zadaci?group=${group.id}`}
                      className="glass-card flex flex-col rounded-2xl p-5 transition-all hover:border-[#ec5b13]/30"
                    >
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          {image && (
                            <>
                              <img src={image.dark} alt={group.name} className="h-10 w-14 shrink-0 rounded-lg object-cover dark-only" />
                              <img src={image.light} alt={group.name} className="h-10 w-14 shrink-0 rounded-lg object-cover light-only" />
                            </>
                          )}
                          <div className="relative shrink-0" style={{ width: sz, height: sz }}>
                            <svg width={sz} height={sz} className="-rotate-90">
                              <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#ec5b13" strokeWidth={sw} opacity={0.15} />
                              <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#ec5b13" strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={circ - filled} strokeLinecap="round" className="transition-all duration-700" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-primary">
                              {score}
                            </span>
                          </div>
                        </div>
                        <h4 className="mt-2 text-sm font-bold leading-tight">{group.name}</h4>
                      </div>
                      {/* 3 weakest subcategories */}
                      {(() => {
                        const weakest = [...group.categories]
                          .sort((a, b) => ((a as any).readinessScore ?? 0) - ((b as any).readinessScore ?? 0))
                          .slice(0, 3);
                        return (
                          <div className="mt-3 space-y-1.5 border-t border-[var(--glass-border)] pt-3">
                            {weakest.map((cat) => {
                              const catScore = (cat as any).readinessScore ?? 0;
                              return (
                                <div key={cat.id} className="flex items-center justify-between text-[10px]">
                                  <span className="text-muted truncate mr-2">{cat.name}</span>
                                  <span className={`font-bold shrink-0 ${catScore >= 60 ? "text-emerald-500" : catScore >= 30 ? "text-[#ec5b13]" : "text-red-500"}`}>
                                    {catScore}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                      <div className="mt-auto pt-5 flex items-center justify-center gap-1 text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-sm">rocket_launch</span>
                        VEŽBAJ
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Simulations */}
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
                        <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">Status</th>
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
                            <td className="px-8 py-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border uppercase tracking-tight ${badge.color}`}>
                                {badge.label}
                              </span>
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
              const sz = 120;
              const sw = sz * 0.08;
              const r = (sz - sw) / 2;
              const circ = 2 * Math.PI * r;
              const filled = (score / 100) * circ;

              return (
                <div className="glass-card relative overflow-hidden rounded-2xl p-6">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                    style={{ backgroundColor: `${color}15` }}
                  />
                  <div className="relative z-10">
                    <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                      Spremnost za ispit
                    </h3>
                    <div className="mb-3 flex justify-center">
                      <div className="relative" style={{ width: sz, height: sz }}>
                        <svg width={sz} height={sz} className="-rotate-90">
                          <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={sw} opacity={0.15} />
                          <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={circ - filled} strokeLinecap="round" className="transition-all duration-700" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-4xl font-black" style={{ color }}>
                          {score}
                        </span>
                      </div>
                    </div>
                    <p className="text-center text-sm font-bold" style={{ color }}>
                      {label}
                    </p>

                    {/* Category breakdown */}
                    {categoryGroups.length > 0 && (
                      <div className="mt-5 pt-1">
                        <button
                          onClick={() => setShowCategoryBreakdown((v) => !v)}
                          className="flex w-full items-center justify-center gap-1 text-[10px] font-semibold text-muted transition-colors hover:text-text-secondary"
                        >
                          <span
                            className="material-symbols-outlined transition-transform"
                            style={{ fontSize: 14, transform: showCategoryBreakdown ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            expand_more
                          </span>
                          {showCategoryBreakdown ? "Sakrij detalje" : "Prikaži detalje"}
                        </button>
                        {showCategoryBreakdown && (<div className="mt-3 space-y-2">
                        {categoryGroups.map((group) => {
                          const gs = group.readinessScore ?? 0;
                          const isExpanded = expandedGroups.has(group.id);
                          return (
                            <div key={group.id} className="rounded-lg border border-[var(--glass-border)] bg-[var(--tint)] overflow-hidden">
                              <button
                                onClick={() => setExpandedGroups((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(group.id)) next.delete(group.id);
                                  else next.add(group.id);
                                  return next;
                                })}
                                className="flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-[var(--tint-strong)]"
                              >
                                <span
                                  className="material-symbols-outlined text-xs text-muted transition-transform"
                                  style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                                >
                                  chevron_right
                                </span>
                                <div className="flex-grow">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-heading">{group.name}</span>
                                    <span className="text-xs font-bold text-[#ec5b13]">{gs}</span>
                                  </div>
                                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-card">
                                    <div
                                      className="h-full rounded-full bg-[#ec5b13] transition-all duration-700"
                                      style={{ width: `${gs}%` }}
                                    />
                                  </div>
                                </div>
                              </button>
                              {isExpanded && (
                                <div className="space-y-2 border-t border-[var(--glass-border)] px-3 py-2 pl-7">
                                  {group.categories.map((cat) => {
                                    const catScore = cat.readinessScore ?? 0;
                                    return (
                                      <div key={cat.id} className="space-y-0.5">
                                        <div className="flex justify-between text-[10px]">
                                          <span className="text-text-secondary truncate mr-2">{cat.name}</span>
                                          <span className="font-semibold text-text-secondary shrink-0">{catScore}</span>
                                        </div>
                                        <div className="h-0.5 w-full overflow-hidden rounded-full bg-card">
                                          <div
                                            className="h-full rounded-full bg-[#ec5b13]/60 transition-all duration-700"
                                            style={{ width: `${catScore}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Countdown Widget */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ec5b13] to-[#ff8c00] p-6 text-white shadow-2xl">
              <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-20">
                <span className="material-symbols-outlined text-[180px]">schedule</span>
              </div>
              <div className="relative z-10">
                <p className="mb-4 text-center text-sm font-bold uppercase tracking-widest opacity-80">
                  Do prijemnog ispita
                </p>
                <div className="flex items-center justify-center text-center mb-4">
                  <div className="space-y-1">
                    <div className="text-5xl font-black">
                      {countdown.days}
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-80">Dana</p>
                  </div>
                </div>
                {data?.facultyExamDates && data.facultyExamDates.length > 0 && (() => {
                  const sorted = [...data.facultyExamDates]
                    .filter((f) => f.examDate)
                    .sort((a, b) => new Date(a.examDate!).getTime() - new Date(b.examDate!).getTime());
                  if (sorted.length === 0) return null;
                  const months = ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec"];
                  return (
                    <div className="border-t border-white/20 pt-4">
                      <div className={`grid gap-3 ${sorted.length === 1 ? "grid-cols-1 max-w-[80px] mx-auto" : sorted.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {sorted.map((fac) => {
                          const d = new Date(fac.examDate!);
                          const dateStr = `${d.getDate()}. ${months[d.getMonth()]}`;
                          const icon = FACULTY_ICONS[fac.id] ?? "school";
                          return (
                            <div key={fac.id} className="flex flex-col items-center text-center">
                              <span className="material-symbols-outlined text-lg opacity-80">{icon}</span>
                              <span className="text-[10px] font-bold mt-0.5">{fac.shortName}</span>
                              <span className="text-[10px] font-bold opacity-70 mt-0.5">{dateStr}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Streak & Quick Stats */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                Trenutni niz
              </h3>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-[var(--glass-border)]">
                    <Flame
                      size={64}
                      className="text-[#ec5b13] drop-shadow-[0_0_10px_rgba(236,91,19,0.5)]"
                      fill="currentColor"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ec5b13] px-4 py-1 text-xs font-black text-white">
                    {streak} DANA
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[var(--tint)] p-3">
                  <span className="text-xs text-text-secondary">Današnji cilj</span>
                  <span className={`font-bold ${progress.solvedToday >= progress.dailyGoal ? "text-emerald-500" : "text-[#ec5b13]"}`}>
                    {progress.solvedToday}
                    <span className="text-muted">/{progress.dailyGoal}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--tint)] p-3">
                  <span className="text-xs text-text-secondary">Ukupno rešeno</span>
                  <span className="font-bold">
                    {(progress.solved ?? 0).toLocaleString("sr")}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--tint)] p-3">
                  <span className="text-xs text-text-secondary">Prosečan skor</span>
                  <span className="font-bold text-[#0ea5e9]">
                    {rank?.avgScore ? `${parseFloat(rank.avgScore).toFixed(0)}%` : "--"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
