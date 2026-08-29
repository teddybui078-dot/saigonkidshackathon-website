"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc } from "./decorations";
import { SubjectIcon, Pushpin, type SubjectKind } from "./parts";

gsap.registerPlugin(ScrollTrigger);

type Example = { kind: SubjectKind; label: string };

const TRACKS: {
  n: number;
  name: string;
  tone: "blue" | "yellow";
  blurb: string;
  examples: Example[];
}[] = [
  {
    n: 1,
    name: "Gamified Edtech",
    tone: "blue",
    blurb:
      "Make learning fun. Turn something worth learning into a game kids genuinely want to play.",
    examples: [
      { kind: "math", label: "Math quests" },
      { kind: "language", label: "Language adventures" },
      { kind: "science", label: "Science puzzles" },
      { kind: "history", label: "History journeys" },
    ],
  },
  {
    n: 2,
    name: "Smart Campus",
    tone: "yellow",
    blurb:
      "Build a tool that solves a real everyday problem students or teachers face at school.",
    examples: [
      { kind: "chat", label: "Communication" },
      { kind: "list", label: "Organization" },
      { kind: "shield", label: "Safety" },
      { kind: "pin", label: "Navigation" },
      { kind: "gear", label: "Operations" },
    ],
  },
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

      gsap.from(".track-board", {
        y: 70,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".track-board", start: "top 80%" },
      });

      gsap.from(".track-door", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".track-doors", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".track-door").forEach((door) => {
        gsap.from(door.querySelectorAll(".track-subject"), {
          y: 20,
          opacity: 0,
          scale: 0.8,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: door, start: "top 65%" },
        });
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
          The theme ✦
        </p>

        {/* the theme, written up on the classroom whiteboard */}
        <div className="track-board relative mx-auto mt-2 max-w-4xl">
          <div className="relative rounded-2xl border-[10px] border-[#a8bfe2] bg-white px-6 py-12 text-center shadow-[inset_0_0_0_3px_#e2e8f0,0_10px_0_#8fa9d4] md:px-10 md:py-14">
            {/* magnets on the frame, doodles in the corners */}
            <span aria-hidden="true" className="absolute -left-2 -top-2 h-5 w-5 rounded-full border-2 border-energy-deep bg-energy" />
            <span aria-hidden="true" className="absolute -right-2 -top-2 h-5 w-5 rounded-full border-2 border-saigon-deep bg-saigon" />
            <Sparkle className="ambient-twinkle absolute right-8 top-6" size={28} />
            <span aria-hidden="true" className="absolute left-8 top-6 -rotate-6 text-sm font-bold text-saigon/40">
              2027
            </span>
            <FlightArc className="absolute bottom-3 left-6 hidden md:block" width={140} color="#f8ac1a" />
            <h2 className="text-5xl font-bold leading-tight md:text-7xl">
              AI in{" "}
              <span className="relative inline-block text-saigon">
                Classrooms
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8C40 2 80 10 120 5s60 4 78-1" stroke="#f8ac1a" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="mt-6 text-lg font-medium text-ink/60">One theme. Two tracks. Pick your door.</p>
          </div>
          {/* marker tray: two markers and an eraser */}
          <div aria-hidden="true" className="relative mx-10 h-4 rounded-b-lg bg-[#a8bfe2]">
            <span className="absolute -top-1.5 left-8 h-3 w-14 overflow-hidden rounded-full bg-saigon">
              <span className="absolute right-0 top-0 h-3 w-4 bg-saigon-deep" />
            </span>
            <span className="absolute -top-1.5 left-28 h-3 w-14 overflow-hidden rounded-full bg-energy">
              <span className="absolute right-0 top-0 h-3 w-4 bg-energy-deep" />
            </span>
            <span className="absolute -top-2 right-10 h-3.5 w-10 rounded border border-[#8fa9d4] bg-[#cbd8ee]" />
          </div>
        </div>

        {/* two classroom doors, one per track */}
        <div className="track-doors mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
          {TRACKS.map((track) => (
            <div key={track.n} className="track-door">
              <div className="rounded-t-[2rem] bg-saigon-deep p-2.5 shadow-[0_10px_0_#01337f]">
                <div
                  className={`relative flex min-h-[28rem] flex-col rounded-t-[1.6rem] px-6 pb-4 pt-6 md:min-h-[32rem] ${
                    track.tone === "blue" ? "bg-saigon text-white" : "bg-energy text-ink"
                  }`}
                >
                  {/* room number, window, nameplate */}
                  <span
                    className="mx-auto grid h-10 w-12 place-items-center rounded-md border-[3px] border-saigon-deep bg-white text-lg font-bold text-saigon"
                    aria-hidden="true"
                  >
                    {track.n}
                  </span>
                  <span
                    className="relative mx-auto mt-5 block h-24 w-36 overflow-hidden rounded-lg border-4 border-saigon-deep bg-[#cbd8ee]"
                    aria-hidden="true"
                  >
                    <span className="absolute -left-4 -top-4 h-32 w-8 rotate-[20deg] bg-white/50" />
                  </span>
                  <h3 className="mx-auto mt-5 rounded-md bg-white px-5 py-2 text-xl font-bold text-saigon shadow-[0_3px_0_#01337f]">
                    {track.name}
                  </h3>

                  {/* the poster tacked to the door */}
                  <div className="relative mt-6 rounded-lg bg-white p-5 pt-6 text-left text-ink shadow-[0_4px_0_rgba(1,51,127,0.25)]">
                    <Pushpin className="absolute -top-3 left-4" size={22} />
                    <p className="font-medium leading-7 text-ink/80">{track.blurb}</p>
                    <ul className="mt-4 flex flex-wrap justify-center gap-2">
                      {track.examples.map((example) => (
                        <li
                          key={example.label}
                          className="track-subject flex w-[4.6rem] flex-col items-center gap-1 rounded-md bg-canvas px-1 py-2 text-center text-[10px] font-semibold leading-tight text-ink/70"
                        >
                          <SubjectIcon kind={example.kind} size={30} />
                          {example.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* handle and kick plate */}
                  <span
                    className={`absolute right-1 top-1/2 h-5 w-5 rounded-full border-[3px] border-saigon-deep ${
                      track.tone === "blue" ? "bg-energy" : "bg-saigon"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="mx-1 mt-6 block h-8 rounded bg-black/10 md:mt-auto" aria-hidden="true" />
                </div>
              </div>
              <div aria-hidden="true" className="h-3 rounded-b-md bg-saigon-deep" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
