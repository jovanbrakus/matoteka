"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

function gcdAbs(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

interface EuclidStep {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

interface EuclidResult {
  orderedA: number;
  orderedB: number;
  steps: EuclidStep[];
  gcd: number;
}

function euclidSteps(a: number, b: number): EuclidResult {
  const first = Math.max(a, b);
  const second = Math.min(a, b);
  const steps: EuclidStep[] = [];
  let x = first;
  let y = second;

  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push({ dividend: x, divisor: y, quotient: q, remainder: r });
    x = y;
    y = r;
  }

  return { orderedA: first, orderedB: second, steps, gcd: x };
}

function factorize(n: number): string {
  const parts: { prime: number; power: number }[] = [];
  let value = n;
  let divisor = 2;

  while (divisor * divisor <= value) {
    let power = 0;
    while (value % divisor === 0) {
      value /= divisor;
      power += 1;
    }
    if (power > 0) parts.push({ prime: divisor, power });
    divisor += divisor === 2 ? 1 : 2;
  }
  if (value > 1) parts.push({ prime: value, power: 1 });
  if (!parts.length) return "1";
  return parts
    .map((p) => (p.power === 1 ? `${p.prime}` : `${p.prime}^{${p.power}}`))
    .join(" \\cdot ");
}

function clampInt(value: string | number, fallback: number, min: number, max: number): number {
  const parsed = Math.floor(Number(value));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

/* ── Preset pairs ── */

interface Pair {
  label: string;
  a: number;
  b: number;
  m: number;
}

const PAIRS: Pair[] = [
  { label: "84 i 30", a: 84, b: 30, m: 10 },
  { label: "252 i 198", a: 252, b: 198, m: 9 },
  { label: "391 i 299", a: 391, b: 299, m: 12 },
];

/* ── Canvas renderer ── */

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  result: EuclidResult,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cssWidth = canvas.clientWidth || (canvas.parentElement?.clientWidth ?? 700);
  const cssHeight = Math.max(360, 150 + result.steps.length * 82);
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.height = `${cssHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = cssWidth;
  const height = cssHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.strokeStyle = "rgba(255,154,106,0.14)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 18, 18, width - 36, height - 36, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffb488";
  ctx.font = "700 16px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Koraci Euklidovog algoritma", 36, 46);

  const barLeft = 40;
  const barWidth = width - 120;
  const rowStart = 90;
  const rowGap = 78;

  result.steps.forEach((step, index) => {
    const y = rowStart + index * rowGap;

    ctx.fillStyle = "rgba(246,238,233,0.88)";
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText(
      `${step.dividend} = ${step.quotient} \u00B7 ${step.divisor} + ${step.remainder}`,
      barLeft,
      y - 12,
    );

    const unit = barWidth / step.dividend;
    for (let i = 0; i < step.quotient; i += 1) {
      const x = barLeft + i * step.divisor * unit;
      ctx.fillStyle = i % 2 === 0 ? "rgba(236,91,19,0.42)" : "rgba(255,154,106,0.30)";
      ctx.strokeStyle = "rgba(255,154,106,0.24)";
      ctx.lineWidth = 1;
      ctx.fillRect(x, y, step.divisor * unit, 24);
      ctx.strokeRect(x, y, step.divisor * unit, 24);
    }

    if (step.remainder > 0) {
      const x = barLeft + step.quotient * step.divisor * unit;
      ctx.fillStyle = "rgba(127,214,255,0.34)";
      ctx.strokeStyle = "rgba(127,214,255,0.36)";
      ctx.fillRect(x, y, step.remainder * unit, 24);
      ctx.strokeRect(x, y, step.remainder * unit, 24);
    }

    ctx.fillStyle = "rgba(246,238,233,0.72)";
    ctx.font = "500 13px Inter, sans-serif";
    const explanation =
      step.remainder === 0
        ? "ostatak 0 \u2192 algoritam staje"
        : `slede\u0107i par: (${step.divisor}, ${step.remainder})`;
    ctx.fillText(explanation, barLeft, y + 44);
  });

  ctx.fillStyle = "rgba(255,215,185,0.92)";
  ctx.font = "700 15px Inter, sans-serif";
  ctx.fillText(`NZD = ${result.gcd}`, 36, height - 24);
}

/* ── Component ── */

export default function EuclidLab() {
  const [a, setA] = useState(84);
  const [b, setB] = useState(30);
  const [m, setM] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const result = euclidSteps(a, b);
  const gcd = result.gcd;
  const lcm = Math.abs((a / gcd) * b);
  const remainderA = ((a % m) + m) % m;
  const remainderB = ((b % m) + m) % m;
  const congruent = remainderA === remainderB;

  const draw = useCallback(() => {
    if (canvasRef.current) renderCanvas(canvasRef.current, result);
  }, [result]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  function selectPair(pair: Pair) {
    setA(pair.a);
    setB(pair.b);
    setM(pair.m);
  }

  return (
    <>
      {/* Preset buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        {PAIRS.map((pair) => (
          <button
            key={pair.label}
            className={s.presetBtn}
            style={
              pair.a === a && pair.b === b && pair.m === m
                ? { background: "rgba(236,91,19,0.24)", borderColor: "rgba(236,91,19,0.5)" }
                : undefined
            }
            onClick={() => selectPair(pair)}
          >
            {pair.label}
          </button>
        ))}
      </div>

      {/* Number inputs */}
      <div className={s.controlGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className={s.field}>
          <label>
            Prvi broj <MathJax inline>{"\\(a\\)"}</MathJax>
          </label>
          <input
            type="number"
            min={1}
            max={2000}
            value={a}
            onChange={(e) => setA(clampInt(e.target.value, a, 1, 2000))}
          />
        </div>
        <div className={s.field}>
          <label>
            Drugi broj <MathJax inline>{"\\(b\\)"}</MathJax>
          </label>
          <input
            type="number"
            min={1}
            max={2000}
            value={b}
            onChange={(e) => setB(clampInt(e.target.value, b, 1, 2000))}
          />
        </div>
        <div className={s.field}>
          <label>
            Modul <MathJax inline>{"\\(m\\)"}</MathJax>
          </label>
          <input
            type="number"
            min={2}
            max={100}
            value={m}
            onChange={(e) => setM(clampInt(e.target.value, m, 2, 100))}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap} style={{ marginTop: 18 }}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 8" }}
        />
        <p style={{ marginTop: 10, color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
          Svaki red predstavlja jedan korak deljenja sa ostatkom. Poslednji nenulti ostatak je NZD.
        </p>
      </div>

      {/* Info panels */}
      <div className={s.interactiveShell} style={{ marginTop: 18 }}>
        <div className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Aktivni par brojeva</h3>
          <MathJax dynamic>
            {`Posmatramo brojeve \\(a=${a}\\) i \\(b=${b}\\), uz modul \\(m=${m}\\).`}
          </MathJax>
          <MathJax dynamic>
            {`\\[\\operatorname{NZD}(${a},${b})=${gcd},\\qquad \\operatorname{NZS}(${a},${b})=${lcm}\\]`}
          </MathJax>
          <p style={{ color: "var(--lesson-muted)", marginTop: 10 }}>
            Algoritam kreće od većeg broja, pa se problem smanjuje preko ostataka dok ne stigne do nule.
          </p>
          <MathJax dynamic>
            {`\\[${a} = ${factorize(a)}\\]`}
          </MathJax>
          <MathJax dynamic>
            {`\\[${b} = ${factorize(b)}\\]`}
          </MathJax>
        </div>

        <div className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Brza analiza</h3>
          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>NZD</strong>
              <MathJax dynamic>{`\\(${gcd}\\)`}</MathJax>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                {gcd === 1
                  ? "Brojevi su uzajamno prosti."
                  : "Ovo je najveći zajednički delilac oba broja."}
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>NZS</strong>
              <MathJax dynamic>{`\\(${lcm}\\)`}</MathJax>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                Najmanji prirodan broj deljiv i sa <MathJax inline dynamic>{"\\(a\\)"}</MathJax> i sa{" "}
                <MathJax inline dynamic>{"\\(b\\)"}</MathJax>.
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>Uzajamna prostost</strong>
              <span style={{ color: gcd === 1 ? "#67d7ad" : "#ffb488", fontWeight: 700 }}>
                {gcd === 1 ? "Da" : "Ne"}
              </span>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                {gcd === 1
                  ? "Nemaju zajedničkih prostih činilaca osim 1."
                  : "Postoji zajednički delilac veći od 1."}
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>{`Ostatak ${a} mod ${m}`}</strong>
              <MathJax dynamic>{`\\(${a} \\equiv ${remainderA} \\pmod{${m}}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>{`Ostatak ${b} mod ${m}`}</strong>
              <MathJax dynamic>{`\\(${b} \\equiv ${remainderB} \\pmod{${m}}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Kongruentni mod m</strong>
              <span style={{ color: congruent ? "#67d7ad" : "#ff8f8f", fontWeight: 700 }}>
                {congruent ? "Da" : "Ne"}
              </span>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                {congruent
                  ? `Brojevi imaju isti ostatak modulo ${m}.`
                  : `Brojevi nemaju isti ostatak modulo ${m}.`}
              </p>
            </div>
          </div>
          <div className={s.labNote}>
            <strong style={{ color: "var(--lesson-accent)" }}>Kako da čitaš rezultat:</strong>{" "}
            NZD dolazi iz Euklidovog algoritma, NZS iz veze sa proizvodom, a kongruencija iz
            poređenja ostataka modulo{" "}
            <MathJax inline dynamic>{"\\(m\\)"}</MathJax>.
          </div>
        </div>
      </div>
    </>
  );
}
