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
  { href: "#pojam", label: "Pojam" },
  { href: "#domen", label: "Domen" },
  { href: "#monotonost", label: "Monotonost" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson32Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 32"
        title={
          <>
            Logaritamske{" "}
            <span className={cs.tHeroAccent}>nejednačine</span>
          </>
        }
        description="Ovo je deo gradiva u kome se najlakše izgubi smer razmišljanja. Nije dovoljno samo rešiti dobijenu nejednačinu: moraš da proveriš domen, da znaš da li se znak čuva ili obrće i da tek onda presečeš dobijeni skup sa uslovima definisanosti."
        heroImageSrc="/api/lessons/32/hero"
        heroImageAlt="Apstraktna matematička tabla sa logaritamskim nejednačinama, brojnom pravom i intervalom rešenja"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da rešavaš logaritamske nejednačine kada je baza veća od 1, ali i kada je između 0 i 1.",
          },
          {
            label: "Najveća zamka",
            description:
              "Tačno rešena algebra nije kraj zadatka ako si zaboravio domen ili pogrešno pročitao monotonost logaritma.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brz redosled odluka: domen, baza, smer znaka, algebra, konačni presek.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "60-80 minuta uz dovoljno rada na brojnoj pravoj.",
          },
          {
            label: "Predznanje",
            description:
              "Logaritamska funkcija, logaritamske jednačine i pravila logaritmovanja.",
          },
          {
            label: "Glavna veština",
            description:
              "Ispravno čitanje monotonosti i presecanje dobijenih intervala sa domenom.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za smer znaka, domen i konačan skup rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je mesto gde studenti najčešće pomešaju dve različite ideje"
        description="Logaritamske nejednačine nisu teške zato što imaju mnogo formula, već zato što istovremeno traže i razumevanje funkcije i preciznu algebru. Moraš da kontrolišeš i domen i smer nejednakosti."
      >
        <div className={s.grid3}>
          <SectionCard title="Kasnija primena">
            <p>
              Ista logika se vraća i u analizi grafika, domena složenih
              funkcija i zadacima sa parametrima.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni benefit">
            <p>
              Kada znaš stabilan algoritam, zadatak više ne deluje
              {"\u201E"}specijalno{"\u201C"}, nego postaje obična algebra pod
              kontrolom uslova.
            </p>
          </SectionCard>
          <SectionCard title="Tipičan pad poena">
            <p>
              Učenik dobro reši dobijenu linearnu ili kvadratnu nejednačinu,
              ali zaboravi da je početni domen bio stroži.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{logaritamska nejednačina} = \\text{domen} + \\text{monotonost} + \\text{algebra} + \\text{presek}."
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: zašto se logaritamske nejednačine smatraju težim od logaritamskih jednačina?"
          answer={
            <p>
              Kod jednačina je dovoljno da sačuvaš ekvivalentnost i proveriš
              domen. Kod nejednačina moraš dodatno da znaš da li je
              logaritamska funkcija rastuća ili opadajuća, jer to menja smer
              poređenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POJAM ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow="Pojam"
        title="Šta zovemo logaritamskom nejednačinom"
        description="To je nejednačina u kojoj se nepoznata pojavljuje unutar argumenta logaritma ili u više logaritamskih izraza koje treba uporediti, spojiti ili svesti na istu bazu."
      >
        <div className={s.grid2}>
          <SectionCard title="Najčešći osnovni oblici">
            <MathBlock>
              {
                "\\log_a f(x)\\ \\square\\ c \\qquad \\text{ili} \\qquad \\log_a f(x)\\ \\square\\ \\log_a g(x),"
              }
            </MathBlock>
            <p>
              gde je{" "}
              <InlineMath>
                {"\\square \\in \\{<,\\le,>,\\ge\\}"}
              </InlineMath>
              .
            </p>
            <ul>
              <li>
                U prvom slučaju porediš argument sa brojem{" "}
                <InlineMath>{"a^c"}</InlineMath>, ali zavisno od baze znak
                može da se čuva ili obrće.
              </li>
              <li>
                U drugom slučaju porediš argumente, opet uz proveru
                monotonosti i domene.
              </li>
              <li>
                U složenijim zadacima prvo koristiš pravila logaritmovanja,
                pa onda rešavaš dobijenu nejednačinu.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Redosled razmišljanja">
            <MathBlock>
              {
                "\\boxed{D \\to \\text{baza} \\to \\text{transformacija} \\to \\text{rešenje} \\to D \\cap S}"
              }
            </MathBlock>
            <p>
              Ako preskočiš bilo koji od ovih koraka, vrlo lako dobijaš
              formalno tačan, ali suštinski pogrešan odgovor.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ DOMEN ═══════════ */}
      <LessonSection
        id="domen"
        eyebrow="Prvi uslov"
        title="Domen se određuje pre rešavanja nejednačine"
        description="U logaritamskim nejednačinama domen nije samo tehnički detalj. On je aktivni filter kroz koji svako dobijeno rešenje mora da prođe."
      >
        <div className={s.grid2}>
          <SectionCard title="Osnovni uslovi">
            <MathBlock>
              {
                "\\log_a f(x) \\text{ postoji samo ako } a>0,\\ a\\neq 1,\\ f(x)>0."
              }
            </MathBlock>
            <ul>
              <li>
                Ako imaš više logaritama, svi argumenti moraju biti strogo
                pozitivni.
              </li>
              <li>
                Presek uslova je skup u kome tek smeš da koristiš pravila
                logaritmovanja.
              </li>
              <li>
                Granice na kojima argument postaje{" "}
                <InlineMath>{"0"}</InlineMath> nikada ne ulaze u rešenje.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Primer domena pre bilo kakvog računa">
            <MathBlock>
              {"\\log_3(x-2)\\le \\log_3(8-x)"}
            </MathBlock>
            <p>odmah daje uslove</p>
            <MathBlock>{"x-2>0,\\qquad 8-x>0."}</MathBlock>
            <p>Zato je domen</p>
            <MathBlock>{"2<x<8."}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.walkthrough}>
          <WalkStep number={1} title="Napiši uslove za sve argumente">
            <p>
              Kod logaritama je znak uvek strogo{" "}
              <InlineMath>{">"}</InlineMath>, nikad{" "}
              <InlineMath>{"\\ge"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Nađi presek">
            <p>
              Ne rešavaj svaku restrikciju posebno do kraja. Odmah formiraj
              zajednički domen.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Na kraju se vrati na domen">
            <p>
              Čak i ako formalno dobiješ veći interval, početna funkcija
              odlučuje šta je stvarno dozvoljeno.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: da li tačka u kojoj je argument jednak nuli može da uđe kod nejednačine sa znakom ≤?"
          answer={
            <p>
              Ne može. Znak{" "}
              <InlineMath>{"\\le"}</InlineMath> pripada algebarskom delu,
              ali logaritam u toj tački uopšte nije definisan. Zato granica
              na kojoj je argument <InlineMath>{"0"}</InlineMath> uvek
              ostaje isključena.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MONOTONOST ═══════════ */}
      <LessonSection
        id="monotonost"
        eyebrow="Monotonost"
        title="Baza odlučuje da li se znak čuva ili obrće"
        description="Ovo je glavni princip cele lekcije. Logaritamska funkcija y = log_a(x) je strogo monotona: raste ako je a > 1, a opada ako je 0 < a < 1."
      >
        <div className={s.grid3}>
          <SectionCard title="Kada je a > 1">
            <MathBlock>
              {
                "\\log_a f(x)\\ \\square\\ \\log_a g(x) \\iff f(x)\\ \\square\\ g(x)"
              }
            </MathBlock>
            <p>Funkcija raste, pa se smer nejednakosti čuva.</p>
          </SectionCard>

          <SectionCard title="Kada je 0 < a < 1">
            <MathBlock>
              {
                "\\log_a f(x)\\ \\square\\ \\log_a g(x) \\iff f(x)\\ \\square_{\\text{obr}}\\ g(x)"
              }
            </MathBlock>
            <p>Funkcija opada, pa se smer nejednakosti obrće.</p>
          </SectionCard>

          <SectionCard title="Šta znači obrnut znak">
            <MathBlock>
              {"< \\leftrightarrow >,\\qquad \\le \\leftrightarrow \\ge"}
            </MathBlock>
            <p>
              Strogi znak ostaje strog, nestriktni ostaje nestriktan, menja
              se samo smer.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Poređenje sa brojem">
            <MathBlock>{"\\log_a f(x)\\ \\square\\ c"}</MathBlock>
            <p>
              Najpre misliš na horizontalnu pravu{" "}
              <InlineMath>{"y=c"}</InlineMath>, odnosno na vrednost{" "}
              <InlineMath>{"a^c"}</InlineMath>. Kada je baza veća od{" "}
              <InlineMath>{"1"}</InlineMath>, dobijaš{" "}
              <InlineMath>{"f(x)\\ \\square\\ a^c"}</InlineMath>. Kada je
              baza manja od <InlineMath>{"1"}</InlineMath>, znak se obrće.
            </p>
          </SectionCard>

          <SectionCard title="Poređenje dva logaritma">
            <MathBlock>
              {"\\log_a f(x)\\ \\square\\ \\log_a g(x)"}
            </MathBlock>
            <p>
              Ako je baza ista, porediš argumente. Ali ne zaboravi: najpre
              domen, zatim odluka o smeru znaka, pa tek onda linearna ili
              kvadratna nejednačina.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: šta se dešava sa znakom kod baze 1/2?"
          answer={
            <p>
              Pošto je{" "}
              <InlineMath>{"0<\\tfrac{1}{2}<1"}</InlineMath>, funkcija{" "}
              <InlineMath>{"y=\\log_{\\frac{1}{2}}x"}</InlineMath> opada.
              Zato se pri skidanju logaritma ili poređenju argumenata smer
              nejednakosti obrće.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri od osnovnog oblika do prijemnog zadatka sa spajanjem logaritama"
        description="Svaki primer vodi istim redosledom. To nije stil pisanja, nego algoritam koji treba da poneseš na ispit."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1. Direktna nejednačina sa bazom većom od{" "}
              <InlineMath>{"1"}</InlineMath>
            </h3>
            <p>
              Reši <InlineMath>{"\\log_2(x-1)<3"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x-1>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x>1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Monotonost">
                <p>
                  Pošto je <InlineMath>{"2>1"}</InlineMath>, funkcija raste
                  i znak se čuva.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Algebra">
                <p>
                  Dobijamo <InlineMath>{"x-1<2^3=8"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x<9"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Presek sa domenom">
                <p>
                  Konačno <InlineMath>{"1<x<9"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=(1,9)."}</MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2. Direktna nejednačina sa bazom između{" "}
              <InlineMath>{"0"}</InlineMath> i <InlineMath>{"1"}</InlineMath>
            </h3>
            <p>
              Reši{" "}
              <InlineMath>{"\\log_{\\frac{1}{2}}(x+2)\\le -1"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x+2>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x>-2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Monotonost">
                <p>
                  Pošto je{" "}
                  <InlineMath>{"0<\\tfrac{1}{2}<1"}</InlineMath>, funkcija
                  opada i znak se obrće.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Algebra">
                <p>
                  Dobijamo{" "}
                  <InlineMath>
                    {"x+2\\ge \\left(\\tfrac{1}{2}\\right)^{-1}=2"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Rešenje">
                <p>
                  Odavde sledi <InlineMath>{"x\\ge 0"}</InlineMath>. Presek
                  sa domenom ne menja rezultat, jer je{" "}
                  <InlineMath>{"x\\ge 0"}</InlineMath> već strože od{" "}
                  <InlineMath>{"x>-2"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=[0,\\infty)."}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3. Poređenje dva logaritma, baza veća od{" "}
              <InlineMath>{"1"}</InlineMath>
            </h3>
            <p>
              Reši{" "}
              <InlineMath>{"\\log_3(x-1)<\\log_3(7-x)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x-1>0"}</InlineMath> i{" "}
                  <InlineMath>{"7-x>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"1<x<7"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Monotonost">
                <p>
                  Pošto je <InlineMath>{"3>1"}</InlineMath>, znak se čuva.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Algebra">
                <p>
                  Dobijamo <InlineMath>{"x-1<7-x"}</InlineMath>, pa je{" "}
                  <InlineMath>{"2x<8"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x<4"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Presek sa domenom">
                <p>
                  Konačno <InlineMath>{"1<x<4"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=(1,4)."}</MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4. Poređenje dva logaritma, baza manja od{" "}
              <InlineMath>{"1"}</InlineMath>
            </h3>
            <p>
              Reši{" "}
              <InlineMath>
                {"\\log_{\\frac{1}{3}}(x-2)>\\log_{\\frac{1}{3}}(8-x)"}
              </InlineMath>
              .
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x-2>0"}</InlineMath> i{" "}
                  <InlineMath>{"8-x>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"2<x<8"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Monotonost">
                <p>
                  Pošto je{" "}
                  <InlineMath>{"0<\\tfrac{1}{3}<1"}</InlineMath>, znak se
                  obrće.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Algebra">
                <p>
                  Dobijamo <InlineMath>{"x-2<8-x"}</InlineMath>, pa je{" "}
                  <InlineMath>{"2x<10"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x<5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Presek sa domenom">
                <p>
                  Konačno <InlineMath>{"2<x<5"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=(2,5)."}</MathBlock>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5. Spajanje logaritama i kvadratna nejednačina
            </h3>
            <p>
              Reši{" "}
              <InlineMath>
                {"\\log_2(x-1)+\\log_2(x-3)\\le 3"}
              </InlineMath>
              .
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x-1>0"}</InlineMath> i{" "}
                  <InlineMath>{"x-3>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x>3"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Spajanje logaritama">
                <MathBlock>
                  {"\\log_2((x-1)(x-3))\\le 3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Monotonost i algebra">
                <p>
                  Pošto je <InlineMath>{"2>1"}</InlineMath>, znak se čuva,
                  pa dobijamo <InlineMath>{"(x-1)(x-3)\\le 8"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Kvadratna nejednačina">
                <p>
                  Širimo: <InlineMath>{"x^2-4x+3\\le 8"}</InlineMath>,
                  odnosno <InlineMath>{"x^2-4x-5\\le 0"}</InlineMath>.
                  Faktorizacija daje{" "}
                  <InlineMath>{"(x-5)(x+1)\\le 0"}</InlineMath>, pa je
                  algebarsko rešenje{" "}
                  <InlineMath>{"[-1,5]"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Presek sa domenom">
                <p>
                  Presek sa domenom <InlineMath>{"x>3"}</InlineMath> daje
                  konačno <InlineMath>{"(3,5]"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=(3,5]."}</MathBlock>
            <InsightCard title="Zašto je ovaj primer ključan">
              <p>
                Ovo je tip zadatka na kome se lepo vidi da domen nije ukras.
                Bez njega bi ostao čitav interval{" "}
                <InlineMath>{"[-1,5]"}</InlineMath>, što je pogrešno.
              </p>
            </InsightCard>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ OBRASCI I KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Obrasci i ključne formule"
        title="Ovo treba da prepoznaješ odmah, bez dužeg razmišljanja"
        description="Ne postoji mnogo formula. Postoji nekoliko stabilnih obrazaca koji se stalno ponavljaju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Direktan oblik, a > 1"
            formula={"\\log_a f(x)\\ \\square\\ c \\iff f(x)\\ \\square\\ a^c"}
          />
          <FormulaCard
            title="Direktan oblik, 0 < a < 1"
            formula={"\\log_a f(x)\\ \\square\\ c \\iff f(x)\\ \\square_{\\text{obr}} a^c"}
          />
          <FormulaCard
            title="Dva logaritma, a > 1"
            formula={"\\log_a f(x)\\ \\square\\ \\log_a g(x) \\iff f(x)\\ \\square\\ g(x)"}
          />
          <FormulaCard
            title="Dva logaritma, 0 < a < 1"
            formula={"\\log_a f(x)\\ \\square\\ \\log_a g(x) \\iff f(x)\\ \\square_{\\text{obr}} g(x)"}
          />
          <FormulaCard
            title="Obavezni domen"
            formula={"f(x)>0,\\qquad g(x)>0."}
          />
          <FormulaCard
            title="Konačni presek"
            formula={"S = S_{\\text{algebra}} \\cap D."}
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Tipične greške koje se ponavljaju iz godine u godinu"
        description="Ako ih naučiš unapred, lakše ćeš ih prepoznati i u sopstvenom radu."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preskočen domen</h3>
            <p>
              Najčešća greška. U logaritamskim nejednačinama domen često
              uklanja ceo kraj intervala ili čak čitavu granu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešan smer za <InlineMath>{"0<a<1"}</InlineMath>
            </h3>
            <p>
              Logaritamska funkcija tada opada, pa se znak obrće. Ovo nije
              trik, nego posledica monotonosti.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ubacivanje nule u rešenje</h3>
            <p>
              Ako argument logaritma postane{" "}
              <InlineMath>{"0"}</InlineMath>, ta tačka nikad ne može da
              pripada rešenju, bez obzira na{" "}
              <InlineMath>{"\\le"}</InlineMath> ili{" "}
              <InlineMath>{"\\ge"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Spajanje logaritama bez uslova
            </h3>
            <p>
              Pravila sabiranja i oduzimanja važe u domenu, ne u{" "}
              {"\u201E"}vakuumu{"\u201C"}.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno otvaranje ili zatvaranje krajeva
            </h3>
            <p>
              Strogi znak daje otvoren kraj, nestriktni zatvoren, ali domen
              može da taj kraj ipak izbaci.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zadržavanje celog algebarskog intervala
            </h3>
            <p>
              Nakon kvadratne nejednačine po{" "}
              <InlineMath>{"x"}</InlineMath> ili po nekoj smeni, konačan
              odgovor nije gotov dok se ne preseče sa domenom.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Prijemni algoritam koji vredi zapamtiti"
        description="U realnom zadatku ne traži se &bdquo;lep stil&ldquo;, nego pouzdana procedura. Sledeći redosled je dovoljno robustan za veliku većinu zadataka."
      >
        <div className={s.grid2}>
          <SectionCard title="Algoritam od pet koraka">
            <ul>
              <li>Odredi domen svih logaritama.</li>
              <li>
                Proveri da li je baza veća od <InlineMath>{"1"}</InlineMath>{" "}
                ili između <InlineMath>{"0"}</InlineMath> i{" "}
                <InlineMath>{"1"}</InlineMath>.
              </li>
              <li>
                Primeni odgovarajuće pravilo čuvanja ili obrtanja znaka.
              </li>
              <li>
                Reši dobijenu linearnu ili kvadratnu nejednačinu.
              </li>
              <li>
                Na kraju preseci dobijeni skup sa domenom.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta se najčešće proverava">
            <ul>
              <li>
                Da li znaš da se znak obrće za baze tipa{" "}
                <InlineMath>{"\\tfrac{1}{2}"}</InlineMath>,{" "}
                <InlineMath>{"\\tfrac{1}{3}"}</InlineMath>,{" "}
                <InlineMath>{"\\tfrac{1}{4}"}</InlineMath>.
              </li>
              <li>
                Da li umeš da nacrtaš ili zamisliš interval na brojnoj
                pravoj.
              </li>
              <li>
                Da li pravilno spajaš logaritme u jedan izraz.
              </li>
              <li>
                Da li umeš da iz konačnog intervala odbaciš delove van
                domena.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Probaj samostalno, pa proveri intervale i krajeve"
        description="Vežbe su namerno mešane: neke traže samo monotonost, a neke i domen i spajanje logaritama."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Reši: <InlineMath>{"\\log_2(x+3)\\ge 2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>-3"}</InlineMath>. Pošto je baza
                veća od <InlineMath>{"1"}</InlineMath>, znak se čuva:{" "}
                <InlineMath>{"x+3\\ge 4"}</InlineMath>, pa je{" "}
                <InlineMath>{"x\\ge 1"}</InlineMath>. Konačno{" "}
                <InlineMath>{"S=[1,\\infty)"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"\\log_{\\frac{1}{2}}(x-1)<1"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>1"}</InlineMath>. Baza je između{" "}
                <InlineMath>{"0"}</InlineMath> i{" "}
                <InlineMath>{"1"}</InlineMath>, pa se znak obrće:{" "}
                <InlineMath>{"x-1>\\tfrac{1}{2}"}</InlineMath>. Zato je{" "}
                <InlineMath>{"x>\\tfrac{3}{2}"}</InlineMath>. Konačno{" "}
                <InlineMath>{"S=\\left(\\tfrac{3}{2},\\infty\\right)"}</InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"\\log_3(x-4)\\le \\log_3(10-x)"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"4<x<10"}</InlineMath>. Pošto je{" "}
                <InlineMath>{"3>1"}</InlineMath>, znak se čuva:{" "}
                <InlineMath>{"x-4\\le 10-x"}</InlineMath>, pa je{" "}
                <InlineMath>{"x\\le 7"}</InlineMath>. Presek sa domenom
                daje <InlineMath>{"S=(4,7]"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>
                  {
                    "\\log_{\\frac{1}{3}}(x+1)\\ge \\log_{\\frac{1}{3}}(5-x)"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"-1<x<5"}</InlineMath>. Baza je manja
                od <InlineMath>{"1"}</InlineMath>, pa se znak obrće:{" "}
                <InlineMath>{"x+1\\le 5-x"}</InlineMath>. Dakle{" "}
                <InlineMath>{"2x\\le 4"}</InlineMath>, odnosno{" "}
                <InlineMath>{"x\\le 2"}</InlineMath>. Konačno{" "}
                <InlineMath>{"S=(-1,2]"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>
                  {"\\log_2(x-1)+\\log_2(x-5)>3"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Domen je <InlineMath>{"x>5"}</InlineMath>. Spajanjem
                  dobijamo{" "}
                  <InlineMath>{"\\log_2((x-1)(x-5))>3"}</InlineMath>, pa{" "}
                  <InlineMath>{"(x-1)(x-5)>8"}</InlineMath>. To je{" "}
                  <InlineMath>{"x^2-6x-3>0"}</InlineMath>, sa nulama{" "}
                  <InlineMath>{"3\\pm 2\\sqrt{3}"}</InlineMath>.
                </p>
                <p>
                  Rešenje kvadratne nejednačine je{" "}
                  <InlineMath>
                    {
                      "(-\\infty,3-2\\sqrt{3})\\cup(3+2\\sqrt{3},\\infty)"
                    }
                  </InlineMath>
                  , a presek sa domenom daje{" "}
                  <InlineMath>
                    {"S=(3+2\\sqrt{3},\\infty)"}
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
                Reši: <InlineMath>{"\\log_4(x)<\\log_4(9-x)"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"0<x<9"}</InlineMath>. Baza je veća od{" "}
                <InlineMath>{"1"}</InlineMath>, pa je{" "}
                <InlineMath>{"x<9-x"}</InlineMath>. Dobija se{" "}
                <InlineMath>{"2x<9"}</InlineMath>, odnosno{" "}
                <InlineMath>{"x<\\tfrac{9}{2}"}</InlineMath>. Konačno{" "}
                <InlineMath>{"S=\\left(0,\\tfrac{9}{2}\\right)"}</InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>
                  {
                    "\\log_{\\frac{1}{2}}(x+2)\\le \\log_{\\frac{1}{2}}(6-x)"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"-2<x<6"}</InlineMath>. Baza je manja
                od <InlineMath>{"1"}</InlineMath>, pa se znak obrće:{" "}
                <InlineMath>{"x+2\\ge 6-x"}</InlineMath>. Dakle{" "}
                <InlineMath>{"2x\\ge 4"}</InlineMath>, odnosno{" "}
                <InlineMath>{"x\\ge 2"}</InlineMath>. Konačno{" "}
                <InlineMath>{"S=[2,6)"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>
                  {"\\log_3(x-2)-\\log_3(x-5)\\le 1"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>5"}</InlineMath>. Razliku
                pretvaramo u količnik:{" "}
                <InlineMath>
                  {"\\log_3\\frac{x-2}{x-5}\\le 1"}
                </InlineMath>
                . Pošto je baza veća od <InlineMath>{"1"}</InlineMath>,
                važi <InlineMath>{"\\frac{x-2}{x-5}\\le 3"}</InlineMath>.
                Rešavanjem dobijamo{" "}
                <InlineMath>{"x\\ge \\frac{13}{2}"}</InlineMath>. Presek sa
                domenom daje{" "}
                <InlineMath>
                  {"S=\\left[\\frac{13}{2},\\infty\\right)"}
                </InlineMath>
                .
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažnija rečenica cele lekcije"
      >
        <InsightCard title="Baza određuje smer, domen određuje šta od toga sme da ostane">
          <MathBlock>
            {
              "\\boxed{\\text{baza određuje smer, domen određuje šta od toga sme da ostane}}"
            }
          </MathBlock>
          <p>
            Ako ovo zaista usvojiš, logaritamske nejednačine prestaju da
            budu {"\u201E"}haotične{"\u201C"}. Postaju predvidljiv niz
            odluka koji uvek možeš da kontrolišeš.
          </p>
          <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
            Posle ove lekcije logaritamska oblast je zaokružena: pojam,
            grafik, jednačine i nejednačine sada čine jednu celinu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Rezime"
        title="Šta moraš da zapamtiš"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domen ide prvi</h3>
            <p>
              Sve argumente postavljaš strogo pozitivno i odmah formiraš
              zajednički domen.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Baza određuje smer</h3>
            <p>
              Za <InlineMath>{"a>1"}</InlineMath> znak se čuva, a za{" "}
              <InlineMath>{"0<a<1"}</InlineMath> obrće.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Algebra dolazi posle toga</h3>
            <p>
              Tek kada rešiš pitanje domena i monotonosti, prelaziš na
              linearnu, kvadratnu ili racionalnu nejednačinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Konačan odgovor je presek</h3>
            <p>
              Algebarsko rešenje samo po sebi nije dovoljno. Na kraju se
              uvek vraćaš na domen početne funkcije.
            </p>
          </article>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
