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

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#intuicija", label: "Intuicija" },
  { href: "#formule", label: "Formule" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson35Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 35"
        title={
          <>
            Adicioni{" "}
            <span className={cs.tHeroAccent}>teoremi</span>
          </>
        }
        description="Ovo je lekcija u kojoj trigonometrija prelazi iz pukog čitanja vrednosti u pravo računanje sa uglovima. Adicioni teoremi ti omogućavaju da rastaviš težak ugao na dva lakša, da izvedeš specijalne vrednosti bez tablice i da u dugačkom izrazu prepoznaš skriven obrazac koji vodi do kratkog rešenja."
        heroImageSrc="/images/lessons/lesson35_hero.png"
        heroImageAlt="Jedinična kružnica sa uglovima alfa, beta i alfa plus beta, formule za sinus i kosinus zbira"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da sabiraš i oduzimaš uglove unutar sinusa, kosinusa i tangensa, pa iz toga dobiješ i posebne vrednosti i kraće dokaze.",
          },
          {
            label: "Najveća zamka",
            description:
              "Učenici često zapamte samo jednu formulu, a onda pogreše znak kod kosinusa ili znak u imeniocu tangensa.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci često traže sin 75\u00B0, cos 15\u00B0, tg 105\u00B0, ali i prepoznavanje izraza kao što je sin x cos y + cos x sin y.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70 do 95 minuta ako prođeš i geometrijsku intuiciju i prijemne primere.",
          },
          {
            label: "Predznanje",
            description:
              "Trigonometrijska kružnica, znaci po kvadrantima i svođenje na prvi kvadrant.",
          },
          {
            label: "Glavna veština",
            description:
              "Rastavljanje složenog ugla na jednostavnije delove i prepoznavanje obrasca unazad.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za zbir i razliku uglova sa numeričkom proverom formula.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Adicioni teoremi su motor cele ozbiljne trigonometrije"
        description="Do sada si uglavnom čitao vrednosti sa kružnice ili svodio ugao na prvi kvadrant. Sada dobijaš alat koji pravi sledeći veliki korak: omogućava ti da ugao rastaviš, da dokažeš nove identitete i da izvedeš formule koje dolaze u narednim lekcijama."
      >
        <div className={s.grid3}>
          <SectionCard title="Za naredne lekcije">
            <p>
              Formule dvostrukog ugla, polovine ugla i transformacije zbira u
              proizvod nastaju upravo iz adicionih teorema.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni">
            <p>
              Kada se traži tačna vrednost nezgodnog ugla, adicioni teoremi često
              daju najkraći put do rezultata.
            </p>
          </SectionCard>
          <SectionCard title="Za dokaze">
            <p>
              Mnogo identiteta izgleda komplikovano samo dok ne uočiš da je u
              pitanju skrivena formula za zbir ili razliku uglova.
            </p>
          </SectionCard>
        </div>

        <div style={{ marginTop: 16 }}>
          <SectionCard>
            <MathBlock>
              {
                "\\sin 75^\\circ = \\sin(45^\\circ + 30^\\circ),\\qquad \\cos 15^\\circ = \\cos(45^\\circ - 30^\\circ)"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto ova lekcija prirodno vodi ka dvostrukom uglu?"
          answer={
            <p>
              Zato što u adicione formule možeš da postaviš{" "}
              <InlineMath>{"\\beta = \\alpha"}</InlineMath>. Tada iz{" "}
              <InlineMath>{"\\sin(\\alpha+\\beta)"}</InlineMath> dobijaš{" "}
              <InlineMath>{"\\sin 2\\alpha"}</InlineMath>, a iz{" "}
              <InlineMath>{"\\cos(\\alpha+\\beta)"}</InlineMath> dobijaš{" "}
              <InlineMath>{"\\cos 2\\alpha"}</InlineMath>. Dakle, lekcija 36 je
              direktan nastavak ove.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTUICIJA ═══════════ */}
      <LessonSection
        id="intuicija"
        eyebrow="Intuitivno tumačenje"
        title="Zbir uglova znači dve uzastopne rotacije, ne samo dve brojke koje sabiraš"
        description="Najbolji način da razumeš adicione teoreme jeste da na ugao gledaš kao na rotaciju. Prvo napraviš rotaciju za \u03B1, pa zatim na već rotiran položaj dodaš još \u03B2. Konačni položaj je upravo ugao \u03B1+\u03B2."
      >
        <div className={s.grid2}>
          <SectionCard title="Geometrijska slika">
            <p>
              Tačka na jediničnoj kružnici koja odgovara uglu{" "}
              <InlineMath>{"\\alpha"}</InlineMath> ima koordinate{" "}
              <InlineMath>{"(\\cos\\alpha,\\sin\\alpha)"}</InlineMath>. Kada se
              ta tačka još jednom rotira za ugao{" "}
              <InlineMath>{"\\beta"}</InlineMath>, dobijaš novu tačku za ugao{" "}
              <InlineMath>{"\\alpha+\\beta"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta ne treba raditi">
            <p>
              Nije dobro da formule učiš kao četiri nepovezane rečenice. Mnogo je
              sigurnije da znaš priču o rotaciji i da zatim formule čitaš kao
              zapis te priče.
            </p>
          </SectionCard>
        </div>

        <div style={{ marginTop: 16 }}>
          <SectionCard>
            <MathBlock>
              {
                "\\begin{pmatrix} \\cos(\\alpha+\\beta) \\\\ \\sin(\\alpha+\\beta) \\end{pmatrix} = \\begin{pmatrix} \\cos\\beta & -\\sin\\beta \\\\ \\sin\\beta & \\cos\\beta \\end{pmatrix} \\begin{pmatrix} \\cos\\alpha \\\\ \\sin\\alpha \\end{pmatrix}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je baš minus u formuli za kosinus zbira?"
          answer={
            <p>
              Zato što pri rotaciji horizontalna komponenta nove tačke nastaje kao
              razlika dva doprinosa: deo starog{" "}
              <InlineMath>{"x"}</InlineMath>-pravca koji ostaje na{" "}
              <InlineMath>{"x"}</InlineMath>-osi i deo koji zbog rotacije
              prelazi iz <InlineMath>{"y"}</InlineMath>-pravca na suprotnu
              stranu. Zato se u formuli za kosinus javlja minus, dok sinus
              sabira doprinose.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Glavne formule"
        title="Šta zaista moraš da znaš sigurno"
        description="Sledeće formule su osnova. Njih ne treba znati napamet bez smisla, ali ih moraš znati stabilno i bez oklevanja, jer se na prijemnom vreme gubi upravo na nesigurnom prisećanju znaka."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sinus zbira i razlike"
            formula={"\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"}
            note="Sinus prati znak između uglova. Ako je unutra plus, plus je i između članova. Ako je unutra minus, minus ostaje i između članova."
          />
          <FormulaCard
            title="Kosinus zbira i razlike"
            formula={"\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"}
            note="Kosinus menja znak između članova. Zbog toga je najčešća greška da učenik kod kosinusa zadrži isti znak kao u zagradi."
          />
          <FormulaCard
            title="Tangens zbira i razlike"
            formula={"\\operatorname{tg}(\\alpha+\\beta)=\\frac{\\operatorname{tg}\\alpha+\\operatorname{tg}\\beta}{1-\\operatorname{tg}\\alpha\\operatorname{tg}\\beta}"}
            note="Brojnik prati znak kao kod sinusa, a imenilac ga menja. Ovo je korisno pravilo za pamćenje, ali uz obaveznu proveru da izraz ima smisla."
          />
          <FormulaCard
            title="Kako nastaje tangens"
            formula={"\\operatorname{tg}(\\alpha+\\beta)=\\frac{\\sin(\\alpha+\\beta)}{\\cos(\\alpha+\\beta)}=\\frac{\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta}{\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta}"}
            note="Ako podeliš brojilac i imenilac sa cos \u03B1 cos \u03B2, dobijaš standardnu formulu za tangens zbira. Zato ona nije nova magična formula, već posledica prethodnih."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Pravilo za pamćenje">
            <p>
              <em>
                Sinus prati znak, kosinus ga menja, tangens ga prati u brojniku
                i menja u imeniocu.
              </em>{" "}
              Ovo nije dokaz, ali je vrlo korisna mentalna skela pod pritiskom
              vremena.
            </p>
          </SectionCard>
          <SectionCard title="Uslov kod tangensa">
            <p>
              Kada koristiš formulu za tangens, proveri da li su i{" "}
              <InlineMath>{"\\operatorname{tg}\\alpha"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{tg}\\beta"}</InlineMath> definisani i
              da li imenilac nije nula.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kako da bez gledanja obnoviš formulu za cos(\u03B1\u2212\u03B2)?"
          answer={
            <>
              <p>
                Kreneš od rečenice: <em>kosinus menja znak</em>. Pošto je
                unutra minus, između članova će biti plus. Zato:
              </p>
              <MathBlock>
                {
                  "\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta"
                }
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Ovde se formula pretvara u stvaran alat"
        description="Na prijemnom nije dovoljno da kažeš &bdquo;znam formulu&ldquo;. Moraš umeti da izabereš dobar rastav ugla, da vodiš računa o znakovima i da vidiš kada izraz treba čitati obrnuto. Sledeći primeri prate upravo taj tok razmišljanja."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izračunaj <InlineMath>{"\\sin 75^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Rastavi ugao.">
                <p>
                  Pišemo{" "}
                  <InlineMath>{"75^\\circ = 45^\\circ + 30^\\circ"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni formulu za sinus zbira.">
                <MathBlock>
                  {
                    "\\sin 75^\\circ = \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Ubaci standardne vrednosti.">
                <MathBlock>
                  {
                    "= \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> nezgodan ugao si razbio na dve vrednosti
              koje znaš napamet.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izračunaj <InlineMath>{"\\cos 15^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapiši rastav.">
                <p>
                  Pišemo{" "}
                  <InlineMath>{"15^\\circ = 45^\\circ - 30^\\circ"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Primeni formulu za kosinus razlike."
              >
                <p>
                  Obrati pažnju: kod kosinusa razlike između članova je plus.
                </p>
                <MathBlock>
                  {
                    "\\cos 15^\\circ = \\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ\\sin 30^\\circ"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj.">
                <MathBlock>
                  {
                    "= \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Zanimljivo:</strong> dobili smo istu vrednost kao u prvom
              primeru jer važi{" "}
              <InlineMath>{"\\sin 75^\\circ = \\cos 15^\\circ"}</InlineMath>.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Izračunaj{" "}
              <InlineMath>{"\\operatorname{tg}105^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Rastavi ugao.">
                <p>
                  Pišemo{" "}
                  <InlineMath>
                    {"105^\\circ = 60^\\circ + 45^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni formulu za tangens zbira.">
                <MathBlock>
                  {
                    "\\operatorname{tg}105^\\circ = \\frac{\\operatorname{tg}60^\\circ+\\operatorname{tg}45^\\circ}{1-\\operatorname{tg}60^\\circ\\operatorname{tg}45^\\circ} = \\frac{\\sqrt{3}+1}{1-\\sqrt{3}}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title="Pažljivo izračunaj: racionalizuj imenilac."
              >
                <MathBlock>
                  {
                    "= \\frac{(\\sqrt{3}+1)(1+\\sqrt{3})}{(1-\\sqrt{3})(1+\\sqrt{3})} = \\frac{4+2\\sqrt{3}}{-2} = -2-\\sqrt{3}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovo je tipičan prijemni primer gde samo
              formula nije dovoljna; treba i dobra algebra.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Pojednostavi{" "}
              <InlineMath>
                {"\\sin x \\cos y + \\cos x \\sin y"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Ne pokušavaj da širiš izraz.">
                <p>Gledaj ga unazad i uporedi sa formulom za sinus zbira.</p>
              </WalkStep>
              <WalkStep number={2} title="Prepoznaj obrazac.">
                <p>
                  Redosled članova je isti kao u obrascu za{" "}
                  <InlineMath>{"\\sin(x+y)"}</InlineMath>.
                </p>
                <MathBlock>
                  {"\\sin x \\cos y + \\cos x \\sin y = \\sin(x+y)"}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> na prijemnom ova sposobnost prepoznavanja
              obrasca često štedi više vremena nego samo računanje vrednosti.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Pojednostavi{" "}
              <InlineMath>
                {"\\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Čitaj izraz unazad.">
                <p>
                  Pošto između proizvoda stoji plus, to odgovara formuli za
                  kosinus razlike. Važno je da ne pomešaš sa kosinusom zbira, gde
                  bi bio minus.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Zaključak.">
                <MathBlock>
                  {
                    "\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta=\\cos(\\alpha-\\beta)"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovo je jedna od najvažnijih formula za
              dokazivanje drugih identiteta.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Dokaži da je{" "}
              <InlineMath>
                {
                  "\\sin 75^\\circ\\cos 15^\\circ+\\cos 75^\\circ\\sin 15^\\circ=1"
                }
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj obrazac za sinus zbira.">
                <p>
                  Ovde igraju uloge{" "}
                  <InlineMath>{"x=75^\\circ"}</InlineMath> i{" "}
                  <InlineMath>{"y=15^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Zbir je 90\u00B0.">
                <MathBlock>
                  {
                    "\\sin 75^\\circ\\cos 15^\\circ+\\cos 75^\\circ\\sin 15^\\circ = \\sin(75^\\circ+15^\\circ) = \\sin 90^\\circ = 1"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> najlepši prijemni trik -- umesto dugog
              računa, uoči strukturu i zatvori zadatak u jednoj liniji.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ OBRASCI ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Obrasci i čitanje unazad"
        title="Najjači deo lekcije često nije računanje, nego prepoznavanje"
        description="U mnogim zadacima neće ti pisati sin(\u03B1+\u03B2), nego upravo razvijen izraz. Tvoj posao je tada da prepoznaš šta taj izraz zapravo predstavlja. Zato ove obrasce treba videti i unapred i unazad."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sinus zbira"
            formula={"\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta=\\sin(\\alpha+\\beta)"}
            note={
              <>
                Koristi kada u zadatku vidiš &bdquo;unakrsni&ldquo; zbir sinusa
                i kosinusa.
              </>
            }
          />
          <FormulaCard
            title="Sinus razlike"
            formula={"\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta=\\sin(\\alpha-\\beta)"}
            note="Minus se javlja između unakrsnih proizvoda. Ovo je bitan detalj kod dokazivanja identiteta."
          />
          <FormulaCard
            title="Kosinus zbira"
            formula={"\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta=\\cos(\\alpha+\\beta)"}
            note={
              <>
                Ako vidiš &bdquo;isti sa istim&ldquo; i između njih minus, vrlo
                verovatno je u pitanju kosinus zbira.
              </>
            }
          />
          <FormulaCard
            title="Kosinus razlike"
            formula={"\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta=\\cos(\\alpha-\\beta)"}
            note="Ovo je standardni obrazac u prijemnim zadacima gde se dugi izrazi svode na jedan kosinus."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: kako najbrže razlikovati da li je u pitanju sinus ili kosinus?"
          answer={
            <p>
              Gledaj raspored članova. Ako je izraz &bdquo;unakrstan&ldquo;,
              tipa{" "}
              <InlineMath>{"\\sin\\alpha\\cos\\beta"}</InlineMath> i{" "}
              <InlineMath>{"\\cos\\alpha\\sin\\beta"}</InlineMath>, misli na
              sinus. Ako je izraz &bdquo;isti sa istim&ldquo;, tipa{" "}
              <InlineMath>{"\\cos\\alpha\\cos\\beta"}</InlineMath> i{" "}
              <InlineMath>{"\\sin\\alpha\\sin\\beta"}</InlineMath>, misli na
              kosinus.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube poeni"
        description="Adicioni teoremi nisu konceptualno nedostižni, ali su osetljivi na znakove. Zbog toga je dobro da unapred znaš koje greške najčešće prave i solidni učenici."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kosinus dobije pogrešan znak
            </h3>
            <p>
              Tipična greška je{" "}
              <InlineMath>
                {
                  "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta"
                }
              </InlineMath>
              . To je pogrešno; kod kosinusa zbira mora stajati minus.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tangens ima dobar brojnik, ali loš imenilac
            </h3>
            <p>
              Učenik zapamti{" "}
              <InlineMath>
                {
                  "\\operatorname{tg}\\alpha \\pm \\operatorname{tg}\\beta"
                }
              </InlineMath>
              , ali zaboravi da se u imeniocu znak menja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Formula se koristi i kad nema smisla
            </h3>
            <p>
              Ako <InlineMath>{"\\operatorname{tg}\\alpha"}</InlineMath> ili{" "}
              <InlineMath>{"\\operatorname{tg}\\beta"}</InlineMath> nisu
              definisani, ne možeš mehanički ubaciti vrednosti u formulu za
              tangens.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Izraz se širi, a ne prepoznaje
            </h3>
            <p>
              Umesto da uoči{" "}
              <InlineMath>
                {"\\sin x\\cos y+\\cos x\\sin y=\\sin(x+y)"}
              </InlineMath>
              , učenik kreće u nepotreban račun sa pojedinačnim vrednostima.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Izabran je loš rastav ugla
            </h3>
            <p>
              Na primer, za <InlineMath>{"75^\\circ"}</InlineMath> učenik traži
              komplikovan rastav, iako je{" "}
              <InlineMath>{"45^\\circ+30^\\circ"}</InlineMath> prirodan i vodi
              direktno na standardne vrednosti.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljena veza sa prethodnom lekcijom
            </h3>
            <p>
              Ponekad i posle adicione formule moraš još da svedeš neki ugao na
              prvi kvadrant ili da proveriš znak. Ove lekcije rade zajedno, ne
              odvojeno.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se adicioni teoremi pojavljuju u realnim zadacima"
        description="Na prijemnom se adicioni teoremi retko pojavljuju kao &bdquo;napiši formulu&ldquo;. Mnogo češće su sakriveni u računu, u dokazu ili u zahtevu da nađeš tačnu vrednost nezgodnog ugla."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: tačna vrednost">
            <p>
              Zadaci poput{" "}
              <InlineMath>{"\\sin 75^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\cos 15^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{tg}105^\\circ"}</InlineMath>{" "}
              proveravaju da li umeš da izabereš dobar rastav ugla.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: dokaz identiteta">
            <p>
              Dugi izraz se često skupi u jednu funkciju ako u njemu prepoznaš
              obrazac za zbir ili razliku uglova.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: most ka narednim formulama">
            <p>
              Od tebe se može tražiti da izvedeš formulu za{" "}
              <InlineMath>{"\\sin 2\\alpha"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos 2\\alpha"}</InlineMath>. To je direktna
              primena ove lekcije sa{" "}
              <InlineMath>{"\\beta=\\alpha"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: kombinacija sa svođenjem">
            <p>
              Nije retko da najpre rastaviš ugao, a zatim deo rezultata dodatno
              svedeš na prvi kvadrant. Zato nije dovoljno znati samo jednu
              lekciju izolovano.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni ček-lista">
          <MathBlock>
            {
              "\\text{mogu li da rastavim ugao?} \\rightarrow \\text{koja formula ide?} \\rightarrow \\text{da li znak ima smisla?} \\rightarrow \\text{mogu li izraz da pročitam unazad?}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Vežbe za proveru razumevanja, ne samo pamćenja"
        description="Rešavaj redom. Prve vežbe proveravaju osnovnu upotrebu formula, a kasnije traže da prepoznaš obrazac ili da formulu koristiš kao alat za dokazivanje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\sin 15^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo{" "}
                  <InlineMath>
                    {"15^\\circ = 45^\\circ - 30^\\circ"}
                  </InlineMath>{" "}
                  i koristimo sinus razlike.
                </p>
                <MathBlock>
                  {
                    "\\sin 15^\\circ = \\sin 45^\\circ\\cos 30^\\circ - \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{6}-\\sqrt{2}}{4}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\cos 75^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Koristi{" "}
                  <InlineMath>
                    {"75^\\circ = 45^\\circ + 30^\\circ"}
                  </InlineMath>{" "}
                  i formulu za kosinus zbira.
                </p>
                <MathBlock>
                  {
                    "\\cos 75^\\circ = \\cos 45^\\circ\\cos 30^\\circ - \\sin 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt{6}-\\sqrt{2}}{4}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Pojednostavi{" "}
                <InlineMath>
                  {"\\cos x \\cos y - \\sin x \\sin y"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>To je obrazac za kosinus zbira.</p>
                <MathBlock>
                  {"\\cos x \\cos y - \\sin x \\sin y = \\cos(x+y)"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Pokaži da je{" "}
                <InlineMath>
                  {
                    "\\sin(x+y)-\\sin x \\cos y=\\cos x \\sin y"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Razvijemo{" "}
                  <InlineMath>{"\\sin(x+y)"}</InlineMath> po adicionoj
                  formuli:
                </p>
                <MathBlock>
                  {
                    "\\sin(x+y)=\\sin x \\cos y + \\cos x \\sin y"
                  }
                </MathBlock>
                <p>
                  Oduzimanjem{" "}
                  <InlineMath>{"\\sin x \\cos y"}</InlineMath> sa obe strane
                  dobijamo:
                </p>
                <MathBlock>
                  {
                    "\\sin(x+y)-\\sin x \\cos y=\\cos x \\sin y"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\operatorname{tg}15^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo{" "}
                  <InlineMath>
                    {"15^\\circ = 45^\\circ - 30^\\circ"}
                  </InlineMath>
                  .
                </p>
                <MathBlock>
                  {
                    "\\operatorname{tg}15^\\circ = \\frac{\\operatorname{tg}45^\\circ-\\operatorname{tg}30^\\circ}{1+\\operatorname{tg}45^\\circ\\operatorname{tg}30^\\circ} = \\frac{1-\\frac{\\sqrt{3}}{3}}{1+\\frac{\\sqrt{3}}{3}} = 2-\\sqrt{3}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Svedi{" "}
                <InlineMath>
                  {"\\sin x \\cos x + \\cos x \\sin x"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Izraz je dvaput isti član, ali još bolje je da ga pročitaš kao
                  sinus zbira sa{" "}
                  <InlineMath>{"y=x"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\sin x \\cos x + \\cos x \\sin x = \\sin(x+x)=\\sin 2x"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Ako su <InlineMath>{"\\alpha"}</InlineMath> i{" "}
                <InlineMath>{"\\beta"}</InlineMath> oštri uglovi,{" "}
                <InlineMath>{"\\sin\\alpha=\\frac{3}{5}"}</InlineMath> i{" "}
                <InlineMath>{"\\cos\\beta=\\frac{12}{13}"}</InlineMath>,
                izračunaj{" "}
                <InlineMath>{"\\sin(\\alpha+\\beta)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto su uglovi oštri, odgovarajući kosinus i sinus su
                  pozitivni.
                </p>
                <MathBlock>
                  {
                    "\\cos\\alpha=\\frac{4}{5},\\qquad \\sin\\beta=\\frac{5}{13}"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta = \\frac{3}{5}\\cdot\\frac{12}{13}+\\frac{4}{5}\\cdot\\frac{5}{13} = \\frac{56}{65}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Izvedi formulu za{" "}
                <InlineMath>{"\\cos 2x"}</InlineMath> iz adicionog teorema.
              </p>
            }
            solution={
              <>
                <p>
                  U formuli za kosinus zbira stavi{" "}
                  <InlineMath>{"\\alpha=x"}</InlineMath> i{" "}
                  <InlineMath>{"\\beta=x"}</InlineMath>.
                </p>
                <MathBlock>
                  {"\\cos 2x=\\cos(x+x)=\\cos^2 x-\\sin^2 x"}
                </MathBlock>
                <p>
                  Ovo je upravo veza između ove lekcije i sledeće.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Adicioni teoremi su mnogo više od četiri formule"
        description="Oni su način da ugao rastaviš, izraz prepoznaš i problem skratiš."
      >
        <InsightCard title="Glavna poruka">
          <p>
            Kad god vidiš nezgodan ugao, pitaj se da li možeš da ga razbiješ na
            dva poznata. Kad god vidiš dug trigonometrijski izraz, pitaj se da li
            možeš da ga pročitaš unazad kao zbir ili razliku uglova. Ta dva
            pitanja čine srce ove lekcije.
          </p>
        </InsightCard>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Prva misao">
            <p>
              Koji rastav ugla na poznate uglove najviše pojednostavljuje račun?
            </p>
          </SectionCard>
          <SectionCard title="Druga misao">
            <p>
              Da li znak u formuli za sinus, kosinus ili tangens ima smisla?
            </p>
          </SectionCard>
          <SectionCard title="Treća misao">
            <p>
              Može li se razvijen izraz prepoznati kao gotov adicioni obrazac?
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Sinus prati znak</h3>
            <p>
              <InlineMath>{"\\sin(\\alpha+\\beta)"}</InlineMath> ima plus između
              članova, a <InlineMath>{"\\sin(\\alpha-\\beta)"}</InlineMath>{" "}
              minus.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Kosinus menja znak</h3>
            <p>
              Kod kosinusa zbira stoji minus, a kod kosinusa razlike plus. To je
              najvažnija sitnica za sigurnost u računu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Tangens se izvodi iz sinusa i kosinusa
            </h3>
            <p>
              Ne uči ga kao izolovanu formulu. Tako ćeš lakše proveriti i znak i
              uslove definisanosti.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Obrazac moraš videti i unazad
            </h3>
            <p>
              Na prijemnom se često ne traži samo računanje, već i prepoznavanje
              da je dug izraz zapravo{" "}
              <InlineMath>{"\\sin(\\alpha+\\beta)"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos(\\alpha-\\beta)"}</InlineMath>.
            </p>
          </article>
        </div>

        <div style={{ marginTop: 16 }}>
          <SectionCard>
            <MathBlock>
              {
                "\\boxed{\\text{rastav ugla} \\rightarrow \\text{izbor formule} \\rightarrow \\text{tačne vrednosti ili prepoznavanje obrasca}}"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Šta je sledeći logičan korak u učenju?"
          answer={
            <p>
              Sledeća lekcija o dvostrukom i polovini ugla postaće mnogo
              prirodnija ako ovu znaš sigurno. Tada više nećeš učiti nove formule
              napamet, već ćeš ih videti kao posebne slučajeve adicionih
              teorema.
            </p>
          }
        />
      </LessonSection>
    </LessonShell>
  );
}
