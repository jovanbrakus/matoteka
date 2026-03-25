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
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#prepoznavanje", label: "Mapa figure" },
  { href: "#paralelogrami", label: "Paralelogrami" },
  { href: "#trapezi", label: "Trapezi" },
  { href: "#mnogouglovi", label: "Mnogouglovi" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson44Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 44"
        title={
          <>
            Četvorouglovi i mnogouglovi{" "}
            <span className={cs.tHeroAccent}>Planimetrija</span>
          </>
        }
        description={'U zadacima iz planimetrije nije dovoljno da vidiš samo \u201Eneki četvorougao\u201C. Potrebno je da odmah prepoznaš porodicu lika, znaš koje osobine dijagonala i uglova su sigurne, a koje važe samo u specijalnim slučajevima. Tada se crtež otvara: jedan trapez postaje zbir pravougaonika i trouglova, jedan romb krije dva prava trougla, a pravilan mnogougao se rastavlja na jednostavne delove.'}
        heroImageSrc="/api/lessons/44/hero"
        heroImageAlt="Apstraktna matematička ilustracija sa četvorouglovima, mnogouglovima i geometrijskim konstrukcijama"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da razlikuješ paralelogram, pravougaonik, romb, kvadrat i tipove trapeza, i kako da njihove osobine pretvoriš u konkretan račun.",
          },
          {
            label: "Najveća zamka",
            description:
              "Najčešća greška je preterano generalisanje: učenik zapamti osobinu jednog specijalnog lika pa je nesvesno koristi za celu porodicu četvorouglova.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Na ispitu se često traži baš ono što nije nacrtano direktno: dijagonala, visina, ugao između dijagonala, broj dijagonala mnogougla ili skrivena simetrija.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "80 do 110 minuta za čitanje, laboratoriju, vođene primere i završnu vežbu.",
          },
          {
            label: "Predznanje",
            description:
              "Uglovi, trouglovi, Pitagorina teorema, osnovna trigonometrija i formula za površinu trougla.",
          },
          {
            label: "Glavna veština",
            description:
              "Brzo prepoznavanje lika i izbor osobine koja otključava račun: dijagonala, visina, simetrija ili triangulacija.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za četvorouglove i pravilne mnogouglove sa promenom parametara u realnom vremenu.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Zato što četvorougao retko ostaje samo četvorougao"
        description="U ozbiljnijim zadacima četvorougao je obično samo fasada. Iza njega stoje trouglovi, visine, dijagonale, jednakosti uglova i simetrije. Ako ne znaš koje osobine su zaista dozvoljene, lako kreneš pogrešnim putem. Ako znaš, zadatak se skraćuje i postaje pregledan."
      >
        <div className={s.grid3}>
          <SectionCard title="Prepoznavanje lika">
            <p>
              Na prijemnom se često ne traži &bdquo;nađi osobinu romba&ldquo;,
              već je tvoj posao da sam zaključiš da je dati četvorougao romb ili
              pravougaonik i zato aktiviraš odgovarajuću osobinu.
            </p>
          </SectionCard>
          <SectionCard title="Dijagonale otvaraju trouglove">
            <p>
              Jedna dijagonala često pretvori složen lik u dva trougla u kojima
              možeš koristiti Pitagoru, sinusnu ili kosinusnu teoremu.
            </p>
          </SectionCard>
          <SectionCard title="Simetrija štedi račun">
            <p>
              Kod jednakokrakog trapeza, kvadrata i pravilnih mnogouglova
              simetrija ti odmah daje jednake uglove, jednake duži ili položaj
              centara.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako se ova oblast zaista pojavljuje na ispitu?">
            <p>
              Vrlo često dobiješ mešovitu figuru: trapez sa ucrtanom
              dijagonalom, paralelogram sa poznatim uglom, romb kome su zadate
              dijagonale, ili mnogougao čiji je zbir unutrašnjih uglova poznat.
              Zadatak tada proverava da li umeš da prepoznaš pravu osobinu pre
              samog računa.
            </p>
            <p style={{ marginTop: 8, color: "var(--lesson-muted)" }}>
              Učenikova greška obično ne nastaje u poslednjoj formuli, nego u
              prvom pogrešnom zaključku tipa &bdquo;dijagonale su jednake&ldquo;
              ili &bdquo;krak trapeza je isto što i visina&ldquo;.
            </p>
          </SectionCard>

          <SectionCard title="Minimalni algoritam za svaki zadatak">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj porodicu lika">
                <p>
                  Pitaj se: da li su poznate paralelne stranice, pravi uglovi,
                  jednake stranice ili osa simetrije?
                </p>
              </WalkStep>
              <WalkStep number={2} title="Označi šta je sigurno">
                <p>
                  Upiši jednake uglove, jednake duži, sredine dijagonala, visine
                  ili polovine dijagonala pre bilo kakvog računa.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Pretvori lik u jednostavnije delove">
                <p>
                  Povuci dijagonalu, spusti visinu ili razloži pravilan
                  mnogougao na trouglove.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Tek tada aktiviraj formulu">
                <p>
                  Formula ima smisla tek kada znaš šta predstavljaju njeni
                  brojevi. Bez toga je lako ubaciti pogrešnu duž.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ MAPA FIGURE ═══════════ */}
      <LessonSection
        id="prepoznavanje"
        eyebrow="Mapa figure"
        title={'Prvo pitanje nije \u201Ekoja formula?\u201C, nego \u201Ekoji je ovo lik?\u201C'}
        description="Dobra priprema za prijemni znači da u nekoliko sekundi umeš da pročitaš crtež. Porodica paralelograma i porodica trapeza imaju svoje stabilne osobine. Ako ih pomešaš, račun više nije pouzdan."
      >
        <div className={s.grid2}>
          <SectionCard title="Kako da čitaš uslov">
            <p>
              Ako piše da su naspramne stranice paralelne, misliš na
              paralelogram. Ako piše da je samo jedan par stranica paralelan,
              misliš na trapez. Ako se doda prav ugao, jednakost stranica ili
              jednakost krakova, prelaziš na specijalni slučaj.
            </p>
          </SectionCard>
          <SectionCard title="Najvažnija hijerarhija">
            <p>
              Kvadrat je istovremeno i pravougaonik i romb, a oba su
              paralelogrami. Zato osobine kvadrata sadrže osobine svih ovih
              likova, ali obrnuto ne važi.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brza tabela osobina">
          <p>
            Ne uči je napamet kao mrtav spisak. Koristi je da razdvojiš koje
            osobine možeš bezbedno da koristiš u računu.
          </p>
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr>
                  {["Lik", "Šta je sigurno", "Dijagonale", "Simetrija"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 10px",
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                          textAlign: "left",
                          color: "var(--lesson-primary-soft)",
                          fontSize: "0.82rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    lik: "Paralelogram",
                    sigurno:
                      "Naspramne stranice paralelne i jednake, naspramni uglovi jednaki.",
                    dijagonale: "Seku se na polovine.",
                    simetrija: "Ima centralnu simetriju.",
                  },
                  {
                    lik: "Pravougaonik",
                    sigurno: (
                      <>
                        Svi uglovi su{" "}
                        <InlineMath>{"90^\\circ"}</InlineMath>.
                      </>
                    ),
                    dijagonale: "Jednake su i seku se na polovine.",
                    simetrija: "Dve ose simetrije.",
                  },
                  {
                    lik: "Romb",
                    sigurno: "Sve stranice jednake.",
                    dijagonale:
                      "Međusobno upravne, seku se na polovine i prepolovljavaju uglove.",
                    simetrija: "Dve ose simetrije, po dijagonalama.",
                  },
                  {
                    lik: "Kvadrat",
                    sigurno: "Sve stranice jednake i svi uglovi pravi.",
                    dijagonale:
                      "Jednake, upravne, seku se na polovine i prepolovljavaju uglove.",
                    simetrija: "Četiri ose simetrije.",
                  },
                  {
                    lik: "Jednakokraki trapez",
                    sigurno:
                      "Krakovi jednaki, uglovi uz istu bazu jednaki.",
                    dijagonale: "Jednake su.",
                    simetrija: "Jedna osa simetrije.",
                  },
                  {
                    lik: "Pravougli trapez",
                    sigurno:
                      "Jedan krak je visina, postoje dva prava ugla.",
                    dijagonale: "Obično nisu jednake.",
                    simetrija: "Nema nužno osu simetrije.",
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "12px 10px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--lesson-muted-strong)",
                        fontWeight: 700,
                      }}
                    >
                      {row.lik}
                    </td>
                    <td
                      style={{
                        padding: "12px 10px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--lesson-muted)",
                      }}
                    >
                      {row.sigurno}
                    </td>
                    <td
                      style={{
                        padding: "12px 10px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--lesson-muted)",
                      }}
                    >
                      {row.dijagonale}
                    </td>
                    <td
                      style={{
                        padding: "12px 10px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--lesson-muted)",
                      }}
                    >
                      {row.simetrija}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li je svaki romb ujedno pravougaonik?"
          answer={
            <p>
              Ne. Romb garantuje jednake stranice, ali ne garantuje prave uglove.
              Pravougaonik garantuje prave uglove, ali ne garantuje jednake
              stranice. Samo kada su oba uslova ispunjena dobijaš kvadrat.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PARALELOGRAMI ═══════════ */}
      <LessonSection
        id="paralelogrami"
        eyebrow="Glavni nastavni deo"
        title="Porodica paralelograma: jedna baza, tri specijalna slučaja"
        description="Paralelogram je osnova cele ove porodice. Njegove osobine važe i za pravougaonik, romb i kvadrat. Ali svaki specijalni slučaj dodaje novu, jaču informaciju. Upravo te dodatne informacije najčešće donose rešenje."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Paralelogram"
            formula={"P = a h_a = ab\\sin\\alpha"}
            note={
              <>
                Naspramne stranice su paralelne i jednake, a dijagonale seku
                jedna drugu na polovine. Mini primer: ako su{" "}
                <InlineMath>{"a=8"}</InlineMath>,{" "}
                <InlineMath>{"b=5"}</InlineMath>,{" "}
                <InlineMath>{"\\alpha=30^\\circ"}</InlineMath>, onda je{" "}
                <InlineMath>{"P=8\\cdot5\\cdot\\sin 30^\\circ=20"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Pravougaonik"
            formula={"d = \\sqrt{a^2 + b^2}"}
            note={
              <>
                Pravougaonik je paralelogram sa pravim uglom. Dijagonale su ne
                samo prepolovljene, nego i jednake. Mini primer: stranice{" "}
                <InlineMath>{"6"}</InlineMath> i{" "}
                <InlineMath>{"8"}</InlineMath> daju dijagonalu{" "}
                <InlineMath>{"10"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Romb"
            formula={"P = \\frac{d_1 d_2}{2}"}
            note={
              <>
                Romb je paralelogram sa jednakim stranicama. Dijagonale su
                međusobno upravne i prepolovljavaju uglove. Mini primer: ako su
                dijagonale <InlineMath>{"10"}</InlineMath> i{" "}
                <InlineMath>{"24"}</InlineMath>, površina je{" "}
                <InlineMath>{"120"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Kvadrat"
            formula={"d = a\\sqrt{2},\\qquad P = a^2"}
            note={
              <>
                Kvadrat je i pravougaonik i romb. Nasleđuje sve njihove osobine:
                jednake stranice, prave uglove, jednake i upravne dijagonale.
                Mini primer: ako je <InlineMath>{"a=7"}</InlineMath>, dijagonala
                je <InlineMath>{"7\\sqrt{2}"}</InlineMath>, a površina{" "}
                <InlineMath>{"49"}</InlineMath>.
              </>
            }
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title={'\u0160ta su \u201Esigurne\u201C osobine dijagonala?'}>
            <p>
              U svakom paralelogramu dijagonale seku jedna drugu na polovine. To
              je osnovna, univerzalna osobina. Međutim, jednakost dijagonala nije
              univerzalna; ona važi za pravougaonik i kvadrat, ali ne mora za
              opšti paralelogram ili romb. Slično, upravnost dijagonala je
              tipična za romb i kvadrat, ali ne i za svaki paralelogram.
            </p>
          </SectionCard>

          <SectionCard title="Kako biraš polaznu osobinu">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Ako znaš ugao i dve stranice">
                <p>
                  Razmišljaj o površini{" "}
                  <InlineMath>{"ab\\sin\\alpha"}</InlineMath> ili formulama za
                  dijagonale paralelograma.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Ako znaš dijagonale romba">
                <p>
                  Odmah koristi da su polovine dijagonala katete pravog trougla.
                  Tako dobijaš stranicu i obim.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Ako vidiš prav ugao">
                <p>
                  Proveri da li si zapravo u pravougaoniku ili kvadratu. Tada
                  Pitagora postaje prvi alat.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako su u paralelogramu dijagonale jednake, šta zaključuješ?"
          answer={
            <p>
              To je vrlo jak signal da je paralelogram pravougaonik. Na
              prijemnom je to često skriven način da se iz opštijeg uslova pređe
              na specijalni slučaj sa dodatnim osobinama.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ TRAPEZI ═══════════ */}
      <LessonSection
        id="trapezi"
        eyebrow="Trapezi"
        title="Kod trapeza je ključ u visini, a ne u kraku"
        description={'Trapez ima samo jedan par paralelnih stranica, pa nije dovoljno da ga tretiraš kao \u201Eskoro paralelogram\u201C. Najvažnije duži su baze, visina i eventualno dijagonale. Posebno su važni jednakokraki i pravougli trapez, jer daju dodatnu strukturu koja skraćuje račun.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Opšti trapez">
            <p>
              Baze su paralelne, kraci uglavnom nisu. Površina je{" "}
              <InlineMath>{"\\frac{a+b}{2}h"}</InlineMath>, pa bez visine nema
              direktnog puta do površine. Korisna pomoćna veličina je srednja
              linija{" "}
              <InlineMath>{"m=\\frac{a+b}{2}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Jednakokraki trapez">
            <p>
              Krakovi su jednaki, uglovi uz istu bazu su jednaki, a dijagonale
              su jednake. Ako spustiš visine na veću bazu, dobijaš dva podudarna
              prava trougla i pravougaonik u sredini.
            </p>
          </SectionCard>
          <SectionCard title="Pravougli trapez">
            <p>
              Jedan krak je normalan na baze, pa je ujedno i visina. To često
              drastično pojednostavljuje račun površine i dijagonala.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Najvažniji trik kod jednakokrakog trapeza">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Spusti visine iz krajeva manje baze"
              >
                <p>
                  Time trapez rastavljaš na pravougaonik i dva podudarna prava
                  trougla.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi vodoravnu katetu">
                <p>
                  Ona nije <InlineMath>{"a-b"}</InlineMath>, nego{" "}
                  <InlineMath>{"\\frac{a-b}{2}"}</InlineMath>. Upravo tu učenici
                  najčešće greše.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Primeni Pitagoru">
                <p>
                  Ako znaš krak i polovinu razlike baza, dobijaš visinu. Posle
                  toga površina ide odmah.
                </p>
              </WalkStep>
            </div>
          </SectionCard>

          <SectionCard title="Šta radi srednja linija trapeza?">
            <p>
              Srednja linija povezuje sredine krakova i ima dužinu{" "}
              <InlineMath>{"m=\\frac{a+b}{2}"}</InlineMath>. Tada se formula za
              površinu može čitati vrlo intuitivno:
            </p>
            <MathBlock>{"P = m \\cdot h"}</MathBlock>
            <p>
              To znači da je površina trapeza ista kao površina pravougaonika
              čija je jedna stranica srednja linija, a druga visina. Ova
              interpretacija pomaže da formulu pamtiš smisleno, a ne mehanički.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto u formulu površine trapeza ne smeš ubaciti krak umesto visine?"
          answer={
            <p>
              Zato što je površina određena rastojanjem između paralelnih baza, a
              to rastojanje meri se normalno na baze. Krak je kosa duž i jednak
              je visini samo u posebnom slučaju pravouglog trapeza kada je krak
              normalan na baze.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ MNOGOUGLOVI ═══════════ */}
      <LessonSection
        id="mnogouglovi"
        eyebrow="Mnogouglovi"
        title="Više stranica, ali ista ideja: rastavi lik na trouglove"
        description="Kada broj stranica raste, najvažnija ideja ostaje ista: mnogougao razlažeš na trouglove. Iz te ideje dobijaju se i zbir unutrašnjih uglova i broj dijagonala, a kod pravilnog mnogougla i veličina centralnog ugla."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Zbir unutrašnjih uglova"
            formula={"S_n = (n-2)\\cdot 180^\\circ"}
            note={
              <>
                Iz jednog temena konveksnog{" "}
                <InlineMath>{"n"}</InlineMath>-ougla možeš povući{" "}
                <InlineMath>{"n-3"}</InlineMath> dijagonale i dobiti{" "}
                <InlineMath>{"n-2"}</InlineMath> trougla.
              </>
            }
          />
          <FormulaCard
            title="Pravilan mnogougao"
            formula={"\\alpha = \\frac{(n-2)\\cdot 180^\\circ}{n}"}
            note="Ako su sve stranice i svi uglovi jednaki, tada svaki unutrašnji ugao dobijaš deljenjem ukupnog zbira sa n."
          />
          <FormulaCard
            title="Broj dijagonala"
            formula={"D = \\frac{n(n-3)}{2}"}
            note={
              <>
                Iz svakog temena možeš povući{" "}
                <InlineMath>{"n-3"}</InlineMath> dijagonale, ali bi tako svaku
                prebrojao dvaput. Zato deliš sa{" "}
                <InlineMath>{"2"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Centralni ugao"
            formula={"\\varphi = \\frac{360^\\circ}{n}"}
            note="U pravilnom mnogouglu centar je jednako udaljen od svih temena, pa se puni ugao oko centra deli na n jednakih delova."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Zašto je triangulacija toliko važna?">
            <p>
              Mnogi učenici formule za mnogouglove doživljavaju kao odvojene
              činjenice. To nije dobro za prijemni. Bolje je da vidiš zajedničku
              ideju: iz jednog temena praviš lepezu trouglova. Tada formula
            </p>
            <MathBlock>{"S_n = (n-2)\\cdot 180^\\circ"}</MathBlock>
            <p>postaje prirodna, a ne nešto što moraš silom da pamtiš.</p>
          </SectionCard>

          <SectionCard title="Kako iz uslova dolaziš do broja stranica">
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Ako je dat zbir unutrašnjih uglova"
              >
                <p>
                  Postavi jednačinu{" "}
                  <InlineMath>
                    {"(n-2)\\cdot 180^\\circ = S_n"}
                  </InlineMath>{" "}
                  i reši po <InlineMath>{"n"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep
                number={2}
                title="Ako je dat jedan unutrašnji ugao pravilnog mnogougla"
              >
                <p>
                  Koristi{" "}
                  <InlineMath>
                    {"\\alpha=\\frac{(n-2)\\cdot 180^\\circ}{n}"}
                  </InlineMath>
                  , pa pronađi <InlineMath>{"n"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Ako je tražen broj dijagonala">
                <p>
                  Kada nađeš <InlineMath>{"n"}</InlineMath>, tek onda pređi na{" "}
                  <InlineMath>{"D=\\frac{n(n-3)}{2}"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: pravilan mnogougao ima unutrašnji ugao 150°. Koliko ima stranica?"
          answer={
            <>
              <p>Rešavaš jednačinu</p>
              <MathBlock>
                {"\\frac{(n-2)\\cdot 180^\\circ}{n} = 150^\\circ"}
              </MathBlock>
              <p>
                Dobijaš{" "}
                <InlineMath>{"180n - 360 = 150n"}</InlineMath>, pa je{" "}
                <InlineMath>{"30n = 360"}</InlineMath>, odnosno{" "}
                <InlineMath>{"n = 12"}</InlineMath>. Dakle, u pitanju je
                pravilan dvanaestougao.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koje treba razumeti, ne samo prepisati"
        description="Svaki primer je izabran da pokaže jednu glavnu ideju: rad sa uglom u paralelogramu, korišćenje dijagonala u rombu, spuštanje visine u trapezu i prevođenje uslova o uglovima mnogougla u broj stranica."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Paralelogram sa poznatim stranicama i uglom
            </h3>
            <p style={{ color: "var(--lesson-muted)", marginBottom: 12 }}>
              Dato je: <InlineMath>{"a=10"}</InlineMath>,{" "}
              <InlineMath>{"b=6"}</InlineMath>,{" "}
              <InlineMath>{"\\alpha=60^\\circ"}</InlineMath>. Naći površinu i
              dužine dijagonala.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Površina">
                <MathBlock>
                  {
                    "P = ab\\sin\\alpha = 10\\cdot 6\\cdot \\sin 60^\\circ = 60\\cdot \\frac{\\sqrt{3}}{2} = 30\\sqrt{3}"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Veća dijagonala">
                <p>
                  Za dijagonale paralelograma važi{" "}
                  <InlineMath>
                    {"d_1^2 = a^2 + b^2 + 2ab\\cos\\alpha"}
                  </InlineMath>
                  .
                </p>
                <MathBlock>
                  {
                    "d_1^2 = 100 + 36 + 120\\cdot \\frac{1}{2} = 196, \\quad d_1 = 14"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Manja dijagonala">
                <MathBlock>
                  {
                    "d_2^2 = a^2 + b^2 - 2ab\\cos\\alpha = 100 + 36 - 60 = 76, \\quad d_2 = 2\\sqrt{19}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Romb zadat preko dijagonala
            </h3>
            <p style={{ color: "var(--lesson-muted)", marginBottom: 12 }}>
              Dato je: <InlineMath>{"d_1=10"}</InlineMath>,{" "}
              <InlineMath>{"d_2=24"}</InlineMath>. Naći stranicu i površinu
              romba.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Iskoristi polovinu dijagonala">
                <p>
                  U rombu se dijagonale seku pod pravim uglom i na polovine.
                  Zato su katete jednog dobijenog pravog trougla{" "}
                  <InlineMath>{"5"}</InlineMath> i{" "}
                  <InlineMath>{"12"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi stranicu">
                <MathBlock>
                  {"a = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Površina">
                <MathBlock>
                  {
                    "P = \\frac{d_1 d_2}{2} = \\frac{10\\cdot 24}{2} = 120"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Jednakokraki trapez i polovina razlike baza
            </h3>
            <p style={{ color: "var(--lesson-muted)", marginBottom: 12 }}>
              Dato je: baze <InlineMath>{"18"}</InlineMath> i{" "}
              <InlineMath>{"8"}</InlineMath>, krak{" "}
              <InlineMath>{"13"}</InlineMath>. Naći visinu i površinu.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Spusti visine">
                <p>
                  Dobijamo pravougaonik i dva podudarna prava trougla.
                  Vodoravna kateta u svakom trouglu je
                </p>
                <MathBlock>{"\\frac{18 - 8}{2} = 5"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Nađi visinu">
                <MathBlock>
                  {
                    "h = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj površinu">
                <MathBlock>
                  {
                    "P = \\frac{18 + 8}{2}\\cdot 12 = 13\\cdot 12 = 156"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Mnogougao iz zbira unutrašnjih uglova
            </h3>
            <p style={{ color: "var(--lesson-muted)", marginBottom: 12 }}>
              Zbir unutrašnjih uglova jednog mnogougla iznosi{" "}
              <InlineMath>{"2340^\\circ"}</InlineMath>. Naći broj stranica i
              broj dijagonala.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Nađi broj stranica">
                <MathBlock>
                  {"(n-2)\\cdot 180^\\circ = 2340^\\circ"}
                </MathBlock>
                <p>
                  Deljenjem sa <InlineMath>{"180"}</InlineMath> dobijamo{" "}
                  <InlineMath>{"n-2=13"}</InlineMath>, pa je{" "}
                  <InlineMath>{"n=15"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi broj dijagonala">
                <MathBlock>
                  {
                    "D = \\frac{n(n-3)}{2} = \\frac{15\\cdot 12}{2} = 90"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Tumačenje">
                <p>
                  Tek kada si sigurno našao <InlineMath>{"n"}</InlineMath>,
                  prelaziš na dijagonale. To je tipičan dvokoračni prijemni
                  zadatak.
                </p>
              </WalkStep>
            </div>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Zakoni / obrasci / ključne formule"
        title="Formula nema vrednost ako ne znaš kad sme da se upotrebi"
        description={'Sledeće formule su centralne za ovu oblast. Uz svaku pamti i njenu \u201Ezonu važenja\u201C, odnosno u kom liku i pod kojim uslovom je dozvoljeno da je koristiš.'}
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Paralelogram"
            formula={"P = ah_a = ab\\sin\\alpha"}
            note="Površina preko baze i visine ili preko dve stranice i ugla između njih."
          />
          <FormulaCard
            title="Dijagonale paralelograma"
            formula={"d_{1,2}^2 = a^2 + b^2 \\pm 2ab\\cos\\alpha"}
            note="Korisno kada su poznate dve stranice i ugao. Znak plus i minus daju dve različite dijagonale."
          />
          <FormulaCard
            title="Pravougaonik"
            formula={"d = \\sqrt{a^2 + b^2}"}
            note="Pitagorina teorema na trouglu određenom stranicama pravougaonika."
          />
          <FormulaCard
            title="Romb"
            formula={"P = \\frac{d_1 d_2}{2}"}
            note="Važi zato što se romb deli na četiri prava trougla jednakih visina i baza po poludijagonalama."
          />
          <FormulaCard
            title="Kvadrat"
            formula={"d = a\\sqrt{2}"}
            note="Najkraća formula za prelaz između stranice i dijagonale kvadrata."
          />
          <FormulaCard
            title="Trapez"
            formula={"P = \\frac{a+b}{2}\\,h = m\\,h"}
            note={
              <>
                Srednja linija{" "}
                <InlineMath>{"m"}</InlineMath> objašnjava formulu i pomaže da je
                ne mešaš sa formulama za druge likove.
              </>
            }
          />
          <FormulaCard
            title="Mnogougao"
            formula={"S_n = (n-2)\\cdot 180^\\circ"}
            note="Broj trouglova u triangulaciji određuje zbir unutrašnjih uglova."
          />
          <FormulaCard
            title="Broj dijagonala"
            formula={"D = \\frac{n(n-3)}{2}"}
            note={
              <>
                Svako teme daje <InlineMath>{"n-3"}</InlineMath> dijagonale, ali
                svaku prebrojavaš dvaput.
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ove greške oduzimaju bodove i kada je račun uredan"
        description="Greške u ovoj oblasti su uglavnom konceptualne. Račun može izgledati lepo, a da je pogrešan zato što je aktivirana osobina koja u datom liku uopšte ne mora da važi."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Dijagonale paralelograma su jednake?
            </h3>
            <p>
              Pretpostaviti da su dijagonale svakog paralelograma jednake. To
              važi za pravougaonik i kvadrat, ne za opšti paralelogram.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Polovina razlike baza, ne cela razlika
            </h3>
            <p>
              U jednakokrakom trapezu uzeti vodoravnu katetu kao{" "}
              <InlineMath>{"a-b"}</InlineMath> umesto{" "}
              <InlineMath>{"\\frac{a-b}{2}"}</InlineMath>. Time se visina
              dobija pogrešno već u prvom koraku.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Krak nije visina</h3>
            <p>
              U formuli za površinu trapeza ubaciti krak umesto visine. Krak je
              kosa stranica i nije isto što i rastojanje između baza.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zbir uglova ili jedan ugao?
            </h3>
            <p>
              Pomešati zbir svih unutrašnjih uglova pravilnog mnogougla sa jednim
              unutrašnjim uglom. Jedno je{" "}
              <InlineMath>{"S_n"}</InlineMath>, drugo je{" "}
              <InlineMath>{"\\alpha"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Kvadrat je i romb i pravougaonik</h3>
            <p>
              Zaboraviti da je kvadrat istovremeno i romb i pravougaonik, pa ne
              iskoristiti najjaču dostupnu osobinu.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Formula bez slike</h3>
            <p>
              Memorisati formulu bez slike. Kada ne znaš odakle formula dolazi,
              mnogo je lakše ubaciti pogrešne veličine.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Šta moraš da proveriš pod pritiskom vremena"
        description="Na prijemnom nije dovoljno znati osobine. Potrebna je i rutina: redosled pitanja koje sebi postavljaš čim vidiš geometrijsku sliku. Ova rutina direktno štedi vreme i smanjuje broj konceptualnih grešaka."
      >
        <div className={s.grid2}>
          <SectionCard title="1. Skriveni trougao">
            <p>
              Pitaj se da li neka dijagonala ili visina deli figuru na trouglove
              koje već znaš da rešavaš.
            </p>
          </SectionCard>
          <SectionCard title="2. Najjača osobina">
            <p>
              Ako je lik specijalan, koristi najjaču osobinu tog specijalnog
              slučaja. Ne rešavaj kvadrat kao opšti paralelogram ako ne moraš.
            </p>
          </SectionCard>
          <SectionCard title="3. Simetrija">
            <p>
              Proveri da li osa simetrije odmah daje jednake uglove, jednake
              duži ili položaj sredine.
            </p>
          </SectionCard>
          <SectionCard title="4. Kontrola rezultata">
            <p>
              Na kraju proveri da li je dobijena duž realna za dati lik: da li
              je dijagonala kvadrata veća od stranice, da li je visina manja od
              kraka, da li broj dijagonala ispada ceo broj.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <InsightCard title="Petosekundni checklist pred račun">
            <ul style={{ marginTop: 10, paddingLeft: 18 }}>
              <li>Koji je tačno lik ili porodica lika?</li>
              <li>Koje osobine dijagonala su sigurne baš ovde?</li>
              <li>Da li mi treba visina, a ne krak?</li>
              <li>Mogu li figuru da razložim na trouglove?</li>
              <li>
                Da li je data veličina zbir uglova, jedan ugao ili broj
                dijagonala?
              </li>
            </ul>
          </InsightCard>

          <SectionCard title="Kako izgleda dobar prijemni pristup">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Brzo nacrtaj pomoćne duži">
                <p>
                  Dijagonala ili visina vrlo često &bdquo;skida masku&ldquo; sa
                  zadatka.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Piši samo sigurne jednakosti">
                <p>
                  Nemoj dodavati osobine &bdquo;po osećaju&ldquo;. Svaka
                  napisana jednakost mora da ima geometrijsko opravdanje.
                </p>
              </WalkStep>
              <WalkStep
                number={3}
                title="Računaj u najjednostavnijem delu figure"
              >
                <p>
                  Ako jedan mali pravougli trougao rešava ceo zadatak, kreni od
                  njega, ne od cele slike.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Kratki zadaci za proveru razumevanja"
        description="Pokušaj prvo samostalno, bez gledanja rešenja. Ako zapneš, nemoj samo otvoriti odgovor, nego probaj da otkriješ koji je prvi geometrijski uvid koji ti je falio."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                Paralelogram ima stranice <InlineMath>{"7"}</InlineMath> i{" "}
                <InlineMath>{"4"}</InlineMath>, a ugao između njih je{" "}
                <InlineMath>{"30^\\circ"}</InlineMath>. Nađi površinu.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "P = ab\\sin\\alpha = 7\\cdot 4\\cdot \\sin 30^\\circ = 28\\cdot \\frac{1}{2} = 14"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                Pravougaonik ima stranice <InlineMath>{"9"}</InlineMath> i{" "}
                <InlineMath>{"12"}</InlineMath>. Nađi dužinu dijagonale.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "d = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                U rombu su dijagonale <InlineMath>{"16"}</InlineMath> i{" "}
                <InlineMath>{"30"}</InlineMath>. Nađi stranicu romba.
              </p>
            }
            solution={
              <>
                <p>
                  Polovine dijagonala su <InlineMath>{"8"}</InlineMath> i{" "}
                  <InlineMath>{"15"}</InlineMath>. Stranica je hipotenuza:
                </p>
                <MathBlock>
                  {
                    "a = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17"
                  }
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Jednakokraki trapez ima baze <InlineMath>{"20"}</InlineMath> i{" "}
                <InlineMath>{"8"}</InlineMath>, a visinu{" "}
                <InlineMath>{"9"}</InlineMath>. Nađi površinu.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {
                    "P = \\frac{20 + 8}{2}\\cdot 9 = 14\\cdot 9 = 126"
                  }
                </MathBlock>
                <p>
                  Ovde visina već postoji, pa nema potrebe da prvo računaš
                  krakove.
                </p>
              </>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Zbir unutrašnjih uglova jednog mnogougla je{" "}
                <InlineMath>{"1620^\\circ"}</InlineMath>. Koliko ima stranica?
              </p>
            }
            solution={
              <MathBlock>
                {
                  "(n-2)\\cdot 180^\\circ = 1620^\\circ \\Rightarrow n-2 = 9 \\Rightarrow n = 11"
                }
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Pravilan mnogougao ima unutrašnji ugao{" "}
                <InlineMath>{"150^\\circ"}</InlineMath>. Koliko ima dijagonala?
              </p>
            }
            solution={
              <>
                <p>Prvo nađemo broj stranica:</p>
                <MathBlock>
                  {
                    "\\frac{(n-2)\\cdot 180^\\circ}{n} = 150^\\circ \\Rightarrow n = 12"
                  }
                </MathBlock>
                <p>Zatim:</p>
                <MathBlock>
                  {
                    "D = \\frac{12(12-3)}{2} = \\frac{12\\cdot 9}{2} = 54"
                  }
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Najvažnija misaona poruka ove lekcije"
        description="Kad vidiš četvorougao ili mnogougao, nemoj odmah tražiti formulu. Prvo traži strukturu: koje stranice su paralelne, gde je simetrija, šta rade dijagonale i na koje trouglove možeš da razložiš figuru."
      >
        <InsightCard title="Ključni princip">
          <MathBlock>
            {
              "\\text{prepoznavanje lika} \\Longrightarrow \\text{prava osobina} \\Longrightarrow \\text{jednostavniji delovi} \\Longrightarrow \\text{račun}"
            }
          </MathBlock>
          <p>
            Kada to vidiš, formula postaje samo završni alat, a ne nagađanje.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta obavezno nosiš sa sobom dalje"
        description="Ako posle ove lekcije znaš sledećih nekoliko ideja bez gledanja u beleške, imaš dobar temelj za prijemne zadatke iz planimetrije."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Porodice figura</h3>
            <p>
              Paralelogram je baza, a pravougaonik, romb i kvadrat su njegovi
              specijalni slučajevi. Trapez je posebna porodica sa jednim parom
              paralelnih stranica.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Dijagonale</h3>
            <p>
              U paralelogramu se dijagonale prepolovljavaju, u pravougaoniku su
              jednake, u rombu upravne, a u jednakokrakom trapezu jednake.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Trapez</h3>
            <p>
              Za površinu trapeza treba ti visina, a kod jednakokrakog trapeza
              posebno pazi na{" "}
              <InlineMath>{"\\frac{a-b}{2}"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Mnogouglovi</h3>
            <p>
              Zbir unutrašnjih uglova i broj dijagonala nisu izolovane činjenice,
              nego posledice rastavljanja na trouglove.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Prijemni pristup</h3>
            <p>
              Najviše vremena se gubi kada se formula bira pre geometrijskog
              uvida. Obrni redosled i zadatak postaje kraći.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći korak</h3>
            <p>
              Logičan nastavak je lekcija o krugu i njegovim delovima, gde ćeš
              mnoge od ovih ideja spajati sa tetivama, tangentama i kružnim
              isečcima.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 44 zatvara blok o četvorouglovima i mnogouglovima u
          planimetriji: od prepoznavanja porodice lika, preko dijagonala i
          simetrija, do formularnog aparata i prijemnog pristupa.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
