"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  base: string;
  u: number;
  v: number;
  n: number;
}

interface BaseChoice {
  label: string;
  tex: string;
  num: number;
  den: number;
}

const BASE_CHOICES: Record<string, BaseChoice> = {
  "2": { label: "2", tex: "2", num: 2, den: 1 },
  "3": { label: "3", tex: "3", num: 3, den: 1 },
  "10": { label: "10", tex: "10", num: 10, den: 1 },
  "1/2": { label: "1/2", tex: "\\frac{1}{2}", num: 1, den: 2 },
};

/* ── Helpers ── */

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function powInt(base: number, exp: number): number {
  let result = 1;
  for (let i = 0; i < exp; i++) result *= base;
  return result;
}

interface Rational {
  num: number;
  den: number;
}

function simplify(r: Rational): Rational {
  const sign = r.den < 0 ? -1 : 1;
  const num = r.num * sign;
  const den = r.den * sign;
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

function powRational(choice: BaseChoice, exp: number): Rational {
  if (exp >= 0) {
    return simplify({
      num: powInt(choice.num, exp),
      den: powInt(choice.den, exp),
    });
  }
  const e = -exp;
  return simplify({
    num: powInt(choice.den, e),
    den: powInt(choice.num, e),
  });
}

function multiplyRational(a: Rational, b: Rational): Rational {
  return simplify({ num: a.num * b.num, den: a.den * b.den });
}

function divideRational(a: Rational, b: Rational): Rational {
  return simplify({ num: a.num * b.den, den: a.den * b.num });
}

function powerRational(a: Rational, n: number): Rational {
  return simplify({ num: powInt(a.num, n), den: powInt(a.den, n) });
}

function rationalTex(r: Rational): string {
  if (r.den === 1) return String(r.num);
  return `\\frac{${r.num}}{${r.den}}`;
}

function rationalLabel(r: Rational): string {
  if (r.den === 1) return String(r.num);
  return `${r.num}/${r.den}`;
}

function mapValue(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (Math.abs(inMax - inMin) < 1e-9) return (outMin + outMax) / 2;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/* ── Canvas drawing ── */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string
) {
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, "rgba(255,255,255,0.03)");
  grad.addColorStop(1, "rgba(255,255,255,0.01)");
  ctx.fillStyle = grad;
  roundRect(ctx, x, y, w, h, 20, true, false);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, 20, false, true);
  ctx.fillStyle = "#f6eee9";
  ctx.font = '700 16px "Public Sans", system-ui, sans-serif';
  ctx.fillText(title, x + 18, y + 28);
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  title: string,
  body: string
) {
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  roundRect(ctx, x, y, w, h, 16, true, false);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, 16, false, true);
  ctx.fillStyle = color;
  ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText(title, x + 12, y + 18);
  ctx.fillStyle = "#f6eee9";
  ctx.font = '600 14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(body, x + 12, y + 42);
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
  color: string
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - 10 * Math.cos(angle - 0.3),
    y2 - 10 * Math.sin(angle - 0.3)
  );
  ctx.lineTo(
    x2 - 10 * Math.cos(angle + 0.3),
    y2 - 10 * Math.sin(angle + 0.3)
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  if (label) {
    ctx.fillStyle = color;
    ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(label, (x1 + x2) / 2 - 12, (y1 + y2) / 2 - 8);
  }
}

interface LabData {
  choice: BaseChoice;
  u: number;
  v: number;
  n: number;
  x: Rational;
  y: Rational;
  product: Rational;
  quotient: Rational;
  power: Rational;
  sum: number;
  diff: number;
  scaled: number;
}

function computeData(state: LabState): LabData {
  const choice = BASE_CHOICES[state.base];
  const x = powRational(choice, state.u);
  const y = powRational(choice, state.v);
  const product = multiplyRational(x, y);
  const quotient = divideRational(x, y);
  const power = powerRational(x, state.n);

  return {
    choice,
    u: state.u,
    v: state.v,
    n: state.n,
    x,
    y,
    product,
    quotient,
    power,
    sum: state.u + state.v,
    diff: state.u - state.v,
    scaled: state.n * state.u,
  };
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  data: LabData
) {
  drawPanel(ctx, x, y, w, h, "Eksponenti koje logaritam cita");

  const items = [
    { label: "u", value: data.u, color: "#ec5b13" },
    { label: "v", value: data.v, color: "#8fd7ff" },
    { label: "u+v", value: data.sum, color: "#ffc57f" },
    { label: "u-v", value: data.diff, color: "#78dfb9" },
    { label: "n*u", value: data.scaled, color: "#cfb7ff" },
  ];

  const minVal = Math.min(-4, ...items.map((i) => i.value));
  const maxVal = Math.max(4, ...items.map((i) => i.value));
  const zeroX = mapValue(0, minVal, maxVal, x + 24, x + w - 24);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(zeroX, y + 40);
  ctx.lineTo(zeroX, y + h - 22);
  ctx.stroke();

  ctx.fillStyle = "#d8c6ba";
  ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("0", zeroX - 4, y + h - 6);

  items.forEach((item, index) => {
    const rowY = y + 62 + index * 44;
    const valueX = mapValue(item.value, minVal, maxVal, x + 24, x + w - 24);
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(zeroX, rowY);
    ctx.lineTo(valueX, rowY);
    ctx.stroke();
    ctx.fillStyle = item.color;
    ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(item.label, x + 18, rowY - 10);
    ctx.fillText(
      String(item.value),
      valueX + (item.value >= 0 ? 8 : -24),
      rowY - 10
    );
  });
}

