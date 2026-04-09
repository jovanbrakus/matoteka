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
import GeometricSeriesLab from "./GeometricSeriesLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važna" },
  { href: "#definicija", label: "Definicija i opšti član" },
  { href: "#ponasanje", label: "Ponašanje niza" },
  { href: "#suma", label: "Suma prvih članova" },
  { href: "#beskonacni", label: "Beskonačni red" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Završni rezime" },
];

export default function Lesson56Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 56"
        title={
          <>
            Geometrijski niz{" "}
            <span className={cs.tHeroAccent}>
              i beskonačni geometrijski red
            </span>
          </>
        }
        description="Kada se svaki sledeći član dobija množenjem istim brojem, ulaziš u svet geometrijskog niza. Ova lekcija te vodi od osnovne ideje količnika q, preko opšteg člana i sume prvih n članova, do prvog ozbiljnog susreta sa beskonačnim sabiranjem koje ipak daje konačan rezultat."
        heroImageSrc="/images/lessons/lesson56_hero.png"
        heroImageAlt="Ilustracija za lekciju o geometrijskom nizu i beskonačnom geometrijskom redu"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da iz teksta zadatka izvučeš a\u2081, q, a\u2099, S\u2099 i po potrebi S\u221E.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje sume prvih n članova sa beskonačnom sumom i zaboravljanje da za S\u221E mora važiti |q| < 1.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa tri broja u progresiji, određivanje parametara niza i sabiranje beskonačno mnogo površina.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "80 do 100 minuta sa laboratorijom i vođenim primerima.",
          },
          {
            label: "Predznanje",
            description: "Stepeni, jednačine i nizovi.",
          },
          {
            label: "Glavna veština",
            description:
              "Prevedi tekst u a\u2081 i q pa odluči sta tražiš.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija niza i suma sa promenljivim a\u2081 i q.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNA ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovo je prvi trenutak kada beskonačno počinje da daje konačan broj"
        description="Geometrijski niz nije samo 'još jedna progresija'. On te uvodi u razmisljanje koje je srce matematičke analize: promena više nije ista u apsolutnom smislu, nego se meri faktorom, a parcijalne sume mogu da se približavaju granici."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se ova ideja javlja kasnije">
            <p>
              Geometrijski niz je osnova za razumevanje eksponencijalnog rasta i
              opadanja. Isti model stoji iza kamate, radioaktivnog raspada,
              prigušenja signala i mnogih modela iz fizike i ekonomije.
            </p>
            <ul>
              <li>
                <strong>U matematičkoj analizi:</strong> priprema te za limes
                niza i redove.
              </li>
              <li>
                <strong>U geometriji:</strong> sabiraš beskonačno mnogo sve
                manjih dužina, površina ili zapremina.
              </li>
              <li>
                <strong>Na prijemnom:</strong> zadatak često krije geometrijski
                niz iza price o brojevima, procentima ili površinama.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Šta prijemni zapravo proverava">
            <p>
              Prijemni ne proverava samo da li znaš formulu napamet. Proverava
              da li umeš da prepoznaš <strong>multiplikativni obrazac</strong> i
              da li razlikuješ tri tipa pitanja:
            </p>
            <ul>
              <li>
                <strong>Clan niza:</strong> traži se{" "}
                <InlineMath>{"a_n"}</InlineMath>, pa koristiš opšti član.
              </li>
              <li>
                <strong>Konačna suma:</strong> traži se{" "}
                <InlineMath>{"S_n"}</InlineMath>, pa moraš znati i poseban
                slučaj <InlineMath>{"q=1"}</InlineMath>.
              </li>
              <li>
                <strong>Beskonačna suma:</strong> prvo proveravaš da li{" "}
                <InlineMath>{"|q|<1"}</InlineMath>, pa tek onda pišeš formulu za{" "}
                <InlineMath>{"S_\\infty"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Ključna poruka cele lekcije">
          <p>
            <strong>
              Aritmetički niz misli kroz razliku, geometrijski niz misli kroz
              faktor.
            </strong>{" "}
            Ako svaki korak &ldquo;umnožava&rdquo; prethodni član, tražiš{" "}
            <InlineMath>{"q"}</InlineMath>, a ne razliku{" "}
            <InlineMath>{"d"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zašto geometrijski niz prirodno vodi ka beskonačnom redu?"
          answer={
            <p>
              Zato što članovi često postaju sve manji po istom faktoru. Kada taj
              faktor po apsolutnoj vrednosti ostaje manji od 1, parcijalne sume
              se približavaju granici i beskonačno sabiranje dobija smisao.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DEFINICIJA I OPSTI CLAN ═══════════ */}
      <LessonSection
        id="definicija"
        eyebrow="Definicija i opšti član"
        title="Geometrijski niz nastaje kada je odnos susednih članova stalan"
        description="Najjednostavnije rečeno, u geometrijskom nizu svaki sledeći član dobijaš tako što prethodni član pomnožiš istim brojem q. Taj broj zove se količnik ili kvocijent niza."
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija i formalni zapis">
            <p>
              Ako je prvi član <InlineMath>{"a_1"}</InlineMath>, onda vazi:
            </p>
            <MathBlock>
              {"a_2=a_1q,\\qquad a_3=a_2q,\\qquad a_4=a_3q,\\ \\dots"}
            </MathBlock>
            <p>To možeš sažeto zapisati kao:</p>
            <MathBlock>{"a_{n+1}=q\\cdot a_n"}</MathBlock>
            <p>Kada su susedni članovi nenula, količnik čitaš kao:</p>
            <MathBlock>{"q=\\frac{a_{n+1}}{a_n}"}</MathBlock>
            <p>
              Pedagoški važno: nemoj se vezivati samo za razlomak{" "}
              <InlineMath>{"\\frac{a_{n+1}}{a_n}"}</InlineMath>. Opšti oblik{" "}
              <InlineMath>{"a_n=a_1q^{n-1}"}</InlineMath> ostaje validan i za{" "}
              <InlineMath>{"q=0"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kako nastaje opšti član">
            <p>
              Ako više puta primenjujes pravilo množenja sa{" "}
              <InlineMath>{"q"}</InlineMath>, dobijaš:
            </p>
            <MathBlock>
              {"a_2=a_1q,\\qquad a_3=a_1q^2,\\qquad a_4=a_1q^3"}
            </MathBlock>
            <p>
              Zato za <InlineMath>{"n"}</InlineMath>-ti član važi ključna
              formula:
            </p>
            <MathBlock>{"a_n=a_1q^{n-1}"}</MathBlock>
            <p>
              Ova formula je glavno oruđe kada treba da nađeš konkretan član,
              da porediš dva člana ili da iz poznatih članova izračunaš
              nepoznat <InlineMath>{"q"}</InlineMath> i{" "}
              <InlineMath>{"a_1"}</InlineMath>.
            </p>
            <InsightCard title="Uloga količnika q">
              <p>
                Ako je <InlineMath>{"q"}</InlineMath> negativan, članovi menjaju
                znak. Ako je{" "}
                <InlineMath>{"0<q<1"}</InlineMath>, apsolutne vrednosti članova
                opadaju. Dakle,{" "}
                <strong>
                  jedan broj <InlineMath>{"q"}</InlineMath> određuje celu pricu
                </strong>
                .
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Primer rasta">
            <MathBlock>{"5,10,20,40,\\dots"}</MathBlock>
            <p>
              Ovde je <InlineMath>{"q=2"}</InlineMath>, jer svaki član dobijaš
              udvostručavanjem prethodnog.
            </p>
          </SectionCard>
          <SectionCard title="Primer opadanja">
            <MathBlock>{"81,27,9,3,\\dots"}</MathBlock>
            <p>
              Ovde je <InlineMath>{"q=\\frac{1}{3}"}</InlineMath>, pa se članovi
              smanjuju, ali ne prelaze u negativne vrednosti.
            </p>
          </SectionCard>
          <SectionCard title="Naizmenicni primer">
            <MathBlock>{"4,-2,1,-\\frac12,\\dots"}</MathBlock>
            <p>
              Količnik je <InlineMath>{"q=-\\frac12"}</InlineMath>. Znak se
              smenjuje, a apsolutne vrednosti idu ka nuli.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: po cemu na prvi pogled razlikuješ aritmetički i geometrijski niz?"
          answer={
            <p>
              U aritmetičkom nizu proveravaš da li je razlika između susednih
              članova stalna. U geometrijskom proveravaš da li je odnos susednih
              članova stalan, odnosno da li svaki član nastaje množenjem
              prethodnog istim faktorom.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PONASANJE NIZA ═══════════ */}
      <LessonSection
        id="ponasanje"
        eyebrow="Ponašanje niza"
        title="Broj q odmah govori da li niz raste, opada ili menja znak"
        description="Jedna od najvažnijih prijemnih veština je da ne računaš naslepo. Pre nego što kreneš u formulu, pogledaj vrednost q. Ona ti daje intuiciju o tome sta treba da očekuješ od članova i od suma."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako se niz ponasa za različite vrednosti q">
            <ul>
              <li>
                <strong>
                  <InlineMath>{"q>1"}</InlineMath>:
                </strong>{" "}
                članovi rastu po apsolutnoj vrednosti, a za pozitivan{" "}
                <InlineMath>{"a_1"}</InlineMath> niz brzo raste.
              </li>
              <li>
                <strong>
                  <InlineMath>{"0<q<1"}</InlineMath>:
                </strong>{" "}
                članovi ostaju istog znaka i po apsolutnoj vrednosti opadaju ka
                nuli.
              </li>
              <li>
                <strong>
                  <InlineMath>{"q=1"}</InlineMath>:
                </strong>{" "}
                svi članovi su jednaki prvom članu, pa dobijaš konstantan niz.
              </li>
              <li>
                <strong>
                  <InlineMath>{"q=0"}</InlineMath>:
                </strong>{" "}
                prvi član je <InlineMath>{"a_1"}</InlineMath>, a svi sledeći su
                nule.
              </li>
              <li>
                <strong>
                  <InlineMath>{"-1<q<0"}</InlineMath>:
                </strong>{" "}
                znakovi se smenjuju, a apsolutne vrednosti idu ka nuli.
              </li>
              <li>
                <strong>
                  <InlineMath>{"q\\le -1"}</InlineMath>:
                </strong>{" "}
                znakovi se smenjuju, ali apsolutne vrednosti ne idu ka nuli, pa
                beskonačna suma nema smisla.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Srednji član i zadaci sa tri broja u progresiji">
            <p>
              Za tri uzastopna člana geometrijskog niza važi lepa osobina:
            </p>
            <MathBlock>{"a_n^2=a_{n-1}\\cdot a_{n+1}"}</MathBlock>
            <p>
              To znači da je srednji član{" "}
              <strong>geometrijska sredina</strong> svojih suseda. Upravo ova
              ideja rešava mnoge zadatke tipa: &ldquo;nađi broj{" "}
              <InlineMath>{"x"}</InlineMath> tako da tri izraza cine
              geometrijski niz&rdquo;.
            </p>
            <MathBlock>{"b^2=ac"}</MathBlock>
            <p>
              kada su <InlineMath>{"a,b,c"}</InlineMath> tri uzastopna člana
              geometrijskog niza. Ovu formulu koristiš brzo, ali tek pošto si
              siguran da su članovi zaista <strong>uzastopni</strong> i pravilno
              poređani.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Pad ka nuli">
            <p>
              <InlineMath>{"q=\\frac13"}</InlineMath>: Brojevi se smanjuju:{" "}
              <InlineMath>{"27,9,3,1,\\frac13,\\dots"}</InlineMath>. Ovakav niz
              je odličan kandidat za beskonačnu sumu.
            </p>
          </SectionCard>
          <SectionCard title="Smena znakova">
            <p>
              <InlineMath>{"q=-\\frac12"}</InlineMath>: Niz{" "}
              <InlineMath>{"8,-4,2,-1,\\dots"}</InlineMath> osciluje po znaku,
              ali amplituda opada. Zato beskonačni red ipak može da konvergira.
            </p>
          </SectionCard>
          <SectionCard title="Tri broja u GP">
            <p>
              Ako su <InlineMath>{"x-1"}</InlineMath>,{" "}
              <InlineMath>{"x+2"}</InlineMath>,{" "}
              <InlineMath>{"x+8"}</InlineMath> uzastopni članovi, pišeš{" "}
              <InlineMath>{"(x+2)^2=(x-1)(x+8)"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: može li niz sa negativnim q da ima beskonačnu sumu?"
          answer={
            <p>
              Moze, ali samo ako je <InlineMath>{"|q|<1"}</InlineMath>. Tada se
              znakovi smenjuju, ali apsolutne vrednosti članova opadaju ka nuli,
              pa parcijalne sume ipak imaju granicu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ SUMA PRVIH n CLANOVA ═══════════ */}
      <LessonSection
        id="suma"
        eyebrow="Suma prvih n članova"
        title="Formula za S_n nastaje jednim pametnim oduzimanjem"
        description="Nemoj uciti formulu za sumu kao izolovan zapis. Kada razumeš njeno izvođenje, mnogo ređe ces pomešati znakove ili zaboraviti poseban slučaj q = 1."
      >
        <div className={s.grid2}>
          <SectionCard title="Izvodjenje formule">
            <p>
              Za geometrijski niz sa prvim clanom{" "}
              <InlineMath>{"a_1"}</InlineMath> i količnikom{" "}
              <InlineMath>{"q"}</InlineMath> suma prvih{" "}
              <InlineMath>{"n"}</InlineMath> članova je:
            </p>
            <MathBlock>
              {"S_n=a_1+a_1q+a_1q^2+\\dots+a_1q^{n-1}"}
            </MathBlock>
            <p>
              Pomnozi celu jednačinu sa <InlineMath>{"q"}</InlineMath>:
            </p>
            <MathBlock>{"qS_n=a_1q+a_1q^2+\\dots+a_1q^{n}"}</MathBlock>
            <p>
              Sada oduzmi drugu jednakost od prve. Većina članova se poništi:
            </p>
            <MathBlock>{"S_n-qS_n=a_1-a_1q^n"}</MathBlock>
            <MathBlock>{"S_n(1-q)=a_1(1-q^n)"}</MathBlock>
            <p>
              Za <InlineMath>{"q\\neq1"}</InlineMath> dobijaš:
            </p>
            <MathBlock>{"S_n=\\frac{a_1(1-q^n)}{1-q}"}</MathBlock>
          </SectionCard>

          <SectionCard title="Poseban slučaj q = 1">
            <p>
              Kada je <InlineMath>{"q=1"}</InlineMath>, svi članovi su jednaki{" "}
              <InlineMath>{"a_1"}</InlineMath>, pa formula sa deljenjem kroz{" "}
              <InlineMath>{"1-q"}</InlineMath> nije dozvoljena. Zato ovaj slučaj
              izdvajas posebno:
            </p>
            <MathBlock>{"S_n=n\\cdot a_1"}</MathBlock>
            <p>
              Ovo je tipična ispitna zamka: učenik mehanički primeni opštu
              formulu, dobije deljenje nulom i izgubi lake bodove.
            </p>
            <InsightCard title="Alternativni zapis">
              <p>
                Možeš koristiti i ekvivalentan zapis{" "}
                <InlineMath>
                  {"S_n=\\frac{a_1(q^n-1)}{q-1}"}
                </InlineMath>
                , ali vodi računa da oba oblika znace isto. Izaberi onaj u kome
                ti je lakše da ne pogrešiš sa znakovima.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Brzi račun">
            <p>
              <InlineMath>{"a_1=3,\\ q=2,\\ n=4"}</InlineMath>
            </p>
            <MathBlock>{"S_4=\\frac{3(1-2^4)}{1-2}=45"}</MathBlock>
            <p>
              To je isto što i <InlineMath>{"3+6+12+24"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Opadajuči niz">
            <p>
              <InlineMath>{"a_1=16,\\ q=\\frac12,\\ n=5"}</InlineMath>
            </p>
            <MathBlock>
              {"S_5=16\\cdot \\frac{1-(1/2)^5}{1-1/2}=31"}
            </MathBlock>
            <p>Ovakvi brojevi su bliski beskonačnoj sumi 32.</p>
          </SectionCard>
          <SectionCard title="Poseban slučaj">
            <p>
              <InlineMath>{"a_1=7,\\ q=1,\\ n=10"}</InlineMath>
            </p>
            <MathBlock>{"S_{10}=10\\cdot7=70"}</MathBlock>
            <p>
              Svi članovi su 7, pa nema potrebe za opstom formulom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto pri izvodjenju formule upravo mnozis sumu sa q?"
          answer={
            <p>
              Zato što se tada gotovo svi članovi poravnaju i ponište pri
              oduzimanju. Ostaju samo prvi član{" "}
              <InlineMath>{"a_1"}</InlineMath> i poslednji pomereni član{" "}
              <InlineMath>{"a_1q^n"}</InlineMath>, pa se formula dobija veoma
              čisto.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ BESKONACNI GEOMETRIJSKI RED ═══════════ */}
      <LessonSection
        id="beskonacni"
        eyebrow="Beskonačni geometrijski red"
        title="Beskonačna suma postoji samo kada se članovi stvarno gase"
        description="Ovde se prvi put javlja ideja da beskonačno mnogo članova može dati konačan zbir. To nije magija. To je posledica činjenice da novi članovi postaju sve manji tako brzo da njihov ukupan doprinos ima granicu."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako iz S_n dolaziš do S beskonačno">
            <p>
              Vec znaš da za <InlineMath>{"q\\neq1"}</InlineMath> vazi:
            </p>
            <MathBlock>{"S_n=\\frac{a_1(1-q^n)}{1-q}"}</MathBlock>
            <p>
              Ako je <InlineMath>{"|q|<1"}</InlineMath>, tada:
            </p>
            <MathBlock>
              {"q^n \\to 0 \\quad \\text{kada} \\quad n\\to\\infty"}
            </MathBlock>
            <p>Pa parcijalne sume imaju granicu:</p>
            <MathBlock>
              {"S=\\lim_{n\\to\\infty} S_n=\\frac{a_1}{1-q}"}
            </MathBlock>
            <p>
              Ovo je formula za beskonačni geometrijski red. Ali ona važi samo
              pod uslovom <InlineMath>{"|q|<1"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Zašto uslov |q| < 1 nije ukras">
            <ul>
              <li>
                <strong>
                  Ako <InlineMath>{"0<q<1"}</InlineMath>:
                </strong>{" "}
                članovi su pozitivni i opadaju ka nuli.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"-1<q<0"}</InlineMath>:
                </strong>{" "}
                znakovi se smenjuju, ali apsolutne vrednosti opadaju ka nuli.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"q=1"}</InlineMath>:
                </strong>{" "}
                članovi se ne smanjuju, pa zbir raste bez granice ako je{" "}
                <InlineMath>{"a_1\\neq0"}</InlineMath>.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"|q|>1"}</InlineMath>:
                </strong>{" "}
                članovi rastu po apsolutnoj vrednosti i nema konvergencije.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"q=-1"}</InlineMath>:
                </strong>{" "}
                niz osciluje između dve vrednosti, pa parcijalne sume nemaju
                granicu.
              </li>
            </ul>
            <InsightCard title="Kratko pravilo za prijemni">
              <p>
                <strong>
                  Pre svake upotrebe{" "}
                  <InlineMath>{"S=\\frac{a_1}{1-q}"}</InlineMath> prvo proveri{" "}
                  <InlineMath>{"|q|<1"}</InlineMath>.
                </strong>{" "}
                Ako to ne proveriš, možeš napisati formalno lep, ali matematički
                pogrešan rezultat.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Pozitivno opadanje">
            <MathBlock>{"12+6+3+\\dots"}</MathBlock>
            <p>
              Ovde je <InlineMath>{"a_1=12"}</InlineMath>,{" "}
              <InlineMath>{"q=\\frac12"}</InlineMath>, pa je{" "}
              <InlineMath>{"S=\\frac{12}{1-1/2}=24"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Naizmenicni red">
            <MathBlock>{"8-4+2-1+\\dots"}</MathBlock>
            <p>
              <InlineMath>{"q=-\\frac12"}</InlineMath>, pa red konvergira i vazi{" "}
              <InlineMath>{"S=\\frac{8}{1+1/2}=\\frac{16}{3}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Povrsine">
            <p>
              Ako svaka naredna površina iznosi četvrtinu prethodne, dobijaš
              beskonačni geometrijski red sa{" "}
              <InlineMath>{"q=\\frac14"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: može li beskonačna suma da postoji ako članovi ne teže nuli?"
          answer={
            <p>
              Ne može. Ako sami članovi ne idu ka nuli, parcijalne sume ne mogu
              da se stabilizuju. Zato je uslov{" "}
              <InlineMath>{"a_n\\to0"}</InlineMath> nužan, a kod geometrijskog
              niza to znači upravo <InlineMath>{"|q|<1"}</InlineMath> kada je{" "}
              <InlineMath>{"a_1\\neq0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: menjaj a1, q i broj članova i posmatraj ponašanje niza"
        description="Gore vidiš prvih n članova kao stubice, a dole graf parcijalnih suma S1, S2, ..., Sn. Najvažnije je da povežeš dve slike: kako se ponasaju sami članovi i sta to znači za ukupnu sumu."
      >
        <GeometricSeriesLab />

        <InsightCard title="Kako da učiš iz ovog laboratorijuma">
          <p>
            Pokušaj da prvo sam pogodiš sta ce se desiti sa članovima i sumom, pa
            tek onda proveri ekran. Ako vidiš da parcijalne sume prilaze
            stabilnoj liniji, to je konvergencija. Ako se udaljavaju, to je
            divergencija. Povezivanjem vizuelnog utiska sa formulama gradis
            pouzdanu intuiciju.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Korak po korak: od prepoznavanja količnika do beskonačne sume"
        description="U primerima ispod ides od osnovnog prepoznavanja geometrijskog niza do tipičnih prijemnih zadataka u kojima je progresija 'sakrivena' u tekstu. Obrati pažnju ne samo na račun, nego i na izbor metode."
      >
        {/* Primer 1 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 1: napiši opšti član i izračunaj traženi član
          </h3>
          <p>
            Dat je geometrijski niz <InlineMath>{"3,6,12,\\dots"}</InlineMath>.
            Nađi opšti član i izračunaj <InlineMath>{"a_6"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Prepoznaj prvi član i količnik">
              <p>
                Ovde je <InlineMath>{"a_1=3"}</InlineMath>, a količnik dobijaš iz
                odnosa susednih članova:
              </p>
              <MathBlock>{"q=\\frac{6}{3}=2"}</MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Primeni formulu za opšti član">
              <MathBlock>{"a_n=a_1q^{n-1}=3\\cdot 2^{n-1}"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Izračunaj šesti član">
              <MathBlock>{"a_6=3\\cdot 2^5=3\\cdot 32=96"}</MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: kada su <InlineMath>{"a_1"}</InlineMath> i{" "}
            <InlineMath>{"q"}</InlineMath> jasni, ceo niz je praktično određen
            jednom formulom.
          </p>
        </article>

        {/* Primer 2 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 2: od dva poznata člana do{" "}
            <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>
          </h3>
          <p>
            U geometrijskom nizu važi <InlineMath>{"a_2=6"}</InlineMath> i{" "}
            <InlineMath>{"a_5=48"}</InlineMath>. Odredi{" "}
            <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Zapisi poznate članove preko{" "}
                  <InlineMath>{"a_1"}</InlineMath> i{" "}
                  <InlineMath>{"q"}</InlineMath>
                </>
              }
            >
              <MathBlock>{"a_2=a_1q=6,\\qquad a_5=a_1q^4=48"}</MathBlock>
            </WalkStep>
            <WalkStep
              number={2}
              title={
                <>
                  Podeli jednačine da eliminišeš{" "}
                  <InlineMath>{"a_1"}</InlineMath>
                </>
              }
            >
              <MathBlock>
                {
                  "\\frac{a_5}{a_2}=\\frac{a_1q^4}{a_1q}=q^3=\\frac{48}{6}=8"
                }
              </MathBlock>
              <MathBlock>{"q=2"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Vrati se u jednostavniju jednačinu">
              <MathBlock>
                {"a_1q=6 \\Rightarrow 2a_1=6 \\Rightarrow a_1=3"}
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: kada znaš dva člana, podela jednačina je često najbrzi
            način da izdvojis količnik.
          </p>
        </article>

        {/* Primer 3 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 3: tri broja u geometrijskoj progresiji
          </h3>
          <p>
            Nađi tri pozitivna broja u geometrijskoj progresiji ako im je zbir
            14, a proizvod 64.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Postavi simetričan zapis">
              <p>
                Za tri uzastopna člana geometrijskog niza zgodno je pisati:
              </p>
              <MathBlock>{"\\frac{a}{q},\\ a,\\ aq"}</MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Iskoristi proizvod">
              <MathBlock>
                {"\\frac{a}{q}\\cdot a \\cdot aq = a^3 = 64"}
              </MathBlock>
              <MathBlock>{"a=4"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Iskoristi zbir">
              <MathBlock>{"\\frac{4}{q}+4+4q=14"}</MathBlock>
              <MathBlock>{"\\frac{1}{q}+1+q=\\frac{7}{2}"}</MathBlock>
              <MathBlock>{"2q^2-5q+2=0"}</MathBlock>
            </WalkStep>
            <WalkStep number={4} title="Reši kvadratnu jednačinu">
              <MathBlock>
                {
                  "q=\\frac{5\\pm3}{4} \\Rightarrow q=2 \\ \\text{ili}\\ q=\\frac12"
                }
              </MathBlock>
              <p>
                Oba rešenja daju iste brojeve samo obrnutim redosledom, pa su
                traženi brojevi:
              </p>
              <MathBlock>{"2,\\ 4,\\ 8"}</MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: kod tri broja u GP simetričan zapis često štedi vreme i
            čuva račun pod kontrolom.
          </p>
        </article>

        {/* Primer 4 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>Primer 4: suma prvih pet članova</h3>
          <p>
            Za geometrijski niz sa <InlineMath>{"a_1=16"}</InlineMath> i{" "}
            <InlineMath>{"q=\\frac12"}</InlineMath> izračunaj{" "}
            <InlineMath>{"S_5"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title="Proveri koji tip zadatka je u pitanju"
            >
              <p>
                Trazi se zbir prvih pet članova, dakle koristiš formulu za{" "}
                <InlineMath>{"S_n"}</InlineMath>, ne opšti član.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Uvrsti podatke">
              <MathBlock>
                {
                  "S_5=\\frac{16\\left(1-\\left(\\frac12\\right)^5\\right)}{1-\\frac12}"
                }
              </MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Sredi izraz">
              <MathBlock>
                {
                  "S_5=16\\cdot \\frac{1-\\frac{1}{32}}{\\frac12}=16\\cdot \\frac{31}{32}\\cdot 2=31"
                }
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: broj 31 je vrlo blizu beskonačnoj sumi 32, pa već vidis
            kako konačna suma &ldquo;prilazi&rdquo; granici.
          </p>
        </article>

        {/* Primer 5 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 5: beskonačna suma površina trouglova
          </h3>
          <p>
            Povrsina prvog trougla je{" "}
            <InlineMath>{"27 \\, \\text{cm}^2"}</InlineMath>, a svaka naredna
            površina jednaka je četvrtini prethodne. Odredi zbir površina svih
            trouglova.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Prepoznaj geometrijski red">
              <p>Povrsine su:</p>
              <MathBlock>{"27,\\ \\frac{27}{4},\\ \\frac{27}{16},\\ \\dots"}</MathBlock>
              <p>
                Pa su <InlineMath>{"a_1=27"}</InlineMath> i{" "}
                <InlineMath>{"q=\\frac14"}</InlineMath>.
              </p>
            </WalkStep>
            <WalkStep number={2} title="Proveri uslov konvergencije">
              <MathBlock>{"\\left|\\frac14\\right|<1"}</MathBlock>
              <p>Uslov je ispunjen, pa beskonačna suma postoji.</p>
            </WalkStep>
            <WalkStep
              number={3}
              title="Primeni formulu za beskonačan geometrijski red"
            >
              <MathBlock>
                {
                  "S=\\frac{a_1}{1-q}=\\frac{27}{1-\\frac14}=\\frac{27}{\\frac34}=36"
                }
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zaključak: beskonačno mnogo trouglova zajedno zauzima konačnu ukupnu
            površinu od <InlineMath>{"36 \\, \\text{cm}^2"}</InlineMath>.
          </p>
        </article>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ove obrasce moraš da znaš da prepoznaš, objasniš i pravilno primeniš"
        description="Formule nisu odvojene od značenja. Svaka ima svoju prirodnu situaciju i tipičnu zamku, zato ih uči zajedno sa kontekstom u kome se pojavljuju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Rekurzivni zapis"
            formula={"a_{n+1}=q\\cdot a_n"}
            note="Koristis ga kada prepoznaješ obrazac 'svaki sledeći član dobija se množenjem prethodnog'."
          />
          <FormulaCard
            title="Opšti član"
            formula="a_n=a_1q^{n-1}"
            note={
              <>
                Glavna formula za trazenje konkretnog člana i za poređenje
                članova sa različitim indeksima.
              </>
            }
          />
          <FormulaCard
            title="Konačna suma (q različito od 1)"
            formula={"S_n=\\frac{a_1(1-q^n)}{1-q}"}
            note="Najsigurniji oblik formule ako želiš da prirodno pređes na beskonačnu sumu."
          />
          <FormulaCard
            title="Poseban slučaj q = 1"
            formula={"S_n=n\\cdot a_1"}
            note="Ne zaboravi da opšta formula tada nije dozvoljena zbog deljenja nulom."
          />
          <FormulaCard
            title="Beskonačni red"
            formula={"|q|<1,\\qquad S=\\frac{a_1}{1-q}"}
            note="Prva stvar koju proveravaš pre bilo kakvog računanja beskonačne sume."
          />
          <FormulaCard
            title="Geometrijska sredina"
            formula="b^2=ac"
            note="Brza formula za zadatke u kojima tri izraza treba da čine geometrijski niz."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovde se najčešće gube laki bodovi"
        description="Većina grešaka u ovoj lekciji ne dolazi iz teških računa, nego iz mešanja pojmova. Zato ih vredi prepoznati unapred."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje aritmetičkog i geometrijskog niza
            </h3>
            <p>
              Učenik vidi pravilnost, ali ne proveri da li je stalna razlika ili
              stalni odnos. To vodi do potpuno pogrešne formule već u prvom
              koraku.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Automatska upotreba beskonačne sume
            </h3>
            <p>
              Formula <InlineMath>{"S=\\frac{a_1}{1-q}"}</InlineMath> ne vazi
              uvek. Bez provere uslova <InlineMath>{"|q|<1"}</InlineMath>{" "}
              rezultat je formalno lep, ali matematički netacan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen poseban slučaj q = 1
            </h3>
            <p>
              Kod sume prvih <InlineMath>{"n"}</InlineMath> članova moras
              odvojiti <InlineMath>{"q=1"}</InlineMath>, jer opšta formula tada
              deli nulom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Gubljenje znaka kada je q &lt; 0
            </h3>
            <p>
              Negativan količnik znači da se znakovi smenjuju. Ako to zanemaris,
              dobices pogrešne članove i pogrešne parcijalne sume.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno pojavljuje na ispitu"
        description="Na prijemnom zadatak retko kaže direktno: 'ovo je geometrijski niz'. Češće ces dobiti opis odnosa, tri broja, parametar ili geometrijsku konstrukciju. Zato ti treba rutinski način prepoznavanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: dva poznata člana, nepoznat a1 i q">
            <p>
              Najčešće delis jednačine da eliminišeš{" "}
              <InlineMath>{"a_1"}</InlineMath>, pa potom vraćaš u jednostavniji
              izraz.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: tri broja u progresiji">
            <p>
              Ovde radi formula <InlineMath>{"b^2=ac"}</InlineMath> ili
              simetričan zapis{" "}
              <InlineMath>{"\\frac{a}{q},a,aq"}</InlineMath>. Zadaci se često
              povezuju sa sistemima jednačina.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: konačna suma">
            <p>
              Trazi se zbir prvih <InlineMath>{"n"}</InlineMath> članova.
              Najbitnije je da pravilno odabereš formulu i ne zaboraviš slučaj{" "}
              <InlineMath>{"q=1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: beskonačne površine ili dužine">
            <p>
              U geometrijskim zadacima prepoznaješ da se svaka nova velicina
              dobija istim faktorom od prethodne, pa problem prelazi u beskonačni
              geometrijski red.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ispitna rutina u 4 koraka">
          <ol>
            <li>
              Prvo odluči da li je promena između članova aditivna ili
              multiplikativna.
            </li>
            <li>
              Kada je niz geometrijski, odmah izdvoji{" "}
              <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>.
            </li>
            <li>
              Prepoznaj da li zadatak traži član, konačnu sumu ili beskonačnu
              sumu.
            </li>
            <li>
              Za beskonačnu sumu obavezno proveri uslov{" "}
              <InlineMath>{"|q|<1"}</InlineMath> pre konačne formule.
            </li>
          </ol>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li možeš samostalno da vodiš ceo postupak"
        description="Reši zadatke samostalno, pa tek onda otvori rešenja. Cilj je da naučiš da sam prepoznaš tip problema i izabereš pravu formulu."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za geometrijski niz sa <InlineMath>{"a_1=5"}</InlineMath> i{" "}
                <InlineMath>{"q=3"}</InlineMath> izračunaj{" "}
                <InlineMath>{"a_4"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>{"a_4=5\\cdot 3^{3}=135"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                U geometrijskom nizu važi <InlineMath>{"a_3=12"}</InlineMath> i{" "}
                <InlineMath>{"a_6=96"}</InlineMath>. Odredi{" "}
                <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>
                .
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "\\frac{a_6}{a_3}=q^3=\\frac{96}{12}=8 \\Rightarrow q=2"
                  }
                </MathBlock>
                <MathBlock>
                  {"a_3=a_1q^2 \\Rightarrow 12=4a_1 \\Rightarrow a_1=3"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Nađi <InlineMath>{"x"}</InlineMath> tako da brojevi{" "}
                <InlineMath>{"x-1"}</InlineMath>,{" "}
                <InlineMath>{"x+2"}</InlineMath>,{" "}
                <InlineMath>{"x+8"}</InlineMath> budu uzastopni članovi
                geometrijskog niza.
              </p>
            }
            solution={
              <>
                <MathBlock>{"(x+2)^2=(x-1)(x+8)"}</MathBlock>
                <MathBlock>{"x^2+4x+4=x^2+7x-8"}</MathBlock>
                <MathBlock>{"12=3x \\Rightarrow x=4"}</MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Izračunaj <InlineMath>{"S_6"}</InlineMath> za{" "}
                <InlineMath>{"a_1=4"}</InlineMath> i{" "}
                <InlineMath>{"q=\\frac12"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "S_6=\\frac{4\\left(1-\\left(\\frac12\\right)^6\\right)}{1-\\frac12}=8\\left(1-\\frac{1}{64}\\right)=8\\cdot \\frac{63}{64}=\\frac{63}{8}"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Povrsina prvog trougla je{" "}
                <InlineMath>{"40 \\, \\text{cm}^2"}</InlineMath>, a svaka
                naredna jednaka je petini prethodne. Odredi zbir svih površina.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"a_1=40,\\qquad q=\\frac15,\\qquad \\left|q\\right|<1"}
                </MathBlock>
                <MathBlock>
                  {"S=\\frac{40}{1-\\frac15}=\\frac{40}{\\frac45}=50"}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Da li red{" "}
                <InlineMath>{"7-14+28-56+\\dots"}</InlineMath> ima beskonačnu
                sumu?
              </p>
            }
            solution={
              <p>
                Ovde je <InlineMath>{"a_1=7"}</InlineMath> i{" "}
                <InlineMath>{"q=-2"}</InlineMath>. Pošto je{" "}
                <InlineMath>{"|q|=2>1"}</InlineMath>, članovi ne teže nuli i red{" "}
                <strong>nema beskonačnu sumu</strong>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        id="uvid"
        eyebrow="Završni uvid"
        title="Najvažniji misaoni obrazac: ista multiplikacija upravlja i članovima i sumama"
        description="Ne uči ovu lekciju kao tri nepovezane formule. Opšti član, suma prvih n članova i beskonačna suma nastaju iz iste ideje: svaki novi korak menja prethodni rezultat istim faktorom q. Kada to razumeš, formule se ne pamte mehanički, nego postaju prirodna posledica jedne slike."
      >
        <div />
      </LessonSection>

      {/* ═══════════ ZAVRSNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
      >
        <div className={s.grid2}>
          <SectionCard title="1. Prepoznavanje">
            <p>
              Geometrijski niz prepoznaješ po stalnom količniku{" "}
              <InlineMath>{"q"}</InlineMath>, ne po stalnoj različi.
            </p>
          </SectionCard>
          <SectionCard title="2. Opšti član">
            <p>
              Za prvi član <InlineMath>{"a_1"}</InlineMath> i količnik{" "}
              <InlineMath>{"q"}</InlineMath> vazi{" "}
              <InlineMath>{"a_n=a_1q^{n-1}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="3. Konačna suma">
            <p>
              Za <InlineMath>{"q\\neq1"}</InlineMath> koristiš{" "}
              <InlineMath>{"S_n=\\frac{a_1(1-q^n)}{1-q}"}</InlineMath>, a za{" "}
              <InlineMath>{"q=1"}</InlineMath> vazi{" "}
              <InlineMath>{"S_n=na_1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="4. Beskonačna suma">
            <p>
              Formula <InlineMath>{"S=\\frac{a_1}{1-q}"}</InlineMath> važi samo
              ako je <InlineMath>{"|q|<1"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Sledeći korak">
          <p>
            Sledeći logičan korak je limes: baš on daje formalno opravdanje zasto
            parcijalne sume geometrijskog reda mogu da imaju konačnu granicu.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}
