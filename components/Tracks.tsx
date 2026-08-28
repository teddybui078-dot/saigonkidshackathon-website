"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const EXAMPLES = [
  "math quests",
  "language adventures",
  "science puzzles",
  "history journeys",
];

export default function Tracks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(".track-line", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      gsap.from(".track-showcase", {
        y: 70,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".track-showcase", start: "top 80%" },
      });

      gsap.from(".track-chip", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".track-chips", start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tracks" className="relative overflow-hidden px-4 py-28">
      {/* big hooks around the showcase */}
      <div className="anchor-drift pointer-events-none absolute right-10 top-16 -z-[1] hidden lg:block">
        <PixelPlanet className="anchor-wobble" size={290} />
      </div>
      <div className="pointer-events-none absolute bottom-14 left-10 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={64} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-6 left-28 -z-[1] hidden lg:block">
        <PixelGrid size={92} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-10 right-16 -z-[1] hidden lg:block">
        <FlightArc width={300} />
      </div>
      <div className="pointer-events-none absolute bottom-32 right-12 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={40} />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <p className="track-line mb-3 text-sm font-semibold text-saigon">
          the one and only track ✦
        </p>
        <h2 className="track-line text-5xl font-bold lowercase leading-tight md:text-7xl">
          gamified <span className="text-energy">edtech</span>
        </h2>
        <p className="track-line mt-4 font-medium text-ink/60">
          one track. one mission. everyone all in.
        </p>

        <div className="track-showcase relative mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-9 text-left shadow-[0_2px_16px_rgba(30,41,59,0.06)] md:p-12">
          <PixelGrid className="ambient-float absolute right-7 top-7" data-amp="s" size={34} />
          <div className="text-6xl" aria-hidden="true">
            🎮
          </div>
          <div className="mt-5 h-2 w-16 rounded-full bg-energy" />
          <h3 className="mt-5 text-2xl font-semibold lowercase md:text-3xl">
            build a game that makes learning fun
          </h3>
          <p className="mt-4 text-lg font-medium text-ink/70">
            every team builds toward the same mission: turn something worth
            learning into something kids genuinely want to play. math,
            languages, science, saigon history — pick your subject, make it a
            game, and watch the room fight for a turn.
          </p>

          <div className="track-chips mt-8 flex flex-wrap gap-3">
            {EXAMPLES.map((chip, i) => (
              <span
                key={chip}
                className={`track-chip rounded-full border-2 px-5 py-2 text-sm font-semibold ${
                  i % 2 === 0
                    ? "border-saigon text-saigon"
                    : "border-energy text-energy-deep"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
