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
import PercentMixtureLab from "./PercentMixtureLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Osnovni pojmovi" },
  { href: "#sukcesivne", label: "Sukcesivne promene" },
  { href: "#smesa", label: "Smese i legure" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključni zapisi" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
];

export default function Lesson8Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 8"
        title={
          <>
            Procentni račun{" "}
            <span className={cs.tHeroAccent}>
              sukcesivne promene, smese i legure
            </span>
          </>
        }
        description="Procenat je samo odnos prema celini, ali se iz te ideje rađaju veoma različiti zadaci: poskupljenja i pojeftinjenja, koncentracije rastvora, legure i tekstualni problemi koje FON redovno koristi da proveri da li umeš da iz teksta izvučeš pravu bazu i pravi faktor promene."
        heroImageSrc="/images/lessons/lesson8_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa procentima, faktorima promene i koncentracijama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da razlikuješ bazu, procenat i procentni iznos, kako da vodiš sukcesivne promene i kako da računaš koncentraciju smese.",
          },
          {
            label: "Najveća zamka",
            description:
              "mehaničko sabiranje procenata i zaboravljanje da se druga promena računa na novoj bazi, ne na početnoj.",
          },
          {
            label: "Prijemni fokus",
            description:
              "tekstualni zadaci sa cenama, koncentracijama i sukcesivnim promenama gde jedan pogrešan faktor ruši ceo odgovor.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "45 do 60 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "razlomci, decimale, razmere i tekstualni zadaci sa jednostavnom proporcijom",
          },
          {
            label: "Glavna veština",
            description:
              "prevođenje procentualne ili koncentracione priče u jasan račun preko baze, faktora i ukupne količine supstance",
          },
          {
            label: "Interaktivno",
            description:
              "dvo-modni canvas laboratorijum za procentualne promene i smese",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zašto je ova lekcija važna"
        title="Procenat je jezik promene, a smesa je jezik sastava"
        description="Kada cena poraste, plata se smanji, rastvor se razblaži ili se metali pomešaju u leguru, iza scene je isti tip razmišljanja: deo neke celine moraš precizno pratiti kroz promenu. Zato je ova lekcija stalni gost na prijemnim ispitima za FON."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se tema vraća kasnije">
            <ul>
              <li>u ekonomskim zadacima sa cenama, kamatama i maržama</li>
              <li>
                u hemijskim i tehnološkim zadacima sa koncentracijama rastvora
              </li>
              <li>
                u svim tekstualnim zadacima gde se prati odnos dela i celine
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <ul>
              <li>
                FON vrlo često traži sukcesivna poskupljenja i pojeftinjenja
              </li>
              <li>
                smesa i legura proveravaju da li umeš da postaviš jednačinu iz
                teksta
              </li>
              <li>
                najčešća greška nije u računu, nego u pogrešnoj bazi ili
                pogrešnoj interpretaciji procenta
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Glavna poruka">
          <p>
            Procenat nikad ne postoji sam. Uvek pitaj: procenat čega?
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Osnovni pojmovi procentnog računa"
        title="Baza, procenat i procentni iznos moraju biti jasno razdvojeni"
        description="Većina grešaka nastaje zato što učenik ne razlikuje tri različite stvari: kolika je celina, koliki je procenat i koliki je deo koji taj procenat predstavlja."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta znači procenat">
            <MathBlock>{"p\\% = \\frac{p}{100}"}</MathBlock>
            <p>
              Procenat je razlomak sa imeniteljem{" "}
              <InlineMath>{"100"}</InlineMath>. Zato{" "}
              <InlineMath>{"15\\% = 0.15 = \\frac{15}{100}"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Baza, procenat i procentni iznos">
            <ul>
              <li>
                <strong>Baza:</strong> cela količina na koju se procenat odnosi
              </li>
              <li>
                <strong>Procenat:</strong> koliki deo od{" "}
                <InlineMath>{"100"}</InlineMath> uzimaš
              </li>
              <li>
                <strong>Procentni iznos:</strong> konkretan deo baze koji dobijaš
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Procenat od broja">
            <MathBlock>{"I = \\frac{p}{100} \\cdot B"}</MathBlock>
            <p>
              Ako tražiš koliko je <InlineMath>{"p\\%"}</InlineMath> od baze{" "}
              <InlineMath>{"B"}</InlineMath>, množiš bazu odgovarajućim
              decimalnim faktorom.
            </p>
          </SectionCard>

          <SectionCard title="Obrnuti smer razmišljanja">
            <MathBlock>{"B = \\frac{I}{p/100}"}</MathBlock>
            <p>
              Ako znaš da je neki iznos procentni deo, bazu dobijaš deljenjem
              tim procentom izraženim kao decimalni broj.
            </p>
          </SectionCard>
        </div>

        <div className={s.insightCard} style={{ marginTop: 16 }}>
          <h3 className={cs.tCardTitle}>Brzi primeri</h3>
          <ul>
            <li>
              <strong>Primer 1:</strong>{" "}
              <InlineMath>{"15\\%"}</InlineMath> od{" "}
              <InlineMath>{"240"}</InlineMath> je{" "}
              <InlineMath>{"0.15 \\cdot 240 = 36"}</InlineMath>.
            </li>
            <li>
              <strong>Primer 2:</strong> ako je{" "}
              <InlineMath>{"18"}</InlineMath> jednako{" "}
              <InlineMath>{"12\\%"}</InlineMath> neke baze, onda je baza{" "}
              <InlineMath>{"18/0.12 = 150"}</InlineMath>.
            </li>
            <li>
              <strong>Primer 3:</strong> ako je baza{" "}
              <InlineMath>{"500"}</InlineMath>, a deo{" "}
              <InlineMath>{"125"}</InlineMath>, onda je procenat{" "}
              <InlineMath>
                {"\\frac{125}{500}\\cdot 100\\% = 25\\%"}
              </InlineMath>
              .
            </li>
          </ul>
        </div>

        <MicroCheck
          question="Mikro-provera: da li je 8% isto što i 0.8?"
          answer={
            <p>
              Nije. Važi <InlineMath>{"8\\% = \\frac{8}{100} = 0.08"}</InlineMath>.
              Decimalni zapis <InlineMath>{"0.8"}</InlineMath> predstavlja{" "}
              <InlineMath>{"80\\%"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. SUKCESIVNE PROMENE ═══════════ */}
      <LessonSection
        id="sukcesivne"
        eyebrow="3. Sukcesivne promene"
        title="Posle svake promene dobijaš novu bazu"
        description='Ovo je najvažnija mentalna promena u celoj lekciji. Kada se cena prvo poveća, pa zatim smanji, druga promena se ne računa na početnu cenu, nego na već promenjenu cenu. Zato faktori promene pobeđuju "sabiranje procenata".'
      >
        <div className={s.grid2}>
          <SectionCard title="Faktor poskupljenja">
            <MathBlock>
              {
                "\\text{nova vrednost} = \\text{stara vrednost} \\cdot \\left(1+\\frac{p}{100}\\right)"
              }
            </MathBlock>
            <p>
              Povećanje od <InlineMath>{"20\\%"}</InlineMath> znači množenje
              faktorom <InlineMath>{"1.20"}</InlineMath>, a ne dodavanje broja{" "}
              <InlineMath>{"20"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Faktor pojeftinjenja">
            <MathBlock>
              {
                "\\text{nova vrednost} = \\text{stara vrednost} \\cdot \\left(1-\\frac{p}{100}\\right)"
              }
            </MathBlock>
            <p>
              Smanjenje od <InlineMath>{"15\\%"}</InlineMath> znači množenje
              faktorom <InlineMath>{"0.85"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {"1000 \\xrightarrow{+20\\%} 1000 \\cdot 1.20 = 1200"}
        </MathBlock>
        <MathBlock>
          {"1200 \\xrightarrow{-20\\%} 1200 \\cdot 0.80 = 960"}
        </MathBlock>
        <p style={{ color: "var(--lesson-muted)" }}>
          Zato tvrdnja &bdquo;povećano za <InlineMath>{"20\\%"}</InlineMath>, pa
          smanjeno za <InlineMath>{"20\\%"}</InlineMath>, vrati se na
          isto&ldquo; nije tačna. Krajnji rezultat je{" "}
          <InlineMath>{"960"}</InlineMath>, a ne{" "}
          <InlineMath>{"1000"}</InlineMath>.
        </p>

        <InsightCard title="Pedagoški trik">
          <p>
            U sukcesivnim promenama uvek misli faktorima. Niz promena postaje
            samo proizvod više faktora.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: ako se nešto poveća za 10%, a zatim za još 10%, da li je ukupna promena 20%?"
          answer={
            <p>
              Nije tačno sabrati procente bez provere. Dobijaš faktor{" "}
              <InlineMath>{"1.10 \\cdot 1.10 = 1.21"}</InlineMath>, pa je
              ukupna promena <InlineMath>{"21\\%"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. SMESE I LEGURE ═══════════ */}
      <LessonSection
        id="smesa"
        eyebrow="4. Smese i legure"
        title="Ne pratiš samo ukupnu količinu, nego količinu čiste supstance u njoj"
        description="Kod smesa i legura nije dovoljno reći koliko ukupno litara ili kilograma imaš. Važno je koliko od te mase ili zapremine predstavlja aktivnu, čistu komponentu: so, alkohol, metal, kiselinu ili neku drugu supstancu."
      >
        <div className={s.grid2}>
          <SectionCard title="Količina čiste supstance">
            <MathBlock>
              {
                "\\text{čista supstanca} = \\frac{p}{100} \\cdot \\text{ukupna količina}"
              }
            </MathBlock>
            <p>
              Ako imaš <InlineMath>{"3"}</InlineMath> litra rastvora od{" "}
              <InlineMath>{"20\\%"}</InlineMath>, količina čiste supstance je{" "}
              <InlineMath>{"0.20 \\cdot 3 = 0.6"}</InlineMath> litara.
            </p>
          </SectionCard>

          <SectionCard title="Ukupna koncentracija">
            <MathBlock>
              {"c = \\frac{m_1 c_1 + m_2 c_2}{m_1 + m_2}"}
            </MathBlock>
            <p>
              Ovde su <InlineMath>{"m_1"}</InlineMath> i{" "}
              <InlineMath>{"m_2"}</InlineMath> količine dve komponente, a{" "}
              <InlineMath>{"c_1"}</InlineMath> i{" "}
              <InlineMath>{"c_2"}</InlineMath> njihove koncentracije u
              decimalnom ili procentnom obliku.
            </p>
          </SectionCard>

          <SectionCard title="Konačna koncentracija mora biti između početnih">
            <p>
              Ako mešaš rastvore od <InlineMath>{"20\\%"}</InlineMath> i{" "}
              <InlineMath>{"50\\%"}</InlineMath>, nova koncentracija mora biti
              između <InlineMath>{"20\\%"}</InlineMath> i{" "}
              <InlineMath>{"50\\%"}</InlineMath>. Ako nije, negde je greška.
            </p>
          </SectionCard>

          <SectionCard title="Ista logika, drugi jezik">
            <p>
              Kod legura umesto &bdquo;rastvora&ldquo; često govoriš o masi
              metala određene čistoće. Račun je isti: pratiš masu čistog metala
              u svakoj komponenti.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {"2 \\text{ l rastvora od } 20\\% \\Rightarrow 0.4 \\text{ l čiste supstance}"}
        </MathBlock>
        <MathBlock>
          {"3 \\text{ l rastvora od } 50\\% \\Rightarrow 1.5 \\text{ l čiste supstance}"}
        </MathBlock>
        <MathBlock>
          {
            "\\text{ukupno} = 5 \\text{ l}, \\qquad \\text{čista supstanca} = 1.9 \\text{ l}"
          }
        </MathBlock>
        <MathBlock>{"c = \\frac{1.9}{5} = 0.38 = 38\\%"}</MathBlock>

        <MicroCheck
          question="Mikro-provera: ako pomešaš dva rastvora, može li konačna koncentracija biti veća od obe početne?"
          answer={
            <p>
              Ne može, ako samo mešaš dve komponente bez dodavanja dodatne čiste
              supstance. Konačna koncentracija mora ostati između početnih
              koncentracija.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="5. Interaktivni laboratorijum"
        title="Menjaj procente i koncentracije, pa odmah čitaj posledicu"
        description="Ovaj laboratorijum ima dva režima. U prvom pratiš kako se vrednost menja kroz jednu ili dve procentualne promene. U drugom režimu mešaš dve komponente i odmah vidiš konačnu koncentraciju smese ili legure."
      >
        <PercentMixtureLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            U procentnom delu prati bazu i faktor promene, a u delu o smesama
            prati količinu čiste supstance i ukupnu količinu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="6. Vođeni primeri"
        title="Tri tipična pitanja koja moraš umeti da rešiš bez lutanja"
        description="Svaki primer je pisan tako da vodi kroz logiku zadatka, ne samo kroz završni račun."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Procenat od broja i obrnuto
            </h3>
            <p>
              Nađi <InlineMath>{"18\\%"}</InlineMath> od{" "}
              <InlineMath>{"450"}</InlineMath>, a zatim odredi bazu ako je{" "}
              <InlineMath>{"81"}</InlineMath> jednako{" "}
              <InlineMath>{"18\\%"}</InlineMath> te baze.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi procentni iznos.">
                <MathBlock>
                  {"18\\% \\text{ od } 450 = 0.18 \\cdot 450 = 81"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi bazu iz poznatog iznosa.">
                <MathBlock>{"B = \\frac{81}{0.18} = 450"}</MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovaj par pitanja pokazuje da &bdquo;procenat od broja&ldquo; i
              &bdquo;traženje baze&ldquo; idu u suprotnim smerovima.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Sukcesivna promena cene
            </h3>
            <p>
              Proizvod košta <InlineMath>{"2400"}</InlineMath> dinara. Cena se
              prvo poveća za <InlineMath>{"25\\%"}</InlineMath>, a zatim smanji
              za <InlineMath>{"20\\%"}</InlineMath>. Kolika je nova cena?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odredi faktore.">
                <p>
                  Prvi faktor je <InlineMath>{"1.25"}</InlineMath>. Drugi faktor
                  je <InlineMath>{"0.80"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Pomnoži početnu cenu proizvodom faktora."
              >
                <MathBlock>
                  {"2400 \\cdot 1.25 \\cdot 0.80 = 2400"}
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovde se cena vratila na početnu jer je proizvod faktora jednak{" "}
              <InlineMath>{"1"}</InlineMath>. To nije čest slučaj, ali je dobar
              za proveru razumevanja.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Račun smese</h3>
            <p>
              Pomešaj <InlineMath>{"4"}</InlineMath> litra rastvora
              koncentracije <InlineMath>{"15\\%"}</InlineMath> i{" "}
              <InlineMath>{"6"}</InlineMath> litara rastvora koncentracije{" "}
              <InlineMath>{"40\\%"}</InlineMath>. Nađi konačnu koncentraciju.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Izračunaj čistu supstancu u svakoj komponenti."
              >
                <p>
                  Prva komponenta sadrži{" "}
                  <InlineMath>{"0.15 \\cdot 4 = 0.6"}</InlineMath> litara čiste
                  supstance.
                </p>
                <p>
                  Druga komponenta sadrži{" "}
                  <InlineMath>{"0.40 \\cdot 6 = 2.4"}</InlineMath> litara čiste
                  supstance.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Saberi i podeli.">
                <p>
                  Ukupno imaš <InlineMath>{"10"}</InlineMath> litara smese i{" "}
                  <InlineMath>{"3"}</InlineMath> litra čiste supstance.
                </p>
                <MathBlock>
                  {"c = \\frac{3}{10} = 0.30 = 30\\%"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. KLJUČNI ZAPISI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="7. Ključni zapisi"
        title="Formule koje treba da povežeš sa smislom, ne samo da zapamtiš"
        description="Ove kartice su tu da skrate put od teksta do formule, ali svaku od njih moraš da čitaš uz odgovarajuće značenje."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Osnovna definicija"
            formula={"p\\% = \\frac{p}{100}"}
            note="Svaki procenat je samo razlomak sa imeniteljem 100."
          />
          <FormulaCard
            title="Deo od baze"
            formula={"I = \\frac{p}{100}\\cdot B"}
            note="Ovo je formula kada tražiš koliki deo baze predstavlja dati procenat."
          />
          <FormulaCard
            title="Obrnuti smer"
            formula={"B = \\frac{I}{p/100}"}
            note="Koristi je kada znaš procentni deo i procenat, a ne znaš celu vrednost."
          />
          <FormulaCard
            title="Poskupljenje i pojeftinjenje"
            formula={"1 + \\frac{p}{100}, \\qquad 1 - \\frac{p}{100}"}
            note="Ovo su najvažniji faktori za sukcesivne promene."
          />
          <FormulaCard
            title="Ukupna koncentracija"
            formula={"c = \\frac{m_1 c_1 + m_2 c_2}{m_1 + m_2}"}
            note={'Čita se kao "ukupna čista supstanca kroz ukupnu količinu".'}
          />
          <FormulaCard
            title="Provera rezultata"
            formula={"\\min(c_1,c_2) \\le c \\le \\max(c_1,c_2)"}
            note="Konačna koncentracija mora ostati između početnih, ako samo mešaš dve komponente."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="8. Česte greške"
        title="Greške koje redovno ruše zadatke iz procenta i smesa"
        description="Ovo nisu generički saveti, nego konkretne greške koje se stalno pojavljuju u školskim i prijemnim zadacima."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Pogrešna baza</h3>
            <p>
              Učenik izračuna procenat u odnosu na pogrešnu celinu. Uvek prvo
              odredi: na koju se količinu procenat odnosi?
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Sukcesivni procenti se samo saberu
            </h3>
            <p>
              To je skoro uvek pogrešno. Posle prve promene dobijaš novu bazu i
              novu vrednost na koju se računa sledeći procenat.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Kod smese prati se samo ukupna količina
            </h3>
            <p>
              Moraš pratiti i količinu čiste supstance. Bez toga nema tačne
              koncentracije.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nesmislen konačni procenat se prihvati bez provere
            </h3>
            <p>
              Ako mešaš <InlineMath>{"20\\%"}</InlineMath> i{" "}
              <InlineMath>{"50\\%"}</InlineMath>, rezultat ne može biti{" "}
              <InlineMath>{"65\\%"}</InlineMath>. Uvek uradi brzu kontrolu
              smisla.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="9. Veza sa prijemnim zadacima"
        title="Kako se tema stvarno pojavljuje na prijemnim ispitima"
        description='Na prijemnom retko dobiješ "čist" zadatak sa jednom formulom. Umesto toga dolazi priča o ceni, količini, rastvoru ili leguri i moraš da odlučiš koja je baza, da li je promena sukcesivna i šta tačno predstavlja "čista supstanca".'
      >
        <div className={s.grid2}>
          <SectionCard title="Tipične forme zadataka">
            <ul>
              <li>sukcesivna poskupljenja i pojeftinjenja</li>
              <li>određivanje procenta bez poznate početne cene</li>
              <li>mešanje rastvora različitih koncentracija</li>
              <li>legure i dodavanje čistog metala ili čistog rastvarača</li>
            </ul>
          </SectionCard>

          <SectionCard title="Prijemni kontrolna lista">
            <ul>
              <li>1. napiši koja je baza procenta</li>
              <li>
                2. odluči da li radiš sa jednim ili više uzastopnih faktora
              </li>
              <li>
                3. kod smese odvoji ukupnu količinu od količine čiste supstance
              </li>
              <li>4. na kraju proveri da li je rezultat smislen</li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Ne pitaj prvo &bdquo;koju formulu da primenim&ldquo;, nego
            &bdquo;šta je ovde baza, a šta deo te baze&ldquo;.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 10. VEŽBE ═══════════ */}
      <LessonSection
        id="vezba"
        eyebrow="10. Vežbe"
        title="Kratka provera razumevanja"
        description="Reši samostalno, pa tek onda otvori rešenje."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Procenat od broja"
            problem={
              <p>
                Koliko je <InlineMath>{"12\\%"}</InlineMath> od{" "}
                <InlineMath>{"750"}</InlineMath>?
              </p>
            }
            solution={
              <MathBlock>{"0.12 \\cdot 750 = 90"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Traženje baze"
            problem={
              <p>
                Ako je <InlineMath>{"54"}</InlineMath> jednako{" "}
                <InlineMath>{"18\\%"}</InlineMath> neke vrednosti, odredi tu
                vrednost.
              </p>
            }
            solution={
              <MathBlock>{"B = \\frac{54}{0.18} = 300"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Sukcesivna promena"
            problem={
              <p>
                Cena proizvoda od <InlineMath>{"5000"}</InlineMath> dinara
                najpre se smanji za <InlineMath>{"10\\%"}</InlineMath>, a zatim
                poveća za <InlineMath>{"20\\%"}</InlineMath>. Kolika je nova
                cena?
              </p>
            }
            solution={
              <MathBlock>
                {"5000 \\cdot 0.90 \\cdot 1.20 = 5400"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Smese"
            problem={
              <p>
                Pomešano je <InlineMath>{"5"}</InlineMath> litara rastvora
                koncentracije <InlineMath>{"12\\%"}</InlineMath> i{" "}
                <InlineMath>{"3"}</InlineMath> litra rastvora koncentracije{" "}
                <InlineMath>{"28\\%"}</InlineMath>. Odredi konačnu
                koncentraciju.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "5 \\cdot 0.12 = 0.6, \\qquad 3 \\cdot 0.28 = 0.84"
                  }
                </MathBlock>
                <MathBlock>
                  {"\\text{ukupno čiste supstance} = 1.44"}
                </MathBlock>
                <MathBlock>{"\\text{ukupna količina} = 8"}</MathBlock>
                <MathBlock>
                  {"c = \\frac{1.44}{8} = 0.18 = 18\\%"}
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavni uvid lekcije"
        description="Procenti i smese deluju kao različite teme, ali obe traže isto: da jasno razdvojiš celinu, njen deo i način na koji se ta celina menja."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{odredi bazu ili ukupnu količinu} \\;\\Longrightarrow\\; \\text{izdvoji relevantan deo} \\;\\Longrightarrow\\; \\text{tek onda računaj}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        eyebrow="11. Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako ove tvrdnje možeš samostalno da objasniš, lekcija je dobro savladana."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Procenat</h3>
            <p>
              Procenat znači deo od sto i uvek ga možeš prevesti u razlomak ili
              decimalni broj.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Tri pojma</h3>
            <p>
              Baza, procenat i procentni iznos nisu ista stvar.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Sukcesivne promene</h3>
            <p>
              Sukcesivne promene vode se preko faktora, ne preko sabiranja
              procenata.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Smese i legure</h3>
            <p>
              Kod smesa i legura pratiš količinu čiste supstance i ukupnu
              količinu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Kontrola smisla</h3>
            <p>
              Konačna koncentracija dve pomešane komponente mora biti između
              početnih koncentracija.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Prijemni refleks</h3>
            <p>
              Na prijemnom je presudno da pravilno odrediš bazu i smisao
              rezultata, a ne samo da izvedeš račun.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je prelazak na kompleksne brojeve, gde se
          brojni sistem širi dalje, ali ista preciznost u tumačenju pojmova
          ostaje obavezna.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
