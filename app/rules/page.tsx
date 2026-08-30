import type { Metadata } from "next";
import Rulebook from "@/components/Rulebook";
import Footer from "@/components/Footer";
import AmbientMotion from "@/components/AmbientMotion";
import { EVENT } from "@/components/event";

const description = `The whole ${EVENT.name} rulebook, up front: eligibility, teams, challenges, AI tools, judging, safety and more.`;

export const metadata: Metadata = {
  title: "The rules",
  description,
  openGraph: { title: `The rules — ${EVENT.name}`, description },
};

export default function RulesPage() {
  return (
    <main>
      <AmbientMotion />
      <Rulebook />
      <Footer />
    </main>
  );
}
