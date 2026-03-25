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
import MappingLab from "./MappingLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zasto je vazna" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#vrste", label: "Injekcija i surjekcija" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#kompozicija", label: "Kompozicija" },
  { href: "#inverzna", label: "Inverzna funkcija" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#zakoni", label: "Kljucni zapisi" },
  { href: "#zamke", label: "Ceste greske" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vezbe" },
];

export default function Lesson4Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 4"
        title={
          <>
            Funkcije{" "}
            <span className={cs.tHeroAccent}>
              injekcija, surjekcija, bijekcija i inverz
            </span>
          </>
        }
        description="Funkcija je jedno od najvaznijih matematickih orudja: svakom dozvoljenom ulazu dodeljuje tacno jedan izlaz. Iz te ideje nastaju kompozicija, inverzna funkcija i veliki deo zadataka na prijemnim ispitima gde moras da proveris domen, kodomen i ponasanje formule."
        heroImageSrc="/api/lessons/4/hero"
        heroImageAlt="Apstraktna matematicka tabla sa preslikavanjima i funkcijama"
        cards={[
          {
            label: "Naucices",
            description:
              "kako da razlikujes domen, kodomen i sliku, i kako da proveris da li je funkcija injektivna, surjektivna ili bijektivna.",
          },
          {
            label: "Najveca zamka",
            description:
              "mesanje kodomena i slike, pa pogresan zakljucak da funkcija jeste ili nije surjektivna.",
          },
          {
            label: "Prijemni fokus",
            description:
              "kompozicija funkcija, nalazenje inverza i izbor domena tako da funkcija postane invertibilna.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "40 do 55 minuta pazljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "skupovi, relacije, osnovna algebra i uredno citanje matematickog zapisa",
          },
          {
            label: "Glavna vestina",
            description:
              "provera da li relacija jeste funkcija, i zatim analiza injektivnosti, surjektivnosti, kompozicije i inverza",
          },
          {
            label: "Interaktivno",
            description:
              "canvas laboratorijum preslikavanja sa automatskom klasifikacijom",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZASTO JE OVA LEKCIJA VAZNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zasto je ova lekcija vazna"
        title="Funkcija je osnovni jezik moderne matematike"
        description="Kad god neka velicina zavisi od druge, iza scene stoji funkcija. Zato se ova lekcija vraca kasnije kroz polinome, eksponencijalne i logaritamske funkcije, trigonometriju, analiticku geometriju i matematicku analizu."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se funkcije pojavljuju kasnije">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                u grafiku i citanju zavisnosti izmedju promenljivih
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                u resavanju jednacina preko zamene i kompozicije funkcija
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                u logaritamskim i inverznim trigonometrijskim funkcijama, gde je
                bijektivnost kljucna
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Zasto je vazna na prijemnom">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                trazi se da prepoznas kada inverz postoji, a kada ne
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                cesto moras da izracunas{" "}
                <InlineMath>{"g(f(x))"}</InlineMath> ili{" "}
                <InlineMath>{"f(g(x))"}</InlineMath> bez greske u redosledu
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                vrlo lako se gube poeni ako se zanemari domen ili ako se{" "}
                <InlineMath>{"f^{-1}"}</InlineMath> pomesa sa{" "}
                <InlineMath>{"\\frac{1}{f}"}</InlineMath>
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Glavna misaona promena">
          <p>
            Funkcija nije samo formula. Ona je pravilo zajedno sa domenom i
            kodomenom. Bez ta tri dela slika nije potpuna.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Osnovna ideja"
        title="Funkcija je relacija sa tacno jednom slikom za svaki ulaz"
        description='Ako posmatras funkciju kao "masinu", onda je domen skup svih dozvoljenih ulaza, kodomen skup mogucih izlaza, a slika funkcije samo oni izlazi koji se zaista dobiju. Ova razlika je presudna.'
      >
        <div className={s.grid2}>
          <SectionCard title="Formalni zapis">
            <MathBlock>{"f:A \\to B"}</MathBlock>
            <p>
              To znaci: funkcija <InlineMath>{"f"}</InlineMath> svakom elementu{" "}
              <InlineMath>{"x \\in A"}</InlineMath> pridruzuje tacno jedan
              element <InlineMath>{"f(x) \\in B"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Domen, kodomen i slika">
            <p>
              Domen je skup ulaza <InlineMath>{"A"}</InlineMath>. Kodomen je
              ciljni skup <InlineMath>{"B"}</InlineMath>. Slika funkcije je
              skup svih stvarno pogodjenih vrednosti:
            </p>
            <MathBlock>{"f(A)=\\{f(x)\\mid x\\in A\\}"}</MathBlock>
          </SectionCard>

          <SectionCard title="Sta mora da vazi da bi nesto bilo funkcija">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                svaki element domena mora da ima sliku
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                nijedan element domena ne sme imati dve razlicite slike
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                vise razlicitih ulaza sme da ide u isti izlaz
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Ne mora svaki izlaz da bude pogodjen">
            <p>
              Funkcija moze biti sasvim korektna i kada neki elementi kodomena
              ostanu neiskorisceni. To samo znaci da funkcija mozda nije
              surjektivna.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {"A=\\{-1,0,1\\}, \\qquad B=\\{0,1,2\\}, \\qquad f(x)=x^2"}
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Ovde je domen <InlineMath>{"A"}</InlineMath>, kodomen{" "}
          <InlineMath>{"B"}</InlineMath>, a slika funkcije je samo{" "}
          <InlineMath>{"\\{0,1\\}"}</InlineMath>, jer vrednost{" "}
          <InlineMath>{"2"}</InlineMath> iz kodomena nije pogodjena.
        </p>

        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          <div
            style={{
              borderRadius: 16,
              padding: "12px 14px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 154, 106, 0.10)",
              color: "var(--lesson-muted-strong)",
            }}
          >
            <strong>Primer 1:</strong>{" "}
            <InlineMath>
              {"f(1)=1,\\; f(0)=0,\\; f(-1)=1"}
            </InlineMath>
            . To je i dalje funkcija, iako dva razlicita ulaza daju istu sliku.
          </div>
          <div
            style={{
              borderRadius: 16,
              padding: "12px 14px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 154, 106, 0.10)",
              color: "var(--lesson-muted-strong)",
            }}
          >
            <strong>Primer 2:</strong> relacija koja bi za{" "}
            <InlineMath>{"x=2"}</InlineMath> davala i{" "}
            <InlineMath>{"3"}</InlineMath> i <InlineMath>{"5"}</InlineMath> nije
            funkcija, jer jedan ulaz dobija dve slike.
          </div>
        </div>

        <MicroCheck
          question="Mikro-provera: da li je dozvoljeno da x_1 != x_2, a da ipak vazi f(x_1)=f(x_2)?"
          answer={
            <p>
              Da. To ne krsi definiciju funkcije. Definicija trazi samo da svaki
              pojedinacni ulaz ima tacno jednu sliku, a ne da razliciti ulazi
              moraju imati razlicite slike.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. INJEKCIJA, SURJEKCIJA I BIJEKCIJA ═══════════ */}
      <LessonSection
        id="vrste"
        eyebrow="3. Injekcija, surjekcija i bijekcija"
        title="Tri kljucne osobine koje moras da citas bez zabune"
        description="Injekcija govori da razliciti ulazi ostaju razlikovani. Surjekcija govori da su svi elementi kodomena pogodjeni. Bijekcija znaci da vaze obe osobine i upravo tada funkcija moze imati inverz."
      >
        <div className={s.grid2}>
          <SectionCard title="Injekcija">
            <MathBlock>
              {"f(x_1)=f(x_2) \\Rightarrow x_1=x_2"}
            </MathBlock>
            <p>
              Nijedna dva razlicita ulaza ne zavrsavaju u istom izlazu. Zamisli
              da svaka strelica pogadja posebnu tacku sa desne strane.
            </p>
          </SectionCard>

          <SectionCard title="Surjekcija">
            <MathBlock>
              {
                "\\forall y \\in B \\; \\exists x \\in A \\text{ takvo da je } f(x)=y"
              }
            </MathBlock>
            <p>
              Svaki element kodomena dobija bar jednu strelicu. Kljucna rec je{" "}
              <em>kodomen</em>, a ne &ldquo;sve moguce realne vrednosti&rdquo;.
            </p>
          </SectionCard>

          <SectionCard title="Bijekcija">
            <MathBlock>
              {
                "f \\text{ je bijekcija } \\Longleftrightarrow f \\text{ je injekcija i surjekcija}"
              }
            </MathBlock>
            <p>
              Tacno jedan izlaz za svaki ulaz i tacno jedan pretslika za svaki
              element kodomena. To je idealna situacija za pravljenje inverza.
            </p>
          </SectionCard>

          <SectionCard title="Kako brzo razlikovati osobine">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                <strong>Injekcija:</strong> niko se ne &ldquo;sudara&rdquo;.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                <strong>Surjekcija:</strong> niko u kodomenu ne ostaje bez
                pretslike.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                <strong>Bijekcija:</strong> nema ni sudara ni praznih mesta.
              </div>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer injektivne, ali ne i surjektivne funkcije">
            <MathBlock>
              {
                "f:\\{1,2,3\\}\\to\\{a,b,c,d\\}, \\qquad f(1)=a,\\; f(2)=b,\\; f(3)=c"
              }
            </MathBlock>
            <p>
              Razliciti ulazi imaju razlicite slike, pa je funkcija injektivna.
              Ali element <InlineMath>{"d"}</InlineMath> nije pogodjen, pa
              funkcija nije surjektivna.
            </p>
          </SectionCard>

          <SectionCard title="Primer zavisnosti od kodomena">
            <MathBlock>
              {"f:\\mathbb{R}\\to[0,\\infty), \\qquad f(x)=x^2"}
            </MathBlock>
            <p>
              Ova funkcija jeste surjektivna na kodomen{" "}
              <InlineMath>{"[0,\\infty)"}</InlineMath>, ali nije injektivna jer
              je <InlineMath>{"f(2)=f(-2)=4"}</InlineMath>. Ista formula sa
              kodomenom <InlineMath>{"\\mathbb{R}"}</InlineMath> vise ne bi bila
              surjektivna.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Zapamti">
          <p>
            Surjekcija se proverava prema zadatom kodomenu. Ako promenis
            kodomen, ista formula moze promeniti svoj status.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: moze li ista formula da bude surjektivna za jedan kodomen, a nesurjektivna za drugi?"
          answer={
            <p>
              Moze. Na primer, <InlineMath>{"x^2"}</InlineMath> je surjektivna
              kao funkcija{" "}
              <InlineMath>{"\\mathbb{R}\\to[0,\\infty)"}</InlineMath>, ali nije
              surjektivna kao funkcija{" "}
              <InlineMath>{"\\mathbb{R}\\to\\mathbb{R}"}</InlineMath>, jer
              nijedan negativan broj nije u slici.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. INTERAKTIVNI LABORATORIJUM ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="4. Interaktivni laboratorijum"
        title="Vizuelno proveri da li je nesto funkcija i kakvog je tipa"
        description="Prebacuj izmedju tipicnih primera ili rucno podesi funkciju. Canvas prikazuje strelice izmedju domena i kodomena, a ispod odmah dobijas klasifikaciju i objasnjenje sta tacno radi, a sta ne radi."
      >
        <MappingLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis klasifikaciju na osnovu strelica, pa tek
            onda procitaj analizu. Ako vidis da za jednu strelicu manje
            potpuno menja tip, to je upravo poenta: male razlike cesto donose
            veliki preokret u svojstvima funkcije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 5. KOMPOZICIJA FUNKCIJA ═══════════ */}
      <LessonSection
        id="kompozicija"
        eyebrow="5. Kompozicija funkcija"
        title="Kompozicija znaci da izlaz prve funkcije ulazi u drugu"
        description="Kompozicija je lancano primenjivanje funkcija. Ako jedna funkcija proizvodi ono sto drugoj treba kao ulaz, mozes ih spojiti u jednu novu funkciju."
      >
        <div className={s.grid2}>
          <SectionCard title="Osnovni zapis">
            <MathBlock>{"(g\\circ f)(x)=g(f(x))"}</MathBlock>
            <p>
              Cita se: najpre primeni <InlineMath>{"f"}</InlineMath>, pa onda na
              dobijeni rezultat primeni <InlineMath>{"g"}</InlineMath>. Zato se
              kompozicija racuna zdesna nalevo.
            </p>
          </SectionCard>

          <SectionCard title="Uslov da kompozicija ima smisla">
            <MathBlock>{"f:A\\to B,\\qquad g:B\\to C"}</MathBlock>
            <p>
              Kodomen prve funkcije mora biti uskladjen sa domenom druge. Inace{" "}
              <InlineMath>{"g(f(x))"}</InlineMath> nema smisla za sve elemente
              domena funkcije <InlineMath>{"f"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MathBlock>{"f(x)=2x+1, \\qquad g(x)=x^2"}</MathBlock>
        <MathBlock>{"(g\\circ f)(x)=g(2x+1)=(2x+1)^2"}</MathBlock>
        <MathBlock>{"(f\\circ g)(x)=f(x^2)=2x^2+1"}</MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Ova dva rezultata nisu ista, pa je vazno da redosled ne menjas
          proizvoljno. U vecini slucajeva vazi{" "}
          <InlineMath>{"g\\circ f \\ne f\\circ g"}</InlineMath>.
        </p>

        <MicroCheck
          question="Mikro-provera: u izrazu (g circ f)(x), koja funkcija radi prva?"
          answer={
            <p>
              Prvo radi <InlineMath>{"f"}</InlineMath>, jer je{" "}
              <InlineMath>{"f(x)"}</InlineMath> unutrasnji deo zapisa. Tek onda
              se na taj rezultat primenjuje <InlineMath>{"g"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 6. INVERZNA FUNKCIJA ═══════════ */}
      <LessonSection
        id="inverzna"
        eyebrow="6. Inverzna funkcija"
        title="Inverz postoji samo kada svaka vrednost moze jedinstveno da se vrati na polazni ulaz"
        description='Inverzna funkcija "ponistava" originalnu funkciju. To je moguce samo ako nijedna informacija nije izgubljena: svaki izlaz mora odgovarati tacno jednom ulazu. Zato je bijektivnost prirodan uslov.'
      >
        <div className={s.grid2}>
          <SectionCard title="Kako se pise inverz">
            <MathBlock>
              {
                "f^{-1}:B\\to A, \\qquad f^{-1}(y)=x \\Longleftrightarrow f(x)=y"
              }
            </MathBlock>
            <p>
              Inverzna funkcija menja uloge domena i kodomena i vraca te sa
              izlaza na jedinstven polazni ulaz.
            </p>
          </SectionCard>

          <SectionCard title="Zasto je potrebna bijekcija">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                ako funkcija nije injektivna, jedan izlaz ima vise pretslika
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                ako funkcija nije surjektivna, neki elementi kodomena uopste
                nemaju pretsliku
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                zato samo bijekcija dopusta inverz koji je opet funkcija
              </div>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Standardni algoritam za nalazenje inverza">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="proveri da li je funkcija bijektivna ili ogranici domen tako da to postane" />
              <WalkStep
                number={2}
                title={
                  <>
                    napisi <InlineMath>{"y=f(x)"}</InlineMath>
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    iz izraza za <InlineMath>{"y"}</InlineMath> izdvoji{" "}
                    <InlineMath>{"x"}</InlineMath>
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    zameni oznake <InlineMath>{"x"}</InlineMath> i{" "}
                    <InlineMath>{"y"}</InlineMath>, pa napisi{" "}
                    <InlineMath>{"f^{-1}(x)"}</InlineMath>
                  </>
                }
              />
            </div>
          </SectionCard>

          <SectionCard title="Vazan kontraprimer">
            <MathBlock>
              {"f:\\mathbb{R}\\to\\mathbb{R}, \\qquad f(x)=x^2"}
            </MathBlock>
            <p>
              Ova funkcija nema inverz na celoj{" "}
              <InlineMath>{"\\mathbb{R}"}</InlineMath>, jer{" "}
              <InlineMath>{"f(2)=f(-2)=4"}</InlineMath>, pa izlaz{" "}
              <InlineMath>{"4"}</InlineMath> ne zna iz kog je ulaza dosao. Ako
              domen ogranicis na <InlineMath>{"[0,\\infty)"}</InlineMath>, tada
              inverz postaje <InlineMath>{"\\sqrt{x}"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "y=3x-5 \\qquad \\Longrightarrow \\qquad x=\\frac{y+5}{3} \\qquad \\Longrightarrow \\qquad f^{-1}(x)=\\frac{x+5}{3}"
          }
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Kod linearnih funkcija ovaj postupak je obicno direktan. Tezi deo je
          da ne zaboravis proveru domena i uslova za invertibilnost.
        </p>

        <MicroCheck
          question="Mikro-provera: da li zapis f^{-1}(x) znaci isto sto i 1/f(x)?"
          answer={
            <p>
              Ne. <InlineMath>{"f^{-1}(x)"}</InlineMath> oznacava inverznu
              funkciju, a <InlineMath>{"\\frac{1}{f(x)}"}</InlineMath>{" "}
              reciprocnu vrednost funkcije. Na primer, ako je{" "}
              <InlineMath>{"f(x)=2x"}</InlineMath>, onda je{" "}
              <InlineMath>{"f^{-1}(x)=\\frac{x}{2}"}</InlineMath>, a{" "}
              <InlineMath>{"\\frac{1}{f(x)}=\\frac{1}{2x}"}</InlineMath>. To
              nije isto.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 7. VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="7. Vodjeni primeri"
        title="Tri tipicna pitanja koja moras umeti da resis samostalno"
        description="Svaka kartica je pisana tako da vodi kroz prirodan redosled razmisljanja, a ne samo kroz formalne formule."
      >
        <div className={s.grid3}>
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Klasifikacija konacne funkcije
            </h3>
            <p>
              Data je funkcija{" "}
              <InlineMath>
                {"f:\\{1,2,3\\}\\to\\{2,4,6,8\\}"}
              </InlineMath>{" "}
              sa{" "}
              <InlineMath>
                {"f(1)=2,\\; f(2)=4,\\; f(3)=6"}
              </InlineMath>
              .
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Svaki ulaz ima tacno jednu sliku, dakle jeste funkcija.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Slike su razlicite, pa je funkcija injektivna.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Element <InlineMath>{"8"}</InlineMath> nije pogodjen, pa
                funkcija nije surjektivna.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Zakljucak: nije bijekcija, pa nema inverz na zadati kodomen.
              </div>
            </div>
          </article>

          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Kompozicija bez greske u redosledu
            </h3>
            <p>
              Neka su <InlineMath>{"f(x)=x-3"}</InlineMath> i{" "}
              <InlineMath>{"g(x)=x^2+1"}</InlineMath>. Nadji{" "}
              <InlineMath>{"(g\\circ f)(x)"}</InlineMath>.
            </p>
            <MathBlock>
              {"(g\\circ f)(x)=g(x-3)=(x-3)^2+1=x^2-6x+10"}
            </MathBlock>
            <p>
              Najcesca greska je da neko napise{" "}
              <InlineMath>{"f(g(x))"}</InlineMath>. Kompozicija mora da se cita
              iznutra napolje.
            </p>
          </article>

          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Inverz kvadratne funkcije posle ogranicenja domena
            </h3>
            <p>
              Posmatraj funkciju{" "}
              <InlineMath>{"f:[0,\\infty)\\to[0,\\infty)"}</InlineMath>,{" "}
              <InlineMath>{"f(x)=x^2"}</InlineMath>.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Na domenu <InlineMath>{"[0,\\infty)"}</InlineMath> funkcija je
                rastuca, pa je injektivna.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Svaki broj iz <InlineMath>{"[0,\\infty)"}</InlineMath> ima
                koren u istom skupu, pa je funkcija surjektivna.
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                Dakle, funkcija je bijekcija i ima inverz.
              </div>
            </div>
            <MathBlock>
              {
                "y=x^2,\\ x\\ge 0 \\qquad \\Longrightarrow \\qquad x=\\sqrt{y} \\qquad \\Longrightarrow \\qquad f^{-1}(x)=\\sqrt{x}"
              }
            </MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. KLJUCNI ZAPISI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="8. Kljucni zapisi"
        title="Formule i recenice koje treba da prepoznajes na prvi pogled"
        description="Ove kartice nisu tu za bubanje napamet, nego da brze povezes simboliku sa znacenjem."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Funkcija"
            formula={"f:A\\to B"}
            note={
              <>
                Cita se: funkcija <InlineMath>{"f"}</InlineMath> preslikava
                elemente skupa <InlineMath>{"A"}</InlineMath> u skup{" "}
                <InlineMath>{"B"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Razliciti ulazi ostaju razliciti"
            formula={"f(x_1)=f(x_2) \\Rightarrow x_1=x_2"}
            note="Ako se dve slike poklope, polazni ulazi moraju biti isti."
          />
          <FormulaCard
            title="Svaki element kodomena je pogodjen"
            formula={"\\forall y \\in B \\; \\exists x \\in A:\\ f(x)=y"}
            note='Ne proveravas "sve realne brojeve", nego bas zadati kodomen.'
          />
          <FormulaCard
            title="Ulancavanje funkcija"
            formula={"(g\\circ f)(x)=g(f(x))"}
            note="Prvo se primenjuje unutrasnja funkcija, zatim spoljasnja."
          />
          <FormulaCard
            title="Povratak na ulaz"
            formula={"f^{-1}(y)=x \\Longleftrightarrow f(x)=y"}
            note="Inverzna funkcija ponistava dejstvo originalne funkcije."
          />
          <FormulaCard
            title="Najvazniji uslov"
            formula={"f \\text{ bijektivna } \\Longleftrightarrow \\forall y\\in B\\ \\exists!\\,x\\in A:\\ f(x)=y"}
            note={
              <>
                Znak <InlineMath>{"\\exists!"}</InlineMath> znaci &ldquo;postoji
                tacno jedan&rdquo;. To je srz invertibilnosti.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ 9. CESTE GRESKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="9. Ceste greske"
        title="Tipicne greske koje prave ucenici na zadacima o funkcijama"
        description="Ovo nisu opsti saveti, vec konkretne greske koje se redovno pojavljuju u skolskim i prijemnim zadacima."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mesanje kodomena i slike</h3>
            <p>
              Ako vidis da neki broj nije postignut, odmah zakljucis da funkcija
              &ldquo;nije dobra&rdquo;. Ne: to znaci samo da mozda nije
              surjektivna na dati kodomen.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pretpostavka da je svaka formula automatski invertibilna
            </h3>
            <p>
              Formula sama nije dovoljna. Moras proveriti da li je funkcija
              bijektivna ili da li treba ograniciti domen.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogresan redosled u kompoziciji
            </h3>
            <p>
              <InlineMath>{"g\\circ f"}</InlineMath> nije isto sto i{" "}
              <InlineMath>{"f\\circ g"}</InlineMath>. Citaj kompoziciju iznutra
              ka spolja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Brkanje <InlineMath>{"f^{-1}(x)"}</InlineMath> i{" "}
              <InlineMath>{"\\frac{1}{f(x)}"}</InlineMath>
            </h3>
            <p>
              Jedno je inverzna funkcija, drugo reciprocna vrednost. Ove dve
              stvari su skoro uvek razlicite.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 10. VEZA SA PRIJEMNIM ZADACIMA ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="10. Veza sa prijemnim zadacima"
        title="Kako se tema zaista pojavljuje na ispitima"
        description="Na prijemnom se retko trazi samo gola definicija. Obicno dobijas formulu i moras da zakljucis sta je domen, da li kompozicija ima smisla i pod kojim uslovom postoji inverz."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipicne forme zadataka">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                izracunaj <InlineMath>{"(g\\circ f)(x)"}</InlineMath> i{" "}
                <InlineMath>{"(f\\circ g)(x)"}</InlineMath>
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                nadji <InlineMath>{"f^{-1}(x)"}</InlineMath> i proveri da li
                je dobijeni izraz smislen
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                odredi domen ili kodomen tako da funkcija bude invertibilna
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                zakljuci da li je data funkcija injektivna, surjektivna ili
                bijektivna
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Najcesce zamke na ispitu">
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                izostavljen uslov <InlineMath>{"x\\ge 0"}</InlineMath> kod
                kvadratne funkcije i korena
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                zaboravljen kodomen, pa pogresna procena surjekcije
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                mehanicko resavanje bez provere da li je funkcija uopste
                bijektivna
              </div>
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 154, 106, 0.10)",
                  color: "var(--lesson-muted-strong)",
                }}
              >
                pogresna zamena mesta promenljivih pri nalazenju inverza
              </div>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni kontrolna lista">
          <p>
            Prvo napisi domen i kodomen, zatim proveri da li je pravilo zaista
            funkcija, potom ispitaj injekciju i surjekciju, a tek onda radi
            kompoziciju ili inverz.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. VEZBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="11. Vezbe"
        title="Kratka provera razumevanja"
        description="Resi samostalno, pa tek onda otvori resenje. Zadrzi paznju na domenu, kodomenu i redosledu koraka."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Klasifikacija konacne funkcije"
            problem={
              <p>
                Data je funkcija{" "}
                <InlineMath>
                  {"f:\\{1,2,3,4\\}\\to\\{a,b,c\\}"}
                </InlineMath>{" "}
                takva da je{" "}
                <InlineMath>
                  {"f(1)=a,\\; f(2)=b,\\; f(3)=c,\\; f(4)=c"}
                </InlineMath>
                . Da li je funkcija injektivna, surjektivna i bijektivna?
              </p>
            }
            solution={
              <p>
                Funkcija nije injektivna jer{" "}
                <InlineMath>{"f(3)=f(4)=c"}</InlineMath> za razlicite ulaze.
                Jeste surjektivna jer su svi elementi kodomena{" "}
                <InlineMath>{"a,b,c"}</InlineMath> pogodjeni. Zato nije
                bijektivna.
              </p>
            }
          />

          <ExerciseCard
            title="Zadatak 2: Kodomen menja odgovor"
            problem={
              <p>
                Posmatraj funkciju{" "}
                <InlineMath>
                  {"f:\\mathbb{R}\\to\\mathbb{R}"}
                </InlineMath>
                , <InlineMath>{"f(x)=x^2+1"}</InlineMath>. Da li je
                surjektivna?
              </p>
            }
            solution={
              <p>
                Nije. Vazi{" "}
                <InlineMath>{"f(x)\\ge 1"}</InlineMath> za svaki realan{" "}
                <InlineMath>{"x"}</InlineMath>, pa nijedan broj manji od{" "}
                <InlineMath>{"1"}</InlineMath> nije u slici funkcije. Zato
                funkcija nije surjektivna na{" "}
                <InlineMath>{"\\mathbb{R}"}</InlineMath>.
              </p>
            }
          />

          <ExerciseCard
            title="Zadatak 3: Nadji inverz"
            problem={
              <p>
                Data je funkcija{" "}
                <InlineMath>
                  {"f:\\mathbb{R}\\to\\mathbb{R}"}
                </InlineMath>
                , <InlineMath>{"f(x)=5x-2"}</InlineMath>. Odredi{" "}
                <InlineMath>{"f^{-1}(x)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "y=5x-2 \\qquad \\Longrightarrow \\qquad x=\\frac{y+2}{5} \\qquad \\Longrightarrow \\qquad f^{-1}(x)=\\frac{x+2}{5}"
                  }
                </MathBlock>
                <p>
                  Linearna funkcija sa nenultim koeficijentom uz{" "}
                  <InlineMath>{"x"}</InlineMath> jeste bijektivna na{" "}
                  <InlineMath>{"\\mathbb{R}"}</InlineMath>, pa inverz
                  postoji.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 4: Kompozicija"
            problem={
              <p>
                Ako su <InlineMath>{"f(x)=2x-3"}</InlineMath> i{" "}
                <InlineMath>{"g(x)=x^2"}</InlineMath>, izracunaj{" "}
                <InlineMath>{"(f\\circ g)(x)"}</InlineMath> i{" "}
                <InlineMath>{"(g\\circ f)(x)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"(f\\circ g)(x)=f(x^2)=2x^2-3"}</MathBlock>
                <MathBlock>{"(g\\circ f)(x)=g(2x-3)=(2x-3)^2"}</MathBlock>
                <p>
                  Rezultati nisu isti, sto jos jednom pokazuje da redosled u
                  kompoziciji nije proizvoljan.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="Glavna poruka ove teme"
        description="Dobar refleks nije da odmah racunas, nego da prvo proveris strukturu: da li pravilo zaista jeste funkcija, da li razlikuje ulaze, da li pogadja ceo kodomen i da li zato moze da se vrati unazad."
      >
        <InsightCard title="Najvazniji princip">
          <MathBlock>
            {
              "\\text{inverz postoji} \\qquad \\Longleftrightarrow \\qquad \\text{svaki izlaz ima tacno jednog pretsliku}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ ZAVRSNI REZIME ═══════════ */}
      <LessonSection
        eyebrow="12. Zavrsni rezime"
        title="Sta treba da zapamtis iz ove lekcije"
        description="Ako ove tvrdnje mozes samostalno da objasnis, lekcija je sustinski savladana."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Definicija funkcije</h3>
            <p>
              Funkcija <InlineMath>{"f:A\\to B"}</InlineMath> svakom elementu
              domena <InlineMath>{"A"}</InlineMath> dodeljuje tacno jednu sliku u
              kodomenu <InlineMath>{"B"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Domen, kodomen i slika</h3>
            <p>
              Domen, kodomen i slika nisu isto; surjekcija se proverava bas prema
              kodomenu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Injekcija</h3>
            <p>
              Injekcija znaci da se razliciti ulazi ne sudaraju u istoj slici.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Surjekcija</h3>
            <p>
              Surjekcija znaci da svaki element kodomena ima bar jednu pretsliku.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Bijekcija i inverz</h3>
            <p>
              Bijekcija znaci &ldquo;i injekcija i surjekcija&rdquo;, pa
              upravo tada postoji inverzna funkcija.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Kompozicija</h3>
            <p>
              Kompozicija se racuna zdesna nalevo: najpre unutrasnja funkcija, pa
              spoljasnja.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci prirodan korak je da isti jezik funkcija prepoznas u
          konkretnim tipovima funkcija i jednacina koje dolaze kasnije kroz
          algebru i analizu.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
