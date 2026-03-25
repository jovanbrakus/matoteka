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
import LogGraphLab from "./LogGraphLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#pojam", label: "Pojam" },
  { href: "#inverznost", label: "Inverznost" },
  { href: "#osobine", label: "Osobine" },
  { href: "#transformacije", label: "Pomeraji" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#obrasci", label: "Kljucne formule" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson30Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 30"
        title={
          <>
            Logaritamska funkcija i njen{" "}
            <span className={cs.tHeroAccent}>grafik</span>
          </>
        }
        description="Logaritamski grafik ne treba uciti kao izolovanu sliku. On je ogledalo eksponencijalnog grafa preko prave y=x. Kada to zaista vidis, odmah postaju prirodni domen x>0, vertikalna asimptota, rast ili pad i ponasanje pomerenih grafika."
        heroImageSrc="/api/lessons/30/hero"
        heroImageAlt="Apstraktna matematicka ilustracija za lekciju o logaritamskoj funkciji"
        cards={[
          {
            label: "Sta ucis",
            description:
              "Kako da iz formule odmah procitas domen, asimptotu, monotonost i karakteristicne tacke.",
          },
          {
            label: "Najveca zamka",
            description:
              "Ucenici cesto napisu horizontalnu umesto vertikalne asimptote i zaborave da domen nije ceo R.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci iz domena, pomeraja i poredjenja sa eksponencijalnom funkcijom javljaju se veoma cesto.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90 do 110 minuta sa crtanjem, laboratorijumom i vodjenim primerima.",
          },
          {
            label: "Predznanje",
            description:
              "Pojam logaritma i eksponencijalna funkcija.",
          },
          {
            label: "Glavna vestina",
            description:
              "Citanje grafa iz formule: baza, domen i asimptota su prvi filter.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas graficki laboratorijum sa bazom, pomerajima i probnom tackom.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Ko razume logaritamski grafik, mnogo lakse kontrolise domen i ponasanje logaritamskih izraza"
        description="Logaritamski grafik nije samo jos jedna skica u svesci. On te uci da odmah vidis da argument mora biti pozitivan, gde je vertikalna asimptota i kako se funkcija ponasa sa leve i desne strane te prave. To kasnije postaje presudno u jednacinama, nejednacinama i slozenijim funkcijama."
      >
        <div className={s.grid3}>
          <SectionCard title="Ovo je inverzna prica funkcije a^x">
            <p>
              Ko pamti logaritamski grafik bez te veze, cesto pamti pogresno.
              Ko vidi inverznost, brzo rekonstruise ceo oblik.
            </p>
          </SectionCard>
          <SectionCard title="Pitanja o domenu i asimptoti cesto izgledaju kratko, ali traze punu preciznost">
            <p>
              Ovo su zadaci koji kaznjavaju rutinu i nagradjuju jasno
              razumevanje argumenata logaritma.
            </p>
          </SectionCard>
          <SectionCard title="Dobra slika grafa olaksava logaritamske jednacine i nejednacine">
            <p>
              Kasnije vise neces samo crtati grafik, nego ces iz njega citati
              moguce domene i broj resenja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Cim vidis logaritamsku funkciju, prvo proveri uslov argumenta,
            zatim upisi vertikalnu asimptotu, pa tek onda odlucuj o rastu,
            padu i tackama za skicu.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zasto logaritamski grafik ne moze da postoji za x<=0 kod osnovne funkcije?"
          answer={
            <p>
              Zato sto je osnovna funkcija{" "}
              <InlineMath>{"y=\\log_a x"}</InlineMath>, a logaritam je definisan
              samo za pozitivan argument. Ako je{" "}
              <InlineMath>{"x\\le 0"}</InlineMath>, argument logaritma nije
              dozvoljen i funkcija tu ne postoji.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POJAM ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow="Definicija i osnovni pogled"
        title="Sta je logaritamska funkcija"
        description="Kada u definiciji logaritma broj b zamenis promenljivom x, dobijas novu funkciju. Ona svakom dozvoljenom x pridruzuje eksponent na koji baza a treba da se podigne da bi nastao taj broj."
      >
        <div className={s.grid2}>
          <SectionCard title="Funkcija nastaje iz definicije logaritma">
            <MathBlock>
              {"y=\\log_a x,\\qquad a>0,\\ a\\ne 1,\\ x>0"}
            </MathBlock>
            <p>
              Ovaj zapis kaze: vrednost funkcije u tacki{" "}
              <InlineMath>{"x"}</InlineMath> jeste eksponent koji treba da stoji
              iznad baze <InlineMath>{"a"}</InlineMath> da bi se dobio bas taj{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Sta odmah citas iz definicije">
            <ul>
              <li>
                Domen osnovne funkcije je{" "}
                <InlineMath>{"x>0"}</InlineMath>, jer argument logaritma mora
                biti pozitivan.
              </li>
              <li>
                Skup vrednosti je{" "}
                <InlineMath>{"\\mathbb{R}"}</InlineMath>, jer eksponent moze
                biti bilo koji realan broj.
              </li>
              <li>
                Prava <InlineMath>{"x=0"}</InlineMath> je vertikalna asimptota,
                jer se dozvoljene vrednosti priblizavaju nuli samo s desne strane.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Karakteristicna tacka (1, 0)">
            <p>
              Posto je{" "}
              <InlineMath>{"\\log_a 1=0"}</InlineMath>, grafik osnovne
              logaritamske funkcije uvek prolazi kroz{" "}
              <InlineMath>{"(1,0)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Karakteristicna tacka (a, 1)">
            <p>
              Jer <InlineMath>{"\\log_a a=1"}</InlineMath>. Ova tacka cesto daje
              najbrzu skicu bez dodatnog racuna.
            </p>
          </SectionCard>
          <SectionCard title="Karakteristicna tacka (1/a, -1)">
            <p>
              Posto je{" "}
              <InlineMath>{"\\log_a \\frac{1}{a} = -1"}</InlineMath>, i ova
              tacka je veoma korisna za brzo crtanje.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto tacka (0,1) ne pripada osnovnom logaritamskom grafiku?"
          answer={
            <p>
              Zato sto logaritamska funkcija nije definisana za{" "}
              <InlineMath>{"x=0"}</InlineMath>. Ucenici je cesto pomesaju sa
              tackom <InlineMath>{"(0,1)"}</InlineMath> eksponencijalne funkcije,
              ali kod logaritma osnovna sigurna tacka je{" "}
              <InlineMath>{"(1,0)"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INVERZNOST ═══════════ */}
      <LessonSection
        id="inverznost"
        eyebrow="Inverznost"
        title="Zasto se logaritamski i eksponencijalni grafik ogledaju oko prave y=x"
        description="Eksponencijalna i logaritamska funkcija su medjusobno inverzne. To znaci da jedna ponistava drugu i da se njihovi grafici dobijaju ogledanjem u odnosu na pravu y=x."
      >
        <div className={s.grid2}>
          <SectionCard title="Eksponencijalna: y = a^x">
            <MathBlock>
              {"D=\\mathbb{R},\\qquad V=(0,\\infty),\\qquad y=0"}
            </MathBlock>
            <p>
              Eksponencijalni grafik prolazi kroz{" "}
              <InlineMath>{"(0,1)"}</InlineMath> i ima horizontalnu asimptotu{" "}
              <InlineMath>{"y=0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Logaritamska: y = log_a x">
            <MathBlock>
              {"D=(0,\\infty),\\qquad V=\\mathbb{R},\\qquad x=0"}
            </MathBlock>
            <p>
              Kada oglednes eksponencijalni grafik preko prave{" "}
              <InlineMath>{"y=x"}</InlineMath>, horizontalna asimptota postaje
              vertikalna.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Tacke menjaju mesta koordinatama">
            <p>
              Ako eksponencijalna funkcija prolazi kroz{" "}
              <InlineMath>{"(1,a)"}</InlineMath>, onda logaritamska prolazi kroz{" "}
              <InlineMath>{"(a,1)"}</InlineMath>. Isto vazi i za{" "}
              <InlineMath>{"(0,1)"}</InlineMath> i{" "}
              <InlineMath>{"(1,0)"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title='Logaritamski grafik ne nastaje "niotkuda"'>
            <p>
              Ako znas osnovni grafik{" "}
              <InlineMath>{"a^x"}</InlineMath>, onda logaritamski mozes
              rekonstruisati bez pamcenja svake pojedinosti.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je (2,4) na grafiku funkcije y=2^x, koja odgovarajuca tacka je na grafiku y=log_2 x?"
          answer={
            <p>
              Posto se grafici ogledaju oko prave{" "}
              <InlineMath>{"y=x"}</InlineMath>, koordinate se zamene mestima.
              Zato tacka <InlineMath>{"(4,2)"}</InlineMath> pripada grafiku
              funkcije <InlineMath>{"y=\\log_2 x"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSOBINE ═══════════ */}
      <LessonSection
        id="osobine"
        eyebrow="Osnovne osobine"
        title="Monotonost, asimptota i karakteristicne tacke"
        description="Kao i kod eksponencijalne funkcije, baza odlucuje da li grafik raste ili opada. Ali sada je presudno i to da domen nije ceo skup realnih brojeva, vec samo desna strana od asimptote."
      >
        <div className={s.grid2}>
          <SectionCard title="Grafik je rastuci (a > 1)">
            <MathBlock>
              {"x_1<x_2 \\Rightarrow \\log_a x_1 < \\log_a x_2"}
            </MathBlock>
            <p>
              Na primer, <InlineMath>{"\\log_2 x"}</InlineMath> raste sporo, ali
              neprekidno na celom svom domenu{" "}
              <InlineMath>{"x>0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Grafik je opadajuci (0 < a < 1)">
            <MathBlock>
              {"x_1<x_2 \\Rightarrow \\log_a x_1 > \\log_a x_2"}
            </MathBlock>
            <p>
              Na primer,{" "}
              <InlineMath>{"\\log_{\\frac{1}{2}} x"}</InlineMath> opada, jer je
              inverz opadajuce eksponencijalne funkcije.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <SectionCard title="Domen: uvek gledas argument">
            <MathBlock>{"x>0"}</MathBlock>
            <p>
              Za osnovni grafik nema logaritma levo od ose{" "}
              <InlineMath>{"y"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Skup vrednosti: svaki realan broj">
            <MathBlock>{"V=\\mathbb{R}"}</MathBlock>
            <p>Logaritam moze biti i pozitivan, i nula, i negativan.</p>
          </SectionCard>
          <SectionCard title="Vertikalna, ne horizontalna asimptota">
            <MathBlock>{"x=0"}</MathBlock>
            <p>
              Kako se <InlineMath>{"x"}</InlineMath> priblizava nuli s desne
              strane, vrednost logaritma bezi po{" "}
              <InlineMath>{"y"}</InlineMath>-osi.
            </p>
          </SectionCard>
        </div>

        <div style={{ marginTop: 16 }}>
          <SectionCard title="Tri brze tacke dovoljne za dobru skicu">
            <MathBlock>
              {"(1,0),\\quad (a,1),\\quad \\left(\\frac{1}{a},-1\\right)"}
            </MathBlock>
            <p>
              Kada znas ove tri tacke i asimptotu, skica vise nije problem.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: sta se desava sa log_2 x kada x ide ka 0+?"
          answer={
            <p>
              Vrednost funkcije opada bez granice, odnosno ide ka{" "}
              <InlineMath>{"-\\infty"}</InlineMath>. Upravo zato je prava{" "}
              <InlineMath>{"x=0"}</InlineMath> vertikalna asimptota
              logaritamskog grafa.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ POMERAJI ═══════════ */}
      <LessonSection
        id="transformacije"
        eyebrow="Pomeraji i citanje formule"
        title="Kako nastaje grafik funkcije y = log_a(x-p) + q"
        description="Pomeraji ne menjaju logicku prirodu logaritma, ali menjaju domen, polozaj asimptote i kljucne tacke. Ako umes da procitas p i q, vec si resio pola zadatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Broj p pomera asimptotu i domen">
            <MathBlock>{"y=\\log_a(x-p)+q"}</MathBlock>
            <p>
              Posto argument mora biti pozitivan, sada vise ne trazis{" "}
              <InlineMath>{"x>0"}</InlineMath>, nego{" "}
              <InlineMath>{"x-p>0"}</InlineMath>, odnosno{" "}
              <InlineMath>{"x>p"}</InlineMath>. Zato je nova asimptota prava{" "}
              <InlineMath>{"x=p"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Broj q podize ili spusta ceo grafik">
            <p>
              Domena se zbog <InlineMath>{"q"}</InlineMath> ne menja, ali se sve{" "}
              <InlineMath>{"y"}</InlineMath>-koordinate pomeraju. Posebno je
              vazna brza tacka: kada je argument jednak{" "}
              <InlineMath>{"1"}</InlineMath>, to jest za{" "}
              <InlineMath>{"x=p+1"}</InlineMath>, dobijes{" "}
              <InlineMath>{"y=q"}</InlineMath>.
            </p>
            <MathBlock>{"(p+1,q)"}</MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Domen: x > p">
            <p>
              Najvazniji prijemni refleks kod pomerenog logaritma je da odmah
              napises uslov argumenta.
            </p>
          </SectionCard>
          <SectionCard title="Asimptota: x = p">
            <p>
              Vertikalna asimptota prati horizontalni pomeraj. Ne prati{" "}
              <InlineMath>{"q"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Brza tacka: (p+1, q)">
            <p>
              Ovo je logaritamski analog tacke u kojoj je argument jednak{" "}
              <InlineMath>{"1"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemna napomena">
          <p>
            U zadacima se cesto pojavljuje i argument poput{" "}
            <InlineMath>{"5-x"}</InlineMath>. Tada uslov glasi{" "}
            <InlineMath>{"5-x>0"}</InlineMath>, pa dobijes domen{" "}
            <InlineMath>{"x<5"}</InlineMath>. Ako unutra stoji negativan
            koeficijent, smer grafa moze da se promeni i bez promene baze.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: koja je asimptota funkcije f(x) = log_3(x-4) + 2?"
          answer={
            <p>
              Argument je <InlineMath>{"x-4"}</InlineMath>, pa domen glasi{" "}
              <InlineMath>{"x>4"}</InlineMath>. Zato je vertikalna asimptota
              prava <InlineMath>{"x=4"}</InlineMath>. Vertikalni pomeraj{" "}
              <InlineMath>{"+2"}</InlineMath> ne menja njenu jednacinu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorijum: baza, pomeraji i odnos sa eksponencijalnom funkcijom"
        description="Menjaj bazu a, horizontalni pomeraj p, vertikalni pomeraj q i probnu tacku x. Posmatraj kako se zajedno menjaju domen, vertikalna asimptota, smer grafa, karakteristicne tacke i odgovarajuca eksponencijalna inverzna funkcija."
      >
        <LogGraphLab />

        <InsightCard title="Kako da laboratorija stvarno sluzi ucenju">
          <p>
            Prvo bez gledanja u izlazne kartice reci: da li baza daje rast ili
            pad, koja je asimptota i koji je domen. Zatim proveri na grafiku.
            Tek na kraju koristi probnu tacku i karakteristicne tacke da
            potvrdis svoju procenu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Od osnovnog grafa do tipicnih prijemnih varijacija"
        description="U primerima je cilj da prvo ucvrstis osnovni oblik, a zatim vidis kako se isti principi primenjuju kada se pojave pomeraji ili kada zadatak trazi domen ili presek sa osama."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Analiziraj funkciju{" "}
              <InlineMath>{"f(x)=\\log_2 x"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen iz uslova argumenta.">
                <MathBlock>{"x>0"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Baza je 2 > 1, pa je funkcija rastuca."
              >
                <MathBlock>{"x=0 \\text{ je vertikalna asimptota}"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Brze tacke za skicu.">
                <MathBlock>
                  {"(1,0),\\quad (2,1),\\quad \\left(\\frac{1}{2},-1\\right)"}
                </MathBlock>
                <p>Dovoljno za sigurnu skicu rastuce krive desno od ose y.</p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Analiziraj funkciju{" "}
              <InlineMath>{"g(x)=\\log_{\\frac{1}{2}} x"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domen je opet x > 0, asimptota x = 0." />
              <WalkStep
                number={2}
                title="Posto je 0 < 1/2 < 1, grafik je opadajuci."
              >
                <MathBlock>
                  {
                    "\\left(1,0\\right),\\qquad \\left(\\frac{1}{2},1\\right),\\qquad \\left(2,-1\\right)"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title="Najvazniji zakljucak"
              >
                <p>
                  Promena baze menja smer grafa, ne i vrstu asimptote.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Analiziraj{" "}
              <InlineMath>{"h(x)=\\log_3(x-2)+1"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uslov argumenta daje domen.">
                <MathBlock>{"x-2>0 \\Rightarrow x>2"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Vertikalna asimptota x = 2. Baza 3 > 1, grafik raste."
              />
              <WalkStep number={3} title="Brza tacka i provera.">
                <p>
                  Kada je argument <InlineMath>{"1"}</InlineMath>, dobijes{" "}
                  <InlineMath>{"x=3"}</InlineMath>, pa je jedna brza tacka{" "}
                  <InlineMath>{"(3,1)"}</InlineMath>.
                </p>
                <MathBlock>{"h(5)=\\log_3 3 + 1 = 2"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Ako je <InlineMath>{"(1,5)"}</InlineMath> na grafiku{" "}
              <InlineMath>{"y=5^x"}</InlineMath>, koja tacka je na grafiku{" "}
              <InlineMath>{"y=\\log_5 x"}</InlineMath>?
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Funkcije su inverzne, grafik se dobija ogledanjem oko prave y = x."
              />
              <WalkStep number={2} title="Zameni mesta koordinatama.">
                <MathBlock>{"(1,5)\\mapsto (5,1)"}</MathBlock>
                <p>
                  Trazena tacka je <InlineMath>{"(5,1)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Nadji presek sa <InlineMath>{"x"}</InlineMath>-osom
              funkcije <InlineMath>{"m(x)=\\log_2(x+1)-3"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Za presek sa x-osom postavis y = 0.">
                <MathBlock>{"\\log_2(x+1)-3=0"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Prebaci 3 na drugu stranu i vrati definiciju logaritma."
              >
                <MathBlock>
                  {"\\log_2(x+1)=3 \\iff x+1=2^3=8"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Resenje.">
                <p>
                  Dobijes <InlineMath>{"x=7"}</InlineMath>, sto je u skladu i
                  sa domenom <InlineMath>{"x>-1"}</InlineMath>. Presek sa{" "}
                  <InlineMath>{"x"}</InlineMath>-osom je{" "}
                  <InlineMath>{"(7,0)"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Odredi domen i asimptotu funkcije{" "}
              <InlineMath>{"n(x)=\\log_4(5-x)"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Argument mora biti pozitivan."
              >
                <MathBlock>{"5-x>0 \\Rightarrow x<5"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Domen i asimptota."
              >
                <p>
                  Domen je{" "}
                  <InlineMath>{"(-\\infty,5)"}</InlineMath>, a vertikalna
                  asimptota je <InlineMath>{"x=5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title="Smer grafa."
              >
                <p>
                  Posto se sa rastom <InlineMath>{"x"}</InlineMath> argument{" "}
                  <InlineMath>{"5-x"}</InlineMath> smanjuje, grafik ukupno opada
                  iako je baza <InlineMath>{"4>1"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: koja je najbrza sigurna tacka funkcije f(x) = log_5(x+3) - 2?"
          answer={
            <p>
              Argument treba da bude <InlineMath>{"1"}</InlineMath>. Zato
              resavas <InlineMath>{"x+3=1"}</InlineMath>, pa je{" "}
              <InlineMath>{"x=-2"}</InlineMath>. Tada je{" "}
              <InlineMath>{"f(-2)=\\log_5 1 - 2 = -2"}</InlineMath>, pa je brza
              tacka <InlineMath>{"(-2,-2)"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Kljucne formule"
        title="Formula-vault za brzo obnavljanje"
        description="Ove kartice treba da budu sigurne i bez duzeg razmisljanja. One cine kostur svakog zadatka sa logaritamskim grafikom."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovni oblik"
            formula={"y=\log_a x,\qquad a>0,\ a\ne 1,\ x>0"}
          />
          <FormulaCard
            title="Domen i vrednosti"
            formula={"D=(0,\infty),\qquad V=\mathbb{R}"}
          />
          <FormulaCard
            title="Vertikalna asimptota"
            formula="x=0"
          />
          <FormulaCard
            title="Smer zavisi od baze"
            formula={"a>1 \Rightarrow \text{rastuca},\qquad 0<a<1 \Rightarrow \text{opadajuca}"}
          />
          <FormulaCard
            title="Tri najbrze tacke za skicu"
            formula={"(1,0),\quad (a,1),\quad \left(\frac{1}{a},-1\right)"}
          />
          <FormulaCard
            title="Pomerena funkcija"
            formula={"y=\log_a(x-p)+q,\qquad x>p,\qquad x=p"}
            note="Domen i asimptota se citaju iz argumenta."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Greske koje kvare skicu i pogresno vode kasnije racune"
        description="Ovde se poeni cesto gube na veoma kratkim zadacima. Upravo zato vredi unapred izdvojiti sta ucenici najcesce pogrese."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Horizontalna umesto vertikalne asimptote
            </h3>
            <p>
              <strong>Ispravno:</strong> kod osnovne logaritamske funkcije
              asimptota je <InlineMath>{"x=0"}</InlineMath>, ne{" "}
              <InlineMath>{"y=0"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pisanje domena{" "}
              <InlineMath>{"\\mathbb{R}"}</InlineMath>
            </h3>
            <p>
              <strong>Podsetnik:</strong> argument logaritma mora biti pozitivan,
              pa domen nikada ne uzimas napamet.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mesanje tacaka{" "}
              <InlineMath>{"(0,1)"}</InlineMath> i{" "}
              <InlineMath>{"(1,0)"}</InlineMath>
            </h3>
            <p>
              <strong>Vazno:</strong>{" "}
              <InlineMath>{"(0,1)"}</InlineMath> pripada eksponencijalnoj
              funkciji, a <InlineMath>{"(1,0)"}</InlineMath> logaritamskoj.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljanje da baza menja smer grafa
            </h3>
            <p>
              <strong>Primer:</strong>{" "}
              <InlineMath>{"\\log_2 x"}</InlineMath> raste, ali{" "}
              <InlineMath>{"\\log_{\\frac{1}{2}} x"}</InlineMath> opada.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogresan smer pomeraja kod{" "}
              <InlineMath>{"x-p"}</InlineMath>
            </h3>
            <p>
              <strong>Pravilo:</strong>{" "}
              <InlineMath>{"\\log_a(x-p)"}</InlineMath> znaci pomeraj udesno za{" "}
              <InlineMath>{"p"}</InlineMath>, a ne ulevo.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Ignorisanje argumenta tipa{" "}
              <InlineMath>{"5-x"}</InlineMath>
            </h3>
            <p>
              <strong>Vazno:</strong> negativan koeficijent unutar argumenta
              menja domen, a cesto i smer ukupnog grafa.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da organizujes resavanje bez nepotrebnog crtanja i lutanja"
        description="Na prijemnom se obicno ne trazi umetnicka skica, nego nekoliko preciznih zakljucaka: domen, asimptota, smer grafa i jedna ili dve sigurne tacke."
      >
        <div className={s.grid2}>
          <SectionCard title="Cetiri koraka koja skoro uvek prolaze">
            <ul>
              <li>Napisi uslov argumenta i iz njega procitaj domen.</li>
              <li>Odmah upisi vertikalnu asimptotu.</li>
              <li>
                Pogledaj bazu i odluci da li grafik raste ili opada.
              </li>
              <li>
                Dodaj jednu ili dve karakteristicne tacke iz argumenta{" "}
                <InlineMath>{"1"}</InlineMath>,{" "}
                <InlineMath>{"a"}</InlineMath> ili{" "}
                <InlineMath>{"1/a"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Sta zadatak pokusava da sakrije">
            <ul>
              <li>
                Pomeraj u argumentu, da proveri da li asimptotu citas iz{" "}
                <InlineMath>{"x-p"}</InlineMath>.
              </li>
              <li>
                Bazu manju od <InlineMath>{"1"}</InlineMath>, da proveri da li
                vidis opadanje grafa.
              </li>
              <li>
                Argument oblika <InlineMath>{"5-x"}</InlineMath>, da proveri da
                li domen pises pazljivo.
              </li>
              <li>
                Pitanje o preseku sa osama, da proveri da li umes da spojis
                graficki i algebarski pogled.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Najkorisnija misaona navika">
          <p>
            Nemoj da crtas iz mnogo slucajnih tacaka. Logaritamski grafik se
            najbrze dobija iz cetiri stvari: domen, asimptota, smer i jedna
            sigurna tacka.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li umes samostalno"
        description="Pokusaj prvo bez resenja. Ako zapnes, vrati se na pravilo da domen i asimptota dolaze iz argumenta logaritma."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Za funkciju{" "}
                <InlineMath>{"f(x)=\\log_3 x"}</InlineMath> odredi domen, skup
                vrednosti i asimptotu.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x>0"}</InlineMath>, pa je{" "}
                <InlineMath>{"D=(0,\\infty)"}</InlineMath>. Skup vrednosti je{" "}
                <InlineMath>{"\\mathbb{R}"}</InlineMath>, a vertikalna asimptota
                je <InlineMath>{"x=0"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 2"
            problem={
              <p>
                Da li je funkcija{" "}
                <InlineMath>{"g(x)=\\log_{\\frac{1}{2}} x"}</InlineMath>{" "}
                rastuca ili opadajuca?
              </p>
            }
            solution={
              <p>
                Posto je{" "}
                <InlineMath>{"0<\\frac{1}{2}<1"}</InlineMath>, funkcija je
                opadajuca.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 3"
            problem={
              <p>
                Odredi domen i asimptotu funkcije{" "}
                <InlineMath>{"h(x)=\\log_2(x-4)+1"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Uslov argumenta je{" "}
                <InlineMath>{"x-4>0"}</InlineMath>, pa je domen{" "}
                <InlineMath>{"(4,\\infty)"}</InlineMath>. Vertikalna asimptota
                je <InlineMath>{"x=4"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 4"
            problem={
              <p>
                Napisi jednu sigurnu tacku za funkciju{" "}
                <InlineMath>{"k(x)=\\log_5(x+2)-3"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Trazis argument jednak <InlineMath>{"1"}</InlineMath>:{" "}
                <InlineMath>{"x+2=1"}</InlineMath>, pa je{" "}
                <InlineMath>{"x=-1"}</InlineMath>. Tada je{" "}
                <InlineMath>{"k(-1)=\\log_5 1 -3=-3"}</InlineMath>, pa je
                sigurna tacka <InlineMath>{"(-1,-3)"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 5"
            problem={
              <p>
                Nadji presek sa <InlineMath>{"x"}</InlineMath>-osom funkcije{" "}
                <InlineMath>{"m(x)=\\log_3 x - 2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Postavis{" "}
                  <InlineMath>{"0=\\log_3 x - 2"}</InlineMath>, pa{" "}
                  <InlineMath>{"\\log_3 x=2"}</InlineMath>.
                </p>
                <MathBlock>{"x=3^2=9"}</MathBlock>
                <p>
                  Presek sa <InlineMath>{"x"}</InlineMath>-osom je tacka{" "}
                  <InlineMath>{"(9,0)"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Vezba 6"
            problem={
              <p>
                Odredi domen funkcije{" "}
                <InlineMath>{"n(x)=\\log_4(7-x)"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Mora vaziti <InlineMath>{"7-x>0"}</InlineMath>, pa je{" "}
                <InlineMath>{"x<7"}</InlineMath>. Zato je domen{" "}
                <InlineMath>{"(-\\infty,7)"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 7"
            problem={
              <p>
                Ako tacka <InlineMath>{"(2,9)"}</InlineMath> pripada grafiku
                funkcije <InlineMath>{"y=3^x"}</InlineMath>, koja tacka pripada
                grafiku <InlineMath>{"y=\\log_3 x"}</InlineMath>?
              </p>
            }
            solution={
              <p>
                Inverzne funkcije zamenjuju mesta koordinatama, pa odgovarajuca
                tacka glasi <InlineMath>{"(9,2)"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 8"
            problem={
              <p>
                Za funkciju{" "}
                <InlineMath>{"p(x)=\\log_{10}(x+1)"}</InlineMath> napisi domen i
                tacku u kojoj je vrednost funkcije jednaka{" "}
                <InlineMath>{"0"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Domen je <InlineMath>{"x+1>0"}</InlineMath>, dakle{" "}
                <InlineMath>{"x>-1"}</InlineMath>. Vrednost je nula kada je
                argument jednak <InlineMath>{"1"}</InlineMath>, pa iz{" "}
                <InlineMath>{"x+1=1"}</InlineMath> dobijes{" "}
                <InlineMath>{"x=0"}</InlineMath>. Tacka je{" "}
                <InlineMath>{"(0,0)"}</InlineMath>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="Logaritamski grafik je eksponencijalni grafik ogledan preko prave y=x"
        description="Kada ovu jednu sliku drzis u glavi, vise ne moras da pamtis nepovezane detalje. Domena, skup vrednosti, asimptota i smer grafa svi izlaze iz iste ideje."
      >
        <InsightCard title="Glavna jednakost">
          <MathBlock>
            {"y=a^x \\quad \\Longleftrightarrow \\quad y=\\log_a x"}
          </MathBlock>
          <MathBlock>
            {
              "(\\alpha,\\beta)\\in y=a^x \\Longleftrightarrow (\\beta,\\alpha)\\in y=\\log_a x"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da zapamtis posle ove lekcije"
        description="Ovo su tacke koje treba da budu sigurne i kada zadatak deluje vizuelno ili formulacijski zamrseno."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domen</h3>
            <p>
              Argument logaritma mora biti pozitivan. Iz toga dobijes i osnovni
              domen <InlineMath>{"x>0"}</InlineMath> i sve pomerene domene u
              slozenijim zadacima.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Asimptota</h3>
            <p>
              Logaritamska funkcija ima vertikalnu asimptotu. Za osnovni grafik
              to je <InlineMath>{"x=0"}</InlineMath>, a kod pomerene funkcije
              citas je iz argumenta.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Baza</h3>
            <p>
              Baza odredjuje da li grafik raste ili opada. Za{" "}
              <InlineMath>{"a>1"}</InlineMath> grafik raste, a za{" "}
              <InlineMath>{"0<a<1"}</InlineMath> opada.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Inverznost</h3>
            <p>
              Logaritam je ogledalo eksponencijalne funkcije. Ta ideja ti daje i
              tacke, i smer, i odnos domena i skupa vrednosti bez ucenja napamet.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci logican korak su logaritamske jednacine, gde ce domen i
          pravila logaritmovanja morati da rade zajedno.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
