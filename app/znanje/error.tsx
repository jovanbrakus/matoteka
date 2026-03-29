"use client";

import { useEffect } from "react";

export default function ZnanjeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Knowledge error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-4xl">⚠</div>
      <h2 className="text-xl font-semibold text-heading">Greška pri učitavanju lekcije</h2>
      <p className="max-w-md text-text-secondary">
        Došlo je do greške prilikom učitavanja sadržaja.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-glow"
        >
          Pokušaj ponovo
        </button>
        <a
          href="/znanje"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-lighter"
        >
          Nazad na lekcije
        </a>
      </div>
    </div>
  );
}
