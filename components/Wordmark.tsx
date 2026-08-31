/* the hero's name, drawn by hand — not typeset. every letter is its own
   skeleton path stroked twice (fat ink pass under a colour pass), with
   the lean, baseline drift and uneven heights baked into the coordinates
   so no two letters sit alike. the colours echo the logo lockup: sun
   "saigon kids" over midnight "hackathon". this is lettering, not the
   logo — it may tilt; the circular mark never does */

import type { SVGProps } from "react";
import { SPACE, SUN, STROKE } from "./palette";

/* one d string per letter; multi-M strings carry a letter's extra limbs
   (stems, dots, crossbars) so both passes stay in step */

/* "saigon kids" — x-height ~44, baseline wandering around 90 */
const SMALL: string[] = [
  // s
  "M204 52 Q186 48 184 60 Q183 70 198 72 Q213 74 211 85 Q209 95 189 91",
  // a
  "M244 60 Q212 55 210 76 Q209 93 232 93 Q244 93 245 82 M246 58 Q248 76 245 92",
  // i
  "M262 60 Q261 76 263 92 M262 42 L262 42.6",
  // g
  "M302 60 Q276 55 274 75 Q273 91 293 91 Q303 91 304 80 M305 58 Q308 84 304 102 Q300 118 283 112",
  // o
  "M332 60 Q310 60 309 76 Q308 92 328 93 Q348 93 347 76 Q346 61 332 60",
  // n
  "M366 62 Q364 78 366 92 M366 74 Q368 60 380 60 Q392 61 391 76 L390 92",
  // k
  "M432 40 Q430 68 432 92 M454 58 Q444 70 434 76 M438 78 Q450 84 456 92",
  // i
  "M474 60 Q473 76 475 92 M474 42 L474 42.6",
  // d
  "M506 62 Q484 60 483 77 Q482 92 502 92 Q509 92 510 84 M511 42 Q513 70 509 92",
  // s
  "M546 52 Q530 48 528 60 Q527 70 541 72 Q555 74 553 85 Q551 95 532 91",
];

/* "hackathon" — x-height ~110, ascenders reaching for the string above,
   baseline drifting 254–262 like a sign painted freehand */
const BIG: string[] = [
  // h
  "M35 118 Q32 190 38 258 M36 205 Q38 152 62 150 Q88 150 87 205 L85 258",
  // a
  "M162 178 Q110 168 104 214 Q100 258 138 261 Q160 262 163 240 M164 172 Q168 222 162 262",
  // c
  "M238 184 Q192 166 186 212 Q182 252 232 250",
  // k
  "M252 120 Q248 190 252 258 M298 156 Q278 182 254 198 M260 204 Q284 230 300 258",
  // a
  "M378 176 Q328 168 322 212 Q318 254 356 257 Q376 258 379 236 M380 172 Q384 220 378 256",
  // t
  "M418 126 Q414 190 416 234 Q417 252 436 248 M400 170 Q420 163 444 168",
  // h
  "M462 116 Q459 190 464 260 M463 206 Q466 152 490 152 Q514 152 513 206 L511 260",
  // o
  "M570 174 Q530 172 526 214 Q523 254 564 256 Q604 258 601 212 Q598 175 570 174",
  // n
  "M618 156 Q614 205 618 258 M619 198 Q622 152 646 152 Q670 154 668 205 L666 258",
];

function Pass({ paths, stroke, width }: { paths: string[]; stroke: string; width: number }) {
  return (
    <g stroke={stroke} strokeWidth={width}>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

/* the bare letter group, for embedding inside the sign board's own svg
   so frame and lettering share one coordinate space */
export function WordmarkArt(props: SVGProps<SVGGElement>) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <Pass paths={SMALL} stroke={STROKE} width={20} />
      <Pass paths={SMALL} stroke={SUN} width={11} />
      <Pass paths={BIG} stroke={STROKE} width={37} />
      <Pass paths={BIG} stroke={SPACE} width={23} />
    </g>
  );
}

/* the standalone svg, for hanging in the sign on its own */
export function Wordmark({
  className = "",
  width = 700,
  ...rest
}: { className?: string; width?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={width}
      height={width * (300 / 700)}
      viewBox="0 0 700 300"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <WordmarkArt />
    </svg>
  );
}
