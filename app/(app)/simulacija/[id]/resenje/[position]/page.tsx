"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";
import ProblemStatement from "@/components/problems/ProblemStatement";
import AnswerOptions from "@/components/problems/AnswerOptions";

interface SolutionData {
  position: number;
  problemId: string;
  title: string;
  correctAnswer: string;
  answerOptions: string[];
  numOptions: number;
  userAnswer: string | null;
  isCorrect: boolean | null;
  pointValue: string;
  difficulty: string | null;
  category: string | null;
}

export default function SimulationSolutionPage() {
  const params = useParams();
  const examId = params.id as string;
  const position = parseInt(params.position as string, 10);
  const [data, setData] = useState<SolutionData | null>(null);
  const [error, setError] = useState(false);
  const [totalProblems, setTotalProblems] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/simulation/${examId}/solution/${position}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [examId, position]);

  // Fetch total problem count from results to enable prev/next navigation
  useEffect(() => {
    fetch(`/api/simulation/${examId}/results`)
      .then((r) => r.json())
      .then((d) => setTotalProblems(d.problems?.length ?? null))
      .catch(() => {});
  }, [examId]);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="mb-4 text-lg text-text-secondary">
          Rešenje nije pronađeno ili nemate pristup.
        </p>
        <Link
          href={`/simulacija/${examId}/rezultati`}
          className="text-[#ec5b13] hover:underline"
        >
          Nazad na rezultate
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
      </div>
    );
  }

  const diff = data.difficulty ? parseFloat(data.difficulty) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/simulacija/${examId}/rezultati`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-heading transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Nazad na rezultate
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="rounded-full bg-[#ec5b13]/20 px-3 py-1 text-xs font-bold text-[#ec5b13]">
            Zadatak #{data.position}
          </span>
          {data.category && (
            <span className="rounded-full bg-[#a78bfa]/20 px-2.5 py-0.5 text-xs text-[#a78bfa]">
              {data.category}
            </span>
          )}
          {diff !== null && (
            <div className="ml-auto flex items-center gap-1">
              <Star size={12} className="text-[#ec5b13]" />
              <span className="text-xs font-bold text-text-secondary">
                Težina: {diff}/10
              </span>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-heading">{data.title}</h1>
      </div>

      {/* Problem statement (mirrors the in-exam view, since the v2 full
          solution no longer embeds the statement card) */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-card">
        <div className="border-b border-[var(--glass-border)] bg-[var(--tint)] px-6 py-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#ec5b13]">
            Postavka zadatka
          </h3>
        </div>
        <ProblemStatement problemId={data.problemId} section="statement" />
      </div>

      {/* Answer options with review highlights — green for correct,
          red strikethrough on user's wrong pick if any */}
      {data.answerOptions.length > 0 && (
        <div className="mb-6">
          <AnswerOptions
            options={data.answerOptions}
            selectedAnswer={data.userAnswer}
            onSelect={() => {}}
            result={{
              isCorrect: data.isCorrect === true,
              correctAnswer: data.correctAnswer,
            }}
            mode="practice"
          />
        </div>
      )}

      {/* Answer feedback */}
      <div className="mb-6 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
        {data.isCorrect === true ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#4ade80]/30 bg-[#4ade80]/10 px-5 py-4">
            <CheckCircle2 size={24} className="text-[#4ade80]" />
            <div>
              <p className="text-sm font-bold text-[#4ade80]">
                Tačan odgovor! Tvoj odgovor: ({data.userAnswer})
              </p>
            </div>
          </div>
        ) : data.isCorrect === false ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-5 py-4">
            <XCircle size={24} className="text-[#f87171]" />
            <div>
              <p className="text-sm font-bold text-[#f87171]">
                Netačno. Tvoj odgovor: ({data.userAnswer}) — Tačan odgovor: (
                {data.correctAnswer})
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-5 py-4">
            <span className="text-muted text-lg">—</span>
            <p className="text-sm text-text-secondary">
              Nisi odgovorio/la. Tačan odgovor: ({data.correctAnswer})
            </p>
          </div>
        )}
      </div>

      {/* Full Solution */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-card">
        <div className="border-b border-[var(--glass-border)] bg-[var(--tint)] px-6 py-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#ec5b13]">
            Kompletno rešenje
          </h3>
        </div>
        <ProblemStatement
          problemId={data.problemId}
          section="full"
          minHeight="400px"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] p-6 glass-card">
        <div>
          {position > 1 ? (
            <Link
              href={`/simulacija/${examId}/resenje/${position - 1}`}
              className="flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm font-bold text-text-secondary transition-colors hover:text-heading"
            >
              <ArrowLeft size={16} />
              Zadatak #{position - 1}
            </Link>
          ) : (
            <div />
          )}
        </div>
        <Link
          href={`/simulacija/${examId}/rezultati`}
          className="rounded-xl border border-[var(--glass-border)] px-5 py-3 text-sm text-text-secondary transition-colors hover:text-heading"
        >
          Rezultati
        </Link>
        <div>
          {totalProblems && position < totalProblems ? (
            <Link
              href={`/simulacija/${examId}/resenje/${position + 1}`}
              className="flex items-center gap-2 rounded-xl bg-[#ec5b13] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#ec5b13]/90"
            >
              Zadatak #{position + 1}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
