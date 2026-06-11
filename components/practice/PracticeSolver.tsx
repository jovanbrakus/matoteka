"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProblemView from "@/components/problems/ProblemView";
import ScoreCircle from "./ScoreCircle";
import { scoreColor } from "@/lib/score-colors";

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

const GROUP_NAMES: Record<string, string> = {
  algebra: "Algebra",
  trigonometry: "Trigonometrija",
  geometry: "Geometrija",
  analysis: "Analiza",
  combinatorics_and_probability: "Kombinatorika i verovatnoća",
};

interface CategoryGroup {
  id: string;
  name: string;
  readinessScore?: number;
  categories: { id: string; name: string; readinessScore?: number }[];
}

export default function PracticeSolver() {
  const { status: sessionStatus } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const currentProblemId = historyIdx >= 0 ? history[historyIdx] ?? null : null;
  const [loadingProblem, setLoadingProblem] = useState(true);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [topics, setTopics] = useState<string[]>([]);
  const [label, setLabel] = useState("");
  const [readinessScore, setReadinessScore] = useState<number | null>(null);
  const initialized = useRef(false);

  // Resolve topics from URL params
  useEffect(() => {
    if (initialized.current || sessionStatus !== "authenticated") return;
    initialized.current = true;

    const groupId = searchParams.get("group");
    const topicId = searchParams.get("topic");

    // Fetch categories for readiness scores and (if group) subcategory IDs
    const fetchCategories = () =>
      fetch("/api/practice/categories").then((r) => r.json());

    if (topicId) {
      setLabel(CATEGORY_NAMES[topicId] || topicId);
      setTopics([topicId]);
      fetchCategories().then((data) => {
        for (const group of (data.categories as CategoryGroup[]) ?? []) {
          const cat = group.categories.find((c: any) => c.id === topicId);
          if (cat) {
            setReadinessScore(cat.readinessScore ?? 0);
            break;
          }
        }
      });
      return;
    }

    if (groupId) {
      setLabel(GROUP_NAMES[groupId] || groupId);
      fetchCategories().then((data) => {
        const group = (data.categories as CategoryGroup[])?.find((g) => g.id === groupId);
        if (group) {
          setTopics(group.categories.map((c) => c.id));
          setReadinessScore(group.readinessScore ?? 0);
        }
      });
      return;
    }

    // No params — go back to selection
    router.push("/vezba");
  }, [sessionStatus, searchParams, router]);

  // Difficulty filter (initialized from URL, togglable in header)
  const [enabledDiffs, setEnabledDiffs] = useState<Set<string>>(() => {
    const raw = searchParams.get("diff");
    return new Set(raw ? raw.split(",").filter(Boolean) : ["easy", "medium", "hard"]);
  });
  const diffRef = useRef([...enabledDiffs].join(","));
  diffRef.current = [...enabledDiffs].join(",");

  const toggleDiff = (id: string) => {
    setEnabledDiffs((prev) => {
      if (prev.has(id) && prev.size === 1) return prev;
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Fetch a random problem and append to history
  const fetchRandom = useCallback(async (t: string[]) => {
    if (t.length === 0) return;
    setLoadingProblem(true);
    try {
      const res = await fetch(`/api/practice/random?topics=${t.join(",")}&diff=${diffRef.current}`);
      const data = await res.json();
      const pid = data.problemId || null;
      if (pid) {
        setHistory((prev) => {
          const next = [...prev, pid];
          setHistoryIdx(next.length - 1);
          return next;
        });
      }
    } catch {
      /* keep current */
    }
    setLoadingProblem(false);
  }, []);

  // Fetch first problem when topics are resolved
  useEffect(() => {
    if (topics.length > 0) fetchRandom(topics);
  }, [topics, fetchRandom]);

  const refreshReadiness = useCallback(() => {
    const groupId = searchParams.get("group");
    const topicId = searchParams.get("topic");
    fetch("/api/practice/categories")
      .then((r) => r.json())
      .then((data) => {
        const groups = (data.categories as CategoryGroup[]) ?? [];
        if (topicId) {
          for (const group of groups) {
            const cat = group.categories.find((c) => c.id === topicId);
            if (cat) { setReadinessScore(cat.readinessScore ?? 0); break; }
          }
        } else if (groupId) {
          const group = groups.find((g) => g.id === groupId);
          if (group) setReadinessScore(group.readinessScore ?? 0);
        }
      })
      .catch(() => {});
  }, [searchParams]);

  const handleAnswered = useCallback((wasCorrect: boolean) => {
    setSessionScore((prev) => ({
      correct: prev.correct + (wasCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    // Delay re-fetch to give background recalculateAnalytics time to complete
    setTimeout(refreshReadiness, 2000);
  }, [refreshReadiness]);

  const handlePrev = useCallback(() => {
    setHistoryIdx((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx((i) => i + 1);
    } else {
      fetchRandom(topics);
    }
  }, [fetchRandom, topics, historyIdx, history.length]);

  if (sessionStatus === "loading" || (loadingProblem && !currentProblemId && topics.length === 0)) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6">
      {/* Header */}
      <div className="dash-rise mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        {/* Context: back + group + readiness */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            href="/vezba"
            aria-label="Nazad na izbor oblasti"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--tint)] text-text-secondary transition-colors hover:border-[#ec5b13]/40 hover:text-heading"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </Link>
          {readinessScore !== null && (
            <ScoreCircle score={readinessScore} size={38} color={scoreColor(readinessScore)} />
          )}
          <div className="min-w-0">
            <h2 className="truncate font-headline text-base font-bold text-heading sm:text-lg">{label}</h2>
            <p className="text-[11px] text-muted">
              {sessionScore.total > 0 ? (
                <>
                  <span className="font-bold text-emerald-500">{sessionScore.correct}</span>
                  <span> od {sessionScore.total} tačno u ovoj sesiji</span>
                </>
              ) : (
                "Vežbanje u toku"
              )}
            </p>
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] p-1 pl-3">
          <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
            Težina
          </span>
          {([
            { id: "easy", label: "Lako", icon: "sentiment_satisfied" },
            { id: "medium", label: "Srednje", icon: "pace" },
            { id: "hard", label: "Teško", icon: "local_fire_department" },
          ] as const).map((tier) => {
            const active = enabledDiffs.has(tier.id);
            return (
              <button
                key={tier.id}
                onClick={() => toggleDiff(tier.id)}
                aria-pressed={active}
                title={active ? `Isključi: ${tier.label}` : `Uključi: ${tier.label}`}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  active
                    ? "border border-[#ec5b13]/30 bg-[#ec5b13]/12 text-[#ec5b13]"
                    : "border border-transparent text-muted opacity-60 hover:opacity-100 hover:text-text-secondary"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{tier.icon}</span>
                {tier.label}
              </button>
            );
          })}
        </div>

        {/* Problem navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={historyIdx <= 0}
            aria-label="Prethodni zadatak"
            title="Prethodni zadatak"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--tint)] text-text-secondary transition-colors hover:border-[#ec5b13]/40 hover:text-heading disabled:pointer-events-none disabled:opacity-35"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <button
            onClick={handleNext}
            className="btn-shine flex items-center gap-2 rounded-full bg-[#ec5b13] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
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
          onAnswered={handleAnswered}
          onNext={handleNext}
          autoShowSolution
        />
      ) : (
        <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
          <span className="material-symbols-outlined text-5xl text-muted">celebration</span>
          <h3 className="text-xl font-bold text-heading">Sve rešeno!</h3>
          <p className="text-text-secondary">
            Nema više nerešenih zadataka u ovoj kategoriji.
          </p>
          <Link
            href="/vezba"
            className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white"
          >
            Vrati se na izbor
          </Link>
        </div>
      )}
    </div>
  );
}
