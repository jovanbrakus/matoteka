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
import HyperbolaLab from "./HyperbolaLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#hiperbola", label: "Osnovna slika" },
  { href: "#asimptote", label: "Asimptote" },
  { href: "#dodir", label: "Uslov dodira" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson53Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 53"
        title={
          <>
            Hiperbola{" "}
            <span className={cs.tHeroAccent}>i uslov dodira</span>
          </>
        }
        description="Hiperbola je lekcija u kojoj učenik konačno mora da poveže formulu, sliku i prijemni refleks. Nije dovoljno znati samo kanonsku jednačinu: moraš da vidiš kako grane prate asimptote, kako se iz parametara čitaju žiže i kada prava zaista može da bude tangenta."
        heroImageSrc="/api/lessons/53/hero"
        heroImageAlt="Ilustracija za lekciju o hiperboli i uslovu dodira"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kanonske oblike hiperbole, žiže, ekscentricitet, asimptote i dve glavne formule za tangente.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mešanje formule c\u00B2 = a\u00B2 + b\u00B2 sa elipsom i ignorisanje toga da nagib tangente mora da poštuje asimptote.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Tangente paralelne datoj pravoj, tangenta u poznatoj tački i tangente kroz spoljašnju tačku.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "55 do 75 minuta",
          },
          {
            label: "Predznanje",
            description:
              "Prava, diskriminanta, elipsa i kanonski oblici konusnih preseka",
          },
          {
            label: "Glavna veština",
            description:
              "Čitanje slike iz formule — orijentacija, asimptote i tip zadatka",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija sa promenljivim a, b, k i l",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Hiperbola proverava da li stvarno razumeš analitičku geometriju"
        description="Kod kružnice i elipse učenik još može da se osloni na relativno stabilnu intuiciju zatvorene krive. Kod hiperbole to više nije dovoljno. Grane se otvaraju, žiže su dalje od temena, pojavljuju se asimptote, a sama činjenica da prava ima ili nema presek zavisi veoma osetljivo od nagiba."
      >
        <div className={s.grid2}>
          <SectionCard title="Zašto je bitna za dalji tok gradiva">
            <p>
              Hiperbola te tera da čitaš jednačinu kao geometrijski objekat, a ne
              samo kao simbolički zapis. To je ista vrsta razmišljanja koja se
              kasnije traži kod funkcija, derivacija i optimizacionih zadataka.
            </p>
            <ul>
              <li>
                Učiš da kanonski oblik odmah pretvoriš u sliku u koordinatnom
                sistemu.
              </li>
              <li>Vežbaš precizan rad sa parametrima i diskriminantom.</li>
              <li>
                Razvijaš osećaj za granične slučajeve: sečica, tangenta,
                spoljašnja prava, asimptota.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Zašto je važna na prijemnom">
            <p>
              Prijemni zadaci retko pitaju hiperbolu samo deklarativno. Obično te
              stave u situaciju da iz formula brzo izvučeš zaključak.
            </p>
            <ul>
              <li>Da li data prava može biti tangenta?</li>
              <li>Nađi tangente paralelne zadatoj pravoj.</li>
              <li>Kroz spoljašnju tačku povuci tangente na hiperbolu.</li>
              <li>
                Prepoznaj asimptote i iskoristi ih kao orijentir u skici i
                proveri računa.
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Savet za brži napredak">
          <p>
            Nemoj pamtiti hiperbolu kao izolovanu formulu. Posmatraj je kao
            porodicu zadataka u kojima su <strong>nagib prave</strong>,{" "}
            <strong>asimptote</strong> i <strong>diskriminanta</strong> stalno
            povezani.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ OSNOVNA SLIKA ═══════════ */}
      <LessonSection
        id="hiperbola"
        eyebrow="Osnovna slika"
        title="Kako da čitaš hiperbolu iz kanonske jednačine"
        description="Prvi zadatak učenika nije da napamet izgovori formulu, već da iz nje pročita orijentaciju grana, položaj temena i odnos parametara a, b i c. Tek posle toga uslov dodira ima smisla."
      >
        <div className={s.grid2}>
          <SectionCard title="Horizontalna hiperbola">
            <p>
              Kada je pozitivni član uz{" "}
              <InlineMath>{"x^2"}</InlineMath>, najčešći kanonski oblik je:
            </p>
            <MathBlock>
              {"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1, \\qquad a>0,\\; b>0"}
            </MathBlock>
            <p>
              Grane se otvaraju ulevo i udesno. Temena su u tačkama{" "}
              <InlineMath>{"(\\pm a,0)"}</InlineMath>, a žiže u{" "}
              <InlineMath>{"(\\pm c,0)"}</InlineMath>, gde važi:
            </p>
            <MathBlock>{"c^2=a^2+b^2"}</MathBlock>
            <p>
              Pošto je <InlineMath>{"c>a"}</InlineMath>, žiže su uvek dalje od
              centra nego temena. To je dobar mentalni signal da ne mešaš
              hiperbolu sa elipsom.
            </p>
          </SectionCard>

          <SectionCard title="Vertikalna hiperbola">
            <p>
              Kada je pozitivni član uz{" "}
              <InlineMath>{"y^2"}</InlineMath>, dobijaš drugi standardni oblik:
            </p>
            <MathBlock>
              {"\\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1"}
            </MathBlock>
            <p>
              Tada se grane otvaraju nagore i nadole. Temena su{" "}
              <InlineMath>{"(0,\\pm a)"}</InlineMath>, a žiže{" "}
              <InlineMath>{"(0,\\pm c)"}</InlineMath>, pri čemu opet važi{" "}
              <InlineMath>{"c^2=a^2+b^2"}</InlineMath>. Ekscentricitet je{" "}
              <InlineMath>{"e=\\frac{c}{a}>1"}</InlineMath>, kao i u
              horizontalnom slučaju.
            </p>
            <p style={{ marginTop: 10, fontStyle: "italic", color: "var(--lesson-muted)" }}>
              U oba oblika formula za <InlineMath>{"c"}</InlineMath> je ista. Menja
              se samo osa duž koje leže temena i žiže.
            </p>
          </SectionCard>
        </div>

        {/* Comparison table */}
        <div
          style={{
            marginTop: 16,
            padding: 20,
            borderRadius: "var(--lesson-radius-lg)",
            border: "1px solid var(--lesson-border)",
            background: "rgba(255,255,255,0.025)",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 540 }}>
            <thead>
              <tr>
                {["Oblik", "Temena", "Žiže", "Ekscentricitet"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 10px",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--lesson-primary-soft)",
                      fontSize: "0.84rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"(\\pm a,0)"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"(\\pm c,0)"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"e=\\frac{c}{a}>1"}</InlineMath>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"\\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"(0,\\pm a)"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"(0,\\pm c)"}</InlineMath>
                </td>
                <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <InlineMath>{"e=\\frac{c}{a}>1"}</InlineMath>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Dva odvojena kraka">
            <p>
              Za razliku od elipse, hiperbola nema zatvorenu konturu. Zato pitanja
              o preseku sa pravom često zavise od nagiba mnogo više nego što učenik
              očekuje.
            </p>
          </SectionCard>
          <SectionCard title="c je veći od glavnog poluprečnika">
            <p>
              Ako ti u računu ispadne da je{" "}
              <InlineMath>{"c"}</InlineMath> manje od parametra koji vodi do temena,
              gotovo sigurno si greškom upotrebio elipsinu formulu{" "}
              <InlineMath>{"c^2=a^2-b^2"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Šta prvo gledaš na ispitu">
            <p>
              Koji kvadrat nosi plus, gde su temena i kakav je položaj asimptota. To
              ti već u startu govori koje nagibe može da ima tangenta.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto za hiperbolu važi e > 1?"
          answer={
            <p>
              Pošto je <InlineMath>{"c^2=a^2+b^2"}</InlineMath>, žiža je dalje
              od centra nego teme. Zato je ekscentricitet, koji se računa kao odnos{" "}
              <InlineMath>{"c"}</InlineMath> i poluose na kojoj leže temena, uvek
              veći od <InlineMath>{"1"}</InlineMath>. To hiperbolu jasno odvaja od
              elipse.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ASIMPTOTE ═══════════ */}
      <LessonSection
        id="asimptote"
        eyebrow="Asimptote"
        title="Asimptote su kompas koji vodi grane hiperbole"
        description="Učenici često vide asimptote samo kao dodatnu formulu za crtanje. To je preusko razumevanje. Asimptote daju pravac u kome grane odlaze i odmah ti govore kakav nagib mora da ima moguća tangenta."
      >
        <div className={s.grid2}>
          <SectionCard title="Formula za asimptote">
            <p>Asimptote zavise od orijentacije hiperbole:</p>
            <MathBlock>
              {"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1 \\;\\Rightarrow\\; y=\\pm \\frac{b}{a}x"}
            </MathBlock>
            <MathBlock>
              {"\\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1 \\;\\Rightarrow\\; y=\\pm \\frac{a}{b}x"}
            </MathBlock>
            <p>
              Horizontalna hiperbola ide ulevo i udesno, a vertikalna nagore i
              nadole. Zato i odnos brojeva u nagibu asimptote mora da prati osovinu
              duž koje se grane otvaraju.
            </p>
          </SectionCard>

          <SectionCard title="Geometrijsko značenje">
            <p>
              Kada je tačka na hiperboli veoma daleko od centra, grana joj prilazi
              sve bliže, ali je nikada ne seče. Zato asimptote nisu tangente u
              beskonačno dalekoj tački, već granični pravci kretanja.
            </p>
            <ul>
              <li>Koriste se kao okvir za skicu.</li>
              <li>
                Pomažu u proveri da li je dobijena prava realno moguća tangenta.
              </li>
              <li>Na prijemnom štede vreme jer odmah filtriraju nemoguće nagibe.</li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Horizontalna hiperbola: tangenta mora da bude strmija">
            <p>
              Ako je prava oblika{" "}
              <InlineMath>{"y=kx+l"}</InlineMath> i hiperbola je{" "}
              <InlineMath>{"x^2/a^2-y^2/b^2=1"}</InlineMath>, tangentni nagib mora
              zadovoljiti{" "}
              <InlineMath>{"|k|\\ge \\frac{b}{a}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Vertikalna hiperbola: tangenta mora da bude blaža">
            <p>
              Za hiperbolu{" "}
              <InlineMath>{"y^2/a^2-x^2/b^2=1"}</InlineMath> uslov ide u suprotnom
              smeru:{" "}
              <InlineMath>{"|k|\\le \\frac{a}{b}"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Poredi nagib sa asimptotom pre računa">
            <p>
              Ako je nagib dat u zadatku, često možeš unapred da znaš da li tangenta
              postoji, još pre nego što pišeš diskriminantu.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Asimptote nisu ukras">
          <p>
            One su najbrža vizuelna provera da li je tvoj rezultat smislen. Ako
            navodna tangenta horizontalne hiperbole ima nagib manji od nagiba
            asimptote, rezultat je pogrešan.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: da li grana hiperbole može da preseče svoju asimptotu?"
          answer={
            <p>
              Ne. Asimptota je pravac kome se grana približava kada koordinata ide ka
              beskonačnosti, ali joj nikada ne pripada. Ako bi se sekle, izgubila bi
              se upravo ideja asimptotskog približavanja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ USLOV DODIRA ═══════════ */}
      <LessonSection
        id="dodir"
        eyebrow="Uslov dodira"
        title="Prava dodiruje hiperbolu kada sistem pređe u dvostruko rešenje"
        description="Kao i kod elipse, prava je tangenta kada sistem jednačina ima jedno realno dvostruko rešenje. Razlika je u tome što ovde asimptote dodatno diktiraju koji nagibi uopšte imaju šansu da daju dodir."
      >
        <div className={s.grid2}>
          <SectionCard title="Horizontalna hiperbola i prava y = kx + l">
            <p>Za hiperbolu</p>
            <MathBlock>
              {"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1"}
            </MathBlock>
            <p>
              i pravu <InlineMath>{"y=kx+l"}</InlineMath>, posle zamene dobijaš
              kvadratnu jednačinu po <InlineMath>{"x"}</InlineMath>:
            </p>
            <MathBlock>
              {"(b^2-a^2k^2)x^2-2a^2kl\\,x-a^2(l^2+b^2)=0"}
            </MathBlock>
            <p>
              Tangenta znači <InlineMath>{"\\Delta=0"}</InlineMath>, pa posle
              sređivanja dobijaš:
            </p>
            <MathBlock>{"l^2=a^2k^2-b^2"}</MathBlock>
            <p>
              Odmah vidiš važnu posledicu: desna strana mora biti nenegativna. Zato
              je potrebno{" "}
              <InlineMath>{"|k|\\ge \\frac{b}{a}"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Vertikalna hiperbola i varijanta uslova">
            <p>Za hiperbolu</p>
            <MathBlock>
              {"\\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1"}
            </MathBlock>
            <p>isti postupak vodi do uslova:</p>
            <MathBlock>{"l^2=a^2-b^2k^2"}</MathBlock>
            <p>
              Ovde je slika obrnuta: da bi tangenta postojala, mora važiti{" "}
              <InlineMath>{"|k|\\le \\frac{a}{b}"}</InlineMath>. Dakle, grane i
              asimptote ne određuju samo estetiku crteža, nego i samu algebru.
            </p>
            <p style={{ marginTop: 10, fontStyle: "italic", color: "var(--lesson-muted)" }}>
              Uslov dodira je brz, ali nije magičan. Prvo moraš da prepoznaš koji je
              kanonski oblik i oko koje ose se hiperbola otvara.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Tangenta u poznatoj tački">
            <p>
              Ako je <InlineMath>{"P(x_0,y_0)"}</InlineMath> tačka hiperbole{" "}
              <InlineMath>{"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1"}</InlineMath>,
              tangentna jednačina glasi:
            </p>
            <MathBlock>
              {"\\frac{xx_0}{a^2}-\\frac{yy_0}{b^2}=1"}
            </MathBlock>
            <p>
              To je najbrži put kada je tačka dodira već poznata. Obavezno pre
              toga proveri da <InlineMath>{"P"}</InlineMath> zaista leži na
              hiperboli.
            </p>
            <ul>
              <li>
                Za <InlineMath>{"P(a,0)"}</InlineMath> dobijaš vertikalnu tangentu{" "}
                <InlineMath>{"x=a"}</InlineMath>.
              </li>
              <li>
                Za <InlineMath>{"P(-a,0)"}</InlineMath> dobijaš{" "}
                <InlineMath>{"x=-a"}</InlineMath>.
              </li>
              <li>
                Za vertikalnu hiperbolu analogna formula glasi{" "}
                <InlineMath>
                  {"\\frac{yy_0}{a^2}-\\frac{xx_0}{b^2}=1"}
                </InlineMath>
                .
              </li>
              <li>
                Formula <InlineMath>{"y=kx+l"}</InlineMath> ne pokriva vertikalne
                tangente, pa je ova forma zaštita od greške.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Kako rešavaš zadatke kroz spoljašnju tačku">
            <p>
              Ako prava mora da prođe kroz tačku{" "}
              <InlineMath>{"A(x_1,y_1)"}</InlineMath>, napišeš je kao:
            </p>
            <MathBlock>{"y=kx+(y_1-kx_1)"}</MathBlock>
            <p>
              Tada je <InlineMath>{"l=y_1-kx_1"}</InlineMath>, pa taj izraz ubacuješ
              u uslov dodira. Dobijaš jednačinu po <InlineMath>{"k"}</InlineMath>.
              Svako realno rešenje predstavlja jednu tangentu.
            </p>
            <p style={{ marginTop: 10, fontStyle: "italic", color: "var(--lesson-muted)" }}>
              Broj tangenti zavisi od položaja tačke: spoljašnja tačka može dati dve,
              tačka na hiperboli jednu, a neke tačke ne daju nijednu realnu tangentu.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: zašto horizontalna hiperbola ne može imati tangentu sa nagibom manjim od nagiba asimptote?"
          answer={
            <p>
              Jer bi tada u uslovu{" "}
              <InlineMath>{"l^2=a^2k^2-b^2"}</InlineMath> desna strana bila
              negativna. Pošto <InlineMath>{"l^2"}</InlineMath> ne može biti
              negativan broj, takva tangenta ne postoji.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title="Canvas laboratorija: promeni parametre i gledaj kako asimptote kontrolišu dodir"
        description="U ovoj laboratoriji možeš da prebacuješ orijentaciju hiperbole, menjaš parametre a, b, nagib k i odsečak l. Posebno prati odnos između prave i asimptota: on gotovo uvek unapred najavi da li je prava sečica, tangenta ili spoljašnja."
      >
        <HyperbolaLab />

        <InsightCard title="Kako da koristiš ovu laboratoriju">
          <p>
            Prvo uključi preset &ldquo;Tangenta&rdquo;, pa zatim menjaj nagib i
            gledaj kako se položaj dodira raspada čim napustiš dozvoljen opseg.
            Pokušaj da sam pogodiš šta će se desiti pre nego što pomeriš klizač.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Rešenja koja treba čitati sporo i sa razlogom za svaki korak"
        description="Nemoj ove primere čitati kao gotov recept. Posmatraj kojim redom se donose odluke: prvo prepoznavanje tipa hiperbole, zatim izbor formule, pa tek onda račun."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: čitanje parametara iz jednačine
            </h3>
            <p>
              Za hiperbolu{" "}
              <InlineMath>
                {"\\frac{x^2}{9}-\\frac{y^2}{16}=1"}
              </InlineMath>{" "}
              odredi temena, žiže, ekscentricitet i asimptote.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj oblik.">
                <p>
                  Plus je uz <InlineMath>{"x^2"}</InlineMath>, pa je hiperbola
                  horizontalna.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Pročitaj parametre.">
                <MathBlock>
                  {"a^2=9\\Rightarrow a=3,\\qquad b^2=16\\Rightarrow b=4"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Nađi žiže.">
                <MathBlock>{"c^2=a^2+b^2=25,\\quad c=5"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Napiši geometrijske podatke.">
                <p>
                  Temena su <InlineMath>{"(\\pm3,0)"}</InlineMath>, žiže{" "}
                  <InlineMath>{"(\\pm5,0)"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Ekscentricitet i asimptote.">
                <MathBlock>
                  {"e=\\frac{5}{3},\\qquad y=\\pm\\frac{4}{3}x"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {"V_1(-3,0),\\;V_2(3,0),\\qquad F_1(-5,0),\\;F_2(5,0),\\qquad y=\\pm\\frac{4}{3}x"}
            </MathBlock>
            <p>
              Ovo izgleda lako, ali baš tu nastaje mnogo grešaka. Ako ovde pogrešiš{" "}
              <InlineMath>{"c"}</InlineMath>, svaki naredni zaključak pada.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: tangente paralelne zadatoj pravoj
            </h3>
            <p>
              Nađi tangente hiperbole{" "}
              <InlineMath>
                {"\\frac{x^2}{16}-\\frac{y^2}{9}=1"}
              </InlineMath>{" "}
              koje su paralelne pravoj <InlineMath>{"y=2x"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zadrži nagib.">
                <p>
                  Paralelne prave imaju isti nagib, pa tražimo tangente oblika{" "}
                  <InlineMath>{"y=2x+l"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni uslov dodira.">
                <p>
                  Za horizontalnu hiperbolu važi{" "}
                  <InlineMath>{"l^2=a^2k^2-b^2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Uvrsti podatke.">
                <MathBlock>{"l^2=16\\cdot 4-9=55"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Zaključi.">
                <p>
                  <InlineMath>{"l=\\pm\\sqrt{55}"}</InlineMath>, pa postoje dve
                  tangente.
                </p>
              </WalkStep>
            </div>
            <MathBlock>
              {"y=2x+\\sqrt{55} \\qquad \\text{i} \\qquad y=2x-\\sqrt{55}"}
            </MathBlock>
            <p>
              Geometrijski je sasvim prirodno da postoje dve paralelne tangente:
              jedna dodiruje gornju, a druga donju granu u simetričnim položajima.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: tangenta u poznatoj tački
            </h3>
            <p>
              Nađi tangentu hiperbole{" "}
              <InlineMath>
                {"\\frac{x^2}{9}-\\frac{y^2}{16}=1"}
              </InlineMath>{" "}
              u tački{" "}
              <InlineMath>{"P\\left(5,\\frac{16}{3}\\right)"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvo proveri tačku.">
                <MathBlock>
                  {"\\frac{25}{9}-\\frac{(16/3)^2}{16}=\\frac{25}{9}-\\frac{16}{9}=1"}
                </MathBlock>
                <p>Dakle, tačka zaista leži na hiperboli.</p>
              </WalkStep>
              <WalkStep number={2} title="Primeni tangentu u tački.">
                <MathBlock>
                  {"\\frac{xx_0}{a^2}-\\frac{yy_0}{b^2}=1"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Uvrsti vrednosti.">
                <MathBlock>{"\\frac{5x}{9}-\\frac{y}{3}=1"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Sredi jednačinu.">
                <MathBlock>{"5x-3y=9"}</MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovaj primer je važan jer pokazuje koliko vremena štedi prava formula.
              Da si ovde išao preko opšte prave i diskriminante, račun bi bio duži
              bez potrebe.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: tangente kroz spoljašnju tačku
            </h3>
            <p>
              Kroz tačku <InlineMath>{"A(0,5)"}</InlineMath> povuci tangente na
              hiperbolu{" "}
              <InlineMath>{"\\frac{x^2}{4}-y^2=1"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Napiši opštu pravu kroz tačku.">
                <p>
                  Svaka takva prava ima oblik{" "}
                  <InlineMath>{"y=kx+5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Prepoznaj parametre hiperbole.">
                <MathBlock>{"a^2=4,\\qquad b^2=1"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Primeni uslov dodira.">
                <MathBlock>{"l^2=a^2k^2-b^2"}</MathBlock>
                <p>
                  Pošto je <InlineMath>{"l=5"}</InlineMath>, dobijaš:
                </p>
                <MathBlock>{"25=4k^2-1"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Reši po k.">
                <MathBlock>
                  {"4k^2=26 \\Rightarrow k^2=\\frac{13}{2} \\Rightarrow k=\\pm\\frac{\\sqrt{26}}{2}"}
                </MathBlock>
              </WalkStep>
              <WalkStep number={5} title="Zapiši tangente.">
                <MathBlock>
                  {"y=\\frac{\\sqrt{26}}{2}x+5 \\qquad \\text{i} \\qquad y=-\\frac{\\sqrt{26}}{2}x+5"}
                </MathBlock>
              </WalkStep>
            </div>
            <p>
              Ovde je bitno da tačku ne pokušavaš da ubacuješ u hiperbolu. Ona je
              samo uslov kroz koji prava mora proći.
            </p>
          </article>
        </div>

        <InsightCard title="Ključna poruka iz primera">
          <p>
            Kada je poznat <strong>nagib</strong>, tražiš{" "}
            <InlineMath>{"l"}</InlineMath>. Kada je poznata{" "}
            <strong>tačka kroz koju prava prolazi</strong>, pišeš{" "}
            <InlineMath>{"l"}</InlineMath> preko{" "}
            <InlineMath>{"k"}</InlineMath>. Kada je poznata{" "}
            <strong>tačka dodira</strong>, koristiš tangentnu jednačinu u tački i
            preskačeš diskriminantu.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title='Formula-vault koji treba da ti bude pregledan, a ne nabuban'
        description="Ove formule nisu za slepo memorisanje. Svaku treba vezati za situaciju u kojoj se koristi."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kanonski oblici"
            formula={"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1 \\qquad \\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1"}
            note="Prvi je horizontalna, drugi vertikalna hiperbola."
          />
          <FormulaCard
            title="Žiže i ekscentricitet"
            formula={"c^2=a^2+b^2, \\qquad e=\\frac{c}{a}>1"}
            note="Ako dobiješ e < 1, sigurno si pomešao hiperbolu sa elipsom."
          />
          <FormulaCard
            title="Asimptote"
            formula={"\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1 \\Rightarrow y=\\pm\\frac{b}{a}x \\qquad \\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1 \\Rightarrow y=\\pm\\frac{a}{b}x"}
            note="Najbrža vizuelna provera položaja grana i mogućih nagiba tangente."
          />
          <FormulaCard
            title="Uslov dodira: horizontalna"
            formula="l^2=a^2k^2-b^2"
            note={
              <>
                Važi za pravu <InlineMath>{"y=kx+l"}</InlineMath> i hiperbolu{" "}
                <InlineMath>{"x^2/a^2-y^2/b^2=1"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Uslov dodira: vertikalna"
            formula="l^2=a^2-b^2k^2"
            note={
              <>
                Važi za pravu <InlineMath>{"y=kx+l"}</InlineMath> i hiperbolu{" "}
                <InlineMath>{"y^2/a^2-x^2/b^2=1"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Tangenta u tački"
            formula={"\\frac{xx_0}{a^2}-\\frac{yy_0}{b^2}=1 \\qquad \\frac{yy_0}{a^2}-\\frac{xx_0}{b^2}=1"}
            note="Prva formula je za horizontalnu, a druga za vertikalnu hiperbolu kada je poznata tačka dodira."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje prave čak i učenici koji znaju formule"
        description="U ovoj lekciji nije dovoljno znati formulu. Veći deo grešaka nastaje zato što učenik ne proveri da li formula odgovara baš toj orijentaciji i baš tom tipu zadatka."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pomešana formula za <InlineMath>{"c"}</InlineMath>
            </h3>
            <p>
              Za hiperbolu važi <InlineMath>{"c^2=a^2+b^2"}</InlineMath>, a ne{" "}
              <InlineMath>{"a^2-b^2"}</InlineMath>. Ovo je najčešći refleks posle
              elipse.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Zaboravljena orijentacija</h3>
            <p>
              Uslov <InlineMath>{"l^2=a^2k^2-b^2"}</InlineMath> nije univerzalan. On
              važi za horizontalnu hiperbolu. Za vertikalnu važi{" "}
              <InlineMath>{"l^2=a^2-b^2k^2"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Ignorisane asimptote</h3>
            <p>
              Dobijena tangenta deluje &ldquo;algebarski tačno&rdquo;, ali nagib ne
              poštuje položaj asimptota. To je signal da je račun pogrešno
              postavljen.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Bez provere tačke dodira</h3>
            <p>
              Učenik odmah koristi formulu tangente u tački, a da prethodno nije
              proverio da tačka uopšte leži na hiperboli.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Tangente paralelne koordinatnim osama nestanu iz vida
            </h3>
            <p>
              Oblik <InlineMath>{"y=kx+l"}</InlineMath> ne vidi vertikalne tangente{" "}
              <InlineMath>{"x=\\pm a"}</InlineMath> kod horizontalne hiperbole, a
              lako se zaborave i horizontalne tangente{" "}
              <InlineMath>{"y=\\pm a"}</InlineMath> kod vertikalne.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Napamet račun bez skice</h3>
            <p>
              Kratka skica sa asimptotama često odmah pokaže da li rezultat ima
              smisla. Bez toga raste rizik od formalno uredne, ali geometrijski
              pogrešne jednačine.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se hiperbola zaista pojavljuje na prijemnom"
        description="Na prijemnom se hiperbola često uvodi indirektno: kroz tangentu, kroz spoljašnju tačku, kroz informaciju o asimptoti ili kroz poređenje sa elipsom. Zato je važno da imaš kratku proceduru koju možeš da pokreneš pod pritiskom vremena."
      >
        <div className={s.grid2}>
          <SectionCard title="Tipični obrasci zadataka">
            <ul>
              <li>
                Zadati su hiperbola i nagib prave, a traže se tangente paralelne
                toj pravoj.
              </li>
              <li>
                Zadata je spoljašnja tačka, pa treba naći jednu ili dve tangente.
              </li>
              <li>
                Data je tačka na hiperboli i traži se jednačina tangente ili
                normale.
              </li>
              <li>
                Traže se žiže i asimptote kao deo rekonstrukcije nepoznate
                hiperbole.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Checklist koji vredi na ispitu">
            <ol>
              <li>Prepoznaj orijentaciju hiperbole.</li>
              <li>
                Pročitaj <InlineMath>{"a"}</InlineMath>,{" "}
                <InlineMath>{"b"}</InlineMath> i po potrebi izračunaj{" "}
                <InlineMath>{"c"}</InlineMath>.
              </li>
              <li>Nacrtaj makar mentalno ili na margini asimptote.</li>
              <li>
                Odluči da li je zadatak za uslov dodira ili tangentu u tački.
              </li>
              <li>
                Proveri da li je dobijeni nagib kompatibilan sa asimptotama.
              </li>
            </ol>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni princip">
          <p>
            Na prijemnom ne pobeđuje učenik koji zna najviše formula, nego učenik
            koji za 20 sekundi prepozna{" "}
            <strong>
              koja formula ovde uopšte ima pravo da se koristi
            </strong>
            .
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Kratki zadaci za samostalnu proveru"
        description="Pokušaj da ih uradiš bez gledanja u rešenje. Ako zapneš, prvo probaj da napišeš skicu i izdvojiš tip zadatka."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Za hiperbolu{" "}
                <InlineMath>
                  {"\\frac{x^2}{36}-\\frac{y^2}{9}=1"}
                </InlineMath>{" "}
                odredi temena, žiže i asimptote.
              </p>
            }
            solution={
              <p>
                <InlineMath>{"a=6"}</InlineMath>,{" "}
                <InlineMath>{"b=3"}</InlineMath>, pa je{" "}
                <InlineMath>{"c^2=36+9=45"}</InlineMath>, odnosno{" "}
                <InlineMath>{"c=3\\sqrt{5}"}</InlineMath>. Temena su{" "}
                <InlineMath>{"(\\pm6,0)"}</InlineMath>, žiže{" "}
                <InlineMath>{"(\\pm3\\sqrt{5},0)"}</InlineMath>, a asimptote{" "}
                <InlineMath>{"y=\\pm\\frac{1}{2}x"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Proveri da li prava <InlineMath>{"y=x+2"}</InlineMath> može biti
                tangenta hiperbole{" "}
                <InlineMath>
                  {"\\frac{x^2}{9}-\\frac{y^2}{4}=1"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Ovde su <InlineMath>{"k=1"}</InlineMath>,{" "}
                <InlineMath>{"l=2"}</InlineMath>,{" "}
                <InlineMath>{"a^2=9"}</InlineMath>,{" "}
                <InlineMath>{"b^2=4"}</InlineMath>. Za tangentu bi moralo važiti{" "}
                <InlineMath>{"l^2=a^2k^2-b^2"}</InlineMath>, odnosno{" "}
                <InlineMath>{"4=9-4=5"}</InlineMath>, što nije tačno. Dakle, prava
                nije tangenta.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Nađi tangente hiperbole{" "}
                <InlineMath>
                  {"\\frac{x^2}{25}-\\frac{y^2}{16}=1"}
                </InlineMath>{" "}
                paralelne pravoj <InlineMath>{"y=3x"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Tražimo <InlineMath>{"y=3x+l"}</InlineMath>. Uslov dodira daje{" "}
                <InlineMath>{"l^2=25\\cdot9-16=209"}</InlineMath>, pa su tangente{" "}
                <InlineMath>{"y=3x+\\sqrt{209}"}</InlineMath> i{" "}
                <InlineMath>{"y=3x-\\sqrt{209}"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Nađi tangentu hiperbole{" "}
                <InlineMath>
                  {"\\frac{x^2}{9}-\\frac{y^2}{16}=1"}
                </InlineMath>{" "}
                u tački{" "}
                <InlineMath>{"P\\left(5,\\frac{16}{3}\\right)"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Pošto tačka leži na hiperboli, koristiš formulu{" "}
                <InlineMath>
                  {"\\frac{xx_0}{a^2}-\\frac{yy_0}{b^2}=1"}
                </InlineMath>
                . Dobijaš{" "}
                <InlineMath>{"\\frac{5x}{9}-\\frac{y}{3}=1"}</InlineMath>,
                odnosno <InlineMath>{"5x-3y=9"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Za vertikalnu hiperbolu{" "}
                <InlineMath>
                  {"\\frac{y^2}{9}-\\frac{x^2}{4}=1"}
                </InlineMath>
                , proveri da li postoji tangenta oblika{" "}
                <InlineMath>{"y=2x+l"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Za vertikalnu hiperbolu uslov dodira je{" "}
                <InlineMath>{"l^2=a^2-b^2k^2"}</InlineMath>. Ovde je{" "}
                <InlineMath>{"a^2=9"}</InlineMath>,{" "}
                <InlineMath>{"b^2=4"}</InlineMath>,{" "}
                <InlineMath>{"k=2"}</InlineMath>, pa je desna strana{" "}
                <InlineMath>{"9-16=-7"}</InlineMath>, što je nemoguće. Tangenta tog
                nagiba ne postoji.
              </p>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Kroz tačku <InlineMath>{"A(0,4)"}</InlineMath> povuci tangente na
                hiperbolu{" "}
                <InlineMath>
                  {"\\frac{x^2}{9}-\\frac{y^2}{4}=1"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <p>
                Prava kroz tačku je <InlineMath>{"y=kx+4"}</InlineMath>. Uslov
                dodira daje <InlineMath>{"16=9k^2-4"}</InlineMath>, pa je{" "}
                <InlineMath>{"9k^2=20"}</InlineMath>, odnosno{" "}
                <InlineMath>{"k=\\pm\\frac{2\\sqrt{5}}{3}"}</InlineMath>. Tangente
                su <InlineMath>{"y=\\frac{2\\sqrt{5}}{3}x+4"}</InlineMath> i{" "}
                <InlineMath>{"y=-\\frac{2\\sqrt{5}}{3}x+4"}</InlineMath>.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta mora da ostane u glavi posle ove lekcije"
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Prvo čitaš oblik</h3>
            <p>
              <strong>Koji kvadrat nosi plus</strong> odmah određuje orijentaciju
              hiperbole i raspored temena i žiža.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Asimptote nisu dodatak</h3>
            <p>
              <strong>Asimptote</strong> su tvoj najbrži vodič za skicu i proveru da
              li je nagib tangente uopšte moguć:{" "}
              <InlineMath>{"y=\\pm \\frac{b}{a}x"}</InlineMath> ili{" "}
              <InlineMath>{"y=\\pm \\frac{a}{b}x"}</InlineMath>, zavisno od
              orijentacije.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Formula za žiže je drugačija nego kod elipse
            </h3>
            <p>
              Za hiperbolu važi{" "}
              <strong>
                <InlineMath>{"c^2=a^2+b^2"}</InlineMath>
              </strong>
              , pa je ekscentricitet uvek veći od jedan.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Uslov dodira zavisi od orijentacije</h3>
            <p>
              Horizontalna:{" "}
              <strong>
                <InlineMath>{"l^2=a^2k^2-b^2"}</InlineMath>
              </strong>
              . Vertikalna:{" "}
              <strong>
                <InlineMath>{"l^2=a^2-b^2k^2"}</InlineMath>
              </strong>
              .
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. Kad je tačka dodira poznata, ne komplikuj
            </h3>
            <p>
              Tada koristiš{" "}
              <strong>tangentnu jednačinu u tački</strong> i preskačeš duži račun sa
              diskriminantom.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Posle ove lekcije prirodno je da pređeš na parabolu i uporediš kako se
              menja uloga fokusa, direktrise i uslova dodira.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 53 zatvara temu hiperbole: od kanonskog oblika do asimptota,
          uslova dodira i tangenti kroz spoljašnju tačku.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
