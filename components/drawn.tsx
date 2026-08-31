/* the SignBoard's grammar, generalised: every card on the site can be a
   drawn thing — one wobbly path laid down twice (a sun-thrown shadow
   under an inked face), gloss ticks, optional crooked bolts. three
   hand-authored wobbles per aspect (seeds) so neighbours never look
   cloned; preserveAspectRatio="none" stretches the wobble gently and
   non-scaling-stroke keeps the ink even. per-card character (pushpins,
   bands, materials) stays the caller's job. */

import type { ReactNode } from "react";
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

/* the wobbles — corners rounded unevenly, every edge bowed a little */
const PATHS: Record<DrawnAspect, string[]> = {
  wide: [
    "M26 18 Q140 10 260 13 Q346 15 380 20 Q391 22 390 34 Q395 130 390 226 Q389 240 375 242 Q258 250 132 247 Q44 245 24 241 Q13 239 14 227 Q8 130 15 32 Q16 20 26 18 Z",
    "M22 22 Q130 13 250 15 Q342 17 378 24 Q389 26 388 38 Q392 132 388 222 Q387 237 372 239 Q248 246 124 243 Q40 241 21 237 Q11 235 12 223 Q7 133 12 36 Q13 24 22 22 Z",
    "M28 15 Q150 9 268 12 Q352 14 382 18 Q392 20 391 32 Q396 128 392 228 Q391 242 377 244 Q254 251 128 248 Q42 246 25 243 Q14 241 15 229 Q9 127 16 30 Q17 17 28 15 Z",
  ],
  tall: [
    "M24 18 Q120 10 218 14 Q238 16 239 30 Q246 200 240 368 Q239 382 224 384 Q130 391 40 386 Q22 384 21 370 Q14 200 19 32 Q20 20 24 18 Z",
    "M20 24 Q110 14 214 18 Q234 20 235 34 Q241 198 236 364 Q235 378 220 380 Q126 388 38 382 Q20 380 19 366 Q12 202 16 36 Q17 26 20 24 Z",
    "M28 14 Q124 8 220 12 Q240 14 241 28 Q248 196 242 370 Q241 384 226 386 Q134 394 44 388 Q24 386 23 372 Q16 198 22 30 Q23 16 28 14 Z",
  ],
  square: [
    "M26 18 Q150 10 274 16 Q286 17 287 30 Q292 150 287 272 Q286 284 272 286 Q150 292 30 287 Q17 286 16 272 Q10 150 16 30 Q17 19 26 18 Z",
    "M22 22 Q146 13 270 19 Q282 20 283 33 Q288 152 283 268 Q282 281 268 283 Q148 288 28 283 Q15 282 14 268 Q9 152 13 34 Q14 23 22 22 Z",
    "M30 14 Q154 8 278 13 Q290 14 291 27 Q296 148 291 276 Q290 288 276 290 Q152 296 32 291 Q19 290 18 276 Q12 146 19 26 Q20 15 30 14 Z",
  ],
};

const TICKS: Record<DrawnAspect, { light: string; dark: string }> = {
  wide: { light: "M60 26 Q200 20 340 24", dark: "M80 236 Q220 242 330 238" },
  tall: { light: "M40 26 Q130 20 220 24", dark: "M50 372 Q130 378 210 374" },
  square: { light: "M50 24 Q150 18 250 22", dark: "M60 278 Q160 284 250 280" },
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
  const d = PATHS[aspect][seed % 3];
  const tick = TICKS[aspect];
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
          {BOLTS[aspect].map(([x, y], i) => (
            <g key={i} transform={i === 1 ? `rotate(12 ${x} ${y})` : undefined}>
              <circle cx={x} cy={y} r={7} fill={SUN} strokeWidth={3} />
              <path d={`M${x - 4} ${y} L${x + 4} ${y}`} strokeWidth={2.5} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export function DrawnPanel({
  aspect = "wide",
  seed = 0,
  tone = "paper",
  shadow = "sun",
  bolts = false,
  className = "",
  contentClassName = "p-6",
  children,
}: {
  aspect?: DrawnAspect;
  seed?: number;
  tone?: DrawnTone;
  shadow?: DrawnShadow;
  bolts?: boolean;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <DrawnBg aspect={aspect} seed={seed} tone={tone} shadow={shadow} bolts={bolts} />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
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

export function DrawnDisc({
  seed = 0,
  tone = "paper",
  shadow = "sun",
  className = "",
  contentClassName = "",
  children,
}: {
  seed?: number;
  tone?: DrawnTone;
  shadow?: DrawnShadow;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <DrawnDiscBg seed={seed} tone={tone} shadow={shadow} />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
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
