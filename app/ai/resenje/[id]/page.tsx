"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AiSolutionPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/ai" className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-[#a78bfa]">
        <ArrowLeft size={16} /> Nazad na AI Tutor
      </Link>

      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src={`/api/ai/solutions/${id}/html`}
          sandbox="allow-scripts allow-same-origin"
          className="h-[85vh] w-full border-none"
          title="AI Rešenje"
        />
      </div>
    </div>
  );
}