function drawCanvas(canvas: HTMLCanvasElement, data: LabData) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  if (width < 700) {
    const topH = height * 0.54;
    drawPanel(ctx, 12, 12, width - 24, topH - 8, "Logaritamska masina");

    const boxX = 24;
    const boxW = width - 48;
    const boxH = 42;
    const gap = 8;

    drawBox(
      ctx,
      boxX,
      56,
      boxW,
      boxH,
      "#ec5b13",
      "x = a^u",
      "x = " + rationalLabel(data.x) + ", log = " + data.u
    );
    drawBox(
      ctx,
      boxX,
      56 + (boxH + gap),
      boxW,
      boxH,
      "#8fd7ff",
      "y = a^v",
      "y = " + rationalLabel(data.y) + ", log = " + data.v
    );
    drawBox(
      ctx,
      boxX,
      56 + 2 * (boxH + gap),
      boxW,
      boxH,
      "#ffc57f",
      "xy",
      rationalLabel(data.product) + ", log = " + data.sum
    );
    drawBox(
      ctx,
      boxX,
      56 + 3 * (boxH + gap),
      boxW,
      boxH,
      "#78dfb9",
      "x / y",
      rationalLabel(data.quotient) + ", log = " + data.diff
    );
    drawBox(
      ctx,
      boxX,
      56 + 4 * (boxH + gap),
      boxW,
      boxH,
      "#cfb7ff",
      "x^n",
      rationalLabel(data.power) + ", log = " + data.scaled
    );

    drawBars(ctx, 12, topH + 8, width - 24, height - topH - 20, data);
    return;
  }

  drawPanel(ctx, 12, 12, width - 24, height * 0.48, "Logaritamska masina");

  drawBox(
    ctx,
    28,
    56,
    124,
    58,
    "#ec5b13",
    "x = a^u",
    "x = " + rationalLabel(data.x)
  );
  drawBox(
    ctx,
    28,
    134,
    124,
    58,
    "#8fd7ff",
    "y = a^v",
    "y = " + rationalLabel(data.y)
  );

  drawBox(
    ctx,
    width * 0.33,
    44,
    140,
    58,
    "#ffc57f",
    "xy",
    rationalLabel(data.product)
  );
  drawBox(
    ctx,
    width * 0.33,
    118,
    140,
    58,
    "#78dfb9",
    "x / y",
    rationalLabel(data.quotient)
  );
  drawBox(
    ctx,
    width * 0.33,
    192,
    140,
    58,
    "#cfb7ff",
    "x^n",
    rationalLabel(data.power)
  );

  drawBox(
    ctx,
    width * 0.68,
    44,
    148,
    58,
    "#ffc57f",
    "log_a(xy)",
    String(data.sum)
  );
  drawBox(
    ctx,
    width * 0.68,
    118,
    148,
    58,
    "#78dfb9",
    "log_a(x/y)",
    String(data.diff)
  );
  drawBox(
    ctx,
    width * 0.68,
    192,
    148,
    58,
    "#cfb7ff",
    "log_a(x^n)",
    String(data.scaled)
  );

  drawArrow(ctx, 152, 86, width * 0.33, 72, "+", "#ffc57f");
  drawArrow(ctx, 152, 162, width * 0.33, 146, "\u2212", "#78dfb9");
  drawArrow(ctx, 152, 86, width * 0.33, 220, "n", "#cfb7ff");
  drawArrow(ctx, width * 0.33 + 140, 72, width * 0.68, 72, "log", "#ffc57f");
  drawArrow(
    ctx,
    width * 0.33 + 140,
    146,
    width * 0.68,
    146,
    "log",
    "#78dfb9"
  );
  drawArrow(
    ctx,
    width * 0.33 + 140,
    220,
    width * 0.68,
    220,
    "log",
    "#cfb7ff"
  );

  ctx.fillStyle = "#d8c6ba";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    "Ako su x i y stepeni iste baze, logaritam samo ocita njihove eksponente.",
    28,
    286
  );

  drawBars(ctx, 12, height * 0.52, width - 24, height * 0.44 - 12, data);
}

/* ── Component ── */

