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
  { href: "#vaznost", label: "Zasto je vazna" },
  { href: "#osnove", label: "Osnovni pojmovi" },
  { href: "#operacije", label: "Operacije" },
  { href: "#laboratorija", label: "Interaktivni laboratorij" },
  { href: "#primeri", label: "Primeri" },
  { href: "#zakoni", label: "Korisni obrasci" },
  { href: "#zamke", label: "Ceste greske" },
  { href: "#ispit", label: "Veza sa prijemnim" },
  { href: "#vezba", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson2Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 2"
        title={
          <>
            Teorija skupova i{" "}
            <span className={cs.tHeroAccent}>operacije nad skupovima</span>
          </>
        }
        description="Skupovi su jezik kojim matematika vrlo precizno govori o tome sta pripada, sta ne pripada, sta je zajednicko i kako se uslovi medjusobno presecaju. Bez ovog jezika tesko je sigurno raditi sa intervalima, domenima i sistemima nejednacina."
        heroImageSrc="/api/lessons/2/hero"
        heroImageAlt="Apstraktna matematicka tabla sa simbolickim zapisima teorije skupova"
        cards={[
          {
            label: "Naucices",
            description:
              "kako da razlikujes element skupa, podskup i partitivni skup.",
          },
          {
            label: "Najveca zamka",
            description:
              "mesanje oznaka \u2208 i \u2286, kao i zamena unije i preseka.",
          },
          {
            label: "Prijemni fokus",
            description:
              "rad sa intervalima i pravilno presecanje uslova pri resavanju sistema nejednacina.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "30 do 40 minuta pazljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "nije potrebno mnogo vise od osnovne logike i pazljivog citanja oznaka",
          },
          {
            label: "Glavna vestina",
            description:
              "precizno citanje pripadanja, podskupa i operacija nad skupovima",
          },
          {
            label: "Interaktivno",
            description:
              "canvas Venn laboratorija za uniju, presek, razliku i simetricnu razliku",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZASTO JE VAZNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zasto je ova lekcija vazna"
        title="Skupovi su alat za organizovanje uslova"
        description="Cim u zadatku imas vise ogranicenja, vise intervala ili vise mogucih slucajeva, skoro sigurno zapravo radis sa skupovima. Zbog toga ova lekcija nije izolovana teorija, vec osnova za mnogo kasnijih tema u algebri, analizi i geometriji."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se skupovi pojavljuju kasnije">
            <ul>
              <li>presek intervala kod sistema nejednacina</li>
              <li>
                unija resenja kada zadatak ima vise dopustenih slucajeva
              </li>
              <li>
                domen funkcije kao skup svih dozvoljenih vrednosti
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Sta ovde stvarno ucis">
            <ul>
              <li>
                kako da precizno citas oznake i ne mesas nivoe jezika
              </li>
              <li>
                kako da vizuelizujes skupovne operacije preko Venovih dijagrama
              </li>
              <li>kako da isti problem citas i graficki i algebarski</li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Osnovni pojmovi"
        title="Skup, element, podskup i partitivni skup"
        description="Skup je dobro odredjena celina objekata. Objekte koji mu pripadaju zovemo elementi. Odatle pocinje cela prica."
      >
        <div className={s.grid2}>
          <SectionCard title="Skup i pripadanje">
            <p>
              Ako je <InlineMath>{"A = \\{1, 2, 4\\}"}</InlineMath>, onda vazi:
            </p>
            <MathBlock>{"2 \\in A, \\qquad 3 \\notin A"}</MathBlock>
            <p>
              Oznaka <InlineMath>{"\\in"}</InlineMath> govori da je neki objekat
              element skupa.
            </p>
          </SectionCard>

          <SectionCard title="Podskup">
            <p>
              Kazemo da je <InlineMath>{"A \\subseteq B"}</InlineMath> ako je
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
              <InlineMath>{"A \\ne B"}</InlineMath>, onda pisemo{" "}
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
          question="Proveri sebe: sta je pogresno u zapisu 2 \u2286 A?"
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
        title="Unija, presek, razlika i simetricna razlika"
        description="Svaka od ovih operacija odgovara vrlo jasnom pitanju: sta je zajedno, sta je zajednicko, sta ostaje samo levo i sta pripada tacno jednom od skupova."
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
            title="Simetricna razlika"
            formula={"A \\triangle B"}
            note="Elementi koji pripadaju tacno jednom od skupova."
          />
        </div>

        <InsightCard title="Najkraca intuicija">
          <p>
            Unija spaja, presek zadrzava zajednicko, razlika uklanja ono sto je
            u drugom skupu, a simetricna razlika zadrzava samo ono sto nije
            zajednicko.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 4. INTERAKTIVNI LABORATORIJ ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="4. Interaktivni laboratorij"
        title="Venn laboratorija za operacije nad skupovima"
        description="Izaberi operaciju, zatim klikni neki element u dijagramu. Dobices odgovor da li taj element pripada rezultujucem skupu i zasto. Na ovaj nacin vrlo brzo razvijas sigurnu intuiciju za Venn dijagrame."
      >
        <VennDiagramLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis sta ce se desiti sa operacijom, pa tek
            onda proveri ekran. Ako rezultat odgovara tvojoj predikciji,
            intuicija se izgradjuje. Ako ne odgovara, pazljivo procitaj
            objasnjenje i pokusaj ponovo sa drugim elementom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 5. VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="5. Vodjeni primeri"
        title="Kako se racunaju skupovne operacije u praksi"
        description="Primeri su rasporedjeni tako da idu od diskretnih skupova ka intervalima i Kartezijevom proizvodu."
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
            Vredi obratiti paznju da se zajednicki elementi{" "}
            <InlineMath>{"3"}</InlineMath> i <InlineMath>{"5"}</InlineMath>{" "}
            pojavljuju u preseku, a nestaju iz simetricne razlike.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: da li je 3 \u2208 A \\ B?"
          answer={
            <p>
              Ne, jer je <InlineMath>{"3"}</InlineMath> i u skupu{" "}
              <InlineMath>{"A"}</InlineMath> i u skupu{" "}
              <InlineMath>{"B"}</InlineMath>. Razlika{" "}
              <InlineMath>{"A \\setminus B"}</InlineMath> zadrzava samo ono sto
              je u <InlineMath>{"A"}</InlineMath>, a nije u{" "}
              <InlineMath>{"B"}</InlineMath>.
            </p>
          }
        />

        {/* Primer 2: Rad sa intervalima */}
        <SectionCard title="Primer 2: Rad sa intervalima">
          <p>Neka su</p>
          <MathBlock>{"A = [-1,4), \\qquad B = (2,6]"}</MathBlock>
          <p>Tada je zajednicki deo:</p>
          <MathBlock>{"A \\cap B = (2,4)"}</MathBlock>
          <p>Unija je:</p>
          <MathBlock>{"A \\cup B = [-1,6]"}</MathBlock>
          <p>
            Razlika <InlineMath>{"A \\setminus B"}</InlineMath> zadrzava ono sto
            je u <InlineMath>{"A"}</InlineMath>, a nije u{" "}
            <InlineMath>{"B"}</InlineMath>:
          </p>
          <MathBlock>{"A \\setminus B = [-1,2]"}</MathBlock>
          <p>
            Kod intervala je kljucno paziti na otvorene i zatvorene krajeve.
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
            Najcesca greska je zaboravljanje praznog skupa i samog skupa{" "}
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
            Redosled je vazan: uredjeni par{" "}
            <InlineMath>{"(1,a)"}</InlineMath> nije isto sto i{" "}
            <InlineMath>{"(a,1)"}</InlineMath>. Bas zato je Kartezijev proizvod
            prirodan uvod u koordinatni sistem.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ 6. KORISNI OBRASCI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="6. Korisni obrasci"
        title="Standardna pravila koja ubrzavaju rad"
        description="Ove relacije ne treba samo pamtiti. Treba ih umeti procitati i odmah prepoznati u zadatku."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Komutativnost"
            formula={"A \\cup B = B \\cup A, \\quad A \\cap B = B \\cap A"}
            note="Redosled skupova nije vazan za uniju i presek."
          />
          <FormulaCard
            title="Asocijativnost"
            formula={"(A \\cup B) \\cup C = A \\cup (B \\cup C)"}
            note="Isto vazi i za presek. Grupisanje ne menja rezultat."
          />
          <FormulaCard
            title="Distributivnost"
            formula={"A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)"}
            note="Skupovne operacije imaju jasnu paralelu sa algebarskim racunom."
          />
          <FormulaCard
            title="De Morgan za skupove"
            formula={"(A \\cup B)^c = A^c \\cap B^c"}
            note="Negacija ili komplement menja uniju u presek i obrnuto."
          />
        </div>

        <InsightCard title="Praktican savet">
          <p>
            Kad god se zbunis, nacrtaj mali Venn dijagram ili testiraj nekoliko
            karakteristicnih elemenata. To vrlo brzo otkriva da li zapis koji si
            dobio ima smisla.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 7. CESTE GRESKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="7. Ceste greske"
        title="Ovde ucenici najcesce pogrese"
        description="Skupovi deluju jednostavno, ali upravo zato mnogi preskoce preciznost i naprave formalnu gresku."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mesanje <InlineMath>{"\\in"}</InlineMath> i{" "}
              <InlineMath>{"\\subseteq"}</InlineMath>
            </h3>
            <p>
              Jedno govori o pripadanju elementa skupu, drugo o odnosu izmedju
              dva skupa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Unija nije isto sto i presek</h3>
            <p>
              Unija spaja sve, a presek zadrzava samo zajednicke elemente. To je
              najcesca pocetna zamena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Razlika nije simetricna</h3>
            <p>
              Uglavnom vazi{" "}
              <InlineMath>{"A \\setminus B \\ne B \\setminus A"}</InlineMath>.
              Redosled ovde jeste vazan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogresno brojanje partitivnog skupa
            </h3>
            <p>
              Cesto se zaboravi prazni skup ili sam skup{" "}
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
        description="Najcesce se ne trazi suva definicija skupa, vec sposobnost da uslove i resenja zapises i kombinujes kao skupove."
      >
        <div className={s.grid2}>
          <SectionCard title="Sistemi nejednacina = presek skupova resenja">
            <p>
              Ako prva nejednacina daje resenje{" "}
              <InlineMath>{"A"}</InlineMath>, a druga resenje{" "}
              <InlineMath>{"B"}</InlineMath>, onda sistem trazi oba uslova
              istovremeno:
            </p>
            <MathBlock>{"\\text{resenje sistema} = A \\cap B"}</MathBlock>
            <p>
              Ovo je jedan od najvaznijih prakticnih prenosa ove lekcije.
            </p>
          </SectionCard>
          <SectionCard title="Vise slucajeva = unija skupova resenja">
            <p>
              Kada zadatak ima dva dozvoljena slucaja, recimo{" "}
              <InlineMath>{"x < -1"}</InlineMath> ili{" "}
              <InlineMath>{"x > 3"}</InlineMath>, ukupno resenje nije presek
              nego unija:
            </p>
            <MathBlock>{"(-\\infty,-1) \\cup (3,\\infty)"}</MathBlock>
            <p>
              Na prijemnim ispitima ovo je cesta tacka gubljenja poena.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni mentalni test">
          <p>
            Ako zadatak trazi da vaze svi uslovi odjednom, misli na presek. Ako
            zadatak prihvata jedan ili drugi slucaj, misli na uniju.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 9. VEZBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="9. Vezbe"
        title="Kratka provera razumevanja"
        description="Probaj najpre samostalno, pa tek onda otvori resenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Pripadanje"
            problem={
              <p>
                Ako je <InlineMath>{"A = \\{2,4,6\\}"}</InlineMath>, da li vazi{" "}
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
        title="Skupovi su nacin organizovanja matematicnih uslova"
      >
        <InsightCard title="Kljucni princip">
          <MathBlock>
            {
              "\\text{zajednicki uslovi} = \\cap, \\qquad \\text{alternativni slucajevi} = \\cup"
            }
          </MathBlock>
          <p>
            Skupovi nisu samo nacin zapisivanja elemenata. Oni su nacin
            organizovanja matematicnih uslova.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. ZAVRSNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="10. Zavrsni rezime"
        title="Sta treba da zapamtis iz ove lekcije"
        description="Ako sledece stavke citas bez nejasnoca, lekcija je dobro usvojena."
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
              <InlineMath>{"A \\cap B"}</InlineMath> zadrzava samo zajednicke
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
              Gradi skup uredjenih parova i uvodi te u koordinatni sistem.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Prijemni primena</h3>
            <p>
              Na prijemnom, sistemi uslova se vrlo cesto citaju kao preseci ili
              unije intervala.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci prirodan korak je lekcija o binarnim relacijama, gde
          Kartezijev proizvod postaje osnova za relacije, klase ekvivalencije i
          poredak.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
