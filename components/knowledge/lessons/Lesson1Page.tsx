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
import TruthTableLab from "./TruthTableLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#temelj", label: "Šta je iskaz" },
  { href: "#operacije", label: "Operacije" },
  { href: "#laboratorija", label: "Interaktivni laboratorij" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Zakoni i obrasci" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Veza sa prijemnim" },
  { href: "#vezba", label: "Mini vežba" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson1Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 1"
        title={
          <>
            Iskazi i{" "}
            <span className={cs.tHeroAccent}>iskazne formule</span>
          </>
        }
        description="Ovo je prvi ozbiljan korak u matematičkom formalizmu. Ako razumeš šta je iskaz, kako radi implikacija i kada su dve transformacije zaista ekvivalentne, kasnije ćeš mnogo sigurnije rešavati jednačine, nejednačine i zadatke sa uslovima domena."
        heroImageSrc="/api/lessons/1/hero"
        heroImageAlt="Apstraktna matematička tabla sa geometrijskim i simboličkim zapisima"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da prirodan jezik prevedeš u preciznu logičku formulu.",
          },
          {
            label: "Najveća zamka",
            description:
              "mešanje implikacije i ekvivalencije, posebno u algebarskim transformacijama.",
          },
          {
            label: "Prijemni fokus",
            description:
              "postavljanje uslova, čuvanje ekvivalentnosti i odbacivanje lažnih rešenja.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "25 do 35 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "Nije potrebno ništa više od pažljivog čitanja i osnovne algebarske discipline",
          },
          {
            label: "Glavna veština",
            description:
              "prevođenje rečenice u logički oblik i pravilno čitanje uslova",
          },
          {
            label: "Interaktivno",
            description:
              "canvas laboratorija istinitosnih tabela sa objašnjenjem po redovima",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE OVA LEKCIJA VAŽNA ═══════════ */}
      <LessonSection
        eyebrow="Zašto je ova lekcija važna"
        title="Pre algebre stoji disciplina mišljenja"
        description='Mnogi učenici misle da je logika zasebna tema koja se retko pojavljuje na prijemnom. To nije tačno. Logika je skrivena u svakom koraku tipa: "ako važi ovo, onda smem da uradim ono", "ova transformacija je ekvivalentna", "moram da postavim sve uslove odjednom". Upravo zato ova lekcija vredi mnogo više nego što deluje na prvi pogled.'
      >
        <div className={s.grid2}>
          <SectionCard title="Šta dobijaš iz ove lekcije">
            <ul>
              <li>
                jasnu granicu između tačno definisanog iskaza i rečenice koja
                još nije kompletna
              </li>
              <li>
                sigurnost pri radu sa &ldquo;ako..., onda...&rdquo; i
                &ldquo;ako i samo ako&rdquo;
              </li>
              <li>
                osnovu za razumevanje uslova domena i proveru dobijenih rešenja
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Na šta odmah obrati pažnju">
            <ul>
              <li>pitanje nije iskaz jer nema istinitosnu vrednost</li>
              <li>
                otvorena rečenica sa promenljivom nije iskaz dok promenljiva
                nije određena
              </li>
              <li>
                implikacija i ekvivalencija nisu isto, i ta razlika ruši mnoge
                zadatke
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ 1. TEMELJ ═══════════ */}
      <LessonSection
        id="temelj"
        eyebrow="1. Temelj"
        title="Šta je iskaz, a šta nije"
        description='Iskaz je rečenica kojoj možemo dodeliti tačno jednu istinitosnu vrednost: ili je tačna, ili je netačna. Nema treće opcije, nema "zavisi kako gledaš", nema "možda".'
      >
        <div className={s.grid2}>
          <SectionCard title="Iskaz">
            <p>
              Rečenica sa jasno određenim značenjem kojoj možeš pridružiti jednu
              i samo jednu od dve vrednosti: <strong>tačno</strong> ili{" "}
              <strong>netačno</strong>.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(236, 91, 19, 0.07)",
                  border: "1px solid rgba(236, 91, 19, 0.10)",
                }}
              >
                <strong
                  style={{
                    color: "var(--lesson-primary-soft)",
                    minWidth: 84,
                    fontSize: "0.9rem",
                  }}
                >
                  Primer
                </strong>
                <span style={{ color: "var(--lesson-muted-strong)" }}>
                  &ldquo;<InlineMath>{"2 + 3 = 5"}</InlineMath>&rdquo; je iskaz
                  i tačan je.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(236, 91, 19, 0.07)",
                  border: "1px solid rgba(236, 91, 19, 0.10)",
                }}
              >
                <strong
                  style={{
                    color: "var(--lesson-primary-soft)",
                    minWidth: 84,
                    fontSize: "0.9rem",
                  }}
                >
                  Primer
                </strong>
                <span style={{ color: "var(--lesson-muted-strong)" }}>
                  &ldquo;Broj <InlineMath>{"11"}</InlineMath> je paran.&rdquo;
                  je iskaz i netačan je.
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Šta nije iskaz">
            <p>
              Pitanja, naredbe i otvorene rečenice bez zadate vrednosti
              promenljive nisu iskazi, jer im još ne možeš dodeliti jednu
              jedinstvenu istinitosnu vrednost.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(236, 91, 19, 0.07)",
                  border: "1px solid rgba(236, 91, 19, 0.10)",
                }}
              >
                <strong
                  style={{
                    color: "var(--lesson-primary-soft)",
                    minWidth: 84,
                    fontSize: "0.9rem",
                  }}
                >
                  Pitanje
                </strong>
                <span style={{ color: "var(--lesson-muted-strong)" }}>
                  &ldquo;Koliko je <InlineMath>{"2 + 3"}</InlineMath>?&rdquo;
                  nije iskaz.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(236, 91, 19, 0.07)",
                  border: "1px solid rgba(236, 91, 19, 0.10)",
                }}
              >
                <strong
                  style={{
                    color: "var(--lesson-primary-soft)",
                    minWidth: 84,
                    fontSize: "0.9rem",
                  }}
                >
                  Naredba
                </strong>
                <span style={{ color: "var(--lesson-muted-strong)" }}>
                  &ldquo;Izračunaj diskriminantu.&rdquo; nije iskaz.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: "rgba(236, 91, 19, 0.07)",
                  border: "1px solid rgba(236, 91, 19, 0.10)",
                }}
              >
                <strong
                  style={{
                    color: "var(--lesson-primary-soft)",
                    minWidth: 84,
                    fontSize: "0.9rem",
                  }}
                >
                  Otvorena rečenica
                </strong>
                <span style={{ color: "var(--lesson-muted-strong)" }}>
                  &ldquo;<InlineMath>{"x > 2"}</InlineMath>&rdquo; nije iskaz
                  dok ne znaš koje je <InlineMath>{"x"}</InlineMath>.
                </span>
              </div>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question={'Proveri sebe: da li je rečenica "x\u00B2 = 9" iskaz?'}
          answer={
            <p>
              Sama po sebi nije iskaz, jer zavisi od vrednosti promenljive{" "}
              <InlineMath>{"x"}</InlineMath>. Tek kada kažeš, na primer,{" "}
              &ldquo;<InlineMath>{"x = 3"}</InlineMath>&rdquo; ili &ldquo;
              <InlineMath>{"x = 2"}</InlineMath>&rdquo;, možeš odlučiti da li
              je rečenica tačna ili netačna.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 2. OPERACIJE ═══════════ */}
      <LessonSection
        id="operacije"
        eyebrow="2. Operacije"
        title="Kako se od iskaza grade formule"
        description="Kada jednostavne iskaze obeležimo slovima p, q, r, možemo da gradimo složenije formule. To je ista ideja kao u algebri: od osnovnih elemenata praviš složen izraz po tačno određenim pravilima."
      >
        <div className={s.grid3} style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
          {/* Negacija */}
          <SectionCard title="Negacija">
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 66,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(236, 91, 19, 0.12)",
                  border: "1px solid rgba(255, 154, 106, 0.16)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                <InlineMath>{"\\neg p"}</InlineMath>
              </span>
            </div>
            <p>
              &ldquo;Nije tačno da važi <InlineMath>{"p"}</InlineMath>&rdquo;.
              Menja istinitosnu vrednost iskaza.
            </p>
            <ul>
              <li>
                ako je <InlineMath>{"p"}</InlineMath> tačno, onda je{" "}
                <InlineMath>{"\\neg p"}</InlineMath> netačno
              </li>
              <li>
                ako je <InlineMath>{"p"}</InlineMath> netačno, onda je{" "}
                <InlineMath>{"\\neg p"}</InlineMath> tačno
              </li>
            </ul>
          </SectionCard>

          {/* Konjunkcija */}
          <SectionCard title="Konjunkcija">
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 66,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(236, 91, 19, 0.12)",
                  border: "1px solid rgba(255, 154, 106, 0.16)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                <InlineMath>{"p \\land q"}</InlineMath>
              </span>
            </div>
            <p>
              Čita se: &ldquo;<InlineMath>{"p"}</InlineMath> i{" "}
              <InlineMath>{"q"}</InlineMath>&rdquo;. Tačna je samo kada su oba
              dela tačna.
            </p>
            <ul>
              <li>ovo je logičko &ldquo;i&rdquo;</li>
              <li>dovoljno je da jedan deo padne, pa da cela formula padne</li>
            </ul>
          </SectionCard>

          {/* Disjunkcija */}
          <SectionCard title="Disjunkcija">
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 66,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(236, 91, 19, 0.12)",
                  border: "1px solid rgba(255, 154, 106, 0.16)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                <InlineMath>{"p \\lor q"}</InlineMath>
              </span>
            </div>
            <p>
              Čita se: &ldquo;<InlineMath>{"p"}</InlineMath> ili{" "}
              <InlineMath>{"q"}</InlineMath>&rdquo;. U školskom kontekstu
              koristi se uključivo &ldquo;ili&rdquo;.
            </p>
            <ul>
              <li>tačna je kada je bar jedan deo tačan</li>
              <li>netačna je samo kada su oba dela netačna</li>
            </ul>
          </SectionCard>

          {/* Implikacija */}
          <SectionCard title="Implikacija">
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 66,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(236, 91, 19, 0.12)",
                  border: "1px solid rgba(255, 154, 106, 0.16)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                <InlineMath>{"p \\Rightarrow q"}</InlineMath>
              </span>
            </div>
            <p>
              Čita se: &ldquo;ako <InlineMath>{"p"}</InlineMath>, onda{" "}
              <InlineMath>{"q"}</InlineMath>&rdquo;. Ovo je najosetljivija
              operacija u celoj lekciji.
            </p>
            <ul>
              <li>
                netačna je samo kada je <InlineMath>{"p"}</InlineMath> tačno, a{" "}
                <InlineMath>{"q"}</InlineMath> netačno
              </li>
              <li>u svim ostalim slučajevima je tačna</li>
            </ul>
          </SectionCard>

          {/* Ekvivalencija */}
          <SectionCard title="Ekvivalencija">
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 66,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(236, 91, 19, 0.12)",
                  border: "1px solid rgba(255, 154, 106, 0.16)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                <InlineMath>{"p \\Leftrightarrow q"}</InlineMath>
              </span>
            </div>
            <p>
              Čita se: &ldquo;<InlineMath>{"p"}</InlineMath> ako i samo ako{" "}
              <InlineMath>{"q"}</InlineMath>&rdquo;. Dve strane moraju da imaju
              istu vrednost.
            </p>
            <ul>
              <li>tačna je kada su obe strane tačne ili obe netačne</li>
              <li>to je mnogo jača veza od obične implikacije</li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Najvažnije upozorenje u celoj lekciji">
          <p>
            Rečenica &ldquo;<InlineMath>{"p \\Rightarrow q"}</InlineMath>&rdquo;
            ne kaže da su <InlineMath>{"p"}</InlineMath> i{" "}
            <InlineMath>{"q"}</InlineMath> isto. Ona samo kaže da se ne sme
            desiti situacija &ldquo;tačno pa netačno&rdquo;. Zato u algebri ne
            smeš olako da tvrdiš da je svaki korak ekvivalentan: ponekad dobiješ
            samo implikaciju, a ne ekvivalenciju.
          </p>
        </InsightCard>

        <MicroCheck
          question={"Proveri sebe: kada je implikacija p \u21D2 q netačna?"}
          answer={
            <p>
              Samo u jednom slučaju: kada je <InlineMath>{"p"}</InlineMath>{" "}
              tačno, a <InlineMath>{"q"}</InlineMath> netačno. To je jedini red
              u istinitosnoj tabeli koji ruši implikaciju.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. INTERAKTIVNI LABORATORIJ ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="3. Interaktivni laboratorij"
        title="Istinitosna tabela koju možeš da čitaš red po red"
        description="Izaberi operaciju, zatim klikni jedan red tabele. Lekcija će ti odmah objasniti zašto je rezultat u tom redu tačan ili netačan. Ako posebno dobro savladaš implikaciju i ekvivalenciju u ovom laboratoriju, kasnije ćeš mnogo ređe praviti formalne greške."
      >
        <TruthTableLab />

        <InsightCard title="Kako da učiš iz ovog laboratorija">
          <p>
            Pokušaj da prvo sam pogodiš šta će biti rezultat u redu, pa tek onda
            klikni da proveriš. Posebnu pažnju obrati na implikaciju: mnogi
            učenici se iznenade kada vide da je implikacija tačna i u slučaju kada
            je premisa netačna.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 4. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="4. Vođeni primeri"
        title="Kako iz jezika prelazimo u simbolički zapis"
        description="Logika nije tu da ulepša rečenicu, nego da je učini potpuno preciznom. U svakom primeru pokušaj da vidiš tri nivoa: prirodan jezik, simbolički zapis i istinitosnu analizu."
      >
        <div className={s.grid2}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: &ldquo;Broj je paran i deljiv sa 3.&rdquo;
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prevedi rečenicu u simbole."
              >
                <p>
                  Neka je <InlineMath>{"p"}</InlineMath>: &ldquo;broj je
                  paran&rdquo;, a <InlineMath>{"q"}</InlineMath>: &ldquo;broj je
                  deljiv sa 3&rdquo;. Rečenica &ldquo;broj je paran i deljiv sa
                  3&rdquo; prevodi se kao konjunkcija{" "}
                  <InlineMath>{"p \\land q"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Formalni zapis."
              >
                <MathBlock>
                  {
                    'p = \\text{"broj je paran"}, \\qquad q = \\text{"broj je deljiv sa 3"}'
                  }
                </MathBlock>
                <MathBlock>
                  {"\\text{rečenični zapis} \\Longrightarrow p \\land q"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title="Provera na konkretnom broju."
              >
                <p>
                  Ako je broj <InlineMath>{"12"}</InlineMath>, onda su i{" "}
                  <InlineMath>{"p"}</InlineMath> i <InlineMath>{"q"}</InlineMath>{" "}
                  tačni, pa je formula tačna. Ako je broj{" "}
                  <InlineMath>{"10"}</InlineMath>, <InlineMath>{"p"}</InlineMath>{" "}
                  jeste tačno, ali <InlineMath>{"q"}</InlineMath> nije, pa je
                  cela formula netačna.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: &ldquo;Ako je broj deljiv sa 6, onda je deljiv sa
              3.&rdquo;
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prevedi u implikaciju."
              >
                <p>
                  Neka je <InlineMath>{"p"}</InlineMath>: &ldquo;broj je deljiv
                  sa 6&rdquo;, a <InlineMath>{"q"}</InlineMath>: &ldquo;broj je
                  deljiv sa 3&rdquo;. Onda je cela rečenica implikacija{" "}
                  <InlineMath>{"p \\Rightarrow q"}</InlineMath>.
                </p>
                <MathBlock>{"p \\Rightarrow q"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Značenje."
              >
                <p>
                  Kad god važi jači uslov &ldquo;deljiv sa 6&rdquo;, mora da
                  važi i slabiji &ldquo;deljiv sa 3&rdquo;.
                </p>
                <MathBlock>
                  {
                    "12 \\text{ je deljiv sa } 6 \\Rightarrow 12 \\text{ je deljiv sa } 3"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title="Šta je sa brojem 5?"
              >
                <p>
                  Ako uzmeš broj <InlineMath>{"5"}</InlineMath>, onda je{" "}
                  <InlineMath>{"p"}</InlineMath> netačno i{" "}
                  <InlineMath>{"q"}</InlineMath> netačno. Implikacija ostaje
                  tačna jer se nije desio zabranjeni slučaj &ldquo;tačno pa
                  netačno&rdquo;.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: kako bi zapisao \"broj nije paran\" ako je p: \"broj je paran\"?"
          }
          answer={
            <p>
              Negacija se zapisuje kao{" "}
              <InlineMath>{"\\neg p"}</InlineMath>.
            </p>
          }
        />

        <div className={s.grid2} style={{ marginTop: 16 }}>
          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: negacija složene formule
            </h3>
            <p>
              Neka je <InlineMath>{"p"}</InlineMath>: &ldquo;učenik je naučio
              definicije&rdquo;, a <InlineMath>{"q"}</InlineMath>: &ldquo;učenik
              ume da čita tabele&rdquo;. Formula{" "}
              <InlineMath>{"p \\lor q"}</InlineMath> znači da važi bar jedno od
              to dvoje.
            </p>
            <p>
              Šta znači negacija{" "}
              <InlineMath>{"\\neg (p \\lor q)"}</InlineMath>? To ne znači
              &ldquo;nije naučio definicije ili ne ume da čita tabele&rdquo;.
              Prava negacija glasi: &ldquo;nije naučio definicije{" "}
              <strong>i</strong> ne ume da čita tabele&rdquo;.
            </p>
            <MathBlock>
              {"\\neg (p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q)"}
            </MathBlock>
            <p>
              Ovo je prvi De Morganov zakon. Negacija prolazi kroz zagradu, ali
              pritom menja operaciju.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: zašto je ekvivalencija jača od implikacije
            </h3>
            <p>
              Rečenica &ldquo;<InlineMath>{"x = 2"}</InlineMath> ako i samo ako{" "}
              <InlineMath>{"x^2 = 4"}</InlineMath>&rdquo; nije tačna, jer iz{" "}
              <InlineMath>{"x^2 = 4"}</InlineMath> sledi i{" "}
              <InlineMath>{"x = -2"}</InlineMath>. Dakle, imamo implikaciju{" "}
              <InlineMath>{"x = 2 \\Rightarrow x^2 = 4"}</InlineMath>, ali
              nemamo ekvivalenciju.
            </p>
            <MathBlock>{"x = 2 \\Rightarrow x^2 = 4"}</MathBlock>
            <MathBlock>{"x^2 = 4 \\nRightarrow x = 2"}</MathBlock>
            <MathBlock>{"x = 2 \\not\\Leftrightarrow x^2 = 4"}</MathBlock>
            <p>
              Ovo je isti tip greške koji kasnije proizvodi lažna rešenja kada
              kvadriraš jednačinu bez pune kontrole uslova.
            </p>
          </article>
        </div>

        <MicroCheck
          question={
            "Mikro-provera: zašto broj 5 ne ruši implikaciju iznad?"
          }
          answer={
            <p>
              Zato što je antecedens <InlineMath>{"p"}</InlineMath> već netačan.
              Implikacija traži samo da se ne pojavi situacija &ldquo;tačno, pa
              netačno&rdquo;.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. ZAKONI I OBRASCI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="5. Zakoni i obrasci"
        title="Tautologije, ekvivalencija i De Morganovi zakoni"
        description="Kada za dve formule kažemo da su logički ekvivalentne, mislimo da imaju iste istinitosne vrednosti u svakom mogućem slučaju. To je veoma praktično: možeš da zameniš jednu formulu drugom bez promene smisla."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Tautologija"
            formula={"p \\lor \\neg p"}
            note={
              <>
                Uvek je tačna. Bez obzira na to da li je{" "}
                <InlineMath>{"p"}</InlineMath> tačno ili netačno, makar jedan
                deo formule mora da bude tačan.
              </>
            }
          />
          <FormulaCard
            title="De Morgan 1"
            formula={"\\neg (p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q)"}
            note={
              <>
                Negacija prolazi kroz zagradu i menja &ldquo;ili&rdquo; u
                &ldquo;i&rdquo;.
              </>
            }
          />
          <FormulaCard
            title="De Morgan 2"
            formula={"\\neg (p \\land q) \\Leftrightarrow (\\neg p) \\lor (\\neg q)"}
            note={
              <>
                Negacija prolazi kroz zagradu i menja &ldquo;i&rdquo; u
                &ldquo;ili&rdquo;.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta je tautologija">
            <p>
              Formula koja je tačna za svaku moguću raspodelu istinitosnih
              vrednosti. U praksi, to su univerzalno važeće logičke šeme.
            </p>
          </SectionCard>
          <SectionCard title="Šta je ekvivalencija">
            <p>
              Dve formule su ekvivalentne kada u svim redovima istinitosne tabele
              daju isti rezultat. Tada jednu možeš zameniti drugom bez gubitka
              značenja.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={
            'Proveri sebe: kako glasi negacija formule "p i q"?'
          }
          answer={
            <>
              <p>
                Ne glasi &ldquo;
                <InlineMath>{"\\neg p \\land \\neg q"}</InlineMath>&rdquo;.
                Pravilno je:
              </p>
              <MathBlock>
                {
                  "\\neg (p \\land q) \\Leftrightarrow (\\neg p) \\lor (\\neg q)"
                }
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ 6. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="6. Česte greške"
        title="Gde učenici najčešće gube kontrolu"
        description="Skoro svaka greška iz ove lekcije kasnije postaje mnogo skuplja. Ovde izgleda mala, a kasnije obara ceo zadatak."
      >
        <div className={s.tipGrid} style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje iskaza i otvorene rečenice
            </h3>
            <p>
              Izraz &ldquo;<InlineMath>{"x > 1"}</InlineMath>&rdquo; nije iskaz
              dok <InlineMath>{"x"}</InlineMath> nije određen. Ako to previdiš,
              ulaziš u analizu bez jasnog objekta.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno čitanje &ldquo;ili&rdquo;
            </h3>
            <p>
              U školskim logičkim formulama{" "}
              <InlineMath>{"p \\lor q"}</InlineMath> obično znači uključivo
              &ldquo;ili&rdquo;: dovoljan je bar jedan tačan deo.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Implikacija nije isto što i ekvivalencija
            </h3>
            <p>
              Iz <InlineMath>{"p \\Rightarrow q"}</InlineMath> ne sledi
              automatski <InlineMath>{"q \\Rightarrow p"}</InlineMath>. Zato
              jedan dozvoljen korak ne znači da možeš i nazad.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešna negacija složene formule
            </h3>
            <p>
              Učenici često napišu{" "}
              <InlineMath>
                {"\\neg(p \\lor q) = \\neg p \\lor \\neg q"}
              </InlineMath>
              , što je netačno. Operacija mora da se promeni.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="7. Veza sa prijemnim zadacima"
        title="Zašto logika direktno utiče na tačnost algebarskog rešenja"
        description={'Na prijemnom te retko pitaju "šta je implikacija" kao usamljenu teoriju. Ali stalno proveravaju da li umeš da čuvaš logičku korektnost dok rešavaš zadatak.'}
      >
        <div className={s.grid2}>
          <SectionCard title="Uslovi domena su logički spoj">
            <p>
              Ako u zadatku imaš dva korena, ne postavljaš uslove &ldquo;jedan
              po jedan pa šta bude&rdquo;, nego zajednički:
            </p>
            <MathBlock>
              {"x - 1 \\ge 0 \\land 5 - x \\ge 0"}
            </MathBlock>
            <p>
              Obe stvari moraju da važe istovremeno. To je konjunkcija.
            </p>
          </SectionCard>
          <SectionCard title="Svako kvadriranje nije ekvivalencija">
            <p>Iz jednačine</p>
            <MathBlock>{"\\sqrt{x - 1} = x - 3"}</MathBlock>
            <p>
              ne smeš odmah reći da je potpuno isto što i kvadrirana forma.
              Moraš prvo da osiguraš uslove:
            </p>
            <MathBlock>{"x - 1 \\ge 0 \\land x - 3 \\ge 0"}</MathBlock>
            <p>
              Bez toga često dobijaš lažna rešenja. To je upravo mesto gde
              logika i algebra rade zajedno.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni mentalni model">
          <p>
            Kada pišeš novi red rešenja, pitaj sebe: &ldquo;Da li sam dobio
            ekvivalenciju, ili samo posledicu?&rdquo; Ako nisi siguran, kasnije
            moraš proveriti dobijene kandidate.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 8. MINI VEŽBA ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="8. Mini vežba"
        title="Kratka provera razumevanja"
        description="Probaj prvo samostalno, pa tek onda otvori rešenje. Cilj nije brzina, nego tačno logičko čitanje."
      >
        <div className={s.exerciseGrid} style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <ExerciseCard
            title="Zadatak 1: Da li je ovo iskaz?"
            problem={
              <p>
                &ldquo;Ako sutra pada kiša, poneću kišobran.&rdquo;
              </p>
            }
            solution={
              <p>
                Da. To je iskazna rečenica oblika implikacije. Može biti tačna
                ili netačna, pa ima istinitosnu vrednost.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Negacija jednog iskaza"
            problem={
              <p>
                Ako je <InlineMath>{"p"}</InlineMath>: &ldquo;Broj{" "}
                <InlineMath>{"n"}</InlineMath> je paran&rdquo;, napiši negaciju.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"\\neg p"}</InlineMath>: &ldquo;Broj{" "}
                <InlineMath>{"n"}</InlineMath> nije paran.&rdquo;
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Kada je formula netačna?"
            problem={
              <p>
                Odredi kada je{" "}
                <InlineMath>{"p \\Rightarrow q"}</InlineMath> netačno.
              </p>
            }
            solution={
              <p>
                Samo kada je <InlineMath>{"p"}</InlineMath> tačno, a{" "}
                <InlineMath>{"q"}</InlineMath> netačno.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Primeni De Morgan"
            problem={
              <p>
                Preoblikuj{" "}
                <InlineMath>{"\\neg (p \\lor q)"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\neg (p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q)"
                }
              </MathBlock>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <InsightCard title="Glavni uvid lekcije">
        <p>
          Matematička logika nije dodatak matematici, nego njena kontrola
          kvaliteta.
        </p>
        <MathBlock>
          {
            "\\text{ispravno razmišljanje} = \\text{tačna formulacija} + \\text{tačan logički prelaz}"
          }
        </MathBlock>
        <p>
          Kada razlikuješ iskaz, implikaciju i ekvivalenciju, mnogo lakše vidiš
          da li je transformacija dozvoljena i da li dobijeno rešenje zaista
          pripada zadatku.
        </p>
      </InsightCard>

      {/* ═══════════ 9. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="9. Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ako sledećih šest stavki umeš da izgovoriš bez dvoumljenja, ova lekcija je uradila svoj posao."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <p>
              Iskaz je rečenica koja ima tačno jednu istinitosnu vrednost.
            </p>
          </article>
          <article className={s.summaryCard}>
            <p>
              Pitanje, naredba i otvorena rečenica bez određene promenljive nisu
              iskazi.
            </p>
          </article>
          <article className={s.summaryCard}>
            <p>
              Implikacija <InlineMath>{"p \\Rightarrow q"}</InlineMath> je
              netačna samo kada je <InlineMath>{"p"}</InlineMath> tačno, a{" "}
              <InlineMath>{"q"}</InlineMath> netačno.
            </p>
          </article>
          <article className={s.summaryCard}>
            <p>
              Ekvivalencija je jača od implikacije: traži istu istinitosnu
              vrednost u svim slučajevima.
            </p>
          </article>
          <article className={s.summaryCard}>
            <p>
              De Morganovi zakoni menjaju i negacije i operacije unutar zagrade.
            </p>
          </article>
          <article className={s.summaryCard}>
            <p>
              Na prijemnom logika čuva domenu, uslove i proveru dobijenih
              rešenja.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak posle ove lekcije je sistematsko uvežbavanje
          tautologija, ekvivalencija i primene logike na skupove, relacije i
          funkcije.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
