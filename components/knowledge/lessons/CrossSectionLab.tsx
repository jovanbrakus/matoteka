"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";
import MathBlock from "@/components/knowledge/MathBlock";

type Mode = "sphereCylinder" | "sphereCone" | "cylinderSphere" | "cylinderCone";

function fmt(value: number): string {
  const rounded =
    Math.abs(value - Math.round(value)) < 1e-9
      ? Math.round(value).toString()
      : value.toFixed(2);
  return rounded.replace(/\.00$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

interface ModeConfig {
  label: string;
  controlA: { label: string; title: string; min: number; max: number; step: number } | null;
  controlB: { label: string; title: string; min: number; max: number; step: number } | null;
  controlC: { label: string; title: string; min: number; max: number; step: number } | null;
  defaults: { a: number; b: number; c: number };
}

const MODE_CONFIGS: Record<Mode, ModeConfig> = {
  sphereCylinder: {
    label: "Lopta upisana u valjak",
    controlA: { label: "Poluprečnik lopte / baze", title: "r = R", min: 2, max: 10, step: 1 },
    controlB: null,
    controlC: null,
    defaults: { a: 4, b: 8, c: 0 },
  },
  sphereCone: {
    label: "Lopta upisana u kupu",
    controlA: { label: "Poluprečnik baze kupe R", title: "Spoljašnji poluprečnik", min: 2, max: 12, step: 1 },
    controlB: { label: "Visina kupe H", title: "Spoljašnja visina", min: 3, max: 16, step: 1 },
    controlC: null,
    defaults: { a: 6, b: 8, c: 0 },
  },
  cylinderSphere: {
    label: "Valjak upisan u loptu",
    controlA: { label: "Poluprečnik lopte R", title: "Spoljašnji poluprečnik", min: 3, max: 12, step: 1 },
    controlB: { label: "Visina valjka H", title: "Unutrašnja visina", min: 2, max: 20, step: 1 },
    controlC: null,
    defaults: { a: 5, b: 8, c: 0 },
  },
  cylinderCone: {
    label: "Valjak upisan u kupu",
    controlA: { label: "Poluprečnik baze kupe R", title: "Spoljašnji poluprečnik", min: 3, max: 12, step: 1 },
    controlB: { label: "Visina kupe H", title: "Spoljašnja visina", min: 5, max: 18, step: 1 },
    controlC: { label: "Visina valjka h", title: "Unutrašnja visina", min: 1, max: 12, step: 1 },
    defaults: { a: 6, b: 12, c: 4 },
  },
};

interface ComputedResult {
  modelTitle: string;
  modelDesc: string;
  relationFormula: string;
  numbersText: string;
  tipText: string;
  caption: string;
}

function computeModel(mode: Mode, a: number, b: number, c: number): ComputedResult {
  switch (mode) {
    case "sphereCylinder": {
      const r = a;
      const H = 2 * r;
      const vol = (4 / 3) * Math.PI * r * r * r;
      return {
        modelTitle: "Krug upisan u pravougaonik",
        modelDesc: "Valjak u osnom preseku daje pravougaonik, a lopta krug koji dodiruje sve četiri stranice.",
        relationFormula: `H = 2R`,
        numbersText: `r = ${fmt(r)}, H = ${fmt(H)}, V(lopte) = ${fmt(vol / Math.PI)}\\pi`,
        tipText: "Prvo proveri da li visina odgovara prečniku. Ako ne važi H = 2R, nema upisane lopte.",
        caption: "Krug je upisan u pravougaonik. Visina valjka mora biti jednaka prečniku lopte.",
      };
    }
    case "sphereCone": {
      const R = a;
      const H = b;
      const sl = Math.hypot(R, H);
      const r = (R * H) / (R + sl);
      const vol = (4 / 3) * Math.PI * r * r * r;
      return {
        modelTitle: "Krug upisan u jednakokraki trougao",
        modelDesc: "Ovo je najvažniji model lekcije: prostorni zadatak se pretvara u klasičan planimetrijski problem sa inradiusom.",
        relationFormula: `r = \\frac{RH}{R + \\sqrt{R^2 + H^2}} = \\frac{${fmt(R)} \\cdot ${fmt(H)}}{${fmt(R)} + ${fmt(sl)}} = ${fmt(r)}`,
        numbersText: `s = ${fmt(sl)}, r = ${fmt(r)}, V(lopte) \\approx ${fmt(vol)}`,
        tipText: "Traži trougao, ne celu kupu. Kada dobiješ osni presek, odmah su vidljivi osnovica, visina i izvodnica.",
        caption: "Osni presek kupe je jednakokraki trougao. Poluprečnik lopte je inradius tog trougla.",
      };
    }
    case "cylinderSphere": {
      const R = a;
      const H = b;
      const r = Math.sqrt(Math.max(0, R * R - (H * H) / 4));
      const vol = Math.PI * r * r * H;
      return {
        modelTitle: "Pravougaonik upisan u krug",
        modelDesc: "Polovina pravougaonika odmah vodi na Pitagorinu teoremu sa hipotenuzom R.",
        relationFormula: `r^2 + \\left(\\frac{H}{2}\\right)^2 = R^2 \\quad\\Rightarrow\\quad r = ${fmt(r)}`,
        numbersText: `r = ${fmt(r)}, H = ${fmt(H)}, V(valjka) \\approx ${fmt(vol)}`,
        tipText: "Polovina preseka je dovoljna. Čim prepoznaš pravougli trougao sa katetama r i H/2, račun postaje neposredan.",
        caption: "U osnom preseku valjak postaje pravougaonik upisan u krug. Polovina preseka daje Pitagorinu teoremu.",
      };
    }
    case "cylinderCone": {
      const R = a;
      const H = b;
      const h = c;
      const r = R * (1 - h / H);
      const vol = Math.PI * r * r * h;
      return {
        modelTitle: "Pravougaonik u jednakokrakom trouglu",
        modelDesc: "Na visini h širina preseka više nije puna osnovica kupe, nego smanjeni deo dobijen sličnim trouglovima.",
        relationFormula: `r = R\\left(1 - \\frac{h}{H}\\right) = ${fmt(R)}\\left(1 - \\frac{${fmt(h)}}{${fmt(H)}}\\right) = ${fmt(r)}`,
        numbersText: `r = ${fmt(r)}, h = ${fmt(h)}, V(valjka) \\approx ${fmt(vol)}`,
        tipText: "Što se više penješ ka vrhu kupe, presečna širina pada linearno. Isti obrazac važi i u pravilnoj piramidi.",
        caption: "Kada valjak stoji na bazi kupe, presek daje pravougaonik u jednakokrakom trouglu.",
      };
    }
  }
}

function drawOnCanvas(
  canvas: HTMLCanvasElement,
  mode: Mode,
  a: number,
  b: number,
  c: number
) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const W = rect.width;
  const H = rect.height;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = "rgba(255,255,255,0.015)";
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = 24; x < W; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 24; y < H; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const strokeText = (text: string, x: number, y: number, color: string) => {
    ctx.font = "600 14px Inter, sans-serif";
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  const drawAxis = (cx: number, top: number, bottom: number) => {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 202, 138, 0.4)";
    ctx.setLineDash([8, 7]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, top);
    ctx.lineTo(cx, bottom);
    ctx.stroke();
    ctx.restore();
  };

  const margin = 52;

  switch (mode) {
    case "sphereCylinder": {
      const r = a;
      const scale = Math.min((W - 2 * margin) / (2 * r), (H - 2 * margin) / (2 * r));
      const cx = W / 2;
      const cy = H / 2;
      const half = r * scale;

      ctx.strokeStyle = "rgba(255, 196, 136, 0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - half, cy - half, 2 * half, 2 * half);

      drawAxis(cx, cy - half - 24, cy + half + 24);

      ctx.beginPath();
      ctx.arc(cx, cy, half, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(172, 216, 255, 0.95)";
      ctx.lineWidth = 3;
      ctx.stroke();

      strokeText("R = r", cx + half + 16, cy, "#ffc488");
      strokeText("H = 2r", cx - 26, cy - half - 16, "#ffc488");
      break;
    }
    case "sphereCone": {
      const R = a;
      const Hcone = b;
      const sl = Math.hypot(R, Hcone);
      const r = (R * Hcone) / (R + sl);
      const scale = Math.min((W - 2 * margin) / (2 * R), (H - 2 * margin) / Hcone);
      const cx = W / 2;
      const baseY = H - margin;
      const apexY = baseY - Hcone * scale;
      const leftX = cx - R * scale;
      const rightX = cx + R * scale;
      const circleRadius = r * scale;
      const circleY = baseY - circleRadius;

      ctx.strokeStyle = "rgba(255, 196, 136, 0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(leftX, baseY);
      ctx.lineTo(cx, apexY);
      ctx.lineTo(rightX, baseY);
      ctx.closePath();
      ctx.stroke();

      drawAxis(cx, apexY - 20, baseY + 20);

      ctx.beginPath();
      ctx.arc(cx, circleY, circleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(172, 216, 255, 0.95)";
      ctx.lineWidth = 3;
      ctx.stroke();

      strokeText("R", rightX + 10, baseY - 6, "#ffc488");
      strokeText("H", cx + 10, (apexY + baseY) / 2, "#ffc488");
      strokeText("r", cx + circleRadius + 10, circleY, "#acd8ff");
      break;
    }
    case "cylinderSphere": {
      const R = a;
      const Hcyl = b;
      const r = Math.sqrt(Math.max(0, R * R - (Hcyl * Hcyl) / 4));
      const scale = Math.min((W - 2 * margin) / (2 * R), (H - 2 * margin) / (2 * R));
      const cx = W / 2;
      const cy = H / 2;
      const outer = R * scale;
      const rectHalfWidth = r * scale;
      const rectHalfHeight = (Hcyl * scale) / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, outer, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 196, 136, 0.92)";
      ctx.lineWidth = 3;
      ctx.stroke();

      drawAxis(cx, cy - outer - 18, cy + outer + 18);

      ctx.strokeStyle = "rgba(172, 216, 255, 0.96)";
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - rectHalfWidth, cy - rectHalfHeight, 2 * rectHalfWidth, 2 * rectHalfHeight);

      strokeText("R", cx + outer + 10, cy - 4, "#ffc488");
      strokeText("r", cx + rectHalfWidth + 10, cy + 18, "#acd8ff");
      strokeText("H", cx + 12, cy - rectHalfHeight - 10, "#acd8ff");
      break;
    }
    case "cylinderCone": {
      const R = a;
      const Hcone = b;
      const h = c;
      const r = R * (1 - h / Hcone);
      const scale = Math.min((W - 2 * margin) / (2 * R), (H - 2 * margin) / Hcone);
      const cx = W / 2;
      const baseY = H - margin;
      const apexY = baseY - Hcone * scale;
      const rightX = cx + R * scale;
      const leftX = cx - R * scale;
      const rectHalfWidth = r * scale;
      const rectHeight = h * scale;

      ctx.strokeStyle = "rgba(255, 196, 136, 0.92)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(leftX, baseY);
      ctx.lineTo(cx, apexY);
      ctx.lineTo(rightX, baseY);
      ctx.closePath();
      ctx.stroke();

      drawAxis(cx, apexY - 20, baseY + 20);

      ctx.strokeStyle = "rgba(172, 216, 255, 0.96)";
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - rectHalfWidth, baseY - rectHeight, 2 * rectHalfWidth, rectHeight);

      strokeText("R", rightX + 10, baseY - 6, "#ffc488");
      strokeText("H", cx + 10, (apexY + baseY) / 2, "#ffc488");
      strokeText("r", cx + rectHalfWidth + 10, baseY - rectHeight / 2, "#acd8ff");
      strokeText("h", cx - 24, baseY - rectHeight - 10, "#acd8ff");
      break;
    }
  }
}

