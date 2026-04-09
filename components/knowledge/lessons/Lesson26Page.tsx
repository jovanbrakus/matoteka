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
import ExponentialLab from "./ExponentialLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnovni", label: "Osnovni oblik" },
  { href: "#rastpad", label: "Rast i pad" },
  { href: "#transformacije", label: "Pomeraji" },
  { href: "#crtanje", label: "Crtanje" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson26Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 26"
        title={
          <>
            Eksponencijalna funkcija{" "}
            <span className={cs.tHeroAccent}>i njen grafik</span>
          </>
        }
        description="Kada je promenljiva u eksponentu, grafik više ne liči ni na pravu ni na parabolu. Upravo zato ova lekcija traži novi mentalni model: baza određuje da li funkcija raste ili opada, a pomeraji menjaju položaj cele krive i njene asimptote. Ako ovo razumeš kako treba, sledeće lekcije o eksponencijalnim jednačinama i logaritmima postaju mnogo preglednije."
        heroImageSrc="/images/lessons/lesson26_hero.png"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o eksponencijalnoj funkciji"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da iz jedne formule pročitaš rast, pad, asimptotu i ključne tačke. Neces crtati naslepo, već po jasnom algoritmu koji radi i za pomerene grafike.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje slučajeva a > 1 i 0 < a < 1. Kod baze manje od 1 funkcija opada, i to je mesto na kome se na prijemnom često gube laki poeni.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Prvi pogled mora da ide na bazu i horizontalnu asimptotu. Kad to vidiš odmah, pola zadatka je već organizovano pre računanja.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "70 do 90 minuta sa crtanjem, laboratorijumom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description:
              "Stepeni i osobine funkcija. Potreban ti je siguran rad sa potencijama i osnovno razumevanje domena, skupa vrednosti i monotonosti.",
          },
          {
            label: "Glavna veština",
            description:
              "Čitanje funkcije bez kalkulatora. Iz baze i pomeraja treba odmah da vidiš da li funkcija raste, gde joj je asimptota i koje su lake tačke za crtanje.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija. Menjaš bazu i pomeraje, a zatim posmatraš kako se u realnom vremenu menja grafik funkcije y = a^(x-p) + q.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Eksponent menja sve: od brzine rasta do oblika grafika"
        description="Eksponencijalna funkcija je prvi ozbiljan susret sa funkcijom ciji je argument u eksponentu. To znači da se promena ne odvija ravnomerno kao kod linearne funkcije, niti po paraboli kao kod kvadratne, već mnogo brže ili mnogo sporije, u zavisnosti od baze."
      >
        <div className={s.grid3}>
          <SectionCard title="Temelj za sledeće lekcije">
            <p>
              Eksponencijalne jednačine i nejednačine neces rešavati sigurno ako
              ne razumeš kako se ponasa funkcija{" "}
              <InlineMath>{"a^x"}</InlineMath> i zašto monotono raste ili opada.
              Logaritamska funkcija ce kasnije biti njena inverzna slika.
            </p>
          </SectionCard>
          <SectionCard title="Tipičan prijemni obrazac">
            <p>
              Na prijemnom se često traži da sa malo računa zaključiš znak,
              monotonost, broj preseka sa pravom ili položaj asimptote. To su
              zadaci koji nagrađuju razumevanje, a kažnjavaju mehaničko
              računanje.
            </p>
          </SectionCard>
          <SectionCard title="Praktican mentalni model">
            <p>
              Dobar učenik ovde ne pamti samo formulu. On vidi sliku: jedna
              kriva uvek ostaje iznad asimptote, prolazi kroz karakterističnu
              tačku i menja smer rasta u zavisnosti od baze.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koja dva velika poglavlja direktno nastavljaju ovu lekciju?"
          answer={
            <p>
              Eksponencijalne jednačine i nejednačine, a zatim logaritamske
              funkcije i logaritamske jednačine. Ako ovde razumeš graf, kasniji
              algebrajski postupci imaju mnogo više smisla.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNI OBLIK ═══════════ */}
      <LessonSection
        id="osnovni"
        eyebrow="Definicija"
        title="Osnovni oblik: sta je eksponencijalna funkcija"
        description="Eksponencijalna funkcija je funkcija oblika f(x) = a^x, gde je baza a pozitivan broj različit od 1. Ključna novina je to što je promenljiva x u eksponentu, a ne ispred baze."
      >
        <div className={s.grid2}>
          <SectionCard title="Formalni zapis">
            <MathBlock>{"f(x)=a^x,\\qquad a>0,\\quad a\\neq 1"}</MathBlock>
            <p>
              U školskim zadacima baza je najčešće{" "}
              <InlineMath>{"2"}</InlineMath>, <InlineMath>{"3"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{1}{2}"}</InlineMath>,{" "}
              <InlineMath>{"\\frac{1}{3}"}</InlineMath>, ali može biti bilo koji
              pozitivan realan broj osim jedinice.
            </p>
          </SectionCard>
          <SectionCard title="Zašto vaze uslovi za bazu">
            <ul>
              <li>
                Ako je <InlineMath>{"a=1"}</InlineMath>, dobijaš konstantnu
                funkciju <InlineMath>{"1^x=1"}</InlineMath>, pa više nema pravog
                eksponencijalnog ponašanja.
              </li>
              <li>
                Ako je <InlineMath>{"a\\le 0"}</InlineMath>, izraz{" "}
                <InlineMath>{"a^x"}</InlineMath> nije dobro definisan za svako
                realno <InlineMath>{"x"}</InlineMath>.
              </li>
              <li>
                Zato u realnoj analizi tražimo upravo{" "}
                <InlineMath>{"a>0"}</InlineMath> i{" "}
                <InlineMath>{"a\\neq 1"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Domen i skup vrednosti">
            <MathBlock>
              {"D(f)=\\mathbb{R},\\qquad V(f)=(0,\\infty)"}
            </MathBlock>
            <p>
              Funkcija je definisana za svaki realan broj{" "}
              <InlineMath>{"x"}</InlineMath>, ali njene vrednosti su uvek strogo
              pozitivne. Zato grafik nikada ne sece{" "}
              <InlineMath>{"x"}</InlineMath>-osu.
            </p>
          </SectionCard>
          <SectionCard title="Karakteristicne činjenice">
            <ul>
              <li>
                <InlineMath>{"f(0)=a^0=1"}</InlineMath>, pa grafik uvek prolazi
                kroz tačku <InlineMath>{"(0,1)"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"f(1)=a"}</InlineMath>, pa baza direktno daje
                visinu tačke sa <InlineMath>{"x=1"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"f(-1)=\\frac{1}{a}"}</InlineMath>, što je još
                jedna brza tačka za skicu.
              </li>
              <li>
                Horizontalna asimptota osnovnog grafa je{" "}
                <InlineMath>{"y=0"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto svaki grafik y = a^x prolazi kroz (0, 1)?"
          answer={
            <p>
              Zato što za svaku dozvoljenu bazu vazi{" "}
              <InlineMath>{"a^0=1"}</InlineMath>. Čim u eksponent stavis{" "}
              <InlineMath>{"x=0"}</InlineMath>, dobijaš vrednost{" "}
              <InlineMath>{"1"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ RAST I PAD ═══════════ */}
      <LessonSection
        id="rastpad"
        eyebrow="Monotonost"
        title="Rast i pad: najvažnija podela cele lekcije"
        description="Sve se menja u zavisnosti od toga da li je baza veća od 1 ili između 0 i 1. To nije sitnica, nego glavno pravilo za čitanje eksponencijalnog grafa i resavanje zadataka."
      >
        <div className={s.grid2}>
          <SectionCard title="Slučaj a > 1: funkcija raste">
            <MathBlock>
              {"x_1<x_2 \\Rightarrow a^{x_1}<a^{x_2}"}
            </MathBlock>
            <p>
              Ako je baza veća od <InlineMath>{"1"}</InlineMath>, svako
              povećanje eksponenta daje vecu vrednost. Zato grafik ide naviše
              kada se krećeš udesno. Primeri su{" "}
              <InlineMath>{"2^x"}</InlineMath>, <InlineMath>{"3^x"}</InlineMath>
              , <InlineMath>{"10^x"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Slučaj 0 < a < 1: funkcija opada">
            <MathBlock>
              {"x_1<x_2 \\Rightarrow a^{x_1}>a^{x_2}"}
            </MathBlock>
            <p>
              Ako je baza razlomak između <InlineMath>{"0"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>, svako povećanje eksponenta daje
              manju vrednost. Zato grafik opada kada se krećeš udesno. Primeri su{" "}
              <InlineMath>{"\\left(\\frac{1}{2}\\right)^x"}</InlineMath> i{" "}
              <InlineMath>{"\\left(\\frac{1}{3}\\right)^x"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Intuitivni trik: odnos susednih vrednosti">
            <MathBlock>{"f(x+1)=a\\cdot f(x)"}</MathBlock>
            <p>
              Kada pomeriš <InlineMath>{"x"}</InlineMath> za{" "}
              <InlineMath>{"1"}</InlineMath>, vrednost funkcije se mnozi bazom{" "}
              <InlineMath>{"a"}</InlineMath>. Ako mnozis brojem većim od{" "}
              <InlineMath>{"1"}</InlineMath>, vrednosti rastu. Ako mnozis brojem
              između <InlineMath>{"0"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>, vrednosti opadaju.
            </p>
          </SectionCard>
          <SectionCard title="Brzo poređenje bez računanja">
            <p>
              Za rastuću funkciju je veći eksponent dovoljan da zaključiš vecu
              vrednost. Za opadajucu funkciju važi obrnuto. Ovo je veoma korisno
              kod poređenja izraza na prijemnom.
            </p>
            <MathBlock>
              {
                "2^5 > 2^3,\\qquad \\left(\\frac{1}{2}\\right)^5 < \\left(\\frac{1}{2}\\right)^3"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li funkcija f(x) = (1/4)^x raste ili opada?"
          answer={
            <p>
              Opada, jer je baza <InlineMath>{"\\frac{1}{4}"}</InlineMath>{" "}
              između <InlineMath>{"0"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>. To je najvažniji signal koji moras
              odmah da vidiš.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ TRANSFORMACIJE ═══════════ */}
      <LessonSection
        id="transformacije"
        eyebrow="Transformacije"
        title="Pomeraji i asimptota: kako nastaje novi grafik"
        description="Na prijemnom se retko ostaje samo na čistoj funkciji a^x. Mnogo češće dobijaš pomeren oblik. Zato moraš da umeš da pročitaš funkciju g(x) = a^(x-p) + q bez panike i bez precrtavanja od nule."
      >
        <div className={s.grid3}>
          <SectionCard title="Horizontalni pomeraj">
            <MathBlock>{"g(x)=a^{x-p}"}</MathBlock>
            <p>
              Ako je u eksponentu <InlineMath>{"x-p"}</InlineMath>, osnovni
              grafik se pomera udesno za <InlineMath>{"p"}</InlineMath>. Ako je{" "}
              <InlineMath>{"x+p"}</InlineMath>, pomera se ulevo za{" "}
              <InlineMath>{"p"}</InlineMath>. Tačka u kojoj je eksponent nula
              postaje <InlineMath>{"x=p"}</InlineMath>, pa tada dobijaš vrednost{" "}
              <InlineMath>{"1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Vertikalni pomeraj">
            <MathBlock>{"g(x)=a^{x-p}+q"}</MathBlock>
            <p>
              Sabiranje broja <InlineMath>{"q"}</InlineMath> pomera grafik naviše
              za <InlineMath>{"q"}</InlineMath> ako je{" "}
              <InlineMath>{"q>0"}</InlineMath>, odnosno nanize ako je{" "}
              <InlineMath>{"q<0"}</InlineMath>. Zajedno sa grafikom pomera se i
              horizontalna asimptota.
            </p>
          </SectionCard>
          <SectionCard title="Asimptota novog grafa">
            <MathBlock>{"y=q"}</MathBlock>
            <p>
              Pošto je <InlineMath>{"a^{x-p}"}</InlineMath> uvek pozitivno,
              funkcija <InlineMath>{"a^{x-p}+q"}</InlineMath> ostaje strogo
              iznad prave <InlineMath>{"y=q"}</InlineMath>. Grafik može da joj
              se približava beskonačno, ali je ne dodiruje.
            </p>
          </SectionCard>
          <SectionCard title="Domen i skup vrednosti">
            <MathBlock>
              {"D(g)=\\mathbb{R},\\qquad V(g)=(q,\\infty)"}
            </MathBlock>
            <p>
              Horizontalni i vertikalni pomeraj ne kvare domen: i dalje je{" "}
              <InlineMath>{"\\mathbb{R}"}</InlineMath>. Ali se skup vrednosti
              pomera naviše ili nanize zajedno sa asimptotom.
            </p>
          </SectionCard>
          <SectionCard title="Najvažnija laka tačka">
            <p>
              Kada je eksponent jednak nuli, dobijaš vrednost{" "}
              <InlineMath>{"1"}</InlineMath>. Zato za funkciju{" "}
              <InlineMath>{"g(x)=a^{x-p}+q"}</InlineMath> odmah dobijaš tačku
            </p>
            <MathBlock>{"(p,\\,1+q)"}</MathBlock>
            <p>To je često najbolja polažna tačka za crtanje.</p>
          </SectionCard>
          <SectionCard title="Napredna napomena za prijemni">
            <p>
              Ako se pojavi oblik{" "}
              <InlineMath>{"c\\cdot a^{x-p}+q"}</InlineMath>, onda broj{" "}
              <InlineMath>{"c"}</InlineMath> menja vertikalno rastezanje, a ako
              je <InlineMath>{"c<0"}</InlineMath>, grafik se preslikava u odnosu
              na asimptotu. Tada je skup vrednosti{" "}
              <InlineMath>{"(-\\infty,q)"}</InlineMath>, a ne{" "}
              <InlineMath>{"(q,\\infty)"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koja je horizontalna asimptota funkcije f(x) = 5^(x-2) - 4?"
          answer={
            <p>
              Asimptota je <InlineMath>{"y=-4"}</InlineMath>. Osnovna asimptota{" "}
              <InlineMath>{"y=0"}</InlineMath> pomerena je nanize za{" "}
              <InlineMath>{"4"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ CRTANJE ═══════════ */}
      <LessonSection
        id="crtanje"
        eyebrow="Algoritam"
        title="Kako da nacrtaš grafik bez lutanja"
        description="Crtanje eksponencijalne funkcije nije takmicenje u broju tacaka. Dovoljno je nekoliko dobro izabranih informacija: baza, asimptota, smer rasta i jedna ili dve karakteristične tačke."
      >
        <div className={s.grid2}>
          <SectionCard title="Algoritam za funkciju a^(x-p) + q">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pogledaj bazu.">
                <p>
                  Ako je <InlineMath>{"a>1"}</InlineMath>, grafik raste; ako je{" "}
                  <InlineMath>{"0<a<1"}</InlineMath>, opada.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Upisi horizontalnu asimptotu{" "}
                    <InlineMath>{"y=q"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Nađi tačku gde je eksponent nula:{" "}
                    <InlineMath>{"x=p"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Tada je <InlineMath>{"y=1+q"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={4}
                title={
                  <>
                    Dodaj još jednu laku tačku, na primer za{" "}
                    <InlineMath>{"x=p+1"}</InlineMath>.
                  </>
                }
              >
                <p>
                  Dobijas <InlineMath>{"y=a+q"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={5}
                title="Skiciraj glatku krivu."
              >
                <p>
                  Kriva prolazi kroz te tačke i približava se asimptoti bez
                  presecanja.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Važno upozorenje">
            <p>
              Eksponencijalni grafik ne seče horizontalnu asimptotu. Ako si na
              skici presekao pravu <InlineMath>{"y=q"}</InlineMath>, skica je
              pogrešna. Druga tipična greška je da se zaboravi da je{" "}
              <InlineMath>{"a^{x-p}"}</InlineMath> uvek pozitivno.
            </p>
            <MathBlock>
              {"a^{x-p}>0 \\quad \\text{za svaki } x\\in\\mathbb{R}"}
            </MathBlock>
          </SectionCard>
        </div>

        <SectionCard title="Mini-skica za g(x) = 2^(x-1) - 3">
          <p>
            Ovo je rastuća eksponencijalna funkcija, jer je baza{" "}
            <InlineMath>{"2>1"}</InlineMath>. Horizontalna asimptota je{" "}
            <InlineMath>{"y=-3"}</InlineMath>. Kada je eksponent nula, to jest za{" "}
            <InlineMath>{"x=1"}</InlineMath>, dobijaš tačku{" "}
            <InlineMath>{"g(1)=2^0-3=1-3=-2"}</InlineMath>, pa je jedna sigurna
            tačka <InlineMath>{"(1,-2)"}</InlineMath>. Za{" "}
            <InlineMath>{"x=2"}</InlineMath> dobijaš{" "}
            <InlineMath>{"g(2)=2^1-3=-1"}</InlineMath>, a za{" "}
            <InlineMath>{"x=3"}</InlineMath> dobijaš{" "}
            <InlineMath>{"g(3)=2^2-3=1"}</InlineMath>. Dovoljno da vidiš rastuću
            krivu koja dolazi blizu prave <InlineMath>{"y=-3"}</InlineMath> s
            leve strane, a zatim se dize naviše.
          </p>
          <MathBlock>
            {"y=-3,\\qquad (1,-2),\\qquad (2,-1),\\qquad (3,1)"}
          </MathBlock>
        </SectionCard>

        <MicroCheck
          question="Mikro-provera: koja je najbrza tačka za funkciju h(x) = 3^(x+2) + 1?"
          answer={
            <p>
              Eksponent je nula kada je <InlineMath>{"x+2=0"}</InlineMath>,
              dakle za <InlineMath>{"x=-2"}</InlineMath>. Tada je{" "}
              <InlineMath>{"h(-2)=1+1=2"}</InlineMath>, pa je najbrza
              karakteristična tačka <InlineMath>{"(-2,2)"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Interaktivna laboratorija: baza i pomeraji"
        description="U ovoj laboratoriji menjaš funkciju y = a^(x-p) + q. Posmatraj kako se istovremeno menja smer rasta ili pada, položaj asimptote, karakteristične tačke i vrednost funkcije u izabranoj tački."
      >
        <ExponentialLab />

        <MicroCheck
          question="Kako da laboratorija zaista služi učenju?"
          answer={
            <ul>
              <li>
                Prvo pogledaj bazu i bez gledanja u grafik izgovori: raste ili
                opada.
              </li>
              <li>
                Zatim odredi asimptotu <InlineMath>{"y=q"}</InlineMath>.
              </li>
              <li>
                Nađi tačku <InlineMath>{"x=p"}</InlineMath>, jer je tada
                eksponent jednak <InlineMath>{"0"}</InlineMath>.
              </li>
              <li>
                Tek onda proveri svoj zaključak na crtežu i u karticama sa
                rezultatima.
              </li>
            </ul>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Korak po korak"
        title="Vođeni primeri"
        description="U primerima je najvažnije da pratiš redosled razmisljanja. Cilj nije samo tacan odgovor, nego i siguran obrazac koji možeš da preneses na prijemni zadatak."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: osnovna analiza funkcije{" "}
              <InlineMath>{"f(x)=2^x"}</InlineMath>
            </h3>
            <p>
              Odredi domen, skup vrednosti, monotonost, asimptotu i nekoliko
              tacaka potrebnih za skicu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Baza je 2 > 1, pa je funkcija rastuća." />
              <WalkStep
                number={2}
                title={
                  <>
                    Domen je <InlineMath>{"\\mathbb{R}"}</InlineMath>, jer je
                    izraz definisan za svako realno{" "}
                    <InlineMath>{"x"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Skup vrednosti je{" "}
                    <InlineMath>{"(0,\\infty)"}</InlineMath>, jer je{" "}
                    <InlineMath>{"2^x>0"}</InlineMath> za svako{" "}
                    <InlineMath>{"x"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Horizontalna asimptota je{" "}
                    <InlineMath>{"y=0"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={5}
                title={
                  <>
                    Brze tačke su{" "}
                    <InlineMath>
                      {"(-1,\\frac{1}{2}),\\ (0,1),\\ (1,2)"}
                    </InlineMath>
                    .
                  </>
                }
              />
            </div>
            <MathBlock>
              {"D(f)=\\mathbb{R},\\qquad V(f)=(0,\\infty),\\qquad y=0"}
            </MathBlock>
            <p>
              Poenta ovog primera je da vidiš koliko mnogo zaključaka dobijaš bez
              ikakve teške računice.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 2: baza manja od 1</h3>
            <p>
              Data je funkcija{" "}
              <InlineMath>{"g(x)=\\left(\\frac{1}{3}\\right)^x"}</InlineMath>.
              Odredi monotonost i reši nejednačinu{" "}
              <InlineMath>{"g(x)>1"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Baza <InlineMath>{"\\frac{1}{3}"}</InlineMath> je između{" "}
                    <InlineMath>{"0"}</InlineMath> i{" "}
                    <InlineMath>{"1"}</InlineMath>, pa funkcija opada.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Znamo da je <InlineMath>{"g(0)=1"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title="Kod opadajuce funkcije vrednosti levo od 0 biće veće od 1, a desno od 0 manje od 1."
              />
            </div>
            <MathBlock>
              {"\\left(\\frac{1}{3}\\right)^x > 1 \\iff x<0"}
            </MathBlock>
            <p>
              Ovo je lep primer kako monotono ponašanje rešava zadatak brže od
              grubog računanja.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: pomeren grafik{" "}
              <InlineMath>{"h(x)=2^{x-1}-3"}</InlineMath>
            </h3>
            <p>
              Odredi asimptotu, jednu ključnu tačku, presek sa{" "}
              <InlineMath>{"y"}</InlineMath>-osom i presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Baza je 2 > 1, pa je grafik rastući."
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Asimptota je <InlineMath>{"y=-3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Eksponent je nula za <InlineMath>{"x=1"}</InlineMath>, pa je{" "}
                    <InlineMath>{"h(1)=1-3=-2"}</InlineMath>. Dakle, tačka{" "}
                    <InlineMath>{"(1,-2)"}</InlineMath> je sigurna.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Presek sa <InlineMath>{"y"}</InlineMath>-osom: za{" "}
                    <InlineMath>{"x=0"}</InlineMath>,{" "}
                    <InlineMath>
                      {"h(0)=2^{-1}-3=\\frac{1}{2}-3=-\\frac{5}{2}"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep
                number={5}
                title={
                  <>
                    Presek sa <InlineMath>{"x"}</InlineMath>-osom: iz{" "}
                    <InlineMath>{"2^{x-1}=3"}</InlineMath>. Tacna vrednost
                    nije lepa bez logaritama, pa je dovoljno znati da postoji
                    jedan jedini presek jer funkcija raste.
                  </>
                }
              />
            </div>
            <MathBlock>
              {
                "y=-3,\\qquad (1,-2),\\qquad \\left(0,-\\frac{5}{2}\\right)"
              }
            </MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: određivanje baze iz tačke
            </h3>
            <p>
              Funkcija je oblika <InlineMath>{"f(x)=a^x+2"}</InlineMath> i
              prolazi kroz tačku <InlineMath>{"(1,5)"}</InlineMath>. Odredi{" "}
              <InlineMath>{"a"}</InlineMath> i osnovne osobine grafa.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Uvrsti koordinatu tačke:{" "}
                    <InlineMath>{"f(1)=a^1+2=5"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Odavde dobijaš <InlineMath>{"a=3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Zato je funkcija <InlineMath>{"f(x)=3^x+2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Baza je <InlineMath>{"3>1"}</InlineMath>, pa funkcija raste.
                    Asimptota je <InlineMath>{"y=2"}</InlineMath>, domen je{" "}
                    <InlineMath>{"\\mathbb{R}"}</InlineMath>, a skup vrednosti{" "}
                    <InlineMath>{"(2,\\infty)"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>
              {"f(x)=3^x+2,\\qquad y=2,\\qquad V(f)=(2,\\infty)"}
            </MathBlock>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: da li postoji presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom?
            </h3>
            <p>
              Posmatraj funkciju{" "}
              <InlineMath>{"k(x)=2^{x-2}+1"}</InlineMath>. Da li njen grafik
              seče <InlineMath>{"x"}</InlineMath>-osu?
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto je <InlineMath>{"2^{x-2}>0"}</InlineMath> za svako{" "}
                    <InlineMath>{"x"}</InlineMath>, vazi{" "}
                    <InlineMath>{"2^{x-2}+1>1"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title="To znači da je funkcija uvek strogo pozitivna."
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Zato presek sa <InlineMath>{"x"}</InlineMath>-osom ne
                    postoji.
                  </>
                }
              />
            </div>
            <MathBlock>
              {"k(x)>1 \\quad \\text{za svaki } x\\in\\mathbb{R}"}
            </MathBlock>
            <p>
              Ovo je važan prijemni refleks: pre nego što kreneš da rešavaš
              jednačinu, proveri da li je presek uopste moguc.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: nemoj mešati{" "}
              <InlineMath>{"2^{x-2}"}</InlineMath> i{" "}
              <InlineMath>{"2^x-2"}</InlineMath>
            </h3>
            <p>
              Uporedi funkcije <InlineMath>{"u(x)=2^{x-2}"}</InlineMath> i{" "}
              <InlineMath>{"v(x)=2^x-2"}</InlineMath>. Objasni zašto nisu isti
              pomeraj.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Funkcija <InlineMath>{"u(x)=2^{x-2}"}</InlineMath> nastaje
                    horizontalnim pomerajem grafa <InlineMath>{"2^x"}</InlineMath>{" "}
                    udesno za <InlineMath>{"2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={2}
                title={
                  <>
                    Funkcija <InlineMath>{"v(x)=2^x-2"}</InlineMath> nastaje
                    vertikalnim pomerajem nanize za{" "}
                    <InlineMath>{"2"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Zato <InlineMath>{"u"}</InlineMath> i{" "}
                    <InlineMath>{"v"}</InlineMath> imaju različite asimptote: za{" "}
                    <InlineMath>{"u"}</InlineMath> je to{" "}
                    <InlineMath>{"y=0"}</InlineMath>, a za{" "}
                    <InlineMath>{"v"}</InlineMath> je{" "}
                    <InlineMath>{"y=-2"}</InlineMath>.
                  </>
                }
              />
            </div>
            <MathBlock>
              {
                "u(x)=2^{x-2} \\Rightarrow y=0,\\qquad v(x)=2^x-2 \\Rightarrow y=-2"
              }
            </MathBlock>
            <p>
              Ovo je jedna od najčešćih grafičkih zamki u celoj oblasti
              eksponencijalnih funkcija.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Sažetak"
        title="Ključne formule i obrasci"
        description="Ovo je deo koji vredi ponavljati pred kontrolni ili prijemni. Svaka kartica nosi jedan osnovni refleks."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Definicija"
            formula={"f(x)=a^x,\quad a>0,\ a\neq 1"}
            note="Promenljiva je u eksponentu, a baza mora biti pozitivna i različita od 1."
          />
          <FormulaCard
            title="Domen i vrednosti"
            formula={"D(f)=\mathbb{R},\qquad V(f)=(0,\infty)"}
            note="Eksponencijalna funkcija je svuda definisana i uvek pozitivna."
          />
          <FormulaCard
            title="Karakteristicna tačka"
            formula="f(0)=1"
            note="Zato osnovni grafik uvek prolazi kroz (0, 1)."
          />
          <FormulaCard
            title="Monotonost"
            formula={"a>1 \Rightarrow \text{rastuća},\qquad 0<a<1 \Rightarrow \text{opadajuća}"}
            note="Smer rasta određuje samo baza."
          />
          <FormulaCard
            title="Pomerena funkcija"
            formula="g(x)=a^{x-p}+q"
            note="Grafik je pomeren za p horizontalno i za q vertikalno."
          />
          <FormulaCard
            title="Asimptota"
            formula="y=q"
            note="Kod funkcije a^(x-p) + q horizontalna asimptota prati vertikalni pomeraj."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Zamke"
        title="Česte greške"
        description="Ovde su greške koje se stalno ponavljaju. Prodji kroz njih pažljivo, jer su upravo one tipične prijemne zamke."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno tumacenje baze manje od 1
            </h3>
            <p>
              Učenik vidi pozitivan broj i automatski kaže &ldquo;rastuća&rdquo;.
              To nije tačno. Ako je baza između <InlineMath>{"0"}</InlineMath> i{" "}
              <InlineMath>{"1"}</InlineMath>, funkcija opada.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje <InlineMath>{"a^{x-p}"}</InlineMath> i{" "}
              <InlineMath>{"a^x-p"}</InlineMath>
            </h3>
            <p>
              Prvi zapis menja grafik horizontalno, drugi vertikalno. Ako to
              zameniš, dobijaš potpuno pogrešnu asimptotu i pogrešnu skicu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Crtanje preseka sa asimptotom</h3>
            <p>
              Eksponencijalni grafik može beskonačno da se približava asimptoti,
              ali je ne seče. Ako je presekao, crtež nije dobar.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Verovanje da vertikalni pomeraj menja domen
            </h3>
            <p>
              Nije tačno. Funkcija{" "}
              <InlineMath>{"a^{x-p}+q"}</InlineMath> je i dalje definisana za
              svaki realan broj <InlineMath>{"x"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Forširanje preseka sa <InlineMath>{"x"}</InlineMath>-osom
            </h3>
            <p>
              Ako je funkcija stalno iznad svoje asimptote i asimptota je iznad
              ili na <InlineMath>{"x"}</InlineMath>-osi, presek sa{" "}
              <InlineMath>{"x"}</InlineMath>-osom često ni ne postoji.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Suviše mnogo računanja</h3>
            <p>
              Mnogi učenici odmah krecu u detaljne račune, a zaborave da baza,
              asimptota i jedna karakteristična tačka već daju gotovo celu sliku.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Ispitna strategija"
        title="Veza sa prijemnim zadacima"
        description="Na prijemnom se ova tema retko pojavljuje kao 'nacrtaj grafik i nista vise'. Mnogo češće se traži tumacenje grafa, broj rešenja jednačine, poređenje vrednosti ili prepoznavanje ispravnog crteža."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>1. Prvi pogled na bazu</h3>
            <p>
              Čim vidiš funkciju, odmah odluci:{" "}
              <InlineMath>{"a>1"}</InlineMath> ili{" "}
              <InlineMath>{"0<a<1"}</InlineMath>. To rešava pitanje rasta i
              pada.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>2. Odmah upisi asimptotu</h3>
            <p>
              Ako imaš oblik <InlineMath>{"a^{x-p}+q"}</InlineMath>, prvo zapisi{" "}
              <InlineMath>{"y=q"}</InlineMath>. To je sidro celog grafa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              3. Nađi tačku sa eksponentom 0
            </h3>
            <p>
              To je najbrzi način da dobijaš pouzdanu tačku bez komplikovanog
              računanja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              4. Presek sa <InlineMath>{"x"}</InlineMath>-osom proveri logicki
            </h3>
            <p>
              Pre računanja se pitaj da li je uopste moguc. Ako je funkcija uvek
              iznad nule, nema svrhe rešavati jednačinu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              5. Poredjenja radi preko monotonosti
            </h3>
            <p>
              Kod istih baza često ne moraš nista da računaš. Dovoljno je da
              znaš kako se funkcija ponasa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              6. Citaj zadatak grafički i algebarski
            </h3>
            <p>
              Dobar rezultat dolazi kada isti zadatak vidiš i kao formulu i kao
              sliku. To ubrzava proveru grešaka.
            </p>
          </article>
        </div>

        <InsightCard title="Ključna poruka lekcije">
          <p>
            Eksponencijalni grafik se ne crta iz mnogo slučajnih tacaka. Prvo
            gledaš bazu, zatim asimptotu, pa tačku u kojoj je eksponent jednak
            nuli. To je najbrzi i najpouzdaniji put do dobre skice i dobrog
            rešenja.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Samostalni rad"
        title="Vežbe za kraj lekcije"
        description="Pokušaj da zadatke uradiš samostalno, pa tek onda otvori rešenje. Najviše koristi imaš ako prvo sam formiraš skicu i zakljucke."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za funkciju <InlineMath>{"f(x)=3^x"}</InlineMath> odredi domen,
                skup vrednosti, monotonost i horizontalnu asimptotu.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto je baza <InlineMath>{"3>1"}</InlineMath>, funkcija je
                  rastuća. Domen je <InlineMath>{"\\mathbb{R}"}</InlineMath>,
                  skup vrednosti <InlineMath>{"(0,\\infty)"}</InlineMath>, a
                  horizontalna asimptota <InlineMath>{"y=0"}</InlineMath>.
                </p>
                <MathBlock>
                  {"D(f)=\\mathbb{R},\\qquad V(f)=(0,\\infty),\\qquad y=0"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Za funkciju{" "}
                <InlineMath>
                  {"g(x)=\\left(\\frac{1}{2}\\right)^{x+1}-2"}
                </InlineMath>{" "}
                odredi asimptotu i presek sa{" "}
                <InlineMath>{"x"}</InlineMath>-osom.
              </p>
            }
            solution={
              <>
                <p>
                  Asimptota je <InlineMath>{"y=-2"}</InlineMath>. Presek sa{" "}
                  <InlineMath>{"x"}</InlineMath>-osom dobijaš iz{" "}
                  <InlineMath>
                    {
                      "\\left(\\frac{1}{2}\\right)^{x+1}-2=0"
                    }
                  </InlineMath>
                  , odnosno{" "}
                  <InlineMath>
                    {
                      "\\left(\\frac{1}{2}\\right)^{x+1}=2=\\left(\\frac{1}{2}\\right)^{-1}"
                    }
                  </InlineMath>
                  . Zato je <InlineMath>{"x+1=-1"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x=-2"}</InlineMath>.
                </p>
                <MathBlock>{"y=-2,\\qquad (-2,0)"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Funkcija je oblika <InlineMath>{"h(x)=a^x"}</InlineMath> i vazi{" "}
                <InlineMath>{"h(2)=9"}</InlineMath>. Odredi bazu{" "}
                <InlineMath>{"a"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Iz uslova sledi <InlineMath>{"a^2=9"}</InlineMath>. Kako baza
                  eksponencijalne funkcije mora biti pozitivna, dobijaš{" "}
                  <InlineMath>{"a=3"}</InlineMath>, a ne{" "}
                  <InlineMath>{"-3"}</InlineMath>.
                </p>
                <MathBlock>{"a=3"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Da li grafik funkcije{" "}
                <InlineMath>{"k(x)=2^{x-2}+1"}</InlineMath> sece{" "}
                <InlineMath>{"x"}</InlineMath>-osu?
              </p>
            }
            solution={
              <>
                <p>
                  Ne seče. Pošto je <InlineMath>{"2^{x-2}>0"}</InlineMath> za
                  svaki <InlineMath>{"x"}</InlineMath>, sledi{" "}
                  <InlineMath>{"k(x)>1"}</InlineMath>. Dakle, funkcija je uvek
                  pozitivna.
                </p>
                <MathBlock>
                  {
                    "k(x)>1 \\Rightarrow \\text{nema preseka sa } x\\text{-osom}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši bez kalkulatora nejednačinu{" "}
                <InlineMath>
                  {"\\left(\\frac{1}{4}\\right)^{x+2}<1"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>
                  Za bazu između <InlineMath>{"0"}</InlineMath> i{" "}
                  <InlineMath>{"1"}</InlineMath> vrednost funkcije je jednaka{" "}
                  <InlineMath>{"1"}</InlineMath> kada je eksponent{" "}
                  <InlineMath>{"0"}</InlineMath>, a manja od{" "}
                  <InlineMath>{"1"}</InlineMath> kada je eksponent pozitivan.
                  Zato treba da važi <InlineMath>{"x+2>0"}</InlineMath>, pa je
                  rešenje <InlineMath>{"x>-2"}</InlineMath>.
                </p>
                <MathBlock>{"x>-2"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Za funkciju <InlineMath>{"m(x)=3^{x-1}+4"}</InlineMath> napiši
                jednu sigurnu tačku i horizontalnu asimptotu.
              </p>
            }
            solution={
              <>
                <p>
                  Eksponent je nula kada je <InlineMath>{"x=1"}</InlineMath>.
                  Tada je <InlineMath>{"m(1)=1+4=5"}</InlineMath>, pa je sigurna
                  tačka <InlineMath>{"(1,5)"}</InlineMath>. Horizontalna
                  asimptota je <InlineMath>{"y=4"}</InlineMath>.
                </p>
                <MathBlock>{"(1,5),\\qquad y=4"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Za ponavljanje"
        title="Završni rezime"
        description="Na kraju ove lekcije cilj je da eksponencijalnu funkciju vidiš kao celinu, a ne kao izolovanu formulu."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Sta moraš da zapamtiš</h3>
            <ul>
              <li>
                <InlineMath>{"f(x)=a^x"}</InlineMath> sa uslovima{" "}
                <InlineMath>{"a>0"}</InlineMath> i{" "}
                <InlineMath>{"a\\neq 1"}</InlineMath>.
              </li>
              <li>
                Domen je <InlineMath>{"\\mathbb{R}"}</InlineMath>, a skup
                vrednosti <InlineMath>{"(0,\\infty)"}</InlineMath>.
              </li>
              <li>
                Grafik prolazi kroz <InlineMath>{"(0,1)"}</InlineMath> i ima
                asimptotu <InlineMath>{"y=0"}</InlineMath>.
              </li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Najvažniji uvid</h3>
            <ul>
              <li>
                Ako je <InlineMath>{"a>1"}</InlineMath>, funkcija raste.
              </li>
              <li>
                Ako je <InlineMath>{"0<a<1"}</InlineMath>, funkcija opada.
              </li>
              <li>
                Kod oblika <InlineMath>{"a^{x-p}+q"}</InlineMath> asimptota je{" "}
                <InlineMath>{"y=q"}</InlineMath>, a brza tačka je{" "}
                <InlineMath>{"(p,1+q)"}</InlineMath>.
              </li>
            </ul>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>Sledeći logičan korak</h3>
            <ul>
              <li>
                Predji na eksponencijalne jednačine i primeni ideju istih baza.
              </li>
              <li>
                Zatim povezi ovu temu sa logaritmima kao obrnutim procesom.
              </li>
              <li>
                Dok radis zadatke, uvek spajaj formulu i grafičku sliku.
              </li>
            </ul>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 26 postavlja temelj za ceo blok eksponencijalnih i
          logaritamskih funkcija: od definicije i grafika do jednačina i
          nejednačina.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
