"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteLink from "./SiteLink";

const LINKS = [
  { href: "/#essentials", label: "Cost" },
  { href: "/#about", label: "About" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#prizes", label: "Prizes" },
  { href: "/#partners", label: "Partners" },
  { href: "/#founders", label: "Founders" },
  { href: "/#info", label: "Info" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-[0_4px_24px_rgba(1,69,180,0.10)] backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <SiteLink
          href="/"
          className="flex items-center gap-2"
          aria-label="Saigon Kids Hackathon — home"
        >
          <Image
            src="/logo.png"
            alt="Saigon Kids Hackathon logo"
            width={44}
            height={44}
            priority
          />
          <span className="hidden text-sm font-semibold text-saigon lg:block">
            Saigon Kids Hackathon
          </span>
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

        <span className="rounded-full bg-energy px-4 py-2 text-sm font-semibold text-ink">
          March 6, 2027
        </span>
      </nav>
    </header>
  );
}
