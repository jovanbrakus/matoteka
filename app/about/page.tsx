import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama — Matoteka",
  description: "Saznaj više o Matoteka platformi za pripremu prijemnog ispita iz matematike.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-black tracking-tight text-heading lg:text-5xl">
        O <span className="text-[#ec5b13]">Matoteka</span> platformi
      </h1>

      <p className="mb-12 text-lg leading-relaxed text-text-secondary">
        Matoteka je besplatna platforma za pripremu prijemnog ispita iz
        matematike, dizajnirana za buduće studente tehničkih i matematičkih
        fakulteta u Srbiji i regionu.
      </p>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-heading">Naša misija</h2>
        <p className="leading-relaxed text-text-secondary">
          Verujemo da kvalitetna priprema za prijemni ispit ne treba da zavisi
          od toga koliko privatnih časova možeš da priuštiš. Naš cilj je da
          svakom učeniku omogućimo pristup strukturiranom gradivu, realnim
          zadacima sa prijemnih ispita i alatima za praćenje napretka — potpuno
          besplatno.
        </p>
      </section>

      {/* Tagline */}
      <section className="mb-12 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-8 text-center">
        <p className="text-2xl font-black text-heading">
          Uči. Vežbaj. <span className="text-[#ec5b13]">Položi.</span>
        </p>
        <p className="mt-3 text-text-secondary">
          Svaka lekcija gradi razumevanje, svaki zadatak gradi rutinu, svaka
          simulacija gradi samopouzdanje za dan ispita.
        </p>
      </section>

      {/* What we offer */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-heading">Šta nudimo</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: "menu_book", text: "4000+ rešenih zadataka sa prijemnih ispita" },
            { icon: "auto_stories", text: "59 interaktivnih lekcija sa laboratorijumima" },
            { icon: "quiz", text: "Simulacija ispita sa tajmerom i analizom" },
            { icon: "analytics", text: "Praćenje napretka i personalizovana statistika" },
            { icon: "devices", text: "Radi na svim uređajima — telefon, tablet, računar" },
            { icon: "lock_open", text: "Besplatno, bez skrivenih troškova" },
          ].map((item) => (
            <div
              key={item.icon}
              className="flex items-start gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4"
            >
              <span className="material-symbols-outlined mt-0.5 text-[#ec5b13]">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-text">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Faculties */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-heading">Fakulteti</h2>
        <p className="leading-relaxed text-text-secondary">
          Baza zadataka pokriva prijemne ispite sa tehničkih i matematičkih
          fakulteta Univerziteta u Beogradu: ETF, MATF, FON, Mašinski,
          Građevinski, RGF, TMF, Saobraćajni i Fizički fakultet — sa zadacima
          od 2003. do 2025. godine.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-heading">Kontakt</h2>
        <p className="leading-relaxed text-text-secondary">
          Za pitanja, predloge ili prijavu grešaka, piši nam na:
        </p>
        <a
          href="mailto:support@puzzolve.com"
          className="mt-3 inline-flex items-center gap-2 text-[#ec5b13] font-semibold transition-colors hover:text-[#ff7a3d]"
        >
          <span className="material-symbols-outlined text-base">mail</span>
          support@puzzolve.com
        </a>
      </section>

      <p className="text-sm text-muted">
        &copy; 2026 Matoteka. Sva prava zadržana.
      </p>
    </div>
  );
}
