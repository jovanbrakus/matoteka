import Link from "next/link";

const topics = [
  { href: "/teorija/linearne-jednadzbe", label: "Linearne jednačine i nejednačine", summary: "Osnove rešavanja linearnih i složenijih nejednačina za brže računanje." },
  { href: "/teorija/kvadratne-jednadzbe", label: "Kvadratne jednačine", summary: "Kvadrična formula, diskriminanta i tipovi zadataka." },
  { href: "/teorija/procenti-proporcije", label: "Procenti i proporcije", summary: "Brzi proračuni, rast/pad i proporcionalnost u zadacima sa procentima." },
  { href: "/teorija/realni-brojevi-koreni", label: "Realni brojevi i koreni", summary: "Rešenje korenskih izraza, apsolutne vrednosti i redosled operacija." },
  { href: "/teorija/trigonometrija", label: "Trigonometrija", summary: "Osnovni relacije, formule i reševanje trigonometrijskih jednačina." },
  { href: "/teorija/logaritmi-eksponencijalne", label: "Logaritmi i eksponencijale", summary: "Pravila računanja i tipični zadaci za prijemne.“" },
  { href: "/teorija/funkcije-grafici", label: "Funkcije i grafici", summary: "Kako prepoznati tip funkcije, nultočke, rast/ opadanje." },
  { href: "/teorija/planimetrija", label: "Planimetrija", summary: "Trouglovi, sličnost, Pitagora i proračuni površina.“" },
  { href: "/teorija/kombinatorika", label: "Kombinatorika", summary: "Permutacije, kombinacije i rasporedi u realnim kombinatoričkim zadacima." },
  { href: "/teorija/verovatnoca", label: "Verovatnoća", summary: "Osnovni modeli, uslovna verovatnoća i jednostavne statističke računice." },
];

export default function TeorijaIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-[#e2e8f0]">Teorija za pripremu</h1>
      <p className="mb-6 text-[#94a3b8]">
        Brzo i jasno učenje uz 10 ključnih tema sa primerima i trikovima za prijemne testove.
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
