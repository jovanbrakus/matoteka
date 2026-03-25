"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface FunctionPreset {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  formula: string;
  derivative: string;
  ruleName: string;
  ruleFormula: string;
  advice: string;
  evaluate: (x: number) => number;
  derivativeAt: (x: number) => number;
}

const PRESETS: FunctionPreset[] = [
  {
    key: "poly",
    label: "x\u00B3 \u2212 3x + 1",
    min: -2.6,
    max: 2.6,
    step: 0.1,
    initial: 0.8,
    formula: "f(x)=x^3-3x+1",
    derivative: "f'(x)=3x^2-3",
    ruleName: "Linearnost i stepena funkcija",
    ruleFormula: "(x^n)'=nx^{n-1},\\qquad (u\\pm v)'=u'\\pm v'",
    advice:
      "Ovde nema proizvoda ni kolicnika. Polinom se diferencira clan po clan.",
    evaluate: (x) => x * x * x - 3 * x + 1,
    derivativeAt: (x) => 3 * x * x - 3,
  },
  {
    key: "product",
    label: "x\u00B2 sin x",
    min: -3,
    max: 3,
    step: 0.1,
    initial: 1.2,
    formula: "f(x)=x^2\\sin x",
    derivative: "f'(x)=2x\\sin x+x^2\\cos x",
    ruleName: "Pravilo proizvoda",
    ruleFormula: "(uv)'=u'v+uv'",
    advice:
      "Ako pomnozis izvode, promasio si pravilo. Oba clana moraju da se zapisu.",
    evaluate: (x) => x * x * Math.sin(x),
    derivativeAt: (x) => 2 * x * Math.sin(x) + x * x * Math.cos(x),
  },
  {
    key: "quotient",
    label: "(x\u00B2+1)/(x+2)",
    min: -1.7,
    max: 3.4,
    step: 0.1,
    initial: 0.2,
    formula: "f(x)=\\frac{x^2+1}{x+2}",
    derivative: "f'(x)=\\frac{x^2+4x-1}{(x+2)^2}",
    ruleName: "Pravilo kolicnika",
    ruleFormula: "\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}",
    advice:
      "Brojilac i imenilac se ne diferenciraju odvojeno. Redosled u brojniku je bitan.",
    evaluate: (x) => (x * x + 1) / (x + 2),
    derivativeAt: (x) => (x * x + 4 * x - 1) / ((x + 2) * (x + 2)),
  },
  {
    key: "chain",
    label: "(3x\u00B2+1)\u2074",
    min: -1.8,
    max: 1.8,
    step: 0.05,
    initial: 0.6,
    formula: "f(x)=(3x^2+1)^4",
    derivative: "f'(x)=24x(3x^2+1)^3",
    ruleName: "Pravilo lanca",
    ruleFormula: "(u\\circ v)'(x)=u'(v(x))\\cdot v'(x)",
    advice:
      "Spolja diferenciras cetvrti stepen, unutra ostaje 3x\u00B2+1, a na kraju obavezno mnozis sa 6x.",
    evaluate: (x) => Math.pow(3 * x * x + 1, 4),
    derivativeAt: (x) => 24 * x * Math.pow(3 * x * x + 1, 3),
  },
  {
    key: "sqrt",
    label: "\u221A(2x+3)",
    min: -1.45,
    max: 3,
    step: 0.05,
    initial: 0.3,
    formula: "f(x)=\\sqrt{2x+3}",
    derivative: "f'(x)=\\frac{1}{\\sqrt{2x+3}}",
    ruleName: "Pravilo lanca na korenu",
    ruleFormula: "\\bigl(\\sqrt{u(x)}\\bigr)'=\\frac{u'(x)}{2\\sqrt{u(x)}}",
    advice:
      "Koren je spoljasnja funkcija. Posto je unutrasnji izvod jednak 2, formula se sredjuje.",
    evaluate: (x) => Math.sqrt(2 * x + 3),
    derivativeAt: (x) => 1 / Math.sqrt(2 * x + 3),
  },
  {
    key: "trigchain",
    label: "sin(2x\u00B2\u22121)",
    min: -2,
    max: 2,
    step: 0.05,
    initial: 0.7,
    formula: "f(x)=\\sin(2x^2-1)",
    derivative: "f'(x)=4x\\cos(2x^2-1)",
    ruleName: "Trigonometrijska slozena funkcija",
    ruleFormula: "(\\sin u(x))'=\\cos(u(x))\\cdot u'(x)",
    advice:
      "Najcesca greska je da se stane na kosinusu. Faktor 4x ne sme da se izostavi.",
    evaluate: (x) => Math.sin(2 * x * x - 1),
    derivativeAt: (x) => 4 * x * Math.cos(2 * x * x - 1),
  },
];

/* ── Helpers ── */

function fmt(value: number): string {
  if (!Number.isFinite(value)) return "nedefinisano";
  const r = Math.round(value * 1000) / 1000;
  if (Math.abs(r) < 1e-9) return "0";
  return r.toString();
}

/* ── Canvas drawing ── */

