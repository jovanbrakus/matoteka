"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

type ProportionMode = "direct" | "inverse";

interface Preset {
  key: string;
  label: string;
  mode: ProportionMode;
  xName: string;
  yName: string;
  x1: number;
  y1: number;
  x2: number;
  description: string;
}

const PRESETS: Preset[] = [
  {
    key: "notebooks",
    label: "Sveske i cena",
    mode: "direct",
    xName: "broj svezaka",
    yName: "cena (din)",
    x1: 4,
    y1: 600,
    x2: 7,
    description:
      "Cena je direktno proporcionalna količini kada je cena jedne sveske stalna.",
  },
  {
    key: "workers",
    label: "Radnici i dani",
    mode: "inverse",
    xName: "broj radnika",
    yName: "broj dana",
    x1: 6,
    y1: 10,
    x2: 15,
    description:
      "Za isti posao važi obrnuta proporcionalnost: više radnika znači manje dana.",
  },
  {
    key: "speed",
    label: "Brzina i vreme",
    mode: "inverse",
    xName: "brzina (km/h)",
    yName: "vreme (h)",
    x1: 60,
    y1: 5,
    x2: 75,
    description:
      "Za isti put brzina i vreme su obrnuto proporcionalni.",
  },
];

/* ── Helpers ── */

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function fmt(v: number): string {
  const r = Math.round(v * 1000) / 1000;
  if (Number.isInteger(r)) return String(r);
  return r
    .toFixed(3)
    .replace(/\.?0+$/, "");
}

function computeY2(mode: ProportionMode, x1: number, y1: number, x2: number) {
  return mode === "direct" ? (y1 * x2) / x1 : (x1 * y1) / x2;
}

function constantValue(mode: ProportionMode, x1: number, y1: number) {
  return mode === "direct" ? y1 / x1 : x1 * y1;
}

/* ── Drawing helpers ── */

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

/* ── Component ── */

