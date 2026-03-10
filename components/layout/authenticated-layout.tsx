"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";

interface AuthenticatedLayoutProps {
  user: { displayName: string; avatarUrl: string | null };
  children: React.ReactNode;
}

const SIDEBAR_KEY = "tatamata-sidebar-collapsed";

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
      className="flex h-screen overflow-hidden bg-[#0a0a0a]"
      style={{
        background:
          "radial-gradient(circle at 50% -20%, #2a1a12 0%, #0a0a0a 100%)",
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
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-56.png" alt="TataMata" width={24} height={22} />
          <span className="text-lg font-bold">
            Tata<span className="text-[#4ade80]">Mata</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400"
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
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
