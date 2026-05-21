"use client";

interface OnboardingProgressProps {
  current: number;
  total: number;
  highestVisited: number;
  onGoTo: (idx: number) => void;
}

export default function OnboardingProgress({
  current,
  total,
  highestVisited,
  onGoTo,
}: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2.5">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isVisited = i <= highestVisited;
        const isClickable = i <= highestVisited;
        return (
          <button
            key={i}
            onClick={() => isClickable && onGoTo(i)}
            aria-label={`Korak ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: isActive ? 28 : 10,
              height: 10,
              borderRadius: 999,
              background: isActive
                ? "var(--color-primary)"
                : isVisited
                  ? "rgba(236,91,19,0.45)"
                  : "var(--color-border)",
              boxShadow: isActive ? "0 0 14px rgba(236,91,19,0.55)" : "none",
              cursor: isClickable ? "pointer" : "default",
            }}
          />
        );
      })}
    </div>
  );
}
