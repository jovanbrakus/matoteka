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
  { href: "#zasto", label: "Zasto je vazna" },
  { href: "#definicija", label: "Definicija i opsti clan" },
  { href: "#ponasanje", label: "Ponasanje niza" },
  { href: "#suma", label: "Suma prvih clanova" },
  { href: "#beskonacni", label: "Beskonacni red" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#formule", label: "Kljucne formule" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Zavrsni rezime" },
];

export default function Lesson56Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 56"
        title={
          <>
            Geometrijski niz{" "}
            <span className={cs.tHeroAccent}>
              i beskonacni geometrijski red
            </span>
          </>
        }
        description="Kada se svaki sledeci clan dobija mnozenjem istim brojem, ulazis u svet geometrijskog niza. Ova lekcija te vodi od osnovne ideje kolicnika q, preko opsteg clana i sume prvih n clanova, do prvog ozbiljnog susreta sa beskonacnim sabiranjem koje ipak daje konacan rezultat."
        heroImageSrc="/api/lessons/56/hero"
        heroImageAlt="Ilustracija za lekciju o geometrijskom nizu i beskonacnom geometrijskom redu"
        cards={[
          {
            label: "Naucices",
            description:
              "Kako da iz teksta zadatka izvuces a\u2081, q, a\u2099, S\u2099 i po potrebi S\u221E.",
          },
          {
            label: "Najveca zamka",
            description:
              "Mesanje sume prvih n clanova sa beskonacnom sumom i zaboravljanje da za S\u221E mora vaziti |q| < 1.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Zadaci sa tri broja u progresiji, odredjivanje parametara niza i sabiranje beskonacno mnogo povrsina.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "80 do 100 minuta sa laboratorijom i vodjenim primerima.",
          },
          {
            label: "Predznanje",
            description: "Stepeni, jednacine i nizovi.",
          },
          {
            label: "Glavna vestina",
            description:
              "Prevedi tekst u a\u2081 i q pa odluci sta trazis.",
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
        eyebrow="Zasto je ova lekcija vazna"
        title="Ovo je prvi trenutak kada beskonacno pocinje da daje konacan broj"
        description="Geometrijski niz nije samo 'jos jedna progresija'. On te uvodi u razmisljanje koje je srce matematicke analize: promena vise nije ista u apsolutnom smislu, nego se meri faktorom, a parcijalne sume mogu da se priblizavaju granici."
      >
        <div className={s.grid2}>
          <SectionCard title="Gde se ova ideja javlja kasnije">
            <p>
              Geometrijski niz je osnova za razumevanje eksponencijalnog rasta i
              opadanja. Isti model stoji iza kamate, radioaktivnog raspada,
              prigusenja signala i mnogih modela iz fizike i ekonomije.
            </p>
            <ul>
              <li>
                <strong>U matematickoj analizi:</strong> priprema te za limes
                niza i redove.
              </li>
              <li>
                <strong>U geometriji:</strong> sabiras beskonacno mnogo sve
                manjih duzina, povrsina ili zapremina.
              </li>
              <li>
                <strong>Na prijemnom:</strong> zadatak cesto krije geometrijski
                niz iza price o brojevima, procentima ili povrsinama.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Sta prijemni zapravo proverava">
            <p>
              Prijemni ne proverava samo da li znas formulu napamet. Proverava
              da li umes da prepoznas <strong>multiplikativni obrazac</strong> i
              da li razlikujes tri tipa pitanja:
            </p>
            <ul>
              <li>
                <strong>Clan niza:</strong> trazi se{" "}
                <InlineMath>{"a_n"}</InlineMath>, pa koristis opsti clan.
              </li>
              <li>
                <strong>Konacna suma:</strong> trazi se{" "}
                <InlineMath>{"S_n"}</InlineMath>, pa moras znati i poseban
                slucaj <InlineMath>{"q=1"}</InlineMath>.
              </li>
              <li>
                <strong>Beskonacna suma:</strong> prvo proveravas da li{" "}
                <InlineMath>{"|q|<1"}</InlineMath>, pa tek onda pises formulu za{" "}
                <InlineMath>{"S_\\infty"}</InlineMath>.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Kljucna poruka cele lekcije">
          <p>
            <strong>
              Aritmeticki niz misli kroz razliku, geometrijski niz misli kroz
              faktor.
            </strong>{" "}
            Ako svaki korak &ldquo;umnozava&rdquo; prethodni clan, trazis{" "}
            <InlineMath>{"q"}</InlineMath>, a ne razliku{" "}
            <InlineMath>{"d"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: zasto geometrijski niz prirodno vodi ka beskonacnom redu?"
          answer={
            <p>
              Zato sto clanovi cesto postaju sve manji po istom faktoru. Kada taj
              faktor po apsolutnoj vrednosti ostaje manji od 1, parcijalne sume
              se priblizavaju granici i beskonacno sabiranje dobija smisao.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ DEFINICIJA I OPSTI CLAN ═══════════ */}
      <LessonSection
        id="definicija"
        eyebrow="Definicija i opsti clan"
        title="Geometrijski niz nastaje kada je odnos susednih clanova stalan"
        description="Najjednostavnije receno, u geometrijskom nizu svaki sledeci clan dobijas tako sto prethodni clan pomnozis istim brojem q. Taj broj zove se kolicnik ili kvocijent niza."
      >
        <div className={s.grid2}>
          <SectionCard title="Intuicija i formalni zapis">
            <p>
              Ako je prvi clan <InlineMath>{"a_1"}</InlineMath>, onda vazi:
            </p>
            <MathBlock>
              {"a_2=a_1q,\\qquad a_3=a_2q,\\qquad a_4=a_3q,\\ \\dots"}
            </MathBlock>
            <p>To mozes sazeto zapisati kao:</p>
            <MathBlock>{"a_{n+1}=q\\cdot a_n"}</MathBlock>
            <p>Kada su susedni clanovi nenula, kolicnik citas kao:</p>
            <MathBlock>{"q=\\frac{a_{n+1}}{a_n}"}</MathBlock>
            <p>
              Pedagoski vazno: nemoj se vezivati samo za razlomak{" "}
              <InlineMath>{"\\frac{a_{n+1}}{a_n}"}</InlineMath>. Opsti oblik{" "}
              <InlineMath>{"a_n=a_1q^{n-1}"}</InlineMath> ostaje validan i za{" "}
              <InlineMath>{"q=0"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kako nastaje opsti clan">
            <p>
              Ako vise puta primenjujes pravilo mnozenja sa{" "}
              <InlineMath>{"q"}</InlineMath>, dobijas:
            </p>
            <MathBlock>
              {"a_2=a_1q,\\qquad a_3=a_1q^2,\\qquad a_4=a_1q^3"}
            </MathBlock>
            <p>
              Zato za <InlineMath>{"n"}</InlineMath>-ti clan vazi kljucna
              formula:
            </p>
            <MathBlock>{"a_n=a_1q^{n-1}"}</MathBlock>
            <p>
              Ova formula je glavno orudje kada treba da nadjes konkretan clan,
              da poredis dva clana ili da iz poznatih clanova izracunas
              nepoznat <InlineMath>{"q"}</InlineMath> i{" "}
              <InlineMath>{"a_1"}</InlineMath>.
            </p>
            <InsightCard title="Uloga kolicnika q">
              <p>
                Ako je <InlineMath>{"q"}</InlineMath> negativan, clanovi menjaju
                znak. Ako je{" "}
                <InlineMath>{"0<q<1"}</InlineMath>, apsolutne vrednosti clanova
                opadaju. Dakle,{" "}
                <strong>
                  jedan broj <InlineMath>{"q"}</InlineMath> odredjuje celu pricu
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
              Ovde je <InlineMath>{"q=2"}</InlineMath>, jer svaki clan dobijas
              udvostrucavanjem prethodnog.
            </p>
          </SectionCard>
          <SectionCard title="Primer opadanja">
            <MathBlock>{"81,27,9,3,\\dots"}</MathBlock>
            <p>
              Ovde je <InlineMath>{"q=\\frac{1}{3}"}</InlineMath>, pa se clanovi
              smanjuju, ali ne prelaze u negativne vrednosti.
            </p>
          </SectionCard>
          <SectionCard title="Naizmenicni primer">
            <MathBlock>{"4,-2,1,-\\frac12,\\dots"}</MathBlock>
            <p>
              Kolicnik je <InlineMath>{"q=-\\frac12"}</InlineMath>. Znak se
              smenjuje, a apsolutne vrednosti idu ka nuli.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: po cemu na prvi pogled razlikujes aritmeticki i geometrijski niz?"
          answer={
            <p>
              U aritmetickom nizu proveravas da li je razlika izmedju susednih
              clanova stalna. U geometrijskom proveravas da li je odnos susednih
              clanova stalan, odnosno da li svaki clan nastaje mnozenjem
              prethodnog istim faktorom.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PONASANJE NIZA ═══════════ */}
      <LessonSection
        id="ponasanje"
        eyebrow="Ponasanje niza"
        title="Broj q odmah govori da li niz raste, opada ili menja znak"
        description="Jedna od najvaznijih prijemnih vestina je da ne racunas naslepo. Pre nego sto krenes u formulu, pogledaj vrednost q. Ona ti daje intuiciju o tome sta treba da ocekujes od clanova i od suma."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako se niz ponasa za razlicite vrednosti q">
            <ul>
              <li>
                <strong>
                  <InlineMath>{"q>1"}</InlineMath>:
                </strong>{" "}
                clanovi rastu po apsolutnoj vrednosti, a za pozitivan{" "}
                <InlineMath>{"a_1"}</InlineMath> niz brzo raste.
              </li>
              <li>
                <strong>
                  <InlineMath>{"0<q<1"}</InlineMath>:
                </strong>{" "}
                clanovi ostaju istog znaka i po apsolutnoj vrednosti opadaju ka
                nuli.
              </li>
              <li>
                <strong>
                  <InlineMath>{"q=1"}</InlineMath>:
                </strong>{" "}
                svi clanovi su jednaki prvom clanu, pa dobijas konstantan niz.
              </li>
              <li>
                <strong>
                  <InlineMath>{"q=0"}</InlineMath>:
                </strong>{" "}
                prvi clan je <InlineMath>{"a_1"}</InlineMath>, a svi sledeci su
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
                beskonacna suma nema smisla.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Srednji clan i zadaci sa tri broja u progresiji">
            <p>
              Za tri uzastopna clana geometrijskog niza vazi lepa osobina:
            </p>
            <MathBlock>{"a_n^2=a_{n-1}\\cdot a_{n+1}"}</MathBlock>
            <p>
              To znaci da je srednji clan{" "}
              <strong>geometrijska sredina</strong> svojih suseda. Upravo ova
              ideja resava mnoge zadatke tipa: &ldquo;nadji broj{" "}
              <InlineMath>{"x"}</InlineMath> tako da tri izraza cine
              geometrijski niz&rdquo;.
            </p>
            <MathBlock>{"b^2=ac"}</MathBlock>
            <p>
              kada su <InlineMath>{"a,b,c"}</InlineMath> tri uzastopna clana
              geometrijskog niza. Ovu formulu koristis brzo, ali tek posto si
              siguran da su clanovi zaista <strong>uzastopni</strong> i pravilno
              poredjani.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Pad ka nuli">
            <p>
              <InlineMath>{"q=\\frac13"}</InlineMath>: Brojevi se smanjuju:{" "}
              <InlineMath>{"27,9,3,1,\\frac13,\\dots"}</InlineMath>. Ovakav niz
              je odlican kandidat za beskonacnu sumu.
            </p>
          </SectionCard>
          <SectionCard title="Smena znakova">
            <p>
              <InlineMath>{"q=-\\frac12"}</InlineMath>: Niz{" "}
              <InlineMath>{"8,-4,2,-1,\\dots"}</InlineMath> osciluje po znaku,
              ali amplituda opada. Zato beskonacni red ipak moze da konvergira.
            </p>
          </SectionCard>
          <SectionCard title="Tri broja u GP">
            <p>
              Ako su <InlineMath>{"x-1"}</InlineMath>,{" "}
              <InlineMath>{"x+2"}</InlineMath>,{" "}
              <InlineMath>{"x+8"}</InlineMath> uzastopni clanovi, pises{" "}
              <InlineMath>{"(x+2)^2=(x-1)(x+8)"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: moze li niz sa negativnim q da ima beskonacnu sumu?"
          answer={
            <p>
              Moze, ali samo ako je <InlineMath>{"|q|<1"}</InlineMath>. Tada se
              znakovi smenjuju, ali apsolutne vrednosti clanova opadaju ka nuli,
              pa parcijalne sume ipak imaju granicu.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ SUMA PRVIH n CLANOVA ═══════════ */}
      <LessonSection
        id="suma"
        eyebrow="Suma prvih n clanova"
        title="Formula za S_n nastaje jednim pametnim oduzimanjem"
        description="Nemoj uciti formulu za sumu kao izolovan zapis. Kada razumes njeno izvodjenje, mnogo redje ces pomesati znakove ili zaboraviti poseban slucaj q = 1."
      >
        <div className={s.grid2}>
          <SectionCard title="Izvodjenje formule">
            <p>
              Za geometrijski niz sa prvim clanom{" "}
              <InlineMath>{"a_1"}</InlineMath> i kolicnikom{" "}
              <InlineMath>{"q"}</InlineMath> suma prvih{" "}
              <InlineMath>{"n"}</InlineMath> clanova je:
            </p>
            <MathBlock>
              {"S_n=a_1+a_1q+a_1q^2+\\dots+a_1q^{n-1}"}
            </MathBlock>
            <p>
              Pomnozi celu jednacinu sa <InlineMath>{"q"}</InlineMath>:
            </p>
            <MathBlock>{"qS_n=a_1q+a_1q^2+\\dots+a_1q^{n}"}</MathBlock>
            <p>
              Sada oduzmi drugu jednakost od prve. Vecina clanova se ponisti:
            </p>
            <MathBlock>{"S_n-qS_n=a_1-a_1q^n"}</MathBlock>
            <MathBlock>{"S_n(1-q)=a_1(1-q^n)"}</MathBlock>
            <p>
              Za <InlineMath>{"q\\neq1"}</InlineMath> dobijas:
            </p>
            <MathBlock>{"S_n=\\frac{a_1(1-q^n)}{1-q}"}</MathBlock>
          </SectionCard>

          <SectionCard title="Poseban slucaj q = 1">
            <p>
              Kada je <InlineMath>{"q=1"}</InlineMath>, svi clanovi su jednaki{" "}
              <InlineMath>{"a_1"}</InlineMath>, pa formula sa deljenjem kroz{" "}
              <InlineMath>{"1-q"}</InlineMath> nije dozvoljena. Zato ovaj slucaj
              izdvajas posebno:
            </p>
            <MathBlock>{"S_n=n\\cdot a_1"}</MathBlock>
            <p>
              Ovo je tipicna ispitna zamka: ucenik mehanicki primeni opstu
              formulu, dobije deljenje nulom i izgubi lake bodove.
            </p>
            <InsightCard title="Alternativni zapis">
              <p>
                Mozes koristiti i ekvivalentan zapis{" "}
                <InlineMath>
                  {"S_n=\\frac{a_1(q^n-1)}{q-1}"}
                </InlineMath>
                , ali vodi racuna da oba oblika znace isto. Izaberi onaj u kome
                ti je lakse da ne pogresis sa znakovima.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Brzi racun">
            <p>
              <InlineMath>{"a_1=3,\\ q=2,\\ n=4"}</InlineMath>
            </p>
            <MathBlock>{"S_4=\\frac{3(1-2^4)}{1-2}=45"}</MathBlock>
            <p>
              To je isto sto i <InlineMath>{"3+6+12+24"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Opadajuci niz">
            <p>
              <InlineMath>{"a_1=16,\\ q=\\frac12,\\ n=5"}</InlineMath>
            </p>
            <MathBlock>
              {"S_5=16\\cdot \\frac{1-(1/2)^5}{1-1/2}=31"}
            </MathBlock>
            <p>Ovakvi brojevi su bliski beskonacnoj sumi 32.</p>
          </SectionCard>
          <SectionCard title="Poseban slucaj">
            <p>
              <InlineMath>{"a_1=7,\\ q=1,\\ n=10"}</InlineMath>
            </p>
            <MathBlock>{"S_{10}=10\\cdot7=70"}</MathBlock>
            <p>
              Svi clanovi su 7, pa nema potrebe za opstom formulom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zasto pri izvodjenju formule upravo mnozis sumu sa q?"
          answer={
            <p>
              Zato sto se tada gotovo svi clanovi poravnaju i poniste pri
              oduzimanju. Ostaju samo prvi clan{" "}
              <InlineMath>{"a_1"}</InlineMath> i poslednji pomereni clan{" "}
              <InlineMath>{"a_1q^n"}</InlineMath>, pa se formula dobija veoma
              cisto.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ BESKONACNI GEOMETRIJSKI RED ═══════════ */}
      <LessonSection
        id="beskonacni"
        eyebrow="Beskonacni geometrijski red"
        title="Beskonacna suma postoji samo kada se clanovi stvarno gase"
        description="Ovde se prvi put javlja ideja da beskonacno mnogo clanova moze dati konacan zbir. To nije magija. To je posledica cinjenice da novi clanovi postaju sve manji tako brzo da njihov ukupan doprinos ima granicu."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako iz S_n dolazis do S beskonacno">
            <p>
              Vec znas da za <InlineMath>{"q\\neq1"}</InlineMath> vazi:
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
              Ovo je formula za beskonacni geometrijski red. Ali ona vazi samo
              pod uslovom <InlineMath>{"|q|<1"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Zasto uslov |q| < 1 nije ukras">
            <ul>
              <li>
                <strong>
                  Ako <InlineMath>{"0<q<1"}</InlineMath>:
                </strong>{" "}
                clanovi su pozitivni i opadaju ka nuli.
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
                clanovi se ne smanjuju, pa zbir raste bez granice ako je{" "}
                <InlineMath>{"a_1\\neq0"}</InlineMath>.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"|q|>1"}</InlineMath>:
                </strong>{" "}
                clanovi rastu po apsolutnoj vrednosti i nema konvergencije.
              </li>
              <li>
                <strong>
                  Ako <InlineMath>{"q=-1"}</InlineMath>:
                </strong>{" "}
                niz osciluje izmedju dve vrednosti, pa parcijalne sume nemaju
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
                Ako to ne proveris, mozes napisati formalno lep, ali matematicki
                pogresan rezultat.
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
              Ako svaka naredna povrsina iznosi cetvrtinu prethodne, dobijas
              beskonacni geometrijski red sa{" "}
              <InlineMath>{"q=\\frac14"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: moze li beskonacna suma da postoji ako clanovi ne teze nuli?"
          answer={
            <p>
              Ne moze. Ako sami clanovi ne idu ka nuli, parcijalne sume ne mogu
              da se stabilizuju. Zato je uslov{" "}
              <InlineMath>{"a_n\\to0"}</InlineMath> nuzan, a kod geometrijskog
              niza to znaci upravo <InlineMath>{"|q|<1"}</InlineMath> kada je{" "}
              <InlineMath>{"a_1\\neq0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: menjaj a1, q i broj clanova i posmatraj ponasanje niza"
        description="Gore vidis prvih n clanova kao stubice, a dole graf parcijalnih suma S1, S2, ..., Sn. Najvaznije je da povezes dve slike: kako se ponasaju sami clanovi i sta to znaci za ukupnu sumu."
      >
        <GeometricSeriesLab />

        <InsightCard title="Kako da ucis iz ovog laboratorijuma">
          <p>
            Pokusaj da prvo sam pogodis sta ce se desiti sa clanovima i sumom, pa
            tek onda proveri ekran. Ako vidis da parcijalne sume prilaze
            stabilnoj liniji, to je konvergencija. Ako se udaljavaju, to je
            divergencija. Povezivanjem vizuelnog utiska sa formulama gradis
            pouzdanu intuiciju.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Korak po korak: od prepoznavanja kolicnika do beskonacne sume"
        description="U primerima ispod ides od osnovnog prepoznavanja geometrijskog niza do tipicnih prijemnih zadataka u kojima je progresija 'sakrivena' u tekstu. Obrati paznju ne samo na racun, nego i na izbor metode."
      >
        {/* Primer 1 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 1: napisi opsti clan i izracunaj trazeni clan
          </h3>
          <p>
            Dat je geometrijski niz <InlineMath>{"3,6,12,\\dots"}</InlineMath>.
            Nadji opsti clan i izracunaj <InlineMath>{"a_6"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Prepoznaj prvi clan i kolicnik">
              <p>
                Ovde je <InlineMath>{"a_1=3"}</InlineMath>, a kolicnik dobijas iz
                odnosa susednih clanova:
              </p>
              <MathBlock>{"q=\\frac{6}{3}=2"}</MathBlock>
            </WalkStep>
            <WalkStep number={2} title="Primeni formulu za opsti clan">
              <MathBlock>{"a_n=a_1q^{n-1}=3\\cdot 2^{n-1}"}</MathBlock>
            </WalkStep>
            <WalkStep number={3} title="Izracunaj sesti clan">
              <MathBlock>{"a_6=3\\cdot 2^5=3\\cdot 32=96"}</MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zakljucak: kada su <InlineMath>{"a_1"}</InlineMath> i{" "}
            <InlineMath>{"q"}</InlineMath> jasni, ceo niz je prakticno odredjen
            jednom formulom.
          </p>
        </article>

        {/* Primer 2 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 2: od dva poznata clana do{" "}
            <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>
          </h3>
          <p>
            U geometrijskom nizu vazi <InlineMath>{"a_2=6"}</InlineMath> i{" "}
            <InlineMath>{"a_5=48"}</InlineMath>. Odredi{" "}
            <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title={
                <>
                  Zapisi poznate clanove preko{" "}
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
                  Podeli jednacine da eliminises{" "}
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
            <WalkStep number={3} title="Vrati se u jednostavniju jednacinu">
              <MathBlock>
                {"a_1q=6 \\Rightarrow 2a_1=6 \\Rightarrow a_1=3"}
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zakljucak: kada znas dva clana, podela jednacina je cesto najbrzi
            nacin da izdvojis kolicnik.
          </p>
        </article>

        {/* Primer 3 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>
            Primer 3: tri broja u geometrijskoj progresiji
          </h3>
          <p>
            Nadji tri pozitivna broja u geometrijskoj progresiji ako im je zbir
            14, a proizvod 64.
          </p>
          <div className={s.walkthrough}>
            <WalkStep number={1} title="Postavi simetrican zapis">
              <p>
                Za tri uzastopna clana geometrijskog niza zgodno je pisati:
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
            <WalkStep number={4} title="Resi kvadratnu jednacinu">
              <MathBlock>
                {
                  "q=\\frac{5\\pm3}{4} \\Rightarrow q=2 \\ \\text{ili}\\ q=\\frac12"
                }
              </MathBlock>
              <p>
                Oba resenja daju iste brojeve samo obrnutim redosledom, pa su
                trazeni brojevi:
              </p>
              <MathBlock>{"2,\\ 4,\\ 8"}</MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zakljucak: kod tri broja u GP simetrican zapis cesto stedi vreme i
            cuva racun pod kontrolom.
          </p>
        </article>

        {/* Primer 4 */}
        <article className={s.exampleCard} style={{ marginBottom: 18 }}>
          <h3 className={cs.tCardTitle}>Primer 4: suma prvih pet clanova</h3>
          <p>
            Za geometrijski niz sa <InlineMath>{"a_1=16"}</InlineMath> i{" "}
            <InlineMath>{"q=\\frac12"}</InlineMath> izracunaj{" "}
            <InlineMath>{"S_5"}</InlineMath>.
          </p>
          <div className={s.walkthrough}>
            <WalkStep
              number={1}
              title="Proveri koji tip zadatka je u pitanju"
            >
              <p>
                Trazi se zbir prvih pet clanova, dakle koristis formulu za{" "}
                <InlineMath>{"S_n"}</InlineMath>, ne opsti clan.
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
            Zakljucak: broj 31 je vrlo blizu beskonacnoj sumi 32, pa vec vidis
            kako konacna suma &ldquo;prilazi&rdquo; granici.
          </p>
        </article>

        {/* Primer 5 */}
        <article className={s.exampleCard}>
          <h3 className={cs.tCardTitle}>
            Primer 5: beskonacna suma povrsina trouglova
          </h3>
          <p>
            Povrsina prvog trougla je{" "}
            <InlineMath>{"27 \\, \\text{cm}^2"}</InlineMath>, a svaka naredna
            povrsina jednaka je cetvrtini prethodne. Odredi zbir povrsina svih
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
              <p>Uslov je ispunjen, pa beskonacna suma postoji.</p>
            </WalkStep>
            <WalkStep
              number={3}
              title="Primeni formulu za beskonacan geometrijski red"
            >
              <MathBlock>
                {
                  "S=\\frac{a_1}{1-q}=\\frac{27}{1-\\frac14}=\\frac{27}{\\frac34}=36"
                }
              </MathBlock>
            </WalkStep>
          </div>
          <p style={{ marginTop: 14, color: "var(--lesson-primary-soft)", fontWeight: 700 }}>
            Zakljucak: beskonacno mnogo trouglova zajedno zauzima konacnu ukupnu
            povrsinu od <InlineMath>{"36 \\, \\text{cm}^2"}</InlineMath>.
          </p>
        </article>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Kljucne formule"
        title="Ove obrasce moras da znas da prepoznas, objasnis i pravilno primenis"
        description="Formule nisu odvojene od znacenja. Svaka ima svoju prirodnu situaciju i tipicnu zamku, zato ih uci zajedno sa kontekstom u kome se pojavljuju."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Rekurzivni zapis"
            formula={"a_{n+1}=q\\cdot a_n"}
            note="Koristis ga kada prepoznajes obrazac 'svaki sledeci clan dobija se mnozenjem prethodnog'."
          />
          <FormulaCard
            title="Opsti clan"
            formula="a_n=a_1q^{n-1}"
            note={
              <>
                Glavna formula za trazenje konkretnog clana i za poredjenje
                clanova sa razlicitim indeksima.
              </>
            }
          />
          <FormulaCard
            title="Konacna suma (q razlicito od 1)"
            formula={"S_n=\\frac{a_1(1-q^n)}{1-q}"}
            note="Najsigurniji oblik formule ako zelis da prirodno predjes na beskonacnu sumu."
          />
          <FormulaCard
            title="Poseban slucaj q = 1"
            formula={"S_n=n\\cdot a_1"}
            note="Ne zaboravi da opsta formula tada nije dozvoljena zbog deljenja nulom."
          />
          <FormulaCard
            title="Beskonacni red"
            formula={"|q|<1,\\qquad S=\\frac{a_1}{1-q}"}
            note="Prva stvar koju proveravas pre bilo kakvog racunanja beskonacne sume."
          />
          <FormulaCard
            title="Geometrijska sredina"
            formula="b^2=ac"
            note="Brza formula za zadatke u kojima tri izraza treba da cine geometrijski niz."
          />
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Ovde se najcesce gube laki bodovi"
        description="Vecina gresaka u ovoj lekciji ne dolazi iz teskih racuna, nego iz mesanja pojmova. Zato ih vredi prepoznati unapred."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mesanje aritmetickog i geometrijskog niza
            </h3>
            <p>
              Ucenik vidi pravilnost, ali ne proveri da li je stalna razlika ili
              stalni odnos. To vodi do potpuno pogresne formule vec u prvom
              koraku.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Automatska upotreba beskonacne sume
            </h3>
            <p>
              Formula <InlineMath>{"S=\\frac{a_1}{1-q}"}</InlineMath> ne vazi
              uvek. Bez provere uslova <InlineMath>{"|q|<1"}</InlineMath>{" "}
              rezultat je formalno lep, ali matematicki netacan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen poseban slucaj q = 1
            </h3>
            <p>
              Kod sume prvih <InlineMath>{"n"}</InlineMath> clanova moras
              odvojiti <InlineMath>{"q=1"}</InlineMath>, jer opsta formula tada
              deli nulom.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Gubljenje znaka kada je q &lt; 0
            </h3>
            <p>
              Negativan kolicnik znaci da se znakovi smenjuju. Ako to zanemaris,
              dobices pogresne clanove i pogresne parcijalne sume.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno pojavljuje na ispitu"
        description="Na prijemnom zadatak retko kaze direktno: 'ovo je geometrijski niz'. Cesce ces dobiti opis odnosa, tri broja, parametar ili geometrijsku konstrukciju. Zato ti treba rutinski nacin prepoznavanja."
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: dva poznata clana, nepoznat a1 i q">
            <p>
              Najcesce delis jednacine da eliminises{" "}
              <InlineMath>{"a_1"}</InlineMath>, pa potom vracas u jednostavniji
              izraz.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: tri broja u progresiji">
            <p>
              Ovde radi formula <InlineMath>{"b^2=ac"}</InlineMath> ili
              simetrican zapis{" "}
              <InlineMath>{"\\frac{a}{q},a,aq"}</InlineMath>. Zadaci se cesto
              povezuju sa sistemima jednacina.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: konacna suma">
            <p>
              Trazi se zbir prvih <InlineMath>{"n"}</InlineMath> clanova.
              Najbitnije je da pravilno odaberes formulu i ne zaboravis slucaj{" "}
              <InlineMath>{"q=1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: beskonacne povrsine ili duzine">
            <p>
              U geometrijskim zadacima prepoznajes da se svaka nova velicina
              dobija istim faktorom od prethodne, pa problem prelazi u beskonacni
              geometrijski red.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Ispitna rutina u 4 koraka">
          <ol>
            <li>
              Prvo odluci da li je promena izmedju clanova aditivna ili
              multiplikativna.
            </li>
            <li>
              Kada je niz geometrijski, odmah izdvoji{" "}
              <InlineMath>{"a_1"}</InlineMath> i <InlineMath>{"q"}</InlineMath>.
            </li>
            <li>
              Prepoznaj da li zadatak trazi clan, konacnu sumu ili beskonacnu
              sumu.
            </li>
            <li>
              Za beskonacnu sumu obavezno proveri uslov{" "}
              <InlineMath>{"|q|<1"}</InlineMath> pre konacne formule.
            </li>
          </ol>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe na kraju"
        title="Proveri da li mozes samostalno da vodis ceo postupak"
        description="Resi zadatke samostalno, pa tek onda otvori resenja. Cilj je da naucis da sam prepoznas tip problema i izaberes pravu formulu."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vezba 1"
            problem={
              <p>
                Za geometrijski niz sa <InlineMath>{"a_1=5"}</InlineMath> i{" "}
                <InlineMath>{"q=3"}</InlineMath> izracunaj{" "}
                <InlineMath>{"a_4"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>{"a_4=5\\cdot 3^{3}=135"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Vezba 2"
            problem={
              <p>
                U geometrijskom nizu vazi <InlineMath>{"a_3=12"}</InlineMath> i{" "}
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
            title="Vezba 3"
            problem={
              <p>
                Nadji <InlineMath>{"x"}</InlineMath> tako da brojevi{" "}
                <InlineMath>{"x-1"}</InlineMath>,{" "}
                <InlineMath>{"x+2"}</InlineMath>,{" "}
                <InlineMath>{"x+8"}</InlineMath> budu uzastopni clanovi
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
            title="Vezba 4"
            problem={
              <p>
                Izracunaj <InlineMath>{"S_6"}</InlineMath> za{" "}
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
            title="Vezba 5"
            problem={
              <p>
                Povrsina prvog trougla je{" "}
                <InlineMath>{"40 \\, \\text{cm}^2"}</InlineMath>, a svaka
                naredna jednaka je petini prethodne. Odredi zbir svih povrsina.
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
            title="Vezba 6"
            problem={
              <p>
                Da li red{" "}
                <InlineMath>{"7-14+28-56+\\dots"}</InlineMath> ima beskonacnu
                sumu?
              </p>
            }
            solution={
              <p>
                Ovde je <InlineMath>{"a_1=7"}</InlineMath> i{" "}
                <InlineMath>{"q=-2"}</InlineMath>. Posto je{" "}
                <InlineMath>{"|q|=2>1"}</InlineMath>, clanovi ne teze nuli i red{" "}
                <strong>nema beskonacnu sumu</strong>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        id="uvid"
        eyebrow="Zavrsni uvid"
        title="Najvazniji misaoni obrazac: ista multiplikacija upravlja i clanovima i sumama"
        description="Ne uci ovu lekciju kao tri nepovezane formule. Opsti clan, suma prvih n clanova i beskonacna suma nastaju iz iste ideje: svaki novi korak menja prethodni rezultat istim faktorom q. Kada to razumes, formule se ne pamte mehanicki, nego postaju prirodna posledica jedne slike."
      >
        <div />
      </LessonSection>

      {/* ═══════════ ZAVRSNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da poneses iz ove lekcije"
      >
        <div className={s.grid2}>
          <SectionCard title="1. Prepoznavanje">
            <p>
              Geometrijski niz prepoznajes po stalnom kolicniku{" "}
              <InlineMath>{"q"}</InlineMath>, ne po stalnoj razlici.
            </p>
          </SectionCard>
          <SectionCard title="2. Opsti clan">
            <p>
              Za prvi clan <InlineMath>{"a_1"}</InlineMath> i kolicnik{" "}
              <InlineMath>{"q"}</InlineMath> vazi{" "}
              <InlineMath>{"a_n=a_1q^{n-1}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="3. Konacna suma">
            <p>
              Za <InlineMath>{"q\\neq1"}</InlineMath> koristis{" "}
              <InlineMath>{"S_n=\\frac{a_1(1-q^n)}{1-q}"}</InlineMath>, a za{" "}
              <InlineMath>{"q=1"}</InlineMath> vazi{" "}
              <InlineMath>{"S_n=na_1"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="4. Beskonacna suma">
            <p>
              Formula <InlineMath>{"S=\\frac{a_1}{1-q}"}</InlineMath> vazi samo
              ako je <InlineMath>{"|q|<1"}</InlineMath>.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Sledeci korak">
          <p>
            Sledeci logican korak je limes: bas on daje formalno opravdanje zasto
            parcijalne sume geometrijskog reda mogu da imaju konacnu granicu.
          </p>
        </InsightCard>
      </LessonSection>
    </LessonShell>
  );
}
