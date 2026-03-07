export default function AnalyticGeometryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Analitička geometrija</h1>
      <p className="mb-6 text-[#94a3b8]">
        Fokus je na jednadžbama prave i kruga, udaljenosti, nagibu i položaju u ravni.
      </p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-2 text-xl font-semibold">Osnove</h2>
        <ul className="list-disc pl-5 text-sm text-[#94a3b8] space-y-2">
          <li>Nagib prave: k = (y2-y1)/(x2-x1).</li>
          <li>Jednačina prave: y = kx + n ili Ax+By+C=0.</li>
          <li>Udaljenost tačke od prave i dužina segmenta koriste se često.</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Brzi check</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Proveri da li je uslov „leži na pravoj“ ili „simetralan“.</li>
          <li>Sa jednačina dobijaš y i odmah proveri znak sa intervalom.</li>
          <li>Ako ima apsolutnih vrednosti, ispitaj intervale gde su izrazi ≥0.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          Za tačke A(1,2), B(3,6), nagib je k=2, a pravac je y=2x.
        </p>
      </section>
    </div>
  );
}
