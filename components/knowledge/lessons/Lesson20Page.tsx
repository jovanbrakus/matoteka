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
import DiscriminantLab from "./DiscriminantLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto-vazna", label: "Zašto je važna" },
  { href: "#model", label: "Osnovni model" },
  { href: "#formula", label: "ABC formula" },
  { href: "#diskriminanta", label: "Diskriminanta" },
  { href: "#postupak", label: "Ispitni postupak" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#kljucne-formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson20Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 20"
        title={
          <>
            Kvadratne jednačine{" "}
            <span className={cs.tHeroAccent}>
              Diskriminanta i priroda rešenja
            </span>
          </>
        }
        description="Na prijemnom nije dovoljno da samo mehanički ubaciš brojeve u formulu. Važno je da odmah vidiš šta jednačina „obećava“: da li će parabola seći x-osu u dve tačke, samo dodirnuti osu ili uopšte neće imati realne preseke. Diskriminanta je upravo taj brzi odgovor, a ova lekcija je tu da poveže račun, geometriju i tipične ispitne zamke u jednu jasnu sliku."
        heroImageSrc="/api/lessons/20/hero"
        heroImageAlt="Ilustracija za lekciju o kvadratnim jednačinama i diskriminanti"
        cards={[
          {
            label: "Šta učiš",
            description:
              "Kako da prepoznaš kvadratnu jednačinu, primeniš abc formulu i iz diskriminante pročitaš broj i tip korena.",
          },
          {
            label: "Najveća zamka",
            description:
              "Pogrešno čitanje koeficijenata kada jednačina nije sređena na oblik ax² + bx + c = 0.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Kada je dovoljno analizirati Δ, a kada moraš računati i same korene ili diskutovati parametar.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "45 do 60 minuta sa primerima i vežbom.",
          },
          {
            label: "Predznanje",
            description:
              "Kvadratna funkcija, rad sa formulama i osnova kompleksnih brojeva.",
          },
          {
            label: "Glavna veština",
            description:
              "Brza procena prirode rešenja bez lutanja i bez suvišnog računa.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija koja povezuje Δ, parabolu i korene.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto-vazna"
        eyebrow="Zašto je ova lekcija važna"
        title="Diskriminanta ti štedi vreme i greške"
        description="Kvadratne jednačine su centralna tema skoro svakog prijemnog ispita. Pojavljuju se direktno, ali i kao skriveni korak u eksponencijalnim, logaritamskim, trigonometrijskim i parametarskim zadacima. U svim tim situacijama diskriminanta daje prvi ozbiljan uvid u problem."
      >
        <div className={s.grid3}>
          <SectionCard title="Pre nego što računaš, znaš šta očekuješ">
            <p>
              Ako odmah izračunaš <InlineMath>{"\\Delta"}</InlineMath>, znaš da
              li tražiš dva realna korena, jedan dvostruki koren ili da li u
              realnim brojevima nema rešenja.
            </p>
          </SectionCard>
          <SectionCard title="Ista priča kao kod parabole">
            <p>
              Broj realnih korena jednak je broju preseka parabole{" "}
              <InlineMath>{"y=ax^2+bx+c"}</InlineMath> sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom. Zato je diskriminanta most
              između algebre i slike.
            </p>
          </SectionCard>
          <SectionCard title="Tipičan alat u parametrima">
            <p>
              Često se traži da jednačina ima dva realna korena, jedno rešenje
              ili da nema realna rešenja. Tada je uslov upravo na znaku
              diskriminante.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNI MODEL ═══════════ */}
      <LessonSection
        id="model"
        eyebrow="Osnovni model"
        title="Šta je kvadratna jednačina"
        description="Kvadratna jednačina je algebarska jednačina drugog stepena po nepoznatoj x. Najvažnije je da je pre računanja središ na standardni oblik."
      >
        <div className={s.grid2}>
          <SectionCard title="Standardni oblik">
            <MathBlock>{"ax^2 + bx + c = 0,\\qquad a \\neq 0"}</MathBlock>
            <p>
              Brojevi <InlineMath>{"a"}</InlineMath>,{" "}
              <InlineMath>{"b"}</InlineMath> i <InlineMath>{"c"}</InlineMath> su
              koeficijenti. Uslov <InlineMath>{"a \\neq 0"}</InlineMath> je
              presudan: ako bi bilo <InlineMath>{"a=0"}</InlineMath>,
              jednačina više ne bi bila kvadratna nego linearna.
            </p>
          </SectionCard>
          <SectionCard title="Šta zapravo tražimo">
            <p>
              Tražimo vrednosti promenljive <InlineMath>{"x"}</InlineMath> za
              koje je izraz <InlineMath>{"ax^2+bx+c"}</InlineMath> jednak nuli.
              Geometrijski, to su upravo{" "}
              <InlineMath>{"x"}</InlineMath>-koordinate preseka parabole sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
            <MathBlock>{"y = ax^2 + bx + c"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Već sređena jednačina">
            <p>
              <InlineMath>{"2x^2 - 3x - 5 = 0"}</InlineMath> je odmah u
              standardnom obliku, pa čitamo{" "}
              <InlineMath>{"a=2"}</InlineMath>,{" "}
              <InlineMath>{"b=-3"}</InlineMath>,{" "}
              <InlineMath>{"c=-5"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Jednačina koju prvo sređujemo">
            <p>
              Iz <InlineMath>{"7 - 5x = -2x^2"}</InlineMath> prvo dobijamo{" "}
              <InlineMath>{"2x^2 - 5x + 7 = 0"}</InlineMath>, pa tek onda
              čitamo koeficijente.
            </p>
          </SectionCard>
          <SectionCard title="Šta nije kvadratna jednačina">
            <p>
              <InlineMath>{"0\\cdot x^2 + 4x - 1 = 0"}</InlineMath> nije
              kvadratna jednačina, jer je zapravo{" "}
              <InlineMath>{"4x - 1 = 0"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Koeficijenti u jednačini 3 - 4x + 2x² = 0"
          answer={
            <p>
              Jednačina jeste kvadratna, ali nije zapisana u standardnom
              redosledu. Prepiši je kao{" "}
              <InlineMath>{"2x^2 - 4x + 3 = 0"}</InlineMath>, pa dobijaš{" "}
              <InlineMath>{"a=2"}</InlineMath>,{" "}
              <InlineMath>{"b=-4"}</InlineMath>,{" "}
              <InlineMath>{"c=3"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ABC FORMULA ═══════════ */}
      <LessonSection
        id="formula"
        eyebrow="ABC formula"
        title="Kako dolazimo do korena kvadratne jednačine"
        description="Najpoznatiji alat je abc formula. Nju ne treba tretirati kao magiju: ona samo sistematski rešava svaku kvadratnu jednačinu kada su koeficijenti poznati."
      >
        <SectionCard title="Opšta formula za korene">
          <MathBlock>
            {"x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"}
          </MathBlock>
          <p>
            Pod korenom se nalazi izraz{" "}
            <InlineMath>{"b^2 - 4ac"}</InlineMath>. Upravo taj izraz nazivamo
            diskriminantom i on odlučuje kakva će rešenja ispasti kada
            pokušamo da izračunamo korene.
          </p>
        </SectionCard>

        <div className={s.walkthrough} style={{ marginTop: 16 }}>
          <WalkStep number={1} title="Sredi jednačinu">
            <p>
              Prebaci sve na jednu stranu i napiši jednačinu kao{" "}
              <InlineMath>{"ax^2+bx+c=0"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Pročitaj koeficijente">
            <p>
              Posebno pazi na znak uz <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"c"}</InlineMath>. Tu se greši više nego u samom
              računu.
            </p>
          </WalkStep>
          <WalkStep
            number={3}
            title={
              <>
                Izračunaj <InlineMath>{"\\Delta"}</InlineMath>
              </>
            }
          >
            <p>
              Prvo diskutuješ diskriminantu, pa tek onda iz nje izvodiš
              posledice po rešenja.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Upiši u formulu">
            <p>
              Kada znaš znak diskriminante, mnogo sigurnije i smislenije
              koristiš abc formulu.
            </p>
          </WalkStep>
        </div>

        <SectionCard title="Primer bez preskakanja koraka">
          <p>
            Rešimo jednačinu{" "}
            <InlineMath>{"x^2 - 5x + 6 = 0"}</InlineMath>.
          </p>
          <MathBlock>{"a = 1,\\qquad b = -5,\\qquad c = 6"}</MathBlock>
          <MathBlock>
            {
              "\\Delta = b^2 - 4ac = (-5)^2 - 4\\cdot 1 \\cdot 6 = 25 - 24 = 1"
            }
          </MathBlock>
          <MathBlock>
            {
              "x_{1,2} = \\frac{-(-5)\\pm\\sqrt{1}}{2\\cdot 1} = \\frac{5\\pm1}{2}"
            }
          </MathBlock>
          <MathBlock>{"x_1 = 2,\\qquad x_2 = 3"}</MathBlock>
          <p>
            Ovde je <InlineMath>{"\\Delta>0"}</InlineMath>, pa nije iznenađenje
            što dobijamo dva različita realna korena.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: Zašto je u jednačini x²+4x+4=0 koeficijent b=4, a ne -4?"
          answer={
            <p>
              Zato što se u standardnom obliku član uz{" "}
              <InlineMath>{"x"}</InlineMath> piše kao{" "}
              <InlineMath>{"bx"}</InlineMath>. Ovde je zaista{" "}
              <InlineMath>{"+4x"}</InlineMath>, pa je{" "}
              <InlineMath>{"b=4"}</InlineMath>. Negativan{" "}
              <InlineMath>{"b"}</InlineMath> bismo imali kada bi stajalo{" "}
              <InlineMath>{"-4x"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DISKRIMINANTA ═══════════ */}
      <LessonSection
        id="diskriminanta"
        eyebrow="Diskriminanta"
        title="Iz jednog broja čitaš prirodu rešenja"
        description="Diskriminanta govori da li broj pod korenom u abc formuli daje pozitivan, nulti ili negativan rezultat. Od toga zavisi cela priča o rešenjima."
      >
        <SectionCard title="Diskriminanta kvadratne jednačine">
          <MathBlock>{"\\Delta = b^2 - 4ac"}</MathBlock>
          <p>
            Kada je <InlineMath>{"\\Delta"}</InlineMath> poznata, ne moraš
            odmah da izračunavaš korene da bi znao šta se dešava. Zato
            diskriminanta često dolazi pre celog računa, naročito u zadacima sa
            parametrima.
          </p>
        </SectionCard>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Δ > 0"
            formula={"x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}"}
            note={
              <>
                Pod korenom je pozitivan broj, pa postoje dva različita realna
                korena. Parabola seče <InlineMath>{"x"}</InlineMath>-osu u dve
                tačke.
              </>
            }
          />
          <FormulaCard
            title="Δ = 0"
            formula={"x_1 = x_2 = -\\frac{b}{2a}"}
            note="Dobijamo jedan dvostruki koren. Parabola dodiruje x-osu."
          />
          <FormulaCard
            title="Δ < 0"
            formula={"x_{1,2} = \\frac{-b \\pm i\\sqrt{-\\Delta}}{2a}"}
            note="Nad skupom realnih brojeva nema rešenja. Nad kompleksnim brojevima dobijamo konjugovano kompleksne korene."
          />
        </div>

        <SectionCard title="Diskriminanta i parabola govore isto">
          <MathBlock>{"y = ax^2 + bx + c"}</MathBlock>
          <p>
            Ako parabola seče <InlineMath>{"x"}</InlineMath>-osu u dve tačke,
            imaš dva realna korena i{" "}
            <InlineMath>{"\\Delta>0"}</InlineMath>. Ako samo dodiruje osu, onda
            je <InlineMath>{"\\Delta=0"}</InlineMath>. Ako je cela iznad ili
            ispod ose bez preseka, onda je{" "}
            <InlineMath>{"\\Delta<0"}</InlineMath> i realnih korena nema.
          </p>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: Šta tačno znači Δ<0?"
          answer={
            <p>
              To ne znači da jednačina „nema nikakvo rešenje“. Precizno: nema
              realna rešenja. Ako radiš u kompleksnim brojevima, dobijaš dva
              konjugovano kompleksna korena.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ISPITNI POSTUPAK ═══════════ */}
      <LessonSection
        id="postupak"
        eyebrow="Ispitni postupak"
        title="Kako razmišljaš pod pritiskom na prijemnom"
        description="Kada je vreme ograničeno, cilj nije da „juriš formulu“, nego da vodiš uredan i kratak postupak koji smanjuje broj grešaka."
      >
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Napiši standardni oblik">
            <p>
              Bez toga nema pouzdanog čitanja{" "}
              <InlineMath>{"a"}</InlineMath>, <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"c"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep
            number={2}
            title={
              <>
                Odmah izračunaj <InlineMath>{"\\Delta"}</InlineMath>
              </>
            }
          >
            <p>
              Često je već taj korak dovoljan da rešiš pitanje iz zadatka.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Pročitaj šta zadatak tačno traži">
            <p>
              Nekad traži prirodu rešenja, nekad korene, a nekad uslov na
              parametar.
            </p>
          </WalkStep>
          <WalkStep
            number={4}
            title={
              <>
                Razlikuj <InlineMath>{"\\mathbb{R}"}</InlineMath> i{" "}
                <InlineMath>{"\\mathbb{C}"}</InlineMath>
              </>
            }
          >
            <p>
              Ako nije drugačije naglašeno, na prijemnom se najčešće misli na
              realna rešenja.
            </p>
          </WalkStep>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorija diskriminante"
        description="Menjaj koeficijente i prati kako se parabola pomera u odnosu na x-osu. Cilj je da počneš da „vidiš“ diskriminantu i pre nego što je izračunaš."
      >
        <DiscriminantLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Prvo promeni jedan koeficijent i pokušaj da sam pogodiš šta će se
            desiti sa parabolom i diskriminantom, pa tek onda pogledaj grafik.
            Ako počneš da &ldquo;vidiš&rdquo; tri slučaja pre nego što računaš,
            cilj je ispunjen.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od lakšeg ka prijemnom tipu zadataka"
        description="Primeri su raspoređeni tako da prvo učvrstiš osnovni algoritam, a zatim vidiš kako diskriminanta radi u parametarskim pitanjima."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Dva različita realna korena
            </h3>
            <p>
              Reši <InlineMath>{"x^2 - 7x + 10 = 0"}</InlineMath>.
            </p>
            <ol>
              <li>
                Čitamo <InlineMath>{"a=1"}</InlineMath>,{" "}
                <InlineMath>{"b=-7"}</InlineMath>,{" "}
                <InlineMath>{"c=10"}</InlineMath>.
              </li>
              <li>
                Računamo{" "}
                <InlineMath>
                  {"\\Delta = (-7)^2 - 4\\cdot 1\\cdot 10 = 49 - 40 = 9"}
                </InlineMath>
                .
              </li>
              <li>
                Pošto je <InlineMath>{"\\Delta>0"}</InlineMath>, postoje dva
                različita realna korena.
              </li>
              <li>
                <MathBlock>{"x_{1,2}=\\frac{7\\pm3}{2}"}</MathBlock>
                pa je <InlineMath>{"x_1=2"}</InlineMath>,{" "}
                <InlineMath>{"x_2=5"}</InlineMath>.
              </li>
            </ol>
            <p>
              <em>
                Tumačenje: parabola seče <InlineMath>{"x"}</InlineMath>-osu u
                dve tačke, na <InlineMath>{"x=2"}</InlineMath> i{" "}
                <InlineMath>{"x=5"}</InlineMath>.
              </em>
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Jedan dvostruki koren
            </h3>
            <p>
              Reši <InlineMath>{"4x^2 - 4x + 1 = 0"}</InlineMath>.
            </p>
            <ol>
              <li>
                <InlineMath>{"a=4"}</InlineMath>,{" "}
                <InlineMath>{"b=-4"}</InlineMath>,{" "}
                <InlineMath>{"c=1"}</InlineMath>.
              </li>
              <li>
                <MathBlock>
                  {"\\Delta = (-4)^2 - 4\\cdot 4\\cdot 1 = 16 - 16 = 0"}
                </MathBlock>
              </li>
              <li>
                Kada je <InlineMath>{"\\Delta=0"}</InlineMath>, koreni su
                jednaki.
              </li>
              <li>
                <MathBlock>
                  {"x = -\\frac{b}{2a} = \\frac{4}{8} = \\frac{1}{2}"}
                </MathBlock>
              </li>
            </ol>
            <p>
              <em>
                Tumačenje: jednakoren{" "}
                <InlineMath>{"x=\\tfrac{1}{2}"}</InlineMath>, ali dvostruke
                višestrukosti.
              </em>
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Kompleksni koreni</h3>
            <p>
              Reši nad <InlineMath>{"\\mathbb{C}"}</InlineMath> jednačinu{" "}
              <InlineMath>{"2x^2 + 4x + 5 = 0"}</InlineMath>.
            </p>
            <ol>
              <li>
                <InlineMath>{"a=2"}</InlineMath>,{" "}
                <InlineMath>{"b=4"}</InlineMath>,{" "}
                <InlineMath>{"c=5"}</InlineMath>.
              </li>
              <li>
                <MathBlock>
                  {
                    "\\Delta = 4^2 - 4\\cdot 2\\cdot 5 = 16 - 40 = -24"
                  }
                </MathBlock>
              </li>
              <li>
                Nad <InlineMath>{"\\mathbb{R}"}</InlineMath> nema rešenja, ali
                nad <InlineMath>{"\\mathbb{C}"}</InlineMath> postoje dva
                konjugovano kompleksna korena.
              </li>
              <li>
                <MathBlock>
                  {
                    "x_{1,2}=\\frac{-4\\pm\\sqrt{-24}}{4}=\\frac{-4\\pm 2i\\sqrt{6}}{4}= -1 \\pm \\frac{\\sqrt{6}}{2}i"
                  }
                </MathBlock>
              </li>
            </ol>
            <p>
              <em>
                Tumačenje: parabola ne seče{" "}
                <InlineMath>{"x"}</InlineMath>-osu, ali algebra nad{" "}
                <InlineMath>{"\\mathbb{C}"}</InlineMath> i dalje daje dva
                korena.
              </em>
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Parametar i priroda rešenja
            </h3>
            <p>
              Za koje vrednosti parametra <InlineMath>{"p"}</InlineMath>{" "}
              jednačina <InlineMath>{"x^2 - 2x + p = 0"}</InlineMath> ima dva
              različita realna rešenja?
            </p>
            <ol>
              <li>
                Ovde je <InlineMath>{"a=1"}</InlineMath>,{" "}
                <InlineMath>{"b=-2"}</InlineMath>,{" "}
                <InlineMath>{"c=p"}</InlineMath>.
              </li>
              <li>
                <MathBlock>
                  {"\\Delta = (-2)^2 - 4\\cdot 1\\cdot p = 4 - 4p"}
                </MathBlock>
              </li>
              <li>
                Traže se dva različita realna rešenja, pa mora važiti{" "}
                <InlineMath>{"\\Delta>0"}</InlineMath>.
              </li>
              <li>
                <MathBlock>
                  {"4 - 4p > 0 \\iff 1-p > 0 \\iff p < 1"}
                </MathBlock>
              </li>
            </ol>
            <p>
              <em>
                Zaključak: za svako <InlineMath>{"p<1"}</InlineMath> jednačina
                ima dva različita realna korena.
              </em>
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="kljucne-formule"
        eyebrow="Ključne formule"
        title="Šta moraš imati u glavi"
        description="Ove formule nisu odvojene. Čitaj ih kao jedan lanac: standardni oblik → diskriminanta → priroda rešenja → sami koreni."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Standardni oblik"
            formula={"ax^2+bx+c=0,\\qquad a\\neq0"}
            note="Bez standardnog oblika nema sigurnog čitanja koeficijenata."
          />
          <FormulaCard
            title="Diskriminanta"
            formula={"\\Delta=b^2-4ac"}
            note="Ovo je prvo što računaš kada zadatak pita za prirodu rešenja ili uslov na parametar."
          />
          <FormulaCard
            title="ABC formula"
            formula={"x_{1,2}=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}"}
            note="Kada je Δ=0, formula se svodi na jedan dvostruki koren."
          />
        </div>
        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Δ > 0"
            formula={"\\text{Dva razli\\v{c}ita realna korena}"}
            note="Dva preseka parabole sa x-osom."
          />
          <FormulaCard
            title="Δ = 0"
            formula={"\\text{Jedan dvostruki koren}"}
            note="Parabola dodiruje osu u temenu."
          />
          <FormulaCard
            title="Δ < 0"
            formula={"\\text{Nema realnih korena}"}
            note="Nad C postoje konjugovano kompleksni koreni."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje obaraju poene"
        description="Ovo nisu opšti saveti, nego konkretne greške koje se stalno ponavljaju u zadacima sa kvadratnim jednačinama."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Nije sređena jednačina</h3>
            <p>
              Učenik odmah uzme <InlineMath>{"a"}</InlineMath>,{" "}
              <InlineMath>{"b"}</InlineMath>, <InlineMath>{"c"}</InlineMath> iz
              oblika koji nije standardni, pa ceo račun ode u pogrešnom smeru.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešan znak uz <InlineMath>{"b"}</InlineMath>
            </h3>
            <p>
              U jednačini <InlineMath>{"x^2-6x+5=0"}</InlineMath> koeficijent
              je <InlineMath>{"b=-6"}</InlineMath>, ne{" "}
              <InlineMath>{"6"}</InlineMath>. Ova sitnica menja i{" "}
              <InlineMath>{"\\Delta"}</InlineMath> i korene.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              <InlineMath>{"\\Delta=0"}</InlineMath> se tumači kao &ldquo;nema
              rešenja&rdquo;
            </h3>
            <p>
              Naprotiv, tada postoji jedan realan koren, ali dvostruki. Na
              grafiku parabola dodiruje osu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Brka se <InlineMath>{"\\mathbb{R}"}</InlineMath> i{" "}
              <InlineMath>{"\\mathbb{C}"}</InlineMath>
            </h3>
            <p>
              Kod <InlineMath>{"\\Delta<0"}</InlineMath> treba precizno reći:
              nema realnih rešenja, ali nad kompleksnim brojevima koreni
              postoje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Računa se sve, i kada ne treba
            </h3>
            <p>
              Ako zadatak traži samo prirodu rešenja, dovoljno je analizirati
              diskriminantu. Nema potrebe za potpunim računanjem korena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Preskače se formulacija zadatka
            </h3>
            <p>
              Kod parametara nije isto da li zadatak traži &ldquo;dva
              realna&rdquo;, &ldquo;jednaka&rdquo;, &ldquo;realna i
              različita&rdquo; ili &ldquo;nema realnih rešenja&rdquo;.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema javlja na ispitu"
        description="Na prijemnom kvadratna jednačina retko stoji sama. Često je deo većeg zadatka, ali način razmišljanja ostaje isti."
      >
        <div className={s.grid2}>
          <SectionCard title="Direktno rešavanje jednačine">
            <p>
              Klasičan zadatak proverava brzinu i tačnost: standardni oblik,{" "}
              <InlineMath>{"\\Delta"}</InlineMath>, abc formula i uredno
              izvedeni koreni.
            </p>
            <ul>
              <li>
                Najčešća zamka: pogrešan znak uz{" "}
                <InlineMath>{"b"}</InlineMath>.
              </li>
              <li>
                Šta proveri: da li je traženo nad{" "}
                <InlineMath>{"\\mathbb{R}"}</InlineMath> ili nad{" "}
                <InlineMath>{"\\mathbb{C}"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Parametar i priroda rešenja">
            <p>
              Ovde se gotovo uvek radi uslov na diskriminantu.
            </p>
            <ul>
              <li>
                Dva različita realna:{" "}
                <InlineMath>{"\\Delta>0"}</InlineMath>
              </li>
              <li>
                Jednak koren: <InlineMath>{"\\Delta=0"}</InlineMath>
              </li>
              <li>
                Nema realnih: <InlineMath>{"\\Delta<0"}</InlineMath>
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Skrivena kvadratna jednačina">
            <p>
              Posle supstitucije u eksponencijalnom ili trigonometrijskom
              zadatku često dobiješ kvadratnu jednačinu u novoj promenljivoj.
            </p>
            <ul>
              <li>
                Najčešća zamka: zaboravljanje uslova na novu promenljivu.
              </li>
              <li>
                Šta proveri: da li je svako dobijeno rešenje dozvoljeno u
                originalnom zadatku.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Šta obavezno proveri">
            <ul>
              <li>
                Da li je jednačina sređena na{" "}
                <InlineMath>{"ax^2+bx+c=0"}</InlineMath>.
              </li>
              <li>
                Da li je <InlineMath>{"a\\neq0"}</InlineMath>.
              </li>
              <li>Koji je tačan znak diskriminante.</li>
              <li>
                Da li zadatak traži korene ili samo prirodu rešenja.
              </li>
              <li>
                Da li radiš u <InlineMath>{"\\mathbb{R}"}</InlineMath> ili u{" "}
                <InlineMath>{"\\mathbb{C}"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Zadaci za samostalni rad"
        description="Pokušaj da svaki zadatak najpre rešiš bez gledanja, a onda proveriš ne samo rezultat nego i logiku postupka."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Reši jednačinu"
            problem={
              <MathBlock>{"x^2 - 8x + 15 = 0"}</MathBlock>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"a=1"}</InlineMath>,{" "}
                  <InlineMath>{"b=-8"}</InlineMath>,{" "}
                  <InlineMath>{"c=15"}</InlineMath>.{" "}
                  <InlineMath>{"\\Delta=64-60=4"}</InlineMath>. Zato su
                </p>
                <MathBlock>{"x_{1,2}=\\frac{8\\pm2}{2}"}</MathBlock>
                <p>
                  pa je <InlineMath>{"x_1=3"}</InlineMath>,{" "}
                  <InlineMath>{"x_2=5"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Odredi prirodu rešenja"
            problem={
              <MathBlock>{"9x^2 + 12x + 4 = 0"}</MathBlock>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\Delta = 12^2 - 4\\cdot 9\\cdot 4 = 144 - 144 = 0"
                  }
                </MathBlock>
                <p>
                  Jednačina ima jedan dvostruki realan koren. Ako ga računaš,
                  dobijaš
                </p>
                <MathBlock>{"x=-\\frac{12}{18}=-\\frac{2}{3}"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Radi nad C"
            problem={
              <MathBlock>{"x^2 + 2x + 10 = 0"}</MathBlock>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\Delta = 2^2 - 4\\cdot 1\\cdot 10 = 4 - 40 = -36"
                  }
                </MathBlock>
                <p>
                  Nad <InlineMath>{"\\mathbb{R}"}</InlineMath> nema rešenja, a
                  nad <InlineMath>{"\\mathbb{C}"}</InlineMath>:
                </p>
                <MathBlock>
                  {"x_{1,2}=\\frac{-2\\pm 6i}{2}=-1\\pm 3i"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Parametar za jednake korene"
            problem={
              <>
                <MathBlock>{"x^2 + (m-1)x + 4 = 0"}</MathBlock>
                <p>
                  Za koje <InlineMath>{"m"}</InlineMath> jednačina ima jednak
                  koren?
                </p>
              </>
            }
            solution={
              <>
                <p>
                  Za jednake korene treba{" "}
                  <InlineMath>{"\\Delta=0"}</InlineMath>:
                </p>
                <MathBlock>{"(m-1)^2 - 16 = 0"}</MathBlock>
                <MathBlock>{"(m-1)^2 = 16"}</MathBlock>
                <MathBlock>{"m-1=\\pm 4"}</MathBlock>
                <MathBlock>
                  {"m=5 \\quad \\text{ili} \\quad m=-3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5: Dva različita realna rešenja"
            problem={
              <>
                <MathBlock>{"x^2 + px + 9 = 0"}</MathBlock>
                <p>
                  Za koje <InlineMath>{"p"}</InlineMath> jednačina ima dva
                  različita realna korena?
                </p>
              </>
            }
            solution={
              <>
                <p>
                  Potrebno je <InlineMath>{"\\Delta>0"}</InlineMath>:
                </p>
                <MathBlock>{"p^2 - 36 > 0"}</MathBlock>
                <MathBlock>{"p^2 > 36"}</MathBlock>
                <MathBlock>
                  {"p<-6 \\quad \\text{ili} \\quad p>6"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6: Prepoznaj skriveni standardni oblik"
            problem={
              <>
                <MathBlock>{"5 - 6x = -x^2"}</MathBlock>
                <p>Reši jednačinu.</p>
              </>
            }
            solution={
              <>
                <p>Prvo sređujemo:</p>
                <MathBlock>{"x^2 - 6x + 5 = 0"}</MathBlock>
                <p>
                  Sada je <InlineMath>{"a=1"}</InlineMath>,{" "}
                  <InlineMath>{"b=-6"}</InlineMath>,{" "}
                  <InlineMath>{"c=5"}</InlineMath>. Diskriminanta je
                </p>
                <MathBlock>{"\\Delta = 36 - 20 = 16"}</MathBlock>
                <p>Dakle,</p>
                <MathBlock>{"x_{1,2}=\\frac{6\\pm4}{2}"}</MathBlock>
                <p>
                  pa su rešenja <InlineMath>{"x_1=1"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=5"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka"
        title="Diskriminanta nije dodatak formuli, nego prvi odgovor na pitanje o korenima"
        description="Kada vidiš kvadratnu jednačinu, razmišljaj ovim redom: standardni oblik, koeficijenti, diskriminanta, priroda rešenja, pa tek onda sami koreni. Tako tvoj postupak postaje kratak, pregledan i otporan na greške."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {"\\Delta = b^2 - 4ac \\text{ odre\\dj{}uje pri\\v{c}u o korenima}"}
          </MathBlock>
          <p>
            Ko nauči ovaj redosled, rešava zadatke brzo i bez nepotrebnih
            koraka: sredi jednačinu, izračunaj diskriminantu, protumači
            rešenja.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako umeš sledeće stvari bez zastajkivanja, lekcija je odradila posao i spreman si za sledeći korak, a to su Viètove formule i primene."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Standardni oblik je početak</h3>
            <p>
              Jednačina mora biti u obliku{" "}
              <InlineMath>{"ax^2+bx+c=0"}</InlineMath>, uz{" "}
              <InlineMath>{"a\\neq0"}</InlineMath>. To je osnova za svaki
              naredni korak.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Diskriminanta daje prirodu rešenja
            </h3>
            <p>
              <InlineMath>{"\\Delta>0"}</InlineMath>: dva realna korena.{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>: jedan dvostruki.{" "}
              <InlineMath>{"\\Delta<0"}</InlineMath>: nema realnih, ali postoje
              kompleksni.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Grafik i algebra su ista priča
            </h3>
            <p>
              Broj realnih korena jednak je broju preseka parabole sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom. To je najjača intuicija za
              ovu temu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 20 zatvara osnove kvadratnih jednačina. Sledeći korak su
          Viètove formule i primene veza između korena i koeficijenata.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
