"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";

interface AuthenticatedLayoutProps {
  user: { displayName: string; avatarUrl: string | null };
  children: React.ReactNode;
}

const SIDEBAR_KEY = "matoteka-sidebar-collapsed";

export default function AuthenticatedLayout({
  user,
  children,
}: AuthenticatedLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_KEY);
    if (stored === "true") setCollapsed(true);
    setMounted(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  }

  // Onboarding doesn't need sidebar
  const skipSidebar = pathname === "/onboarding";

  if (skipSidebar) {
    return <>{children}</>;
  }

  return (
    <div
      className="flex h-screen overflow-hidden bg-bg"
      style={{
        background:
          "radial-gradient(circle at 50% -20%, var(--gradient-top) 0%, var(--color-bg) 100%)",
      }}
    >
      {/* Desktop sidebar */}
      <div className={`hidden lg:flex transition-all duration-300 ${!mounted ? "w-[260px]" : ""}`}>
        <Sidebar
          user={user}
          collapsed={mounted ? collapsed : false}
          onToggle={toggleCollapsed}
        />
      </div>

      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-[var(--glass-border)] bg-surface-dark/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Matoteka" className="h-8 w-8" />
          <span className="text-lg font-semibold text-heading" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Matoteka
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-muted"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative h-full w-[260px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              user={user}
              collapsed={false}
              onToggle={() => {}}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="relative flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
