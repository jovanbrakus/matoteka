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
import ExpInequalityLab from "./ExpInequalityLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#pojam", label: "Pojam" },
  { href: "#monotonost", label: "Monotonost" },
  { href: "#postupak", label: "Postupak" },
  { href: "#interaktivni", label: "Interaktivni lab" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#obrasci", label: "Kljucne formule" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson28Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 28"
        title={
          <>
            Eksponencijalne{" "}
            <span className={cs.tHeroAccent}>nejednacine</span>
          </>
        }
        description="Ovde nije dovoljno da znas kako se resavaju eksponencijalne jednacine. Moras da razumes i kako se ponasa funkcija y = a^x: ako raste, znak ostaje isti; ako opada, znak se okrece. Upravo na toj tacki prijemni najcesce odvaja sigurno znanje od rutinskog racunanja."
        heroImageSrc="/api/lessons/28/hero"
        heroImageAlt="Apstraktna matematicka ilustracija za lekciju o eksponencijalnim nejednacinama"
        cards={[
          {
            label: "Sta ucis",
            description:
              "Kako da iz eksponencijalne nejednacine predjes na linearnu ili kvadratnu nejednacinu. Ucis redosled: baza, oblik zadatka, transformacija, pa tek onda resavanje.",
          },
          {
            label: "Najveca zamka",
            description:
              "Znak se ne menja zato sto je zadatak tezan, vec zato sto je baza izmedju nule i jedan. Ko ovo radi napamet, lako okrene znak i kad ne sme ili zaboravi da ga okrene kada mora.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa bazama 2, 4, 8, zatim 3, 9, 27 i smenom u = a^x pojavljuju se iznova. Brza promena baze i dobar uvid u intervale cesto vrede vise od dugog racuna.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90 do 110 minuta. Vredi proci sporije, jer ista logika kasnije ulazi i u logaritamske nejednacine.",
          },
          {
            label: "Predznanje",
            description:
              "Stepeni, linearne i kvadratne nejednacine. Posebno su vazni lekcija 26 i lekcija 27: grafik a^x i smena u = a^x.",
          },
          {
            label: "Glavna vestina",
            description:
              "Prepoznavanje da li znak ostaje ili se menja. To je prvi filter. Tek posle toga zadatak prelazi u poznati algebarski oblik.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija monotonosti. Vizuelno vidis vezu izmedju rasta ili pada funkcije, poredjenja eksponenata i skupa resenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Na prijemnom te cesce obori pogresna logika znaka nego tezina racuna"
        description="Eksponencijalne nejednacine izgledaju slicno kao eksponencijalne jednacine, ali imaju jednu dodatnu logicku zamku. Cim ne znas da li funkcija raste ili opada, lako dobijes potpuno pogresan interval resenja iako je ostatak racuna bio korektan."
      >
        <div className={s.grid3}>
          <SectionCard title="Isti obrasci se ponavljaju, ali sad moras da mislis i o smeru poredjenja">
            <p>
              Svodjenje na istu bazu i smena{" "}
              <InlineMath>{"u=a^x"}</InlineMath> ostaju, ali vise nije dovoljno
              &ldquo;naci vrednost&rdquo;. Moras da odredis ceo skup resenja.
            </p>
          </SectionCard>
          <SectionCard title="Rastuca funkcija cuva poredak, opadajuca ga okrece">
            <p>
              To je centralna ideja ove lekcije. Ako je razumes, pravila neces
              uciti napamet nego ces ih izvoditi iz smisla.
            </p>
          </SectionCard>
          <SectionCard title="Jedna ista greska se stalno pojavljuje u testovima">
            <p>
              Zadaci ciljaju baze manje od 1 kao sto su{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath>,{" "}
              <InlineMath>{"\\tfrac{1}{3}"}</InlineMath>,{" "}
              <InlineMath>{"\\tfrac{1}{4}"}</InlineMath>, ili kombinacije poput{" "}
              <InlineMath>{"4"}</InlineMath> i{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Pre prvog racuna pitaj sebe tri stvari: koja je baza, mogu li baze
            da se povezu i da li u zadatku prepoznajem izraz{" "}
            <InlineMath>{"a^x"}</InlineMath> kao novu promenljivu.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: sta je vaznije od samog racunanja?"
          answer={
            <p>
              Ako si u zadatku odmah krenuo da izjednacavas eksponente, a nisi
              proverio da li je baza veca ili manja od{" "}
              <InlineMath>{"1"}</InlineMath>, preskocio si najvazniji korak. Kod
              nejednacina redosled je: <strong>baza, oblik, racun</strong>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POJAM ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow="Pojam i ideja"
        title="Sta zovemo eksponencijalnom nejednacinom"
        description={
          "To je nejednacina u kojoj se nepoznata pojavljuje u eksponentu. Najjednostavniji oblik je a^{f(x)} \u25FB a^{g(x)}, ali zadaci cesto dolaze i kao zbir ili razlika vise eksponencijalnih clanova, ili kao kvadratna nejednacina po izrazu a^x."
        }
      >
        <div className={s.grid2}>
          <SectionCard title="Tri lica iste teme">
            <MathBlock>{"a^{f(x)} \\square\\, a^{g(x)}"}</MathBlock>
            <MathBlock>{"a^{mx+n} \\square\\, b^{px+q}"}</MathBlock>
            <MathBlock>
              {"A\\cdot a^{2x} + B\\cdot a^x + C \\square\\, 0"}
            </MathBlock>
            <p>
              Prvi oblik trazi razumevanje monotonosti. Drugi trazi povezivanje
              baza. Treci trazi smenu <InlineMath>{"u=a^x"}</InlineMath> i
              resavanje nejednacine u novoj promenljivoj.
            </p>
          </SectionCard>

          <SectionCard title="Sta proveravas pre nego sto krene racun">
            <ul>
              <li>
                Da li je baza veca od <InlineMath>{"1"}</InlineMath> ili izmedju{" "}
                <InlineMath>{"0"}</InlineMath> i <InlineMath>{"1"}</InlineMath>?
              </li>
              <li>
                Da li baze mogu da se svedu na zajednicku osnovu, na primer{" "}
                <InlineMath>{"4=2^2"}</InlineMath>,{" "}
                <InlineMath>{"8=2^3"}</InlineMath>,{" "}
                <InlineMath>{"27=3^3"}</InlineMath>?
              </li>
              <li>
                Da li se pojavljuju clanovi{" "}
                <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, pa mogu da uvedem{" "}
                <InlineMath>{"u=a^x>0"}</InlineMath>?
              </li>
              <li>
                Da li je nejednakost stroga ili nestriktna, odnosno da li
                krajevi intervala ulaze u resenje?
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Obrazac 1: Direktno poredjenje eksponenata">
            <p>
              Ako su baze iste, glavni posao je da pravilno preneses nejednakost
              na eksponente.
            </p>
          </SectionCard>
          <SectionCard title="Obrazac 2: Prevodjenje na istu bazu">
            <p>
              Kod baza <InlineMath>{"4"}</InlineMath> i{" "}
              <InlineMath>{"8"}</InlineMath>, ili{" "}
              <InlineMath>{"\\tfrac{1}{4}"}</InlineMath> i{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath>, stvar resava dobra
              promena oblika pre bilo kakvog resavanja.
            </p>
          </SectionCard>
          <SectionCard title="Obrazac 3: Smena u = a^x">
            <p>
              Kada vidis <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
              <InlineMath>{"a^x"}</InlineMath>, cesto resavas obicnu kvadratnu
              nejednacinu uz obavezni uslov <InlineMath>{"u>0"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: da li je 2^x + 3 < 10 eksponencijalna nejednacina?"
          }
          answer={
            <p>
              Jeste, jer se nepoznata <InlineMath>{"x"}</InlineMath> nalazi u
              eksponentu u clanu <InlineMath>{"2^x"}</InlineMath>. Iako je
              ostatak izraza algebarski jednostavan, pristup resavanju i dalje
              koristi osobine eksponencijalne funkcije.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MONOTONOST ═══════════ */}
      <LessonSection
        id="monotonost"
        eyebrow="Monotonost"
        title="Zasto se znak nekad cuva, a nekad obrce"
        description="Ovo je srce cele lekcije. Eksponencijalna funkcija y = a^x je strogo monotona. Kada a > 1, ona raste. Kada je 0 < a < 1, ona opada. Zbog toga je poredjenje vrednosti funkcije isto sto i poredjenje eksponenata samo kod rastuce funkcije; kod opadajuce se poredak obrce."
      >
        <div className={s.grid2}>
          <SectionCard title="Slucaj a > 1: funkcija raste i cuva poredak">
            <MathBlock>
              {"p < q \\Rightarrow a^p < a^q"}
            </MathBlock>
            <MathBlock>
              {"a^{f(x)} \\le a^{g(x)} \\Rightarrow f(x) \\le g(x)"}
            </MathBlock>
            <p>
              Na primer, posto je <InlineMath>{"2^x"}</InlineMath> rastuca
              funkcija, iz <InlineMath>{"2^{x+1} > 2^3"}</InlineMath> odmah
              sledi <InlineMath>{"x+1>3"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Slucaj 0 < a < 1: funkcija opada i obrce poredak">
            <MathBlock>
              {"p < q \\Rightarrow a^p > a^q"}
            </MathBlock>
            <MathBlock>
              {"a^{f(x)} \\le a^{g(x)} \\Rightarrow f(x) \\ge g(x)"}
            </MathBlock>
            <p>
              Na primer, posto je{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^x"}</InlineMath>{" "}
              opadajuca funkcija, iz{" "}
              <InlineMath>
                {
                  "\\left(\\tfrac{1}{2}\\right)^{2x-1} \\le \\left(\\tfrac{1}{2}\\right)^3"
                }
              </InlineMath>{" "}
              sledi <InlineMath>{"2x-1 \\ge 3"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Veci eksponent ne znaci uvek vecu vrednost">
            <p>
              Kod baze <InlineMath>{"2"}</InlineMath> eksponent{" "}
              <InlineMath>{"5"}</InlineMath> daje vecu vrednost od eksponenta{" "}
              <InlineMath>{"2"}</InlineMath>. Kod baze{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath> desava se suprotno:{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^5"}</InlineMath> je
              manje od{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^2"}</InlineMath>. Zato
              baza odlucuje kako citas nejednacinu.
            </p>
          </SectionCard>
          <SectionCard title="Ne menjas znak zato sto je eksponencijalno, nego zato sto je funkcija opadajuca">
            <p>
              Ovo je precizna formulacija koju vredi zapamtiti. Ako umes ovako
              da je izgovoris, mnogo je manja sansa da pravilo pomesas u
              zadatku.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: sta sledi iz (1/3)^{x+2} > (1/3)^4?"
          }
          answer={
            <p>
              Posto je baza <InlineMath>{"\\tfrac{1}{3}"}</InlineMath> izmedju{" "}
              <InlineMath>{"0"}</InlineMath> i <InlineMath>{"1"}</InlineMath>,
              funkcija opada. Zato se znak obrce:{" "}
              <InlineMath>{"x+2 < 4"}</InlineMath>, pa je{" "}
              <InlineMath>{"x < 2"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POSTUPAK ═══════════ */}
      <LessonSection
        id="postupak"
        eyebrow="Standardni postupak"
        title="Kako prepoznajes koji metod resavanja treba primeniti"
        description="Iza vecine zadataka stoje cetiri prepoznatljiva obrasca. Vazno je da ih vidis brzo, jer se tada eksponencijalna nejednacina svodi na nesto sto vec dobro umes: linearnu nejednacinu, kvadratnu nejednacinu ili interval po smeni u = a^x."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="1. Ista baza: poredi eksponente"
            formula={"2^{x+1} > 2^5 \\Rightarrow x+1 > 5"}
            note="Najjednostavniji slucaj. Cela poenta je u pravilnom citanju monotonosti."
          />
          <FormulaCard
            title="2. Povezane baze: svedi na jednu osnovu"
            formula={"4^x \\ge 8^{x-1} \\Rightarrow 2^{2x} \\ge 2^{3x-3}"}
            note="Najpre prevedi baze, pa tek onda uporedjuj eksponente."
          />
          <FormulaCard
            title="3. Izdvajanje faktora"
            formula={"2^{x+1}+2^x < 12 \\Rightarrow 3\\cdot 2^x < 12"}
            note={
              <>
                Cesto je dovoljno da iskoristis{" "}
                <InlineMath>{"a^{x+1}=a\\cdot a^x"}</InlineMath>.
              </>
            }
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <FormulaCard
            title={`4. Smena: uvodis u = a^x > 0`}
            formula={"2^{2x}-5\\cdot 2^x+4 \\ge 0 \\Rightarrow u^2-5u+4 \\ge 0"}
            note={
              <>
                Posle resavanja po <InlineMath>{"u"}</InlineMath> obavezno se
                vracas na promenljivu <InlineMath>{"x"}</InlineMath>.
              </>
            }
          />
        </div>

        <InsightCard title="Pedagoski trik">
          <p>
            Ako vidis <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
            <InlineMath>{"a^x"}</InlineMath>, skoro sigurno treba da pomislis na
            smenu. Ako vidis baze <InlineMath>{"4"}</InlineMath> i{" "}
            <InlineMath>{"8"}</InlineMath>, skoro sigurno treba da pomislis na
            zajednicku osnovu <InlineMath>{"2"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: kada je uslov u = a^x > 0 zaista vazan?"
          answer={
            <p>
              Vazan je uvek, ali se najjace vidi kada kvadratna nejednacina po{" "}
              <InlineMath>{"u"}</InlineMath> daje intervale koji zahvataju i
              negativne brojeve. Tada negativni deo moras da odbacis, jer{" "}
              <InlineMath>{"a^x"}</InlineMath> za dozvoljenu bazu nikada nije
              negativan.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI LAB ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: promena ili cuvanje znaka u realnom vremenu"
        description="Menjaj bazu, znak i koeficijente u eksponentima. Levo vidis kako izgleda y = a^t, a desno kako se ponasaju eksponenti. Donja brojna prava pokazuje konacni skup resenja."
      >
        <ExpInequalityLab />

        <MicroCheck
          question="Mikro-provera: sta se desi ako istu nejednacinu prebacis sa baze 1/2 na bazu 2?"
          answer={
            <p>
              Dobijes novi zapis sa bazom vecom od <InlineMath>{"1"}</InlineMath>
              , ali se minus iz negativnog eksponenta seli u linearnu
              nejednacinu. Znak ne menjas po navici dva puta. Menja se samo onda
              kada zaista delis ili mnozis nejednacinu negativnim brojem, ili
              kada radis sa opadajucom funkcijom.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Detaljni zadaci, korak po korak"
        description="Primeri su poredjani tako da prvo ucvrste osnovnu logiku, a zatim polako uvedu tipicne prijemne oblike. Nemoj samo da pratis racun: gledaj zasto je bas taj metod izabran."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Resi <InlineMath>{"2^{x+1} > 8"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prepoznaj istu bazu."
              >
                <p>
                  <InlineMath>{"8 = 2^3"}</InlineMath>, pa zadatak postaje
                </p>
                <MathBlock>{"2^{x+1} > 2^3"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Baza je <InlineMath>{"2>1"}</InlineMath>, pa funkcija raste.
                  </>
                }
              >
                <p>Znak se ne menja:</p>
                <MathBlock>{"x+1 > 3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Resi linearnu nejednacinu.">
                <MathBlock>{"x > 2"}</MathBlock>
                <p>
                  Skup resenja: <InlineMath>{"S=(2,\\infty)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Resi{" "}
              <InlineMath>
                {"\\left(\\tfrac{1}{2}\\right)^{3x-1} \\le 8"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Desnu stranu napisi u istoj osnovi.">
                <MathBlock>
                  {"8 = 2^3 = \\left(\\tfrac{1}{2}\\right)^{-3}"}
                </MathBlock>
                <p>
                  Dobijamo{" "}
                  <InlineMath>
                    {
                      "\\left(\\tfrac{1}{2}\\right)^{3x-1} \\le \\left(\\tfrac{1}{2}\\right)^{-3}"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Baza je <InlineMath>{"\\tfrac{1}{2}"}</InlineMath> izmedju{" "}
                    <InlineMath>{"0"}</InlineMath> i{" "}
                    <InlineMath>{"1"}</InlineMath>, funkcija opada.
                  </>
                }
              >
                <p>Znak se obrce:</p>
                <MathBlock>{"3x-1 \\ge -3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Resi linearnu nejednacinu.">
                <MathBlock>
                  {"3x \\ge -2 \\Rightarrow x \\ge -\\tfrac{2}{3}"}
                </MathBlock>
                <p>
                  Skup resenja:{" "}
                  <InlineMath>
                    {"S=\\left[-\\tfrac{2}{3},\\infty\\right)"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Resi{" "}
              <InlineMath>{"4^x \\ge 8^{x-1}"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Prevedi obe strane na osnovu <InlineMath>{"2"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {
                    "4^x = (2^2)^x = 2^{2x}, \\qquad 8^{x-1} = (2^3)^{x-1} = 2^{3x-3}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Ista baza <InlineMath>{"2>1"}</InlineMath>, pa znak ostaje.
                  </>
                }
              >
                <MathBlock>{"2x \\ge 3x - 3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izoluj x.">
                <MathBlock>
                  {"-x \\ge -3 \\Rightarrow x \\le 3"}
                </MathBlock>
                <p>
                  Skup resenja:{" "}
                  <InlineMath>{"S=(-\\infty,3]"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Resi{" "}
              <InlineMath>{"2^{x+1}+2^x < 12"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Iskoristi{" "}
                    <InlineMath>{"2^{x+1}=2\\cdot 2^x"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {"2\\cdot 2^x + 2^x < 12 \\Rightarrow 3\\cdot 2^x < 12"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Podeli sa 3.">
                <MathBlock>{"2^x < 4 = 2^2"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Baza je <InlineMath>{"2>1"}</InlineMath>, pa znak ostaje.
                  </>
                }
              >
                <MathBlock>{"x < 2"}</MathBlock>
                <p>
                  Skup resenja:{" "}
                  <InlineMath>{"S=(-\\infty,2)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Resi{" "}
              <InlineMath>{"2^{2x}-5\\cdot 2^x+4 \\ge 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Uvedi smenu <InlineMath>{"u=2^x"}</InlineMath>. Vazno:{" "}
                    <InlineMath>{"u>0"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"u^2 - 5u + 4 \\ge 0"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Faktorisi kvadratni polinom.">
                <MathBlock>{"(u-1)(u-4) \\ge 0"}</MathBlock>
                <p>
                  Otuda sledi <InlineMath>{"u \\le 1"}</InlineMath> ili{" "}
                  <InlineMath>{"u \\ge 4"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Vrati se na x.">
                <MathBlock>
                  {"2^x \\le 1 \\quad \\text{ili} \\quad 2^x \\ge 4"}
                </MathBlock>
                <p>
                  Posto je baza <InlineMath>{"2>1"}</InlineMath>, dobijamo{" "}
                  <InlineMath>{"x \\le 0"}</InlineMath> ili{" "}
                  <InlineMath>{"x \\ge 2"}</InlineMath>.
                </p>
                <p>
                  Skup resenja:{" "}
                  <InlineMath>
                    {"S=(-\\infty,0]\\cup[2,\\infty)"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Resi{" "}
              <InlineMath>{"2^{2x}+5\\cdot 2^x+6 \\le 0"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Uvedi <InlineMath>{"u=2^x>0"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {"u^2+5u+6 \\le 0 \\Rightarrow (u+2)(u+3) \\le 0"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Negativan interval."
              >
                <p>
                  Nejednacina po <InlineMath>{"u"}</InlineMath> ima resenja za{" "}
                  <InlineMath>{"-3 \\le u \\le -2"}</InlineMath>, ali to su
                  negativne vrednosti.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Posto je <InlineMath>{"u=2^x>0"}</InlineMath>, nijedna od
                    tih vrednosti nije dozvoljena.
                  </>
                }
              >
                <p>
                  Skup resenja: <InlineMath>{"S=\\varnothing"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto je u petom primeru bilo vazno sto je nejednacina >= 0, a ne > 0?"
          answer={
            <p>
              Zato sto se kod <InlineMath>{"\\ge 0"}</InlineMath> krajevi
              intervala ukljucuju. Zbog toga su i{" "}
              <InlineMath>{"u=1"}</InlineMath> i{" "}
              <InlineMath>{"u=4"}</InlineMath> dozvoljeni, pa kasnije dobijamo i{" "}
              <InlineMath>{"x=0"}</InlineMath> i{" "}
              <InlineMath>{"x=2"}</InlineMath> kao deo resenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Zakoni i kljucne formule"
        title="Obrasci koje treba da vidis cim procitas zadatak"
        description="Ove kartice nisu tu da ih mehanicki pamtis, vec da ti pomognu da brzo prepoznas pravi put resavanja. Kada obrazac vidis na vreme, ceo zadatak postaje kraci i mirniji."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Monotonost za a > 1"
            formula={"a^{f(x)} \\square\\, a^{g(x)} \\Rightarrow f(x) \\square\\, g(x)"}
            note="Znak ostaje isti."
          />
          <FormulaCard
            title="Monotonost za 0 < a < 1"
            formula={"a^{f(x)} \\le a^{g(x)} \\Rightarrow f(x) \\ge g(x)"}
            note="Znak se obrce."
          />
          <FormulaCard
            title="Povezivanje baza"
            formula={"4=2^2,\\quad 8=2^3,\\quad 9=3^2,\\quad 27=3^3"}
            note="Pretvori sve u isti jezik."
          />
          <FormulaCard
            title="Rastavljanje eksponenta"
            formula={"a^{x+k} = a^x \\cdot a^k"}
            note="Izdvajanje zajednickog faktora."
          />
          <FormulaCard
            title="Smena"
            formula={"u = a^x, \\qquad u > 0"}
            note="Nova promenljiva mora ostati pozitivna."
          />
          <FormulaCard
            title="Krajevi intervala"
            formula={">\\,,< \\;\\text{ ne ukljucuju kraj;} \\quad \\ge\\,,\\le \\;\\text{ ukljucuju kraj.}"}
            note="Stroga i nestriktna nejednakost nisu isto."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Mesta na kojima se najlakse gube poeni"
        description='Ove greske nisu slucajne. One su tipicne zato sto zadaci cesto izgledaju "skoro isto". Bas zato je vazno da svaku od njih umes da prepoznas dok jos pises prvi red resenja.'
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Okretanje znaka i kada je baza veca od{" "}
              <InlineMath>{"1"}</InlineMath>
            </h3>
            <p>
              Ispravno: kod baze <InlineMath>{"2"}</InlineMath>,{" "}
              <InlineMath>{"3"}</InlineMath>, <InlineMath>{"5"}</InlineMath> i
              slicno funkcija raste, pa se znak ne menja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljanje da{" "}
              <InlineMath>{"\\tfrac{1}{4}=(2)^{-2}"}</InlineMath>
            </h3>
            <p>
              Vazno: ako predjes na bazu <InlineMath>{"2"}</InlineMath>, znak se
              tada ne menja zbog baze, ali se moze promeniti kasnije kada delis
              nejednacinu sa negativnim brojem.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Poredjenje eksponenata pre nego sto su baze zaista iste
            </h3>
            <p>
              Primer: iz <InlineMath>{"4^x \\ge 8^{x-1}"}</InlineMath> ne smes
              odmah pisati <InlineMath>{"x \\ge x-1"}</InlineMath>. Prvo baze
              moraju biti povezane.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zadrzavanje negativnih vrednosti za{" "}
              <InlineMath>{"u=a^x"}</InlineMath>
            </h3>
            <p>
              Podsetnik: cak i ako kvadratna nejednacina po{" "}
              <InlineMath>{"u"}</InlineMath> formalno daje negativan interval,
              on se odbacuje jer je <InlineMath>{"a^x>0"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nepravilno ukljucivanje krajeva intervala
            </h3>
            <p>
              Prati znak: kod <InlineMath>{"\\le"}</InlineMath> i{" "}
              <InlineMath>{"\\ge"}</InlineMath> krajevi ulaze, kod{" "}
              <InlineMath>{"<"}</InlineMath> i <InlineMath>{">"}</InlineMath> ne
              ulaze. Na prijemnom se i na tome gube poeni.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Previse rano posezanje za logaritmima
            </h3>
            <p>
              Praksa: vecina zadataka iz ove lekcije resava se bez logaritama.
              Ako mozes da svedes na istu bazu ili na smenu, to je cistiji put.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da organizujes resavanje pod pritiskom vremena"
        description="Na prijemnom zadaci iz ove oblasti cesto nisu dugi, ali su namerno postavljeni tako da te navedu na jednu od standardnih gresaka. Zato je najbolja taktika da pratis jasan, kratak redosled."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet koraka koji stede vreme">
            <ul>
              <li>
                Proveri bazu: da li je <InlineMath>{"a>1"}</InlineMath> ili{" "}
                <InlineMath>{"0<a<1"}</InlineMath>?
              </li>
              <li>
                Ako baze nisu iste, povezi ih preko zajednicke osnove.
              </li>
              <li>
                Ako vidis <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, uvedi{" "}
                <InlineMath>{"u=a^x>0"}</InlineMath>.
              </li>
              <li>Resi dobijenu linearnu ili kvadratnu nejednacinu.</li>
              <li>
                Vrati se na <InlineMath>{"x"}</InlineMath> i proveri krajeve
                intervala.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Sta zadatak pokusava da sakrije">
            <ul>
              <li>
                Bazu manju od <InlineMath>{"1"}</InlineMath>, da bi te naterao
                na pogresan smer znaka.
              </li>
              <li>
                Baze <InlineMath>{"4"}</InlineMath>,{" "}
                <InlineMath>{"8"}</InlineMath>, <InlineMath>{"9"}</InlineMath>,{" "}
                <InlineMath>{"27"}</InlineMath>, da bi proverio da li vidis vezu
                sa <InlineMath>{"2"}</InlineMath> ili{" "}
                <InlineMath>{"3"}</InlineMath>.
              </li>
              <li>
                Kvadratnu formu po <InlineMath>{"a^x"}</InlineMath>, da bi
                proverio da li pamtis uslov <InlineMath>{"u>0"}</InlineMath>.
              </li>
              <li>
                Strogu nejednacinu, da bi proverio da li umes da iskljucis
                krajeve intervala.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Jedna misaona navika pravi veliku razliku">
          <p>
            Umesto da pitas &ldquo;kako da resim ovaj zadatak?&rdquo;, pitaj
            &ldquo;na sta mogu da ga svedem?&rdquo;. To je mnogo efikasniji
            nacin razmisljanja za prijemni.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li umes samostalno"
        description="Pokusaj prvo bez otvaranja resenja. Ako negde zapnes, ne gledaj odmah sve korake; pokusaj makar da odredis koji metod treba primeniti."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Resi <InlineMath>{"3^{x-2} < 9"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"9=3^2"}</InlineMath>, pa dobijamo{" "}
                  <InlineMath>{"3^{x-2} < 3^2"}</InlineMath>. Baza je{" "}
                  <InlineMath>{"3>1"}</InlineMath>, zato{" "}
                  <InlineMath>{"x-2 < 2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x < 4"}</InlineMath>.
                </p>
                <MathBlock>{"S=(-\\infty,4)"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 2"
            problem={
              <p>
                Resi{" "}
                <InlineMath>
                  {
                    "\\left(\\tfrac{1}{4}\\right)^{2x+1} \\ge \\left(\\tfrac{1}{2}\\right)^6"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Pisemo{" "}
                  <InlineMath>
                    {
                      "\\left(\\tfrac{1}{4}\\right)^{2x+1}=\\left(\\tfrac{1}{2}\\right)^{4x+2}"
                    }
                  </InlineMath>
                  . Tada{" "}
                  <InlineMath>
                    {
                      "\\left(\\tfrac{1}{2}\\right)^{4x+2} \\ge \\left(\\tfrac{1}{2}\\right)^6"
                    }
                  </InlineMath>
                  . Baza je izmedju <InlineMath>{"0"}</InlineMath> i{" "}
                  <InlineMath>{"1"}</InlineMath>, pa se znak obrce:{" "}
                  <InlineMath>{"4x+2 \\le 6"}</InlineMath>. Dobijamo{" "}
                  <InlineMath>{"x \\le 1"}</InlineMath>.
                </p>
                <MathBlock>{"S=(-\\infty,1]"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 3"
            problem={
              <p>
                Resi <InlineMath>{"25^x > 5^{x+2}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"25^x=(5^2)^x=5^{2x}"}</InlineMath>, pa je{" "}
                  <InlineMath>{"5^{2x} > 5^{x+2}"}</InlineMath>. Posto je baza{" "}
                  <InlineMath>{"5>1"}</InlineMath>, sledi{" "}
                  <InlineMath>{"2x > x+2"}</InlineMath>, pa{" "}
                  <InlineMath>{"x > 2"}</InlineMath>.
                </p>
                <MathBlock>{"S=(2,\\infty)"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 4"
            problem={
              <p>
                Resi{" "}
                <InlineMath>{"2^{x+1}+2^x \\le 24"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Izdvoj <InlineMath>{"2^x"}</InlineMath>:{" "}
                  <InlineMath>{"2\\cdot 2^x + 2^x \\le 24"}</InlineMath>,
                  odnosno{" "}
                  <InlineMath>{"3\\cdot 2^x \\le 24"}</InlineMath>. Dakle,{" "}
                  <InlineMath>{"2^x \\le 8 = 2^3"}</InlineMath>. Kako je baza{" "}
                  <InlineMath>{"2>1"}</InlineMath>, dobijamo{" "}
                  <InlineMath>{"x \\le 3"}</InlineMath>.
                </p>
                <MathBlock>{"S=(-\\infty,3]"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 5"
            problem={
              <p>
                Resi{" "}
                <InlineMath>{"9^x - 10\\cdot 3^x + 9 < 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uvedi <InlineMath>{"u=3^x>0"}</InlineMath>. Tada je{" "}
                  <InlineMath>{"9^x=(3^2)^x=3^{2x}=u^2"}</InlineMath>, pa
                  dobijamo{" "}
                  <InlineMath>{"u^2-10u+9 < 0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(u-1)(u-9) < 0"}</InlineMath>. Zato je{" "}
                  <InlineMath>{"1 < u < 9"}</InlineMath>. Vracamo se na{" "}
                  <InlineMath>{"x"}</InlineMath>:{" "}
                  <InlineMath>{"1 < 3^x < 9"}</InlineMath>, pa{" "}
                  <InlineMath>{"0 < x < 2"}</InlineMath>.
                </p>
                <MathBlock>{"S=(0,2)"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 6"
            problem={
              <p>
                Resi{" "}
                <InlineMath>{"4^x - 5\\cdot 2^x + 4 > 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uvedi <InlineMath>{"u=2^x>0"}</InlineMath>. Tada je{" "}
                  <InlineMath>{"4^x=u^2"}</InlineMath>, pa dobijamo{" "}
                  <InlineMath>{"u^2-5u+4 > 0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(u-1)(u-4) > 0"}</InlineMath>. Zato je{" "}
                  <InlineMath>{"u < 1"}</InlineMath> ili{" "}
                  <InlineMath>{"u > 4"}</InlineMath>. Posto je{" "}
                  <InlineMath>{"u>0"}</InlineMath>, ostaje{" "}
                  <InlineMath>{"0 < u < 1"}</InlineMath> ili{" "}
                  <InlineMath>{"u > 4"}</InlineMath>. Vracanjem dobijamo{" "}
                  <InlineMath>{"x < 0"}</InlineMath> ili{" "}
                  <InlineMath>{"x > 2"}</InlineMath>.
                </p>
                <MathBlock>{"S=(-\\infty,0)\\cup(2,\\infty)"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 7"
            problem={
              <p>
                Odredi skup resenja{" "}
                <InlineMath>{"2^{2x}+5\\cdot 2^x+6 \\le 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Po smeni <InlineMath>{"u=2^x>0"}</InlineMath> dobijamo{" "}
                  <InlineMath>{"u^2+5u+6 \\le 0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(u+2)(u+3) \\le 0"}</InlineMath>. To vazi samo
                  za <InlineMath>{"-3 \\le u \\le -2"}</InlineMath>, ali su to
                  negativne vrednosti. Kako{" "}
                  <InlineMath>{"u=2^x"}</InlineMath> ne moze biti negativan,
                  resenja nema.
                </p>
                <MathBlock>{"S=\\varnothing"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="Prvo odlucujes kako se funkcija ponasa, pa tek onda racunas"
        description="Ako iz ove lekcije poneses samo jednu recenicu, neka bude ova: baza odredjuje logiku nejednacine. Kada to uocis na vreme, zadatak se mirno svodi na poznat algebarski postupak."
      >
        <InsightCard title="Najvazniji princip">
          <MathBlock>
            {
              "\\begin{gathered} a^{f(x)} < a^{g(x)} \\Longrightarrow f(x)<g(x) \\quad (a>1) \\\\ a^{f(x)} < a^{g(x)} \\Longrightarrow f(x)>g(x) \\quad (0<a<1) \\end{gathered}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da zapamtis posle ove lekcije"
        description="Ovo su tacke koje treba da ostanu sigurne i kada zadatak izgleda komplikovano. Ako njih drzis pod kontrolom, eksponencijalne nejednacine postaju znatno mirnija oblast."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Baza vodi pricu</h3>
            <p>
              Za <InlineMath>{"a>1"}</InlineMath> znak ostaje, za{" "}
              <InlineMath>{"0<a<1"}</InlineMath> znak se obrce. To nije trik,
              nego posledica monotonosti eksponencijalne funkcije.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Prvo sredi oblik</h3>
            <p>
              Povezi baze, izdvoj faktor ili uvedi smenu. Ne resavaj naslepo.
              Najpre prepoznaj u koji standardni obrazac zadatak spada.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Kod smene vazi <InlineMath>{"u>0"}</InlineMath>
            </h3>
            <p>
              Interval po <InlineMath>{"u"}</InlineMath> nikada ne prihvataj bez
              preseka sa pozitivnom poluosom. Ovo je obavezna kontrola kojom se
              uklanjaju nedozvoljeni delovi resenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Krajevi su vazni</h3>
            <p>
              Pazi da li je nejednacina stroga ili nestriktna. Otvorena i
              zatvorena krajnja tacka nisu ista stvar, posebno na prijemnom.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci logican korak u ucenju je prelazak na logaritme i logaritamske
          funkcije. Tamo se prica o monotonosti vraca, samo u novom ruhu.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
