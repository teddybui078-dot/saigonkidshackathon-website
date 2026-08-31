/* the five scene layers behind the sign, back to front — the street.
   plain server components: the art renders once on the server and the
   orchestrator only ever moves the .hero-float wrappers. z-order comes
   from HERO_LAYER, nowhere else. */

import { CHALK_ID, GRAIN_ID, PARALLAX } from "./hero-layers";
import { STARFIELD, STAR_DEPTHS, type StarDepth } from "./starfield";
import { Sparkle } from "./decorations";
import { SUN, PAPER, FLARE } from "./palette";
import {
  HeroLayerShell,
  GrainFilter,
  ChalkFilter,
  EarthHorizon,
  MoonTerrain,
  ChalkStar,
  SkySwirls,
  RingedPlanet,
  SwirlPlanet,
  CraterMoon,
  Constellation,
  Comet,
  ChalkLaptop,
  FloatBrick,
  Landmark81,
  KidAstronaut,
  Foliage,
  BrickPile,
  SaigonSkyline,
} from "./space";

/* the css loop for each star depth (plain classes in globals.css) */
const STAR_CLASS: Record<StarDepth, string> = {
  far: "stars-far",
  mid: "stars-mid",
  near: "stars-near",
};

/* the sparkles between the stars and the chalk stars — the sky's middle
   scale, some sun, some paper */
const SPARKLES: {
  left: string;
  top: string;
  size: number;
  tone: "sun" | "paper";
  time: string;
  hide?: boolean;
}[] = [
  { left: "16%", top: "14%", size: 14, tone: "sun", time: "2.8s" },
  { left: "38%", top: "20%", size: 8, tone: "paper", time: "3.3s", hide: true },
  { left: "62%", top: "16%", size: 20, tone: "sun", time: "2.2s", hide: true },
  { left: "83%", top: "20%", size: 10, tone: "paper", time: "3.9s" },
  { left: "8%", top: "48%", size: 18, tone: "sun", time: "3.1s" },
  { left: "30%", top: "60%", size: 9, tone: "paper", time: "2.5s", hide: true },
  { left: "88%", top: "55%", size: 14, tone: "sun", time: "3.6s", hide: true },
  { left: "48%", top: "8%", size: 10, tone: "paper", time: "2.9s" },
];

/* the chalk stars scattered across the top of the sky */
const CHALK_STARS: { left: string; top: string; size: number; time: string; hide?: boolean }[] = [
  { left: "6%", top: "26%", size: 30, time: "2.1s" },
  { left: "27%", top: "9%", size: 24, time: "3.4s" },
  { left: "45%", top: "5%", size: 20, time: "2.7s", hide: true },
  { left: "58%", top: "10%", size: 26, time: "2.4s", hide: true },
  { left: "76%", top: "7%", size: 32, time: "3.1s" },
  { left: "90%", top: "30%", size: 22, time: "2.6s" },
  { left: "68%", top: "58%", size: 24, time: "3.7s", hide: true },
  { left: "12%", top: "62%", size: 20, time: "2.9s", hide: true },
];

/* layer 0 — the midnight gradient, the grain, the stars, the orbit */
export function HeroCanvas() {
  return (
    <HeroLayerShell layer="canvas" className="bg-linear-to-b from-space to-space-dark">
      {/* the grain: one svg filter, one still overlay rasterised once. it
          sits under the stars so their loops never re-blend it */}
      <GrainFilter id={GRAIN_ID} />
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: `url(#${GRAIN_ID})` }}
      />
      {/* the wind-bands brushed into the sky, under the stars */}
      <SkySwirls className="absolute inset-0 h-full w-full mix-blend-soft-light" />
      {STAR_DEPTHS.map((depth) => {
        const layer = STARFIELD[depth];
        return (
          <span
            key={depth}
            className={`${STAR_CLASS[depth]} absolute left-0 top-0 rounded-full bg-white`}
            style={
              {
                width: layer.size,
                height: layer.size,
                boxShadow: layer.shadow,
                opacity: layer.opacity,
                "--star-alpha": layer.opacity,
              } as React.CSSProperties
            }
          />
        );
      })}
      {/* chalk stars, winking off-beat */}
      {CHALK_STARS.map((s, i) => (
        <ChalkStar
          key={i}
          width={s.size}
          className={`chalk-blink absolute ${s.hide ? "hidden md:block" : ""}`}
          style={{ left: s.left, top: s.top, "--blink-time": s.time } as React.CSSProperties}
        />
      ))}
      {/* sparkles at the scale between — the sky reads at three sizes */}
      {SPARKLES.map((s, i) => (
        <Sparkle
          key={i}
          size={s.size}
          color={s.tone === "sun" ? SUN : PAPER}
          className={`chalk-blink absolute ${s.hide ? "hidden md:block" : ""}`}
          style={{ left: s.left, top: s.top, "--blink-time": s.time } as React.CSSProperties}
        />
      ))}
      {/* the sky doodling on itself: constellations, a comet, a laptop */}
      <Constellation kind="code" className="absolute left-[4%] top-[24%] hidden w-36 sm:block" />
      <Constellation kind="kite" className="absolute left-[20%] top-[7%] hidden w-24 rotate-6 md:block" />
      <Comet className="absolute left-[60%] top-[10%] w-44 -rotate-3 md:w-56" />
      <ChalkLaptop className="absolute left-[26%] top-[62%] hidden w-24 -rotate-6 md:block" />
      {/* two bricks that drifted off the pile below */}
      <FloatBrick className="brick-free absolute left-[56%] top-[19%] hidden w-16 md:block" />
      <FloatBrick
        color={FLARE}
        className="absolute right-[23%] top-[22%] hidden w-14 rotate-[9deg] lg:block"
      />
    </HeroLayerShell>
  );
}

