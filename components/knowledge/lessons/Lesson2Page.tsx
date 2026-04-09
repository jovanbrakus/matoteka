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
import VennDiagramLab from "./VennDiagramLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Osnovni pojmovi" },
  { href: "#operacije", label: "Operacije" },
  { href: "#laboratorija", label: "Interaktivni laboratorij" },
  { href: "#primeri", label: "Primeri" },
  { href: "#zakoni", label: "Korisni obrasci" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Veza sa prijemnim" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson2Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 2"
        title={
          <>
            Teorija skupova i{" "}
            <span className={cs.tHeroAccent}>operacije nad skupovima</span>
          </>
        }
        description="Skupovi su jezik kojim matematika vrlo precizno govori o tome šta pripada, šta ne pripada, šta je zajedničko i kako se uslovi međusobno presecaju. Bez ovog jezika teško je sigurno raditi sa intervalima, domenima i sistemima nejednačina."
        heroImageSrc="/api/lessons/2/hero"
        heroImageAlt="Apstraktna matematička tabla sa simboličkim zapisima teorije skupova"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da razlikuješ element skupa, podskup i partitivni skup.",
          },
          {
            label: "Najveća zamka",
            description:
              "mešanje oznaka \u2208 i \u2286, kao i zamena unije i preseka.",
          },
          {
            label: "Prijemni fokus",
            description:
              "rad sa intervalima i pravilno presecanje uslova pri rešavanju sistema nejednačina.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "30 do 40 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "nije potrebno mnogo više od osnovne logike i pažljivog čitanja oznaka",
          },
          {
            label: "Glavna veština",
            description:
              "precizno čitanje pripadanja, podskupa i operacija nad skupovima",
          },
          {
            label: "Interaktivno",
            description:
              "canvas Venn laboratorija za uniju, presek, razliku i simetričnu razliku",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZASTO JE VAZNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zašto je ova lekcija važna"
        title="Skupovi su alat za organizovanje uslova"
        description="Čim u zadatku imaš više ograničenja, više intervala ili više mogućih slučajeva, skoro sigurno zapravo radiš sa skupovima. Zbog toga ova lekcija nije izolovana teorija, već osnova za mnogo kasnijih tema u algebri, analizi i geometriji."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se skupovi pojavljuju kasnije">
            <ul>
              <li>presek intervala kod sistema nejednačina</li>
              <li>
                unija rešenja kada zadatak ima više dopuštenih slučajeva
              </li>
              <li>
                domen funkcije kao skup svih dozvoljenih vrednosti
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Šta ovde stvarno učiš">
            <ul>
              <li>
                kako da precizno čitaš oznake i ne mešaš nivoe jezika
              </li>
              <li>
                kako da vizuelizuješ skupovne operacije preko Venovih dijagrama
              </li>
              <li>kako da isti problem čitaš i grafički i algebarski</li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Osnovni pojmovi"
        title="Skup, element, podskup i partitivni skup"
        description="Skup je dobro određena celina objekata. Objekte koji mu pripadaju zovemo elementi. Odatle počinje cela priča."
      >
        <div className={s.grid2}>
          <SectionCard title="Skup i pripadanje">
            <p>
              Ako je <InlineMath>{"A = \\{1, 2, 4\\}"}</InlineMath>, onda važi:
            </p>
            <MathBlock>{"2 \\in A, \\qquad 3 \\notin A"}</MathBlock>
            <p>
              Oznaka <InlineMath>{"\\in"}</InlineMath> govori da je neki objekat
              element skupa.
            </p>
          </SectionCard>

          <SectionCard title="Podskup">
            <p>
              Kažemo da je <InlineMath>{"A \\subseteq B"}</InlineMath> ako je
              svaki element skupa <InlineMath>{"A"}</InlineMath> ujedno i element
              skupa <InlineMath>{"B"}</InlineMath>.
            </p>
            <MathBlock>
              {"A = \\{1, 2\\}, \\qquad B = \\{1, 2, 3, 4\\}"}
            </MathBlock>
            <MathBlock>{"A \\subseteq B"}</MathBlock>
            <p>
              Oznaka <InlineMath>{"\\subseteq"}</InlineMath> ne govori o jednom
              elementu, nego o odnosu dva skupa.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Pravi podskup">
            <p>
              Ako je <InlineMath>{"A \\subseteq B"}</InlineMath>, ali pri tom{" "}
              <InlineMath>{"A \\ne B"}</InlineMath>, onda pišemo{" "}
              <InlineMath>{"A \\subset B"}</InlineMath>.
            </p>
            <MathBlock>{"\\{1, 2\\} \\subset \\{1, 2, 3\\}"}</MathBlock>
          </SectionCard>

          <SectionCard title="Partitivni skup">
            <p>
              Partitivni skup skupa <InlineMath>{"A"}</InlineMath>, oznaka{" "}
              <InlineMath>{"\\mathcal{P}(A)"}</InlineMath>, jeste skup svih
              podskupova skupa <InlineMath>{"A"}</InlineMath>.
            </p>
            <MathBlock>{"A = \\{a, b\\}"}</MathBlock>
            <MathBlock>
              {
                "\\mathcal{P}(A) = \\{\\varnothing, \\{a\\}, \\{b\\}, \\{a,b\\}\\}"
              }
            </MathBlock>
            <p>
              Ako skup <InlineMath>{"A"}</InlineMath> ima{" "}
              <InlineMath>{"n"}</InlineMath> elemenata, onda njegov partitivni
              skup ima <InlineMath>{"2^n"}</InlineMath> elemenata.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Proveri sebe: šta je pogrešno u zapisu 2 \u2286 A?"
          answer={
            <p>
              Broj <InlineMath>{"2"}</InlineMath> je element, nije skup. Zato
              ovde treba koristiti <InlineMath>{"2 \\in A"}</InlineMath>, a ne
              oznaku za podskup.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. OPERACIJE NAD SKUPOVIMA ═══════════ */}
      <LessonSection
        id="operacije"
        eyebrow="3. Operacije nad skupovima"
        title="Unija, presek, razlika i simetrična razlika"
        description="Svaka od ovih operacija odgovara vrlo jasnom pitanju: šta je zajedno, šta je zajedničko, šta ostaje samo levo i šta pripada tačno jednom od skupova."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Unija"
            formula={"A \\cup B"}
            note={
              <>
                Svi elementi koji pripadaju skupu{" "}
                <InlineMath>{"A"}</InlineMath> ili skupu{" "}
                <InlineMath>{"B"}</InlineMath>, ili oba.
              </>
            }
          />
          <FormulaCard
            title="Presek"
            formula={"A \\cap B"}
            note={
              <>
                Samo elementi koji pripadaju i skupu{" "}
                <InlineMath>{"A"}</InlineMath> i skupu{" "}
                <InlineMath>{"B"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Razlika"
            formula={"A \\setminus B"}
            note={
              <>
                Elementi koji su u <InlineMath>{"A"}</InlineMath>, ali nisu u{" "}
                <InlineMath>{"B"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Simetrična razlika"
            formula={"A \\triangle B"}
            note="Elementi koji pripadaju tačno jednom od skupova."
          />
        </div>

        <InsightCard title="Najkraća intuicija">
          <p>
            Unija spaja, presek zadržava zajedničko, razlika uklanja ono sto je
            u drugom skupu, a simetrična razlika zadržava samo ono sto nije
            zajedničko.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 4. INTERAKTIVNI LABORATORIJ ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="4. Interaktivni laboratorij"
        title="Venn laboratorija za operacije nad skupovima"
        description="Izaberi operaciju, zatim klikni neki element u dijagramu. Dobićeš odgovor da li taj element pripada rezultujućem skupu i zašto. Na ovaj način vrlo brzo razvijaš sigurnu intuiciju za Venn dijagrame."
      >
        <VennDiagramLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa operacijom, pa tek
            onda proveri ekran. Ako rezultat odgovara tvojoj predikciji,
            intuicija se izgrađuje. Ako ne odgovara, pažljivo pročitaj
            objašnjenje i pokušaj ponovo sa drugim elementom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 5. VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="5. Vođeni primeri"
        title="Kako se računaju skupovne operacije u praksi"
        description="Primeri su raspoređeni tako da idu od diskretnih skupova ka intervalima i Kartezijevom proizvodu."
      >
        {/* Primer 1: Diskretni skupovi */}
        <SectionCard title="Primer 1: Diskretni skupovi">
          <p>Neka su</p>
          <MathBlock>
            {"A = \\{1,2,3,5\\}, \\qquad B = \\{3,4,5,6\\}"}
          </MathBlock>
          <p>Tada dobijamo:</p>
          <MathBlock>{"A \\cup B = \\{1,2,3,4,5,6\\}"}</MathBlock>
          <MathBlock>{"A \\cap B = \\{3,5\\}"}</MathBlock>
          <MathBlock>{"A \\setminus B = \\{1,2\\}"}</MathBlock>
          <MathBlock>{"B \\setminus A = \\{4,6\\}"}</MathBlock>
          <MathBlock>{"A \\triangle B = \\{1,2,4,6\\}"}</MathBlock>
          <p>
            Vredi obratiti pažnju da se zajednički elementi{" "}
            <InlineMath>{"3"}</InlineMath> i <InlineMath>{"5"}</InlineMath>{" "}
            pojavljuju u preseku, a nestaju iz simetrične razlike.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: da li je 3 \u2208 A \\ B?"
          answer={
            <p>
              Ne, jer je <InlineMath>{"3"}</InlineMath> i u skupu{" "}
              <InlineMath>{"A"}</InlineMath> i u skupu{" "}
              <InlineMath>{"B"}</InlineMath>. Razlika{" "}
              <InlineMath>{"A \\setminus B"}</InlineMath> zadržava samo ono sto
              je u <InlineMath>{"A"}</InlineMath>, a nije u{" "}
              <InlineMath>{"B"}</InlineMath>.
            </p>
          }
        />

        {/* Primer 2: Rad sa intervalima */}
        <SectionCard title="Primer 2: Rad sa intervalima">
          <p>Neka su</p>
          <MathBlock>{"A = [-1,4), \\qquad B = (2,6]"}</MathBlock>
          <p>Tada je zajednički deo:</p>
          <MathBlock>{"A \\cap B = (2,4)"}</MathBlock>
          <p>Unija je:</p>
          <MathBlock>{"A \\cup B = [-1,6]"}</MathBlock>
          <p>
            Razlika <InlineMath>{"A \\setminus B"}</InlineMath> zadržava ono sto
            je u <InlineMath>{"A"}</InlineMath>, a nije u{" "}
            <InlineMath>{"B"}</InlineMath>:
          </p>
          <MathBlock>{"A \\setminus B = [-1,2]"}</MathBlock>
          <p>
            Kod intervala je ključno paziti na otvorene i zatvorene krajeve.
          </p>
        </SectionCard>

        {/* Primer 3: Partitivni skup */}
        <SectionCard title="Primer 3: Partitivni skup">
          <p>Ako je</p>
          <MathBlock>{"C = \\{a,b,c\\}"}</MathBlock>
          <p>
            onda partitivni skup ima{" "}
            <InlineMath>{"2^3 = 8"}</InlineMath> elemenata:
          </p>
          <MathBlock>
            {
              "\\mathcal{P}(C) = \\{ \\varnothing, \\{a\\}, \\{b\\}, \\{c\\}, \\{a,b\\}, \\{a,c\\}, \\{b,c\\}, \\{a,b,c\\} \\}"
            }
          </MathBlock>
          <p>
            Najčešća greška je zaboravljanje praznog skupa i samog skupa{" "}
            <InlineMath>{"C"}</InlineMath>.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: koliko elemenata ima P({1,2,3,4})?"
          answer={
            <p>
              Skup ima <InlineMath>{"4"}</InlineMath> elementa, pa njegov
              partitivni skup ima <InlineMath>{"2^4 = 16"}</InlineMath>{" "}
              elemenata.
            </p>
          }
        />

        {/* Primer 4: Kartezijev proizvod */}
        <SectionCard title="Primer 4: Kartezijev proizvod">
          <p>Neka su</p>
          <MathBlock>{"X = \\{1,2\\}, \\qquad Y = \\{a,b,c\\}"}</MathBlock>
          <p>Onda je</p>
          <MathBlock>
            {
              "X \\times Y = \\{ (1,a), (1,b), (1,c), (2,a), (2,b), (2,c) \\}"
            }
          </MathBlock>
          <p>
            Redosled je važan: uređeni par{" "}
            <InlineMath>{"(1,a)"}</InlineMath> nije isto sto i{" "}
            <InlineMath>{"(a,1)"}</InlineMath>. Baš zato je Kartezijev proizvod
            prirodan uvod u koordinatni sistem.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ 6. KORISNI OBRASCI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="6. Korisni obrasci"
        title="Standardna pravila koja ubrzavaju rad"
        description="Ove relacije ne treba samo pamtiti. Treba ih umeti pročitati i odmah prepoznati u zadatku."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Komutativnost"
            formula={"A \\cup B = B \\cup A, \\quad A \\cap B = B \\cap A"}
            note="Redosled skupova nije važan za uniju i presek."
          />
          <FormulaCard
            title="Asocijativnost"
            formula={"(A \\cup B) \\cup C = A \\cup (B \\cup C)"}
            note="Isto važi i za presek. Grupisanje ne menja rezultat."
          />
          <FormulaCard
            title="Distributivnost"
            formula={"A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)"}
            note="Skupovne operacije imaju jasnu paralelu sa algebarskim računom."
          />
          <FormulaCard
            title="De Morgan za skupove"
            formula={"(A \\cup B)^c = A^c \\cap B^c"}
            note="Negacija ili komplement menja uniju u presek i obrnuto."
          />
        </div>

        <InsightCard title="Praktičan savet">
          <p>
            Kad god se zbuniš, nacrtaj mali Venn dijagram ili testiraj nekoliko
            karakterističnih elemenata. To vrlo brzo otkriva da li zapis koji si
            dobio ima smisla.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 7. CESTE GRESKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="7. Česte greške"
        title="Ovde učenici najčešće pogreše"
        description="Skupovi deluju jednostavno, ali upravo zato mnogi preskoče preciznost i naprave formalnu grešku."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"\\in"}</InlineMath> i{" "}
              <InlineMath>{"\\subseteq"}</InlineMath>
            </h3>
            <p>
              Jedno govori o pripadanju elementa skupu, drugo o odnosu između
              dva skupa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Unija nije isto sto i presek</h3>
            <p>
              Unija spaja sve, a presek zadržava samo zajedničke elemente. To je
              najčešća početna zamena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Razlika nije simetrična</h3>
            <p>
              Uglavnom važi{" "}
              <InlineMath>{"A \\setminus B \\ne B \\setminus A"}</InlineMath>.
              Redosled ovde jeste važan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno brojanje partitivnog skupa
            </h3>
            <p>
              Često se zaboravi prazni skup ili sam skup{" "}
              <InlineMath>{"A"}</InlineMath>, pa se dobije premalo podskupova.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. VEZA SA PRIJEMNIM ZADACIMA ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="8. Veza sa prijemnim zadacima"
        title="Kako se teorija skupova direktno koristi na prijemnom"
        description="Najčešće se ne traži suva definicija skupa, već sposobnost da uslove i rešenja zapišeš i kombinuješ kao skupove."
      >
        <div className={s.grid2}>
          <SectionCard title="Sistemi nejednačina = presek skupova rešenja">
            <p>
              Ako prva nejednačina daje rešenje{" "}
              <InlineMath>{"A"}</InlineMath>, a druga rešenje{" "}
              <InlineMath>{"B"}</InlineMath>, onda sistem traži oba uslova
              istovremeno:
            </p>
            <MathBlock>{"\\text{rešenje sistema} = A \\cap B"}</MathBlock>
            <p>
              Ovo je jedan od najvažnijih praktičnih prenosa ove lekcije.
            </p>
          </SectionCard>
          <SectionCard title="Više slučajeva = unija skupova rešenja">
            <p>
              Kada zadatak ima dva dozvoljena slučaja, recimo{" "}
              <InlineMath>{"x < -1"}</InlineMath> ili{" "}
              <InlineMath>{"x > 3"}</InlineMath>, ukupno rešenje nije presek
              nego unija:
            </p>
            <MathBlock>{"(-\\infty,-1) \\cup (3,\\infty)"}</MathBlock>
            <p>
              Na prijemnim ispitima ovo je česta tačka gubljenja poena.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni mentalni test">
          <p>
            Ako zadatak traži da vaze svi uslovi odjednom, misli na presek. Ako
            zadatak prihvata jedan ili drugi slučaj, misli na uniju.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 9. VEZBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="9. Vezbe"
        title="Kratka provera razumevanja"
        description="Probaj najpre samostalno, pa tek onda otvori rešenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Pripadanje"
            problem={
              <p>
                Ako je <InlineMath>{"A = \\{2,4,6\\}"}</InlineMath>, da li važi{" "}
                <InlineMath>{"4 \\in A"}</InlineMath>?
              </p>
            }
            solution={
              <p>
                Da. Broj <InlineMath>{"4"}</InlineMath> je jedan od elemenata
                skupa <InlineMath>{"A"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Operacije nad skupovima"
            problem={
              <p>
                Ako su <InlineMath>{"A=\\{1,2,3\\}"}</InlineMath> i{" "}
                <InlineMath>{"B=\\{3,4\\}"}</InlineMath>, odredi{" "}
                <InlineMath>{"A \\cap B"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>{"A \\cap B = \\{3\\}"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Partitivni skup"
            problem={
              <p>
                Koliko elemenata ima{" "}
                <InlineMath>{"\\mathcal{P}(\\{a,b,c,d\\})"}</InlineMath>?
              </p>
            }
            solution={
              <p>
                Skup ima <InlineMath>{"4"}</InlineMath> elementa, pa partitivni
                skup ima <InlineMath>{"2^4 = 16"}</InlineMath> elemenata.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Kartezijev proizvod"
            problem={
              <p>
                Odredi{" "}
                <InlineMath>{"\\{1,2\\} \\times \\{x,y\\}"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\{1,2\\} \\times \\{x,y\\} = \\{(1,x),(1,y),(2,x),(2,y)\\}"
                }
              </MathBlock>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Glavni uvid lekcije"
        title="Skupovi su način organizovanja matematičnih uslova"
      >
        <InsightCard title="Ključni princip">
          <MathBlock>
            {
              "\\text{zajednički uslovi} = \\cap, \\qquad \\text{alternativni slučajevi} = \\cup"
            }
          </MathBlock>
          <p>
            Skupovi nisu samo način zapisivanja elemenata. Oni su način
            organizovanja matematičnih uslova.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. ZAVRSNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="10. Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako sledeće stavke čitaš bez nejasnoća, lekcija je dobro usvojena."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Pripadanje i podskup</h3>
            <p>
              <InlineMath>{"\\in"}</InlineMath> govori o pripadanju elementa
              skupu, a <InlineMath>{"\\subseteq"}</InlineMath> o odnosu dva
              skupa.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Unija</h3>
            <p>
              <InlineMath>{"A \\cup B"}</InlineMath> spaja sve elemente iz oba
              skupa.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Presek</h3>
            <p>
              <InlineMath>{"A \\cap B"}</InlineMath> zadržava samo zajedničke
              elemente.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Razlika</h3>
            <p>
              <InlineMath>{"A \\setminus B"}</InlineMath> nije isto sto i{" "}
              <InlineMath>{"B \\setminus A"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Partitivni skup</h3>
            <p>
              <InlineMath>{"\\mathcal{P}(A)"}</InlineMath> ima{" "}
              <InlineMath>{"2^n"}</InlineMath> elemenata ako skup{" "}
              <InlineMath>{"A"}</InlineMath> ima{" "}
              <InlineMath>{"n"}</InlineMath> elemenata.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Kartezijev proizvod</h3>
            <p>
              Gradi skup uređenih parova i uvodi te u koordinatni sistem.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Prijemni primena</h3>
            <p>
              Na prijemnom, sistemi uslova se vrlo često čitaju kao preseci ili
              unije intervala.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je lekcija o binarnim relacijama, gde
          Kartezijev proizvod postaje osnova za relacije, klase ekvivalencije i
          poredak.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
