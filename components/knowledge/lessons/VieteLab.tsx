"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Utility helpers ── */

function cleanNumber(value: number): number {
  const rounded = Math.round(value * 1000) / 1000;
  return Math.abs(rounded) < 1e-9 ? 0 : rounded;
}

function formatNumber(value: number): string {
  const cleaned = cleanNumber(value);
  if (Number.isInteger(cleaned)) return String(cleaned);
  return String(cleaned);
}

function formatLatexNumber(value: number): string {
  return formatNumber(value);
}

function formatRootFactor(root: number): string {
  if (root === 0) return "x";
  if (root > 0) return `(x-${formatLatexNumber(root)})`;
  return `(x+${formatLatexNumber(Math.abs(root))})`;
}

function polynomialFromRoots(a: number, roots: number[]): number[] {
  let coeffs = [a];
  roots.forEach((root) => {
    const next = new Array(coeffs.length + 1).fill(0);
    coeffs.forEach((coeff, index) => {
      next[index] += coeff;
      next[index + 1] += -root * coeff;
    });
    coeffs = next.map(cleanNumber);
  });
  return coeffs;
}

function elementarySums(roots: number[]): number[] {
  const sums = new Array(roots.length + 1).fill(0);
  sums[0] = 1;
  roots.forEach((root) => {
    for (let i = roots.length; i >= 1; i -= 1) {
      sums[i] = cleanNumber(sums[i] + sums[i - 1] * root);
    }
  });
  return sums.slice(1);
}

function polynomialLatex(coeffs: number[]): string {
  const degree = coeffs.length - 1;
  const pieces: string[] = [];
  coeffs.forEach((coeff, index) => {
    if (Math.abs(coeff) < 1e-9) return;
    const power = degree - index;
    const sign =
      coeff < 0
        ? pieces.length
          ? " - "
          : "-"
        : pieces.length
          ? " + "
          : "";
    const absCoeff = Math.abs(coeff);
    let coeffPart = "";
    if (power === 0 || absCoeff !== 1) {
      coeffPart = formatLatexNumber(absCoeff);
    }
    let variablePart = "";
    if (power > 1) {
      variablePart = `x^{${power}}`;
    } else if (power === 1) {
      variablePart = "x";
    }
    pieces.push(`${sign}${coeffPart}${variablePart}`);
  });
  return pieces.join("") || "0";
}

function factorLatex(a: number, roots: number[]): string {
  const aPart =
    a === 1 ? "" : a === -1 ? "-" : formatLatexNumber(a);
  return `${aPart}${roots.map(formatRootFactor).join("")}`;
}

/* ── Types ── */

interface VieteLabState {
  degree: 3 | 4;
  leading: number;
  roots: [number, number, number, number];
}

const DEFAULT_STATE: VieteLabState = {
  degree: 3,
  leading: 1,
  roots: [1, 2, 3, 4],
};

const PRESETS: Record<string, VieteLabState> = {
  ap: { degree: 3, leading: 1, roots: [3, 4, 5, 4] },
  symmetric: { degree: 4, leading: 1, roots: [-3, -1, 1, 3] },
  double: { degree: 3, leading: 1, roots: [-1, 2, 2, 2] },
};

