"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bot, Upload, Send, Clock } from "lucide-react";

export default function AiTutorPage() {
  const router = useRouter();
  const [promptText, setPromptText] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState({ used: 0, limit: 20, remaining: 20 });
  const [history, setHistory] = useState<any[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/ai/usage").then((r) => r.json()).then(setUsage).catch(() => {});
    fetch("/api/ai/solutions").then((r) => r.json()).then(setHistory).catch(() => {});
  }, []);

  function handleFile(file: File) {
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!promptText && !screenshot) { setError("Unesi tekst ili dodaj sliku."); return; }
    if (usage.remaining <= 0) { setError("Iskoristio si sve AI zahteve za danas."); return; }

    setLoading(true);
    setError("");

    const formData = new FormData();
    if (promptText) formData.append("promptText", promptText);
    if (screenshot) formData.append("screenshot", screenshot);

    try {
      const res = await fetch("/api/ai/solve", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Greška"); return; }
      router.push(`/ai/resenje/${data.id}`);
    } catch {
      setError("Greška pri komunikaciji sa serverom.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-text">
        <Bot className="mr-2 inline text-[#a78bfa]" size={28} />
        AI Tutor — Reši bilo koji zadatak
      </h1>
      <p className="mb-8 text-text-secondary">Opiši zadatak tekstom ili dodaj sliku i dobij kompletno rešenje.</p>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Opiši zadatak..."
          rows={5}
          className="mb-4 w-full rounded-xl border border-border bg-card p-4 text-text outline-none focus:border-[#a78bfa]"
        />

        <div
          onClick={() => fileRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          className="mb-4 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-6 text-sm text-text-secondary hover:border-[#a78bfa]"
        >
          {screenshotPreview ? (
            <img src={screenshotPreview} alt="Preview" className="max-h-40 rounded" />
          ) : (
            <span className="flex items-center gap-2">
              <Upload size={16} /> Prevuci ili klikni da dodaš sliku zadatka
            </span>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">Preostalo danas: {usage.remaining}/{usage.limit}</span>
          <button
            type="submit"
            disabled={loading || usage.remaining <= 0}
            className="flex items-center gap-2 rounded-xl bg-[#a78bfa] px-6 py-3 font-semibold text-white hover:bg-[#8b5cf6] disabled:opacity-50"
          >
            {loading ? "Generisanje..." : <><Send size={16} /> Reši zadatak</>}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-[#f87171]">{error}</p>}
      </form>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-text">Tvoja prethodna AI rešenja</h2>
          <div className="space-y-2">
            {history.map((s: any) => (
              <Link
                key={s.id}
                href={`/ai/resenje/${s.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition hover:border-[#a78bfa]/50"
              >
                <div>
                  <h3 className="text-sm font-medium text-text">{s.title}</h3>
                  <p className="text-xs text-muted">
                    <Clock size={12} className="mr-1 inline" />
                    {new Date(s.createdAt).toLocaleDateString("sr-Latn")}
                    {" · "}
                    {s.contextType === "standalone" ? "Samostalni" : "Kontekstualni"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
