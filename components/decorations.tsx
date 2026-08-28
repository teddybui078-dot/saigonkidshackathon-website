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
