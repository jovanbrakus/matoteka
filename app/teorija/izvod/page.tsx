export default function DerivativesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Izvod funkcije i njegove primene</h1>
      <p className="mb-6 text-[#94a3b8]">Iako je na nivou osnovnog nivoa, izvod često izlazi kroz monotonicitet i tangejne.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Osnovna pravila</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>(x^n)' = n x^(n-1)</li>
          <li>(c·f)' = c·f', (f+g)' = f'+g'</li>
          <li>(f·g)' = f'g + fg' (ako ti je potrebno)</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Zašto je važan</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Brzo daje smer rasta i opadanja funkcije.</li>
          <li>Koristi ga za procenu ekstremnih tačaka i brzine promene.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako je f(x)=x², onda je f'(x)=2x, dakle funkcija raste za x>0 i opada za x<0.
        </p>
      </section>
    </div>
  );
}
