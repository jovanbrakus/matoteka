"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Always show the same confirmation regardless of outcome.
    }
    setLoading(false);
    setSubmitted(true);
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
            <p className="mb-6 text-text-secondary">
              Ako nalog sa adresom <strong className="text-text">{email}</strong> postoji, poslali smo link za postavljanje nove lozinke.
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
            <p className="mb-8 text-text-secondary">
              Unesi svoju email adresu i poslaćemo ti link za promenu lozinke.
            </p>

            <form onSubmit={handleSubmit} className="mb-6 space-y-4 text-left">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow disabled:opacity-50"
              >
                {loading ? "Slanje..." : "Pošalji link"}
              </button>
            </form>

            <p className="text-sm text-text-secondary">
              <Link href="/prijava" className="text-primary hover:underline">
                Nazad na prijavu
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
