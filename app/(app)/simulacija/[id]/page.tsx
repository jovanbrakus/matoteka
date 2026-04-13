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
          <div className="mx-4 w-full max-w-md rounded-2xl border border-[#ec5b13]/20 bg-surface-dark p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-heading mb-3">
              Završi simulaciju?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Imate{" "}
              <span className="font-bold text-[#ec5b13]">
                {problems.filter((p) => !p.answer).length}
              </span>{" "}
              neodgovorenih zadataka. Da li ste sigurni da želite da završite?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-[var(--glass-border)] px-4 py-3 text-sm font-bold text-text hover:bg-[var(--tint)]"
              >
                Nastavi test
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className="flex-1 rounded-xl bg-[#ec5b13] px-4 py-3 text-sm font-bold text-white hover:bg-[#ec5b13]/90"
              >
                Završi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header — sticky within scrollable main area */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ec5b13]/20 bg-surface-dark/95 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-6">
          {/* Pacing indicator (timed mode only) */}
          {pacing && (
            <>
              <div className="flex flex-col items-start gap-1">
                <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">Proctor Insight</span>
                <div className="flex items-center gap-3 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="relative flex size-2 items-center justify-center">
                      <span className="absolute h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                      <span className="relative size-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <span className="text-xs font-black text-heading">{pacing.displayPercent}%</span>
                  </div>
                  <div className="h-3 w-px bg-cyan-400/30" />
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-cyan-400">radar</span>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter whitespace-nowrap">{pacing.label}</span>
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-[var(--glass-border)]" />
            </>
          )}

          {/* Status */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">Status</span>
            <div className="flex items-center gap-2 px-1">
              {exam.mode === "timed" ? (
                <>
                  <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Proktor aktivan</span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Slobodan režim</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#ec5b13] font-bold uppercase tracking-widest">
              {exam.mode === "timed" ? "Preostalo vreme" : "Proteklo vreme"}
            </span>
            <div
              className={`rounded-lg px-4 py-1 text-2xl font-mono font-black shadow-[0_0_15px_rgba(236,91,19,0.3)] ${
                timeLeft !== null && timeLeft < 300
                  ? "bg-red-500/10 border border-red-500/30 text-red-400"
                  : "bg-[#ec5b13]/10 border border-[#ec5b13]/30 text-[#ec5b13]"
              }`}
            >
              {timeLeft !== null ? formatTime(timeLeft) : formatTime(elapsed)}
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={() => handleSubmit()}
            disabled={submitting}
            className="px-6 py-2.5 bg-[#ec5b13] text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-[#ec5b13]/90 transition-all shadow-[0_0_20px_rgba(236,91,19,0.4)] flex items-center justify-center gap-2 group shrink-0 disabled:opacity-50"
          >
            <span>Završi Simulaciju</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">military_tech</span>
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
                <span className="text-[#ec5b13] font-bold text-sm tracking-widest uppercase">
                  Zadatak {cp.position} / {testSizeNum}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-heading mt-1">
                  {cp.title}
                </h1>
                {isAdmin && (
                  <span className="font-mono text-xs text-muted mt-1 inline-block">
                    {cp.problemId} | {cp.correctAnswer} | <a href={`/vezbe/${cp.problemId}`} className="underline hover:text-[#ec5b13]">link</a>
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--tint)] border border-[var(--glass-border)] text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  {cp.facultyId.split("_").pop()?.toUpperCase()} {cp.year}
                </span>
                {cp.difficulty && (
                  <span className="px-3 py-1 rounded-full bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[10px] font-bold text-[#ec5b13] uppercase tracking-wider">
                    {parseFloat(cp.pointValue)} bod.
                  </span>
                )}
              </div>
            </div>

            {/* Problem Content */}
            <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-card">
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
                className="px-8 py-3 rounded-xl border border-[var(--glass-border)] text-text-secondary font-bold uppercase tracking-widest hover:bg-[var(--tint)] transition-all flex items-center gap-2 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
                Prethodni
              </button>
              <div className="flex gap-4">
                <button
                  onClick={toggleFlag}
                  className={`px-8 py-3 rounded-xl border font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                    cp.isFlagged
                      ? "border-yellow-400/50 text-yellow-400 bg-yellow-400/5"
                      : "border-[#ec5b13]/30 text-[#ec5b13] hover:bg-[#ec5b13]/5"
                  }`}
                >
                  <Flag size={16} />
                  Označi za kasnije
                </button>
                {current < problems.length - 1 ? (
                  <button
                    onClick={() => setCurrent(current + 1)}
                    className="px-10 py-3 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl"
                  >
                    Sledeći zadatak
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit()}
                    disabled={submitting}
                    className="px-10 py-3 rounded-xl bg-[#ec5b13] text-white font-black uppercase tracking-widest hover:bg-[#ec5b13]/90 transition-all flex items-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    Završi test
                    <Award size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Question Grid */}
        <aside className="w-24 border-l border-[var(--glass-border)] flex-col items-center py-6 gap-4 hidden md:flex sticky top-14 self-start">
          <div className="text-[10px] font-bold text-muted uppercase tracking-tighter mb-2">
            Status
          </div>
          <div className="flex flex-col gap-3">
            {problems.map((p, i) => {
              const isActive = i === current;
              const isAnswered = !!p.answer;
              const isFlagged = p.isFlagged;

              let classes = "";
              if (isActive) {
                classes =
                  "bg-[#ec5b13]/20 border-[#ec5b13]/50 text-[#ec5b13] shadow-[0_0_15px_rgba(236,91,19,0.3)]";
              } else if (isAnswered) {
                classes =
                  "bg-cyan-400/20 border-cyan-400/50 text-cyan-400";
              } else if (isFlagged) {
                classes =
                  "bg-yellow-400/20 border-yellow-400/50 text-yellow-400";
              } else {
                classes = "border-[var(--glass-border)] text-muted";
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-xs transition-all ${classes}`}
                >
                  {isFlagged && !isActive ? (
                    <Flag size={14} />
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
                        <span className="size-3 rounded bg-[#ec5b13]/30 border border-[#ec5b13]/60 shrink-0" />
                        <span>Trenutni zadatak</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded bg-cyan-400/30 border border-cyan-400/60 shrink-0" />
                        <span>Odgovoreno</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded bg-yellow-400/30 border border-yellow-400/60 shrink-0" />
                        <span>Označeno za kasnije</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded border border-[var(--glass-border)] shrink-0" />
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
