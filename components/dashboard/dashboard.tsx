"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  Flame,
  Sparkles,
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

interface TopicData {
  topic_id: string;
  name: string;
  icon: string | null;
  total: number;
  solved: number;
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
  topics: TopicData[];
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
  season: { name: string; examPeriodStart: string } | null;
}

/* ─── topic styling ─── */

const TOPIC_STYLES: Record<
  string,
  { color: string; hoverBorder: string; icon: string; bgClass: string }
> = {
  algebra: {
    color: "text-[#ec5b13]",
    hoverBorder: "hover:border-[#ec5b13]/30",
    icon: "square_foot",
    bgClass: "bg-orange-500/10",
  },
  geometrija: {
    color: "text-[#0ea5e9]",
    hoverBorder: "hover:border-[#0ea5e9]/30",
    icon: "category",
    bgClass: "bg-sky-500/10",
  },
  verovatnoca: {
    color: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/30",
    icon: "casino",
    bgClass: "bg-emerald-500/10",
  },
  logika: {
    color: "text-purple-500",
    hoverBorder: "hover:border-purple-500/30",
    icon: "psychology",
    bgClass: "bg-purple-500/10",
  },
  trigonometrija: {
    color: "text-rose-500",
    hoverBorder: "hover:border-rose-500/30",
    icon: "change_history",
    bgClass: "bg-rose-500/10",
  },
  kombinatorika: {
    color: "text-amber-500",
    hoverBorder: "hover:border-amber-500/30",
    icon: "grid_view",
    bgClass: "bg-amber-500/10",
  },
  analiza: {
    color: "text-cyan-500",
    hoverBorder: "hover:border-cyan-500/30",
    icon: "trending_up",
    bgClass: "bg-cyan-500/10",
  },
};

const DEFAULT_TOPIC_COLORS = [
  {
    color: "text-[#ec5b13]",
    hoverBorder: "hover:border-[#ec5b13]/30",
    icon: "functions",
    bgClass: "bg-orange-500/10",
  },
  {
    color: "text-[#0ea5e9]",
    hoverBorder: "hover:border-[#0ea5e9]/30",
    icon: "calculate",
    bgClass: "bg-sky-500/10",
  },
  {
    color: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/30",
    icon: "data_object",
    bgClass: "bg-emerald-500/10",
  },
  {
    color: "text-purple-500",
    hoverBorder: "hover:border-purple-500/30",
    icon: "hub",
    bgClass: "bg-purple-500/10",
  },
];

function getTopicStyle(name: string, index: number) {
  const key = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[čćšžđ]/g, (m) => {
      const map: Record<string, string> = { č: "c", ć: "c", š: "s", ž: "z", đ: "d" };
      return map[m] || m;
    });

  for (const [k, v] of Object.entries(TOPIC_STYLES)) {
    if (key.includes(k)) return v;
  }
  return DEFAULT_TOPIC_COLORS[index % DEFAULT_TOPIC_COLORS.length];
}