export default function ProportionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<ProportionMode>("direct");
  const [activePreset, setActivePreset] = useState("notebooks");
  const [xName, setXName] = useState("broj svezaka");
  const [yName, setYName] = useState("cena (din)");
  const [x1, setX1] = useState(4);
  const [y1, setY1] = useState(600);
  const [x2, setX2] = useState(7);

  const y2 = computeY2(mode, x1, y1, x2);
  const k = constantValue(mode, x1, y1);

  /* Apply preset */
  const applyPreset = useCallback((p: Preset) => {
    setActivePreset(p.key);
    setMode(p.mode);
    setXName(p.xName);
    setYName(p.yName);
    setX1(p.x1);
    setY1(p.y1);
    setX2(p.x2);
  }, []);

  /* Canvas drawing */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssW = canvas.clientWidth || canvas.parentElement?.clientWidth || 800;
    const cssH = Math.max(340, Math.round(cssW * 0.48));
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * ratio);
    canvas.height = Math.round(cssH * ratio);
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const left = 72;
    const right = cssW - 36;
    const top = 40;
    const bottom = cssH - 54;
    const y2Val = computeY2(mode, x1, y1, x2);
    const maxX = Math.max(x1, x2) * 1.25;
    const maxY = Math.max(y1, y2Val) * 1.25;

    ctx.clearRect(0, 0, cssW, cssH);

    /* Background frame */
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.strokeStyle = "rgba(255,154,106,0.14)";
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, 18, 18, cssW - 36, cssH - 36, 22);
    ctx.fill();
    ctx.stroke();

    /* Title */
    ctx.fillStyle = "#ffb488";
    ctx.font = "700 16px Public Sans, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(
      mode === "direct"
        ? "Graf direktne proporcionalnosti"
        : "Graf obrnute proporcionalnosti",
      36,
      46
    );

    /* Axes */
    ctx.strokeStyle = "rgba(246,238,233,0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.lineTo(right - 8, bottom - 4);
    ctx.moveTo(right, bottom);
    ctx.lineTo(right - 8, bottom + 4);
    ctx.moveTo(left, bottom);
    ctx.lineTo(left, top);
    ctx.lineTo(left - 4, top + 8);
    ctx.moveTo(left, top);
    ctx.lineTo(left + 4, top + 8);
    ctx.stroke();

    /* Grid lines */
    ctx.font = "500 12px Public Sans, system-ui, sans-serif";
    ctx.fillStyle = "rgba(246,238,233,0.66)";
    ctx.textAlign = "center";
    for (let i = 1; i <= 5; i++) {
      const gx = left + ((right - left) * i) / 5;
      const val = (maxX * i) / 5;
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(gx, bottom);
      ctx.lineTo(gx, top);
      ctx.stroke();
      ctx.fillText(fmt(val), gx, bottom + 20);
    }
    ctx.textAlign = "right";
    for (let i = 1; i <= 5; i++) {
      const gy = bottom - ((bottom - top) * i) / 5;
      const val = (maxY * i) / 5;
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, gy);
      ctx.lineTo(right, gy);
      ctx.stroke();
      ctx.fillText(fmt(val), left - 10, gy + 4);
    }

    /* Map helpers */
    const mapX = (v: number) => left + (v / maxX) * (right - left);
    const mapY = (v: number) => bottom - (v / maxY) * (bottom - top);

    /* Curve */
    ctx.strokeStyle =
      mode === "direct"
        ? "rgba(236,91,19,0.95)"
        : "rgba(127,214,255,0.92)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (mode === "direct") {
      const yEnd = (y1 / x1) * maxX;
      ctx.moveTo(mapX(0), mapY(0));
      ctx.lineTo(mapX(maxX), mapY(yEnd));
    } else {
      const kk = x1 * y1;
      for (let i = 0; i <= 120; i++) {
        const xv = 0.08 * maxX + ((maxX - 0.08 * maxX) * i) / 120;
        const yv = kk / xv;
        const px = mapX(xv);
        const py = mapY(Math.min(yv, maxY));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    /* Points */
    const px1 = mapX(x1);
    const py1 = mapY(y1);
    const px2 = mapX(x2);
    const py2 = mapY(y2Val);

    ctx.fillStyle = "#ec5b13";
    ctx.beginPath();
    ctx.arc(px1, py1, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#7fd6ff";
    ctx.beginPath();
    ctx.arc(px2, py2, 7, 0, Math.PI * 2);
    ctx.fill();

    /* Labels */
    ctx.font = "600 13px Public Sans, system-ui, sans-serif";
    ctx.fillStyle = "#ffd7b9";
    ctx.textAlign = "left";
    ctx.fillText(`A(${fmt(x1)}, ${fmt(y1)})`, px1 + 10, py1 - 10);
    ctx.fillText(`B(${fmt(x2)}, ${fmt(y2Val)})`, px2 + 10, py2 - 10);

    /* Axis labels */
    ctx.fillStyle = "rgba(246,238,233,0.74)";
    ctx.font = "500 13px Public Sans, system-ui, sans-serif";
    ctx.fillText(xName, right - 40, bottom + 34);
    ctx.save();
    ctx.translate(left - 44, top + 20);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yName, 0, 0);
    ctx.restore();
  }, [mode, x1, y1, x2, xName, yName]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  /* Trend label */
  const trendLabel =
    x2 === x1
      ? "Isto"
      : mode === "direct"
        ? x2 > x1
          ? "Raste"
          : "Opada"
        : x2 > x1
          ? "Opada"
          : "Raste";

  const trendNote =
    x2 === x1
      ? "Ako se ulazna veličina ne menja, ni izlazna se ne menja."
      : mode === "direct"
        ? "Kod direktne proporcionalnosti veća ulazna vrednost daje veću izlaznu."
        : "Kod obrnute proporcionalnosti veća ulazna vrednost daje manju izlaznu.";

  const activeP = PRESETS.find((p) => p.key === activePreset && p.mode === mode);

  return (
    <div className={s.interactiveCard} style={{ padding: 22 }}>
      {/* Mode buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        <button
          className={s.presetBtn}
          style={mode === "direct" ? { background: "rgba(236,91,19,0.22)" } : {}}
          onClick={() => setMode("direct")}
        >
          Direktna proporcionalnost
        </button>
        <button
          className={s.presetBtn}
          style={mode === "inverse" ? { background: "rgba(236,91,19,0.22)" } : {}}
          onClick={() => setMode("inverse")}
        >
          Obrnuta proporcionalnost
        </button>
      </div>

      {/* Preset buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {PRESETS.map((p) => (
          <button
            key={p.key}
            className={s.presetBtn}
            style={
              activePreset === p.key && p.mode === mode
                ? { background: "rgba(236,91,19,0.22)" }
                : {}
            }
            onClick={() => applyPreset(p)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input fields */}
      <div className={s.controlGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className={s.field}>
          <label>
            Poznata vrednost <MathJax inline>{"\\(x_1\\)"}</MathJax> ({xName})
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={x1}
            onChange={(e) => {
              setActivePreset("custom");
              setX1(clamp(Number(e.target.value) || 1, 1, 1000));
            }}
          />
        </div>
        <div className={s.field}>
          <label>
            Poznata vrednost <MathJax inline>{"\\(y_1\\)"}</MathJax> ({yName})
          </label>
          <input
            type="number"
            min={1}
            max={10000}
            value={y1}
            onChange={(e) => {
              setActivePreset("custom");
              setY1(clamp(Number(e.target.value) || 1, 1, 10000));
            }}
          />
        </div>
        <div className={s.field}>
          <label>
            Nova vrednost <MathJax inline>{"\\(x_2\\)"}</MathJax> ({xName})
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={x2}
            onChange={(e) => {
              setActivePreset("custom");
              setX2(clamp(Number(e.target.value) || 1, 1, 1000));
            }}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap} style={{ marginTop: 18 }}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 9" }}
        />
        <p className={s.labNote} style={{ marginTop: 10 }}>
          Narandžasta tačka je poznati par (x<sub>1</sub>, y<sub>1</sub>), plava
          tačka je izračunati par (x<sub>2</sub>, y<sub>2</sub>).{" "}
          {mode === "direct"
            ? "Kod direktne proporcionalnosti dobijaš pravu kroz koordinatni početak."
            : "Kod obrnute proporcionalnosti dobijaš hiperbolu."}
        </p>
      </div>

      {/* Results */}
      <div className={s.interactiveShell} style={{ marginTop: 18 }}>
        <div className={s.resultCard} style={{ padding: 18, minHeight: "auto" }}>
          <strong>Aktivni model</strong>
          <p style={{ color: "var(--lesson-muted)", marginBottom: 10 }}>
            {activeP
              ? `${activeP.label}: poznato je da za ${fmt(x1)} važi ${fmt(y1)}, a tražimo vrednost za ${fmt(x2)}.`
              : `Prilagođeni model: poznato je da za ${fmt(x1)} važi ${fmt(y1)}, a tražimo vrednost za ${fmt(x2)}.`}
          </p>
          <MathJax dynamic>{`\\[x_1 = ${fmt(x1)},\\quad y_1 = ${fmt(y1)},\\quad x_2 = ${fmt(x2)},\\quad y_2 = ${fmt(y2)}\\]`}</MathJax>
          <p style={{ color: "var(--lesson-muted)", marginTop: 10 }}>
            {activeP?.description ??
              (mode === "direct"
                ? `Ovde veličine "${xName}" i "${yName}" posmatraš kao direktno proporcionalne.`
                : `Ovde veličine "${xName}" i "${yName}" posmatraš kao obrnuto proporcionalne.`)}
          </p>
          {mode === "direct" ? (
            <MathJax dynamic>{`\\[\\frac{${fmt(y1)}}{${fmt(x1)}} = \\frac{y_2}{${fmt(x2)}} \\quad\\Longrightarrow\\quad y_2 = \\frac{${fmt(y1)} \\cdot ${fmt(x2)}}{${fmt(x1)}} = ${fmt(y2)}\\]`}</MathJax>
          ) : (
            <MathJax dynamic>{`\\[${fmt(x1)} \\cdot ${fmt(y1)} = ${fmt(x2)} \\cdot y_2 \\quad\\Longrightarrow\\quad y_2 = \\frac{${fmt(x1)} \\cdot ${fmt(y1)}}{${fmt(x2)}} = ${fmt(y2)}\\]`}</MathJax>
          )}
        </div>

        <div>
          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>Tip odnosa</strong>
              <p style={{ color: mode === "direct" ? "var(--lesson-success)" : "var(--lesson-sky)" }}>
                {mode === "direct" ? "Direktan" : "Obrnut"}
              </p>
              <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                {mode === "direct"
                  ? "Količnik ostaje stalan."
                  : "Proizvod ostaje stalan."}
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>Konstanta</strong>
              <p style={{ color: "var(--lesson-warning)" }}>{fmt(k)}</p>
              <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                <MathJax inline dynamic>
                  {mode === "direct"
                    ? `\\(\\frac{y}{x} = ${fmt(k)}\\)`
                    : `\\(x \\cdot y = ${fmt(k)}\\)`}
                </MathJax>
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>Tražena vrednost</strong>
              <p style={{ color: "var(--lesson-success)" }}>{fmt(y2)}</p>
              <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                Za {xName} = {fmt(x2)} dobija se {yName} = {fmt(y2)}.
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>Provera smisla</strong>
              <p style={{ color: "var(--lesson-warning)" }}>{trendLabel}</p>
              <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                {trendNote}
              </p>
            </div>
          </div>
          <div className={s.labNote} style={{ marginTop: 14 }}>
            <strong style={{ color: "var(--lesson-accent)" }}>
              Kako da čitaš rezultat:
            </strong>{" "}
            prvo utvrdi tip proporcionalnosti, zatim pronađi konstantu, pa tek
            onda računaj nepoznatu veličinu.
          </div>
        </div>
      </div>
    </div>
  );
}
