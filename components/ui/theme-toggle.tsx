"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored || "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(t: "dark" | "light") {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }

  function switchTo(t: "dark" | "light") {
    if (t === theme) return;
    setTheme(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  }

  if (!mounted) return null;

  /* Collapsed: single icon button */
  if (collapsed) {
    return (
      <button
        onClick={() => switchTo(theme === "dark" ? "light" : "dark")}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--tint)] border border-[var(--glass-border)] text-muted hover:text-primary transition-colors"
        title={theme === "dark" ? "Svetla tema" : "Tamna tema"}
      >
        <span className="material-symbols-outlined text-[18px]">
          {theme === "dark" ? "light_mode" : "dark_mode"}
        </span>
      </button>
    );
  }

  /* Expanded: pill with two icons (matches reference design) */
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] p-1">
      <button
        onClick={() => switchTo("dark")}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
          theme === "dark"
            ? "bg-[#ec5b13]/20 text-[#ec5b13]"
            : "text-muted hover:bg-[var(--tint)]"
        }`}
        title="Tamna tema"
        aria-label="Tamna tema"
      >
        <span
          className="material-symbols-outlined text-[18px]"
          style={theme === "dark" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          dark_mode
        </span>
      </button>
      <button
        onClick={() => switchTo("light")}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
          theme === "light"
            ? "bg-[#ec5b13]/20 text-[#ec5b13]"
            : "text-muted hover:bg-[var(--tint)]"
        }`}
        title="Svetla tema"
        aria-label="Svetla tema"
      >
        <span
          className="material-symbols-outlined text-[18px]"
          style={theme === "light" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          light_mode
        </span>
      </button>
    </div>
  );
}
