"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelHeart } from "./decorations";
import { ChalkScribble } from "./space";
import { Lanyard } from "./parts";
import { DrawnBadgeBg } from "./drawn";

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
    <section ref={sectionRef} id="founders" className="relative px-4 py-28 md:py-32">
      {/* big hook: a giant pixel heart from the people who make it happen */}
      <div className="anchor-drift pointer-events-none absolute left-8 top-1/4 -z-[1] hidden opacity-60 lg:block">
        <PixelHeart className="anchor-beat" size={180} />
      </div>
      {/* a zigzag chalked in beside the heart */}
      <div className="pointer-events-none absolute left-[22%] bottom-24 -z-[1] hidden rotate-[8deg] lg:block">
        <ChalkScribble kind="zigzag" width={80} />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-wide text-sun">The founders ✦</p>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          Meet the <span className="text-sun">people behind the day</span>
        </h2>

        {/* staff badges on lanyards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {FOUNDERS.map((person, i) => (
            <div key={i} className="founder-tile">
              {/* swings from the clip on hover — kept off the tile gsap tweens.
                  the middle clip was hung a little crooked */}
              <div className="flex origin-top flex-col items-center transition-transform duration-300 hover:rotate-2">
                <Lanyard className={i === 1 ? "-mb-1 rotate-[3deg]" : "-mb-1"} />
                <div className="relative w-full text-ink">
                  <DrawnBadgeBg shape={i} />
                  {/* each badge wears its header its own way: a bare punched
                      slot on the arch, a stitched patch on the tag, the solid
                      band on the rounded card */}
                  {i === 0 && (
                    <div className="relative mx-3 mt-4 flex flex-col items-center">
                      <span className="h-2 w-12 rounded-full border-2 border-saigon bg-white" aria-hidden="true" />
                      <span className="mt-1 text-[11px] font-bold tracking-widest text-saigon">founder</span>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="relative mx-9 mt-5 flex h-8 -rotate-1 items-center justify-center gap-3 rounded-md border-2 border-dashed border-saigon bg-energy text-[11px] font-bold tracking-widest text-ink">
                      <span className="h-1.5 w-10 rounded-full bg-white/80" aria-hidden="true" />
                      founder
                    </div>
                  )}
                  {i === 2 && (
                    <div className="relative mx-3 mt-3 flex h-8 items-center justify-center gap-3 rounded-md bg-saigon text-[11px] font-bold tracking-widest text-white">
                      <span className="h-1.5 w-10 rounded-full bg-white/80" aria-hidden="true" />
                      founder
                    </div>
                  )}
                  <div className="relative flex flex-col items-center p-5">
                    <div
                      className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-dashed border-mist bg-white"
                      aria-hidden="true"
                    >
                      <Sparkle className="ambient-twinkle" size={16} color={i % 2 === 0 ? "#ffb703" : "#191970"} />
                    </div>
                    <p className="mt-4 text-lg font-bold">{person.name}</p>
                    <p className="text-sm font-medium text-ink/60">{person.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-medium text-white/75">
          Want to help run the day? Mentor and volunteer sign-ups open soon.
        </p>
      </div>
    </section>
  );
}
