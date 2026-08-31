"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Screws, Hook } from "./parts";
import { Trophy, Medal, Rosette, PrizeTag } from "./illustrations";
import { TEAM_AWARDS, SOLO_AWARDS, PRIZE_TBA, type TeamAward } from "./awards";

gsap.registerPlugin(ScrollTrigger);

/* the podium reads 2nd | 1st | 3rd left to right, the way a real one does —
   by grid order, so the dom (and a screen reader) still goes 1st, 2nd, 3rd */
const PODIUM = TEAM_AWARDS;
const COLUMN: Record<TeamAward["place"], string> = {
  1: "order-2 flex flex-col items-center",
  2: "order-1 flex flex-col items-center",
  3: "order-3 flex flex-col items-center",
};
const CAPTION: Record<TeamAward["place"], string> = {
  1: "podium-caption order-2",
  2: "podium-caption order-1",
  3: "podium-caption order-3",
};

/* each step has its own height; the clip box is the floor it rises out of */
const CLIP: Record<TeamAward["place"], string> = {
  1: "podium-clip h-48 w-full overflow-hidden md:h-56",
  2: "podium-clip h-36 w-full overflow-hidden md:h-44",
  3: "podium-clip h-28 w-full overflow-hidden md:h-36",
};

/* what stands on top of each step: the trophy (with a gold medal tucked
   behind its shoulder) on first, a medal on the other two */
