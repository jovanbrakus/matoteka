"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

/* ────────────────────────────────────────────
   Interactive 2x2 System Lab
   ──────────────────────────────────────────── */

interface SystemResult {
  delta: number;
  type: "unique" | "infinite" | "none";
  x?: number;
  y?: number;
  geometry: string;
  hint: string;
}

function classifySystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): SystemResult {
  const EPS = 1e-9;
  const delta = a1 * b2 - a2 * b1;

  const kind = (a: number, b: number, c: number) => {
    if (Math.abs(a) < EPS && Math.abs(b) < EPS) {
      return Math.abs(c) < EPS ? "all" : "none";
    }
    return "line";
  };

  const k1 = kind(a1, b1, c1);
  const k2 = kind(a2, b2, c2);

  if (k1 === "none" || k2 === "none") {
    return {
      delta,
      type: "none",
      geometry: "Bar jedna jednačina je kontradiktorna.",
      hint: "Sistem nema rešenje.",
    };
  }

  if (k1 === "all" || k2 === "all") {
    return {
      delta,
      type: "infinite",
      geometry: "Jedna jednačina ne ogranicava; beskonačno mnogo rešenja.",
      hint: "Sistem je zavisan.",
    };
  }

  if (Math.abs(delta) > EPS) {
    const deltaX = c1 * b2 - c2 * b1;
    const deltaY = a1 * c2 - a2 * c1;
    const x = deltaX / delta;
    const y = deltaY / delta;
    return {
      delta,
      type: "unique",
      x,
      y,
      geometry: `Prave se seku u tački (${fmt(x)}, ${fmt(y)}).`,
      hint: "Jedinstveno rešenje (Kramer).",
    };
  }

  // delta = 0 — check proportionality of free terms
  const prop = (u1: number, u2: number, v1: number, v2: number) =>
    Math.abs(u1 * v2 - u2 * v1) < EPS;
  const sameLeft = prop(a1, b1, a2, b2);
  const sameRight = prop(a1, c1, a2, c2) && prop(b1, c1, b2, c2);

  if (sameLeft && sameRight) {
    return {
      delta,
      type: "infinite",
      geometry: "Prave se poklapaju; beskonačno mnogo rešenja.",
      hint: "Sistem je zavisan.",
    };
  }

  return {
    delta,
    type: "none",
    geometry: "Prave su paralelne i različite; nema rešenja.",
    hint: "Sistem je nemogući.",
  };
}