function getTopicBarColor(name: string, index: number) {
  const style = getTopicStyle(name, index);
  // Extract the color value from the class
  if (style.color.includes("ec5b13")) return "#ec5b13";
  if (style.color.includes("0ea5e9")) return "#0ea5e9";
  if (style.color.includes("emerald")) return "#10b981";
  if (style.color.includes("purple")) return "#a855f7";
  if (style.color.includes("rose")) return "#f43f5e";
  if (style.color.includes("amber")) return "#f59e0b";
  if (style.color.includes("cyan")) return "#06b6d4";
  return "#ec5b13";
}

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
  const dailyPercent = Math.min(
    100,
    Math.round((progress.solvedToday / Math.max(progress.dailyGoal, 1)) * 100)
  );
  const countdown = getCountdown(data?.countdown ?? "2026-06-15");
  const lastExam = data?.lastExam;
  const lastExamScore = lastExam ? parseFloat(lastExam.scorePercent || "0").toFixed(0) : null;
  const rank = data?.rank;
  const streak = data?.user?.streakCurrent ?? 0;
  const topics = data?.topics ?? [];
  const displayTopics = topics.slice(0, 4);

  // Find weakest topic for AI recommendation
  const weakest = [...topics]
    .filter((t) => Number(t.total) > 0)
    .sort(
      (a, b) =>
        Number(a.solved) / Math.max(Number(a.total), 1) -
        Number(b.solved) / Math.max(Number(b.total), 1)
    )[0];
  const weakestPct = weakest
    ? Math.round((Number(weakest.solved) / Math.max(Number(weakest.total), 1)) * 100)
    : 0;

  return (
    <div className="relative p-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-heading mb-1">
              Zdravo, {user.displayName}!
            </h1>
            <p className="text-sm text-text-secondary">{getMotivationalMessage()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <input
                className="rounded-full border border-[var(--glass-border)] bg-card py-2.5 pl-12 pr-6 text-sm w-64 placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-[#ec5b13] focus:border-[#ec5b13] transition-all"
                placeholder="Pretrazi gradivo..."
                type="text"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] text-text hover:bg-[var(--tint-strong)]">
              <Bell size={20} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] text-text hover:bg-[var(--tint-strong)]">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* ─── LEFT COLUMN (8 cols) ─── */}
          <div className="col-span-12 space-y-6 lg:col-span-8">
            {/* Daily Goal + Last Test */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Daily Progress Card */}
              <div className="glass-card relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ec5b13]/10 blur-3xl" />
                <div className="relative z-10">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Dnevni cilj
                  </h3>
                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-3xl font-black text-heading">
                      {progress.solvedToday}
                      <span className="text-lg text-muted">/{progress.dailyGoal}</span>
                    </span>
                    <span className="text-sm font-bold text-[#ec5b13]">
                      {dailyPercent}% Reseno
                    </span>
                  </div>
                  <p className="mb-6 text-sm text-text-secondary">Zadataka do dnevne kvote</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                    <div
                      className="h-full rounded-full bg-[#ec5b13] shadow-[0_0_15px_rgba(236,91,19,0.2)] transition-all duration-700"
                      style={{ width: `${dailyPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Last Test Score Card */}
              <div className="glass-card relative overflow-hidden rounded-2xl border-l-4 border-[#0ea5e9]/50 p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#0ea5e9]/10 blur-3xl" />
                <div className="relative z-10">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Poslednji test
                  </h3>
                  {lastExam ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0ea5e9]/20">
                          <span className="material-symbols-outlined text-3xl font-bold text-[#0ea5e9]">
                            verified
                          </span>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-heading">{lastExamScore}%</div>
                          <div className="text-sm font-bold tracking-wide text-[#0ea5e9]">
                            {Number(lastExamScore) >= 80
                              ? "ODLICNO!"
                              : Number(lastExamScore) >= 60
                                ? "DOBRO!"
                                : "MOZE BOLJE"}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs text-text-secondary">
                        Simulacija: {lastExam.facultyName}{" "}
                        {lastExam.startedAt
                          ? new Date(lastExam.startedAt).toLocaleDateString("sr-RS")
                          : ""}
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <span className="material-symbols-outlined mb-2 text-4xl text-slate-600">
                        quiz
                      </span>
                      <p className="text-sm text-text-secondary">Nemas zavrsenih testova</p>
                      <Link
                        href="/simulacija"
                        className="mt-2 text-xs font-bold text-[#0ea5e9] hover:underline"
                      >
                        POKRENI PRVI TEST
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Core Categories */}
            <div>
              <div className="mb-4 flex items-end justify-between">
                <h3 className="text-xl font-bold text-heading">Glavne oblasti</h3>
                <Link
                  href="/zadaci"
                  className="text-xs font-bold uppercase text-[#ec5b13] hover:underline"
                >
                  Vidi sve
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {displayTopics.map((topic, i) => {
                  const pct =
                    Number(topic.total) > 0
                      ? Math.round(
                          (Number(topic.solved) / Math.max(Number(topic.total), 1)) * 100
                        )
                      : 0;
                  const style = getTopicStyle(topic.name, i);
                  const barColor = getTopicBarColor(topic.name, i);

                  return (
                    <div
                      key={topic.topic_id}
                      className={`glass-card group rounded-2xl p-5 transition-all ${style.hoverBorder}`}
                    >
                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${style.bgClass}`}
                      >
                        <span className={`material-symbols-outlined ${style.color}`}>
                          {style.icon}
                        </span>
                      </div>
                      <h4 className="mb-1 text-sm font-bold">{topic.name}</h4>
                      <p className="mb-3 text-[10px] text-muted">{pct}% Zavrseno</p>
                      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: barColor }}
                        />
                      </div>
                      <Link
                        href="/zadaci"
                        className="block w-full rounded-lg bg-[var(--tint)] py-2 text-center text-xs font-bold transition-all hover:text-white"
                        style={
                          {
                            "--hover-bg": barColor,
                          } as React.CSSProperties
                        }
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = barColor;
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = "";
                        }}
                      >
                        NASTAVI
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="glass-card rounded-2xl border-l-4 border-[#ec5b13] p-6">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles size={22} className="text-[#ec5b13]" />
                <h3 className="text-lg font-bold">Preporuka za danas</h3>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-[#ec5b13]/40">01</div>
                  <div>
                    <h4 className="font-bold text-heading">
                      Uvezba{weakest ? `: ${weakest.name}` : "j zadatke"}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {weakest
                        ? `Tvoj procenat tacnosti ovde je ${weakestPct}%. Potrebno dodatno vezbanje.`
                        : "Nastavi da resavas zadatke i prati svoj napredak."}
                    </p>
                  </div>
                </div>
                <Link
                  href="/zadaci"
                  className="flex-shrink-0 rounded-xl bg-[#ec5b13] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(236,91,19,0.2)] transition-transform hover:scale-105"
                >
                  KRENI
                </Link>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (4 cols) ─── */}
          <div className="col-span-12 space-y-6 lg:col-span-4">
            {/* Countdown Widget */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ec5b13] to-[#ff8c00] p-6 text-white shadow-2xl">
              <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-20">
                <span className="material-symbols-outlined text-[180px]">schedule</span>
              </div>
              <div className="relative z-10">
                <p className="mb-6 text-center text-sm font-bold uppercase tracking-widest opacity-80">
                  Do prijemnog ispita
                </p>
                <div className="flex items-center justify-between text-center">
                  <div className="space-y-1">
                    <div className="text-4xl font-black">
                      {String(countdown.days).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-80">Dana</p>
                  </div>
                  <div className="text-2xl font-light opacity-50">:</div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black">
                      {String(countdown.hours).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-80">Sati</p>
                  </div>
                  <div className="text-2xl font-light opacity-50">:</div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black">
                      {String(countdown.minutes).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-80">Minuta</p>
                  </div>
                </div>
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
                  <span className="text-xs text-text-secondary">Ukupno reseno</span>
                  <span className="font-bold">
                    {(progress.solved ?? 0).toLocaleString("sr")}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--tint)] p-3">
                  <span className="text-xs text-text-secondary">Prosecan skor</span>
                  <span className="font-bold text-[#0ea5e9]">
                    {rank?.avgScore ? `${parseFloat(rank.avgScore).toFixed(0)}%` : "--"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--tint)] p-3">
                  <span className="text-xs text-text-secondary">Rang lista</span>
                  <span className="font-bold">
                    {rank?.position
                      ? `#${rank.position} / ${rank.totalParticipants >= 1000 ? `${(rank.totalParticipants / 1000).toFixed(1)}k` : rank.totalParticipants}`
                      : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Faculty Exam Dates */}
            {data?.facultyExamDates && data.facultyExamDates.length > 0 && (
              <div className="glass-card rounded-2xl border-t border-[#0ea5e9]/20 p-6">
                <h3 className="mb-4 text-sm font-bold text-heading">Datumi ispita</h3>
                <div className="space-y-3">
                  {data.facultyExamDates.map((fac) => (
                    <div
                      key={fac.id}
                      className="flex items-start gap-4 rounded-xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 p-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#0ea5e9]/20">
                        <span className="material-symbols-outlined text-[#0ea5e9]">
                          school
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{fac.shortName}</p>
                        <p className="text-xs text-text-secondary">
                          {fac.examDate
                            ? new Date(fac.examDate).toLocaleDateString("sr-RS", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Datum jos nije poznat"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
