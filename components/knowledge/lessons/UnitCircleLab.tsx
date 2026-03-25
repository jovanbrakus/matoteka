"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── helpers ── */

const PRESET_ANGLES = [
  0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330,
  360,
];

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function fmt(value: number, digits = 4): string {
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < 1e-9) return String(rounded);
  return value
    .toFixed(digits)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function degToPiTex(deg: number): string {
  if (Math.abs(deg) < 1e-9) return "0";
  const sign = deg < 0 ? "-" : "";
  let n = Math.round(Math.abs(deg));
  let d = 180;
  const g = gcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return n === 1 ? sign + "\\pi" : sign + n + "\\pi";
  if (n === 1) return sign + "\\frac{\\pi}{" + d + "}";
  return sign + "\\frac{" + n + "\\pi}{" + d + "}";
}

function normDeg(deg: number): number {
  let v = deg % 360;
  if (v < 0) v += 360;
  if (Math.abs(v - 360) < 1e-9) v = 0;
  return v;
}

function quadrantLabel(p: number): string {
  if (p === 0) return "pozitivna x-osa";
  if (p === 90) return "pozitivna y-osa";
  if (p === 180) return "negativna x-osa";
  if (p === 270) return "negativna y-osa";
  if (p > 0 && p < 90) return "I kvadrant";
  if (p > 90 && p < 180) return "II kvadrant";
  if (p > 180 && p < 270) return "III kvadrant";
  return "IV kvadrant";
}

function refAngle(p: number): number {
  if (p <= 90) return p;
  if (p <= 180) return 180 - p;
  if (p <= 270) return p - 180;
  return 360 - p;
}

type Signs = { cos: number; sin: number };

function qSigns(p: number): Signs {
  if (p === 0) return { cos: 1, sin: 0 };
  if (p === 90) return { cos: 0, sin: 1 };
  if (p === 180) return { cos: -1, sin: 0 };
  if (p === 270) return { cos: 0, sin: -1 };
  if (p > 0 && p < 90) return { cos: 1, sin: 1 };
  if (p > 90 && p < 180) return { cos: -1, sin: 1 };
  if (p > 180 && p < 270) return { cos: -1, sin: -1 };
  return { cos: 1, sin: -1 };
}

type Exact = {
  cos: string;
  sin: string;
  tan: string;
  cot: string;
} | null;

function baseQ1(
  ref: number
): { cos: string; sin: string; tan: string; cot: string } | null {
  if (ref === 0)
    return {
      cos: "1",
      sin: "0",
      tan: "0",
      cot: "\\text{nije def.}",
    };
  if (ref === 30)
    return {
      cos: "\\frac{\\sqrt3}{2}",
      sin: "\\frac{1}{2}",
      tan: "\\frac{\\sqrt3}{3}",
      cot: "\\sqrt3",
    };
  if (ref === 45)
    return {
      cos: "\\frac{\\sqrt2}{2}",
      sin: "\\frac{\\sqrt2}{2}",
      tan: "1",
      cot: "1",
    };
  if (ref === 60)
    return {
      cos: "\\frac{1}{2}",
      sin: "\\frac{\\sqrt3}{2}",
      tan: "\\sqrt3",
      cot: "\\frac{\\sqrt3}{3}",
    };
  if (ref === 90)
    return {
      cos: "0",
      sin: "1",
      tan: "\\text{nije def.}",
      cot: "0",
    };
  return null;
}

function applySgn(tex: string, sgn: number): string {
  if (tex === "0" || tex.startsWith("\\text")) return tex;
  return sgn < 0 ? "-" + tex : tex;
}

function exactVals(principal: number): Exact {
  if (!PRESET_ANGLES.includes(principal)) return null;
  const ref = refAngle(principal);
  const base = baseQ1(ref);
  if (!base) return null;
  const signs = qSigns(principal);
  const cosTex = applySgn(base.cos, signs.cos);
  const sinTex = applySgn(base.sin, signs.sin);
  let tanTex = base.tan;
  let cotTex = base.cot;
  if (!base.tan.startsWith("\\text")) {
    const ts =
      signs.cos === 0 || signs.sin === 0 ? 0 : signs.sin * signs.cos;
    tanTex = ts === 0 ? "0" : applySgn(base.tan, ts);
  }
  if (!base.cot.startsWith("\\text")) {
    const cs2 =
      signs.cos === 0 || signs.sin === 0 ? 0 : signs.sin * signs.cos;
    cotTex = cs2 === 0 ? "0" : applySgn(base.cot, cs2);
  }
  return { cos: cosTex, sin: sinTex, tan: tanTex, cot: cotTex };
}

/* ── canvas draw ── */

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

function mapV(v: number, iMin: number, iMax: number, oMin: number, oMax: number) {
  if (Math.abs(iMax - iMin) < 1e-9) return (oMin + oMax) / 2;
  return oMin + ((v - iMin) / (iMax - iMin)) * (oMax - oMin);
}

interface DrawData {
  principalDeg: number;
  principalRad: number;
  totalDeg: number;
  cosVal: number;
  sinVal: number;
  refDeg: number;
  quadrant: string;
}

