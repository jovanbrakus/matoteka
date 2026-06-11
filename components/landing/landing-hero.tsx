import Link from "next/link";
import PricingSection from "./pricing-section";
import Reveal from "@/components/ui/reveal";

const FACULTIES = ["ETF", "FON", "MATF", "MAŠF", "GRF", "RGF", "TMF", "SF", "FF"];

const STATS = [
  { value: "5000+", label: "rešenih zadataka" },
  { value: "20+", label: "godina arhive ispita" },
  { value: "59", label: "interaktivnih lekcija" },
  { value: "9", label: "fakulteta pokriveno" },
];

function SectionHeading({
  index,
  title,
  accent,
  subtitle,
}: {
  index: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-3">
        <span className="font-headline text-xs font-bold tracking-[0.3em] text-[#ec5b13]">{index}</span>
        <span className="h-px w-10 bg-[#ec5b13]/40" />
      </div>
      <h2 className="font-headline text-4xl font-bold tracking-tight text-heading md:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-[#ec5b13]">{accent}</span>
          </>
        )}
      </h2>
      {subtitle && <p className="text-lg leading-relaxed text-text-secondary">{subtitle}</p>}
    </div>
  );
}

export default function LandingHero() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* ─── Hero ─── */}
      <header className="relative overflow-hidden pb-20 pt-16 lg:pt-24">
        <div className="noise-overlay" />
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#ec5b13]/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Text */}
            <div className="flex flex-col gap-7">
              <Reveal>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ec5b13]/25 bg-[#ec5b13]/10 px-3.5 py-1.5">
                  <span className="material-symbols-outlined text-sm text-[#ec5b13]">verified</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec5b13]">
                    Priprema za prijemni 2026/27
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-headline text-5xl font-bold leading-[1.05] tracking-tight text-heading sm:text-6xl xl:text-7xl">
                  Tvoja ulaznica
                  <br />
                  za fakultet
                  <span className="text-[#ec5b13]">.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
                  Platforma za buduće studente tehničkih i matematičkih fakulteta.
                  Bez traženja zadataka, rešenja ili teorije — svaki minut ide na
                  efektivnu pripremu.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <ul className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {[
                    "Personalizovan plan rada",
                    "5000+ detaljno rešenih zadataka",
                    "Celokupna potrebna teorija",
                    "Napredna analitika znanja",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <span className="material-symbols-outlined fill-1 text-base text-emerald-500">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={320}>
                <div className="flex flex-row flex-nowrap gap-3 pt-2 sm:gap-4">
                  <Link
                    href="/prijava"
                    className="btn-shine group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ec5b13] px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_14px_40px_-12px_rgba(236,91,19,0.7)] transition-all hover:-translate-y-0.5 hover:brightness-110 sm:flex-initial sm:px-9"
                  >
                    Počni besplatno
                    <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    href="/primer"
                    className="flex flex-1 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--tint)] px-5 py-4 text-sm font-bold text-heading transition-all hover:border-[#ec5b13]/40 hover:bg-[var(--tint-strong)] sm:flex-initial sm:px-9"
                  >
                    Pogledaj primer
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-baseline gap-2 text-sm text-text-secondary">
                    <span className="font-headline text-3xl font-bold tracking-tight text-heading">98.4%</span>
                    <span>prosek uspeha</span>
                  </div>
                  <div className="h-8 w-px bg-[var(--tint-strong)]" />
                  <div className="flex items-baseline gap-2 text-sm text-text-secondary">
                    <span className="font-headline text-3xl font-bold tracking-tight text-heading">5000+</span>
                    <span>rešenih zadataka</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: category art + floating stat chips */}
            <Reveal delay={200} className="relative hidden lg:block">
              <div className="relative h-[560px] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/categories/algebra.png"
                  alt=""
                  aria-hidden
                  className="dark-only absolute inset-0 h-full w-full object-cover opacity-80 animate-[float_8s_ease-in-out_infinite]"
                  style={{
                    maskImage: "radial-gradient(85% 85% at 50% 45%, black 35%, transparent 78%)",
                    WebkitMaskImage: "radial-gradient(85% 85% at 50% 45%, black 35%, transparent 78%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/categories/light/algebra.png"
                  alt=""
                  aria-hidden
                  className="light-only absolute inset-0 h-full w-full object-cover opacity-70 animate-[float_8s_ease-in-out_infinite]"
                  style={{
                    maskImage: "radial-gradient(85% 85% at 50% 45%, black 35%, transparent 78%)",
                    WebkitMaskImage: "radial-gradient(85% 85% at 50% 45%, black 35%, transparent 78%)",
                  }}
                />

                {/* Floating chip: readiness */}
                <div className="glass-card absolute right-0 top-[18%] animate-[float_7s_ease-in-out_infinite_1s] rounded-2xl p-4 xl:-right-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                      <span className="material-symbols-outlined text-xl">analytics</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-secondary">Spremnost za ispit</p>
                      <p className="font-headline text-lg font-bold leading-tight text-heading">82/100</p>
                    </div>
                  </div>
                </div>

                {/* Floating chip: streak */}
                <div className="glass-card absolute bottom-[22%] left-0 animate-[float_6s_ease-in-out_infinite_0.5s] rounded-2xl p-4 xl:-left-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ec5b13]/15 text-[#ec5b13]">
                      <span className="material-symbols-outlined fill-1 text-xl">local_fire_department</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-secondary">Niz učenja</p>
                      <p className="font-headline text-lg font-bold leading-tight text-heading">21 dan</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ─── Faculty marquee ─── */}
      <div className="relative border-y border-[var(--glass-border)] bg-[var(--tint)] py-5">
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="marquee-track items-center gap-14 pr-14">
            {[...FACULTIES, ...FACULTIES, ...FACULTIES, ...FACULTIES].map((f, i) => (
              <span key={`${f}-${i}`} className="flex items-center gap-14">
                <span className="font-headline text-2xl font-bold tracking-tight text-text-secondary/60">
                  {f}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#ec5b13]/50" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
          Zadaci sa prijemnih ispita svih tehničkih fakulteta u Beogradu
        </p>
      </div>

      {/* ─── Stats band ─── */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-headline text-5xl font-bold tracking-tight text-heading md:text-6xl">
                  {s.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 01 Baza zadataka ─── */}
      <section id="zadaci" className="relative bg-surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              index="01"
              title="Baza koja pokriva"
              accent="sve."
              subtitle="Najobimnija kolekcija rešenih zadataka sa prethodnih prijemnih ispita, kategorisana po težini i oblastima."
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "menu_book",
                title: "Kompletna arhiva",
                text: "Svi zadaci koji su se pojavili na ETF, FON, RGF, MATF i TMF ispitima u poslednjih 20+ godina sa detaljnim rešenjima.",
                art: "geometry",
              },
              {
                icon: "smart_display",
                title: "Korak-po-korak",
                text: "Svaki zadatak poseduje detaljno rešenje i tekstualni postupak sa objašnjenjem svakog koraka.",
                art: "analysis",
              },
              {
                icon: "account_tree",
                title: "Teorijski podsetnici",
                text: "Zaboravio si formulu? Jednim klikom otvori teorijski podsetnik direktno iz zadatka.",
                art: "trigonometry",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#ec5b13]/40 hover:shadow-[0_24px_60px_-24px_rgba(236,91,19,0.4)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/categories/${card.art}.png`}
                    alt=""
                    aria-hidden
                    className="dark-only pointer-events-none absolute inset-x-0 bottom-0 h-2/5 w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      maskImage: "linear-gradient(to top, black 20%, transparent 95%)",
                      WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 95%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/categories/light/${card.art}.png`}
                    alt=""
                    aria-hidden
                    className="light-only pointer-events-none absolute inset-x-0 bottom-0 h-2/5 w-full object-cover opacity-15 transition-opacity duration-500 group-hover:opacity-30"
                    style={{
                      maskImage: "linear-gradient(to top, black 20%, transparent 95%)",
                      WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 95%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#ec5b13]/15 p-3 text-[#ec5b13]">
                      <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                    </div>
                    <h3 className="mb-3 font-headline text-xl font-bold text-heading">{card.title}</h3>
                    <p className="mb-8 leading-relaxed text-text-secondary">{card.text}</p>
                    <div className="h-1 w-12 rounded-full bg-[#ec5b13] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/primer"
                className="inline-flex items-center gap-2 rounded-full border border-[#ec5b13]/25 bg-[#ec5b13]/[0.07] px-7 py-3 text-sm font-bold text-[#ec5b13] transition-all hover:bg-[#ec5b13]/[0.14]"
              >
                <span className="material-symbols-outlined text-base">visibility</span>
                Pogledaj primer zadatka
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 02 Metod ─── */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Left: Steps */}
            <div className="lg:w-1/2">
              <Reveal>
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-headline text-xs font-bold tracking-[0.3em] text-[#ec5b13]">02</span>
                  <span className="h-px w-10 bg-[#ec5b13]/40" />
                </div>
                <h2 className="mb-10 font-headline text-4xl font-bold tracking-tight text-heading md:text-5xl">
                  Put do indeksa bez <span className="text-[#ec5b13]">gubljenja vremena</span>
                </h2>
              </Reveal>

              <div className="relative space-y-10">
                <div className="absolute bottom-4 left-6 top-0 w-px bg-gradient-to-b from-[#ec5b13] via-[#ec5b13]/40 to-emerald-500/60" />
                {[
                  { n: "1", title: "Dijagnostički test", text: "Utvrđujemo tvoje trenutno predznanje i identifikujemo kritične oblasti." },
                  { n: "2", title: "Personalizovan plan", text: "Dobijaš dnevne zadatke i lekcije prilagođene tvom tempu i slobodnom vremenu." },
                  { n: "3", title: "Simulacije i brušenje", text: "Radiš realne testove pod pritiskom vremena uz analizu svake greške." },
                  { n: "4", title: "Dan ispita: pobeda", text: "Izlaziš na ispit pun samopouzdanja, znajući da si prošao sve moguće tipove zadataka.", final: true },
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 100}>
                    <div className="relative z-10 flex items-start gap-6">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] font-headline font-bold ${
                          step.final ? "bg-emerald-500 text-white" : "bg-[#ec5b13] text-white"
                        }`}
                      >
                        {step.n}
                      </div>
                      <div>
                        <h4 className="mb-1.5 font-headline text-xl font-bold text-heading">{step.title}</h4>
                        <p className="text-text-secondary">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: real dashboard screenshot */}
            <Reveal delay={150} className="relative lg:w-1/2">
              <div className="glass-card relative z-10 overflow-hidden rounded-3xl p-3 shadow-2xl">
                <div className="mb-3 flex items-center justify-between px-3 pt-1">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Kontrolna tabla
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screenshots/kontrolna-tabla.png"
                  alt="Kontrolna tabla — spremnost za ispit, odbrojavanje i fokus oblasti"
                  className="w-full rounded-2xl border border-[var(--glass-border)]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#ec5b13]/15 blur-[100px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 03 Teorija ─── */}
      <section id="teorija" className="bg-surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-[#ec5b13]/15 p-10 lg:p-14">
              <div className="noise-overlay" />
              <div className="relative grid items-center gap-12 lg:grid-cols-2">
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-headline text-xs font-bold tracking-[0.3em] text-[#ec5b13]">03</span>
                    <span className="h-px w-10 bg-[#ec5b13]/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Centar znanja</span>
                  </div>
                  <h3 className="mb-6 font-headline text-3xl font-bold tracking-tight text-heading md:text-4xl">
                    Teorijski kutak
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                    Svaka formula, definicija i teorema objašnjena kroz praktične
                    primere koji se zapravo pojavljuju na testu. Interaktivni
                    laboratorijumi i vežbe na kraju svake lekcije.
                  </p>
                  <Link
                    href="/znanje"
                    className="btn-shine mb-10 inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-7 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
                  >
                    <span className="material-symbols-outlined text-base">auto_stories</span>
                    Istraži lekcije
                  </Link>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {[
                      ["analytics", "59 lekcija"],
                      ["science", "30+ labova"],
                      ["touch_app", "Interaktivne vežbe"],
                    ].map(([icon, label]) => (
                      <div key={label} className="flex flex-col gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-3 sm:gap-2 sm:p-4">
                        <span className="material-symbols-outlined text-[#ec5b13]">{icon}</span>
                        <span className="break-words text-xs font-bold text-heading sm:text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
          </Reveal>
        </div>
      </section>

      {/* ─── 04 Simulacija ─── */}
      <section id="simulacija" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] border-[var(--glass-border)] p-10 lg:p-14">
              <div className="noise-overlay" />
              <div className="relative grid items-center gap-12 lg:grid-cols-2">
                <div className="relative order-2 lg:order-1">
                  <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/screenshots/simulacija.png"
                      alt="Simulacija prijemnog ispita — konfiguracija testa"
                      className="w-full"
                    />
                  </div>
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#ec5b13]/10 blur-3xl" />
                </div>
                <div className="relative z-10 order-1 lg:order-2">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-headline text-xs font-bold tracking-[0.3em] text-[#ec5b13]">04</span>
                    <span className="h-px w-10 bg-[#ec5b13]/40" />
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      Realni uslovi
                    </span>
                  </div>
                  <h3 className="mb-6 font-headline text-3xl font-bold tracking-tight text-heading md:text-4xl">
                    Simulacija ispita
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                    Iskusi pravi ispit pre samog ispita. Izaberi broj zadataka i
                    vremensko ograničenje — pametni proktor prati tvoj tempo i
                    identifikuje oblasti gde gubiš najviše vremena.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      ["timer", "Tajmer"],
                      ["leaderboard", "Rang lista"],
                      ["assessment", "Analiza"],
                    ].map(([icon, label]) => (
                      <div key={label} className="flex flex-col gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-4">
                        <span className="material-symbols-outlined text-[#ec5b13]">{icon}</span>
                        <span className="text-sm font-bold text-heading">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 05 Analitika ─── */}
      <section id="analitika" className="relative bg-surface-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              index="05"
              title="Napredna"
              accent="analitika."
              subtitle="Svaki rešeni zadatak hrani model koji u svakom trenutku zna gde stojiš — i šta ti najviše podiže šanse za upis."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-10 lg:p-12">
              <div className="noise-overlay" />
              <div className="relative grid items-center gap-12 lg:grid-cols-3">
                {/* Left: Predictions */}
                <div className="space-y-7 text-left">
                  <div>
                    <h4 className="mb-2 font-headline text-lg font-bold text-heading">Procena uspeha</h4>
                    <p className="text-sm text-text-secondary">
                      Algoritam predviđa tvoj rang na osnovu trenutnih rezultata.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      ["ETF Beograd", "Umerena šansa", "#f59e0b"],
                      ["MATF Beograd", "Umerena šansa", "#f59e0b"],
                      ["FON Beograd", "Visoka šansa (Top 50)", "#10b981"],
                      ["RGF Beograd", "Siguran upis", "#10b981"],
                      ["TMF Beograd", "Siguran upis", "#10b981"],
                    ].map(([fac, label, color]) => (
                      <div key={fac} className="flex items-center justify-between gap-3">
                        <span className="text-sm text-text">{fac}</span>
                        <span
                          className="whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold"
                          style={{ color, borderColor: `${color}33`, background: `${color}14` }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center: Gauge */}
                <div className="relative flex justify-center">
                  <div className="relative flex h-60 w-60 items-center justify-center rounded-full">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 220deg, #ec5b13 0deg, #f59e0b 160deg, #10b981 250deg, transparent 250deg)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 16px), black calc(100% - 15px))",
                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 16px), black calc(100% - 15px))",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{
                        background: "var(--tint-strong)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 16px), black calc(100% - 15px))",
                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 16px), black calc(100% - 15px))",
                      }}
                    />
                    <div className="text-center">
                      <span className="block font-headline text-6xl font-bold tracking-tight text-heading">82</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">Spremnost</span>
                    </div>
                  </div>
                </div>

                {/* Right: Community */}
                <div className="space-y-6 text-left">
                  <h4 className="font-headline text-lg font-bold text-heading">Dnevni izazov zajednice</h4>
                  <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-[#ec5b13]">workspace_premium</span>
                      <span className="text-sm font-bold text-heading">Zadatak dana</span>
                    </div>
                    <p className="mb-4 text-xs italic text-text-secondary">
                      &ldquo;Odredi sve vrednosti parametra k tako da...&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted">432 rešilo danas</span>
                      <Link href="/prijava" className="text-xs font-bold text-[#ec5b13] transition-colors hover:text-[#ff7a3d]">
                        Reši sad &rarr;
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-2">
                    <span className="material-symbols-outlined text-[#ec5b13]">groups</span>
                    <span className="text-xs text-text-secondary">
                      Pridruži se grupi kolega koji vežbaju svaki dan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Pricing / Final CTA ─── */}
      <PricingSection />

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--glass-border)] bg-surface-dark py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-brain.png" alt="Matoteka" className="h-8 w-8" />
            <span className="text-lg font-semibold text-heading" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>
              Matoteka
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted">
            <Link href="/about" className="transition-colors hover:text-heading">O nama</Link>
            <Link href="/kako-se-pripremiti-za-prijemni-iz-matematike" className="transition-colors hover:text-heading">Priprema za prijemni</Link>
            <Link href="/terms" className="transition-colors hover:text-heading">Uslovi korišćenja</Link>
            <Link href="/privacy" className="transition-colors hover:text-heading">Privatnost</Link>
          </div>

          <p className="text-sm text-muted">
            &copy; 2026 Matoteka. Sva prava zadržana.
          </p>
        </div>
      </footer>
    </div>
  );
}
