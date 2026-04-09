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
import DerivativeLab from "./DerivativeLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#ideja", label: "Ideja izvoda" },
  { href: "#tablica", label: "Tablica izvoda" },
  { href: "#pravila", label: "Pravila" },
  { href: "#lab", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson58Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 58"
        title={
          <>
            Diferencijalni račun{" "}
            <span className={cs.tHeroAccent}>
              Tablica izvoda i pravila diferenciranja
            </span>
          </>
        }
        description="Ova lekcija je mesto gde izvod prestaje da bude apstraktna definicija i postaje alat koji moraš da koristiš brzo, tačno i bez panike. Za prijemni nije dovoljno da znaš šta je izvod; moraš da prepoznaš oblik funkcije i da bez greške aktiviraš pravo pravilo."
        heroImageSrc="/api/lessons/58/hero"
        heroImageAlt="Ilustracija za lekciju o diferencijalnom računu: graf funkcije sa tangentom i tablica izvoda"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Da sigurno diferenciraš polinomske, racionalne, korenske, trigonometrijske, eksponencijalne i logaritamske funkcije, kao i njihove kombinacije.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da vidiš samo spoljašnji oblik funkcije, a zaboraviš unutrašnju funkciju. Upravo tu učenici najčešće izgube poene zbog izostavljenog faktora.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Najpre prepoznaj strukturu: zbir, proizvod, količnik ili složena funkcija. Tek tada piši izvod. Redosled razmišljanja je važniji od brzine ruke.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "55 do 75 minuta za pažljiv prolazak, plus dodatnih 20 minuta za samostalno rešavanje vežbi.",
          },
          {
            label: "Predznanje",
            description:
              "Limes funkcije, osnovne elementarne funkcije, algebra izraza i sigurno rukovanje stepenima, korenima i razlomcima.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznavanje strukture funkcije i precizna primena tablice izvoda i pravila diferenciranja bez preskakanja faktora.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija: biraš funkciju i tačku, posmatraš tangentu i odmah vidiš koje pravilo diferenciranja stoji iza tog primera.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Izvod je osovina cele matematičke analize"
        description="Na prijemnom se izvod retko pojavljuje samo kao izolovana tehnika. U većini zadataka on je prvi korak ka nečemu većem: ispitivanju rasta i opadanja funkcije, nalaženju minimuma i maksimuma, pisanju jednačine tangente ili rešavanju optimizacionog problema."
      >
        <div className={s.grid2}>
          <SectionCard title="Zašto učenici ovde zapinju">
            <p>
              Zato što pokušavaju da pamte formule kao nepovezanu listu. To
              kratko traje. Mnogo sigurniji pristup je sledeći: svaku funkciju
              posmatraj kao konstrukciju. Pitaj se da li je to zbir, proizvod,
              količnik ili funkcija unutar funkcije. Tek onda piši izvod.
            </p>
            <ul>
              <li>Tablica izvoda daje ti osnovne cigle.</li>
              <li>
                Pravila diferenciranja govore kako se te cigle kombinuju.
              </li>
              <li>
                Lančano pravilo ti spašava sve zadatke sa složenom funkcijom.
              </li>
              <li>
                Domena ne sme da se zaboravi, posebno kod korena i logaritma.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Gde se tema odmah koristi">
            <p>
              Već u sledećoj lekciji izvod postaje radni alat za monotonost,
              ekstreme i tangente. Ako ovde automatizuješ diferenciranje,
              kasnije možeš da se baviš idejom zadatka. Ako ovde trošiš svu
              energiju, nećeš imati prostora za ostatak rešenja.
            </p>
            <ul>
              <li>Ekstremne vrednosti traže tačan prvi izvod.</li>
              <li>
                Tangenta i normala traže vrednost izvoda u konkretnoj tački.
              </li>
              <li>
                Optimizacija u geometriji počinje dobrim modelovanjem i
                završava dobrim diferenciranjem.
              </li>
              <li>
                Na tehničkim prijemnim brzina je važna, ali samo kada je
                tačnost stabilna.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da učenik razmišlja">
            <p>
              Nemoj sebi govoriti: &ldquo;Moram da znam formulu.&rdquo; Reci
              sebi: &ldquo;Moram da prepoznam od čega je funkcija
              sastavljena.&rdquo; To je mentalni zaokret koji diferenciranje
              čini stabilnim.
            </p>
          </SectionCard>
          <SectionCard title="Važna napomena">
            <p>
              Funkcija može biti definisana u nekoj tački, a da u toj tački
              nema izvod. Kod korena, apsolutne vrednosti ili komadno zadanih
              funkcija uvek gledaj i domen i oblik grafa.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ IDEJA IZVODA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Ideja"
        title="Šta izvod zapravo meri"
        description="Pre nego što zapamtiš formule, važno je da razumeš značenje. Kada kažemo da je izvod funkcije u tački jednak broju 5, to znači da funkcija u vrlo maloj okolini te tačke raste približno pet jedinica po jednoj jedinici promene argumenta."
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija">
            <p>
              Izvod u tački meri <em>lokalnu brzinu promene</em>. Ako
              posmatraš graf funkcije, izvod je nagib tangente u toj tački.
              Pozitivan izvod znači da funkcija raste, negativan da opada, a
              nulti izvod često signalizira mogući ekstrem ili horizontalnu
              tangentu.
            </p>
            <MathBlock>
              {"f'(x_0)=\\lim_{h\\to 0}\\frac{f(x_0+h)-f(x_0)}{h}"}
            </MathBlock>
            <p>
              Ova formula dolazi iz limesa količnika prirastaja. Na prijemnom
              se izvod uglavnom neće tražiti preko definicije, ali je korisno
              da znaš odakle dolazi jer tada razumeš zašto izvod &ldquo;gleda&rdquo;
              ponašanje funkcije u beskrajno maloj okolini tačke.
            </p>
          </SectionCard>

          <div>
            <div className={s.grid3}>
              <SectionCard title="Nagib tangente">
                <p>
                  Ako je{" "}
                  <InlineMath>{"f'(x_0)=3"}</InlineMath>, tangenta u tački{" "}
                  <InlineMath>{"x_0"}</InlineMath> ima nagib 3. To je
                  geometrijsko značenje izvoda.
                </p>
              </SectionCard>
              <SectionCard title="Lokalno ponašanje">
                <p>
                  Izvod govori šta se dešava &ldquo;tu i odmah&rdquo;, ne nužno
                  na celom intervalu. Zato kasnije ispitujemo znak izvoda po
                  intervalima.
                </p>
              </SectionCard>
              <SectionCard title="Praktična korist">
                <p>
                  Kada dobiješ tačan izvod, možeš da nalaziš ekstreme,
                  tangente, monotonost i mnoge realne maksimum/minimum
                  zadatke.
                </p>
              </SectionCard>
            </div>
          </div>
        </div>
      </LessonSection>

      {/* ═══════════ TABLICA IZVODA ═══════════ */}
      <LessonSection
        id="tablica"
        eyebrow="Ključne formule"
        title="Tablica osnovnih izvoda koju moraš da prepoznaš na prvi pogled"
        description="Ne moraš sve da učiš istim tempom. Počni od osnovnih obrazaca koje najčešće srećeš, a zatim ih proširi na trigonometrijske, eksponencijalne i logaritamske funkcije. Bitno je da svaku formulu povežeš sa tipičnim oblikom funkcije."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Konstanta"
            formula="(c)'=0"
            note="Konstanta se ne menja, pa joj je brzina promene nula. Zato je i izvod bilo kog slobodnog člana jednak nuli."
          />
          <FormulaCard
            title="Stepena funkcija"
            formula="(x^n)'=nx^{n-1}"
            note={
              <>
                Ovo je najvažnija formula u tablici. Važi za ceo broj{" "}
                <InlineMath>{"n"}</InlineMath>, a uz odgovarajući domen koristi
                se i za racionalne stepene.
              </>
            }
          />
          <FormulaCard
            title="Obrnuta vrednost i koren"
            formula={"\\left(\\frac{1}{x}\\right)'=-\\frac{1}{x^2}, \\qquad (\\sqrt{x})'=\\frac{1}{2\\sqrt{x}}"}
            note={
              <>
                Drugi obrazac je zapravo poseban slučaj stepena{" "}
                <InlineMath>{"x^{-1}"}</InlineMath>, a treci stepena{" "}
                <InlineMath>{"x^{1/2}"}</InlineMath>. Kod korena posebno vodi
                računa o domenu.
              </>
            }
          />
          <FormulaCard
            title="Eksponencijalne"
            formula={"(e^x)'=e^x,\\qquad (a^x)'=a^x\\ln a"}
            note={
              <>
                Kod <InlineMath>{"e^x"}</InlineMath> funkcija je
                &ldquo;sopstveni izvod&rdquo;, dok kod{" "}
                <InlineMath>{"a^x"}</InlineMath> moraš dopisati faktor{" "}
                <InlineMath>{"\\ln a"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Logaritamske"
            formula={"(\\ln x)'=\\frac{1}{x}, \\qquad (\\log_a x)'=\\frac{1}{x\\ln a}"}
            note={
              <>
                Ove formule važe za{" "}
                <InlineMath>{"x>0"}</InlineMath>. To nije sitnica, već obavezan
                uslov koji na prijemnom često odlučuje da li je rešenje potpuno.
              </>
            }
          />
          <FormulaCard
            title="Trigonometrijske"
            formula={"(\\sin x)'=\\cos x,\\qquad (\\cos x)'=-\\sin x,\\qquad (\\tan x)'=\\frac{1}{\\cos^2 x}"}
            note="Ovde je najčešća greška znak kod kosinusa i pogrešno pamćenje izvoda tangensa."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako učiti tablicu pametno">
            <p>
              Grupiši formule po porodicama. Ako znaš stepeni oblik, onda su{" "}
              <InlineMath>{"1/x"}</InlineMath> i{" "}
              <InlineMath>{"\\sqrt{x}"}</InlineMath> samo prepisani stepenski
              slučajevi. Tako pamtiš manje, a razumeš više.
            </p>
          </SectionCard>
          <SectionCard title="Šta mora da postane automatizam">
            <p>
              Kada vidiš <InlineMath>{"x^7"}</InlineMath>, moraš odmah videti{" "}
              <InlineMath>{"7x^6"}</InlineMath>. Kada vidiš{" "}
              <InlineMath>{"\\sin x"}</InlineMath>, moraš odmah videti{" "}
              <InlineMath>{"\\cos x"}</InlineMath>. Tek tada mozak ostaje
              slobodan za složenija pravila.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 1: Zašto je (7)' = 0, a (7x)' = 7?"
          answer={
            <p>
              Zato sto je <InlineMath>{"7"}</InlineMath> konstanta i ne menja se
              sa promenom <InlineMath>{"x"}</InlineMath>, pa joj je izvod nula.
              Funkcija <InlineMath>{"7x"}</InlineMath> jeste linearna funkcija;
              kada <InlineMath>{"x"}</InlineMath> poraste za 1, vrednost
              funkcije poraste za 7, pa je izvod 7.
            </p>
          }
        />

        <MicroCheck
          question="Mikro-provera 2: Zašto je izvod korena od x definisan samo za x > 0, a ne za x = 0?"
          answer={
            <p>
              Funkcija <InlineMath>{"\\sqrt{x}"}</InlineMath> jeste definisana
              za <InlineMath>{"x \\ge 0"}</InlineMath>, ali formula za izvod
              glasi <InlineMath>{"\\frac{1}{2\\sqrt{x}}"}</InlineMath>, što na{" "}
              <InlineMath>{"x=0"}</InlineMath> nema smisla jer bi imenilac bio
              nula. Zato izvod ne postoji u nuli.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PRAVILA DIFERENCIRANJA ═══════════ */}
      <LessonSection
        id="pravila"
        eyebrow="Mehanika rada"
        title="Pravila diferenciranja: kako iz osnovnih izvoda prelaziš na realne zadatke"
        description="Tablica nije dovoljna sama po sebi, jer se u zadacima funkcije skoro nikada ne pojavljuju same. One su sabrane, pomnožene, podeljene ili umetnute jedna u drugu. Tu stupaju na scenu pravila diferenciranja."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Linearnost"
            formula={"(cu\\pm dv)'=cu'\\pm dv'"}
            note={
              <>
                Izvod razlivaš preko zbira i razlike, a konstanta ostaje ispred.
                Ovo je razlog zašto polinome diferenciraš član po član.
              </>
            }
          />
          <FormulaCard
            title="Proizvod"
            formula="(uv)'=u'v+uv'"
            note="Kada imaš umnožak dve funkcije, ne diferenciraš svaku pa samo pomnožiš. Moraš da napišeš oba člana iz formule."
          />
          <FormulaCard
            title="Kolicnik"
            formula={"\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}, \\qquad v\\ne 0"}
            note="Obavezno pazi na redosled u brojniku: prvo u'v, pa minus uv'. Imenilac se kvadrira ceo."
          />
          <FormulaCard
            title="Pravilo lanca"
            formula={"(u\\circ v)'(x)=u'(v(x))\\cdot v'(x)"}
            note="Najvažnije pitanje glasi: šta je spolja, a šta unutra? Spolja diferenciraš tako da unutrašnjost prepišeš, a zatim na kraju množiš njenim izvodom."
          />
          <FormulaCard
            title="Višestruka kombinacija"
            formula={"\\text{često koristiš više pravila u istom zadatku}"}
            note="Na prijemnom su najčešći zadaci u kojima jedno pravilo nije dovoljno. Na primer, u količniku brojilac može biti složena funkcija ili proizvod."
          />
          <FormulaCard
            title="Strategija"
            formula={"\\text{oblik} \\to \\text{pravilo} \\to \\text{tablica} \\to \\text{kontrola}"}
            note="Pre nego što kreneš da računaš, zastani dve sekunde i imenuj oblik. To skraćuje rešenje i drastično smanjuje broj grešaka."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako prepoznaješ pravilo za 10 sekundi">
            <ul>
              <li>
                Ako je funkcija sabrana ili oduzeta po članovima, koristi
                linearnost.
              </li>
              <li>
                Ako vidiš dve funkcije koje se množe, aktiviraš pravilo
                proizvoda.
              </li>
              <li>
                Ako je zapis u obliku razlomka, razmišljaj o količniku.
              </li>
              <li>
                Ako je jedna funkcija &ldquo;u stomaku&rdquo; druge, koristi
                pravilo lanca.
              </li>
              <li>
                Ako vidiš više slojeva, kreni spolja ka unutra, a zatim dodaj
                unutrašnji izvod.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Pedagoški trik za lančano pravilo">
            <p>
              Učenicima je najlakše da napišu privremenu smenu. Na primer, ako
              je{" "}
              <InlineMath>{"f(x)=\\sin(2x^2-1)"}</InlineMath>, zapisi{" "}
              <InlineMath>{"t=2x^2-1"}</InlineMath>. Tada je{" "}
              <InlineMath>{"f(x)=\\sin t"}</InlineMath>, pa je{" "}
              <InlineMath>{"f'(x)=\\cos t \\cdot t'"}</InlineMath>. Na kraju
              vrati <InlineMath>{"t"}</InlineMath>.
            </p>
            <ul>
              <li>
                Spoljasnja funkcija: <InlineMath>{"\\sin t"}</InlineMath>
              </li>
              <li>
                Unutrasnja funkcija:{" "}
                <InlineMath>{"t=2x^2-1"}</InlineMath>
              </li>
              <li>
                Izvod spolja: <InlineMath>{"\\cos t"}</InlineMath>
              </li>
              <li>
                Izvod unutra: <InlineMath>{"4x"}</InlineMath>
              </li>
              <li>
                Konačno:{" "}
                <InlineMath>{"f'(x)=4x\\cos(2x^2-1)"}</InlineMath>
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 3: Šta je unutrašnja funkcija u izrazu ln(5x - 3)?"
          answer={
            <>
              <p>
                Unutrašnja funkcija je{" "}
                <InlineMath>{"5x-3"}</InlineMath>, a spoljašnja je{" "}
                <InlineMath>{"\\ln t"}</InlineMath>. Zato je izvod:
              </p>
              <MathBlock>
                {"\\bigl(\\ln(5x-3)\\bigr)'=\\frac{1}{5x-3}\\cdot 5=\\frac{5}{5x-3}"}
              </MathBlock>
            </>
          }
        />

        <MicroCheck
          question="Mikro-provera 4: Zašto (uv)' nije jednako u'v'?"
          answer={
            <p>
              Zato što proizvod dve promenljive funkcije menja vrednost na dva
              načina istovremeno: menja se prvi faktor i menja se drugi faktor.
              Pravilo proizvoda upravo beleži oba doprinosa, zato je{" "}
              <InlineMath>{"(uv)'=u'v+uv'"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="lab"
        eyebrow="Interaktivni deo"
        title="Laboratorija izvoda: posmatraj funkciju i njenu tangentu"
        description="Izvod nije samo simbolički račun. Ovde biraš funkciju, pomeraš tačku x0 i posmatraš kako se menja nagib tangente. Ispod grafika dobijaš i podsetnik koje pravilo diferenciranja objašnjava baš taj primer."
      >
        <DerivativeLab />

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da koristiš laboratoriju">
            <p>
              Za svaku funkciju prvo naglas imenuj pravilo, pa tek onda gledaj
              izvod. Tako povezuješ simbolički račun sa geometrijskim značenjem
              nagiba.
            </p>
          </SectionCard>
          <SectionCard title="Šta treba da primetiš">
            <p>
              Kada promeniš <InlineMath>{"x_0"}</InlineMath>, menja se i
              vrednost izvoda. Dakle, izvod je nova funkcija, ne samo jedan
              broj. Broj dobijaš tek kada u izvod uvrstiš konkretnu tačku.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od jednostavnog ka tipičnom ispitnom zadatku"
        description="Sledeći primeri nisu tu samo da pokažu račun, već i da ti modeluju način razmišljanja. U svakom primeru prvo identifikujemo oblik funkcije, zatim biramo pravilo, pa tek onda računamo."
      >
        <div className={s.grid2}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: Polinom i linearnost</h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=5x^4-2x+7"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj oblik">
                <p>
                  Funkcija je zbir tri clana, pa koristimo linearnost izvoda.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Diferenciraj clan po clan">
                <MathBlock>
                  {"(5x^4)'=20x^3,\\qquad (-2x)'=-2,\\qquad (7)'=0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sastavi rezultat">
                <MathBlock>{"f'(x)=20x^3-2"}</MathBlock>
                <p>
                  Ovaj tip zadatka moraš da radiš gotovo bez zadrške, jer je to
                  osnovna brzina potrebna za složenije zadatke.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Proizvod dve funkcije
            </h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=x^2(x-3)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uvedi pomocne oznake">
                <p>
                  Neka je <InlineMath>{"u=x^2"}</InlineMath>, a{" "}
                  <InlineMath>{"v=x-3"}</InlineMath>. Tada je{" "}
                  <InlineMath>{"u'=2x"}</InlineMath> i{" "}
                  <InlineMath>{"v'=1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni pravilo proizvoda">
                <MathBlock>
                  {"f'(x)=u'v+uv'=2x(x-3)+x^2\\cdot 1"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Pojednostavi">
                <MathBlock>
                  {"f'(x)=2x^2-6x+x^2=3x^2-6x"}
                </MathBlock>
                <p>
                  Ovde možeš i da proširiš funkciju pre diferenciranja:{" "}
                  <InlineMath>{"x^2(x-3)=x^3-3x^2"}</InlineMath>. Dobijas isti
                  rezultat. To je dobar način da proveriš sebe.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Količnik i pažnja na imenilac
            </h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=\\frac{x^2+1}{x+2}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Identifikuj brojilac i imenilac">
                <MathBlock>
                  {"u=x^2+1,\\qquad v=x+2,\\qquad u'=2x,\\qquad v'=1"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Primeni formulu pažljivo">
                <MathBlock>
                  {
                    "f'(x)=\\frac{u'v-uv'}{v^2}=\\frac{2x(x+2)-(x^2+1)\\cdot 1}{(x+2)^2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sredi brojilac">
                <MathBlock>
                  {
                    "f'(x)=\\frac{2x^2+4x-x^2-1}{(x+2)^2}=\\frac{x^2+4x-1}{(x+2)^2}"
                  }
                </MathBlock>
                <p>
                  Ne zaboravi domen početne funkcije:{" "}
                  <InlineMath>{"x\\neq -2"}</InlineMath>. To ograničenje ostaje
                  važno i kada kasnije budeš rešavao jednačine tipa{" "}
                  <InlineMath>{"f'(x)=0"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Koren kao složena funkcija
            </h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=\\sqrt{3x-1}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepiši u oblik stepena">
                <MathBlock>{"f(x)=(3x-1)^{1/2}"}</MathBlock>
                <p>
                  To odmah pomaže da vidiš spoljašnju funkciju{" "}
                  <InlineMath>{"t^{1/2}"}</InlineMath> i unutrašnju funkciju{" "}
                  <InlineMath>{"t=3x-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Diferenciraj spolja, pa unutra">
                <MathBlock>
                  {"f'(x)=\\frac{1}{2}(3x-1)^{-1/2}\\cdot 3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zapiši urednije">
                <MathBlock>{"f'(x)=\\frac{3}{2\\sqrt{3x-1}}"}</MathBlock>
                <p>
                  Originalna funkcija je definisana za{" "}
                  <InlineMath>{"x\\ge \\frac{1}{3}"}</InlineMath>, ali izvod
                  postoji za{" "}
                  <InlineMath>{"x>\\frac{1}{3}"}</InlineMath>. Ovo je važna
                  razlika.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Trigonometrijska složena funkcija
            </h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=\\sin(2x^2-1)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Razdvoji spolja i unutra">
                <p>
                  Spoljašnja funkcija je{" "}
                  <InlineMath>{"\\sin t"}</InlineMath>, a unutrašnja{" "}
                  <InlineMath>{"t=2x^2-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni lančano pravilo">
                <MathBlock>
                  {"f'(x)=\\cos(2x^2-1)\\cdot (2x^2-1)'"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Dovrši unutrašnji izvod">
                <MathBlock>{"(2x^2-1)'=4x"}</MathBlock>
                <p>Zato je:</p>
                <MathBlock>{"f'(x)=4x\\cos(2x^2-1)"}</MathBlock>
                <p>
                  Najtipičnija greška je da se stane na{" "}
                  <InlineMath>{"\\cos(2x^2-1)"}</InlineMath> i zaboravi faktor{" "}
                  <InlineMath>{"4x"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Kombinacija više pravila
            </h3>
            <p>
              Nađi izvod funkcije{" "}
              <InlineMath>{"f(x)=\\frac{e^{2x}}{x^2+1}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvo odredi glavnu strukturu">
                <p>
                  Glavna struktura je količnik. Brojilac{" "}
                  <InlineMath>{"e^{2x}"}</InlineMath> je pritom složena
                  funkcija, pa će se unutra pojaviti i lančano pravilo.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj pomoćne izvode">
                <MathBlock>
                  {
                    "u=e^{2x}\\Rightarrow u'=2e^{2x},\\qquad v=x^2+1\\Rightarrow v'=2x"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Primeni pravilo količnika">
                <MathBlock>
                  {
                    "f'(x)=\\frac{2e^{2x}(x^2+1)-e^{2x}\\cdot 2x}{(x^2+1)^2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Uredi rezultat">
                <MathBlock>
                  {"f'(x)=\\frac{2e^{2x}(x^2-x+1)}{(x^2+1)^2}"}
                </MathBlock>
                <p>
                  Ovo je tipičan primer gde jedna greška u brojniku obara sve
                  kasnije korake, posebno ako izvod služi za znak ili ekstrem.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje najčešće ruše poene"
        description="Nisu sve greške iste. Neke su sitne računske omaške, a neke znače da pravilo uopšte nije prepoznato. Ove druge su posebno opasne jer vode do potpuno pogrešnog daljeg zaključka."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen unutrašnji izvod</h3>
            <p>
              Kod <InlineMath>{"\\sin(3x)"}</InlineMath>,{" "}
              <InlineMath>{"(3x-1)^5"}</InlineMath>,{" "}
              <InlineMath>{"\\ln(2x+7)"}</InlineMath> i sličnih funkcija učenik
              napiše samo izvod spolja. To je nepotpun izvod i obara ceo
              rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna formula za proizvod</h3>
            <p>
              Česta greška je{" "}
              <InlineMath>{"(uv)'=u'v'"}</InlineMath>. To nije tačno. Moraš
              zapisati oba člana:{" "}
              <InlineMath>{"u'v+uv'"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Minus u pravilu količnika</h3>
            <p>
              U brojniku mora stajati{" "}
              <InlineMath>{"u'v-uv'"}</InlineMath>. Ako okreneš redosled ili
              zaboraviš minus, dobijaš pogrešan znak i kasnije pogrešne
              intervale ili ekstreme.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen domen</h3>
            <p>
              Kod <InlineMath>{"\\sqrt{3x-1}"}</InlineMath> i{" "}
              <InlineMath>{"\\ln(3x^2+1)"}</InlineMath> nije dovoljno samo
              izračunati izvod. Moraš znati na kom skupu taj izvod ima smisla.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim"
        title="Kako se ova tema pojavljuje na prijemnom ispitu"
        description="Nekada će zadatak direktno tražiti izvod, ali češće će to biti samo usputni korak. Zato je cilj da diferenciranje postane stabilna rutina, kako bi pažnju mogao da čuvaš za samu ideju zadatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipični formati">
            <ul>
              <li>Izračunaj izvod zadate funkcije.</li>
              <li>Odredi jednačinu tangente u tački.</li>
              <li>Ispitaj monotonost pomoću znaka izvoda.</li>
              <li>
                Nađi ekstrem funkcije koja modeluje zapreminu, površinu ili
                rastojanje.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Kontrolna lista pod pritiskom vremena">
            <ul>
              <li>Prvo domen, pa tek račun.</li>
              <li>Imenuj oblik funkcije pre diferenciranja.</li>
              <li>Kod lanca obavezno traži unutrašnji izvod.</li>
              <li>
                Kod količnika proveri da li je ceo imenilac kvadriran.
              </li>
              <li>Na kraju brzo proveri znakove i faktore.</li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta ispitivač često proverava">
            <p>
              Ne proverava samo da li znaš napamet formulu, nego da li umeš da
              određiš koja formula uopšte treba da se primeni. To je suštinska
              razlika između mehaničkog i zrelog rešavanja.
            </p>
          </SectionCard>
          <SectionCard title="Kada sebi daš dodatna 2 sekunda">
            <p>
              Najviše se isplate pre prvog poteza olovkom. Ako prepoznaš
              strukturu, račun će često ići glatko. Ako kreneš naslepo, greške
              se brzo gomilaju.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe"
        title="Probaj samostalno, pa proveri rešenje"
        description="Reši zadatke bez gledanja rešenja. Tek kada završiš, otvori odgovarajući blok i proveri ne samo konačan rezultat, već i logiku kojom si do njega stigao."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>
                  {"f(x)=4x^5-\\frac{3}{x^2}+6"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Prepiši razlomak kao stepen:{" "}
                  <InlineMath>{"-\\frac{3}{x^2}=-3x^{-2}"}</InlineMath>.
                </p>
                <MathBlock>
                  {"f'(x)=20x^4+6x^{-3}=20x^4+\\frac{6}{x^3}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>{"f(x)=(x^2+1)(2x-5)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo pravilo proizvoda:</p>
                <MathBlock>
                  {"f'(x)=2x(2x-5)+(x^2+1)\\cdot 2"}
                </MathBlock>
                <MathBlock>
                  {"f'(x)=4x^2-10x+2x^2+2=6x^2-10x+2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>{"f(x)=\\frac{\\sin x}{x}"}</InlineMath>, za{" "}
                <InlineMath>{"x\\neq 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Ovde je <InlineMath>{"u=\\sin x"}</InlineMath>,{" "}
                  <InlineMath>{"u'=\\cos x"}</InlineMath>,{" "}
                  <InlineMath>{"v=x"}</InlineMath>,{" "}
                  <InlineMath>{"v'=1"}</InlineMath>.
                </p>
                <MathBlock>
                  {"f'(x)=\\frac{x\\cos x-\\sin x}{x^2}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>{"f(x)=(5x-1)^6"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Spoljašnja funkcija je{" "}
                  <InlineMath>{"t^6"}</InlineMath>, unutrašnja{" "}
                  <InlineMath>{"t=5x-1"}</InlineMath>.
                </p>
                <MathBlock>
                  {"f'(x)=6(5x-1)^5\\cdot 5=30(5x-1)^5"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>{"f(x)=\\ln(3x^2+1)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo pravilo lanca:</p>
                <MathBlock>
                  {"f'(x)=\\frac{1}{3x^2+1}\\cdot 6x=\\frac{6x}{3x^2+1}"}
                </MathBlock>
                <p>
                  Pošto je{" "}
                  <InlineMath>{"3x^2+1>0"}</InlineMath> za svaki realan{" "}
                  <InlineMath>{"x"}</InlineMath>, funkcija i njen izvod imaju
                  smisla za sve{" "}
                  <InlineMath>{"x\\in\\mathbb{R}"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Nađi izvod funkcije{" "}
                <InlineMath>
                  {"f(x)=\\frac{\\sqrt{x}}{x+1}"}
                </InlineMath>
                , za <InlineMath>{"x\\ge 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo pravilo količnika:</p>
                <MathBlock>
                  {
                    "u=\\sqrt{x},\\quad u'=\\frac{1}{2\\sqrt{x}},\\qquad v=x+1,\\quad v'=1"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "f'(x)=\\frac{\\frac{1}{2\\sqrt{x}}(x+1)-\\sqrt{x}}{(x+1)^2}"
                  }
                </MathBlock>
                <p>Ako sredis brojilac:</p>
                <MathBlock>
                  {"f'(x)=\\frac{1-x}{2\\sqrt{x}(x+1)^2}"}
                </MathBlock>
                <p>
                  Ovaj zadatak lepo spaja koren, domen i količnik.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka"
        title="Diferenciranje nije puko pamćenje formula, već prepoznavanje strukture funkcije"
        description="Kada vidiš funkciju, ne reaguj odmah mehanički. Prvo pitaj: od kojih slojeva je sastavljena? Ako razviješ tu naviku, tablica izvoda i pravila diferenciranja postaju alat koji radi za tebe, umesto zbirke formula koje stalno mešaš."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Diferenciranje postaje stabilno tek kada mentalno razdvojiš dva
            koraka: prepoznavanje oblika (zbir, proizvod, količnik, složena
            funkcija) i mehaničku primenu pravila. Tada ne zavisiš od
            pamćenja, nego od razumevanja.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Dobar rezime nije lista svega što si video, nego spisak onoga bez čega ne smeš da izađeš na zadatak. Sledeće tačke treba da budu potpuno stabilne."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Značenje izvoda</h3>
            <ul>
              <li>Izvod je lokalna brzina promene funkcije.</li>
              <li>Geometrijski, to je nagib tangente.</li>
              <li>Vrednost izvoda zavisi od tačke.</li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Tablica izvoda</h3>
            <ul>
              <li>
                Moraš sigurno znati osnovne stepene, koren, recipročnu,
                logaritamske, eksponencijalne i trigonometrijske funkcije.
              </li>
              <li>
                Posebno pazi na znak kod{" "}
                <InlineMath>{"(\\cos x)'"}</InlineMath> i na domene kod korena
                i logaritma.
              </li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Pravila diferenciranja</h3>
            <ul>
              <li>Linearnost za zbir i razliku.</li>
              <li>Pravilo proizvoda za umnožak.</li>
              <li>Pravilo količnika za razlomak.</li>
              <li>Pravilo lanca za složenu funkciju.</li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Sledeći logičan korak</h3>
            <ul>
              <li>
                Primena izvoda na monotonost, ekstreme i tangente.
              </li>
              <li>
                Navikni se da posle računa odmah pitaš: šta ovaj izvod znači za
                ponašanje funkcije?
              </li>
            </ul>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 58 zatvara temu tablice izvoda i pravila diferenciranja.
          Sledeći korak je primena izvoda na ispitivanje ponašanja funkcije:
          monotonost, ekstremi i tangente.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
