/* bigger illustrated goods: the things you win and the things in the
   builders kit. same rules as decorations.tsx — chunky flat shapes in
   blue and yellow, fixed intrinsic sizes, every one aria-hidden. */

import { BLUE, BLUE_DEEP, YELLOW, YELLOW_DEEP, SKY_LIGHT, SKY_DEEP, INK } from "./palette";

type SvgProps = { className?: string; size?: number } & React.SVGProps<SVGSVGElement>;

export function PartyPopper({ className = "", size = 40, ...rest }: SvgProps) {
  // a party popper mid-pop — the "infinite fun" button
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* cone, striped */}
      <path d="M8 56 L22 22 L42 42 Z" fill={BLUE} />
      <path d="M14 45 L30 37" stroke={YELLOW} strokeWidth="4" strokeLinecap="round" />
      <path d="M10 52 L22 46" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" />
      <path d="M22 22 L42 42" stroke={BLUE_DEEP} strokeWidth="3" strokeLinecap="round" />
      {/* confetti — twinkles for free via AmbientMotion */}
      <g className="ambient-twinkle">
        <rect x="39" y="9" width="7" height="7" rx="1.5" fill="#fff" transform="rotate(20 42.5 12.5)" />
        <circle cx="54" cy="24" r="3.5" fill={BLUE} />
        <path d="M47 34 L54 31" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <rect x="29" y="6" width="5" height="5" rx="1" fill={BLUE} transform="rotate(-15 31.5 8.5)" />
        <path d="M32 19 C35 15 38 20 41 15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="52" cy="10" r="2.5" fill="#fff" />
      </g>
    </svg>
  );
}
