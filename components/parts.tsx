/* physical hardware and prop parts that turn a box into an object:
   screws, domed buttons, pushpins, lanyards, lantern hooks and
   tassels, leds. every svg here has a fixed intrinsic
   size — anything that must stretch with content is css, not svg. */

import Image from "next/image";
import { BLUE, YELLOW, SKY_DEEP, METAL, SUN, SPACE_LIGHT, PAPER } from "./palette";
import type { Partner } from "./partners";

/* ————— fasteners ————— */

export function Screw({
  className = "",
  size = 14,
  turn = 0,
}: {
  className?: string;
  size?: number;
  turn?: number;
}) {
  // a cross-slot screw head, rotated so no two look machine-identical
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" fill={SKY_DEEP} stroke={BLUE} strokeWidth="2" />
      <g transform={`rotate(${turn} 8 8)`}>
        <path d="M8 4.5 V11.5 M4.5 8 H11.5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Screws({ className = "" }: { className?: string }) {
  // four corner screws — a drop-in for a riveted plate
  const spots: [string, number][] = [
    ["left-3 top-3", 12],
    ["right-3 top-3", 40],
    ["left-3 bottom-3", 65],
    ["right-3 bottom-3", 28],
  ];
  return (
    <>
      {spots.map(([spot, turn]) => (
        <Screw key={spot} className={`pointer-events-none absolute ${spot} ${className}`} turn={turn} />
      ))}
    </>
  );
}

export function Pushpin({ className = "", size = 26 }: { className?: string; size?: number }) {
  // a round-headed pushpin, needle going into the paper
  return (
    <svg
      className={className}
      width={size}
      height={size * (36 / 28)}
      viewBox="0 0 28 36"
      fill="none"
      aria-hidden="true"
    >
      <path d="M14 20 L14 34" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="12" r="10" fill={YELLOW} stroke={BLUE} strokeWidth="2.5" />
      <circle cx="10.5" cy="8.5" r="2.5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

/* ————— wear ————— */

/* hand-scratched marks for hard surfaces — metal, lacquer, plastic.
   three arrangements picked by seed: parallel ticks with a stray comma,
   an L-scratch with a lone tick, three short rain ticks. the way worked
   surfaces actually look. */
const SCUFF_MARKS = [
  ["M8 30 L24 14", "M16 36 L32 20", "M62 12 Q68 8 72 14"],
  ["M10 12 L28 10 L32 26", "M58 32 L74 20"],
  ["M8 26 L18 12", "M30 32 L42 16", "M56 24 L64 12"],
];

export function Scuffs({
  className = "",
  seed = 0,
  size = 72,
  color = PAPER,
}: {
  className?: string;
  seed?: number;
  size?: number;
  color?: string;
}) {
  const marks = SCUFF_MARKS[seed % SCUFF_MARKS.length];
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size * (44 / 84)}
      viewBox="0 0 84 44"
      fill="none"
      aria-hidden="true"
    >
      {marks.map((d) => (
        <path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.45}
        />
      ))}
    </svg>
  );
}

/* ————— buttons and controls ————— */

const TONES = {
  yellow: {
    face: "bg-energy text-ink",
    rest: "shadow-[0_5px_0_#d18e07,inset_0_-5px_0_rgba(0,0,0,0.08)]",
    pressed: "hover:shadow-[0_2px_0_#d18e07,inset_0_-5px_0_rgba(0,0,0,0.08)]",
  },
  blue: {
    face: "bg-saigon text-white",
    rest: "shadow-[0_5px_0_#01337f,inset_0_-5px_0_rgba(0,0,0,0.12)]",
    pressed: "hover:shadow-[0_2px_0_#01337f,inset_0_-5px_0_rgba(0,0,0,0.12)]",
  },
} as const;

