import { PixelPlanet, Sparkle, PixelGrid } from "./decorations";

/* fixed illustrated sky behind the whole site — it stays put while the
   content scrolls over it, so every section shares the hero's atmosphere.
   AmbientMotion keeps the props drifting and twinkling. */
export default function SceneBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-mist to-canvas"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-60 240 C 320 140 780 150 1500 260"
          stroke="#c9d7ee"
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M-60 620 C 420 740 980 730 1500 600"
          stroke="#c9d7ee"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M-60 430 C 460 380 900 400 1500 430"
          stroke="#dde6f4"
          strokeWidth="60"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      {/* ambient props at the edges — always drifting or twinkling */}
      <PixelPlanet className="ambient-float absolute left-[3%] top-[58%] opacity-70 hidden md:block" size={92} />
      <PixelPlanet className="ambient-float absolute right-[4%] top-[18%] opacity-60 hidden lg:block" size={72} />
      <Sparkle className="ambient-twinkle absolute left-[8%] top-[12%] opacity-80" size={26} />
      <Sparkle className="ambient-twinkle absolute right-[10%] bottom-[14%] opacity-80" size={30} />
      <Sparkle className="ambient-twinkle absolute left-[16%] bottom-[8%] opacity-70 hidden md:block" size={20} color="#0145b4" />
      <Sparkle className="ambient-twinkle absolute right-[22%] top-[8%] opacity-60 hidden lg:block" size={18} />
      <PixelGrid className="ambient-float absolute right-[3%] bottom-[42%] opacity-60 hidden md:block" size={40} />
      <PixelGrid className="ambient-float absolute left-[2%] top-[32%] opacity-50 hidden lg:block" size={32} />
    </div>
  );
}
