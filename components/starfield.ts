/* the stars behind the hero: three depths of white dots, each one
   element painting all its stars as a box-shadow list. the positions come
   from a seeded generator at module scope, so the server and the browser
   draw the very same sky and hydration never argues about it */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = { x: number; y: number };

function scatter(seed: number, count: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: Math.round(rand() * 10000) / 100,
    y: Math.round(rand() * 10000) / 100,
  }));
}

/* one "Xvw Yvh 0 0 #fff" per star; the element's own size sets the dot */
function toShadow(stars: Star[]): string {
  return stars.map((s) => `${s.x}vw ${s.y}vh 0 0 #fff`).join(", ");
}

export type StarDepth = "far" | "mid" | "near";

export type StarLayer = {
  /* the box-shadow list that paints every star of this depth */
  shadow: string;
  /* dot diameter in px */
  size: number;
  /* how bright this depth sits */
  opacity: number;
};

export const STARFIELD: Record<StarDepth, StarLayer> = {
  far: { shadow: toShadow(scatter(11, 140)), size: 1, opacity: 0.55 },
  mid: { shadow: toShadow(scatter(23, 60)), size: 2, opacity: 0.8 },
  near: { shadow: toShadow(scatter(37, 22)), size: 3, opacity: 1 },
};

export const STAR_DEPTHS: readonly StarDepth[] = ["far", "mid", "near"];
