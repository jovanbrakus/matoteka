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
import TriangleLab from "./TriangleLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#oznake", label: "Oznake" },
  { href: "#strategija", label: "Strategija izbora" },
  { href: "#sinusna", label: "Sinusna teorema" },
  { href: "#kosinusna", label: "Kosinusna teorema" },
  { href: "#povrsina", label: "Površina trougla" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežba" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson43Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 43"
        title={
          <>
            Primena trigonometrije u planimetriji{" "}
            <span className={cs.tHeroAccent}>
              Sinusna i kosinusna teorema
            </span>
          </>
        }
        description="Kada trougao nije pravougli, Pitagorina teorema više nije dovoljna. Tada na scenu stupaju sinusna i kosinusna teorema: alati koji ti dozvoljavaju da iz nekoliko pažljivo povezanih podataka odrediš nepoznate stranice, uglove i površinu, baš onako kako se to traži na prijemnim zadacima."
        heroImageSrc="/api/lessons/43/hero"
        heroImageAlt="Apstraktna matematička ilustracija sa trouglovima, kružnicama i geometrijskim konstrukcijama"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da bez lutanja izabereš pravu teoremu, kako da rešiš kosougli trougao i kako da površinu dobiješ direktno iz dve stranice i zahvaćenog ugla.",
          },
          {
            label: "Najveća zamka",
            description:
              "Najčešća greška nije račun, nego pogrešan prvi izbor. Mnogi zamene sinusnu i kosinusnu teoremu ili previde da SSA podaci mogu dati dva različita trougla.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Na ispitu se teoreme često pojavljuju sakrivene u većem planimetrijskom crtežu: dijagonala četvorougla, presek trapeza ili pomoćna duž pretvaraju figuru u trougao koji treba rešiti.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70 do 100 minuta za temeljno čitanje, laboratoriju i završne zadatke.",
          },
          {
            label: "Predznanje",
            description:
              "Uglovi i trouglovi, osnovne trigonometrijske funkcije, rad u stepenima i Pitagorina teorema.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznati koji skup podataka određuje trougao i odmah izabrati najkraći put do nepoznate veličine.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za kosinusnu teoremu i dvosmisleni SSA slučaj kod sinusne teoreme.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je trenutak kada planimetrija izlazi iz pravouglog trougla"
        description="U školskim zadacima dugo se oslanjaš na Pitagorinu teoremu i elementarne formule. Međutim, čim se u zadatku pojavi kosougli trougao, obični alati više nisu dovoljni. Tada trigonometrija postaje most između crteža i broja: ona ti daje način da iz uglova dobiješ stranice, iz stranica uglove, a iz toga površinu i dalja planimetrijska zaključivanja."
      >
        <div className={s.grid3}>
          <SectionCard title="Prelaz sa Pitagore">
            <p>
              Pitagorina teorema rešava samo pravougle trouglove. Kosinusna
              teorema je njeno prirodno proširenje na sve trouglove, pa je zato
              jedna od centralnih formula planimetrije.
            </p>
          </SectionCard>
          <SectionCard title="Površina i dužine">
            <p>
              Mnogi zadaci ne traže direktno stranicu, nego površinu, ugao
              između dijagonala, poluprečnik opisane kružnice ili visinu. Sve to
              često počinje rešavanjem jednog trougla.
            </p>
          </SectionCard>
          <SectionCard title="Prijemna korist">
            <p>
              Na prijemnom je dragoceno da odmah znaš šta radiš. Ova lekcija
              smanjuje lutanje: umesto da isprobavaš nasumične formule,
              prepoznaješ strukturu i štediš vreme.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta se najčešće dogodi na ispitu?">
            <p>
              Zadatak ne kaže eksplicitno &ldquo;primeni sinusnu teoremu&rdquo;.
              Dobićeš, na primer, dve stranice trapeza i ugao, ili dijagonalu
              četvorougla koja deli figuru na dva trougla. Pravi posao je da{" "}
              <strong>prepoznaš skriveni trougao</strong>, pravilno obeležiš
              podatke i tek onda biraš teoremu.
            </p>
          </SectionCard>

          <SectionCard title="Minimalni algoritam za svaki zadatak">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Precrtaj i označi">
                <p>
                  Obavezno napiši koje su strane{" "}
                  <InlineMath>{"a, b, c"}</InlineMath>, a koji su uglovi{" "}
                  <InlineMath>{"A, B, C"}</InlineMath>. Ne preskači ovaj korak.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Pogledaj tip poznatih podataka">
                <p>
                  Ako znaš par &ldquo;stranica naspram ugao&rdquo;, misli na
                  sinusnu. Ako znaš dve stranice i ugao između njih ili sve tri
                  stranice, misli na kosinusnu.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title="Tek onda računaj površinu ili preostale uglove"
              >
                <p>
                  U mnogim zadacima jedna teorema otvara vrata drugoj. To je
                  normalno: prvo nađeš stranicu, pa zatim ugao, pa tek onda
                  površinu.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OZNAKE ═══════════ */}
      <LessonSection
        id="oznake"
        eyebrow="Oznake"
        title="Pravilna notacija je pola rešenja"
        description="Skoro svaka greška u ovoj oblasti može se pratiti do loše oznake. Pravilo je jednostavno: stranica i ugao sa istim slovom stoje jedan naspram drugog. To mora postati automatski refleks."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovno pravilo"
            formula={"a \leftrightarrow \angle A,\qquad b \leftrightarrow \angle B,\qquad c \leftrightarrow \angle C"}
            note={
              <>
                Stranica <InlineMath>{"a"}</InlineMath> leži naspram ugla{" "}
                <InlineMath>{"A"}</InlineMath>, stranica{" "}
                <InlineMath>{"b"}</InlineMath> naspram ugla{" "}
                <InlineMath>{"B"}</InlineMath>, a stranica{" "}
                <InlineMath>{"c"}</InlineMath> naspram ugla{" "}
                <InlineMath>{"C"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Veći ugao, veća strana"
            formula={"A>B \Longleftrightarrow a>b"}
            note="U trouglu redosled uglova i naspramnih stranica je isti. Ovo je brz kvalitativni test razumnosti rezultata."
          />
          <FormulaCard
            title="Zbir uglova"
            formula={"A+B+C=180^\circ"}
            note={
              <>
                Sinusna i kosinusna teorema često daju samo deo slike. Treći
                ugao skoro uvek dobijaš iz zbira{" "}
                <InlineMath>{"180^\\circ"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Učenikova perspektiva">
            <p>
              Ako brzopleto napišeš{" "}
              <InlineMath>{"\\frac{a}{\\sin B}"}</InlineMath> ili{" "}
              <InlineMath>{"\\frac{c}{\\sin A}"}</InlineMath>, sve dalje može
              izgledati uredno, ali je pogrešno od prve linije. Zato pre svakog
              računa zastani i bukvalno proveri:{" "}
              <strong>
                da li sam upario svaku stranicu sa njenim naspramnim uglom?
              </strong>
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Dobra navika: uz crtež uvek dopiši malu rečenicu &ldquo;
              <InlineMath>{"a"}</InlineMath> je naspram{" "}
              <InlineMath>{"A"}</InlineMath>&rdquo;. To zvuči trivijalno, ali na
              prijemnom spašava bodove.
            </p>
          </SectionCard>

          <SectionCard title="Brzi kvalitativni primer">
            <p>
              U trouglu je <InlineMath>{"B=70^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"C=45^\\circ"}</InlineMath>, a{" "}
              <InlineMath>{"b=14"}</InlineMath>. Bez računanja, da li je{" "}
              <InlineMath>{"c"}</InlineMath> veće ili manje od{" "}
              <InlineMath>{"14"}</InlineMath>?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uporedi uglove">
                <p>
                  Pošto je{" "}
                  <InlineMath>{"70^\\circ > 45^\\circ"}</InlineMath>, ugao{" "}
                  <InlineMath>{"B"}</InlineMath> je veći od ugla{" "}
                  <InlineMath>{"C"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Prevedi na stranice">
                <p>
                  Većem uglu odgovara veća naspramna stranica. Dakle{" "}
                  <InlineMath>{"b>c"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključak">
                <p>
                  Pošto je <InlineMath>{"b=14"}</InlineMath>, mora važiti{" "}
                  <InlineMath>{"c<14"}</InlineMath>. Ovakve procene pomažu da
                  proveriš da li je broj koji si dobio smislen.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je najveći ugao trougla A, koja je najveća stranica?"
          answer={
            <p>
              Najveća je stranica <InlineMath>{"a"}</InlineMath>, jer leži
              naspram najvećeg ugla <InlineMath>{"A"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ STRATEGIJA IZBORA ═══════════ */}
      <LessonSection
        id="strategija"
        eyebrow="Strategija izbora"
        title="Prva odluka je važnija od samog računa"
        description="Na istom trouglu možeš koristiti više formula, ali nisu sve jednako praktične. Cilj nije da na silu upotrebiš omiljenu teoremu, nego da izabereš onu koja najdirektnije odgovara datim podacima."
      >
        {/* Decision table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: 20,
              overflow: "hidden",
              marginTop: 18,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <thead>
              <tr>
                {["Šta znaš", "Prvi alat", "Zašto"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      background: "rgba(255,255,255,0.06)",
                      color: "var(--lesson-muted-strong)",
                      fontSize: "0.86rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Jednu stranicu i njoj naspramni ugao, plus još jedan ugao ili još jednu stranicu",
                  "Sinusna teorema",
                  "Ona direktno upoređuje parove \u201Estratranica naspram ugao\u201C.",
                ],
                [
                  "Dve stranice i ugao između njih (SAS)",
                  "Kosinusna teorema",
                  "Odmah daje treću stranicu bez zaobilaznih koraka.",
                ],
                [
                  "Sve tri stranice (SSS)",
                  "Kosinusna teorema unazad",
                  "Iz tri stranice možeš dobiti ugao preko kosinusa.",
                ],
                [
                  "Dve stranice i zahvaćen ugao, a traži se površina",
                  "P = \u00BD xy sin \u03B8",
                  "To je najkraći put: ne moraš prvo da tražiš visinu ili treću stranicu.",
                ],
                [
                  "Posle kosinusne hoćeš preostale uglove",
                  "Sinusna teorema",
                  "Vrlo često se obe teoreme koriste u istom zadatku, jedna za drugom.",
                ],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "14px 16px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        color:
                          j === 0
                            ? "var(--lesson-accent)"
                            : "var(--lesson-muted)",
                        fontWeight: j === 0 ? 800 : 400,
                        minWidth: j === 0 ? 160 : undefined,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard title="Važan prijemni uvid">
          <p>
            Nema ništa &ldquo;nečisto&rdquo; u tome da u istom zadatku prvo
            upotrebiš kosinusnu, a zatim sinusnu teoremu. Naprotiv, to je često
            najefikasnije rešenje. Na prijemnom se vrednuje tačnost i brzina, ne
            formalna &ldquo;čistoća&rdquo; metode.
          </p>
        </InsightCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Brzi izbor na primeru">
            <p>
              Dato je <InlineMath>{"b=10"}</InlineMath>,{" "}
              <InlineMath>{"c=13"}</InlineMath> i{" "}
              <InlineMath>{"A=52^\\circ"}</InlineMath>. Šta radiš prvo ako
              tražiš <InlineMath>{"a"}</InlineMath>, zatim{" "}
              <InlineMath>{"B"}</InlineMath>, a onda površinu?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj SAS podatke">
                <p>
                  Znaš dve stranice i ugao između njih. To je idealan teren za
                  kosinusnu teoremu.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Nađi <InlineMath>{"a"}</InlineMath> kosinusnom
                  </>
                }
              >
                <p>
                  Kada dobiješ treću stranicu, trougao je gotovo
                  &ldquo;otključan&rdquo;.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Pređi na sinusnu teoremu">
                <p>
                  Sada već imaš par{" "}
                  <InlineMath>{"a \\leftrightarrow A"}</InlineMath>, pa lako
                  dobijaš <InlineMath>{"B"}</InlineMath>, a zatim i{" "}
                  <InlineMath>{"C"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Površinu uzmi direktno">
                <p>
                  Pošto su <InlineMath>{"b"}</InlineMath>,{" "}
                  <InlineMath>{"c"}</InlineMath> i ugao{" "}
                  <InlineMath>{"A"}</InlineMath> poznati od početka, najbrže je
                  koristiti{" "}
                  <InlineMath>{"P=\\frac12 bc\\sin A"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Pedagoška poenta">
            <p>
              Učenici često pokušavaju da odmah izračunaju sve &ldquo;istom
              formulom&rdquo;. To skoro nikada nije optimalno. Pametnije je da
              za svaki traženi podatak pitaš:{" "}
              <strong>
                koja formula sada koristi baš ono što već imam?
              </strong>
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Drugim rečima, ne biraš omiljenu formulu, nego biraš formulu koja
              u tom trenutku radi najmanje posla.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ SINUSNA TEOREMA ═══════════ */}
      <LessonSection
        id="sinusna"
        eyebrow="Sinusna teorema"
        title="Sinusna teorema povezuje svaku stranicu sa njenim naspramnim uglom"
        description="Ovo je osnovna formula kada u trouglu znaš makar jedan pouzdan par \u201Estratranica naspram ugao\u201C. Intuitivno, ona govori da se veličina stranice menja u skladu sa sinusom naspramnog ugla. Veći ugao traži veću stranicu, ali ne linearno, nego preko funkcije sinus."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovni oblik"
            formula={"\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}"}
            note="Najčešće koristiš baš ovaj zapis. On omogućava da iz jednog poznatog para dobiješ nepoznatu stranicu ili ugao."
          />
          <FormulaCard
            title="Veza sa opisanim poluprečnikom"
            formula={"\\frac{a}{\\sin A}=2R"}
            note={
              <>
                Gde je <InlineMath>{"R"}</InlineMath> poluprečnik opisane
                kružnice. Ovo je koristan bonus za prijemne zadatke sa opisanim
                krugom.
              </>
            }
          />
          <FormulaCard
            title="Kada je prirodna"
            formula={"\\text{ASA, AAS, SSA}"}
            note="Ako imaš jednu stranicu i dva ugla, ili poznat par strana-ugao plus još jednu stranicu, sinusna teorema je prvi kandidat."
          />
          <FormulaCard
            title="SSA upozorenje"
            formula={"\\text{A, a, b mogu dati }0,1\\text{ ili }2\\text{ trougla}"}
            note="Ovo je dvosmisleni slučaj. Zato ne smeš automatski pretpostaviti da je rešenje jedinstveno."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija">
            <p>
              Sinusna teorema je posebno prirodna kada je trougao
              &ldquo;uglovno&rdquo; poznat. Ako znaš dve veličine uglova, oblik
              trougla je skoro određen, a jedna stranica samo &ldquo;skaluje&rdquo;
              celu figuru. Tada sinusna teorema brzo prenosi tu skalu na ostale
              stranice.
            </p>
            <ul>
              <li>
                Prvo proveri da li je par pravilno uparen:{" "}
                <InlineMath>{"a"}</InlineMath> sa{" "}
                <InlineMath>{"A"}</InlineMath>,{" "}
                <InlineMath>{"b"}</InlineMath> sa{" "}
                <InlineMath>{"B"}</InlineMath>,{" "}
                <InlineMath>{"c"}</InlineMath> sa{" "}
                <InlineMath>{"C"}</InlineMath>.
              </li>
              <li>Ne preskači računanje trećeg ugla ako ti nedostaje.</li>
              <li>
                Kada dobiješ vrednost sinusa ugla, proveri da li postoji i drugo
                moguće rešenje.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Primer 1: jedna stranica i dva ugla">
            <p>
              U trouglu je <InlineMath>{"A=32^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"B=71^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"a=7"}</InlineMath>. Nađi{" "}
              <InlineMath>{"b"}</InlineMath> i <InlineMath>{"c"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izračunaj treći ugao">
                <p>
                  <InlineMath>
                    {"C=180^\\circ-32^\\circ-71^\\circ=77^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Primenjuj sinusnu teoremu na{" "}
                    <InlineMath>{"b"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "\\frac{b}{\\sin 71^\\circ}=\\frac{7}{\\sin 32^\\circ}"
                    }
                  </InlineMath>
                  , pa je{" "}
                  <InlineMath>
                    {
                      "b=\\frac{7\\sin 71^\\circ}{\\sin 32^\\circ}\\approx 12.49"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Isto za <InlineMath>{"c"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "\\frac{c}{\\sin 77^\\circ}=\\frac{7}{\\sin 32^\\circ}"
                    }
                  </InlineMath>
                  , pa je{" "}
                  <InlineMath>
                    {
                      "c=\\frac{7\\sin 77^\\circ}{\\sin 32^\\circ}\\approx 12.88"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Proveri smisao">
                <p>
                  Pošto je <InlineMath>{"C"}</InlineMath> najveći ugao, strana{" "}
                  <InlineMath>{"c"}</InlineMath> mora biti najveća. Dobijeni
                  rezultat to potvrđuje.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer 2: dvosmisleni SSA slučaj">
            <p>
              Dato je <InlineMath>{"A=35^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"a=8"}</InlineMath>,{" "}
              <InlineMath>{"b=11"}</InlineMath>. Odredi koliko trouglova postoji
              i nađi njihove uglove.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Upotrebi test sa visinom">
                <p>
                  <InlineMath>
                    {"h=b\\sin A=11\\sin 35^\\circ\\approx 6.31"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Uporedi <InlineMath>{"a"}</InlineMath>,{" "}
                    <InlineMath>{"h"}</InlineMath> i{" "}
                    <InlineMath>{"b"}</InlineMath>
                  </>
                }
              >
                <p>
                  Pošto važi <InlineMath>{"h<a<b"}</InlineMath>, postoje{" "}
                  <strong>dva</strong> različita trougla.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Nađi ugao <InlineMath>{"B"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "\\sin B=\\frac{b\\sin A}{a}=\\frac{11\\sin 35^\\circ}{8}\\approx 0.789"
                    }
                  </InlineMath>
                  , pa su moguća rešenja{" "}
                  <InlineMath>{"B_1\\approx 52.1^\\circ"}</InlineMath> i{" "}
                  <InlineMath>{"B_2\\approx 127.9^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={4}
                title={
                  <>
                    Dobij ugao <InlineMath>{"C"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "C_1=180^\\circ-35^\\circ-52.1^\\circ\\approx 92.9^\\circ"
                    }
                  </InlineMath>
                  , a{" "}
                  <InlineMath>
                    {
                      "C_2=180^\\circ-35^\\circ-127.9^\\circ\\approx 17.1^\\circ"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={5} title="Zaključak">
                <p>
                  Isti podaci daju dva različita trougla. To je upravo razlog
                  zašto SSA nikada ne smeš rešavati mehanički.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Kako da misliš o SSA slučaju?">
            <p>
              Ako je ugao <InlineMath>{"A"}</InlineMath> oštar, strana{" "}
              <InlineMath>{"b"}</InlineMath> određuje visinu{" "}
              <InlineMath>{"h=b\\sin A"}</InlineMath>. Strana{" "}
              <InlineMath>{"a"}</InlineMath> tada može:
            </p>
            <ul>
              <li>
                biti kraća od <InlineMath>{"h"}</InlineMath>: trougao ne postoji
              </li>
              <li>
                biti jednaka <InlineMath>{"h"}</InlineMath>: postoji jedan
                pravougli trougao
              </li>
              <li>
                biti između <InlineMath>{"h"}</InlineMath> i{" "}
                <InlineMath>{"b"}</InlineMath>: postoje dva trougla
              </li>
              <li>
                biti bar jednaka <InlineMath>{"b"}</InlineMath>: postoji jedan
                trougao
              </li>
            </ul>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Ako je <InlineMath>{"A"}</InlineMath> tup ugao, situacija je
              jednostavnija: trougao može postojati samo ako je{" "}
              <InlineMath>{"a>b"}</InlineMath>, i tada je rešenje jedinstveno.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je A oštar i važi a < b sin A, koliko trouglova postoji?"
          answer={
            <p>
              Ne postoji nijedan, jer je strana{" "}
              <InlineMath>{"a"}</InlineMath> prekratka da bi
              &ldquo;dohvatila&rdquo; osnovu trougla.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KOSINUSNA TEOREMA ═══════════ */}
      <LessonSection
        id="kosinusna"
        eyebrow="Kosinusna teorema"
        title="Kosinusna teorema je Pitagora sa korekcijom za ugao"
        description="Ako znaš dve stranice i ugao između njih, ili sve tri stranice pa tražiš ugao, kosinusna teorema je najsigurniji alat. Njena velika vrednost je u tome što radi i kada trougao nije pravougli, a usput ti daje i geometrijski uvid: znak kosinusa odmah govori da li je ugao oštar, prav ili tup."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovni oblik"
            formula={"a^2=b^2+c^2-2bc\cos A"}
            note="Treća stranica se dobija iz dve poznate stranice i ugla između njih."
          />
          <FormulaCard
            title="Ciklični oblici"
            formula={"b^2=c^2+a^2-2ca\cos B,\qquad c^2=a^2+b^2-2ab\cos C"}
            note="Ista ideja važi za svaki ugao. Samo uvek pazi da koristiš ugao između dve poznate stranice."
          />
          <FormulaCard
            title="Pitagora kao specijalan slučaj"
            formula={"A=90^\circ \Rightarrow a^2=b^2+c^2"}
            note={
              <>
                Kada je ugao pravi,{" "}
                <InlineMath>{"\\cos 90^\\circ=0"}</InlineMath>, pa se korekcioni
                član gubi.
              </>
            }
          />
          <FormulaCard
            title="Obrnuti smer"
            formula={"\\cos A=\\frac{b^2+c^2-a^2}{2bc}"}
            note={
              <>
                Kada znaš sve tri stranice, ovim dobijaš ugao{" "}
                <InlineMath>{"A"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Brza klasifikacija"
            formula={"\\begin{aligned} a^2<b^2+c^2 &\\Rightarrow A<90^\\circ \\\\ a^2=b^2+c^2 &\\Rightarrow A=90^\\circ \\\\ a^2>b^2+c^2 &\\Rightarrow A>90^\\circ \\end{aligned}"}
            note="Ovo je moćan mentalni test: najveća strana ti često odmah otkriva tip trougla."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija">
            <p>
              Formula{" "}
              <InlineMath>{"a^2=b^2+c^2-2bc\\cos A"}</InlineMath> govori da
              treća stranica ne zavisi samo od dužina{" "}
              <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"c"}</InlineMath>, nego i od toga koliko se trougao
              &ldquo;otvara&rdquo; kod ugla <InlineMath>{"A"}</InlineMath>. Što
              je ugao veći, strana <InlineMath>{"a"}</InlineMath> postaje duža.
            </p>
            <ul>
              <li>
                Za oštar ugao je <InlineMath>{"\\cos A>0"}</InlineMath>, pa se
                oduzima pozitivan broj.
              </li>
              <li>
                Za pravi ugao je <InlineMath>{"\\cos A=0"}</InlineMath>, pa
                dobijaš Pitagoru.
              </li>
              <li>
                Za tup ugao je <InlineMath>{"\\cos A<0"}</InlineMath>, pa se
                zapravo dodaje pozitivan broj.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Primer 1: dve stranice i ugao između njih">
            <p>
              Dato je <InlineMath>{"b=9"}</InlineMath>,{" "}
              <InlineMath>{"c=12"}</InlineMath> i{" "}
              <InlineMath>{"A=60^\\circ"}</InlineMath>. Nađi{" "}
              <InlineMath>{"a"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Postavi kosinusnu teoremu">
                <p>
                  <InlineMath>
                    {"a^2=9^2+12^2-2\\cdot 9\\cdot 12\\cos 60^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti poznatu vrednost">
                <p>
                  <InlineMath>{"\\cos 60^\\circ=\\frac12"}</InlineMath>, pa je{" "}
                  <InlineMath>{"a^2=81+144-108=117"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Završi račun">
                <p>
                  <InlineMath>
                    {"a=\\sqrt{117}=3\\sqrt{13}\\approx 10.82"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer 2: sve tri stranice, pa ugao">
            <p>
              U trouglu su <InlineMath>{"a=5"}</InlineMath>,{" "}
              <InlineMath>{"b=7"}</InlineMath>,{" "}
              <InlineMath>{"c=10"}</InlineMath>. Nađi ugao{" "}
              <InlineMath>{"C"}</InlineMath> i odredi da li je trougao oštar ili
              tup.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Najpre prepoznaj najveću stranicu">
                <p>
                  Najveća je <InlineMath>{"c=10"}</InlineMath>, pa očekujemo da
                  je ugao <InlineMath>{"C"}</InlineMath> najveći.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni kosinusnu teoremu unazad">
                <p>
                  <InlineMath>
                    {
                      "\\cos C=\\frac{a^2+b^2-c^2}{2ab}=\\frac{25+49-100}{2\\cdot 5\\cdot 7}=-\\frac{13}{35}"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključi o uglu">
                <p>
                  Pošto je <InlineMath>{"\\cos C<0"}</InlineMath>, ugao{" "}
                  <InlineMath>{"C"}</InlineMath> je tup. Numerički,{" "}
                  <InlineMath>{"C\\approx 111.8^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Zašto je ovaj primer važan">
            <p>
              Na prijemnom se često traži samo vrsta trougla ili najveći ugao, a
              ne kompletno rešavanje. Tada ti kosinusna teorema služi kao
              dijagnostički alat: ne moraš uvek ići do krajnjeg broja da bi znao
              šta se dešava u figuri.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Negativan kosinus znači tup ugao. To je jedna od najkorisnijih
              kratkih provera u planimetriji.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: šta možeš odmah zaključiti ako važi a\u00B2 = b\u00B2 + c\u00B2?"
          answer={
            <p>
              Ugao <InlineMath>{"A"}</InlineMath> je prav, pa je trougao
              pravougli sa hipotenuzom <InlineMath>{"a"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POVRŠINA ═══════════ */}
      <LessonSection
        id="povrsina"
        eyebrow="Površina"
        title="Formula za površinu nije nova magija, nego stara visina u novom obliku"
        description="Jedna od najlepših posledica trigonometrije u trouglu jeste to što površinu možeš računati i onda kada visina nije direktno poznata. Dovoljno je da znaš dve stranice i ugao između njih."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Glavna formula"
            formula={"P=\\frac12 bc\\sin A"}
            note={
              <>
                Ako znaš stranice <InlineMath>{"b"}</InlineMath> i{" "}
                <InlineMath>{"c"}</InlineMath> i ugao{" "}
                <InlineMath>{"A"}</InlineMath> između njih, površina se dobija
                odmah.
              </>
            }
          />
          <FormulaCard
            title="Ciklični oblici"
            formula={"P=\\frac12 ca\\sin B=\\frac12 ab\\sin C"}
            note="Možeš izabrati bilo koji par stranica i ugao između njih."
          />
          <FormulaCard
            title="Odakle dolazi?"
            formula={"h_c=b\\sin A \\quad \\Rightarrow \\quad P=\\frac12 c\\cdot h_c=\\frac12 bc\\sin A"}
            note="Formula je samo standardna površina \u00BD \u00B7 osnovica \u00B7 visina, ali je visina izražena preko sinusa."
          />
          <FormulaCard
            title="Bonus formula"
            formula={"P=\\frac{abc}{4R}"}
            note={
              <>
                Ovo sledi iz sinusne teoreme i korisno je u naprednijim
                zadacima sa opisanim poluprečnikom{" "}
                <InlineMath>{"R"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer: površina direktno iz dve stranice i ugla">
            <p>
              Dato je <InlineMath>{"b=10"}</InlineMath>,{" "}
              <InlineMath>{"c=14"}</InlineMath> i{" "}
              <InlineMath>{"A=30^\\circ"}</InlineMath>. Nađi površinu trougla.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj da je ugao zahvaćen">
                <p>
                  Ugao <InlineMath>{"A"}</InlineMath> leži između stranica{" "}
                  <InlineMath>{"b"}</InlineMath> i{" "}
                  <InlineMath>{"c"}</InlineMath>, pa je formula{" "}
                  <InlineMath>{"\\frac12 bc\\sin A"}</InlineMath> direktno
                  primenljiva.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti podatke">
                <p>
                  <InlineMath>
                    {"P=\\frac12 \\cdot 10 \\cdot 14 \\cdot \\sin 30^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj">
                <p>
                  <InlineMath>{"\\sin 30^\\circ=\\frac12"}</InlineMath>, pa je{" "}
                  <InlineMath>{"P=70\\cdot \\frac12=35"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Šta učenici često previde">
            <p>
              Formula za površinu radi samo kada je ugao{" "}
              <strong>između</strong> dve poznate stranice. Ako znaš dve
              stranice i neki treći ugao, formula nije direktna. Tada prvo moraš
              naći odgovarajući zahvaćeni ugao ili treću stranicu.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Drugim rečima: nije dovoljno &ldquo;imam dve stranice i jedan
              ugao&rdquo;. Mora biti baš ugao između tih stranica.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koju formulu za površinu koristiš ako znaš a, b i ugao C?"
          answer={
            <p>
              Koristiš{" "}
              <InlineMath>{"P=\\frac12 ab\\sin C"}</InlineMath>, jer je{" "}
              <InlineMath>{"C"}</InlineMath> ugao između stranica{" "}
              <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivna laboratorija"
        title="Posmatraj kako ugao i dužine menjaju ceo trougao"
        description="U režimu kosinusne teoreme menjaj dve stranice i zahvaćen ugao, pa prati kako raste ili opada treća stranica i površina. U režimu sinusne teoreme posmatraj dvosmisleni SSA slučaj: isti podaci nekad daju dva trougla, a nekad nijedan."
      >
        <TriangleLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa trećom stranicom
            ili brojem rešenja, pa tek onda pomeri klizač. Ako ti se rezultat
            čini &ldquo;previše logičnim&rdquo;, upravo to i jeste poenta:
            formule opisuju geometrijsku realnost, i jednom kad je vidiš, ne
            zaboravljaš je.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Ovde se vidi kako se obe teoreme uklapaju u kompletno rešenje"
        description="Slede primeri nalik prijemnim zadacima: ne traži se samo jedna formula, nego čitav niz odluka. Obrati pažnju ne samo na račun, nego i na izbor redosleda koraka."
      >
        <div className={s.grid2}>
          <SectionCard title="Primer 1: prvo kosinusna, pa sinusna, pa površina">
            <p>
              Dato je <InlineMath>{"b=8"}</InlineMath>,{" "}
              <InlineMath>{"c=11"}</InlineMath> i{" "}
              <InlineMath>{"A=60^\\circ"}</InlineMath>. Reši trougao i nađi
              njegovu površinu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Nađi <InlineMath>{"a"}</InlineMath> kosinusnom teoremom
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "a^2=8^2+11^2-2\\cdot 8\\cdot 11\\cos 60^\\circ=64+121-88=97"
                    }
                  </InlineMath>
                  , pa je{" "}
                  <InlineMath>{"a=\\sqrt{97}\\approx 9.85"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Pređi na sinusnu teoremu">
                <p>
                  <InlineMath>
                    {
                      "\\frac{\\sin B}{8}=\\frac{\\sin 60^\\circ}{\\sqrt{97}}"
                    }
                  </InlineMath>
                  , pa je{" "}
                  <InlineMath>
                    {"\\sin B\\approx 0.703"}
                  </InlineMath>
                  , odnosno{" "}
                  <InlineMath>{"B\\approx 44.7^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj treći ugao">
                <p>
                  <InlineMath>
                    {
                      "C=180^\\circ-60^\\circ-44.7^\\circ\\approx 75.3^\\circ"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Površinu uzmi najkraćim putem">
                <p>
                  <InlineMath>
                    {
                      "P=\\frac12\\cdot 8\\cdot 11\\cdot \\sin 60^\\circ=22\\sqrt{3}\\approx 38.1"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Primer 2: dva ugla i jedna stranica">
            <p>
              Dato je <InlineMath>{"A=45^\\circ"}</InlineMath>,{" "}
              <InlineMath>{"B=75^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"a=8"}</InlineMath>. Nađi preostale stranice.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Treći ugao je odmah poznat">
                <p>
                  <InlineMath>
                    {"C=180^\\circ-45^\\circ-75^\\circ=60^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Nađi <InlineMath>{"b"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "b=\\frac{8\\sin 75^\\circ}{\\sin 45^\\circ}=4(\\sqrt{3}+1)\\approx 10.93"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Nađi <InlineMath>{"c"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "c=\\frac{8\\sin 60^\\circ}{\\sin 45^\\circ}=4\\sqrt{6}\\approx 9.80"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Provera razumnosti">
                <p>
                  Najveći ugao je <InlineMath>{"75^\\circ"}</InlineMath>, zato
                  je <InlineMath>{"b"}</InlineMath> najveća strana. Rezultat je
                  u skladu sa tim.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer 3: iz tri stranice do ugla i površine">
            <p>
              U trouglu su <InlineMath>{"a=7"}</InlineMath>,{" "}
              <InlineMath>{"b=9"}</InlineMath>,{" "}
              <InlineMath>{"c=12"}</InlineMath>. Nađi najveći ugao i površinu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Najveći ugao je naspram najveće stranice"
              >
                <p>
                  Pošto je <InlineMath>{"c=12"}</InlineMath> najveća strana,
                  najveći ugao je <InlineMath>{"C"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Nađi <InlineMath>{"\\cos C"}</InlineMath>
                  </>
                }
              >
                <p>
                  <InlineMath>
                    {
                      "\\cos C=\\frac{7^2+9^2-12^2}{2\\cdot 7\\cdot 9}=\\frac{49+81-144}{126}=-\\frac{1}{9}"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključi o uglu">
                <p>
                  Pošto je kosinus negativan, ugao{" "}
                  <InlineMath>{"C"}</InlineMath> je tup, a numerički{" "}
                  <InlineMath>{"C\\approx 96.4^\\circ"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Nađi sinus tog ugla">
                <p>
                  <InlineMath>
                    {
                      "\\sin C=\\sqrt{1-\\cos^2 C}=\\sqrt{1-\\frac{1}{81}}=\\frac{4\\sqrt{5}}{9}"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={5} title="Izračunaj površinu">
                <p>
                  <InlineMath>
                    {
                      "P=\\frac12 ab\\sin C=\\frac12\\cdot 7\\cdot 9\\cdot \\frac{4\\sqrt{5}}{9}=14\\sqrt{5}"
                    }
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Šta ovaj primer pokazuje">
            <p>
              Nekad trougao rešavaš &ldquo;unazad&rdquo;: iz tri stranice
              dobiješ ugao kosinusnom teoremom, zatim iz tog ugla sinus ili
              površinu. To je tipična prijemna struktura, naročito u zadacima gde
              je tražen najveći ugao, tip trougla ili površina figure koja se
              može razložiti na trouglove.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
              Zapamti: kosinusna teorema nije samo formula za treću stranicu. Ona
              je i alat za dijagnozu ugla.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Mali pregled formule i kada se koriste"
        description="Ovo nije sekcija za slepo bubanje. Cilj je da svaku formulu vežeš za situaciju u kojoj je najkorisnija."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sinusna teorema"
            formula={"\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}"}
            note={'Kada imaš jedan poznat par \u201Estratranica naspram ugao\u201C.'}
          />
          <FormulaCard
            title="Kosinusna teorema"
            formula={"a^2=b^2+c^2-2bc\\cos A"}
            note="Kada znaš dve stranice i zahvaćen ugao, ili sve tri stranice pa tražiš ugao."
          />
          <FormulaCard
            title="Površina preko ugla"
            formula={"P=\\frac12 bc\\sin A"}
            note="Kada znaš dve stranice i ugao između njih."
          />
          <FormulaCard
            title="Opisani poluprečnik"
            formula={"a=2R\\sin A"}
            note="Korisno u zadacima sa opisanim krugom ili kada treba povezati trougao i kružnicu."
          />
          <FormulaCard
            title="Klasifikacija ugla"
            formula={"\\begin{aligned} a^2<b^2+c^2 &\\Rightarrow A \\text{ oštar} \\\\ a^2=b^2+c^2 &\\Rightarrow A \\text{ prav} \\\\ a^2>b^2+c^2 &\\Rightarrow A \\text{ tup} \\end{aligned}"}
            note="Posebno korisno kada ne traže ceo ugao, nego tip trougla."
          />
          <FormulaCard
            title="Bonus posledica"
            formula={"P=\\frac{abc}{4R}"}
            note="Nije prva formula koju učiš, ali je veoma korisna u naprednijim kombinovanim zadacima."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovo su greške koje odnose bodove i kada je ideja dobra"
        description="Greške u ovoj oblasti retko nastaju zato što je formula \u201Eteška\u201C. Obično su uzrokovane brzopletošću i lošim čitanjem crteža ili podataka."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno uparivanje strana i uglova
            </h3>
            <p>
              U sinusnoj teoremi učenik napiše{" "}
              <InlineMath>{"\\frac{a}{\\sin B}"}</InlineMath> umesto{" "}
              <InlineMath>{"\\frac{a}{\\sin A}"}</InlineMath>. Od tog trenutka
              sve dalje izgleda uredno, ali je pogrešno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Kosinusna sa pogrešnim uglom</h3>
            <p>
              Formula{" "}
              <InlineMath>{"a^2=b^2+c^2-2bc\\cos A"}</InlineMath> koristi
              ugao između stranica <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"c"}</InlineMath>. Ako je dat neki drugi ugao,
              formula nije direktna.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljen SSA slučaj</h3>
            <p>
              Kada su dati <InlineMath>{"A"}</InlineMath>,{" "}
              <InlineMath>{"a"}</InlineMath> i{" "}
              <InlineMath>{"b"}</InlineMath>, mnogi nađu samo jedan ugao{" "}
              <InlineMath>{"B"}</InlineMath> preko arkus sinusa i stanu. Moraš
              proveriti postoji li i drugo rešenje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Površina sa pogrešnim uglom</h3>
            <p>
              Formula{" "}
              <InlineMath>{"\\frac12 bc\\sin A"}</InlineMath> radi samo jer
              je <InlineMath>{"A"}</InlineMath> ugao između{" "}
              <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"c"}</InlineMath>. Ako to nije slučaj, rezultat
              nema geometrijsko opravdanje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kalkulator u pogrešnom režimu
            </h3>
            <p>
              Ako zadatak radiš u stepenima, kalkulator mora biti na DEG.
              Pogrešan mod daje brojeve koji deluju &ldquo;normalno&rdquo;, ali
              su potpuno pogrešni.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Bez provere smisla rezultata
            </h3>
            <p>
              Ako je <InlineMath>{"C"}</InlineMath> najveći ugao, a dobiješ
              da je <InlineMath>{"c"}</InlineMath> najmanja stranica, nešto je
              pošlo naopako. Uvek radi kratku logičku proveru.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Na prijemnom se teoreme retko pojavljuju same"
        description="Pravi zadatak obično kombinuje više tema: sličnost, površinu, četvorougao, krug, visinu ili dijagonalu. Sinusna i kosinusna teorema tada rade kao univerzalni alat u pozadini."
      >
        <div className={s.grid3}>
          <SectionCard title="Skriveni trougao u većoj figuri">
            <p>
              Dijagonala romba, trapeza ili četvorougla često izdvoji trougao
              koji treba rešiti. Kad ga rešiš, ostatak figure postaje običan
              račun.
            </p>
          </SectionCard>
          <SectionCard title="Dve moguće konfiguracije">
            <p>
              Kada zadatak daje SSA podatke, proveri broj mogućih trouglova pre
              nego što napišeš konačan odgovor.
            </p>
          </SectionCard>
          <SectionCard title="Površina pre treće stranice">
            <p>
              Ako znaš dve stranice i zahvaćen ugao, površinu možeš dobiti
              odmah. Ne gubi vreme na nepotrebne međukorake.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemna check-lista pre nego što kreneš da računaš">
          <ul>
            <li>Da li su strane i uglovi pravilno označeni?</li>
            <li>
              Da li znam jedan pouzdan par &ldquo;stranica naspram ugao&rdquo;?
            </li>
            <li>
              Da li je dati ugao zahvaćeni ugao između dve poznate stranice?
            </li>
            <li>Da li postoji mogućnost dva rešenja?</li>
            <li>
              Da li rezultat ima smisla u odnosu na najveći ugao i najveću
              stranicu?
            </li>
          </ul>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe"
        title="Probaj sam, pa otvori rešenje"
        description="Zadatke rešavaj bez gledanja u rešenje. Posle svakog odgovora obavezno proveri da li su redosled uglova i redosled stranica logični."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: jedna stranica i dva ugla"
            problem={
              <p>
                U trouglu je <InlineMath>{"A=40^\\circ"}</InlineMath>,{" "}
                <InlineMath>{"B=65^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"a=6"}</InlineMath>. Nađi{" "}
                <InlineMath>{"b"}</InlineMath> i{" "}
                <InlineMath>{"c"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Najpre je{" "}
                  <InlineMath>
                    {"C=180^\\circ-40^\\circ-65^\\circ=75^\\circ"}
                  </InlineMath>
                  .
                </p>
                <MathBlock>
                  {
                    "b=\\frac{6\\sin 65^\\circ}{\\sin 40^\\circ}\\approx 8.46,\\qquad c=\\frac{6\\sin 75^\\circ}{\\sin 40^\\circ}\\approx 9.01"
                  }
                </MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 2: dve stranice i zahvaćeni ugao"
            problem={
              <p>
                Dato je <InlineMath>{"b=7"}</InlineMath>,{" "}
                <InlineMath>{"c=10"}</InlineMath> i{" "}
                <InlineMath>{"A=60^\\circ"}</InlineMath>. Nađi{" "}
                <InlineMath>{"a"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Primeni kosinusnu teoremu:</p>
                <MathBlock>
                  {
                    "a^2=7^2+10^2-2\\cdot 7\\cdot 10\\cos 60^\\circ=49+100-70=79"
                  }
                </MathBlock>
                <p>
                  Zato je{" "}
                  <InlineMath>{"a=\\sqrt{79}\\approx 8.89"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 3: dvosmisleni SSA slučaj"
            problem={
              <p>
                Dato je <InlineMath>{"A=30^\\circ"}</InlineMath>,{" "}
                <InlineMath>{"a=8"}</InlineMath>,{" "}
                <InlineMath>{"b=10"}</InlineMath>. Odredi broj mogućih
                trouglova.
              </p>
            }
            solution={
              <>
                <p>
                  Računaj visinu:{" "}
                  <InlineMath>
                    {"h=b\\sin A=10\\cdot \\frac12=5"}
                  </InlineMath>
                  .
                </p>
                <p>
                  Pošto je <InlineMath>{"h<a<b"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"5<8<10"}</InlineMath>, postoje dva trougla.
                </p>
                <p>
                  Dodatno,{" "}
                  <InlineMath>
                    {"\\sin B=\\frac{10\\sin 30^\\circ}{8}=\\frac58"}
                  </InlineMath>
                  , pa su{" "}
                  <InlineMath>{"B_1\\approx 38.68^\\circ"}</InlineMath> i{" "}
                  <InlineMath>{"B_2\\approx 141.32^\\circ"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 4: površina i treća stranica"
            problem={
              <p>
                Dato je <InlineMath>{"b=12"}</InlineMath>,{" "}
                <InlineMath>{"c=9"}</InlineMath> i{" "}
                <InlineMath>{"A=45^\\circ"}</InlineMath>. Nađi površinu i
                stranicu <InlineMath>{"a"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "P=\\frac12\\cdot 12\\cdot 9\\cdot \\sin 45^\\circ=54\\cdot \\frac{\\sqrt{2}}{2}=27\\sqrt{2}"
                  }
                </MathBlock>
                <p>Za treću stranicu:</p>
                <MathBlock>
                  {
                    "a^2=12^2+9^2-2\\cdot 12\\cdot 9\\cos 45^\\circ=225-108\\sqrt{2}"
                  }
                </MathBlock>
                <p>
                  pa je <InlineMath>{"a\\approx 8.50"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 5: najveći ugao i površina"
            problem={
              <p>
                U trouglu su <InlineMath>{"a=6"}</InlineMath>,{" "}
                <InlineMath>{"b=7"}</InlineMath>,{" "}
                <InlineMath>{"c=8"}</InlineMath>. Nađi najveći ugao i
                površinu.
              </p>
            }
            solution={
              <>
                <p>
                  Najveći ugao je <InlineMath>{"C"}</InlineMath>, jer je{" "}
                  <InlineMath>{"c=8"}</InlineMath> najveća stranica.
                </p>
                <MathBlock>
                  {
                    "\\cos C=\\frac{6^2+7^2-8^2}{2\\cdot 6\\cdot 7}=\\frac{21}{84}=\\frac14"
                  }
                </MathBlock>
                <p>
                  pa je <InlineMath>{"C\\approx 75.5^\\circ"}</InlineMath>.
                </p>
                <p>
                  Dalje je{" "}
                  <InlineMath>
                    {
                      "\\sin C=\\sqrt{1-\\frac{1}{16}}=\\frac{\\sqrt{15}}{4}"
                    }
                  </InlineMath>
                  , pa
                </p>
                <MathBlock>
                  {
                    "P=\\frac12\\cdot 6\\cdot 7\\cdot \\frac{\\sqrt{15}}{4}=\\frac{21\\sqrt{15}}{4}"
                  }
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Kosinusna teorema ti kaže kako ugao menja treću stranicu. Sinusna teorema ti kaže kako su naspramne stranice i uglovi međusobno usklađeni. Formula za površinu ti pokazuje da se visina može \u201Esakriti\u201C unutar sinusa."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kad ove tri ideje vidiš kao jednu celinu, planimetrijski zadaci
            postaju mnogo pregledniji.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ako ove stavke ostanu stabilne u glavi, imaćeš vrlo čvrst oslonac za većinu prijemnih zadataka iz trouglova i planimetrije."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Oznake su presudne</h3>
            <p>
              <InlineMath>{"a"}</InlineMath> je naspram{" "}
              <InlineMath>{"A"}</InlineMath>,{" "}
              <InlineMath>{"b"}</InlineMath> naspram{" "}
              <InlineMath>{"B"}</InlineMath>,{" "}
              <InlineMath>{"c"}</InlineMath> naspram{" "}
              <InlineMath>{"C"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Sinusna teorema</h3>
            <p>
              Sinusna teorema je prvi izbor kada znaš jedan par &ldquo;stranica
              naspram ugao&rdquo;.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Kosinusna teorema</h3>
            <p>
              Kosinusna teorema je prvi izbor za SAS i SSS situacije, a u pravom
              uglu se svodi na Pitagorinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. SSA slučaj</h3>
            <p>
              SSA slučaj može dati{" "}
              <InlineMath>{"0"}</InlineMath>,{" "}
              <InlineMath>{"1"}</InlineMath> ili{" "}
              <InlineMath>{"2"}</InlineMath> trougla, pa broj rešenja moraš
              proveriti posebno.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Površina</h3>
            <p>
              Površina se najbrže dobija formulom{" "}
              <InlineMath>{"\\frac12 xy\\sin \\theta"}</InlineMath> kada znaš
              dve stranice i zahvaćeni ugao.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Primena ovih alata na četvorouglove, mnogouglove i zadatke sa
              krugom, gde se figura često razlaže na trouglove.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 43 zatvara priču o trigonometriji u planimetriji: od oznaka
          preko strategije izbora formule do potpunog rešavanja kosouglih
          trouglova.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
