"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

interface LabState {
  a: number;
  b: number;
  c: number;
  d: number;
  op: "add" | "sub" | "mul" | "div";
  n: number;
  showConjugates: boolean;
}

interface Complex {
  re: number;
  im: number;
}

const FONT = '"Public Sans", sans-serif';

const PRESETS: Record<string, LabState> = {
  add: { a: 2, b: 3, c: -1, d: 4, op: "add", n: 25, showConjugates: true },
  mul: { a: 3, b: -2, c: 1, d: 5, op: "mul", n: 137, showConjugates: true },
  div: { a: 4, b: 2, c: 1, d: -1, op: "div", n: 2026, showConjugates: true },
  mod: { a: -3, b: 4, c: 2, d: 1, op: "sub", n: 18, showConjugates: true },
};

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function approx(v: number): number {
  const r = Math.round(v * 100) / 100;
  return Object.is(r, -0) ? 0 : r;
}

function fmt(v: number): string {
  const r = approx(v);
  return Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function complexLatex(z: Complex): string {
  const re = fmt(z.re);
  const absIm = Math.abs(z.im);
  if (z.im === 0) return re;
  const imUnit = absIm === 1 ? "i" : `${fmt(absIm)}i`;
  if (z.re === 0) return z.im < 0 ? `-${imUnit}` : imUnit;
  return `${re} ${z.im < 0 ? "-" : "+"} ${imUnit}`;
}

function conjugate(z: Complex): Complex {
  return { re: z.re, im: -z.im };
}

function modulusSq(z: Complex): number {
  return z.re * z.re + z.im * z.im;
}

function modulus(z: Complex): number {
  return Math.sqrt(modulusSq(z));
}

function calculate(z: Complex, w: Complex, op: string): Complex | null {
  if (op === "add") return { re: z.re + w.re, im: z.im + w.im };
  if (op === "sub") return { re: z.re - w.re, im: z.im - w.im };
  if (op === "mul") return { re: z.re * w.re - z.im * w.im, im: z.re * w.im + z.im * w.re };
  if (op === "div") {
    const den = modulusSq(w);
    if (den === 0) return null;
    return { re: (z.re * w.re + z.im * w.im) / den, im: (z.im * w.re - z.re * w.im) / den };
  }
  return { re: 0, im: 0 };
}

function powerOfI(n: number): { remainder: number; value: string } {
  const remainder = ((n % 4) + 4) % 4;
  return { remainder, value: ["1", "i", "-1", "-i"][remainder] };
}

function opSymbol(op: string): string {
  return { add: "+", sub: "-", mul: "\\cdot", div: "\\div" }[op] || "+";
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a), y = Math.abs(b);
  while (y) { const t = x % y; x = y; y = t; }
  return x || 1;
}

function fractionLatex(num: number, den: number): string {
  if (den < 0) return fractionLatex(-num, -den);
  const d = gcd(num, den);
  const n2 = num / d, d2 = den / d;
  return d2 === 1 ? String(n2) : `\\frac{${n2}}{${d2}}`;
}

function complexFractionLatex(reNum: number, imNum: number, den: number): string {
  if (reNum === 0 && imNum === 0) return "0";
  const imMag = Math.abs(imNum);
  const imFrac = fractionLatex(imMag, den);
  const imPart = imFrac === "1" ? "i" : `${imFrac}i`;
  if (reNum === 0) return imNum < 0 ? `-${imPart}` : imPart;
  const rePart = fractionLatex(reNum, den);
  if (imNum === 0) return rePart;
  return `${rePart} ${imNum < 0 ? "-" : "+"} ${imPart}`;
}

