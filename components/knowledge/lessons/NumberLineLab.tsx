"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Preset Numbers ── */

interface NumberPreset {
  key: string;
  label: string;
  mathLabel: string;
  plainLabel: string;
  value: number;
  isNatural: boolean;
  isInteger: boolean;
  isRational: boolean;
  description: string;
}

const PRESETS: NumberPreset[] = [
  {
    key: "neg4",
    label: "-4",
    mathLabel: "-4",
    plainLabel: "-4",
    value: -4,
    isNatural: false,
    isInteger: true,
    isRational: true,
    description:
      "Negativan ceo broj: nije prirodan, ali jeste ceo, racionalan i realan broj.",
  },
  {
    key: "minusThreeHalves",
    label: "-3/2",
    mathLabel: "-\\frac{3}{2}",
    plainLabel: "-3/2",
    value: -1.5,
    isNatural: false,
    isInteger: false,
    isRational: true,
    description:
      "Pravilan primer racionalnog broja koji nije ceo. Razlomak odmah otkriva pripadnost skupu \\(\\mathbb{Q}\\).",
  },
  {
    key: "zero",
    label: "0",
    mathLabel: "0",
    plainLabel: "0",
    value: 0,
    isNatural: false,
    isInteger: true,
    isRational: true,
    description:
      "Nula je ceo, racionalan i realan broj. U ovoj lekciji je ne ubrajamo u \\(\\mathbb{N}\\).",
  },
  {
    key: "sevenThirds",
    label: "7/3",
    mathLabel: "\\frac{7}{3}",
    plainLabel: "7/3",
    value: 7 / 3,
    isNatural: false,
    isInteger: false,
    isRational: true,
    description:
      "Broj \\(\\frac{7}{3}\\) je racionalan, ali nije ceo jer nema celobrojnu vrednost.",
  },
  {
    key: "sqrt2",
    label: "\u221A2",
    mathLabel: "\\sqrt{2}",
    plainLabel: "sqrt(2)",
    value: Math.sqrt(2),
    isNatural: false,
    isInteger: false,
    isRational: false,
    description:
      "Klasičan primer iracionalnog broja: decimalni zapis je beskonačan i neperiodičan.",
  },
  {
    key: "twoPoint75",
    label: "2.75",
    mathLabel: "2.75",
    plainLabel: "2.75",
    value: 2.75,
    isNatural: false,
    isInteger: false,
    isRational: true,
    description:
      "Konačan decimalni zapis je racionalan broj, jer važi \\(2.75=\\frac{11}{4}\\).",
  },
  {
    key: "pi",
    label: "\u03C0",
    mathLabel: "\\pi",
    plainLabel: "pi",
    value: Math.PI,
    isNatural: false,
    isInteger: false,
    isRational: false,
    description:
      "Broj \\(\\pi\\) je iracionalan. Njegov decimalni zapis ne završava se i nije periodičan.",
  },
];

/* ── Helpers ── */

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

function simplifyFraction(num: number, den: number) {
  const d = gcd(num, den);
  const sign = den < 0 ? -1 : 1;
  return { num: (sign * num) / d, den: Math.abs(den) / d };
}

function fractionToMath(num: number, den: number): string {
  const s = simplifyFraction(num, den);
  if (s.den === 1) return String(s.num);
  if (s.num < 0)
    return `-\\frac{${Math.abs(s.num)}}{${s.den}}`;
  return `\\frac{${s.num}}{${s.den}}`;
}

function fractionToPlain(num: number, den: number): string {
  const s = simplifyFraction(num, den);
  if (s.den === 1) return String(s.num);
  return `${s.num}/${s.den}`;
}

function formatDecimal(value: number): string {
  const r = Math.round(value * 1000) / 1000;
  return Number.isInteger(r) ? String(r) : r.toFixed(3).replace(/\.?0+$/, "");
}

function smallestSet(item: {
  isNatural: boolean;
  isInteger: boolean;
  isRational: boolean;
}): string {
  if (item.isNatural) return "\\mathbb{N}";
  if (item.isInteger) return "\\mathbb{Z}";
  if (item.isRational) return "\\mathbb{Q}";
  return "\\mathbb{R}\\setminus\\mathbb{Q}";
}

function signText(value: number): string {
  if (value > 0) return "pozitivan";
  if (value < 0) return "negativan";
  return "nula";
}

/* ── Status Card ── */

