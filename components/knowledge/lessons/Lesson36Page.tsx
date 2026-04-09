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
  { href: "#izvodjenje", label: "Izvođenje" },
  { href: "#dvostruki", label: "Dvostruki ugao" },
  { href: "#polovina", label: "Polovina ugla" },
  { href: "#snizavanje", label: "Snižavanje stepena" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključni obrasci" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson36Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 36"
        title={
          <>
            Trigonometrijske funkcije{" "}
            <span className={cs.tHeroAccent}>
              dvostrukog ugla i polovine ugla
            </span>
          </>
        }
        description="Ova lekcija je mesto na kom adicioni teoremi prestaju da budu samo &quot;formule za zbir&quot; i postaju alat za stvarni rad. Iz njih sada dobijaš formule za 2α, za α/2, ali i vrlo praktičnu tehniku snižavanja stepena. To je upravo ono što na prijemnom pravi razliku između sporog i elegantnog rešenja."
        heroImageSrc="/api/lessons/36/hero"
        heroImageAlt="Apstraktna matematička tabla sa jediničnom kružnicom i formulama za dvostruki ugao i polovinu ugla"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da iz adicione formule izvedeš i koristiš oblike za 2α, α/2 i snižavanje stepena u stvarnim zadacima.",
          },
          {
            label: "Najveća zamka",
            description:
              "Kod polovine ugla učenici najčešće zaborave da znak ispred korena ne bira formula sama, nego kvadrant ugla α/2.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Tipični zadaci traže sin 15°, cos 22.5°, transformaciju sin²x ili pametan izbor između više oblika za cos 2x.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "75 do 100 minuta uz ozbiljan rad na znaku kod polovine ugla i primerima snižavanja stepena.",
          },
          {
            label: "Predznanje",
            description:
              "Adicioni teoremi, trigonometrijska kružnica i svođenje na prvi kvadrant.",
          },
          {
            label: "Glavna veština",
            description:
              "Izbor prave transformacije: dvostruki ugao, polovina ugla ili snižavanje stepena.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja pokazuje kako se originalni ugao menja u 2α, α/2 ili u formule sa 2α.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde trigonometrijski izraz počinje da se preoblikuje, a ne samo da se izračunava"
        description="Na prijemnom vrlo često ne dobijaš &quot;lep&quot; ugao koji samo očitaš sa kružnice. Umesto toga, dobijaš izraz koji treba pretvoriti u pogodniji oblik. Tu nastupaju dvostruki ugao, polovina ugla i snižavanje stepena: tri alata za prevođenje jednog trigonometrijskog jezika u drugi."
      >
        <div className={s.grid3}>
          <SectionCard title="Za naredne lekcije">
            <p>
              Bez ovih formula nema sigurnog rada sa transformacijama zbira u
              proizvod, složenijim jednačinama i mnogim standardnim
              identitetima.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni">
            <p>
              Ušteda vremena dolazi kad odmah vidiš da treba koristiti{" "}
              <InlineMath>{"1-2\\sin^2 x"}</InlineMath>, a ne{" "}
              <InlineMath>{"\\cos^2 x - \\sin^2 x"}</InlineMath>, ili kada iz{" "}
              <InlineMath>{"\\cos 45^\\circ"}</InlineMath> izvedeš{" "}
              <InlineMath>{"\\cos 22{,}5^\\circ"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Za razumevanje">
            <p>
              Ove formule povezuju uglove i stepene funkcija. Zato su most
              između &ldquo;rada sa uglovima&rdquo; i &ldquo;rada sa
              izrazima&rdquo;.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\sin^2 x = \\frac{1-\\cos 2x}{2},\\qquad \\cos^2 x = \\frac{1+\\cos 2x}{2}"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: zašto je snižavanje stepena toliko važno?"
          answer={
            <p>
              Zato što izraz sa kvadratom funkcije često nije zgodan za dalje
              računanje, dok izraz sa{" "}
              <InlineMath>{"\\cos 2x"}</InlineMath> ili{" "}
              <InlineMath>{"\\sin 2x"}</InlineMath> jeste. Drugim rečima,
              snižavanje stepena menja oblik izraza u nešto što se lakše
              sabira, poredi ili rešava.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ IZVOĐENJE ═══════════ */}
      <LessonSection
        id="izvodjenje"
        eyebrow="Odakle formule dolaze"
        title="Najsigurnije pamćenje je ono koje ima poreklo"
        description="Učenik koji samo pamti finalne oblike lako izgubi znak ili faktor 2. Učenik koji zna odakle su formule nastale može da ih obnovi i kad se pod pritiskom zbuni. Zato prvo treba da vidiš logiku nastanka."
      >
        <div className={s.grid2}>
          <SectionCard title="Korak 1: Pođi od adicionih formula">
            <p>Već znaš da važi:</p>
            <MathBlock>
              {
                "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Korak 2: Stavi β = α">
            <p>Tada zbir postaje dvostruki ugao. Dobijaš:</p>
            <MathBlock>
              {
                "\\sin 2\\alpha = \\sin(\\alpha+\\alpha) = 2\\sin\\alpha\\cos\\alpha"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\cos 2\\alpha = \\cos(\\alpha+\\alpha) = \\cos^2\\alpha - \\sin^2\\alpha"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Korak 3: Alternativni oblici za cos 2α">
            <p>
              Kada koristiš{" "}
              <InlineMath>{"\\sin^2\\alpha + \\cos^2\\alpha = 1"}</InlineMath>,
              dobijaš još dva oblika iste formule:
            </p>
            <MathBlock>
              {"\\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 2\\cos^2\\alpha - 1"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Korak 4: Polovina ugla nastaje obrnutim čitanjem">
            <p>
              Pođi od formule za{" "}
              <InlineMath>{"\\cos 2\\theta"}</InlineMath>, pa umesto{" "}
              <InlineMath>{"2\\theta"}</InlineMath> upiši{" "}
              <InlineMath>{"\\alpha"}</InlineMath>. Tada je{" "}
              <InlineMath>{"\\theta = \\frac{\\alpha}{2}"}</InlineMath>:
            </p>
            <MathBlock>
              {
                "\\cos\\alpha = 1 - 2\\sin^2\\frac{\\alpha}{2} \\quad\\Longrightarrow\\quad \\sin^2\\frac{\\alpha}{2} = \\frac{1-\\cos\\alpha}{2}"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Glavna ideja">
            <p>
              Dvostruki ugao je &ldquo;saberi isti ugao sa samim sobom&rdquo;,
              a polovina ugla je &ldquo;pročitaj formulu za dvostruki ugao
              unazad&rdquo;.
            </p>
          </SectionCard>
          <SectionCard title="Šta nikad ne preskači">
            <p>
              Kada pređeš sa kvadrata na koren, moraš da razmisliš o znaku.
              Formula daje kvadrat, a kvadrant daje plus ili minus ispred
              korena.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto se kod polovine ugla pojavljuje koren?"
          answer={
            <p>
              Zato što formule prirodno daju{" "}
              <InlineMath>{"\\sin^2 \\frac{\\alpha}{2}"}</InlineMath> i{" "}
              <InlineMath>{"\\cos^2 \\frac{\\alpha}{2}"}</InlineMath>. Da bi
              iz kvadrata prešao na samu funkciju, moraš uzeti koren. Ali koren
              daje apsolutnu vrednost, pa znak biraš iz kvadranta ugla{" "}
              <InlineMath>{"\\frac{\\alpha}{2}"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DVOSTRUKI UGAO ═══════════ */}
      <LessonSection
        id="dvostruki"
        eyebrow="Dvostruki ugao"
        title="Jedna tema, ali više korisnih oblika"
        description="Formule dvostrukog ugla treba znati u funkcionalnom smislu. Nije cilj da samo znaš jedan zapis, već da umeš da izabereš onaj oblik koji uklanja nepoznatu funkciju ili stepen koji ti smeta."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sinus dvostrukog ugla"
            formula={"\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha"}
            note="Ovo je najdirektniji oblik. Posebno je koristan kada u izrazu vidiš proizvod sin α cos α."
          />
          <FormulaCard
            title="Kosinus dvostrukog ugla"
            formula={"\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha"}
            note="Najsimetričniji oblik, ali ne uvek i najpraktičniji. Dobar je kad u zadatku već imaš i sin²α i cos²α."
          />
          <FormulaCard
            title="Prvi praktični oblik za cos 2α"
            formula={"\\cos 2\\alpha = 1 - 2\\sin^2\\alpha"}
            note="Ovaj oblik biraš kada znaš sin α, a ne želiš da tražiš cos α. Čest je u zadacima sa snižavanjem stepena."
          />
          <FormulaCard
            title="Drugi praktični oblik za cos 2α"
            formula={"\\cos 2\\alpha = 2\\cos^2\\alpha - 1"}
            note="Ovaj oblik je zgodan kada znaš cos α. Vrlo često štedi jedan ceo korak u prijemnom zadatku."
          />
          <FormulaCard
            title="Tangens dvostrukog ugla"
            formula={"\\operatorname{tg}\\,2\\alpha = \\frac{2\\operatorname{tg}\\alpha}{1 - \\operatorname{tg}^2\\alpha}"}
            note="Veoma korisno, ali pazi na imenilac. Ako je 1 − tg²α = 0, izraz nije definisan."
          />
          <FormulaCard
            title="Kako biraš pravi oblik"
            formula={"\\sin\\alpha \\to 1 - 2\\sin^2\\alpha, \\quad \\cos\\alpha \\to 2\\cos^2\\alpha - 1"}
            note="Ako znaš sin α, koristi 1 − 2sin²α. Ako znaš cos α, koristi 2cos²α − 1. Ako vidiš proizvod sin α cos α, pomisli na sin 2α."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: ako znaš samo sin α, koji oblik za cos 2α je najbrži?"
          answer={
            <>
              <p>Najbrži je</p>
              <MathBlock>{"\\cos 2\\alpha = 1 - 2\\sin^2\\alpha,"}</MathBlock>
              <p>
                jer izbegavaš računanje{" "}
                <InlineMath>{"\\cos\\alpha"}</InlineMath>.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ POLOVINA UGLA ═══════════ */}
      <LessonSection
        id="polovina"
        eyebrow="Polovina ugla"
        title="Formula daje kvadrat, ali kvadrant daje znak"
        description="Kod polovine ugla matematika je potpuno jasna, ali tipična greška dolazi u poslednjem koraku. Učenik dobije koren i odmah uzme plus, a to nije uvek dozvoljeno. Zato ovde moraju zajedno da rade formula i kružnica."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kvadratne formule"
            formula={"\\sin^2\\frac{\\alpha}{2} = \\frac{1-\\cos\\alpha}{2},\\qquad \\cos^2\\frac{\\alpha}{2} = \\frac{1+\\cos\\alpha}{2}"}
            note="Ovo su polazne, potpuno sigurne formule. One još ne rešavaju znak."
          />
          <FormulaCard
            title="Formula sa znakom"
            formula={"\\sin\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1-\\cos\\alpha}{2}},\\qquad \\cos\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1+\\cos\\alpha}{2}}"}
            note="Znak ispred korena zavisi od kvadranta ugla α/2, ne od ugla α."
          />
          <FormulaCard
            title="Tangens polovine ugla"
            formula={"\\operatorname{tg}\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1-\\cos\\alpha}{1+\\cos\\alpha}}"}
            note="Ovaj oblik je koristan, ali ponekad je praktičnije koristiti racionalne varijante ispod."
          />
          <FormulaCard
            title="Praktične varijante"
            formula={"\\operatorname{tg}\\frac{\\alpha}{2} = \\frac{\\sin\\alpha}{1+\\cos\\alpha} = \\frac{1-\\cos\\alpha}{\\sin\\alpha}"}
            note="Ove varijante su vrlo korisne kad želiš da izbegneš koren ili kad se lepše skraćuju u izrazu."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako određuješ znak">
            <p>
              Najpre proceni gde leži{" "}
              <InlineMath>{"\\frac{\\alpha}{2}"}</InlineMath>. Ako je u I
              kvadrantu, i sinus i kosinus su pozitivni. Ako je u II kvadrantu,
              sinus je pozitivan, a kosinus negativan.
            </p>
          </SectionCard>
          <SectionCard title="Najčešća zamka">
            <p>
              Ako je <InlineMath>{"\\alpha"}</InlineMath> u III kvadrantu, to ne
              znači da je i{" "}
              <InlineMath>{"\\frac{\\alpha}{2}"}</InlineMath> u III kvadrantu.
              Na primer, ako je{" "}
              <InlineMath>{"\\alpha = 240^\\circ"}</InlineMath>, onda je{" "}
              <InlineMath>{"\\frac{\\alpha}{2} = 120^\\circ"}</InlineMath>, a
              to je II kvadrant.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je α = 300°, kakav je znak za cos(α/2)?"
          answer={
            <p>
              Tada je{" "}
              <InlineMath>{"\\frac{\\alpha}{2} = 150^\\circ"}</InlineMath>, a
              to je II kvadrant. U II kvadrantu kosinus je negativan, pa ispred
              korena mora stajati minus.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ SNIŽAVANJE STEPENA ═══════════ */}
      <LessonSection
        id="snizavanje"
        eyebrow="Snižavanje stepena"
        title="Kada kvadrat funkcije postane prepreka, prebaci ga na dupli ugao"
        description="Ova tehnika je praktična i vrlo česta. U mnogim zadacima kvadrat funkcije nije pogodan za dalji rad, dok izraz sa 2x jeste. Zato je prelaz između ta dva oblika jedna od najkorisnijih malih veština u celoj trigonometriji."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Snižavanje za sinus"
            formula={"\\sin^2 x = \\frac{1-\\cos 2x}{2}"}
            note={
              <>
                Ovo dobijaš iz{" "}
                <InlineMath>{"\\cos 2x = 1 - 2\\sin^2 x"}</InlineMath>.
                Korisno je kad želiš da eliminišeš kvadrat sinusa.
              </>
            }
          />
          <FormulaCard
            title="Snižavanje za kosinus"
            formula={"\\cos^2 x = \\frac{1+\\cos 2x}{2}"}
            note="Ovaj oblik često radi zajedno sa prethodnim, posebno kad u zadatku imaš zbir sin²x i cos²x ili razliku tih članova."
          />
          <FormulaCard
            title="Proizvod sinusa i kosinusa"
            formula={"\\sin x \\cos x = \\frac{\\sin 2x}{2}"}
            note="Vrlo važna mini-formula. Čim vidiš proizvod sin x cos x, treba da ti padne na pamet sin 2x."
          />
        </div>

        <InsightCard title="Šta se time dobija">
          <p>
            Snižavanje stepena ne &ldquo;rešava zadatak&rdquo; samo po sebi,
            ali često pretvara izraz u oblik koji se lakše sabira, rešava ili
            prepoznaje kao poznat obrazac.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto je sin²x = (1 − cos 2x)/2 dobar oblik?"
          answer={
            <p>
              Zato što kvadrat funkcije prelazi u linearni izraz po{" "}
              <InlineMath>{"\\cos 2x"}</InlineMath>. Time se često otvara put
              ka jednostavnijem sabiranju, rešavanju jednačina ili
              prepoznavanju identiteta.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji najviše liče na prijemni način razmišljanja"
        description="U ovim zadacima nije dovoljno znati formulu. Potrebno je izabrati pravi oblik, voditi računa o znaku i prepoznati kada kvadrat funkcije treba &quot;spustiti&quot; na dupli ugao."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izračunaj{" "}
              <InlineMath>{"\\sin 2\\alpha"}</InlineMath> i{" "}
              <InlineMath>{"\\cos 2\\alpha"}</InlineMath>
            </h3>
            <p>
              Ako je{" "}
              <InlineMath>{"\\sin\\alpha = \\frac{3}{5}"}</InlineMath> i{" "}
              <InlineMath>{"\\alpha"}</InlineMath> je u I kvadrantu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Nađi{" "}
                    <InlineMath>{"\\cos\\alpha"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Pošto je <InlineMath>{"\\alpha"}</InlineMath> u I kvadrantu,{" "}
                  <InlineMath>{"\\cos\\alpha = \\frac{4}{5}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Koristi formulu{" "}
                    <InlineMath>{"2\\sin\\alpha\\cos\\alpha"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\sin 2\\alpha = 2 \\cdot \\frac{3}{5} \\cdot \\frac{4}{5} = \\frac{24}{25}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Za <InlineMath>{"\\cos 2\\alpha"}</InlineMath> biraj oblik{" "}
                    <InlineMath>{"1 - 2\\sin^2\\alpha"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\cos 2\\alpha = 1 - 2\\left(\\frac{3}{5}\\right)^2 = 1 - \\frac{18}{25} = \\frac{7}{25}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ne koristiš &ldquo;najlepši&rdquo;
              oblik, nego najkorisniji.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izračunaj{" "}
              <InlineMath>{"\\sin 15^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Piši 15° = 30°/2.">
                <p>
                  Koristi formulu za polovinu ugla preko kosinusa punog ugla.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Pošto je 15° u I kvadrantu, uzimaš pozitivan koren."
              >
                <MathBlock>
                  {
                    "\\sin 15^\\circ = \\sqrt{\\frac{1 - \\cos 30^\\circ}{2}} = \\sqrt{\\frac{1 - \\frac{\\sqrt{3}}{2}}{2}} = \\sqrt{\\frac{2-\\sqrt{3}}{4}} = \\frac{\\sqrt{2-\\sqrt{3}}}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovde je presudan znak: ugao je u I
              kvadrantu, pa nema minusa ispred korena.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Izračunaj{" "}
              <InlineMath>{"\\cos 22{,}5^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Piši 22,5° = 45°/2.">
                <p>Koristi formulu za kosinus polovine ugla.</p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Pošto je 22,5° u I kvadrantu, znak je pozitivan."
              >
                <MathBlock>
                  {
                    "\\cos 22{,}5^\\circ = \\sqrt{\\frac{1 + \\cos 45^\\circ}{2}} = \\sqrt{\\frac{1 + \\frac{\\sqrt{2}}{2}}{2}} = \\sqrt{\\frac{2+\\sqrt{2}}{4}} = \\frac{\\sqrt{2+\\sqrt{2}}}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovo je klasičan zadatak za proveru da li
              zaista umeš da radiš polovinu ugla, a ne samo dvostruki ugao.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Polovina ugla sa znakom
            </h3>
            <p>
              Ako je{" "}
              <InlineMath>{"\\cos\\alpha = -\\frac{3}{5}"}</InlineMath> i{" "}
              <InlineMath>{"\\alpha"}</InlineMath> je u III kvadrantu, odredi{" "}
              <InlineMath>{"\\sin\\frac{\\alpha}{2}"}</InlineMath> i{" "}
              <InlineMath>{"\\cos\\frac{\\alpha}{2}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Odredi kvadrant ugla α/2."
              >
                <p>
                  Pošto je <InlineMath>{"\\alpha"}</InlineMath> u III
                  kvadrantu, onda je{" "}
                  <InlineMath>{"\\frac{\\alpha}{2}"}</InlineMath> u II
                  kvadrantu. U II kvadrantu sinus je pozitivan, a kosinus
                  negativan.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Izračunaj{" "}
                    <InlineMath>{"\\sin\\frac{\\alpha}{2}"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\sin\\frac{\\alpha}{2} = +\\sqrt{\\frac{1-\\cos\\alpha}{2}} = \\sqrt{\\frac{1+\\frac{3}{5}}{2}} = \\sqrt{\\frac{4}{5}} = \\frac{2\\sqrt{5}}{5}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Izračunaj{" "}
                    <InlineMath>{"\\cos\\frac{\\alpha}{2}"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\cos\\frac{\\alpha}{2} = -\\sqrt{\\frac{1+\\cos\\alpha}{2}} = -\\sqrt{\\frac{1-\\frac{3}{5}}{2}} = -\\sqrt{\\frac{1}{5}} = -\\frac{\\sqrt{5}}{5}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> najvažniji korak nije račun, već
              određivanje kvadranta ugla{" "}
              <InlineMath>{"\\frac{\\alpha}{2}"}</InlineMath>.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Sredi izraz{" "}
              <InlineMath>{"\\sin^2 x - \\cos^2 x"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prepoznaj da je to blisko formuli za cos 2x."
              >
                <p>
                  Pošto je{" "}
                  <InlineMath>
                    {"\\cos 2x = \\cos^2 x - \\sin^2 x"}
                  </InlineMath>
                  , tvoj izraz je suprotan po znaku.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Napiši konačan oblik.">
                <MathBlock>
                  {
                    "\\sin^2 x - \\cos^2 x = -(\\cos^2 x - \\sin^2 x) = -\\cos 2x"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovo je tipična mikro-transformacija
              koja često zatvara ceo zadatak.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Sredi izraz{" "}
              <InlineMath>{"\\sin^2 x \\cos^2 x"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prepoznaj proizvod sin x cos x."
              >
                <p>
                  Važi{" "}
                  <InlineMath>
                    {"\\sin x \\cos x = \\frac{\\sin 2x}{2}"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Kvadriraj i snizi stepen."
              >
                <MathBlock>
                  {
                    "\\sin^2 x \\cos^2 x = \\left(\\frac{\\sin 2x}{2}\\right)^2 = \\frac{\\sin^2 2x}{4}"
                  }
                </MathBlock>
                <MathBlock>
                  {"\\frac{\\sin^2 2x}{4} = \\frac{1-\\cos 4x}{8}"}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Poenta:</strong> ovo je lep primer kako dvostruki ugao i
              snižavanje stepena rade zajedno.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI OBRASCI ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključni obrasci"
        title="Pregled formula koje treba da imaš na dohvat ruke"
        description="Ova sekcija služi kao formula-mapa. Ne kao zamena za razumevanje, već kao pregled onoga što mora da bude stabilno i brzo dostupno u glavi tokom zadatka."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Dvostruki ugao"
            formula={"\\sin 2x = 2\\sin x\\cos x, \\quad \\cos 2x = \\cos^2 x - \\sin^2 x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1"}
          />
          <FormulaCard
            title="Tangens dvostrukog ugla"
            formula={"\\operatorname{tg}\\,2x = \\frac{2\\operatorname{tg}\\,x}{1 - \\operatorname{tg}^2 x}"}
            note="Koristi se kad je prirodno raditi preko tangensa, ali ne zaboravi uslov definisanosti."
          />
          <FormulaCard
            title="Polovina ugla"
            formula={"\\sin\\frac{x}{2} = \\pm\\sqrt{\\frac{1-\\cos x}{2}},\\qquad \\cos\\frac{x}{2} = \\pm\\sqrt{\\frac{1+\\cos x}{2}}"}
          />
          <FormulaCard
            title="Tangens polovine ugla"
            formula={"\\operatorname{tg}\\frac{x}{2} = \\pm\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} = \\frac{\\sin x}{1+\\cos x} = \\frac{1-\\cos x}{\\sin x}"}
          />
          <FormulaCard
            title="Snižavanje stepena"
            formula={"\\sin^2 x = \\frac{1-\\cos 2x}{2},\\qquad \\cos^2 x = \\frac{1+\\cos 2x}{2}"}
          />
          <FormulaCard
            title="Brzi signal u zadatku"
            formula={"\\sin x\\cos x \\to \\sin 2x, \\quad \\sin^2 x \\to \\cos 2x, \\quad \\tfrac{\\alpha}{2} \\to \\text{koren}"}
            note="Ako vidiš sin x cos x, pomisli na sin 2x. Ako vidiš sin²x ili cos²x, pomisli na snižavanje stepena. Ako vidiš &quot;polovinu poznatog ugla&quot;, pomisli na formule za x/2."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: šta je najčešći razlog da učenik izabere loš oblik za cos 2x?"
          answer={
            <p>
              Zato što mehanički koristi prvi oblik kojeg se seti, umesto da
              pogleda koju funkciju već zna. Dobar izbor oblika nije detalj,
              nego jedan od glavnih trikova cele lekcije.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najlakše izgube poeni bez potrebe"
        description="Ove greške nisu duboke, ali su skupe. Upravo zbog toga ih treba unapred jasno imenovati."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>1. Izgubljen faktor 2</h3>
            <p>
              Na primer, napiše se{" "}
              <InlineMath>{"\\sin 2x = \\sin x \\cos x"}</InlineMath> umesto{" "}
              <InlineMath>{"2\\sin x \\cos x"}</InlineMath>. To je najtipičnija
              tehnička greška.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              2. Pogrešan izbor oblika za{" "}
              <InlineMath>{"\\cos 2x"}</InlineMath>
            </h3>
            <p>
              Učenik zna samo{" "}
              <InlineMath>{"\\cos^2 x - \\sin^2 x"}</InlineMath>, iako bi
              zadatak mnogo brže rešio sa{" "}
              <InlineMath>{"1-2\\sin^2 x"}</InlineMath> ili{" "}
              <InlineMath>{"2\\cos^2 x - 1"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              3. Kod polovine ugla automatski se uzima plus
            </h3>
            <p>
              To je pogrešno. Koren daje samo apsolutnu vrednost. Znak dolazi iz
              kvadranta ugla{" "}
              <InlineMath>{"\\frac{x}{2}"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>4. Mešanje zapisa</h3>
            <p>
              <InlineMath>{"\\sin^2 x"}</InlineMath> znači{" "}
              <InlineMath>{"(\\sin x)^2"}</InlineMath>, a ne{" "}
              <InlineMath>{"\\sin(x^2)"}</InlineMath>. Ova zabuna je sitna, ali
              u računu pravi haos.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              5. Snižavanje stepena bez faktora{" "}
              <InlineMath>{"\\frac{1}{2}"}</InlineMath>
            </h3>
            <p>
              Vrlo česta greška je{" "}
              <InlineMath>{"\\sin^2 x = 1-\\cos 2x"}</InlineMath>. Ispravno je{" "}
              <InlineMath>{"\\frac{1-\\cos 2x}{2}"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              6. Zaboravljen domen kod tangensa
            </h3>
            <p>
              Formula za{" "}
              <InlineMath>{"\\operatorname{tg}\\,2x"}</InlineMath> nije
              bezuslovna. Ako je imenilac nula, izraz nije definisan.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova lekcija pojavljuje na testu"
        description="Na prijemnom se skoro nikad ne pita samo &quot;napiši formulu&quot;. Mnogo češće treba da prepoznaš da je dvostruki ugao ili polovina ugla najpametniji put do cilja."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: tačna vrednost">
            <p>
              Zadaci tipa <InlineMath>{"\\sin 15^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\cos 22{,}5^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{tg}\\,67{,}5^\\circ"}</InlineMath>{" "}
              proveravaju polovine ugla i znak.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: podaci o jednoj funkciji">
            <p>
              Na primer, zadato je <InlineMath>{"\\sin x"}</InlineMath>, a traži
              se <InlineMath>{"\\cos 2x"}</InlineMath>. Ovde se proverava izbor
              pravog oblika, ne samo formula.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: transformacija izraza">
            <p>
              Izraz sa <InlineMath>{"\\sin^2 x"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath> treba prebaciti na oblik
              sa <InlineMath>{"2x"}</InlineMath>. Ovo je standardno u
              složenijim zadacima.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: kombinacija alata">
            <p>
              Nije retko da prvo uradiš snižavanje stepena, a zatim još primeniš
              adicioni teorem ili svođenje na prvi kvadrant.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni ček-lista">
          <MathBlock>
            {
              "\\text{koju funkciju znam?} \\rightarrow \\text{koji oblik mi uklanja višak?} \\rightarrow \\text{da li znak zavisi od kvadranta?}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Vežbe za sigurnost u formuli i izboru pravog oblika"
        description="Pokušaj da svaku vežbu rešiš najkraćim mogućim putem. Ovde cilj nije samo tačan odgovor, već i dobar izbor transformacije."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\cos 60^\\circ"}</InlineMath> koristeći
                formulu dvostrukog ugla preko ugla{" "}
                <InlineMath>{"30^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Piši{" "}
                  <InlineMath>{"60^\\circ = 2 \\cdot 30^\\circ"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\cos 60^\\circ = 1 - 2\\sin^2 30^\\circ = 1 - 2\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Ako je{" "}
                <InlineMath>{"\\cos x = \\frac{5}{13}"}</InlineMath> i{" "}
                <InlineMath>{"x"}</InlineMath> je u I kvadrantu, izračunaj{" "}
                <InlineMath>{"\\cos 2x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Najbrže je koristiti oblik{" "}
                  <InlineMath>{"2\\cos^2 x - 1"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\cos 2x = 2\\left(\\frac{5}{13}\\right)^2 - 1 = \\frac{50}{169} - 1 = -\\frac{119}{169}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\sin 22{,}5^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  To je{" "}
                  <InlineMath>{"\\sin \\frac{45^\\circ}{2}"}</InlineMath>, a
                  ugao je u I kvadrantu.
                </p>
                <MathBlock>
                  {
                    "\\sin 22{,}5^\\circ = \\sqrt{\\frac{1-\\cos 45^\\circ}{2}} = \\frac{\\sqrt{2-\\sqrt{2}}}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Pretvori <InlineMath>{"\\cos^2 x"}</InlineMath> u izraz sa{" "}
                <InlineMath>{"\\cos 2x"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"\\cos^2 x = \\frac{1+\\cos 2x}{2}"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Sredi izraz{" "}
                <InlineMath>{"2\\sin x \\cos x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>To je direktno formula za sinus dvostrukog ugla.</p>
                <MathBlock>{"2\\sin x \\cos x = \\sin 2x"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Ako je{" "}
                <InlineMath>{"\\alpha = 300^\\circ"}</InlineMath>, odredi
                znak za{" "}
                <InlineMath>
                  {"\\cos\\frac{\\alpha}{2}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>
                    {"\\frac{\\alpha}{2} = 150^\\circ"}
                  </InlineMath>
                  , a to je II kvadrant. U II kvadrantu kosinus je negativan.
                </p>
                <MathBlock>{"\\cos\\frac{\\alpha}{2} < 0"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Pretvori{" "}
                <InlineMath>{"\\sin^2 x \\cos^2 x"}</InlineMath> u izraz sa{" "}
                <InlineMath>{"\\cos 4x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prvo koristi{" "}
                  <InlineMath>
                    {"\\sin x\\cos x = \\frac{\\sin 2x}{2}"}
                  </InlineMath>
                  , pa zatim snižavanje stepena za{" "}
                  <InlineMath>{"\\sin^2 2x"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\sin^2 x \\cos^2 x = \\frac{\\sin^2 2x}{4} = \\frac{1-\\cos 4x}{8}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Izvedi formulu{" "}
                <InlineMath>
                  {"\\sin^2 x = \\frac{1-\\cos 2x}{2}"}
                </InlineMath>{" "}
                iz formule za <InlineMath>{"\\cos 2x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Pođi od oblika</p>
                <MathBlock>
                  {"\\cos 2x = 1 - 2\\sin^2 x"}
                </MathBlock>
                <p>Prebaci članove:</p>
                <MathBlock>
                  {
                    "2\\sin^2 x = 1 - \\cos 2x \\quad\\Longrightarrow\\quad \\sin^2 x = \\frac{1-\\cos 2x}{2}"
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
        title="Snaga ove lekcije nije u količini formula, nego u tome što te uči da biraš oblik koji zadatku najviše odgovara"
        description="Dvostruki ugao, polovina ugla i snižavanje stepena nisu tri odvojene priče. To su tri pogleda na istu ideju: trigonometrijski izraz možeš da prevedeš u drugi oblik koji je pogodniji za račun. Kad to počneš da vidiš, zadaci postaju mnogo kraći."
      >
        <div className={s.grid3}>
          <SectionCard title="Prva misao">
            <p>
              Koji oblik za <InlineMath>{"\\cos 2x"}</InlineMath> mi uklanja
              funkciju koju ne želim?
            </p>
          </SectionCard>
          <SectionCard title="Druga misao">
            <p>
              Da li koren kod polovine ugla traži plus ili minus?
            </p>
          </SectionCard>
          <SectionCard title="Treća misao">
            <p>
              Mogu li kvadrat funkcije da zamenim izrazom sa duplim uglom?
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
            <h3 className={cs.tCardTitle}>
              1. Dvostruki ugao dolazi iz adicionih formula
            </h3>
            <p>
              <InlineMath>{"\\sin 2x"}</InlineMath>,{" "}
              <InlineMath>{"\\cos 2x"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{tg}\\,2x"}</InlineMath> nisu
              &ldquo;nove&rdquo; formule, već posebni slučajevi već poznatih
              obrazaca.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Za <InlineMath>{"\\cos 2x"}</InlineMath> moraš znati više
              oblika
            </h3>
            <p>
              Prava veština je izbor oblika koji najbrže zatvara konkretan
              zadatak.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Kod polovine ugla znak bira kvadrant
            </h3>
            <p>
              Formula daje kvadrat, koren daje apsolutnu vrednost, a kvadrant
              daje konačan znak.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Snižavanje stepena je praktični alat
            </h3>
            <p>
              Kad vidiš <InlineMath>{"\\sin^2 x"}</InlineMath>,{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath> ili proizvod{" "}
              <InlineMath>{"\\sin x\\cos x"}</InlineMath>, treba odmah da
              proveriš da li dupli ugao daje jednostavniji oblik.
            </p>
          </article>
        </div>

        <MathBlock>
          {
            "\\boxed{\\text{adiciona formula} \\rightarrow \\text{dvostruki ugao} \\rightarrow \\text{polovina ugla i snižavanje stepena}}"
          }
        </MathBlock>

        <MicroCheck
          question="Šta je sledeći logičan korak u učenju?"
          answer={
            <p>
              Sledeća tema su transformacije zbira u proizvod i obrnuto. Ako si
              ovu lekciju savladao, biće ti mnogo lakše da vidiš kako se dugi
              trigonometrijski izrazi faktorišu i skraćuju.
            </p>
          }
        />

        <p className={cs.footerNote}>
          Lekcija 36 pokriva trigonometrijske funkcije dvostrukog ugla i
          polovine ugla: izvođenje iz adicionih teorema, formule sa znakom i
          snižavanje stepena.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
