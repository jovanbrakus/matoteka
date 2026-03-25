"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── helpers ── */
const EPS = 1e-9;

const fmt = (v: number, d = 2): string => {
  if (!Number.isFinite(v)) return "nedef.";
  const r = Math.round(v * 10 ** d) / 10 ** d;
  if (Math.abs(r) < 1e-10) return "0";
  if (Math.abs(r - Math.round(r)) < 1e-10) return String(Math.round(r));
  return r.toFixed(d).replace(/\.?0+$/, "");
};

interface State {
  a1: number;
  q: number;
  n: number;
}

function computeTerms(st: State) {
  const terms: number[] = [];
  const partials: number[] = [];
  let running = 0;
  for (let i = 0; i < st.n; i++) {
    const val = st.a1 * st.q ** i;
    terms.push(val);
    running += val;
    partials.push(running);
  }
  return { terms, partials };
}

function finiteSum(st: State) {
  if (Math.abs(st.q - 1) < EPS) return st.n * st.a1;
  return (st.a1 * (1 - st.q ** st.n)) / (1 - st.q);
}

function seqType(st: State) {
  if (Math.abs(st.q - 1) < EPS) return "Konstantan niz";
  if (Math.abs(st.q) < EPS) return "Niz sa nulama posle prvog clana";
  if (st.q > 1) return "Rast po faktoru";
  if (st.q > 0 && st.q < 1) return "Pozitivno opadanje";
  if (st.q < 0 && Math.abs(st.q) < 1) return "Naizmenicno smirivanje";
  return "Naizmenicna divergencija";
}

function convergenceInfo(st: State) {
  if (Math.abs(st.q) < 1) {
    return {
      kind: st.q < 0 ? "alternating" : "convergent",
      label: "Red konvergira",
      text: "Posto je |q| < 1, clanovi idu ka nuli i parcijalne sume imaju granicu.",
      infSum: st.a1 / (1 - st.q),
    };
  }
  return {
    kind: "divergent",
    label: "Red divergira",
    text: "Posto |q| nije manje od 1, beskonacna suma nije definisana geometrijskom formulom.",
    infSum: null as number | null,
  };
}

/* ── presets ── */
const PRESETS: Record<string, State> = {
  convergent: { a1: 12, q: 0.5, n: 8 },
  growth: { a1: 2, q: 1.5, n: 7 },
  alternating: { a1: 8, q: -0.5, n: 8 },
  triangles: { a1: 18, q: 0.25, n: 7 },
};

/* ── drawing helpers ── */
function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string
) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.strokeStyle = "rgba(255,214,151,0.12)";
  ctx.lineWidth = 1.2;
  const r = 18;
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
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(255,214,151,0.92)";
  ctx.font = '700 13px "Inter",sans-serif';
  ctx.fillText(label, x + 16, y + 22);
  ctx.restore();
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  terms: number[],
  area: { x: number; y: number; w: number; h: number }
) {
  const pad = 18;
  const cx = area.x + pad;
  const cy = area.y + 34;
  const cw = area.w - pad * 2;
  const ch = area.h - 56;
  const baseY = cy + ch / 2;
  const maxA = Math.max(1, ...terms.map(Math.abs));
  const gap = 10;
  const bw = (cw - gap * (terms.length - 1)) / terms.length;

  ctx.save();
  ctx.strokeStyle = "rgba(255,214,151,0.14)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, baseY);
  ctx.lineTo(cx + cw, baseY);
  ctx.stroke();

  terms.forEach((t, i) => {
    const x = cx + i * (bw + gap);
    const mag = (Math.abs(t) / maxA) * (ch / 2 - 18);
    const y = t >= 0 ? baseY - mag : baseY;
    ctx.fillStyle = t >= 0 ? "rgba(255,148,79,0.9)" : "rgba(183,221,255,0.92)";
    ctx.fillRect(x, y, bw, mag);
    ctx.fillStyle = "rgba(255,244,234,0.86)";
    ctx.font = '600 11px "Inter",sans-serif';
    ctx.fillText(`a${i + 1}`, x + 4, baseY + 18);
    ctx.fillStyle = t >= 0 ? "#ffd697" : "#b7ddff";
    ctx.fillText(fmt(t), x + 4, t >= 0 ? y - 8 : y + mag + 14);
  });
  ctx.restore();
}

