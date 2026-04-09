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
import LinearFunctionLab from "./LinearFunctionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnovna-ideja", label: "Osnovna ideja" },
  { href: "#koeficijenti", label: "Koeficijenti" },
  { href: "#nula-znak", label: "Nula i znak" },
  { href: "#crtanje", label: "Crtanje grafa" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson16Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 16"
        title={
          <>
            Linearna funkcija i njen{" "}
            <span className={cs.tHeroAccent}>grafik</span>
          </>
        }
        description="Kada vidiš zapis y = kx + n, treba odmah da znaš tri stvari: kako prava izgleda, gde seče ose i da li raste ili opada. To je jedan od osnovnih modela na prijemnim ispitima, jer povezuje algebru, koordinatni sistem i čitanje uslova iz zadatka."
        heroImageSrc="/images/lessons/lesson16_hero.png"
        heroImageAlt="Ilustracija linearne funkcije i njenog grafika"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako iz formule odmah čitaš nagib, odsečak i nulu funkcije. Bez nasumičnog ubadanja tačaka i bez gubljenja vremena na ispitu.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje znaka funkcije sa znakom koeficijenta n. Znak funkcije zavisi od cele formule i od položaja u odnosu na nulu.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa parametrom, presekom sa osama i čitanjem grafa. Često se traži kratak zaključak, ali iza njega stoji čista logika ove lekcije.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "Oko 60 minuta za pažljivo čitanje, primere i interaktivnu proveru.",
          },
          {
            label: "Predznanje",
            description:
              "Koordinatni sistem, jednačine prvog stepena i rad sa realnim brojevima.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz formule y = kx + n brzo izvedeš sve najvažnije osobine funkcije.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Laboratorija za menjanje k, n i tačke x uz trenutni prikaz grafa.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Prvi most između algebre i geometrije"
        description="Linearna funkcija je prvi ozbiljan most između algebre i geometrije. Jedna formula proizvodi jednu pravu, a iz te prave možeš da čitaš odnose, preseke, znak i ponašanje funkcije. Zato se tema stalno vraća u kasnijim oblastima."
      >
        <div className={s.grid3}>
          <SectionCard title="Od formule do slike">
            <p>
              U zadatku ne treba da vidiš samo simbolički zapis, već objekat u
              ravni. Kada razumeš kako <InlineMath>{"k"}</InlineMath> i{" "}
              <InlineMath>{"n"}</InlineMath> pomeraju pravu, lakše rešavaš i
              sisteme jednačina, i analitičku geometriju, i kasnije funkcije
              višeg stepena.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni zadaci traže brzinu">
            <p>
              Na ispitu se često ne traži kompletno crtanje, već brz zaključak:
              da li funkcija raste, gde je pozitivna, pod kojim uslovom seče osu
              ili kako izgleda kada parametar menja nagib.
            </p>
          </SectionCard>
          <SectionCard title="Osnova za modelovanje">
            <p>
              Mnoge realne situacije u početnim zadacima opisuju se linearnim
              zavisnostima: cena, kretanje, proporcionalna promena, linearna
              aproksimacija. Ova lekcija gradi jezik kojim ćeš te veze
              opisivati.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Zašto je ova tema toliko česta na prijemnim?"
          answer={
            <p>
              Zato što proverava više veština odjednom: rad sa jednačinama,
              čitanje koordinatnog sistema, logičko zaključivanje o znaku i
              razumevanje parametra. Jednostavna je po formi, a vrlo pogodna za
              pravljenje zamki.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnovna-ideja"
        eyebrow="Definicija + intuicija"
        title="Osnovna ideja: šta je linearna funkcija"
        description="U školskom programu i na većini prijemnih ispita linearna funkcija se zapisuje u obliku f(x) = kx + n, gde su k, n iz skupa realnih brojeva. Grafik takve funkcije je prava."
      >
        <div className={s.grid3}>
          <SectionCard title="Formalni zapis">
            <p>
              Linearna funkcija je preslikavanje koje svakoj realnoj vrednosti{" "}
              <InlineMath>{"x"}</InlineMath> pridružuje realan broj{" "}
              <InlineMath>{"f(x)=kx+n"}</InlineMath>. Najčešće uzimamo{" "}
              <InlineMath>{"f:\\mathbb{R}\\to\\mathbb{R}"}</InlineMath>.
            </p>
            <MathBlock>{"f(x)=kx+n"}</MathBlock>
            <MathBlock>{"D(f)=\\mathbb{R}"}</MathBlock>
            <p>
              Dakle, po pravilu nema zabranjenih vrednosti za{" "}
              <InlineMath>{"x"}</InlineMath>. To je važna razlika u odnosu na
              racionalne ili korenske funkcije.
            </p>
          </SectionCard>

          <SectionCard title="Kako da je intuitivno pamtiš">
            <p>
              Posmatraj <InlineMath>{"kx+n"}</InlineMath> kao spoj dve
              informacije:
            </p>
            <MathBlock>{"kx \\quad \\text{govori o nagibu}"}</MathBlock>
            <MathBlock>
              {"n \\quad \\text{govori gde prava seče } y\\text{-osu}"}
            </MathBlock>
            <p>
              Ako menjaš samo <InlineMath>{"k"}</InlineMath>, prava se više ili
              manje naginje. Ako menjaš samo <InlineMath>{"n"}</InlineMath>,
              prava klizi naviše ili naniže.
            </p>
          </SectionCard>

          <SectionCard title="Važna terminološka napomena">
            <p>
              U strožoj matematičkoj terminologiji izraz{" "}
              <InlineMath>{"f(x)=kx"}</InlineMath> zove se linearna funkcija, a
              izraz <InlineMath>{"f(x)=kx+n"}</InlineMath> afina funkcija.
              Međutim, na školskom nivou i u zadacima za prijemni gotovo uvek se
              koristi naziv <strong>linearna funkcija</strong> za oblik{" "}
              <InlineMath>{"kx+n"}</InlineMath>. Tu konvenciju pratimo i ovde.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Suština">
          <p>
            Ne uči napamet da je grafik &ldquo;prava&rdquo;, već vežbaj da
            odmah vidiš <strong>koja prava</strong> je u pitanju.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Da li linearna funkcija uvek ima nulu?"
          answer={
            <>
              <p>Ne uvek.</p>
              <ul>
                <li>
                  Ako je <InlineMath>{"k \\neq 0"}</InlineMath>, nula postoji i
                  dobija se iz <InlineMath>{"kx+n=0"}</InlineMath>.
                </li>
                <li>
                  Ako je <InlineMath>{"k=0"}</InlineMath> i{" "}
                  <InlineMath>{"n\\neq 0"}</InlineMath>, funkcija je konstantna
                  i nema nulu.
                </li>
                <li>
                  Ako je <InlineMath>{"k=0"}</InlineMath> i{" "}
                  <InlineMath>{"n=0"}</InlineMath>, funkcija je{" "}
                  <InlineMath>{"f(x)=0"}</InlineMath> i svaki realan broj je
                  njena nula.
                </li>
              </ul>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ KOEFICIJENTI ═══════════ */}
      <LessonSection
        id="koeficijenti"
        eyebrow="Čitanje formule"
        title="Uloga koeficijenata k i n"
        description="Većina zadataka iz ove lekcije svodi se na pravilno čitanje dva broja. Ako njih razumeš, cela funkcija postaje pregledna."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="k određuje nagib i monotonost"
            formula={"k>0 \\Rightarrow \\text{funkcija raste}"}
            note={
              <>
                Što je apsolutna vrednost broja <InlineMath>{"k"}</InlineMath>{" "}
                veća, prava je strmija. Za{" "}
                <InlineMath>{"k<0"}</InlineMath> funkcija opada, a za{" "}
                <InlineMath>{"k=0"}</InlineMath> funkcija je konstantna.
              </>
            }
          />
          <FormulaCard
            title="n je odsečak na y-osi"
            formula={"f(0)=k\\cdot 0+n=n"}
            note={
              <>
                Dovoljno je da staviš <InlineMath>{"x=0"}</InlineMath>. Tačka{" "}
                <InlineMath>{"(0,n)"}</InlineMath> uvek leži na grafiku
                funkcije.
              </>
            }
          />
          <FormulaCard
            title="Dva parametra, dve vrste promene"
            formula="y=kx+n"
            note={
              <>
                Ako zadržiš <InlineMath>{"n"}</InlineMath>, a menjaš{" "}
                <InlineMath>{"k"}</InlineMath>, prava se okreće oko tačke{" "}
                <InlineMath>{"(0,n)"}</InlineMath>. Ako zadržiš{" "}
                <InlineMath>{"k"}</InlineMath>, a menjaš{" "}
                <InlineMath>{"n"}</InlineMath>, dobijaš prave koje su međusobno
                paralelne.
              </>
            }
          />
        </div>

        {/* Mini table */}
        <div className={s.exampleGrid} style={{ marginTop: 16 }}>
          <SectionCard title="Primeri za vežbu čitanja">
            <ul>
              <li>
                <InlineMath>{"y=2x+1"}</InlineMath>:{" "}
                <InlineMath>{"k=2"}</InlineMath>, presek{" "}
                <InlineMath>{"(0,1)"}</InlineMath> — rastuća prava, seče{" "}
                <InlineMath>{"y"}</InlineMath>-osu iznad nule.
              </li>
              <li>
                <InlineMath>{"y=-\\tfrac12x+3"}</InlineMath>:{" "}
                <InlineMath>{"k=-\\tfrac12"}</InlineMath>, presek{" "}
                <InlineMath>{"(0,3)"}</InlineMath> — opadajuća prava, blaži
                nagib.
              </li>
              <li>
                <InlineMath>{"y=-4"}</InlineMath>:{" "}
                <InlineMath>{"k=0"}</InlineMath>, presek{" "}
                <InlineMath>{"(0,-4)"}</InlineMath> — horizontalna prava,
                konstantna funkcija.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Kako to koristiti na ispitu">
            <p>
              Za svaku datu funkciju prvo prepoznaj ko je{" "}
              <InlineMath>{"k"}</InlineMath>, a ko <InlineMath>{"n"}</InlineMath>
              . Iz toga odmah čitaš monotonost i presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom, bez dodatnog računanja.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Šta znači da dve linearne funkcije imaju isti k?"
          answer={
            <p>
              Njihovi grafici su paralelne prave, osim ako su i{" "}
              <InlineMath>{"n"}</InlineMath> isti, kada se zapravo radi o istoj
              pravoj.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ NULA I ZNAK ═══════════ */}
      <LessonSection
        id="nula-znak"
        eyebrow="Najvažniji prijemni deo"
        title="Nula funkcije, znak i monotonost"
        description="Ovaj deo je najčešće direktno prisutan u zadatku. Traži se da znaš gde funkcija menja znak, kada je pozitivna, a kada negativna, i kako sve to zavisi od koeficijenta pravca."
      >
        <div className={s.grid2}>
          <SectionCard title="Nula funkcije">
            <p>
              Nula funkcije je ona vrednost promenljive{" "}
              <InlineMath>{"x"}</InlineMath> za koju funkcija postaje jednaka
              nuli.
            </p>
            <MathBlock>{"f(x)=kx+n"}</MathBlock>
            <MathBlock>{"f(x)=0 \\iff kx+n=0"}</MathBlock>
            <MathBlock>{"x_0=-\\frac{n}{k}, \\quad k\\neq 0"}</MathBlock>
            <p>
              Geometrijski, to je presek grafa sa <InlineMath>{"x"}</InlineMath>
              -osom, dakle tačka <InlineMath>{"(x_0,0)"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Monotonost">
            <p>
              Za linearnu funkciju monotonost ne zavisi od{" "}
              <InlineMath>{"x"}</InlineMath>, već samo od znaka broja{" "}
              <InlineMath>{"k"}</InlineMath>. Zato zaključak možeš dati odmah.
            </p>
            <MathBlock>
              {"k>0 \\Rightarrow f \\text{ je rastuća na } \\mathbb{R}"}
            </MathBlock>
            <MathBlock>
              {"k<0 \\Rightarrow f \\text{ je opadajuća na } \\mathbb{R}"}
            </MathBlock>
            <MathBlock>{"k=0 \\Rightarrow f \\text{ je konstantna}"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Levo od nule negativna, desno pozitivna"
            formula={"x<x_0 \\Rightarrow f(x)<0,\\quad x>x_0 \\Rightarrow f(x)>0"}
            note={
              <>
                Važi kada je <InlineMath>{"k>0"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Levo od nule pozitivna, desno negativna"
            formula={"x<x_0 \\Rightarrow f(x)>0,\\quad x>x_0 \\Rightarrow f(x)<0"}
            note={
              <>
                Važi kada je <InlineMath>{"k<0"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Ako je k = 0, nema prelaska kroz x-osu"
            formula="f(x)=n"
            note={
              <>
                Funkcija je ili uvek pozitivna, ili uvek negativna, ili stalno
                jednaka nuli. Učenici često zaboravljaju ovaj slučaj jer
                mehanički traže{" "}
                <InlineMath>{"x_0=-\\frac{n}{k}"}</InlineMath>, a deljenje nulom
                nije dozvoljeno.
              </>
            }
          />
        </div>

        <InsightCard title="Brza logika za ispit">
          <p>
            Prvo proveri da li je <InlineMath>{"k=0"}</InlineMath>. Ako nije,
            nađi nulu <InlineMath>{"x_0=-\\frac{n}{k}"}</InlineMath>, pa tek
            onda odlučuj o znaku levo i desno od nje na osnovu znaka broja{" "}
            <InlineMath>{"k"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Za f(x) = -3x + 6, gde je funkcija pozitivna?"
          answer={
            <>
              <p>Najpre nađemo nulu:</p>
              <MathBlock>{"-3x+6=0 \\Rightarrow x=2"}</MathBlock>
              <p>
                Pošto je <InlineMath>{"k=-3<0"}</InlineMath>, funkcija je levo
                od nule pozitivna, a desno negativna. Zato je
              </p>
              <MathBlock>{"f(x)>0 \\quad \\text{za } x<2."}</MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ CRTANJE GRAFA ═══════════ */}
      <LessonSection
        id="crtanje"
        eyebrow="Metodika crtanja"
        title="Kako se crta grafik linearne funkcije"
        description="Pravu možeš da nacrtaš na više načina, ali na prijemnim su dva postupka najpraktičnija: preko dve tačke ili preko preseka sa osama."
      >
        <div className={s.grid3}>
          <SectionCard title="Metod 1: presek sa y-osom + još jedna tačka">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izračunaj (0, n)." />
              <WalkStep
                number={2}
                title="Izaberi još neku praktičnu vrednost za x, na primer x = 1."
              />
              <WalkStep number={3} title="Izračunaj odgovarajuću vrednost y." />
              <WalkStep number={4} title="Spoji te dve tačke pravom." />
            </div>
            <MathBlock>{"y=2x-3"}</MathBlock>
            <MathBlock>{"x=0 \\Rightarrow y=-3 \\Rightarrow (0,-3)"}</MathBlock>
            <MathBlock>{"x=2 \\Rightarrow y=1 \\Rightarrow (2,1)"}</MathBlock>
          </SectionCard>

          <SectionCard title="Metod 2: preseci sa obe ose">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Nađi presek sa y-osom stavljanjem x = 0."
              />
              <WalkStep
                number={2}
                title="Nađi presek sa x-osom rešavanjem y = 0."
              />
              <WalkStep number={3} title="Spoji te dve tačke pravom." />
            </div>
            <MathBlock>{"y=2x-3"}</MathBlock>
            <MathBlock>{"(0,-3)"}</MathBlock>
            <MathBlock>
              {
                "0=2x-3 \\Rightarrow x=\\frac{3}{2} \\Rightarrow \\left(\\frac{3}{2},0\\right)"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Kada je crtanje najlakše?">
            <p>
              Ako je nula funkcije racionalna i lako se računa, metod sa
              presecima je odličan. Ako nula nije pregledna, praktičnije je uzeti
              dve lake vrednosti za <InlineMath>{"x"}</InlineMath>, kao što su{" "}
              <InlineMath>{"0"}</InlineMath> i <InlineMath>{"2"}</InlineMath>, pa
              nacrtati pravu preko dobijenih tačaka.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Koje dve tačke najbrže dobijaš za y = -x + 4?"
          answer={
            <p>
              Presek sa <InlineMath>{"y"}</InlineMath>-osom je{" "}
              <InlineMath>{"(0,4)"}</InlineMath>, a nula funkcije daje presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom <InlineMath>{"(4,0)"}</InlineMath>.
              To su najbrže tačke za crtanje.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Canvas laboratorija"
        title="Interaktivna laboratorija: pomeraj k i n"
        description="U ovoj laboratoriji menjaš koeficijent pravca k, slobodan član n i tačku x. Posmatraj kako se istovremeno menja grafik, nula funkcije, znak i vrednost f(x)."
      >
        <LinearFunctionLab />

        <MicroCheck
          question="Kako da koristiš laboratoriju pametno?"
          answer={
            <>
              <p>
                Nemoj samo da pomeraš klizače. Za svaki novi par{" "}
                <InlineMath>{"(k,n)"}</InlineMath> probaj ovim redom:
              </p>
              <ul>
                <li>
                  napamet odredi da li funkcija raste, opada ili je konstantna,
                </li>
                <li>
                  izračunaj presek sa <InlineMath>{"y"}</InlineMath>-osom,
                </li>
                <li>
                  ako <InlineMath>{"k\\neq 0"}</InlineMath>, izračunaj nulu
                  funkcije,
                </li>
                <li>tek onda proveri na grafiku.</li>
              </ul>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Korak po korak"
        title="Vođeni primeri"
        description="Ovde prelazimo sa teorije na zadatke. Cilj nije samo da vidiš rešenje, već i redosled razmišljanja koji treba da postane rutina."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: direktna analiza funkcije
            </h3>
            <p>
              Data je funkcija <InlineMath>{"f(x)=2x-6"}</InlineMath>. Odredi
              domen, nulu, znak i monotonost.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Domen linearne funkcije je{" "}
                    <InlineMath>{"\\mathbb{R}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Nula se dobija iz <InlineMath>{"2x-6=0"}</InlineMath>, pa je{" "}
                    <InlineMath>{"x_0=3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Pošto je <InlineMath>{"k=2>0"}</InlineMath>, funkcija je
                    rastuća.
                  </>
                }
              />
              <WalkStep
                number={4}
                title="Kod rastuće funkcije znak je negativan levo od nule, a pozitivan desno."
              />
            </div>
            <MathBlock>{"D(f)=\\mathbb{R}"}</MathBlock>
            <MathBlock>{"x_0=3"}</MathBlock>
            <MathBlock>
              {"x<3 \\Rightarrow f(x)<0,\\qquad x>3 \\Rightarrow f(x)>0"}
            </MathBlock>
            <p>
              Vidiš kako se ceo zadatak rešava bez crtanja, samo pravilnim
              čitanjem broja <InlineMath>{"k"}</InlineMath> i izračunavanjem
              nule.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: jednačina prave iz dve tačke
            </h3>
            <p>
              Nađi jednačinu linearne funkcije čiji grafik prolazi kroz tačke{" "}
              <InlineMath>{"A(0,-2)"}</InlineMath> i{" "}
              <InlineMath>{"B(3,4)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto je <InlineMath>{"A(0,-2)"}</InlineMath>, odmah vidiš
                    da je <InlineMath>{"n=-2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title="Koeficijent pravca računa se kao promena y kroz promenu x."
              />
            </div>
            <MathBlock>
              {"k=\\frac{4-(-2)}{3-0}=\\frac{6}{3}=2"}
            </MathBlock>
            <MathBlock>{"y=2x-2"}</MathBlock>
            <p>
              Ovakav zadatak je čest jer proverava da li umeš da prevedeš
              geometrijski uslov u algebarski zapis.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: parametar i uslov o znaku
            </h3>
            <p>
              Za koju vrednost parametra <InlineMath>{"a"}</InlineMath> funkcija{" "}
              <InlineMath>{"f(x)=(a-1)x+4"}</InlineMath> opada i ima pozitivnu
              nulu?
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Da bi funkcija opadala, mora važiti{" "}
                    <InlineMath>{"a-1<0"}</InlineMath>, odnosno{" "}
                    <InlineMath>{"a<1"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Nula funkcije je{" "}
                    <InlineMath>{"x_0=-\\frac{4}{a-1}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Traži se da bude pozitivna, pa mora važiti{" "}
                    <InlineMath>{"-\\frac{4}{a-1}>0"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title="Pošto je broj -4 negativan, razlomak je pozitivan samo kada je imenilac negativan."
              />
            </div>
            <MathBlock>{"a-1<0"}</MathBlock>
            <MathBlock>
              {"x_0>0 \\iff -\\frac{4}{a-1}>0 \\iff a-1<0"}
            </MathBlock>
            <MathBlock>{"\\boxed{a<1}"}</MathBlock>
            <p>
              Ovde oba uslova vode na isti zaključak. Na prijemnom se često baš
              tako proverava da li umeš da povežeš nagib i nulu funkcije.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Brza mapa"
        title="Ključne formule i postupci"
        description="Ovo nije deo za bubanje bez razumevanja, nego mala mapa koju treba da umeš da primeniš u nekoliko sekundi."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Polazna formula"
            formula="y=kx+n"
            note={
              <>
                Uvek prvo prepoznaj ko je <InlineMath>{"k"}</InlineMath>, a ko
                je <InlineMath>{"n"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Presek sa y-osom"
            formula={"y=n \\qquad (0,n)"}
            note="Tačka preseka sa y-osom dobija se bez ikakvog računanja osim čitanja slobodnog člana."
          />
          <FormulaCard
            title="Nula funkcije"
            formula={"kx+n=0 \\qquad x_0=-\\frac{n}{k},\\; k\\neq 0"}
            note="To je presek sa x-osom."
          />
          <FormulaCard
            title="Monotonost"
            formula={"k>0 \\Rightarrow \\text{rastuća},\\quad k<0 \\Rightarrow \\text{opadajuća},\\quad k=0 \\Rightarrow \\text{konstantna}"}
          />
          <FormulaCard
            title="Koeficijent pravca iz dve tačke"
            formula={"k=\\frac{y_2-y_1}{x_2-x_1}, \\quad x_1\\neq x_2"}
            note={
              <>
                Posle toga zapisuješ <InlineMath>{"y=kx+n"}</InlineMath> i
                koristiš jednu od datih tačaka da odrediš{" "}
                <InlineMath>{"n"}</InlineMath>.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Tipične zamke"
        title="Česte greške"
        description="Ovo su baš one greške koje prave problem na prijemnom, ne opšti saveti. Vredi da ih pročitaš kao listu upozorenja."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešno tumačenje znaka funkcije</h3>
            <p>
              Učenik vidi da je <InlineMath>{"n>0"}</InlineMath> pa zaključi da
              je funkcija pozitivna. To nije tačno. Broj{" "}
              <InlineMath>{"n"}</InlineMath> govori samo presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom, a znak funkcije zavisi od
              vrednosti <InlineMath>{"x"}</InlineMath>.
            </p>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Automatsko korišćenje formule za nulu
            </h3>
            <p>
              Formula <InlineMath>{"x_0=-\\frac{n}{k}"}</InlineMath> važi samo
              ako je <InlineMath>{"k\\neq 0"}</InlineMath>. Kada je{" "}
              <InlineMath>{"k=0"}</InlineMath>, moraš posebno analizirati
              konstantnu funkciju.
            </p>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje rastuće funkcije i pozitivne funkcije
            </h3>
            <p>
              Funkcija može biti rastuća, a ipak imati negativne vrednosti na
              delu domena. Monotonost govori kako se funkcija menja, a znak
              govori da li su vrednosti iznad ili ispod nule.
            </p>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Loš izbor tačaka za crtanje</h3>
            <p>
              Ako izabereš nezgodne vrednosti, dobiješ komplikovane razlomke i
              sam sebi otežaš skicu. Uvek traži najjednostavnije tačke: presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom i eventualno nulu funkcije.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Ispitna strategija"
        title="Veza sa prijemnim zadacima"
        description="Na prijemnim se linearna funkcija retko pita potpuno izolovano. Češće je deo šireg zadatka, ali jezgro rešenja ostaje isto."
      >
        <div className={s.grid3}>
          <SectionCard title="Zadatak sa parametrom">
            <p>
              Traži se da funkcija raste, opada, bude pozitivna u određenoj
              tački ili da njena nula pripada nekom intervalu. Tada prvo pišeš
              uslov preko <InlineMath>{"k"}</InlineMath>, pa uslov preko{" "}
              <InlineMath>{"x_0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Zadatak iz analitičke geometrije">
            <p>
              Često se prava zadaje preko dve tačke, ugla ili preseka sa osama.
              Ako umeš da prevedeš podatke na <InlineMath>{"k"}</InlineMath> i{" "}
              <InlineMath>{"n"}</InlineMath>, pola posla je završeno.
            </p>
          </SectionCard>
          <SectionCard title="Kratka grafička interpretacija">
            <p>
              Nekad ne moraš ni da crtaš celu pravu. Dovoljno je da znaš gde
              seče ose i da li ide naviše ili naniže. To često daje tačan
              odgovor među ponuđenim opcijama.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Kontrolna lista za prijemni">
          <p>
            Proveri ko je <InlineMath>{"k"}</InlineMath>, ko je{" "}
            <InlineMath>{"n"}</InlineMath>, da li je{" "}
            <InlineMath>{"k=0"}</InlineMath>, izračunaj nulu, odredi
            monotonost, pa tek onda zaključuj o znaku ili položaju grafa.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbanje"
        title="Vežbe za samostalni rad"
        description="Pokušaj da svaku vežbu rešiš bez gledanja u rešenje. Tek kada završiš, otvori detalje i proveri tok razmišljanja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za funkciju <InlineMath>{"f(x)=-3x+12"}</InlineMath> odredi
                nulu, znak i monotonost.
              </p>
            }
            solution={
              <>
                <MathBlock>{"-3x+12=0 \\Rightarrow x=4"}</MathBlock>
                <p>
                  Pošto je <InlineMath>{"k=-3<0"}</InlineMath>, funkcija je
                  opadajuća. Za opadajuću funkciju važi:
                </p>
                <MathBlock>{"x<4 \\Rightarrow f(x)>0"}</MathBlock>
                <MathBlock>{"x>4 \\Rightarrow f(x)<0"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Nađi jednačinu linearne funkcije čiji grafik seče{" "}
                <InlineMath>{"y"}</InlineMath>-osu u tački{" "}
                <InlineMath>{"(0,5)"}</InlineMath>, a{" "}
                <InlineMath>{"x"}</InlineMath>-osu u tački{" "}
                <InlineMath>{"(-2,0)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Imamo dve tačke: <InlineMath>{"A(0,5)"}</InlineMath> i{" "}
                  <InlineMath>{"B(-2,0)"}</InlineMath>.
                </p>
                <MathBlock>
                  {"k=\\frac{0-5}{-2-0}=\\frac{-5}{-2}=\\frac{5}{2}"}
                </MathBlock>
                <MathBlock>{"n=5"}</MathBlock>
                <MathBlock>{"y=\\frac{5}{2}x+5"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Za koje vrednosti parametra <InlineMath>{"a"}</InlineMath>{" "}
                funkcija <InlineMath>{"f(x)=ax-6"}</InlineMath> ima pozitivnu
                nulu?
              </p>
            }
            solution={
              <>
                <p>
                  Ako je <InlineMath>{"a=0"}</InlineMath>, funkcija je{" "}
                  <InlineMath>{"f(x)=-6"}</InlineMath> i nema nulu. Zato{" "}
                  <InlineMath>{"a\\neq 0"}</InlineMath>.
                </p>
                <MathBlock>{"x_0=\\frac{6}{a}"}</MathBlock>
                <p>
                  Da bi nula bila pozitivna, mora važiti{" "}
                  <InlineMath>{"\\frac{6}{a}>0"}</InlineMath>, pa je:
                </p>
                <MathBlock>{"a>0"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi funkciju koja prolazi kroz tačku{" "}
                <InlineMath>{"(1,3)"}</InlineMath> i ima koeficijent pravca{" "}
                <InlineMath>{"k=-2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo opšti oblik <InlineMath>{"y=-2x+n"}</InlineMath> i
                  koristimo datu tačku:
                </p>
                <MathBlock>
                  {"3=-2\\cdot 1+n \\Rightarrow n=5"}
                </MathBlock>
                <MathBlock>{"y=-2x+5"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Funkcija <InlineMath>{"f(x)=2x+n"}</InlineMath> je negativna za{" "}
                <InlineMath>{"x=1"}</InlineMath>, a nula funkcije je manja od{" "}
                <InlineMath>{"3"}</InlineMath>. Odredi moguće vrednosti{" "}
                <InlineMath>{"n"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Prvi uslov daje:</p>
                <MathBlock>{"f(1)=2+n<0 \\Rightarrow n<-2"}</MathBlock>
                <p>Drugi uslov daje:</p>
                <MathBlock>
                  {"x_0=-\\frac{n}{2}<3 \\Rightarrow -n<6 \\Rightarrow n>-6"}
                </MathBlock>
                <p>Spajanjem uslova dobijamo:</p>
                <MathBlock>{"-6<n<-2"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka lekcije"
        title="Jedan kompaktan model"
        description="Kod linearne funkcije ništa nije skriveno: broj k govori kako se prava ponaša, a broj n gde se nalazi."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kada tome dodaš nulu funkcije{" "}
            <InlineMath>{"x_0=-\\frac{n}{k}"}</InlineMath>, dobijaš kompletnu
            sliku. Zato ovu temu ne učiš kao skup nepovezanih pravila, već kao
            jedan kompaktan model.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Za pamćenje"
        title="Završni rezime"
        description="Ovo su ideje koje moraš da nosiš sa sobom na sledeće zadatke i na prijemni."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Opšti oblik</h3>
            <p>
              Linearna funkcija se na školskom nivou piše kao{" "}
              <InlineMath>{"y=kx+n"}</InlineMath>, a njen grafik je prava.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Koeficijent pravca</h3>
            <p>
              <InlineMath>{"k"}</InlineMath> određuje da li funkcija raste,
              opada ili je konstantna i koliko je prava strma.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Presek sa y-osom</h3>
            <p>
              <InlineMath>{"n=f(0)"}</InlineMath>, pa tačka{" "}
              <InlineMath>{"(0,n)"}</InlineMath> uvek pripada grafiku.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Nula funkcije</h3>
            <p>
              Ako je <InlineMath>{"k\\neq 0"}</InlineMath>, nula je{" "}
              <InlineMath>{"x_0=-\\frac{n}{k}"}</InlineMath>. To je presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Znak funkcije</h3>
            <p>
              Znak funkcije određuješ u odnosu na nulu i znak broja{" "}
              <InlineMath>{"k"}</InlineMath>, nikada samo po slobodnom članu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći korak</h3>
            <p>
              Posle ove lekcije prirodno dolaze sistemi linearnih jednačina i
              primena pravih u analitičkoj geometriji.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Ako želiš da proveriš da li si zaista razumeo lekciju, vrati se na
          interaktivni deo i pokušaj da za pet različitih primera unapred
          pogodiš grafik pre nego što ga laboratorija nacrta.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
