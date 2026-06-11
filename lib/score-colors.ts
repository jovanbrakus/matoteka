/** Unified readiness-score color scale used across dashboard and practice pages. */
export function scoreColor(s: number): string {
  if (s >= 80) return "#10b981";
  if (s >= 60) return "#f59e0b";
  if (s >= 40) return "#f97316";
  return "#ef4444";
}

export function readinessLabel(s: number): string {
  if (s >= 80) return "Odlična pripremljenost";
  if (s >= 60) return "Dobra pripremljenost";
  if (s >= 40) return "Potrebno još vežbanja";
  return "Tek na početku";
}
