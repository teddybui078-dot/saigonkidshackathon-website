import { Sparkle, PixelGrid } from "./decorations";
import { SUN, PAPER } from "./palette";

/* fixed midnight sky behind the whole site — it stays put while the
   content scrolls over it, so every section shares the hero's atmosphere.
   AmbientMotion keeps the props drifting and twinkling. */
export default function SceneBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 isolate -z-10 bg-linear-to-b from-space to-space-dark"
    >
      {/* ambient props at the edges — always drifting or twinkling */}
      <Sparkle className="ambient-twinkle absolute left-[8%] top-[12%] opacity-80" size={26} color={SUN} />
      <Sparkle className="ambient-twinkle absolute right-[10%] bottom-[14%] opacity-80" size={30} color={SUN} />
      <Sparkle className="ambient-twinkle absolute left-[16%] bottom-[8%] opacity-60 hidden md:block" size={20} color={PAPER} />
      <Sparkle className="ambient-twinkle absolute right-[22%] top-[8%] opacity-60 hidden lg:block" size={18} color={PAPER} />
      <PixelGrid className="ambient-float absolute right-[3%] bottom-[42%] opacity-60 hidden md:block" size={40} />
      <PixelGrid className="ambient-float absolute left-[2%] top-[32%] opacity-50 hidden lg:block" size={32} />
    </div>
  );
}
