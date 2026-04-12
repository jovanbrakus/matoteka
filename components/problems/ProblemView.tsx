"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  Star,
} from "lucide-react";
import ProblemStatement from "./ProblemStatement";
import AnswerOptions from "./AnswerOptions";
import MathTitle from "@/components/ui/math-title";
import CommentPanel from "@/components/comments/CommentPanel";
import {
  anchorKey,
  CardType,
  CommentsResponse,
  CommentThread,
} from "@/lib/comments";

interface ProblemDetail {
  id: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  answerOptions: string[];
  numOptions: number;
  difficulty: string | null;
  category: string | null;
  correctAnswer?: string;
}

interface NextProblemInfo {
  id: string;
  title: string;
}

interface ProblemViewProps {
  problemId: string;
  onAnswered?: (wasCorrect: boolean) => void;
  onNext?: () => void;
  /** Automatically show the full solution after the user submits an answer */
  autoShowSolution?: boolean;
  /** Pre-set the bookmark state (e.g. when viewing from /sacuvano) */
  initialBookmarked?: boolean;
}

export default function ProblemView({ problemId, onAnswered, onNext, autoShowSolution, initialBookmarked }: ProblemViewProps) {
  const { data: session, status: sessionStatus } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const currentUserId = session?.user?.id ?? null;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmarked ?? false);
  const [nextProblem, setNextProblem] = useState<NextProblemInfo | null>(null);

  // Comment state
  const [commentsData, setCommentsData] = useState<CommentsResponse>({
    anchors: {},
    counts: {},
  });
  const [panelAnchor, setPanelAnchor] = useState<{
    cardType: CardType;
    stepNumber: number | null;
  } | null>(null);

  const fetchComments = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/problems/${id}/comments`);
        if (!res.ok) return;
        const data = (await res.json()) as CommentsResponse;
        setCommentsData(data);
      } catch {}
    },
    []
  );

  const handleCommentOpen = useCallback(
    (cardType: CardType, stepNumber: number | null) => {
      setPanelAnchor({ cardType, stepNumber });
    },
    []
  );

  const handleCommentRefresh = useCallback(() => {
    if (problem) fetchComments(problem.id);
  }, [problem, fetchComments]);

  const panelThreads: CommentThread[] = panelAnchor
    ? commentsData.anchors[anchorKey(panelAnchor.cardType, panelAnchor.stepNumber)] ?? []
    : [];

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    setLoading(true);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setShowSolution(false);
    setNextProblem(null);
    setCommentsData({ anchors: {}, counts: {} });
    setPanelAnchor(null);

    fetch(`/api/practice/${problemId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProblem(data);
        setLoading(false);
        fetchNextProblem(data.id);
        fetchComments(data.id);
      })
      .catch(() => {
        setProblem(null);
        setLoading(false);
      });
  }, [problemId, sessionStatus, fetchComments]);

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
      if (!res.ok) {
        setAnswerResult(null);
        return;
      }
      const data = await res.json();
      setAnswerResult({
        isCorrect: data.isCorrect,
        correctAnswer: data.correctAnswer,
      });
      if (autoShowSolution) setShowSolution(true);
      onAnswered?.(data.isCorrect);
    } catch {
      setAnswerResult(null);
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
        <p className="mb-4 text-lg text-text-secondary">
          Zadatak nije pronadjen.
        </p>
        <Link href="/vezbe" className="text-[#ec5b13] hover:underline">
          Nazad na vezbe
        </Link>
      </div>
    );
  }

  const diff = problem.difficulty ? parseFloat(problem.difficulty) : 5;

  return (
    <div className="mx-auto max-w-5xl px-0 py-8 sm:px-4 lg:px-8">
      {/* Problem header */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#ec5b13]/20 px-3 py-1 text-xs font-bold text-[#ec5b13]">
            {problem.facultyId.toUpperCase()}
          </span>
          <span className="text-sm text-text-secondary">{problem.year}</span>
          <span className="text-sm text-text-secondary">
            Zadatak #{problem.problemNumber}
          </span>
          {isAdmin && (
            <span className="font-mono text-xs text-muted">
              {problem.id} | {problem.correctAnswer} | <a href={`/vezbe/${problem.id}`} className="underline hover:text-[#ec5b13]">link</a>
            </span>
          )}
          <div className="ml-auto flex items-center gap-1">
            <Star size={12} className="text-[#ec5b13]" />
            <span className="text-xs font-bold text-text-secondary">
              Tezina: {diff}/10
            </span>
          </div>
        </div>

        {problem.category && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-[#a78bfa]/20 px-2.5 py-0.5 text-xs text-[#a78bfa]">
              {problem.category}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <MathTitle text={problem.title} as="h1" className="text-2xl font-bold text-heading" />
          <button
            onClick={handleToggleBookmark}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[var(--glass-border)] px-3 py-2 text-sm text-text-secondary transition-colors hover:text-[#fbbf24]"
          >
            {bookmarked ? (
              <BookmarkCheck size={16} className="text-[#fbbf24]" />
            ) : (
              <Bookmark size={16} />
            )}
            {bookmarked ? "Sačuvano" : "Sačuvaj"}
          </button>
        </div>
      </div>

      {/* Problem content iframe */}
      <div className="mb-8">
        <ProblemStatement
          problemId={problem.id}
          section="statement"
          commentCounts={commentsData.counts}
          onCommentOpen={handleCommentOpen}
        />
      </div>

      {/* Answer Section */}
      <div className="mb-8 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-[#ec5b13]" />
            <h3 className="text-lg font-bold text-heading">Tvoj odgovor</h3>
          </div>

          {answerResult ? (
            <div
              className={`mb-4 flex items-center gap-3 rounded-xl border px-5 py-4 ${
                answerResult.isCorrect
                  ? "border-[#16a34a]/30 bg-[#16a34a]/10"
                  : "border-[#f87171]/30 bg-[#f87171]/10"
              }`}
            >
              {answerResult.isCorrect ? (
                <CheckCircle2 size={24} className="text-[#16a34a]" />
              ) : (
                <XCircle size={24} className="text-[#f87171]" />
              )}
              <div>
                <p
                  className={`text-sm font-bold ${
                    answerResult.isCorrect
                      ? "text-[#16a34a]"
                      : "text-[#f87171]"
                  }`}
                >
                  {answerResult.isCorrect
                    ? "Odlično, tačan odgovor!"
                    : `Netačno. Tačan odgovor je (${answerResult.correctAnswer}).`}
                </p>
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm text-text-secondary">
              Izaberi odgovor i proveri da li si u pravu:
            </p>
          )}

          {/* Answer Options */}
          <div className="mb-6">
            <AnswerOptions
              options={problem.answerOptions}
              selectedAnswer={selectedAnswer}
              onSelect={setSelectedAnswer}
              result={answerResult}
              mode="practice"
            />
          </div>

          {/* Action Buttons — hidden when solution is already showing via autoShowSolution */}
          {!showSolution && <div className="flex flex-wrap gap-3">
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
                  Preskoči i vidi rešenje
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSolution(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#a78bfa] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  Vidi rešenje
                  <ArrowRight size={16} />
                </button>
                {onNext ? (
                  <button
                    onClick={onNext}
                    className="flex items-center gap-2 rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-6 py-3 text-sm font-bold text-[#ec5b13] transition-all hover:bg-[#ec5b13]/20"
                  >
                    Sledeći zadatak
                    <ArrowRight size={16} />
                  </button>
                ) : nextProblem ? (
                  <Link
                    href={`/vezbe/${nextProblem.id}`}
                    className="flex items-center gap-2 rounded-xl border border-[#ec5b13]/30 bg-[#ec5b13]/10 px-6 py-3 text-sm font-bold text-[#ec5b13] transition-all hover:bg-[#ec5b13]/20"
                  >
                    Sledeći zadatak
                    <ArrowRight size={16} />
                  </Link>
                ) : null}
              </>
            )}
          </div>}
        </div>

      {/* Full Solution */}
      {showSolution && (
        <>
          <div className="mb-6">
            <div className="mb-4 px-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#ec5b13]">
                Kompletno rešenje
              </h3>
            </div>
            <ProblemStatement
              problemId={problem.id}
              section="full"
              minHeight="400px"
              commentCounts={commentsData.counts}
              onCommentOpen={handleCommentOpen}
            />
          </div>

          {/* Next Problem CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
            <div>
              <p className="text-sm text-text-secondary">
                Spreman za sledeći?
              </p>
              {!onNext && nextProblem && (
                <p className="mt-1 text-xs text-muted line-clamp-1">
                  {nextProblem.title}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {!onNext && (
                <Link
                  href="/vezbe"
                  className="rounded-xl border border-[var(--glass-border)] px-6 py-3 text-sm text-text-secondary transition-colors hover:text-heading"
                >
                  Nazad na listu
                </Link>
              )}
              {onNext ? (
                <button
                  onClick={onNext}
                  className="flex items-center gap-2 rounded-xl bg-[#ec5b13] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:scale-105"
                >
                  Sledeći zadatak
                  <ArrowRight size={16} />
                </button>
              ) : nextProblem ? (
                <Link
                  href={`/vezbe/${nextProblem.id}`}
                  className="flex items-center gap-2 rounded-xl bg-[#ec5b13] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:scale-105"
                >
                  Sledeći zadatak
                  <ArrowRight size={16} />
                </Link>
              ) : null}
            </div>
          </div>
        </>
      )}

      <CommentPanel
        open={panelAnchor !== null}
        problemId={problem.id}
        anchor={panelAnchor}
        threads={panelThreads}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
        onClose={() => setPanelAnchor(null)}
        onRefresh={handleCommentRefresh}
      />
    </div>
  );
}
