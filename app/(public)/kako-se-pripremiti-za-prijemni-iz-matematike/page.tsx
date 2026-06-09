import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  createMetadata,
  serializeJsonLd,
  absoluteUrl,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";
import { getLessonCategories, getLessonsByCategory } from "@/lib/lessons";

const PATH = "/kako-se-pripremiti-za-prijemni-iz-matematike";
const PUBLISHED = "2026-06-09";
const MODIFIED = "2026-06-09";

/** Returns the public path for a generated blog image, or null if it hasn't
 * been generated yet (so the page degrades gracefully before the Nano Banana
 * Pro script is run). Runs server-side at build/render time. */
function blogImg(file: string): string | null {
  const abs = path.join(process.cwd(), "public", "images", "blog", file);
  return fs.existsSync(abs) ? `/images/blog/${file}` : null;
}

const HERO_IMG = blogImg("hero.png");
const PLAN_IMG = blogImg("plan.png");
const VEZBANJE_IMG = blogImg("vezbanje.png");
const DAN_ISPITA_IMG = blogImg("dan-ispita.png");
const OG_IMG = blogImg("priprema-og.png");

const TITLE = "Priprema za prijemni iz matematike — kako se pripremiti | Matoteka";
const DESCRIPTION =
  "Kompletan vodič za pripremu prijemnog ispita iz matematike za fakultet: kada početi, plan učenja korak po korak, gradivo po oblastima, kako vežbati i najčešće greške.";

export const metadata: Metadata = {
  ...createMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    openGraphType: "article",
    images: OG_IMG
      ? [
          {
            url: OG_IMG,
            width: 1200,
            height: 675,
            alt: "Priprema za prijemni iz matematike — Matoteka",
          },
        ]
      : undefined,
    keywords: [
      "priprema za prijemni",
      "priprema za prijemni iz matematike",
      "prijemni iz matematike",
      "prijemni iz matematike za fakultet",
      "kako se pripremiti za prijemni",
      "kako se pripremiti za prijemni iz matematike",
      "prijemni ispit iz matematike",
      "plan učenja za prijemni",
      "gradivo za prijemni iz matematike",
      "vežbe za prijemni iz matematike",
      "prijemni matematika ETF",
      "prijemni matematika FTN",
      "prijemni matematika PMF",
      "prijemni matematika FON",
      "prijemni matematika MATF",
      "prijemni matematika Beograd",
      "prijemni matematika Novi Sad",
    ],
  }),
};

const TOC = [
  { id: "sta-je", label: "Šta je prijemni iz matematike" },
  { id: "kada", label: "Kada početi sa pripremom" },
  { id: "plan", label: "Plan pripreme korak po korak" },
  { id: "oblasti", label: "Koje oblasti treba savladati" },
  { id: "vezbanje", label: "Kako efikasno vežbati" },
  { id: "greske", label: "Najčešće greške" },
  { id: "dan-ispita", label: "Saveti za dan ispita" },
  { id: "faq", label: "Česta pitanja" },
];

const PLAN_STEPS = [
  {
    icon: "explore",
    title: "1. Dijagnostika — gde si sada",
    body: "Uradi jedan ceo prijemni iz prethodne godine bez pripreme. Cilj nije ocena, nego mapa: koje oblasti ti idu, a koje te koče. Sve počinje od iskrene slike trenutnog znanja.",
  },
  {
    icon: "menu_book",
    title: "2. Teorija — popuni rupe",
    body: "Za svaku slabu oblast prođi teoriju i rešene primere pre nego što kreneš da rešavaš samostalno. Razumevanje definicija i formula je temelj — bubanje bez razumevanja puca na prvom netipičnom zadatku.",
  },
  {
    icon: "fitness_center",
    title: "3. Vežbanje po oblastima",
    body: "Rešavaj zadatke grupisane po temama dok ti tip zadatka ne pređe u rutinu. Prvo tačnost, pa tek onda brzina. Ovde se gradi najveći deo bodova.",
  },
  {
    icon: "history_edu",
    title: "4. Prijemni iz prethodnih godina",
    body: "Pređi prijemne iz poslednjih 10+ godina sa fakulteta koji ti je cilj. Zadaci se iz godine u godinu ponavljaju po tipu — prepoznavanje obrasca ti štedi dragocene minute na ispitu.",
  },
  {
    icon: "timer",
    title: "5. Simulacije pod tajmerom",
    body: "Poslednjih nedelja radi cele prijemne u realnom vremenu, bez prekida. Tako treniraš tempo, raspodelu vremena i izdržljivost koncentracije — veštine koje se ne vide dok ne sedneš pred ceo test.",
  },
  {
    icon: "checklist",
    title: "6. Finalna provera",
    body: "Pred sam ispit vrati se samo na greške koje si ponavljao i na ključne formule. Bez učenja novog gradiva u zadnji čas — fokus je na sigurnosti i odmoru.",
  },
];

