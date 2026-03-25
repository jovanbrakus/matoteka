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
import CrossSectionLab from "./CrossSectionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#pojam", label: "Pojmovi" },
  { href: "#preseci", label: "Karakteristični preseci" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne relacije" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

export default function Lesson48Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 48"
        title={
          <>
            Upisana i opisana{" "}
            <span className={cs.tHeroAccent}>geometrijska tela</span>
          </>
        }
        description="Ovo je lekcija u kojoj stereometrija najviše liči na prijemni ispit: telo je u prostoru, ali se rešenje skoro uvek krije u pažljivo izabranom preseku. Kada lopta postane krug, valjak pravougaonik, a kupa jednakokraki trougao, zadatak se naglo pretvara u poznatu planimetriju. Zato je prava veština ove teme manje u pamćenju formula, a više u tome da vidiš koji se ravni model krije iza 3D slike."
        heroImageSrc="/api/lessons/48/hero"
        heroImageAlt="Ilustracija upisanih i opisanih geometrijskih tela"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da 3D zadatak svedeš na 2D model — prepoznaješ koji presek treba nacrtati.",
          },
          {
            label: "Najveća zamka",
            description:
              "Računanje bez provere dodira — ubačena formula bez provere šta je tangenta ili osa u preseku.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Osni presek i sličnost trouglova — nacrtaj odgovarajući trougao, krug ili pravougaonik.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "75 do 100 minuta sa crtanjem, laboratorijumom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description: "Krug, trougao, sličnost i Pitagorina teorema.",
          },
          {
            label: "Glavna veština",
            description: "Izbor pravog preseka — nacrta presek pa tek onda formula.",
          },
          {
            label: "Interaktivno",
            description: "Canvas laboratorija preseka sa promenljivim merama.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo su zadaci u kojima prostorna inteligencija direktno utiče na rezultat"
        description={'Na prijemnom se ova tema često javlja kao završni nivo stereometrije. Zadatak izgleda komplikovano jer u istom trenutku vidiš dva tela, više različitih mera i uslov dodira. Ali kada nađeš pravi presek, problem postaje mnogo mirniji: umesto \u201Elopte u kupi\u201C zapravo rešavaš \u201Ekrug upisan u jednakokraki trougao\u201C, a umesto \u201Evaljka u lopti\u201C rešavaš \u201Epravougaonik upisan u krug\u201C.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Povezuje planimetriju i stereometriju">
            <p>
              Bez trouglova, krugova i sličnosti ovde nema napretka. Upravo zato
              ova lekcija proverava koliko zaista razumeš ranije gradivo.
            </p>
          </SectionCard>
          <SectionCard title="Čest izvor težih zadataka">
            <p>
              Kada test želi da razlikuje mehaničko pamćenje od stvarnog
              razumevanja, ovakvi zadaci su prirodan izbor.
            </p>
          </SectionCard>
          <SectionCard title='Uči te da „oduzmeš dimenziju"'>
            <p>
              Najbolji stereometrijski refleks je da složen prostor pretvoriš u
              jednu ravansku sliku koja se može izračunati.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto isti zadatak deluje mnogo lakše kada nacrtaš presek?"
          answer={
            <p>
              Zato što u preseku nestaje „višak prostora". Umesto da istovremeno
              pratiš više kružnih i prostorno nagnutih elemenata, dobijaš poznatu
              figuru sa jasnim odnosima: pravougaonik, krug ili trougao.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 2. POJMOVI ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow='Šta zapravo znače reči „upisano" i „opisano"'
        title="To nije nova formula, već jezik za opis dodira između tela"
        description='Rečenica „lopta je upisana u kupu" znači da lopta dodiruje omotač i bazu kupe na tačno određen način. Ista situacija može da se izgovori i obrnuto: „kupa je opisana oko lopte". Dakle, upisano i opisano nisu dva različita problema, već dva ugla gledanja na isti odnos.'
      >
        <div className={s.grid3}>
          <SectionCard title="Unutrašnje telo dodiruje spoljašnje">
            <p>
              Ako je lopta upisana u valjak, onda dodiruje i omotač i obe baze
              valjka. Ako valjak nije dovoljno visok, takva upisana lopta ne
              postoji.
            </p>
          </SectionCard>
          <SectionCard title="Spoljašnje telo obuhvata unutrašnje">
            <p>
              Kada kažemo da je kupa opisana oko lopte, samo naglašavamo
              spoljašnje telo. Geometrijski odnos dodira ostaje isti.
            </p>
          </SectionCard>
          <SectionCard title="Tražiš uslov tangencije">
            <p>
              Svaki zadatak se svodi na to gde se javljaju dodiri i koja se 2D
              relacija u preseku iz toga dobija.
            </p>
          </SectionCard>
        </div>

        {/* Postupak u 4 koraka */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 18 }}>
          <SectionCard title="Korak 1: Izaberi simetričan presek">
            <p>
              Kod obrtnih tela to je najčešće osni presek, a kod pravilnih
              piramida i prizmi presek kroz osu i važnu liniju simetrije baze.
            </p>
          </SectionCard>
          <SectionCard title="Korak 2: Prevedi 3D u 2D">
            <p>
              Lopta postaje krug, valjak pravougaonik, kupa jednakokraki trougao.
              Tako vidiš šta tačno dodiruje šta.
            </p>
          </SectionCard>
          <SectionCard title="Korak 3: Zapiši planimetrijsku relaciju">
            <p>
              Nekad je to upisani krug u trouglu, nekad Pitagorina teorema, a
              nekad sličnost trouglova i linearna promena širine.
            </p>
          </SectionCard>
          <SectionCard title="Korak 4: Vrati rezultat u 3D">
            <p>
              Kada iz preseka dobiješ poluprečnik ili visinu, tek tada računaš
              površinu ili zapreminu konkretnog tela.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški trik koji vredi zapamtiti">
          <p>
            Kada vidiš izraz „upisana/opisana tela", nemoj odmah pitati „koja je
            formula", nego: „Koje dve ravne figure dobijam u preseku i kakav je
            među njima odnos?"
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: kako glasi 2D model za loptu upisanu u kupu?"
          answer={
            <p>
              U osnom preseku kupe dobijaš jednakokraki trougao, a lopta se
              pretvara u krug upisan u taj trougao. To je centralni model iz kog
              se izvodi poluprečnik lopte.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. KARAKTERISTIČNI PRESECI ═══════════ */}
      <LessonSection
        id="preseci"
        eyebrow="Karakteristični preseci i najvažniji modeli"
        title="Najčešći prijemni zadaci imaju vrlo prepoznatljive 2D verzije"
        description="Kada jednom naučiš da prepoznaš ova četiri osnovna modela, veliki broj zadataka postaje rutina. Poenta nije da ih učiš napamet kao nepovezane recepte, nego da vidiš zašto baš ti preseci nose svu informaciju o dodiru."
      >
        <div className={s.grid3}>
          <SectionCard title="Model A: Lopta upisana u valjak">
            <p>
              Osni presek valjka je pravougaonik, a lopta daje krug upisan u taj
              pravougaonik. Zato za postojanje upisane lopte mora važiti{" "}
              <InlineMath>{"H = 2R"}</InlineMath>.
            </p>
            <MathBlock>
              {"r_{\\text{lopte}} = R_{\\text{valjka}}, \\qquad H_{\\text{valjka}} = 2r_{\\text{lopte}}"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Model B: Lopta upisana u kupu">
            <p>
              Osni presek kupe je jednakokraki trougao. Poluprečnik lopte postaje
              poluprečnik kruga upisanog u taj trougao, pa radi formula za
              inradius.
            </p>
            <MathBlock>
              {"r = \\frac{P_{\\triangle}}{p_{\\triangle}} = \\frac{RH}{R+\\sqrt{R^2+H^2}}"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Model C: Valjak upisan u loptu">
            <p>
              U preseku dobijaš pravougaonik upisan u krug. Polovina visine
              valjka i poluprečnik valjka grade pravougli trougao sa
              poluprečnikom lopte.
            </p>
            <MathBlock>
              {"r^2 + \\left(\\frac{H}{2}\\right)^2 = R^2"}
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Model D: Valjak upisan u kupu">
            <p>
              Ako valjak stoji na bazi kupe, u osnom preseku dobijaš pravougaonik
              u jednakokrakom trouglu. Širina trougla linearno opada sa visinom,
              pa se koristi sličnost.
            </p>
            <MathBlock>
              {"r = R\\left(1-\\frac{h}{H}\\right)"}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Isti princip važi i kod pravilnih piramida">
            <p>
              Kod pravilne četvorougaone piramide opisane oko valjka biraš presek
              kroz osu piramide i sredine naspramnih stranica baze. Tada opet
              dobijaš trougao i pravougaonik.
            </p>
          </SectionCard>
          <SectionCard title="Ne učiš temu po telima, nego po preseku">
            <p>
              Kada znaš koji ravni model stoji iza zadatka, manje je važno kako
              tačno glasi verbalni opis konfiguracije.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kod valjka upisanog u loptu, zašto se u relaciji pojavljuje (H/2), a ne H?"
          answer={
            <p>
              Zato što u preseku uzimaš polovinu pravougaonika. Poluprečnik lopte
              ide od centra do temena pravougaonika, pa su katete tog pravouglog
              trougla poluprečnik valjka{" "}
              <InlineMath>{"r"}</InlineMath> i polovina njegove visine{" "}
              <InlineMath>{"\\frac{H}{2}"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija karakterističnih preseka"
        description="Menjaj konfiguraciju i mere, pa posmatraj kako se isti pedagoški obrazac ponavlja: prvo nastaje 2D model, zatim iz njega jedna ključna relacija, a tek onda računanje u 3D."
      >
        <CrossSectionLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa presekom kada
            promeniš meru, pa tek onda proveri ekran. Ako ti 2D model deluje
            „previše jednostavno", upravo to i jeste poenta: presek oduzima
            dimenziju i otkriva suštinu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 5. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljni primeri kakvi se zaista pojavljuju u pripremi za prijemni"
        description="U svakom primeru prvo je važno da prepoznaš model, a tek onda da računaš. Tako razvijaš naviku koja ostaje stabilna i kada se brojevi promene ili zadatak bude formulisan neobičnim redosledom."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: Lopta upisana u valjak</h3>
            <p>
              Valjak ima poluprečnik baze{" "}
              <InlineMath>{"5\\text{ cm}"}</InlineMath> i visinu{" "}
              <InlineMath>{"10\\text{ cm}"}</InlineMath>. Odredi zapreminu lopte
              upisane u taj valjak.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj model.">
                <p>
                  U osnom preseku valjak je pravougaonik širine{" "}
                  <InlineMath>{"10"}</InlineMath> i visine{" "}
                  <InlineMath>{"10"}</InlineMath>, a lopta je krug upisan u taj
                  pravougaonik.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izvuci poluprečnik lopte.">
                <p>
                  Pošto krug dodiruje bočne stranice, poluprečnik lopte je isti
                  kao poluprečnik valjka:{" "}
                  <InlineMath>{"r = 5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Proveri uslov postojanja.">
                <p>
                  Visina valjka je{" "}
                  <InlineMath>{"10 = 2 \\cdot 5"}</InlineMath>, pa lopta zaista
                  dodiruje i gornju i donju bazu.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Izračunaj zapreminu.">
                <MathBlock>
                  {"V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 5^3 = \\frac{500\\pi}{3}\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 2: Lopta upisana u kupu</h3>
            <p>
              Kupa ima poluprečnik baze{" "}
              <InlineMath>{"R = 6\\text{ cm}"}</InlineMath> i visinu{" "}
              <InlineMath>{"H = 8\\text{ cm}"}</InlineMath>. Nađi poluprečnik
              lopte upisane u kupu i njenu zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nacrtaj osni presek.">
                <p>
                  Dobijaš jednakokraki trougao sa osnovicom{" "}
                  <InlineMath>{"2R = 12"}</InlineMath> i visinom{" "}
                  <InlineMath>{"8"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj izvodnicu kupe.">
                <MathBlock>
                  {"s = \\sqrt{R^2 + H^2} = \\sqrt{6^2 + 8^2} = 10"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Koristi formulu za poluprečnik upisanog kruga.">
                <p>
                  Površina trougla je{" "}
                  <InlineMath>{"P = \\frac{12 \\cdot 8}{2} = 48"}</InlineMath>,
                  a semiperimetar je{" "}
                  <InlineMath>{"p = \\frac{12 + 10 + 10}{2} = 16"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Dobij poluprečnik lopte.">
                <MathBlock>
                  {"r = \\frac{P}{p} = \\frac{48}{16} = 3\\text{ cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={5} title="Izračunaj zapreminu lopte.">
                <MathBlock>
                  {"V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Valjak upisan u loptu</h3>
            <p>
              Poluprečnik lopte je{" "}
              <InlineMath>{"R = 5\\text{ cm}"}</InlineMath>, a visina upisanog
              valjka <InlineMath>{"H = 8\\text{ cm}"}</InlineMath>. Odredi
              poluprečnik baze valjka i njegovu zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pređi na osni presek.">
                <p>
                  Loptu vidiš kao krug poluprečnika{" "}
                  <InlineMath>{"5"}</InlineMath>, a valjak kao pravougaonik
                  visine <InlineMath>{"8"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uzmi polovinu preseka.">
                <p>
                  Dobijaš pravougli trougao sa hipotenuzom{" "}
                  <InlineMath>{"5"}</InlineMath>, jednom katetom{" "}
                  <InlineMath>{"\\frac{H}{2} = 4"}</InlineMath>, a drugom
                  katetom <InlineMath>{"r"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Primeni Pitagorinu teoremu.">
                <MathBlock>
                  {"r^2 + 4^2 = 5^2 \\Rightarrow r^2 = 9 \\Rightarrow r = 3\\text{ cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Izračunaj zapreminu valjka.">
                <MathBlock>
                  {"V = \\pi r^2 H = \\pi \\cdot 3^2 \\cdot 8 = 72\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 4: Valjak upisan u kupu</h3>
            <p>
              Kupa ima poluprečnik baze{" "}
              <InlineMath>{"R = 6\\text{ cm}"}</InlineMath> i visinu{" "}
              <InlineMath>{"H = 12\\text{ cm}"}</InlineMath>. U njoj se nalazi
              valjak čija je visina{" "}
              <InlineMath>{"h = 4\\text{ cm}"}</InlineMath>, a donja baza leži u
              ravni baze kupe. Odredi poluprečnik valjka i njegovu zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Presek daje trougao i pravougaonik.">
                <p>
                  U osnom preseku valjak je pravougaonik, a kupa jednakokraki
                  trougao.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Posmatraj širinu kupe na visini{" "}
                    <InlineMath>{"h"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Širina se menja linearno, pa po sličnosti važi:
                </p>
                <MathBlock>
                  {"r = R\\left(1 - \\frac{h}{H}\\right)"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Uvrsti podatke.">
                <MathBlock>
                  {"r = 6\\left(1 - \\frac{4}{12}\\right) = 6 \\cdot \\frac{2}{3} = 4\\text{ cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Izračunaj zapreminu.">
                <MathBlock>
                  {"V = \\pi r^2 h = \\pi \\cdot 4^2 \\cdot 4 = 64\\pi\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={5} title="Pedagoška napomena.">
                <p>
                  Potpuno isti obrazac koristiš i kod pravilne piramide opisane
                  oko valjka: i tamo širina preseka opada linearno.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 6. KLJUČNE RELACIJE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne relacije i formule"
        title="Ovo su obrasci koje vredi znati, ali tek posle razumevanja modela"
        description="Formula bez slike je krhka. Slika bez formule je spora. Cilj je da spojiš oba dela: prvo vidiš model, a zatim precizno zapisuješ odgovarajuću relaciju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Lopta upisana u valjak"
            formula={"r_{\\text{lopte}} = R,\\qquad H = 2R"}
            note="Ako lopta dodiruje omotač i obe baze valjka, onda poluprečnik baze valjka mora biti jednak poluprečniku lopte, a visina valjka jednaka prečniku lopte."
          />
          <FormulaCard
            title="Lopta upisana u kupu"
            formula={"r = \\frac{P_{\\triangle}}{p_{\\triangle}} = \\frac{RH}{R+\\sqrt{R^2+H^2}}"}
            note="U osnom preseku koristiš poluprečnik upisanog kruga u jednakokraki trougao. To je tipičan prijemni most između stereometrije i planimetrije."
          />
          <FormulaCard
            title="Valjak upisan u loptu"
            formula={"r^2 + \\left(\\frac{H}{2}\\right)^2 = R^2"}
            note="Polovina preseka daje pravougli trougao. Najčešća greška je zaboravljanje da se u formuli koristi polovina visine valjka."
          />
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Valjak upisan u kupu"
            formula={"r = R\\left(1-\\frac{h}{H}\\right)"}
            note="Ako valjak stoji na bazi kupe, širina kupe opada linearno sa visinom. Zato sličnost trouglova daje direktnu formulu za poluprečnik valjka."
          />
          <FormulaCard
            title="Uslov postojanja"
            formula={"\\text{za loptu u valjku: postoji tačno kada je } H = 2R"}
            note="Na primer, lopta nije upisana u svaki valjak. Ako je valjak prenizak ili previsok, može stati neka lopta, ali ne i upisana lopta koja dodiruje sve što treba."
          />
          <FormulaCard
            title="Širi princip"
            formula={"\\text{prava formula} = \\text{formula pravog preseka}"}
            note='Kada zadatak glasi drugačije, ne menjaj logiku. Samo pronađi da li se u preseku krije krug u trouglu, pravougaonik u krugu ili pravougaonik u trouglu.'
          />
        </div>
      </LessonSection>

      {/* ═══════════ 7. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Tipične greške nisu slučajne, već imaju veoma prepoznatljiv obrazac"
        description="Ako unapred znaš gde učenici obično pogreše, mnogo lakše ćeš zaustaviti sopstvenu grešku pre nego što odeš u pogrešnom smeru."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Meša se visina i polovina visine</h3>
            <p>
              Kod valjka upisanog u loptu u Pitagorinoj teoremi ide{" "}
              <InlineMath>{"\\frac{H}{2}"}</InlineMath>, jer se koristi polovina
              pravougaonika iz preseka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravlja se da „upisano" znači dodir sa svim bitnim delovima
            </h3>
            <p>
              Nije dovoljno da telo samo „stane" u drugo telo. Mora da bude tačno
              određeno kako ga dodiruje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Bira se pogrešan presek</h3>
            <p>
              Ako presek ne prolazi kroz osu simetrije ili relevantne tačke
              dodira, dobijena ravna figura neće nositi sve potrebne informacije.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Računa se inradius pogrešnog trougla</h3>
            <p>
              Kod lopte u kupi treba koristiti osni presek, a ne „neki" bočni
              trougao nacrtan po osećaju.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravlja se linearna promena širine</h3>
            <p>
              Kod valjka u kupi i piramidi širina preseka ne opada slučajno, već
              linearno. Zato sličnost trouglova daje najbrži put.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Formula se pamti, ali se ne zna odakle dolazi</h3>
            <p>
              Tada i mala promena teksta zadatka deluje kao „nova" tema.
              Razumevanje preseka rešava taj problem.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 8. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta proveriš za prvih 20 sekundi kada vidiš ovakav zadatak"
        description="U vremenski ograničenom radu nije dovoljno da znaš teoriju. Potrebna ti je i jasna mini-strategija: kojim redom čitaš tekst, šta skiciraš i koju proveru radiš pre ubacivanja brojeva."
      >
        <div className={s.grid3}>
          <SectionCard title="Korak A: Podvuci koja su tela unutra, a koja spolja">
            <p>
              To odmah razbija verbalnu zbrku. Nije isto da je lopta upisana u
              kupu ili da je valjak upisan u loptu, iako oba zvuče kao „jedno telo
              u drugom".
            </p>
          </SectionCard>
          <SectionCard title="Korak B: Nacrtaj jedan karakterističan presek">
            <p>
              Najčešće je to osni presek. Ako ga nemaš na papiru, verovatno ćeš
              preskočiti najvažniji uvid u zadatku.
            </p>
          </SectionCard>
          <SectionCard title="Korak C: Pitaj se koji je 2D model nastao">
            <p>
              Krug u trouglu, pravougaonik u krugu, krug u pravougaoniku ili
              pravougaonik u trouglu: to su najčešća četiri odgovora.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Korak D: Tek tada biraj formulu">
            <p>
              Formula bez modela je rizična. Model bez formule je spor. Spoj
              oboje daje najstabilnije rešenje.
            </p>
          </SectionCard>
          <SectionCard title="Korak E: Proveri da li rezultat ima smisla">
            <p>
              Poluprečnik upisanog tela mora biti manji od poluprečnika
              spoljašnjeg tela, a visina unutrašnjeg tela mora biti geometrijski
              moguća.
            </p>
          </SectionCard>
          <SectionCard title="Šta se često pita">
            <ul>
              <li>naći poluprečnik ili visinu upisanog tela</li>
              <li>izračunati zapreminu ili površinu nakon dobijanja te mere</li>
              <li>prepoznati koji presek daje najkraće rešenje</li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koji presek biraš kod pravilne četvorougaone piramide opisane oko valjka?"
          answer={
            <p>
              Presek kroz osu piramide i sredine naspramnih stranica baze. Tada
              piramida daje jednakokraki trougao, a valjak pravougaonik, pa
              zadatak postaje analogan modelu „valjak u kupi".
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 9. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="Vežbe na kraju"
        title="Samostalna provera razumevanja"
        description="Probaj da svaku vežbu najpre rešiš bez gledanja u rešenje. Ako zapneš, ne gledaj odmah račun: prvo proveri da li si izabrao dobar presek i dobar 2D model."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Lopta u valjku"
            problem={
              <p>
                Valjak ima poluprečnik baze{" "}
                <InlineMath>{"7\\text{ cm}"}</InlineMath>. Kolika mora biti
                njegova visina da bi lopta bila upisana, i kolika je površina te
                lopte?
              </p>
            }
            solution={
              <>
                <p>
                  Za upisanu loptu mora važiti{" "}
                  <InlineMath>{"H = 2R = 14\\text{ cm}"}</InlineMath>.
                  Poluprečnik lopte je{" "}
                  <InlineMath>{"r = 7\\text{ cm}"}</InlineMath>, pa je njena
                  površina:
                </p>
                <MathBlock>
                  {"S = 4\\pi r^2 = 4\\pi \\cdot 49 = 196\\pi\\ \\text{cm}^2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2: Lopta u kupi"
            problem={
              <p>
                Kupa ima <InlineMath>{"R = 9\\text{ cm}"}</InlineMath> i{" "}
                <InlineMath>{"H = 12\\text{ cm}"}</InlineMath>. Nađi poluprečnik
                upisane lopte.
              </p>
            }
            solution={
              <>
                <p>
                  Prvo je{" "}
                  <InlineMath>{"s = \\sqrt{9^2 + 12^2} = 15"}</InlineMath>.
                  Zatim:
                </p>
                <MathBlock>
                  {"r = \\frac{RH}{R+s} = \\frac{9 \\cdot 12}{9 + 15} = \\frac{108}{24} = 4{,}5\\text{ cm}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3: Valjak u lopti"
            problem={
              <p>
                Poluprečnik lopte je{" "}
                <InlineMath>{"10\\text{ cm}"}</InlineMath>, a visina upisanog
                valjka <InlineMath>{"12\\text{ cm}"}</InlineMath>. Nađi
                poluprečnik baze valjka.
              </p>
            }
            solution={
              <>
                <p>Koristiš:</p>
                <MathBlock>
                  {"r^2 + \\left(\\frac{H}{2}\\right)^2 = R^2"}
                </MathBlock>
                <p>Dakle:</p>
                <MathBlock>
                  {"r^2 + 6^2 = 10^2 \\Rightarrow r^2 = 64 \\Rightarrow r = 8\\text{ cm}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4: Valjak u kupi"
            problem={
              <p>
                Kupa ima <InlineMath>{"R = 8\\text{ cm}"}</InlineMath> i{" "}
                <InlineMath>{"H = 16\\text{ cm}"}</InlineMath>. U njoj je upisan
                valjak visine <InlineMath>{"6\\text{ cm}"}</InlineMath> koji
                stoji na bazi kupe. Nađi poluprečnik valjka.
              </p>
            }
            solution={
              <>
                <p>Po sličnosti u preseku:</p>
                <MathBlock>
                  {"r = R\\left(1-\\frac{h}{H}\\right) = 8\\left(1-\\frac{6}{16}\\right) = 8 \\cdot \\frac{10}{16} = 5\\text{ cm}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5: Provera postojanja"
            problem={
              <p>
                Može li lopta biti upisana u valjak poluprečnika baze{" "}
                <InlineMath>{"4\\text{ cm}"}</InlineMath> i visine{" "}
                <InlineMath>{"7\\text{ cm}"}</InlineMath>? Objasni kratko.
              </p>
            }
            solution={
              <p>
                Ne može. Za upisanu loptu mora važiti{" "}
                <InlineMath>{"H = 2R = 8\\text{ cm}"}</InlineMath>, a ovde je{" "}
                <InlineMath>{"H = 7\\text{ cm}"}</InlineMath>. Može stati neka
                lopta unutar valjka, ali ne upisana lopta koja dodiruje omotač i
                obe baze.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 6: Konceptualno pitanje"
            problem={
              <p>
                Ako je pravilna piramida opisana oko valjka, na koju ravnu figuru
                taj odnos najčešće svodiš u preseku?
              </p>
            }
            solution={
              <p>
                Na pravougaonik unutar jednakokrakog trougla. Zato se takvi
                zadaci rešavaju slično kao valjak upisan u kupu: ključ je linearna
                promena širine preseka i sličnost trouglova.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Najteži zadaci sa upisanim i opisanim telima postaju rešivi onog trenutka kada prestaneš da gledaš celo telo odjednom. Oduzmi jednu dimenziju, nacrtaj pravi presek i tek tada računaj."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {"\\text{3D zadatak} \\xrightarrow{\\text{presek}} \\text{2D model} \\xrightarrow{\\text{formula}} \\text{rezultat}"}
          </MathBlock>
          <p>
            Ko preskoči korak sa presekom, obično koristi pogrešnu formulu ili
            pogrešan trougao. Ko ga odradi mirno, dobija najbrži put kroz
            zadatak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš sa sobom iz ove lekcije"
        description="Ako iz ove teme poneseš samo spisak formula, vrlo brzo ćeš ih pomešati. Ako poneseš glavni princip preseka, moći ćeš da rešiš i zadatke koji na prvi pogled ne liče na već viđene."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              1. Upisano i opisano su dva opisa istog dodira
            </h3>
            <p>
              Važno je da razumeš ko je unutra, ko je spolja i gde se tačno
              javlja tangencija.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Karakteristični presek vodi celo rešenje
            </h3>
            <p>
              Kada pronađeš pravi presek, stereometrija se prebacuje u
              planimetriju koju već znaš.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Najčešći modeli se stalno ponavljaju
            </h3>
            <p>
              Krug u trouglu, krug u pravougaoniku, pravougaonik u krugu i
              pravougaonik u trouglu čine jezgro ove teme.
            </p>
          </article>
        </div>

        <div className={s.summaryGrid} style={{ marginTop: 18 }}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Zapamti: Lopta u kupi</h3>
            <p>
              <InlineMath>{"r"}</InlineMath> dobijaš iz upisanog kruga u
              jednakokrakom trouglu, ne iz nasumičnog „prostornog osećaja".
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Zapamti: Valjak u lopti</h3>
            <p>
              Uvek se pojavljuje pravougli trougao sa katetama{" "}
              <InlineMath>{"r"}</InlineMath> i{" "}
              <InlineMath>{"\\frac{H}{2}"}</InlineMath>, a hipotenuzom{" "}
              <InlineMath>{"R"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              Sledeći korak: vežbaj mešovite stereometrijske zadatke
            </h3>
            <p>
              Sada je pravo vreme da kombinuješ ovu temu sa zapreminama,
              površinama i izborom preseka kod pravilnih tela.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 48 zatvara temu upisanih i opisanih tela: od razumevanja
          pojma dodira, preko izbora preseka, do sigurnog računanja na
          prijemnom ispitu.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
