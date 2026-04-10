"use client";

import { useEffect, useRef, memo } from "react";

interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
}

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (letter: string) => void;
  /** When set, shows correct/wrong feedback and disables selection */
  result?: AnswerResult | null;
  /** "practice" shows colored feedback, "exam" shows simple selection */
  mode?: "practice" | "exam";
  columns?: number;
}

/**
 * Renders HTML + LaTeX via ref so React never overwrites MathJax output.
 * Memoized so it only re-renders when `html` actually changes.
 */
const MathText = memo(function MathText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Sanitize: strip script tags and event handler attributes
    const clean = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");
    ref.current.innerHTML = clean;

    if ((window as any).MathJax?.typesetPromise) {
      (window as any).MathJax.typesetPromise([ref.current]).catch(() => {});
    }
  }, [html]);

  return <span ref={ref} className={className} />;
});

/** Load MathJax globally once, then typeset a container */
function useMathJaxLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).MathJax?.typesetPromise) return;

    if (!(window as any).MathJax) {
      (window as any).MathJax = {
        tex: {
          inlineMath: [["\\(", "\\)"], ["$", "$"]],
          displayMath: [["\\[", "\\]"], ["$$", "$$"]],
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
}

export default function AnswerOptions({
  options,
  selectedAnswer,
  onSelect,
  result = null,
  mode = "practice",
  columns,
}: AnswerOptionsProps) {
  useMathJaxLoad();

  if (mode === "exam") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selectedAnswer === letter;
          return (
            <button
              key={i}
              onClick={() => onSelect(letter)}
              className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all md:p-6 ${
                isSelected
                  ? "border-[#ec5b13]/40 bg-[#ec5b13]/5"
                  : "border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#ec5b13]/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${
                    isSelected
                      ? "bg-[#ec5b13] text-white"
                      : "bg-[var(--tint)] text-text-secondary"
                  }`}
                >
                  {letter}
                </span>
                <MathText html={opt} className="font-medium text-heading" />
              </div>
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected
                    ? "border-[#ec5b13] bg-[#ec5b13]"
                    : "border-white/20"
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] font-bold text-white">
                    check
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Practice mode with feedback
  const gridCols =
    columns ??
    (options.length <= 3
      ? options.length
      : options.length <= 5
      ? options.length
      : 5);

  const gridClass = `grid gap-3 ${
    gridCols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : gridCols === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : gridCols === 4
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
  }`;

  return (
    <div className={gridClass}>
      {options.map((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const isSelected = selectedAnswer === letter;
        const isCorrectAnswer = result && letter === result.correctAnswer;
        const isWrongSelection = result && !result.isCorrect && isSelected;

        let btnClass: string;
        if (result) {
          if (isCorrectAnswer) {
            btnClass =
              "border-[#16a34a] bg-[#16a34a]/20 text-[#16a34a] ring-2 ring-[#16a34a]/30";
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
              if (!result) onSelect(letter);
            }}
            disabled={!!result}
            className={`rounded-xl border p-4 text-center transition-all ${btnClass}`}
          >
            <span className="block text-[10px] font-bold opacity-60">
              ({letter})
            </span>
            <MathText html={opt} className="mt-1 block text-sm font-medium" />
          </button>
        );
      })}
    </div>
  );
}
