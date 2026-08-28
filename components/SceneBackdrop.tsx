"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PixelPlanet, Sparkle, PixelGrid } from "./decorations";

/* fixed illustrated sky behind the whole site — it stays put while the
   content scrolls over it, so every section shares the hero's atmosphere */
export default function SceneBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current;
      if (!root) return;
      gsap.utils.toArray<HTMLElement>(".backdrop-prop", root).forEach((el) => {
        gsap.to(el, {
          y: `+=${gsap.utils.random(14, 30)}`,
          x: `+=${gsap.utils.random(-12, 12)}`,
          duration: gsap.utils.random(4, 7),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-mist to-canvas"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-60 240 C 320 140 780 150 1500 260"
          stroke="#c9d7ee"
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M-60 620 C 420 740 980 730 1500 600"
          stroke="#c9d7ee"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M-60 430 C 460 380 900 400 1500 430"
          stroke="#dde6f4"
          strokeWidth="60"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      {/* faint ambient props at the edges */}
      <PixelPlanet className="backdrop-prop absolute left-[3%] top-[58%] opacity-60 hidden md:block" size={78} />
      <PixelPlanet className="backdrop-prop absolute right-[4%] top-[20%] opacity-50 hidden lg:block" size={60} />
      <Sparkle className="backdrop-prop absolute left-[8%] top-[12%] opacity-60" size={22} />
      <Sparkle className="backdrop-prop absolute right-[10%] bottom-[14%] opacity-60" size={26} />
      <Sparkle className="backdrop-prop absolute left-[16%] bottom-[8%] opacity-50 hidden md:block" size={17} color="#0145b4" />
      <PixelGrid className="backdrop-prop absolute right-[3%] bottom-[42%] opacity-50 hidden md:block" size={34} />
      <PixelGrid className="backdrop-prop absolute left-[2%] top-[34%] opacity-40 hidden lg:block" size={28} />
    </div>
  );
}
