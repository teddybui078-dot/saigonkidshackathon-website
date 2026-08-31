/* bigger illustrated goods: the things you win, the stage they're won on,
   and the badges in the builders kit. same rules as decorations.tsx —
   chunky flat shapes in blue and yellow, fixed intrinsic sizes, every one
   aria-hidden. */

import { BLUE, BLUE_DEEP, YELLOW, YELLOW_DEEP, SKY_LIGHT, SKY_DEEP, METAL } from "./palette";

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

/* ————— things you win ————— */

export function Trophy({ className = "", size = 140, ...rest }: SvgProps) {
  // the cup: big loop handles, a code mark engraved on the bowl, a star on
  // the stem, a stepped base with a brushed name plate, rays off the rim
  return (
    <svg
      className={className}
      width={size}
      height={size * (190 / 160)}
      viewBox="0 0 160 190"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* rays */}
      <path d="M80 4 V18 M44 14 L52 26 M116 14 L108 26" stroke={YELLOW} strokeWidth="6" strokeLinecap="round" />
      {/* handles */}
      <path d="M40 50 H22 A15 15 0 0 0 22 80 H42" stroke={YELLOW} strokeWidth="9" strokeLinecap="round" />
      <path d="M120 50 H138 A15 15 0 0 1 138 80 H118" stroke={YELLOW} strokeWidth="9" strokeLinecap="round" />
      {/* bowl */}
      <path d="M40 36 H120 V80 A40 40 0 0 1 40 80 Z" fill={YELLOW} stroke={BLUE_DEEP} strokeWidth="3" />
      <rect x="34" y="30" width="92" height="12" rx="4" fill={YELLOW_DEEP} stroke={BLUE_DEEP} strokeWidth="2" />
      <path d="M50 48 V72" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      {/* the engraving: a code mark */}
      <path d="M66 62 L56 74 L66 86" stroke={BLUE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M85 58 L77 90" stroke={BLUE} strokeWidth="6" strokeLinecap="round" />
      <path d="M96 62 L106 74 L96 86" stroke={BLUE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* stem with a star */}
      <rect x="70" y="118" width="20" height="24" rx="3" fill={BLUE} />
      <path
        d="M80 122 L82.5 127.5 L88 128 L84 132 L85 137.5 L80 135 L75 137.5 L76 132 L72 128 L77.5 127.5 Z"
        fill={YELLOW}
      />
      {/* base */}
      <rect x="52" y="141" width="56" height="14" rx="4" fill={BLUE} />
      <rect x="40" y="155" width="80" height="18" rx="5" fill={BLUE} />
      <rect x="56" y="159" width="48" height="10" rx="2" fill={METAL} stroke={BLUE_DEEP} strokeWidth="1.5" />
      <rect x="32" y="173" width="96" height="13" rx="5" fill={BLUE_DEEP} />
      <rect x="42" y="177" width="6" height="5" rx="1" fill={YELLOW} />
      <rect x="112" y="177" width="6" height="5" rx="1" fill={YELLOW} />
    </svg>
  );
}

const MEDAL_TONES = {
  gold: { face: YELLOW, rim: YELLOW_DEEP, numeral: "1" },
  silver: { face: SKY_LIGHT, rim: SKY_DEEP, numeral: "2" },
  bronze: { face: YELLOW_DEEP, rim: "#a86f06", numeral: "3" },
} as const;

/* the notched edge of a medal: 24 little bumps around the disc */
const MEDAL_NOTCHES = Array.from({ length: 24 }, (_, i) => {
  const a = (i * Math.PI) / 12;
  return { cx: (40 + 27 * Math.cos(a)).toFixed(1), cy: (86 + 27 * Math.sin(a)).toFixed(1) };
});

