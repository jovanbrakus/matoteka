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
import ParabolaConicLab from "./ParabolaConicLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnovna slika" },
  { href: "#dodir", label: "Uslov dodira" },
  { href: "#distanca", label: "Minimalna distanca" },
  { href: "#lab", label: "Interaktivna laboratorija" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson54Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 54"
        title={
          <>
            Parabola i{" "}
            <span className={cs.tHeroAccent}>uslov dodira</span>
          </>
        }
        description="Parabola izgleda jednostavno dok je samo crtaš, ali na prijemnom ona postaje ozbiljna tek kada je povežeš sa tangentom, fokusom i zadacima o najmanjem rastojanju. Ova lekcija je napravljena tako da učenik ne pamti tri odvojene formule, nego jednu istu ideju vidi iz više uglova: iz slike, iz jednačine i iz tipičnog ispitnog zadatka."
        heroImageSrc="/api/lessons/54/hero"
        heroImageAlt="Ilustracija parabole i uslova dodira"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako iz jednačine odmah pročitaš geometriju parabole \u2014 teme, osa, fokus i direktrisa iz parametra p.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje parametra p sa koordinatom fokusa \u2014 za y\u00B2=2px fokus je (p/2, 0), ne (p, 0).",
          },
          {
            label: "Prijemni fokus",
            description:
              "Prepoznavanje trenutka kada pravu treba doterati do tangente za zadatke sa minimalnim distancama.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "60 do 85 minuta",
          },
          {
            label: "Predznanje",
            description: "Prava, diskriminanta i osnovne kvadratne jednačine",
          },
          {
            label: "Glavna veština",
            description:
              "Prevođenje slike u račun i obrnuto pomoću uslova dodira",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija parabole sa promenljivim parametrima",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Parabola je mesto gde algebra i geometrijska intuicija moraju da rade zajedno"
        description="Na prijemnom zadatak o paraboli retko ostaje samo na pitanju naći fokus. Mnogo češće parabola ulazi u problem sa tangentom, pravom kroz spoljašnju tačku ili sa minimalnim rastojanjem. Zato ova lekcija nije puko nabrajanje formula, nego trening kako da brzo prepoznaš koju vrstu računa traži konkretan zadatak."
      >
        <div className={s.grid3}>
          <SectionCard title="Za analitičku geometriju">
            <p>
              Parabola je najjednostavniji konusni presek koji nema centar, pa
              učenik ovde prvi put zaista oseća razliku između simetrije oko
              ose i simetrije oko tačke.
            </p>
          </SectionCard>
          <SectionCard title="Za tangente i dodire">
            <p>
              Uslov dodira ovde ima vrlo čist oblik, pa je parabola odličan
              model da razumeš samu ideju tangente kao graničnog položaja
              sečice.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemne zadatke">
            <p>
              Zadaci o najmanjem rastojanju često izgledaju geometrijski, ali
              se rešavaju algebarski: familija paralelnih pravih se pomera dok
              jedna od njih ne postane tangenta.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški kljuc">
          <p>
            Ako razumeš sta parametar <InlineMath>{"p"}</InlineMath> radi
            sliči parabole i ako shvatiš da je &ldquo;dodir&rdquo; isto što i
            jedno dvostruko rešenje, većina formula više ne izgleda kao nesto
            napamet. To je pravi cilj ove lekcije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNA SLIKA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna slika"
        title="Kako da zamišljaš parabolu pre nego što počneš račun"
        description="U ovoj lekciji kao glavni model koristimo parabolu y\u00B2=2px, gde je p>0. To je parabola sa temenom u koordinatnom početku, osom na x-osi i otvorom nadesno. Učeniku je najkorisnije da prvo nauči ovu sliku savršeno, pa tek onda da lakše prepoznaje rotirane ili pomerene varijante."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta parabola geometrijski predstavlja">
            <p>
              Parabola je geometrijsko mesto svih tacaka koje su jednako
              udaljene od jedne fiksne tačke i jedne fiksne prave. Ta fiksna
              tačka je <strong>fokus</strong>, a prava je{" "}
              <strong>direktrisa</strong>. Ova definicija je važna jer daje
              smisao formuli, a ne samo njen spoljašnji oblik.
            </p>
            <MathBlock>
              {"\\text{Za } P(x,y) \\text{ na paraboli važi } PF=d(P,\\text{direktrisa})."}
            </MathBlock>
            <p>
              Za standardni oblik{" "}
              <InlineMath>{"y^2=2px"}</InlineMath> dobijamo: teme{" "}
              <InlineMath>{"V(0,0)"}</InlineMath>, fokus{" "}
              <InlineMath>{"F\\left(\\frac{p}{2},0\\right)"}</InlineMath>,
              direktrisu <InlineMath>{"x=-\\frac{p}{2}"}</InlineMath> i osu
              parabole koja se poklapa sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
          </SectionCard>

          <SectionCard title="Kako da čitaš parametar p">
            <p>
              Parametar <InlineMath>{"p"}</InlineMath> meri rastojanje između
              fokusa i direktrise, odnosno kontrolise &ldquo;otvorenost&rdquo;
              parabole. Za isti <InlineMath>{"y"}</InlineMath>, vece{" "}
              <InlineMath>{"p"}</InlineMath> daje manji{" "}
              <InlineMath>{"x=\\frac{y^2}{2p}"}</InlineMath>, pa se grane
              približavaju osi i parabola deluje uza.
            </p>
            <MathBlock>
              {"y^2=2px \\qquad \\Longleftrightarrow \\qquad x=\\frac{y^2}{2p}"}
            </MathBlock>
            <p>
              Ovo je mesto gde učenici često pogrese intuiciju: veci
              koeficijent uz <InlineMath>{"x"}</InlineMath> ne znaci
              &ldquo;šira&rdquo; parabola kao kod kvadratne funkcije{" "}
              <InlineMath>{"y=ax^2"}</InlineMath>, jer je ovde promenjena
              uloga promenljivih.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kanonska jednačina"
            formula={"y^2=2px,\\qquad p>0"}
            note="Glavni oblik za ovu lekciju: teme je u koordinatnom početku, a parabola je otvorena nadesno."
          />
          <FormulaCard
            title="Fokus i direktrisa"
            formula={"F\\left(\\frac{p}{2},0\\right),\\qquad x=-\\frac{p}{2}"}
            note="Fokus i direktrisa su jednako udaljeni od temena, samo na suprotnim stranama."
          />
          <FormulaCard
            title="Vertikalna varijanta"
            formula="x^2=2py"
            note={
              <>
                Ako zameniš uloge <InlineMath>{"x"}</InlineMath> i{" "}
                <InlineMath>{"y"}</InlineMath>, parabola se
                &ldquo;okrece&rdquo; i otvara nagore. To je ista ideja, samo
                drugi smer ose.
              </>
            }
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto fokus nije (p,0)?"
          answer={
            <p>
              U izrazu <InlineMath>{"y^2=2px"}</InlineMath> broj{" "}
              <InlineMath>{"p"}</InlineMath> nije direktno koordinata fokusa,
              nego dvostruko rastojanje temena do fokusa. Zato je fokus na
              polovini te dužine:{" "}
              <InlineMath>{"\\left(\\frac{p}{2},0\\right)"}</InlineMath>, a
              direktrisa na{" "}
              <InlineMath>{"x=-\\frac{p}{2}"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ USLOV DODIRA ═══════════ */}
      <LessonSection
        id="dodir"
        eyebrow="Uslov dodira"
        title="Kako iz ideje o jednom preseku nastaje formula p=2kl"
        description="Ovo je srce lekcije. Kada prava y=kx+l seče parabolu, sistem obično daje dve presečne tačke. Kada prava samo dodiruje parabolu, te dve tačke se spoje u jednu dvostruku. To je upravo signal da diskriminanta mora biti nula."
      >
        <SectionCard title="Derivacija bez preskakanja">
          <p>Pocni od sistema:</p>
          <MathBlock>
            {"\\begin{cases} y^2=2px,\\\\ y=kx+l. \\end{cases}"}
          </MathBlock>
          <p>
            Uvrsti <InlineMath>{"y=kx+l"}</InlineMath> u jednačinu parabole:
          </p>
          <MathBlock>{"(kx+l)^2=2px"}</MathBlock>
          <MathBlock>{"k^2x^2 + 2(kl-p)x + l^2 = 0"}</MathBlock>
          <p>
            Ako prava dodiruje parabolu, ova kvadratna jednačina po{" "}
            <InlineMath>{"x"}</InlineMath> mora imati jedno dvostruko rešenje,
            pa je:
          </p>
          <MathBlock>
            {"\\Delta = [2(kl-p)]^2 - 4k^2l^2 = 0"}
          </MathBlock>
          <MathBlock>{"4p(p-2kl)=0"}</MathBlock>
          <MathBlock>{"\\boxed{p=2kl}"}</MathBlock>
          <p>
            Dakle, za standardnu parabolu{" "}
            <InlineMath>{"y^2=2px"}</InlineMath> i pravu{" "}
            <InlineMath>{"y=kx+l"}</InlineMath>, uslov dodira je{" "}
            <InlineMath>{"p=2kl"}</InlineMath>. Važno: ova formula važi za
            tangente koje mogu da se zapisu u obliku{" "}
            <InlineMath>{"y=kx+l"}</InlineMath>, dakle ne obuhvata vertikalnu
            tangentu u temenu.
          </p>
        </SectionCard>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Uslov dodira"
            formula={"\\boxed{p=2kl}"}
            note={
              <>
                Ako je <InlineMath>{"p>2kl"}</InlineMath>, prava sece
                parabolu u dve tačke. Ako je{" "}
                <InlineMath>{"p<2kl"}</InlineMath>, nema realnog preseka.
              </>
            }
          />
          <FormulaCard
            title="Tangenta sa zadatim nagibom"
            formula={"l=\\frac{p}{2k}"}
            note="Kada je nagib zadat, odsečak l više nije slobodan: mora baš ovako da se namesti da bi prava postala tangenta."
          />
          <FormulaCard
            title="Tangenta u tački T(x_0,y_0)"
            formula="yy_0 = p(x+x_0)"
            note="Kada znaš tačku dodira, nema potrebe za diskriminantom. Ova formula daje tangentu odmah."
          />
        </div>

        <SectionCard title="Poseban slučaj: tangenta u temenu">
          <p>
            U temenu <InlineMath>{"V(0,0)"}</InlineMath> parabola{" "}
            <InlineMath>{"y^2=2px"}</InlineMath> ima vertikalnu tangentu{" "}
            <InlineMath>{"x=0"}</InlineMath>. Ona ne može da se napiše kao{" "}
            <InlineMath>{"y=kx+l"}</InlineMath>, pa je zato ne smeš gurati na
            silu u uslov <InlineMath>{"p=2kl"}</InlineMath>. Ovo je sitan
            detalj, ali na prijemnom pravi ozbiljne greške.
          </p>
          <div
            style={{
              marginTop: 14,
              padding: "16px 18px",
              borderRadius: 18,
              background: "rgba(255, 176, 168, 0.06)",
              border: "1px solid rgba(255, 176, 168, 0.18)",
              color: "var(--lesson-muted-strong)",
            }}
          >
            Ako zadatak traži tangentu u temenu, odgovor nije neka prava sa
            velikim nagibom, nego baš vertikalna prava{" "}
            <InlineMath>{"x=0"}</InlineMath>.
          </div>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: sta znači kada je p>2kl?"
          answer={
            <p>
              Tada je diskriminanta pozitivna, pa sistem prava-parabola ima dve
              različite realne tačke preseka. Drugim rečima, data prava je{" "}
              <strong>sečica</strong>, a ne tangenta.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MINIMALNA DISTANCA ═══════════ */}
      <LessonSection
        id="distanca"
        eyebrow="Minimalna distanca"
        title="Zašto se zadaci o najmanjem rastojanju svode na paralelnu tangentu"
        description="Kada tražiš najmanje rastojanje između parabole i neke prave, često ne napadas direktno rastojanje od svake tačke parabole do te prave. Mnogo pametnija ideja je da posmatraš familiju svih pravih paralelnih datoj pravoj. Ona prava iz te familije koja je najbliza paraboli mora biti baš ona koja je dodiruje, jer je to granični položaj između još seku i više ne seku."
      >
        <div className={s.grid2}>
          <SectionCard title="Opšti obrazac">
            <p>Neka je data prava</p>
            <MathBlock>{"y=kx+l_0."}</MathBlock>
            <p>
              Sve prave paralelne njoj imaju isti nagib{" "}
              <InlineMath>{"k"}</InlineMath>, a menjaju samo odsecak. Dakle
              posmatraš familiju <InlineMath>{"y=kx+l"}</InlineMath>. Najbliza
              takva prava paraboli je upravo ona za koju važi uslov dodira:
            </p>
            <MathBlock>{"p=2kl."}</MathBlock>
          </SectionCard>

          <SectionCard title="Kako se iz toga dobija samo rastojanje">
            <p>
              Kada nađeš tangentnu pravu iz iste paralelne familije, onda je
              tražena minimalna distanca samo rastojanje između dve paralelne
              prave. Taj završni korak je već poznat iz lekcije o pravoj.
            </p>
            <MathBlock>
              {"d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}"}
            </MathBlock>
            <p>
              Drugim rečima, uslov dodira ti kaže koja je
              &ldquo;granična&rdquo; paralelna prava, a formula za rastojanje
              paralelnih pravih daje poslednji broj.
            </p>
          </SectionCard>
        </div>

        <div
          style={{
            marginTop: 14,
            padding: "16px 18px",
            borderRadius: 18,
            background: "rgba(183, 221, 255, 0.06)",
            border: "1px solid rgba(183, 221, 255, 0.18)",
            color: "var(--lesson-muted-strong)",
          }}
        >
          Zadatak o minimalnoj distanci izgleda geometrijski, ali se rešava
          veoma operativno: zadrži nagib, promeni odsečak, nametni uslov
          dodira, pa izračunaj rastojanje između paralelnih pravih.
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="lab"
        eyebrow="Interaktivna laboratorija"
        title="Pomeri pravu i gledaj kada nastaje tangenta"
        description="U ovoj laboratoriji parabola je y\u00B2=2px, a prava je y=kx+l. Menjaj parametre i traži tacan trenutak kada se dve presečne tačke spoje u jednu. To je vizuelni način da uslov p=2kl dobije smisao."
      >
        <ParabolaConicLab />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Kako da od slike stignes do rešenja bez lutanja"
        description="Slede primeri raspoređeni po tipovima zadataka koji se najčešće javljaju na prijemnom. Ideja je da učenik stekne osećaj koji alat bira u kom trenutku, a ne samo da prati račun."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: procitaj geometriju parabole{" "}
              <InlineMath>{"y^2=8x"}</InlineMath>
            </h3>
            <p>
              Ovaj tip deluje lak, ali služi kao temelj za sve dalje zadatke.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Uporedi <InlineMath>{"y^2=8x"}</InlineMath> sa oblikom{" "}
                    <InlineMath>{"y^2=2px"}</InlineMath>. Dobijas{" "}
                    <InlineMath>{"2p=8"}</InlineMath>, pa je{" "}
                    <InlineMath>{"p=4"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Teme je <InlineMath>{"V(0,0)"}</InlineMath>, fokus je{" "}
                    <InlineMath>
                      {"F\\left(\\frac{p}{2},0\\right)=(2,0)"}
                    </InlineMath>
                    , a direktrisa je <InlineMath>{"x=-2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Pošto je kvadrat na <InlineMath>{"y"}</InlineMath>, osa
                    parabole je <InlineMath>{"x"}</InlineMath>-osa i parabola
                    se otvara nadesno.
                  </>
                }
              />
            </div>
            <MathBlock>
              {"y^2=8x \\Rightarrow p=4,\\quad F(2,0),\\quad x=-2"}
            </MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: tangenta paralelna pravoj{" "}
              <InlineMath>{"y=2x"}</InlineMath>
            </h3>
            <p>
              Nađi tangentu parabole <InlineMath>{"y^2=6x"}</InlineMath>{" "}
              koja je paralelna pravoj <InlineMath>{"y=2x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto tangenta mora biti paralelna zadatoj pravoj, njen
                    oblik je <InlineMath>{"y=2x+l"}</InlineMath>. Dakle{" "}
                    <InlineMath>{"k=2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Iz <InlineMath>{"y^2=6x"}</InlineMath> čitaš{" "}
                    <InlineMath>{"2p=6"}</InlineMath>, pa je{" "}
                    <InlineMath>{"p=3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Nametni uslov dodira{" "}
                    <InlineMath>{"p=2kl"}</InlineMath>:{" "}
                    <InlineMath>{"3=2\\cdot 2 \\cdot l"}</InlineMath>, odakle
                    je <InlineMath>{"l=\\frac{3}{4}"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>{"y=2x+\\frac{3}{4}"}</MathBlock>
            <p>
              Najvažniji refleks: kad je nagib zadat, ne izmisljas novu pravu,
              nego samo tražiš pravi odsecak.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: tangenta u poznatoj tački
            </h3>
            <p>
              Nađi tangentu parabole <InlineMath>{"y^2=8x"}</InlineMath> u
              tački <InlineMath>{"T(2,4)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Prvo proveri da li tačka pripada paraboli:{" "}
                    <InlineMath>{"4^2=16"}</InlineMath> i{" "}
                    <InlineMath>{"8\\cdot 2=16"}</InlineMath>, dakle pripada.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Pošto je <InlineMath>{"y^2=8x"}</InlineMath>, imamo{" "}
                    <InlineMath>{"p=4"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Koristi formulu tangente u tački:{" "}
                    <InlineMath>{"yy_0=p(x+x_0)"}</InlineMath>. Uvrsti{" "}
                    <InlineMath>{"x_0=2"}</InlineMath>,{" "}
                    <InlineMath>{"y_0=4"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>{"4y = 4(x+2)"}</MathBlock>
            <MathBlock>{"y=x+2"}</MathBlock>
            <p>
              Kada znaš tačku dodira, ovo je kraći i čistiji put od
              diskriminante.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: tangente iz spoljašnje tačke
            </h3>
            <p>
              Kroz tačku <InlineMath>{"A(5,6)"}</InlineMath> povuči tangente
              na parabolu <InlineMath>{"y^2=4x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto prava prolazi kroz{" "}
                    <InlineMath>{"A(5,6)"}</InlineMath>, napiši je kao{" "}
                    <InlineMath>{"y=k(x-5)+6"}</InlineMath>, odnosno{" "}
                    <InlineMath>{"y=kx+(6-5k)"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Za parabolu <InlineMath>{"y^2=4x"}</InlineMath> vazi{" "}
                    <InlineMath>{"p=2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Nametni uslov dodira{" "}
                    <InlineMath>{"p=2kl"}</InlineMath>:{" "}
                    <InlineMath>{"2=2k(6-5k)"}</InlineMath>, pa je{" "}
                    <InlineMath>{"1=6k-5k^2"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>{"5k^2-6k+1=0"}</MathBlock>
            <MathBlock>{"k_1=1,\\qquad k_2=\\frac{1}{5}"}</MathBlock>
            <MathBlock>
              {"y=x+1,\\qquad y=\\frac{x}{5}+5"}
            </MathBlock>
            <p>
              Ovakav tip zadatka je cest jer lepo povezuje geometriju
              &ldquo;spoljašnje tačke&rdquo; sa algebarskom jednačinom po{" "}
              <InlineMath>{"k"}</InlineMath>.
            </p>
          </article>
        </div>

        {/* Primer 5 (full width) */}
        <SectionCard title="Primer 5: minimalna distanca između prave i parabole">
          <p>
            Nađi najmanje rastojanje između prave{" "}
            <InlineMath>{"x-y+5=0"}</InlineMath> i parabole{" "}
            <InlineMath>{"y^2=4x"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Pravu prepiši u eksplicitni oblik:{" "}
                  <InlineMath>{"y=x+5"}</InlineMath>. Sve paralelne prave
                  imaju oblik <InlineMath>{"y=x+l"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={2}
              title={
                <>
                  Za parabolu <InlineMath>{"y^2=4x"}</InlineMath> vazi{" "}
                  <InlineMath>{"p=2"}</InlineMath>, a za paralelnu familiju
                  nagib je <InlineMath>{"k=1"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={3}
              title={
                <>
                  Najbliza paralelna prava mora biti tangenta, pa iz uslova
                  dodira dobijaš <InlineMath>{"2=2\\cdot 1 \\cdot l"}</InlineMath>
                  , tj. <InlineMath>{"l=1"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={4}
              title={
                <>
                  Tangentna prava je <InlineMath>{"y=x+1"}</InlineMath>,
                  odnosno <InlineMath>{"x-y+1=0"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={5}
              title="Trazena minimalna distanca sada je rastojanje između paralelnih pravih x-y+5=0 i x-y+1=0."
            />
          </div>
          <MathBlock>
            {
              "d=\\frac{|5-1|}{\\sqrt{1^2+(-1)^2}}=\\frac{4}{\\sqrt{2}}=2\\sqrt{2}"
            }
          </MathBlock>
          <p>
            Ovo je tipičan prijemni zadatak koji izgleda
            &ldquo;geometrijski&rdquo;, ali u sustini proverava da li znaš da
            održiš nagib, pronađeš paralelnu tangentu i tek onda upotrebiš
            formulu za rastojanje pravih.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje učenici prave baš zato što im tema deluje previše jednostavno"
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Fokus <InlineMath>{"(p,0)"}</InlineMath> umesto{" "}
              <InlineMath>{"\\left(\\frac{p}{2},0\\right)"}</InlineMath>
            </h3>
            <p>
              Najčešća greška u prvoj polovini lekcije. U obliku{" "}
              <InlineMath>{"y^2=2px"}</InlineMath> broj{" "}
              <InlineMath>{"p"}</InlineMath> nije koordinata fokusa, nego
              dvostruka udaljenost od temena do fokusa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje parabole sa grafikom kvadratne funkcije
            </h3>
            <p>
              Ovde je kvadrat na <InlineMath>{"y"}</InlineMath>, ne na{" "}
              <InlineMath>{"x"}</InlineMath>. Zato se intuicija o
              &ldquo;sirini&rdquo; i &ldquo;usmerenom otvoru&rdquo; razlikuje
              od lekcije o kvadratnoj funkciji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Primena <InlineMath>{"p=2kl"}</InlineMath> na vertikalnu
              tangentu
            </h3>
            <p>
              Formula važi za prave zapisive kao{" "}
              <InlineMath>{"y=kx+l"}</InlineMath>. Tangenta u temenu je{" "}
              <InlineMath>{"x=0"}</InlineMath> i mora se posmatrati posebno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              U zadacima o rastojanju menja se i nagib
            </h3>
            <p>
              Ne sme. Ako tražiš najblizu paralelnu pravu datoj pravoj, nagib
              ostaje isti, menja se samo odsecak.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se parabola realno pojavljuje na ispitu"
        description="Na prijemnom parabola retko dolazi sama. Obično dolazi u paru sa pravom, parametrom ili uslovom minimuma. Zato ti treba kratka rutina koja radi pod pritiskom vremena."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: čitanje elemenata iz jednačine">
            <p>
              Traze se teme, fokus, direktrisa i osa. Deluje najlakse, ali se
              ovde najčešće greši u polovini parametra.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: tangenta paralelna zadatoj pravoj">
            <p>
              Nagib je već poznat. Tvoj posao je da pravu zapišeš kao{" "}
              <InlineMath>{"y=kx+l"}</InlineMath> i iz uslova dodira nađeš
              samo odsecak.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: tangente iz spoljašnje tačke">
            <p>
              Prava prolazi kroz zadatu tačku, pa odatle nastaje izraz za{" "}
              <InlineMath>{"l"}</InlineMath> preko{" "}
              <InlineMath>{"k"}</InlineMath>. Uslov dodira onda daje jednačinu
              po nagibu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: minimalna distanca">
            <p>
              Zadrži nagib, pomeraj pravu paralelno dok ne postane tangenta, pa
              tek onda računaj rastojanje između dve paralelne prave.
            </p>
          </SectionCard>
        </div>

        <SectionCard title="Ispitna rutina u 5 koraka">
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Prvo procitaj oblik parabole. Izjednaći je sa{" "}
                  <InlineMath>{"y^2=2px"}</InlineMath> ili sa odgovarajućom
                  rotiranom varijantom.
                </>
              }
            />
            <WalkStep
              number={2}
              title="Odluči koji tip zadatka gledaš. Da li traži čitanje elemenata, tangentu u tački, familiju paralelnih pravih ili tangente kroz tačku?"
            />
            <WalkStep
              number={3}
              title="Ako je prava opšta, brzo je prepisi. Vrlo često prvi korak nije matematika parabole, nego pravilno sredjivanje jednačine prave."
            />
            <WalkStep
              number={4}
              title={
                <>
                  Izaberi alat. Tačka dodira poznata: koristi{" "}
                  <InlineMath>{"yy_0=p(x+x_0)"}</InlineMath>. Familija pravih:
                  koristi <InlineMath>{"p=2kl"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={5}
              title={
                <>
                  Na kraju proveri posebne slučajeve. Posebno obrati pažnju na
                  temenu tangentu <InlineMath>{"x=0"}</InlineMath> i na to da
                  li postoje jedno ili dva realna rešenja.
                </>
              }
            />
          </div>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li možeš samostalno da vodiš ceo postupak"
        description="Reši zadatke najpre bez pomoci. Tek kada završiš, otvori rešenja i proveri ne samo broj, nego i način razmisljanja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za parabolu <InlineMath>{"y^2=10x"}</InlineMath> odredi teme,
                fokus, direktrisu i osu.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"2p=10 \\Rightarrow p=5"}
                </MathBlock>
                <MathBlock>
                  {
                    "V(0,0),\\quad F\\left(\\frac{5}{2},0\\right),\\quad x=-\\frac{5}{2}"
                  }
                </MathBlock>
                <p>
                  Osa parabole je <InlineMath>{"x"}</InlineMath>-osa, a
                  parabola je otvorena nadesno.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Nađi tangentu parabole <InlineMath>{"y^2=12x"}</InlineMath>{" "}
                koja je paralelna pravoj <InlineMath>{"y=3x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"2p=12 \\Rightarrow p=6,\\qquad y=3x+l"}
                </MathBlock>
                <MathBlock>
                  {"6=2\\cdot 3\\cdot l \\Rightarrow l=1"}
                </MathBlock>
                <MathBlock>{"y=3x+1"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Napiši tangentu parabole <InlineMath>{"y^2=8x"}</InlineMath> u
                tački <InlineMath>{"T(8,8)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"p=4,\\qquad yy_0=p(x+x_0)"}
                </MathBlock>
                <MathBlock>{"8y = 4(x+8)"}</MathBlock>
                <MathBlock>
                  {"2y=x+8 \\Rightarrow y=\\frac{x}{2}+4"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Kroz tačku <InlineMath>{"A(5,6)"}</InlineMath> povuči tangente
                na parabolu <InlineMath>{"y^2=4x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prava kroz tačku <InlineMath>{"A(5,6)"}</InlineMath> ima
                  oblik <InlineMath>{"y=kx+(6-5k)"}</InlineMath>. Pošto je{" "}
                  <InlineMath>{"p=2"}</InlineMath>, dobijaš:
                </p>
                <MathBlock>{"2=2k(6-5k)"}</MathBlock>
                <MathBlock>{"5k^2-6k+1=0"}</MathBlock>
                <MathBlock>
                  {"k_1=1,\\qquad k_2=\\frac{1}{5}"}
                </MathBlock>
                <MathBlock>
                  {"y=x+1,\\qquad y=\\frac{x}{5}+5"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Odredi najmanje rastojanje između prave{" "}
                <InlineMath>{"x-y+5=0"}</InlineMath> i parabole{" "}
                <InlineMath>{"y^2=4x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Posmatraj paralelnu familiju{" "}
                  <InlineMath>{"y=x+l"}</InlineMath>. Za tangentu vazi{" "}
                  <InlineMath>{"2=2\\cdot 1 \\cdot l"}</InlineMath>, pa je{" "}
                  <InlineMath>{"l=1"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\text{Tangenta: } y=x+1 \\Longleftrightarrow x-y+1=0"
                  }
                </MathBlock>
                <MathBlock>
                  {"d=\\frac{|5-1|}{\\sqrt{1^2+(-1)^2}}=2\\sqrt{2}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Odredi da li je prava <InlineMath>{"y=-x-3"}</InlineMath>{" "}
                sečica, tangenta ili spoljašja za parabolu{" "}
                <InlineMath>{"y^2=6x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"p=3,\\qquad k=-1,\\qquad l=-3"}
                </MathBlock>
                <MathBlock>
                  {"2kl = 2\\cdot (-1)\\cdot (-3)=6"}
                </MathBlock>
                <p>
                  Pošto je <InlineMath>{"2kl=6>3=p"}</InlineMath>, vazi{" "}
                  <InlineMath>{"p<2kl"}</InlineMath>, pa prava nema realnog
                  preseka sa parabolom. Dakle, to je{" "}
                  <strong>spoljašja prava</strong>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Tangenta nije nova tema, nego granični položaj iste one prave koju već pomeras"
        description="Ako iz ove lekcije zapamtiš samo jednu misao, neka to bude sledeće: parabola i prava ne dobijaju tangentu niotkuda. Tangenta je samo ona prava iz neke familije koja je tačno na granici između dve presečne tačke i nijedne tačke. Zato je diskriminanta jednaka nuli, zato nastaje uslov dodira i zato se isti princip koristi i u zadacima o minimalnim distancama."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Uslov dodira } p=2kl \\text{ je samo specijalan slučaj uslova } \\Delta = 0."
            }
          </MathBlock>
          <p>
            Ko ovu vezu shvati, ne treba da pamti zasebne formule za sečicu,
            tangentu i spoljašnju pravu. Sve dolazi iz jedne iste diskriminante.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Standardni oblik</h3>
            <p>
              Za ovu lekciju osnovni model je{" "}
              <InlineMath>{"y^2=2px"}</InlineMath>. Iz njega čitaš da je teme
              u koordinatnom početku, a osa na{" "}
              <InlineMath>{"x"}</InlineMath>-osi.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Fokus i direktrisa</h3>
            <p>
              Za isti oblik vazi{" "}
              <InlineMath>
                {"F\\left(\\frac{p}{2},0\\right)"}
              </InlineMath>{" "}
              i <InlineMath>{"x=-\\frac{p}{2}"}</InlineMath>. Ovo je mesto
              najčešće ispitne greške.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Uslov dodira</h3>
            <p>
              Za pravu <InlineMath>{"y=kx+l"}</InlineMath> tangenta nastaje
              kada je <InlineMath>{"p=2kl"}</InlineMath>. To dolazi iz uslova
              da diskriminanta bude nula.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Tangenta u tački</h3>
            <p>
              Kada znaš tačku dodira{" "}
              <InlineMath>{"T(x_0,y_0)"}</InlineMath>, najbrzi put je formula{" "}
              <InlineMath>{"yy_0=p(x+x_0)"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Minimum distance</h3>
            <p>
              Najbliza prava iz paralelne familije je tangenta. Zadrži nagib,
              promeni odsecak, pa nametni uslov dodira.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Poseban slučaj</h3>
            <p>
              Vertikalna tangenta u temenu je{" "}
              <InlineMath>{"x=0"}</InlineMath>. Nju ne smeš pokusavati da
              dobiješ preko oblika <InlineMath>{"y=kx+l"}</InlineMath>.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je prelazak na teme iz matematičke analize,
          ali pre toga vredi još jednom uporediti sve četiri konike i njihove
          uslove dodira, da bi slika bila potpuno stabilna.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
