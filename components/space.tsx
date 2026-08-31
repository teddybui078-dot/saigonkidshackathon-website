/* the hero's space props, drawn by hand in the comic-sticker style: fat
   ink outlines, flat fills, edges that bow a little, a gloss tick here and
   there. same contract as decorations.tsx — a fixed viewBox, `width` sets
   the size, `...rest` carries data-* through, every one aria-hidden.
   colours come from palette.ts only. */

import type { ReactNode, SVGProps } from "react";
import {
  SPACE,
  SPACE_DARK,
  SPACE_LIGHT,
  SUN,
  YELLOW,
  FLARE,
  STROKE,
  PAPER,
  CANVAS,
  MIST,
  SKY_LIGHT,
} from "./palette";
import { HERO_LAYER, type HeroLayer } from "./hero-layers";
import { WordmarkArt } from "./Wordmark";

type SpaceArtProps = { className?: string; width?: number } & SVGProps<SVGSVGElement>;

/* ————— the layer wrapper ————— */

/* one absolutely-positioned, decorative, click-through box per depth.
   the z-index is read from HERO_LAYER so the stack order lives in one
   place; callers add positioning/size classes on top */
export function HeroLayerShell({
  layer,
  className = "",
  children,
}: {
  layer: HeroLayer;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: HERO_LAYER[layer] }}
    >
      {children}
    </div>
  );
}

/* ————— the grain ————— */

/* an svg filter that fills whatever it is applied to with fine
   monochrome noise. rendered once; the overlay div references it by id */
export function GrainFilter({ id }: { id: string }) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0 0.5 0.9" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

/* the grain's coarse sibling: blotchy chalk tooth instead of fine sand.
   laid once over the whole hero so every flat fill picks up the same
   paper, and it rasterises exactly once */
export function ChalkFilter({ id }: { id: string }) {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.15 0.6 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}

/* ————— the sign board ————— */

/* the red-lacquer board itself, drawn instead of boxed: a trapezoid that
   leans a degree, edges that bow, corners rounded unevenly. it stands on
   its own stems now — a lotus-crowned bamboo post above, a bamboo post
   into a stacked lego foot below, a lego collar over the top joint. the
   yellow drop shadow is the same path nudged, the bevels are gloss ticks,
   the bolts are drawn in (one crooked, as ever), and the wordmark sits
   inside the same viewBox so nothing can ever drift apart */
export function SignBoard({ className = "", width = 780, ...rest }: SpaceArtProps) {
  const outer =
    "M52 38 Q240 30 420 32 Q610 34 734 40 Q750 42 751 58 Q758 200 750 366 Q749 382 732 384 Q540 394 380 392 Q200 390 44 386 Q26 385 27 368 Q20 200 33 55 Q35 40 52 38 Z";
  return (
    <svg
      className={className}
      width={width}
      height={width * (640 / 780)}
      viewBox="0 0 780 640"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* the lotus riding the top stem, breathing */}
      <g className="lotus-breathe">
        <path
          d="M370 36 C 364 48 370 60 390 65 C 388 50 381 41 370 36 Z"
          fill={FLARE}
          stroke={STROKE}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path
          d="M422 36 C 428 48 422 60 402 65 C 404 50 411 41 422 36 Z"
          fill={FLARE}
          stroke={STROKE}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path
          d="M396 20 C 386 34 383 48 396 62 C 409 48 406 34 396 20 Z"
          fill={FLARE}
          stroke={STROKE}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <ellipse cx={396} cy={64} rx={17} ry={7} fill={SUN} stroke={STROKE} strokeWidth={3} />
      </g>
      {/* the top stem: bamboo culms down into the board */}
      <path
        d="M381 72 Q377 112 380 156 L412 156 Q415 112 411 72 Q396 67 381 72 Z"
        fill={SUN}
        stroke={STROKE}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M379 114 L413 113" stroke={STROKE} strokeWidth={3} strokeLinecap="round" />
      {/* the bottom stem, drawn first so the board overlaps its joint */}
      <path
        d="M382 500 Q379 545 381 588 L407 588 Q410 545 406 500 Z"
        fill={SUN}
        stroke={STROKE}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      {/* the board assembly, shifted down to sit between the stems */}
      <g transform="translate(0 118)">
        {/* the shadow the sun throws — the board again, nudged and gold */}
        <path d={outer} transform="translate(12 13)" fill={SUN} />
        {/* the lacquer */}
        <path d={outer} fill={FLARE} stroke={STROKE} strokeWidth={6} strokeLinejoin="round" />
        {/* the white board, wobbled on its own */}
        <path
          d="M78 70 Q250 64 420 66 Q580 68 706 72 Q718 73 719 86 Q726 210 718 336 Q717 350 703 351 Q520 358 380 356 Q230 354 80 350 Q66 349 67 336 Q60 210 66 84 Q67 71 78 70 Z"
          fill={PAPER}
          stroke={STROKE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        {/* bevels as brush ticks: light where the sun grazes, dark below */}
        <g strokeLinecap="round" fill="none">
          <path d="M92 50 Q240 44 378 46" stroke={PAPER} strokeWidth={6} opacity={0.35} />
          <path d="M41 92 Q37 180 40 258" stroke={PAPER} strokeWidth={6} opacity={0.35} />
          <path d="M124 376 Q320 382 560 378" stroke={SPACE_DARK} strokeWidth={6} opacity={0.4} />
          <path d="M743 122 Q748 220 742 318" stroke={SPACE_DARK} strokeWidth={6} opacity={0.4} />
        </g>
        {/* the corner bolts, one a little crooked, as ever */}
        <g stroke={STROKE} strokeLinecap="round">
          <circle cx={57} cy={55} r={9} fill={SUN} strokeWidth={4} />
          <path d="M52 55 L62 55" strokeWidth={3} />
          <g transform="rotate(12 727 57)">
            <circle cx={727} cy={57} r={9} fill={SUN} strokeWidth={4} />
            <path d="M722 57 L732 57" strokeWidth={3} />
          </g>
          <circle cx={55} cy={367} r={9} fill={SUN} strokeWidth={4} />
          <path d="M50 367 L60 367" strokeWidth={3} />
          <circle cx={728} cy={366} r={9} fill={SUN} strokeWidth={4} />
          <path d="M723 366 L733 366" strokeWidth={3} />
        </g>
        {/* the name, painted on the board */}
        <WordmarkArt transform="translate(64 70) scale(0.93)" />
      </g>
      {/* the lego collar clipped over the top joint, studs up */}
      <g strokeLinejoin="round">
        <rect x={362} y={132} width={24} height={13} rx={2} fill={SUN} stroke={STROKE} strokeWidth={3} />
        <rect x={406} y={132} width={24} height={13} rx={2} fill={SUN} stroke={STROKE} strokeWidth={3} />
        <rect x={348} y={143} width={96} height={28} rx={3} fill={YELLOW} stroke={STROKE} strokeWidth={4} />
      </g>
      {/* the lego foot the bottom stem plugs into */}
      <g strokeLinejoin="round">
        <rect x={358} y={574} width={24} height={13} rx={2} fill={SUN} stroke={STROKE} strokeWidth={3} />
        <rect x={406} y={574} width={24} height={13} rx={2} fill={SUN} stroke={STROKE} strokeWidth={3} />
        <rect x={346} y={585} width={96} height={28} rx={3} fill={YELLOW} stroke={STROKE} strokeWidth={4} />
        <rect x={370} y={613} width={48} height={24} rx={3} fill={FLARE} stroke={STROKE} strokeWidth={4} />
      </g>
    </svg>
  );
}

