"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Check, Loader2 } from "lucide-react";
import { FACULTIES } from "@/components/ui/faculty-multi-select";

const MAX_FACULTIES = 3;

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;

  const [targetFaculties, setTargetFaculties] = useState<string[]>([]);
  const [facultyLoaded, setFacultyLoaded] = useState(false);
  const [savingFaculty, setSavingFaculty] = useState(false);
  const [facultySaved, setFacultySaved] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [nameSaved, setNameSaved] = useState(false);

  const loadData = useCallback(() => {
    fetch("/api/profile/faculty")
      .then((r) => r.json())
      .then((data) => {
        const faculties = data.targetFaculties || [];
        setTargetFaculties(faculties);
        setFacultyLoaded(true);
      })
      .catch(() => setFacultyLoaded(true));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (user) {
      const name = user.displayName || user.name || "";
      setDisplayName(name);
      setOriginalName(name);
    }
  }, [user]);

  const nameChanged = displayName !== originalName;

  async function handleNameSave() {
    setNameError("");
    if (displayName.length < 3 || displayName.length > 20) {
      setNameError("Ime mora imati između 3 i 20 karaktera.");
      return;
    }
    if (!/^[a-zA-Z0-9_ ]+$/.test(displayName)) {
      setNameError("Dozvoljeni su samo slova, brojevi, razmak i donja crta (_).");
      return;
    }
    setSavingName(true);
    try {
      const res = await fetch("/api/profile/name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName }),
      });
      if (res.ok) {
        setOriginalName(displayName);
        setNameSaved(true);
        await updateSession({ displayName });
        setTimeout(() => setNameSaved(false), 2000);
      } else {
        const data = await res.json();
        setNameError(data.error || "Greška pri čuvanju.");
      }
    } catch {
      setNameError("Greška pri čuvanju.");
    }
    setSavingName(false);
  }

  async function toggleFaculty(id: string) {
    const isSelected = targetFaculties.includes(id);
    let next: string[];

    if (isSelected) {
      next = targetFaculties.filter((f) => f !== id);
    } else {
      const mainCount = targetFaculties.filter((f) => f !== "other").length;
      if (id !== "other" && mainCount >= MAX_FACULTIES) return;
      next = [...targetFaculties, id];
    }

    setTargetFaculties(next);
    setFacultySaved(false);
    setSavingFaculty(true);
    try {
      const res = await fetch("/api/profile/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetFaculties: next }),
      });
      if (res.ok) {
        setFacultySaved(true);
        await updateSession({ targetFaculties: next });
        setTimeout(() => setFacultySaved(false), 2000);
      }
    } catch {}
    setSavingFaculty(false);
  }

  const mainSelectedCount = targetFaculties.filter((f) => f !== "other").length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Page header */}
      <h1 className="mb-8 text-3xl font-black tracking-tight text-heading">
        Podešavanja profila
      </h1>

      {/* Avatar + Email (read-only) */}
      <section className="mb-10 flex items-center gap-5">
        <div className="flex-shrink-0">
          {user?.image ? (
            <img
              src={user.image}
              alt="Avatar"
              className="h-20 w-20 rounded-2xl border-2 border-[#ec5b13]/30 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#ec5b13]/30 bg-[#ec5b13]/10">
              <User size={36} className="text-[#ec5b13]" />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-bold text-heading">
            {user?.displayName || user?.name || "Korisnik"}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Mail size={14} />
            {user?.email}
          </p>
          <p className="mt-1 text-xs text-muted">
            Google nalog — avatar i email se menjaju na Google-u
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="mb-8 border-[var(--glass-border)]" />

      {/* Account Level */}
      <section className="mb-10">
        <h2 className="mb-1.5 text-sm font-semibold text-heading">
          Nivo naloga
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          Tvoj trenutni paket i pristup funkcijama platforme.
        </p>
        {(() => {
          const role = user?.role as string | undefined;
          const isAdmin = role === "admin";
          const level = isAdmin
            ? { name: "Administrator", icon: "admin_panel_settings", color: "text-[#ec5b13]", bg: "bg-[#ec5b13]/10", border: "border-[#ec5b13]/30", features: ["Potpun pristup admin panelu", "Upravljanje korisnicima", "Pregled analitike platforme"] }
            : { name: "Premium", icon: "workspace_premium", color: "text-[#ec5b13]", bg: "bg-[#ec5b13]/10", border: "border-[#ec5b13]/30", features: ["Rešenja svih zadataka sa objašnjenjem", "59 interaktivnih lekcija", "Simulacija ispita sa tajmerom", "Procena znanja i rang lista", "Napredna analitika uspeha"] };

          return (
            <div className={`rounded-2xl border ${level.border} ${level.bg} p-5`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ec5b13]/15">
                  <span className={`material-symbols-outlined text-xl ${level.color}`}>
                    {level.icon}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-black text-heading">{level.name}</p>
                  {!isAdmin && (
                    <p className="text-xs font-semibold text-[#ec5b13]">
                      Besplatno u sezoni 2026
                    </p>
                  )}
                </div>
              </div>
              <ul className="space-y-2">
                {level.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="material-symbols-outlined text-sm text-[#ec5b13]">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </section>

      {/* Divider */}
      <hr className="mb-8 border-[var(--glass-border)]" />

      {/* Display Name */}
      <section className="mb-10">
        <label
          htmlFor="display-name"
          className="mb-1.5 block text-sm font-semibold text-heading"
        >
          Ime za prikaz
        </label>
        <p className="mb-4 text-sm text-text-secondary">
          Ovo ime se prikazuje na rang listi i u zajednici. Slova, brojevi, razmak i _ (3–20 karaktera).
        </p>
        <div className="flex gap-3">
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              setNameError("");
              setNameSaved(false);
            }}
            maxLength={20}
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-heading outline-none transition focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
            placeholder="Tvoje ime..."
          />
          <button
            onClick={handleNameSave}
            disabled={!nameChanged || savingName}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              nameSaved
                ? "bg-success/20 text-success"
                : nameChanged
                  ? "bg-[#ec5b13] text-white hover:bg-[#ec5b13]/90 shadow-[0_0_15px_rgba(236,91,19,0.2)]"
                  : "bg-[var(--tint)] text-muted cursor-not-allowed"
            }`}
          >
            {savingName ? (
              <Loader2 size={16} className="animate-spin" />
            ) : nameSaved ? (
              <Check size={16} />
            ) : null}
            {nameSaved ? "Sačuvano" : "Sačuvaj"}
          </button>
        </div>
        {nameError && (
          <p className="mt-2 text-sm text-error">{nameError}</p>
        )}
      </section>

      {/* Divider */}
      <hr className="mb-8 border-[var(--glass-border)]" />

      {/* Faculty Selection */}
      <section className="mb-10">
        <div className="mb-1.5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-heading">
            Ciljani fakulteti
          </h2>
          {savingFaculty && (
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Loader2 size={12} className="animate-spin" />
              Čuvanje...
            </span>
          )}
          {facultySaved && !savingFaculty && (
            <span className="flex items-center gap-1.5 text-xs text-success">
              <Check size={12} />
              Sačuvano
            </span>
          )}
        </div>
        <p className="mb-5 text-sm text-text-secondary">
          Izaberi do {MAX_FACULTIES} fakulteta za koje se spremaš. Zadaci i simulacije će biti prilagođeni tvom izboru.
        </p>

        {!facultyLoaded ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-muted" />
          </div>
        ) : (
          <div className="space-y-2">
            {FACULTIES.map((f) => {
              const isSelected = targetFaculties.includes(f.id);
              const isDisabled =
                !isSelected && mainSelectedCount >= MAX_FACULTIES;

              return (
                <button
                  key={f.id}
                  onClick={() => !isDisabled && toggleFaculty(f.id)}
                  disabled={isDisabled && !isSelected}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                    isSelected
                      ? "border-[#ec5b13]/40 bg-[#ec5b13]/10"
                      : isDisabled
                        ? "border-border bg-[var(--tint)] opacity-40 cursor-not-allowed"
                        : "border-border bg-card hover:border-[#ec5b13]/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                        isSelected
                          ? "bg-[#ec5b13] text-white"
                          : "bg-[var(--tint-strong)] text-muted"
                      }`}
                    >
                      {f.short}
                    </div>
                    <div>
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? "text-[#ec5b13]" : "text-heading"
                        }`}
                      >
                        {f.short}
                      </span>
                      <span className="ml-2 text-xs text-muted">{f.name}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ec5b13]">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="!mt-3 border-t border-[var(--glass-border)]" />

            {/* Other */}
            <button
              onClick={() => toggleFaculty("other")}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                targetFaculties.includes("other")
                  ? "border-[#ec5b13]/40 bg-[#ec5b13]/10"
                  : "border-border bg-card hover:border-[#ec5b13]/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                    targetFaculties.includes("other")
                      ? "bg-[#ec5b13] text-white"
                      : "bg-[var(--tint-strong)] text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">more_horiz</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    targetFaculties.includes("other")
                      ? "text-[#ec5b13]"
                      : "text-heading"
                  }`}
                >
                  Drugi fakultet
                </span>
              </div>
              {targetFaculties.includes("other") && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ec5b13]">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>

            {mainSelectedCount >= MAX_FACULTIES && (
              <p className="pt-1 text-xs text-muted">
                Maksimum {MAX_FACULTIES} fakulteta izabrano. Klikni na izabrani da ga ukloniš.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
