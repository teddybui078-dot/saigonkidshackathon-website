"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, CodeMark } from "./decorations";

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
      <div className="mx-auto max-w-4xl text-center">
        <Sparkle className="footer-pop ambient-twinkle mx-auto mb-6" size={30} />
        <h2 className="footer-pop text-4xl font-bold lowercase leading-tight md:text-6xl">
          see you on{" "}
          <span className="relative inline-block text-energy">
            march 6, 2027
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
          ho chi minh city · 130 young makers · one unforgettable day
        </p>

        <div className="footer-pop mt-8 flex justify-center">
          <span className="rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-ink shadow-[0_6px_0_#d18e07]">
            registration opens soon
          </span>
        </div>

        <div className="footer-pop mt-16 flex flex-col items-center gap-4 border-t border-white/20 pt-8 text-sm font-medium text-white/70 md:flex-row md:justify-between">
          <p>saigon kids hackathon © 2027</p>
          <CodeMark size={40} chevronColor="#ffffff" className="ambient-float opacity-80" data-amp="s" />
          <p>
            made with <span className="text-energy">♥</span> in saigon
          </p>
        </div>
      </div>
    </footer>
  );
}