function StatusCard({
  title,
  label,
  tone,
  note,
}: {
  title: string;
  label: string;
  tone: string;
  note: string;
}) {
  const toneColor: Record<string, string> = {
    ok: "rgba(107, 223, 183, 0.16)",
    warn: "rgba(255, 180, 136, 0.14)",
    bad: "rgba(255, 143, 143, 0.14)",
    sky: "rgba(127, 214, 255, 0.14)",
  };
  const pillColor: Record<string, string> = {
    ok: "#d8fff1",
    warn: "#fff1e4",
    bad: "#ffe4e4",
    sky: "#e8f9ff",
  };
  const pillBg: Record<string, string> = {
    ok: "rgba(103, 215, 173, 0.16)",
    warn: "rgba(255, 180, 136, 0.16)",
    bad: "rgba(255, 143, 143, 0.16)",
    sky: "rgba(127, 214, 255, 0.16)",
  };

  return (
    <article
      style={{
        padding: "16px",
        borderRadius: "18px",
        background: toneColor[tone] || toneColor.warn,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: "0.82rem",
          fontWeight: 700,
          marginBottom: 8,
          color: pillColor[tone] || "#fff1e4",
          background: pillBg[tone] || pillBg.warn,
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {label}
      </span>
      <strong style={{ display: "block", fontSize: "0.92rem", marginBottom: 6 }}>
        {title}
      </strong>
      <MathJax dynamic style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
        {note}
      </MathJax>
    </article>
  );
}

/* ── Main Component ── */

export default function NumberLineLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePreset, setActivePreset] = useState("neg4");
  const [sliderStep, setSliderStep] = useState(0);
  const [mode, setMode] = useState<"preset" | "slider">("preset");
  const [showOpposite, setShowOpposite] = useState(true);

  const getSliderData = useCallback(
    (step: number) => {
      const value = step / 4;
      const isInteger = step % 4 === 0;
      const isNatural = isInteger && value > 0;
      return {
        key: "slider",
        label: fractionToPlain(step, 4),
        mathLabel: fractionToMath(step, 4),
        plainLabel: fractionToPlain(step, 4),
        value,
        isNatural,
        isInteger,
        isRational: true,
        description:
          "Broj dolazi sa klizača, pa je ovde uvek racionalan. Posmatraj kako se menja položaj broja i njegova apsolutna vrednost.",
      };
    },
    [],
  );

  const currentNumber =
    mode === "slider"
      ? getSliderData(sliderStep)
      : PRESETS.find((p) => p.key === activePreset) || PRESETS[0];

  /* ── Canvas Rendering ── */

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const item = currentNumber;
    const cssWidth = canvas.clientWidth || 900;
    const cssHeight = Math.max(280, Math.round(cssWidth * 0.38));
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(cssWidth * ratio);
    canvas.height = Math.round(cssHeight * ratio);
    canvas.style.height = `${cssHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const width = cssWidth;
    const height = cssHeight;
    const left = 56;
    const right = width - 56;
    const axisY = Math.round(height * 0.6);

    ctx.clearRect(0, 0, width, height);

    /* background */
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.strokeStyle = "rgba(255,154,106,0.14)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(18, 18, width - 36, height - 36, 22);
    ctx.fill();
    ctx.stroke();

    /* title */
    ctx.fillStyle = "#ffb488";
    ctx.font = "700 16px Inter, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Brojevna prava", 36, 46);

    /* axis */
    ctx.strokeStyle = "rgba(246,238,233,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, axisY);
    ctx.lineTo(right, axisY);
    ctx.stroke();

    const min = -6;
    const max = 6;
    const scale = (v: number) =>
      left + ((v - min) / (max - min)) * (right - left);

    /* ticks */
    for (let i = min; i <= max; i++) {
      const x = scale(i);
      ctx.strokeStyle =
        i === 0 ? "rgba(255,154,106,0.9)" : "rgba(246,238,233,0.24)";
      ctx.lineWidth = i === 0 ? 2.5 : 1.3;
      ctx.beginPath();
      ctx.moveTo(x, axisY - 12);
      ctx.lineTo(x, axisY + 12);
      ctx.stroke();

      ctx.fillStyle =
        i === 0 ? "#ffd7b9" : "rgba(246,238,233,0.74)";
      ctx.font = "600 13px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(i), x, axisY + 32);
    }

    const currentX = scale(item.value);
    const zeroX = scale(0);
    const oppositeX = scale(-item.value);

    /* abs value segment */
    ctx.strokeStyle = "rgba(236,91,19,0.85)";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(Math.min(currentX, zeroX), axisY - 48);
    ctx.lineTo(Math.max(currentX, zeroX), axisY - 48);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,154,106,0.9)";
    ctx.font = "700 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `|x| = ${formatDecimal(Math.abs(item.value))}`,
      (currentX + zeroX) / 2,
      axisY - 62,
    );

    /* Draw points */
    function drawPoint(
      x: number,
      y: number,
      label: string,
      color: string,
      filled: boolean,
    ) {
      ctx!.save();
      ctx!.strokeStyle = color;
      ctx!.fillStyle = filled ? color : "rgba(9,4,3,0.9)";
      ctx!.lineWidth = 2.4;
      ctx!.beginPath();
      ctx!.arc(x, y, 9, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.stroke();

      ctx!.fillStyle = "#f6eee9";
      ctx!.font = "600 14px Inter, system-ui, sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText(label, x, y - 18);
      ctx!.restore();
    }

    drawPoint(currentX, axisY, item.plainLabel, "#ec5b13", true);

    if (showOpposite) {
      let oppLabel: string;
      if (mode === "slider") {
        oppLabel = fractionToPlain(-sliderStep, 4);
      } else {
        oppLabel = item.plainLabel.startsWith("-")
          ? item.plainLabel.slice(1)
          : `-${item.plainLabel}`;
      }
      drawPoint(oppositeX, axisY, oppLabel, "#7fd6ff", false);
    }

    drawPoint(zeroX, axisY, "0", "#ffd7b9", true);

    /* bottom text */
    ctx.fillStyle = "rgba(246,238,233,0.76)";
    ctx.font = "500 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(
      `Decimalna aproksimacija: ${formatDecimal(item.value)}`,
      36,
      height - 42,
    );
    const oppPlain =
      mode === "slider"
        ? fractionToPlain(-sliderStep, 4)
        : item.plainLabel.startsWith("-")
          ? item.plainLabel.slice(1)
          : `-${item.plainLabel}`;
    ctx.fillText(`Suprotan broj: ${oppPlain}`, 36, height - 20);
  }, [currentNumber, showOpposite, mode, sliderStep]);

  useEffect(() => {
    renderCanvas();
    const onResize = () => renderCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [renderCanvas]);

  /* ── Derive display values ── */

  const item = currentNumber;
  const irrational = !item.isRational;

  const absText = (() => {
    if (mode === "slider") {
      return fractionToMath(Math.abs(sliderStep), 4);
    }
    return item.mathLabel.startsWith("-")
      ? item.mathLabel.slice(1)
      : item.mathLabel;
  })();

  const oppText = (() => {
    if (mode === "slider") return fractionToMath(-sliderStep, 4);
    if (item.mathLabel === "0") return "0";
    if (item.mathLabel.startsWith("-")) return item.mathLabel.slice(1);
    return `-${item.mathLabel}`;
  })();

  const sliderDisplay = fractionToMath(sliderStep, 4);

  return (
    <>
      {/* Preset buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {PRESETS.map((p) => (
          <button
            key={p.key}
            className={s.presetBtn}
            style={{
              background:
                mode === "preset" && activePreset === p.key
                  ? "rgba(236, 91, 19, 0.26)"
                  : undefined,
              borderColor:
                mode === "preset" && activePreset === p.key
                  ? "rgba(255, 154, 106, 0.4)"
                  : undefined,
            }}
            onClick={() => {
              setMode("preset");
              setActivePreset(p.key);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div
        style={{
          padding: "18px 20px",
          borderRadius: 20,
          background:
            "linear-gradient(180deg, rgba(236,91,19,0.12), rgba(236,91,19,0.06))",
          border: "1px solid rgba(255,154,106,0.16)",
          marginBottom: 18,
        }}
      >
        <strong style={{ color: "var(--lesson-accent)" }}>
          Klizač za racionalne brojeve
        </strong>
        <p style={{ color: "var(--lesson-muted)", marginTop: 6 }}>
          Pomeraj klizač u koracima od{" "}
          <MathJax inline dynamic>{`\\(0.25\\)`}</MathJax>. Ovo je dobar način da
          vidiš kako se menja položaj broja i njegova apsolutna vrednost.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 14,
            alignItems: "center",
            marginTop: 14,
          }}
        >
          <input
            type="range"
            min={-24}
            max={24}
            step={1}
            value={sliderStep}
            style={{ width: "100%", accentColor: "var(--lesson-primary)" }}
            onChange={(e) => {
              setMode("slider");
              setSliderStep(Number(e.target.value));
            }}
          />
          <div
            style={{
              minWidth: 120,
              textAlign: "right",
              color: "var(--lesson-muted-strong)",
              fontWeight: 700,
            }}
          >
            <MathJax inline dynamic>{`\\( ${sliderDisplay} \\)`}</MathJax>
          </div>
        </div>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "var(--lesson-muted-strong)",
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          <input
            type="checkbox"
            checked={showOpposite}
            onChange={(e) => setShowOpposite(e.target.checked)}
            style={{ accentColor: "var(--lesson-primary)" }}
          />
          Prikaži suprotan broj na brojevnoj pravoj
        </label>
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 18,
            background: "rgba(8,4,3,0.92)",
            border: "1px solid rgba(255,154,106,0.14)",
          }}
        />
        <p style={{ color: "var(--lesson-muted)", marginTop: 12, fontSize: "0.95rem" }}>
          Narandžasta tačka je izabrani broj, plava tačka njegov suprotan broj, a
          istaknuti segment pokazuje udaljenost od nule, odnosno apsolutnu vrednost.
        </p>
      </div>

      {/* Info grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.18fr) minmax(280px, 0.82fr)",
          gap: 16,
          marginTop: 18,
        }}
      >
        {/* Active number */}
        <article className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Aktivni broj</h3>
          <MathJax dynamic>
            {`Posmatramo broj \\( x = ${item.mathLabel} \\)`}
          </MathJax>
          <div className={s.mathBlock} style={{ marginTop: 14 }}>
            <MathJax dynamic>
              {`\\[ x = ${item.mathLabel}, \\qquad |x| = ${absText}, \\qquad -x = ${oppText} \\]`}
            </MathJax>
          </div>
          <MathJax dynamic style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
            {`${item.description} Decimalna aproksimacija je približno \\(${formatDecimal(item.value)}\\).`}
          </MathJax>
          <div className={s.mathBlock} style={{ marginTop: 14 }}>
            <MathJax dynamic>
              {`\\[ \\text{Najmanji skup koji sigurno sadrži broj} = ${smallestSet(item)} \\]`}
            </MathJax>
          </div>
        </article>

        {/* Classification */}
        <article className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Automatska klasifikacija</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            <StatusCard
              title="Prirodan broj"
              label={item.isNatural ? "Da" : "Ne"}
              tone={item.isNatural ? "ok" : "warn"}
              note={
                item.isNatural
                  ? "Broj je pozitivan ceo i pripada skupu \\(\\mathbb{N}\\)."
                  : "U ovoj lekciji prirodnim brojevima ne smatramo nulu niti negativne brojeve."
              }
            />
            <StatusCard
              title="Ceo broj"
              label={item.isInteger ? "Da" : "Ne"}
              tone={item.isInteger ? "ok" : "warn"}
              note={
                item.isInteger
                  ? "Broj nema razlomački deo."
                  : "Broj ima necelo ili iracionalno poreklo."
              }
            />
            <StatusCard
              title="Racionalan"
              label={item.isRational ? "Da" : "Ne"}
              tone={item.isRational ? "ok" : "warn"}
              note={
                item.isRational
                  ? "Može da se zapiše kao razlomak dva cela broja."
                  : "Ne može da se zapiše kao razlomak."
              }
            />
            <StatusCard
              title="Iracionalan"
              label={irrational ? "Da" : "Ne"}
              tone={irrational ? "sky" : "warn"}
              note={
                irrational
                  ? "Broj je realan, ali nije racionalan."
                  : "Ako je racionalan, onda nije iracionalan."
              }
            />
            <StatusCard
              title="Realan broj"
              label="Da"
              tone="ok"
              note="Svi brojevi koje ovde posmatramo pripadaju skupu \\(\\mathbb{R}\\)."
            />
            <StatusCard
              title="Znak"
              label={signText(item.value)}
              tone={item.value === 0 ? "sky" : item.value > 0 ? "ok" : "bad"}
              note={
                item.value === 0
                  ? "Broj se nalazi tačno u ishodištu."
                  : `Broj je ${signText(item.value)} i nalazi se ${item.value > 0 ? "desno" : "levo"} od nule.`
              }
            />
          </div>
          <div
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 16,
              background: "rgba(107, 223, 183, 0.08)",
              border: "1px solid rgba(107, 223, 183, 0.18)",
              color: "var(--lesson-muted)",
              fontSize: "0.9rem",
            }}
          >
            <strong style={{ color: "var(--lesson-success)" }}>
              Kako da čitaš rezultat:
            </strong>{" "}
            najpre odredi najmanji skup kome broj pripada. Onda su svi veći skupovi
            automatski obuhvaćeni.
          </div>
        </article>
      </div>
    </>
  );
}
