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
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#rastojanje", label: "Rastojanje" },
  { href: "#podela", label: "Podela duži i težište" },
  { href: "#povrsina", label: "Površina" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#uvid", label: "Završni uvid" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson49Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 49"
        title={
          <>
            Tačka, rastojanje i{" "}
            <span className={cs.tHeroAccent}>površina preko koordinata</span>
          </>
        }
        description="Analitička geometrija počinje onog trenutka kada sliku prevedeš u brojeve. Tačka postaje uređeni par, duž postaje razlika koordinata, a površina trougla izlazi iz jednog urednog determinantnog zapisa. Ako ovu lekciju razumeš kako treba, naredne teme o pravoj, kružnici i tangenti biće znatno mirnije."
        heroImageSrc="/images/lessons/lesson49_hero.png"
        heroImageAlt="Ilustracija za lekciju o tački, rastojanju i površini trougla preko koordinata"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Od položaja do formule: kako da iz koordinata pročitaš rastojanje, sredinu duži, tačku podele, težište i površinu trougla.",
          },
          {
            label: "Najveća zamka",
            description:
              "Naizgled slične formule. Sredina duži, podela u razmeri i težište liče jedni na druge, ali nisu isto. Moraš znati kada koja važi.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brz prelaz sa slike na račun. Prepoznaj horizontalne i vertikalne duži, proveri odnos koordinata i sačuvaj vreme za teže korake zadatka.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "80 do 100 minuta sa vođenim primerima i laboratorijumom.",
          },
          {
            label: "Predznanje",
            description:
              "Pitagora, razmera, težište i osnovna svojstva medijana u trouglu.",
          },
          {
            label: "Glavna veština",
            description:
              "Pretvaranje slike u račun preko horizontalnih i vertikalnih pomaka.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Koordinatna laboratorija sa prevlačenjem tačaka po mreži.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE OVA LEKCIJA VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je prvi ozbiljan korak iz geometrijske slike u algebarsku preciznost"
        description="Na prijemnom se vrlo često dešava da zadatak izgleda geometrijski, ali se rešava čisto računom. Kad znaš kako da radiš sa koordinatama, tačka više nije samo mesto na ravni, već podatak iz kog možeš da izvučeš dužinu, odnos, centar, pa čak i uslov kolinearnosti."
      >
        <div className={s.grid3}>
          <SectionCard title="Spaja geometriju i algebru">
            <p>
              Istovremeno vidiš sliku i računaš. To je razlog zašto analitička
              geometrija deluje moćno, ali i zašto traži disciplinu u zapisu.
            </p>
          </SectionCard>
          <SectionCard title="Često je uvod u teže zadatke">
            <p>
              Rastojanje, sredina i površina se vrlo često pojavljuju kao
              međukoraci u zadacima o pravama, kružnicama, tangentama i uslovima
              dodira.
            </p>
          </SectionCard>
          <SectionCard title="Dve ideje nose skoro sve">
            <p>
              Razlike koordinata daju dužinu, a proseci i linearne kombinacije
              koordinata daju sredinu, podelu duži i težište.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je ova lekcija važnija nego što deluje na prvi pogled?"
          answer={
            <p>
              Zato što formule iz ove lekcije kasnije postaju deo mnogo većih
              zadataka. Ako ovde nisi siguran, kasnije nećeš znati da li si
              pogrešio u ideji ili samo u računu. Kada si ovde stabilan, kasnije
              teme imaju mnogo manje &bdquo;magle&ldquo;.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 2. OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja lekcije"
        title="Tačka je uređeni par, a razlika koordinata je skrivena geometrija"
        description={
          "Kada napišemo A(x\u2081,y\u2081) i B(x\u2082,y\u2082), mi ne zapisujemo samo dve oznake. " +
          "Mi zapravo zapisujemo koliko se od tačke A ide levo-desno i dole-gore da bi se stiglo do tačke B. " +
          "Upravo iz tih promena nastaju i dužina duži, i sredina, i površina trougla."
        }
      >
        <div className={s.grid3}>
          <SectionCard title="Koordinata je adresa na ravni">
            <p>
              Prva koordinata govori gde je tačka po osi{" "}
              <InlineMath>{"x"}</InlineMath>, a druga gde je po osi{" "}
              <InlineMath>{"y"}</InlineMath>. Redosled je presudan:{" "}
              <InlineMath>{"(2,5)"}</InlineMath> nije isto što i{" "}
              <InlineMath>{"(5,2)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Najvažniji su \u0394x i \u0394y">
            <p>
              Od <InlineMath>{"A"}</InlineMath> do{" "}
              <InlineMath>{"B"}</InlineMath> se pomeraš za{" "}
              <InlineMath>{"x_2-x_1"}</InlineMath> horizontalno i za{" "}
              <InlineMath>{"y_2-y_1"}</InlineMath> vertikalno. To je prvi račun
              koji gotovo uvek radiš.
            </p>
          </SectionCard>
          <SectionCard title="Svaka formula ima geometrijsku priču">
            <p>
              Rastojanje dolazi iz Pitagore, sredina iz proseka, a površina iz
              orijentisanog paralelograma, odnosno determinantnog zapisa.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Korak 1: Prepiši koordinate bez žurbe">
            <p>
              Veliki broj grešaka nastaje već u prvom redu, kada se pobrka koji
              broj pripada kojoj tački i kojoj osi.
            </p>
          </SectionCard>
          <SectionCard title="Korak 2: Izračunaj razlike">
            <p>
              Ako ti treba dužina ili nagib, prvo traži{" "}
              <InlineMath>{"x_2-x_1"}</InlineMath> i{" "}
              <InlineMath>{"y_2-y_1"}</InlineMath>. To je kostur skoro svakog
              zadatka.
            </p>
          </SectionCard>
          <SectionCard title="Korak 3: Odluči da li treba prosek ili determinant">
            <p>
              Sredina i težište traže proseke koordinata. Površina traži
              determinantni zapis i obaveznu apsolutnu vrednost.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Refleks koji treba razviti">
          <p>
            Ako na prijemnom vidiš tri tačke u ravni, odmah se zapitaj: da li mi
            treba dužina neke stranice, centar neke duži, težište ili površina?
            To pitanje te vodi do prave formule mnogo brže nego nasumično
            gledanje u zadatak.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: šta odmah znaš ako dve tačke imaju istu x-koordinatu?"
          answer={
            <p>
              Tada je duž koja ih spaja vertikalna. Horizontalna promena je
              nula, pa je rastojanje jednako samo apsolutnoj razlici{" "}
              <InlineMath>{"y"}</InlineMath>-koordinata. Formula za rastojanje i
              dalje radi, ali specijalan slučaj može ubrzati račun.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. UDALJENOST DVE TAČKE ═══════════ */}
      <LessonSection
        id="rastojanje"
        eyebrow="Udaljenost dve tačke"
        title="Formula za rastojanje nije za pamćenje napamet, već za prepoznavanje Pitagore u ravni"
        description={
          "Ako iz tačaka A(x\u2081,y\u2081) i B(x\u2082,y\u2082) spustiš horizontalu i vertikalu, dobijaš pravougli trougao. " +
          "Njegove katete su upravo horizontalna i vertikalna promena između tačaka. " +
          "Hipotenuza tog trougla je duž AB, pa se formula praktično sama nameće."
        }
      >
        <div className={s.grid2}>
          <SectionCard title="Izvođenje korak po korak">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Najpre vidi katete">
                <p>
                  Horizontalna kateta ima dužinu{" "}
                  <InlineMath>{"|x_2-x_1|"}</InlineMath>, a vertikalna{" "}
                  <InlineMath>{"|y_2-y_1|"}</InlineMath>. Znakovi nisu bitni za
                  dužinu, ali su bitni dok zapisuješ razliku.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni Pitagorinu teoremu">
                <p>
                  Pošto je <InlineMath>{"AB"}</InlineMath> hipotenuza, važi{" "}
                  <InlineMath>
                    {"AB^2=(x_2-x_1)^2+(y_2-y_1)^2"}
                  </InlineMath>
                  . Tek na kraju uzimaš koren.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Dobijaš standardnu formulu">
                <MathBlock>
                  {"d(A,B)=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"}
                </MathBlock>
                <p>
                  Ovo je jedna od najvažnijih formula cele analitičke geometrije.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Brza interpretacija">
            <p>U praksi je najbezbednije da napišeš:</p>
            <MathBlock>
              {"\\Delta x = x_2-x_1, \\qquad \\Delta y = y_2-y_1"}
            </MathBlock>
            <p>pa zatim</p>
            <MathBlock>{"d=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}"}</MathBlock>
            <p>
              Tako smanjuješ mogućnost da izgubiš znak ili preskočiš kvadrat.
            </p>
            <MathBlock>
              {
                "\\text{slika} \\;\\longrightarrow\\; \\Delta x,\\Delta y \\;\\longrightarrow\\; d"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Primer: opšti položaj">
            <p>
              Za <InlineMath>{"A(-2,1)"}</InlineMath> i{" "}
              <InlineMath>{"B(4,5)"}</InlineMath> imamo{" "}
              <InlineMath>{"\\Delta x=6"}</InlineMath> i{" "}
              <InlineMath>{"\\Delta y=4"}</InlineMath>.
            </p>
            <MathBlock>
              {"d(A,B)=\\sqrt{6^2+4^2}=\\sqrt{36+16}=\\sqrt{52}=2\\sqrt{13}"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Primer: vertikalna duž">
            <p>
              Ako su <InlineMath>{"A(3,-1)"}</InlineMath> i{" "}
              <InlineMath>{"B(3,6)"}</InlineMath>, onda je{" "}
              <InlineMath>{"\\Delta x=0"}</InlineMath>, pa je račun kratak.
            </p>
            <MathBlock>{"d(A,B)=\\sqrt{0^2+7^2}=7"}</MathBlock>
          </SectionCard>
          <SectionCard title="Primer: horizontalna duž">
            <p>
              Za <InlineMath>{"A(-5,2)"}</InlineMath> i{" "}
              <InlineMath>{"B(1,2)"}</InlineMath> vertikalna promena ne
              postoji.
            </p>
            <MathBlock>{"d(A,B)=\\sqrt{6^2+0^2}=6"}</MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je svejedno da li pišeš x\u2082\u2212x\u2081 ili x\u2081\u2212x\u2082 u formuli za rastojanje?"
          answer={
            <p>
              Zato što se razlika kvadrira. Brojevi{" "}
              <InlineMath>{"x_2-x_1"}</InlineMath> i{" "}
              <InlineMath>{"x_1-x_2"}</InlineMath> imaju suprotne znakove, ali
              isti kvadrat. Ovo važi za rastojanje, ali ne i za sve druge
              formule u analitičkoj geometriji, pa nemoj taj refleks prenositi
              svuda.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. PODELA DUŽI I TEŽIŠTE ═══════════ */}
      <LessonSection
        id="podela"
        eyebrow="Podela duži i težište trougla"
        title="Ovo su formule proseka, ali svaka od njih meri nešto drugo"
        description="Učenici često osećaju da su sredina duži, tačka podele i težište nešto slično. To jeste tačno, ali je važno da vidiš tačnu razliku. Sredina je običan prosek krajeva, tačka podele je ponderisani prosek, a težište je prosek tri temena trougla."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sredina duži"
            formula={"M\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)"}
            note="Pola puta po x i pola puta po y. To je prirodno: sredina je podjednako udaljena od oba kraja."
          />
          <FormulaCard
            title="Podela u razmeri m:n"
            formula={"P\\left(\\frac{nx_1+mx_2}{m+n},\\frac{ny_1+my_2}{m+n}\\right)"}
            note="Najvažnija zamka: uz A ide suprotni koeficijent n, a uz B suprotni koeficijent m."
          />
          <FormulaCard
            title="Težište trougla"
            formula={"G\\left(\\frac{x_1+x_2+x_3}{3},\\frac{y_1+y_2+y_3}{3}\\right)"}
            note="Prosek sva tri temena, jer se težište dobija presekom medijana."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title={'Zašto je formula za podelu \u201Eobrnuta\u201C'}>
            <p>
              Ako je <InlineMath>{"AP:PB=2:3"}</InlineMath>, onda je{" "}
              <InlineMath>{"P"}</InlineMath> bliže tački{" "}
              <InlineMath>{"A"}</InlineMath>, jer je prvi deo kraći. Zbog toga
              koordinata tačke <InlineMath>{"P"}</InlineMath> mora da bude bliža
              koordinatama tačke <InlineMath>{"A"}</InlineMath>, a to u formuli
              postižeš baš tako što uz <InlineMath>{"A"}</InlineMath> stoji veći
              koeficijent <InlineMath>{"3"}</InlineMath>.
            </p>
            <MathBlock>
              {
                "P=\\frac{3A+2B}{5} \\quad \\text{u vektorskom smislu kada je } AP:PB=2:3"
              }
            </MathBlock>
          </SectionCard>
          <SectionCard title="Specijalan slučaj: sredina duži je razmera 1:1">
            <p>
              Ako u formuli za podelu staviš{" "}
              <InlineMath>{"m=n=1"}</InlineMath>, dobijaš
            </p>
            <MathBlock>
              {
                "P\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)=M"
              }
            </MathBlock>
            <p>
              To je lep način da pamtiš celu porodicu formula: sredina je samo
              poseban slučaj opštije formule za podelu duži.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kako da brzo proveriš da li je dobijena tačka podele smisleno postavljena?"
          answer={
            <p>
              Pogledaj da li njena koordinata leži između odgovarajućih
              koordinata tačaka <InlineMath>{"A"}</InlineMath> i{" "}
              <InlineMath>{"B"}</InlineMath>. Zatim proveri da li je bliža onoj
              tački kojoj i treba da bude bliža prema odnosu. Ako to nije
              slučaj, najčešće si zamenio koeficijente{" "}
              <InlineMath>{"m"}</InlineMath> i <InlineMath>{"n"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. POVRŠINA TROUGLA ═══════════ */}
      <LessonSection
        id="povrsina"
        eyebrow="Površina trougla preko koordinata"
        title="Determinanta meri orijentisanu površinu, a apsolutna vrednost vraća geometrijsku površinu"
        description="Ova formula izgleda najapstraktnije od svih u lekciji, ali je veoma praktična. Ne moraš da crtaš visinu, ne moraš da tražiš ugao i ne moraš da rekonstruišeš trougao. Dovoljno je da uredno uvrstiš koordinate tri temena."
      >
        <div className={s.grid2}>
          <SectionCard title="Standardni zapis">
            <MathBlock>
              {
                "S_{\\triangle ABC}=\\frac{1}{2}\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|"
              }
            </MathBlock>
            <p>
              U praksi se često pamti kao &bdquo;svaka{" "}
              <InlineMath>{"x"}</InlineMath>-koordinata množi razliku preostale
              dve <InlineMath>{"y"}</InlineMath>-koordinate&ldquo;.
            </p>
          </SectionCard>
          <SectionCard title="Determinantni oblik">
            <MathBlock>
              {
                "S_{\\triangle ABC}=\\frac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|"
              }
            </MathBlock>
            <p>
              Ovaj oblik je koristan jer odmah povezuje površinu sa
              determinantama i daje elegantan test za kolinearnost.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Zašto modul">
            <p>
              Bez apsolutne vrednosti dobijaš orijentisanu površinu: znak zavisi
              od redosleda temena. Geometrijska površina mora biti nenegativna,
              zato pišeš modul.
            </p>
          </SectionCard>
          <SectionCard title="Nula površine = kolinearnost">
            <p>Ako je</p>
            <MathBlock>
              {"x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)=0"}
            </MathBlock>
            <p>
              tada su tačke <InlineMath>{"A"}</InlineMath>,{" "}
              <InlineMath>{"B"}</InlineMath> i <InlineMath>{"C"}</InlineMath>{" "}
              kolinearne. Drugim rečima, &bdquo;trougao&ldquo; se spljoštio u
              pravu.
            </p>
          </SectionCard>
          <SectionCard title="Kada je posebno korisna">
            <p>
              Ako je trougao u opštem položaju, determinantna formula štedi
              vreme. Ne moraš da tražiš jednačine pravih ni rastojanje tačke od
              prave da bi dobio površinu.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Važan prijemni signal">
          <p>
            Ako zadatak pita da li su tri tačke na istoj pravoj, vrlo često ne
            treba da tražiš jednačinu prave. Dovoljno je da proveriš da li je
            površina trougla sa tim temenima jednaka nuli.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: kada determinantna formula za površinu daje brže rešenje od klasične formule P_a * h_a / 2?"
          answer={
            <p>
              Kada su tačke u opštem položaju i kada visinu nije lako
              &bdquo;videti&ldquo;. Ako baza nije horizontalna ni vertikalna,
              determinantna formula je često najkraći i najčistiji put.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 7. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Ovde se teorija pretvara u ispitni postupak"
        description="U svakom primeru cilj nije samo da dobiješ broj, već da vidiš kojim redosledom misliš. To je naročito važno za prijemni: često je isti broj formula moguć, ali samo jedan redosled ostavlja najmanje prostora za grešku."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Rastojanje i sredina iste duži
            </h3>
            <p>
              Date su tačke <InlineMath>{"A(-2,4)"}</InlineMath> i{" "}
              <InlineMath>{"B(6,-2)"}</InlineMath>. Odredi rastojanje{" "}
              <InlineMath>{"AB"}</InlineMath> i sredinu duži{" "}
              <InlineMath>{"AB"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izračunaj razlike">
                <p>
                  <InlineMath>{"\\Delta x = 6-(-2)=8"}</InlineMath>,{" "}
                  <InlineMath>{"\\Delta y = -2-4=-6"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Formula za rastojanje">
                <MathBlock>
                  {"d(A,B)=\\sqrt{8^2+(-6)^2}=\\sqrt{64+36}=10"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sredina duži">
                <MathBlock>
                  {
                    "M\\left(\\frac{-2+6}{2},\\frac{4+(-2)}{2}\\right)=M(2,1)"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Podela duži u razmeri{" "}
              <InlineMath>{"2:3"}</InlineMath>
            </h3>
            <p>
              Tačka <InlineMath>{"P"}</InlineMath> deli duž čiji su krajevi{" "}
              <InlineMath>{"A(1,-1)"}</InlineMath> i{" "}
              <InlineMath>{"B(11,9)"}</InlineMath> u odnosu{" "}
              <InlineMath>{"AP:PB=2:3"}</InlineMath>. Odredi koordinate tačke{" "}
              <InlineMath>{"P"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj formulu">
                <p>
                  Uz tačku <InlineMath>{"A"}</InlineMath> ide suprotni
                  koeficijent <InlineMath>{"3"}</InlineMath>, a uz tačku{" "}
                  <InlineMath>{"B"}</InlineMath> koeficijent{" "}
                  <InlineMath>{"2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti">
                <MathBlock>
                  {
                    "P\\left(\\frac{3\\cdot 1 + 2\\cdot 11}{2+3},\\frac{3\\cdot (-1) + 2\\cdot 9}{2+3}\\right)=P\\left(\\frac{25}{5},\\frac{15}{5}\\right)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Proveri smisao">
                <p>
                  Dobijaš <InlineMath>{"P(5,3)"}</InlineMath>. Pošto je{" "}
                  <InlineMath>{"AP"}</InlineMath> kraći od{" "}
                  <InlineMath>{"PB"}</InlineMath>, tačka{" "}
                  <InlineMath>{"P"}</InlineMath> treba da bude bliža tački{" "}
                  <InlineMath>{"A"}</InlineMath>, a dobijeni rezultat to
                  potvrđuje.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Težište i površina istog trougla
            </h3>
            <p>
              Dat je trougao sa temenima{" "}
              <InlineMath>{"A(-1,2)"}</InlineMath>,{" "}
              <InlineMath>{"B(5,2)"}</InlineMath>,{" "}
              <InlineMath>{"C(2,8)"}</InlineMath>. Odredi težište i površinu
              trougla.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Težište">
                <MathBlock>
                  {
                    "G\\left(\\frac{-1+5+2}{3},\\frac{2+2+8}{3}\\right)=G(2,4)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Determinantni zapis za površinu">
                <MathBlock>
                  {
                    "S=\\frac{1}{2}\\left|(-1)(2-8)+5(8-2)+2(2-2)\\right|"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj">
                <MathBlock>
                  {"S=\\frac{1}{2}\\left|6+30+0\\right|=\\frac{36}{2}=18"}
                </MathBlock>
                <p>
                  Dakle, <InlineMath>{"G(2,4)"}</InlineMath> i{" "}
                  <InlineMath>{"S=18"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Brza provera kolinearnosti
            </h3>
            <p>
              Proveri da li su tačke <InlineMath>{"A(1,1)"}</InlineMath>,{" "}
              <InlineMath>{"B(3,3)"}</InlineMath> i{" "}
              <InlineMath>{"C(7,7)"}</InlineMath> na istoj pravoj.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristimo formulu za površinu">
                <p>
                  Ne moraš tražiti jednačinu prave. Dovoljno je proveriti
                  površinu trougla <InlineMath>{"ABC"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj">
                <MathBlock>
                  {
                    "S=\\frac{1}{2}\\left|1(3-7)+3(7-1)+7(1-3)\\right|=\\frac{1}{2}\\left|-4+18-14\\right|=0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zaključak">
                <p>
                  Pošto je površina nula, tačke su kolinearne. Ovo je tipično
                  kratko prijemno rešenje.
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
        title="Ovo je formula-vault koji treba da umeš i da pročitaš i da objasniš"
        description="Učenje nije gotovo kada znaš da reprodukuješ formulu. Potrebno je da znaš i koja ideja stoji iza nje i u kom tipu zadatka se najčešće pojavljuje."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Rastojanje"
            formula={"d(A,B)=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"}
            note="Prepoznaješ je čim treba dužina, poluprečnik ili provera jednakih rastojanja."
          />
          <FormulaCard
            title="Sredina duži"
            formula={"M\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)"}
            note="Česta je u zadacima o simetriji, centrima i medijanama."
          />
          <FormulaCard
            title="Podela duži"
            formula={"P\\left(\\frac{nx_1+mx_2}{m+n},\\frac{ny_1+my_2}{m+n}\\right)"}
            note="Najopasnija je zamena koeficijenata. Uvek proveri kojoj tački P treba da bude bliža."
          />
          <FormulaCard
            title="Težište"
            formula={"G\\left(\\frac{x_1+x_2+x_3}{3},\\frac{y_1+y_2+y_3}{3}\\right)"}
            note="Koristi se kada zadatak pominje medijane, ravnotežu ili centar trougla."
          />
          <FormulaCard
            title="Površina"
            formula={"S=\\frac{1}{2}\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|"}
            note={'Naročito korisna kada baze i visine nisu \u201Ena prvi pogled\u201C vidljive.'}
          />
          <FormulaCard
            title="Kolinearnost"
            formula="x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)=0"
            note="Nulta površina znači ista prava. Ovo je brz test kojim često štediš vreme u zadacima sa tri tačke."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 9. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Većina grešaka nije teška matematika, nego loš refleks u zapisu"
        description={'Dobra vest je da su tipične greške vrlo prepoznatljive. Loša vest je da se stalno ponavljaju upravo zato što učenik misli da je zadatak \u201Elak\u201C. Ovde treba biti disciplinovan.'}
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen kvadrat ili koren kod rastojanja
            </h3>
            <p>
              Učenik izračuna <InlineMath>{"\\Delta x"}</InlineMath> i{" "}
              <InlineMath>{"\\Delta y"}</InlineMath>, sabere ih ili zaboravi da
              na kraju uzme kvadratni koren. Obavezno zapiši formulu u celini
              pre računanja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje sredine duži i težišta
            </h3>
            <p>
              Sredina duži deli sa <InlineMath>{"2"}</InlineMath>, a težište
              trougla deli sa <InlineMath>{"3"}</InlineMath>. Ako vidiš tri
              temena, ne postoji razlog da deliš sa{" "}
              <InlineMath>{"2"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešni koeficijenti u formuli za razmeru
            </h3>
            <p>
              Kod <InlineMath>{"AP:PB=m:n"}</InlineMath>, uz{" "}
              <InlineMath>{"A"}</InlineMath> stoji{" "}
              <InlineMath>{"n"}</InlineMath>, a uz{" "}
              <InlineMath>{"B"}</InlineMath> stoji{" "}
              <InlineMath>{"m"}</InlineMath>. Uvek proveri da li je dobijena
              tačka zaista bliža pravom kraju duži.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Izostavljen modul kod površine
            </h3>
            <p>
              Redosled temena može dati negativan determinantni izraz.
              Geometrijska površina ne može biti negativna, zato modul nije
              ukras, nego obavezan deo formule.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Brzinsko prepisivanje koordinata
            </h3>
            <p>
              Najviše banalnih padova dolazi od toga da se npr.{" "}
              <InlineMath>{"y"}</InlineMath>-koordinata tačke{" "}
              <InlineMath>{"B"}</InlineMath> upiše kao da pripada tački{" "}
              <InlineMath>{"A"}</InlineMath>. Kad je zadatak lakši, još lakše
              postaneš neoprezan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nema procene smisla rezultata
            </h3>
            <p>
              Dobijena sredina mora biti &bdquo;između&ldquo; krajeva duži.
              Težište mora biti unutar trougla. Ako rezultat to ne poštuje,
              zastani i proveri račun.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 10. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Na ispitu se ova tema najčešće ne pojavljuje sama, nego kao alat u većem problemu"
        description="Najjači učenici nisu nužno oni koji znaju najviše formula napamet, već oni koji brzo vide koja formula je ovde pomoćni alat. U tom smislu, ova lekcija je jedna od najpraktičnijih u celoj analitičkoj geometriji."
      >
        <div className={s.grid3}>
          <SectionCard title="Sredina i rastojanje kao centar i poluprečnik">
            <p>
              U zadacima o kružnici često se prvo traži sredina duži ili
              rastojanje do neke tačke, pa se tek onda formira jednačina
              kružnice.
            </p>
          </SectionCard>
          <SectionCard title="Površina kao skriveni test kolinearnosti">
            <p>
              Umesto jednačine prave, zadatak se često brže reši proverom da li
              je površina trougla jednaka nuli.
            </p>
          </SectionCard>
          <SectionCard title="Kombinovani zadaci">
            <p>
              Vrlo je česta kombinacija: nađi težište, zatim jednačinu neke
              prave kroz težište, pa tek onda rastojanje od te prave ili površinu
              novog trougla.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Šta prvo proveravaš">
            <p>
              Jesu li neke koordinate jednake? Da li zadatak pominje centar,
              sredinu, težište ili površinu? Može li se išta skratiti posebnim
              položajem tačaka?
            </p>
          </SectionCard>
          <SectionCard title="Šta štedi vreme">
            <p>
              Najpre napiši razlike koordinata ili zbir koordinata, pa tek onda
              uvrštavanje. Time sprečavaš dupliranje istog posla.
            </p>
          </SectionCard>
          <SectionCard title="Šta proveravaš na kraju">
            <p>
              Da li je rastojanje pozitivno, da li je sredina na duži, da li je
              površina nenegativna i da li težište zaista leži unutar trougla?
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kada u prijemnom zadatku vredi prvo pogledati da li je neka stranica trougla horizontalna ili vertikalna?"
          answer={
            <p>
              Uvek kada vidiš dve jednake{" "}
              <InlineMath>{"x"}</InlineMath>-koordinate ili dve jednake{" "}
              <InlineMath>{"y"}</InlineMath>-koordinate. Tada su dužina stranice
              i eventualna visina često mnogo lakše za računanje nego u opštem
              determinantnom zapisu. Dobar učenik prvo proveri da li postoji
              jednostavniji put.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 11. VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Reši samostalno, pa tek onda otvori rešenje"
        description="Preporuka je da svaku vežbu radiš bez gledanja u formulu najmanje pola minuta. Prvo pokušaj da prepoznaš tip zadatka, pa tek onda zapiši obrazac."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Rastojanje i sredina"
            problem={
              <p>
                Date su tačke <InlineMath>{"A(-3,2)"}</InlineMath> i{" "}
                <InlineMath>{"B(5,-4)"}</InlineMath>. Odredi{" "}
                <InlineMath>{"d(A,B)"}</InlineMath> i sredinu duži{" "}
                <InlineMath>{"AB"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"\\Delta x = 8"}</InlineMath>,{" "}
                  <InlineMath>{"\\Delta y = -6"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {"d(A,B)=\\sqrt{8^2+(-6)^2}=\\sqrt{100}=10"}
                </MathBlock>
                <p>Sredina je</p>
                <MathBlock>
                  {
                    "M\\left(\\frac{-3+5}{2},\\frac{2+(-4)}{2}\\right)=M(1,-1)"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2: Podela duži u razmeri"
            problem={
              <p>
                Tačka <InlineMath>{"P"}</InlineMath> deli duž sa krajevima{" "}
                <InlineMath>{"A(2,1)"}</InlineMath> i{" "}
                <InlineMath>{"B(12,6)"}</InlineMath> u odnosu{" "}
                <InlineMath>{"AP:PB=3:2"}</InlineMath>. Odredi{" "}
                <InlineMath>{"P"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uz <InlineMath>{"A"}</InlineMath> ide koeficijent{" "}
                  <InlineMath>{"2"}</InlineMath>, a uz{" "}
                  <InlineMath>{"B"}</InlineMath> koeficijent{" "}
                  <InlineMath>{"3"}</InlineMath>:
                </p>
                <MathBlock>
                  {
                    "P\\left(\\frac{2\\cdot 2 + 3\\cdot 12}{5},\\frac{2\\cdot 1 + 3\\cdot 6}{5}\\right)=P\\left(\\frac{40}{5},\\frac{20}{5}\\right)=P(8,4)"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3: Težište i površina"
            problem={
              <p>
                Za trougao <InlineMath>{"A(0,0)"}</InlineMath>,{" "}
                <InlineMath>{"B(6,0)"}</InlineMath>,{" "}
                <InlineMath>{"C(3,9)"}</InlineMath> odredi težište i površinu.
              </p>
            }
            solution={
              <>
                <p>Težište:</p>
                <MathBlock>
                  {
                    "G\\left(\\frac{0+6+3}{3},\\frac{0+0+9}{3}\\right)=G(3,3)"
                  }
                </MathBlock>
                <p>Površina:</p>
                <MathBlock>
                  {
                    "S=\\frac{1}{2}\\left|0(0-9)+6(9-0)+3(0-0)\\right|=\\frac{54}{2}=27"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4: Površina trougla u opštem položaju"
            problem={
              <p>
                Odredi površinu trougla sa temenima{" "}
                <InlineMath>{"A(-2,1)"}</InlineMath>,{" "}
                <InlineMath>{"B(4,5)"}</InlineMath>,{" "}
                <InlineMath>{"C(6,-1)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "S=\\frac{1}{2}\\left|(-2)(5-(-1))+4((-1)-1)+6(1-5)\\right|"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "=\\frac{1}{2}\\left|-12-8-24\\right|=\\frac{44}{2}=22"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5: Kolinearnost"
            problem={
              <p>
                Proveri da li su tačke{" "}
                <InlineMath>{"A(1,-2)"}</InlineMath>,{" "}
                <InlineMath>{"B(4,1)"}</InlineMath>,{" "}
                <InlineMath>{"C(7,4)"}</InlineMath> kolinearne.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "S=\\frac{1}{2}\\left|1(1-4)+4(4-(-2))+7((-2)-1)\\right|=\\frac{1}{2}\\left|-3+24-21\\right|=0"
                  }
                </MathBlock>
                <p>Površina je nula, dakle tačke su kolinearne.</p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6: Nepoznata koordinata iz površine"
            problem={
              <p>
                Tačke <InlineMath>{"A(2,1)"}</InlineMath>,{" "}
                <InlineMath>{"B(2,7)"}</InlineMath>,{" "}
                <InlineMath>{"C(t,4)"}</InlineMath> grade trougao površine{" "}
                <InlineMath>{"9"}</InlineMath>. Odredi{" "}
                <InlineMath>{"t"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "9=\\frac{1}{2}\\left|2(7-4)+2(4-1)+t(1-7)\\right|=\\frac{1}{2}\\left|6+6-6t\\right|"
                  }
                </MathBlock>
                <MathBlock>{"9=\\frac{1}{2}|12-6t|=3|2-t|"}</MathBlock>
                <p>
                  Dakle <InlineMath>{"|2-t|=3"}</InlineMath>, pa su rešenja
                </p>
                <MathBlock>
                  {"t=5 \\quad \\text{i} \\quad t=-1"}
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ 12. ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        id="uvid"
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Ne pamti pet nepovezanih formula. Pamti dve ideje."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Prva ideja je da razlike koordinata mere pomeraj, pa zato daju
            rastojanje. Druga ideja je da proseci i ponderisani proseci daju
            &bdquo;središnje&ldquo; tačke: sredinu duži, tačku podele i težište.
            Površina trougla zatvara sliku tako što ti govori koliko tri tačke
            zaista grade figuru, a ne samo jednu pravu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 13. REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako bi sutra imao prijemni zadatak iz ove oblasti, sledeće stvari treba da ti budu brze i sigurne."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Rastojanje dolazi iz Pitagore</h3>
            <ul>
              <li>
                Najpre traži <InlineMath>{"\\Delta x"}</InlineMath> i{" "}
                <InlineMath>{"\\Delta y"}</InlineMath>.
              </li>
              <li>Tek zatim piši kvadrate i koren.</li>
              <li>Posebni položaji mogu skratiti račun.</li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Sredina, razmera i težište nisu ista stvar
            </h3>
            <ul>
              <li>
                Sredina deli sa <InlineMath>{"2"}</InlineMath>.
              </li>
              <li>
                Težište deli sa <InlineMath>{"3"}</InlineMath>.
              </li>
              <li>
                Podela duži koristi suprotne koeficijente{" "}
                <InlineMath>{"m"}</InlineMath> i{" "}
                <InlineMath>{"n"}</InlineMath>.
              </li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Površina preko koordinata je i test kolinearnosti
            </h3>
            <ul>
              <li>Modul je obavezan.</li>
              <li>Nulta površina znači da su tačke na istoj pravoj.</li>
              <li>
                Determinantni zapis je često najbrži put u opštem položaju.
              </li>
            </ul>
          </article>
        </div>

        <InsightCard title="Sledeći logičan korak u učenju">
          <p>
            Posle ove lekcije potpuno prirodno dolazi jednačina prave. Tada ćeš
            iste ove tačke, razlike koordinata i odnose koristiti da napišeš
            eksplicitni, implicitni i segmentni oblik prave, kao i da meriš ugao
            i udaljenost od prave.
          </p>
        </InsightCard>

        <p className={cs.footerNote}>
          Lekcija 49 zatvara osnove o tački i rastojanju u koordinatnom sistemu
          i priprema teren za jednačinu prave i kružnice.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
