import Link from "next/link";

const topics = [
  { href: "/teorija/linearne-jednadzbe", label: "Linearne jednačine i nejednačine", summary: "Osnove rešavanja linearnih i složenijih nejednačina za brže računanje." },
  { href: "/teorija/kvadratne-jednadzbe", label: "Kvadratne jednačine", summary: "Kvadrična formula, diskriminanta i tipovi zadataka." },
  { href: "/teorija/procenti-proporcije", label: "Procenti i proporcije", summary: "Brzi proračuni, rast/pad i proporcionalnost u zadacima sa procentima." },
  { href: "/teorija/realni-brojevi-koreni", label: "Realni brojevi i koreni", summary: "Rešenje korenskih izraza, apsolutna vrednost i redosled operacija." },
  { href: "/teorija/trigonometrija", label: "Trigonometrija", summary: "Osnovni trigonometrijski izrazi, formule i jednostavno rešenje jednačina." },
  { href: "/teorija/trigonometrijske-jednadzbe", label: "Trigonometrijske jednačine", summary: "Sin, cos, tan i periodični obrasci u jednačinama." },
  { href: "/teorija/logaritmi-eksponencijalne", label: "Logaritmi i eksponencijalne", summary: "Transformacije i rešenje logaritamskih/eksponencijalnih izraza." },
  { href: "/teorija/funkcije-grafici", label: "Funkcije i grafici", summary: "Kako prepoznati rast/opadanje, nultočke i znak funkcije." },
  { href: "/teorija/planimetrija", label: "Planimetrija", summary: "Trouglovi, površine, oblici i ključni geometrijski odnosi." },
  { href: "/teorija/stereometrija", label: "Stereometrija", summary: "Zapremina i površine tela u prostoru." },
  { href: "/teorija/solida", label: "Solida", summary: "Kupa, stožac, piramida i njihovi formuli." },
  { href: "/teorija/analiticka-geometrija", label: "Analitička geometrija", summary: "Jednačine pravih, nagib i koordinate u ravni." },
  { href: "/teorija/kompleksni-brojevi", label: "Kompleksni brojevi", summary: "Osnovne operacije sa i i konjugovanjem." },
  { href: "/teorija/kombinatorika", label: "Kombinatorika", summary: "Permutacije, kombinacije i brojanje rasporeda." },
  { href: "/teorija/verovatnoca", label: "Verovatnoća", summary: "Osnovna računanja: p(a)=|A|/|Ω|, uslovne i kombinovane." },
  { href: "/teorija/algebarski-izrazi", label: "Algebarski izrazi", summary: "Pojednostavljenje izraza sa korenima, razlomcima i faktorisanjem." },
  { href: "/teorija/binomna-formula", label: "Binomna formula", summary: "Razvoj izraza sa kvadratima i prepoznavanje tipičnih obrazaca." },
  { href: "/teorija/kvadratna-funkcija", label: "Kvadratna funkcija", summary: "Parabola, vrh i znak funkcije za zadatke iz grafika i jednačina." },
  { href: "/teorija/kompozicija-i-inverzna-funkcija", label: "Kompozicija i inverzna funkcija", summary: "Kako raditi sa f(g(x)) i pronalaziti inverzne funkcije." },
  { href: "/teorija/iracionalne-jednadzbe", label: "Iracionalne jednačine", summary: "Rešavanje sa korenima i obavezna provera rešenja." },
  { href: "/teorija/izvod", label: "Izvod funkcije", summary: "Pravila izvoda i brz pregled rasta i pada funkcije." },
  { href: "/teorija/eksponencijalne-jednadzbe", label: "Eksponencijalne jednačine", summary: "Prebacivanje na zajedničku osnovu i logaritamska rešenja." },
  { href: "/teorija/granice", label: "Granice (limiti)", summary: "Brzo baratanje granicama pri 0 i beskonačnosti." },
  { href: "/teorija/nizovi", label: "Nizovi", summary: "Aritmetički/geometrijski nizovi i formule n-tog člana." },
  { href: "/teorija/polinomi", label: "Polinomi", summary: "Sabiranje, množenje i faktorizacija polinoma." },
];

export default function TeorijaIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-[#e2e8f0]">Teorija za pripremu</h1>
      <p className="mb-6 text-[#94a3b8]">
        Brzo i jasno učenje uz ključne teme sa primerima i trikovima za prijemne testove.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="rounded-2xl border border-[#334155] bg-[#1e293b] p-5 transition hover:border-[#60a5fa] hover:bg-[#1f2a3b]"
          >
            <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">{topic.label}</h2>
            <p className="text-sm text-[#94a3b8]">{topic.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
