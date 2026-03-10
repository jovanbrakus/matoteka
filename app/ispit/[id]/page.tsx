"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Flag, ChevronLeft, ChevronRight, Send } from "lucide-react";

interface ExamProblem {
  id: string;
  position: number;
  answer: string | null;
  isFlagged: boolean;
  problemId: string;
  title: string;
  problemText: string | null;
  answerOptions: string[];
  numOptions: number;
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [exam, setExam] = useState<any>(null);
  const [faculty, setFaculty] = useState<any>(null);
  const [problems, setProblems] = useState<ExamProblem[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchExam = useCallback(async () => {
    const res = await fetch(`/api/exams/${examId}`);
    const data = await res.json();
    setExam(data.exam);
    setFaculty(data.faculty);
    setProblems(data.problems || []);

    if (data.exam?.status === "completed") {
      router.replace(`/ispit/${examId}/rezultati`);
      return;
    }

    const startedAt = new Date(data.exam.startedAt).getTime();
    const durationMs = data.exam.durationLimit * 1000;
    const remaining = Math.max(0, Math.floor((startedAt + durationMs - Date.now()) / 1000));
    setTimeLeft(remaining);
  }, [examId, router]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  useEffect(() => {
    if (timeLeft <= 0 && exam?.status === "in_progress" && problems.length > 0) {
      submitExam();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [exam, problems.length]);

  async function selectAnswer(answer: string) {
    const p = problems[current];
    setProblems((prev) =>
      prev.map((pr, i) => (i === current ? { ...pr, answer } : pr))
    );
    await fetch(`/api/exams/${examId}/answer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: p.id, answer }),
    });
  }

  async function toggleFlag() {
    const p = problems[current];
    setProblems((prev) =>
      prev.map((pr, i) => (i === current ? { ...pr, isFlagged: !pr.isFlagged } : pr))
    );
    await fetch(`/api/exams/${examId}/flag`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: p.id }),
    });
  }

  async function submitExam() {
    const unanswered = problems.filter((p) => !p.answer).length;
    if (unanswered > 0 && timeLeft > 0) {
      if (!confirm(`Imate ${unanswered} neodgovorenih zadataka. Da li ste sigurni?`)) return;
    }
    setSubmitting(true);
    await fetch(`/api/exams/${examId}/submit`, { method: "POST" });
    router.push(`/ispit/${examId}/rezultati`);
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  if (!exam || problems.length === 0) {
    return <div className="py-20 text-center text-text-secondary">Učitavanje ispita...</div>;
  }

  const cp = problems[current];
  const options = cp.answerOptions as string[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
        <span className="font-semibold text-text">{faculty?.shortName} Probni ispit</span>
        <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-[#f87171]" : "text-[#4ade80]"}`}>
          {formatTime(timeLeft)}
        </span>
        <span className="text-sm text-text-secondary">{current + 1}/{problems.length}</span>
      </div>

      {/* Problem navigation strip */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {problems.map((p, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium transition ${
              i === current
                ? "bg-[#60a5fa] text-white"
                : p.answer
                ? "bg-[#4ade80]/20 text-[#4ade80]"
                : p.isFlagged
                ? "bg-[#fbbf24]/20 text-[#fbbf24]"
                : "bg-card text-text-secondary"
            } border border-border`}
          >
            {p.isFlagged ? "\ud83d\udea9" : i + 1}
          </button>
        ))}
      </div>

      {/* Problem content */}
      <div className="mb-4 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-text">
          Zadatak {cp.position}
        </h2>
        {cp.problemText ? (
          <p className="mb-6 text-text whitespace-pre-wrap">{cp.problemText}</p>
        ) : (
          <p className="mb-6 text-text-secondary italic">{cp.title}</p>
        )}

        <div className="space-y-2">
          {options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <button
                key={i}
                onClick={() => selectAnswer(letter)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${
                  cp.answer === letter
                    ? "border-[#60a5fa] bg-[#60a5fa]/20 text-[#60a5fa]"
                    : "border-border bg-bg text-text hover:border-[#60a5fa]/50"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {letter}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={toggleFlag}
            className={`flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm ${
              cp.isFlagged ? "text-[#fbbf24]" : "text-text-secondary"
            }`}
          >
            <Flag size={14} /> Obele\u017ei
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary disabled:opacity-50"
          >
            <ChevronLeft size={14} /> Prethodni
          </button>
          {current < problems.length - 1 ? (
            <button
              onClick={() => setCurrent(current + 1)}
              className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary"
            >
              Slede\u0107i <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={submitExam}
              disabled={submitting}
              className="flex items-center gap-1 rounded-lg bg-[#4ade80] px-6 py-2 text-sm font-semibold text-heading hover:bg-[#34d399] disabled:opacity-50"
            >
              <Send size={14} /> Predaj ispit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
