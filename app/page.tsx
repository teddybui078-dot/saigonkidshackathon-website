import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Partnership from "@/components/Partnership";
import Faq from "@/components/Faq";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";
import AmbientMotion from "@/components/AmbientMotion";

export default function Home() {
  return (
    <main>
      <AmbientMotion />
      <Hero />
      <Ticker />
      <About />
      <Tracks />
      <Schedule />
      <Partnership />
      <Founders />
      <Faq />
      <Footer />
    </main>
  );
}
