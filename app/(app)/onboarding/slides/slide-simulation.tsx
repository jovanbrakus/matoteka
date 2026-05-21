"use client";

const READINESS = [
  { name: "Algebra", value: 85, color: "var(--color-primary)" },
  { name: "Jednačine", value: 72, color: "var(--color-secondary)" },
  { name: "Geometrija", value: 68, color: "var(--color-accent)" },
  { name: "Analiza", value: 55, color: "var(--color-accent2)" },
  { name: "Trigonometrija", value: 80, color: "var(--color-banana)" },
];

const TOTAL = 73;
const RADIUS = 56;
const CIRC = 2 * Math.PI * RADIUS;
const DASH_END = CIRC * (1 - TOTAL / 100);

export default function SlideSimulation() {
  // Strongest / weakest
  const strongest = READINESS.reduce((a, b) => (b.value > a.value ? b : a));
  const weakest = READINESS.reduce((a, b) => (b.value < a.value ? b : a));

  return (
    <div className="flex w-full max-w-5xl flex-col items-center">
      <div
        className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]"
        style={{ animation: "rise-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        Probni test
      </div>
      <h1
        className="mt-3 text-balance text-center leading-[1]"
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "var(--color-heading)",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 100ms both",
        }}
      >
        Spremnost koju možeš da izmeriš.
      </h1>
      <p
        className="mt-4 max-w-2xl text-pretty text-center text-base md:text-lg"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-manrope), sans-serif",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 220ms both",
        }}
      >
        Pravi prijemni format: tačan broj zadataka, tačno vreme. Posle — vidiš
        gde si jak i šta još treba.
      </p>

      {/* Readiness card */}
      <div
        className="mt-8 w-full rounded-3xl border p-6 md:p-8"
        style={{
          borderColor: "rgba(236,91,19,0.15)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 30px 80px -30px rgba(236,91,19,0.25)",
          animation: "rise-in 700ms cubic-bezier(0.22,1,0.36,1) 350ms both",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[180px_1fr]">
          {/* Gauge */}
          <div className="relative mx-auto h-[150px] w-[150px]">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
              <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="var(--glass-border)" strokeWidth="10" />
              <circle
                cx="70"
                cy="70"
                r={RADIUS}
                fill="none"
                stroke="url(#gauge-grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={DASH_END}
                style={{
                  ["--dash-start" as string]: `${CIRC}`,
                  ["--dash-end" as string]: `${DASH_END}`,
                  animation: "gauge-sweep 1100ms cubic-bezier(0.22,1,0.36,1) 600ms both",
                }}
              />
              <defs>
                <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 600,
                  fontSize: 38,
                  color: "var(--color-heading)",
                  lineHeight: 1,
                }}
              >
                {TOTAL}%
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--color-text-secondary)" }}>
                Spremnost
              </div>
            </div>
          </div>

          {/* Bars */}
          <div className="flex flex-col gap-3">
            {READINESS.map((row, i) => (
              <div key={row.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--color-text)", fontFamily: "var(--font-manrope), sans-serif" }}>
                      {row.name}
                    </span>
                    {row.name === strongest.name && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: "rgba(74,222,128,0.12)",
                          color: "var(--color-success)",
                        }}
                      >
                        Najjači
                      </span>
                    )}
                    {row.name === weakest.name && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: "rgba(251,191,36,0.12)",
                          color: "var(--color-warning)",
                        }}
                      >
                        Treba još
                      </span>
                    )}
                  </div>
                  <span
                    className="tabular-nums"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {row.value}%
                  </span>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full"
                  style={{ background: "var(--tint)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: row.color,
                      width: `${row.value}%`,
                      ["--bar-target" as string]: `${row.value}%`,
                      animation: `bar-fill 850ms cubic-bezier(0.22,1,0.36,1) ${750 + i * 110}ms both`,
                      boxShadow: `0 0 18px ${row.color}55`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
        style={{ animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 1100ms both" }}
      >
        {[
          { icon: "schedule", title: "Vremenski ograničen mod", sub: "Tačno onoliko minuta koliko traje pravi prijemni." },
          { icon: "verified", title: "Pravi prijemni format", sub: "Isti broj zadataka, ista bodovanja kao na fakultetu." },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-2xl border p-4"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)" }}
          >
            <span
              className="material-symbols-outlined fill-1 mt-0.5"
              style={{ fontSize: 22, color: "var(--color-primary)" }}
            >
              {item.icon}
            </span>
            <div>
              <div
                style={{
                  color: "var(--color-heading)",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontWeight: 600,
                }}
              >
                {item.title}
              </div>
              <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
