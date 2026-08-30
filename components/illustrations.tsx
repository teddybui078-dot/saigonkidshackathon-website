/* bigger illustrated goods: the things you win and the things in the
   builders kit. same rules as decorations.tsx — chunky flat shapes in
   blue and yellow, fixed intrinsic sizes, every one aria-hidden. */

import { BLUE, BLUE_DEEP, YELLOW, YELLOW_DEEP, SKY_LIGHT, SKY_DEEP } from "./palette";

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

const MEDAL_TONES = {
  gold: { face: YELLOW, rim: YELLOW_DEEP },
  silver: { face: SKY_LIGHT, rim: SKY_DEEP },
  bronze: { face: YELLOW_DEEP, rim: "#a86f06" },
} as const;

export function Medal({
  tone = "gold",
  className = "",
  size = 72,
  ...rest
}: SvgProps & { tone?: keyof typeof MEDAL_TONES }) {
  // a medal on a v-shaped ribbon: two blue straps down to a disc with a
  // pixel star. tone picks the metal.
  const t = MEDAL_TONES[tone];
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.375}
      viewBox="0 0 80 110"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M18 0 L34 0 L46 50 L30 58 Z" fill={BLUE} />
      <path d="M62 0 L46 0 L34 50 L50 58 Z" fill={BLUE_DEEP} />
      <path d="M26 0 L39 44" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="5 5" />
      <path d="M54 0 L41 44" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="5 5" />
      <circle cx="40" cy="78" r="29" fill={t.rim} />
      <circle cx="40" cy="78" r="24" fill={t.face} />
      <circle cx="40" cy="78" r="19" stroke={t.rim} strokeWidth="2.5" />
      <path d="M40 64 L44 72 L53 73 L46 79 L48 88 L40 83 L32 88 L34 79 L27 73 L36 72 Z" fill={BLUE} />
      <circle cx="30" cy="67" r="4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function Rosette({ className = "", size = 72, ...rest }: SvgProps) {
  // an award rosette: a scalloped yellow disc, a blue centre with a
  // sparkle, two ribbon tails
  const scallops = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return { cx: 40 + 26 * Math.cos(a), cy: 38 + 26 * Math.sin(a) };
  });
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.375}
      viewBox="0 0 80 110"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M28 58 L22 108 L34 100 L40 108 L40 60 Z" fill={BLUE} />
      <path d="M52 58 L58 108 L46 100 L40 108 L40 60 Z" fill={BLUE_DEEP} />
      {scallops.map((s, i) => (
        <circle key={i} cx={s.cx.toFixed(1)} cy={s.cy.toFixed(1)} r="8" fill={YELLOW} />
      ))}
      <circle cx="40" cy="38" r="27" fill={YELLOW} />
      <circle cx="40" cy="38" r="20" fill="#fff" />
      <circle cx="40" cy="38" r="15" fill={BLUE} />
      <path d="M40 29 L43 35 L49 38 L43 41 L40 47 L37 41 L31 38 L37 35 Z" fill={YELLOW} />
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

export function SnackBag({ className = "", size = 90, ...rest }: SvgProps) {
  // a crimped snack bag: yellow body, blue crimps, a blue window with crumbs
  return (
    <svg
      className={className}
      width={size}
      height={size * (130 / 100)}
      viewBox="0 0 100 130"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <rect x="14" y="16" width="72" height="98" rx="8" fill={YELLOW} />
      <rect x="8" y="8" width="84" height="14" rx="4" fill={BLUE} />
      <path d="M16 15 H84" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="4 5" />
      <rect x="8" y="108" width="84" height="14" rx="4" fill={BLUE} />
      <path d="M16 115 H84" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="4 5" />
      <rect x="28" y="42" width="44" height="44" rx="10" fill={BLUE} />
      <circle cx="42" cy="58" r="4" fill="#fff" opacity="0.85" />
      <circle cx="56" cy="66" r="5" fill={YELLOW} />
      <circle cx="60" cy="52" r="3" fill="#fff" opacity="0.7" />
      <rect x="24" y="26" width="14" height="6" rx="3" fill="#fff" opacity="0.5" />
    </svg>
  );
}

