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
import SumProductLab from "./SumProductLab";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#intuicija", label: "Intuicija" },
  { href: "#formule", label: "Formule" },
  { href: "#interaktivni", label: "Interaktivni deo" },
  { href: "#primeri", label: "Primeri" },
  { href: "#strategija", label: "Strategija" },
  { href: "#greske", label: "Greške" },
  { href: "#prijemni", label: "Prijemni" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

export default function Lesson37Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 37"
        title={
          <>
            Transformacije zbira{" "}
            <span className={cs.tHeroAccent}>u proizvod i obrnuto</span>
          </>
        }
        description="Kada na prijemnom vidiš dugačak zbir sinusa ili kosinusa, često nije problem u tome što je izraz težak, nego što još nije spakovan u pravi oblik. Ova lekcija te uči upravo tome: kako da zbir pretvoriš u proizvod radi faktorizacije i skraćivanja, i kako da proizvod pročitaš unazad kada ti treba zbir ili razlika uglova."
        heroImageSrc="/api/lessons/37/hero"
        heroImageAlt="Apstraktna matematička tabla sa dva ugla, srednjim uglom i formulama za transformacije zbira i proizvoda"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da dugačke trigonometrijske sume sabiješ u proizvod, a proizvode vratiš u zbir kada je to korisnije za račun.",
          },
          {
            label: "Najveća zamka",
            description:
              "Učenici zapamte raspored slova, ali ne razumeju da se sve vrti oko srednjeg ugla i polurazlike, pa zaborave faktor 2 ili znak minus.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Tipični zadaci traže faktorizaciju jednačine, skraćivanje razlomka ili prepoznavanje da je proizvod zapravo skriven zbir pogodniji za dalji rad.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "80 do 110 minuta ako detaljno prođeš i interaktivni deo i prijemne zadatke.",
          },
          {
            label: "Predznanje",
            description:
              "Adicioni teoremi, trigonometrijska kružnica i osnovne vrednosti za standardne uglove.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznavanje kada izraz treba faktorizovati, a kada ga treba prevesti u zbir ili razliku uglova.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za srednji ugao i polurazliku sa numeričkom proverom obe strane identiteta.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title={'Ova lekcija pretvara „dug izraz" u oblik sa kojim možeš nešto konkretno da uradiš'}
        description="Na prijemnom te retko ruši sama formula. Mnogo češće te ruši trenutak u kom ne prepoznaš da zbir treba rastaviti na faktore ili da proizvod treba vratiti u zbir kako bi se uklopio sa ostatkom zadatka. Zato je tema važna: menja oblik izraza tako da problem postane rešiv."
      >
        <div className={s.grid3}>
          <SectionCard title="Za jednačine">
            <p>
              Zbir poput <InlineMath>{"\\sin 5x+\\sin x"}</InlineMath> teško je
              rešavati direktno, ali posle transformacije postaje proizvod i odmah
              dobijaš faktore.
            </p>
          </SectionCard>
          <SectionCard title="Za skraćivanje">
            <p>
              U razlomku se često pojavljuje ista struktura u brojniku i imeniocu.
              Transformacija otkriva zajednički faktor koji pre toga nisi video.
            </p>
          </SectionCard>
          <SectionCard title="Za kombinovanje izraza">
            <p>
              Kada imaš proizvod kao{" "}
              <InlineMath>{"\\sin 4x \\cos x"}</InlineMath>, obrnuta formula ga
              vraća u zbir i omogućava da ga spojiš sa drugim sinusima ili kosinusima.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "\\sin 5x+\\sin x=2\\sin 3x\\cos 2x, \\qquad \\cos 7x-\\cos 3x=-2\\sin 5x\\sin 2x."
          }
        </MathBlock>

        <MicroCheck
          question="Mikro-provera: zašto je proizvod često bolji oblik kada rešavaš jednačinu?"
          answer={
            <p>
              Zato što proizvod jednak nuli odmah daje razdvajanje na slučajeve. Ako
              dobiješ{" "}
              <InlineMath>{"2\\sin 3x \\cos 2x = 0"}</InlineMath>, onda rešavaš
              zasebno <InlineMath>{"\\sin 3x = 0"}</InlineMath> i{" "}
              <InlineMath>{"\\cos 2x = 0"}</InlineMath>. To je mnogo preglednije
              nego da ostaneš na zbiru{" "}
              <InlineMath>{"\\sin 5x + \\sin x = 0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTUICIJA ═══════════ */}
      <LessonSection
        id="intuicija"
        eyebrow="Intuitivno tumačenje"
        title="Sve se svodi na srednji ugao i polurazliku"
        description={
          "Najvažniji pedagoški uvid ove lekcije je sledeći: dva ugla \\(\\alpha\\) i \\(\\beta\\) možeš posmatrati kao simetrična odstupanja od nekog srednjeg ugla. Kada to uradiš, formule prestaju da budu spisak za bubanje i postaju logična posledica adicionih teorema."
        }
      >
        <div className={s.grid3}>
          <SectionCard title="Sredina">
            <p>
              Uzmi{" "}
              <InlineMath>{"m=\\frac{\\alpha+\\beta}{2}"}</InlineMath>. To je ugao
              koji leži tačno između <InlineMath>{"\\alpha"}</InlineMath> i{" "}
              <InlineMath>{"\\beta"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Odstupanje">
            <p>
              Uzmi{" "}
              <InlineMath>{"d=\\frac{\\alpha-\\beta}{2}"}</InlineMath>. To govori
              koliko je svaki od uglova udaljen od sredine.
            </p>
          </SectionCard>
          <SectionCard title="Nova slika">
            <p>
              Tada važi <InlineMath>{"\\alpha=m+d"}</InlineMath> i{" "}
              <InlineMath>{"\\beta=m-d"}</InlineMath>. Upravo zato se u formulama
              stalno pojavljuju polusuma i polurazlika.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {
            "m=\\frac{\\alpha+\\beta}{2}, \\qquad d=\\frac{\\alpha-\\beta}{2}, \\qquad \\alpha=m+d,\\ \\beta=m-d."
          }
        </MathBlock>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard
            title={
              String.raw`Kako nastaje formula za \(\sin\alpha+\sin\beta\)`
            }
          >
            <p>
              Ne kreći od gotove formule. Kreni od zamene{" "}
              <InlineMath>{"\\alpha=m+d"}</InlineMath>,{" "}
              <InlineMath>{"\\beta=m-d"}</InlineMath>, pa razvij oba sabirka pomoću
              adicionih teorema.
            </p>
          </SectionCard>
          <SectionCard title="Šta učenik najčešće propusti">
            <p>
              Polurazlika nije{" "}
              <InlineMath>{"\\alpha-\\beta"}</InlineMath>, nego{" "}
              <InlineMath>{"\\frac{\\alpha-\\beta}{2}"}</InlineMath>. Upravo taj
              faktor <InlineMath>{"\\frac{1}{2}"}</InlineMath> pravi razliku između
              pravilnog obrasca i pogrešne imitacije formule.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {String.raw`\sin\alpha+\sin\beta = \sin(m+d)+\sin(m-d)`}
        </MathBlock>
        <MathBlock>
          {String.raw`= (\sin m\cos d+\cos m\sin d) + (\sin m\cos d-\cos m\sin d) = 2\sin m\cos d.`}
        </MathBlock>
        <MathBlock>
          {String.raw`\sin\alpha+\sin\beta = 2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}.`}
        </MathBlock>

        <MicroCheck
          question={String.raw`Mikro-provera: šta se dobija ako je \(\alpha=\beta\)?`}
          answer={
            <>
              <p>
                Tada je{" "}
                <InlineMath>{"d=\\frac{\\alpha-\\beta}{2}=0"}</InlineMath>, pa
                formula daje
              </p>
              <MathBlock>
                {String.raw`\sin\alpha+\sin\alpha = 2\sin\alpha\cos 0 = 2\sin\alpha.`}
              </MathBlock>
              <p>To je dobar brz test da li formula ima smisla.</p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Ovo je skup alata koji moraš da prepoznaješ u oba smera"
        description={'U praksi ne postoji \u201Eva\u017Ena\u201C i \u201Eneva\u017Ena\u201C formula. Va\u017Eno je da ume\u0161 da izabere\u0161 pravi smer \u010Ditanja. Prve \u010Detiri formule uglavnom koriste\u0161 kada \u017Eeli\u0161 faktorizaciju, a druge \u010Detiri kada proizvod treba da vrati\u0161 u zbir ili razliku uglova.'}
      >
        {/* Zbir/razlika u proizvod */}
        <div className={s.grid2}>
          <FormulaCard
            title="Zbir sinusa"
            formula={String.raw`\sin\alpha+\sin\beta = 2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}`}
            note={
              <>
                Najčešći ulaz u faktorizaciju jednačina tipa{" "}
                <InlineMath>{String.raw`\sin A+\sin B=0`}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Razlika sinusa"
            formula={String.raw`\sin\alpha-\sin\beta = 2\cos\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}`}
            note={
              <>
                Važna kada treba da izdvojiš faktor{" "}
                <InlineMath>
                  {String.raw`\sin\frac{\alpha-\beta}{2}`}
                </InlineMath>{" "}
                ili da brojnika sklopiš sa imeniteljem.
              </>
            }
          />
          <FormulaCard
            title="Zbir kosinusa"
            formula={String.raw`\cos\alpha+\cos\beta = 2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}`}
            note="Dobija proizvod kosinusa, što je vrlo korisno kod nula i znaka izraza."
          />
          <FormulaCard
            title="Razlika kosinusa"
            formula={String.raw`\cos\alpha-\cos\beta = -2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}`}
            note="Ovo je formula sa najviše grešaka. Minus ispred proizvoda mora ostati tu."
          />
        </div>

        {/* Proizvod u zbir */}
        <div className={s.grid2} style={{ marginTop: 18 }}>
          <FormulaCard
            title={String.raw`Proizvod \(\sin\cdot\cos\)`}
            formula={String.raw`\sin x \cos y = \frac{1}{2}\bigl(\sin(x+y)+\sin(x-y)\bigr)`}
            note="Koristi kada proizvod treba da spojiš sa drugim sinusima ili da ga pretvoriš u zbir poznatih uglova."
          />
          <FormulaCard
            title={String.raw`Proizvod \(\cos\cdot\sin\)`}
            formula={String.raw`\cos x \sin y = \frac{1}{2}\bigl(\sin(x+y)-\sin(x-y)\bigr)`}
            note="Obrati pažnju na redosled: ista slova, ali drugačiji raspored proizvodi drugačiji znak."
          />
          <FormulaCard
            title={String.raw`Proizvod \(\cos\cdot\cos\)`}
            formula={String.raw`\cos x \cos y = \frac{1}{2}\bigl(\cos(x+y)+\cos(x-y)\bigr)`}
            note="Korisna formula kada želiš da sabereš više kosinusa ili da pređeš na uglove x+y i x-y."
          />
          <FormulaCard
            title={String.raw`Proizvod \(\sin\cdot\sin\)`}
            formula={String.raw`\sin x \sin y = \frac{1}{2}\bigl(\cos(x-y)-\cos(x+y)\bigr)`}
            note="Ova formula je često skriven izvor minusa. Redosled kosinusa u zagradi nije slučajan."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Pravilo orijentacije">
            <p>
              Ako vidiš zbir ili razliku istih trigonometrijskih funkcija, prvo
              pomisli na prelaz u proizvod. Ako vidiš proizvod dve funkcije, proveri
              da li ti više odgovara prelaz u zbir.
            </p>
          </SectionCard>
          <SectionCard title="Brza provera znaka">
            <p>
              Kod{" "}
              <InlineMath>{String.raw`\cos\alpha-\cos\beta`}</InlineMath> moraš
              dobiti minus ispred proizvoda. Ako ga nema, gotovo sigurno si pogrešio
              obrazac.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={'Mikro-provera: zašto su „obrnute" formule zaista iste formule?'}
          answer={
            <>
              <p>
                Zato što se radi o istoj jednakosti pročitanoj s druge strane. Na
                primer,
              </p>
              <MathBlock>
                {String.raw`\sin\alpha+\sin\beta = 2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}`}
              </MathBlock>
              <p>možeš čitati i ovako:</p>
              <MathBlock>
                {String.raw`\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2} = \frac{1}{2}\bigl(\sin\alpha+\sin\beta\bigr).`}
              </MathBlock>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivni"
        eyebrow="Interaktivni deo"
        title={String.raw`Canvas laboratorija: pomeri \(\alpha\) i \(\beta\), pa gledaj kako se pojavljuju \(m\) i \(d\)`}
        description="U ovoj laboratoriji ista formula se vidi i geometrijski i brojčano. Narandžasti i plavi krak predstavljaju alfa i beta, zeleni krak prikazuje srednji ugao m, a ljubičasti luk pokazuje rastojanje između uglova. Menjaj režim i proveravaj da leve i desne strane zaista daju istu vrednost."
      >
        <SumProductLab />

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Kako da koristiš laboratoriju">
            <p>
              Prvo uzmi lake parove poput{" "}
              <InlineMath>{"75^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"15^\\circ"}</InlineMath>, pa proveri da li
              prepoznaješ standardne vrednosti{" "}
              <InlineMath>{"45^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"30^\\circ"}</InlineMath>. Zatim menjaj znak i posmatraj
              kako se menja desna strana formule.
            </p>
          </SectionCard>
          <SectionCard title="Na šta obrati pažnju">
            <p>
              Kada približiš uglove jedan drugom, polurazlika{" "}
              <InlineMath>{"d"}</InlineMath> ide ka nuli. Tada desna strana dobija
              faktor <InlineMath>{"\\cos 0"}</InlineMath> ili{" "}
              <InlineMath>{"\\sin 0"}</InlineMath>, što lepo objašnjava zašto neke
              sume postaju dupli isti član, a neke razlike nestaju.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Kako da učiš iz ove laboratorije">
          <p>
            Pokušaj da prvo sam predvidiš srednji ugao i polurazliku pre nego što
            pogledaš rezultat. Ako se leva i desna strana poklapaju, formula radi. Ako
            ne, proveri da li si izabrao pravi tip transformacije.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Ovde se vidi kako formula radi u pravim ispitnim situacijama"
        description="Namerno su izabrani različiti tipovi zadataka. Cilj nije da samo prepišeš obrazac, nego da uočiš zbog čega je baš taj smer transformacije najkorisniji u datom trenutku."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izračunaj{" "}
              <InlineMath>{"\\sin 75^\\circ+\\sin 15^\\circ"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj zbir sinusa, pa idi iz zbira u proizvod." />
              <WalkStep
                number={2}
                title={
                  <>
                    Izračunaj polusumu i polurazliku:{" "}
                    <InlineMath>
                      {"\\frac{75^\\circ+15^\\circ}{2}=45^\\circ"}
                    </InlineMath>
                    ,{" "}
                    <InlineMath>
                      {"\\frac{75^\\circ-15^\\circ}{2}=30^\\circ"}
                    </InlineMath>
                    .
                  </>
                }
              />
              <WalkStep number={3} title="Ubaci standardne vrednosti.">
                <MathBlock>
                  {String.raw`\sin75^\circ+\sin15^\circ = 2\sin45^\circ\cos30^\circ = 2\cdot\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} = \frac{\sqrt{6}}{2}`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: umesto dva „nezgodna" ugla dobio si proizvod dva potpuno
              standardna ugla.
            </p>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: Reši jednačinu{" "}
              <InlineMath>{"\\sin 5x+\\sin x=0"}</InlineMath> za{" "}
              <InlineMath>{"x\\in[0,2\\pi)"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Ovo je zbir sinusa, pa ga faktoriši formulom zbira u proizvod."
              >
                <MathBlock>
                  {String.raw`\sin 5x+\sin x = 2\sin\frac{5x+x}{2}\cos\frac{5x-x}{2} = 2\sin 3x\cos 2x`}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Dobij proizvod jednak nuli.">
                <MathBlock>
                  {String.raw`2\sin 3x\cos 2x=0 \Longrightarrow \sin 3x=0 \ \text{ili}\ \cos 2x=0`}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši obe jednostavnije jednačine.">
                <MathBlock>
                  {String.raw`\sin 3x=0 \Longrightarrow x=\frac{k\pi}{3}, \qquad \cos 2x=0 \Longrightarrow x=\frac{\pi}{4}+\frac{k\pi}{2}`}
                </MathBlock>
                <MathBlock>
                  {String.raw`x\in\left\{0,\frac{\pi}{4},\frac{\pi}{3},\frac{2\pi}{3},\frac{3\pi}{4},\pi,\frac{5\pi}{4},\frac{4\pi}{3},\frac{5\pi}{3},\frac{7\pi}{4}\right\}`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: formula nije kraj zadatka, nego alat koji jednačinu dovodi u
              faktorski oblik.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: Pojednostavi{" "}
              <InlineMath>
                {"\\dfrac{\\cos 7x-\\cos 3x}{\\sin 5x}"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Brojnik je razlika kosinusa, pa koristi odgovarajuću formulu."
              >
                <MathBlock>
                  {String.raw`\cos 7x-\cos 3x = -2\sin\frac{7x+3x}{2}\sin\frac{7x-3x}{2} = -2\sin 5x\sin 2x`}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Skrati zajednički faktor.">
                <MathBlock>
                  {String.raw`\frac{\cos 7x-\cos 3x}{\sin 5x} = \frac{-2\sin 5x\sin 2x}{\sin 5x} = -2\sin 2x, \qquad \sin 5x\neq 0`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: skraćivanje je dozvoljeno samo na domenu na kom je početni
              izraz definisan.
            </p>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: Pretvori proizvod{" "}
              <InlineMath>{"\\sin 4x\\cos x"}</InlineMath> u zbir
            </h3>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Ovo je proizvod tipa{" "}
                    <InlineMath>{"\\sin\\cdot\\cos"}</InlineMath>. Koristi obrnuti
                    smer iste jednakosti.
                  </>
                }
              >
                <MathBlock>
                  {String.raw`\sin 4x\cos x = \frac{1}{2}\bigl(\sin(4x+x)+\sin(4x-x)\bigr) = \frac{1}{2}\bigl(\sin 5x+\sin 3x\bigr)`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: sada su uglovi{" "}
              <InlineMath>{"5x"}</InlineMath> i{" "}
              <InlineMath>{"3x"}</InlineMath>, pa izraz možeš direktno sabirati sa
              drugim sinusima istih uglova.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Dokaži da je{" "}
              <InlineMath>
                {"\\cos 3x+\\cos x=2\\cos 2x\\cos x"}
              </InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj zbir kosinusa." />
              <WalkStep
                number={2}
                title={
                  <>
                    Izračunaj polusumu i polurazliku:{" "}
                    <InlineMath>{"\\frac{3x+x}{2}=2x"}</InlineMath>,{" "}
                    <InlineMath>{"\\frac{3x-x}{2}=x"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={3} title="Primeni formulu.">
                <MathBlock>
                  {String.raw`\cos 3x+\cos x = 2\cos\frac{3x+x}{2}\cos\frac{3x-x}{2} = 2\cos 2x\cos x`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: mnogi „dokazi identiteta" na prijemnom su zapravo vežba brzog
              prepoznavanja obrasca.
            </p>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Reši jednačinu{" "}
              <InlineMath>{"\\cos 4x+\\cos 2x=0"}</InlineMath> za{" "}
              <InlineMath>{"x\\in[0,2\\pi)"}</InlineMath>
            </h3>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zbir kosinusa ide u proizvod.">
                <MathBlock>
                  {String.raw`\cos 4x+\cos 2x = 2\cos\frac{4x+2x}{2}\cos\frac{4x-2x}{2} = 2\cos 3x\cos x`}
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Razdvoji na faktore.">
                <MathBlock>
                  {String.raw`2\cos 3x\cos x=0 \Longrightarrow \cos 3x=0 \ \text{ili}\ \cos x=0`}
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Reši i odstrani duplikate.">
                <MathBlock>
                  {String.raw`\cos 3x=0 \Longrightarrow x=\frac{\pi}{6}+\frac{k\pi}{3}, \qquad \cos x=0 \Longrightarrow x=\frac{\pi}{2}+k\pi`}
                </MathBlock>
                <MathBlock>
                  {String.raw`x\in\left\{\frac{\pi}{6},\frac{\pi}{2},\frac{5\pi}{6},\frac{7\pi}{6},\frac{3\pi}{2},\frac{11\pi}{6}\right\}`}
                </MathBlock>
              </WalkStep>
            </div>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 800, marginTop: 12 }}>
              Poenta: kod faktorizacije ne zaboravi da ukloniš duplikate pri
              zapisivanju konačnog skupa rešenja.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ STRATEGIJA IZBORA ═══════════ */}
      <LessonSection
        id="strategija"
        eyebrow="Strategija izbora"
        title="Kako da za 10 sekundi odlučiš u kom smeru da ideš"
        description="Učeniku je najteži trenutak obično sam početak: nije jasno da li izraz treba razvijati, sabijati ili čitati unazad. Sledeća pravila nisu zamena za razmišljanje, ali su dobar ispitni algoritam."
      >
        <div className={s.grid3}>
          <SectionCard title="Ako vidiš zbir ili razliku istih funkcija">
            <p>
              <InlineMath>{String.raw`\sin A\pm \sin B`}</InlineMath> ili{" "}
              <InlineMath>{String.raw`\cos A\pm \cos B`}</InlineMath> obično traže
              prelaz u proizvod, jer time dobijaš faktore.
            </p>
          </SectionCard>
          <SectionCard title="Ako vidiš proizvod dve funkcije">
            <p>
              <InlineMath>{String.raw`\sin x\cos y`}</InlineMath>,{" "}
              <InlineMath>{String.raw`\cos x\cos y`}</InlineMath>,{" "}
              <InlineMath>{String.raw`\sin x\sin y`}</InlineMath> često treba
              vratiti u zbir da bi se spojili sa drugim članovima.
            </p>
          </SectionCard>
          <SectionCard title="Ako je cilj jednačina ili skraćivanje">
            <p>
              Prvo traži faktorski oblik. Ako je cilj kombinovanje izraza ili
              računanje tačne vrednosti, ponekad je korisniji zbir.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Brz algoritam">
            <p>
              1. Prepoznaj tip izraza. 2. Izračunaj polusumu i polurazliku ili zbir
              i razliku uglova. 3. Primeni formulu. 4. Tek tada rešavaj jednačinu,
              skraćuj ili kombinuješ sa ostatkom zadatka.
            </p>
          </SectionCard>
          <SectionCard title="Kada ne treba žuriti sa skraćivanjem">
            <p>
              Ako si dobio zajednički faktor u brojniku i imeniocu, seti se da
              skraćivanje menja uslove. Prvo zapiši gde je početni izraz uopšte
              definisan.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {String.raw`\text{prepoznaj tip izraza} \rightarrow \text{izaberi smer transformacije} \rightarrow \text{dobij pogodniji oblik} \rightarrow \text{tek onda rešavaj zadatak}`}
        </MathBlock>

        <MicroCheck
          question={String.raw`Mikro-provera: šta bi uradio sa izrazom \(\sin 4x\cos x+\sin 5x\)?`}
          answer={
            <>
              <p>
                Ovde proizvod{" "}
                <InlineMath>{"\\sin 4x\\cos x"}</InlineMath> treba prevesti u zbir,
                jer već pored sebe imaš član{" "}
                <InlineMath>{"\\sin 5x"}</InlineMath>. Posle transformacije dobijaš
              </p>
              <MathBlock>
                {String.raw`\sin 4x\cos x=\frac{1}{2}(\sin 5x+\sin 3x),`}
              </MathBlock>
              <p>
                pa se izraz prirodno kombinuje sa{" "}
                <InlineMath>{"\\sin 5x"}</InlineMath>.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Ovo su tipične tačke na kojima nestaju laki poeni"
        description='Većina grešaka u ovoj lekciji nije „teška matematika", nego nepažnja u obliku izraza. Zato ih treba unapred osvestiti i redovno proveravati pri svakom računu.'
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              1. Zaboravljen faktor <InlineMath>{"2"}</InlineMath>
            </h3>
            <p>
              Skoro sve formule zbira u proizvod imaju faktor{" "}
              <InlineMath>{"2"}</InlineMath>. Bez njega dobijaš obrazac koji liči na
              tačan, ali numerički ne radi.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              2. Pogrešan znak kod{" "}
              <InlineMath>{String.raw`\cos\alpha-\cos\beta`}</InlineMath>
            </h3>
            <p>
              Pravilan oblik je{" "}
              <InlineMath>
                {String.raw`-2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}`}
              </InlineMath>
              . Minus ispred proizvoda nije ukras.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>3. Polurazlika bez podele sa 2</h3>
            <p>
              Učenik napiše{" "}
              <InlineMath>{String.raw`\cos(\alpha-\beta)`}</InlineMath> umesto{" "}
              <InlineMath>
                {String.raw`\cos\frac{\alpha-\beta}{2}`}
              </InlineMath>
              . To je znak da formula nije shvaćena preko sredine i odstupanja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              4. Skraćivanje bez uslova definisanosti
            </h3>
            <p>
              Ako skratiš faktor{" "}
              <InlineMath>{"\\sin 5x"}</InlineMath>, moraš zadržati uslov{" "}
              <InlineMath>{"\\sin 5x\\neq 0"}</InlineMath> na kome je početni izraz
              bio definisan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>5. Pogrešan smer transformacije</h3>
            <p>
              Neki zadaci se nepotrebno komplikuju jer učenik proizvod razvija u zbir
              onda kada mu zapravo treba faktorizacija, ili obrnuto.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>6. Duplikati u skupu rešenja</h3>
            <p>
              Posle faktorizacije dobijaš više skupova rešenja. Kada ih spojiš,
              proveri da li su neka od njih ista i ukloni ponavljanja.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova lekcija stvarno pojavljuje na prijemnom"
        description='U praksi se ove formule ne javljaju kao pitanje „napiši formulu". Mnogo češće su ugrađene u dužu jednačinu, u trigonometrijski razlomak ili u zadatak gde treba brzo prepoznati obrazac i skratiti račun.'
      >
        <div className={s.grid2}>
          <SectionCard title="Tip 1: faktorizacija jednačine">
            <p>
              Zbir ili razlika se prvo sabiju u proizvod, a zatim se rešava po
              faktorima. Ovo je jedan od najčešćih obrazaca.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: skraćivanje razlomka">
            <p>
              Brojnik se transformiše tako da otkrije isti faktor kao u imeniocu. Ovde
              je presudno da ne zaboraviš uslove definisanosti.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: skriven identitet">
            <p>
              Dugačak izraz može da se svede u jednu liniju čim prepoznaš da je u
              pitanju zbir kosinusa ili proizvod{" "}
              <InlineMath>{"\\sin x\\cos y"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Tip 4: brojanje rešenja u intervalu">
            <p>
              Transformacija je samo prvi korak. Posle nje moraš pažljivo zapisati sva
              rešenja na zadatom intervalu i odstraniti duplikate.
            </p>
          </SectionCard>
        </div>

        <MathBlock>
          {String.raw`\text{Prijemni ček-list:} \quad \text{koji je tip izraza?} \rightarrow \text{da li mi treba proizvod ili zbir?} \rightarrow \text{koji su uslovi definisanosti?} \rightarrow \text{jesam li dobro zapisao sva rešenja?}`}
        </MathBlock>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Vežbe za sigurno razumevanje formule i njene upotrebe"
        description="Probaj prvo samostalno, pa tek onda otvori rešenja. Redosled je složen tako da ide od čistog prepoznavanja obrasca do tipičnih prijemnih primena."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Pretvori <InlineMath>{"\\sin 9x+\\sin x"}</InlineMath> u proizvod.
              </p>
            }
            solution={
              <>
                <p>Koristimo formulu za zbir sinusa:</p>
                <MathBlock>
                  {String.raw`\sin 9x+\sin x = 2\sin\frac{9x+x}{2}\cos\frac{9x-x}{2} = 2\sin 5x\cos 4x`}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Pretvori <InlineMath>{"\\cos 7x+\\cos x"}</InlineMath> u proizvod.
              </p>
            }
            solution={
              <MathBlock>
                {String.raw`\cos 7x+\cos x = 2\cos\frac{7x+x}{2}\cos\frac{7x-x}{2} = 2\cos 4x\cos 3x`}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Pretvori <InlineMath>{"\\cos 5x-\\cos x"}</InlineMath> u proizvod.
              </p>
            }
            solution={
              <>
                <p>Pazi na minus ispred proizvoda.</p>
                <MathBlock>
                  {String.raw`\cos 5x-\cos x = -2\sin\frac{5x+x}{2}\sin\frac{5x-x}{2} = -2\sin 3x\sin 2x`}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Pretvori <InlineMath>{"\\sin 3x\\cos 2x"}</InlineMath> u zbir.
              </p>
            }
            solution={
              <MathBlock>
                {String.raw`\sin 3x\cos 2x = \frac{1}{2}\bigl(\sin(3x+2x)+\sin(3x-2x)\bigr) = \frac{1}{2}(\sin 5x+\sin x)`}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Reši{" "}
                <InlineMath>{"\\sin 3x+\\sin x=0"}</InlineMath> za{" "}
                <InlineMath>{"x\\in[0,2\\pi)"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Prvo faktorišemo:</p>
                <MathBlock>
                  {String.raw`\sin 3x+\sin x = 2\sin 2x\cos x`}
                </MathBlock>
                <p>Zato važi:</p>
                <MathBlock>
                  {String.raw`2\sin 2x\cos x=0 \Longrightarrow \sin 2x=0 \ \text{ili}\ \cos x=0`}
                </MathBlock>
                <MathBlock>
                  {String.raw`\sin 2x=0 \Longrightarrow x=\frac{k\pi}{2}, \qquad \cos x=0 \Longrightarrow x=\frac{\pi}{2}+k\pi`}
                </MathBlock>
                <MathBlock>
                  {String.raw`x\in\left\{0,\frac{\pi}{2},\pi,\frac{3\pi}{2}\right\}`}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Pojednostavi{" "}
                <InlineMath>
                  {"\\dfrac{\\sin 6x-\\sin 2x}{\\sin 2x}"}
                </InlineMath>
                .
              </p>
            }
            solution={
              <>
                <p>Brojnik je razlika sinusa:</p>
                <MathBlock>
                  {String.raw`\sin 6x-\sin 2x = 2\cos\frac{6x+2x}{2}\sin\frac{6x-2x}{2} = 2\cos 4x\sin 2x`}
                </MathBlock>
                <p>Zato je</p>
                <MathBlock>
                  {String.raw`\frac{\sin 6x-\sin 2x}{\sin 2x} = 2\cos 4x, \qquad \sin 2x\neq 0`}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 7"
            problem={
              <p>
                Izračunaj{" "}
                <InlineMath>{"\\sin 80^\\circ-\\sin 20^\\circ"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <p>Koristimo razliku sinusa:</p>
                <MathBlock>
                  {String.raw`\sin 80^\circ-\sin 20^\circ = 2\cos\frac{80^\circ+20^\circ}{2}\sin\frac{80^\circ-20^\circ}{2} = 2\cos 50^\circ\sin 30^\circ = \cos 50^\circ`}
                </MathBlock>
              </>
            }
          />
          <ExerciseCard
            title="Vežba 8"
            problem={
              <p>
                Pretvori <InlineMath>{"\\cos 4x\\cos x"}</InlineMath> u zbir.
              </p>
            }
            solution={
              <MathBlock>
                {String.raw`\cos 4x\cos x = \frac{1}{2}\bigl(\cos(4x+x)+\cos(4x-x)\bigr) = \frac{1}{2}(\cos 5x+\cos 3x)`}
              </MathBlock>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Ključna poruka"
        title="Ne pamti osam formula kao osam rečenica"
        description={String.raw`Ako zaista razumeš da su \(\alpha\) i \(\beta\) jednaki \(m+d\) i \(m-d\), onda sve formule dobijaju smisao. Tada ih ne pamtiš na silu, nego prepoznaješ da zbir ili razlika istih funkcija želi da postane proizvod, a proizvod ponekad treba čitati unazad kao zbir.`}
      >
        <div className={s.grid3}>
          <SectionCard title="Glavni trik">
            <p>
              Polusuma i polurazlika su organizacioni centar cele lekcije.
            </p>
          </SectionCard>
          <SectionCard title="Glavna korist">
            <p>
              Transformacija menja oblik izraza tako da ga možeš faktorisati,
              skratiti ili sabirati.
            </p>
          </SectionCard>
          <SectionCard title="Glavna navika">
            <p>
              Pre svakog računa pitaj se: da li mi treba proizvod ili zbir?
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako sledeće četiri poruke ostanu stabilne, ova lekcija će ti zaista pomagati u narednim zadacima, a neće ostati samo kao lista formula u svesci."
      >
        <div className={s.grid2}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Sredina i odstupanje</h3>
            <p>
              Uglove posmatraj preko{" "}
              <InlineMath>{"m=\\frac{\\alpha+\\beta}{2}"}</InlineMath> i{" "}
              <InlineMath>{"d=\\frac{\\alpha-\\beta}{2}"}</InlineMath>. Bez toga
              formule deluju nepovezano.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Zbir istih funkcija ide u proizvod</h3>
            <p>
              <InlineMath>{String.raw`\sin A\pm\sin B`}</InlineMath> i{" "}
              <InlineMath>{String.raw`\cos A\pm\cos B`}</InlineMath> obično sabijaš u
              proizvod jer time dobijaš faktore.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              3. Proizvod se po potrebi vraća u zbir
            </h3>
            <p>
              Kada proizvod treba uklopiti sa drugim sinusima ili kosinusima, čitaj
              formulu unazad i vrati ga u zbir.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              4. Na prijemnom proveravaj uslove i duplikate
            </h3>
            <p>
              Transformacija sama nije kraj. Posle nje proveri domen, skraćivanje i
              konačan skup rešenja.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći logičan korak: primeni ove transformacije u trigonometrijskim
          jednačinama, nejednačinama i složenijim identitetima.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