const MISTAKES = [
  "Učenje napamet bez razumevanja — netipičan zadatak odmah obori takvu pripremu.",
  "Preskakanje teorije i skok pravo na teške zadatke pre nego što se savlada osnova.",
  "Rešavanje samo onoga što se već zna, a izbegavanje slabih oblasti.",
  "Nikad ne raditi pod tajmerom, pa na ispitu ponestane vremena.",
  "Ne analizirati greške — ista greška se ponavlja jer se nikad nije razložila.",
  "Početak pripreme prekasno, pa sve pada na poslednje dve nedelje stresa.",
];

const EXAM_DAY = [
  "Naspavaj se — odmoran mozak rešava brže od umornog koji je „učio do zore”.",
  "Prvo prođi ceo test i reši zadatke koje odmah znaš; teške ostavi za drugi krug.",
  "Pažljivo pročitaj svaki zadatak do kraja — pola grešaka je u pogrešno pročitanom uslovu.",
  "Raspodeli vreme i ne zaglavljuj se: ako zadatak ne ide za par minuta, idi dalje pa se vrati.",
  "Proveri račun i prepiši konačan odgovor tačno onako kako se traži.",
];

const FAQ = [
  {
    q: "Kako se pripremiti za prijemni iz matematike?",
    a: "Pripremu počni dijagnostikom trenutnog znanja, zatim popuni rupe u teoriji, vežbaj zadatke grupisane po oblastima, pređi prijemne iz prethodnih godina i poslednjih nedelja radi simulacije celog ispita pod tajmerom. Ključ je redovnost i analiza svake greške, a ne učenje u poslednji čas.",
  },
  {
    q: "Kada treba početi sa pripremom za prijemni?",
    a: "Idealno 4 do 6 meseci pre ispita, sa 3–5 sati nedeljno na početku i pojačavanjem u poslednja dva meseca. Ako kasniš, intenzivan plan od 6–8 nedelja sa fokusom na najčešće tipove zadataka i prijemne iz prethodnih godina i dalje daje rezultat.",
  },
  {
    q: "Koje oblasti se najčešće pojavljuju na prijemnom iz matematike?",
    a: "Najčešće su algebra, jednačine i nejednačine, funkcije, trigonometrija, geometrija i osnove analize (nizovi, granične vrednosti). Tačan obim zavisi od fakulteta, ali se gradivo većine tehničkih i matematičkih fakulteta u velikoj meri preklapa.",
  },
  {
    q: "Da li je priprema za prijemni iz matematike ista za ETF, FTN, PMF i FON?",
    a: "Principi pripreme su isti za svaki fakultet — razlikuju se težina i naglasak na pojedinim oblastima. Zato je najpametnije savladati zajedničko gradivo, a onda dodatno vežbati na prijemnima baš onog fakulteta koji ti je cilj.",
  },
  {
    q: "Koliko zadataka treba uraditi da bih bio spreman?",
    a: "Nema magičnog broja, ali pravilo je: svaki tip zadatka treba da ti pređe u rutinu. To u praksi znači više stotina rešenih zadataka raspoređenih kroz sve oblasti, uz obavezne prijemne iz prethodnih godina pod realnim uslovima.",
  },
  {
    q: "Da li mogu sam da se pripremim za prijemni iz matematike?",
    a: "Da. Uz strukturisan plan, kvalitetnu zbirku rešenih zadataka, teoriju i simulacije ispita, samostalna priprema je potpuno izvodljiva. Matoteka je napravljena upravo za to — besplatno i na jednom mestu.",
  },
];

