import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Uslovi korišćenja — Matoteka",
    description:
      "Uslovi korišćenja Matoteka platforme za pripremu prijemnog ispita iz matematike.",
    path: "/terms",
  }),
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-black tracking-tight text-heading">
        Uslovi korišćenja
      </h1>
      <p className="mb-12 text-sm text-muted">
        Poslednja izmena: 25. mart 2026.
      </p>

      <div className="space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">1. Prihvatanje uslova</h2>
          <p>
            Korišćenjem platforme Matoteka (u daljem tekstu: &ldquo;Platforma&rdquo;)
            prihvatate ove uslove korišćenja u celosti. Ako se ne slažete sa bilo
            kojim delom ovih uslova, molimo vas da ne koristite Platformu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">2. Opis usluge</h2>
          <p>
            Matoteka je besplatna obrazovna platforma koja pruža pristup bazi
            rešenih matematičkih zadataka sa prijemnih ispita, interaktivnim
            lekcijama, simulacijama ispita i alatima za praćenje napretka.
            Platforma je namenjena učenicima koji se pripremaju za prijemne ispite
            na tehničkim i matematičkim fakultetima u Srbiji i regionu.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">3. Korisnički nalog</h2>
          <p>
            Za pristup svim funkcionalnostima Platforme potrebno je kreirati
            korisnički nalog putem Google prijave ili email/lozinka registracije.
            Odgovorni ste za čuvanje pristupnih podataka svog naloga i za sve
            aktivnosti koje se obavljaju pod vašim nalogom.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">4. Dozvoljeno korišćenje</h2>
          <p>Platforma se sme koristiti isključivo u obrazovne svrhe. Zabranjeno je:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Automatsko preuzimanje sadržaja (scraping) bez prethodne dozvole</li>
            <li>Redistribucija zadataka, rešenja ili lekcija u komercijalne svrhe</li>
            <li>Pokušaj neovlašćenog pristupa sistemima ili podacima drugih korisnika</li>
            <li>Korišćenje Platforme za bilo kakvu nezakonitu aktivnost</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">5. Intelektualna svojina</h2>
          <p>
            Sav sadržaj na Platformi — uključujući zadatke, rešenja, lekcije,
            interaktivne laboratorijume, dizajn i softver — je zaštićen autorskim
            pravima. Zadaci sa prijemnih ispita su javno dostupni dokumenti
            fakulteta, dok su rešenja i pedagoški materijali originalan rad
            Matoteka tima.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">6. Ograničenje odgovornosti</h2>
          <p>
            Platforma se pruža &ldquo;kakva jeste&rdquo; bez garancija bilo koje
            vrste. Ne garantujemo da će korišćenje Platforme rezultirati uspehom
            na prijemnom ispitu. Trudimo se da sadržaj bude tačan, ali ne
            preuzimamo odgovornost za eventualne greške u zadacima ili rešenjima.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">7. Dostupnost usluge</h2>
          <p>
            Zadržavamo pravo da u bilo kom trenutku izmenimo, obustavimo ili
            ukinemo bilo koji deo Platforme bez prethodne najave. Takođe
            zadržavamo pravo da ažuriramo ove uslove korišćenja, pri čemu će
            izmene stupiti na snagu objavljivanjem na ovoj stranici.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">8. Kontakt</h2>
          <p>
            Za sva pitanja u vezi sa ovim uslovima, obratite nam se na:{" "}
            <a href="mailto:support@puzzolve.com" className="text-[#ec5b13] font-semibold hover:text-[#ff7a3d]">
              support@puzzolve.com
            </a>
          </p>
        </section>
      </div>

      <p className="mt-16 text-sm text-muted">
        &copy; 2026 Matoteka. Sva prava zadržana.
      </p>
    </div>
  );
}
