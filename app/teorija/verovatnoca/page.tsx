export default function VerovatnocaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Verovatnoća</h1>
      <p className="mb-6 text-[#94a3b8]">Najčešća strategija: broj povoljnih ishoda / broj mogućih ishoda.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Osnovna formula</h2>
        <p className="text-sm">P(A) = |A| / |Ω|</p>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Standardna pravila</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nezavisni događaji: P(A∩B)=P(A)P(B).</li>
          <li>Uslovni: P(A∩B)=P(A)P(B|A).</li>
          <li>Praktično: prvo “brojimo”, pa delimo.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako bacamo fer kockicu, P(čiji je ishod 4) = 1/6.
        </p>
      </section>
    </div>
  );
}
