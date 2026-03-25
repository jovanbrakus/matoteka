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
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#domen", label: "Domena i uslovi" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#obrasci", label: "Kljucne formule" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson24Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 24"
        title={
          <>
            Iracionalne{" "}
            <span className={cs.tHeroAccent}>jednacine</span>
          </>
        }
        description="Iracionalne jednacine na prijemnom nisu teske zato sto su nepoznate, vec zato sto traze disciplinu. Ako preskocis domenu, uslov da druga strana bude nenegativna i proveru u originalu, lako dobijes lepo izracunato, a pogresno resenje. Ova lekcija te uci upravo toj disciplini."
        heroImageSrc="/api/lessons/24/hero"
        heroImageAlt="Apstraktna matematicka ilustracija za lekciju o iracionalnim jednacinama"
        cards={[
          {
            label: "Naucices",
            description:
              "Domen, izolacija, kvadriranje, provera — ne samo kako da racunas, nego i kojim redom da mislis dok resavas zadatak.",
          },
          {
            label: "Najveca zamka",
            description:
              "Kvadriranje brise informaciju o znaku. Kada kvadriras, mozes da prosiris skup kandidata i proizvedis lazno resenje.",
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
              "60 do 75 minuta — dovoljno da teoriju odmah spojis sa nekoliko tipicnih prijemnih zadataka.",
          },
          {
            label: "Predznanje",
            description:
              "Kvadratne jednacine — treba da umes faktorizaciju, diskriminantu i elementarnu proveru dobijenih kandidata.",
          },
          {
            label: "Glavna vestina",
            description:
              "Kontrola uslova — poenta nije u samom kvadriranju, nego u tome da ga uradis tek kada smes.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija — menjas koeficijente i vidis kako se menjaju domen, kandidati i stvarna resenja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Ovo je lekcija o matematickoj disciplini"
        description="Iracionalne jednacine su mali test zrelosti u racunanju. Nije dovoljno da znas obrazac. Moras da postujes smisao kvadratnog korena i da vodis racuna o tome koje transformacije cuvaju, a koje samo prosiruju skup resenja."
      >
        <div className={s.grid3}>
          <SectionCard title="Domena postaje stalna tema">
            <p>
              Ista paznja koju ovde razvijes bice ti potrebna kod logaritama,
              racionalnih funkcija, trigonometrijskih jednacina i u analizi
              funkcija. Ko nauci da proverava uslove na vreme, pravi manje
              gresaka u svakoj narednoj oblasti.
            </p>
          </SectionCard>
          <SectionCard title="Tipican filter zadatak">
            <p>
              Ovakvi zadaci cesto izgledaju kratko, ali namerno testiraju da li
              ces mehanicki kvadrirati. Jedan preskocen uslov moze da te odvede
              do pogresnog konacnog odgovora iako je racun cist.
            </p>
          </SectionCard>
          <SectionCard title="Vidis razliku izmedju kandidata i resenja">
            <p>
              Posle kvadriranja dobijes algebarske kandidate. Tek kada ih vratis
              u originalnu jednacinu, znas koja su stvarna resenja. To
              razlikovanje je jedno od najvaznijih u celoj srednjoskolskoj
              algebri.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja"
        title="Sta zapravo resavas kada u jednacini vidis koren"
        description="Iracionalna jednacina je jednacina u kojoj se nepoznata nalazi pod korenom. U ovoj lekciji fokus je na korenu parnog stepena, najcesce na kvadratnom korenu, jer tada postoje strogi uslovi pod kojima izraz uopste ima smisla."
      >
        <div className={s.grid2}>
          <SectionCard title="Iracionalna jednacina">
            <p>
              To je jednacina u kojoj se nepoznata pojavljuje unutar radikanda,
              na primer{" "}
              <InlineMath>{"\\sqrt{2x-1}=3"}</InlineMath>,{" "}
              <InlineMath>{"\\sqrt{x+5}=x-1"}</InlineMath> ili{" "}
              <InlineMath>{"\\sqrt{x+9}-\\sqrt{x}=3"}</InlineMath>.
            </p>
            <MathBlock>
              {"\\text{Ako je koren parnog stepena, mora vaziti } A(x) \\ge 0."}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Koren nije obican simbol">
            <p>
              Kvadratni koren predstavlja nenegativan broj ciji je kvadrat dati
              radikand. Zato leva strana jednacine tipa{" "}
              <InlineMath>{"\\sqrt{A(x)}"}</InlineMath> nikada ne moze biti
              negativna. Vec tu se pojavljuje prvi filter za moguca resenja.
            </p>
            <MathBlock>{"\\sqrt{A(x)} \\ge 0"}</MathBlock>
          </SectionCard>
        </div>

        <InsightCard title="Najvaznija misaona poruka">
          <p>
            Kada vidis koren parnog stepena, ne pocinjes racunanjem nego
            proverom uslova pod kojima je izraz definisan i pod kojima je
            naredni algebrajski korak dozvoljen.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zasto jednacina sqrt(2x+3) = -5 nema resenje bez ikakvog racuna?"
          answer={
            <p>
              Leva strana <InlineMath>{"\\sqrt{2x+3}"}</InlineMath> je, kad god
              postoji, nenegativna. Desna strana je{" "}
              <InlineMath>{"-5"}</InlineMath>, dakle negativna. Nenegativan broj
              ne moze biti jednak negativnom broju, pa jednacina nema realna
              resenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DOMENA I USLOVI ═══════════ */}
      <LessonSection
        id="domen"
        eyebrow="Domena i uslovi"
        title="Domena se pise pre kvadriranja, ne posle"
        description='Ucenici cesto kazu: "Prvo cu da kvadriram, pa cu na kraju proveriti." To je rizicno. Bez domene i bez uslova znaka ne znas da li si uopste smeo da napravis sledeci korak.'
      >
        <div className={s.grid3}>
          <SectionCard title="Radikand mora biti nenegativan">
            <p>
              Ako je jednacina oblika{" "}
              <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath>, prvo upisujes{" "}
              <InlineMath>{"A(x)\\ge 0"}</InlineMath>. To je domen leve strane.
            </p>
            <MathBlock>{"A(x) \\ge 0"}</MathBlock>
          </SectionCard>

          <SectionCard title="Desna strana mora moci da bude vrednost korena">
            <p>
              Posto je <InlineMath>{"\\sqrt{A(x)} \\ge 0"}</InlineMath>, mora
              vaziti i <InlineMath>{"B(x)\\ge 0"}</InlineMath>. Tek tada
              kvadriranje cuva smisao jednacine.
            </p>
            <MathBlock>{"B(x) \\ge 0"}</MathBlock>
          </SectionCard>

          <SectionCard title="Najsigurnija ekvivalencija">
            <p>
              Umesto da pamtis &ldquo;kvadriraj i nadaj se&rdquo;, pamti sistem
              uslova koji zaista odgovara originalnoj jednacini.
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
          <WalkStep number={1} title="Prepoznaj gde je koren i napisi domenu">
            <p>
              Za svaki koren parnog stepena napisi uslov da je radikand
              nenegativan.
            </p>
          </WalkStep>
          <WalkStep number={2} title="Izoluj jedan koren">
            <p>
              Ako ima vise clanova sa korenima, prebaci sve ostalo na drugu
              stranu tako da jedan koren ostane sam. Tako kvadriranje ima jasan
              cilj.
            </p>
          </WalkStep>
          <WalkStep number={3} title="Zapisi uslov znaka desne strane">
            <p>
              Jednacina <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> trazi i
              uslov <InlineMath>{"B(x)\\ge 0"}</InlineMath>.
            </p>
          </WalkStep>
          <WalkStep number={4} title="Tek sada kvadriraj">
            <p>
              Posle kvadriranja dobijes algebarsku jednacinu, najcesce kvadratnu
              ili linearnu. Njena resenja su kandidati, ne konacan odgovor.
            </p>
          </WalkStep>
          <WalkStep number={5} title="Ako je ostao koren, ponovi postupak">
            <p>
              Kod jednacina sa dva korena cesto treba kvadrirati dva puta, ali
              svaki put samo nakon nove izolacije i novog sagledavanja uslova.
            </p>
          </WalkStep>
          <WalkStep number={6} title="Proveri u originalnoj jednacini">
            <p>
              Provera se ne radi u kvadratnoj jednacini dobijenoj posle
              kvadriranja, nego bas u pocetnoj jednacini. Tu otpadaju lazna
              resenja.
            </p>
          </WalkStep>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto u jednacini sqrt(x+5) = x-1 uslov x >= -5 nije dovoljan?"
          answer={
            <p>
              Uslov <InlineMath>{"x \\ge -5"}</InlineMath> garantuje samo da
              koren postoji. Ali leva strana je uvek nenegativna, pa i desna
              mora biti nenegativna. Zato mora vaziti i{" "}
              <InlineMath>{"x-1 \\ge 0"}</InlineMath>, odnosno{" "}
              <InlineMath>{"x \\ge 1"}</InlineMath>. Tek kombinacija tih uslova
              daje siguran prostor za kvadriranje.
            </p>
          }
        />

        <MicroCheck
          question="Mikro-provera: zasto proveru radis u originalu, a ne u kvadratnoj jednacini posle kvadriranja?"
          answer={
            <p>
              Zato sto je kvadriranje operacija koja moze da ukloni informaciju
              o znaku. Ako dve strane samo kvadriras, mozes dobiti dodatne
              kandidate koji zadovoljavaju kvadratnu jednacinu, ali ne i pocetnu.
              Originalna jednacina je jedino mesto gde vidis da li je resenje
              zaista tacno.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Laboratorija za domen i lazna resenja"
        description="Ovde posmatras jednacine oblika sqrt(ax+b) = cx+d. Narandzasto je graf funkcije y = sqrt(ax+b), plavo je prava y = cx+d. Njihovi preseci su stvarna resenja. Kvadrirana jednacina moze dati vise kandidata nego sto graf zaista pokazuje."
      >
        <IrrationalLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis sta ce se desiti sa domenom i
            kandidatima, pa tek onda proveri ekran. Posebno istrazuj slucajeve
            kada desna strana postaje negativna — ti kandidati uvek otpadaju, a
            to je najcesca greska na prijemnom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Od osnovne rutine do prijemne zamke"
        description="Primere citaj redom. Svaki naredni dodaje jednu novu ideju: najpre domen, zatim uslov znaka, onda lazno resenje i na kraju izolaciju korena kada ih ima vise."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: <InlineMath>{"\\sqrt{2x-1}=3"}</InlineMath>
            </h3>
            <p>
              Ovo je najosnovniji model. Desna strana je vec nenegativna
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
                  Posto je desna strana <InlineMath>{"3"}</InlineMath>,
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
                  jednacinu.
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
              Ovo je klasican primer na kome se vidi kako nastaje lazno resenje.
              Samo domen <InlineMath>{"x+5\\ge 0"}</InlineMath> nije dovoljan.
              Moras da vodis racuna i o znaku desne strane.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uslovi pre kvadriranja">
                <p>
                  Leva strana postoji za{" "}
                  <InlineMath>{"x\\ge -5"}</InlineMath>, ali posto je
                  nenegativna, mora vaziti i{" "}
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
              <WalkStep number={3} title="Zasto x = -1 otpada">
                <p>
                  Kandidat <InlineMath>{"x=-1"}</InlineMath> zadovoljava
                  kvadratnu jednacinu, ali ne i originalnu. Tu se vidi da
                  kvadriranje siri skup kandidata.
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
              Ne mora svaka jednacina da se resava dugim racunom. Dobar ucenik
              prvo proverava da li zadatak vec po logici znaka daje odgovor.
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
              <WalkStep number={3} title="Zakljucak">
                <MathBlock>
                  {"\\text{Jednacina nema realnih resenja.}"}
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
              Kada imas dva korena, ne kvadriras naslepo celu jednacinu. Prvo
              izolujes jedan koren. Time dobijes kontrolisanu situaciju u kojoj
              znas sta radis.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Domena i izolacija">
                <p>
                  Oba korena traze <InlineMath>{"x\\ge 0"}</InlineMath>.
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
                  Dakle, jedino resenje je <InlineMath>{"x=0"}</InlineMath>.
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
        eyebrow="Kljucne formule i obrasci"
        title="Sazetak koji vredi drzati u glavi"
        description="Ove kartice nisu zamena za razumevanje, ali su dobar zavrsni filter kada proveravaš da li si resio zadatak pravilnim redosledom."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Koren parnog stepena"
            formula={"\\sqrt{A(x)} \\text{ postoji samo ako } A(x)\\ge 0"}
            note="Ovo je prvi zapis u svesci. Bez njega ne pocinjes resavanje."
          />
          <FormulaCard
            title="Model sqrt(A(x)) = B(x)"
            formula={"\\sqrt{A(x)}=B(x) \\iff \\begin{cases} A(x)=B(x)^2 \\\\ B(x)\\ge 0 \\end{cases}"}
            note="Ovo je najbezbedniji formalni zapis za skolsko resavanje."
          />
          <FormulaCard
            title="Izoluj pa kvadriraj"
            formula={"\\sqrt{A(x)}+\\sqrt{B(x)}=c \\quad \\Rightarrow \\quad \\sqrt{A(x)}=c-\\sqrt{B(x)}"}
            note="Svako kvadriranje treba da prati jasna izolacija jednog korena."
          />
          <FormulaCard
            title="Provera u originalu"
            formula={"\\text{kandidat} \\longrightarrow \\text{vrati u pocetnu jednacinu}"}
            note="Ne proveravaš u pomocnoj, nego u originalnoj jednacini."
          />
        </div>

        <InsightCard title="Vazna napomena">
          <p>
            Izraz <InlineMath>{"\\sqrt{u^2}"}</InlineMath> nije jednak uvek{" "}
            <InlineMath>{"u"}</InlineMath>, nego{" "}
            <InlineMath>{"|u|"}</InlineMath>. Ova sitnica se cesto pojavi kada
            ucenik posle kvadriranja i sredjivanja radi unazad bez paznje.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Ovde se najcesce gube poeni"
        description="Sledece greske nisu genericke. Ovo su bas one tacke na kojima iracionalne jednacine prave problem na testovima i kontrolnim zadacima."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preskocena domena</h3>
            <p>
              Ucenik odmah kvadrira, pa tek na kraju gleda za koje{" "}
              <InlineMath>{"x"}</InlineMath> koren postoji. Tako cesto izgubi
              logiku zadatka vec u prvom redu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nema uslova <InlineMath>{"B(x)\\ge 0"}</InlineMath>
            </h3>
            <p>
              Kod oblika <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> mnogi
              napisu samo <InlineMath>{"A(x)\\ge 0"}</InlineMath>, a zaborave da
              desna strana mora biti moguca vrednost kvadratnog korena.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Provera u pogresnoj jednacini</h3>
            <p>
              Kandidat proveravaju u kvadratnoj jednacini koja je nastala posle
              kvadriranja, umesto u originalu. Tako lazno resenje izgleda kao
              tacno.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Kvadriranje bez izolacije</h3>
            <p>
              Kada ima vise korenova, kvadriranje cele jednacine bez plana pravi
              haos u racunu i povecava sansu za gresku. Prvo izoluj jedan koren.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da ovu temu resavas brzo i sigurno na ispitu"
        description="Na prijemnom ne dobijes poene za duzinu racuna, nego za tacan odgovor. Zato ti treba kratak, pouzdan mentalni algoritam."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet pitanja pre nego sto krenes">
            <p>
              Prepisi sebi ovu logiku u glavi dok ne postane automatizam:
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
                "\\text{4. Sta dobijam posle kvadriranja?}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\text{5. Da li sam proverio u originalu?}"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Kako da stedis vreme">
            <p>
              Ako je desna strana ocigledno negativna, stani odmah. Ako su
              uslovi vec suzili prostor na mali interval, koristi to da brze
              eliminises kandidate. Ne racunaj vise nego sto treba.
            </p>
            <MathBlock>
              {
                "\\text{Dobar uslov na pocetku cesto stedi pola zadatka na kraju.}"
              }
            </MathBlock>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe"
        title="Proveri sebe bez gledanja u primere"
        description="Pokusaj najpre samostalno. Ako zapnes, otvori resenje i ne gledaj samo rezultat, nego redosled misli."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Resi <InlineMath>{"\\sqrt{3x+1}=4"}</InlineMath>.
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
                Resi <InlineMath>{"\\sqrt{x+6}=x"}</InlineMath>.
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
                  {"\\text{Samo } x=3 \\text{ zadovoljava originalnu jednacinu.}"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Resi <InlineMath>{"\\sqrt{5-x}=x-1"}</InlineMath>.
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
                  jednacine su{" "}
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
                Resi <InlineMath>{"\\sqrt{2x-1}=1-x"}</InlineMath>.
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
                Objasni bez racuna zasto{" "}
                <InlineMath>{"\\sqrt{x+2}=-3"}</InlineMath> nema resenje.
              </p>
            }
            solution={
              <p>
                Kvadratni koren, kada postoji, daje nenegativnu vrednost. Zato
                leva strana ne moze biti jednaka broju{" "}
                <InlineMath>{"-3"}</InlineMath>, koji je negativan. Jednacina
                nema realnih resenja.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Kljucni uvid"
        title="Iracionalna jednacina se ne resava samo racunanjem, nego kontrolom uslova"
      >
        <InsightCard title="Najvazniji princip">
          <MathBlock>
            {
              "\\text{domena} \\longrightarrow \\text{uslov znaka} \\longrightarrow \\text{kvadriranje} \\longrightarrow \\text{provera}"
            }
          </MathBlock>
          <p>
            Ako ovaj redosled usvojis kao naviku, veliki deo zadataka iz ove
            oblasti postaje rutinski i siguran.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta obavezno nosis iz ove lekcije"
        description="Pred prijemni ti ne treba deset nepovezanih trikova, nego nekoliko vrlo stabilnih ideja koje mozes da primenis pod vremenom i pritiskom."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Domena je prvi red u resenju</h3>
            <p>
              Kod korena parnog stepena uvek prvo trazis da radikand bude
              nenegativan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Kvadriranje trazi i uslov znaka
            </h3>
            <p>
              U modelu <InlineMath>{"\\sqrt{A(x)}=B(x)"}</InlineMath> moras da
              vodis racuna da i <InlineMath>{"B(x)\\ge 0"}</InlineMath>, jer
              leva strana ne moze biti negativna.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Svako resenje je kandidat dok se ne proveri
            </h3>
            <p>
              Posle kvadriranja dobijes kandidate. Konacno priznaješ samo ono
              sto radi u originalu.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeci logican korak u ucenju su{" "}
          <strong>iracionalne nejednacine</strong>, gde ista disciplina sa
          domenom ostaje obavezna, ali se dodaje jos i analiza znakova i
          razdvajanje na slucajeve.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
