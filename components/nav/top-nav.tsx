"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0604]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Matoteka" className="h-9 w-9" />
          <span className="text-xl font-semibold text-white" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Matoteka
          </span>
        </Link>

        {pathname === "/" && (
          <div className="hidden items-center gap-10 md:flex">
            <a href="#zadaci" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#ec5b13]">Zadaci</a>
            <a href="#teorija" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#ec5b13]">Teorija</a>
            <a href="#simulacija" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#ec5b13]">Simulacija</a>
            <a href="#analitika" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#ec5b13]">Analitika</a>
          </div>
        )}

        {pathname !== "/prijava" ? (
          <div className="flex items-center gap-4">
            <Link
              href="/prijava"
              className="text-sm font-bold text-white transition-colors hover:text-[#ec5b13] px-5 py-2"
            >
              Prijava
            </Link>
            <Link
              href="/prijava"
              className="rounded-xl bg-[#ec5b13] px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-transform hover:scale-105"
            >
              Počni besplatno
            </Link>
          </div>
        ) : (
          <Link href="/" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            ← Nazad
          </Link>
        )}
      </div>
    </nav>
  );
}
