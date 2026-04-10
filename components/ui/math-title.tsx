"use client";

import { memo, useEffect, useRef } from "react";

/**
 * Renders text that may contain LaTeX (e.g. \(x^x\)) and typesets it with MathJax.
 * Safe for use in titles, list items, etc.
 */
const MathTitle = memo(function MathTitle({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = text;
    // Restore LaTeX delimiters that textContent escapes
    ref.current.innerHTML = ref.current.textContent;

    if ((window as any).MathJax?.typesetPromise) {
      (window as any).MathJax.typesetPromise([ref.current]).catch(() => {});
    }
  }, [text]);

  return <Tag ref={ref as any} className={className} />;
});

export default MathTitle;
