"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--glass-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-brain.png" alt="Matoteka" className="h-9 w-9" />
          <span className="text-2xl font-semibold text-heading" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
            Matoteka
          </span>
        </Link>

        {pathname === "/" && (
          <div className="hidden items-center gap-10 md:flex">
            <a href="#zadaci" className="text-sm font-medium text-text-secondary transition-colors hover:text-[#ec5b13]">Zadaci</a>
            <a href="#teorija" className="text-sm font-medium text-text-secondary transition-colors hover:text-[#ec5b13]">Teorija</a>
            <a href="#simulacija" className="text-sm font-medium text-text-secondary transition-colors hover:text-[#ec5b13]">Simulacija</a>
            <a href="#analitika" className="text-sm font-medium text-text-secondary transition-colors hover:text-[#ec5b13]">Analitika</a>
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <ThemeToggle collapsed />
          </div>

          {pathname !== "/prijava" ? (
            <Link
              href="/prijava"
              className="rounded-xl bg-[#ec5b13] px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-transform hover:scale-105"
            >
              Prijava
            </Link>
          ) : (
            <Link href="/" className="text-sm font-medium text-text-secondary transition-colors hover:text-heading">
              ← Nazad
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
