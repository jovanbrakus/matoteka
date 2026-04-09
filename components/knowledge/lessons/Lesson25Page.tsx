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
import IrrationalInequalityLab from "./IrrationalInequalityLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#model", label: "Osnovni model" },
  { href: "#algoritam", label: "Algoritam" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson25Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 25"
        title={
          <>
            Iracionalne{" "}
            <span className={cs.tHeroAccent}>nejednačine</span>
          </>
        }
        description="Ova lekcija je jedna od poslednjih ozbiljnih provera algebarske zrelosti pred prijemni. Ključ nije u tome da umeš da kvadriraš, nego da znaš kada smeš. Čim vidiš √A(x) □ B(x), prvi posao nije računanje nego logičko grananje po znaku desne strane."
        heroImageSrc="/images/lessons/lesson25_hero.png"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o iracionalnim nejednačinama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da razdvojiš zadatak na prave slučajeve: automatski tačan, automatski nemoguć i slučaj u kome je kvadriranje dozvoljeno.",
          },
          {
            label: "Najveća zamka",
            description:
              "Kvadriranje cele nejednačine bez provere znaka. Time se briše logička razlika između grana i nastaje pogrešan skup rešenja.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Za više od polovine zadataka dovoljan je pravi prvi minut. Domena i znak desne strane često rešavaju pola posla pre nego što krene algebra.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "75 do 90 minuta. Ovo je lekcija koju vredi učiti sporije, jer jedan dobar mentalni model štedi mnogo poena na ispitu.",
          },
          {
            label: "Predznanje",
            description:
              "Iracionalne jednačine i kvadratne nejednačine. Treba da umeš domenu korena, kvadriranje uz uslov i rešavanje kvadratnih nejednačina.",
          },
          {
            label: "Glavna veština",
            description:
              "Logičko grananje. Da tačno prepoznaš kad negativna desna strana pomaže, a kad odmah isključuje rešenja.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija grana. Menjaš parametre i odmah vidiš domenu, obe grane i skup rešenja na brojevnoj pravoj.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde se proverava da li razmišljaš ili samo manipulišeš simbolima"
        description="Iracionalne nejednačine deluju kratko, ali su suštinski logički zadaci. Ispitivač ne proverava samo da li umeš da kvadriraš, već da li razumeš da je √A(x) uvek nenegativno i da zbog toga znak izraza B(x) menja čitav tok rešenja."
      >
        <div className={s.grid3}>
          <SectionCard title="Učiš da algebra ima logičke uslove">
            <p>
              Isti refleks ti kasnije treba kod logaritama, domena funkcija,
              parametarskih zadataka i analize grafika. Ko ovde stekne
              disciplinu, pravi manje grešaka u svakoj sledećoj oblasti.
            </p>
          </SectionCard>
          <SectionCard title="Najčešća kazna je za preskočen prvi korak">
            <p>
              Kandidat često odmah kvadrira, dobije urednu kvadratnu nejednačinu
              i potpuno pogrešan odgovor. Zato je ova tema odličan filter:
              odvoji pažljivog učenika od onog koji radi mehanički.
            </p>
          </SectionCard>
          <SectionCard title="Negativna desna strana nekad pomaže, a nekad sve ruši">
            <p>
              Upravo ta promena logike razlikuje iracionalne nejednačine od
              većine rutinskih zadataka. Kada to jednom vidiš jasno, cela oblast
              postaje mnogo preglednija.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Studentska poruka koju vredi zapamtiti">
          <p>
            Ako ti zadatak deluje haotično, vrati se na jedno pitanje:{" "}
            <em>kakav je znak desne strane?</em> U većini iracionalnih
            nejednačina upravo to pitanje rešava najteži deo problema.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNI MODEL ═══════════ */}
      <LessonSection
        id="model"
        eyebrow="Osnovni model"
        title="Šta zapravo znači nejednačina sa korenom"
        description="U ovoj lekciji najčešće posmatramo kvadratni koren, jer je on dominantan na prijemnim ispitima. Za opšti oblik √A(x) □ B(x) prvo moraš da poštuješ dve činjenice: radikand mora biti nenegativan, a cela leva strana je tada takođe nenegativna."
      >
        <div className={s.grid3}>
          <SectionCard title="Iracionalna nejednačina">
            <p>
              To je nejednačina u kojoj se nepoznata javlja pod korenom, na
              primer{" "}
              <InlineMath>{"\\sqrt{x+1}\\ge x-1"}</InlineMath>,{" "}
              <InlineMath>{"\\sqrt{x+4}<x+2"}</InlineMath> ili{" "}
              <InlineMath>{"\\sqrt{2x+3}\\le 5-x"}</InlineMath>.
            </p>
            <MathBlock>{"A(x)\\ge 0 \\quad \\text{je prvi obavezni uslov.}"}</MathBlock>
          </SectionCard>
          <SectionCard title="Leva strana nikada nije negativna">
            <p>
              Kada je koren definisan, važi{" "}
              <InlineMath>{"\\sqrt{A(x)}\\ge 0"}</InlineMath>. Zato je znak
              izraza <InlineMath>{"B(x)"}</InlineMath> presudan: ako je{" "}
              <InlineMath>{"B(x)<0"}</InlineMath>, poređenje sa nenegativnim
              brojem ne izgleda isto kao kada je{" "}
              <InlineMath>{"B(x)\\ge 0"}</InlineMath>.
            </p>
            <MathBlock>{"\\sqrt{A(x)}\\ge 0"}</MathBlock>
          </SectionCard>
          <SectionCard title="Jedna rečenica koja spašava poene">
            <p>
              Za znakove <InlineMath>{">"}</InlineMath> i{" "}
              <InlineMath>{"\\ge"}</InlineMath> negativna desna strana obično{" "}
              <em>pomaže</em>. Za znakove <InlineMath>{"<"}</InlineMath> i{" "}
              <InlineMath>{"\\le"}</InlineMath> negativna desna strana obično{" "}
              <em>ubija</em> rešenja.
            </p>
            <MathBlock>
              {
                "\\sqrt{A(x)}\\ \\text{je nenegativno} \\Rightarrow \\text{prvo gledaj } B(x)."
              }
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: šta odmah znaš ako je desna strana jednaka −3?"
          answer={
            <p>
              Ako rešavaš <InlineMath>{"\\sqrt{A(x)}\\ge -3"}</InlineMath> ili{" "}
              <InlineMath>{"\\sqrt{A(x)}>-3"}</InlineMath>, tada je nejednačina
              tačna za sve <InlineMath>{"x"}</InlineMath> iz domene, jer je leva
              strana nenegativna. Ako rešavaš{" "}
              <InlineMath>{"\\sqrt{A(x)}\\le -3"}</InlineMath> ili{" "}
              <InlineMath>{"\\sqrt{A(x)}<-3"}</InlineMath>, tada nema rešenja,
              jer nenegativan broj ne može biti manji ili jednak negativnom broju.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ALGORITAM ═══════════ */}
      <LessonSection
        id="algoritam"
        eyebrow="Algoritam"
        title="Redosled koraka koji treba da automatizuješ"
        description="Najsigurniji način rešavanja iracionalnih nejednačina jeste da uvek radiš istim redom. Tako izbegavaš najveću opasnost ove oblasti: da kvadriraš pre nego što znaš da li je to logički dozvoljeno."
      >
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Napiši domenu">
            <p>
              Za kvadratni koren prvo mora važiti{" "}
              <InlineMath>{"A(x)\\ge 0"}</InlineMath>. Ovo nije ukrasni uslov.
              Bez njega levi član uopšte nije definisan.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Razdvoji slučajeve po znaku desne strane">
            <p>
              Ispitaj posebno gde je <InlineMath>{"B(x)"}</InlineMath>{" "}
              negativan, nenegativan, odnosno pozitivan kada je potrebna stroga
              nejednakost. Tu se krije glavni logički prekid.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Tek u odgovarajućoj grani kvadriraj">
            <p>
              Kvadriranje je dozvoljeno samo kada znaš da obe strane imaju pravi
              znak za poređenje. Tada nejednačinu svodiš na oblik bez korena.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Reši dobijenu algebarsku nejednačinu">
            <p>
              Najčešće dobijaš kvadratnu nejednačinu. Reši je, a zatim uradi
              presek sa uslovima grane u kojoj si radio.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Spoji grane u konačan skup rešenja">
            <p>
              Jedna grana može biti automatski tačna, druga dati intervale posle
              kvadriranja. Konačno rešenje je njihova unija, ne rezultat samo
              jedne od njih.
            </p>
          </WalkStep>
        </div>

        {/* Formal rules for four inequality types */}
        <h3 className={cs.tCardTitle} style={{ marginTop: 24 }}>
          Formalna pravila za četiri najvažnija oblika
        </h3>
        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="√A(x) > B(x)"
            formula={
              "\\sqrt{A(x)} > B(x) \\iff \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)<0 \\end{array}\\right] \\cup \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)\\ge 0 \\\\ A(x)>B(x)^2 \\end{array}\\right]"
            }
            note="Ako je B(x) < 0, leva strana je automatski veća jer je nenegativna."
          />
          <FormulaCard
            title="√A(x) ≥ B(x)"
            formula={
              "\\sqrt{A(x)} \\ge B(x) \\iff \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)<0 \\end{array}\\right] \\cup \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)\\ge 0 \\\\ A(x)\\ge B(x)^2 \\end{array}\\right]"
            }
            note="Tačka B(x)=0 pripada drugoj grani, gde proveravaš da li je A(x) ≥ 0."
          />
          <FormulaCard
            title="√A(x) < B(x)"
            formula={
              "\\sqrt{A(x)} < B(x) \\iff \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)>0 \\\\ A(x)<B(x)^2 \\end{array}\\right]"
            }
            note="Za strogo manje mora važiti B(x) > 0, jer broj manji od nule ne može biti iznad korena."
          />
          <FormulaCard
            title="√A(x) ≤ B(x)"
            formula={
              "\\sqrt{A(x)} \\le B(x) \\iff \\left[\\begin{array}{l} A(x)\\ge 0 \\\\ B(x)\\ge 0 \\\\ A(x)\\le B(x)^2 \\end{array}\\right]"
            }
            note="Ako je B(x) < 0, nema rešenja. Ako je B(x) = 0, moguće je samo kada je i koren jednak nuli."
          />
          <SectionCard title="Ne kvadriraš celu nejednačinu, nego samo validnu granu">
            <p>
              To je najvažniji uvid ove lekcije. Kvadriranje nije prvi korak,
              nego treći: dolazi tek pošto domena i znak desne strane budu
              potpuno razjašnjeni.
            </p>
          </SectionCard>
          <SectionCard title="Prvo logika, zatim algebra">
            <p>
              Učenik koji razume logiku grana retko greši. Učenik koji pamti samo
              algebarski obrazac često izgubi upravo one lake poene koje je mogao
              sigurno da osvoji.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto kod √A(x) < B(x) tražimo B(x) > 0, a ne samo B(x) ≥ 0?"
          answer={
            <p>
              Zato što je leva strana nenegativna. Ako bi važilo{" "}
              <InlineMath>{"B(x)=0"}</InlineMath>, onda bi nejednačina bila{" "}
              <InlineMath>{"\\sqrt{A(x)}<0"}</InlineMath>, što je nemoguće.
              Zato je za strogu nejednakost potrebno da desna strana bude strogo
              pozitivna.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Laboratorija za model √(x+p) □ (x+q)"
        description="Ovaj model nije cela teorija, ali je odličan trening za ono što je najvažnije: domen, znak desne strane i kvadratna nejednačina u drugoj grani. Menjaj parametre i prati kako se menja skup rešenja na brojevnoj pravoj."
      >
        <IrrationalInequalityLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa skupom rešenja kad
            promeniš znak nejednakosti, pa tek onda proveri ekran. Posebno
            obrati pažnju na to kako prelazak sa{" "}
            <InlineMath>{"\\ge"}</InlineMath> na{" "}
            <InlineMath>{"\\le"}</InlineMath> potpuno menja ulogu negativne
            desne strane.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od prve ideje do sigurnog ispitnog postupka"
        description="Svaki primer je napisan tako da prati način razmišljanja koji želiš da razviješ: domena, grane, kvadriranje samo tamo gde sme, pa onda presek i unija. Nemoj preskakati objašnjenja između redova, jer su upravo ona ono što na prijemnom donosi sigurnost."
      >
        {/* Primer 1 */}
        <article className={s.exampleCard} style={{ marginTop: 0 }}>
          <h3 className={cs.tCardTitle}>
            Primer 1: <InlineMath>{"\\sqrt{x+1} \\ge x-1"}</InlineMath>
          </h3>
          <p>
            Ovo je najvažniji početni model: jedna grana je automatski tačna, a
            druga vodi na kvadratnu nejednačinu.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Domena">
              <p>
                Mora važiti <InlineMath>{"x+1\\ge 0"}</InlineMath>, pa je{" "}
                <InlineMath>{"x\\ge -1"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep
              number={2}
              title={
                <>
                  Prva grana: <InlineMath>{"x-1<0"}</InlineMath>
                </>
              }
            >
              <p>
                Tada je <InlineMath>{"x<1"}</InlineMath>. Pošto je leva strana
                nenegativna, nejednačina{" "}
                <InlineMath>{"\\sqrt{x+1}\\ge x-1"}</InlineMath> je automatski
                tačna na celoj domeni te grane.
              </p>
              <MathBlock>
                {
                  "\\begin{cases} x\\ge -1 \\\\ x<1 \\end{cases} \\Rightarrow x\\in [-1,1)"
                }
              </MathBlock>
            </WalkStep>
            <WalkStep
              number={3}
              title={
                <>
                  Druga grana: <InlineMath>{"x-1\\ge 0"}</InlineMath>
                </>
              }
            >
              <p>
                Tada smeš da kvadriraš, jer upoređuješ dve nenegativne strane:
              </p>
              <MathBlock>
                {
                  "\\begin{cases} x\\ge -1 \\\\ x-1\\ge 0 \\\\ x+1\\ge (x-1)^2 \\end{cases}"
                }
              </MathBlock>
              <MathBlock>
                {
                  "x+1\\ge x^2-2x+1 \\iff x^2-3x\\le 0 \\iff x(x-3)\\le 0"
                }
              </MathBlock>
              <MathBlock>{"x\\in [0,3]"}</MathBlock>
              <p>
                Ali ova grana još traži <InlineMath>{"x\\ge 1"}</InlineMath>, pa
                dobijaš <InlineMath>{"x\\in [1,3]"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={4} title="Unija grana">
              <p>Konačno rešenje je</p>
              <MathBlock>{"[-1,1)\\cup[1,3]=[-1,3]."}</MathBlock>
              <p>
                Obrati pažnju: tačka <InlineMath>{"x=1"}</InlineMath> nije
                došla iz prve, nego iz druge grane. Zato granice uvek prati
                pažljivo.
              </p>
            </WalkStep>
          </div>
        </article>

        {/* Primer 2 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 2: <InlineMath>{"\\sqrt{x+4} < x+2"}</InlineMath>
          </h3>
          <p>
            Ovaj tip zadatka je odličan za učenje razlike između{" "}
            <InlineMath>{"\\ge"}</InlineMath> i{" "}
            <InlineMath>{"<"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Domena i znak desne strane">
              <p>
                Iz domene dobijaš <InlineMath>{"x\\ge -4"}</InlineMath>. Ali za
                strogo manje mora važiti i <InlineMath>{"x+2>0"}</InlineMath>,
                odnosno <InlineMath>{"x>-2"}</InlineMath>.
              </p>
              <MathBlock>
                {
                  "\\sqrt{x+4}<x+2 \\Rightarrow \\begin{cases} x\\ge -4 \\\\ x+2>0 \\end{cases}"
                }
              </MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Kvadriranje u dozvoljenoj grani">
              <p>
                Sada obe strane imaju pravi znak za kvadriranje:
              </p>
              <MathBlock>
                {
                  "x+4<(x+2)^2 \\iff x+4<x^2+4x+4 \\iff x^2+3x>0"
                }
              </MathBlock>
              <MathBlock>
                {"x(x+3)>0 \\Rightarrow x\\in (-\\infty,-3)\\cup(0,\\infty)"}
              </MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Presek sa uslovima grane">
              <p>
                Od ranije imaš <InlineMath>{"x>-2"}</InlineMath>, pa interval{" "}
                <InlineMath>{"(-\\infty,-3)"}</InlineMath> otpada. Ostaje samo
              </p>
              <MathBlock>{"x\\in (0,\\infty)."}</MathBlock>
              <p>
                Ovo je dobar primer zašto sama domena nije dovoljna. Prava
                prepreka je bio uslov da desna strana mora biti strogo pozitivna.
              </p>
            </WalkStep>
          </div>
        </article>

        {/* Primer 3 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 3: <InlineMath>{"\\sqrt{x+5} \\le x+1"}</InlineMath>
          </h3>
          <p>
            Ovde nema automatski tačne grane. Čim desna strana nije nenegativna,
            zadatak propada.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Uslovi pre kvadriranja">
              <p>
                Iz domene sledi <InlineMath>{"x\\ge -5"}</InlineMath>, a iz
                oblika <InlineMath>{"\\le"}</InlineMath> mora važiti i{" "}
                <InlineMath>{"x+1\\ge 0"}</InlineMath>, tj.{" "}
                <InlineMath>{"x\\ge -1"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Kvadriraj i sredi do kvadratne nejednačine">
              <MathBlock>
                {
                  "x+5\\le (x+1)^2 \\iff x+5\\le x^2+2x+1 \\iff x^2+x-4\\ge 0"
                }
              </MathBlock>
              <p>
                Nule su{" "}
                <InlineMath>
                  {"x_{1,2}=\\dfrac{-1\\pm\\sqrt{17}}{2}"}
                </InlineMath>
                , pa kako je koeficijent uz{" "}
                <InlineMath>{"x^2"}</InlineMath> pozitivan, važi
              </p>
              <MathBlock>
                {
                  "x\\le \\frac{-1-\\sqrt{17}}{2} \\quad \\text{ili} \\quad x\\ge \\frac{-1+\\sqrt{17}}{2}."
                }
              </MathBlock>
            </WalkStep>
            <WalkStep
              number={3}
              title={
                <>
                  Presek sa <InlineMath>{"x\\ge -1"}</InlineMath>
                </>
              }
            >
              <p>
                Prvi interval otpada, jer je ceo levo od{" "}
                <InlineMath>{"-1"}</InlineMath>. Ostaje
              </p>
              <MathBlock>
                {
                  "x\\in \\left[\\frac{-1+\\sqrt{17}}{2},\\infty\\right)."
                }
              </MathBlock>
              <p>
                Ovo je tipičan ispitni obrazac: učenik koji zaboravi uslov{" "}
                <InlineMath>{"x+1\\ge 0"}</InlineMath> često pogrešno zadrži i
                prvi interval.
              </p>
            </WalkStep>
          </div>
        </article>

        {/* Primer 4 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 4: <InlineMath>{"\\sqrt{x+6} > 2x-1"}</InlineMath>
          </h3>
          <p>
            Prijemna verzija sa opštijom linearnom desnom stranom. Logika je
            ista, samo je račun u drugoj grani jači.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Domena">
              <p>
                Važi <InlineMath>{"x+6\\ge 0"}</InlineMath>, pa je domena{" "}
                <InlineMath>{"x\\ge -6"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep
              number={2}
              title={
                <>
                  Prva grana: <InlineMath>{"2x-1<0"}</InlineMath>
                </>
              }
            >
              <p>
                Dobijaš <InlineMath>{"x<\\frac{1}{2}"}</InlineMath>. Pošto je
                leva strana nenegativna, u ovoj grani je nejednačina automatski
                tačna.
              </p>
              <MathBlock>
                {"x\\in \\left[-6,\\frac{1}{2}\\right)."}
              </MathBlock>
            </WalkStep>
            <WalkStep
              number={3}
              title={
                <>
                  Druga grana: <InlineMath>{"2x-1\\ge 0"}</InlineMath>
                </>
              }
            >
              <p>Sada smeš da kvadriraš:</p>
              <MathBlock>
                {
                  "x+6 > (2x-1)^2 \\iff x+6 > 4x^2-4x+1 \\iff 4x^2-5x-5 < 0."
                }
              </MathBlock>
              <p>
                Koreni su{" "}
                <InlineMath>
                  {"\\frac{5\\pm\\sqrt{105}}{8}"}
                </InlineMath>
                , pa važi
              </p>
              <MathBlock>
                {
                  "x\\in \\left(\\frac{5-\\sqrt{105}}{8},\\frac{5+\\sqrt{105}}{8}\\right)."
                }
              </MathBlock>
              <p>
                Kako ova grana još traži{" "}
                <InlineMath>{"x\\ge \\frac{1}{2}"}</InlineMath>, dobijaš
              </p>
              <MathBlock>
                {
                  "x\\in \\left[\\frac{1}{2},\\frac{5+\\sqrt{105}}{8}\\right)."
                }
              </MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Konačna unija">
              <MathBlock>
                {
                  "\\left[-6,\\frac{1}{2}\\right)\\cup\\left[\\frac{1}{2},\\frac{5+\\sqrt{105}}{8}\\right) = \\left[-6,\\frac{5+\\sqrt{105}}{8}\\right)."
                }
              </MathBlock>
              <p>
                Ovakav primer pokazuje da logika grana ostaje ista i kad algebra
                u drugoj grani postane ozbiljnija.
              </p>
            </WalkStep>
          </div>
        </article>

        <MicroCheck
          question="Mikro-provera: u kom primeru je tačka gde je desna strana nula morala posebno da se prati?"
          answer={
            <p>
              U prvom primeru tačka <InlineMath>{"x=1"}</InlineMath> je granica
              između dve grane. Nije pripadala automatski tačnoj grani{" "}
              <InlineMath>{"x<1"}</InlineMath>, ali je pripala drugoj grani jer
              tada postaje <InlineMath>{"\\sqrt{2}\\ge 0"}</InlineMath>. Upravo
              zato granica znaka desne strane nikada ne sme da se preleti bez
              razmišljanja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule"
        title="Šta vredi držati u glavi dok rešavaš zadatak"
        description="Ove formule nisu za slepo pamćenje, nego za brzo podsećanje na logiku. Ako ih razumeš, svaki novi zadatak svodiš na isti kostur."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Domena je uvek prva linija rešenja"
            formula={
              "\\sqrt{A(x)} \\ \\text{postoji samo ako}\\ A(x)\\ge 0."
            }
            note="Ako ovo ne napišeš, ostatak rešenja nema čvrst temelj."
          />
          <FormulaCard
            title="Negativna desna strana je saveznik (za > i ≥)"
            formula={
              "B(x)<0 \\Rightarrow \\sqrt{A(x)}\\ge B(x) \\ \\text{i}\\ \\sqrt{A(x)}>B(x)"
            }
            note="Naravno, samo na domeni korena."
          />
          <FormulaCard
            title="Negativna desna strana je prepreka (za < i ≤)"
            formula={
              "B(x)<0 \\Rightarrow \\sqrt{A(x)}\\le B(x) \\ \\text{nema rešenja}"
            }
            note="Za strogo manje čak ni B(x) = 0 nije dovoljno."
          />
          <FormulaCard
            title="Kvadriranje je dozvoljeno tek kada to znak opravda"
            formula={
              "\\sqrt{A(x)} \\,\\square\\, B(x) \\Rightarrow A(x) \\,\\square\\, B(x)^2"
            }
            note="Ovaj prelaz ne važi samostalno, već samo uz odgovarajući uslov na B(x)."
          />
          <FormulaCard
            title="Rešenje je unija grana"
            formula={"S = S_1 \\cup S_2"}
            note="Jedna grana može biti prazna, ali to moraš videti, ne pretpostaviti."
          />
          <SectionCard title="Pitaj se: da li sam možda zaboravio znak desne strane?">
            <p>
              Ako ti dobijeni interval deluje sumnjivo velik ili neobično lep,
              proveri da li si možda rešio samo kvadratnu nejednačinu posle
              kvadriranja, a zaboravio uslove grane.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube poeni"
        description='Ne pokušavaj da ove greške "ne praviš". Bolje je da ih jasno vidiš i da unapred znaš kako ih sprečavaš dok radiš zadatak.'
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Odmah kvadriranje bez grananja</h3>
            <p>
              Ovo je najopasnija i najčešća greška. Time mešaš automatski tačne
              i nemoguće slučajeve sa granom u kojoj smeš da kvadriraš.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen znak <InlineMath>{"B(x)=0"}</InlineMath>
            </h3>
            <p>
              Kod strogih i nestrogih nejednakosti granica nije ista. Posebno
              pazi na razliku između{" "}
              <InlineMath>{"B(x)>0"}</InlineMath> i{" "}
              <InlineMath>{"B(x)\\ge 0"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Ne radi se presek sa uslovima grane
            </h3>
            <p>
              Posle kvadratne nejednačine dobiješ intervale, ali oni još nisu
              konačni. Moraš da ih presečeš sa domenom i uslovom znaka desne
              strane.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Brka se unija i presek</h3>
            <p>
              Unutar jedne grane radiš presek uslova. Na kraju različite grane
              spajaš unijom. Mešanje ova dva koraka potpuno menja rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Misli se da je domena dovoljna</h3>
            <p>
              Domena govori samo gde koren postoji. Za poređenje sa desnom
              stranom često je važniji uslov da ta desna strana bude pozitivna
              ili nenegativna.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Ne proverava se smisao rezultata
            </h3>
            <p>
              Ako dobiješ rešenje na delu prave gde je desna strana negativna, a
              rešavao si oblik{" "}
              <InlineMath>{"\\sqrt{A(x)}<B(x)"}</InlineMath>, odmah zastani. Tu
              je gotovo sigurno nastala logička greška.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da ovu temu rešavaš brzo i sigurno na ispitu"
        description="Na prijemnom ne dobijaš poene za dužinu rešenja, nego za tačnost. Zato je cilj da razviješ kratku, stabilnu rutinu koja sprečava tipične padove koncentracije."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet pitanja pre računanja">
            <p>1. Koja je domena korena?</p>
            <p>
              2. Gde je desna strana negativna, nenegativna ili pozitivna?
            </p>
            <p>
              3. Da li imam automatski tačnu ili automatski nemoguću granu?
            </p>
            <p>4. U kojoj grani zaista smem da kvadriram?</p>
            <p>5. Da li sam na kraju spojio grane unijom?</p>
          </SectionCard>
          <SectionCard title="Najefikasniji redosled pisanja">
            <p>
              Napiši domenu u prvom redu. Odmah ispod razdvoji slučajeve po
              znaku desne strane. Tek u sledećem redu kvadriraj odgovarajuću
              granu. Ovaj raspored deluje uredno i tebi i onome ko gleda
              rešenje.
            </p>
            <MathBlock>
              {
                "\\text{domena} \\to \\text{grane} \\to \\text{kvadriranje} \\to \\text{presek} \\to \\text{unija}"
              }
            </MathBlock>
          </SectionCard>
          <SectionCard title="Nemoj juriti brži račun od boljeg uvida">
            <p>
              Najčešće gubljenje vremena nastaje kada tri reda računa uradiš
              pogrešno, pa tek onda shvatiš da je cela grana bila nemoguća.
              Zato je pravilan prvi minut važniji od brzog drugog minuta.
            </p>
          </SectionCard>
          <SectionCard title="Koristi rečenicu-vodilju">
            <p>
              Prepiši sebi u glavi:{" "}
              <em>koren je nenegativan, zato prvo gledam desnu stranu</em>.
              To je dovoljno kratko da radi i kad koncentracija padne pred kraj
              testa.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Proveri sebe bez gledanja u vođene primere"
        description="Pokušaj prvo samostalno. Rešenje otvori tek kada jasno napišeš domenu i grane. Cilj nije samo konačan interval, nego uredan i logičan postupak."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sqrt{x+2} \\ge x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"x\\ge -2"}</InlineMath>.
                </p>
                <p>
                  Prva grana: <InlineMath>{"x<0"}</InlineMath>. Tada je
                  nejednačina automatski tačna na domeni, pa daje{" "}
                  <InlineMath>{"[-2,0)"}</InlineMath>.
                </p>
                <p>
                  Druga grana: <InlineMath>{"x\\ge 0"}</InlineMath>.
                  Kvadriranjem dobijaš{" "}
                  <InlineMath>{"x+2\\ge x^2"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x^2-x-2\\le 0"}</InlineMath>, pa{" "}
                  <InlineMath>{"x\\in[-1,2]"}</InlineMath>. Presek sa{" "}
                  <InlineMath>{"x\\ge 0"}</InlineMath> daje{" "}
                  <InlineMath>{"[0,2]"}</InlineMath>.
                </p>
                <p>
                  Konačno:{" "}
                  <InlineMath>{"[-2,0)\\cup[0,2]=[-2,2]"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sqrt{x+1} < x+1"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"x\\ge -1"}</InlineMath>. Za znak{" "}
                  <InlineMath>{"<"}</InlineMath> mora važiti{" "}
                  <InlineMath>{"x+1>0"}</InlineMath>, dakle{" "}
                  <InlineMath>{"x>-1"}</InlineMath>.
                </p>
                <p>
                  Kvadriranjem: <InlineMath>{"x+1<(x+1)^2"}</InlineMath>. Neka
                  je <InlineMath>{"t=x+1>0"}</InlineMath>. Dobijaš{" "}
                  <InlineMath>{"t<t^2"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"t(t-1)>0"}</InlineMath>. Pošto je{" "}
                  <InlineMath>{"t>0"}</InlineMath>, sledi{" "}
                  <InlineMath>{"t>1"}</InlineMath>.
                </p>
                <p>
                  Zato je <InlineMath>{"x+1>1"}</InlineMath>, pa je rešenje{" "}
                  <InlineMath>{"x>0"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sqrt{2x+5} \\le x+4"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"2x+5\\ge 0"}</InlineMath>, pa{" "}
                  <InlineMath>{"x\\ge -\\frac{5}{2}"}</InlineMath>. Uslov{" "}
                  <InlineMath>{"x+4\\ge 0"}</InlineMath> je slabiji, jer je već
                  ispunjen na toj domeni.
                </p>
                <p>
                  Kvadriranjem dobijaš{" "}
                  <InlineMath>
                    {"2x+5\\le (x+4)^2=x^2+8x+16"}
                  </InlineMath>
                  , pa <InlineMath>{"x^2+6x+11\\ge 0"}</InlineMath>.
                </p>
                <p>
                  Pošto je{" "}
                  <InlineMath>{"x^2+6x+11=(x+3)^2+2>0"}</InlineMath> za svako
                  realno <InlineMath>{"x"}</InlineMath>, druga nejednačina je
                  uvek tačna.
                </p>
                <p>
                  Zato je konačno rešenje cela domena:{" "}
                  <InlineMath>
                    {"\\left[-\\frac{5}{2},\\infty\\right)"}
                  </InlineMath>
                  .
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sqrt{3-x} > 1"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"3-x\\ge 0"}</InlineMath>, pa{" "}
                  <InlineMath>{"x\\le 3"}</InlineMath>.
                </p>
                <p>
                  Pošto je desna strana pozitivna, nema potrebe za grananjem.
                  Kvadriranjem dobijaš <InlineMath>{"3-x>1"}</InlineMath>,
                  odnosno <InlineMath>{"x<2"}</InlineMath>.
                </p>
                <p>
                  Presek sa domenom daje{" "}
                  <InlineMath>{"(-\\infty,2)"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sqrt{x+5} \\le 2-x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena: <InlineMath>{"x\\ge -5"}</InlineMath>. Pošto je znak{" "}
                  <InlineMath>{"\\le"}</InlineMath>, mora važiti i{" "}
                  <InlineMath>{"2-x\\ge 0"}</InlineMath>, tj.{" "}
                  <InlineMath>{"x\\le 2"}</InlineMath>.
                </p>
                <p>
                  Kvadriranjem:{" "}
                  <InlineMath>
                    {"x+5\\le (2-x)^2=x^2-4x+4"}
                  </InlineMath>
                  , pa <InlineMath>{"x^2-5x-1\\ge 0"}</InlineMath>.
                </p>
                <p>
                  Nule su{" "}
                  <InlineMath>
                    {"\\frac{5\\pm\\sqrt{29}}{2}"}
                  </InlineMath>
                  , pa je rešenje kvadratne nejednačine{" "}
                  <InlineMath>
                    {"x\\le \\frac{5-\\sqrt{29}}{2}"}
                  </InlineMath>{" "}
                  ili{" "}
                  <InlineMath>
                    {"x\\ge \\frac{5+\\sqrt{29}}{2}"}
                  </InlineMath>
                  .
                </p>
                <p>
                  Sa uslovom <InlineMath>{"-5\\le x\\le 2"}</InlineMath> ostaje{" "}
                  <InlineMath>
                    {"\\left[-5,\\frac{5-\\sqrt{29}}{2}\\right]"}
                  </InlineMath>
                  .
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Objasni bez kompletnog računa zašto ne smeš odmah da kvadriraš{" "}
                <InlineMath>{"\\sqrt{x+1} < x-2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Zato što znak <InlineMath>{"<"}</InlineMath> zahteva da desna
                strana bude strogo pozitivna. Ako je{" "}
                <InlineMath>{"x-2\\le 0"}</InlineMath>, nejednačina je nemoguća,
                pa nema šta da se kvadrira. Tek kada izdvojiš granu{" "}
                <InlineMath>{"x>2"}</InlineMath>, ima smisla preći na{" "}
                <InlineMath>{"x+1<(x-2)^2"}</InlineMath>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključni uvid"
        title="Iracionalna nejednačina se ne rešava jednim trikom, nego pravilnim grananjem"
      >
        <InsightCard title="Ako pamtiš samo jednu rečenicu iz ove lekcije, neka bude: prvo znak desne strane, pa tek onda kvadriranje.">
          <MathBlock>
            {
              "\\sqrt{A(x)} \\,\\square\\, B(x) \\quad \\Longrightarrow \\quad \\text{domena} + \\text{znak } B(x) + \\text{dozvoljena algebra}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta obavezno nosiš iz ove lekcije"
        description="Kada zatvoriš ovu lekciju, cilj nije da znaš napamet deset obrazaca, već da imaš jednu stabilnu proceduru koja radi i u lakim i u teškim zadacima."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domena ide prva</h3>
            <p>
              Kvadratni koren postoji samo kada je radikand nenegativan. Bez te
              prve linije nema smislenog rešenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Znak desne strane menja ceo zadatak
            </h3>
            <p>
              Za <InlineMath>{">"}</InlineMath> i{" "}
              <InlineMath>{"\\ge"}</InlineMath> negativna desna strana pomaže.
              Za <InlineMath>{"<"}</InlineMath> i{" "}
              <InlineMath>{"\\le"}</InlineMath> negativna desna strana obično
              uklanja rešenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Kvadriranje dolazi tek u odgovarajućoj grani
            </h3>
            <p>
              Ne kvadriraš napamet. Najpre odlučiš u kojoj grani to smeš da
              uradiš, pa tek onda rešavaš kvadratnu nejednačinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Presek uslova unutar grane je obavezan
            </h3>
            <p>
              Rezultat dobijen posle kvadriranja nije konačan dok ga ne presečeš
              sa domenom i uslovom znaka desne strane.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. Konačno rešenje je unija grana
            </h3>
            <p>
              Jedna grana može biti prazna, druga dati interval. Konačno rešenje
              dobijaš tek kada ih spojiš kako treba.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Sledeći korak</h3>
            <p>
              Vežbaj kratke zadatke sa što manje pisanja, ali bez preskakanja
              logike. Ako ovu proceduru usvojiš sada, bićeš mnogo sigurniji i
              kod logaritamskih nejednačina i kod težih parametarskih zadataka.
            </p>
          </article>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
