/* lightweight vector accents echoing the logo: pixel clusters, sparkles,
   orbit swooshes, and code marks. colors are fixed to the brand palette. */

import { BLUE, YELLOW, SKY_LIGHT, CHALK } from "./palette";

export function SparkleCross({
  className = "",
  size = 20,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // a chalked plus, slightly off-square — the star's lazier sibling
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M12 3 L12 21 M4 13 L20 11"
        stroke={CHALK}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.9}
      />
    </svg>
  );
}

export function PixelGrid({
  className = "",
  size = 40,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // the logo's pixel cluster: an offset plus-shape of blue blocks, one yellow
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <rect x="14" y="0" width="10" height="10" rx="2" fill={SKY_LIGHT} />
      <rect x="0" y="12" width="10" height="10" rx="2" fill={SKY_LIGHT} />
      <rect x="28" y="12" width="10" height="10" rx="2" fill={SKY_LIGHT} />
      <rect x="12" y="26" width="10" height="10" rx="2" fill={YELLOW} />
    </svg>
  );
}

export function Sparkle({
  className = "",
  size = 24,
  color = YELLOW,
  ...rest
}: {
  className?: string;
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M12 0c1 5.2 2.6 7.4 12 12-9.4 4.6-11 6.8-12 12-1-5.2-2.6-7.4-12-12C9.4 7.4 11 5.2 12 0z"
        fill={color}
      />
    </svg>
  );
}

