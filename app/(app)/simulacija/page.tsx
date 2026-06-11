"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  Edit3,
  Zap,
  Timer,
  Infinity,
  Play,
  X,
  Info,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/ui/section-label";

type TestSize = 20 | 14 | 8;
type TestMode = "timed" | "untimed";

const TEST_SIZES: {
  size: TestSize;
  label: string;
  count: string;
  description: string;
  badge?: string;
  icon: typeof ClipboardList;
}[] = [
  {
    size: 20,
    label: "Kompletan test",
    count: "20 zadataka",
    description: "Simulacija mature",
    badge: "SIMULACIJA MATURE",
    icon: ClipboardList,
  },
  {
    size: 14,
    label: "Srednji test",
    count: "14 zadataka",
    description: "Svakodnevna vežba",
    icon: Edit3,
  },
  {
    size: 8,
    label: "Brzi test",
    count: "8 zadataka",
    description: "Brza provera",
    icon: Zap,
  },
];

function getDurationMinutes(testSize: TestSize): number {
  return Math.round((testSize / 20) * 180);
}

export default function SimulacijaPage() {
  const router = useRouter();
  const [testSize, setTestSize] = useState<TestSize>(20);
  const [mode, setMode] = useState<TestMode>("timed");
  const [loading, setLoading] = useState(false);

  async function startSimulation() {
    setLoading(true);
    try {
      const res = await fetch("/api/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testSize, mode }),
      });
      const data = await res.json();
      if (data.examId) {
        router.push(`/simulacija/${data.examId}`);
      }
    } catch (err) {
      console.error("Failed to start simulation:", err);
    }
    setLoading(false);
  }

  const durationMin = getDurationMinutes(testSize);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto">
      {/* Background overlay — content area only */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'var(--overlay-bg)' }} />

      {/* Modal */}
      <div className="dash-rise relative mx-4 my-8 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-card shadow-2xl backdrop-blur-xl">
        <div className="noise-overlay" />
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec5b13, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between px-8 pb-4 pt-8">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-heading">
              Simulacija ispita
              <span className="text-[#ec5b13]">.</span>
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Podesi test i proveri svoju spremnost u realnim uslovima.
            </p>
          </div>
          <Link
            href="/"
            aria-label="Zatvori"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--tint)] text-text-secondary transition-colors hover:text-heading"
          >
            <X size={18} />
          </Link>
        </div>

        <div className="relative space-y-7 p-8 pt-4">
          {/* Step 1: Test Size */}
          <section>
            <div className="mb-4">
              <SectionLabel index="01">Veličina testa</SectionLabel>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {TEST_SIZES.map(({ size, label, count, description, badge, icon: Icon }) => {
                const isActive = testSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setTestSize(size)}
                    aria-pressed={isActive}
                    className={`cursor-pointer rounded-2xl p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border border-[#ec5b13]/50 bg-[#ec5b13]/10 shadow-[0_12px_36px_-12px_rgba(236,91,19,0.45)]"
                        : "border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:-translate-y-0.5 hover:border-[#ec5b13]/30"
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive ? "bg-[#ec5b13]/15 text-[#ec5b13]" : "bg-[var(--tint)] text-text-secondary"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          isActive ? "border-[#ec5b13]" : "border-[var(--glass-border)]"
                        }`}
                      >
                        {isActive && <span className="h-2.5 w-2.5 rounded-full bg-[#ec5b13]" />}
                      </span>
                    </div>
                    <h4 className="font-headline text-lg font-bold text-heading">{label}</h4>
                    <p className="mt-0.5 text-sm text-text-secondary">{count}</p>
                    <div
                      className={`mt-4 border-t pt-3 ${
                        isActive ? "border-[#ec5b13]/20" : "border-[var(--glass-border)]"
                      }`}
                    >
                      {badge ? (
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ec5b13]/80">
                          <Shield size={12} /> {badge}
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-muted">{description}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Mode */}
          <section>
            <div className="mb-4">
              <SectionLabel index="02">Režim rada</SectionLabel>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              {([
                {
                  id: "timed" as TestMode,
                  icon: Timer,
                  title: "Vremenski ograničen",
                  subtitle: (
                    <>
                      Ograničenje: <span className="font-bold">{durationMin} min</span>
                    </>
                  ),
                },
                {
                  id: "untimed" as TestMode,
                  icon: Infinity,
                  title: "Bez ograničenja",
                  subtitle: "Vežba bez stresa",
                },
              ]).map(({ id, icon: ModeIcon, title, subtitle }) => {
                const isActive = mode === id;
                return (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    aria-pressed={isActive}
                    className={`flex flex-1 items-center justify-between rounded-2xl p-4 transition-all ${
                      isActive
                        ? "border border-[#ec5b13]/50 bg-[#ec5b13]/10 shadow-[0_12px_36px_-12px_rgba(236,91,19,0.45)]"
                        : "border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#ec5b13]/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive ? "bg-[#ec5b13]/15 text-[#ec5b13]" : "bg-[var(--tint)] text-text-secondary"
                        }`}
                      >
                        <ModeIcon size={20} />
                      </span>
                      <span className="text-left">
                        <span className="block font-headline text-sm font-bold text-heading">{title}</span>
                        <span className={`block text-xs ${isActive ? "text-[#ec5b13]/80" : "text-muted"}`}>
                          {subtitle}
                        </span>
                      </span>
                    </div>
                    {isActive && <CheckCircle2 size={20} className="shrink-0 text-[#ec5b13]" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Start Button */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              onClick={startSimulation}
              disabled={loading}
              className="btn-shine flex items-center justify-center gap-3 rounded-full bg-[#ec5b13] px-12 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_14px_40px_-12px_rgba(236,91,19,0.7)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Kreiranje testa..." : "Započni test"}
              <Play size={18} fill="currentColor" />
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
              <Info size={12} />
              Tvoj napredak će biti automatski sačuvan u profilu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
