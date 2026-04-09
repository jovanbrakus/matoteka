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
  { href: "#zasto-vazna", label: "Zašto važna" },
  { href: "#osnove", label: "Osnovni pojmovi" },
  { href: "#prizma", label: "Prizma" },
  { href: "#piramida", label: "Piramida" },
  { href: "#mreze", label: "Mreže i izvođenje" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson46Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 46"
        title={
          <>
            Poliedri:{" "}
            <span className={cs.tHeroAccent}>prizma i piramida</span>
          </>
        }
        description="Ova lekcija te vodi kroz prizme, piramide i zarubljene piramide tako da formule ne učiš napamet, nego iz mreže, preseka i jasne slike tela. Glavni cilj je da na prijemnom odmah razlikuješ šta je površina baze B, šta je obim baze O_b, šta je prava visina H, a šta bočna visina s ili bočna ivica."
        heroImageSrc="/images/lessons/lesson46_hero.png"
        heroImageAlt="Ilustracija za lekciju o poliedrima: prizma, piramida, površina i zapremina"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da iz mreže dobiješ formule za ukupnu površinu i kako da za svako telo prepoznaš koja visina ulazi u zapreminu.",
          },
          {
            label: "Najveća zamka",
            description:
              "Da u kosoj prizmi ili pravilnoj piramidi pomešaš pravu visinu H sa bočnom ivicom ili bočnom visinom s.",
          },
          {
            label: "Prijemni fokus",
            description:
              'Prepoznavanje tipa tela, brz obračun preko baze i pravog preseka, i disciplina da površinu računaš preko lica, a ne preko "lične intuicije".',
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90 do 110 minuta sa detaljnom teorijom, interaktivnim delom, vođenim primerima i završnim vežbama.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcije 42 do 45: trouglovi, Pitagorina teorema, površine ravnih figura, sličnost i rad sa pravilnim mnogouglovima.",
          },
          {
            label: "Glavna veština",
            description:
              "Da iz slike ili teksta zadatka izdvojiš bazu, pravu visinu i odgovarajuću bočnu veličinu, pa zatim složiš površinu i zapreminu bez pogrešne formule.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Vizuelno poređenje prave prizme, kose prizme, pravilne piramide i zarubljene piramide sa mrežama i ključnim vrednostima.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="zasto-vazna"
        eyebrow="Zašto je ova lekcija važna"
        title="Stereometrija testira da li zaista vidiš telo, a ne samo formulu"
        description="Na prijemnom stereometrijski zadatak često izgleda zastrašujuće samo zato što je u prostoru. U stvarnosti, većina poena se osvaja time što pravilno protumačiš figuru i prevedeš je na poznate ravanske površine i pravu visinu."
      >
        <div className={s.grid3}>
          <SectionCard title='Ne računaš "u magli" nego iz jasne skice'>
            <p>
              Kada umeš da izdvojiš bazu, bočna lica i osni presek, telo
              prestaje da bude komplikovan 3D objekat i postaje zbir poznatih 2D
              figura. To je osnovna veština stereometrije.
            </p>
          </SectionCard>
          <SectionCard title="Površina dolazi iz mreže, zapremina iz pravog rastojanja">
            <p>
              Ako zapamtiš samo ovu ideju, mnogo teže ćeš napraviti tipične
              greške: da u zapreminu ubaciš bočnu ivicu ili da u površini
              zaboraviš jednu bazu ili pomešaš obim i površinu.
            </p>
          </SectionCard>
          <SectionCard title="Zadatak je često skrivena planimetrija">
            <p>
              Vrlo često se prava nepoznata ne nalazi direktno na telu, nego u
              preseku: trougao kroz visinu piramide, pravougaonik na mreži
              prizme ili slični trouglovi kod zarubljene piramide.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="1. Osnovni pojmovi"
        title="Pre formule moraš znati šta tačno gledaš"
        description='U stereometriji najveći broj grešaka ne nastaje u računu, već u pogrešnom imenovanju delova tela. Zato prvo raščistimo jezik: šta je poliedar, šta su baze, šta je omotač i koja visina je "prava".'
      >
        <div className={s.grid3}>
          <SectionCard title="Poliedar">
            <p>
              Poliedar je geometrijsko telo omeđeno mnogouglovima. Ta lica mogu
              biti trouglovi, četvorouglovi ili drugi mnogouglovi, ali su uvek
              ravne figure.
            </p>
            <p style={{ marginTop: 10, color: "var(--lesson-warning)" }}>
              Za ovu lekciju posebno su važni poliedri kod kojih možeš jasno da
              razlikuješ baze i bočna lica.
            </p>
          </SectionCard>

          <SectionCard title="Baze i omotač">
            <p>
              Kod prizme postoje dve međusobno paralelne i podudarne baze. Kod
              piramide postoji jedna baza, a sva bočna lica sastaju se u jednom
              vrhu. Omotač je skup bočnih lica bez baze ili baza.
            </p>
            <MathBlock>
              {"S = \\text{zbir površina svih lica} = \\text{baze} + M"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Prava visina H">
            <p>
              Prava visina tela je rastojanje između ravni baza ili rastojanje
              vrha od ravni baze. To je uvek rastojanje pod pravim uglom, a ne
              proizvoljna kosa duž.
            </p>
            <p style={{ marginTop: 10, color: "var(--lesson-success)" }}>
              U zapremini se koristi upravo ova visina, čak i kada telo
              &ldquo;izgleda nagnuto&rdquo;.
            </p>
          </SectionCard>

          <SectionCard title="Bočna ivica i bočna visina">
            <p>
              Bočna ivica je ivica bočnog lica. Bočna visina{" "}
              <InlineMath>{"s"}</InlineMath> je visina tog bočnog lica, na
              primer visina trougla kod pravilne piramide ili visina trapeza kod
              zarubljene piramide. To nije isto što i prava visina{" "}
              <InlineMath>{"H"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Mreža tela">
            <p>
              Mreža je ravanski raspored svih lica poliedra dobijen
              &ldquo;rasklapanjem&rdquo; tela. Kada uradiš mrežu, površina
              postaje običan zbir površina ravnih figura koje već znaš da
              računaš.
            </p>
          </SectionCard>

          <SectionCard title="Jezik koji koristimo">
            <p>
              U ovoj lekciji <InlineMath>{"B"}</InlineMath> označava površinu
              baze, <InlineMath>{"O_b"}</InlineMath> obim baze,{" "}
              <InlineMath>{"M"}</InlineMath> površinu omotača,{" "}
              <InlineMath>{"S"}</InlineMath> ukupnu površinu,{" "}
              <InlineMath>{"H"}</InlineMath> pravu visinu tela, a{" "}
              <InlineMath>{"s"}</InlineMath> bočnu visinu odgovarajućeg bočnog
              lica.
            </p>
            <MathBlock>
              {
                "\\text{baza} \\Rightarrow B,\\ O_b \\qquad \\text{omotač} \\Rightarrow M"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title='Kako da mentalno "spustiš" 3D na 2D'>
            <p>
              Zamisli da telo rastvoriš na sto. Sve što pripada površini sada
              vidiš kao pravougaonike, trouglove ili trapeze. Zato je mreža
              prirodan alat za površinu. Sa druge strane, zapremina meri koliko
              prostora telo zauzima, pa zato zavisi od površine baze i pravog
              rastojanja do druge baze ili vrha.
            </p>
          </SectionCard>

          <SectionCard title="Dve osnovne ideje cele lekcije">
            <MathBlock>
              {
                "\\text{površina} = \\text{zbir površina svih lica},\\qquad \\text{zapremina} = \\text{površina baze} \\cdot \\text{prava visina}"
              }
            </MathBlock>
            <p>
              Kod prizme se ta druga ideja primenjuje direktno. Kod piramide je
              zapremina tri puta manja nego kod prizme sa istom bazom i istom
              visinom.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Ista baza, ista visina, drugačiji izgled">
            <p>
              Ako dve prizme imaju istu površinu baze{" "}
              <InlineMath>{"B"}</InlineMath> i istu pravu visinu{" "}
              <InlineMath>{"H"}</InlineMath>, one imaju istu zapreminu, čak i
              ako je jedna prava, a druga kosa. Izgled omotača se menja, ali se
              broj &ldquo;slojeva&rdquo; iste debljine ne menja.
            </p>
            <MathBlock>{"V = BH"}</MathBlock>
          </SectionCard>
          <SectionCard title="Poređenje prizme i piramide">
            <p>
              Ako prizma i piramida imaju istu bazu i istu visinu, piramida
              zauzima tačno trećinu zapremine prizme. To je jedna od najvažnijih
              relacija u stereometriji.
            </p>
            <MathBlock>
              {"V_{\\text{piramide}} = \\frac{1}{3}V_{\\text{prizme}}"}
            </MathBlock>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 1: da li u zapremini smeš koristiti bočnu ivicu?"
          answer={
            <p>
              Ne. Zapremina koristi samo pravu visinu{" "}
              <InlineMath>{"H"}</InlineMath>, tj. rastojanje pod pravim uglom.
              Bočna ivica može biti duža od te visine i pripadati kosom licu, pa
              bi dala pogrešan rezultat.
            </p>
          }
        />

        <MicroCheck
          question="Mikro-provera 2: zašto je mreža korisna baš za površinu?"
          answer={
            <p>
              Zato što se površina tela sastoji od površina lica. Kada telo
              rasklopiš, ta lica dobijaš kao ravne figure čije površine znaš da
              izračunaš. Mreža zato uklanja prostornu konfuziju.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PRIZMA ═══════════ */}
      <LessonSection
        id="prizma"
        eyebrow="2. Prizma"
        title="Prava, kosa i pravilna prizma"
        description='Prizma nastaje kada se jedan mnogougao "prenese" paralelno samom sebi. Zbog toga ima dve podudarne i paralelne baze, a bočna lica su paralelogrami. Ako su bočne ivice normalne na baze, dobijaš pravu prizmu.'
      >
        <div className={s.grid2}>
          <SectionCard title="Šta je prizma">
            <p>
              Prizma je poliedar sa dve podudarne i paralelne baze. Bočna lica
              povezuju odgovarajuće stranice baza. Kod prave prizme ta bočna
              lica su pravougaonici. Kod kose prizme su to opšti paralelogrami.
            </p>
            <MathBlock>{"V_{\\text{prizme}} = B \\cdot H"}</MathBlock>
            <p>Ova formula važi za svaku prizmu, ne samo za pravu.</p>
          </SectionCard>

          <SectionCard title="Kako razlikovati tri česta naziva">
            <p>
              <strong>Prava prizma</strong> ima bočne ivice normalne na ravan
              baze. <strong>Kosa prizma</strong> nema tu normalnost.{" "}
              <strong>Pravilna prizma</strong> se u školskom programu najčešće
              misli kao prava prizma sa pravilnim mnogouglom u osnovi.
            </p>
            <p style={{ marginTop: 10, color: "var(--lesson-warning)" }}>
              Na prijemnom pažljivo čitaj formulaciju. Nije dovoljno da je baza
              pravilna; moraš znati i da li je prizma prava ili kosa.
            </p>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Zapremina svake prizme"
            formula={"V = B \cdot H"}
            note="Ne zanima te da li je prizma nagnuta, nego kolika je baza i kolika je prava visina između ravni baza."
          />
          <FormulaCard
            title="Površina omotača (prava prizma)"
            formula={"M = O_b \cdot H"}
            note={
              <>
                Ovo važi zato što su bočna lica pravougaonici visine{" "}
                <InlineMath>{"H"}</InlineMath>, pa njihov zbir daje obim baze
                puta visina.
              </>
            }
          />
          <FormulaCard
            title="Ukupna površina (prava prizma)"
            formula="S = 2B + M = 2B + O_bH"
            note="Na površinu ulaze obe baze. Ova formula se vrlo često pogrešno prepolovi jer učenik zaboravi drugu bazu."
          />
          <FormulaCard
            title="Četvorougaona prava prizma"
            formula={"B = ab,\\quad O_b = 2(a+b),\\quad S = 2ab + 2H(a+b)"}
            note="Ovaj oblik je najčešći u školskim zadacima zato što sve možeš da pratiš preko pravougaonika."
          />
          <FormulaCard
            title="Kosa prizma: površina"
            formula={"M \\neq O_bH \\text{ (uopšteno)}"}
            note="Kod opšte kose prizme najsigurniji put je mreža: saberi površine svih bočnih paralelograma i obe baze."
          />
          <FormulaCard
            title="Intuicija: zašto V ostaje isto"
            formula="V = BH"
            note='Ako telo samo "nagnete", ali baza i prava visina ostanu iste, svaki horizontalni presek ima istu površinu kao ranije.'
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Prava prizma sa poznatom bazom">
            <p>
              Ako je <InlineMath>{"B=18\\ \\text{cm}^2"}</InlineMath>,{" "}
              <InlineMath>{"O_b=20\\ \\text{cm}"}</InlineMath> i{" "}
              <InlineMath>{"H=7\\ \\text{cm}"}</InlineMath>, onda je
            </p>
            <MathBlock>
              {"M = O_bH = 20 \\cdot 7 = 140,\\qquad S = 2B + M = 36 + 140 = 176,"}
            </MathBlock>
            <MathBlock>{"V = BH = 18 \\cdot 7 = 126."}</MathBlock>
            <p>
              Ovo je odličan podsetnik da ti za opštu bazu nisu potrebne
              stranice baze ako su <InlineMath>{"B"}</InlineMath> i{" "}
              <InlineMath>{"O_b"}</InlineMath> već dati.
            </p>
          </SectionCard>
          <SectionCard title="Kosa prizma i visina">
            <p>
              U kosoj prizmi bočna ivica može biti, na primer,{" "}
              <InlineMath>{"10"}</InlineMath> cm, a prava visina samo{" "}
              <InlineMath>{"8"}</InlineMath> cm. Za zapreminu koristiš{" "}
              <InlineMath>{"8"}</InlineMath>, ne <InlineMath>{"10"}</InlineMath>.
              Ako je baza <InlineMath>{"25\\ \\text{cm}^2"}</InlineMath>, onda
              je
            </p>
            <MathBlock>{"V = 25 \\cdot 8 = 200\\ \\text{cm}^3."}</MathBlock>
            <p>
              Bočna ivica pomaže kod površine nekih lica, ali ne menja
              definiciju zapremine.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 3: kada formula M = O_b H sigurno važi?"
          answer={
            <p>
              Kada je prizma prava. Tada su sva bočna lica pravougaonici čija je
              jedna stranica upravo <InlineMath>{"H"}</InlineMath>, pa zbir
              njihovih površina daje obim baze puta visina.
            </p>
          }
        />
        <MicroCheck
          question="Mikro-provera 4: šta je potrebno za zapreminu prizme?"
          answer={
            <p>
              Dovoljni su površina baze <InlineMath>{"B"}</InlineMath> i prava
              visina <InlineMath>{"H"}</InlineMath>. Nisu ti obavezno potrebne
              pojedinačne stranice baze ako je <InlineMath>{"B"}</InlineMath>{" "}
              već poznato.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PIRAMIDA ═══════════ */}
      <LessonSection
        id="piramida"
        eyebrow="3. Piramida"
        title="Pravilna piramida i zarubljena piramida"
        description="Piramida ima jednu bazu, a sva bočna lica su trouglovi koji se sastaju u vrhu. Kod pravilne piramide baza je pravilan mnogougao, a vrh se nalazi iznad centra baze. Tada je račun posebno uredan jer su bočna lica podudarna."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta tačno meri bočna visina s">
            <p>
              Kod pravilne piramide svako bočno lice je jednakokraki trougao.
              Bočna visina <InlineMath>{"s"}</InlineMath> je visina tog trougla,
              merena od vrha piramide do sredine odgovarajuće stranice baze. To
              nije isto što i prava visina <InlineMath>{"H"}</InlineMath>, koja
              pada na centar baze.
            </p>
            <MathBlock>{"M = \\frac{O_b \\cdot s}{2}"}</MathBlock>
          </SectionCard>

          <SectionCard title="Zašto se javlja faktor 1/3">
            <p>
              Zapremina piramide sa bazom <InlineMath>{"B"}</InlineMath> i
              visinom <InlineMath>{"H"}</InlineMath> jednaka je trećini
              zapremine prizme sa istom bazom i istom visinom. Ova relacija nije
              slučajna formula, nego duboka geometrijska činjenica koja se može
              dokazivati presecanjem ili Cavalierijevim principom.
            </p>
            <MathBlock>
              {"V_{\\text{piramide}} = \\frac{B \\cdot H}{3}"}
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Zapremina (svaka piramida)"
            formula={"V = \frac{B \cdot H}{3}"}
            note="Važi bez obzira na oblik baze. Jedino moraš pravilno odrediti površinu baze i pravu visinu tela."
          />
          <FormulaCard
            title="Površina omotača (pravilna piramida)"
            formula={"M = \frac{O_b \cdot s}{2}"}
            note="Bočna lica su podudarni trouglovi, pa ukupna površina omotača postaje zbir njihovih površina."
          />
          <FormulaCard
            title="Ukupna površina (pravilna piramida)"
            formula={"S = B + M = B + \frac{O_bs}{2}"}
            note={
              <>
                Za razliku od prizme, ovde postoji samo jedna baza, pa se ne
                pojavljuje <InlineMath>{"2B"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Četvorougaona pravilna piramida"
            formula={"B = a^2,\\quad O_b = 4a,\\quad M = 2as,\\quad S = a^2 + 2as"}
            note="Ovo je najčešći oblik na prijemnom jer se bočna visina lako vidi u osnom preseku."
          />
          <FormulaCard
            title="Osni presek daje Pitagoru"
            formula="s^2 = H^2 + r^2"
            note={
              <>
                Ovde je <InlineMath>{"r"}</InlineMath> apotema baze, odnosno
                rastojanje centra pravilne baze do sredine stranice. Za kvadrat
                važi <InlineMath>{"r=\\frac{a}{2}"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Zarubljena piramida: zapremina"
            formula={"V = \frac{H}{3}\left(B_1 + B_2 + \sqrt{B_1B_2}\right)"}
            note="Ovu formulu dobijaš kao razliku dve slične piramide. Na prijemnom se često javlja baš zato što proverava sličnost i rad sa presecima."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Iz visine do bočne visine">
            <p>
              Pravilna četvorougaona piramida ima{" "}
              <InlineMath>{"a=6"}</InlineMath> cm i{" "}
              <InlineMath>{"H=4"}</InlineMath> cm. Pošto je apotema baze{" "}
              <InlineMath>{"r=\\frac{a}{2}=3"}</InlineMath>, dobijaš
            </p>
            <MathBlock>
              {
                "s = \\sqrt{H^2 + r^2} = \\sqrt{4^2 + 3^2} = 5\\ \\text{cm}."
              }
            </MathBlock>
            <p>Tek tada možeš računati bočnu površinu.</p>
          </SectionCard>
          <SectionCard title='Zarubljena piramida kao "odsečena" prava piramida'>
            <p>
              Kada se piramida odseče ravni paralelnom osnovi, dobijaš zarubljenu
              piramidu sa dve slične baze. Zbog te sličnosti mnoge nepoznate
              dužine možeš dobiti preko razmera, a zatim koristiti formule za
              površinu i zapreminu.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera 5: zašto u pravilnoj četvorougaonoj piramidi uzimaš a/2, a ne dijagonalu baze?"
          answer={
            <p>
              Zato što se bočna visina <InlineMath>{"s"}</InlineMath> spušta na
              sredinu stranice baze, pa u osnom preseku dobijaš pravougli
              trougao čija je jedna kateta rastojanje od centra kvadrata do
              sredine stranice, a to je{" "}
              <InlineMath>{"\\frac{a}{2}"}</InlineMath>.
            </p>
          }
        />
        <MicroCheck
          question="Mikro-provera 6: koliko baza ima zarubljena piramida?"
          answer={
            <p>
              Dve. Donja i gornja baza su slični mnogouglovi. Zato u ukupnoj
              površini učestvuju obe, a u zapremini obe kroz formulu sa{" "}
              <InlineMath>{"B_1"}</InlineMath>,{" "}
              <InlineMath>{"B_2"}</InlineMath> i{" "}
              <InlineMath>{"\\sqrt{B_1B_2}"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MREŽE I IZVOĐENJE ═══════════ */}
      <LessonSection
        id="mreze"
        eyebrow="4. Mreže i izvođenje formula"
        title="Mreža je najkraći put do pravilne površine"
        description='Učenici često pokušavaju da "pogode" formulu za površinu. Bolji pristup je da nacrtaš ili makar zamisliš mrežu tela. Tada svaka formula postaje posledica sabiranja poznatih ravnih figura.'
      >
        <div className={s.grid3}>
          <SectionCard title="Prava prizma: dve baze i traka pravougaonika">
            <p>
              Mreža prave prizme sastoji se od dve podudarne baze i niza
              pravougaonika. Širine tih pravougaonika zajedno daju obim baze{" "}
              <InlineMath>{"O_b"}</InlineMath>, a visina svakog je{" "}
              <InlineMath>{"H"}</InlineMath>.
            </p>
            <MathBlock>{"M = O_bH,\\qquad S = 2B + O_bH"}</MathBlock>
          </SectionCard>

          <SectionCard title="Pravilna piramida: baza i niz podudarnih trouglova">
            <p>
              Mreža pravilne piramide sastoji se od jedne baze i više podudarnih
              trouglova. Svaki trougao ima osnovicu jednu stranicu baze i visinu{" "}
              <InlineMath>{"s"}</InlineMath>, pa njihov zbir daje{" "}
              <InlineMath>{"\\frac{O_bs}{2}"}</InlineMath>.
            </p>
            <MathBlock>
              {"M = \\frac{O_bs}{2},\\qquad S = B + \\frac{O_bs}{2}"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Zarubljena piramida: dve baze i bočni trapezi">
            <p>
              Kod pravilne zarubljene piramide bočna lica su podudarni trapezi.
              Ako je <InlineMath>{"s"}</InlineMath> njihova visina, zbir
              njihovih površina je poluzbir obima baza puta{" "}
              <InlineMath>{"s"}</InlineMath>.
            </p>
            <MathBlock>{"M = \\frac{(O_1 + O_2)s}{2}"}</MathBlock>
          </SectionCard>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Prepoznaj telo">
              <p>
                Prizma ili piramida? Prava ili kosa? Pravilna ili ne? Od toga
                zavisi koja prečica uopšte sme da se koristi.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Odredi bazu">
              <p>
                Nađi površinu baze <InlineMath>{"B"}</InlineMath> i, kada treba,
                njen obim <InlineMath>{"O_b"}</InlineMath>. Nemoj mešati te dve
                veličine.
              </p>
            </WalkStep>
            <WalkStep number={3} title="Odredi pravu i bočnu visinu">
              <p>
                Zapremina traži <InlineMath>{"H"}</InlineMath>. Površina omotača
                pravilne piramide ili frustuma traži{" "}
                <InlineMath>{"s"}</InlineMath>. Ako neka od tih dužina nije
                data, traži je u preseku.
              </p>
            </WalkStep>
            <WalkStep number={4} title="Saberi lica bez preskakanja">
              <p>
                Kod prizme su dve baze, kod piramide jedna, kod zarubljene
                piramide dve. Napiši sabiranje lica pre nego što računaš
                brojeve.
              </p>
            </WalkStep>
          </div>
        </div>

        <MicroCheck
          question="Mikro-provera 7: zašto mreža štiti od greške u formuli?"
          answer={
            <p>
              Zato što na mreži vidiš tačno koliko lica postoji i kog su oblika.
              Ako si površinu napisao kao zbir tih lica, formula više nije
              &ldquo;na pamet&rdquo;, nego rezultat konkretne slike.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="6. Vođeni primeri"
        title="Primeri koji grade sigurnost za prijemni"
        description="Primeri su poređani od osnovnog ka složenijem. Prvo rešavaš zadatak kada su B i O_b već dati, zatim prolaziš kroz kosu prizmu, pravilnu piramidu, obrnuti zadatak sa traženjem visine i na kraju zarubljenu piramidu."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Prava prizma sa opštom bazom
            </h3>
            <p>
              Data je prava prizma čija je površina baze{" "}
              <InlineMath>{"B=24\\ \\text{cm}^2"}</InlineMath>, obim baze{" "}
              <InlineMath>{"O_b=22\\ \\text{cm}"}</InlineMath>, a visina{" "}
              <InlineMath>{"H=9\\ \\text{cm}"}</InlineMath>. Odredi ukupnu
              površinu i zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pošto je prizma prava, omotač računaš formulom{" "}
                    <InlineMath>{"M=O_bH"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={2} title="Izračunaj omotač.">
                <MathBlock>
                  {"M = 22 \\cdot 9 = 198\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Ukupna površina.">
                <MathBlock>
                  {
                    "S = 2B + M = 2\\cdot 24 + 198 = 246\\ \\text{cm}^2"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zapremina.">
                <MathBlock>
                  {"V = BH = 24 \\cdot 9 = 216\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {"S = 246\\ \\text{cm}^2,\\qquad V = 216\\ \\text{cm}^3"}
            </MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Kosa četvorougaona prizma
            </h3>
            <p>
              Donja baza je kvadrat stranice{" "}
              <InlineMath>{"a=5"}</InlineMath> cm. Gornja baza je pomerena
              horizontalno za <InlineMath>{"d=6"}</InlineMath> cm, a prava
              visina prizme je <InlineMath>{"H=8"}</InlineMath> cm. Odredi
              zapreminu i ukupnu površinu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapremina odmah.">
                <MathBlock>
                  {"V = BH = 25 \\cdot 8 = 200\\ \\text{cm}^3"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Bočna ivica.">
                <MathBlock>
                  {
                    "k=\\sqrt{H^2+d^2}=\\sqrt{8^2+6^2}=10\\ \\text{cm}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Omotač.">
                <p>
                  Dva bočna lica imaju površinu{" "}
                  <InlineMath>{"aH=5\\cdot 8=40"}</InlineMath>, a druga dva{" "}
                  <InlineMath>{"ak=5\\cdot 10=50"}</InlineMath>.
                </p>
                <MathBlock>
                  {"M = 2\\cdot 40 + 2\\cdot 50 = 180\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Ukupna površina.">
                <MathBlock>
                  {
                    "S = 2B + M = 50 + 180 = 230\\ \\text{cm}^2"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Poenta: zapremina je koristila{" "}
              <InlineMath>{"H=8"}</InlineMath>, a ne kosu bočnu ivicu{" "}
              <InlineMath>{"10"}</InlineMath>.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Pravilna četvorougaona piramida
            </h3>
            <p>
              Pravilna četvorougaona piramida ima osnovicu stranice{" "}
              <InlineMath>{"a=6"}</InlineMath> cm i visinu{" "}
              <InlineMath>{"H=4"}</InlineMath> cm. Odredi ukupnu površinu i
              zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Površina baze.">
                <MathBlock>{"B=a^2=36\\ \\text{cm}^2"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Bočna visina preko Pitagore.">
                <MathBlock>
                  {"s=\\sqrt{4^2+3^2}=5\\ \\text{cm}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Omotač.">
                <MathBlock>
                  {"M=2as=2\\cdot 6 \\cdot 5=60\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Ukupna površina i zapremina.">
                <MathBlock>
                  {"S=B+M=36+60=96\\ \\text{cm}^2"}
                </MathBlock>
                <MathBlock>
                  {
                    "V=\\frac{BH}{3}=\\frac{36\\cdot 4}{3}=48\\ \\text{cm}^3"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Iz ukupne površine do visine piramide
            </h3>
            <p>
              Pravilna četvorougaona piramida ima osnovicu stranice{" "}
              <InlineMath>{"a=12"}</InlineMath> cm i ukupnu površinu{" "}
              <InlineMath>{"S=384\\ \\text{cm}^2"}</InlineMath>. Odredi bočnu
              visinu i pravu visinu piramide.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Površina baze i omotač.">
                <MathBlock>{"B=12^2=144\\ \\text{cm}^2"}</MathBlock>
                <MathBlock>
                  {"M=S-B=384-144=240\\ \\text{cm}^2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Bočna visina.">
                <MathBlock>
                  {
                    "240 = 2\\cdot 12 \\cdot s \\Rightarrow s=10\\ \\text{cm}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Prava visina.">
                <MathBlock>
                  {
                    "H = \\sqrt{s^2-\\left(\\frac{a}{2}\\right)^2} = \\sqrt{10^2-6^2} = \\sqrt{64} = 8\\ \\text{cm}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovaj tip zadatka često proverava da li znaš da ideš unazad: od
              ukupne površine do omotača, pa do visine.
            </p>
          </article>
        </div>

        {/* Primer 5 - wide */}
        <div className={s.grid2} style={{ marginTop: 16 }}>
          <article
            className={s.exampleCard}
            style={{ gridColumn: "1 / -1" }}
          >
            <h3 className={cs.tCardTitle}>
              Primer 5: Zarubljena pravilna četvorougaona piramida
            </h3>
            <p>
              Zarubljena pravilna četvorougaona piramida ima donju osnovu
              stranice <InlineMath>{"a=8"}</InlineMath> cm, gornju osnovu
              stranice <InlineMath>{"b=4"}</InlineMath> cm i pravu visinu{" "}
              <InlineMath>{"H=6"}</InlineMath> cm. Odredi ukupnu površinu i
              zapreminu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Površine baza.">
                <MathBlock>{"B_1=8^2=64,\\qquad B_2=4^2=16"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Bočna visina trapeza.">
                <MathBlock>
                  {
                    "s=\\sqrt{H^2+\\left(\\frac{a-b}{2}\\right)^2} = \\sqrt{6^2+2^2} = \\sqrt{40} = 2\\sqrt{10}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Omotač.">
                <MathBlock>
                  {
                    "M=\\frac{(O_1+O_2)s}{2} = \\frac{48 \\cdot 2\\sqrt{10}}{2} = 48\\sqrt{10}\\ \\text{cm}^2"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Ukupna površina.">
                <MathBlock>
                  {
                    "S = B_1 + B_2 + M = 64 + 16 + 48\\sqrt{10} = 80 + 48\\sqrt{10}\\ \\text{cm}^2"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={5} title="Zapremina.">
                <MathBlock>
                  {
                    "V = \\frac{H}{3}\\left(B_1 + B_2 + \\sqrt{B_1B_2}\\right) = \\frac{6}{3}\\left(64 + 16 + 32\\right) = 2 \\cdot 112 = 224\\ \\text{cm}^3"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovde se vidi kako zarubljena piramida spaja tri ideje: sličnost,
              Pitagoru i zbir površina lica.
            </p>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera 8: kada u zadatku prvo računaš s, a ne H?"
          answer={
            <p>
              Kada se traži površina pravilne piramide ili zarubljene pravilne
              piramide. Tada omotač zavisi od bočne visine lica{" "}
              <InlineMath>{"s"}</InlineMath>, a ne direktno od vertikalne visine{" "}
              <InlineMath>{"H"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="7. Ključne formule i obrasci"
        title="Formula mora da ti prizove sliku tela"
        description="Ovaj deo služi kao sažetak. Nemoj ga učiti odvojeno od prethodnih sekcija. Svaka formula ovde treba odmah da ti prizove telo, mrežu i pravu vrstu visine."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Prizma: zapremina"
            formula={"V = B \cdot H"}
            note="Važi za svaku prizmu, pravu i kosu."
          />
          <FormulaCard
            title="Prava prizma: omotač"
            formula={"M = O_b \cdot H"}
            note="Važi kada su bočna lica pravougaonici."
          />
          <FormulaCard
            title="Prava prizma: ukupna površina"
            formula="S = 2B + O_bH"
            note="Ne zaboravi da prizma ima dve baze."
          />
          <FormulaCard
            title="Piramida: zapremina"
            formula={"V = \frac{BH}{3}"}
            note={
              <>
                Ključni faktor <InlineMath>{"\\frac{1}{3}"}</InlineMath>{" "}
                razlikuje je od prizme.
              </>
            }
          />
          <FormulaCard
            title="Pravilna piramida: omotač"
            formula={"M = \frac{O_bs}{2}"}
            note={
              <>
                Bočna visina <InlineMath>{"s"}</InlineMath> pripada trouglastim
                licima.
              </>
            }
          />
          <FormulaCard
            title="Pravilna piramida: ukupna površina"
            formula={"S = B + \frac{O_bs}{2}"}
            note="Ovde postoji samo jedna baza."
          />
          <FormulaCard
            title="Zarubljena pravilna piramida: omotač"
            formula={"M = \frac{(O_1+O_2)s}{2}"}
            note="Bočna lica su trapezi, pa se javlja poluzbir obima baza."
          />
          <FormulaCard
            title="Zarubljena piramida: ukupna površina"
            formula="S = B_1 + B_2 + M"
            note="Uvek saberi obe baze i omotač."
          />
          <FormulaCard
            title="Zarubljena piramida: zapremina"
            formula={"V = \frac{H}{3}\left(B_1+B_2+\sqrt{B_1B_2}\right)"}
            note="Formula potiče iz razlike dve slične piramide."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="8. Česte greške"
        title="Ovde se gube laki poeni"
        description="Većina grešaka u ovoj temi nije teška matematika, nego brzopletost. Ako unapred znaš koje su tipične zamke, mnogo lakše ćeš ih prepoznati dok radiš zadatak."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Ubaciš bočnu ivicu u zapreminu
            </h3>
            <p>
              Zapremina ne zna ništa o &ldquo;nagnutosti&rdquo; lica. Zna samo
              za površinu baze i pravu visinu <InlineMath>{"H"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pomešaš <InlineMath>{"B"}</InlineMath> i{" "}
              <InlineMath>{"O_b"}</InlineMath>
            </h3>
            <p>
              Površina baze i obim baze nisu slične veličine. Jedna je u
              kvadratnim jedinicama, druga u linearnim.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Za kosu prizmu napišeš{" "}
              <InlineMath>{"M=O_bH"}</InlineMath>
            </h3>
            <p>
              Ta formula je sigurna za pravu prizmu. Kod kose prizme treba da
              pogledaš konkretna bočna lica ili mrežu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kod piramide uzmeš <InlineMath>{"s=H"}</InlineMath>
            </h3>
            <p>
              Bočna visina pripada bočnom trouglu, a prava visina pada na bazu.
              Jednake su samo u trivijalnim ili pogrešno nacrtanim situacijama.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboraviš broj baza</h3>
            <p>
              Prizma ima dve baze. Piramida jednu. Zarubljena piramida opet dve.
              Jedna propuštena baza odmah ruši ceo rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ne nacrtaš pomoćni presek</h3>
            <p>
              Često je prava nepoznata skrivena u pravouglom preseku. Bez tog
              crteža Pitagora i sličnost ostaju &ldquo;nevidljive&rdquo;.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="9. Veza sa prijemnim zadacima"
        title="Kako da stereometrijski zadatak čitaš pod pritiskom vremena"
        description="Na prijemnom nemaš luksuz da dugo lutaš. Potreban ti je kratak i pouzdan protokol čitanja zadatka, tako da u prvoj minuti znaš koje veličine tražiš i koja formula uopšte dolazi u obzir."
      >
        <div className={s.grid3}>
          <SectionCard title="Identifikuj telo i vrstu visine">
            <ul>
              <li>Da li je telo prizma, piramida ili zarubljena piramida?</li>
              <li>Da li je telo pravo, koso ili pravilno?</li>
              <li>
                Koja duž je prava visina, a koja bočna visina ili bočna ivica?
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Traži pomoćni trougao ili trapez">
            <ul>
              <li>
                Kod pravilne piramide često tražiš{" "}
                <InlineMath>{"s"}</InlineMath> preko Pitagore.
              </li>
              <li>
                Kod zarubljene piramide često radiš sa sličnim presekom.
              </li>
              <li>
                Kod baze ponekad prvo moraš rešiti planimetrijski zadatak da bi
                dobio <InlineMath>{"B"}</InlineMath> ili{" "}
                <InlineMath>{"O_b"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Proveri rezultat pre predaje">
            <ul>
              <li>
                Da li je površina u{" "}
                <InlineMath>{"\\text{cm}^2"}</InlineMath>, a zapremina u{" "}
                <InlineMath>{"\\text{cm}^3"}</InlineMath>?
              </li>
              <li>Da li su uračunate sve baze?</li>
              <li>
                Da li si u zapremini koristio pravo rastojanje, a ne kosu duž?
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Kada zadatak deluje složeno, vrati ga na dve rečenice">
          <p>
            Prva rečenica: &ldquo;Koja je baza i kolika joj je
            površina?&rdquo; Druga rečenica: &ldquo;Koja je prava visina i koja
            bočna veličina mi treba za površinu?&rdquo; Ako te dve stvari jasno
            napišeš na papiru, zadatak se obično raspadne na poznate korake.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="10. Vežbe"
        title="Kratki zadaci za proveru razumevanja"
        description="Reši samostalno, pa tek onda otvori rešenje. Cilj nije samo tačan broj, nego da vidiš da li si izabrao pravu formulu i pravu vrstu visine."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Prava prizma sa datim B i O_b"
            problem={
              <p>
                Za pravu prizmu dati su{" "}
                <InlineMath>{"B=30\\ \\text{cm}^2"}</InlineMath>,{" "}
                <InlineMath>{"O_b=26\\ \\text{cm}"}</InlineMath> i{" "}
                <InlineMath>{"H=7\\ \\text{cm}"}</InlineMath>. Nađi{" "}
                <InlineMath>{"S"}</InlineMath> i{" "}
                <InlineMath>{"V"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Omotač je{" "}
                  <InlineMath>
                    {"M=O_bH=26\\cdot 7=182\\ \\text{cm}^2"}
                  </InlineMath>
                  .
                </p>
                <MathBlock>
                  {"S=2B+M=60+182=242\\ \\text{cm}^2"}
                </MathBlock>
                <MathBlock>
                  {"V=BH=30\\cdot 7=210\\ \\text{cm}^3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2: Pravilna četvorougaona piramida"
            problem={
              <p>
                Data je pravilna četvorougaona piramida sa{" "}
                <InlineMath>{"a=8"}</InlineMath> cm i{" "}
                <InlineMath>{"H=3"}</InlineMath> cm. Nađi{" "}
                <InlineMath>{"s"}</InlineMath>, <InlineMath>{"S"}</InlineMath> i{" "}
                <InlineMath>{"V"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Za kvadrat važi{" "}
                  <InlineMath>{"\\frac{a}{2}=4"}</InlineMath>, pa je{" "}
                  <InlineMath>{"s=\\sqrt{3^2+4^2}=5"}</InlineMath> cm.
                </p>
                <MathBlock>{"B=8^2=64,\\quad M=2as=2\\cdot 8\\cdot 5=80"}</MathBlock>
                <MathBlock>{"S=B+M=144\\ \\text{cm}^2"}</MathBlock>
                <MathBlock>
                  {"V=\\frac{64\\cdot 3}{3}=64\\ \\text{cm}^3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3: Kosa četvorougaona prizma"
            problem={
              <p>
                U specijalnom modelu kose kvadratne prizme dati su{" "}
                <InlineMath>{"a=4"}</InlineMath> cm,{" "}
                <InlineMath>{"H=6"}</InlineMath> cm i horizontalni pomeraj{" "}
                <InlineMath>{"d=8"}</InlineMath> cm. Nađi bočnu ivicu, ukupnu
                površinu i zapreminu.
              </p>
            }
            solution={
              <>
                <p>
                  Bočna ivica je{" "}
                  <InlineMath>{"k=\\sqrt{6^2+8^2}=10"}</InlineMath> cm.
                </p>
                <MathBlock>
                  {"B=4^2=16,\\quad V=16\\cdot 6=96\\ \\text{cm}^3"}
                </MathBlock>
                <MathBlock>
                  {
                    "M=2aH+2ak=2\\cdot4\\cdot6+2\\cdot4\\cdot10=48+80=128\\ \\text{cm}^2"
                  }
                </MathBlock>
                <MathBlock>
                  {"S=2B+M=32+128=160\\ \\text{cm}^2"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4: Zarubljena pravilna četvorougaona piramida"
            problem={
              <p>
                Data je zarubljena pravilna četvorougaona piramida sa{" "}
                <InlineMath>{"a=9"}</InlineMath> cm,{" "}
                <InlineMath>{"b=3"}</InlineMath> cm i{" "}
                <InlineMath>{"H=4"}</InlineMath> cm. Nađi{" "}
                <InlineMath>{"S"}</InlineMath> i{" "}
                <InlineMath>{"V"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Površine baza su{" "}
                  <InlineMath>{"B_1=81"}</InlineMath> i{" "}
                  <InlineMath>{"B_2=9"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "s=\\sqrt{4^2+\\left(\\frac{9-3}{2}\\right)^2}=\\sqrt{16+9}=5"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "M=\\frac{(4\\cdot 9 + 4\\cdot 3)\\cdot 5}{2}=\\frac{48\\cdot 5}{2}=120"
                  }
                </MathBlock>
                <MathBlock>
                  {"S=81+9+120=210\\ \\text{cm}^2"}
                </MathBlock>
                <MathBlock>
                  {
                    "V=\\frac{4}{3}(81+9+\\sqrt{729})=\\frac{4}{3}(117)=156\\ \\text{cm}^3"
                  }
                </MathBlock>
              </>
            }
          />
        </div>

        {/* Vežba 5 - wide */}
        <div style={{ marginTop: 16 }}>
          <ExerciseCard
            title="Vežba 5: Poređenje prizme i piramide"
            problem={
              <p>
                Prizma i piramida imaju istu bazu površine{" "}
                <InlineMath>{"20\\ \\text{cm}^2"}</InlineMath> i istu visinu{" "}
                <InlineMath>{"9"}</InlineMath> cm. Nađi njihove zapremine i
                objasni odnos rezultata.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "V_{\\text{prizme}}=BH=20\\cdot 9=180\\ \\text{cm}^3"
                  }
                </MathBlock>
                <MathBlock>
                  {
                    "V_{\\text{piramide}}=\\frac{BH}{3}=\\frac{20\\cdot 9}{3}=60\\ \\text{cm}^3"
                  }
                </MathBlock>
                <p>
                  Piramida ima tačno trećinu zapremine prizme sa istom bazom i
                  istom visinom.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključni uvid"
        title="Dve rečenice koje rešavaju najveći deo lekcije"
      >
        <InsightCard title="Površina i zapremina iz dva različita uglova">
          <p>
            Površinu dobijaš kada telo rastvoriš u mrežu i sabereš lica.
            Zapreminu dobijaš iz površine baze i prave visine, a kod piramide uz
            dodatni faktor <InlineMath>{"\\frac{1}{3}"}</InlineMath>. Kad god se
            zbuniš, vrati se na te dve rečenice i problem će se ponovo
            &ldquo;smiriti&rdquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="11. Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Cilj nije da izađeš sa deset formula u glavi, nego sa jasnim sistemom razmišljanja koji možeš odmah da primeniš na prijemnom zadatku."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Prvo identifikuj telo</h3>
            <p>
              Prizma ima dve baze. Piramida jednu. Zarubljena piramida dve
              slične baze i bočne trapeze.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Zapremina traži <InlineMath>{"B"}</InlineMath> i{" "}
              <InlineMath>{"H"}</InlineMath>
            </h3>
            <p>
              Za prizmu važi <InlineMath>{"V=BH"}</InlineMath>, a za piramidu{" "}
              <InlineMath>{"V=\\frac{BH}{3}"}</InlineMath>. Uvek koristi pravu
              visinu, ne kosu duž.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Površina se čita iz mreže</h3>
            <p>
              Prava prizma:{" "}
              <InlineMath>{"S=2B+O_bH"}</InlineMath>. Pravilna piramida:{" "}
              <InlineMath>{"S=B+\\frac{O_bs}{2}"}</InlineMath>. Frustum: saberi
              obe baze i trapezasti omotač.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Pomoćni presek je pola rešenja
            </h3>
            <p>
              Kada nedostaje <InlineMath>{"s"}</InlineMath>,{" "}
              <InlineMath>{"H"}</InlineMath> ili neka ivica, nacrtaj
              odgovarajući pravougli presek i koristi Pitagoru ili sličnost.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak je da ove ideje povežeš sa obrtnim telima i
          zadacima sa upisanim i opisanim telima, gde se 3D problem često
          rešava preko pažljivo izabranog preseka.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
