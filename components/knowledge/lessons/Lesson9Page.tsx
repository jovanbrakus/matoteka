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
import ComplexPlaneLab from "./ComplexPlaneLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnove i zapis" },
  { href: "#gauss", label: "Gaussova ravan" },
  { href: "#operacije", label: "Operacije" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson9Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 9"
        title={
          <>
            Kompleksni brojevi{" "}
            <span className={cs.tHeroAccent}>bez magle</span>
          </>
        }
        description="Kompleksan broj nije nekakav dodatak matematici, već uredan način da rešimo jednačine poput x² + 1 = 0, jasno računamo sa izrazima a + bi i sigurnije prolazimo kroz zadatke sa ETF-a i FON-a. Cilj ove lekcije je da svaki račun svedeš na prepoznatljiv oblik i da odmah vidiš gde je realni, a gde imaginarni deo."
        heroImageSrc="/images/lessons/lesson9_hero.png"
        heroImageAlt="Ilustracija za lekciju o kompleksnim brojevima"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako se čita i računa broj a + bi — sabiranje, oduzimanje, množenje, deljenje, konjugovanje i modul bez preskakanja koraka.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje pravila za i, |z| i realni deo — najviše grešaka nastaje kada se ne razdvoje realni i imaginarni članovi ili kada se zaboravi da je i² = -1.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo sređivanje u oblik a + bi — tipični zadaci traže iⁿ, deljenje preko konjugovanog broja ili uslov da rezultat bude realan ili čisto imaginaran.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "55 do 70 minuta uz interaktivni deo i vežbe.",
          },
          {
            label: "Predznanje",
            description:
              "Razlomci, kvadrat binoma, uređeni parovi i Pitagorina teorema.",
          },
          {
            label: "Glavna veština",
            description:
              "Svaki izraz uredno svesti na oblik a + bi i protumačiti rezultat.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorijum: dva kompleksna broja, operacije, konjugat, modul i iⁿ.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Bez kompleksnih brojeva neke jednačine staju"
        description="U srednjoškolskoj algebri navikneš da svaka operacija vodi ka nekom realnom broju. Ovde prvi put vidiš da je prostor rešenja potrebno proširiti, ali i da to proširenje ostaje strogo uređeno."
      >
        <div className={s.grid3}>
          <SectionCard title="Kada realni brojevi nisu dovoljni">
            <p>
              Jednačina <InlineMath>{"x^2 + 1 = 0"}</InlineMath> nema rešenje u
              skupu realnih brojeva, jer ne postoji realan broj čiji je kvadrat{" "}
              <InlineMath>{"-1"}</InlineMath>.
            </p>
            <MathBlock>{"x^2 = -1 \\quad \\Longrightarrow \\quad x = \\pm i"}</MathBlock>
            <p>
              To je glavni motiv za uvođenje imaginarne jedinice{" "}
              <InlineMath>{"i"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Veza sa geometrijom">
            <p>
              Broj <InlineMath>{"a + bi"}</InlineMath> možeš istovremeno gledati
              kao zapis i kao tačku <InlineMath>{"(a, b)"}</InlineMath> u ravni.
              Zbog toga postaje lakše da razumeš konjugat, modul i položaj broja.
            </p>
          </SectionCard>
          <SectionCard title="Brzi bodovi na prijemnom">
            <p>
              Veliki broj zadataka svodi se na tri kratka principa: pravilno
              sređivanje <InlineMath>{"i^2"}</InlineMath>, deljenje preko
              konjugovanog i uslov da je imaginarni deo jednak nuli.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVE I ZAPIS ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnove i zapis"
        title="Od imaginarne jedinice do oblika a + bi"
        description="Prvi korak nije da naučiš napamet formulu, nego da tačno razumeš šta simbol i radi i kako se deli posao između realnog i imaginarnog dela."
      >
        <div className={s.grid2}>
          <SectionCard title="Imaginarna jedinica">
            <p>
              Definišemo simbol <InlineMath>{"i"}</InlineMath> tako da važi:
            </p>
            <MathBlock>{"i^2 = -1"}</MathBlock>
            <p>Odavde odmah dobijamo ciklus:</p>
            <MathBlock>
              {"i^1 = i,\\quad i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1"}
            </MathBlock>
            <p>Posle četvrtog stepena obrazac se ponavlja.</p>
            <MicroCheck
              question="Mikro-provera: Koliko je i⁶?"
              answer={
                <p>
                  <InlineMath>{"6 \\equiv 2 \\pmod 4"}</InlineMath>, pa važi{" "}
                  <InlineMath>{"i^6 = i^2 = -1"}</InlineMath>.
                </p>
              }
            />
          </SectionCard>

          <SectionCard title="Algebarski oblik kompleksnog broja">
            <p>Svaki kompleksan broj pišemo kao:</p>
            <MathBlock>{"z = a + bi,\\qquad a,b \\in \\mathbb{R}"}</MathBlock>
            <p>
              Broj <InlineMath>{"a"}</InlineMath> je realni deo, a broj{" "}
              <InlineMath>{"b"}</InlineMath> je imaginarni deo broja{" "}
              <InlineMath>{"z"}</InlineMath>:
            </p>
            <MathBlock>
              {"\\operatorname{Re}(z) = a,\\qquad \\operatorname{Im}(z) = b"}
            </MathBlock>
            <p>
              Napomena: imaginarni deo je broj <InlineMath>{"b"}</InlineMath>, a
              ne ceo član <InlineMath>{"bi"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Kada su dva kompleksna broja jednaka">
            <p>Jednakost se proverava odvojeno po komponentama.</p>
            <MathBlock>
              {"a + bi = c + di \\iff a = c \\text{ i } b = d"}
            </MathBlock>
            <p>
              Zato se u zadacima sa parametrima uglavnom dobija sistem od dve
              jednačine.
            </p>
          </SectionCard>
          <SectionCard title="Posebni slučajevi">
            <ul>
              <li>
                <InlineMath>{"z"}</InlineMath> je realan ako je{" "}
                <InlineMath>{"b = 0"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"z"}</InlineMath> je čisto imaginaran ako je{" "}
                <InlineMath>{"a = 0"}</InlineMath> i{" "}
                <InlineMath>{"b \\neq 0"}</InlineMath>.
              </li>
              <li>
                Nula je <InlineMath>{"0 + 0i"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Najkorisnija mentalna slika">
            <p>
              Na broj <InlineMath>{"a + bi"}</InlineMath> gledaj kao na paket sa
              dve koordinate. Realni deo govori koliko ideš po osi{" "}
              <InlineMath>{"x"}</InlineMath>, a imaginarni koliko po osi{" "}
              <InlineMath>{"y"}</InlineMath>.
            </p>
            <MicroCheck
              question="Mikro-provera: Da li je broj 5 kompleksan?"
              answer={
                <p>
                  Da. Svaki realan broj je i kompleksan broj, jer{" "}
                  <InlineMath>{"5 = 5 + 0i"}</InlineMath>.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ GAUSSOVA RAVAN ═══════════ */}
      <LessonSection
        id="gauss"
        eyebrow="Geometrijska slika"
        title="Gaussova ravan, konjugat i modul"
        description="Kada broj nacrtaš kao tačku (a, b), nekoliko pojmova postaje gotovo očigledno: konjugat je preslikavanje preko horizontalne ose, a modul je udaljenost od koordinatnog početka."
      >
        <div className={s.grid3}>
          <SectionCard title="Tačka u ravni">
            <p>
              Broju <InlineMath>{"z = a + bi"}</InlineMath> odgovara tačka{" "}
              <InlineMath>{"(a, b)"}</InlineMath>. Osa{" "}
              <InlineMath>{"x"}</InlineMath> je realna osa, a osa{" "}
              <InlineMath>{"y"}</InlineMath> imaginarna osa.
            </p>
            <MathBlock>{"z = a + bi \\longleftrightarrow (a, b)"}</MathBlock>
          </SectionCard>
          <SectionCard title="Konjugovani broj">
            <p>Konjugat menja znak imaginarnog dela:</p>
            <MathBlock>{"\\overline{z} = a - bi"}</MathBlock>
            <p>
              Geometrijski: tačka se preslikava simetrično u odnosu na realnu
              osu.
            </p>
          </SectionCard>
          <SectionCard title="Modul kompleksnog broja">
            <p>
              Modul je dužina vektora od koordinatnog početka do tačke{" "}
              <InlineMath>{"(a, b)"}</InlineMath>.
            </p>
            <MathBlock>{"|z| = \\sqrt{a^2 + b^2}"}</MathBlock>
            <p>Ovo je direktna primena Pitagorine teoreme.</p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Veza između modula i konjugata">
            <MathBlock>
              {
                "z\\overline{z} = (a + bi)(a - bi) = a^2 + b^2 = |z|^2"
              }
            </MathBlock>
            <p>
              Ova formula je centralna za deljenje kompleksnih brojeva, jer pravi
              realan imenilac.
            </p>
          </SectionCard>
          <SectionCard title="Brz primer">
            <p>
              Ako je <InlineMath>{"z = -3 + 4i"}</InlineMath>, onda je:
            </p>
            <MathBlock>
              {
                "\\overline{z} = -3 - 4i,\\qquad |z| = \\sqrt{(-3)^2 + 4^2} = 5"
              }
            </MathBlock>
            <MicroCheck
              question="Mikro-provera: Zašto modul nikad nije negativan?"
              answer={
                <p>
                  Zato što je <InlineMath>{"|z|"}</InlineMath> dužina, a dužina
                  ne može biti negativna. Takođe, pod korenom je zbir kvadrata.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OPERACIJE ═══════════ */}
      <LessonSection
        id="operacije"
        eyebrow="Osnovne operacije"
        title="Računaj uredno, pa tek onda tumači rezultat"
        description="Skoro svaki zadatak postaje lak kada se strogo držiš jednog pravila: sredi izraz do oblika a + bi, pa tek onda čitaj realni i imaginarni deo."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula={"(a + bi) \\pm (c + di) = (a \\pm c) + (b \\pm d)i"}
            note="Realni sa realnim, imaginarni sa imaginarnim."
          />
          <FormulaCard
            title="Množenje"
            formula="(a + bi)(c + di) = (ac - bd) + (ad + bc)i"
            note={
              <>
                Koristiš distributivnost, pa na kraju sređuješ{" "}
                <InlineMath>{"i^2 = -1"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Deljenje"
            formula={"\\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{(c + di)(c - di)} = \\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}"}
            note={
              <>
                Imenilac &ldquo;racionalizuješ&rdquo; množenjem konjugovanim
                brojem. Važi samo kada{" "}
                <InlineMath>{"c + di \\neq 0"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Periodičnost stepena od i">
            <p>
              Za velika <InlineMath>{"n"}</InlineMath> ne množiš redom, nego
              tražiš ostatak pri deljenju sa <InlineMath>{"4"}</InlineMath>.
            </p>
            <MathBlock>
              {
                "i^n = \\left\\{\\begin{array}{ll} 1, & n \\equiv 0 \\pmod 4 \\\\ i, & n \\equiv 1 \\pmod 4 \\\\ -1, & n \\equiv 2 \\pmod 4 \\\\ -i, & n \\equiv 3 \\pmod 4 \\end{array}\\right."
              }
            </MathBlock>
          </SectionCard>
          <SectionCard title="Praktično pravilo za račun">
            <ul>
              <li>
                Posle svake operacije sredi izraz u oblik{" "}
                <InlineMath>{"a + bi"}</InlineMath>.
              </li>
              <li>
                Ne ostavljaj <InlineMath>{"i^2"}</InlineMath>,{" "}
                <InlineMath>{"i^3"}</InlineMath> ili razlomke
                &ldquo;nesređene&rdquo;.
              </li>
              <li>
                Kada zadatak pita &ldquo;realan&rdquo; ili &ldquo;čisto
                imaginaran&rdquo;, postavi uslov na odgovarajući deo.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorijum kompleksnih brojeva"
        description="Menjaj dva kompleksna broja, posmatraj njihove tačke u Gaussovoj ravni, proveri rezultat operacije i prati šta se dešava sa konjugatom, modulom i stepenima od i."
      >
        <ComplexPlaneLab />

        <InsightCard title="Kako da koristiš laboratorijum pametno">
          <p>
            Probaj da najpre sam izračunaš rezultat na papiru, a tek onda
            proveriš na ekranu. Posebno obrati pažnju na deljenje: cilj nije
            samo dobiti broj, nego razumeti zašto konjugat uklanja imaginarni deo
            iz imenioca.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji prate tipičnu logiku prijemnog zadatka"
        description="Svaki primer je složen tako da pokaže jednu ključnu ideju. Nemoj ih čitati kao gotova rešenja, već kao obrazac koji treba da umeš da ponoviš samostalno."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Kako brzo računati <InlineMath>{"i^{137}"}</InlineMath>
            </h3>
            <p>
              Veliki stepeni od <InlineMath>{"i"}</InlineMath> nikada se ne
              računaju direktnim množenjem. Gleda se ostatak pri deljenju sa{" "}
              <InlineMath>{"4"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Podeli eksponent sa <InlineMath>{"4"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"137 = 4 \\cdot 34 + 1"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Uoči ostatak.">
                <p>
                  Pošto je ostatak <InlineMath>{"1"}</InlineMath>, obrazac kaže
                  da je rezultat isti kao <InlineMath>{"i^1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Napiši finalni odgovor.">
                <MathBlock>{"i^{137} = i"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 2: Sabiranje i množenje</h3>
            <p>
              Neka su <InlineMath>{"z_1 = 3 - 2i"}</InlineMath> i{" "}
              <InlineMath>{"z_2 = 1 + 5i"}</InlineMath>. Izračunaj{" "}
              <InlineMath>{"z_1 + z_2"}</InlineMath> i{" "}
              <InlineMath>{"z_1 z_2"}</InlineMath>.
            </p>
            <MathBlock>
              {"z_1 + z_2 = (3 - 2i) + (1 + 5i) = 4 + 3i"}
            </MathBlock>
            <MathBlock>
              {
                "z_1 z_2 = (3 - 2i)(1 + 5i) = 3 + 15i - 2i - 10i^2 = 13 + 13i"
              }
            </MathBlock>
            <p>
              Ključ: tek kada zameniš <InlineMath>{"i^2"}</InlineMath> sa{" "}
              <InlineMath>{"-1"}</InlineMath>, rezultat postaje uredan oblik{" "}
              <InlineMath>{"a + bi"}</InlineMath>.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Deljenje preko konjugovanog
            </h3>
            <p>
              Izračunaj{" "}
              <InlineMath>{"\\dfrac{4 + 2i}{1 - i}"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pomnoži brojilac i imenilac konjugovanim brojem{" "}
                    <InlineMath>{"1 + i"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>
                  {"\\frac{4 + 2i}{1 - i} \\cdot \\frac{1 + i}{1 + i}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Sredi imenilac.">
                <MathBlock>{"(1 - i)(1 + i) = 1 - i^2 = 2"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sredi brojilac.">
                <MathBlock>
                  {"(4 + 2i)(1 + i) = 4 + 4i + 2i + 2i^2 = 2 + 6i"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Podeli konačno.">
                <MathBlock>{"\\frac{2 + 6i}{2} = 1 + 3i"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Kada je broj realan ili čisto imaginaran
            </h3>
            <p>
              Za koje vrednosti parametra <InlineMath>{"m"}</InlineMath> je broj{" "}
              <InlineMath>{"z = (2m - 1) + (m - 4)i"}</InlineMath> realan, a za
              koje čisto imaginaran?
            </p>
            <MathBlock>
              {
                "z \\text{ je realan } \\iff m - 4 = 0 \\iff m = 4"
              }
            </MathBlock>
            <p>
              Tada je <InlineMath>{"z = 7"}</InlineMath>.
            </p>
            <MathBlock>
              {
                "z \\text{ je čisto imaginaran } \\iff 2m - 1 = 0 \\iff m = \\frac{1}{2}"
              }
            </MathBlock>
            <p>
              Tada je <InlineMath>{"z = -\\dfrac{7}{2}i"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ovo treba da prepoznaš bez razmišljanja"
        description="Ove formule nisu za puko pamćenje. Svaka od njih se stalno pojavljuje u računu i štedi vreme kada se odmah prepozna odgovarajuća situacija."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovni zapis"
            formula={"z = a + bi,\\qquad \\operatorname{Re}(z) = a,\\qquad \\operatorname{Im}(z) = b"}
          />
          <FormulaCard
            title="Jednakost"
            formula={"a + bi = c + di \\iff a = c \\text{ i } b = d"}
          />
          <FormulaCard
            title="Konjugat"
            formula={"\\overline{z} = a - bi"}
          />
          <FormulaCard
            title="Modul"
            formula={"|z| = \\sqrt{a^2 + b^2}"}
          />
          <FormulaCard
            title="Veza sa konjugatom"
            formula={"z\\overline{z} = |z|^2"}
          />
          <FormulaCard
            title="Deljenje"
            formula={"\\frac{a + bi}{c + di} = \\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}"}
          />
          <FormulaCard
            title="Množenje"
            formula="(a + bi)(c + di) = (ac - bd) + (ad + bc)i"
          />
          <FormulaCard
            title="Stepeni od i"
            formula={"i,\\ -1,\\ -i,\\ 1,\\ i,\\ -1,\\ \\dots"}
          />
          <FormulaCard
            title="Posebni uslovi"
            formula={"z \\in \\mathbb{R} \\iff \\operatorname{Im}(z)=0 \\qquad z \\text{ je čisto imaginaran } \\iff \\operatorname{Re}(z)=0"}
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Greške koje prave i dobri učenici"
        description="Ovde nisu generički saveti, već tipične konkretne greške koje odmah ruše tačan rezultat."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno pravilo <InlineMath>{"i^2 = 1"}</InlineMath>
            </h3>
            <p>
              Ovo je najskuplja greška. Ispravno je{" "}
              <InlineMath>{"i^2 = -1"}</InlineMath>. Zbog toga se pri množenju
              znakovi često promene baš na kraju računa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Imaginarni deo nije <InlineMath>{"bi"}</InlineMath>, nego{" "}
              <InlineMath>{"b"}</InlineMath>
            </h3>
            <p>
              Kada zadatak traži da broj bude realan, postavljaš uslov{" "}
              <InlineMath>{"\\operatorname{Im}(z)=0"}</InlineMath>, dakle
              koeficijent uz <InlineMath>{"i"}</InlineMath> mora biti nula.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Deljenje bez konjugata</h3>
            <p>
              Ako samo &ldquo;podeliš član po član&rdquo;, rezultat nema smisla.
              Imenilac mora postati realan pomoću konjugovanog broja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"|z|^2"}</InlineMath> i{" "}
              <InlineMath>{"|z|"}</InlineMath>
            </h3>
            <p>
              Za <InlineMath>{"z = a + bi"}</InlineMath> važi{" "}
              <InlineMath>{"|z| = \\sqrt{a^2+b^2}"}</InlineMath>, a ne{" "}
              <InlineMath>{"a^2+b^2"}</InlineMath>. Zbir kvadrata je zapravo{" "}
              <InlineMath>{"|z|^2"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Nesređen rezultat</h3>
            <p>
              Rezultat mora da završi kao <InlineMath>{"a + bi"}</InlineMath>.
              Ako ostaviš <InlineMath>{"3 + 5i - 2i^2"}</InlineMath>, račun još
              nije gotov.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pretpostavka da se moduli sabiraju
            </h3>
            <p>
              Uopšte ne važi{" "}
              <InlineMath>{"|z + w| = |z| + |w|"}</InlineMath> u opštem slučaju.
              Modul je dužina vektora, ne operacija po članovima.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se tema zaista pojavljuje na testu"
        description="Na prijemnom se kompleksni brojevi retko pojavljuju kao čista teorija. Uglavnom su upakovani u zadatak koji proverava brzinu sređivanja i sigurnost u osnovnim pravilima."
      >
        <div className={s.grid3}>
          <SectionCard title="Zadaci sa iⁿ">
            <p>
              Obično dobiješ veliki eksponent, a test proverava da li znaš periodu{" "}
              <InlineMath>{"4"}</InlineMath>. Ako kreneš direktno da množiš,
              gubiš vreme bez potrebe.
            </p>
          </SectionCard>
          <SectionCard title="Zadaci sa deljenjem">
            <p>
              Ključno pitanje je da li znaš da koristiš konjugovani broj i da
              središ imenilac u realan broj. Tu najlakše nastaju greške sa
              znakovima.
            </p>
          </SectionCard>
          <SectionCard title="Zadaci sa parametrima">
            <p>
              Često se traži da broj ili izraz bude realan, čisto imaginaran ili
              da mu je modul jednak nekoj vrednosti. Tada odmah pišeš uslove na{" "}
              <InlineMath>{"\\operatorname{Re}"}</InlineMath> i{" "}
              <InlineMath>{"\\operatorname{Im}"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 4 koraka">
          <p>
            1. Sredi sve stepene od <InlineMath>{"i"}</InlineMath>. 2. Računaj i
            pregrupiši u realni i imaginarni deo. 3. Ako deliš, uvedi konjugat.
            4. Tek na kraju tumači uslov iz zadatka. Taj redosled praktično
            rešava većinu osnovnih zadataka iz ove oblasti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Probaj samostalno, pa proveri rešenje"
        description="Prve tri vežbe proveravaju mehaniku računa, a poslednje tri proveravaju razumevanje uslova i geometrijskog značenja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"(2 - i) + (5 + 4i)"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"(2 - i) + (5 + 4i) = 7 + 3i"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"(1 + 2i)(3 - i)"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"(1 + 2i)(3 - i) = 3 - i + 6i - 2i^2 = 5 + 5i"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\dfrac{3 - 4i}{1 + 2i}"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\frac{3 - 4i}{1 + 2i} \\cdot \\frac{1 - 2i}{1 - 2i} = \\frac{3 - 6i - 4i + 8i^2}{1 + 4} = \\frac{-5 - 10i}{5} = -1 - 2i"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Odredi <InlineMath>{"i^{2026}"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "2026 \\equiv 2 \\pmod 4 \\quad \\Longrightarrow \\quad i^{2026} = i^2 = -1"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Za <InlineMath>{"z = -5 + 12i"}</InlineMath> odredi{" "}
                <InlineMath>{"\\overline{z}"}</InlineMath> i{" "}
                <InlineMath>{"|z|"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\overline{z} = -5 - 12i,\\qquad |z| = \\sqrt{(-5)^2 + 12^2} = 13"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Za koje <InlineMath>{"x"}</InlineMath> je broj{" "}
                <InlineMath>{"z = (x + 1) + (2x - 6)i"}</InlineMath> realan?
              </p>
            }
            solution={
              <>
                <p>Broj je realan kada je imaginarni deo jednak nuli.</p>
                <MathBlock>{"2x - 6 = 0 \\iff x = 3"}</MathBlock>
                <p>
                  Tada je <InlineMath>{"z = 4"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna misaona poruka lekcije"
        description="Kada razumeš da je kompleksan broj istovremeno zapis a + bi i tačka (a,b), više ne učiš pravila naslepo: vidiš šta radiš i algebra i geometrija počinju da sarađuju."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Prvo sredi na } a + bi,\\ \\text{zatim čitaj } \\operatorname{Re}(z),\\ \\operatorname{Im}(z),\\ |z| \\text{ ili } \\overline{z}."
            }
          </MathBlock>
          <p>
            Ovaj princip rešava i &ldquo;mehaničke&rdquo; zadatke i zadatke sa
            uslovima. To je prava poenta ove lekcije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ako umeš sledeće četiri stvari, baza za kompleksne brojeve je postavljena kako treba."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Zapis i čitanje</h3>
            <p>
              Kompleksan broj piše se kao <InlineMath>{"a + bi"}</InlineMath>,
              pri čemu je <InlineMath>{"a"}</InlineMath> realni, a{" "}
              <InlineMath>{"b"}</InlineMath> imaginarni deo.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Operacije</h3>
            <p>
              Sabiranje i oduzimanje radiš po komponentama, množenje sređuješ uz{" "}
              <InlineMath>{"i^2 = -1"}</InlineMath>, a deljenje vodi preko
              konjugovanog broja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Geometrijski smisao</h3>
            <p>
              Broj <InlineMath>{"a + bi"}</InlineMath> je tačka{" "}
              <InlineMath>{"(a, b)"}</InlineMath>, konjugat je preslikavanje
              preko realne ose, a modul je udaljenost od koordinatnog početka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Stepeni od <InlineMath>{"i"}</InlineMath>
            </h3>
            <p>
              Ne računaš redom, već koristiš periodu{" "}
              <InlineMath>{"4"}</InlineMath>. To je najbrži put kroz zadatke sa
              velikim eksponentima.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Uslovi u zadatku</h3>
            <p>
              &ldquo;Broj je realan&rdquo; znači imaginarni deo je nula.
              &ldquo;Broj je čisto imaginaran&rdquo; znači realni deo je nula.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Sledeća prirodna tema je trigonometrijski oblik kompleksnog broja i
              Moavrova formula, gde modul i položaj broja dobijaju još jaču
              ulogu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 9 gradi osnovu za sledeći nivo: argument kompleksnog broja,
          trigonometrijski zapis i stepenovanje preko Moavrove formule.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
