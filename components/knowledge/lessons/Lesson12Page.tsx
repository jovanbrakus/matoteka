"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import LessonShell from "@/components/knowledge/LessonShell";
import LessonHero from "@/components/knowledge/LessonHero";
import LessonNav from "@/components/knowledge/LessonNav";
import LessonSection from "@/components/knowledge/LessonSection";
import MathBlock from "@/components/knowledge/MathBlock";
import InlineMath from "@/components/knowledge/InlineMath";
import WalkStep from "@/components/knowledge/WalkStep";
import ExerciseCard from "@/components/knowledge/ExerciseCard";
import InsightCard from "@/components/knowledge/InsightCard";
import FormulaCard from "@/components/knowledge/FormulaCard";
import MicroCheck from "@/components/knowledge/MicroCheck";
import SectionCard from "@/components/knowledge/SectionCard";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

/* ───────────────────────── NAV ───────────────────────── */

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnove i domen" },
  { href: "#operacije", label: "Operacije i NZS" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ───────────────────────── RATIONAL LAB ───────────────────────── */

type ScenarioKey = "same" | "lcd" | "factor" | "division";

interface FractionInfo {
  title: string;
  num: string;
  den: string;
  numFactors?: string[];
  denFactors?: string[];
}

interface Scenario {
  title: string;
  expressionLatex: string;
  domainLatex: string;
  lcdLatex: string;
  resultLatex: string;
  formulaLatex: string;
  recognition: string;
  hint: string;
  strategy: string;
  type: string;
  operation: string;
  left: FractionInfo;
  right: FractionInfo;
  result: FractionInfo;
  ribbon: string[];
}

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  same: {
    title: "Isti imenilac",
    expressionLatex: "\\frac{x+1}{x-2}+\\frac{3}{x-2}",
    domainLatex: "x\\neq 2",
    lcdLatex: "\\text{NZS}=x-2",
    resultLatex: "\\frac{x+4}{x-2}",
    formulaLatex:
      "\\frac{x+1}{x-2}+\\frac{3}{x-2} = \\frac{x+1+3}{x-2} = \\frac{x+4}{x-2}",
    recognition:
      "Isti imenilac znači da ne tražiš novi NZS. Sabiraš samo brojaoce, a domen ostaje isti.",
    hint: "Kada su imenioci isti, najveća greška je da bez potrebe širiš ili komplikuješ izraz.",
    strategy: "Najpre pogledaj da li su imenioci već isti.",
    type: "add",
    operation: "+",
    left: { title: "Razlomak 1", num: "x+1", den: "x-2", denFactors: ["x-2"] },
    right: { title: "Razlomak 2", num: "3", den: "x-2", denFactors: ["x-2"] },
    result: { title: "Rezultat", num: "x+4", den: "x-2", denFactors: ["x-2"] },
    ribbon: ["domen: x \u2260 2", "NZS: x-2"],
  },
  lcd: {
    title: "Različiti linearni imenioci",
    expressionLatex: "\\frac{1}{x}+\\frac{2}{x+1}",
    domainLatex: "x\\neq 0,\\; x\\neq -1",
    lcdLatex: "\\text{NZS}=x(x+1)",
    resultLatex: "\\frac{3x+1}{x(x+1)}",
    formulaLatex:
      "\\frac{1}{x}+\\frac{2}{x+1} = \\frac{x+1}{x(x+1)}+\\frac{2x}{x(x+1)} = \\frac{3x+1}{x(x+1)}",
    recognition:
      "Dva različita linearna imenioca znače da NZS čine oba faktora: x i x+1.",
    hint: "Ne sabiraš imenioce. Prvo ih usklađuješ preko NZS-a, pa tek onda sabiraš brojaoce.",
    strategy: "Rastavi imenioce na faktore i uzmi oba faktora u NZS.",
    type: "add",
    operation: "+",
    left: { title: "Razlomak 1", num: "1", den: "x", denFactors: ["x"] },
    right: { title: "Razlomak 2", num: "2", den: "x+1", denFactors: ["x+1"] },
    result: {
      title: "Rezultat",
      num: "3x+1",
      den: "x(x+1)",
      denFactors: ["x", "x+1"],
    },
    ribbon: ["domen: x \u2260 0", "domen: x \u2260 -1", "NZS: x(x+1)"],
  },
  factor: {
    title: "Faktorisi pre sabiranja",
    expressionLatex: "\\frac{1}{x^2-1}+\\frac{1}{x+1}",
    domainLatex: "x\\neq 1,\\; x\\neq -1",
    lcdLatex: "\\text{NZS}=(x-1)(x+1)",
    resultLatex: "\\frac{x}{x^2-1}",
    formulaLatex:
      "x^2-1=(x-1)(x+1) \\quad\\Rightarrow\\quad \\frac{1}{(x-1)(x+1)}+\\frac{x-1}{(x-1)(x+1)} = \\frac{x}{x^2-1}",
    recognition:
      "Kvadratni imenilac krije razliku kvadrata. Bez faktorizacije ne vidiš pravi NZS.",
    hint: "Ako vidiš x\u00B2-1, proveri razliku kvadrata pre bilo kakvog sabiranja.",
    strategy: "Pre NZS-a proveri da li se neki imenilac može faktorisati.",
    type: "add",
    operation: "+",
    left: {
      title: "Razlomak 1",
      num: "1",
      den: "x\u00B2-1",
      denFactors: ["x-1", "x+1"],
    },
    right: {
      title: "Razlomak 2",
      num: "1",
      den: "x+1",
      denFactors: ["x+1"],
    },
    result: {
      title: "Rezultat",
      num: "x",
      den: "x\u00B2-1",
      denFactors: ["x-1", "x+1"],
    },
    ribbon: ["domen: x \u2260 1", "domen: x \u2260 -1", "NZS: (x-1)(x+1)"],
  },
  division: {
    title: "Deljenje algebarskih razlomaka",
    expressionLatex:
      "\\frac{x^2-1}{x^2-2x+1}:\\frac{x+1}{x-1}",
    domainLatex: "x\\neq 1,\\; x\\neq -1",
    lcdLatex: "\\text{recipročni oblik} = \\frac{x-1}{x+1}",
    resultLatex: "1",
    formulaLatex:
      "\\frac{(x-1)(x+1)}{(x-1)^2}\\cdot\\frac{x-1}{x+1} = 1",
    recognition:
      "Prvo faktorišeš, pa deljenje pretvaraš u množenje recipročnim razlomkom.",
    hint: "Kod deljenja dodatno proveravaš da drugi razlomak nije jednak nuli. Zato je ovde i x=-1 zabranjen.",
    strategy:
      "Deljenje razlomkom odmah menjaš u množenje recipročnim izrazom.",
    type: "division",
    operation: "\u00F7",
    left: {
      title: "Prvi razlomak",
      num: "x\u00B2-1",
      den: "x\u00B2-2x+1",
      numFactors: ["x-1", "x+1"],
      denFactors: ["x-1", "x-1"],
    },
    right: {
      title: "Drugi razlomak",
      num: "x+1",
      den: "x-1",
      numFactors: ["x+1"],
      denFactors: ["x-1"],
    },
    result: { title: "Rezultat", num: "1", den: "", denFactors: [] },
    ribbon: ["domen: x \u2260 1", "domen: x \u2260 -1", "množi recipročnim"],
  },
};

