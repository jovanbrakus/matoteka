"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProblemView from "@/components/problems/ProblemView";
import ScoreCircle from "./ScoreCircle";

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
  const [currentProblemId, setCurrentProblemId] = useState<string | null>(null);
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

  // Fetch a random problem
  const fetchRandom = useCallback(async (t: string[]) => {
    if (t.length === 0) return;
    setLoadingProblem(true);
    try {
      const res = await fetch(`/api/practice/random?topics=${t.join(",")}&diff=${diffRef.current}`);
      const data = await res.json();
      setCurrentProblemId(data.problemId || null);
    } catch {
      setCurrentProblemId(null);
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

  const handleNext = useCallback(() => {
    fetchRandom(topics);
  }, [fetchRandom, topics]);

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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/vezba"
            className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--tint)] px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-heading"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Nazad
          </Link>
          {readinessScore !== null && <ScoreCircle score={readinessScore} size={36} />}
          <div>
            <h2 className="text-lg font-bold text-heading">{label}</h2>
            <p className="text-xs text-muted">Vežbanje u toku</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-[var(--glass-border)] bg-[var(--tint)] p-1">
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
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted hover:text-text-secondary"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{tier.icon}</span>
                  {tier.label}
                </button>
              );
            })}
          </div>
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