function fmt(v: number): string {
  const r = Math.round(v * 100) / 100;
  if (Number.isInteger(r)) return String(r);
  return r.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function SystemLab() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(2);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(-1);
  const [c2, setC2] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const W = rect.width;
    const H = rect.height;
    const PAD = 40;
    const xMin = -8,
      xMax = 8,
      yMin = -8,
      yMax = 8;

    const toX = (x: number) =>
      PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD);
    const toY = (y: number) =>
      H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);

    // Background
    ctx.fillStyle = "rgba(11, 7, 5, 0.94)";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = xMin; x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toX(x), PAD);
      ctx.lineTo(toX(x), H - PAD);
      ctx.stroke();
    }
    for (let y = yMin; y <= yMax; y++) {
      ctx.beginPath();
      ctx.moveTo(PAD, toY(y));
      ctx.lineTo(W - PAD, toY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(255, 215, 185, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(toX(xMin), toY(0));
    ctx.lineTo(toX(xMax), toY(0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(yMin));
    ctx.lineTo(toX(0), toY(yMax));
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 215, 185, 0.8)";
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText("x", W - PAD + 10, toY(0) + 4);
    ctx.fillText("y", toX(0) + 8, PAD - 8);

    // Draw a line ax + by = c
    const drawLine = (
      la: number,
      lb: number,
      lc: number,
      color: string
    ) => {
      const EPS = 1e-9;
      const pts: { x: number; y: number }[] = [];
      if (Math.abs(lb) > EPS) {
        const yL = (lc - la * xMin) / lb;
        const yR = (lc - la * xMax) / lb;
        if (yL >= yMin - 1 && yL <= yMax + 1) pts.push({ x: xMin, y: yL });
        if (yR >= yMin - 1 && yR <= yMax + 1) pts.push({ x: xMax, y: yR });
      }
      if (Math.abs(la) > EPS) {
        const xB = (lc - lb * yMin) / la;
        const xT = (lc - lb * yMax) / la;
        if (xB >= xMin - 1 && xB <= xMax + 1) pts.push({ x: xB, y: yMin });
        if (xT >= xMin - 1 && xT <= xMax + 1) pts.push({ x: xT, y: yMax });
      }
      // Deduplicate
      const uniq: { x: number; y: number }[] = [];
      for (const p of pts) {
        if (!uniq.some((q) => Math.abs(q.x - p.x) < 0.001 && Math.abs(q.y - p.y) < 0.001)) {
          uniq.push(p);
        }
      }
      if (uniq.length >= 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(toX(uniq[0].x), toY(uniq[0].y));
        ctx.lineTo(toX(uniq[1].x), toY(uniq[1].y));
        ctx.stroke();
      }
    };

    drawLine(a1, b1, c1, "rgba(236, 91, 19, 0.9)");
    drawLine(a2, b2, c2, "rgba(136, 216, 255, 0.9)");

    // Intersection point
    const result = classifySystem(a1, b1, c1, a2, b2, c2);
    if (result.type === "unique" && result.x !== undefined && result.y !== undefined) {
      ctx.beginPath();
      ctx.arc(toX(result.x), toY(result.y), 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(107, 223, 183, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(107, 223, 183, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [a1, b1, c1, a2, b2, c2]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const result = classifySystem(a1, b1, c1, a2, b2, c2);

  const presets = [
    { label: "Jedno rešenje", vals: [1, 1, 2, 1, -1, 0] },
    { label: "Beskonačno mnogo", vals: [1, 1, 2, 2, 2, 4] },
    { label: "Nema rešenja", vals: [1, 1, 2, 2, 2, 5] },
    { label: "Mesoviti koef.", vals: [2, 1, 5, -1, 2, 1] },
  ];

  const setPreset = (vals: number[]) => {
    setA1(vals[0]);
    setB1(vals[1]);
    setC1(vals[2]);
    setA2(vals[3]);
    setB2(vals[4]);
    setC2(vals[5]);
  };

  const slider = (
    label: string,
    value: number,
    setter: (v: number) => void,
    hint: string
  ) => (
    <div style={{ display: "grid", gap: 4 }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 600,
          color: "var(--muted-strong, #e8d5c4)",
        }}
      >
        <InlineMath>{label}</InlineMath>
        <span
          style={{
            display: "inline-flex",
            minWidth: 44,
            justifyContent: "center",
            padding: "4px 8px",
            borderRadius: 999,
            background: "rgba(236, 91, 19, 0.12)",
            color: "var(--primary-soft, #ec5b13)",
            border: "1px solid rgba(236, 91, 19, 0.18)",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </label>
      <input
        type="range"
        min={-4}
        max={4}
        step={1}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--primary, #ec5b13)" }}
      />
      <span style={{ color: "var(--muted, #a68a72)", fontSize: "0.93rem" }}>
        {hint}
      </span>
    </div>
  );

  return (
    <>
      <div className={s.grid2}>
        {/* Controls panel */}
        <SectionCard title="Kontrole">
          <div style={{ display: "grid", gap: 14 }}>
            {slider("a_1", a1, setA1, "Prva jednačina: a_1 x + b_1 y = c_1")}
            {slider("b_1", b1, setB1, "")}
            {slider("c_1", c1, setC1, "Slobodan član pomera pravu.")}
            {slider("a_2", a2, setA2, "Druga jednačina: a_2 x + b_2 y = c_2")}
            {slider("b_2", b2, setB2, "")}
            {slider("c_2", c2, setC2, "")}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPreset(p.vals)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--muted-strong, #e8d5c4)",
                    border: "1px solid rgba(255,154,106,0.16)",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                background: "rgba(9,4,3,0.54)",
                border: "1px solid rgba(255,154,106,0.12)",
              }}
            >
              <p style={{ color: "var(--muted, #a68a72)", fontSize: "0.93rem" }}>
                Pokušaj da pre pomeranja klizaca prvo napamet predvidiš da li ce
                sistem imati jedno, nijedno ili beskonačno mnogo rešenja. Zatim
                proveri grafik.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Canvas */}
        <div
          style={{
            position: "relative",
            minHeight: 400,
            borderRadius: "var(--radius-lg, 24px)",
            overflow: "hidden",
            border: "1px solid rgba(255,154,106,0.18)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)), rgba(11,7,5,0.94)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Readout cards */}
      <div className={s.grid3} style={{ marginTop: 16 }}>
        <SectionCard title="Determinanta">
          <p>
            <InlineMath>{`\\Delta = ${result.delta}`}</InlineMath>
          </p>
        </SectionCard>
        <SectionCard title="Tip sistema">
          <p>
            {result.type === "unique" && "Jedinstveno rešenje."}
            {result.type === "infinite" && "Beskonačno mnogo rešenja."}
            {result.type === "none" && "Nema rešenja."}
          </p>
        </SectionCard>
        <SectionCard title="Geometrija">
          <p>{result.geometry}</p>
        </SectionCard>
      </div>
      {result.type === "unique" &&
        result.x !== undefined &&
        result.y !== undefined && (
          <div style={{ marginTop: 12 }}>
            <SectionCard title="Kramerov ishod">
              <p>
                <InlineMath>{`x = ${fmt(result.x)},\\quad y = ${fmt(result.y)}`}</InlineMath>
              </p>
            </SectionCard>
          </div>
        )}
    </>
  );
}

/* ────────────────────────────────────────────
   NAV LINKS
   ──────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnovna-ideja", label: "Osnovna ideja" },
  { href: "#metode-2x2", label: "Metode za 2x2" },
  { href: "#kramer", label: "Kramerovo pravilo" },
  { href: "#gaus", label: "Gausov algoritam" },
  { href: "#parametar", label: "Parametar i broj rešenja" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ────────────────────────────────────────────
   LESSON 17 PAGE
   ──────────────────────────────────────────── */

export default function Lesson17Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 17"
        title={
          <>
            Sistemi linearnih jednačina{" "}
            <span className={cs.tHeroAccent}>
              Kramerovo pravilo i Gausov algoritam
            </span>
          </>
        }
        description="Kada vidiš sistem jednačina, ne gledas dve ili tri zasebne formule, već tražis zajedničko rešenje. Upravo ta promena perspektive čini ovu lekciju važnom. Za prijemni nije dovoljno da znaš da računaš: moraš da prepoznaš koji metod je najbrži, kada determinant pomaže, a kada moraš da pređeš na pažljivu diskusiju slučajeva."
        heroImageSrc="/api/lessons/17/hero"
        heroImageAlt="Ilustracija sistema linearnih jednačina, Kramerovog pravila i Gausovog algoritma"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da rešavaš sisteme 2x2 i 3x3, kako da biras metod i kako da procenis broj rešenja.",
          },
          {
            label: "Najveća zamka",
            description:
              "Zaključak da iz Δ = 0 automatski sledi da sistem nema rešenje. To nikako nije dovoljno.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Parametarski sistemi, mali aritmetički detalji u determinantama i pravilna upotreba Gausove eliminacije.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "Oko 75 minuta za teoriju, vođene primere i interaktivni deo.",
          },
          {
            label: "Predznanje",
            description:
              "Linearne jednačine, determinante drugog i trećeg reda i rad sa razlomcima.",
          },
          {
            label: "Glavna veština",
            description:
              "Da za svaki sistem brzo odabereš odgovarajuči metod i sigurno proveriš broj rešenja.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za sistem 2x2 sa trenutnim prikazom pravih, determinante i tipa sistema.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Sistem jednačina se pojavljuje svuda"
        description="Sistemi linearnih jednačina se pojavljuju kao prirodan nastavak linearne funkcije: više uslova odjednom treba zadovoljiti istim nepoznatim veličinama."
      >
        <div className={s.grid3}>
          <SectionCard title="Na prijemnom proverava više stvari odjednom">
            <p>
              Jedan zadatak može istovremeno da proveri računanje, logiku,
              geometrijsku interpretaciju, pažnju na parametar i organizaciju
              rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Uči te da biras metod, ne samo da računaš">
            <p>
              Nije poenta da svaki sistem rešavaš istom tehnikom. Nekad je zamena
              najkraća, nekad suprotni koeficijenti, nekad determinant, a nekad
              Gausov algoritam.
            </p>
          </SectionCard>
          <SectionCard title="Priprema za složenije oblasti">
            <p>
              Matrice, vektori, analiticka geometrija i linearna algebra kasnije
              se oslanjaju upravo na ideje koje ovde prvi put srećeš:
              kompatibilnost uslova, rang, eliminaciju i tumacenje broja rešenja.
            </p>
          </SectionCard>
        </div>
        <MicroCheck
          question="Mikro-provera: Šta je glavna mentalna promena u odnosu na jednu jednačinu?"
          answer={
            <p>
              Kod sistema ne tražis broj koji zadovoljava jednu relaciju, vec
              uređeni par ili trojku koja istovremeno zadovoljava sve relacije. To
              znači da svaka transformacija mora da sačuva baš taj zajednički skup
              rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnovna-ideja"
        eyebrow="Osnovna ideja"
        title="Šta zapravo predstavlja sistem"
        description="Sistem linearnih jednačina je skup linearnih jednačina koje imaju iste nepoznate. Rešenje sistema je svaka vrednost nepoznatih koja sve jednačine čini tacnim u isto vreme."
      >
        <div className={s.grid3}>
          <SectionCard title="Opšti oblik sistema 2x2">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y=c_1 \\\\ a_2x+b_2y=c_2 \\end{cases}"
              }
            </MathBlock>
            <p>
              Ovde su <InlineMath>{"x"}</InlineMath> i{" "}
              <InlineMath>{"y"}</InlineMath> nepoznate, a koeficijenti{" "}
              <InlineMath>{"a_1,b_1,c_1,a_2,b_2,c_2"}</InlineMath> zadati
              brojevi.
            </p>
          </SectionCard>

          <SectionCard title="Geometrijska slika">
            <p>
              Svaka linearna jednačina sa dve nepoznate predstavlja pravu u ravni.
              Zato sistem <InlineMath>{"2\\times2"}</InlineMath> znači: tražimo
              tačku koja pripada i prvoj i drugoj pravoj.
            </p>
            <p style={{ marginTop: 8 }}>
              Jedno rešenje &harr; prave se seku u jednoj tački
              <br />
              Nema rešenja &harr; prave su paralelne i različite
              <br />
              Beskonačno mnogo rešenja &harr; prave se poklapaju
            </p>
          </SectionCard>

          <SectionCard title="Sistem 3x3">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y+c_1z=d_1 \\\\ a_2x+b_2y+c_2z=d_2 \\\\ a_3x+b_3y+c_3z=d_3 \\end{cases}"
              }
            </MathBlock>
            <p>
              Geometrijska slika je sada složenija jer svaka jednačina predstavlja
              ravan u prostoru. Zato se u praksi češće oslanjamo na algoritam i
              račun nego na čisto vizuelnu interpretaciju.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Najvažnija poruka">
          <p>
            Sistem nije zbir odvojenih jednačina. Uvek razmisljaj o{" "}
            <strong>zajedničkom resenju</strong>, odnosno o preseku svih uslova.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Da li sistem može imati tačno dva rešenja?"
          answer={
            <p>
              Za linearni sistem <InlineMath>{"2\\times2"}</InlineMath> ne može.
              Dve prave mogu da seku u jednoj tački, da se ne seku ili da se
              poklapaju. Dakle: jedno, nijedno ili beskonačno mnogo rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ METODE ZA 2x2 ═══════════ */}
      <LessonSection
        id="metode-2x2"
        eyebrow="Metode za sisteme 2x2"
        title="Zamena i suprotni koeficijenti"
        description="U srednjoškolskim zadacima za sistem sa dve nepoznate najčešće koristiš metodu zamene ili metodu suprotnih koeficijenata. Obe su tačne; razlika je u tome koja je zgodnija za konkretne brojeve."
      >
        <div className={s.grid2}>
          <SectionCard title="Metoda zamene">
            <p>
              Iz jedne jednačine izdvojis jednu nepoznatu, a zatim taj izraz
              uvrstis u drugu jednačinu. Ova metoda je odlična kada se jedna
              nepoznata lako izoluje, na primer kada joj je koeficijent{" "}
              <InlineMath>{"1"}</InlineMath> ili <InlineMath>{"-1"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izaberi jednačinu iz koje se nepoznata najlakse izdvaja." />
              <WalkStep
                number={2}
                title={
                  <>
                    Izrazi, na primer, <InlineMath>{"x"}</InlineMath> preko{" "}
                    <InlineMath>{"y"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={3} title="Taj izraz zameni u drugoj jednačini." />
              <WalkStep number={4} title="Reši dobijenu jednačinu sa jednom nepoznatom." />
              <WalkStep number={5} title="Vraćanjem izračunaj drugu nepoznatu." />
            </div>
          </SectionCard>

          <SectionCard title="Metoda suprotnih koeficijenata">
            <p>
              Jednačine množiš pogodnim brojevima tako da koeficijenti uz jednu
              nepoznatu postanu suprotni, pa se sabiranjem ta nepoznata eliminise.
              Ovo je često najbrži put kada su koeficijenti celi brojevi.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odaberi koju nepoznatu eliminises." />
              <WalkStep number={2} title="Pomnozi jednačine tako da koeficijenti uz tu nepoznatu budu suprotni." />
              <WalkStep number={3} title="Saberi jednačine i dobijas novu jednačinu sa jednom nepoznatom." />
              <WalkStep number={4} title="Izračunaj prvu nepoznatu." />
              <WalkStep number={5} title="Uvrsti nazad i nađi drugu." />
            </div>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Kada biras zamenu"
            formula={"x = \\ldots \\text{ ili koeficijent } \\pm 1"}
            note="Ako u jednačini već imaš oblik gde je jedna nepoznata lako izdvojiva, ne komplikuj: zamena je tada prirodna."
          />
          <FormulaCard
            title="Kada biras eliminaciju"
            formula={"\\text{NZS koeficijenata je pregledan}"}
            note="Ako su koeficijenti mali i lepo se usklađuju, eliminacija je često brza od uvrstanja razlomaka."
          />
          <FormulaCard
            title="Ne zaboravi proveru"
            formula={"(x_0, y_0) \\text{ mora zadovoljiti obe jednačine}"}
            note="Posebno kod prijemnog, brza provera na kraju otkriva grešku u znaku pre nego sto predas zadatak."
          />
        </div>

        <InsightCard title="Brz ispitni izbor">
          <p>
            Ako vidiš da će zamena odmah stvoriti razlomke, probaj eliminaciju.
            Ako eliminacija traži velika množenja, proveri da li je zamena
            elegantnija.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Za koji sistem je zamena prirodnija od eliminacije?"
          answer={
            <>
              <p>Za sistem</p>
              <MathBlock>
                {"\\begin{cases} x=2y+1\\\\ 3x-y=11 \\end{cases}"}
              </MathBlock>
              <p>
                zamena je prirodna jer je <InlineMath>{"x"}</InlineMath> vec
                izdvojen. Nema smisla dodatno preuredivati jednačine.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ KRAMEROVO PRAVILO ═══════════ */}
      <LessonSection
        id="kramer"
        eyebrow="Kramerovo pravilo"
        title="Determinante u sluzbi sistema"
        description="Kramerovo pravilo koristi determinante da direktno izrazi nepoznate. To je elegantna metoda, ali važi samo kada je determinant koeficijenata različit od nule."
      >
        <div className={s.grid3}>
          <SectionCard title="Ideja za sistem 2x2">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y=c_1\\\\ a_2x+b_2y=c_2 \\end{cases}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\Delta = \\begin{vmatrix} a_1 & b_1\\\\ a_2 & b_2 \\end{vmatrix} = a_1b_2 - a_2b_1"
              }
            </MathBlock>
            <p>
              Ako je <InlineMath>{"\\Delta \\neq 0"}</InlineMath>, postoji
              jedinstveno rešenje:
            </p>
            <MathBlock>
              {"x=\\frac{\\Delta_x}{\\Delta},\\qquad y=\\frac{\\Delta_y}{\\Delta}"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Ideja za sistem 3x3">
            <p>
              Za tri nepoznate zamenjujes odgovarajucu kolonu koeficijenata
              kolonom slobodnih članova:
            </p>
            <MathBlock>
              {
                "\\Delta = \\begin{vmatrix} a_1 & b_1 & c_1\\\\ a_2 & b_2 & c_2\\\\ a_3 & b_3 & c_3 \\end{vmatrix}"
              }
            </MathBlock>
            <MathBlock>
              {
                "x=\\frac{\\Delta_x}{\\Delta},\\quad y=\\frac{\\Delta_y}{\\Delta},\\quad z=\\frac{\\Delta_z}{\\Delta}"
              }
            </MathBlock>
            <p>
              Opet je uslov isti: <InlineMath>{"\\Delta \\neq 0"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kada je metoda dobra, a kada nije">
            <p>
              Kramer je zgodan kada su brojevi mali, determinant se lako računa i
              kada želiš jasan kriterijum za jedinstveno rešenje. Ako su brojevi
              veliki ili sistem ima parametar koji komplikuje manje determinante,
              Gausov algoritam često bude pregledniji.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako računaš determinantu 3. reda">
            <p>
              U školskim zadacima najčešće koristiš Sarrusovo pravilo:
            </p>
            <MathBlock>
              {
                "\\begin{vmatrix} a & b & c\\\\ d & e & f\\\\ g & h & i \\end{vmatrix} = aei+bfg+cdh-ceg-bdi-afh"
              }
            </MathBlock>
            <p>
              Važno je da tri &ldquo;pozitivna&rdquo; i tri &ldquo;negativna&rdquo;
              proizvoda računaš pažljivo. Najviše grešaka nastaje upravo u poslednjem
              znaku.
            </p>
          </SectionCard>

          <SectionCard title="Pedagoški trik za pamćenje">
            <p>
              Nemoj pokušavati da mehanički pamtiš sest članova. Nacrtaj dve
              dodatne kolone i prati tri dijagonale nanize i tri dijagonale naviše.
              Vizuelni obrazac je mnogo pouzdaniji od suvog pamćenja.
            </p>
            <InsightCard title="Ali oprez">
              <p>
                Sarrusovo pravilo važi samo za determinantu trećeg reda, ne i za
                veće determinante.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Da li smeš primeniti Kramerovo pravilo kada je Δ=0?"
          answer={
            <p>
              Ne za računanje jedinstvenog rešenja. Kada je{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>, Kramerovo pravilo u
              standardnom obliku ne odlučuje da li sistem nema rešenje ili ih ima
              beskonačno mnogo. Tada radiš dodatnu diskusiju.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ GAUSOV ALGORITAM ═══════════ */}
      <LessonSection
        id="gaus"
        eyebrow="Gausov algoritam"
        title="Najuniverzalniji alat za rešavanje sistema"
        description="Gausov algoritam je najuniverzalniji alat za rešavanje sistema. Ideja je da nizom dozvoljenih transformacija postepeno pojednostavis sistem dok ne dobiješ trougaoni ili gotovo dijagonalni oblik."
      >
        <div className={s.grid3}>
          <SectionCard title="Proširena matrica">
            <p>Sistem zapisuješ u obliku proširene matrice:</p>
            <MathBlock>
              {
                "\\left[\\begin{array}{ccc|c} a_1 & b_1 & c_1 & d_1\\\\ a_2 & b_2 & c_2 & d_2\\\\ a_3 & b_3 & c_3 & d_3 \\end{array}\\right]"
              }
            </MathBlock>
            <p>
              Tako jasnije vidiš koje operacije primenjujes istovremeno na
              koeficijente i slobodne članove.
            </p>
          </SectionCard>

          <SectionCard title="Dozvoljene operacije">
            <ul>
              <li>Zamena mesta dva reda.</li>
              <li>Mnozenje reda nenultim brojem.</li>
              <li>Dodavanje jednom redu nekog višekratnika drugog reda.</li>
            </ul>
            <p>
              Ove operacije ne menjaju skup rešenja sistema. To je razlog zašto
              smeš da ih koristiš.
            </p>
          </SectionCard>

          <SectionCard title="Šta je cilj eliminacije">
            <p>
              Prvo ponistvas članove ispod vodeceg koeficijenta u prvoj koloni,
              zatim u drugoj, pa po potrebi i dalje. Kada dobiješ trougaoni
              sistem, poslednja jednačina obično sadrzi jednu nepoznatu, pa možes
              da krenes unazad.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Zašto je Gaus posebno važan">
            <p>
              Za razliku od Kramera, Gaus radi i kada sistem nema jedinstveno
              rešenje. Upravo zato je odličan za zadatke sa parametrom, za proveru
              kompatibilnosti i za sisteme sa više jednačina ili više nepoznatih.
            </p>
            <MathBlock>{"0x + 0y + 0z = 5"}</MathBlock>
            <p>
              Ako tokom eliminacije dobiješ ovakvu jednačinu, sistem je nemoguć.
              Ako dobiješ <InlineMath>{"0x+0y+0z=0"}</InlineMath>, jedan red je
              suvisan i sistem može imati beskonačno mnogo rešenja.
            </p>
          </SectionCard>

          <SectionCard title="Pedagoški savet za račun">
            <p>
              Ne juri odmah lepe brojeve. Ponekad je korisnije prvo zameniti
              redove da bi vodeci koeficijent bio{" "}
              <InlineMath>{"1"}</InlineMath> ili <InlineMath>{"-1"}</InlineMath>,
              jer time kasnije smanjujes opasnost od velikih razlomaka.
            </p>
            <InsightCard title="Prakticno pravilo">
              <p>
                Kada biras pivot, gledaj da bude broj sa kojim će eliminacija
                biti najčistija.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Zašto u Gausu moraš da transformises i slobodne članove?"
          answer={
            <p>
              Zato sto menjas celu jednačinu, ne samo njen levi deo. Ako bi
              transformisao samo koeficijente uz nepoznate, dobio bi sasvim
              drugi sistem i izgubio ekvivalentnost.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PARAMETAR I BROJ RESENJA ═══════════ */}
      <LessonSection
        id="parametar"
        eyebrow="Parametar i broj rešenja"
        title="Diskusija slučajeva"
        description="Parametarski zadaci su veoma cesti jer proveravaju da li razumeš mehanizam sistema, a ne samo jedan konkretan račun. Najvažnije je da sistematski razdvojis slučaj Δ ≠ 0 od slučaja Δ = 0."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Ako je Δ ≠ 0"
            formula={"\\Delta \\neq 0 \\Longrightarrow \\text{jedinstveno rešenje}"}
            note="Tu je priča zavrsena: sistem ima jedinstveno rešenje. Dalje možes računati Kramerom ili nekom drugom metodom."
          />
          <FormulaCard
            title="Ako je Δ = 0"
            formula={"\\Delta = 0 \\Longrightarrow \\text{dodatna provera}"}
            note="Ne donosiš još zaključak. Tada proveravaš da li su jednačine međusobno saglasne ili protivrečne."
          />
          <FormulaCard
            title="Iste prave ili paralelne prave"
            formula={"\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}\\ ?"}
            note="Kada su koeficijenti proporcionalni, odlučujes prema slobodnim članovima: ako su i oni proporcionalni, prave se poklapaju; ako nisu, prave su paralelne."
          />
        </div>

        {/* Classification table */}
        <div style={{ marginTop: 18, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 680,
              background: "rgba(13,7,5,0.72)",
              border: "1px solid rgba(255,154,106,0.14)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                {["Situacija", "Algebarski signal", "Geometrijsko znacenje", "Broj rešenja"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      color: "var(--accent, #ff9a6a)",
                      fontSize: "0.84rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid rgba(255,154,106,0.08)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Jedinstveno rešenje",
                  <InlineMath key="d1">{"\\Delta \\neq 0"}</InlineMath>,
                  "Dve prave seku se u jednoj tački",
                  "1",
                ],
                [
                  "Beskonačno mnogo rešenja",
                  <span key="d2">
                    <InlineMath>{"\\Delta=0"}</InlineMath> i sve proporcije
                    odgovaraju
                  </span>,
                  "Prave se poklapaju",
                  <InlineMath key="inf">{"\\infty"}</InlineMath>,
                ],
                [
                  "Nema rešenja",
                  <span key="d3">
                    <InlineMath>{"\\Delta=0"}</InlineMath>, ali slobodni članovi
                    kvare proporciju
                  </span>,
                  "Prave su paralelne i različite",
                  "0",
                ],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        borderBottom:
                          i < 2
                            ? "1px solid rgba(255,154,106,0.08)"
                            : "none",
                        color: "var(--muted-strong, #e8d5c4)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard title="Najčešća prijemna zamka">
          <p>
            Kandidat izračuna <InlineMath>{"\\Delta=0"}</InlineMath> i odmah
            napise &ldquo;nema rešenja&rdquo;. To je pogrešno. Prvo proveri da li
            je sistem možda zavisan, odnosno da li ima beskonačno mnogo rešenja.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Šta se događa sa sistemom x+y=2, 2x+2y=4?"
          answer={
            <p>
              Druga jednačina je samo dvostruka prve. To znači da obe opišuju
              istu pravu, pa sistem ima beskonačno mnogo rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Interaktivna laboratorija: sistem 2x2 uzivo"
        description="Menjaj koeficijente sistema i posmatraj kako se u isto vreme menja geometrijska slika, determinant i broj rešenja. Ovo je najbrži način da osetiš vezu između računa i grafika."
      >
        <SystemLab />

        <MicroCheck
          question="Kako da koristiš laboratoriju pametno?"
          answer={
            <div>
              <p>Za svaku novu postavku uradi kratki mentalni redosled:</p>
              <ul style={{ marginLeft: 18 }}>
                <li>
                  izračunaj ili proceni{" "}
                  <InlineMath>{"\\Delta=a_1b_2-a_2b_1"}</InlineMath>,
                </li>
                <li>predvidi broj rešenja,</li>
                <li>
                  zamisli geometriju: seku li se prave, poklapaju ili su
                  paralelne,
                </li>
                <li>tek onda proveri na canvas prikazu.</li>
              </ul>
            </div>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description="Ovde vidiš kako teorija prelazi u konkretan račun. Pokušaj da svaki primer prvo sam započneš, makar prvih nekoliko koraka, pa tek onda pogledaj kompletno vođenje."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: metoda zamene</h3>
            <p>Reši sistem</p>
            <MathBlock>
              {"\\begin{cases} x=2y+1\\\\ 3x-y=14 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Posto je <InlineMath>{"x"}</InlineMath> već izdvojen, odmah
                    ga menjamo u drugoj jednačini.
                  </>
                }
              />
              <WalkStep number={2} title="Dobijamo 3(2y+1)-y=14.">
                <MathBlock>{"6y+3-y=14,\\quad 5y=11"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Odatle je <InlineMath>{"y=\\frac{11}{5}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Vraćamo u <InlineMath>{"x=2y+1"}</InlineMath>:
                  </>
                }
              >
                <MathBlock>
                  {"x=2\\cdot\\frac{11}{5}+1=\\frac{27}{5}"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {"(x,y)=\\left(\\frac{27}{5},\\frac{11}{5}\\right)"}
            </MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: metoda suprotnih koeficijenata
            </h3>
            <p>Reši sistem</p>
            <MathBlock>
              {"\\begin{cases} 2x+3y=7\\\\ 4x-3y=5 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Koeficijenti uz <InlineMath>{"y"}</InlineMath> su vec
                    suprotni: <InlineMath>{"3"}</InlineMath> i{" "}
                    <InlineMath>{"-3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={2} title="Sabiranjem jednačina dobijamo 6x=12.">
                <p>
                  Pa je <InlineMath>{"x=2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Uvrstimo u prvu jednačinu.">
                <MathBlock>
                  {"2\\cdot 2+3y=7,\\quad 3y=3,\\quad y=1"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>{"(x,y)=(2,1)"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: sistem 3x3 Kramerovim pravilom
            </h3>
            <p>Reši sistem</p>
            <MathBlock>
              {
                "\\begin{cases} x+y+z=6\\\\ x-y+z=2\\\\ 2x+y-z=1 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Racunamo glavni determinant.">
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1&1&1\\\\ 1&-1&1\\\\ 2&1&-1 \\end{vmatrix} = 6 \\neq 0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Posto je Δ ≠ 0, postoji jedinstveno rešenje." />
              <WalkStep number={3} title="Racunamo pomoćne determinante.">
                <MathBlock>
                  {
                    "\\Delta_x=6,\\qquad \\Delta_y=12,\\qquad \\Delta_z=18"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Delimo sa Δ.">
                <MathBlock>
                  {
                    "x=\\frac{6}{6}=1,\\qquad y=\\frac{12}{6}=2,\\qquad z=\\frac{18}{6}=3"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: sistem 3x3 Gausovim algoritmom
            </h3>
            <p>Reši sistem</p>
            <MathBlock>
              {
                "\\begin{cases} x+y+z=4\\\\ 2x-y+z=1\\\\ 3x+y-z=2 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapišujemo proširenu matricu.">
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 2&-1&1&1\\\\ 3&1&-1&2 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Poništavamo prvu kolonu ispod pivota.">
                <MathBlock>
                  {"R_2 \\leftarrow R_2-2R_1,\\qquad R_3 \\leftarrow R_3-3R_1"}
                </MathBlock>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 0&-3&-1&-7\\\\ 0&-2&-4&-10 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Eliminisemo drugu kolonu.">
                <MathBlock>{"R_3 \\leftarrow 3R_3-2R_2"}</MathBlock>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 0&-3&-1&-7\\\\ 0&0&-10&-16 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Određujemo nepoznate unazad.">
                <MathBlock>
                  {
                    "z=\\frac{8}{5},\\qquad y=\\frac{9}{5},\\qquad x=\\frac{3}{5}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {
                "(x,y,z)=\\left(\\frac{3}{5},\\frac{9}{5},\\frac{8}{5}\\right)"
              }
            </MathBlock>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: diskusija sistema sa parametrom
            </h3>
            <p>
              Odredi broj rešenja sistema u zavisnosti od parametra{" "}
              <InlineMath>{"m"}</InlineMath>:
            </p>
            <MathBlock>
              {"\\begin{cases} x+y=2\\\\ mx+2y=3 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Racunamo determinantu.">
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1 & 1\\\\ m & 2 \\end{vmatrix} = 2-m"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Ako je <InlineMath>{"m \\neq 2"}</InlineMath>, determinant
                    nije nula i sistem ima jedinstveno rešenje.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Ako je <InlineMath>{"m=2"}</InlineMath>, sistem postaje:
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\begin{cases} x+y=2\\\\ 2x+2y=3 \\end{cases}"
                  }
                </MathBlock>
                <p>
                  Druga jednačina nije dvostruka prve, pa su prave paralelne i
                  različite.
                </p>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <p>
                Za <InlineMath>{"m \\neq 2"}</InlineMath> sistem ima jedno
                rešenje, a za <InlineMath>{"m=2"}</InlineMath> nema rešenja.
              </p>
            </InsightCard>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ovo mora da iskoci cim vidiš zadatak"
        description="Ovu sekciju posmatraj kao brzi pregled pred kontrolni ili prijemni: šta treba da zapamtiš, ali i kada to treba da upotrebis."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Glavni determinant (2x2)"
            formula={"\\Delta = a_1b_2 - a_2b_1"}
            note={
              <>
                Ako je <InlineMath>{"\\Delta \\neq 0"}</InlineMath>, sistem ima
                jedinstveno rešenje.
              </>
            }
          />
          <FormulaCard
            title="Kramer (2x2)"
            formula={"x=\\frac{\\Delta_x}{\\Delta},\\qquad y=\\frac{\\Delta_y}{\\Delta}"}
            note="Dobre su kada su koeficijenti mali i kada želiš brz kriterijum."
          />
          <FormulaCard
            title="Sarrus (determinanta 3. reda)"
            formula="aei+bfg+cdh-ceg-bdi-afh"
            note={
              <>
                Koristi ga za <InlineMath>{"\\Delta"}</InlineMath>,{" "}
                <InlineMath>{"\\Delta_x"}</InlineMath>,{" "}
                <InlineMath>{"\\Delta_y"}</InlineMath> i{" "}
                <InlineMath>{"\\Delta_z"}</InlineMath>, ali pažljivo prati
                znakove.
              </>
            }
          />
          <FormulaCard
            title="Elementarne transformacije (Gaus)"
            formula={"R_i \\leftrightarrow R_j,\\qquad R_i \\leftarrow \\lambda R_i,\\qquad R_i \\leftarrow R_i + \\lambda R_j"}
            note="Ovo je univerzalni metod, naročito koristan kada treba da otkriješ i nemoguć ili zavisan sistem."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da biras metod na prijemnom">
            <ul>
              <li>
                Ako je jedna nepoznata lako izdvojiva, kreni metodom zamene.
              </li>
              <li>
                Ako su koeficijenti mali i lako se ponistaju, uzmi suprotne
                koeficijente.
              </li>
              <li>
                Ako je zadatak napravljen oko determinanti, prirodno je probati
                Kramera.
              </li>
              <li>
                Ako sistem ima tri nepoznate ili parametar pravi više slučajeva,
                Gaus je često najsigurniji.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta nikako da ne preskočis">
            <ul>
              <li>
                Proveru da li je <InlineMath>{"\\Delta=0"}</InlineMath>.
              </li>
              <li>Kontrolu znakova u determinantama.</li>
              <li>Transformaciju i slobodnih članova u Gausu.</li>
              <li>
                Razdvajanje slučajeva kada parametar poništi neki koeficijent ili
                determinant.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se gube laki poeni"
        description="U ovoj lekciji greške retko dolaze iz neznanja formule. Češće dolaze iz brzine, lošeg izbora metode ili preuranjenog zaključivanja."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              <InlineMath>{"\\Delta=0"}</InlineMath> znači &ldquo;nema
              rešenja&rdquo;
            </h3>
            <p>
              Ne. To samo znači da nemas jedinstveno rešenje preko Kramera. Tek
              dodatna provera govori da li je sistem nemoguć ili zavisan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Loš znak u determinanti</h3>
            <p>
              Jedan pogresan minus menja celo rešenje. Posebno kod Sarrusa
              prati tri negativna proizvoda do kraja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              U Gausu se menja samo leva strana
            </h3>
            <p>
              Slobodni članovi moraju da prolaze kroz iste transformacije kao i
              koeficijenti. U suprotnom rešavaš drugi sistem.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Deljenje izrazom sa parametrom bez provere
            </h3>
            <p>
              Ako deliš izrazom koji može biti nula, moraš izdvojiti poseban
              slučaj. U suprotnom gubiš moguća rešenja ili uvodis nedozvoljen
              korak.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta se najčešće traži na testu"
        description="Na prijemnim ispitima sistemi linearnih jednačina se javljaju u čistom obliku, ali i kao sakriveni deo većeg problema: u zadacima sa parametrima, analitickom geometrijom, presekom grafika ili rekonstrukcijom koeficijenata."
      >
        <div className={s.grid3}>
          <SectionCard title="Šta se često traži">
            <p>
              Resavanje sistema <InlineMath>{"2\\times2"}</InlineMath>,
              razmatranje sistema sa parametrom, izbor metode ili utvrdivanje
              broja rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Gde nastaju zamke">
            <p>
              U pogrešnom mnozenju pri eliminaciji, u brzom računanju
              determinanti i u preskakanju specijalnog slučaja{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta proveravaš pod pritiskom vremena">
            <p>
              Da li postoji laksa metoda, da li si transformisao i desnu stranu,
              i da li zaključak o broju rešenja zaista prati iz računa.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brz ispitni redosled">
          <p>
            Pročitaj sistem, proceni najkraći metod, proveri da li postoji
            parametar ili determinant, uradi račun smireno i na kraju proveri da
            li dobijeno rešenje zadovoljava originalni sistem.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe za samostalni rad"
        title="Samostalna provera razumevanja"
        description="Prvo pokušaj bez pomoci. Ako zapneš, otvori rešenje i uporedi svoj tok razmisljanja sa ponudjenim koracima."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <>
                <p>Reši sistem metodom zamene:</p>
                <MathBlock>
                  {"\\begin{cases} y=3x-2\\\\ 2x+y=8 \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Uvrsti <InlineMath>{"y=3x-2"}</InlineMath> u drugu jednačinu:
                </p>
                <MathBlock>
                  {"2x+(3x-2)=8 \\Rightarrow 5x=10 \\Rightarrow x=2"}
                </MathBlock>
                <p>Zatim je</p>
                <MathBlock>{"y=3\\cdot 2-2=4"}</MathBlock>
                <p>
                  Rešenje je <InlineMath>{"(2,4)"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 2"
            problem={
              <>
                <p>Reši sistem metodom suprotnih koeficijenata:</p>
                <MathBlock>
                  {"\\begin{cases} 3x+2y=11\\\\ 5x-2y=9 \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Sabiranjem jednačina eliminise se{" "}
                  <InlineMath>{"y"}</InlineMath>:
                </p>
                <MathBlock>
                  {"8x=20 \\Rightarrow x=\\frac{5}{2}"}
                </MathBlock>
                <p>Uvrstimo u prvu jednačinu:</p>
                <MathBlock>
                  {
                    "3\\cdot\\frac{5}{2}+2y=11 \\Rightarrow 2y=\\frac{7}{2} \\Rightarrow y=\\frac{7}{4}"
                  }
                </MathBlock>
                <p>
                  Rešenje je{" "}
                  <InlineMath>
                    {"\\left(\\frac{5}{2},\\frac{7}{4}\\right)"}
                  </InlineMath>
                  .
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 3"
            problem={
              <>
                <p>Reši sistem Gausovim algoritmom:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x+y+z=5\\\\ 2x-y+z=2\\\\ x+2y-z=1 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Oduzmi dva puta prvi red od drugog i prvi red od trećeg:
                </p>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&5\\\\ 0&-3&-1&-8\\\\ 0&1&-2&-4 \\end{array}\\right]"
                  }
                </MathBlock>
                <p>
                  Zatim poništi član u drugoj koloni trećeg reda, na primer
                  operacijom <InlineMath>{"R_3 \\leftarrow 3R_3+R_2"}</InlineMath>
                  :
                </p>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&5\\\\ 0&-3&-1&-8\\\\ 0&0&-7&-20 \\end{array}\\right]"
                  }
                </MathBlock>
                <p>
                  Odavde je <InlineMath>{"z=\\frac{20}{7}"}</InlineMath>, zatim{" "}
                  <InlineMath>{"y=\\frac{12}{7}"}</InlineMath>, pa{" "}
                  <InlineMath>{"x=\\frac{3}{7}"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 4"
            problem={
              <>
                <p>
                  Odredi broj rešenja sistema u zavisnosti od parametra{" "}
                  <InlineMath>{"p"}</InlineMath>:
                </p>
                <MathBlock>
                  {"\\begin{cases} x-y=1\\\\ 2x-2y=p \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Druga leva strana je dvostruka prve, pa proveravamo i desnu
                  stranu.
                </p>
                <ul style={{ marginLeft: 18 }}>
                  <li>
                    Ako je <InlineMath>{"p=2"}</InlineMath>, druga jednačina je
                    tačno dvostruka prve i sistem ima beskonačno mnogo rešenja.
                  </li>
                  <li>
                    Ako je <InlineMath>{"p \\neq 2"}</InlineMath>, leve strane
                    su proporcionalne, a desne nisu, pa sistem nema rešenje.
                  </li>
                </ul>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 5"
            problem={
              <>
                <p>Reši sistem Kramerovim pravilom:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x+y+z=3\\\\ x-y+z=1\\\\ 2x+y-z=2 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Glavni determinant je</p>
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1&1&1\\\\ 1&-1&1\\\\ 2&1&-1 \\end{vmatrix} = 6"
                  }
                </MathBlock>
                <p>
                  Dalje dobiješ{" "}
                  <InlineMath>{"\\Delta_x=6"}</InlineMath>,{" "}
                  <InlineMath>{"\\Delta_y=6"}</InlineMath> i{" "}
                  <InlineMath>{"\\Delta_z=6"}</InlineMath>.
                </p>
                <MathBlock>{"x=1,\\qquad y=1,\\qquad z=1"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="U sustini, cela lekcija može da se sažme ovako: sistem linearnih jednačina je pitanje kompatibilnosti više uslova."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kada to razumeš, više ne biras metod naslepo. Zamena, eliminacija,
            Kramer i Gaus postaju samo različiti alati za isti cilj: da otkriješ
            da li zajedničko rešenje postoji i kako se najbrže nalazi.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ovo je lista ideja koje zaista treba da ostanu u glavi nakon lekcije."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Osnovna slika</h3>
            <p>
              Sistem traži zajedničko rešenje. Kod{" "}
              <InlineMath>{"2\\times2"}</InlineMath> to je presek dve prave.
              Zato sistem može imati <strong>jedno</strong>,{" "}
              <strong>nijedno</strong> ili{" "}
              <strong>beskonačno mnogo</strong> rešenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Metode</h3>
            <p>
              Biraj prema strukturi zadatka. Zamena i eliminacija su prirodne za{" "}
              <InlineMath>{"2\\times2"}</InlineMath>. Kramer je dobar kada je
              račun sa determinantama pregledan. Gaus je univerzalniji i posebno
              koristan za <InlineMath>{"3\\times3"}</InlineMath> i parametarske
              sisteme.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Ključna opomena</h3>
            <p>
              <InlineMath>{"\\Delta=0"}</InlineMath> nije kraj price. Tada
              dodatno proveravaš da li sistem postaje nemoguć ili zavisan. Ovo
              je jedna od najvažnijih prijemnih zamki.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Sledeći korak</h3>
            <p>
              Najviše koristi imaćeš ako sada samostalno rešavaš zadatke sa
              parametrom i vezbaš prepoznavanje najkraćeg metoda.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 17 zatvara temu o sistemima linearnih jednačina: od osnovne
          geometrijske slike do Kramera, Gausa i diskusije sa parametrom.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
