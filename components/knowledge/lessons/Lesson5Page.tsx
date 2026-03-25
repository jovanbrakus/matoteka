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
import NumberSetDiagram from "./NumberSetDiagram";
import NumberLineLab from "./NumberLineLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#mapa", label: "Mapa skupova" },
  { href: "#apsolutna", label: "Brojevna prava" },
  { href: "#racun", label: "Računanje" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključni zapisi" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson5Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 5"
        title={
          <>
            Skupovi brojeva{" "}
            <span className={cs.tHeroAccent}>
              brojevna prava, apsolutna vrednost i račun
            </span>
          </>
        }
        description="Od brojeva za prebrojavanje do svih realnih brojeva: ova lekcija gradi mapu N, Z, Q, R, uči te da broj vidiš na brojevnoj pravoj i da bez greške računaš sa razlomcima, decimalama i apsolutnom vrednošću."
        heroImageSrc="/api/lessons/5/hero"
        heroImageAlt="Apstraktna matematička tabla sa brojevnom pravom i skupovima brojeva"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da brzo odrediš kom skupu broj pripada i kako da apsolutnu vrednost čitaš kao udaljenost od nule.",
          },
          {
            label: "Najveća zamka",
            description:
              "mešanje racionalnih i iracionalnih brojeva, i površno računanje bez stroge kontrole redosleda operacija.",
          },
          {
            label: "Prijemni fokus",
            description:
              "složeni numerički izrazi sa razlomcima i decimalama, gde jedan pogrešan korak ruši ceo zadatak.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "40 do 55 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "osnovne računske operacije, razlomci i elementarna logička preciznost",
          },
          {
            label: "Glavna veština",
            description:
              "sigurna klasifikacija brojeva i disciplinovano računanje sa razlomcima, decimalama i apsolutnom vrednošću",
          },
          {
            label: "Interaktivno",
            description:
              "canvas laboratorijum brojevne prave sa automatskom klasifikacijom broja",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE OVA LEKCIJA VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zašto je ova lekcija važna"
        title="Bez jasne slike o brojevima nema sigurne algebre"
        description="Skupovi brojeva nisu spisak simbola, nego mapa cele srednjoškolske matematike. Ako ne razlikuješ prirodan, ceo, racionalan i realan broj, kasnije ćeš grešiti u domenima, nejednačinama, jednačinama i radu sa funkcijama."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se ova tema pojavljuje kasnije">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u nejednačinama i intervalima, gde položaj na brojevnoj pravoj odlučuje
                rešenje
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u korenima, logaritmima i funkcijama, gde domen zavisi od tipa broja
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                u svim numeričkim zadacima gde razlomci i decimale moraju biti pod
                punom kontrolom
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                prvi zadaci često traže brzo i tačno računanje složenog izraza
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                apsolutna vrednost se kasnije vraća kroz jednačine i nejednačine
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                kandidati gube poene na trivijalnim greškama: pogrešan znak, loš NZS
                ili mešanje decimalnog i razlomačkog zapisa
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Glavna poruka">
          <p>
            Kada vidiš broj, prvo ga klasifikuj i smesti na brojevnu pravu. Tek onda
            računaj.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. MAPA BROJEVNIH SKUPOVA ═══════════ */}
      <LessonSection
        id="mapa"
        eyebrow="2. Mapa brojevnih skupova"
        title="Kako se skupovi brojeva nadovezuju jedan na drugi"
        description="Matematički skupovi brojeva nisu nepovezane kutije. Svaki sledeći skup proširuje prethodni da bi omogućio nova računanja i rešio nove vrste jednačina."
      >
        <div className={s.grid2}>
          <SectionCard title="Lanac uključenja">
            <MathBlock>
              {"\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}"}
            </MathBlock>
            <p>
              Prirodni brojevi su u skupu celih, celi su u skupu racionalnih, a
              racionalni i iracionalni zajedno čine realne brojeve.
            </p>
          </SectionCard>

          <SectionCard title="Šta podrazumevamo pod N">
            <p>
              U ovoj lekciji koristimo konvenciju{" "}
              <InlineMath>{"\\mathbb{N}=\\{1,2,3,\\dots\\}"}</InlineMath>. Ako
              želimo da uključimo nulu, pisaćemo{" "}
              <InlineMath>{"\\mathbb{N}_0"}</InlineMath>.
            </p>
            <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14, marginTop: 10 }}>
              <strong>Primer:</strong>{" "}
              <InlineMath>{"5 \\in \\mathbb{N}"}</InlineMath>, ali{" "}
              <InlineMath>{"0 \\notin \\mathbb{N}"}</InlineMath> u ovoj konvenciji.
            </div>
          </SectionCard>

          <SectionCard title="Brojevi koji se mogu zapisati kao razlomak">
            <MathBlock>
              {
                "\\mathbb{Q} = \\left\\{\\frac{p}{q}\\; \\middle|\\; p,q\\in\\mathbb{Z},\\ q\\ne 0 \\right\\}"
              }
            </MathBlock>
            <p>
              U racionalne spadaju celi brojevi, obični razlomci, konačni decimalni
              brojevi i beskonačni periodični decimalni zapisi.
            </p>
          </SectionCard>

          <SectionCard title="Realni brojevi koji nisu racionalni">
            <MathBlock>{"\\mathbb{R}\\setminus\\mathbb{Q}"}</MathBlock>
            <p>
              Njihov decimalni zapis je beskonačan i neperiodičan. Tipični primeri su{" "}
              <InlineMath>{"\\sqrt{2}"}</InlineMath>,{" "}
              <InlineMath>{"\\pi"}</InlineMath> i{" "}
              <InlineMath>{"\\sqrt{5}"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "7 \\in \\mathbb{N}, \\qquad -3 \\in \\mathbb{Z}, \\qquad \\frac{5}{8}\\in \\mathbb{Q}, \\qquad \\sqrt{2}\\in \\mathbb{R}\\setminus\\mathbb{Q}"
          }
        </MathBlock>

        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Primer 1:</strong>{" "}
            <InlineMath>{"0.125 = \\frac{1}{8}"}</InlineMath>, pa je racionalan
            broj.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Primer 2:</strong>{" "}
            <InlineMath>{"-4"}</InlineMath> nije prirodan, ali jeste ceo, racionalan
            i realan broj.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Primer 3:</strong>{" "}
            <InlineMath>{"\\sqrt{9}=3"}</InlineMath>, pa nije iracionalan iako
            sadrži znak korena.
          </div>
        </div>

        <InsightCard title="Pedagoški trik">
          <p>
            Kada klasifikuješ broj, traži <em>najmanji</em> skup kome pripada. Ako
            znaš najmanji skup, automatski znaš i sve veće skupove.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li je svaki ceo broj racionalan?"
          answer={
            <p>
              Jeste. Svaki ceo broj <InlineMath>{"n"}</InlineMath> možeš zapisati
              kao <InlineMath>{"\\frac{n}{1}"}</InlineMath>, pa zato važi{" "}
              <InlineMath>{"\\mathbb{Z}\\subset\\mathbb{Q}"}</InlineMath>.
            </p>
          }
        />

        {/* Interactive nested set diagram */}
        <NumberSetDiagram />
      </LessonSection>

      {/* ═══════════ 3. BROJEVNA PRAVA I APSOLUTNA VREDNOST ═══════════ */}
      <LessonSection
        id="apsolutna"
        eyebrow="3. Brojevna prava i apsolutna vrednost"
        title={'Apsolutna vrednost nije \u201Eskidanje minusa\u201C, nego udaljenost od nule'}
        description="Brojevna prava pomaže da broj vidiš prostorno: levo su manji brojevi, desno veći, a nula je prirodna referentna tačka. Odatle dolazi i najvažnije značenje apsolutne vrednosti."
      >
        <div className={s.grid2}>
          <SectionCard title="Brojevna prava">
            <p>
              Svakom realnom broju odgovara tačno jedna tačka na brojevnoj pravoj.
              Suprotni brojevi nalaze se simetrično u odnosu na nulu.
            </p>
            <MathBlock>{"a \\text{ i } -a"}</MathBlock>
            <p>
              Na primer, <InlineMath>{"3"}</InlineMath> i{" "}
              <InlineMath>{"-3"}</InlineMath> su na istoj udaljenosti od nule, ali
              sa različitih strana.
            </p>
          </SectionCard>

          <SectionCard title="Definicija apsolutne vrednosti">
            <MathBlock>
              {
                "|x| = \\left\\{\\begin{array}{ll} x, & x\\ge 0 \\\\ -x, & x<0 \\end{array}\\right."
              }
            </MathBlock>
            <p>
              Apsolutna vrednost je rastojanje broja{" "}
              <InlineMath>{"x"}</InlineMath> od nule. Zato nikada ne može biti
              negativna.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "|-7|=7, \\qquad \\left|\\frac{3}{4}\\right|=\\frac{3}{4}, \\qquad \\left|-\\sqrt{2}\\right|=\\sqrt{2}"
          }
        </MathBlock>

        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Poređenje:</strong>{" "}
            <InlineMath>{"-5 < -2"}</InlineMath>, jer je{" "}
            <InlineMath>{"-5"}</InlineMath> više ulevo na brojevnoj pravoj.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Suprotan broj:</strong> suprotan od{" "}
            <InlineMath>{"-\\frac{3}{2}"}</InlineMath> je{" "}
            <InlineMath>{"\\frac{3}{2}"}</InlineMath>.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            <strong>Udaljenost:</strong> rastojanje između{" "}
            <InlineMath>{"-2"}</InlineMath> i <InlineMath>{"3"}</InlineMath> je{" "}
            <InlineMath>{"|3-(-2)|=5"}</InlineMath>.
          </div>
        </div>

        <MicroCheck
          question="Mikro-provera: može li apsolutna vrednost broja biti negativna?"
          answer={
            <p>
              Ne može. Pošto predstavlja udaljenost od nule, važi{" "}
              <InlineMath>{"|x|\\ge 0"}</InlineMath> za svaki realan broj{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. RAČUNANJE U SKUPU REALNIH BROJEVA ═══════════ */}
      <LessonSection
        id="racun"
        eyebrow="4. Računanje u skupu realnih brojeva"
        title="Računska disciplina je važnija od brzine"
        description="Većina grešaka na prijemnom ne nastaje zato što je ideja teška, nego zato što kandidat preskoči jedan mali korak: pogrešno skrati razlomak, zaboravi zagradu ili prebrzo pređe sa decimale na procenu."
      >
        <div className={s.grid2}>
          <SectionCard title="Redosled operacija">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                prvo zagrade
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                zatim stepeni i koreni
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                onda množenje i deljenje
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                na kraju sabiranje i oduzimanje
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Razlomci traže zajednički imenilac">
            <MathBlock>
              {"\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}"}
            </MathBlock>
            <p>
              Nemoj sabirati brojnike i imenioce &bdquo;po osećaju&ldquo;. Najpre
              obezbedi zajednički imenilac.
            </p>
          </SectionCard>

          <SectionCard title="Decimale često vredi prebaciti u razlomke">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"0.5 = \\frac{1}{2}"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"0.25 = \\frac{1}{4}"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"0.125 = \\frac{1}{8}"}</InlineMath>
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"0.\\overline{3} = \\frac{1}{3}"}</InlineMath>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Osnovna svojstva koja štede vreme">
            <MathBlock>
              {
                "a+b=b+a,\\qquad (a+b)+c=a+(b+c),\\qquad a(b+c)=ab+ac"
              }
            </MathBlock>
            <p>
              Komutativnost, asocijativnost i distributivnost pomažu da izraz
              preurediš u oblik koji se lakše računa.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\frac{3}{4} - \\left(-\\frac{5}{6}\\right) - 0.25 = \\frac{3}{4}+\\frac{5}{6}-\\frac{1}{4} = \\frac{1}{2}+\\frac{5}{6} = \\frac{4}{3}"
          }
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Primeti da je <InlineMath>{"0.25"}</InlineMath> najpre pretvoreno u{" "}
          <InlineMath>{"\\frac{1}{4}"}</InlineMath>, pa je račun postao uredniji i
          sigurniji.
        </p>

        <MicroCheck
          question="Mikro-provera: da li je 0.125 racionalan broj i zašto?"
          answer={
            <p>
              Jeste, jer važi{" "}
              <InlineMath>{"0.125=\\frac{125}{1000}=\\frac{1}{8}"}</InlineMath>.
              Čim broj može da se napiše kao razlomak dva cela broja, on je
              racionalan.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNI LABORATORIJUM ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="5. Interaktivni laboratorijum"
        title="Smesti broj na pravu i odmah proveri kom skupu pripada"
        description="Izaberi reprezentativan broj ili pomeraj klizač. Canvas prikazuje položaj broja, njegov suprotan broj i dužinu segmenta koja predstavlja apsolutnu vrednost, a kartice ispod daju automatsku klasifikaciju."
      >
        <NumberLineLab />
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="6. Vođeni primeri"
        title="Tri tipična načina razmišljanja koja moraš usvojiti"
        description="Svaki primer je složen tako da vodi od ideje do rešenja, a ne samo do konačnog odgovora."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Klasifikacija brojeva</h3>
            <p>
              Odredi najmanji skup za brojeve{" "}
              <InlineMath>{"-2,\\ \\frac{3}{5},\\ \\sqrt{3},\\ 8"}</InlineMath>.
            </p>
            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"-2"}</InlineMath> je ceo broj, pa je najmanji skup{" "}
                <InlineMath>{"\\mathbb{Z}"}</InlineMath>.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"\\frac{3}{5}"}</InlineMath> je razlomak celih
                brojeva, pa je najmanji skup{" "}
                <InlineMath>{"\\mathbb{Q}"}</InlineMath>.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"\\sqrt{3}"}</InlineMath> nije racionalan, pa pripada
                skupu{" "}
                <InlineMath>{"\\mathbb{R}\\setminus\\mathbb{Q}"}</InlineMath>.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                <InlineMath>{"8"}</InlineMath> je prirodan broj, pa je najmanji
                skup <InlineMath>{"\\mathbb{N}"}</InlineMath>.
              </div>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Apsolutna vrednost kao udaljenost</h3>
            <p>
              Izračunaj{" "}
              <InlineMath>
                {
                  "\\left| -\\frac{5}{4} \\right| + \\left| 2-\\frac{11}{4} \\right|"
                }
              </InlineMath>
              .
            </p>
            <MathBlock>
              {"\\left| -\\frac{5}{4} \\right| = \\frac{5}{4}"}
            </MathBlock>
            <MathBlock>
              {
                "2-\\frac{11}{4}=\\frac{8}{4}-\\frac{11}{4}=-\\frac{3}{4} \\qquad \\Longrightarrow \\qquad \\left| 2-\\frac{11}{4} \\right| = \\frac{3}{4}"
              }
            </MathBlock>
            <MathBlock>{"\\frac{5}{4}+\\frac{3}{4}=2"}</MathBlock>
            <p style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
              Suština je da apsolutna vrednost meri dužinu, pa negativan broj unutar
              zagrada daje pozitivan rezultat.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>FON-stil numeričkog izraza</h3>
            <p>Izračunaj</p>
            <MathBlock>
              {
                "E = \\frac{3}{4} - \\left(-\\frac{5}{6}\\right) - 0.25 + \\left|-\\frac{7}{3}+2\\right|"
              }
            </MathBlock>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                Pretvori <InlineMath>{"0.25"}</InlineMath> u{" "}
                <InlineMath>{"\\frac{1}{4}"}</InlineMath>.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                Unutar apsolutne vrednosti dobija se{" "}
                <InlineMath>{"-\\frac{1}{3}"}</InlineMath>, pa je apsolutna
                vrednost <InlineMath>{"\\frac{1}{3}"}</InlineMath>.
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                Zatim računaj razlomke uredno preko zajedničkog imenioca.
              </div>
            </div>
            <MathBlock>
              {
                "E = \\frac{3}{4}+\\frac{5}{6}-\\frac{1}{4}+\\frac{1}{3} = \\frac{1}{2}+\\frac{5}{6}+\\frac{1}{3} = \\frac{3}{6}+\\frac{5}{6}+\\frac{2}{6} = \\frac{10}{6}=\\frac{5}{3}"
              }
            </MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. KLJUČNI ZAPISI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="7. Ključni zapisi"
        title="Simboli i formule koje treba da razumeš na prvi pogled"
        description="Ove kartice nisu za slepo pamćenje, nego da povežeš zapis sa značenjem i tipičnom upotrebom."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Mapa skupova"
            formula={"\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}"}
            note="Svaki sledeći skup proširuje prethodni."
          />
          <FormulaCard
            title="Definicija preko razlomka"
            formula={"x\\in\\mathbb{Q} \\Longleftrightarrow x=\\frac{p}{q},\\ p,q\\in\\mathbb{Z},\\ q\\ne 0"}
            note="Ovo je glavni test za racionalnost."
          />
          <FormulaCard
            title="Komadna definicija"
            formula={"|x| = \\left\\{\\begin{array}{ll} x, & x\\ge 0 \\\\ -x, & x<0 \\end{array}\\right."}
            note="Negativan broj unutar apsolutne vrednosti menja znak, ali smisao je uvek udaljenost od nule."
          />
          <FormulaCard
            title="Razmak dva broja"
            formula="d(a,b)=|a-b|"
            note="Brojevna prava i apsolutna vrednost prirodno idu zajedno."
          />
          <FormulaCard
            title="Simetrija oko nule"
            formula="a + (-a) = 0"
            note={
              <>
                Brojevi <InlineMath>{"a"}</InlineMath> i{" "}
                <InlineMath>{"-a"}</InlineMath> nalaze se na istoj udaljenosti od
                nule.
              </>
            }
          />
          <FormulaCard
            title="Osnovno oruđe za sređivanje izraza"
            formula="a(b+c)=ab+ac"
            note="Kada je pametno primeniš, složen izraz postaje pregledniji i lakši za računanje."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="8. Česte greške"
        title="Tipične greške koje prave učenici u zadacima sa brojevima"
        description="Ovo su konkretne greške koje redovno obaraju inače lake zadatke."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Svaki koren se proglašava iracionalnim</h3>
            <p>
              To nije tačno. <InlineMath>{"\\sqrt{9}=3"}</InlineMath>, pa je broj
              prirodan, ceo, racionalan i realan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Apsolutna vrednost se tumači mehanički
            </h3>
            <p>
              Nije poenta &bdquo;skini minus&ldquo;, nego &bdquo;nađi udaljenost
              od nule&ldquo;. Zato treba pratiti znak izraza unutar zagrada.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Decimale se ostavljaju kad prave haos
            </h3>
            <p>
              Ako izraz postaje nepregledan, konačne decimale prebaci u razlomke.
              Tako čuvaš tačnost.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Sabiranje razlomaka bez zajedničkog imenioca
            </h3>
            <p>
              Izrazi poput{" "}
              <InlineMath>{"\\frac{1}{2}+\\frac{1}{3}=\\frac{2}{5}"}</InlineMath>{" "}
              su pogrešni. Najpre idi na zajednički imenilac.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. VEZA SA PRIJEMNIM ZADACIMA ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="9. Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno pojavljuje na prijemnom"
        description="U praksi dobijaš numerički izraz koji izgleda neuredno namerno. Cilj nije samo računanje, nego i procena: šta treba prvo srediti, gde treba uvesti zajednički imenilac i kada decimalu vredi pretvoriti u razlomak."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipične forme zadataka">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                složeni izrazi sa razlomcima i decimalama
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                upoređivanje brojeva preko brojevne prave i apsolutne vrednosti
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                prepoznavanje racionalnih i iracionalnih brojeva
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                precizno rukovanje zagradama i znacima
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Kontrolna lista za rad">
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                1. prepiši izraz bez greške i proveri znakove
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                2. razdvoji apsolutne vrednosti i zagrade
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                3. odluči da li decimale pretvaraš u razlomke
              </div>
              <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
                4. tek onda računaj preko zajedničkog imenioca
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Brzina dolazi tek posle urednosti. Ako je zapis haotičan, gotovo sigurno
            sledi greška.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="10. Vežbe"
        title="Kratka provera razumevanja"
        description="Reši samostalno, pa tek onda otvori rešenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Najmanji skup"
            problem={
              <p>
                Odredi najmanji skup kome pripada svaki od brojeva:{" "}
                <InlineMath>{"-7,\\ 0.4,\\ \\sqrt{7},\\ 12"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"-7 \\in \\mathbb{Z}"}</InlineMath>,{" "}
                <InlineMath>
                  {"0.4=\\frac{2}{5}\\in\\mathbb{Q}"}
                </InlineMath>
                ,{" "}
                <InlineMath>
                  {"\\sqrt{7}\\in\\mathbb{R}\\setminus\\mathbb{Q}"}
                </InlineMath>
                , a <InlineMath>{"12\\in\\mathbb{N}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Apsolutna vrednost"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {
                    "\\left| -\\frac{9}{4} \\right| - \\left| 1-\\frac{7}{4} \\right|"
                  }
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\left| -\\frac{9}{4} \\right| = \\frac{9}{4}, \\qquad 1-\\frac{7}{4}=-\\frac{3}{4}, \\qquad \\left|1-\\frac{7}{4}\\right|=\\frac{3}{4}"
                  }
                </MathBlock>
                <MathBlock>
                  {"\\frac{9}{4}-\\frac{3}{4}=\\frac{6}{4}=\\frac{3}{2}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Decimalni zapis"
            problem={
              <p>
                Objasni zašto je <InlineMath>{"2.75"}</InlineMath> racionalan
                broj.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"2.75 = \\frac{275}{100} = \\frac{11}{4}"}
                </MathBlock>
                <p>
                  Pošto je broj zapisan kao razlomak dva cela broja, on je
                  racionalan.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Složeni izraz"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>
                  {"\\frac{1}{2} - 0.75 + \\frac{5}{6}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{1}{2} - \\frac{3}{4} + \\frac{5}{6} = \\frac{6}{12}-\\frac{9}{12}+\\frac{10}{12} = \\frac{7}{12}"
                  }
                </MathBlock>
                <p>
                  Ključni korak je da <InlineMath>{"0.75"}</InlineMath> prepoznaš
                  kao <InlineMath>{"\\frac{3}{4}"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <InsightCard title="Glavni uvid lekcije">
        <p>
          Broj nije samo rezultat računanja. On ima mesto na brojevnoj pravoj,
          pripada određenim skupovima i nosi informaciju o tome kako treba da ga
          obrađuješ u daljem računu.
        </p>
        <MathBlock>
          {
            "\\text{klasifikuj broj} \\;\\Longrightarrow\\; \\text{smesti ga na pravu} \\;\\Longrightarrow\\; \\text{tek onda računaj}"
          }
        </MathBlock>
      </InsightCard>

      {/* ═══════════ 11. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="11. Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako ove tvrdnje možeš samostalno da objasniš, lekcija je dobro savladana."
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Važi lanac{" "}
            <InlineMath>
              {
                "\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}"
              }
            </InlineMath>
            .
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Racionalan broj može se zapisati kao razlomak dva cela broja sa
            nenultim imeniteljem.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Iracionalni brojevi su realni brojevi koji nisu racionalni.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Apsolutna vrednost <InlineMath>{"|x|"}</InlineMath> predstavlja
            udaljenost broja <InlineMath>{"x"}</InlineMath> od nule.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Suprotni brojevi su simetrični u odnosu na nulu na brojevnoj pravoj.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Kod složenih izraza presudni su znakovi, zagrade, zajednički imenilac i
            uredan redosled operacija.
          </div>
          <div className={s.summaryCard} style={{ padding: "12px 14px", borderRadius: 14 }}>
            Na prijemnom se poeni gube na sitnim računskim greškama, pa je pregledan
            zapis obavezna radna navika.
          </div>
        </div>

        <p className={cs.footerNote} style={{ marginTop: 18 }}>
          Sledeći prirodan korak je deljivost celih brojeva, gde se preciznost iz
          ove lekcije prenosi na NZD, NZS i kongruencije.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
