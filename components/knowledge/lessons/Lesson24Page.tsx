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
import IrrationalLab from "./IrrationalLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#domen", label: "Domena i uslovi" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson24Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 24"
        title={
          <>
            Iracionalne{" "}
            <span className={cs.tHeroAccent}>jednačine</span>
          </>
        }
        description="Iracionalne jednačine na prijemnom nisu teške zato što su nepoznate, već zato što traže disciplinu. Ako preskočiš domenu, uslov da druga strana bude nenegativna i proveru u originalu, lako dobiješ lepo izračunato, a pogrešno rešenje. Ova lekcija te uči upravo toj disciplini."
        heroImageSrc="/images/lessons/lesson24_hero.png"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o iracionalnim jednačinama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Domen, izolacija, kvadriranje, provera — ne samo kako da računaš, nego i kojim redom da misliš dok rešavaš zadatak.",
          },
          {
            label: "Najveća zamka",
            description:
              "Kvadriranje briše informaciju o znaku. Kada kvadriraš, možeš da proširiš skup kandidata i proizvedeš lažno rešenje.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Brza kontrolna lista: prvo domen, pa uslov nenegativnosti, tek onda kvadriranje i obavezna provera.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "60 do 75 minuta — dovoljno da teoriju odmah spojiš sa nekoliko tipičnih prijemnih zadataka.",
          },
          {
            label: "Predznanje",
            description:
              "Kvadratne jednačine — treba da umeš faktorizaciju, diskriminantu i elementarnu proveru dobijenih kandidata.",
          },
          {
            label: "Glavna veština",
            description:
              "Kontrola uslova — poenta nije u samom kvadriranju, nego u tome da ga uradiš tek kada smeš.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija — menjaš koeficijente i vidiš kako se menjaju domen, kandidati i stvarna rešenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je lekcija o matematičkoj disciplini"
        description="Iracionalne jednačine su mali test zrelosti u računanju. Nije dovoljno da znaš obrazac. Moraš da poštuješ smisao kvadratnog korena i da vodiš računa o tome koje transformacije čuvaju, a koje samo proširuju skup rešenja."
      >
        <div className={s.grid3}>
          <SectionCard title="Domena postaje stalna tema">
            <p>
              Ista pažnja koju ovde razviješ biće ti potrebna kod logaritama,
              racionalnih funkcija, trigonometrijskih jednačina i u analizi
              funkcija. Ko nauči da proverava uslove na vreme, pravi manje
              grešaka u svakoj narednoj oblasti.
            </p>
          </SectionCard>
          <SectionCard title="Tipičan filter zadatak">
            <p>
              Ovakvi zadaci često izgledaju kratko, ali namerno testiraju da li
              ces mehanički kvadrirati. Jedan preskočen uslov može da te odvede
              do pogrešnog konačnog odgovora iako je račun cist.
            </p>
          </SectionCard>
          <SectionCard title="Vidis razliku između kandidata i rešenja">
            <p>
              Posle kvadriranja dobiješ algebarske kandidate. Tek kada ih vratis
              u originalnu jednačinu, znaš koja su stvarna rešenja. To
              razlikovanje je jedno od najvažnijih u celoj srednjoškolskoj
              algebri.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja"
        title="Šta zapravo rešavaš kada u jednačini vidiš koren"
        description="Iracionalna jednačina je jednačina u kojoj se nepoznata nalazi pod korenom. U ovoj lekciji fokus je na korenu parnog stepena, najčešće na kvadratnom korenu, jer tada postoje strogi uslovi pod kojima izraz uopste ima smisla."
      >
        <div className={s.grid2}>
          <SectionCard title="Iracionalna jednačina">
            <p>
              To je jednačina u kojoj se nepoznata pojavljuje unutar radikanda,
              na primer{" "}
              <InlineMath>{"\\sqrt{2x-1}=3"}</InlineMath>,{" "}
              <InlineMath>{"\\sqrt{x+5}=x-1"}</InlineMath> ili{" "}
              <InlineMath>{"\\sqrt{x+9}-\\sqrt{x}=3"}</InlineMath>.
            </p>
            <MathBlock>
              {"\\text{Ako je koren parnog stepena, mora važiti } A(x) \\ge 0."}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Koren nije obican simbol">
            <p>
              Kvadratni koren predstavlja nenegativan broj ciji je kvadrat dati
              radikand. Zato leva strana jednačine tipa{" "}
              <InlineMath>{"\\sqrt{A(x)}"}</InlineMath> nikada ne može biti
              negativna. Vec tu se pojavljuje prvi filter za moguća rešenja.
            </p>
            <MathBlock>{"\\sqrt{A(x)} \\ge 0"}</MathBlock>
          </SectionCard>
        </div>

        <InsightCard title="Najvažnija misaona poruka">
          <p>
            Kada vidiš koren parnog stepena, ne počinješ računanjem nego
            proverom uslova pod kojima je izraz definisan i pod kojima je
            naredni algebrajski korak dozvoljen.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto jednačina sqrt(2x+3) = -5 nema rešenje bez ikakvog računa?"
          answer={
            <p>
              Leva strana <InlineMath>{"\\sqrt{2x+3}"}</InlineMath> je, kad god
              postoji, nenegativna. Desna strana je{" "}
              <InlineMath>{"-5"}</InlineMath>, dakle negativna. Nenegativan broj
              ne može biti jednak negativnom broju, pa jednačina nema realna
              rešenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DOMENA I USLOVI ═══════════ */}
      <LessonSection
        id="domen"
        eyebrow="Domena i uslovi"
        title="Domena se piše pre kvadriranja, ne posle"
        description='Učenici često kažu: "Prvo cu da kvadriram, pa cu na kraju proveriti." To je rizicno. Bez domene i bez uslova znaka ne znaš da li si uopste smeo da napravis sledeći korak.'
      >
        <div className={s.grid3}>
          <SectionCard title="Radikand mora biti nenegativan">
            <p>
              Ako je jednačina oblika{" "}
              <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath>, prvo upisuješ{" "}
              <InlineMath>{"A(x)\\ge 0"}</InlineMath>. To je domen leve strane.
            </p>
            <MathBlock>{"A(x) \\ge 0"}</MathBlock>
          </SectionCard>

          <SectionCard title="Desna strana mora moci da bude vrednost korena">
            <p>
              Pošto je <InlineMath>{"\\sqrt{A(x)} \\ge 0"}</InlineMath>, mora
              važiti i <InlineMath>{"B(x)\\ge 0"}</InlineMath>. Tek tada
              kvadriranje čuva smisao jednačine.
            </p>
            <MathBlock>{"B(x) \\ge 0"}</MathBlock>
          </SectionCard>

          <SectionCard title="Najsigurnija ekvivalencija">
            <p>
              Umesto da pamtiš &ldquo;kvadriraj i nadaj se&rdquo;, pamti sistem
              uslova koji zaista odgovara originalnoj jednačini.
            </p>
            <MathBlock>
              {
                "\\sqrt{A(x)}=B(x) \\iff \\begin{cases} A(x)=B(x)^2 \\\\ B(x)\\ge 0 \\end{cases}"
              }
            </MathBlock>
          </SectionCard>
        </div>

        <h3 className={cs.tCardTitle} style={{ marginTop: 22 }}>
          Radni algoritam koji treba da automatizujes
        </h3>
        <div className={s.walkthrough}>
          <WalkStep number={1} title="Prepoznaj gde je koren i napiši domenu">
            <p>
              Za svaki koren parnog stepena napiši uslov da je radikand
              nenegativan.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Izoluj jedan koren">
            <p>
              Ako ima više članova sa korenima, prebaci sve ostalo na drugu
              stranu tako da jedan koren ostane sam. Tako kvadriranje ima jasan
              cilj.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Zapisi uslov znaka desne strane">
            <p>
              Jednačina <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> traži i
              uslov <InlineMath>{"B(x)\\ge 0"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Tek sada kvadriraj">
            <p>
              Posle kvadriranja dobiješ algebarsku jednačinu, najčešće kvadratnu
              ili linearnu. Njena rešenja su kandidati, ne konačan odgovor.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Ako je ostao koren, ponovi postupak">
            <p>
              Kod jednačina sa dva korena često treba kvadrirati dva puta, ali
              svaki put samo nakon nove izolacije i novog sagledavanja uslova.
            </p>
          </WalkStep>
          <WalkStep number={6} title="Proveri u originalnoj jednačini">
            <p>
              Provera se ne radi u kvadratnoj jednačini dobijenoj posle
              kvadriranja, nego baš u početnoj jednačini. Tu otpadaju lažna
              rešenja.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto u jednačini sqrt(x+5) = x-1 uslov x >= -5 nije dovoljan?"
          answer={
            <p>
              Uslov <InlineMath>{"x \\ge -5"}</InlineMath> garantuje samo da
              koren postoji. Ali leva strana je uvek nenegativna, pa i desna
              mora biti nenegativna. Zato mora važiti i{" "}
              <InlineMath>{"x-1 \\ge 0"}</InlineMath>, odnosno{" "}
              <InlineMath>{"x \\ge 1"}</InlineMath>. Tek kombinacija tih uslova
              daje siguran prostor za kvadriranje.
            </p>
          }
        />

        <MicroCheck
          question="Mikro-provera: zašto proveru radis u originalu, a ne u kvadratnoj jednačini posle kvadriranja?"
          answer={
            <p>
              Zato što je kvadriranje operacija koja može da ukloni informaciju
              o znaku. Ako dve strane samo kvadriraš, možeš dobiti dodatne
              kandidate koji zadovoljavaju kvadratnu jednačinu, ali ne i početnu.
              Originalna jednačina je jedino mesto gde vidiš da li je rešenje
              zaista tačno.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Laboratorija za domen i lažna rešenja"
        description="Ovde posmatraš jednačine oblika sqrt(ax+b) = cx+d. Narandžasto je graf funkcije y = sqrt(ax+b), plavo je prava y = cx+d. Njihovi preseci su stvarna rešenja. Kvadrirana jednačina može dati više kandidata nego što graf zaista pokazuje."
      >
        <IrrationalLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš sta ce se desiti sa domenom i
            kandidatima, pa tek onda proveri ekran. Posebno istražuj slučajeve
            kada desna strana postaje negativna — ti kandidati uvek otpadaju, a
            to je najčešća greška na prijemnom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od osnovne rutine do prijemne zamke"
        description="Primere citaj redom. Svaki naredni dodaje jednu novu ideju: najpre domen, zatim uslov znaka, onda lažno rešenje i na kraju izolaciju korena kada ih ima više."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: <InlineMath>{"\\sqrt{2x-1}=3"}</InlineMath>
            </h3>
            <p>
              Ovo je najosnovniji model. Desna strana je već nenegativna
              konstanta, pa je jedini poseban uslov domena leve strane.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domena">
                <p>Trazimo da izraz pod korenom bude nenegativan.</p>
                <MathBlock>
                  {"2x-1 \\ge 0 \\quad \\Rightarrow \\quad x \\ge \\frac{1}{2}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Kvadriranje">
                <p>
                  Pošto je desna strana <InlineMath>{"3"}</InlineMath>,
                  kvadriranje je bez dodatne komplikacije.
                </p>
                <MathBlock>
                  {
                    "2x-1=9 \\quad \\Rightarrow \\quad 2x=10 \\quad \\Rightarrow \\quad x=5"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Provera">
                <p>
                  Vracamo <InlineMath>{"x=5"}</InlineMath> u originalnu
                  jednačinu.
                </p>
                <MathBlock>{"\\sqrt{2\\cdot 5-1}=\\sqrt{9}=3"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: <InlineMath>{"\\sqrt{x+5}=x-1"}</InlineMath>
            </h3>
            <p>
              Ovo je klasican primer na kome se vidi kako nastaje lažno rešenje.
              Samo domen <InlineMath>{"x+5\\ge 0"}</InlineMath> nije dovoljan.
              Moraš da vodiš računa i o znaku desne strane.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uslovi pre kvadriranja">
                <p>
                  Leva strana postoji za{" "}
                  <InlineMath>{"x\\ge -5"}</InlineMath>, ali pošto je
                  nenegativna, mora važiti i{" "}
                  <InlineMath>{"x-1\\ge 0"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\begin{cases} x+5 \\ge 0 \\\\ x-1 \\ge 0 \\end{cases} \\Rightarrow x \\ge 1"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Kvadriranje i algebarsko resavanje">
                <p>Tek sada kvadriramo obe strane.</p>
                <MathBlock>{"x+5=(x-1)^2=x^2-2x+1"}</MathBlock>
                <MathBlock>
                  {"x^2-3x-4=0 \\quad \\Rightarrow \\quad (x-4)(x+1)=0"}
                </MathBlock>
                <MathBlock>{"x=4 \\quad \\text{ili} \\quad x=-1"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zašto x = -1 otpada">
                <p>
                  Kandidat <InlineMath>{"x=-1"}</InlineMath> zadovoljava
                  kvadratnu jednačinu, ali ne i originalnu. Tu se vidi da
                  kvadriranje širi skup kandidata.
                </p>
                <MathBlock>{"\\sqrt{-1+5}=2 \\neq -2 = -1-1"}</MathBlock>
                <MathBlock>{"\\sqrt{4+5}=3=4-1"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: <InlineMath>{"\\sqrt{2x+3}=-5"}</InlineMath>
            </h3>
            <p>
              Ne mora svaka jednačina da se rešava dugim računom. Dobar učenik
              prvo proverava da li zadatak već po logici znaka daje odgovor.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domena postoji, ali to nije dovoljno">
                <p>
                  Iz uslova pod korenom dobili bismo{" "}
                  <InlineMath>{"x\\ge -\\frac{3}{2}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uporedi znake strana">
                <p>
                  Leva strana je uvek nenegativna, a desna je stalno negativna.
                </p>
                <MathBlock>
                  {"\\sqrt{2x+3} \\ge 0 \\quad \\text{i} \\quad -5 < 0"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zaključak">
                <MathBlock>
                  {"\\text{Jednačina nema realnih rešenja.}"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: <InlineMath>{"\\sqrt{x+9}-\\sqrt{x}=3"}</InlineMath>
            </h3>
            <p>
              Kada imaš dva korena, ne kvadriraš naslepo celu jednačinu. Prvo
              izolujes jedan koren. Time dobiješ kontrolisanu situaciju u kojoj
              znaš sta radis.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domena i izolacija">
                <p>
                  Oba korena traže <InlineMath>{"x\\ge 0"}</InlineMath>.
                  Izolujemo prvi koren.
                </p>
                <MathBlock>{"\\sqrt{x+9}=3+\\sqrt{x}"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Kvadriranje">
                <p>
                  Desna strana je sigurno nenegativna, pa kvadriranje ima
                  smisla.
                </p>
                <MathBlock>{"x+9=(3+\\sqrt{x})^2=9+6\\sqrt{x}+x"}</MathBlock>
                <MathBlock>
                  {
                    "6\\sqrt{x}=0 \\quad \\Rightarrow \\quad \\sqrt{x}=0 \\quad \\Rightarrow \\quad x=0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Provera u originalu">
                <MathBlock>{"\\sqrt{0+9}-\\sqrt{0}=3-0=3"}</MathBlock>
                <p>
                  Dakle, jedino rešenje je <InlineMath>{"x=0"}</InlineMath>.
                  Primer pokazuje da je izolacija korena prvi pametan potez.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule i obrasci"
        title="Sažetak koji vredi držati u glavi"
        description="Ove kartice nisu zamena za razumevanje, ali su dobar završni filter kada proveravaš da li si rešio zadatak pravilnim redosledom."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Koren parnog stepena"
            formula={"\\sqrt{A(x)} \\text{ postoji samo ako } A(x)\\ge 0"}
            note="Ovo je prvi zapis u svesci. Bez njega ne počinješ resavanje."
          />
          <FormulaCard
            title="Model sqrt(A(x)) = B(x)"
            formula={"\\sqrt{A(x)}=B(x) \\iff \\begin{cases} A(x)=B(x)^2 \\\\ B(x)\\ge 0 \\end{cases}"}
            note="Ovo je najbezbedniji formalni zapis za školsko resavanje."
          />
          <FormulaCard
            title="Izoluj pa kvadriraj"
            formula={"\\sqrt{A(x)}+\\sqrt{B(x)}=c \\quad \\Rightarrow \\quad \\sqrt{A(x)}=c-\\sqrt{B(x)}"}
            note="Svako kvadriranje treba da prati jasna izolacija jednog korena."
          />
          <FormulaCard
            title="Provera u originalu"
            formula={"\\text{kandidat} \\longrightarrow \\text{vrati u početnu jednačinu}"}
            note="Ne proveravaš u pomoćnoj, nego u originalnoj jednačini."
          />
        </div>

        <InsightCard title="Važna napomena">
          <p>
            Izraz <InlineMath>{"\\sqrt{u^2}"}</InlineMath> nije jednak uvek{" "}
            <InlineMath>{"u"}</InlineMath>, nego{" "}
            <InlineMath>{"|u|"}</InlineMath>. Ova sitnica se često pojavi kada
            učenik posle kvadriranja i sredjivanja radi unazad bez pažnje.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube poeni"
        description="Sledeće greške nisu genericke. Ovo su baš one tačke na kojima iracionalne jednačine prave problem na testovima i kontrolnim zadacima."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preskocena domena</h3>
            <p>
              Učenik odmah kvadrira, pa tek na kraju gleda za koje{" "}
              <InlineMath>{"x"}</InlineMath> koren postoji. Tako često izgubi
              logiku zadatka već u prvom redu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nema uslova <InlineMath>{"B(x)\\ge 0"}</InlineMath>
            </h3>
            <p>
              Kod oblika <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> mnogi
              napisu samo <InlineMath>{"A(x)\\ge 0"}</InlineMath>, a zaborave da
              desna strana mora biti moguća vrednost kvadratnog korena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Provera u pogrešnoj jednačini</h3>
            <p>
              Kandidat proveravaju u kvadratnoj jednačini koja je nastala posle
              kvadriranja, umesto u originalu. Tako lažno rešenje izgleda kao
              tačno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Kvadriranje bez izolacije</h3>
            <p>
              Kada ima više korenova, kvadriranje cele jednačine bez plana pravi
              haos u računu i povecava sansu za grešku. Prvo izoluj jedan koren.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da ovu temu rešavaš brzo i sigurno na ispitu"
        description="Na prijemnom ne dobiješ poene za duzinu računa, nego za tacan odgovor. Zato ti treba kratak, pouzdan mentalni algoritam."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet pitanja pre nego što kreneš">
            <p>
              Prepiši sebi ovu logiku u glavi dok ne postane automatizam:
            </p>
            <MathBlock>
              {
                "\\text{1. Koja je domena?}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\text{2. Da li je druga strana nenegativna?}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\text{3. Da li je jedan koren izolovan?}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\text{4. Šta dobijam posle kvadriranja?}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\text{5. Da li sam proverio u originalu?}"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Kako da štediš vreme">
            <p>
              Ako je desna strana očigledno negativna, stani odmah. Ako su
              uslovi već suzili prostor na mali interval, koristi to da brze
              eliminišeš kandidate. Ne računaj više nego što treba.
            </p>
            <MathBlock>
              {
                "\\text{Dobar uslov na početku često štedi pola zadatka na kraju.}"
              }
            </MathBlock>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Proveri sebe bez gledanja u primere"
        description="Pokušaj najpre samostalno. Ako zapneš, otvori rešenje i ne gledaj samo rezultat, nego redosled misli."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Reši <InlineMath>{"\\sqrt{3x+1}=4"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"3x+1\\ge 0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"x\\ge -\\frac{1}{3}"}</InlineMath>. Kvadriranjem
                  dobijamo <InlineMath>{"3x+1=16"}</InlineMath>, pa je{" "}
                  <InlineMath>{"3x=15"}</InlineMath> i{" "}
                  <InlineMath>{"x=5"}</InlineMath>. Provera:{" "}
                  <InlineMath>{"\\sqrt{16}=4"}</InlineMath>.
                </p>
                <MathBlock>{"x=5"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Reši <InlineMath>{"\\sqrt{x+6}=x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Potrebno je <InlineMath>{"x+6\\ge 0"}</InlineMath>, ali i{" "}
                  <InlineMath>{"x\\ge 0"}</InlineMath>, jer desna strana mora
                  biti nenegativna. Kvadriranjem:{" "}
                  <InlineMath>{"x+6=x^2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x^2-x-6=0"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"(x-3)(x+2)=0"}</InlineMath>. Kandidati su{" "}
                  <InlineMath>{"x=3"}</InlineMath> i{" "}
                  <InlineMath>{"x=-2"}</InlineMath>.
                </p>
                <MathBlock>
                  {"\\text{Samo } x=3 \\text{ zadovoljava originalnu jednačinu.}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Reši <InlineMath>{"\\sqrt{5-x}=x-1"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uslovi su <InlineMath>{"5-x\\ge 0"}</InlineMath>, dakle{" "}
                  <InlineMath>{"x\\le 5"}</InlineMath>, i{" "}
                  <InlineMath>{"x-1\\ge 0"}</InlineMath>, dakle{" "}
                  <InlineMath>{"x\\ge 1"}</InlineMath>. Kvadriranjem dobijamo{" "}
                  <InlineMath>{"5-x=(x-1)^2=x^2-2x+1"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x^2-x-4=0"}</InlineMath>. Resenja te kvadratne
                  jednačine su{" "}
                  <InlineMath>{"x=\\frac{1\\pm\\sqrt{17}}{2}"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\text{Samo } x=\\frac{1+\\sqrt{17}}{2} \\text{ pripada intervalu } [1,5] \\text{ i zadovoljava original.}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Resi{" "}
                <InlineMath>{"\\sqrt{x+8}-\\sqrt{x}=2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Domena je <InlineMath>{"x\\ge 0"}</InlineMath>. Izolujemo
                  koren:{" "}
                  <InlineMath>{"\\sqrt{x+8}=2+\\sqrt{x}"}</InlineMath>.
                  Kvadriranjem dobijamo{" "}
                  <InlineMath>{"x+8=4+4\\sqrt{x}+x"}</InlineMath>, pa{" "}
                  <InlineMath>{"4=4\\sqrt{x}"}</InlineMath>, odnosno{" "}
                  <InlineMath>{"\\sqrt{x}=1"}</InlineMath>. Dakle{" "}
                  <InlineMath>{"x=1"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\text{Provera: } \\sqrt{9}-\\sqrt{1}=3-1=2"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Reši <InlineMath>{"\\sqrt{2x-1}=1-x"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>
                  Uslovi su <InlineMath>{"2x-1\\ge 0"}</InlineMath>, dakle{" "}
                  <InlineMath>{"x\\ge \\frac{1}{2}"}</InlineMath>, i{" "}
                  <InlineMath>{"1-x\\ge 0"}</InlineMath>, dakle{" "}
                  <InlineMath>{"x\\le 1"}</InlineMath>. Kvadriranjem:{" "}
                  <InlineMath>{"2x-1=(1-x)^2=1-2x+x^2"}</InlineMath>, pa je{" "}
                  <InlineMath>{"x^2-4x+2=0"}</InlineMath>. Kandidati su{" "}
                  <InlineMath>{"x=2\\pm\\sqrt{2}"}</InlineMath>.
                </p>
                <MathBlock>
                  {
                    "\\text{Samo } x=2-\\sqrt{2} \\text{ pripada intervalu } \\left[\\frac{1}{2},1\\right] \\text{ i zadovoljava original.}"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Objasni bez računa zasto{" "}
                <InlineMath>{"\\sqrt{x+2}=-3"}</InlineMath> nema rešenje.
              </p>
            }
            solution={
              <p>
                Kvadratni koren, kada postoji, daje nenegativnu vrednost. Zato
                leva strana ne može biti jednaka broju{" "}
                <InlineMath>{"-3"}</InlineMath>, koji je negativan. Jednačina
                nema realnih rešenja.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključni uvid"
        title="Iracionalna jednačina se ne rešava samo računanjem, nego kontrolom uslova"
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{domena} \\longrightarrow \\text{uslov znaka} \\longrightarrow \\text{kvadriranje} \\longrightarrow \\text{provera}"
            }
          </MathBlock>
          <p>
            Ako ovaj redosled usvojiš kao naviku, veliki deo zadataka iz ove
            oblasti postaje rutinski i siguran.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta obavezno nosiš iz ove lekcije"
        description="Pred prijemni ti ne treba deset nepovezanih trikova, nego nekoliko vrlo stabilnih ideja koje možeš da primeniš pod vremenom i pritiskom."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domena je prvi red u resenju</h3>
            <p>
              Kod korena parnog stepena uvek prvo tražiš da radikand bude
              nenegativan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Kvadriranje traži i uslov znaka
            </h3>
            <p>
              U modelu <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> moraš da
              vodiš računa da i <InlineMath>{"B(x)\\ge 0"}</InlineMath>, jer
              leva strana ne može biti negativna.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Svako rešenje je kandidat dok se ne proveri
            </h3>
            <p>
              Posle kvadriranja dobiješ kandidate. Konacno priznaješ samo ono
              što radi u originalu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak u učenju su{" "}
          <strong>iracionalne nejednačine</strong>, gde ista disciplina sa
          domenom ostaje obavezna, ali se dodaje još i analiza znakova i
          razdvajanje na slučajeve.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
