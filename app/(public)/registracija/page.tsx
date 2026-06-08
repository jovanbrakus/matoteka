"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (displayName.trim().length < 2) {
      setError("Unesi ime (najmanje 2 karaktera).");
      return;
    }
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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: displayName.trim(), email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Greška pri registraciji. Pokušaj ponovo.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Greška pri registraciji. Pokušaj ponovo.");
    }
    setLoading(false);
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

        {submitted ? (
          <div className="mt-6">
            <h1 className="mb-3 text-xl font-semibold text-heading">Proveri svoj mejl</h1>
            <p className="mb-2 text-text-secondary">
              Poslali smo ti link za potvrdu na <strong className="text-text">{email}</strong>.
            </p>
            <p className="mb-6 text-sm text-text-secondary">
              Otvori mejl i klikni na dugme da aktiviraš nalog. Ako ne vidiš mejl, proveri i „Spam” / „Promocije”.
            </p>
            <Link
              href="/prijava"
              className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow"
            >
              Nazad na prijavu
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-text-secondary">Napravi nalog i počni sa pripremom</p>

            <form onSubmit={handleSubmit} className="mb-6 space-y-4 text-left">
              <div>
                <label htmlFor="displayName" className="mb-1 block text-sm text-text-secondary">
                  Ime
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  maxLength={50}
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-dark px-4 py-3 text-text placeholder-muted focus:border-primary focus:outline-none"
                  placeholder="Tvoje ime"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-text-secondary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-dark px-4 py-3 text-text placeholder-muted focus:border-primary focus:outline-none"
                  placeholder="tvoj@email.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm text-text-secondary">
                  Lozinka
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
                  Potvrdi lozinku
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
                {loading ? "Registracija..." : "Registruj se"}
              </button>
            </form>

            <p className="text-sm text-text-secondary">
              Već imaš nalog?{" "}
              <Link href="/prijava" className="text-primary hover:underline">
                Prijavi se
              </Link>
            </p>

            <p className="mt-6 text-xs text-muted">
              Registracijom prihvataš{" "}
              <Link href="/terms" className="underline hover:text-primary">uslove korišćenja</Link>{" "}
              i{" "}
              <Link href="/privacy" className="underline hover:text-primary">politiku privatnosti</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
