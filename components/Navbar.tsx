import Image from "next/image";
import SiteLink from "./SiteLink";
import { EVENT } from "./event";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#prizes", label: "Prizes" },
  { href: "/#partners", label: "Partners" },
  { href: "/#founders", label: "Founders" },
  { href: "/#info", label: "Info" },
  { href: "/#faq", label: "FAQ" },
];

/* the nav is a white sticker pill at every scroll position, so the logo
   always sits on a clean white surface (GUIDELINES.md §4) whether it is
   over the midnight hero or the light page below */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="sticker-pill flex w-full max-w-5xl items-center justify-between gap-4 px-3 py-1.5 sm:px-4">
        <SiteLink href="/" className="flex items-center gap-2" aria-label={`${EVENT.name} — home`}>
          <Image
            src="/logo-v2.png"
            alt=""
            width={66}
            height={44}
            loading="eager"
            sizes="66px"
            className="h-11 w-auto"
          />
          <span className="hidden text-sm font-semibold text-saigon lg:block">{EVENT.name}</span>
        </SiteLink>

        <ul className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <SiteLink
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-saigon"
              >
                {link.label}
              </SiteLink>
            </li>
          ))}
        </ul>

        <span className="badge-date text-sm">{EVENT.date}</span>
      </nav>
    </header>
  );
}
