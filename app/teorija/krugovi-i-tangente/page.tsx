export default function CirclesAndTangentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Krugovi i tangente</h1>
      <p className="mb-6 text-[#94a3b8]">
        Ova tema obuhvata često pojavljivanje kruga u geometrijskim zadacima: upisani/opsisani krugovi, tangente i standardne relacije.
      </p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Brze formule</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Obim kruga: O = 2πr, površina: P = πr².</li>
          <li>Tangenta je pravac koji se dodiruje kruga u jednoj tački i pravi pravac pravću prema centru pod pravim uglom.</li>
          <li>U trouglu: 1/r = 1/p (opisan) + 1/q (upisan) za pravougaoni trougao? (u opštem koristi proverene formule za poluprečnik upisanog i opisnog kruga).</li>
        </ul>
      </section>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Šta obično traže zadaci</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Krug opisan oko trougla: R = a/(2sin A) ili ekvivalenti.</li>
          <li>Krug upisan u trougao: r = a/(b+c+? ) i poznata veza r = 2Δ / obim.</li>
          <li>Dodirne tačke, dužine tangenti, poluprečnik i poluprečnici u lancima.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Ako je dužina tangente od tačke do kruga poznata, a žar je centar, uzmi pravougli trougao (poluprečnik, tangenta, dužina) da dobiješ odnose.</p>
      </section>
    </div>
  );
}