interface RationalTheme {
  bg: string;
  grid: string;
  text: string;
  textStrong: string;
  muted: string;
  cardBg: string;
  cardBorder: string;
  divider: string;
  chipBorder: string;
  chipText: string;
  numFactorBg: string;
  denFactorBg: string;
  ribbonBg: string;
  ribbonBorder: string;
  ribbonText: string;
  accentLeft: string;
  accentRight: string;
  accentResult: string;
  accentOp: string;
}

function getRationalTheme(): RationalTheme {
  const isLight = document.documentElement.classList.contains("light");
  return {
    bg: isLight ? "rgba(245, 240, 235, 0.95)" : "rgba(8, 4, 2, 0.95)",
    grid: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
    text: isLight ? "rgba(42,36,32,0.9)" : "rgba(255,255,255,0.9)",
    textStrong: isLight ? "rgba(42,36,32,0.95)" : "rgba(255,247,240,0.95)",
    muted: isLight ? "rgba(42,36,32,0.65)" : "rgba(237,226,220,0.95)",
    cardBg: isLight ? "rgba(255, 255, 255, 0.62)" : "rgba(8, 4, 2, 0.62)",
    cardBorder: isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)",
    divider: isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)",
    chipBorder: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
    chipText: isLight ? "rgba(42,36,32,0.96)" : "rgba(255,248,242,0.96)",
    numFactorBg: isLight ? "rgba(236, 91, 19, 0.12)" : "rgba(236, 91, 19, 0.18)",
    denFactorBg: isLight ? "rgba(56, 152, 200, 0.12)" : "rgba(136, 216, 255, 0.14)",
    ribbonBg: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    ribbonBorder: isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)",
    ribbonText: isLight ? "#4a3e35" : "#f3e6dd",
    accentLeft: isLight ? "#c94a08" : "#ffb488",
    accentRight: isLight ? "#2980b9" : "#88d8ff",
    accentResult: isLight ? "#1a9e6e" : "#6bdfb7",
    accentOp: isLight ? "#8b5a2e" : "#ffd7b9",
  };
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  size = 15,
  weight = 700,
  align: CanvasTextAlign = "left"
) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px "Inter", sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.textAlign = "left";
}

function drawFactorChips(
  ctx: CanvasRenderingContext2D,
  items: string[],
  x: number,
  y: number,
  width: number,
  color: string,
  theme: RationalTheme
) {
  let cursorX = x;
  let cursorY = y;
  const paddingX = 10;
  const chipHeight = 28;
  const gap = 8;

  items.forEach((item) => {
    ctx.font = '700 13px "Inter", sans-serif';
    const textWidth = ctx.measureText(item).width;
    const chipWidth = textWidth + paddingX * 2;
    if (cursorX + chipWidth > x + width) {
      cursorX = x;
      cursorY += chipHeight + gap;
    }
    ctx.fillStyle = color;
    ctx.fillRect(cursorX, cursorY, chipWidth, chipHeight);
    ctx.strokeStyle = theme.chipBorder;
    ctx.strokeRect(cursorX, cursorY, chipWidth, chipHeight);
    drawText(
      ctx,
      item,
      cursorX + chipWidth / 2,
      cursorY + 19,
      theme.chipText,
      13,
      700,
      "center"
    );
    cursorX += chipWidth + gap;
  });
}

