"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";
import InlineMath from "@/components/knowledge/InlineMath";
import MathBlock from "@/components/knowledge/MathBlock";

type Mode = "sin-plus" | "sin-minus" | "cos-plus" | "cos-minus";

interface ModeConfig {
  label: string;
  note: string;
  lhsLabel: string;
  rhsLabel: string;
  lhs: (a: number, b: number) => number;
  rhs: (a: number, b: number) => number;
  forwardFormula: (
    alpha: number,
    beta: number,
    m: number,
    d: number,
    val: number
  ) => string;
}

const MODES: Record<Mode, ModeConfig> = {
  "sin-plus": {
    label: "sin \\alpha + sin \\beta",
    note: "Zbir sinusa se najcesce sabija u proizvod jer odmah dobijas faktor sa srednjim uglom i polurazlikom.",
    lhsLabel: "\\sin\\alpha+\\sin\\beta",
    rhsLabel: "2\\sin m\\cos d",
    lhs: (a, b) => Math.sin(a) + Math.sin(b),
    rhs: (a, b) => 2 * Math.sin((a + b) / 2) * Math.cos((a - b) / 2),
    forwardFormula: (alpha, beta, m, d, val) =>
      `\\sin ${alpha}^\\circ+\\sin ${beta}^\\circ = 2\\sin ${m}^\\circ\\cos ${d}^\\circ \\approx ${val.toFixed(4)}`,
  },
  "sin-minus": {
    label: "sin \\alpha - sin \\beta",
    note: "Razlika sinusa je odlicna za faktorizaciju jer se cesto pojavljuje faktor sin((alpha-beta)/2).",
    lhsLabel: "\\sin\\alpha-\\sin\\beta",
    rhsLabel: "2\\cos m\\sin d",
    lhs: (a, b) => Math.sin(a) - Math.sin(b),
    rhs: (a, b) => 2 * Math.cos((a + b) / 2) * Math.sin((a - b) / 2),
    forwardFormula: (alpha, beta, m, d, val) =>
      `\\sin ${alpha}^\\circ-\\sin ${beta}^\\circ = 2\\cos ${m}^\\circ\\sin ${d}^\\circ \\approx ${val.toFixed(4)}`,
  },
  "cos-plus": {
    label: "cos \\alpha + cos \\beta",
    note: "Zbir kosinusa prelazi u proizvod dva kosinusa. To je vrlo zgodno kada trazis nule ili znak izraza.",
    lhsLabel: "\\cos\\alpha+\\cos\\beta",
    rhsLabel: "2\\cos m\\cos d",
    lhs: (a, b) => Math.cos(a) + Math.cos(b),
    rhs: (a, b) => 2 * Math.cos((a + b) / 2) * Math.cos((a - b) / 2),
    forwardFormula: (alpha, beta, m, d, val) =>
      `\\cos ${alpha}^\\circ+\\cos ${beta}^\\circ = 2\\cos ${m}^\\circ\\cos ${d}^\\circ \\approx ${val.toFixed(4)}`,
  },
  "cos-minus": {
    label: "cos \\alpha - cos \\beta",
    note: "Razlika kosinusa je formula sa obaveznim minusom ispred proizvoda. Nju proveravaj dodatno svaki put.",
    lhsLabel: "\\cos\\alpha-\\cos\\beta",
    rhsLabel: "-2\\sin m\\sin d",
    lhs: (a, b) => Math.cos(a) - Math.cos(b),
    rhs: (a, b) => -2 * Math.sin((a + b) / 2) * Math.sin((a - b) / 2),
    forwardFormula: (alpha, beta, m, d, val) =>
      `\\cos ${alpha}^\\circ-\\cos ${beta}^\\circ = -2\\sin ${m}^\\circ\\sin ${d}^\\circ \\approx ${val.toFixed(4)}`,
  },
};

const PRESETS: { alpha: number; beta: number; mode: Mode; label: string }[] = [
  { alpha: 75, beta: 15, mode: "sin-plus", label: "75\u00B0 i 15\u00B0" },
  { alpha: 70, beta: 10, mode: "sin-minus", label: "70\u00B0 i 10\u00B0" },
  { alpha: 80, beta: 40, mode: "cos-plus", label: "80\u00B0 i 40\u00B0" },
  { alpha: 140, beta: 20, mode: "cos-minus", label: "140\u00B0 i 20\u00B0" },
];

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polar(cx: number, cy: number, r: number, angleRad: number) {
  return { x: cx + r * Math.cos(angleRad), y: cy - r * Math.sin(angleRad) };
}

