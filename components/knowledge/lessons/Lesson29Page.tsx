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
import LogarithmLab from "./LogarithmLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#definicija", label: "Definicija" },
  { href: "#inverznost", label: "Inverznost" },
  { href: "#pravila", label: "Pravila" },
  { href: "#promena-baze", label: "Promena baze" },
  { href: "#interaktivni", label: "Interaktivni lab" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#obrasci", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson29Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 29"
        title={
          <>
            Pojam logaritma i{" "}
            <span className={cs.tHeroAccent}>pravila logaritmovanja</span>
          </>
        }
        description='Logaritam nije nova "cudna" operacija, već drugo lice eksponenciranja. Kada pitas "na koji stepen treba dici bazu da dobijem zadati broj?", već si postavio logaritamsko pitanje. Ova lekcija gradi taj smisao, a zatim pokazuje kako pravila logaritmovanja postaju prirodna posledica rada sa eksponentima.'
        heroImageSrc="/api/lessons/29/hero"
        heroImageAlt="Apstraktna matematička ilustracija za lekciju o logaritmima"
        cards={[
          {
            label: "Šta učiš",
            description:
              "Kako da prevodis između eksponencijalnog i logaritamskog jezika bez napamet naučenih koraka.",
          },
          {
            label: "Najveća zamka",
            description:
              "log_a(x+y) nije zbir logaritama, a baza i argument moraju da zadovolje uslove.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci često traze istovremenu primenu više pravila i dobar osećaj za promenu baze.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "90 do 110 minuta. Vredi uloziti vreme, jer ova lekcija otvara vrata jednačinama, nejednačinama i grafiku logaritma.",
          },
          {
            label: "Predznanje",
            description:
              "Stepeni i eksponencijalna funkcija. Bez sigurnog rada sa potencijama, pravila logaritmovanja deluju nasumično umešto logicno.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevođenje i prepoznavanje obrasca. Na prijemnom često pobedjuje onaj ko brzo vidi koji zakon logaritmovanja treba primeniti.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas logaritamska masina. Vizuelno pratis kako se iz eksponenata dobijaju pravila za proizvod, kolicnik i stepen logaritma.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Logaritam je jezik kojim opišujes eksponent koji tražis"
        description="Cim ne možes lako da vidiš koji stepen daje zadati broj, prirodno je da uvedes logaritam. Zato logaritmi nisu sporedna tema, već most između eksponencijalnog misljenja i kasnijih zadataka iz funkcija, jednačina i nejednačina."
      >
        <div className={s.grid3}>
          <SectionCard title="Veza sa prethodnim znanjem">
            <p>
              Logaritam nastaje kao obrnuti proćeš eksponenciranju. Ako je
              eksponencijalna funkcija govorila &ldquo;dizi bazu na
              stepen&rdquo;, logaritam odgovara na pitanje koji je to stepen.
            </p>
          </SectionCard>
          <SectionCard title="Prijemni zadaci">
            <p>
              Na testu se često proverava da li razlikuješ vazeca i nevazeca
              pravila. Najčešće zamke su širenje pravila na zbir, mešanje baze i
              argumenta i pogrešna promena baze.
            </p>
          </SectionCard>
          <SectionCard title="Kasnija korist">
            <p>
              Bez ove lekcije teško postaju stabilne logaritamske jednačine i
              grafik funkcije. Ko sada dobro postavi definiciju i pravila, mnogo
              lakse kontrolise naredne lekcije.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Kada vidiš logaritam, prvo pomisli na eksponent i proveri uslove. Tek
            posle toga razmisljaj o pravilima za proizvod, kolicnik, stepen ili
            promenu baze.
          </p>
        </InsightCard>

        <MicroCheck
          question='Mikro-provera: zašto logaritam nije "samo još jedna oznaka"?'
          answer={
            <p>
              Zato sto precizno odgovara na pitanje o eksponentu. Na primer,{" "}
              <InlineMath>{"\\log_2 8"}</InlineMath> nije ukrasni zapis nego broj
              koji kaze na koji stepen treba dici <InlineMath>{"2"}</InlineMath>{" "}
              da bi se dobilo <InlineMath>{"8"}</InlineMath>. To odmah daje
              smisao i svim kasnijim pravilima.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DEFINICIJA I USLOVI ═══════════ */}
      <LessonSection
        id="definicija"
        eyebrow="Definicija i uslovi"
        title="Šta tačno znači log_a b"
        description="Kada napišemo log_a b = c, tvrdimo da je c onaj eksponent na koji treba podici bazu a da bi se dobio broj b. Ovo je formalno i najvažnije znacenje logaritma."
      >
        <div className={s.grid2}>
          <SectionCard title="Logaritam je eksponent zapisan drugim jezikom">
            <MathBlock>{"\\log_a b = c \\iff a^c = b"}</MathBlock>
            <p>
              Leva strana je logaritamski zapis, a desna eksponencijalni. U
              praksi stalno prelazis s jednog zapisa na drugi, jer ti jedan ili
              drugi bude pogodniji za računanje.
            </p>
          </SectionCard>

          <SectionCard title="Baza i argument nisu proizvoljni">
            <ul>
              <li>
                Baza mora da bude pozitivna: <InlineMath>{"a>0"}</InlineMath>.
              </li>
              <li>
                Baza ne sme biti <InlineMath>{"1"}</InlineMath>:{" "}
                <InlineMath>{"a \\neq 1"}</InlineMath>.
              </li>
              <li>
                Argument mora biti pozitivan: <InlineMath>{"b>0"}</InlineMath>.
              </li>
              <li>
                Zato izrazi poput <InlineMath>{"\\log_1 7"}</InlineMath>,{" "}
                <InlineMath>{"\\log_{-2} 8"}</InlineMath> i{" "}
                <InlineMath>{"\\log_3(-9)"}</InlineMath> nisu definisani.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Primer: log_2 8 = 3">
            <MathBlock>{"\\log_2 8 = 3"}</MathBlock>
            <p>
              Zato sto je <InlineMath>{"2^3=8"}</InlineMath>. Trazeni eksponent
              je <InlineMath>{"3"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Primer: log_5 1 = 0">
            <MathBlock>{"\\log_5 1 = 0"}</MathBlock>
            <p>
              Svaka dozvoljena baza na nulti stepen daje{" "}
              <InlineMath>{"1"}</InlineMath>, pa je logaritam od{" "}
              <InlineMath>{"1"}</InlineMath> uvek nula.
            </p>
          </SectionCard>
          <SectionCard title="Primer: log_{1/2} 8 = -3">
            <MathBlock>{"\\log_{\\frac{1}{2}} 8 = -3"}</MathBlock>
            <p>
              Zaista,{" "}
              <InlineMath>{"\\left(\\frac{1}{2}\\right)^{-3}=8"}</InlineMath>.
              Ovo lepo pokazuje da logaritam može biti i negativan.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: kako glasi eksponencijalni zapis tvrdnje log_3 81 = 4?"
          answer={
            <p>
              Direktno po definiciji dobijas{" "}
              <InlineMath>{"3^4=81"}</InlineMath>. Uvek prevodi obe strane, ne
              pokušavaj da pamtiš posebne trikove za svaki tip zadatka.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INVERZNOST ═══════════ */}
      <LessonSection
        id="inverznost"
        eyebrow="Inverznost"
        title="Zašto su eksponencijalna i logaritamska priča dve strane istog procesa"
        description="Eksponenciranje i logaritmovanje se ponisavaju kada su baza i argument pravilno postavljeni. Ta ideja je toliko važna da je vredi izdvojiti posebno, jer kasnije objasnjava i grafik logaritamske funkcije i mnoga skraćenja u računu."
      >
        <div className={s.grid2}>
          <SectionCard title="Eksponenciranje poništava logaritam">
            <MathBlock>{"a^{\\log_a x} = x, \\qquad x > 0"}</MathBlock>
            <p>
              Ako je <InlineMath>{"\\log_a x"}</InlineMath> upravo eksponent koji
              daje <InlineMath>{"x"}</InlineMath>, onda vraćanjem baze{" "}
              <InlineMath>{"a"}</InlineMath> na taj eksponent dobijas pocetni
              broj.
            </p>
          </SectionCard>

          <SectionCard title="Logaritam poništava stepen baze">
            <MathBlock>{"\\log_a(a^x) = x"}</MathBlock>
            <p>
              Ovde je važna stvar da je baza ista. Ako menjas bazu, više nema
              direktnog ponisavanja, već treba uključiti promenu baze ili
              prepisivanje brojeva.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title='Logaritam meri "koliko puta" baza mora da se upotrebi kroz eksponent'>
            <p>
              Zato <InlineMath>{"\\log_{10} 1000 = 3"}</InlineMath>, ali i{" "}
              <InlineMath>{"\\log_2 \\frac{1}{8} = -3"}</InlineMath>. U oba
              slučaja logaritam kaze koji eksponent radi posao, bilo da je
              pozitivan ili negativan.
            </p>
          </SectionCard>
          <SectionCard title="Ako vidiš log_3 x = 4, ne rešavaj silom">
            <p>
              Samo pređi na eksponencijalni zapis:{" "}
              <InlineMath>{"x=3^4=81"}</InlineMath>. Upravo ta brzina
              prevodjenja štedi vreme na prijemnom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li je log_2(2^5) = 5 ili 32?"
          answer={
            <p>
              Rezultat je <InlineMath>{"5"}</InlineMath>, jer logaritam vraća
              eksponent. Broj <InlineMath>{"32"}</InlineMath> bi bio rezultat
              izraza <InlineMath>{"2^5"}</InlineMath>, ali logaritam ga pretvara
              nazad u eksponent.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PRAVILA LOGARITMOVANJA ═══════════ */}
      <LessonSection
        id="pravila"
        eyebrow="Pravila logaritmovanja"
        title="Zašto proizvod postaje zbir, a kolicnik razlika"
        description="Ova pravila nisu proizvoljna. Ona dolaze iz zakona stepena. Ako je x = a^u i y = a^v, tada je xy = a^{u+v}, pa je logaritam proizvoda upravo zbir logaritama."
      >
        <div
          className={s.formulaGrid}
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <FormulaCard
            title="Proizvod"
            formula={"\\log_a(xy) = \\log_a x + \\log_a y"}
            note={
              <>
                Na primer,{" "}
                <InlineMath>
                  {"\\log_2 8 + \\log_2 4 = \\log_2 32"}
                </InlineMath>
                .
              </>
            }
          />
          <FormulaCard
            title="Kolicnik"
            formula={"\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y"}
            note={
              <>
                Na primer,{" "}
                <InlineMath>
                  {"\\log_3 54 - \\log_3 2 = \\log_3 27"}
                </InlineMath>
                .
              </>
            }
          />
          <FormulaCard
            title="Stepen"
            formula={"\\log_a(x^n) = n\\log_a x"}
            note={
              <>
                Zato <InlineMath>{"2\\log_3 5 = \\log_3 25"}</InlineMath>, a{" "}
                <InlineMath>{"3\\log_2 5 = \\log_2 125"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Koren"
            formula={"\\log_a\\sqrt[n]{x} = \\frac{1}{n}\\log_a x"}
            note={
              <>
                Ovo je direktna posledica pravila za stepen, jer je{" "}
                <InlineMath>{"\\sqrt[n]{x} = x^{1/n}"}</InlineMath>.
              </>
            }
          />
        </div>

        <InsightCard title="Vrlo važna zabrana">
          <p>
            Ne postoji opšte pravilo{" "}
            <InlineMath>
              {"\\log_a(x+y) = \\log_a x + \\log_a y"}
            </InlineMath>
            . Pravila vaze za proizvod, kolicnik i stepen, ne za zbir i razliku.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto je log_2 3 + log_2 5 = log_2 15, a ne log_2 8?"
          answer={
            <p>
              Zato sto zbir logaritama znači logaritam proizvoda:{" "}
              <InlineMath>{"\\log_2(3 \\cdot 5) = \\log_2 15"}</InlineMath>.
              Broj <InlineMath>{"8"}</InlineMath> bi nastao kada bi neko pogrešno
              &ldquo;sabirao unutra&rdquo;, a to nije dozvoljeno.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PROMENA BAZE ═══════════ */}
      <LessonSection
        id="promena-baze"
        eyebrow="Promena baze"
        title="Kada ne možes lako da radiš u jednoj bazi, prebaci se u drugu"
        description="Promena baze je praktican alat. Nekad služi da logaritam izračunaš preko kalkulatora, a nekad da zadatak svedeš na bazu koja ti je prirodnija, kao sto su 2, 3, 10 ili e."
      >
        <div className={s.grid2}>
          <SectionCard title="Isti logaritam, druga baza">
            <MathBlock>
              {"\\log_a x = \\frac{\\log_b x}{\\log_b a}"}
            </MathBlock>
            <p>
              Posebno su praktični izbori{" "}
              <InlineMath>{"b=10"}</InlineMath> i{" "}
              <InlineMath>{"b=e"}</InlineMath>, jer ih kalkulator obično vec
              podrzava kroz tastere{" "}
              <InlineMath>{"\\log"}</InlineMath> i{" "}
              <InlineMath>{"\\ln"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title='Često je pametnije promeniti bazu nego "nasilno" računati'>
            <p>
              Ako je zadatak <InlineMath>{"\\log_4 8"}</InlineMath>, možes odmah
              preci na bazu <InlineMath>{"2"}</InlineMath>:
            </p>
            <MathBlock>
              {"\\log_4 8 = \\frac{\\log_2 8}{\\log_2 4} = \\frac{3}{2}"}
            </MathBlock>
          </SectionCard>
        </div>

        <div className={s.grid3}>
          <SectionCard title="Kalkulator">
            <p>
              <InlineMath>{"\\log_2 7"}</InlineMath> pišeš kao{" "}
              <InlineMath>
                {"\\log_2 7 = \\frac{\\log 7}{\\log 2}"}
              </InlineMath>
              . Ne mora svaki logaritam imati &ldquo;lep&rdquo; stepen.
            </p>
          </SectionCard>
          <SectionCard title="Povezane baze">
            <p>
              <InlineMath>{"\\log_9 27"}</InlineMath> &mdash; prelaz na bazu{" "}
              <InlineMath>{"3"}</InlineMath> daje{" "}
              <InlineMath>
                {"\\frac{\\log_3 27}{\\log_3 9} = \\frac{3}{2}"}
              </InlineMath>
              .
            </p>
          </SectionCard>
          <SectionCard title="Redosled je važan">
            <p>
              Ispravno je{" "}
              <InlineMath>
                {"\\frac{\\log_b x}{\\log_b a}"}
              </InlineMath>
              , a ne obrnuto. Zamenom brojilaca i imenilaca dobijas pogresan
              rezultat.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto log_4 8 nije jednako log 4 / log 8?"
          answer={
            <p>
              Zato sto formula glasi{" "}
              <InlineMath>
                {"\\log_a x = \\frac{\\log x}{\\log a}"}
              </InlineMath>
              . Ovde je baza <InlineMath>{"4"}</InlineMath>, a argument{" "}
              <InlineMath>{"8"}</InlineMath>, pa je ispravno{" "}
              <InlineMath>
                {"\\log_4 8 = \\frac{\\log 8}{\\log 4}"}
              </InlineMath>
              , a ne obrnuto.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: logaritamska masina"
        description="U laboratoriji biras bazu a, eksponente u i v, kao i stepen n. Zatim pratis brojeve x = a^u i y = a^v, pa vidiš kako logaritam proizvoda daje u+v, logaritam kolicnika u-v, a logaritam stepena n*u."
      >
        <LogarithmLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa eksponentima, pa tek
            onda proveri ekran. Ako primećuješ da se proizvodom eksponenti
            sabiraju, a kolicnikom oduzimaju, upravo to i jeste poenta: logaritmi
            prevode množenje u sabiranje.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto je baš proizvod povezan sa sabiranjem logaritama?"
          answer={
            <p>
              Ako su <InlineMath>{"x=a^u"}</InlineMath> i{" "}
              <InlineMath>{"y=a^v"}</InlineMath>, tada je{" "}
              <InlineMath>{"xy=a^u \\cdot a^v = a^{u+v}"}</InlineMath>. Posto
              logaritam meri eksponent, logaritam proizvoda mora da vrati zbir{" "}
              <InlineMath>{"u+v"}</InlineMath>. Isto razmisljanje daje i pravila
              za kolicnik i stepen.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Detaljni zadaci, od definicije do promene baze"
        description="Svaki primer ima jasan cilj: ili da učvrsti smisao definicije, ili da pokaze tacnu upotrebu pravila. Gledaj ne samo rezultat, nego i razlog zašto je izabran baš taj korak."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izračunaj <InlineMath>{"\\log_2 32"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Pitaj se: na koji stepen treba podici 2 da bi se dobilo 32?"
              />
              <WalkStep number={2} title="Prepoznaj stepen.">
                <p>
                  Posto je <InlineMath>{"2^5=32"}</InlineMath>, traženi
                  eksponent je <InlineMath>{"5"}</InlineMath>.
                </p>
                <MathBlock>{"\\log_2 32 = 5"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Izračunaj{" "}
              <InlineMath>{"\\log_{\\frac{1}{2}} 8"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Tražis eksponent <InlineMath>{"c"}</InlineMath> takav da{" "}
                    <InlineMath>
                      {"\\left(\\frac{1}{2}\\right)^c = 8"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep number={2} title="Izračunaj.">
                <p>
                  Posto je{" "}
                  <InlineMath>
                    {"\\left(\\frac{1}{2}\\right)^{-3} = 8"}
                  </InlineMath>
                  , sledi:
                </p>
                <MathBlock>{"\\log_{\\frac{1}{2}} 8 = -3"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Reši <InlineMath>{"\\log_3 x = 4"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Prevedi logaritamski zapis u eksponencijalni."
              >
                <MathBlock>{"\\log_3 x = 4 \\iff 3^4 = x"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Izračunaj <InlineMath>{"3^4"}</InlineMath>.
                  </>
                }
              >
                <MathBlock>{"x = 81"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Sredi{" "}
              <InlineMath>
                {"\\log_2 8 + \\log_2 4 - \\log_2 2"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Spoji zbir u proizvod.">
                <MathBlock>
                  {
                    "\\log_2 8 + \\log_2 4 = \\log_2(8 \\cdot 4) = \\log_2 32"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Primeni pravilo za kolicnik.">
                <MathBlock>
                  {
                    "\\log_2 32 - \\log_2 2 = \\log_2\\left(\\frac{32}{2}\\right) = \\log_2 16"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Prepoznaj vrednost.">
                <MathBlock>{"\\log_2 16 = 4"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Sredi{" "}
              <InlineMath>{"2\\log_3 5 - \\log_3 15"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Eksponent prebaci u argument.">
                <MathBlock>{"2\\log_3 5 = \\log_3 25"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Iskoristi pravilo za kolicnik.">
                <MathBlock>
                  {
                    "\\log_3 25 - \\log_3 15 = \\log_3\\left(\\frac{25}{15}\\right) = \\log_3\\left(\\frac{5}{3}\\right)"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Izračunaj <InlineMath>{"\\log_4 8"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Promeni bazu na 2, jer su i 4 i 8 stepeni dvojke."
              >
                <MathBlock>
                  {"\\log_4 8 = \\frac{\\log_2 8}{\\log_2 4}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj oba logaritma posebno.">
                <MathBlock>
                  {"\\log_2 8 = 3, \\qquad \\log_2 4 = 2"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Zavrsi.">
                <MathBlock>{"\\log_4 8 = \\frac{3}{2}"}</MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto u petom primeru ne ostaje 2 log_3 5 kao konacan odgovor?"
          answer={
            <p>
              Zato sto je cilj obično da izraz svedeš na jedan logaritam ili na
              sto jednostavniji oblik. Pravilo stepena omogućava upravo to:
              koeficijent prelazi u eksponent argumenta.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="obrasci"
        eyebrow="Ključne formule"
        title="Formula-vault za brzo obnavljanje"
        description='Ovde su skupljene formule koje treba da budu potpuno sigurne. Ako neku od njih moraš da "rekonstruises" pod pritiskom, gubiš vreme koje na prijemnom nemas.'
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Definicija"
            formula={"\\log_a b = c \\iff a^c = b"}
          />
          <FormulaCard
            title="Uslovi"
            formula={"a > 0, \\quad a \\neq 1, \\quad b > 0"}
          />
          <FormulaCard
            title="Inverznost"
            formula={"a^{\\log_a x} = x, \\qquad \\log_a(a^x) = x"}
          />
          <FormulaCard
            title="Proizvod i kolicnik"
            formula={"\\log_a(xy) = \\log_a x + \\log_a y, \\qquad \\log_a\\!\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y"}
          />
          <FormulaCard
            title="Stepen"
            formula={"\\log_a(x^n) = n\\log_a x"}
          />
          <FormulaCard
            title="Promena baze"
            formula={"\\log_a x = \\frac{\\log_b x}{\\log_b a}"}
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Tipične greške koje kvare inače lagan zadatak"
        description="Većina poena se ovde ne gubi na teskim idejama, nego na prebrzom pisanju pogrešnog pravila. Zato je korisno da ove zamke vidiš unapred."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Sirenje pravila na zbir</h3>
            <p>
              <strong>Pogrešno:</strong>{" "}
              <InlineMath>
                {"\\log_a(x+y) = \\log_a x + \\log_a y"}
              </InlineMath>
              . Pravila vaze za proizvod, kolicnik i stepen, ne za zbir.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljanje uslova definisanosti
            </h3>
            <p>
              <strong>Podsetnik:</strong> baza mora biti pozitivna i različita od{" "}
              <InlineMath>{"1"}</InlineMath>, a argument pozitivan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Mešanje baze i argumenta</h3>
            <p>
              <InlineMath>{"\\log_2 8"}</InlineMath> i{" "}
              <InlineMath>{"\\log_8 2"}</InlineMath> nisu isti broj. U prvom
              slučaju rezultat je <InlineMath>{"3"}</InlineMath>, u drugom{" "}
              <InlineMath>{"\\frac{1}{3}"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna promena baze</h3>
            <p>
              Ispravno je{" "}
              <InlineMath>
                {"\\log_a x = \\frac{\\log x}{\\log a}"}
              </InlineMath>
              . Ako obrnes razlomak, dobijas pogresan rezultat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje{" "}
              <InlineMath>{"\\log_a(x^2)"}</InlineMath> i{" "}
              <InlineMath>{"(\\log_a x)^2"}</InlineMath>
            </h3>
            <p>
              Razlika je velika: prvo je{" "}
              <InlineMath>{"2\\log_a x"}</InlineMath>, a drugo kvadrat vec
              izračunatog logaritma.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Očekivanje da svaki logaritam bude ceo broj
            </h3>
            <p>
              <InlineMath>{"\\log_4 8 = \\frac{3}{2}"}</InlineMath>. Logaritam
              je broj, ali ne mora biti ceo.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako da organizuješ rešavanje pod pritiskom vremena"
        description="Na prijemnom se logaritmi retko pojavljuju sami. Obično traze da brzo odlučiš da li broj možes odmah prepoznati kao stepen baze, da li treba primeniti neko pravilo ili je vreme za promenu baze."
      >
        <div className={s.grid2}>
          <SectionCard title="Pet koraka koji štede vreme">
            <ul>
              <li>
                Proveri uslove: baza pozitivna i različita od{" "}
                <InlineMath>{"1"}</InlineMath>, argument pozitivan.
              </li>
              <li>Zapitaj se da li broj možes da napišeš kao stepen baze.</li>
              <li>
                Ako vidiš zbir ili razliku logaritama iste baze, razmisljaj o
                proizvodu ili kolicniku.
              </li>
              <li>
                Ako vidiš koeficijent ispred logaritma, proveri da li treba
                pravilo stepena.
              </li>
              <li>Ako baza nije zgodna, pređi na novu bazu.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta zadatak pokušava da ti sakrije">
            <ul>
              <li>
                Zbir unutar logaritma, da bi proverio da li širiš pravilo tamo
                gde ne važi.
              </li>
              <li>
                Brojeve poput <InlineMath>{"8"}</InlineMath> i{" "}
                <InlineMath>{"4"}</InlineMath>, da vidiš da li prepoznaješ
                stepen dvojke.
              </li>
              <li>
                Razlomke i negativne eksponente, da proveri negativne logaritme.
              </li>
              <li>Nezgodnu bazu, da proveri da li znaš promenu baze.</li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Najkorisnija misaona navika">
          <p>
            Ne pitaj odmah &ldquo;koje pravilo ovde pišem?&rdquo;, nego
            &ldquo;šta ovaj logaritam zapravo meri?&rdquo;. Kada to shvatiš,
            izbor pravila je mnogo prirodniji.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li umeš samostalno"
        description="Probaj najpre bez pomoci. Ako negde zastaneš, pokušaj makar da određiš koji princip stoji iza zadatka: definicija, pravilo logaritmovanja ili promena baze."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\log_2 64"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Tražimo stepen na koji treba podici <InlineMath>{"2"}</InlineMath>{" "}
                da dobijemo <InlineMath>{"64"}</InlineMath>. Posto je{" "}
                <InlineMath>{"2^6=64"}</InlineMath>, sledi{" "}
                <InlineMath>{"\\log_2 64 = 6"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 2"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\log_3 \\frac{1}{27}"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Važi <InlineMath>{"\\frac{1}{27} = 3^{-3}"}</InlineMath>, pa je{" "}
                <InlineMath>{"\\log_3 \\frac{1}{27} = -3"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 3"
            problem={
              <p>
                Reši <InlineMath>{"\\log_5 x = -2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Prelazimo na eksponencijalni zapis:{" "}
                <InlineMath>{"x = 5^{-2} = \\frac{1}{25}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 4"
            problem={
              <p>
                Sredi <InlineMath>{"\\log_2 5 + \\log_2 8"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Po pravilu za proizvod dobijamo{" "}
                <InlineMath>
                  {"\\log_2(5 \\cdot 8) = \\log_2 40"}
                </InlineMath>
                . To je već dobar konacan oblik.
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 5"
            problem={
              <p>
                Sredi <InlineMath>{"\\log_3 54 - \\log_3 2"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Po pravilu za kolicnik dobijamo{" "}
                <InlineMath>
                  {
                    "\\log_3\\left(\\frac{54}{2}\\right) = \\log_3 27 = 3"
                  }
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 6"
            problem={
              <p>
                Sredi{" "}
                <InlineMath>{"3\\log_2 5 - \\log_2 40"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Najpre <InlineMath>{"3\\log_2 5 = \\log_2 125"}</InlineMath>.
                Zatim{" "}
                <InlineMath>
                  {
                    "\\log_2 125 - \\log_2 40 = \\log_2\\left(\\frac{125}{40}\\right) = \\log_2 \\frac{25}{8}"
                  }
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 7"
            problem={
              <p>
                Izračunaj <InlineMath>{"\\log_9 27"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Menjamo bazu na <InlineMath>{"3"}</InlineMath>:{" "}
                <InlineMath>
                  {
                    "\\log_9 27 = \\frac{\\log_3 27}{\\log_3 9} = \\frac{3}{2}"
                  }
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Vezba 8"
            problem={
              <p>
                Objasni zašto{" "}
                <InlineMath>
                  {"\\log_2(3+5) \\neq \\log_2 3 + \\log_2 5"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Leva strana je <InlineMath>{"\\log_2 8 = 3"}</InlineMath>. Desna
                strana je <InlineMath>{"\\log_2 15"}</InlineMath>, jer zbir
                logaritama postaje logaritam proizvoda. Posto{" "}
                <InlineMath>{"15 \\neq 8"}</InlineMath>, izrazi nisu jednaki.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Logaritam je broj koji meri eksponent, pa zato prevodi množenje u sabiranje"
        description="Ako ovu jednu misao zaista usvojiš, većina pravila prestaje da bude lista za pamćenje. Počinješ da ih vidiš kao prirodnu posledicu zakona stepena."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>{"\\log_a b = c \\iff a^c = b"}</MathBlock>
          <MathBlock>
            {
              "x=a^u,\\ y=a^v \\Longrightarrow \\log_a(xy)=u+v,\\ \\log_a\\!\\left(\\frac{x}{y}\\right)=u-v"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš posle ove lekcije"
        description="Ovo su glavne tačke koje treba da ostanu cvrste i kada zadatak izgleda gusce nego sto jeste."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Definicija</h3>
            <p>
              <InlineMath>{"\\log_a b"}</InlineMath> traži eksponent. Uvek se
              vrati na pitanje: na koji stepen treba podici bazu{" "}
              <InlineMath>{"a"}</InlineMath> da se dobije{" "}
              <InlineMath>{"b"}</InlineMath>?
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Uslovi</h3>
            <p>
              Baza mora biti pozitivna i različita od <InlineMath>{"1"}</InlineMath>,
              a argument pozitivan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Pravila</h3>
            <p>
              Mnozenje prelazi u sabiranje, deljenje u oduzimanje, a stepen
              argumenta ispred logaritma.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Promena baze</h3>
            <p>
              Kada baza nije zgodna, prevedes je. Formula za promenu baze je
              standardni alat i za tačne transformacije i za rad s kalkulatorom.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logican korak je logaritamska funkcija i njen grafik. Tamo ce
          ova ideja o inverznosti dobiti i jasan geometrijski oblik.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
