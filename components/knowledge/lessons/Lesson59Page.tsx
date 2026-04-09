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
import DerivativeApplicationLab from "./DerivativeApplicationLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnova", label: "Šta govori izvod" },
  { href: "#monotonost", label: "Monotonost" },
  { href: "#ekstremi", label: "Ekstremi" },
  { href: "#tangenta", label: "Tangenta" },
  { href: "#algoritam", label: "Optimizacija" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson59Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 59"
        title={
          <>
            Primena <span className={cs.tHeroAccent}>izvoda</span>
          </>
        }
        description="Prvi izvod je trenutak kada račun prestaje da bude samo niz formula i postaje alat za razumevanje ponašanja funkcije. Kroz ovu lekciju učiš kako da iz znaka izvoda pročitaš gde funkcija raste ili opada, kako da prepoznaš minimum i maksimum i kako da napišeš jednačinu tangente bez nagađanja."
        heroImageSrc="/images/lessons/lesson59_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa grafikom funkcije, tangentom i označenim ekstremima"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Da od izvoda napraviš tabelu znakova i zaključiš ceo tok funkcije.",
          },
          {
            label: "Najveća zamka",
            description:
              "Misliti da iz uslova f'(x₀)=0 automatski sledi ekstremna vrednost.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Tekstualni zadatak prevesti u funkciju jedne promenljive i proveriti znak izvoda.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "40 do 55 minuta ako zaista prolaziš kroz primere i mini-provere.",
          },
          {
            label: "Predznanje",
            description:
              "Tablica osnovnih izvoda i pravila diferenciranja iz prethodne lekcije.",
          },
          {
            label: "Glavna veština",
            description:
              "Prelazak sa formule za izvod na zaključak o grafiku i realnom problemu.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija sa kubnom funkcijom, tangentom i tabelom znakova.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Izvod kao alat za zaključivanje"
        description='Na prijemnom se izvod retko traži „radi samog izvoda". Mnogo češće se koristi kao alat da zaključiš gde funkcija raste, gde dostiže maksimum ili minimum i kakav pravac ima tangenta u konkretnoj tački.'
      >
        <div className={s.grid2}>
          <SectionCard title="Šta se suštinski menja u odnosu na prethodnu lekciju?">
            <p>
              U prethodnoj lekciji si učio kako da izračunaš izvod. Sada učiš
              šta taj izvod znači. To je velika pedagoška prekretnica: više ne
              gledaš samo simboliku, već ponašanje funkcije.
            </p>
          </SectionCard>
          <SectionCard title="Gde se ovo pojavljuje kasnije?">
            <p>
              U optimizaciji, geometriji, fizici i svuda gde treba doneti odluku
              „koja vrednost je najbolja". Na tehničkim fakultetima ovo je jedna
              od osnovnih misaonih rutina.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "f'(x) > 0 \\Rightarrow f \\text{ raste}, \\qquad f'(x) < 0 \\Rightarrow f \\text{ opada}."
          }
        </MathBlock>

        <SectionCard>
          <ul>
            <li>
              U zadacima o monotonosti traži se čitanje ponašanja funkcije po
              intervalima.
            </li>
            <li>
              U zadacima o ekstremima traži se gde funkcija menja smer rasta.
            </li>
            <li>
              U zadacima o tangenti traži se lokalni nagib grafa u konkretnoj
              tački.
            </li>
            <li>
              U optimizacionim zadacima izvod služi da među mnogo mogućnosti
              izdvojiš najbolju.
            </li>
          </ul>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ ŠTA GOVORI PRVI IZVOD ═══════════ */}
      <LessonSection
        id="osnova"
        eyebrow="Osnovna ideja"
        title="Šta zapravo govori prvi izvod"
        description="Učenici često znaju definiciju izvoda, ali im nije do kraja jasno kako se iz nje dolazi do praktičnih zaključaka. Zato ovde spajamo intuiciju, formalni zapis i tipičnu ispitnu logiku."
      >
        <div className={s.grid3}>
          <SectionCard title="Nagib grafa u jednoj tački">
            <p>
              Broj <InlineMath>{"f'(x_0)"}</InlineMath> govori koliko je graf
              „nagnut" u tački sa apscisom{" "}
              <InlineMath>{"x_0"}</InlineMath>. Pozitivan broj znači da graf ide
              naviše kada gledaš sleva nadesno, negativan znači da pada.
            </p>
          </SectionCard>
          <SectionCard title="Brzina promene">
            <p>
              Ako posmatraš male promene argumenta, izvod meri odnos promene
              funkcije i promene argumenta. Zato je izvod lokalna informacija,
              ali iz niza lokalnih informacija dobijaš sliku cele funkcije.
            </p>
          </SectionCard>
          <SectionCard title="Ne traži se broj, već zaključak">
            <p>
              Na ispitu je cilj da iz <InlineMath>{"f'(x)"}</InlineMath>{" "}
              izvučeš intervale, tip stacionarne tačke i smisao dobijenog
              rezultata. Sam izračunati izvod je tek sredina rešenja, ne kraj.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "f'(x) = 0 \\text{ daje kandidata za ekstrem,} \\qquad \\text{promena znaka } f'(x) \\text{ odlučuje da li ekstrem zaista postoji,} \\qquad k_{\\text{tangente}} = f'(x_0)."
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: da li pozitivan izvod u jednoj tački znači maksimum?"
          answer={
            <p>
              Ne. Ako je <InlineMath>{"f'(x_0)>0"}</InlineMath>, to samo znači
              da funkcija u toj tački lokalno raste. Maksimum bi zahtevao da
              levo od tačke funkcija raste, a desno počne da opada, dakle da se
              znak izvoda promeni iz plus u minus.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MONOTONOST ═══════════ */}
      <LessonSection
        id="monotonost"
        eyebrow="Algoritam znaka"
        title="Monotonost: gde funkcija raste, a gde opada"
        description="Monotonost je često prvi ozbiljan zadatak iz primene izvoda. Studentu je najvažnije da ne preskoči tabelu znakova: nule izvoda same po sebi nisu dovoljne."
      >
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Odredi domen funkcije">
            <p>
              Monotonost se uvek ispituje na delu domene gde funkcija ima
              smisla. Ako postoji koren, logaritam ili imenilac, domen je prva
              kontrolna tačka.
            </p>
          </WalkStep>
          <WalkStep
            number={2}
            title={
              <>
                Izračunaj prvi izvod i reši{" "}
                <InlineMath>{"f'(x)=0"}</InlineMath>
              </>
            }
          >
            <p>
              Dobijene tačke dele osu na intervale. U opštijim zadacima
              proverava se i gde izvod ne postoji, ali za standardne polinome i
              racionalne funkcije najčešće krećeš od jednačine{" "}
              <InlineMath>{"f'(x)=0"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Na svakom intervalu proveri znak izvoda">
            <p>
              Uzmi jednu probnu tačku iz intervala i uvrsti je u{" "}
              <InlineMath>{"f'(x)"}</InlineMath>. Ako dobiješ pozitivan broj,
              funkcija raste. Ako dobiješ negativan broj, funkcija opada.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Tek onda izvuci zaključak">
            <p>
              Monotonost se piše po intervalima, na primer: „funkcija raste na{" "}
              <InlineMath>{"(-\\infty, -1)"}</InlineMath> i{" "}
              <InlineMath>{"(3, +\\infty)"}</InlineMath>, a opada na{" "}
              <InlineMath>{"(-1, 3)"}</InlineMath>".
            </p>
          </WalkStep>
        </div>

        <MathBlock>
          {
            "f'(x) > 0 \\Rightarrow f \\text{ je rastuća na tom intervalu}, \\qquad f'(x) < 0 \\Rightarrow f \\text{ je opadajuća na tom intervalu}."
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: šta se dešava za f'(x)=(x−2)²?"
          answer={
            <p>
              Izvod je nenegativan za svako <InlineMath>{"x"}</InlineMath>, a
              jednak nuli samo u <InlineMath>{"x=2"}</InlineMath>. Znak se ne
              menja: funkcija ne prelazi iz rasta u opadanje niti obrnuto.
              Dakle, tačka <InlineMath>{"x=2"}</InlineMath> ne mora da bude
              ekstrem, iako je <InlineMath>{"f'(2)=0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ EKSTREMI ═══════════ */}
      <LessonSection
        id="ekstremi"
        eyebrow="Promena smera"
        title="Ekstremne vrednosti: maksimum i minimum"
        description='Ekstrem nije „tačka gde je izvod nula", već tačka gde funkcija menja smer kretanja. Upravo zato test promene znaka izvoda ima veću vrednost od samog rešavanja jednačine.'
      >
        <div className={s.grid3}>
          <SectionCard title="Plus prelazi u minus">
            <p>
              Ako je levo od tačke{" "}
              <InlineMath>{"f'(x)>0"}</InlineMath>, a desno{" "}
              <InlineMath>{"f'(x)<0"}</InlineMath>, funkcija je do te tačke
              rasla, a posle nje opada. Tada tačka daje{" "}
              <strong>lokalni maksimum</strong>.
            </p>
          </SectionCard>
          <SectionCard title="Minus prelazi u plus">
            <p>
              Ako je levo <InlineMath>{"f'(x)<0"}</InlineMath>, a desno{" "}
              <InlineMath>{"f'(x)>0"}</InlineMath>, funkcija se spuštala pa
              počela da raste. Tada tačka daje{" "}
              <strong>lokalni minimum</strong>.
            </p>
          </SectionCard>
          <SectionCard title="Nulta derivacija nije dovoljna">
            <p>
              Kod funkcije <InlineMath>{"f(x)=x^3"}</InlineMath> važi{" "}
              <InlineMath>{"f'(0)=0"}</InlineMath>, ali funkcija raste i levo i
              desno od nule. Dakle, u <InlineMath>{"x=0"}</InlineMath> nema
              ekstrema, već samo stacionarna tačka.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\begin{aligned} f'(x):\\ + \\to - &\\Rightarrow \\text{lokalni maksimum},\\\\ f'(x):\\ - \\to + &\\Rightarrow \\text{lokalni minimum},\\\\ f'(x):\\ + \\to + \\text{ ili } - \\to - &\\Rightarrow \\text{nema lokalnog ekstrema.} \\end{aligned}"
          }
        </MathBlock>

        <div className={s.grid2}>
          <SectionCard title="Lokalni ili apsolutni ekstrem?">
            <p>
              Ako zadatak traži najveću ili najmanju vrednost na zatvorenom
              intervalu, onda posle stacionarnih tačaka moraš proveriti i krajeve
              intervala. To je česta ispitna zamka.
            </p>
          </SectionCard>
          <SectionCard title="Kritična tačka nije automatski ekstrem">
            <p>
              Naziv „kritična" samo znači da tu treba stati i razmisliti. Tek
              promena znaka izvoda ili dodatna analiza pokazuje pravi tip te
              tačke.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto se u zadatku na intervalu proveravaju i krajevi?"
          answer={
            <p>
              Zato što najveća ili najmanja vrednost može da se desi baš na
              granici intervala, iako tamo nema uslova{" "}
              <InlineMath>{"f'(x)=0"}</InlineMath>. Ako ignorišeš krajeve, možeš
              promašiti tačan odgovor.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ TANGENTA ═══════════ */}
      <LessonSection
        id="tangenta"
        eyebrow="Nagib = izvod"
        title="Tangenta: prava koja prati funkciju u jednoj tački"
        description="Tangenta je lokalna linearna slika funkcije. Na prijemnom se najčešće traži njena jednačina, a ključna ideja je jednostavna: nagib tangente je upravo vrednost prvog izvoda u tački dodira."
      >
        <div className={s.grid2}>
          <SectionCard title="Jednačina tangente">
            <p>
              Ako je tačka dodira{" "}
              <InlineMath>{"A(x_0, f(x_0))"}</InlineMath>, a nagib{" "}
              <InlineMath>{"k=f'(x_0)"}</InlineMath>, onda je jednačina
              tangente:
            </p>
            <MathBlock>{"y - f(x_0) = f'(x_0)(x - x_0)."}</MathBlock>
          </SectionCard>
          <SectionCard title="Tangenta pokazuje kako se graf ponaša baš tu">
            <p>
              Ako je <InlineMath>{"f'(x_0)>0"}</InlineMath>, tangenta raste.
              Ako je <InlineMath>{"f'(x_0)<0"}</InlineMath>, tangenta pada. Ako
              je <InlineMath>{"f'(x_0)=0"}</InlineMath>, tangenta je
              horizontalna. To ne znači automatski maksimum ili minimum, ali
              znači da je nagib u toj tački ravan nuli.
            </p>
          </SectionCard>
        </div>

        <div className={s.walkthrough} style={{ marginTop: 16 }}>
          <WalkStep number={1} title="Odredi tačku dodira">
            <p>
              Ako je dat <InlineMath>{"x_0"}</InlineMath>, izračunaš{" "}
              <InlineMath>{"f(x_0)"}</InlineMath>. Ako je data tačka na
              grafiku, prvo proveri da ona zaista pripada funkciji. Ovo učenici
              često preskoče.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Izračunaj nagib">
            <p>
              Nađi <InlineMath>{"f'(x)"}</InlineMath>, pa zatim uvrsti{" "}
              <InlineMath>{"x_0"}</InlineMath>. Dobijeni broj je koeficijent
              pravca tangente.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Uvrsti u formulu prave">
            <p>
              U formuli{" "}
              <InlineMath>{"y - y_0 = k(x - x_0)"}</InlineMath> koristiš{" "}
              <InlineMath>{"y_0=f(x_0)"}</InlineMath> i{" "}
              <InlineMath>{"k=f'(x_0)"}</InlineMath>. Na kraju možeš ostaviti
              taj oblik ili srediti jednačinu do{" "}
              <InlineMath>{"y=kx+n"}</InlineMath>.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je tangenta horizontalna, da li mora biti ekstrem?"
          answer={
            <p>
              Ne mora. Horizontalna tangenta samo znači{" "}
              <InlineMath>{"f'(x_0)=0"}</InlineMath>. Kod funkcije{" "}
              <InlineMath>{"x^3"}</InlineMath> u nuli je tangenta horizontalna,
              ali funkcija nema lokalni ekstrem jer ne menja smer rasta.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OPTIMIZACIJA ═══════════ */}
      <LessonSection
        id="algoritam"
        eyebrow="Modelovanje"
        title="Kako se rešava optimizacioni zadatak"
        description='Ovo je deo gde se najčešće vidi da li učenik stvarno razume primenu izvoda. Nije poenta u tome da „izvedeš pa izjednačiš sa nulom", već da pravilno prevedeš tekst zadatka na funkciju.'
      >
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Izaberi promenljivu">
            <p>
              U realnom problemu često postoji više veličina, ali iz uslova
              treba jednu da izraziš preko druge. Cilj je da dobiješ funkciju
              jedne promenljive.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Napiši funkciju koju optimizuješ">
            <p>
              To može biti površina, zapremina, dužina puta, trošak i slično.
              Mora biti jasno šta tačno postaje funkcija od izabrane promenljive.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Odredi domen">
            <p>
              Fizički smisao zadatka nameće ograničenja. Dužine moraju biti
              pozitivne, zapremina ne može biti negativna, a neki izraz možda
              mora ostati ispod zadate granice.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Nađi kritične tačke i proveri znak">
            <p>
              Tek sada dolazi računanje izvoda. Kada dobiješ kandidat tačku,
              moraš proveriti da li je minimum ili maksimum u okviru domena.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Vrati se na jezik zadatka">
            <p>
              Na kraju odgovor mora biti smislen: ne pišeš samo{" "}
              <InlineMath>{"x=5"}</InlineMath>, već na primer „pravougaonik je
              kvadrat stranice 5 cm i tada površina iznosi 25 cm
              <InlineMath>{"^2"}</InlineMath>".
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto nije dovoljno samo rešiti f'(x)=0?"
          answer={
            <p>
              Zato što dobijena vrednost može biti van domena, može dati minimum
              umesto maksimuma ili čak ne mora biti ekstrem ako se znak izvoda ne
              promeni. Izvod daje kandidat tačke, a ne gotov odgovor.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni deo"
        title="Interaktivna laboratorija izvoda"
        description='Menjaj koeficijente kubne funkcije i posmatraj istovremeno tri stvari: oblik grafa, ponašanje prvog izvoda i tangentnu pravu u izabranoj tački. Posebno probaj preset „Stacionarna bez ekstrema" da vidiš zašto f′(x₀)=0 nije dovoljan uslov.'
      >
        <DerivativeApplicationLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Prvo gledaj gde graf menja smer, pa tek onda proveri znakove u traci
            izvoda. Zatim pomeraj x&#x2080; i prati kako se menja nagib
            tangente. Ako vidiš da u nekoj tački tangenta postaje horizontalna, a
            funkcija ipak ne menja smer, upravo to ilustruje razliku između
            stacionarne tačke i ekstrema.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Korak po korak"
        title="Vođeni primeri"
        description="Primeri su raspoređeni od tipičnog ispitivanja funkcije, preko tangente, do klasične optimizacije. Cilj nije samo da vidiš račun, već i obrazac razmišljanja."
      >
        {/* Primer 1 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 1: Monotonost i lokalni ekstremi
          </h3>
          <p>
            Ispitati monotonost i odrediti lokalne ekstremne vrednosti funkcije{" "}
            <InlineMath>{"f(x)=x^3-3x^2-9x+5"}</InlineMath>.
          </p>
          <div className={s.walkthrough} style={{ marginTop: 12 }}>
            <WalkStep number={1} title="Računamo izvod">
              <MathBlock>
                {"f'(x)=3x^2-6x-9=3(x^2-2x-3)=3(x-3)(x+1)."}
              </MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Kritične tačke">
              <MathBlock>
                {"3(x-3)(x+1)=0 \\Rightarrow x=-1 \\text{ ili } x=3."}
              </MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Tabela znakova">
              <MathBlock>
                {
                  "f'(x)>0 \\text{ na } (-\\infty,-1) \\cup (3,+\\infty), \\qquad f'(x)<0 \\text{ na } (-1,3)."
                }
              </MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Zaključak o monotonosti">
              <p>
                Funkcija raste na{" "}
                <InlineMath>{"(-\\infty,-1)"}</InlineMath> i{" "}
                <InlineMath>{"(3,+\\infty)"}</InlineMath>, a opada na{" "}
                <InlineMath>{"(-1,3)"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={5} title="Ekstremi">
              <p>
                Pošto znak prelazi iz plus u minus kod{" "}
                <InlineMath>{"x=-1"}</InlineMath>, tu je lokalni maksimum.
                Pošto prelazi iz minus u plus kod{" "}
                <InlineMath>{"x=3"}</InlineMath>, tu je lokalni minimum.
              </p>
              <MathBlock>{"f(-1)=10, \\qquad f(3)=-22."}</MathBlock>
            </WalkStep>
          </div>
          <InsightCard title="Pedagoška poruka">
            <p>
              Nemoj učiti napamet samo „reši{" "}
              <InlineMath>{"f'(x)=0"}</InlineMath>". Ključni deo je promena
              znaka. Tu zapravo odlučuješ da li si našao maksimum, minimum ili
              samo stacionarnu tačku bez ekstrema.
            </p>
          </InsightCard>
        </article>

        {/* Primer 2 */}
        <article className={s.exampleCard} style={{ marginTop: 18 }}>
          <h3 className={cs.tCardTitle}>Primer 2: Jednačina tangente</h3>
          <p>
            Naći jednačinu tangente funkcije{" "}
            <InlineMath>{"f(x)=x^2-4x+5"}</InlineMath> u tački sa apscisom{" "}
            <InlineMath>{"x_0=1"}</InlineMath>.
          </p>
          <div className={s.walkthrough} style={{ marginTop: 12 }}>
            <WalkStep number={1} title="Određujemo tačku dodira">
              <MathBlock>{"f(1)=1-4+5=2."}</MathBlock>
              <p>
                Tangenta prolazi kroz tačku{" "}
                <InlineMath>{"A(1,2)"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Izvod i nagib">
              <MathBlock>{"f'(x)=2x-4,"}</MathBlock>
              <p>
                pa je nagib tangente u datoj tački{" "}
                <InlineMath>{"f'(1)=2\\cdot 1-4=-2"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={3} title="Uvrštavamo u formulu prave">
              <MathBlock>{"y-2=-2(x-1)."}</MathBlock>
              <p>Sređivanjem dobijamo:</p>
              <MathBlock>{"y=-2x+4."}</MathBlock>
            </WalkStep>
          </div>
          <InsightCard title="Pedagoška poruka">
            <p>
              Tangenta se nikada ne dobija samo iz izvoda. Potrebni su i nagib i
              tačka kroz koju prava prolazi. Zato su uvek obavezna oba koraka:{" "}
              <InlineMath>{"f(x_0)"}</InlineMath> i{" "}
              <InlineMath>{"f'(x_0)"}</InlineMath>.
            </p>
          </InsightCard>
        </article>

        {/* Primer 3 */}
        <article className={s.exampleCard} style={{ marginTop: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 3: Optimizacija iz geometrije
          </h3>
          <p>
            Pravougaonik ima obim <InlineMath>{"20"}</InlineMath> cm. Naći
            njegove dimenzije ako je površina maksimalna.
          </p>
          <div className={s.walkthrough} style={{ marginTop: 12 }}>
            <WalkStep number={1} title="Uslov o obimu">
              <MathBlock>
                {"2x+2y=20 \\Rightarrow x+y=10 \\Rightarrow y=10-x."}
              </MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Površina kao funkcija jedne promenljive">
              <MathBlock>{"P=xy=x(10-x)=10x-x^2,"}</MathBlock>
              <p>
                pri čemu važi <InlineMath>{"0<x<10"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={3} title="Izvod i kritična tačka">
              <MathBlock>{"P'(x)=10-2x."}</MathBlock>
              <p>
                Iz <InlineMath>{"P'(x)=0"}</InlineMath> sledi{" "}
                <InlineMath>{"x=5"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={4} title="Provera znaka">
              <p>
                Za <InlineMath>{"x<5"}</InlineMath> važi{" "}
                <InlineMath>{"P'(x)>0"}</InlineMath>, a za{" "}
                <InlineMath>{"x>5"}</InlineMath> važi{" "}
                <InlineMath>{"P'(x)<0"}</InlineMath>. Dakle, u{" "}
                <InlineMath>{"x=5"}</InlineMath> površina dostiže maksimum.
              </p>
            </WalkStep>
            <WalkStep number={5} title="Odgovor na jeziku zadatka">
              <p>
                Pošto je <InlineMath>{"y=10-x"}</InlineMath>, dobijamo i{" "}
                <InlineMath>{"y=5"}</InlineMath>. Pravougaonik maksimalne
                površine je zapravo kvadrat stranice 5 cm, a maksimalna
                površina je:
              </p>
              <MathBlock>{"P_{\\max}=25 \\text{ cm}^2."}</MathBlock>
            </WalkStep>
          </div>
          <InsightCard title="Pedagoška poruka">
            <p>
              U optimizaciji je najvažniji prelaz sa rečenice na funkciju. Kada
              se to uradi uredno, ostatak postupka je ista logika kao kod
              običnog ispitivanja ekstrema.
            </p>
          </InsightCard>
        </article>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Formula karta"
        title="Ključne formule i obrasci"
        description="Ovo je sažetak koji treba da ti ostane u glavi kada rešavaš zadatak pod pritiskom vremena."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Znak izvoda"
            formula={"f'(x)>0 \Rightarrow f \text{ raste}, \qquad f'(x)<0 \Rightarrow f \text{ opada}."}
            note="Ovo važi po intervalima, ne samo u jednoj tački."
          />
          <FormulaCard
            title="Stacionarna tačka"
            formula="f'(x_0)=0"
            note="Ovo je kandidat za ekstrem, ali ne i gotov dokaz da ekstrem postoji."
          />
          <FormulaCard
            title="Promena znaka"
            formula={"+ \to - : \max, \qquad - \to + : \min"}
            note="Promena smera funkcije je stvarni kriterijum za lokalni ekstrem."
          />
          <FormulaCard
            title="Jednačina tangente"
            formula="y-f(x_0)=f'(x_0)(x-x_0)"
            note="Potrebna su dva podatka: tačka dodira i nagib."
          />
          <FormulaCard
            title="Apsolutni maks/min"
            formula={"\text{proveriti i kritične tačke i krajeve intervala}"}
            note="Na prijemnom je ovo tipična greška kada zadatak traži najveću ili najmanju vrednost."
          />
          <FormulaCard
            title="Model pa izvod"
            formula={"\text{uslov} \Rightarrow \text{funkcija jedne promenljive} \Rightarrow f'(x)=0"}
            note="Bez dobrog modela nema dobrog odgovora, pa makar račun izvoda bio tačan."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Pazi ovde"
        title="Česte greške"
        description="Ovo nisu opšti saveti, već konkretne greške koje učenici stvarno prave kada prvi put primenjuju izvod na ozbiljne zadatke."
      >
        <div className={s.grid3}>
          <SectionCard title="Zaustavljanje na f'(x)=0">
            <p>
              Dobijena tačka je samo kandidat. Ako ne proveriš znak izvoda levo
              i desno, ne znaš da li si dobio maksimum, minimum ili ništa od
              toga.
            </p>
          </SectionCard>
          <SectionCard title="Zaboravljen domen">
            <p>
              Kod racionalnih, korenskih i logaritamskih funkcija intervali
              monotonosti zavise od domene. Ako domen nije napisan, zaključak je
              nepotpun.
            </p>
          </SectionCard>
          <SectionCard title="Nulta derivacija = ekstrem">
            <p>
              Ovo je verovatno najčešća konceptualna greška. Primer{" "}
              <InlineMath>{"f(x)=x^3"}</InlineMath> moraš pamtiti kao
              protivprimer.
            </p>
          </SectionCard>
          <SectionCard title="Tangenta bez tačke dodira">
            <p>
              Nije dovoljno izračunati nagib. Prava mora da prolazi kroz tačku
              na grafiku, zato obavezno računaš i{" "}
              <InlineMath>{"f(x_0)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Nema povratka na tekst zadatka">
            <p>
              Dobijeni broj moraš prevesti u smislen odgovor: dimenzije,
              površinu, minimalnu udaljenost, maksimalnu zapreminu i slično.
            </p>
          </SectionCard>
          <SectionCard title="Ignorisanje krajeva intervala">
            <p>
              Kada zadatak traži najveću ili najmanju vrednost na zatvorenom
              intervalu, krajevi su ravnopravni kandidati sa stacionarnim
              tačkama.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="Ispitna rutina"
        title="Veza sa prijemnim zadacima"
        description="Ova oblast na prijemnom najčešće proverava disciplinu zaključivanja. Račun izvoda jeste važan, ali presudno je da ispravno protumačiš dobijene informacije."
      >
        <div className={s.grid2}>
          <SectionCard title="Najčešći formati zadataka">
            <ul>
              <li>
                „Ispitati monotonost i odrediti ekstremne vrednosti funkcije."
              </li>
              <li>„Naći jednačinu tangente grafa funkcije u datoj tački."</li>
              <li>
                „Odrediti najveću/najmanju vrednost neke veličine uz zadati
                uslov."
              </li>
              <li>
                „Odrediti parametar tako da funkcija ima ekstrem u zadatoj
                tački."
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Kontrolna lista pre predaje zadatka">
            <ol>
              <li>Da li sam odredio domen?</li>
              <li>Da li sam tačno izračunao prvi izvod?</li>
              <li>
                Da li sam našao sve kritične tačke koje pripadaju domenu?
              </li>
              <li>Da li sam proverio znak izvoda po intervalima?</li>
              <li>Da li sam rezultat preveo na jezik zadatka?</li>
            </ol>
          </SectionCard>
        </div>
        <SectionCard title="Tipična taktička prednost">
          <p>
            Ako sigurno praviš tabelu znakova, dobijaš bodove i kad je račun
            dug. Mnogo učenika izgubi poene ne zato što ne zna da diferencira,
            već zato što preskoči upravo zaključni korak.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbaj aktivno"
        title="Vežbe za samostalan rad"
        description="Pokušaj najpre bez gledanja rešenja. Rešenja su data ispod da bi mogao da proveriš i račun i tok razmišljanja."
      >
        <div className={s.exampleGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Ispitati monotonost i odrediti lokalne ekstremne vrednosti
                funkcije{" "}
                <InlineMath>{"f(x)=x^3-6x^2+9x+1"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"f'(x)=3x^2-12x+9=3(x-1)(x-3)."}</MathBlock>
                <p>
                  Kritične tačke su <InlineMath>{"x=1"}</InlineMath> i{" "}
                  <InlineMath>{"x=3"}</InlineMath>. Znak izvoda je{" "}
                  <InlineMath>{"+"}</InlineMath> na{" "}
                  <InlineMath>{"(-\\infty,1)"}</InlineMath>,{" "}
                  <InlineMath>{"-"}</InlineMath> na{" "}
                  <InlineMath>{"(1,3)"}</InlineMath>, pa opet{" "}
                  <InlineMath>{"+"}</InlineMath> na{" "}
                  <InlineMath>{"(3,+\\infty)"}</InlineMath>. Zato funkcija
                  raste na <InlineMath>{"(-\\infty,1)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,+\\infty)"}</InlineMath>, opada na{" "}
                  <InlineMath>{"(1,3)"}</InlineMath>, ima lokalni maksimum{" "}
                  <InlineMath>{"f(1)=5"}</InlineMath> i lokalni minimum{" "}
                  <InlineMath>{"f(3)=1"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Naći jednačinu tangente funkcije{" "}
                <InlineMath>{"f(x)=x^2+3x-1"}</InlineMath> u tački sa
                apscisom <InlineMath>{"x_0=2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"f(2)=4+6-1=9, \\qquad f'(x)=2x+3, \\qquad f'(2)=7."}
                </MathBlock>
                <p>
                  Tangenta prolazi kroz{" "}
                  <InlineMath>{"A(2,9)"}</InlineMath> i ima nagib{" "}
                  <InlineMath>{"7"}</InlineMath>, pa važi:
                </p>
                <MathBlock>{"y-9=7(x-2)."}</MathBlock>
                <p>Posle sređivanja:</p>
                <MathBlock>{"y=7x-5."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Ispitati funkciju{" "}
                <InlineMath>{"f(x)=x+\\dfrac{9}{x}"}</InlineMath> na intervalu{" "}
                <InlineMath>{"(0,+\\infty)"}</InlineMath> i naći minimum.
              </p>
            }
            solution={
              <>
                <MathBlock>{"f'(x)=1-\\frac{9}{x^2}."}</MathBlock>
                <p>
                  Iz <InlineMath>{"f'(x)=0"}</InlineMath> sledi{" "}
                  <InlineMath>{"x^2=9"}</InlineMath>, ali pošto je domen{" "}
                  <InlineMath>{"(0,+\\infty)"}</InlineMath>, uzimamo samo{" "}
                  <InlineMath>{"x=3"}</InlineMath>. Za{" "}
                  <InlineMath>{"0<x<3"}</InlineMath> važi{" "}
                  <InlineMath>{"f'(x)<0"}</InlineMath>, a za{" "}
                  <InlineMath>{"x>3"}</InlineMath> važi{" "}
                  <InlineMath>{"f'(x)>0"}</InlineMath>. Zato funkcija opada na{" "}
                  <InlineMath>{"(0,3)"}</InlineMath>, raste na{" "}
                  <InlineMath>{"(3,+\\infty)"}</InlineMath>, pa minimum ima u{" "}
                  <InlineMath>{"x=3"}</InlineMath>:
                </p>
                <MathBlock>{"f(3)=3+\\frac{9}{3}=6."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Pravougaonik ima obim <InlineMath>{"16"}</InlineMath> cm. Naći
                njegove dimenzije ako je površina maksimalna.
              </p>
            }
            solution={
              <>
                <p>
                  Neka su stranice <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"8-x"}</InlineMath>. Površina je:
                </p>
                <MathBlock>
                  {"P(x)=x(8-x)=8x-x^2, \\qquad 0<x<8."}
                </MathBlock>
                <MathBlock>{"P'(x)=8-2x."}</MathBlock>
                <p>
                  Rešavanjem <InlineMath>{"P'(x)=0"}</InlineMath> dobijamo{" "}
                  <InlineMath>{"x=4"}</InlineMath>. Znak prelazi iz plus u
                  minus, pa je tu maksimum. Dimenzije su 4 cm i 4 cm, a
                  maksimalna površina je{" "}
                  <InlineMath>{"16\\text{ cm}^2"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Poznato je da je{" "}
                <InlineMath>{"f'(x)=(x-1)(x+2)"}</InlineMath>. Odrediti
                intervale monotonosti i tip kritičnih tačaka.
              </p>
            }
            solution={
              <>
                <p>
                  Nule izvoda su <InlineMath>{"x=-2"}</InlineMath> i{" "}
                  <InlineMath>{"x=1"}</InlineMath>. Znak:{" "}
                  <InlineMath>{"f'(x)>0"}</InlineMath> na{" "}
                  <InlineMath>{"(-\\infty,-2)"}</InlineMath>,{" "}
                  <InlineMath>{"f'(x)<0"}</InlineMath> na{" "}
                  <InlineMath>{"(-2,1)"}</InlineMath>,{" "}
                  <InlineMath>{"f'(x)>0"}</InlineMath> na{" "}
                  <InlineMath>{"(1,+\\infty)"}</InlineMath>. Zato funkcija
                  raste, pa opada, pa opet raste. U{" "}
                  <InlineMath>{"x=-2"}</InlineMath> je lokalni maksimum, a u{" "}
                  <InlineMath>{"x=1"}</InlineMath> lokalni minimum. Bez
                  eksplicitne formule za <InlineMath>{"f"}</InlineMath> ne možemo
                  odrediti njihove vrednosti, ali tip tačaka jeste potpuno
                  određen.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI UVID ═══════════ */}
      <InsightCard title="Ključni uvid">
        <p>
          Prvi izvod ne služi da „nađeš nule", već da pročitaš priču funkcije:
          gde se penje, gde se spušta, gde menja smer i kako izgleda njena
          tangentna prava u izabranoj tački.
        </p>
      </InsightCard>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Šta da zapamtiš"
        title="Završni rezime"
        description="Ako treba da sačuvaš samo nekoliko ideja iz ove lekcije, neka to budu sledeće tri grupe."
      >
        <div className={s.grid3}>
          <SectionCard title="1. Monotonost">
            <ul>
              <li>
                Računaš <InlineMath>{"f'(x)"}</InlineMath>, nalaziš kritične
                tačke i praviš tabelu znakova.
              </li>
              <li>
                <InlineMath>{"f'(x)>0"}</InlineMath> znači rast, a{" "}
                <InlineMath>{"f'(x)<0"}</InlineMath> znači opadanje.
              </li>
              <li>
                Nule izvoda same po sebi nisu dovoljne bez provere znaka.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="2. Ekstremi i tangenta">
            <ul>
              <li>
                Plus u minus daje lokalni maksimum, minus u plus daje lokalni
                minimum.
              </li>
              <li>
                <InlineMath>{"f'(x_0)=0"}</InlineMath> može dati i stacionarnu
                tačku bez ekstrema.
              </li>
              <li>
                Tangenta uvek koristi i tačku dodira i nagib:{" "}
                <InlineMath>
                  {"y-f(x_0)=f'(x_0)(x-x_0)"}
                </InlineMath>
                .
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="3. Prijemni pristup">
            <ul>
              <li>
                Najpre napiši domen i jasno prepoznaj šta zadatak stvarno traži.
              </li>
              <li>
                U optimizaciji prvo formiraš funkciju jedne promenljive, pa tek
                onda diferenciraš.
              </li>
              <li>
                Na kraju odgovor piši jezikom zadatka, a ne samo simbolima.
              </li>
            </ul>
          </SectionCard>
        </div>

        <p style={{ marginTop: 14, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
          Sledeći logičan korak u učenju je da ovu istu disciplinu primeniš na
          složenije funkcije i zadatke gde se traže dodatni uslovi ili
          naprednije grafičko razumevanje.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
