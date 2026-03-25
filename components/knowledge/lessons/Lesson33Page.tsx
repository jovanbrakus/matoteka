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
import UnitCircleLab from "./UnitCircleLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#radijani", label: "Radijani" },
  { href: "#kruznica", label: "Kružnica" },
  { href: "#funkcije", label: "Funkcije" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Greške" },
  { href: "#prijemni", label: "Prijemni" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson33Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 33"
        title={
          <>
            Mere ugla{" "}
            <span className={cs.tHeroAccent}>
              (radijani) i trigonometrijska kružnica
            </span>
          </>
        }
        description={'Ovo je lekcija koja otvara celu trigonometriju. Kada razume\u0161 \u0161ta je radijan i kako ugao odre\u0111uje ta\u010dku na jedini\u010dnoj kru\u017enici, sinus i kosinus prestaju da budu \u201Eformule iz trougla\u201C i postaju koordinate ta\u010dke za svaki realan ugao.'}
        heroImageSrc="/api/lessons/33/hero"
        heroImageAlt="Apstraktna matematička tabla sa jediničnom kružnicom, radijanima i standardnim uglovima"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da prevodiš stepene u radijane, da čitaš tačku na trigonometrijskoj kružnici i da iz nje dobiješ sin α, cos α, tan α i cot α.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje stepeni i radijana, kao i zaboravljanje da isti položaj na kružnici mogu da daju uglovi koji se razlikuju za 2πk.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Standardni uglovi, brzo prevođenje u radijane i čitanje koordinata bez kalkulatora.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "60-80 minuta uz rad na standardnim uglovima i kružnici.",
          },
          {
            label: "Predznanje",
            description:
              "Osnovno znanje o uglovima, koordinatnom sistemu i Pitagorinoj teoremi.",
          },
          {
            label: "Glavna veština",
            description:
              "Pretvaranje ugla u položaj tačke i čitanje trigonometrijskih vrednosti sa kružnice.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija sa jediničnom kružnicom, projekcijama i radijanskom skalom.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Odavde počinje prava trigonometrija"
        description="Do ove tačke ugao si uglavnom vezivao za trougao. Trigonometrijska kružnica pravi veliki skok: ugao više nije ograničen na oštre uglove u trouglu, nego postaje bilo koji realan broj, pozitivan ili negativan. To je osnova za sve naredne lekcije."
      >
        <div className={s.grid3}>
          <SectionCard title="Za sledeće lekcije">
            <p>
              Bez jedinične kružnice nema brzog određivanja znakova po
              kvadrantima, svođenja na prvi kvadrant ni rešavanja
              trigonometrijskih jednačina.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni">
            <p>
              Standardni uglovi u radijanima i tačne vrednosti{" "}
              <InlineMath>{"\\sin"}</InlineMath> i{" "}
              <InlineMath>{"\\cos"}</InlineMath> stalno se pojavljuju u
              testovima, često kao prvi filter zadatka.
            </p>
          </SectionCard>
          <SectionCard title="Za razumevanje">
            <p>
              Kada vidiš <InlineMath>{"\\sin \\alpha"}</InlineMath> kao ordinatu,
              a <InlineMath>{"\\cos \\alpha"}</InlineMath> kao apscisu tačke na
              kružnici, formule postaju mnogo manje misteriozne.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{ugao} \\longrightarrow \\text{tačka na kružnici} \\longrightarrow (\\cos \\alpha,\\,\\sin \\alpha)"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: zašto je trigonometrijska kružnica bolja od trougla za opštu definiciju funkcija?"
          answer={
            <p>
              Zato što na kružnici ugao može biti bilo koji realan broj, dok se u
              pravouglom trouglu prirodno javljaju samo uglovi između{" "}
              <InlineMath>{"0^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"90^\\circ"}</InlineMath>. Kružnica širi definiciju na
              sve uglove.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ RADIJANI ═══════════ */}
      <LessonSection
        id="radijani"
        eyebrow="Radijanska mera"
        title="Radijan nije novi ugao, nego nova jedinica"
        description="Isto kao što dužinu možeš meriti u metrima ili centimetrima, ugao možeš meriti u stepenima ili radijanima. Na prijemnom moraš tečno da prelaziš iz jednog zapisa u drugi."
      >
        <div className={s.grid2}>
          <SectionCard title="Definicija preko luka">
            <p>
              Za kružnicu poluprečnika <InlineMath>{"r"}</InlineMath> i luk
              dužine <InlineMath>{"s"}</InlineMath>, radijanska mera ugla je
            </p>
            <MathBlock>{"\\alpha = \\frac{s}{r}"}</MathBlock>
            <p>
              Ako je <InlineMath>{"r=1"}</InlineMath>, dobijamo najvažniji
              specijalan slučaj:
            </p>
            <MathBlock>{"s = \\alpha"}</MathBlock>
            <p>
              Na jediničnoj kružnici broj radijana jednak je dužini
              odgovarajućeg luka.
            </p>
          </SectionCard>

          <SectionCard title="Veza sa stepenima">
            <MathBlock>
              {"180^\\circ = \\pi \\text{ rad}, \\qquad 360^\\circ = 2\\pi \\text{ rad}"}
            </MathBlock>
            <MathBlock>
              {
                "1^\\circ = \\frac{\\pi}{180} \\text{ rad}, \\qquad 1 \\text{ rad} = \\frac{180^\\circ}{\\pi}"
              }
            </MathBlock>
            <ul>
              <li>
                Za stepene u radijane: množiš sa{" "}
                <InlineMath>{"\\frac{\\pi}{180}"}</InlineMath>.
              </li>
              <li>
                Za radijane u stepene: množiš sa{" "}
                <InlineMath>{"\\frac{180^\\circ}{\\pi}"}</InlineMath>.
              </li>
              <li>
                Na prijemnom su standardni uglovi gotovo uvek dati kao prost
                višekratnik od <InlineMath>{"\\pi"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Najvažniji par"
            formula={"30^\\circ = \\frac{\\pi}{6}"}
          />
          <FormulaCard
            title="Najvažniji par"
            formula={"45^\\circ = \\frac{\\pi}{4}"}
          />
          <FormulaCard
            title="Najvažniji par"
            formula={"60^\\circ = \\frac{\\pi}{3}"}
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je π rad jednako 180°?"
          answer={
            <p>
              Zato što polukrug zahvata polovinu cele kružnice. Cela kružnica je{" "}
              <InlineMath>{"360^\\circ"}</InlineMath>, a na jediničnoj kružnici
              odgovarajući ceo luk ima dužinu{" "}
              <InlineMath>{"2\\pi"}</InlineMath>. Polovina od toga je{" "}
              <InlineMath>{"\\pi"}</InlineMath>, pa dobijamo{" "}
              <InlineMath>{"180^\\circ = \\pi"}</InlineMath> rad.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KRUŽNICA ═══════════ */}
      <LessonSection
        id="kruznica"
        eyebrow="Trigonometrijska kružnica"
        title="Jedinična kružnica je geometrijska mapa svih uglova"
        description={
          "Trigonometrijska kružnica je kružnica poluprečnika 1 sa centrom u koordinatnom početku. Ugao se meri od pozitivnog smera x-ose: suprotno smeru kazaljke na satu je pozitivan smer, a u smeru kazaljke negativan."
        }
      >
        <div className={s.grid2}>
          <SectionCard title="Geometrijska definicija">
            <MathBlock>{"x^2+y^2=1"}</MathBlock>
            <p>
              Svaki ugao <InlineMath>{"\\alpha"}</InlineMath> određuje jednu
              tačku <InlineMath>{"P"}</InlineMath> na kružnici. Ako se za isti
              položaj na kružnici napravi još jedna puna rotacija, dobija se isti
              krajnji položaj.
            </p>
            <MathBlock>
              {"\\alpha,\\ \\alpha + 2\\pi,\\ \\alpha - 2\\pi,\\ \\alpha + 2k\\pi"}
            </MathBlock>
            <p>To su koterminalni uglovi.</p>
          </SectionCard>

          <SectionCard title="Kvadranti i orijentacija">
            <ul>
              <li>
                Prvi kvadrant: <InlineMath>{"x>0,\\ y>0"}</InlineMath>.
              </li>
              <li>
                Drugi kvadrant: <InlineMath>{"x<0,\\ y>0"}</InlineMath>.
              </li>
              <li>
                Treći kvadrant: <InlineMath>{"x<0,\\ y<0"}</InlineMath>.
              </li>
              <li>
                Četvrti kvadrant: <InlineMath>{"x>0,\\ y<0"}</InlineMath>.
              </li>
            </ul>
            <p>
              Ovi znaci će već od sledeće lekcije odlučivati predznak svih
              trigonometrijskih funkcija.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto uglovi 45° i 405° odgovaraju istoj tački?"
          answer={
            <p>
              Zato što je{" "}
              <InlineMath>{"405^\\circ = 45^\\circ + 360^\\circ"}</InlineMath>.
              Dodavanje jedne pune rotacije vraća krajnji krak ugla na isti
              položaj.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ FUNKCIJE ═══════════ */}
      <LessonSection
        id="funkcije"
        eyebrow="Koordinatna definicija"
        title="Sinus i kosinus su koordinate tačke na kružnici"
        description="Ovo je najvažniji prelaz u celoj lekciji. Kada ugao α odredi tačku P na trigonometrijskoj kružnici, njene koordinate direktno postaju vrednosti funkcija."
      >
        <div className={s.grid3}>
          <SectionCard title="Tačka na kružnici">
            <MathBlock>{"P(\\cos \\alpha,\\,\\sin \\alpha)"}</MathBlock>
            <p>
              Apscisa tačke je <InlineMath>{"\\cos \\alpha"}</InlineMath>, a
              ordinata je <InlineMath>{"\\sin \\alpha"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Tangens">
            <MathBlock>
              {"\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}"}
            </MathBlock>
            <p>
              ako je <InlineMath>{"\\cos \\alpha \\neq 0"}</InlineMath>. Kada je{" "}
              <InlineMath>{"\\cos \\alpha = 0"}</InlineMath>, tangens nije
              definisan.
            </p>
          </SectionCard>

          <SectionCard title="Kotangens">
            <MathBlock>
              {"\\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}"}
            </MathBlock>
            <p>
              ako je <InlineMath>{"\\sin \\alpha \\neq 0"}</InlineMath>. Kada je{" "}
              <InlineMath>{"\\sin \\alpha = 0"}</InlineMath>, kotangens nije
              definisan.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Zašto sinus i kosinus važe za sve realne uglove">
            <p>
              U trouglu se prirodno krećeš samo između{" "}
              <InlineMath>{"0^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"90^\\circ"}</InlineMath>. Na kružnici ugao može biti{" "}
              <InlineMath>{"150^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"-60^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{11\\pi}{6}"}</InlineMath> ili{" "}
              <InlineMath>{"5\\pi"}</InlineMath>, a tačka na kružnici i dalje
              postoji. Zato funkcije postaju definisane za sve realne brojeve.
            </p>
          </SectionCard>

          <SectionCard title="Prijemni refleks">
            <ul>
              <li>Prvo prepoznaj ugao u stepenima ili radijanima.</li>
              <li>Prevedi ga na poznat položaj na kružnici.</li>
              <li>Odredi kvadrant i znak koordinata.</li>
              <li>
                Tek onda čitaj <InlineMath>{"\\sin"}</InlineMath>,{" "}
                <InlineMath>{"\\cos"}</InlineMath>,{" "}
                <InlineMath>{"\\tan"}</InlineMath> i{" "}
                <InlineMath>{"\\cot"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je cos α x-koordinata, a ne y-koordinata?"
          answer={
            <p>
              Zato što ugao počinje od pozitivnog smera{" "}
              <InlineMath>{"x"}</InlineMath>-ose. Horizontalna projekcija tačke
              na kružnici prirodno odgovara kosinusu, dok vertikalna projekcija
              odgovara sinusu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: ugao, tačka, radijani i funkcije u jednom prikazu"
        description="Pomeraj ugao i gledaj kako se menja tačka na jediničnoj kružnici, njen zapis u stepenima i radijanima, kvadrant i trigonometrijske vrednosti. Ovo je najbrži način da se povežu svi delovi lekcije."
      >
        <UnitCircleLab />

        <MicroCheck
          question="Mikro-provera: šta se menja kada sa 45° pređeš na 405°?"
          answer={
            <p>
              Menja se samo „broj okreta" pre dolaska na tačku. Krajnja tačka na
              kružnici, pa time i <InlineMath>{"\\sin"}</InlineMath>,{" "}
              <InlineMath>{"\\cos"}</InlineMath>,{" "}
              <InlineMath>{"\\tan"}</InlineMath> i{" "}
              <InlineMath>{"\\cot"}</InlineMath>, ostaju isti.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak od radijana do vrednosti funkcija"
        description="Primeri su namerno raspoređeni tako da pokriju najčešće tipove pitanja sa prijemnog: konverzije, položaj na kružnici, koordinate i funkcije."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Pretvaranje stepeni u radijane
            </h3>
            <p>
              Pretvori <InlineMath>{"225^\\circ"}</InlineMath> u radijane.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Koristimo formulu{" "}
                    <InlineMath>
                      {
                        "\\alpha_{\\text{rad}}=\\alpha_{\\text{step}} \\cdot \\frac{\\pi}{180}"
                      }
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Zato je{" "}
                    <InlineMath>
                      {"225^\\circ = 225\\cdot \\frac{\\pi}{180}"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Skraćujemo sa <InlineMath>{"45"}</InlineMath>:{" "}
                    <InlineMath>{"225/180 = 5/4"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>{"225^\\circ = \\frac{5\\pi}{4}"}</MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Pretvaranje radijana u stepene
            </h3>
            <p>
              Pretvori <InlineMath>{"\\frac{7\\pi}{6}"}</InlineMath> u stepene.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Koristimo formulu{" "}
                    <InlineMath>
                      {
                        "\\alpha_{\\text{step}}=\\alpha_{\\text{rad}}\\cdot \\frac{180^\\circ}{\\pi}"
                      }
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Dobijamo{" "}
                    <InlineMath>
                      {
                        "\\frac{7\\pi}{6}\\cdot \\frac{180^\\circ}{\\pi}"
                      }
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Pi se skrati, a{" "}
                    <InlineMath>{"180/6=30"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>{"\\frac{7\\pi}{6} = 210^\\circ"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Luk i radijanska mera
            </h3>
            <p>
              Na kružnici poluprečnika <InlineMath>{"r=3"}</InlineMath> data je
              radijanska mera ugla{" "}
              <InlineMath>{"\\alpha=\\frac{2\\pi}{3}"}</InlineMath>. Nađi
              dužinu luka.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Znamo da važi <InlineMath>{"s=r\\alpha"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Ubacujemo poznate vrednosti:{" "}
                    <InlineMath>
                      {"s=3\\cdot \\frac{2\\pi}{3}"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep number={3} title="Trojke se skrate." />
            </div>
            <MathBlock>{"s = 2\\pi"}</MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Tačka na kružnici i vrednosti funkcija
            </h3>
            <p>
              Odredi <InlineMath>{"\\cos 150^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\sin 150^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\tan 150^\\circ"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Ugao <InlineMath>{"150^\\circ"}</InlineMath> je u drugom
                    kvadrantu.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Referentni ugao je <InlineMath>{"30^\\circ"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Na kružnici za <InlineMath>{"30^\\circ"}</InlineMath>{" "}
                    apsolutne vrednosti koordinata su{" "}
                    <InlineMath>
                      {"\\left(\\frac{\\sqrt{3}}{2},\\frac{1}{2}\\right)"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={4}
                title="U drugom kvadrantu apscisa je negativna, a ordinata pozitivna."
              />
            </div>
            <MathBlock>
              {
                "\\cos 150^\\circ = -\\frac{\\sqrt{3}}{2},\\qquad \\sin 150^\\circ = \\frac{1}{2},\\qquad \\tan 150^\\circ = -\\frac{\\sqrt{3}}{3}"
              }
            </MathBlock>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Negativan ugao i koterminalni položaj
            </h3>
            <p>
              Odredi{" "}
              <InlineMath>
                {"\\sin\\!\\left(-\\frac{\\pi}{3}\\right)"}
              </InlineMath>{" "}
              i{" "}
              <InlineMath>
                {"\\cos\\!\\left(-\\frac{\\pi}{3}\\right)"}
              </InlineMath>
              .
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Ugao <InlineMath>{"-\\frac{\\pi}{3}"}</InlineMath> znači
                    rotaciju u smeru kazaljke na satu za{" "}
                    <InlineMath>{"60^\\circ"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    To je koterminalno sa uglom{" "}
                    <InlineMath>
                      {"300^\\circ = \\frac{5\\pi}{3}"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    U četvrtom kvadrantu koordinate za referentni ugao{" "}
                    <InlineMath>{"60^\\circ"}</InlineMath> su{" "}
                    <InlineMath>
                      {
                        "\\left(\\frac{1}{2},\\,-\\frac{\\sqrt{3}}{2}\\right)"
                      }
                    </InlineMath>
                    .
                  </>
                }
              />
            </div>
            <MathBlock>
              {
                "\\cos\\!\\left(-\\frac{\\pi}{3}\\right)=\\frac{1}{2},\\qquad \\sin\\!\\left(-\\frac{\\pi}{3}\\right)=-\\frac{\\sqrt{3}}{2}"
              }
            </MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ OBRASCI I KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Obrasci i ključne formule"
        title="Ovo treba da ti postane automatsko"
        description="U ovoj lekciji nema mnogo formula, ali nekoliko njih moraš da koristiš bez zadrške. To su osnovni alati za sve dalje zadatke."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Pretvaranje u radijane"
            formula={"\\alpha_{\\text{rad}} = \\alpha_{\\text{step}}\\cdot \\frac{\\pi}{180}"}
          />
          <FormulaCard
            title="Pretvaranje u stepene"
            formula={"\\alpha_{\\text{step}} = \\alpha_{\\text{rad}}\\cdot \\frac{180^\\circ}{\\pi}"}
          />
          <FormulaCard title="Radijan i luk" formula={"s = r\\alpha"} />
          <FormulaCard title="Jedinična kružnica" formula="x^2+y^2=1" />
          <FormulaCard
            title="Koordinatna definicija"
            formula={"P(\\cos \\alpha,\\,\\sin \\alpha)"}
          />
          <FormulaCard
            title="Koterminalni uglovi"
            formula={"\\alpha + 2k\\pi,\\qquad k\\in\\mathbb{Z}"}
          />
        </div>

        {/* Prijemni memorijski jezgro */}
        <div style={{ marginTop: 24 }}>
          <InsightCard title="Pet tačaka prvog kvadranta koje moraš da znaš">
            <div className={s.grid3} style={{ marginTop: 12 }}>
              <FormulaCard title="0" formula={"(1,\\,0)"} />
              <FormulaCard
                title="\\frac{\\pi}{6}"
                formula={"\\left(\\frac{\\sqrt{3}}{2},\\,\\frac{1}{2}\\right)"}
              />
              <FormulaCard
                title="\\frac{\\pi}{4}"
                formula={"\\left(\\frac{\\sqrt{2}}{2},\\,\\frac{\\sqrt{2}}{2}\\right)"}
              />
              <FormulaCard
                title="\\frac{\\pi}{3}"
                formula={"\\left(\\frac{1}{2},\\,\\frac{\\sqrt{3}}{2}\\right)"}
              />
              <FormulaCard
                title="\\frac{\\pi}{2}"
                formula={"(0,\\,1)"}
              />
              <SectionCard title="Praktična poruka">
                <p>
                  Sve ostale standardne tačke dobijaš odavde promenom znakova i
                  eventualnom zamenom koordinata, što će sledeća lekcija
                  sistematizovati.
                </p>
              </SectionCard>
            </div>
          </InsightCard>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title={'Ovde početak trigonometrije najčešće „puca"'}
        description="Većina grešaka ne dolazi iz teških formula, nego iz mešanja osnovnih pojmova. Zato ih vredi izdvojiti odmah."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje stepeni i radijana</h3>
            <p>
              Najčešća greška je da se u istom računu tretira{" "}
              <InlineMath>{"30"}</InlineMath> kao da je i{" "}
              <InlineMath>{"30^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna konverzija</h3>
            <p>
              Neki učenici množe stepene sa{" "}
              <InlineMath>{"\\frac{180}{\\pi}"}</InlineMath> umesto sa{" "}
              <InlineMath>{"\\frac{\\pi}{180}"}</InlineMath>. Vredi svaki put
              napisati smer pretvaranja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zamena sinusa i kosinusa</h3>
            <p>
              Na kružnici je <InlineMath>{"\\cos \\alpha"}</InlineMath>{" "}
              x-koordinata, a <InlineMath>{"\\sin \\alpha"}</InlineMath>{" "}
              y-koordinata. Obrnuto je pogrešno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljeni kvadrant</h3>
            <p>
              Učenik zna apsolutne vrednosti za{" "}
              <InlineMath>{"30^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"45^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"60^\\circ"}</InlineMath>, ali pogreši znak u drugom,
              trećem ili četvrtom kvadrantu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ignorisanje koterminalnosti</h3>
            <p>
              Uglovi <InlineMath>{"45^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"405^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"-315^\\circ"}</InlineMath> vode na istu tačku. Ako
              to ne vidiš, izgledaće kao tri različita zadatka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna formula za luk</h3>
            <p>
              Formula <InlineMath>{"s=r\\alpha"}</InlineMath> važi kada je{" "}
              <InlineMath>{"\\alpha"}</InlineMath> u radijanima. Ako je ugao u
              stepenima, prvo ga moraš prevesti.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova lekcija stvarno pojavljuje na prijemnom"
        description={'Zadaci retko ostaju samo na \u201Epretvori u radijane\u201C. Naj\u010de\u0161\u0107e se kombinuju merenje ugla, polo\u017eaj na kru\u017enici i vrednost trigonometrijske funkcije.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Najčešći tipovi zadataka">
            <ul>
              <li>
                Pretvaranje standardnih uglova iz stepeni u radijane i obrnuto.
              </li>
              <li>
                Prepoznavanje kvadranta i tačke na kružnici za zadati ugao.
              </li>
              <li>
                Čitanje <InlineMath>{"\\sin \\alpha"}</InlineMath> i{" "}
                <InlineMath>{"\\cos \\alpha"}</InlineMath> sa kružnice bez
                kalkulatora.
              </li>
              <li>
                Korišćenje koterminalnih uglova da se neprijatan ugao svede na
                poznat položaj.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Prijemni algoritam od 20 sekundi">
            <ul>
              <li>Prevedi ugao u zgodan zapis ako treba.</li>
              <li>
                Nađi glavni ugao između <InlineMath>{"0"}</InlineMath> i{" "}
                <InlineMath>{"2\\pi"}</InlineMath>, odnosno između{" "}
                <InlineMath>{"0^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"360^\\circ"}</InlineMath>.
              </li>
              <li>Odredi kvadrant.</li>
              <li>
                Uzmi apsolutne vrednosti iz standardnih uglova i dodaj
                odgovarajuće znakove.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Probaj samostalno pre nego što otvoriš rešenje"
        description="Vežbe su raspoređene tako da zajedno pokriju i konverzije i položaj tačke i vrednosti funkcija."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Pretvori <InlineMath>{"300^\\circ"}</InlineMath> u radijane.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "300^\\circ = 300\\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{3}"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Pretvori <InlineMath>{"\\frac{11\\pi}{6}"}</InlineMath> u
                stepene.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\frac{11\\pi}{6}\\cdot \\frac{180^\\circ}{\\pi}=11\\cdot 30^\\circ=330^\\circ"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Nađi dužinu luka ako je <InlineMath>{"r=4"}</InlineMath> i{" "}
                <InlineMath>{"\\alpha=\\frac{\\pi}{3}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Važi <InlineMath>{"s=r\\alpha"}</InlineMath>, pa je:
                </p>
                <MathBlock>
                  {"s=4\\cdot \\frac{\\pi}{3}=\\frac{4\\pi}{3}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi tačku na kružnici za ugao{" "}
                <InlineMath>{"120^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Referentni ugao je <InlineMath>{"60^\\circ"}</InlineMath>, a
                drugi kvadrant daje znakove{" "}
                <InlineMath>{"(-,\\,+)"}</InlineMath>. Zato je tačka{" "}
                <InlineMath>
                  {
                    "\\left(-\\frac{1}{2},\\,\\frac{\\sqrt{3}}{2}\\right)"
                  }
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Odredi <InlineMath>{"\\sin 330^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"\\cos 330^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Ugao je u četvrtom kvadrantu sa referentnim uglom{" "}
                <InlineMath>{"30^\\circ"}</InlineMath>. Zato je{" "}
                <InlineMath>
                  {"\\cos 330^\\circ=\\frac{\\sqrt{3}}{2}"}
                </InlineMath>
                , a{" "}
                <InlineMath>{"\\sin 330^\\circ=-\\frac{1}{2}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Odredi <InlineMath>{"\\tan 225^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"\\cot 225^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Ugao <InlineMath>{"225^\\circ"}</InlineMath> je u trećem
                kvadrantu sa referentnim uglom{" "}
                <InlineMath>{"45^\\circ"}</InlineMath>. Koordinate su{" "}
                <InlineMath>
                  {
                    "\\left(-\\frac{\\sqrt{2}}{2},\\,-\\frac{\\sqrt{2}}{2}\\right)"
                  }
                </InlineMath>
                , pa je <InlineMath>{"\\tan 225^\\circ=1"}</InlineMath> i{" "}
                <InlineMath>{"\\cot 225^\\circ=1"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Nađi glavni ugao koterminalan sa{" "}
                <InlineMath>{"-\\frac{7\\pi}{4}"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Dodamo{" "}
                <InlineMath>{"2\\pi=\\frac{8\\pi}{4}"}</InlineMath>:{" "}
                <InlineMath>
                  {
                    "-\\frac{7\\pi}{4}+\\frac{8\\pi}{4}=\\frac{\\pi}{4}"
                  }
                </InlineMath>
                . Glavni ugao je{" "}
                <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Napiši sve uglove koterminalne sa{" "}
                <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Svi takvi uglovi imaju oblik{" "}
                <InlineMath>
                  {"\\frac{\\pi}{6}+2k\\pi,\\ k\\in\\mathbb{Z}"}
                </InlineMath>
                .
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažnija misaona poruka lekcije"
      >
        <InsightCard title="Ugao je položaj tačke">
          <MathBlock>
            {
              "\\boxed{\\alpha \\ \\mapsto\\ P(\\cos \\alpha,\\,\\sin \\alpha)}"
            }
          </MathBlock>
          <p>
            Ako iz ove lekcije zapamtiš baš jednu ideju, neka to bude ova: ugao
            nije samo broj, nego položaj tačke na jediničnoj kružnici. Iz tog
            položaja se čita cela osnovna trigonometrija.
          </p>
        </InsightCard>
        <p className={cs.footerNote}>
          Sledeći logičan korak je svođenje na prvi kvadrant i sistematsko
          određivanje znakova i kofunkcija.
        </p>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Rezime"
        title="Šta moraš da poneseš dalje"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Radijani su mera ugla</h3>
            <p>
              Na jediničnoj kružnici broj radijana jednak je dužini
              odgovarajućeg luka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Prevod je obavezan alat</h3>
            <p>
              Moraš sigurno da prelaziš između stepeni i radijana, naročito kod
              standardnih uglova.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Tačka nosi funkcije</h3>
            <p>
              Na kružnici je{" "}
              <InlineMath>{"P(\\cos \\alpha,\\,\\sin \\alpha)"}</InlineMath>, pa
              odatle čitaš sinus i kosinus, a zatim i tangens i kotangens.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Koterminalni uglovi su isti položaj
            </h3>
            <p>
              Uglovi koji se razlikuju za{" "}
              <InlineMath>{"2\\pi k"}</InlineMath> ili{" "}
              <InlineMath>{"360^\\circ k"}</InlineMath> vode na istu tačku i
              iste osnovne vrednosti funkcija.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 33 postavlja temelj za celu trigonometriju: od radijana do
          kružnice, od kružnice do koordinata, od koordinata do funkcija.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