export default function LogarithmLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    base: "2",
    u: 3,
    v: 1,
    n: 2,
  });

  const data = computeData(state);

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current, computeData(state));
    }
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  function valueSign(value: number): string {
    if (value > 0) return "+" + value;
    return String(value);
  }

  const startTex = `x=${data.choice.tex}^{${data.u}}=${rationalTex(data.x)},\\qquad y=${data.choice.tex}^{${data.v}}=${rationalTex(data.y)}`;
  const productTex = `\\log_{${data.choice.tex}}(xy)=\\log_{${data.choice.tex}}x+\\log_{${data.choice.tex}}y=${data.u}+${data.v}=${data.sum}`;
  const quotientTex = `\\log_{${data.choice.tex}}\\left(\\frac{x}{y}\\right)=\\log_{${data.choice.tex}}x-\\log_{${data.choice.tex}}y=${data.u}${valueSign(-data.v)}=${data.diff}`;
  const powerTex = `\\log_{${data.choice.tex}}(x^{${data.n}})=${data.n}\\log_{${data.choice.tex}}x=${data.n}\\cdot ${data.u}=${data.scaled}`;

  const baseInfoText =
    data.choice.label === "1/2"
      ? `Baza \\(\\frac{1}{2}\\) je dozvoljena jer je pozitivna i razlicita od \\(1\\). Logaritam je i dalje eksponent, samo baza nije veca od \\(1\\).`
      : `Baza \\(${data.choice.tex}\\) je dozvoljena jer je pozitivna i razlicita od \\(1\\). Svi generisani argumenti su pozitivni, pa su logaritmi definisani.`;

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* ── Controls ── */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Podesi logaritamski primer</h3>
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--lesson-muted)",
              marginBottom: 12,
            }}
          >
            Ova interakcija namerno koristi brojeve koji su stepeni baze, da
            pravila postanu pregledna i tacna.
          </p>

          <div className={s.rangeWrap}>
            <label>
              Baza <em>a</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {data.choice.label}
              </span>
            </label>
            <select
              value={state.base}
              onChange={(e) =>
                setState((prev) => ({ ...prev, base: e.target.value }))
              }
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
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="1/2">1/2</option>
            </select>
            <span
              style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}
            >
              Probaj i bazu 1/2, da vidis da definicija logaritma ostaje ista i
              kada je baza manja od 1.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Eksponent <em>u</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {state.u}
              </span>
            </label>
            <input
              type="range"
              min={-3}
              max={4}
              step={1}
              value={state.u}
              onChange={(e) =>
                setState((prev) => ({ ...prev, u: Number(e.target.value) }))
              }
            />
          </div>

          <div className={s.rangeWrap}>
            <label>
              Eksponent <em>v</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {state.v}
              </span>
            </label>
            <input
              type="range"
              min={-3}
              max={4}
              step={1}
              value={state.v}
              onChange={(e) =>
                setState((prev) => ({ ...prev, v: Number(e.target.value) }))
              }
            />
          </div>

          <div className={s.rangeWrap}>
            <label>
              Stepen <em>n</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {state.n}
              </span>
            </label>
            <input
              type="range"
              min={2}
              max={4}
              step={1}
              value={state.n}
              onChange={(e) =>
                setState((prev) => ({ ...prev, n: Number(e.target.value) }))
              }
            />
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "14px 16px",
              borderRadius: 16,
              background: "rgba(236, 91, 19, 0.08)",
              border: "1px solid rgba(236, 91, 19, 0.14)",
              color: "var(--lesson-accent, #ffc57f)",
              fontSize: "0.92rem",
            }}
          >
            <MathJax dynamic>{baseInfoText}</MathJax>
          </div>
        </div>

        {/* ── Canvas ── */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 11" }}
            aria-label="Interaktivni canvas za pravila logaritmovanja"
          />
        </div>
      </div>

      {/* ── Live readouts ── */}
      <div
        className={s.resultsGrid}
        style={{ gridTemplateColumns: "repeat(4, 1fr)", marginTop: 16 }}
      >
        <div className={s.resultCard}>
          <strong>Polazne vrednosti</strong>
          <MathJax dynamic>{`\\(${startTex}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Proizvod</strong>
          <MathJax dynamic>{`\\(${productTex}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Kolicnik</strong>
          <MathJax dynamic>{`\\(${quotientTex}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Stepen</strong>
          <MathJax dynamic>{`\\(${powerTex}\\)`}</MathJax>
        </div>
      </div>

      <p
        className={s.labNote}
        style={{ marginTop: 16, fontSize: "0.92rem" }}
      >
        <MathJax dynamic>
          {`Za izabrane vrednosti dobijas \\(x=${rationalTex(data.x)}\\) i \\(y=${rationalTex(data.y)}\\). Posto je \\(x=${data.choice.tex}^{${data.u}}\\) i \\(y=${data.choice.tex}^{${data.v}}\\), proizvod je \\(xy=${data.choice.tex}^{${data.sum}}\\), kolicnik je \\(${data.choice.tex}^{${data.diff}}\\), a stepen \\(x^{${data.n}}=${data.choice.tex}^{${data.scaled}}\\). Zato logaritam samo cita nove eksponente.`}
        </MathJax>
      </p>
    </div>
  );
}
