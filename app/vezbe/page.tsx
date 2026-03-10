"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  StarHalf,
  ChevronRight,
  Loader2,
  Filter,
  BarChart3,
  Flame,
  Award,
  Trophy,
  Target,
  Plus,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  topicIds: string[];
  totalProblems: number;
  solvedCorrectly: number;
  attempted: number;
  progressPercent: number;
}

interface Problem {
  id: string;
  slug: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  difficulty: string | null;
  numOptions: number;
}

interface RecommendedData {
  recommendedCategory: {
    id: string;
    name: string;
    knowledgePercent: number;
    weaknessScore: number;
  };
  problems: Problem[];
}

const FACULTY_LABELS: Record<string, string> = {
  etf: "ETF",
  fon: "FON",
  rgf: "RGF",
  matf: "MATF",
  masf: "MASF",
  grf: "GRF",
  tmf: "TMF",
  sf: "SF",
  ff: "FF",
};

const CATEGORY_ICONS: Record<string, string> = {
  algebra: "function",
  geometrija: "change_history",
  verovatnoca: "casino",
  logika: "psychology",
};

function getDifficultyLabel(diff: number): { label: string; color: string; bgColor: string } {
  if (diff <= 3) return { label: "OSNOVNI", color: "text-text", bgColor: "bg-surface-lighter" };
  if (diff <= 6) return { label: "NAPREDNI", color: "text-text", bgColor: "bg-surface-lighter" };
  return { label: "ELITE", color: "text-white", bgColor: "bg-[#ec5b13]" };
}

function getDifficultyStarIcon(diff: number) {
  if (diff >= 7) return <Star size={12} className="text-[#ec5b13]" />;
  if (diff >= 4) return <StarHalf size={12} className="text-muted" />;
  return <Star size={12} className="text-muted" />;
}

