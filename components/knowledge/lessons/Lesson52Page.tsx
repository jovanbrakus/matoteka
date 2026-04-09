"use client";

import { useRef, useEffect, useState, useCallback } from "react";

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

/* ─────────────────────────────────────────────
   Interactive Ellipse Lab (canvas)
   ───────────────────────────────────────────── */

interface LabState {
  a: number;
  b: number;
  k: number;
  l: number;
}

function EllipseLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [semiA, setSemiA] = useState(5);
  const [semiB, setSemiB] = useState(3);
  const [lineK, setLineK] = useState(1);
  const [lineL, setLineL] = useState(5.8);
  const [caption, setCaption] = useState("");

  const fmt = (v: number, d = 2) => {
    if (!Number.isFinite(v)) return "nedef.";
    const r = Math.round(v * 10 ** d) / 10 ** d;
    if (Math.abs(r) < 1e-8) return "0";
    if (Math.abs(r - Math.round(r)) < 1e-8) return String(Math.round(r));
    return r.toFixed(d).replace(/\.?0+$/, "");
  };

  const applyPreset = (preset: "tangent" | "secant" | "external") => {
    const p = {
      tangent: { a: 5, b: 3, k: 1, l: Math.round(Math.sqrt(34) * 10) / 10 },
      secant: { a: 5, b: 3, k: 1, l: 2 },
      external: { a: 5, b: 3, k: 1, l: 7 },
    }[preset];
    setSemiA(p.a);
    setSemiB(p.b);
    setLineK(p.k);
    setLineL(p.l);
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const frameW = Math.max(320, parent ? parent.clientWidth - 28 : 640);
    const frameH = Math.max(300, Math.min(540, frameW * 0.66));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(frameW * dpr);
    canvas.height = Math.round(frameH * dpr);
    canvas.style.height = `${frameH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = 44;
    const st: LabState = {
      a: Math.max(0.5, semiA),
      b: Math.max(0.5, semiB),
      k: lineK,
      l: lineL,
    };

    const extent = Math.max(
      6,
      st.a * 1.55,
      st.b * 1.55,
      Math.abs(st.l) + Math.abs(st.k) * (Math.max(st.a, st.b) + 2) + 2
    );
    const view = { xmin: -extent, xmax: extent, ymin: -extent, ymax: extent };

    const toC = (x: number, y: number) => ({
      x: pad + ((x - view.xmin) / (view.xmax - view.xmin)) * (frameW - pad * 2),
      y: pad + ((view.ymax - y) / (view.ymax - view.ymin)) * (frameH - pad * 2),
    });

    const drawPt = (px: { x: number; y: number }, col: string, r = 5) => {
      ctx.save();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px.x, px.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawLbl = (txt: string, px: { x: number; y: number }, col: string) => {
      ctx.save();
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = col;
      ctx.fillText(txt, px.x + 9, px.y - 9);
      ctx.restore();
    };

    // clear
    ctx.clearRect(0, 0, frameW, frameH);

    // grid
    const gs = view.xmax - view.xmin <= 14 ? 1 : 2;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,214,151,0.07)";
    for (let x = Math.ceil(view.xmin); x <= Math.floor(view.xmax); x += gs) {
      const p1 = toC(x, view.ymin),
        p2 = toC(x, view.ymax);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (let y = Math.ceil(view.ymin); y <= Math.floor(view.ymax); y += gs) {
      const p1 = toC(view.xmin, y),
        p2 = toC(view.xmax, y);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();

    // axes
    ctx.save();
    ctx.strokeStyle = "rgba(255,214,151,0.24)";
    ctx.lineWidth = 1.6;
    let p = toC(view.xmin, 0),
      q = toC(view.xmax, 0);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
    p = toC(0, view.ymin);
    q = toC(0, view.ymax);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,244,234,0.8)";
    ctx.font = "600 12px Inter, sans-serif";
    const xEnd = toC(view.xmax, 0);
    const yEnd = toC(0, view.ymax);
    ctx.fillText("x", xEnd.x - 14, xEnd.y - 10);
    ctx.fillText("y", yEnd.x + 10, yEnd.y + 14);
    ctx.restore();

    // ellipse
    ctx.save();
    ctx.strokeStyle = "rgba(255,148,79,0.95)";
    ctx.fillStyle = "rgba(255,148,79,0.1)";
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    for (let i = 0; i <= 220; i++) {
      const t = (i / 220) * Math.PI * 2;
      const px = toC(st.a * Math.cos(t), st.b * Math.sin(t));
      i === 0 ? ctx.moveTo(px.x, px.y) : ctx.lineTo(px.x, px.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // vertex labels
    const rv = toC(st.a, 0),
      tv = toC(0, st.b);
    drawPt(rv, "#ffd697", 4.5);
    drawPt(tv, "#ffd697", 4.5);
    drawLbl(`A(${fmt(st.a)}, 0)`, rv, "#ffe5a5");
    drawLbl(`B(0, ${fmt(st.b)})`, tv, "#ffe5a5");

    // line
    const lp1 = toC(view.xmin, st.k * view.xmin + st.l);
    const lp2 = toC(view.xmax, st.k * view.xmax + st.l);
    ctx.save();
    ctx.strokeStyle = "rgba(183,221,255,0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lp1.x, lp1.y);
    ctx.lineTo(lp2.x, lp2.y);
    ctx.stroke();
    ctx.restore();

    // foci
    const EPS = 1e-7;
    let foci: { x: number; y: number; label: string }[] = [];
    if (Math.abs(st.a - st.b) < EPS) {
      foci = [{ x: 0, y: 0, label: "F" }];
    } else if (st.a > st.b) {
      const c = Math.sqrt(st.a * st.a - st.b * st.b);
      foci = [
        { x: -c, y: 0, label: "F1" },
        { x: c, y: 0, label: "F2" },
      ];
    } else {
      const c = Math.sqrt(st.b * st.b - st.a * st.a);
      foci = [
        { x: 0, y: -c, label: "F1" },
        { x: 0, y: c, label: "F2" },
      ];
    }
    foci.forEach((f) => {
      const fp = toC(f.x, f.y);
      drawPt(fp, "#9de3cf", 5);
      drawLbl(`${f.label}(${fmt(f.x)}, ${fmt(f.y)})`, fp, "#b9ffe9");
    });

    // intersection geometry
    const A = st.b * st.b + st.a * st.a * st.k * st.k;
    const B = 2 * st.a * st.a * st.k * st.l;
    const C2 = st.a * st.a * (st.l * st.l - st.b * st.b);
    const disc = B * B - 4 * A * C2;
    const tangentMeasure = st.a * st.a * st.k * st.k + st.b * st.b;
    const compare = st.l * st.l - tangentMeasure;

    let status: "secant" | "tangent" | "external" = "secant";
    if (Math.abs(compare) < 0.08) status = "tangent";
    else if (compare > 0) status = "external";

    const pts: { x: number; y: number }[] = [];
    if (disc >= -EPS) {
      const sd = Math.sqrt(Math.max(disc, 0));
      const x1 = (-B - sd) / (2 * A);
      pts.push({ x: x1, y: st.k * x1 + st.l });
      if (sd > 1e-5) {
        const x2 = (-B + sd) / (2 * A);
        pts.push({ x: x2, y: st.k * x2 + st.l });
      }
    }

    pts.forEach((pt, i) => {
      const pp = toC(pt.x, pt.y);
      const lbl = pts.length === 1 ? "T" : i === 0 ? "P" : "Q";
      drawPt(pp, pts.length === 1 ? "#92e4c4" : "#ffd697", 5.5);
      drawLbl(`${lbl}(${fmt(pt.x)}, ${fmt(pt.y)})`, pp, "#fff4ea");
    });

    const statusMap = {
      secant: "Sečica: prava seče elipsu u dve tačke.",
      tangent: "Tangenta: uslov dodira je ispunjen.",
      external: "Spoljašnja prava: nema preseka sa elipsom.",
    };
    setCaption(statusMap[status]);
  }, [semiA, semiB, lineK, lineL]);

  useEffect(() => {
    render();
    const h = () => render();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [render]);

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Canvas */}
        <div>
          <div className={s.canvasWrap}>
            <canvas ref={canvasRef} className={s.polarCanvas} />
          </div>
          <p style={{ marginTop: 10, color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
            {caption}
          </p>
          <p style={{ marginTop: 6, color: "var(--lesson-muted)", fontSize: "0.88rem" }}>
            Laboratorija radi sa jednačinom{" "}
            <InlineMath>{"x^2/a^2 + y^2/b^2 = 1"}</InlineMath>. Kada je{" "}
            <InlineMath>{"a>b"}</InlineMath>, žiže su na{" "}
            <InlineMath>{"x"}</InlineMath>-osi; kada je{" "}
            <InlineMath>{"b>a"}</InlineMath>, žiže su na{" "}
            <InlineMath>{"y"}</InlineMath>-osi.
          </p>
        </div>

        {/* Controls */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Poluose elipse</h3>
          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>
                Poluosa <InlineMath>{"a"}</InlineMath>: {fmt(semiA)}
              </label>
              <input
                type="range"
                min={2}
                max={8}
                step={0.5}
                value={semiA}
                onChange={(e) => setSemiA(+e.target.value)}
              />
            </div>
            <div className={s.field}>
              <label>
                Poluosa <InlineMath>{"b"}</InlineMath>: {fmt(semiB)}
              </label>
              <input
                type="range"
                min={1}
                max={7}
                step={0.5}
                value={semiB}
                onChange={(e) => setSemiB(+e.target.value)}
              />
            </div>
          </div>

          <h3 className={cs.tCardTitle} style={{ marginTop: 18 }}>
            Prava <InlineMath>{"y = kx + l"}</InlineMath>
          </h3>
          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>
                Nagib <InlineMath>{"k"}</InlineMath>: {fmt(lineK)}
              </label>
              <input
                type="range"
                min={-2.5}
                max={2.5}
                step={0.1}
                value={lineK}
                onChange={(e) => setLineK(+e.target.value)}
              />
            </div>
            <div className={s.field}>
              <label>
                Odsečak <InlineMath>{"l"}</InlineMath>: {fmt(lineL)}
              </label>
              <input
                type="range"
                min={-8}
                max={8}
                step={0.1}
                value={lineL}
                onChange={(e) => setLineL(+e.target.value)}
              />
            </div>
          </div>

          <h3 className={cs.tCardTitle} style={{ marginTop: 18 }}>
            Brzi preset položaji
          </h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
            <button className={s.presetBtn} type="button" onClick={() => applyPreset("tangent")}>
              Tangenta
            </button>
            <button className={s.presetBtn} type="button" onClick={() => applyPreset("secant")}>
              Sečica
            </button>
            <button className={s.presetBtn} type="button" onClick={() => applyPreset("external")}>
              Spoljašnja prava
            </button>
          </div>

          <h3 className={cs.tCardTitle} style={{ marginTop: 18 }}>
            Rezime trenutnog položaja
          </h3>
          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>Elipsa</strong>
              <span>
                a = {fmt(semiA)}, b = {fmt(semiB)}
              </span>
            </div>
            <div className={s.resultCard}>
              <strong>Poređenje</strong>
              <span>
                l&sup2; = {fmt(lineL * lineL)}
                <br />
                a&sup2;k&sup2;+b&sup2; = {fmt(semiA * semiA * lineK * lineK + semiB * semiB)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Navigation
   ───────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#elipsa", label: "Osnovna slika" },
  { href: "#zize", label: "Žiže i ekscentricitet" },
  { href: "#dodir", label: "Uslov dodira" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

/* ─────────────────────────────────────────────
   Main Lesson Component
   ───────────────────────────────────────────── */

export default function Lesson52Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 52"
        title={
          <>
            Elipsa{" "}
            <span className={cs.tHeroAccent}>i uslov dodira</span>
          </>
        }
        description="Elipsa na prijemnom nije samo &laquo;ona kriva sa dva imenitelja&raquo;. Moraš da umeš da pročitaš poluose, temena i žiže, ali i da prepoznaš kada prava dodiruje elipsu u jednoj jedinoj tački. Tu se spajaju geometrijska intuicija, diskriminanta i dobra kontrola formule."
        heroImageSrc="/api/lessons/52/hero"
        heroImageAlt="Ilustracija za lekciju o elipsi i uslovu dodira"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako iz jednačine čitaš elipsu i kako gradiš tangentne prave u najčešćim prijemnim situacijama.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje veličina a, b i c, kao i zaboravljanje da vertikalne tangente ne vidiš kroz y = kx + l.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Tangente paralelne datoj pravoj, tangenta u zadatoj tački i tangente kroz spoljašnju tačku.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "75 do 95 minuta",
          },
          {
            label: "Predznanje",
            description: "Prava, kvadratne jednačine i diskriminanta",
          },
          {
            label: "Glavna veština",
            description:
              "Prevedi uslov u familiju pravih i izjednači diskriminantu sa nulom",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija elipse sa promenljivim poluosama i pravom",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Elipsa tera učenika da spoji sliku, formulu i logiku jednog dodira"
        description="U ovoj lekciji više nije dovoljno da samo prepoznaš krivu. Moraš da vidiš kako je elipsa postavljena u ravni, gde su joj žiže, koliko je izdužena i šta znači da neka prava ima baš jednu zajedničku tačku sa njom. To je tip zadatka koji na prijemnom razdvaja učenika koji pamti od učenika koji razume."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se ovo koristi kasnije">
            <p>
              Elipsa je prirodan nastavak kružnice: i dalje radiš sa krivom drugog
              reda, ali sada imaš dve različite poluose i dve žiže. Time zadaci postaju
              bogatiji, a i uslov dodira dobija ozbiljniji oblik.
            </p>
            <ul>
              <li>
                <strong>U analitičkoj geometriji:</strong> prelaziš na hiperbolu i
                parabolu sa već izgrađenom rutinom za tangente.
              </li>
              <li>
                <strong>Na prijemnim zadacima:</strong> često se traži tangenta
                paralelna datoj pravoj ili tangente iz spoljašnje tačke.
              </li>
              <li>
                <strong>U kasnijoj matematici:</strong> jačaš osećaj za parametar,
                diskriminantu i izbor najefikasnijeg modela.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta prijemni zapravo proverava">
            <p>
              Prijemni ne traži da mehanički napišeš{" "}
              <InlineMath>{"c^2 = a^2 - b^2"}</InlineMath>. On proverava da li znaš
              šta su nepoznate i koja formula zaista odgovara datom uslovu. Zato je
              važno da razlikuješ tri standardna modela zadatka:
            </p>
            <ul>
              <li>
                <strong>Čitanje elipse:</strong> iz jednačine tražiš poluose, temena i
                žiže.
              </li>
              <li>
                <strong>Familija paralelnih pravih:</strong> zadržavaš nagib i tražiš
                odgovarajući odsečak.
              </li>
              <li>
                <strong>Prava kroz tačku:</strong> uvodiš nagib kao parametar, pa uslov
                dodira rešavaš po tom parametru.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Ključna poruka ove lekcije">
          <p>
            Tangenta znači dvostruki presek. Kada to stvarno razumeš, formula za uslov
            dodira više nije nešto što učiš napamet, nego nešto što umeš da
            rekonstruišeš.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: šta prvo proveravaš kada vidiš jednačinu elipse?"
          answer={
            <p>
              Prvo proveravaš koji imenilac je veći i uz koju promenljivu stoji. To ti
              govori duž koje ose je elipsa &ldquo;duža&rdquo;, pa tek onda smisleno
              čitaš poluose i položaj žiža.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNA SLIKA ELIPSE ═══════════ */}
      <LessonSection
        id="elipsa"
        eyebrow="Osnovna slika elipse"
        title="Elipsa je skup tačaka čiji je zbir rastojanja do dve žiže stalan"
        description="Geometrijska definicija elipse glasi: elipsa je skup svih tačaka M u ravni za koje je zbir rastojanja do dve fiksne tačke F₁ i F₂ konstantan. U standardnom položaju centra u koordinatnom početku ta definicija vodi do kanonske jednačine."
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija i definicija">
            <p>
              Ako su žiže <InlineMath>{"F_1"}</InlineMath> i{" "}
              <InlineMath>{"F_2"}</InlineMath>, a konstanta jednaka{" "}
              <InlineMath>{"2a"}</InlineMath>, onda za svaku tačku{" "}
              <InlineMath>{"M(x,y)"}</InlineMath> na elipsi važi:
            </p>
            <MathBlock>{"MF_1 + MF_2 = 2a"}</MathBlock>
            <p>
              Broj <InlineMath>{"a"}</InlineMath> je polovina velike ose. Zato je u
              standardnoj školskoj notaciji <InlineMath>{"a"}</InlineMath> vezano za
              &ldquo;dužu&rdquo; poluosu, dok je <InlineMath>{"b"}</InlineMath> kraća
              poluosa. Kada je velika osa horizontalna, kanonski oblik je:
            </p>
            <MathBlock>{"\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1, \\qquad a>b>0"}</MathBlock>
            <p>
              Iz ovog oblika odmah vidiš da elipsa seče{" "}
              <InlineMath>{"x"}</InlineMath>-osu u{" "}
              <InlineMath>{"(\\pm a, 0)"}</InlineMath>, a{" "}
              <InlineMath>{"y"}</InlineMath>-osu u{" "}
              <InlineMath>{"(0, \\pm b)"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Šta čitaš iz jednačine">
            <p>
              Kanonska jednačina ti ne daje samo krivu, nego i veoma konkretne podatke
              o njenom obliku:
            </p>
            <ul>
              <li>
                <strong>Velika osa:</strong> dužina je{" "}
                <InlineMath>{"2a"}</InlineMath>.
              </li>
              <li>
                <strong>Mala osa:</strong> dužina je{" "}
                <InlineMath>{"2b"}</InlineMath>.
              </li>
              <li>
                <strong>Temena velike ose:</strong>{" "}
                <InlineMath>{"(\\pm a, 0)"}</InlineMath>.
              </li>
              <li>
                <strong>Temena male ose:</strong>{" "}
                <InlineMath>{"(0, \\pm b)"}</InlineMath>.
              </li>
            </ul>
            <MathBlock>
              {
                "\\text{ako je } \\frac{x^2}{25}+\\frac{y^2}{9}=1, \\quad a=5,\\ b=3"
              }
            </MathBlock>
            <p>
              Veći imenilac znači dalje dosezanje po odgovarajućoj osi. Zato se
              učenici često prevare kada samo &ldquo;vide brojeve&rdquo;, a ne povežu
              ih sa osama.
            </p>
            <InsightCard title="Vertikalna elipsa">
              <p>
                Ako je umesto toga zapis{" "}
                <InlineMath>{"\\frac{x^2}{b^2}+\\frac{y^2}{a^2}=1"}</InlineMath>,
                velika osa je vertikalna. Ideja je ista, samo su uloge osa zamenjene.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Brzo čitanje">
            <p>
              Iz{" "}
              <InlineMath>{"\\frac{x^2}{16}+\\frac{y^2}{4}=1"}</InlineMath> čitaš{" "}
              <InlineMath>{"a=4"}</InlineMath>, <InlineMath>{"b=2"}</InlineMath>, pa
              su temena <InlineMath>{"(\\pm 4,0)"}</InlineMath> i{" "}
              <InlineMath>{"(0,\\pm 2)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta skiciraš">
            <p>
              Na margini nacrtaj koordinatni sistem i odmah obeleži{" "}
              <InlineMath>{"\\pm a"}</InlineMath> i{" "}
              <InlineMath>{"\\pm b"}</InlineMath>. Mala skica sprečava pola tipičnih
              grešaka.
            </p>
          </SectionCard>
          <SectionCard title="Elipsa nije kružnica">
            <p>
              Kada su <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath> različiti, ne postoji jedan jedinstveni
              poluprečnik. Upravo zato i uslov dodira izgleda drugačije nego kod
              kružnice.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto se u zapisu x²/9 + y²/25 = 1 velika osa nalazi na y-osi?"
          answer={
            <p>
              Zato što je veći imenilac ispod <InlineMath>{"y^2"}</InlineMath>, pa
              elipsa može da dosegne dalje po <InlineMath>{"y"}</InlineMath>-smeru. Tu
              je duža poluosa jednaka <InlineMath>{"5"}</InlineMath>, a kraća{" "}
              <InlineMath>{"3"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ŽIŽE I EKSCENTRICITET ═══════════ */}
      <LessonSection
        id="zize"
        eyebrow="Žiže i ekscentricitet"
        title="Broj c meri koliko su žiže odmaknute od centra"
        description="Žiže daju elipsi njen pravi identitet. Što su žiže dalje od centra, elipsa je izduženija. Zato je veza između a, b i c jedan od osnovnih prijemnih alata."
      >
        <div className={s.grid2}>
          <SectionCard title="Formula za žiže">
            <p>
              Za standardni horizontalni oblik{" "}
              <InlineMath>
                {"\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1"}
              </InlineMath>
              , gde je <InlineMath>{"a>b"}</InlineMath>, važi:
            </p>
            <MathBlock>{"c^2 = a^2 - b^2"}</MathBlock>
            <MathBlock>{"F_1(-c,\\,0), \\qquad F_2(c,\\,0)"}</MathBlock>
            <p>
              Ovo je jedna od najčešćih tačaka greške: neki učenici po navici napišu{" "}
              <InlineMath>{"c^2 = a^2 + b^2"}</InlineMath>, mešajući elipsu sa
              Pitagorinom slikom u pogrešnom smeru. Za elipsu je uvek{" "}
              <strong>razlika kvadrata</strong>.
            </p>
          </SectionCard>

          <SectionCard title="Ekscentricitet">
            <p>
              Ekscentricitet pokazuje koliko je elipsa &ldquo;spljoštena&rdquo; ili
              &ldquo;izdužena&rdquo;. Definiše se kao:
            </p>
            <MathBlock>{"e = \\frac{c}{a}, \\qquad 0 < e < 1"}</MathBlock>
            <p>
              Ako je <InlineMath>{"e"}</InlineMath> mali, elipsa je bliska kružnici.
              Ako je <InlineMath>{"e"}</InlineMath> bliži jedinici, elipsa je
              izduženija. Na prijemnom se ovo često ne traži samostalno, ali pomaže da
              ne izgubiš geometrijski osećaj za sliku.
            </p>
            <InsightCard title="Kružnica kao poseban slučaj">
              <p>
                Kada je <InlineMath>{"a = b"}</InlineMath>, dobijaš kružnicu. Tada je{" "}
                <InlineMath>{"c = 0"}</InlineMath> i obe žiže &ldquo;padaju&rdquo; u
                centar.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Primer">
            <p>
              Za{" "}
              <InlineMath>{"\\frac{x^2}{25}+\\frac{y^2}{9}=1"}</InlineMath>{" "}
              važi <InlineMath>{"c^2 = 25 - 9 = 16"}</InlineMath>, pa je{" "}
              <InlineMath>{"c = 4"}</InlineMath> i žiže su{" "}
              <InlineMath>{"(\\pm 4,\\,0)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Zašto je 2a važan">
            <p>
              Za svaku tačku elipse zbir rastojanja do žiža ostaje isti i jednak je{" "}
              <InlineMath>{"2a"}</InlineMath>. Zato je baš{" "}
              <InlineMath>{"a"}</InlineMath> vezan za veliku osu.
            </p>
          </SectionCard>
          <SectionCard title="Kada odmah računaš c">
            <p>
              Kad god zadatak pominje žiže, fokalno rastojanje ili ekscentricitet,
              prvo izračunaj <InlineMath>{"c"}</InlineMath>. To obično otvara ostatak
              zadatka.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto za elipsu mora da važi 0 < e < 1?"
          answer={
            <p>
              Pošto je <InlineMath>{"c^2 = a^2 - b^2"}</InlineMath>, sledi{" "}
              <InlineMath>{"c < a"}</InlineMath>, pa je i{" "}
              <InlineMath>{"\\frac{c}{a} < 1"}</InlineMath>. Takođe je{" "}
              <InlineMath>{"c > 0"}</InlineMath> za pravu elipsu, pa je{" "}
              <InlineMath>{"e"}</InlineMath> između nule i jedinice.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ USLOV DODIRA ═══════════ */}
      <LessonSection
        id="dodir"
        eyebrow="Uslov dodira"
        title="Prava dodiruje elipsu kada sistem ima tačno jedno realno rešenje"
        description="Ako je prava sečica, sa elipsom ima dve zajedničke tačke. Ako je spoljašnja, nema nijednu. Tangenta je baš granični slučaj između ta dva položaja: sistem prava-elipsa ima jedno dvostruko rešenje. Zato je diskriminanta ovde prirodno oruđe."
      >
        <div className={s.grid2}>
          <SectionCard title="Uslov dodira za y = kx + l">
            <p>
              Za standardnu elipsu
            </p>
            <MathBlock>{"\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1"}</MathBlock>
            <p>
              i pravu <InlineMath>{"y = kx + l"}</InlineMath>, posle zamene dobijaš
              kvadratnu jednačinu po <InlineMath>{"x"}</InlineMath>:
            </p>
            <MathBlock>
              {"(b^2 + a^2 k^2)\\,x^2 + 2a^2 k l\\,x + a^2(l^2 - b^2) = 0"}
            </MathBlock>
            <p>
              Tangenta znači <InlineMath>{"\\Delta = 0"}</InlineMath>, pa posle
              sređivanja dobijaš najvažniji obrazac lekcije:
            </p>
            <MathBlock>{"l^2 = a^2 k^2 + b^2"}</MathBlock>
            <p>
              Ovo je uslov dodira u standardnom koordinatnom položaju. Ako je poznat
              nagib <InlineMath>{"k"}</InlineMath>, tražiš{" "}
              <InlineMath>{"l"}</InlineMath>. Ako je prava zadata kroz tačku, tada je{" "}
              <InlineMath>{"l"}</InlineMath> izraz u kome se pojavljuje{" "}
              <InlineMath>{"k"}</InlineMath>, pa dobijaš jednačinu za nagib.
            </p>
          </SectionCard>

          <SectionCard title="Tangenta u poznatoj tački">
            <p>
              Ako je <InlineMath>{"P(x_0, y_0)"}</InlineMath> tačka elipse,
              tangentna prava u toj tački glasi:
            </p>
            <MathBlock>{"\\frac{x x_0}{a^2}+\\frac{y y_0}{b^2}=1"}</MathBlock>
            <p>
              Ovo je izuzetno korisna formula jer preskače ceo račun sa
              diskriminantom kada je tačka dodira već poznata. Samo moraš proveriti da
              tačka zaista leži na elipsi.
            </p>
            <ul>
              <li>
                Za <InlineMath>{"P(a,0)"}</InlineMath> dobijaš{" "}
                <InlineMath>{"x = a"}</InlineMath>, što je desna vertikalna tangenta.
              </li>
              <li>
                Za <InlineMath>{"P(-a,0)"}</InlineMath> dobijaš{" "}
                <InlineMath>{"x = -a"}</InlineMath>.
              </li>
              <li>
                Za <InlineMath>{"P(0,b)"}</InlineMath> dobijaš{" "}
                <InlineMath>{"y = b"}</InlineMath>, a za{" "}
                <InlineMath>{"P(0,-b)"}</InlineMath> dobijaš{" "}
                <InlineMath>{"y = -b"}</InlineMath>.
              </li>
            </ul>
            <InsightCard title="Vertikalne tangente">
              <p>
                Formula sa nagibom <InlineMath>{"y = kx + l"}</InlineMath> ne vidi
                vertikalne tangente. Zato je tangentna jednačina u tački važna i kao
                zaštita od grešaka.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Paralelne tangente">
            <p>
              Ako su tangente paralelne datoj pravoj, zadržavaš{" "}
              <InlineMath>{"k"}</InlineMath>, a menjaš samo{" "}
              <InlineMath>{"l"}</InlineMath>. Uslov{" "}
              <InlineMath>{"l^2 = a^2 k^2 + b^2"}</InlineMath> tada odmah daje dve
              tangente.
            </p>
          </SectionCard>
          <SectionCard title="Tangente kroz spoljašnju tačku">
            <p>
              Kroz tačku <InlineMath>{"A(x_1, y_1)"}</InlineMath> pišeš pravu{" "}
              <InlineMath>{"y = kx + (y_1 - kx_1)"}</InlineMath>. Zatim taj izraz za{" "}
              <InlineMath>{"l"}</InlineMath> ubacuješ u uslov dodira.
            </p>
          </SectionCard>
          <SectionCard title="Broj tangenti">
            <p>
              Spoljašnja tačka daje dve tangente, tačka na elipsi jednu, a
              unutrašnja tačka nijednu realnu tangentu.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Implicitni oblik prave">
          <p>
            Ako zadatak daje pravu u implicitnom obliku, prvo proceni da li je
            zgodno prevesti je u <InlineMath>{"y = kx + l"}</InlineMath>. Ako je
            prava vertikalna, radi odvojeno. Za standardnu elipsu jedine vertikalne
            tangente su <InlineMath>{"x = \\pm a"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto uslov dodira daje dve prave kada je poznat samo nagib?"
          answer={
            <p>
              Zato što iz <InlineMath>{"l^2 = a^2 k^2 + b^2"}</InlineMath> sledi{" "}
              <InlineMath>{"l = \\pm\\sqrt{a^2 k^2 + b^2}"}</InlineMath>.
              Geometrijski, to su dve međusobno paralelne tangente sa suprotnih
              strana elipse.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: menjaj elipsu i pravu i prati kada nastaje tangenta"
        description="U laboratoriji ispod menjaš poluose elipse i parametre prave y = kx + l. Posmatraj kako se menja broj presečnih tačaka i upoređuj vrednosti l² i a²k² + b². Kada su jednake, prava je tangenta."
      >
        <EllipseLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da sam pogodiš šta će se desiti kada pomeriš klizač. Hoće li
            prava promeniti položaj iz sečice u tangentu? Gde su žiže? Što češće
            eksperimentišeš, brže razvijaš intuiciju za elipsu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak: čitanje elipse, žiža i tangentnih pravih"
        description="U sledećim primerima važan je redosled odluka: prvo prepoznaj tip zadatka, zatim izaberi najbolju formulu, pa tek onda računaj. To je prijemna disciplina koja štedi vreme i smanjuje greške."
      >
        {/* Primer 1 */}
        <article className={s.exampleCard} style={{ marginBottom: 16 }}>
          <h3 className={cs.tCardTitle}>
            Primer 1: pročitaj sve osnovne elemente elipse
          </h3>
          <p>
            Za elipsu{" "}
            <InlineMath>{"\\frac{x^2}{25}+\\frac{y^2}{9}=1"}</InlineMath> odredi
            poluose, temena, žiže i ekscentricitet.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Pročitaj poluose">
              <p>Iz imenilaca odmah vidiš:</p>
              <MathBlock>{"a = 5, \\qquad b = 3"}</MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Odredi temena">
              <p>
                Pošto je veći imenilac ispod <InlineMath>{"x^2"}</InlineMath>,
                velika osa je horizontalna. Zato su temena:
              </p>
              <MathBlock>{"(\\pm 5,\\,0), \\qquad (0,\\,\\pm 3)"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Izračunaj žiže">
              <MathBlock>
                {"c^2 = a^2 - b^2 = 25 - 9 = 16 \\Rightarrow c = 4"}
              </MathBlock>
              <MathBlock>{"F_1(-4,\\,0), \\qquad F_2(4,\\,0)"}</MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Ekscentricitet">
              <MathBlock>{"e = \\frac{c}{a} = \\frac{4}{5}"}</MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: jedan kanonski zapis ti je dao i oblik elipse i sve njene
            ključne geometrijske elemente.
          </p>
        </article>

        {/* Primer 2 */}
        <article className={s.exampleCard} style={{ marginBottom: 16 }}>
          <h3 className={cs.tCardTitle}>
            Primer 2: tangente paralelne datoj pravoj
          </h3>
          <p>
            Nađi jednačine tangenti elipse{" "}
            <InlineMath>{"\\frac{x^2}{16}+\\frac{y^2}{9}=1"}</InlineMath> koje su
            paralelne pravoj <InlineMath>{"2x - y + 5 = 0"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Sačuvaj nagib">
              <p>
                Data prava je <InlineMath>{"y = 2x + 5"}</InlineMath>, pa sve
                paralelne tražene prave imaju oblik:
              </p>
              <MathBlock>{"y = 2x + l"}</MathBlock>
              <p>
                Ovde je <InlineMath>{"k = 2"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Pročitaj poluose elipse">
              <MathBlock>{"a = 4, \\qquad b = 3"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Primeni uslov dodira">
              <MathBlock>{"l^2 = a^2 k^2 + b^2 = 16 \\cdot 4 + 9 = 73"}</MathBlock>
              <MathBlock>{"l = \\pm\\sqrt{73}"}</MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Napiši obe tangente">
              <MathBlock>
                {"y = 2x + \\sqrt{73} \\qquad \\text{i} \\qquad y = 2x - \\sqrt{73}"}
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: kada je nagib poznat, zadatak je gotovo uvek kratak.
            Najčešća greška je gubljenje drugog znaka.
          </p>
        </article>

        {/* Primer 3 */}
        <article className={s.exampleCard} style={{ marginBottom: 16 }}>
          <h3 className={cs.tCardTitle}>
            Primer 3: tangenta u poznatoj tački elipse
          </h3>
          <p>
            Nađi jednačinu tangente na elipsu{" "}
            <InlineMath>{"\\frac{x^2}{25}+\\frac{y^2}{9}=1"}</InlineMath> u tački{" "}
            <InlineMath>{"P\\left(3,\\,\\frac{12}{5}\\right)"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Proveri da tačka leži na elipsi">
              <MathBlock>
                {
                  "\\frac{3^2}{25}+\\frac{\\left(\\frac{12}{5}\\right)^2}{9}=\\frac{9}{25}+\\frac{144}{225}=\\frac{9}{25}+\\frac{16}{25}=1"
                }
              </MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Primeni tangentnu jednačinu u tački">
              <MathBlock>{"\\frac{x x_0}{a^2}+\\frac{y y_0}{b^2}=1"}</MathBlock>
              <MathBlock>
                {"\\frac{3x}{25}+\\frac{\\frac{12}{5}\\,y}{9}=1"}
              </MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Sredi jednačinu">
              <MathBlock>
                {
                  "\\frac{3x}{25}+\\frac{4y}{15}=1 \\quad\\Longrightarrow\\quad 9x + 20y = 75"
                }
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: kada je tačka dodira poznata, formula{" "}
            <InlineMath>{"\\frac{x x_0}{a^2}+\\frac{y y_0}{b^2}=1"}</InlineMath>{" "}
            je najkraći i najsigurniji put.
          </p>
        </article>

        {/* Primer 4 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 4: tangente kroz spoljašnju tačku
          </h3>
          <p>
            Kroz tačku <InlineMath>{"A(5,0)"}</InlineMath> nađi tangente na elipsu{" "}
            <InlineMath>{"\\frac{x^2}{9}+\\frac{y^2}{4}=1"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Napiši familiju pravih kroz zadatu tačku">
              <p>
                Svaka prava kroz <InlineMath>{"A(5,0)"}</InlineMath> može da se
                zapiše kao:
              </p>
              <MathBlock>{"y = k(x - 5) = kx - 5k"}</MathBlock>
              <p>
                Ovde je <InlineMath>{"l = -5k"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Primeni uslov dodira">
              <p>
                Za datu elipsu je <InlineMath>{"a = 3"}</InlineMath>,{" "}
                <InlineMath>{"b = 2"}</InlineMath>, pa:
              </p>
              <MathBlock>{"l^2 = a^2 k^2 + b^2"}</MathBlock>
              <MathBlock>{"(-5k)^2 = 9k^2 + 4"}</MathBlock>
              <MathBlock>
                {"25k^2 = 9k^2 + 4 \\Rightarrow 16k^2 = 4 \\Rightarrow k^2 = \\frac{1}{4}"}
              </MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Dobij oba nagiba">
              <MathBlock>{"k = \\pm\\frac{1}{2}"}</MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Napiši obe tangente">
              <MathBlock>
                {
                  "y = \\frac{1}{2}(x - 5) \\qquad \\text{i} \\qquad y = -\\frac{1}{2}(x - 5)"
                }
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: u zadacima &ldquo;kroz spoljašnju tačku&rdquo; ne tražiš
            odmah tačke dodira, nego najpre nagib tangentnih pravih.
          </p>
        </article>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ovo su obrasci koje moraš znati da prepoznaš i objasniš"
        description="Svaka formula ispod ima svoju prirodnu situaciju. Uči je zajedno sa tipom zadatka u kome se pojavljuje, a ne kao izolovan zapis."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Elipsa u standardnom položaju"
            formula={"\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1"}
            note="Iz imenilaca čitaš poluose. Veći imenilac pokazuje dužu osu."
          />
          <FormulaCard
            title="Veza između a, b i c"
            formula="c^2 = a^2 - b^2"
            note={
              <>
                Za horizontalni standardni slučaj žiže su{" "}
                <InlineMath>{"F_{1,2}(\\pm c, 0)"}</InlineMath>. Za vertikalni se
                sele na <InlineMath>{"y"}</InlineMath>-osu.
              </>
            }
          />
          <FormulaCard
            title="Uslov dodira prave y = kx + l"
            formula="l^2 = a^2 k^2 + b^2"
            note="Osnovni uslov dodira za standardnu elipsu i pravu zadatu preko nagiba i odsečka."
          />
          <FormulaCard
            title="Tangenta u poznatoj tački"
            formula={"\\frac{x x_0}{a^2}+\\frac{y y_0}{b^2}=1"}
            note={
              <>
                Najkraći način da napišeš tangentu u tački{" "}
                <InlineMath>{"P(x_0, y_0)"}</InlineMath> elipse.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube laki bodovi"
        description="Većina grešaka u ovoj lekciji nije teška matematika, nego loše čitanje slike ili pogrešan izbor formule. Zato ih treba videti unapred."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"a"}</InlineMath>, <InlineMath>{"b"}</InlineMath>{" "}
              i <InlineMath>{"c"}</InlineMath>
            </h3>
            <p>
              Najčešća greška je da se bez razmišljanja napiše{" "}
              <InlineMath>{"c^2 = a^2 + b^2"}</InlineMath>. Za elipsu uvek važi
              razlika kvadrata, jer je <InlineMath>{"c"}</InlineMath> manji od{" "}
              <InlineMath>{"a"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen drugi znak</h3>
            <p>
              Kada iz uslova dodira dobiješ{" "}
              <InlineMath>{"l^2 = \\dots"}</InlineMath>, moraš napisati oba slučaja{" "}
              <InlineMath>{"l = +\\sqrt{\\dots}"}</InlineMath> i{" "}
              <InlineMath>{"l = -\\sqrt{\\dots}"}</InlineMath>, osim ako zadatak
              dodatno ne suzi izbor.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna tačka za tangentnu formulu</h3>
            <p>
              Formula{" "}
              <InlineMath>
                {"\\frac{x x_0}{a^2}+\\frac{y y_0}{b^2}=1"}
              </InlineMath>{" "}
              važi samo ako je <InlineMath>{"P(x_0, y_0)"}</InlineMath> tačka
              elipse. Uvek kratko proveri uvrštavanjem.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ignorisanje vertikalnih tangenti</h3>
            <p>
              Ako slepo tražiš samo prave oblika{" "}
              <InlineMath>{"y = kx + l"}</InlineMath>, možeš prevideti{" "}
              <InlineMath>{"x = a"}</InlineMath> i{" "}
              <InlineMath>{"x = -a"}</InlineMath>. To je tipična ispitna zamka kada
              se traže sve tangente.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema realno pojavljuje na ispitu"
        description="Na prijemnom zadatke sa elipsom retko dobijaš kao čistu teoriju. Gotovo uvek su upakovani u pitanje o tangenti, parametru ili spoljašnjoj tački. Zato ti treba brza strategija pre nego što krene račun."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: pročitaj elipsu i izvedi geometriju">
            <p>
              Traže se poluose, žiže, ekscentricitet ili temena. Ovakvi zadaci
              deluju laki, ali su opasni zbog mešanja osa i pogrešnog čitanja većeg
              imenioca.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: tangente paralelne zadatoj pravoj">
            <p>
              Najkraći put: napišeš familiju{" "}
              <InlineMath>{"y = kx + l"}</InlineMath>, zadržiš nagib i iz uslova
              dodira dobiješ dve vrednosti za <InlineMath>{"l"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: tangente iz spoljašnje tačke">
            <p>
              Kroz zadatu tačku formiraš pravu sa nepoznatim nagibom. Zatim uslov
              dodira pretvara zadatak u jednačinu po <InlineMath>{"k"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: kombinacija sa prethodnom lekcijom o pravoj">
            <p>
              Često moraš prvo prevesti pravu iz implicitnog oblika u eksplicitni ili
              obrnuto. Znanje iz lekcije 50 ovde direktno radi za tebe.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ispitna rutina u 4 koraka">
          <p>
            1. Iz jednačine prvo pročitaj poluose i položaj velike ose.
            <br />
            2. Odmah odluči da li zadatak traži čitanje elementa elipse, tangentu u
            tački ili tangente iz familije pravih.
            <br />
            3. Ako je prava u obliku <InlineMath>{"y = kx + l"}</InlineMath>,
            koristi uslov dodira. Ako je tačka dodira poznata, koristi tangentnu
            jednačinu u tački.
            <br />
            4. Na kraju proveri da li postoji još jedno rešenje sa drugim znakom ili
            poseban vertikalni slučaj.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li možeš samostalno da vodiš ceo postupak"
        description="Reši zadatke bez gledanja u primere, pa tek onda otvori rešenja. Cilj nije da prepišeš formulu, nego da proveriš da li znaš kad koju formulu koristiš."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za elipsu{" "}
                <InlineMath>{"\\frac{x^2}{36}+\\frac{y^2}{20}=1"}</InlineMath>{" "}
                odredi poluose, žiže i ekscentricitet.
              </p>
            }
            solution={
              <>
                <MathBlock>{"a = 6, \\qquad b = \\sqrt{20} = 2\\sqrt{5}"}</MathBlock>
                <MathBlock>
                  {"c^2 = 36 - 20 = 16 \\Rightarrow c = 4"}
                </MathBlock>
                <MathBlock>
                  {
                    "F_1(-4,\\,0),\\quad F_2(4,\\,0),\\quad e = \\frac{4}{6} = \\frac{2}{3}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Nađi tangente elipse{" "}
                <InlineMath>{"\\frac{x^2}{25}+\\frac{y^2}{16}=1"}</InlineMath> koje
                su paralelne pravoj <InlineMath>{"y = 3x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"y = 3x + l, \\qquad l^2 = 25 \\cdot 9 + 16 = 241"}
                </MathBlock>
                <MathBlock>{"l = \\pm\\sqrt{241}"}</MathBlock>
                <MathBlock>
                  {"y = 3x + \\sqrt{241}, \\qquad y = 3x - \\sqrt{241}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Napiši tangentnu jednačinu elipse{" "}
                <InlineMath>{"\\frac{x^2}{25}+\\frac{y^2}{9}=1"}</InlineMath> u
                tački{" "}
                <InlineMath>
                  {"P\\left(\\frac{5}{2},\\,\\frac{3\\sqrt{3}}{2}\\right)"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{x \\cdot \\frac{5}{2}}{25}+\\frac{y \\cdot \\frac{3\\sqrt{3}}{2}}{9}=1"
                  }
                </MathBlock>
                <MathBlock>{"\\frac{x}{10}+\\frac{\\sqrt{3}\\,y}{6}=1"}</MathBlock>
                <MathBlock>{"3x + 5\\sqrt{3}\\,y = 30"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Kroz tačku <InlineMath>{"A(6,0)"}</InlineMath> nađi tangente na
                elipsu{" "}
                <InlineMath>{"\\frac{x^2}{16}+\\frac{y^2}{4}=1"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"y = k(x - 6) = kx - 6k"}</MathBlock>
                <MathBlock>{"(-6k)^2 = 16k^2 + 4"}</MathBlock>
                <MathBlock>
                  {
                    "36k^2 = 16k^2 + 4 \\Rightarrow 20k^2 = 4 \\Rightarrow k^2 = \\frac{1}{5}"
                  }
                </MathBlock>
                <MathBlock>{"k = \\pm\\frac{1}{\\sqrt{5}}"}</MathBlock>
                <MathBlock>
                  {
                    "y = \\frac{1}{\\sqrt{5}}(x - 6), \\qquad y = -\\frac{1}{\\sqrt{5}}(x - 6)"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Da li iz tačke <InlineMath>{"A(1,1)"}</InlineMath> postoje realne
                tangente na elipsu{" "}
                <InlineMath>{"\\frac{x^2}{9}+\\frac{y^2}{4}=1"}</InlineMath>?
              </p>
            }
            solution={
              <>
                <p>Proveri položaj tačke u odnosu na elipsu:</p>
                <MathBlock>
                  {
                    "\\frac{1^2}{9}+\\frac{1^2}{4}=\\frac{1}{9}+\\frac{1}{4}=\\frac{13}{36} < 1"
                  }
                </MathBlock>
                <p>
                  Tačka je unutar elipse, pa kroz nju ne mogu da se povuku realne
                  tangente. Zaključak: <strong>nema realnih tangenti</strong>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažniji misaoni obrazac: tangenta je granica između dva preseka i nijednog preseka"
        description="Ako ovu jednu ideju zapamtiš kako treba, moći ćeš i sam da obnoviš većinu formule. Kada prava dodiruje elipsu, sistem ne sme dati dva različita preseka. Zato je diskriminanta nula, a zato i nastaje uslov dodira. Formula dolazi iz ideje, ne obrnuto."
      >
        <InsightCard title="Ključni princip">
          <p>
            Uslov dodira nije izolovan trik, nego posledica jedne jasne geometrijske
            ideje: tangenta je položaj prave u kome diskriminanta sistema iznosi nula.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Čitanje elipse</h3>
            <p>
              Iz kanonske jednačine čitaš poluose i odmah zaključuješ duž koje ose
              je elipsa duža.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Žiže</h3>
            <p>
              Za standardni horizontalni slučaj važi{" "}
              <InlineMath>{"c^2 = a^2 - b^2"}</InlineMath>, pa su žiže na{" "}
              <InlineMath>{"x"}</InlineMath>-osi.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Uslov dodira</h3>
            <p>
              Za pravu <InlineMath>{"y = kx + l"}</InlineMath> i elipsu{" "}
              <InlineMath>{"x^2/a^2 + y^2/b^2 = 1"}</InlineMath> tangenta nastaje
              kada je <InlineMath>{"l^2 = a^2 k^2 + b^2"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Izbor metode</h3>
            <p>
              Kada znaš tačku dodira koristi tangentnu jednačinu u tački; kada znaš
              familiju pravih koristi uslov dodira.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je hiperbola: sličan alat, ali druga geometrijska
          slika, druge asimptote i drugačiji osećaj za položaj tangente.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