export function Medal({
  tone = "gold",
  className = "",
  size = 72,
  ...rest
}: SvgProps & { tone?: keyof typeof MEDAL_TONES }) {
  // a striped ribbon through a ring, a notched disc, the place embossed on
  // it as a numeral. tone picks the metal.
  const t = MEDAL_TONES[tone];
  return (
    <svg
      className={className}
      width={size}
      height={size * (118 / 80)}
      viewBox="0 0 80 118"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M20 0 L36 0 L46 52 L30 60 Z" fill={BLUE} />
      <path d="M60 0 L44 0 L34 52 L50 60 Z" fill={BLUE_DEEP} />
      <path d="M27 0 L39 46" stroke={YELLOW} strokeWidth="4" />
      <path d="M53 0 L41 46" stroke={YELLOW} strokeWidth="4" />
      <circle cx="40" cy="60" r="6" stroke={t.rim} strokeWidth="4" />
      {MEDAL_NOTCHES.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="4" fill={t.rim} />
      ))}
      <circle cx="40" cy="86" r="27" fill={t.rim} />
      <circle cx="40" cy="86" r="22" fill={t.face} />
      <circle cx="40" cy="86" r="17" stroke={t.rim} strokeWidth="2" />
      <text x="40" y="95" textAnchor="middle" fontSize="26" fontWeight="700" fill={BLUE}>
        {t.numeral}
      </text>
      <circle cx="31" cy="76" r="4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export type RosetteSymbol = "star" | "palette" | "rocket";

/* the scalloped edge of a rosette */
const ROSETTE_SCALLOPS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  return { cx: (40 + 26 * Math.cos(a)).toFixed(1), cy: (38 + 26 * Math.sin(a)).toFixed(1) };
});

export function Rosette({
  symbol = "star",
  className = "",
  size = 72,
  ...rest
}: SvgProps & { symbol?: RosetteSymbol }) {
  // an award rosette: scalloped yellow disc, white ring, a blue centre
  // carrying the award's own symbol, two ribbon tails
  return (
    <svg
      className={className}
      width={size}
      height={size * (110 / 80)}
      viewBox="0 0 80 110"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M28 58 L22 108 L34 100 L40 108 L40 60 Z" fill={BLUE} />
      <path d="M52 58 L58 108 L46 100 L40 108 L40 60 Z" fill={BLUE_DEEP} />
      {ROSETTE_SCALLOPS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="8" fill={YELLOW} />
      ))}
      <circle cx="40" cy="38" r="27" fill={YELLOW} />
      <circle cx="40" cy="38" r="21" fill="#fff" />
      <circle cx="40" cy="38" r="16" fill={BLUE} />
      {symbol === "star" && (
        <path
          d="M40 27 L43.2 34 L50.6 34.8 L45.1 39.9 L46.7 47.2 L40 43.4 L33.3 47.2 L34.9 39.9 L29.4 34.8 L36.8 34 Z"
          fill={YELLOW}
        />
      )}
      {symbol === "palette" && (
        <>
          <path
            d="M40 27c7 0 12 4.5 12 10 0 3-2 5-5 5h-3a2 2 0 0 0-1.5 3.5c.7.8.2 2-1 2H40c-7 0-12-4.5-12-10.5S33 27 40 27z"
            fill={YELLOW}
          />
          <circle cx="34" cy="35" r="2" fill={BLUE} />
          <circle cx="40" cy="31.5" r="2" fill="#fff" />
          <circle cx="46" cy="34" r="2" fill={BLUE} />
        </>
      )}
      {symbol === "rocket" && (
        <>
          <path d="M40 26c5 4 7 10 7 16v6H33v-6c0-6 2-12 7-16z" fill={YELLOW} />
          <circle cx="40" cy="38" r="3" fill={BLUE} />
          <path d="M33 42l-4 5h4zM47 42l4 5h-4z" fill={YELLOW} />
          <path d="M37 48h6l-3 6z" fill="#fff" />
        </>
      )}
    </svg>
  );
}

