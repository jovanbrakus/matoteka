export default function SolidGeometryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Solida (geometrija u prostoru)</h1>
      <p className="mb-6 text-[#94a3b8]">Ova tema pokriva osnovne formule za prostorne objekte kada je zadatak geometrijski.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Osnovne formule</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Stožac: V=1/3 πr²h</li>
          <li>Kupa: V=1/3πr²h, Površina=πr(r+l)+πr²</li>
          <li>Oko sve: prepoznaj osnovu i visinu.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Saveti za brzinu</h2>
        <p className="text-sm text-[#94a3b8]">
          Prvo napiši sve poznate mere u jednake jedinice, onda biraj formulu po tipu objekta.
        </p>
      </section>
    </div>
  );
}
