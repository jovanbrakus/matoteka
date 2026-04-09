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
import SystemLab from "./SystemLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto-vazna", label: "Zašto je važna" },
  { href: "#ideja", label: "Osnovna ideja" },
  { href: "#linearna-kvadratna", label: "Linearna + kvadratna" },
  { href: "#dve-kvadratne", label: "Dve kvadratne" },
  { href: "#homogeni", label: "Homogeni sistemi" },
  { href: "#lab", label: "Interaktivna laboratorija" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključni obrasci" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson23Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 23"
        title={
          <>
            Sistemi{" "}
            <span className={cs.tHeroAccent}>kvadratnih jednačina</span>
          </>
        }
        description="Ova lekcija te uči kako da sistem sa dve promenljive svedeš na jednu kvadratnu jednačinu, kako da biraš najkraći metod i kako da ne izgubiš nijedno rešenje. Fokus je na tipovima zadataka koji se realno pojavljuju na prijemnim ispitima: linearna plus kvadratna jednačina, dve kvadratne jednačine i homogeni sistemi."
        heroImageSrc="/api/lessons/23/hero"
        heroImageAlt="Apstraktna matematička ilustracija sa parabolom i pravom koje se seku, za lekciju o sistemima kvadratnih jednačina"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da metodom zamene, oduzimanjem ili simetrijom sistem prebaciš na poznatu kvadratnu jednačinu u jednoj promenljivoj.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da staneš kada nades samo x, a zaboraviš da vratiš y, proveriš znak i upišeš uređene parove.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo prepoznavanje strukture sistema: sta izolujes, sta oduzimaš i kada homogen sistem svodiš na odnos x/y.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "75 do 90 minuta sa detaljnom teorijom, vođenim primerima i vežbom.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 17, 19, 20, 21 i 22: sistemi, parabola, diskriminanta, Vietove formule i kvadratne nejednačine.",
          },
          {
            label: "Glavna veština",
            description:
              "Da izabereš pravi metod i da iz kvadratne jednačine u jednoj promenljivoj sigurno vratiš sva uredena rešenja sistema.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za presek parabole i prave ili dve parabole, sa automatskim prikazom jednačine posle zamene.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNA ═══════════ */}
      <LessonSection
        id="zasto-vazna"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde se spajaju algebra i geometrija"
        description="Sistemi kvadratnih jednačina nisu samo još jedan skup formula. Oni proveravaju da li zaista umeš da povežeš više tema: sistem, kvadratnu jednačinu, geometrijski smisao preseka i disciplinu u proveri rešenja."
      >
        <div className={s.grid3}>
          <SectionCard title="Rešenje više nije samo broj">
            <p>
              Na prijemnom se često gubi poen zato što kandidat nađe jednu
              promenljivu, a zaboravi da sistem traži uređeni par{" "}
              <InlineMath>{"(x,y)"}</InlineMath>. Ova lekcija gradi naviku da
              svaku dobijenu vrednost povežeš sa drugom promenljivom.
            </p>
          </SectionCard>
          <SectionCard title="Broj rešenja vidiš kao broj preseka">
            <p>
              Kada jednačine posmatraš kao krive, odmah postaje jasno zasto
              sistem nekad ima nula, jedno ili dva rešenja. To ti kasnije pomaže
              i kod analitičke geometrije i kod parametarskih zadataka.
            </p>
          </SectionCard>
          <SectionCard title="Biranje metode je važnije od grubog računa">
            <p>
              Dobar rezultat ne dolazi iz nasumicnog razvijanja izraza, nego iz
              brzog uočavanja strukture: izoluj, oduzmi, iskoristi simetriju ili
              pređi na odnos. Upravo to se ovde vežba.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Osnovna ideja"
        title="Sistem je zajednicki uslov za isti uređeni par"
        description="Bez obzira na oblik jednačina, cilj je isti: pronaći sve parove (x,y) koji istovremeno zadovoljavaju obe jednačine. To je polažna misao koja čuva od većine grešaka."
      >
        <div className={s.grid2}>
          <div>
            <SectionCard title='Sta znači "resiti sistem"'>
              <MathBlock>
                {"\\begin{cases} F(x,y)=0 \\\\ G(x,y)=0 \\end{cases}"}
              </MathBlock>
              <p>
                Rešenje sistema je skup svih uređenih parova{" "}
                <InlineMath>{"(x,y)"}</InlineMath> za koje su obe jednakosti
                tačne. Ako je jednačina linearna, a druga kvadratna, i dalje je
                logika ista: tražimo njihove zajednicke tačke.
              </p>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <SectionCard title="Presek krivih daje broj rešenja">
                <p>
                  Ako jedna jednačina opisuje pravu, a druga parabolu, sistem
                  ima onoliko realnih rešenja koliko prava i parabola imaju
                  preseka. Ako se dodiruju, imaš jedno rešenje. Ako se ne seku,
                  nema realnih rešenja.
                </p>
                <InsightCard title="Grafička kontrola">
                  <p>
                    Ovo nije samo lep dodatak. Grafička slika ti pomaže da
                    proveriš da li algebarski rezultat ima smisla.
                  </p>
                </InsightCard>
              </SectionCard>
            </div>
          </div>

          <div>
            <SectionCard title="Kako da razmisljas pre računanja">
              <ol>
                <li>
                  Proveri da li iz jedne jednačine može lako da se izrazi{" "}
                  <InlineMath>{"x"}</InlineMath> ili{" "}
                  <InlineMath>{"y"}</InlineMath>.
                </li>
                <li>
                  Ako ne može, pogledaj da li se jednačine lepo sabiraju ili
                  oduzimaju.
                </li>
                <li>
                  Ako vidiš izraze{" "}
                  <InlineMath>{"x^2+y^2"}</InlineMath>,{" "}
                  <InlineMath>{"xy"}</InlineMath>,{" "}
                  <InlineMath>{"x+y"}</InlineMath>, potraži simetriju i
                  identitete.
                </li>
                <li>
                  Kod homogenog sistema obavezno proveri da li treba odvojeno
                  obraditi slučaj <InlineMath>{"y=0"}</InlineMath> ili{" "}
                  <InlineMath>{"x=0"}</InlineMath>.
                </li>
              </ol>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: da li je (2,3) rešenje ako samo jedna jednačina daje x=2, a druga y=3?"
                answer={
                  <p>
                    Ne. Sistem traži da isti uređeni par{" "}
                    <InlineMath>{"(2,3)"}</InlineMath> zadovolji obe jednačine
                    odjednom. Vrednosti dobijene odvojeno nemaju nikakvu
                    garanciju dok ih ne proveriš zajedno.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </LessonSection>

      {/* ═══════════ TIP 1: LINEARNA + KVADRATNA ═══════════ */}
      <LessonSection
        id="linearna-kvadratna"
        eyebrow="Tip 1"
        title="Linearna i kvadratna jednačina: metoda zamene"
        description="Ovo je najčešći i najpitkiji tip zadatka. Linearna jednačina ti praktično poklanja jednu promenljivu izrazenu preko druge. Tada sistem svodiš na jednu kvadratnu jednačinu i rešavaš je standardnim alatima."
      >
        <div className={s.grid2}>
          {/* Left: general procedure + mini example */}
          <div>
            <SectionCard title="Izoluj, zameni, resi, vrati">
              <MathBlock>
                {
                  "\\begin{cases} y = mx + n \\\\ Q(x,y)=0 \\end{cases} \\quad \\Longrightarrow \\quad Q(x,mx+n)=0"
                }
              </MathBlock>
              <div className={s.walkthrough}>
                <WalkStep
                  number={1}
                  title="Iz linearne jednačine izrazi promenljivu koja se najlakše izdvaja."
                />
                <WalkStep
                  number={2}
                  title="Tu zamenu unesi u kvadratnu jednačinu."
                />
                <WalkStep
                  number={3}
                  title="Dobijenu kvadratnu jednačinu reši pomoću diskriminante, faktorizacije ili Vietovih formula."
                />
                <WalkStep
                  number={4}
                  title="Svaku dobijenu vrednost vrati u linearnu jednačinu da dobijaš pripadni y ili x."
                />
              </div>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <SectionCard title="Mini primer: prava i parabola">
                <MathBlock>
                  {
                    "\\begin{cases} y = x + 1 \\\\ y = x^2 - x - 2 \\end{cases}"
                  }
                </MathBlock>
                <p>
                  Pošto su obe jednačine već izrazene preko{" "}
                  <InlineMath>{"y"}</InlineMath>, dovoljno je da ih izjednačiš:
                </p>
                <MathBlock>
                  {
                    "x + 1 = x^2 - x - 2 \\quad \\Longrightarrow \\quad x^2 - 2x - 3 = 0"
                  }
                </MathBlock>
                <p>
                  Odavde sledi <InlineMath>{"x=3"}</InlineMath> ili{" "}
                  <InlineMath>{"x=-1"}</InlineMath>. Zatim je{" "}
                  <InlineMath>{"y=x+1"}</InlineMath>, pa su rešenja{" "}
                  <InlineMath>{"(3,4)"}</InlineMath> i{" "}
                  <InlineMath>{"(-1,0)"}</InlineMath>.
                </p>
              </SectionCard>
            </div>
          </div>

          {/* Right: guided example + micro-check */}
          <div>
            <SectionCard title="Vođeni primer: linearna jednačina plus kruzni uslov">
              <MathBlock>
                {
                  "\\begin{cases} x + y = 4 \\\\ x^2 + y^2 = 10 \\end{cases}"
                }
              </MathBlock>
              <div className={s.walkthrough}>
                <WalkStep number={1} title="Izoluj promenljivu">
                  <p>
                    Iz prve jednačine uzmi{" "}
                    <InlineMath>{"y = 4 - x"}</InlineMath>.
                  </p>
                </WalkStep>
                <WalkStep number={2} title="Zameni u kvadratnu jednačinu">
                  <MathBlock>{"x^2 + (4-x)^2 = 10"}</MathBlock>
                </WalkStep>
                <WalkStep number={3} title="Sredi kvadratnu jednačinu">
                  <MathBlock>
                    {
                      "x^2 + 16 - 8x + x^2 = 10 \\Longrightarrow 2x^2 - 8x + 6 = 0 \\Longrightarrow x^2 - 4x + 3 = 0"
                    }
                  </MathBlock>
                  <p>
                    Zato je <InlineMath>{"x=1"}</InlineMath> ili{" "}
                    <InlineMath>{"x=3"}</InlineMath>.
                  </p>
                </WalkStep>
                <WalkStep number={4} title="Vrati drugu promenljivu">
                  <p>
                    Ako je <InlineMath>{"x=1"}</InlineMath>, tada je{" "}
                    <InlineMath>{"y=3"}</InlineMath>. Ako je{" "}
                    <InlineMath>{"x=3"}</InlineMath>, tada je{" "}
                    <InlineMath>{"y=1"}</InlineMath>.
                  </p>
                  <MathBlock>{"S = \\{(1,3), (3,1)\\}"}</MathBlock>
                </WalkStep>
              </div>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: zašto nije dovoljno da napišeš samo x=1,3?"
                answer={
                  <p>
                    Zato što sistem u dve promenljive ne traži skup vrednosti
                    jedne promenljive, već tačne parove. Vrednosti{" "}
                    <InlineMath>{"x=1"}</InlineMath> i{" "}
                    <InlineMath>{"x=3"}</InlineMath> nisu konačan odgovor dok ne
                    odredis pripadne vrednosti za{" "}
                    <InlineMath>{"y"}</InlineMath>.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </LessonSection>

      {/* ═══════════ TIP 2: DVE KVADRATNE ═══════════ */}
      <LessonSection
        id="dve-kvadratne"
        eyebrow="Tip 2"
        title="Dve kvadratne jednačine: ne širi sve odmah"
        description="Kada su obe jednačine kvadratne, učenici često instinktivno krenu u dugo razvijanje. To je obično najsporiji put. Mnogo češće se isplati da tražiš simetriju, da oduzmes jednačine ili da uočiš poznate identitete."
      >
        <div className={s.grid3}>
          <SectionCard title="Kada obe jednačine opisuju krive istog tipa">
            <p>
              Ako možeš da napišeš{" "}
              <InlineMath>{"y=f(x)"}</InlineMath> i{" "}
              <InlineMath>{"y=g(x)"}</InlineMath>, tada sistem svodiš na{" "}
              <InlineMath>{"f(x)=g(x)"}</InlineMath>. Drugim rečima: tražiš
              njihove preseke baš kao u grafičkom tumacenju.
            </p>
          </SectionCard>
          <SectionCard title="Brzo razdvajanje kvadrata">
            <p>
              Kada se u sistemu pojavljuju izrazi poput{" "}
              <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"x^2-y^2"}</InlineMath>, sabiranje ili oduzimanje
              trenutno razdvaja kvadrate i štedi ceo red računanja.
            </p>
          </SectionCard>
          <SectionCard title="Trazi simetriju">
            <p>
              U sistemima sa <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath> često ne moraš da rešavaš
              klasicnom zamenom. Identiteti te odmah vode do zbira ili razlike, a
              zatim do korena pomoćne kvadratne jednačine.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          {/* Example: addition/subtraction */}
          <SectionCard title="Primer sabiranja/oduzimanja">
            <MathBlock>
              {
                "\\begin{cases} x^2 + y^2 = 25 \\\\ x^2 - y^2 = 7 \\end{cases}"
              }
            </MathBlock>
            <p>Saberi i oduzmi jednačine:</p>
            <MathBlock>
              {"2x^2 = 32 \\Rightarrow x^2 = 16 \\Rightarrow x=\\pm4"}
            </MathBlock>
            <MathBlock>
              {"2y^2 = 18 \\Rightarrow y^2 = 9 \\Rightarrow y=\\pm3"}
            </MathBlock>
            <p>
              Pošto se u sistemu pojavljuju samo kvadrati, svi izbori znakova su
              dozvoljeni:
            </p>
            <MathBlock>
              {"S=\\{(4,3),(4,-3),(-4,3),(-4,-3)\\}"}
            </MathBlock>
          </SectionCard>

          {/* Example: symmetry */}
          <div>
            <SectionCard title="Kada su dati zbir kvadrata i proizvod">
              <MathBlock>
                {
                  "\\begin{cases} x^2 + y^2 = 5 \\\\ xy = 2 \\end{cases}"
                }
              </MathBlock>
              <p>Prvo izračunaj zbir:</p>
              <MathBlock>
                {
                  "(x+y)^2 = x^2 + 2xy + y^2 = 5 + 4 = 9 \\Rightarrow x+y = \\pm 3"
                }
              </MathBlock>
              <p>
                Zatim posmatraj <InlineMath>{"x"}</InlineMath> i{" "}
                <InlineMath>{"y"}</InlineMath> kao korene jednačine sa zadatim
                zbirom i proizvodom. Dobijas parove{" "}
                <InlineMath>{"(1,2)"}</InlineMath>,{" "}
                <InlineMath>{"(2,1)"}</InlineMath>,{" "}
                <InlineMath>{"(-1,-2)"}</InlineMath>,{" "}
                <InlineMath>{"(-2,-1)"}</InlineMath>.
              </p>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: ako dobijaš x^2=16, zašto moraš da napišeš i x=-4?"
                answer={
                  <p>
                    Zato što kvadrat briše znak. Jednačina{" "}
                    <InlineMath>{"x^2=16"}</InlineMath> ima dva realna rešenja,{" "}
                    <InlineMath>{"x=4"}</InlineMath> i{" "}
                    <InlineMath>{"x=-4"}</InlineMath>. Ovaj korak je jedna od
                    najčešćih grešaka u sistemima sa kvadratima.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </LessonSection>

      {/* ═══════════ TIP 3: HOMOGENI SISTEMI ═══════════ */}
      <LessonSection
        id="homogeni"
        eyebrow="Tip 3"
        title="Homogeni sistemi: reši odnos, pa vrati pravac"
        description="Homogeni sistemi drugog stepena često deluju čudno zato što ne traže izolaciju promenljive na uobičajen način. Njihova snaga je u tome što svaka jednačina ima isti stepen, pa se prirodno pojavljuje odnos x/y ili y/x."
      >
        <div className={s.grid2}>
          {/* Left: theory */}
          <div>
            <SectionCard title="Svaki član je stepena 2">
              <MathBlock>
                {
                  "\\begin{cases} a_1x^2+b_1xy+c_1y^2=0 \\\\ a_2x^2+b_2xy+c_2y^2=0 \\end{cases}"
                }
              </MathBlock>
              <p>
                Ako je <InlineMath>{"y \\neq 0"}</InlineMath>, možeš da podeliš
                obe jednačine sa <InlineMath>{"y^2"}</InlineMath> i uvedes smenu{" "}
                <InlineMath>{"t=\\frac{x}{y}"}</InlineMath>. Tada se sistem
                pretvara u dve kvadratne jednačine u promenljivoj{" "}
                <InlineMath>{"t"}</InlineMath>.
              </p>
              <MathBlock>
                {
                  "a_1t^2+b_1t+c_1=0, \\qquad a_2t^2+b_2t+c_2=0"
                }
              </MathBlock>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <SectionCard title="Homogenost čuva odnos">
                <p>
                  Ako su jednačine homogene i desna strana je nula, tada
                  skaliranje{" "}
                  <InlineMath>
                    {"(x,y)\\mapsto (\\lambda x,\\lambda y)"}
                  </InlineMath>{" "}
                  ne menja istinitost jednačina. Zato rešenja često leže na
                  pravama kroz koordinatni početak, što objašnjava zasto
                  dobijamo odnose tipa <InlineMath>{"x=3y"}</InlineMath>.
                </p>
              </SectionCard>
            </div>
          </div>

          {/* Right: guided example + micro-check */}
          <div>
            <SectionCard title="Primer sa zajednickim odnosom">
              <MathBlock>
                {
                  "\\begin{cases} x^2 - 5xy + 6y^2 = 0 \\\\ x^2 - 4xy + 3y^2 = 0 \\end{cases}"
                }
              </MathBlock>
              <div className={s.walkthrough}>
                <WalkStep number={1} title="Proveri poseban slučaj y=0">
                  <p>
                    Tada iz prve jednačine sledi{" "}
                    <InlineMath>{"x^2=0"}</InlineMath>, pa je{" "}
                    <InlineMath>{"(0,0)"}</InlineMath> rešenje.
                  </p>
                </WalkStep>
                <WalkStep
                  number={2}
                  title={
                    <>
                      Ako je{" "}
                      <InlineMath>{"y \\neq 0"}</InlineMath>, uvedi{" "}
                      <InlineMath>{"t=\\frac{x}{y}"}</InlineMath>
                    </>
                  }
                >
                  <MathBlock>
                    {
                      "t^2 - 5t + 6 = 0, \\qquad t^2 - 4t + 3 = 0"
                    }
                  </MathBlock>
                </WalkStep>
                <WalkStep
                  number={3}
                  title="Nađi zajednicku vrednost odnosa"
                >
                  <p>
                    Prva jednačina daje <InlineMath>{"t=2"}</InlineMath> ili{" "}
                    <InlineMath>{"t=3"}</InlineMath>, a druga{" "}
                    <InlineMath>{"t=1"}</InlineMath> ili{" "}
                    <InlineMath>{"t=3"}</InlineMath>. Zajednicko je samo{" "}
                    <InlineMath>{"t=3"}</InlineMath>.
                  </p>
                </WalkStep>
                <WalkStep number={4} title="Vrati odnos na promenljive">
                  <MathBlock>
                    {
                      "\\frac{x}{y}=3 \\Longrightarrow x=3y"
                    }
                  </MathBlock>
                  <p>
                    Resenja su svi parovi oblika{" "}
                    <InlineMath>{"(3k,k)"}</InlineMath>, gde je{" "}
                    <InlineMath>{"k \\in \\mathbb{R}"}</InlineMath>. U tom skupu
                    se nalazi i <InlineMath>{"(0,0)"}</InlineMath> za{" "}
                    <InlineMath>{"k=0"}</InlineMath>.
                  </p>
                </WalkStep>
              </div>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: zašto ne smeš odmah da delis sa y^2?"
                answer={
                  <p>
                    Zato što možda postoji rešenje sa{" "}
                    <InlineMath>{"y=0"}</InlineMath>. Deljenjem bi taj slučaj
                    nestao iz razmatranja. Kod homogenih sistema se zato uvek
                    prvo proverava posebni slučaj kada imenilac može biti nula.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNA LABORATORIJA ═══════════ */}
      <LessonSection
        id="lab"
        eyebrow="Interaktivni deo"
        title="Laboratorija preseka krivih"
        description="Menjaj koeficijente i gledaj kako se broj preseka menja. Tako direktno vidiš zašto posle zamene dobijaš nula, jedno ili dva realna rešenja."
      >
        <SystemLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš sta ce se desiti sa brojem preseka, pa
            tek onda proveri ekran. Laboratorija koristi numeričku
            aproksimaciju, a u teoriji i na papiru ostajas u tačnom simboličkom
            zapisu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Tri modela koja moraš da znaš bez lutanja"
        description="Ovi primeri su birani tako da pokriju tri različita načina razmisljanja. Ako ih zaista razumeš, većina prijemnih zadataka iz ove oblasti prestaće da izgleda nova."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Linearna plus kvadratna jednačina
            </h3>
            <MathBlock>
              {
                "\\begin{cases} x+y=5 \\\\ x^2+y^2=13 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zamena">
                <p>
                  Iz prve jednačine uzmi{" "}
                  <InlineMath>{"y=5-x"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Prelazak na jednu promenljivu">
                <MathBlock>
                  {
                    "x^2 + (5-x)^2 = 13 \\Longrightarrow 2x^2 - 10x + 12 = 0 \\Longrightarrow x^2 - 5x + 6 = 0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Resenja sistema">
                <p>
                  Odavde je <InlineMath>{"x=2"}</InlineMath> ili{" "}
                  <InlineMath>{"x=3"}</InlineMath>, pa su rešenja{" "}
                  <InlineMath>{"(2,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,2)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Dve kvadratne jednačine sa simetrijom
            </h3>
            <MathBlock>
              {
                "\\begin{cases} x^2+y^2=10 \\\\ xy=3 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pronadi zbir">
                <MathBlock>
                  {
                    "(x+y)^2 = x^2 + 2xy + y^2 = 10 + 6 = 16 \\Rightarrow x+y=\\pm4"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Formiraj pomoćnu jednačinu">
                <p>
                  Ako je <InlineMath>{"x+y=4"}</InlineMath> i{" "}
                  <InlineMath>{"xy=3"}</InlineMath>, tada su{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath> koreni jednačine{" "}
                  <InlineMath>{"t^2-4t+3=0"}</InlineMath>, pa dobijamo{" "}
                  <InlineMath>{"(1,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,1)"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Obradi i negativan zbir">
                <p>
                  Ako je <InlineMath>{"x+y=-4"}</InlineMath>, tada je pomoćna
                  jednačina <InlineMath>{"t^2+4t+3=0"}</InlineMath>, pa
                  dobijamo <InlineMath>{"(-1,-3)"}</InlineMath> i{" "}
                  <InlineMath>{"(-3,-1)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Homogeni sistem sa beskonačno mnogo rešenja
            </h3>
            <MathBlock>
              {
                "\\begin{cases} x^2 - 3xy + 2y^2 = 0 \\\\ x^2 - 4xy + 4y^2 = 0 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj faktorizaciju">
                <MathBlock>
                  {"(x-y)(x-2y)=0, \\qquad (x-2y)^2=0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Zajednicki uslov">
                <p>
                  Druga jednačina prisiljava{" "}
                  <InlineMath>{"x=2y"}</InlineMath>. Taj uslov automatski
                  zadovoljava i prvu jednačinu.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Skup rešenja">
                <MathBlock>
                  {"S=\\{(2k,k)\\mid k\\in\\mathbb{R}\\}"}
                </MathBlock>
                <p>
                  Ovaj primer je važan jer pokazuje da sistem ne mora imati
                  konačno mnogo rešenja.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNI OBRASCI ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključni obrasci"
        title="Šabloni koje vredi prepoznati odmah"
        description="Ova sekcija nije za slepo pamćenje, nego kao mapa: cim prepoznaš obrazac, znaš koji alat iz prethodnih lekcija treba da aktiviras."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Zamena"
            formula={"\\begin{cases} y = mx+n \\\\ Q(x,y)=0 \\end{cases} \\Longrightarrow Q(x,mx+n)=0"}
            note="Najčešći ulaz. Resavas kvadratnu jednačinu u jednoj promenljivoj i vraćaš drugu koordinatu."
          />
          <FormulaCard
            title="Izjednacavanje"
            formula={"y=f(x),\\qquad y=g(x) \\Longrightarrow f(x)=g(x)"}
            note="Algebarski tražiš preseke, a geometrijski gledaš gde se dve krive seku."
          />
          <FormulaCard
            title="Simetrija: identiteti"
            formula="(x+y)^2=x^2+y^2+2xy"
            note="Kada imaš zbir kvadrata i proizvod, ovo je često najbrzi put do zbira ili razlike."
          />
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula={"\\begin{cases} x^2+y^2=A \\\\ x^2-y^2=B \\end{cases} \\Longrightarrow x^2=\\frac{A+B}{2},\\quad y^2=\\frac{A-B}{2}"}
            note="Odmah dobijaš kvadrate promenljivih, a zatim vodiš računa o oba znaka."
          />
          <FormulaCard
            title="Homogeni sistemi: odnos"
            formula={"t=\\frac{x}{y} \\quad \\text{ili} \\quad u=\\frac{y}{x}"}
            note="Pre podele obavezno proveri da li su y=0 ili x=0 mogući slučajevi."
          />
          <FormulaCard
            title="Diskriminanta i grafika"
            formula={"\\Delta > 0 \\Rightarrow \\text{dva preseka},\\quad \\Delta = 0 \\Rightarrow \\text{dodir},\\quad \\Delta < 0 \\Rightarrow \\text{nema preseka}"}
            note="Kada sistem svedeš na kvadratnu jednačinu, diskriminanta ti odmah daje sliku o realnim resenjima."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube laki poeni"
        description="Greške u ovoj oblasti retko dolaze iz teške matematike. Mnogo češće nastaju iz brzine, rutine ili preteranog širenja izraza bez plana."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Stajanje posle nalazenja jedne promenljive
            </h3>
            <p>
              Ako si dobio samo <InlineMath>{"x"}</InlineMath>, sistem još nije
              resen. Moraš da vratiš <InlineMath>{"y"}</InlineMath> i zapišeš
              uređene parove. Ovo je najtipičnija formalna greška.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Gubitak drugog znaka kod kvadrata
            </h3>
            <p>
              Iz <InlineMath>{"x^2=9"}</InlineMath> sledi{" "}
              <InlineMath>{"x=\\pm3"}</InlineMath>, a ne samo{" "}
              <InlineMath>{"x=3"}</InlineMath>. U sistemima sa kvadratima to
              direktno prepolovi broj tačnih rešenja ako nisi pažljiv.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Deljenje sa izrazom koji može biti nula
            </h3>
            <p>
              Kod homogenih sistema ne smeš odmah deliti sa{" "}
              <InlineMath>{"x"}</InlineMath>, <InlineMath>{"y"}</InlineMath>,{" "}
              <InlineMath>{"x^2"}</InlineMath> ili{" "}
              <InlineMath>{"y^2"}</InlineMath> bez posebne provere. Tako vrlo
              lako izgubiš legitimno rešenje <InlineMath>{"(0,0)"}</InlineMath>{" "}
              ili čitavu familiju rešenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nasumicno razvijanje umesto prepoznavanja obrasca
            </h3>
            <p>
              Kada vidiš <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath>, najčešće postoji elegantniji put
              od punog širenja. Na prijemnom vreme odlazi upravo na takvim
              nepotrebnim računima.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje broja rešenja za x i broja rešenja sistema
            </h3>
            <p>
              Jedna vrednost <InlineMath>{"x"}</InlineMath> može dati jednu
              vrednost <InlineMath>{"y"}</InlineMath>, ali simetricni zadaci
              ponekad iz iste informacije stvaraju više uređenih parova. Uvek
              misli u parovima.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Bez provere smisla rezultata
            </h3>
            <p>
              Ako ti grafička slika sugerise da prava i parabola ne mogu imati
              četiri preseka, a ti si ih dobio, negde si pogrešio. Kratak
              mentalni graf je odlicna kontrola.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da pod pritiskom vremena prepoznaš pravi metod"
        description="Na prijemnom zadatak retko piše primeni metodu zamene. Umesto toga, dobijaš sistem i moraš sam da odlučiš koji alat najbrže vodi do kraja."
      >
        <div className={s.grid2}>
          <SectionCard title="Prijemna rutina od 20 sekundi">
            <ol>
              <li>
                Pogledaj da li jedna jednačina odmah daje{" "}
                <InlineMath>{"x"}</InlineMath> ili{" "}
                <InlineMath>{"y"}</InlineMath>.
              </li>
              <li>
                Ako ne daje, proveri da li je sistem simetričan ili se lako
                sabira/oduzima.
              </li>
              <li>
                Kod homogenog oblika odmah zabeleži: proveri{" "}
                <InlineMath>{"x=0"}</InlineMath> ili{" "}
                <InlineMath>{"y=0"}</InlineMath>.
              </li>
              <li>Tek onda kreni u račun.</li>
            </ol>
          </SectionCard>

          <SectionCard title="Tipicne prijemne formulacije">
            <ul>
              <li>
                Reši sistem u skupu realnih brojeva i napiši sva rešenja kao
                uređene parove.
              </li>
              <li>
                Odredi broj realnih rešenja sistema bez eksplicitnog računanja
                svih koordinata.
              </li>
              <li>
                Iskoristi simetriju da skratis račun u sistemu sa{" "}
                <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
                <InlineMath>{"xy"}</InlineMath>.
              </li>
              <li>
                Prepoznaj kada homogeni sistem ima beskonačno mnogo rešenja po
                pravama kroz koordinatni početak.
              </li>
              <li>
                Objasni ili proveri grafički smisao dobijenih rešenja.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 4 koraka">
          <p>
            1. Prepoznaj strukturu sistema. 2. Izaberi najkraći metod (zamena,
            simetrija, sabiranje ili odnos). 3. Svedi na jednačinu u jednoj
            promenljivoj. 4. Vrati sve uređene parove i proveri ih. Taj redosled
            rešava veliki deo zadataka iz ove oblasti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li umeš bez pomoci"
        description="Prvo pokušaj samostalno. Tek kada zaista zapneš, otvori rešenje. Na prijemnom nije cilj da zapamtiš napamet, nego da prepoznaš tip i odabereš metod."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Prava i parabola"
            problem={
              <>
                <p>Reši sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} y = 2x - 1 \\\\ y = x^2 - 4x + 5 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Izjednaći obe desne strane:</p>
                <MathBlock>
                  {
                    "2x-1 = x^2-4x+5 \\Longrightarrow x^2-6x+6=0"
                  }
                </MathBlock>
                <p>
                  Diskriminanta je{" "}
                  <InlineMath>{"\\Delta = 36-24=12"}</InlineMath>, pa je
                </p>
                <MathBlock>
                  {"x = \\frac{6\\pm\\sqrt{12}}{2}=3\\pm\\sqrt{3}"}
                </MathBlock>
                <p>
                  Vracanjem u <InlineMath>{"y=2x-1"}</InlineMath> dobijamo
                </p>
                <MathBlock>{"y = 5 \\pm 2\\sqrt{3}"}</MathBlock>
                <p>Zato je</p>
                <MathBlock>
                  {
                    "S=\\left\\{\\left(3+\\sqrt{3},\\,5+2\\sqrt{3}\\right),\\left(3-\\sqrt{3},\\,5-2\\sqrt{3}\\right)\\right\\}"
                  }
                </MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 2: Linearna plus kvadratna"
            problem={
              <>
                <p>Reši sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x+y=5 \\\\ x^2+y^2=13 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Iz prve jednačine uzmi{" "}
                  <InlineMath>{"y=5-x"}</InlineMath>. Tada:
                </p>
                <MathBlock>
                  {
                    "x^2 + (5-x)^2 = 13 \\Longrightarrow 2x^2 - 10x + 12 = 0 \\Longrightarrow x^2 - 5x + 6 = 0"
                  }
                </MathBlock>
                <p>
                  Dakle <InlineMath>{"x=2"}</InlineMath> ili{" "}
                  <InlineMath>{"x=3"}</InlineMath>. Odavde dobijamo{" "}
                  <InlineMath>{"y=3"}</InlineMath> ili{" "}
                  <InlineMath>{"y=2"}</InlineMath>, pa je
                </p>
                <MathBlock>{"S=\\{(2,3),(3,2)\\}"}</MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 3: Sabiranje i oduzimanje"
            problem={
              <>
                <p>Reši sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x^2+y^2=20 \\\\ x^2-y^2=4 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Sabiranjem dobijamo{" "}
                  <InlineMath>{"2x^2=24"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x^2=12"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x=\\pm2\\sqrt{3}"}</InlineMath>. Oduzimanjem
                  dobijamo <InlineMath>{"2y^2=16"}</InlineMath>, pa je{" "}
                  <InlineMath>{"y^2=8"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"y=\\pm2\\sqrt{2}"}</InlineMath>.
                </p>
                <p>
                  Kako su u sistemu samo kvadrati, svi izbori znakova su
                  dozvoljeni:
                </p>
                <MathBlock>
                  {"S=\\{(\\pm2\\sqrt{3},\\pm2\\sqrt{2})\\}"}
                </MathBlock>
                <p>
                  To znači četiri uredena para:{" "}
                  <InlineMath>{"(2\\sqrt{3},2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(2\\sqrt{3},-2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(-2\\sqrt{3},2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(-2\\sqrt{3},-2\\sqrt{2})"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 4: Sistem sa simetrijom"
            problem={
              <>
                <p>Reši sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x^2+y^2=10 \\\\ xy=3 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Računamo zbir:</p>
                <MathBlock>
                  {
                    "(x+y)^2 = x^2 + 2xy + y^2 = 10 + 6 = 16 \\Rightarrow x+y=\\pm4"
                  }
                </MathBlock>
                <p>
                  Ako je <InlineMath>{"x+y=4"}</InlineMath>, tada su{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath> koreni jednačine{" "}
                  <InlineMath>{"t^2-4t+3=0"}</InlineMath>, pa su parovi{" "}
                  <InlineMath>{"(1,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,1)"}</InlineMath>.
                </p>
                <p>
                  Ako je <InlineMath>{"x+y=-4"}</InlineMath>, tada su koreni
                  jednačine <InlineMath>{"t^2+4t+3=0"}</InlineMath>, pa su
                  parovi <InlineMath>{"(-1,-3)"}</InlineMath> i{" "}
                  <InlineMath>{"(-3,-1)"}</InlineMath>.
                </p>
                <p>Konacno:</p>
                <MathBlock>
                  {"S=\\{(1,3),(3,1),(-1,-3),(-3,-1)\\}"}
                </MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 5: Homogeni sistem"
            problem={
              <>
                <p>Reši sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x^2-3xy+2y^2=0 \\\\ x^2-4xy+4y^2=0 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Druga jednačina je</p>
                <MathBlock>
                  {"(x-2y)^2=0 \\Rightarrow x=2y"}
                </MathBlock>
                <p>Uvrstivanjem u prvu jednačinu dobijamo</p>
                <MathBlock>
                  {
                    "(2y)^2 - 3(2y)y + 2y^2 = 4y^2 - 6y^2 + 2y^2 = 0"
                  }
                </MathBlock>
                <p>
                  Dakle svaki par oblika <InlineMath>{"(2k,k)"}</InlineMath>{" "}
                  zadovoljava sistem:
                </p>
                <MathBlock>
                  {"S=\\{(2k,k)\\mid k\\in\\mathbb{R}\\}"}
                </MathBlock>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 6: Jedan dodir"
            problem={
              <>
                <p>Odredi broj realnih rešenja sistema i reši ga:</p>
                <MathBlock>
                  {
                    "\\begin{cases} y=x^2-4x+3 \\\\ y=-1 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Izjednacimo:</p>
                <MathBlock>
                  {
                    "x^2-4x+3=-1 \\Longrightarrow x^2-4x+4=0 \\Longrightarrow (x-2)^2=0"
                  }
                </MathBlock>
                <p>
                  Dakle postoji samo jedno realno rešenje za{" "}
                  <InlineMath>{"x"}</InlineMath>, i to{" "}
                  <InlineMath>{"x=2"}</InlineMath>. Zatim je{" "}
                  <InlineMath>{"y=-1"}</InlineMath>. Sistem ima jedan realan
                  uređeni par:
                </p>
                <MathBlock>{"S=\\{(2,-1)\\}"}</MathBlock>
                <p>
                  Geometrijski, prava <InlineMath>{"y=-1"}</InlineMath> dodiruje
                  parabolu u jednoj tački.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="U skoro svakom sistemu tražiš promenu pogleda, ne jaci račun"
        description="Najvažnija misaona poruka ove lekcije glasi: sistem kvadratnih jednačina retko se rešava sirovom silom. Rešava se tako što ga prevedeš u poznat oblik."
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Nekad je to zamena, nekad simetrija, nekad oduzimanje, a kod
            homogenih sistema odnos promenljivih. Kada naučiš da prepoznaješ taj
            prelaz, zadatak postaje mnogo laksi.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš"
        description="Ovo su ideje koje treba da ostanu stabilne i kada prode vreme od učenja. Ako njih držiš pod kontrolom, i novi zadaci iz ove oblasti biće rešivi."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Sistem traži uređene parove</h3>
            <p>
              Ne završavaj zadatak kada nades samo{" "}
              <InlineMath>{"x"}</InlineMath> ili samo{" "}
              <InlineMath>{"y"}</InlineMath>. Uvek vrati drugu promenljivu i
              zapisi kompletna rešenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Kod linearne plus kvadratne jednačine dominira zamena
            </h3>
            <p>
              Izoluj jednu promenljivu, uvrsti je i svedi sistem na kvadratnu
              jednačinu u jednoj promenljivoj.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Dve kvadratne jednačine često kriju strukturu
            </h3>
            <p>
              Pre nego što razviješ sve članove, proveri da li sistem trazi
              sabiranje, oduzimanje ili identitete sa{" "}
              <InlineMath>{"x+y"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Homogeni sistemi traže proveru nule i odnos
            </h3>
            <p>
              Prvo proveri da li su <InlineMath>{"x=0"}</InlineMath> ili{" "}
              <InlineMath>{"y=0"}</InlineMath> moguci, a zatim po potrebi uvedi{" "}
              <InlineMath>{"\\frac{x}{y}"}</InlineMath> ili{" "}
              <InlineMath>{"\\frac{y}{x}"}</InlineMath>.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je da ovu sigurnost zadržiš i kada jednačine
          više nisu algebarske polinomske, što te vodi ka narednim lekcijama o
          iracionalnim jednačinama. Ali pre toga vredi uraditi još nekoliko
          parametarskih i grafičkih zadataka iz sistema.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
