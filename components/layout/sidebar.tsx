"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  GraduationCap,
  User,
  LogOut,
} from "lucide-react";

interface SidebarUser {
  displayName: string;
  avatarUrl?: string | null;
}

interface SidebarProps {
  user: SidebarUser;
}

const NAV_ITEMS = [
  {
    href: "/",
    label: "Kontrolna tabla",
    icon: LayoutDashboard,
  },
  {
    href: "/analitika",
    label: "Analitika uspeha",
    icon: BarChart3,
  },
  {
    href: "/ispit",
    label: "Vezbe & Simulacije",
    icon: BookOpen,
  },
  {
    href: "/materijali",
    label: "Materijali",
    icon: GraduationCap,
  },
  {
    href: "/profil",
    label: "Korisnicki profil",
    icon: User,
  },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-white/5 lg:flex glass-card">
      {/* Logo */}
      <div className="p-8">
        <Link href="/" className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(19,91,236,0.3)]">
            <Image src="/logo-56.png" alt="TataMata" width={24} height={22} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Tata<span className="text-[#4ade80]">Mata</span>
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="mt-10 space-y-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "border border-[#ec5b13]/20 bg-[#ec5b13]/10 text-[#ec5b13]"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <Icon size={20} className={active ? "fill-current" : ""} />
                <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User section at bottom */}
      <div className="mt-auto border-t border-white/5 p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#ec5b13]/50">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#ec5b13]/20 text-sm font-bold text-[#ec5b13]">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{user.displayName}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ec5b13]">
              Sezona 2026
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-auto text-slate-500 hover:text-white"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