export default function PracticePage() {
  const { data: session, status: sessionStatus } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<RecommendedData | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch categories and recommendation on mount
  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    Promise.all([
      fetch("/api/practice/categories").then((r) => r.json()),
      fetch("/api/practice/recommended").then((r) => r.json()),
    ])
      .then(([catData, recData]) => {
        setCategories(catData.categories || []);
        setRecommended(recData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionStatus]);

  // Fetch problems based on active category
  const fetchProblems = useCallback(
    async (pageNum: number, append = false) => {
      setLoadingProblems(true);
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "15",
      });

      if (activeCategory) {
        const cat = categories.find((c) => c.id === activeCategory);
        if (cat && cat.topicIds.length > 0) {
          params.set("topic", cat.topicIds[0]);
        }
      }

      const res = await fetch(`/api/problems?${params}`);
      const data = await res.json();

      if (append) {
        setProblems((prev) => [...prev, ...(data.problems || [])]);
      } else {
        setProblems(data.problems || []);
      }
      setTotalProblems(data.total || 0);
      setHasMore((data.problems || []).length === 15);
      setLoadingProblems(false);
    },
    [activeCategory, categories]
  );

  useEffect(() => {
    if (sessionStatus === "authenticated" && !loading) {
      setPage(1);
      fetchProblems(1);
    }
  }, [sessionStatus, loading, activeCategory, fetchProblems]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProblems(nextPage, true);
  };

  // Calculate overall stats
  const totalSolved = categories.reduce((s, c) => s + c.solvedCorrectly, 0);
  const totalAttempted = categories.reduce((s, c) => s + c.attempted, 0);
  const overallAccuracy =
    totalAttempted > 0 ? Math.round((totalSolved / totalAttempted) * 100) : 0;

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#ec5b13]" />
      </div>
    );
  }

  if (sessionStatus !== "authenticated") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">Moras biti prijavljen da bi vezbao.</p>
        <Link
          href="/prijava"
          className="rounded-xl bg-[#ec5b13] px-6 py-3 font-bold text-white"
        >
          Prijavi se
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-20 lg:py-12">
      {/* Hero Title */}
      <section className="mb-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-heading italic lg:text-5xl">
              Slobodna <span className="text-[#ec5b13]">Vezba</span>
            </h2>
            <p className="mt-2 max-w-lg font-medium text-text-secondary">
              Odaberi oblast i kreni u osvajanje prijemnog ispita. Tvoj
              personalizovani put ka 100 poena.
            </p>
          </div>
          {(session?.user as any)?.streakCurrent > 0 && (
            <div className="flex gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-4 py-2">
                <Flame size={14} className="text-[#ec5b13]" />
                <span className="text-sm font-bold tracking-wide text-[#ec5b13]">
                  {(session?.user as any).streakCurrent || 0} DANA STREAK
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(isActive ? null : cat.id)
                }
                className={`group flex flex-col rounded-2xl p-6 transition-all ${
                  isActive
                    ? "glass-card border-[#ec5b13]/50 ring-2 ring-[#ec5b13]/20 bg-gradient-to-br from-[#ec5b13]/10 to-transparent"
                    : "glass-card hover:border-[var(--tint-strong)]"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-[#ec5b13] text-white shadow-lg shadow-[#ec5b13]/30"
                        : "border border-[var(--glass-border)] bg-card text-text-secondary group-hover:border-[#ec5b13]/50 group-hover:text-[#ec5b13]"
                    } transition-all`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {CATEGORY_ICONS[cat.id] || "category"}
                    </span>
                  </div>
                  {isActive ? (
                    <span className="rounded bg-[#ec5b13]/20 px-2 py-1 text-[10px] font-black text-[#ec5b13]">
                      AKTIVNO
                    </span>
                  ) : (
                    <span className="rounded bg-[var(--tint)] px-2 py-1 text-[10px] font-black text-muted">
                      {cat.totalProblems} Zadataka
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-heading transition-colors group-hover:text-[#ec5b13]">
                  {cat.name}
                </h3>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--tint-strong)]">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isActive
                        ? "bg-[#ec5b13]"
                        : "bg-muted group-hover:bg-[#ec5b13]/50"
                    }`}
                    style={{ width: `${Math.max(2, cat.progressPercent)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-text-secondary">
                  {cat.progressPercent}% Savladano
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content: Problem Feed + Sidebar */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Problem Feed (8 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-xl font-bold text-heading">
              Dostupni Zadaci
              <span className="rounded-full bg-[var(--tint)] px-2 py-1 text-xs font-normal text-muted">
                {activeCategory
                  ? `${problems.length} od ${totalProblems}`
                  : `Prikazano ${problems.length} od ${totalProblems}`}
              </span>
            </h4>
            <button className="flex items-center gap-1 text-sm font-semibold text-[#ec5b13] hover:underline">
              Filteri <Filter size={14} />
            </button>
          </div>

          {/* Problem Cards */}
          <div className="flex flex-col gap-4">
            {loadingProblems && problems.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#ec5b13]" />
              </div>
            ) : problems.length === 0 ? (
              <div className="py-20 text-center text-muted">
                Nema zadataka za prikaz.
              </div>
            ) : (
              problems.map((p) => {
                const diff = p.difficulty ? parseFloat(p.difficulty) : 5;
                const { label, color, bgColor } = getDifficultyLabel(diff);
                const isElite = diff >= 7;

                return (
                  <div
                    key={p.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl transition-all glass-card md:flex-row hover:border-[#ec5b13]/30"
                  >
                    {/* Left accent bar */}
                    <div
                      className={`absolute left-0 top-0 h-full w-2 ${
                        isElite
                          ? "bg-[#ec5b13] opacity-50 group-hover:opacity-100"
                          : "bg-surface-lighter opacity-30 group-hover:opacity-60"
                      }`}
                    />

                    {/* Content */}
                    <div className="flex-1 p-6 md:pl-10">
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-black tracking-widest ${bgColor} ${color}`}
                        >
                          {label}
                        </span>
                        <span className="text-xs font-bold text-text-secondary">
                          {FACULTY_LABELS[p.facultyId] || p.facultyId.toUpperCase()}{" "}
                          {p.year} | Zadatak {p.problemNumber}
                        </span>
                        <div className="ml-auto flex items-center gap-1">
                          {getDifficultyStarIcon(diff)}
                          <span className="text-xs font-bold text-text-secondary">
                            Tezina: {diff}/10
                          </span>
                        </div>
                      </div>
                      <h4 className="mb-2 text-lg font-bold leading-relaxed text-heading line-clamp-2">
                        {p.title}
                      </h4>
                    </div>

                    {/* Action column */}
                    <div className="flex flex-col items-center justify-center gap-4 border-l border-[var(--glass-border)] bg-[var(--tint)] p-6 md:w-48">
                      <Link
                        href={`/vezbe/${p.id}`}
                        className={`w-full rounded-xl py-2 text-center text-sm font-bold shadow-lg transition-transform hover:scale-105 ${
                          isElite
                            ? "bg-[#ec5b13] text-white shadow-[#ec5b13]/20"
                            : "bg-[#ec5b13]/20 text-[#ec5b13] hover:bg-[#ec5b13]/30"
                        }`}
                      >
                        Probaj
                      </Link>
                      <Link
                        href={`/zadaci/${p.slug}`}
                        className="w-full rounded-xl border border-[var(--glass-border)] bg-card py-2 text-center text-sm font-bold text-text-secondary hover:bg-[var(--tint)]"
                      >
                        Pregled
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Load more */}
          {hasMore && problems.length > 0 && (
            <button
              onClick={handleLoadMore}
              disabled={loadingProblems}
              className="mt-4 w-full rounded-2xl border-2 border-dashed border-[var(--glass-border)] py-4 text-xs font-bold uppercase tracking-widest text-muted transition-all hover:border-[#ec5b13]/50 hover:text-[#ec5b13]"
            >
              {loadingProblems ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                "Ucitaj vise zadataka"
              )}
            </button>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* AI Recommendation Card */}
          {recommended && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ec5b13] via-[#ec5b13]/80 to-[#ec5b13]/60 p-8 text-white shadow-2xl shadow-[#ec5b13]/20">
              {/* Background pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0 L100 100 M0 100 L100 0" stroke="white" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-2">
                  <Sparkles size={18} className="animate-pulse text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Smart Next Preporuka
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-black leading-tight">
                  {recommended.recommendedCategory.name}
                </h3>
                <p className="mb-8 text-sm font-medium text-white/80">
                  Na osnovu tvoje analitike, ova oblast zahteva najvise paznje.
                  Trenutno znanje: {recommended.recommendedCategory.knowledgePercent}%.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={
                      recommended.problems.length > 0
                        ? `/vezbe/${recommended.problems[0].id}`
                        : "#"
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-center font-black text-[#ec5b13] shadow-lg transition-all hover:bg-slate-100"
                  >
                    ZAPOCNI PREPORUCENO
                    <ChevronRight size={16} className="font-bold" />
                  </Link>
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-white/60">
                      {recommended.problems.length} zadataka spremno
                    </span>
                    <span className="text-[10px] font-bold text-white/60">
                      Prioritet: {recommended.recommendedCategory.weaknessScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="flex flex-col gap-6 rounded-2xl p-6 glass-card">
            <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-heading">
              Tvoj progres
              <span className="h-[1px] flex-1 bg-[var(--tint-strong)]" />
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--glass-border)] bg-card p-4">
                <p className="text-[10px] font-bold uppercase text-muted">
                  Reseno
                </p>
                <p className="mt-1 text-2xl font-black text-heading">
                  {totalSolved}
                </p>
                <p className="mt-1 text-[10px] font-bold text-muted">
                  od {categories.reduce((s, c) => s + c.totalProblems, 0)}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--glass-border)] bg-card p-4">
                <p className="text-[10px] font-bold uppercase text-muted">
                  Preciznost
                </p>
                <p className="mt-1 text-2xl font-black text-heading">
                  {overallAccuracy}%
                </p>
                <p className="mt-1 text-[10px] font-bold text-[#ec5b13]">
                  {overallAccuracy >= 85
                    ? "Elite nivo"
                    : overallAccuracy >= 65
                    ? "Napredni"
                    : "Nastavi vežbu"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-orange-500">
                    <Flame size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">Ukupno pokusano</p>
                    <p className="text-[10px] text-muted">
                      Svi pokusaji
                    </p>
                  </div>
                </div>
                <span className="text-lg font-black italic text-heading">
                  {totalAttempted}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <Target size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">Tacni odgovori</p>
                    <p className="text-[10px] text-muted">Kroz sve kategorije</p>
                  </div>
                </div>
                <span className="text-lg font-black italic text-heading">
                  {totalSolved}
                </span>
              </div>
            </div>

            <Link
              href="/analitika"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] bg-card py-4 text-xs font-bold uppercase tracking-widest text-heading transition-all hover:border-[#ec5b13]/50"
            >
              Puna Analitika
              <BarChart3 size={14} />
            </Link>
          </div>

          {/* Achievements Preview */}
          <div className="rounded-2xl border-dashed border-[var(--glass-border)] p-6 glass-card">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-heading">
              Poslednja Postignuca
            </h4>
            <div className="flex gap-4">
              {totalSolved >= 10 ? (
                <div
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#ec5b13]/50 bg-[#ec5b13]/20 text-[#ec5b13]"
                  title="Prvih 10 zadataka"
                >
                  <Award size={20} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[8px] opacity-0 transition-opacity group-hover:opacity-100">
                    Prvih 10
                  </div>
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-card text-muted opacity-40 grayscale">
                  <Award size={20} />
                </div>
              )}

              {overallAccuracy >= 80 ? (
                <div
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#ec5b13]/50 bg-[#ec5b13]/20 text-[#ec5b13]"
                  title="80%+ preciznost"
                >
                  <Trophy size={20} />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[8px] opacity-0 transition-opacity group-hover:opacity-100">
                    Preciznost 80%+
                  </div>
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-card text-muted opacity-40 grayscale">
                  <Trophy size={20} />
                </div>
              )}

              {totalSolved >= 50 ? (
                <div
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#ec5b13]/50 bg-[#ec5b13]/20 text-[#ec5b13]"
                  title="50 resenih"
                >
                  <span className="material-symbols-outlined text-lg">military_tech</span>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[8px] opacity-0 transition-opacity group-hover:opacity-100">
                    50 resenih
                  </div>
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-card text-muted opacity-40 grayscale">
                  <span className="material-symbols-outlined text-lg">military_tech</span>
                </div>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[var(--glass-border)] text-muted">
                <Plus size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
