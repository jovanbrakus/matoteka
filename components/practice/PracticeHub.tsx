"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProblemView from "@/components/problems/ProblemView";

/* ─── Types ─── */

interface CategoryStat {
  id: string;
  name: string;
  total: number;
  solved: number;
  attempted: number;
  percent: number;
}

interface CategoryGroup {
  id: string;
  name: string;
  topicIds: string[];
  totalProblems: number;
  solvedCorrectly: number;
  attempted: number;
  progressPercent: number;
}

/* ─── Styling (same as dashboard) ─── */

const GROUP_STYLES: Record<
  string,
  { color: string; barColor: string; icon: string; bgClass: string }
> = {
  algebra: { color: "text-[#ec5b13]", barColor: "#ec5b13", icon: "square_foot", bgClass: "bg-orange-500/10" },
  trigonometry: { color: "text-rose-500", barColor: "#f43f5e", icon: "change_history", bgClass: "bg-rose-500/10" },
  geometry: { color: "text-[#0ea5e9]", barColor: "#0ea5e9", icon: "category", bgClass: "bg-sky-500/10" },
  analysis: { color: "text-cyan-500", barColor: "#06b6d4", icon: "trending_up", bgClass: "bg-cyan-500/10" },
  combinatorics_and_probability: { color: "text-emerald-500", barColor: "#10b981", icon: "casino", bgClass: "bg-emerald-500/10" },
};

const DEFAULT_STYLE = { color: "text-purple-500", barColor: "#a855f7", icon: "functions", bgClass: "bg-purple-500/10" };

function getStyle(id: string) {
  return GROUP_STYLES[id] ?? DEFAULT_STYLE;
}

/* ─── Category topic mapping (for individual category practice) ─── */

const CATEGORY_NAMES: Record<string, string> = {
  percent_proportion: "Procenti i proporcija",
  real_numbers: "Realni brojevi",
  algebraic_expressions: "Algebarski izrazi",
  linear_equations: "Linearne jednačine",
  complex_numbers: "Kompleksni brojevi",
  polynomials: "Polinomi",
  quadratic_equations: "Kvadratne jednačine",
  quadratic_function: "Kvadratna funkcija",
  irrational_equations: "Iracionalne jednačine",
  exponential_equations: "Eksponencijalne jednačine",
  logarithm: "Logaritam",
  trigonometric_expressions: "Trigonometrijski izrazi",
  trigonometric_equations: "Trigonometrijske jednačine",
  planimetry: "Planimetrija",
  stereometry: "Stereometrija",
  analytic_geometry: "Analitička geometrija",
  function_properties: "Osobine funkcije",
  sequences: "Nizovi",
  derivatives: "Izvod funkcije",
  combinatorics: "Kombinatorika",
  binomial_formula: "Binomna formula",
};

/* ─── Component ─── */