/* ── Canvas drawing ── */

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawCanvas(
  canvas: HTMLCanvasElement,
  roots: number[],
  coeffs: number[]
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.floor(rect.height || 340);
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const axisStart = 44;
  const axisEnd = width - 44;
  const axisY = Math.round(height * 0.58);
  const min = -6;
  const max = 6;
  const sums = elementarySums(roots);

  const labels =
    roots.length === 3
      ? [
          ["S1", formatNumber(sums[0]), "-b/a"],
          ["S2", formatNumber(sums[1]), "c/a"],
          ["S3", formatNumber(sums[2]), "-d/a"],
        ]
      : [
          ["S1", formatNumber(sums[0]), "-b/a"],
          ["S2", formatNumber(sums[1]), "c/a"],
          ["S3", formatNumber(sums[2]), "-d/a"],
          ["S4", formatNumber(sums[3]), "e/a"],
        ];
  const colors = ["#ec5b13", "#ffd7b9", "#88d8ff", "#6bdfb7"];

  function mapValue(value: number) {
    return axisStart + ((value - min) / (max - min)) * (axisEnd - axisStart);
  }

  ctx.clearRect(0, 0, width, height);

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, "rgba(20, 9, 6, 0.96)");
  bgGrad.addColorStop(1, "rgba(10, 4, 3, 0.98)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#f6eee9";
  ctx.font = '700 20px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Veza izmedju korenova i koeficijenata", 22, 34);
  ctx.fillStyle = "rgba(215, 199, 187, 0.82)";
  ctx.font = '400 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    `Koreni: ${roots.map(formatNumber).join(", ")} | Koeficijenti: ${coeffs.map(formatNumber).join(", ")}`,
    22,
    56
  );

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (
    let x = axisStart;
    x <= axisEnd;
    x += (axisEnd - axisStart) / 12
  ) {
    ctx.beginPath();
    ctx.moveTo(x, 72);
    ctx.lineTo(x, axisY + 34);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255, 215, 185, 0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(axisStart, axisY);
  ctx.lineTo(axisEnd, axisY);
  ctx.stroke();

  for (let tick = min; tick <= max; tick += 1) {
    const x = mapValue(tick);
    ctx.strokeStyle = "rgba(255, 215, 185, 0.55)";
    ctx.beginPath();
    ctx.moveTo(x, axisY - 7);
    ctx.lineTo(x, axisY + 7);
    ctx.stroke();
    ctx.fillStyle = "rgba(243, 229, 219, 0.75)";
    ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(String(tick), x - 8, axisY + 24);
  }

  const groups = new Map<
    string,
    { value: number; indices: number[] }
  >();
  roots.forEach((root, index) => {
    const key = formatNumber(root);
    if (!groups.has(key)) {
      groups.set(key, { value: root, indices: [] });
    }
    groups.get(key)!.indices.push(index + 1);
  });

  Array.from(groups.values()).forEach((group, groupIndex) => {
    const x = mapValue(group.value);
    group.indices.forEach((labelIndex, stackIndex) => {
      const y = axisY - 16 - stackIndex * 22;
      ctx.fillStyle = colors[(groupIndex + stackIndex) % colors.length];
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(9, 4, 3, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#f6eee9";
      ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
      ctx.fillText(`x${labelIndex}`, x - 10, y - 14);
    });
  });

  const cardWidth =
    roots.length === 3
      ? (width - 54) / 3 - 8
      : (width - 62) / 4 - 8;
  labels.forEach((item, index) => {
    const x = 18 + index * (cardWidth + 10);
    const y = height - 88;
    roundRectPath(ctx, x, y, cardWidth, 58, 14);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,154,106,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#ffb184";
    ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(item[0], x + 12, y + 18);
    ctx.fillStyle = "#f6eee9";
    ctx.font = '700 16px "Public Sans", system-ui, sans-serif';
    ctx.fillText(item[1], x + 12, y + 38);
    ctx.fillStyle = "rgba(215, 199, 187, 0.78)";
    ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(item[2], x + 12, y + 54);
  });
}

/* ── Component ── */

export default function VieteLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<VieteLabState>(DEFAULT_STATE);

  const activeRoots = state.roots.slice(0, state.degree);
  const coeffs = polynomialFromRoots(state.leading, activeRoots);
  const sums = elementarySums(activeRoots);

  const polyLatex = polynomialLatex(coeffs);
  const facLatex = factorLatex(state.leading, activeRoots);

  const buildVietaLines = useCallback((): string[] => {
    if (state.degree === 3) {
      const [a, b, c, d] = coeffs;
      return [
        `a=${formatLatexNumber(a)},\\ b=${formatLatexNumber(b)},\\ c=${formatLatexNumber(c)},\\ d=${formatLatexNumber(d)}`,
        `x_1+x_2+x_3=${formatLatexNumber(sums[0])},\\qquad -\\frac{b}{a}=${formatLatexNumber(-b / a)}`,
        `x_1x_2+x_1x_3+x_2x_3=${formatLatexNumber(sums[1])},\\qquad \\frac{c}{a}=${formatLatexNumber(c / a)}`,
        `x_1x_2x_3=${formatLatexNumber(sums[2])},\\qquad -\\frac{d}{a}=${formatLatexNumber(-d / a)}`,
      ];
    }
    const [a, b, c, d, e] = coeffs;
    return [
      `a=${formatLatexNumber(a)},\\ b=${formatLatexNumber(b)},\\ c=${formatLatexNumber(c)},\\ d=${formatLatexNumber(d)},\\ e=${formatLatexNumber(e)}`,
      `x_1+x_2+x_3+x_4=${formatLatexNumber(sums[0])},\\qquad -\\frac{b}{a}=${formatLatexNumber(-b / a)}`,
      `\\sum_{i<j}x_ix_j=${formatLatexNumber(sums[1])},\\qquad \\frac{c}{a}=${formatLatexNumber(c / a)}`,
      `\\sum_{i<j<k}x_ix_jx_k=${formatLatexNumber(sums[2])},\\qquad -\\frac{d}{a}=${formatLatexNumber(-d / a)}`,
      `x_1x_2x_3x_4=${formatLatexNumber(sums[3])},\\qquad \\frac{e}{a}=${formatLatexNumber(e / a)}`,
    ];
  }, [coeffs, sums, state.degree]);

  const vietaLines = buildVietaLines();

  /* redraw canvas on every state change + resize */
  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCanvas(canvas, activeRoots, coeffs);
  }, [activeRoots, coeffs]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  const setRoot = (index: number, value: number) => {
    setState((prev) => {
      const next = { ...prev, roots: [...prev.roots] as [number, number, number, number] };
      next.roots[index] = value;
      return next;
    });
  };

  const applyPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) setState(preset);
  };

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Controls panel */}
        <div>
          <article className={s.interactiveCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>Podesavanja</h3>
            <div className={s.controlGrid}>
              <div className={s.field}>
                <label>Stepen polinoma</label>
                <select
                  value={state.degree}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      degree: Number(e.target.value) as 3 | 4,
                    }))
                  }
                >
                  <option value={3}>Kubni</option>
                  <option value={4}>Cetvrti stepen</option>
                </select>
              </div>
              <div className={s.field}>
                <label>
                  Vodeci koeficijent{" "}
                  <MathJax inline style={{ display: "inline" }}>
                    {"\\(a\\)"}
                  </MathJax>
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={state.leading}
                  onChange={(e) => {
                    let v = Number(e.target.value);
                    if (!Number.isFinite(v) || Math.abs(v) < 1e-9) v = 1;
                    setState((prev) => ({ ...prev, leading: v }));
                  }}
                />
              </div>
            </div>
          </article>

          <article
            className={s.interactiveCard}
            style={{ padding: 22, marginTop: 14 }}
          >
            <h3 className={cs.tCardTitle}>Korenovi</h3>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={s.rangeWrap}
                style={{ display: i >= state.degree ? "none" : undefined }}
              >
                <label>
                  Koren{" "}
                  <MathJax inline style={{ display: "inline" }}>
                    {`\\(x_${i + 1}\\)`}
                  </MathJax>
                </label>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={0.5}
                  value={state.roots[i]}
                  onChange={(e) => setRoot(i, Number(e.target.value))}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--lesson-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>Izabrana vrednost</span>
                  <strong style={{ color: "var(--lesson-accent)" }}>
                    {formatNumber(state.roots[i])}
                  </strong>
                </div>
              </div>
            ))}
          </article>

          <div className={s.presetRow} style={{ marginTop: 14 }}>
            <button
              className={s.presetBtn}
              onClick={() => applyPreset("ap")}
            >
              AP korenovi
            </button>
            <button
              className={s.presetBtn}
              onClick={() => applyPreset("symmetric")}
            >
              Simetricni
            </button>
            <button
              className={s.presetBtn}
              onClick={() => applyPreset("double")}
            >
              Dvostruki koren
            </button>
          </div>
        </div>

        {/* Visual panel */}
        <div>
          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              style={{ aspectRatio: "16 / 10" }}
              aria-label="Canvas prikaz izabranih korenova i simetricnih suma"
            />
          </div>

          <div className={s.resultsGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className={s.resultCard}>
              <strong>Polinom</strong>
              <MathJax dynamic>{`\\[P(x)=${polyLatex}\\]`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Faktorski zapis</strong>
              <MathJax dynamic>{`\\[P(x)=${facLatex}\\]`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Viete provera</strong>
              {vietaLines.map((line, i) => (
                <MathJax key={i} dynamic>{`\\[${line}\\]`}</MathJax>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes below the lab */}
      <div className={s.grid3} style={{ marginTop: 16 }}>
        <SectionCardInline title="Kako da citas alat">
          <p>
            Prvo gledaj raspored, pa formule. Ako korenovi postanu
            simetricni oko nule, odmah prati koje neparne koeficijente alat
            &ldquo;gasi&rdquo;.
          </p>
        </SectionCardInline>
        <SectionCardInline title="Pedagoska napomena">
          <p>
            Laboratorija koristi realne korenove. Osnovni stav algebre vazi
            u kompleksnom skupu, ali za intuiciju je korisnije da ovde vidis
            korenove na brojevnoj pravoj.
          </p>
        </SectionCardInline>
        <SectionCardInline title="Prijemni signal">
          <p>
            Trazi skrivenu strukturu. Posebno obrati paznju na simetriju,
            visestruke korenove i aritmeticku progresiju. To su najcesci
            &ldquo;ulazi&rdquo; u zadatak.
          </p>
        </SectionCardInline>
      </div>
    </>
  );
}

/* Simple inline helper so we don't import SectionCard in the lab file */
function SectionCardInline({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className={s.sectionCard} style={{ padding: 22 }}>
      <h3 className={cs.tCardTitle}>{title}</h3>
      {children}
    </article>
  );
}
