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
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#ideja", label: "Ideja izvoda" },
  { href: "#tablica", label: "Tablica izvoda" },
  { href: "#pravila", label: "Pravila" },
  { href: "#lab", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson58Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 58"
        title={
          <>
            Diferencijalni racun{" "}
            <span className={cs.tHeroAccent}>
              Tablica izvoda i pravila diferenciranja
            </span>
          </>
        }
        description="Ova lekcija je mesto gde izvod prestaje da bude apstraktna definicija i postaje alat koji moras da koristis brzo, tacno i bez panike. Za prijemni nije dovoljno da znas sta je izvod; moras da prepoznas oblik funkcije i da bez greske aktiviras pravo pravilo."
        heroImageSrc="/api/lessons/58/hero"
        heroImageAlt="Ilustracija za lekciju o diferencijalnom racunu: graf funkcije sa tangentom i tablica izvoda"
        cards={[
          {
            label: "Naucices",
            description:
              "Da sigurno diferenciras polinomske, racionalne, korenske, trigonometrijske, eksponencijalne i logaritamske funkcije, kao i njihove kombinacije.",
          },
          {
            label: "Najveca zamka",
            description:
              "Da vidis samo spoljasnji oblik funkcije, a zaboravis unutrasnju funkciju. Upravo tu ucenici najcesce izgube poene zbog izostavljenog faktora.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Najpre prepoznaj strukturu: zbir, proizvod, kolicnik ili slozena funkcija. Tek tada pisi izvod. Redosled razmisljanja je vazniji od brzine ruke.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "55 do 75 minuta za pazljiv prolazak, plus dodatnih 20 minuta za samostalno resavanje vezbi.",
          },
          {
            label: "Predznanje",
            description:
              "Limes funkcije, osnovne elementarne funkcije, algebra izraza i sigurno rukovanje stepenima, korenima i razlomcima.",
          },
          {
            label: "Glavna vestina",
            description:
              "Prepoznavanje strukture funkcije i precizna primena tablice izvoda i pravila diferenciranja bez preskakanja faktora.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija: biras funkciju i tacku, posmatras tangentu i odmah vidis koje pravilo diferenciranja stoji iza tog primera.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Izvod je osovina cele matematicke analize"
        description="Na prijemnom se izvod retko pojavljuje samo kao izolovana tehnika. U vecini zadataka on je prvi korak ka necemu vecem: ispitivanju rasta i opadanja funkcije, nalazenju minimuma i maksimuma, pisanju jednacine tangente ili resavanju optimizacionog problema."
      >
        <div className={s.grid2}>
          <SectionCard title="Zasto ucenici ovde zapinju">
            <p>
              Zato sto pokusavaju da pamte formule kao nepovezanu listu. To
              kratko traje. Mnogo sigurniji pristup je sledeci: svaku funkciju
              posmatraj kao konstrukciju. Pitaj se da li je to zbir, proizvod,
              kolicnik ili funkcija unutar funkcije. Tek onda pisi izvod.
            </p>
            <ul>
              <li>Tablica izvoda daje ti osnovne cigle.</li>
              <li>
                Pravila diferenciranja govore kako se te cigle kombinuju.
              </li>
              <li>
                Lancano pravilo ti spasava sve zadatke sa slozenom funkcijom.
              </li>
              <li>
                Domena ne sme da se zaboravi, posebno kod korena i logaritma.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Gde se tema odmah koristi">
            <p>
              Vec u sledecoj lekciji izvod postaje radni alat za monotonost,
              ekstreme i tangente. Ako ovde automatizujes diferenciranje,
              kasnije mozes da se bavis idejom zadatka. Ako ovde trosis svu
              energiju, neces imati prostora za ostatak resenja.
            </p>
            <ul>
              <li>Ekstremne vrednosti traze tacan prvi izvod.</li>
              <li>
                Tangenta i normala traze vrednost izvoda u konkretnoj tacki.
              </li>
              <li>
                Optimizacija u geometriji pocinje dobrim modelovanjem i
                zavrsava dobrim diferenciranjem.
              </li>
              <li>
                Na tehnickim prijemnim brzina je vazna, ali samo kada je
                tacnost stabilna.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da ucenik razmislja">
            <p>
              Nemoj sebi govoriti: &ldquo;Moram da znam formulu.&rdquo; Reci
              sebi: &ldquo;Moram da prepoznam od cega je funkcija
              sastavljena.&rdquo; To je mentalni zaokret koji diferenciranje
              cini stabilnim.
            </p>
          </SectionCard>
          <SectionCard title="Vazna napomena">
            <p>
              Funkcija moze biti definisana u nekoj tacki, a da u toj tacki
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
        title="Sta izvod zapravo meri"
        description="Pre nego sto zapamtis formule, vazno je da razumes znacenje. Kada kazemo da je izvod funkcije u tacki jednak broju 5, to znaci da funkcija u vrlo maloj okolini te tacke raste priblizno pet jedinica po jednoj jedinici promene argumenta."
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija">
            <p>
              Izvod u tacki meri <em>lokalnu brzinu promene</em>. Ako
              posmatras graf funkcije, izvod je nagib tangente u toj tacki.
              Pozitivan izvod znaci da funkcija raste, negativan da opada, a
              nulti izvod cesto signalizira moguci ekstrem ili horizontalnu
              tangentu.
            </p>
            <MathBlock>
              {"f'(x_0)=\\lim_{h\\to 0}\\frac{f(x_0+h)-f(x_0)}{h}"}
            </MathBlock>
            <p>
              Ova formula dolazi iz limesa kolicnika prirastaja. Na prijemnom
              se izvod uglavnom nece traziti preko definicije, ali je korisno
              da znas odakle dolazi jer tada razumes zasto izvod &ldquo;gleda&rdquo;
              ponasanje funkcije u beskrajno maloj okolini tacke.
            </p>
          </SectionCard>

          <div>
            <div className={s.grid3}>
              <SectionCard title="Nagib tangente">
                <p>
                  Ako je{" "}
                  <InlineMath>{"f'(x_0)=3"}</InlineMath>, tangenta u tacki{" "}
                  <InlineMath>{"x_0"}</InlineMath> ima nagib 3. To je
                  geometrijsko znacenje izvoda.
                </p>
              </SectionCard>
              <SectionCard title="Lokalno ponasanje">
                <p>
                  Izvod govori sta se desava &ldquo;tu i odmah&rdquo;, ne nuzno
                  na celom intervalu. Zato kasnije ispitujemo znak izvoda po
                  intervalima.
                </p>
              </SectionCard>
              <SectionCard title="Prakticna korist">
                <p>
                  Kada dobijes tacan izvod, mozes da nalazis ekstreme,
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
        eyebrow="Kljucne formule"
        title="Tablica osnovnih izvoda koju moras da prepoznas na prvi pogled"
        description="Ne moras sve da ucis istim tempom. Pocni od osnovnih obrazaca koje najcesce sreces, a zatim ih prosiri na trigonometrijske, eksponencijalne i logaritamske funkcije. Bitno je da svaku formulu povezes sa tipicnim oblikom funkcije."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Konstanta"
            formula="(c)'=0"
            note="Konstanta se ne menja, pa joj je brzina promene nula. Zato je i izvod bilo kog slobodnog clana jednak nuli."
          />
          <FormulaCard
            title="Stepena funkcija"
            formula="(x^n)'=nx^{n-1}"
            note={
              <>
                Ovo je najvaznija formula u tablici. Vazi za ceo broj{" "}
                <InlineMath>{"n"}</InlineMath>, a uz odgovarajuci domen koristi
                se i za racionalne stepene.
              </>
            }
          />
          <FormulaCard
            title="Obrnuta vrednost i koren"
            formula={"\\left(\\frac{1}{x}\\right)'=-\\frac{1}{x^2}, \\qquad (\\sqrt{x})'=\\frac{1}{2\\sqrt{x}}"}
            note={
              <>
                Drugi obrazac je zapravo poseban slucaj stepena{" "}
                <InlineMath>{"x^{-1}"}</InlineMath>, a treci stepena{" "}
                <InlineMath>{"x^{1/2}"}</InlineMath>. Kod korena posebno vodi
                racuna o domenu.
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
                <InlineMath>{"a^x"}</InlineMath> moras dopisati faktor{" "}
                <InlineMath>{"\\ln a"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Logaritamske"
            formula={"(\\ln x)'=\\frac{1}{x}, \\qquad (\\log_a x)'=\\frac{1}{x\\ln a}"}
            note={
              <>
                Ove formule vaze za{" "}
                <InlineMath>{"x>0"}</InlineMath>. To nije sitnica, vec obavezan
                uslov koji na prijemnom cesto odlucuje da li je resenje potpuno.
              </>
            }
          />
          <FormulaCard
            title="Trigonometrijske"
            formula={"(\\sin x)'=\\cos x,\\qquad (\\cos x)'=-\\sin x,\\qquad (\\tan x)'=\\frac{1}{\\cos^2 x}"}
            note="Ovde je najcesca greska znak kod kosinusa i pogresno pamcenje izvoda tangensa."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako uciti tablicu pametno">
            <p>
              Grupisi formule po porodicama. Ako znas stepeni oblik, onda su{" "}
              <InlineMath>{"1/x"}</InlineMath> i{" "}
              <InlineMath>{"\\sqrt{x}"}</InlineMath> samo prepisani stepenski
              slucajevi. Tako pamtis manje, a razumes vise.
            </p>
          </SectionCard>
          <SectionCard title="Sta mora da postane automatizam">
            <p>
              Kada vidis <InlineMath>{"x^7"}</InlineMath>, moras odmah videti{" "}
              <InlineMath>{"7x^6"}</InlineMath>. Kada vidis{" "}
              <InlineMath>{"\\sin x"}</InlineMath>, moras odmah videti{" "}
              <InlineMath>{"\\cos x"}</InlineMath>. Tek tada mozak ostaje
              slobodan za slozenija pravila.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 1: Zasto je (7)' = 0, a (7x)' = 7?"
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
          question="Mikro-provera 2: Zasto je izvod korena od x definisan samo za x > 0, a ne za x = 0?"
          answer={
            <p>
              Funkcija <InlineMath>{"\\sqrt{x}"}</InlineMath> jeste definisana
              za <InlineMath>{"x \\ge 0"}</InlineMath>, ali formula za izvod
              glasi <InlineMath>{"\\frac{1}{2\\sqrt{x}}"}</InlineMath>, sto na{" "}
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
        title="Pravila diferenciranja: kako iz osnovnih izvoda prelazis na realne zadatke"
        description="Tablica nije dovoljna sama po sebi, jer se u zadacima funkcije skoro nikada ne pojavljuju same. One su sabrane, pomnozene, podeljene ili umetnute jedna u drugu. Tu stupaju na scenu pravila diferenciranja."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Linearnost"
            formula={"(cu\\pm dv)'=cu'\\pm dv'"}
            note={
              <>
                Izvod razlivas preko zbira i razlike, a konstanta ostaje ispred.
                Ovo je razlog zasto polinome diferenciras clan po clan.
              </>
            }
          />
          <FormulaCard
            title="Proizvod"
            formula="(uv)'=u'v+uv'"
            note="Kada imas umnozak dve funkcije, ne diferenciras svaku pa samo pomnozis. Moras da napises oba clana iz formule."
          />
          <FormulaCard
            title="Kolicnik"
            formula={"\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}, \\qquad v\\ne 0"}
            note="Obavezno pazi na redosled u brojniku: prvo u'v, pa minus uv'. Imenilac se kvadrira ceo."
          />
          <FormulaCard
            title="Pravilo lanca"
            formula={"(u\\circ v)'(x)=u'(v(x))\\cdot v'(x)"}
            note="Najvaznije pitanje glasi: sta je spolja, a sta unutra? Spolja diferenciras tako da unutrasnjost prepises, a zatim na kraju mnozis njenim izvodom."
          />
          <FormulaCard
            title="Visestruka kombinacija"
            formula={"\\text{cesto koristis vise pravila u istom zadatku}"}
            note="Na prijemnom su najcesci zadaci u kojima jedno pravilo nije dovoljno. Na primer, u kolicniku brojilac moze biti slozena funkcija ili proizvod."
          />
          <FormulaCard
            title="Strategija"
            formula={"\\text{oblik} \\to \\text{pravilo} \\to \\text{tablica} \\to \\text{kontrola}"}
            note="Pre nego sto krenes da racunas, zastani dve sekunde i imenuj oblik. To skracuje resenje i drasticno smanjuje broj gresaka."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako prepoznajes pravilo za 10 sekundi">
            <ul>
              <li>
                Ako je funkcija sabrana ili oduzeta po clanovima, koristi
                linearnost.
              </li>
              <li>
                Ako vidis dve funkcije koje se mnoze, aktiviras pravilo
                proizvoda.
              </li>
              <li>
                Ako je zapis u obliku razlomka, razmisljaj o kolicniku.
              </li>
              <li>
                Ako je jedna funkcija &ldquo;u stomaku&rdquo; druge, koristi
                pravilo lanca.
              </li>
              <li>
                Ako vidis vise slojeva, kreni spolja ka unutra, a zatim dodaj
                unutrasnji izvod.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Pedagoski trik za lancano pravilo">
            <p>
              Ucenicima je najlakse da napisu privremenu smenu. Na primer, ako
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
                Konacno:{" "}
                <InlineMath>{"f'(x)=4x\\cos(2x^2-1)"}</InlineMath>
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 3: Sta je unutrasnja funkcija u izrazu ln(5x - 3)?"
          answer={
            <>
              <p>
                Unutrasnja funkcija je{" "}
                <InlineMath>{"5x-3"}</InlineMath>, a spoljasnja je{" "}
                <InlineMath>{"\\ln t"}</InlineMath>. Zato je izvod:
              </p>
              <MathBlock>
                {"\\bigl(\\ln(5x-3)\\bigr)'=\\frac{1}{5x-3}\\cdot 5=\\frac{5}{5x-3}"}
              </MathBlock>
            </>
          }
        />

        <MicroCheck
          question="Mikro-provera 4: Zasto (uv)' nije jednako u'v'?"
          answer={
            <p>
              Zato sto proizvod dve promenljive funkcije menja vrednost na dva
              nacina istovremeno: menja se prvi faktor i menja se drugi faktor.
              Pravilo proizvoda upravo belezi oba doprinosa, zato je{" "}
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
        description="Izvod nije samo simbolicki racun. Ovde biras funkciju, pomeras tacku x0 i posmatras kako se menja nagib tangente. Ispod grafika dobijas i podsetnik koje pravilo diferenciranja objasnjava bas taj primer."
      >
        <DerivativeLab />

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da koristis laboratoriju">
            <p>
              Za svaku funkciju prvo naglas imenuj pravilo, pa tek onda gledaj
              izvod. Tako povezujes simbolicki racun sa geometrijskim znacenjem
              nagiba.
            </p>
          </SectionCard>
          <SectionCard title="Sta treba da primetis">
            <p>
              Kada promenis <InlineMath>{"x_0"}</InlineMath>, menja se i
              vrednost izvoda. Dakle, izvod je nova funkcija, ne samo jedan
              broj. Broj dobijas tek kada u izvod uvrstis konkretnu tacku.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Od jednostavnog ka tipicnom ispitnom zadatku"
        description="Sledeci primeri nisu tu samo da pokazu racun, vec i da ti modeluju nacin razmisljanja. U svakom primeru prvo identifikujemo oblik funkcije, zatim biramo pravilo, pa tek onda racunamo."
      >
        <div className={s.grid2}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: Polinom i linearnost</h3>
            <p>
              Nadji izvod funkcije{" "}
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
                  Ovaj tip zadatka moras da radis gotovo bez zadrske, jer je to
                  osnovna brzina potrebna za slozenije zadatke.
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
              Nadji izvod funkcije{" "}
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
                  Ovde mozes i da prosiris funkciju pre diferenciranja:{" "}
                  <InlineMath>{"x^2(x-3)=x^3-3x^2"}</InlineMath>. Dobijas isti
                  rezultat. To je dobar nacin da proveris sebe.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Kolicnik i paznja na imenilac
            </h3>
            <p>
              Nadji izvod funkcije{" "}
              <InlineMath>{"f(x)=\\frac{x^2+1}{x+2}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Identifikuj brojilac i imenilac">
                <MathBlock>
                  {"u=x^2+1,\\qquad v=x+2,\\qquad u'=2x,\\qquad v'=1"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Primeni formulu pazljivo">
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
                  Ne zaboravi domen pocetne funkcije:{" "}
                  <InlineMath>{"x\\neq -2"}</InlineMath>. To ogranicenje ostaje
                  vazno i kada kasnije budes resavao jednacine tipa{" "}
                  <InlineMath>{"f'(x)=0"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Koren kao slozena funkcija
            </h3>
            <p>
              Nadji izvod funkcije{" "}
              <InlineMath>{"f(x)=\\sqrt{3x-1}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepisi u oblik stepena">
                <MathBlock>{"f(x)=(3x-1)^{1/2}"}</MathBlock>
                <p>
                  To odmah pomaze da vidis spoljasnju funkciju{" "}
                  <InlineMath>{"t^{1/2}"}</InlineMath> i unutrasnju funkciju{" "}
                  <InlineMath>{"t=3x-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Diferenciraj spolja, pa unutra">
                <MathBlock>
                  {"f'(x)=\\frac{1}{2}(3x-1)^{-1/2}\\cdot 3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zapisi urednije">
                <MathBlock>{"f'(x)=\\frac{3}{2\\sqrt{3x-1}}"}</MathBlock>
                <p>
                  Originalna funkcija je definisana za{" "}
                  <InlineMath>{"x\\ge \\frac{1}{3}"}</InlineMath>, ali izvod
                  postoji za{" "}
                  <InlineMath>{"x>\\frac{1}{3}"}</InlineMath>. Ovo je vazna
                  razlika.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Trigonometrijska slozena funkcija
            </h3>
            <p>
              Nadji izvod funkcije{" "}
              <InlineMath>{"f(x)=\\sin(2x^2-1)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Razdvoji spolja i unutra">
                <p>
                  Spoljasnja funkcija je{" "}
                  <InlineMath>{"\\sin t"}</InlineMath>, a unutrasnja{" "}
                  <InlineMath>{"t=2x^2-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni lancano pravilo">
                <MathBlock>
                  {"f'(x)=\\cos(2x^2-1)\\cdot (2x^2-1)'"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Dovrsi unutrasnji izvod">
                <MathBlock>{"(2x^2-1)'=4x"}</MathBlock>
                <p>Zato je:</p>
                <MathBlock>{"f'(x)=4x\\cos(2x^2-1)"}</MathBlock>
                <p>
                  Najtipicnija greska je da se stane na{" "}
                  <InlineMath>{"\\cos(2x^2-1)"}</InlineMath> i zaboravi faktor{" "}
                  <InlineMath>{"4x"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Kombinacija vise pravila
            </h3>
            <p>
              Nadji izvod funkcije{" "}
              <InlineMath>{"f(x)=\\frac{e^{2x}}{x^2+1}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvo odredi glavnu strukturu">
                <p>
                  Glavna struktura je kolicnik. Brojilac{" "}
                  <InlineMath>{"e^{2x}"}</InlineMath> je pritom slozena
                  funkcija, pa ce se unutra pojaviti i lancano pravilo.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izracunaj pomocne izvode">
                <MathBlock>
                  {
                    "u=e^{2x}\\Rightarrow u'=2e^{2x},\\qquad v=x^2+1\\Rightarrow v'=2x"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Primeni pravilo kolicnika">
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
                  Ovo je tipican primer gde jedna greska u brojniku obara sve
                  kasnije korake, posebno ako izvod sluzi za znak ili ekstrem.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Greske koje najcesce ruse poene"
        description="Nisu sve greske iste. Neke su sitne racunske omaske, a neke znace da pravilo uopste nije prepoznato. Ove druge su posebno opasne jer vode do potpuno pogresnog daljeg zakljucka."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen unutrasnji izvod</h3>
            <p>
              Kod <InlineMath>{"\\sin(3x)"}</InlineMath>,{" "}
              <InlineMath>{"(3x-1)^5"}</InlineMath>,{" "}
              <InlineMath>{"\\ln(2x+7)"}</InlineMath> i slicnih funkcija ucenik
              napise samo izvod spolja. To je nepotpun izvod i obara ceo
              rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogresna formula za proizvod</h3>
            <p>
              Cesta greska je{" "}
              <InlineMath>{"(uv)'=u'v'"}</InlineMath>. To nije tacno. Moras
              zapisati oba clana:{" "}
              <InlineMath>{"u'v+uv'"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Minus u pravilu kolicnika</h3>
            <p>
              U brojniku mora stajati{" "}
              <InlineMath>{"u'v-uv'"}</InlineMath>. Ako okrenes redosled ili
              zaboravis minus, dobijas pogresan znak i kasnije pogresne
              intervale ili ekstreme.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen domen</h3>
            <p>
              Kod <InlineMath>{"\\sqrt{3x-1}"}</InlineMath> i{" "}
              <InlineMath>{"\\ln(3x^2+1)"}</InlineMath> nije dovoljno samo
              izracunati izvod. Moras znati na kom skupu taj izvod ima smisla.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim"
        title="Kako se ova tema pojavljuje na prijemnom ispitu"
        description="Nekada ce zadatak direktno traziti izvod, ali cesce ce to biti samo usputni korak. Zato je cilj da diferenciranje postane stabilna rutina, kako bi paznju mogao da cuvas za samu ideju zadatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipicni formati">
            <ul>
              <li>Izracunaj izvod zadate funkcije.</li>
              <li>Odredi jednacinu tangente u tacki.</li>
              <li>Ispitaj monotonost pomocu znaka izvoda.</li>
              <li>
                Nadji ekstrem funkcije koja modeluje zapreminu, povrsinu ili
                rastojanje.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Kontrolna lista pod pritiskom vremena">
            <ul>
              <li>Prvo domen, pa tek racun.</li>
              <li>Imenuj oblik funkcije pre diferenciranja.</li>
              <li>Kod lanca obavezno trazi unutrasnji izvod.</li>
              <li>
                Kod kolicnika proveri da li je ceo imenilac kvadriran.
              </li>
              <li>Na kraju brzo proveri znakove i faktore.</li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Sta ispitivac cesto proverava">
            <p>
              Ne proverava samo da li znas napamet formulu, nego da li umes da
              odredis koja formula uopste treba da se primeni. To je sustinska
              razlika izmedju mehanickog i zrelog resavanja.
            </p>
          </SectionCard>
          <SectionCard title="Kada sebi das dodatna 2 sekunda">
            <p>
              Najvise se isplate pre prvog poteza olovkom. Ako prepoznas
              strukturu, racun ce cesto ici glatko. Ako krenes naslepo, greske
              se brzo gomilaju.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vezbe"
        title="Probaj samostalno, pa proveri resenje"
        description="Resi zadatke bez gledanja resenja. Tek kada zavrsis, otvori odgovarajuci blok i proveri ne samo konacan rezultat, vec i logiku kojom si do njega stigao."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Nadji izvod funkcije{" "}
                <InlineMath>
                  {"f(x)=4x^5-\\frac{3}{x^2}+6"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Prepisi razlomak kao stepen:{" "}
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
                Nadji izvod funkcije{" "}
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
                Nadji izvod funkcije{" "}
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
                Nadji izvod funkcije{" "}
                <InlineMath>{"f(x)=(5x-1)^6"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Spoljasnja funkcija je{" "}
                  <InlineMath>{"t^6"}</InlineMath>, unutrasnja{" "}
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
                Nadji izvod funkcije{" "}
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
                  Posto je{" "}
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
                Nadji izvod funkcije{" "}
                <InlineMath>
                  {"f(x)=\\frac{\\sqrt{x}}{x+1}"}
                </InlineMath>
                , za <InlineMath>{"x\\ge 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo pravilo kolicnika:</p>
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
                  Ovaj zadatak lepo spaja koren, domen i kolicnik.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Kljucna poruka"
        title="Diferenciranje nije puko pamcenje formula, vec prepoznavanje strukture funkcije"
        description="Kada vidis funkciju, ne reaguj odmah mehanicki. Prvo pitaj: od kojih slojeva je sastavljena? Ako razvijes tu naviku, tablica izvoda i pravila diferenciranja postaju alat koji radi za tebe, umesto zbirke formula koje stalno mesas."
      >
        <InsightCard title="Najvazniji princip">
          <p>
            Diferenciranje postaje stabilno tek kada mentalno razdvojis dva
            koraka: prepoznavanje oblika (zbir, proizvod, kolicnik, slozena
            funkcija) i mehanicku primenu pravila. Tada ne zavisiss od
            pamcenja, nego od razumevanja.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Rezime"
        title="Sta moras da poneses iz ove lekcije"
        description="Dobar rezime nije lista svega sto si video, nego spisak onoga bez cega ne smes da izadjes na zadatak. Sledece tacke treba da budu potpuno stabilne."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Znacenje izvoda</h3>
            <ul>
              <li>Izvod je lokalna brzina promene funkcije.</li>
              <li>Geometrijski, to je nagib tangente.</li>
              <li>Vrednost izvoda zavisi od tacke.</li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Tablica izvoda</h3>
            <ul>
              <li>
                Moras sigurno znati osnovne stepene, koren, reciprocnu,
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
              <li>Pravilo proizvoda za umnozak.</li>
              <li>Pravilo kolicnika za razlomak.</li>
              <li>Pravilo lanca za slozenu funkciju.</li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Sledeci logican korak</h3>
            <ul>
              <li>
                Primena izvoda na monotonost, ekstreme i tangente.
              </li>
              <li>
                Navikni se da posle racuna odmah pitas: sta ovaj izvod znaci za
                ponasanje funkcije?
              </li>
            </ul>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 58 zatvara temu tablice izvoda i pravila diferenciranja.
          Sledeci korak je primena izvoda na ispitivanje ponasanja funkcije:
          monotonost, ekstremi i tangente.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
