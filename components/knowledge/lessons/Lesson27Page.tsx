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
import SubstitutionLab from "./SubstitutionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#pojam", label: "Pojam i ideja" },
  { href: "#metode", label: "Tri metode" },
  { href: "#obrasci", label: "Ključni obrasci" },
  { href: "#interaktivni", label: "Interaktivni lab" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson27Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 27"
        title={
          <>
            Eksponencijalne{" "}
            <span className={cs.tHeroAccent}>jednačine</span>
          </>
        }
        description="Kod ove lekcije najvažnije je da prestaneš da gledaš jednačinu kao gomilu brojeva i da počneš da tražiš obrazac. Nekad treba samo da prepoznaš istu osnovu, nekad da izdvojiš zajednički faktor, a nekad da uvedeš smenu u=a^x i ceo zadatak pretvoriš u kvadratnu jednačinu. Kada jednom savladaš tu logiku, veliki broj prijemnih zadataka postaje rutinski i pregledan."
        heroImageSrc="/api/lessons/27/hero"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o eksponencijalnim jednačinama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da brzo odrediš koja metoda rešavanja uopšte dolazi u obzir. Prvi pogled na zadatak mora da otkrije odnos između baza i oblik eksponenata.",
          },
          {
            label: "Najveća zamka",
            description:
              "Negativan koren posle smene u=a^x ne sme da ostane u igri. Pošto je a^x > 0, svaki kandidat u \u2264 0 automatski otpada.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa bazama 2, 4, 8 i 3, 9, 27 najčešće traže samo dobru promenu oblika. Kada baze povežeš na vreme, izbegavaš nepotrebne logaritme.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "80 do 100 minuta. Vredi proći polako, jer se isti obrasci kasnije pojavljuju u nejednačinama i logaritmima.",
          },
          {
            label: "Predznanje",
            description:
              "Stepeni, faktorisanje i kvadratne jednačine. Posebno su važni zapisi a^{x+k}=a^x\u00B7a^k i (a^x)^2=a^{2x}.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznavanje obrasca. Na ispitu ne pobeđuje duži račun, nego brže uočavanje odgovarajuće transformacije.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija smene. Vizuelno vidiš zašto su samo pozitivne vrednosti promenljive u=a^x dozvoljene.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Eksponencijalna jednačina je često maskirana poznata jednačina"
        description="Najveći pomak dolazi kada shvatiš da se iza eksponencijalnog zapisa često krije obična linearna ili kvadratna jednačina, samo u drugoj promenljivoj."
      >
        <div className={s.grid2}>
          <SectionCard title="Ne rešavaš novu vrstu matematike od nule">
            <p>
              Rešavaš već poznate obrasce, ali tek pošto pravilno preurediš
              izraz. Zbog toga je ova lekcija odličan test zrelosti u algebri: ne
              proverava samo račun, već i sposobnost da vidiš strukturu.
            </p>
            <ul>
              <li>
                Baze 2, 4 i 8 se skoro uvek mogu prevesti na osnovu 2.
              </li>
              <li>
                Oblik <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath> obično poziva na smenu{" "}
                <InlineMath>{"u=a^x"}</InlineMath>.
              </li>
              <li>
                Ako se više članova razlikuje samo za faktor{" "}
                <InlineMath>{"a^k"}</InlineMath>, često pomaže izdvajanje.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Na ispitu se najčešće proverava brzina prepoznavanja">
            <p>
              Zadatak iz ove oblasti često izgleda &ldquo;strašnije&rdquo; nego
              što jeste. Onaj ko na vreme prepozna oblik rešava ga kratko; onaj
              ko krene nasumice lako upadne u nepotrebne račune i izgubi vreme.
            </p>
            <MathBlock>
              {
                "4^x - 5 \\cdot 2^x + 4 = 0 \\quad\\Longrightarrow\\quad (2^x)^2 - 5\\cdot 2^x + 4 = 0"
              }
            </MathBlock>
            <p>Jedna dobra promena oblika često je cela poenta zadatka.</p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako vidiš 4^x i 2^x, da li su to dve nepovezane stvari?"
          answer={
            <>
              <p>
                Nisu. Pošto je <InlineMath>{"4=2^2"}</InlineMath>, važi:
              </p>
              <MathBlock>{"4^x = (2^2)^x = 2^{2x} = (2^x)^2"}</MathBlock>
              <p>
                To je upravo signal da možeš da uvedeš smenu{" "}
                <InlineMath>{"u=2^x"}</InlineMath>. Ovakva veza između baza je
                jedan od najvažnijih refleksa za prijemni.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ POJAM I INTUICIJA ═══════════ */}
      <LessonSection
        id="pojam"
        eyebrow="Pojam i intuicija"
        title="Šta je eksponencijalna jednačina i kako joj prići"
        description="Eksponencijalna jednačina je jednačina u kojoj se nepoznata nalazi u eksponentu. Zato standardni potezi iz linearnih i kvadratnih jednačina ne rade direktno, dok ne dovedeš izraz u pogodniji oblik."
      >
        <div className={s.grid2}>
          <SectionCard title="Nepoznata je u eksponentu">
            <p>Tipični oblici su:</p>
            <MathBlock>
              {
                "a^{f(x)} = b,\\qquad a^{f(x)} = a^{g(x)},\\qquad A\\cdot a^{2x} + B\\cdot a^x + C = 0"
              }
            </MathBlock>
            <p>
              Važno je da baza zadovoljava uslove{" "}
              <InlineMath>{"a>0"}</InlineMath> i{" "}
              <InlineMath>{"a\\neq 1"}</InlineMath>. Tada je funkcija{" "}
              <InlineMath>{"a^x"}</InlineMath> strogo monotona, pa je poređenje
              eksponenata dozvoljeno kad uspeš da napišeš obe strane sa istom
              osnovom.
            </p>
          </SectionCard>

          <SectionCard title="Tri pitanja koja postavljaš pre računanja">
            <ul>
              <li>
                Može li sve da se napiše preko jedne iste osnove?
              </li>
              <li>
                Postoji li zajednički faktor <InlineMath>{"a^x"}</InlineMath>,{" "}
                <InlineMath>{"a^{x-1}"}</InlineMath> ili sličan?
              </li>
              <li>
                Da li se pojavljuju članovi tipa{" "}
                <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, pa je pogodna smena{" "}
                <InlineMath>{"u=a^x"}</InlineMath>?
              </li>
            </ul>
            <p>
              Drugim rečima: ne traži odmah rešenje za{" "}
              <InlineMath>{"x"}</InlineMath>, nego prvo traži{" "}
              <strong>oblik</strong>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kada je legitimno da iz a^{f(x)} = a^{g(x)} zaključiš f(x)=g(x)?"
          answer={
            <>
              <p>
                Tek kada važi <InlineMath>{"a>0"}</InlineMath> i{" "}
                <InlineMath>{"a\\neq 1"}</InlineMath>.
              </p>
              <p>
                Tada je funkcija <InlineMath>{"y=a^x"}</InlineMath> strogo
                monotona, pa jednake vrednosti nastaju samo za jednake
                eksponente. Bez tog uslova zaključak nije opravdan.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ TRI METODE ═══════════ */}
      <LessonSection
        id="metode"
        eyebrow="Glavni nastavni deo"
        title="Tri standardne metode rešavanja"
        description="Ovo su tri obrasca koja treba da postanu automatska. Svaki ima svoj okidač: ista baza, isti faktor ili kvadratni oblik po a^x."
      >
        <div className={s.grid3}>
          <SectionCard title="Metoda 1: Svođenje na istu osnovu">
            <p>
              Ako obe strane mogu da se napišu sa istom osnovom, zadatak se
              svodi na jednačinu eksponenata. Ovo je najčistiji i najbrži
              slučaj.
            </p>
            <MathBlock>
              {"a^{f(x)} = a^{g(x)} \\Rightarrow f(x)=g(x)"}
            </MathBlock>
            <p>Mini-primer:</p>
            <MathBlock>
              {"3^{2x-1}=27=3^3 \\Rightarrow 2x-1=3 \\Rightarrow x=2"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Metoda 2: Izdvajanje zajedničkog faktora">
            <p>
              Kada više članova sadrži <InlineMath>{"a^x"}</InlineMath>, često je
              najlakše da ga izdvojiš. Ključno je da pravilno rastaviš članove
              tipa <InlineMath>{"a^{x+1}"}</InlineMath>,{" "}
              <InlineMath>{"a^{x-2}"}</InlineMath> i slično.
            </p>
            <MathBlock>{"a^{x+k}=a^x\\cdot a^k"}</MathBlock>
            <p>Mini-primer:</p>
            <MathBlock>
              {
                "2^{x+1}+2^x=12 \\Rightarrow 2\\cdot 2^x + 2^x = 12 \\Rightarrow 3\\cdot 2^x = 12 \\Rightarrow 2^x = 4 \\Rightarrow x = 2"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Metoda 3: Smena u=a^x">
            <p>
              Kada prepoznaš kvadratni obrazac po{" "}
              <InlineMath>{"a^x"}</InlineMath>, uvedi novu promenljivu. Ovo je
              najčešća prijemna tehnika iz ove lekcije i najčešće mesto za
              grešku.
            </p>
            <MathBlock>
              {"A\\cdot a^{2x}+B\\cdot a^x + C = 0,\\qquad u=a^x>0"}
            </MathBlock>
            <p>
              Posle rešavanja kvadratne jednačine po{" "}
              <InlineMath>{"u"}</InlineMath>, zadržavaš samo pozitivne vrednosti
              jer je <InlineMath>{"a^x"}</InlineMath> uvek strogo pozitivno.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto u smeni u=a^x nikada ne prihvataš u=0 ili u<0?"
          answer={
            <>
              <p>
                Zato što za svako realno <InlineMath>{"x"}</InlineMath> i svaku
                dozvoljenu bazu <InlineMath>{"a>0"}</InlineMath> važi{" "}
                <InlineMath>{"a^x>0"}</InlineMath>. Eksponencijalna funkcija
                nikada ne daje nulu niti negativan broj.
              </p>
              <MathBlock>{"u=a^x \\Rightarrow u \\in (0,\\infty)"}</MathBlock>
              <p>
                Zato negativan koren kvadratne jednačine po{" "}
                <InlineMath>{"u"}</InlineMath> nije rešenje originalnog
                eksponencijalnog zadatka.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule"
        title="Obrasci koje treba da vidiš na prvi pogled"
        description="Ove transformacije nisu ukras. One su alat pomoću kog eksponencijalnu jednačinu prevodiš na poznat teren."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Povezivanje baza"
            formula="(a^m)^x=a^{mx}"
            note={
              <>
                Koristi se kada su baze povezane stepenom, na primer{" "}
                <InlineMath>{"4"}</InlineMath> i <InlineMath>{"2"}</InlineMath>,
                ili <InlineMath>{"9"}</InlineMath> i{" "}
                <InlineMath>{"3"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Razbijanje eksponenta"
            formula={"a^{m+n}=a^m\\cdot a^n"}
            note="Ovo je osnova za izdvajanje zajedničkog faktora."
          />
          <FormulaCard
            title="Kvadratni obrazac"
            formula="a^{2x}=(a^x)^2"
            note={
              <>
                Kada vidiš <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, proveri da li možeš da uvedeš
                smenu.
              </>
            }
          />
          <FormulaCard
            title="Najvažniji filter"
            formula="u=a^x>0"
            note={
              <>
                Zadržavaš samo pozitivne kandidate. Na primer, u jednačini{" "}
                <InlineMath>{"u^2-3u-4=0"}</InlineMath> rešenja su{" "}
                <InlineMath>{"u=4"}</InlineMath> i{" "}
                <InlineMath>{"u=-1"}</InlineMath>, ali zadržavaš samo{" "}
                <InlineMath>{"u=4"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Opasna pogrešna ideja">
            <p>Ne važe sabiranja koja liče na eksponente:</p>
            <MathBlock>
              {"2^{x+1}\\neq 2^x + 1,\\qquad a^{x+y}\\neq a^x + a^y"}
            </MathBlock>
            <p>
              Veliki broj grešaka nastaje kada učenik meša pravila za stepene sa
              pravilima za sabiranje. Eksponenti se sabiraju pri množenju istih
              osnova, a ne pri običnom sabiranju članova.
            </p>
          </SectionCard>

          <SectionCard title="Primeri povezanih baza">
            <MathBlock>{"4^x=(2^2)^x=2^{2x}"}</MathBlock>
            <MathBlock>{"3^{x+2}=3^x\\cdot 3^2=9\\cdot 3^x"}</MathBlock>
            <MathBlock>{"9^x=(3^2)^x=3^{2x}=(3^x)^2"}</MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto je 8^{x-1} zgodno prepisati kao 2^{3x-3}?"
          answer={
            <>
              <p>
                Zato što tada obe strane možeš da porediš preko iste osnove 2:
              </p>
              <MathBlock>{"8^{x-1}=(2^3)^{x-1}=2^{3x-3}"}</MathBlock>
              <p>
                Time eksponencijalni zadatak prelazi u običnu linearnu jednačinu
                po <InlineMath>{"x"}</InlineMath>.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija smene u=a^x"
        description="Ovaj lab namerno pravi kvadratnu jednačinu sa jednim dozvoljenim i jednim nedozvoljenim korenom. Cilj je da izgradiš refleks: posle smene uvek proveri uslov u>0."
      >
        <SubstitutionLab />

        <MicroCheck
          question="Mikro-provera: šta tačno znači crveni koren na grafiku?"
          answer={
            <>
              <p>
                To znači da kvadratna jednačina po{" "}
                <InlineMath>{"u"}</InlineMath> zaista ima taj koren, ali
                originalna eksponencijalna jednačina ga ne prihvata. Drugim
                rečima, to je <strong>kandidat</strong> iz pomoćne jednačine, a
                ne rešenje početnog zadatka.
              </p>
              <MathBlock>
                {
                  "u=-2 \\text{ rešava } u^2+u-2=0, \\quad \\text{ali ne može biti } u=a^x"
                }
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljni zadaci, korak po korak"
        description="Primeri su složeni tako da postepeno grade refleks: od čistog svođenja na istu osnovu, preko izdvajanja faktora, do najvažnije smene u=a^x."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Reši jednačinu{" "}
              <InlineMath>{"3^{2x-1}=27"}</InlineMath>
            </h3>
            <p>
              Ovo je najčistiji slučaj. Desna strana je običan broj, ali ga lako
              prepoznajemo kao stepen broja 3.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepiši desnu stranu preko iste osnove">
                <MathBlock>{"27 = 3^3"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Izjednači eksponente">
                <MathBlock>
                  {"3^{2x-1} = 3^3 \\Rightarrow 2x-1=3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši linearnu jednačinu">
                <MathBlock>{"2x=4 \\Rightarrow x=2"}</MathBlock>
                <p>
                  Čim si dobio istu osnovu, eksponencijalni deo zadatka je
                  praktično završen.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Reši jednačinu{" "}
              <InlineMath>{"4^x = 8^{x-1}"}</InlineMath>
            </h3>
            <p>
              Ovde nema odmah iste osnove, ali su baze povezane preko broja 2. To
              je dovoljan signal da sve prevedeš na osnovu 2.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prevedi obe strane na osnovu 2">
                <MathBlock>
                  {
                    "4^x=(2^2)^x=2^{2x},\\qquad 8^{x-1}=(2^3)^{x-1}=2^{3x-3}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Izjednači eksponente">
                <MathBlock>
                  {"2^{2x}=2^{3x-3} \\Rightarrow 2x=3x-3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Završi račun">
                <MathBlock>{"x=3"}</MathBlock>
                <p>
                  Ovo je tipičan prijemni zadatak: deluje komplikovanije nego što
                  jeste, ali suština je samo u promeni baze.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Reši jednačinu{" "}
              <InlineMath>{"2^{x+1}+2^x=12"}</InlineMath>
            </h3>
            <p>
              Dva člana sadrže isti eksponencijalni izraz. Zato prvo razdvoj{" "}
              <InlineMath>{"2^{x+1}"}</InlineMath> i izdvoji{" "}
              <InlineMath>{"2^x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Rastavi pomereni eksponent">
                <MathBlock>{"2^{x+1}=2\\cdot 2^x"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Izdvoji zajednički faktor">
                <MathBlock>
                  {
                    "2\\cdot 2^x + 2^x = 12 \\Rightarrow 3\\cdot 2^x = 12"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Vrati se na prost eksponencijalni oblik">
                <MathBlock>
                  {"2^x = 4 = 2^2 \\Rightarrow x=2"}
                </MathBlock>
                <p>
                  Greška koju ovde treba izbeći je zapis{" "}
                  <InlineMath>{"2^{x+1}=2^x+1"}</InlineMath>, jer to nije tačno.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Reši jednačinu{" "}
              <InlineMath>{"2^{2x}-3\\cdot 2^x-4=0"}</InlineMath>
            </h3>
            <p>
              Ovo je školski primer za smenu. Pojavljuju se članovi{" "}
              <InlineMath>{"2^{2x}"}</InlineMath> i{" "}
              <InlineMath>{"2^x"}</InlineMath>, pa je prirodno da uvedeš novu
              promenljivu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uvedi smenu">
                <MathBlock>
                  {"u=2^x,\\qquad u>0"}
                </MathBlock>
                <MathBlock>{"2^{2x}=(2^x)^2=u^2"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Reši kvadratnu jednačinu po u">
                <MathBlock>{"u^2-3u-4=0"}</MathBlock>
                <MathBlock>{"(u-4)(u+1)=0"}</MathBlock>
                <MathBlock>{"u_1=4,\\qquad u_2=-1"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Primeni uslov u>0">
                <MathBlock>
                  {"u=-1 \\text{ odbacujemo},\\qquad u=4"}
                </MathBlock>
                <p>
                  Negativan koren pripada pomoćnoj kvadratnoj jednačini, ali ne i
                  originalnoj eksponencijalnoj jednačini.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Vrati se na x">
                <MathBlock>
                  {"2^x=4=2^2 \\Rightarrow x=2"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Reši jednačinu{" "}
              <InlineMath>{"4^x-5\\cdot 2^x+4=0"}</InlineMath>
            </h3>
            <p>
              Ovde se smena ne vidi odmah dok ne prevedeš{" "}
              <InlineMath>{"4^x"}</InlineMath> na osnovu 2. To je tipično ispitno
              mesto za dobar refleks.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Prevedi <InlineMath>{"4^x"}</InlineMath> preko osnove 2
                  </>
                }
              >
                <MathBlock>
                  {"4^x=(2^2)^x=2^{2x}=(2^x)^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Uvedi smenu <InlineMath>{"u=2^x"}</InlineMath>
                  </>
                }
              >
                <MathBlock>{"u^2-5u+4=0"}</MathBlock>
                <MathBlock>{"(u-1)(u-4)=0"}</MathBlock>
                <MathBlock>{"u_1=1,\\qquad u_2=4"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Oba kandidata su dozvoljena jer su pozitivna">
                <MathBlock>
                  {"2^x=1 \\Rightarrow x=0,\\qquad 2^x=4 \\Rightarrow x=2"}
                </MathBlock>
                <p>
                  Ovaj primer pokazuje da posle smene nekad ostaje jedno, a nekad
                  dva rešenja. Filter je uvek isti:{" "}
                  <InlineMath>{"u>0"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Tipične zamke koje kvare inače lak zadatak"
        description="Sledeće greške nisu sitnice. One direktno vode do pogrešnog skupa rešenja ili nepotrebnog gubitka vremena."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešno razlaganje <InlineMath>{"a^{x+1}"}</InlineMath>
            </h3>
            <p>
              Zapis <InlineMath>{"2^{x+1}=2^x+1"}</InlineMath> je netačan.
              Pravilno je:
            </p>
            <MathBlock>{"2^{x+1}=2\\cdot 2^x"}</MathBlock>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Preskakanje veze između baza
            </h3>
            <p>
              Ako ne vidiš da je <InlineMath>{"9=3^2"}</InlineMath> ili{" "}
              <InlineMath>{"8=2^3"}</InlineMath>, propuštaš najkraći put do
              rešenja.
            </p>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zadržavanje negativnog <InlineMath>{"u"}</InlineMath>
            </h3>
            <p>
              Kod smene <InlineMath>{"u=a^x"}</InlineMath> negativan koren
              kvadratne jednačine automatski otpada. To je obavezna provera, ne
              opcija.
            </p>
          </article>

          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Rano posezanje za logaritmima</h3>
            <p>
              U velikom broju prijemnih zadataka logaritmi nisu potrebni. Dovoljno
              je prepisati izraz u pametniji oblik.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da organizuješ rešavanje pod pritiskom vremena"
        description="Na prijemnom se ova tema retko proverava kroz dugu teoriju. Češće dobijaš kratku jednačinu čija je suština da što pre prepoznaš pravi model rešavanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Redosled koji štedi vreme">
            <ul>
              <li>Prvo traži istu osnovu ili vezu između baza.</li>
              <li>
                Zatim proveri da li možeš da izdvojiš zajednički faktor.
              </li>
              <li>
                Ako vidiš <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath>, razmišljaj o smeni{" "}
                <InlineMath>{"u=a^x"}</InlineMath>.
              </li>
              <li>
                Na kraju obavezno filtriraj po uslovu{" "}
                <InlineMath>{"u>0"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta ispit najčešće pokušava da ti sakrije">
            <ul>
              <li>
                Baze su različite na prvi pogled, ali povezane stepenom.
              </li>
              <li>
                Smena je skrivena u zadatku sa <InlineMath>{"4^x"}</InlineMath> i{" "}
                <InlineMath>{"2^x"}</InlineMath>, ne sa{" "}
                <InlineMath>{"a^{2x}"}</InlineMath> i{" "}
                <InlineMath>{"a^x"}</InlineMath> direktno.
              </li>
              <li>
                Jedan koren kvadratne jednačine po{" "}
                <InlineMath>{"u"}</InlineMath> je negativan i služi kao provera
                pažnje.
              </li>
              <li>
                Neki zadaci nemaju realno rešenje i to treba mirno zaključiti.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Glavni ispitni refleks">
          <p>
            Eksponencijalni oblik ne rešavaš silom, već preuređivanjem:
          </p>
          <MathBlock>
            {"\\text{isti tip baza} \\Rightarrow \\text{isti eksponenti}"}
          </MathBlock>
          <MathBlock>
            {"\\text{članovi sa } a^x \\Rightarrow \\text{izdvajanje}"}
          </MathBlock>
          <MathBlock>
            {"a^{2x} \\text{ i } a^x \\Rightarrow u=a^x>0"}
          </MathBlock>
          <p>
            Kada taj redosled uđe u naviku, eksponencijalne jednačine postaju
            jedna od bržih oblasti na testu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li umeš samostalno da prepoznaš obrazac"
        description="Probaj da prvo sam odrediš metodu, pa tek onda otvori rešenje. To je važniji trening od samog završnog broja."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Reši <InlineMath>{"5^{x-1}=25"}</InlineMath>
              </p>
            }
            solution={
              <MathBlock>
                {"25=5^2,\\qquad 5^{x-1}=5^2 \\Rightarrow x-1=2 \\Rightarrow x=3"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Reši <InlineMath>{"3^{x+2}-3^x=72"}</InlineMath>
              </p>
            }
            solution={
              <>
                <MathBlock>{"3^{x+2}=9\\cdot 3^x"}</MathBlock>
                <MathBlock>
                  {
                    "9\\cdot 3^x - 3^x = 72 \\Rightarrow 8\\cdot 3^x=72 \\Rightarrow 3^x=9=3^2 \\Rightarrow x=2"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Reši <InlineMath>{"9^x-10\\cdot 3^x+9=0"}</InlineMath>
              </p>
            }
            solution={
              <>
                <MathBlock>{"9^x=(3^2)^x=3^{2x}=(3^x)^2"}</MathBlock>
                <MathBlock>
                  {"u=3^x>0 \\Rightarrow u^2-10u+9=0"}
                </MathBlock>
                <MathBlock>
                  {"(u-1)(u-9)=0 \\Rightarrow u=1 \\text{ ili } u=9"}
                </MathBlock>
                <MathBlock>
                  {"3^x=1 \\Rightarrow x=0,\\qquad 3^x=9 \\Rightarrow x=2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Reši <InlineMath>{"16^x-5\\cdot 4^x+4=0"}</InlineMath>
              </p>
            }
            solution={
              <>
                <MathBlock>{"16^x=(4^2)^x=(4^x)^2"}</MathBlock>
                <MathBlock>
                  {"u=4^x>0 \\Rightarrow u^2-5u+4=0"}
                </MathBlock>
                <MathBlock>
                  {"(u-1)(u-4)=0 \\Rightarrow u=1 \\text{ ili } u=4"}
                </MathBlock>
                <MathBlock>
                  {"4^x=1 \\Rightarrow x=0,\\qquad 4^x=4 \\Rightarrow x=1"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši <InlineMath>{"27^x=9^{x+1}"}</InlineMath>
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "27^x=(3^3)^x=3^{3x},\\qquad 9^{x+1}=(3^2)^{x+1}=3^{2x+2}"
                  }
                </MathBlock>
                <MathBlock>
                  {"3^{3x}=3^{2x+2} \\Rightarrow 3x=2x+2 \\Rightarrow x=2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Odredi skup rešenja jednačine{" "}
                <InlineMath>{"2^{2x}+2^x+1=0"}</InlineMath>
              </p>
            }
            solution={
              <>
                <MathBlock>{"u=2^x>0 \\Rightarrow u^2+u+1=0"}</MathBlock>
                <p>Diskriminanta je:</p>
                <MathBlock>{"\\Delta = 1-4 = -3 < 0"}</MathBlock>
                <p>
                  Kvadratna jednačina nema realne korene, pa ni originalna
                  eksponencijalna jednačina nema realna rešenja.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNA PORUKA ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka lekcije"
        title="Eksponencijalna jednačina se rešava prepoznavanjem oblika, ne napamet"
      >
        <InsightCard title="Najvažniji princip">
          <p>
            Ako umeš da brzo vidiš istu osnovu, zajednički faktor ili smenu{" "}
            <InlineMath>{"u=a^x"}</InlineMath>, onda je najveći deo zadatka već
            obavljen.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Kada zatvoriš ovu lekciju, cilj je da ti u glavi ostane jasan redosled razmišljanja, a ne samo nekoliko izolovanih zadataka."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Prvi pogled</h3>
            <p>
              Traži odnos između baza. <strong>2, 4, 8 i 3, 9, 27 nisu
              različiti svetovi.</strong> Ako baze prevedeš na istu osnovu,
              eksponencijalni problem često postaje linearan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Glavni alat</h3>
            <p>
              Preuredi, pa tek onda rešavaj.{" "}
              <strong>Izdvajanje i smena su standardni mehanizmi.</strong> Nema
              potrebe za improvizacijom ako se zadatak lepo uklapa u poznati
              obrazac.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Završni filter</h3>
            <p>
              Uvek proveri uslov <InlineMath>{"u>0"}</InlineMath>.{" "}
              <strong>
                Negativan kandidat za <InlineMath>{"u=a^x"}</InlineMath> nikada
                ne ostaje.
              </strong>{" "}
              Ovo je najčešća i najskuplja greška u zadacima sa smenom.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je lekcija o eksponencijalnim nejednačinama, gde
          ista logika ostaje na snazi, ali se dodaje pažljivo praćenje smera
          nejednakosti i monotonosti funkcije.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
