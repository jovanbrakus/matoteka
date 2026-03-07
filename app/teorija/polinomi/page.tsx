export default function PolynomialsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Polinomi</h1>
      <p className="mb-6 text-[#94a3b8]">Polinomi su osnova mnogih zadataka: razlaganje, stepeni, vrednosti i jednadžbe.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Brzi alati</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Sabiranje i množenje po stepenima.</li>
          <li>Faktoracija (x²-a², x³-a³, zajednički činilac).</li>
          <li>Hornerova šema za brzo izračunavanje vrednosti.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          x³- x = x(x-1)(x+1).
        </p>
      </section>
    </div>
  );
}
