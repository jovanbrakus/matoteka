"use client";

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

import { useState, useRef, useCallback, useEffect } from "react";

/* ────────── NAV ────────── */
const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#osnove", label: "Osnovni pojmovi" },
  { href: "#radijani", label: "Radijani i formule" },
  { href: "#cetvorouglovi", label: "Četvorouglovi" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

/* ────────── Interactive Lab ────────── */
type LabMode = "sector" | "cyclic";

function formatNum(v: number, digits = 3) {
  const rounded = Number.parseFloat(v.toFixed(digits));
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toLocaleString("sr-RS", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

const DEG2RAD = Math.PI / 180;

const KNOWN_RADIAN: Record<number, string> = {
  30: "\u03C0/6",
  45: "\u03C0/4",
  60: "\u03C0/3",
  90: "\u03C0/2",
  120: "2\u03C0/3",
  135: "3\u03C0/4",
  150: "5\u03C0/6",
  180: "\u03C0",
  225: "5\u03C0/4",
  270: "3\u03C0/2",
  300: "5\u03C0/3",
  315: "7\u03C0/4",
};

function radianText(deg: number) {
  return KNOWN_RADIAN[deg] ?? formatNum(deg * DEG2RAD, 3);
}

function toCanvas(cx: number, cy: number, r: number, deg: number) {
  const rad = deg * DEG2RAD;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function angleBetween(
  prev: { x: number; y: number },
  curr: { x: number; y: number },
  next: { x: number; y: number }
) {
  const v1x = prev.x - curr.x;
  const v1y = prev.y - curr.y;
  const v2x = next.x - curr.x;
  const v2y = next.y - curr.y;
  const dot = v1x * v2x + v1y * v2y;
  const len1 = Math.hypot(v1x, v1y);
  const len2 = Math.hypot(v2x, v2y);
  const cosine = Math.min(1, Math.max(-1, dot / (len1 * len2)));
  return (Math.acos(cosine) * 180) / Math.PI;
}

function CircleLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<LabMode>("sector");
  const [radius, setRadius] = useState(6);
  const [angleDeg, setAngleDeg] = useState(60);
  const [quadB, setQuadB] = useState(92);
  const [quadD, setQuadD] = useState(-102);

  const presets = [30, 45, 60, 90, 120];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    /* background */
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "rgba(26,15,11,0.98)");
    bg.addColorStop(1, "rgba(13,8,6,0.98)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = "rgba(255,214,180,0.05)";
    ctx.lineWidth = 1;
    for (let x = 28; x < W; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 28; y < H; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    const drawLabel = (
      text: string,
      x: number,
      y: number,
      color = "#fff6ef",
      align: CanvasTextAlign = "center"
    ) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.font = '700 17px "Public Sans",system-ui,sans-serif';
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const drawPoint = (
      pt: { x: number; y: number },
      label: string,
      dx = 0,
      dy = 0
    ) => {
      ctx.save();
      ctx.fillStyle = "#ffcf9b";
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fill();
      drawLabel(label, pt.x + dx, pt.y + dy);
      ctx.restore();
    };

    if (mode === "sector") {
      const cx = 300;
      const cy = 260;
      const r = 82 + radius * 18;
      const startDeg = -18;
      const endDeg = startDeg - angleDeg;
      const startRad = startDeg * DEG2RAD;
      const endRad = endDeg * DEG2RAD;

      const pA = toCanvas(cx, cy, r, startDeg);
      const pB = toCanvas(cx, cy, r, endDeg);

      /* filled sector */
      ctx.save();
      ctx.fillStyle = "rgba(255,141,71,0.16)";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pA.x, pA.y);
      ctx.arc(cx, cy, r, startRad, endRad, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* full circle */
      ctx.save();
      ctx.strokeStyle = "rgba(255,231,211,0.16)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      /* arc */
      ctx.save();
      ctx.strokeStyle = "#ffcf9b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startRad, endRad, true);
      ctx.stroke();
      ctx.restore();

      /* radii */
      ctx.save();
      ctx.strokeStyle = "#ff8d47";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pA.x, pA.y);
      ctx.moveTo(cx, cy);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.restore();

      /* chord */
      ctx.save();
      ctx.strokeStyle = "#ffd49d";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.restore();

      /* tangent */
      const tLen = 150;
      const tDir = { x: Math.sin(endRad), y: Math.cos(endRad) };
      ctx.save();
      ctx.strokeStyle = "rgba(255,209,102,0.85)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(pB.x - tLen * tDir.x, pB.y - tLen * tDir.y);
      ctx.lineTo(pB.x + tLen * tDir.x, pB.y + tLen * tDir.y);
      ctx.stroke();
      ctx.restore();

      /* angle arc */
      ctx.save();
      ctx.strokeStyle = "rgba(255,179,109,0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 52, startRad, endRad, true);
      ctx.stroke();
      ctx.restore();

      drawPoint({ x: cx, y: cy }, "O", 0, -14);
      drawPoint(pA, "A", 18, -8);
      drawPoint(pB, "B", 18, -8);

      drawLabel("luk", cx + 40, cy - r - 16, "#ffd49d");
      drawLabel(
        "tetiva",
        (pA.x + pB.x) / 2 + 16,
        (pA.y + pB.y) / 2 - 12,
        "#ffe8d1"
      );
      drawLabel(
        "tangenta",
        pB.x + tDir.x * 90,
        pB.y + tDir.y * 90 - 10,
        "#ffd166"
      );
      drawLabel(
        `\u03C6 = ${angleDeg}\u00B0`,
        cx + 72,
        cy - 8,
        "#ffcf9b",
        "left"
      );

      /* info box */
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(560, 72, 290, 168);
      ctx.strokeStyle = "rgba(255,214,180,0.14)";
      ctx.strokeRect(560, 72, 290, 168);
      ctx.restore();

      drawLabel("Šta vidiš na slici", 580, 102, "#ffcf9b", "left");
      ctx.save();
      ctx.fillStyle = "#fff1e6";
      ctx.font = '500 18px "Public Sans",system-ui,sans-serif';
      ctx.textAlign = "left";
      [
        "1. Obojeni deo je kružni isečak.",
        "2. Naglašeni luk prati centralni ugao.",
        "3. Duž AB je tetiva tog luka.",
        "4. Isprekidana prava je tangenta u tački B.",
      ].forEach((line, i) => {
        ctx.fillText(line, 580, 136 + i * 28);
      });
      ctx.restore();
    } else {
      /* cyclic quadrilateral mode */
      const cx = 320;
      const cy = 260;
      const r = 82 + radius * 18;

      const A = toCanvas(cx, cy, r, 150);
      const B = toCanvas(cx, cy, r, quadB);
      const C = toCanvas(cx, cy, r, -20);
      const D = toCanvas(cx, cy, r, quadD);

      /* circle */
      ctx.save();
      ctx.strokeStyle = "rgba(255,231,211,0.16)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      /* filled quad */
      ctx.save();
      ctx.fillStyle = "rgba(255,141,71,0.1)";
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.lineTo(D.x, D.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* quad edges */
      ctx.save();
      ctx.strokeStyle = "#ff9b56";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.lineTo(D.x, D.y);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      /* diagonals */
      ctx.save();
      ctx.strokeStyle = "rgba(255,207,155,0.7)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 9]);
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(C.x, C.y);
      ctx.moveTo(B.x, B.y);
      ctx.lineTo(D.x, D.y);
      ctx.stroke();
      ctx.restore();

      drawPoint(A, "A", -12, -14);
      drawPoint(B, "B", 14, -12);
      drawPoint(C, "C", 16, 20);
      drawPoint(D, "D", -12, 22);

      const aA = angleBetween(D, A, B);
      const aB = angleBetween(A, B, C);
      const aC = angleBetween(B, C, D);
      const aD = angleBetween(C, D, A);

      /* info box */
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(560, 72, 304, 186);
      ctx.strokeStyle = "rgba(255,214,180,0.14)";
      ctx.strokeRect(560, 72, 304, 186);
      ctx.restore();

      drawLabel(
        "Šta pratiš u ovom režimu",
        580,
        102,
        "#ffcf9b",
        "left"
      );
      ctx.save();
      ctx.fillStyle = "#fff1e6";
      ctx.font = '500 18px "Public Sans",system-ui,sans-serif';
      ctx.textAlign = "left";
      [
        `\u2220A \u2248 ${formatNum(aA, 1)}\u00B0`,
        `\u2220C \u2248 ${formatNum(aC, 1)}\u00B0`,
        `\u2220A + \u2220C \u2248 ${formatNum(aA + aC, 1)}\u00B0`,
        `\u2220B + \u2220D \u2248 ${formatNum(aB + aD, 1)}\u00B0`,
      ].forEach((line, i) => {
        ctx.fillText(line, 580, 136 + i * 28);
      });
      ctx.restore();

      drawLabel("upisana temena", cx, cy + r + 44, "#ffd49d");
      drawLabel("dijagonale", cx + 118, cy - 12, "#ffd49d");
    }
  }, [mode, radius, angleDeg, quadB, quadD]);

  useEffect(() => {
    draw();
  }, [draw]);

  /* derived values for sector mode results */
  const angleRad = angleDeg * DEG2RAD;
  const arcLen = radius * angleRad;
  const chord = 2 * radius * Math.sin(angleRad / 2);
  const sectorArea = (radius * radius * angleRad) / 2;

  /* derived values for cyclic mode */
  const cx0 = 320;
  const cy0 = 260;
  const r0 = 82 + radius * 18;
  const ptA = toCanvas(cx0, cy0, r0, 150);
  const ptB = toCanvas(cx0, cy0, r0, quadB);
  const ptC = toCanvas(cx0, cy0, r0, -20);
  const ptD = toCanvas(cx0, cy0, r0, quadD);
  const cAngleA = angleBetween(ptD, ptA, ptB);
  const cAngleB = angleBetween(ptA, ptB, ptC);
  const cAngleC = angleBetween(ptB, ptC, ptD);
  const cAngleD = angleBetween(ptC, ptD, ptA);

  return (
    <>
      <div className={s.interactiveShell}>
        {/* controls panel */}
        <article className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Podešavanje prikaza</h3>
          <p>
            Koristi kontrole kao da proveravaš sopstvenu intuiciju: najpre
            pogodi rezultat, pa tek onda proveri na slici i u karticama ispod.
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button
              className={s.presetBtn}
              style={
                mode === "sector"
                  ? {
                      color: "#2a140c",
                      background:
                        "linear-gradient(135deg,#ffd49d,#ff9b56)",
                    }
                  : {}
              }
              onClick={() => setMode("sector")}
            >
              Luk i isečak
            </button>
            <button
              className={s.presetBtn}
              style={
                mode === "cyclic"
                  ? {
                      color: "#2a140c",
                      background:
                        "linear-gradient(135deg,#ffd49d,#ff9b56)",
                    }
                  : {}
              }
              onClick={() => setMode("cyclic")}
            >
              Tetivni četvorougao
            </button>
          </div>

          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>
                Poluprečnik <InlineMath>{"r"}</InlineMath>
              </label>
              <input
                type="range"
                min={3}
                max={10}
                step={0.5}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
              <span className={cs.tSmall}>
                {formatNum(radius, 1)} cm
              </span>
            </div>

            {mode === "sector" && (
              <>
                <div className={s.field}>
                  <label>Centralni ugao</label>
                  <input
                    type="range"
                    min={20}
                    max={320}
                    step={5}
                    value={angleDeg}
                    onChange={(e) => setAngleDeg(Number(e.target.value))}
                  />
                  <span className={cs.tSmall}>
                    {angleDeg}&deg; = {radianText(angleDeg)} rad
                  </span>
                </div>
                <div className={s.field}>
                  <label className={cs.tLabel}>Brzi primeri</label>
                  <div className={cs.presetRow}>
                    {presets.map((a) => (
                      <button
                        key={a}
                        className={s.presetBtn}
                        style={
                          a === angleDeg
                            ? {
                                color: "#2a140c",
                                background:
                                  "linear-gradient(135deg,#ffd49d,#ff9b56)",
                              }
                            : {}
                        }
                        onClick={() => setAngleDeg(a)}
                      >
                        {a}&deg;
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === "cyclic" && (
              <>
                <div className={s.field}>
                  <label>
                    Položaj temena <InlineMath>{"B"}</InlineMath>
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={110}
                    step={1}
                    value={quadB}
                    onChange={(e) => setQuadB(Number(e.target.value))}
                  />
                  <span className={cs.tSmall}>{quadB}&deg;</span>
                </div>
                <div className={s.field}>
                  <label>
                    Položaj temena <InlineMath>{"D"}</InlineMath>
                  </label>
                  <input
                    type="range"
                    min={-140}
                    max={-70}
                    step={1}
                    value={quadD}
                    onChange={(e) => setQuadD(Number(e.target.value))}
                  />
                  <span className={cs.tSmall}>{quadD}&deg;</span>
                </div>
              </>
            )}
          </div>

          <InsightCard title="Kako da koristiš ovu laboratoriju">
            <p>
              U režimu &ldquo;Luk i isečak&rdquo; prvo proceni da li će se luk
              ili površina menjati brže kada pomeraš ugao. U režimu
              &ldquo;Tetivni četvorougao&rdquo; prati da se sam oblik menja,
              ali da zbir naspramnih uglova ostaje isti.
            </p>
          </InsightCard>
        </article>

        {/* canvas panel */}
        <article className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>
            {mode === "sector"
              ? "Prikaz luka, tetive, tangente i kružnog isečka"
              : "Tetivni četvorougao na jednoj kružnici"}
          </h3>
          <p>
            {mode === "sector"
              ? "Na slici su istovremeno označeni centralni ugao, luk, tetiva i tangenta u jednoj tački kružnice."
              : "Pomeranjem temena menja se oblik četvorougla, ali relacija naspramnih uglova ostaje ista."}
          </p>

          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              width={920}
              height={520}
            />
          </div>

          <div className={s.resultsGrid}>
            {mode === "sector" ? (
              <>
                <div className={s.resultCard}>
                  <strong>Ugao</strong>
                  <p style={{ color: "#fff" }}>
                    {angleDeg}&deg; = {formatNum(angleRad, 3)} rad
                  </p>
                  <p>
                    Za formule{" "}
                    <InlineMath>{"l = r\\varphi"}</InlineMath> i{" "}
                    <InlineMath>
                      {"P = \\tfrac{r^2\\varphi}{2}"}
                    </InlineMath>{" "}
                    potreban je radijanski zapis.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Luk</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(arcLen, 3)} cm
                  </p>
                  <p>
                    Računa se formulom{" "}
                    <InlineMath>{"l = r \\cdot \\varphi"}</InlineMath>.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Tetiva</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(chord, 3)} cm
                  </p>
                  <p>
                    Tetiva je kraća od odgovarajućeg luka i zavisi od
                    polovine centralnog ugla.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Površina isečka</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(sectorArea, 3)} cm&sup2;
                  </p>
                  <p>
                    Isečak zauzima isti deo površine koji ugao zauzima od
                    celog kruga.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className={s.resultCard}>
                  <strong>Naspramni uglovi A i C</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(cAngleA, 1)}&deg; i{" "}
                    {formatNum(cAngleC, 1)}&deg;
                  </p>
                  <p>
                    U tetivnom četvorouglu ovaj par uvek daje zbir od
                    180&deg;.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Zbir A + C</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(cAngleA + cAngleC, 1)}&deg;
                  </p>
                  <p>
                    Ovo je glavni signal da je četvorougao zaista tetivni.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Naspramni uglovi B i D</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(cAngleB, 1)}&deg; i{" "}
                    {formatNum(cAngleD, 1)}&deg;
                  </p>
                  <p>
                    I drugi par naspramnih uglova takođe je suplementan.
                  </p>
                </div>
                <div className={s.resultCard}>
                  <strong>Zbir B + D</strong>
                  <p style={{ color: "#fff" }}>
                    {formatNum(cAngleB + cAngleD, 1)}&deg;
                  </p>
                  <p>
                    Relacija ostaje ista bez obzira na položaj temena na
                    kružnici.
                  </p>
                </div>
              </>
            )}
          </div>

          <p className={cs.tSmall} style={{ marginTop: 16 }}>
            {mode === "sector"
              ? "Ako isti ugao povećaš, i luk i tetiva rastu, ali se površina isečka menja još brže jer zavisi i od poluprečnika i od ugla."
              : "Ovo je dobra mentalna slika za prijemni: nije važan konkretan oblik, već činjenica da sva temena leže na istoj kružnici."}
          </p>
        </article>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════ */
/*              MAIN LESSON PAGE               */
/* ════════════════════════════════════════════ */
export default function Lesson45Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 45"
        title={
          <>
            Krug i{" "}
            <span className={cs.tHeroAccent}>delovi kruga</span>
          </>
        }
        description={'Ova lekcija spaja dve stvari koje u\u010Denici \u010Desto u\u010De odvojeno, a na prijemnom se pojavljuju zajedno: ra\u010Dunanje obima, povr\u0161ine, luka i kru\u017Enog ise\u010Dka, kao i prepoznavanje osobina tetivnih i tangentnih \u010Detvorouglova. Kada razume\u0161 da je centralni ugao glavna \u201Ekomanda\u201C koja upravlja lukom, tetivom i ise\u010Dkom, formule prestaju da budu ne\u0161to za bubanje i postaju logi\u010Dne.'}
        heroImageSrc="/api/lessons/45/hero"
        heroImageAlt="Ilustracija kruga i delova kruga"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako se ugao prevodi u dužinu i površinu — iz jednog ugla dobijaš luk, tetivu i deo površine.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje stepeni i radijana — formula l=r\u03C6 važi tek kada je ugao izražen u radijanima.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo prepoznavanje obrasca — luk, sektor ili osobine četvorougla vezanog za krug.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "55 do 75 minuta",
          },
          {
            label: "Predznanje",
            description:
              "Uglovi, trouglovi, Pitagorina teorema i osnovno računanje sa \u03C0",
          },
          {
            label: "Glavna veština",
            description:
              "Prevođenje geometrije u formule i izbor najkraće relacije",
          },
          {
            label: "Interaktivno",
            description: "Laboratorija za luk i tetivni četvorougao",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title={'Krug je mesto gde se geometrija \u201Esabija\u201C u nekoliko mo\u0107nih ideja'}
        description={'Na prijemnom zadatak retko glasi samo: \u201Eizra\u010Dunaj obim kruga\u201C. Mnogo \u010De\u0161\u0107e su obim, luk, tangenta, tetiva ili \u010Detvorougao deo \u0161ire pri\u010De. U\u010Denik koji razume odnose unutar kruga vidi pre\u010Dicu: iz centralnog ugla prelazi na luk, iz luka na sektor, iz upisanosti na relaciju uglova, a iz tangentnosti na relaciju stranica.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Za računanje">
            <p>
              Obim i površina kruga su osnova za sve zadatke sa isečcima,
              odsečcima, valjkom, kupom i kružnim putanjama.
            </p>
          </SectionCard>
          <SectionCard title="Za razumevanje radijana">
            <p>
              Radijan nije &ldquo;nova oznaka za ugao&rdquo;, već prirodan
              način da ugao direktno povežeš sa dužinom luka.
            </p>
          </SectionCard>
          <SectionCard title="Za planimetrijske trikove">
            <p>
              Tetivni i tangentni četvorouglovi često daju jedan skriven uslov
              koji zadatak odjednom čini rešivim.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški savet">
          <p>
            Nemoj učiti ovu lekciju kao spisak formula. Najpre nacrtaj krug i
            obeleži šta znaš: poluprečnik, centralni ugao, luk, tetivu,
            tangentu. Tek kada vidiš figuru, odluči koja formula ima smisla.
            Time smanjuješ broj grešaka i ubrzavaš rad na ispitu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovni pojmovi"
        title="Šta su krug, kružnica i osnovni delovi kruga"
        description={'U \u0161kolskom govoru \u010Desto se ka\u017Ee \u201Ekrug\u201C za sve, ali formalno razlikujemo krug i kru\u017Enicu. Ta razlika ume da bude va\u017Ena kada zadatak govori o povr\u0161ini, dodiru ili polo\u017Eaju ta\u010Daka.'}
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kružnica"
            formula="OA = OB = r"
            note={
              <>
                Skup svih tačaka ravni koje su na istoj udaljenosti{" "}
                <InlineMath>{"r"}</InlineMath> od jedne fiksne tačke{" "}
                <InlineMath>{"O"}</InlineMath>, centra.
              </>
            }
          />
          <FormulaCard
            title="Krug"
            formula={"K = \\{T \\mid OT \\le r\\}"}
            note="Deo ravni omeđen kružnicom, zajedno sa svim unutrašnjim tačkama. Zato krug ima površinu, a kružnica samo dužinu."
          />
          <FormulaCard
            title="Poluprečnik i prečnik"
            formula="d = 2r"
            note="Poluprečnik spaja centar sa tačkom kružnice. Prečnik prolazi kroz centar i najveća je moguća tetiva."
          />
          <FormulaCard
            title="Tetiva i luk"
            formula={"\\overline{AB}\\text{ je tetiva},\\quad \\widehat{AB}\\text{ je luk}"}
            note="Tetiva spaja dve tačke kružnice pravom duži. Luk je deo kružnice između istih tih tačaka."
          />
          <FormulaCard
            title="Tangenta"
            formula={"t \\perp OA \\quad \\text{u tački dodira } A"}
            note="Prava koja dodiruje kružnicu u jednoj tački. U toj tački tangenta je normalna na poluprečnik."
          />
          <FormulaCard
            title="Kružni isečak i kružni odsečak"
            formula={"\\text{isečak} = \\text{dva poluprečnika} + \\text{luk}"}
            note="Isečak je deo ograničen dvama poluprečnicima i lukom. Odsečak je deo ograničen tetivom i lukom."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija koju treba da zadržiš">
            <p>
              Kada dve tačke <InlineMath>{"A"}</InlineMath> i{" "}
              <InlineMath>{"B"}</InlineMath> leže na kružnici, dobijaš tri
              povezana objekta: centralni ugao{" "}
              <InlineMath>{"\\angle AOB"}</InlineMath>, luk{" "}
              <InlineMath>{"\\widehat{AB}"}</InlineMath> i tetivu{" "}
              <InlineMath>{"AB"}</InlineMath>. Ako se centralni ugao
              povećava, i luk i tetiva postaju veći. Dakle, ceo problem
              često zavisi od toga koliko &ldquo;kruga&rdquo; taj ugao
              zahvata.
            </p>
          </SectionCard>
          <SectionCard title="Formalna notacija">
            <p>
              U ovoj lekciji ćemo najčešće koristiti oznake{" "}
              <InlineMath>{"r"}</InlineMath> za poluprečnik,{" "}
              <InlineMath>{"d"}</InlineMath> za prečnik,{" "}
              <InlineMath>{"\\varphi"}</InlineMath> za centralni ugao u
              radijanima, <InlineMath>{"l"}</InlineMath> za dužinu luka i{" "}
              <InlineMath>{"P"}</InlineMath> za površinu. Važno je da iz
              same oznake znaš koja veličina je linearna, a koja površinska.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Koja je najduža tetiva u krugu?">
            <p>
              Najduža tetiva je prečnik. Razlog je intuitivan: ona prolazi
              kroz centar, pa zahvata &ldquo;najširu&rdquo; moguću duž u
              krugu. Svaka druga tetiva je kraća od prečnika.
            </p>
            <MathBlock>{"AB \\le d = 2r"}</MathBlock>
          </SectionCard>
          <SectionCard title="Kako znaš da prava nije tangenta?">
            <p>
              Ako prava seče kružnicu u dve tačke, onda nije tangenta nego
              sekanta. Tangenta ima tačno jednu zajedničku tačku sa
              kružnicom. Zato je u zadatku važno pažljivo čitati da li je reč
              o dodiru ili preseku.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 1: šta ima obim, a šta površinu?"
          answer={
            <p>
              Kružnica ima dužinu, odnosno obim. Krug ima površinu. Ako
              zadatak traži &ldquo;površinu kružnice&rdquo;, to je
              terminološki pogrešno i treba misliti na površinu kruga.
            </p>
          }
        />
        <MicroCheck
          question="Mikro-provera 2: zašto je tangenta normalna na poluprečnik?"
          answer={
            <p>
              Tačka dodira je najbliža tačka prave centru. Kada poluprečnik ne
              bi bio normalan na tangentu, postojala bi tačka tangente bliža
              centru od tačke dodira, što je nemoguće. Zato važi pravilo:
              poluprečnik do tačke dodira i tangenta grade ugao od{" "}
              <InlineMath>{"90^\\circ"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. RADIJANI I FORMULE ═══════════ */}
      <LessonSection
        id="radijani"
        eyebrow="Radijansko merenje i osnovne formule"
        title="Radijan je ključ koji povezuje ugao sa lukom"
        description={'U stepenima govori\u0161 koliki deo punog kruga zauzima ugao. U radijanima govori\u0161 koliko je odgovaraju\u0107i luk \u201Eduga\u010Dak u jedinicama polupre\u010Dnika\u201C. Zbog toga su formule za luk i kru\u017Eni ise\u010Dak u radijanima kra\u0107e i prirodnije.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Kako nastaje radijan">
            <p>
              Ugao od <InlineMath>{"1"}</InlineMath> radijana je centralni
              ugao koji zahvata luk čija je dužina jednaka poluprečniku.
              Pošto ceo obim kruga iznosi{" "}
              <InlineMath>{"2\\pi r"}</InlineMath>, puni ugao odgovara meri{" "}
              <InlineMath>{"2\\pi"}</InlineMath> radijana.
            </p>
            <MathBlock>
              {"360^\\circ = 2\\pi\\text{ rad},\\qquad 180^\\circ = \\pi\\text{ rad}"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Najvažnije upozorenje u ovoj lekciji">
            <p>
              Formula <InlineMath>{"l = r\\varphi"}</InlineMath> i formula{" "}
              <InlineMath>
                {"P_{\\text{isečka}} = \\frac{r^2\\varphi}{2}"}
              </InlineMath>{" "}
              važe kada je ugao <InlineMath>{"\\varphi"}</InlineMath> u
              radijanima. Ako je ugao dat u stepenima, prvo ga pretvori u
              radijane ili koristi formulu sa razlomkom{" "}
              <InlineMath>{"\\frac{\\alpha}{360^\\circ}"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Obim kruga"
            formula={"O = 2\\pi r"}
            note="Ceo krug dužine je proporcionalan poluprečniku."
          />
          <FormulaCard
            title="Površina kruga"
            formula={"P = \\pi r^2"}
            note="Površina raste sa kvadratom poluprečnika, pa duplo veći poluprečnik daje četiri puta veću površinu."
          />
          <FormulaCard
            title="Dužina luka u radijanima"
            formula={"l = r\\varphi"}
            note="Najkraća i najprirodnija formula kada je centralni ugao zadat u radijanima."
          />
          <FormulaCard
            title="Dužina luka u stepenima"
            formula={"l = \\frac{\\alpha}{360^\\circ}\\cdot 2\\pi r"}
            note="Kada je ugao dat u stepenima, uzimaš odgovarajući deo punog obima."
          />
          <FormulaCard
            title="Površina kružnog isečka"
            formula={"P_{\\text{isečka}} = \\frac{r^2\\varphi}{2} = \\frac{\\alpha}{360^\\circ}\\cdot \\pi r^2"}
            note="Isečak zauzima isti deo površine koji njegov ugao zauzima od punog ugla."
          />
          <FormulaCard
            title="Dužina tetive"
            formula={"AB = 2r\\sin\\frac{\\varphi}{2}"}
            note="Korisna formula kada su dati poluprečnik i centralni ugao, a traži se duž između dve tačke na kružnici."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Zašto važi l=r\u03C6">
            <p>
              Puni krug ima ugao <InlineMath>{"2\\pi"}</InlineMath> i obim{" "}
              <InlineMath>{"2\\pi r"}</InlineMath>. Ako neki ugao zauzima
              samo deo tog punog ugla, odgovarajući luk zauzima isti deo
              obima:
            </p>
            <MathBlock>
              {"\\frac{l}{2\\pi r}=\\frac{\\varphi}{2\\pi}\\quad \\Rightarrow \\quad l=r\\varphi."}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Poluprečnik 6 cm, ugao 60\u00B0">
            <p>
              Prvo pretvori ugao u radijane:
            </p>
            <MathBlock>{"60^\\circ = \\frac{\\pi}{3}."}</MathBlock>
            <p>Zatim:</p>
            <MathBlock>
              {"l = r\\varphi = 6 \\cdot \\frac{\\pi}{3} = 2\\pi \\text{ cm}."}
            </MathBlock>
            <p>Površina odgovarajućeg isečka je</p>
            <MathBlock>
              {"P_{\\text{isečka}}=\\frac{6^2\\cdot \\pi/3}{2}=6\\pi \\text{ cm}^2."}
            </MathBlock>
          </SectionCard>
        </div>

        <SectionCard title="Iz luka do poluprečnika">
          <p>
            Ako je dužina luka <InlineMath>{"4\\pi"}</InlineMath> cm, a
            centralni ugao{" "}
            <InlineMath>{"\\frac{2\\pi}{3}"}</InlineMath>, tada iz
            formule <InlineMath>{"l = r\\varphi"}</InlineMath>{" "}
            dobijaš:
          </p>
          <MathBlock>
            {"4\\pi = r\\cdot \\frac{2\\pi}{3}."}
          </MathBlock>
          <p>
            Množenjem sa{" "}
            <InlineMath>{"\\frac{3}{2\\pi}"}</InlineMath> sledi{" "}
            <InlineMath>{"r = 6"}</InlineMath> cm. Ovo je čest prijemni
            obrazac: jedna formula, ali moraš pravilno prepoznati koja je
            nepoznata veličina.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera 3: koliko radijana ima ugao od 45\u00B0?"
          answer={
            <p>
              Pošto <InlineMath>{"180^\\circ = \\pi"}</InlineMath>,
              deljenjem sa <InlineMath>{"4"}</InlineMath> dobijamo:
              <MathBlock>{"45^\\circ = \\frac{\\pi}{4}."}</MathBlock>
            </p>
          }
        />
        <MicroCheck
          question="Mikro-provera 4: šta se dešava sa površinom kada poluprečnik postane duplo veći?"
          answer={
            <p>
              Površina se množi sa{" "}
              <InlineMath>{"2^2 = 4"}</InlineMath>. Dakle, duplo veći
              poluprečnik daje četiri puta veću površinu kruga.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. ČETVOROUGLOVI ═══════════ */}
      <LessonSection
        id="cetvorouglovi"
        eyebrow="Tetivni i tangentni četvorouglovi"
        title="Dva posebna četvorougla koja stalno izlaze na prijemnom"
        description={'U ovoj lekciji naziv \u201Etetivni \u010Detvorougao\u201C koristimo za \u010Detvorougao \u010Dija sva temena le\u017Ee na jednoj kru\u017Enici. \u201ETangentni \u010Detvorougao\u201C je \u010Detvorougao oko kog mo\u017Ee da se upi\u0161e kru\u017Enica, odnosno njegova svaka stranica dodiruje tu kru\u017Enicu. Ova dva tipa ne treba me\u0161ati: jedan je vezan za temena na kru\u017Enici, a drugi za stranice koje dodiruju kru\u017Enicu.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Tetivni četvorougao">
            <p>
              Četvorougao <InlineMath>{"ABCD"}</InlineMath> je tetivni ako
              sva četiri temena leže na istoj kružnici. Njegova najvažnija
              osobina za zadatke je:
            </p>
            <MathBlock>
              {"\\angle A + \\angle C = 180^\\circ, \\qquad \\angle B + \\angle D = 180^\\circ"}
            </MathBlock>
            <p>
              Kada u zadatku vidiš da je četvorougao upisan u kružnicu, odmah
              proveravaj naspramne uglove.
            </p>
          </SectionCard>
          <SectionCard title="Tangentni četvorougao">
            <p>
              Četvorougao je tangentni ako se u njega može upisati kružnica
              koja dodiruje sve četiri stranice. Najvažnija relacija je zbir
              naspramnih stranica:
            </p>
            <MathBlock>{"a + c = b + d"}</MathBlock>
            <p>
              Ova formula je često dovoljna da iz jedne nepoznate odrediš
              drugu bez ikakvog komplikovanog crtanja.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Upisan u kružnicu"
            formula={"\\text{temena } \\in \\text{ kružnica}"}
            note="Ako tekst kaže da su sva temena na kružnici ili da je četvorougao upisan u kružnicu, razmišljaj o tetivnom četvorouglu."
          />
          <FormulaCard
            title="Naspramni uglovi su suplementni"
            formula={"\\angle C = 180^\\circ - \\angle A"}
            note="Ovo znači da im je zbir 180\u00B0. Jedan ugao često dobijaš odmah oduzimanjem od 180\u00B0."
          />
          <FormulaCard
            title="Oko četvorougla je upisana kružnica"
            formula={"\\text{stranice tangentne na kružnicu}"}
            note="Ako svaka stranica dodiruje istu kružnicu, radi se o tangentnom četvorouglu."
          />
          <FormulaCard
            title="Zbir naspramnih stranica"
            formula="a + c = b + d"
            note="Najčešće služi za određivanje nepoznate stranice ili proveru da li je četvorougao uopšte tangentni."
          />
          <FormulaCard
            title="Iz iste spoljašnje tačke tangente su jednake"
            formula="TA = TB"
            note="Ova ideja objašnjava zašto se u tangentnom četvorouglu javlja relacija između zbirova naspramnih stranica."
          />
          <FormulaCard
            title="Traži skrivenu relaciju"
            formula={"\\text{upisanost} \\Rightarrow \\text{uslov}"}
            note={'Kad zadatak izgleda \u201Ebez dovoljno podataka\u201C, proveri da li upravo upisanost ili tangentnost dodaje jedan skriven uslov.'}
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Nepoznati ugao u tetivnom četvorouglu">
            <p>
              Ako je u tetivnom četvorouglu{" "}
              <InlineMath>{"\\angle A = 68^\\circ"}</InlineMath>, tada je
            </p>
            <MathBlock>
              {"\\angle C = 180^\\circ - 68^\\circ = 112^\\circ."}
            </MathBlock>
            <p>
              Ovo je tip zadatka koji treba rešavati za nekoliko sekundi.
            </p>
          </SectionCard>
          <SectionCard title="Nepoznata stranica u tangentnom četvorouglu">
            <p>
              Neka su stranice{" "}
              <InlineMath>{"a=7"}</InlineMath>,{" "}
              <InlineMath>{"b=9"}</InlineMath>,{" "}
              <InlineMath>{"c=11"}</InlineMath> i{" "}
              <InlineMath>{"d=x"}</InlineMath>. Pošto važi{" "}
              <InlineMath>{"a+c=b+d"}</InlineMath>, dobijamo:
            </p>
            <MathBlock>
              {"7+11=9+x \\Rightarrow x=9."}
            </MathBlock>
          </SectionCard>
        </div>

        <SectionCard title="Zašto se tetivni i tangentni četvorougao lako pomešaju?">
          <p>
            Zato što oba imaju veze sa kružnicom, ali na različit način. Kod
            tetivnog su <em>temena</em> na kružnici. Kod tangentnog su{" "}
            <em>stranice</em> tangentne na kružnicu. Na skici to izgleda
            slično samo ako se crtež posmatra površno. Zato na ispitu
            obavezno pročitaj da li je kružnica opisana oko četvorougla ili
            upisana u četvorougao.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera 5: kada četvorougao ne može biti tetivni?"
          answer={
            <p>
              Ako zbir jednog para naspramnih uglova nije{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>, četvorougao ne može
              biti tetivni. Na primer, uglovi{" "}
              <InlineMath>{"95^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"70^\\circ"}</InlineMath> ne mogu biti naspramni
              uglovi tetivnog četvorougla jer im je zbir{" "}
              <InlineMath>{"165^\\circ"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni laboratorijum"
        title="Menjaj ugao i temena i gledaj kako se menjaju relacije"
        description="Laboratorija ima dva režima. U prvom posmatraš kako centralni ugao upravlja lukom, tetivom i površinom kružnog isečka. U drugom režimu pomeraš temena tetivnog četvorougla i vidiš da zbir naspramnih uglova ostaje 180\u00B0, bez obzira na oblik četvorougla."
      >
        <CircleLab />
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade osećaj za tipične prijemne zadatke"
        description="Primeri su poređani tako da prvo uvežbaš čiste formule, zatim njihov smisao, a na kraju i relacije u četvorouglovima vezanim za krug."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Dužina luka kada je ugao već u radijanima
            </h3>
            <p>
              Dat je krug poluprečnika{" "}
              <InlineMath>{"r = 9"}</InlineMath> cm i centralni ugao{" "}
              <InlineMath>{"\\varphi = \\frac{2\\pi}{5}"}</InlineMath>.
              Odredi dužinu luka.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Ugao je već u radijanima, formula je odmah spremna."
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Uvrsti u{" "}
                    <InlineMath>{"l = r\\varphi"}</InlineMath>:
                  </>
                }
              >
                <MathBlock>
                  {"l = 9 \\cdot \\frac{2\\pi}{5} = \\frac{18\\pi}{5}\\text{ cm}."}
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Poenta: nema potrebe za prebacivanjem u stepene ako su radijani
              već dati.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Površina isečka kada je ugao dat u stepenima
            </h3>
            <p>
              U krugu poluprečnika <InlineMath>{"8"}</InlineMath> cm
              centralni ugao iznosi{" "}
              <InlineMath>{"135^\\circ"}</InlineMath>. Nađi površinu
              kružnog isečka.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Koristi formulu sa stepenima:"
              >
                <MathBlock>
                  {"P_{\\text{isečka}} = \\frac{135^\\circ}{360^\\circ}\\cdot \\pi \\cdot 8^2."}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Sredi razlomak{" "}
                    <InlineMath>
                      {"\\frac{135}{360} = \\frac{3}{8}"}
                    </InlineMath>
                    .
                  </>
                }
              >
                <MathBlock>
                  {"P_{\\text{isečka}} = \\frac{3}{8}\\cdot 64\\pi = 24\\pi \\text{ cm}^2."}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Tetivni četvorougao i nepoznati ugao
            </h3>
            <p>
              U četvorouglu upisanom u kružnicu dato je{" "}
              <InlineMath>{"\\angle B = 74^\\circ"}</InlineMath>. Odredi{" "}
              <InlineMath>{"\\angle D"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={'Klju\u010Dna re\u010D je \u201Eupisanom u kru\u017Enicu\u201C, dakle \u010Detvorougao je tetivni.'}
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Naspramni uglovi imaju zbir{" "}
                    <InlineMath>{"180^\\circ"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {"\\angle D = 180^\\circ - 74^\\circ = 106^\\circ."}
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Poenta: ovde nema nikakvog dodatnog računa, samo brzo
              prepoznavanje obrasca.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Tangentni četvorougao i nepoznata stranica
            </h3>
            <p>
              Neka su stranice tangentnog četvorougla{" "}
              <InlineMath>{"a = x+1"}</InlineMath>,{" "}
              <InlineMath>{"b = 8"}</InlineMath>,{" "}
              <InlineMath>{"c = 12"}</InlineMath>,{" "}
              <InlineMath>{"d = 9"}</InlineMath>. Nađi{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Za tangentni četvorougao važi{" "}
                    <InlineMath>{"a+c=b+d"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"(x+1)+12 = 8+9."}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Sredi jednačinu:">
                <MathBlock>
                  {"x+13 = 17 \\Rightarrow x = 4."}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 — wide */}
          <article
            className={s.exampleCard}
            style={{ gridColumn: "1 / -1" }}
          >
            <h3 className={cs.tCardTitle}>
              Primer 5: Kombinovani prijemni tip — od ugla do luka i tetive
            </h3>
            <p>
              U krugu poluprečnika <InlineMath>{"10"}</InlineMath> cm
              centralni ugao iznosi{" "}
              <InlineMath>{"120^\\circ"}</InlineMath>. Odredi dužinu luka
              i dužinu odgovarajuće tetive.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvo pretvori ugao u radijane:">
                <MathBlock>
                  {"120^\\circ = \\frac{2\\pi}{3}."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Dužina luka:">
                <MathBlock>
                  {
                    "l = r\\varphi = 10\\cdot \\frac{2\\pi}{3} = \\frac{20\\pi}{3}\\text{ cm}."
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title="Dužina tetive koristi polovinu ugla:"
              >
                <MathBlock>
                  {
                    "AB = 2r\\sin\\frac{\\varphi}{2} = 20\\sin\\frac{\\pi}{3} = 20\\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\text{ cm}."
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovaj primer je dobar jer pokazuje da isti ugao upravlja i
              lukom i tetivom, ali preko različitih formula.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera 6: koju formulu bi prvo izabrao?"
          answer={
            <p>
              Ako su dati <InlineMath>{"r"}</InlineMath> i{" "}
              <InlineMath>{"\\varphi"}</InlineMath> u radijanima, prva
              reakcija treba da bude{" "}
              <InlineMath>{"l = r\\varphi"}</InlineMath>. Ako su dati
              naspramni uglovi u upisanom četvorouglu, prva reakcija treba da
              bude zbir <InlineMath>{"180^\\circ"}</InlineMath>. Uvek kreni
              od najkraće relacije.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 7. KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule i obrasci"
        title="Formule koje treba da prepoznaš na prvi pogled"
        description="Ove relacije nisu za puko memorisanje. Potrebno je da znaš i kada svaka od njih ima smisla."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Obim kruga"
            formula={"O = 2\\pi r"}
            note="Koristi se kada tražiš dužinu cele kružnice ili kada računaš deo obima preko ugla."
          />
          <FormulaCard
            title="Površina kruga"
            formula={"P = \\pi r^2"}
            note="Osnova za sve zadatke sa kružnim isečkom, odsečkom i obrtanjem ravnih figura."
          />
          <FormulaCard
            title="Dužina luka"
            formula={"l = r\\varphi"}
            note={
              <>
                Važi kada je <InlineMath>{"\\varphi"}</InlineMath> izražen u
                radijanima.
              </>
            }
          />
          <FormulaCard
            title="Površina kružnog isečka"
            formula={"P_{\\text{isečka}} = \\frac{r^2\\varphi}{2}"}
            note="Najlepša formula lekcije, ali opet samo za ugao u radijanima."
          />
          <FormulaCard
            title="Tetivni četvorougao"
            formula={"\\angle A + \\angle C = 180^\\circ"}
            note="Naspramni uglovi su suplementni."
          />
          <FormulaCard
            title="Tangentni četvorougao"
            formula="a + c = b + d"
            note="Zbir jednih naspramnih stranica jednak je zbiru drugih."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje se ne prave zbog neznanja, nego zbog žurbe"
        description="Većina grešaka u ovoj oblasti nastaje zato što učenik prebrzo posegne za formulom, a da nije proverio jedinicu mere ili vrstu četvorougla."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Stepeni ubačeni u radijansku formulu
            </h3>
            <p>
              Ako u <InlineMath>{"l = r\\varphi"}</InlineMath> direktno
              ubaciš <InlineMath>{"60"}</InlineMath> umesto{" "}
              <InlineMath>{"\\frac{\\pi}{3}"}</InlineMath>, dobiješ
              potpuno pogrešan rezultat. Prvo proveri jedinicu ugla.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje kruga i kružnice</h3>
            <p>
              Obim pripada kružnici, a površina krugu. To deluje sitno, ali
              često vodi i do pogrešne formule.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje tetivnog i tangentnog četvorougla
            </h3>
            <p>
              &ldquo;Upisan u kružnicu&rdquo; i &ldquo;oko njega je upisana
              kružnica&rdquo; nisu ista stvar. Jedno govori o temenima, drugo
              o stranicama.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljena polovina ugla kod tetive
            </h3>
            <p>
              U formuli za tetivu stoji{" "}
              <InlineMath>{"\\sin\\frac{\\varphi}{2}"}</InlineMath>, ne{" "}
              <InlineMath>{"\\sin\\varphi"}</InlineMath>. To je česta
              greška kada se formula koristi bez razumevanja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Automatsko korišćenje decimalnog{" "}
              <InlineMath>{"\\pi"}</InlineMath>
            </h3>
            <p>
              Na prijemnom često je bolje ostaviti rezultat u obliku sa{" "}
              <InlineMath>{"\\pi"}</InlineMath>, npr.{" "}
              <InlineMath>{"6\\pi"}</InlineMath>, osim ako zadatak izričito
              traži približnu vrednost.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Nepotpuna provera odgovora</h3>
            <p>
              Ako dobiješ luk duži od celog obima ili ugao veći od{" "}
              <InlineMath>{"180^\\circ"}</InlineMath> tamo gde geometrijski
              nema smisla, zastani i proveri račun.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se tema pojavljuje na prijemnom i gde su tipične zamke"
        description="Zadatak je često postavljen tako da izgleda duže nego što jeste. Tvoja prednost je da odmah prepoznaš ključnu relaciju i preskočiš nepotrebne korake."
      >
        <div className={s.grid3}>
          <SectionCard title="Tip 1: računanje luka ili isečka">
            <p>
              Proveri da li je ugao u stepenima ili radijanima. Tek posle
              toga biraš formulu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: skriveni radijani">
            <p>
              Ako je dat odnos luka i poluprečnika, zadatak te često navodi
              da sam otkriješ meru ugla u radijanima.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: četvorougao upisan u kružnicu">
            <p>
              Traži se nepoznati ugao, a jedini pravi potez je zbir
              naspramnih uglova jednak{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: tangentni četvorougao">
            <p>
              Jedna nepoznata stranica ili parametar rešava se relacijom{" "}
              <InlineMath>{"a+c=b+d"}</InlineMath>, bez dodatnog crtanja.
            </p>
          </SectionCard>
          <SectionCard title="Tip 5: kombinovanje sa trouglovima">
            <p>
              Često se krug kombinuje sa pravouglim ili jednakokrakim
              trouglom, pa ti uz formulu za luk treba i Pitagora ili
              trigonometrija.
            </p>
          </SectionCard>
          <SectionCard title="Tip 6: proveri razumnost">
            <p>
              Ako dobiješ da je deo kruga veći od celog kruga ili da zbir
              naspramnih uglova nije{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>, nešto si pomešao u
              postavci.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brza prijemna kontrolna lista">
          <p>
            1. Šta je dato: poluprečnik, ugao, luk, tangenta ili tip
            četvorougla? 2. U kojim jedinicama je ugao? 3. Da li postoji
            jedna kratka relacija koja zatvara zadatak? Ako na ova tri pitanja
            odgovoriš odmah, već si ispred većine tipičnih grešaka.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe na kraju lekcije"
        title="Proveri da li zaista vidiš obrasce, a ne samo formule"
        description="Pokušaj prvo samostalno, bez gledanja rešenja. Ako zapneš, vrati se na odgovarajuću sekciju i proveri koji signal iz zadatka si propustio."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                U krugu je <InlineMath>{"r = 5"}</InlineMath> cm i{" "}
                <InlineMath>
                  {"\\varphi = \\frac{3\\pi}{5}"}
                </InlineMath>
                . Odredi dužinu odgovarajućeg luka.
              </p>
            }
            solution={
              <>
                <p>
                  Koristi <InlineMath>{"l = r\\varphi"}</InlineMath>:
                </p>
                <MathBlock>
                  {
                    "l = 5 \\cdot \\frac{3\\pi}{5} = 3\\pi \\text{ cm}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Poluprečnik kruga je <InlineMath>{"12"}</InlineMath> cm, a
                centralni ugao <InlineMath>{"150^\\circ"}</InlineMath>.
                Odredi površinu kružnog isečka.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "P_{\\text{isečka}} = \\frac{150^\\circ}{360^\\circ}\\cdot \\pi \\cdot 12^2 = \\frac{5}{12}\\cdot 144\\pi = 60\\pi \\text{ cm}^2."
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                U tetivnom četvorouglu jedan ugao iznosi{" "}
                <InlineMath>{"97^\\circ"}</InlineMath>. Koliki je naspramni
                ugao?
              </p>
            }
            solution={
              <>
                <p>
                  Naspramni uglovi u tetivnom četvorouglu daju{" "}
                  <InlineMath>{"180^\\circ"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {"180^\\circ - 97^\\circ = 83^\\circ."}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                U tangentnom četvorouglu važe{" "}
                <InlineMath>{"a = 6"}</InlineMath>,{" "}
                <InlineMath>{"b = 10"}</InlineMath>,{" "}
                <InlineMath>{"c = 9"}</InlineMath>. Nađi četvrtu stranicu{" "}
                <InlineMath>{"d"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Iz <InlineMath>{"a+c=b+d"}</InlineMath> sledi
                </p>
                <MathBlock>
                  {"6+9=10+d \\Rightarrow d=5."}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Izračunaj meru ugla u radijanima ako je ugao{" "}
                <InlineMath>{"225^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "225^\\circ = \\frac{225}{180}\\pi = \\frac{5\\pi}{4}."
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Luk u krugu poluprečnika <InlineMath>{"4"}</InlineMath> cm
                ima dužinu <InlineMath>{"2\\pi"}</InlineMath> cm. Odredi
                centralni ugao u radijanima.
              </p>
            }
            solution={
              <>
                <p>
                  Iz <InlineMath>{"l = r\\varphi"}</InlineMath> dobijamo
                </p>
                <MathBlock>
                  {
                    "2\\pi = 4\\varphi \\Rightarrow \\varphi = \\frac{\\pi}{2}."
                  }
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ 11. KLJUČNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka"
        title="Jedan ugao upravlja više različitih veličina"
      >
        <InsightCard title="Glavni uvid lekcije">
          <p>
            Kada u krugu vidiš centralni ugao, zapravo vidiš više stvari
            odjednom: deo obima, deo površine, odgovarajuću tetivu i često
            put ka rešavanju većeg planimetrijskog zadatka. Zato je važno da
            iz crteža odmah &ldquo;prevedeš&rdquo; ugao u ono što zadatak
            zaista traži.
          </p>
          <MathBlock>
            {
              "\\varphi \\quad \\Longrightarrow \\quad l,\\ P_{\\text{isečka}},\\ AB,\\ \\text{relacije u zadatku}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 12. REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Kružnica i krug</h3>
            <p>
              Razlikuj kružnicu od kruga: kružnica ima obim, krug ima
              površinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Osnovne formule</h3>
            <p>
              Za krug važe{" "}
              <InlineMath>{"O = 2\\pi r"}</InlineMath> i{" "}
              <InlineMath>{"P = \\pi r^2"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Luk i isečak</h3>
            <p>
              Najprirodnije formule su{" "}
              <InlineMath>{"l = r\\varphi"}</InlineMath> i{" "}
              <InlineMath>
                {"P_{\\text{isečka}} = \\frac{r^2\\varphi}{2}"}
              </InlineMath>
              , ali samo kada je ugao u radijanima.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Tetivni četvorougao</h3>
            <p>
              Naspramni uglovi daju{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Tangentni četvorougao</h3>
            <p>
              Zbir jednih naspramnih stranica jednak je zbiru drugih:{" "}
              <InlineMath>{"a+c=b+d"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći korak</h3>
            <p>
              Prenesi ove ideje na stereometriju, posebno na valjak, kupu i
              zadatke gde se ravni preseci svode na planimetriju kruga.
            </p>
          </article>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
