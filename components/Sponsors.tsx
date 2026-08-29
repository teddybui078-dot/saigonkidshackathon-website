"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelHeart } from "./decorations";
import { Lanyard } from "./parts";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".sponsor-tile",
        { y: 30, opacity: 0, scale: 0.9, rotation: (i: number) => (i % 2 === 0 ? -4 : 4) },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: (i: number) => (i % 2 === 0 ? -1.5 : 1.5),
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="relative px-4 py-24">
      {/* big hook: a giant pixel heart from the people who believe */}
      <div className="anchor-drift pointer-events-none absolute left-8 top-1/4 -z-[1] hidden lg:block">
        <PixelHeart className="anchor-beat" size={280} />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold text-saigon">Our friends ✦</p>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          Powered by <span className="text-saigon">people who believe</span> in
          young builders
        </h2>

        {/* conference badges on lanyards */}
        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="sponsor-tile">
              {/* swings from the clip on hover — kept off the tile gsap tweens */}
              <div className="flex origin-top flex-col items-center transition-transform duration-300 hover:rotate-2">
                <Lanyard className="-mb-1" />
                <div className="w-full rounded-xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#01337f]">
                  {/* header band with the punched slot the clip goes through */}
                  <div className="flex h-8 items-center justify-center rounded-t-[9px] bg-saigon">
                    <span className="h-1.5 w-10 rounded-full bg-white/80" aria-hidden="true" />
                  </div>
                  <div className="p-3">
                    <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-mist">
                      <span className="flex items-center gap-2 text-sm font-medium text-ink/40">
                        Your logo here
                        <Sparkle className="ambient-twinkle" size={13} color={i % 2 === 0 ? "#f8ac1a" : "#0145b4"} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-medium text-ink/70">
          Want to support 130 kids building their first big thing?
        </p>
        <span className="mt-4 inline-block rounded-full border-2 border-saigon px-7 py-3 text-base font-semibold text-saigon">
          Sponsorship details coming soon
        </span>
      </div>
    </section>
  );
}
