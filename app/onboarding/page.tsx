"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles } from "lucide-react";
import FacultyMultiSelect from "@/components/ui/faculty-multi-select";

export default function OnboardingPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [targetFaculties, setTargetFaculties] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; faculties?: string }>({});
  const [loading, setLoading] = useState(false);

  function validateName(name: string): string | undefined {
    if (name.length < 3) return "Minimum 3 karaktera.";
    if (name.length > 20) return "Maksimum 20 karaktera.";
    if (!/^[a-zA-Z0-9_]+$/.test(name)) return "Samo slova, brojevi i donja crta (_).";
    return undefined;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const nameErr = validateName(displayName);
    const facultyErr = targetFaculties.length === 0 ? "Izaberi bar jedan fakultet." : undefined;

    if (nameErr || facultyErr) {
      setFieldErrors({ name: nameErr, faculties: facultyErr });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, targetFaculties }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Greška pri čuvanju.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Greška pri čuvanju. Pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  }

  const isValid = displayName.length >= 3 && targetFaculties.length > 0;

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Brain size={32} className="text-amber-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[var(--color-text)]">
            Dobrodošli u TataMata!
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Podesi svoj profil i kreni sa vežbanjem.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8"
        >
          {/* Step 1: Display Name */}
          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
              Korisničko ime
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`w-full rounded-xl border px-4 py-3 text-[var(--color-text)] bg-[var(--color-bg)] outline-none transition ${
                fieldErrors.name
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-amber-500"
              }`}
              placeholder="MatematicarPro"
              maxLength={20}
              autoFocus
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
            )}
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              3-20 karaktera: slova, brojevi, donja crta
            </p>
          </div>

          {/* Step 2: Faculty Selection */}
          <div className="mb-6">
            <FacultyMultiSelect
              selected={targetFaculties}
              onChange={(sel) => {
                setTargetFaculties(sel);
                if (fieldErrors.faculties) setFieldErrors((prev) => ({ ...prev, faculties: undefined }));
              }}
              error={fieldErrors.faculties}
            />
          </div>

          {/* General error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isValid}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-black transition hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Čuvanje..."
            ) : (
              <>
                <Sparkles size={18} />
                Počni
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
