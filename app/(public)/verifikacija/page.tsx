"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Status = "verifying" | "success" | "error";

function VerifyInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<Status>("verifying");
  const ran = useRef(false);

  // Resend-verification sub-form (shown on error).
  const [email, setEmail] = useState("");
  const [resendDone, setResendDone] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (!token) {
      setStatus("error");
      return;
    }
    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.replace("/prijava?verified=1"), 1800);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [token, router]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResending(true);
    try {
      await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResendDone(true);
    } catch {
      setResendDone(true);
    }
    setResending(false);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--glass-border)] bg-card p-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <img src="/logo-brain.png" alt="Matoteka" className="h-10 w-10" />
          <span className="text-3xl font-semibold text-heading" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
            Matoteka
          </span>
        </div>

        {status === "verifying" && (
          <p className="text-text-secondary">Potvrđujemo tvoj nalog...</p>
        )}

        {status === "success" && (
          <>
            <h1 className="mb-3 text-xl font-semibold text-heading">Email je potvrđen ✓</h1>
            <p className="mb-6 text-text-secondary">Sada se možeš prijaviti na svoj nalog.</p>
            <Link
              href="/prijava?verified=1"
              className="inline-block rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow"
            >
              Prijavi se
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="mb-3 text-xl font-semibold text-heading">Link nije važeći</h1>
            <p className="mb-6 text-text-secondary">
              Link za potvrdu je istekao ili je već iskorišćen. Pošalji novi link na svoju email adresu.
            </p>
            {resendDone ? (
              <p className="text-text-secondary">
                Ako nalog postoji i nije potvrđen, poslali smo novi link na <strong className="text-text">{email}</strong>.
              </p>
            ) : (
              <form onSubmit={handleResend} className="space-y-4 text-left">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-dark px-4 py-3 text-text placeholder-muted focus:border-primary focus:outline-none"
                  placeholder="tvoj@email.com"
                />
                <button
                  type="submit"
                  disabled={resending}
                  className="w-full rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-primary-glow disabled:opacity-50"
                >
                  {resending ? "Slanje..." : "Pošalji novi link"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