export default function ComplexPlaneLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [st, setSt] = useState<LabState>(PRESETS.mul);

  const z: Complex = { re: st.a, im: st.b };
  const w: Complex = { re: st.c, im: st.d };
  const result = calculate(z, w, st.op);
  const zConj = conjugate(z);
  const zMod = modulus(z);
  const zModSq = modulusSq(z);
  const power = powerOfI(st.n);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = document.documentElement.classList.contains("light");
    const T = {
      bg: isLight ? "#f5f0eb" : "rgba(8, 4, 2, 0.95)",
      text: isLight ? "#2a2420" : "#f6eee9",
      muted: isLight ? "#7a6f68" : "#cdb8aa",
      grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
      gridStrong: isLight ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.24)",
      gridLabel: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.32)",
      axisLabel: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.68)",
      projection: isLight ? "rgba(236,91,19,0.20)" : "rgba(255, 154, 106, 0.22)",
      conjZ: isLight ? "rgba(236,91,19,0.50)" : "rgba(255, 154, 106, 0.55)",
      conjW: isLight ? "rgba(0,140,200,0.50)" : "rgba(136, 216, 255, 0.55)",
      modCircle: isLight ? "rgba(200,150,100,0.22)" : "rgba(255, 215, 185, 0.22)",
      modLabel: isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)",
    };

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(320, canvas.clientWidth || 640);
    const height = Math.max(240, Math.round(width * 0.62));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const allPts: Complex[] = [z, w];
    if (result) allPts.push(result);
    if (st.showConjugates) { allPts.push(conjugate(z), conjugate(w)); }

    let maxC = 4;
    allPts.forEach(p => { maxC = Math.max(maxC, Math.abs(p.re), Math.abs(p.im)); });
    maxC += 1;

    const margin = 44;
    const scale = Math.min((width / 2 - margin) / maxC, (height / 2 - margin) / maxC);
    const cx = width / 2, cy = height / 2;
    const mx = (x: number) => cx + x * scale;
    const my = (y: number) => cy - y * scale;

    // Pick a nice grid step so we get ~5-10 lines per half-axis
    const niceStep = (range: number): number => {
      const raw = range / 6;
      const mag = Math.pow(10, Math.floor(Math.log10(raw)));
      const norm = raw / mag;
      if (norm <= 1) return mag;
      if (norm <= 2) return 2 * mag;
      if (norm <= 5) return 5 * mag;
      return 10 * mag;
    };
    const step = niceStep(maxC);
    const gridMax = Math.ceil(maxC / step) * step;

    // Background
    ctx.fillStyle = T.bg;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = T.grid;
    ctx.lineWidth = 1;
    for (let v = -gridMax; v <= gridMax; v += step) {
      if (Math.abs(v) < step * 0.01) continue;
      ctx.beginPath(); ctx.moveTo(mx(v), margin * 0.55); ctx.lineTo(mx(v), height - margin * 0.55); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(margin * 0.55, my(v)); ctx.lineTo(width - margin * 0.55, my(v)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = T.gridStrong;
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(margin * 0.45, cy); ctx.lineTo(width - margin * 0.45, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, margin * 0.45); ctx.lineTo(cx, height - margin * 0.45); ctx.stroke();

    ctx.fillStyle = T.axisLabel;
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText("Re", width - 28, cy - 10);
    ctx.fillText("Im", cx + 10, 24);

    // Number labels
    ctx.fillStyle = T.gridLabel;
    ctx.font = `500 11px ${FONT}`;
    for (let v = -gridMax; v <= gridMax; v += step) {
      if (Math.abs(v) < step * 0.01) continue;
      const label = Number.isInteger(v) ? String(v) : v.toFixed(1);
      ctx.fillText(label, mx(v) - 4, cy + 16);
      ctx.fillText(label, cx + 8, my(v) + 4);
    }

    // Helper to draw arrows
    const drawArrow = (fX: number, fY: number, tX: number, tY: number, color: string, label: string) => {
      const ang = Math.atan2(tY - fY, tX - fX);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(fX, fY); ctx.lineTo(tX, tY); ctx.stroke();
      const sz = 10;
      ctx.beginPath();
      ctx.moveTo(tX, tY);
      ctx.lineTo(tX - sz * Math.cos(ang - Math.PI / 6), tY - sz * Math.sin(ang - Math.PI / 6));
      ctx.lineTo(tX - sz * Math.cos(ang + Math.PI / 6), tY - sz * Math.sin(ang + Math.PI / 6));
      ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(tX, tY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = `600 14px ${FONT}`;
      ctx.fillStyle = color;
      ctx.fillText(label, tX + 8, tY - 10);
    };

    // Dashed projections for z
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = T.projection;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx(z.re), cy); ctx.lineTo(mx(z.re), my(z.im)); ctx.stroke();
    ctx.setLineDash([]);

    // Vectors
    drawArrow(cx, cy, mx(z.re), my(z.im), "#ec5b13", "z");
    drawArrow(cx, cy, mx(w.re), my(w.im), "#88d8ff", "w");
    if (result) drawArrow(cx, cy, mx(result.re), my(result.im), "#6bdfb7", "rez");

    // Conjugates
    if (st.showConjugates) {
      ctx.setLineDash([4, 6]);
      drawArrow(cx, cy, mx(zConj.re), my(zConj.im), T.conjZ, "konj z");
      drawArrow(cx, cy, mx(conjugate(w).re), my(conjugate(w).im), T.conjW, "konj w");
      ctx.setLineDash([]);
    }

    // Modulus circle for z
    const radius = zMod * scale;
    ctx.strokeStyle = T.modCircle;
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = T.modLabel;
    ctx.font = `600 12px ${FONT}`;
    ctx.fillText("|z|", cx + radius * 0.45, cy - 8);
  }, [z.re, z.im, w.re, w.im, st.op, st.showConjugates, result, zConj.re, zConj.im, zMod]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const h = () => draw();
    window.addEventListener("resize", h);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", h); observer.disconnect(); };
  }, [draw]);

  const set = (key: keyof LabState, v: number | string | boolean) =>
    setSt(prev => ({ ...prev, [key]: v }));

  // Build formula text
  let formulaLatex = "";
  let hint = "";
  if (st.op === "add") {
    const r = calculate(z, w, "add")!;
    formulaLatex = `(${complexLatex(z)}) + (${complexLatex(w)}) = ${complexLatex(r)}`;
    hint = "Sabiranje i oduzimanje su najcistiji deo price: komponente iste vrste idu zajedno.";
  } else if (st.op === "sub") {
    const r = calculate(z, w, "sub")!;
    formulaLatex = `(${complexLatex(z)}) - (${complexLatex(w)}) = ${complexLatex(r)}`;
    hint = "Kod oduzimanja pazi na zagrade, jer se znak ispred drugog broja prenosi na oba dela.";
  } else if (st.op === "mul") {
    const r = calculate(z, w, "mul")!;
    formulaLatex = `(${complexLatex(z)})(${complexLatex(w)}) = ${complexLatex(r)}`;
    hint = "Kod mnozenja kljucni prelaz je zamena i^2 = -1. Tu se znak najcesce pogresi.";
  } else if (st.op === "div") {
    const den = modulusSq(w);
    if (den === 0) {
      formulaLatex = `\\frac{${complexLatex(z)}}{${complexLatex(w)}} \\text{ nije definisano jer je } w = 0.`;
      hint = "Deljenje je dozvoljeno samo kada imenilac nije nula.";
    } else {
      const reNum = z.re * w.re + z.im * w.im;
      const imNum = z.im * w.re - z.re * w.im;
      const cw = conjugate(w);
      formulaLatex = `\\frac{${complexLatex(z)}}{${complexLatex(w)}} = \\frac{(${complexLatex(z)})(${complexLatex(cw)})}{${w.re}^2 + (${w.im})^2} = ${complexFractionLatex(reNum, imNum, den)}`;
      hint = "Konjugovani broj sluzi samo da imenilac postane realan: (c+di)(c-di) = c^2+d^2.";
    }
  }

  return (
    <div className={s.interactiveShell}>
      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Kontrole</h3>
        <p>U interaktivnom delu su koeficijenti celobrojni da bi koraci ostali pregledni i da bi racun ostao slican tipicnim prijemnim zadacima.</p>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Realni deo broja z</label>
            <input type="number" min={-8} max={8} step={1} value={st.a}
              onChange={e => set("a", clamp(parseInt(e.target.value) || 0, -8, 8))} />
          </div>
          <div className={s.field}>
            <label>Imaginarni deo broja z</label>
            <input type="number" min={-8} max={8} step={1} value={st.b}
              onChange={e => set("b", clamp(parseInt(e.target.value) || 0, -8, 8))} />
          </div>
          <div className={s.field}>
            <label>Realni deo broja w</label>
            <input type="number" min={-8} max={8} step={1} value={st.c}
              onChange={e => set("c", clamp(parseInt(e.target.value) || 0, -8, 8))} />
          </div>
          <div className={s.field}>
            <label>Imaginarni deo broja w</label>
            <input type="number" min={-8} max={8} step={1} value={st.d}
              onChange={e => set("d", clamp(parseInt(e.target.value) || 0, -8, 8))} />
          </div>
          <div className={s.field}>
            <label>Izaberi operaciju</label>
            <select value={st.op} onChange={e => set("op", e.target.value)}>
              <option value="add">z + w</option>
              <option value="sub">z - w</option>
              <option value="mul">z · w</option>
              <option value="div">z / w</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Eksponent za i^n</label>
            <input type="number" min={0} max={9999} step={1} value={st.n}
              onChange={e => set("n", clamp(parseInt(e.target.value) || 0, 0, 9999))} />
          </div>
        </div>

        <div className={s.toggleRow}>
          <input type="checkbox" checked={st.showConjugates}
            onChange={e => set("showConjugates", e.target.checked)} />
          <span>Prikazi konjugate brojeva z i w</span>
        </div>

        <div className={cs.presetRow} style={{ marginTop: 14 }}>
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button key={key} className={s.presetBtn} onClick={() => setSt(preset)}>
              {{ add: "Primer za sabiranje", mul: "Primer za mnozenje", div: "Primer za deljenje", mod: "Primer za modul" }[key]}
            </button>
          ))}
        </div>

        <div className={s.labNote}>
          {hint}
        </div>
      </article>

      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Gaussova ravan i rezultat</h3>
        <div className={s.canvasWrap}>
          <canvas ref={canvasRef} className={s.polarCanvas}
            width={960} height={600}
            aria-label="Gaussova ravan sa dva kompleksna broja i rezultatom operacije" />
        </div>

        <div className={s.resultsGrid}>
          <div className={s.resultCard}>
            <strong>Broj z</strong>
            <MathJax dynamic>{`\\(z = ${complexLatex(z)}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Broj w</strong>
            <MathJax dynamic>{`\\(w = ${complexLatex(w)}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Rezultat</strong>
            {result
              ? <MathJax dynamic>{`\\(z ${opSymbol(st.op)} w = ${complexLatex(result)}\\)`}</MathJax>
              : <span>Deljenje sa nulom nije dozvoljeno.</span>
            }
          </div>
          <div className={s.resultCard}>
            <strong>Modul i konjugat</strong>
            <MathJax dynamic>{`\\(\\overline{z} = ${complexLatex(zConj)}\\)`}</MathJax>
            <br />
            <MathJax dynamic>{`\\(|z| = \\sqrt{${zModSq}} \\approx ${fmt(zMod)}\\)`}</MathJax>
          </div>
        </div>

        <div className={s.labNote}>
          <MathJax dynamic>{`\\[${formulaLatex}\\]`}</MathJax>
        </div>

        <div className={s.labNote}>
          <MathJax dynamic>{`\\[${st.n} \\equiv ${power.remainder} \\pmod 4 \\quad \\Longrightarrow \\quad i^{${st.n}} = ${power.value}\\]`}</MathJax>
        </div>
      </article>
    </div>
  );
}
