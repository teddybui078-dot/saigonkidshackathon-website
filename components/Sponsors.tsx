"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelHeart } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".sponsor-tile", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.07,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="relative px-4 py-24">
      {/* big hook: a giant pixel heart from the people who believe */}
      <div className="pointer-events-none absolute -left-16 top-1/4 -z-[1] hidden lg:block">
        <PixelHeart className="ambient-float" data-amp="s" size={280} />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold text-saigon">our friends ✦</p>
        <h2 className="text-4xl font-bold lowercase leading-tight md:text-5xl">
          powered by <span className="text-saigon">people who believe</span> in
          young builders
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="sponsor-tile flex h-28 items-center justify-center rounded-2xl border-2 border-dashed border-mist bg-white/60"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-ink/40">
                your logo here
                <Sparkle className="ambient-twinkle" size={13} color={i % 2 === 0 ? "#f8ac1a" : "#0145b4"} />
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 font-medium text-ink/70">
          want to support 130 kids building their first big thing?
        </p>
        <span className="mt-4 inline-block rounded-full border-2 border-saigon px-7 py-3 text-base font-semibold text-saigon">
          sponsorship details coming soon
        </span>
      </div>
    </section>
  );
}
