"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, CodeMark, PixelStack, PixelPlanet } from "./decorations";

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

      gsap.fromTo(
        ".footer-orbit",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
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
      className="relative mt-12 overflow-hidden rounded-t-[3rem] bg-saigon px-4 pb-10 pt-20 text-white"
    >
      {/* big hooks: brick pile and a ghost planet in the corners */}
      <div className="anchor-drift pointer-events-none absolute bottom-6 left-6 hidden lg:block">
        <PixelStack width={230} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-8 top-10 opacity-25 hidden lg:block">
        <PixelPlanet className="anchor-wobble" size={320} />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Sparkle className="footer-pop ambient-twinkle mx-auto mb-6" size={30} />
        <h2 className="footer-pop text-4xl font-bold leading-tight md:text-6xl">
          See you on{" "}
          <span className="relative inline-block text-energy">
            March 6, 2027
            <svg
              className="pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2rem)]"
              viewBox="0 0 300 80"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="footer-orbit"
                d="M 150 6 C 260 6 294 28 294 40 C 294 60 230 74 150 74 C 70 74 6 60 6 40 C 6 28 40 6 150 6"
                stroke="#f8ac1a"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1000}
                strokeDasharray={1000}
              />
            </svg>
          </span>
        </h2>
        <p className="footer-pop mt-6 text-lg font-medium text-white/80">
          Ho Chi Minh City · 130 young makers · one unforgettable day
        </p>

        <div className="footer-pop mt-8 flex justify-center">
          <span className="rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-ink shadow-[0_6px_0_#d18e07]">
            Registration opens soon
          </span>
        </div>

        <div className="footer-pop mt-16 flex flex-col items-center gap-4 border-t border-white/20 pt-8 text-sm font-medium text-white/70 md:flex-row md:justify-between">
          <p>Saigon Kids Hackathon © 2027</p>
          <CodeMark size={40} chevronColor="#ffffff" className="ambient-float opacity-80" data-amp="s" />
          <p>
            Made with <span className="text-energy">♥</span> in Saigon
          </p>
        </div>
      </div>
    </footer>
  );
}
