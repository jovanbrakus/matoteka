"use client";

import { useState, useRef, useEffect } from "react";
import { GraduationCap, X, Check, ChevronDown } from "lucide-react";

export const FACULTIES = [
  { id: "etf", name: "Elektrotehnički fakultet", short: "ETF" },
  { id: "fon", name: "Fakultet organizacionih nauka", short: "FON" },
  { id: "rgf", name: "Rudarsko-geološki fakultet", short: "RGF" },
  { id: "matf", name: "Matematički fakultet", short: "MATF" },
  { id: "masf", name: "Mašinski fakultet", short: "MF" },
  { id: "grf", name: "Građevinski fakultet", short: "GRF" },
  { id: "tmf", name: "Tehnološko-metalurški fakultet", short: "TMF" },
  { id: "sf", name: "Saobraćajni fakultet", short: "SF" },
  { id: "ff", name: "Fizički fakultet", short: "FF" },
  { id: "ftn", name: "Fakultet tehničkih nauka", short: "FTN" },
] as const;

const OTHER_OPTION = { id: "other", name: "Ostalo (Other)", short: "Ostalo" };

const MAX_FACULTIES = 3;

interface FacultyMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export default function FacultyMultiSelect({
  selected,
  onChange,
  error,
}: FacultyMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainSelected = selected.filter((id) => id !== "other");
  const hasOther = selected.includes("other");
  const canAddMore = mainSelected.length < MAX_FACULTIES;

  function toggleFaculty(id: string) {
    if (id === "other") {
      if (hasOther) {
        onChange(selected.filter((s) => s !== "other"));
      } else {
        onChange([...selected, "other"]);
      }
      return;
    }

    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (canAddMore) {
      onChange([...selected, id]);
    }
  }

  function removeFaculty(id: string) {
    onChange(selected.filter((s) => s !== id));
  }

  function getFacultyLabel(id: string): string {
    if (id === "other") return OTHER_OPTION.short;
    return FACULTIES.find((f) => f.id === id)?.short || id;
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
        <GraduationCap size={15} />
        Ciljani fakulteti
        <span className="text-xs text-[var(--color-muted)]">(do {MAX_FACULTIES} + Ostalo)</span>
      </label>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {selected.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-sm font-medium text-amber-400 border border-amber-500/25"
            >
              {getFacultyLabel(id)}
              <button
                type="button"
                onClick={() => removeFaculty(id)}
                className="ml-0.5 rounded-full p-0.5 transition hover:bg-amber-500/20"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition ${
          isOpen
            ? "border-amber-500 bg-[var(--color-bg)]"
            : error
            ? "border-red-500/50 bg-[var(--color-bg)]"
            : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-amber-500/50"
        } text-[var(--color-text)]`}
      >
        <span className={selected.length === 0 ? "text-[var(--color-muted)]" : ""}>
          {selected.length === 0
            ? "Izaberi fakultete..."
            : `${selected.length} izabrano`}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--color-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-2xl">
          <div className="max-h-72 overflow-y-auto p-1.5">
            {/* Main faculties */}
            {FACULTIES.map((f) => {
              const isSelected = selected.includes(f.id);
              const isDisabled = !isSelected && !canAddMore;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => !isDisabled && toggleFaculty(f.id)}
                  disabled={isDisabled}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-amber-500/10 text-amber-400"
                      : isDisabled
                      ? "cursor-not-allowed text-[var(--color-muted)] opacity-40"
                      : "text-[var(--color-text)] hover:bg-[var(--color-surface-lighter)]"
                  }`}
                >
                  <div>
                    <span className="font-medium">{f.short}</span>
                    <span className="ml-2 text-xs text-[var(--color-muted)]">
                      {f.name}
                    </span>
                  </div>
                  {isSelected && <Check size={16} className="text-amber-400" />}
                </button>
              );
            })}

            {/* Divider */}
            <div className="my-1 border-t border-[var(--color-border)]" />

            {/* Other option */}
            <button
              type="button"
              onClick={() => toggleFaculty("other")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                hasOther
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-lighter)]"
              }`}
            >
              <span className="font-medium">{OTHER_OPTION.name}</span>
              {hasOther && <Check size={16} className="text-amber-400" />}
            </button>
          </div>

          {!canAddMore && (
            <div className="border-t border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-muted)]">
              Maksimum {MAX_FACULTIES} fakulteta izabrano
            </div>
          )}
        </div>
      )}
    </div>
  );
}
