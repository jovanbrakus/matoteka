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
import RelationMatrixLab from "./RelationMatrixLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#svojstva", label: "Svojstva" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#ekvivalencija", label: "Ekvivalencija" },
  { href: "#poredak", label: "Poredak" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
];

export default function Lesson3Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 3"
        title={
          <>
            Binarne relacije{" "}
            <span className={cs.tHeroAccent}>ekvivalencija i poredak</span>
          </>
        }
        description="Relacija govori koji su uređeni parovi dozvoljeni. Iz te jednostavne ideje nastaju klase ekvivalencije, poredak brojeva, matrice relacije i veliki deo jezika kojim matematika opisuje strukturu nekog skupa."
        heroImageSrc="/images/lessons/lesson3_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa relacijama i strukturama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da relaciju čitaš kao podskup skupa A\u00D7A i kako da proveriš njena svojstva.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje simetričnosti i antisimetričnosti, i brzopleto proglašavanje relacije poretkom.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Ispitivanje svojstava, nalaženje klasa ekvivalencije i razlikovanje parcijalnog od linearnog poretka.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "35 do 45 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "Skupovi, Kartezijev proizvod i osnovna logička preciznost",
          },
          {
            label: "Glavna veština",
            description:
              "Sistemsko ispitivanje refleksivnosti, simetričnosti, antisimetričnosti i tranzitivnosti",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas matrica relacije sa automatskom analizom osobina",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Relacije uvode strukturu u skup"
        description="Skup sam po sebi samo okuplja elemente. Relacija kaže kako su ti elementi povezani: kada su ekvivalentni, kada je jedan manji od drugog, kada jedan deli drugi ili kada neki uređeni par jednostavno nije dozvoljen."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se relacije pojavljuju kasnije">
            <ul>
              <li>u kongruencijama i radu sa ostacima pri deljenju</li>
              <li>
                u uređivanju realnih brojeva preko odnosa{" "}
                <InlineMath>{"\\le"}</InlineMath> i{" "}
                <InlineMath>{"\\ge"}</InlineMath>
              </li>
              <li>
                u funkcijama, jer se funkcija može posmatrati kao posebna vrsta
                relacije
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <ul>
              <li>
                često se traži da proveriš da li je data relacija ekvivalencija
                ili poredak
              </li>
              <li>
                klase ekvivalencije se javljaju kroz ostatke pri deljenju
              </li>
              <li>
                poredak se krije iza pitanja o uporedivosti, minimumu i
                maksimumu
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Glavna misaona promena">
          <p>
            Kada vidiš relaciju, nemoj prvo pitati &ldquo;šta znači
            znak&rdquo;, nego &ldquo;koje uređene parove ova relacija
            prihvata&rdquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja"
        title="Relacija je podskup Kartezijevog proizvoda"
        description={
          "Ako su A i B skupovi, binarna relacija između njih je bilo koji podskup skupa A\u00D7B. Kada radimo svojstva kao što su refleksivnost i tranzitivnost, najčešće posmatramo relaciju na istom skupu, pa je R \u2286 A\u00D7A."
        }
      >
        <div className={s.grid3}>
          <SectionCard title="Formalni zapis">
            <MathBlock>{"R \\subseteq A \\times A"}</MathBlock>
            <p>
              Svaki element relacije je uređeni par{" "}
              <InlineMath>{"(a,b)"}</InlineMath>. Ako je taj par u relaciji,
              pišemo <InlineMath>{"aRb"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Šta znači aRb">
            <p>
              To znači da uređeni par <InlineMath>{"(a,b)"}</InlineMath>{" "}
              pripada relaciji <InlineMath>{"R"}</InlineMath>. Nije dovoljno da
              su <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath> samo elementi skupa; mora baš par{" "}
              <InlineMath>{"(a,b)"}</InlineMath> da bude izabran.
            </p>
            <p style={{ marginTop: 10 }}>
              <strong>Primer:</strong> ako je{" "}
              <InlineMath>{"R = \\{(1,1),(1,2)\\}"}</InlineMath>, onda važi{" "}
              <InlineMath>{"1R2"}</InlineMath>, ali ne važi{" "}
              <InlineMath>{"2R1"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kako se relacija prikazuje">
            <ul>
              <li>kao skup uređenih parova</li>
              <li>kao matrica relacije</li>
              <li>
                kao uslov, na primer{" "}
                <InlineMath>{"a \\equiv b \\pmod{3}"}</InlineMath> ili{" "}
                <InlineMath>{"a \\le b"}</InlineMath>
              </li>
            </ul>
          </SectionCard>
        </div>

        <MathBlock>
          {"A = \\{1,2,3\\}, \\qquad R = \\{(1,1),(1,2),(2,2),(3,3)\\}"}
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Ovde važe <InlineMath>{"1R1"}</InlineMath>,{" "}
          <InlineMath>{"1R2"}</InlineMath>, <InlineMath>{"2R2"}</InlineMath>,{" "}
          <InlineMath>{"3R3"}</InlineMath>, ali ne važi{" "}
          <InlineMath>{"2R1"}</InlineMath> jer par{" "}
          <InlineMath>{"(2,1)"}</InlineMath> nije naveden.
        </p>

        <MicroCheck
          question="Mikro-provera: ako je R \u2286 A\u00D7A, da li iz a \u2208 A i b \u2208 A automatski sledi aRb?"
          answer={
            <p>
              Ne. To samo znači da je par <InlineMath>{"(a,b)"}</InlineMath>{" "}
              kandidat da bude u relaciji. Tek ako zaista važi{" "}
              <InlineMath>{"(a,b) \\in R"}</InlineMath>, možemo da pišemo{" "}
              <InlineMath>{"aRb"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. ČETIRI KLJUČNA SVOJSTVA ═══════════ */}
      <LessonSection
        id="svojstva"
        eyebrow="Četiri ključna svojstva"
        title="Kako se relacija testira korak po korak"
        description="U praksi je najbrže da svojstva proveravaš ovim redom: dijagonala za refleksivnost, ogledalo za simetričnost, zabrana dvosmernih veza za antisimetričnost i dvokorak za tranzitivnost."
      >
        <div className={s.grid2}>
          <SectionCard title="Refleksivnost">
            <MathBlock>{"\\forall a \\in A \\; (aRa)"}</MathBlock>
            <p>
              Svaki element mora biti u relaciji sam sa sobom. U matrici relacije
              to znači da svi diagonalni parovi{" "}
              <InlineMath>{"(a,a)"}</InlineMath> moraju biti prisutni.
            </p>
          </SectionCard>

          <SectionCard title="Simetričnost">
            <MathBlock>{"aRb \\Rightarrow bRa"}</MathBlock>
            <p>
              Ako jedan smer postoji, mora postojati i obrnuti smer. U matrici
              to znači da je slika u odnosu na dijagonalu ogledalski ista.
            </p>
          </SectionCard>

          <SectionCard title="Antisimetričnost">
            <MathBlock>
              {"(aRb \\land bRa) \\Rightarrow a=b"}
            </MathBlock>
            <p>
              Dvosmerna veza je dozvoljena samo na dijagonali. Ako za različite
              elemente važe i <InlineMath>{"aRb"}</InlineMath> i{" "}
              <InlineMath>{"bRa"}</InlineMath>, relacija nije antisimetrična.
            </p>
          </SectionCard>

          <SectionCard title="Tranzitivnost">
            <MathBlock>
              {"(aRb \\land bRc) \\Rightarrow aRc"}
            </MathBlock>
            <p>
              Ako možeš da ideš iz <InlineMath>{"a"}</InlineMath> u{" "}
              <InlineMath>{"b"}</InlineMath>, pa iz{" "}
              <InlineMath>{"b"}</InlineMath> u <InlineMath>{"c"}</InlineMath>,
              onda mora postojati i prečica iz <InlineMath>{"a"}</InlineMath> u{" "}
              <InlineMath>{"c"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brzi algoritam">
          <p>
            Prvo proveri da li svi diagonalni parovi postoje. Zatim traži par
            bez ogledala, pa dvosmerni par sa različitim elementima, a na kraju
            proveri da li svaki dvokorak zatvara trougao.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto simetričnost i antisimetričnost nisu suprotnosti?"
          answer={
            <p>
              Zato što govore različite stvari. Simetričnost traži da uz svaki
              par <InlineMath>{"(a,b)"}</InlineMath> postoji i{" "}
              <InlineMath>{"(b,a)"}</InlineMath>. Antisimetričnost kaže da, ako
              oba para postoje, onda moraju biti na dijagonali, odnosno{" "}
              <InlineMath>{"a=b"}</InlineMath>. Relacija jednakosti je i
              simetrična i antisimetrična.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. INTERAKTIVNI LABORATORIJUM ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni laboratorijum"
        title="Matrica relacije i automatska provera osobina"
        description="Izaberi jednu relaciju, klikni bilo koju ćeliju matrice i čitaj je kao uređeni par (a,b). Ispod dobijaš objašnjenje za izabrani par i analizu ključnih svojstava."
      >
        <RelationMatrixLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će svojstva biti pre nego što klikneš
            dugme. Ako ćelije u matrici deluju &ldquo;ogledalno&rdquo;, to je
            signal za simetričnost. Ako dijagonala nije potpuna, relacija nije
            refleksivna.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 5. RELACIJE EKVIVALENCIJE ═══════════ */}
      <LessonSection
        id="ekvivalencija"
        eyebrow="Relacije ekvivalencije"
        title="Ekvivalencija grupiše elemente u klase"
        description='Kada je relacija refleksivna, simetrična i tranzitivna, ona ne uređuje elemente po veličini, već ih razvrstava u grupe elemenata koji su međusobno "isti po nekom kriterijumu".'
      >
        <div className={s.grid2}>
          <SectionCard title="Kada je relacija ekvivalencija">
            <MathBlock>
              {
                "R \\text{ je ekvivalencija } \\iff R \\text{ je refleksivna, simetrična i tranzitivna.}"
              }
            </MathBlock>
            <p>
              Svaka klasa ekvivalencije okuplja elemente koji su međusobno
              povezani tom relacijom.
            </p>
          </SectionCard>

          <SectionCard title="Šta je klasa ekvivalencije">
            <MathBlock>{"[a] = \\{x \\in A \\mid xRa\\}"}</MathBlock>
            <p>
              Klasa elementa <InlineMath>{"a"}</InlineMath> sadrži sve elemente
              koji su u relaciji ekvivalencije sa <InlineMath>{"a"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {"a \\sim b \\iff a \\equiv b \\pmod{3}"}
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Na skupu <InlineMath>{"\\{0,1,2,3,4,5\\}"}</InlineMath> dobijamo tri
          klase ekvivalencije:
        </p>

        <div className={s.grid3} style={{ marginTop: 14 }}>
          <SectionCard>
            <MathBlock>{"[0] = \\{0,3\\}"}</MathBlock>
          </SectionCard>
          <SectionCard>
            <MathBlock>{"[1] = \\{1,4\\}"}</MathBlock>
          </SectionCard>
          <SectionCard>
            <MathBlock>{"[2] = \\{2,5\\}"}</MathBlock>
          </SectionCard>
        </div>

        <InsightCard title="Važna posledica">
          <p>
            Klase ekvivalencije ili su potpuno iste ili su disjunktne. Ne mogu se
            delimično preklapati.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: ako su [a] i [b] dve klase ekvivalencije i imaju zajednički element, šta sledi?"
          answer={
            <p>
              Tada su iste. Zajednički element preko simetričnosti i
              tranzitivnosti &ldquo;spaja&rdquo; obe klase, pa se pokazuje da
              svaki element jedne pripada i drugoj.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 6. RELACIJE PORETKA ═══════════ */}
      <LessonSection
        id="poredak"
        eyebrow="Relacije poretka"
        title="Poredak ne grupiše, nego uređuje"
        description="Za poredak je presudno da relacija bude refleksivna, antisimetrična i tranzitivna. Tada možemo da govorimo o tome da je jedan element ispred, ispod ili manji od drugog."
      >
        <div className={s.grid2}>
          <SectionCard title="Parcijalni poredak">
            <MathBlock>
              {
                "R \\text{ je parcijalni poredak } \\iff R \\text{ je refleksivna, antisimetrična i tranzitivna.}"
              }
            </MathBlock>
            <p>
              Neki elementi mogu ostati neuporedivi. Klasičan primer je
              deljivost na skupu <InlineMath>{"\\{1,2,3,6\\}"}</InlineMath>:
              brojevi <InlineMath>{"2"}</InlineMath> i{" "}
              <InlineMath>{"3"}</InlineMath> nisu uporedivi relacijom deljivosti.
            </p>
          </SectionCard>

          <SectionCard title="Linearni poredak">
            <MathBlock>
              {"\\forall a,b \\in A,\\quad aRb \\lor bRa"}
            </MathBlock>
            <p>
              Ako su svi parovi elemenata uporedivi, parcijalni poredak postaje
              linearni. Relacija <InlineMath>{"\\le"}</InlineMath> na realnim
              brojevima je upravo takav poredak.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="\u2264 na realnim brojevima">
            <p>
              Refleksivna je jer važi{" "}
              <InlineMath>{"x \\le x"}</InlineMath>. Antisimetrična je jer iz{" "}
              <InlineMath>{"x \\le y"}</InlineMath> i{" "}
              <InlineMath>{"y \\le x"}</InlineMath> sledi{" "}
              <InlineMath>{"x=y"}</InlineMath>. Tranzitivna je jer iz{" "}
              <InlineMath>{"x \\le y"}</InlineMath> i{" "}
              <InlineMath>{"y \\le z"}</InlineMath> sledi{" "}
              <InlineMath>{"x \\le z"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Deljivost">
            <p>
              Na prirodnim brojevima relacija{" "}
              <InlineMath>{"a \\mid b"}</InlineMath> jeste parcijalni poredak,
              ali nije linearni: <InlineMath>{"2 \\nmid 3"}</InlineMath> i{" "}
              <InlineMath>{"3 \\nmid 2"}</InlineMath>, pa nisu svi elementi
              uporedivi.
            </p>
          </SectionCard>

          <SectionCard title="Strogi poredak nije isto">
            <p>
              Relacija <InlineMath>{"<"}</InlineMath> nije refleksivna, pa po
              ovoj definiciji nije relacija poretka koju ovde testiramo. Ona je
              strogi poredak i ima malo drugačiji skup osobina.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li deljivost na skupu {1,2,3,6} jeste linearni poredak?"
          answer={
            <p>
              Nije, jer brojevi <InlineMath>{"2"}</InlineMath> i{" "}
              <InlineMath>{"3"}</InlineMath> nisu uporedivi: ne važi ni{" "}
              <InlineMath>{"2 \\mid 3"}</InlineMath> ni{" "}
              <InlineMath>{"3 \\mid 2"}</InlineMath>. Zato je deljivost samo
              parcijalni poredak.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 7. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od eksplicitnih parova do klasifikacije relacije"
        description="Svaki primer pokazuje drugi tip rezonovanja: čitanje skupa parova, proveru svojstava, formiranje klasa i razlikovanje parcijalnog i linearnog poretka."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Eksplicitno zadat skup parova
            </h3>
            <p>
              Neka je na skupu <InlineMath>{"A=\\{1,2,3\\}"}</InlineMath>{" "}
              zadato
            </p>
            <MathBlock>
              {"R=\\{(1,1),(2,2),(3,3),(1,2),(2,1)\\}"}
            </MathBlock>
            <p>
              Dijagonala je cela, pa je relacija refleksivna. Parovi{" "}
              <InlineMath>{"(1,2)"}</InlineMath> i{" "}
              <InlineMath>{"(2,1)"}</InlineMath> pokazuju simetričnost, ali
              ruše antisimetričnost. Tranzitivnost važi, pa je ovo relacija
              ekvivalencije.
            </p>
            <p style={{ marginTop: 10 }}>
              <strong>Klase:</strong>{" "}
              <InlineMath>{"\\{1,2\\}"}</InlineMath> i{" "}
              <InlineMath>{"\\{3\\}"}</InlineMath>
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Ostaci pri deljenju
            </h3>
            <p>Na celim brojevima definišimo</p>
            <MathBlock>
              {"a \\sim b \\iff a-b \\text{ je deljivo sa } 4"}
            </MathBlock>
            <p>
              To je ekvivalencija: svaki broj ima isti ostatak kao sam sa sobom,
              relacija je simetrična, a &ldquo;isti ostatak&rdquo; se prenosi
              kroz tranzitivnost.
            </p>
            <p style={{ marginTop: 10 }}>
              <strong>Klasa broja 1:</strong>{" "}
              <InlineMath>
                {"[1]=\\{\\ldots,-7,-3,1,5,9,\\ldots\\}"}
              </InlineMath>
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Deljivost kao poredak
            </h3>
            <p>
              Na skupu <InlineMath>{"A=\\{1,2,3,6\\}"}</InlineMath> posmatraj
              relaciju
            </p>
            <MathBlock>{"aRb \\iff a \\mid b"}</MathBlock>
            <p>
              Relacija je refleksivna, antisimetrična i tranzitivna, pa je
              parcijalni poredak. Ipak nije linearni, jer{" "}
              <InlineMath>{"2"}</InlineMath> i <InlineMath>{"3"}</InlineMath>{" "}
              nisu uporedivi.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: <InlineMath>{"\\le"}</InlineMath> kao potpuni model
              uređenja
            </h3>
            <p>
              Na bilo kom podskupu realnih brojeva relacija{" "}
              <InlineMath>{"\\le"}</InlineMath> ne samo da jeste parcijalni
              poredak, već su svi elementi uporedivi.
            </p>
            <MathBlock>
              {"x \\le y \\;\\; \\text{ili} \\;\\; y \\le x"}
            </MathBlock>
            <p>
              Zbog toga je <InlineMath>{"\\le"}</InlineMath> osnovni primer
              linearnog poretka.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="Ključne formule"
        title="Šta treba da ti bude trenutno prepoznatljivo"
        description="Ove formule nisu za puko memorisanje. Njih treba odmah povezati sa vizuelnim testom u matrici relacije."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Refleksivnost"
            formula={"\\forall a \\in A,\\; (a,a) \\in R"}
            note="Svi diagonalni parovi moraju postojati."
          />
          <FormulaCard
            title="Simetričnost"
            formula={"(a,b) \\in R \\Rightarrow (b,a) \\in R"}
            note="Svaka veza ima ogledalo preko dijagonale."
          />
          <FormulaCard
            title="Antisimetričnost"
            formula={"(a,b),(b,a) \\in R \\Rightarrow a=b"}
            note="Dvosmerni parovi van dijagonale nisu dozvoljeni."
          />
          <FormulaCard
            title="Tranzitivnost"
            formula={"(a,b),(b,c) \\in R \\Rightarrow (a,c) \\in R"}
            note="Dvokorak mora imati direktnu prečicu."
          />
          <FormulaCard
            title="Ekvivalencija"
            formula={"\\text{refleksivna + simetrična + tranzitivna}"}
            note="Rezultat su klase ekvivalencije i particija skupa."
          />
          <FormulaCard
            title="Parcijalni poredak"
            formula={"\\text{refleksivna + antisimetrična + tranzitivna}"}
            note="Rezultat je uređivanje, ali ne moraju svi elementi biti uporedivi."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 9. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Ovde se najlakše gube poeni"
        description="Većina grešaka nastaje zato što učenik proveri samo jedan ili dva para i prerano zaključi."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje simetričnosti i antisimetričnosti
            </h3>
            <p>
              To nisu suprotna svojstva. Simetričnost traži i obrnuti par, a
              antisimetričnost ga zabranjuje za različite elemente.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljena dijagonala</h3>
            <p>
              Dovoljno je da nedostaje samo jedan par{" "}
              <InlineMath>{"(a,a)"}</InlineMath> i relacija više nije
              refleksivna.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tranzitivnost se ne proverava nasumično
            </h3>
            <p>
              Moraš pregledati sve relevantne dvokorake. Jedan uspešan primer ne
              dokazuje tranzitivnost.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Parcijalni nije isto što i linearni poredak
            </h3>
            <p>
              Čim postoje neuporedivi elementi, relacija nije linearni poredak,
              iako može biti dobar parcijalni poredak.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 10. VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema javlja u realnom zadatku"
        description='Na prijemnom će tema često biti upakovana u konkretan uslov, a ne pod naslovom "binarne relacije".'
      >
        <div className={s.grid2}>
          <SectionCard title="Tipično pitanje 1">
            <p>
              Data je relacija preko skupa parova ili formule. Potrebno je
              odrediti koja svojstva važe, a zatim zaključiti da li je relacija
              ekvivalencija ili poredak.
            </p>
          </SectionCard>
          <SectionCard title="Tipično pitanje 2">
            <p>
              Data je relacija ostataka pri deljenju. Potrebno je formirati klase
              ekvivalencije ili odrediti broj različitih klasa.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni kontrolna lista">
          <p>
            Napiši skup, proveri dijagonalu, ogledalo i dvokorake, pa tek onda
            klasifikuj relaciju. Ako je poredak, dodatno proveri da li su svi
            elementi uporedivi.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe"
        title="Kratka provera razumevanja"
        description="Reši samostalno, pa tek onda otvori rešenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Skup parova"
            problem={
              <p>
                Na skupu <InlineMath>{"A=\\{1,2,3\\}"}</InlineMath> data je
                relacija{" "}
                <InlineMath>
                  {"R=\\{(1,1),(2,2),(3,3),(1,2),(2,1)\\}"}
                </InlineMath>
                . Koja svojstva važe?
              </p>
            }
            solution={
              <p>
                Relacija je refleksivna, simetrična i tranzitivna, ali nije
                antisimetrična zbog parova{" "}
                <InlineMath>{"(1,2)"}</InlineMath> i{" "}
                <InlineMath>{"(2,1)"}</InlineMath> sa{" "}
                <InlineMath>{"1 \\ne 2"}</InlineMath>. Zato je ovo relacija
                ekvivalencije.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Uporedivost"
            problem={
              <p>
                Na skupu <InlineMath>{"\\{1,2,3,6\\}"}</InlineMath> posmatra se
                relacija deljivosti. Da li su{" "}
                <InlineMath>{"2"}</InlineMath> i{" "}
                <InlineMath>{"3"}</InlineMath> uporedivi?
              </p>
            }
            solution={
              <p>
                Nisu, jer ne važi ni <InlineMath>{"2 \\mid 3"}</InlineMath> ni{" "}
                <InlineMath>{"3 \\mid 2"}</InlineMath>. To pokazuje da
                deljivost ovde nije linearni poredak.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Klasa ekvivalencije"
            problem={
              <p>
                Na skupu celih brojeva važi{" "}
                <InlineMath>{"a \\sim b \\iff a-b"}</InlineMath> je deljivo sa{" "}
                <InlineMath>{"5"}</InlineMath>. Odredi klasu{" "}
                <InlineMath>{"[2]"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"[2] = \\{\\ldots,-8,-3,2,7,12,\\ldots\\}"}
                </MathBlock>
                <p>
                  To su svi brojevi koji daju ostatak{" "}
                  <InlineMath>{"2"}</InlineMath> pri deljenju sa{" "}
                  <InlineMath>{"5"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Strogi odnos"
            problem={
              <p>
                Na realnim brojevima definisano je{" "}
                <InlineMath>{"xRy \\iff x<y"}</InlineMath>. Da li je to
                relacija poretka po definiciji iz ove lekcije?
              </p>
            }
            solution={
              <p>
                Nije, jer relacija nije refleksivna: ne važi{" "}
                <InlineMath>{"x<x"}</InlineMath>. To je strogi poredak, ali ne
                i poredak u smislu &ldquo;refleksivna + antisimetrična +
                tranzitivna&rdquo;.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavni uvid lekcije"
        description="Relacija nije samo znak između dva simbola. Ona je pravilo koje bira tačno određene uređene parove. Iz istog jezgra nastaju i ekvivalencija i poredak."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "R \\subseteq A \\times A \\qquad \\Longrightarrow \\qquad \\text{ispituj dijagonalu, ogledalo i dvokorake}"
            }
          </MathBlock>
          <p>
            Ko ove tri provere odradi mirno i sistematski, dobija brz put
            kroz svaki zadatak sa relacijama.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako ove tvrdnje čitaš bez kolebanja, lekcija je dobro savladana."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Binarna relacija</h3>
            <p>
              Binarna relacija na skupu <InlineMath>{"A"}</InlineMath> je
              podskup skupa <InlineMath>{"A \\times A"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Zapis aRb</h3>
            <p>
              Zapis <InlineMath>{"aRb"}</InlineMath> znači da uređeni par{" "}
              <InlineMath>{"(a,b)"}</InlineMath> pripada relaciji.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Provera svojstava</h3>
            <p>
              Refleksivnost proveravaš na dijagonali, simetričnost preko
              ogledala, a tranzitivnost preko dvokoraka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Ekvivalencija</h3>
            <p>
              Relacija ekvivalencije je refleksivna, simetrična i tranzitivna i
              deli skup na klase ekvivalencije.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Parcijalni poredak</h3>
            <p>
              Parcijalni poredak je refleksivan, antisimetričan i tranzitivan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Linearni poredak</h3>
            <p>
              Linearni poredak je parcijalni poredak u kome su svi elementi
              uporedivi.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je lekcija o funkcijama, gde relacija postaje
          strogo uređeno preslikavanje sa dodatnim uslovom jedinstvenosti slike.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
