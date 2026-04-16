import Link from "next/link";
import PricingSection from "./pricing-section";

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

              <h1 className="text-5xl font-black leading-[1.1] text-heading md:text-7xl">
                Tvoja ulaznica za{" "}
                <span className="bg-gradient-to-r from-[#ec5b13] to-[#06b6d4] bg-clip-text text-transparent">
                  FAKULTET
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
                Platforma dizajnirana za buduće studente tehničkih i matematičkih fakulteta. Postigni maksimalan
                broj poena na prijemnom uz:
              </p>
              <ul className="max-w-xl space-y-3 text-lg text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ec5b13]" />
                  Personalizovan plan rada
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ec5b13]" />
                  Bazu od preko 4000 detaljno rešenih zadataka sa prijemnih ispita
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ec5b13]" />
                  Celokupnu potrebnu teoriju
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ec5b13]" />
                  Naprednu analitiku i stalnu procenu tvog znanja
                </li>
              </ul>
              <p className="max-w-xl text-base leading-relaxed text-text-secondary">
                Bez traženja zadataka, rešenja ili teorije. Imaš 30 minuta? Svih 30 minuta ide na efektivnu pripremu prijemnog.
              </p>

              <div className="flex flex-row flex-nowrap gap-3 pt-4 sm:gap-4">
                <Link
                  href="/prijava"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ec5b13] px-4 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-all hover:bg-[#ec5b13]/90 sm:flex-initial sm:gap-3 sm:px-8 sm:text-lg"
                >
                  Počni besplatno
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/primer"
                  className="flex flex-1 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-4 py-4 text-base font-bold text-heading transition-all hover:bg-[var(--tint-strong)] sm:flex-initial sm:px-8 sm:text-lg"
                >
                  Pogledaj primer
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-8">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-2xl font-black text-heading">98.4%</span>
                  <span>prosek uspeha</span>
                </div>
                <div className="h-8 w-px bg-[var(--tint-strong)]" />
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-2xl font-black text-heading">4000+</span>
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
                      <p className="text-xs text-text-secondary">Matematička analiza</p>
                      <p className="font-bold text-heading">98.5%</p>
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
                      <p className="text-xs text-text-secondary">Prijem na fakultet</p>
                      <p className="font-bold text-heading">Top 1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── The 4000+ Edge ─── */}
      <section id="zadaci" className="relative bg-surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 flex max-w-3xl flex-col gap-4 text-center">
            <h2 className="text-5xl font-black text-heading">
              The 4000+ Edge
            </h2>
            <p className="text-lg text-text-secondary">
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
              <h3 className="mb-3 text-xl font-bold text-heading">Kompletna arhiva</h3>
              <p className="mb-6 leading-relaxed text-text-secondary">
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
              <h3 className="mb-3 text-xl font-bold text-heading">Korak-po-korak</h3>
              <p className="mb-6 leading-relaxed text-text-secondary">
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
              <h3 className="mb-3 text-xl font-bold text-heading">Teorijski podsetnici</h3>
              <p className="mb-6 leading-relaxed text-text-secondary">
                Zaboravio si formulu? Jednim klikom otvori teorijski podsetnik
                direktno iz zadatka.
              </p>
              <div className="h-1 w-12 bg-[#ec5b13] transition-all duration-500 group-hover:w-full" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/primer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.06] px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/[0.12]"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              Pogledaj primer zadatka
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Roadmap: Put do indeksa ─── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Left: Steps */}
            <div className="lg:w-1/2">
              <h2 className="mb-8 text-5xl font-black text-heading">
                Put do indeksa bez{" "}
                <span className="text-[#ec5b13]">gubljenja vremena</span>
              </h2>

              <div className="relative space-y-12">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ec5b13] to-cyan-500" />

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-[#ec5b13] font-black text-white">1</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-heading">Dijagnostički test</h4>
                    <p className="text-text-secondary">Utvrđujemo tvoje trenutno predznanje i identifikujemo kritične oblasti.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-[#ec5b13] font-black text-white">2</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-heading">Personalizovan plan</h4>
                    <p className="text-text-secondary">Dobijaš dnevne zadatke i lekcije prilagođene tvom tempu i slobodnom vremenu.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-cyan-500 font-black text-heading">3</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-heading">Simulacije &amp; Brušenje</h4>
                    <p className="text-text-secondary">Radiš realne testove pod pritiskom vremena uz AI analizu svake greške.</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-cyan-500 font-black text-heading">4</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-heading">Dan ispita: Pobeda</h4>
                    <p className="text-text-secondary">Izlaziš na ispit pun samopouzdanja, znajući da si prošao sve moguće tipove zadataka.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Progress Track Mockup */}
            <div className="relative lg:w-1/2">
              <div className="glass-card relative z-10 overflow-hidden rounded-[2.5rem] border-[var(--glass-border)] p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted">
                    Live Progress Track
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-heading">Algebra &amp; Funkcije</span>
                      <span className="text-xs font-bold text-[#ec5b13]">85% Završeno</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                      <div className="h-full w-[85%] rounded-full bg-[#ec5b13]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-heading">Geometrija &amp; Trigonometrija</span>
                      <span className="text-xs font-bold text-cyan-500">42% Završeno</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                      <div className="h-full w-[42%] rounded-full bg-cyan-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-heading">Kombinatorika &amp; Verovatnoća</span>
                      <span className="text-xs font-bold text-muted">Sledeće na redu</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--tint)]">
                      <div className="h-full w-[0%] rounded-full bg-slate-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/primer"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-glow"
            >
              Pogledaj kako izgleda rešen zadatak
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Theory Vault ─── */}
      <section id="teorija" className="bg-surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-[#ec5b13]/20 p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ec5b13]/20 bg-[#ec5b13]/10 px-3 py-1">
                  <span className="material-symbols-outlined text-sm text-[#ec5b13]">auto_stories</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ec5b13]">Centar znanja</span>
                </div>
                <h3 className="mb-6 text-4xl font-black text-heading">Teorijski kutak</h3>
                <p className="mb-10 text-lg leading-relaxed text-text-secondary">
                  Pristup elitnoj bazi teorijskih lekcija. Svaka formula,
                  definicija i teorema je objašnjena kroz praktične primere koji
                  se zapravo pojavljuju na testu. Interaktivni laboratorijumi
                  i vežbe na kraju svake lekcije.
                </p>
                <Link
                  href="/znanje"
                  className="mb-10 inline-flex items-center gap-2 rounded-xl bg-[#ec5b13] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#ec5b13]/90"
                >
                  <span className="material-symbols-outlined text-base">auto_stories</span>
                  Istraži lekcije
                </Link>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-3 sm:gap-2 sm:p-4">
                    <span className="material-symbols-outlined text-[#ec5b13]">analytics</span>
                    <span className="text-xs font-bold text-heading break-words sm:text-sm">59 lekcija</span>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-3 sm:gap-2 sm:p-4">
                    <span className="material-symbols-outlined text-[#ec5b13]">science</span>
                    <span className="text-xs font-bold text-heading break-words sm:text-sm">30+ labova</span>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-3 sm:gap-2 sm:p-4">
                    <span className="material-symbols-outlined text-[#ec5b13]">touch_app</span>
                    <span className="text-xs font-bold text-heading break-words sm:text-sm">Interaktivne vežbe</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-2xl">
                  <img
                    src="/screenshots/lekcija.png"
                    alt="Primer interaktivne lekcije o trigonometrijskom obliku kompleksnog broja"
                    className="w-full"
                  />
                </div>
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ec5b13]/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Simulation Lab ─── */}
      <section id="simulacija" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-cyan-500/20 p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-2xl">
                  <img
                    src="/screenshots/simulacija.png"
                    alt="Simulacija prijemnog ispita — konfiguracija testa"
                    className="w-full"
                  />
                </div>
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
              </div>
              <div className="relative z-10 order-1 lg:order-2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">AI Monitoring</span>
                </div>
                <h3 className="mb-6 text-4xl font-black text-heading">Simulacija ispita</h3>
                <p className="mb-10 text-lg leading-relaxed text-text-secondary">
                  Iskusi pravi ispit pre samog ispita. Izaberi fakultet, broj
                  zadataka i vremensko ograničenje. AI Proctor prati tvoj tempo
                  i identifikuje oblasti gde gubiš najviše vremena.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                    <span className="material-symbols-outlined text-cyan-500">timer</span>
                    <span className="text-sm font-bold text-heading">Tajmer</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                    <span className="material-symbols-outlined text-cyan-500">leaderboard</span>
                    <span className="text-sm font-bold text-heading">Rang lista</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                    <span className="material-symbols-outlined text-cyan-500">assessment</span>
                    <span className="text-sm font-bold text-heading">Analiza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Deep Analytics ─── */}
      <section id="analitika" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-16 text-5xl font-black text-heading">Napredna analitika</h2>

          <div className="glass-card rounded-[3rem] border-[var(--glass-border)] p-12">
            <div className="grid items-center gap-12 lg:grid-cols-3">
              {/* Left: Predictions */}
              <div className="space-y-8 text-left">
                <div>
                  <h4 className="mb-2 font-bold text-heading">Procena uspeha</h4>
                  <p className="text-sm text-text-secondary">
                    Algoritam predviđa tvoj rang na osnovu trenutnih rezultata.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">ETF Beograd</span>
                    <span className="text-sm font-bold text-[#ec5b13]">Umerena šansa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">MATF Beograd</span>
                    <span className="text-sm font-bold text-[#ec5b13]">Umerena šansa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">FON Beograd</span>
                    <span className="text-sm font-bold text-green-400">Visoka šansa (Top 50)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">RGF Beograd</span>
                    <span className="text-sm font-bold text-green-400">Siguran upis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">TMF Beograd</span>
                    <span className="text-sm font-bold text-green-400">Siguran upis</span>
                  </div>
                </div>
              </div>

              {/* Center: Gauge */}
              <div className="relative flex justify-center">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[16px] border-[var(--glass-border)]">
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
                    <span className="block text-5xl font-black text-heading">82%</span>
                    <span className="text-xs font-bold uppercase text-muted">Spremnost</span>
                  </div>
                </div>
              </div>

              {/* Right: Community */}
              <div className="space-y-6 text-left">
                <h4 className="mb-4 font-bold text-heading">Dnevni izazov zajednice</h4>
                <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-[#ec5b13]">workspace_premium</span>
                    <span className="text-sm font-bold text-heading">Zadatak Dana</span>
                  </div>
                  <p className="mb-4 text-xs italic text-text-secondary">
                    &ldquo;Odredi sve vrednosti parametra k tako da...&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted">432 rešilo danas</span>
                    <Link href="/prijava" className="text-xs font-bold text-[#ec5b13]">
                      Reši sad &rarr;
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2">
                  <span className="material-symbols-outlined text-cyan-500">groups</span>
                  <span className="text-xs text-text-secondary">
                    Pridruži se grupi kolega koji vežbaju svaki dan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <PricingSection />

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--glass-border)] bg-surface-dark py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo-brain.png" alt="Matoteka" className="h-8 w-8" />
            <span className="text-lg font-semibold text-heading" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
              Matoteka
            </span>
          </div>

          <div className="flex gap-8 text-sm text-muted">
            <Link href="/about" className="transition-colors hover:text-heading">O nama</Link>
            <Link href="/terms" className="transition-colors hover:text-heading">Uslovi korišćenja</Link>
            <Link href="/privacy" className="transition-colors hover:text-heading">Privatnost</Link>
          </div>

          <p className="text-sm text-slate-600">
            &copy; 2026 Matoteka. Sva prava zadržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