function drawCanvas(canvas: HTMLCanvasElement, data: DrawData) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.clientWidth || 760;
  const height = 440;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  // background
  ctx.clearRect(0, 0, width, height);
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "rgba(255,255,255,0.03)");
  grad.addColorStop(1, "rgba(255,255,255,0.01)");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, width, height, 20, true, false);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  roundRect(ctx, 0.5, 0.5, width - 1, height - 1, 20, false, true);

  // circle panel
  const cx = 195;
  const cy = 232;
  const r = 126;
  const x = cx + r * Math.cos(data.principalRad);
  const y = cy - r * Math.sin(data.principalRad);

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - r - 24, cy);
  ctx.lineTo(cx + r + 24, cy);
  ctx.moveTo(cx, cy - r - 24);
  ctx.lineTo(cx, cy + r + 24);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText("x", cx + r + 18, cy - 6);
  ctx.fillText("y", cx + 8, cy - r - 14);

  // ray
  ctx.save();
  ctx.strokeStyle = "rgba(236,91,19,0.85)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();

  // projections
  ctx.save();
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = "rgba(143,215,255,0.85)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = "rgba(120,223,185,0.85)";
  ctx.beginPath();
  ctx.moveTo(x, cy);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();

  // arc
  ctx.strokeStyle = "rgba(255,197,127,0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 34, 0, -data.principalRad, data.principalRad > 0);
  ctx.stroke();

  // point
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#cfb7ff";
  ctx.shadowColor = "#cfb7ff";
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#f1e2d7";
  ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText("P", x + 10, y - 10);

  ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
  ctx.fillStyle = "#8fd7ff";
  ctx.fillText("cos \u03b1", (cx + x) / 2 - 16, cy + 20);
  ctx.fillStyle = "#78dfb9";
  ctx.fillText("sin \u03b1", x + 10, (cy + y) / 2);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Jedinicna kruznica", 92, 38);
  ctx.fillText("r = 1", 92, 60);

  // right panel
  const panelX = 412;
  const panelW = width - panelX - 22;

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  roundRect(ctx, panelX, 22, panelW, 396, 18, true, false);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, panelX, 22, panelW, 396, 18, false, true);

  ctx.fillStyle = "#f1e2d7";
  ctx.font = '700 15px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Mapiranje ugla", panelX + 18, 50);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Ukupan ugao: " + fmt(data.totalDeg, 0) + "\u00b0", panelX + 18, 78);
  ctx.fillText("Glavni ugao: " + fmt(data.principalDeg, 0) + "\u00b0", panelX + 18, 102);
  ctx.fillText("Kvadrant / osa: " + data.quadrant, panelX + 18, 126);

  // degree track
  const drawTrack = (
    x1: number,
    x2: number,
    ty: number,
    labels: { value: number; label: string }[],
    mv: number,
    max: number,
    title: string
  ) => {
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, ty);
    ctx.lineTo(x2, ty);
    ctx.stroke();

    ctx.fillStyle = "#f1e2d7";
    ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(title, x1, ty - 18);

    ctx.font = '500 12px "Public Sans", system-ui, sans-serif';
    ctx.fillStyle = "rgba(255,255,255,0.52)";
    labels.forEach((item) => {
      const lx = mapV(item.value, 0, max, x1, x2);
      ctx.beginPath();
      ctx.moveTo(lx, ty - 6);
      ctx.lineTo(lx, ty + 6);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.stroke();
      ctx.fillText(item.label, lx - 18, ty + 24);
    });

    const mx = mapV(mv, 0, max, x1, x2);
    ctx.beginPath();
    ctx.arc(mx, ty, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#cfb7ff";
    ctx.shadowColor = "#cfb7ff";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  drawTrack(
    panelX + 24,
    panelX + panelW - 24,
    180,
    [
      { value: 0, label: "0" },
      { value: 90, label: "90\u00b0" },
      { value: 180, label: "180\u00b0" },
      { value: 270, label: "270\u00b0" },
      { value: 360, label: "360\u00b0" },
    ],
    data.principalDeg,
    360,
    "Stepeni"
  );

  drawTrack(
    panelX + 24,
    panelX + panelW - 24,
    270,
    [
      { value: 0, label: "0" },
      { value: 90, label: "\u03c0/2" },
      { value: 180, label: "\u03c0" },
      { value: 270, label: "3\u03c0/2" },
      { value: 360, label: "2\u03c0" },
    ],
    data.principalDeg,
    360,
    "Radijani"
  );

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Referentni ugao: " + fmt(data.refDeg, 0) + "\u00b0", panelX + 18, 336);
  ctx.fillText("Dodaj ili oduzmi 360\u00b0 da bi dobio koterminalni ugao.", panelX + 18, 360);
  ctx.fillText("Na kruznici vaznija je krajnja tacka nego broj okreta.", panelX + 18, 384);
}

/* ── component ── */

