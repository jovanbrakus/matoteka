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
  { href: "#osnovni-grafici", label: "Osnovni grafici" },
  { href: "#parametri", label: "Parametri" },
  { href: "#nule-asimptote", label: "Nule i asimptote" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson38Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 38"
        title={
          <>
            Grafici i svojstva{" "}
            <span className={cs.tHeroAccent}>
              trigonometrijskih funkcija
            </span>
          </>
        }
        description='U ovoj lekciji ne učiš samo da "prepoznaš" sinus ili tangens, već da iz formule odmah pročitaš kako izgleda grafik, gde se ponavlja, gde seče x-osu i gde funkcija uopšte nije definisana. To je presudno i za ručno skiciranje i za kasnije rešavanje jednačina i nejednačina na prijemnom.'
        heroImageSrc="/api/lessons/38/hero"
        heroImageAlt="Ilustracija sa grafikama sinusa, kosinusa, tangensa i kotangensa, periodama, nulama i asimptotama"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da sigurno skiciraš sin x, cos x, tan x, cot x i njihove transformacije preko parametara A, B, C i D.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje amplitude i periode, kao i traženje asimptota kod sinusa i kosinusa ili amplitude kod tangensa i kotangensa.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo čitanje parametara, brojanje nula u intervalu i pravilno obeležavanje asimptota pre bilo kakvog računa.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70-90 minuta uz crtanje bar četiri grafa i rešavanje završnih zadataka.",
          },
          {
            label: "Predznanje",
            description:
              "Radijani, trigonometrijska kružnica i osnovne identitete iz prethodnih trigonometrijskih lekcija.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz formule odmah odrediš periodu, pomeraj, nule i asimptote, pa tek onda crtaš.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za promenu parametara i trenutni prikaz karakterističnih osobina grafa.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Grafik je najbrži način da proveriš da li razumeš funkciju"
        description="Na prijemnom se često traži više od pukog izračunavanja. Moraš da znaš koliko rešenja postoji u intervalu, gde se funkcija menja iz pozitivne u negativnu, zašto neka vrednost ne pripada domenu ili kako izgleda jedna perioda. Sve to postaje mnogo lakše kada funkciju vidiš grafički."
      >
        <div className={s.grid3}>
          <SectionCard title="Za jednačine i nejednačine">
            <p>
              Kada znaš nule, periode i asimptote, lakše pišeš opšte rešenje i
              brže brojiš koliko ga ima u zadatom intervalu.
            </p>
          </SectionCard>
          <SectionCard title="Za prepoznavanje zamki">
            <p>
              Grafik odmah otkriva da{" "}
              <InlineMath>{"\\tan x"}</InlineMath> nije definisan svuda i da
              pomeraj po <InlineMath>{"y"}</InlineMath>-osi može potpuno da
              ukloni nule sinusa ili kosinusa.
            </p>
          </SectionCard>
          <SectionCard title="Za sigurnu skicu bez kalkulatora">
            <p>
              Ako umeš da nacrtaš jedan period, možeš da produžiš grafik na
              celu realnu osu i bez komplikovanog računanja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoška poenta">
          <p>
            Ne pokušavaj da pamtiš svaki grafik kao posebnu sliku. Nauči
            osnovni model i transformacije. Tada svaki novi zadatak postaje
            samo pomeranje, sabijanje, istezanje ili refleksija već poznatog
            grafa.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNI GRAFICI ═══════════ */}
      <LessonSection
        id="osnovni-grafici"
        eyebrow="Osnovni modeli"
        title="Prvo moraš da razlikuješ porodice grafika"
        description={'Pre nego što uopšte uključiš parametre, važno je da vidiš razliku između dve \u201Emirne\u201C oscilacije, sin x i cos x, i dve funkcije sa granama i asimptotama, tan x i cot x. To je osnova cele lekcije.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Šta prvo gledaš">
            <ul>
              <li>
                Da li je grafik omeđen između dve horizontalne vrednosti ili
                ide ka <InlineMath>{"\\pm \\infty"}</InlineMath>.
              </li>
              <li>
                Da li se ponavlja na{" "}
                <InlineMath>{"2\\pi"}</InlineMath> ili već na{" "}
                <InlineMath>{"\\pi"}</InlineMath>.
              </li>
              <li>Da li ima vertikalne asimptote.</li>
              <li>
                Da li nule dolaze u pravilnom koraku po{" "}
                <InlineMath>{"\\pi"}</InlineMath> ili{" "}
                <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Šta studenti često pomešaju">
            <ul>
              <li>
                <InlineMath>{"\\sin x"}</InlineMath> i{" "}
                <InlineMath>{"\\cos x"}</InlineMath> imaju istu periodu, ali
                različit početak talasa.
              </li>
              <li>
                <InlineMath>{"\\tan x"}</InlineMath> i{" "}
                <InlineMath>{"\\cot x"}</InlineMath> imaju istu periodu, ali
                su asimptote i nule pomerene.
              </li>
              <li>Sinus i kosinus nemaju vertikalne asimptote.</li>
              <li>
                Tangens i kotangens nemaju amplitudu jer nisu omeđeni.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Sinus"
            formula={"y=\\sin x"}
            note={
              <>
                Domen: <InlineMath>{"\\mathbb{R}"}</InlineMath>. Skup
                vrednosti: <InlineMath>{"[-1,1]"}</InlineMath>. Perioda:{" "}
                <InlineMath>{"2\\pi"}</InlineMath>. Nule:{" "}
                <InlineMath>{"x=k\\pi"}</InlineMath>. Neparna, bez
                asimptota.
              </>
            }
          />
          <FormulaCard
            title="Kosinus"
            formula={"y=\\cos x"}
            note={
              <>
                Domen: <InlineMath>{"\\mathbb{R}"}</InlineMath>. Skup
                vrednosti: <InlineMath>{"[-1,1]"}</InlineMath>. Perioda:{" "}
                <InlineMath>{"2\\pi"}</InlineMath>. Nule:{" "}
                <InlineMath>{"x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>. Parna,
                bez asimptota.
              </>
            }
          />
          <FormulaCard
            title="Tangens"
            formula={"y=\\tan x"}
            note={
              <>
                Domen:{" "}
                <InlineMath>
                  {
                    "\\mathbb{R}\\setminus\\left\\{ \\frac{\\pi}{2}+k\\pi \\right\\}"
                  }
                </InlineMath>
                . Skup vrednosti: <InlineMath>{"\\mathbb{R}"}</InlineMath>.
                Perioda: <InlineMath>{"\\pi"}</InlineMath>. Nule:{" "}
                <InlineMath>{"x=k\\pi"}</InlineMath>. Asimptote:{" "}
                <InlineMath>{"x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Kotangens"
            formula={"y=\\cot x"}
            note={
              <>
                Domen:{" "}
                <InlineMath>
                  {"\\mathbb{R}\\setminus\\{ k\\pi \\}"}
                </InlineMath>
                . Skup vrednosti: <InlineMath>{"\\mathbb{R}"}</InlineMath>.
                Perioda: <InlineMath>{"\\pi"}</InlineMath>. Nule:{" "}
                <InlineMath>{"x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>.
                Asimptote: <InlineMath>{"x=k\\pi"}</InlineMath>.
              </>
            }
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto tan x nema amplitudu?"
          answer={
            <p>
              Zato što amplituda opisuje najveće odstupanje od srednje linije,
              a <InlineMath>{"\\tan x"}</InlineMath> nije ograničen. Njegove
              vrednosti mogu da budu proizvoljno velike pozitivne ili
              negativne kada se približava asimptotama. Dakle, kod tangensa i
              kotangensa možeš govoriti o faktoru vertikalnog istezanja, ali
              ne o amplitudi.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PARAMETRI ═══════════ */}
      <LessonSection
        id="parametri"
        eyebrow="Parametri grafa"
        title="Kako formula pomera, sabija i obrće poznati grafik"
        description="Najvažniji korak za studenta je da prestane da gleda formulu kao skup simbola i počne da je čita kao uputstvo za crtanje. U tome služe parametri A, B, C i D."
      >
        <div className={s.grid2}>
          <SectionCard title="Opšti oblici">
            <MathBlock>
              {"y=A\\sin(Bx+C)+D,\\qquad y=A\\cos(Bx+C)+D"}
            </MathBlock>
            <MathBlock>
              {"y=A\\tan(Bx+C)+D,\\qquad y=A\\cot(Bx+C)+D"}
            </MathBlock>
            <p>
              Porodica funkcije određuje osnovni oblik, a parametri određuju
              kako će taj oblik biti transformisan.
            </p>
          </SectionCard>
          <SectionCard title="Najkraće pravilo">
            <ul>
              <li>
                Prepoznaj porodicu: sinus, kosinus, tangens ili kotangens.
              </li>
              <li>
                Izračunaj periodu preko parametra{" "}
                <InlineMath>{"B"}</InlineMath>.
              </li>
              <li>
                Nađi fazni pomeraj preko{" "}
                <InlineMath>{"-\\frac{C}{B}"}</InlineMath>.
              </li>
              <li>
                Tek onda koristi <InlineMath>{"A"}</InlineMath> i{" "}
                <InlineMath>{"D"}</InlineMath> da doradiš visinu, smer i
                položaj grafa.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Parametar A"
            formula={"y=A\\cdot \\text{(osnovna funkcija)}"}
            note={
              <p>
                Za sinus i kosinus amplituda je{" "}
                <InlineMath>{"|A|"}</InlineMath>. Ako je{" "}
                <InlineMath>{"A<0"}</InlineMath>, grafik se preslikava preko{" "}
                <InlineMath>{"x"}</InlineMath>-ose. Kod tangensa i kotangensa{" "}
                <InlineMath>{"|A|"}</InlineMath> menja strminu grane, ali ne
                uvodi amplitudu.
              </p>
            }
          />
          <FormulaCard
            title="Parametar B"
            formula={"T_{\\sin,\\cos}=\\frac{2\\pi}{|B|}, \\qquad T_{\\tan,\\cot}=\\frac{\\pi}{|B|}"}
            note={
              <p>
                Što je <InlineMath>{"|B|"}</InlineMath> veći, grafik je
                &ldquo;zbijeniji&rdquo; po{" "}
                <InlineMath>{"x"}</InlineMath>-osi. Perioda se uvek računa
                pomoću apsolutne vrednosti.
              </p>
            }
          />
          <FormulaCard
            title="Parametar C"
            formula={"Bx+C = B\\left(x+\\frac{C}{B}\\right), \\qquad x_0=-\\frac{C}{B}"}
            note={
              <p>
                Fazni pomeraj čitaš iz unutrašnjosti argumenta. Ako je{" "}
                <InlineMath>{"C>0"}</InlineMath>, grafik ide ulevo; ako je{" "}
                <InlineMath>{"C<0"}</InlineMath>, ide udesno.
              </p>
            }
          />
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Parametar D"
            formula={"y=\\text{(transformisani osnovni grafik)}+D"}
            note={
              <p>
                Celoj funkciji dodaješ istu visinu. Kod sinusa i kosinusa
                srednja linija postaje <InlineMath>{"y=D"}</InlineMath>, a
                kod tangensa i kotangensa cela grana se pomera naviše ili
                naniže.
              </p>
            }
          />
        </div>

        <div className={s.walkthrough} style={{ marginTop: 18 }}>
          <WalkStep number={1} title="Odredi osnovni tip grafa">
            <p>
              Najpre vidi da li je baza{" "}
              <InlineMath>{"\\sin"}</InlineMath>,{" "}
              <InlineMath>{"\\cos"}</InlineMath>,{" "}
              <InlineMath>{"\\tan"}</InlineMath> ili{" "}
              <InlineMath>{"\\cot"}</InlineMath>. Time znaš da li očekuješ
              talas ili grane sa asimptotama.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Nađi periodu">
            <p>
              Bez periode ne znaš razmak ponavljanja. Ona ti odmah govori
              koliko širok treba da bude jedan osnovni deo grafa.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Označi fazni pomeraj">
            <p>
              To je početna referentna tačka. Kod sinusa i kosinusa ona ti
              daje početak jednog perioda, a kod tangensa i kotangensa pomera
              nule ili asimptote.
            </p>
          </WalkStep>
          <WalkStep
            number={4}
            title={
              <>
                Dodaj uticaj <InlineMath>{"A"}</InlineMath> i{" "}
                <InlineMath>{"D"}</InlineMath>
              </>
            }
          >
            <p>
              Na kraju menjaj visinu i smer. Za sinus i kosinus obeleži
              amplitudu i srednju liniju, a za tangens i kotangens položaj
              centralne visine grane.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: u kom smeru ide grafik funkcije y = sin(2x + π)?"
          answer={
            <p>
              Piši argument kao{" "}
              <InlineMath>
                {"2\\left(x+\\frac{\\pi}{2}\\right)"}
              </InlineMath>
              . To znači da je fazni pomeraj{" "}
              <InlineMath>
                {"-\\frac{C}{B}=-\\frac{\\pi}{2}"}
              </InlineMath>
              , pa grafik ide ulevo za{" "}
              <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath>. Učenici često
              greše jer gledaju samo znak &ldquo;plus&rdquo; i ne dele sa{" "}
              <InlineMath>{"B"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ NULE I ASIMPTOTE ═══════════ */}
      <LessonSection
        id="nule-asimptote"
        eyebrow="Nule i asimptote"
        title="Ne traži ih napamet, već iz osnovnog modela"
        description="Kada se izgubiš u parametrima, vrati se osnovnom obliku. Nule i asimptote transformisanog grafa dobijaju se pomeranjem i sabijanjem poznatih nula i asimptota osnovne funkcije."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovne nule"
            formula={"\\sin x = 0 \\iff x=k\\pi"}
            note={
              <>
                <MathBlock>
                  {"\\cos x = 0 \\iff x=\\frac{\\pi}{2}+k\\pi"}
                </MathBlock>
                <MathBlock>
                  {
                    "\\tan x = 0 \\iff x=k\\pi,\\qquad \\cot x = 0 \\iff x=\\frac{\\pi}{2}+k\\pi"
                  }
                </MathBlock>
              </>
            }
          />
          <FormulaCard
            title="Osnovne asimptote"
            formula={"\\tan x \\text{ nije def. za } x=\\frac{\\pi}{2}+k\\pi"}
            note={
              <>
                <MathBlock>
                  {"\\cot x \\text{ nije definisan za } x=k\\pi"}
                </MathBlock>
                <p>
                  Sinus i kosinus nemaju vertikalne asimptote. To je prvo što
                  treba da proveriš pre crtanja.
                </p>
              </>
            }
          />
          <FormulaCard
            title="Kada postoji pomeraj po y-osi"
            formula={"A\\sin(Bx+C)+D=0 \\iff \\sin(Bx+C)=-\\frac{D}{A}"}
            note={
              <>
                <MathBlock>
                  {
                    "A\\cos(Bx+C)+D=0 \\iff \\cos(Bx+C)=-\\frac{D}{A}"
                  }
                </MathBlock>
                <p>
                  Ovde vidiš zašto <InlineMath>{"D"}</InlineMath> menja
                  nule: više ne rešavaš osnovnu jednakost sa nulom, nego
                  tražiš gde trigonometrijska funkcija dostiže novu vrednost.
                </p>
              </>
            }
          />
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Transformisane asimptote"
            formula={"\\tan(Bx+C)\\text{ ima asimptote kada } Bx+C=\\frac{\\pi}{2}+k\\pi"}
            note={
              <>
                <MathBlock>
                  {
                    "\\cot(Bx+C)\\text{ ima asimptote kada } Bx+C=k\\pi"
                  }
                </MathBlock>
                <p>
                  Parametar <InlineMath>{"A"}</InlineMath> ne pomera
                  asimptote po <InlineMath>{"x"}</InlineMath>-osi. Njihov
                  položaj zavisi samo od argumenta, odnosno od{" "}
                  <InlineMath>{"B"}</InlineMath> i{" "}
                  <InlineMath>{"C"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Praktična strategija za nule">
            <ul>
              <li>
                Ako je <InlineMath>{"D=0"}</InlineMath>, prvo koristi
                osnovne nule funkcije.
              </li>
              <li>
                Ako je <InlineMath>{"D\\neq 0"}</InlineMath>, prebacuješ ga
                na drugu stranu i rešavaš trigonometrijsku jednačinu.
              </li>
              <li>
                Na prijemnom često nije dovoljno opšte rešenje, već moraš da
                prebrojiš koliko njih upada u dati interval.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Praktična strategija za asimptote">
            <ul>
              <li>
                Asimptote tražiš samo kod{" "}
                <InlineMath>{"\\tan"}</InlineMath> i{" "}
                <InlineMath>{"\\cot"}</InlineMath>.
              </li>
              <li>
                Najpre napišeš gde baza nije definisana, pa tek onda rešavaš
                linearnu jednačinu po <InlineMath>{"x"}</InlineMath>.
              </li>
              <li>
                Na skici prvo ucrtaj asimptote, pa tek onda granu između
                njih.
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li funkcija y = 2 + sin x ima nule?"
          answer={
            <p>
              Nema. Pošto je{" "}
              <InlineMath>{"\\sin x \\in [-1,1]"}</InlineMath>, sledi{" "}
              <InlineMath>{"2+\\sin x \\in [1,3]"}</InlineMath>. Dakle,
              grafik je ceo iznad <InlineMath>{"x"}</InlineMath>-ose. Ovo je
              klasičan primer zašto je parametar{" "}
              <InlineMath>{"D"}</InlineMath> važan i za graf i za jednačine.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Najvažnije je da pratiš redosled koraka"
        description="U vođenim primerima nije cilj samo da dobiješ rezultat, već da usvojiš način razmišljanja. Ako preskočiš redosled, često se izgubiš u znacima i pomerajima."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: skica funkcije{" "}
              <InlineMath>
                {"f(x)=2\\sin\\left(x-\\frac{\\pi}{3}\\right)+1"}
              </InlineMath>
            </h3>
            <p>
              Ovo je dobar prvi primer jer sadrži amplitudu, fazni pomeraj i
              pomeraj po <InlineMath>{"y"}</InlineMath>-osi.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    <InlineMath>{"A=2"}</InlineMath>, pa je amplituda{" "}
                    <InlineMath>{"2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    <InlineMath>{"B=1"}</InlineMath>, zato je perioda{" "}
                    <InlineMath>{"T=2\\pi"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Pošto je argument{" "}
                    <InlineMath>{"x-\\frac{\\pi}{3}"}</InlineMath>, grafik
                    ide udesno za{" "}
                    <InlineMath>{"\\frac{\\pi}{3}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    <InlineMath>{"D=1"}</InlineMath>, pa je srednja linija{" "}
                    <InlineMath>{"y=1"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={5}
                title={
                  <>
                    Jedan period možeš crtati od{" "}
                    <InlineMath>{"x=\\frac{\\pi}{3}"}</InlineMath> do{" "}
                    <InlineMath>{"x=\\frac{7\\pi}{3}"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>
              {
                "\\left(\\frac{\\pi}{3},1\\right),\\; \\left(\\frac{5\\pi}{6},3\\right),\\; \\left(\\frac{4\\pi}{3},1\\right),\\; \\left(\\frac{11\\pi}{6},-1\\right),\\; \\left(\\frac{7\\pi}{3},1\\right)"
              }
            </MathBlock>
            <p>
              Skup vrednosti je <InlineMath>{"[-1,3]"}</InlineMath>.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: funkcija{" "}
              <InlineMath>
                {"g(x)=-\\cos\\left(2x+\\frac{\\pi}{2}\\right)"}
              </InlineMath>
            </h3>
            <p>
              Ovde vežbamo refleksiju, sabijanje po{" "}
              <InlineMath>{"x"}</InlineMath>-osi i fazni pomeraj.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    <InlineMath>{"A=-1"}</InlineMath>, dakle amplituda je{" "}
                    <InlineMath>{"1"}</InlineMath>, ali se grafik preslikava
                    preko <InlineMath>{"x"}</InlineMath>-ose.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    <InlineMath>{"B=2"}</InlineMath>, pa je perioda{" "}
                    <InlineMath>
                      {"T=\\frac{2\\pi}{2}=\\pi"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    <InlineMath>
                      {
                        "2x+\\frac{\\pi}{2}=2\\left(x+\\frac{\\pi}{4}\\right)"
                      }
                    </InlineMath>
                    , pa grafik ide ulevo za{" "}
                    <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={4} title="Nule dobijaš iz:">
                <MathBlock>
                  {
                    "\\cos\\left(2x+\\frac{\\pi}{2}\\right)=0 \\Rightarrow 2x+\\frac{\\pi}{2}=\\frac{\\pi}{2}+k\\pi \\Rightarrow x=\\frac{k\\pi}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Koristan uvid">
              <p>
                Važi identitet{" "}
                <InlineMath>
                  {
                    "-\\cos\\left(2x+\\frac{\\pi}{2}\\right)=\\sin 2x"
                  }
                </InlineMath>
                . To znači da do istog grafa možeš doći i čistim
                transformacijama i pametnim identitetom. Na ispitu koristi
                ono što brže vidiš.
              </p>
            </InsightCard>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: tangens sa asimptotama{" "}
              <InlineMath>
                {"h(x)=\\tan\\left(2x-\\frac{\\pi}{4}\\right)"}
              </InlineMath>
            </h3>
            <p>
              Ovo je tipičan primer za pravilno crtanje jedne grane između
              dve asimptote.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto je u pitanju tangens, očekuješ vertikalne
                    asimptote i periodu{" "}
                    <InlineMath>
                      {"\\frac{\\pi}{|B|}=\\frac{\\pi}{2}"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep number={2} title="Nule dobijaš iz:">
                <MathBlock>
                  {
                    "2x-\\frac{\\pi}{4}=k\\pi \\Rightarrow x=\\frac{\\pi}{8}+k\\frac{\\pi}{2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Asimptote dobijaš iz:">
                <MathBlock>
                  {
                    "2x-\\frac{\\pi}{4}=\\frac{\\pi}{2}+k\\pi \\Rightarrow x=\\frac{3\\pi}{8}+k\\frac{\\pi}{2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={4}
                title={
                  <>
                    Jedna centralna grana nalazi se između asimptota{" "}
                    <InlineMath>{"x=-\\frac{\\pi}{8}"}</InlineMath> i{" "}
                    <InlineMath>{"x=\\frac{3\\pi}{8}"}</InlineMath>, a kroz
                    nulu prolazi u tački{" "}
                    <InlineMath>{"x=\\frac{\\pi}{8}"}</InlineMath>.
                  </>
                }
              />
            </div>
            <InsightCard title="Poenta">
              <p>
                Kod tangensa najpre postavi asimptote, zatim srednju nulu
                između njih, pa tek onda iscrtaj rastuću granu od{" "}
                <InlineMath>{"-\\infty"}</InlineMath> do{" "}
                <InlineMath>{"+\\infty"}</InlineMath>.
              </p>
            </InsightCard>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: koliko nula ima{" "}
              <InlineMath>
                {"p(x)=2\\sin\\left(3x-\\frac{\\pi}{2}\\right)"}
              </InlineMath>{" "}
              na intervalu <InlineMath>{"[0,2\\pi]"}</InlineMath>?
            </h3>
            <p>
              Ovo je vrlo tipičan prijemni obrazac: opšte rešenje plus
              brojanje u intervalu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Pošto je faktor 2 ispred sinusa, nule se ne menjaju."
              />
              <WalkStep number={2} title="Rešavaš:">
                <MathBlock>
                  {"3x-\\frac{\\pi}{2}=k\\pi"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Odakle sledi:">
                <MathBlock>
                  {"x=\\frac{\\pi}{6}+k\\frac{\\pi}{3}"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={4}
                title={
                  <>
                    Sada samo proveri koje vrednosti upadaju u{" "}
                    <InlineMath>{"[0,2\\pi]"}</InlineMath>: za{" "}
                    <InlineMath>{"k=0,1,2,3,4,5"}</InlineMath> dobijaš
                    dozvoljene nule.
                  </>
                }
              />
            </div>
            <p>
              Dakle, funkcija ima tačno 6 nula na intervalu{" "}
              <InlineMath>{"[0,2\\pi]"}</InlineMath>:
            </p>
            <MathBlock>
              {
                "\\frac{\\pi}{6},\\ \\frac{\\pi}{2},\\ \\frac{5\\pi}{6},\\ \\frac{7\\pi}{6},\\ \\frac{3\\pi}{2},\\ \\frac{11\\pi}{6}"
              }
            </MathBlock>
            <p>
              Ovde grafik pomaže da proceniš razmak između nula: pošto je
              perioda <InlineMath>{"\\frac{2\\pi}{3}"}</InlineMath>, nule se
              javljaju češće nego kod običnog sinusa.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule"
        title="Formula-kutak koji treba da umeš da prizoveš bez panike"
        description="Ove formule nisu cilj same po sebi. One su kratka mapa koja ti govori odakle kreće skica i šta obavezno proveravaš pre nego što napišeš odgovor."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Amplitude i opseg"
            formula={"\\text{amplituda}=|A|,\\qquad \\text{skup vrednosti}=[D-|A|,D+|A|]"}
            note={
              <p>
                Važi za{" "}
                <InlineMath>{"y=A\\sin(Bx+C)+D"}</InlineMath> i{" "}
                <InlineMath>{"y=A\\cos(Bx+C)+D"}</InlineMath>.
              </p>
            }
          />
          <FormulaCard
            title="Periode"
            formula={"T_{\\sin,\\cos}=\\frac{2\\pi}{|B|},\\qquad T_{\\tan,\\cot}=\\frac{\\pi}{|B|}"}
          />
          <FormulaCard
            title="Fazni pomeraj"
            formula={"x_0=-\\frac{C}{B}"}
            note="Ovo je jedna od najčešćih grešaka: znak faznog pomeraja je suprotan od znaka koji vidiš pored C u argumentu."
          />
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Asimptote tangensa"
            formula={"\\tan(Bx+C)\\text{: asimptote kada }Bx+C=\\frac{\\pi}{2}+k\\pi"}
          />
          <FormulaCard
            title="Asimptote kotangensa"
            formula={"\\cot(Bx+C)\\text{: asimptote kada }Bx+C=k\\pi"}
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Brzi algoritam za sinus i kosinus">
            <p>
              Nađi amplitudu, periodu i srednju liniju. Zatim ucrtaj pet
              karakterističnih tačaka jednog perioda i tek onda produži grafik
              periodično.
            </p>
          </SectionCard>
          <SectionCard title="Brzi algoritam za tangens i kotangens">
            <p>
              Nađi periodu i asimptote. Obeleži nulu ili referentnu tačku
              između asimptota, pa nacrtaj rastuću ili opadajuću granu.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kada D nije nula">
            <p>
              Nule više ne čitaš direktno sa osnovne funkcije. Moraš da
              rešavaš jednačinu{" "}
              <InlineMath>{"\\text{baza}=-\\frac{D}{A}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Kada B nije 1">
            <p>
              Ne zaboravi da se sve horizontalne udaljenosti dele sa{" "}
              <InlineMath>{"|B|"}</InlineMath>: i perioda i razmak između
              nula i asimptota.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje obaraju inače dobar zadatak"
        description="Ovo nisu opšti saveti, već konkretne greške koje se stalno pojavljuju kada studenti prvi put sistematski crtaju trigonometrijske funkcije."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan znak faznog pomeraja</h3>
            <p>
              Iz izraza <InlineMath>{"Bx+C"}</InlineMath> ne čitaš pomeraj
              kao <InlineMath>{"+C"}</InlineMath>, već kao{" "}
              <InlineMath>{"-\\frac{C}{B}"}</InlineMath>. Zbog toga{" "}
              <InlineMath>{"x+\\frac{\\pi}{3}"}</InlineMath> znači pomeraj
              ulevo, a ne udesno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljena apsolutna vrednost kod periode
            </h3>
            <p>
              Ako je <InlineMath>{"B<0"}</InlineMath>, perioda i dalje
              zavisi od <InlineMath>{"|B|"}</InlineMath>. Znak utiče na
              smer, ne na samu dužinu periode.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Traženje amplitude kod{" "}
              <InlineMath>{"\\tan"}</InlineMath> i{" "}
              <InlineMath>{"\\cot"}</InlineMath>
            </h3>
            <p>
              Tangens i kotangens nisu omeđeni. Vertikalni faktor postoji,
              ali amplituda ne postoji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Asimptote se crtaju posle grane
            </h3>
            <p>
              To je pogrešan redosled. Kod tangensa i kotangensa prvo se
              crtaju asimptote, jer one određuju gde grana uopšte može da
              stoji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zanemaren uticaj parametra <InlineMath>{"D"}</InlineMath> na
              nule
            </h3>
            <p>
              Funkcija <InlineMath>{"2+\\sin x"}</InlineMath> nema nule iako
              ih običan sinus ima. Pomeraj po{" "}
              <InlineMath>{"y"}</InlineMath>-osi menja preseke sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Crtanje &ldquo;na osećaj&rdquo; bez jedne periode
            </h3>
            <p>
              Ako ne odrediš jednu reprezentativnu periodu, lako dobiješ
              pogrešan razmak između karakterističnih tačaka i ceo grafik
              postaje nekonzistentan.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova lekcija realno pojavljuje na testu"
        description="Na prijemnom grafik trigonometrijske funkcije retko stoji kao izolovana tema. Obično je deo šireg zadatka: prebrojati rešenja, odrediti znak funkcije, nacrtati skicu ili povezati grafik sa jednačinom."
      >
        <div className={s.grid2}>
          <SectionCard title="Brojanje rešenja u intervalu">
            <p>
              Prvo napišeš opšte rešenje za nule ili kritične tačke, a zatim
              pažljivo brojiš samo one vrednosti koje pripadaju traženom
              intervalu.
            </p>
          </SectionCard>
          <SectionCard title="Brza procena znaka">
            <p>
              Skica grafa često štedi vreme: odmah vidiš gde je funkcija
              iznad ili ispod <InlineMath>{"x"}</InlineMath>-ose i gde menja
              znak.
            </p>
          </SectionCard>
          <SectionCard title="Prepoznavanje domena">
            <p>
              Kod <InlineMath>{"\\tan"}</InlineMath> i{" "}
              <InlineMath>{"\\cot"}</InlineMath> domen nije cela realna osa.
              To ume da bude skrivena zamka i u jednačinama i u
              nejednačinama.
            </p>
          </SectionCard>
          <SectionCard title="Transformisani grafik kao uvod u teže zadatke">
            <p>
              Kada kasnije rešavaš trigonometrijske jednačine, grafik ti
              pomaže da proveriš smisao dobijenog skupa rešenja i broj
              preseka sa zadatom horizontalom.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Mini-checklista za ispit">
          <p>
            1. Porodica funkcije. 2. Perioda. 3. Fazni pomeraj. 4. Nule ili
            asimptote. 5. Tek onda skica ili račun.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Proveri da li stvarno umeš da pročitaš grafik iz formule"
        description="Pokušaj najpre samostalno. Tek ako zapneš, otvori rešenje. Posebno obrati pažnju na redosled: porodica, perioda, pomeraj, pa nule i asimptote."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Odredi amplitudu, periodu, fazni pomeraj i srednju liniju
                funkcije{" "}
                <InlineMath>
                  {"f(x)=-3\\sin(2x+\\pi)+2"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"A=-3"}</InlineMath>, pa je amplituda{" "}
                  <InlineMath>{"3"}</InlineMath>, a postoji i refleksija
                  preko <InlineMath>{"x"}</InlineMath>-ose.{" "}
                  <InlineMath>{"B=2"}</InlineMath>, zato je perioda{" "}
                  <InlineMath>
                    {"T=\\frac{2\\pi}{2}=\\pi"}
                  </InlineMath>
                  .
                </p>
                <p>
                  Pošto je{" "}
                  <InlineMath>
                    {
                      "2x+\\pi=2\\left(x+\\frac{\\pi}{2}\\right)"
                    }
                  </InlineMath>
                  , fazni pomeraj je ulevo za{" "}
                  <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath>, odnosno{" "}
                  <InlineMath>
                    {"x_0=-\\frac{\\pi}{2}"}
                  </InlineMath>
                  .
                </p>
                <p>
                  Srednja linija je <InlineMath>{"y=2"}</InlineMath>, a skup
                  vrednosti je{" "}
                  <InlineMath>{"[2-3,2+3]=[-1,5]"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Nađi nule funkcije{" "}
                <InlineMath>
                  {"g(x)=\\cos\\left(3x-\\frac{\\pi}{2}\\right)"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Kosinus je nula kada je argument{" "}
                  <InlineMath>{"\\frac{\\pi}{2}+k\\pi"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "3x-\\frac{\\pi}{2}=\\frac{\\pi}{2}+k\\pi \\Rightarrow 3x=\\pi+k\\pi \\Rightarrow x=\\frac{\\pi}{3}+k\\frac{\\pi}{3}, \\quad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Odredi vertikalne asimptote funkcije{" "}
                <InlineMath>
                  {"h(x)=2\\tan\\left(x+\\frac{\\pi}{6}\\right)-1"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Asimptote tangensa se javljaju kada je argument jednak{" "}
                  <InlineMath>{"\\frac{\\pi}{2}+k\\pi"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "x+\\frac{\\pi}{6}=\\frac{\\pi}{2}+k\\pi \\Rightarrow x=\\frac{\\pi}{3}+k\\pi, \\quad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
                <p>
                  Parametri <InlineMath>{"2"}</InlineMath> i{" "}
                  <InlineMath>{"-1"}</InlineMath> ne utiču na položaj
                  asimptota po <InlineMath>{"x"}</InlineMath>-osi.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Skiciraj jedan period funkcije{" "}
                <InlineMath>{"p(x)=\\cot(2x)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto je u pitanju kotangens, osnovna perioda je{" "}
                  <InlineMath>{"\\pi"}</InlineMath>, pa za{" "}
                  <InlineMath>{"\\cot(2x)"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"T=\\frac{\\pi}{2}"}</InlineMath>.
                </p>
                <p>
                  Asimptote su kada je{" "}
                  <InlineMath>{"2x=k\\pi"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x=k\\frac{\\pi}{2}"}</InlineMath>. Nule su
                  kada je{" "}
                  <InlineMath>
                    {"2x=\\frac{\\pi}{2}+k\\pi"}
                  </InlineMath>
                  , pa je{" "}
                  <InlineMath>
                    {"x=\\frac{\\pi}{4}+k\\frac{\\pi}{2}"}
                  </InlineMath>
                  .
                </p>
                <p>
                  Jedan period možeš uzeti na intervalu{" "}
                  <InlineMath>
                    {"\\left(0,\\frac{\\pi}{2}\\right)"}
                  </InlineMath>
                  : tu je grana opadajuća, od{" "}
                  <InlineMath>{"+\\infty"}</InlineMath> ka{" "}
                  <InlineMath>{"-\\infty"}</InlineMath>, i seče{" "}
                  <InlineMath>{"x"}</InlineMath>-osu u{" "}
                  <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Koliko nula ima funkcija{" "}
                <InlineMath>{"q(x)=\\sin(4x)"}</InlineMath> na intervalu{" "}
                <InlineMath>{"[0,\\pi]"}</InlineMath>?
              </p>
            }
            solution={
              <>
                <p>
                  Tražiš rešenja jednačine{" "}
                  <InlineMath>{"\\sin(4x)=0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"4x=k\\pi"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x=k\\frac{\\pi}{4}"}</InlineMath>.
                </p>
                <p>
                  Na intervalu <InlineMath>{"[0,\\pi]"}</InlineMath>{" "}
                  dozvoljene su vrednosti za{" "}
                  <InlineMath>{"k=0,1,2,3,4"}</InlineMath>. Dakle, ima
                  ukupno 5 nula, uključujući krajnje tačke{" "}
                  <InlineMath>{"0"}</InlineMath> i{" "}
                  <InlineMath>{"\\pi"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Odredi da li funkcija{" "}
                <InlineMath>{"r(x)=2+\\cos x"}</InlineMath> ima nule i
                obrazloži bez rešavanja jednačine.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"\\cos x \\in [-1,1]"}</InlineMath>, pa je{" "}
                  <InlineMath>{"2+\\cos x \\in [1,3]"}</InlineMath>. Dakle,
                  grafik je stalno iznad{" "}
                  <InlineMath>{"x"}</InlineMath>-ose i funkcija nema nule.
                </p>
                <p>
                  Ovaj zadatak proverava da li razumeš uticaj parametra{" "}
                  <InlineMath>{"D"}</InlineMath>, a ne samo da li umeš
                  formalno da rešavaš trigonometrijske jednačine.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Ključna poruka"
        description="Ne crtaš svaki trigonometrijski grafik od nule. Uvek polaziš od osnovnog modela koji već znaš, a zatim ga transformišeš."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kada to postane navika, zadaci sa grafikom, nulama i asimptotama
            prestaju da budu teški i postaju mehanički pregledni.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ako iz ove lekcije poneseš sledeće ideje, bićeš spreman i za crtanje i za sledeći korak: trigonometrijske jednačine i nejednačine."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Prepoznaj porodicu</h3>
            <p>
              Sinus i kosinus su omeđeni talasi; tangens i kotangens imaju
              grane i vertikalne asimptote.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Perioda dolazi iz <InlineMath>{"B"}</InlineMath>
            </h3>
            <p>
              Za <InlineMath>{"\\sin"}</InlineMath> i{" "}
              <InlineMath>{"\\cos"}</InlineMath>:{" "}
              <InlineMath>{"\\frac{2\\pi}{|B|}"}</InlineMath>. Za{" "}
              <InlineMath>{"\\tan"}</InlineMath> i{" "}
              <InlineMath>{"\\cot"}</InlineMath>:{" "}
              <InlineMath>{"\\frac{\\pi}{|B|}"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Fazni pomeraj nije isti znak kao u argumentu
            </h3>
            <p>
              Uvek računaš{" "}
              <InlineMath>{"x_0=-\\frac{C}{B}"}</InlineMath>. Tu studenti
              najlakše izgube tačan smer pomeraja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Nule i asimptote ne pogađaš
            </h3>
            <p>
              Polaziš od osnovnog modela, zatim ga pomeraš i sabijaš. Kod{" "}
              <InlineMath>{"D\\neq 0"}</InlineMath>, nule dobijaš
              rešavanjem odgovarajuće jednačine.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak su osnovne trigonometrijske jednačine, jer se
          upravo na ovim grafikama vidi zašto rešenja dolaze u periodičnim
          nizovima.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
