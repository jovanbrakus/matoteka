"use client";

export default function SlideWelcome({ alreadyOnboarded }: { alreadyOnboarded: boolean }) {
  const headline = alreadyOnboarded ? "Vrati se kad god želiš." : "Drago nam je što si tu.";
  const sub = alreadyOnboarded
    ? "Evo kratkog podsetnika kako Matoteka funkcioniše."
    : "Hajde da te provedem kroz Matoteku za pola minute.";

  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
      {/* Chalkboard equation echo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontSize: "clamp(4rem, 14vw, 9rem)",
          color: "var(--color-heading)",
          opacity: 0.04,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
        }}
      >
        x² + 2x − 3 = 0
      </div>

      <div
        className="relative mb-6"
        style={{ animation: "mascot-in 600ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <img
          src="/logo.svg"
          alt=""
          className="h-44 w-44 md:h-56 md:w-56"
          style={{
            animation: "float 6s ease-in-out infinite",
            filter: "drop-shadow(0 12px 32px rgba(236,91,19,0.35))",
            transform: "rotate(-4deg)",
          }}
        />
      </div>

      <div
        className="relative text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]"
        style={{ animation: "rise-in 500ms cubic-bezier(0.22,1,0.36,1) 100ms both" }}
      >
        Zdravo
      </div>

      <h1
        className="relative mt-3 text-balance leading-[0.95]"
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          color: "var(--color-heading)",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 200ms both",
        }}
      >
        {headline}
      </h1>

      <p
        className="relative mt-5 max-w-lg text-pretty text-base md:text-lg"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-manrope), sans-serif",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 350ms both",
        }}
      >
        {sub}
      </p>
    </div>
  );
}
