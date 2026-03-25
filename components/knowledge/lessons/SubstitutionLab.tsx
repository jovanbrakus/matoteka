"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";
import MathBlock from "@/components/knowledge/MathBlock";

interface LabState {
  a: number;
  k: number;
  valid: number;
  invalid: number;
  linearCoeff: number;
  constantTerm: number;
}

function formatSignedNumber(v: number) {
  return v < 0 ? `-${Math.abs(v)}` : `${v}`;
}

function buildPolyLatex(
  lead: string,
  coeff: number,
  base: string,
  constant: number,
) {
  const parts = [lead];
  if (coeff !== 0) {
    const sign = coeff > 0 ? "+" : "-";
    const abs = Math.abs(coeff);
    const ct = abs === 1 ? "" : `${abs}`;
    const conn = ct ? `${ct}\\cdot ` : "";
    parts.push(`${sign} ${conn}${base}`);
  }
  if (constant !== 0) {
    const sign = constant > 0 ? "+" : "-";
    parts.push(`${sign} ${Math.abs(constant)}`);
  }
  return `${parts.join(" ")} = 0`;
}

export default function SubstitutionLab() {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(2);
  const [forbidden, setForbidden] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getState = useCallback((): LabState => {
    const valid = Math.pow(base, exponent);
    const linearCoeff = -(valid + forbidden);
    const constantTerm = valid * forbidden;
    return { a: base, k: exponent, valid, invalid: forbidden, linearCoeff, constantTerm };
  }, [base, exponent, forbidden]);

  const draw = useCallback(
    (state: LabState) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const padding = { top: 28, right: 24, bottom: 40, left: 52 };
      const xMin = Math.min(-10, state.invalid - 2);
      const xMax = Math.max(12, state.valid + 3);
      const parabola = (u: number) =>
        (u - state.valid) * (u - state.invalid);

      const samplePoints = [xMin, xMax, (state.valid + state.invalid) / 2, 0, state.valid, state.invalid];
      let yMin = 0;
      let yMax = 0;
      samplePoints.forEach((p) => {
        const v = parabola(p);
        yMin = Math.min(yMin, v);
        yMax = Math.max(yMax, v);
      });
      const yPad = Math.max(2, (yMax - yMin) * 0.2);
      yMin -= yPad;
      yMax += yPad;

      const plotW = width - padding.left - padding.right;
      const plotH = height - padding.top - padding.bottom;
      const toX = (v: number) => padding.left + ((v - xMin) / (xMax - xMin)) * plotW;
      const toY = (v: number) => padding.top + ((yMax - v) / (yMax - yMin)) * plotH;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0f0604";
      ctx.fillRect(0, 0, width, height);

      // Forbidden zone
      ctx.fillStyle = "rgba(255, 151, 141, 0.08)";
      ctx.fillRect(toX(xMin), padding.top, toX(0) - toX(xMin), plotH);
      // Allowed zone
      ctx.fillStyle = "rgba(120, 223, 185, 0.05)";
      ctx.fillRect(toX(0), padding.top, toX(xMax) - toX(0), plotH);

      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      const stepX = xMax - xMin > 20 ? 2 : 1;
      for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += stepX) {
        ctx.beginPath();
        ctx.moveTo(toX(x), padding.top);
        ctx.lineTo(toX(x), height - padding.bottom);
        ctx.stroke();
      }
      const yRange = yMax - yMin;
      const stepY = yRange > 60 ? 10 : yRange > 20 ? 5 : 2;
      for (let y = Math.ceil(yMin / stepY) * stepY; y <= Math.floor(yMax / stepY) * stepY; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(padding.left, toY(y));
        ctx.lineTo(width - padding.right, toY(y));
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(padding.left, toY(0));
      ctx.lineTo(width - padding.right, toY(0));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toX(0), padding.top);
      ctx.lineTo(toX(0), height - padding.bottom);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "12px system-ui, sans-serif";
      ctx.fillText("u", width - padding.right + 6, toY(0) + 4);
      ctx.fillText("P(u)", toX(0) + 8, padding.top - 8);
      ctx.fillStyle = "rgba(255, 151, 141, 0.9)";
      ctx.fillText("zabranjeno: u \u2264 0", padding.left + 8, padding.top + 18);
      ctx.fillStyle = "rgba(120, 223, 185, 0.9)";
      ctx.fillText("dozvoljeno: u > 0", toX(0) + 12, padding.top + 18);

      // Parabola
      ctx.strokeStyle = "#ff9c6d";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const u = xMin + (i / 220) * (xMax - xMin);
        const px = toX(u);
        const py = toY(parabola(u));
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Markers
      const drawMarker = (root: number, color: string, label: string) => {
        const px = toX(root);
        const py = toY(0);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(px, padding.top);
        ctx.lineTo(px, height - padding.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.font = "13px system-ui, sans-serif";
        ctx.fillText(label, px + 8, py - 10);
      };
      drawMarker(state.invalid, "#ff978d", `u=${state.invalid}`);
      drawMarker(state.valid, "#78dfb9", `u=${state.valid}`);

      // Tick values
      ctx.fillStyle = "rgba(255,255,255,0.68)";
      ctx.font = "12px system-ui, sans-serif";
      [state.invalid, 0, state.valid].forEach((v) => {
        const px = toX(v);
        ctx.beginPath();
        ctx.moveTo(px, toY(0) - 5);
        ctx.lineTo(px, toY(0) + 5);
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.stroke();
        ctx.fillText(String(v), px - 8, height - padding.bottom + 18);
      });
    },
    [],
  );

  useEffect(() => {
    const state = getState();
    draw(state);
    const onResize = () => draw(getState());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getState, draw]);

  const randomize = () => {
    const bases = [2, 3];
    const forbiddenValues = [-1, -2, -4, -8];
    setBase(bases[Math.floor(Math.random() * bases.length)]);
    setExponent(Math.floor(Math.random() * 4));
    setForbidden(forbiddenValues[Math.floor(Math.random() * forbiddenValues.length)]);
  };

  const state = getState();
  const origLatex = buildPolyLatex(`${state.a}^{2x}`, state.linearCoeff, `${state.a}^x`, state.constantTerm);
  const substLatex = buildPolyLatex("u^2", state.linearCoeff, "u", state.constantTerm);

  const exponentOptions = [0, 1, 2, 3].map((k) => ({
    value: k,
    label: `k = ${k}  (u = ${Math.pow(base, k)})`,
  }));

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Controls */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Podesi prijemni primer</h3>
          <p>
            Biramo bazu, pozitivan koren i jedan negativan kandidat. Time dobijamo
            kvadratnu jednačinu, a zatim se vraćamo na x.
          </p>

          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>Baza a</label>
              <select
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            <div className={s.field}>
              <label>Dozvoljeni koren u = a^k</label>
              <select
                value={exponent}
                onChange={(e) => setExponent(Number(e.target.value))}
              >
                {exponentOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={s.field}>
              <label>Nedozvoljeni kandidat za u</label>
              <select
                value={forbidden}
                onChange={(e) => setForbidden(Number(e.target.value))}
              >
                <option value={-1}>-1</option>
                <option value={-2}>-2</option>
                <option value={-4}>-4</option>
                <option value={-8}>-8</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className={s.presetBtn} onClick={randomize} type="button">
              Novi primer
            </button>
          </div>

          <div className={s.labNote}>
            Lab koristi pozitivne korene oblika a^k kako bi završni korak ostao
            egzaktan i bez logaritama. U pravim zadacima koren može biti i druga
            pozitivna vrednost, ali uslov u &gt; 0 ostaje isti.
          </div>
        </div>

        {/* Canvas */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Graf parabole po promenljivoj u</h3>
          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              style={{ aspectRatio: "16 / 10" }}
            />
          </div>
          <p style={{ marginTop: 12, fontSize: "0.9rem" }}>
            Leva, crvenkasta poluosa predstavlja zabranjene vrednosti u &le; 0.
            Zeleni marker je koren koji može da ostane u eksponencijalnoj
            jednačini, a crveni marker je kandidat koji mora da se odbaci.
          </p>
        </div>
      </div>

      {/* Readouts */}
      <div className={s.resultsGrid} style={{ marginTop: 16 }}>
        <div className={s.resultCard}>
          <strong>Originalna jednačina</strong>
          <MathBlock>{origLatex}</MathBlock>
        </div>
        <div className={s.resultCard}>
          <strong>Kvadratna po u</strong>
          <MathBlock>{`u=${state.a}^x>0,\\quad ${substLatex}`}</MathBlock>
        </div>
        <div className={s.resultCard}>
          <strong>Kandidati i filter</strong>
          <MathBlock>
            {`u_1=${state.valid},\\qquad u_2=${formatSignedNumber(state.invalid)}`}
          </MathBlock>
          <MathBlock>
            {`u>0 \\Rightarrow \\text{ zadržavamo samo } u=${state.valid}`}
          </MathBlock>
        </div>
        <div className={s.resultCard}>
          <strong>Zaključak za x</strong>
          <MathBlock>
            {`${state.a}^x=${state.valid}=${state.a}^{${state.k}} \\Rightarrow x=${state.k}`}
          </MathBlock>
          <MathBlock>
            {`u=${formatSignedNumber(state.invalid)} \\text{ odbacujemo jer } u=a^x>0`}
          </MathBlock>
        </div>
      </div>
    </>
  );
}