export default function SumProductLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("sin-plus");
  const [alpha, setAlpha] = useState(75);
  const [beta, setBeta] = useState(15);

  const midpoint = (alpha + beta) / 2;
  const halfdiff = (alpha - beta) / 2;
  const alphaRad = degToRad(alpha);
  const betaRad = degToRad(beta);
  const cfg = MODES[mode];
  const lhsVal = cfg.lhs(alphaRad, betaRad);
  const rhsVal = cfg.rhs(alphaRad, betaRad);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    /* background */
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "rgba(38,16,10,0.96)");
    grad.addColorStop(1, "rgba(9,4,3,0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* grid */
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.34;

    /* axes */
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - radius - 40, cy);
    ctx.lineTo(cx + radius + 40, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 40);
    ctx.lineTo(cx, cy + radius + 40);
    ctx.stroke();

    /* circle */
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,216,187,0.32)";
    ctx.lineWidth = 3;
    ctx.stroke();

    /* arc helper */
    function drawArc(
      from: number,
      to: number,
      r: number,
      color: string,
      width: number
    ) {
      const steps = 80;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const deg = from + (to - from) * t;
        const p = polar(cx, cy, r, degToRad(deg));
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    /* arcs */
    drawArc(0, alpha, radius * 0.42, "rgba(236,91,19,0.75)", 5);
    drawArc(0, beta, radius * 0.56, "rgba(143,215,255,0.75)", 5);
    drawArc(alpha, beta, radius * 0.72, "rgba(207,183,255,0.72)", 4);

    /* rays */
    function drawRay(
      deg: number,
      r: number,
      color: string,
      width: number,
      label: string
    ) {
      const p = polar(cx, cy, r, degToRad(deg));
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      const lp = polar(cx, cy, r + 24, degToRad(deg));
      ctx.fillStyle = "#f1e2d7";
      ctx.font = `700 ${Math.max(14, W * 0.035)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, lp.x, lp.y);
    }

    drawRay(alpha, radius, "#ec5b13", 5, "\u03B1");
    drawRay(beta, radius, "#8fd7ff", 5, "\u03B2");
    drawRay(midpoint, radius * 0.92, "#8fe28c", 4, "m");

    /* center dot */
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#f1e2d7";
    ctx.fill();

    /* labels */
    const fs = Math.max(12, W * 0.03);
    ctx.fillStyle = "#f1e2d7";
    ctx.font = `700 ${fs}px sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText("m = (\u03B1 + \u03B2) / 2", 24, 36);
    ctx.fillText("d = (\u03B1 - \u03B2) / 2", 24, 36 + fs + 8);

    ctx.font = `600 ${fs * 0.82}px sans-serif`;
    ctx.fillStyle = "rgba(241,226,215,0.84)";
    ctx.fillText("narand\u017Easto: \u03B1", 24, H - 68);
    ctx.fillText("plavo: \u03B2", 24, H - 42);
    ctx.fillText("zeleno: srednji ugao m", 24, H - 16);
  }, [alpha, beta, midpoint]);

  useEffect(() => {
    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [render]);

  return (
    <div className={s.interactiveShell}>
      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "1/1" }}
          aria-label="Interaktivna kru\u017Enica za transformacije zbira u proizvod"
        />
        <p className={cs.diagramCaption} style={{ marginTop: 10 }}>
          Narand\u017Easti krak je{" "}
          <InlineMath>{String.raw`\alpha`}</InlineMath>, plavi je{" "}
          <InlineMath>{String.raw`\beta`}</InlineMath>, zeleni je srednji ugao{" "}
          <InlineMath>{"m"}</InlineMath>, a ljubi\u010Dasti luk meri koliko su{" "}
          <InlineMath>{String.raw`\alpha`}</InlineMath> i{" "}
          <InlineMath>{String.raw`\beta`}</InlineMath> udaljeni.
        </p>
      </div>

      {/* Controls */}
      <article className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>Kontrole</h3>

        {/* mode */}
        <div className={s.field} style={{ marginTop: 14 }}>
          <label htmlFor="sp-mode">Tip transformacije</label>
          <select
            id="sp-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="sin-plus">sin &alpha; + sin &beta;</option>
            <option value="sin-minus">sin &alpha; &minus; sin &beta;</option>
            <option value="cos-plus">cos &alpha; + cos &beta;</option>
            <option value="cos-minus">cos &alpha; &minus; cos &beta;</option>
          </select>
        </div>

        {/* alpha */}
        <div className={s.rangeWrap}>
          <label>
            Ugao <InlineMath>{String.raw`\alpha`}</InlineMath>: {alpha}&deg;
          </label>
          <input
            type="range"
            min={-150}
            max={210}
            step={1}
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          />
        </div>

        {/* beta */}
        <div className={s.rangeWrap}>
          <label>
            Ugao <InlineMath>{String.raw`\beta`}</InlineMath>: {beta}&deg;
          </label>
          <input
            type="range"
            min={-150}
            max={210}
            step={1}
            value={beta}
            onChange={(e) => setBeta(Number(e.target.value))}
          />
        </div>

        {/* presets */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              className={s.presetBtn}
              style={
                alpha === p.alpha && beta === p.beta && mode === p.mode
                  ? { background: "rgba(236,91,19,0.22)" }
                  : undefined
              }
              onClick={() => {
                setAlpha(p.alpha);
                setBeta(p.beta);
                setMode(p.mode);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* readout */}
        <div className={s.resultsGrid} style={{ marginTop: 18 }}>
          <div className={s.resultCard}>
            <strong>Srednji ugao m</strong>
            <InlineMath>{`${midpoint.toFixed(1)}^\\circ`}</InlineMath>
          </div>
          <div className={s.resultCard}>
            <strong>Polurazlika d</strong>
            <InlineMath>{`${halfdiff.toFixed(1)}^\\circ`}</InlineMath>
          </div>
          <div className={s.resultCard}>
            <strong>Leva strana</strong>
            <span style={{ color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              {lhsVal.toFixed(4)}
            </span>
          </div>
          <div className={s.resultCard}>
            <strong>Desna strana</strong>
            <span style={{ color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              {rhsVal.toFixed(4)}
            </span>
          </div>
        </div>

        {/* forward formula */}
        <MathBlock>
          {cfg.forwardFormula(alpha, beta, midpoint, halfdiff, lhsVal)}
        </MathBlock>

        <p style={{ color: "var(--lesson-muted)", marginTop: 10 }}>{cfg.note}</p>
      </article>
    </div>
  );
}
