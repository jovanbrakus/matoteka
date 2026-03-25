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
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#kvadranti", label: "Kvadranti" },
  { href: "#identiteti", label: "Identiteti" },
  { href: "#algoritam", label: "Algoritam" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Primeri" },
  { href: "#obrasci", label: "Obrasci" },
  { href: "#greske", label: "Greske" },
  { href: "#prijemni", label: "Prijemni" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson34Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 34"
        title={
          <>
            Osnovni trigonometrijski identiteti{" "}
            <span className={cs.tHeroAccent}>
              i svodjenje na prvi kvadrant
            </span>
          </>
        }
        description="Ova lekcija je tacka u kojoj trigonometrija postaje alat, a ne zbir nepovezanih formula. Cilj nije da mehanicki pamtis napamet sve oblike, nego da svaku vrednost brzo svedes na ugao iz prvog kvadranta i da pri tom tacno odredi znak i funkciju koja ostaje."
        heroImageSrc="/api/lessons/34/hero"
        heroImageAlt="Jedinicna kruznica sa kvadrantima, referentnim uglovima i formulama za svodjenje"
        cards={[
          {
            label: "Sta ces nauciti",
            description:
              "Kako da svaki ugao rastavis na period, kvadrant i referentni ugao, pa zatim dobijes tacnu vrednost funkcije bez lutanja.",
          },
          {
            label: "Najveca zamka",
            description:
              "Ucenici cesto vide dobar mali ugao, ali pogrese znak ili zaborave da se kod 90\u00B0 \u00B1 \u03B1 menja funkcija u kofunkciju.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci cesto traze brz proracun vrednosti poput sin 150\u00B0, cos(7\u03C0/6) ili tg 765\u00B0, bez kalkulatora.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "65 do 90 minuta ako zaista prodjes primere i ne preskocis interaktivni deo.",
          },
          {
            label: "Predznanje",
            description:
              "Radijani, standardni uglovi i trigonometrijska kruznica iz prethodne lekcije.",
          },
          {
            label: "Glavna vestina",
            description:
              "Sigurno svodjenje svakog tipicnog ugla na ugao iz prvog kvadranta uz ispravan znak i izbor funkcije.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja u realnom vremenu crta ugao, kvadrant, referentni ugao i formule za svodjenje.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Bez ove tehnike trigonometrija je spora, a na prijemnom vreme nestaje"
        description="Na prijemnom se retko trazi samo da znas definiciju. Obicno treba brzo da prepoznas strukturu izraza, svedes ugao na poznat oblik i odmah izracunas vrednost. Ako nemas dobar sistem za svodjenje na prvi kvadrant, lako ostanes zarobljen u pamcenju napamet."
      >
        <div className={s.grid3}>
          <SectionCard title="Za naredne lekcije">
            <p>
              Adicioni teoremi, jednacine i transformacije ugla oslanjaju se na
              to da vec umes da sigurno baratas znakom i referentnim uglom.
            </p>
          </SectionCard>
          <SectionCard title="Za prijemni zadatak">
            <p>
              Vrlo cesto je pola zadatka reseno onog trenutka kada iz{" "}
              <InlineMath>{"\\sin 210^\\circ"}</InlineMath> vidis{" "}
              <InlineMath>{"-\\sin 30^\\circ"}</InlineMath>, ili iz{" "}
              <InlineMath>
                {"\\cos \\left(\\frac{11\\pi}{6}\\right)"}
              </InlineMath>{" "}
              vidis{" "}
              <InlineMath>
                {"\\cos \\left(\\frac{\\pi}{6}\\right)"}
              </InlineMath>
              .
            </p>
          </SectionCard>
          <SectionCard title="Za samopouzdanje">
            <p>
              Kada znas jasan algoritam, vise ne proveravas sve nasumice. Svaki
              ugao dobijas kroz isti tok misli, pa gresaka ima manje.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\text{veliki ili negativan ugao} \\;\\longrightarrow\\; \\text{period} \\;\\longrightarrow\\; \\text{kvadrant} \\;\\longrightarrow\\; \\text{referentni ugao} \\;\\longrightarrow\\; \\text{znak i funkcija}"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: sta je zapravo cilj svodjenja na prvi kvadrant?"
          answer={
            <p>
              Cilj nije samo da dobijes manji ugao. Cilj je da problem prevedes
              na jedan od standardnih uglova iz prvog kvadranta, gde vec znas
              tacne vrednosti funkcija. Tada se tezak ugao svodi na kombinaciju{" "}
              <em>poznate vrednosti</em> i <em>ispravnog znaka</em>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KVADRANTI ═══════════ */}
      <LessonSection
        id="kvadranti"
        eyebrow="Znak po kvadrantima"
        title="Prvo pravilo: isti mali ugao moze da nosi cetiri razlicita znaka"
        description="Na trigonometrijskoj kruznici koordinata tacke odredjuje znak funkcija. Zato se pre racunanja obavezno pitas u kom kvadrantu lezi ugao. Referentni ugao moze biti isti, ali rezultat nije isti ako je ugao u drugom, trecem ili cetvrtom kvadrantu."
      >
        <div className={s.grid2}>
          <SectionCard title="I kvadrant">
            <MathBlock>
              {
                "\\sin \\alpha > 0,\\; \\cos \\alpha > 0,\\; \\operatorname{tg}\\alpha > 0,\\; \\operatorname{ctg}\\alpha > 0"
              }
            </MathBlock>
            <p>
              Ovde su sve funkcije pozitivne. Ako je ugao vec u prvom
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
              tacke pozitivna, a apscisa negativna.
            </p>
          </SectionCard>
          <SectionCard title="III kvadrant">
            <MathBlock>
              {
                "\\sin \\theta < 0,\\; \\cos \\theta < 0,\\; \\operatorname{tg}\\theta > 0,\\; \\operatorname{ctg}\\theta > 0"
              }
            </MathBlock>
            <p>
              U trecem kvadrantu i sinus i kosinus su negativni, pa njihov
              kolicnik daje pozitivan tangens i pozitivan kotangens.
            </p>
          </SectionCard>
          <SectionCard title="IV kvadrant">
            <MathBlock>
              {
                "\\sin \\theta < 0,\\; \\cos \\theta > 0,\\; \\operatorname{tg}\\theta < 0,\\; \\operatorname{ctg}\\theta < 0"
              }
            </MathBlock>
            <p>
              U cetvrtom kvadrantu pozitivan je samo kosinus. Ovo je cesta
              zamka kada ucenik vidi ugao{" "}
              <InlineMath>{"330^\\circ"}</InlineMath> i upise pogresan plus
              kod tangensa.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da ovo brzo pamtis">
            <p>
              Mozes da koristis kratko pravilo: u prvom kvadrantu sve je
              pozitivno; u drugom samo sinus; u trecem tangens i kotangens; u
              cetvrtom samo kosinus.
            </p>
          </SectionCard>
          <SectionCard title="Geometrijsko znacenje">
            <p>
              <InlineMath>{"\\sin \\theta"}</InlineMath> je{" "}
              <InlineMath>{"y"}</InlineMath>-koordinata,{" "}
              <InlineMath>{"\\cos \\theta"}</InlineMath> je{" "}
              <InlineMath>{"x"}</InlineMath>-koordinata, a{" "}
              <InlineMath>
                {"\\operatorname{tg}\\theta = \\sin\\theta / \\cos\\theta"}
              </InlineMath>
              . Zato znakovi nisu proizvoljni nego dolaze direktno sa
              kruznice.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto su tangens i kotangens pozitivni u trecem kvadrantu?"
          answer={
            <p>
              Zato sto su i sinus i kosinus negativni. Kada negativan broj
              podelis negativnim brojem, dobijes pozitivan rezultat, pa su i{" "}
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
        title="Formula nije cilj sama po sebi: svaka od njih cuva jednu ideju"
        description="Kada znas odakle identitet dolazi, manje ga zaboravljas i lakse ga koristis u zadacima. Ispod su identiteti koje treba da znas sigurno, zajedno sa kratkim objasnjenjem zasto postoje i kada se koriste."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Fundamentalni identitet"
            formula={"\\sin^2 x + \\cos^2 x = 1"}
            note={
              <>
                Ovaj identitet dolazi iz jednacine jedinicne kruznice{" "}
                <InlineMath>{"x^2 + y^2 = 1"}</InlineMath>, gde su{" "}
                <InlineMath>{"x = \\cos t"}</InlineMath> i{" "}
                <InlineMath>{"y = \\sin t"}</InlineMath>. To je najvaznija
                osnova za mnoge kasnije transformacije.
              </>
            }
          />
          <FormulaCard
            title="Odnos tangensa i kotangensa"
            formula={"\\operatorname{tg} x = \\frac{\\sin x}{\\cos x}, \\qquad \\operatorname{ctg} x = \\frac{\\cos x}{\\sin x}"}
            note="Ove relacije govore da tangens i kotangens nisu nove izolovane funkcije, vec odnosi izmedju sinusa i kosinusa."
          />
          <FormulaCard
            title="Identitet za tangens"
            formula={"1 + \\operatorname{tg}^2 x = \\frac{1}{\\cos^2 x}, \\qquad \\cos x \\ne 0"}
            note={
              <>
                Dobija se deljenjem fundamentalnog identiteta sa{" "}
                <InlineMath>{"\\cos^2 x"}</InlineMath>. Koristi se kada zelis
                da izraz sa tangensom prebacis na sinus i kosinus ili obrnuto.
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
            note="Parnost je vazna kod negativnih uglova. Sinus, tangens i kotangens su neparne funkcije, a kosinus je parna funkcija."
          />
          <FormulaCard
            title="Periodicnost"
            formula={"\\sin(x+360^\\circ k)=\\sin x,\\; \\cos(x+360^\\circ k)=\\cos x,\\; \\operatorname{tg}(x+180^\\circ k)=\\operatorname{tg}x"}
            note="Ako je ugao prevelik, prvo ga vrati u jedan puni krug ili jedan polukrug za tangens i kotangens. Ovo cesto skracuje zadatak na jednu liniju."
          />
        </div>

        <MathBlock>
          {
            "\\text{Najkraci racun na prijemnom cesto glasi: } \\operatorname{tg}765^\\circ = \\operatorname{tg}(765^\\circ - 4 \\cdot 180^\\circ) = \\operatorname{tg}45^\\circ = 1"
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: kako iz sin\u00B2x + cos\u00B2x = 1 dobijes identitet za tangens?"
          answer={
            <>
              <p>
                Podelis celu jednacinu sa{" "}
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
        eyebrow="Algoritam svodjenja"
        title="Jedan jasan postupak je bolji od deset napamet naucenih formula"
        description="Ako uvek ides istim redom, racun postaje stabilan. Sledeci algoritam je napravljen upravo za ucenika koji radi zadatke pod pritiskom vremena i mora da izbegne sitne minus-greske."
      >
        <div className={s.grid2}>
          <SectionCard title="Algoritam u 5 koraka">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prvo smanji ugao pomocu periodicnosti ili parnosti"
              >
                <p>
                  Ako je ugao negativan ili veci od{" "}
                  <InlineMath>{"360^\\circ"}</InlineMath>, nemoj odmah traziti
                  kvadrant. Prvo ga svedi na ekvivalentan ugao koji lakse
                  citas. Kod tangensa i kotangensa cesto je zgodnije koristiti
                  period <InlineMath>{"180^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Odredi kvadrant ili osu">
                <p>
                  Kada znas gde ugao lezi, odmah znas i znak funkcije. Ako je
                  ugao na osi, obrati paznju na definisanost tangensa i
                  kotangensa.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Nadji referentni ugao{" "}
                    <InlineMath>{"\\alpha"}</InlineMath> iz prvog kvadranta
                  </>
                }
              >
                <p>
                  Referentni ugao je najmanji pozitivan ugao izmedju kraka
                  ugla i <InlineMath>{"x"}</InlineMath>-ose. U praksi ga
                  dobijas oblicima kao sto su{" "}
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
                  <InlineMath>{"270^\\circ"}</InlineMath> prelazis sa sinusa
                  na kosinus ili sa tangensa na kotangens.
                </p>
              </WalkStep>
              <WalkStep
                number={5}
                title="Na kraju koristi tacnu vrednost standardnog ugla"
              >
                <p>
                  Tek sada upisujes{" "}
                  <InlineMath>{"\\sin 30^\\circ = \\tfrac{1}{2}"}</InlineMath>,{" "}
                  <InlineMath>
                    {"\\cos 60^\\circ = \\tfrac{1}{2}"}
                  </InlineMath>
                  ,{" "}
                  <InlineMath>{"\\operatorname{tg}45^\\circ = 1"}</InlineMath>{" "}
                  i slicno. Time razdvajas geometrijsko rezonovanje od
                  aritmetike.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Kljucna pravila svodjenja">
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
                  Kada meris ugao od <InlineMath>{"y"}</InlineMath>-ose,
                  prirodno je da se sinus i kosinus zamene uloge.
                </p>
              </div>
              <div>
                <strong style={{ color: "var(--lesson-primary-soft)", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Prakticna recenica
                </strong>
                <p>
                  Ako vidis{" "}
                  <InlineMath>{"90^\\circ \\pm \\alpha"}</InlineMath> ili{" "}
                  <InlineMath>{"270^\\circ \\pm \\alpha"}</InlineMath>,
                  najpre pomisli: <em>verovatno ide kofunkcija</em>. Ako
                  vidis{" "}
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
                  taj kvadrant? Ako nema, greska je nastala pre nego sto si
                  ubacio tacnu vrednost standardnog ugla.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto sin(90\u00B0 \u2212 \u03B1) = cos \u03B1?"
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
        title="Canvas laboratorija: promeni ugao i odmah vidi kako nastaje svodjenje"
        description="Ovaj alat sluzi upravo onome sto se na papiru cesto preskoci: da svojim ocima vidis gde je ugao, koliki je referentni ugao i zasto se pojavljuje odredjeni znak ili kofunkcija. Biras porodicu ugla, menjas \u03B1, a laboratorija prikazuje rezultat za sin, cos, tg i ctg."
      >
        <ReductionLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis sta ce se desiti sa znakom i funkcijom,
            pa tek onda proveri ekran. Probaj isti referentni ugao u vise
            razlicitih porodica i uporedjuj rezultate.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Primeri koji pokrivaju tipicne prijemne oblike"
        description="Sledeci primeri nisu izabrani slucajno. Svaki od njih odgovara jednoj vrsti razmisljanja koja se stalno ponavlja na zadacima: isti ugao u drugom kvadrantu, isti ugao u trecem, prelazak u kofunkciju i skracivanje velikog ugla pomocu periodicnosti."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izracunaj <InlineMath>{"\\sin 150^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odredi kvadrant.">
                <p>
                  Ugao <InlineMath>{"150^\\circ"}</InlineMath> je u drugom
                  kvadrantu.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nadji referentni ugao.">
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
              Vazna poruka: ista funkcija, ali znak uzimas iz drugog kvadranta.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izracunaj{" "}
              <InlineMath>{"\\cos 210^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odredi kvadrant.">
                <p>
                  Ugao <InlineMath>{"210^\\circ"}</InlineMath> je u trecem
                  kvadrantu. Mozemo ga zapisati kao{" "}
                  <InlineMath>{"180^\\circ + 30^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni pravilo.">
                <p>
                  U trecem kvadrantu kosinus je negativan. Referentni ugao je{" "}
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
              Primer 3: Izracunaj{" "}
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
                  Posto je ugao oblika{" "}
                  <InlineMath>{"90^\\circ + \\alpha"}</InlineMath>, ocekujemo
                  kofunkciju. Vazi{" "}
                  <InlineMath>
                    {"\\cos(90^\\circ + \\alpha) = -\\sin \\alpha"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izracunaj.">
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
              Primer 4: Izracunaj{" "}
              <InlineMath>{"\\operatorname{tg} 765^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristi periodicnost.">
                <p>
                  Tangens ima period{" "}
                  <InlineMath>{"180^\\circ"}</InlineMath>, pa odmah
                  koristimo skracivanje.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Smanji ugao.">
                <p>
                  Oduzimamo{" "}
                  <InlineMath>{"4 \\cdot 180^\\circ = 720^\\circ"}</InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izracunaj.">
                <MathBlock>
                  {
                    "\\operatorname{tg}765^\\circ = \\operatorname{tg}(765^\\circ - 720^\\circ) = \\operatorname{tg}45^\\circ = 1"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Najvazniji korak ovde nije kvadrant, nego pravovremena upotreba
              periodicnosti.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Izracunaj{" "}
              <InlineMath>
                {"\\sin\\left(-\\frac{7\\pi}{6}\\right)"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristi neparnost sinusa.">
                <p>
                  <InlineMath>{"\\sin(-x) = -\\sin x"}</InlineMath>, pa
                  ostaje da izracunamo{" "}
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
                  , dakle ugao je u trecem kvadrantu. Sinus je u trecem
                  kvadrantu negativan.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izracunaj konacno.">
                <MathBlock>
                  {
                    "\\sin\\left(-\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\pi + \\frac{\\pi}{6}\\right) = -\\left(-\\sin\\frac{\\pi}{6}\\right) = \\frac{1}{2}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 10, color: "var(--lesson-accent)", fontWeight: 800 }}>
              Kod negativnih uglova najpre proveri da li te parnost vodi brzem
              racunu.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Izracunaj{" "}
              <InlineMath>
                {"\\sin^2 330^\\circ + \\cos^2 330^\\circ"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj identitet.">
                <p>
                  Mozes racunati pojedinacno, ali to je sporiji put.
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
              Na prijemnom usteda vremena cesto dolazi iz prepoznavanja
              identiteta pre nego iz pukog racunanja.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNI OBRASCI ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Kljucni obrasci"
        title="Najvaznije formule za brzo svodjenje"
        description="Ovu sekciju koristi kao preglednu mapu. Nije cilj da je ucis bez razmisljanja, nego da jasno vidis koje porodice uglova zadrzavaju istu funkciju, a koje traze prelazak u kofunkciju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Drugi kvadrant"
            formula={"\\sin(180^\\circ-\\alpha)=\\sin\\alpha,\\quad \\cos(180^\\circ-\\alpha)=-\\cos\\alpha,\\quad \\operatorname{tg}(180^\\circ-\\alpha)=-\\operatorname{tg}\\alpha"}
            note="Funkcija ostaje ista, ali znak dolazi iz drugog kvadranta."
          />
          <FormulaCard
            title="Treci kvadrant"
            formula={"\\sin(180^\\circ+\\alpha)=-\\sin\\alpha,\\quad \\cos(180^\\circ+\\alpha)=-\\cos\\alpha,\\quad \\operatorname{tg}(180^\\circ+\\alpha)=\\operatorname{tg}\\alpha"}
            note="Ovde i sinus i kosinus dobijaju minus, dok tangens i kotangens ostaju pozitivni."
          />
          <FormulaCard
            title="Cetvrti kvadrant"
            formula={"\\sin(360^\\circ-\\alpha)=-\\sin\\alpha,\\quad \\cos(360^\\circ-\\alpha)=\\cos\\alpha,\\quad \\operatorname{tg}(360^\\circ-\\alpha)=-\\operatorname{tg}\\alpha"}
            note="Kada je ugao neposredno ispod pozitivne x-ose, kosinus ostaje pozitivan."
          />
          <FormulaCard
            title="Komplementni uglovi"
            formula={"\\sin(90^\\circ-\\alpha)=\\cos\\alpha,\\quad \\cos(90^\\circ-\\alpha)=\\sin\\alpha,\\quad \\operatorname{tg}(90^\\circ-\\alpha)=\\operatorname{ctg}\\alpha"}
            note="Kofunkcije nastaju jer posmatras isti trougao iz ugla koji je dopunski do 90\u00B0."
          />
          <FormulaCard
            title="Oblik 90\u00B0 + \u03B1"
            formula={"\\sin(90^\\circ+\\alpha)=\\cos\\alpha,\\quad \\cos(90^\\circ+\\alpha)=-\\sin\\alpha,\\quad \\operatorname{tg}(90^\\circ+\\alpha)=-\\operatorname{ctg}\\alpha"}
            note="Ovde se funkcija menja u kofunkciju, a znak uzimas iz drugog kvadranta."
          />
          <FormulaCard
            title="Oblici 270\u00B0 \u00B1 \u03B1"
            formula={"\\sin(270^\\circ-\\alpha)=-\\cos\\alpha,\\; \\cos(270^\\circ-\\alpha)=-\\sin\\alpha,\\; \\sin(270^\\circ+\\alpha)=-\\cos\\alpha,\\; \\cos(270^\\circ+\\alpha)=\\sin\\alpha"}
            note="Ovi oblici deluju teze, ali se i oni resavaju istim principom: kvadrant plus kofunkcija."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: kako da prepoznas da li treba ista funkcija ili kofunkcija?"
          answer={
            <p>
              Pogledaj da li se ugao gradi u odnosu na{" "}
              <InlineMath>{"x"}</InlineMath>-osu ili u odnosu na{" "}
              <InlineMath>{"y"}</InlineMath>-osu. Oblici uz{" "}
              <InlineMath>{"180^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"360^\\circ"}</InlineMath> vezani su za{" "}
              <InlineMath>{"x"}</InlineMath>-osu, pa funkcija uglavnom ostaje
              ista. Oblici uz <InlineMath>{"90^\\circ"}</InlineMath> i{" "}
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
        eyebrow="Ceste greske"
        title="Ove sitnice najcesce ruse tacan rezultat"
        description="Vecina gresaka nije teska matematika nego pogresan redosled misli. Zato je korisno da unapred znas gde najcesce dolazi do promasaja."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Referentni ugao je tacan, ali znak nije
            </h3>
            <p>
              Ucenik lepo vidi{" "}
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
              Tipicna greska je{" "}
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
              Tangens i kotangens se racunaju sa pogresnim periodom
            </h3>
            <p>
              Za <InlineMath>{"\\operatorname{tg}"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{ctg}"}</InlineMath> period je{" "}
              <InlineMath>{"180^\\circ"}</InlineMath>, ne{" "}
              <InlineMath>{"360^\\circ"}</InlineMath>. Ako koristis duzi
              period, rezultat moze ostati tacan, ali racun postaje nepotrebno
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
              mora vaziti <InlineMath>{"\\cos x \\ne 0"}</InlineMath>. To je
              mala napomena koju prijemni ume da kazni.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Predug put do resenja</h3>
            <p>
              Ucenik pojedinacno racuna{" "}
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
        title="Sta ispitivac ovde zapravo proverava"
        description="Kada se u zadatku pojavi trigonometrija, cilj cesto nije da proveri da li znas napamet tabelu vrednosti. Mnogo cesce se proverava da li umes da ocistis ugao, zadrzis kontrolu nad znakom i prepoznas kad je bolje koristiti identitet umesto grubog racunanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: direktno racunanje vrednosti">
            <p>
              Pojavljuju se izrazi kao{" "}
              <InlineMath>{"\\sin 240^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"\\cos \\frac{5\\pi}{3}"}</InlineMath>,{" "}
              <InlineMath>{"\\operatorname{tg}(-135^\\circ)"}</InlineMath>.
              Ovde moras da imas automatizam za period i kvadrant.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: izraz sa vise funkcija">
            <p>
              Na primer{" "}
              <InlineMath>
                {"\\sin^2 150^\\circ + \\cos 210^\\circ"}
              </InlineMath>
              . U ovim zadacima lako nastaje greska ako jedan clan svedes
              dobro, a drugi ne.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: identitet kao precica">
            <p>
              Izraz moze izgledati komplikovano, ali se svodi na{" "}
              <InlineMath>{"\\sin^2 x + \\cos^2 x"}</InlineMath>,{" "}
              <InlineMath>
                {
                  "\\operatorname{tg}x \\cdot \\operatorname{ctg}x"
                }
              </InlineMath>{" "}
              ili neku slicnu standardnu vezu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: zadaci sa radijanima">
            <p>
              Cak i ako su sve vrednosti standardne, ucenik se zbuni jer ne
              prevede brzo{" "}
              <InlineMath>
                {
                  "\\frac{7\\pi}{6},\\; \\frac{11\\pi}{6},\\; \\frac{3\\pi}{4}"
                }
              </InlineMath>
              . Zato redovno vezbaj i stepene i radijane.
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
        eyebrow="Vezbe na kraju"
        title="Proveri da li algoritam zaista radi bez gledanja u teoriju"
        description="Pokusaj da svaku vezbu najpre resis bez otvaranja resenja. Ako zapnes, nemoj samo prepisati odgovor, vec isprati korake i reci sebi koja je bila kljucna odluka: period, kvadrant, identitet ili kofunkcija."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Izracunaj <InlineMath>{"\\cos 150^\\circ"}</InlineMath>.
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
            title="Vezba 2"
            problem={
              <p>
                Izracunaj{" "}
                <InlineMath>{"\\operatorname{tg} 225^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pisemo{" "}
                  <InlineMath>
                    {"225^\\circ = 180^\\circ + 45^\\circ"}
                  </InlineMath>
                  . U trecem kvadrantu tangens je pozitivan.
                </p>
                <MathBlock>
                  {"\\operatorname{tg}225^\\circ = \\operatorname{tg}45^\\circ = 1"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vezba 3"
            problem={
              <p>
                Izracunaj{" "}
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
            title="Vezba 4"
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
                  pa koristis kofunkciju. U drugom kvadrantu kosinus je
                  negativan.
                </p>
                <MathBlock>
                  {"\\cos(90^\\circ+\\alpha)=-\\sin\\alpha"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vezba 5"
            problem={
              <p>
                Izracunaj{" "}
                <InlineMath>{"\\operatorname{ctg} 315^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>
                    {"315^\\circ = 360^\\circ - 45^\\circ"}
                  </InlineMath>
                  , a u cetvrtom kvadrantu kotangens je negativan.
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
            title="Vezba 6"
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
                  pojedinacno racunanje.
                </p>
                <MathBlock>
                  {"\\sin^2 210^\\circ + \\cos^2 210^\\circ = 1"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vezba 7"
            problem={
              <p>
                Izracunaj{" "}
                <InlineMath>{"\\sin(-330^\\circ)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Mozes prvo koristiti neparnost ili periodicnost. Najbrze
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
            title="Vezba 8"
            problem={
              <p>
                Objasni zasto je{" "}
                <InlineMath>{"\\operatorname{tg}(90^\\circ)"}</InlineMath>{" "}
                nedefinisan.
              </p>
            }
            solution={
              <>
                <p>
                  Tangens je definisan kao kolicnik{" "}
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
      <InsightCard title="Sustina nije u tome da zapamtis mnogo formula, nego da svaku formulu vidis kao posledicu jedne slike na kruznici">
        <p>
          Kad god se pojavi nov ugao, vrati ga na jedinicnu kruznicu. Tamo
          odmah vidis kvadrant, znak i referentni ugao. Ako se ugao oslanja
          na <InlineMath>{"x"}</InlineMath>-osu, funkcija uglavnom ostaje
          ista; ako se oslanja na <InlineMath>{"y"}</InlineMath>-osu, javlja
          se kofunkcija. Uz taj mentalni model trigonometrija postaje
          pregledna.
        </p>
        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Prva misao">
            <p>
              Da li treba prvo smanjiti ugao periodicnoscu ili parnoscu?
            </p>
          </SectionCard>
          <SectionCard title="Druga misao">
            <p>
              U kom kvadrantu je ugao i kakav znak ta funkcija tamo ima?
            </p>
          </SectionCard>
          <SectionCard title="Treca misao">
            <p>
              Da li ostaje ista funkcija ili treba preci na kofunkciju?
            </p>
          </SectionCard>
        </div>
      </InsightCard>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da poneses iz ove lekcije"
      >
        <div className={s.grid2}>
          <SectionCard title="1. Znak dolazi iz kvadranta">
            <p>
              Isti referentni ugao ne garantuje isti rezultat. Uvek odredi
              kvadrant pre nego sto ubacis standardnu vrednost.
            </p>
          </SectionCard>
          <SectionCard title="2. Periodicnost stedi vreme">
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
              ubrzaju racun i pokazu strukturu izraza.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\boxed{\\text{period/parnost} \\rightarrow \\text{kvadrant} \\rightarrow \\text{referentni ugao} \\rightarrow \\text{znak ili kofunkcija} \\rightarrow \\text{tacna vrednost}}"
          }
        </MathBlock>

        <MicroCheck
          question="Sta je sledeci logican korak u ucenju?"
          answer={
            <p>
              Sledeca velika tema su adicioni teoremi. Ako ovu lekciju znas
              sigurno, adicioni teoremi vise nece izgledati kao gomila novih
              formula, vec kao nastavak iste price o kruznici, uglovima i
              transformacijama.
            </p>
          }
        />
      </LessonSection>
    </LessonShell>
  );
}
