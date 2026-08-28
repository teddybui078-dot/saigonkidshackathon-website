"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc, CodeMark } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const TRACKS = [
  {
    title: "games & play",
    body: "build a game the whole room wants a turn at — platformers, puzzles, party games.",
    icon: "🎮",
    accent: "bg-energy",
  },
  {
    title: "ai for good",
    body: "teach a computer something helpful — a homework buddy, a translator, a smart helper.",
    icon: "🤖",
    accent: "bg-saigon",
  },
  {
    title: "green saigon",
    body: "hack for your city — apps and gadgets for cleaner air, less waste, greener streets.",
    icon: "🌱",
    accent: "bg-energy",
  },
  {
    title: "apps for family",
    body: "make something your family actually uses — chore charts, recipe books, memory games.",
    icon: "🏠",
    accent: "bg-saigon",
  },
];

export default function Tracks() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // signature treehacks move: vertical scroll drives the card row sideways
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = sectionRef.current;
        const row = rowRef.current;
        if (!section || !row) return;

        const distance = () => row.scrollWidth - window.innerWidth;

        gsap.to(row, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    );

    // mobile: simple stagger reveal instead of the pin
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".track-card", {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tracks" className="relative overflow-hidden">
      {/* big hooks around the card lane */}
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
      <div className="anchor-drift pointer-events-none absolute left-[42%] top-16 -z-[1] hidden lg:block">
        <CodeMark className="anchor-wobble" size={130} />
      </div>
      <div className="flex min-h-svh flex-col justify-center py-24 md:py-0">
        <div className="px-4 md:px-[max(1rem,calc(50vw-32rem))]">
          <p className="mb-3 text-sm font-semibold text-saigon">
            pick your adventure ✦
          </p>
          <h2 className="text-4xl font-bold lowercase leading-tight md:text-5xl">
            four tracks, <span className="text-energy">zero limits</span>
          </h2>
          <p className="mt-3 hidden font-medium text-ink/60 md:block">
            keep scrolling — the tracks slide by →
          </p>
        </div>

        <div
          ref={rowRef}
          className="mt-12 flex flex-col gap-6 px-4 md:w-max md:flex-row md:gap-8 md:px-[max(1rem,calc(50vw-32rem))] md:pr-[10vw]"
        >
          {TRACKS.map((track) => (
            <article
              key={track.title}
              className="track-card relative w-full shrink-0 rounded-3xl bg-white p-8 shadow-[0_2px_16px_rgba(30,41,59,0.06)] md:w-[24rem]"
            >
              <PixelGrid className="ambient-float absolute right-6 top-6" data-amp="s" size={30} />
              <div className="text-5xl" aria-hidden="true">
                {track.icon}
              </div>
              <div className={`mt-5 h-2 w-14 rounded-full ${track.accent}`} />
              <h3 className="mt-4 text-2xl font-semibold lowercase">
                {track.title}
              </h3>
              <p className="mt-3 font-medium text-ink/70">{track.body}</p>
            </article>
          ))}

          <div className="hidden shrink-0 flex-col items-center justify-center gap-3 pr-8 md:flex">
            <Sparkle className="ambient-twinkle" size={34} />
            <p className="max-w-[12rem] text-center font-semibold lowercase text-saigon">
              can&apos;t decide? mix them all together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
