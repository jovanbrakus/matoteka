"use client";

import { useParams } from "next/navigation";
import ProblemView from "@/components/problems/ProblemView";

export default function PracticeProblemPage() {
  const params = useParams();
  const problemId = params.problemId as string;

  return <ProblemView problemId={problemId} />;
}
