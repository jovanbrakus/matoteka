"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Flag,
  ChevronLeft,
  ChevronRight,
  Settings,
  Activity,
  Radar,
  Zap,
  Info,
  HelpCircle,
  Award,
} from "lucide-react";

interface ExamProblem {
  id: string;
  position: number;
  pointValue: string;
  answer: string | null;
  isFlagged: boolean;
  problemId: string;
  title: string;
  htmlContent: string;
  problemText: string | null;
  answerOptions: string[];
  numOptions: number;
  difficulty: string | null;
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
  const examId = params.id as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [problems, setProblems] = useState<ExamProblem[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
            // Auto-submit on expiry
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
    // Toggle: if same answer clicked, deselect
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

  // Pacing radar calculation (spec 12.3)
  function getPacingData() {
    if (!exam || !exam.durationLimit) return null;

    const timePercent = Math.min(100, (elapsed / exam.durationLimit) * 100);
    const answered = problems.filter((p) => p.answer).length;
    const progressPercent = (answered / problems.length) * 100;
    const pacingScore = progressPercent / Math.max(timePercent, 1);
    const displayPercent = Math.min(100, Math.round(pacingScore * 100));

    let color: string;
    let label: string;
    let message: string;

    if (displayPercent >= 90) {
      color = "text-emerald-400";
      label = "Optimalno";
      message = "Ispred plana!";
    } else if (displayPercent >= 70) {
      color = "text-yellow-400";
      label = "Umereno";
      message = "Napredak u skladu sa planom";
    } else {
      color = "text-red-400";
      label = "Kasniš";
      message = `Trošiš ${Math.round(timePercent - progressPercent)}% više vremena`;
    }

    return { displayPercent, color, label, message, timePercent, progressPercent };
  }

  if (!exam || problems.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0705]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
          <p className="mt-4 text-slate-400">Učitavanje simulacije...</p>
        </div>
      </div>
    );
  }

  const cp = problems[current];
  const options = cp.answerOptions as string[];
  const pacing = getPacingData();
  const testSizeNum = problems.length;

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-[#0a0705]">
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-[#ec5b13]/20 bg-[#140d0a] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3">
              Završi simulaciju?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Imate{" "}
              <span className="font-bold text-[#ec5b13]">
                {problems.filter((p) => !p.answer).length}
              </span>{" "}
              neodgovorenih zadataka. Da li ste sigurni da želite da završite?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5"
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

      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#ec5b13]/20 bg-[#140d0a]/90 px-8 py-3 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#ec5b13] flex items-center justify-center shadow-[0_0_15px_rgba(236,91,19,0.3)]">
              <span className="material-symbols-outlined text-white text-2xl">
                functions
              </span>
            </div>
            <div>
              <h2 className="text-white text-lg font-extrabold leading-tight tracking-tight uppercase">
                TataMata{" "}
                <span className="text-[#ec5b13]">Simulacija</span>
              </h2>
              <div className="flex gap-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                <span className="text-[#ec5b13]/80">
                  {faculty?.shortName}
                </span>
                <span>
                  {exam.testSize === "full"
                    ? "Kompletan"
                    : exam.testSize === "medium"
                    ? "Srednji"
                    : "Brzi"}
                </span>
              </div>
            </div>
          </div>
          {exam.mode === "timed" && (
            <>
              <div className="h-8 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">
                  Vremenski ograničen
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#ec5b13] font-bold uppercase tracking-widest">
              {exam.mode === "timed" ? "Preostalo vreme" : "Proteklo vreme"}
            </span>
            <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Pacing & Info */}
        <aside className="w-80 flex flex-col gap-4 p-6 bg-[#140d0a] border-r border-white/5 overflow-y-auto hidden lg:flex">
          {/* Pacing Radar */}
          {pacing && (
            <div className="bg-[rgba(34,22,16,0.6)] backdrop-blur-xl border border-[#ec5b13]/10 p-5 rounded-2xl flex flex-col gap-4 border-l-4 border-l-cyan-400">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Pacing Radar
                </h3>
                <Radar size={16} className="text-cyan-400" />
              </div>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                {/* Circular progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(0,242,255,0.1)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(0,242,255,0.6)"
                    strokeWidth="6"
                    strokeDasharray={`${(pacing.displayPercent / 100) * 440} 440`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-white">
                    {pacing.displayPercent}%
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase ${pacing.color}`}
                  >
                    {pacing.label}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                {pacing.message}
              </p>
            </div>
          )}

          {/* Problem Stats */}
          <div className="bg-[rgba(34,22,16,0.6)] backdrop-blur-xl border border-[#ec5b13]/10 p-5 rounded-2xl flex flex-col gap-3 border-l-4 border-l-[#ec5b13]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#ec5b13]">
                Napredak
              </h3>
              <Activity size={16} className="text-[#ec5b13]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Odgovoreno</span>
                <span className="font-bold text-white">
                  {problems.filter((p) => p.answer).length}/{problems.length}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#ec5b13] rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (problems.filter((p) => p.answer).length /
                        problems.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Označeno</span>
                <span className="font-bold text-yellow-400">
                  {problems.filter((p) => p.isFlagged).length}
                </span>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
              Uvid
            </h3>
            <div className="bg-[rgba(34,22,16,0.6)] backdrop-blur-xl border border-white/5 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex gap-3">
                <Zap size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-300">
                  <span className="text-cyan-400 font-bold uppercase">
                    Savet:
                  </span>{" "}
                  Fokusiraj se na preostale zadatke. Označi teže za kasniji pregled.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit()}
            disabled={submitting}
            className="mt-auto w-full py-4 bg-[#ec5b13] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#ec5b13]/90 transition-all shadow-[0_0_15px_rgba(236,91,19,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Završi Simulaciju</span>
            <Award size={18} />
          </button>
        </aside>

        {/* Main Content: Problem Area */}
        <section className="flex-1 bg-[#0a0705] p-4 md:p-8 flex flex-col overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            {/* Question Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-white/5 pb-4 gap-2">
              <div>
                <span className="text-[#ec5b13] font-bold text-sm tracking-widest uppercase">
                  Zadatak {cp.position} / {testSizeNum}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                  {cp.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {cp.facultyId.split("_").pop()?.toUpperCase()} {cp.year}
                </span>
                {cp.difficulty && (
                  <span className="px-3 py-1 rounded-full bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[10px] font-bold text-[#ec5b13] uppercase tracking-wider">
                    {parseFloat(cp.pointValue)} bod.
                  </span>
                )}
              </div>
            </div>

            {/* Problem Content - render HTML */}
            <div className="bg-[rgba(34,22,16,0.6)] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-12 min-h-[200px] md:min-h-[300px] relative overflow-hidden">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div
                className="relative z-10 problem-content text-slate-200"
                dangerouslySetInnerHTML={{ __html: cp.htmlContent }}
              />
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = cp.answer === letter;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(letter)}
                    className={`p-4 md:p-6 rounded-2xl border transition-all flex items-center justify-between text-left ${
                      isSelected
                        ? "bg-[#ec5b13]/5 border-[#ec5b13]/40"
                        : "bg-[rgba(34,22,16,0.6)] border-white/10 hover:border-[#ec5b13]/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? "bg-[#ec5b13] text-white"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        {letter}
                      </span>
                      <span
                        className="text-white font-medium"
                        dangerouslySetInnerHTML={{ __html: opt }}
                      />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-[#ec5b13] bg-[#ec5b13]"
                          : "border-white/20"
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px] text-white font-bold">
                          check
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
                className="px-8 py-3 rounded-xl border border-white/10 text-slate-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2 disabled:opacity-30"
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

          {/* Mobile submit button */}
          <div className="lg:hidden mt-4 px-4">
            <button
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="w-full py-4 bg-[#ec5b13] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#ec5b13]/90 transition-all shadow-[0_0_15px_rgba(236,91,19,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Završi Simulaciju</span>
              <Award size={18} />
            </button>
          </div>
        </section>

        {/* Right Sidebar: Question Grid */}
        <aside className="w-24 bg-[#140d0a] border-l border-white/5 flex flex-col items-center py-6 gap-4 overflow-y-auto hidden md:flex">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter mb-2">
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
                classes = "border-white/10 text-slate-600";
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
        </aside>
      </main>

      {/* MathJax loaded via useEffect */}
    </div>
  );
}
