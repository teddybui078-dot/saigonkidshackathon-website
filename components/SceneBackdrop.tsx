import { Sparkle } from "./decorations";
import {
  GrainFilter,
  ChalkFilter,
  SkySwirls,
  ChalkStar,
  CraterMoon,
  RingedPlanet,
  SwirlPlanet,
  Constellation,
  Comet,
  FloatBrick,
} from "./space";
import { SUN, PAPER, FLARE } from "./palette";

/* the fixed midnight sky behind the whole site — the hero's weather,
   carried under every section and every route. it stays put while the
   content scrolls over it. filter and clip ids are scene-* so they can
   never collide with the hero's own; AmbientMotion and the chalk-blink
   loop keep it alive. */
export default function SceneBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 isolate -z-10 bg-linear-to-b from-space to-space-dark"
    >
      {/* the fine grain, rasterised once, under everything else */}
      <GrainFilter id="scene-grain" />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: "url(#scene-grain)" }}
      />
      {/* the wind-bands brushed into the sky */}
      <SkySwirls className="absolute inset-0 h-full w-full mix-blend-soft-light" />

      {/* the far crowd, faded so content always wins */}
      <CraterMoon className="absolute left-[4%] top-[16%] w-20 opacity-50 hidden md:block" />
      <RingedPlanet
        clipId="scene-ringed"
        className="absolute right-[2%] top-[36%] w-36 opacity-40 hidden lg:block"
      />
      <SwirlPlanet
        clipId="scene-swirl"
        className="absolute -left-8 top-[62%] w-32 opacity-40 hidden lg:block"
      />
      <Constellation kind="kite" className="absolute right-[6%] top-[8%] w-20 opacity-70 hidden md:block" />
      <Comet className="absolute left-[8%] top-[40%] w-40 -rotate-6 opacity-60 hidden md:block" />

      {/* stars and sparkles at the edges, winking off-beat */}
      <ChalkStar className="chalk-blink absolute left-[10%] top-[9%]" width={22} style={{ "--blink-time": "3.4s" } as React.CSSProperties} />
      <ChalkStar className="chalk-blink absolute right-[14%] top-[58%] hidden md:block" width={26} style={{ "--blink-time": "2.6s" } as React.CSSProperties} />
      <Sparkle className="ambient-twinkle absolute left-[6%] bottom-[10%] opacity-80" size={22} color={SUN} />
      <Sparkle className="ambient-twinkle absolute right-[9%] bottom-[22%] opacity-80" size={28} color={SUN} />
      <Sparkle className="ambient-twinkle absolute left-[18%] top-[30%] opacity-60 hidden md:block" size={14} color={PAPER} />
      <Sparkle className="ambient-twinkle absolute right-[24%] top-[14%] opacity-60 hidden lg:block" size={16} color={PAPER} />

      {/* two bricks that never came down */}
      <FloatBrick className="brick-free absolute right-[4%] bottom-[8%] hidden w-14 md:block" />
      <FloatBrick color={FLARE} className="ambient-float absolute left-[3%] top-[44%] hidden w-12 -rotate-6 lg:block" />

      {/* the coarse chalk tooth over the whole sky */}
      <ChalkFilter id="scene-chalk" />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: "url(#scene-chalk)" }}
      />
    </div>
  );
}
