"use client";

export default function SlidePractice() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
      {/* Left: copy */}
      <div className="flex flex-col">
        <div
          className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]"
          style={{ animation: "rise-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Vežbanje
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
          Izaberi kategoriju i ulazi u rešavanje.
        </h1>
        <p
          className="mt-4 max-w-md text-pretty text-base md:text-lg"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-manrope), sans-serif",
            animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 220ms both",
          }}
        >
          Preko 5000 zadataka sa rešenjima kroz korake — i AI tutor kad zapneš.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          {[
            { icon: "bolt", label: "5000+ zadataka", color: "var(--color-primary)" },
            { icon: "psychology", label: "AI tutor objašnjava korake", color: "var(--color-accent)" },
            { icon: "description", label: "Detaljna rešenja", color: "var(--color-banana)" },
          ].map((chip, i) => (
            <div
              key={chip.label}
              className="flex items-center gap-3 rounded-2xl border px-4 py-3"
              style={{
                borderColor: "var(--glass-border)",
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                animation: `rise-in 500ms cubic-bezier(0.22,1,0.36,1) ${350 + i * 110}ms both`,
              }}
            >
              <span
                className="material-symbols-outlined fill-1"
                style={{ fontSize: 22, color: chip.color }}
              >
                {chip.icon}
              </span>
              <span
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 500,
                }}
              >
                {chip.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: mock preview */}
      <div
        className="relative w-full"
        style={{
          animation: "rise-in 700ms cubic-bezier(0.22,1,0.36,1) 350ms both",
        }}
      >
        <div
          className="relative rounded-3xl border p-5"
          style={{
            borderColor: "var(--glass-border)",
            background: "var(--glass-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            transform: "perspective(1200px) rotateY(-6deg) rotateX(2deg)",
            boxShadow: "0 30px 80px -20px rgba(236,91,19,0.25)",
          }}
        >
          {/* Category tile */}
          <div
            className="flex items-center justify-between rounded-2xl border p-4"
            style={{
              borderColor: "var(--glass-border)",
              background: "var(--tint)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined fill-1"
                style={{ fontSize: 36, color: "var(--color-banana)" }}
              >
                change_history
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: 18,
                    color: "var(--color-heading)",
                  }}
                >
                  Trigonometrija
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  Lekcije i zadaci
                </div>
              </div>
            </div>
            {/* Progress ring */}
            <div className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--glass-border)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="var(--color-banana)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="94.2"
                  strokeDashoffset="17"
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold"
                style={{ color: "var(--color-heading)" }}
              >
                82%
              </div>
            </div>
          </div>

          {/* Sample problem card */}
          <div
            className="mt-4 rounded-2xl border p-4"
            style={{ borderColor: "var(--glass-border)", background: "var(--tint)" }}
          >
            <div
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Zadatak 7 · ETF 2023
            </div>
            <div
              className="mt-2 text-lg"
              style={{
                color: "var(--color-heading)",
                fontFamily: "var(--font-manrope), sans-serif",
              }}
            >
              Reši jednačinu <span style={{ fontStyle: "italic" }}>sin(2x) = √3 / 2</span> u intervalu [0, 2π].
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {["π/6", "π/3", "5π/6", "Sve od navedenog"].map((opt, i) => (
                <div
                  key={opt}
                  className="rounded-xl border px-3 py-2.5 text-sm"
                  style={{
                    borderColor: i === 3 ? "var(--color-primary)" : "var(--glass-border)",
                    background: i === 3 ? "rgba(236,91,19,0.08)" : "transparent",
                    color: i === 3 ? "var(--color-heading)" : "var(--color-text-secondary)",
                  }}
                >
                  <span className="mr-2 opacity-60">{String.fromCharCode(97 + i)})</span>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
