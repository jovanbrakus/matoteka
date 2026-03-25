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
  { href: "#zasto-vazna", label: "Zasto je vazna" },
  { href: "#ideja", label: "Osnovna ideja" },
  { href: "#linearna-kvadratna", label: "Linearna + kvadratna" },
  { href: "#dve-kvadratne", label: "Dve kvadratne" },
  { href: "#homogeni", label: "Homogeni sistemi" },
  { href: "#lab", label: "Interaktivna laboratorija" },
  { href: "#primeri", label: "Vodeni primeri" },
  { href: "#formule", label: "Kljucni obrasci" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson23Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 23"
        title={
          <>
            Sistemi{" "}
            <span className={cs.tHeroAccent}>kvadratnih jednacina</span>
          </>
        }
        description="Ova lekcija te uci kako da sistem sa dve promenljive svedes na jednu kvadratnu jednacinu, kako da biras najkraci metod i kako da ne izgubis nijedno resenje. Fokus je na tipovima zadataka koji se realno pojavljuju na prijemnim ispitima: linearna plus kvadratna jednacina, dve kvadratne jednacine i homogeni sistemi."
        heroImageSrc="/api/lessons/23/hero"
        heroImageAlt="Apstraktna matematicka ilustracija sa parabolom i pravom koje se seku, za lekciju o sistemima kvadratnih jednacina"
        cards={[
          {
            label: "Naucices",
            description:
              "Kako da metodom zamene, oduzimanjem ili simetrijom sistem prebacis na poznatu kvadratnu jednacinu u jednoj promenljivoj.",
          },
          {
            label: "Najveca zamka",
            description:
              "Da stanes kada nades samo x, a zaboravis da vratis y, proveris znak i upises uredene parove.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brzo prepoznavanje strukture sistema: sta izolujes, sta oduzimas i kada homogen sistem svodis na odnos x/y.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "75 do 90 minuta sa detaljnom teorijom, vodenim primerima i vezbom.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 17, 19, 20, 21 i 22: sistemi, parabola, diskriminanta, Vietove formule i kvadratne nejednacine.",
          },
          {
            label: "Glavna vestina",
            description:
              "Da izaberes pravi metod i da iz kvadratne jednacine u jednoj promenljivoj sigurno vratis sva uredena resenja sistema.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za presek parabole i prave ili dve parabole, sa automatskim prikazom jednacine posle zamene.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNA ═══════════ */}
      <LessonSection
        id="zasto-vazna"
        eyebrow="Zasto je ova lekcija vazna"
        title="Ovde se spajaju algebra i geometrija"
        description="Sistemi kvadratnih jednacina nisu samo jos jedan skup formula. Oni proveravaju da li zaista umes da povezes vise tema: sistem, kvadratnu jednacinu, geometrijski smisao preseka i disciplinu u proveri resenja."
      >
        <div className={s.grid3}>
          <SectionCard title="Resenje vise nije samo broj">
            <p>
              Na prijemnom se cesto gubi poen zato sto kandidat nade jednu
              promenljivu, a zaboravi da sistem trazi uredeni par{" "}
              <InlineMath>{"(x,y)"}</InlineMath>. Ova lekcija gradi naviku da
              svaku dobijenu vrednost povezes sa drugom promenljivom.
            </p>
          </SectionCard>
          <SectionCard title="Broj resenja vidis kao broj preseka">
            <p>
              Kada jednacine posmatras kao krive, odmah postaje jasno zasto
              sistem nekad ima nula, jedno ili dva resenja. To ti kasnije pomaze
              i kod analiticke geometrije i kod parametarskih zadataka.
            </p>
          </SectionCard>
          <SectionCard title="Biranje metode je vaznije od grubog racuna">
            <p>
              Dobar rezultat ne dolazi iz nasumicnog razvijanja izraza, nego iz
              brzog uocavanja strukture: izoluj, oduzmi, iskoristi simetriju ili
              predi na odnos. Upravo to se ovde vezba.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="ideja"
        eyebrow="Osnovna ideja"
        title="Sistem je zajednicki uslov za isti uredeni par"
        description="Bez obzira na oblik jednacina, cilj je isti: pronaci sve parove (x,y) koji istovremeno zadovoljavaju obe jednacine. To je polazna misao koja cuva od vecine gresaka."
      >
        <div className={s.grid2}>
          <div>
            <SectionCard title='Sta znaci "resiti sistem"'>
              <MathBlock>
                {"\\begin{cases} F(x,y)=0 \\\\ G(x,y)=0 \\end{cases}"}
              </MathBlock>
              <p>
                Resenje sistema je skup svih uredenih parova{" "}
                <InlineMath>{"(x,y)"}</InlineMath> za koje su obe jednakosti
                tacne. Ako je jednacina linearna, a druga kvadratna, i dalje je
                logika ista: trazimo njihove zajednicke tacke.
              </p>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <SectionCard title="Presek krivih daje broj resenja">
                <p>
                  Ako jedna jednacina opisuje pravu, a druga parabolu, sistem
                  ima onoliko realnih resenja koliko prava i parabola imaju
                  preseka. Ako se dodiruju, imas jedno resenje. Ako se ne seku,
                  nema realnih resenja.
                </p>
                <InsightCard title="Graficka kontrola">
                  <p>
                    Ovo nije samo lep dodatak. Graficka slika ti pomaze da
                    proveris da li algebarski rezultat ima smisla.
                  </p>
                </InsightCard>
              </SectionCard>
            </div>
          </div>

          <div>
            <SectionCard title="Kako da razmisljas pre racunanja">
              <ol>
                <li>
                  Proveri da li iz jedne jednacine moze lako da se izrazi{" "}
                  <InlineMath>{"x"}</InlineMath> ili{" "}
                  <InlineMath>{"y"}</InlineMath>.
                </li>
                <li>
                  Ako ne moze, pogledaj da li se jednacine lepo sabiraju ili
                  oduzimaju.
                </li>
                <li>
                  Ako vidis izraze{" "}
                  <InlineMath>{"x^2+y^2"}</InlineMath>,{" "}
                  <InlineMath>{"xy"}</InlineMath>,{" "}
                  <InlineMath>{"x+y"}</InlineMath>, potrazi simetriju i
                  identitete.
                </li>
                <li>
                  Kod homogenog sistema obavezno proveri da li treba odvojeno
                  obraditi slucaj <InlineMath>{"y=0"}</InlineMath> ili{" "}
                  <InlineMath>{"x=0"}</InlineMath>.
                </li>
              </ol>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: da li je (2,3) resenje ako samo jedna jednacina daje x=2, a druga y=3?"
                answer={
                  <p>
                    Ne. Sistem trazi da isti uredeni par{" "}
                    <InlineMath>{"(2,3)"}</InlineMath> zadovolji obe jednacine
                    odjednom. Vrednosti dobijene odvojeno nemaju nikakvu
                    garanciju dok ih ne proveris zajedno.
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
        title="Linearna i kvadratna jednacina: metoda zamene"
        description="Ovo je najcesci i najpitkiji tip zadatka. Linearna jednacina ti prakticno poklanja jednu promenljivu izrazenu preko druge. Tada sistem svodis na jednu kvadratnu jednacinu i resavas je standardnim alatima."
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
                  title="Iz linearne jednacine izrazi promenljivu koja se najlakse izdvaja."
                />
                <WalkStep
                  number={2}
                  title="Tu zamenu unesi u kvadratnu jednacinu."
                />
                <WalkStep
                  number={3}
                  title="Dobijenu kvadratnu jednacinu resi pomocu diskriminante, faktorizacije ili Vietovih formula."
                />
                <WalkStep
                  number={4}
                  title="Svaku dobijenu vrednost vrati u linearnu jednacinu da dobijas pripadni y ili x."
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
                  Posto su obe jednacine vec izrazene preko{" "}
                  <InlineMath>{"y"}</InlineMath>, dovoljno je da ih izjednacis:
                </p>
                <MathBlock>
                  {
                    "x + 1 = x^2 - x - 2 \\quad \\Longrightarrow \\quad x^2 - 2x - 3 = 0"
                  }
                </MathBlock>
                <p>
                  Odavde sledi <InlineMath>{"x=3"}</InlineMath> ili{" "}
                  <InlineMath>{"x=-1"}</InlineMath>. Zatim je{" "}
                  <InlineMath>{"y=x+1"}</InlineMath>, pa su resenja{" "}
                  <InlineMath>{"(3,4)"}</InlineMath> i{" "}
                  <InlineMath>{"(-1,0)"}</InlineMath>.
                </p>
              </SectionCard>
            </div>
          </div>

          {/* Right: guided example + micro-check */}
          <div>
            <SectionCard title="Vodeni primer: linearna jednacina plus kruzni uslov">
              <MathBlock>
                {
                  "\\begin{cases} x + y = 4 \\\\ x^2 + y^2 = 10 \\end{cases}"
                }
              </MathBlock>
              <div className={s.walkthrough}>
                <WalkStep number={1} title="Izoluj promenljivu">
                  <p>
                    Iz prve jednacine uzmi{" "}
                    <InlineMath>{"y = 4 - x"}</InlineMath>.
                  </p>
                </WalkStep>
                <WalkStep number={2} title="Zameni u kvadratnu jednacinu">
                  <MathBlock>{"x^2 + (4-x)^2 = 10"}</MathBlock>
                </WalkStep>
                <WalkStep number={3} title="Sredi kvadratnu jednacinu">
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
                question="Mikro-provera: zasto nije dovoljno da napises samo x=1,3?"
                answer={
                  <p>
                    Zato sto sistem u dve promenljive ne trazi skup vrednosti
                    jedne promenljive, vec tacne parove. Vrednosti{" "}
                    <InlineMath>{"x=1"}</InlineMath> i{" "}
                    <InlineMath>{"x=3"}</InlineMath> nisu konacan odgovor dok ne
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
        title="Dve kvadratne jednacine: ne siri sve odmah"
        description="Kada su obe jednacine kvadratne, ucenici cesto instinktivno krenu u dugo razvijanje. To je obicno najsporiji put. Mnogo cesce se isplati da trazis simetriju, da oduzmes jednacine ili da uocis poznate identitete."
      >
        <div className={s.grid3}>
          <SectionCard title="Kada obe jednacine opisuju krive istog tipa">
            <p>
              Ako mozes da napises{" "}
              <InlineMath>{"y=f(x)"}</InlineMath> i{" "}
              <InlineMath>{"y=g(x)"}</InlineMath>, tada sistem svodis na{" "}
              <InlineMath>{"f(x)=g(x)"}</InlineMath>. Drugim recima: trazis
              njihove preseke bas kao u grafickom tumacenju.
            </p>
          </SectionCard>
          <SectionCard title="Brzo razdvajanje kvadrata">
            <p>
              Kada se u sistemu pojavljuju izrazi poput{" "}
              <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"x^2-y^2"}</InlineMath>, sabiranje ili oduzimanje
              trenutno razdvaja kvadrate i stedi ceo red racunanja.
            </p>
          </SectionCard>
          <SectionCard title="Trazi simetriju">
            <p>
              U sistemima sa <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath> cesto ne moras da resavas
              klasicnom zamenom. Identiteti te odmah vode do zbira ili razlike, a
              zatim do korena pomocne kvadratne jednacine.
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
            <p>Saberi i oduzmi jednacine:</p>
            <MathBlock>
              {"2x^2 = 32 \\Rightarrow x^2 = 16 \\Rightarrow x=\\pm4"}
            </MathBlock>
            <MathBlock>
              {"2y^2 = 18 \\Rightarrow y^2 = 9 \\Rightarrow y=\\pm3"}
            </MathBlock>
            <p>
              Posto se u sistemu pojavljuju samo kvadrati, svi izbori znakova su
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
              <p>Prvo izracunaj zbir:</p>
              <MathBlock>
                {
                  "(x+y)^2 = x^2 + 2xy + y^2 = 5 + 4 = 9 \\Rightarrow x+y = \\pm 3"
                }
              </MathBlock>
              <p>
                Zatim posmatraj <InlineMath>{"x"}</InlineMath> i{" "}
                <InlineMath>{"y"}</InlineMath> kao korene jednacine sa zadatim
                zbirom i proizvodom. Dobijas parove{" "}
                <InlineMath>{"(1,2)"}</InlineMath>,{" "}
                <InlineMath>{"(2,1)"}</InlineMath>,{" "}
                <InlineMath>{"(-1,-2)"}</InlineMath>,{" "}
                <InlineMath>{"(-2,-1)"}</InlineMath>.
              </p>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <MicroCheck
                question="Mikro-provera: ako dobijas x^2=16, zasto moras da napises i x=-4?"
                answer={
                  <p>
                    Zato sto kvadrat brise znak. Jednacina{" "}
                    <InlineMath>{"x^2=16"}</InlineMath> ima dva realna resenja,{" "}
                    <InlineMath>{"x=4"}</InlineMath> i{" "}
                    <InlineMath>{"x=-4"}</InlineMath>. Ovaj korak je jedna od
                    najcescih gresaka u sistemima sa kvadratima.
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
        title="Homogeni sistemi: resi odnos, pa vrati pravac"
        description="Homogeni sistemi drugog stepena cesto deluju cudno zato sto ne traze izolaciju promenljive na uobicajen nacin. Njihova snaga je u tome sto svaka jednacina ima isti stepen, pa se prirodno pojavljuje odnos x/y ili y/x."
      >
        <div className={s.grid2}>
          {/* Left: theory */}
          <div>
            <SectionCard title="Svaki clan je stepena 2">
              <MathBlock>
                {
                  "\\begin{cases} a_1x^2+b_1xy+c_1y^2=0 \\\\ a_2x^2+b_2xy+c_2y^2=0 \\end{cases}"
                }
              </MathBlock>
              <p>
                Ako je <InlineMath>{"y \\neq 0"}</InlineMath>, mozes da podelis
                obe jednacine sa <InlineMath>{"y^2"}</InlineMath> i uvedes smenu{" "}
                <InlineMath>{"t=\\frac{x}{y}"}</InlineMath>. Tada se sistem
                pretvara u dve kvadratne jednacine u promenljivoj{" "}
                <InlineMath>{"t"}</InlineMath>.
              </p>
              <MathBlock>
                {
                  "a_1t^2+b_1t+c_1=0, \\qquad a_2t^2+b_2t+c_2=0"
                }
              </MathBlock>
            </SectionCard>

            <div style={{ marginTop: 16 }}>
              <SectionCard title="Homogenost cuva odnos">
                <p>
                  Ako su jednacine homogene i desna strana je nula, tada
                  skaliranje{" "}
                  <InlineMath>
                    {"(x,y)\\mapsto (\\lambda x,\\lambda y)"}
                  </InlineMath>{" "}
                  ne menja istinitost jednacina. Zato resenja cesto leze na
                  pravama kroz koordinatni pocetak, sto objasnjava zasto
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
                <WalkStep number={1} title="Proveri poseban slucaj y=0">
                  <p>
                    Tada iz prve jednacine sledi{" "}
                    <InlineMath>{"x^2=0"}</InlineMath>, pa je{" "}
                    <InlineMath>{"(0,0)"}</InlineMath> resenje.
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
                  title="Nadi zajednicku vrednost odnosa"
                >
                  <p>
                    Prva jednacina daje <InlineMath>{"t=2"}</InlineMath> ili{" "}
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
                question="Mikro-provera: zasto ne smes odmah da delis sa y^2?"
                answer={
                  <p>
                    Zato sto mozda postoji resenje sa{" "}
                    <InlineMath>{"y=0"}</InlineMath>. Deljenjem bi taj slucaj
                    nestao iz razmatranja. Kod homogenih sistema se zato uvek
                    prvo proverava posebni slucaj kada imenilac moze biti nula.
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
        description="Menjaj koeficijente i gledaj kako se broj preseka menja. Tako direktno vidis zasto posle zamene dobijas nula, jedno ili dva realna resenja."
      >
        <SystemLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis sta ce se desiti sa brojem preseka, pa
            tek onda proveri ekran. Laboratorija koristi numericku
            aproksimaciju, a u teoriji i na papiru ostajas u tacnom simbolickom
            zapisu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodeni primeri"
        title="Tri modela koja moras da znas bez lutanja"
        description="Ovi primeri su birani tako da pokriju tri razlicita nacina razmisljanja. Ako ih zaista razumes, vecina prijemnih zadataka iz ove oblasti prestaece da izgleda nova."
      >
        <div className={s.grid3}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Linearna plus kvadratna jednacina
            </h3>
            <MathBlock>
              {
                "\\begin{cases} x+y=5 \\\\ x^2+y^2=13 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zamena">
                <p>
                  Iz prve jednacine uzmi{" "}
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
                  <InlineMath>{"x=3"}</InlineMath>, pa su resenja{" "}
                  <InlineMath>{"(2,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,2)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Dve kvadratne jednacine sa simetrijom
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
              <WalkStep number={2} title="Formiraj pomocnu jednacinu">
                <p>
                  Ako je <InlineMath>{"x+y=4"}</InlineMath> i{" "}
                  <InlineMath>{"xy=3"}</InlineMath>, tada su{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath> koreni jednacine{" "}
                  <InlineMath>{"t^2-4t+3=0"}</InlineMath>, pa dobijamo{" "}
                  <InlineMath>{"(1,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,1)"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Obradi i negativan zbir">
                <p>
                  Ako je <InlineMath>{"x+y=-4"}</InlineMath>, tada je pomocna
                  jednacina <InlineMath>{"t^2+4t+3=0"}</InlineMath>, pa
                  dobijamo <InlineMath>{"(-1,-3)"}</InlineMath> i{" "}
                  <InlineMath>{"(-3,-1)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Homogeni sistem sa beskonacno mnogo resenja
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
                  Druga jednacina prisiljava{" "}
                  <InlineMath>{"x=2y"}</InlineMath>. Taj uslov automatski
                  zadovoljava i prvu jednacinu.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Skup resenja">
                <MathBlock>
                  {"S=\\{(2k,k)\\mid k\\in\\mathbb{R}\\}"}
                </MathBlock>
                <p>
                  Ovaj primer je vazan jer pokazuje da sistem ne mora imati
                  konacno mnogo resenja.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNI OBRASCI ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Kljucni obrasci"
        title="Sabloni koje vredi prepoznati odmah"
        description="Ova sekcija nije za slepo pamcenje, nego kao mapa: cim prepoznas obrazac, znas koji alat iz prethodnih lekcija treba da aktiviras."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Zamena"
            formula={"\\begin{cases} y = mx+n \\\\ Q(x,y)=0 \\end{cases} \\Longrightarrow Q(x,mx+n)=0"}
            note="Najcesci ulaz. Resavas kvadratnu jednacinu u jednoj promenljivoj i vracas drugu koordinatu."
          />
          <FormulaCard
            title="Izjednacavanje"
            formula={"y=f(x),\\qquad y=g(x) \\Longrightarrow f(x)=g(x)"}
            note="Algebarski trazis preseke, a geometrijski gledas gde se dve krive seku."
          />
          <FormulaCard
            title="Simetrija: identiteti"
            formula="(x+y)^2=x^2+y^2+2xy"
            note="Kada imas zbir kvadrata i proizvod, ovo je cesto najbrzi put do zbira ili razlike."
          />
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula={"\\begin{cases} x^2+y^2=A \\\\ x^2-y^2=B \\end{cases} \\Longrightarrow x^2=\\frac{A+B}{2},\\quad y^2=\\frac{A-B}{2}"}
            note="Odmah dobijas kvadrate promenljivih, a zatim vodis racuna o oba znaka."
          />
          <FormulaCard
            title="Homogeni sistemi: odnos"
            formula={"t=\\frac{x}{y} \\quad \\text{ili} \\quad u=\\frac{y}{x}"}
            note="Pre podele obavezno proveri da li su y=0 ili x=0 moguci slucajevi."
          />
          <FormulaCard
            title="Diskriminanta i grafika"
            formula={"\\Delta > 0 \\Rightarrow \\text{dva preseka},\\quad \\Delta = 0 \\Rightarrow \\text{dodir},\\quad \\Delta < 0 \\Rightarrow \\text{nema preseka}"}
            note="Kada sistem svedes na kvadratnu jednacinu, diskriminanta ti odmah daje sliku o realnim resenjima."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Ovde se najcesce gube laki poeni"
        description="Greske u ovoj oblasti retko dolaze iz teske matematike. Mnogo cesce nastaju iz brzine, rutine ili preteranog sirenja izraza bez plana."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Stajanje posle nalazenja jedne promenljive
            </h3>
            <p>
              Ako si dobio samo <InlineMath>{"x"}</InlineMath>, sistem jos nije
              resen. Moras da vratis <InlineMath>{"y"}</InlineMath> i zapises
              uredene parove. Ovo je najtipicnija formalna greska.
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
              direktno prepolovi broj tacnih resenja ako nisi pazljiv.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Deljenje sa izrazom koji moze biti nula
            </h3>
            <p>
              Kod homogenih sistema ne smes odmah deliti sa{" "}
              <InlineMath>{"x"}</InlineMath>, <InlineMath>{"y"}</InlineMath>,{" "}
              <InlineMath>{"x^2"}</InlineMath> ili{" "}
              <InlineMath>{"y^2"}</InlineMath> bez posebne provere. Tako vrlo
              lako izgubis legitimno resenje <InlineMath>{"(0,0)"}</InlineMath>{" "}
              ili citavu familiju resenja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nasumicno razvijanje umesto prepoznavanja obrasca
            </h3>
            <p>
              Kada vidis <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath>, najcesce postoji elegantniji put
              od punog sirenja. Na prijemnom vreme odlazi upravo na takvim
              nepotrebnim racunima.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mesanje broja resenja za x i broja resenja sistema
            </h3>
            <p>
              Jedna vrednost <InlineMath>{"x"}</InlineMath> moze dati jednu
              vrednost <InlineMath>{"y"}</InlineMath>, ali simetricni zadaci
              ponekad iz iste informacije stvaraju vise uredenih parova. Uvek
              misli u parovima.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Bez provere smisla rezultata
            </h3>
            <p>
              Ako ti graficka slika sugerise da prava i parabola ne mogu imati
              cetiri preseka, a ti si ih dobio, negde si pogresio. Kratak
              mentalni graf je odlicna kontrola.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da pod pritiskom vremena prepoznas pravi metod"
        description="Na prijemnom zadatak retko pise primeni metodu zamene. Umesto toga, dobijas sistem i moras sam da odlucis koji alat najbrze vodi do kraja."
      >
        <div className={s.grid2}>
          <SectionCard title="Prijemna rutina od 20 sekundi">
            <ol>
              <li>
                Pogledaj da li jedna jednacina odmah daje{" "}
                <InlineMath>{"x"}</InlineMath> ili{" "}
                <InlineMath>{"y"}</InlineMath>.
              </li>
              <li>
                Ako ne daje, proveri da li je sistem simetrican ili se lako
                sabira/oduzima.
              </li>
              <li>
                Kod homogenog oblika odmah zabelezi: proveri{" "}
                <InlineMath>{"x=0"}</InlineMath> ili{" "}
                <InlineMath>{"y=0"}</InlineMath>.
              </li>
              <li>Tek onda kreni u racun.</li>
            </ol>
          </SectionCard>

          <SectionCard title="Tipicne prijemne formulacije">
            <ul>
              <li>
                Resi sistem u skupu realnih brojeva i napisi sva resenja kao
                uredene parove.
              </li>
              <li>
                Odredi broj realnih resenja sistema bez eksplicitnog racunanja
                svih koordinata.
              </li>
              <li>
                Iskoristi simetriju da skratis racun u sistemu sa{" "}
                <InlineMath>{"x^2+y^2"}</InlineMath> i{" "}
                <InlineMath>{"xy"}</InlineMath>.
              </li>
              <li>
                Prepoznaj kada homogeni sistem ima beskonacno mnogo resenja po
                pravama kroz koordinatni pocetak.
              </li>
              <li>
                Objasni ili proveri graficki smisao dobijenih resenja.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 4 koraka">
          <p>
            1. Prepoznaj strukturu sistema. 2. Izaberi najkraci metod (zamena,
            simetrija, sabiranje ili odnos). 3. Svedi na jednacinu u jednoj
            promenljivoj. 4. Vrati sve uredene parove i proveri ih. Taj redosled
            resava veliki deo zadataka iz ove oblasti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li umes bez pomoci"
        description="Prvo pokusaj samostalno. Tek kada zaista zapnes, otvori resenje. Na prijemnom nije cilj da zapamtis napamet, nego da prepoznas tip i odaberes metod."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1: Prava i parabola"
            problem={
              <>
                <p>Resi sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} y = 2x - 1 \\\\ y = x^2 - 4x + 5 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Izjednaci obe desne strane:</p>
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
            title="Vezba 2: Linearna plus kvadratna"
            problem={
              <>
                <p>Resi sistem:</p>
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
                  Iz prve jednacine uzmi{" "}
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
            title="Vezba 3: Sabiranje i oduzimanje"
            problem={
              <>
                <p>Resi sistem:</p>
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
                  To znaci cetiri uredena para:{" "}
                  <InlineMath>{"(2\\sqrt{3},2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(2\\sqrt{3},-2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(-2\\sqrt{3},2\\sqrt{2})"}</InlineMath>,{" "}
                  <InlineMath>{"(-2\\sqrt{3},-2\\sqrt{2})"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vezba 4: Sistem sa simetrijom"
            problem={
              <>
                <p>Resi sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x^2+y^2=10 \\\\ xy=3 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Racunamo zbir:</p>
                <MathBlock>
                  {
                    "(x+y)^2 = x^2 + 2xy + y^2 = 10 + 6 = 16 \\Rightarrow x+y=\\pm4"
                  }
                </MathBlock>
                <p>
                  Ako je <InlineMath>{"x+y=4"}</InlineMath>, tada su{" "}
                  <InlineMath>{"x"}</InlineMath> i{" "}
                  <InlineMath>{"y"}</InlineMath> koreni jednacine{" "}
                  <InlineMath>{"t^2-4t+3=0"}</InlineMath>, pa su parovi{" "}
                  <InlineMath>{"(1,3)"}</InlineMath> i{" "}
                  <InlineMath>{"(3,1)"}</InlineMath>.
                </p>
                <p>
                  Ako je <InlineMath>{"x+y=-4"}</InlineMath>, tada su koreni
                  jednacine <InlineMath>{"t^2+4t+3=0"}</InlineMath>, pa su
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
            title="Vezba 5: Homogeni sistem"
            problem={
              <>
                <p>Resi sistem:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x^2-3xy+2y^2=0 \\\\ x^2-4xy+4y^2=0 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Druga jednacina je</p>
                <MathBlock>
                  {"(x-2y)^2=0 \\Rightarrow x=2y"}
                </MathBlock>
                <p>Uvrstivanjem u prvu jednacinu dobijamo</p>
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
            title="Vezba 6: Jedan dodir"
            problem={
              <>
                <p>Odredi broj realnih resenja sistema i resi ga:</p>
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
                  Dakle postoji samo jedno realno resenje za{" "}
                  <InlineMath>{"x"}</InlineMath>, i to{" "}
                  <InlineMath>{"x=2"}</InlineMath>. Zatim je{" "}
                  <InlineMath>{"y=-1"}</InlineMath>. Sistem ima jedan realan
                  uredeni par:
                </p>
                <MathBlock>{"S=\\{(2,-1)\\}"}</MathBlock>
                <p>
                  Geometrijski, prava <InlineMath>{"y=-1"}</InlineMath> dodiruje
                  parabolu u jednoj tacki.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="U skoro svakom sistemu trazis promenu pogleda, ne jaci racun"
        description="Najvaznija misaona poruka ove lekcije glasi: sistem kvadratnih jednacina retko se resava sirovom silom. Resava se tako sto ga prevedes u poznat oblik."
      >
        <InsightCard title="Najvazniji princip">
          <p>
            Nekad je to zamena, nekad simetrija, nekad oduzimanje, a kod
            homogenih sistema odnos promenljivih. Kada naucis da prepoznajes taj
            prelaz, zadatak postaje mnogo laksi.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da zapamtis"
        description="Ovo su ideje koje treba da ostanu stabilne i kada prode vreme od ucenja. Ako njih drzis pod kontrolom, i novi zadaci iz ove oblasti bice resivi."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Sistem trazi uredene parove</h3>
            <p>
              Ne zavrsavaj zadatak kada nades samo{" "}
              <InlineMath>{"x"}</InlineMath> ili samo{" "}
              <InlineMath>{"y"}</InlineMath>. Uvek vrati drugu promenljivu i
              zapisi kompletna resenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Kod linearne plus kvadratne jednacine dominira zamena
            </h3>
            <p>
              Izoluj jednu promenljivu, uvrsti je i svedi sistem na kvadratnu
              jednacinu u jednoj promenljivoj.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Dve kvadratne jednacine cesto kriju strukturu
            </h3>
            <p>
              Pre nego sto razvijes sve clanove, proveri da li sistem trazi
              sabiranje, oduzimanje ili identitete sa{" "}
              <InlineMath>{"x+y"}</InlineMath> i{" "}
              <InlineMath>{"xy"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Homogeni sistemi traze proveru nule i odnos
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
          Sledeci logican korak je da ovu sigurnost zadrzis i kada jednacine
          vise nisu algebarske polinomske, sto te vodi ka narednim lekcijama o
          iracionalnim jednacinama. Ali pre toga vredi uraditi jos nekoliko
          parametarskih i grafickih zadataka iz sistema.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
