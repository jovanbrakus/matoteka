"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Flag, ChevronLeft, ChevronRight, Award } from "lucide-react";
import AnswerOptions from "@/components/problems/AnswerOptions";
import ProblemStatement from "@/components/problems/ProblemStatement";

interface ExamProblem {
  id: string;
  position: number;
  pointValue: string;
  answer: string | null;
  isFlagged: boolean;
  problemId: string;
  title: string;
  problemText: string | null;
  answerOptions: string[];
  numOptions: number;
  difficulty: string | null;
  correctAnswer: string | null;
  facultyId: string;
  year: number;
}

interface Exam {
  id: string;
  userId: string;
  facultyId: string;
  testSize: string;
  mode: string;
  status: string;
  durationLimit: number | null;
  startedAt: string;
  finishedAt: string | null;
  timeSpent: number | null;
  score: string | null;
  maxScore: string | null;
  scorePercent: string | null;
  numCorrect: number | null;
  numWrong: number | null;
  numBlank: number | null;
}

interface Faculty {
  id: string;
  shortName: string;
  name: string;
}

export default function SimulationPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [problems, setProblems] = useState<ExamProblem[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const fetchExam = useCallback(async () => {
    const res = await fetch(`/api/simulation/${examId}`);
    const data = await res.json();
    setExam(data.exam);
    setFaculty(data.faculty);
    setProblems(data.problems || []);

    if (data.exam?.status === "completed") {
      router.replace(`/simulacija/${examId}/rezultati`);
      return;
    }

    const startedAt = new Date(data.exam.startedAt).getTime();
    startTimeRef.current = startedAt;
    const now = Date.now();
    const elapsedSec = Math.floor((now - startedAt) / 1000);
    setElapsed(elapsedSec);

    if (data.exam.durationLimit) {
      const remaining = Math.max(0, data.exam.durationLimit - elapsedSec);
      setTimeLeft(remaining);
    }
  }, [examId, router]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  // Timer effect
  useEffect(() => {
    if (!exam || exam.status !== "in_progress" || problems.length === 0) return;

    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);

      if (timeLeft !== null) {
        setTimeLeft((t) => {
          if (t === null) return null;
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleSubmit(true);
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam, problems.length, timeLeft !== null]);

  // Load MathJax once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).MathJax) {
      (window as any).MathJax = {
        tex: {
          inlineMath: [["$", "$"], ["\\(", "\\)"]],
          displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        },
        options: {
          skipHtmlTags: ["script", "noscript", "style", "textarea", "code"],
        },
      };
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  // Re-typeset MathJax when problem changes
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax?.typesetPromise) {
      setTimeout(() => {
        (window as any).MathJax.typesetPromise().catch(() => {});
      }, 100);
    }
  }, [current, problems]);

  async function selectAnswer(answer: string) {
    const p = problems[current];
    const newAnswer = p.answer === answer ? null : answer;

    setProblems((prev) =>
      prev.map((pr, i) => (i === current ? { ...pr, answer: newAnswer } : pr))
    );

    await fetch(`/api/simulation/${examId}/answer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: p.id, answer: newAnswer }),
    });
  }

  async function toggleFlag() {
    const p = problems[current];
    setProblems((prev) =>
      prev.map((pr, i) =>
        i === current ? { ...pr, isFlagged: !pr.isFlagged } : pr
      )
    );
    await fetch(`/api/simulation/${examId}/flag`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: p.id }),
    });
  }

  async function handleSubmit(force = false) {
    if (!force) {
      const unanswered = problems.filter((p) => !p.answer).length;
      if (unanswered > 0) {
        setShowConfirm(true);
        return;
      }
    }
    setShowConfirm(false);
    setSubmitting(true);
    await fetch(`/api/simulation/${examId}/submit`, { method: "POST" });
    router.push(`/simulacija/${examId}/rezultati`);
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  // Pacing radar calculation
  function getPacingData() {
    if (!exam || !exam.durationLimit) return null;

    const timePercent = Math.min(100, (elapsed / exam.durationLimit) * 100);
    const answered = problems.filter((p) => p.answer).length;
    const progressPercent = (answered / problems.length) * 100;
    const pacingScore = progressPercent / Math.max(timePercent, 1);
    const displayPercent = Math.min(100, Math.round(pacingScore * 100));

    let label: string;
    if (displayPercent >= 90) {
      label = "Ispred plana";
    } else if (displayPercent >= 70) {
      label = "Po planu";
    } else {
      label = "Kašnjenje";
    }

    return { displayPercent, label, timePercent, progressPercent };
  }

  if (!exam || problems.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
          <p className="mt-4 text-text-secondary">Učitavanje simulacije...</p>
        </div>
      </div>
    );
  }

  const cp = problems[current];
  const options = cp.answerOptions as string[];
  const pacing = getPacingData();
  const testSizeNum = problems.length;

  return (
    <div>
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="dash-rise relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-surface-dark p-8 shadow-2xl">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: "#ec5b13" }}
            />
            <h3 className="relative mb-3 font-headline text-xl font-bold text-heading">
              Završi simulaciju?
            </h3>
            <p className="relative mb-6 text-sm text-text-secondary">
              Imate{" "}
              <span className="font-bold text-[#ec5b13]">
                {problems.filter((p) => !p.answer).length}
              </span>{" "}
              neodgovorenih zadataka. Da li ste sigurni da želite da završite?
            </p>
            <div className="relative flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-full border border-[var(--glass-border)] px-4 py-3 text-xs font-black uppercase tracking-widest text-text transition-colors hover:bg-[var(--tint)]"
              >
                Nastavi test
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className="btn-shine flex-1 rounded-full bg-[#ec5b13] px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:brightness-110"
              >
                Završi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header — sticky within scrollable main area */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--glass-border)] bg-surface-dark/95 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-5">
          {/* Mode status */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">Status</span>
            <div className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-3 py-1.5">
              {exam.mode === "timed" ? (
                <>
                  <span className="size-2 animate-pulse rounded-full bg-red-500" />
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-text-secondary">Proktor aktivan</span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-text-secondary">Slobodan režim</span>
                </>
              )}
            </div>
          </div>

          {/* Pacing indicator (timed mode only) */}
          {pacing && (() => {
            const pacingColor =
              pacing.displayPercent >= 90 ? "#10b981" : pacing.displayPercent >= 70 ? "#f59e0b" : "#ef4444";
            return (
              <div className="flex flex-col items-start gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">Tempo</span>
                <div
                  className="flex items-center gap-3 rounded-full border px-3 py-1.5"
                  style={{ borderColor: `${pacingColor}33`, background: `${pacingColor}14` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative flex size-2 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full opacity-75" style={{ background: pacingColor }} />
                      <span className="relative size-1.5 rounded-full" style={{ background: pacingColor }} />
                    </div>
                    <span className="font-headline text-xs font-bold tabular-nums text-heading">{pacing.displayPercent}%</span>
                  </div>
                  <div className="h-3 w-px" style={{ background: `${pacingColor}4d` }} />
                  <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider" style={{ color: pacingColor }}>
                    {pacing.label}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Progress */}
          <div className="hidden flex-col items-start gap-1 sm:flex">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">Odgovoreno</span>
            <div className="flex items-center gap-2.5 px-1 py-1.5">
              <span className="font-headline text-xs font-bold tabular-nums text-heading">
                {problems.filter((p) => p.answer).length}/{problems.length}
              </span>
              <span className="h-1 w-24 overflow-hidden rounded-full bg-[var(--tint-strong)]">
                <span
                  className="block h-full rounded-full bg-[#ec5b13]"
                  style={{
                    width: `${(problems.filter((p) => p.answer).length / problems.length) * 100}%`,
                    transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Timer */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
              {exam.mode === "timed" ? "Preostalo vreme" : "Proteklo vreme"}
            </span>
            <div
              className={`rounded-full border px-4 py-1 font-headline text-xl font-bold tabular-nums ${
                timeLeft !== null && timeLeft < 300
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-[#ec5b13]/30 bg-[#ec5b13]/10 text-[#ec5b13]"
              }`}
            >
              {timeLeft !== null ? formatTime(timeLeft) : formatTime(elapsed)}
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={() => handleSubmit()}
            disabled={submitting}
            className="btn-shine flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#ec5b13] px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50"
          >
            <span>Završi simulaciju</span>
            <span className="material-symbols-outlined text-sm">military_tech</span>
          </button>
        </div>
      </div>

      {/* Content: problem area + right sidebar strip */}
      <div className="flex">
        {/* Problem Area */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            {/* Question Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-[var(--glass-border)] pb-4 gap-2">
              <div>
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]">
                  <span className="font-headline text-[#ec5b13]">{String(cp.position).padStart(2, "0")}</span>
                  <span className="text-muted">/ {String(testSizeNum).padStart(2, "0")}</span>
                </span>
                <h1 className="mt-1 font-headline text-2xl font-bold tracking-tight text-heading md:text-3xl">
                  {cp.title}
                </h1>
                {isAdmin && (
                  <span className="font-mono text-xs text-muted mt-1 inline-block">
                    {cp.problemId} | {cp.correctAnswer} | <a href={`/vezbe/${cp.problemId}`} className="underline hover:text-[#ec5b13]">link</a>
                  </span>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <span className="whitespace-nowrap px-3 py-1 rounded-full bg-[var(--tint)] border border-[var(--glass-border)] text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  {cp.facultyId.split("_").pop()?.toUpperCase()} {cp.year}
                </span>
                {cp.difficulty && (
                  <span className="whitespace-nowrap px-3 py-1 rounded-full bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[10px] font-bold text-[#ec5b13] uppercase tracking-wider">
                    {parseFloat(cp.pointValue)} bod.
                  </span>
                )}
              </div>
            </div>

            {/* Problem Content */}
            <div className="overflow-hidden rounded-3xl border border-[var(--glass-border)] glass-card">
              <ProblemStatement problemId={cp.problemId} section="statement" />
            </div>

            {/* Answer Options */}
            <AnswerOptions
              options={options}
              selectedAnswer={cp.answer}
              onSelect={selectAnswer}
              mode="exam"
            />

            {/* Action Bar */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
                className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-7 py-3 text-xs font-bold uppercase tracking-widest text-text-secondary transition-all hover:border-[#ec5b13]/40 hover:text-heading disabled:opacity-30"
              >
                <ChevronLeft size={16} />
                Prethodni
              </button>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={toggleFlag}
                  aria-pressed={cp.isFlagged}
                  className={`flex items-center gap-2 rounded-full border px-7 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                    cp.isFlagged
                      ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                      : "border-[var(--glass-border)] bg-[var(--tint)] text-text-secondary hover:border-amber-400/40 hover:text-amber-400"
                  }`}
                >
                  <Flag size={15} fill={cp.isFlagged ? "currentColor" : "none"} />
                  {cp.isFlagged ? "Označeno" : "Označi za kasnije"}
                </button>
                {current < problems.length - 1 ? (
                  <button
                    onClick={() => setCurrent(current + 1)}
                    className="btn-shine flex items-center gap-2 rounded-full bg-[#ec5b13] px-9 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Sledeći zadatak
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit()}
                    disabled={submitting}
                    className="btn-shine flex items-center gap-2 rounded-full bg-[#ec5b13] px-9 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50"
                  >
                    Završi test
                    <Award size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Question Grid */}
        <aside className="w-24 border-l border-[var(--glass-border)] flex-col items-center py-6 gap-4 hidden md:flex sticky top-14 self-start">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Zadaci
          </div>
          <div className="flex flex-col gap-2.5">
            {problems.map((p, i) => {
              const isActive = i === current;
              const isAnswered = !!p.answer;
              const isFlagged = p.isFlagged;

              let classes = "";
              if (isActive) {
                classes =
                  "bg-[#ec5b13]/15 border-[#ec5b13]/60 text-[#ec5b13] shadow-[0_4px_16px_-4px_rgba(236,91,19,0.5)] scale-110";
              } else if (isAnswered) {
                classes =
                  "bg-emerald-500/15 border-emerald-500/40 text-emerald-500";
              } else if (isFlagged) {
                classes =
                  "bg-amber-400/15 border-amber-400/40 text-amber-400";
              } else {
                classes = "border-[var(--glass-border)] text-muted hover:border-[#ec5b13]/30 hover:text-text-secondary";
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Zadatak ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border font-headline text-xs font-bold tabular-nums transition-all ${classes}`}
                >
                  {isFlagged ? (
                    <Flag size={13} fill="currentColor" />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col items-center gap-4 py-4 relative">
            <div className="h-px w-full bg-[var(--glass-border)]" />
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`size-12 rounded-full border flex items-center justify-center transition-all ${
                showHelp
                  ? "border-[#ec5b13] bg-[#ec5b13]/20 text-[#ec5b13]"
                  : "border-[#ec5b13]/50 text-[#ec5b13] hover:bg-[#ec5b13]/10"
              }`}
            >
              <span className="material-symbols-outlined">help</span>
            </button>

            {/* Help popover */}
            {showHelp && (
              <div className="absolute bottom-16 right-14 w-64 rounded-xl border border-[var(--glass-border)] bg-surface-dark p-4 shadow-2xl z-20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-heading">Pomoć</h4>
                  <button onClick={() => setShowHelp(false)} className="text-muted hover:text-heading">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>

                <div className="space-y-3 text-[11px] text-text-secondary leading-relaxed">
                  {/* Color legend */}
                  <div>
                    <p className="font-bold text-text uppercase tracking-wider text-[10px] mb-1.5">Legenda boja</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="size-3 shrink-0 rounded border border-[#ec5b13]/60 bg-[#ec5b13]/30" />
                        <span>Trenutni zadatak</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 shrink-0 rounded border border-emerald-500/60 bg-emerald-500/30" />
                        <span>Odgovoreno</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 shrink-0 rounded border border-amber-400/60 bg-amber-400/30" />
                        <span>Označeno za kasnije</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 shrink-0 rounded border border-[var(--glass-border)]" />
                        <span>Neodgovoreno</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[var(--glass-border)]" />

                  {/* Navigation */}
                  <div>
                    <p className="font-bold text-text uppercase tracking-wider text-[10px] mb-1">Navigacija</p>
                    <p>Klikni na broj zadatka za brzi prelaz. Koristi dugmad "Prethodni" / "Sledeći" za redom.</p>
                  </div>

                  <div className="h-px bg-[var(--glass-border)]" />

                  {/* Timer */}
                  <div>
                    <p className="font-bold text-text uppercase tracking-wider text-[10px] mb-1">Vreme</p>
                    <p>
                      {exam?.mode === "timed"
                        ? "Kada vreme istekne, test se automatski predaje sa trenutnim odgovorima."
                        : "Nema vremenskog ograničenja. Radi sopstvenim tempom."}
                    </p>
                  </div>

                  <div className="h-px bg-[var(--glass-border)]" />

                  {/* Scoring */}
                  <div>
                    <p className="font-bold text-text uppercase tracking-wider text-[10px] mb-1">Bodovanje</p>
                    <p>Tačan odgovor donosi bodove. Netačan ili prazan odgovor donosi 0 bodova. Nema negativnih bodova.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
