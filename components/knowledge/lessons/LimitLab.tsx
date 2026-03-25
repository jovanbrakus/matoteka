"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── preset definitions ── */

interface SequencePreset {
  mode: "sequence";
  label: string;
  expression: string;
  technique: string;
  techniqueNote: string;
  observation: string;
  observationNote: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderLabel: string;
  evaluate: (n: number) => number;
  limit: number;
}

interface FunctionPointPreset {
  mode: "function-point";
  label: string;
  expression: string;
  technique: string;
  techniqueNote: string;
  observation: string;
  observationNote: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderLabel: string;
  evaluate: (x: number) => number;
  xTarget: number;
  finiteLimit: number | null;
}

interface FunctionInftyPreset {
  mode: "function-infty";
  label: string;
  expression: string;
  technique: string;
  techniqueNote: string;
  observation: string;
  observationNote: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderLabel: string;
  evaluate: (x: number) => number;
  finiteLimit: number;
}

type Preset = SequencePreset | FunctionPointPreset | FunctionInftyPreset;

const PRESETS: Preset[] = [
  {
    mode: "sequence",
    label: "Niz: aₙ = 1/n",
    expression: "aₙ = 1/n,  lim = 0",
    technique:
      "Posmatraš direktno kako članovi opadaju i prilaze nuli.",
    techniqueNote:
      "Ovaj primer gradi osnovni osećaj za limes niza. Svaki sledeći član je manji.",
    observation: "Tačke se sabijaju uz liniju y = 0.",
    observationNote:
      "Što više članova prikažeš, rep niza izgleda kao da se lepi za osu x.",
    sliderMin: 12,
    sliderMax: 60,
    sliderDefault: 24,
    sliderLabel: "Broj prikazanih članova",
    evaluate: (n: number) => 1 / n,
    limit: 0,
  },
  {
    mode: "sequence",
    label: "Niz: aₙ = (2n+3)/(n+5)",
    expression: "aₙ = (2n+3)/(n+5),  lim = 2",
    technique:
      "Za racionalni izraz u n gledaš dominantne članove i deliš sve sa n.",
    techniqueNote:
      "Niži stepeni postaju zanemarljivi, pa se odnos približava odnosu vodećih članova.",
    observation: "Tačke se penju ka liniji y = 2, ali je nikad ne pogađaju tačno.",
    observationNote:
      "Rep niza jasno pokazuje šta znači približavanje stalnom broju različitom od nule.",
    sliderMin: 10,
    sliderMax: 70,
    sliderDefault: 22,
    sliderLabel: "Broj prikazanih članova",
    evaluate: (n: number) => (2 * n + 3) / (n + 5),
    limit: 2,
  },
  {
    mode: "function-point",
    label: "Funkcija: (x²-1)/(x-1), x→1",
    expression: "f(x) = (x²-1)/(x-1),  lim(x→1) = 2",
    technique:
      "Najpre prepoznaješ 0/0, zatim faktorišeš brojilac u (x-1)(x+1).",
    techniqueNote:
      "Posle skraćivanja vidiš da grafik prati pravu y = x+1, osim što u tački x = 1 postoji rupa.",
    observation:
      "Grafik sa obe strane prilazi istoj visini, pa konačan limes postoji iako funkcija nije definisana u tački.",
    observationNote:
      "Ovo je najbolji vizuelni primer za razliku između rupe i nepostojanja limesa.",
    sliderMin: 8,
    sliderMax: 40,
    sliderDefault: 14,
    sliderLabel: "Stepen zuma oko tačke x = 1",
    evaluate: (x: number) =>
      Math.abs(x - 1) < 0.0008 ? NaN : (x * x - 1) / (x - 1),
    xTarget: 1,
    finiteLimit: 2,
  },
  {
    mode: "function-point",
    label: "Funkcija: 1/(x-2), x→2",
    expression: "f(x) = 1/(x-2),  x → 2",
    technique:
      "Ovde nema 0/0. Imenilac ide ka nuli, pa proveravaš ponašanje sa leve i desne strane.",
    techniqueNote:
      "Rezultat nije konačan broj. Limes sa leve i desne strane odlazi u suprotne beskonačnosti.",
    observation:
      "Grafik se ruši naniže s leve strane i beži naviše s desne strane — vertikalna asimptota.",
    observationNote:
      "Ne mora svaki limes da daje konačan broj; nekad je glavna informacija geometrijska.",
    sliderMin: 8,
    sliderMax: 34,
    sliderDefault: 12,
    sliderLabel: "Stepen zuma oko tačke x = 2",
    evaluate: (x: number) =>
      Math.abs(x - 2) < 0.0008 ? NaN : 1 / (x - 2),
    xTarget: 2,
    finiteLimit: null,
  },
  {
    mode: "function-infty",
    label: "Funkcija: (3x²-x)/(x²+1), x→∞",
    expression: "f(x) = (3x²-x)/(x²+1),  lim(x→∞) = 3",
    technique:
      "Podeli brojilac i imenilac sa x², pa vidi da se niži stepeni gase.",
    techniqueNote:
      "Tipičan obrazac za horizontalnu asimptotu: isti stepen u brojocu i imeniocu.",
    observation: "Za veće i veće x, grafik se priljubljuje uz liniju y = 3.",
    observationNote:
      "Kada pomeraš desnu granicu prikaza, vidiš kako lokalne oscilacije postaju nevažne.",
    sliderMin: 8,
    sliderMax: 28,
    sliderDefault: 12,
    sliderLabel: "Desna granica posmatranja",
    evaluate: (x: number) => (3 * x * x - x) / (x * x + 1),
    finiteLimit: 3,
  },
];

