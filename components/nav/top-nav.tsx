"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  Trophy,
  User,
  Bookmark,
  Bot,
  LogOut,
  Menu,
  X,
  Dumbbell,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/vezbe", label: "Vežba", icon: Dumbbell },
  { href: "/zadaci", label: "Zadaci", icon: BookOpen },
  { href: "/simulacija", label: "Simulacija", icon: ClipboardList },
  { href: "/analitika", label: "Analitika", icon: BarChart3 },
  { href: "/rang-lista", label: "Rang lista", icon: Trophy },
  { href: "/ai", label: "AI Tutor", icon: Bot },
  { href: "/sacuvano", label: "Sačuvano", icon: Bookmark },
  { href: "/profil", label: "Profil", icon: User },
];

export function TopNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide TopNav on the dashboard page (homepage when logged in) — the dashboard has its own sidebar
  if (pathname === "/" && session?.user) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#334155] bg-[#0f172a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image src="/logo-56.png" alt="TataMata" width={28} height={26} />
          <span className="bg-gradient-to-r from-[#4ade80] to-[#a3e635] bg-clip-text text-transparent">
            TataMata
          </span>
        </Link>

        {session?.user && (
          <>
            {/* Desktop nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    pathname.startsWith(href)
                      ? "bg-[#1e293b] text-amber-500"
                      : "text-[#94a3b8] hover:text-[#e2e8f0]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <ThemeToggle />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-2 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[#94a3b8] hover:text-[#f87171]"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="text-[#94a3b8]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </>
        )}

        {!session?.user && pathname !== "/prijava" && (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/prijava"
              className="rounded-lg bg-[#60a5fa] px-4 py-2 text-sm font-medium text-white hover:bg-[#3b82f6]"
            >
              Prijavi se
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && session?.user && (
        <div className="border-t border-[#334155] bg-[#0f172a] px-4 py-2 md:hidden">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
                pathname.startsWith(href)
                  ? "text-amber-500"
                  : "text-[#94a3b8]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
