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
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#izrazi", label: "Simetrični izrazi" },
  { href: "#nova", label: "Nova jednačina" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson21Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 21"
        title={
          <>
            Viètove{" "}
            <span className={cs.tHeroAccent}>formule</span>
          </>
        }
        description="Ova lekcija je prelomna tačka u algebri: prvi put vidiš da o korenovima kvadratne jednačine možeš da govoriš bez njihovog direktnog računanja. Na prijemnom to znači manje računanja, više kontrole i mnogo brže rešavanje zadataka sa parametrima."
        heroImageSrc="/images/lessons/lesson21_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa kvadratnom jednačinom, parabolom i vezom između korenova i koeficijenata"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da iz koeficijenata odmah dobiješ zbir i proizvod korenova, pa iz njih gradiš dalje izraze i nove jednačine.",
          },
          {
            label: "Najveća zamka",
            description:
              "U zadacima o pozitivnim ili negativnim korenovima zaboravlja se uslov Δ ≥ 0, pa se pogrešno prihvate kompleksna rešenja.",
          },
          {
            label: "Prijemni fokus",
            description:
              "FTN i ETF redovno traže simetrične izraze, nove jednačine sa transformisanim korenima i uslove na parametar.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "50 do 70 minuta sa primerima i vežbom.",
          },
          {
            label: "Predznanje",
            description:
              "Standardni oblik kvadratne jednačine, faktorizacija i diskriminanta iz prethodne lekcije.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevođenje priče o korenovima u račun nad zbirom i proizvodom, bez nepotrebnog traženja samih korenova.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija koja povezuje položaj korenova, parabolu i koeficijente jednačine.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Viètove formule pretvaraju kvadratnu jednačinu u priču o odnosima među korenovima"
        description="U mnogim zadacima ne treba ti stvarna vrednost svakog korena. Treba ti njihov zbir, proizvod, znak, ili nova jednačina čiji su koreni povezani sa starim korenima. Upravo tu Viètove formule štede vreme i smanjuju verovatnoću greške."
      >
        <div className={s.grid3}>
          <SectionCard title="Brže nego abc formula">
            <p>
              Kada zadatak pita samo{" "}
              <InlineMath>{"x_1+x_2"}</InlineMath>,{" "}
              <InlineMath>{"x_1x_2"}</InlineMath> ili izraz koji od njih
              zavisi, direktno računaš preko koeficijenata i preskačeš
              nepotreban posao.
            </p>
          </SectionCard>
          <SectionCard title="Koreni i koeficijenti nisu odvojeni svetovi">
            <p>
              Koeficijent uz <InlineMath>{"x"}</InlineMath> kontroliše zbir
              korenova, a slobodni član njihov proizvod. To je snažna mentalna
              slika za kasniju algebru.
            </p>
          </SectionCard>
          <SectionCard title="Priprema za parametre i polinome">
            <p>
              Isti princip ćeš kasnije koristiti kod parametarskih zadataka,
              nulâ polinoma i uslova na znak rešenja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključni pedagoški uvid">
          <p>
            Nemoj Viètove formule učiti kao dve izolovane formule. Uči ih kao
            ideju: iz faktorizacije dobijaš vezu između{" "}
            <em>korenova</em> i <em>koeficijenata</em>. Kad to razumeš, sve
            primene postaju prirodne.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja i uslovi"
        title="Od faktorizacije do formule: odakle zapravo dolazi Viète"
        description={
          "Ako kvadratna jednačina ax²+bx+c=0, a≠0, ima korenove x₁ i x₂, tada može da se napiše u faktorskom obliku. Kada uporediš koeficijente tog zapisa sa standardnim oblikom, formule izlaze same."
        }
      >
        <div className={s.grid2}>
          <SectionCard title="Faktorski oblik">
            <MathBlock>{"ax^2+bx+c=a(x-x_1)(x-x_2)"}</MathBlock>
            <p>
              Ovde je presudno da je vodeći koeficijent ostao{" "}
              <InlineMath>{"a"}</InlineMath>. Da si napisao samo{" "}
              <InlineMath>{"(x-x_1)(x-x_2)"}</InlineMath>, dobio bi moničnu
              jednačinu, a to nije uvek ista jednačina.
            </p>
          </SectionCard>
          <SectionCard title="Kada raširiš zagrade">
            <MathBlock>
              {"a(x-x_1)(x-x_2)=ax^2-a(x_1+x_2)x+ax_1x_2"}
            </MathBlock>
            <p>
              Sada uporedi koeficijente uz <InlineMath>{"x"}</InlineMath> i
              slobodni član sa jednačinom{" "}
              <InlineMath>{"ax^2+bx+c"}</InlineMath>. Tu se pojavljuju zbir i
              proizvod korenova.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Zbir korenova"
            formula={"x_1+x_2=-\\frac{b}{a}"}
            note={
              <>
                Koeficijent uz <InlineMath>{"x"}</InlineMath> nosi informaciju
                o zbiru korenova, ali sa minus znakom.
              </>
            }
          />
          <FormulaCard
            title="Proizvod korenova"
            formula={"x_1x_2=\\frac{c}{a}"}
            note="Slobodni član i vodeći koeficijent zajedno određuju proizvod korenova."
          />
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Samo zbir ili proizvod">
            <p>
              Ako zadatak traži samo{" "}
              <InlineMath>{"x_1+x_2"}</InlineMath> ili{" "}
              <InlineMath>{"x_1x_2"}</InlineMath>, Viètove formule su dovoljne.
              Diskriminanta tada nije neophodna.
            </p>
          </SectionCard>
          <SectionCard title="Znak realnih korenova">
            <p>
              Ako zadatak pita da li su oba korena pozitivna ili negativna,
              moraš dodati i uslov{" "}
              <InlineMath>{"\\Delta \\ge 0"}</InlineMath>, jer zbir i proizvod
              sami ne garantuju realnost.
            </p>
          </SectionCard>
          <SectionCard title="Recipročni koreni">
            <p>
              Ako praviš jednačinu sa korenima{" "}
              <InlineMath>{"\\frac{1}{x_1}"}</InlineMath> i{" "}
              <InlineMath>{"\\frac{1}{x_2}"}</InlineMath>, obavezno proveri da{" "}
              <InlineMath>{"x_1x_2\\neq 0"}</InlineMath>, odnosno{" "}
              <InlineMath>{"c\\neq 0"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mini-provera: zašto uslovi x₁+x₂>0 i x₁x₂>0 nisu dovoljni za zaključak da su oba korena pozitivna?"
          answer={
            <>
              <p>
                Zato što korenovi možda uopšte nisu realni. Na primer, jednačina
              </p>
              <MathBlock>{"x^2-2x+2=0"}</MathBlock>
              <p>ima</p>
              <MathBlock>
                {"x_1+x_2=2,\\qquad x_1x_2=2,"}
              </MathBlock>
              <p>ali je</p>
              <MathBlock>
                {"\\Delta = (-2)^2-4\\cdot 1\\cdot 2 = -4 < 0,"}
              </MathBlock>
              <p>
                pa nema realne korenove. Zato u zadacima o znaku realnih korenova
                dodaješ i <InlineMath>{"\\Delta \\ge 0"}</InlineMath>.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. SIMETRIČNI IZRAZI ═══════════ */}
      <LessonSection
        id="izrazi"
        eyebrow="Simetrični izrazi sa korenima"
        title="Kada ne tražiš korenove, nego pametno računaš preko s i p"
        description="Najveći broj zadataka traži izraz koji je simetričan u x₁ i x₂. To znači da ne zavisi od toga koji koren zoveš prvi, a koji drugi. Takvi izrazi gotovo uvek mogu da se svedu na zbir s i proizvod p."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Kvadrati korenova"
            formula="x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=s^2-2p"
            note={
              <>
                Ovo je verovatno najčešći prvi korak na prijemnom. Umesto da
                računaš svaki koren posebno, odmah koristiš identitet za
                kvadrat zbira.
              </>
            }
          />
          <FormulaCard
            title="Zbir recipročnih vrednosti"
            formula={"\\frac{1}{x_1}+\\frac{1}{x_2}=\\frac{x_1+x_2}{x_1x_2}=\\frac{s}{p}, \\qquad p\\neq 0"}
            note="Kad god vidiš recipročnu transformaciju, prvo proveri da proizvod nije nula. Ako je jedan koren nula, recipročna vrednost ne postoji."
          />
          <FormulaCard
            title="Kvadrat razlike korenova"
            formula="(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=s^2-4p"
            note={
              <>
                Pazi: ova formula daje{" "}
                <InlineMath>{"(x_1-x_2)^2"}</InlineMath>, a ne odmah{" "}
                <InlineMath>{"x_1-x_2"}</InlineMath>. Za samu razliku treba
                još da uzmeš koren i odrediš znak ako je redosled bitan.
              </>
            }
          />
          <FormulaCard
            title="Treći stepen korenova"
            formula="x_1^3+x_2^3=(x_1+x_2)^3-3x_1x_2(x_1+x_2)=s^3-3ps"
            note="Ovo je dobar primer kako Viètove formule rade i u složenijim izrazima: čim izraz uspeš da svedeš na s i p, zadatak je praktično gotov."
          />
        </div>

        <MicroCheck
          question="Mini-provera: koji tip izraza se najlakše računa Viètovim formulama?"
          answer={
            <p>
              Najlakše se računaju <strong>simetrični izrazi</strong>, oni koji
              se ne menjaju ako zameniš{" "}
              <InlineMath>{"x_1"}</InlineMath> i{" "}
              <InlineMath>{"x_2"}</InlineMath>. Na primer,{" "}
              <InlineMath>{"x_1+x_2"}</InlineMath>,{" "}
              <InlineMath>{"x_1x_2"}</InlineMath>,{" "}
              <InlineMath>{"x_1^2+x_2^2"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{1}{x_1}+\\frac{1}{x_2}"}</InlineMath> i{" "}
              <InlineMath>{"x_1^3+x_2^3"}</InlineMath> jesu simetrični. Izraz{" "}
              <InlineMath>{"x_1-x_2"}</InlineMath> nije simetričan, pa se
              obično računa preko{" "}
              <InlineMath>{"(x_1-x_2)^2"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. FORMIRANJE NOVE JEDNAČINE ═══════════ */}
      <LessonSection
        id="nova"
        eyebrow="Formiranje nove jednačine"
        title="Novi korenovi, ista logika: prvo nađi njihov zbir i proizvod"
        description={
          "Kada zadatak traži jednačinu čiji su korenovi, na primer, x₁+2 i x₂+2 ili 1/x₁ i 1/x₂, ne tražiš prvo stare korenove. Direktno računaš novi zbir i novi proizvod."
        }
      >
        <div className={s.grid2}>
          <SectionCard title="Tri koraka koja rešavaju skoro sve zadatke">
            <MathBlock>
              {"S'=y_1+y_2,\\qquad P'=y_1y_2"}
            </MathBlock>
            <MathBlock>{"t^2-S't+P'=0"}</MathBlock>
            <p>
              Ovde su <InlineMath>{"y_1"}</InlineMath> i{" "}
              <InlineMath>{"y_2"}</InlineMath> novi korenovi, a{" "}
              <InlineMath>{"t"}</InlineMath> je promenljiva nove jednačine.
              Ako dobiješ razlomke, na kraju pomnoži celu jednačinu zajedničkim
              imeniteljem.
            </p>
          </SectionCard>
          <SectionCard title="Ne računaj više nego što zadatak traži">
            <p>
              Ovo je tipičan prijemni obrazac. Zadatak je napravljen tako da te
              navede da kreneš sa abc formulom, a u stvari traži samo malo
              algebarskog reda. Kad vidiš &ldquo;nova jednačina&rdquo;, odmah
              pomisli na <InlineMath>{"S'"}</InlineMath> i{" "}
              <InlineMath>{"P'"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Korenovi <InlineMath>{"x_1+2"}</InlineMath> i{" "}
                  <InlineMath>{"x_2+2"}</InlineMath>
                </>
              }
            >
              <p>
                Neka su <InlineMath>{"x_1"}</InlineMath> i{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"x^2-5x+6=0"}</InlineMath>. Tada je{" "}
                <InlineMath>{"s=5"}</InlineMath>,{" "}
                <InlineMath>{"p=6"}</InlineMath>.
              </p>
              <MathBlock>
                {"S'=(x_1+2)+(x_2+2)=s+4=9"}
              </MathBlock>
              <MathBlock>
                {"P'=(x_1+2)(x_2+2)=p+2s+4=6+10+4=20"}
              </MathBlock>
              <p>
                Zato je nova jednačina{" "}
                <InlineMath>{"t^2-9t+20=0"}</InlineMath>.
              </p>
            </WalkStep>

            <WalkStep
              number={2}
              title={
                <>
                  Korenovi <InlineMath>{"\\frac{1}{x_1}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{1}{x_2}"}</InlineMath>
                </>
              }
            >
              <p>
                Neka su <InlineMath>{"x_1"}</InlineMath> i{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"3x^2-5x+2=0"}</InlineMath>. Tada je{" "}
                <InlineMath>{"s=\\frac{5}{3}"}</InlineMath>,{" "}
                <InlineMath>{"p=\\frac{2}{3}"}</InlineMath>.
              </p>
              <MathBlock>
                {"S'=\\frac{1}{x_1}+\\frac{1}{x_2}=\\frac{s}{p}=\\frac{5}{2}"}
              </MathBlock>
              <MathBlock>
                {"P'=\\frac{1}{x_1x_2}=\\frac{1}{p}=\\frac{3}{2}"}
              </MathBlock>
              <p>
                Dakle, nova jednačina je{" "}
                <InlineMath>{"t^2-\\frac{5}{2}t+\\frac{3}{2}=0"}</InlineMath>,
                odnosno <InlineMath>{"2t^2-5t+3=0"}</InlineMath>.
              </p>
            </WalkStep>

            <WalkStep
              number={3}
              title={
                <>
                  Korenovi <InlineMath>{"x_1^2"}</InlineMath> i{" "}
                  <InlineMath>{"x_2^2"}</InlineMath>
                </>
              }
            >
              <p>
                Neka su <InlineMath>{"x_1"}</InlineMath> i{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"x^2-6x+5=0"}</InlineMath>. Tada je{" "}
                <InlineMath>{"s=6"}</InlineMath>,{" "}
                <InlineMath>{"p=5"}</InlineMath>.
              </p>
              <MathBlock>
                {"S'=x_1^2+x_2^2=s^2-2p=36-10=26"}
              </MathBlock>
              <MathBlock>
                {"P'=x_1^2x_2^2=(x_1x_2)^2=p^2=25"}
              </MathBlock>
              <p>
                Zato je nova jednačina{" "}
                <InlineMath>{"t^2-26t+25=0"}</InlineMath>.
              </p>
            </WalkStep>

            <WalkStep
              number={4}
              title={
                <>
                  Korenovi <InlineMath>{"2x_1-1"}</InlineMath> i{" "}
                  <InlineMath>{"2x_2-1"}</InlineMath>
                </>
              }
            >
              <p>
                Neka su <InlineMath>{"x_1"}</InlineMath> i{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"x^2-4x+1=0"}</InlineMath>. Tada je{" "}
                <InlineMath>{"s=4"}</InlineMath>,{" "}
                <InlineMath>{"p=1"}</InlineMath>.
              </p>
              <MathBlock>
                {"S'=(2x_1-1)+(2x_2-1)=2s-2=6"}
              </MathBlock>
              <MathBlock>
                {"P'=(2x_1-1)(2x_2-1)=4p-2s+1=4-8+1=-3"}
              </MathBlock>
              <p>
                Nova jednačina je{" "}
                <InlineMath>{"t^2-6t-3=0"}</InlineMath>.
              </p>
            </WalkStep>
          </div>
        </div>

        <MicroCheck
          question="Mini-provera: zašto u novoj jednačini najčešće pišemo t²-S't+P'=0, a ne opet sa x?"
          answer={
            <p>
              Možeš i sa <InlineMath>{"x"}</InlineMath>, matematički je isto.
              Ali na papiru je preglednije da novu promenljivu označiš drugim
              slovom, na primer <InlineMath>{"t"}</InlineMath>, da ne pomešaš
              stare korenove <InlineMath>{"x_1,x_2"}</InlineMath> sa
              promenljivom nove jednačine. To posebno pomaže u dužim zadacima
              sa parametrima.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni deo"
        title="Laboratorija: pomeraj korenove i gledaj kako se menjaju koeficijenti"
        description={
          "U ovoj laboratoriji ti direktno biraš korenove x₁ i x₂, kao i vodeći koeficijent a. Sistem zatim crta parabolu, računa pripadnu jednačinu i pokazuje kako se menja nova jednačina kada transformišeš korenove."
        }
      >
        <VieteLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa koeficijentima kada
            pomeriš korenove, pa tek onda proveri ekran. Ako vidiš da se
            koeficijenti menjaju na predvidiv način, upravo to i jeste poenta:
            Viètove formule su most između geometrijske slike i algebarskog
            računa.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od osnovnog računa do parametra: kako se zadaci rešavaju bez lutanja"
        description="U svakom primeru ide isti redosled: standardni oblik, prepoznavanje a, b, c, zatim zbir s, proizvod p, pa tek onda izraz ili uslov koji zadatak traži. Ovaj redosled treba da postane rutina."
      >
        <div className={s.walkthrough}>
          <WalkStep
            number={1}
            title={
              <>
                Nađi <InlineMath>{"x_1+x_2"}</InlineMath>,{" "}
                <InlineMath>{"x_1x_2"}</InlineMath> i{" "}
                <InlineMath>{"x_1^2+x_2^2"}</InlineMath> za{" "}
                <InlineMath>{"2x^2-7x+3=0"}</InlineMath>
              </>
            }
          >
            <p>
              Prvo čitamo koeficijente:{" "}
              <InlineMath>{"a=2"}</InlineMath>,{" "}
              <InlineMath>{"b=-7"}</InlineMath>,{" "}
              <InlineMath>{"c=3"}</InlineMath>.
            </p>
            <MathBlock>
              {
                "s=x_1+x_2=-\\frac{b}{a}=\\frac{7}{2}, \\qquad p=x_1x_2=\\frac{c}{a}=\\frac{3}{2}"
              }
            </MathBlock>
            <MathBlock>
              {"x_1^2+x_2^2=s^2-2p=\\frac{49}{4}-3=\\frac{37}{4}"}
            </MathBlock>
            <p>
              Ovde nijednog trenutka nije bilo potrebe da nalaziš pojedinačne
              korenove. To je suština Viètove efikasnosti.
            </p>
          </WalkStep>

          <WalkStep
            number={2}
            title={
              <>
                Formiraj jednačinu čiji su korenovi{" "}
                <InlineMath>{"x_1+1"}</InlineMath> i{" "}
                <InlineMath>{"x_2+1"}</InlineMath>, ako su{" "}
                <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi od{" "}
                <InlineMath>{"x^2-5x+6=0"}</InlineMath>
              </>
            }
          >
            <p>
              Iz početne jednačine dobijaš <InlineMath>{"s=5"}</InlineMath> i{" "}
              <InlineMath>{"p=6"}</InlineMath>.
            </p>
            <MathBlock>
              {"S'=(x_1+1)+(x_2+1)=s+2=7"}
            </MathBlock>
            <MathBlock>
              {"P'=(x_1+1)(x_2+1)=p+s+1=6+5+1=12"}
            </MathBlock>
            <p>Zato nova jednačina glasi</p>
            <MathBlock>{"t^2-7t+12=0"}</MathBlock>
          </WalkStep>

          <WalkStep
            number={3}
            title={
              <>
                Odredi{" "}
                <InlineMath>
                  {"\\frac{1}{x_1}+\\frac{1}{x_2}"}
                </InlineMath>
                , ako su <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi od{" "}
                <InlineMath>{"3x^2-5x+2=0"}</InlineMath>
              </>
            }
          >
            <p>
              Iz jednačine čitamo{" "}
              <InlineMath>{"s=\\frac{5}{3}"}</InlineMath>,{" "}
              <InlineMath>{"p=\\frac{2}{3}"}</InlineMath>. Pošto je{" "}
              <InlineMath>{"p\\neq 0"}</InlineMath>, recipročna transformacija
              ima smisla.
            </p>
            <MathBlock>
              {
                "\\frac{1}{x_1}+\\frac{1}{x_2}=\\frac{s}{p}=\\frac{\\frac{5}{3}}{\\frac{2}{3}}=\\frac{5}{2}"
              }
            </MathBlock>
            <p>
              Najčešća greška ovde je da se zaboravi uslov{" "}
              <InlineMath>{"p\\neq 0"}</InlineMath>.
            </p>
          </WalkStep>

          <WalkStep
            number={4}
            title={
              <>
                Za koje <InlineMath>{"m"}</InlineMath> jednačina{" "}
                <InlineMath>{"x^2-(m+1)x+m-2=0"}</InlineMath> ima oba
                korena pozitivna?
              </>
            }
          >
            <p>
              Ovo je tipičan prijemni zadatak. Traže se realni pozitivni
              korenovi, pa treba kombinovati tri uslova.
            </p>
            <MathBlock>
              {"s=m+1,\\qquad p=m-2"}
            </MathBlock>
            <MathBlock>
              {"s>0 \\Rightarrow m>-1,\\qquad p>0 \\Rightarrow m>2"}
            </MathBlock>
            <MathBlock>
              {
                "\\Delta=(m+1)^2-4(m-2)=m^2-2m+9=(m-1)^2+8>0"
              }
            </MathBlock>
            <p>
              Diskriminanta je uvek pozitivna, pa jedini preostali uslov ostaje{" "}
              <InlineMath>{"m>2"}</InlineMath>. Dakle,
            </p>
            <MathBlock>{"m>2"}</MathBlock>
          </WalkStep>
        </div>
      </LessonSection>

      {/* ═══════════ 7. KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="Ključne formule"
        title="Mali formular koji vredi držati u glavi na prijemnom"
        description="Nije cilj da mehanički pamtiš deset formula, nego da nekoliko osnovnih identiteta koristiš kao alat. Sledeće relacije pokrivaju većinu standardnih zadataka."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Zbir korenova"
            formula={"x_1+x_2=-\\frac{b}{a}"}
            note="Prva stvar koju računaš čim vidiš kvadratnu jednačinu."
          />
          <FormulaCard
            title="Proizvod korenova"
            formula={"x_1x_2=\\frac{c}{a}"}
            note="Odmah ti govori mnogo i o znaku korenova."
          />
          <FormulaCard
            title="Kvadrati korenova"
            formula="x_1^2+x_2^2=s^2-2p"
            note="Najčešći izvedeni izraz."
          />
          <FormulaCard
            title="Kvadrat razlike"
            formula="(x_1-x_2)^2=s^2-4p"
            note="Dobar kad treba rastojanje između korenova ili provera jednakosti."
          />
          <FormulaCard
            title="Recipročni zbir"
            formula={"\\frac{1}{x_1}+\\frac{1}{x_2}=\\frac{s}{p}, \\qquad p\\neq 0"}
            note="Ne koristi se ako je jedan koren nula."
          />
          <FormulaCard
            title="Novi zbir i novi proizvod"
            formula="t^2-S't+P'=0"
            note={
              <>
                Čim nađeš <InlineMath>{"S'"}</InlineMath> i{" "}
                <InlineMath>{"P'"}</InlineMath>, zadatak je praktično završen.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Ovde učenici najčešće gube poene"
        description='Viètove formule deluju kratko i bezopasno, pa zato baš ovde nastaju "sitne" greške koje ruše ceo zadatak. Vredi ih naučiti unapred, da ih na ispitu ne praviš iz navike.'
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen minus u zbiru</h3>
            <p>
              Za zbir važi <InlineMath>{"-\\frac{b}{a}"}</InlineMath>, a ne{" "}
              <InlineMath>{"\\frac{b}{a}"}</InlineMath>. Ovo je verovatno
              najčešća mehanička greška.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen uslov{" "}
              <InlineMath>{"\\Delta \\ge 0"}</InlineMath>
            </h3>
            <p>
              Kad tražiš pozitivne ili negativne <em>realne</em> korenove, zbir
              i proizvod nisu dovoljni.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preskakanje standardnog oblika</h3>
            <p>
              Ako jednačina nije sređena u oblik{" "}
              <InlineMath>{"ax^2+bx+c=0"}</InlineMath>, lako pogrešno pročitaš
              koeficijente.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan novi proizvod</h3>
            <p>
              Kod novih korenova učenici često dobro izračunaju zbir, ali
              proizvod razviju prebrzo i pogreše u znaku.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Recipročni koreni kada je{" "}
              <InlineMath>{"p=0"}</InlineMath>
            </h3>
            <p>
              Ako je <InlineMath>{"x_1x_2=0"}</InlineMath>, jedan od korenova
              je nula i recipročna vrednost ne postoji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"(x_1-x_2)^2"}</InlineMath> i{" "}
              <InlineMath>{"x_1-x_2"}</InlineMath>
            </h3>
            <p>
              Formula daje kvadrat razlike. Ako zadatak traži samu razliku,
              moraš još da uzmeš koren i odrediš odgovarajući znak.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se tema pojavljuje na FTN-u, ETF-u i sličnim prijemnim ispitima"
        description="Na prijemnom se Viètove formule retko pitaju školski. Umesto toga, sakrivene su u zadacima sa parametrima, uslovima na znak korenova i formiranjem nove jednačine. Poenta je da prepoznaš strukturu zadatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Parametar i znak korenova">
            <p>
              Najčešći obrazac: &ldquo;odredi{" "}
              <InlineMath>{"m"}</InlineMath> tako da oba korena budu
              pozitivna&rdquo; ili &ldquo;oba negativna&rdquo;. Tu ide obavezna
              trojka:
            </p>
            <ul>
              <li>
                <InlineMath>{"\\Delta \\ge 0"}</InlineMath>
              </li>
              <li>
                <InlineMath>{"x_1+x_2>0"}</InlineMath> za pozitivne, odnosno{" "}
                <InlineMath>{"x_1+x_2<0"}</InlineMath> za negativne
              </li>
              <li>
                <InlineMath>{"x_1x_2>0"}</InlineMath>
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Nova jednačina sa transformisanim korenima">
            <p>
              U ovim zadacima se proverava da li umeš da koristiš zbir i
              proizvod kao jezik transformacije, umesto da odmah krećeš na abc
              formulu. Brzina i preciznost ovde prave razliku.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Standardni oblik">
            <p>
              Bez sređene jednačine nema pouzdanog čitanja koeficijenata. Ovo
              mora biti prvi refleks.
            </p>
          </SectionCard>
          <SectionCard title="Šta zadatak zaista traži">
            <p>
              Ako ne traži pojedinačne korenove, verovatno ni ne treba da ih
              računaš.
            </p>
          </SectionCard>
          <SectionCard title="Da li postoje skriveni uslovi">
            <p>
              Realni korenovi, recipročna vrednost ili ograničenje na znak često
              su važniji od samog računa.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ 10. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe na kraju"
        title="Vežbaj kratko, ali ciljano"
        description="Rešavaj svaku vežbu istim redosledom. Ako preskočiš standardni oblik ili ne napišeš jasno šta su s i p, povećavaš šansu za grešku čak i kada znaš teoriju."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za jednačinu <InlineMath>{"x^2-9x+14=0"}</InlineMath> izračunaj{" "}
                <InlineMath>{"x_1+x_2"}</InlineMath>,{" "}
                <InlineMath>{"x_1x_2"}</InlineMath> i{" "}
                <InlineMath>{"x_1^2+x_2^2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"s=9"}</InlineMath>,{" "}
                  <InlineMath>{"p=14"}</InlineMath>. Zatim
                </p>
                <MathBlock>
                  {"x_1^2+x_2^2=s^2-2p=81-28=53"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Ako su <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"2x^2+x-3=0"}</InlineMath>, izračunaj{" "}
                <InlineMath>
                  {"\\frac{1}{x_1}+\\frac{1}{x_2}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Ovde je <InlineMath>{"s=-\\frac{1}{2}"}</InlineMath>,{" "}
                  <InlineMath>{"p=-\\frac{3}{2}"}</InlineMath>, pa
                </p>
                <MathBlock>
                  {
                    "\\frac{1}{x_1}+\\frac{1}{x_2}=\\frac{s}{p}=\\frac{-\\frac{1}{2}}{-\\frac{3}{2}}=\\frac{1}{3}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Formiraj jednačinu čiji su korenovi{" "}
                <InlineMath>{"x_1-2"}</InlineMath> i{" "}
                <InlineMath>{"x_2-2"}</InlineMath>, ako su{" "}
                <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"x^2-3x-4=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Početno: <InlineMath>{"s=3"}</InlineMath>,{" "}
                  <InlineMath>{"p=-4"}</InlineMath>.
                </p>
                <MathBlock>
                  {"S'=(x_1-2)+(x_2-2)=s-4=-1"}
                </MathBlock>
                <MathBlock>
                  {"P'=(x_1-2)(x_2-2)=p-2s+4=-4-6+4=-6"}
                </MathBlock>
                <p>Nova jednačina je</p>
                <MathBlock>{"t^2+t-6=0"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Formiraj jednačinu čiji su korenovi{" "}
                <InlineMath>{"\\frac{1}{x_1}"}</InlineMath> i{" "}
                <InlineMath>{"\\frac{1}{x_2}"}</InlineMath>, ako su{" "}
                <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"3x^2-5x+2=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Početno: <InlineMath>{"s=\\frac{5}{3}"}</InlineMath>,{" "}
                  <InlineMath>{"p=\\frac{2}{3}"}</InlineMath>, pa
                </p>
                <MathBlock>
                  {"S'=\\frac{s}{p}=\\frac{5}{2}, \\qquad P'=\\frac{1}{p}=\\frac{3}{2}"}
                </MathBlock>
                <p>Nova jednačina:</p>
                <MathBlock>
                  {"t^2-\\frac{5}{2}t+\\frac{3}{2}=0"}
                </MathBlock>
                <p>odnosno</p>
                <MathBlock>{"2t^2-5t+3=0"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Za koje <InlineMath>{"m"}</InlineMath> jednačina{" "}
                <InlineMath>{"x^2-(m-3)x+m=0"}</InlineMath> ima oba korena
                negativna?
              </p>
            }
            solution={
              <>
                <p>Treba:</p>
                <MathBlock>
                  {"s=m-3<0,\\qquad p=m>0,\\qquad \\Delta \\ge 0"}
                </MathBlock>
                <p>
                  Iz prva dva uslova dobijamo{" "}
                  <InlineMath>{"0<m<3"}</InlineMath>. Dalje:
                </p>
                <MathBlock>
                  {
                    "\\Delta=(m-3)^2-4m=m^2-10m+9=(m-1)(m-9)\\ge 0"
                  }
                </MathBlock>
                <p>
                  Odavde sledi <InlineMath>{"m\\le 1"}</InlineMath> ili{" "}
                  <InlineMath>{"m\\ge 9"}</InlineMath>. U preseku sa{" "}
                  <InlineMath>{"0<m<3"}</InlineMath> dobijamo
                </p>
                <MathBlock>{"0<m\\le 1"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Ako su <InlineMath>{"x_1"}</InlineMath>,{" "}
                <InlineMath>{"x_2"}</InlineMath> korenovi jednačine{" "}
                <InlineMath>{"x^2-6x+5=0"}</InlineMath>, formiraj jednačinu
                čiji su korenovi <InlineMath>{"x_1^2"}</InlineMath> i{" "}
                <InlineMath>{"x_2^2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Ovde je <InlineMath>{"s=6"}</InlineMath>,{" "}
                  <InlineMath>{"p=5"}</InlineMath>. Zatim:
                </p>
                <MathBlock>
                  {"S'=x_1^2+x_2^2=s^2-2p=36-10=26"}
                </MathBlock>
                <MathBlock>
                  {"P'=x_1^2x_2^2=p^2=25"}
                </MathBlock>
                <p>Nova jednačina je</p>
                <MathBlock>{"t^2-26t+25=0"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title='Najvažnije pitanje nije "koji su korenovi?", nego "šta o korenovima već znam?"'
        description="Kada u zadatku vidiš kvadratnu jednačinu, ne skači automatski na abc formulu. Prvo se zapitaj da li je dovoljno ono što već znaš iz koeficijenata: zbir, proizvod, znak, simetrični izraz ili nova jednačina. To je zreliji način razmišljanja i upravo to prijemni nagrađuje."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Ako uspeš da problem prevedeš na } s=x_1+x_2 \\text{ i } p=x_1x_2\\text{, najteži deo posla je uglavnom već urađen.}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako ove ideje umeš da primeniš bez zastajkivanja, spreman si za većinu standardnih prijemnih zadataka koji uključuju Viètove formule."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Osnovne formule</h3>
            <p>
              Za <InlineMath>{"ax^2+bx+c=0"}</InlineMath>,{" "}
              <InlineMath>{"a\\neq 0"}</InlineMath>, važi{" "}
              <InlineMath>{"x_1+x_2=-\\frac{b}{a}"}</InlineMath> i{" "}
              <InlineMath>{"x_1x_2=\\frac{c}{a}"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Simetrični izrazi</h3>
            <p>
              Simetrični izrazi se svode na{" "}
              <InlineMath>{"s=x_1+x_2"}</InlineMath> i{" "}
              <InlineMath>{"p=x_1x_2"}</InlineMath>, pa često nema potrebe da
              računaš pojedinačne korenove.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Diskriminanta</h3>
            <p>
              Kad zadatak traži znak realnih korenova, obavezno koristiš i
              diskriminantu: <InlineMath>{"\\Delta \\ge 0"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Nova jednačina</h3>
            <p>
              Kod nove jednačine najvažnije je izračunati novi zbir{" "}
              <InlineMath>{"S'"}</InlineMath> i novi proizvod{" "}
              <InlineMath>{"P'"}</InlineMath>, pa zapisati{" "}
              <InlineMath>{"t^2-S't+P'=0"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Najčešće zamke</h3>
            <p>
              Minus u zbiru, zaboravljena diskriminanta i neproveren uslov{" "}
              <InlineMath>{"p\\neq 0"}</InlineMath> kod recipročnih korenova.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći korak</h3>
            <p>
              Sledeći logičan korak u učenju je kvadratna nejednačina, gde se
              sve ovo kombinuje sa analizom znaka parabole.
            </p>
          </article>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
