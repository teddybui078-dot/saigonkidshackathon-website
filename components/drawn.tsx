/* the SignBoard's grammar, generalised: every card on the site can be a
   drawn thing — one wobbly path laid down twice (a sun-thrown shadow
   under an inked face), gloss ticks, optional crooked bolts. five
   hand-authored wobbles per aspect, and the seed picks everything at
   once — outline, gloss position, which bolt hangs crooked, how far
   each bolt missed its mark — so neighbours never look cloned and the
   imperfection is structural, not accidental. preserveAspectRatio="none"
   stretches the wobble gently and non-scaling-stroke keeps the ink even.
   per-card character (pushpins, bands, materials) stays the caller's job. */

import { SPACE, SPACE_DARK, SPACE_LIGHT, SUN, FLARE, STROKE, PAPER, SKY_LIGHT } from "./palette";

export type DrawnTone = "paper" | "space" | "spaceLight" | "sky" | "sun" | "flare";
export type DrawnShadow = "sun" | "flare" | "none";
export type DrawnAspect = "wide" | "tall" | "square";

const TONE: Record<DrawnTone, string> = {
  paper: PAPER,
  space: SPACE,
  spaceLight: SPACE_LIGHT,
  sky: SKY_LIGHT,
  sun: SUN,
  flare: FLARE,
};

const VIEW: Record<DrawnAspect, string> = {
  wide: "0 0 400 260",
  tall: "0 0 260 400",
  square: "0 0 300 300",
};

/* the wobbles — corners rounded unevenly, every edge bowed a little.
   3 and 4 lean harder: a dipped top, a high shoulder, a sagging belly */
const PATHS: Record<DrawnAspect, string[]> = {
  wide: [
    "M26 18 Q140 10 260 13 Q346 15 380 20 Q391 22 390 34 Q395 130 390 226 Q389 240 375 242 Q258 250 132 247 Q44 245 24 241 Q13 239 14 227 Q8 130 15 32 Q16 20 26 18 Z",
    "M22 22 Q130 13 250 15 Q342 17 378 24 Q389 26 388 38 Q392 132 388 222 Q387 237 372 239 Q248 246 124 243 Q40 241 21 237 Q11 235 12 223 Q7 133 12 36 Q13 24 22 22 Z",
    "M28 15 Q150 9 268 12 Q352 14 382 18 Q392 20 391 32 Q396 128 392 228 Q391 242 377 244 Q254 251 128 248 Q42 246 25 243 Q14 241 15 229 Q9 127 16 30 Q17 17 28 15 Z",
    "M25 21 Q140 17 258 14 Q348 12 381 22 Q392 25 390 37 Q397 132 389 224 Q388 239 373 241 Q252 247 130 245 Q45 249 23 240 Q12 237 14 225 Q7 126 14 33 Q15 22 25 21 Z",
    "M27 16 Q142 11 262 14 Q350 17 379 23 Q390 25 389 36 Q393 128 391 222 Q390 237 375 240 Q255 244 133 251 Q46 248 25 242 Q13 239 15 226 Q9 130 13 31 Q14 18 27 16 Z",
  ],
  tall: [
    "M24 18 Q120 10 218 14 Q238 16 239 30 Q246 200 240 368 Q239 382 224 384 Q130 391 40 386 Q22 384 21 370 Q14 200 19 32 Q20 20 24 18 Z",
    "M20 24 Q110 14 214 18 Q234 20 235 34 Q241 198 236 364 Q235 378 220 380 Q126 388 38 382 Q20 380 19 366 Q12 202 16 36 Q17 26 20 24 Z",
    "M28 14 Q124 8 220 12 Q240 14 241 28 Q248 196 242 370 Q241 384 226 386 Q134 394 44 388 Q24 386 23 372 Q16 198 22 30 Q23 16 28 14 Z",
    "M22 20 Q116 16 216 15 Q236 17 237 31 Q243 202 239 366 Q238 380 222 382 Q128 390 42 384 Q23 382 22 368 Q15 196 17 34 Q18 22 22 20 Z",
    "M26 16 Q122 9 218 13 Q239 15 240 29 Q245 194 241 372 Q240 386 224 388 Q132 392 40 387 Q21 385 20 371 Q13 204 20 31 Q21 18 26 16 Z",
  ],
  square: [
    "M26 18 Q150 10 274 16 Q286 17 287 30 Q292 150 287 272 Q286 284 272 286 Q150 292 30 287 Q17 286 16 272 Q10 150 16 30 Q17 19 26 18 Z",
    "M22 22 Q146 13 270 19 Q282 20 283 33 Q288 152 283 268 Q282 281 268 283 Q148 288 28 283 Q15 282 14 268 Q9 152 13 34 Q14 23 22 22 Z",
    "M30 14 Q154 8 278 13 Q290 14 291 27 Q296 148 291 276 Q290 288 276 290 Q152 296 32 291 Q19 290 18 276 Q12 146 19 26 Q20 15 30 14 Z",
    "M28 16 Q152 14 272 14 Q285 15 286 28 Q290 148 288 270 Q287 283 273 285 Q152 290 32 288 Q18 287 17 273 Q11 152 14 32 Q15 17 28 16 Z",
    "M24 20 Q148 12 268 17 Q283 18 284 31 Q294 150 285 274 Q284 286 270 288 Q146 294 30 285 Q16 284 15 270 Q8 148 17 28 Q18 21 24 20 Z",
  ],
};

