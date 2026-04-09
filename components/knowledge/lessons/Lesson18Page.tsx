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
import AbsValueLab from "./AbsValueLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#intuicija", label: "Intuicija i definicija" },
  { href: "#standardni-oblici", label: "Standardni oblici" },
  { href: "#metod-intervala", label: "Metod intervala" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson18Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 18"
        title={
          <>
            Linearne jednačine i nejednačine sa{" "}
            <span className={cs.tHeroAccent}>apsolutnom vrednošću</span>
          </>
        }
        description="Apsolutna vrednost ne traži brzinu bez razmišljanja, već disciplinu. Na prijemnom te najčešće ne obori sam račun, nego pogrešan znak, zaboravljen uslov ili propušten presek sa intervalom. Zato ovu lekciju učimo kao spoj intuicije o rastojanju i precizne intervalne logike."
        heroImageSrc="/images/lessons/lesson18_hero.png"
        heroImageAlt="Ilustracija matematičke table za lekciju o apsolutnoj vrednosti"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da iz apsolutne vrednosti pređeš na čiste linearne uslove. Kroz standardne šeme, uslov na desnu stranu i metod intervalne dekompozicije.",
          },
          {
            label: "Najveća zamka",
            description:
              "Dobiti rešenje jednačine, a ne proveriti da li pripada baš tom intervalu. Bez preseka sa intervalom lako nastaju lažna rešenja i pogrešna unija.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa više apsolutnih zagrada i kratkim, ali preciznim zaključkom. Najčešće se proveravaju nule izraza u zagradama, znak i uredno sastavljanje konačnog skupa.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "Oko 75 do 90 minuta za teoriju, pažljivo praćenje primera i rad kroz interaktivnu laboratoriju.",
          },
          {
            label: "Predznanje",
            description:
              "Linearne jednačine i nejednačine, brojevna prava, intervalni zapis i osnovna algebarska transformacija.",
          },
          {
            label: "Glavna veština",
            description:
              "Da svaki zadatak sa apsolutnom vrednošću pretvoriš u uredne linearne slučajeve bez preskakanja uslova.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za izraz |x\u2212a| + |x\u2212b| \u25FB c sa grafikom, prelomnim tačkama i skupom rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Temelj preciznosti za prijemni"
        description="Apsolutna vrednost se pojavljuje baš tamo gde ispitivač želi da proveri da li razumeš znak, interval i geometrijsko značenje izraza. Zato ova tema stoji između lakih linearnih zadataka i ozbiljnijih problemskih zadataka koji traže preciznost u više koraka."
      >
        <div className={s.grid3}>
          <SectionCard title="Rastojanje, a ne dekoracija">
            <p>
              Zapis <InlineMath>{"|x-a|"}</InlineMath> treba da čitaš kao
              rastojanje broja <InlineMath>{"x"}</InlineMath> do tačke{" "}
              <InlineMath>{"a"}</InlineMath>. Kada tako razmišljaš, mnogi
              zadaci postaju prirodni: jednačina traži gde je rastojanje tačno
              određeno, a nejednačina traži gde je ono manje ili veće od neke
              granice.
            </p>
          </SectionCard>
          <SectionCard title="Most ka težim zadacima">
            <p>
              Izrazi sa više apsolutnih zagrada uvode istu logiku koja se kasnije
              koristi kod metoda intervala, analize znaka i funkcionalnog
              posmatranja zadatka. Nije poenta samo dobiti broj, već kontrolisati
              ceo skup rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Česta prijemna zamka">
            <p>
              Na papiru zadatak često izgleda kratko, ali skriva obavezne uslove:
              nule izraza u zagradama, znak desne strane i presek sa svakim
              intervalom. Upravo tu se gube bodovi kad se radi napamet.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTUICIJA I DEFINICIJA ═══════════ */}
      <LessonSection
        id="intuicija"
        eyebrow="Intuicija i osnovna definicija"
        title="Prvo značenje, pa račun"
        description="Pre nego što rešavaš zadatak, moraš da znaš šta apsolutna vrednost meri. To je broj bez znaka, odnosno udaljenost od nule ili, šire, udaljenost između dve tačke na brojnoj pravoj."
      >
        <div className={s.grid3}>
          <SectionCard title="Definicija po delovima">
            <MathBlock>
              {
                "|t| = \\left\\{\\begin{array}{ll} t, & t \\ge 0, \\\\ -t, & t < 0. \\end{array}\\right."
              }
            </MathBlock>
            <p>
              Kada je izraz u zagradi nenegativan, apsolutna vrednost ga ne
              menja. Kada je negativan, menja mu znak. Ovo je tehnička osnova za
              kasnije skidanje zagrada po intervalima.
            </p>
            <MicroCheck
              question="Mikro-provera: zašto je |−7| = 7?"
              answer={
                <p>
                  Zato što apsolutna vrednost meri udaljenost od nule. Broj{" "}
                  <InlineMath>{"-7"}</InlineMath> je od nule udaljen tačno{" "}
                  <InlineMath>{"7"}</InlineMath> jedinica.
                </p>
              }
            />
          </SectionCard>

          <SectionCard title="Rastojanje do tačke a">
            <MathBlock>
              {"|x-a| = \\text{rastojanje broja } x \\text{ do tačke } a"}
            </MathBlock>
            <p>
              Ako vidiš <InlineMath>{"|x-3| = 2"}</InlineMath>, čitaj to ovako:
              {" \u201E"}Nađi sve brojeve koji su udaljeni{" "}
              <InlineMath>{"2"}</InlineMath> od tačke{" "}
              <InlineMath>{"3"}</InlineMath>.{"\u201C"} Zato odmah dobijaš dva
              kandidata: <InlineMath>{"x=1"}</InlineMath> i{" "}
              <InlineMath>{"x=5"}</InlineMath>.
            </p>
            <MicroCheck
              question="Mikro-provera: koliko je |2−5| i šta to znači?"
              answer={
                <p>
                  <InlineMath>{"|2-5| = 3"}</InlineMath>. To znači da su tačke{" "}
                  <InlineMath>{"2"}</InlineMath> i{" "}
                  <InlineMath>{"5"}</InlineMath> na brojnoj pravoj udaljene{" "}
                  <InlineMath>{"3"}</InlineMath> jedinice.
                </p>
              }
            />
          </SectionCard>

          <SectionCard title="Šta odmah znaš bez računanja">
            <ul>
              <li>
                <InlineMath>{"|A(x)| \\ge 0"}</InlineMath> za svako{" "}
                <InlineMath>{"x"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"|A(x)| = 0"}</InlineMath> tačno kada je{" "}
                <InlineMath>{"A(x) = 0"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"|A(x)|"}</InlineMath> nikada nije negativno.
              </li>
              <li>
                Kada ima više apsolutnih zagrada, nule izraza u njima dele brojnu
                pravu na intervale.
              </li>
            </ul>
            <MicroCheck
              question="Mikro-provera: može li |2x−1| < 0?"
              answer={
                <p>
                  Ne može. Apsolutna vrednost nikad nije negativna, pa je svaka
                  takva nejednačina automatski bez rešenja.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ STANDARDNI OBLICI ═══════════ */}
      <LessonSection
        id="standardni-oblici"
        eyebrow="Standardni oblici"
        title="Šeme koje moraš da prepoznaš odmah"
        description="Najveća ušteda vremena na ispitu dolazi iz toga da ne rešavaš svaki zadatak od nule. Prvo prepoznaj tip. Tek kada znaš tip, biraš pravi alat: dve jednačine, dvostruku nejednačinu, uniju intervala ili proveru uslova na desnu stranu."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Obrazac 1: |A(x)| = c"
            formula={"|A(x)| = c \\iff \\begin{cases} A(x) = c, \\\\ A(x) = -c \\end{cases} \\quad \\text{ako je } c \\ge 0."}
            note={
              <>
                Ako je <InlineMath>{"c < 0"}</InlineMath>, rešenja nema. Ako je{" "}
                <InlineMath>{"c = 0"}</InlineMath>, ostaje samo{" "}
                <InlineMath>{"A(x)=0"}</InlineMath>. Mini-primer:{" "}
                <InlineMath>{"|2x-3| = 5"}</InlineMath> daje{" "}
                <InlineMath>{"2x-3=5"}</InlineMath> ili{" "}
                <InlineMath>{"2x-3=-5"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Obrazac 2: |A(x)| \u2264 c"
            formula={"|A(x)| \\le c \\iff -c \\le A(x) \\le c \\quad \\text{za } c \\ge 0."}
            note={
              <>
                Ovde dobijaš <strong>presek</strong>, ne uniju. Izraz u zagradi
                je {"\u201E"}zarobljen{"\u201C"} između{" "}
                <InlineMath>{"-c"}</InlineMath> i{" "}
                <InlineMath>{"c"}</InlineMath>. Mini-primer:{" "}
                <InlineMath>{"|3x+1| < 7"}</InlineMath> daje{" "}
                <InlineMath>{"-7 < 3x+1 < 7"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Obrazac 3: |A(x)| \u2265 c"
            formula={"|A(x)| \\ge c \\iff A(x) \\le -c \\;\\; \\text{ili} \\;\\; A(x) \\ge c \\quad \\text{za } c \\ge 0."}
            note={
              <>
                Ovde dobijaš <strong>uniju</strong> dva dela. Izraz mora biti
                dovoljno levo ili dovoljno desno od nule. Mini-primer:{" "}
                <InlineMath>{"|x-1| \\ge 4"}</InlineMath> daje{" "}
                <InlineMath>{"x-1 \\le -4"}</InlineMath> ili{" "}
                <InlineMath>{"x-1 \\ge 4"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Obrazac 4: desna strana je promenljiva"
            formula={"|A(x)| = B(x) \\quad \\text{ili} \\quad |A(x)| \\le B(x)"}
            note={
              <>
                Pre bilo kakvog rastavljanja moraš proveriti da li je{" "}
                <InlineMath>{"B(x) \\ge 0"}</InlineMath>. Apsolutna vrednost
                može biti jednaka ili manja od <InlineMath>{"B(x)"}</InlineMath>{" "}
                samo tamo gde je <InlineMath>{"B(x) \\ge 0"}</InlineMath>.
                Pravilo: prvo uslov na desnu stranu, pa tek onda rešavanje.
              </>
            }
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto u zadatku |2x−1| = x+5 prvo gledamo x+5 \u2265 0?"
          answer={
            <p>
              Zato što leva strana nikada nije negativna. Ako je{" "}
              <InlineMath>{"x+5 < 0"}</InlineMath>, jednakost ne može da važi,
              bez obzira na levu stranu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ METOD INTERVALNE DEKOMPOZICIJE ═══════════ */}
      <LessonSection
        id="metod-intervala"
        eyebrow="Metod intervalne dekompozicije"
        title="Glavni algoritam za više zagrada"
        description="Kada imaš više apsolutnih zagrada, ne postoji univerzalna magična formula. Tada brojnu pravu deliš nulama izraza iz svake zagrade, na svakom intervalu određuješ znak i tek onda skidaš apsolutne vrednosti. To je centralna tehnika ove lekcije."
      >
        <div className={s.grid3}>
          <SectionCard title="Korak 1: Nađi nule izraza u zagradama">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Identifikuj prelomne tačke.">
                <p>
                  Ako imaš <InlineMath>{"|x-2| + |x+1|"}</InlineMath>,
                  prelomne tačke su <InlineMath>{"x=2"}</InlineMath> i{" "}
                  <InlineMath>{"x=-1"}</InlineMath>. One određuju gde se menja
                  znak izraza u apsolutnoj vrednosti.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Korak 2: Poređaj tačke na brojnoj pravoj">
            <p>
              Uvek ih napiši sleva nadesno. Tek tada tačno vidiš intervale:{" "}
              <InlineMath>{"(-\\infty,-1)"}</InlineMath>,{" "}
              <InlineMath>{"[-1,2)"}</InlineMath> i{" "}
              <InlineMath>{"[2,+\\infty)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Korak 3: Na svakom intervalu odredi znak">
            <p>
              Na primer, za <InlineMath>{"x < -1"}</InlineMath> i{" "}
              <InlineMath>{"x-2"}</InlineMath> i{" "}
              <InlineMath>{"x+1"}</InlineMath> su negativni, pa{" "}
              <InlineMath>{"|x-2| = -(x-2)"}</InlineMath> i{" "}
              <InlineMath>{"|x+1| = -(x+1)"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Korak 4: Skini zagrade i reši">
            <p>
              Kada znakovi postanu poznati, zadatak više nije{" "}
              {"\u201E"}apsolutna vrednost{"\u201C"}, nego obična linearna
              jednačina ili nejednačina na datom intervalu.
            </p>
          </SectionCard>
          <SectionCard title="Korak 5: Napravi presek sa intervalom">
            <p>
              Ovo je korak koji se najčešće zaboravlja. Rešenje koje dobiješ iz
              linearnog uslova mora da pripada baš tom intervalu u kome si
              radio.
            </p>
          </SectionCard>
          <SectionCard title="Korak 6: Na kraju sastavi uniju">
            <p>
              Sva validna parcijalna rešenja spajaš u konačan skup. Ako neki
              interval ne daje ništa, jednostavno ga preskačeš.
            </p>
          </SectionCard>
        </div>

        <div className={s.exampleGrid} style={{ marginTop: 16 }}>
          <SectionCard title="Mini demonstracija: kako se rastavlja |x−2| + |x+1|">
            <MathBlock>
              {
                "|x-2| + |x+1| = \\left\\{\\begin{array}{ll} 1 - 2x, & x < -1, \\\\ 3, & -1 \\le x \\le 2, \\\\ 2x - 1, & x > 2. \\end{array}\\right."
              }
            </MathBlock>
            <p>
              Između prelomnih tačaka zbir rastojanja do tačaka{" "}
              <InlineMath>{"-1"}</InlineMath> i <InlineMath>{"2"}</InlineMath>{" "}
              postaje konstanta. To nije slučajnost, već geometrijsko značenje
              zbira dve udaljenosti.
            </p>
            <MicroCheck
              question="Mikro-provera: zašto je na srednjem intervalu rezultat baš 3?"
              answer={
                <p>
                  Za svaki <InlineMath>{"x"}</InlineMath> između{" "}
                  <InlineMath>{"-1"}</InlineMath> i{" "}
                  <InlineMath>{"2"}</InlineMath> rastojanje do{" "}
                  <InlineMath>{"-1"}</InlineMath> plus rastojanje do{" "}
                  <InlineMath>{"2"}</InlineMath> jednako je rastojanju između
                  tih dveju tačaka, a to je <InlineMath>{"3"}</InlineMath>.
                </p>
              }
            />
          </SectionCard>

          <SectionCard title="Mentalni redosled: kako da se ne izgubiš">
            <ul>
              <li>Ne skidaj zagrade pre nego što odrediš interval.</li>
              <li>
                Ne preskači proveru da li je dobijeno rešenje u tom intervalu.
              </li>
              <li>
                Ako desna strana nije konstanta, prvo proveri njen znak.
              </li>
              <li>
                Na kraju obavezno napiši skup rešenja kao uniju intervala ili
                tačaka.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorija: pogledaj kako nastaje rešenje"
        description={
          "Ovde menjaš tačke a i b, vrednost c i relaciju. Graf narandžaste funkcije f(x) = |x\u2212a| + |x\u2212b| pokazuje kako se zadatak zapravo ponaša, a brojna prava ispod odmah prikazuje skup rešenja za izabranu relaciju."
        }
      >
        <AbsValueLab />

        <InsightCard title="Kako da učiš iz laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa skupom rešenja, pa
            tek onda promeni parametre. Posebno prati kako vrednost{" "}
            <InlineMath>{"c"}</InlineMath> u odnosu na plato{" "}
            <InlineMath>{"q-p"}</InlineMath> odlučuje o tome da li je skup
            prazan, interval ili unija.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak od lakšeg ka težem"
        description="Primeri su poređani od osnovnog obrasca do ozbiljnije intervalne dekompozicije. Ideja je da vidiš kako isti princip raste zajedno sa složenošću zadatka."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Reši jednačinu{" "}
              <InlineMath>{"|2x-3| = 5"}</InlineMath>
            </h3>
            <p>
              Desna strana je pozitivna konstanta, pa odmah razdvajaš dve
              linearne jednačine.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Postavi dve mogućnosti.">
                <p>
                  <InlineMath>{"2x-3=5"}</InlineMath> ili{" "}
                  <InlineMath>{"2x-3=-5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Reši obe jednačine.">
                <p>
                  Iz prve dobijaš <InlineMath>{"2x=8"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=4"}</InlineMath>. Iz druge dobijaš{" "}
                  <InlineMath>{"2x=-2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Napiši skup rešenja.">
                <MathBlock>{"S = \\{-1,\\, 4\\}"}</MathBlock>
              </WalkStep>
            </div>
            <MathBlock>{"|2x-3| = 5 \\iff x=-1 \\;\\; \\text{ili} \\;\\; x=4"}</MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Reši nejednačinu{" "}
              <InlineMath>{"|3x+1| < 7"}</InlineMath>
            </h3>
            <p>
              Koristiš dvostruku nejednačinu, jer tražiš da izraz ostane unutar
              centralne zone.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Pretvori zadatak u dvostruku nejednačinu."
              >
                <MathBlock>{"-7 < 3x+1 < 7"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Oduzmi <InlineMath>{"1"}</InlineMath> svuda.
                  </>
                }
              >
                <MathBlock>{"-8 < 3x < 6"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Podeli sa <InlineMath>{"3"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"-\\frac{8}{3} < x < 2"}</MathBlock>
              </WalkStep>
            </div>
            <MathBlock>{"S = \\left(-\\frac{8}{3},\\, 2\\right)"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Reši jednačinu{" "}
              <InlineMath>{"|2x-1| = x+5"}</InlineMath>
            </h3>
            <p>
              Ovo je tip zadatka u kome mnogi preskoče najvažniji uslov: desna
              strana mora biti nenegativna.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Postavi uslov na desnu stranu.">
                <MathBlock>{"x+5 \\ge 0 \\iff x \\ge -5"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Razdvoji slučajeve.">
                <MathBlock>
                  {
                    "2x-1 = x+5 \\quad \\text{ili} \\quad 2x-1 = -(x+5)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši obe jednačine.">
                <p>
                  Iz prve: <InlineMath>{"x=6"}</InlineMath>. Iz druge:{" "}
                  <InlineMath>{"3x=-4"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=-\\frac{4}{3}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={4}
                title={
                  <>
                    Proveri uslov <InlineMath>{"x \\ge -5"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Obe vrednosti ga zadovoljavaju, pa obe ostaju u rešenju.
                </p>
              </WalkStep>
            </div>
            <MathBlock>
              {"S = \\left\\{-\\frac{4}{3},\\, 6\\right\\}"}
            </MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Reši nejednačinu{" "}
              <InlineMath>{"|x-2| + |x+1| \\le 5"}</InlineMath>
            </h3>
            <p>
              Ovo je pun intervalni metod: dve zagrade, tri intervala, tri
              linearna zadatka i na kraju unija.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Prelomne tačke su <InlineMath>{"-1"}</InlineMath> i{" "}
                    <InlineMath>{"2"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Brojna prava se deli na{" "}
                  <InlineMath>{"x < -1"}</InlineMath>,{" "}
                  <InlineMath>{"-1 \\le x < 2"}</InlineMath> i{" "}
                  <InlineMath>{"x \\ge 2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Na levom intervalu.">
                <MathBlock>
                  {"|x-2| + |x+1| = (2-x) + (-x-1) = 1-2x"}
                </MathBlock>
                <p>
                  Rešavamo <InlineMath>{"1-2x \\le 5"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x \\ge -2"}</InlineMath>. Sa uslovom{" "}
                  <InlineMath>{"x < -1"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"[-2, -1)"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Na srednjem intervalu.">
                <MathBlock>
                  {"|x-2| + |x+1| = (2-x) + (x+1) = 3"}
                </MathBlock>
                <p>
                  Pošto je <InlineMath>{"3 \\le 5"}</InlineMath>, ceo interval{" "}
                  <InlineMath>{"[-1, 2)"}</InlineMath> ulazi u rešenje.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Na desnom intervalu.">
                <MathBlock>
                  {"|x-2| + |x+1| = (x-2) + (x+1) = 2x-1"}
                </MathBlock>
                <p>
                  Rešavamo <InlineMath>{"2x-1 \\le 5"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x \\le 3"}</InlineMath>. Sa uslovom{" "}
                  <InlineMath>{"x \\ge 2"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"[2, 3]"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Sastavi uniju.">
                <MathBlock>
                  {"[-2,-1) \\cup [-1,2) \\cup [2,3] = [-2,\\, 3]"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>{"S = [-2,\\, 3]"}</MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Mentalne prečice za prijemni"
        description="Ove formule nisu zamena za razmišljanje, ali jesu odličan alat za brzu klasifikaciju zadatka. Ako ih znaš napamet i razumeš kada važe, već si uklonio pola prijemne panike."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Rastojanje do tačke"
            formula="|x-a| = d"
            note="Tražiš sve brojeve čije je rastojanje do tačke a jednako d. Ako je d>0, obično dobijaš dve tačke."
          />
          <FormulaCard
            title="Centralna zona"
            formula={"|A(x)| \\le c \\iff -c \\le A(x) \\le c \\quad (c \\ge 0)"}
            note="Tipično daje jedan interval ili prazan skup."
          />
          <FormulaCard
            title="Spoljašnja zona"
            formula={"|A(x)| \\ge c \\iff A(x) \\le -c \\;\\; \\text{ili} \\;\\; A(x) \\ge c \\quad (c \\ge 0)"}
            note="Tipično daje uniju dva intervala ili ceo skup realnih brojeva."
          />
          <FormulaCard
            title="Desna strana mora imati smisla"
            formula={"|A(x)| = B(x) \\Rightarrow B(x) \\ge 0"}
            note="Isti princip važi i za |A(x)| \u2264 B(x). Bez ovog uslova zadatak se rešava pogrešno od starta."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se gube laki bodovi"
        description="Ove greške nisu sitnice. U većini prijemnih zadataka baš one odlučuju da li dobijaš pun broj poena ili ostaješ bez rešenja koje si skoro imao."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje preseka i unije</h3>
            <p>
              Kod <InlineMath>{"|A(x)| \\le c"}</InlineMath> dobijaš dvostruku
              nejednačinu, dakle presek uslova. Kod{" "}
              <InlineMath>{"|A(x)| \\ge c"}</InlineMath> dobijaš uniju. Zamena
              ova dva obrasca je najčešća formalna greška.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen uslov na desnu stranu</h3>
            <p>
              U zadacima poput <InlineMath>{"|2x-1| = x+5"}</InlineMath> mnogi
              odmah pišu dve jednačine. To je pogrešno dok ne proveriš da li je{" "}
              <InlineMath>{"x+5 \\ge 0"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Bez preseka sa intervalom</h3>
            <p>
              Na intervalu <InlineMath>{"x < -1"}</InlineMath> dobiješ, recimo,{" "}
              <InlineMath>{"x \\ge -2"}</InlineMath>. Pravo parcijalno rešenje
              nije {"\u201E"}<InlineMath>{"x \\ge -2"}</InlineMath>{"\u201C"},
              nego <InlineMath>{"[-2,-1)"}</InlineMath>, jer moraš poštovati
              interval u kome si skinuo zagrade.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno poređane prelomne tačke
            </h3>
            <p>
              Ako tačke ne napišeš sleva nadesno, lako zameniš znak izraza u
              zagradama i ceo zadatak se raspadne. Zato je crtanje male brojevne
              prave dobra navika, a ne gubitak vremena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Neproveren krajnji rezultat</h3>
            <p>
              Posle dužeg računanja obavezno pročitaj konačan skup: da li deluje
              logično? Da li je prazan, interval, unija ili skup tačaka? Kratka
              provera često spašava zadatak.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mehaničko skidanje apsolutne vrednosti
            </h3>
            <p>
              Izraz <InlineMath>{"|x-2|"}</InlineMath> nije isto što i{" "}
              <InlineMath>{"x-2"}</InlineMath> za svako{" "}
              <InlineMath>{"x"}</InlineMath>. Zagrada se skida tek kada znaš na
              kom intervalu radiš.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Ispitna strategija"
        description="Na prijemnom se tema obično ne zove \u201Eapsolutna vrednost\u201C, nego dolazi prerušena u zadatak koji izgleda kratko. Tvoj posao je da odmah prepoznaš strukturu i da ne pogrešiš u organizaciji slučajeva."
      >
        <div className={s.grid3}>
          <SectionCard title="Kako se najčešće pojavljuje">
            <p>
              Kao jednačina sa jednom zagradom, nejednačina sa dve zagrade,
              zadatak sa promenljivom na desnoj strani, ili kao skraćeni{" "}
              {"\u201E"}odredi skup rešenja{"\u201C"} gde nema mesta za nered u
              zapisu.
            </p>
          </SectionCard>
          <SectionCard title="Šta proveri u prvih 20 sekundi">
            <ul>
              <li>Koliko ima apsolutnih zagrada?</li>
              <li>Koje su nule izraza u njima?</li>
              <li>Da li je desna strana sigurno nenegativna?</li>
              <li>Da li zadatak vodi ka preseku ili uniji?</li>
            </ul>
          </SectionCard>
          <SectionCard title="Brz savet za tempo rada">
            <p>
              Kada vidiš više apsolutnih zagrada, nacrtaj malu brojnu pravu na
              marginu. To traje nekoliko sekundi, a mnogo je jeftinije nego da
              posle ispravljaš znakove i pogrešne intervale.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe za samostalan rad"
        title="Proveri razumevanje"
        description="Probaj prvo samostalno, a tek onda otvori rešenje. Na prijemnom ti neće nedostajati formula, nego miran redosled koraka."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Reši jednačinu <InlineMath>{"|x-4| = 3"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"x-4=3"}</InlineMath> ili{" "}
                <InlineMath>{"x-4=-3"}</InlineMath>, pa je{" "}
                <InlineMath>{"x=7"}</InlineMath> ili{" "}
                <InlineMath>{"x=1"}</InlineMath>. Zato je{" "}
                <InlineMath>{"S=\\{1,7\\}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Reši nejednačinu <InlineMath>{"|2x+1| \\le 5"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"-5 \\le 2x+1 \\le 5"}</InlineMath>, pa{" "}
                <InlineMath>{"-6 \\le 2x \\le 4"}</InlineMath>, odnosno{" "}
                <InlineMath>{"-3 \\le x \\le 2"}</InlineMath>. Rešenje je{" "}
                <InlineMath>{"S=[-3,2]"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Reši nejednačinu <InlineMath>{"|x-1| \\ge 4"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"x-1 \\le -4"}</InlineMath> ili{" "}
                <InlineMath>{"x-1 \\ge 4"}</InlineMath>, pa je{" "}
                <InlineMath>{"x \\le -3"}</InlineMath> ili{" "}
                <InlineMath>{"x \\ge 5"}</InlineMath>. Dakle{" "}
                <InlineMath>
                  {"S=(-\\infty,-3] \\cup [5,+\\infty)"}
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Reši jednačinu <InlineMath>{"|3x-2| = 2x+4"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prvo <InlineMath>{"2x+4 \\ge 0"}</InlineMath>, pa{" "}
                  <InlineMath>{"x \\ge -2"}</InlineMath>. Zatim{" "}
                  <InlineMath>{"3x-2=2x+4"}</InlineMath> daje{" "}
                  <InlineMath>{"x=6"}</InlineMath>, a{" "}
                  <InlineMath>{"3x-2=-(2x+4)"}</InlineMath> daje{" "}
                  <InlineMath>{"5x=-2"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x=-\\frac{2}{5}"}</InlineMath>.
                </p>
                <p>
                  Obe vrednosti zadovoljavaju uslov, pa je{" "}
                  <InlineMath>
                    {"S=\\left\\{-\\frac{2}{5},\\, 6\\right\\}"}
                  </InlineMath>
                  .
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"|x+2| + |x-1| < 6"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prelomne tačke su <InlineMath>{"-2"}</InlineMath> i{" "}
                  <InlineMath>{"1"}</InlineMath>. Za{" "}
                  <InlineMath>{"x<-2"}</InlineMath>, izraz je{" "}
                  <InlineMath>{"-2x-1"}</InlineMath>, pa{" "}
                  <InlineMath>{"x>-\\frac{7}{2}"}</InlineMath>, što daje{" "}
                  <InlineMath>{"\\left(-\\frac{7}{2},-2\\right)"}</InlineMath>.
                  Za <InlineMath>{"-2 \\le x < 1"}</InlineMath>, zbir je{" "}
                  <InlineMath>{"3"}</InlineMath>, pa ceo interval ulazi. Za{" "}
                  <InlineMath>{"x \\ge 1"}</InlineMath>, izraz je{" "}
                  <InlineMath>{"2x+1"}</InlineMath>, pa{" "}
                  <InlineMath>{"x<\\frac{5}{2}"}</InlineMath>, što daje{" "}
                  <InlineMath>{"[1,\\frac{5}{2})"}</InlineMath>.
                </p>
                <MathBlock>
                  {"S=\\left(-\\frac{7}{2},\\,\\frac{5}{2}\\right)"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Za koje vrednosti parametra <InlineMath>{"p"}</InlineMath>{" "}
                jednačina <InlineMath>{"|x-2| = p"}</InlineMath> ima tačno jedno
                rešenje?
              </p>
            }
            solution={
              <p>
                Za <InlineMath>{"p<0"}</InlineMath> nema rešenja, za{" "}
                <InlineMath>{"p>0"}</InlineMath> postoje dva rešenja, a tačno
                jedno rešenje dobijaš samo kada je{" "}
                <InlineMath>{"p=0"}</InlineMath>. Tada je jedino rešenje{" "}
                <InlineMath>{"x=2"}</InlineMath>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka lekcije"
        description="Apsolutna vrednost se ne rešava napamet. Ili je čitaš kao rastojanje, ili je uklanjaš kroz pravilno postavljene intervale. U oba slučaja, ključ je isti: precizno odvoj slučajeve i poštuj uslove."
      >
        <InsightCard title="Centralni princip">
          <MathBlock>
            {
              "\\text{nule izraza u zagradama} \\;\\Longrightarrow\\; \\text{intervali} \\;\\Longrightarrow\\; \\text{linearni slučajevi} \\;\\Longrightarrow\\; \\text{presek i unija}"
            }
          </MathBlock>
          <p>
            Kada ovu logiku usvojiš, zadaci sa apsolutnom vrednošću prestaju da
            deluju haotično i postaju uredna analiza brojevne prave.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Na kraju ove lekcije treba da znaš ne samo kako se dobija odgovor, već i zašto je postupak baš takav. To je jedini siguran način da zadatak uradiš i kada oblik nije potpuno isti kao u zbirci."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Apsolutna vrednost je rastojanje</h3>
            <p>
              Izraz <InlineMath>{"|x-a|"}</InlineMath> znači udaljenost broja{" "}
              <InlineMath>{"x"}</InlineMath> od tačke{" "}
              <InlineMath>{"a"}</InlineMath>. Odatle dolaze svi osnovni obrasci i
              geometrijska intuicija.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Jedna zagrada ima standardne šeme
            </h3>
            <p>
              Za <InlineMath>{"|A(x)|=c"}</InlineMath> dobijaš dve jednačine, za{" "}
              <InlineMath>{"|A(x)| \\le c"}</InlineMath> dvostruku nejednačinu, a
              za <InlineMath>{"|A(x)| \\ge c"}</InlineMath> uniju.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Više zagrada traži intervale</h3>
            <p>
              Nule izraza u zagradama dele brojnu pravu. Na svakom intervalu
              skidaš zagrade pravilnim znakom i praviš presek sa tim intervalom.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Desna strana mora biti dozvoljena
            </h3>
            <p>
              U zadacima oblika <InlineMath>{"|A(x)| = B(x)"}</InlineMath> ili{" "}
              <InlineMath>{"|A(x)| \\le B(x)"}</InlineMath> prvo gledaš gde je{" "}
              <InlineMath>{"B(x)"}</InlineMath> nenegativno.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. Najčešća greška je formalna, ne računska
            </h3>
            <p>
              Preskočen interval, pogrešna unija ili zaboravljen uslov mnogo
              češće ruše zadatak nego samo računanje.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Posle ove teme prirodno dolaze kvadratne jednačine i nejednačine,
              gde će analiza znaka i intervala postati još važnija.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 18 zatvara linearni nivo apsolutne vrednosti: od intuicije i
          standardnih obrazaca do pune intervalne dekompozicije sa više zagrada.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
