"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, ArrowRight, ArrowUpRight, Trophy, CheckCircle2, Timer } from "lucide-react";
import type { DashboardData } from "@/lib/dashboard-data";
import { scoreColor } from "@/lib/score-colors";
import SectionLabel from "@/components/ui/section-label";

/* ─── types ─── */

interface DashboardProps {
  user: {
    displayName: string;
    email: string;
    avatarUrl?: string | null;
    targetFaculties: string[];
    role: string;
  };
  initialData?: DashboardData;
}

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

/* ─── hooks ─── */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ─── building blocks ─── */

function ReadinessGauge({ score }: { score: number }) {
  const mounted = useMounted();
  const display = useCountUp(score);
  const sz = 112;
  const sw = 9;
  const r = (sz - sw) / 2;
  const circ = 2 * Math.PI * r;
  const filled = mounted ? (score / 100) * circ : 0;
  const color = scoreColor(score);
  return (
    <div className="relative shrink-0" style={{ width: sz, height: sz }}>
      <div
        className="absolute inset-3 rounded-full blur-2xl opacity-25"
        style={{ background: color }}
      />
      <svg width={sz} height={sz} className="relative -rotate-90">
        <defs>
          <linearGradient id="readiness-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.45} />
          </linearGradient>
        </defs>
        <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke="var(--tint-strong)" strokeWidth={sw} />
        <circle
          cx={sz / 2} cy={sz / 2} r={r} fill="none"
          stroke="url(#readiness-grad)" strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={circ - filled}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-headline text-4xl font-bold leading-none tracking-tight text-heading">{display}</p>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-muted">od 100</p>
      </div>
    </div>
  );
}

function GoalRing({ solved, goal }: { solved: number; goal: number }) {
  const mounted = useMounted();
  const met = goal > 0 && solved >= goal;
  const pct = goal > 0 ? Math.min(solved / goal, 1) : 0;
  const sz = 64;
  const sw = 6;
  const r = (sz - sw) / 2;
  const circ = 2 * Math.PI * r;
  const filled = mounted ? pct * circ : 0;
  const color = met ? "#10b981" : "#ec5b13";
  return (
    <div className="relative shrink-0" style={{ width: sz, height: sz }}>
      <svg width={sz} height={sz} className="-rotate-90">
        <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke="var(--tint-strong)" strokeWidth={sw} />
        <circle
          cx={sz / 2} cy={sz / 2} r={r} fill="none"
          stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={circ - filled}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-headline text-base font-bold text-heading">
          {solved}<span className="text-xs text-muted">/{goal}</span>
        </p>
      </div>
    </div>
  );
}

/* ─── component ─── */