function drawSums(
  ctx: CanvasRenderingContext2D,
  partials: number[],
  infSum: number | null,
  area: { x: number; y: number; w: number; h: number }
) {
  const pad = 18;
  const cx = area.x + pad;
  const cy = area.y + 34;
  const cw = area.w - pad * 2;
  const ch = area.h - 56;
  const vals = infSum === null ? partials.slice() : [...partials, infSum];
  const mn = Math.min(0, ...vals);
  const mx = Math.max(0, ...vals);
  const span = Math.max(1, mx - mn);
  const stepX = partials.length > 1 ? cw / (partials.length - 1) : cw;
  const pt = (i: number, v: number) => ({
    x: cx + i * stepX,
    y: cy + ch - ((v - mn) / span) * ch,
  });

  ctx.save();
  ctx.strokeStyle = "rgba(255,214,151,0.14)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = cy + (ch / 4) * i;
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(cx + cw, y);
    ctx.stroke();
  }

  if (mn <= 0 && mx >= 0) {
    const zy = pt(0, 0).y;
    ctx.strokeStyle = "rgba(255,214,151,0.24)";
    ctx.beginPath();
    ctx.moveTo(cx, zy);
    ctx.lineTo(cx + cw, zy);
    ctx.stroke();
  }

  if (infSum !== null) {
    const ly = pt(0, infSum).y;
    ctx.setLineDash([7, 7]);
    ctx.strokeStyle = "rgba(146,228,196,0.9)";
    ctx.beginPath();
    ctx.moveTo(cx, ly);
    ctx.lineTo(cx + cw, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(146,228,196,0.95)";
    ctx.font = '700 11px "Inter",sans-serif';
    ctx.fillText(`S\u221E = ${fmt(infSum)}`, cx + 10, ly - 8);
  }

  ctx.strokeStyle = "rgba(255,148,79,0.96)";
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  partials.forEach((v, i) => {
    const p = pt(i, v);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  partials.forEach((v, i) => {
    const p = pt(i, v);
    ctx.fillStyle = "rgba(255,214,151,0.96)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,244,234,0.86)";
    ctx.font = '600 11px "Inter",sans-serif';
    ctx.fillText(`S${i + 1}`, p.x - 10, cy + ch + 16);
  });
  ctx.restore();
}

/* ── component ── */
export default function GeometricSeriesLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [a1, setA1] = useState(12);
  const [q, setQ] = useState(0.5);
  const [n, setN] = useState(8);

  const state: State = { a1, q, n };
  const data = computeTerms(state);
  const conv = convergenceInfo(state);
  const sn = finiteSum(state);
  const lastTerm = data.terms[data.terms.length - 1];

  const render = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const parent = cvs.parentElement;
    const frameW = Math.max(320, parent ? parent.clientWidth - 28 : 640);
    const frameH = Math.max(320, Math.min(560, frameW * 0.68));
    const dpr = window.devicePixelRatio || 1;
    cvs.width = Math.round(frameW * dpr);
    cvs.height = Math.round(frameH * dpr);
    cvs.style.height = `${frameH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, frameW, frameH);
    const pad = 30;
    const topArea = { x: pad, y: pad, w: frameW - pad * 2, h: frameH * 0.44 };
    const botArea = {
      x: pad,
      y: frameH * 0.5,
      w: frameW - pad * 2,
      h: frameH * 0.42,
    };
    drawPanel(ctx, topArea.x, topArea.y, topArea.w, topArea.h, "Prvih n clanova geometrijskog niza");
    drawPanel(ctx, botArea.x, botArea.y, botArea.w, botArea.h, "Parcijalne sume S1, S2, ..., Sn");
    drawBars(ctx, data.terms, topArea);
    drawSums(ctx, data.partials, conv.infSum, botArea);
  }, [data.terms, data.partials, conv.infSum]);

  useEffect(() => {
    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [render]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setA1(p.a1);
    setQ(p.q);
    setN(p.n);
  };

  const captionText =
    conv.infSum === null
      ? "Parcijalne sume ne prilaze stabilnoj granici, pa beskonacna suma nije definisana geometrijskom formulom."
      : `Parcijalne sume se priblizavaju granici ${fmt(conv.infSum)} dok broj clanova raste.`;

  const remainder =
    conv.infSum !== null ? conv.infSum - sn : null;
  const infLabel =
    conv.infSum === null
      ? "nije dozvoljena"
      : `S\u221E = ${fmt(conv.infSum)}`;
  const remainderText =
    remainder !== null
      ? ` Posle prvih ${n} clanova do granice ostaje jos ${fmt(remainder)}.`
      : "";

  const kindClass =
    conv.kind === "convergent"
      ? s.labNote
      : conv.kind === "alternating"
        ? s.labNote
        : s.labNote;

  return (
    <>
      <div className={s.interactiveShell}>
        {/* canvas */}
        <div>
          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              width={960}
              height={620}
            />
          </div>
          <p style={{ marginTop: 12, color: "var(--lesson-muted)" }} aria-live="polite">
            {captionText}
          </p>
          <p className={s.labNote}>
            Ako je |q| &lt; 1, iscrtava se i isprekidana linija beskonacne sume. Kada je q negativan, stubici menjaju smer, a linija suma osciluje.
          </p>
        </div>

        {/* controls */}
        <div>
          <article className={s.interactiveCard}>
            <h3 className={cs.tCardTitle}>Parametri niza</h3>
            <div className={s.controlGrid}>
              <div className={s.field}>
                <label>
                  Prvi clan a<sub>1</sub>{" "}
                  <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                    {fmt(a1)}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                />
              </div>
              <div className={s.field}>
                <label>
                  Kolicnik q{" "}
                  <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                    {fmt(q)}
                  </span>
                </label>
                <input
                  type="range"
                  min={-1.2}
                  max={1.8}
                  step={0.05}
                  value={q}
                  onChange={(e) => setQ(Number(e.target.value))}
                />
              </div>
              <div className={s.field}>
                <label>
                  Broj prikazanih clanova n{" "}
                  <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                    {n}
                  </span>
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
            </div>
          </article>

          <article className={s.interactiveCard} style={{ marginTop: 14 }}>
            <h3 className={cs.tCardTitle}>Brzi preset primeri</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
              <button className={s.presetBtn} type="button" onClick={() => applyPreset("convergent")}>
                Konvergencija
              </button>
              <button className={s.presetBtn} type="button" onClick={() => applyPreset("growth")}>
                Rast
              </button>
              <button className={s.presetBtn} type="button" onClick={() => applyPreset("alternating")}>
                Naizmenicno
              </button>
              <button className={s.presetBtn} type="button" onClick={() => applyPreset("triangles")}>
                Trouglovi
              </button>
            </div>
          </article>

          <article className={s.interactiveCard} style={{ marginTop: 14 }}>
            <h3 className={cs.tCardTitle}>Rezime trenutnog stanja</h3>
            <div className={s.resultsGrid}>
              <div className={s.resultCard}>
                <strong>Tip niza</strong>
                <p style={{ color: "var(--lesson-muted)" }}>
                  {seqType(state)}
                  <br />q = {fmt(q)}
                </p>
              </div>
              <div className={s.resultCard}>
                <strong>Poslednji prikazani clan</strong>
                <p style={{ color: "var(--lesson-muted)" }}>
                  a{n} = {fmt(lastTerm)}
                </p>
              </div>
              <div className={s.resultCard}>
                <strong>Konacna suma</strong>
                <p style={{ color: "var(--lesson-muted)" }}>
                  S{n} = {fmt(sn)}
                </p>
              </div>
              <div className={s.resultCard}>
                <strong>Beskonacna suma</strong>
                <p style={{ color: "var(--lesson-muted)" }}>{infLabel}</p>
              </div>
            </div>
            <div className={kindClass} style={{ marginTop: 14 }}>
              <strong style={{ display: "block", marginBottom: 6, color: "var(--lesson-muted-strong)" }}>
                {conv.label}
              </strong>
              <p style={{ margin: 0, color: "var(--lesson-muted)" }}>
                {conv.text}
                {remainderText}
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
