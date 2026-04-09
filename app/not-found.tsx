import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stranica nije pronađena — Matoteka",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="mt-4 text-xl text-zinc-300">
        Stranica koju tražite ne postoji.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
      >
        Nazad na početnu
      </Link>
    </main>
  );
}
