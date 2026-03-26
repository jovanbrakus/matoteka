import type { Metadata } from "next";
import PracticeHub from "@/components/practice/PracticeHub";

export const metadata: Metadata = {
  title: "Vežba — Matoteka",
  description: "Izaberi oblast i počni sa vežbanjem matematike za prijemni ispit.",
};

export default function VezbaPage() {
  return <PracticeHub />;
}