export default function PracticeHub() {
  const { status: sessionStatus } = useSession();
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Practice mode state
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceLabel, setPracticeLabel] = useState("");
  const [practiceTopics, setPracticeTopics] = useState<string[]>([]);
  const [currentProblemId, setCurrentProblemId] = useState<string | null>(null);
  const [loadingProblem, setLoadingProblem] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });

  // Fetch category data
  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    fetch("/api/practice/categories")
      .then((r) => r.json())
      .then((data) => {
        setGroups(data.categories ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionStatus]);

  // Fetch a random problem
  const fetchRandom = useCallback(async (topics: string[]) => {
    setLoadingProblem(true);
    try {
      const res = await fetch(`/api/practice/random?topics=${topics.join(",")}`);
      const data = await res.json();
      if (data.problemId) {
        setCurrentProblemId(data.problemId);
      } else {
        setCurrentProblemId(null);
      }
    } catch {
      setCurrentProblemId(null);
    }
    setLoadingProblem(false);
  }, []);

  // Start practice for a group
  const startGroupPractice = (group: CategoryGroup) => {
    setPracticeMode(true);
    setPracticeLabel(group.name);
    setPracticeTopics(group.topicIds);
    setSessionScore({ correct: 0, total: 0 });
    fetchRandom(group.topicIds);
  };

  // Start practice for a single category
  const startCategoryPractice = (categoryId: string, groupName: string) => {
    setPracticeMode(true);
    setPracticeLabel(CATEGORY_NAMES[categoryId] || categoryId);
    setPracticeTopics([categoryId]);
    setSessionScore({ correct: 0, total: 0 });
    fetchRandom([categoryId]);
  };

  // Handle answer result (called after user answers)
  const handleNext = useCallback((wasCorrect?: boolean) => {
    if (wasCorrect !== undefined) {
      setSessionScore((prev) => ({
        correct: prev.correct + (wasCorrect ? 1 : 0),
        total: prev.total + 1,
      }));
    }
    fetchRandom(practiceTopics);
  }, [fetchRandom, practiceTopics]);

  // Exit practice mode
  const exitPractice = () => {
    setPracticeMode(false);
    setCurrentProblemId(null);
    setPracticeTopics([]);
    // Refresh categories to get updated scores
    fetch("/api/practice/categories")
      .then((r) => r.json())
      .then((data) => setGroups(data.categories ?? []));
  };

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ─── Practice Mode ─── */
  if (practiceMode) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-6">
        {/* Practice header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={exitPractice}
              className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--tint)] px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-heading"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Nazad
            </button>
            <div>
              <h2 className="text-lg font-bold text-heading">{practiceLabel}</h2>
              <p className="text-xs text-muted">Vežbanje u toku</p>
            </div>
          </div>

          {/* Session score */}
          <div className="flex items-center gap-3">
            {sessionScore.total > 0 && (
              <div className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-4 py-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                <span className="text-sm font-bold text-heading">
                  {sessionScore.correct}/{sessionScore.total}
                </span>
                <span className="text-xs text-muted">tačno</span>
              </div>
            )}
            <button
              onClick={() => handleNext()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-glow"
            >
              Sledeći
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Problem display */}
        {loadingProblem ? (
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : currentProblemId ? (
          <ProblemView
            problemId={currentProblemId}
            key={currentProblemId}
            onAnswered={handleNext}
          />
        ) : (
          <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-muted">celebration</span>
            <h3 className="text-xl font-bold text-heading">Sve rešeno!</h3>
            <p className="text-text-secondary">
              Nema više nerešenih zadataka u ovoj kategoriji.
            </p>
            <button
              onClick={exitPractice}
              className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white"
            >
              Vrati se na izbor
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ─── Selection Mode ─── */
  if (loading || sessionStatus === "loading") {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-8">
        <div className="mb-6 h-10 w-48 animate-pulse rounded-lg bg-card" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight text-heading lg:text-5xl">
          <span className="text-primary">Vežba</span>
        </h2>
        <p className="mt-2 max-w-lg font-medium text-text-secondary">
          Izaberi oblast i počni sa vežbanjem. Zadaci se biraju nasumično.
        </p>
      </div>

      {/* Category group cards */}
      <div className="space-y-4">
        {groups.map((group) => {
          const style = getStyle(group.id);
          const isExpanded = expandedGroups.has(group.id);
          const pct = group.totalProblems > 0
            ? Math.round((group.solvedCorrectly / group.totalProblems) * 100)
            : 0;

          return (
            <div
              key={group.id}
              className="glass-card overflow-hidden rounded-2xl border border-[var(--glass-border)]"
            >
              {/* Group header */}
              <div className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.bgClass}`}>
                  <span className={`material-symbols-outlined text-2xl ${style.color}`}>
                    {style.icon}
                  </span>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-heading">{group.name}</h3>
                    <span className="text-sm font-bold" style={{ color: style.barColor }}>{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: style.barColor }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    {group.solvedCorrectly} od {group.totalProblems} rešeno
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-[var(--tint)] text-muted transition-colors hover:text-heading"
                  >
                    <span
                      className="material-symbols-outlined transition-transform"
                      style={{ fontSize: 18, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      expand_more
                    </span>
                  </button>
                  <button
                    onClick={() => startGroupPractice(group)}
                    className="rounded-lg px-5 py-2 text-xs font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: style.barColor }}
                  >
                    VEŽBAJ
                  </button>
                </div>
              </div>

              {/* Expanded categories */}
              {isExpanded && (
                <div className="border-t border-[var(--glass-border)] px-5 py-3">
                  <div className="space-y-1">
                    {group.topicIds.map((topicId) => {
                      const catName = CATEGORY_NAMES[topicId] || topicId;
                      return (
                        <button
                          key={topicId}
                          onClick={() => startCategoryPractice(topicId, group.name)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--tint)]"
                        >
                          <span className="text-sm text-text-secondary">{catName}</span>
                          <div className="flex items-center gap-3">
                            <span
                              className="material-symbols-outlined text-base"
                              style={{ color: style.barColor }}
                            >
                              play_arrow
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
