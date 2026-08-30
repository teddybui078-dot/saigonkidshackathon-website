import type { Metadata } from "next";
import ParentsGuide from "@/components/ParentsGuide";
import Footer from "@/components/Footer";
import AmbientMotion from "@/components/AmbientMotion";
import { EVENT } from "@/components/event";

const description = `What parents need to know about ${EVENT.name}: the stay-on-site rule, the fee, the day's schedule, food, safety and what to bring.`;

export const metadata: Metadata = {
  title: "Parents' guide",
  description,
  openGraph: { title: `Parents' guide — ${EVENT.name}`, description },
};

export default function ParentsPage() {
  return (
    <main>
      <AmbientMotion />
      <ParentsGuide />
      <Footer />
    </main>
  );
}