function drawGraph(
  canvas: HTMLCanvasElement,
  preset: FunctionPreset,
  x0: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, rect.width);
  const height = Math.max(320, rect.height);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = { top: 22, right: 24, bottom: 28, left: 28 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Sample function
  const samples = 260;
  const points: { x: number; y: number }[] = [];
  let yMin = Infinity;
  let yMax = -Infinity;

  for (let i = 0; i <= samples; i++) {
    const x = preset.min + ((preset.max - preset.min) * i) / samples;
    const y = preset.evaluate(x);
    if (Number.isFinite(y)) {
      points.push({ x, y });
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }

  const y0 = preset.evaluate(x0);
  const slope = preset.derivativeAt(x0);

  if (Number.isFinite(y0) && Number.isFinite(slope)) {
    const tLeft = y0 + slope * (preset.min - x0);
    const tRight = y0 + slope * (preset.max - x0);
    yMin = Math.min(yMin, tLeft, tRight, y0);
    yMax = Math.max(yMax, tLeft, tRight, y0);
  }

  if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMin === yMax) {
    yMin = -1;
    yMax = 1;
  }
  const yPad = (yMax - yMin) * 0.16 || 1;
  yMin -= yPad;
  yMax += yPad;

  const mapX = (x: number) =>
    pad.left + ((x - preset.min) / (preset.max - preset.min)) * plotW;
  const mapY = (y: number) =>
    pad.top + (1 - (y - yMin) / (yMax - yMin)) * plotH;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "rgba(255,255,255,0.02)");
  bg.addColorStop(1, "rgba(255,255,255,0.00)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const x = pad.left + (plotW * i) / 8;
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, height - pad.bottom);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i++) {
    const y = pad.top + (plotH * i) / 6;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }

  // Axes
  if (preset.min <= 0 && preset.max >= 0) {
    ctx.strokeStyle = "rgba(255,255,255,0.20)";
    ctx.beginPath();
    ctx.moveTo(mapX(0), pad.top);
    ctx.lineTo(mapX(0), height - pad.bottom);
    ctx.stroke();
  }
  if (yMin <= 0 && yMax >= 0) {
    ctx.strokeStyle = "rgba(255,255,255,0.20)";
    ctx.beginPath();
    ctx.moveTo(pad.left, mapY(0));
    ctx.lineTo(width - pad.right, mapY(0));
    ctx.stroke();
  }

  // Function curve
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  points.forEach((pt, idx) => {
    const cx = mapX(pt.x);
    const cy = mapY(pt.y);
    if (!started) {
      ctx.moveTo(cx, cy);
      started = true;
      return;
    }
    const prev = points[idx - 1];
    if (prev && Math.abs(pt.y - prev.y) > (yMax - yMin) * 0.55) {
      ctx.moveTo(cx, cy);
    } else {
      ctx.lineTo(cx, cy);
    }
  });
  ctx.stroke();

  // Tangent line
  if (Number.isFinite(y0) && Number.isFinite(slope)) {
    ctx.strokeStyle = "#8fd7ff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(
      mapX(preset.min),
      mapY(y0 + slope * (preset.min - x0))
    );
    ctx.lineTo(
      mapX(preset.max),
      mapY(y0 + slope * (preset.max - x0))
    );
    ctx.stroke();

    // Point
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(mapX(x0), mapY(y0), 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Dashed vertical
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(mapX(x0), mapY(y0));
    ctx.lineTo(mapX(x0), height - pad.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Labels
  ctx.fillStyle = "rgba(242,227,216,0.88)";
  ctx.font = '12px "Public Sans", sans-serif';
  ctx.fillText("x", width - pad.right - 12, height - 8);
  ctx.fillText("y", 10, pad.top + 8);
  ctx.fillText("f(x)", pad.left + 8, pad.top + 18);
  ctx.fillText("tangenta", pad.left + 8, pad.top + 36);
}

/* ── Component ── */

export default function DerivativeLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [presetIdx, setPresetIdx] = useState(0);
  const [x0, setX0] = useState(PRESETS[0].initial);

  const preset = PRESETS[presetIdx];

  const redraw = useCallback(() => {
    if (canvasRef.current) drawGraph(canvasRef.current, preset, x0);
  }, [preset, x0]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  const handlePresetChange = (idx: number) => {
    setPresetIdx(idx);
    setX0(PRESETS[idx].initial);
  };

  const y0 = preset.evaluate(x0);
  const slope = preset.derivativeAt(x0);

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* Controls */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>

          <div className={s.field} style={{ marginTop: 14 }}>
            <label>Izaberi funkciju</label>
            <select
              value={presetIdx}
              onChange={(e) => handlePresetChange(Number(e.target.value))}
            >
              {PRESETS.map((p, i) => (
                <option key={p.key} value={i}>
                  f(x) = {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Tacka dodira{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                x&#8320; = {fmt(x0)}
              </span>
            </label>
            <input
              type="range"
              min={preset.min}
              max={preset.max}
              step={preset.step}
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
            />
          </div>

          <p
            className={s.labNote}
            style={{ marginTop: 16, fontSize: "0.92rem" }}
          >
            Narandzasto: graf funkcije. Plavo: tangenta u tacki x&#8320;. Bela
            tacka: polozaj (x&#8320;, f(x&#8320;)). Kada je tangenta strmo
            rastuca, izvod je velik i pozitivan; kada pada, izvod je negativan.
          </p>
        </div>

        {/* Canvas */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
          />
        </div>
      </div>

      {/* Output readouts */}
      <div className={s.resultsGrid} style={{ marginTop: 16 }}>
        <div className={s.resultCard}>
          <strong>Izabrana funkcija</strong>
          <MathJax dynamic>{`\\(${preset.formula}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Koje pravilo radi?</strong>
          <p style={{ color: "var(--lesson-warning)", fontWeight: 700 }}>
            {preset.ruleName}
          </p>
          <MathJax dynamic>{`\\(${preset.ruleFormula}\\)`}</MathJax>
          <p style={{ color: "var(--lesson-muted)", fontSize: "0.92rem", marginTop: 6 }}>
            {preset.advice}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Izvod funkcije</strong>
          <MathJax dynamic>{`\\(${preset.derivative}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>U tacki x&#8320;</strong>
          <MathJax dynamic>
            {`\\(f(${fmt(x0)})=${fmt(y0)},\\quad f'(${fmt(x0)})=${fmt(slope)}\\)`}
          </MathJax>
        </div>
      </div>
    </div>
  );
}
