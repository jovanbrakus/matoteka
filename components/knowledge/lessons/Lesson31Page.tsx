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
  { href: "#domen", label: "Domen" },
  { href: "#metode", label: "Metode" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson31Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 31"
        title={
          <>
            Logaritamske{" "}
            <span className={cs.tHeroAccent}>jednačine</span>
          </>
        }
        description={'Suština ove lekcije nije samo da \u201Eskineš\u201C logaritam, već da pre svakog računa proveriš domen, zatim pravilno prevedeš jednačinu u poznat oblik i na kraju presečeš dobijene kandidate sa uslovima definisanosti.'}
        heroImageSrc="/images/lessons/lesson31_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa logaritamskim jednačinama, domenima i kvadratnom smenom"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da rešiš tipične logaritamske jednačine: direktne, sa jednakim logaritmima i sa kvadratnom smenom u = log_a(...).",
          },
          {
            label: "Najveća zamka",
            description:
              "Dobro rešen algebarski deo nije dovoljan ako nisi proverio da su svi argumenti logaritama strogo pozitivni.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo prepoznavanje obrasca: da li odmah eksponenciraš, izjednačavaš argumente ili uvodiš smenu.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "55-75 minuta sa primerima i proverom domena.",
          },
          {
            label: "Predznanje",
            description:
              "Definicija logaritma, pravila logaritmovanja i grafik logaritamske funkcije.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevođenje transcedentne jednačine u linearnu, kvadratnu ili racionalnu algebru.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za domen, kandidate i konačan skup rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Na prijemnom ti često ne traže samo račun, nego disciplinu rešavanja"
        description="Logaritamske jednačine su mesto gde se spajaju tri stvari: razumevanje definicije logaritma, pravila logaritmovanja i stroga kontrola domene. Učenici najčešće greše ne zato što ne znaju algebru, nego zato što preskoče prvi korak."
      >
        <div className={s.grid3}>
          <SectionCard title="Kasnija primena">
            <p>
              Ova logika se odmah prenosi na logaritamske nejednačine, gde je
              domen još važniji nego ovde.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni benefit">
            <p>
              Ako naučiš fiksan redosled koraka, mnogo brže prepoznaješ da li
              zadatak vodi na linearnu ili kvadratnu jednačinu.
            </p>
          </SectionCard>
          <SectionCard title="Tipična zamka">
            <p>
              Dobiješ dva kandidata iz kvadratne jednačine, ali samo jedan
              preživi uslove <InlineMath>{"x>0"}</InlineMath>,{" "}
              <InlineMath>{"x-3>0"}</InlineMath> ili sličan presek uslova.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{Rešavanje logaritamske jednačine} = \\text{domen} + \\text{transformacija} + \\text{provera kandidata}."
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: zašto domen pišemo pre transformacije, a ne posle?"
          answer={
            <p>
              Zato što su pravila logaritmovanja dozvoljena samo kada su svi
              uključeni logaritmi definisani. Ako to ne obezbediš na početku,
              možeš formalno dobiti kandidat koji nikada nije bio dozvoljen.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DOMEN ═══════════ */}
      <LessonSection
        id="domen"
        eyebrow="Prvi korak"
        title="Domen je stroži od samog računa"
        description="Kada vidiš logaritamsku jednačinu, ne počinješ od prebacivanja članova. Počinješ od uslova definisanosti za svaki logaritam koji se pojavljuje."
      >
        <div className={s.grid2}>
          <SectionCard title="Opšti uslovi za logaritam">
            <MathBlock>
              {"\\log_a f(x) \\text{ postoji samo ako } a>0,\\ a\\neq 1,\\ f(x)>0."}
            </MathBlock>
            <ul>
              <li>
                Baza je obično zadana i već ispravna, ali na prijemnom ume da
                bude data parametarski.
              </li>
              <li>
                Najčešće ti posao pravi argument:{" "}
                <InlineMath>{"x-2"}</InlineMath>,{" "}
                <InlineMath>{"5-x"}</InlineMath>,{" "}
                <InlineMath>{"x^2-4"}</InlineMath>,{" "}
                <InlineMath>{"\\frac{x+1}{x-3}"}</InlineMath> i slično.
              </li>
              <li>
                Ako ima više logaritama, uzimaš presek svih uslova, ne uslov za
                svaki posebno bez preseka.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Primer preseka uslova">
            <p>Za jednačinu</p>
            <MathBlock>
              {"\\log_2(x-1)+\\log_2(5-x)=3"}
            </MathBlock>
            <p>moraju istovremeno važiti uslovi</p>
            <MathBlock>{"x-1>0,\\qquad 5-x>0."}</MathBlock>
            <p>Njihov presek je</p>
            <MathBlock>{"1<x<5."}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.walkthrough}>
          <WalkStep number={1} title="Napiši uslove za argumente">
            <p>
              Svaki argument logaritma mora biti strogo pozitivan. Nula ne
              dolazi u obzir.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Nađi presek uslova">
            <p>
              Ne posmatraj uslove odvojeno na kraju. Zapiši jedinstven domen u
              kome tražiš rešenje.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Tek onda transformiši jednačinu">
            <p>
              Sada su pravila logaritmovanja legitimna, jer radiš unutar skupa
              gde logaritmi postoje.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: da li uslov za argument može biti f(x) ≥ 0?"
          answer={
            <p>
              Ne može. Argument logaritma mora biti strogo pozitivan. Vrednost{" "}
              <InlineMath>{"0"}</InlineMath> nije dozvoljena, pa je uslov uvek{" "}
              <InlineMath>{"f(x)>0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ METODE ═══════════ */}
      <LessonSection
        id="metode"
        eyebrow="Glavne metode"
        title="Tri obrasca koja rešavaju većinu zadataka"
        description='Kada jednom naučiš da prepoznaješ tip jednačine, zadatak se brzo „spušta" na poznatu algebru. Nije cilj da svaku jednačinu radiš istom silom, nego pravim alatom.'
      >
        <div className={s.grid3}>
          <SectionCard title="1. Direktno oslobađanje logaritma">
            <MathBlock>
              {
                "\\log_a f(x)=c \\iff \\begin{cases} f(x)>0,\\\\ f(x)=a^c. \\end{cases}"
              }
            </MathBlock>
            <p>
              Ovo je najbrži tip: logaritam prevodiš u eksponencijalni zapis.
            </p>
          </SectionCard>

          <SectionCard title="2. Jednaki logaritmi iste baze">
            <MathBlock>
              {
                "\\log_a f(x)=\\log_a g(x) \\iff \\begin{cases} f(x)>0,\\\\ g(x)>0,\\\\ f(x)=g(x). \\end{cases}"
              }
            </MathBlock>
            <p>
              Kada su baze iste, izjednačavaš argumente, ali samo uz domen.
            </p>
          </SectionCard>

          <SectionCard title="3. Kvadratna smena">
            <MathBlock>
              {"(\\log_a f(x))^2+B\\log_a f(x)+C=0"}
            </MathBlock>
            <p>
              Uvodiš smenu <InlineMath>{"u=\\log_a f(x)"}</InlineMath>, rešavaš
              kvadratnu jednačinu po <InlineMath>{"u"}</InlineMath>, pa se vraćaš
              na <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kada smeš da spojiš logaritme?">
            <p>Tek pošto si zapisao domen, možeš koristiti pravila:</p>
            <MathBlock>
              {
                "\\log_a f(x)+\\log_a g(x)=\\log_a\\!\\bigl(f(x)g(x)\\bigr)"
              }
            </MathBlock>
            <p>
              Ovo je veoma korisno na prijemnom, jer često od dva logaritma
              dobiješ jednu logaritamsku jednačinu koja vodi na kvadratnu
              jednačinu u <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kada menjaš bazu?">
            <p>
              Ako u zadatku postoje povezane baze, na primer{" "}
              <InlineMath>{"2"}</InlineMath> i <InlineMath>{"4"}</InlineMath>,
              često je pametno sve prevesti na istu bazu:
            </p>
            <MathBlock>
              {
                "\\log_4 x=\\frac{\\log_2 x}{\\log_2 4}=\\frac{1}{2}\\log_2 x."
              }
            </MathBlock>
            <p>
              To je standardan prijemni potez kada se traži elegantno svođenje na
              jednu promenljivu.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: šta radiš ako dobiješ kvadratnu jednačinu u u = log_a f(x)?"
          answer={
            <p>
              Rešiš kvadratnu jednačinu po <InlineMath>{"u"}</InlineMath>, zatim
              svaki dobijeni <InlineMath>{"u"}</InlineMath> vratiš u jednačinu{" "}
              <InlineMath>{"\\log_a f(x)=u"}</InlineMath>, pa tek onda pronađeš{" "}
              <InlineMath>{"x"}</InlineMath>. Nemoj stati na korenima po{" "}
              <InlineMath>{"u"}</InlineMath>, jer to još nisu rešenja početne
              jednačine.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od najosnovnijeg tipa do prijemnog zadatka sa filtriranjem rešenja"
        description="Nemoj samo čitati završni rezultat. Obrati pažnju na redosled: domen, transformacija, kandidati, provera."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1. Direktna jednačina</h3>
            <p>
              Reši jednačinu{" "}
              <InlineMath>{"\\log_2(x-1)=3"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x-1>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x>1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Eksponencijalni zapis">
                <MathBlock>{"x-1=2^3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Rešenje">
                <p>
                  <InlineMath>{"x-1=8"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=9"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Provera">
                <p>
                  <InlineMath>{"9>1"}</InlineMath>, rešenje pripada domenu.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=\\{9\\}."}</MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2. Jednaki logaritmi iste baze
            </h3>
            <p>
              Reši jednačinu{" "}
              <InlineMath>{"\\log_3(x+5)=\\log_3(7-x)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x+5>0"}</InlineMath> i{" "}
                  <InlineMath>{"7-x>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"-5<x<7"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izjednačavanje argumenata">
                <MathBlock>{"x+5=7-x"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Rešenje">
                <p>
                  <InlineMath>{"2x=2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Provera">
                <p>
                  <InlineMath>{"1\\in(-5,7)"}</InlineMath>, dakle rešenje je
                  dozvoljeno.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=\\{1\\}."}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3. Kvadratna smena u logaritmu
            </h3>
            <p>
              Reši jednačinu{" "}
              <InlineMath>{"(\\log_2 x)^2-3\\log_2 x+2=0"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x>0"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Smena">
                <p>
                  Uvodi se smena <InlineMath>{"u=\\log_2 x"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Kvadratna jednačina">
                <MathBlock>{"u^2-3u+2=0"}</MathBlock>
                <p>
                  Faktorizacija daje{" "}
                  <InlineMath>{"(u-1)(u-2)=0"}</InlineMath>, pa su{" "}
                  <InlineMath>{"u_1=1"}</InlineMath> i{" "}
                  <InlineMath>{"u_2=2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Vraćanje smene">
                <p>
                  <InlineMath>{"\\log_2 x=1"}</InlineMath> ili{" "}
                  <InlineMath>{"\\log_2 x=2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=2"}</InlineMath> ili{" "}
                  <InlineMath>{"x=4"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=\\{2,4\\}."}</MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4. Spajanje logaritama i filtriranje domenom
            </h3>
            <p>
              Reši jednačinu{" "}
              <InlineMath>{"\\log_2(x-1)+\\log_2(x-3)=3"}</InlineMath>.
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
                <MathBlock>{"\\log_2((x-1)(x-3))=3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Eksponencijalni zapis">
                <MathBlock>{"(x-1)(x-3)=2^3=8"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Kvadratna jednačina">
                <MathBlock>{"x^2-4x+3=8 \\implies x^2-4x-5=0"}</MathBlock>
                <p>
                  Rešenja su <InlineMath>{"x_1=5"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Provera domenom">
                <p>
                  Pošto mora važiti <InlineMath>{"x>3"}</InlineMath>, kandidat{" "}
                  <InlineMath>{"-1"}</InlineMath> otpada.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=\\{5\\}."}</MathBlock>

            <InsightCard title="Zašto je ovo tipičan prijemni zadatak">
              <p>
                Ovo je primer zašto domen pišemo unapred. Bez tog koraka učenik
                često greškom zadrži oba korena.
              </p>
            </InsightCard>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 5. Povezane baze</h3>
            <p>
              Reši jednačinu{" "}
              <InlineMath>{"\\log_4 x=\\log_2(x-2)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen">
                <p>
                  <InlineMath>{"x>0"}</InlineMath> i{" "}
                  <InlineMath>{"x-2>0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x>2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Promena baze">
                <MathBlock>
                  {
                    "\\log_4 x=\\frac{\\log_2 x}{\\log_2 4}=\\frac{1}{2}\\log_2 x"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Jednačina u istoj bazi">
                <p>
                  Jednačina postaje{" "}
                  <InlineMath>
                    {"\\frac{1}{2}\\log_2 x=\\log_2(x-2)"}
                  </InlineMath>
                  .
                </p>
                <MathBlock>
                  {"\\log_2 x=2\\log_2(x-2)=\\log_2((x-2)^2)"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Izjednačavanje argumenata">
                <p>
                  Pošto radimo u domenu <InlineMath>{"x>2"}</InlineMath>, sledi{" "}
                  <InlineMath>{"x=(x-2)^2"}</InlineMath>.
                </p>
                <MathBlock>{"x^2-5x+4=0"}</MathBlock>
                <p>
                  Kandidati su <InlineMath>{"x_1=1"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=4"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Provera domenom">
                <p>
                  Domen zadržava samo <InlineMath>{"x=4"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"S=\\{4\\}."}</MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ OBRASCI I KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Obrasci i ključne formule"
        title="Ove šeme treba da ti budu prepoznatljive na prvi pogled"
        description="Ne pamti ih kao odvojene trikove. Sve se svodi na definiciju logaritma, uslove definisanosti i pažljivo vraćanje u originalnu promenljivu."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Direktni oblik"
            formula={"\\log_a f(x)=c \\iff f(x)=a^c,\\quad f(x)>0."}
          />
          <FormulaCard
            title="Jednaki logaritmi"
            formula={"\\log_a f(x)=\\log_a g(x)\\iff f(x)=g(x),"}
            note={
              <>
                uz <InlineMath>{"f(x)>0"}</InlineMath>,{" "}
                <InlineMath>{"g(x)>0"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Zbir logaritama"
            formula={"\\log_a f(x)+\\log_a g(x)=\\log_a(f(x)g(x))."}
          />
          <FormulaCard
            title="Razlika logaritama"
            formula={"\\log_a f(x)-\\log_a g(x)=\\log_a\\frac{f(x)}{g(x)}."}
          />
          <FormulaCard
            title="Kvadratna smena"
            formula={"u=\\log_a f(x)\\quad \\Rightarrow \\quad u^2+Bu+C=0."}
          />
          <FormulaCard
            title="Konačni filter"
            formula={"S=\\{ \\text{kandidati iz algebre} \\}\\cap D."}
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se na prijemnom najlakše gube poeni"
        description="Sledeće greške nisu slučajne. Pojavljuju se stalno, jer učenik u žurbi preskoči logičan korak."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preskakanje domena</h3>
            <p>
              Najčešća i najskuplja greška. Bez domena zadržavaš i nedozvoljene
              kandidate.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Lažno pravilo za zbir</h3>
            <p>
              Nije tačno da je{" "}
              <InlineMath>
                {"\\log_a(f+g)=\\log_a f+\\log_a g"}
              </InlineMath>
              . Takvo pravilo ne postoji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Izjednačavanje bez istih baza</h3>
            <p>
              Argumente možeš izjednačiti tek kada su logaritmi iste baze i kada
              su definisani.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaustavljanje na smeni <InlineMath>{"u"}</InlineMath>
            </h3>
            <p>
              Koreni po <InlineMath>{"u"}</InlineMath> nisu rešenja po{" "}
              <InlineMath>{"x"}</InlineMath>. Moraš da se vratiš na{" "}
              <InlineMath>{"\\log_a f(x)=u"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan presek uslova</h3>
            <p>
              Kod više logaritama ne uzimaš uniju, već presek uslova
              definisanosti.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Automatsko prihvatanje oba korena
            </h3>
            <p>
              Ako se posle spajanja logaritama javi kvadratna jednačina, gotovo
              uvek proveravaš da li oba korena ostaju u domenu.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da prepoznaš zadatak pod pritiskom vremena"
        description="Na prijemnom je važnije da imaš pouzdan obrazac rada nego da pamtiš mnogo trikova. Sledeći redosled je praktičan i dovoljno robustan za većinu zadataka."
      >
        <div className={s.grid2}>
          <SectionCard title="Prijemni algoritam od 20 sekundi">
            <ul>
              <li>Prvo zapiši domen svih logaritama.</li>
              <li>Pogledaj da li možeš da svedeš sve na istu bazu.</li>
              <li>Prepoznaj obrazac: direktno, jednaki logaritmi ili smena.</li>
              <li>Reši dobijenu algebarsku jednačinu.</li>
              <li>Na kraju preseci sa domenom.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta komisija često proverava">
            <ul>
              <li>
                Da li umeš da radiš sa bazama{" "}
                <InlineMath>{"2,4,8"}</InlineMath> ili{" "}
                <InlineMath>{"3,9,27"}</InlineMath>.
              </li>
              <li>Da li znaš kada je korisna promena baze.</li>
              <li>
                Da li pamtiš da je argument logaritma strogo pozitivan.
              </li>
              <li>
                Da li umeš da odbaciš višak rešenja dobijenih iz kvadratne
                jednačine.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Probaj samostalno, pa tek onda otvori rešenje"
        description="Vežbe su složene tako da idu od osnovnog direktnog oblika do zadataka sa promenom baze i domenom."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Reši: <InlineMath>{"\\log_3(x-4)=2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>4"}</InlineMath>. Iz{" "}
                <InlineMath>{"x-4=3^2"}</InlineMath> sledi{" "}
                <InlineMath>{"x=13"}</InlineMath>. Rešenje je{" "}
                <InlineMath>{"S=\\{13\\}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Reši: <InlineMath>{"\\log_5(x+1)=\\log_5(9-x)"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"-1<x<9"}</InlineMath>. Izjednačimo
                argumente: <InlineMath>{"x+1=9-x"}</InlineMath>, pa je{" "}
                <InlineMath>{"x=4"}</InlineMath>. Rešenje je{" "}
                <InlineMath>{"S=\\{4\\}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"(\\log_2 x)^2-\\log_2 x-2=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Neka je <InlineMath>{"u=\\log_2 x"}</InlineMath>. Tada je{" "}
                  <InlineMath>{"u^2-u-2=0"}</InlineMath>, pa{" "}
                  <InlineMath>{"(u-2)(u+1)=0"}</InlineMath>. Dakle{" "}
                  <InlineMath>{"u=2"}</InlineMath> ili{" "}
                  <InlineMath>{"u=-1"}</InlineMath>, pa su{" "}
                  <InlineMath>{"x=4"}</InlineMath> ili{" "}
                  <InlineMath>{"x=\\frac{1}{2}"}</InlineMath>.
                </p>
                <MathBlock>{"S=\\left\\{4,\\frac{1}{2}\\right\\}."}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"\\log_2(x-2)+\\log_2(x-6)=4"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>6"}</InlineMath>. Spajanjem dobijamo{" "}
                <InlineMath>{"(x-2)(x-6)=16"}</InlineMath>, odnosno{" "}
                <InlineMath>{"x^2-8x-4=0"}</InlineMath>. Kandidati su{" "}
                <InlineMath>{"x=4\\pm2\\sqrt{5}"}</InlineMath>, a domen ostavlja
                samo <InlineMath>{"x=4+2\\sqrt{5}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši: <InlineMath>{"\\log_{1/2}(x-1)=-2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"x>1"}</InlineMath>. Iz{" "}
                <InlineMath>
                  {"x-1=\\left(\\frac{1}{2}\\right)^{-2}=4"}
                </InlineMath>{" "}
                sledi <InlineMath>{"x=5"}</InlineMath>. Rešenje je{" "}
                <InlineMath>{"S=\\{5\\}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"\\log_4 x=\\log_2(x-1)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domen je <InlineMath>{"x>1"}</InlineMath>. Menjamo bazu:{" "}
                  <InlineMath>
                    {"\\frac{1}{2}\\log_2 x=\\log_2(x-1)"}
                  </InlineMath>
                  . Zato je{" "}
                  <InlineMath>{"\\log_2 x=\\log_2((x-1)^2)"}</InlineMath>, pa{" "}
                  <InlineMath>{"x=(x-1)^2"}</InlineMath>. Dobijamo{" "}
                  <InlineMath>{"x^2-3x+1=0"}</InlineMath>, tj.{" "}
                  <InlineMath>{"x=\\frac{3\\pm\\sqrt{5}}{2}"}</InlineMath>.
                </p>
                <p>
                  Domen zadržava samo{" "}
                  <InlineMath>{"x=\\frac{3+\\sqrt{5}}{2}"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>{"\\log_3(x+2)-\\log_3(x-1)=1"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen: <InlineMath>{"x>1"}</InlineMath>. Razliku pretvaramo u
                količnik:{" "}
                <InlineMath>{"\\log_3\\frac{x+2}{x-1}=1"}</InlineMath>. Zato je{" "}
                <InlineMath>{"\\frac{x+2}{x-1}=3"}</InlineMath>, pa{" "}
                <InlineMath>{"x+2=3x-3"}</InlineMath>. Sledi{" "}
                <InlineMath>{"x=\\frac{5}{2}"}</InlineMath>, što pripada domenu.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Reši:{" "}
                <InlineMath>
                  {"(\\log_3(x-1))^2-2\\log_3(x-1)-3=0"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Domen: <InlineMath>{"x>1"}</InlineMath>. Neka je{" "}
                  <InlineMath>{"u=\\log_3(x-1)"}</InlineMath>. Tada je{" "}
                  <InlineMath>{"u^2-2u-3=0"}</InlineMath>, pa{" "}
                  <InlineMath>{"(u-3)(u+1)=0"}</InlineMath>. Dakle{" "}
                  <InlineMath>{"u=3"}</InlineMath> ili{" "}
                  <InlineMath>{"u=-1"}</InlineMath>.
                </p>
                <p>
                  Vraćanjem smene: <InlineMath>{"x-1=27"}</InlineMath> ili{" "}
                  <InlineMath>{"x-1=\\frac{1}{3}"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=28"}</InlineMath> ili{" "}
                  <InlineMath>{"x=\\frac{4}{3}"}</InlineMath>. Oba rešenja
                  pripadaju domenu.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažnija poruka lekcije"
      >
        <InsightCard title="Logaritamska jednačina = algebarska jednačina unutar strogo kontrolisanog domena">
          <MathBlock>
            {
              "\\boxed{\\text{logaritamska jednačina}=\\text{algebarska jednačina unutar strogo kontrolisanog domena}}"
            }
          </MathBlock>
          <p>
            Ako to zapamtiš, zadatak više ne izgleda kao „specijalna egzotika".
            Postaje običan algebrajski problem koji samo ima stroga vrata na
            ulazu: uslove definisanosti.
          </p>
          <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
            Sledeći logičan korak su logaritamske nejednačine, gde će isti domen
            morati da radi zajedno sa pravilima monotonosti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Rezime"
        title="Šta moraš da zapamtiš pre sledeće lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domen ide prvi</h3>
            <p>
              Za svaki logaritam pišeš uslov da je argument strogo pozitivan, pa
              uzimaš presek uslova.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Prepoznaj obrazac</h3>
            <p>
              Direktan oblik, jednaki logaritmi ili kvadratna smena rešavaju
              najveći broj zadataka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Spajaj logaritme pažljivo</h3>
            <p>
              Pravila zbira i razlike koristiš tek kada znaš da su svi logaritmi
              definisani.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Kandidati nisu kraj</h3>
            <p>
              Poslednji korak je uvek presecanje dobijenih kandidata sa domenom
              početne jednačine.
            </p>
          </article>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
