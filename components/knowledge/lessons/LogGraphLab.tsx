"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  base: number;
  p: number;
  q: number;
  xProbe: number;
}

interface Preset {
  label: string;
  base: number;
  p: number;
  q: number;
  x: number;
}

const PRESETS: Preset[] = [
  { label: "Osnovni rast", base: 2, p: 0, q: 0, x: 2 },
  { label: "Osnovni pad", base: 0.5, p: 0, q: 0, x: 2 },
  { label: "Pomerena udesno", base: 3, p: 2, q: 1, x: 5 },
  { label: "Argument 5\u2212x", base: 2, p: 0, q: 0, x: 3 },
];

const BASE_OPTIONS = [
  { value: 0.5, label: "1/2" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 10, label: "10" },
];

const SPECIAL_LATEX = new Map<number, string>([
  [0.5, "\\frac{1}{2}"],
  [2, "2"],
  [3, "3"],
  [10, "10"],
]);

/* ── Helpers ── */

function fmt(value: number): string {
  if (Math.abs(value) < 1e-9) return "0";
  const rounded = Math.round(value * 100) / 100;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded
        .toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
  return text.replace("-", "\u2212");
}

function latexNum(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded) < 1e-9) return "0";
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function baseLatex(a: number): string {
  return SPECIAL_LATEX.get(a) || latexNum(a);
}

function wrappedBaseLatex(a: number): string {
  const text = baseLatex(a);
  return text.includes("\\frac") ? `\\left(${text}\\right)` : text;
}

function argumentLatex(p: number): string {
  if (Math.abs(p) < 1e-9) return "x";
  if (p > 0) return `x-${latexNum(p)}`;
  return `x+${latexNum(-p)}`;
}

function formulaLatex(a: number, p: number, q: number): string {
  let body = `\\log_{${wrappedBaseLatex(a)}}\\!\\left(${argumentLatex(p)}\\right)`;
  if (Math.abs(q) < 1e-9) return `y=${body}`;
  if (q > 0) body += `+${latexNum(q)}`;
  else body += `${latexNum(q)}`;
  return `y=${body}`;
}

function inverseLatex(a: number, p: number, q: number): string {
  const bStr = wrappedBaseLatex(a);
  const exponent = Math.abs(q) < 1e-9 ? "x" : q > 0 ? `x-${latexNum(q)}` : `x+${latexNum(-q)}`;
  const shift = Math.abs(p) < 1e-9 ? "" : p > 0 ? `+${latexNum(p)}` : `${latexNum(p)}`;
  return `y=${bStr}^{${exponent}}${shift}`;
}

function domainLatex(p: number): string {
  return `D=(${latexNum(p)},\\infty),\\quad V=\\mathbb{R}`;
}

function asymptoteLatex(p: number, a: number): string {
  const mono = a > 1 ? "\\text{Rastuca}" : "\\text{Opadajuca}";
  return `x=${latexNum(p)},\\quad ${mono}`;
}

function pointLatex(x: number, y: number): string {
  return `\\left(${latexNum(x)},${latexNum(y)}\\right)`;
}

function keyPointsLatex(a: number, p: number, q: number): string {
  const p1 = pointLatex(p + 1, q);
  const p2 = pointLatex(p + a, 1 + q);
  const p3 = pointLatex(p + 1 / a, -1 + q);
  return `${p1},\\ ${p2},\\ ${p3}`;
}

function probeLatex(a: number, p: number, q: number, x: number): string {
  const arg = x - p;
  if (arg <= 0) return "\\text{Nije definisano}";
  const y = Math.log(arg) / Math.log(a) + q;
  return `f(${latexNum(x)})=${latexNum(y)}`;
}

/* ── Canvas drawing ── */

