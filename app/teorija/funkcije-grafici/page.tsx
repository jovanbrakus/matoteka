export default function FunkcijeGraficiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Funkcije i grafici</h1>
      <p className="mb-6 text-[#94a3b8]">Svaka funkcija je alat za tumačenje odnosa između veličina i brže predviđanje odgovora.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Osnovni elementi grafa</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Nultočke: gde funkcija sipa u 0.</li>
          <li>Monotonost: rastuće/opadajuće.</li>
          <li>Koeficijent predznaka određuje smer i smerni nagib.</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Pristup u zadatku</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Prebaci izraze da dobiješ eksplicitni oblik y=f(x).</li>
          <li>Odredi intervale gde je funkcija pozitivna/negativna.</li>
          <li>Za linearnu funkciju (ax+b) lako čitaš nulu i znak.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          f(x)= -2x+6 je nula u x=3, za x&lt;3 pozitivna, za x&gt;3 negativna.
        </p>
      </section>
    </div>
  );
}
