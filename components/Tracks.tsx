"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc } from "./decorations";
import { Led, DomeButton } from "./parts";

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

      gsap.from(".track-button", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".track-deck", start: "top 85%" },
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
        {/* the mission on an arcade cabinet: marquee, screen, control deck, coin slot */}
        <div className="track-showcase relative mx-auto mt-6 max-w-2xl text-left">
          {/* marquee: the backlit sign carrying the track name */}
          <div className="relative rounded-t-[2rem] bg-saigon-deep px-5 pb-3 pt-5 md:px-6">
            <PixelGrid className="absolute left-5 top-7 hidden opacity-60 md:block" size={22} />
            <PixelGrid className="absolute right-5 top-7 hidden opacity-60 md:block" size={22} />
            <div className="mx-auto max-w-md rounded-xl bg-energy px-6 py-4 text-center shadow-[inset_0_-4px_0_#d18e07]">
              <h2 className="text-3xl font-bold leading-tight text-saigon-deep md:text-4xl">
                Gamified <span className="text-saigon">Edtech</span>
              </h2>
              <p className="mt-1 text-sm font-semibold text-ink/70">
                One track. One mission. Everyone all in.
              </p>
            </div>
          </div>

          {/* the screen in its bezel, flanked by the cabinet's side pillars;
              scanlines and glare paint under the text */}
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-5 bg-saigon-deep md:block" />
            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-5 bg-saigon-deep md:block" />
          <div className="border-x-[6px] border-saigon bg-[#cbd8ee] p-4 md:mx-5 md:p-5">
            <div className="relative overflow-hidden rounded-2xl border-2 border-mist bg-white shadow-[inset_0_0_0_3px_#e2e8f0,inset_0_0_28px_rgba(1,69,180,0.08)]">
              <div
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(1,69,180,0.05)_3px_4px)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-36 rotate-[24deg] bg-white/60"
                aria-hidden="true"
              />
              <div className="relative p-8 md:p-10">
                <PixelGrid className="ambient-float absolute right-8 top-8 hidden md:block" data-amp="s" size={30} />
                <h3 className="max-w-md text-2xl font-semibold md:text-3xl">
                  Build a game that makes learning fun
                </h3>
                <p className="mt-4 text-lg font-medium text-ink/70">
                  Every team builds toward the same mission: turn something worth
                  learning into something kids genuinely want to play. Math,
                  languages, science, Saigon history — pick your subject, make it a
                  game, and watch the room fight for a turn.
                </p>
                <p className="mt-6 flex items-center gap-1.5 text-sm font-bold tracking-widest text-saigon">
                  press start to build
                  <span className="motion-safe:animate-cursor-blink inline-block h-4 w-2 rounded-sm bg-energy" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* control deck: angled, jutting out past the body. the twin behind it
              is its hard bottom edge, since clip-path drops box-shadow */}
          <div className="relative -mx-1 md:-mx-2">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-2 bg-saigon-deep [clip-path:polygon(3%_0,97%_0,100%_100%,0_100%)]"
            />
            <div className="track-deck relative bg-[#cbd8ee] px-6 pb-7 pt-5 [clip-path:polygon(3%_0,97%_0,100%_100%,0_100%)] md:px-8">
              <div className="flex flex-wrap items-end justify-center gap-6 md:justify-between">
                {/* joystick, rocking from its base */}
                <div className="flex flex-col items-center" aria-hidden="true">
                  <div className="ambient-sway flex flex-col items-center">
                    <span className="h-9 w-9 rounded-full border-4 border-saigon bg-energy shadow-[inset_0_-3px_0_#d18e07]" />
                    <span className="-mt-1 h-12 w-2.5 rounded-full bg-saigon" />
                  </div>
                  <span className="-mt-2 h-4 w-14 rounded-full border-2 border-saigon bg-[#a8bfe2]" />
                </div>
                {/* the subjects you can pick, as arcade buttons */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {EXAMPLES.map((subject, i) => (
                    <div key={subject} className="track-button flex flex-col items-center">
                      <span className="h-16 w-16 rounded-full bg-[#a8bfe2] p-1.5 shadow-[inset_0_3px_0_#8fa9d4]">
                        <DomeButton tone={i % 2 === 0 ? "yellow" : "blue"} pressable className="text-base font-bold">
                          <span aria-hidden="true">{i + 1}</span>
                        </DomeButton>
                      </span>
                      <span className="relative mt-3 max-w-24 rounded bg-white/70 px-2 py-0.5 text-center text-[11px] font-semibold leading-tight text-ink/70">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* coin slot */}
          <div className="mx-8 mt-2 flex items-center justify-between rounded-b-xl bg-saigon-deep px-5 py-2.5 text-xs font-semibold text-white/80 md:mx-10">
            <span className="flex items-center gap-3">
              insert idea
              <span className="relative h-2 w-10 rounded-full bg-ink/60" aria-hidden="true">
                <span className="absolute -top-1.5 left-2 h-5 w-5 rounded-full border-2 border-energy-deep bg-energy" />
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Led className="motion-safe:animate-led-blink" />
              credit
            </span>
          </div>
          {/* kick plate */}
          <div aria-hidden="true" className="mx-16 h-4 rounded-b-lg bg-saigon" />
        </div>
      </div>
    </section>
  );
}
