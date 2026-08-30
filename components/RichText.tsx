import SiteLink from "./SiteLink";

/* a paragraph whose text may carry [label](href) links — the data modules
   stay plain strings and the links still go through SiteLink */
export default function RichText({
  text,
  className = "",
  linkClassName = "font-semibold text-saigon underline decoration-2 underline-offset-2 transition-colors hover:text-saigon-deep",
}: {
  text: string;
  className?: string;
  linkClassName?: string;
}) {
  const link = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = link.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <SiteLink key={match.index} href={match[2]} className={linkClassName}>
        {match[1]}
      </SiteLink>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <p className={className}>{parts}</p>;
}