function drawLogGraph(
  canvas: HTMLCanvasElement,
  a: number,
  p: number,
  q: number,
  xMark: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(340, rect.height);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const xMin = Math.min(-4, p - 3);
  const xMax = Math.max(10, p + 8);
  const yMin = -6;
  const yMax = 8;
  const padding = 44;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const mapX = (v: number) =>
    padding + ((v - xMin) / (xMax - xMin)) * plotWidth;
  const mapY = (v: number) =>
    height - padding - ((v - yMin) / (yMax - yMin)) * plotHeight;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "rgba(21, 9, 6, 0.96)");
  bg.addColorStop(1, "rgba(7, 3, 2, 0.98)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
    ctx.beginPath();
    ctx.moveTo(mapX(x), padding);
    ctx.lineTo(mapX(x), height - padding);
    ctx.stroke();
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
    ctx.beginPath();
    ctx.moveTo(padding, mapY(y));
    ctx.lineTo(width - padding, mapY(y));
    ctx.stroke();
  }

  // Axes
  if (yMin <= 0 && yMax >= 0) {
    ctx.strokeStyle = "rgba(255,215,185,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, mapY(0));
    ctx.lineTo(width - padding, mapY(0));
    ctx.stroke();
  }
  if (xMin <= 0 && xMax >= 0) {
    ctx.strokeStyle = "rgba(255,215,185,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), padding);
    ctx.lineTo(mapX(0), height - padding);
    ctx.stroke();
  }

  // Axis labels
  ctx.fillStyle = "rgba(214,199,187,0.92)";
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  if (yMin <= 0 && yMax >= 0) {
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
      if (x !== 0) ctx.fillText(String(x), mapX(x) - 4, mapY(0) + 16);
    }
  }
  if (xMin <= 0 && xMax >= 0) {
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
      if (y !== 0) ctx.fillText(String(y), mapX(0) + 8, mapY(y) + 4);
    }
  }

  // Vertical asymptote (dashed)
  if (p >= xMin && p <= xMax) {
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(116,223,183,0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(p), padding);
    ctx.lineTo(mapX(p), height - padding);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(116,223,183,0.96)";
    ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(`x = ${fmt(p)}`, mapX(p) + 8, padding + 18);
  }

  // y = x line (dashed, for inverse reference)
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = "rgba(207,183,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const yxStart = Math.max(xMin, yMin);
  const yxEnd = Math.min(xMax, yMax);
  ctx.moveTo(mapX(yxStart), mapY(yxStart));
  ctx.lineTo(mapX(yxEnd), mapY(yxEnd));
  ctx.stroke();
  ctx.setLineDash([]);

  // Clip region
  ctx.save();
  ctx.beginPath();
  ctx.rect(padding, padding, plotWidth, plotHeight);
  ctx.clip();

  // Inverse exponential curve (thin)
  ctx.strokeStyle = "rgba(207,183,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const invSamples = 420;
  let invStarted = false;
  for (let i = 0; i <= invSamples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / invSamples;
    const y = Math.pow(a, x - q) + p;
    if (y < yMin - 2 || y > yMax + 2) {
      invStarted = false;
      continue;
    }
    const px = mapX(x);
    const py = mapY(y);
    if (!invStarted) {
      ctx.moveTo(px, py);
      invStarted = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  // Logarithmic curve (primary)
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 4;
  ctx.beginPath();
  const samples = 600;
  let started = false;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const arg = x - p;
    if (arg <= 0.001) continue;
    const y = Math.log(arg) / Math.log(a) + q;
    if (y < yMin - 2 || y > yMax + 2) {
      started = false;
      continue;
    }
    const px = mapX(x);
    const py = mapY(y);
    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  ctx.restore();

  // Probe point and dashed lines
  const probeArg = xMark - p;
  if (probeArg > 0) {
    const yProbe = Math.log(probeArg) / Math.log(a) + q;
    if (yProbe >= yMin - 0.5 && yProbe <= yMax + 0.5) {
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "rgba(142,215,255,0.6)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(mapX(xMark), mapY(0));
      ctx.lineTo(mapX(xMark), mapY(yProbe));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mapX(0), mapY(yProbe));
      ctx.lineTo(mapX(xMark), mapY(yProbe));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.fillStyle = "#8ed7ff";
      ctx.arc(mapX(xMark), mapY(yProbe), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(246,238,233,0.96)";
      ctx.font = '13px "Public Sans", system-ui, sans-serif';
      ctx.fillText("P", mapX(xMark) + 10, mapY(yProbe) - 10);
    }
  }

  // Key points
  const drawPoint = (
    x: number,
    y: number,
    color: string,
    label: string
  ) => {
    if (x < xMin - 0.5 || x > xMax + 0.5 || y < yMin - 0.5 || y > yMax + 0.5)
      return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(mapX(x), mapY(y), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(246,238,233,0.96)";
    ctx.font = '13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(label, mapX(x) + 10, mapY(y) - 10);
  };

  drawPoint(p + 1, q, "#ffd7b9", "A");
  if (p + a <= xMax + 0.5) drawPoint(p + a, 1 + q, "#74dfb7", "B");

  // Top-left info overlay
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = '600 14px "Public Sans", system-ui, sans-serif';
  const baseStr = BASE_OPTIONS.find((o) => o.value === a)?.label ?? fmt(a);
  ctx.fillText(`y = log_${baseStr}(${argumentLatex(p).replace(/\\/g, "")})${Math.abs(q) > 0.01 ? (q > 0 ? " + " : " \u2212 ") + fmt(Math.abs(q)) : ""}`, 18, 24);
  ctx.fillText(`A = (${fmt(p + 1)}, ${fmt(q)})`, 18, 46);
  if (probeArg > 0) {
    const yProbe = Math.log(probeArg) / Math.log(a) + q;
    ctx.fillText(`P = (${fmt(xMark)}, ${fmt(yProbe)})`, 18, 68);
  } else {
    ctx.fillText(`P: nije definisano`, 18, 68);
  }
}

/* ── Component ── */

export default function LogGraphLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    base: 2,
    p: 0,
    q: 0,
    xProbe: 2,
  });

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawLogGraph(
        canvasRef.current,
        state.base,
        state.p,
        state.q,
        state.xProbe
      );
    }
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  const setBase = (v: number) => setState((prev) => ({ ...prev, base: v }));
  const setP = (v: number) => setState((prev) => ({ ...prev, p: v }));
  const setQ = (v: number) => setState((prev) => ({ ...prev, q: v }));
  const setX = (v: number) => setState((prev) => ({ ...prev, xProbe: v }));

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* ── Controls ── */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>
          <p style={{ fontSize: "0.92rem", color: "var(--lesson-muted)" }}>
            Za svaku novu postavku pokusaj najpre da sam predvidis: domen, asimptotu i smer grafa.
          </p>

          <div className={s.rangeWrap}>
            <label>
              Baza <em>a</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {BASE_OPTIONS.find((o) => o.value === state.base)?.label ??
                  fmt(state.base)}
              </span>
            </label>
            <select
              value={state.base}
              onChange={(e) => setBase(Number(e.target.value))}
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "var(--lesson-text)",
                padding: "11px 12px",
                font: "inherit",
              }}
            >
              {BASE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Prve dve baze odmah otkrivaju razliku izmedju rastuceg i opadajuceg logaritma.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Horizontalni pomeraj <em>p</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.p)}
              </span>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.5}
              value={state.p}
              onChange={(e) => setP(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Ovaj broj pomera i domen i vertikalnu asimptotu.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Vertikalni pomeraj <em>q</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.q)}
              </span>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.5}
              value={state.q}
              onChange={(e) => setQ(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Menja visinu karakteristicnih tacaka, ali ne menja domen.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Probna tacka <em>x</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.xProbe)}
              </span>
            </label>
            <input
              type="range"
              min={-2}
              max={10}
              step={0.5}
              value={state.xProbe}
              onChange={(e) => setX(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Ako je izabrani <em>x</em> levo od asimptote, funkcija tu nije definisana.
            </span>
          </div>

          <div className={cs.presetRow} style={{ marginTop: 16 }}>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                className={s.presetBtn}
                type="button"
                onClick={() =>
                  setState({
                    base: preset.base,
                    p: preset.p,
                    q: preset.q,
                    xProbe: preset.x,
                  })
                }
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p
            className={s.labNote}
            style={{ marginTop: 16, fontSize: "0.92rem" }}
          >
            Posmatraj da se logaritamski grafik i eksponencijalna inverzna funkcija ogledaju oko prave y=x.
          </p>
        </div>

        {/* ── Canvas ── */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 11" }}
            aria-label="Interaktivni graf logaritamske funkcije i njene inverzne eksponencijalne funkcije"
          />
        </div>
      </div>

      {/* ── Live readouts ── */}
      <div
        className={s.resultsGrid}
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 16 }}
      >
        <div className={s.resultCard}>
          <strong>Trenutna funkcija</strong>
          <MathJax dynamic>{`\\(${formulaLatex(state.base, state.p, state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Ovo je logaritamska funkcija koju trenutno crtas.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Inverzna funkcija</strong>
          <MathJax dynamic>{`\\(${inverseLatex(state.base, state.p, state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Ljubicasta kriva na grafiku.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Domen i skup vrednosti</strong>
          <MathJax dynamic>{`\\(${domainLatex(state.p)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Argument mora biti pozitivan.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Asimptota i monotonost</strong>
          <MathJax dynamic>{`\\(${asymptoteLatex(state.p, state.base)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Vertikalna asimptota prati horizontalni pomeraj.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Karakteristicne tacke</strong>
          <MathJax dynamic>{`\\(${keyPointsLatex(state.base, state.p, state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Tacke za argument 1, a i 1/a.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Vrednost u probnoj tacki</strong>
          <MathJax dynamic>{`\\(${probeLatex(state.base, state.p, state.q, state.xProbe)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Koristi je da proveris citanje funkcije bez kalkulatora.
          </p>
        </div>
      </div>
    </div>
  );
}