export function DomeButton({
  tone = "yellow",
  pressable = false,
  className = "",
  children,
}: {
  tone?: keyof typeof TONES;
  pressable?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  // a round domed push-button that fills its wrapper: hard shadow for
  // height, an inset lip at the bottom, a specular gloss up top.
  // `pressable` sinks it on hover. size it with the wrapper.
  const t = TONES[tone];
  return (
    <span
      className={`relative inline-grid h-full w-full place-items-center rounded-full border-[3px] border-saigon ${t.face} ${t.rest} ${
        pressable ? `transition-[translate,box-shadow] duration-150 hover:translate-y-1 ${t.pressed}` : ""
      } ${className}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-[15%] top-[10%] h-[10%] w-[30%] rounded-full bg-white/60" />
      <span className="relative">{children}</span>
    </span>
  );
}

export function Led({ className = "" }: { className?: string }) {
  // a small power light — caller adds motion-safe:animate-led-blink
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full border border-energy-deep bg-energy shadow-[0_0_0_3px_rgba(248,172,26,0.25)] ${className}`}
    />
  );
}

/* ————— stakes ————— */

export function CoilStake({ className = "" }: { className?: string }) {
  // a springy aerial for a mounted sign: three coil loops on a stake,
  // drawn twice so the coil keeps its ink
  return (
    <svg
      className={className}
      width={48}
      height={96}
      viewBox="0 0 48 96"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 14 C 42 6 46 24 24 28 C 2 32 2 48 24 51 C 46 54 44 68 24 70"
        stroke={BLUE}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 14 C 42 6 46 24 24 28 C 2 32 2 48 24 51 C 46 54 44 68 24 70"
        stroke={YELLOW}
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M24 70 L24 92" stroke={BLUE} strokeWidth={7} strokeLinecap="round" />
      <path d="M24 71 L24 90" stroke={SPACE_LIGHT} strokeWidth={3.5} strokeLinecap="round" />
    </svg>
  );
}

/* ————— rings ————— */

export function BinderRing({ className = "", size = 28 }: { className?: string; size?: number }) {
  // a metal ring through punched paper — the rulebook's binding
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="9" stroke={BLUE} strokeWidth="6" />
      <circle cx="14" cy="14" r="9" stroke={METAL} strokeWidth="2.5" />
      <path d="M8 10 A8 8 0 0 1 14 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/* ————— lanyards and lanterns ————— */

export function Lanyard({ className = "" }: { className?: string }) {
  // two straps meeting at a clip — the badge hangs from the clip
  return (
    <svg className={`h-11 w-28 ${className}`} viewBox="0 0 112 44" fill="none" aria-hidden="true">
      <path d="M6 0 L56 34 M106 0 L56 34" stroke={SUN} strokeWidth="6" strokeLinecap="round" />
      <path d="M6 0 L56 34 M106 0 L56 34" stroke={YELLOW} strokeWidth="1.5" strokeDasharray="4 5" />
      <rect x="47" y="30" width="18" height="12" rx="3" fill={YELLOW} stroke={BLUE} strokeWidth="2.5" />
    </svg>
  );
}

export function Hook({ className = "" }: { className?: string }) {
  // a hanging loop with a short stem — the top of a lantern
  return (
    <svg className={`h-4 w-5 ${className}`} viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <circle cx="10" cy="5" r="3.5" fill={YELLOW} stroke={BLUE} strokeWidth="2.5" />
      <path d="M10 8.5 V16" stroke={SUN} strokeWidth="3" />
    </svg>
  );
}

export function Tassel({ className = "" }: { className?: string }) {
  // cord, knot, and three loose threads under a lantern
  return (
    <svg className={`h-7 w-5 ${className}`} viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path d="M10 0 V10" stroke={YELLOW} strokeWidth="3" />
      <rect x="6" y="10" width="8" height="6" rx="2" fill={SPACE_LIGHT} />
      <path d="M7 16 V26 M10 16 V28 M13 16 V25" stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ————— logo slots ————— */

export function LogoSlot({
  partner,
  size = 40,
  className = "",
}: {
  partner: Partner;
  size?: number;
  className?: string;
}) {
  // a slot for a partner's mark, `size` tall. the real logo is shown as-is
  // at its own proportions — never stretched, rotated, recoloured or
  // shadowed (GUIDELINES.md) — and until a mark arrives the slot is a
  // dashed ring with "logo" written inside, the same placeholder the
  // founder badges use
  if (partner.logo) {
    const { src, width, height } = partner.logo;
    const rendered = Math.round((size * width) / height);
    return (
      <Image
        src={src}
        alt={`${partner.name} logo`}
        width={rendered}
        height={size}
        sizes={`${rendered}px`}
        className={`h-auto shrink-0 ${className}`}
      />
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border-[3px] border-dashed border-mist bg-white text-[10px] font-semibold leading-none text-ink/40 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {size >= 40 ? "logo" : null}
    </span>
  );
}

/* ————— subject icons (the cartridge label) ————— */

export type SubjectKind =
  | "math"
  | "language"
  | "science"
  | "history"
  | "chat"
  | "list"
  | "shield"
  | "pin"
  | "gear"
  | "book"
  | "palette"
  | "heart";

export function SubjectIcon({
  kind,
  className = "",
  size = 40,
}: {
  kind: SubjectKind;
  className?: string;
  size?: number;
}) {
  // flat pixel-style icons: a plus tile, a speech bubble, a flask, a pagoda,
  // two chat bubbles, a checklist, a shield, a map pin, a gear, an open
  // book, a palette, a heart
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {kind === "math" && (
        <>
          <rect x="5" y="5" width="30" height="30" rx="8" fill={BLUE} />
          <rect x="17" y="11" width="6" height="18" rx="2" fill={YELLOW} />
          <rect x="11" y="17" width="18" height="6" rx="2" fill={YELLOW} />
        </>
      )}
      {kind === "language" && (
        <>
          <path
            d="M9 6h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H19l-7 7v-7H9a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"
            fill={YELLOW}
          />
          <text x="20" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>
            Aa
          </text>
        </>
      )}
      {kind === "science" && (
        <>
          <path
            d="M15 5h10v11l9 15a3 3 0 0 1-2.6 4.5H8.6A3 3 0 0 1 6 31l9-15V5z"
            fill={BLUE}
          />
          <path d="M12.5 27h15l2.8 4.6a1.5 1.5 0 0 1-1.3 2.4H11a1.5 1.5 0 0 1-1.3-2.4L12.5 27z" fill={YELLOW} />
          <circle cx="17" cy="22" r="2" fill="#fff" opacity="0.8" />
          <circle cx="22" cy="18" r="1.5" fill="#fff" opacity="0.8" />
        </>
      )}
      {kind === "history" && (
        <>
          <path d="M20 4l16 12H4L20 4z" fill={BLUE} />
          <rect x="10" y="17" width="20" height="5" rx="1.5" fill={YELLOW} />
          <path d="M20 21l14 10H6l14-10z" fill={BLUE} />
          <rect x="13" y="31" width="14" height="5" rx="1.5" fill={BLUE} />
        </>
      )}
      {kind === "chat" && (
        <>
          <rect x="4" y="6" width="22" height="15" rx="5" fill={BLUE} />
          <path d="M9 20l-2 7 7-6z" fill={BLUE} />
          <rect x="14" y="17" width="22" height="15" rx="5" fill={YELLOW} />
          <path d="M31 31l2 7-7-6z" fill={YELLOW} />
        </>
      )}
      {kind === "list" && (
        <>
          <rect x="6" y="4" width="28" height="32" rx="5" fill={BLUE} />
          <path d="M12 13l3 3 5-6" stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="12" width="8" height="3" rx="1.5" fill="#fff" opacity="0.8" />
          <path d="M12 22l3 3 5-6" stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="22" y="21" width="8" height="3" rx="1.5" fill="#fff" opacity="0.8" />
          <rect x="11" y="29" width="4" height="3" rx="1" fill="#fff" opacity="0.5" />
          <rect x="22" y="29" width="8" height="3" rx="1.5" fill="#fff" opacity="0.8" />
        </>
      )}
      {kind === "shield" && (
        <>
          <path d="M20 4l14 5v11c0 8-6 13-14 16-8-3-14-8-14-16V9l14-5z" fill={BLUE} />
          <path d="M13 20l5 5 9-10" stroke={YELLOW} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "pin" && (
        <>
          <path d="M20 37c-8-9-13-15-13-21a13 13 0 0 1 26 0c0 6-5 12-13 21z" fill={BLUE} />
          <circle cx="20" cy="16" r="5.5" fill={YELLOW} />
        </>
      )}
      {kind === "book" && (
        <>
          <path d="M4 9a2 2 0 0 1 2-2h9a5 5 0 0 1 5 5v22a4 4 0 0 0-4-4H6a2 2 0 0 1-2-2V9z" fill={BLUE} />
          <path d="M36 9a2 2 0 0 0-2-2h-9a5 5 0 0 0-5 5v22a4 4 0 0 1 4-4h10a2 2 0 0 0 2-2V9z" fill={BLUE} />
          <rect x="8" y="12" width="9" height="2.5" rx="1.25" fill="#fff" opacity="0.8" />
          <rect x="8" y="18" width="9" height="2.5" rx="1.25" fill="#fff" opacity="0.8" />
          <rect x="23" y="12" width="9" height="2.5" rx="1.25" fill="#fff" opacity="0.8" />
          <rect x="23" y="18" width="9" height="2.5" rx="1.25" fill="#fff" opacity="0.8" />
          <path d="M28 7v11l-2.5-2-2.5 2V7z" fill={YELLOW} />
        </>
      )}
      {kind === "palette" && (
        <>
          <path
            d="M20 5c9 0 16 6 16 13.5 0 4-3 6.5-6.5 6.5H26a3 3 0 0 0-2.3 5c1 1.2.2 3-1.3 3H20C11 33 4 27 4 19S11 5 20 5z"
            fill={BLUE}
          />
          <circle cx="12" cy="18" r="3" fill={YELLOW} />
          <circle cx="18" cy="11.5" r="3" fill="#fff" opacity="0.9" />
          <circle cx="26" cy="12.5" r="3" fill={YELLOW} />
          <circle cx="11" cy="26" r="3" fill="#fff" opacity="0.9" />
        </>
      )}
      {kind === "heart" && (
        <>
          <path
            d="M10 7h6v4h8V7h6v4h4v10h-4v4h-4v4h-4v4h-4v-4h-4v-4h-4v-4H6V11h4V7z"
            fill={BLUE}
          />
          <rect x="12" y="11" width="4" height="4" fill={YELLOW} />
        </>
      )}
      {kind === "gear" && (
        <>
          <path
            d="M17 4h6l1 4.5 3.5 1.5 4-2.5 4 4-2.5 4 1.5 3.5 4.5 1v6l-4.5 1-1.5 3.5 2.5 4-4 4-4-2.5-3.5 1.5-1 4.5h-6l-1-4.5-3.5-1.5-4 2.5-4-4 2.5-4-1.5-3.5L4 23v-6l4.5-1 1.5-3.5-2.5-4 4-4 4 2.5 3.5-1.5L17 4z"
            fill={BLUE}
          />
          <circle cx="20" cy="20" r="5.5" fill={YELLOW} />
        </>
      )}
    </svg>
  );
}
