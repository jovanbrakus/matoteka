"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0604]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ec5b13] shadow-[0_0_15px_rgba(236,91,19,0.3)]">
            <Image src="/logo-56.png" alt="TataMata" width={20} height={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Tata<span className="text-[#4ade80]">Mata</span>
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
