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
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#nastanak", label: "Nastanak tela" },
  { href: "#valjak", label: "Valjak" },
  { href: "#kupa", label: "Kupa" },
  { href: "#lopta", label: "Lopta" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson47Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 47"
        title={
          <>
            Obrtna tela:{" "}
            <span className={cs.tHeroAccent}>valjak, kupa i lopta</span>
          </>
        }
        description="U stereometriji je veliki pomak kada shvatiš da mnoga 3D tela nisu 'nova čudna tela', već obične ravne figure koje su se zarotirale oko ose. Tada valjak postaje rotirani pravougaonik, kupa rotirani pravougli trougao, a lopta rotirani polukrug. Iz te slike prirodno dolaze i formule, i baš zato je ova lekcija važna za prijemni: kad razumeš nastanak tela, manje grešiš u izboru formule."
        heroImageSrc="/api/lessons/47/hero"
        heroImageAlt="Ilustracija obrtnih tela: valjak, kupa i lopta"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako 2D presek vodi do 3D formule -- iz ravne figure čitaš poluprečnik, visinu i izvodnicu.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje visine i izvodnice kod kupe -- u zapremini stoji h, a u omotaču s.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo čitanje osnog preseka -- svedi 3D problem na trougao, pravougaonik ili krug.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "65 do 90 minuta sa teorijom, laboratorijom, vođenim primerima i vežbama.",
          },
          {
            label: "Predznanje",
            description:
              "Krug, trougao, Pitagorina teorema i površine ravnih figura.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevod 3D zadatka u 2D osni presek pa tek onda formule.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija obrtnih tela sa promenljivim r i h.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Obrtna tela su most između planimetrije i stereometrije"
        description="Na prijemnom zadaci sa valjkom, kupom i loptom retko traže samo mehaničko uvrštavanje u formulu. Najčešće moraš da prepoznaš elemente tela, povežeš ih sa nekim presekom i tek onda računaš. Učenik koji razume osni presek i poreklo formula rešava zadatke sigurnije i brže nego učenik koji pokušava da sve nauči napamet."
      >
        <div className={s.grid3}>
          <SectionCard title="Za stereometriju">
            <p>
              Valjak, kupa i lopta su osnovna tela. Kasnije se javljaju u
              složenijim zadacima sa upisanim i opisanim telima.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni">
            <p>
              Tipične zamke su pogrešan izbor formule, zaboravljena baza,
              mešanje oplošja i zapremine, kao i mešanje{" "}
              <InlineMath>{"h"}</InlineMath> i{" "}
              <InlineMath>{"s"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Za intuiciju">
            <p>
              Kada zamišljaš rotaciju figure oko ose, formule postaju logične.
              To znači manje bubanja i više kontrole nad zadatkom.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključna misaona navika">
          <p>
            Kad god vidiš obrtno telo, postavi sebi tri pitanja: šta je
            poluprečnik, šta je visina i koji je najkorisniji presek? Ove tri
            stvari rešavaju veliki deo prijemnih zadataka još pre prvog računa.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. NASTANAK OBRTNIH TELA ═══════════ */}
      <LessonSection
        id="nastanak"
        eyebrow="Nastanak obrtnih tela"
        title="Tri tela, tri ravne figure, jedna ista ideja: rotacija oko ose"
        description="Obrtno telo nastaje kada ravnu figuru obrneš oko neke prave. Ta prava je osa obrtanja. Da bi učenik lakše pamtio formule, korisno je da uvek krene od pitanja: koja ravna figura se rotira i koji njen segment postaje r, h ili s?"
      >
        <div className={s.grid3}>
          <SectionCard title="Valjak: rotacija pravougaonika">
            <p>
              Ako pravougaonik rotiraš oko jedne svoje stranice, dobijaš valjak.
              Jedna stranica postaje visina <InlineMath>{"h"}</InlineMath>, a
              druga postaje poluprečnik baze <InlineMath>{"r"}</InlineMath>.
            </p>
            <MathBlock>
              {"\\text{pravougaonik} \\xrightarrow{\\text{rotacija}} \\text{valjak}"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Kupa: rotacija pravouglog trougla">
            <p>
              Kada se pravougli trougao okrene oko jedne katete, druga kateta
              postaje poluprečnik baze, a hipotenuza postaje izvodnica{" "}
              <InlineMath>{"s"}</InlineMath>.
            </p>
            <MathBlock>{"s^2 = r^2 + h^2"}</MathBlock>
          </SectionCard>
          <SectionCard title="Lopta: rotacija polukruga">
            <p>
              Polukrug koji se obrće oko svog prečnika daje loptu. Zato je kod
              lopte dovoljan samo jedan parametar: poluprečnik{" "}
              <InlineMath>{"r"}</InlineMath>.
            </p>
            <MathBlock>
              {"\\text{polukrug} \\xrightarrow{\\text{rotacija}} \\text{lopta}"}
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta je osni presek?">
            <p>
              To je presek tela ravni koja prolazi kroz osu obrtanja. U praksi
              je to najvažniji crtež za rešavanje zadatka. Kod valjka osni
              presek je pravougaonik, kod kupe jednakokraki trougao, a kod
              lopte krug.
            </p>
          </SectionCard>
          <SectionCard title="Zašto je osni presek toliko važan?">
            <p>
              Zato što iz njega najlakše očitavaš odnose među veličinama. Na
              primer, kod kupe iz osnog preseka dobijaš pravougli trougao u
              kome Pitagorina teorema povezuje <InlineMath>{"r"}</InlineMath>,{" "}
              <InlineMath>{"h"}</InlineMath> i{" "}
              <InlineMath>{"s"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto se kod lopte ne pojavljuje posebna visina h?"
          answer={
            <p>
              Zato što je lopta potpuno određena svojim poluprečnikom. Njena
              &ldquo;visina&rdquo; je uvek prečnik{" "}
              <InlineMath>{"2r"}</InlineMath>, pa nema nezavisnog parametra kao
              kod valjka i kupe.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. VALJAK ═══════════ */}
      <LessonSection
        id="valjak"
        eyebrow="Valjak"
        title="Valjak je najdirektniji model: baza puta visina za zapreminu, obim baze puta visina za omotač"
        description="Valjak ima dve podudarne kružne baze i omotač. Ako omotač 'razviješ', dobijaš pravougaonik. Upravo zato su formule za valjak najlogičnije za učenje i dobar su početak za sva ostala obrtna tela."
      >
        <div className={s.grid2}>
          <SectionCard title="Elementi valjka">
            <p>
              Osnovni elementi su poluprečnik baze{" "}
              <InlineMath>{"r"}</InlineMath> i visina{" "}
              <InlineMath>{"h"}</InlineMath>. Osa je prava koja prolazi kroz
              centre baza. Osni presek valjka je pravougaonik dimenzija{" "}
              <InlineMath>{"2r"}</InlineMath> i{" "}
              <InlineMath>{"h"}</InlineMath>.
            </p>
            <MathBlock>{"B = \\pi r^2, \\qquad O = 2\\pi r"}</MathBlock>
          </SectionCard>
          <SectionCard title="Kako nastaje omotač?">
            <p>
              Kada se bočna površina valjka razvije, dobija se pravougaonik čija
              je jedna stranica obim baze{" "}
              <InlineMath>{"2\\pi r"}</InlineMath>, a druga visina{" "}
              <InlineMath>{"h"}</InlineMath>. Zato je bočna površina:
            </p>
            <MathBlock>{"M = 2\\pi r \\cdot h = 2\\pi rh"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Bočno oplošje"
            formula={"M = 2\\pi rh"}
            note={
              <>
                Omotač je pravougaonik širine{" "}
                <InlineMath>{"2\\pi r"}</InlineMath> i visine{" "}
                <InlineMath>{"h"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Ukupno oplošje"
            formula={"P = 2\\pi r^2 + 2\\pi rh = 2\\pi r(r + h)"}
            note="Dodaješ dve baze i omotač."
          />
          <FormulaCard
            title="Zapremina"
            formula={"V = \\pi r^2 h"}
            note="Osnova je ista kao kod prizme: površina baze puta visina."
          />
        </div>

        <InsightCard title="Kako da zapamtiš bez bubanja?">
          <p>
            Kod valjka sve ide kroz bazu kruga. Za zapreminu misliš: &ldquo;kolika je
            površina baze i koliko puta se ta baza slaže po visini&rdquo;. Za omotač
            misliš: &ldquo;koliki je obim baze i kolika je visina pravougaonika kada
            ga razvijem&rdquo;.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: ako se poluprečnik udvostruči, a visina ostane ista, kako se menjaju P i V?"
          answer={
            <p>
              Zapremina se menja sa <InlineMath>{"r^2"}</InlineMath>, pa
              postaje četiri puta veća. Oplošje ne raste potpuno isto jer ima i
              član <InlineMath>{"2\\pi rh"}</InlineMath>, ali svaki deo zavisi
              od <InlineMath>{"r"}</InlineMath>, pa ukupno oplošje značajno
              raste.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. KUPA ═══════════ */}
      <LessonSection
        id="kupa"
        eyebrow="Kupa"
        title="Kod kupe moraš strogo da razlikuješ visinu h od izvodnice s"
        description="Kupa nastaje rotacijom pravouglog trougla oko jedne katete. To odmah daje dve ključne informacije: visina kupe je jedna kateta, poluprečnik baze druga kateta, a hipotenuza postaje izvodnica. Većina grešaka u ovoj lekciji nastaje upravo zato što učenik u jednom koraku koristi h, a u drugom bi morao s."
      >
        <div className={s.grid2}>
          <SectionCard title="Osni presek kupe">
            <p>
              Ako kroz osu kupe povučeš ravan, dobijaš jednakokraki trougao.
              Njegova visina je <InlineMath>{"h"}</InlineMath>, polovina baze
              je <InlineMath>{"r"}</InlineMath>, a kraka su izvodnice{" "}
              <InlineMath>{"s"}</InlineMath>. Zato važi Pitagorina teorema:
            </p>
            <MathBlock>{"s^2 = r^2 + h^2"}</MathBlock>
          </SectionCard>
          <SectionCard title="Zašto se u bočnom omotaču pojavljuje s?">
            <p>
              Kada razviješ bočnu površinu kupe, ne dobijaš trougao već kružni
              isečak poluprečnika <InlineMath>{"s"}</InlineMath>. Zbog toga se
              bočno oplošje izražava preko <InlineMath>{"r"}</InlineMath> i{" "}
              <InlineMath>{"s"}</InlineMath>, a ne preko{" "}
              <InlineMath>{"h"}</InlineMath>.
            </p>
            <MathBlock>{"M = \\pi rs"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Bočno oplošje"
            formula={"M = \\pi rs"}
            note="Omotač je kružni isečak čiji je poluprečnik izvodnica."
          />
          <FormulaCard
            title="Ukupno oplošje"
            formula={"P = \\pi r^2 + \\pi rs = \\pi r(r + s)"}
            note="Jedna baza plus bočni omotač."
          />
          <FormulaCard
            title="Zapremina"
            formula={"V = \\frac{1}{3}\\pi r^2 h"}
            note="Kupa ima trećinu zapremine valjka sa istom bazom i istom visinom."
          />
        </div>

        <InsightCard title="Tipična prijemna zamka">
          <p>
            Ako ti je data visina kupe, a traži se ukupno oplošje, ne možeš
            preskočiti računanje izvodnice. Najpre iz Pitagorine teoreme nađi{" "}
            <InlineMath>{"s"}</InlineMath>, pa tek onda koristi{" "}
            <InlineMath>{"P = \\pi r(r+s)"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto u zapremini kupe stoji h, a ne s?"
          answer={
            <p>
              Zapremina meri &ldquo;koliko prostora telo zauzima&rdquo; u smeru normalnom
              na bazu. Zato je važna prava udaljenost vrha od ravni baze, a to
              je visina <InlineMath>{"h"}</InlineMath>, ne kosa duž{" "}
              <InlineMath>{"s"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. LOPTA ═══════════ */}
      <LessonSection
        id="lopta"
        eyebrow="Lopta"
        title="Lopta je najsimetričnije obrtno telo: sve se svodi na jedan poluprečnik"
        description="Lopta nastaje rotacijom polukruga oko prečnika. Zbog potpune simetrije nema bazu i nema izvodnicu. U svim formulama dovoljan je jedan podatak: poluprečnik r."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako da je zamišljaš?">
            <p>
              Najkorisniji presek lopte ravni kroz centar jeste krug
              poluprečnika <InlineMath>{"r"}</InlineMath>. Taj krug se često
              zove veliki krug. Kada nacrtaš taj presek, lakše uočavaš prečnik{" "}
              <InlineMath>{"2r"}</InlineMath>, centar i odnose sa drugim telima.
            </p>
          </SectionCard>
          <SectionCard title="Šta treba da pamtiš?">
            <p>
              Za loptu nema &ldquo;razvijanja omotača&rdquo; kao kod valjka i kupe.
              Zato se njene formule ne izvode elementarno iz jedne ravne mreže,
              ali za prijemni je važno da ih znaš i da prepoznaš kada zadatak
              zavisi samo od <InlineMath>{"r"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Površina"
            formula={"P = 4\\pi r^2"}
            note="Površina lopte raste sa kvadratom poluprečnika."
          />
          <FormulaCard
            title="Zapremina"
            formula={"V = \\frac{4}{3}\\pi r^3"}
            note="Zapremina lopte raste sa kubom poluprečnika."
          />
          <FormulaCard
            title="Prečnik"
            formula="d = 2r"
            note="Kada je u zadatku dat prečnik, prvo ga pretvori u poluprečnik pa tek onda koristi formule."
          />
        </div>

        <InsightCard title="Koristan mentalni trik">
          <p>
            Kod lopte odmah pitaj: &ldquo;Da li mi je data površina, zapremina ili
            prečnik?&rdquo; To su tri najčešća oblika zadatka. Kad pronađeš{" "}
            <InlineMath>{"r"}</InlineMath>, ostatak je obično samo uredan
            račun.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: ako se poluprečnik lopte udvostruči, koliko puta raste površina, a koliko puta zapremina?"
          answer={
            <p>
              Površina raste četiri puta jer zavisi od{" "}
              <InlineMath>{"r^2"}</InlineMath>, a zapremina osam puta jer
              zavisi od <InlineMath>{"r^3"}</InlineMath>. Ovaj odnos se često
              koristi u poređenjima sličnih tela.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 7. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji te vode od osnovnog čitanja zadatka do sigurnog računa"
        description="U svakom primeru cilj nije samo broj na kraju. Bitno je da vidiš koji podatak prvo identifikuješ, koju formulu biraš i gde su potencijalne zamke."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Valjak sa poznatim poluprečnikom i visinom
            </h3>
            <p>
              Dat je valjak sa <InlineMath>{"r = 4"}</InlineMath> cm i{" "}
              <InlineMath>{"h = 9"}</InlineMath> cm. Izračunaj ukupno oplošje i
              zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Ukupno oplošje.">
                <MathBlock>
                  {"P = 2\\pi r(r + h) = 2\\pi \\cdot 4 \\cdot (4 + 9) = 104\\pi\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Zapremina.">
                <MathBlock>
                  {"V = \\pi r^2 h = \\pi \\cdot 4^2 \\cdot 9 = 144\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Provera jedinica.">
                <p>
                  Oplošje je u kvadratnim, zapremina u kubnim centimetrima.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Kupa -- najpre izvodnica, pa tek onda oplošje
            </h3>
            <p>
              Data je prava kupa sa <InlineMath>{"r = 5"}</InlineMath> cm i{" "}
              <InlineMath>{"h = 12"}</InlineMath> cm. Nađi izvodnicu, ukupno
              oplošje i zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izvodnica iz Pitagorine teoreme.">
                <MathBlock>
                  {"s = \\sqrt{r^2 + h^2} = \\sqrt{5^2 + 12^2} = 13\\ \\text{cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Ukupno oplošje.">
                <MathBlock>
                  {"P = \\pi r(r + s) = \\pi \\cdot 5 \\cdot (5 + 13) = 90\\pi\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zapremina.">
                <MathBlock>
                  {"V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 25 \\cdot 12 = 100\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Najvažniji korak.">
                <p>
                  Bilo je ključno da se ne pomešaju{" "}
                  <InlineMath>{"h = 12"}</InlineMath> i{" "}
                  <InlineMath>{"s = 13"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Lopta zadate površine
            </h3>
            <p>
              Površina lopte je{" "}
              <InlineMath>{"100\\pi\\ \\text{cm}^2"}</InlineMath>. Odredi
              poluprečnik i zapreminu lopte.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi poluprečnik.">
                <MathBlock>
                  {"4\\pi r^2 = 100\\pi \\implies r^2 = 25 \\implies r = 5\\ \\text{cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj zapreminu.">
                <MathBlock>
                  {"V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 125 = \\frac{500}{3}\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Poređenje valjka i kupe sa istom bazom i visinom
            </h3>
            <p>
              Valjak i kupa imaju isti poluprečnik baze{" "}
              <InlineMath>{"r"}</InlineMath> i istu visinu{" "}
              <InlineMath>{"h"}</InlineMath>. Uporedi njihove zapremine.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapremina valjka.">
                <MathBlock>{"V_{\\text{valjak}} = \\pi r^2 h"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Zapremina kupe.">
                <MathBlock>
                  {"V_{\\text{kupa}} = \\frac{1}{3}\\pi r^2 h"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Odnos.">
                <MathBlock>
                  {"V_{\\text{valjak}} : V_{\\text{kupa}} = 3 : 1"}
                </MathBlock>
                <p>
                  Ovaj odnos se često traži na prijemnom bez konkretnih brojeva.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 -- wide */}
          <article className={s.exampleCard} style={{ gridColumn: "1 / -1" }}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Kako biraš alat kada je zadatak &ldquo;zamaskiran&rdquo;
            </h3>
            <p>
              U zadatku piše da je osni presek kupe jednakokraki trougao čija je
              osnovica <InlineMath>{"10"}</InlineMath> cm, a visina{" "}
              <InlineMath>{"12"}</InlineMath> cm. Traži se zapremina kupe.
              Ovakav zadatak deluje kao planimetrija, ali je zapravo
              stereometrija.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Čitanje osnog preseka.">
                <p>
                  Iz osnog preseka vidiš da je osnovica trougla prečnik baze
                  kupe, pa je <InlineMath>{"2r = 10"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"r = 5"}</InlineMath> cm.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Visina kupe.">
                <p>
                  Visina tog trougla je upravo visina kupe, pa je{" "}
                  <InlineMath>{"h = 12"}</InlineMath> cm.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapremina.">
                <MathBlock>
                  {"V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 25 \\cdot 12 = 100\\pi\\ \\text{cm}^3"}
                </MathBlock>
                <p>
                  Glavna poenta: zadatak si rešio tek kada si ispravno pročitao
                  osni presek, a ne kada si samo znao formulu.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Formula-lista koju treba da imaš u glavi, ali sa razumevanjem šta svaka meri"
        description="Sledeća tabela nije za mehaničko pamćenje. Koristi je kao mapu: prvo odredi telo i elemente, zatim proveri da li se traži bočno oplošje, ukupno oplošje ili zapremina."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Valjak: oplošje"
            formula={"M = 2\\pi rh,\\quad P = 2\\pi r(r+h)"}
          />
          <FormulaCard
            title="Valjak: zapremina"
            formula={"V = \\pi r^2 h"}
          />
          <FormulaCard
            title="Kupa: oplošje"
            formula={"M = \\pi rs,\\quad P = \\pi r(r+s)"}
          />
          <FormulaCard
            title="Kupa: zapremina"
            formula={"V = \\frac{1}{3}\\pi r^2 h"}
          />
          <FormulaCard
            title="Kupa: izvodnica"
            formula={"s = \\sqrt{r^2 + h^2}"}
          />
          <FormulaCard
            title="Lopta: površina"
            formula={"P = 4\\pi r^2"}
          />
          <FormulaCard
            title="Lopta: zapremina"
            formula={"V = \\frac{4}{3}\\pi r^3"}
          />
          <FormulaCard
            title="Brza provera 1"
            formula={"\\text{Da li telo ima bazu?}"}
            note="Valjak i kupa imaju bazu, lopta nema. To odmah menja način razmišljanja o površini."
          />
          <FormulaCard
            title="Brza provera 2"
            formula={"h \\neq s"}
            note="Za kupu u zapremini ide h, a u bočnom omotaču s. Proveravaš ovo svaki put."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 9. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje se ponavljaju iz godine u godinu na prijemnim zadacima"
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"h"}</InlineMath> i{" "}
              <InlineMath>{"s"}</InlineMath> kod kupe
            </h3>
            <p>
              Najčešća greška. Ako se traži ukupno oplošje, a data je samo
              visina, moraš prvo naći izvodnicu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljena druga baza valjka
            </h3>
            <p>
              U ukupnom oplošju valjka učenici često napišu{" "}
              <InlineMath>{"\\pi r^2 + 2\\pi rh"}</InlineMath>, a zaborave da
              postoje dve baze.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje oplošja i zapremine</h3>
            <p>
              Broj sa jedinicama{" "}
              <InlineMath>{"\\text{cm}^2"}</InlineMath> ne može biti zapremina.
              Ova kontrola treba da ti postane automatska.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Prečnik se koristi kao poluprečnik
            </h3>
            <p>
              Kod lopte i valjka često je dat prečnik. Pre računanja obavezno
              pređi na <InlineMath>{"r = \\frac{d}{2}"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešno čitanje osnog preseka</h3>
            <p>
              U osnom preseku kupe osnovica trougla predstavlja prečnik baze, ne
              poluprečnik.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Preskakanje logike iza formule
            </h3>
            <p>
              Kada ne znaš odakle formula dolazi, lako ubaciš pogrešan broj.
              Uvek probaj da je povežeš sa bazom ili presekom.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 10. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema najčešće pojavljuje na ispitu i šta moraš odmah da proveriš"
        description="Obrtna tela na prijemnom dolaze u nekoliko tipičnih oblika. Dobra vest je da svaki od tih oblika ima jasan obrazac čitanja."
      >
        <div className={s.grid3}>
          <SectionCard title="Direktno zadate mere">
            <p>
              Data su <InlineMath>{"r"}</InlineMath> i{" "}
              <InlineMath>{"h"}</InlineMath>, a traži se oplošje ili zapremina.
              Ovo je najosnovniji tip i služi da proveri tehničku sigurnost.
            </p>
          </SectionCard>
          <SectionCard title="Zadatak preko preseka">
            <p>
              Dat je osni presek. Tada moraš iz preseka vratiti{" "}
              <InlineMath>{"r"}</InlineMath>,{" "}
              <InlineMath>{"h"}</InlineMath> ili{" "}
              <InlineMath>{"s"}</InlineMath>, pa tek onda primeniti
              stereometrijsku formulu.
            </p>
          </SectionCard>
          <SectionCard title="Poređenje tela">
            <p>
              Često se traži odnos zapremina ili površina dva tela sa istim
              poluprečnikom, prečnikom ili visinom.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemna strategija u četiri koraka">
          <p>
            1. Prepoznaj telo. 2. Obeleži <InlineMath>{"r"}</InlineMath>,{" "}
            <InlineMath>{"h"}</InlineMath>, eventualno{" "}
            <InlineMath>{"s"}</InlineMath>. 3. Pročitaj da li zadatak traži
            bočni deo, ukupno oplošje ili zapreminu. 4. Na kraju proveri
            jedinice i da li si možda koristio prečnik umesto poluprečnika.
          </p>
        </InsightCard>

        <InsightCard title="Završni uvid pre vežbi">
          <p>
            Ako jedan stereometrijski zadatak ne umeš da &ldquo;spustiš&rdquo; na
            pravougaonik, trougao ili krug, gotovo sigurno još nisi našao pravi
            ugao gledanja. Upravo to spuštanje sa 3D na 2D je centralna veština
            ove lekcije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li znaš da prepoznaš telo, odabereš formulu i dovršiš račun"
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Valjak ima poluprečnik baze <InlineMath>{"3"}</InlineMath> cm i
                visinu <InlineMath>{"10"}</InlineMath> cm. Izračunaj ukupno
                oplošje i zapreminu.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"P = 2\\pi r(r + h) = 2\\pi \\cdot 3 \\cdot 13 = 78\\pi\\ \\text{cm}^2"}
                </MathBlock>
                <MathBlock>
                  {"V = \\pi r^2 h = \\pi \\cdot 9 \\cdot 10 = 90\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Kupa ima poluprečnik baze <InlineMath>{"6"}</InlineMath> cm i
                visinu <InlineMath>{"8"}</InlineMath> cm. Nađi izvodnicu i
                ukupno oplošje.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"s = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\ \\text{cm}"}
                </MathBlock>
                <MathBlock>
                  {"P = \\pi r(r + s) = \\pi \\cdot 6 \\cdot 16 = 96\\pi\\ \\text{cm}^2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Površina lopte iznosi{" "}
                <InlineMath>{"36\\pi\\ \\text{cm}^2"}</InlineMath>. Odredi njen
                poluprečnik i zapreminu.
              </p>
            }
            solution={
              <>
                <p>
                  Iz <InlineMath>{"4\\pi r^2 = 36\\pi"}</InlineMath> sledi{" "}
                  <InlineMath>{"r^2 = 9"}</InlineMath>, pa je{" "}
                  <InlineMath>{"r = 3"}</InlineMath> cm.
                </p>
                <MathBlock>
                  {"V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Valjak i kupa imaju istu bazu i istu visinu. Koliko puta je
                zapremina valjka veća od zapremine kupe?
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"V_{\\text{valjak}} = \\pi r^2 h,\\quad V_{\\text{kupa}} = \\frac{1}{3}\\pi r^2 h"}
                </MathBlock>
                <p>Zato je zapremina valjka tri puta veća.</p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Osni presek valjka je pravougaonik stranica{" "}
                <InlineMath>{"12"}</InlineMath> cm i{" "}
                <InlineMath>{"7"}</InlineMath> cm. Odredi zapreminu valjka ako
                je duža stranica visina.
              </p>
            }
            solution={
              <>
                <p>
                  U osnom preseku jedna stranica je visina, a druga je prečnik
                  baze. Dakle <InlineMath>{"h = 12"}</InlineMath> cm i{" "}
                  <InlineMath>{"2r = 7"}</InlineMath> cm, pa je{" "}
                  <InlineMath>{"r = 3{,}5"}</InlineMath> cm.
                </p>
                <MathBlock>
                  {"V = \\pi r^2 h = \\pi \\cdot 3{,}5^2 \\cdot 12 = 147\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako ti je sledećih šest stavki jasno, formule za obrtna tela prestaju da budu teret i postaju alat."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Nastanak tela</h3>
            <p>
              Valjak, kupa i lopta nastaju rotacijom ravnih figura, pa svaki
              zadatak pokušaj prvo da svedeš na osni presek.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Valjak</h3>
            <p>
              Pamtiš: <InlineMath>{"P = 2\\pi r(r + h)"}</InlineMath> i{" "}
              <InlineMath>{"V = \\pi r^2 h"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Kupa</h3>
            <p>
              Presudno je da razlikuješ visinu <InlineMath>{"h"}</InlineMath> i
              izvodnicu <InlineMath>{"s"}</InlineMath>:{" "}
              <InlineMath>{"P = \\pi r(r + s)"}</InlineMath>,{" "}
              <InlineMath>{"V = \\frac{1}{3}\\pi r^2 h"}</InlineMath>,{" "}
              <InlineMath>{"s^2 = r^2 + h^2"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Lopta</h3>
            <p>
              Sve zavisi samo od <InlineMath>{"r"}</InlineMath>:{" "}
              <InlineMath>{"P = 4\\pi r^2"}</InlineMath>,{" "}
              <InlineMath>{"V = \\frac{4}{3}\\pi r^3"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Najčešće greške</h3>
            <p>
              Na prijemnom najčešće greške nisu u teškom računu, nego u pogrešnom
              čitanju preseka, zaboravljenom poluprečniku ili pomešanim
              jedinicama.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći korak</h3>
            <p>
              Sledeći logičan korak je rešavanje zadataka sa upisanim i opisanim
              telima, gde je baš osni presek glavni alat.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 47 zatvara osnovni ciklus o obrtnim telima: od nastanka
          rotacijom do sigurnog rada sa formulama za valjak, kupu i loptu.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
