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
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#pojam", label: "Pojam" },
  { href: "#monotonost", label: "Monotonost" },
  { href: "#postupak", label: "Postupak" },
  { href: "#interaktivni", label: "Interaktivni lab" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson28Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 28"
        title={
          <>
            Eksponencijalne{" "}
            <span className={cs.tHeroAccent}>nejednačine</span>
          </>
        }
        description="Ovde nije dovoljno da znaš kako se rešavaju eksponencijalne jednačine. Moraš da razumeš i kako se ponaša funkcija y = a^x: ako raste, znak ostaje isti; ako opada, znak se okreće. Upravo na toj tački prijemni najčešće odvaja sigurno znanje od rutinskog računanja."
        heroImageSrc="/api/lessons/28/hero"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o eksponencijalnim nejednačinama"
        cards={[
          {
            label: "Šta učiš",
            description:
              "Kako da iz eksponencijalne nejednačine pređeš na linearnu ili kvadratnu nejednačinu. Učiš redosled: baza, oblik zadatka, transformacija, pa tek onda rešavanje.",
          },
          {
            label: "Najveća zamka",
            description:
              "Znak se ne menja zato sto je zadatak težan, već zato sto je baza između nule i jedan. Ko ovo radi napamet, lako okrene znak i kad ne sme ili zaboravi da ga okrene kada mora.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa bazama 2, 4, 8, zatim 3, 9, 27 i smenom u = a^x pojavljuju se iznova. Brza promena baze i dobar uvid u intervale često vrede više od dugog računa.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90 do 110 minuta. Vredi proci sporije, jer ista logika kasnije ulazi i u logaritamske nejednačine.",
          },
          {
            label: "Predznanje",
            description:
              "Stepeni, linearne i kvadratne nejednačine. Posebno su važni lekcija 26 i lekcija 27: grafik a^x i smena u = a^x.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznavanje da li znak ostaje ili se menja. To je prvi filter. Tek posle toga zadatak prelazi u poznati algebarski oblik.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija monotonosti. Vizuelno vidiš vezu između rasta ili pada funkcije, poređenja eksponenata i skupa rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Na prijemnom te češće obori pogrešna logika znaka nego težina računa"
        description="Eksponencijalne nejednačine izgledaju slično kao eksponencijalne jednačine, ali imaju jednu dodatnu logičku zamku. Cim ne znaš da li funkcija raste ili opada, lako dobiješ potpuno pogresan interval rešenja iako je ostatak računa bio korektan."
      >
        <div className={s.grid3}>
          <SectionCard title="Isti obrasci se ponavljaju, ali sad moraš da misliš i o smeru poređenja">
            <p>
              Svođenje na istu bazu i smena{" "}
              <InlineMath>{"u=a^x"}</InlineMath> ostaju, ali više nije dovoljno
              &ldquo;naci vrednost&rdquo;. Moraš da određiš ceo skup rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Rastuća funkcija čuva poredak, opadajuća ga okreće">
            <p>
              To je centralna ideja ove lekcije. Ako je razumeš, pravila nećes
              učiti napamet nego ćeš ih izvoditi iz smisla.
            </p>
          </SectionCard>
          <SectionCard title="Jedna ista greška se stalno pojavljuje u testovima">
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
            Pre prvog računa pitaj sebe tri stvari: koja je baza, mogu li baze
            da se povezu i da li u zadatku prepoznajem izraz{" "}
            <InlineMath>{"a^x"}</InlineMath> kao novu promenljivu.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: šta je važnije od samog računanja?"
          answer={
            <p>
              Ako si u zadatku odmah krenuo da izjednacavas eksponente, a nisi
              proverio da li je baza veca ili manja od{" "}
              <InlineMath>{"1"}</InlineMath>, preskočio si najvažniji korak. Kod
              nejednačina redosled je: <strong>baza, oblik, račun</strong>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POJAM ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow="Pojam i ideja"
        title="Šta zovemo eksponencijalnom nejednačinom"
        description={
          "To je nejednačina u kojoj se nepoznata pojavljuje u eksponentu. Najjednostavniji oblik je a^{f(x)} \u25FB a^{g(x)}, ali zadaci često dolaze i kao zbir ili razlika više eksponencijalnih članova, ili kao kvadratna nejednačina po izrazu a^x."
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
              Prvi oblik traži razumevanje monotonosti. Drugi traži povezivanje
              baza. Treći traži smenu <InlineMath>{"u=a^x"}</InlineMath> i
              rešavanje nejednačine u novoj promenljivoj.
            </p>
          </SectionCard>

          <SectionCard title="Šta proveravaš pre nego sto krene račun">
            <ul>
              <li>
                Da li je baza veca od <InlineMath>{"1"}</InlineMath> ili između{" "}
                <InlineMath>{"0"}</InlineMath> i <InlineMath>{"1"}</InlineMath>?
              </li>
              <li>
                Da li baze mogu da se svedu na zajedničku osnovu, na primer{" "}
                <InlineMath>{"4=2^2"}</InlineMath>,{" "}
                <InlineMath>{"8=2^3"}</InlineMath>,{" "}
                <InlineMath>{"27=3^3"}</InlineMath>?
              </li>
              <li>
                Da li se pojavljuju članovi{" "}
                <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, pa mogu da uvedem{" "}
                <InlineMath>{"u=a^x>0"}</InlineMath>?
              </li>
              <li>
                Da li je nejednakost stroga ili nestriktna, odnosno da li
                krajevi intervala ulaze u rešenje?
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Obrazac 1: Direktno poređenje eksponenata">
            <p>
              Ako su baze iste, glavni posao je da pravilno preneses nejednakost
              na eksponente.
            </p>
          </SectionCard>
          <SectionCard title="Obrazac 2: Prevođenje na istu bazu">
            <p>
              Kod baza <InlineMath>{"4"}</InlineMath> i{" "}
              <InlineMath>{"8"}</InlineMath>, ili{" "}
              <InlineMath>{"\\tfrac{1}{4}"}</InlineMath> i{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath>, stvar rešava dobra
              promena oblika pre bilo kakvog rešavanja.
            </p>
          </SectionCard>
          <SectionCard title="Obrazac 3: Smena u = a^x">
            <p>
              Kada vidiš <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
              <InlineMath>{"a^x"}</InlineMath>, često rešavaš običnu kvadratnu
              nejednačinu uz obavezni uslov <InlineMath>{"u>0"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: da li je 2^x + 3 < 10 eksponencijalna nejednačina?"
          }
          answer={
            <p>
              Jeste, jer se nepoznata <InlineMath>{"x"}</InlineMath> nalazi u
              eksponentu u članu <InlineMath>{"2^x"}</InlineMath>. Iako je
              ostatak izraza algebarski jednostavan, pristup rešavanju i dalje
              koristi osobine eksponencijalne funkcije.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MONOTONOST ═══════════ */}
      <LessonSection
        id="monotonost"
        eyebrow="Monotonost"
        title="Zašto se znak nekad čuva, a nekad obrće"
        description="Ovo je srce cele lekcije. Eksponencijalna funkcija y = a^x je strogo monotona. Kada a > 1, ona raste. Kada je 0 < a < 1, ona opada. Zbog toga je poređenje vrednosti funkcije isto sto i poređenje eksponenata samo kod rastuće funkcije; kod opadajuće se poredak obrće."
      >
        <div className={s.grid2}>
          <SectionCard title="Slučaj a > 1: funkcija raste i čuva poredak">
            <MathBlock>
              {"p < q \\Rightarrow a^p < a^q"}
            </MathBlock>
            <MathBlock>
              {"a^{f(x)} \\le a^{g(x)} \\Rightarrow f(x) \\le g(x)"}
            </MathBlock>
            <p>
              Na primer, posto je <InlineMath>{"2^x"}</InlineMath> rastuća
              funkcija, iz <InlineMath>{"2^{x+1} > 2^3"}</InlineMath> odmah
              sledi <InlineMath>{"x+1>3"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Slučaj 0 < a < 1: funkcija opada i obrće poredak">
            <MathBlock>
              {"p < q \\Rightarrow a^p > a^q"}
            </MathBlock>
            <MathBlock>
              {"a^{f(x)} \\le a^{g(x)} \\Rightarrow f(x) \\ge g(x)"}
            </MathBlock>
            <p>
              Na primer, posto je{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^x"}</InlineMath>{" "}
              opadajuća funkcija, iz{" "}
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
          <SectionCard title="Veći eksponent ne znači uvek veću vrednost">
            <p>
              Kod baze <InlineMath>{"2"}</InlineMath> eksponent{" "}
              <InlineMath>{"5"}</InlineMath> daje veću vrednost od eksponenta{" "}
              <InlineMath>{"2"}</InlineMath>. Kod baze{" "}
              <InlineMath>{"\\tfrac{1}{2}"}</InlineMath> desava se suprotno:{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^5"}</InlineMath> je
              manje od{" "}
              <InlineMath>{"\\left(\\tfrac{1}{2}\\right)^2"}</InlineMath>. Zato
              baza odlučuje kako čitaš nejednačinu.
            </p>
          </SectionCard>
          <SectionCard title="Ne menjas znak zato sto je eksponencijalno, nego zato sto je funkcija opadajuća">
            <p>
              Ovo je precizna formulacija koju vredi zapamtiti. Ako umeš ovako
              da je izgovoris, mnogo je manja sansa da pravilo pomešaš u
              zadatku.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: šta sledi iz (1/3)^{x+2} > (1/3)^4?"
          }
          answer={
            <p>
              Posto je baza <InlineMath>{"\\tfrac{1}{3}"}</InlineMath> između{" "}
              <InlineMath>{"0"}</InlineMath> i <InlineMath>{"1"}</InlineMath>,
              funkcija opada. Zato se znak obrće:{" "}
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
        title="Kako prepoznaješ koji metod rešavanja treba primeniti"
        description="Iza većine zadataka stoje četiri prepoznatljiva obrasca. Važno je da ih vidiš brzo, jer se tada eksponencijalna nejednačina svodi na nesto sto već dobro umeš: linearnu nejednačinu, kvadratnu nejednačinu ili interval po smeni u = a^x."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="1. Ista baza: poredi eksponente"
            formula={"2^{x+1} > 2^5 \\Rightarrow x+1 > 5"}
            note="Najjednostavniji slučaj. Cela poenta je u pravilnom citanju monotonosti."
          />
          <FormulaCard
            title="2. Povezane baze: svedi na jednu osnovu"
            formula={"4^x \\ge 8^{x-1} \\Rightarrow 2^{2x} \\ge 2^{3x-3}"}
            note="Najpre prevedi baze, pa tek onda upoređuj eksponente."
          />
          <FormulaCard
            title="3. Izdvajanje faktora"
            formula={"2^{x+1}+2^x < 12 \\Rightarrow 3\\cdot 2^x < 12"}
            note={
              <>
                Često je dovoljno da iskoristiš{" "}
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
                Posle rešavanja po <InlineMath>{"u"}</InlineMath> obavezno se
                vraćas na promenljivu <InlineMath>{"x"}</InlineMath>.
              </>
            }
          />
        </div>

        <InsightCard title="Pedagoški trik">
          <p>
            Ako vidiš <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
            <InlineMath>{"a^x"}</InlineMath>, skoro sigurno treba da pomisliš na
            smenu. Ako vidiš baze <InlineMath>{"4"}</InlineMath> i{" "}
            <InlineMath>{"8"}</InlineMath>, skoro sigurno treba da pomisliš na
            zajedničku osnovu <InlineMath>{"2"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: kada je uslov u = a^x > 0 zaista važan?"
          answer={
            <p>
              Vazan je uvek, ali se najjace vidi kada kvadratna nejednačina po{" "}
              <InlineMath>{"u"}</InlineMath> daje intervale koji zahvataju i
              negativne brojeve. Tada negativni deo moraš da odbaciš, jer{" "}
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
        title="Canvas laboratorija: promena ili čuvanje znaka u realnom vremenu"
        description="Menjaj bazu, znak i koeficijente u eksponentima. Levo vidiš kako izgleda y = a^t, a desno kako se ponašaju eksponenti. Donja brojna prava pokazuje konačni skup rešenja."
      >
        <ExpInequalityLab />

        <MicroCheck
          question="Mikro-provera: šta se desi ako istu nejednačinu prebacis sa baze 1/2 na bazu 2?"
          answer={
            <p>
              Dobijes novi zapis sa bazom vecom od <InlineMath>{"1"}</InlineMath>
              , ali se minus iz negativnog eksponenta seli u linearnu
              nejednačinu. Znak ne menjas po navici dva puta. Menja se samo onda
              kada zaista deliš ili množiš nejednačinu negativnim brojem, ili
              kada radiš sa opadajućom funkcijom.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljni zadaci, korak po korak"
        description="Primeri su poredjani tako da prvo učvrste osnovnu logiku, a zatim polako uvedu tipične prijemne oblike. Nemoj samo da pratis račun: gledaj zašto je baš taj metod izabran."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Reši <InlineMath>{"2^{x+1} > 8"}</InlineMath>
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
              <WalkStep number={3} title="Reši linearnu nejednačinu.">
                <MathBlock>{"x > 2"}</MathBlock>
                <p>
                  Skup rešenja: <InlineMath>{"S=(2,\\infty)"}</InlineMath>.
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
                    Baza je <InlineMath>{"\\tfrac{1}{2}"}</InlineMath> između{" "}
                    <InlineMath>{"0"}</InlineMath> i{" "}
                    <InlineMath>{"1"}</InlineMath>, funkcija opada.
                  </>
                }
              >
                <p>Znak se obrće:</p>
                <MathBlock>{"3x-1 \\ge -3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši linearnu nejednačinu.">
                <MathBlock>
                  {"3x \\ge -2 \\Rightarrow x \\ge -\\tfrac{2}{3}"}
                </MathBlock>
                <p>
                  Skup rešenja:{" "}
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
                  Skup rešenja:{" "}
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
                  Skup rešenja:{" "}
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
                    Uvedi smenu <InlineMath>{"u=2^x"}</InlineMath>. Važno:{" "}
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
                  Skup rešenja:{" "}
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
                  Nejednačina po <InlineMath>{"u"}</InlineMath> ima rešenja za{" "}
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
                  Skup rešenja: <InlineMath>{"S=\\varnothing"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je u petom primeru bilo važno sto je nejednačina >= 0, a ne > 0?"
          answer={
            <p>
              Zato sto se kod <InlineMath>{"\\ge 0"}</InlineMath> krajevi
              intervala uključuju. Zbog toga su i{" "}
              <InlineMath>{"u=1"}</InlineMath> i{" "}
              <InlineMath>{"u=4"}</InlineMath> dozvoljeni, pa kasnije dobijamo i{" "}
              <InlineMath>{"x=0"}</InlineMath> i{" "}
              <InlineMath>{"x=2"}</InlineMath> kao deo rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Zakoni i ključne formule"
        title="Obrasci koje treba da vidiš cim pročitaš zadatak"
        description="Ove kartice nisu tu da ih mehanički pamtiš, već da ti pomognu da brzo prepoznaš pravi put rešavanja. Kada obrazac vidiš na vreme, ceo zadatak postaje kraći i mirniji."
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
            note="Znak se obrće."
          />
          <FormulaCard
            title="Povezivanje baza"
            formula={"4=2^2,\\quad 8=2^3,\\quad 9=3^2,\\quad 27=3^3"}
            note="Pretvori sve u isti jezik."
          />
          <FormulaCard
            title="Rastavljanje eksponenta"
            formula={"a^{x+k} = a^x \\cdot a^k"}
            note="Izdvajanje zajedničkog faktora."
          />
          <FormulaCard
            title="Smena"
            formula={"u = a^x, \\qquad u > 0"}
            note="Nova promenljiva mora ostati pozitivna."
          />
          <FormulaCard
            title="Krajevi intervala"
            formula={">\\,,< \\;\\text{ ne uključuju kraj;} \\quad \\ge\\,,\\le \\;\\text{ uključuju kraj.}"}
            note="Stroga i nestriktna nejednakost nisu isto."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Mesta na kojima se najlakse gube poeni"
        description='Ove greške nisu slučajne. One su tipične zato sto zadaci često izgledaju "skoro isto". Baš zato je važno da svaku od njih umeš da prepoznaš dok još pišeš prvi red rešenja.'
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
              slično funkcija raste, pa se znak ne menja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljanje da{" "}
              <InlineMath>{"\\tfrac{1}{4}=(2)^{-2}"}</InlineMath>
            </h3>
            <p>
              Važno: ako pređeš na bazu <InlineMath>{"2"}</InlineMath>, znak se
              tada ne menja zbog baze, ali se može promeniti kasnije kada deliš
              nejednačinu sa negativnim brojem.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Poredjenje eksponenata pre nego sto su baze zaista iste
            </h3>
            <p>
              Primer: iz <InlineMath>{"4^x \\ge 8^{x-1}"}</InlineMath> ne smeš
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
              Podsetnik: čak i ako kvadratna nejednačina po{" "}
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
              Previše rano posezanje za logaritmima
            </h3>
            <p>
              Praksa: većina zadataka iz ove lekcije rešava se bez logaritama.
              Ako možes da svedeš na istu bazu ili na smenu, to je čistiji put.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da organizuješ rešavanje pod pritiskom vremena"
        description="Na prijemnom zadaci iz ove oblasti često nisu dugi, ali su namerno postavljeni tako da te navedu na jednu od standardnih grešaka. Zato je najbolja taktika da pratis jasan, kratak redosled."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet koraka koji štede vreme">
            <ul>
              <li>
                Proveri bazu: da li je <InlineMath>{"a>1"}</InlineMath> ili{" "}
                <InlineMath>{"0<a<1"}</InlineMath>?
              </li>
              <li>
                Ako baze nisu iste, povezi ih preko zajedničke osnove.
              </li>
              <li>
                Ako vidiš <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, uvedi{" "}
                <InlineMath>{"u=a^x>0"}</InlineMath>.
              </li>
              <li>Reši dobijenu linearnu ili kvadratnu nejednačinu.</li>
              <li>
                Vrati se na <InlineMath>{"x"}</InlineMath> i proveri krajeve
                intervala.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta zadatak pokušava da sakrije">
            <ul>
              <li>
                Bazu manju od <InlineMath>{"1"}</InlineMath>, da bi te naterao
                na pogresan smer znaka.
              </li>
              <li>
                Baze <InlineMath>{"4"}</InlineMath>,{" "}
                <InlineMath>{"8"}</InlineMath>, <InlineMath>{"9"}</InlineMath>,{" "}
                <InlineMath>{"27"}</InlineMath>, da bi proverio da li vidiš vezu
                sa <InlineMath>{"2"}</InlineMath> ili{" "}
                <InlineMath>{"3"}</InlineMath>.
              </li>
              <li>
                Kvadratnu formu po <InlineMath>{"a^x"}</InlineMath>, da bi
                proverio da li pamtiš uslov <InlineMath>{"u>0"}</InlineMath>.
              </li>
              <li>
                Strogu nejednačinu, da bi proverio da li umeš da isključiš
                krajeve intervala.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Jedna misaona navika pravi veliku razliku">
          <p>
            Umesto da pitas &ldquo;kako da resim ovaj zadatak?&rdquo;, pitaj
            &ldquo;na šta mogu da ga svedem?&rdquo;. To je mnogo efikasniji
            način razmisljanja za prijemni.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li umeš samostalno"
        description="Pokušaj prvo bez otvaranja rešenja. Ako negde zapneš, ne gledaj odmah sve korake; pokušaj makar da određiš koji metod treba primeniti."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Reši <InlineMath>{"3^{x-2} < 9"}</InlineMath>.
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
                  Pišemo{" "}
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
                  . Baza je između <InlineMath>{"0"}</InlineMath> i{" "}
                  <InlineMath>{"1"}</InlineMath>, pa se znak obrće:{" "}
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
                Reši <InlineMath>{"25^x > 5^{x+2}"}</InlineMath>.
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
                  <InlineMath>{"1 < u < 9"}</InlineMath>. Vraćamo se na{" "}
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
                  <InlineMath>{"u > 4"}</InlineMath>. Vraćanjem dobijamo{" "}
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
                Odredi skup rešenja{" "}
                <InlineMath>{"2^{2x}+5\\cdot 2^x+6 \\le 0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Po smeni <InlineMath>{"u=2^x>0"}</InlineMath> dobijamo{" "}
                  <InlineMath>{"u^2+5u+6 \\le 0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(u+2)(u+3) \\le 0"}</InlineMath>. To važi samo
                  za <InlineMath>{"-3 \\le u \\le -2"}</InlineMath>, ali su to
                  negativne vrednosti. Kako{" "}
                  <InlineMath>{"u=2^x"}</InlineMath> ne može biti negativan,
                  rešenja nema.
                </p>
                <MathBlock>{"S=\\varnothing"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Prvo odlučujes kako se funkcija ponaša, pa tek onda računaš"
        description="Ako iz ove lekcije poneseš samo jednu rečenicu, neka bude ova: baza određuje logiku nejednačine. Kada to uočiš na vreme, zadatak se mirno svodi na poznat algebarski postupak."
      >
        <InsightCard title="Najvažniji princip">
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
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ovo su tačke koje treba da ostanu sigurne i kada zadatak izgleda komplikovano. Ako njih držiš pod kontrolom, eksponencijalne nejednačine postaju znatno mirnija oblast."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Baza vodi pricu</h3>
            <p>
              Za <InlineMath>{"a>1"}</InlineMath> znak ostaje, za{" "}
              <InlineMath>{"0<a<1"}</InlineMath> znak se obrće. To nije trik,
              nego posledica monotonosti eksponencijalne funkcije.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Prvo sredi oblik</h3>
            <p>
              Povezi baze, izdvoj faktor ili uvedi smenu. Ne rešavaj naslepo.
              Najpre prepoznaj u koji standardni obrazac zadatak spada.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Kod smene važi <InlineMath>{"u>0"}</InlineMath>
            </h3>
            <p>
              Interval po <InlineMath>{"u"}</InlineMath> nikada ne prihvataj bez
              preseka sa pozitivnom poluosom. Ovo je obavezna kontrola kojom se
              uklanjaju nedozvoljeni delovi rešenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Krajevi su važni</h3>
            <p>
              Pazi da li je nejednačina stroga ili nestriktna. Otvorena i
              zatvorena krajnja tačka nisu ista stvar, posebno na prijemnom.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logican korak u učenju je prelazak na logaritme i logaritamske
          funkcije. Tamo se priča o monotonosti vraća, samo u novom ruhu.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
