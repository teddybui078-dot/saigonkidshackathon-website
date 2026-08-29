"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc } from "./decorations";
import { SubjectIcon, type SubjectKind } from "./parts";

gsap.registerPlugin(ScrollTrigger);

const SUBJECTS: { kind: SubjectKind; label: string }[] = [
  { kind: "math", label: "Math quests" },
  { kind: "language", label: "Language adventures" },
  { kind: "science", label: "Science puzzles" },
  { kind: "history", label: "History journeys" },
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

      gsap.from(".track-subject", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".track-showcase", start: "top 70%" },
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

        {/* the mission on one game cartridge — everyone loads the same game */}
        <div className="track-showcase relative mx-auto mt-12 max-w-xl text-left">
          {/* grip: the ridged bar you pull it out by */}
          <div
            aria-hidden="true"
            className="mx-12 h-5 rounded-t-xl bg-saigon-deep bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(255,255,255,0.18)_10px_13px)]"
          />
          {/* shell */}
          <div className="relative rounded-[1.5rem] bg-saigon p-4 pb-0 shadow-[0_10px_0_#01337f] md:p-5 md:pb-0">
            {/* moulded side notches */}
            <span aria-hidden="true" className="absolute -left-0.5 top-20 h-10 w-2.5 rounded-r-md bg-saigon-deep" />
            <span aria-hidden="true" className="absolute -right-0.5 top-20 h-10 w-2.5 rounded-l-md bg-saigon-deep" />

            {/* label sticker */}
            <div className="overflow-hidden rounded-xl border-4 border-energy bg-white">
              <div className="flex items-center justify-between bg-energy px-4 py-2 text-[11px] font-bold tracking-widest text-ink md:px-5">
                <span>Saigon Kids · one track · 2027</span>
                <span
                  className="grid h-8 w-8 place-items-center rounded-full border-[3px] border-saigon bg-white text-sm font-bold text-saigon"
                  aria-hidden="true"
                >
                  1
                </span>
              </div>
              <div className="relative p-6 md:p-8">
                <PixelGrid className="ambient-float absolute right-6 top-6 hidden md:block" data-amp="s" size={26} />
                <h3 className="max-w-sm text-2xl font-semibold md:text-3xl">
                  Build a game that makes learning fun
                </h3>
                <p className="mt-4 text-lg font-medium text-ink/70">
                  Every team builds toward the same mission: turn something worth
                  learning into something kids genuinely want to play. Math,
                  languages, science, Saigon history — pick your subject, make it a
                  game, and watch the room fight for a turn.
                </p>
                <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {SUBJECTS.map((subject) => (
                    <li
                      key={subject.label}
                      className="track-subject flex flex-col items-center gap-2 rounded-lg bg-canvas px-2 py-3 text-center"
                    >
                      <SubjectIcon kind={subject.kind} />
                      <span className="text-xs font-semibold leading-tight text-ink/70">{subject.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* connector pins along the bottom edge */}
            <div
              aria-hidden="true"
              className="mx-6 mt-4 h-6 bg-[repeating-linear-gradient(90deg,#01337f_0_7px,#a8bfe2_7px_10px)] md:mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
