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
import EuclidLab from "./EuclidLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Deljivost i prosti" },
  { href: "#nzd", label: "NZD i NZS" },
  { href: "#kongruencije", label: "Kongruencije" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključni zapisi" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
];

export default function Lesson6Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 6"
        title={
          <>
            Deljivost celih brojeva{" "}
            <span className={cs.tHeroAccent}>
              kongruencije i Euklidov algoritam
            </span>
          </>
        }
        description="Ova lekcija pretvara ostatke pri deljenju u ozbiljan alat. Učiš kako da razdvojiš proste i složene brojeve, kako da brzo nađeš NZD i NZS, i kako da modularno razmišljaš kada tražiš poslednju cifru ili ispituješ ostatke."
        heroImageSrc="/images/lessons/lesson6_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa deljivošću, ostacima i algoritmima"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da rastaviš broj na proste činioce, primeniš Euklidov algoritam i čitaš kongruenciju kao jednakost ostataka.",
          },
          {
            label: "Najveća zamka",
            description:
              "mešanje delioca i sadržalaca, kao i prerano zaustavljanje Euklidovog algoritma pre poslednjeg nenultog ostatka.",
          },
          {
            label: "Prijemni fokus",
            description:
              "zadaci sa NZD/NZS, ostacima pri deljenju i poslednjom cifrom velikog stepena broja.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "45 do 60 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "osnovne operacije sa celim brojevima i siguran rad sa brojevnim izrazima",
          },
          {
            label: "Glavna veština",
            description:
              "traženje NZD i NZS, čitanje ostataka i prepoznavanje perioda u modularnim zadacima",
          },
          {
            label: "Interaktivno",
            description:
              "canvas simulator Euklidovog algoritma sa kongruencijama po zadatom modulu",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE OVA LEKCIJA VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zašto je ova lekcija važna"
        title="Teorija brojeva trenira preciznost koja se kasnije traži svuda"
        description="Deljivost izgleda elementarno, ali upravo ovde se uči disciplina rada sa ostatkom, faktorima i redom koraka. To je osnova za zadatke sa poslednjom cifrom, parametarskim uslovima i svim situacijama gde moraš da zaključiš nešto o broju bez njegovog direktnog računanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se ova tema vraća kasnije">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u kongruencijama i ostacima pri deljenju
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u zadacima sa periodama i poslednjom cifrom stepena
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u racionalnim izrazima i razlaganju na faktore, gde NZD i NZS
                ubrzavaju računanje
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                ETF i MATF često imaju zadatke sa ostacima i modularnim obrascima
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                brzo nalaženje NZD i NZS štedi vreme u složenijim numeričkim zadacima
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                pogrešan ostatak ili loše vođen Euklidov algoritam lako obori ceo
                zadatak
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Glavna poruka">
          <p>
            Ako naučiš da misliš u deliocima, faktorima i ostacima, mnogo ređe
            ćeš računati &bdquo;na silu&ldquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. DELJIVOST I PROSTI BROJEVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Deljivost i prosti brojevi"
        title="Od zapisa a | b do faktorizacije na proste činioce"
        description="Deljivost je precizan način da kažeš da jedan broj ulazi u drugi bez ostatka. Iz te jedne ideje nastaju prosti brojevi, rastavljanje na činioce i kasnije NZD i NZS."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta znači a | b">
            <MathBlock>
              {"a \\mid b \\Longleftrightarrow \\exists k \\in \\mathbb{Z} \\text{ tako da je } b = ak"}
            </MathBlock>
            <p>
              Čita se: broj <InlineMath>{"a"}</InlineMath> deli broj{" "}
              <InlineMath>{"b"}</InlineMath>. To znači da pri deljenju broja{" "}
              <InlineMath>{"b"}</InlineMath> brojem <InlineMath>{"a"}</InlineMath>{" "}
              nema ostatka.
            </p>
          </SectionCard>

          <SectionCard title="Prosti i složeni brojevi">
            <p>
              Prirodan broj veći od <InlineMath>{"1"}</InlineMath> je prost ako ima
              tačno dva pozitivna delioca: <InlineMath>{"1"}</InlineMath> i samog
              sebe. Ako ih ima više, broj je složen.
            </p>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <strong>Primer:</strong>{" "}
                <InlineMath>{"13"}</InlineMath> je prost, a{" "}
                <InlineMath>{"12"}</InlineMath> je složen.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <strong>Važna napomena:</strong> broj{" "}
                <InlineMath>{"1"}</InlineMath> nije ni prost ni složen.
              </div>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Faktorizacija na proste činioce">
            <MathBlock>{"84 = 2^2 \\cdot 3 \\cdot 7"}</MathBlock>
            <p>
              Rastavljanje na proste činioce je osnovna &bdquo;lična karta&ldquo;
              broja. Iz nje se lako čitaju delioci, NZD i NZS.
            </p>
          </SectionCard>

          <SectionCard title="Korisni testovi deljivosti">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                sa <InlineMath>{"2"}</InlineMath>: poslednja cifra je parna
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                sa <InlineMath>{"3"}</InlineMath>: zbir cifara je deljiv sa{" "}
                <InlineMath>{"3"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                sa <InlineMath>{"5"}</InlineMath>: poslednja cifra je{" "}
                <InlineMath>{"0"}</InlineMath> ili <InlineMath>{"5"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                sa <InlineMath>{"9"}</InlineMath>: zbir cifara je deljiv sa{" "}
                <InlineMath>{"9"}</InlineMath>
              </div>
            </div>
          </SectionCard>
        </div>

        <MathBlock>{"360 = 2^3 \\cdot 3^2 \\cdot 5"}</MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Kada broj rastaviš na proste činioce, dobijaš preglednu strukturu umesto
          jedne &bdquo;zbijene&ldquo; cifarske forme.
        </p>

        <MicroCheck
          question="Mikro-provera: zašto broj 1 nije prost?"
          answer={
            <p>
              Zato što prost broj mora imati tačno dva pozitivna delioca. Broj{" "}
              <InlineMath>{"1"}</InlineMath> ima samo jednog pozitivnog delioca: samog
              sebe.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. NZD, NZS I EUKLIDOV ALGORITAM ═══════════ */}
      <LessonSection
        id="nzd"
        eyebrow="3. NZD, NZS i Euklidov algoritam"
        title="Najveći zajednički delilac dolazi iz ostataka, ne iz pogađanja"
        description="NZD i NZS su dva lica istog odnosa među brojevima. Jedan govori koliki je najveći zajednički delilac, a drugi koliki je najmanji zajednički sadržalac. Euklidov algoritam je najbrži sistematičan put do NZD-a."
      >
        <div className={s.grid2}>
          <SectionCard title="Najveći zajednički delilac">
            <MathBlock>{"\\operatorname{NZD}(a,b)"}</MathBlock>
            <p>
              To je najveći prirodan broj koji deli i{" "}
              <InlineMath>{"a"}</InlineMath> i <InlineMath>{"b"}</InlineMath>. Ako je
              NZD jednak <InlineMath>{"1"}</InlineMath>, brojevi su uzajamno prosti.
            </p>
          </SectionCard>

          <SectionCard title="Najmanji zajednički sadržalac">
            <MathBlock>{"\\operatorname{NZS}(a,b)"}</MathBlock>
            <p>
              To je najmanji prirodan broj koji je deljiv i sa{" "}
              <InlineMath>{"a"}</InlineMath> i sa <InlineMath>{"b"}</InlineMath>.
              Važan je pri sabiranju razlomaka i usklađivanju perioda.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Korak Euklidovog algoritma">
            <MathBlock>{"a = bq + r,\\qquad 0 \\le r < b"}</MathBlock>
            <p>
              Zatim umesto para <InlineMath>{"(a,b)"}</InlineMath> posmatraš par{" "}
              <InlineMath>{"(b,r)"}</InlineMath>. Postupak se ponavlja dok ostatak ne
              postane nula.
            </p>
          </SectionCard>

          <SectionCard title="Formula između NZD i NZS">
            <MathBlock>
              {"\\operatorname{NZD}(a,b)\\cdot \\operatorname{NZS}(a,b)=|ab|"}
            </MathBlock>
            <p>
              Za pozitivne cele brojeve ova formula daje najbrži prelaz sa NZD-a na
              NZS i obrnuto.
            </p>
          </SectionCard>
        </div>

        <MathBlock>{"84 = 30 \\cdot 2 + 24"}</MathBlock>
        <MathBlock>{"30 = 24 \\cdot 1 + 6"}</MathBlock>
        <MathBlock>{"24 = 6 \\cdot 4 + 0"}</MathBlock>
        <MathBlock>{"\\operatorname{NZD}(84,30)=6"}</MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Poslednji nenulti ostatak je traženi NZD. To je signal da algoritam nije
          &bdquo;serija podela&ldquo;, nego pažljivo vođen niz ostataka.
        </p>

        <MicroCheck
          question="Mikro-provera: ako je NZD(a,b)=1, da li to znači da je jedan od brojeva nužno prost?"
          answer={
            <p>
              Ne znači. Na primer, <InlineMath>{"8"}</InlineMath> i{" "}
              <InlineMath>{"9"}</InlineMath> su uzajamno prosti, ali ni jedan ni
              drugi nije prost.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. KONGRUENCIJE I OSTACI ═══════════ */}
      <LessonSection
        id="kongruencije"
        eyebrow="4. Kongruencije i ostaci"
        title="Kongruencija znači da dva broja ostavljaju isti ostatak"
        description="Modularno razmišljanje ne gleda ceo broj, nego njegov ostatak pri deljenju izabranim modulom. Upravo to omogućava elegantna rešenja zadataka sa poslednjom cifrom i periodama stepena."
      >
        <div className={s.grid2}>
          <SectionCard title="Definicija kongruencije">
            <MathBlock>
              {
                "a \\equiv b \\pmod m \\Longleftrightarrow m \\mid (a-b)"
              }
            </MathBlock>
            <p>
              To je isto što i tvrdnja da <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath> daju isti ostatak pri deljenju sa{" "}
              <InlineMath>{"m"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kako se čita ostatak">
            <MathBlock>{"17 \\equiv 5 \\pmod{12}"}</MathBlock>
            <p>
              Pošto važi <InlineMath>{"17-5=12"}</InlineMath>, razlika je deljiva sa{" "}
              <InlineMath>{"12"}</InlineMath>. Zato su <InlineMath>{"17"}</InlineMath>{" "}
              i <InlineMath>{"5"}</InlineMath> u istoj klasi ostataka modulo{" "}
              <InlineMath>{"12"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Klase ostataka modulo 10">
            <p>
              Ako te zanima poslednja cifra broja, dovoljno je da radiš modulo{" "}
              <InlineMath>{"10"}</InlineMath>, jer poslednja cifra i ostatak pri
              deljenju sa <InlineMath>{"10"}</InlineMath> nose istu informaciju.
            </p>
          </SectionCard>

          <SectionCard title="Zašto se cifre stepena ponavljaju">
            <MathBlock>
              {
                "7^1 \\equiv 7,\\; 7^2 \\equiv 9,\\; 7^3 \\equiv 3,\\; 7^4 \\equiv 1 \\pmod{10}"
              }
            </MathBlock>
            <p>
              Ostatci ulaze u ciklus. Kada vidiš periodu, ne moraš računati ceo
              veliki stepen.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški trik">
          <p>
            Kongruenciju uvek čitaj kao &bdquo;isti ostatak&ldquo;, a ne samo kao
            novi simbol za jednakost.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li iz 29 ≡ 5 (mod 12) sledi da su brojevi jednaki?"
          answer={
            <p>
              Ne. Sledi samo da imaju isti ostatak pri deljenju sa{" "}
              <InlineMath>{"12"}</InlineMath>. Jednaki bi bili samo kada bi imali istu
              vrednost, a ovde je razlika <InlineMath>{"24"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNI LABORATORIJUM ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="5. Interaktivni laboratorijum"
        title="Prati korake Euklidovog algoritma i odmah proveri kongruencije"
        description="Izaberi par brojeva ili unesi svoj. Canvas prikazuje svaki korak oblika a = bq + r, dok desno automatski dobijaš NZD, NZS, faktorizaciju i ostatke modulo zadatog broja."
      >
        <EuclidLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam izračunaš NZD pa tek onda proveri ekran. Menjaj
            parove i gledaj kako se broj koraka smanjuje kada su brojevi bliski.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="6. Vođeni primeri"
        title="Tri tipična pitanja koja moraš umeti da rešiš"
        description="Svaki primer naglašava drugu vrstu misaonog poteza: faktorizaciju, algoritam ili modularnu periodu."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Faktorizacija i NZD/NZS</h3>
            <p>
              Nađi NZD i NZS brojeva <InlineMath>{"360"}</InlineMath> i{" "}
              <InlineMath>{"84"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title={<><InlineMath>{"360 = 2^3 \\cdot 3^2 \\cdot 5"}</InlineMath></>} />
              <WalkStep number={2} title={<><InlineMath>{"84 = 2^2 \\cdot 3 \\cdot 7"}</InlineMath></>} />
              <WalkStep
                number={3}
                title="Za NZD uzimaš zajedničke proste činioce sa manjim eksponentima."
              >
                <MathBlock>{"2^2 \\cdot 3 = 12"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={4}
                title="Za NZS uzimaš sve prisutne činioce sa većim eksponentima."
              >
                <MathBlock>{"2^3 \\cdot 3^2 \\cdot 5 \\cdot 7 = 2520"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Euklidov algoritam bez preskakanja koraka
            </h3>
            <p>
              Nađi <InlineMath>{"\\operatorname{NZD}(252,198)"}</InlineMath>.
            </p>
            <MathBlock>{"252 = 198 \\cdot 1 + 54"}</MathBlock>
            <MathBlock>{"198 = 54 \\cdot 3 + 36"}</MathBlock>
            <MathBlock>{"54 = 36 \\cdot 1 + 18"}</MathBlock>
            <MathBlock>{"36 = 18 \\cdot 2 + 0"}</MathBlock>
            <MathBlock>{"\\operatorname{NZD}(252,198)=18"}</MathBlock>
            <p>
              Ne zaustavljaj se kod prvog &bdquo;lepog&ldquo; broja. Staješ tek kada
              ostatak postane nula.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Poslednja cifra velikog stepena</h3>
            <p>
              Odredi poslednju cifru broja <InlineMath>{"7^{23}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={<>Radi modulo <InlineMath>{"10"}</InlineMath>, jer te zanima poslednja cifra.</>}
              />
              <WalkStep
                number={2}
                title={<>Perioda za stepene broja <InlineMath>{"7"}</InlineMath> modulo <InlineMath>{"10"}</InlineMath> je <InlineMath>{"7,9,3,1"}</InlineMath>, dužine <InlineMath>{"4"}</InlineMath>.</>}
              />
              <WalkStep
                number={3}
                title={<>Pošto je <InlineMath>{"23 \\equiv 3 \\pmod{4}"}</InlineMath>, uzimaš treći član ciklusa.</>}
              />
            </div>
            <MathBlock>{"7^{23} \\equiv 7^3 \\equiv 3 \\pmod{10}"}</MathBlock>
            <p>
              Poslednja cifra je <InlineMath>{"3"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. KLJUČNI ZAPISI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="7. Ključni zapisi"
        title="Formule i rečenice koje treba da razumeš bez zastoja"
        description="Ove kartice služe da povežeš simbol sa značenjem i tipičnom upotrebom u zadatku."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovna definicija"
            formula={"a \\mid b \\Longleftrightarrow b = ak"}
            note={<>Nema ostatka pri deljenju broja <InlineMath>{"b"}</InlineMath> brojem <InlineMath>{"a"}</InlineMath>.</>}
          />
          <FormulaCard
            title="Tačno dva pozitivna delioca"
            formula={"p>1,\\quad p \\text{ je prost } \\Longleftrightarrow \\text{delioci su } 1 \\text{ i } p"}
            note={<>Broj <InlineMath>{"1"}</InlineMath> nije prost i to moraš izričito pamtiti.</>}
          />
          <FormulaCard
            title="Korak sa ostatkom"
            formula={"a = bq + r,\\qquad 0 \\le r < b"}
            note={<>Par <InlineMath>{"(a,b)"}</InlineMath> zamenjuješ parom <InlineMath>{"(b,r)"}</InlineMath>.</>}
          />
          <FormulaCard
            title="Veza preko proizvoda"
            formula={"\\operatorname{NZD}(a,b)\\cdot \\operatorname{NZS}(a,b)=|ab|"}
            note="Za pozitivne brojeve ovo je najbrža veza između dve veličine."
          />
          <FormulaCard
            title="Isti ostatak"
            formula={"a \\equiv b \\pmod m \\Longleftrightarrow m \\mid (a-b)"}
            note={<>Kongruentni brojevi ne moraju biti jednaki, ali imaju isti ostatak modulo <InlineMath>{"m"}</InlineMath>.</>}
          />
          <FormulaCard
            title="Poseban slučaj"
            formula={"\\operatorname{NZD}(a,b)=1"}
            note={<>Tada brojevi nemaju zajedničke proste činioce osim <InlineMath>{"1"}</InlineMath>.</>}
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="8. Česte greške"
        title="Greške koje redovno kvare zadatke iz deljivosti"
        description="Ovo nisu opšti saveti, nego konkretni padovi koncentracije koji se stalno ponavljaju."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Broj <InlineMath>{"1"}</InlineMath> se proglašava prostim
            </h3>
            <p>
              Nije prost, jer nema tačno dva pozitivna delioca. Ovo je standardna
              zamka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              NZS se automatski uzima kao proizvod
            </h3>
            <p>
              To važi samo za uzajamno proste brojeve. U suprotnom moraš uračunati
              zajedničke činioce pravilno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Euklidov algoritam se prekida prerano
            </h3>
            <p>
              Tačan odgovor je poslednji nenulti ostatak, ne prvi mali ili
              &bdquo;simpatičan&ldquo; broj koji se pojavi usput.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kongruencija se čita kao obična jednakost
            </h3>
            <p>
              Iz <InlineMath>{"29 \\equiv 5 \\pmod{12}"}</InlineMath> ne sledi da je{" "}
              <InlineMath>{"29=5"}</InlineMath>, nego samo da imaju isti ostatak
              modulo <InlineMath>{"12"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. VEZA SA PRIJEMNIM ZADACIMA ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="9. Veza sa prijemnim zadacima"
        title="Kako se ova tema zaista pojavljuje na ispitima"
        description="Na težim prijemnim zadacima retko se traži samo jedna definicija. Obično moraš da spojiš više ideja: ostatke, periodu, prost rastav ili Euklidov algoritam."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipične forme zadataka">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                poslednja cifra ili ostatak velikog stepena
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                traženje NZD i NZS velikih brojeva
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                poređenje ostataka preko kongruencija
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                parametarski uslovi koji skrivaju deljivost
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Prijemni kontrolna lista">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                1. proveri da li treba faktorizacija ili Euklid
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                2. ako je zadatak o cifri, misli modulo <InlineMath>{"10"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                3. traži periodu ostataka umesto direktnog računanja
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                4. rezultat na kraju proveri povratno kroz deljivost
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Kada vidiš ogroman stepen ili nezgodan ostatak, prvo pitaj &bdquo;koji
            je pravi modul?&ldquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="10. Vežbe"
        title="Kratka provera razumevanja"
        description="Reši samostalno, pa tek onda otvori rešenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Prost ili složen"
            problem={
              <p>
                Odredi da li je broj <InlineMath>{"91"}</InlineMath> prost ili složen.
              </p>
            }
            solution={
              <>
                <MathBlock>{"91 = 7 \\cdot 13"}</MathBlock>
                <p>
                  Broj <InlineMath>{"91"}</InlineMath> je složen, jer ima bar još
                  delioca pored <InlineMath>{"1"}</InlineMath> i samog sebe.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2: NZD i NZS"
            problem={
              <p>
                Nađi <InlineMath>{"\\operatorname{NZD}(72,90)"}</InlineMath> i{" "}
                <InlineMath>{"\\operatorname{NZS}(72,90)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"72 = 2^3\\cdot 3^2,\\qquad 90 = 2\\cdot 3^2 \\cdot 5"}
                </MathBlock>
                <MathBlock>{"\\operatorname{NZD}(72,90)=2\\cdot 3^2=18"}</MathBlock>
                <MathBlock>
                  {"\\operatorname{NZS}(72,90)=2^3\\cdot 3^2\\cdot 5=360"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Kongruencija"
            problem={
              <p>
                Proveri da li važi{" "}
                <InlineMath>{"47 \\equiv 11 \\pmod{12}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"47-11=36"}</MathBlock>
                <p>
                  Pošto je <InlineMath>{"36"}</InlineMath> deljivo sa{" "}
                  <InlineMath>{"12"}</InlineMath>, zaista važi{" "}
                  <InlineMath>{"47 \\equiv 11 \\pmod{12}"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Poslednja cifra"
            problem={
              <p>
                Odredi poslednju cifru broja <InlineMath>{"3^{25}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "3^1 \\equiv 3,\\; 3^2 \\equiv 9,\\; 3^3 \\equiv 7,\\; 3^4 \\equiv 1 \\pmod{10}"
                  }
                </MathBlock>
                <MathBlock>{"25 \\equiv 1 \\pmod{4}"}</MathBlock>
                <MathBlock>{"3^{25} \\equiv 3^1 \\equiv 3 \\pmod{10}"}</MathBlock>
                <p>
                  Poslednja cifra je <InlineMath>{"3"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Glavni uvid lekcije"
        title="Ostatak nije sporedan podatak"
        description="Preko ostatka vodiš Euklidov algoritam, preko ostatka čitaš kongruenciju, a preko ostatka rešavaš i zadatke sa poslednjom cifrom."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "a = bq + r \\qquad \\Longrightarrow \\qquad \\text{ostatak vodi sledeći korak razmišljanja}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        eyebrow="11. Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako ove tvrdnje možeš samostalno da objasniš, lekcija je dobro savladana."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Deljivost</h3>
            <p>
              Zapis <InlineMath>{"a \\mid b"}</InlineMath> znači da pri deljenju
              broja <InlineMath>{"b"}</InlineMath> brojem{" "}
              <InlineMath>{"a"}</InlineMath> nema ostatka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Prosti brojevi</h3>
            <p>
              Prost broj ima tačno dva pozitivna delioca, a broj{" "}
              <InlineMath>{"1"}</InlineMath> nije ni prost ni složen.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Faktorizacija</h3>
            <p>
              Rastavljanje na proste činioce pomaže da brzo čitaš delioce, NZD i
              NZS.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Euklidov algoritam</h3>
            <p>
              Završava se kada ostatak postane nula; poslednji nenulti ostatak je
              NZD.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. NZD i NZS</h3>
            <p>
              Za pozitivne brojeve važi{" "}
              <InlineMath>
                {"\\operatorname{NZD}(a,b)\\cdot\\operatorname{NZS}(a,b)=ab"}
              </InlineMath>
              .
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Kongruencije</h3>
            <p>
              Kongruencija <InlineMath>{"a \\equiv b \\pmod m"}</InlineMath> znači da{" "}
              <InlineMath>{"a"}</InlineMath> i <InlineMath>{"b"}</InlineMath> daju
              isti ostatak modulo <InlineMath>{"m"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>7. Prijemni fokus</h3>
            <p>
              Za zadatke sa poslednjom cifrom i velikim stepenima najvažnije je da
              pronađeš pravi modul i periodu ostataka.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je rad sa razmerama i proporcijama, gde se
          preciznost iz deljivosti prenosi na postavljanje i transformaciju odnosa.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
