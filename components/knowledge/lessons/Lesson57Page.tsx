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
import LimitLab from "./LimitLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#niz", label: "Limes niza" },
  { href: "#funkcija", label: "Limes funkcije" },
  { href: "#tehnike", label: "Tehnike računanja" },
  { href: "#asimptote", label: "Asimptote" },
  { href: "#interaktivno", label: "Interaktivna laboratorija" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

export default function Lesson57Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 57"
        title={
          <>
            Granična vrednost{" "}
            <span className={cs.tHeroAccent}>niza i funkcije</span>
          </>
        }
        description="Limes je prvi veliki korak iz školske algebre ka matematičkoj analizi. U ovoj lekciji nećeš samo računati rezultate, nego ćeš naučiti šta zaista znači da se niz ili funkcija približava nekom broju, kako da prepoznaš neodređenost i kako da iz limesa pročitaš asimptotu bez haotičnog računanja."
        heroImageSrc="/api/lessons/57/hero"
        heroImageAlt="Ilustracija za lekciju o graničnoj vrednosti niza i funkcije"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Limes prati šta se dešava kada se približavaš, a ne nužno šta se događa tačno u tački.",
          },
          {
            label: "Najveća zamka",
            description:
              "Kada dobiješ 0/0 ili ∞/∞, to nije kraj zadatka nego signal da treba promeniti oblik izraza.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Jedna dobra odluka na početku često skraćuje ceo zadatak na dve ili tri mirne linije računa.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "80 do 100 minuta sa laboratorijumom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description:
              "Racionalni izrazi, faktorizacija, stepeni i osnovno razumevanje domena.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznavanje pravog poteza — razlaganje, izdvajanje ili jednostrani limes.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija limesa sa promenljivim primerom i opsegom.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Limes je jezik kojim analiza opisuje približavanje"
        description={'U algebri često pitaš \u201Ekoliko je tačno?\u201C. U analizi vrlo često pitaš \u201Ešta se dešava kada idem sve bliže?\u201C. Ta promena perspektive je suštinska. Limes stoji iza kontinuiteta, izvoda, integrala, asimptota i ozbiljnog razumevanja grafika.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Most ka izvodima">
            <p>
              Izvod ćeš kasnije definisati upravo kao limes količnika promena.
              Ako ti je limes mutan, i pravila izvoda deluju kao magija.
              Ako ti je limes jasan, izvodi postaju logičan nastavak.
            </p>
          </SectionCard>
          <SectionCard title="Osnova za asimptote i grafike">
            <p>
              Kada posmatraš šta funkcija radi blizu neke tačke ili kada{" "}
              <InlineMath>{"x"}</InlineMath> ide ka beskonačnosti, dobijaš
              informacije o rupama, vertikalnim i horizontalnim asimptotama. To
              je direktno korisno u zadacima crtanja grafika.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni nagrađuje razumevanje">
            <p>
              Tipični zadaci iz limesa nisu dugi, ali imaju jednu ključnu
              odluku. Učenik koji odmah vidi obrazac rešava ih brzo; učenik koji
              kreće „naslepo" lako se zapetlja u tri reda nepotrebnog računa.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Glavni uvid">
          <p>
            Limes nije isto što i vrednost. Funkcija može biti nedefinisana u
            tački, a ipak imati limes. Može biti definisana u tački, a da limes
            ne postoji. Čim ovo usvojiš, prestaju najčešće početničke greške.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. LIMES NIZA ═══════════ */}
      <LessonSection
        id="niz"
        eyebrow="Granična vrednost niza"
        title="Rep niza je važniji od prvih nekoliko članova"
        description="Niz je funkcija koja svakom prirodnom broju dodeljuje jedan realan broj. Kada govorimo o limesu niza, zanima nas ponašanje članova aₙ kada n postaje veoma veliko."
      >
        <div className={s.grid3}>
          <SectionCard title="Niz i njegova oznaka">
            <MathBlock>{"n \\mapsto a_n"}</MathBlock>
            <p>
              Niz se zapisuje kao{" "}
              <InlineMath>{"(a_n)"}</InlineMath>, a pojedinačni član kao{" "}
              <InlineMath>{"a_n"}</InlineMath>. Formalno, to je preslikavanje{" "}
              <InlineMath>{"a:\\mathbb{N}\\to\\mathbb{R}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta znači aₙ → L">
            <MathBlock>
              {
                "\\forall \\varepsilon > 0 \\; \\exists N \\in \\mathbb{N}:\\; n \\ge N \\Rightarrow |a_n - L| < \\varepsilon"
              }
            </MathBlock>
            <p>
              Članovi niza mogu da se učine proizvoljno bliskim broju{" "}
              <InlineMath>{"L"}</InlineMath> ako odeš dovoljno daleko u rep niza.
            </p>
          </SectionCard>
          <SectionCard title="Niz koji ide ka nuli">
            <MathBlock>
              {
                "a_n = \\frac{1}{n} \\quad \\Longrightarrow \\quad \\lim_{n\\to\\infty} a_n = 0"
              }
            </MathBlock>
            <p>
              Kako <InlineMath>{"n"}</InlineMath> raste, razlomak{" "}
              <InlineMath>{"\\frac{1}{n}"}</InlineMath> postaje sve manji. Zato
              se tačke niza spuštaju ka nuli.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Kada viši stepen odlučuje">
            <MathBlock>
              {
                "\\frac{2n+3}{n+5} = \\frac{2+\\frac{3}{n}}{1+\\frac{5}{n}} \\to 2"
              }
            </MathBlock>
            <p>
              Kod racionalnog izraza u <InlineMath>{"n"}</InlineMath>, najviše
              stepene gledaš prve. Niži stepeni postaju relativno zanemarljivi.
            </p>
          </SectionCard>
          <SectionCard title="Oscilovanje bez smirivanja">
            <MathBlock>{"a_n = (-1)^n"}</MathBlock>
            <p>
              Ako se članovi stalno „prebacuju" između različitih vrednosti i ne
              približavaju jednom broju, limes ne postoji.
            </p>
          </SectionCard>
          <SectionCard title="Broj e kao limes">
            <MathBlock>
              {"\\left(1+\\frac{1}{n}\\right)^n \\to e"}
            </MathBlock>
            <p>
              U analizi se važan broj <InlineMath>{"e"}</InlineMath> može
              definisati upravo preko limesa jednog niza. To je znak koliko je
              pojam limesa centralan.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija koju treba da zadržiš">
            <p>
              Ako ti neko kaže da niz ide ka broju{" "}
              <InlineMath>{"4"}</InlineMath>, ne znači da će neki član biti tačno
              jednak 4. Znači da će članovi, kada odeš dovoljno daleko, biti sve
              bliže i bliže 4. Limes opisuje tendenciju, ne obećava „pogodak".
            </p>
          </SectionCard>
          <SectionCard title="Praktičan algoritam za učenika">
            <p>
              Kod niza prvo proveri da li članovi imaju smisla za veliko{" "}
              <InlineMath>{"n"}</InlineMath>, zatim prepoznaj da li postoji
              dominantni stepen i na kraju proceni da li niz smiruje vrednosti
              ili osciluje. Ako se javlja racionalni izraz, najčešće je rešenje u
              deljenju najvećim stepenom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li niz aₙ = (5n-1)/(n+7) ima limes?"
          answer={
            <p>
              Ima. Podeli brojilac i imenilac sa{" "}
              <InlineMath>{"n"}</InlineMath>:
              <MathBlock>
                {
                  "\\frac{5n-1}{n+7} = \\frac{5-\\frac{1}{n}}{1+\\frac{7}{n}} \\to 5"
                }
              </MathBlock>
              Dominantni članovi su{" "}
              <InlineMath>{"5n"}</InlineMath> i{" "}
              <InlineMath>{"n"}</InlineMath>, pa njihov odnos određuje limes.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. LIMES FUNKCIJE ═══════════ */}
      <LessonSection
        id="funkcija"
        eyebrow="Granična vrednost funkcije"
        title="Funkcija u okolini tačke ne mora da se ponaša isto kao u samoj tački"
        description="Kod funkcije lim(x→a) f(x) = L zanima nas šta se dešava sa vrednostima f(x) kada se x približava broju a. Važno je: x se približava, ali ne mora biti jednak a."
      >
        <div className={s.grid3}>
          <SectionCard title="Limes funkcije">
            <MathBlock>
              {
                "\\forall \\varepsilon>0 \\; \\exists \\delta>0:\\; 0<|x-a|<\\delta \\Rightarrow |f(x)-L|<\\varepsilon"
              }
            </MathBlock>
            <p>
              Vrednosti funkcije mogu se dovesti proizvoljno blizu{" "}
              <InlineMath>{"L"}</InlineMath> kad god uzmeš{" "}
              <InlineMath>{"x"}</InlineMath> dovoljno blizu tačke{" "}
              <InlineMath>{"a"}</InlineMath>, ali različit od{" "}
              <InlineMath>{"a"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Limes nije isto što i f(a)">
            <MathBlock>
              {
                "f(x)=\\frac{x^2-1}{x-1},\\; x\\neq 1 \\qquad\\Rightarrow\\qquad \\lim_{x\\to 1} f(x)=2"
              }
            </MathBlock>
            <p>
              Funkcija može imati „rupu" u tački, a limes i dalje postoji. To se
              često javlja posle skraćivanja zajedničkog faktora.
            </p>
          </SectionCard>
          <SectionCard title="Levi i desni prilaz">
            <MathBlock>
              {
                "\\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L"
              }
            </MathBlock>
            <p>
              Da bi postojao običan limes u tački, levi i desni limes moraju
              postojati i biti jednaki.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Različiti jednostrani rezultati">
            <MathBlock>
              {
                "f(x)=\\frac{|x|}{x},\\; x\\neq 0 \\qquad\\Rightarrow\\qquad \\lim_{x\\to 0^-} f(x)=-1,\\; \\lim_{x\\to 0^+} f(x)=1"
              }
            </MathBlock>
            <p>
              Ako funkcija s leve i desne strane prilazi različitim brojevima,
              zajednički limes ne postoji.
            </p>
          </SectionCard>
          <SectionCard title="Kada je funkcija neprekidna u tački">
            <MathBlock>
              {"\\lim_{x\\to a} f(x) = f(a)"}
            </MathBlock>
            <p>
              Neprekidnost spaja tri stvari: funkcija je definisana, limes
              postoji i taj limes je jednak vrednosti funkcije.
            </p>
          </SectionCard>
          <SectionCard title="Grafik govori mnogo">
            <MathBlock>
              {
                "x\\to a \\quad \\Longrightarrow \\quad \\text{posmatraj lokalno ponašanje grafa}"
              }
            </MathBlock>
            <p>
              Ako graf sa obe strane prilazi istoj visini, imaš limes. Ako sa
              jedne strane „puca" uvis ili naniže, razmišljaš o vertikalnoj
              asimptoti.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija iz učionice">
            <p>
              Zamislimo da se <InlineMath>{"x"}</InlineMath> kreće po brojevnoj
              pravoj i polako prilazi broju <InlineMath>{"a"}</InlineMath>. Dok
              se približava, ti pratiš odgovarajuće tačke na grafiku. Ako se
              visine tih tačaka približavaju jednom broju, to je limes. Tačka{" "}
              <InlineMath>{"x=a"}</InlineMath> može čak i da nedostaje, a priča
              o limesu i dalje ostaje potpuno smislena.
            </p>
          </SectionCard>
          <SectionCard title="Šta učenici najčešće pomešaju">
            <p>
              U zadatku{" "}
              <InlineMath>{"\\lim_{x\\to 2} f(x)"}</InlineMath> mnogi odmah
              ubace <InlineMath>{"x=2"}</InlineMath> i misle da je posao
              završen. Ubacivanje je samo prvi test. Ako dobiješ normalan broj,
              dobro. Ako dobiješ neodređenost ili deljenje nulom, tek tada
              počinje pravi deo zadatka.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li postoji lim(x→0) |x|/x?"
          answer={
            <p>
              Ne postoji. Sa leve strane je{" "}
              <InlineMath>{"\\frac{|x|}{x}=-1"}</InlineMath>, a sa desne{" "}
              <InlineMath>{"\\frac{|x|}{x}=1"}</InlineMath>. Pošto levi i desni
              limes nisu jednaki, običan limes ne postoji.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. TEHNIKE RAČUNANJA ═══════════ */}
      <LessonSection
        id="tehnike"
        eyebrow="Tehnike računanja limesa"
        title="Neodređenost je signal da menjaš oblik izraza"
        description='Kada ubacivanje u limes daje „lep" broj, posao je gotov. Ali kada dobiješ 0/0, ∞/∞ ili izraz sa korenom koji se raspada na sličan način, treba da transformišeš izraz u ekvivalentan, ali pregledniji oblik.'
      >
        <div className={s.grid2}>
          <SectionCard title="1. Prvo uvrsti">
            <p>
              Ne preskači ovaj korak. Samo tako znaš da li si dobio običan broj,{" "}
              <InlineMath>{"0/0"}</InlineMath>, deljenje nulom ili ponašanje na
              beskonačnosti.
            </p>
          </SectionCard>
          <SectionCard title="2. Prepoznaj obrazac">
            <p>
              <InlineMath>{"0/0"}</InlineMath> obično traži razlaganje ili
              racionalizaciju.{" "}
              <InlineMath>{"\\infty/\\infty"}</InlineMath> obično traži deljenje
              najvećim stepenom.
            </p>
          </SectionCard>
          <SectionCard title="3. Promeni oblik">
            <p>
              Tek kada se izraz pročisti, vraćaš se na limes. Nemoj nasumično
              „precrtavati" ako ne postoji zajednički faktor.
            </p>
          </SectionCard>
          <SectionCard title="4. Proveri značenje rezultata">
            <p>
              Ako je limes beskonačan, možda ne tražiš broj nego informaciju o
              asimptoti. Zato uvek protumači šta si dobio.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="0/0 i faktorizacija"
            formula={"\\lim_{x\\to 3}\\frac{x^2-9}{x-3} = \\lim_{x\\to 3}\\frac{(x-3)(x+3)}{x-3} = \\lim_{x\\to 3}(x+3) = 6"}
            note="Kada i brojilac i imenilac odu na nulu, često postoji zajednički faktor koji možeš izdvojiti i skratiti."
          />
          <FormulaCard
            title="∞/∞ i najveći stepen"
            formula={"\\frac{3x^2-x}{x^2+5} = \\frac{3-\\frac{1}{x}}{1+\\frac{5}{x^2}} \\to 3"}
            note="Kod racionalnih izraza za x→∞ ili n→∞, podeli sve članove najvećim stepenom iz imenioca."
          />
          <FormulaCard
            title="Koren i racionalizacija"
            formula={"\\frac{\\sqrt{x+3}-2}{x-1}\\cdot\\frac{\\sqrt{x+3}+2}{\\sqrt{x+3}+2} = \\frac{1}{\\sqrt{x+3}+2}"}
            note="Ako vidiš izraz sa korenom i posle ubacivanja dobiješ 0/0, često pomaže množenje konjugovanim izrazom."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto smeš da skratiš (x-3) u primeru (x²-9)/(x-3)?"
          answer={
            <p>
              Zato što najpre faktorišeš brojilac:{" "}
              <InlineMath>{"x^2-9=(x-3)(x+3)"}</InlineMath>. Tada{" "}
              <InlineMath>{"(x-3)"}</InlineMath> zaista jeste zajednički faktor
              brojioca i imenioca. Ne skraćuješ deo zbira ili razlike, nego ceo
              faktor. To je velika razlika.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. ASIMPTOTE ═══════════ */}
      <LessonSection
        id="asimptote"
        eyebrow="Asimptote"
        title="Limes pretvara lokalno i daleko ponašanje funkcije u jasne geometrijske linije"
        description="Asimptota je prava kojoj se grafik funkcije približava na određeni način. Ona nije ukrasna informacija: često je presudna za skicu grafika, razumevanje domena i brzinsko rešavanje zadataka iz analize."
      >
        <div className={s.grid3}>
          <SectionCard title="Vertikalna asimptota">
            <MathBlock>
              {
                "\\lim_{x\\to a^-} f(x) = \\pm\\infty \\quad \\text{ili} \\quad \\lim_{x\\to a^+} f(x) = \\pm\\infty"
              }
            </MathBlock>
            <p>
              Ako funkcija u blizini tačke <InlineMath>{"a"}</InlineMath>{" "}
              odlazi u <InlineMath>{"+\\infty"}</InlineMath> ili{" "}
              <InlineMath>{"-\\infty"}</InlineMath>, tada je{" "}
              <InlineMath>{"x=a"}</InlineMath> vertikalna asimptota.
            </p>
          </SectionCard>
          <SectionCard title="Horizontalna asimptota">
            <MathBlock>
              {
                "\\lim_{x\\to\\infty} f(x) = L \\quad \\text{ili} \\quad \\lim_{x\\to-\\infty} f(x) = L"
              }
            </MathBlock>
            <p>
              Ako funkcija za{" "}
              <InlineMath>{"x\\to\\pm\\infty"}</InlineMath> prilazi fiksnom
              broju <InlineMath>{"L"}</InlineMath>, tada je prava{" "}
              <InlineMath>{"y=L"}</InlineMath> horizontalna asimptota.
            </p>
          </SectionCard>
          <SectionCard title="Kosa asimptota">
            <MathBlock>
              {
                "\\lim_{x\\to\\infty}\\bigl(f(x)-(kx+n)\\bigr)=0"
              }
            </MathBlock>
            <p>
              U naprednijim zadacima funkcija se za veliko{" "}
              <InlineMath>{"x"}</InlineMath> može približavati ne horizontalnoj,
              nego kosoj pravoj.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Primer: vertikalna asimptota">
            <MathBlock>
              {
                "\\lim_{x\\to 2^-}\\frac{1}{x-2}=-\\infty,\\qquad \\lim_{x\\to 2^+}\\frac{1}{x-2}=+\\infty"
              }
            </MathBlock>
            <p>
              Funkcija{" "}
              <InlineMath>{"\\frac{1}{x-2}"}</InlineMath> „puca" kad se{" "}
              <InlineMath>{"x"}</InlineMath> približi broju 2. Zato je{" "}
              <InlineMath>{"x=2"}</InlineMath> vertikalna asimptota.
            </p>
          </SectionCard>
          <SectionCard title="Primer: horizontalna asimptota">
            <MathBlock>
              {
                "\\lim_{x\\to\\infty}\\frac{2x+1}{x-2}=2 \\qquad\\Rightarrow\\qquad y=2"
              }
            </MathBlock>
            <p>
              Za racionalne funkcije istog stepena u brojocu i imeniocu,
              horizontalna asimptota je količnik vodećih koeficijenata.
            </p>
          </SectionCard>
          <SectionCard title={'Asimptota ne mora biti \u201Ezid\u201C'}>
            <MathBlock>
              {
                "\\text{asimptota opisuje približavanje, ne zabranu preseka}"
              }
            </MathBlock>
            <p>
              Grafik može preseći horizontalnu ili kosu asimptotu. Vertikalnu ne
              može, jer na toj pravoj funkcija uglavnom nije definisana.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brz test za racionalnu funkciju">
          <p>
            Ako tražiš horizontalnu asimptotu racionalne funkcije, prvo uporedi
            stepene brojioca i imenioca: manji stepen u brojocu daje limes 0,
            isti stepen daje odnos vodećih koeficijenata, a veći stepen znači da
            horizontalne asimptote nema. To je mali trik koji štedi vreme na
            prijemnom.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: koje asimptote ima funkcija f(x) = (3x-1)/(x+2)?"
          answer={
            <p>
              Vertikalna asimptota je <InlineMath>{"x=-2"}</InlineMath>, jer
              imenilac tada ide na nulu, a brojilac ne. Horizontalna asimptota
              je <InlineMath>{"y=3"}</InlineMath>, jer su stepeni brojioca i
              imenioca isti, pa limes za{" "}
              <InlineMath>{"x\\to\\infty"}</InlineMath> daje odnos vodećih
              koeficijenata{" "}
              <InlineMath>{"\\frac{3}{1}=3"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 6. INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivna laboratorija"
        title="Posmatraj kako se limes vidi, a ne samo računa"
        description={'Izaberi primer i menjaj opseg prikaza. Kod niza posmatraj kako se rep približava liniji limesa. Kod funkcije posmatraj da li se grafik približava istoj visini sa obe strane, da li postoji \u201Erupa\u201C ili se pojavljuje vertikalna asimptota.'}
      >
        <LimitLab />

        <InsightCard title="Kako da koristiš laboratoriju">
          <p>
            Nemoj samo gledati sliku. Za svaki primer pokušaj da verbalno
            izgovoriš šta vidiš: „tačke se smiruju", „graf ima rupu, ali
            prilazi istoj visini", „s leve i desne strane ponašanje nije isto",
            „za veliko x funkcija se lepi uz horizontalu". Kad umeš to da
            izgovoriš, limes je stvarno razumljen.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 7. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak, baš onako kako treba da razmišljaš na prijemnom"
        description="U primerima ispod nije važan samo konačan rezultat. Važno je kojim redom donosiš odluke."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Limes niza{" "}
              <InlineMath>
                {"\\frac{3n^2-2n+1}{n^2+4}"}
              </InlineMath>
            </h3>
            <p>
              Ovo je tipičan primer gde odlučuju članovi najvišeg stepena.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj dominantan stepen">
                <p>
                  U brojocu i imeniocu najveći stepen je{" "}
                  <InlineMath>{"n^2"}</InlineMath>. To odmah govori da je
                  tehnika deljenje sa <InlineMath>{"n^2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Podeli sve sa <InlineMath>{"n^2"}</InlineMath>
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\frac{3n^2-2n+1}{n^2+4} = \\frac{3-\\frac{2}{n}+\\frac{1}{n^2}}{1+\\frac{4}{n^2}}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Pusti <InlineMath>{"n"}</InlineMath> da ode u beskonačnost
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\lim_{n\\to\\infty}\\frac{3n^2-2n+1}{n^2+4} = \\frac{3-0+0}{1+0} = 3"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Tumačenje">
                <p>
                  Rep niza se približava broju 3. To ne znači da je neki član
                  tačno 3, nego da su članovi za veliko{" "}
                  <InlineMath>{"n"}</InlineMath> sve bliži tom broju.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Oblik <InlineMath>{"0/0"}</InlineMath> —{" "}
              <InlineMath>
                {"\\lim_{x\\to 3}\\frac{x^2-9}{x-3}"}
              </InlineMath>
            </h3>
            <p>
              Ovde je prvi potez ubacivanje{" "}
              <InlineMath>{"x=3"}</InlineMath>. Dobijaš{" "}
              <InlineMath>{"\\frac{0}{0}"}</InlineMath>, pa je jasno da treba
              razložiti brojilac.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uvrsti i klasifikuj">
                <MathBlock>
                  {"\\frac{3^2-9}{3-3}=\\frac{0}{0}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Faktoriši brojilac">
                <MathBlock>{"x^2-9 = (x-3)(x+3)"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Skrati zajednički faktor">
                <MathBlock>
                  {
                    "\\frac{(x-3)(x+3)}{x-3} = x+3 \\qquad (x \\neq 3)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Izračunaj limes očišćenog izraza">
                <MathBlock>{"\\lim_{x\\to 3}(x+3) = 6"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Racionalizacija —{" "}
              <InlineMath>
                {"\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}"}
              </InlineMath>
            </h3>
            <p>
              Ovde obična faktorizacija ne pomaže, jer u brojocu nema polinoma
              nego razlika korena i broja. Zato koristiš konjugovani izraz.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Proveri početni oblik">
                <MathBlock>
                  {"\\frac{\\sqrt{1+3}-2}{1-1}=\\frac{0}{0}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Množi konjugovanim izrazom">
                <MathBlock>
                  {
                    "\\frac{\\sqrt{x+3}-2}{x-1}\\cdot\\frac{\\sqrt{x+3}+2}{\\sqrt{x+3}+2} = \\frac{x+3-4}{(x-1)(\\sqrt{x+3}+2)}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Pojednostavi">
                <MathBlock>
                  {
                    "\\frac{x-1}{(x-1)(\\sqrt{x+3}+2)} = \\frac{1}{\\sqrt{x+3}+2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Izračunaj limes">
                <MathBlock>
                  {
                    "\\lim_{x\\to 1}\\frac{1}{\\sqrt{x+3}+2} = \\frac{1}{2+2} = \\frac{1}{4}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Asimptote funkcije{" "}
              <InlineMath>
                {"f(x)=\\frac{2x+1}{x-2}"}
              </InlineMath>
            </h3>
            <p>
              Ovo je odličan prijemni primer jer spaja lokalno ponašanje oko
              problematične tačke i ponašanje za veliko{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Traži vertikalnu asimptotu">
                <p>
                  Imenilac ide na nulu za{" "}
                  <InlineMath>{"x=2"}</InlineMath>, a{" "}
                  <InlineMath>{"2\\cdot 2+1=5\\neq 0"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Analiziraj limes blizu{" "}
                    <InlineMath>{"x=2"}</InlineMath>
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\lim_{x\\to 2^-}\\frac{2x+1}{x-2}=-\\infty, \\qquad \\lim_{x\\to 2^+}\\frac{2x+1}{x-2}=+\\infty"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Traži horizontalnu asimptotu">
                <MathBlock>
                  {
                    "\\lim_{x\\to\\infty}\\frac{2x+1}{x-2}=2"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zapiši rezultat">
                <p>
                  Funkcija ima vertikalnu asimptotu{" "}
                  <InlineMath>{"x=2"}</InlineMath> i horizontalnu asimptotu{" "}
                  <InlineMath>{"y=2"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule i pravila"
        title="Sažetak koji treba da ti bude u glavi pre svakog zadatka"
        description="Ovaj deo nije za slepo bubanje. Svaka formula ovde ima smisao samo ako razumeš sliku iza nje. Ali kada sliku već imaš, ove kartice su odlične za kratko ponavljanje pred test."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Oznaka limesa niza"
            formula={"\\lim_{n\\to\\infty} a_n = L"}
            note={'Čita se: \u201Eniz a\u2099 teži broju L kada n teži beskonačnosti\u201C.'}
          />
          <FormulaCard
            title="Oznaka limesa funkcije"
            formula={"\\lim_{x\\to a} f(x) = L"}
            note={'Čita se: \u201Ef(x) teži broju L kada x teži broju a\u201C.'}
          />
          <FormulaCard
            title="Račun sa limesima"
            formula={"\\lim(f \\pm g) = \\lim f \\pm \\lim g, \\qquad \\lim(fg) = (\\lim f)(\\lim g)"}
            note={'Ako limesi postoje, sabiranje, oduzimanje i množenje rade \u201Enormalno\u201C.'}
          />
          <FormulaCard
            title="Deljenje je dozvoljeno uz uslov"
            formula={"\\lim \\frac{f(x)}{g(x)} = \\frac{\\lim f(x)}{\\lim g(x)}, \\qquad \\lim g(x) \\neq 0"}
            note="Ovo pravilo često koristiš tek posle pojednostavljenja izraza."
          />
          <FormulaCard
            title="Brzi test na beskonačnosti"
            formula={"\\deg P < \\deg Q \\Rightarrow 0,\\quad \\deg P = \\deg Q \\Rightarrow \\frac{a_m}{b_m},\\quad \\deg P > \\deg Q \\Rightarrow \\text{nema HA}"}
            note="Kod racionalnih funkcija limes na beskonačnosti zavisi samo od poređenja stepena u brojocu i imeniocu."
          />
          <FormulaCard
            title="Kriterijumi za asimptote"
            formula={"x=a \\text{ vert. as.} \\Leftrightarrow \\lim_{x\\to a^\\pm} f(x)=\\pm\\infty \\qquad y=L \\text{ horiz. as.} \\Leftrightarrow \\lim_{x\\to\\pm\\infty} f(x)=L"}
            note="Ovi kriterijumi povezuju limes sa geometrijskom slikom grafa."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 9. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Mesta na kojima se lako gube laki poeni"
        description={'Većina grešaka u limesu nije \u201Eteška matematika\u201C, nego loš prvi potez. Ako prepoznaš sledeće zamke, smanjićeš broj grešaka gotovo odmah.'}
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Skraćivanje bez faktora</h3>
            <p>
              Iz izraza{" "}
              <InlineMath>{"\\frac{x^2-9}{x-3}"}</InlineMath> ne smeš
              „precrtati" trojku ili deo izraza. Moraš prvo napisati{" "}
              <InlineMath>{"x^2-9=(x-3)(x+3)"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Brkanje <InlineMath>{"f(a)"}</InlineMath> i{" "}
              <InlineMath>{"\\lim_{x\\to a}f(x)"}</InlineMath>
            </h3>
            <p>
              Funkcija može imati rupu u tački, a limes ipak postoji. Uvek
              odvoji ova dva pitanja: „da li je definisana?" i „kome prilazi?".
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pretpostavka da <InlineMath>{"\\infty/\\infty=1"}</InlineMath>
            </h3>
            <p>
              Ne. <InlineMath>{"\\infty/\\infty"}</InlineMath> nije broj. To je
              neodređeni oblik. Ponekad rezultat bude 0, ponekad 5, ponekad ne
              postoji. Odlučuju vodeći članovi.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljeni jednostrani limesi</h3>
            <p>
              Kod vertikalnih asimptota i apsolutne vrednosti često je presudno
              šta se dešava s leve, a šta s desne strane. Ne preskači taj korak.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Asimptota nije „zabranjena linija"
            </h3>
            <p>
              Horizontalna asimptota može se seći. Ona samo opisuje šta se
              dešava kada <InlineMath>{"x"}</InlineMath> ide ka beskonačnosti, ne
              šta se dešava svuda.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Račun bez tumačenja</h3>
            <p>
              Dobiti broj nije dovoljno. Zapitaj se: da li to znači konačan
              limes, nepostojanje limesa, rupu, horizontalnu ili vertikalnu
              asimptotu?
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 10. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da razmišljaš brzo i sigurno pod pritiskom vremena"
        description="Na prijemnom zadaci iz limesa retko traže teorijsko objašnjenje. Ali skoro uvek testiraju da li umeš da napraviš pravi prvi korak."
      >
        <div className={s.grid2}>
          <SectionCard title="Prvo uvrsti i obeleži oblik">
            <p>
              Na papiru kratko napiši: „običan broj",{" "}
              <InlineMath>{"0/0"}</InlineMath>,{" "}
              <InlineMath>{"\\infty/\\infty"}</InlineMath> ili „deljenje nulom".
              To ti odmah sužava izbor tehnike.
            </p>
          </SectionCard>
          <SectionCard title="Kod racionalnih funkcija na beskonačnosti gledaj stepene">
            <p>
              To je najbrži put do limesa i horizontalne asimptote. Ne rasipaj
              vreme na nepotrebno množenje ili razvijanje.
            </p>
          </SectionCard>
          <SectionCard title="Kod problematične tačke proveri da li je rupa ili asimptota">
            <p>
              Ako se isti faktor skrati, obično dobijaš rupu. Ako imenilac ide
              na nulu a brojilac ne, obično dobijaš vertikalnu asimptotu.
            </p>
          </SectionCard>
          <SectionCard title="Kod apsolutne vrednosti proveri obe strane">
            <p>
              Jedan sekund više za levi i desni limes može da spasi ceo zadatak
              od pogrešnog zaključka.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Mini strategija od 15 sekundi">
          <p>
            1. Uvrsti. 2. Nazovi oblik. 3. Izaberi tehniku. 4. Skrati račun.
            5. Protumači rezultat. Ako ovu rutinu uvežbaš, limes postaje jedna
            od zahvalnijih tema na prijemnom, jer veliki deo zadataka ima
            prepoznatljiv obrazac.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li zaista umeš, a ne samo da prepoznaješ rešenje"
        description="Pokušaj najpre samostalno. Rešenje otvaraj tek kada si bar pokušao da odlučiš koju tehniku treba primeniti."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Odredi limes niza{" "}
                <InlineMath>
                  {"\\displaystyle \\lim_{n\\to\\infty}\\frac{7n-4}{2n+1}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Podeli brojilac i imenilac sa <InlineMath>{"n"}</InlineMath>:
                </p>
                <MathBlock>
                  {
                    "\\frac{7n-4}{2n+1}=\\frac{7-\\frac{4}{n}}{2+\\frac{1}{n}}\\to\\frac{7}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Prepoznaj vodeće stepene i odredi{" "}
                <InlineMath>
                  {"\\displaystyle \\lim_{n\\to\\infty}\\frac{n^2-5}{3n^2+n}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Deli sa <InlineMath>{"n^2"}</InlineMath>:
                </p>
                <MathBlock>
                  {
                    "\\frac{n^2-5}{3n^2+n}=\\frac{1-\\frac{5}{n^2}}{3+\\frac{1}{n}}\\to\\frac{1}{3}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Odredi{" "}
                <InlineMath>
                  {"\\displaystyle \\lim_{x\\to 4}\\frac{x^2-16}{x-4}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Najpre dobijaš <InlineMath>{"0/0"}</InlineMath>. Faktoriši:
                </p>
                <MathBlock>{"x^2-16=(x-4)(x+4)"}</MathBlock>
                <p>
                  Nakon skraćivanja ostaje:
                </p>
                <MathBlock>{"\\lim_{x\\to 4}(x+4)=8"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi{" "}
                <InlineMath>
                  {
                    "\\displaystyle \\lim_{x\\to 0}\\frac{\\sqrt{1+x}-1}{x}"
                  }
                </InlineMath>
                . Koja tehnika je najprirodnija?
              </p>
            }
            solution={
              <>
                <p>
                  Dobijaš <InlineMath>{"0/0"}</InlineMath>, pa racionalizuješ:
                </p>
                <MathBlock>
                  {
                    "\\frac{\\sqrt{1+x}-1}{x}\\cdot\\frac{\\sqrt{1+x}+1}{\\sqrt{1+x}+1} = \\frac{x}{x(\\sqrt{1+x}+1)} = \\frac{1}{\\sqrt{1+x}+1}"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "\\lim_{x\\to 0}\\frac{\\sqrt{1+x}-1}{x}=\\frac{1}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Odredi asimptote funkcije{" "}
                <InlineMath>
                  {"\\displaystyle f(x)=\\frac{3x-1}{x+2}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Vertikalna asimptota je <InlineMath>{"x=-2"}</InlineMath>, jer
                se tada imenilac poništava, a brojilac ne. Horizontalna
                asimptota je <InlineMath>{"y=3"}</InlineMath>, jer je odnos
                vodećih koeficijenata{" "}
                <InlineMath>{"\\frac{3}{1}=3"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Da li niz{" "}
                <InlineMath>
                  {"\\displaystyle a_n=(-1)^n+\\frac{1}{n}"}
                </InlineMath>{" "}
                ima limes? Objasni kratko.
              </p>
            }
            solution={
              <p>
                Nema limes. Dodatak{" "}
                <InlineMath>{"\\frac{1}{n}"}</InlineMath> ide ka nuli, ali deo{" "}
                <InlineMath>{"(-1)^n"}</InlineMath> i dalje osciluje između{" "}
                <InlineMath>{"1"}</InlineMath> i{" "}
                <InlineMath>{"-1"}</InlineMath>. Zato se ceo niz ne približava
                jednom jedinom broju.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ 12. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta obavezno nosiš iz ove lekcije"
        description="Ako želiš da proceniš da li si stvarno savladao lekciju, proveri da li možeš samostalno da izgovoriš i primeniš sledeće ideje."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Limes niza</h3>
            <p>
              Limes niza prati ponašanje repa niza — šta se dešava sa{" "}
              <InlineMath>{"a_n"}</InlineMath> kada{" "}
              <InlineMath>{"n"}</InlineMath> postaje veoma veliko.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Limes funkcije</h3>
            <p>
              Limes funkcije prati ponašanje u okolini tačke. Limes nije isto
              što i vrednost funkcije u toj tački.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Oblik 0/0</h3>
            <p>
              Najčešće se rešava faktorizacijom brojioca ili imenioca, ili
              racionalizacijom ako postoji koren.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Oblik <InlineMath>{"\\infty/\\infty"}</InlineMath>
            </h3>
            <p>
              Najčešće se rešava deljenjem najvećim stepenom promenljive.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Asimptote</h3>
            <p>
              Vertikalne asimptote vidiš blizu problematične tačke,
              horizontalne za{" "}
              <InlineMath>{"x\\to\\pm\\infty"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Na prijemnom</h3>
            <p>
              Ključ je da prvo prepoznaš obrazac, pa tek onda da računaš. Sledeći
              logičan korak je kontinuitet i potom izvodi.
            </p>
          </article>
        </div>

        <InsightCard title="Završni uvid">
          <p>
            Limes je odgovor na pitanje: „Kuda ide?". Kada to pitanje naučiš da
            postavljaš prirodno, analiza prestaje da bude skup trikova i postaje
            priča sa jasnom logikom.
          </p>
        </InsightCard>

        <p className={cs.footerNote}>
          Lekcija 57 otvara temu analize: od limesa niza i funkcije, preko
          neodređenih oblika i asimptota, do temelja za kontinuitet i izvode.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
