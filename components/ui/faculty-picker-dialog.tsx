"use client";

import { useState } from "react";
import { GraduationCap, X, Check } from "lucide-react";

const FACULTIES = [
  { id: "etf", name: "Elektrotehnički fakultet (ETF)" },
  { id: "fon", name: "Fakultet organizacionih nauka (FON)" },
  { id: "rgf", name: "Rudarsko-geološki fakultet (RGF)" },
  { id: "matf", name: "Matematički fakultet (MATF)" },
  { id: "masf", name: "Mašinski fakultet" },
  { id: "grf", name: "Građevinski fakultet" },
  { id: "tmf", name: "Tehnološko-metalurški fakultet" },
  { id: "sf", name: "Saobraćajni fakultet" },
  { id: "ff", name: "Fizički fakultet" },
  { id: "other", name: "Drugi fakultet" },
];

interface FacultyPickerDialogProps {
  open: boolean;
  current: string | null;
  onSelect: (facultyId: string) => void;
  onClose: () => void;
  loading?: boolean;
}

export { FACULTIES };

export default function FacultyPickerDialog({
  open,
  current,
  onSelect,
  onClose,
  loading,
}: FacultyPickerDialogProps) {
  const [selected, setSelected] = useState(current || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary transition hover:text-text"
        >
          <X size={20} />
        </button>

        <div className="mb-1 flex items-center gap-2">
          <GraduationCap size={22} className="text-[#60a5fa]" />
          <h2 className="text-lg font-bold text-text">Izaberi fakultet</h2>
        </div>
        <p className="mb-5 text-sm text-text-secondary">
          Za koji fakultet se spremaš?
        </p>

        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {FACULTIES.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm transition ${
                selected === f.id
                  ? "border-[#60a5fa] bg-[#60a5fa]/10 text-text"
                  : "border-border bg-bg/50 text-text-secondary hover:border-[#60a5fa]/30 hover:text-text"
              }`}
            >
              <span className="font-medium">{f.name}</span>
              {selected === f.id && <Check size={16} className="text-[#60a5fa]" />}
            </button>
          ))}
        </div>

        <button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected || loading}
          className="mt-5 w-full rounded-xl bg-[#60a5fa] px-6 py-3 font-semibold text-white transition hover:bg-[#3b82f6] disabled:opacity-50"
        >
          {loading ? "Čuvanje..." : "Potvrdi"}
        </button>
      </div>
    </div>
  );
}
