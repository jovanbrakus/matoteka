"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  Trophy,
  Bot,
  Bookmark,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Clock,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { sr } from "date-fns/locale";
import { FACULTIES } from "@/components/ui/faculty-picker-dialog";

/* ─── types ─── */

interface DashboardProps {
  user: {
    displayName: string;
    email: string;
    targetFaculty: string | null;
    role: string;
  };
}

interface Progress {
  total: number;
  solved: number;
  attempted: number;
  unseen: number;
}

interface FacultyProgress {
  faculty_id: string;
  short_name: string;
  total: number;
  solved: number;
}

interface TopicProgress {
  topic_id: string;
  name: string;
  total: number;
  solved: number;
}

interface RecentProblem {
  slug: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  status: string;
  isCorrect: boolean | null;
  updatedAt: string;
}

interface ExamEntry {
  id: string;
  facultyId: string;
  facultyName: string;
  startedAt: string;
  scorePercent: string;
  numCorrect: number;
  numWrong: number;
  numBlank: number;
  timeSpent: number;
  status: string;
}

interface MyRank {
  rank: number | null;
  totalScore: string;
  problemsSolved: number;
  examsCompleted: number;
  avgExamPercent: string;
  bestExamPercent: string;
  streakBest: number;
}

interface BookmarkEntry {
  problemId: string;
  slug: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  createdAt: string;
}

type ActivityEntry =
  | { type: "problem"; slug: string; title: string; isCorrect: boolean | null; date: string }
  | { type: "exam"; id: string; facultyName: string; scorePercent: string; date: string };

/* ─── helpers ─── */

function relativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: sr });
  } catch {
    return "";
  }
}

function buildActivityFeed(problems: RecentProblem[], exams: ExamEntry[]): ActivityEntry[] {
  const items: ActivityEntry[] = [
    ...problems.map((p) => ({
      type: "problem" as const,
      slug: p.slug,
      title: p.title,
      isCorrect: p.isCorrect,
      date: p.updatedAt,
    })),
    ...exams.slice(0, 5).map((e) => ({
      type: "exam" as const,
      id: e.id,
      facultyName: e.facultyName,
      scorePercent: e.scorePercent,
      date: e.startedAt,
    })),
  ];
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}

/* ─── component ─── */

