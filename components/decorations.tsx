/* lightweight vector accents echoing the logo: pixel clusters, sparkles,
   orbit swooshes, and code marks. colors are fixed to the brand palette. */

const BLUE = "#0145b4";
const YELLOW = "#f8ac1a";

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
      <rect x="14" y="0" width="10" height="10" rx="2" fill={BLUE} />
      <rect x="0" y="12" width="10" height="10" rx="2" fill={BLUE} />
      <rect x="28" y="12" width="10" height="10" rx="2" fill={BLUE} />
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

export function SpeedLines({
  className = "",
  size = 28,
  color = BLUE,
  ...rest
}: {
  className?: string;
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>) {
  // the little burst lines beside "saigon kids" in the logo
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M4 24 L10 16" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M12 26 L15 18" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M2 14 L9 12" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ————— hero scene elements (treehacks-style, brand-tinted) ————— */

const SKY_LIGHT = "#c9d7ee";
const SKY_DEEP = "#a8bfe2";

export function SaigonSkyline({
  className = "",
  width = 340,
  ...rest
}: {
  className?: string;
  width?: number;
} & React.SVGProps<SVGSVGElement>) {
  // flat silhouettes: landmark 81 (tapered spire) + bitexco (helipad) + blocks
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.75}
      viewBox="0 0 340 255"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {/* landmark 81 */}
      <path
        d="M60 255 L60 120 L70 120 L70 78 L78 78 L78 48 L84 48 L84 26 L88 8 L92 26 L92 48 L98 48 L98 78 L106 78 L106 120 L116 120 L116 255 Z"
        fill={SKY_DEEP}
      />
      <rect x="66" y="140" width="6" height="10" rx="1" fill="#f1f5f9" opacity="0.6" />
      <rect x="86" y="120" width="6" height="10" rx="1" fill="#f1f5f9" opacity="0.6" />
      <rect x="104" y="160" width="6" height="10" rx="1" fill="#f1f5f9" opacity="0.6" />
      {/* bitexco with helipad */}
      <path
        d="M170 255 L172 128 C172 100 182 84 196 84 C210 84 220 100 220 128 L222 255 Z"
        fill={SKY_LIGHT}
      />
      <rect x="148" y="118" width="34" height="8" rx="4" fill={SKY_LIGHT} />
      <rect x="190" y="100" width="6" height="12" rx="2" fill="#f1f5f9" opacity="0.6" />
      {/* low blocks */}
      <rect x="0" y="190" width="44" height="65" rx="4" fill={SKY_LIGHT} />
      <rect x="126" y="205" width="36" height="50" rx="4" fill={SKY_DEEP} />
      <rect x="232" y="182" width="48" height="73" rx="4" fill={SKY_DEEP} />
      <rect x="290" y="212" width="50" height="43" rx="4" fill={SKY_LIGHT} />
      <rect x="244" y="196" width="7" height="8" rx="1" fill="#f1f5f9" opacity="0.6" />
      <rect x="262" y="210" width="7" height="8" rx="1" fill="#f1f5f9" opacity="0.6" />
    </svg>
  );
}

export function PalmSilhouette({
  className = "",
  width = 200,
  ...rest
}: {
  className?: string;
  width?: number;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.9}
      viewBox="0 0 200 180"
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M120 180 C122 130 124 100 130 78 L138 80 C132 104 130 134 129 180 Z"
        fill={SKY_DEEP}
      />
      <path d="M134 80 C110 62 88 60 66 70 C92 48 118 52 136 72 Z" fill={SKY_DEEP} />
      <path d="M134 78 C118 52 100 40 76 36 C106 28 128 44 140 70 Z" fill={SKY_LIGHT} />
      <path d="M136 74 C140 46 152 30 174 22 C156 44 148 60 144 78 Z" fill={SKY_DEEP} />
      <path d="M138 78 C160 62 180 60 198 68 C176 48 152 54 136 72 Z" fill={SKY_LIGHT} />
      <path
        d="M40 180 C42 148 44 128 48 112 L55 114 C50 132 48 152 47 180 Z"
        fill={SKY_LIGHT}
      />
      <path d="M50 114 C34 102 20 100 4 106 C22 90 40 94 53 108 Z" fill={SKY_LIGHT} />
      <path d="M52 112 C54 92 62 80 78 74 C64 90 58 100 56 114 Z" fill={SKY_DEEP} />
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
      <rect x="6" y="40" width="7" height="7" rx="1.5" fill={YELLOW} />
      <rect x="86" y="26" width="6" height="6" rx="1.5" fill={BLUE} />
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
