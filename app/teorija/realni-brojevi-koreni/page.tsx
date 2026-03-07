export default function RealniBrojeviKoreniPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 leading-relaxed text-[#e2e8f0]">
      <h1 className="mb-4 text-3xl font-bold">Realni brojevi i koreni</h1>
      <p className="mb-6 text-[#94a3b8]">Ovde ide osiguranje za svaku vrstu zadatka sa korenjem i negativnim brojevima pod kvadratnim korenom.</p>

      <section className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <h2 className="mb-3 text-xl font-semibold">Pravila za korene</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>√a · √b = √(ab), za a,b ≥ 0.</li>
          <li>√a / √b = √(a/b), za b>0.</li>
          <li>√(a²)=|a|, a realan broj.</li>
        </ul>
      </section>

      <section className="mb-6 text-sm text-[#94a3b8]">
        <h2 className="mb-2 text-lg font-semibold text-[#e2e8f0]">Brzi trikovi</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Racionalizacija imenioca kad je potrebno eliminisati koren u nazivniku.</li>
          <li>Skraćuj pre izvlačenja korena: √(49x²) = 7|x|.</li>
          <li>U poređenju brojeva izračunaj stepenovanje kvadrata na celobrojne vrednosti.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
        <h2 className="mb-2 text-lg font-semibold">Primer</h2>
        <p className="text-sm text-[#94a3b8]">
          √36 + 2√9 = 6 + 6 = 12.
        </p>
      </section>
    </div>
  );
}
