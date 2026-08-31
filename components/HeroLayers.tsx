/* the five scene layers behind the sign, back to front — the street.
   plain server components: the art renders once on the server and the
   orchestrator only ever moves the .hero-float wrappers. z-order comes
   from HERO_LAYER, nowhere else. */

import { GRAIN_ID, PARALLAX } from "./hero-layers";
import { STARFIELD, STAR_DEPTHS, type StarDepth } from "./starfield";
import {
  HeroLayerShell,
  GrainFilter,
  EarthHorizon,
  CodingSatellite,
  MoonTerrain,
  ChalkStar,
  OrbitArc,
  LanternString,
  Lantern,
  Landmark81,
  RobotCyclo,
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

/* the lanterns hung along the string: x across the sky, y down the sag,
   size and swing clock of their own */
const LANTERNS: { left: string; top: string; width: string; time: string; hide?: boolean }[] = [
  { left: "10%", top: "34%", width: "2.6rem", time: "2.4s" },
  { left: "19%", top: "52%", width: "3.2rem", time: "2.8s", hide: true },
  { left: "28%", top: "66%", width: "2.8rem", time: "3.2s", hide: true },
  { left: "69%", top: "66%", width: "3.2rem", time: "2.6s", hide: true },
  { left: "84%", top: "42%", width: "2.6rem", time: "3s" },
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
      {/* the satellite's dotted track, crawling forever */}
      <OrbitArc className="absolute inset-0 h-full w-full" />
      {/* chalk stars, winking off-beat */}
      {CHALK_STARS.map((s, i) => (
        <ChalkStar
          key={i}
          width={s.size}
          className={`chalk-blink absolute ${s.hide ? "hidden md:block" : ""}`}
          style={{ left: s.left, top: s.top, "--blink-time": s.time } as React.CSSProperties}
        />
      ))}
    </HeroLayerShell>
  );
}

/* layer 1 — the lantern string across the sky, the earth, the satellite */
export function HeroCelestial() {
  return (
    <HeroLayerShell layer="celestial">
      {/* the string is what the sign hangs from — it never parallaxes,
          so the cords stay tied to it */}
      <div className="hero-string absolute inset-x-0 top-14 h-24 md:top-16 md:h-28">
        <LanternString className="h-full w-full" />
        {LANTERNS.map((l, i) => (
          <span
            key={i}
            className={`hero-lantern absolute ${l.hide ? "hidden md:inline-block" : "inline-block"}`}
            style={{ left: l.left, top: l.top, width: l.width }}
          >
            <Lantern
              className="swing-hang h-auto w-full"
              style={{ "--swing-time": l.time } as React.CSSProperties}
            />
          </span>
        ))}
      </div>
      <div
        className="hero-float absolute -right-6 -top-4 hidden w-[380px] md:block lg:w-[440px]"
        data-speed={PARALLAX.far}
      >
        {/* overflow-visible lets the disc keep its curve past the drawing box */}
        <EarthHorizon className="h-auto w-full overflow-visible" />
      </div>
      <div
        className="hero-float absolute left-[24%] top-[44%] hidden w-24 lg:block"
        data-speed={PARALLAX.far}
      >
        <CodingSatellite className="float-fast h-auto w-full" />
      </div>
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

/* layer 3 — the robot pedalling its rocket cyclo, floating mid-right */
export function HeroMascots() {
  return (
    <HeroLayerShell layer="mascots">
      <div
        className="hero-float hero-mascot-wrap absolute -right-10 bottom-[22%] w-56 sm:right-0 sm:w-72 md:right-[2%] md:top-[30%] md:bottom-auto md:w-[30vw] lg:right-[4%] lg:w-[26vw] max-w-[520px]"
        data-speed={PARALLAX.near}
      >
        <RobotCyclo className="float-slow space-glow h-auto w-full" />
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
