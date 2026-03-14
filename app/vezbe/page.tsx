"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Star,
  StarHalf,
  Loader2,
  Flame,
  Bookmark,
  Zap,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  topicIds: string[];
  totalProblems: number;
  solvedCorrectly: number;
  attempted: number;
  progressPercent: number;
}

interface Problem {
  id: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  difficulty: string | null;
  numOptions: number;
}

const FACULTY_LABELS: Record<string, string> = {
  etf: "ETF", fon: "FON", rgf: "RGF", matf: "MATF",
  masf: "MASF", grf: "GRF", tmf: "TMF", sf: "SF", ff: "FF",
};

// Category groups → individual categories mapping (Serbian names)
const CATEGORY_GROUP_TOPICS: Record<string, { id: string; sr: string }[]> = {
  algebra: [
    { id: "percent_proportion", sr: "Procenti i proporcija" },
    { id: "real_numbers", sr: "Realni brojevi" },
    { id: "algebraic_expressions", sr: "Algebarski izrazi" },
    { id: "linear_equations", sr: "Linearne jednačine" },
    { id: "complex_numbers", sr: "Kompleksni brojevi" },
    { id: "polynomials", sr: "Polinomi" },
    { id: "quadratic_equations", sr: "Kvadratne jednačine" },
    { id: "quadratic_function", sr: "Kvadratna funkcija" },
    { id: "irrational_equations", sr: "Iracionalne jednačine" },
    { id: "exponential_equations", sr: "Eksponencijalne jednačine" },
    { id: "logarithm", sr: "Logaritam" },
  ],
  trigonometry: [
    { id: "trigonometric_expressions", sr: "Trigonometrijski izrazi" },
    { id: "trigonometric_equations", sr: "Trigonometrijske jednačine" },
  ],
  geometry: [
    { id: "planimetry", sr: "Planimetrija" },
    { id: "stereometry", sr: "Stereometrija" },
    { id: "analytic_geometry", sr: "Analitička geometrija" },
  ],
  analysis: [
    { id: "function_properties", sr: "Osobine funkcije" },
    { id: "sequences", sr: "Nizovi" },
    { id: "derivatives", sr: "Izvod funkcije" },
  ],
  combinatorics_and_probability: [
    { id: "combinatorics", sr: "Kombinatorika" },
    { id: "binomial_formula", sr: "Binomna formula" },
  ],
};

function getDifficultyLabel(diff: number): { label: string; color: string; bgColor: string } {
  if (diff <= 3) return { label: "OSNOVNI", color: "text-text", bgColor: "bg-surface-lighter" };
  if (diff <= 6) return { label: "SREDNJI", color: "text-text", bgColor: "bg-surface-lighter" };
  if (diff <= 8.5) return { label: "NAPREDNI", color: "text-white", bgColor: "bg-slate-700" };
  return { label: "ELITE", color: "text-white", bgColor: "bg-[#ec5b13]" };
}

function getDifficultyStarIcon(diff: number) {
  if (diff >= 9) return <Star size={12} className="text-[#ec5b13]" />;
  if (diff >= 6.5) return <Star size={12} className="text-slate-400" />;
  if (diff >= 3.5) return <StarHalf size={12} className="text-muted" />;
  return <Star size={12} className="text-muted" />;
}

