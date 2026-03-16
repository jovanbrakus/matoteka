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
            const updateHeight = () => {
              const bodyStyle = doc.defaultView?.getComputedStyle(doc.body);
              const marginTop = parseInt(bodyStyle?.marginTop || "0", 10);
              const marginBottom = parseInt(bodyStyle?.marginBottom || "0", 10);
              const height = doc.body.offsetHeight + marginTop + marginBottom + 1;
              iframe.style.height = height + "px";
            };
            const resizeObserver = new ResizeObserver(updateHeight);
            resizeObserver.observe(doc.body);
            updateHeight();
          }
        } catch {
          iframe.style.height = section === "statement" ? "400px" : "600px";
        }
      }}
    />
  );
}
