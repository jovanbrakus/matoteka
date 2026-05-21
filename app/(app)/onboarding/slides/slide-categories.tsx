"use client";

const CATEGORIES = [
  {
    name: "Algebra",
    image: "/images/onboarding/categories/algebra.png",
    color: "var(--color-primary)",
    tagline: "Promenljive, izrazi i polinomi",
  },
  {
    name: "Jednačine",
    image: "/images/onboarding/categories/jednacine.png",
    color: "var(--color-secondary)",
    tagline: "Reši za x — linearne, kvadratne, iracionalne",
  },
  {
    name: "Geometrija",
    image: "/images/onboarding/categories/geometrija.png",
    color: "var(--color-accent)",
    tagline: "Oblici, površine i tela",
  },
  {
    name: "Analiza",
    image: "/images/onboarding/categories/analiza.png",
    color: "var(--color-accent2)",
    tagline: "Funkcije, granice, izvodi",
  },
  {
    name: "Trigonometrija",
    image: "/images/onboarding/categories/trigonometrija.png",
    color: "var(--color-banana)",
    tagline: "Sinus, kosinus, ugao",
  },
];

export default function SlideCategories() {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center">
      <div
        className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]"
        style={{ animation: "rise-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        Pet oblasti
      </div>
      <h1
        className="mt-3 text-balance text-center leading-[1]"
        style={{
          fontFamily: "var(--font-fredoka), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3.75rem)",
          color: "var(--color-heading)",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 100ms both",
        }}
      >
        Cela matematika u 5 kraljevstava
      </h1>
      <p
        className="mt-4 max-w-xl text-pretty text-center text-base md:text-lg"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-manrope), sans-serif",
          animation: "rise-in 600ms cubic-bezier(0.22,1,0.36,1) 220ms both",
        }}
      >
        Svaka oblast je raščlanjena na lekcije, primere i prijemne zadatke.
      </p>

      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: "var(--glass-border)",
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              animation: `rise-in 600ms cubic-bezier(0.22,1,0.36,1) ${300 + i * 90}ms both`,
              boxShadow: `0 14px 44px -22px ${cat.color}66`,
            }}
          >
            {/* Image area */}
            <div
              className="relative aspect-square w-full overflow-hidden"
              style={{ background: "#0a0705" }}
            >
              <img
                src={cat.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                loading="lazy"
                decoding="async"
              />
              {/* vignette that merges image into card */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 55%, rgba(10,7,5,0.55) 100%)",
                }}
              />
              {/* color-accent hairline */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${cat.color}, transparent)`,
                  boxShadow: `0 0 12px ${cat.color}`,
                  opacity: 0.85,
                }}
              />
            </div>

            {/* Text area */}
            <div className="px-4 pb-5 pt-4">
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "var(--color-heading)",
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.name}
              </div>
              <div
                className="mt-1.5 text-sm leading-snug"
                style={{
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-manrope), sans-serif",
                }}
              >
                {cat.tagline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