export function StickerSheet({ className = "", size = 96, ...rest }: SvgProps) {
  // a sheet of three stickers with one corner peeling up
  return (
    <svg
      className={className}
      width={size}
      height={size * (130 / 110)}
      viewBox="0 0 110 130"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <rect x="6" y="6" width="98" height="118" rx="10" fill="#fff" stroke={BLUE} strokeWidth="4" />
      {/* sparkle sticker */}
      <circle cx="34" cy="38" r="18" fill={YELLOW} />
      <path d="M34 26 L37 35 L46 38 L37 41 L34 50 L31 41 L22 38 L31 35 Z" fill={BLUE} />
      {/* pixel grid sticker */}
      <rect x="58" y="20" width="36" height="36" rx="9" fill={BLUE} />
      <rect x="66" y="28" width="8" height="8" rx="2" fill={YELLOW} />
      <rect x="78" y="28" width="8" height="8" rx="2" fill={YELLOW} opacity="0.6" />
      <rect x="66" y="40" width="8" height="8" rx="2" fill={YELLOW} opacity="0.6" />
      <rect x="78" y="40" width="8" height="8" rx="2" fill="#fff" opacity="0.7" />
      {/* code sticker */}
      <circle cx="52" cy="90" r="22" fill={BLUE} />
      <text x="52" y="97" textAnchor="middle" fontSize="18" fontWeight="700" fill={YELLOW}>
        {"</>"}
      </text>
      {/* peeling corner */}
      <path d="M104 100 L104 124 L80 124 Z" fill={SKY_LIGHT} />
      <path d="M104 100 L80 124" stroke={BLUE} strokeWidth="3" />
    </svg>
  );
}

export function Cap({ className = "", width = 120, ...rest }: SvgProps & { width?: number }) {
  // the builders cap: blue dome, yellow brim, a pixel-grid patch up front
  return (
    <svg
      className={className}
      width={width}
      height={width * (90 / 140)}
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M20 62 C20 18 120 18 120 62 Z" fill={BLUE} />
      <path d="M70 20 L70 62 M45 24 C40 36 36 48 36 62 M95 24 C100 36 104 48 104 62" stroke={BLUE_DEEP} strokeWidth="3" />
      <circle cx="70" cy="20" r="6" fill={YELLOW} />
      <path d="M20 62 C40 76 100 78 138 66 L136 76 C100 88 40 86 18 72 Z" fill={YELLOW} />
      <path d="M22 70 C50 80 100 82 132 72" stroke={YELLOW_DEEP} strokeWidth="2.5" strokeDasharray="4 5" />
      <rect x="56" y="38" width="28" height="18" rx="4" fill={YELLOW} />
      <rect x="61" y="43" width="7" height="7" rx="1.5" fill={BLUE} />
      <rect x="72" y="43" width="7" height="7" rx="1.5" fill={BLUE} opacity="0.6" />
    </svg>
  );
}

export function Wristband({ className = "", width = 110, ...rest }: SvgProps & { width?: number }) {
  // a looped wristband with a yellow stitch and a clasp, "SKH" on the front
  return (
    <svg
      className={className}
      width={width}
      height={width * (70 / 120)}
      viewBox="0 0 120 70"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <ellipse cx="60" cy="35" rx="46" ry="22" stroke={BLUE} strokeWidth="16" />
      <ellipse cx="60" cy="35" rx="46" ry="22" stroke={YELLOW} strokeWidth="2.5" strokeDasharray="8 8" />
      <rect x="51" y="6" width="18" height="12" rx="3" fill={YELLOW} stroke={BLUE} strokeWidth="2.5" />
      <text x="60" y="61" textAnchor="middle" fontSize="11" fontWeight="700" fill={YELLOW}>
        SKH
      </text>
    </svg>
  );
}
