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

/* ————— the props ————— */

/* a saturn: a tilted ring passes behind the body, then in front of it */
export function RingedPlanet({ className = "", width = 220, ...rest }: SpaceArtProps) {
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
        <clipPath id="ringed-planet-clip">
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
      <g clipPath="url(#ringed-planet-clip)">
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

/* a satellite whose screen shows the code mark; its signal arcs blink */
export function CodingSatellite({ className = "", width = 260, ...rest }: SpaceArtProps) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (200 / 260)}
      viewBox="0 0 260 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g className="hero-signal">
        <path d="M172 52 C178 46 186 44 194 46" stroke={SUN} strokeWidth={4} strokeLinecap="round" />
        <path d="M176 38 C186 30 200 28 212 34" stroke={SUN} strokeWidth={4} strokeLinecap="round" />
      </g>
      <path d="M96 112 C90 110 84 110 78 112" stroke={STROKE} strokeWidth={5} strokeLinecap="round" />
      <path d="M164 112 C170 110 176 110 182 112" stroke={STROKE} strokeWidth={5} strokeLinecap="round" />
      <path d="M12 88 C34 85 58 85 80 88 C82 104 82 120 80 136 C58 138 34 138 12 136 C10 120 10 104 12 88 Z" fill={SPACE_LIGHT} stroke={STROKE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M35 87 C34 103 34 119 35 137" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M58 87 C57 103 57 119 58 137" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M12 112 C34 110 58 110 80 112" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M38 90 C44 89 50 89 55 90 C56 96 56 103 55 109 C50 110 44 110 38 109 C37 103 37 96 38 90 Z" fill={SUN} />
      <path d="M180 88 C202 85 226 85 248 88 C250 104 250 120 248 136 C226 138 202 138 180 136 C178 120 178 104 180 88 Z" fill={SPACE_LIGHT} stroke={STROKE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M203 87 C202 103 202 119 203 137" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M226 87 C225 103 225 119 226 137" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M180 112 C202 110 226 110 248 112" stroke={SUN} strokeWidth={2} strokeLinecap="round" />
      <path d="M206 114 C212 113 218 113 223 114 C224 120 224 127 223 133 C218 134 212 134 206 133 C205 127 205 120 206 114 Z" fill={SUN} />
      <path d="M130 66 C131 58 131 50 130 42" stroke={STROKE} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx="146" cy="50" rx="24" ry="11" transform="rotate(-25 146 50)" fill={PAPER} stroke={STROKE} strokeWidth={5} />
      <path d="M150 48 C158 44 166 42 172 44" stroke={STROKE} strokeWidth={4} strokeLinecap="round" />
      <circle cx="172" cy="46" r="6" fill={FLARE} stroke={STROKE} strokeWidth={4} />
      <path d="M96 68 C118 63 142 63 164 68 C168 88 168 112 164 132 C142 137 118 137 96 132 C92 112 92 88 96 68 Z" fill={PAPER} stroke={STROKE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M108 82 C122 80 138 80 152 82 C154 94 154 106 152 118 C138 120 122 120 108 118 C106 106 106 94 108 82 Z" fill={SPACE} stroke={STROKE} strokeWidth={4} strokeLinejoin="round" />
      <path d="M122 92 C118 94 115 97 114 100 C115 103 118 106 122 108" stroke={SUN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M138 92 C142 94 145 97 146 100 C145 103 142 106 138 108" stroke={SUN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 90 C131 96 129 104 126 110" stroke={SUN} strokeWidth={4} strokeLinecap="round" />
      <path d="M102 74 C106 72 111 71 116 72" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <path d="M100 124 C99 121 99 118 100 115" stroke={PAPER} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <path d="M22 92 C26 91 30 91 33 92" stroke={PAPER} strokeWidth={3} strokeLinecap="round" opacity={0.7} />
      <path d="M190 92 C194 91 198 91 201 92" stroke={PAPER} strokeWidth={3} strokeLinecap="round" opacity={0.7} />
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
