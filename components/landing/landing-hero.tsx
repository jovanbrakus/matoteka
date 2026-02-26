import Link from "next/link";
import Image from "next/image";

export default function LandingHero() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-banana/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mx-auto lg:mx-0 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-banana animate-pulse" />
                <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                  TataMata 2025/2026
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Osvoji <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  prijemni ispit
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Najpametniji način za pripremu prijemnog ispita iz matematike na
                ETF, FON i RGF. Uz AI tutora, dizajnirano za vrhunske rezultate.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/prijava"
                  className="bg-primary hover:bg-blue-600 text-white h-12 px-8 rounded-lg text-base font-bold transition-all shadow-[0_0_20px_rgba(19,91,236,0.4)] hover:shadow-[0_0_30px_rgba(19,91,236,0.6)] flex items-center justify-center gap-2"
                >
                  Počni besplatno
                </Link>
                <Link
                  href="/zadaci"
                  className="glass-card hover:bg-white/10 text-white h-12 px-8 rounded-lg text-base font-medium transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-banana group-hover:rotate-12 transition-transform">
                    play_circle
                  </span>
                  Pogledaj zadatke
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-banana text-lg">
                    check_circle
                  </span>
                  <span>1000+ zadataka</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-banana text-lg">
                    check_circle
                  </span>
                  <span>AI Tutor 24/7</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
              {/* Abstract 3D shape container */}
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-3d.png"
                  alt="Apstraktni 3D geometrijski oblik koji lebdi u tamnom prostoru sa plavim i neonskim osvetljenjem"
                  className="absolute inset-0 w-full h-full object-contain object-center animate-[float_6s_ease-in-out_infinite]"
                />

                {/* Floating glass cards overlaid */}
                <div className="absolute top-1/4 right-0 lg:-right-8 p-4 glass-card rounded-xl border-l-4 border-l-banana animate-[float_7s_ease-in-out_infinite_1s]">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                      <span className="material-symbols-outlined">
                        analytics
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        Matematička analiza
                      </p>
                      <p className="text-white font-bold">98.5%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 left-0 lg:-left-8 p-4 glass-card rounded-xl border-l-4 border-l-primary animate-[float_5s_ease-in-out_infinite_0.5s]">
                  <div className="flex items-center gap-3">
                    <div className="bg-banana/20 p-2 rounded-lg text-banana">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Prijem na fakultet</p>
                      <p className="text-white font-bold">Top 1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-white/5 bg-surface-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "600+", label: "Rešenih zadataka" },
              { value: "5+", label: "Fakulteta" },
              { value: "24/7", label: "AI Tutor podrška" },
              { value: "Top 3", label: "Ciljana fakulteta" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">
              Funkcionalnosti
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pokreće AI,{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-banana to-emerald-400">
                dizajnirano za uspeh
              </span>
            </h3>
            <p className="text-slate-400 text-lg">
              Budućnost pripreme za prijemni ispit — napredni alati prilagođeni
              srpskom nastavnom programu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
              <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">
                  model_training
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Rešeni zadaci
              </h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Uroni u analizu, algebru i geometriju sa zadacima koji prate
                tvoj nivo znanja.
              </p>
              <Link
                href="/zadaci"
                className="inline-flex items-center text-primary font-semibold hover:text-banana transition-colors"
              >
                Pregledaj zadatke{" "}
                <span className="material-symbols-outlined text-sm ml-1">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Feature 2 - highlighted */}
            <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-all group relative overflow-hidden border-t-4 border-t-banana">
              <div className="absolute top-0 right-0 w-32 h-32 bg-banana/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-banana/20 transition-all" />
              <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-banana/50 transition-colors">
                <span className="material-symbols-outlined text-3xl text-banana">
                  psychology
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">AI Tutor</h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Trenutna pomoć korak po korak za svaku jednačinu. Dostupan 24/7
                da odgovori na sva tvoja pitanja.
              </p>
              <Link
                href="/ai"
                className="inline-flex items-center text-banana font-semibold hover:text-white transition-colors"
              >
                Probaj AI Tutora{" "}
                <span className="material-symbols-outlined text-sm ml-1">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
              <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">
                  timer
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Probni ispiti
              </h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                Simuliraj pravi prijemni na Univerzitetu u Beogradu sa tajmerom,
                prošlim testovima i predviđenim pitanjima.
              </p>
              <Link
                href="/ispit"
                className="inline-flex items-center text-primary font-semibold hover:text-banana transition-colors"
              >
                Pogledaj testove{" "}
                <span className="material-symbols-outlined text-sm ml-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-surface-dark/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Dashboard Mockup */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1e293b] aspect-video group">
                {/* Header of Mockup */}
                <div className="h-8 bg-[#0f172a] flex items-center px-4 gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* Body of Mockup */}
                <div className="p-6 grid grid-cols-3 gap-4 h-full">
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 rounded bg-white/5 animate-pulse" />
                    <div className="h-24 rounded bg-white/5" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-20 rounded bg-primary/20 border border-primary/30" />
                    <div className="h-20 rounded bg-white/5" />
                    <div className="h-16 rounded bg-white/5" />
                  </div>
                </div>
                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <span className="bg-banana text-black font-bold py-3 px-6 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    Pogledaj analitiku
                  </span>
                </div>
              </div>
              {/* Decorative glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-banana opacity-20 blur-xl -z-10 rounded-xl" />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-banana" />
                <span className="text-banana font-medium uppercase tracking-wider text-xs">
                  Analitika
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prati napredak sa hiruškom preciznošću.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                      show_chart
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      Uvid u performanse
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">
                      Vizualizuj svoje prednosti i slabosti kroz svaku
                      matematičku oblast.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                      target
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      Praćenje ciljeva
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">
                      Postavi ciljni fakultet i pusti AI da napravi tvoj plan
                      učenja.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                      history_edu
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      Istorija ispita
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">
                      Pregledaj prethodne pokušaje i uči iz grešaka sa
                      detaljnim rešenjima.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Jednostavne, transparentne cene
            </h2>
            <p className="text-slate-400">Uloži u svoju budućnost danas.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Plan */}
            <div className="glass-card rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-slate-300">
                  Samostalno
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">€49</span>
                  <span className="ml-2 text-slate-500">/mesečno</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  Savršeno za disciplinovane učenike.
                </p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary mr-2 text-lg">
                    check
                  </span>{" "}
                  Pristup svim zadacima
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary mr-2 text-lg">
                    check
                  </span>{" "}
                  1000+ zadataka sa rešenjima
                </li>
                <li className="flex items-center text-slate-300 text-sm">
                  <span className="material-symbols-outlined text-primary mr-2 text-lg">
                    check
                  </span>{" "}
                  Osnovno praćenje napretka
                </li>
              </ul>
              <Link
                href="/prijava"
                className="w-full py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-center"
              >
                Počni sa učenjem
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl p-8 flex flex-col bg-surface-dark border border-primary shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 bg-banana text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULARNO
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-medium text-white">
                  TataMata <span className="text-[#a3e635]">Pro</span>
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">€89</span>
                  <span className="ml-2 text-slate-500">/mesečno</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  Maksimalna podrška za najbolje rezultate.
                </p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-white text-sm">
                  <span className="material-symbols-outlined text-banana mr-2 text-lg">
                    check_circle
                  </span>{" "}
                  Neograničen pristup AI Tutoru
                </li>
                <li className="flex items-center text-white text-sm">
                  <span className="material-symbols-outlined text-banana mr-2 text-lg">
                    check_circle
                  </span>{" "}
                  10 kompletnih probnih ispita
                </li>
                <li className="flex items-center text-white text-sm">
                  <span className="material-symbols-outlined text-banana mr-2 text-lg">
                    check_circle
                  </span>{" "}
                  Detaljna analitika i predikcije
                </li>
                <li className="flex items-center text-white text-sm">
                  <span className="material-symbols-outlined text-banana mr-2 text-lg">
                    check_circle
                  </span>{" "}
                  Prioritetna podrška
                </li>
              </ul>
              <Link
                href="/prijava"
                className="w-full py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold transition-all shadow-lg hover:shadow-primary/50 text-center"
              >
                Aktiviraj Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-white/5 bg-[#0d121c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">
            Zadaci sa prijemnih ispita
          </p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="material-symbols-outlined text-3xl">
                account_balance
              </span>{" "}
              Univerzitet u Beogradu
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="material-symbols-outlined text-3xl">
                science
              </span>{" "}
              ETF
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="material-symbols-outlined text-3xl">
                computer
              </span>{" "}
              FON
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <span className="material-symbols-outlined text-3xl">
                calculate
              </span>{" "}
              MATF
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle,rgba(19,91,236,0.3),transparent)] blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Spreman da osvojiš prijemni?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Pridruži se stotinama učenika koji osvajaju mesta na najboljim
            srpskim fakultetima. Počni put ka uspehu danas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prijava"
              className="bg-banana hover:bg-[#b3e600] text-slate-900 h-14 px-10 rounded-lg text-lg font-bold transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] flex items-center justify-center gap-2"
            >
              Kreni besplatno
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/zadaci"
              className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white h-14 px-10 rounded-lg text-lg font-medium transition-all flex items-center justify-center"
            >
              Pregledaj zadatke
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo-56.png"
                  alt="TataMata"
                  width={24}
                  height={24}
                />
                <span className="text-white text-lg font-bold">
                  TataMata
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                #1 AI platforma za pripremu prijemnog ispita iz matematike na
                Univerzitetu u Beogradu.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platforma</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="/zadaci"
                    className="hover:text-primary transition-colors"
                  >
                    Zadaci
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai"
                    className="hover:text-primary transition-colors"
                  >
                    AI Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ispit"
                    className="hover:text-primary transition-colors"
                  >
                    Probni ispiti
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rang-lista"
                    className="hover:text-primary transition-colors"
                  >
                    Rang lista
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Fakulteti</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <span className="hover:text-primary transition-colors">
                    Elektrotehnički (ETF)
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors">
                    Organizacionih nauka (FON)
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors">
                    Rudarsko-geološki (RGF)
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors">
                    Matematički (MATF)
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Informacije</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <span className="hover:text-primary transition-colors">
                    Politika privatnosti
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors">
                    Uslovi korišćenja
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary transition-colors">
                    Kolačići
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">
              © 2025 TataMata. Sva prava zadržana.
            </p>
            <div className="flex gap-4">
              <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </span>
              <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
