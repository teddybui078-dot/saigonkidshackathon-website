/* the hero's name, drawn by hand — not typeset. every letter is its own
   skeleton path stroked twice (fat ink pass under a colour pass). the
   letters keep even heights and a level baseline so the mark reads
   instantly; the hand shows in the accents instead — a chalk double-pass
   down the first h, and the o wearing a scribbled orbit ring like the
   logo's swoosh. the colours echo the logo lockup: sun "saigon kids"
   over midnight "hackathon". this is lettering, not the logo — it may
   tilt; the circular mark never does */

import type { SVGProps } from "react";
import { BLUE, SUN, STROKE, PAPER } from "./palette";

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

/* "hackathon" — even x-height on a level baseline, a degree of lean at
   most; proportional first, hand-made second */
const BIG: string[] = [
  // h
  "M35 118 Q32 190 36 257 M36 200 Q38 152 62 150 Q86 150 85 202 L84 257",
  // a
  "M160 160 Q110 152 106 204 Q104 250 142 255 Q159 256 161 236 M162 154 Q165 205 161 259",
  // c
  "M240 170 Q190 154 186 206 Q184 252 240 248",
  // k
  "M262 120 Q259 190 262 257 M306 158 Q286 184 264 200 M270 206 Q292 232 308 257",
  // a
  "M386 160 Q336 154 332 204 Q330 250 368 255 Q385 256 387 236 M388 155 Q391 205 387 258",
  // t
  "M420 124 Q417 190 419 236 Q420 253 438 249 M404 166 Q422 160 446 164",
  // h
  "M470 118 Q468 190 471 258 M471 202 Q474 152 496 151 Q519 152 518 203 L517 258",
  // o
  "M572 158 Q534 156 530 205 Q528 250 566 253 Q604 255 601 205 Q599 160 572 158",
  // n
  "M626 154 Q623 205 626 257 M627 200 Q630 152 650 151 Q674 153 672 204 L670 257",
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
      <Pass paths={BIG} stroke={BLUE} width={23} />
      {/* the hand shows here: a chalk double-pass down the first h, and
          the o wearing its orbit ring, front sweep then back tick */}
      <g fill="none" strokeLinecap="round">
        <path d="M37 128 Q33 170 36 212 Q37 234 34 252" stroke={PAPER} strokeWidth={3} opacity={0.3} />
        <path d="M40 198 Q43 158 60 154" stroke={PAPER} strokeWidth={3} opacity={0.3} />
        <path d="M496 212 Q508 250 566 252 Q628 254 642 208" stroke={SUN} strokeWidth={6} opacity={0.95} />
        <path d="M638 200 Q630 180 608 172" stroke={SUN} strokeWidth={5} opacity={0.55} />
      </g>
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
