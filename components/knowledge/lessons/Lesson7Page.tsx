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
import ProportionLab from "./ProportionLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#osnove", label: "Razmera i proporcija" },
  { href: "#proporcionalnost", label: "Direktna i obrnuta" },
  { href: "#pravilo", label: "Pravilo trojno" },
  { href: "#laboratorija", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Ključni zapisi" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Prijemni fokus" },
  { href: "#vezba", label: "Vežbe" },
];

export default function Lesson7Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 7"
        title={
          <>
            Razmere i proporcije{" "}
            <span className={cs.tHeroAccent}>
              direktna, obrnuta i pravilo trojno
            </span>
          </>
        }
        description="Ova lekcija uči kako da odnos između veličina prevedeš u tačan račun. Kada znaš da razlikuješ direktnu od obrnute proporcionalnosti, tekstualni zadatak više nije zagonetka nego uredno postavljena proporcija."
        heroImageSrc="/images/lessons/lesson7_hero.png"
        heroImageAlt="Apstraktna matematička tabla sa proporcijama i odnosima između veličina"
        cards={[
          {
            label: "Naučićeš",
            description:
              "kako da postaviš razmeru i proporciju, prepoznaš tip proporcionalnosti i izračunaš nepoznatu veličinu.",
          },
          {
            label: "Najveća zamka",
            description:
              "mešanje direktne i obrnute proporcionalnosti samo po intuiciji, bez provere šta ostaje stalno.",
          },
          {
            label: "Prijemni fokus",
            description:
              "tekstualni zadaci sa radnicima, pumpama, kapacitetom i vremenom, naročito kada više veličina utiče odjednom.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "40 do 55 minuta pažljivog rada",
          },
          {
            label: "Predznanje",
            description:
              "siguran rad sa razlomcima, celim brojevima i osnovnim tekstualnim zadacima",
          },
          {
            label: "Glavna veština",
            description:
              "prevođenje tekstualnog problema u direktnu ili obrnutu proporcionalnost i uredno računanje nepoznate veličine",
          },
          {
            label: "Interaktivno",
            description:
              "canvas laboratorijum proporcionalnosti sa grafikom i automatskom postavkom pravila trojnog",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE OVA LEKCIJA VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="1. Zašto je ova lekcija važna"
        title="Proporcija je most između teksta i jednačine"
        description="U mnogim prijemnim zadacima problem je sakriven iza svakodnevnog jezika: radnici, vreme, brzina, količina robe, protok vode. Razmere i proporcije su alat koji iz tog teksta izvlači tačnu matematičku vezu."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se tema pojavljuje kasnije">
            <ul>
              <li>u zadacima sa zajedničkim radom i kapacitetima</li>
              <li>
                u procentima, smešama i legurama, gde odnosi nose celo rešenje
              </li>
              <li>
                u fizici i hemiji, gde veličine često rastu ili opadaju srazmerno
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <ul>
              <li>
                FON često postavlja tekstualne zadatke koji traže uredno
                postavljanje proporcije
              </li>
              <li>
                jedna pogrešna procena tipa proporcionalnosti obara ceo zadatak
              </li>
              <li>
                složeno pravilo trojno proverava i razumevanje i disciplinu u radu
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Glavna poruka">
          <p>
            Kada tekst postane maglovit, pitaj se šta ostaje stalno. Upravo ta
            konstanta otkriva tip proporcionalnosti.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 2. RAZMERA I PROPORCIJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="2. Razmera i proporcija"
        title="Razmera je odnos, a proporcija jednakost dva odnosa"
        description="Ove dve reči često se u govoru mešaju, ali u matematici imaju tačno određena značenja. Prvo moraš razlikovati šta je jedan odnos, a šta poređenje dva odnosa."
      >
        <div className={s.grid2}>
          <SectionCard title="Razmera — kako se piše odnos dve veličine">
            <MathBlock>{"a:b = \\frac{a}{b}, \\qquad b \\ne 0"}</MathBlock>
            <p>
              Razmera poredi dve veličine iste vrste ili dve vrednosti koje imaju
              smisla da se međusobno uporede.
            </p>
          </SectionCard>

          <SectionCard title="Proporcija — jednakost dve razmere">
            <MathBlock>{"a:b = c:d"}</MathBlock>
            <p>
              To znači da je odnos <InlineMath>{"a"}</InlineMath> prema{" "}
              <InlineMath>{"b"}</InlineMath> isti kao odnos{" "}
              <InlineMath>{"c"}</InlineMath> prema{" "}
              <InlineMath>{"d"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Unakrsno množenje — najvažnije pravilo">
            <MathBlock>
              {"a:b = c:d \\Longleftrightarrow ad = bc"}
            </MathBlock>
            <p>
              Ovo je osnovni alat za proveru i računanje nepoznatog člana
              proporcije.
            </p>
          </SectionCard>

          <SectionCard title="Skraćivanje — razmera može da se pojednostavi">
            <MathBlock>{"12:18 = 2:3"}</MathBlock>
            <p>
              Skraćuješ kao razlomak: podeliš oba člana istim nenultim brojem.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard>
            <p>
              <strong>Primer 1:</strong> razmera{" "}
              <InlineMath>{"6:9"}</InlineMath> jednaka je{" "}
              <InlineMath>{"\\frac{6}{9}=\\frac{2}{3}"}</InlineMath>, pa se može
              zapisati i kao <InlineMath>{"2:3"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard>
            <p>
              <strong>Primer 2:</strong> proporcija{" "}
              <InlineMath>{"3:5 = 12:20"}</InlineMath> jeste tačna, jer važi{" "}
              <InlineMath>{"3 \\cdot 20 = 5 \\cdot 12 = 60"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard>
            <p>
              <strong>Primer 3:</strong> iz proporcije{" "}
              <InlineMath>{"4:7 = x:21"}</InlineMath> sledi{" "}
              <InlineMath>{"4 \\cdot 21 = 7x"}</InlineMath>, pa je{" "}
              <InlineMath>{"x=12"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: da li su razmera i proporcija isto?"
          answer={
            <p>
              Nisu. Razmera je jedan odnos, na primer{" "}
              <InlineMath>{"2:3"}</InlineMath>. Proporcija je jednakost dve
              razmere, na primer <InlineMath>{"2:3 = 4:6"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. DIREKTNA I OBRNUTA PROPORCIONALNOST ═══════════ */}
      <LessonSection
        id="proporcionalnost"
        eyebrow="3. Direktna i obrnuta proporcionalnost"
        title="Ključno pitanje je: šta ostaje stalno kada menjaš jednu veličinu?"
        description="Ako pri promeni jedne veličine druga raste ili opada po pravilnom obrascu, najpre traži konstantu: da li je stalan količnik ili proizvod? Od toga zavisi i tip zadatka."
      >
        <div className={s.grid2}>
          <SectionCard title="Direktna proporcionalnost">
            <MathBlock>
              {"y = kx \\qquad \\text{ili} \\qquad \\frac{y}{x} = k"}
            </MathBlock>
            <p>
              Kada se <InlineMath>{"x"}</InlineMath> poveća dva puta, i{" "}
              <InlineMath>{"y"}</InlineMath> se poveća dva puta. Količnik{" "}
              <InlineMath>{"\\frac{y}{x}"}</InlineMath> ostaje stalan.
            </p>
            <ul>
              <li>
                <strong>Primer:</strong> broj svezaka i cena, ako je cena jedne
                sveske stalna.
              </li>
              <li>
                <strong>Primer:</strong> pređeni put i vreme, ako je brzina
                stalna.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Obrnuta proporcionalnost">
            <MathBlock>
              {"y = \\frac{k}{x} \\qquad \\text{ili} \\qquad xy = k"}
            </MathBlock>
            <p>
              Kada se <InlineMath>{"x"}</InlineMath> poveća,{" "}
              <InlineMath>{"y"}</InlineMath> se smanjuje tako da proizvod ostane
              stalan.
            </p>
            <ul>
              <li>
                <strong>Primer:</strong> broj radnika i broj dana za isti posao.
              </li>
              <li>
                <strong>Primer:</strong> brzina i vreme za isti put.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako prepoznati direktnu proporcionalnost u tekstu">
            <ul>
              <li>više komada znači veću cenu</li>
              <li>više litara znači veću količinu supstance</li>
              <li>duže vreme pri stalnoj brzini znači veći put</li>
            </ul>
          </SectionCard>

          <SectionCard title="Kako prepoznati obrnutu proporcionalnost u tekstu">
            <ul>
              <li>više radnika znači manje dana za isti posao</li>
              <li>veća brzina znači manje vremena za isti put</li>
              <li>
                više pumpi znači kraće vreme punjenja, ako je obim isti
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Praktični test">
          <p>
            Pitaj se šta se desi ako jedna veličina poraste dvostruko. Ako i
            druga poraste dvostruko, odnos je direktan. Ako se druga prepolovi,
            odnos je obrnut.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li su broj radnika i količina urađenog posla uvek obrnuto proporcionalni?"
          answer={
            <p>
              Nisu uvek. Obrnuta proporcionalnost važi samo kada je posao isti i
              kada svi radnici rade istim tempom. Uvek proveri šta je u zadatku
              stalno.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 4. PRAVILO TROJNO ═══════════ */}
      <LessonSection
        id="pravilo"
        eyebrow="4. Pravilo trojno"
        title="Pravilo trojno nije posebna magija, nego uredna primena proporcionalnosti"
        description="Kada jedna veličina zavisi od jedne druge, koristiš prosto pravilo trojno. Kada zavisi od više veličina, dobijaš složeno pravilo trojno. U oba slučaja najvažniji korak je da pravilno odrediš smer zavisnosti."
      >
        <div className={s.grid2}>
          <SectionCard title="Prosto pravilo trojno">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izdvoji dve povezane veličine" />
              <WalkStep
                number={2}
                title="Odredi da li je odnos direktan ili obrnut"
              />
              <WalkStep
                number={3}
                title="Postavi proporciju i izračunaj nepoznatu"
              />
            </div>
            <MathBlock>
              {"4 \\text{ sveske } \\to 600 \\text{ din}"}
            </MathBlock>
            <MathBlock>
              {
                "7 \\text{ svezaka } \\to x \\text{ din} \\qquad \\Longrightarrow \\qquad 4:7 = 600:x"
              }
            </MathBlock>
          </SectionCard>

          <SectionCard title="Složeno pravilo trojno">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Izdvoji sve veličine koje utiču na traženu"
              />
              <WalkStep
                number={2}
                title="Za svaku posebno označi direktnu ili obrnutu vezu"
              />
              <WalkStep
                number={3}
                title="Računaj faktor po faktor, uz proveru smisla odgovora"
              />
            </div>
            <p>
              Tipičan primer je zadatak sa radnicima, satima rada i brojem dana,
              gde više veličina istovremeno utiče na završetak posla.
            </p>
          </SectionCard>
        </div>

        <SectionCard>
          <p>
            <strong>Primer sa obrnutom proporcijom:</strong>
          </p>
          <MathBlock>
            {"\\text{Ako } 6 \\text{ radnika završi posao za } 10 \\text{ dana,}"}
          </MathBlock>
          <MathBlock>
            {
              "\\text{onda } 15 \\text{ radnika završi isti posao za } x \\text{ dana}"
            }
          </MathBlock>
          <MathBlock>
            {
              "6 \\cdot 10 = 15 \\cdot x \\qquad \\Longrightarrow \\qquad x = 4"
            }
          </MathBlock>
          <p>
            Ovde je odnos obrnut: više radnika znači manje dana, pa je proizvod
            &bdquo;broj radnika × broj dana&ldquo; stalan.
          </p>
        </SectionCard>
      </LessonSection>

      {/* ═══════════ 5. INTERAKTIVNI LABORATORIJUM ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="5. Interaktivni laboratorijum"
        title="Menjaj veličine i odmah proveri kako se menja odnos"
        description="Izaberi tip proporcionalnosti ili gotov primer, pa menjaj poznate vrednosti. Canvas prikazuje graf zavisnosti, a desno dobijaš gotovu postavku proporcije i izračunatu nepoznatu veličinu."
      >
        <ProportionLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš šta će se desiti sa drugom veličinom kada
            promeniš prvu, pa tek onda proveri ekran. Ako vidiš da ti graf
            odgovara formuli, upravo to i jeste poenta: nema nagađanja, sve je
            određeno konstantom.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 6. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="6. Vođeni primeri"
        title="Od kratkih proporcija do pravih tekstualnih zadataka"
        description="Svaki primer pokazuje drugi nivo razmišljanja: jedan čist odnos, jedna obrnuta zavisnost i jedan složeniji zadatak sa više veličina."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: Čista proporcija</h3>
            <p>
              Reši proporciju <InlineMath>{"5:8 = x:24"}</InlineMath>.
            </p>
            <MathBlock>{"5 \\cdot 24 = 8x"}</MathBlock>
            <MathBlock>
              {"120 = 8x \\qquad \\Longrightarrow \\qquad x = 15"}
            </MathBlock>
            <p>
              Ovo je osnovni obrazac: čim vidiš proporciju, koristi unakrsno
              množenje.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Obrnuta proporcionalnost
            </h3>
            <p>
              Ako 8 pumpi isprazni bazen za 15 sati, za koliko sati će isti
              posao obaviti 12 pumpi?
            </p>
            <ul>
              <li>više pumpi znači manje vremena</li>
              <li>odnos je obrnut, pa je proizvod stalan</li>
            </ul>
            <MathBlock>{"8 \\cdot 15 = 12 \\cdot x"}</MathBlock>
            <MathBlock>{"x = 10"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Složeno pravilo trojno
            </h3>
            <p>
              Dvanaest radnika radeći po 6 sati dnevno završi posao za 15 dana.
              Za koliko dana će isti posao završiti 18 radnika koji rade po 8
              sati dnevno?
            </p>
            <ul>
              <li>više radnika znači manje dana</li>
              <li>više sati dnevno znači manje dana</li>
              <li>oba uticaja su obrnuta prema broju dana</li>
            </ul>
            <MathBlock>
              {
                "\\text{Ukupan rad} = \\text{radnici} \\cdot \\text{sati dnevno} \\cdot \\text{dani}"
              }
            </MathBlock>
            <MathBlock>
              {"12 \\cdot 6 \\cdot 15 = 18 \\cdot 8 \\cdot x"}
            </MathBlock>
            <MathBlock>
              {
                "x = \\frac{12 \\cdot 6 \\cdot 15}{18 \\cdot 8} = 7{,}5"
              }
            </MathBlock>
            <p>
              Odgovor je <InlineMath>{"7{,}5"}</InlineMath> dana. Ako zadatak
              traži cele dane, onda dodatno tumačiš praktični smisao rezultata.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. KLJUČNI ZAPISI ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="7. Ključni zapisi"
        title="Formule i rečenice koje moraš čitati bez zastajanja"
        description="Ove kartice povezuju zapis sa značenjem. Cilj nije da ih nabubas, nego da ih prepoznaš čim se pojave."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Razmera — jedan odnos"
            formula={"a:b = \\frac{a}{b}"}
            note={<>Razmera opisuje koliko jedna veličina &bdquo;ide uz&ldquo; drugu.</>}
          />
          <FormulaCard
            title="Proporcija — jednakost odnosa"
            formula={"a:b = c:d \\Longleftrightarrow ad = bc"}
            note="Unakrsno množenje je osnovni alat za rešavanje proporcije."
          />
          <FormulaCard
            title="Direktna — stalan količnik"
            formula={"y = kx \\qquad \\text{i} \\qquad \\frac{y}{x} = k"}
            note="Veličine rastu ili opadaju zajedno u istom odnosu."
          />
          <FormulaCard
            title="Obrnuta — stalan proizvod"
            formula={"y = \\frac{k}{x} \\qquad \\text{i} \\qquad xy = k"}
            note="Jedna veličina raste, druga se smanjuje tako da proizvod ostane isti."
          />
          <FormulaCard
            title="Pravilo trojno — model za nepoznatu veličinu"
            formula={"x_1:x_2 = y_1:y_2 \\quad \\text{ili} \\quad x_1 y_1 = x_2 y_2"}
            note="Obrazac biraš prema tome da li je zavisnost direktna ili obrnuta."
          />
          <FormulaCard
            title="Složeni zadaci — faktor po faktor"
            formula={"\\text{ukupan rad} = \\text{broj radnika} \\cdot \\text{sati} \\cdot \\text{dani}"}
            note="Kada više veličina utiče na rezultat, svakom faktoru prvo odredi smer uticaja."
          />
        </div>
      </LessonSection>

      {/* ═══════════ 8. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="8. Česte greške"
        title="Tipične greške koje ruše zadatke iz proporcije"
        description="Ovo nisu opšti saveti, nego realne greške koje učenici prave čim zadatak postane malo tekstualniji."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Razmera i proporcija se mešaju
            </h3>
            <p>
              <InlineMath>{"2:3"}</InlineMath> nije isto što i{" "}
              <InlineMath>{"2:3 = 4:6"}</InlineMath>. Prvo je razmera, drugo
              proporcija.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tip proporcionalnosti se pogađa po osećaju
            </h3>
            <p>
              Uvek proveri šta ostaje stalno: količnik ili proizvod. Bez toga
              lako okreneš zadatak naopako.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tekst se prepiše bez razumevanja uslova
            </h3>
            <p>
              Kod radnika, pumpi i brzine moraš proveriti da li je posao ili put
              isti. Bez tog uslova ni proporcionalnost nije jasna.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Složeno pravilo trojno se rešava kao prosto
            </h3>
            <p>
              Ako više veličina utiče na rezultat, moraš analizirati svaku
              posebno. Jedna proporcija često nije dovoljna bez dodatnog
              razmišljanja.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 9. PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="9. Veza sa prijemnim zadacima"
        title="Kako se tema stvarno pojavljuje na ispitima"
        description="Na prijemnom se odnos retko napiše direktno. Umesto toga dobiješ tekst koji moraš da prevedeš u odnos među veličinama. Upravo tu se vidi da li razumeš lekciju ili samo pamtiš formulu."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipične forme zadataka">
            <ul>
              <li>broj radnika, sati rada i broj dana</li>
              <li>kapacitet pumpi, bazena i vreme punjenja ili pražnjenja</li>
              <li>brzina, put i vreme</li>
              <li>cena, količina i komadni trošak</li>
            </ul>
          </SectionCard>

          <SectionCard title="Prijemni kontrolna lista">
            <ol>
              <li>napiši sve veličine koje se pominju</li>
              <li>odredi šta je stalno u zadatku</li>
              <li>
                označi za svaku veličinu da li utiče direktno ili obrnuto
              </li>
              <li>
                proveri da li je dobijeni odgovor smislen u realnoj situaciji
              </li>
            </ol>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni refleks">
          <p>
            Ne pitaj prvo &bdquo;koju formulu da primenim&ldquo;, nego
            &bdquo;kakva je zavisnost među veličinama&ldquo;.
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
        <div className={s.grid2}>
          <ExerciseCard
            title="Zadatak 1: Proporcija"
            problem={
              <p>
                Reši proporciju <InlineMath>{"9:15 = x:25"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>{"9 \\cdot 25 = 15x"}</MathBlock>
                <MathBlock>
                  {"225 = 15x \\qquad \\Longrightarrow \\qquad x = 15"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Direktna proporcionalnost"
            problem={
              <p>
                Ako 3 kilograma jabuka košta 360 dinara, koliko košta 8
                kilograma?
              </p>
            }
            solution={
              <>
                <p>Cena je direktno proporcionalna količini.</p>
                <MathBlock>{"3:8 = 360:x"}</MathBlock>
                <MathBlock>
                  {"3x = 2880 \\qquad \\Longrightarrow \\qquad x = 960"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Obrnuta proporcionalnost"
            problem={
              <p>
                Ako 10 radnika završi posao za 18 dana, za koliko dana će isti
                posao završiti 15 radnika?
              </p>
            }
            solution={
              <>
                <p>Odnos je obrnut: više radnika znači manje dana.</p>
                <MathBlock>{"10 \\cdot 18 = 15 \\cdot x"}</MathBlock>
                <MathBlock>{"x = 12"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Složeno pravilo trojno"
            problem={
              <p>
                Osam radnika radeći po 5 sati dnevno završi posao za 12 dana. Za
                koliko dana će isti posao završiti 10 radnika radeći po 6 sati
                dnevno?
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"8 \\cdot 5 \\cdot 12 = 10 \\cdot 6 \\cdot x"}
                </MathBlock>
                <MathBlock>
                  {"x = \\frac{8 \\cdot 5 \\cdot 12}{10 \\cdot 6} = 8"}
                </MathBlock>
                <p>
                  Odgovor je <InlineMath>{"8"}</InlineMath> dana.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna poruka ove teme"
        description="Prava snaga proporcije nije u formuli, nego u pravilnom čitanju zavisnosti među veličinama. Kada tačno prepoznaš šta je direktno, a šta obrnuto, račun postaje poslednji i najlakši korak."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{prepoznaj odnos} \\;\\Longrightarrow\\; \\text{nađi konstantu} \\;\\Longrightarrow\\; \\text{izračunaj nepoznatu}"
            }
          </MathBlock>
          <p>
            Ko preskoči prvi korak, obično pogreši tip proporcionalnosti. Ko ga
            odradi mirno, dobija najbrži put kroz zadatak.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 11. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        eyebrow="11. Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako ove tvrdnje možeš samostalno da objasniš, lekcija je dobro savladana."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Razmera i proporcija</h3>
            <p>
              Razmera je odnos dve veličine, a proporcija jednakost dve razmere.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Unakrsno množenje</h3>
            <p>
              Iz proporcije <InlineMath>{"a:b = c:d"}</InlineMath> sledi{" "}
              <InlineMath>{"ad = bc"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Direktna i obrnuta</h3>
            <p>
              Kod direktne proporcionalnosti količnik ostaje stalan, a kod
              obrnute proizvod ostaje stalan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Pravilo trojno</h3>
            <p>
              Pravilo trojno nije napamet formula, nego uredna primena
              proporcionalnosti.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Tekstualni zadaci</h3>
            <p>
              Kod tekstualnog zadatka moraš proveriti šta je stalno i kako svaka
              veličina utiče na traženu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Složeni zadaci</h3>
            <p>
              Složeno pravilo trojno traži da se više uticaja analizira jedan po
              jedan.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je procentni račun, gde se ista disciplina
          odnosa i prevoda teksta u matematiku prenosi na procente, smese i
          legure.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
