"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import OnboardingProgress from "./onboarding-progress";
import SlideWelcome from "./slides/slide-welcome";
import SlideCategories from "./slides/slide-categories";
import SlidePractice from "./slides/slide-practice";
import SlideSimulation from "./slides/slide-simulation";
import SlideFaculties from "./slides/slide-faculties";

const TOTAL_SLIDES = 5;
const NEXT_LABELS = ["Krenimo", "Dalje", "Dalje", "Dalje", "Počni"];

const GLYPHS = ["π", "∫", "√", "x²", "=", "∑", "∞", "θ", "Δ", "∂"];

interface OnboardingFlowProps {
  initialFaculties: string[];
  alreadyOnboarded: boolean;
}

export default function OnboardingFlow({
  initialFaculties,
  alreadyOnboarded,
}: OnboardingFlowProps) {
  const { update } = useSession();
  const [slide, setSlide] = useState(0);
  const [highest, setHighest] = useState(0);
  const [faculties, setFaculties] = useState<string[]>(initialFaculties);
  const [submitting, setSubmitting] = useState(false);
  const [bursting, setBursting] = useState(false);
  const finishButtonRef = useRef<HTMLButtonElement>(null);

  const isLast = slide === TOTAL_SLIDES - 1;
  const canFinish = faculties.length >= 1;

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= TOTAL_SLIDES) return;
      setSlide(idx);
      setHighest((h) => Math.max(h, idx));
    },
    [],
  );

  const next = useCallback(() => goTo(slide + 1), [slide, goTo]);
  const back = useCallback(() => goTo(slide - 1), [slide, goTo]);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      setSubmitting(true);
      try {
        const res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Greška");
        }
        // Pass explicit data so NextAuth re-issues the JWT cookie reliably.
        await update({
          ...(payload.targetFaculties !== undefined && {
            targetFaculties: payload.targetFaculties,
          }),
          onboardedAt: new Date(),
        });
        return true;
      } catch (err) {
        console.error("Onboarding submit failed", err);
        setSubmitting(false);
        return false;
      }
    },
    [update],
  );

  const skip = useCallback(async () => {
    const ok = await submit({});
    if (ok) window.location.assign("/vezba");
  }, [submit]);

  const finish = useCallback(async () => {
    if (!canFinish) return;
    const ok = await submit({ targetFaculties: faculties });
    if (!ok) return;
    setBursting(true);
    setTimeout(() => window.location.assign("/vezba"), 700);
  }, [canFinish, faculties, submit]);

  const handleNext = useCallback(() => {
    if (isLast) finish();
    else next();
  }, [isLast, finish, next]);

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        if (!isLast || canFinish) handleNext();
      } else if (e.key === "ArrowLeft") {
        back();
      } else if (e.key === "Escape" && !isLast) {
        skip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLast, canFinish, handleNext, back, skip]);

  const toggleFaculty = useCallback((id: string) => {
    setFaculties((prev) => {
      if (prev.includes(id)) return prev.filter((f) => f !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, []);

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 15% -10%, rgba(236,91,19,0.18), transparent 50%), " +
          "radial-gradient(circle at 90% 110%, rgba(14,165,233,0.14), transparent 55%), " +
          "var(--color-bg)",
      }}
    >
      {/* Floating math glyphs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {GLYPHS.map((g, i) => {
          const top = `${(i * 9 + 7) % 90}%`;
          const left = `${(i * 17 + 5) % 95}%`;
          const size = 36 + (i % 4) * 14;
          const rot = (i * 11) % 30 - 15;
          const dx = (i % 2 === 0 ? 1 : -1) * (6 + (i % 5));
          const dy = (i % 3 === 0 ? -1 : 1) * (8 + (i % 4));
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top,
                left,
                fontFamily: "var(--font-fredoka), serif",
                fontSize: size,
                color: "var(--color-heading)",
                opacity: 0.06,
                ["--rot" as string]: `${rot}deg`,
                ["--dx" as string]: `${dx}px`,
                ["--dy" as string]: `${dy}px`,
                animation: `drift ${10 + (i % 6)}s ease-in-out ${i * 0.4}s infinite`,
                userSelect: "none",
              }}
            >
              {g}
            </span>
          );
        })}
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          <span
            className="text-xl"
            style={{
              fontFamily: "var(--font-fredoka), sans-serif",
              fontWeight: 600,
              color: "var(--color-heading)",
            }}
          >
            Matoteka
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <div
            className="hidden text-sm tabular-nums sm:block"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-manrope), sans-serif",
            }}
          >
            {slide + 1} <span className="opacity-50">/</span> {TOTAL_SLIDES}
          </div>
          {!isLast && !alreadyOnboarded && (
            <button
              onClick={skip}
              disabled={submitting}
              className="text-sm transition hover:underline disabled:opacity-50"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-manrope), sans-serif",
              }}
            >
              Preskoči
            </button>
          )}
        </div>
      </header>

      {/* Slide content */}
      <main
        key={slide}
        className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-5 py-6 md:px-10"
        style={{
          animation: "slide-in 450ms cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {slide === 0 && <SlideWelcome alreadyOnboarded={alreadyOnboarded} />}
        {slide === 1 && <SlideCategories />}
        {slide === 2 && <SlidePractice />}
        {slide === 3 && <SlideSimulation />}
        {slide === 4 && (
          <SlideFaculties selected={faculties} onToggle={toggleFaculty} />
        )}
      </main>

      {/* Bottom bar */}
      <footer className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-5 py-5 md:px-10 md:py-6">
        <button
          onClick={back}
          disabled={slide === 0 || submitting}
          className="group flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Nazad
        </button>

        <OnboardingProgress
          current={slide}
          total={TOTAL_SLIDES}
          highestVisited={highest}
          onGoTo={goTo}
        />

        <div className="relative">
          <button
            ref={finishButtonRef}
            onClick={handleNext}
            disabled={(isLast && !canFinish) || submitting}
            className="group flex items-center gap-2 rounded-2xl px-5 py-3 text-sm transition-all hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 600,
              boxShadow: "0 0 24px rgba(236,91,19,0.4)",
            }}
          >
            {submitting ? (
              <>
                <Sparkles size={16} className="animate-pulse" />
                Čuvanje...
              </>
            ) : (
              <>
                {NEXT_LABELS[slide]}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {/* Confetti burst */}
          {bursting && (
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                const dist = 70 + (i % 3) * 18;
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;
                const colors = [
                  "var(--color-primary)",
                  "var(--color-accent)",
                  "var(--color-banana)",
                  "var(--color-secondary)",
                ];
                return (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 8,
                      height: 8,
                      marginTop: -4,
                      marginLeft: -4,
                      borderRadius: 999,
                      background: colors[i % colors.length],
                      ["--burst-x" as string]: `${x}px`,
                      ["--burst-y" as string]: `${y}px`,
                      animation: `burst 750ms cubic-bezier(0.22,1,0.36,1) both`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