/* three gloss placements per aspect, so the shine never sits in the
   same spot on neighbouring cards */
const TICKS: Record<DrawnAspect, { light: string; dark: string }[]> = {
  wide: [
    { light: "M60 26 Q200 20 340 24", dark: "M80 236 Q220 242 330 238" },
    { light: "M96 24 Q230 19 356 25", dark: "M52 234 Q180 241 300 237" },
    { light: "M44 28 Q170 21 300 23", dark: "M120 238 Q250 243 352 239" },
  ],
  tall: [
    { light: "M40 26 Q130 20 220 24", dark: "M50 372 Q130 378 210 374" },
    { light: "M56 24 Q140 18 214 26", dark: "M36 370 Q120 377 196 372" },
    { light: "M34 28 Q120 22 206 24", dark: "M64 374 Q150 379 224 375" },
  ],
  square: [
    { light: "M50 24 Q150 18 250 22", dark: "M60 278 Q160 284 250 280" },
    { light: "M80 22 Q180 17 268 24", dark: "M40 276 Q140 283 232 279" },
    { light: "M38 26 Q140 19 236 21", dark: "M84 280 Q190 285 262 281" },
  ],
};

const BOLTS: Record<DrawnAspect, [number, number][]> = {
  wide: [
    [34, 32],
    [366, 34],
    [32, 228],
    [368, 226],
  ],
  tall: [
    [36, 34],
    [224, 36],
    [34, 366],
    [226, 364],
  ],
  square: [
    [34, 32],
    [266, 34],
    [32, 268],
    [268, 266],
  ],
};

/* how far each bolt missed its mark, by seed — nobody drills four holes
   perfectly — and how hard the crooked one twisted */
const BOLT_JITTER: [number, number][][] = [
  [[0, 0], [1, -2], [-2, 1], [2, 2]],
  [[-2, 1], [0, 0], [2, -1], [-1, 2]],
  [[1, 2], [-1, -1], [0, 2], [-2, 0]],
  [[2, -1], [-2, 2], [1, 0], [0, -2]],
  [[-1, -2], [2, 1], [-2, -1], [1, 1]],
];
const BOLT_TWIST = [12, -9, 14, -11, 8];

/* a resting rotation for whole cards, picked by the same seed — the
   caller applies it to the wrapper so frame and content lean together */
