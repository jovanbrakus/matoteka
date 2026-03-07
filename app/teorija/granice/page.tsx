export default function LimitsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Granice (limiti)</h1>
      <p className="mb-6 text-[#94a3b8]">Osnovno razumevanje granice u testovima: kada izrazi rastu, opadaju ili se približavaju broju.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Brzi principi</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Ako je brojilac i imenilac teže odredljiv, izdvoji najveći stepen.</li>
          <li>Za (a^n - b^n)/(a^m - b^m) koristite faktorizaciju ako je 0/0.</li>
          <li>Ako imenilac teži 0+ i brojilac nije 0, granica ide u ±∞.
</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          lim x→2 (x²-4)/(x-2) = 4.
        </p>
      </section>
    </div>
  );
}
