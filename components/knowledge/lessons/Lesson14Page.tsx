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
import HornerLab from "./HornerLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#ideja", label: "Intuicija" },
  { href: "#stav", label: "Bezoutov stav" },
  { href: "#horner", label: "Hornerova šema" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson14Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 14"
        title={
          <>
            Bezoutov stav i{" "}
            <span className={cs.tHeroAccent}>Hornerova šema</span>
          </>
        }
        description="Ovo je lekcija u kojoj deljenje polinoma prestaje da bude duga procedura i postaje jasan obrazac. Ako razumeš da je ostatak pri deljenju sa x-a jednak P(a), odmah dobijaš brži put do deljivosti, nula polinoma i zadataka sa parametrima koji se redovno pojavljuju na prijemnim ispitima."
        heroImageSrc="/images/lessons/lesson14_hero.png"
        heroImageAlt="Ilustracija Bezoutovog stava i Hornerove šeme"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako se ostatak pretvara u uvrštavanje — umesto dugog deljenja, koristiš vrednost polinoma u tački.",
          },
          {
            label: "Najveća zamka",
            description:
              "Znak u linearnom deliocu — za x+3 ne uzimaš a=3, nego a=−3.",
          },
          {
            label: "Prijemni fokus",
            description:
              'Deljivost i nepoznati koeficijenti — zadaci tipa „odredi a i b da polinom bude deljiv..."',
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "45 do 60 minuta",
          },
          {
            label: "Predznanje",
            description: "Polinomi i deljenje polinoma",
          },
          {
            label: "Glavna veština",
            description:
              "Pretvaranje deljivosti u uslov pomoću vrednosti P(a)",
          },
          {
            label: "Interaktivno",
            description: "Horner laboratorija sa koeficijentima na canvasu",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Most između ostatka, deljivosti i nula polinoma"
        description="Na prvi pogled, Bezoutov stav deluje kao kratka formula. U stvarnosti, on je most između tri stvari koje se stalno vraćaju na prijemnom: ostatka pri deljenju, deljivosti i nalaženja nula polinoma."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta dobijaš u praksi">
            <p>
              Ako zadatak traži ostatak pri deljenju sa{" "}
              <InlineMath>{"x-a"}</InlineMath>, ne moraš da deliš polinom.
              Dovoljno je da izračunaš{" "}
              <InlineMath>{"P(a)"}</InlineMath>. Ako traži deljivost sa{" "}
              <InlineMath>{"x-a"}</InlineMath>, proveravaš da li je{" "}
              <InlineMath>{"P(a)=0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Zašto je ovo važno kasnije">
            <p>
              Ova ideja vodi direktno ka nulama polinoma, faktorizaciji i
              kasnijim Vièteovim formulama za polinome višeg stepena. Zato ovu
              lekciju ne treba učiti napamet, već kao obrazac razmišljanja.
            </p>
          </SectionCard>
        </div>
        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Na prijemnom se najčešće javlja kao">
            <ul>
              <li>
                računanje ostatka pri deljenju polinoma sa{" "}
                <InlineMath>{"x-a"}</InlineMath>
              </li>
              <li>provera da li je neki broj nula polinoma</li>
              <li>
                određivanje parametara da polinom bude deljiv zadatim trinomom
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Šta student mora odmah da nauči da prepozna">
            <ul>
              <li>
                <InlineMath>{"x-2"}</InlineMath> znači{" "}
                <InlineMath>{"a=2"}</InlineMath>
              </li>
              <li>
                <InlineMath>{"x+2"}</InlineMath> znači{" "}
                <InlineMath>{"a=-2"}</InlineMath>
              </li>
              <li>
                ako delilac nije linearan, Bezout se ne primenjuje direktno u
                jednom koraku
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTUICIJA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Intuicija"
        title="Zašto ostatak postaje broj"
        description="Osnovna ideja dolazi iz teoreme o deljenju sa ostatkom. Kada polinom deliš linearnim deliocem, ostatak mora imati stepen manji od 1. To znači da ostatak nije novi polinom sa x, nego samo broj."
      >
        <div className={s.grid2}>
          <SectionCard title="Početni zapis">
            <p>
              Ako polinom <InlineMath>{"P(x)"}</InlineMath> deliš binomom{" "}
              <InlineMath>{"x-a"}</InlineMath>, postoji polinom{" "}
              <InlineMath>{"Q(x)"}</InlineMath> i broj{" "}
              <InlineMath>{"r"}</InlineMath> takvi da važi:
            </p>
            <MathBlock>{"P(x) = (x-a)Q(x) + r"}</MathBlock>
            <p>
              Broj <InlineMath>{"r"}</InlineMath> je ostatak. Nema{" "}
              <InlineMath>{"x"}</InlineMath> u ostatku, jer bi tada stepen
              ostatka bio najmanje <InlineMath>{"1"}</InlineMath>, što nije
              dozvoljeno.
            </p>
          </SectionCard>
          <SectionCard title="Ključni trik">
            <p>
              Sada u taj zapis ubaci <InlineMath>{"x=a"}</InlineMath>. Tada deo{" "}
              <InlineMath>{"(x-a)Q(x)"}</InlineMath> nestaje, jer postaje{" "}
              <InlineMath>{"0"}</InlineMath>, pa dobijaš:
            </p>
            <MathBlock>{"P(a) = (a-a)Q(a)+r = r"}</MathBlock>
            <p>
              Dakle, ostatak je baš vrednost polinoma u broju{" "}
              <InlineMath>{"a"}</InlineMath>. To je cela suština Bezoutovog
              stava.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški uvid">
          <p>
            Nemoj da pamtiš samo rečenicu „ostatak je{" "}
            <InlineMath>{"P(a)"}</InlineMath>". Razumi zašto važi. Kada to
            shvatiš, znakovi i primena na zadacima postaju mnogo sigurniji.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto ostatak ne može biti oblika mx+n?"
          answer={
            <p>
              Zato što pri deljenju sa <InlineMath>{"x-a"}</InlineMath> ostatak
              mora imati stepen strogo manji od stepena delioca. Stepen od{" "}
              <InlineMath>{"x-a"}</InlineMath> je{" "}
              <InlineMath>{"1"}</InlineMath>, pa ostatak mora biti stepena manjeg
              od <InlineMath>{"1"}</InlineMath>, dakle konstanta.
            </p>
          }
        />
        <MicroCheck
          question="Mikro-provera: ako deliš sa x+5, koju vrednost ubacuješ u polinom?"
          answer={
            <p>
              Pišeš <InlineMath>{"x+5 = x-(-5)"}</InlineMath>, pa je{" "}
              <InlineMath>{"a=-5"}</InlineMath>. Zato računaš{" "}
              <InlineMath>{"P(-5)"}</InlineMath>, a ne{" "}
              <InlineMath>{"P(5)"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ BEZOUTOV STAV ═══════════ */}
      <LessonSection
        id="stav"
        eyebrow="Bezoutov stav (Bezuova teorema)"
        title="Ostatak i deljivost u jednom koraku"
        description="U srednjoškolskom jeziku, Bezoutov stav spaja ostatak i vrednost polinoma. Iz njega odmah sledi i kriterijum deljivosti."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovna tvrdnja"
            formula={"\\text{Ostatak pri deljenju } P(x) \\text{ sa } x-a \\text{ jednak je } P(a)."}
            note="Ovo se koristi kada zadatak traži samo ostatak. Račun se tada svodi na jedno uvrštavanje."
          />
          <FormulaCard
            title="Posledica za deljivost"
            formula={"x-a \\mid P(x) \\iff P(a)=0"}
            note={
              <>
                Ako je ostatak nula, deljenje je tačno. Zbog toga je{" "}
                <InlineMath>{"a"}</InlineMath> nula polinoma.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kratak dokaz">
            <p>Polazimo od zapisa</p>
            <MathBlock>{"P(x) = (x-a)Q(x) + r."}</MathBlock>
            <p>
              Kada uvstiš <InlineMath>{"x=a"}</InlineMath>, prvi sabirak
              nestaje:
            </p>
            <MathBlock>{"P(a) = (a-a)Q(a) + r = r."}</MathBlock>
            <p>
              Dakle, ostatak je <InlineMath>{"P(a)"}</InlineMath>. Ako je{" "}
              <InlineMath>{"P(a)=0"}</InlineMath>, onda je ostatak nula i{" "}
              <InlineMath>{"x-a"}</InlineMath> deli{" "}
              <InlineMath>{"P(x)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta da zapamtiš bez greške">
            <ul>
              <li>
                prvo prepoznaj delilac u obliku{" "}
                <InlineMath>{"x-a"}</InlineMath>
              </li>
              <li>tek onda određuješ koji broj ubacuješ u polinom</li>
              <li>
                ako zadatak traži i količnik, Bezout nije dovoljan sam; tada
                koristiš Hornerovu šemu ili dugo deljenje
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.exampleGrid} style={{ marginTop: 16 }}>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Mini primer 1: ostatak bez deljenja
            </h3>
            <p>Odredi ostatak pri deljenju polinoma</p>
            <MathBlock>{"P(x)=x^4-2x^3+5x-7"}</MathBlock>
            <p>
              sa <InlineMath>{"x-2"}</InlineMath>.
            </p>
            <p>Po Bezoutu:</p>
            <MathBlock>
              {"r = P(2)=2^4-2\\cdot 2^3 + 5\\cdot 2 - 7 = 16-16+10-7=3."}
            </MathBlock>
            <p>
              Ostatak je <InlineMath>{"3"}</InlineMath>.
            </p>
          </article>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Mini primer 2: provera deljivosti
            </h3>
            <p>
              Proveri da li je <InlineMath>{"x-1"}</InlineMath> činilac
              polinoma
            </p>
            <MathBlock>{"P(x)=2x^3-7x^2+7x-2."}</MathBlock>
            <p>Računamo:</p>
            <MathBlock>{"P(1)=2-7+7-2=0."}</MathBlock>
            <p>
              Pošto je <InlineMath>{"P(1)=0"}</InlineMath>, binom{" "}
              <InlineMath>{"x-1"}</InlineMath> jeste činilac polinoma.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je P(−3)=5, koliki je ostatak pri deljenju sa x+3?"
          answer={
            <p>
              Pošto je <InlineMath>{"x+3 = x-(-3)"}</InlineMath>, ostatak je{" "}
              <InlineMath>{"P(-3)=5"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ HORNEROVA ŠEMA ═══════════ */}
      <LessonSection
        id="horner"
        eyebrow="Hornerova šema"
        title="Brže deljenje i traženje nula"
        description="Hornerova šema je algoritamski način da brzo izračunaš količnik i ostatak pri deljenju polinoma sa x−a. Ona je idealna kada zadatak traži više od samog ostatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Postupak korak po korak">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Napiši sve koeficijente">
                <p>
                  Ako neki član nedostaje, njegov koeficijent je{" "}
                  <InlineMath>{"0"}</InlineMath>. To je obavezno.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Levo upiši broj <InlineMath>{"a"}</InlineMath>
                  </>
                }
              >
                <p>
                  Deliš sa <InlineMath>{"x-a"}</InlineMath>, pa u šemu ide baš{" "}
                  <InlineMath>{"a"}</InlineMath>. Ako deliš sa{" "}
                  <InlineMath>{"x+1"}</InlineMath>, u šemu ide{" "}
                  <InlineMath>{"-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Prepiši vodeći koeficijent">
                <p>To je prvi broj u donjem redu.</p>
              </WalkStep>
              <WalkStep number={4} title="Množi i sabiraj">
                <p>
                  Dobijeni broj množiš sa <InlineMath>{"a"}</InlineMath>,
                  upisuješ ispod sledećeg koeficijenta, pa sabiraš kolonu.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Čitaj rezultat">
                <p>
                  Poslednji broj je ostatak, a prethodni brojevi su koeficijenti
                  količnika.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Veza sa Bezoutovim stavom">
            <p>
              Hornerova šema nije neka nova teorema nezavisna od Bezouta. Ona je
              praktičan algoritam koji na kraju daje isti ostatak:
            </p>
            <MathBlock>
              {"\\text{poslednji broj u Hornerovoj šemi} = P(a)"}
            </MathBlock>
            <p>
              Zato je Horner odličan kada želiš i da proveriš deljivost i da
              odmah dobiješ količnik, bez dugog deljenja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Najčešća ispitna greška">
          <p>
            Učenik napiše koeficijente{" "}
            <InlineMath>{"2,-3,5,-4"}</InlineMath> za polinom{" "}
            <InlineMath>{"2x^4-3x^3+5x-4"}</InlineMath>. To je pogrešno, jer
            nedostaje član <InlineMath>{"0x^2"}</InlineMath>. Pravilni
            koeficijenti su <InlineMath>{"2,-3,0,5,-4"}</InlineMath>.
          </p>
        </InsightCard>

        {/* Guided example within section */}
        <article className={s.exampleCard} style={{ marginTop: 16 }}>
          <h3 className={cs.tCardTitle}>
            Vođeni primer: podeli{" "}
            <InlineMath>{"2x^4-3x^3+5x-4"}</InlineMath> sa{" "}
            <InlineMath>{"x+1"}</InlineMath>
          </h3>
          <p>
            Prvo prepoznajemo da je{" "}
            <InlineMath>{"x+1 = x-(-1)"}</InlineMath>, pa u Hornerovu šemu
            ulazi <InlineMath>{"a=-1"}</InlineMath>. Pišemo sve koeficijente:
          </p>
          <MathBlock>{"2,\\ -3,\\ 0,\\ 5,\\ -4."}</MathBlock>
          <p>Sada redom:</p>
          <MathBlock>
            {"2 \\downarrow,\\quad -1\\cdot 2 = -2,\\quad -3+(-2)=-5,"}
          </MathBlock>
          <MathBlock>{"-1\\cdot(-5)=5,\\quad 0+5=5,"}</MathBlock>
          <MathBlock>{"-1\\cdot 5=-5,\\quad 5+(-5)=0,"}</MathBlock>
          <MathBlock>{"-1\\cdot 0=0,\\quad -4+0=-4."}</MathBlock>
          <p>Dakle, količnik je</p>
          <MathBlock>{"2x^3-5x^2+5x,"}</MathBlock>
          <p>
            a ostatak je <InlineMath>{"-4"}</InlineMath>. To znači:
          </p>
          <MathBlock>
            {"2x^4-3x^3+5x-4 = (x+1)(2x^3-5x^2+5x)-4."}
          </MathBlock>
        </article>

        <MicroCheck
          question="Mikro-provera: šta poslednji broj u Hornerovoj šemi govori o deljivosti?"
          answer={
            <p>
              Ako je poslednji broj <InlineMath>{"0"}</InlineMath>, onda je
              ostatak nula i polinom je deljiv sa odgovarajućim linearnim
              deliocem.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni deo"
        title="Horner laboratorija"
        description="Upiši koeficijente polinoma do četvrtog stepena i broj a iz delioca x−a. Laboratorija prikazuje Hornerovu tabelu, količnik, ostatak i zaključak o deljivosti."
      >
        <HornerLab />

        <InsightCard title="Kako da čitaš laboratoriju">
          <p>
            Ako poslednji broj ispadne <InlineMath>{"0"}</InlineMath>, znači da
            si našao nulu polinoma. Tada linearni delilac zaista deli polinom, a
            dobijeni količnik možeš dalje analizirati. Ako ostatak nije{" "}
            <InlineMath>{"0"}</InlineMath>, deljivosti nema, ali si i dalje
            dobio tačan količnik i tačan ostatak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description='Sledeći primeri nisu samo „rešenja". Svaki je izabran tako da pokrije jedan tip razmišljanja koji se javlja na prijemnim zadacima.'
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: ostatak preko Bezoutovog stava
            </h3>
            <p>Odredi ostatak pri deljenju</p>
            <MathBlock>{"P(x)=3x^3-2x^2+x-5"}</MathBlock>
            <p>
              sa <InlineMath>{"x-2"}</InlineMath>.
            </p>
            <p>
              Pošto je delilac <InlineMath>{"x-2"}</InlineMath>, računa se{" "}
              <InlineMath>{"P(2)"}</InlineMath>:
            </p>
            <MathBlock>
              {"P(2)=3\\cdot 2^3 - 2\\cdot 2^2 + 2 - 5 = 24-8+2-5=13."}
            </MathBlock>
            <p>
              Ostatak je <InlineMath>{"13"}</InlineMath>.
            </p>
            <p>
              Važno: ovde nema potrebe za Hornerom jer zadatak traži samo
              ostatak.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: nula polinoma i faktorizacija
            </h3>
            <p>
              Pokaži da je <InlineMath>{"x-2"}</InlineMath> činilac polinoma
            </p>
            <MathBlock>{"P(x)=x^3-4x^2+x+6"}</MathBlock>
            <p>i rastavi polinom na činioce.</p>
            <p>Najpre:</p>
            <MathBlock>{"P(2)=8-16+2+6=0."}</MathBlock>
            <p>
              Dakle, <InlineMath>{"x-2"}</InlineMath> jeste činilac. Sada Horner
              daje količnik
            </p>
            <MathBlock>{"x^2-2x-3."}</MathBlock>
            <p>Dalje rastavljamo:</p>
            <MathBlock>{"x^2-2x-3=(x-3)(x+1)."}</MathBlock>
            <p>Zato je</p>
            <MathBlock>{"P(x)=(x-2)(x-3)(x+1)."}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Horner sa nultim koeficijentom
            </h3>
            <p>Podeli</p>
            <MathBlock>{"P(x)=2x^4-3x^3+5x-4"}</MathBlock>
            <p>
              sa <InlineMath>{"x+1"}</InlineMath>.
            </p>
            <p>
              Pošto je <InlineMath>{"x+1=x-(-1)"}</InlineMath>, uzimamo{" "}
              <InlineMath>{"a=-1"}</InlineMath>. Koeficijenti su
            </p>
            <MathBlock>{"2,\\ -3,\\ 0,\\ 5,\\ -4."}</MathBlock>
            <p>Posle Hornera dobijamo donji red</p>
            <MathBlock>{"2,\\ -5,\\ 5,\\ 0,\\ -4."}</MathBlock>
            <p>Zato je količnik</p>
            <MathBlock>{"2x^3-5x^2+5x"}</MathBlock>
            <p>
              a ostatak <InlineMath>{"-4"}</InlineMath>.
            </p>
          </article>

          {/* Primer 4 - wide */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: prijemni tip sa parametrima i kvadratnim deliocem
            </h3>
            <p>
              Odredi <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath> tako da polinom
            </p>
            <MathBlock>{"P(x)=x^3+ax^2+bx+6"}</MathBlock>
            <p>bude deljiv sa</p>
            <MathBlock>{"x^2-3x+2."}</MathBlock>
            <p>Najpre rastavljamo delilac:</p>
            <MathBlock>{"x^2-3x+2=(x-1)(x-2)."}</MathBlock>
            <p>Da bi polinom bio deljiv ovim trinomom, mora važiti:</p>
            <MathBlock>
              {"P(1)=0 \\quad \\text{i} \\quad P(2)=0."}
            </MathBlock>
            <p>
              Iz <InlineMath>{"P(1)=0"}</InlineMath> dobijamo:
            </p>
            <MathBlock>
              {"1+a+b+6=0 \\Rightarrow a+b=-7."}
            </MathBlock>
            <p>
              Iz <InlineMath>{"P(2)=0"}</InlineMath> dobijamo:
            </p>
            <MathBlock>
              {"8+4a+2b+6=0 \\Rightarrow 2a+b=-7."}
            </MathBlock>
            <p>Oduzimanjem jednačina sledi:</p>
            <MathBlock>{"a=0,"}</MathBlock>
            <p>pa zatim</p>
            <MathBlock>{"b=-7."}</MathBlock>
            <p>Dakle, traženi polinom je</p>
            <MathBlock>{"P(x)=x^3-7x+6."}</MathBlock>
            <p>Provera:</p>
            <MathBlock>
              {"P(1)=1-7+6=0,\\qquad P(2)=8-14+6=0."}
            </MathBlock>
            <p>
              To je upravo obrazac koji se vrlo često javlja na prijemnom.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: kada je dovoljan samo Bezout, a kada treba i Horner?"
          answer={
            <p>
              Ako zadatak traži samo ostatak ili samo proveru deljivosti,
              dovoljan je Bezout. Ako traži količnik, dalje faktorisanje ili sve
              nule polinoma, tada se nakon Bezouta obično radi i Horner.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule i obrasci"
        title='Ovo mora da "iskoči" čim vidiš zadatak'
        description="Ovo su relacije koje treba da znaš da prepoznaš odmah, bez zadržavanja."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Teorema o ostatku"
            formula="P(x)=(x-a)Q(x)+P(a)"
            note={
              <>
                Za linearni delilac <InlineMath>{"x-a"}</InlineMath>, ostatak je
                broj <InlineMath>{"P(a)"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kriterijum deljivosti"
            formula={"x-a \\mid P(x) \\iff P(a)=0"}
            note={
              <>
                Broj <InlineMath>{"a"}</InlineMath> je nula polinoma ako i samo
                ako je <InlineMath>{"x-a"}</InlineMath> njegov činilac.
              </>
            }
          />
          <FormulaCard
            title="Prevođenje znaka"
            formula={"x+\\beta = x-(-\\beta)"}
            note={
              <>
                Kod delioca <InlineMath>{"x+\\beta"}</InlineMath> u polinom
                uvrštavaš <InlineMath>{"-\\beta"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kvadratni delilac na prijemnom"
            formula={"(x-r_1)(x-r_2)\\mid P(x) \\Rightarrow P(r_1)=0,\\ P(r_2)=0"}
            note="Ako delilac možeš rastaviti na linearne činioce, dobijaš sistem uslova za parametre."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se gube laki poeni"
        description="Ove greške nisu slučajne. One se redovno pojavljuju baš zato što je lekcija kratka, pa učenik pomisli da nema šta da pogreši."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan znak</h3>
            <p>
              Za delilac <InlineMath>{"x+4"}</InlineMath> ne računa se{" "}
              <InlineMath>{"P(4)"}</InlineMath>, već{" "}
              <InlineMath>{"P(-4)"}</InlineMath>. Ovo je najčešća greška u
              zadacima sa ostatkom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen nulti koeficijent</h3>
            <p>
              U Hornerovoj šemi moraš upisati i koeficijente članova koji
              nedostaju. Bez toga se ceo red pomera i rezultat postaje pogrešan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Bezout primenjen direktno na kvadratni delilac
            </h3>
            <p>
              Za deljenje sa <InlineMath>{"x^2-3x+2"}</InlineMath> ne postoji
              jedna vrednost <InlineMath>{"a"}</InlineMath> koju samo ubaciš.
              Najpre rastaviš delilac ili koristiš odgovarajući metod deljenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Stajanje prerano</h3>
            <p>
              Ako si pokazao da je <InlineMath>{"P(2)=0"}</InlineMath>, tek si
              dokazao da je <InlineMath>{"x-2"}</InlineMath> činilac. Ako
              zadatak traži rastavljanje ili sve nule, moraš i dalje da deliš.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta se najčešće traži na testu"
        description="Na prijemnom je retko dovoljno znati samo definiciju. Potrebno je da odmah prepoznaš koji tip problema imaš i koji je najkraći validan put."
      >
        <div className={s.grid2}>
          <SectionCard title='Tip 1: „Nađi ostatak"'>
            <p>
              Čim vidiš deljenje sa <InlineMath>{"x-a"}</InlineMath>, idi na{" "}
              <InlineMath>{"P(a)"}</InlineMath>. Ne troši vreme na dugo deljenje
              ako zadatak ne traži količnik.
            </p>
          </SectionCard>
          <SectionCard title='Tip 2: „Dokaži da je deljiv"'>
            <p>
              Proračunaj <InlineMath>{"P(a)"}</InlineMath>. Ako je{" "}
              <InlineMath>{"0"}</InlineMath>, deljivost je dokazana. Zatim
              nastavi Hornerom samo ako traže dalju analizu.
            </p>
          </SectionCard>
          <SectionCard title='Tip 3: „Odredi parametre"'>
            <p>
              Ako je polinom deljiv sa <InlineMath>{"x-a"}</InlineMath>, dobijaš
              jednačinu <InlineMath>{"P(a)=0"}</InlineMath>. Ako je deljiv sa
              kvadratnim trinomom koji se rastavlja, dobijaš sistem od dve
              jednačine.
            </p>
          </SectionCard>
          <SectionCard title='Tip 4: „Nađi sve nule"'>
            <p>
              Pogodi ili proveri jednu nulu, zatim uradi Horner i spusti problem
              na polinom manjeg stepena.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Kontrolna lista pod pritiskom vremena">
          <ul>
            <li>prepiši polinom u standardnom opadajućem poretku stepena</li>
            <li>upiši sve nulte koeficijente</li>
            <li>
              pretvori delilac u oblik <InlineMath>{"x-a"}</InlineMath>
            </li>
            <li>odluči da li ti treba samo ostatak ili i količnik</li>
            <li>ako je kvadratni delilac, proveri da li može da se rastavi</li>
          </ul>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe za samostalan rad"
        title="Samostalna provera razumevanja"
        description="Pokušaj da najpre sam rešiš zadatak. Rešenje otvaraj tek kada zaista zastaneš."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Odredi ostatak pri deljenju polinoma{" "}
                <InlineMath>{"P(x)=3x^3-2x^2+x-5"}</InlineMath> sa{" "}
                <InlineMath>{"x-2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Po Bezoutu:</p>
                <MathBlock>
                  {
                    "r=P(2)=3\\cdot 8-2\\cdot 4+2-5=24-8+2-5=13."
                  }
                </MathBlock>
                <p>
                  Ostatak je <InlineMath>{"13"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Proveri da li je <InlineMath>{"x+2"}</InlineMath> činilac
                polinoma <InlineMath>{"P(x)=x^3-4x+8"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Treba proveriti <InlineMath>{"P(-2)"}</InlineMath>:
                </p>
                <MathBlock>
                  {"P(-2)=(-2)^3-4(-2)+8=-8+8+8=8."}
                </MathBlock>
                <p>
                  Pošto nije <InlineMath>{"0"}</InlineMath>,{" "}
                  <InlineMath>{"x+2"}</InlineMath> nije činilac. Ostatak je{" "}
                  <InlineMath>{"8"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Podeli polinom{" "}
                <InlineMath>{"P(x)=x^3-6x^2+11x-6"}</InlineMath> sa{" "}
                <InlineMath>{"x-1"}</InlineMath> Hornerovom šemom.
              </p>
            }
            solution={
              <>
                <p>
                  Koeficijenti su <InlineMath>{"1,-6,11,-6"}</InlineMath>, a{" "}
                  <InlineMath>{"a=1"}</InlineMath>. Horner daje donji red
                </p>
                <MathBlock>{"1,\\ -5,\\ 6,\\ 0."}</MathBlock>
                <p>Zato je količnik</p>
                <MathBlock>{"x^2-5x+6,"}</MathBlock>
                <p>
                  a ostatak je <InlineMath>{"0"}</InlineMath>. Dakle,{" "}
                  <InlineMath>{"x-1"}</InlineMath> deli polinom.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi <InlineMath>{"a"}</InlineMath> tako da polinom{" "}
                <InlineMath>{"P(x)=2x^3+ax^2-5x+2"}</InlineMath> bude deljiv sa{" "}
                <InlineMath>{"x-2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uslov deljivosti je <InlineMath>{"P(2)=0"}</InlineMath>:
                </p>
                <MathBlock>
                  {"2\\cdot 8 + a\\cdot 4 - 5\\cdot 2 + 2 = 0."}
                </MathBlock>
                <p>To je</p>
                <MathBlock>
                  {"16+4a-10+2=0 \\Rightarrow 8+4a=0 \\Rightarrow a=-2."}
                </MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Odredi <InlineMath>{"a"}</InlineMath> i{" "}
                <InlineMath>{"b"}</InlineMath> tako da polinom{" "}
                <InlineMath>{"P(x)=x^3+ax^2+bx-6"}</InlineMath> bude deljiv sa{" "}
                <InlineMath>{"x^2-x-6"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Rastavljamo delilac:</p>
                <MathBlock>{"x^2-x-6=(x-3)(x+2)."}</MathBlock>
                <p>Zato mora važiti:</p>
                <MathBlock>{"P(3)=0,\\qquad P(-2)=0."}</MathBlock>
                <p>
                  Iz <InlineMath>{"P(3)=0"}</InlineMath>:
                </p>
                <MathBlock>
                  {"27+9a+3b-6=0 \\Rightarrow 3a+b=-7."}
                </MathBlock>
                <p>
                  Iz <InlineMath>{"P(-2)=0"}</InlineMath>:
                </p>
                <MathBlock>
                  {"-8+4a-2b-6=0 \\Rightarrow 2a-b=7."}
                </MathBlock>
                <p>
                  Sabiranjem dobijamo <InlineMath>{"5a=0"}</InlineMath>, pa je{" "}
                  <InlineMath>{"a=0"}</InlineMath>, a zatim{" "}
                  <InlineMath>{"b=-7"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Ako pri deljenju polinoma <InlineMath>{"P(x)"}</InlineMath> sa{" "}
                <InlineMath>{"x+1"}</InlineMath> dobijaš količnik{" "}
                <InlineMath>{"2x^2-3x+4"}</InlineMath> i ostatak{" "}
                <InlineMath>{"5"}</InlineMath>, odredi{" "}
                <InlineMath>{"P(x)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo zapis:</p>
                <MathBlock>
                  {"P(x)=(x+1)(2x^2-3x+4)+5."}
                </MathBlock>
                <p>Množenjem:</p>
                <MathBlock>
                  {
                    "(x+1)(2x^2-3x+4)=2x^3-3x^2+4x+2x^2-3x+4=2x^3-x^2+x+4."
                  }
                </MathBlock>
                <p>Zato je</p>
                <MathBlock>{"P(x)=2x^3-x^2+x+9."}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Tri ideje za čvrstu osnovu"
        description="Ako iz ove lekcije poneseš sledeće tri ideje, imaš čvrstu osnovu za većinu školskih i prijemnih zadataka iz ove oblasti."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="1. Bezout pretvara deljenje u uvrštavanje"
            formula="r=P(a)"
            note={
              <>
                Kada deliš sa <InlineMath>{"x-a"}</InlineMath>, ostatak dobijaš
                samo izračunavanjem <InlineMath>{"P(a)"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="2. Deljivost znači nulu polinoma"
            formula={"x-a \\mid P(x) \\iff P(a)=0"}
            note="To je glavni alat za zadatke sa parametrima i za nalaženje činilaca."
          />
          <FormulaCard
            title="3. Horner daje i količnik i ostatak"
            formula={"\\text{poslednji broj} = \\text{ostatak}"}
            note="Koristi ga kada treba da nastaviš faktorizaciju ili pronađeš sve nule."
          />
          <FormulaCard
            title="Sledeći logičan korak"
            formula={"\\to"}
            note="Sledeća lekcija prirodno nastavlja ovu temu: nule polinoma i Vièteove formule za polinome višeg stepena. Tamo ćeš koristiti upravo ono što si ovde naučio o deljivosti i faktorima."
          />
        </div>

        <InsightCard title="Ključna poruka lekcije">
          <p>
            Kada vidiš linearni delilac, odmah se zapitaj: „Koji broj treba da
            ubacim u polinom?" Ako to umeš da pročitaš bez greške, pola posla je
            već završeno.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}
