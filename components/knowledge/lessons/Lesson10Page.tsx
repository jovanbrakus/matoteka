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
import PolarLab from "./PolarLab";
import GaussianPlaneDiagram from "./GaussianPlaneDiagram";
import QuadrantDiagram from "./QuadrantDiagram";
import UnitCircleDiagram from "./UnitCircleDiagram";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važno" },
  { href: "#zapis", label: "Trigonometrijski zapis" },
  { href: "#prelaz", label: "Prelaz između oblika" },
  { href: "#moivre", label: "Moivreova formula" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson10Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 10"
        title={
          <>
            Trigonometrijski oblik i{" "}
            <span className={cs.tHeroAccent}>Moivreova formula</span>
          </>
        }
        description="Kada kompleksan broj napišeš preko modula i argumenta, množenje postaje sabiranje uglova, stepenovanje postaje množenje ugla, a korenovanje se pretvara u uredan raspored tačaka na kružnici. Upravo zato je ova lekcija standardni filter na tehničkim prijemnim ispitima."
        heroImageSrc="/images/lessons/lesson10_hero.png"
        heroImageAlt="Ilustracija za lekciju o trigonometrijskom obliku kompleksnog broja"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da prevedeš a+bi u polarni zapis: modul, argument, kvadrant i pisanje broja u obliku r(cos φ + i sin φ).",
          },
          {
            label: "Najveća zamka",
            description:
              "Pogrešan kvadrant ili zaboravljen član 2kπ. Ako argument nije tačan, sve dalje puca: i stepeni i koreni i povratak u algebarski oblik.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Visoki stepeni i svi n-ti koreni. Tipičan zadatak traži brz prelaz u trigonometrijski oblik, Moivreovu formulu i konačan rezultat u obliku a+bi.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70 do 90 minuta sa crtanjem, laboratorijumom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description:
              "Algebarski oblik kompleksnog broja, modul, konjugat i osnovne trigonometrijske vrednosti.",
          },
          {
            label: "Glavna veština",
            description:
              "Siguran prelaz iz a+bi u trigonometrijski zapis i nazad, uz primenu Moivreove formule.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas polarni laboratorijum za stepene i n-te korene.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Algebra postaje geometrija, a geometrija štedi vreme"
        description='Ova lekcija nije samo "novi zapis" istog broja. Ona menja način razmišljanja: umesto teškog množenja i sređivanja, učiš da brojeve posmatraš kao dužine i uglove.'
      >
        <div className={s.grid3}>
          <SectionCard title="Visoki stepni postaju laki">
            <p>
              Ako broj pišeš kao{" "}
              <InlineMath>{"r(\\cos \\varphi + i\\sin \\varphi)"}</InlineMath>,
              onda se pri stepenovanju modul samo stepenuje, a ugao množi sa{" "}
              <InlineMath>{"n"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Koreni dobijaju geometrijski smisao">
            <p>
              <InlineMath>{"n"}</InlineMath>-ti koreni nenultog kompleksnog broja
              nisu slučajni. Leže na istoj kružnici i ravnomerno su raspoređeni
              pod uglovima razmaknutim za{" "}
              <InlineMath>{"\\dfrac{2\\pi}{n}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni zadaci ciljaju baš ovo">
            <p>
              ETF, FON i slični prijemni vole zadatke gde samo trigonometrijski
              oblik i Moivreova formula daju brz i čist put do rešenja.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ TRIGONOMETRIJSKI ZAPIS ═══════════ */}
      <LessonSection
        id="zapis"
        eyebrow="Trigonometrijski zapis"
        title="Broj kao modul i ugao"
        description="Umesto da broj gledaš samo kao a+bi, sada ga gledaš kao tačku udaljenu r od koordinatnog početka i pod uglom φ u odnosu na pozitivni smer realne ose."
      >
        <div className={s.grid3}>
          <SectionCard title="Modul">
            <MathBlock>{"r = |z| = \\sqrt{a^2+b^2}"}</MathBlock>
            <p>Modul je dužina vektora koji predstavlja kompleksan broj.</p>
          </SectionCard>
          <SectionCard title="Argument">
            <MathBlock>{"\\varphi = \\arg z"}</MathBlock>
            <p>
              Argument je ugao koji vektor broja{" "}
              <InlineMath>{"z"}</InlineMath> zaklapa sa pozitivnim smerom realne
              ose. Uvek proveravaš kvadrant, ne samo tangens.
            </p>
          </SectionCard>
          <SectionCard title="Trigonometrijski oblik">
            <MathBlock>
              {"z = r(\\cos \\varphi + i\\sin \\varphi), \\qquad r > 0"}
            </MathBlock>
            <p>
              U teoriji se često koristi i oznaka{" "}
              <InlineMath>{"z = r\\,\\mathrm{cis}\\,\\varphi"}</InlineMath>, ali
              na prijemnom je bezbednije pisati pun oblik.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Veza sa algebarskim oblikom">
            <MathBlock>
              {"a = r\\cos \\varphi,\\qquad b = r\\sin \\varphi"}
            </MathBlock>
            <p>
              Ove dve formule povezuju oba zapisa i omogućavaju prelaz u oba
              smera.
            </p>
          </SectionCard>
          <SectionCard title="Poseban slučaj: nula">
            <p>
              Za <InlineMath>{"z=0"}</InlineMath> modul je{" "}
              <InlineMath>{"0"}</InlineMath>, ali argument nije standardno
              definisan, pa se trigonometrijski oblik uglavnom koristi za{" "}
              <InlineMath>{"z \\neq 0"}</InlineMath>.
            </p>
            <MicroCheck
              question="Mikro-provera: Zašto nije dovoljno napisati samo tan φ = b/a?"
              answer={
                <p>
                  Zato što isti tangens imaju uglovi iz različitih kvadranata.
                  Tangens je samo pomoć, a kvadrant donosi konačnu odluku o
                  argumentu.
                </p>
              }
            />
          </SectionCard>
        </div>

        {/* NEW: Gaussian plane interactive diagram */}
        <GaussianPlaneDiagram />
      </LessonSection>

      {/* ═══════════ PRELAZ IZMEĐU OBLIKA ═══════════ */}
      <LessonSection
        id="prelaz"
        eyebrow="Prelaz između oblika"
        title="Kako da broj prevedeš bez greške"
        description="U ovoj temi najviše znači jasan postupak. Ako radiš korake istim redom, skoro da nema mesta za improvizovane greške."
      >
        <div className={s.grid2}>
          <SectionCard title="Iz algebarskog u trigonometrijski oblik">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Nađi modul <InlineMath>{"r"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"r = \\sqrt{a^2+b^2}"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Odredi referentni ugao."
              >
                <p>
                  Koristi{" "}
                  <InlineMath>
                    {"\\tan \\alpha = \\left|\\dfrac{b}{a}\\right|"}
                  </InlineMath>{" "}
                  ili prepoznaj specijalne vrednosti sa jedinične kružnice.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Nađi pravi kvadrant i napiši argument{" "}
                    <InlineMath>{"\\varphi"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Upiši broj u oblik{" "}
                    <InlineMath>
                      {"r(\\cos \\varphi + i\\sin \\varphi)"}
                    </InlineMath>
                    .
                  </>
                }
              />
            </div>
          </SectionCard>

          <SectionCard title="Iz trigonometrijskog u algebarski oblik">
            <p>
              Ako je broj već napisan kao{" "}
              <InlineMath>
                {"r(\\cos \\varphi + i\\sin \\varphi)"}
              </InlineMath>
              , onda samo koristiš:
            </p>
            <MathBlock>
              {"a = r\\cos \\varphi,\\qquad b = r\\sin \\varphi"}
            </MathBlock>
            <p>
              Kod specijalnih uglova{" "}
              <InlineMath>
                {
                  "\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}"
                }
              </InlineMath>{" "}
              posao je posebno brz.
            </p>
            <MicroCheck
              question="Mikro-provera: Koliko je 2(cos π/3 + i sin π/3) u algebarskom obliku?"
              answer={
                <MathBlock>
                  {
                    "2\\left(\\cos \\frac{\\pi}{3}+i\\sin \\frac{\\pi}{3}\\right)=2\\left(\\frac{1}{2}+\\frac{\\sqrt{3}}{2}i\\right)=1+\\sqrt{3}\\,i"
                  }
                </MathBlock>
              }
            />
          </SectionCard>
        </div>

        {/* NEW: Quadrant diagram */}
        <QuadrantDiagram />
      </LessonSection>

      {/* ═══════════ MOIVREOVA FORMULA ═══════════ */}
      <LessonSection
        id="moivre"
        eyebrow="Moivreova formula"
        title="Za stepene i za korene"
        description="U literaturi ćeš često sresti i naziv Moavrova formula. Suština je ista: u trigonometrijskom obliku množenje i stepenovanje postaju mnogo jednostavniji."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Moivreova formula za stepene"
            formula={"\\left[r(\\cos \\varphi + i\\sin \\varphi)\\right]^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)"}
            note={
              <>
                Modul ide na <InlineMath>{"n"}</InlineMath>-ti stepen, a ugao se
                množi sa <InlineMath>{"n"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Formula za n-te korene"
            formula={"z_k = \\sqrt[n]{r}\\left(\\cos \\frac{\\varphi+2k\\pi}{n} + i\\sin \\frac{\\varphi+2k\\pi}{n}\\right), \\quad k=0,1,\\dots,n-1"}
            note={
              <>
                Za nenulti broj dobijaš tačno{" "}
                <InlineMath>{"n"}</InlineMath> različitih korena.
              </>
            }
          />
          <FormulaCard
            title="Geometrijski raspored korena"
            formula={"\\frac{2\\pi}{n}"}
            note={
              <>
                Svi koreni imaju isti modul{" "}
                <InlineMath>{"\\sqrt[n]{r}"}</InlineMath> i zato leže na istoj
                kružnici. Susedni koreni su uglovno razmaknuti za ovaj iznos.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta radiš posle Moivreove formule">
            <ul>
              <li>
                Ako zadatak traži konačan broj, vrati rezultat iz
                trigonometrijskog u algebarski oblik.
              </li>
              <li>
                Ako zadatak pita da li je rezultat realan ili čisto imaginaran,
                čitaš ugao i koristiš vrednosti sinusa i kosinusa.
              </li>
              <li>
                Ako zadatak traži sve korene, obavezno napiši svih{" "}
                <InlineMath>{"n"}</InlineMath> vrednosti za{" "}
                <InlineMath>{"k=0,\\dots,n-1"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Najvažniji uvid">
            <p>
              Moivreova formula nije čarolija nego geometrija: pri množenju se
              moduli množe, a argumenti sabiraju. Zato se pri{" "}
              <InlineMath>{"n"}</InlineMath>-tom stepenu ugao množi sa{" "}
              <InlineMath>{"n"}</InlineMath>, a pri{" "}
              <InlineMath>{"n"}</InlineMath>-tom korenu deli sa{" "}
              <InlineMath>{"n"}</InlineMath>.
            </p>
            <MicroCheck
              question="Mikro-provera: Koliko četvrtih korena ima nenulti kompleksan broj?"
              answer={
                <p>
                  Tačno četiri. Uopšteno, nenulti kompleksan broj ima tačno{" "}
                  <InlineMath>{"n"}</InlineMath> različitih{" "}
                  <InlineMath>{"n"}</InlineMath>-tih korena.
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
        title="Polarni laboratorijum: stepeni i koreni"
        description="Menjaj modul, ugao i indeks n, pa odmah posmatraj kako se broj ponaša pri stepenovanju ili kako se n-ti koreni raspoređuju na kružnici."
      >
        <PolarLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa uglom i modulom, pa
            tek onda proveri ekran. Ako vidiš da ti koreni na kružnici deluju
            &ldquo;previše pravilno&rdquo;, upravo to i jeste poenta: nema haosa,
            sve je određeno formulom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description="Primeri su složeni tako da pokriju ceo put: prelaz u trigonometrijski oblik, stepenovanje, povratak u algebarski oblik i nalaženje svih korena."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Prelaz broja <InlineMath>{"1+i"}</InlineMath> u
              trigonometrijski oblik
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi modul.">
                <MathBlock>{"r = \\sqrt{1^2+1^2} = \\sqrt{2}"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi argument.">
                <p>
                  Tačka <InlineMath>{"(1,1)"}</InlineMath> je u prvom kvadrantu i
                  gradi ugao{" "}
                  <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Napiši konačan oblik.">
                <MathBlock>
                  {
                    "1+i=\\sqrt{2}\\left(\\cos \\frac{\\pi}{4}+i\\sin \\frac{\\pi}{4}\\right)"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izračunaj <InlineMath>{"(1+i)^8"}</InlineMath>
            </h3>
            <p>
              Ovo je klasičan primer gde trigonometrijski oblik pobedi algebarsko
              množenje.
            </p>
            <MathBlock>
              {
                "1+i=\\sqrt{2}\\left(\\cos \\frac{\\pi}{4}+i\\sin \\frac{\\pi}{4}\\right)"
              }
            </MathBlock>
            <MathBlock>
              {
                "(1+i)^8=\\left[\\sqrt{2}\\left(\\cos \\frac{\\pi}{4}+i\\sin \\frac{\\pi}{4}\\right)\\right]^8=(\\sqrt{2})^8\\left(\\cos 2\\pi+i\\sin 2\\pi\\right)"
              }
            </MathBlock>
            <MathBlock>{"(1+i)^8=16"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Stepen na jediničnoj kružnici
            </h3>
            <p>
              Izračunaj{" "}
              <InlineMath>
                {"\\left(\\cos 30^\\circ+i\\sin 30^\\circ\\right)^{12}"}
              </InlineMath>
              .
            </p>
            <MathBlock>
              {
                "\\left(\\cos 30^\\circ+i\\sin 30^\\circ\\right)^{12}=\\cos 360^\\circ+i\\sin 360^\\circ=1"
              }
            </MathBlock>
            <p>
              Kada je <InlineMath>{"r=1"}</InlineMath>, modul ostaje{" "}
              <InlineMath>{"1"}</InlineMath>, pa se sve svodi na ugao.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Reši jednačinu <InlineMath>{"z^3=8i"}</InlineMath>
            </h3>
            <p>Prvo napiši desnu stranu u trigonometrijskom obliku:</p>
            <MathBlock>
              {
                "8i = 8\\left(\\cos \\frac{\\pi}{2}+i\\sin \\frac{\\pi}{2}\\right)"
              }
            </MathBlock>
            <p>
              Treći koreni imaju modul <InlineMath>{"2"}</InlineMath>, a uglovi
              su:
            </p>
            <MathBlock>
              {"\\frac{\\frac{\\pi}{2}+2k\\pi}{3},\\qquad k=0,1,2"}
            </MathBlock>
            <MathBlock>
              {
                "\\varphi_0=\\frac{\\pi}{6},\\quad \\varphi_1=\\frac{5\\pi}{6},\\quad \\varphi_2=\\frac{3\\pi}{2}"
              }
            </MathBlock>
            <p>Zato su rešenja:</p>
            <MathBlock>
              {
                "z_0=\\sqrt{3}+i,\\qquad z_1=-\\sqrt{3}+i,\\qquad z_2=-2i"
              }
            </MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title='Ovo mora da "iskoči" čim vidiš zadatak'
        description="Kada ove formule prepoznaješ bez traženja po svesci, zadaci sa kompleksnim brojevima postaju uredni i kratki."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Trigonometrijski oblik"
            formula={"z = r(\\cos \\varphi+i\\sin \\varphi)"}
          />
          <FormulaCard
            title="Modul"
            formula={"r=|z|=\\sqrt{a^2+b^2}"}
          />
          <FormulaCard
            title="Veza sa koordinatama"
            formula={"a=r\\cos \\varphi,\\qquad b=r\\sin \\varphi"}
          />
          <FormulaCard
            title="Moivreova formula"
            formula={"z^n=r^n(\\cos n\\varphi+i\\sin n\\varphi)"}
          />
          <FormulaCard
            title="n-ti koreni"
            formula={"z_k=\\sqrt[n]{r}\\left(\\cos \\frac{\\varphi+2k\\pi}{n}+i\\sin \\frac{\\varphi+2k\\pi}{n}\\right)"}
          />
          <FormulaCard
            title="Razmak korena"
            formula={"\\Delta \\varphi=\\frac{2\\pi}{n}"}
          />
          <FormulaCard
            title="Opšti argument"
            formula={"\\varphi+2k\\pi,\\qquad k\\in\\mathbb{Z}"}
          />
          <FormulaCard
            title="Jedinična kružnica"
            formula={"|z|=1 \\Longrightarrow z=\\cos \\varphi+i\\sin \\varphi"}
          />
          <FormulaCard
            title="Poseban slučaj za realne rezultate"
            formula={"z^n \\in \\mathbb{R} \\Longleftrightarrow \\sin(n\\varphi)=0"}
            note={'Ovo je veoma korisno u zadacima sa uslovom \u201Erealan\u201C ili \u201E\u010Disto imaginaran\u201C.'}
          />
        </div>

        {/* NEW: Unit circle diagram */}
        <UnitCircleDiagram />
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Ovde se gube laki poeni"
        description={'Ve\u0107ina gre\u0161aka nije posledica \u201Ete\u0161ke formule\u201C, ve\u0107 lo\u0161e procene ugla ili nepa\u017Eljivog prelaza izme\u0111u oblika.'}
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan kvadrant argumenta</h3>
            <p>
              Najčešća greška je uzeti ugao iz{" "}
              <InlineMath>{"\\arctan"}</InlineMath> i ne proveriti u kom se
              kvadrantu zaista nalazi tačka{" "}
              <InlineMath>{"(a,b)"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen faktor <InlineMath>{"2k\\pi"}</InlineMath>
            </h3>
            <p>
              Kod korena moraš uzeti sve uglove{" "}
              <InlineMath>{"\\varphi+2k\\pi"}</InlineMath>. Ako to preskočiš,
              izgubićeš veći deo rešenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje stepeni i radijana</h3>
            <p>
              U jednoj računici ne mešaj{" "}
              <InlineMath>{"30^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath> bez jasne konverzije.
              Na papiru zadrži jednu jedinicu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešno stepenovanje modula</h3>
            <p>
              Pri <InlineMath>{"z^n"}</InlineMath> ne dobijaš{" "}
              <InlineMath>{"nr"}</InlineMath>, nego{" "}
              <InlineMath>{"r^n"}</InlineMath>. Ovo je suštinska razlika.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Vraćanje rezultata zaboravljeno</h3>
            <p>
              Mnogi učenici dobro primene Moivreovu formulu, ali ne vrate broj
              nazad u algebarski oblik kada zadatak to traži.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Broj <InlineMath>{"0"}</InlineMath> tretiran kao običan slučaj
            </h3>
            <p>
              Za nulu argument nije standardno definisan, pa se tipična priča sa
              trigonometrijskim zapisom i korenima vodi za nenulte brojeve.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta se najčešće traži na testu"
        description="Na prijemnom se ova tema javlja kao spoj tehnike i brzine: moraš prepoznati da je trigonometrijski oblik pravi alat, a zatim odraditi račun bez lutanja."
      >
        <div className={s.grid3}>
          <SectionCard title="Veliki stepni">
            <p>
              Tipičan zadatak da ti broj u algebarskom obliku, a traži vrlo visok
              stepen. Suština je da ga prebaciš u trigonometrijski oblik i
              primeniš Moivreovu formulu.
            </p>
          </SectionCard>
          <SectionCard title="Svi koreni zadatog broja">
            <p>
              Traži se svih <InlineMath>{"n"}</InlineMath> korena, često i
              njihov algebarski zapis. Tu proveravaš da li znaš da napišeš svih{" "}
              <InlineMath>{"k=0,\\dots,n-1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Uslov realan ili imaginaran">
            <p>
              Kada zadatak pita kada je rezultat realan ili čisto imaginaran,
              tražiš uslov na sinus i kosinus dobijenog ugla.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 5 koraka">
          <p>
            1. Prevedi broj u trigonometrijski oblik. 2. Nađi tačan kvadrant
            argumenta. 3. Primeni Moivreovu formulu ili formulu za korene. 4.
            Uredi sve uglove. 5. Ako treba, vrati rezultat u oblik{" "}
            <InlineMath>{"a+bi"}</InlineMath>. Taj redosled rešava veliki deo
            zadataka iz ove oblasti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Samostalna provera razumevanja"
        description="Vežbe su poređane od lakših ka tipično prijemnim. Rešavaj ih redom i proveravaj da li koristiš isti postupak svaki put."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Prevedi broj{" "}
                <InlineMath>{"-1+\\sqrt{3}\\,i"}</InlineMath> u trigonometrijski
                oblik.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"r=\\sqrt{(-1)^2+(\\sqrt{3})^2}=2"}
                </MathBlock>
                <p>
                  Tačka je u drugom kvadrantu, pa je{" "}
                  <InlineMath>{"\\varphi=\\frac{2\\pi}{3}"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "-1+\\sqrt{3}\\,i=2\\left(\\cos \\frac{2\\pi}{3}+i\\sin \\frac{2\\pi}{3}\\right)"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Prevedi{" "}
                <InlineMath>
                  {
                    "3\\left(\\cos \\frac{\\pi}{3}+i\\sin \\frac{\\pi}{3}\\right)"
                  }
                </InlineMath>{" "}
                u algebarski oblik.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "3\\left(\\cos \\frac{\\pi}{3}+i\\sin \\frac{\\pi}{3}\\right)=3\\left(\\frac{1}{2}+\\frac{\\sqrt{3}}{2}i\\right)=\\frac{3}{2}+\\frac{3\\sqrt{3}}{2}i"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj <InlineMath>{"(1-i)^6"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "1-i=\\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{4}\\right)+i\\sin\\left(-\\frac{\\pi}{4}\\right)\\right)"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "(1-i)^6=(\\sqrt{2})^6\\left(\\cos\\left(-\\frac{3\\pi}{2}\\right)+i\\sin\\left(-\\frac{3\\pi}{2}\\right)\\right)=8i"
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
                  {
                    "\\left(\\cos \\frac{\\pi}{8}+i\\sin \\frac{\\pi}{8}\\right)^8"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\left(\\cos \\frac{\\pi}{8}+i\\sin \\frac{\\pi}{8}\\right)^8=\\cos \\pi+i\\sin \\pi=-1"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Odredi sve treće korene broja <InlineMath>{"8"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo{" "}
                  <InlineMath>{"8=8(\\cos 0+i\\sin 0)"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "z_k=2\\left(\\cos \\frac{2k\\pi}{3}+i\\sin \\frac{2k\\pi}{3}\\right),\\qquad k=0,1,2"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "z_0=2,\\qquad z_1=-1+\\sqrt{3}\\,i,\\qquad z_2=-1-\\sqrt{3}\\,i"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Odredi sve četvrte korene broja <InlineMath>{"16"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo{" "}
                  <InlineMath>{"16=16(\\cos 0+i\\sin 0)"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "z_k=2\\left(\\cos \\frac{k\\pi}{2}+i\\sin \\frac{k\\pi}{2}\\right),\\qquad k=0,1,2,3"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "z_0=2,\\qquad z_1=2i,\\qquad z_2=-2,\\qquad z_3=-2i"
                  }
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Trigonometrijski oblik nije ukrasni zapis nego pravi alat. On pretvara komplikovano algebarsko stepnovanje u urednu geometrijsku transformaciju."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Prvo nađi } r \\text{ i } \\varphi,\\ \\text{zatim primeni formulu, pa tek onda vrati rezultat u } a+bi."
            }
          </MathBlock>
          <p>
            Ko preskoči prvi korak, obično izgubi kvadrant ili deo rešenja. Ko ga
            odradi mirno, dobija najbrži put kroz zadatak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako ti je sledećih šest stavki jasno, temelj za sve ozbiljnije zadatke iz kompleksnih brojeva je postavljen."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Trigonometrijski zapis</h3>
            <p>
              Za nenulti broj važi{" "}
              <InlineMath>{"z=r(\\cos \\varphi+i\\sin \\varphi)"}</InlineMath>,
              gde je <InlineMath>{"r=|z|"}</InlineMath>, a{" "}
              <InlineMath>{"\\varphi"}</InlineMath> argument.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Modul i argument</h3>
            <p>
              Modul se računa preko Pitagore, a argument traži i račun i proveru
              kvadranta.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Prelaz između oblika</h3>
            <p>
              Koristiš <InlineMath>{"a=r\\cos \\varphi"}</InlineMath> i{" "}
              <InlineMath>{"b=r\\sin \\varphi"}</InlineMath> za povratak u
              algebarski oblik.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Moivreova formula</h3>
            <p>
              Pri stepenovanju modul ide na <InlineMath>{"n"}</InlineMath>-ti
              stepen, a ugao se množi sa <InlineMath>{"n"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. <InlineMath>{"n"}</InlineMath>-ti koreni
            </h3>
            <p>
              Koreni imaju isti modul{" "}
              <InlineMath>{"\\sqrt[n]{r}"}</InlineMath> i međusobni ugaoni razmak{" "}
              <InlineMath>{"\\frac{2\\pi}{n}"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Sada si spreman za složenije zadatke gde se kombinuju kompleksni
              brojevi sa jednačinama, parametrima i geometrijskim uslovima.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 10 zatvara osnovni ciklus o kompleksnim brojevima: od oblika{" "}
          <InlineMath>{"a+bi"}</InlineMath> do polarne slike, stepenovanja i
          korenovanja.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