/* ————— the crater moon ————— */

/* a small pale moon, cratered like the terrain below — the sky's quiet
   cousin of the ground the scene stands on */
export function CraterMoon({ className = "", width = 160, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <circle cx={80} cy={80} r={64} fill={CANVAS} stroke={STROKE} strokeWidth={5} />
      <ellipse cx={58} cy={62} rx={16} ry={13} fill={MIST} stroke={STROKE} strokeWidth={3} strokeOpacity={0.5} />
      <ellipse cx={102} cy={96} rx={12} ry={10} fill={MIST} stroke={STROKE} strokeWidth={3} strokeOpacity={0.5} />
      <ellipse cx={76} cy={118} rx={8} ry={6} fill={MIST} stroke={STROKE} strokeWidth={2.5} strokeOpacity={0.5} />
      <circle cx={112} cy={52} r={6} fill={MIST} />
      <path d="M40 40 Q56 26 78 24" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    </svg>
  );
}

/* ————— the swirl planet ————— */

/* a dark quiet planet, brushed with wind-bands like the sky behind it.
   made to sit half-hidden behind the sign; clipId must be unique per
   instance or the clips collide */
export function SwirlPlanet({
  className = "",
  width = 200,
  clipId = "swirl-planet-clip",
  ...rest
}: SpaceArtProps & { clipId?: string }) {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="86" />
        </clipPath>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="86"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${clipId})`} strokeLinecap="round" fill="none">
        <path d="M4 62 C 40 48, 84 70, 124 58 C 152 50, 178 56, 200 66" stroke={SPACE_DARK} strokeWidth="16" opacity="0.55" />
        <path d="M-2 106 C 44 92, 92 114, 136 102 C 164 95, 186 100, 204 108" stroke={SPACE_DARK} strokeWidth="12" opacity="0.45" />
        <path d="M8 146 C 48 134, 96 152, 140 142 C 166 136, 186 140, 200 146" stroke={SUN} strokeWidth="7" opacity="0.5" />
        <path d="M30 34 C 62 26, 98 38, 132 30" stroke={PAPER} strokeWidth="4" opacity="0.4" />
      </g>
      <circle cx="100" cy="100" r="94" stroke={PAPER} strokeWidth="2" strokeOpacity="0.3" />
    </svg>
  );
}

/* ————— the sky swirls ————— */

/* broad wind-bands brushed across the sky, cresting with the orbit track
   so the whole sky turns around one centre. filled ribbons of uneven
   thickness, like brush pressure; the caller blends them soft-light into
   the gradient so the stars stay on top */
export function SkySwirls({ className = "", width = 1440, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (900 / 1440)}
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* the high band, widest sweep */}
      <path
        d="M-60 306 C 168 224 440 156 728 158 C 1014 160 1272 226 1500 318 L 1500 434 C 1268 338 1016 272 736 268 C 452 264 196 330 -60 428 Z"
        fill={SPACE_LIGHT}
        opacity={0.5}
      />
      {/* a thin chalk streak riding just under it */}
      <path
        d="M-60 470 C 220 386 470 330 742 326 C 1020 322 1250 372 1500 452 L 1500 474 C 1246 396 1018 348 744 352 C 474 356 228 410 -60 494 Z"
        fill={PAPER}
        opacity={0.08}
      />
      {/* the low band, dimmer, dipping behind the skyline */}
      <path
        d="M-60 640 C 240 552 500 502 748 500 C 1000 498 1240 546 1500 628 L 1500 742 C 1236 656 998 610 746 612 C 498 614 252 664 -60 756 Z"
        fill={SPACE_LIGHT}
        opacity={0.32}
      />
      {/* two short brush flicks where the wind broke */}
      <path
        d="M150 512 C 250 484 350 466 470 462 L 468 486 C 352 490 256 508 158 534 Z"
        fill={SPACE_LIGHT}
        opacity={0.4}
      />
      <path
        d="M1010 574 C 1120 570 1230 586 1330 616 L 1322 640 C 1226 610 1122 594 1014 598 Z"
        fill={SPACE_LIGHT}
        opacity={0.36}
      />
    </svg>
  );
}

/* ————— the props ————— */

/* a saturn: a tilted ring passes behind the body, then in front of it.
   clipId must be unique per instance or the clips collide */
export function RingedPlanet({
  className = "",
  width = 220,
  clipId = "ringed-planet-clip",
  ...rest
}: SpaceArtProps & { clipId?: string }) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (160 / 220)}
      viewBox="0 0 220 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="110" cy="80" r="52" />
        </clipPath>
      </defs>
      <g transform="rotate(-18 110 80)">
        <path
          d="M 10 80 A 100 22 0 0 1 210 80"
          stroke={STROKE}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 10 80 A 100 22 0 0 1 210 80"
          stroke={SUN}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle
        cx="110"
        cy="80"
        r="52"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M 52 66 C 70 60, 88 72, 108 66 C 128 60, 146 70, 170 64"
          stroke={SUN}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 50 98 C 72 92, 92 104, 114 98 C 136 92, 152 102, 172 96"
          stroke={SUN}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="rotate(-18 110 80)">
        <path
          d="M 10 80 A 100 22 0 0 0 210 80"
          stroke={STROKE}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 10 80 A 100 22 0 0 0 210 80"
          stroke={SUN}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 22 86 A 98 18 0 0 0 198 86"
          stroke={PAPER}
          strokeWidth="2"
          strokeOpacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M 78 52 C 82 46, 88 42, 94 40"
        stroke={PAPER}
        strokeWidth="5"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="102" r="2.5" fill={PAPER} />
      <circle cx="196" cy="54" r="2.5" fill={PAPER} />
      <circle cx="174" cy="120" r="2" fill={PAPER} />
    </svg>
  );
}

/* the curve of a big planet, meant to bleed off the top-right corner */
export function EarthHorizon({ className = "", width = 420, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (220 / 420)}
      viewBox="0 0 420 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <clipPath id="earth-horizon-clip">
          <circle cx="330" cy="-40" r="300" />
        </clipPath>
      </defs>
      <circle cx="330" cy="-40" r="311" stroke={PAPER} strokeWidth="3" opacity="0.35" />
      <circle cx="330" cy="-40" r="300" fill={SPACE_LIGHT} stroke={STROKE} strokeWidth="6" />
      <g clipPath="url(#earth-horizon-clip)">
        <path
          d="M118 44 C136 26 176 24 198 42 C218 58 214 82 196 96 C176 112 148 110 130 92 C116 78 106 60 118 44 Z"
          fill={SUN}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M252 128 C272 112 312 116 330 136 C346 154 346 184 326 198 C304 214 270 208 256 188 C242 170 236 142 252 128 Z"
          fill={SUN}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M350 30 C368 18 400 22 416 40 C428 56 424 84 404 92 C386 100 362 92 352 76 C342 62 338 40 350 30 Z"
          fill={SUN}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M186 104 C196 100 208 106 214 114" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M62 58 C72 44 86 32 102 22" stroke={PAPER} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <path d="M186 178 C190 190 198 200 208 208" stroke={PAPER} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <path d="M52 76 C54 70 58 64 62 60" stroke={PAPER} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* the rocket, nose up, flame down — the flame group flickers via css */
export function Rocket({ className = "", width = 160, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (300 / 160)}
      viewBox="0 0 160 300"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <defs>
        <clipPath id="rocket-body-clip">
          <path d="M 80 20 C 100 45 115 90 115 130 C 115 175 113 205 112 230 C 95 232 65 232 48 230 C 47 205 45 175 45 130 C 45 90 60 45 80 20 Z" />
        </clipPath>
      </defs>
      <g className="hero-flame">
        <path
          d="M 60 246 C 60 268 72 288 80 296 C 88 288 100 268 100 246 Z"
          fill={FLARE}
          stroke={STROKE}
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M 68 246 C 68 263 75 277 80 284 C 85 277 92 263 92 246 Z"
          fill={SUN}
          stroke={STROKE}
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M 74 246 C 74 256 77 265 80 270 C 83 265 86 256 86 246 Z" fill={PAPER} />
        <path
          d="M 67 258 Q 66 266 69 274"
          stroke={PAPER}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>
      <path
        d="M 62 230 C 60 236 58 242 57 246 C 72 249 88 249 103 246 C 102 242 100 236 98 230 Z"
        fill={SPACE_DARK}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 50 175 C 35 195 25 220 22 245 C 32 240 42 236 50 234 Z"
        fill={FLARE}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 110 175 C 125 195 135 220 138 245 C 128 240 118 236 110 234 Z"
        fill={FLARE}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 80 20 C 100 45 115 90 115 130 C 115 175 113 205 112 230 C 95 232 65 232 48 230 C 47 205 45 175 45 130 C 45 90 60 45 80 20 Z"
        fill={PAPER}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 45 165 C 60 172 75 185 80 190 C 85 185 100 172 115 165 L 115 185 C 100 192 85 205 80 210 C 75 205 60 192 45 185 Z"
        fill={SUN}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        clipPath="url(#rocket-body-clip)"
      />
      <path
        d="M 80 20 C 100 45 111 70 113 92 C 95 96 65 96 47 92 C 49 70 60 45 80 20 Z"
        fill={FLARE}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 80 20 C 100 45 115 90 115 130 C 115 175 113 205 112 230 C 95 232 65 232 48 230 C 47 205 45 175 45 130 C 45 90 60 45 80 20 Z"
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={80} cy={130} r={18} fill={SPACE} stroke={STROKE} strokeWidth={5} />
      <path
        d="M 70 122 Q 74 116 81 115"
        stroke={PAPER}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M 67 52 Q 70 42 76 34"
        stroke={PAPER}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M 56 108 Q 54 130 56 152"
        stroke={MIST}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M 30 238 Q 34 232 40 230"
        stroke={PAPER}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.7}
      />
    </svg>
  );
}

/* a kid in a spacesuit, waving, laptop in the other hand */
export function KidAstronaut({ className = "", width = 200, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (240 / 200)}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d="M66 150 C44 142 34 112 12 120 C-2 126 6 146 -6 160"
        stroke={STROKE}
        strokeWidth={4}
        strokeDasharray="6 8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 124 C60 142 60 166 66 182 C88 186 112 186 136 182 C140 166 140 142 136 124 C112 118 88 118 64 124 Z"
        fill={FLARE}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path
        d="M65 140 C63 146 63 152 65 158"
        stroke={PAPER}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M84 186 C80 196 82 204 86 208 C90 210 94 210 98 208 C100 200 98 192 96 186 Z"
        fill={PAPER}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M104 186 C102 196 102 204 106 208 C110 210 114 210 118 208 C120 200 118 192 116 186 Z"
        fill={PAPER}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M76 206 C74 214 76 222 82 224 C90 226 96 226 102 224 C104 216 102 208 98 204 C92 202 84 202 76 206 Z"
        fill={SUN}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M102 204 C100 210 100 218 104 224 C110 226 118 226 124 224 C128 220 128 212 126 206 C118 202 108 202 102 204 Z"
        fill={SUN}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M74 124 C70 150 70 174 78 186 C92 190 108 190 122 186 C130 174 130 150 126 124 C110 120 90 120 74 124 Z"
        fill={PAPER}
        stroke={STROKE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path
        d="M126 132 C142 122 152 108 160 90"
        stroke={STROKE}
        strokeWidth={18}
        strokeLinecap="round"
      />
      <path
        d="M126 132 C142 122 152 108 160 90"
        stroke={PAPER}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle cx={163} cy={82} r={12} fill={SUN} stroke={STROKE} strokeWidth={5} />
      <circle cx={174} cy={91} r={5.5} fill={SUN} stroke={STROKE} strokeWidth={4} />
      <path
        d="M158 76 C156 77 155 79 155 81"
        stroke={PAPER}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M74 134 C62 142 54 154 48 168"
        stroke={STROKE}
        strokeWidth={18}
        strokeLinecap="round"
      />
      <path
        d="M74 134 C62 142 54 154 48 168"
        stroke={PAPER}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d="M16 154 C16 150 20 148 24 148 C34 147 46 147 56 148 C60 148 62 152 62 156 C63 164 63 174 62 182 C62 186 58 188 54 188 C44 189 32 189 22 188 C18 188 16 184 16 180 C15 172 15 162 16 154 Z"
        fill={SPACE}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path
        d="M30 160 L24 168 L30 176"
        stroke={SUN}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 160 L54 168 L48 176"
        stroke={SUN}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M42 158 L36 178" stroke={SUN} strokeWidth={3} strokeLinecap="round" />
      <circle cx={46} cy={174} r={11} fill={SUN} stroke={STROKE} strokeWidth={5} />
      <circle cx={36} cy={168} r={5} fill={SUN} stroke={STROKE} strokeWidth={4} />
      <circle cx={100} cy={154} r={16} fill={SUN} stroke={STROKE} strokeWidth={4} />
      <rect x={91} y={145} width={7} height={7} rx={1.5} fill={SPACE} stroke={STROKE} strokeWidth={1.5} />
      <rect x={100} y={145} width={7} height={7} rx={1.5} fill={SPACE} stroke={STROKE} strokeWidth={1.5} />
      <rect x={91} y={154} width={7} height={7} rx={1.5} fill={SPACE} stroke={STROKE} strokeWidth={1.5} />
      <rect x={100} y={154} width={7} height={7} rx={1.5} fill={YELLOW} stroke={STROKE} strokeWidth={1.5} />
      <path
        d="M72 124 C80 120 120 120 128 124 C126 132 74 132 72 124 Z"
        fill={MIST}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <circle cx={100} cy={70} r={58} fill={PAPER} stroke={STROKE} strokeWidth={6} />
      <path
        d="M62 42 C62 36 66 34 72 34 C90 33 110 33 128 34 C134 34 138 38 138 44 C139 60 139 80 138 96 C138 102 134 106 128 106 C110 107 90 107 72 106 C66 106 62 102 62 96 C61 80 61 60 62 42 Z"
        fill={SPACE}
        stroke={STROKE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <ellipse cx={100} cy={74} rx={28} ry={25} fill={PAPER} stroke={STROKE} strokeWidth={4} />
      <circle cx={89} cy={69} r={4} fill={STROKE} />
      <circle cx={111} cy={69} r={4} fill={STROKE} />
      <path
        d="M88 80 Q100 92 112 80"
        stroke={STROKE}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={80} cy={80} r={5} fill={SUN} opacity={0.8} />
      <circle cx={120} cy={80} r={5} fill={SUN} opacity={0.8} />
      <path
        d="M70 48 C70 42 74 40 78 40"
        stroke={PAPER}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M68 60 C68 56 69 54 70 52"
        stroke={PAPER}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M60 32 C66 26 72 22 78 20"
        stroke={PAPER}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M82 210 C84 208 88 208 90 208"
        stroke={PAPER}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />
    </svg>
  );
}

/* the cratered ground along the bottom edge; stretched by the caller */
export function MoonTerrain({ className = "", width = 1440, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (260 / 1440)}
      viewBox="0 0 1440 260"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d="M0 110 C 120 98, 220 96, 340 108 C 450 118, 540 122, 640 110 C 720 100, 800 100, 900 112 C 1020 126, 1140 124, 1260 112 C 1340 104, 1400 112, 1440 120 L 1440 260 L 0 260 Z"
        fill={CANVAS}
      />
      <path
        d="M0 110 C 120 98, 220 96, 340 108 C 450 118, 540 122, 640 110 C 720 100, 800 100, 900 112 C 1020 126, 1140 124, 1260 112 C 1340 104, 1400 112, 1440 120"
        stroke={STROKE}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <ellipse cx={180} cy={128} rx={52} ry={16} fill={MIST} stroke={STROKE} strokeWidth={5} vectorEffect="non-scaling-stroke" />
      <path d="M136 132 C 146 141, 168 145, 190 142" stroke={STROKE} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
      <path d="M150 121 C 158 118, 166 118, 174 120" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} vectorEffect="non-scaling-stroke" />
      <ellipse cx={560} cy={142} rx={44} ry={13} fill={MIST} stroke={STROKE} strokeWidth={5} vectorEffect="non-scaling-stroke" />
      <path d="M522 146 C 532 153, 550 156, 568 154" stroke={STROKE} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
      <ellipse cx={720} cy={140} rx={120} ry={22} fill={MIST} stroke={STROKE} strokeWidth={5} vectorEffect="non-scaling-stroke" />
      <path d="M612 146 C 632 160, 690 166, 750 160" stroke={STROKE} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
      <path d="M660 126 C 680 122, 700 121, 720 122" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} vectorEffect="non-scaling-stroke" />
      <ellipse cx={900} cy={134} rx={40} ry={12} fill={MIST} stroke={STROKE} strokeWidth={5} vectorEffect="non-scaling-stroke" />
      <path d="M866 138 C 874 145, 890 148, 906 146" stroke={STROKE} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
      <ellipse cx={1250} cy={130} rx={56} ry={17} fill={MIST} stroke={STROKE} strokeWidth={5} vectorEffect="non-scaling-stroke" />
      <path d="M1202 134 C 1214 144, 1236 148, 1262 145" stroke={STROKE} strokeWidth={4} strokeLinecap="round" opacity={0.5} vectorEffect="non-scaling-stroke" />
      <path d="M1222 123 C 1232 120, 1242 119, 1252 121" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} vectorEffect="non-scaling-stroke" />
      <circle cx={80} cy={160} r={9} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <ellipse cx={400} cy={172} rx={12} ry={8} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <circle cx={470} cy={156} r={6} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <ellipse cx={1010} cy={176} rx={13} ry={8} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <circle cx={1090} cy={150} r={7} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <circle cx={1370} cy={168} r={9} fill={PAPER} stroke={STROKE} strokeWidth={4} vectorEffect="non-scaling-stroke" />
      <path d="M270 190 C 282 188, 294 188, 306 190" stroke={SKY_LIGHT} strokeWidth={5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M820 200 C 834 198, 848 198, 862 200" stroke={SKY_LIGHT} strokeWidth={5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M1160 196 C 1172 194, 1184 194, 1196 196" stroke={SKY_LIGHT} strokeWidth={5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}


/* ————— the street: saigon props for the lantern-sign hero ————— */

export function LotusFinial({ className = "", width = 84, ...rest }: SpaceArtProps) {
  const petal = "M 42 44 C 34 38, 32 18, 42 8 C 52 17, 50 37, 42 44 Z";
  return (
    <svg
      className={className}
      width={width}
      height={width * (64 / 84)}
      viewBox="0 0 84 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g transform="rotate(-60 42 46)">
        <path d={petal} fill={FLARE} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g transform="rotate(60 42 46)">
        <path d={petal} fill={FLARE} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g transform="rotate(-30 42 46)">
        <path d={petal} fill={FLARE} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g transform="rotate(30 42 46)">
        <path d={petal} fill={FLARE} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <path d={petal} fill={FLARE} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path
        d="M 39.5 19 C 39 15.5, 40 12.5, 42 10.5"
        stroke={PAPER}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 40 55 C 32 51, 24 53, 20 59 C 27 62, 35 60, 40 55 Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 44 55 C 52 51, 60 53, 64 59 C 57 62, 49 60, 44 55 Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 37 53 C 36 57, 37 60, 39.5 61.5 C 41 62.2, 43 62.2, 44.5 61.5 C 47 60, 48 57, 47 53 C 43.5 55.5, 40.5 55.5, 37 53 Z"
        fill={YELLOW}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="42" cy="46" r="9" fill={SUN} stroke={STROKE} strokeWidth="3" strokeLinejoin="round" />
      <path
        d="M 38 43 C 38.5 41.5, 40 40.5, 41.5 40.5"
        stroke={PAPER}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* landmark 81 as a bundle of bamboo culms on a podium — the grounded anchor */
export function Landmark81({ className = "", width = 360, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (900 / 360)}
      viewBox="0 0 360 900"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d="M20 858Q17 676 20 494A14 14 0 0 1 48 494Q51 676 48 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M62 858Q59 608 62 357A17 17 0 0 1 96 357Q99 608 96 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M110 858Q107 539 110 220A20 20 0 0 1 150 220Q153 539 150 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M160 858Q156 489 160 120A24 24 0 0 1 208 120Q212 489 208 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M214 858Q211 549 214 240A20 20 0 0 1 254 240Q257 549 254 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M262 858Q259 618 262 377A17 17 0 0 1 296 377Q299 618 296 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M306 858Q303 686 306 514A14 14 0 0 1 334 514Q337 686 334 858Z"
        fill={SPACE_LIGHT}
        stroke={STROKE}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M41 856V496Q41 486 46 492V856ZM88 856V356Q88 346 94 352V856ZM140 856V216Q140 206 148 212V856ZM196 856V112Q196 100 206 108V856ZM244 856V236Q244 226 252 232V856ZM288 856V376Q288 366 294 372V856ZM327 856V516Q327 506 332 512V856Z"
        fill={SPACE_DARK}
        opacity="0.5"
      />
      <path
        d="M20 540h28M20 544h28M20 600h28M20 604h28M20 660h28M20 664h28M20 720h28M20 724h28M20 780h28M20 784h28M62 400h34M62 404h34M62 460h34M62 464h34M62 520h34M62 524h34M62 580h34M62 584h34M62 640h34M62 644h34M62 700h34M62 704h34M62 760h34M62 764h34M110 260h40M110 264h40M110 320h40M110 324h40M110 380h40M110 384h40M110 440h40M110 444h40M110 500h40M110 504h40M110 560h40M110 564h40M110 620h40M110 624h40M110 680h40M110 684h40M110 740h40M110 744h40M110 800h40M110 804h40M160 160h48M160 164h48M160 220h48M160 224h48M160 280h48M160 284h48M160 340h48M160 344h48M160 400h48M160 404h48M160 460h48M160 464h48M160 520h48M160 524h48M160 580h48M160 584h48M160 640h48M160 644h48M160 700h48M160 704h48M160 760h48M160 764h48M214 280h40M214 284h40M214 340h40M214 344h40M214 400h40M214 404h40M214 460h40M214 464h40M214 520h40M214 524h40M214 580h40M214 584h40M214 640h40M214 644h40M214 700h40M214 704h40M214 760h40M214 764h40M262 420h34M262 424h34M262 480h34M262 484h34M262 540h34M262 544h34M262 600h34M262 604h34M262 660h34M262 664h34M262 720h34M262 724h34M262 780h34M262 784h34M306 560h28M306 564h28M306 620h28M306 624h28M306 680h28M306 684h28M306 740h28M306 744h28M306 800h28M306 804h28"
        stroke={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 542h5M24 602h5M24 662h5M24 722h5M24 782h5M66 402h5M66 462h5M66 522h5M66 582h5M66 642h5M66 702h5M66 762h5M114 262h6M114 322h6M114 382h6M114 442h6M114 502h6M114 562h6M114 622h6M114 682h6M114 742h6M114 802h6M164 162h6M164 222h6M164 282h6M164 342h6M164 402h6M164 462h6M164 522h6M164 582h6M164 642h6M164 702h6M164 762h6M218 282h6M218 342h6M218 402h6M218 462h6M218 522h6M218 582h6M218 642h6M218 702h6M218 762h6M266 422h5M266 482h5M266 542h5M266 602h5M266 662h5M266 722h5M266 782h5M310 562h5M310 622h5M310 682h5M310 742h5M310 802h5"
        stroke={PAPER}
        strokeWidth="2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <g className="tower-windows">
        <rect x="26" y="556" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="36" y="616" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="26" y="676" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="36" y="736" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="69" y="416" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="81" y="476" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="69" y="536" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="81" y="656" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="69" y="716" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <g className="tower-windows">
        <rect x="118" y="272" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="134" y="332" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="118" y="392" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="134" y="452" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="118" y="512" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="134" y="572" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="118" y="692" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="134" y="752" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <g className="tower-windows">
        <rect x="170" y="178" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="190" y="238" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="170" y="298" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="190" y="358" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="170" y="418" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <g className="tower-windows">
        <rect x="190" y="478" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="170" y="538" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="190" y="598" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="170" y="658" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="190" y="718" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="170" y="778" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <g className="tower-windows">
        <rect x="222" y="292" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="238" y="352" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="222" y="412" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="238" y="472" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="222" y="532" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="238" y="652" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="222" y="712" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <g className="tower-windows">
        <rect x="269" y="432" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="281" y="492" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="269" y="552" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="281" y="672" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="269" y="732" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="312" y="572" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="322" y="632" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="312" y="692" width="6" height="10" rx="1.5" fill={SUN} />
        <rect x="322" y="752" width="6" height="10" rx="1.5" fill={SUN} />
      </g>
      <path
        d="M118 240C120 230 124 222 130 216"
        stroke={PAPER}
        strokeWidth="4"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M168 176C169 166 172 158 177 152"
        stroke={PAPER}
        strokeWidth="4"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M222 258C224 248 228 240 234 234"
        stroke={PAPER}
        strokeWidth="4"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M184 98C183 78 184 58 184 38"
        stroke={STROKE}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="184" cy="38" r="8" fill={FLARE} stroke={STROKE} strokeWidth="3" />
      <rect
        x="162"
        y="120"
        width="44"
        height="30"
        rx="6"
        fill={PAPER}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="175" cy="129" r="4.5" stroke={SPACE} strokeWidth="3" />
      <circle cx="175" cy="139" r="5.5" stroke={SPACE} strokeWidth="3" />
      <path
        d="M187 128L193 124V144"
        stroke={SPACE}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="tower-cloud" opacity="0.85">
        <ellipse cx="150" cy="398" rx="75" ry="18" fill={MIST} />
        <ellipse cx="235" cy="412" rx="55" ry="14" fill={MIST} />
      </g>
      <rect
        x="12"
        y="856"
        width="336"
        height="26"
        rx="8"
        fill={SKY_LIGHT}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Foliage({ className = "", width = 640, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (520 / 640)}
      viewBox="0 0 640 520"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g className="frond">
        <path
          d="M 598 498 C 640 360 590 180 340 96"
          stroke={STROKE}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 606 470 Q 581 458 556 470 Q 581 482 606 470 Z M 610 433 Q 630 420 638 398 Q 618 410 610 433 Z M 609 400 Q 580 398 556 412 Q 584 414 609 400 Z M 608 366 Q 628 354 636 332 Q 616 344 608 366 Z M 601 333 Q 572 332 548 346 Q 576 348 601 333 Z M 589 299 Q 616 289 634 266 Q 606 276 589 299 Z M 574 268 Q 545 267 520 282 Q 549 283 574 268 Z M 551 234 Q 577 221 592 196 Q 566 209 551 234 Z M 527 207 Q 498 208 474 224 Q 503 223 527 207 Z M 492 175 Q 514 159 524 134 Q 502 149 492 175 Z M 462 152 Q 434 155 412 172 Q 440 169 462 152 Z M 430 133 Q 448 115 452 90 Q 434 107 430 133 Z M 398 118 Q 371 122 350 140 Q 377 136 398 118 Z M 362 102 Q 352 78 330 64 Q 340 88 362 102 Z"
          fill={SPACE}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 598 498 C 640 360 590 180 340 96"
          stroke={SPACE}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g className="leaf-b">
        <path
          d="M 601 501 C 590 448 574 392 556 336"
          stroke={SPACE_LIGHT}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 558 338 Q 570 155 432 44 Q 424 225 558 338 Z"
          fill={SPACE_DARK}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 558 338 Q 496 190 436 48"
          stroke={SPACE_LIGHT}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 533 279 Q 545 262 549 242 M 509 221 Q 520 202 528 181 M 484 163 Q 494 146 500 127 M 460 105 Q 464 92 466 81 M 521 250 Q 503 248 489 238 M 497 192 Q 481 192 467 185 M 472 134 Q 458 135 447 130 M 448 77 Q 442 74 438 68"
          stroke={SPACE_LIGHT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 452 84 Q 462 100 470 116"
          stroke={PAPER}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </g>
      <g className="leaf-a">
        <path
          d="M 601 501 C 548 468 480 424 434 380"
          stroke={SPACE_LIGHT}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 432 382 Q 325 155 84 108 Q 150 290 290 336 L 318 310 L 352 350 Q 400 368 432 382 Z"
          fill={SPACE_DARK}
          stroke={STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 432 382 Q 270 240 90 112"
          stroke={SPACE_LIGHT}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 366 326 Q 362 300 350 278 M 300 271 Q 297 244 285 214 M 231 217 Q 228 192 217 164 M 161 164 Q 158 148 150 133 M 333 298 Q 315 316 288 326 M 266 244 Q 248 262 224 271 M 196 190 Q 180 205 156 213 M 126 138 Q 116 146 104 150"
          stroke={SPACE_LIGHT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 190 180 Q 220 172 248 178"
          stroke={PAPER}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M 270 218 Q 294 212 318 218"
          stroke={PAPER}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

export function BrickPile({ className = "", width = 260, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (160 / 260)}
      viewBox="0 0 260 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g stroke={STROKE} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M 4 152 Q 120 156 252 151" />
        <path
          fill={YELLOW}
          d="M 13 123 Q 36 121 59 124 Q 64 124 64 129 L 64 145 Q 64 150 59 150 Q 36 152 13 149 Q 8 149 8 144 L 8 128 Q 8 123 13 123 Z"
        />
        <rect x="16" y="117" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="32" y="117" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="48" y="118" width="8" height="6" rx="2" fill={YELLOW} />
        <path
          fill={SUN}
          d="M 69 121 Q 92 119 115 121 Q 120 121 120 126 L 120 142 Q 120 147 115 147 Q 92 149 69 147 Q 64 147 64 142 L 64 126 Q 64 121 69 121 Z"
        />
        <rect x="72" y="115" width="8" height="6" rx="2" fill={SUN} />
        <rect x="88" y="115" width="8" height="6" rx="2" fill={SUN} />
        <rect x="104" y="115" width="8" height="6" rx="2" fill={SUN} />
        <path
          fill={YELLOW}
          d="M 125 124 Q 148 121 171 122 Q 176 122 176 127 L 176 143 Q 176 148 171 148 Q 148 151 125 149 Q 120 149 120 144 L 120 129 Q 120 124 125 124 Z"
        />
        <rect x="128" y="118" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="144" y="117" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="160" y="117" width="8" height="6" rx="2" fill={YELLOW} />
        <path
          fill={SUN}
          d="M 181 122 Q 204 120 227 123 Q 232 123 232 128 L 232 144 Q 232 149 227 149 Q 204 150 181 148 Q 176 148 176 143 L 176 127 Q 176 122 181 122 Z"
        />
        <rect x="184" y="116" width="8" height="6" rx="2" fill={SUN} />
        <rect x="200" y="116" width="8" height="6" rx="2" fill={SUN} />
        <rect x="216" y="117" width="8" height="6" rx="2" fill={SUN} />
        <path
          fill={SUN}
          d="M 41 96 Q 64 94 87 97 Q 92 97 92 102 L 92 117 Q 92 122 87 122 Q 64 124 41 121 Q 36 121 36 116 L 36 101 Q 36 96 41 96 Z"
        />
        <rect x="44" y="90" width="8" height="6" rx="2" fill={SUN} />
        <rect x="60" y="90" width="8" height="6" rx="2" fill={SUN} />
        <rect x="76" y="90" width="8" height="6" rx="2" fill={SUN} />
        <path
          fill={FLARE}
          d="M 99 94 Q 122 92 145 95 Q 150 95 150 100 L 150 115 Q 150 120 145 120 Q 122 122 99 120 Q 94 120 94 115 L 94 99 Q 94 94 99 94 Z"
        />
        <rect x="102" y="88" width="8" height="6" rx="2" fill={FLARE} />
        <rect x="118" y="88" width="8" height="6" rx="2" fill={FLARE} />
        <rect x="134" y="88" width="8" height="6" rx="2" fill={FLARE} />
        <path d="M 103 101 Q 110 100 117 101" stroke={PAPER} strokeOpacity="0.7" />
        <path
          fill={YELLOW}
          d="M 155 96 Q 178 94 201 95 Q 206 95 206 100 L 206 116 Q 206 121 201 121 Q 178 123 155 122 Q 150 122 150 117 L 150 101 Q 150 96 155 96 Z"
        />
        <rect x="158" y="90" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="174" y="89" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="190" y="89" width="8" height="6" rx="2" fill={YELLOW} />
        <path
          fill={YELLOW}
          d="M 71 69 Q 94 67 117 70 Q 122 70 122 75 L 122 90 Q 122 95 117 95 Q 94 97 71 95 Q 66 95 66 90 L 66 74 Q 66 69 71 69 Z"
        />
        <rect x="74" y="63" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="90" y="63" width="8" height="6" rx="2" fill={YELLOW} />
        <rect x="106" y="63" width="8" height="6" rx="2" fill={YELLOW} />
        <path
          fill={SUN}
          d="M 127 68 Q 150 66 173 69 Q 178 69 178 74 L 178 89 Q 178 94 173 94 Q 150 96 127 94 Q 122 94 122 89 L 122 73 Q 122 68 127 68 Z"
        />
        <rect x="130" y="62" width="8" height="6" rx="2" fill={SUN} />
        <rect x="146" y="62" width="8" height="6" rx="2" fill={SUN} />
        <rect x="162" y="63" width="8" height="6" rx="2" fill={SUN} />
        <g className="brick-free">
          <rect x="102" y="11" width="8" height="6" rx="2" fill={SUN} />
          <rect x="118" y="11" width="8" height="6" rx="2" fill={SUN} />
          <rect x="134" y="11" width="8" height="6" rx="2" fill={SUN} />
          <path
            fill={SUN}
            d="M 99 17 Q 122 15 145 18 Q 150 18 150 23 L 150 38 Q 150 43 145 43 Q 122 45 99 43 Q 94 43 94 38 L 94 22 Q 94 17 99 17 Z"
          />
          <path d="M 103 24 Q 110 23 117 24" stroke={PAPER} strokeOpacity="0.7" />
        </g>
        <path
          fill={MIST}
          strokeWidth="3"
          d="M 207 98 Q 219 93 231 92 Q 235 91 236 95 Q 244 118 247 138 Q 248 142 244 143 Q 232 148 220 149 Q 216 150 215 146 Q 206 124 204 103 Q 203 99 207 98 Z"
        />
        <g fill={SPACE_DARK} stroke="none">
          <circle cx="222" cy="135" r="2" />
          <circle cx="220" cy="128" r="2" />
          <circle cx="218" cy="121" r="2" />
          <circle cx="216" cy="114" r="2" />
          <circle cx="214" cy="107" r="2" />
          <circle cx="233" cy="132" r="2" />
          <circle cx="231" cy="125" r="2" />
          <circle cx="229" cy="118" r="2" />
          <circle cx="227" cy="111" r="2" />
          <circle cx="225" cy="104" r="2" />
        </g>
        <circle className="board-led" cx="218" cy="99" r="4" fill={FLARE} strokeWidth="3" />
        <path d="M 227 93 Q 236 78 250 80" strokeWidth="2.5" />
        <path d="M 214 96 Q 202 82 210 70" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export function SaigonSkyline({ className = "", width = 1440, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (240 / 1440)}
      viewBox="0 0 1440 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* farthest blocks, palest */}
      <g fill={SKY_LIGHT} opacity="0.5">
        <path d="M168 240 L170 158 Q205 153 238 157 L240 240 Z" />
        <path d="M762 240 L764 152 Q800 147 836 151 L838 240 Z" />
      </g>
      {/* mid-distance stepped blocks and the pagoda */}
      <g fill={MIST} opacity="0.7">
        <path d="M56 240 L58 184 Q80 180 102 183 L104 208 L136 210 L138 240 Z" />
        <path d="M258 240 L260 194 Q296 190 330 193 L332 240 Z" />
        <path d="M452 240 L454 174 Q470 170 486 173 L488 196 L518 198 L520 240 Z" />
        <path d="M574 240 L576 184 Q600 179 624 184 L626 240 Z" />
        <path d="M560 208 Q600 197 640 208 Q600 217 560 208 Z" />
        <path d="M566 186 Q600 175 634 186 Q600 193 566 186 Z" />
        <path d="M664 240 L666 198 Q702 193 738 197 L740 240 Z" />
        <path d="M948 240 L950 200 L976 198 L978 176 Q1004 171 1028 176 L1030 240 Z" />
        <path d="M1058 240 L1060 168 Q1098 163 1136 168 L1138 240 Z" />
        <path d="M1162 240 L1164 192 Q1205 187 1246 192 L1248 240 Z" />
        <path d="M1282 240 L1284 176 Q1310 171 1334 175 L1336 202 L1376 204 L1378 240 Z" />
      </g>
      {/* the two landmarks, nearest of the silhouettes */}
      <g opacity="0.9">
        <path d="M338 240 L340 186 Q384 180 428 185 L430 240 Z" fill={MIST} />
        <path d="M352 200 C351 172 352 146 354 130 Q380 124 406 129 C408 148 408 174 408 200 Z" fill={MIST} />
        <path d="M344 134 Q380 90 416 134 Q380 126 344 134 Z" fill={MIST} />
        <circle cx="380" cy="158" r="10" fill={SKY_LIGHT} />
        <path d="M380 151 L380 158 L386 160" stroke={SPACE_DARK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M850 240 C854 190 862 140 872 108 Q876 92 888 90 Q900 92 904 108 C914 140 922 190 926 240 Z" fill={MIST} />
        <path d="M873 128 Q846 119 828 124 Q846 133 874 137 Z" fill={MIST} />
      </g>
    </svg>
  );
}

export function ChalkStar({ className = "", width = 32, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (48 / 48)}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d="M23 3 Q26 19 41 25 Q27 28 25 44 Q22 29 7 24 Q20 19 23 3 Z"
        fill="none"
        stroke={PAPER}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M29 8 Q32 6 35 5"
        fill="none"
        stroke={PAPER}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

