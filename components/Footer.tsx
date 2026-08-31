"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, CodeMark, PixelPlanet } from "./decorations";
import { MoonTerrain, BrickPile } from "./space";
import { PARTNERS } from "./partners";
import { EVENT } from "./event";
import SiteLink from "./SiteLink";

const LINKS = [
  { href: "/rules", label: "The rules" },
  { href: "/parents", label: "Parents' guide" },
  { href: "/#judging", label: "How judging works" },
  { href: "/#info", label: "Fees & requirements" },
];

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".footer-pop", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
      });

      // two pen passes under the date, drawn one after the other
      gsap.fromTo(
        ".footer-underline",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 0.9,
          stagger: 0.25,
          ease: "power2.inOut",
          scrollTrigger: { trigger: footerRef.current, start: "top 70%" },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mt-24 overflow-hidden bg-space-dark px-4 pb-10 pt-28 text-white"
    >
      {/* the moon's surface crests the footer — the page lands where the
          hero's street stood */}
      <div className="pointer-events-none absolute inset-x-0 -top-1" aria-hidden="true">
        <MoonTerrain className="h-16 w-full md:h-20" />
      </div>
      {/* big hooks: the brick pile and a ghost planet in the corners */}
      <div className="anchor-drift pointer-events-none absolute bottom-6 left-6 hidden lg:block">
        <BrickPile width={230} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-8 top-10 opacity-25 hidden lg:block">
        <PixelPlanet className="anchor-wobble" size={260} />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Sparkle className="footer-pop ambient-twinkle mx-auto mb-6" size={30} />
        <h2 className="footer-pop text-4xl font-bold leading-tight md:text-6xl">
          See you on{" "}
          <span className="relative inline-block text-energy">
            {EVENT.date}
            {/* two loose hand-drawn underlines, stretched to the date's width */}
            <svg
              className="pointer-events-none absolute -bottom-3 left-0 h-5 w-full"
              viewBox="0 0 300 24"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {["M 4 7 C 90 2 190 11 296 5", "M 14 18 C 100 14 200 22 284 15"].map((d) => (
                <path
                  key={d}
                  className="footer-underline"
                  d={d}
                  stroke="#ffb703"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1000}
                  strokeDasharray={1000}
                />
              ))}
            </svg>
          </span>
        </h2>
        <p className="footer-pop mt-6 text-lg font-medium text-white/80">
          {EVENT.city} · {EVENT.spots} young makers · one unforgettable day
        </p>

        <div className="footer-pop mt-8 flex justify-center">
          <span className="rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-ink shadow-[0_4px_0_#d99a00]">
            Registration opens soon
          </span>
        </div>

        {/* who's behind it — bold names on their own row, a yellow × between */}
        <div className="footer-pop mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {PARTNERS.map((partner, i) => (
            <span key={partner.name} className="inline-flex items-center gap-2.5">
              {i > 0 && (
                <span className="text-2xl font-bold leading-none text-energy" aria-hidden="true">
                  ×
                </span>
              )}
              <span className="text-base font-bold text-white md:text-lg">{partner.name}</span>
            </span>
          ))}
        </div>

        {/* the practical pages, one row of plain links */}
        <nav aria-label="More about the day" className="footer-pop mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/70">
            {LINKS.map((link) => (
              <li key={link.href}>
                <SiteLink href={link.href} className="transition-colors hover:text-energy">
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-pop mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-8 text-sm font-medium text-white/70 md:flex-row md:justify-between">
          <p>© 2027 Saigon Kids Hackathon</p>
          <CodeMark size={40} chevronColor="#ffffff" className="ambient-float opacity-80" data-amp="s" />
          <p>
            Made with <span className="text-energy">♥</span> in Saigon
          </p>
        </div>
      </div>
    </footer>
  );
}
