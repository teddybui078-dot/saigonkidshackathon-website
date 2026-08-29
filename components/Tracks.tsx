"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc, Bolts } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const EXAMPLES = [
  "Math quests",
  "Language adventures",
  "Science puzzles",
  "History journeys",
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
          The one and only track ✦
        </p>
        <h2 className="track-line text-5xl font-bold leading-tight md:text-7xl">
          Gamified <span className="text-energy">Edtech</span>
        </h2>
        <p className="track-line mt-4 font-medium text-ink/60">
          One track. One mission. Everyone all in.
        </p>

        {/* the mission on a retro monitor */}
        <div className="track-showcase mx-auto mt-12 max-w-2xl text-left">
          <div className="relative rounded-[1.75rem] border-[6px] border-saigon bg-[#cbd8ee] p-4 shadow-[0_10px_0_#01337f] md:p-5">
            <Bolts />
            <div className="relative rounded-2xl border-2 border-mist bg-white p-8 md:p-10">
              <PixelGrid className="ambient-float absolute right-6 top-6" data-amp="s" size={30} />
              <div className="text-6xl" aria-hidden="true">
                🎮
              </div>
              <div className="mt-5 h-2 w-16 rounded-full bg-energy" />
              <h3 className="mt-5 text-2xl font-semibold md:text-3xl">
                Build a game that makes learning fun
              </h3>
              <p className="mt-4 text-lg font-medium text-ink/70">
                Every team builds toward the same mission: turn something worth
                learning into something kids genuinely want to play. Math,
                languages, science, Saigon history — pick your subject, make it a
                game, and watch the room fight for a turn.
              </p>

              <div className="track-chips mt-8 flex flex-wrap gap-3">
                {EXAMPLES.map((chip, i) => (
                  <span
                    key={chip}
                    className={`track-chip rounded-full border-2 border-saigon px-5 py-2 text-sm font-semibold ${
                      i % 2 === 0
                        ? "bg-white text-saigon shadow-[0_4px_0_#0145b4]"
                        : "bg-energy text-ink shadow-[0_4px_0_#d18e07]"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* stand */}
          <div className="mx-auto h-9 w-7 bg-saigon" aria-hidden="true" />
          <div className="mx-auto h-4 w-44 rounded-full bg-saigon" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