export default function PracticePage() {
  const { data: session, status: sessionStatus } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Streak & daily goal from API
  const [streakCurrent, setStreakCurrent] = useState(0);
  const [solvedToday, setSolvedToday] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(3);

  // Filter state
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [diffRange, setDiffRange] = useState<[number, number]>([1, 10]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Random recommended problem
  const [randomProblemId, setRandomProblemId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    // Fetch categories and dashboard data in parallel
    Promise.all([
      fetch("/api/practice/categories").then((r) => r.json()),
      fetch("/api/user/dashboard").then((r) => r.json()),
      fetch("/api/problems?limit=100").then((r) => r.json()),
    ])
      .then(([catData, dashData, problemsData]) => {
        setCategories(catData.categories || []);
        setStreakCurrent(dashData.user?.streakCurrent ?? 0);
        setSolvedToday(dashData.progress?.solvedToday ?? 0);
        setDailyGoal(dashData.progress?.dailyGoal ?? 3);
        // Pick a random problem for the recommended card
        const allIds = (problemsData.problems || []).map((p: any) => p.id);
        if (allIds.length > 0) {
          setRandomProblemId(allIds[Math.floor(Math.random() * allIds.length)]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionStatus]);

  const fetchProblems = useCallback(
    async (pageNum: number, append = false) => {
      setLoadingProblems(true);
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "15",
      });

      // Collect all category IDs to filter by
      const topicIds: string[] = [];

      if (selectedTopics.size > 0) {
        // Specific topics selected — use those directly
        topicIds.push(...selectedTopics);
      } else if (selectedGroups.size > 0) {
        // Groups selected — expand to all their child categories
        for (const groupId of selectedGroups) {
          const groupTopics = CATEGORY_GROUP_TOPICS[groupId];
          if (groupTopics) {
            topicIds.push(...groupTopics.map((t) => t.id));
          }
        }
      }

      if (topicIds.length > 0) {
        params.set("topics", topicIds.join(","));
      }

      // Difficulty range
      if (diffRange[0] > 1 || diffRange[1] < 10) {
        params.set("diffMin", String(diffRange[0]));
        params.set("diffMax", String(diffRange[1]));
      }

      // Status filter
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
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
    [selectedGroups, selectedTopics, diffRange, statusFilter]
  );

  useEffect(() => {
    if (sessionStatus === "authenticated" && !loading) {
      setPage(1);
      fetchProblems(1);
    }
  }, [sessionStatus, loading, selectedGroups, selectedTopics, diffRange, statusFilter, fetchProblems]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProblems(nextPage, true);
  };

  const toggleGroup = (id: string) => {
    setSelectedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    // Clear specific topic selections when toggling groups
    setSelectedTopics(new Set());
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedGroups(new Set());
    setSelectedTopics(new Set());
    setDiffRange([1, 10]);
  };

  const dailyGoalPercent = Math.min(100, Math.round((solvedToday / Math.max(dailyGoal, 1)) * 100));
  const dailyGoalRemaining = Math.max(0, dailyGoal - solvedToday);

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
        <Link href="/prijava" className="rounded-xl bg-[#ec5b13] px-6 py-3 font-bold text-white">
          Prijavi se
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-20 lg:py-12">
      {/* Hero Title */}
      <section className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-heading lg:text-5xl">
            Slobodna <span className="text-[#ec5b13]">Vežba</span>
          </h2>
          <p className="mt-2 max-w-lg font-medium text-text-secondary">
            Personalizuj svoju pripremu. Filtriraj zadatke po oblastima, težini i
            statusu za maksimalan učinak.
          </p>
        </div>
        {streakCurrent > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-4 py-2">
            <Flame size={14} className="text-[#ec5b13]" />
            <span className="text-sm font-bold tracking-wide text-[#ec5b13]">
              {streakCurrent} DANA STREAK
            </span>
          </div>
        )}
      </section>

      {/* Main: Filters Sidebar + Problem Feed */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Filters Sidebar (4 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Daily Goal */}
          <div className="rounded-2xl border border-dashed border-[var(--glass-border)] p-6 glass-card">
            <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-heading">
              Dnevni Cilj
            </h4>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--tint-strong)]">
              <div
                className="h-full bg-[#ec5b13] transition-all"
                style={{ width: `${dailyGoalPercent}%` }}
              />
            </div>
            <p className="mt-3 text-[10px] font-medium text-text-secondary">
              {dailyGoalRemaining > 0 ? (
                <>Još <span className="font-bold text-heading">{dailyGoalRemaining}</span> {dailyGoalRemaining === 1 ? "zadatak" : dailyGoalRemaining < 5 ? "zadatka" : "zadataka"} do dnevnog cilja</>
              ) : (
                <span className="font-bold text-[#ec5b13]">Dnevni cilj ostvaren!</span>
              )}
            </p>
          </div>

          {/* Filters Panel */}
          <div className="flex flex-col gap-8 rounded-2xl p-6 glass-card">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-widest text-heading">
                Filteri
              </h4>
              <button
                onClick={resetFilters}
                className="text-[10px] font-bold uppercase text-[#ec5b13] hover:underline"
              >
                Resetuj sve
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                Status
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { label: "Svi", value: "all" },
                  { label: "Rešeni", value: "solved" },
                  { label: "Nerešeni", value: "unsolved" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--tint)]"
                  >
                    <input
                      type="checkbox"
                      checked={statusFilter === opt.value}
                      onChange={() => setStatusFilter(opt.value)}
                      className="rounded border-[var(--glass-border)] bg-transparent text-[#ec5b13] focus:ring-[#ec5b13]/50"
                    />
                    <span className="text-sm text-text-secondary">{opt.label}</span>
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--tint)]">
                  <input
                    type="checkbox"
                    checked={statusFilter === "bookmarked"}
                    onChange={() => setStatusFilter(statusFilter === "bookmarked" ? "all" : "bookmarked")}
                    className="rounded border-[var(--glass-border)] bg-transparent text-[#ec5b13] focus:ring-[#ec5b13]/50"
                  />
                  <div className="flex items-center gap-2">
                    <Bookmark size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">Sačuvani</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Main Areas (Category Groups) */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                Glavne Oblasti
              </p>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--tint)]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGroups.has(cat.id)}
                      onChange={() => toggleGroup(cat.id)}
                      className="rounded border-[var(--glass-border)] bg-transparent text-[#ec5b13] focus:ring-[#ec5b13]/50"
                    />
                    <span className="text-sm text-text-secondary">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Specific Topics */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                Specifične Teme
              </p>
              <div className="custom-scrollbar flex max-h-[250px] flex-col gap-2 overflow-y-auto pr-2">
                {Object.entries(CATEGORY_GROUP_TOPICS).map(([groupId, topics]) => {
                  const group = categories.find((c) => c.id === groupId);
                  if (!group) return null;
                  return (
                    <div key={groupId} className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase text-[#ec5b13]/60">
                        {group.name}
                      </span>
                      {topics.map((t) => (
                        <label
                          key={t.id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--tint)]"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTopics.has(t.id)}
                            onChange={() => toggleTopic(t.id)}
                            className="rounded border-[var(--glass-border)] bg-transparent text-[#ec5b13] focus:ring-[#ec5b13]/50"
                          />
                          <span className="text-sm text-text-secondary">{t.sr}</span>
                        </label>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                  Težina (1-10)
                </p>
                <span className="text-xs font-bold text-[#ec5b13]">
                  Nivo {diffRange[0]}-{diffRange[1]}
                </span>
              </div>
              <div className="px-2">
                <div className="relative mt-2 h-6">
                  <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[var(--tint-strong)]" />
                  <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#ec5b13]/50"
                    style={{
                      left: `${((diffRange[0] - 1) / 9) * 100}%`,
                      right: `${((10 - diffRange[1]) / 9) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={diffRange[0]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDiffRange(([, max]) => [Math.min(v, max), max]);
                    }}
                    className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto"
                  />
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={diffRange[1]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDiffRange(([min]) => [min, Math.max(v, min)]);
                    }}
                    className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto"
                  />
                </div>
              </div>
              <div className="flex justify-between px-1 text-[8px] font-black uppercase tracking-tighter text-muted">
                <span>Osnovni</span>
                <span>Srednji</span>
                <span>Napredni</span>
                <span>Elite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Feed (8 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* Recommended Problem Card */}
          {randomProblemId && (
            <div className="group relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#ec5b13]/20 bg-[#ec5b13]/5 p-6 glass-card md:flex-row hover:border-[#ec5b13]/40 transition-all">
              <div className="flex flex-col gap-1">
                <div className="mb-1 flex items-center gap-2">
                  <Zap size={20} className="text-[#ec5b13]" />
                  <h4 className="text-xl font-bold tracking-tight text-heading">
                    Preporučeni zadaci
                  </h4>
                </div>
                <p className="max-w-lg text-sm text-text-secondary">
                  Zadaci preporučeni na osnovu tvog nivoa znanja i istorije rešavanja.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href={`/vezbe/${randomProblemId}`}
                  className="inline-block rounded-xl bg-[#ec5b13] px-8 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#ec5b13]/30 transition-transform hover:scale-105"
                >
                  Kreni
                </Link>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-xl font-bold text-heading">
              Dostupni Zadaci
              <span className="rounded-full bg-[var(--tint)] px-2 py-1 text-xs font-normal text-muted">
                Prikazano {problems.length} od {totalProblems}
              </span>
            </h4>
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
                const isElite = diff >= 9;

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
                            Težina: {diff}/10
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
                        Reši
                      </Link>
                      <Link
                        href={`/vezbe/${p.id}`}
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
                "Učitaj više zadataka"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