export default function PripremaZaPrijemniPage() {
  const categories = getLessonCategories();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}${PATH}#article`,
        headline: "Kako se pripremiti za prijemni iz matematike",
        description: DESCRIPTION,
        inLanguage: "sr-RS",
        image: OG_IMG ? [absoluteUrl(OG_IMG)] : [absoluteUrl("/images/og/default.jpg")],
        datePublished: PUBLISHED,
        dateModified: MODIFIED,
        author: { "@id": `${SITE_URL}#organization` },
        publisher: { "@id": `${SITE_URL}#organization` },
        isPartOf: { "@id": `${SITE_URL}#website` },
        mainEntityOfPage: absoluteUrl(PATH),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${PATH}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Početna",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Priprema za prijemni iz matematike",
            item: absoluteUrl(PATH),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${PATH}#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Putanja"
          className="mb-8 flex items-center gap-2 text-sm text-muted"
        >
          <Link href="/" className="transition-colors hover:text-heading">
            Početna
          </Link>
          <span className="material-symbols-outlined text-base">
            chevron_right
          </span>
          <span className="text-text-secondary">
            Priprema za prijemni iz matematike
          </span>
        </nav>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-black tracking-tight text-heading lg:text-5xl">
          Kako se pripremiti za{" "}
          <span className="text-[#ec5b13]">prijemni iz matematike</span>
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-text-secondary">
          <strong className="font-semibold text-text">
            Priprema za prijemni iz matematike za fakultet
          </strong>{" "}
          ne mora da bude haos od fotokopija i panike u poslednji čas. U ovom
          vodiču dobijaš jasan plan — kada da počneš, šta da učiš, kako da
          vežbaš i koje greške da izbegneš — bez obzira da li spremaš ETF, FTN,
          PMF, FON, MATF ili neki drugi tehnički ili matematički fakultet.
        </p>

        {HERO_IMG && (
          <img
            src={HERO_IMG}
            alt="Priprema za prijemni ispit iz matematike — učenik uči matematiku"
            width={1280}
            height={720}
            loading="eager"
            className="mb-12 h-auto w-full rounded-2xl border border-[var(--glass-border)]"
          />
        )}

        {/* Table of contents */}
        <nav
          aria-label="Sadržaj"
          className="mb-14 rounded-2xl border border-[var(--glass-border)] bg-[var(--tint)] p-6"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
            Sadržaj
          </p>
          <ol className="grid gap-2 sm:grid-cols-2">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-text-secondary transition-colors hover:text-[#ec5b13]"
                >
                  <span className="material-symbols-outlined text-base text-[#ec5b13]">
                    arrow_forward
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1. What is it */}
        <section id="sta-je" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Šta je prijemni ispit iz matematike
          </h2>
          <p className="mb-4 leading-relaxed text-text-secondary">
            Prijemni ispit iz matematike je kvalifikacioni test koji polažeš pri
            upisu na tehničke i matematičke fakultete. Sastoji se od zadataka
            koje rešavaš u ograničenom vremenu, a broj osvojenih bodova direktno
            određuje tvoje mesto na rang-listi za upis.
          </p>
          <p className="leading-relaxed text-text-secondary">
            Gradivo pokriva srednjoškolsku matematiku, ali su zadaci često
            zahtevniji i traže kombinovanje više oblasti u jednom rešenju. Zbog
            toga ciljana priprema za prijemni iz matematike pravi ogromnu razliku
            — ne uči se „sve iznova”, nego se uvežbavaju tipovi zadataka koji se
            zaista pojavljuju.
          </p>
        </section>

        {/* 2. When to start */}
        <section id="kada" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Kada početi sa pripremom za prijemni
          </h2>
          <p className="mb-6 leading-relaxed text-text-secondary">
            Što ranije — ali nikad nije kasno. Najbolji rezultati dolaze iz
            redovnog rada tokom više meseci, a ne iz maratonskog učenja u
            poslednje dve nedelje.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                tag: "6+ meseci",
                text: "Idealno: 3–5 sati nedeljno, opušteno savladavanje oblasti redom.",
              },
              {
                tag: "2–3 meseca",
                text: "Realno: intenzivnije vežbanje, fokus na slabe tačke i stare prijemne.",
              },
              {
                tag: "6–8 nedelja",
                text: "Kasni start: udarni plan na najčešće tipove zadataka i simulacije.",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-5"
              >
                <p className="mb-2 text-lg font-black text-[#ec5b13]">
                  {item.tag}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Step-by-step plan */}
        <section id="plan" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Plan pripreme za prijemni korak po korak
          </h2>
          <p className="mb-6 leading-relaxed text-text-secondary">
            Dobra priprema je proces sa jasnim redosledom. Ovih šest koraka
            vodi te od „ne znam odakle da krenem” do sigurnosti na dan ispita.
          </p>

          {PLAN_IMG && (
            <img
              src={PLAN_IMG}
              alt="Plan učenja za prijemni iz matematike korak po korak"
              width={1024}
              height={768}
              loading="lazy"
              className="mb-8 h-auto w-full rounded-2xl border border-[var(--glass-border)]"
            />
          )}

          <div className="space-y-4">
            {PLAN_STEPS.map((step) => (
              <div
                key={step.title}
                className="flex items-start gap-4 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-5"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[#ec5b13]">
                  {step.icon}
                </span>
                <div>
                  <h3 className="mb-1 font-bold text-heading">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Areas to master */}
        <section id="oblasti" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Koje oblasti treba savladati
          </h2>
          <p className="mb-6 leading-relaxed text-text-secondary">
            Gradivo za prijemni iz matematike grupisano je u nekoliko velikih
            oblasti. U{" "}
            <Link
              href="/znanje"
              className="font-semibold text-[#ec5b13] transition-colors hover:text-[#ff7a3d]"
            >
              Centru znanja
            </Link>{" "}
            svaku od njih pokrivamo interaktivnim lekcijama sa teorijom i
            primerima:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => {
              const first = getLessonsByCategory(cat.id)[0];
              return (
                <Link
                  key={cat.id}
                  href={`/znanje?category=${cat.id}`}
                  className="group rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-5 transition-colors hover:bg-[var(--tint-strong)]"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ec5b13]">
                      {cat.icon}
                    </span>
                    <span className="text-lg font-bold text-heading">
                      {cat.name}
                    </span>
                    <span className="ml-auto text-sm text-muted">
                      {cat.count} lekcija
                    </span>
                  </div>
                  {first && (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      npr. {first.title}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* 5. How to practice */}
        <section id="vezbanje" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Kako efikasno vežbati
          </h2>

          {VEZBANJE_IMG && (
            <img
              src={VEZBANJE_IMG}
              alt="Vežbanje zadataka za prijemni iz matematike pod tajmerom"
              width={1024}
              height={768}
              loading="lazy"
              className="mb-8 h-auto w-full rounded-2xl border border-[var(--glass-border)]"
            />
          )}

          <ul className="space-y-3">
            {[
              "Rešavaj aktivno — sam, na papiru, pre nego što pogledaš rešenje. Pasivno čitanje tuđih rešenja vara osećaj da „znaš”.",
              "Radi prijemne iz prethodnih godina; tipovi zadataka se ponavljaju i prepoznavanje obrasca štedi vreme.",
              "Uči iz grešaka: vodi spisak zadataka koje si pogrešio i vraćaj im se dok ne pređu u rutinu.",
              "Povremeno radi pod tajmerom da uvežbaš tempo i raspodelu vremena.",
            ].map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[#ec5b13]">
                  check_circle
                </span>
                <span className="text-sm leading-relaxed text-text">
                  {text}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-text-secondary">
            Hoćeš da vidiš kako izgleda zadatak rešen korak po korak? Pogledaj{" "}
            <Link
              href="/primer"
              className="font-semibold text-[#ec5b13] transition-colors hover:text-[#ff7a3d]"
            >
              detaljan primer sa prijemnog
            </Link>{" "}
            sa interaktivnim grafikom i objašnjenjem svakog koraka.
          </p>
        </section>

        {/* 6. Common mistakes */}
        <section id="greske" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Najčešće greške u pripremi
          </h2>
          <ul className="space-y-3">
            {MISTAKES.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[#f87171]">
                  error
                </span>
                <span className="text-sm leading-relaxed text-text">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Exam day */}
        <section id="dan-ispita" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold text-heading">
            Saveti za dan ispita
          </h2>

          {DAN_ISPITA_IMG && (
            <img
              src={DAN_ISPITA_IMG}
              alt="Dan prijemnog ispita iz matematike — smiren i spreman kandidat"
              width={1024}
              height={768}
              loading="lazy"
              className="mb-8 h-auto w-full rounded-2xl border border-[var(--glass-border)]"
            />
          )}

          <ol className="space-y-3">
            {EXAM_DAY.map((text, i) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-text">
                  {text}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="mb-14 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-bold text-heading">
            Često postavljana pitanja
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-heading [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="material-symbols-outlined shrink-0 text-[#ec5b13] transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-[#ec5b13]/20 bg-gradient-to-br from-[#ec5b13]/10 to-[#ec5b13]/5 p-8 text-center">
          <h2 className="mb-3 text-2xl font-black text-heading lg:text-3xl">
            Počni pripremu već danas — besplatno
          </h2>
          <p className="mx-auto mb-6 max-w-xl leading-relaxed text-text-secondary">
            Matoteka ti daje sve na jednom mestu: 5000+ rešenih zadataka sa
            prijemnih ispita, 59 interaktivnih lekcija i simulacije ispita pod
            tajmerom — za ETF, FTN, PMF, FON, MATF i druge fakultete.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/prijava"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ec5b13] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.25)] transition-all hover:bg-[#ff7a3d] hover:scale-105"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              Počni besplatno
            </Link>
            <Link
              href="/znanje"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--tint)] px-6 py-3.5 text-base font-semibold text-text transition-colors hover:bg-[var(--tint-strong)]"
            >
              <span className="material-symbols-outlined">auto_stories</span>
              Pogledaj lekcije
            </Link>
          </div>
        </section>

        <p className="mt-16 text-sm text-muted">
          &copy; 2026 {SITE_NAME}. Sva prava zadržana.
        </p>
      </article>
    </>
  );
}
