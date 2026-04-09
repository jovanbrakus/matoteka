import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Politika privatnosti — Matoteka",
    description:
      "Politika privatnosti Matoteka platforme — kako prikupljamo, koristimo i štitimo vaše podatke.",
    path: "/privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-black tracking-tight text-heading">
        Politika privatnosti
      </h1>
      <p className="mb-12 text-sm text-muted">
        Poslednja izmena: 25. mart 2026.
      </p>

      <div className="space-y-10 text-text-secondary leading-relaxed">
        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">1. Uvod</h2>
          <p>
            Matoteka (&ldquo;mi&rdquo;, &ldquo;nas&rdquo;, &ldquo;naš&rdquo;)
            poštuje privatnost svojih korisnika. Ova politika privatnosti
            objašnjava koje podatke prikupljamo, kako ih koristimo i kako ih
            štitimo.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">2. Podaci koje prikupljamo</h2>
          <p>Prikupljamo sledeće kategorije podataka:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-heading">Podaci o nalogu:</strong> Email adresa,
              ime i prezime (ako koristite Google prijavu), profilna slika
            </li>
            <li>
              <strong className="text-heading">Podaci o korišćenju:</strong> Rešeni
              zadaci, rezultati simulacija, napredak kroz lekcije, dnevni ciljevi
            </li>
            <li>
              <strong className="text-heading">Tehnički podaci:</strong> Tip uređaja,
              pretraživač, podešavanja teme (svetla/tamna)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">3. Kako koristimo podatke</h2>
          <p>Vaše podatke koristimo isključivo za:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Pružanje i poboljšanje usluge Platforme</li>
            <li>Personalizaciju iskustva učenja (preporuka zadataka, praćenje napretka)</li>
            <li>Generisanje anonimne statistike o korišćenju Platforme</li>
            <li>Komunikaciju sa vama o bitnim promenama usluge</li>
          </ul>
          <p className="mt-3">
            <strong className="text-heading">Ne prodajemo vaše podatke trećim stranama.</strong>{" "}
            Ne šaljemo reklamne emailove. Ne koristimo podatke za ciljano oglašavanje.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">4. Čuvanje podataka</h2>
          <p>
            Podaci se čuvaju na serverima u Evropskoj uniji (Neon PostgreSQL).
            Primenjujemo standardne tehničke i organizacione mere zaštite
            uključujući šifrovanje podataka u prenosu (TLS) i bezbedno čuvanje
            lozinki (bcrypt hash).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">5. Kolačići</h2>
          <p>
            Platforma koristi minimalan broj kolačića neophodnih za rad:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-heading">Sesijski kolačić</strong> — čuva
              podatke o prijavi (authjs.session-token)
            </li>
            <li>
              <strong className="text-heading">CSRF kolačić</strong> — zaštita od
              cross-site request forgery napada (authjs.csrf-token)
            </li>
            <li>
              <strong className="text-heading">Tema</strong> — localStorage
              podešavanje svetle/tamne teme (nije kolačić u tehničkom smislu)
            </li>
          </ul>
          <p className="mt-3">
            Ne koristimo kolačiće za praćenje ili oglašavanje.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">6. Vaša prava</h2>
          <p>Imate pravo da:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Zatražite pristup svim podacima koje čuvamo o vama</li>
            <li>Zatražite ispravku netačnih podataka</li>
            <li>Zatražite brisanje vašeg naloga i svih povezanih podataka</li>
            <li>Povučete saglasnost za obradu podataka u bilo kom trenutku</li>
          </ul>
          <p className="mt-3">
            Za ostvarivanje ovih prava, kontaktirajte nas na email adresu ispod.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">7. Deca</h2>
          <p>
            Platforma je namenjena učenicima srednjih škola (tipično 17-19
            godina). Ne prikupljamo svesno podatke od dece mlađe od 15 godina
            bez saglasnosti roditelja ili staratelja.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">8. Izmene politike</h2>
          <p>
            Zadržavamo pravo da izmenimo ovu politiku privatnosti. Sve izmene
            stupaju na snagu objavljivanjem na ovoj stranici sa ažuriranim
            datumom poslednje izmene.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-heading">9. Kontakt</h2>
          <p>
            Za sva pitanja u vezi sa privatnošću vaših podataka:{" "}
            <a href="mailto:support@matoteka.com" className="text-[#ec5b13] font-semibold hover:text-[#ff7a3d]">
              support@matoteka.com
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
