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
import QuadraticInequalityLab from "./QuadraticInequalityLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto-vazna", label: "Zašto je važna" },
  { href: "#model", label: "Osnovni model" },
  { href: "#postupak", label: "Postupak" },
  { href: "#slucajevi", label: "Slučajevi" },
  { href: "#parametar", label: "Parametri" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#kljucne-formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson22Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 22"
        title={
          <>
            Kvadratne nejednačine{" "}
            <span className={cs.tHeroAccent}>
              znak parabole, intervali i parametri
            </span>
          </>
        }
        description="Kada na prijemnom vidiš kvadratnu nejednačinu, cilj nije da mehanički nađeš korene pa nešto napišeš oko njih. Cilj je da iz dve informacije, znaka koeficijenta a i položaja nula, odmah pročitaš gde je parabola iznad, a gde ispod x-ose. Tada rešenje postaje logično, a ne napamet naučen šablon."
        heroImageSrc="/api/lessons/22/hero"
        heroImageAlt="Ilustracija za lekciju o kvadratnim nejednačinama"
        cards={[
          {
            label: "Šta učiš",
            description:
              "Kako da rešiš nejednačine oblika ax²+bx+c ≷ 0 i da ih povežeš sa grafikom parabole.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da zaboraviš da se kod a<0 raspored znakova obrće, ili da pogrešno uključiš krajeve intervala.",
          },
          {
            label: "Prijemni fokus",
            description:
              'Parametarski zadaci tipa „odredi m tako da je trinom uvek pozitivan" ili „uvek nepozitivan".',
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "60 do 75 minuta sa detaljnim primerima i interaktivnim delom.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 19, 20 i 21: parabola, diskriminanta, nule i osnovni rad sa kvadratnim trinomom.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz Δ i znaka a odmah odrediš gde je trinom pozitivan, a gde negativan.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja istovremeno prikazuje parabolu i obojeni skup rešenja na brojevnoj pravoj.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto-vazna"
        eyebrow="Zašto je ova lekcija važna"
        title="Kvadratna nejednačina je brza provera da li razumeš parabolu"
        description="Ova tema se na prijemnom javlja direktno, ali i kao skriven korak posle smene, faktorizacije ili sređivanja složenijeg zadatka. Učenik koji vidi sliku parabole rešava brže i sigurnije od učenika koji pamti samo jednu šemu."
      >
        <div className={s.grid3}>
          <SectionCard title="Ne tražiš intervale naslepo">
            <p>
              Čim znaš da li je parabola otvorena naviše ili naniže i gde
              seče <InlineMath>{"x"}</InlineMath>-osu, znaš i raspored znaka celog
              trinoma.
            </p>
          </SectionCard>
          <SectionCard title="Grafik sprečava pogrešan izbor intervala">
            <p>
              Kada vizuelno povežeš trinom sa parabolom, manje su šanse da
              zameniš „unutra" i „spolja", ili da zaboraviš krajeve.
            </p>
          </SectionCard>
          <SectionCard title="Posebno važna za parametre">
            <p>
              Uslovi tipa „uvek pozitivno" i „uvek negativno" praktično su
              test da li razumeš{" "}
              <InlineMath>{"\\Delta"}</InlineMath>, smer otvaranja i dodir sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prava intuicija">
          <p>
            Kvadratna nejednačina nije „još jedan račun", već pitanje{" "}
            <em>
              gde se parabola nalazi u odnosu na{" "}
              <InlineMath>{"x"}</InlineMath>-osu
            </em>
            .
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNI MODEL ═══════════ */}
      <LessonSection
        id="model"
        eyebrow="Osnovni model"
        title="Šta zapravo rešavamo kada pišemo ax²+bx+c ≷ 0"
        description="Umesto da razmišljaš samo o simbolima nejednakosti, posmatraj funkciju f(x)=ax²+bx+c. Zadatak je da pronađeš sve one vrednosti x za koje je f(x) pozitivna, negativna, nenegativna ili nepozitivna."
      >
        <div className={s.grid3}>
          <SectionCard title="Kvadratna nejednačina">
            <p>Standardni oblik je</p>
            <MathBlock>{"ax^2+bx+c \\gtrless 0, \\qquad a \\ne 0."}</MathBlock>
            <p>
              Najvažnije je da trinom bude sveden na jednu stranu, a nula na
              drugu.
            </p>
          </SectionCard>
          <SectionCard title="Tražiš znak funkcije">
            <p>
              Ako rešavaš{" "}
              <InlineMath>{"ax^2+bx+c>0"}</InlineMath>, pitaš se: za
              koje <InlineMath>{"x"}</InlineMath> je vrednost funkcije{" "}
              <em>iznad nule</em>? Kod{" "}
              <InlineMath>{"ax^2+bx+c \\le 0"}</InlineMath> pitaš se gde je
              grafik <em>na ili ispod <InlineMath>{"x"}</InlineMath>-ose</em>.
            </p>
          </SectionCard>
          <SectionCard title="Parabola je glavni vodič">
            <p>
              Nule trinoma su preseci parabole sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom. Znak{" "}
              <InlineMath>{"a"}</InlineMath> govori da li se parabola otvara
              naviše ili naniže. Te dve informacije daju kompletnu sliku znaka.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {"f(x)=ax^2+bx+c \\quad\\Longrightarrow\\quad \\text{rešavanje nejednačine svodi se na ispitivanje znaka funkcije } f(x)."}
        </MathBlock>

        <InsightCard title="Važna navika">
          <p>
            Pre bilo kakvog zapisivanja intervala, najpre reci sebi naglas:
            „Tražim gde je parabola iznad ili ispod{" "}
            <InlineMath>{"x"}</InlineMath>-ose."
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li je rešenje kvadratne nejednačine jedan broj ili skup brojeva?"
          answer={
            <p>
              Po pravilu je to skup realnih brojeva, najčešće jedan interval,
              unija dva intervala, ceo{" "}
              <InlineMath>{"\\mathbb{R}"}</InlineMath>, prazni skup ili ponekad
              samo jedna tačka.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POSTUPAK ═══════════ */}
      <LessonSection
        id="postupak"
        eyebrow="Postupak"
        title="Najsigurniji redosled koraka na papiru"
        description="Ovaj redosled je napravljen baš za prijemni: kratak je, sistematičan i čuva te od najčešćih grešaka. Ako ga dosledno primenjuješ, retko ćeš promašiti znak."
      >
        <div className={s.grid2}>
          <SectionCard title="Koraci rešavanja">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Sredi nejednačinu na nulu">
                <p>
                  Prvo prebacuješ sve na jednu stranu da dobiješ oblik{" "}
                  <InlineMath>{"ax^2+bx+c \\gtrless 0"}</InlineMath>. Tek tada
                  čitaš koeficijente{" "}
                  <InlineMath>{"a"}</InlineMath>,{" "}
                  <InlineMath>{"b"}</InlineMath>,{" "}
                  <InlineMath>{"c"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi diskriminantu i nule">
                <p>
                  Izračunaj{" "}
                  <InlineMath>{"\\Delta=b^2-4ac"}</InlineMath>. Ako postoje
                  realne nule, obavezno ih poredi kao{" "}
                  <InlineMath>{"x_1<x_2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Pogledaj znak koeficijenta{" "}
                    <InlineMath>{"a"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>{"a>0"}</InlineMath> znači parabola naviše,{" "}
                  <InlineMath>{"a<0"}</InlineMath> znači parabola naniže. Ovo
                  odlučuje koji delovi su pozitivni, a koji negativni.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Odredi intervale znaka">
                <p>
                  Kada postoje dve nule, realna osa se deli na tri dela: levo od{" "}
                  <InlineMath>{"x_1"}</InlineMath>, između{" "}
                  <InlineMath>{"x_1"}</InlineMath> i{" "}
                  <InlineMath>{"x_2"}</InlineMath>, i desno od{" "}
                  <InlineMath>{"x_2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Na kraju proveri krajeve">
                <p>
                  Kod <InlineMath>{">"}</InlineMath> i{" "}
                  <InlineMath>{"<"}</InlineMath> nule se ne uključuju. Kod{" "}
                  <InlineMath>{"\\ge"}</InlineMath> i{" "}
                  <InlineMath>{"\\le"}</InlineMath> uključuju se samo ako
                  stvarno zadovoljavaju nejednakost, a kod kvadratnog trinoma to
                  su upravo nule.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Brza kontrolna lista">
            <p>Šta proveravaš pred upis konačnog odgovora:</p>
            <ul>
              <li>Da li su nule dobro izračunate i poređane?</li>
              <li>
                Da li si uzeo u obzir znak{" "}
                <InlineMath>{"a"}</InlineMath>?
              </li>
              <li>Da li si pravilno pročitao „unutra" ili „spolja"?</li>
              <li>
                Da li su krajevi uključeni samo kod{" "}
                <InlineMath>{"\\ge"}</InlineMath> i{" "}
                <InlineMath>{"\\le"}</InlineMath>?
              </li>
              <li>
                Da li je moguće da je rešenje ceo{" "}
                <InlineMath>{"\\mathbb{R}"}</InlineMath> ili prazan skup?
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako su nule 5 i 1, smeš li odmah zapisati interval (5,1)?"
          answer={
            <p>
              Ne. Prvo ih poredaš:{" "}
              <InlineMath>{"x_1=1"}</InlineMath>,{" "}
              <InlineMath>{"x_2=5"}</InlineMath>. Interval uvek pišeš od
              manjeg ka većem broju, dakle{" "}
              <InlineMath>{"(1,5)"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ GLAVNI SLUČAJEVI ═══════════ */}
      <LessonSection
        id="slucajevi"
        eyebrow="Glavni slučajevi"
        title="Kako Δ i znak a menjaju skup rešenja"
        description='Ovo je srce lekcije. Kada te pita neko „kako znaš da je rešenje spolja", pravi odgovor nije „tako se pamti", nego: „zato što je parabola otvorena naviše i seče osu u dve tačke".'
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Dve nule i parabola naviše"
            formula={"x_1<x_2,\\quad f(x)>0 \\text{ za } x\\in(-\\infty,x_1)\\cup(x_2,\\infty)"}
            note={
              <>
                <InlineMath>{"\\Delta>0"}</InlineMath>,{" "}
                <InlineMath>{"a>0"}</InlineMath>: pozitivno je spolja,
                negativno unutra. Ovo je najčešći „osnovni" slučaj na
                prijemnom.
              </>
            }
          />
          <FormulaCard
            title="Dve nule i parabola naniže"
            formula={"x_1<x_2,\\quad f(x)>0 \\text{ za } x\\in(x_1,x_2)"}
            note={
              <>
                <InlineMath>{"\\Delta>0"}</InlineMath>,{" "}
                <InlineMath>{"a<0"}</InlineMath>: raspored je obrnut u odnosu
                na prethodni slučaj, baš zato što se smer otvaranja promenio.
              </>
            }
          />
          <FormulaCard
            title="Parabola dodiruje osu odozgo"
            formula={"f(x)\\ge 0 \\text{ za svaki } x\\in\\mathbb{R},\\quad f(x)=0 \\text{ samo u } x_0"}
            note={
              <>
                <InlineMath>{"\\Delta=0"}</InlineMath>,{" "}
                <InlineMath>{"a>0"}</InlineMath>: za{" "}
                <InlineMath>{"f(x)>0"}</InlineMath> rešenje je{" "}
                <InlineMath>
                  {"\\mathbb{R}\\setminus\\{x_0\\}"}
                </InlineMath>
                , dok je za{" "}
                <InlineMath>{"f(x)\\le 0"}</InlineMath> rešenje samo{" "}
                <InlineMath>{"\\{x_0\\}"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Parabola dodiruje osu odozdo"
            formula={"f(x)\\le 0 \\text{ za svaki } x\\in\\mathbb{R},\\quad f(x)=0 \\text{ samo u } x_0"}
            note={
              <>
                <InlineMath>{"\\Delta=0"}</InlineMath>,{" "}
                <InlineMath>{"a<0"}</InlineMath>: za{" "}
                <InlineMath>{"f(x)<0"}</InlineMath> rešenje je{" "}
                <InlineMath>
                  {"\\mathbb{R}\\setminus\\{x_0\\}"}
                </InlineMath>
                , a za <InlineMath>{"f(x)\\ge 0"}</InlineMath> samo tačka
                dodira.
              </>
            }
          />
          <FormulaCard
            title="Nema realnih nula, parabola iznad ose"
            formula={"f(x)>0 \\text{ za svaki } x\\in\\mathbb{R},\\quad f(x)<0 \\text{ nema rešenja}"}
            note={
              <>
                <InlineMath>{"\\Delta<0"}</InlineMath>,{" "}
                <InlineMath>{"a>0"}</InlineMath>: tipičan model za zadatak
                „odredi parametar da trinom bude strogo pozitivan za svako
                realno <InlineMath>{"x"}</InlineMath>".
              </>
            }
          />
          <FormulaCard
            title="Nema realnih nula, parabola ispod ose"
            formula={"f(x)<0 \\text{ za svaki } x\\in\\mathbb{R},\\quad f(x)>0 \\text{ nema rešenja}"}
            note={
              <>
                <InlineMath>{"\\Delta<0"}</InlineMath>,{" "}
                <InlineMath>{"a<0"}</InlineMath>: „negativna" analogija
                prethodnog slučaja i jednako je važna u parametarskim zadacima.
              </>
            }
          />
        </div>

        <MicroCheck
          question={"Mikro-provera: zašto iz x² ≥ 0 za svaki x ne sledi i x² > 0 za svaki x?"}
          answer={
            <p>
              Zato što u tački <InlineMath>{"x=0"}</InlineMath> važi{" "}
              <InlineMath>{"x^2=0"}</InlineMath>. Dakle, „nenegativno" može
              važiti za sve realne brojeve, a „strogo pozitivno" ne mora.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PARAMETARSKE NEJEDNAČINE ═══════════ */}
      <LessonSection
        id="parametar"
        eyebrow="Parametarske nejednačine"
        title="Kada je kvadratni trinom uvek pozitivan ili uvek negativan"
        description='Ovo je jedan od najvažnijih prijemnih šablona. Formulacija „za svako realno x" znači da ne tražiš samo poneki interval, nego globalno ponašanje cele parabole.'
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title={"ax²+bx+c > 0 za svako x ∈ ℝ"}
            formula={"a>0 \\quad \\text{i} \\quad \\Delta<0"}
            note="Parabola mora biti otvorena naviše i ne sme ni da dotakne x-osu."
          />
          <FormulaCard
            title={"ax²+bx+c ≥ 0 za svako x ∈ ℝ"}
            formula={"a>0 \\quad \\text{i} \\quad \\Delta\\le 0"}
            note="Dozvoljeno je da parabola dodirne osu u jednoj tački, ali ne i da je seče."
          />
          <FormulaCard
            title={"ax²+bx+c < 0 za svako x ∈ ℝ"}
            formula={"a<0 \\quad \\text{i} \\quad \\Delta<0"}
            note="Parabola je otvorena naniže i cela mora ostati ispod x-ose."
          />
          <FormulaCard
            title={"ax²+bx+c ≤ 0 za svako x ∈ ℝ"}
            formula={"a<0 \\quad \\text{i} \\quad \\Delta\\le 0"}
            note="Dodir sa osom je dozvoljen, ali sečenje nije."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Zašto je uslov na a obavezan">
            <p>
              Znak <InlineMath>{"a"}</InlineMath> određuje „krajeve" parabole.
              Ako je <InlineMath>{"a>0"}</InlineMath>, za velike{" "}
              <InlineMath>{"|x|"}</InlineMath> trinom raste ka{" "}
              <InlineMath>{"+\\infty"}</InlineMath>. Zato samo tada postoji
              šansa da bude svuda pozitivan ili nenegativan. Ako je{" "}
              <InlineMath>{"a<0"}</InlineMath>, za velike{" "}
              <InlineMath>{"|x|"}</InlineMath> ide ka{" "}
              <InlineMath>{"-\\infty"}</InlineMath>, pa tada može biti svuda
              negativan ili nepozitivan.
            </p>
          </SectionCard>
          <SectionCard title="Strogo vs. nestrogo">
            <p>
              Zašto se kod <InlineMath>{">"}</InlineMath> i{" "}
              <InlineMath>{"<"}</InlineMath> traži baš{" "}
              <InlineMath>{"\\Delta<0"}</InlineMath>? Ako je{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>, parabola dodiruje{" "}
              <InlineMath>{"x"}</InlineMath>-osu u jednoj tački. U toj tački je
              vrednost nula, pa stroga nejednakost ne može važiti za svaki
              realan broj.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={`Mikro-provera: za\u0161to uslov \u0394 \u2264 0 nije dovoljan za \u201Euvek pozitivno\u201C?`}
          answer={
            <p>
              Nije dovoljan zato što kod{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath> postoji tačka u kojoj je
              trinom jednak nuli. To je dobro za{" "}
              <InlineMath>{"\\ge 0"}</InlineMath>, ali nije dobro za{" "}
              <InlineMath>{"> 0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivna laboratorija"
        title="Menjaj koeficijente i gledaj kako se menja skup rešenja"
        description="Ovaj deo je tu da spoji algebru i sliku. Nule se ovde prikazuju približno decimalno, jer laboratorija služi intuiciji; u rešenju zadatka i dalje pišeš tačan oblik kad god je moguć."
      >
        <QuadraticInequalityLab />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljno rešavanje tipičnih zadataka"
        description="U svakom primeru namerno pratimo isti redosled: sredi, pronađi nule ili odredi da ih nema, pogledaj znak a, pa tek onda piši intervale."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Reši{" "}
              <InlineMath>{"x^2-5x+6>0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Faktoriši.">
                <MathBlock>{"x^2-5x+6=(x-2)(x-3)"}</MathBlock>
                <p>
                  Nule su <InlineMath>{"x_1=2"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=3"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi smer parabole.">
                <p>
                  Pošto je <InlineMath>{"a=1>0"}</InlineMath>, parabola je
                  otvorena naviše. Zato je trinom pozitivan spolja, a negativan
                  između nula.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključak.">
                <p>
                  Tražimo strogo <InlineMath>{">0"}</InlineMath>, pa krajevi
                  ne ulaze u rešenje.
                </p>
                <MathBlock>{"S=(-\\infty,2)\\cup(3,\\infty)."}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Reši{" "}
              <InlineMath>{"-x^2+x+2\\le 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Faktoriši.">
                <MathBlock>{"-x^2+x+2=-(x-2)(x+1)"}</MathBlock>
                <p>
                  Nule su <InlineMath>{"x_1=-1"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Smer parabole.">
                <p>
                  Pošto je <InlineMath>{"a=-1<0"}</InlineMath>, parabola je
                  otvorena naniže. Izraz je nepozitivan spolja, a pozitivan
                  između nula.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključak.">
                <p>
                  Tražimo <InlineMath>{"\\le 0"}</InlineMath>, uključujemo i
                  krajeve.
                </p>
                <MathBlock>{"S=(-\\infty,-1]\\cup[2,\\infty)."}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Reši{" "}
              <InlineMath>{"x^2+4x+5\\ge 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Računamo diskriminantu.">
                <MathBlock>
                  {"\\Delta=4^2-4\\cdot 1\\cdot 5=16-20=-4<0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Smer parabole.">
                <p>
                  Pošto nema realnih nula i{" "}
                  <InlineMath>{"a=1>0"}</InlineMath>, cela parabola je iznad{" "}
                  <InlineMath>{"x"}</InlineMath>-ose.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključak.">
                <p>
                  Tražimo <InlineMath>{"\\ge 0"}</InlineMath>, pa su svi realni
                  brojevi dozvoljeni.
                </p>
                <MathBlock>{"S=\\mathbb{R}."}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Odredi <InlineMath>{"m"}</InlineMath> tako da je{" "}
              <InlineMath>
                {"x^2-2(m+1)x+m^2+1>0"}
              </InlineMath>{" "}
              za svako{" "}
              <InlineMath>{"x\\in\\mathbb{R}"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title='Uslov za „uvek pozitivno".'>
                <p>
                  Treba da važi <InlineMath>{"a>0"}</InlineMath> i{" "}
                  <InlineMath>{"\\Delta<0"}</InlineMath>. Ovde je{" "}
                  <InlineMath>{"a=1>0"}</InlineMath>, pa ostaje uslov na
                  diskriminantu.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Računamo Δ.">
                <MathBlock>
                  {"\\Delta=[-2(m+1)]^2-4\\cdot 1\\cdot (m^2+1)=4(m+1)^2-4m^2-4=8m"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zaključak.">
                <p>
                  Tražimo <InlineMath>{"8m<0"}</InlineMath>, pa dobijamo:
                </p>
                <MathBlock>{"m<0."}</MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="kljucne-formule"
        eyebrow="Ključne formule i pravila"
        title="Šta vredi zapamtiti kao sažetak lekcije"
        description="Ne pamti napamet deset različitih rečenica. Zapamti nekoliko čvrstih principa i iz njih izvedi svaki konkretan slučaj."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Standardni oblik"
            formula={"ax^2+bx+c \\gtrless 0, \\qquad a\\ne 0"}
            note="Bez ovog sređivanja ne možeš pouzdano čitati koeficijente i znak parabole."
          />
          <FormulaCard
            title="Diskriminanta"
            formula={"\\Delta=b^2-4ac"}
            note={
              <>
                <InlineMath>{"\\Delta>0"}</InlineMath>: dve nule,{" "}
                <InlineMath>{"\\Delta=0"}</InlineMath>: jedna dvostruka nula,{" "}
                <InlineMath>{"\\Delta<0"}</InlineMath>: nema realnih nula.
              </>
            }
          />
          <FormulaCard
            title="Nule"
            formula={"x_{1,2}=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}"}
            note="Kod nejednačina su nule prelomne tačke na brojevnoj pravoj."
          />
          <FormulaCard
            title={"Parabola naviše (a > 0)"}
            formula={"\\text{pozitivno spolja, negativno unutra}"}
            note={<>Važi kada postoje dve realne nule <InlineMath>{"x_1<x_2"}</InlineMath>.</>}
          />
          <FormulaCard
            title={"Parabola naniže (a < 0)"}
            formula={"\\text{pozitivno unutra, negativno spolja}"}
            note={<>Ovo je potpuno obrnuto od slučaja <InlineMath>{"a>0"}</InlineMath>.</>}
          />
          <FormulaCard
            title="Globalni uslovi"
            formula={"\\begin{aligned}&f(x)>0 \\iff a>0,\\ \\Delta<0,\\\\&f(x)\\ge 0 \\iff a>0,\\ \\Delta\\le 0,\\\\&f(x)<0 \\iff a<0,\\ \\Delta<0,\\\\&f(x)\\le 0 \\iff a<0,\\ \\Delta\\le 0.\\end{aligned}"}
            note="Ovo je najvažniji blok za parametarske zadatke."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje na prijemnom najviše koštaju"
        description="Ovo nisu generički saveti. Ovo su tipične konkretne greške zbog kojih učenik izgubi poene i kad zna teoriju."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešno uključivanje krajeva</h3>
            <p>
              Kod <InlineMath>{">"}</InlineMath> i{" "}
              <InlineMath>{"<"}</InlineMath> nule se ne uključuju. Kod{" "}
              <InlineMath>{"\\ge"}</InlineMath> i{" "}
              <InlineMath>{"\\le"}</InlineMath> uključuju se. Upravo na ovome
              pada mnogo tačnih postupaka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen znak koeficijenta <InlineMath>{"a"}</InlineMath>
            </h3>
            <p>
              Učenik tačno nađe nule, ali onda automatski napiše „pozitivno
              spolja". To važi samo ako je <InlineMath>{"a>0"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              <InlineMath>{"\\Delta<0"}</InlineMath> tumači kao „nema rešenja"
            </h3>
            <p>
              To nije tačno. Ako je <InlineMath>{"a>0"}</InlineMath>, onda je{" "}
              <InlineMath>{"f(x)>0"}</InlineMath> za svaki{" "}
              <InlineMath>{"x"}</InlineMath>. Ako je{" "}
              <InlineMath>{"a<0"}</InlineMath>, onda je{" "}
              <InlineMath>{"f(x)<0"}</InlineMath> za svaki{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ne poreda nule pre pisanja intervala</h3>
            <p>
              Uvek pišeš <InlineMath>{"x_1<x_2"}</InlineMath>. Interval mora da bude
              zapisan od manjeg ka većem broju.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              {'Meša „za neko x" i „za svako x"'}
            </h3>
            <p>
              Parametarski zadatak sa formulacijom „za svako realno{" "}
              <InlineMath>{"x"}</InlineMath>" traži globalni položaj cele
              parabole, a ne samo postojanje jednog intervala.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Piše odgovor bez kratke logike</h3>
            <p>
              Na težim zadacima korisno je upisati jednu rečenicu:
              „<InlineMath>{"a>0"}</InlineMath>, dve nule, zato je izraz
              pozitivan spolja." To smanjuje rizik od omaške.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim"
        title="Kako se ova tema tipično pojavljuje na ispitu"
        description='Na prijemnom se kvadratna nejednačina retko tretira kao „čist školski zadatak". Često je deo većeg problema ili test preciznosti u radu sa parametrima.'
      >
        <div className={s.grid3}>
          <SectionCard title="Trinom je već spreman">
            <p>
              Dobiješ npr.{" "}
              <InlineMath>{"2x^2-7x+3\\ge 0"}</InlineMath> i od tebe se
              očekuje brzo, uredno rešavanje uz pravilne intervale i krajeve.
            </p>
          </SectionCard>
          <SectionCard title="Nastaje posle smene ili sređivanja">
            <p>
              Posle zamene <InlineMath>{"t=2^x"}</InlineMath>,{" "}
              <InlineMath>{"\\log_a x"}</InlineMath> ili sličnog koraka često
              dobiješ upravo kvadratnu nejednačinu u novoj promenljivoj.
            </p>
          </SectionCard>
          <SectionCard title="Globalni uslov na trinom">
            <p>
              Traži se vrednost parametra tako da je trinom uvek pozitivan, uvek
              negativan ili da nema realnih nula. Tu se proverava pravo
              razumevanje.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ispitni redosled od 10 sekundi">
          <p>
            Sredi na nulu, izračunaj{" "}
            <InlineMath>{"\\Delta"}</InlineMath>, pogledaj znak{" "}
            <InlineMath>{"a"}</InlineMath>, uporedi sa znakom nejednakosti, tek
            onda napiši skup rešenja.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li stvarno vladaš temom"
        description="Rešenja otvaraj tek kada probaš samostalno. Najveća korist dolazi iz toga da prvo sam napraviš skicu znaka parabole."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={<p>Reši <InlineMath>{"x^2-7x+10\\ge 0"}</InlineMath>.</p>}
            solution={
              <>
                <p>
                  Faktorišemo: <InlineMath>{"x^2-7x+10=(x-2)(x-5)"}</InlineMath>. Nule su{" "}
                  <InlineMath>{"2"}</InlineMath> i <InlineMath>{"5"}</InlineMath>, a{" "}
                  <InlineMath>{"a=1>0"}</InlineMath>, pa je izraz nenegativan spolja, uz uključene krajeve:
                </p>
                <MathBlock>{"S=(-\\infty,2]\\cup[5,\\infty)."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={<p>Reši <InlineMath>{"-x^2+4x-3>0"}</InlineMath>.</p>}
            solution={
              <>
                <p>
                  Imamo <InlineMath>{"-x^2+4x-3=-(x-1)(x-3)"}</InlineMath>. Nule su{" "}
                  <InlineMath>{"1"}</InlineMath> i <InlineMath>{"3"}</InlineMath>, a pošto je{" "}
                  <InlineMath>{"a=-1<0"}</InlineMath>, izraz je pozitivan između nula:
                </p>
                <MathBlock>{"S=(1,3)."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={<p>Reši <InlineMath>{"2x^2+8x+10<0"}</InlineMath>.</p>}
            solution={
              <>
                <p>
                  Diskriminanta je <InlineMath>{"\\Delta=8^2-4\\cdot 2\\cdot 10=64-80=-16<0"}</InlineMath>.
                  Kako je <InlineMath>{"a=2>0"}</InlineMath>, parabola je cela iznad{" "}
                  <InlineMath>{"x"}</InlineMath>-ose. Zato strogo negativnih vrednosti nema:
                </p>
                <MathBlock>{"S=\\varnothing."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi <InlineMath>{"m"}</InlineMath> tako da je{" "}
                <InlineMath>{"x^2-2mx+m+1>0"}</InlineMath> za svako{" "}
                <InlineMath>{"x\\in\\mathbb{R}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Za „uvek pozitivno" tražimo <InlineMath>{"a>0"}</InlineMath> i{" "}
                  <InlineMath>{"\\Delta<0"}</InlineMath>. Ovde je <InlineMath>{"a=1>0"}</InlineMath>, pa računamo:
                </p>
                <MathBlock>{"\\Delta=(-2m)^2-4\\cdot 1\\cdot (m+1)=4m^2-4m-4"}</MathBlock>
                <p>Uslov je</p>
                <MathBlock>{"4m^2-4m-4<0 \\iff m^2-m-1<0."}</MathBlock>
                <p>
                  Nule kvadratnog izraza su <InlineMath>{"\\frac{1-\\sqrt{5}}{2}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{1+\\sqrt{5}}{2}"}</InlineMath>, pa je
                </p>
                <MathBlock>{"m\\in\\left(\\frac{1-\\sqrt{5}}{2},\\frac{1+\\sqrt{5}}{2}\\right)."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={<p>Reši <InlineMath>{"x^2-6x+9\\le 0"}</InlineMath>.</p>}
            solution={
              <>
                <p>
                  To je <InlineMath>{"(x-3)^2\\le 0"}</InlineMath>. Kvadrat je uvek nenegativan, pa može biti{" "}
                  <InlineMath>{"\\le 0"}</InlineMath> samo kada je jednak nuli, odnosno za{" "}
                  <InlineMath>{"x=3"}</InlineMath>.
                </p>
                <MathBlock>{"S=\\{3\\}."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Odredi za koje <InlineMath>{"m"}</InlineMath> važi{" "}
                <InlineMath>{"-x^2+mx-4\\le 0"}</InlineMath> za svako{" "}
                <InlineMath>{"x\\in\\mathbb{R}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Za „uvek nepozitivno" treba da važi <InlineMath>{"a<0"}</InlineMath> i{" "}
                  <InlineMath>{"\\Delta\\le 0"}</InlineMath>. Prvi uslov je već ispunjen, jer je{" "}
                  <InlineMath>{"a=-1"}</InlineMath>. Računamo:
                </p>
                <MathBlock>{"\\Delta=m^2-4\\cdot (-1)\\cdot (-4)=m^2-16"}</MathBlock>
                <p>Potrebno je</p>
                <MathBlock>{"m^2-16\\le 0 \\iff -4\\le m\\le 4."}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <InsightCard title="Znak trinoma ne pogađaš. Čitaš ga sa parabole.">
        <p>
          Ako znaš gde su nule i u kom smeru je parabola otvorena, cela priča o
          kvadratnoj nejednačini postaje pregledna. U tom trenutku zadatak više
          nije memorisanje, nego čitanje slike.
        </p>
        <MathBlock>
          {"\\text{znak }(ax^2+bx+c) = \\text{položaj parabole } y=ax^2+bx+c \\text{ u odnosu na } x\\text{-osu}"}
        </MathBlock>
      </InsightCard>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Pred prijemni ti ne treba duga teorija, nego nekoliko stabilnih oslonaca koje nećeš pomešati pod pritiskom vremena."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>1. Kvadratna nejednačina je pitanje znaka funkcije</h3>
            <p>Uvek misliš o paraboli <InlineMath>{"y=ax^2+bx+c"}</InlineMath>: gde je iznad, gde ispod i da li dodiruje <InlineMath>{"x"}</InlineMath>-osu.</p>
          </article>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>2. Znak <InlineMath>{"a"}</InlineMath> i položaj nula</h3>
            <p>Te dve stvari određuju gotovo sve: unutrašnje/spoljašnje intervale, ceo <InlineMath>{"\\mathbb{R}"}</InlineMath>, prazan skup ili jednu tačku.</p>
          </article>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>3. Krajevi prave razliku</h3>
            <p>Kod <InlineMath>{">"}</InlineMath> i <InlineMath>{"<"}</InlineMath> nule ne ulaze, kod <InlineMath>{"\\ge"}</InlineMath> i <InlineMath>{"\\le"}</InlineMath> ulaze. To je sitnica koja odlučuje tačnost konačnog odgovora.</p>
          </article>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>{'4. „Za svako realno x" znači globalni uslov'}</h3>
            <p>Zapamti blok uslova sa znakom <InlineMath>{"a"}</InlineMath> i diskriminantom. To je najbrži put kroz parametarske zadatke.</p>
          </article>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>5. Nacrtaj grubu skicu</h3>
            <p>Dovoljna je vrlo gruba parabola sa nulama i smerom otvaranja. Često upravo skica vrati sigurnost u konačan izbor intervala.</p>
          </article>
          <article className={s.summaryCard} style={{ padding: 22 }}>
            <h3 className={cs.tCardTitle}>6. Poveži ovo sa složenijim zadacima</h3>
            <p>Ova logika se odmah koristi u sistemima kvadratnih jednačina, eksponencijalnim i logaritamskim zadacima posle smene, kao i u parametrima.</p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Ako ovu lekciju stvarno savladaš, više nećeš „tražiti šablon", nego
          ćeš u svakom zadatku prvo videti znak parabole. To je pravi cilj.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
