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
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#osnove", label: "Osnovna slika" },
  { href: "#dodir", label: "Uslov dodira" },
  { href: "#distanca", label: "Minimalna distanca" },
  { href: "#lab", label: "Interaktivna laboratorija" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson54Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje \u00B7 Lekcija 54"
        title={
          <>
            Parabola i{" "}
            <span className={cs.tHeroAccent}>uslov dodira</span>
          </>
        }
        description="Parabola izgleda jednostavno dok je samo crtas, ali na prijemnom ona postaje ozbiljna tek kada je povezes sa tangentom, fokusom i zadacima o najmanjem rastojanju. Ova lekcija je napravljena tako da ucenik ne pamti tri odvojene formule, nego jednu istu ideju vidi iz vise uglova: iz slike, iz jednacine i iz tipicnog ispitnog zadatka."
        heroImageSrc="/api/lessons/54/hero"
        heroImageAlt="Ilustracija parabole i uslova dodira"
        cards={[
          {
            label: "Naucices",
            description:
              "Kako iz jednacine odmah procitas geometriju parabole \u2014 teme, osa, fokus i direktrisa iz parametra p.",
          },
          {
            label: "Najveca zamka",
            description:
              "Mesanje parametra p sa koordinatom fokusa \u2014 za y\u00B2=2px fokus je (p/2, 0), ne (p, 0).",
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
            description: "Prava, diskriminanta i osnovne kvadratne jednacine",
          },
          {
            label: "Glavna vestina",
            description:
              "Prevodjenje slike u racun i obrnuto pomocu uslova dodira",
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
        eyebrow="Zasto je ova lekcija vazna"
        title="Parabola je mesto gde algebra i geometrijska intuicija moraju da rade zajedno"
        description="Na prijemnom zadatak o paraboli retko ostaje samo na pitanju naci fokus. Mnogo cesce parabola ulazi u problem sa tangentom, pravom kroz spoljasnju tacku ili sa minimalnim rastojanjem. Zato ova lekcija nije puko nabrajanje formula, nego trening kako da brzo prepoznas koju vrstu racuna trazi konkretan zadatak."
      >
        <div className={s.grid3}>
          <SectionCard title="Za analiticku geometriju">
            <p>
              Parabola je najjednostavniji konusni presek koji nema centar, pa
              ucenik ovde prvi put zaista oseca razliku izmedju simetrije oko
              ose i simetrije oko tacke.
            </p>
          </SectionCard>
          <SectionCard title="Za tangente i dodire">
            <p>
              Uslov dodira ovde ima vrlo cist oblik, pa je parabola odlican
              model da razumes samu ideju tangente kao granicnog polozaja
              secice.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemne zadatke">
            <p>
              Zadaci o najmanjem rastojanju cesto izgledaju geometrijski, ali
              se resavaju algebarski: familija paralelnih pravih se pomera dok
              jedna od njih ne postane tangenta.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoski kljuc">
          <p>
            Ako razumes sta parametar <InlineMath>{"p"}</InlineMath> radi
            slici parabole i ako shvatis da je &ldquo;dodir&rdquo; isto sto i
            jedno dvostruko resenje, vecina formula vise ne izgleda kao nesto
            napamet. To je pravi cilj ove lekcije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNA SLIKA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna slika"
        title="Kako da zamisis parabolu pre nego sto pocnes racun"
        description="U ovoj lekciji kao glavni model koristimo parabolu y\u00B2=2px, gde je p>0. To je parabola sa temenom u koordinatnom pocetku, osom na x-osi i otvorom nadesno. Uceniku je najkorisnije da prvo nauci ovu sliku savrseno, pa tek onda da lakse prepoznaje rotirane ili pomerene varijante."
      >
        <div className={s.grid2}>
          <SectionCard title="Sta parabola geometrijski predstavlja">
            <p>
              Parabola je geometrijsko mesto svih tacaka koje su jednako
              udaljene od jedne fiksne tacke i jedne fiksne prave. Ta fiksna
              tacka je <strong>fokus</strong>, a prava je{" "}
              <strong>direktrisa</strong>. Ova definicija je vazna jer daje
              smisao formuli, a ne samo njen spoljasnji oblik.
            </p>
            <MathBlock>
              {"\\text{Za } P(x,y) \\text{ na paraboli vazi } PF=d(P,\\text{direktrisa})."}
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

          <SectionCard title="Kako da citas parametar p">
            <p>
              Parametar <InlineMath>{"p"}</InlineMath> meri rastojanje izmedju
              fokusa i direktrise, odnosno kontrolise &ldquo;otvorenost&rdquo;
              parabole. Za isti <InlineMath>{"y"}</InlineMath>, vece{" "}
              <InlineMath>{"p"}</InlineMath> daje manji{" "}
              <InlineMath>{"x=\\frac{y^2}{2p}"}</InlineMath>, pa se grane
              priblizavaju osi i parabola deluje uza.
            </p>
            <MathBlock>
              {"y^2=2px \\qquad \\Longleftrightarrow \\qquad x=\\frac{y^2}{2p}"}
            </MathBlock>
            <p>
              Ovo je mesto gde ucenici cesto pogrese intuiciju: veci
              koeficijent uz <InlineMath>{"x"}</InlineMath> ne znaci
              &ldquo;sira&rdquo; parabola kao kod kvadratne funkcije{" "}
              <InlineMath>{"y=ax^2"}</InlineMath>, jer je ovde promenjena
              uloga promenljivih.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kanonska jednacina"
            formula={"y^2=2px,\\qquad p>0"}
            note="Glavni oblik za ovu lekciju: teme je u koordinatnom pocetku, a parabola je otvorena nadesno."
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
                Ako zamenis uloge <InlineMath>{"x"}</InlineMath> i{" "}
                <InlineMath>{"y"}</InlineMath>, parabola se
                &ldquo;okrece&rdquo; i otvara nagore. To je ista ideja, samo
                drugi smer ose.
              </>
            }
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zasto fokus nije (p,0)?"
          answer={
            <p>
              U izrazu <InlineMath>{"y^2=2px"}</InlineMath> broj{" "}
              <InlineMath>{"p"}</InlineMath> nije direktno koordinata fokusa,
              nego dvostruko rastojanje temena do fokusa. Zato je fokus na
              polovini te duzine:{" "}
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
        description="Ovo je srce lekcije. Kada prava y=kx+l sece parabolu, sistem obicno daje dve presecne tacke. Kada prava samo dodiruje parabolu, te dve tacke se spoje u jednu dvostruku. To je upravo signal da diskriminanta mora biti nula."
      >
        <SectionCard title="Derivacija bez preskakanja">
          <p>Pocni od sistema:</p>
          <MathBlock>
            {"\\begin{cases} y^2=2px,\\\\ y=kx+l. \\end{cases}"}
          </MathBlock>
          <p>
            Uvrsti <InlineMath>{"y=kx+l"}</InlineMath> u jednacinu parabole:
          </p>
          <MathBlock>{"(kx+l)^2=2px"}</MathBlock>
          <MathBlock>{"k^2x^2 + 2(kl-p)x + l^2 = 0"}</MathBlock>
          <p>
            Ako prava dodiruje parabolu, ova kvadratna jednacina po{" "}
            <InlineMath>{"x"}</InlineMath> mora imati jedno dvostruko resenje,
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
            <InlineMath>{"p=2kl"}</InlineMath>. Vazno: ova formula vazi za
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
                parabolu u dve tacke. Ako je{" "}
                <InlineMath>{"p<2kl"}</InlineMath>, nema realnog preseka.
              </>
            }
          />
          <FormulaCard
            title="Tangenta sa zadatim nagibom"
            formula={"l=\\frac{p}{2k}"}
            note="Kada je nagib zadat, odsecak l vise nije slobodan: mora bas ovako da se namesti da bi prava postala tangenta."
          />
          <FormulaCard
            title="Tangenta u tacki T(x_0,y_0)"
            formula="yy_0 = p(x+x_0)"
            note="Kada znas tacku dodira, nema potrebe za diskriminantom. Ova formula daje tangentu odmah."
          />
        </div>

        <SectionCard title="Poseban slucaj: tangenta u temenu">
          <p>
            U temenu <InlineMath>{"V(0,0)"}</InlineMath> parabola{" "}
            <InlineMath>{"y^2=2px"}</InlineMath> ima vertikalnu tangentu{" "}
            <InlineMath>{"x=0"}</InlineMath>. Ona ne moze da se napise kao{" "}
            <InlineMath>{"y=kx+l"}</InlineMath>, pa je zato ne smes gurati na
            silu u uslov <InlineMath>{"p=2kl"}</InlineMath>. Ovo je sitan
            detalj, ali na prijemnom pravi ozbiljne greske.
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
            Ako zadatak trazi tangentu u temenu, odgovor nije neka prava sa
            velikim nagibom, nego bas vertikalna prava{" "}
            <InlineMath>{"x=0"}</InlineMath>.
          </div>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: sta znaci kada je p>2kl?"
          answer={
            <p>
              Tada je diskriminanta pozitivna, pa sistem prava-parabola ima dve
              razlicite realne tacke preseka. Drugim recima, data prava je{" "}
              <strong>secica</strong>, a ne tangenta.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MINIMALNA DISTANCA ═══════════ */}
      <LessonSection
        id="distanca"
        eyebrow="Minimalna distanca"
        title="Zasto se zadaci o najmanjem rastojanju svode na paralelnu tangentu"
        description="Kada trazis najmanje rastojanje izmedju parabole i neke prave, cesto ne napadas direktno rastojanje od svake tacke parabole do te prave. Mnogo pametnija ideja je da posmatras familiju svih pravih paralelnih datoj pravoj. Ona prava iz te familije koja je najbliza paraboli mora biti bas ona koja je dodiruje, jer je to granicni polozaj izmedju jos seku i vise ne seku."
      >
        <div className={s.grid2}>
          <SectionCard title="Opsti obrazac">
            <p>Neka je data prava</p>
            <MathBlock>{"y=kx+l_0."}</MathBlock>
            <p>
              Sve prave paralelne njoj imaju isti nagib{" "}
              <InlineMath>{"k"}</InlineMath>, a menjaju samo odsecak. Dakle
              posmatras familiju <InlineMath>{"y=kx+l"}</InlineMath>. Najbliza
              takva prava paraboli je upravo ona za koju vazi uslov dodira:
            </p>
            <MathBlock>{"p=2kl."}</MathBlock>
          </SectionCard>

          <SectionCard title="Kako se iz toga dobija samo rastojanje">
            <p>
              Kada nadjes tangentnu pravu iz iste paralelne familije, onda je
              trazena minimalna distanca samo rastojanje izmedju dve paralelne
              prave. Taj zavrsni korak je vec poznat iz lekcije o pravoj.
            </p>
            <MathBlock>
              {"d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}"}
            </MathBlock>
            <p>
              Drugim recima, uslov dodira ti kaze koja je
              &ldquo;granicna&rdquo; paralelna prava, a formula za rastojanje
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
          Zadatak o minimalnoj distanci izgleda geometrijski, ali se resava
          veoma operativno: zadrzi nagib, promeni odsecak, nametni uslov
          dodira, pa izracunaj rastojanje izmedju paralelnih pravih.
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="lab"
        eyebrow="Interaktivna laboratorija"
        title="Pomeri pravu i gledaj kada nastaje tangenta"
        description="U ovoj laboratoriji parabola je y\u00B2=2px, a prava je y=kx+l. Menjaj parametre i trazi tacan trenutak kada se dve presecne tacke spoje u jednu. To je vizuelni nacin da uslov p=2kl dobije smisao."
      >
        <ParabolaConicLab />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Kako da od slike stignes do resenja bez lutanja"
        description="Slede primeri rasporedjeni po tipovima zadataka koji se najcesce javljaju na prijemnom. Ideja je da ucenik stekne osecaj koji alat bira u kom trenutku, a ne samo da prati racun."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: procitaj geometriju parabole{" "}
              <InlineMath>{"y^2=8x"}</InlineMath>
            </h3>
            <p>
              Ovaj tip deluje lak, ali sluzi kao temelj za sve dalje zadatke.
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
                    Posto je kvadrat na <InlineMath>{"y"}</InlineMath>, osa
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
              Nadji tangentu parabole <InlineMath>{"y^2=6x"}</InlineMath>{" "}
              koja je paralelna pravoj <InlineMath>{"y=2x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Posto tangenta mora biti paralelna zadatoj pravoj, njen
                    oblik je <InlineMath>{"y=2x+l"}</InlineMath>. Dakle{" "}
                    <InlineMath>{"k=2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Iz <InlineMath>{"y^2=6x"}</InlineMath> citas{" "}
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
              Najvazniji refleks: kad je nagib zadat, ne izmisljas novu pravu,
              nego samo trazis pravi odsecak.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: tangenta u poznatoj tacki
            </h3>
            <p>
              Nadji tangentu parabole <InlineMath>{"y^2=8x"}</InlineMath> u
              tacki <InlineMath>{"T(2,4)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Prvo proveri da li tacka pripada paraboli:{" "}
                    <InlineMath>{"4^2=16"}</InlineMath> i{" "}
                    <InlineMath>{"8\\cdot 2=16"}</InlineMath>, dakle pripada.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Posto je <InlineMath>{"y^2=8x"}</InlineMath>, imamo{" "}
                    <InlineMath>{"p=4"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Koristi formulu tangente u tacki:{" "}
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
              Kada znas tacku dodira, ovo je kraci i cistiji put od
              diskriminante.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: tangente iz spoljasnje tacke
            </h3>
            <p>
              Kroz tacku <InlineMath>{"A(5,6)"}</InlineMath> povuci tangente
              na parabolu <InlineMath>{"y^2=4x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Posto prava prolazi kroz{" "}
                    <InlineMath>{"A(5,6)"}</InlineMath>, napisi je kao{" "}
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
              &ldquo;spoljasnje tacke&rdquo; sa algebarskom jednainom po{" "}
              <InlineMath>{"k"}</InlineMath>.
            </p>
          </article>
        </div>

        {/* Primer 5 (full width) */}
        <SectionCard title="Primer 5: minimalna distanca izmedju prave i parabole">
          <p>
            Nadji najmanje rastojanje izmedju prave{" "}
            <InlineMath>{"x-y+5=0"}</InlineMath> i parabole{" "}
            <InlineMath>{"y^2=4x"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Pravu prepisi u eksplicitni oblik:{" "}
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
                  dodira dobijas <InlineMath>{"2=2\\cdot 1 \\cdot l"}</InlineMath>
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
              title="Trazena minimalna distanca sada je rastojanje izmedju paralelnih pravih x-y+5=0 i x-y+1=0."
            />
          </div>
          <MathBlock>
            {
              "d=\\frac{|5-1|}{\\sqrt{1^2+(-1)^2}}=\\frac{4}{\\sqrt{2}}=2\\sqrt{2}"
            }
          </MathBlock>
          <p>
            Ovo je tipican prijemni zadatak koji izgleda
            &ldquo;geometrijski&rdquo;, ali u sustini proverava da li znas da
            odrzis nagib, pronadjes paralelnu tangentu i tek onda upotrebis
            formulu za rastojanje pravih.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Greske koje ucenici prave bas zato sto im tema deluje previse jednostavno"
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Fokus <InlineMath>{"(p,0)"}</InlineMath> umesto{" "}
              <InlineMath>{"\\left(\\frac{p}{2},0\\right)"}</InlineMath>
            </h3>
            <p>
              Najcesca greska u prvoj polovini lekcije. U obliku{" "}
              <InlineMath>{"y^2=2px"}</InlineMath> broj{" "}
              <InlineMath>{"p"}</InlineMath> nije koordinata fokusa, nego
              dvostruka udaljenost od temena do fokusa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mesanje parabole sa grafikom kvadratne funkcije
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
              Formula vazi za prave zapisive kao{" "}
              <InlineMath>{"y=kx+l"}</InlineMath>. Tangenta u temenu je{" "}
              <InlineMath>{"x=0"}</InlineMath> i mora se posmatrati posebno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              U zadacima o rastojanju menja se i nagib
            </h3>
            <p>
              Ne sme. Ako trazis najblizu paralelnu pravu datoj pravoj, nagib
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
        description="Na prijemnom parabola retko dolazi sama. Obicno dolazi u paru sa pravom, parametrom ili uslovom minimuma. Zato ti treba kratka rutina koja radi pod pritiskom vremena."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: citanje elemenata iz jednacine">
            <p>
              Traze se teme, fokus, direktrisa i osa. Deluje najlakse, ali se
              ovde najcesce gresi u polovini parametra.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: tangenta paralelna zadatoj pravoj">
            <p>
              Nagib je vec poznat. Tvoj posao je da pravu zapises kao{" "}
              <InlineMath>{"y=kx+l"}</InlineMath> i iz uslova dodira nadjes
              samo odsecak.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: tangente iz spoljasnje tacke">
            <p>
              Prava prolazi kroz zadatu tacku, pa odatle nastaje izraz za{" "}
              <InlineMath>{"l"}</InlineMath> preko{" "}
              <InlineMath>{"k"}</InlineMath>. Uslov dodira onda daje jednacinu
              po nagibu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: minimalna distanca">
            <p>
              Zadrzi nagib, pomeraj pravu paralelno dok ne postane tangenta, pa
              tek onda racunaj rastojanje izmedju dve paralelne prave.
            </p>
          </SectionCard>
        </div>

        <SectionCard title="Ispitna rutina u 5 koraka">
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Prvo procitaj oblik parabole. Izjednaci je sa{" "}
                  <InlineMath>{"y^2=2px"}</InlineMath> ili sa odgovarajucom
                  rotiranom varijantom.
                </>
              }
            />
            <WalkStep
              number={2}
              title="Odluci koji tip zadatka gledas. Da li trazi citanje elemenata, tangentu u tacki, familiju paralelnih pravih ili tangente kroz tacku?"
            />
            <WalkStep
              number={3}
              title="Ako je prava opsta, brzo je prepisi. Vrlo cesto prvi korak nije matematika parabole, nego pravilno sredjivanje jednacine prave."
            />
            <WalkStep
              number={4}
              title={
                <>
                  Izaberi alat. Tacka dodira poznata: koristi{" "}
                  <InlineMath>{"yy_0=p(x+x_0)"}</InlineMath>. Familija pravih:
                  koristi <InlineMath>{"p=2kl"}</InlineMath>.
                </>
              }
            />
            <WalkStep
              number={5}
              title={
                <>
                  Na kraju proveri posebne slucajeve. Posebno obrati paznju na
                  temenu tangentu <InlineMath>{"x=0"}</InlineMath> i na to da
                  li postoje jedno ili dva realna resenja.
                </>
              }
            />
          </div>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li mozes samostalno da vodis ceo postupak"
        description="Resi zadatke najpre bez pomoci. Tek kada zavrsis, otvori resenja i proveri ne samo broj, nego i nacin razmisljanja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
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
            title="Vezba 2"
            problem={
              <p>
                Nadji tangentu parabole <InlineMath>{"y^2=12x"}</InlineMath>{" "}
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
            title="Vezba 3"
            problem={
              <p>
                Napisi tangentu parabole <InlineMath>{"y^2=8x"}</InlineMath> u
                tacki <InlineMath>{"T(8,8)"}</InlineMath>.
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
            title="Vezba 4"
            problem={
              <p>
                Kroz tacku <InlineMath>{"A(5,6)"}</InlineMath> povuci tangente
                na parabolu <InlineMath>{"y^2=4x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prava kroz tacku <InlineMath>{"A(5,6)"}</InlineMath> ima
                  oblik <InlineMath>{"y=kx+(6-5k)"}</InlineMath>. Posto je{" "}
                  <InlineMath>{"p=2"}</InlineMath>, dobijas:
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
            title="Vezba 5"
            problem={
              <p>
                Odredi najmanje rastojanje izmedju prave{" "}
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
            title="Vezba 6"
            problem={
              <p>
                Odredi da li je prava <InlineMath>{"y=-x-3"}</InlineMath>{" "}
                secica, tangenta ili spoljasnja za parabolu{" "}
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
                  Posto je <InlineMath>{"2kl=6>3=p"}</InlineMath>, vazi{" "}
                  <InlineMath>{"p<2kl"}</InlineMath>, pa prava nema realnog
                  preseka sa parabolom. Dakle, to je{" "}
                  <strong>spoljasnja prava</strong>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="Tangenta nije nova tema, nego granicni polozaj iste one prave koju vec pomeras"
        description="Ako iz ove lekcije zapamtis samo jednu misao, neka to bude sledece: parabola i prava ne dobijaju tangentu niotkuda. Tangenta je samo ona prava iz neke familije koja je tacno na granici izmedju dve presecne tacke i nijedne tacke. Zato je diskriminanta jednaka nuli, zato nastaje uslov dodira i zato se isti princip koristi i u zadacima o minimalnim distancama."
      >
        <InsightCard title="Najvazniji princip">
          <MathBlock>
            {
              "\\text{Uslov dodira } p=2kl \\text{ je samo specijalan slucaj uslova } \\Delta = 0."
            }
          </MathBlock>
          <p>
            Ko ovu vezu shvati, ne treba da pamti zasebne formule za secicu,
            tangentu i spoljasnju pravu. Sve dolazi iz jedne iste diskriminante.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da poneses iz ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Standardni oblik</h3>
            <p>
              Za ovu lekciju osnovni model je{" "}
              <InlineMath>{"y^2=2px"}</InlineMath>. Iz njega citas da je teme
              u koordinatnom pocetku, a osa na{" "}
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
              najcesce ispitne greske.
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
            <h3 className={cs.tCardTitle}>4. Tangenta u tacki</h3>
            <p>
              Kada znas tacku dodira{" "}
              <InlineMath>{"T(x_0,y_0)"}</InlineMath>, najbrzi put je formula{" "}
              <InlineMath>{"yy_0=p(x+x_0)"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Minimum distance</h3>
            <p>
              Najbliza prava iz paralelne familije je tangenta. Zadrzi nagib,
              promeni odsecak, pa nametni uslov dodira.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Poseban slucaj</h3>
            <p>
              Vertikalna tangenta u temenu je{" "}
              <InlineMath>{"x=0"}</InlineMath>. Nju ne smes pokusavati da
              dobijes preko oblika <InlineMath>{"y=kx+l"}</InlineMath>.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci logican korak je prelazak na teme iz matematicke analize,
          ali pre toga vredi jos jednom uporediti sve cetiri konike i njihove
          uslove dodira, da bi slika bila potpuno stabilna.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
