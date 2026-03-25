"use client";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

interface HeroCard {
  label: string;
  description: string;
}

interface StatCard {
  label: string;
  description: string;
}

interface LessonHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  cards: HeroCard[];
  stats: StatCard[];
  heroDecoration?: React.ReactNode;
}

export default function LessonHero({
  eyebrow,
  title,
  description,
  heroImageSrc,
  heroImageAlt,
  cards,
  stats,
  heroDecoration,
}: LessonHeroProps) {
  return (
    <header className={s.hero}>
      <div className={cs.eyebrow}>{eyebrow}</div>

      <div className={s.heroGridLayout}>
        <div className={s.heroCopy}>
          <h1 className={cs.tHero}>{title}</h1>
          <p>{description}</p>

          <div className={s.heroCards}>
            {cards.map((card, i) => (
              <article key={i} className={s.heroCard}>
                <strong>{card.label}</strong>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className={cs.heroVisual}>
          {heroDecoration || (
            <div className={cs.heroImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={cs.heroImage}
                src={heroImageSrc}
                alt={heroImageAlt}
              />
            </div>
          )}
        </aside>
      </div>

      <div className={s.statRow}>
        {stats.map((stat, i) => (
          <article key={i} className={s.statCard}>
            <strong>{stat.label}</strong>
            <p>{stat.description}</p>
          </article>
        ))}
      </div>
    </header>
  );
}
