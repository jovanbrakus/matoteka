export default function ProcentiProporcijePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Procenti i proporcije</h1>
      <p className="mb-6 text-[#94a3b8]">
        Pomoćna tema za gotovo sve kvantitativne zadatke: preračunavanje, rast i smanjenje.
      </p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Osnovne formule</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>p% od x = x * p / 100</li>
          <li>Nova vrednost = stara * (1 + p/100) za rast, ili (1 - p/100) za pad.</li>
          <li>a:b = c:d ⇒ ad = bc (križno množenje).</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Brzi pristup</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Za 10%, 20%, 50% i 25% znaš odmah odgovore: 10%=/10, 20%=/5, 25%=/4, 50%=/2.</li>
          <li>Proveri realnost: povećanje za 20% i pad za 20% nije isto.</li>
          <li>Koristi razlomke za greške manjoj.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako je 80 = 40% od nekog broja, ceo broj je 200. (80*100/40)
        </p>
      </section>
    </div>
  );
}