export function CodeMark({
  className = "",
  size = 48,
  chevronColor = BLUE,
  ...rest
}: {
  className?: string;
  size?: number;
  chevronColor?: string;
} & React.SVGProps<SVGSVGElement>) {
  // the </> mark from the logo lockup
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M22 10 L8 24 L22 38"
        stroke={chevronColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 6 L34 42"
        stroke={YELLOW}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M58 10 L72 24 L58 38"
        stroke={chevronColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



export function PixelPlanet({
  className = "",
  size = 90,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="50" cy="35" r="22" fill={SKY_LIGHT} />
      <circle cx="42" cy="28" r="5" fill="#f1f5f9" opacity="0.7" />
      <circle cx="58" cy="42" r="3" fill="#f1f5f9" opacity="0.7" />
      <ellipse
        cx="50"
        cy="37"
        rx="44"
        ry="12"
        stroke={BLUE}
        strokeWidth="3"
        opacity="0.55"
      />
    </svg>
  );
}

export function FloatingLaptop({
  className = "",
  width = 90,
  ...rest
}: {
  className?: string;
  width?: number;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.78}
      viewBox="0 0 100 78"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <rect x="22" y="4" width="56" height="42" rx="6" fill="white" stroke={BLUE} strokeWidth="4" />
      <path d="M42 18 L34 25 L42 32" stroke={BLUE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 15 L48 35" stroke={YELLOW} strokeWidth="4" strokeLinecap="round" />
      <path d="M58 18 L66 25 L58 32" stroke={BLUE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 46 L86 46 L94 64 L6 64 Z" fill={SKY_LIGHT} stroke={BLUE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 52 L74 52 M22 57 L78 57" stroke={BLUE} strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

export function FlightArc({
  className = "",
  width = 180,
  color = BLUE,
  ...rest
}: {
  className?: string;
  width?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.5}
      viewBox="0 0 180 90"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M4 86 C40 20 130 6 176 30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
        opacity="0.55"
      />
    </svg>
  );
}

export function PixelStack({
  className = "",
  width = 150,
  ...rest
}: {
  className?: string;
  width?: number;
} & React.SVGProps<SVGSVGElement>) {
  // stacked pixel bricks peeking from a corner (the reference's brick pile)
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.8}
      viewBox="0 0 160 128"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* studs */}
      <rect x="52" y="24" width="14" height="10" rx="3" fill={BLUE} />
      <rect x="78" y="24" width="14" height="10" rx="3" fill={BLUE} />
      <rect x="10" y="66" width="14" height="10" rx="3" fill={YELLOW} />
      <rect x="120" y="66" width="14" height="10" rx="3" fill={BLUE} />
      {/* bricks */}
      <rect x="40" y="32" width="80" height="46" rx="9" fill={BLUE} />
      <rect x="0" y="74" width="76" height="54" rx="9" fill={YELLOW} />
      <rect x="84" y="74" width="76" height="54" rx="9" fill={BLUE} />
      {/* face hints */}
      <rect x="54" y="46" width="10" height="10" rx="2.5" fill="#f1f5f9" opacity="0.5" />
      <rect x="96" y="88" width="10" height="10" rx="2.5" fill="#f1f5f9" opacity="0.5" />
      <rect x="18" y="88" width="10" height="10" rx="2.5" fill="#0145b4" opacity="0.35" />
    </svg>
  );
}

export function PixelClock({
  className = "",
  size = 300,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // a big friendly clock for the schedule — pixel hour marks, hands at 9:00
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="100" cy="100" r="88" fill="white" stroke={BLUE} strokeWidth="10" />
      <rect x="94" y="22" width="12" height="12" rx="3" fill={YELLOW} />
      <rect x="166" y="94" width="12" height="12" rx="3" fill={BLUE} />
      <rect x="94" y="166" width="12" height="12" rx="3" fill={BLUE} />
      <rect x="22" y="94" width="12" height="12" rx="3" fill={BLUE} />
      <path className="clock-hand-h" d="M100 100 L100 52" stroke={BLUE} strokeWidth="9" strokeLinecap="round" />
      <path className="clock-hand-m" d="M100 100 L58 100" stroke={YELLOW} strokeWidth="9" strokeLinecap="round" />
      <circle cx="100" cy="100" r="9" fill={YELLOW} stroke={BLUE} strokeWidth="4" />
    </svg>
  );
}

export function PixelHeart({
  className = "",
  size = 260,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // chunky pixel-block heart — for the people who believe in young builders
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.89}
      viewBox="0 0 180 160"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M30 40 L50 40 L50 20 L80 20 L80 40 L100 40 L100 20 L130 20 L130 40 L150 40 L150 80 L130 80 L130 100 L110 100 L110 120 L90 120 L90 140 L70 140 L70 120 L50 120 L50 100 L30 100 L30 80 L10 80 L10 40 L30 40 Z"
        fill={BLUE}
      />
      <rect x="40" y="34" width="16" height="16" rx="3" fill={YELLOW} />
      <rect x="60" y="52" width="12" height="12" rx="3" fill="#f1f5f9" opacity="0.7" />
      <rect x="118" y="44" width="12" height="12" rx="3" fill={YELLOW} />
    </svg>
  );
}

export function PixelBulb({
  className = "",
  size = 230,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // an idea lightbulb — dream it up, then build it
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.15}
      viewBox="0 0 160 184"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* rays */}
      <g className="bulb-ray">
        <path d="M80 8 L80 22" stroke={YELLOW} strokeWidth="7" strokeLinecap="round" />
        <path d="M28 28 L38 38" stroke={YELLOW} strokeWidth="7" strokeLinecap="round" />
        <path d="M132 28 L122 38" stroke={YELLOW} strokeWidth="7" strokeLinecap="round" />
        <path d="M12 76 L26 76" stroke={YELLOW} strokeWidth="7" strokeLinecap="round" />
        <path d="M148 76 L134 76" stroke={YELLOW} strokeWidth="7" strokeLinecap="round" />
      </g>
      {/* bulb dome */}
      <circle cx="80" cy="80" r="44" fill={YELLOW} />
      <circle cx="66" cy="66" r="10" fill="#fff" opacity="0.45" />
      {/* filament */}
      <path
        d="M68 96 L68 84 L80 92 L92 82 L92 96"
        stroke={BLUE}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* neck + pixel base */}
      <path d="M66 122 L94 122 L92 132 L68 132 Z" fill={BLUE} />
      <rect x="62" y="132" width="36" height="10" rx="3" fill={BLUE} />
      <rect x="66" y="146" width="28" height="10" rx="3" fill={BLUE} />
      <rect x="72" y="160" width="16" height="10" rx="3" fill={BLUE} />
      <rect x="90" y="134" width="6" height="6" rx="1.5" fill={YELLOW} />
    </svg>
  );
}

export function PixelTrophy({
  className = "",
  size = 120,
  ...rest
}: {
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  // a chunky trophy cup — demo day, prizes, high-fives
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M30 14h60v34a30 30 0 0 1-60 0V14z" fill={YELLOW} />
      <path d="M30 24H18a8 8 0 0 0 0 16h12" stroke={YELLOW} strokeWidth="8" strokeLinecap="round" />
      <path d="M90 24h12a8 8 0 0 1 0 16H90" stroke={YELLOW} strokeWidth="8" strokeLinecap="round" />
      <circle cx="42" cy="26" r="5" fill="#fff" opacity="0.5" />
      <rect x="54" y="30" width="12" height="12" rx="2" fill={BLUE} />
      <rect x="52" y="76" width="16" height="14" fill={BLUE} />
      <rect x="36" y="90" width="48" height="10" rx="3" fill={BLUE} />
      <rect x="30" y="102" width="60" height="10" rx="3" fill={BLUE} />
      <rect x="40" y="93" width="6" height="5" rx="1.5" fill={YELLOW} />
    </svg>
  );
}