export function PrizeTag({
  children,
  className = "",
  tone = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "yellow" | "white";
}) {
  // a luggage tag: pointed left end, a punched hole, blue outline. css so
  // the text can be any length — callers hang it from a hook or a string.
  return (
    <span
      className={`clip-tag relative inline-block bg-saigon ${className}`}
      style={{ "--nose": "14px" } as React.CSSProperties}
    >
      <span
        className={`clip-tag absolute inset-[3px] left-[5px] ${tone === "yellow" ? "bg-energy" : "bg-white"}`}
        aria-hidden="true"
      />
      <span className="relative flex items-center gap-2 py-1.5 pl-[calc(var(--nose)+1.1rem)] pr-4 text-sm font-bold text-ink">
        <span
          aria-hidden="true"
          className="absolute left-[calc(var(--nose)+1px)] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-saigon bg-white"
        />
        {children}
      </span>
    </span>
  );
}

/* ————— the stage ————— */

/* pennants along the string: x positions and the string's height there
   (a quadratic from y 6 at the ends to y 20 in the middle) */
const PENNANTS = [50, 140, 230, 320, 410, 500, 590, 680, 770].map((x, i) => {
  const t = x / 800;
  return { x, y: 6 + 56 * t * (1 - t), tone: (["yellow", "blue", "white"] as const)[i % 3] };
});

