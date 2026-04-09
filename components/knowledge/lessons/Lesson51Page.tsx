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

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#modeli", label: "Jednačine kružnice" },
  { href: "#dodir", label: "Uslov dodira" },
  { href: "#konstrukcije", label: "Konstrukcioni modeli" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

export default function Lesson51Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 51"
        title={
          <>
            Kružnica{" "}
            <span className={cs.tHeroAccent}>
              i uslov dodira prave i kružnice
            </span>
          </>
        }
        description="Kada vidiš kružnicu na prijemnom, skoro nikada nije dovoljno samo prepoznati formulu. Moraš da znaš da pročitaš centar i poluprečnik, da iz geometrijskih uslova sastaviš jednačinu i da shvatiš zašto je tangenta poseban položaj u kome je rastojanje centra od prave tačno jednako poluprečniku."
        heroImageSrc="/api/lessons/51/hero"
        heroImageAlt="Ilustracija za lekciju o kružnici i uslovu dodira prave i kružnice"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako se prelazi između centralne i opšte jednačine i kako se iz uslova gradi kružnica.",
          },
          {
            label: "Najveća zamka",
            description:
              'Uslov dodira nije samo "jedno rešenje", već i formula rastojanja sa apsolutnom vrednošću.',
          },
          {
            label: "Prijemni fokus",
            description:
              "Tangente paralelne datoj pravoj, kružnice tangentne na ose i zadaci sa parametrom.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "65 do 85 minuta",
          },
          {
            label: "Predznanje",
            description:
              "Prava i rastojanje tačke od prave, implicitni oblik",
          },
          {
            label: "Glavna veština",
            description:
              "Prevedi geometriju u sistem iz dodira i položaja centra",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija za centar, poluprečnik i pravu",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Kružnica je prvi pravi most između geometrije i algebre"
        description="Ova tema je važna zato što u istoj jednačini držiš i geometrijsku sliku i algebarski račun. Na prijemnom se vrlo često ne traži samo da prepoznaš kružnicu, već da iz nekoliko uslova sastaviš njenu jednačinu ili da nađeš tangentu. Tu pobeđuje učenik koji ume da misli u dva jezika: u koordinatama i u formulama."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se javlja kasnije">
            <p>
              Kružnica je najjednostavnija kriva drugog reda. Ako nju razumeš do
              kraja, mnogo lakše prelaziš na elipsu, hiperbolu i parabolu, jer se
              i tamo stalno kombinuju geometrijski uslovi, analitički zapis i
              uslovi dodira.
            </p>
            <ul>
              <li>
                <strong>U analitičkoj geometriji:</strong> tangentne prave,
                položaj tačke i prelaz između oblika jednačine.
              </li>
              <li>
                <strong>U zadacima sa parametrom:</strong> često se traži da
                odrediš parametar tako da prava bude tangenta.
              </li>
              <li>
                <strong>U konstrukcionim zadacima:</strong> nepoznate su obično
                koordinate centra i poluprečnik.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta prijemni stvarno proverava">
            <p>
              Prijemni retko nagrađuje puko pamćenje. On proverava da li umeš da
              prepoznaš šta je nepoznato i koja formula baš taj uslov prevodi u
              jednačinu. Zato je ključna navika da svaku rečenicu iz teksta
              zadatka odmah pretvoriš u jedan matematički uslov.
            </p>
            <ul>
              <li>
                &ldquo;Kružnica dodiruje <InlineMath>{"x"}</InlineMath>
                -osu&rdquo; znači da je rastojanje centra od{" "}
                <InlineMath>{"x"}</InlineMath>-ose jednako{" "}
                <InlineMath>{"r"}</InlineMath>.
              </li>
              <li>
                &ldquo;Kružnica prolazi kroz tačku{" "}
                <InlineMath>{"P"}</InlineMath>&rdquo; znači da koordinate te
                tačke zadovoljavaju jednačinu kružnice.
              </li>
              <li>
                &ldquo;Prava je tangenta&rdquo; znači da je rastojanje centra od
                prave jednako poluprečniku.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Najvažnija misaona promena">
          <p>
            Tangenta nije posebna nova formula, nego poseban položaj prave u
            odnosu na kružnicu. Zato se mnogo zadataka rešava zdravom
            geometrijskom idejom, a tek onda algebarskim računom.
          </p>
        </InsightCard>

        <MicroCheck
          question='Mikro-provera: koji je prvi korak kada zadatak kaže "nađi jednačinu kružnice"?'
          answer={
            <p>
              Prvi korak nije odmah širenje zagrada, nego izbor nepoznatih.
              Najčešće uzimaš centar <InlineMath>{"C(a,b)"}</InlineMath> i
              poluprečnik <InlineMath>{"r"}</InlineMath>, pa tek onda svaku datu
              informaciju prevodiš u jednačinu za{" "}
              <InlineMath>{"a"}</InlineMath>, <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"r"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ JEDNAČINE KRUŽNICE ═══════════ */}
      <LessonSection
        id="modeli"
        eyebrow="Osnovni modeli"
        title="Kako izgleda kružnica u koordinatnom sistemu"
        description="Kružnica je skup svih tačaka u ravni koje su od jednog fiksnog centra udaljene za isti iznos r. Ta definicija već sama vodi do centralne jednačine. Opšti oblik dobijaš kada razviješ kvadrate i središ članove."
      >
        <div className={s.grid2}>
          <SectionCard title="Centralna jednačina">
            <p>
              Ako je centar kružnice <InlineMath>{"C(a,b)"}</InlineMath>, a
              poluprečnik <InlineMath>{"r>0"}</InlineMath>, onda svaka tačka{" "}
              <InlineMath>{"M(x,y)"}</InlineMath> na kružnici zadovoljava uslov
              da je rastojanje <InlineMath>{"CM"}</InlineMath> jednako{" "}
              <InlineMath>{"r"}</InlineMath>.
            </p>
            <MathBlock>{"(x-a)^2+(y-b)^2=r^2"}</MathBlock>
            <p>
              Ovo je najbolji oblik kada treba brzo da pročitaš centar i
              poluprečnik. Iz jednačine odmah vidiš:
            </p>
            <ul>
              <li>
                centar je <InlineMath>{"C(a,b)"}</InlineMath>
              </li>
              <li>
                poluprečnik je <InlineMath>{"r"}</InlineMath>
              </li>
              <li>
                znaci u zagradama često zbune: u jednačini{" "}
                <InlineMath>{"x-3"}</InlineMath> odgovara koordinata{" "}
                <InlineMath>{"3"}</InlineMath>, a u jednačini{" "}
                <InlineMath>{"y+2"}</InlineMath> odgovara koordinata{" "}
                <InlineMath>{"-2"}</InlineMath>
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Opšta jednačina">
            <p>
              Kada razviješ kvadrate iz centralnog oblika, dobijaš opšti oblik
              kružnice:
            </p>
            <MathBlock>{"x^2+y^2+Dx+Ey+F=0"}</MathBlock>
            <p>
              Za kružnicu je važno da su koeficijenti uz{" "}
              <InlineMath>{"x^2"}</InlineMath> i{" "}
              <InlineMath>{"y^2"}</InlineMath> jednaki, a da nema člana{" "}
              <InlineMath>{"xy"}</InlineMath>. Prelaz nazad u centralni oblik
              radi se kompletiranjem kvadrata:
            </p>
            <MathBlock>
              {
                "x^2+Dx=\\left(x+\\tfrac{D}{2}\\right)^2-\\tfrac{D^2}{4}, \\qquad y^2+Ey=\\left(y+\\tfrac{E}{2}\\right)^2-\\tfrac{E^2}{4}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\left(x+\\tfrac{D}{2}\\right)^2+\\left(y+\\tfrac{E}{2}\\right)^2=\\tfrac{D^2+E^2}{4}-F"
              }
            </MathBlock>
            <p>Odavde odmah sledi:</p>
            <MathBlock>
              {
                "C\\!\\left(-\\tfrac{D}{2},-\\tfrac{E}{2}\\right), \\qquad r=\\sqrt{\\tfrac{D^2+E^2}{4}-F}"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Primer 1: brzo čitanje">
            <p>
              Iz <InlineMath>{"(x-3)^2+(y+2)^2=16"}</InlineMath> čitaš centar{" "}
              <InlineMath>{"C(3,-2)"}</InlineMath> i poluprečnik{" "}
              <InlineMath>{"r=4"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Primer 2: kompletiranje kvadrata">
            <p>
              Iz <InlineMath>{"x^2+y^2-6x+4y-12=0"}</InlineMath> dobijaš{" "}
              <InlineMath>{"(x-3)^2+(y+2)^2=25"}</InlineMath>, pa je{" "}
              <InlineMath>{"C(3,-2)"}</InlineMath>,{" "}
              <InlineMath>{"r=5"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Kontrola smisla">
            <p>
              Ako posle sređivanja dobiješ{" "}
              <InlineMath>{"r^2<0"}</InlineMath>, onda ne postoji realna
              kružnica. Ako je <InlineMath>{"r^2=0"}</InlineMath>, dobijaš
              degenerisan slučaj: jednu tačku.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto izraz x^2+y^2+2x-4y+1=0 može biti kružnica, a 2x^2+y^2-4=0 ne?"
          answer={
            <p>
              U prvom izrazu su koeficijenti uz <InlineMath>{"x^2"}</InlineMath>{" "}
              i <InlineMath>{"y^2"}</InlineMath> jednaki i nema člana{" "}
              <InlineMath>{"xy"}</InlineMath>, pa posle sređivanja dobijaš
              kružnicu. U drugom izrazu koeficijenti uz{" "}
              <InlineMath>{"x^2"}</InlineMath> i{" "}
              <InlineMath>{"y^2"}</InlineMath> nisu jednaki, pa ne dobijaš
              kružnicu nego drugu krivu drugog reda.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ USLOV DODIRA ═══════════ */}
      <LessonSection
        id="dodir"
        eyebrow="Uslov dodira"
        title="Tangenta nastaje kada rastojanje centra od prave postane baš poluprečnik"
        description="Ako je data kružnica sa centrom C(a,b) i poluprečnikom r, a prava p: Ax+By+C=0, onda sve zavisi od rastojanja centra od te prave. To rastojanje određuje da li prava seče kružnicu, dodiruje je ili je potpuno spoljašnja."
      >
        <div className={s.grid2}>
          <SectionCard title="Geometrijsko tumačenje">
            <p>
              Iz centra kružnice povuci normalu na pravu. Njeno podnožje označi
              sa <InlineMath>{"H"}</InlineMath>. Tada duž{" "}
              <InlineMath>{"CH"}</InlineMath> predstavlja najmanje rastojanje
              centra od prave.
            </p>
            <MathBlock>
              {"d(C,p)=\\frac{|Aa+Bb+C|}{\\sqrt{A^2+B^2}}"}
            </MathBlock>
            <p>Sada dobijaš tri položaja:</p>
            <ul>
              <li>
                <strong>
                  Ako je <InlineMath>{"d<r"}</InlineMath>
                </strong>
                , prava seče kružnicu u dve tačke.
              </li>
              <li>
                <strong>
                  Ako je <InlineMath>{"d=r"}</InlineMath>
                </strong>
                , prava je tangenta.
              </li>
              <li>
                <strong>
                  Ako je <InlineMath>{"d>r"}</InlineMath>
                </strong>
                , prava nema zajedničkih tačaka sa kružnicom.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Algebarsko tumačenje preko diskriminante">
            <p>
              Ako je prava data u obliku <InlineMath>{"y=mx+n"}</InlineMath>,
              često je zgodno zameniti taj izraz u jednačinu kružnice. Dobija se
              kvadratna jednačina po <InlineMath>{"x"}</InlineMath> ili po{" "}
              <InlineMath>{"y"}</InlineMath>. Tangenta znači da sistem ima tačno
              jedno rešenje.
            </p>
            <MathBlock>{"\\Delta = 0"}</MathBlock>
            <p>
              Ovaj pristup je posebno koristan kada tražiš pravu sa nepoznatim
              nagibom <InlineMath>{"m"}</InlineMath>, na primer tangente kroz
              zadatu spoljašnju tačku. Tada diskriminanta prirodno daje jednačinu
              za parametar.
            </p>
            <p>Na prijemnom važi praktično pravilo:</p>
            <ul>
              <li>
                ako je prava već data u implicitnom obliku, najbrži je uslov
                rastojanja
              </li>
              <li>
                ako je prava data kao familija{" "}
                <InlineMath>{"y=mx+n"}</InlineMath>, diskriminanta je često
                preglednija
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Sečica">
            <p>
              Kada je <InlineMath>{"d(C,p)<r"}</InlineMath>, prava prolazi kroz
              unutrašnjost kružnice i dobijaš dve presečne tačke.
            </p>
          </SectionCard>
          <SectionCard title="Tangenta">
            <p>
              Kada je <InlineMath>{"d(C,p)=r"}</InlineMath>, prava ima tačno
              jednu zajedničku tačku sa kružnicom i normalna je na odgovarajući
              poluprečnik.
            </p>
          </SectionCard>
          <SectionCard title="Spoljašnja prava">
            <p>
              Kada je <InlineMath>{"d(C,p)>r"}</InlineMath>, prava je predaleko
              od centra i kružnica je ne dodiruje.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Paralelne tangente">
          <p>
            Ako tražiš tangente paralelne datoj pravoj{" "}
            <InlineMath>{"Ax+By+C_0=0"}</InlineMath>, ne menjaš koeficijente{" "}
            <InlineMath>{"A"}</InlineMath> i <InlineMath>{"B"}</InlineMath>.
            Menjaš samo slobodan član i posmatraš familiju{" "}
            <InlineMath>{"Ax+By+\\lambda=0"}</InlineMath>. Paralelne prave imaju
            isti normalni vektor.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto je apsolutna vrednost obavezna u formuli za rastojanje?"
          answer={
            <p>
              Zato što izraz <InlineMath>{"Aa+Bb+C"}</InlineMath> može biti i
              pozitivan i negativan, u zavisnosti sa koje strane prave leži
              centar. Rastojanje nikada ne može biti negativno, pa zato mora da
              stoji apsolutna vrednost.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KONSTRUKCIONI MODELI ═══════════ */}
      <LessonSection
        id="konstrukcije"
        eyebrow="Konstrukcioni modeli"
        title="Kako iz uslova sastavljaš jednačinu kružnice"
        description="Veliki broj prijemnih zadataka svodi se na isto: neka su nepoznati centar C(a,b) i poluprečnik r, pa svaku rečenicu iz zadatka pretvoriš u jedan uslov. Kružnica nastaje tek kada imaš dovoljno jednačina da odrediš a, b i r."
      >
        <div className={s.grid3}>
          <SectionCard title="Dodir sa x-osom">
            <p>
              Pošto je <InlineMath>{"x"}</InlineMath>-osa prava{" "}
              <InlineMath>{"y=0"}</InlineMath>, važi{" "}
              <InlineMath>{"|b|=r"}</InlineMath>. Ako je centar u prvom ili
              četvrtom kvadrantu, znak se određuje iz položaja centra.
            </p>
          </SectionCard>
          <SectionCard title="Dodir sa y-osom">
            <p>
              Pošto je <InlineMath>{"y"}</InlineMath>-osa prava{" "}
              <InlineMath>{"x=0"}</InlineMath>, dobijaš{" "}
              <InlineMath>{"|a|=r"}</InlineMath>. Ovo je posebno korisno kada
              kružnica dodiruje obe ose.
            </p>
          </SectionCard>
          <SectionCard title="Prolazak kroz tačku">
            <p>
              Ako kružnica prolazi kroz{" "}
              <InlineMath>{"P(x_0,y_0)"}</InlineMath>, onda koordinate te tačke
              zadovoljavaju jednačinu:{" "}
              <InlineMath>{"(x_0-a)^2+(y_0-b)^2=r^2"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Dodir sa pravom">
            <p>
              Za pravu <InlineMath>{"Ax+By+C=0"}</InlineMath> uslov je{" "}
              <InlineMath>
                {"\\frac{|Aa+Bb+C|}{\\sqrt{A^2+B^2}}=r"}
              </InlineMath>
              . Ovaj uslov spaja geometriju i algebru u jednom potezu.
            </p>
          </SectionCard>
          <SectionCard title="Dodir sa obe ose">
            <p>
              Ako je centar u prvom kvadrantu, iz{" "}
              <InlineMath>{"|a|=r"}</InlineMath> i{" "}
              <InlineMath>{"|b|=r"}</InlineMath> sledi{" "}
              <InlineMath>{"a=r"}</InlineMath>,{" "}
              <InlineMath>{"b=r"}</InlineMath>. Zato je centar oblika{" "}
              <InlineMath>{"C(r,r)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Broj rešenja">
            <p>
              Konstrukcioni zadaci često daju dve kružnice. To se dešava kada ista
              tačka ili ista prava može da bude tangencijalno povezana sa dva
              različita poluprečnika.
            </p>
          </SectionCard>
        </div>

        <SectionCard title="Ispitna rutina u 4 koraka">
          <ol>
            <li>
              Uzmi centralni oblik{" "}
              <InlineMath>{"(x-a)^2+(y-b)^2=r^2"}</InlineMath>, osim ako zadatak
              izričito traži opšti oblik na kraju.
            </li>
            <li>
              Označi nepoznate <InlineMath>{"a"}</InlineMath>,{" "}
              <InlineMath>{"b"}</InlineMath> i <InlineMath>{"r"}</InlineMath>, pa
              pročitaj svaku rečenicu kao geometrijski uslov.
            </li>
            <li>
              Prevedi uslove u jednačine: dodir sa osom, prolazak kroz tačku,
              dodir sa pravom, položaj centra.
            </li>
            <li>
              Tek posle rešavanja sistema po potrebi razvijaj zagrade i pređi u
              opšti oblik.
            </li>
          </ol>
        </SectionCard>

        <MicroCheck
          question='Mikro-provera: zašto kod "kružnica dodiruje obe ose i centar je u prvom kvadrantu" odmah pišemo C(r,r)?'
          answer={
            <p>
              Zato što su rastojanja centra od obe ose jednaka poluprečniku. U
              prvom kvadrantu su koordinate centra pozitivne, pa iz{" "}
              <InlineMath>{"|a|=r"}</InlineMath> i{" "}
              <InlineMath>{"|b|=r"}</InlineMath> sledi{" "}
              <InlineMath>{"a=r"}</InlineMath> i{" "}
              <InlineMath>{"b=r"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak: od čitanja jednačine do konstrukcije tangenti"
        description="U primerima ispod cilj nije samo konačan rezultat, već način razmišljanja. Obrati pažnju koje nepoznate biramo i zašto je neka metoda kraća od druge."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: iz opšte jednačine pročitaj centar i poluprečnik
            </h3>
            <p>
              Odredi centar i poluprečnik kružnice{" "}
              <InlineMath>{"x^2+y^2-6x+2y-6=0"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Grupiši članove po promenljivama"
              >
                <p>
                  Članove sa <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath> razdvoji i prebaci slobodan
                  član na drugu stranu:
                </p>
                <MathBlock>{"x^2-6x+y^2+2y=6"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Kompletiraj kvadrate">
                <p>
                  Za <InlineMath>{"x^2-6x"}</InlineMath> dodaješ{" "}
                  <InlineMath>{"9"}</InlineMath>, a za{" "}
                  <InlineMath>{"y^2+2y"}</InlineMath> dodaješ{" "}
                  <InlineMath>{"1"}</InlineMath>. To moraš dodati na obe strane
                  jednačine:
                </p>
                <MathBlock>{"(x-3)^2+(y+1)^2=6+9+1=16"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Pročitaj geometrijski smisao">
                <p>
                  Sada je jednačina u centralnom obliku, pa odmah čitaš:
                </p>
                <MathBlock>{"C(3,-1), \\qquad r=4"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: nađi tangente paralelne zadatoj pravoj
            </h3>
            <p>
              Nađi jednačine tangenti kružnice{" "}
              <InlineMath>{"(x-2)^2+(y+1)^2=25"}</InlineMath> koje su paralelne
              pravoj <InlineMath>{"3x-4y+1=0"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prepoznaj šta ostaje isto"
              >
                <p>
                  Paralelne prave imaju iste koeficijente uz{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath>, pa tražene tangente imaju
                  oblik:
                </p>
                <MathBlock>{"3x-4y+\\lambda=0"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Pročitaj centar i poluprečnik"
              >
                <p>Iz jednačine kružnice dobijaš:</p>
                <MathBlock>{"C(2,-1), \\qquad r=5"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Primeni uslov dodira">
                <p>
                  Za tangentu mora da važi rastojanje centra od prave jednako
                  poluprečniku:
                </p>
                <MathBlock>
                  {
                    "\\frac{|3\\cdot 2-4\\cdot(-1)+\\lambda|}{\\sqrt{3^2+(-4)^2}}=5"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "\\frac{|10+\\lambda|}{5}=5 \\quad \\Longrightarrow \\quad |10+\\lambda|=25"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Dobij dve vrednosti">
                <p>Apsolutna vrednost daje dva slučaja:</p>
                <MathBlock>
                  {
                    "10+\\lambda=25 \\Rightarrow \\lambda=15"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "10+\\lambda=-25 \\Rightarrow \\lambda=-35"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "3x-4y+15=0 \\qquad \\text{i} \\qquad 3x-4y-35=0"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: konstruiši kružnicu tangentnu obema osama
            </h3>
            <p>
              Nađi jednačinu kružnice čiji je centar u prvom kvadrantu, koja
              dodiruje obe ose i prolazi kroz tačku{" "}
              <InlineMath>{"P(4,1)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Iskoristi dodir sa osama">
                <p>
                  Pošto je centar u prvom kvadrantu i kružnica dodiruje obe ose,
                  važi:
                </p>
                <MathBlock>{"C(r,r)"}</MathBlock>
                <p>Zato je jednačina kružnice:</p>
                <MathBlock>{"(x-r)^2+(y-r)^2=r^2"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Uvrsti tačku kroz koju kružnica prolazi"
              >
                <p>
                  Koordinate tačke <InlineMath>{"P(4,1)"}</InlineMath> moraju
                  zadovoljiti jednačinu:
                </p>
                <MathBlock>{"(4-r)^2+(1-r)^2=r^2"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Sredi jednačinu po <InlineMath>{"r"}</InlineMath>
                  </>
                }
              >
                <MathBlock>
                  {"16-8r+r^2+1-2r+r^2=r^2"}
                </MathBlock>
                <MathBlock>{"r^2-10r+17=0"}</MathBlock>
                <MathBlock>
                  {
                    "r=\\frac{10\\pm\\sqrt{100-68}}{2}=5\\pm 2\\sqrt{2}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Napiši obe kružnice">
                <MathBlock>
                  {
                    "(x-(5+2\\sqrt{2}))^2+(y-(5+2\\sqrt{2}))^2=(5+2\\sqrt{2})^2"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "(x-(5-2\\sqrt{2}))^2+(y-(5-2\\sqrt{2}))^2=(5-2\\sqrt{2})^2"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: tangente kroz spoljašnju tačku preko diskriminante
            </h3>
            <p>
              Nađi tangente na kružnicu{" "}
              <InlineMath>{"x^2+y^2=5"}</InlineMath> koje prolaze kroz tačku{" "}
              <InlineMath>{"A(0,3)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Napiši familiju pravih kroz zadatu tačku"
              >
                <p>
                  Svaka prava kroz <InlineMath>{"A(0,3)"}</InlineMath> može da
                  se zapiše kao:
                </p>
                <MathBlock>{"y=kx+3"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Uvrsti u jednačinu kružnice"
              >
                <MathBlock>{"x^2+(kx+3)^2=5"}</MathBlock>
                <MathBlock>{"(1+k^2)x^2+6kx+4=0"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Nametni uslov dodira">
                <p>
                  Tangenta znači da kvadratna jednačina ima jedno rešenje, pa je
                  diskriminanta jednaka nuli:
                </p>
                <MathBlock>
                  {"\\Delta=(6k)^2-4(1+k^2)\\cdot 4=0"}
                </MathBlock>
                <MathBlock>{"36k^2-16-16k^2=0"}</MathBlock>
                <MathBlock>
                  {"20k^2=16 \\Rightarrow k^2=\\frac{4}{5}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zapiši obe tangente">
                <MathBlock>{"k=\\pm \\frac{2}{\\sqrt{5}}"}</MathBlock>
                <MathBlock>
                  {
                    "y=\\frac{2}{\\sqrt{5}}x+3 \\qquad \\text{i} \\qquad y=-\\frac{2}{\\sqrt{5}}x+3"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Formula ne vredi mnogo bez kratkog značenja"
        description="Sledeće formule su jezgro cele lekcije. Ne uči ih kao odvojene činjenice, nego uz situaciju u kojoj ih koristiš."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Centralna jednačina"
            formula="(x-a)^2+(y-b)^2=r^2"
            note="Najbrže čitaš centar i poluprečnik. Ovo je polazni oblik za većinu konstrukcionih zadataka."
          />
          <FormulaCard
            title="Opšta jednačina"
            formula="x^2+y^2+Dx+Ey+F=0"
            note={
              <>
                Posle kompletiranja kvadrata dobijaš centar{" "}
                <InlineMath>
                  {"\\left(-\\frac{D}{2},-\\frac{E}{2}\\right)"}
                </InlineMath>{" "}
                i poluprečnik{" "}
                <InlineMath>
                  {"\\sqrt{\\frac{D^2+E^2}{4}-F}"}
                </InlineMath>
                .
              </>
            }
          />
          <FormulaCard
            title="Rastojanje centra od prave"
            formula={"\\frac{|Aa+Bb+C|}{\\sqrt{A^2+B^2}}=r"}
            note={
              <>
                Osnovni uslov da prava{" "}
                <InlineMath>{"Ax+By+C=0"}</InlineMath> bude tangenta na kružnicu
                sa centrom <InlineMath>{"C(a,b)"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Familija pravih"
            formula={"Ax+By+\lambda=0"}
            note={
              <>
                Ako su tangente paralelne zadatoj pravoj, koeficijenti{" "}
                <InlineMath>{"A"}</InlineMath> i{" "}
                <InlineMath>{"B"}</InlineMath> ostaju isti, a menja se samo{" "}
                <InlineMath>{"\\lambda"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Tangenta na x^2+y^2=r^2"
            formula="xx_1+yy_1=r^2"
            note={
              <>
                Brza formula kada znaš tačku dodira{" "}
                <InlineMath>{"T(x_1,y_1)"}</InlineMath> na kružnici sa centrom u
                koordinatnom početku.
              </>
            }
          />
          <FormulaCard
            title="Diskriminanta"
            formula={"\Delta=0"}
            note="Kada je prava data preko nepoznatog nagiba ili parametra, zamena u jednačinu kružnice i uslov Delta=0 često daju najkraći račun."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje se stalno ponavljaju i kako da ih presečeš"
        description="Ove greške nisu slučajne. Nastaju baš na mestima gde učenik krene na pamćenje umesto na razumevanje."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljena apsolutna vrednost</h3>
            <p>
              U formuli za rastojanje mnogi pišu{" "}
              <InlineMath>{"Aa+Bb+C"}</InlineMath> umesto{" "}
              <InlineMath>{"|Aa+Bb+C|"}</InlineMath>. Posledica je pogrešan
              znak i izgubljeno rešenje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešno čitanje centra</h3>
            <p>
              Iz <InlineMath>{"(x-4)^2+(y+3)^2=9"}</InlineMath> centar nije{" "}
              <InlineMath>{"(4,3)"}</InlineMath>, nego{" "}
              <InlineMath>{"(4,-3)"}</InlineMath>. Znak u zagradi se čita
              obrnuto.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Menjanje pogrešnih koeficijenata
            </h3>
            <p>
              Kod tangenti paralelnih zadatoj pravoj učenici menjaju i{" "}
              <InlineMath>{"A"}</InlineMath> i <InlineMath>{"B"}</InlineMath>.
              To menja pravac prave. Za paralelnost menjaš samo slobodan član.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Prebrzo odbacivanje drugog rešenja
            </h3>
            <p>
              Konstrukcioni zadaci vrlo često daju dve kružnice. Ako ne proveriš
              oba znaka ili oba korena, lako ostaneš bez potpunog odgovora.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kompletiranje kvadrata napola
            </h3>
            <p>
              Dodavanje <InlineMath>{"9"}</InlineMath> uz{" "}
              <InlineMath>{"x^2-6x"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath> uz{" "}
              <InlineMath>{"y^2+2y"}</InlineMath> mora da bude uravnoteženo na
              drugoj strani. U suprotnom dobijaš pogrešan poluprečnik.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"r"}</InlineMath> i{" "}
              <InlineMath>{"r^2"}</InlineMath>
            </h3>
            <p>
              Uslov dodira porediš sa <InlineMath>{"r"}</InlineMath>, a ne sa{" "}
              <InlineMath>{"r^2"}</InlineMath>. Tek u centralnoj jednačini na
              desnoj strani stoji <InlineMath>{"r^2"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se tema pojavljuje na ispitu i šta moraš da proveriš"
        description="Na prijemnom se kružnica najčešće ne pojavljuje kao izolovana tema, već zajedno sa pravom, parametrom ili uslovom konstrukcije. Zato je korisno da već unapred znaš obrazac zadatka koji gledaš."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipični zadaci">
            <ul>
              <li>
                <strong>Odredi jednačinu kružnice</strong> koja dodiruje jednu
                ili obe ose i prolazi kroz zadatu tačku.
              </li>
              <li>
                <strong>Nađi tangente</strong> na zadatu kružnicu koje su
                paralelne datoj pravoj ili prolaze kroz zadatu spoljašnju tačku.
              </li>
              <li>
                <strong>Odredi parametar</strong> tako da prava i kružnica budu
                tangentne.
              </li>
              <li>
                <strong>Prevedi opšti oblik u centralni</strong> i protumači
                geometrijski položaj.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Brza kontrolna lista">
            <ul>
              <li>
                <strong>Ko su nepoznate?</strong> Da li tražiš{" "}
                <InlineMath>{"a,b,r"}</InlineMath>, parametar{" "}
                <InlineMath>{"\\lambda"}</InlineMath>, ili nagib{" "}
                <InlineMath>{"k"}</InlineMath>?
              </li>
              <li>
                <strong>Koji oblik je najzgodniji?</strong> Centralni za čitanje
                centra, implicitni za rastojanje, eksplicitni za diskriminantu.
              </li>
              <li>
                <strong>Da li postoji apsolutna vrednost?</strong> Ako je
                zaboraviš, odgovor je obično nepotpun.
              </li>
              <li>
                <strong>Ima li dva rešenja?</strong> Tangente, poluprečnici i
                konstrukcione kružnice često dolaze u paru.
              </li>
              <li>
                <strong>Ima li geometrijskog smisla?</strong> Na kraju proveri
                da li je <InlineMath>{"r>0"}</InlineMath> i da li dobijeni
                položaj odgovara tekstu zadatka.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Dobra ispitna rutina">
          <p>
            Izaberi model, napiši uslove, reši sistem, pa tek onda sređuj zapis.
            Ko krene obrnuto, obično se izgubi u algebri pre nego što razume šta
            zapravo računa.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li umeš samostalno"
        description="Pokušaj svaku vežbu da rešiš bez gledanja rešenja. Ako zapneš, vrati se i proveri da li si pravilno izabrao nepoznate i preveo uslove."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: čitanje opšte jednačine"
            problem={
              <p>
                Odredi centar i poluprečnik kružnice{" "}
                <InlineMath>{"x^2+y^2+8x-6y-11=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Grupiši članove i kompletiraj kvadrate:</p>
                <MathBlock>{"x^2+8x+y^2-6y=11"}</MathBlock>
                <MathBlock>
                  {"(x+4)^2+(y-3)^2=11+16+9=36"}
                </MathBlock>
                <p>
                  Zato je centar <InlineMath>{"C(-4,3)"}</InlineMath>, a
                  poluprečnik <InlineMath>{"r=6"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2: položaj prave i kružnice"
            problem={
              <p>
                Ispitaj da li je prava{" "}
                <InlineMath>{"3x-4y-6=0"}</InlineMath> tangenta, sečica ili
                spoljašnja prava kružnice{" "}
                <InlineMath>{"(x-1)^2+(y+2)^2=16"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Centar je <InlineMath>{"C(1,-2)"}</InlineMath>, poluprečnik{" "}
                  <InlineMath>{"r=4"}</InlineMath>. Računaj rastojanje:
                </p>
                <MathBlock>
                  {
                    "d(C,p)=\\frac{|3\\cdot 1-4\\cdot(-2)-6|}{\\sqrt{3^2+(-4)^2}}=\\frac{|3+8-6|}{5}=1"
                  }
                </MathBlock>
                <p>
                  Pošto je <InlineMath>{"1<4"}</InlineMath>, prava je sečica.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3: tangente paralelne pravoj"
            problem={
              <p>
                Nađi tangente kružnice{" "}
                <InlineMath>{"(x+1)^2+(y-3)^2=25"}</InlineMath> paralelne
                pravoj <InlineMath>{"x+2y-5=0"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Tražene prave imaju oblik{" "}
                  <InlineMath>{"x+2y+\\lambda=0"}</InlineMath>. Centar kružnice
                  je <InlineMath>{"C(-1,3)"}</InlineMath>, a{" "}
                  <InlineMath>{"r=5"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\frac{|-1+2\\cdot 3+\\lambda|}{\\sqrt{1^2+2^2}}=5 \\Rightarrow \\frac{|5+\\lambda|}{\\sqrt{5}}=5"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "|5+\\lambda|=5\\sqrt{5} \\Rightarrow \\lambda=-5\\pm 5\\sqrt{5}"
                  }
                </MathBlock>
                <p>Zato su tangente:</p>
                <MathBlock>
                  {
                    "x+2y-5+5\\sqrt{5}=0 \\qquad \\text{i} \\qquad x+2y-5-5\\sqrt{5}=0"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4: kružnica sa centrom na x-osi"
            problem={
              <p>
                Nađi jednačine kružnica čiji je centar na{" "}
                <InlineMath>{"x"}</InlineMath>-osi, koje dodiruju pravu{" "}
                <InlineMath>{"y=4"}</InlineMath> i prolaze kroz tačku{" "}
                <InlineMath>{"P(1,1)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Neka je centar <InlineMath>{"C(a,0)"}</InlineMath>. Dodir sa
                  pravom <InlineMath>{"y=4"}</InlineMath> znači da je
                  poluprečnik <InlineMath>{"r=4"}</InlineMath>. Pošto kružnica
                  prolazi kroz <InlineMath>{"P(1,1)"}</InlineMath>, važi:
                </p>
                <MathBlock>{"(1-a)^2+(1-0)^2=4^2"}</MathBlock>
                <MathBlock>
                  {"(1-a)^2+1=16 \\Rightarrow (1-a)^2=15"}
                </MathBlock>
                <MathBlock>{"a=1\\pm \\sqrt{15}"}</MathBlock>
                <p>Dobijaš dve kružnice:</p>
                <MathBlock>
                  {"(x-(1+\\sqrt{15}))^2+y^2=16"}
                </MathBlock>
                <MathBlock>
                  {"(x-(1-\\sqrt{15}))^2+y^2=16"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5: tangente kroz spoljašnju tačku"
            problem={
              <p>
                Nađi tangente na kružnicu{" "}
                <InlineMath>{"x^2+y^2=9"}</InlineMath> koje prolaze kroz tačku{" "}
                <InlineMath>{"A(0,5)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Prava kroz <InlineMath>{"A(0,5)"}</InlineMath> ima oblik{" "}
                  <InlineMath>{"y=kx+5"}</InlineMath>. Uvrsti u jednačinu
                  kružnice:
                </p>
                <MathBlock>
                  {"x^2+(kx+5)^2=9 \\Rightarrow (1+k^2)x^2+10kx+16=0"}
                </MathBlock>
                <p>
                  Za tangentu mora biti{" "}
                  <InlineMath>{"\\Delta=0"}</InlineMath>:
                </p>
                <MathBlock>
                  {"(10k)^2-4(1+k^2)\\cdot 16=0"}
                </MathBlock>
                <MathBlock>
                  {
                    "100k^2-64-64k^2=0 \\Rightarrow 36k^2=64 \\Rightarrow k^2=\\frac{16}{9}"
                  }
                </MathBlock>
                <MathBlock>{"k=\\pm \\frac{4}{3}"}</MathBlock>
                <p>Tangente su:</p>
                <MathBlock>
                  {
                    "y=\\frac{4}{3}x+5 \\qquad \\text{i} \\qquad y=-\\frac{4}{3}x+5"
                  }
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažnija poruka lekcije"
        description="Kružnica nije skup odvojenih formula. Ona je jedan model sa tri ključne ideje."
      >
        <InsightCard title="Tri stuba lekcije">
          <ul>
            <li>
              Centralni oblik govori gde je centar i koliki je poluprečnik.
            </li>
            <li>
              Svaki geometrijski uslov daje jednu jednačinu za{" "}
              <InlineMath>{"a"}</InlineMath>, <InlineMath>{"b"}</InlineMath> i{" "}
              <InlineMath>{"r"}</InlineMath>.
            </li>
            <li>
              Tangenta nastaje kada je rastojanje centra od prave jednako
              poluprečniku.
            </li>
          </ul>
          <MathBlock>
            {"\\text{dodir} \\Longleftrightarrow d(C,p)=r"}
          </MathBlock>
          <p>
            Ako ovu jednu relaciju stvarno razumeš, pola zadataka iz dodira
            prave i kružnice prestaje da izgleda &ldquo;specijalno&rdquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš pre nego što pređeš dalje"
        description="Ovu lekciju ne završavaš pamćenjem mnogo formula, nego sigurnošću u nekoliko temeljnih koraka."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Čitaj centralni oblik</h3>
            <p>
              Iz <InlineMath>{"(x-a)^2+(y-b)^2=r^2"}</InlineMath> odmah čitaš
              centar <InlineMath>{"C(a,b)"}</InlineMath> i poluprečnik{" "}
              <InlineMath>{"r"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Sredi opšti oblik</h3>
            <p>
              Opšta jednačina dobija smisao tek posle kompletiranja kvadrata. Bez
              toga ne vidiš geometriju.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Dodir je rastojanje</h3>
            <p>
              Za pravu <InlineMath>{"Ax+By+C=0"}</InlineMath> tangenta nastaje
              kada je{" "}
              <InlineMath>
                {"\\frac{|Aa+Bb+C|}{\\sqrt{A^2+B^2}}=r"}
              </InlineMath>
              .
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Svaki uslov je jednačina</h3>
            <p>
              Dodir sa osom, prolazak kroz tačku i položaj centra zajedno grade
              sistem koji određuje kružnicu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak su ostale krive drugog reda. Tamo ćeš videti da
          se ista ideja uslova dodira pojavljuje i kod elipse, hiperbole i
          parabole, samo u drugačijem obliku.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