/* layer 1 — the earth on the horizon and the planets */
export function HeroCelestial() {
  return (
    <HeroLayerShell layer="celestial">
      <div
        className="hero-float absolute -right-6 -top-4 hidden w-[380px] md:block lg:w-[440px]"
        data-speed={PARALLAX.far}
      >
        {/* overflow-visible lets the disc keep its curve past the drawing box */}
        <EarthHorizon className="h-auto w-full overflow-visible" />
      </div>
      {/* two planets tucked behind the sign so the frame crops them.
          deliberately static — no hero-float, no drift — because any
          transform would slide them out from behind the board */}
      <RingedPlanet
        clipId="hero-ringed-planet"
        className="absolute left-[17%] top-[30%] hidden w-44 md:block lg:w-52"
      />
      <SwirlPlanet
        clipId="hero-swirl-planet"
        className="absolute right-[22%] top-[46%] hidden w-44 md:block lg:w-48"
      />
      {/* the deeper crowd: a pale moon and two far, faded neighbours */}
      <CraterMoon className="absolute left-[8%] top-[11%] w-24 md:left-[10%] md:w-32" />
      <RingedPlanet
        clipId="hero-ringed-planet-far"
        className="absolute right-[8%] top-[24%] hidden w-20 opacity-60 lg:block"
      />
      <SwirlPlanet
        clipId="hero-swirl-planet-far"
        className="absolute left-[30%] top-[9%] hidden w-20 opacity-50 lg:block"
      />
    </HeroLayerShell>
  );
}

/* layer 2 — landmark 81, grounded on the moon, big */
export function HeroLandmark() {
  return (
    <HeroLayerShell layer="landmark">
      <div
        className="hero-float hero-landmark absolute -left-14 bottom-[3.5rem] sm:-left-6 md:left-[1%] md:bottom-[4.5rem]"
        data-speed={PARALLAX.mid}
      >
        <Landmark81 className="h-[36svh] w-auto sm:h-[46svh] md:h-[58svh] lg:h-[64svh]" />
      </div>
    </HeroLayerShell>
  );
}

/* layer 3 — the kid astronaut drifting mid-right, waving down */
export function HeroMascots() {
  return (
    <HeroLayerShell layer="mascots">
      <div
        className="hero-float hero-mascot-wrap absolute -right-2 bottom-[24%] w-36 sm:right-[2%] sm:w-44 md:right-[5%] md:top-[34%] md:bottom-auto md:w-[19vw] lg:right-[7%] lg:w-[17vw] max-w-[360px]"
        data-speed={PARALLAX.near}
      >
        <KidAstronaut className="float-slow space-glow h-auto w-full" />
      </div>
    </HeroLayerShell>
  );
}

/* layer 4 — the city behind the crest, the moon, the leaves, the bricks */
export function HeroTerrain() {
  return (
    <HeroLayerShell layer="terrain" className="top-auto h-36 md:h-52">
      <div className="absolute inset-x-0 bottom-[55%]">
        <SaigonSkyline className="mx-auto h-auto w-full max-w-[1600px]" />
      </div>
      <MoonTerrain className="absolute bottom-0 h-full w-full" />
      <div className="absolute -right-8 bottom-0 w-64 sm:w-80 md:-right-4 md:w-[30vw] md:max-w-[560px]">
        <Foliage className="h-auto w-full" />
      </div>
      <BrickPile className="absolute bottom-[6%] right-[20%] hidden w-44 sm:block md:w-56" />
    </HeroLayerShell>
  );
}

/* layer 6 — the chalk tooth over the whole scene, so no fill is a clean
   fill. one still overlay, rasterised once, everything animates under it */
export function HeroTexture() {
  return (
    <HeroLayerShell layer="texture">
      <ChalkFilter id={CHALK_ID} />
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: `url(#${CHALK_ID})` }}
      />
    </HeroLayerShell>
  );
}
