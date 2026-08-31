/* the hero's depth stack, front to back: six layers, one z-index each.
   every layer component reads its z from here, so this is the only place
   the order is written down. the chalk tooth that used to sit on top is
   SceneVeil now — site chrome, not a hero layer */

export const HERO_LAYER = {
  canvas: 1, // the midnight gradient, the grain and the stars
  celestial: 2, // planets in the corners
  landmark: 3, // the rocket standing on the ground
  mascots: 4, // the astronaut and the satellite drifting
  terrain: 5, // the moon surface along the bottom edge
  ui: 6, // the logo, the sticker card, the buttons
} as const;

export type HeroLayer = keyof typeof HERO_LAYER;
export type HeroLayerIndex = (typeof HERO_LAYER)[HeroLayer];

/* how fast each depth drifts as you scroll — the orchestrator reads it
   back off data-speed, so a layer can only pick a speed that exists */
export const PARALLAX = {
  far: 0.25,
  mid: 0.6,
  near: 1.1,
} as const;

export type ParallaxSpeed = keyof typeof PARALLAX;

/* the grain filter is rendered once, in the canvas layer; anything that
   references it uses this id */
export const GRAIN_ID = "hero-grain";
