"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

interface PolarLabState {
  mode: "power" | "roots";
  radius: number;
  angleDeg: number;
  n: number;
  showLabels: boolean;
}

interface Complex {
  re: number;
  im: number;
}

interface RootEntry {
  k: number;
  angle: number;
  point: Complex;
}

const PRESETS: Record<string, PolarLabState> = {
  unit: { mode: "power", radius: 1, angleDeg: 30, n: 12, showLabels: true },
  power: { mode: "power", radius: 2, angleDeg: 45, n: 4, showLabels: true },
  roots: { mode: "roots", radius: 8, angleDeg: 90, n: 3, showLabels: true },
  exam: { mode: "roots", radius: 16, angleDeg: 0, n: 4, showLabels: true },
};

function approx(value: number, digits = 3): number {
  const factor = Math.pow(10, digits);
  const rounded = Math.round(value * factor) / factor;
  if (Object.is(rounded, -0)) return 0;
  return rounded;
}

function formatNumber(value: number, digits = 3): string {
  const rounded = approx(value, digits);
  if (Number.isInteger(rounded)) return String(rounded);
  return String(rounded)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*[1-9])0+$/, "$1");
}

function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function polarToComplex(radius: number, angleDeg: number): Complex {
  const rad = degToRad(angleDeg);
  return { re: radius * Math.cos(rad), im: radius * Math.sin(rad) };
}

function complexLatex(z: Complex): string {
  const re = approx(z.re, 3);
  const im = approx(z.im, 3);
  const absIm = Math.abs(im);
  if (im === 0) return formatNumber(re);
  const imText = absIm === 1 ? "i" : `${formatNumber(absIm)}i`;
  if (re === 0) return im < 0 ? `-${imText}` : imText;
  return `${formatNumber(re)} ${im < 0 ? "-" : "+"} ${imText}`;
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  label: string,
  showLabel: boolean
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  const sz = 10;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - sz * Math.cos(angle - Math.PI / 6), y2 - sz * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - sz * Math.cos(angle + Math.PI / 6), y2 - sz * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x2, y2, 5.2, 0, Math.PI * 2);
  ctx.fill();

  if (showLabel) {
    ctx.font = '600 13px "Public Sans", sans-serif';
    ctx.fillText(label, x2 + 8, y2 - 10);
  }
}

function renderCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  state: PolarLabState
) {
  const isLight = document.documentElement.classList.contains("light");
  const T = {
    bg: isLight ? "#f5f0eb" : "rgba(8, 4, 2, 0.95)",
    text: isLight ? "#2a2420" : "#f6eee9",
    muted: isLight ? "#7a6f68" : "#cdb8aa",
    grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    gridStrong: isLight ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.24)",
    gridLabel: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.30)",
    axisLabel: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.68)",
    baseCircle: isLight ? "rgba(236,91,19,0.18)" : "rgba(255, 154, 106, 0.18)",
    powerCircle: isLight ? "rgba(107,223,183,0.18)" : "rgba(107, 223, 183, 0.16)",
    rootCircle: isLight ? "rgba(192,162,255,0.22)" : "rgba(192, 162, 255, 0.18)",
    rootPoly: isLight ? "rgba(192,162,255,0.25)" : "rgba(192, 162, 255, 0.2)",
  };

  const base = polarToComplex(state.radius, state.angleDeg);
  const n = state.n;

  let powerPoint: Complex | null = null;
  const roots: Complex[] = [];
  let rootRadius = 0;

  if (state.mode === "power") {
    const poweredRadius = Math.pow(state.radius, n);
    const rawAngle = state.angleDeg * n;
    powerPoint = polarToComplex(poweredRadius, rawAngle);
  } else {
    rootRadius = Math.pow(state.radius, 1 / n);
    for (let k = 0; k < n; k++) {
      const angle = (state.angleDeg + 360 * k) / n;
      roots.push(polarToComplex(rootRadius, angle));
    }
  }

  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, canvas.clientWidth || 640);
  const height = Math.max(240, Math.round(width * 0.62));
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const all: Complex[] = [base];
  if (powerPoint) all.push(powerPoint);
  roots.forEach((r) => all.push(r));

  let maxCoord = 2;
  all.forEach((p) => {
    maxCoord = Math.max(maxCoord, Math.abs(p.re), Math.abs(p.im));
  });
  if (rootRadius) maxCoord = Math.max(maxCoord, rootRadius);
  maxCoord += 1;

  const margin = 44;
  const scale = Math.min(
    (width / 2 - margin) / maxCoord,
    (height / 2 - margin) / maxCoord
  );
  const cx = width / 2;
  const cy = height / 2;
  const mapX = (x: number) => cx + x * scale;
  const mapY = (y: number) => cy - y * scale;

  // Pick a nice grid step so we get roughly 5–10 lines per half-axis
  function niceStep(range: number): number {
    const raw = range / 6;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    if (norm <= 1) return mag;
    if (norm <= 2) return 2 * mag;
    if (norm <= 5) return 5 * mag;
    return 10 * mag;
  }
  const step = niceStep(maxCoord);
  const gridMax = Math.ceil(maxCoord / step) * step;

  // Background
  ctx.fillStyle = T.bg;
  ctx.fillRect(0, 0, width, height);

  // Grid lines
  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let v = -gridMax; v <= gridMax; v += step) {
    if (Math.abs(v) < step * 0.01) continue; // skip origin
    ctx.beginPath();
    ctx.moveTo(mapX(v), margin * 0.55);
    ctx.lineTo(mapX(v), height - margin * 0.55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(margin * 0.55, mapY(v));
    ctx.lineTo(width - margin * 0.55, mapY(v));
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = T.gridStrong;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(margin * 0.45, cy);
  ctx.lineTo(width - margin * 0.45, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, margin * 0.45);
  ctx.lineTo(cx, height - margin * 0.45);
  ctx.stroke();

  // Axis labels
  ctx.fillStyle = T.axisLabel;
  ctx.font = '600 13px "Public Sans", sans-serif';
  ctx.fillText("Re", width - 28, cy - 10);
  ctx.fillText("Im", cx + 10, 24);

  // Grid numbers
  if (state.showLabels) {
    ctx.fillStyle = T.gridLabel;
    ctx.font = '500 11px "Public Sans", sans-serif';
    for (let v = -gridMax; v <= gridMax; v += step) {
      if (Math.abs(v) < step * 0.01) continue;
      const label = Number.isInteger(v) ? String(v) : v.toFixed(1);
      ctx.fillText(label, mapX(v) - 4, cy + 16);
      ctx.fillText(label, cx + 8, mapY(v) + 4);
    }
  }

  // Base circle
  const baseR = Math.sqrt(base.re ** 2 + base.im ** 2) * scale;
  if (state.showLabels) {
    ctx.strokeStyle = T.baseCircle;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Power circle
  if (powerPoint && state.showLabels) {
    const pR = Math.sqrt(powerPoint.re ** 2 + powerPoint.im ** 2) * scale;
    ctx.strokeStyle = T.powerCircle;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, pR, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Root circle
  if (rootRadius && state.showLabels) {
    ctx.strokeStyle = T.rootCircle;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, rootRadius * scale, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Vectors
  drawArrow(ctx, cx, cy, mapX(base.re), mapY(base.im), "#ec5b13", "z", state.showLabels);
  if (powerPoint) {
    drawArrow(ctx, cx, cy, mapX(powerPoint.re), mapY(powerPoint.im), "#6bdfb7", "zⁿ", state.showLabels);
  }

  // Root polygon + points
  if (roots.length > 0) {
    ctx.strokeStyle = T.rootPoly;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    roots.forEach((root, idx) => {
      const x = mapX(root.re);
      const y = mapY(root.im);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    if (roots.length > 2) ctx.closePath();
    ctx.stroke();

    roots.forEach((root, idx) => {
      const x = mapX(root.re);
      const y = mapY(root.im);
      ctx.fillStyle = "#c0a2ff";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      if (state.showLabels) {
        ctx.font = '600 12px "Public Sans", sans-serif';
        ctx.fillText(`z${idx}`, x + 8, y - 8);
      }
    });
  }
}

function computeResults(state: PolarLabState) {
  const base = polarToComplex(state.radius, state.angleDeg);
  const baseAngle = normalize360(state.angleDeg);
  const n = state.n;

  const polarTex = `z = ${formatNumber(state.radius)}(\\cos ${formatNumber(baseAngle)}^\\circ + i\\sin ${formatNumber(baseAngle)}^\\circ)`;
  const cartesianTex = `z \\approx ${complexLatex(base)}`;

  if (state.mode === "power") {
    const powR = Math.pow(state.radius, n);
    const rawAngle = state.angleDeg * n;
    const normAngle = normalize360(rawAngle);
    const pp = polarToComplex(powR, rawAngle);

    return {
      polarTex,
      cartesianTex,
      resultTex: `z^{${n}} = ${formatNumber(powR)}(\\cos ${formatNumber(normAngle)}^\\circ + i\\sin ${formatNumber(normAngle)}^\\circ)`,
      conceptTex: `Pri stepenovanju \\; r \\mapsto r^{${n}}, \\; \\varphi \\mapsto ${n}\\varphi.`,
      formulaBoxTex: `z^{${n}} = ${formatNumber(state.radius)}^{${n}}\\left(\\cos(${n}\\cdot ${formatNumber(baseAngle)}^\\circ) + i\\sin(${n}\\cdot ${formatNumber(baseAngle)}^\\circ)\\right) = ${formatNumber(powR)}\\left(\\cos ${formatNumber(normAngle)}^\\circ + i\\sin ${formatNumber(normAngle)}^\\circ\\right) \\approx ${complexLatex(pp)}`,
      labHint:
        "Kod Moivreove formule ne pokušavaš da množiš algebarski više puta. Broj prevedeš u polarni zapis, pa radiš sa modulom i uglom.",
      rootEntries: [] as RootEntry[],
    };
  }

  const rootR = Math.pow(state.radius, 1 / n);
  const rootEntries: RootEntry[] = [];
  for (let k = 0; k < n; k++) {
    const angle = (state.angleDeg + 360 * k) / n;
    rootEntries.push({ k, angle, point: polarToComplex(rootR, angle) });
  }

  return {
    polarTex,
    cartesianTex,
    resultTex: `${n}\\text{-ti koreni imaju modul } ${formatNumber(rootR)}\\text{ i ukupno ih je } ${n}`,
    conceptTex: `Pri korenovanju \\; r \\mapsto \\sqrt[${n}]{r}, \\; ugao \\; se \\; deli \\; sa \\; ${n} \\; uz \\; dodatke \\; 360^\\circ k.`,
    formulaBoxTex: `z_k = \\sqrt[${n}]{${formatNumber(state.radius)}}\\left(\\cos \\frac{${formatNumber(baseAngle)}^\\circ + 360^\\circ k}{${n}} + i\\sin \\frac{${formatNumber(baseAngle)}^\\circ + 360^\\circ k}{${n}}\\right),\\quad k=0,1,\\dots,${n - 1} \\qquad \\sqrt[${n}]{${formatNumber(state.radius)}} = ${formatNumber(rootR)}`,
    labHint: `Koreni nisu nasumični. Svi su na istoj kružnici i ravnomerno su raspoređeni pod uglovima razmaknutim za \\(360^\\circ/${n}\\).`,
    rootEntries,
  };
}

export default function PolarLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<PolarLabState>(PRESETS.power);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderCanvas(ctx, canvas, state);
  }, [state]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", handleResize); observer.disconnect(); };
  }, [draw]);

  const update = (partial: Partial<PolarLabState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  const computed = computeResults(state);

  return (
    <div className={s.interactiveShell}>
      {/* Controls */}
      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Kontrole</h3>
        <p>
          Interaktivni deo koristi ugao u stepenima radi intuicije. U teorijskim
          formulama i na ozbiljnijim zadacima standardni zapis ostaje u
          radijanima.
        </p>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label htmlFor="modeSelect">Režim rada</label>
            <select
              id="modeSelect"
              value={state.mode}
              onChange={(e) =>
                update({ mode: e.target.value as "power" | "roots" })
              }
            >
              <option value="power">{"Moivreova formula: z^n"}</option>
              <option value="roots">{"n-ti koreni broja z"}</option>
            </select>
          </div>
          <div className={s.field}>
            <label htmlFor="radiusInput">
              Modul <MathJax inline>{"\\(r\\)"}</MathJax>
            </label>
            <input
              id="radiusInput"
              type="number"
              min={0.25}
              max={16}
              step={0.25}
              value={state.radius}
              onChange={(e) =>
                update({
                  radius: Math.min(
                    16,
                    Math.max(0.25, parseFloat(e.target.value) || 2)
                  ),
                })
              }
            />
          </div>
          <div className={s.field}>
            <label htmlFor="angleNumber">
              Ugao <MathJax inline>{"\\(\\varphi\\)"}</MathJax> u stepenima
            </label>
            <input
              id="angleNumber"
              type="number"
              min={0}
              max={360}
              step={1}
              value={state.angleDeg}
              onChange={(e) =>
                update({
                  angleDeg: Math.min(
                    360,
                    Math.max(0, parseInt(e.target.value) || 0)
                  ),
                })
              }
            />
          </div>
          <div className={s.field}>
            <label htmlFor="indexInput">
              Indeks <MathJax inline>{"\\(n\\)"}</MathJax>
            </label>
            <input
              id="indexInput"
              type="number"
              min={2}
              max={8}
              step={1}
              value={state.n}
              onChange={(e) =>
                update({
                  n: Math.min(
                    8,
                    Math.max(2, parseInt(e.target.value) || 2)
                  ),
                })
              }
            />
          </div>
        </div>

        <div className={s.rangeWrap}>
          <label htmlFor="angleRange">Pomeraj ugla preko klizača</label>
          <input
            id="angleRange"
            type="range"
            min={0}
            max={360}
            step={1}
            value={state.angleDeg}
            onChange={(e) => update({ angleDeg: parseInt(e.target.value) || 0 })}
          />
        </div>

        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={state.showLabels}
            onChange={(e) => update({ showLabels: e.target.checked })}
          />
          <span>Prikaži oznake tačaka i pomoćne kružnice</span>
        </label>

        <div className={cs.presetRow} style={{ marginTop: 14 }}>
          {(
            [
              ["unit", "Jedinični krug"],
              ["power", "Moivreov stepen"],
              ["roots", "Treći koreni"],
              ["exam", "Prijemni primer"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              className={s.presetBtn}
              type="button"
              onClick={() => setState(PRESETS[key])}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={s.labNote}>
          <MathJax dynamic>{computed.labHint}</MathJax>
        </div>
      </article>

      {/* Visualization */}
      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Vizuelni prikaz i rezultat</h3>

        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            width={960}
            height={600}
            aria-label="Prikaz kompleksnog broja u trigonometrijskom obliku"
          />
        </div>

        <div className={s.resultsGrid}>
          <div className={s.resultCard}>
            <strong>Trigonometrijski zapis</strong>
            <MathJax dynamic>{`\\(${computed.polarTex}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Algebarski zapis</strong>
            <MathJax dynamic>{`\\(${computed.cartesianTex}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Glavni rezultat</strong>
            <MathJax dynamic>{`\\(${computed.resultTex}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Ključna ideja</strong>
            <MathJax dynamic>{`\\(${computed.conceptTex}\\)`}</MathJax>
          </div>
        </div>

        <div className={s.labNote}>
          <MathJax dynamic>{`\\[${computed.formulaBoxTex}\\]`}</MathJax>
        </div>

        {state.mode === "roots" && computed.rootEntries.length > 0 && (
          <div className={s.rootsGrid}>
            {computed.rootEntries.map((entry) => (
              <div key={entry.k} className={s.rootChip}>
                <MathJax dynamic>
                  {`\\(z_${entry.k} = ${formatNumber(Math.pow(state.radius, 1 / state.n))}(\\cos ${formatNumber(normalize360(entry.angle))}^\\circ + i\\sin ${formatNumber(normalize360(entry.angle))}^\\circ)\\)`}
                </MathJax>
                <br />
                <MathJax dynamic>
                  {`\\(\\approx ${complexLatex(entry.point)}\\)`}
                </MathJax>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
