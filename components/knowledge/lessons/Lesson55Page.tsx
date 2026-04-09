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
import ProgressionLab from "./ProgressionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#definicija", label: "Definicija i intuicija" },
  { href: "#opsti-clan", label: "Opšti član" },
  { href: "#suma", label: "Suma prvih n članova" },
  { href: "#srednji-clan", label: "Srednji član i sistemi" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson55Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 55"
        title={
          <>
            Aritmetički niz i{" "}
            <span className={cs.tHeroAccent}>ritam stalne razlike</span>
          </>
        }
        description="Aritmetički niz deluje jednostavno dok ga gledaš kao listu brojeva. Postaje mnogo moćniji kada ga vidiš kao pravilo: svaki sledeći član nastaje istim pomakom. Upravo taj stalni pomak omogućava da brzo računaš bilo koji član, zbir prvih n članova i da tekstualne uslove prevodiš u linearne jednačine koje su veoma česte na prijemnom."
        heroImageSrc="/api/lessons/55/hero"
        heroImageAlt="Ilustracija matematičke table za lekciju o aritmetičkom nizu"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako iz a₁ i d dobijaš ceo niz, svaki član i zbir bez pisanja svih članova. To je glavna ušteda vremena u ispitnim zadacima.",
          },
          {
            label: "Najveća zamka",
            description:
              "Učenici često napišu aₙ = a₁ + nd, a zapravo zaborave da do n-tog člana ima n−1 skokova. Prvi član nema nijedan skok od sebe do sebe.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Srednji član, ubacivanje aritmetičkih sredina i zadaci koji iz više uslova traže a₁ i d. To je deo gde se proverava razumevanje, a ne samo mehanično računanje.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "Oko 70 minuta sa laboratorijumom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description:
              "Linearne jednačine, rad sa zagradama i pojam aritmetičke sredine.",
          },
          {
            label: "Glavna veština",
            description:
              "Iz jezika zadatka brzo napisati formule za aₙ, Sₙ i uslove nad članovima.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija sa tačkama (k, aₖ) i proverom svojstva srednjeg člana.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto učiš ovo"
        title="Zašto je ova lekcija važna"
        description="Aritmetički niz je jedna od prvih tema u kojoj isti obrazac vidiš kroz više lica: kao listu brojeva, kao formulu za član, kao zbir i kao linearnu zavisnost od indeksa. Na prijemnom se baš zato često koristi kao test razumevanja."
      >
        <div className={s.grid3}>
          <SectionCard title="Uči te da prepoznaš isti pomak">
            <p>
              Kada je razlika između susednih članova stalna, nema potrebe da
              pišeš mnogo članova. Dovoljno je da znaš prvi član i korak{" "}
              <InlineMath>{"d"}</InlineMath>. To je mentalni model koji štedi
              vreme.
            </p>
          </SectionCard>
          <SectionCard title="Tačke leže na pravoj">
            <p>
              Ako posmatraš indeks <InlineMath>{"n"}</InlineMath> kao
              promenljivu, opšti član je linearna formula. Zato aritmetički niz
              nije izolovana tema, nego uvod u funkcionalno razmišljanje.
            </p>
          </SectionCard>
          <SectionCard title="Od teksta do sistema jednačina">
            <p>
              U zadacima se često zadaju odnosi između nekoliko članova niza.
              Tada ne traže da znaš formulu napamet, nego da od uslova napraviš
              sistem za <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>. To je centralna ispitna veština.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ DEFINICIJA I INTUICIJA ═══════════ */}
      <LessonSection
        id="definicija"
        eyebrow="Osnova"
        title="Definicija i intuicija"
        description="Pre formule, važno je da precizno znaš šta je niz. Niz je uređeni spisak brojeva: redosled članova je važan. Aritmetički niz je poseban slučaj u kome se od svakog člana do sledećeg stiže istom razlikom."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako se definiše niz">
            <p>
              Niz možeš da posmatraš kao funkciju koja svakom prirodnom broju{" "}
              <InlineMath>{"n"}</InlineMath> pridružuje jedan realan broj{" "}
              <InlineMath>{"a_n"}</InlineMath>. Zapisujemo:
            </p>
            <MathBlock>
              {"a:\\mathbb{N}\\to\\mathbb{R}, \\quad n \\mapsto a_n."}
            </MathBlock>
            <p>
              U praksi to čitaš ovako: prvom indeksu odgovara prvi član{" "}
              <InlineMath>{"a_1"}</InlineMath>, drugom drugi član{" "}
              <InlineMath>{"a_2"}</InlineMath>, i tako dalje.
            </p>
          </SectionCard>
          <SectionCard title="Šta znači da je niz aritmetički">
            <p>
              Niz je aritmetički ako je razlika svakog sledećeg i prethodnog
              člana stalna:
            </p>
            <MathBlock>
              {"a_{n+1}-a_n=d, \\quad \\text{za svako } n\\in\\mathbb{N}."}
            </MathBlock>
            <p>
              Broj <InlineMath>{"d"}</InlineMath> zove se razlika niza. Ako je{" "}
              <InlineMath>{"d>0"}</InlineMath>, niz raste. Ako je{" "}
              <InlineMath>{"d<0"}</InlineMath>, niz opada. Ako je{" "}
              <InlineMath>{"d=0"}</InlineMath>, svi članovi su jednaki.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Primer koji jeste">
            <MathBlock>{"3, 7, 11, 15, \\ldots"}</MathBlock>
            <p>
              Razlike su <InlineMath>{"+4, +4, +4"}</InlineMath>. Dakle, ovo je
              aritmetički niz sa <InlineMath>{"a_1=3"}</InlineMath> i{" "}
              <InlineMath>{"d=4"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Primer koji nije">
            <MathBlock>{"2, 4, 8, 16, \\ldots"}</MathBlock>
            <p>
              Razlike su <InlineMath>{"2, 4, 8"}</InlineMath>, pa nisu jednake.
              Ovo je geometrijski obrazac, ne aritmetički.
            </p>
          </SectionCard>
          <SectionCard title="Misli u skokovima">
            <p>
              Najbolje pitanje koje možeš sebi da postaviš jeste:{" "}
              <em>
                Koliki je isti skok od jednog člana do sledećeg?
              </em>{" "}
              Kada to vidiš, ostatak zadatka se obično sam otvara.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li je niz 10, 6, 2, −2, … aritmetički?"
          answer={
            <>
              <p>
                Jeste. Razlike su{" "}
                <InlineMath>{"6-10=-4"}</InlineMath>,{" "}
                <InlineMath>{"2-6=-4"}</InlineMath>,{" "}
                <InlineMath>{"-2-2=-4"}</InlineMath>. Dakle,{" "}
                <InlineMath>{"d=-4"}</InlineMath>.
              </p>
              <p>
                Važna poruka: aritmetički niz ne mora da raste. Dovoljno je da
                je razlika stalna, čak i kada je negativna.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ OPŠTI ČLAN ═══════════ */}
      <LessonSection
        id="opsti-clan"
        eyebrow="Prva velika formula"
        title="Opšti član: kako do bilo kog člana bez pisanja celog niza"
        description="Na prijemnom skoro nikada nemaš luksuz da ispisuješ mnogo članova. Zato moraš da razumeš logiku opšteg člana: od prvog do n-tog člana napraviš tačno n−1 jednakih skokova po d."
      >
        <div className={s.grid2}>
          <SectionCard title="Korak po korak">
            <MathBlock>{"a_1=a_1"}</MathBlock>
            <MathBlock>{"a_2=a_1+d"}</MathBlock>
            <MathBlock>{"a_3=a_1+2d"}</MathBlock>
            <MathBlock>{"a_4=a_1+3d"}</MathBlock>
            <p>
              Vidiš obrazac: indeks raste za{" "}
              <InlineMath>{"1"}</InlineMath>, a broj dodatih razlika raste za{" "}
              <InlineMath>{"1"}</InlineMath>. Zato za{" "}
              <InlineMath>{"n"}</InlineMath>-ti član važi:
            </p>
            <MathBlock>{"a_n=a_1+(n-1)d."}</MathBlock>
          </SectionCard>

          <SectionCard title="Zašto nije a₁ + nd">
            <p>
              Zato što do prvog člana ne praviš nijedan skok. Ako tražiš{" "}
              <InlineMath>{"a_1"}</InlineMath>, formula mora da da baš{" "}
              <InlineMath>{"a_1"}</InlineMath>:
            </p>
            <MathBlock>{"a_1=a_1+(1-1)d=a_1."}</MathBlock>
            <p>
              Ovo je jednostavna samoprovera. Kad god sumnjaš u formulu, ubaci{" "}
              <InlineMath>{"n=1"}</InlineMath>. Ako ne dobiješ prvi član,
              nešto je pogrešno.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški trik koji pomaže">
          <p>
            Ne pamti formulu napamet bez slike. Zamisli da stojiš na{" "}
            <InlineMath>{"a_1"}</InlineMath> i ideš ka{" "}
            <InlineMath>{"a_n"}</InlineMath>. Pitanje je samo: koliko puta
            dodaješ isti korak <InlineMath>{"d"}</InlineMath>? Odgovor je:{" "}
            <InlineMath>{"n-1"}</InlineMath> puta.
          </p>
        </InsightCard>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Primer 1">
            <p>
              Ako je <InlineMath>{"a_1=5"}</InlineMath> i{" "}
              <InlineMath>{"d=3"}</InlineMath>, nađi{" "}
              <InlineMath>{"a_8"}</InlineMath>.
            </p>
            <MathBlock>{"a_8=5+(8-1)\\cdot 3=5+21=26."}</MathBlock>
            <p>Ne pišeš svih osam članova. Odmah ideš na formulu.</p>
          </SectionCard>
          <SectionCard title="Primer 2">
            <p>
              Ako je <InlineMath>{"a_1=12"}</InlineMath> i{" "}
              <InlineMath>{"d=-2"}</InlineMath>, nađi{" "}
              <InlineMath>{"a_{10}"}</InlineMath>.
            </p>
            <MathBlock>{"a_{10}=12+(10-1)(-2)=12-18=-6."}</MathBlock>
            <p>Negativna razlika znači da se svaki sledeći član smanjuje.</p>
          </SectionCard>
          <SectionCard title="Kad znaš dva člana">
            <p>
              Ako su poznati <InlineMath>{"a_p"}</InlineMath> i{" "}
              <InlineMath>{"a_q"}</InlineMath>, pišeš:
            </p>
            <MathBlock>
              {"a_p=a_1+(p-1)d, \\qquad a_q=a_1+(q-1)d."}
            </MathBlock>
            <p>
              To odmah daje linearni sistem za{" "}
              <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: u nizu je a₁ = −3 i d = 4. Koliko je a₇?"
          answer={
            <>
              <p>
                Primeni formulu{" "}
                <InlineMath>{"a_n=a_1+(n-1)d"}</InlineMath>:
              </p>
              <MathBlock>{"a_7=-3+(7-1)\\cdot 4=-3+24=21."}</MathBlock>
              <p>
                Greška koju učenici često prave je da napišu{" "}
                <InlineMath>{"-3+7\\cdot 4"}</InlineMath>, ali to bi značilo da
                si napravio sedam skokova umesto šest.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ SUMA PRVIH n ČLANOVA ═══════════ */}
      <LessonSection
        id="suma"
        eyebrow="Druga velika formula"
        title="Suma prvih n članova: ne sabiraš ručno, nego pametno"
        description="Kada u zadatku traže zbir više uzastopnih članova, poenta nije da ih sve izračunaš pojedinačno. Aritmetički niz ima simetriju: prvi i poslednji, drugi i pretposlednji daju isti zbir. Iz te ideje nastaje formula za Sₙ."
      >
        <div className={s.grid2}>
          <SectionCard title="Gaussov trik u nizu">
            <MathBlock>{"S_n=a_1+a_2+\\cdots+a_n"}</MathBlock>
            <MathBlock>{"S_n=a_n+a_{n-1}+\\cdots+a_1"}</MathBlock>
            <MathBlock>
              {
                "2S_n=(a_1+a_n)+(a_2+a_{n-1})+\\cdots+(a_n+a_1)"
              }
            </MathBlock>
            <p>
              Svaki par daje isti zbir{" "}
              <InlineMath>{"a_1+a_n"}</InlineMath>, a takvih parova ima{" "}
              <InlineMath>{"n"}</InlineMath>. Zato:
            </p>
            <MathBlock>{"2S_n=n(a_1+a_n)"}</MathBlock>
            <MathBlock>{"S_n=\\frac{n(a_1+a_n)}{2}."}</MathBlock>
          </SectionCard>

          <SectionCard title="Kada poslednji član nije poznat">
            <p>
              Ako ne znaš <InlineMath>{"a_n"}</InlineMath>, zameni ga preko
              opšteg člana:
            </p>
            <MathBlock>{"a_n=a_1+(n-1)d."}</MathBlock>
            <MathBlock>
              {"S_n=\\frac{n}{2}\\left(a_1+a_1+(n-1)d\\right)."}
            </MathBlock>
            <MathBlock>
              {"S_n=\\frac{n}{2}\\left(2a_1+(n-1)d\\right)."}
            </MathBlock>
            <p>
              Ova forma je odlična kada su dati{" "}
              <InlineMath>{"a_1"}</InlineMath>, <InlineMath>{"d"}</InlineMath> i{" "}
              <InlineMath>{"n"}</InlineMath>, a poslednji član ne želiš posebno
              da računaš.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 18 }}>
          <SectionCard title="Primer 1">
            <p>
              Nađi <InlineMath>{"S_{12}"}</InlineMath> za{" "}
              <InlineMath>{"a_1=4"}</InlineMath>,{" "}
              <InlineMath>{"d=3"}</InlineMath>.
            </p>
            <MathBlock>{"a_{12}=4+11\\cdot 3=37"}</MathBlock>
            <MathBlock>
              {"S_{12}=\\frac{12(4+37)}{2}=6\\cdot 41=246."}
            </MathBlock>
          </SectionCard>
          <SectionCard title="Opadajući niz">
            <p>
              Za <InlineMath>{"a_1=20"}</InlineMath>,{" "}
              <InlineMath>{"d=-2"}</InlineMath>,{" "}
              <InlineMath>{"n=8"}</InlineMath>:
            </p>
            <MathBlock>
              {
                "S_8=\\frac{8}{2}\\left(2\\cdot 20+7\\cdot (-2)\\right)=4(40-14)=104."
              }
            </MathBlock>
            <p>
              I kod opadajućih nizova ista formula radi bez ikakve izmene.
            </p>
          </SectionCard>
          <SectionCard title="Zbir je broj parova puta zbir jednog para">
            <p>
              Ako zapamtiš samo ideju, formulu možeš i sam da rekonstruišeš. To
              je sigurnije nego slepo pamćenje.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koji oblik sume je najbrži kada znaš a₁ = 7, d = 5, n = 20?"
          answer={
            <>
              <p>
                Najprirodnije je koristiti oblik sa{" "}
                <InlineMath>{"a_1"}</InlineMath>,{" "}
                <InlineMath>{"d"}</InlineMath> i{" "}
                <InlineMath>{"n"}</InlineMath>:
              </p>
              <MathBlock>
                {"S_{20}=\\frac{20}{2}\\left(2\\cdot 7+19\\cdot 5\\right)."}
              </MathBlock>
              <p>
                Naravno, možeš prvo naći{" "}
                <InlineMath>{"a_{20}"}</InlineMath>, ali to je jedan nepotreban
                korak više. Na prijemnom uvek traži kraći put.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ SREDNJI ČLAN I SISTEMI ═══════════ */}
      <LessonSection
        id="srednji-clan"
        eyebrow="Ključ za tekstualne zadatke"
        title="Srednji član, aritmetičke sredine i sistemi uslova"
        description="Mnogi zadaci na prijemnom nisu direktni. Ne pitaju te samo da izračunaš aₙ, nego da iz uslova pronađeš parametre niza ili nepoznate brojeve koji čine aritmetički niz. Tada je svojstvo srednjeg člana jedno od najjačih oruđa."
      >
        <div className={s.grid2}>
          <SectionCard title="Susedi su simetrični oko sredine">
            <p>
              Za svako <InlineMath>{"k"}</InlineMath> za koje postoje susedi
              važi:
            </p>
            <MathBlock>{"a_k=\\frac{a_{k-1}+a_{k+1}}{2}"}</MathBlock>
            <MathBlock>{"2a_k=a_{k-1}+a_{k+1}."}</MathBlock>
            <p>
              To znači da je srednji član aritmetička sredina susednih članova.
              Nije slučajno što se baš tako zove.
            </p>
          </SectionCard>
          <SectionCard title="Najpraktičniji zapis za tri broja u progresiji">
            <p>
              Ako tri broja čine aritmetički niz, najpametnije ih pišeš kao:
            </p>
            <MathBlock>{"x-d,\\quad x,\\quad x+d."}</MathBlock>
            <p>
              Tada je srednji broj odmah <InlineMath>{"x"}</InlineMath>, a cela
              priča se svodi na dve nepoznate umesto tri.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Ubacivanje sredina">
            <p>
              Ako između <InlineMath>{"A"}</InlineMath> i{" "}
              <InlineMath>{"B"}</InlineMath> ubacuješ{" "}
              <InlineMath>{"m"}</InlineMath> aritmetičkih sredina, onda dobijaš
              niz od ukupno <InlineMath>{"m+2"}</InlineMath> članova. Razlika
              je:
            </p>
            <MathBlock>{"d=\\frac{B-A}{m+1}."}</MathBlock>
            <p>
              Posle toga redom dodaješ <InlineMath>{"d"}</InlineMath> i dobijaš
              sve umetnute članove.
            </p>
          </SectionCard>
          <SectionCard title="Sistemi uslova">
            <p>
              Ako znaš dva različita člana, ili zbir nekih članova i još jednu
              relaciju, pišeš jednačine preko{" "}
              <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>. To su obično linearne jednačine,
              pa ih rešavaš metodom sabiranja ili oduzimanja.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Da li su 7, x, 19 u aritmetičkom nizu?">
            <MathBlock>{"x=\\frac{7+19}{2}=13."}</MathBlock>
            <p>
              Dakle, jedino <InlineMath>{"x=13"}</InlineMath> daje aritmetički
              niz <InlineMath>{"7,13,19"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Ubaci tri aritmetičke sredine između 5 i 21">
            <MathBlock>{"d=\\frac{21-5}{3+1}=4."}</MathBlock>
            <p>
              Dobijeni niz je <InlineMath>{"5,9,13,17,21"}</InlineMath>, pa su
              umetnute sredine <InlineMath>{"9,13,17"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto su brojevi x−4, x, x+4 uvek u aritmetičkom nizu?"
          answer={
            <>
              <p>
                Razlika između drugog i prvog broja je{" "}
                <InlineMath>{"x-(x-4)=4"}</InlineMath>, a razlika između trećeg
                i drugog je <InlineMath>{"(x+4)-x=4"}</InlineMath>.
              </p>
              <p>
                Pošto su razlike jednake, brojevi su uvek u aritmetičkom nizu.
                Ovaj zapis je zato veoma zgodan u zadacima.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivna laboratorija"
        title="Pomeri parametre i vidi niz kao pravu"
        description="U ovoj laboratoriji menjaš prvi član a₁, razliku d, broj posmatranih članova i fokusirani indeks. Canvas prikazuje tačke (k, aₖ). Kada menjaš d, menja se nagib prave. Kada pomeraš fokusirani član, vidiš da je srednji član aritmetička sredina suseda."
      >
        <ProgressionLab />

        <InsightCard title="Kako da koristiš ovaj laboratorijum">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa nagibom i položajem
            tačaka, pa tek onda pomeri klizač. Ako vidiš da sve tačke padaju na
            jednu pravu, to nije slučajnost &mdash; to je posledica stalne
            razlike.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Kako se rešavaju tipični zadaci korak po korak"
        description="Ovde je cilj da vidiš obrazac razmišljanja, ne samo finalan broj. Obrati pažnju na to kada direktno koristiš formulu, a kada prvo moraš da pronađeš a₁ i d."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Nađi <InlineMath>{"a_{15}"}</InlineMath> i{" "}
              <InlineMath>{"S_{15}"}</InlineMath> ako je{" "}
              <InlineMath>{"a_1=4"}</InlineMath>,{" "}
              <InlineMath>{"d=3"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Za opšti član koristi formulu.">
                <MathBlock>{"a_n=a_1+(n-1)d"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Uvrsti <InlineMath>{"n=15"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"a_{15}=4+14\\cdot 3=46."}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Za sumu koristi najlakši oblik.">
                <MathBlock>
                  {
                    "S_{15}=\\frac{15(4+46)}{2}=\\frac{15\\cdot 50}{2}=375."
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12, color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              Pouka: kada možeš brzo do poslednjeg člana, formula{" "}
              <InlineMath>{"\\frac{n(a_1+a_n)}{2}"}</InlineMath> je veoma
              pregledna.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Poznato je <InlineMath>{"a_4=14"}</InlineMath> i{" "}
              <InlineMath>{"a_{10}=32"}</InlineMath>. Odredi{" "}
              <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Napiši oba uslova.">
                <MathBlock>
                  {"a_4=a_1+3d=14, \\qquad a_{10}=a_1+9d=32."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Oduzmi jednačine.">
                <MathBlock>{"6d=18, \\quad d=3."}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Vrati u prvu jednačinu.">
                <MathBlock>{"a_1+9=14, \\quad a_1=5."}</MathBlock>
              </WalkStep>
            </div>
            <p style={{ marginTop: 12, color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              Pouka: kada znaš dva člana, razlika indeksa odmah govori koliko si
              puta dodao <InlineMath>{"d"}</InlineMath>.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Odredi <InlineMath>{"x"}</InlineMath> tako da{" "}
              <InlineMath>{"x+1"}</InlineMath>,{" "}
              <InlineMath>{"2x-3"}</InlineMath>,{" "}
              <InlineMath>{"3x-7"}</InlineMath> budu u aritmetičkom nizu
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Srednji član je aritmetička sredina krajnjih."
              >
                <MathBlock>{"2(2x-3)=(x+1)+(3x-7)."}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Sredi jednačinu.">
                <MathBlock>{"4x-6=4x-6."}</MathBlock>
              </WalkStep>
            </div>
            <p>
              Dobijaš identitet, što znači da je uslov ispunjen za svako realno{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
            <MathBlock>{"(2x-3)-(x+1)=x-4"}</MathBlock>
            <MathBlock>{"(3x-7)-(2x-3)=x-4."}</MathBlock>
            <p style={{ marginTop: 12, color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              Pouka: ponekad zadatak krije opšti obrazac, a ne jednu konkretnu
              vrednost.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Ako je <InlineMath>{"S_5=45"}</InlineMath> i{" "}
              <InlineMath>{"a_5=13"}</InlineMath>, odredi niz
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Koristi formulu za sumu.">
                <MathBlock>
                  {"S_5=\\frac{5(a_1+a_5)}{2}=45."}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Ubaci poznati peti član.">
                <p>
                  Pošto je <InlineMath>{"a_5=13"}</InlineMath>, sledi{" "}
                  <InlineMath>
                    {"\\frac{5(a_1+13)}{2}=45"}
                  </InlineMath>
                  , pa je <InlineMath>{"a_1+13=18"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"a_1=5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Nađi razliku iz opšteg člana.">
                <MathBlock>{"a_5=a_1+4d=13."}</MathBlock>
                <p>
                  Dobijaš <InlineMath>{"5+4d=13"}</InlineMath>, pa je{" "}
                  <InlineMath>{"d=2"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
            <MathBlock>{"a_1=5,\\qquad d=2,\\qquad a_n=5+2(n-1)."}</MathBlock>
            <p style={{ marginTop: 12, color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              Pouka: u zadatku često kombinuješ formulu za član i formulu za
              sumu.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Pregled za ponavljanje"
        title="Ključne formule i obrasci"
        description="Ovo je zbir onoga što treba da znaš da prizoveš pod pritiskom ispita. Ali ove formule vrede samo ako umeš da prepoznaš kada koja treba da se upotrebi."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Stalna razlika"
            formula="a_{n+1}-a_n=d."
            note="Ovo je najčistija definicija aritmetičkog niza."
          />
          <FormulaCard
            title="Opšti član"
            formula="a_n=a_1+(n-1)d."
            note="Koristi kada znaš a₁, d i indeks traženog člana."
          />
          <FormulaCard
            title="Suma (kada znaš poslednji član)"
            formula={"S_n=\\frac{n(a_1+a_n)}{2}."}
            note="Najpregledniji oblik kada je poslednji član poznat ili se lako dobija."
          />
          <FormulaCard
            title="Suma (preko d)"
            formula={"S_n=\\frac{n}{2}\\left(2a_1+(n-1)d\\right)."}
            note="Odličan oblik za direktno računanje iz početnih podataka."
          />
          <FormulaCard
            title="Srednji član"
            formula={"a_k=\\frac{a_{k-1}+a_{k+1}}{2}."}
            note="Koristi za tri uzastopna člana i u zadacima sa aritmetičkim sredinama."
          />
          <FormulaCard
            title="Ubacivanje sredina"
            formula={"d=\\frac{B-A}{m+1}."}
            note="Kada između A i B umećeš m članova. Posle toga samo dodaješ d redom."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Na šta da paziš"
        title="Česte greške učenika"
        description="Ove greške nisu slučajne. Nastaju kada učenik mehanički pamti formule, a ne vidi obrazac. Ako ih prepoznaš na vreme, napravićeš veliki pomak u sigurnosti rada."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              <InlineMath>{"a_n=a_1+nd"}</InlineMath> umesto{" "}
              <InlineMath>{"a_1+(n-1)d"}</InlineMath>
            </h3>
            <p>
              Ovo je najčešća greška. Lek: proveri formulu za{" "}
              <InlineMath>{"n=1"}</InlineMath>. Ako ne dobiješ{" "}
              <InlineMath>{"a_1"}</InlineMath>, formula nije dobra.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje negativne razlike sa apsolutnom vrednošću
            </h3>
            <p>
              Ako je <InlineMath>{"d=-3"}</InlineMath>, svaki sledeći član
              dobijaš dodavanjem <InlineMath>{"-3"}</InlineMath>, a ne
              dodavanjem <InlineMath>{"3"}</InlineMath>. Ne popravljaj znak na
              silu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešan zapis tri broja u progresiji
            </h3>
            <p>
              U nekim zadacima je bolje pisati{" "}
              <InlineMath>{"x-d, x, x+d"}</InlineMath>, jer srednji član odmah
              postaje aritmetička sredina.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Računanje sume ručno i kad nije potrebno
            </h3>
            <p>
              Ako niz ima mnogo članova, ručno sabiranje je poziv na grešku.
              Suma postoji baš zato da skrati posao.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ne čitanje indeksa pažljivo</h3>
            <p>
              Razlika između <InlineMath>{"a_4"}</InlineMath> i{" "}
              <InlineMath>{"a_{10}"}</InlineMath> nije{" "}
              <InlineMath>{"10-4=5"}</InlineMath> skokova, nego{" "}
              <InlineMath>{"6"}</InlineMath>. Uvek računaj broj prelaza između
              indeksa.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljanje da zbir može dati dodatnu jednačinu
            </h3>
            <p>
              Ako zadatak daje <InlineMath>{"S_n"}</InlineMath>, to nije
              sporedan podatak. Često je baš on druga jednačina koja ti
              nedostaje za sistem.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Ispitna strategija"
        title="Veza sa prijemnim zadacima"
        description="Na prijemnom se aritmetički niz retko javlja kao potpuno izdvojena tema. Češće je upakovan u priču, sistem uslova ili kombinovan sa drugim oblastima. Zato je važnije da znaš kako da prepoznaš obrazac nego da odmah trčiš na račun."
      >
        <div className={s.grid2}>
          <SectionCard title="Direktni račun člana ili sume">
            <p>
              Ovde je posao jednostavan: prepoznaj šta je dato među{" "}
              <InlineMath>{"a_1"}</InlineMath>, <InlineMath>{"d"}</InlineMath>,{" "}
              <InlineMath>{"n"}</InlineMath>, <InlineMath>{"a_n"}</InlineMath>,{" "}
              <InlineMath>{"S_n"}</InlineMath> i izaberi najkraću formulu.
            </p>
          </SectionCard>
          <SectionCard title="Dva ili više uslova o različitim članovima">
            <p>
              To su zadaci za sistem: napiši svaki uslov preko{" "}
              <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>, pa rešavaj linearno bez
              improvizacije.
            </p>
          </SectionCard>
          <SectionCard title="Tri broja u progresiji">
            <p>
              Često se ovo javlja maskirano kroz brojeve, parametre ili čak
              korene neke jednačine. Odmah se seti zapisa{" "}
              <InlineMath>{"x-d, x, x+d"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Ubacivanje sredina">
            <p>
              Prebroj koliko ukupno članova dobijaš. To određuje koliko puta
              razliku dodaješ od prvog do poslednjeg broja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni kontrolni spisak">
          <p>
            1. Šta je poznato: <InlineMath>{"a_1"}</InlineMath>,{" "}
            <InlineMath>{"d"}</InlineMath>, <InlineMath>{"n"}</InlineMath>,{" "}
            <InlineMath>{"a_n"}</InlineMath>, <InlineMath>{"S_n"}</InlineMath>?
            <br />
            2. Da li je zadatak direktan ili traži sistem?
            <br />
            3. Ako su tri broja u nizu, da li je najpametniji zapis{" "}
            <InlineMath>{"x-d, x, x+d"}</InlineMath>?
            <br />
            4. Da li brža formula koristi <InlineMath>{"a_n"}</InlineMath> ili
            izraz preko <InlineMath>{"d"}</InlineMath>?
            <br />
            5. Jesi li proverio znak razlike i broj skokova?
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežba"
        title="Zadaci za samostalni rad"
        description="Reši prvo bez gledanja rešenja. Tek kada zaista zapneš, otvori rešenje. Tako najviše dobijaš od lekcije."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Za <InlineMath>{"a_1=4"}</InlineMath> i{" "}
                <InlineMath>{"d=3"}</InlineMath> izračunaj{" "}
                <InlineMath>{"a_{12}"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"a_{12}=4+(12-1)\\cdot 3=4+33=37."}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Poznato je <InlineMath>{"a_5=17"}</InlineMath> i{" "}
                <InlineMath>{"a_{12}=38"}</InlineMath>. Nađi{" "}
                <InlineMath>{"a_1"}</InlineMath> i{" "}
                <InlineMath>{"d"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Pišemo sistem:</p>
                <MathBlock>{"a_1+4d=17"}</MathBlock>
                <MathBlock>{"a_1+11d=38"}</MathBlock>
                <p>
                  Oduzimanjem dobijamo <InlineMath>{"7d=21"}</InlineMath>, pa je{" "}
                  <InlineMath>{"d=3"}</InlineMath>. Zatim je{" "}
                  <InlineMath>{"a_1=17-12=5"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Ubaci pet aritmetičkih sredina između{" "}
                <InlineMath>{"6"}</InlineMath> i{" "}
                <InlineMath>{"30"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Pošto umećeš <InlineMath>{"5"}</InlineMath> sredina, imaš
                  ukupno <InlineMath>{"7"}</InlineMath> članova, odnosno{" "}
                  <InlineMath>{"6"}</InlineMath> skokova.
                </p>
                <MathBlock>{"d=\\frac{30-6}{5+1}=4."}</MathBlock>
                <p>
                  Niz je <InlineMath>{"6,10,14,18,22,26,30"}</InlineMath>, pa
                  su umetnute sredine <InlineMath>{"10,14,18,22,26"}</InlineMath>
                  .
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Odredi <InlineMath>{"x"}</InlineMath> tako da brojevi{" "}
                <InlineMath>{"x+1"}</InlineMath>,{" "}
                <InlineMath>{"2x-3"}</InlineMath>,{" "}
                <InlineMath>{"3x-9"}</InlineMath> budu uzastopni članovi
                aritmetičkog niza.
              </p>
            }
            solution={
              <>
                <p>Koristi srednji član:</p>
                <MathBlock>{"2(2x-3)=(x+1)+(3x-9)."}</MathBlock>
                <p>
                  Sredi: <InlineMath>{"4x-6=4x-8"}</InlineMath>, što je
                  nemoguće. Dakle, takvo <InlineMath>{"x"}</InlineMath> ne
                  postoji.
                </p>
                <p>
                  Brza provera preko razlika takođe daje neusaglašene rezultate:{" "}
                  <InlineMath>{"x-4"}</InlineMath> i{" "}
                  <InlineMath>{"x-6"}</InlineMath>.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Za niz sa <InlineMath>{"a_1=3"}</InlineMath> i{" "}
                <InlineMath>{"d=2"}</InlineMath> odredi{" "}
                <InlineMath>{"n"}</InlineMath> ako je{" "}
                <InlineMath>{"S_n=80"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristi formulu za sumu:</p>
                <MathBlock>
                  {
                    "80=\\frac{n}{2}\\left(2\\cdot 3+(n-1)\\cdot 2\\right)"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "80=\\frac{n}{2}(6+2n-2)=\\frac{n}{2}(2n+4)=n(n+2)."
                  }
                </MathBlock>
                <p>
                  Dobijamo jednačinu{" "}
                  <InlineMath>{"n^2+2n-80=0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(n-8)(n+10)=0"}</InlineMath>.
                </p>
                <p>
                  Pošto je <InlineMath>{"n"}</InlineMath> prirodan broj, sledi{" "}
                  <InlineMath>{"n=8"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključni uvid"
        title="Aritmetički niz je linearna priča obučena u niz brojeva"
        description="Kada vidiš aritmetički niz, nemoj razmišljati o nasumično poređanim članovima. Razmišljaj o jednoj pravoj: svaki sledeći član dolazi istim pomakom. Zbog toga su i opšti član, i suma, i srednji član logične posledice jedne iste ideje."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Prvo nađi } a_1 \\text{ i } d,\\ \\text{zatim primeni pravu formulu, pa tek onda vrati rezultat.}"
            }
          </MathBlock>
          <p>
            Ko preskoči prvi korak, obično pomešava indekse ili otkuca pogrešan
            znak razlike. Ko ga odradi mirno, dobija najbrži put kroz zadatak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Na kraju lekcije"
        title="Završni rezime"
        description="Ako možeš da izgovoriš sledeće tačke bez gledanja u formulu, onda si lekciju zaista usvojio."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Definicija</h3>
            <p>
              Aritmetički niz ima stalnu razliku{" "}
              <InlineMath>{"d"}</InlineMath> između svakih susednih članova.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Opšti član</h3>
            <p>
              <InlineMath>{"a_n=a_1+(n-1)d"}</InlineMath>, jer od prvog do{" "}
              <InlineMath>{"n"}</InlineMath>-tog člana praviš{" "}
              <InlineMath>{"n-1"}</InlineMath> skokova.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Suma</h3>
            <p>
              <InlineMath>{"S_n=\\frac{n(a_1+a_n)}{2}"}</InlineMath> ili{" "}
              <InlineMath>
                {"\\frac{n}{2}(2a_1+(n-1)d)"}
              </InlineMath>
              , zavisno od datih podataka.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Srednji član</h3>
            <p>
              Srednji član je aritmetička sredina suseda:{" "}
              <InlineMath>{"2a_k=a_{k-1}+a_{k+1}"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Prijemni strategija</h3>
            <p>
              Iz tekstualnih uslova pravi sistem za{" "}
              <InlineMath>{"a_1"}</InlineMath> i{" "}
              <InlineMath>{"d"}</InlineMath>, umesto da nagađaš članove.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Posle ovog gradiva prirodno dolaze geometrijski niz i beskonačni
              geometrijski red, gde se menja ista ideja obrasca, ali sa
              količnikom umesto razlike.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 55 pokriva aritmetički niz od definicije do ispitnih strategija:
          opšti član, sumu, srednji član i sisteme uslova.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