export default function Dashboard({ user, initialData }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const mounted = useMounted();

  useEffect(() => {
    if (initialData) return;
    fetch("/api/user/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // re-render every 30s so the countdown stays live
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  /* loading skeleton */
  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-7">
        <div className="mb-6 h-12 w-96 max-w-full animate-pulse rounded-2xl bg-[var(--tint)]" />
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 h-52 animate-pulse rounded-3xl bg-[var(--tint)] lg:col-span-5" />
          <div className="col-span-12 h-52 animate-pulse rounded-3xl bg-[var(--tint)] lg:col-span-4" />
          <div className="col-span-12 h-52 animate-pulse rounded-3xl bg-[var(--tint)] lg:col-span-3" />
          <div className="col-span-12 h-48 animate-pulse rounded-3xl bg-[#ec5b13]/10 lg:col-span-6" />
          <div className="col-span-12 h-48 animate-pulse rounded-3xl bg-[#ec5b13]/10 lg:col-span-6" />
          <div className="col-span-12 h-20 animate-pulse rounded-3xl bg-[var(--tint)]" />
        </div>
      </div>
    );
  }

  const progress = data?.progress ?? { total: 0, solved: 0, dailyGoal: 20, solvedToday: 0 };
  const countdown = getCountdown(data?.countdown ?? "2026-06-15");
  const rank = data?.rank;
  const streak = data?.user?.streakCurrent ?? 0;
  const bestStreak = data?.user?.streakBest ?? 0;
  const readiness = data?.readinessScore ?? 0;
  const categoryGroups = data?.categoryGroups ?? [];

  const sorted = [...categoryGroups].sort((a, b) => (a.readinessScore ?? 0) - (b.readinessScore ?? 0));
  const focus = sorted.slice(0, 2);
  const rest = sorted.slice(2);
  const goalMet = progress.dailyGoal > 0 && progress.solvedToday >= progress.dailyGoal;

  const examDates = [...(data?.facultyExamDates ?? [])]
    .filter((f) => f.examDate)
    .sort((a, b) => new Date(a.examDate!).getTime() - new Date(b.examDate!).getTime());
  const MONTHS_SHORT = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];

  return (
    <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-7">
      {/* ── Header ── */}
      <header className="dash-rise mb-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="font-headline text-[28px] font-bold tracking-tight text-heading sm:text-3xl">
            Zdravo, {user.displayName}
            <span className="text-[#ec5b13]">.</span>
          </h1>
          <p className="text-sm text-text-secondary">{getMotivationalMessage()}</p>
        </div>
        {goalMet && (
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[11px] font-bold text-emerald-500">Dnevni cilj ispunjen</span>
          </div>
        )}
      </header>

      {/* ── Bento: readiness / countdown / today ── */}
      <div className="grid grid-cols-12 gap-4">
        {/* Readiness hero */}
        <section
          className="dash-rise glass-card relative col-span-12 overflow-hidden rounded-3xl p-5 lg:col-span-5"
          style={{ animationDelay: "60ms" }}
        >
          <div className="noise-overlay" />
          <SectionLabel index="01">Spremnost za ispit</SectionLabel>
          <div className="mt-3 flex items-center gap-5">
            <ReadinessGauge score={readiness} />
            <div className="min-w-0 flex-1">
              <div className="space-y-1.5">
                {sorted.map((g) => {
                  const s = g.readinessScore ?? 0;
                  return (
                    <Link key={g.id} href={`/zadaci?group=${g.id}`} className="group flex items-center gap-2.5">
                      <span className="w-32 truncate text-[11px] font-bold text-text-secondary transition-colors group-hover:text-heading sm:w-40">
                        {g.name}
                      </span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--tint-strong)]">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: mounted ? `${Math.max(s, 2)}%` : "0%",
                            background: scoreColor(s),
                            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </span>
                      <span className="w-7 text-right font-headline text-[11px] font-bold tabular-nums text-muted">
                        {s}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section
          className="dash-rise glass-card relative col-span-12 flex flex-col overflow-hidden rounded-3xl p-5 lg:col-span-4"
          style={{ animationDelay: "120ms" }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ec5b13" }}
          />
          <SectionLabel index="02">Do prijemnog</SectionLabel>
          <div className="flex flex-1 items-center py-2">
            <div className="flex items-end gap-3.5 sm:gap-4">
              {[
                { value: countdown.days, label: countdown.days === 1 ? "dan" : "dana" },
                { value: countdown.hours, label: countdown.hours === 1 ? "sat" : "sati" },
                { value: countdown.minutes, label: "min" },
              ].map((block, i) => (
                <div key={block.label} className="flex items-end gap-3.5 sm:gap-4">
                  {i > 0 && (
                    <span className="pb-5 font-headline text-2xl font-bold text-muted/50">:</span>
                  )}
                  <div>
                    <p
                      suppressHydrationWarning
                      className="font-headline text-4xl font-bold leading-none tracking-tight text-heading sm:text-[44px]"
                    >
                      {String(block.value).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                      {block.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {examDates.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {examDates.map((fac) => {
                const d = new Date(fac.examDate!);
                return (
                  <div
                    key={fac.id}
                    className="flex items-baseline gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-3 py-1"
                  >
                    <span className="font-headline text-[11px] font-bold text-heading">{fac.shortName}</span>
                    <span className="text-[10px] text-text-secondary">
                      {d.getDate()}. {MONTHS_SHORT[d.getMonth()]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Today */}
        <section
          className="dash-rise glass-card relative col-span-12 flex flex-col overflow-hidden rounded-3xl p-5 lg:col-span-3"
          style={{ animationDelay: "180ms" }}
        >
          <SectionLabel index="03">Danas</SectionLabel>
          <div className="mt-3 flex items-center gap-3.5">
            <GoalRing solved={progress.solvedToday} goal={progress.dailyGoal} />
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-heading">Dnevni cilj</p>
              <p className="mt-0.5 text-[11px] text-text-secondary">
                {goalMet ? "Ispunjen — svaka čast!" : "rešenih zadataka"}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ec5b13]/10">
                <Flame size={16} className="text-[#ec5b13]" fill="currentColor" />
              </span>
              <div className="min-w-0">
                <p className="font-headline text-[13px] font-bold leading-tight text-heading">
                  {streak} {streak === 1 ? "dan" : "dana"} zaredom
                </p>
                <p className="text-[10px] text-muted">najbolji niz: {bestStreak}</p>
              </div>
            </div>
            {rank?.position != null && (
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <Trophy size={15} className="text-amber-500" />
                </span>
                <div className="min-w-0">
                  <p className="font-headline text-[13px] font-bold leading-tight text-heading">
                    #{rank.position} na rang listi
                  </p>
                  <p className="text-[10px] text-muted">od {rank.totalParticipants} učenika</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Focus cards ── */}
      {focus.length > 0 && (
        <div className="mt-7">
          <div className="dash-rise mb-4" style={{ animationDelay: "240ms" }}>
            <SectionLabel index="04">Tvoj fokus</SectionLabel>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {focus.map((group, i) => {
              const gs = group.readinessScore ?? 0;
              const gImage = CATEGORY_IMAGES[group.id];
              const weakSubs = [...(group.categories || [])]
                .sort((a, b) => (a.readinessScore ?? 0) - (b.readinessScore ?? 0))
                .slice(0, 2);
              return (
                <Link
                  key={group.id}
                  href={`/zadaci?group=${group.id}`}
                  className="dash-rise group relative block rounded-3xl p-px transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${300 + i * 80}ms`,
                    background:
                      "linear-gradient(135deg, rgba(236,91,19,0.5), var(--glass-border) 45%, transparent)",
                  }}
                >
                  <div className="relative flex min-h-[188px] flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-[var(--color-card)] p-6 transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-20px_rgba(236,91,19,0.45)]">
                    {gImage && (
                      <>
                        <img
                          src={gImage.dark}
                          alt=""
                          aria-hidden
                          className="dark-only pointer-events-none absolute inset-y-0 right-0 h-full w-3/5 object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                          style={{
                            maskImage: "radial-gradient(120% 150% at 80% 40%, black 30%, transparent 74%)",
                            WebkitMaskImage: "radial-gradient(120% 150% at 80% 40%, black 30%, transparent 74%)",
                          }}
                        />
                        <img
                          src={gImage.light}
                          alt=""
                          aria-hidden
                          className="light-only pointer-events-none absolute inset-y-0 right-0 h-full w-3/5 object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60"
                          style={{
                            maskImage: "radial-gradient(120% 150% at 80% 40%, black 30%, transparent 74%)",
                            WebkitMaskImage: "radial-gradient(120% 150% at 80% 40%, black 30%, transparent 74%)",
                          }}
                        />
                      </>
                    )}
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="inline-flex items-center rounded-full border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#ec5b13]">
                          Fokus
                        </span>
                        <h3 className="mt-2 max-w-[90%] font-headline text-xl font-bold leading-tight text-heading sm:text-2xl">
                          {group.name}
                        </h3>
                      </div>
                      <p className="shrink-0 font-headline text-4xl font-bold leading-none tracking-tight" style={{ color: scoreColor(gs) }}>
                        {gs}
                        <span className="text-base text-muted">/100</span>
                      </p>
                    </div>
                    <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <span className="btn-shine inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white transition-all group-hover:brightness-110">
                        Vežbaj odmah
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      {weakSubs.length > 0 && (
                        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-muted">Najslabije:</span>
                          {weakSubs.map((sub) => (
                            <span
                              key={sub.id}
                              className="max-w-36 truncate rounded-full bg-[var(--tint)] px-2 py-0.5 text-[10px] font-medium text-text-secondary"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Remaining subjects ── */}
      {rest.length > 0 && (
        <div className="mt-7">
          <div className="dash-rise mb-4" style={{ animationDelay: "420ms" }}>
            <SectionLabel index="05">Sve oblasti</SectionLabel>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((group, i) => {
              const s = group.readinessScore ?? 0;
              const image = CATEGORY_IMAGES[group.id];
              return (
                <Link
                  key={group.id}
                  href={`/zadaci?group=${group.id}`}
                  className="dash-rise glass-card group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ec5b13]/40 hover:shadow-[0_16px_40px_-18px_rgba(236,91,19,0.4)]"
                  style={{ animationDelay: `${480 + i * 70}ms` }}
                >
                  {image && (
                    <>
                      <img
                        src={image.dark}
                        alt=""
                        aria-hidden
                        className="dark-only pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-45"
                        style={{
                          maskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
                          WebkitMaskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
                        }}
                      />
                      <img
                        src={image.light}
                        alt=""
                        aria-hidden
                        className="light-only pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                        style={{
                          maskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
                          WebkitMaskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
                        }}
                      />
                    </>
                  )}
                  <div className="relative flex items-start justify-between gap-3">
                    <h4 className="font-headline text-base font-bold leading-snug text-heading">{group.name}</h4>
                    <p className="font-headline text-[26px] font-bold leading-none tracking-tight" style={{ color: scoreColor(s) }}>
                      {s}
                      <span className="text-xs text-muted">/100</span>
                    </p>
                  </div>
                  <div className="relative mt-4 flex items-center gap-3">
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--tint-strong)]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: mounted ? `${Math.max(s, 2)}%` : "0%",
                          background: scoreColor(s),
                          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted transition-colors group-hover:text-[#ec5b13]">
                      Vežbaj
                      <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Simulation banner ── */}
      <div className="dash-rise mt-7" style={{ animationDelay: "640ms" }}>
        <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-5 sm:px-7">
          <div className="noise-overlay" />
          <div
            className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #ec5b13, transparent 70%)" }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ec5b13]/25 bg-[#ec5b13]/10 sm:flex">
                <Timer size={22} className="text-[#ec5b13]" />
              </span>
              <div>
                <h3 className="font-headline text-lg font-bold text-heading">Simulacija prijemnog ispita</h3>
                <p className="text-xs text-text-secondary">
                  {data?.recentExams && data.recentExams.length > 0
                    ? `Poslednji test: ${parseFloat(data.recentExams[0].scorePercent || "0").toFixed(0)}% — ${new Date(data.recentExams[0].startedAt).toLocaleDateString("sr")}`
                    : "Realan test u realnom vremenu — kao na pravom ispitu."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {data?.recentExams && data.recentExams.length > 0 && (
                <Link
                  href="/simulacija/istorija"
                  className="text-[11px] font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-heading"
                >
                  Istorija
                </Link>
              )}
              <Link
                href="/simulacija"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                Pokreni test
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
