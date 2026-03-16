"use client";

interface ProblemStatementProps {
  problemId: string;
  /** "statement" shows only the problem text, "full" shows everything */
  section?: "statement" | "full";
  minHeight?: string;
}

export default function ProblemStatement({
  problemId,
  section = "statement",
  minHeight = "150px",
}: ProblemStatementProps) {
  const src =
    section === "statement"
      ? `/api/problems/${problemId}/html?section=statement`
      : `/api/problems/${problemId}/html`;

  return (
    <iframe
      src={src}
      sandbox="allow-scripts allow-same-origin"
      className="w-full border-none"
      title={section === "statement" ? "Postavka zadatka" : "Resenje"}
      style={{ minHeight }}
      onLoad={(e) => {
        const iframe = e.target as HTMLIFrameElement;
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            const resizeObserver = new ResizeObserver(() => {
              const height = doc.documentElement.scrollHeight;
              iframe.style.height = height + "px";
            });
            resizeObserver.observe(doc.documentElement);
            iframe.style.height = doc.documentElement.scrollHeight + "px";
          }
        } catch {
          iframe.style.height = section === "statement" ? "400px" : "600px";
        }
      }}
    />
  );
}