export default function CrossSectionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("sphereCylinder");
  const [valA, setValA] = useState(4);
  const [valB, setValB] = useState(8);
  const [valC, setValC] = useState(4);

  const cfg = MODE_CONFIGS[mode];

  // Normalize values to keep them valid
  const normalizedB = mode === "cylinderSphere"
    ? Math.min(valB, Math.max(2, 2 * valA - 1))
    : valB;
  const maxC = mode === "cylinderCone" ? Math.max(1, valB - 1) : 10;
  const normalizedC = Math.min(valC, maxC);

  const result = computeModel(mode, valA, normalizedB, normalizedC);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    drawOnCanvas(canvasRef.current, mode, valA, normalizedB, normalizedC);
  }, [mode, valA, normalizedB, normalizedC]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    const d = MODE_CONFIGS[newMode].defaults;
    setValA(d.a);
    setValB(d.b);
    setValC(d.c);
  };

  return (
    <div className={s.interactiveShell}>
      <div>
        {/* Controls */}
        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Model</label>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as Mode)}
            >
              <option value="sphereCylinder">Lopta upisana u valjak</option>
              <option value="sphereCone">Lopta upisana u kupu</option>
              <option value="cylinderSphere">Valjak upisan u loptu</option>
              <option value="cylinderCone">Valjak upisan u kupu</option>
            </select>
          </div>

          {cfg.controlA && (
            <div className={s.field}>
              <label>{cfg.controlA.label}</label>
              <div className={s.rangeWrap}>
                <input
                  type="range"
                  min={cfg.controlA.min}
                  max={cfg.controlA.max}
                  step={cfg.controlA.step}
                  value={valA}
                  onChange={(e) => setValA(Number(e.target.value))}
                />
                <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
                  {fmt(valA)}
                </span>
              </div>
            </div>
          )}

          {cfg.controlB && (
            <div className={s.field}>
              <label>{cfg.controlB.label}</label>
              <div className={s.rangeWrap}>
                <input
                  type="range"
                  min={cfg.controlB.min}
                  max={mode === "cylinderSphere" ? Math.max(2, 2 * valA - 1) : cfg.controlB.max}
                  step={cfg.controlB.step}
                  value={normalizedB}
                  onChange={(e) => setValB(Number(e.target.value))}
                />
                <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
                  {fmt(normalizedB)}
                </span>
              </div>
            </div>
          )}

          {cfg.controlC && (
            <div className={s.field}>
              <label>{cfg.controlC.label}</label>
              <div className={s.rangeWrap}>
                <input
                  type="range"
                  min={cfg.controlC.min}
                  max={maxC}
                  step={cfg.controlC.step}
                  value={normalizedC}
                  onChange={(e) => setValC(Number(e.target.value))}
                />
                <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
                  {fmt(normalizedC)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Result cards */}
        <div className={s.resultsGrid} style={{ marginTop: 18 }}>
          <div className={s.resultCard}>
            <strong>2D model</strong>
            <p style={{ color: "var(--lesson-muted)" }}>{result.modelTitle}</p>
            <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem", marginTop: 6 }}>{result.modelDesc}</p>
          </div>
          <div className={s.resultCard}>
            <strong>Ključna relacija</strong>
            <MathBlock dynamic>{result.relationFormula}</MathBlock>
          </div>
          <div className={s.resultCard}>
            <strong>Numerički rezultat</strong>
            <MathBlock dynamic>{result.numbersText}</MathBlock>
          </div>
          <div className={s.resultCard}>
            <strong>Savet</strong>
            <p style={{ color: "var(--lesson-muted)" }}>{result.tipText}</p>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 12" }}
          aria-label="Interaktivni prikaz karakterističnog preseka"
        />
        <p style={{ marginTop: 10, fontSize: "0.88rem", color: "var(--lesson-muted)", textAlign: "center" }}>
          {result.caption}
        </p>
      </div>
    </div>
  );
}
