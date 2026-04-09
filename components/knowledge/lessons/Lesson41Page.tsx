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
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#intuicija", label: "Intuicija i kružnica" },
  { href: "#osnovni", label: "Osnovni oblici" },
  { href: "#transformacije", label: "Svođenja i znak" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson41Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 41"
        title={
          <>
            Trigonometrijske{" "}
            <span className={cs.tHeroAccent}>nejednačine</span>
          </>
        }
        description="Kod jednačina si tražio pojedinačne uglove. Kod nejednačina tražiš čitave lukove i intervale. Zato ovde nije dovoljno da pronađeš granične tačke. Moraš da razumeš gde je funkcija iznad, a gde ispod zadate vrednosti, kako radi perioda i kada krajnje tačke ulaze u rešenje."
        heroImageSrc="/api/lessons/41/hero"
        heroImageAlt="Apstraktna matematička ilustracija sa trigonometrijskim talasom, kružnicom i intervalima"
        cards={[
          {
            label: "Šta ćeš moći",
            description:
              "Da rešiš bazne i složenije trigonometrijske nejednačine, pravilno zapišeš intervale rešenja i bez greške dodaš sve cikluse.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da nađeš samo granične uglove, ali ne odabereš pravi luk ili pogrešno zatvoriš krajeve kada menjaš znak nejednakosti.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brza vizuelizacija na kružnici, svođenje linearnog oblika na jedan sinus i pažljivo presecanje sa intervalom iz zadatka.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "95-120 minuta uz detaljnu teoriju, vođene primere, interaktivni deo i završne vežbe.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 33-40: trigonometrijska kružnica, identiteti, osnovne i složenije trigonometrijske jednačine.",
          },
          {
            label: "Glavna veština",
            description:
              "Da od granične jednačine dođeš do pravilno zapisanog skupa intervala i tačno odrediš koji krajevi pripadaju rešenju.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za sin x, cos x, tan x i linearni oblik a sin x + b cos x, sa obojenim delovima skupa rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde prvi put ozbiljno prelaziš sa pojedinačnih rešenja na čitave skupove rešenja"
        description="Trigonometrijske nejednačine su važan korak jer te teraju da trigonometriju ne vidiš samo kao račun, nego kao geometrijsku sliku i znak funkcije. Na prijemnom to znači da više ne dobijaš poene za puko pamćenje formule, već za to da razumeš gde je funkcija pozitivna, veća od neke granice ili između dve vrednosti."
      >
        <div className={s.grid3}>
          <SectionCard title="Za prelaz sa jednakosti na znak">
            <p>
              Kod jednačine tražiš gde je funkcija jednaka nuli ili nekoj
              vrednosti. Kod nejednačine moraš da znaš šta se dešava između tih
              graničnih tačaka. To je suštinski novi nivo razumevanja.
            </p>
          </SectionCard>
          <SectionCard title="Za zadatke sa intervalom">
            <p>
              Veliki broj prijemnih zadataka traži rešenje na intervalu{" "}
              <InlineMath>{"[0,2\\pi]"}</InlineMath>,{" "}
              <InlineMath>{"[-\\pi,\\pi]"}</InlineMath> ili nekom drugom
              ograničenom opsegu. Ako pogrešno dodaš periode ili zaboraviš da
              presečeš domen, gubiš poene iako si bio blizu.
            </p>
          </SectionCard>
          <SectionCard title="Za kasniju analizu funkcija">
            <p>
              Znak funkcije, intervali monotonosti i preseci sa zadatim nivoom
              javljaju se i kasnije u analizi. Ova lekcija te uči da čitaš
              funkciju po intervalima, što je važno daleko van same
              trigonometrije.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ključna pedagoška ideja">
          <p>
            Granična jednačina samo obeležava ivice. Pravo rešenje dobijaš tek
            kada izabereš ispravne intervale između tih ivica ili njihov
            komplement.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ INTUICIJA I KRUŽNICA ═══════════ */}
      <LessonSection
        id="intuicija"
        eyebrow="Intuicija i kružnica"
        title="Zašto nejednačina na kružnici daje lukove, a na realnoj osi intervale"
        description="Najbrže razumevanje dolazi kada spojiš dve slike: jediničnu kružnicu i graf funkcije. Na kružnici vidiš koje tačke imaju dovoljnu ordinatu ili apscisu. Na grafiku vidiš na kojim delovima perioda funkcija leži iznad ili ispod zadate granice."
      >
        <div className={s.grid2}>
          <SectionCard title="Sinus i kosinus na kružnici">
            <ul>
              <li>
                <InlineMath>{"\\sin x"}</InlineMath> je ordinata tačke na
                jediničnoj kružnici.
              </li>
              <li>
                <InlineMath>{"\\cos x"}</InlineMath> je apscisa te iste tačke.
              </li>
              <li>
                Zato <InlineMath>{"\\sin x \\ge a"}</InlineMath> znači: zadrži
                tačke kružnice koje leže iznad horizontale{" "}
                <InlineMath>{"y=a"}</InlineMath>.
              </li>
              <li>
                Slično, <InlineMath>{"\\cos x < a"}</InlineMath> znači: zadrži
                deo kružnice levo od vertikale{" "}
                <InlineMath>{"x=a"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Zašto prvo rešavaš jedan period">
            <ul>
              <li>
                Sinus i kosinus imaju periodu{" "}
                <InlineMath>{"2\\pi"}</InlineMath>, a tangens periodu{" "}
                <InlineMath>{"\\pi"}</InlineMath>.
              </li>
              <li>
                Ako znaš rešenje na jednom osnovnom periodu, znaš obrazac za sve
                ostale.
              </li>
              <li>
                Zato je standardni redosled: jedan period, pa dodavanje svih
                ciklusa, pa presecanje sa zadatim intervalom.
              </li>
              <li>
                Ovaj redosled sprečava da previdiš čitavu jednu porodicu
                rešenja.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Od jednačine do nejednačine"
            formula={"\\sin x = a \\Rightarrow \\text{tačke},\\qquad \\sin x > a \\Rightarrow \\text{lukovi}"}
            note="Jednakost određuje preseke sa zadatom pravom, a nejednačina bira deo između tih preseka ili njegov komplement."
          />
          <FormulaCard
            title="Strogo ili nestrogo"
            formula={">,\\ < \\Rightarrow \\text{otvoreni krajevi},\\qquad \\ge,\\ \\le \\Rightarrow \\text{zatvoreni krajevi}"}
            note="Ovo deluje sitno, ali je jedna od najčešćih formalnih grešaka na prijemnom."
          />
          <FormulaCard
            title="Sinus i kosinus"
            formula={"|\\sin x|\\le 1,\\qquad |\\cos x|\\le 1"}
            note={
              <>
                Ako je desna strana van intervala{" "}
                <InlineMath>{"[-1,1]"}</InlineMath>, često možeš odmah zaključiti
                da rešenja nema ili da su sva realna{" "}
                <InlineMath>{"x"}</InlineMath> dozvoljena.
              </>
            }
          />
          <FormulaCard
            title="Tangens"
            formula={"\\tan x \\text{ je strogo rastuća na }\\left(-\\frac{\\pi}{2}+k\\pi,\\frac{\\pi}{2}+k\\pi\\right)"}
            note="Zato kod tangensa radiš po granama između asimptota, a ne preko cele kružnice odjednom."
          />
          <FormulaCard
            title="Skup rešenja"
            formula={"S=S_0+2k\\pi \\quad \\text{ili} \\quad S=S_0+k\\pi"}
            note={
              <>
                Skup <InlineMath>{"S_0"}</InlineMath> je rešenje na jednom
                periodu. Tek posle njega dodaješ sve pomeraje odgovarajuće
                periode.
              </>
            }
          />
          <FormulaCard
            title="Radni algoritam"
            formula={"\\text{granična jednačina} \\to \\text{test intervala} \\to \\text{svi ciklusi} \\to \\text{presek sa domenom}"}
            note="Ovaj obrazac drži ceo postupak pod kontrolom i sprečava najčešće greške."
          />
        </div>

        <MicroCheck
          question="Mikro-provera: zašto sin x = 1/2 daje dve tačke, a sin x > 1/2 ceo luk?"
          answer={
            <p>
              Zato što jednakost označava samo preseke sa horizontalom{" "}
              <InlineMath>{"y=\\frac{1}{2}"}</InlineMath>, dok stroga
              nejednačina bira sve tačke čija je ordinata veća od{" "}
              <InlineMath>{"\\frac{1}{2}"}</InlineMath>. Na kružnici to više
              nije skup izolovanih tačaka nego čitav luk između preseka.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNI OBLICI ═══════════ */}
      <LessonSection
        id="osnovni"
        eyebrow="Osnovni oblici"
        title={
          "Kako rešavaš nejednačine za sin x, cos x i tan x"
        }
        description="Bazni oblici su osnova svega ostalog. Ako njih vidiš sigurno, onda i složeniji zadaci postaju pregledni jer se gotovo uvek svode upravo na jedan od ovih modela."
      >
        <div className={s.grid2}>
          <SectionCard title="Sinus i kosinus: granična jednačina pa izbor luka">
            <p>
              Kada rešavaš
            </p>
            <MathBlock>
              {"\\sin x \\ge a \\quad \\text{ili} \\quad \\cos x < a,"}
            </MathBlock>
            <p>
              najpre rešavaš odgovarajuću jednačinu{" "}
              <InlineMath>{"\\sin x=a"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos x=a"}</InlineMath>. Time dobijaš granične
              uglove na jednom periodu.
            </p>
            <p>
              Zatim na kružnici ili grafiku biraš deo gde je funkcija iznad,
              odnosno ispod zadate vrednosti.
            </p>
          </SectionCard>
          <SectionCard title="Tangens: radiš po granama između asimptota">
            <p>
              Kod
            </p>
            <MathBlock>
              {"\\tan x > a \\quad \\text{ili} \\quad \\tan x \\le a"}
            </MathBlock>
            <p>
              oslanjaš se na to da je tangens strogo rastući na svakoj grani
              između dve susedne asimptote.
            </p>
            <p>
              To znači da posle granične jednačine{" "}
              <InlineMath>{"\\tan x=a"}</InlineMath> odmah znaš da li uzimaš
              levi ili desni deo svake grane.
            </p>
          </SectionCard>
        </div>

        <div className={s.walkthrough} style={{ marginTop: 18 }}>
          <WalkStep number={1} title="Reši graničnu jednačinu">
            <p>
              Na primer, iz{" "}
              <InlineMath>{"\\sin x \\ge \\frac{1}{2}"}</InlineMath> prvo
              izvlačiš <InlineMath>{"\\sin x=\\frac{1}{2}"}</InlineMath>. To su
              tačke na kojima skup rešenja može da promeni oblik.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Posmatraj jedan osnovni period">
            <p>
              Za sinus i kosinus to je najčešće{" "}
              <InlineMath>{"[0,2\\pi)"}</InlineMath>, a za tangens prirodno
              radiš po intervalima dužine{" "}
              <InlineMath>{"\\pi"}</InlineMath> između asimptota.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Odaberi tačne intervale, ne samo krajnje tačke">
            <p>
              Proveri da li je funkcija veća, manja, barem jednaka ili najviše
              jednaka zadatoj vrednosti. Tu zaista biraš skup rešenja.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Odredi otvorene i zatvorene krajeve">
            <p>
              Strogi znaci <InlineMath>{">"}</InlineMath> i{" "}
              <InlineMath>{"<"}</InlineMath> ne uključuju granične uglove.
              Nestrogi znaci <InlineMath>{"\\ge"}</InlineMath> i{" "}
              <InlineMath>{"\\le"}</InlineMath> ih uključuju, ali samo ako je
              funkcija u tim tačkama definisana.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Dodaj sve cikluse i preseci zadati domen">
            <p>
              Na kraju pišeš rešenje za sva{" "}
              <InlineMath>{"k\\in\\mathbb{Z}"}</InlineMath>, a zatim po potrebi
              uzimaš samo one delove koji upadaju u domen zadatka.
            </p>
          </WalkStep>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Za sinus i kosinus koristi sliku">
            <p>
              Kada se dvoumiš koji interval treba uzeti, skiciraj malu kružnicu.
              Često jedna dobra skica ukloni više grešaka nego pola stranice
              računa.
            </p>
          </SectionCard>
          <SectionCard title="Tangens ima periodu pi">
            <p>
              Zato kod tangensa pišeš{" "}
              <InlineMath>{"k\\pi"}</InlineMath>, a ne{" "}
              <InlineMath>{"2k\\pi"}</InlineMath>. Ova mala razlika menja
              polovinu skupa rešenja.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto kod tan x > a desni kraj intervala ne može biti pi/2 + k*pi sa zatvorenom zagradom?"
          answer={
            <p>
              Zato što tangens u tačkama{" "}
              <InlineMath>{"\\frac{\\pi}{2}+k\\pi"}</InlineMath> nije
              definisan. Čak i kada rešavaš nestrogu nejednačinu, tačke u kojima
              funkcija ne postoji nikada ne mogu pripadati skupu rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ SVOĐENJA I ZNAK ═══════════ */}
      <LessonSection
        id="transformacije"
        eyebrow="Svođenja i znak"
        title="Složenije nejednačine rešavaš tek kada ih vratiš na poznat oblik"
        description="Na prijemnom ne dolazi uvek čist oblik sin x >= a. Često dobiješ proizvod, količnik, linearni zbir a sin x + b cos x ili homogeni izraz drugog stepena. U svakom od tih slučajeva cilj je isti: da zadatak vratiš na baznu nejednačinu koju umeš da čitaš po periodama."
      >
        <div className={s.grid2}>
          <SectionCard title="Linearni oblik i pomoćni ugao">
            <p>
              Izraz <InlineMath>{"a\\sin x+b\\cos x"}</InlineMath> sabijaš u
              jedan sinus:
            </p>
            <MathBlock>{"R\\sin(x+\\varphi)."}</MathBlock>
            <p>
              Tada linearna nejednačina postaje obična nejednačina za sinus sa
              pomerenim argumentom, a amplituda{" "}
              <InlineMath>{"R"}</InlineMath> odmah daje prvu kontrolu da li
              rešenja uopšte mogu postojati.
            </p>
          </SectionCard>
          <SectionCard title="Proizvodi, količnici i homogeni oblici">
            <p>
              Kada na levoj strani imaš proizvod ili količnik, tražiš kritične
              tačke na kojima izraz postaje nula ili nije definisan. Zatim na
              intervalima između njih proveravaš znak.
            </p>
            <p>
              Homogeni izrazi drugog stepena često se posle deljenja sa{" "}
              <InlineMath>{"\\cos^2 x"}</InlineMath> ili{" "}
              <InlineMath>{"\\sin^2 x"}</InlineMath> svode na kvadratnu
              nejednačinu po <InlineMath>{"\\tan x"}</InlineMath>, ali taj korak
              radiš tek pošto proveriš izgubljene slučajeve.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Amplituda"
            formula={"R=\\sqrt{a^2+b^2}"}
            note={
              <>
                Broj <InlineMath>{"R"}</InlineMath> je maksimalna apsolutna
                vrednost izraza{" "}
                <InlineMath>{"a\\sin x+b\\cos x"}</InlineMath>. Zato odmah
                proveravaš da li je desna strana uopšte dostižna.
              </>
            }
          />
          <FormulaCard
            title="Pomoćni ugao"
            formula={"\\cos\\varphi=\\frac{a}{R},\\qquad \\sin\\varphi=\\frac{b}{R}"}
            note={
              <>
                Ugao <InlineMath>{"\\varphi"}</InlineMath> nije trik nego
                precizno podešen pomeraj koji pretvara zbir dva trigonometrijska
                člana u jedan pomeren talas.
              </>
            }
          />
          <FormulaCard
            title="Glavna transformacija"
            formula={"a\\sin x+b\\cos x\\,\\square\\,c \\Longleftrightarrow R\\sin(x+\\varphi)\\,\\square\\,c"}
            note={
              <>
                Simbol <InlineMath>{"\\square"}</InlineMath> ovde predstavlja
                jedan od znakova{" "}
                <InlineMath>{">\\,,<\\,,\\ge\\,,\\le"}</InlineMath>. Posle
                transformacije radiš baznu nejednačinu za sinus.
              </>
            }
          />
          <FormulaCard
            title="Znaci proizvoda"
            formula={"f(x)\\cdot g(x)\\ge 0 \\Longleftrightarrow f(x)\\text{ i }g(x)\\text{ imaju isti znak}"}
            note="U ovim zadacima kritične tačke su nule činilaca. Posle njihovog pronalaženja praviš tabelu znaka ili proveravaš probnim tačkama po intervalima."
          />
          <FormulaCard
            title="Količnik"
            formula={"\\frac{f(x)}{g(x)}\\ge 0 \\Rightarrow g(x)\\ne 0"}
            note="Tačke u kojima je imenilac nula nikada ne ulaze u rešenje, čak i kada znak nejednakosti nije strog."
          />
          <FormulaCard
            title="Homogena nejednačina"
            formula={"A\\sin^2 x+B\\sin x\\cos x+C\\cos^2 x\\,\\square\\,0 \\Rightarrow At^2+Bt+C\\,\\square\\,0,\\quad t=\\tan x"}
            note="Ovo je snažna tehnika, ali tek pošto proveriš šta se dešava kada je činilac kojim deliš jednak nuli."
          />
        </div>

        <InsightCard title="Brzo pravilo za pamćenje">
          <p>
            Prvo tražiš kritične tačke, ali skup rešenja nikada ne zaključuješ
            samo iz njih. Znak moraš proveriti na svakom dobijenom intervalu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri su složeni tako da naučiš i sliku i formalni zapis"
        description="U svakom primeru gledaj isti redosled: granična jednačina, izbor pravog dela perioda i konačan zapis skupa rešenja. Kada god je moguće, poveži račun sa malom mentalnom slikom kružnice ili grafa."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: reši nejednačinu{" "}
              <InlineMath>{"\\sin x \\ge \\frac{1}{2}"}</InlineMath>
            </h3>
            <p>
              Ovo je polazni model. Važno je da vidiš kako se iz dve granične
              tačke dobija ceo zatvoren interval na jednom periodu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Reši graničnu jednačinu.">
                <MathBlock>{"\\sin x=\\frac{1}{2}"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi granične uglove na jednom periodu.">
                <p>
                  Na intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath> dobijaš
                  uglove
                </p>
                <MathBlock>
                  {"x=\\frac{\\pi}{6},\\qquad x=\\frac{5\\pi}{6}."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izaberi pravi deo perioda.">
                <p>
                  Pošto tražiš{" "}
                  <InlineMath>{"\\sin x \\ge \\frac{1}{2}"}</InlineMath>, na
                  kružnici uzimaš sve tačke iznad horizontale{" "}
                  <InlineMath>{"y=\\frac{1}{2}"}</InlineMath>, dakle luk između
                  ta dva ugla.
                </p>
                <MathBlock>
                  {"x\\in\\left[\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right]"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {
                    "x\\in\\left[\\frac{\\pi}{6}+2k\\pi,\\frac{5\\pi}{6}+2k\\pi\\right],\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Tipična greška">
              <p>
                Tipična greška je da se napišu samo krajnje tačke{" "}
                <InlineMath>{"\\frac{\\pi}{6}"}</InlineMath> i{" "}
                <InlineMath>{"\\frac{5\\pi}{6}"}</InlineMath>, a ne ceo interval
                između njih.
              </p>
            </InsightCard>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: reši nejednačinu{" "}
              <InlineMath>
                {"\\cos x < -\\frac{\\sqrt{3}}{2}"}
              </InlineMath>
            </h3>
            <p>
              Ovde se lepo vidi razlika između strogih i nestrogih znakova, kao
              i izbor &bdquo;levog&rdquo; dela kružnice.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Reši graničnu jednačinu.">
                <MathBlock>{"\\cos x=-\\frac{\\sqrt{3}}{2}"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi granične uglove.">
                <MathBlock>
                  {"x=\\frac{5\\pi}{6},\\qquad x=\\frac{7\\pi}{6}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izaberi deo između, ali bez krajeva.">
                <p>
                  Pošto tražiš{" "}
                  <InlineMath>
                    {"\\cos x < -\\frac{\\sqrt{3}}{2}"}
                  </InlineMath>
                  , biraš deo između ovih uglova, ali bez samih krajnjih tačaka:
                </p>
                <MathBlock>
                  {"x\\in\\left(\\frac{5\\pi}{6},\\frac{7\\pi}{6}\\right)"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zapiši opšte rešenje.">
                <MathBlock>
                  {
                    "x\\in\\left(\\frac{5\\pi}{6}+2k\\pi,\\frac{7\\pi}{6}+2k\\pi\\right),\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Napomena o strogom znaku">
              <p>
                Strogi znak <InlineMath>{"<"}</InlineMath> znači da granične
                tačke ne ulaze, iako ih jednačina{" "}
                <InlineMath>{"\\cos x=-\\frac{\\sqrt{3}}{2}"}</InlineMath>{" "}
                uredno daje.
              </p>
            </InsightCard>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: reši nejednačinu{" "}
              <InlineMath>{"\\tan x>1"}</InlineMath> na intervalu{" "}
              <InlineMath>{"[-\\pi,2\\pi]"}</InlineMath>
            </h3>
            <p>
              Ovaj primer uči disciplini po granama, jer tangens ne posmatraš
              preko cele kružnice odjednom.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Reši graničnu jednačinu.">
                <MathBlock>
                  {"\\tan x=1 \\Rightarrow x=\\frac{\\pi}{4}+k\\pi"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Posmatraj svaku granu.">
                <p>
                  Na svakoj grani{" "}
                  <InlineMath>
                    {
                      "\\left(-\\frac{\\pi}{2}+k\\pi,\\frac{\\pi}{2}+k\\pi\\right)"
                    }
                  </InlineMath>{" "}
                  tangens je strogo rastući.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Uzmi desni deo svake grane.">
                <MathBlock>
                  {
                    "x\\in\\left(\\frac{\\pi}{4}+k\\pi,\\frac{\\pi}{2}+k\\pi\\right)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Preseci sa zadatim intervalom.">
                <MathBlock>
                  {
                    "\\left(-\\frac{3\\pi}{4},-\\frac{\\pi}{2}\\right),\\quad \\left(\\frac{\\pi}{4},\\frac{\\pi}{2}\\right),\\quad \\left(\\frac{5\\pi}{4},\\frac{3\\pi}{2}\\right)"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: reši nejednačinu{" "}
              <InlineMath>{"\\sin x+\\cos x\\ge 1"}</InlineMath>
            </h3>
            <p>
              Ovo je tipičan prijemni model gde bazni oblik ne vidiš odmah, nego
              ga prvo praviš pomoćnim uglom.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izračunaj amplitudu.">
                <MathBlock>{"R=\\sqrt{1^2+1^2}=\\sqrt{2}"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Napiši izraz kao jedan sinus.">
                <p>
                  Pošto važi{" "}
                  <InlineMath>
                    {
                      "\\cos\\frac{\\pi}{4}=\\sin\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}"
                    }
                  </InlineMath>
                  , dobijaš:
                </p>
                <MathBlock>
                  {
                    "\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši baznu nejednačinu.">
                <MathBlock>
                  {
                    "\\sin\\left(x+\\frac{\\pi}{4}\\right)\\ge \\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}"
                  }
                </MathBlock>
                <p>
                  Za promenljivu{" "}
                  <InlineMath>{"y=x+\\frac{\\pi}{4}"}</InlineMath> dobijaš
                </p>
                <MathBlock>
                  {
                    "y\\in\\left[\\frac{\\pi}{4},\\frac{3\\pi}{4}\\right]+2k\\pi"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Vrati pomeraj.">
                <MathBlock>
                  {
                    "x\\in\\left[2k\\pi,\\frac{\\pi}{2}+2k\\pi\\right],\\qquad k\\in\\mathbb{Z}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <InsightCard title="Najčešća greška">
              <p>
                Posle pomoćnog ugla ne zaboravljaš da vratiš pomeraj{" "}
                <InlineMath>{"\\frac{\\pi}{4}"}</InlineMath>. To je najčešća
                greška kod linearnog oblika.
              </p>
            </InsightCard>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: reši nejednačinu{" "}
              <InlineMath>
                {"\\sin x(\\sin x-\\cos x)\\le 0"}
              </InlineMath>{" "}
              na <InlineMath>{"[0,2\\pi)"}</InlineMath>
            </h3>
            <p>
              Ovo je model za tabelu znaka. Nije dovoljno rešiti po jedan
              činilac; moraš da spojiš njihove znakove.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi kritične tačke.">
                <MathBlock>
                  {"\\sin x=0 \\Rightarrow x=0,\\pi"}
                </MathBlock>
                <MathBlock>
                  {
                    "\\sin x-\\cos x=0 \\Rightarrow \\tan x=1 \\Rightarrow x=\\frac{\\pi}{4},\\frac{5\\pi}{4}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Rasporedi tačke na periodu.">
                <MathBlock>
                  {"0,\\ \\frac{\\pi}{4},\\ \\pi,\\ \\frac{5\\pi}{4}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Proveri znak proizvoda po intervalima.">
                <p>
                  Na primer, za{" "}
                  <InlineMath>{"x=\\frac{\\pi}{8}"}</InlineMath> proizvod je
                  negativan, a za{" "}
                  <InlineMath>{"x=\\frac{\\pi}{2}"}</InlineMath> pozitivan.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Zapiši rešenje.">
                <MathBlock>
                  {
                    "x\\in\\left[0,\\frac{\\pi}{4}\\right]\\cup\\left[\\pi,\\frac{5\\pi}{4}\\right]"
                  }
                </MathBlock>
                <p>
                  Ovde je važno da su nule oba činioca uključene, jer je znak
                  nejednakosti nestrog.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: reši nejednačinu{" "}
              <InlineMath>
                {
                  "2\\sin^2 x-3\\sin x\\cos x+\\cos^2 x\\le 0"
                }
              </InlineMath>{" "}
              na <InlineMath>{"[0,2\\pi)"}</InlineMath>
            </h3>
            <p>
              Ovo je napredniji prijemni model koji se prirodno nadovezuje na
              prethodnu lekciju o homogenim jednačinama.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Proveri poseban slučaj.">
                <p>
                  Najpre proveravaš poseban slučaj{" "}
                  <InlineMath>{"\\cos x=0"}</InlineMath>. Tada leva strana
                  postaje <InlineMath>{"2"}</InlineMath>, pa te tačke nisu
                  rešenja.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Podeli sa cos^2 x.">
                <MathBlock>
                  {"2\\tan^2 x-3\\tan x+1\\le 0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Faktorisanje i rešenje.">
                <MathBlock>
                  {"(2\\tan x-1)(\\tan x-1)\\le 0"}
                </MathBlock>
                <MathBlock>
                  {"\\frac{1}{2}\\le \\tan x\\le 1"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Preseci sa zadatim intervalom.">
                <p>
                  Na svakoj grani tangensa, zbog monotonosti, dobijaš:
                </p>
                <MathBlock>
                  {
                    "x\\in\\left[\\arctan\\frac{1}{2},\\frac{\\pi}{4}\\right]\\cup\\left[\\pi+\\arctan\\frac{1}{2},\\frac{5\\pi}{4}\\right]"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde studenti najčešće gube poene"
        description="U ovoj lekciji greške retko dolaze zato što je račun pretežak. Češće dolaze zato što slika nije bila jasna ili zapis intervala nije vođen dovoljno strogo."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Upisuju se samo granične tačke
            </h3>
            <p>
              Učenik pravilno reši jednačinu{" "}
              <InlineMath>{"\\sin x=a"}</InlineMath>, ali ostane na dva ugla
              umesto da zapiše ceo interval između njih ili njegov komplement.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešaju se otvoreni i zatvoreni krajevi
            </h3>
            <p>
              Najčešća formalna greška je da se isti krajevi prepisuju i za{" "}
              <InlineMath>{">"}</InlineMath> i za{" "}
              <InlineMath>{"\\ge"}</InlineMath>, iako to menja skup rešenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna perioda</h3>
            <p>
              Kod tangensa se piše <InlineMath>{"2k\\pi"}</InlineMath> umesto{" "}
              <InlineMath>{"k\\pi"}</InlineMath>, pa polovina rešenja izostane.
              To je klasična ispitna zamka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Asimptota se tretira kao dozvoljena tačka
            </h3>
            <p>
              Kod tangensa i kotangensa učenik zna raspored intervala, ali
              zaboravi da tačke u kojima funkcija nije definisana nikad ne ulaze
              u rešenje.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Znak proizvoda nije stvarno proveren
            </h3>
            <p>
              Kod proizvoda ili količnika učenik odredi nule činilaca, ali ne
              proveri znak na dobijenim intervalima, pa napamet uzme pogrešne
              delove.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nije vraćen pomeraj posle pomoćnog ugla
            </h3>
            <p>
              Dobije se nejednačina za{" "}
              <InlineMath>{"\\sin(x+\\varphi)"}</InlineMath>, ali se zaboravi
              poslednji korak, pa rešenje ostane zapisano za pogrešnu
              promenljivu.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno pojavljuje na testu"
        description="Na prijemnom trigonometrijske nejednačine često izgledaju kratko, ali su pune formalnih zamki. Poeni se ne gube samo na ideji nego i na nepotpunom zapisu skupa rešenja."
      >
        <div className={s.grid2}>
          <SectionCard title="Čisti bazni oblici">
            <p>
              Zadatak može biti samo{" "}
              <InlineMath>{"\\sin x \\ge a"}</InlineMath> ili{" "}
              <InlineMath>{"\\cos x < a"}</InlineMath>, ali se od tebe očekuje
              da brzo i sigurno vidiš odgovarajući deo perioda bez dugog računa.
            </p>
          </SectionCard>
          <SectionCard title="Linearna svođenja">
            <p>
              Vrlo su česti zadaci tipa{" "}
              <InlineMath>{"a\\sin x+b\\cos x \\ge c"}</InlineMath>. U njima se
              proverava da li umeš da uvedeš pomoćni ugao i zatim čitaš
              rezultat kao baznu nejednačinu.
            </p>
          </SectionCard>
          <SectionCard title="Znaci proizvoda i količnika">
            <p>
              Kada je nejednačina faktorisana, zadatak proverava da li znaš da
              radiš tabelu znaka u trigonometrijskom okruženju, sa periodama i
              eventualnim zabranjenim tačkama.
            </p>
          </SectionCard>
          <SectionCard title="Ograničeni domen">
            <p>
              Čest zahtev je da rešavaš na{" "}
              <InlineMath>{"[0,2\\pi]"}</InlineMath>,{" "}
              <InlineMath>{"[-\\pi,\\pi]"}</InlineMath> ili{" "}
              <InlineMath>{"[0,4\\pi]"}</InlineMath>. Tu se vidi da li umeš da
              prevedeš opšti obrazac u konkretan presek sa domenom.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Mini-checklista za ispit">
          <p>
            1. Koja je granična jednačina? 2. Koji delovi perioda zadovoljavaju
            znak? 3. Da li su krajevi otvoreni ili zatvoreni? 4. Koja je perioda?
            5. Koji deo ostaje posle preseka sa traženim intervalom?
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Vežbaj dok izbor intervala ne postane siguran"
        description="Probaj najpre bez rešenja. Tek kada odrediš granične tačke i pretpostaviš pravi deo perioda, proveri detaljno rešenje ispod."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"\\sin x < -\\frac{1}{2}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Granična jednačina je{" "}
                  <InlineMath>{"\\sin x=-\\frac{1}{2}"}</InlineMath>, pa na
                  jednom periodu dobijaš
                </p>
                <MathBlock>
                  {"x=\\frac{7\\pi}{6},\\qquad x=\\frac{11\\pi}{6}."}
                </MathBlock>
                <p>
                  Pošto tražiš strogu nejednačinu, uzimaš otvoreni luk između
                  tih uglova:
                </p>
                <MathBlock>
                  {
                    "x\\in\\left(\\frac{7\\pi}{6}+2k\\pi,\\frac{11\\pi}{6}+2k\\pi\\right),\\qquad k\\in\\mathbb{Z}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"\\cos x \\ge 0"}</InlineMath> na intervalu{" "}
                <InlineMath>{"[0,2\\pi]"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Kosinus je nenegativan u I i IV kvadrantu. Zato na traženom
                  intervalu dobijaš
                </p>
                <MathBlock>
                  {
                    "x\\in\\left[0,\\frac{\\pi}{2}\\right]\\cup\\left[\\frac{3\\pi}{2},2\\pi\\right]."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"\\tan x \\le \\sqrt{3}"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Granična jednačina je{" "}
                  <InlineMath>{"\\tan x=\\sqrt{3}"}</InlineMath>, pa je
                </p>
                <MathBlock>{"x=\\frac{\\pi}{3}+k\\pi."}</MathBlock>
                <p>
                  Pošto je tangens rastući na svakoj grani, dobijaš
                </p>
                <MathBlock>
                  {
                    "x\\in\\left(-\\frac{\\pi}{2}+k\\pi,\\frac{\\pi}{3}+k\\pi\\right],\\qquad k\\in\\mathbb{Z}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"2\\sin x+2\\cos x>2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Prvo sabijaš izraz:</p>
                <MathBlock>
                  {
                    "2\\sin x+2\\cos x = 2\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)."
                  }
                </MathBlock>
                <p>Nejednačina postaje</p>
                <MathBlock>
                  {
                    "\\sin\\left(x+\\frac{\\pi}{4}\\right)>\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}."
                  }
                </MathBlock>
                <p>Zato je</p>
                <MathBlock>
                  {
                    "x\\in\\left(2k\\pi,\\frac{\\pi}{2}+2k\\pi\\right),\\qquad k\\in\\mathbb{Z}."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>{"\\cos x(2\\sin x-1)\\ge 0"}</InlineMath> na
                intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Kritične tačke su</p>
                <MathBlock>
                  {"\\cos x=0 \\Rightarrow x=\\frac{\\pi}{2},\\frac{3\\pi}{2},"}
                </MathBlock>
                <p>i</p>
                <MathBlock>
                  {
                    "2\\sin x-1=0 \\Rightarrow \\sin x=\\frac{1}{2} \\Rightarrow x=\\frac{\\pi}{6},\\frac{5\\pi}{6}."
                  }
                </MathBlock>
                <p>Posle provere znaka po intervalima dobijaš</p>
                <MathBlock>
                  {
                    "x\\in\\left[\\frac{\\pi}{6},\\frac{\\pi}{2}\\right]\\cup\\left[\\frac{5\\pi}{6},\\frac{3\\pi}{2}\\right]."
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Reši nejednačinu{" "}
                <InlineMath>
                  {"3\\sin^2 x+\\sin x\\cos x-2\\cos^2 x>0"}
                </InlineMath>{" "}
                na intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Najpre proveravaš{" "}
                  <InlineMath>{"\\cos x=0"}</InlineMath>. Tada je izraz jednak{" "}
                  <InlineMath>{"3"}</InlineMath>, pa te tačke jesu rešenja.
                </p>
                <p>
                  Za <InlineMath>{"\\cos x\\ne 0"}</InlineMath> deliš sa{" "}
                  <InlineMath>{"\\cos^2 x"}</InlineMath> i dobijaš
                </p>
                <MathBlock>{"3\\tan^2 x+\\tan x-2>0."}</MathBlock>
                <p>
                  Faktorisanje daje{" "}
                  <InlineMath>{"(3\\tan x-2)(\\tan x+1)>0"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {
                    "\\tan x< -1 \\quad \\text{ili} \\quad \\tan x>\\frac{2}{3}."
                  }
                </MathBlock>
                <p>
                  Na intervalu <InlineMath>{"[0,2\\pi)"}</InlineMath> to daje
                </p>
                <MathBlock>
                  {
                    "x\\in\\left(\\arctan\\frac{2}{3},\\frac{\\pi}{2}\\right]\\cup\\left(\\frac{\\pi}{2},\\frac{3\\pi}{4}\\right)\\cup\\left(\\pi+\\arctan\\frac{2}{3},\\frac{3\\pi}{2}\\right]\\cup\\left(\\frac{3\\pi}{2},\\frac{7\\pi}{4}\\right)"
                  }
                </MathBlock>
                <p>
                  Posebno obrati pažnju da su{" "}
                  <InlineMath>{"\\frac{\\pi}{2}"}</InlineMath> i{" "}
                  <InlineMath>{"\\frac{3\\pi}{2}"}</InlineMath> uključeni jer
                  originalna nejednačina u tim tačkama važi, iako je deljenje sa{" "}
                  <InlineMath>{"\\cos^2 x"}</InlineMath> tamo zabranjeno.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako sledeće ideje postanu automatske, trigonometrijske nejednačine više neće delovati kao skup nasumičnih trikova nego kao pregledan sistem."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              1. Granična jednačina samo određuje ivice
            </h3>
            <p>
              Pravi posao počinje tek posle nje, kada biraš gde je funkcija
              veća, manja ili jednaka traženoj vrednosti.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Jedan period rešavaš pažljivo, pa ga ponavljaš
            </h3>
            <p>
              Za sinus i kosinus dodaješ{" "}
              <InlineMath>{"2k\\pi"}</InlineMath>, a za tangens{" "}
              <InlineMath>{"k\\pi"}</InlineMath>. To je standardni most od slike
              ka opštem rešenju.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Krajnje tačke nikad ne prepisuješ mehanički
            </h3>
            <p>
              Strogi i nestrogi znaci, kao i tačke nedozvoljenosti, direktno
              određuju koje zagrade dolaze u zapisu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Složeniji oblici se svode na bazne
            </h3>
            <p>
              Pomoćni ugao, faktorizacija i homogena smena nisu cilj sami po
              sebi, nego alati koji te vraćaju na poznatu nejednačinu za{" "}
              <InlineMath>{"\\sin x"}</InlineMath>,{" "}
              <InlineMath>{"\\cos x"}</InlineMath> ili{" "}
              <InlineMath>{"\\tan x"}</InlineMath>.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Ključna poruka"
        description="Trigonometrijska nejednačina se ne rešava pronalaženjem nekoliko lepih uglova, nego čitanjem ponašanja funkcije između tih uglova."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Kada jednom počneš da misliš u intervalima, ova tema postaje mnogo
            stabilnija i korisnija za prijemni.
          </p>
        </InsightCard>

        <p className={cs.footerNote}>
          Sledeći logičan korak je primena istog načina razmišljanja u geometriji
          i kasnije u analizi funkcija: nule, znaci, intervali i pravilna
          interpretacija grafa.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
