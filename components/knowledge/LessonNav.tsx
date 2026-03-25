"use client";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface LessonNavProps {
  links: NavLink[];
}

export default function LessonNav({ links }: LessonNavProps) {
  return (
    <section className={s.section} aria-labelledby="navigacija">
      <div className={s.sectionHeading}>
        <div>
          <div className={cs.eyebrow}>Brza navigacija</div>
          <h2 id="navigacija" className={cs.tSection}>
            Kretanje kroz lekciju
          </h2>
        </div>
        <p>
          Najstabilniji redosled je: zašto ova tema postoji, kako se nalazi
          modul i argument, kako se prelazi između oblika, pa tek onda Moivreova
          formula i koreni.
        </p>
      </div>
      <nav className={s.quickNav} aria-label="Brza navigacija kroz lekciju">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={s.quickNavLink}>
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
