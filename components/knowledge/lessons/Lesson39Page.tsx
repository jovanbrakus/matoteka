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
  { href: "#ideja", label: "Ideja sa kružnicom" },
  { href: "#algoritam", label: "Algoritam" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson39Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 39"
        title={
          <>
            Osnovne{" "}
            <span className={cs.tHeroAccent}>trigonometrijske jednačine</span>
          </>
        }
        description="Na prijemnom nije dovoljno da pronađeš jedan ugao. Kod trigonometrijskih jednačina moraš da vidiš sve uglove koji daju isti sinus, kosinus, tangens ili kotangens, da pravilno zapišeš opšte rešenje i da zatim izdvojiš samo ona rešenja koja pripadaju zadatom intervalu."
        heroImageSrc="/api/lessons/39/hero"
        heroImageAlt="Ilustracija za lekciju o osnovnim trigonometrijskim jednačinama"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da bez lutanja rešavaš bazne oblike i da svaki odgovor napišeš kao ceo skup rešenja, a ne kao jedan ugao.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da staneš kod prvog ugla ili da dodaš pogrešnu periodu: 2kπ tamo gde treba kπ, ili obrnuto.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo prepoznavanje da li postoje 0, 1 ili 2 rešenja u jednom krugu i precizno brojanje rešenja na zadatom intervalu.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70-90 minuta uz detaljne primere i obavezno ručno skiciranje kružnice pored svake jednačine.",
          },
          {
            label: "Predznanje",
            description:
              "Radijani, jedinična kružnica, standardni uglovi i osnovna svojstva sinusa, kosinusa, tangensa i kotangensa.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz jedne vrednosti a brzo pređeš na sva rešenja i da odmah znaš koju periodu moraš da dodaš.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja spaja jediničnu kružnicu i listu rešenja na realnoj osi za izabrani interval.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je prva tačka gde student mora da misli periodično"
        description="Do sada si često radio sa jednom vrednošću ugla ili jednim crtežom na kružnici. Ovde se prvi put potpuno ozbiljno pojavljuje beskonačan skup rešenja. Zato je ova lekcija presudna: ona te uči da isti položaj na kružnici ili ista vrednost funkcije ponavljaju odgovor u pravilnim razmacima."
      >
        <div className={s.grid3}>
          <SectionCard title="Za naredne trigonometrijske jednačine">
            <p>
              Sve složenije metode kasnije na kraju svode zadatak na bazni oblik.
              Ako ovde nisi siguran, kasnije ćeš grešiti i kad metoda bude dobra.
            </p>
          </SectionCard>
          <SectionCard title="Za brojanje rešenja u intervalu">
            <p>
              Na prijemnom često nije dovoljno napisati opšte rešenje. Traži se i
              koliko rešenja leži u intervalu{" "}
              <InlineMath>{"[0,2\\pi]"}</InlineMath>,{" "}
              <InlineMath>{"[-\\pi,\\pi]"}</InlineMath> ili sličnom opsegu.
            </p>
          </SectionCard>
          <SectionCard title="Za proveru odgovora">
            <p>
              Kada razumeš jediničnu kružnicu, odmah vidiš da li je dobijeni ugao
              uopšte smislen i da li si zaboravio drugu granu ili periodu.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključna pedagoška ideja">
          <p>
            Kod ovih jednačina ne tražiš „broj" kao kod linearnih jednačina,
            već tražiš sve uglove koji imaju isto trigonometrijsko ponašanje.
            Zato je vizuelno razmišljanje preko kružnice ovde mnogo važnije
            nego puka mehanička primena formule.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ IDEJA SA KRUŽNICOM ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Ideja sa kružnicom"
        title="Jednačina znači: pronađi odgovarajuće tačke na jediničnoj kružnici"
        description="Ako ovu lekciju posmatraš samo kao niz formula, lako ćeš mešati grane i periode. Ako je gledaš preko kružnice, sve postaje mnogo prirodnije: sinus je ordinata, kosinus je apscisa, a tangens i kotangens čitaju se preko pomoćnih tangenti."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta zapravo tražiš">
            <ul>
              <li>
                Kod <InlineMath>{"\\sin x = a"}</InlineMath> tražiš sve tačke
                kružnice čija je <InlineMath>{"y"}</InlineMath>-koordinata
                jednaka <InlineMath>{"a"}</InlineMath>.
              </li>
              <li>
                Kod <InlineMath>{"\\cos x = a"}</InlineMath> tražiš sve tačke
                kružnice čija je <InlineMath>{"x"}</InlineMath>-koordinata
                jednaka <InlineMath>{"a"}</InlineMath>.
              </li>
              <li>
                Kod <InlineMath>{"\\tan x = a"}</InlineMath> tražiš smer zraka
                koji na tangenti <InlineMath>{"x=1"}</InlineMath> seče tačku{" "}
                <InlineMath>{"Q(1,a)"}</InlineMath>.
              </li>
              <li>
                Kod <InlineMath>{"\\cot x = a"}</InlineMath> analogno koristiš
                pomoćnu pravu <InlineMath>{"y=1"}</InlineMath> i tačku{" "}
                <InlineMath>{"Q(a,1)"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Zašto dolazi opšte rešenje">
            <ul>
              <li>
                Ugao možeš da povećaš za pun krug{" "}
                <InlineMath>{"2\\pi"}</InlineMath> i dobiješ isti sinus i
                kosinus.
              </li>
              <li>
                Tangens i kotangens se već posle pola kruga{" "}
                <InlineMath>{"\\pi"}</InlineMath> ponavljaju, jer su zasnovani
                na odnosu koordinata.
              </li>
              <li>
                Zato je jedan ugao samo „predstavnik" cele porodice rešenja.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Sinus"
            formula={"\\sin x = a"}
            note={
              <>
                Ako je <InlineMath>{"|a| < 1"}</InlineMath>, horizontalna prava{" "}
                <InlineMath>{"y=a"}</InlineMath> seče kružnicu u dve tačke, pa
                u jednom krugu obično dobijaš dva rešenja. Ako je{" "}
                <InlineMath>{"|a| = 1"}</InlineMath>, dobijaš jedno dodirno
                rešenje. Ako je <InlineMath>{"|a| > 1"}</InlineMath>, nema
                realnih rešenja.
              </>
            }
          />
          <FormulaCard
            title="Kosinus"
            formula={"\\cos x = a"}
            note={
              <>
                Potpuno ista logika važi, samo sada gledaš vertikalu{" "}
                <InlineMath>{"x=a"}</InlineMath>. Zato i za kosinus važi uslov{" "}
                <InlineMath>{"|a| \\le 1"}</InlineMath> za postojanje realnih
                rešenja.
              </>
            }
          />
          <FormulaCard
            title="Tangens"
            formula={"\\tan x = a"}
            note={
              <>
                Ovde nema ograničenja kao kod sinusa i kosinusa. Za svaki realan{" "}
                <InlineMath>{"a"}</InlineMath> postoji tačno jedna porodica
                rešenja, jer svaka prava kroz koordinatni početak i tačku{" "}
                <InlineMath>{"Q(1,a)"}</InlineMath> određuje jedan smer, a
                zatim se odgovor ponavlja na <InlineMath>{"\\pi"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kotangens"
            formula={"\\cot x = a"}
            note={
              <>
                I ovde za svaki realan <InlineMath>{"a"}</InlineMath> postoji po
                jedna porodica rešenja sa periodom{" "}
                <InlineMath>{"\\pi"}</InlineMath>. Samo pazi: oznaka{" "}
                <InlineMath>{"\\operatorname{arccot}"}</InlineMath> nije potpuno
                ista u svim udžbenicima, pa je često sigurnije razmišljati preko
                kružnice ili preko pretvaranja u tangens.
              </>
            }
          />
          <FormulaCard
            title="Broj rešenja u jednom krugu"
            formula={"\\sin x = a,\\ \\cos x = a:\\quad \\left\\{\\begin{array}{ll} 0,& |a|>1\\\\ 1,& |a|=1\\\\ 2,& |a|<1 \\end{array}\\right."}
            note="Ovo je jedna od najkorisnijih mentalnih provera na prijemnom."
          />
          <FormulaCard
            title="Broj rešenja po periodi"
            formula={"\\tan x = a,\\ \\cot x = a \\Rightarrow \\text{po jedno rešenje na svakoj periodi } \\pi"}
            note={
              <>
                Zato kod tangensa i kotangensa ne tražiš dve grane u intervalu
                dužine <InlineMath>{"\\pi"}</InlineMath>, već jednu.
              </>
            }
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto jednačina sin x = 2 nema realna rešenja?"
          answer={
            <p>
              Zato što na jediničnoj kružnici ordinata svake tačke mora da bude
              između <InlineMath>{"-1"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>. Drugim rečima, skup vrednosti
              sinusa je <InlineMath>{"[-1,1]"}</InlineMath>. Pošto broj{" "}
              <InlineMath>{"2"}</InlineMath> ne pripada tom intervalu, prava{" "}
              <InlineMath>{"y=2"}</InlineMath> uopšte ne seče kružnicu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ALGORITAM REŠAVANJA ═══════════ */}
      <LessonSection
        id="algoritam"
        eyebrow="Algoritam rešavanja"
        title="Uvežbaj isti redosled svaki put"
        description="Studenti najčešće greše ne zato što ne znaju formulu, nego zato što preskoče redosled. Ako usvojiš ovaj algoritam, i najstresniji prijemni zadatak postaje mehanički pregledan."
      >
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Prepoznaj porodicu jednačine">
            <p>
              Najpre odredi da li rešavaš jednačinu za sinus, kosinus, tangens
              ili kotangens. Od toga odmah zavisi i perioda koju ćeš dodavati u
              opštem rešenju.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Proveri da li realna rešenja uopšte postoje">
            <p>
              Za <InlineMath>{"\\sin x = a"}</InlineMath> i{" "}
              <InlineMath>{"\\cos x = a"}</InlineMath> mora da važi{" "}
              <InlineMath>{"|a| \\le 1"}</InlineMath>. Kod tangensa i
              kotangensa takvo ograničenje ne postoji.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Nađi rešenja u jednom osnovnom intervalu">
            <p>
              Za sinus i kosinus to je najčešće jedan puni krug{" "}
              <InlineMath>{"[0,2\\pi)"}</InlineMath>. Za tangens i kotangens
              dovoljno je da nađeš jedno reprezentativno rešenje na intervalu
              dužine <InlineMath>{"\\pi"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Zapiši opšte rešenje sa pravom periodom">
            <p>
              Sinus i kosinus traže <InlineMath>{"2k\\pi"}</InlineMath>.
              Tangens i kotangens traže <InlineMath>{"k\\pi"}</InlineMath>.
              Upravo ovde nastaje najveći broj grešaka.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Ako je dat interval, proveri konkretne vrednosti">
            <p>
              Opšte rešenje samo postavlja šablon. Tek zatim ubacuješ
              odgovarajuće cele brojeve <InlineMath>{"k"}</InlineMath> i
              proveravaš koje vrednosti upadaju u traženi interval.
            </p>
          </WalkStep>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Važna mentalna slika">
            <p>
              Inverzna funkcija ti daje početni ugao, ali kružnica ti pokazuje
              koliko grana zapravo postoji.
            </p>
          </SectionCard>
          <SectionCard title='Šta znači „druga grana"'>
            <p>
              Kod sinusa i kosinusa to je drugi ugao na kome se pojavljuje ista
              ordinata ili ista apscisa u okviru jednog punog kruga.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Opasna greška">
            <p>
              <InlineMath>{"\\arcsin a"}</InlineMath> ili{" "}
              <InlineMath>{"\\arccos a"}</InlineMath> ne daju automatski
              kompletan odgovor. Daju samo ugao od koga krećeš.
            </p>
          </SectionCard>
          <SectionCard title="Interval nije isto što i opšte rešenje">
            <p>
              Prvo pišeš opšte rešenje, pa tek onda izdvajaš konkretne tačke iz
              zadatog intervala. Obrnuti redosled je rizičan.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako si za sin x = 1/2 našao x = π/6, da li je to kraj?"
          answer={
            <p>
              Nije. U jednom punom krugu postoji još jedan ugao sa istom
              ordinatom, a to je{" "}
              <InlineMath>{"\\frac{5\\pi}{6}"}</InlineMath>. Zatim na oba ta
              ugla moraš da dodaš <InlineMath>{"2k\\pi"}</InlineMath>. Dakle,
              prvi pronađeni ugao je samo početak, ne ceo odgovor.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule"
        title="Ovo je jezgro lekcije koje moraš da koristiš precizno"
        description="Formula sama po sebi nije dovoljna ako je ne povezuješ sa kružnicom, ali bez ovih zapisa nema dobrog, potpunog odgovora. Uči ih tako da razumeš i odakle dolaze."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sinus"
            formula={"\\sin x = a,\\quad |a|\\le 1"}
            note={
              <>
                Ako u intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath> dobiješ
                uglove <InlineMath>{"x_1"}</InlineMath> i{" "}
                <InlineMath>{"x_2"}</InlineMath>, onda je opšte rešenje{" "}
                <InlineMath>
                  {"x=x_1+2k\\pi"}
                </InlineMath>{" "}
                ili{" "}
                <InlineMath>
                  {"x=x_2+2k\\pi,\\ k\\in\\mathbb{Z}"}
                </InlineMath>
                . Ekvivalentno, ako je{" "}
                <InlineMath>{"\\alpha=\\arcsin a"}</InlineMath>, možeš pisati{" "}
                <InlineMath>{"x=\\alpha+2k\\pi"}</InlineMath> ili{" "}
                <InlineMath>{"x=\\pi-\\alpha+2k\\pi"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kosinus"
            formula={"\\cos x = a,\\quad |a|\\le 1"}
            note={
              <>
                Ako je <InlineMath>{"\\alpha=\\arccos a"}</InlineMath>, onda je
                opšte rešenje{" "}
                <InlineMath>{"x = \\pm \\alpha + 2k\\pi,\\ k\\in\\mathbb{Z}"}</InlineMath>
                , što praktično znači da u jednom punom krugu uzimaš ugao{" "}
                <InlineMath>{"\\alpha"}</InlineMath> i njegov simetrični položaj{" "}
                <InlineMath>{"2\\pi-\\alpha"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Tangens"
            formula={"\\tan x = a,\\qquad a\\in\\mathbb{R}"}
            note={
              <>
                Ako je <InlineMath>{"\\alpha=\\arctan a"}</InlineMath>, onda je{" "}
                <InlineMath>{"x=\\alpha+k\\pi,\\ k\\in\\mathbb{Z}"}</InlineMath>
                . Perioda je <InlineMath>{"\\pi"}</InlineMath>, zato nema dve
                odvojene grane kao kod sinusa i kosinusa. Jedna porodica je
                dovoljna.
              </>
            }
          />
          <FormulaCard
            title="Kotangens"
            formula={"\\cot x = a,\\qquad a\\in\\mathbb{R}"}
            note={
              <>
                U školskom zapisu često se piše{" "}
                <InlineMath>
                  {"x=\\operatorname{arccot} a+k\\pi,\\ k\\in\\mathbb{Z}"}
                </InlineMath>
                . Ali pošto se domen i opseg{" "}
                <InlineMath>{"\\operatorname{arccot}"}</InlineMath> razlikuju po
                udžbenicima, na prijemnom je često sigurnije da rešenje proveriš
                preko kružnice ili da, kada je praktično, prevedeš zadatak na
                tangens.
              </>
            }
          />
          <FormulaCard
            title="Specijalni slučajevi koje treba znati napamet"
            formula={"\\sin x = 0 \\Rightarrow x=k\\pi"}
            note={
              <>
                Slično: <InlineMath>{"\\cos x = 0 \\Rightarrow x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>,{" "}
                <InlineMath>{"\\tan x = 0 \\Rightarrow x=k\\pi"}</InlineMath>,{" "}
                <InlineMath>{"\\cot x = 0 \\Rightarrow x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kada ima samo jedno rešenje u krugu"
            formula={"\\sin x = 1 \\Rightarrow x=\\frac{\\pi}{2}+2k\\pi"}
            note={
              <>
                Slično:{" "}
                <InlineMath>{"\\sin x = -1 \\Rightarrow x=\\frac{3\\pi}{2}+2k\\pi"}</InlineMath>,{" "}
                <InlineMath>{"\\cos x = 1 \\Rightarrow x=2k\\pi"}</InlineMath>,{" "}
                <InlineMath>{"\\cos x = -1 \\Rightarrow x=\\pi+2k\\pi"}</InlineMath>.
                Ovo su tačke dodira, pa zato nema dve različite grane u jednom
                krugu.
              </>
            }
          />
        </div>

        <InsightCard title="Brzo pravilo za pamćenje">
          <p>
            Sinus i kosinus žive na punom krugu, zato dodaješ{" "}
            <InlineMath>{"2k\\pi"}</InlineMath>. Tangens i kotangens već posle
            pola kruga daju isto ponašanje, zato dodaješ{" "}
            <InlineMath>{"k\\pi"}</InlineMath>.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorija opštih rešenja"
        description={'Izaberi funkciju i vrednost a. Gore na canvasu vidi\u0161 geometrijsko tuma\u010Denje na kru\u017Enici, a dole sva re\u0161enja u izabranom intervalu. Cilj nije da se \u201Eigra\u0161\u201C, ve\u0107 da vizuelno shvati\u0161 za\u0161to kod nekih jedna\u010Dina dobija\u0161 dve grane, a kod nekih jednu.'}
      >
        <TrigEquationLab />

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <InsightCard title="Kako da učiš uz laboratoriju">
            <p>
              Prvo uzmi nekoliko „lepih" vrednosti poput{" "}
              <InlineMath>{"0"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{1}{2}"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{\\sqrt{2}}{2}"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{\\sqrt{3}}{2}"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>. Tek kad vidiš pravilo za njih,
              pomeri klizač na proizvoljne brojeve i proveri da li ti je jasno
              zašto se rešenja pomeraju.
            </p>
          </InsightCard>
          <InsightCard title="Šta treba da primetiš">
            <p>
              Kod sinusa i kosinusa broj preseka govori koliko rešenja ima u
              jednom krugu. Kod tangensa i kotangensa suprotna tačka na
              kružnici daje isti odnos koordinata, pa zato odmah dobijaš periodu{" "}
              <InlineMath>{"\\pi"}</InlineMath>.
            </p>
          </InsightCard>
        </div>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri su namerno raspoređeni od osnovnog ka ispitno korisnom"
        description="U svakom primeru pazi na dve stvari: kako se dobija osnovni ugao i kako se iz njega prelazi na ceo skup rešenja. Upravo taj prelaz je suština lekcije."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: reši jednačinu{" "}
              <InlineMath>{"\\sin x = \\frac{1}{2}"}</InlineMath>
            </h3>
            <p>
              Ovo je prvi i najvažniji obrazac: ista ordinata javlja se na dve
              tačke jedinične kružnice.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi uglove sa datom ordinatom.">
                <p>
                  Tražiš uglove čija je ordinata{" "}
                  <InlineMath>{"\\frac{1}{2}"}</InlineMath>. Na standardnim
                  uglovima to su <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{5\\pi}{6}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi periodu.">
                <p>
                  Pošto je u pitanju sinus, odgovori se ponavljaju na{" "}
                  <InlineMath>{"2\\pi"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {
                    "x=\\frac{\\pi}{6}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{5\\pi}{6}+2k\\pi,\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
                <p>Važno je da napišeš obe grane.</p>
              </WalkStep>
            </div>
            <InsightCard title="Najčešća greška">
              <p>
                Student napiše samo{" "}
                <InlineMath>{"x=\\frac{\\pi}{6}+2k\\pi"}</InlineMath>. To je
                nepotpun odgovor jer izostavlja drugi ugao sa istom ordinatom.
              </p>
            </InsightCard>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: reši jednačinu{" "}
              <InlineMath>{"\\cos x = -\\frac{\\sqrt{3}}{2}"}</InlineMath>
            </h3>
            <p>
              Kod kosinusa gledaš apscisu, pa negativan znak odmah šalje
              rešenje u levu polovinu kružnice.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi referentni ugao.">
                <p>
                  Referentni ugao za{" "}
                  <InlineMath>{"\\frac{\\sqrt{3}}{2}"}</InlineMath> je{" "}
                  <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi kvadrante.">
                <p>
                  Pošto kosinus treba da bude negativan, tražiš uglove u drugom
                  i trećem kvadrantu: <InlineMath>{"\\frac{5\\pi}{6}"}</InlineMath>{" "}
                  i <InlineMath>{"\\frac{7\\pi}{6}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {
                    "x=\\frac{5\\pi}{6}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{7\\pi}{6}+2k\\pi,\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: reši jednačinu{" "}
              <InlineMath>{"\\tan x = -1"}</InlineMath>
            </h3>
            <p>
              Ovde više ne tražiš dve grane na punom krugu, već jednu porodicu
              sa periodom <InlineMath>{"\\pi"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi jedan ugao.">
                <p>
                  Ugao sa tangensom <InlineMath>{"-1"}</InlineMath> možeš uzeti
                  kao <InlineMath>{"-\\frac{\\pi}{4}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Dodaj periodu tangensa.">
                <p>
                  Pošto tangens ima periodu{" "}
                  <InlineMath>{"\\pi"}</InlineMath>, sva ostala rešenja dobijaš
                  dodavanjem <InlineMath>{"k\\pi"}</InlineMath>. Ekvivalentno,
                  mogao bi da kreneš i od{" "}
                  <InlineMath>{"\\frac{3\\pi}{4}"}</InlineMath>, ali bi posle
                  opet dodavao <InlineMath>{"k\\pi"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapiši konačno rešenje.">
                <MathBlock>
                  {"x=-\\frac{\\pi}{4}+k\\pi,\\qquad k\\in\\mathbb{Z}"}
                </MathBlock>
                <p>
                  Ovo je isto što i zapis{" "}
                  <InlineMath>{"x=\\frac{3\\pi}{4}+k\\pi"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <InsightCard title="Česta greška">
              <p>
                Student ponekad napiše dve posebne grane kao kod sinusa. To
                nije nužno pogrešno ako su ekvivalentne, ali je nepotrebno i
                nepregledno. Jedna porodica sa{" "}
                <InlineMath>{"k\\pi"}</InlineMath> je prirodniji odgovor.
              </p>
            </InsightCard>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: reši jednačinu{" "}
              <InlineMath>{"\\cot x = \\sqrt{3}"}</InlineMath>
            </h3>
            <p>
              Ovaj primer je važan jer pokazuje kako da razmišljaš kada ti zapis
              sa <InlineMath>{"\\operatorname{arccot}"}</InlineMath> nije
              prijatan.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prevedi u tangens.">
                <p>
                  Tražiš ugao za koji je{" "}
                  <InlineMath>{"\\cot x = \\sqrt{3}"}</InlineMath>. To znači da
                  je{" "}
                  <InlineMath>{"\\tan x = \\frac{1}{\\sqrt{3}}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi referentni ugao.">
                <p>
                  Odgovarajući referentni ugao je{" "}
                  <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {"x=\\frac{\\pi}{6}+k\\pi,\\qquad k\\in\\mathbb{Z}"}
                </MathBlock>
                <p>To je potpuno korektan i pregledan odgovor.</p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: koliko rešenja ima jednačina{" "}
              <InlineMath>{"\\sin x = -\\frac{\\sqrt{2}}{2}"}</InlineMath> na
              intervalu <InlineMath>{"[-\\pi,2\\pi]"}</InlineMath>?
            </h3>
            <p>
              Ovo je tipičan prijemni zadatak: prvo opšte rešenje, pa onda
              brojanje konkretnih vrednosti.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi uglove u jednom krugu.">
                <p>
                  U jednom punom krugu vrednost{" "}
                  <InlineMath>{"-\\frac{\\sqrt{2}}{2}"}</InlineMath> dobijaš za
                  uglove <InlineMath>{"\\frac{5\\pi}{4}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{7\\pi}{4}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {
                    "x=\\frac{5\\pi}{4}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{7\\pi}{4}+2k\\pi"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Proveri koje vrednosti upadaju u interval.">
                <p>
                  Za <InlineMath>{"k=-1"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"-\\frac{3\\pi}{4}"}</InlineMath> i{" "}
                  <InlineMath>{"-\\frac{\\pi}{4}"}</InlineMath>. Za{" "}
                  <InlineMath>{"k=0"}</InlineMath> dobijaš{" "}
                  <InlineMath>{"\\frac{5\\pi}{4}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{7\\pi}{4}"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>
              {
                "\\text{Rešenja: } -\\frac{3\\pi}{4},\\ -\\frac{\\pi}{4},\\ \\frac{5\\pi}{4},\\ \\frac{7\\pi}{4}"
              }
            </MathBlock>
            <p>
              Dakle, na datom intervalu postoje tačno <strong>4 rešenja</strong>.
              Upravo zato je opšte rešenje korisno: iz njega sistematski
              izdvajaš konkretne vrednosti.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: reši jednačinu{" "}
              <InlineMath>{"\\cos x = 2"}</InlineMath>
            </h3>
            <p>
              Ovaj primer je kratak, ali važan jer na prijemnom štedi vreme kada
              umeš odmah da vidiš da rešenja nema.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Proveri skup vrednosti.">
                <p>
                  Skup vrednosti kosinusa je <InlineMath>{"[-1,1]"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uporedi sa datom vrednošću.">
                <p>
                  Broj <InlineMath>{"2"}</InlineMath> ne pripada tom intervalu,
                  zato ne postoji ugao čiji je kosinus jednak{" "}
                  <InlineMath>{"2"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"\\text{Jednačina nema realnih rešenja.}"}</MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde studenti najčešće gube poene"
        description="Obrati pažnju na ove greške već sada, jer se ponavljaju iz zadatka u zadatak. Većina njih nema veze sa teškim računom, već sa nedovoljno jasnim razumevanjem periodičnosti."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljena druga grana kod sinusa i kosinusa
            </h3>
            <p>
              Nađe se prvi ugao, ali se ne napiše drugi ugao iz istog kruga koji
              daje istu ordinatu ili apscisu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešna perioda u opštem rešenju
            </h3>
            <p>
              Dodavanje <InlineMath>{"k\\pi"}</InlineMath> kod sinusa i
              kosinusa ili <InlineMath>{"2k\\pi"}</InlineMath> kod tangensa i
              kotangensa odmah kvari ceo skup rešenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje „jednog ugla" i „svih rešenja"
            </h3>
            <p>
              <InlineMath>{"\\arcsin a"}</InlineMath>,{" "}
              <InlineMath>{"\\arccos a"}</InlineMath> ili{" "}
              <InlineMath>{"\\arctan a"}</InlineMath> daju početni ugao, ali ne
              zatvaraju zadatak bez periodičnog nastavka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nema provere uslova{" "}
              <InlineMath>{"|a| \\le 1"}</InlineMath>
            </h3>
            <p>
              Kod sinusa i kosinusa student krene da traži ugao iako realna
              rešenja uopšte ne postoje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Loše brojanje u intervalu</h3>
            <p>
              Opšte rešenje je ispravno, ali se pri ubacivanju vrednosti za{" "}
              <InlineMath>{"k"}</InlineMath> previdi krajnja tačka intervala ili
              se neki ugao prebroji dva puta.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Slepo korišćenje{" "}
              <InlineMath>{"\\operatorname{arccot}"}</InlineMath>
            </h3>
            <p>
              Pošto konvencije nisu uvek iste, u zadacima sa kotangensom
              sigurnije je razmišljati preko kružnice ili preko ekvivalentnog
              zapisa sa tangensom.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema realno pojavljuje na testu"
        description="Na prijemnom se osnovne trigonometrijske jednačine pojavljuju i direktno i kao završni korak složenijeg zadatka. Zbog toga je važno da ti ovaj nivo bude potpuno siguran."
      >
        <div className={s.grid2}>
          <SectionCard title="Direktan zadatak">
            <p>
              Najjednostavniji oblik je „reši jednačinu{" "}
              <InlineMath>{"\\sin x = \\frac{1}{2}"}</InlineMath>" ili „nađi sva
              rešenja na intervalu". Tu se proverava čisto razumevanje kružnice i
              periode.
            </p>
          </SectionCard>
          <SectionCard title="Poslednji korak težeg zadatka">
            <p>
              Posle identiteta, zamene ili sređivanja izraza često ostane upravo
              bazni oblik. Ako ga tu ne završiš dobro, ceo zadatak pada.
            </p>
          </SectionCard>
          <SectionCard title="Brojanje korenova">
            <p>
              Umesto samog skupa rešenja, često se traži broj rešenja u zadatom
              intervalu. To je razlog zašto moraš uredno da pišeš opšte rešenje.
            </p>
          </SectionCard>
          <SectionCard title="Kontrola preko skice">
            <p>
              Mala skica kružnice na marginama štedi vreme i smanjuje šansu da
              zaboraviš kvadrant, znak ili drugu granu.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Mini-checklista za ispit">
          <p>
            1. Da li rešenja uopšte postoje? 2. Koji su uglovi u jednom
            osnovnom intervalu? 3. Da li treba{" "}
            <InlineMath>{"2k\\pi"}</InlineMath> ili{" "}
            <InlineMath>{"k\\pi"}</InlineMath>? 4. Ako postoji interval, koje
            konkretne vrednosti <InlineMath>{"k"}</InlineMath> ulaze?
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Vežbaj dok opšte rešenje ne postane rutina"
        description="Probaj najpre bez otvaranja rešenja. Tek kada zaista zapneš, proveri postupak. Cilj nije samo da pogodiš rezultat, već da ga napišeš u ispravnom obliku."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Reši jednačinu{" "}
                <InlineMath>{"\\sin x = \\frac{\\sqrt{3}}{2}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  U jednom krugu odgovarajući uglovi su{" "}
                  <InlineMath>{"\\frac{\\pi}{3}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{2\\pi}{3}"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "x=\\frac{\\pi}{3}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{2\\pi}{3}+2k\\pi,\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Reši jednačinu{" "}
                <InlineMath>{"\\cos x = -\\frac{1}{2}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  U drugom i trećem kvadrantu dobijaš uglove{" "}
                  <InlineMath>{"\\frac{2\\pi}{3}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{4\\pi}{3}"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "x=\\frac{2\\pi}{3}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{4\\pi}{3}+2k\\pi,\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Reši jednačinu{" "}
                <InlineMath>{"\\tan x = \\sqrt{3}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Jedan osnovni ugao je{" "}
                  <InlineMath>{"\\frac{\\pi}{3}"}</InlineMath>.
                </p>
                <MathBlock>
                  {"x=\\frac{\\pi}{3}+k\\pi,\\qquad k\\in\\mathbb{Z}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Reši jednačinu <InlineMath>{"\\cot x = 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Kotangens je nula kada je kosinus jednak nuli, a sinus različit
                  od nule, odnosno za uglove{" "}
                  <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath> i njima
                  koterminalne.
                </p>
                <MathBlock>
                  {"x=\\frac{\\pi}{2}+k\\pi,\\qquad k\\in\\mathbb{Z}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Koliko rešenja ima jednačina{" "}
                <InlineMath>{"\\sin x = 0"}</InlineMath> na intervalu{" "}
                <InlineMath>{"[-2\\pi,2\\pi]"}</InlineMath>?
              </p>
            }
            solution={
              <>
                <p>
                  Opšte rešenje je <InlineMath>{"x=k\\pi"}</InlineMath>.
                </p>
                <p>
                  Na intervalu <InlineMath>{"[-2\\pi,2\\pi]"}</InlineMath>{" "}
                  dozvoljene su vrednosti{" "}
                  <InlineMath>{"-2\\pi,-\\pi,0,\\pi,2\\pi"}</InlineMath>, pa
                  postoji ukupno <strong>5 rešenja</strong>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Objasni zašto jednačina{" "}
                <InlineMath>{"\\cos x = -2"}</InlineMath> nema realna rešenja,
                bez upotrebe kalkulatora.
              </p>
            }
            solution={
              <p>
                Skup vrednosti kosinusa je{" "}
                <InlineMath>{"[-1,1]"}</InlineMath>. Pošto broj{" "}
                <InlineMath>{"-2"}</InlineMath> nije u tom intervalu, ne postoji
                realan ugao sa takvim kosinusom.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako sledeće četiri ideje postanu automatske, ova lekcija je zaista legla i spreman si za složenije trigonometrijske jednačine."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Razmišljaj preko kružnice</h3>
            <p>
              Sinus je ordinata, kosinus je apscisa, a tangens i kotangens su
              odnosi koordinata. To je srce lekcije.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Jedan ugao nije dovoljno rešenje
            </h3>
            <p>
              Uvek traži ceo skup rešenja. Kod sinusa i kosinusa često imaš dve
              grane u jednom krugu, a kod tangensa i kotangensa jednu porodicu
              sa periodom <InlineMath>{"\\pi"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Perioda je deo odgovora</h3>
            <p>
              Bez <InlineMath>{"2k\\pi"}</InlineMath> ili{" "}
              <InlineMath>{"k\\pi"}</InlineMath> odgovor nije završen. To nije
              dodatak radi reda, već suština trigonometrijskih jednačina.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Interval se obrađuje tek na kraju
            </h3>
            <p>
              Najpre pišeš opšte rešenje, pa tek onda izdvajaš konkretne
              vrednosti koje pripadaju zadatom intervalu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak su složenije trigonometrijske jednačine, gde se
          sve metode na kraju opet vraćaju na ove bazne obrasce.
        </p>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Ključna poruka"
      >
        <InsightCard title="Inverzna funkcija otvara, ali ne završava zadatak">
          <p>
            Inverzna trigonometrijska funkcija otvara zadatak, ali ga ne
            završava. Zadatak završavaš tek kada iz početnog ugla vidiš celu
            porodicu periodičnih rešenja i kada umeš da je primeniš na konkretan
            interval.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TrigEquationLab — interactive unit-circle + solutions lab
   ═══════════════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect, useCallback } from "react";

type TrigFunc = "sin" | "cos" | "tan" | "cot";

interface IntervalOption {
  label: string;
  start: number;
  end: number;
}

const INTERVALS: IntervalOption[] = [
  { label: "[-2\u03c0, 2\u03c0]", start: -2 * Math.PI, end: 2 * Math.PI },
  { label: "[0, 2\u03c0]", start: 0, end: 2 * Math.PI },
  { label: "[-\u03c0, 3\u03c0]", start: -Math.PI, end: 3 * Math.PI },
];

const PRESETS = [
  { label: "0", value: 0 },
  { label: "1/2", value: 0.5 },
  { label: "\u221a2/2", value: Math.SQRT2 / 2 },
  { label: "\u221a3/2", value: Math.sqrt(3) / 2 },
  { label: "1", value: 1 },
  { label: "-1/2", value: -0.5 },
  { label: "-1", value: -1 },
  { label: "\u221a3", value: Math.sqrt(3) },
];

function nearlyEqual(a: number, b: number, eps = 1e-6) {
  return Math.abs(a - b) <= eps;
}

function dedupeNumbers(values: number[], eps = 1e-6) {
  const sorted = values.slice().sort((a, b) => a - b);
  const result: number[] = [];
  for (const v of sorted) {
    if (!result.length || Math.abs(v - result[result.length - 1]) > eps) {
      result.push(v);
    }
  }
  return result;
}

function normalizePositive(angle: number, period: number) {
  let result = angle % period;
  if (result < 0) result += period;
  if (nearlyEqual(result, period)) result = 0;
  return result;
}

function generateSolutions(
  bases: number[],
  period: number,
  start: number,
  end: number
) {
  const EPS = 1e-9;
  const values: number[] = [];
  for (const base of bases) {
    const minK = Math.floor((start - base) / period) - 1;
    const maxK = Math.ceil((end - base) / period) + 1;
    for (let k = minK; k <= maxK; k++) {
      const x = base + k * period;
      if (x >= start - EPS && x <= end + EPS) {
        values.push(nearlyEqual(x, 0) ? 0 : x);
      }
    }
  }
  return dedupeNumbers(values);
}

function angleFractionLabel(angle: number): string {
  const ratio = angle / Math.PI;
  const denoms = [1, 2, 3, 4, 6, 12];
  for (const den of denoms) {
    const rawNum = Math.round(ratio * den);
    if (Math.abs(ratio - rawNum / den) < 1e-6) {
      const g = gcdCalc(Math.abs(rawNum), den);
      const n = rawNum / g;
      const d = den / g;
      if (n === 0) return "0";
      const sign = n < 0 ? "-" : "";
      const absN = Math.abs(n);
      if (d === 1) return absN === 1 ? `${sign}\u03c0` : `${sign}${absN}\u03c0`;
      if (absN === 1) return `${sign}\u03c0/${d}`;
      return `${sign}${absN}\u03c0/${d}`;
    }
  }
  return angle.toFixed(2);
}

function gcdCalc(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function solveEquation(type: TrigFunc, a: number) {
  const TAU = 2 * Math.PI;
  const period = type === "sin" || type === "cos" ? TAU : Math.PI;

  if ((type === "sin" || type === "cos") && Math.abs(a) > 1 + 1e-9) {
    return { exists: false, bases: [] as number[], period };
  }

  let bases: number[];
  if (type === "sin") {
    if (nearlyEqual(a, 1)) bases = [Math.PI / 2];
    else if (nearlyEqual(a, -1)) bases = [3 * Math.PI / 2];
    else {
      const first = normalizePositive(Math.asin(a), TAU);
      const second = normalizePositive(Math.PI - Math.asin(a), TAU);
      bases = dedupeNumbers([first, second]);
    }
  } else if (type === "cos") {
    if (nearlyEqual(a, 1)) bases = [0];
    else if (nearlyEqual(a, -1)) bases = [Math.PI];
    else {
      const first = normalizePositive(Math.acos(a), TAU);
      const second = normalizePositive(-Math.acos(a), TAU);
      bases = dedupeNumbers([first, second]);
    }
  } else if (type === "tan") {
    const base = normalizePositive(Math.atan(a), Math.PI);
    bases = [base];
  } else {
    // cot
    const base = normalizePositive(Math.atan2(1, a), Math.PI);
    bases = [base];
  }

  return { exists: true, bases, period };
}

function TrigEquationLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [eqType, setEqType] = useState<TrigFunc>("sin");
  const [rhsSlider, setRhsSlider] = useState(50);
  const [intervalIdx, setIntervalIdx] = useState(0);

  const a = rhsSlider / 100;
  const interval = INTERVALS[intervalIdx];

  const { exists, bases, period } = solveEquation(eqType, a);
  const solutions = exists
    ? generateSolutions(bases, period, interval.start, interval.end)
    : [];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    // --- Left half: unit circle ---
    const cx = W * 0.25;
    const cy = H * 0.5;
    const R = Math.min(W * 0.2, H * 0.38);

    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.3, cy);
    ctx.lineTo(cx + R * 1.3, cy);
    ctx.moveTo(cx, cy - R * 1.3);
    ctx.lineTo(cx, cy + R * 1.3);
    ctx.stroke();

    // circle
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();

    // guide line (y=a for sin, x=a for cos, tangent lines for tan/cot)
    ctx.strokeStyle = "rgba(236,91,19,0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);

    if (eqType === "sin") {
      const lineY = cy - a * R;
      ctx.beginPath();
      ctx.moveTo(cx - R * 1.3, lineY);
      ctx.lineTo(cx + R * 1.3, lineY);
      ctx.stroke();
    } else if (eqType === "cos") {
      const lineX = cx + a * R;
      ctx.beginPath();
      ctx.moveTo(lineX, cy - R * 1.3);
      ctx.lineTo(lineX, cy + R * 1.3);
      ctx.stroke();
    } else if (eqType === "tan") {
      // tangent line x=1 at cx+R
      const tanX = cx + R;
      ctx.beginPath();
      ctx.moveTo(tanX, cy - R * 1.3);
      ctx.lineTo(tanX, cy + R * 1.3);
      ctx.stroke();
      // point Q(1, a) on tangent line
      const qY = cy - a * R;
      if (qY > cy - R * 1.3 && qY < cy + R * 1.3) {
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(236,91,19,0.8)";
        ctx.beginPath();
        ctx.arc(tanX, qY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      // cot: y=1 line at cy-R
      const cotY = cy - R;
      ctx.beginPath();
      ctx.moveTo(cx - R * 1.3, cotY);
      ctx.lineTo(cx + R * 1.3, cotY);
      ctx.stroke();
      // point Q(a, 1) on that line
      const qX = cx + a * R;
      if (qX > cx - R * 1.3 && qX < cx + R * 1.3) {
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(236,91,19,0.8)";
        ctx.beginPath();
        ctx.arc(qX, cotY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    ctx.setLineDash([]);

    // solution points on circle
    if (exists) {
      for (const angle of bases) {
        const px = cx + R * Math.cos(angle);
        const py = cy - R * Math.sin(angle);
        ctx.fillStyle = "#ec5b13";
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowColor = "rgba(236,91,19,0.5)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ray from center
        ctx.strokeStyle = "rgba(236,91,19,0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        // label
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "center";
        const labelX = cx + (R + 18) * Math.cos(angle);
        const labelY = cy - (R + 18) * Math.sin(angle);
        ctx.fillText(angleFractionLabel(angle), labelX, labelY + 3);
      }
    }

    // --- Right half: number line with solutions ---
    const nlLeft = W * 0.55;
    const nlRight = W * 0.95;
    const nlY = H * 0.5;
    const nlW = nlRight - nlLeft;

    // number line
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(nlLeft, nlY);
    ctx.lineTo(nlRight, nlY);
    ctx.stroke();

    // Tick marks for multiples of pi
    const iStart = interval.start;
    const iEnd = interval.end;
    const tickStep = Math.PI / 2;
    const minTick = Math.ceil(iStart / tickStep) * tickStep;
    for (let t = minTick; t <= iEnd + 1e-9; t += tickStep) {
      const frac = (t - iStart) / (iEnd - iStart);
      const tx = nlLeft + frac * nlW;
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, nlY - 6);
      ctx.lineTo(tx, nlY + 6);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(angleFractionLabel(t), tx, nlY + 20);
    }

    // solution markers
    for (const sol of solutions) {
      const frac = (sol - iStart) / (iEnd - iStart);
      const sx = nlLeft + frac * nlW;
      ctx.fillStyle = "#ec5b13";
      ctx.beginPath();
      ctx.arc(sx, nlY, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowColor = "rgba(236,91,19,0.5)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(angleFractionLabel(sol), sx, nlY - 14);
    }

    // No solutions message
    if (!exists) {
      ctx.fillStyle = "rgba(255,155,143,0.7)";
      ctx.font = "14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Nema realnih re\u0161enja", W * 0.5, H * 0.15);
    }

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Jedini\u010dna kru\u017enica", cx, cy + R + 30);
    ctx.fillText(`Re\u0161enja na ${interval.label}`, (nlLeft + nlRight) / 2, nlY + 40);
  }, [eqType, a, interval, exists, bases, solutions]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const funcLabel =
    eqType === "sin"
      ? "sin"
      : eqType === "cos"
        ? "cos"
        : eqType === "tan"
          ? "tan"
          : "cot";

  const displayA =
    nearlyEqual(a, 0.5)
      ? "1/2"
      : nearlyEqual(a, -0.5)
        ? "-1/2"
        : nearlyEqual(a, Math.SQRT2 / 2)
          ? "\u221a2/2"
          : nearlyEqual(a, -Math.SQRT2 / 2)
            ? "-\u221a2/2"
            : nearlyEqual(a, Math.sqrt(3) / 2)
              ? "\u221a3/2"
              : nearlyEqual(a, -Math.sqrt(3) / 2)
                ? "-\u221a3/2"
                : nearlyEqual(a, Math.sqrt(3))
                  ? "\u221a3"
                  : nearlyEqual(a, -Math.sqrt(3))
                    ? "-\u221a3"
                    : a.toFixed(2);

  return (
    <div className={s.interactiveShell}>
      <div className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Kontrole</h3>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Tip jednačine</label>
            <select
              value={eqType}
              onChange={(e) => setEqType(e.target.value as TrigFunc)}
            >
              <option value="sin">sin x = a</option>
              <option value="cos">cos x = a</option>
              <option value="tan">tan x = a</option>
              <option value="cot">cot x = a</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Prikazani interval</label>
            <select
              value={intervalIdx}
              onChange={(e) => setIntervalIdx(Number(e.target.value))}
            >
              {INTERVALS.map((iv, i) => (
                <option key={i} value={i}>
                  {iv.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.rangeWrap}>
          <label>
            Desna strana: {funcLabel} x = {displayA}
          </label>
          <input
            type="range"
            min={-200}
            max={200}
            step={1}
            value={rhsSlider}
            onChange={(e) => setRhsSlider(Number(e.target.value))}
          />
        </div>

        <p style={{ marginTop: 12, fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
          Brze vrednosti:
        </p>
        <div className={cs.presetRow} style={{ marginTop: 6 }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              className={s.presetBtn}
              onClick={() => setRhsSlider(Math.round(p.value * 100))}
              type="button"
            >
              {p.label}
            </button>
          ))}
        </div>

        <p
          style={{
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 16,
            background: "rgba(236,91,19,0.08)",
            border: "1px solid rgba(236,91,19,0.16)",
            color: "var(--lesson-muted)",
            fontSize: "0.92rem",
          }}
        >
          Za <InlineMath>{"\\sin x = a"}</InlineMath> i{" "}
          <InlineMath>{"\\cos x = a"}</InlineMath> gledaj broj preseka sa
          kružnicom. Za <InlineMath>{"\\tan x = a"}</InlineMath> i{" "}
          <InlineMath>{"\\cot x = a"}</InlineMath> gledaj pomoćnu tangentu i
          zapamti da se rešenje ponavlja na{" "}
          <InlineMath>{"\\pi"}</InlineMath>.
        </p>
      </div>

      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            aria-label="Interaktivni prikaz osnovnih trigonometrijskih jednačina"
          />
        </div>
        <p
          style={{
            marginTop: 10,
            fontSize: "0.88rem",
            color: "var(--lesson-muted)",
          }}
        >
          Narandžasti markeri pokazuju tačke koje daju rešenje na kružnici, a
          desna osa prikazuje sva rešenja u izabranom intervalu.
          {exists && solutions.length > 0 && (
            <> Broj rešenja: <strong>{solutions.length}</strong>.</>
          )}
          {!exists && <> Jednačina nema realnih rešenja.</>}
        </p>
      </div>
    </div>
  );
}