export function Bunting({ className = "", ...rest }: Omit<SvgProps, "size">) {
  // a sagging string of pennants — stretched to whatever width the caller
  // gives it, so the flags widen a touch on a wide stage
  return (
    <svg
      className={className}
      viewBox="0 0 800 70"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M0 6 Q400 34 800 6" stroke={BLUE} strokeWidth="3" vectorEffect="non-scaling-stroke" />
      {PENNANTS.map((p) => (
        <path
          key={p.x}
          d={`M${p.x - 22} ${p.y.toFixed(1)} H${p.x + 22} L${p.x} ${(p.y + 34).toFixed(1)} Z`}
          fill={p.tone === "yellow" ? YELLOW : p.tone === "blue" ? BLUE : "#fff"}
          stroke={BLUE}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function Spotlight({ className = "", width = 90, ...rest }: Omit<SvgProps, "size"> & { width?: number }) {
  // a stage lamp on a short arm with a soft beam under it — the caller
  // rotates the wrapper from the lamp head to aim it
  return (
    <svg
      className={className}
      width={width}
      height={width * (200 / 120)}
      viewBox="0 0 120 200"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M44 48 L76 48 L118 200 L2 200 Z" fill="#fff" opacity="0.3" />
      <rect x="56" y="0" width="8" height="14" fill={BLUE} />
      <rect x="40" y="10" width="40" height="34" rx="6" fill={BLUE_DEEP} stroke={BLUE} strokeWidth="3" />
      <rect x="44" y="40" width="32" height="8" rx="3" fill={YELLOW} />
      <rect x="46" y="16" width="10" height="5" rx="2" fill="#fff" opacity="0.5" />
    </svg>
  );
}

/* a sixteen-point burst, pointy tips and stubby valleys */
const BURST = Array.from({ length: 32 }, (_, i) => {
  const a = (i * Math.PI) / 16 - Math.PI / 2;
  const r = i % 2 === 0 ? 100 : 64;
  return `${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(" L");

export function Starburst({ className = "", size = 220, ...rest }: SvgProps) {
  // the flash behind the winner
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
      <path d={`M${BURST} Z`} fill={YELLOW} />
      <circle cx="100" cy="100" r="58" fill="#fff" opacity="0.92" />
    </svg>
  );
}

/* ————— the builders kit ————— */

export function ToteBag({
  layer,
  className = "",
  width = 220,
  ...rest
}: SvgProps & { layer: "back" | "front"; width?: number }) {
  // a canvas tote in two layers so the goods can start inside it: the back
  // is the handles and the dark inside of the mouth, the front is the body
  // with its yellow band and label. draw them either side of the goods.
  const h = width * (240 / 220);
  return (
    <svg
      className={className}
      width={width}
      height={h}
      viewBox="0 0 220 240"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {layer === "back" ? (
        <>
          <path d="M70 84 C70 26 150 26 150 84" stroke={BLUE_DEEP} strokeWidth="12" strokeLinecap="round" />
          <path d="M70 84 C70 26 150 26 150 84" stroke={YELLOW} strokeWidth="2" strokeDasharray="4 7" />
          <rect x="20" y="78" width="180" height="40" rx="12" fill={BLUE_DEEP} />
        </>
      ) : (
        <>
          <rect x="20" y="96" width="180" height="134" rx="14" fill={BLUE} />
          <path d="M20 110 H200" stroke={BLUE_DEEP} strokeWidth="3" />
          <rect x="20" y="152" width="180" height="24" fill={YELLOW} />
          <path d="M28 164 H192" stroke={YELLOW_DEEP} strokeWidth="2" strokeDasharray="5 6" />
          <g fill={YELLOW}>
            <rect x="40" y="122" width="10" height="10" rx="2" />
            <rect x="54" y="122" width="10" height="10" rx="2" opacity="0.6" />
            <rect x="40" y="136" width="10" height="10" rx="2" opacity="0.6" />
          </g>
          <text x="110" y="208" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">
            builders kit
          </text>
          <circle cx="170" cy="130" r="9" fill={YELLOW} />
          <circle cx="170" cy="130" r="4" fill={BLUE} />
        </>
      )}
    </svg>
  );
}

export type KitKind = "snacks" | "stickers" | "hat" | "wristbands";

export function KitIcon({ kind, className = "", size = 40 }: { kind: KitKind; className?: string; size?: number }) {
  // simple flat marks for the four things in the bag: a cookie, a star
  // sticker with a peeled corner, a cap, a wristband with its clasp
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {kind === "snacks" && (
        <>
          <circle cx="20" cy="21" r="15" fill={BLUE} />
          <g fill={YELLOW}>
            <rect x="11" y="15" width="4" height="4" rx="1" />
            <rect x="20" y="11" width="4" height="4" rx="1" />
            <rect x="25" y="21" width="4" height="4" rx="1" />
            <rect x="13" y="25" width="4" height="4" rx="1" />
            <rect x="21" y="28" width="4" height="4" rx="1" />
          </g>
          <circle cx="32" cy="10" r="6" fill="#fff" />
        </>
      )}
      {kind === "stickers" && (
        <>
          <path
            d="M20 4 L24.7 14.6 L36.2 15.8 L27.6 23.5 L30 34.8 L20 29 L10 34.8 L12.4 23.5 L3.8 15.8 L15.3 14.6 Z"
            fill={BLUE}
          />
          <path d="M30 34.8 L35.5 33.3 L31.6 28.5 Z" fill={YELLOW} />
          <circle cx="17" cy="16" r="2" fill="#fff" opacity="0.7" />
        </>
      )}
      {kind === "hat" && (
        <>
          <path d="M8 24 C8 12 32 12 32 24 Z" fill={BLUE} />
          <circle cx="20" cy="12" r="2.5" fill={YELLOW} />
          <rect x="17" y="17" width="6" height="5" rx="1" fill={YELLOW} />
          <path d="M8 24 C14 28 30 29 37 25 L36 29 C29 33 14 32 7 28 Z" fill={YELLOW} />
        </>
      )}
      {kind === "wristbands" && (
        <>
          <rect x="4" y="14" width="32" height="12" rx="6" fill={BLUE} />
          <circle cx="10" cy="20" r="1.8" fill="#fff" />
          <circle cx="30" cy="20" r="1.8" fill="#fff" />
          <rect x="16" y="11" width="8" height="18" rx="2" fill={YELLOW} />
          <rect x="18.5" y="16" width="3" height="8" rx="1" fill={BLUE} />
        </>
      )}
    </svg>
  );
}

export function KitBadge({ kind, className = "", size = 120 }: { kind: KitKind; className?: string; size?: number }) {
  // a round patch: white face, blue ring, a dashed yellow stitch, the mark
  // in the middle — the "logo" of each thing in the kit
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full border-4 border-ink-deep bg-white shadow-[0_6px_0_#ffd166] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="absolute inset-[7px] rounded-full border-2 border-dashed border-energy" />
      <KitIcon kind={kind} size={Math.round(size * 0.55)} />
    </span>
  );
}