function drawFractionCard(
  ctx: CanvasRenderingContext2D,
  card: FractionInfo,
  x: number,
  y: number,
  w: number,
  h: number,
  accent: string,
  compact: boolean,
  theme: RationalTheme
) {
  ctx.fillStyle = theme.cardBg;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = theme.cardBorder;
  ctx.strokeRect(x, y, w, h);

  drawText(ctx, card.title, x + 16, y + 22, accent, 11, 800);

  const numY = y + 48;
  drawText(
    ctx,
    card.num,
    x + w / 2,
    numY,
    theme.textStrong,
    compact ? 16 : 18,
    700,
    "center"
  );

  ctx.strokeStyle = theme.divider;
  ctx.beginPath();
  ctx.moveTo(x + 16, y + 62);
  ctx.lineTo(x + w - 16, y + 62);
  ctx.stroke();

  if (card.numFactors && card.numFactors.length > 0) {
    drawFactorChips(
      ctx,
      card.numFactors,
      x + 16,
      y + 34,
      w - 32,
      theme.numFactorBg,
      theme
    );
  }

  drawText(
    ctx,
    card.den,
    x + w / 2,
    y + 92,
    theme.muted,
    compact ? 15 : 17,
    700,
    "center"
  );

  if (card.denFactors && card.denFactors.length > 0) {
    drawFactorChips(
      ctx,
      card.denFactors,
      x + 16,
      y + 104,
      w - 32,
      theme.denFactorBg,
      theme
    );
  }
}

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  items: string[],
  width: number,
  height: number,
  theme: RationalTheme
) {
  let cursorX = 28;
  let cursorY = height - 58;
  items.forEach((item) => {
    ctx.font = '700 13px "Inter", sans-serif';
    const chipWidth = Math.min(
      width - 56,
      ctx.measureText(item).width + 26
    );
    if (cursorX + chipWidth > width - 28) {
      cursorX = 28;
      cursorY -= 38;
    }
    ctx.fillStyle = theme.ribbonBg;
    ctx.fillRect(cursorX, cursorY, chipWidth, 28);
    ctx.strokeStyle = theme.ribbonBorder;
    ctx.strokeRect(cursorX, cursorY, chipWidth, 28);
    drawText(
      ctx,
      item,
      cursorX + chipWidth / 2,
      cursorY + 19,
      theme.ribbonText,
      13,
      700,
      "center"
    );
    cursorX += chipWidth + 8;
  });
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  scenario: Scenario,
  showHints: boolean
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const T = getRationalTheme();

  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, canvas.clientWidth || 640);
  const compact = width < 760;
  const height = Math.max(
    compact ? 420 : 320,
    Math.round(width * (compact ? 0.88 : 0.62))
  );
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = T.bg;
  ctx.fillRect(0, 0, width, height);

  // grid lines
  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let x = 28; x < width; x += 38) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 28; y < height; y += 38) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  if (compact) {
    const cardW = width - 56;
    const cardH = scenario.type === "division" ? 128 : 116;
    let top = 28;
    drawFractionCard(ctx, scenario.left, 28, top, cardW, cardH, T.accentLeft, true, T);
    drawText(
      ctx,
      scenario.operation,
      width / 2,
      top + cardH + 28,
      T.accentOp,
      28,
      900,
      "center"
    );
    top += cardH + 44;
    drawFractionCard(ctx, scenario.right, 28, top, cardW, cardH, T.accentRight, true, T);
    drawText(
      ctx,
      "\u2193",
      width / 2,
      top + cardH + 28,
      T.accentOp,
      26,
      900,
      "center"
    );
    top += cardH + 44;
    const resultH = 98;
    drawFractionCard(ctx, scenario.result, 28, top, cardW, resultH, T.accentResult, true, T);
    if (showHints) {
      drawText(ctx, scenario.title, 28, 18, T.accentOp, 14, 800);
    }
  } else {
    const cardW = width * 0.23;
    const cardH = scenario.type === "division" ? 150 : 128;
    const leftX = width * 0.06;
    const leftY = 88;
    drawFractionCard(
      ctx,
      scenario.left,
      leftX,
      leftY,
      cardW,
      cardH,
      T.accentLeft,
      false,
      T
    );
    drawText(
      ctx,
      scenario.operation,
      leftX + cardW + 24,
      leftY + cardH * 0.54,
      T.accentOp,
      32,
      900
    );
    const rightX = leftX + cardW + 54;
    drawFractionCard(
      ctx,
      scenario.right,
      rightX,
      leftY,
      cardW,
      cardH,
      T.accentRight,
      false,
      T
    );
    drawText(
      ctx,
      "\u2192",
      rightX + cardW + 24,
      leftY + cardH * 0.54,
      T.accentOp,
      30,
      900
    );
    const resultX = rightX + cardW + 56;
    drawFractionCard(
      ctx,
      scenario.result,
      resultX,
      76,
      width * 0.25,
      142,
      T.accentResult,
      false,
      T
    );
    if (showHints) {
      drawText(ctx, scenario.title, leftX, 42, T.accentOp, 17, 800);
    }
  }

  if (showHints) {
    drawRibbon(ctx, scenario.ribbon, width, height, T);
  }
}

function RationalLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("same");
  const [showHints, setShowHints] = useState(true);

  const scenario = SCENARIOS[scenarioKey];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas(canvas, scenario, showHints);
  }, [scenario, showHints]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [draw]);

  return (
    <div className={s.interactiveShell}>
      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Kontrole</h3>
        <p>
          Interaktivni deo ne pokušava da bude &ldquo;beskonačan kalkulator&rdquo;,
          već laboratorijum za najtipičnije obrasce koji se stalno pojavljuju na
          zadacima.
        </p>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label htmlFor="scenarioSelect">Izaberi scenario</label>
            <select
              id="scenarioSelect"
              value={scenarioKey}
              onChange={(e) => setScenarioKey(e.target.value as ScenarioKey)}
            >
              <option value="same">Isti imenilac</option>
              <option value="lcd">Različiti linearni imenioci</option>
              <option value="factor">Faktorisi pre sabiranja</option>
              <option value="division">Deljenje algebarskih razlomaka</option>
            </select>
          </div>
          <div className={s.field}>
            <label htmlFor="strategyInfo">Pedagoški fokus</label>
            <input
              id="strategyInfo"
              type="text"
              value={scenario.strategy}
              readOnly
            />
          </div>
        </div>

        <label className={s.toggleRow}>
          <input
            type="checkbox"
            checked={showHints}
            onChange={(e) => setShowHints(e.target.checked)}
          />
          <span>Prikaži pomoćne oznake i komentar koraka</span>
        </label>

        <div className={cs.presetRow}>
          {(
            [
              ["same", "Isti imenilac"],
              ["lcd", "NZS linearnih"],
              ["factor", "Faktorisi prvo"],
              ["division", "Deljenje"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              className={s.presetBtn}
              type="button"
              onClick={() => setScenarioKey(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={s.labNote}>{scenario.hint}</div>
      </article>

      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Vizuelni prikaz i rezultat</h3>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            aria-label="Vizuelni prikaz racionalnih algebarskih izraza, domena, NZS-a i rezultata operacije"
          />
        </div>

        <div className={s.resultsGrid}>
          <div className={s.resultCard}>
            <strong>Polazni izraz</strong>
            <div>
              <InlineMath dynamic>{scenario.expressionLatex}</InlineMath>
            </div>
          </div>
          <div className={s.resultCard}>
            <strong>Domen</strong>
            <div>
              <InlineMath dynamic>{scenario.domainLatex}</InlineMath>
            </div>
          </div>
          <div className={s.resultCard}>
            <strong>NZS / ključni faktor</strong>
            <div>
              <InlineMath dynamic>{scenario.lcdLatex}</InlineMath>
            </div>
          </div>
          <div className={s.resultCard}>
            <strong>Konačan rezultat</strong>
            <div>
              <InlineMath dynamic>{scenario.resultLatex}</InlineMath>
            </div>
          </div>
        </div>

        <div className={s.labNote}>
          <MathBlock dynamic>{scenario.formulaLatex}</MathBlock>
        </div>

        <div className={s.labNote}>{scenario.recognition}</div>
      </article>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function Lesson12Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 12"
        title={
          <>
            Racionalni izrazi i{" "}
            <span className={cs.tHeroAccent}>algebarski razlomci</span>
          </>
        }
        description='Ova lekcija nije samo "račun sa slovima u razlomku". Ovde postaje presudno da poštuješ red rada: prvo domen, zatim faktorizacija, onda NZS ili recipročni oblik, pa tek na kraju skraćivanje i konačno sređivanje.'
        heroImageSrc="/images/lessons/lesson12_hero.png"
        heroImageAlt="Ilustracija racionalnih algebarskih izraza i operacija sa razlomcima"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da bezbedno računaš sa algebarskim razlomcima: sabiranje, oduzimanje, množenje, deljenje i sređivanje dvojnih razlomaka uz očuvan domen.",
          },
          {
            label: "Najveća zamka",
            description:
              "Skraćivanje pre faktorisanja ili bez domena. Mnogo tačnih transformacija padne već na prvom koraku kada se zaboravi da imenilac ne sme biti nula.",
          },
          {
            label: "Prijemni fokus",
            description:
              "NZS imenilaca i skrivena faktorizacija. FTN i FON često traže baš to: da prepoznaš faktor koji otključava ceo zadatak.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70 do 90 minuta uz domen, NZS i više tipičnih prijemnih primera.",
          },
          {
            label: "Predznanje",
            description:
              "Rastavljanje na faktore, stepeni, polinomi i rad sa običnim razlomcima.",
          },
          {
            label: "Glavna veština",
            description:
              "Održati domen netaknut i pravilno sređivati izraz kroz faktorizaciju i NZS.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorijum domena, NZS-a i tipičnih operacija nad razlomcima.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je ulazna kapija za skoro sve kasnije algebarske zadatke"
        description='Racionalni algebarski izrazi nisu "sporedna tehnika". Oni se pojavljuju u jednačinama, nejednačinama, funkcijama i gotovo svakom zadatku gde polinomi završe u imeniocu.'
      >
        <div className={s.grid3}>
          <SectionCard title="Domen je prvi filter">
            <p>
              Čim postoji imenilac, pojavljuju se zabranjene vrednosti. Ako to
              preskočiš, možeš dobiti formalno lep, ali matematički netačan
              rezultat.
            </p>
          </SectionCard>
          <SectionCard title="Faktorizacija otključava zadatak">
            <p>
              Mnogi razlomci deluju komplikovano dok ih ne rastaviš na faktore.
              Tada postaje jasno šta se skraćuje, koji je NZS i gde su rupe u
              domenu.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni voli skrivene razlomke">
            <p>
              Na FTN-u i FON-u zadatak retko kaže &ldquo;nađi domen pa
              NZS&rdquo;. Umesto toga očekuje da to uradiš sam kao prirodan prvi
              korak.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVE I DOMEN ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnove i domen"
        title="Šta je racionalni algebarski izraz i šta mu je domen"
        description="Ovde vredi jedno pravilo koje mora postati refleks: ako je nešto u imeniocu, odmah proveravaš kada je to nula."
      >
        <div className={s.grid2}>
          <SectionCard title="Definicija">
            <p>Racionalni algebarski izraz ima oblik:</p>
            <MathBlock>
              {"\\frac{P(x)}{Q(x)}, \\qquad Q(x)\\neq 0"}
            </MathBlock>
            <p>
              Ovde su <InlineMath>{"P(x)"}</InlineMath> i{" "}
              <InlineMath>{"Q(x)"}</InlineMath> polinomi, a imenilac nikada ne
              sme biti nula.
            </p>
          </SectionCard>
          <SectionCard title="Domen">
            <p>
              Domen dobijaš tako što rešiš jednačinu{" "}
              <InlineMath>{"Q(x)=0"}</InlineMath> i te vrednosti isključiš.
            </p>
            <MathBlock>
              {"\\frac{x+1}{x^2-4},\\qquad x^2-4=(x-2)(x+2)"}
            </MathBlock>
            <MathBlock>{"x\\neq 2,\\quad x\\neq -2"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Skraćivanje ne briše zabranjene vrednosti">
            <MathBlock>
              {"\\frac{x^2-1}{x+1}=\\frac{(x-1)(x+1)}{x+1}=x-1"}
            </MathBlock>
            <p>
              Iako se izraz formalno skrati na{" "}
              <InlineMath>{"x-1"}</InlineMath>, u originalu ipak mora da važi{" "}
              <InlineMath>{"x\\neq -1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Zašto prvo faktorizacija">
            <p>
              Bez faktorizacije ne vidiš ni šta može da se skrati ni kako da
              nađeš NZS imenilaca. To je centralni tehnički korak ove teme.
            </p>
          </SectionCard>
          <SectionCard title="Najvažnija misaona disciplina">
            <p>
              Razlikuj &ldquo;isti izraz na delu domena&rdquo; od &ldquo;isti
              izraz za sve realne brojeve&rdquo;. To nije ista stvar.
            </p>
            <MicroCheck
              question={
                "Mikro-provera: Da li su \\(\\frac{x^2-1}{x+1}\\) i \\(x-1\\) potpuno isti izrazi?"
              }
              answer={
                <p>
                  Nisu na celom skupu realnih brojeva, jer prvi izraz nije
                  definisan za <InlineMath>{"x=-1"}</InlineMath>, a drugi jeste.
                  Jednaki su samo za{" "}
                  <InlineMath>{"x\\neq -1"}</InlineMath>.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OPERACIJE I NZS ═══════════ */}
      <LessonSection
        id="operacije"
        eyebrow="Operacije i NZS"
        title="Red rada koji čuva i tačnost i vreme"
        description="Na običnim razlomcima si naučio slična pravila, ali ovde je razlika u tome što se imenioci često moraju prvo rastaviti na faktore."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula={"\\frac{A}{B}\\pm \\frac{C}{D} = \\frac{AD\\pm BC}{BD}"}
            note="U praksi se ovo radi preko NZS-a, ne slepo preko proizvoda, jer NZS često daje kraći izraz."
          />
          <FormulaCard
            title="Množenje"
            formula={"\\frac{A}{B}\\cdot \\frac{C}{D} = \\frac{AC}{BD}"}
            note="Množeš brojilac sa brojiocem, a imenilac sa imeniocem, ali pre toga proveri da li nešto može da se skrati nakon faktorisanja."
          />
          <FormulaCard
            title="Deljenje"
            formula={"\\frac{A}{B}:\\frac{C}{D} = \\frac{A}{B}\\cdot\\frac{D}{C}"}
            note="Deljenje razlomkom zamenjuješ množenjem recipročnim razlomkom. Ovde dodatno moraš proveriti da drugi razlomak nije jednak nuli."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako nalaziš NZS imenilaca">
            <ul>
              <li>Rastavi svaki imenilac na faktore.</li>
              <li>
                Uzmi svaki različit faktor onoliko puta koliko se pojavljuje sa
                najvećim stepenom.
              </li>
              <li>To postaje zajednički imenilac.</li>
            </ul>
            <MathBlock>
              {"x^2-1=(x-1)(x+1),\\qquad x+1=x+1"}
            </MathBlock>
            <MathBlock>{"\\text{NZS}=(x-1)(x+1)"}</MathBlock>
          </SectionCard>
          <SectionCard title="Dvojni razlomak">
            <p>
              Kada razlomak ima razlomke i u brojiocu i u imeniocu, najčistiji
              postupak je da ceo veliki razlomak pomnožiš NZS-om svih malih
              imenilaca.
            </p>
            <MathBlock>
              {"\\frac{\\frac{1}{x}+\\frac{1}{x+1}}{\\frac{1}{x}}"}
            </MathBlock>
            <p>
              Tada se mali imenici uklanjaju u jednom potezu, ali domen ostaje
              isti.
            </p>
            <MicroCheck
              question="Mikro-provera: Kada se razlomci skraćuju?"
              answer={
                <p>
                  Skraćuju se samo zajednički faktori celog brojioca i celog
                  imenioca. Članovi unutar zbira ne skraćuju se direktno.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorijum domena i NZS-a"
        description="Biraš tipičan scenario i odmah vidiš: šta je domen, koji je NZS, da li treba faktorisi pre sabiranja i kako izgleda konačni sređeni rezultat."
      >
        <RationalLab />

        <InsightCard title="Kako da koristiš laboratorijum">
          <p>
            Pre nego što pogledaš rezultat, pokušaj naglas da izgovoriš tri
            stvari: domen, NZS i da li je potrebna faktorizacija. Ako to umeš
            da kažeš bez gledanja, onda si ušao u pravi način razmišljanja za
            ovu oblast.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji prate pravi red rada"
        description="Ovde namerno ne jurimo samo račun. Svaki primer prvo govori šta proveravaš, a tek onda kako sređuješ izraz."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: Domen</h3>
            <p>
              Odredi domen izraza{" "}
              <InlineMath>{"\\dfrac{x+1}{x^2-4}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Rastavi imenilac.">
                <MathBlock>{"x^2-4=(x-2)(x+2)"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Isključi vrednosti koje daju nulu u imeniocu."
              >
                <MathBlock>{"x\\neq 2,\\qquad x\\neq -2"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Skraćivanje posle faktorisanja
            </h3>
            <p>
              Sredi izraz{" "}
              <InlineMath>{"\\dfrac{x^2-1}{x^2+x}"}</InlineMath>.
            </p>
            <MathBlock>
              {"x^2-1=(x-1)(x+1),\\qquad x^2+x=x(x+1)"}
            </MathBlock>
            <MathBlock>
              {"\\frac{x^2-1}{x^2+x}=\\frac{(x-1)(x+1)}{x(x+1)}=\\frac{x-1}{x}"}
            </MathBlock>
            <p>
              Domen ipak ostaje <InlineMath>{"x\\neq 0"}</InlineMath> i{" "}
              <InlineMath>{"x\\neq -1"}</InlineMath>.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Sabiranje sa NZS-om</h3>
            <p>
              Izračunaj{" "}
              <InlineMath>{"\\dfrac{1}{x}+\\dfrac{2}{x+1}"}</InlineMath>.
            </p>
            <MathBlock>{"\\text{NZS}=x(x+1)"}</MathBlock>
            <MathBlock>
              {
                "\\frac{1}{x}=\\frac{x+1}{x(x+1)},\\qquad \\frac{2}{x+1}=\\frac{2x}{x(x+1)}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\frac{1}{x}+\\frac{2}{x+1} = \\frac{x+1+2x}{x(x+1)} = \\frac{3x+1}{x(x+1)}"
              }
            </MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Faktorisi pre sabiranja
            </h3>
            <p>
              Izračunaj{" "}
              <InlineMath>
                {"\\dfrac{1}{x^2-1}+\\dfrac{1}{x+1}"}
              </InlineMath>
              .
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Rastavi kvadratni imenilac.">
                <MathBlock>{"x^2-1=(x-1)(x+1)"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi NZS.">
                <MathBlock>{"\\text{NZS}=(x-1)(x+1)"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Proširi drugi razlomak.">
                <MathBlock>
                  {"\\frac{1}{x+1}=\\frac{x-1}{(x-1)(x+1)}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Saberi i sredi.">
                <MathBlock>
                  {
                    "\\frac{1}{x^2-1}+\\frac{1}{x+1} = \\frac{1+x-1}{x^2-1} = \\frac{x}{x^2-1}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Deljenje algebarskih razlomaka
            </h3>
            <p>
              Izračunaj{" "}
              <InlineMath>
                {
                  "\\dfrac{x^2-1}{x^2-2x+1}:\\dfrac{x+1}{x-1}"
                }
              </InlineMath>
              .
            </p>
            <MathBlock>
              {"x^2-1=(x-1)(x+1),\\qquad x^2-2x+1=(x-1)^2"}
            </MathBlock>
            <MathBlock>
              {
                "\\frac{x^2-1}{x^2-2x+1}:\\frac{x+1}{x-1} = \\frac{(x-1)(x+1)}{(x-1)^2}\\cdot\\frac{x-1}{x+1} = 1"
              }
            </MathBlock>
            <p>
              Domen: <InlineMath>{"x\\neq 1"}</InlineMath> i{" "}
              <InlineMath>{"x\\neq -1"}</InlineMath>.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 6: Dvojni razlomak</h3>
            <p>
              Sredi izraz{" "}
              <InlineMath>
                {
                  "\\dfrac{\\frac{1}{x}+\\frac{1}{x+1}}{\\frac{1}{x}}"
                }
              </InlineMath>
              .
            </p>
            <MathBlock>
              {
                "\\frac{\\frac{1}{x}+\\frac{1}{x+1}}{\\frac{1}{x}} \\cdot \\frac{x(x+1)}{x(x+1)} = \\frac{(x+1)+x}{x+1}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\frac{\\frac{1}{x}+\\frac{1}{x+1}}{\\frac{1}{x}} = \\frac{2x+1}{x+1}"
              }
            </MathBlock>
            <p>
              Domen: <InlineMath>{"x\\neq 0"}</InlineMath> i{" "}
              <InlineMath>{"x\\neq -1"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Formula-vault za racionalne izraze"
        description='Ove formule vrede tek kada ih koristiš u dobrom redosledu. Najvažnija "formula" ove lekcije je zapravo disciplina rada.'
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Oblik izraza"
            formula={"\\frac{P(x)}{Q(x)},\\qquad Q(x)\\neq 0"}
          />
          <FormulaCard
            title="Domen"
            formula={"Q(x)=0 \\Longrightarrow \\text{te vrednosti isključuješ}"}
          />
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula={"\\frac{A}{B}\\pm\\frac{C}{D} = \\frac{AD\\pm BC}{BD}"}
          />
          <FormulaCard
            title="Množenje"
            formula={"\\frac{A}{B}\\cdot\\frac{C}{D} = \\frac{AC}{BD}"}
          />
          <FormulaCard
            title="Deljenje"
            formula={"\\frac{A}{B}:\\frac{C}{D} = \\frac{A}{B}\\cdot\\frac{D}{C}"}
          />
          <FormulaCard
            title="Skraćivanje"
            formula={"\\frac{A\\cdot K}{B\\cdot K}=\\frac{A}{B},\\qquad K\\neq 0"}
          />
          <FormulaCard
            title="NZS imenilaca"
            formula={"\\text{NZS uzima svaki faktor sa najvećim potrebnim stepenom}"}
          />
          <FormulaCard
            title="Dvojni razlomak"
            formula={"\\frac{\\frac{A}{B}}{\\frac{C}{D}}=\\frac{A}{B}\\cdot\\frac{D}{C}"}
          />
          <FormulaCard
            title="Red rada"
            formula={"\\text{domen} \\rightarrow \\text{faktorizacija} \\rightarrow \\text{operacija} \\rightarrow \\text{skraćivanje}"}
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Greške koje kvare i dobar račun"
        description="Ovde nisu opšti saveti, nego konkretne greške koje se stalno ponavljaju baš na ovoj temi."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Domen se napiše prekasno ili nikad
            </h3>
            <p>
              Ako prvo središ izraz, a tek onda razmišljaš o domenu, lako
              izgubiš zabranjene vrednosti koje su postojale u originalu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Skraćivanje članova kroz zbir</h3>
            <p>
              Ne smeš &ldquo;precrtavati&rdquo; kroz plus ili minus. Skraćuju se
              samo zajednički faktori celog brojioca i celog imenioca.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>NZS bez faktorisanja</h3>
            <p>
              Ako imenioce ne rastaviš na faktore, NZS često ispadne duži nego
              što treba ili potpuno pogrešan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Deljenje bez recipročnog</h3>
            <p>
              Deljenje razlomkom nije deljenje &ldquo;po delovima&rdquo;. Moraš
              preći na množenje recipročnim izrazom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Skraćen faktor nestane iz domena
            </h3>
            <p>
              I kada se faktor skrati, njegova zabranjena vrednost ostaje
              zabranjena jer je potekla iz originalnog imenioca.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Dvojni razlomak se sređuje haotično
            </h3>
            <p>
              Najbezbedniji postupak je množiti ceo veliki razlomak zajedničkim
              imeniocem svih malih razlomaka ili ga prevesti u deljenje pa
              recipročni oblik.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno javlja na testu"
        description="Na prijemnim zadacima retko dobiješ &ldquo;čist&rdquo; primer. Obično je racionalni izraz deo većeg zadatka i služi kao filter da li umeš da radiš disciplinovano."
      >
        <div className={s.grid3}>
          <SectionCard title="Skraćivanje pre jednačine">
            <p>
              Pre nego što rešavaš jednačinu ili nejednačinu, moraš srediti
              racionalni izraz. Tu najpre proveravaš domen i faktorišeš.
            </p>
          </SectionCard>
          <SectionCard title="NZS kao skriven prvi korak">
            <p>
              Zadaci često namerno daju različite imenioce koji deluju nezgodno,
              ali se posle faktorisanja svode na mali broj faktora.
            </p>
          </SectionCard>
          <SectionCard title="Divljenje jednostavnom rezultatu">
            <p>
              Nekada ceo složen izraz padne na{" "}
              <InlineMath>{"1"}</InlineMath>,{" "}
              <InlineMath>{"x"}</InlineMath> ili jednostavan binom. To nije
              slučajno, nego posledica pravilne faktorizacije i čuvanja domena.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 5 koraka">
          <p>
            1. Napiši domen. 2. Rastavi sve što možeš na faktore. 3. Odredi NZS
            ili recipročni oblik, zavisno od operacije. 4. Sredi i tek onda
            skraćuj. 5. Vrati se i proveri da domen originalnog izraza nije
            izgubljen. To je najstabilniji put kroz ovu oblast.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Samostalna provera razumevanja"
        description="Vežbe su poređane tako da proveravaju baš ono što najčešće strada: domen, NZS, faktorisi-pre-skraćivanja i dvojni razlomak."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Odredi domen izraza{" "}
                <InlineMath>{"\\dfrac{2x-1}{x^2-9}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"x^2-9=(x-3)(x+3)"}</MathBlock>
                <MathBlock>{"x\\neq 3,\\qquad x\\neq -3"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Sredi izraz{" "}
                <InlineMath>{"\\dfrac{x^2-4}{x^2-2x}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{x^2-4}{x^2-2x} = \\frac{(x-2)(x+2)}{x(x-2)} = \\frac{x+2}{x}"
                  }
                </MathBlock>
                <p>
                  Domen: <InlineMath>{"x\\neq 0"}</InlineMath> i{" "}
                  <InlineMath>{"x\\neq 2"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {"\\dfrac{1}{x-1}+\\dfrac{1}{x+1}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>{"\\text{NZS}=(x-1)(x+1)"}</MathBlock>
                <MathBlock>
                  {
                    "\\frac{1}{x-1}+\\frac{1}{x+1} = \\frac{x+1+x-1}{x^2-1} = \\frac{2x}{x^2-1}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {"\\dfrac{x}{x+2}\\cdot\\dfrac{x^2-4}{x}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>{"x^2-4=(x-2)(x+2)"}</MathBlock>
                <MathBlock>
                  {
                    "\\frac{x}{x+2}\\cdot\\frac{x^2-4}{x} = \\frac{x}{x+2}\\cdot\\frac{(x-2)(x+2)}{x} = x-2"
                  }
                </MathBlock>
                <p>
                  Domen: <InlineMath>{"x\\neq -2"}</InlineMath> i{" "}
                  <InlineMath>{"x\\neq 0"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {"\\dfrac{x^2-1}{x-1}:\\dfrac{x+1}{x}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{x^2-1}{x-1}:\\frac{x+1}{x} = \\frac{(x-1)(x+1)}{x-1}\\cdot\\frac{x}{x+1} = x"
                  }
                </MathBlock>
                <p>
                  Domen: <InlineMath>{"x\\neq 1"}</InlineMath>,{" "}
                  <InlineMath>{"x\\neq 0"}</InlineMath>,{" "}
                  <InlineMath>{"x\\neq -1"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Sredi izraz{" "}
                <InlineMath>
                  {
                    "\\dfrac{\\frac{2}{x}+\\frac{1}{x-1}}{\\frac{1}{x}}"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{2}{x}+\\frac{1}{x-1} = \\frac{2(x-1)+x}{x(x-1)} = \\frac{3x-2}{x(x-1)}"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "\\frac{\\frac{2}{x}+\\frac{1}{x-1}}{\\frac{1}{x}} = \\frac{3x-2}{x-1}"
                  }
                </MathBlock>
                <p>
                  Domen: <InlineMath>{"x\\neq 0"}</InlineMath> i{" "}
                  <InlineMath>{"x\\neq 1"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Racionalni izrazi ne traže samo formulu, nego disciplinu. Onaj ko redovno čuva domen i faktorisi pre skraćivanja, rešava zadatke daleko sigurnije od onoga ko &ldquo;krene da precrtava&rdquo;."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Domen} \\rightarrow \\text{faktorizacija} \\rightarrow \\text{NZS ili recipročni oblik} \\rightarrow \\text{sređivanje} \\rightarrow \\text{skraćivanje}"
            }
          </MathBlock>
          <p>
            Ako taj redosled postane automatski, većina zadataka iz ove oblasti
            postaje mnogo preglednija.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš"
        description="Ako ti je sledećih šest tačaka jasno, spreman si za ozbiljan rad sa racionalnim izrazima u zadacima."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Imenilac nikad nije nula</h3>
            <p>Domen dolazi prvi i zapisuje se iz originalnog izraza.</p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Faktorizacija je obavezna navika
            </h3>
            <p>
              Bez nje ne vidiš ni skraćivanje ni pravi NZS imenilaca.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Sabiranje traži zajednički imenilac
            </h3>
            <p>
              NZS je praktičniji i kraći od slepog množenja imenilaca.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Deljenje znači recipročni oblik
            </h3>
            <p>
              Razlomkom deliš tako što množiš njegovim obrnutim oblikom.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. Skraćuješ faktore, ne članove zbira
            </h3>
            <p>Precrtavanje kroz plus ili minus nije dozvoljeno.</p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Ova rutina direktno prelazi u zadatke sa jednačinama,
              nejednačinama i polinomima gde racionalni izrazi više nisu pomoćna
              tema, nego srž zadatka.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 12 završava osnovni blok transformacija izraza i otvara vrata
          ozbiljnijim polinomskim i racionalnim zadacima.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
