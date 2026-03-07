export default function FunctionCompositionPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Kompozicija i inverzna funkcija</h1>
      <p className="mb-6 text-[#94a3b8]">
        Ova tema pomaže na zadacima gde se funkcije „ugnježđuju“ jednu u drugu ili se traži inverz.
      </p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Kompozicija</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>(f ∘ g)(x) znači da prvo računaš g(x), pa f(g(x)).</li>
          <li>Bitno je paziti na domen: g(x) mora biti u domenu funkcije f.</li>
          <li>Računaš korak po korak i proveravaš intervale.</li>
        </ul>
      </section>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Inverzna funkcija</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Za y = f(x), zameni x i y i reši po y: dobijes f⁻¹(x).</li>
          <li>Inverz postoji ako je f jedna-na-jedan (i na odgovarajućem intervalu).</li>
          <li>Na grafiku: inverzna je refleksija funkcije preko prave y=x.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako je f(x)=2x+3, onda f⁻¹(x)=(x−3)/2.
        </p>
      </section>
    </div>
  );
}
