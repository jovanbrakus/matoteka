"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FACULTIES } from "@/components/ui/faculty-multi-select";

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
  { href: "/vezba", label: "Slobodna vežba", shortLabel: "Vežba", icon: "menu_book" },
  { href: "/simulacija", label: "Simulacija testa", shortLabel: "Simulacija", icon: "quiz" },
  { href: "/simulacija/istorija", label: "Istorija testova", shortLabel: "Istorija", icon: "history" },
  { href: "/znanje", label: "Centar znanja", shortLabel: "Znanje", icon: "auto_stories" },
];

const ADMIN_ITEMS = [
  { href: "/admin", label: "Admin panel", shortLabel: "Admin", icon: "admin_panel_settings" },
];

const BOTTOM_ITEMS = [
  { href: "/profil", label: "Profil", shortLabel: "Profil", icon: "person" },
];

function getFacultyShort(id: string): string | null {
  if (id === "other") return null;
  return FACULTIES.find((f) => f.id === id)?.short || null;
}

export default function Sidebar({ user, collapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role as string | undefined;
  const targetFaculties = (session?.user?.targetFaculties as string[]) || [];
  const facultyShorts = targetFaculties
    .map(getFacultyShort)
    .filter((s): s is string => s !== null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    // For /simulacija, don't match /simulacija/istorija (which has its own nav item)
    if (href === "/simulacija") return pathname.startsWith("/simulacija") && !pathname.startsWith("/simulacija/istorija");
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
          <img src="/logo.svg" alt="Matoteka" className="h-12 w-12 flex-shrink-0" />
          {!collapsed && (
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-heading whitespace-nowrap" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
                Matoteka
              </h2>
              {facultyShorts.length > 0 && (
                <div className="flex gap-2 mt-0.5">
                  {facultyShorts.map((s) => (
                    <span key={s} className="text-[10px] font-bold uppercase tracking-wider text-[#ec5b13]">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
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

        {/* Admin navigation */}
        {userRole === "admin" && (
          <>
            <hr className="my-2 border-[var(--glass-border)]" />
            {ADMIN_ITEMS.map(({ href, label, shortLabel, icon }) => {
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
          </>
        )}
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