const TOPPER: Record<TeamAward["place"], React.ReactNode> = {
  1: (
    <span className="relative inline-block">
      <Trophy size={120} className="h-auto w-[5.5rem] md:w-[120px]" />
      <Medal tone="gold" size={52} className="absolute -right-7 bottom-2 -z-[1] rotate-12" />
    </span>
  ),
  2: <Medal tone="silver" size={64} />,
  3: <Medal tone="bronze" size={60} />,
};

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // nothing here follows the scrollbar: the podium builds itself once as
    // it comes into view and then stands still
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const block = section.querySelector<HTMLElement>(".prizes-block");
      const stage = section.querySelector<HTMLElement>(".podium-stage");
      const gridEl = section.querySelector<HTMLElement>(".solo-grid");

      // the heading arrives first
      gsap.from(gsap.utils.toArray<HTMLElement>(".prizes-line", section), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: block ?? section, start: "top 85%" },
      });

      // then the steps rise out of their clip boxes, the hardware lands on
      // top, and the plates, tags and captions follow it down
      const at = { trigger: stage ?? section, start: "top 80%" };

      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-step", section), {
        yPercent: 100,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: at,
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-topper", section), {
        y: -60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        delay: 0.5,
        ease: "back.out(1.6)",
        scrollTrigger: at,
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-plate", section), {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.9,
        scrollTrigger: at,
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-tag", section), {
        rotation: -35,
        opacity: 0,
        transformOrigin: "50% 0%",
        duration: 0.5,
        stagger: 0.1,
        delay: 0.95,
        ease: "back.out(2)",
        scrollTrigger: at,
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-caption", section), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 1,
        scrollTrigger: at,
      });

      // the solo awards drop onto their string, each with a little tilt
      gsap.from(gsap.utils.toArray<HTMLElement>(".solo-award", section), {
        y: -60,
        opacity: 0,
        rotation: (i: number) => (i % 2 ? 6 : -6),
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: gridEl ?? section, start: "top 80%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="prizes" className="relative px-4 py-24">
      {/* heading, the stage, and the captions under it */}
      <div className="prizes-block mx-auto max-w-5xl">
        <div className="text-center">
          <p className="prizes-line mb-3 text-sm font-semibold text-saigon">Podium &amp; prizes ✦</p>
          <h2 className="prizes-line text-4xl font-bold leading-tight md:text-5xl">
            Three teams take the <span className="text-saigon">podium</span>
          </h2>
          <p className="prizes-line mt-4 font-medium text-ink/60">
            Every placing team goes home with medals and a prize for each member — and three solo
            awards go to individual builders.
          </p>
        </div>

        {/* the stage: one bolted back panel, the podium standing on the boards */}
        <div className="podium-stage relative mx-auto mt-10 max-w-4xl pt-14 md:pt-16">
          <div
            className="absolute inset-x-0 bottom-10 top-6 rounded-t-3xl border-4 border-saigon bg-saigon-deep"
            aria-hidden="true"
          >
            <Screws className="opacity-60" />
          </div>

          {/* the steps are the picture; the captions under them carry the words */}
          <div className="relative z-10 grid grid-cols-3 items-end gap-3 px-6 md:gap-6 md:px-12" aria-hidden="true">
            {PODIUM.map((award) => (
              <div key={award.place} className={COLUMN[award.place]}>
                {/* what stands on the step — above the clip box, so it is never cut off */}
                <div className="podium-topper relative z-10 -mb-3 flex items-end justify-center">
                  {TOPPER[award.place]}
                </div>
                {/* the clip box: the step rises up out of this */}
                <div className={CLIP[award.place]}>
                  <div className="podium-step relative h-full w-full rounded-t-2xl border-4 border-saigon-deep border-t-[10px] border-t-energy bg-saigon shadow-[inset_0_-6px_0_#01337f]">
                    <Screws className="opacity-70" />
                    {/* the ordinal, big and hollow, over an engraved name plate */}
                    <div className="flex h-full flex-col items-center justify-center gap-2 pb-8">
                      <span className="text-outline-white text-4xl font-bold leading-none md:text-6xl">
                        {award.ordinal}
                      </span>
                      <span className="podium-plate metal-brushed rounded-md border-2 border-saigon px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ink/70 md:text-[11px]">
                        {award.name}
                      </span>
                    </div>
                    {/* a tag hung near the foot of the face — from sm up, where it fits the step */}
                    <div className="podium-tag absolute bottom-3 left-1/2 hidden -translate-x-1/2 sm:block">
                      <PrizeTag tone="white">
                        <span className="whitespace-nowrap text-xs">+ a prize each</span>
                      </PrizeTag>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* the boards */}
          <div
            className="stage-floor relative z-10 h-10 rounded-b-2xl border-4 border-t-0 border-saigon shadow-[0_6px_0_#01337f]"
            aria-hidden="true"
          />
        </div>

        {/* captions under each step, in the same three columns */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 px-6 text-center md:gap-6 md:px-12">
          {PODIUM.map((award) => (
            <div key={award.place} className={CAPTION[award.place]}>
              <h3 className="font-bold">{award.name}</h3>
              <ul className="mt-1 space-y-0.5 text-sm font-medium text-ink/70">
                {award.wins.map((win) => (
                  <li key={win} className="flex items-start justify-center gap-1.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-energy" aria-hidden="true" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs font-semibold text-ink/70">{PRIZE_TBA}</p>
            </div>
          ))}
        </div>
      </div>

      {/* the solo awards: three rosettes hanging off one sagging string */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mt-24 text-sm font-semibold text-saigon">Solo awards ✦</p>
          <h3 className="mt-3 text-2xl font-bold md:text-3xl">
            Three awards for <span className="text-energy">builders of one</span>
          </h3>
          <p className="mt-3 font-medium text-ink/60">
            No medals or trophies here — just a prize, for the individual builders who stood out.
          </p>
        </div>

        <div className="mt-10">
          {/* the string, drawn once across the row and stretched to fit — only
              where the three hang side by side */}
          <svg
            className="solo-string hidden h-10 w-full md:block"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 8 Q300 40 600 8" stroke="#0145b4" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="solo-grid grid grid-cols-1 gap-8 md:-mt-6 md:grid-cols-3">
            {SOLO_AWARDS.map((award) => (
              <div key={award.id} className="solo-award">
                {/* the outer wrapper is the reveal, the inner one swings on the hook */}
                <div className="ambient-hang flex flex-col items-center">
                  <Hook />
                  <Rosette symbol={award.symbol} size={80} />
                  <div className="mt-2 w-full max-w-[16rem] rounded-xl border-[3px] border-saigon bg-white p-4 text-center shadow-[0_6px_0_#cbd8ee]">
                    <h4 className="text-lg font-bold">{award.name}</h4>
                    <p className="text-sm font-medium text-ink/65">{award.blurb}</p>
                    <PrizeTag className="mt-3">
                      <span className="text-xs">{award.prize}</span>
                    </PrizeTag>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
