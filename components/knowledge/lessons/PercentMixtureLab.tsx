"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

type Mode = "percent" | "mixture";

interface PercentState {
  base: number;
  p1: number;
  a1: "up" | "down";
  p2: number;
  a2: "up" | "down";
}

interface MixtureState {
  m1: number;
  c1: number;
  m2: number;
  c2: number;
  kind: "rastvor" | "legura";
}

interface Preset {
  label: string;
  mode: Mode;
  percent?: Partial<PercentState>;
  mixture?: Partial<MixtureState>;
}

/* ── Presets ── */

const PRESETS: Record<string, Preset> = {
  price_up_down: {
    label: "Cena +25%, pa -10%",
    mode: "percent",
    percent: { base: 1200, p1: 25, a1: "up", p2: 10, a2: "down" },
  },
  price_discount: {
    label: "Cena -15%, pa -20%",
    mode: "percent",
    percent: { base: 5000, p1: 15, a1: "down", p2: 20, a2: "down" },
  },
  solution_mix: {
    label: "Rastvor 20% i 50%",
    mode: "mixture",
    mixture: { m1: 2, c1: 20, m2: 3, c2: 50, kind: "rastvor" },
  },
  alloy_mix: {
    label: "Legura 60% i 25%",
    mode: "mixture",
    mixture: { m1: 5, c1: 60, m2: 3, c2: 25, kind: "legura" },
  },
};

/* ── Helpers ── */

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function fmt(value: number): string {
  const rounded = Math.round(value * 1000) / 1000;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded
    .toFixed(3)
    .replace(/\.?0+$/, "");
}

function percentFactor(p: number, action: "up" | "down"): number {
  return action === "up" ? 1 + p / 100 : 1 - p / 100;
}

function percentModel(st: PercentState) {
  const factor1 = percentFactor(st.p1, st.a1);
  const factor2 = percentFactor(st.p2, st.a2);
  const after1 = st.base * factor1;
  const after2 = after1 * factor2;
  const net = st.base === 0 ? 0 : ((after2 - st.base) / st.base) * 100;
  return { factor1, factor2, after1, after2, net };
}

function mixtureModel(st: MixtureState) {
  const pure1 = (st.m1 * st.c1) / 100;
  const pure2 = (st.m2 * st.c2) / 100;
  const total = st.m1 + st.m2;
  const pure = pure1 + pure2;
  const conc = total === 0 ? 0 : (100 * pure) / total;
  return { pure1, pure2, total, pure, conc };
}

/* ── Canvas drawing ── */

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

function renderPercentCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pState: PercentState
) {
  const model = percentModel(pState);
  const values = [pState.base, model.after1, model.after2];
  const maxValue = Math.max(...values, 1) * 1.15;
  const barBottom = height - 72;
  const barTop = 88;
  const barWidth = Math.min(120, (width - 300) / 3);
  const gap = Math.min(80, (width - 300 - barWidth * 3) / 2);
  const totalWidth = barWidth * 3 + gap * 2;
  const startX = (width - totalWidth) / 2;

  const labels = ["Početna", "Posle 1.", "Posle 2."];
  const colors = [
    "rgba(255,215,185,0.86)",
    "rgba(236,91,19,0.82)",
    "rgba(127,214,255,0.82)",
  ];

  ctx.fillStyle = "#ffb488";
  ctx.font = "700 16px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Sukcesivne procentualne promene", 36, 46);

  ctx.strokeStyle = "rgba(246,238,233,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX - 20, barBottom);
  ctx.lineTo(startX + totalWidth + 20, barBottom);
  ctx.stroke();

  values.forEach((value, index) => {
    const x = startX + index * (barWidth + gap);
    const h = ((barBottom - barTop) * Math.abs(value)) / maxValue;
    const y = barBottom - h;

    ctx.fillStyle = colors[index];
    drawRoundedRect(ctx, x, y, barWidth, h, 8);
    ctx.fill();

    ctx.fillStyle = "#f6eee9";
    ctx.font = "700 14px Public Sans, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[index], x + barWidth / 2, barBottom + 28);
    ctx.fillText(fmt(value), x + barWidth / 2, y - 12);
  });

  ctx.fillStyle = "rgba(246,238,233,0.76)";
  ctx.font = "500 13px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "center";
  const sign1 = pState.a1 === "up" ? "+" : "-";
  const sign2 = pState.a2 === "up" ? "+" : "-";
  ctx.fillText(
    `${sign1}${fmt(pState.p1)}%`,
    startX + barWidth + gap / 2,
    barTop + 24
  );
  ctx.fillText(
    `${sign2}${fmt(pState.p2)}%`,
    startX + 2 * barWidth + gap + gap / 2,
    barTop + 24
  );
}

function renderMixtureCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mState: MixtureState
) {
  const model = mixtureModel(mState);
  const tankWidth = Math.min(120, (width - 200) / 4);
  const spacing = (width - tankWidth * 3) / 4;
  const leftX = spacing;
  const midX = spacing * 2 + tankWidth;
  const rightX = spacing * 3 + tankWidth * 2;
  const tankHeight = Math.min(250, height - 180);
  const tankY = 100;
  const maxAmount = Math.max(mState.m1, mState.m2, model.total, 1);

  ctx.fillStyle = "#ffb488";
  ctx.font = "700 16px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(
    mState.kind === "legura" ? "Mešanje legura" : "Mešanje rastvora",
    36,
    46
  );

  function drawTank(
    x: number,
    amount: number,
    conc: number,
    title: string,
    color: string
  ) {
    const fillRatio = amount / maxAmount;
    const fillHeight = tankHeight * fillRatio;
    const fillY = tankY + tankHeight - fillHeight;
    const pureHeight = fillHeight * (conc / 100);

    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, tankY, tankWidth, tankHeight);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(x, tankY, tankWidth, tankHeight);

    ctx.fillStyle = color;
    ctx.fillRect(x, fillY, tankWidth, fillHeight);

    ctx.fillStyle = "rgba(9,4,3,0.35)";
    ctx.fillRect(
      x,
      tankY + tankHeight - pureHeight,
      tankWidth,
      pureHeight
    );

    ctx.fillStyle = "#f6eee9";
    ctx.font = "700 13px Public Sans, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, x + tankWidth / 2, tankY - 16);
    ctx.fillText(
      `${fmt(amount)} / ${fmt(conc)}%`,
      x + tankWidth / 2,
      tankY + tankHeight + 28
    );
  }

  drawTank(leftX, mState.m1, mState.c1, "Komponenta 1", "rgba(236,91,19,0.78)");
  drawTank(midX, mState.m2, mState.c2, "Komponenta 2", "rgba(255,180,136,0.76)");
  drawTank(rightX, model.total, model.conc, "Konačna smeša", "rgba(127,214,255,0.78)");

  // Arrows
  ctx.strokeStyle = "rgba(255,215,185,0.78)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(leftX + tankWidth + 12, tankY + 50);
  ctx.lineTo(rightX - 12, tankY + 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(midX + tankWidth + 12, tankY + 90);
  ctx.lineTo(rightX - 12, tankY + 90);
  ctx.stroke();

  ctx.fillStyle = "rgba(246,238,233,0.78)";
  ctx.font = "500 13px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    `čista supstanca ukupno: ${fmt(model.pure)}`,
    width / 2,
    height - 24
  );
}

/* ── Component ── */

