/* physical hardware and prop parts that turn a box into an object:
   screws, domed buttons, pushpins, speech tails, lanyards, lantern
   hooks and tassels, leds, knobs. every svg here has a fixed intrinsic
   size — anything that must stretch with content is css, not svg. */

import { BLUE, YELLOW, SKY_DEEP } from "./palette";

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
      <path d="M14 20 L14 34" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="12" r="10" fill={YELLOW} stroke={BLUE} strokeWidth="3" />
      <circle cx="10.5" cy="8.5" r="2.5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

/* ————— buttons and controls ————— */

const TONES = {
  yellow: {
    face: "bg-energy text-ink",
    rest: "shadow-[0_8px_0_#d18e07,inset_0_-5px_0_rgba(0,0,0,0.08)]",
    pressed: "hover:shadow-[0_3px_0_#d18e07,inset_0_-5px_0_rgba(0,0,0,0.08)]",
  },
  blue: {
    face: "bg-saigon text-white",
    rest: "shadow-[0_8px_0_#01337f,inset_0_-5px_0_rgba(0,0,0,0.12)]",
    pressed: "hover:shadow-[0_3px_0_#01337f,inset_0_-5px_0_rgba(0,0,0,0.12)]",
  },
} as const;

const SHAPES = {
  round: { box: "h-full w-full rounded-full", gloss: "left-5 top-3 h-3 w-8" },
  pill: { box: "rounded-full px-7 py-3", gloss: "left-4 top-1.5 h-1.5 w-8" },
} as const;

export function DomeButton({
  shape = "round",
  tone = "yellow",
  pressable = false,
  className = "",
  children,
}: {
  shape?: keyof typeof SHAPES;
  tone?: keyof typeof TONES;
  pressable?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  // a domed push-button: hard shadow for height, an inset lip at the
  // bottom, and a specular gloss up top. `pressable` sinks it on hover.
  const t = TONES[tone];
  const s = SHAPES[shape];
  return (
    <span
      className={`relative inline-grid place-items-center border-4 border-saigon ${s.box} ${t.face} ${t.rest} ${
        pressable ? `transition-[translate,box-shadow] duration-150 hover:translate-y-1.5 ${t.pressed}` : ""
      } ${className}`}
    >
      <span aria-hidden="true" className={`pointer-events-none absolute rounded-full bg-white/60 ${s.gloss}`} />
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

export function Knob({ className = "", turn = 0 }: { className?: string; turn?: number }) {
  // a round dial with an indicator notch
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block h-5 w-5 rounded-full border-2 border-saigon bg-[#a8bfe2] ${className}`}
      style={{ rotate: `${turn}deg` }}
    >
      <span className="absolute left-1/2 top-0.5 h-2 w-0.5 -translate-x-1/2 rounded-full bg-saigon" />
    </span>
  );
}

/* ————— speech, lanyards, lanterns ————— */

export function BubbleTail({
  side = "left",
  fill = "#ffffff",
  className = "",
}: {
  side?: "left" | "right";
  fill?: string;
  className?: string;
}) {
  // an open path: the two curves are stroked, the fill closes across the
  // top on its own and sits over the bubble's border to hide it there.
  return (
    <svg
      className={`pointer-events-none absolute -bottom-[14px] h-[17px] w-5 ${
        side === "left" ? "left-1" : "right-1 -scale-x-100"
      } ${className}`}
      viewBox="0 0 20 17"
      aria-hidden="true"
    >
      <path
        d="M2 0 C3 8.5 8 14 19 17 C10 13 7 7.5 7 0"
        fill={fill}
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Lanyard({ className = "" }: { className?: string }) {
  // two straps meeting at a clip — the badge hangs from the clip
  return (
    <svg className={`h-11 w-28 ${className}`} viewBox="0 0 112 44" fill="none" aria-hidden="true">
      <path d="M6 0 L56 34 M106 0 L56 34" stroke={BLUE} strokeWidth="6" strokeLinecap="round" />
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
      <path d="M10 8.5 V16" stroke={BLUE} strokeWidth="3" />
    </svg>
  );
}

export function Tassel({ className = "" }: { className?: string }) {
  // cord, knot, and three loose threads under a lantern
  return (
    <svg className={`h-7 w-5 ${className}`} viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path d="M10 0 V10" stroke={YELLOW} strokeWidth="3" />
      <rect x="6" y="10" width="8" height="6" rx="2" fill={BLUE} />
      <path d="M7 16 V26 M10 16 V28 M13 16 V25" stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ————— props ————— */

export function PixelGamepad({ className = "", width = 72 }: { className?: string; width?: number }) {
  // a flat gamepad: blue body, white d-pad, yellow face buttons
  return (
    <svg
      className={className}
      width={width}
      height={width * (48 / 72)}
      viewBox="0 0 72 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="14" cy="34" r="12" fill={BLUE} />
      <circle cx="58" cy="34" r="12" fill={BLUE} />
      <rect x="6" y="8" width="60" height="30" rx="12" fill={BLUE} />
      <rect x="15" y="16" width="6" height="16" rx="1.5" fill="#fff" />
      <rect x="10" y="21" width="16" height="6" rx="1.5" fill="#fff" />
      <circle cx="50" cy="18" r="3.5" fill={YELLOW} />
      <circle cx="57" cy="24" r="3.5" fill={YELLOW} />
      <circle cx="43" cy="24" r="3.5" fill={YELLOW} />
      <circle cx="50" cy="30" r="3.5" fill={YELLOW} />
      <rect x="32" y="22" width="4" height="4" rx="1" fill="#fff" opacity="0.7" />
      <rect x="38" y="22" width="4" height="4" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  );
}
