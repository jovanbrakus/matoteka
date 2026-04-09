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
import TrigEquationLab from "./TrigEquationLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#ideja", label: "Mapa metoda" },
  { href: "#algoritam", label: "Homogene jednačine" },
  { href: "#obrasci", label: "Linearne i pomoćni ugao" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson40Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 40"
        title={
          <>
            Složenije{" "}
            <span className={cs.tHeroAccent}>trigonometrijske jednačine</span>
          </>
        }
        description="Na prijemnom složena trigonometrijska jednačina najčešće ne traži &quot;novu&quot; matematiku, već dobru procenu metode. Treba da vidiš da li je pred tobom homogeni obrazac koji vodi ka tan x, ili linearni oblik koji treba sabiti u jedan sinus pomoću ugla φ. Kada to prepoznaš, ostatak zadatka postaje pregledan."
        heroImageSrc="/images/lessons/lesson40_hero.png"
        heroImageAlt="Apstraktna matematička ilustracija sa trigonometrijskim talasom i formulama"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da odmah izabereš odgovarajući metod, svedeš jednačinu na bazni oblik i pravilno zapišeš sve porodice rešenja.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da podeliš jednačinu bez provere izgubljenih rešenja ili da zaboraviš da linearna jednačina mora zadovoljiti uslov |c| ≤ R.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brojanje i zbir korena na intervalu, uz brzo prepoznavanje da li je jednačina homogena ili linearna.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90-110 minuta uz teoriju, vođene primere, mikro-provere i završne zadatke.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 35-39: adicioni teoremi, transformacije, grafik funkcija i osnovne trigonometrijske jednačine.",
          },
          {
            label: "Glavna veština",
            description:
              "Da pravilno prevedeš složenu jednačinu na bazni oblik i da bez greške pređeš sa opšteg rešenja na interval.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija sa dva režima: homogena redukcija na tan x i linearna jednačina sa pomoćnim uglom.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde prepoznavanje obrasca postaje važnije od samog računa"
        description="U prethodnoj lekciji učio si kako se rešava bazni oblik kada ga već vidiš. Sada učiš ozbiljniju veštinu: kako da do tog baznog oblika stigneš bez gubitka rešenja. To je trenutak kada trigonometrija na prijemnom počinje da liči na stvaran problem, a ne samo na primenu gotove formule."
      >
        <div className={s.grid3}>
          <SectionCard title="Za dalje zadatke iz trigonometrije">
            <p>
              Mnogo složeniji identiteti i jednačine na kraju se svedu upravo na
              homogeni obrazac ili na pomoćni ugao. Ako ovde nisi siguran,
              kasnije ćeš znati teoriju, ali nećeš umeti da je primeniš.
            </p>
          </SectionCard>
          <SectionCard title="Za brojanje i zbir korena">
            <p>
              Na prijemnom je čest zahtev da odrediš koliko rešenja ima na
              intervalu <InlineMath>{"[0,2\\pi]"}</InlineMath>,{" "}
              <InlineMath>{"[-\\pi,\\pi]"}</InlineMath> ili koliki je zbir svih
              korena u tom opsegu. Bez opšteg rešenja takav zadatak nije
              bezbedno rešiv.
            </p>
          </SectionCard>
          <SectionCard title="Za sigurnost postupka">
            <p>
              Ova lekcija te tera da proveravaš šta smeš da deliš, kada rešenja
              ne postoje i kako se dobijene vrednosti za{" "}
              <InlineMath>{"t=\\tan x"}</InlineMath> vraćaju na stvarne uglove.
              Upravo tu učenici najčešće gube poene.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključna pedagoška ideja">
          <p>
            Složena trigonometrijska jednačina gotovo nikad nije potpuno nova.
            Tvoj posao je da u njoj prepoznaš poznatu strukturu i vratiš je na
            osnovnu jednačinu koju već umeš da rešiš.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ MAPA METODA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Mapa metoda"
        title="Kako da za deset sekundi odrediš kojim putem ideš"
        description="Najveći problem učenika nije manjak formula, nego pogrešan izbor metode. Zato prvo gradiš refleks: šta u jednačini treba da primetiš pre nego što kreneš da računaš."
      >
        <div className={s.grid2}>
          <SectionCard title="Kada je jednačina homogena">
            <ul>
              <li>
                Svi članovi imaju isti ukupan stepen u{" "}
                <InlineMath>{"\\sin x"}</InlineMath> i{" "}
                <InlineMath>{"\\cos x"}</InlineMath>.
              </li>
              <li>
                Tipičan oblik je{" "}
                <InlineMath>
                  {"A\\sin^2 x + B\\sin x\\cos x + C\\cos^2 x = 0"}
                </InlineMath>
                .
              </li>
              <li>
                Takva jednačina se najčešće deli sa{" "}
                <InlineMath>{"\\cos^2 x"}</InlineMath> ili{" "}
                <InlineMath>{"\\sin^2 x"}</InlineMath>, pa prelazi u jednačinu
                po <InlineMath>{"\\tan x"}</InlineMath> ili{" "}
                <InlineMath>{"\\cot x"}</InlineMath>.
              </li>
              <li>
                Pre deljenja uvek proveravaš da li se time gube posebna
                rešenja, na primer{" "}
                <InlineMath>{"\\cos x = 0"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Kada radi pomoćni ugao">
            <ul>
              <li>
                Pojavljuje se zbir prvog stepena:{" "}
                <InlineMath>{"a\\sin x + b\\cos x = c"}</InlineMath>.
              </li>
              <li>
                Takav izraz sabijaš u oblik{" "}
                <InlineMath>{"R\\sin(x+\\varphi)"}</InlineMath> ili{" "}
                <InlineMath>{"R\\cos(x-\\delta)"}</InlineMath>.
              </li>
              <li>
                Broj <InlineMath>{"R"}</InlineMath> meri amplitudu cele leve
                strane i odmah govori da li realna rešenja mogu da postoje.
              </li>
              <li>
                Posle transformacije više nema složene jednačine, već obična
                jednačina za sinus ili kosinus.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Pitanje 1"
            formula={"\\text{Da li svi članovi imaju isti stepen u } \\sin x \\text{ i } \\cos x?"}
            note="Ako je odgovor da, verovatno si u homogenom slučaju. To je signal da tražiš način da sve izraziš preko tan x ili cot x."
          />
          <FormulaCard
            title="Pitanje 2"
            formula={"\\text{Da li je leva strana oblika } a\\sin x+b\\cos x?"}
            note="Ako jeste, ne pokušavaj da pogađaš ugao. Računaj R i pomoćni ugao. To je najbrži i najčistiji put."
          />
          <FormulaCard
            title="Pitanje 3"
            formula={"\\text{Na koju baznu jednačinu ću završiti?}"}
            note="Kod homogene jednačine najčešće dolazi tan x = t₀. Kod pomoćnog ugla završavaš na sin(x+φ)=m ili cos(x-δ)=m."
          />
          <FormulaCard
            title="Pitanje 4"
            formula={"\\text{Gde mogu da izgubim rešenja?}"}
            note="Kod homogene jednačine to se dešava pri deljenju. Kod linearne jednačine to se dešava kada izračunaš R, ali zaboraviš da proveriš uslov |c| ≤ R."
          />
          <FormulaCard
            title="Radni redosled"
            formula={"\\text{prepoznaj tip} \\to \\text{svedi} \\to \\text{reši bazni oblik} \\to \\text{upiši interval}"}
            note="Ovaj redosled je važan zato što sprečava lutanje usred zadatka i drži sve korake pod kontrolom."
          />
          <FormulaCard
            title="Prijemni savet"
            formula={"\\text{Opšte rešenje dolazi pre brojanja i sabiranja korena}"}
            note="Najveća ispitna greška je da odmah ubacuješ interval i preskočiš opšti zapis. Tada lako previdiš jednu celu porodicu korena."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: da li je jednačina sin²x - cos²x = 0 homogena?"
          answer={
            <p>
              Jeste. Oba člana imaju ukupan stepen 2 u{" "}
              <InlineMath>{"\\sin x"}</InlineMath> i{" "}
              <InlineMath>{"\\cos x"}</InlineMath>, pa je to homogena jednačina
              drugog stepena. Možeš je rešiti i faktorisanjem i svođenjem preko{" "}
              <InlineMath>{"\\tan x"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ HOMOGENE JEDNAČINE ═══════════ */}
      <LessonSection
        id="algoritam"
        eyebrow="Homogene jednačine"
        title="Kada svi članovi imaju isti stepen, cilj je da ih svedeš na jednu funkciju"
        description="Najčešći model na prijemnom je homogena jednačina drugog stepena. Na papiru izgleda komplikovano, ali njena ideja je vrlo racionalna: čim svi članovi imaju isti stepen, deljenjem možeš da ukloniš višak trigonometrijskih funkcija i pretvoriš zadatak u algebarsku jednačinu."
      >
        <div className={s.grid2}>
          <SectionCard title="Zašto radi svođenje preko tan x">
            <p>U izrazu</p>
            <MathBlock>
              {"A\\sin^2 x + B\\sin x\\cos x + C\\cos^2 x = 0"}
            </MathBlock>
            <p>
              svaki član ima ukupno dva faktora sinus/kosinus. Kada podeliš sa{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath>, dobijaš
            </p>
            <MathBlock>{"A\\tan^2 x + B\\tan x + C = 0."}</MathBlock>
            <p>
              Tada trigonometrijski problem postaje obična kvadratna jednačina.
            </p>
          </SectionCard>
          <SectionCard title="Šta moraš da proveriš pre deljenja">
            <p>
              Ako deliš sa <InlineMath>{"\\cos^2 x"}</InlineMath>, moraš najpre
              da proveriš slučaj <InlineMath>{"\\cos x = 0"}</InlineMath>,
              odnosno
            </p>
            <MathBlock>{"x=\\frac{\\pi}{2}+k\\pi."}</MathBlock>
            <p>
              Ako originalna jednačina tada važi, ta porodica rešenja mora da se
              dopiše posebno.
            </p>
          </SectionCard>
        </div>

        <div className={s.walkthrough} style={{ marginTop: 18 }}>
          <WalkStep
            number={1}
            title="Proveri poseban slučaj koji bi deljenjem nestao"
          >
            <p>
              Ako deliš sa <InlineMath>{"\\cos^2 x"}</InlineMath>, proveravaš{" "}
              <InlineMath>{"\\cos x = 0"}</InlineMath>. Ako deliš sa{" "}
              <InlineMath>{"\\sin^2 x"}</InlineMath>, proveravaš{" "}
              <InlineMath>{"\\sin x = 0"}</InlineMath>. Ovo je korak koji čuva
              sva rešenja.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Podeli jednačinu pogodnom potencijom">
            <p>
              Kod drugog stepena najčešće deliš sa{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath>. Tada se dobijeni članovi
              prirodno izražavaju preko{" "}
              <InlineMath>{"\\tan x"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep
            number={3}
            title={
              <>
                Uvedi promenljivu <InlineMath>{"t=\\tan x"}</InlineMath>
              </>
            }
          >
            <p>
              Posle deljenja dobijaš algebarsku jednačinu u promenljivoj{" "}
              <InlineMath>{"t"}</InlineMath>. Tu koristiš faktorisanje,
              diskriminantu i sve što već znaš iz algebre.
            </p>
          </WalkStep>
          <WalkStep
            number={4}
            title={
              <>
                Vrati se sa <InlineMath>{"t"}</InlineMath> na ugao{" "}
                <InlineMath>{"x"}</InlineMath>
              </>
            }
          >
            <p>
              Kada dobiješ <InlineMath>{"t=t_0"}</InlineMath>, tek tada pišeš{" "}
              <InlineMath>{"\\tan x=t_0"}</InlineMath>, pa sledi{" "}
              <InlineMath>{"x=\\arctan(t_0)+k\\pi"}</InlineMath>. Ne smeš stati
              na promenljivoj <InlineMath>{"t"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Spoji sve porodice rešenja">
            <p>
              Na kraju sabiraš ono što si dobio preko{" "}
              <InlineMath>{"\\tan x"}</InlineMath> i eventualna posebna rešenja
              poput{" "}
              <InlineMath>{"x=\\frac{\\pi}{2}+k\\pi"}</InlineMath>. Tek tada
              odgovor je potpun.
            </p>
          </WalkStep>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Ne staj na promenljivoj t">
            <p>
              Jednačina po <InlineMath>{"t"}</InlineMath> je samo srednja
              stanica. Konačan odgovor uvek mora biti zapisan kroz uglove{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Prirodna perioda je π">
            <p>
              Kada rešenje dolazi iz tangensa, opšte rešenje ima oblik{" "}
              <InlineMath>{"x=\\alpha+k\\pi"}</InlineMath>, jer tangens ponavlja
              vrednosti na pola kruga.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto homogena jednačina često daje periodu kπ?"
          answer={
            <p>
              Zato što se posle deljenja homogena jednačina najčešće svodi na
              oblik <InlineMath>{"\\tan x = t_0"}</InlineMath>. A tangens ima
              periodu <InlineMath>{"\\pi"}</InlineMath>, pa svaka vrednost{" "}
              <InlineMath>{"t_0"}</InlineMath> daje porodicu{" "}
              <InlineMath>{"x=\\arctan(t_0)+k\\pi"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ LINEARNE I POMOĆNI UGAO ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Linearne jednačine i pomoćni ugao"
        title="Jedan zbir sinusa i kosinusa možeš da pretvoriš u jedan pomeren talas"
        description='Ovo je metod koji učenicima često izgleda kao trik, ali zapravo ima vrlo jasan smisao: dva izraza iste periode sabijaju se u jedan sinus ili kosinus iste periode. Time složena jednačina prestaje da bude složena.'
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija pomoćnog ugla">
            <p>
              Izraz <InlineMath>{"a\\sin x+b\\cos x"}</InlineMath> opet je
              oscilacija. Zato mora imati neku amplitudu{" "}
              <InlineMath>{"R"}</InlineMath> i neki fazni pomeraj{" "}
              <InlineMath>{"\\varphi"}</InlineMath>, pa možeš da ga napišeš kao
            </p>
            <MathBlock>{"R\\sin(x+\\varphi)."}</MathBlock>
            <p>
              Kada to uradiš, sva složenost zadatka nestaje i ostaje osnovna
              jednačina za sinus.
            </p>
          </SectionCard>
          <SectionCard title="Formalni račun">
            <p>
              Biraš <InlineMath>{"R"}</InlineMath> i{" "}
              <InlineMath>{"\\varphi"}</InlineMath> tako da važi
            </p>
            <MathBlock>
              {"a=R\\cos\\varphi,\\qquad b=R\\sin\\varphi."}
            </MathBlock>
            <p>Tada je</p>
            <MathBlock>
              {
                "R\\sin(x+\\varphi)=R\\sin x\\cos\\varphi+R\\cos x\\sin\\varphi=a\\sin x+b\\cos x."
              }
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Amplituda"
            formula={"R=\\sqrt{a^2+b^2}"}
            note={
              <>
                Broj <InlineMath>{"R"}</InlineMath> je najveća moguća apsolutna
                vrednost cele leve strane. Zato već pre rešavanja znaš da je
                potreban uslov <InlineMath>{"|c| \\le R"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Pomoćni ugao"
            formula={"\\cos\\varphi=\\frac{a}{R},\\qquad \\sin\\varphi=\\frac{b}{R}"}
            note={
              <>
                Ugao <InlineMath>{"\\varphi"}</InlineMath> nije slučajan dodatak,
                nego precizno biraš njegov sinus i kosinus da bi se koeficijenti{" "}
                <InlineMath>{"a"}</InlineMath> i <InlineMath>{"b"}</InlineMath>{" "}
                pravilno pojavili.
              </>
            }
          />
          <FormulaCard
            title="Glavna transformacija"
            formula={"a\\sin x+b\\cos x=c \\Longleftrightarrow R\\sin(x+\\varphi)=c"}
            note="Posle ove zamene više nema nikakve misterije: rešavaš baznu jednačinu potpuno isto kao u prethodnoj lekciji."
          />
          <FormulaCard
            title="Uslov postojanja rešenja"
            formula={"|c|\\le R"}
            note="Ako je desna strana veća od amplitude, jednačina nema realna rešenja. Ovaj uslov često daje najbržu proveru na testu."
          />
          <FormulaCard
            title="Kada dobijaš jednu porodicu"
            formula={"\\sin(x+\\varphi)=1 \\quad \\text{ili} \\quad \\sin(x+\\varphi)=-1"}
            note="Tada u jednom punom krugu nema dve različite grane, već samo jedna porodica rešenja sa periodom 2π."
          />
          <FormulaCard
            title="Kako radi zadatak sa intervalom"
            formula={"\\text{opšte rešenje} \\Rightarrow \\text{vrednosti }k \\Rightarrow \\text{lista korena}"}
            note='Ovaj redosled važi i za homogene i za linearne jednačine. Ne preskači ga čak ni kada ti se čini da vidiš rešenja "iz glave".'
          />
        </div>

        <InsightCard title="Brzo pravilo za pamćenje">
          <p>
            Homogena jednačina te obično vodi ka tangensu, pa zato često
            završavaš sa{" "}
            <InlineMath>{"k\\pi"}</InlineMath>. Pomoćni ugao te vraća na sinus
            ili kosinus, pa koristiš pravila iz osnovnih trigonometrijskih
            jednačina.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Laboratorija za homogenu redukciju i pomoćni ugao"
        description="Izaberi režim rada, menjaj koeficijente i prati šta se dešava. Gornji panel prikazuje graf originalne leve strane, a donji pokazuje gde tačno padaju rešenja na intervalu. Cilj laboratorije je da ti poveže račun sa slikom: homogena jednačina se svodi na tan x, a linearna na talas R sin(x+φ)."
      >
        <TrigEquationLab />

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da učiš uz laboratoriju">
            <p>
              Najpre uzmi jedan od ponuđenih primera i pokušaj da predvidiš ishod
              pre nego što pogledaš izlazne kartice. Zatim promeni samo jedan
              koeficijent i proveri da li razumeš šta se promenilo: diskriminanta,
              amplituda ili broj rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Šta treba da primetiš">
            <p>
              U homogenom režimu nula funkcije znači koren jednačine, a u
              linearnom režimu presek sa horizontalom{" "}
              <InlineMath>{"y=c"}</InlineMath> znači rešenje. Na taj način vidiš
              zašto jednačine iste formule ponekad imaju 0, 1, 2 ili više korena
              na istom intervalu.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri su raspoređeni tako da prvo naučiš metod, pa tek onda ispitne varijacije"
        description="U svakom primeru prati tri nivoa razmišljanja: kako prepoznaješ tip jednačine, na šta je svodiš i kako od opšteg rešenja prelaziš na konkretan interval. Taj trokorak je suština cele lekcije."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: reši homogenu jednačinu{" "}
              <InlineMath>
                {"2\\sin^2 x-3\\sin x\\cos x+\\cos^2 x=0"}
              </InlineMath>
            </h3>
            <p>
              Ovo je model koji treba prvi da prepoznaš: svi članovi imaju isti
              ukupan stepen, pa se jednačina prirodno svodi na{" "}
              <InlineMath>{"\\tan x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Proveri da li{" "}
                    <InlineMath>{"\\cos x=0"}</InlineMath> daje rešenje
                  </>
                }
              >
                <p>
                  Tada leva strana postaje{" "}
                  <InlineMath>{"2"}</InlineMath>, pa taj slučaj nije rešenje.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Podeli sa{" "}
                    <InlineMath>{"\\cos^2 x"}</InlineMath>
                  </>
                }
              >
                <MathBlock>
                  {"2\\tan^2 x-3\\tan x+1=0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Faktorisanje">
                <MathBlock>
                  {"(2\\tan x-1)(\\tan x-1)=0"}
                </MathBlock>
                <p>
                  Dobijaš{" "}
                  <InlineMath>{"\\tan x=\\frac{1}{2}"}</InlineMath> ili{" "}
                  <InlineMath>{"\\tan x=1"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <MathBlock>
                {
                  "x=\\arctan\\frac{1}{2}+k\\pi \\quad \\text{ili} \\quad x=\\frac{\\pi}{4}+k\\pi,\\qquad k\\in\\mathbb{Z}"
                }
              </MathBlock>
              <p>
                Pošto je jednačina svedena na tangens, perioda je{" "}
                <InlineMath>{"k\\pi"}</InlineMath>. Klasična greška je da
                učenik napiše samo <InlineMath>{"\\tan x=\\frac{1}{2}"}</InlineMath>{" "}
                i <InlineMath>{"\\tan x=1"}</InlineMath>, a zaboravi da se
                vrati na ugao <InlineMath>{"x"}</InlineMath>.
              </p>
            </InsightCard>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: reši jednačinu{" "}
              <InlineMath>
                {"\\sin x\\cos x-\\cos^2 x=0"}
              </InlineMath>
            </h3>
            <p>
              Ovaj primer je pedagoški važan jer pokazuje kako deljenje može da
              izgubi rešenja ako ne proveriš poseban slučaj.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Faktorisanje">
                <MathBlock>
                  {
                    "\\sin x\\cos x-\\cos^2 x=\\cos x(\\sin x-\\cos x)=0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Iz <InlineMath>{"\\cos x=0"}</InlineMath>
                  </>
                }
              >
                <MathBlock>
                  {"x=\\frac{\\pi}{2}+k\\pi"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Iz <InlineMath>{"\\sin x-\\cos x=0"}</InlineMath>
                  </>
                }
              >
                <p>
                  Sledi <InlineMath>{"\\tan x=1"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {"x=\\frac{\\pi}{4}+k\\pi"}
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <MathBlock>
                {
                  "x=\\frac{\\pi}{2}+k\\pi \\quad \\text{ili} \\quad x=\\frac{\\pi}{4}+k\\pi,\\qquad k\\in\\mathbb{Z}"
                }
              </MathBlock>
              <p>
                Da si odmah podelio sa{" "}
                <InlineMath>{"\\cos^2 x"}</InlineMath>, dobio bi samo{" "}
                <InlineMath>{"\\tan x-1=0"}</InlineMath> i izgubio celu
                porodicu{" "}
                <InlineMath>
                  {"x=\\frac{\\pi}{2}+k\\pi"}
                </InlineMath>
                .
              </p>
            </InsightCard>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: reši linearnu jednačinu{" "}
              <InlineMath>{"\\sin x+\\cos x=1"}</InlineMath>
            </h3>
            <p>
              Ovo je najbolji prvi primer za pomoćni ugao, jer sve ostaje potpuno
              egzaktno i pregledno.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Amplituda">
                <MathBlock>{"R=\\sqrt{1^2+1^2}=\\sqrt{2}."}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Pomoćni ugao">
                <p>
                  Uzimaš{" "}
                  <InlineMath>{"\\varphi=\\frac{\\pi}{4}"}</InlineMath>, jer su
                </p>
                <MathBlock>
                  {
                    "\\cos\\varphi=\\sin\\varphi=\\frac{\\sqrt{2}}{2}."
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Transformacija">
                <MathBlock>
                  {
                    "\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)"
                  }
                </MathBlock>
                <p>Jednačina postaje</p>
                <MathBlock>
                  {
                    "\\sin\\left(x+\\frac{\\pi}{4}\\right)=\\frac{\\sqrt{2}}{2}."
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <MathBlock>
                {
                  "x+\\frac{\\pi}{4}=\\frac{\\pi}{4}+2k\\pi \\quad \\text{ili} \\quad x+\\frac{\\pi}{4}=\\frac{3\\pi}{4}+2k\\pi"
                }
              </MathBlock>
              <p>pa sledi</p>
              <MathBlock>
                {
                  "x=2k\\pi \\quad \\text{ili} \\quad x=\\frac{\\pi}{2}+2k\\pi,\\qquad k\\in\\mathbb{Z}."
                }
              </MathBlock>
            </InsightCard>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: reši jednačinu{" "}
              <InlineMath>{"3\\sin x+4\\cos x=5"}</InlineMath>
            </h3>
            <p>
              Ovaj primer pokazuje specijalan slučaj{" "}
              <InlineMath>{"|c|=R"}</InlineMath>, kada u jednom ciklusu dobijaš
              samo jednu porodicu rešenja.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Amplituda">
                <MathBlock>{"R=\\sqrt{3^2+4^2}=5."}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Pomoćni ugao">
                <MathBlock>
                  {"\\cos\\varphi=\\frac{3}{5},\\qquad \\sin\\varphi=\\frac{4}{5}."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Transformacija">
                <MathBlock>
                  {"3\\sin x+4\\cos x=5\\sin(x+\\varphi)"}
                </MathBlock>
                <p>pa jednačina prelazi u</p>
                <MathBlock>{"\\sin(x+\\varphi)=1."}</MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <MathBlock>
                {
                  "x+\\varphi=\\frac{\\pi}{2}+2k\\pi \\quad \\Rightarrow \\quad x=\\frac{\\pi}{2}-\\varphi+2k\\pi=\\arctan\\frac{3}{4}+2k\\pi,\\quad k\\in\\mathbb{Z}."
                }
              </MathBlock>
              <p>
                U jednom punom krugu postoji samo jedno rešenje, jer je desna
                strana dostigla amplitudu.
              </p>
            </InsightCard>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: nađi zbir korena jednačine{" "}
              <InlineMath>
                {"\\sin x+\\sqrt{3}\\cos x=\\sqrt{2}"}
              </InlineMath>{" "}
              na intervalu <InlineMath>{"[0,2\\pi]"}</InlineMath>
            </h3>
            <p>
              Ovo je tipičan ispitni model: nije dovoljno rešiti jednačinu, nego
              moraš precizno izdvojiti konkretne korene i sabrati ih.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Amplituda">
                <MathBlock>{"R=\\sqrt{1+3}=2."}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Transformacija">
                <p>
                  Pošto su{" "}
                  <InlineMath>
                    {"\\cos\\frac{\\pi}{3}=\\frac{1}{2}"}
                  </InlineMath>
                  ,{" "}
                  <InlineMath>
                    {"\\sin\\frac{\\pi}{3}=\\frac{\\sqrt{3}}{2}"}
                  </InlineMath>
                  , dobijaš
                </p>
                <MathBlock>
                  {
                    "\\sin x+\\sqrt{3}\\cos x = 2\\sin\\left(x+\\frac{\\pi}{3}\\right)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Bazna jednačina">
                <MathBlock>
                  {
                    "\\sin\\left(x+\\frac{\\pi}{3}\\right)=\\frac{\\sqrt{2}}{2}"
                  }
                </MathBlock>
                <p>Otuda</p>
                <MathBlock>
                  {
                    "x+\\frac{\\pi}{3}=\\frac{\\pi}{4}+2k\\pi \\quad \\text{ili} \\quad x+\\frac{\\pi}{3}=\\frac{3\\pi}{4}+2k\\pi"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Zaključak">
              <p>Opšte rešenje:</p>
              <MathBlock>
                {
                  "x=-\\frac{\\pi}{12}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{5\\pi}{12}+2k\\pi"
                }
              </MathBlock>
              <p>
                Na intervalu <InlineMath>{"[0,2\\pi]"}</InlineMath> upadaju
                koreni
              </p>
              <MathBlock>
                {
                  "x_1=\\frac{5\\pi}{12},\\qquad x_2=\\frac{23\\pi}{12}"
                }
              </MathBlock>
              <p>pa je njihov zbir</p>
              <MathBlock>
                {
                  "x_1+x_2=\\frac{28\\pi}{12}=\\frac{7\\pi}{3}."
                }
              </MathBlock>
            </InsightCard>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde studenti najčešće gube poene"
        description='U ovoj lekciji greške ne dolaze od teškog računa, već od loše kontrole postupka. To su upravo one greške koje "bole" na prijemnom: rešenje ti deluje logično, a ipak je nepotpuno.'
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Deljenje bez provere posebnog slučaja
            </h3>
            <p>
              Kod homogene jednačine učenik podeli sa{" "}
              <InlineMath>{"\\cos x"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath>, a da prethodno ne proveri{" "}
              <InlineMath>{"\\cos x = 0"}</InlineMath>. Time može da izgubi
              celu porodicu rešenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaustavljanje na promenljivoj <InlineMath>{"t"}</InlineMath>
            </h3>
            <p>
              Posle jednačine po <InlineMath>{"\\tan x"}</InlineMath> napiše se
              samo <InlineMath>{"t_1"}</InlineMath> i{" "}
              <InlineMath>{"t_2"}</InlineMath>, ali se zaboravi prelaz na uglove{" "}
              <InlineMath>{"x=\\arctan(t)+k\\pi"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno određen pomoćni ugao
            </h3>
            <p>
              Izračuna se <InlineMath>{"R"}</InlineMath>, ali se pogrešno
              postavi znak ispred{" "}
              <InlineMath>{"\\sin\\varphi"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos\\varphi"}</InlineMath>, pa transformacija više
              nije ekvivalentna početnoj jednačini.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen uslov <InlineMath>{"|c| \\le R"}</InlineMath>
            </h3>
            <p>
              U linearnim jednačinama učenik lepo svede izraz na{" "}
              <InlineMath>{"R\\sin(x+\\varphi)"}</InlineMath>, ali uopšte ne
              proveri da li desna strana po apsolutnoj vrednosti prelazi
              amplitudu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Loše brojanje na intervalu</h3>
            <p>
              Opšte rešenje je tačno, ali se pri ubacivanju vrednosti za{" "}
              <InlineMath>{"k"}</InlineMath> previdi krajnja tačka intervala ili
              se isti koren prebroji dva puta.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Preskakanje opšteg rešenja
            </h3>
            <p>
              U zadatku sa intervalom ili zbirom korena student pokušava odmah da
              nagađa tačne vrednosti. To je nepouzdano i često dovodi do
              promašenog jednog ciklusa.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno pojavljuje na testu"
        description="Na prijemnom ove jednačine retko dolaze kao čista teorija. Gotovo uvek su upakovane tako da prvo moraš da otkriješ obrazac, a tek onda da računaš."
      >
        <div className={s.grid2}>
          <SectionCard title="Prepoznavanje homogeno/linearno">
            <p>
              Prva zamka je da prepoznaš da li jednačina treba da ide na{" "}
              <InlineMath>{"\\tan x"}</InlineMath> ili na pomoćni ugao. To je
              često važnije od samog kasnijeg računa.
            </p>
          </SectionCard>
          <SectionCard title="Brojanje korena u intervalu">
            <p>
              Vrlo često se ne traži samo rešenje, već broj korena u intervalu.
              To proverava da li zaista razumeš porodice rešenja, a ne samo
              jedan reprezentativni ugao.
            </p>
          </SectionCard>
          <SectionCard title="Zbir svih rešenja">
            <p>
              Ovo je omiljeni motiv: izdvojiš konkretne uglove iz opšteg
              rešenja, poređaš ih i sabereš. Greška se najčešće desi u samom
              izboru dozvoljenih vrednosti za <InlineMath>{"k"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Brze provere koje štede vreme">
            <p>
              U linearnom slučaju odmah proveravaš{" "}
              <InlineMath>{"|c| \\le R"}</InlineMath>. U homogenom slučaju odmah
              proveravaš da li deljenje smeš da uradiš bez gubitka posebnih
              rešenja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Mini-checklista za ispit">
          <p>
            1. Koji tip jednačine imam? 2. Da li deljenjem mogu da izgubim
            rešenja ili da li važi{" "}
            <InlineMath>{"|c| \\le R"}</InlineMath>? 3. Koje je opšte rešenje?
            4. Koje konkretne vrednosti ulaze u zadati interval?
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Vežbaj dok izbor metode ne postane automatski"
        description="Najpre sam odredi da li je zadatak homogeni ili linearni. Tek posle toga otvaraj rešenje. Cilj nije da pogodiš formulu, nego da naučiš tok razmišljanja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Reši homogenu jednačinu{" "}
                <InlineMath>
                  {"3\\sin^2 x+\\sin x\\cos x-2\\cos^2 x=0"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Pošto <InlineMath>{"\\cos x=0"}</InlineMath> ne daje
                  rešenje, deliš sa{" "}
                  <InlineMath>{"\\cos^2 x"}</InlineMath>:
                </p>
                <MathBlock>{"3\\tan^2 x+\\tan x-2=0."}</MathBlock>
                <p>
                  Faktorisanje daje{" "}
                  <InlineMath>
                    {"(3\\tan x-2)(\\tan x+1)=0"}
                  </InlineMath>
                  , pa sledi
                </p>
                <MathBlock>
                  {
                    "x=\\arctan\\frac{2}{3}+k\\pi \\quad \\text{ili} \\quad x=-\\frac{\\pi}{4}+k\\pi,\\qquad k\\in\\mathbb{Z}."
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
                <InlineMath>{"2\\sin x+2\\cos x=\\sqrt{2}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"R=\\sqrt{4+4}=2\\sqrt{2}"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {
                    "2\\sin x+2\\cos x = 2\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)."
                  }
                </MathBlock>
                <p>Dobijaš</p>
                <MathBlock>
                  {"\\sin\\left(x+\\frac{\\pi}{4}\\right)=\\frac{1}{2}"}
                </MathBlock>
                <p>pa je</p>
                <MathBlock>
                  {
                    "x=\\frac{\\pi}{12}+2k\\pi \\quad \\text{ili} \\quad x=\\frac{7\\pi}{12}+2k\\pi,\\qquad k\\in\\mathbb{Z}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Odredi da li jednačina{" "}
                <InlineMath>{"5\\sin x-12\\cos x=14"}</InlineMath> ima realna
                rešenja.
              </p>
            }
            solution={
              <>
                <p>Amplituda leve strane je</p>
                <MathBlock>
                  {"R=\\sqrt{5^2+(-12)^2}=13."}
                </MathBlock>
                <p>
                  Pošto je <InlineMath>{"|14| > 13"}</InlineMath>, jednačina
                  nema realna rešenja.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Koliko rešenja ima jednačina{" "}
                <InlineMath>{"\\sin x-\\cos x=0"}</InlineMath> na intervalu{" "}
                <InlineMath>{"[0,2\\pi]"}</InlineMath>?
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>
                    {
                      "\\sin x-\\cos x=\\sqrt{2}\\sin\\left(x-\\frac{\\pi}{4}\\right)"
                    }
                  </InlineMath>
                  , pa dobijaš
                </p>
                <MathBlock>
                  {
                    "\\sin\\left(x-\\frac{\\pi}{4}\\right)=0 \\Rightarrow x=\\frac{\\pi}{4}+k\\pi."
                  }
                </MathBlock>
                <p>
                  Na intervalu <InlineMath>{"[0,2\\pi]"}</InlineMath> to su{" "}
                  <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{5\\pi}{4}"}</InlineMath>, pa postoje 2
                  rešenja.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Reši jednačinu{" "}
                <InlineMath>{"\\sin x\\cos x=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Faktorski oblik je već očigledan:</p>
                <MathBlock>
                  {
                    "\\sin x\\cos x=0 \\Rightarrow \\sin x=0 \\quad \\text{ili} \\quad \\cos x=0."
                  }
                </MathBlock>
                <p>Zato je</p>
                <MathBlock>
                  {
                    "x=k\\pi \\quad \\text{ili} \\quad x=\\frac{\\pi}{2}+k\\pi,\\qquad k\\in\\mathbb{Z}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Nađi zbir svih rešenja jednačine{" "}
                <InlineMath>{"\\sin x+\\cos x=1"}</InlineMath> na intervalu{" "}
                <InlineMath>{"[0,2\\pi)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Iz vođenog primera znaš da je opšte rešenje</p>
                <MathBlock>
                  {
                    "x=2k\\pi \\quad \\text{ili} \\quad x=\\frac{\\pi}{2}+2k\\pi."
                  }
                </MathBlock>
                <p>
                  Na intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath> ulaze{" "}
                  <InlineMath>{"0"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath>, pa je zbir
                </p>
                <MathBlock>{"\\frac{\\pi}{2}."}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako sledeće četiri ideje postanu automatske, lekcija je zaista sela i moći ćeš sigurnije da rešavaš prijemne zadatke iz trigonometrije."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              1. Prvo prepoznaj tip jednačine
            </h3>
            <p>
              Homogena jednačina i linearna jednačina ne traže isti metod. Pola
              uspeha je u brzom prepoznavanju obrasca.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Kod homogene jednačine čuvaj sva rešenja
            </h3>
            <p>
              Pre deljenja proveravaš poseban slučaj, a posle kvadratne jednačine
              po <InlineMath>{"\\tan x"}</InlineMath> obavezno se vraćaš sa{" "}
              <InlineMath>{"t"}</InlineMath> na ugao{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Kod linearnog oblika misli na amplitudu{" "}
              <InlineMath>{"R"}</InlineMath>
            </h3>
            <p>
              Broj <InlineMath>{"R=\\sqrt{a^2+b^2}"}</InlineMath> odmah govori
              da li rešenja postoje, a pomoćni ugao pretvara komplikovan zbir u
              osnovnu jednačinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Interval dolazi tek posle opšteg rešenja
            </h3>
            <p>
              Kada je zadat interval ili zbir korena, prvo pišeš opšti oblik, pa
              tek onda biraš konkretne vrednosti za{" "}
              <InlineMath>{"k"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Ključna poruka"
        description="Složena trigonometrijska jednačina ne pobeđuje se novom formulom, nego dobrim izborom jezika."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kada jednačinu prevedeš na jezik tangensa ili na jedan pomeren sinus,
            zadatak prestaje da bude zamršen i vraća se na ono što već znaš.
          </p>
          <p className={cs.footerNote}>
            Sledeći logičan korak su trigonometrijske nejednačine, gde će isti
            obrasci opet biti važni, ali ćeš sada umesto pojedinačnih korena
            pratiti čitave intervale.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}
