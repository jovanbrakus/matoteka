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
import ParabolaLab from "./ParabolaLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#oblik", label: "Standardni oblik" },
  { href: "#teme", label: "Teme i osa" },
  { href: "#nule", label: "Nule" },
  { href: "#znak", label: "Znak funkcije" },
  { href: "#crtanje", label: "Crtanje" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson19Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 19"
        title={
          <>
            Kvadratna funkcija i njena{" "}
            <span className={cs.tHeroAccent}>parabola</span>
          </>
        }
        description="Kada vidiš izraz f(x)=ax²+bx+c, ne treba da pamtiš nepovezane formule. Treba da vidiš jednu celinu: smer otvaranja parabole, osu simetrije, teme, preseke sa osama i raspored znaka po intervalima. To je upravo način razmišljanja koji pomaže na prijemnom, jer štedi vreme i smanjuje greške."
        heroImageSrc="/api/lessons/19/hero"
        heroImageAlt="Ilustracija kvadratne funkcije, temena, nula i grafika"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako iz tri koeficijenta brzo dobijaš oblik parabole i sve ključne podatke. Bez nasumičnog crtanja i bez mehaničkog prepisivanja formula.",
          },
          {
            label: "Najveća zamka",
            description:
              "Učenici često računaju nule, a zaborave da je teme centar cele priče. Teme govori gde je minimum ili maksimum i vodi te ka sigurnoj skici.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Znak kvadratnog trinoma, broj nula i čitanje grafa u zadacima sa uslovima. Ovo je baza za kvadratne jednačine, nejednačine i zadatke sa parametrom.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "Oko 70 minuta za čitanje, praćenje primera i interaktivnu proveru.",
          },
          {
            label: "Predznanje",
            description:
              "Rešavanje linearnih jednačina, rad u koordinatnom sistemu i osnovne algebarske transformacije.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz izraza ax²+bx+c brzo rekonstruišeš oblik parabole i raspored znaka.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za menjanje koeficijenata a, b, c i čitanje temena, nula i znaka.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Most između algebre i grafa"
        description="Kvadratna funkcija nije samo još jedna formula. Ona je prvi ozbiljan model u kome jedna algebarska jednačina daje bogat geometrijski objekat. Zato se ista ideja kasnije vraća u kvadratnim jednačinama, nejednačinama, analitičkoj geometriji i zadacima sa parametrom."
      >
        <div className={s.grid3}>
          <SectionCard title="Jedna formula, mnogo informacija">
            <p>
              Iz zapisa{" "}
              <InlineMath>{"ax^2+bx+c"}</InlineMath> možeš da pročitaš da li je
              parabola otvorena naviše ili nadole, gde joj je osa simetrije, gde
              se nalazi ekstrem i kako se ponaša znak funkcije.
            </p>
          </SectionCard>
          <SectionCard title="Temelj za naredne lekcije">
            <p>
              Ako razumeš grafik kvadratne funkcije, lakše shvataš zašto
              kvadratna jednačina ima dve, jednu ili nijednu realnu nulu i kako
              se rešava kvadratna nejednačina.
            </p>
          </SectionCard>
          <SectionCard title="Tipična prijemna situacija">
            <p>
              Na ispitu se često ne traži &ldquo;nacrtaj lepu parabolu&rdquo;,
              nego &ldquo;odredi znak trinoma&rdquo;, &ldquo;nađi
              minimum&rdquo;, &ldquo;zaključi za koje{" "}
              <InlineMath>{"x"}</InlineMath> je izraz pozitivan&rdquo;. Sve to
              je ista lekcija.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ STANDARDNI OBLIK ═══════════ */}
      <LessonSection
        id="oblik"
        eyebrow="Osnovna ideja"
        title="Standardni oblik i prvi pogled na funkciju"
        description="Polazimo od standardnog oblika f(x)=ax²+bx+c, gde je a≠0. Koeficijenti a, b i c ne rade isti posao. Prvi korak je da tačno razdvojiš njihove uloge."
      >
        <div className={s.grid3}>
          <SectionCard title="Uloga koeficijenta a">
            <p>
              Znak koeficijenta <InlineMath>{"a"}</InlineMath> određuje smer
              otvaranja parabole. Ako je <InlineMath>{"a>0"}</InlineMath>,
              parabola je otvorena naviše i teme je minimum. Ako je{" "}
              <InlineMath>{"a<0"}</InlineMath>, parabola je otvorena nadole i
              teme je maksimum.
            </p>
          </SectionCard>
          <SectionCard title="Uloga koeficijenta c">
            <p>
              Slobodan član <InlineMath>{"c"}</InlineMath> odmah daje vrednost
              funkcije u nuli:
            </p>
            <MathBlock>{"f(0)=c"}</MathBlock>
            <p>
              Zato je tačka <InlineMath>{"(0,c)"}</InlineMath> presek parabole
              sa <InlineMath>{"y"}</InlineMath>-osom. To je važna sidrena tačka
              za skicu.
            </p>
          </SectionCard>
          <SectionCard title="Uloga koeficijenta b">
            <p>
              Koeficijent <InlineMath>{"b"}</InlineMath> ne &ldquo;pomera
              sam&rdquo; grafik, ali zajedno sa <InlineMath>{"a"}</InlineMath>{" "}
              određuje osu simetrije i time položaj temena:
            </p>
            <MathBlock>{"x_T=-\\frac{b}{2a}"}</MathBlock>
            <p>
              Zato <InlineMath>{"b"}</InlineMath> nikada ne tumačiš odvojeno od{" "}
              <InlineMath>{"a"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški trik">
          <p>
            Pre bilo kakvog računanja najpre odgovori na tri kratka pitanja:
            kakav je znak od <InlineMath>{"a"}</InlineMath>, kolika je vrednost{" "}
            <InlineMath>{"f(0)"}</InlineMath> i gde je osa simetrije. Tek onda
            kreći na nule i detaljnu skicu.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: šta možeš da zaključiš o funkciji f(x)=−2x²+5x+1 bez računanja nula?"
          answer={
            <>
              <p>
                Pošto je <InlineMath>{"a=-2<0"}</InlineMath>, parabola je
                otvorena nadole, pa je teme maksimum. Važi i{" "}
                <InlineMath>{"f(0)=1"}</InlineMath>, pa grafik seče{" "}
                <InlineMath>{"y"}</InlineMath>-osu u tački{" "}
                <InlineMath>{"(0,1)"}</InlineMath>. Osa simetrije je
              </p>
              <MathBlock>
                {"x_T=-\\frac{5}{2\\cdot(-2)}=\\frac{5}{4}"}
              </MathBlock>
              <p>
                Dakle, već znaš smer otvaranja, jedan presek sa osom i položaj
                središnje vertikale.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ TEME I OSA ═══════════ */}
      <LessonSection
        id="teme"
        eyebrow="Centar parabole"
        title="Teme, osa simetrije i ekstremna vrednost"
        description="Teme je najvažnija tačka parabole. Ono ti govori gde funkcija prestaje da opada i počinje da raste, ili obrnuto. Zbog toga mnogi zadaci postaju mnogo lakši čim prvo izračunaš teme."
      >
        <div className={s.grid3}>
          <SectionCard title="Formula za koordinatu x_T">
            <p>
              Osa simetrije parabole je vertikalna prava
            </p>
            <MathBlock>{"x=-\\frac{b}{2a}"}</MathBlock>
            <p>
              To znači da je apscisa temena upravo{" "}
              <InlineMath>{"x_T=-\\frac{b}{2a}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Kako do y_T">
            <p>
              Kada dobiješ <InlineMath>{"x_T"}</InlineMath>, samo ga uvrstiš u
              funkciju:
            </p>
            <MathBlock>{"y_T=f(x_T)"}</MathBlock>
            <p>
              Drugim rečima, teme nije samo &ldquo;formula za{" "}
              <InlineMath>{"x"}</InlineMath>&rdquo;, nego cela tačka{" "}
              <InlineMath>{"(x_T,y_T)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Minimum ili maksimum">
            <p>
              Ako je <InlineMath>{"a>0"}</InlineMath>, tada je{" "}
              <InlineMath>{"y_T"}</InlineMath> najmanja vrednost funkcije. Ako
              je <InlineMath>{"a<0"}</InlineMath>, tada je{" "}
              <InlineMath>{"y_T"}</InlineMath> najveća vrednost funkcije. Ovu
              informaciju kasnije koristiš za znak i za nejednačine.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Ključne formule za teme">
            <MathBlock>
              {"T\\left(-\\frac{b}{2a},\\,f\\!\\left(-\\frac{b}{2a}\\right)\\right)"}
            </MathBlock>
            <MathBlock>{"f(x)=a(x-x_T)^2+y_T"}</MathBlock>
          </SectionCard>
          <SectionCard title="Postupak u tri koraka">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Nađi osu simetrije."
              >
                <p>
                  Izračunaj <InlineMath>{"x_T=-\\frac{b}{2a}"}</InlineMath>. To
                  je vertikala oko koje je parabola simetrična.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Uvrsti apscisu."
              >
                <p>
                  Izračunaj <InlineMath>{"y_T=f(x_T)"}</InlineMath>. Tek sada
                  znaš gde je teme u koordinatnoj ravni.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title="Protumači rezultat."
              >
                <p>
                  Ako je <InlineMath>{"a>0"}</InlineMath>, dobio si minimum;
                  ako je <InlineMath>{"a<0"}</InlineMath>, dobio si maksimum
                  funkcije.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <InsightCard title="Konkretan primer">
          <p>
            Za funkciju <InlineMath>{"f(x)=x^2-4x+3"}</InlineMath> dobijamo:
          </p>
          <MathBlock>
            {"x_T=-\\frac{-4}{2\\cdot 1}=2,\\qquad y_T=f(2)=4-8+3=-1"}
          </MathBlock>
          <p>
            Dakle, teme je <InlineMath>{"T(2,-1)"}</InlineMath>, a pošto je{" "}
            <InlineMath>{"a=1>0"}</InlineMath>, to je minimum funkcije.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto je korisno da računaš teme čak i kada zadatak ne traži eksplicitno grafik?"
          answer={
            <p>
              Zato što teme odmah daje najvažniju globalnu informaciju o
              kvadratnoj funkciji: gde se nalazi minimum ili maksimum. Kada znaš
              ekstremnu vrednost, lakše zaključuješ o znaku funkcije, o tome da
              li funkcija ima realne nule i o tome kada je neki izraz uvek
              pozitivan ili uvek negativan.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ NULE ═══════════ */}
      <LessonSection
        id="nule"
        eyebrow="Geometrijsko značenje"
        title="Nule funkcije i presek sa x-osom"
        description="Nule kvadratne funkcije su brojevi za koje važi f(x)=0. Na grafiku to su tačke u kojima parabola seče ili dodiruje x-osu. Grafički pogled je posebno važan, jer ti odmah govori i kako će izgledati znak funkcije."
      >
        <div className={s.grid3}>
          <SectionCard title="Dve realne nule">
            <p>
              Ako parabola seče <InlineMath>{"x"}</InlineMath>-osu u dve
              različite tačke, postoje dve realne nule{" "}
              <InlineMath>{"x_1"}</InlineMath> i{" "}
              <InlineMath>{"x_2"}</InlineMath>. Tada je osa simetrije tačno na
              sredini između njih:
            </p>
            <MathBlock>{"x_T=\\frac{x_1+x_2}{2}"}</MathBlock>
          </SectionCard>
          <SectionCard title="Jedna realna nula">
            <p>
              Ako parabola samo dodiruje <InlineMath>{"x"}</InlineMath>-osu,
              tada postoji jedna dvostruka nula. To se dešava upravo u temenu,
              pa je
            </p>
            <MathBlock>{"x_0=x_T"}</MathBlock>
            <p>
              Znak funkcije se tada ne menja pri prolasku kroz tu tačku.
            </p>
          </SectionCard>
          <SectionCard title="Nema realnih nula">
            <p>
              Ako parabola uopšte ne seče <InlineMath>{"x"}</InlineMath>-osu,
              funkcija nema realne nule. Tada je ceo grafik ili iznad{" "}
              <InlineMath>{"x"}</InlineMath>-ose ili ispod nje, pa je znak
              funkcije isti za svako realno <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Važan uvid">
          <p>
            Broj nula nije &ldquo;sporedan podatak&rdquo;. On ti govori koliko
            puta se znak funkcije može promeniti i zato je direktno povezan sa
            rešavanjem kvadratnih nejednačina.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: ako je teme parabole T(−1,3) i a>0, da li funkcija može imati realne nule?"
          answer={
            <p>
              Ne može. Pošto je <InlineMath>{"a>0"}</InlineMath>, parabola je
              otvorena naviše, pa je teme minimum. Ako je minimum{" "}
              <InlineMath>{"y_T=3>0"}</InlineMath>, cela parabola leži iznad{" "}
              <InlineMath>{"x"}</InlineMath>-ose. Zato je{" "}
              <InlineMath>{"f(x)>0"}</InlineMath> za svako realno{" "}
              <InlineMath>{"x"}</InlineMath> i funkcija nema realne nule.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ZNAK FUNKCIJE ═══════════ */}
      <LessonSection
        id="znak"
        eyebrow="Najčešći prijemni zadatak"
        title="Znak kvadratne funkcije"
        description="Kada jednom razumeš položaj parabole u odnosu na x-osu, znak funkcije postaje logičan. Ovde je ključna kombinacija dve informacije: smer otvaranja i broj realnih nula."
      >
        <div className={s.grid3}>
          <SectionCard title="Slučaj 1: dve realne nule">
            <p>
              Ako je <InlineMath>{"a>0"}</InlineMath>, parabola je iznad ose van
              intervala <InlineMath>{"(x_1,x_2)"}</InlineMath>, a ispod ose
              unutar tog intervala.
            </p>
            <MathBlock>
              {"a>0:\\quad f(x)>0 \\text{ za } x<x_1 \\text{ ili } x>x_2,\\quad f(x)<0 \\text{ za } x_1<x<x_2"}
            </MathBlock>
            <p>
              Ako je <InlineMath>{"a<0"}</InlineMath>, znak je obrnut.
            </p>
          </SectionCard>
          <SectionCard title="Slučaj 2: dvostruka nula">
            <p>
              Kada parabola dodiruje <InlineMath>{"x"}</InlineMath>-osu, znak se
              ne menja. Ako je <InlineMath>{"a>0"}</InlineMath>, važi{" "}
              <InlineMath>{"f(x)\\ge 0"}</InlineMath> za svako{" "}
              <InlineMath>{"x"}</InlineMath>, a jednako nuli je samo u temenu.
              Ako je <InlineMath>{"a<0"}</InlineMath>, važi{" "}
              <InlineMath>{"f(x)\\le 0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Slučaj 3: nema realnih nula">
            <p>
              Tada je znak svuda isti. Ako je <InlineMath>{"a>0"}</InlineMath>,
              onda je <InlineMath>{"f(x)>0"}</InlineMath> za sve realne
              brojeve. Ako je <InlineMath>{"a<0"}</InlineMath>, onda je{" "}
              <InlineMath>{"f(x)<0"}</InlineMath> za sve realne brojeve.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Konkretan primer">
          <MathBlock>
            {"f(x)=-x^2+4x-3=-(x-1)(x-3)"}
          </MathBlock>
          <p>
            Nule su <InlineMath>{"x_1=1"}</InlineMath> i{" "}
            <InlineMath>{"x_2=3"}</InlineMath>, a pošto je{" "}
            <InlineMath>{"a=-1<0"}</InlineMath>, parabola je otvorena nadole.
            Zato je <InlineMath>{"f(x)>0"}</InlineMath> za{" "}
            <InlineMath>{"1<x<3"}</InlineMath>, a{" "}
            <InlineMath>{"f(x)<0"}</InlineMath> za{" "}
            <InlineMath>{"x<1"}</InlineMath> i <InlineMath>{"x>3"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: funkcija ima nule −2 i 5, a a>0. Gde je negativna?"
          answer={
            <>
              <p>
                Negativna je između nula, dakle za
              </p>
              <MathBlock>{"-2<x<5"}</MathBlock>
              <p>To je tipičan obrazac za parabolu otvorenu naviše.</p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ CRTANJE ═══════════ */}
      <LessonSection
        id="crtanje"
        eyebrow="Pouzdan algoritam"
        title="Kako da nacrtaš grafik bez lutanja"
        description="Dobra skica ne nastaje tako što 'gađaš' mnogo tačaka. Dovoljno je nekoliko pažljivo izabranih koraka. Cilj je da grafik bude logički tačan, a ne umetnički savršen."
      >
        <div className={s.grid3}>
          <SectionCard title="1. Pogledaj znak od a">
            <p>
              Odmah znaš da li se parabola otvara naviše ili nadole.
            </p>
          </SectionCard>
          <SectionCard title="2. Nađi teme i osu simetrije">
            <p>
              Ovo je centralna informacija za ceo grafik i za ekstremnu
              vrednost funkcije.
            </p>
          </SectionCard>
          <SectionCard title="3. Odredi presek sa y-osom">
            <p>
              Tačka <InlineMath>{"(0,c)"}</InlineMath> često pomaže da ispravno
              smestiš parabolu u koordinatni sistem.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="4. Nađi nule ako postoje">
            <p>
              To su preseci sa <InlineMath>{"x"}</InlineMath>-osom i osnova za
              ispitivanje znaka.
            </p>
          </SectionCard>
          <SectionCard title="5. Iskoristi simetriju">
            <p>
              Ako imaš jednu tačku sa jedne strane ose simetrije, odmah dobijaš
              odgovarajuću tačku sa druge strane.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Praktično pravilo">
          <p>
            Za prijemni je skoro uvek dovoljno da na skici obeležiš teme, osu
            simetrije, presek sa <InlineMath>{"y"}</InlineMath>-osom i nule. Sve
            ostalo parabola &ldquo;sama otkrije&rdquo;.
          </p>
        </InsightCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer korak po korak">
            <p>
              Za funkciju <InlineMath>{"f(x)=x^2-4x+3"}</InlineMath>:
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title={<>Vidiš da je <InlineMath>{"a=1>0"}</InlineMath>, dakle parabola je otvorena naviše.</>} />
              <WalkStep number={2} title={<>Računaš <InlineMath>{"x_T=2"}</InlineMath>, pa <InlineMath>{"y_T=-1"}</InlineMath>, dakle teme je <InlineMath>{"T(2,-1)"}</InlineMath>.</>} />
              <WalkStep number={3} title={<>Presek sa <InlineMath>{"y"}</InlineMath>-osom je <InlineMath>{"(0,3)"}</InlineMath>.</>} />
              <WalkStep number={4} title={<>Nule su <InlineMath>{"x_1=1"}</InlineMath> i <InlineMath>{"x_2=3"}</InlineMath>.</>} />
              <WalkStep number={5} title={<>Tačke <InlineMath>{"(1,0)"}</InlineMath> i <InlineMath>{"(3,0)"}</InlineMath> leže simetrično oko ose <InlineMath>{"x=2"}</InlineMath>.</>} />
            </div>
          </SectionCard>
          <SectionCard title="Rezultat">
            <MathBlock>
              {"f(x)<0 \\text{ za } 1<x<3,\\qquad f(x)>0 \\text{ za } x<1 \\text{ ili } x>3"}
            </MathBlock>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Učenje kroz promenu parametara"
        title="Interaktivna laboratorija za parabolu"
        description="Menjaj koeficijente i posmatraj kako se parabola pomera, širi, sužava i menja odnos prema x-osi. Posebno obrati pažnju na to kako se zajedno menjaju teme, nule i znak funkcije."
      >
        <ParabolaLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pre nego što pogledaš rezultate, pokušaj sam da predvidiš gde će se
            teme nalaziti i koliko nula će parabola imati. Tek onda proveri na
            grafiku da li je tvoj zaključak tačan.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Korak po korak"
        title="Vođeni primeri"
        description="Ovde nije cilj samo da vidiš rezultat, nego da usvojiš redosled razmišljanja. Na prijemnom ti upravo taj redosled pravi razliku između sigurnog i nesigurnog rešenja."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: <InlineMath>{"f(x)=x^2-4x+3"}</InlineMath>
            </h3>
            <p>Odredi teme, nule, znak i nacrtaj skicu grafa.</p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title={<><InlineMath>{"a=1>0"}</InlineMath>, pa je parabola otvorena naviše.</>} />
              <WalkStep number={2} title={<><InlineMath>{"x_T=2"}</InlineMath>, a <InlineMath>{"y_T=f(2)=-1"}</InlineMath>, pa je <InlineMath>{"T(2,-1)"}</InlineMath>.</>} />
              <WalkStep number={3} title={<><InlineMath>{"f(0)=3"}</InlineMath>, pa je presek sa <InlineMath>{"y"}</InlineMath>-osom <InlineMath>{"(0,3)"}</InlineMath>.</>} />
              <WalkStep number={4} title={<>Faktorizacija daje <InlineMath>{"(x-1)(x-3)=0"}</InlineMath>, pa su nule <InlineMath>{"1"}</InlineMath> i <InlineMath>{"3"}</InlineMath>.</>} />
              <WalkStep number={5} title="Pošto je parabola otvorena naviše, funkcija je negativna između nula, a pozitivna van tog intervala." />
            </div>
            <MathBlock>
              {"f(x)<0 \\text{ za } 1<x<3,\\qquad f(x)>0 \\text{ za } x<1 \\text{ ili } x>3"}
            </MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: <InlineMath>{"f(x)=-2x^2+8x-6"}</InlineMath>
            </h3>
            <p>Ovaj primer pokazuje kako izgleda parabola otvorena nadole.</p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title={<><InlineMath>{"a=-2<0"}</InlineMath>, pa teme daje maksimum funkcije.</>} />
              <WalkStep number={2} title={<><InlineMath>{"x_T=-\\frac{8}{2\\cdot(-2)}=2"}</InlineMath>.</>} />
              <WalkStep number={3} title={<><InlineMath>{"y_T=f(2)=-8+16-6=2"}</InlineMath>, pa je <InlineMath>{"T(2,2)"}</InlineMath>.</>} />
              <WalkStep number={4} title={<>Nule su <InlineMath>{"1"}</InlineMath> i <InlineMath>{"3"}</InlineMath> (iste kao u prethodnom primeru!).</>} />
              <WalkStep number={5} title="Pošto je parabola otvorena nadole, funkcija je pozitivna između nula, a negativna van njih." />
            </div>
            <InsightCard title="Uvid">
              <p>
                Iste nule kao u prethodnom primeru, ali su znak i ekstrem
                potpuno drugačiji jer je promenjen znak koeficijenta{" "}
                <InlineMath>{"a"}</InlineMath>.
              </p>
            </InsightCard>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: <InlineMath>{"f(x)=x^2+4x+5"}</InlineMath>
            </h3>
            <p>Primer u kome funkcija nema realne nule, ali ipak lako čitamo njen znak.</p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title={<><InlineMath>{"a=1>0"}</InlineMath>, pa je parabola otvorena naviše.</>} />
              <WalkStep number={2} title={<><InlineMath>{"x_T=-\\frac{4}{2}=-2"}</InlineMath>.</>} />
              <WalkStep number={3} title={<><InlineMath>{"y_T=f(-2)=4-8+5=1"}</InlineMath>, pa je <InlineMath>{"T(-2,1)"}</InlineMath>.</>} />
              <WalkStep number={4} title={<>Minimum je pozitivan broj <InlineMath>{"1"}</InlineMath>, pa cela parabola leži iznad <InlineMath>{"x"}</InlineMath>-ose.</>} />
              <WalkStep number={5} title={<>Zato funkcija nema realne nule i za svako <InlineMath>{"x"}</InlineMath> važi <InlineMath>{"f(x)>0"}</InlineMath>.</>} />
            </div>
            <MathBlock>{"f(x)=(x+2)^2+1"}</MathBlock>
            <p>Kanonski oblik odmah pokazuje zašto minimum iznosi 1.</p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Formula mapa"
        title="Ključne formule i obrasci"
        description="Formule nisu cilj same po sebi. Njihova vrednost je u tome što ti pomažu da brzo organizuješ misao. Ispod su one koje za ovu lekciju zaista treba aktivno da koristiš."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Standardni oblik"
            formula={"f(x)=ax^2+bx+c,\qquad a\ne 0"}
            note="Ovde odmah gledaš znak koeficijenta a i vrednost c=f(0)."
          />
          <FormulaCard
            title="Osa simetrije"
            formula={"x=-\frac{b}{2a}"}
            note="Teme uvek leži na ovoj pravoj, a nule su simetrične u odnosu na nju."
          />
          <FormulaCard
            title="Teme"
            formula={"T\left(-\frac{b}{2a},\,f\!\left(-\frac{b}{2a}\right)\right)"}
            note="Ovo je najvažnija formula za crtanje i tumačenje kvadratne funkcije."
          />
          <FormulaCard
            title="Kanonski oblik"
            formula="f(x)=a(x-x_T)^2+y_T"
            note="Ovaj oblik odmah pokazuje gde je teme i kolika je ekstremna vrednost."
          />
          <FormulaCard
            title="Faktorisani oblik"
            formula="f(x)=a(x-x_1)(x-x_2)"
            note="Najkorisniji oblik za ispitivanje znaka kada funkcija ima dve realne nule."
          />
          <FormulaCard
            title="Diskriminanta"
            formula={"\Delta=b^2-4ac"}
            note={
              <>
                <InlineMath>{"\\Delta>0"}</InlineMath>: dve nule,{" "}
                <InlineMath>{"\\Delta=0"}</InlineMath>: jedna dvostruka nula,{" "}
                <InlineMath>{"\\Delta<0"}</InlineMath>: nema realnih nula.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Zamke koje skidaju bodove"
        title="Česte greške"
        description="Ove greške se ne pojavljuju zato što je gradivo teško, nego zato što učenik prerano preskoči logiku i krene na mehaniku. Zato ih vredi naučiti unapred."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Računanje samo <InlineMath>{"x_T"}</InlineMath>, bez{" "}
              <InlineMath>{"y_T"}</InlineMath>
            </h3>
            <p>
              Mnogi učenici kažu &ldquo;teme je 2&rdquo;. Ne, teme je tačka.
              Moraš imati i drugu koordinatu:{" "}
              <InlineMath>{"y_T=f(x_T)"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešan zaključak o znaku</h3>
            <p>
              Čim vidiš dve nule, ne znači automatski da je funkcija negativna
              između njih. To zavisi od znaka koeficijenta{" "}
              <InlineMath>{"a"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje preseka sa <InlineMath>{"y"}</InlineMath>-osom i temena
            </h3>
            <p>
              Tačka <InlineMath>{"(0,c)"}</InlineMath> je samo presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom. Teme se dobija iz ose
              simetrije i obično nije na <InlineMath>{"y"}</InlineMath>-osi.
            </p>
          </article>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljanje simetrije</h3>
            <p>
              Ako znaš osu simetrije i jednu tačku sa jedne strane, simetrična
              tačka mora postojati sa druge strane. Crtanje
              &ldquo;iskrivljene&rdquo; parabole je jasan znak da simetrija
              nije ispoštovana.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Šta proverava komisija"
        title="Veza sa prijemnim zadacima"
        description="Na prijemnom se ova tema retko pojavljuje izolovano. Uglavnom je ugrađena u zadatak koji proverava koliko brzo umeš da prevedeš izraz u zaključak o grafiku, znaku ili ekstremnoj vrednosti."
      >
        <div className={s.grid3}>
          <SectionCard title="Tip 1: Ispitivanje znaka trinoma">
            <p>
              Najčešće pitanje glasi: za koje vrednosti promenljive je izraz
              pozitivan, negativan ili nenegativan. Tu moraš spojiti nule i smer
              otvaranja parabole.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: Minimum ili maksimum">
            <p>
              Zadatak može da traži najmanju ili najveću vrednost izraza. To je
              direktno pitanje o temenu.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: Parametri i uslovi">
            <p>
              Često se traži da kvadratni trinom bude uvek pozitivan ili da ima
              tačno jednu nulu. Tada je grafičko razmišljanje najbrži put ka
              uslovima na parametre.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brza prijemna kontrola">
          <p>
            Kada dobiješ kvadratni trinom, proveri redom{" "}
            <InlineMath>{"a"}</InlineMath>, osu simetrije, teme, nule i tek onda
            zaključak o znaku. Taj redosled je dovoljno brz za test, a dovoljno
            siguran da izbegneš tipične greške.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Samostalna provera"
        title="Vežbe za kraj lekcije"
        description="Pokušaj prvo samostalno, pa tek onda otvori rešenje. Važno je da pre proveravanja napišeš bar skicu plana: znak od a, teme, nule, znak funkcije."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Za funkciju <InlineMath>{"f(x)=x^2-6x+8"}</InlineMath> odredi
                teme, nule i znak funkcije.
              </p>
            }
            solution={
              <>
                <p>
                  Imamo <InlineMath>{"a=1>0"}</InlineMath>, pa je parabola
                  otvorena naviše.
                </p>
                <MathBlock>
                  {"x_T=-\\frac{-6}{2}=3,\\qquad y_T=f(3)=9-18+8=-1"}
                </MathBlock>
                <p>
                  Teme je <InlineMath>{"T(3,-1)"}</InlineMath>. Faktorizacija
                  daje
                </p>
                <MathBlock>{"x^2-6x+8=(x-2)(x-4)"}</MathBlock>
                <p>
                  pa su nule <InlineMath>{"x_1=2"}</InlineMath> i{" "}
                  <InlineMath>{"x_2=4"}</InlineMath>.
                </p>
                <p>
                  Pošto je parabola otvorena naviše, važi:{" "}
                  <InlineMath>{"f(x)<0"}</InlineMath> za{" "}
                  <InlineMath>{"2<x<4"}</InlineMath>, a{" "}
                  <InlineMath>{"f(x)>0"}</InlineMath> za{" "}
                  <InlineMath>{"x<2"}</InlineMath> ili{" "}
                  <InlineMath>{"x>4"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Za funkciju <InlineMath>{"f(x)=-x^2-2x+3"}</InlineMath> odredi
                maksimum funkcije i intervale pozitivnosti.
              </p>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"a=-1<0"}</InlineMath>, pa je teme maksimum.
                </p>
                <MathBlock>
                  {
                    "x_T=-\\frac{-2}{2\\cdot(-1)}=-1,\\qquad y_T=f(-1)=-1+2+3=4"
                  }
                </MathBlock>
                <p>
                  Maksimalna vrednost funkcije je <InlineMath>{"4"}</InlineMath>,
                  a postiže se za <InlineMath>{"x=-1"}</InlineMath>.
                </p>
                <p>Nule dobijamo iz jednačine</p>
                <MathBlock>
                  {
                    "-x^2-2x+3=0 \\iff x^2+2x-3=0 \\iff (x+3)(x-1)=0"
                  }
                </MathBlock>
                <p>
                  Nule su <InlineMath>{"-3"}</InlineMath> i{" "}
                  <InlineMath>{"1"}</InlineMath>. Pošto je parabola otvorena
                  nadole, funkcija je pozitivna za{" "}
                  <InlineMath>{"-3<x<1"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Odredi da li funkcija{" "}
                <InlineMath>{"f(x)=2x^2-8x+10"}</InlineMath> ima realne nule i
                ispitaj njen znak.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto je <InlineMath>{"a=2>0"}</InlineMath>, parabola je
                  otvorena naviše.
                </p>
                <MathBlock>
                  {
                    "x_T=-\\frac{-8}{2\\cdot 2}=2,\\qquad y_T=f(2)=8-16+10=2"
                  }
                </MathBlock>
                <p>
                  Minimum funkcije je <InlineMath>{"2>0"}</InlineMath>, pa cela
                  parabola leži iznad <InlineMath>{"x"}</InlineMath>-ose.
                </p>
                <p>Dakle, funkcija nema realne nule i važi</p>
                <MathBlock>
                  {"f(x)>0 \\quad \\text{za svako } x\\in\\mathbb{R}"}
                </MathBlock>
              </>
            }
          />
        </div>

        <div className={s.exerciseGrid} style={{ marginTop: 16 }}>
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Parabola ima teme <InlineMath>{"T(1,-4)"}</InlineMath> i
                prolazi kroz tačku <InlineMath>{"(0,-3)"}</InlineMath>. Odredi
                funkciju.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto je teme poznato, najprirodnije je da koristimo kanonski
                  oblik:
                </p>
                <MathBlock>{"f(x)=a(x-1)^2-4"}</MathBlock>
                <p>
                  Uvrstimo tačku <InlineMath>{"(0,-3)"}</InlineMath>:
                </p>
                <MathBlock>
                  {"-3=a(0-1)^2-4 \\iff -3=a-4 \\iff a=1"}
                </MathBlock>
                <p>Zato je</p>
                <MathBlock>{"f(x)=(x-1)^2-4=x^2-2x-3"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Ključna poruka lekcije"
        description="Kvadratnu funkciju ne posmatraj kao zbir tri člana, nego kao parabolu sa jasnom logikom."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Znak od <InlineMath>{"a"}</InlineMath> bira smer otvaranja, teme
            određuje ekstrem, nule određuju odnos prema{" "}
            <InlineMath>{"x"}</InlineMath>-osi, a iz te slike odmah sledi znak
            funkcije. Kada to vidiš kao jednu priču, zadaci postaju kraći i
            pregledniji.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Šta moraš da zapamtiš"
        title="Završni rezime"
        description="Ako posle ove lekcije znaš da iz izraza ax²+bx+c pouzdano dođeš do temena, nula, znaka i skice parabole, uradio si glavni posao. Sledeći logičan korak je detaljna algebra kvadratne jednačine i diskriminanta."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Teme je centralna tačka</h3>
            <p>
              Iz njega dobijaš minimum ili maksimum i mnogo lakše crtaš ceo
              grafik.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Znak od <InlineMath>{"a"}</InlineMath> je presudan
            </h3>
            <p>
              On govori da li je parabola otvorena naviše ili nadole i menja
              raspored znaka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Nule su preseci sa <InlineMath>{"x"}</InlineMath>-osom
            </h3>
            <p>
              Njihov broj i položaj direktno utiču na znak funkcije i na
              rešavanje nejednačina.
            </p>
          </article>
        </div>

        <div className={s.summaryGrid} style={{ marginTop: 16 }}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Dobra skica traži malo tačaka</h3>
            <p>
              Dovoljni su teme, osa simetrije, presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom i nule ako postoje.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeće učenje: kvadratna jednačina i diskriminanta, gde ćeš formalno
          povezati algebarsko rešavanje sa grafičkom slikom parabole.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
