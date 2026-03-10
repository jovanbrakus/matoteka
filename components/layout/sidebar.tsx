"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SidebarUser {
  displayName: string;
  avatarUrl?: string | null;
}

interface SidebarProps {
  user: SidebarUser;
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

const NAV_ITEMS = [
  { href: "/", label: "Kontrolna tabla", shortLabel: "Početna", icon: "dashboard" },
  { href: "/vezbe", label: "Slobodna vežba", shortLabel: "Vežba", icon: "menu_book" },
  { href: "/simulacija", label: "Simulacija testa", shortLabel: "Simulacija", icon: "quiz" },
  { href: "/analitika", label: "Analitika uspeha", shortLabel: "Analitika", icon: "analytics" },
  { href: "/simulacija/istorija", label: "Istorija testova", shortLabel: "Istorija", icon: "history" },
];

const BOTTOM_ITEMS = [
  { href: "/profil", label: "Profil", shortLabel: "Profil", icon: "person" },
];

export default function Sidebar({ user, collapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={`flex h-full flex-shrink-0 flex-col border-r border-[var(--glass-border)] bg-surface-dark transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      {/* Logo + Toggle */}
      <div className={`flex items-center ${collapsed ? "justify-center px-0 py-6" : "justify-between px-6 py-6"}`}>
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#ec5b13] shadow-[0_0_15px_rgba(236,91,19,0.3)]">
            <Image src="/logo-56.png" alt="TataMata" width={24} height={22} />
          </div>
          {!collapsed && (
            <h2 className="text-lg font-bold tracking-tight text-heading whitespace-nowrap">
              Tata<span className="text-[#4ade80]">Mata</span>
            </h2>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-[var(--tint)] hover:text-heading transition-colors"
            title="Skupi meni"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-[var(--tint)] hover:text-heading transition-colors"
          title="Proširi meni"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      )}

      {/* Navigation */}
      <nav className={`flex-1 ${collapsed ? "px-2" : "px-3"} space-y-1`}>
        {NAV_ITEMS.map(({ href, label, shortLabel, icon }) => {
          const active = isActive(href);

          if (collapsed) {
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`flex flex-col items-center gap-1 rounded-xl px-1 py-3 transition-all ${
                  active
                    ? "text-[#ec5b13]"
                    : "text-muted hover:text-[#ec5b13]"
                }`}
                title={label}
              >
                <span className={`material-symbols-outlined text-[22px] ${active ? "fill-1" : ""}`}>
                  {icon}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-tight text-center leading-tight">
                  {shortLabel}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[#ec5b13]"
                  : "text-text-secondary hover:bg-[var(--tint)] hover:text-heading"
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${active ? "fill-1" : ""}`}>
                {icon}
              </span>
              <span className={`text-sm whitespace-nowrap ${active ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className={`border-t border-[var(--glass-border)] ${collapsed ? "px-2 py-4" : "px-3 py-4"}`}>
        {/* Theme toggle */}
        <div className={`mb-3 ${collapsed ? "flex justify-center" : "flex justify-center"}`}>
          <ThemeToggle collapsed={collapsed} />
        </div>

        {/* Bottom nav items */}
        {BOTTOM_ITEMS.map(({ href, label, shortLabel, icon }) => {
          const active = isActive(href);

          if (collapsed) {
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`flex flex-col items-center gap-1 rounded-xl px-1 py-3 transition-all ${
                  active
                    ? "text-[#ec5b13]"
                    : "text-muted hover:text-[#ec5b13]"
                }`}
                title={label}
              >
                <span className={`material-symbols-outlined text-[22px] ${active ? "fill-1" : ""}`}>
                  {icon}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-tight">
                  {shortLabel}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[#ec5b13]"
                  : "text-text-secondary hover:bg-[var(--tint)] hover:text-heading"
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${active ? "fill-1" : ""}`}>
                {icon}
              </span>
              <span className={`text-sm whitespace-nowrap ${active ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
            </Link>
          );
        })}

        {/* Logout */}
        {collapsed ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full flex-col items-center gap-1 rounded-xl px-1 py-3 text-muted hover:text-error transition-all"
            title="Odjavi se"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-[9px] font-bold uppercase tracking-tight">Odjava</span>
          </button>
        ) : (
          <div className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3">
            <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#ec5b13]/40">
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
              <p className="truncate text-sm font-bold text-heading">{user.displayName}</p>
              <p className="text-[10px] text-muted">Sezona 2026</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-muted hover:text-error transition-colors"
              title="Odjavi se"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
