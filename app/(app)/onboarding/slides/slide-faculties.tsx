"use client";

import { Check } from "lucide-react";
import { FACULTIES } from "@/components/ui/faculty-picker-dialog";

interface SlideFacultiesProps {
  selected: string[];
  onToggle: (id: string) => void;
  maxSelect?: number;
}

export default function SlideFaculties({ selected, onToggle, maxSelect = 3 }: SlideFacultiesProps) {
  const atMax = selected.length >= maxSelect;

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <div
            className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]"
            style={{ animation: "rise-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            Skoro gotovo
          </div>
          <h1
            className="mt-3 text-balance leading-[1]"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-heading)",
              animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 100ms both",
            }}
          >
            Za koji prijemni se spremaš?
          </h1>
        </div>

        <div
          className="ml-4 mt-2 shrink-0 rounded-full border px-3 py-1 text-sm tabular-nums"
          style={{
            borderColor: selected.length > 0 ? "var(--color-primary)" : "var(--glass-border)",
            background: selected.length > 0 ? "rgba(236,91,19,0.10)" : "var(--glass-bg)",
            color: selected.length > 0 ? "var(--color-heading)" : "var(--color-text-secondary)",
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 600,
            animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 200ms both",
            transition: "background 200ms, border-color 200ms, color 200ms",
          }}
        >
          {selected.length} / {maxSelect}
        </div>
      </div>

      <p
        className="mt-2 self-start max-w-xl text-pretty text-base md:text-lg"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-manrope), sans-serif",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 240ms both",
        }}
      >
        Izaberi do {maxSelect} fakulteta. Možeš ovo da promeniš kasnije u profilu.
      </p>

      <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {FACULTIES.map((f, i) => {
          const isSelected = selected.includes(f.id);
          const isDisabled = !isSelected && atMax;
          return (
            <button
              key={f.id}
              onClick={() => !isDisabled && onToggle(f.id)}
              disabled={isDisabled}
              className="group relative flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all duration-200 active:scale-[0.99]"
              style={{
                borderColor: isSelected ? "var(--color-primary)" : "var(--glass-border)",
                background: isSelected ? "rgba(236,91,19,0.10)" : "var(--glass-bg)",
                color: isSelected ? "var(--color-heading)" : "var(--color-text)",
                boxShadow: isSelected ? "0 0 22px rgba(236,91,19,0.25)" : "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                animation: `rise-in 500ms cubic-bezier(0.22,1,0.36,1) ${300 + i * 50}ms both`,
                opacity: isDisabled ? 0.4 : undefined,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 500,
                }}
              >
                {f.name}
              </span>
              {isSelected && (
                <span
                  className="ml-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--color-primary)", color: "#fff" }}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
