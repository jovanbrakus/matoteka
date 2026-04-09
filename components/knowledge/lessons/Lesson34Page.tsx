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
import ReductionLab from "./ReductionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#kvadranti", label: "Kvadranti" },
  { href: "#identiteti", label: "Identiteti" },
  { href: "#algoritam", label: "Algoritam" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Greške" },
  { href: "#prijemni", label: "Prijemni" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson34Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 34"
        title={
          <>
            Osnovni trigonometrijski identiteti{" "}
            <span className={cs.tHeroAccent}>
              i svođenje na prvi kvadrant
            </span>
          </>
        }
        description="Ova lekcija je tačka u kojoj trigonometrija postaje alat, a ne zbir nepovezanih formula. Cilj nije da mehanički pamtiš napamet sve oblike, nego da svaku vrednost brzo svedeš na ugao iz prvog kvadranta i da pri tom tačno odredi znak i funkciju koja ostaje."
        heroImageSrc="/api/lessons/34/hero"
        heroImageAlt="Jedinična kružnica sa kvadrantima, referentnim uglovima i formulama za svođenje"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da svaki ugao rastaviš na period, kvadrant i referentni ugao, pa zatim dobiješ tacnu vrednost funkcije bez lutanja.",
          },
          {
            label: "Najveća zamka",
            description:
              "Učenici često vide dobar mali ugao, ali pogrese znak ili zaborave da se kod 90\u00B0 \u00B1 \u03B1 menja funkcija u kofunkciju.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci često traže brz proračun vrednosti poput sin 150\u00B0, cos(7\u03C0/6) ili tg 765\u00B0, bez kalkulatora.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "65 do 90 minuta ako zaista prodjes primere i ne preskočiš interaktivni deo.",
          },
          {
            label: "Predznanje",
            description:
              "Radijani, standardni uglovi i trigonometrijska kružnica iz prethodne lekcije.",
          },
          {
            label: "Glavna veština",
            description:
              "Sigurno svođenje svakog tipičnog ugla na ugao iz prvog kvadranta uz ispravan znak i izbor funkcije.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja u realnom vremenu crta ugao, kvadrant, referentni ugao i formule za svođenje.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Bez ove tehnike trigonometrija je spora, a na prijemnom vreme nestaje"
        description="Na prijemnom se retko traži samo da znaš definiciju. Obično treba brzo da prepoznaš strukturu izraza, svedeš ugao na poznat oblik i odmah izračunaš vrednost. Ako nemas dobar sistem za svođenje na prvi kvadrant, lako ostaneš zarobljen u pamćenju napamet."
      >
        <div className={s.grid3}>
          <SectionCard title="Za naredne lekcije">
            <p>
              Adicioni teoremi, jednačine i transformacije ugla oslanjaju se na
              to da već umeš da sigurno barataš znakom i referentnim uglom.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni zadatak">
            <p>
              Vrlo često je pola zadatka rešeno onog trenutka kada iz{" "}
              <InlineMath>{"\\sin 210^\\circ"}</InlineMath> vidiš{" "}
              <InlineMath>{"-\\sin 30^\\circ"}</InlineMath>, ili iz{" "}
              <InlineMath>
                {"\\cos \\left(\\frac{11\\pi}{6}\\right)"}
              </InlineMath>{" "}
              vidiš{" "}
              <InlineMath>
                {"\\cos \\left(\\frac{\\pi}{6}\\right)"}
              </InlineMath>
              .
            </p>
          </SectionCard>
          <SectionCard title="Za samopouzdanje">
            <p>
              Kada znaš jasan algoritam, više ne proveravaš sve nasumice. Svaki
              ugao dobijaš kroz isti tok misli, pa grešaka ima manje.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{veliki ili negativan ugao} \\;\\longrightarrow\\; \\text{period} \\;\\longrightarrow\\; \\text{kvadrant} \\;\\longrightarrow\\; \\text{referentni ugao} \\;\\longrightarrow\\; \\text{znak i funkcija}"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: sta je zapravo cilj svođenja na prvi kvadrant?"
          answer={
            <p>
              Cilj nije samo da dobiješ manji ugao. Cilj je da problem prevedeš
              na jedan od standardnih uglova iz prvog kvadranta, gde već znaš
              tačne vrednosti funkcija. Tada se težak ugao svodi na kombinaciju{" "}
              <em>poznate vrednosti</em> i <em>ispravnog znaka</em>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KVADRANTI ═══════════ */}
      <LessonSection
        id="kvadranti"
        eyebrow="Znak po kvadrantima"
        title="Prvo pravilo: isti mali ugao može da nosi četiri različita znaka"
        description="Na trigonometrijskoj kružnici koordinata tačke određuje znak funkcija. Zato se pre računanja obavezno pitaš u kom kvadrantu leži ugao. Referentni ugao može biti isti, ali rezultat nije isti ako je ugao u drugom, trećem ili četvrtom kvadrantu."
      >
        <div className={s.grid2}>
          <SectionCard title="I kvadrant">
            <MathBlock>
              {
                "\\sin \\alpha > 0,\\; \\cos \\alpha > 0,\\; \\operatorname{tg}\\alpha > 0,\\; \\operatorname{ctg}\\alpha > 0"
              }
            </MathBlock>
            <p>
              Ovde su sve funkcije pozitivne. Ako je ugao već u prvom
              kvadrantu, nema nikakvog dodatnog minusa.
            </p>
          </SectionCard>
          <SectionCard title="II kvadrant">
            <MathBlock>
              {
                "\\sin \\theta > 0,\\; \\cos \\theta < 0,\\; \\operatorname{tg}\\theta < 0,\\; \\operatorname{ctg}\\theta < 0"
              }
            </MathBlock>
            <p>
              U drugom kvadrantu jedino sinus ostaje pozitivan, jer je ordinata
              tačke pozitivna, a apscisa negativna.
            </p>
          </SectionCard>
          <SectionCard title="III kvadrant">
            <MathBlock>
              {
                "\\sin \\theta < 0,\\; \\cos \\theta < 0,\\; \\operatorname{tg}\\theta > 0,\\; \\operatorname{ctg}\\theta > 0"
              }
            </MathBlock>
            <p>
              U trećem kvadrantu i sinus i kosinus su negativni, pa njihov
              količnik daje pozitivan tangens i pozitivan kotangens.
            </p>
          </SectionCard>
          <SectionCard title="IV kvadrant">
            <MathBlock>
              {
                "\\sin \\theta < 0,\\; \\cos \\theta > 0,\\; \\operatorname{tg}\\theta < 0,\\; \\operatorname{ctg}\\theta < 0"
              }
            </MathBlock>
            <p>
              U četvrtom kvadrantu pozitivan je samo kosinus. Ovo je cesta
              zamka kada učenik vidi ugao{" "}
              <InlineMath>{"330^\\circ"}</InlineMath> i upiše pogrešan plus
              kod tangensa.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da ovo brzo pamtiš">
            <p>
              Možeš da koristiš kratko pravilo: u prvom kvadrantu sve je
              pozitivno; u drugom samo sinus; u trećem tangens i kotangens; u
              četvrtom samo kosinus.
            </p>
          </SectionCard>
          <SectionCard title="Geometrijsko značenje">
            <p>
              <InlineMath>{"\\sin \\theta"}</InlineMath> je{" "}
              <InlineMath>{"y"}</InlineMath>-koordinata,{" "}
              <InlineMath>{"\\cos \\theta"}</InlineMath> je{" "}
              <InlineMath>{"x"}</InlineMath>-koordinata, a{" "}
              <InlineMath>
                {"\\operatorname{tg}\\theta = \\sin\\theta / \\cos\\theta"}
              </InlineMath>
              . Zato znakovi nisu proizvoljni nego dolaze direktno sa
              kružnice.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto su tangens i kotangens pozitivni u trećem kvadrantu?"
          answer={
            <p>
              Zato što su i sinus i kosinus negativni. Kada negativan broj
              podeliš negativnim brojem, dobiješ pozitivan rezultat, pa su i{" "}
              <InlineMath>{"\\operatorname{tg}\\theta"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{ctg}\\theta"}</InlineMath>{" "}
              pozitivni.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ IDENTITETI ═══════════ */}
      <LessonSection
        id="identiteti"
        eyebrow="Osnovni identiteti"
        title="Formula nije cilj sama po sebi: svaka od njih čuva jednu ideju"
        description="Kada znaš odakle identitet dolazi, manje ga zaboravljaš i lakše ga koristiš u zadacima. Ispod su identiteti koje treba da znaš sigurno, zajedno sa kratkim objašnjenjem zašto postoje i kada se koriste."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Fundamentalni identitet"
            formula={"\\sin^2 x + \\cos^2 x = 1"}
            note={
              <>
                Ovaj identitet dolazi iz jednačine jedinične kružnice{" "}
                <InlineMath>{"x^2 + y^2 = 1"}</InlineMath>, gde su{" "}
                <InlineMath>{"x = \\cos t"}</InlineMath> i{" "}
                <InlineMath>{"y = \\sin t"}</InlineMath>. To je najvažnija
                osnova za mnoge kasnije transformacije.
              </>
            }
          />
          <FormulaCard
            title="Odnos tangensa i kotangensa"
            formula={"\\operatorname{tg} x = \\frac{\\sin x}{\\cos x}, \\qquad \\operatorname{ctg} x = \\frac{\\cos x}{\\sin x}"}
            note="Ove relacije govore da tangens i kotangens nisu nove izolovane funkcije, već odnosi između sinusa i kosinusa."
          />
          <FormulaCard
            title="Identitet za tangens"
            formula={"1 + \\operatorname{tg}^2 x = \\frac{1}{\\cos^2 x}, \\qquad \\cos x \\ne 0"}
            note={
              <>
                Dobija se deljenjem fundamentalnog identiteta sa{" "}
                <InlineMath>{"\\cos^2 x"}</InlineMath>. Koristi se kada želiš
                da izraz sa tangensom prebaciš na sinus i kosinus ili obrnuto.
              </>
            }
          />
          <FormulaCard
            title="Identitet za kotangens"
            formula={"1 + \\operatorname{ctg}^2 x = \\frac{1}{\\sin^2 x}, \\qquad \\sin x \\ne 0"}
            note={
              <>
                Dobija se deljenjem fundamentalnog identiteta sa{" "}
                <InlineMath>{"\\sin^2 x"}</InlineMath>. Obavezno pamti uslov,
                jer kotangens nije definisan kada je{" "}
                <InlineMath>{"\\sin x = 0"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Parnost"
            formula={"\\sin(-x)=-\\sin x,\\quad \\cos(-x)=\\cos x,\\quad \\operatorname{tg}(-x)=-\\operatorname{tg}x,\\quad \\operatorname{ctg}(-x)=-\\operatorname{ctg}x"}
            note="Parnost je važna kod negativnih uglova. Sinus, tangens i kotangens su neparne funkcije, a kosinus je parna funkcija."
          />
          <FormulaCard
            title="Periodicnost"
            formula={"\\sin(x+360^\\circ k)=\\sin x,\\; \\cos(x+360^\\circ k)=\\cos x,\\; \\operatorname{tg}(x+180^\\circ k)=\\operatorname{tg}x"}
            note="Ako je ugao prevelik, prvo ga vrati u jedan puni krug ili jedan polukrug za tangens i kotangens. Ovo često skraćuje zadatak na jednu liniju."
          />
        </div>

        <MathBlock>
          {
            "\\text{Najkraći račun na prijemnom često glasi: } \\operatorname{tg}765^\\circ = \\operatorname{tg}(765^\\circ - 4 \\cdot 180^\\circ) = \\operatorname{tg}45^\\circ = 1"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: kako iz sin\u00B2x + cos\u00B2x = 1 dobiješ identitet za tangens?"
          answer={
            <>
              <p>
                Podelis celu jednačinu sa{" "}
                <InlineMath>{"\\cos^2 x"}</InlineMath>, ali samo kada je{" "}
                <InlineMath>{"\\cos x \\ne 0"}</InlineMath>:
              </p>
              <MathBlock>
                {
                  "\\frac{\\sin^2 x}{\\cos^2 x} + \\frac{\\cos^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} \\quad \\Longrightarrow \\quad \\operatorname{tg}^2 x + 1 = \\frac{1}{\\cos^2 x}"
                }
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ ALGORITAM ═══════════ */}
      <LessonSection
        id="algoritam"
        eyebrow="Algoritam svođenja"
        title="Jedan jasan postupak je bolji od deset napamet naučenih formula"
        description="Ako uvek ides istim redom, račun postaje stabilan. Sledeći algoritam je napravljen upravo za učenika koji radi zadatke pod pritiskom vremena i mora da izbegne sitne minus-greške."
      >
        <div className={s.grid2}>
          <SectionCard title="Algoritam u 5 koraka">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prvo smanji ugao pomoću periodičnosti ili parnosti"
              >
                <p>
                  Ako je ugao negativan ili veći od{" "}
                  <InlineMath>{"360^\\circ"}</InlineMath>, nemoj odmah tražiti
                  kvadrant. Prvo ga svedi na ekvivalentan ugao koji lakse
                  čitaš. Kod tangensa i kotangensa često je zgodnije koristiti
                  period <InlineMath>{"180^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi kvadrant ili osu">
                <p>
                  Kada znaš gde ugao lezi, odmah znaš i znak funkcije. Ako je
                  ugao na osi, obrati pažnju na definisanost tangensa i
                  kotangensa.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Nađi referentni ugao{" "}
                    <InlineMath>{"\\alpha"}</InlineMath> iz prvog kvadranta
                  </>
                }
              >
                <p>
                  Referentni ugao je najmanji pozitivan ugao između kraka
                  ugla i <InlineMath>{"x"}</InlineMath>-ose. U praksi ga
                  dobijaš oblicima kao što su{" "}
                  <InlineMath>{"180^\\circ - \\alpha"}</InlineMath>,{" "}
                  <InlineMath>{"180^\\circ + \\alpha"}</InlineMath>,{" "}
                  <InlineMath>{"360^\\circ - \\alpha"}</InlineMath>,{" "}
                  <InlineMath>{"90^\\circ \\pm \\alpha"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={4}
                title="Proveri da li funkcija ostaje ista ili prelazi u kofunkciju"
              >
                <p>
                  Kod oblika uz <InlineMath>{"180^\\circ"}</InlineMath> i{" "}
                  <InlineMath>{"360^\\circ"}</InlineMath> funkcija uglavnom
                  ostaje ista, a menja se samo znak. Kod oblika uz{" "}
                  <InlineMath>{"90^\\circ"}</InlineMath> i{" "}
                  <InlineMath>{"270^\\circ"}</InlineMath> prelaziš sa sinusa
                  na kosinus ili sa tangensa na kotangens.
                </p>
              </WalkStep>
              <WalkStep
                number={5}
                title="Na kraju koristi tacnu vrednost standardnog ugla"
              >
                <p>
                  Tek sada upisuješ{" "}
                  <InlineMath>{"\\sin 30^\\circ = \\tfrac{1}{2}"}</InlineMath>,{" "}
                  <InlineMath>
                    {"\\cos 60^\\circ = \\tfrac{1}{2}"}
                  </InlineMath>
                  ,{" "}
                  <InlineMath>{"\\operatorname{tg}45^\\circ = 1"}</InlineMath>{" "}
                  i slično. Time razdvajas geometrijsko rezonovanje od
                  aritmetike.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Ključna pravila svođenja">
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <strong style={{ color: "var(--lesson-primary-soft)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Ista funkcija
                </strong>
                <MathBlock>
                  {
                    "\\sin(180^\\circ-\\alpha)=\\sin\\alpha,\\quad \\cos(180^\\circ-\\alpha)=-\\cos\\alpha"
                  }
                </MathBlock>
                <p>
                  Kod oblika sa <InlineMath>{"180^\\circ"}</InlineMath>{" "}
                  referentni ugao je <InlineMath>{"\\alpha"}</InlineMath>, ali
                  znak dolazi iz kvadranta.
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--lesson-primary-soft)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Kofunkcija
                </strong>
                <MathBlock>
                  {
                    "\\sin(90^\\circ-\\alpha)=\\cos\\alpha,\\quad \\cos(90^\\circ-\\alpha)=\\sin\\alpha"
                  }
                </MathBlock>
                <p>
                  Kada meriš ugao od <InlineMath>{"y"}</InlineMath>-ose,
                  prirodno je da se sinus i kosinus zamene uloge.
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--lesson-primary-soft)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Prakticna rečenica
                </strong>
                <p>
                  Ako vidiš{" "}
                  <InlineMath>{"90^\\circ \\pm \\alpha"}</InlineMath> ili{" "}
                  <InlineMath>{"270^\\circ \\pm \\alpha"}</InlineMath>,
                  najpre pomisli: <em>verovatno ide kofunkcija</em>. Ako
                  vidiš{" "}
                  <InlineMath>{"180^\\circ \\pm \\alpha"}</InlineMath> ili{" "}
                  <InlineMath>{"360^\\circ - \\alpha"}</InlineMath>, pomisli:{" "}
                  <em>funkcija ostaje ista, menja se znak</em>.
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--lesson-primary-soft)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Provera rezultata
                </strong>
                <p>
                  Uvek postavi sebi pitanje: da li dobijeni znak ima smisla za
                  taj kvadrant? Ako nema, greška je nastala pre nego što si
                  ubacio tacnu vrednost standardnog ugla.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto sin(90\u00B0 \u2212 \u03B1) = cos \u03B1?"
          answer={
            <p>
              U pravouglom trouglu uglovi <InlineMath>{"\\alpha"}</InlineMath>{" "}
              i <InlineMath>{"90^\\circ - \\alpha"}</InlineMath> su
              komplementni. Stranica koja je nalegla na ugao{" "}
              <InlineMath>{"\\alpha"}</InlineMath> postaje naspramna u odnosu
              na ugao <InlineMath>{"90^\\circ - \\alpha"}</InlineMath>. Zato
              se odnos za kosinus jednog ugla pretvara u odnos za sinus
              drugog.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: promeni ugao i odmah vidi kako nastaje svođenje"
        description="Ovaj alat služi upravo onome što se na papiru često preskoci: da svojim očima vidiš gde je ugao, koliki je referentni ugao i zašto se pojavljuje određeni znak ili kofunkcija. Biraš porodicu ugla, menjaš \u03B1, a laboratorija prikazuje rezultat za sin, cos, tg i ctg."
      >
        <ReductionLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš sta ce se desiti sa znakom i funkcijom,
            pa tek onda proveri ekran. Probaj isti referentni ugao u više
            različitih porodica i upoređuj rezultate.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji pokrivaju tipične prijemne oblike"
        description="Sledeći primeri nisu izabrani slučajno. Svaki od njih odgovara jednoj vrsti razmisljanja koja se stalno ponavlja na zadacima: isti ugao u drugom kvadrantu, isti ugao u trećem, prelazak u kofunkciju i skraćivanje velikog ugla pomoću periodičnosti."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izračunaj <InlineMath>{"\\sin 150^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odredi kvadrant.">
                <p>
                  Ugao <InlineMath>{"150^\\circ"}</InlineMath> je u drugom
                  kvadrantu.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi referentni ugao.">
                <p>
                  <InlineMath>
                    {"180^\\circ - 150^\\circ = 30^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Odredi znak i zapisi rezultat.">
                <p>U drugom kvadrantu sinus je pozitivan.</p>
                <MathBlock>
                  {
                    "\\sin 150^\\circ = \\sin(180^\\circ - 30^\\circ) = \\sin 30^\\circ = \\frac{1}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Važna poruka: ista funkcija, ali znak uzimaš iz drugog kvadranta.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izračunaj{" "}
              <InlineMath>{"\\cos 210^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odredi kvadrant.">
                <p>
                  Ugao <InlineMath>{"210^\\circ"}</InlineMath> je u trećem
                  kvadrantu. Možemo ga zapisati kao{" "}
                  <InlineMath>{"180^\\circ + 30^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni pravilo.">
                <p>
                  U trećem kvadrantu kosinus je negativan. Referentni ugao je{" "}
                  <InlineMath>{"30^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zapisi rezultat.">
                <MathBlock>
                  {
                    "\\cos 210^\\circ = \\cos(180^\\circ + 30^\\circ) = -\\cos 30^\\circ = -\\frac{\\sqrt{3}}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Ovde funkcija ostaje kosinus, a kvadrant daje minus.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Izračunaj{" "}
              <InlineMath>{"\\cos 120^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapisi ugao.">
                <p>
                  Zgodnije je zapisati{" "}
                  <InlineMath>{"120^\\circ = 90^\\circ + 30^\\circ"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Prepoznaj kofunkciju.">
                <p>
                  Pošto je ugao oblika{" "}
                  <InlineMath>{"90^\\circ + \\alpha"}</InlineMath>, ocekujemo
                  kofunkciju. Vazi{" "}
                  <InlineMath>
                    {"\\cos(90^\\circ + \\alpha) = -\\sin \\alpha"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj.">
                <MathBlock>
                  {
                    "\\cos 120^\\circ = \\cos(90^\\circ + 30^\\circ) = -\\sin 30^\\circ = -\\frac{1}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Klasican primer gde nije dovoljno samo odrediti znak; moras
              promeniti i funkciju.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Izračunaj{" "}
              <InlineMath>{"\\operatorname{tg} 765^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristi periodičnost.">
                <p>
                  Tangens ima period{" "}
                  <InlineMath>{"180^\\circ"}</InlineMath>, pa odmah
                  koristimo skraćivanje.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Smanji ugao.">
                <p>
                  Oduzimamo{" "}
                  <InlineMath>{"4 \\cdot 180^\\circ = 720^\\circ"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj.">
                <MathBlock>
                  {
                    "\\operatorname{tg}765^\\circ = \\operatorname{tg}(765^\\circ - 720^\\circ) = \\operatorname{tg}45^\\circ = 1"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Najvažniji korak ovde nije kvadrant, nego pravovremena upotreba
              periodičnosti.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Izračunaj{" "}
              <InlineMath>
                {"\\sin\\left(-\\frac{7\\pi}{6}\\right)"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristi neparnost sinusa.">
                <p>
                  <InlineMath>{"\\sin(-x) = -\\sin x"}</InlineMath>, pa
                  ostaje da izračunamo{" "}
                  <InlineMath>
                    {"\\sin\\left(\\frac{7\\pi}{6}\\right)"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi kvadrant.">
                <p>
                  <InlineMath>
                    {"\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}"}
                  </InlineMath>
                  , dakle ugao je u trećem kvadrantu. Sinus je u trećem
                  kvadrantu negativan.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj konačno.">
                <MathBlock>
                  {
                    "\\sin\\left(-\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\pi + \\frac{\\pi}{6}\\right) = -\\left(-\\sin\\frac{\\pi}{6}\\right) = \\frac{1}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Kod negativnih uglova najpre proveri da li te parnost vodi brzem
              računu.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Izračunaj{" "}
              <InlineMath>
                {"\\sin^2 330^\\circ + \\cos^2 330^\\circ"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj identitet.">
                <p>
                  Možeš računati pojedinacno, ali to je sporiji put.
                  Prepoznaj oblik{" "}
                  <InlineMath>{"\\sin^2 x + \\cos^2 x"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni fundamentalni identitet.">
                <MathBlock>
                  {"\\sin^2 330^\\circ + \\cos^2 330^\\circ = 1"}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Na prijemnom usteda vremena često dolazi iz prepoznavanja
              identiteta pre nego iz pukog računanja.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNI OBRASCI ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključni obrasci"
        title="Najvažnije formule za brzo svođenje"
        description="Ovu sekciju koristi kao preglednu mapu. Nije cilj da je učiš bez razmisljanja, nego da jasno vidiš koje porodice uglova zadrzavaju istu funkciju, a koje traže prelazak u kofunkciju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Drugi kvadrant"
            formula={"\\sin(180^\\circ-\\alpha)=\\sin\\alpha,\\quad \\cos(180^\\circ-\\alpha)=-\\cos\\alpha,\\quad \\operatorname{tg}(180^\\circ-\\alpha)=-\\operatorname{tg}\\alpha"}
            note="Funkcija ostaje ista, ali znak dolazi iz drugog kvadranta."
          />
          <FormulaCard
            title="Treći kvadrant"
            formula={"\\sin(180^\\circ+\\alpha)=-\\sin\\alpha,\\quad \\cos(180^\\circ+\\alpha)=-\\cos\\alpha,\\quad \\operatorname{tg}(180^\\circ+\\alpha)=\\operatorname{tg}\\alpha"}
            note="Ovde i sinus i kosinus dobijaju minus, dok tangens i kotangens ostaju pozitivni."
          />
          <FormulaCard
            title="Četvrti kvadrant"
            formula={"\\sin(360^\\circ-\\alpha)=-\\sin\\alpha,\\quad \\cos(360^\\circ-\\alpha)=\\cos\\alpha,\\quad \\operatorname{tg}(360^\\circ-\\alpha)=-\\operatorname{tg}\\alpha"}
            note="Kada je ugao neposredno ispod pozitivne x-ose, kosinus ostaje pozitivan."
          />
          <FormulaCard
            title="Komplementni uglovi"
            formula={"\\sin(90^\\circ-\\alpha)=\\cos\\alpha,\\quad \\cos(90^\\circ-\\alpha)=\\sin\\alpha,\\quad \\operatorname{tg}(90^\\circ-\\alpha)=\\operatorname{ctg}\\alpha"}
            note="Kofunkcije nastaju jer posmatraš isti trougao iz ugla koji je dopunski do 90\u00B0."
          />
          <FormulaCard
            title="Oblik 90\u00B0 + \u03B1"
            formula={"\\sin(90^\\circ+\\alpha)=\\cos\\alpha,\\quad \\cos(90^\\circ+\\alpha)=-\\sin\\alpha,\\quad \\operatorname{tg}(90^\\circ+\\alpha)=-\\operatorname{ctg}\\alpha"}
            note="Ovde se funkcija menja u kofunkciju, a znak uzimaš iz drugog kvadranta."
          />
          <FormulaCard
            title="Obliči 270\u00B0 \u00B1 \u03B1"
            formula={"\\sin(270^\\circ-\\alpha)=-\\cos\\alpha,\\; \\cos(270^\\circ-\\alpha)=-\\sin\\alpha,\\; \\sin(270^\\circ+\\alpha)=-\\cos\\alpha,\\; \\cos(270^\\circ+\\alpha)=\\sin\\alpha"}
            note="Ovi obliči deluju teže, ali se i oni rešavaju istim principom: kvadrant plus kofunkcija."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: kako da prepoznaš da li treba ista funkcija ili kofunkcija?"
          answer={
            <p>
              Pogledaj da li se ugao gradi u odnosu na{" "}
              <InlineMath>{"x"}</InlineMath>-osu ili u odnosu na{" "}
              <InlineMath>{"y"}</InlineMath>-osu. Obliči uz{" "}
              <InlineMath>{"180^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"360^\\circ"}</InlineMath> vezani su za{" "}
              <InlineMath>{"x"}</InlineMath>-osu, pa funkcija uglavnom ostaje
              ista. Obliči uz <InlineMath>{"90^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"270^\\circ"}</InlineMath> vezani su za{" "}
              <InlineMath>{"y"}</InlineMath>-osu, pa se prirodno javlja
              kofunkcija.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ove sitnice najčešće ruse tacan rezultat"
        description="Većina grešaka nije teška matematika nego pogrešan redosled misli. Zato je korisno da unapred znaš gde najčešće dolazi do promašaja."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Referentni ugao je tacan, ali znak nije
            </h3>
            <p>
              Učenik lepo vidi{" "}
              <InlineMath>{"150^\\circ \\to 30^\\circ"}</InlineMath>, ali
              zatim napise{" "}
              <InlineMath>
                {"\\cos 150^\\circ = \\cos 30^\\circ"}
              </InlineMath>
              . Referentni ugao je dobar, ali znak mora doci iz drugog
              kvadranta.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kod 90\u00B0 \u00B1 \u03B1 zaboravljena je kofunkcija
            </h3>
            <p>
              Tipicna greška je{" "}
              <InlineMath>
                {"\\cos(90^\\circ+30^\\circ)=-\\cos30^\\circ"}
              </InlineMath>
              . Tacno je{" "}
              <InlineMath>{"-\\sin30^\\circ"}</InlineMath>, jer se funkcija
              menja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tangens i kotangens se računaju sa pogrešnim periodom
            </h3>
            <p>
              Za <InlineMath>{"\\operatorname{tg}"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{ctg}"}</InlineMath> period je{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>, ne{" "}
              <InlineMath>{"360^\\circ"}</InlineMath>. Ako koristiš duzi
              period, rezultat može ostati tacan, ali račun postaje nepotrebno
              spor.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Uslovi definisanosti se ignorisu
            </h3>
            <p>
              Na primer,{" "}
              <InlineMath>{"\\operatorname{tg}90^\\circ"}</InlineMath> nije
              definisan jer je{" "}
              <InlineMath>{"\\cos 90^\\circ = 0"}</InlineMath>. Slicno,{" "}
              <InlineMath>{"\\operatorname{ctg}0^\\circ"}</InlineMath> nije
              definisan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Identitet se koristi bez uslova
            </h3>
            <p>
              Kod formule{" "}
              <InlineMath>
                {
                  "1+\\operatorname{tg}^2x=\\frac{1}{\\cos^2x}"
                }
              </InlineMath>{" "}
              mora važiti <InlineMath>{"\\cos x \\ne 0"}</InlineMath>. To je
              mala napomena koju prijemni ume da kazni.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Predug put do rešenja</h3>
            <p>
              Učenik pojedinacno računa{" "}
              <InlineMath>{"\\sin 330^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\cos 330^\\circ"}</InlineMath>, pa kvadrira i
              sabira, umesto da odmah prepozna identitet{" "}
              <InlineMath>{"\\sin^2 x + \\cos^2 x = 1"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta ispitivač ovde zapravo proverava"
        description="Kada se u zadatku pojavi trigonometrija, cilj često nije da proveri da li znaš napamet tabelu vrednosti. Mnogo češće se proverava da li umeš da ocistis ugao, zadržiš kontrolu nad znakom i prepoznaš kad je bolje koristiti identitet umesto grubog računanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: direktno računanje vrednosti">
            <p>
              Pojavljuju se izrazi kao{" "}
              <InlineMath>{"\\sin 240^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\cos \\frac{5\\pi}{3}"}</InlineMath>,{" "}
              <InlineMath>{"\\operatorname{tg}(-135^\\circ)"}</InlineMath>.
              Ovde moraš da imaš automatizam za period i kvadrant.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: izraz sa više funkcija">
            <p>
              Na primer{" "}
              <InlineMath>
                {"\\sin^2 150^\\circ + \\cos 210^\\circ"}
              </InlineMath>
              . U ovim zadacima lako nastaje greška ako jedan član svedeš
              dobro, a drugi ne.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: identitet kao precica">
            <p>
              Izraz može izgledati komplikovano, ali se svodi na{" "}
              <InlineMath>{"\\sin^2 x + \\cos^2 x"}</InlineMath>,{" "}
              <InlineMath>
                {
                  "\\operatorname{tg}x \\cdot \\operatorname{ctg}x"
                }
              </InlineMath>{" "}
              ili neku sličnu standardnu vezu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: zadaci sa radijanima">
            <p>
              Čak i ako su sve vrednosti standardne, učenik se zbuni jer ne
              prevede brzo{" "}
              <InlineMath>
                {
                  "\\frac{7\\pi}{6},\\; \\frac{11\\pi}{6},\\; \\frac{3\\pi}{4}"
                }
              </InlineMath>
              . Zato redovno vežbaj i stepene i radijane.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{Prijemni mentalni cek-list:} \\quad \\text{period?} \\rightarrow \\text{kvadrant?} \\rightarrow \\text{kofunkcija ili ista funkcija?} \\rightarrow \\text{standardni ugao.}"
          }
        </MathBlock>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li algoritam zaista radi bez gledanja u teoriju"
        description="Pokušaj da svaku vežbu najpre rešiš bez otvaranja rešenja. Ako zapneš, nemoj samo prepisati odgovor, već isprati korake i reci sebi koja je bila ključna odluka: period, kvadrant, identitet ili kofunkcija."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\cos 150^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Ugao je u drugom kvadrantu, pa je kosinus negativan.
                  Referentni ugao je <InlineMath>{"30^\\circ"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\cos 150^\\circ = -\\cos 30^\\circ = -\\frac{\\sqrt{3}}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\operatorname{tg} 225^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pišemo{" "}
                  <InlineMath>
                    {"225^\\circ = 180^\\circ + 45^\\circ"}
                  </InlineMath>
                  . U trećem kvadrantu tangens je pozitivan.
                </p>
                <MathBlock>
                  {"\\operatorname{tg}225^\\circ = \\operatorname{tg}45^\\circ = 1"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {"\\sin\\left(\\frac{5\\pi}{6}\\right)"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>
                    {
                      "\\frac{5\\pi}{6} = \\pi - \\frac{\\pi}{6}"
                    }
                  </InlineMath>
                  , pa je ugao u drugom kvadrantu, gde je sinus pozitivan.
                </p>
                <MathBlock>
                  {
                    "\\sin\\left(\\frac{5\\pi}{6}\\right)=\\sin\\left(\\pi-\\frac{\\pi}{6}\\right)=\\sin\\frac{\\pi}{6}=\\frac{1}{2}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Svedi izraz{" "}
                <InlineMath>{"\\cos(90^\\circ + \\alpha)"}</InlineMath> na
                funkciju ugla <InlineMath>{"\\alpha"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Oblik je <InlineMath>{"90^\\circ + \\alpha"}</InlineMath>,
                  pa koristiš kofunkciju. U drugom kvadrantu kosinus je
                  negativan.
                </p>
                <MathBlock>
                  {"\\cos(90^\\circ+\\alpha)=-\\sin\\alpha"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\operatorname{ctg} 315^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>
                    {"315^\\circ = 360^\\circ - 45^\\circ"}
                  </InlineMath>
                  , a u četvrtom kvadrantu kotangens je negativan.
                </p>
                <MathBlock>
                  {
                    "\\operatorname{ctg}315^\\circ = -\\operatorname{ctg}45^\\circ = -1"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Pojednostavi{" "}
                <InlineMath>
                  {"\\sin^2 210^\\circ + \\cos^2 210^\\circ"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Prepoznaj fundamentalni identitet. Nije potrebno
                  pojedinacno računanje.
                </p>
                <MathBlock>
                  {"\\sin^2 210^\\circ + \\cos^2 210^\\circ = 1"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\sin(-330^\\circ)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Možeš prvo koristiti neparnost ili periodičnost. Najbrze
                  je: <InlineMath>{"-330^\\circ + 360^\\circ = 30^\\circ"}</InlineMath>
                  .
                </p>
                <MathBlock>
                  {"\\sin(-330^\\circ) = \\sin(30^\\circ) = \\frac{1}{2}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Objasni zašto je{" "}
                <InlineMath>{"\\operatorname{tg}(90^\\circ)"}</InlineMath>{" "}
                nedefinisan.
              </p>
            }
            solution={
              <>
                <p>
                  Tangens je definisan kao količnik{" "}
                  <InlineMath>
                    {
                      "\\operatorname{tg}x = \\frac{\\sin x}{\\cos x}"
                    }
                  </InlineMath>
                  . Za <InlineMath>{"x = 90^\\circ"}</InlineMath> vazi{" "}
                  <InlineMath>{"\\sin 90^\\circ = 1"}</InlineMath> i{" "}
                  <InlineMath>{"\\cos 90^\\circ = 0"}</InlineMath>.
                </p>
                <MathBlock>
                  {"\\operatorname{tg}(90^\\circ) = \\frac{1}{0}"}
                </MathBlock>
                <p>Deljenje nulom nije dozvoljeno, zato tangens nije definisan.</p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <InsightCard title="Sustina nije u tome da zapamtiš mnogo formula, nego da svaku formulu vidiš kao posledicu jedne slike na kružnici">
        <p>
          Kad god se pojavi nov ugao, vrati ga na jediničnu kružnicu. Tamo
          odmah vidiš kvadrant, znak i referentni ugao. Ako se ugao oslanja
          na <InlineMath>{"x"}</InlineMath>-osu, funkcija uglavnom ostaje
          ista; ako se oslanja na <InlineMath>{"y"}</InlineMath>-osu, javlja
          se kofunkcija. Uz taj mentalni model trigonometrija postaje
          pregledna.
        </p>
        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Prva misao">
            <p>
              Da li treba prvo smanjiti ugao periodičnošću ili parnoscu?
            </p>
          </SectionCard>
          <SectionCard title="Druga misao">
            <p>
              U kom kvadrantu je ugao i kakav znak ta funkcija tamo ima?
            </p>
          </SectionCard>
          <SectionCard title="Treća misao">
            <p>
              Da li ostaje ista funkcija ili treba preci na kofunkciju?
            </p>
          </SectionCard>
        </div>
      </InsightCard>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
      >
        <div className={s.grid2}>
          <SectionCard title="1. Znak dolazi iz kvadranta">
            <p>
              Isti referentni ugao ne garantuje isti rezultat. Uvek odredi
              kvadrant pre nego što ubaciš standardnu vrednost.
            </p>
          </SectionCard>
          <SectionCard title="2. Periodicnost štedi vreme">
            <p>
              Velike i negativne uglove najpre skrati. Za sinus i kosinus
              prirodan je period <InlineMath>{"360^\\circ"}</InlineMath>, a
              za tangens i kotangens{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="3. Kofunkcija je signal za uglove uz 90\u00B0 i 270\u00B0">
            <p>
              Tu se funkcija menja: sinus prelazi u kosinus, kosinus u sinus,
              tangens u kotangens i obrnuto.
            </p>
          </SectionCard>
          <SectionCard title="4. Identiteti nisu ukras">
            <p>
              <InlineMath>{"\\sin^2 x + \\cos^2 x = 1"}</InlineMath>,
              relacije za tangens i kotangens i izvedeni identiteti sluze da
              ubrzaju račun i pokažu strukturu izraza.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\boxed{\\text{period/parnost} \\rightarrow \\text{kvadrant} \\rightarrow \\text{referentni ugao} \\rightarrow \\text{znak ili kofunkcija} \\rightarrow \\text{tačna vrednost}}"
          }
        </MathBlock>

        <MicroCheck
          question="Šta je sledeći logičan korak u učenju?"
          answer={
            <p>
              Sledeća velika tema su adicioni teoremi. Ako ovu lekciju znas
              sigurno, adicioni teoremi više neće izgledati kao gomila novih
              formula, već kao nastavak iste price o kružnici, uglovima i
              transformacijama.
            </p>
          }
        />
      </LessonSection>
    </LessonShell>
  );
}