/* ── helpers ── */

const fmt = (v: number) => {
  if (!Number.isFinite(v)) return v > 0 ? "+∞" : "-∞";
  if (Math.abs(v) < 1e-9) return "0";
  const r = Math.round(v * 1000) / 1000;
  return Number.isInteger(r) ? String(r) : r.toLocaleString("sr-RS");
};

/* ── component ── */

export default function LimitLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [presetIdx, setPresetIdx] = useState(0);
  const [slider, setSlider] = useState(PRESETS[0].sliderDefault);
  const preset = PRESETS[presetIdx];

  /* change preset → reset slider */
  const handlePresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const idx = Number(e.target.value);
      setPresetIdx(idx);
      setSlider(PRESETS[idx].sliderDefault);
    },
    []
  );

  /* render canvas */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = Math.min(440, Math.max(320, Math.round(w * 0.58)));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = 42;
    const pw = w - pad * 2;
    const ph = h - pad * 2;

    const mapX = (v: number, xMin: number, xMax: number) =>
      pad + ((v - xMin) / (xMax - xMin)) * pw;
    const mapY = (v: number, yMin: number, yMax: number) =>
      h - pad - ((v - yMin) / (yMax - yMin)) * ph;

    /* background */
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "rgba(26,15,11,0.98)");
    grad.addColorStop(1, "rgba(11,7,6,0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    /* grid */
    ctx.strokeStyle = "rgba(255,220,200,0.05)";
    ctx.lineWidth = 1;
    for (let x = pad; x <= w - pad; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, h - pad);
      ctx.stroke();
    }
    for (let y = pad; y <= h - pad; y += 42) {
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();
    }

    /* drawAxes */
    const drawAxes = (
      xMin: number,
      xMax: number,
      yMin: number,
      yMax: number
    ) => {
      ctx.save();
      ctx.strokeStyle = "rgba(255,230,214,0.26)";
      ctx.lineWidth = 1.5;
      if (yMin <= 0 && yMax >= 0) {
        const y0 = mapY(0, yMin, yMax);
        ctx.beginPath();
        ctx.moveTo(pad, y0);
        ctx.lineTo(w - pad, y0);
        ctx.stroke();
      }
      if (xMin <= 0 && xMax >= 0) {
        const x0 = mapX(0, xMin, xMax);
        ctx.beginPath();
        ctx.moveTo(x0, pad);
        ctx.lineTo(x0, h - pad);
        ctx.stroke();
      }
      ctx.restore();
    };

    /* limit line */
    const drawLimitLine = (
      val: number,
      yMin: number,
      yMax: number,
      lbl: string
    ) => {
      ctx.save();
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "rgba(126,227,187,0.95)";
      ctx.lineWidth = 2;
      const py = mapY(val, yMin, yMax);
      ctx.beginPath();
      ctx.moveTo(pad, py);
      ctx.lineTo(w - pad, py);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(126,227,187,0.96)";
      ctx.font = '700 13px "Public Sans",sans-serif';
      ctx.fillText(lbl, w - pad - 70, py - 10);
      ctx.restore();
    };

    /* vertical marker */
    const drawVertMarker = (
      val: number,
      xMin: number,
      xMax: number,
      lbl: string
    ) => {
      ctx.save();
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "rgba(146,216,255,0.85)";
      ctx.lineWidth = 2;
      const px = mapX(val, xMin, xMax);
      ctx.beginPath();
      ctx.moveTo(px, pad);
      ctx.lineTo(px, h - pad);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(146,216,255,0.92)";
      ctx.font = '700 13px "Public Sans",sans-serif';
      ctx.fillText(lbl, px + 8, pad + 16);
      ctx.restore();
    };

    /* ── render based on mode ── */
    const p = preset;

    if (p.mode === "sequence") {
      const nMax = slider;
      const samples: { n: number; v: number }[] = [];
      for (let n = 1; n <= nMax; n++) samples.push({ n, v: p.evaluate(n) });
      const vals = samples.map((s) => s.v).concat(p.limit);
      const yMin0 = Math.min(...vals);
      const yMax0 = Math.max(...vals);
      const yPad = Math.max(0.35, (yMax0 - yMin0) * 0.2);
      const xMin = 0,
        xMax = nMax + 2,
        yMin = yMin0 - yPad,
        yMax = yMax0 + yPad;

      drawAxes(xMin, xMax, yMin, yMax);
      drawLimitLine(p.limit, yMin, yMax, `y = ${fmt(p.limit)}`);

      samples.forEach((item, i) => {
        const px = mapX(item.n, xMin, xMax);
        const py = mapY(item.v, yMin, yMax);
        ctx.strokeStyle = "rgba(255,194,148,0.14)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, mapY(p.limit, yMin, yMax));
        ctx.lineTo(px, py);
        ctx.stroke();

        ctx.fillStyle = i >= samples.length - 6 ? "#ffd79e" : "#ff8f46";
        ctx.beginPath();
        ctx.arc(px, py, i >= samples.length - 6 ? 5.5 : 4.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.fillStyle = "rgba(255,230,214,0.88)";
      ctx.font = '700 14px "Public Sans",sans-serif';
      ctx.fillText("n", w - pad + 8, mapY(p.limit, yMin, yMax) + 18);
      ctx.fillText("a\u2099", pad + 6, pad - 10);
      ctx.restore();
    } else if (p.mode === "function-point") {
      const radius = 2.8 / Math.max(3, slider / 2);
      const xMin = p.xTarget - radius,
        xMax = p.xTarget + radius;
      const yMin =
        p.finiteLimit === null ? -6 : p.finiteLimit - 2.5;
      const yMax =
        p.finiteLimit === null ? 6 : p.finiteLimit + 2.5;

      drawAxes(xMin, xMax, yMin, yMax);
      drawVertMarker(p.xTarget, xMin, xMax, `x = ${fmt(p.xTarget)}`);
      if (p.finiteLimit !== null)
        drawLimitLine(p.finiteLimit, yMin, yMax, `y = ${fmt(p.finiteLimit)}`);

      ctx.save();
      ctx.beginPath();
      let drawing = false;
      for (let i = 0; i <= 700; i++) {
        const x = xMin + ((xMax - xMin) * i) / 700;
        const y = p.evaluate(x);
        if (!Number.isFinite(y) || y < yMin - 10 || y > yMax + 10) {
          drawing = false;
          continue;
        }
        const px = mapX(x, xMin, xMax);
        const py = mapY(y, yMin, yMax);
        if (!drawing) {
          ctx.moveTo(px, py);
          drawing = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.strokeStyle = "#ff8f46";
      ctx.lineWidth = 3.2;
      ctx.stroke();
      ctx.restore();

      if (p.finiteLimit !== null) {
        const lx = p.xTarget - radius / 3;
        const rx = p.xTarget + radius / 3;
        [lx, rx].forEach((x) => {
          const y = p.evaluate(x);
          if (Number.isFinite(y)) {
            ctx.save();
            ctx.fillStyle = "#ffd79e";
            ctx.beginPath();
            ctx.arc(mapX(x, xMin, xMax), mapY(y, yMin, yMax), 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }
    } else {
      /* function-infty */
      const xMin = -0.5,
        xMax = slider + 2,
        yMin = -0.2,
        yMax = 3.8;

      drawAxes(xMin, xMax, yMin, yMax);
      drawLimitLine(p.finiteLimit, yMin, yMax, `y = ${fmt(p.finiteLimit)}`);

      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= 800; i++) {
        const x = xMin + ((xMax - xMin) * i) / 800;
        const y = p.evaluate(x);
        const px = mapX(x, xMin, xMax);
        const py = mapY(y, yMin, yMax);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "#ff8f46";
      ctx.lineWidth = 3.2;
      ctx.stroke();
      ctx.restore();

      const sx = xMax - 0.6;
      const sy = p.evaluate(sx);
      ctx.save();
      ctx.fillStyle = "#ffd79e";
      ctx.beginPath();
      ctx.arc(mapX(sx, xMin, xMax), mapY(sy, yMin, yMax), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [preset, slider]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  /* reading text */
  const readingText = (() => {
    if (preset.mode === "sequence")
      return `Prikazano je prvih ${slider} članova niza.`;
    if (preset.mode === "function-point") {
      const p = preset as FunctionPointPreset;
      return `Veća vrednost znači jači zum oko tačke prilaza x = ${fmt(p.xTarget)}.`;
    }
    return `Desna granica prikaza je približno x = ${slider + 2}.`;
  })();

  return (
    <div className={s.interactiveShell}>
      <div className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Izaberi scenario</h3>

        <div className={s.field} style={{ marginTop: 16 }}>
          <label>Primer</label>
          <select
            value={presetIdx}
            onChange={handlePresetChange}
          >
            {PRESETS.map((p, i) => (
              <option key={i} value={i}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.rangeWrap}>
          <label>{preset.sliderLabel}</label>
          <input
            type="range"
            min={preset.sliderMin}
            max={preset.sliderMax}
            step={1}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
          />
          <span style={{ color: "var(--lesson-muted)", fontSize: "0.94rem" }}>
            {readingText}
          </span>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className={s.resultCard}>
            <strong>Model</strong>
            <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
              {preset.expression}
            </p>
          </div>
          <div className={s.resultCard} style={{ marginTop: 12 }}>
            <strong>Tehnika / ideja</strong>
            <p style={{ color: "var(--lesson-text)" }}>{preset.technique}</p>
            <p>{preset.techniqueNote}</p>
          </div>
          <div className={s.resultCard} style={{ marginTop: 12 }}>
            <strong>Na šta da obratiš pažnju</strong>
            <p style={{ color: "var(--lesson-text)" }}>{preset.observation}</p>
            <p>{preset.observationNote}</p>
          </div>
        </div>
      </div>

      <div className={s.canvasWrap}>
        <h3 className={cs.tCardTitle} style={{ marginBottom: 10 }}>
          Grafički prikaz približavanja
        </h3>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16/10" }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", marginTop: 14, color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
          <span>
            <i style={{ display: "inline-block", width: 16, height: 3, borderRadius: 999, background: "#ff8f46", marginRight: 8 }} />
            Narandžasta kriva ili tačke — niz/funkcija
          </span>
          <span>
            <i style={{ display: "inline-block", width: 16, height: 3, borderRadius: 999, background: "#7ee3bb", marginRight: 8 }} />
            Zelena isprekidana — konačan limes
          </span>
          <span>
            <i style={{ display: "inline-block", width: 16, height: 3, borderRadius: 999, background: "#92d8ff", marginRight: 8 }} />
            Plava isprekidana — tačka prilaza / asimptota
          </span>
        </div>
      </div>
    </div>
  );
}