export default function PercentMixtureLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<Mode>("percent");
  const [activePreset, setActivePreset] = useState("price_up_down");

  const [pState, setPState] = useState<PercentState>({
    base: 1200,
    p1: 25,
    a1: "up",
    p2: 10,
    a2: "down",
  });

  const [mState, setMState] = useState<MixtureState>({
    m1: 2,
    c1: 20,
    m2: 3,
    c2: 50,
    kind: "rastvor",
  });

  /* Canvas rendering */
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || 800;
    const cssHeight = Math.max(360, Math.round(cssWidth * 0.5));
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(cssWidth * ratio);
    canvas.height = Math.round(cssHeight * ratio);
    canvas.style.height = `${cssHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.strokeStyle = "rgba(255,154,106,0.14)";
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, 18, 18, cssWidth - 36, cssHeight - 36, 22);
    ctx.fill();
    ctx.stroke();

    if (mode === "percent") {
      renderPercentCanvas(ctx, cssWidth, cssHeight, pState);
    } else {
      renderMixtureCanvas(ctx, cssWidth, cssHeight, mState);
    }
  }, [mode, pState, mState]);

  useEffect(() => {
    renderCanvas();
    const handleResize = () => renderCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvas]);

  /* Preset handling */
  function applyPreset(key: string) {
    const preset = PRESETS[key];
    if (!preset) return;
    setActivePreset(key);
    setMode(preset.mode);
    if (preset.mode === "percent" && preset.percent) {
      setPState((prev) => ({ ...prev, ...preset.percent }));
    } else if (preset.mode === "mixture" && preset.mixture) {
      setMState((prev) => ({ ...prev, ...preset.mixture }));
    }
  }

  /* Computed models */
  const pModel = percentModel(pState);
  const mModel = mixtureModel(mState);

  /* Result cards */
  const percentResults = [
    {
      label: `${pState.a1 === "up" ? "+" : "-"}${fmt(pState.p1)}%`,
      title: "Prva promena",
      value: `Posle prve promene dobija se ${fmt(pModel.after1)}.`,
    },
    {
      label: `${pState.a2 === "up" ? "+" : "-"}${fmt(pState.p2)}%`,
      title: "Druga promena",
      value: `Druga promena se računa na novu bazu ${fmt(pModel.after1)}.`,
    },
    {
      label: fmt(pModel.after2),
      title: "Krajnja vrednost",
      value: "Ovo je konačna vrednost posle obe promene.",
    },
    {
      label: `${fmt(pModel.net)}%`,
      title: "Ukupni efekat",
      value:
        pModel.net === 0
          ? "Krajnja vrednost je jednaka početnoj."
          : pModel.net > 0
            ? "Ukupna promena je rast u odnosu na početnu bazu."
            : "Ukupna promena je pad u odnosu na početnu bazu.",
    },
  ];

  const mixtureResults = [
    {
      label: `${fmt(mState.c1)}%`,
      title: "Komponenta 1",
      value: `Čista supstanca u prvoj komponenti iznosi ${fmt(mModel.pure1)}.`,
    },
    {
      label: `${fmt(mState.c2)}%`,
      title: "Komponenta 2",
      value: `Čista supstanca u drugoj komponenti iznosi ${fmt(mModel.pure2)}.`,
    },
    {
      label: fmt(mModel.total),
      title: "Ukupna količina",
      value: `Ukupno ${mState.kind === "legura" ? "kilograma" : "jedinica količine"} posle mešanja.`,
    },
    {
      label: `${fmt(mModel.conc)}%`,
      title: "Konačna koncentracija",
      value:
        mModel.conc >= Math.min(mState.c1, mState.c2) &&
        mModel.conc <= Math.max(mState.c1, mState.c2)
          ? "Rezultat je smislen jer je između početnih koncentracija."
          : "Rezultat bi morao da bude između početnih koncentracija, pa proveri račun.",
    },
  ];

  const results = mode === "percent" ? percentResults : mixtureResults;

  /* Formula text */
  const pSign1 = pState.a1 === "up" ? "+" : "-";
  const pSign2 = pState.a2 === "up" ? "+" : "-";

  const percentFormula = `V_1 = ${fmt(pState.base)} \\cdot ${fmt(pModel.factor1)} = ${fmt(pModel.after1)}, \\qquad V_2 = ${fmt(pModel.after1)} \\cdot ${fmt(pModel.factor2)} = ${fmt(pModel.after2)}`;
  const percentDerivation = `\\text{faktor 1} = 1 ${pSign1} \\frac{${fmt(pState.p1)}}{100} = ${fmt(pModel.factor1)}, \\quad \\text{faktor 2} = 1 ${pSign2} \\frac{${fmt(pState.p2)}}{100} = ${fmt(pModel.factor2)}, \\quad \\text{ukupna promena} = ${fmt(pModel.net)}\\%`;

  const mixtureFormula = `\\text{čista 1} = ${fmt(mState.m1)} \\cdot ${fmt(mState.c1 / 100)} = ${fmt(mModel.pure1)}, \\qquad \\text{čista 2} = ${fmt(mState.m2)} \\cdot ${fmt(mState.c2 / 100)} = ${fmt(mModel.pure2)}`;
  const mixtureDerivation = `\\text{ukupna količina} = ${fmt(mModel.total)}, \\quad \\text{ukupna čista supstanca} = ${fmt(mModel.pure)}, \\quad c = \\frac{${fmt(mModel.pure)}}{${fmt(mModel.total)}} = ${fmt(mModel.conc)}\\%`;

  return (
    <div>
      {/* Mode buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
        {(["percent", "mixture"] as Mode[]).map((m) => (
          <button
            key={m}
            className={s.presetBtn}
            style={{
              background:
                mode === m
                  ? "rgba(236, 91, 19, 0.22)"
                  : "rgba(236, 91, 19, 0.08)",
              borderColor:
                mode === m
                  ? "rgba(255, 156, 109, 0.4)"
                  : "rgba(236, 91, 19, 0.18)",
            }}
            onClick={() => setMode(m)}
          >
            {m === "percent" ? "Procentualne promene" : "Smese i legure"}
          </button>
        ))}
      </div>

      {/* Preset buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {Object.entries(PRESETS).map(([key, preset]) => (
          <button
            key={key}
            className={s.presetBtn}
            style={{
              background:
                activePreset === key && preset.mode === mode
                  ? "rgba(236, 91, 19, 0.22)"
                  : "rgba(236, 91, 19, 0.08)",
              borderColor:
                activePreset === key && preset.mode === mode
                  ? "rgba(255, 156, 109, 0.4)"
                  : "rgba(236, 91, 19, 0.18)",
            }}
            onClick={() => applyPreset(key)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      {mode === "percent" ? (
        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Početna vrednost</label>
            <input
              type="number"
              min={0}
              max={1000000}
              step={1}
              value={pState.base}
              onChange={(e) => {
                setActivePreset("custom");
                setPState((prev) => ({
                  ...prev,
                  base: clamp(Number(e.target.value) || 0, 0, 1000000),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Prvi procenat</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={pState.p1}
              onChange={(e) => {
                setActivePreset("custom");
                setPState((prev) => ({
                  ...prev,
                  p1: clamp(Number(e.target.value) || 0, 0, 100),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Prva promena</label>
            <select
              value={pState.a1}
              onChange={(e) => {
                setActivePreset("custom");
                setPState((prev) => ({
                  ...prev,
                  a1: e.target.value as "up" | "down",
                }));
              }}
            >
              <option value="up">Poskupljenje</option>
              <option value="down">Pojeftinjenje</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Drugi procenat</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={pState.p2}
              onChange={(e) => {
                setActivePreset("custom");
                setPState((prev) => ({
                  ...prev,
                  p2: clamp(Number(e.target.value) || 0, 0, 100),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Druga promena</label>
            <select
              value={pState.a2}
              onChange={(e) => {
                setActivePreset("custom");
                setPState((prev) => ({
                  ...prev,
                  a2: e.target.value as "up" | "down",
                }));
              }}
            >
              <option value="up">Poskupljenje</option>
              <option value="down">Pojeftinjenje</option>
            </select>
          </div>
        </div>
      ) : (
        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Količina 1</label>
            <input
              type="number"
              min={1}
              max={10000}
              step={0.1}
              value={mState.m1}
              onChange={(e) => {
                setActivePreset("custom");
                setMState((prev) => ({
                  ...prev,
                  m1: clamp(Number(e.target.value) || 1, 1, 10000),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Koncentracija 1 (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={mState.c1}
              onChange={(e) => {
                setActivePreset("custom");
                setMState((prev) => ({
                  ...prev,
                  c1: clamp(Number(e.target.value) || 0, 0, 100),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Količina 2</label>
            <input
              type="number"
              min={1}
              max={10000}
              step={0.1}
              value={mState.m2}
              onChange={(e) => {
                setActivePreset("custom");
                setMState((prev) => ({
                  ...prev,
                  m2: clamp(Number(e.target.value) || 1, 1, 10000),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Koncentracija 2 (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={mState.c2}
              onChange={(e) => {
                setActivePreset("custom");
                setMState((prev) => ({
                  ...prev,
                  c2: clamp(Number(e.target.value) || 0, 0, 100),
                }));
              }}
            />
          </div>
          <div className={s.field}>
            <label>Tip modela</label>
            <select
              value={mState.kind}
              onChange={(e) => {
                setActivePreset("custom");
                setMState((prev) => ({
                  ...prev,
                  kind: e.target.value as "rastvor" | "legura",
                }));
              }}
            >
              <option value="rastvor">Rastvor</option>
              <option value="legura">Legura</option>
            </select>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className={s.canvasWrap} style={{ marginTop: 18 }}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 9" }}
        />
        <p
          style={{
            marginTop: 10,
            fontSize: "0.92rem",
            color: "var(--lesson-muted)",
          }}
        >
          {mode === "percent"
            ? "Vidiš tri faze vrednosti: početnu, posle prve promene i posle druge promene."
            : "Vidiš dve komponente i konačnu smešu sa izračunatom koncentracijom."}
        </p>
      </div>

      {/* Results + Formula */}
      <div className={s.interactiveShell} style={{ marginTop: 18 }}>
        {/* Left: formulas */}
        <div className={s.interactiveCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Aktivni model</h3>
          <div className={s.mathBlock}>
            <MathJax dynamic>{`\\[${mode === "percent" ? percentFormula : mixtureFormula}\\]`}</MathJax>
          </div>
          <div className={s.mathBlock}>
            <MathJax dynamic>{`\\[${mode === "percent" ? percentDerivation : mixtureDerivation}\\]`}</MathJax>
          </div>
        </div>

        {/* Right: status cards */}
        <div className={s.interactiveCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Brza analiza</h3>
          <div className={s.resultsGrid}>
            {results.map((r, i) => (
              <div key={i} className={s.resultCard}>
                <strong>{r.title}</strong>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--lesson-primary-soft)",
                    marginBottom: 6,
                  }}
                >
                  {r.label}
                </p>
                <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
                  {r.value}
                </p>
              </div>
            ))}
          </div>
          <div className={s.labNote}>
            <strong style={{ color: "var(--lesson-accent)" }}>
              Kako da čitaš rezultat:
            </strong>{" "}
            {mode === "percent"
              ? "u procentnom delu prati bazu i faktor promene."
              : "u delu o smesama prati količinu čiste supstance i ukupnu količinu."}
          </div>
        </div>
      </div>
    </div>
  );
}