export default function UnitCircleLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angleDeg, setAngleDeg] = useState(45);

  const principalDeg = normDeg(angleDeg);
  const principalRad = (principalDeg * Math.PI) / 180;
  const totalRad = (angleDeg * Math.PI) / 180;
  const cosVal = Math.cos(totalRad);
  const sinVal = Math.sin(totalRad);
  const tanDefined = Math.abs(cosVal) > 1e-9;
  const cotDefined = Math.abs(sinVal) > 1e-9;
  const exact = exactVals(principalDeg);
  const quad = quadrantLabel(principalDeg);
  const ref = refAngle(principalDeg);
  const turns = Math.round((angleDeg - principalDeg) / 360);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    drawCanvas(canvasRef.current, {
      principalDeg,
      principalRad,
      totalDeg: angleDeg,
      cosVal,
      sinVal,
      refDeg: ref,
      quadrant: quad,
    });
  }, [principalDeg, principalRad, angleDeg, cosVal, sinVal, ref, quad]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const presetValue = PRESET_ANGLES.includes(angleDeg)
    ? String(angleDeg)
    : "custom";

  /* computed tex strings for output boxes */
  const totalRadTex = degToPiTex(angleDeg);
  const principalRadTex = degToPiTex(principalDeg);
  const pointTex = exact
    ? "\\left(" + exact.cos + ",\\," + exact.sin + "\\right)"
    : "\\left(" + fmt(cosVal) + ",\\," + fmt(sinVal) + "\\right)";
  const cosTex = exact ? exact.cos : fmt(cosVal);
  const sinTex = exact ? exact.sin : fmt(sinVal);
  const tanTex = exact
    ? exact.tan
    : tanDefined
    ? fmt(sinVal / cosVal)
    : "\\text{nije def.}";
  const cotTex = exact
    ? exact.cot
    : cotDefined
    ? fmt(cosVal / sinVal)
    : "\\text{nije def.}";

  const turnPart =
    turns === 0
      ? ""
      : turns > 0
      ? "+" + turns + "\\cdot 360^\\circ"
      : turns + "\\cdot 360^\\circ";

  return (
    <div className={s.interactiveShell}>
      {/* controls */}
      <div className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>Podesi ugao</h3>
        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Standardni ugao</label>
            <select
              value={presetValue}
              onChange={(e) => {
                if (e.target.value !== "custom")
                  setAngleDeg(Number(e.target.value));
              }}
            >
              <option value="custom">Prilagodeno</option>
              {PRESET_ANGLES.map((a) => (
                <option key={a} value={a}>
                  {a === 360
                    ? "360\u00b0 = 2\u03c0"
                    : a + "\u00b0 = " +
                      degToPiTex(a)
                        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
                        .replace(/\\pi/g, "\u03c0")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={s.rangeWrap}>
          <label>
            Ukupan ugao{" "}
            <strong style={{ color: "var(--lesson-primary-soft)" }}>
              {fmt(angleDeg, 0)}&deg;
            </strong>
          </label>
          <input
            type="range"
            min={-720}
            max={720}
            step={5}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
          />
        </div>
        <p style={{ marginTop: 14, fontSize: "0.92rem", color: "var(--lesson-muted)" }}>
          Glavni ugao je{" "}
          <strong style={{ color: "var(--lesson-muted-strong)" }}>
            {fmt(principalDeg, 0)}&deg;
          </strong>
          , tacka na kruznici je u poziciji {quad}.
        </p>
      </div>

      {/* canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          aria-label="Interaktivna jedinicna kruznica sa radijanima i projekcijama"
        />
        <p
          style={{
            marginTop: 10,
            fontSize: "0.88rem",
            color: "var(--lesson-muted)",
          }}
        >
          Narandzasto je terminalni krak, plavo cos-projekcija, zeleno
          sin-projekcija, a ljubicasti markeri pokazuju polozaj istog ugla na
          kruznici i na skalama.
        </p>
      </div>

      {/* output grid */}
      <div className={s.resultsGrid} style={{ gridColumn: "1 / -1" }}>
        <div className={s.resultCard}>
          <strong>Mera ugla</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            {fmt(angleDeg, 0)}&deg; = {totalRadTex
              .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
              .replace(/\\pi/g, "\u03c0")}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Glavni ugao</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            {fmt(principalDeg, 0)}&deg; = {principalRadTex
              .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
              .replace(/\\pi/g, "\u03c0")}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Tacka na kruznici</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            P = ({fmt(cosVal, 4)}, {fmt(sinVal, 4)})
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>sin &amp; cos</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            cos = {fmt(cosVal, 4)}, sin = {fmt(sinVal, 4)}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>tan &amp; cot</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            tan ={" "}
            {tanDefined ? fmt(sinVal / cosVal, 4) : "nije def."}, cot ={" "}
            {cotDefined ? fmt(cosVal / sinVal, 4) : "nije def."}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Koterminalni zapis</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            {fmt(angleDeg, 0)}&deg; = {fmt(principalDeg, 0)}&deg;
            {turnPart
              .replace(/\\cdot/g, "\u00b7")
              .replace(/\\circ/g, "\u00b0") || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