const TILTS = ["-rotate-[1deg]", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-[1.2deg]", "-rotate-[0.8deg]"];
export function drawnTilt(seed: number): string {
  return TILTS[seed % TILTS.length];
}

export function DrawnBg({
  aspect = "wide",
  seed = 0,
  tone = "paper",
  shadow = "sun",
  bolts = false,
  className = "",
}: {
  aspect?: DrawnAspect;
  seed?: number;
  tone?: DrawnTone;
  shadow?: DrawnShadow;
  bolts?: boolean;
  className?: string;
}) {
  const d = PATHS[aspect][seed % PATHS[aspect].length];
  const tick = TICKS[aspect][seed % TICKS[aspect].length];
  const jitter = BOLT_JITTER[seed % BOLT_JITTER.length];
  const crooked = seed % 4;
  const twist = BOLT_TWIST[seed % BOLT_TWIST.length];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`absolute inset-0 h-full w-full ${className}`}
      viewBox={VIEW[aspect]}
      preserveAspectRatio="none"
      fill="none"
    >
      {shadow !== "none" && (
        <path d={d} transform="translate(9 10)" fill={shadow === "sun" ? SUN : FLARE} />
      )}
      <path
        d={d}
        fill={TONE[tone]}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path d={tick.light} stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.35} vectorEffect="non-scaling-stroke" />
      <path d={tick.dark} stroke={SPACE_DARK} strokeWidth={4} strokeLinecap="round" opacity={0.35} vectorEffect="non-scaling-stroke" />
      {bolts && (
        <g stroke={STROKE} strokeLinecap="round">
          {BOLTS[aspect].map(([bx, by], i) => {
            const x = bx + jitter[i][0];
            const y = by + jitter[i][1];
            return (
              <g key={i} transform={i === crooked ? `rotate(${twist} ${x} ${y})` : undefined}>
                <circle cx={x} cy={y} r={7} fill={SUN} strokeWidth={3} />
                <path d={`M${x - 4} ${y} L${x + 4} ${y}`} strokeWidth={2.5} />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}

/* the round sibling — kit patches, stat wells, badges */
const DISC_PATHS = [
  "M100 12 Q146 12 172 46 Q192 74 188 108 Q184 152 148 176 Q118 194 84 186 Q44 176 24 140 Q8 108 18 72 Q30 32 68 18 Q84 12 100 12 Z",
  "M96 14 Q142 10 170 40 Q192 68 190 104 Q188 148 154 174 Q122 194 86 188 Q46 180 26 144 Q10 110 18 74 Q28 36 64 20 Q80 14 96 14 Z",
  "M104 10 Q150 14 174 48 Q194 78 188 112 Q182 154 146 178 Q114 196 80 186 Q42 174 24 138 Q10 106 20 70 Q32 30 70 16 Q86 10 104 10 Z",
];

export function DrawnDiscBg({
  seed = 0,
  tone = "paper",
  shadow = "sun",
  className = "",
}: {
  seed?: number;
  tone?: DrawnTone;
  shadow?: DrawnShadow;
  className?: string;
}) {
  const d = DISC_PATHS[seed % 3];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      fill="none"
    >
      {shadow !== "none" && (
        <path d={d} transform="translate(7 8)" fill={shadow === "sun" ? SUN : FLARE} />
      )}
      <path
        d={d}
        fill={TONE[tone]}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path d="M52 40 Q84 20 124 26" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* a giant lego brick for the podium: three drawn studs on top, a wobbly
   body, the usual thrown shadow. the winner gets the lacquer. */
const LEGO_TONE = {
  flare: { body: FLARE, stud: FLARE, shadow: SUN },
  sun: { body: SUN, stud: SUN, shadow: FLARE },
  paper: { body: PAPER, stud: PAPER, shadow: SUN },
} as const;

export function LegoStep({
  tone = "paper",
  className = "",
}: {
  tone?: keyof typeof LEGO_TONE;
  className?: string;
}) {
  const t = LEGO_TONE[tone];
  const body =
    "M16 40 Q150 34 284 38 Q292 39 293 50 Q296 130 292 202 Q291 212 280 213 Q150 218 22 214 Q11 213 10 202 Q7 128 12 50 Q13 41 16 40 Z";
  const studs = [
    "M40 12 Q66 8 90 11 Q95 12 95 18 L94 44 L38 44 L37 18 Q37 13 40 12 Z",
    "M124 10 Q150 7 174 10 Q179 11 179 17 L178 44 L122 44 L121 16 Q121 11 124 10 Z",
    "M208 12 Q234 9 258 12 Q263 13 263 19 L262 44 L206 44 L205 18 Q205 13 208 12 Z",
  ];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 300 220"
      preserveAspectRatio="none"
      fill="none"
    >
      <path d={body} transform="translate(8 9)" fill={t.shadow} />
      {studs.map((d, i) => (
        <path key={i} d={d} fill={t.stud} stroke={STROKE} strokeWidth={4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={body} fill={t.body} stroke={STROKE} strokeWidth={5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d="M30 54 Q150 48 270 52" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.35} vectorEffect="non-scaling-stroke" />
      <path d="M40 200 Q160 206 262 202" stroke={SPACE_DARK} strokeWidth={4} strokeLinecap="round" opacity={0.35} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* a speech-bubble tail, drawn separately and tucked under a panel's edge */
export function DrawnTail({
  side = "left",
  tone = "paper",
  className = "",
}: {
  side?: "left" | "right";
  tone?: DrawnTone;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width={34}
      height={30}
      viewBox="0 0 34 30"
      fill="none"
    >
      <path
        d={
          side === "left"
            ? "M6 2 Q10 16 4 27 Q18 22 30 4 Z"
            : "M28 2 Q24 16 30 27 Q16 22 4 4 Z"
        }
        fill={TONE[tone]}
        stroke={STROKE}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
  );
}