export default function Dashboard({ user }: DashboardProps) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [byFaculty, setByFaculty] = useState<FacultyProgress[]>([]);
  const [byTopic, setByTopic] = useState<TopicProgress[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentProblem[]>([]);
  const [examHistory, setExamHistory] = useState<ExamEntry[]>([]);
  const [myRank, setMyRank] = useState<MyRank | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/progress").then((r) => r.json()),
      fetch("/api/progress/by-faculty").then((r) => r.json()),
      fetch("/api/progress/by-topic").then((r) => r.json()),
      fetch("/api/progress/history?limit=5").then((r) => r.json()),
      fetch("/api/exams/history").then((r) => r.json()),
      fetch("/api/leaderboard/me").then((r) => r.json()),
      fetch("/api/bookmarks").then((r) => r.json()),
    ]).then(([prog, fac, top, hist, exams, rank, bm]) => {
      if (prog.status === "fulfilled") setProgress(prog.value);
      if (fac.status === "fulfilled") setByFaculty(Array.isArray(fac.value) ? fac.value : []);
      if (top.status === "fulfilled") setByTopic(Array.isArray(top.value) ? top.value : []);
      if (hist.status === "fulfilled") setRecentActivity(Array.isArray(hist.value) ? hist.value : []);
      if (exams.status === "fulfilled") setExamHistory(Array.isArray(exams.value) ? exams.value : []);
      if (rank.status === "fulfilled" && rank.value && !rank.value.error) setMyRank(rank.value);
      if (bm.status === "fulfilled") setBookmarks(Array.isArray(bm.value) ? bm.value : []);
      setLoading(false);
    });
  }, []);

  /* derived */
  const completionPercent = progress
    ? Math.round((progress.solved / Math.max(progress.total, 1)) * 100)
    : 0;
  const avgExamScore =
    examHistory.length > 0
      ? Math.round(
          examHistory.reduce((s, e) => s + parseFloat(e.scorePercent || "0"), 0) /
            examHistory.length,
        )
      : 0;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Dobro jutro" : hour < 18 ? "Dobar dan" : "Dobro veče";

  const RING_R = 52;
  const RING_C = 2 * Math.PI * RING_R;

  /* ─── loading skeleton ─── */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 h-10 w-72 animate-pulse rounded-lg bg-[#1e293b]" />
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-[#1e293b]" />
          ))}
        </div>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-[#1e293b]" />
          ))}
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="h-72 animate-pulse rounded-2xl bg-[#1e293b] lg:col-span-3" />
          <div className="h-72 animate-pulse rounded-2xl bg-[#1e293b] lg:col-span-2" />
        </div>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-[#1e293b]" />
          ))}
        </div>
      </div>
    );
  }

  const activityFeed = buildActivityFeed(recentActivity, examHistory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* ─── A. HEADER ─── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e2e8f0] md:text-3xl">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
              {user.displayName}
            </span>
          </h1>
          {user.targetFaculty && user.targetFaculty !== "other" ? (
            <p className="mt-1 text-lg font-medium text-[#60a5fa]">
              <Target size={16} className="mr-1.5 inline" />
              {FACULTIES.find((f) => f.id === user.targetFaculty)?.name ||
                user.targetFaculty.toUpperCase()}
            </p>
          ) : (
            <p className="mt-1 text-sm text-[#94a3b8]">
              Nastavi sa vežbanjem za prijemni
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-4 py-2">
          <Sparkles size={16} className="text-[#a78bfa]" />
          <span className="text-sm font-semibold text-[#a78bfa]">Sezona 2026</span>
        </div>
      </div>

      {/* ─── B. STAT CARDS ─── */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Solved */}
        <div className="relative overflow-hidden rounded-2xl border border-[#334155] bg-[#1e293b] p-5">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#60a5fa]/5" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2 text-[#94a3b8]">
              <CheckCircle size={16} className="text-[#60a5fa]" />
              <span className="text-xs font-medium uppercase tracking-wider">Rešeno</span>
            </div>
            <div className="text-3xl font-bold text-[#e2e8f0]">{progress?.solved ?? 0}</div>
            <div className="mt-1 text-xs text-[#64748b]">od {progress?.total ?? 0} zadataka</div>
          </div>
        </div>

        {/* Exams */}
        <div className="relative overflow-hidden rounded-2xl border border-[#334155] bg-[#1e293b] p-5">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#a78bfa]/5" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2 text-[#94a3b8]">
              <ClipboardList size={16} className="text-[#a78bfa]" />
              <span className="text-xs font-medium uppercase tracking-wider">Ispiti</span>
            </div>
            <div className="text-3xl font-bold text-[#e2e8f0]">{examHistory.length}</div>
            <div className="mt-1 text-xs text-[#64748b]">Prosek: {avgExamScore}%</div>
          </div>
        </div>

        {/* Rank */}
        <div className="relative overflow-hidden rounded-2xl border border-[#334155] bg-[#1e293b] p-5">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#fbbf24]/5" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2 text-[#94a3b8]">
              <Trophy size={16} className="text-[#fbbf24]" />
              <span className="text-xs font-medium uppercase tracking-wider">Rang</span>
            </div>
            <div className="text-3xl font-bold text-[#e2e8f0]">
              {myRank?.rank ? `#${myRank.rank}` : "—"}
            </div>
            <div className="mt-1 text-xs text-[#64748b]">
              {myRank ? `${parseFloat(myRank.totalScore || "0").toLocaleString("sr")} bodova` : "Nema podataka"}
            </div>
          </div>
        </div>

        {/* Best score */}
        <div className="relative overflow-hidden rounded-2xl border border-[#334155] bg-[#1e293b] p-5">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#4ade80]/5" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2 text-[#94a3b8]">
              <TrendingUp size={16} className="text-[#4ade80]" />
              <span className="text-xs font-medium uppercase tracking-wider">Najbolji</span>
            </div>
            <div className="text-3xl font-bold text-[#e2e8f0]">
              {myRank ? `${parseFloat(myRank.bestExamPercent || "0").toFixed(0)}%` : "—"}
            </div>
            <div className="mt-1 text-xs text-[#64748b]">Najbolji rezultat na ispitu</div>
          </div>
        </div>
      </div>

      {/* ─── C. QUICK ACTIONS ─── */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { href: "/ispit", icon: ClipboardList, label: "Pokreni ispit", color: "#60a5fa" },
          { href: "/zadaci", icon: BookOpen, label: "Vežbaj zadatke", color: "#a78bfa" },
          { href: "/ai", icon: Bot, label: "AI Tutor", color: "#4ade80" },
          { href: "/sacuvano", icon: Bookmark, label: "Sačuvano", color: "#fbbf24" },
        ].map(({ href, icon: Icon, label, color }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 rounded-xl border border-[#334155] bg-[#1e293b] p-4 transition hover:bg-[#1e293b]/80"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <span className="text-sm font-medium text-[#e2e8f0]">{label}</span>
            <ArrowRight
              size={14}
              className="ml-auto transition group-hover:translate-x-1"
              style={{ color: `${color}80` }}
            />
          </Link>
        ))}
      </div>

      {/* ─── D. PROGRESS + ACTIVITY ─── */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* D1: Season Progress */}
        <div className="rounded-2xl border border-[#334155] bg-[#1e293b] p-6 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e2e8f0]">
              <Target size={18} className="mr-2 inline text-[#60a5fa]" />
              Napredak u sezoni 2026
            </h2>
            <Link href="/profil" className="text-xs text-[#60a5fa] hover:underline">
              Detaljnije <ChevronRight size={12} className="inline" />
            </Link>
          </div>

          {/* Ring + mini stats */}
          <div className="mb-6 flex items-center gap-8">
            <div className="relative h-28 w-28 flex-shrink-0">
              <svg className="-rotate-90" viewBox="0 0 120 120" width="112" height="112">
                <circle cx="60" cy="60" r={RING_R} fill="none" stroke="#334155" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={RING_R}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C * (1 - completionPercent / 100)}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#e2e8f0]">{completionPercent}%</span>
                <span className="text-[10px] text-[#94a3b8]">završeno</span>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#4ade80]">{progress?.solved ?? 0}</div>
                <div className="text-[10px] text-[#94a3b8]">Rešeno</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#fbbf24]">{progress?.attempted ?? 0}</div>
                <div className="text-[10px] text-[#94a3b8]">Pokušano</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#94a3b8]">{progress?.unseen ?? 0}</div>
                <div className="text-[10px] text-[#94a3b8]">Preostalo</div>
              </div>
            </div>
          </div>

          {/* Faculty progress bars */}
          <div className="space-y-3">
            {byFaculty.map((f) => {
              const pct = f.total > 0 ? Math.round((f.solved / f.total) * 100) : 0;
              const isTarget = f.faculty_id === user.targetFaculty;
              return (
                <div key={f.faculty_id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className={`font-medium ${isTarget ? "text-[#60a5fa]" : "text-[#e2e8f0]"}`}>
                      {isTarget && <Target size={12} className="mr-1 inline" />}
                      {f.short_name}
                    </span>
                    <span className="text-xs text-[#94a3b8]">
                      {f.solved}/{f.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#0f172a]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isTarget
                          ? "bg-gradient-to-r from-[#60a5fa] to-[#a78bfa]"
                          : "bg-[#60a5fa]/60"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* D2: Recent Activity */}
        <div className="rounded-2xl border border-[#334155] bg-[#1e293b] p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e2e8f0]">
              <Clock size={18} className="mr-2 inline text-[#a78bfa]" />
              Poslednje aktivnosti
            </h2>
          </div>

          {activityFeed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BookOpen size={32} className="mb-3 text-[#334155]" />
              <p className="text-sm text-[#94a3b8]">Još nemaš aktivnosti.</p>
              <Link href="/zadaci" className="mt-2 text-sm text-[#60a5fa] hover:underline">
                Počni sa vežbanjem
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {activityFeed.slice(0, 6).map((item, i) =>
                item.type === "problem" ? (
                  <Link
                    key={`p-${i}`}
                    href={`/zadaci/${item.slug}`}
                    className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-[#0f172a]/50"
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                        item.isCorrect === true
                          ? "bg-[#4ade80]/10"
                          : item.isCorrect === false
                            ? "bg-[#f87171]/10"
                            : "bg-[#fbbf24]/10"
                      }`}
                    >
                      {item.isCorrect === true ? (
                        <CheckCircle size={14} className="text-[#4ade80]" />
                      ) : item.isCorrect === false ? (
                        <XCircle size={14} className="text-[#f87171]" />
                      ) : (
                        <Minus size={14} className="text-[#fbbf24]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-[#e2e8f0]">{item.title}</p>
                      <p className="text-xs text-[#64748b]">{relativeTime(item.date)}</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={`e-${i}`}
                    href={`/ispit/${item.id}/rezultati`}
                    className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-[#0f172a]/50"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#a78bfa]/10">
                      <ClipboardList size={14} className="text-[#a78bfa]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-[#e2e8f0]">
                        Ispit — {item.facultyName}
                      </p>
                      <p className="text-xs text-[#64748b]">{relativeTime(item.date)}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#60a5fa]">
                      {parseFloat(item.scorePercent || "0").toFixed(0)}%
                    </span>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── E. TOPIC GRID ─── */}
      {byTopic.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e2e8f0]">
              <GraduationCap size={18} className="mr-2 inline text-[#4ade80]" />
              Teme za vežbanje
            </h2>
            <Link href="/zadaci" className="text-xs text-[#60a5fa] hover:underline">
              Sve teme <ChevronRight size={12} className="inline" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {byTopic.slice(0, 8).map((topic) => {
              const pct =
                topic.total > 0
                  ? Math.round((Number(topic.solved) / Number(topic.total)) * 100)
                  : 0;
              return (
                <Link
                  key={topic.topic_id}
                  href={`/zadaci`}
                  className="group rounded-xl border border-[#334155] bg-[#1e293b] p-4 transition hover:border-[#4ade80]/50"
                >
                  <h3 className="mb-2 text-sm font-medium text-[#e2e8f0] group-hover:text-[#4ade80]">
                    {topic.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94a3b8]">
                      {topic.solved}/{topic.total}
                    </span>
                    <span className="text-xs font-semibold text-[#4ade80]">{pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0f172a]">
                    <div
                      className="h-full rounded-full bg-[#4ade80]/70 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── F. BOTTOM ROW ─── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* F1: Bookmarks Preview */}
        <div className="rounded-2xl border border-[#334155] bg-[#1e293b] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e2e8f0]">
              <Bookmark size={18} className="mr-2 inline text-[#fbbf24]" />
              Sačuvani zadaci
            </h2>
            {bookmarks.length > 0 && (
              <Link href="/sacuvano" className="text-xs text-[#60a5fa] hover:underline">
                Svi ({bookmarks.length}) <ChevronRight size={12} className="inline" />
              </Link>
            )}
          </div>

          {bookmarks.length === 0 ? (
            <p className="py-4 text-center text-sm text-[#94a3b8]">Nemaš sačuvanih zadataka.</p>
          ) : (
            <div className="space-y-2">
              {bookmarks.slice(0, 3).map((b) => (
                <Link
                  key={b.problemId}
                  href={`/zadaci/${b.slug}`}
                  className="flex items-center justify-between rounded-lg p-2 transition hover:bg-[#0f172a]/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[#e2e8f0]">{b.title}</p>
                    <p className="text-xs text-[#64748b]">
                      {b.facultyId?.toUpperCase()} {b.year} · #{b.problemNumber}
                    </p>
                  </div>
                  <Bookmark size={14} className="flex-shrink-0 text-[#fbbf24]" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* F2: Exam Quick Start */}
        <div className="rounded-2xl border border-[#334155] bg-gradient-to-br from-[#1e293b] to-[#1e293b]/80 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#e2e8f0]">
              <ClipboardList size={18} className="mr-2 inline text-[#60a5fa]" />
              Probni ispit
            </h2>
            <p className="mt-1 text-sm text-[#94a3b8]">
              Testiraj svoje znanje sa nasumičnim zadacima iz cele baze.
            </p>
          </div>

          {examHistory.length > 0 && (
            <div className="mb-4 rounded-lg bg-[#0f172a]/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94a3b8]">Poslednji rezultat</span>
                <span className="text-sm font-semibold text-[#60a5fa]">
                  {parseFloat(examHistory[0].scorePercent || "0").toFixed(0)}%
                </span>
              </div>
            </div>
          )}

          <Link
            href="/ispit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <ClipboardList size={18} />
            Pokreni ispit
          </Link>
        </div>
      </div>
    </div>
  );
}
