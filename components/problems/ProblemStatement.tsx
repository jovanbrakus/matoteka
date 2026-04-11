"use client";

import { useEffect, useRef, useState } from "react";
import type { CardType } from "@/lib/comments";

interface ProblemStatementProps {
  problemId: string;
  /** "statement" shows only the problem text, "full" shows everything */
  section?: "statement" | "full";
  minHeight?: string;
  /** Comment count per anchor key (e.g. `"plan"` or `"step-solution:3"`).
   *  Pushed into the iframe as a `matoteka-comment-counts` message whenever
   *  the prop changes after the iframe has reported ready. */
  commentCounts?: Record<string, number>;
  /** Called when a comment button inside the iframe is clicked. */
  onCommentOpen?: (cardType: CardType, stepNumber: number | null) => void;
}

export default function ProblemStatement({
  problemId,
  section = "statement",
  minHeight = "150px",
  commentCounts,
  onCommentOpen,
}: ProblemStatementProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // null = "not yet initialized from localStorage". The iframe is not
  // rendered until the real theme is known, so it never has to load with
  // a default theme and then reload with the real one. That second load
  // is what was double-counting solution views.
  const [theme, setTheme] = useState<string | null>(null);
  // Becomes true after the iframe posts its first matoteka-resize message,
  // meaning the DOM + in-iframe message listener are ready to receive counts.
  const [iframeReady, setIframeReady] = useState(false);

  // Listen for messages from THIS iframe only (match e.source to our contentWindow)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      if (!e.data) return;
      if (e.data.type === "matoteka-resize") {
        iframeRef.current.style.height = e.data.height + "px";
        setIframeReady(true);
        return;
      }
      if (e.data.type === "matoteka-comment-open") {
        if (!onCommentOpen) return;
        const cardType = e.data.cardType as CardType | undefined;
        const stepNumber =
          typeof e.data.stepNumber === "number" ? e.data.stepNumber : null;
        if (!cardType) return;
        onCommentOpen(cardType, stepNumber);
        return;
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onCommentOpen]);

  // Push comment counts into the iframe whenever they change (and once after ready).
  useEffect(() => {
    if (!iframeReady || !commentCounts) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "matoteka-comment-counts", counts: commentCounts },
      "*"
    );
  }, [commentCounts, iframeReady]);

  // Initialize theme from localStorage on mount, then push later changes
  // to the iframe via postMessage only. Crucially we do NOT call setTheme
  // again — that would re-render the iframe with a new src and re-trigger
  // the API call (and the audit-log insert).
  useEffect(() => {
    const stored = localStorage.getItem("theme") as string | null;
    setTheme(stored || "dark");

    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains("light");
      const newTheme = isLight ? "light" : "dark";
      iframeRef.current?.contentWindow?.postMessage(
        { type: "matoteka-theme", theme: newTheme },
        "*"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (theme === null) {
    return <div className="w-full" style={{ minHeight }} />;
  }

  const src =
    section === "statement"
      ? `/api/problems/${problemId}/html?section=statement&theme=${theme}`
      : `/api/problems/${problemId}/html?theme=${theme}`;

  return (
    <iframe
      ref={iframeRef}
      src={src}
      sandbox="allow-scripts"
      className="w-full border-none"
      title={section === "statement" ? "Postavka zadatka" : "Resenje"}
      style={{ minHeight }}
    />
  );
}
