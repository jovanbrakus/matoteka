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
  { href: "#oblici", label: "Oblici jednačine" },
  { href: "#nagib", label: "Nagib i položaj" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson50Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 50"
        title={
          <>
            Prava{" "}
            <span className={cs.tHeroAccent}>
              oblici jednačine, ugao i rastojanje
            </span>
          </>
        }
        description="Jedna prava na prijemnom retko dolazi sama. Nekad treba da iz njenog zapisa pročitaš nagib, nekad da prevedeš oblik, nekad da ispitaš odnos dve prave, a nekad da izračunaš rastojanje tačke od nje. Ključ je da ne učiš formule napamet, već da razumeš šta svaki zapis odmah otkriva."
        heroImageSrc="/api/lessons/50/hero"
        heroImageAlt="Ilustracija za lekciju o pravoj, oblicima jednačine, uglu između pravih i udaljenosti tačke od prave"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kada je najbolji eksplicitni, kada implicitni, a kada segmentni oblik prave.",
          },
          {
            label: "Najveća zamka",
            description:
              "Formula za rastojanje traži implicitni oblik, a eksplicitni oblik ne opisuje vertikalnu pravu.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Paralelnost, normalnost, ugao između pravih i brza kontrola da li rezultat ima smisla.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "55 do 70 minuta sa primerima i vežbama.",
          },
          {
            label: "Predznanje",
            description:
              "Kartezijev sistem, tačke, rastojanje i rad sa koordinatama.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevedi oblik u oblik i odmah pročitaj geometrijski smisao.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija za ugao između pravih i rastojanje tačke od prave.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Prava je osnovni jezik analitičke geometrije"
        description="Ako umeš da barataš pravom, kasnije ćeš mnogo lakše raditi kružnicu, parabolu, elipsu, hiperbolu i zadatke sa dodirom krivih. Na prijemnom se ova tema često ne pojavljuje kao izolovana definicija, već kao deo šireg zadatka, pa upravo zato moraš da je razumeš mirno i sigurno."
      >
        <div className={s.grid3}>
          <SectionCard title="1. Prevod između algebre i slike">
            <p>
              Prava je prvi ozbiljan primer kako jedna formula opisuje
              geometrijski objekat. Kada menjaš koeficijente, menja se i položaj
              prave u ravni.
            </p>
          </SectionCard>
          <SectionCard title="2. Kasnije se javlja svuda">
            <p>
              Normala, tangentni uslovi, preseci sa osama i položaj krivih često
              se oslanjaju baš na znanje iz ove lekcije.
            </p>
          </SectionCard>
          <SectionCard title="3. Štedi vreme na prijemnom">
            <p>
              Kada odmah prepoznaš pogodan oblik, izbegavaš duge račune i mnogo
              ređe grešiš sa znakom ili pogrešnom formulom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto se formula rastojanja ne pamti odvojeno od implicitnog oblika?"
          answer={
            <>
              <p>
                Zato što izraz{" "}
                <InlineMath>
                  {
                    "d\\bigl(P(x_0,y_0),\\, Ax + By + C = 0\\bigr) = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"
                  }
                </InlineMath>{" "}
                direktno koristi koeficijente{" "}
                <InlineMath>{"A"}</InlineMath>,{" "}
                <InlineMath>{"B"}</InlineMath> i{" "}
                <InlineMath>{"C"}</InlineMath>. Ako prava nije u implicitnom
                obliku, najpre je prevedeš, pa tek onda računaš rastojanje.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ OBLICI JEDNAČINE ═══════════ */}
      <LessonSection
        id="oblici"
        eyebrow="Glavni nastavni deo"
        title="Tri najvažnija oblika jednačine prave"
        description='Ista prava može da se zapiše na više načina. To nije puka formalnost. Svaki zapis je koristan za drugačije pitanje. Učenik koji uspešno rešava prijemni ne pita samo "kako izgleda formula", već i "šta se iz nje najbrže vidi".'
      >
        <div className={s.grid3}>
          <SectionCard title="Eksplicitni oblik">
            <MathBlock>{"y = kx + n"}</MathBlock>
            <p>
              Ovaj oblik je najkorisniji kada želiš da odmah vidiš{" "}
              <strong>smerni koeficijent</strong> i presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom. Ovde je{" "}
              <InlineMath>{"k"}</InlineMath> smerni koeficijent, a{" "}
              <InlineMath>{"n"}</InlineMath> odsečak na{" "}
              <InlineMath>{"y"}</InlineMath>-osi. Ako je{" "}
              <InlineMath>{"k > 0"}</InlineMath>, prava raste. Ako je{" "}
              <InlineMath>{"k < 0"}</InlineMath>, prava opada.
            </p>
            <p>
              <strong>Mini primer:</strong>{" "}
              <InlineMath>{"y = 2x - 3"}</InlineMath> seče{" "}
              <InlineMath>{"y"}</InlineMath>-osu u tački{" "}
              <InlineMath>{"(0,-3)"}</InlineMath>, a nagib joj je{" "}
              <InlineMath>{"2"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Implicitni oblik">
            <MathBlock>{"Ax + By + C = 0, \\qquad (A,B) \\neq (0,0)"}</MathBlock>
            <p>
              Ovo je <strong>najopštiji</strong> oblik. Radi i za vertikalne
              prave, i za formulu udaljenosti tačke od prave. Ako je{" "}
              <InlineMath>{"B \\neq 0"}</InlineMath>, možeš ga prevesti u
              eksplicitni oblik:
            </p>
            <MathBlock>{"y = -\\frac{A}{B}x - \\frac{C}{B}"}</MathBlock>
            <p>
              <strong>Mini primer:</strong>{" "}
              <InlineMath>{"2x - 3y + 6 = 0"}</InlineMath> daje{" "}
              <InlineMath>{"y = \\frac{2}{3}x + 2"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Segmentni oblik">
            <MathBlock>{"\\frac{x}{a} + \\frac{y}{b} = 1"}</MathBlock>
            <p>
              Koristan je kada želiš da brzo vidiš gde prava seče koordinatne
              ose. Prava seče <InlineMath>{"x"}</InlineMath>-osu u tački{" "}
              <InlineMath>{"(a,0)"}</InlineMath>, a{" "}
              <InlineMath>{"y"}</InlineMath>-osu u tački{" "}
              <InlineMath>{"(0,b)"}</InlineMath>. Zato ovaj oblik ima smisla
              kada su oba preseka konačna i različita od nule.
            </p>
            <p>
              <strong>Mini primer:</strong>{" "}
              <InlineMath>{"\\frac{x}{4} + \\frac{y}{2} = 1"}</InlineMath> seče
              ose u <InlineMath>{"(4,0)"}</InlineMath> i{" "}
              <InlineMath>{"(0,2)"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako brzo prelaziš iz oblika u oblik">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Eksplicitni u implicitni">
                <p>
                  Iz <InlineMath>{"y = 3x - 2"}</InlineMath> prebaci sve na
                  jednu stranu: <InlineMath>{"3x - y - 2 = 0"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Implicitni u eksplicitni">
                <p>
                  Iz <InlineMath>{"2x + 5y - 10 = 0"}</InlineMath> izdvoji{" "}
                  <InlineMath>{"y"}</InlineMath>:{" "}
                  <InlineMath>{"5y = -2x + 10"}</InlineMath>, pa je{" "}
                  <InlineMath>{"y = -\\frac{2}{5}x + 2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Segmentni u implicitni">
                <p>
                  Iz <InlineMath>{"\\frac{x}{4} + \\frac{y}{2} = 1"}</InlineMath>{" "}
                  pomnoži sa <InlineMath>{"4"}</InlineMath>:{" "}
                  <InlineMath>{"x + 2y = 4"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x + 2y - 4 = 0"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Specijalni slučajevi koje moraš prepoznati">
            <p>
              <strong>Vertikalna prava:</strong> Jednačina{" "}
              <InlineMath>{"x = 4"}</InlineMath> jeste prava, ali{" "}
              <strong>nije</strong> eksplicitnog oblika{" "}
              <InlineMath>{"y = kx + n"}</InlineMath>. U implicitnom obliku je{" "}
              <InlineMath>{"x - 4 = 0"}</InlineMath>.
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>Segmentni oblik nije univerzalan.</strong> Na primer, prava{" "}
              <InlineMath>{"y = 2"}</InlineMath> ne seče{" "}
              <InlineMath>{"x"}</InlineMath>-osu, pa ne možeš da joj dodeliš
              oba konačna odsečka <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath>. Zato segmentni oblik ovde nije
              prirodan izbor.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: u koji oblik prvo prevodiš ako zadatak traži rastojanje?"
          answer={
            <>
              <p>
                U <strong>implicitni oblik</strong>. Na primer, ako je data
                prava{" "}
                <InlineMath>{"y = -2x + 5"}</InlineMath>, prvo pišeš{" "}
                <InlineMath>{"2x + y - 5 = 0"}</InlineMath>, jer tek tada možeš
                direktno da primeniš formulu za rastojanje tačke od prave.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ NAGIB I POLOŽAJ ═══════════ */}
      <LessonSection
        id="nagib"
        eyebrow="Nagib i položaj pravih"
        title="Smerni koeficijent, ugao, paralelnost i normalnost"
        description="Kada je prava zapisana kao y = kx + n, broj k nije samo koeficijent uz x, već opisuje nagib prave. On je povezan sa uglom α koji prava zaklapa sa pozitivnim smerom x-ose relacijom k = tan α. Zato smerni koeficijent nije ugao, ali iz njega možeš da dođeš do ugla."
      >
        <div className={s.grid3}>
          <FormulaCard
            title="Paralelnost: kada prave imaju isti nagib"
            formula="k_1 = k_2"
            note={
              <>
                U implicitnom obliku uslov možeš čitati kao{" "}
                <InlineMath>{"A_1B_2 - A_2B_1 = 0"}</InlineMath>. Ako su uz to
                svi koeficijenti proporcionalni, prave su zapravo{" "}
                <strong>iste</strong>, a ne samo paralelne.
              </>
            }
          />
          <FormulaCard
            title="Normalnost: kada se seku pod pravim uglom"
            formula={"k_1 \\cdot k_2 = -1"}
            note={
              <>
                Ovaj zapis važi kada obe prave imaju definisan smerni
                koeficijent. Opštiji uslov u implicitnom obliku je{" "}
                <InlineMath>{"A_1A_2 + B_1B_2 = 0"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Ugao između pravih: koristi akutni ugao"
            formula={"\\tan \\varphi = \\left| \\frac{k_2 - k_1}{1 + k_1k_2} \\right|"}
            note={
              <>
                Na prijemnom se obično traži <strong>manji</strong> ugao između
                pravih, pa zato koristiš apsolutnu vrednost. Ako je{" "}
                <InlineMath>{"1 + k_1k_2 = 0"}</InlineMath>, ugao je{" "}
                <InlineMath>{"90^\\circ"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako razlikuješ paralelne i podudarne prave">
            <p>
              Posmatraj prave{" "}
              <InlineMath>{"2x - 3y + 1 = 0"}</InlineMath> i{" "}
              <InlineMath>{"4x - 6y - 5 = 0"}</InlineMath>. Pošto je{" "}
              <InlineMath>{"2 \\cdot (-6) - 4 \\cdot (-3) = 0"}</InlineMath>,
              prave su paralelne. Ali koeficijenti{" "}
              <strong>nisu svi proporcionalni</strong>, jer ne postoji isti broj
              kojim bi se istovremeno dobilo{" "}
              <InlineMath>{"4"}</InlineMath>, <InlineMath>{"-6"}</InlineMath> i{" "}
              <InlineMath>{"-5"}</InlineMath> iz <InlineMath>{"2"}</InlineMath>,{" "}
              <InlineMath>{"-3"}</InlineMath> i <InlineMath>{"1"}</InlineMath>.
              Dakle, nisu iste.
            </p>
          </SectionCard>

          <SectionCard title="Kako mentalno proveravaš rezultat">
            <ul>
              <li>
                Ako dve prave imaju skoro iste nagibe, ugao između njih treba da
                bude mali.
              </li>
              <li>
                Ako je jedna rastuća, a druga blago opadajuća, ugao je obično
                veći.
              </li>
              <li>
                Ako je jedna nagib <InlineMath>{"2"}</InlineMath>, a druga nagib{" "}
                <InlineMath>{"-\\frac{1}{2}"}</InlineMath>, to miriše na
                normalnost.
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li su 2x − y + 3 = 0 i 4x − 2y + 6 = 0 paralelne ili iste?"
          answer={
            <p>
              Druga jednačina je tačno dvostruka od prve, pa predstavljaju{" "}
              <strong>istu pravu</strong>. Ovo je važna razlika: iste prave jesu
              paralelne u širem smislu, ali u zadacima se obično posebno traži
              da razlikuješ &ldquo;paralelne različite&rdquo; od
              &ldquo;podudarnih&rdquo;.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljni primeri koje treba da umeš bez lutanja"
        description="U svakom primeru gledaj redosled misli. Na prijemnom je to važnije od same aritmetike: prepoznaj oblik, izaberi alat, tek onda računaj."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Prevedi{" "}
              <InlineMath>{"y = -\\frac{1}{2}x + 3"}</InlineMath> u implicitni
              i segmentni oblik
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Implicitni oblik">
                <p>
                  Pomnoži jednačinu sa <InlineMath>{"2"}</InlineMath>:{" "}
                  <InlineMath>{"2y = -x + 6"}</InlineMath>. Prebaci sve na jednu
                  stranu:
                </p>
                <MathBlock>{"x + 2y - 6 = 0"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Preseci sa osama">
                <p>
                  Za <InlineMath>{"y=0"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"x=6"}</InlineMath>. Za{" "}
                  <InlineMath>{"x=0"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"y=3"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Segmentni oblik">
                <MathBlock>{"\\frac{x}{6} + \\frac{y}{3} = 1"}</MathBlock>
                <p>
                  Ovaj primer je lep jer prava zaista seče obe ose, pa segmentni
                  oblik ima smisla.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Odredi ugao između pravih{" "}
              <InlineMath>{"p: y = x + 1"}</InlineMath> i{" "}
              <InlineMath>{"q: y = 3x - 2"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pročitaj nagibe">
                <p>
                  Iz jednačina odmah vidiš da je{" "}
                  <InlineMath>{"k_1 = 1"}</InlineMath>, a{" "}
                  <InlineMath>{"k_2 = 3"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni formulu">
                <MathBlock>
                  {
                    "\\tan \\varphi = \\left| \\frac{3-1}{1+3\\cdot1} \\right| = \\frac{2}{4} = \\frac{1}{2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zaključak">
                <MathBlock>
                  {
                    "\\varphi = \\arctan \\frac{1}{2} \\approx 26{,}565^\\circ"
                  }
                </MathBlock>
                <p>
                  Pošto su nagibi relativno slični, dobijaš mali akutni ugao. To
                  je dobra mentalna provera.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Izračunaj rastojanje tačke{" "}
              <InlineMath>{"P(1,-2)"}</InlineMath> od prave{" "}
              <InlineMath>{"3x - 4y + 8 = 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Proveri oblik">
                <p>
                  Prava je već u implicitnom obliku, pa formulu možeš primeniti
                  odmah.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti koordinate tačke">
                <MathBlock>
                  {
                    "d = \\frac{|3\\cdot 1 - 4\\cdot(-2) + 8|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|3 + 8 + 8|}{\\sqrt{25}} = \\frac{19}{5}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Tumačenje">
                <p>
                  Rezultat je pozitivan jer rastojanje nikada ne može biti
                  negativno. Zato je apsolutna vrednost obavezna.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Prava kroz tačku{" "}
              <InlineMath>{"A(2,-1)"}</InlineMath> paralelna pravoj{" "}
              <InlineMath>{"3x + y - 4 = 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Zadrži iste koeficijente uz{" "}
                    <InlineMath>{"x"}</InlineMath> i{" "}
                    <InlineMath>{"y"}</InlineMath>
                  </>
                }
              >
                <p>Svaka prava paralelna datoj ima oblik</p>
                <MathBlock>{"3x + y + C = 0"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Uvrsti tačku kroz koju prava prolazi"
              >
                <MathBlock>
                  {
                    "3\\cdot2 + (-1) + C = 0 \\quad \\Rightarrow \\quad 5 + C = 0 \\quad \\Rightarrow \\quad C = -5"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Konačna jednačina">
                <MathBlock>{"3x + y - 5 = 0"}</MathBlock>
                <p>
                  Ovakvi zadaci su česti jer proveravaju da li zaista razumeš
                  šta znači &ldquo;paralelna prava&rdquo;.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Formula blok koji treba da umeš da prizoveš odmah"
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Eksplicitni oblik"
            formula="y = kx + n"
            note={
              <>
                <strong>Čitaš:</strong> nagib{" "}
                <InlineMath>{"k"}</InlineMath>, presek sa{" "}
                <InlineMath>{"y"}</InlineMath>-osom{" "}
                <InlineMath>{"n"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Implicitni oblik"
            formula="Ax + By + C = 0"
            note={
              <>
                <strong>Čitaš:</strong> najopštiji zapis, pogodan za rastojanje
                i vertikalne prave.
              </>
            }
          />
          <FormulaCard
            title="Segmentni oblik"
            formula={"\\frac{x}{a} + \\frac{y}{b} = 1"}
            note={
              <>
                <strong>Čitaš:</strong> preseci sa osama su{" "}
                <InlineMath>{"(a,0)"}</InlineMath> i{" "}
                <InlineMath>{"(0,b)"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Nagib iz implicitnog"
            formula={"k = -\\frac{A}{B} \\qquad (B \\neq 0)"}
            note={
              <>
                <strong>Čitaš:</strong> prvo proveri da li prava nije
                vertikalna.
              </>
            }
          />
          <FormulaCard
            title="Ugao između pravih"
            formula={"\\tan \\varphi = \\left| \\frac{k_2 - k_1}{1 + k_1k_2} \\right|"}
            note={
              <>
                <strong>Čitaš:</strong> traži se manji, akutni ugao između
                pravih.
              </>
            }
          />
          <FormulaCard
            title="Rastojanje tačke od prave"
            formula={"d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"}
            note={
              <>
                <strong>Čitaš:</strong> obavezna apsolutna vrednost i implicitni
                oblik prave.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje prave razliku između tačnog i skoro tačnog rešenja"
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljena apsolutna vrednost</h3>
            <p>
              U formuli za rastojanje izraz{" "}
              <InlineMath>{"Ax_0 + By_0 + C"}</InlineMath> može biti negativan,
              ali rastojanje ne može. Bez apsolutne vrednosti dobijaš besmislen
              rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"k"}</InlineMath> i{" "}
              <InlineMath>{"n"}</InlineMath>
            </h3>
            <p>
              U izrazu <InlineMath>{"y = kx + n"}</InlineMath>, broj{" "}
              <InlineMath>{"k"}</InlineMath> je nagib, a{" "}
              <InlineMath>{"n"}</InlineMath> presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom. Učenici često pogrešno čitaju
              da je <InlineMath>{"n"}</InlineMath> &ldquo;nagib&rdquo; zato što
              je vizuelno na kraju formule.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Uporno korišćenje eksplicitnog oblika
            </h3>
            <p>
              Prava <InlineMath>{"x = 3"}</InlineMath> ne može u oblik{" "}
              <InlineMath>{"y = kx + n"}</InlineMath>. Ako to ne primetiš,
              zadatak krene da deluje &ldquo;nemoguć&rdquo;, a zapravo samo
              traži implicitni pristup.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Segmentni oblik tamo gde ne postoji
            </h3>
            <p>
              Prava <InlineMath>{"y = 5"}</InlineMath> nema konačan presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom, pa segmentni zapis nije
              prirodan. Nemoj nasilno da tražiš{" "}
              <InlineMath>{"a"}</InlineMath> i <InlineMath>{"b"}</InlineMath>{" "}
              ako geometrija to ne dozvoljava.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Paralelne ili iste?</h3>
            <p>
              Kada su koeficijenti proporcionalni, proveri da li su
              proporcionalni <strong>svi</strong> koeficijenti, uključujući i
              slobodni član. U suprotnom, promašićeš da su prave različite.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan ugao</h3>
            <p>
              Na prijemnom se najčešće traži manji ugao između pravih. Ako
              dobijaš tup ugao, verovatno treba da uzmeš njegov suplement do{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema najčešće pojavljuje na prijemnom"
        description={'Zadatak retko glasi samo \u201Enapiši formulu\u201C. Mnogo češće traži da iz jednačine očitaš položaj prave, da napišeš paralelu ili normalu, da odrediš ugao između dve prave ili da računaš rastojanje koje se kasnije koristi u nekoj geometrijskoj konfiguraciji.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Tip 1: Prevedi i pročitaj">
            <p>
              Data je jednačina u implicitnom obliku, a od tebe se traži nagib,
              presek sa osama ili segmentni oblik.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: Odnos dve prave">
            <p>
              Treba da zaključiš da li su prave paralelne, normalne, iste ili
              seku pod određenim uglom.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: Tačka i prava">
            <p>
              Traži se rastojanje tačke od prave, jednačina prave kroz zadatu
              tačku ili prava paralelna datoj.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 4 koraka">
          <p>
            <strong>Korak 1:</strong> uredi zapis tako da formula koju želiš da
            koristiš zaista može da se primeni.
          </p>
          <p>
            <strong>Korak 2:</strong> proveri da li je prava vertikalna ili
            horizontalna, jer to često pojednostavljuje zadatak.
          </p>
          <p>
            <strong>Korak 3:</strong> posle računa uradi brzu geometrijsku
            proveru: da li ugao deluje mali, da li rastojanje mora biti
            pozitivno, da li su prave zaista paralelne.
          </p>
          <p>
            <strong>Korak 4:</strong> ako zadatak deluje komplikovano, obično
            traži samo pametan izbor oblika, ne komplikovan račun.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li možeš samostalno"
        description="Pokušaj da svaku vežbu prvo uradiš bez gledanja rešenja. Ako zapneš, nemoj samo pročitati odgovor, već isprati korake i proveri gde je tvoj tok misli skrenuo."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Prevedi{" "}
                <InlineMath>{"3x + 2y - 12 = 0"}</InlineMath> u eksplicitni i
                segmentni oblik.
              </p>
            }
            solution={
              <>
                <p>Iz implicitnog oblika izdvajamo <InlineMath>{"y"}</InlineMath>:</p>
                <MathBlock>
                  {
                    "2y = -3x + 12 \\quad \\Rightarrow \\quad y = -\\frac{3}{2}x + 6"
                  }
                </MathBlock>
                <p>
                  Za segmentni oblik gledamo preseke sa osama. Ako je{" "}
                  <InlineMath>{"y = 0"}</InlineMath>, dobijamo{" "}
                  <InlineMath>{"x = 4"}</InlineMath>. Ako je{" "}
                  <InlineMath>{"x = 0"}</InlineMath>, dobijamo{" "}
                  <InlineMath>{"y = 6"}</InlineMath>. Zato je
                </p>
                <MathBlock>{"\\frac{x}{4} + \\frac{y}{6} = 1"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Odredi odnos pravih{" "}
                <InlineMath>{"p: y = 4x - 1"}</InlineMath> i{" "}
                <InlineMath>{"q: 4x - y + 7 = 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Drugu pravu prevodimo u eksplicitni oblik:{" "}
                  <InlineMath>{"y = 4x + 7"}</InlineMath>. Obe prave imaju isti
                  smerni koeficijent <InlineMath>{"k = 4"}</InlineMath>, pa su
                  paralelne. Pošto imaju različite odsečke na{" "}
                  <InlineMath>{"y"}</InlineMath>-osi (
                  <InlineMath>{"-1"}</InlineMath> i{" "}
                  <InlineMath>{"7"}</InlineMath>), nisu iste.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj ugao između pravih{" "}
                <InlineMath>{"y = 2x + 1"}</InlineMath> i{" "}
                <InlineMath>{"y = -\\frac{1}{3}x + 4"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Ovde je <InlineMath>{"k_1 = 2"}</InlineMath>,{" "}
                  <InlineMath>{"k_2 = -\\frac{1}{3}"}</InlineMath>. Primeni
                  formulu:
                </p>
                <MathBlock>
                  {
                    "\\tan \\varphi = \\left| \\frac{-\\frac{1}{3} - 2}{1 + 2 \\cdot \\left(-\\frac{1}{3}\\right)} \\right| = \\left| \\frac{-\\frac{7}{3}}{\\frac{1}{3}} \\right| = 7"
                  }
                </MathBlock>
                <p>Dakle,</p>
                <MathBlock>
                  {"\\varphi = \\arctan 7 \\approx 81{,}87^\\circ"}
                </MathBlock>
                <p>
                  Ugao je veliki, ali i dalje akutni ugao između pravih.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Nađi rastojanje tačke{" "}
                <InlineMath>{"P(-1, 2)"}</InlineMath> od prave{" "}
                <InlineMath>{"2x - y - 5 = 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Primeni formulu:</p>
                <MathBlock>
                  {
                    "d = \\frac{|2\\cdot(-1) - 2 - 5|}{\\sqrt{2^2 + (-1)^2}} = \\frac{|-9|}{\\sqrt{5}} = \\frac{9}{\\sqrt{5}}"
                  }
                </MathBlock>
                <p>Ako želiš racionalisan imenilac,</p>
                <MathBlock>{"d = \\frac{9\\sqrt{5}}{5}"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Napiši jednačinu prave koja prolazi kroz{" "}
                <InlineMath>{"A(2, 3)"}</InlineMath> i paralelna je pravoj{" "}
                <InlineMath>{"x - 2y + 5 = 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prava paralelna datoj ima isti odnos koeficijenata uz{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath>, pa pišemo{" "}
                  <InlineMath>{"x - 2y + C = 0"}</InlineMath>.
                </p>
                <p>
                  Uvrštavanjem tačke <InlineMath>{"A(2,3)"}</InlineMath>:
                </p>
                <MathBlock>
                  {
                    "2 - 2 \\cdot 3 + C = 0 \\quad \\Rightarrow \\quad 2 - 6 + C = 0 \\quad \\Rightarrow \\quad C = 4"
                  }
                </MathBlock>
                <p>Zato je tražena prava</p>
                <MathBlock>{"x - 2y + 4 = 0"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Objasni zašto prava <InlineMath>{"y = 5"}</InlineMath> nema
                prirodan segmentni oblik sa konačnim{" "}
                <InlineMath>{"a"}</InlineMath> i{" "}
                <InlineMath>{"b"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prava <InlineMath>{"y = 5"}</InlineMath> seče{" "}
                  <InlineMath>{"y"}</InlineMath>-osu u tački{" "}
                  <InlineMath>{"(0,5)"}</InlineMath>, ali ne seče{" "}
                  <InlineMath>{"x"}</InlineMath>-osu. Zato nema konačan odsečak{" "}
                  <InlineMath>{"a"}</InlineMath> na{" "}
                  <InlineMath>{"x"}</InlineMath>-osi i ne može se zapisati kao
                </p>
                <MathBlock>{"\\frac{x}{a} + \\frac{y}{b} = 1"}</MathBlock>
                <p>
                  sa konačnim brojevima <InlineMath>{"a"}</InlineMath> i{" "}
                  <InlineMath>{"b"}</InlineMath>. Ovo je tipičan primer kada
                  segmentni oblik nije dobar izbor.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka lekcije"
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Prava nije samo jedna formula. Ona je{" "}
            <strong>objekat koji posmatraš iz različitih uglova</strong>.
            Eksplicitni oblik ti daje nagib, implicitni oblik ti daje opštost i
            rastojanje, a segmentni oblik ti daje preseke sa osama. Kada znaš da
            izabereš pravi zapis, skoro svi zadaci iz ove oblasti postaju
            kratki.
          </p>
          <MathBlock>
            {
              "\\text{Prvo izaberi oblik} \\quad \\Longrightarrow \\quad \\text{onda primeni odgovarajuću formulu.}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Eksplicitni oblik</h3>
            <p>
              <InlineMath>{"y = kx + n"}</InlineMath> služi da odmah vidiš nagib
              i presek sa <InlineMath>{"y"}</InlineMath>-osom.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Implicitni oblik</h3>
            <p>
              <InlineMath>{"Ax + By + C = 0"}</InlineMath> je najopštiji i
              obavezan za formulu rastojanja tačke od prave.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Segmentni oblik</h3>
            <p>
              <InlineMath>{"\\frac{x}{a} + \\frac{y}{b} = 1"}</InlineMath>{" "}
              koristiš samo kada prava ima oba konačna preseka sa osama.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Paralelnost i normalnost</h3>
            <p>
              Paralelnost čitaš preko jednakih nagiba, normalnost preko uslova{" "}
              <InlineMath>{"k_1 k_2 = -1"}</InlineMath> ili{" "}
              <InlineMath>{"A_1A_2 + B_1B_2 = 0"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Ispitna navika</h3>
            <p>
              Na prijemnom najviše pomaže navika: sredi oblik, odaberi alat,
              proveri geometrijski smisao rezultata.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je da ovo znanje koristiš u zadacima sa
          kružnicom i drugim krivama, gde uslovi dodira često zavise upravo od
          jednačina pravih, uglova i rastojanja.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
