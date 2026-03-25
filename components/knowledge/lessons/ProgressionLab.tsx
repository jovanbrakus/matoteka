"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

interface Preset {
  label: string;
  a1: number;
  d: number;
  n: number;
  focus: number;
}

const PRESETS: Preset[] = [
  { label: "Rastući primer", a1: 2, d: 3, n: 6, focus: 3 },
  { label: "Opadajući primer", a1: 14, d: -2, n: 7, focus: 4 },
  { label: "Konstantan niz", a1: 5, d: 0, n: 5, focus: 3 },
  { label: "Ispitni sistem", a1: -4, d: 4, n: 8, focus: 5 },
];

function fmt(v: number): string {
  return Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/\.00$/, "");
}

function getTerms(a1: number, d: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => a1 + i * d);
}

export default function ProgressionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [a1, setA1] = useState(2);
  const [d, setD] = useState(3);
  const [n, setN] = useState(6);
  const [focus, setFocus] = useState(3);

  const focusMin = 2;
  const focusMax = Math.max(2, n - 1);

  // clamp focus when n changes
  useEffect(() => {
    if (focus > focusMax) setFocus(focusMax);
    if (focus < focusMin) setFocus(focusMin);
  }, [n, focus, focusMax]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 360;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const terms = getTerms(a1, d, n);
    const minY = Math.min(...terms);
    const maxY = Math.max(...terms);
    const spanY = Math.max(6, maxY - minY);
    const padX = 52;
    const padTop = 28;
    const padBottom = 52;
    const plotWidth = width - padX * 2;
    const plotHeight = height - padTop - padBottom;

    const mapX = (index: number) =>
      padX + ((index - 1) / Math.max(1, n - 1)) * plotWidth;
    const mapYVal = (value: number) => {
      const normalized = (value - (minY - spanY * 0.18)) / (spanY * 1.36);
      return height - padBottom - normalized * plotHeight;
    };

    // background
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "rgba(20, 10, 7, 0.95)");
    bg.addColorStop(1, "rgba(7, 3, 2, 0.98)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (i / 4) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(width - padX, y);
      ctx.stroke();
    }

    // axes
    ctx.beginPath();
    ctx.moveTo(padX, padTop);
    ctx.lineTo(padX, height - padBottom);
    ctx.lineTo(width - padX, height - padBottom);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // axis labels
    ctx.fillStyle = "rgba(242, 228, 218, 0.72)";
    ctx.font = '12px "Public Sans", system-ui, sans-serif';
    ctx.fillText("vrednost člana", padX + 8, padTop - 6);
    ctx.fillText("indeks", width - padX - 36, height - padBottom + 28);

    // connecting line
    ctx.strokeStyle = "#ff9a6a";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    terms.forEach((term, idx) => {
      const x = mapX(idx + 1);
      const y = mapYVal(term);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // points
    terms.forEach((term, idx) => {
      const index = idx + 1;
      const x = mapX(index);
      const y = mapYVal(term);
      const isFocus = index === focus;
      const isNeighbor = index === focus - 1 || index === focus + 1;

      ctx.beginPath();
      ctx.arc(x, y, isFocus ? 7.5 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = isFocus
        ? "#ffd4b3"
        : isNeighbor
          ? "#90ddff"
          : "#70ddb0";
      ctx.fill();

      ctx.fillStyle = isFocus ? "#ffd4b3" : "rgba(246, 238, 233, 0.86)";
      ctx.font = isFocus
        ? '700 13px "Public Sans", system-ui, sans-serif'
        : '600 12px "Public Sans", system-ui, sans-serif';
      ctx.fillText(`a${index}`, x - 10, y - 12);

      ctx.fillStyle = "rgba(215, 198, 187, 0.9)";
      ctx.fillText(String(index), x - 4, height - padBottom + 20);
    });

    // middle-member highlight
    if (focus > 1 && focus < n) {
      const leftX = mapX(focus - 1);
      const leftY = mapYVal(terms[focus - 2]);
      const midX = mapX(focus);
      const midY = mapYVal(terms[focus - 1]);
      const rightX = mapX(focus + 1);
      const rightY = mapYVal(terms[focus]);

      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "rgba(144, 221, 255, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftX, leftY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(rightX, rightY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#90ddff";
      ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
      ctx.fillText(
        "isti skok",
        (leftX + midX) / 2 - 18,
        (leftY + midY) / 2 - 8,
      );
      ctx.fillText(
        "isti skok",
        (midX + rightX) / 2 - 18,
        (midY + rightY) / 2 - 8,
      );
    }

    // top-right info
    ctx.fillStyle = "rgba(255, 212, 179, 0.92)";
    ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
    ctx.fillText(`a1 = ${fmt(a1)}`, width - 156, 32);
    ctx.fillText(`d = ${fmt(d)}`, width - 156, 54);
    ctx.fillText(`n = ${fmt(n)}`, width - 156, 76);
  }, [a1, d, n, focus]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  const terms = getTerms(a1, d, n);
  const focusTerm = terms[focus - 1] ?? 0;
  const lastTerm = terms[terms.length - 1] ?? 0;
  const sum = (n * (a1 + lastTerm)) / 2;

  const applyPreset = (p: Preset) => {
    setA1(p.a1);
    setD(p.d);
    setN(p.n);
    const maxF = Math.max(2, p.n - 1);
    setFocus(Math.min(Math.max(p.focus, 2), maxF));
  };

  const termFormulaStr = `a_{${focus}} = ${fmt(a1)} + (${focus}-1)\\cdot ${fmt(d)} = ${fmt(focusTerm)}`;
  const sumFormulaStr = `S_{${n}} = \\frac{${n}}{2}\\left(${fmt(a1)} + ${fmt(lastTerm)}\\right) = ${fmt(sum)}`;
  let middleStr: string;
  if (focus > 1 && focus < n) {
    const left = terms[focus - 2];
    const right = terms[focus];
    middleStr = `2a_{${focus}} = a_{${focus - 1}} + a_{${focus + 1}} \\Rightarrow 2\\cdot ${fmt(focusTerm)} = ${fmt(left)} + ${fmt(right)}`;
  } else {
    middleStr = `a_k = \\frac{a_{k-1}+a_{k+1}}{2}`;
  }

  return (
    <div className={s.interactiveShell}>
      <div className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>Kontrole laboratorije</h3>

        <div className={s.rangeWrap}>
          <label>
            Prvi član a₁{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>{fmt(a1)}</span>
          </label>
          <input
            type="range"
            min={-8}
            max={12}
            step={1}
            value={a1}
            onChange={(e) => setA1(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Razlika d{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>{fmt(d)}</span>
          </label>
          <input
            type="range"
            min={-5}
            max={6}
            step={1}
            value={d}
            onChange={(e) => setD(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Broj članova n{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>{fmt(n)}</span>
          </label>
          <input
            type="range"
            min={3}
            max={10}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Fokusirani indeks k{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>
              {fmt(focus)}
            </span>
          </label>
          <input
            type="range"
            min={focusMin}
            max={focusMax}
            step={1}
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
          />
        </div>

        <div className={cs.presetRow} style={{ marginTop: 14 }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              className={s.presetBtn}
              type="button"
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className={s.labNote} style={{ marginTop: 16 }}>
          <strong>Kako da koristiš ovaj deo</strong>
          <p style={{ marginTop: 6, color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
            Prvo pomeraj samo d i prati kako se nagib menja. Zatim pomeraj
            fokusirani indeks k i proveravaj jednačinu 2a_k = a_(k-1) + a_(k+1).
          </p>
        </div>
      </div>

      <div className={s.canvasWrap}>
        <p style={{ padding: "0 4px 8px", color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
          Na slici su indeksi na horizontalnoj osi, a vrednosti članova niza na
          vertikalnoj osi. Kod aritmetičkog niza sve tačke padaju na jednu pravu.
        </p>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 9" }}
        />

        <div className={s.resultsGrid} style={{ marginTop: 14 }}>
          <div className={s.resultCard}>
            <strong>Prvih n članova</strong>
            <MathJax dynamic>{`\\(${terms.map((v) => fmt(v)).join(",\\,")}\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Formula za a_k</strong>
            <MathJax dynamic>{`\\[${termFormulaStr}\\]`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Suma prvih n članova</strong>
            <MathJax dynamic>{`\\[${sumFormulaStr}\\]`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Provera svojstva</strong>
            <MathJax dynamic>{`\\[${middleStr}\\]`}</MathJax>
          </div>
        </div>
      </div>
    </div>
  );
}
