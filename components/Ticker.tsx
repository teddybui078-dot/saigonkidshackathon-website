"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Code", "Create", "Play", "Repeat"];

export default function Ticker() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const row = wrapRef.current?.querySelector(".ticker-row");
      if (!row) return;
      gsap.fromTo(
        row,
        { x: "0%" },
        {
          x: "-25%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden py-10" aria-hidden="true">
      <div className="ticker-row flex w-max items-center gap-8 whitespace-nowrap">
        {Array.from({ length: 4 }).flatMap((_, rep) =>
          WORDS.map((word, i) => (
            <span
              key={`${rep}-${i}`}
              className={`flex items-center gap-8 text-5xl font-bold md:text-7xl ${
                i % 2 === 0 ? "text-outline-blue" : "text-outline-yellow"
              }`}
            >
              {word}
              <span
                className={`inline-block h-4 w-4 rounded-sm ${
                  i % 2 === 0 ? "bg-energy" : "bg-saigon"
                }`}
              />
            </span>
          ))
        )}
      </div>
    </div>
  );
}
