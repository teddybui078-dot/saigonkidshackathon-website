"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelHeart } from "./decorations";
import { Lanyard } from "./parts";

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  { name: "Founder name", role: "Role" },
  { name: "Founder name", role: "Role" },
  { name: "Founder name", role: "Role" },
];

export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".founder-tile",
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
    <section ref={sectionRef} id="founders" className="relative px-4 py-24">
      {/* big hook: a giant pixel heart from the people who make it happen */}
      <div className="anchor-drift pointer-events-none absolute left-8 top-1/4 -z-[1] hidden lg:block">
        <PixelHeart className="anchor-beat" size={280} />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold text-saigon">The founders ✦</p>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          Meet the <span className="text-saigon">people behind the day</span>
        </h2>

        {/* staff badges on lanyards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {FOUNDERS.map((person, i) => (
            <div key={i} className="founder-tile">
              {/* swings from the clip on hover — kept off the tile gsap tweens */}
              <div className="flex origin-top flex-col items-center transition-transform duration-300 hover:rotate-2">
                <Lanyard className="-mb-1" />
                <div className="w-full rounded-xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#01337f]">
                  {/* header band with the punched slot the clip goes through */}
                  <div className="flex h-8 items-center justify-center gap-3 rounded-t-[9px] bg-saigon text-[11px] font-bold tracking-widest text-white">
                    <span className="h-1.5 w-10 rounded-full bg-white/80" aria-hidden="true" />
                    founder
                  </div>
                  <div className="flex flex-col items-center p-5">
                    <div
                      className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-dashed border-mist bg-canvas"
                      aria-hidden="true"
                    >
                      <Sparkle className="ambient-twinkle" size={16} color={i % 2 === 0 ? "#f8ac1a" : "#0145b4"} />
                    </div>
                    <p className="mt-4 text-lg font-bold">{person.name}</p>
                    <p className="text-sm font-medium text-ink/60">{person.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-medium text-ink/70">
          Want to help run the day? Mentor and volunteer sign-ups open soon.
        </p>
      </div>
    </section>
  );
}
