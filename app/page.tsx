import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Faq from "@/components/Faq";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PixelBot from "@/components/PixelBot";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <PixelBot />
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Tracks />
      <Schedule />
      <Faq />
      <Sponsors />
      <Footer />
    </main>
  );
}
