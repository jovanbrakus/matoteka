"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import { MATHJAX_CONFIG, MATHJAX_SRC } from "@/lib/mathjax-config";
import Link from "next/link";

/* ── Inline helpers ── */
function M({ children }: { children: string }) {
  return (
    <MathJax inline style={{ display: "inline", verticalAlign: "baseline" }}>
      {`\\(${children}\\)`}
    </MathJax>
  );
}

function MBlock({ children }: { children: string }) {
  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-5 py-4">
      <MathJax>{`\\[${children}\\]`}</MathJax>
    </div>
  );
}

/* ── Parabola Canvas ── */
function ParabolaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragXRef = useRef(4);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number>(0);

  const f = useCallback((x: number) => -x * x + 6 * x + 5, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    const isLight =
      document.documentElement.classList.contains("light");

    const W = canvas.width;
    const H = canvas.height;
    const padL = 60,
      padR = 40,
      padT = 40,
      padB = 50;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const xMin = 0,
      xMax = 7,
      yMin = -2,
      yMax = 18;

    const toCanvasX = (x: number) =>
      padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const toCanvasY = (y: number) =>
      padT + ((yMax - y) / (yMax - yMin)) * plotH;
    const toMathX = (cx: number) =>
      xMin + ((cx - padL) / plotW) * (xMax - xMin);

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = isLight ? "#f8f6f4" : "#0c1222";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = isLight ? "#e0d6d0" : "#1e293b";
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), padT);
      ctx.lineTo(toCanvasX(x), H - padB);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= yMax; y += 2) {
      ctx.beginPath();
      ctx.moveTo(padL, toCanvasY(y));
      ctx.lineTo(W - padR, toCanvasY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = isLight ? "#94a3b8" : "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL, toCanvasY(0));
    ctx.lineTo(W - padR, toCanvasY(0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), padT);
    ctx.lineTo(toCanvasX(0), H - padB);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = isLight ? "#64748b" : "#94a3b8";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (let x = 1; x <= 6; x++) {
      ctx.fillText(x.toString(), toCanvasX(x), toCanvasY(0) + 18);
    }
    ctx.textAlign = "right";
    for (let y = 2; y <= 16; y += 2) {
      ctx.fillText(y.toString(), padL - 8, toCanvasY(y) + 4);
    }

    // Full parabola (faint)
    ctx.strokeStyle = isLight
      ? "rgba(96, 165, 250, 0.3)"
      : "rgba(96, 165, 250, 0.2)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    for (let px = 0; px <= plotW; px++) {
      const mx = toMathX(padL + px);
      const my = f(mx);
      if (px === 0) ctx.moveTo(padL + px, toCanvasY(my));
      else ctx.lineTo(padL + px, toCanvasY(my));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Segment [2,5] highlighted
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = 0; px <= plotW; px++) {
      const mx = toMathX(padL + px);
      if (mx < 2 || mx > 5) continue;
      const my = f(mx);
      if (mx <= 2.01) ctx.moveTo(toCanvasX(mx), toCanvasY(my));
      else ctx.lineTo(toCanvasX(mx), toCanvasY(my));
    }
    ctx.stroke();

    // Shade region under curve on [2,5]
    ctx.fillStyle = isLight
      ? "rgba(96, 165, 250, 0.08)"
      : "rgba(96, 165, 250, 0.06)";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(2), toCanvasY(0));
    for (let mx = 2; mx <= 5; mx += 0.05) {
      ctx.lineTo(toCanvasX(mx), toCanvasY(f(mx)));
    }
    ctx.lineTo(toCanvasX(5), toCanvasY(0));
    ctx.closePath();
    ctx.fill();

    // Segment boundaries (vertical dashed lines)
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = isLight
      ? "rgba(96, 165, 250, 0.4)"
      : "rgba(96, 165, 250, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(2), toCanvasY(0));
    ctx.lineTo(toCanvasX(2), toCanvasY(f(2)));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toCanvasX(5), toCanvasY(0));
    ctx.lineTo(toCanvasX(5), toCanvasY(f(5)));
    ctx.stroke();
    ctx.setLineDash([]);

    // Horizontal dashed lines for max and min
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(74, 222, 128, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(14));
    ctx.lineTo(toCanvasX(3), toCanvasY(14));
    ctx.stroke();
    ctx.strokeStyle = "rgba(244, 114, 182, 0.4)";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), toCanvasY(10));
    ctx.lineTo(toCanvasX(5), toCanvasY(10));
    ctx.stroke();
    ctx.setLineDash([]);

    // Key points helper
    function drawPoint(
      x: number,
      y: number,
      color: string,
      label: string,
      yOff: number
    ) {
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      grad.addColorStop(0, color + "66");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isLight ? "#ffffff" : "#0f172a";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = "bold 13px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, cx, cy + yOff);
    }

    drawPoint(3, 14, "#4ade80", "T(3, 14) \u2014 Max", -18);
    drawPoint(2, 13, "#60a5fa", "f(2) = 13", -18);
    drawPoint(5, 10, "#f472b6", "f(5) = 10 \u2014 Min", -18);

    // Draggable point
    const clampedX = Math.max(2, Math.min(5, dragXRef.current));
    const dragY = f(clampedX);
    const dcx = toCanvasX(clampedX);
    const dcy = toCanvasY(dragY);

    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(dcx, dcy);
    ctx.lineTo(dcx, toCanvasY(0));
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#a78bfa";
    ctx.beginPath();
    ctx.arc(dcx, dcy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isLight ? "#1a1210" : "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = isLight ? "#1a1210" : "#e2e8f0";
    ctx.font = "bold 13px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    const labelText = `f(${clampedX.toFixed(1).replace(".", ",")}) = ${dragY
      .toFixed(2)
      .replace(".", ",")}`;
    ctx.fillText(labelText, dcx, dcy + 24);

    // Legend
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.textAlign = "left";
    const legX = W - padR - 190;
    const legY = padT + 16;

    ctx.fillStyle = isLight ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)";
    ctx.fillRect(legX - 10, legY - 14, 200, 78);
    ctx.strokeStyle = isLight ? "#e0d6d0" : "#334155";
    ctx.lineWidth = 1;
    ctx.strokeRect(legX - 10, legY - 14, 200, 78);

    const textColor = isLight ? "#1a1210" : "#e2e8f0";

    ctx.fillStyle = "#4ade80";
    ctx.beginPath();
    ctx.arc(legX + 4, legY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText("Maksimum (teme)", legX + 16, legY + 4);

    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(legX + 4, legY + 22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText("Minimum (kraj segmenta)", legX + 16, legY + 26);

    ctx.fillStyle = "#a78bfa";
    ctx.beginPath();
    ctx.arc(legX + 4, legY + 44, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText("Prevlačiva tačka", legX + 16, legY + 48);
  }, [f]);

  useEffect(() => {
    draw();

    // Redraw on theme change
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [draw]);

  // Pointer handlers
  const getPointerX = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return 0;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const clientX =
        "touches" in e ? e.touches[0].clientX : e.clientX;
      return (clientX - rect.left) * scaleX;
    },
    []
  );

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const px = getPointerX(e);
      const W = canvas.width;
      const padL = 60,
        padR = 40;
      const plotW = W - padL - padR;
      const xMin = 0,
        xMax = 7;
      const toCanvasX = (x: number) =>
        padL + ((x - xMin) / (xMax - xMin)) * plotW;
      const clampedX = Math.max(2, Math.min(5, dragXRef.current));
      const dcx = toCanvasX(clampedX);
      if (Math.abs(px - dcx) < 25) {
        isDraggingRef.current = true;
        e.preventDefault();
      }
    },
    [getPointerX]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const px = getPointerX(e);
      const W = canvas.width;
      const padL = 60,
        padR = 40;
      const plotW = W - padL - padR;
      const xMin = 0,
        xMax = 7;
      let mx = xMin + ((px - padL) / plotW) * (xMax - xMin);
      mx = Math.max(2, Math.min(5, mx));
      dragXRef.current = mx;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    },
    [getPointerX, draw]
  );

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  return (
    <div className="glass-card rounded-2xl p-5 text-center">
      <h2 className="mb-3 text-xl font-bold text-accent">
        Grafik funkcije na segmentu <M>{"[2,\\, 5]"}</M>
      </h2>
      <canvas
        ref={canvasRef}
        width={700}
        height={480}
        className="mx-auto block max-w-full rounded-xl"
        style={{ touchAction: "none" }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
      <p className="mt-2.5 text-sm text-muted">
        Prevucite ljubičastu tačku po paraboli da vidite vrednosti funkcije
      </p>
    </div>
  );
}

/* ── Step component ── */
function Step({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`flex cursor-pointer gap-4 rounded-xl border-l-[3px] p-4 transition-all ${
        active
          ? "border-l-success bg-[var(--tint)]"
          : "border-l-transparent hover:border-l-success hover:bg-[var(--tint)]"
      }`}
      onClick={() => setActive(!active)}
    >
      <div className="mt-0.5 flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-white">
        {num}
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-[1.15rem] font-semibold text-heading">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

/* ── Checkpoint ── */
function Checkpoint({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <details className="my-4 rounded-xl border border-accent2/20 bg-accent2/[0.08] p-4">
      <summary className="cursor-pointer text-[0.95rem] font-semibold text-accent2 select-none">
        {question}
      </summary>
      <div className="pt-3 font-semibold text-success">{answer}</div>
    </details>
  );
}

/* ── Main page ── */
export default function PrimerPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="mx-auto max-w-5xl px-6 py-16 pb-24" />;
  }

  return (
    <MathJaxContext config={MATHJAX_CONFIG} src={MATHJAX_SRC}>
      <div className="mx-auto max-w-5xl px-6 py-16 pb-24">
        {/* Badge */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-3.5 py-1.5 text-sm font-medium text-text-secondary">
            <span className="material-symbols-outlined text-base text-primary">
              school
            </span>
            Mašinski fakultet
          </span>
          <span className="text-muted">&middot;</span>
          <span className="text-sm font-medium text-text-secondary">2021</span>
          <span className="text-muted">&middot;</span>
          <span className="text-sm font-medium text-text-secondary">
            Zadatak #2
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-black tracking-tight text-heading lg:text-4xl">
          Zbir ekstrema kvadratne funkcije{" "}
          <span className="text-primary">na segmentu</span>
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-text-secondary">
          Analiza kvadratne funkcije &mdash; nalaženje najveće i najmanje
          vrednosti na zatvorenom intervalu
        </p>

        {/* Problem statement */}
        <section className="glass-card mb-6 rounded-2xl p-6">
          <h2 className="mb-4 text-xl font-bold text-accent">
            Postavka zadatka
          </h2>
          <p className="mb-4 leading-relaxed text-text">
            Zbir najveće i najmanje vrednosti funkcije{" "}
            <M>{"f(x) = -x^2 + 6x + 5"}</M> na segmentu{" "}
            <M>{"[2,\\, 5]"}</M> jednak je:
          </p>

          {/* Given values */}
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-5 py-3 text-center">
              <div className="mb-1 text-xs text-muted">Funkcija</div>
              <div className="text-base font-semibold text-text">
                <M>{"f(x) = -x^2 + 6x + 5"}</M>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-5 py-3 text-center">
              <div className="mb-1 text-xs text-muted">Segment</div>
              <div className="text-base font-semibold text-text">
                <M>{"[2,\\, 5]"}</M>
              </div>
            </div>
          </div>

          {/* Answer options */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "A", value: "0" },
              { label: "B", value: "22" },
              { label: "C", value: "23" },
              { label: "D", value: "24" },
              { label: "E", value: "25" },
            ].map((opt) => (
              <div
                key={opt.label}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-4 py-2.5 text-center"
              >
                <div className="mb-0.5 text-xs text-muted">({opt.label})</div>
                <div className="text-base font-semibold text-text">
                  <M>{opt.value}</M>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plan */}
        <section className="glass-card mb-6 rounded-2xl p-6">
          <h2 className="mb-3 text-xl font-bold text-accent">
            Plan rešavanja
          </h2>
          <p className="leading-relaxed text-text">
            Svešćemo funkciju na kanonski oblik{" "}
            <M>{"f(x) = -(x-3)^2 + 14"}</M> da nađemo teme parabole. Zatim
            ćemo proveriti vrednosti u temenu i na krajevima segmenta{" "}
            <M>{"[2, 5]"}</M>, odrediti maksimum i minimum, i sabrati ih.
          </p>
        </section>

        {/* Theory refresher */}
        <section className="glass-card mb-6 rounded-2xl p-6">
          <details>
            <summary className="cursor-pointer text-lg font-semibold text-accent2 select-none hover:text-accent2/80">
              Ključne formule i teoreme
            </summary>
            <div className="pt-4">
              <ul className="space-y-3 text-text">
                <li className="relative pl-5 before:absolute before:left-0 before:font-bold before:text-accent before:content-['>']">
                  <strong>Kanonski oblik kvadratne funkcije:</strong>{" "}
                  <M>
                    {"f(x) = a(x - p)^2 + q"}
                  </M>
                  , gde je <M>{"T(p, q)"}</M> teme parabole, a{" "}
                  <M>{"p = -\\dfrac{b}{2a}"}</M>, <M>{"q = f(p)"}</M>.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:font-bold before:text-accent before:content-['>']">
                  <strong>Smer parabole:</strong> Ako je <M>{"a < 0"}</M>,
                  parabola je okrenuta nadole &mdash; ima{" "}
                  <em>maksimum</em> u temenu. Ako je <M>{"a > 0"}</M>,
                  parabola je okrenuta nagore &mdash; ima{" "}
                  <em>minimum</em> u temenu.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:font-bold before:text-accent before:content-['>']">
                  <strong>Ekstremi na zatvorenom segmentu:</strong> Za
                  neprekidnu funkciju na <M>{"[a, b]"}</M>, ekstremne
                  vrednosti se nalaze ili u stacionarnim tačkama unutar
                  intervala ili na krajevima segmenta.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:font-bold before:text-accent before:content-['>']">
                  <strong>Kompletiranje kvadrata:</strong>{" "}
                  <M>
                    {
                      "ax^2 + bx + c = a\\!\\left(x + \\dfrac{b}{2a}\\right)^2 + c - \\dfrac{b^2}{4a}"
                    }
                  </M>
                </li>
              </ul>
            </div>
          </details>
        </section>

        {/* Canvas graph */}
        <section className="mb-6">
          <ParabolaCanvas />
        </section>

        {/* Step-by-step solution */}
        <div className="mb-6 space-y-4">
            {/* Step 1 */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="mb-4 text-xl font-bold text-accent">
                Rešenje korak po korak
              </h2>

              <Step num={1} title="Odredimo koeficijente">
                <p className="mb-2 text-text-secondary">
                  Funkcija <M>{"f(x) = -x^2 + 6x + 5"}</M> je kvadratna
                  funkcija oblika <M>{"ax^2 + bx + c"}</M>.
                </p>
                <MBlock>{"a = -1, \\quad b = 6, \\quad c = 5"}</MBlock>
                <p className="text-text-secondary">
                  Pošto je <M>{"a = -1 < 0"}</M>, parabola je okrenuta{" "}
                  <strong>nadole</strong>, što znači da funkcija ima{" "}
                  <strong>maksimum</strong> u temenu.
                </p>
              </Step>

              {/* Step 2 */}
              <Step num={2} title="Nađimo teme parabole">
                <p className="mb-2 text-text-secondary">
                  Koordinata <M>{"x"}</M> temena:
                </p>
                <MBlock>
                  {
                    "x_T = -\\frac{b}{2a} = -\\frac{6}{2 \\cdot (-1)} = -\\frac{6}{-2} = 3"
                  }
                </MBlock>
                <p className="mb-2 text-text-secondary">
                  Koordinata <M>{"y"}</M> temena (izračunamo{" "}
                  <M>{"f(3)"}</M>):
                </p>
                <MBlock>
                  {"f(3) = -(3)^2 + 6 \\cdot 3 + 5 = -9 + 18 + 5 = 14"}
                </MBlock>
                <p className="mb-2 text-text-secondary">
                  Teme parabole je <M>{"T(3,\\, 14)"}</M>.
                </p>
                <p className="mt-1 text-sm italic text-muted">
                  Alternativno, kompletiranjem kvadrata:{" "}
                  <M>
                    {
                      "f(x) = -(x^2 - 6x) + 5 = -(x-3)^2 + 9 + 5 = -(x-3)^2 + 14"
                    }
                  </M>
                  .
                </p>
              </Step>

              <Checkpoint
                question={
                  "Proveri sebe: Da li teme pripada segmentu [2, 5]?"
                }
                answer={
                  <>
                    Da! <M>{"x_T = 3 \\in [2, 5]"}</M>, tako da se maksimum
                    funkcije dostiže upravo u temenu.
                  </>
                }
              />

              {/* Step 3 */}
              <Step
                num={3}
                title="Izračunajmo vrednosti na krajevima segmenta"
              >
                <p className="mb-2 text-text-secondary">
                  Levi kraj, <M>{"x = 2"}</M>:
                </p>
                <MBlock>
                  {"f(2) = -(2)^2 + 6 \\cdot 2 + 5 = -4 + 12 + 5 = 13"}
                </MBlock>
                <p className="mb-2 text-text-secondary">
                  Desni kraj, <M>{"x = 5"}</M>:
                </p>
                <MBlock>
                  {
                    "f(5) = -(5)^2 + 6 \\cdot 5 + 5 = -25 + 30 + 5 = 10"
                  }
                </MBlock>
              </Step>

              {/* Step 4 */}
              <Step num={4} title="Odredimo najveću i najmanju vrednost">
                <p className="mb-2 text-text-secondary">
                  Uporedimo sve izračunate vrednosti:
                </p>
                <MBlock>
                  {"f(2) = 13, \\quad f(3) = 14, \\quad f(5) = 10"}
                </MBlock>
                <p className="mb-1 text-text-secondary">
                  Najveća vrednost:{" "}
                  <M>{"f_{\\max} = f(3) = 14"}</M> (u temenu
                  parabole).
                </p>
                <p className="mb-1 text-text-secondary">
                  Najmanja vrednost:{" "}
                  <M>{"f_{\\min} = f(5) = 10"}</M> (na desnom kraju
                  segmenta).
                </p>
                <p className="mt-1 text-sm italic text-muted">
                  Na levom kraju <M>{"f(2) = 13"}</M> nije ni max ni min, ali
                  je između krajnjih vrednosti.
                </p>
              </Step>

              <Checkpoint
                question="Proveri sebe: Zašto minimum nije u x = 2?"
                answer={
                  <>
                    Zato što je <M>{"f(2) = 13 > 10 = f(5)"}</M>. Tačka{" "}
                    <M>{"x = 5"}</M> je udaljenija od temena (
                    <M>{"|5-3| = 2 > |2-3| = 1"}</M>), pa je vrednost
                    funkcije manja u <M>{"x = 5"}</M>.
                  </>
                }
              />

              {/* Step 5 */}
              <Step num={5} title="Izračunajmo traženi zbir">
                <MBlock>
                  {"f_{\\max} + f_{\\min} = 14 + 10 = 24"}
                </MBlock>
              </Step>
            </section>

            {/* Key insight */}
            <section className="rounded-2xl border border-accent2/30 bg-gradient-to-br from-accent/10 to-accent2/10 p-6 text-center">
              <h2 className="mb-3 text-xl font-bold text-accent2">
                Ključni uvid
              </h2>
              <p className="mb-3 leading-relaxed text-text-secondary">
                Kod parabole okrenute nadole, maksimum je uvek u temenu (ako
                teme pripada intervalu), a minimum se traži na krajevima
                &mdash; i to na onom kraju koji je{" "}
                <strong className="text-heading">udaljeniji</strong> od temena.
              </p>
              <div className="text-xl font-bold text-success">
                <MBlock>
                  {"f_{\\max} + f_{\\min} = 14 + 10 = 24"}
                </MBlock>
              </div>
            </section>

            {/* Final answer */}
            <section className="rounded-2xl border-2 border-success/30 bg-gradient-to-br from-success/[0.08] to-success/[0.12] p-7 text-center">
              <h2 className="mb-4 text-2xl font-bold text-success">
                Konačan odgovor
              </h2>
              <div className="my-4 text-4xl font-black text-success">
                <M>{"24"}</M>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "A", value: "0", correct: false },
                  { label: "B", value: "22", correct: false },
                  { label: "C", value: "23", correct: false },
                  { label: "D", value: "24", correct: true },
                  { label: "E", value: "25", correct: false },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className={`rounded-xl border px-5 py-2.5 text-base ${
                      opt.correct
                        ? "border-success bg-success/15 font-bold text-success"
                        : "border-[var(--glass-border)] bg-[var(--tint)] text-muted"
                    }`}
                  >
                    ({opt.label}) <M>{opt.value}</M>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-success/15 bg-success/[0.06] p-4 text-left text-sm text-text-secondary">
                <strong>Verifikacija:</strong> Rezultat ima smisla jer je zbir
                jedne vrednosti blizu 14 (maksimum) i jedne blizu 10
                (minimum), što daje 24. Dodatno,{" "}
                <M>{"f(2) + f(5) = 13 + 10 = 23 \\neq 24"}</M>, ali{" "}
                <M>{"f(3) + f(5) = 14 + 10 = 24"}</M>, što potvrđuje da
                je maksimum baš u temenu, ne na kraju segmenta.
              </div>
            </section>

            {/* Common pitfalls */}
            <section className="rounded-2xl border border-warning/20 bg-warning/[0.06] p-6">
              <h2 className="mb-3 text-xl font-bold text-warning">
                Česte greške
              </h2>
              <ul className="space-y-2">
                <li className="relative pl-5 text-text-secondary before:absolute before:left-0 before:font-bold before:text-warning before:content-['!']">
                  <strong>Sabiranje vrednosti na krajevima umesto
                  ekstrema:</strong>{" "}
                  Mnogi studenti saberu{" "}
                  <M>{"f(2) + f(5) = 13 + 10 = 23"}</M>, zaboravljajući da
                  provere vrednost u temenu parabole. Zato je ponuđen i
                  odgovor (C) 23 kao zamka.
                </li>
                <li className="relative pl-5 text-text-secondary before:absolute before:left-0 before:font-bold before:text-warning before:content-['!']">
                  <strong>Zaboravljanje da se proveri da li teme pripada
                  segmentu:</strong>{" "}
                  Da je teme bilo van segmenta <M>{"[2, 5]"}</M>, oba
                  ekstrema bi se nalazila na krajevima. Uvek proverite položaj
                  temena u odnosu na segment!
                </li>
              </ul>
            </section>

            {/* Challenge */}
            <section className="rounded-2xl border border-dashed border-accent/30 bg-accent/[0.05] p-6">
              <h2 className="mb-3 text-xl font-bold text-accent">
                Dodatni izazov
              </h2>
              <p className="mb-3 text-text-secondary">
                Za koju vrednost parametra <M>{"k"}</M> je zbir najveće i
                najmanje vrednosti funkcije{" "}
                <M>{"f(x) = -x^2 + 6x + 5"}</M> na segmentu{" "}
                <M>{"[k,\\, 5]"}</M> jednak <M>{"25"}</M>?
              </p>
              <details>
                <summary className="cursor-pointer font-semibold text-accent2 select-none hover:text-accent2/80">
                  Pogledaj nagoveštaj
                </summary>
                <div className="pt-3 text-text-secondary">
                  Maksimum je i dalje 14 (dok god je <M>{"k \\leq 3"}</M>).
                  Dakle, minimum treba da bude 11. Na koji način vrednost{" "}
                  <M>{"f(k)"}</M> može biti 11? Rešite jednačinu{" "}
                  <M>{"-k^2 + 6k + 5 = 11"}</M>.
                </div>
              </details>
            </section>
        </div>

        {/* CTA banner */}
        <section className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-primary">
            auto_stories
          </span>
          <h2 className="mb-3 text-2xl font-black text-heading">
            Registruj se besplatno
          </h2>
          <p className="mx-auto mb-6 max-w-lg leading-relaxed text-text-secondary">
            Pristupi kompletnoj bazi od{" "}
            <strong className="text-heading">4000+ zadataka</strong> sa
            prijemnih ispita, rešenih korak po korak &mdash; sa interaktivnim
            graficima, AI tutorom i simulacijama ispita.
          </p>
          <Link
            href="/prijava"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-glow hover:shadow-primary/40"
          >
            <span className="material-symbols-outlined text-xl">
              login
            </span>
            Započni besplatno
          </Link>
          <p className="mt-4 text-sm text-muted">
            Bez kreditne kartice. Bez skrivenih troškova.
          </p>
        </section>
      </div>
    </MathJaxContext>
  );
}
