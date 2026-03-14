import Link from "next/link";

export default function LandingHero() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <header className="relative overflow-hidden pt-20 pb-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2 bg-gradient-to-b from-[#ec5b13]/10 to-transparent opacity-50 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: Text */}
            <div className="flex flex-col gap-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ec5b13]/20 bg-[#ec5b13]/10 px-3 py-1">
                <span className="material-symbols-outlined text-sm text-[#ec5b13]">verified</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ec5b13]">
                  Priprema za prijemni 2026/27
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.1] text-white md:text-7xl">
                Tvoja ulaznica za{" "}
                <span className="bg-gradient-to-r from-[#ec5b13] to-[#06b6d4] bg-clip-text text-transparent">
                  FAKULTET
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                Platforma dizajnirana za buduće inženjere. Postigni maksimalan
                broj poena uz personalizovan plan rada, AI asistenciju i bazu od
                preko 2000 rešenih zadataka.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/prijava"
                  className="group flex items-center gap-3 rounded-xl bg-[#ec5b13] px-8 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-all hover:bg-[#ec5b13]/90"
                >
                  Počni besplatno
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/vezbe"
                  className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
                >
                  Pogledaj primer
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-8">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-2xl font-black text-white">98.4%</span>
                  <span>prosek uspeha</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-2xl font-black text-white">2000+</span>
                  <span>rešenih zadataka</span>
                </div>
              </div>
            </div>

            {/* Right: Existing animated 3D visual (KEPT AS-IS) */}
            <div className="relative flex h-[400px] w-full items-center justify-center lg:h-[600px]">
              <div className="relative h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-3d.png"
                  alt="Apstraktni 3D geometrijski oblik koji lebdi u tamnom prostoru"
                  className="absolute inset-0 h-full w-full object-contain object-center animate-[float_6s_ease-in-out_infinite]"
                />

                {/* Floating card: Matematička analiza 98.5% */}
                <div className="absolute right-0 top-1/4 animate-[float_7s_ease-in-out_infinite_1s] rounded-xl border-l-4 border-l-banana p-4 glass-card lg:-right-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/20 p-2 text-primary">
                      <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Matematička analiza</p>
                      <p className="font-bold text-white">98.5%</p>
                    </div>
                  </div>
                </div>

                {/* Floating card: Prijem na fakultet Top 1% */}
                <div className="absolute bottom-1/4 left-0 animate-[float_5s_ease-in-out_infinite_0.5s] rounded-xl border-l-4 border-l-primary p-4 glass-card lg:-left-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-banana/20 p-2 text-banana">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Prijem na fakultet</p>
                      <p className="font-bold text-white">Top 1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── The 2000+ Edge ─── */}
      <section id="zadaci" className="relative bg-[#140c08] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 flex max-w-3xl flex-col gap-4 text-center">
            <h2 className="text-5xl font-black text-white">
              The 2000+ Edge
            </h2>
            <p className="text-lg text-slate-400">
              Najobimnija baza rešenih zadataka sa prethodnih prijemnih ispita,
              kategorisana po težini i oblastima.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group glass-card rounded-3xl p-8 transition-transform hover:-translate-y-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ec5b13]/20 text-[#ec5b13]">
                <span className="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Kompletna arhiva</h3>
              <p className="mb-6 leading-relaxed text-slate-400">
                Svi zadaci koji su se pojavili na ETF, FON, RGF, MATF i TMF ispitima u
                poslednjih 20+ godina sa detaljnim rešenjima.
              </p>
              <div className="h-1 w-12 bg-[#ec5b13] transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Card 2 */}
            <div className="group glass-card rounded-3xl p-8 transition-transform hover:-translate-y-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-500">
                <span className="material-symbols-outlined text-3xl">smart_display</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Korak-po-korak</h3>
              <p className="mb-6 leading-relaxed text-slate-400">
                Svaki zadatak poseduje detaljno rešenje i tekstualni postupak sa
                objašnjenjem svakog koraka.
              </p>
              <div className="h-1 w-12 bg-cyan-500 transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Card 3 */}
            <div className="group glass-card rounded-3xl p-8 transition-transform hover:-translate-y-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ec5b13]/20 text-[#ec5b13]">
                <span className="material-symbols-outlined text-3xl">account_tree</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Teorijski podsetnici</h3>
              <p className="mb-6 leading-relaxed text-slate-400">
                Zaboravio si formulu? Jednim klikom otvori teorijski podsetnik
                direktno iz zadatka.
              </p>
              <div className="h-1 w-12 bg-[#ec5b13] transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Roadmap: Put do indeksa ─── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Left: Steps */}
            <div className="lg:w-1/2">
              <h2 className="mb-8 text-5xl font-black text-white">
                Put do indeksa bez{" "}
                <span className="text-[#ec5b13]">gubljenja vremena</span>
              </h2>

              <div className="relative space-y-12">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ec5b13] to-cyan-500" />

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#0a0705] bg-[#ec5b13] font-black text-white">1</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">Dijagnostički test</h4>
                    <p className="text-slate-400">Utvrđujemo tvoje trenutno predznanje i identifikujemo kritične oblasti.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#0a0705] bg-[#ec5b13] font-black text-white">2</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">Personalizovan plan</h4>
                    <p className="text-slate-400">Dobijaš dnevne zadatke i lekcije prilagođene tvom tempu i slobodnom vremenu.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#0a0705] bg-cyan-500 font-black text-white">3</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">Simulacije &amp; Brušenje</h4>
                    <p className="text-slate-400">Radiš realne testove pod pritiskom vremena uz AI analizu svake greške.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#0a0705] bg-cyan-500 font-black text-white">4</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">Dan ispita: Pobeda</h4>
                    <p className="text-slate-400">Izlaziš na ispit pun samopouzdanja, znajući da si prošao sve moguće tipove zadataka.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Progress Track Mockup */}
            <div className="relative lg:w-1/2">
              <div className="glass-card relative z-10 overflow-hidden rounded-[2.5rem] border-white/5 p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                    Live Progress Track
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Algebra &amp; Funkcije</span>
                      <span className="text-xs font-bold text-[#ec5b13]">85% Završeno</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[85%] rounded-full bg-[#ec5b13]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Geometrija &amp; Trigonometrija</span>
                      <span className="text-xs font-bold text-cyan-500">42% Završeno</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[42%] rounded-full bg-cyan-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Kombinatorika &amp; Verovatnoća</span>
                      <span className="text-xs font-bold text-slate-500">Sledeće na redu</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[0%] rounded-full bg-slate-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Theory Vault & Simulation Lab ─── */}
      <section id="teorija" className="bg-[#140c08] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Theory Vault */}
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-[#ec5b13]/20 p-10">
              <div className="relative z-10">
                <h3 className="mb-6 text-3xl font-black text-white">Teorijski kutak</h3>
                <p className="mb-10 leading-relaxed text-slate-400">
                  Pristup elitnoj bazi teorijskih lekcija. Svaka formula,
                  definicija i teorema je objašnjena kroz praktične primere koji
                  se zapravo pojavljuju na testu.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="material-symbols-outlined text-[#ec5b13]">analytics</span>
                    <span className="text-sm font-bold text-white">100+ lekcija</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="material-symbols-outlined text-[#ec5b13]">description</span>
                    <span className="text-sm font-bold text-white">PDF podsetnici</span>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ec5b13]/10 blur-3xl" />
            </div>

            {/* Simulation Lab */}
            <div id="simulacija" className="glass-card relative overflow-hidden rounded-[2.5rem] border-cyan-500/20 p-10">
              <div className="relative z-10">
                <h3 className="mb-6 text-3xl font-black text-white">Simulacija ispita</h3>
                <p className="mb-10 leading-relaxed text-slate-400">
                  Iskusi pravi ispit pre samog ispita. Naš AI Proctor prati
                  tvoj tempo i identifikuje pod kojim oblastima gubiš najviše
                  vremena.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">
                      AI Monitoring Active
                    </span>
                  </div>
                  <Link
                    href="/prijava"
                    className="rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-bold text-white"
                  >
                    Započni probu
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Deep Analytics ─── */}
      <section id="analitika" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-16 text-5xl font-black text-white">Napredna analitika</h2>

          <div className="glass-card rounded-[3rem] border-white/5 p-12">
            <div className="grid items-center gap-12 lg:grid-cols-3">
              {/* Left: Predictions */}
              <div className="space-y-8 text-left">
                <div>
                  <h4 className="mb-2 font-bold text-white">Procena uspeha</h4>
                  <p className="text-sm text-slate-400">
                    Algoritam predviđa tvoj rang na osnovu trenutnih rezultata.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">ETF Beograd</span>
                    <span className="text-sm font-bold text-[#ec5b13]">Umerena šansa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">MATF Beograd</span>
                    <span className="text-sm font-bold text-[#ec5b13]">Umerena šansa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">FON Beograd</span>
                    <span className="text-sm font-bold text-green-400">Visoka šansa (Top 50)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">RGF Beograd</span>
                    <span className="text-sm font-bold text-green-400">Siguran upis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">TMF Beograd</span>
                    <span className="text-sm font-bold text-green-400">Siguran upis</span>
                  </div>
                </div>
              </div>

              {/* Center: Gauge */}
              <div className="relative flex justify-center">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[16px] border-white/5">
                  <div
                    className="absolute inset-0 rounded-full border-[16px] rotate-45"
                    style={{
                      borderTopColor: "#ec5b13",
                      borderRightColor: "#ec5b13",
                      borderLeftColor: "#06b6d4",
                      borderBottomColor: "transparent",
                    }}
                  />
                  <div className="text-center">
                    <span className="block text-5xl font-black text-white">82%</span>
                    <span className="text-xs font-bold uppercase text-slate-500">Spremnost</span>
                  </div>
                </div>
              </div>

              {/* Right: Community */}
              <div className="space-y-6 text-left">
                <h4 className="mb-4 font-bold text-white">Dnevni izazov zajednice</h4>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-[#ec5b13]">workspace_premium</span>
                    <span className="text-sm font-bold text-white">Zadatak Dana</span>
                  </div>
                  <p className="mb-4 text-xs italic text-slate-400">
                    &ldquo;Odredi sve vrednosti parametra k tako da...&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">432 rešilo danas</span>
                    <Link href="/prijava" className="text-xs font-bold text-[#ec5b13]">
                      Reši sad &rarr;
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2">
                  <span className="material-symbols-outlined text-cyan-500">groups</span>
                  <span className="text-xs text-slate-400">
                    Pridruži se grupi kolega koji vežbaju svaki dan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-full -translate-x-1/2 -translate-y-1/2 bg-[#ec5b13]/20 opacity-30 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-6xl font-black text-white md:text-7xl">
            Tvoja{" "}
            <span className="text-[#ec5b13]">budućnost</span>{" "}
            počinje ovde.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-slate-400">
            Ne ostavljaj upis slučaju. Pridruži se stotinama učenika koji
            osvajaju mesta na najboljim srpskim fakultetima.
          </p>

          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/prijava"
              className="rounded-2xl bg-[#ec5b13] px-10 py-5 text-xl font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-all hover:scale-105"
            >
              Započni besplatnu probu
            </Link>
            <Link
              href="/vezbe"
              className="rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-xl font-bold text-white transition-all hover:bg-white/10"
            >
              Svi paketi usluga
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-12 opacity-50 transition-all duration-700 grayscale hover:opacity-100 hover:grayscale-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">school</span>
              <span className="font-bold">ETF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">science</span>
              <span className="font-bold">FON</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">settings</span>
              <span className="font-bold">RGF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">calculate</span>
              <span className="font-bold">MATF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">biotech</span>
              <span className="font-bold">TMF</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 bg-[#140c08] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Matoteka" className="h-8 w-8" />
            <span className="text-lg font-semibold text-white" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              Matoteka
            </span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <span className="cursor-pointer transition-colors hover:text-white">O nama</span>
            <span className="cursor-pointer transition-colors hover:text-white">Kontakt</span>
            <span className="cursor-pointer transition-colors hover:text-white">Uslovi korišćenja</span>
            <span className="cursor-pointer transition-colors hover:text-white">Privatnost</span>
          </div>

          <p className="text-sm text-slate-600">
            &copy; 2025 Matoteka. Sva prava zadržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
