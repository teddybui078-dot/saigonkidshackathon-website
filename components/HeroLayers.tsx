/* the five scene layers behind the hero's words, back to front. each one
   is a plain server component: the art is drawn once on the server and
   the orchestrator (Hero.tsx) only ever moves the .hero-float wrappers.
   z-order comes from HERO_LAYER, nowhere else. */

import { Sparkle } from "./decorations";
import { SUN } from "./palette";
import { GRAIN_ID, PARALLAX } from "./hero-layers";
import { STARFIELD, STAR_DEPTHS, type StarDepth } from "./starfield";
import {
  HeroLayerShell,
  GrainFilter,
  RingedPlanet,
  EarthHorizon,
  Rocket,
  KidAstronaut,
  CodingSatellite,
  MoonTerrain,
} from "./space";

/* the css loop for each star depth (plain classes in globals.css) */
const STAR_CLASS: Record<StarDepth, string> = {
  far: "stars-far",
  mid: "stars-mid",
  near: "stars-near",
};

/* layer 0 — the midnight gradient, the drifting stars, the paper grain */
export function HeroCanvas() {
  return (
    <HeroLayerShell layer="canvas" className="bg-linear-to-b from-space to-space-dark">
      {/* the grain: one svg filter, one still overlay rasterised once. it sits
          under the stars so their loops never re-blend it */}
      <GrainFilter id={GRAIN_ID} />
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: `url(#${GRAIN_ID})` }}
      />
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
      {/* a few four-point sparkles among the dots — AmbientMotion twinkles them */}
      <Sparkle className="ambient-twinkle absolute left-[14%] top-[16%]" size={22} color={SUN} />
      <Sparkle className="ambient-twinkle absolute right-[18%] top-[22%]" size={16} color={SUN} />
      <Sparkle className="ambient-twinkle absolute left-[24%] top-[62%] hidden md:block" size={18} color={SUN} />
    </HeroLayerShell>
  );
}

/* layer 1 — a ringed planet top-left, a planet's horizon off the top-right */
export function HeroCelestial() {
  return (
    <HeroLayerShell layer="celestial">
      <div
        className="hero-float absolute left-[3%] top-[13%] w-28 sm:w-40 md:left-[5%] md:top-[15%] md:w-56"
        data-speed={PARALLAX.far}
      >
        <RingedPlanet className="h-auto w-full" />
      </div>
      <div
        className="hero-float absolute -right-6 -top-4 hidden w-[380px] md:block lg:w-[440px]"
        data-speed={PARALLAX.far}
      >
        {/* overflow-visible lets the disc keep its curve past the drawing box */}
        <EarthHorizon className="h-auto w-full overflow-visible" />
      </div>
    </HeroLayerShell>
  );
}

/* layer 2 — the rocket, standing on the central crater */
export function HeroLandmark() {
  return (
    <HeroLayerShell layer="landmark">
      {/* centred by the flex row, so the parallax tween owns the whole transform */}
      <div
        className="hero-float absolute inset-x-0 bottom-[4.5rem] flex justify-center md:bottom-[6.25rem]"
        data-speed={PARALLAX.mid}
      >
        <Rocket className="hero-rocket h-auto w-20 sm:w-24 md:w-32" />
      </div>
    </HeroLayerShell>
  );
}

/* layer 3 — the kid astronaut and the coding satellite, floating */
export function HeroMascots() {
  return (
    <HeroLayerShell layer="mascots">
      <div
        className="hero-float absolute right-1 top-[8%] w-[4.5rem] sm:right-[4%] sm:top-[12%] sm:w-24 md:left-[8%] md:right-auto md:top-[30%] md:w-36 lg:left-[11%]"
        data-speed={PARALLAX.near}
      >
        <KidAstronaut className="hero-mascot float-slow space-glow h-auto w-full" />
      </div>
      <div
        className="hero-float absolute right-[3%] top-[40%] hidden w-40 sm:block md:right-[7%] md:top-[36%] md:w-56 lg:right-[10%]"
        data-speed={PARALLAX.near}
      >
        <CodingSatellite className="hero-mascot float-fast space-glow h-auto w-full" />
      </div>
    </HeroLayerShell>
  );
}

/* layer 4 — the moon along the bottom edge; no parallax, it is the ground */
export function HeroTerrain() {
  return (
    <HeroLayerShell layer="terrain" className="top-auto h-36 md:h-52">
      <MoonTerrain className="h-full w-full" />
    </HeroLayerShell>
  );
}
