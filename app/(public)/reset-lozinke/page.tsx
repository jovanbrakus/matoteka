"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Lozinka mora imati najmanje 8 karaktera.");
      return;
    }
    if (password !== confirm) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Greška pri promeni lozinke. Pokušaj ponovo.");
        setLoading(false);
        return;
      }
      router.replace("/prijava?reset=1");
    } catch {
      setError("Greška pri promeni lozinke. Pokušaj ponovo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--glass-border)] bg-card p-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-3">
          <img src="/logo-brain.png" alt="Matoteka" className="h-10 w-10" />
          <span className="text-3xl font-semibold text-heading" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
            Matoteka
          </span>
        </div>

        {!token ? (
          <div className="mt-6">
            <h1 className="mb-3 text-xl font-semibold text-heading">Link nije važeći</h1>
            <p className="mb-6 text-text-secondary">
              Nedostaje token za promenu lozinke. Zatraži novi link.
            </p>
            <Link
              href="/zaboravljena-lozinka"
              className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow"
            >
              Zatraži novi link
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-text-secondary">Postavi novu lozinku za svoj nalog.</p>

            <form onSubmit={handleSubmit} className="mb-6 space-y-4 text-left">
              <div>
                <label htmlFor="password" className="mb-1 block text-sm text-text-secondary">
                  Nova lozinka
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-dark px-4 py-3 text-text placeholder-muted focus:border-primary focus:outline-none"
                  placeholder="Najmanje 8 karaktera"
                />
              </div>
              <div>
                <label htmlFor="confirm" className="mb-1 block text-sm text-text-secondary">
                  Potvrdi novu lozinku
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-dark px-4 py-3 text-text placeholder-muted focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-sm text-error">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow disabled:opacity-50"
              >
                {loading ? "Čuvanje..." : "Sačuvaj novu lozinku"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetInner />
    </Suspense>
  );
}
