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
import VieteLab from "./VieteLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#ideja", label: "Od nule do faktora" },
  { href: "#stav", label: "Osnovni stav algebre" },
  { href: "#kubna", label: "Kubna jednačina" },
  { href: "#cetvrta", label: "Četvrti stepen" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson15Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 15"
        title={
          <>
            Nule polinoma i{" "}
            <span className={cs.tHeroAccent}>Viètove formule</span>
          </>
        }
        description={'Ova lekcija povezuje tri ideje koje se na prijemnom stalno ukrštaju: nule polinoma, faktorski zapis i koeficijente polinoma. Kada razumeš kako se korenovi \u201Eupisuju\u201C u koeficijente, mnogi zadaci prestaju da budu nasumično računanje i postaju jasan sistem uslova.'}
        heroImageSrc="/api/lessons/15/hero"
        heroImageAlt="Ilustracija nula polinoma i Vijetovih formula"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako se iz koeficijenata čitaju odnosi među korenovima — zbir, parne proizvode i ukupni proizvod.",
          },
          {
            label: "Najveća zamka",
            description:
              'Znakovi i vodeći koeficijent \u2014 formule nisu samo \u201Eprepisivanje\u201C koeficijenata, znakovi se smenjuju.',
          },
          {
            label: "Prijemni fokus",
            description:
              "Veza između korenova — aritmetička progresija, poznat koren ili dat zbir i proizvod.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "55 do 75 minuta",
          },
          {
            label: "Predznanje",
            description: "Polinomi, deljenje i Bezoutov stav",
          },
          {
            label: "Glavna veština",
            description: "Pretvaranje uslova o korenovima u jednačine",
          },
          {
            label: "Interaktivno",
            description: "Viète laboratorija sa pomeranjem korenova",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Od koeficijenata do korenova i nazad"
        description={'Na prijemnom se retko traži samo \u201Enađi korenove\u201C. Mnogo češće dobijaš dodatni uslov: jedan koren je poznat, korenovi su u progresiji, dve nule imaju isti zbir ili treba konstruisati polinom po zadatim osobinama. Viètove formule tada pretvaraju priču o korenovima u sistem jednačina nad koeficijentima.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Zašto je to važno baš na prijemnom">
            <p>
              Umesto da napamet tražiš faktorizaciju, preko Viètovih formula
              odmah koristiš ono što je sigurno dostupno: koeficijente. To štedi
              vreme i smanjuje broj slučajnih grešaka, naročito kod kubnih i
              polinoma četvrtog stepena.
            </p>
          </SectionCard>
          <SectionCard title="Gde se ovo javlja kasnije">
            <p>
              Ista logika se pojavljuje u teoriji jednačina, analizi znakova,
              konstruisanju polinoma po zadatim korenovima i pri radu sa
              kompleksnim korenovima. Zato je važno da ovu lekciju ne učiš kao
              spisak formula, već kao način razmišljanja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključna poruka">
          <p>
            Dobar učenik ne gleda polinom samo kao izraz u promenljivoj{" "}
            <InlineMath>{"x"}</InlineMath>. On ga vidi i kao kodiranu
            informaciju o svojim korenovima.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OD NULE DO FAKTORA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Ključna veza"
        title="Od nule polinoma do faktora"
        description={
          'Sve počinje od jedne jednostavne, ali presudne ideje: broj \\(\\alpha\\) je nula polinoma \\(P(x)\\) ako i samo ako važi \\(P(\\alpha)=0\\). To nije samo definicija. To je most između \u201Ebroja koji poništava polinom\u201C i \u201Ečinioca koji ulazi u faktorizaciju\u201C.'
        }
      >
        <div className={s.grid3}>
          <SectionCard title="Nula polinoma">
            <p>
              Broj <InlineMath>{"\\alpha"}</InlineMath> je nula polinoma ako
              uvrštavanjem dobiješ nulu. Drugim rečima, tačka{" "}
              <InlineMath>{"\\alpha"}</InlineMath> na{" "}
              <InlineMath>{"x"}</InlineMath>-osi je mesto gde graf polinoma seče
              ili dodiruje osu.
            </p>
          </SectionCard>
          <SectionCard title="Koren i činilac">
            <p>
              Ako je <InlineMath>{"\\alpha"}</InlineMath> koren, onda je{" "}
              <InlineMath>{"x-\\alpha"}</InlineMath> činilac polinoma. Obrnuto,
              ako je <InlineMath>{"x-\\alpha"}</InlineMath> činilac, onda je{" "}
              <InlineMath>{"\\alpha"}</InlineMath> koren.
            </p>
          </SectionCard>
          <SectionCard title="Višestruki koren">
            <p>
              Ako se faktor <InlineMath>{"(x-\\alpha)"}</InlineMath> pojavljuje
              više puta, kažeš da je <InlineMath>{"\\alpha"}</InlineMath>{" "}
              višestruki koren. To je važno jer osnovni stav algebre broji
              korenove upravo sa višestrukostima.
            </p>
          </SectionCard>
        </div>

        <MathBlock>{"P(\\alpha)=0 \\iff x-\\alpha \\mid P(x)"}</MathBlock>
        <MathBlock>
          {
            "P(x)=a(x-\\alpha)^k Q(x), \\quad Q(\\alpha)\\neq 0 \\Longrightarrow \\alpha \\text{ je koren višestrukosti } k"
          }
        </MathBlock>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija">
            <p>
              Kada polinom napišeš u faktorskom obliku, svaki faktor{" "}
              <InlineMath>{"(x-\\alpha)"}</InlineMath> „čeka" da uvrstiš baš{" "}
              <InlineMath>{"x=\\alpha"}</InlineMath>. Tada taj faktor postaje
              nula, pa ceo proizvod postaje nula.
            </p>
          </SectionCard>
          <SectionCard title="Važna dopuna za realne koeficijente">
            <p>
              Ako polinom ima realne koeficijente i jedan nerealni koren je{" "}
              <InlineMath>{"a+bi"}</InlineMath>, onda je i{" "}
              <InlineMath>{"a-bi"}</InlineMath> koren. Zbog toga se nerealni
              korenovi javljaju u konjugovanim parovima.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je 2 dvostruki koren polinoma trećeg stepena, koji faktor sigurno postoji?"
          answer={
            <>
              <p>
                Sigurno postoji faktor{" "}
                <InlineMath>{"(x-2)^2"}</InlineMath>. Pošto je stepen polinoma{" "}
                <InlineMath>{"3"}</InlineMath>, ostaje još jedan linearni faktor.
                Dakle polinom je oblika
              </p>
              <MathBlock>{"P(x)=a(x-2)^2(x-\\beta)."}</MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNI STAV ALGEBRE ═══════════ */}
      <LessonSection
        id="stav"
        eyebrow="Centralna teorema"
        title="Osnovni stav algebre i broj korenova"
        description="Osnovni stav algebre kaže da svaki polinom stepena n, sa nenultim vodećim koeficijentom, ima tačno n kompleksnih korenova ako ih brojiš sa višestrukostima. Ovo je centralna ideja koja objašnjava zašto Viètove formule imaju smisla i za više stepene."
      >
        <div className={s.grid2}>
          <SectionCard title="Formalni zapis">
            <MathBlock>
              {
                "P(x)=a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0,\\quad a_n\\neq 0"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\Longrightarrow P(x)=a_n(x-x_1)(x-x_2)\\cdots(x-x_n)"
              }
            </MathBlock>
            <p>
              pri čemu su <InlineMath>{"x_1,\\dots,x_n"}</InlineMath> kompleksni
              korenovi, računajući višestrukosti.
            </p>
          </SectionCard>
          <SectionCard title="Kako ovo da tumačiš kao učenik">
            <p>
              Polinom trećeg stepena ne mora imati tri različita realna korena.
              Može imati jedan realan i dva kompleksna, ili dva različita realna
              ako je jedan dvostruk, ili čak jedan trostruki koren. Broj
              &ldquo;3&rdquo; odnosi se na ukupan broj korenova sa
              višestrukostima u kompleksnom skupu.
            </p>
          </SectionCard>
        </div>

        <div className={s.exampleGrid} style={{ marginTop: 16 }}>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Polinom sa višestrukim korenom
            </h3>
            <p>
              Posmatraj polinom
            </p>
            <MathBlock>{"P(x)=x^3-3x^2+4=(x-2)^2(x+1)."}</MathBlock>
            <p>
              On je trećeg stepena, ali ima samo dve različite realne nule:{" "}
              <InlineMath>{"2"}</InlineMath> i <InlineMath>{"-1"}</InlineMath>.
              Ipak, broj <InlineMath>{"2"}</InlineMath> se broji dva puta jer je
              dvostruki koren.
            </p>
          </article>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Polinom bez realnih korenova
            </h3>
            <p>Jednačina</p>
            <MathBlock>{"x^4+1=0"}</MathBlock>
            <p>
              nema realna rešenja, ali po osnovnom stavu algebre ipak ima četiri
              kompleksna korena. To znači da &ldquo;nema realnih
              korenova&rdquo; ne znači &ldquo;nema korenova&rdquo;.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: koliko korenova ima polinom x⁴+1?"
          answer={
            <p>
              Ima četiri kompleksna korena, računajući višestrukosti. U realnom
              skupu nema nijedan koren, ali osnovni stav algebre se odnosi na
              kompleksne brojeve, ne samo na realne.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KUBNA JEDNAČINA ═══════════ */}
      <LessonSection
        id="kubna"
        eyebrow="Kubna jednačina"
        title="Viètove formule za kubnu jednačinu"
        description="Za kubni polinom najvažnije su tri simetrične sume: zbir svih korenova, zbir proizvoda po dva korena i proizvod sva tri korena. Upravo te tri veličine čitaš direktno iz koeficijenata."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Monični kubni polinom"
            formula="x^3+px^2+qx+r=0"
            note={
              <>
                <MathBlock>{"x_1+x_2+x_3=-p"}</MathBlock>
                <MathBlock>{"x_1x_2+x_1x_3+x_2x_3=q"}</MathBlock>
                <MathBlock>{"x_1x_2x_3=-r"}</MathBlock>
              </>
            }
          />
          <FormulaCard
            title="Opšti kubni polinom"
            formula={"ax^3+bx^2+cx+d=0,\\quad a\\neq 0"}
            note={
              <>
                <MathBlock>{"x_1+x_2+x_3=-\\frac{b}{a}"}</MathBlock>
                <MathBlock>{"x_1x_2+x_1x_3+x_2x_3=\\frac{c}{a}"}</MathBlock>
                <MathBlock>{"x_1x_2x_3=-\\frac{d}{a}"}</MathBlock>
              </>
            }
          />
        </div>

        <SectionCard title="Odakle dolaze ove formule">
          <p>
            Kreneš od faktorskog oblika
          </p>
          <MathBlock>{"a(x-x_1)(x-x_2)(x-x_3)"}</MathBlock>
          <p>i razviješ proizvod. Dobijaš</p>
          <MathBlock>
            {
              "a\\left[x^3-(x_1+x_2+x_3)x^2+(x_1x_2+x_1x_3+x_2x_3)x-x_1x_2x_3\\right]."
            }
          </MathBlock>
          <p>
            Zatim samo uporediš koeficijente uz{" "}
            <InlineMath>{"x^2"}</InlineMath>, <InlineMath>{"x"}</InlineMath> i
            slobodni član.
          </p>
        </SectionCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Brza provera: Polinom{" "}
              <InlineMath>{"x^3-6x^2+11x-6"}</InlineMath>
            </h3>
            <p>
              Ako su korenovi <InlineMath>{"1"}</InlineMath>,{" "}
              <InlineMath>{"2"}</InlineMath> i <InlineMath>{"3"}</InlineMath>,
              tada je zbir <InlineMath>{"6"}</InlineMath>, zbir proizvoda po dva
              korena <InlineMath>{"11"}</InlineMath>, a proizvod{" "}
              <InlineMath>{"6"}</InlineMath>. To se savršeno slaže sa formulama:
            </p>
            <MathBlock>{"-(-6)=6,\\qquad 11=11,\\qquad -(-6)=6."}</MathBlock>
          </article>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Pedagoška ideja: Šta prvo tražiš na ispitu
            </h3>
            <p>
              Kod kubne jednačine najpre pročitaš zbir korenova. Ako zadatak
              pominje aritmetičku progresiju, srednji član je odmah određen
              preko tog zbira. To je često najbrži ulaz u zadatak.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je zbir korenova kubne jednačine 5, koliki je koeficijent uz x² u moničnom slučaju?"
          answer={
            <>
              <p>
                Za jednačinu oblika
              </p>
              <MathBlock>{"x^3+px^2+qx+r=0"}</MathBlock>
              <p>
                važi <InlineMath>{"x_1+x_2+x_3=-p"}</InlineMath>. Ako je zbir
                korenova <InlineMath>{"5"}</InlineMath>, onda je{" "}
                <InlineMath>{"p=-5"}</InlineMath>.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ ČETVRTI STEPEN ═══════════ */}
      <LessonSection
        id="cetvrta"
        eyebrow="Četvrti stepen"
        title="Viètove formule za jednačinu četvrtog stepena"
        description="Kod polinoma četvrtog stepena pojavljuje se još jedna simetrična suma: zbir proizvoda po tri korena. Znakovi se smenjuju po istom obrascu kao u faktorskom razvoju, pa je preciznost ovde presudna."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Monični polinom četvrtog stepena"
            formula="x^4+px^3+qx^2+rx+s=0"
            note={
              <>
                <MathBlock>{"x_1+x_2+x_3+x_4=-p"}</MathBlock>
                <MathBlock>
                  {"\\sum_{1\\le i<j\\le 4} x_ix_j=q"}
                </MathBlock>
                <MathBlock>
                  {"\\sum_{1\\le i<j<k\\le 4} x_ix_jx_k=-r"}
                </MathBlock>
                <MathBlock>{"x_1x_2x_3x_4=s"}</MathBlock>
              </>
            }
          />
          <FormulaCard
            title="Opšti slučaj"
            formula="ax^4+bx^3+cx^2+dx+e=0"
            note={
              <>
                <MathBlock>{"x_1+x_2+x_3+x_4=-\\frac{b}{a}"}</MathBlock>
                <MathBlock>
                  {"\\sum_{1\\le i<j\\le 4} x_ix_j=\\frac{c}{a}"}
                </MathBlock>
                <MathBlock>
                  {"\\sum_{1\\le i<j<k\\le 4} x_ix_jx_k=-\\frac{d}{a}"}
                </MathBlock>
                <MathBlock>{"x_1x_2x_3x_4=\\frac{e}{a}"}</MathBlock>
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da ne pomešaš znakove">
            <p>
              Najlakše je da zapamtiš faktorski razvoj. Posle{" "}
              <InlineMath>{"x^4"}</InlineMath> dolazi minus uz zbir korenova,
              zatim plus uz zbir proizvoda po dva, pa minus uz zbir proizvoda po
              tri i na kraju plus uz proizvod sva četiri korena.
            </p>
          </SectionCard>
          <SectionCard title="Kada se ovaj oblik posebno lepo vidi">
            <p>
              Ako su korenovi simetrični, recimo{" "}
              <InlineMath>{"-a"}</InlineMath>, <InlineMath>{"-b"}</InlineMath>,{" "}
              <InlineMath>{"b"}</InlineMath>, <InlineMath>{"a"}</InlineMath>,
              koeficijenti uz neparne stepene često nestaju. To daje veoma
              pregledne zadatke, ali samo ako prepoznaš simetriju na vreme.
            </p>
          </SectionCard>
        </div>

        <article className={s.exampleCard} style={{ marginTop: 16 }}>
          <h3 className={cs.tCardTitle}>
            Primer: Korenovi <InlineMath>{"-3"}</InlineMath>,{" "}
            <InlineMath>{"-1"}</InlineMath>, <InlineMath>{"1"}</InlineMath>,{" "}
            <InlineMath>{"3"}</InlineMath>
          </h3>
          <p>
            Zbir korenova je <InlineMath>{"0"}</InlineMath>, zbir proizvoda po
            dva je <InlineMath>{"-10"}</InlineMath>, zbir proizvoda po tri je{" "}
            <InlineMath>{"0"}</InlineMath>, a proizvod svih korenova je{" "}
            <InlineMath>{"9"}</InlineMath>. Zato je monični polinom
          </p>
          <MathBlock>{"x^4-10x^2+9."}</MathBlock>
          <p>Još kraći put je grupisanje:</p>
          <MathBlock>
            {
              "(x+3)(x-3)(x+1)(x-1)=(x^2-9)(x^2-1)=x^4-10x^2+9."
            }
          </MathBlock>
        </article>

        <MicroCheck
          question="Mikro-provera: šta znaš o zbiru korenova i zbiru trostrukih proizvoda ako u polinomu četvrtog stepena nema članova x³ i x?"
          answer={
            <>
              <p>
                Ako je jednačina oblika
              </p>
              <MathBlock>{"x^4+qx^2+s=0,"}</MathBlock>
              <p>
                onda su koeficijenti uz <InlineMath>{"x^3"}</InlineMath> i{" "}
                <InlineMath>{"x"}</InlineMath> jednaki nuli. Zato važi
              </p>
              <MathBlock>{"x_1+x_2+x_3+x_4=0"}</MathBlock>
              <p>i</p>
              <MathBlock>
                {"\\sum_{1\\le i<j<k\\le 4} x_ix_jx_k=0."}
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni deo"
        title="Interaktivna Viète laboratorija"
        description={'U ovom delu sam biraš realne korenove i pratiš kako se iz njih formiraju koeficijenti. Cilj nije samo računanje, već stvaranje osećaja: kada se korenovi pomere, polinom menja \u201Epotpis\u201C u svojim koeficijentima.'}
      >
        <VieteLab />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description="Ovde je najvažnije da vidiš kako se teorija koristi u realnom zadatku. Nemoj preskakati korake. Cilj je da ti postane prirodno da iz koeficijenata prvo pročitaš simetrične sume, a tek onda koristiš dodatni uslov iz teksta zadatka."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Kubna jednačina čiji su korenovi u aritmetičkoj
              progresiji
            </h3>
            <p>Rešiti jednačinu</p>
            <MathBlock>{"x^3-12x^2+47x-60=0"}</MathBlock>
            <p>
              ako je poznato da su njeni korenovi u aritmetičkoj progresiji.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Čitaj zbir korenova">
                <p>
                  Po Vièti važi
                </p>
                <MathBlock>{"x_1+x_2+x_3=12."}</MathBlock>
                <p>
                  Ako su korenovi u aritmetičkoj progresiji, piši ih kao{" "}
                  <InlineMath>{"4-d"}</InlineMath>,{" "}
                  <InlineMath>{"4"}</InlineMath>,{" "}
                  <InlineMath>{"4+d"}</InlineMath>, jer je srednji član
                  aritmetička sredina.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Iskoristi proizvod korenova">
                <p>Proizvod je</p>
                <MathBlock>{"(4-d)\\cdot 4\\cdot (4+d)=60."}</MathBlock>
                <p>Dakle</p>
                <MathBlock>
                  {
                    "4(16-d^2)=60 \\Longrightarrow 64-4d^2=60 \\Longrightarrow d^2=1."
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zapiši korenove">
                <p>
                  Dobijaš <InlineMath>{"d=1"}</InlineMath>, pa su korenovi
                </p>
                <MathBlock>{"3,\\ 4,\\ 5."}</MathBlock>
                <p>
                  Brza provera: zbir je <InlineMath>{"12"}</InlineMath>, zbir
                  proizvoda po dva je <InlineMath>{"47"}</InlineMath>, a proizvod
                  je <InlineMath>{"60"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Parametar i poznat koren
            </h3>
            <p>
              Odrediti <InlineMath>{"m"}</InlineMath> ako polinom
            </p>
            <MathBlock>{"P(x)=x^3-(m+3)x^2+(2m+1)x-3"}</MathBlock>
            <p>
              ima koren <InlineMath>{"x=1"}</InlineMath>. Zatim naći ostale
              korenove.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvo Bezout, pa Vièta">
                <p>
                  Pošto je <InlineMath>{"1"}</InlineMath> koren, važi
                </p>
                <MathBlock>{"P(1)=0."}</MathBlock>
                <p>Računamo:</p>
                <MathBlock>
                  {
                    "1-(m+3)+(2m+1)-3=0 \\Longrightarrow m-4=0."
                  }
                </MathBlock>
                <p>
                  Dakle <InlineMath>{"m=4"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti parametar">
                <p>Dobijeni polinom je</p>
                <MathBlock>{"x^3-7x^2+9x-3."}</MathBlock>
                <p>
                  Pošto je <InlineMath>{"1"}</InlineMath> koren, faktor je{" "}
                  <InlineMath>{"x-1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Nađi preostale korenove">
                <p>Deljenjem ili Hornerovom šemom dobija se</p>
                <MathBlock>
                  {"x^3-7x^2+9x-3=(x-1)(x^2-6x+3)."}
                </MathBlock>
                <p>Zato su ostali korenovi</p>
                <MathBlock>{"x=3\\pm \\sqrt{6}."}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Konstrukcija polinoma četvrtog stepena po zadatim
              korenovima
            </h3>
            <p>
              Konstruisati monični polinom četvrtog stepena čiji su korenovi{" "}
              <InlineMath>{"-3"}</InlineMath>, <InlineMath>{"-1"}</InlineMath>,{" "}
              <InlineMath>{"1"}</InlineMath> i <InlineMath>{"3"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Može Vièta, a može i pametno grupisanje"
              >
                <p>Najkraći put je</p>
                <MathBlock>
                  {"(x+3)(x-3)(x+1)(x-1)=(x^2-9)(x^2-1)."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Razvij proizvod">
                <p>Dobijaš</p>
                <MathBlock>
                  {"(x^2-9)(x^2-1)=x^4-10x^2+9."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Poveži sa koeficijentima">
                <p>
                  Po Vièti se odmah vidi da su zbir korenova i zbir trostrukih
                  proizvoda jednaki nuli, zato u polinomu nema članova{" "}
                  <InlineMath>{"x^3"}</InlineMath> i{" "}
                  <InlineMath>{"x"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Dva poznata korena kod polinoma četvrtog stepena
            </h3>
            <p>Naći sve korenove jednačine</p>
            <MathBlock>
              {"x^4-8x^3+23x^2-28x+12=0"}
            </MathBlock>
            <p>
              ako je poznato da su <InlineMath>{"1"}</InlineMath> i{" "}
              <InlineMath>{"2"}</InlineMath> korenovi.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Uvedi nepoznate preostale korenove"
              >
                <p>
                  Neka su preostali korenovi <InlineMath>{"u"}</InlineMath> i{" "}
                  <InlineMath>{"v"}</InlineMath>. Tada po Vièti važi
                </p>
                <MathBlock>
                  {"1+2+u+v=8 \\Longrightarrow u+v=5."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Iskoristi proizvod svih korenova">
                <p>
                  Pošto je slobodan član <InlineMath>{"12"}</InlineMath>, a
                  polinom je moničan,
                </p>
                <MathBlock>
                  {
                    "1\\cdot 2\\cdot u\\cdot v=12 \\Longrightarrow uv=6."
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši pomoćnu kvadratnu jednačinu">
                <p>
                  Brojevi <InlineMath>{"u"}</InlineMath> i{" "}
                  <InlineMath>{"v"}</InlineMath> su korenovi jednačine
                </p>
                <MathBlock>{"t^2-5t+6=0,"}</MathBlock>
                <p>pa je</p>
                <MathBlock>
                  {"t=2 \\quad \\text{ili} \\quad t=3."}
                </MathBlock>
                <p>Dakle svi korenovi su</p>
                <MathBlock>{"1,\\ 2,\\ 2,\\ 3."}</MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ključne formule i obrasci"
        description="Ako želiš stabilnost na prijemnom, ne uči formule odvojeno od njihove ideje. Svaka od narednih kartica predstavlja obrazac koji treba da ti bude automatski prepoznatljiv."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Veza koren-faktor"
            formula={"P(\\alpha)=0 \\iff x-\\alpha \\mid P(x)"}
            note="Ako znaš koren, znaš jedan faktor. Ako znaš faktor, znaš jedan koren."
          />
          <FormulaCard
            title="Kubna Vièta"
            formula={"\\sum x_i=-\\frac{b}{a},\\quad \\sum_{i<j} x_ix_j=\\frac{c}{a},\\quad x_1x_2x_3=-\\frac{d}{a}"}
            note="Najčešći prijemni zadaci traže baš kombinovanje ove tri relacije sa dodatnim uslovom."
          />
          <FormulaCard
            title="Kvartična Vièta"
            formula={"\\sum x_i=-\\frac{b}{a},\\quad \\sum_{i<j}x_ix_j=\\frac{c}{a},\\quad \\sum_{i<j<k}x_ix_jx_k=-\\frac{d}{a},\\quad x_1x_2x_3x_4=\\frac{e}{a}"}
            note="Kod četvrtog stepena najviše grešaka nastaje upravo na znaku uz trostruke proizvode."
          />
          <FormulaCard
            title="Aritmetička progresija"
            formula={"x_1=m-d,\\quad x_2=m,\\quad x_3=m+d,\\quad x_1+x_2+x_3=3m"}
            note="Čim zadatak kaže da su korenovi u aritmetičkoj progresiji, srednji član dobijaš direktno iz zbira korenova."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se gube laki poeni"
        description="Ove greške su tipične baš zato što učenik zna formulu, ali je mehanički koristi. Zato ih vredi unapred osvestiti."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen vodeći koeficijent</h3>
            <p>
              Kod jednačine{" "}
              <InlineMath>{"2x^3-5x^2+\\dots=0"}</InlineMath> zbir korenova
              nije <InlineMath>{"5"}</InlineMath>, nego{" "}
              <InlineMath>{"\\frac{5}{2}"}</InlineMath>, jer uvek deliš sa
              vodećim koeficijentom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešni znakovi</h3>
            <p>
              Znakovi se smenjuju. Kod kubne jednačine proizvod tri korena nosi
              minus, a kod polinoma četvrtog stepena proizvod sva četiri korena
              nosi plus.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Broje se samo različiti korenovi
            </h3>
            <p>
              Ako je <InlineMath>{"2"}</InlineMath> dvostruki koren, on se
              računa dva puta. To menja i broj korenova i Viètove relacije.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje simetričnih suma</h3>
            <p>
              Izraz{" "}
              <InlineMath>{"x_1x_2+x_1x_3+x_2x_3"}</InlineMath> nije isto što
              i <InlineMath>{"(x_1+x_2+x_3)^2"}</InlineMath>. To su potpuno
              različite veličine.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ignorisanje dodatnog uslova</h3>
            <p>
              Vièta sama često ne daje konkretne korenove. Potrebno je
              kombinovati formule sa uslovom iz zadatka: progresija, poznat
              koren, simetrija, deljivost.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pretpostavka da su svi korenovi realni
            </h3>
            <p>
              Osnovni stav algebre govori o kompleksnim korenovima. Ako zadatak
              ne garantuje realnost, ne smeš je podrazumevati bez provere.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta se najčešće traži na testu"
        description={'Na prijemnom se ova lekcija najčešće ne pojavljuje kao \u201Ečista teorija\u201C, već kao deo složenijeg problema. Zbog toga je korisno imati kratku mentalnu kontrolnu listu.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Tipični oblici zadataka">
            <ul>
              <li>
                korenovi su u aritmetičkoj progresiji ili imaju zadat
                zbir/proizvod
              </li>
              <li>
                jedan koren je poznat, pa treba odrediti parametar i ostale
                korenove
              </li>
              <li>
                zadati su neki korenovi, pa treba konstruisati polinom
              </li>
              <li>
                polinom četvrtog stepena ima simetrične korenove ili ponovljen
                koren
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Kontrolna lista pre nego što računaš">
            <ol>
              <li>
                pročitaj zbir korenova iz koeficijenta uz{" "}
                <InlineMath>{"x^{n-1}"}</InlineMath>
              </li>
              <li>pročitaj odgovarajući proizvod iz slobodnog člana</li>
              <li>
                uvedi zgodne oznake za korenove prema uslovu iz zadatka
              </li>
              <li>
                na kraju obavezno proveri da li dobijeni korenovi zaista
                zadovoljavaju sve uslove
              </li>
            </ol>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni savet">
          <p>
            Ako vidiš uslov &ldquo;korenovi su u aritmetičkoj
            progresiji&rdquo;, nemoj odmah pokušavati faktorizaciju. Prvo
            pročitaj zbir korenova i uvedi oblik{" "}
            <InlineMath>{"m-d"}</InlineMath>, <InlineMath>{"m"}</InlineMath>,{" "}
            <InlineMath>{"m+d"}</InlineMath>. To je gotovo uvek najstabilniji
            početak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Vežbe za samostalan rad"
        description="Pokušaj da svaku vežbu prvo uradiš bez otvaranja rešenja. Kod ovih zadataka nije poenta samo doći do rezultata, već vežbati redosled misli."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Tri uzastopna cela korena"
            problem={
              <>
                <p>Rešiti jednačinu</p>
                <MathBlock>{"x^3-9x^2+26x-24=0"}</MathBlock>
                <p>ako su njeni korenovi tri uzastopna cela broja.</p>
              </>
            }
            solution={
              <>
                <p>
                  Po Vièti je zbir korenova <InlineMath>{"9"}</InlineMath>, pa
                  je srednji član <InlineMath>{"3"}</InlineMath>. Zato su
                  korenovi oblika <InlineMath>{"3-1"}</InlineMath>,{" "}
                  <InlineMath>{"3"}</InlineMath>,{" "}
                  <InlineMath>{"3+1"}</InlineMath>, odnosno
                </p>
                <MathBlock>{"2,\\ 3,\\ 4."}</MathBlock>
                <p>
                  Provera: <InlineMath>{"2\\cdot 3\\cdot 4=24"}</InlineMath>, pa
                  sve odgovara.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 2: Provera korena i simetričnih suma"
            problem={
              <>
                <p>Za jednačinu</p>
                <MathBlock>{"2x^3-9x^2+13x-6=0"}</MathBlock>
                <p>
                  odredi zbir korenova, zbir proizvoda po dva korena i proizvod
                  sva tri korena. Zatim proveri da li je{" "}
                  <InlineMath>{"x=1"}</InlineMath> koren.
                </p>
              </>
            }
            solution={
              <>
                <p>Po Vièti važi</p>
                <MathBlock>
                  {
                    "x_1+x_2+x_3=\\frac{9}{2},\\qquad x_1x_2+x_1x_3+x_2x_3=\\frac{13}{2},\\qquad x_1x_2x_3=3."
                  }
                </MathBlock>
                <p>Provera korena:</p>
                <MathBlock>{"P(1)=2-9+13-6=0."}</MathBlock>
                <p>
                  Dakle <InlineMath>{"1"}</InlineMath> jeste koren.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 3: Konstrukcija moničnog polinoma"
            problem={
              <>
                <p>
                  Konstruisati monični polinom četvrtog stepena čiji su korenovi{" "}
                  <InlineMath>{"-2"}</InlineMath>,{" "}
                  <InlineMath>{"-1"}</InlineMath>,{" "}
                  <InlineMath>{"1"}</InlineMath> i{" "}
                  <InlineMath>{"2"}</InlineMath>.
                </p>
              </>
            }
            solution={
              <>
                <p>Grupisanjem dobijaš</p>
                <MathBlock>
                  {
                    "(x+2)(x-2)(x+1)(x-1)=(x^2-4)(x^2-1)=x^4-5x^2+4."
                  }
                </MathBlock>
                <p>Dakle traženi polinom je</p>
                <MathBlock>{"x^4-5x^2+4."}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 4: Dva poznata korena kod polinoma četvrtog stepena"
            problem={
              <>
                <p>
                  Monični polinom četvrtog stepena ima korenove{" "}
                  <InlineMath>{"1"}</InlineMath>,{" "}
                  <InlineMath>{"2"}</InlineMath>, <InlineMath>{"r"}</InlineMath>{" "}
                  i <InlineMath>{"s"}</InlineMath>. Koeficijent uz{" "}
                  <InlineMath>{"x^3"}</InlineMath> je{" "}
                  <InlineMath>{"-9"}</InlineMath>, a slobodan član{" "}
                  <InlineMath>{"12"}</InlineMath>. Odredi{" "}
                  <InlineMath>{"r"}</InlineMath> i{" "}
                  <InlineMath>{"s"}</InlineMath>.
                </p>
              </>
            }
            solution={
              <>
                <p>
                  Iz koeficijenta uz <InlineMath>{"x^3"}</InlineMath> sledi
                </p>
                <MathBlock>
                  {"1+2+r+s=9 \\Longrightarrow r+s=6."}
                </MathBlock>
                <p>Iz slobodnog člana sledi</p>
                <MathBlock>
                  {"1\\cdot 2\\cdot r\\cdot s=12 \\Longrightarrow rs=6."}
                </MathBlock>
                <p>
                  Brojevi <InlineMath>{"r"}</InlineMath> i{" "}
                  <InlineMath>{"s"}</InlineMath> su korenovi jednačine
                </p>
                <MathBlock>{"t^2-6t+6=0,"}</MathBlock>
                <p>pa je</p>
                <MathBlock>{"r,s=3\\pm \\sqrt{3}."}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 5: Od uslova o korenovima do koeficijenata"
            problem={
              <>
                <p>Jednačina</p>
                <MathBlock>{"x^3+px^2+qx-8=0"}</MathBlock>
                <p>
                  ima koren <InlineMath>{"2"}</InlineMath>, a preostala dva
                  korena imaju zbir <InlineMath>{"2"}</InlineMath>. Odredi{" "}
                  <InlineMath>{"p"}</InlineMath> i{" "}
                  <InlineMath>{"q"}</InlineMath>.
                </p>
              </>
            }
            solution={
              <>
                <p>
                  Ako su ostali korenovi <InlineMath>{"m"}</InlineMath> i{" "}
                  <InlineMath>{"n"}</InlineMath>, onda je
                </p>
                <MathBlock>{"m+n=2."}</MathBlock>
                <p>
                  Pošto je proizvod svih korenova <InlineMath>{"8"}</InlineMath>,
                  važi
                </p>
                <MathBlock>
                  {"2mn=8 \\Longrightarrow mn=4."}
                </MathBlock>
                <p>Zbir svih korenova je</p>
                <MathBlock>{"2+m+n=4,"}</MathBlock>
                <p>pa je</p>
                <MathBlock>
                  {"-p=4 \\Longrightarrow p=-4."}
                </MathBlock>
                <p>Dalje,</p>
                <MathBlock>
                  {"q=2(m+n)+mn=2\\cdot 2+4=8."}
                </MathBlock>
                <p>Dakle</p>
                <MathBlock>{"p=-4,\\qquad q=8."}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 6: Višestruki koren"
            problem={
              <>
                <p>Objasni zašto polinom</p>
                <MathBlock>{"x^3-3x^2+4"}</MathBlock>
                <p>
                  ima tri korena računajući višestrukosti, iako ima samo dve
                  različite realne nule.
                </p>
              </>
            }
            solution={
              <>
                <p>Faktorisanjem dobijaš</p>
                <MathBlock>
                  {"x^3-3x^2+4=(x-2)^2(x+1)."}
                </MathBlock>
                <p>
                  Zato su korenovi <InlineMath>{"2"}</InlineMath>,{" "}
                  <InlineMath>{"2"}</InlineMath> i{" "}
                  <InlineMath>{"-1"}</InlineMath>. Broj{" "}
                  <InlineMath>{"2"}</InlineMath> se javlja dvaput, pa kažemo da
                  je dvostruki koren. Zato polinom trećeg stepena ima tri korena
                  računajući višestrukosti, iako su samo dve nule različite.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako iz ove lekcije treba da poneseš nekoliko stabilnih ideja, onda su to sledeće."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              Nula polinoma i faktor su ekvivalentni
            </h3>
            <p>
              Uslov <InlineMath>{"P(\\alpha)=0"}</InlineMath> odmah znači da je{" "}
              <InlineMath>{"x-\\alpha"}</InlineMath> činilac. To je osnova za
              razumevanje svih narednih relacija.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              Viètove formule povezuju koeficijente i korenove
            </h3>
            <p>
              Kod kubne i jednačine četvrtog stepena ne moraš da znaš same
              korenove da bi znao njihov zbir i određene proizvode.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              Vežbaj zadatke sa dodatnim uslovom
            </h3>
            <p>
              Najviše vrednosti iz ove lekcije dobijaš kada Viètu kombinuješ sa
              uslovima kao što su progresija, simetrija, poznat koren ili
              deljivost.
            </p>
          </article>
        </div>

        <InsightCard title="Završni uvid">
          <p>
            Najvažniji skok u razumevanju nastaje kada prestaneš da pitaš
            &ldquo;kako da rešim ovu jednačinu?&rdquo; i počneš da pitaš
            &ldquo;koja informacija o korenovima je već skrivena u
            koeficijentima?&rdquo;. Tada Viètove formule postaju alat, a ne
            formula za pamćenje.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}
