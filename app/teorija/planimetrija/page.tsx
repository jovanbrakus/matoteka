export default function PlanimetrijaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Planimetrija</h1>
      <p className="mb-6 text-[#94a3b8]">Geometrija u ravni: trouglovi, uglovi, sličnost i površine.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Ključne formule</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Pitagora: a²+b²=c².</li>
          <li>Površina trougla: P = a·h/2.</li>
          <li>Obim kruga: O=2πr, površina P=πr².</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Tipični zadaci</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Prepoznavanje pravouglog trougla.</li>
          <li>Određivanje nedostajućih uglova u jednakostranicnim i pravouglim oblicima.</li>
          <li>Primena sličnosti za nepoznate dužine.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako je trougao pravougli sa katetama 6 i 8, hipotenuza je 10.
        </p>
      </section>
    </div>
  );
}
