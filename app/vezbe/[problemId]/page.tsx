"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  Star,
} from "lucide-react";

interface ProblemDetail {
  id: string;
  slug: string;
  title: string;
  facultyId: string;
  facultyShortName: string;
  year: number;
  problemNumber: number;
  correctAnswer: string;
  answerOptions: string[];
  numOptions: number;
  difficulty: string | null;
  topics: { id: string; name: string }[];
}

interface NextProblemInfo {
  id: string;
  title: string;
}

export default function PracticeProblemPage() {
  const params = useParams();
  const { status: sessionStatus } = useSession();
  const problemId = params.problemId as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [nextProblem, setNextProblem] = useState<NextProblemInfo | null>(null);

  // Fetch problem details directly by ID using the practice API
  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    setLoading(true);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setShowSolution(false);
    setNextProblem(null);

    fetch(`/api/practice/${problemId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProblem(data);
        setLoading(false);
        // Fetch next recommended problem
        fetchNextProblem(data.id);
      })
      .catch(() => {
        setProblem(null);
        setLoading(false);
      });
  }, [problemId, sessionStatus]);

  const fetchNextProblem = (currentId: string) => {
    fetch("/api/practice/recommended")
      .then((r) => r.json())
      .then((data) => {
        const rec = (data.problems || []).find(
          (p: any) => p.id !== currentId
        );
        if (rec) {
          setNextProblem({ id: rec.id, title: rec.title });
        }
      })
      .catch(() => {});
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !problem || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/practice/${problem.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: selectedAnswer }),
      });
      const data = await res.json();
      setAnswerResult({
        isCorrect: data.isCorrect,
        correctAnswer: data.correctAnswer,
      });
    } catch {
      // Fallback: check locally
      const isCorrect = selectedAnswer === problem.correctAnswer;
      setAnswerResult({
        isCorrect,
        correctAnswer: problem.correctAnswer,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!problem) return;
    try {
      const res = await fetch(`/api/bookmarks/${problem.id}`, {
        method: "POST",
      });
      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch {}
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#ec5b13]" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="mb-4 text-lg text-text-secondary">Zadatak nije pronadjen.</p>
        <Link href="/vezbe" className="text-[#ec5b13] hover:underline">
          Nazad na vezbe
        </Link>
      </div>
    );
  }

  const diff = problem.difficulty ? parseFloat(problem.difficulty) : 5;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      {/* Back navigation */}
      <Link
        href="/vezbe"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-[#ec5b13]"
      >
        <ArrowLeft size={16} /> Nazad na vezbe
      </Link>

      {/* Problem header */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#ec5b13]/20 px-3 py-1 text-xs font-bold text-[#ec5b13]">
            {problem.facultyShortName || problem.facultyId.toUpperCase()}
          </span>
          <span className="text-sm text-text-secondary">{problem.year}</span>
          <span className="text-sm text-text-secondary">
            Zadatak #{problem.problemNumber}
          </span>
          <div className="ml-auto flex items-center gap-1">
            <Star size={12} className="text-[#ec5b13]" />
            <span className="text-xs font-bold text-text-secondary">
              Tezina: {diff}/10
            </span>
          </div>
        </div>

        {problem.topics?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {problem.topics.map((t) => (
              <span
                key={t.id}
                className="rounded-full bg-[#a78bfa]/20 px-2.5 py-0.5 text-xs text-[#a78bfa]"
              >
                {t.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-heading">{problem.title}</h1>
          <button
            onClick={handleToggleBookmark}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[var(--glass-border)] px-3 py-2 text-sm text-text-secondary transition-colors hover:text-[#fbbf24]"
          >
            {bookmarked ? (
              <BookmarkCheck size={16} className="text-[#fbbf24]" />
            ) : (
              <Bookmark size={16} />
            )}
            {bookmarked ? "Sacuvano" : "Sacuvaj"}
          </button>
        </div>
      </div>

      {/* Problem content iframe (MathJax rendered) */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-card">
        <iframe
          src={`/api/problems/${problem.slug}/html?section=statement`}
          sandbox="allow-scripts allow-same-origin"
          className="w-full border-none"
          title="Postavka zadatka"
          style={{ minHeight: "200px" }}
          onLoad={(e) => {
            const iframe = e.target as HTMLIFrameElement;
            try {
              const doc =
                iframe.contentDocument || iframe.contentWindow?.document;
              if (doc) {
                const resizeObserver = new ResizeObserver(() => {
                  const height = doc.documentElement.scrollHeight;
                  iframe.style.height = height + 20 + "px";
                });
                resizeObserver.observe(doc.documentElement);
                iframe.style.height =
                  doc.documentElement.scrollHeight + 20 + "px";
              }
            } catch {
              iframe.style.height = "400px";
            }
          }}
        />
      </div>

      {/* Answer Section */}
      {!showSolution && (
        <div className="mb-8 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-[#ec5b13]" />
            <h3 className="text-lg font-bold text-heading">Tvoj odgovor</h3>
          </div>

          {answerResult ? (
            <div
              className={`mb-4 flex items-center gap-3 rounded-xl border px-5 py-4 ${
                answerResult.isCorrect
                  ? "border-[#4ade80]/30 bg-[#4ade80]/10"
                  : "border-[#f87171]/30 bg-[#f87171]/10"
              }`}
            >
              {answerResult.isCorrect ? (
                <CheckCircle2 size={24} className="text-[#4ade80]" />
              ) : (
                <XCircle size={24} className="text-[#f87171]" />
              )}
              <div>
                <p
                  className={`text-sm font-bold ${
                    answerResult.isCorrect
                      ? "text-[#4ade80]"
                      : "text-[#f87171]"
                  }`}
                >
                  {answerResult.isCorrect
                    ? "Odlicno, tacan odgovor!"
                    : `Netacno. Tacan odgovor je (${answerResult.correctAnswer}).`}
                </p>
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm text-text-secondary">
              Izaberi odgovor i proveri da li si u pravu:
            </p>
          )}

          {/* Answer Options */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {(problem.answerOptions as string[]).map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selectedAnswer === letter;
              const isCorrectAnswer =
                answerResult && letter === answerResult.correctAnswer;
              const isWrongSelection =
                answerResult && !answerResult.isCorrect && isSelected;

              let btnClass: string;
              if (answerResult) {
                if (isCorrectAnswer) {
                  btnClass =
                    "border-[#4ade80] bg-[#4ade80]/20 text-[#4ade80] ring-2 ring-[#4ade80]/30";
                } else if (isWrongSelection) {
                  btnClass =
                    "border-[#f87171] bg-[#f87171]/20 text-[#f87171] line-through";
                } else {
                  btnClass =
                    "border-[var(--glass-border)] bg-card text-muted opacity-50";
                }
              } else if (isSelected) {
                btnClass =
                  "border-[#ec5b13] bg-[#ec5b13]/20 text-[#ec5b13] ring-2 ring-[#ec5b13]/30";
              } else {
                btnClass =
                  "border-[var(--glass-border)] bg-card text-heading hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5";
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!answerResult) setSelectedAnswer(letter);
                  }}
                  disabled={!!answerResult}
                  className={`rounded-xl border p-4 text-center transition-all ${btnClass}`}
                >
                  <span className="block text-[10px] font-bold opacity-60">
                    ({letter})
                  </span>
                  <span className="mt-1 block text-sm font-medium">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {!answerResult ? (
              <>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer || submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#ec5b13] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  Proveri odgovor
                </button>
                <button
                  onClick={() => setShowSolution(true)}
                  className="rounded-xl border border-[var(--glass-border)] px-6 py-3 text-sm text-text-secondary transition-colors hover:text-heading"
                >
                  Preskoci i vidi resenje
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSolution(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#a78bfa] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  Vidi resenje
                  <ArrowRight size={16} />
                </button>
                {nextProblem && (
                  <Link
                    href={`/vezbe/${nextProblem.id}`}
                    className="flex items-center gap-2 rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-6 py-3 text-sm font-bold text-[#ec5b13] transition-all hover:bg-[#ec5b13]/20"
                  >
                    Sledeci zadatak
                    <ArrowRight size={16} />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Full Solution */}
      {showSolution && (
        <>
          <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-card">
            <div className="border-b border-[var(--glass-border)] bg-[var(--tint)] px-6 py-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#ec5b13]">
                Kompletno Resenje
              </h3>
            </div>
            <iframe
              src={`/api/problems/${problem.slug}/html`}
              sandbox="allow-scripts allow-same-origin"
              className="w-full border-none"
              title="Resenje"
              style={{ minHeight: "400px" }}
              onLoad={(e) => {
                const iframe = e.target as HTMLIFrameElement;
                try {
                  const doc =
                    iframe.contentDocument || iframe.contentWindow?.document;
                  if (doc) {
                    const resizeObserver = new ResizeObserver(() => {
                      const height = doc.documentElement.scrollHeight;
                      iframe.style.height = height + 20 + "px";
                    });
                    resizeObserver.observe(doc.documentElement);
                    iframe.style.height =
                      doc.documentElement.scrollHeight + 20 + "px";
                  }
                } catch {
                  iframe.style.height = "600px";
                }
              }}
            />
          </div>

          {/* Next Problem CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
            <div>
              <p className="text-sm text-text-secondary">Spreman za sledeci?</p>
              {nextProblem && (
                <p className="mt-1 text-xs text-muted line-clamp-1">
                  {nextProblem.title}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="/vezbe"
                className="rounded-xl border border-[var(--glass-border)] px-6 py-3 text-sm text-text-secondary transition-colors hover:text-heading"
              >
                Nazad na listu
              </Link>
              {nextProblem && (
                <Link
                  href={`/vezbe/${nextProblem.id}`}
                  className="flex items-center gap-2 rounded-xl bg-[#ec5b13] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:scale-105"
                >
                  Sledeci zadatak
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
