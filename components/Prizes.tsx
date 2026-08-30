"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelTrophy, Sparkle, PixelGrid, PixelStack } from "./decorations";
import { Screws, Hook } from "./parts";
import { Medal, Rosette, PrizeTag } from "./illustrations";
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

/* each step has its own height; the clip box is the ground it rises out of */
const CLIP: Record<TeamAward["place"], string> = {
  1: "podium-clip h-52 w-full overflow-hidden md:h-64",
  2: "podium-clip h-40 w-full overflow-hidden md:h-52",
  3: "podium-clip h-32 w-full overflow-hidden md:h-40",
};

/* what stands on top of each step: the trophy (with a gold medal tucked
   behind its shoulder) on first, a medal on the other two */
const TOPPER: Record<TeamAward["place"], React.ReactNode> = {
  1: (
    <span className="relative inline-block">
      <PixelTrophy size={110} className="h-auto w-20 md:w-[110px]" />
      <Medal tone="gold" size={54} className="absolute -right-7 bottom-1 -z-[1] rotate-12" />
    </span>
  ),
  2: <Medal tone="silver" size={64} />,
  3: <Medal tone="bronze" size={60} />,
};

/* where on the pinned timeline each step starts rising: third first, then
   second, then the winner takes the longest */
const RISE: Record<TeamAward["place"], { at: number; duration: number }> = {
  3: { at: 0, duration: 1 },
  2: { at: 0.5, duration: 1 },
  1: { at: 1, duration: 1.2 },
};

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 48rem)", // tailwind's md — keeps css and gsap in step
        tall: "(min-height: 44rem)", // room for the whole podium under the navbar while pinned
      },
      (ctx) => {
        const { motionOK, desktop, tall } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const pinEl = section.querySelector<HTMLElement>(".prizes-pin");
        const stage = section.querySelector<HTMLElement>(".podium-stage");
        const steps = gsap.utils.toArray<HTMLElement>(".podium-step", section);
        const toppers = gsap.utils.toArray<HTMLElement>(".podium-topper", section);
        const trophyTopper = section.querySelector<HTMLElement>(".podium-topper-trophy");
        const medalToppers = gsap.utils.toArray<HTMLElement>(".podium-topper-medal", section);
        const tags = gsap.utils.toArray<HTMLElement>(".podium-tag", section);
        const captions = gsap.utils.toArray<HTMLElement>(".podium-caption", section);

        // the heading arrives once, before the pin begins
        gsap.from(gsap.utils.toArray<HTMLElement>(".prizes-line", section), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: pinEl ?? section, start: "top 85%" },
        });

        if (pinEl && desktop && tall) {
          // pin the whole podium and raise it out of the ground as you
          // scroll: third step, second, then first, then the hardware
          // lands on top and the tags swing in
          gsap.set([...steps, ...toppers, ...tags], { willChange: "transform" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // functions so a resize re-measures: centre the block, but never
              // tuck it under the fixed navbar
              start: () =>
                "top " + Math.max(88, Math.round((window.innerHeight - pinEl.offsetHeight) / 2)),
              end: () => "+=" + 2.2 * window.innerHeight,
            },
          });
          steps.forEach((step, i) => {
            const rise = RISE[PODIUM[i].place];
            // each step rises from inside its own clip box
            tl.fromTo(
              step,
              { yPercent: 100 },
              { yPercent: 0, ease: "power2.out", duration: rise.duration },
              rise.at
            );
          });
          if (trophyTopper) {
            tl.from(trophyTopper, { y: -180, opacity: 0, ease: "bounce.out", duration: 1 }, 2.0);
          }
          tl.from(
            medalToppers,
            {
              y: -140,
              opacity: 0,
              rotation: (i: number) => (i ? 12 : -12),
              ease: "back.out(1.6)",
              duration: 0.8,
              stagger: 0.15,
            },
            2.1
          );
          tl.from(
            tags,
            {
              rotation: -35,
              opacity: 0,
              transformOrigin: "50% 0%",
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            2.6
          );
          tl.from(captions, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, 2.7);
          tl.to({}, { duration: 0.4 }); // hold on the finished podium before letting go
        } else {
          // small screens: the steps rise together and the hardware drops on
          gsap.from(steps, {
            yPercent: 100,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: stage ?? section, start: "top 75%" },
          });
          gsap.from(toppers, {
            y: -60,
            opacity: 0,
            stagger: 0.12,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: stage ?? section, start: "top 70%" },
          });
        }

        // the solo awards drop onto their string, each with a little tilt
        const gridEl = section.querySelector<HTMLElement>(".solo-grid");
        gsap.from(gsap.utils.toArray<HTMLElement>(".solo-award", section), {
          y: -60,
          opacity: 0,
          rotation: (i: number) => (i % 2 ? 6 : -6),
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: gridEl ?? section, start: "top 80%" },
        });
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="prizes" className="relative px-4 py-24">
      {/* big hooks: a brick pile in the corner, a sparkle, a pixel cluster by the heading */}
      <div className="anchor-drift pointer-events-none absolute bottom-24 left-6 -z-[1] hidden lg:block">
        <PixelStack width={190} />
      </div>
      <div className="pointer-events-none absolute right-16 top-[30%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={56} />
      </div>
      <div className="pointer-events-none absolute left-[12%] top-28 -z-[1] hidden lg:block">
        <PixelGrid className="ambient-float" size={72} />
      </div>

      {/* the pinned block: heading, the three steps, the ground they stand on,
          and the captions under it */}
      <div className="prizes-pin mx-auto max-w-5xl">
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

        <div className="podium-stage mx-auto mt-10 max-w-3xl">
          {/* the steps are the picture; the captions under them carry the words */}
          <div className="grid grid-cols-3 items-end gap-3 md:gap-6" aria-hidden="true">
            {PODIUM.map((award) => (
              <div key={award.place} className={COLUMN[award.place]}>
                {/* what stands on the step — above the clip box, so it is never cut off */}
                <div
                  className={
                    award.trophy
                      ? "podium-topper podium-topper-trophy relative z-10 -mb-3 flex items-end justify-center"
                      : "podium-topper podium-topper-medal relative z-10 -mb-3 flex items-end justify-center"
                  }
                >
                  {TOPPER[award.place]}
                </div>
                {/* the clip box: the step rises up out of this */}
                <div className={CLIP[award.place]}>
                  <div
                    className="podium-step relative h-full w-full rounded-t-2xl border-4 border-saigon-deep border-t-[10px] border-t-energy bg-saigon shadow-[inset_0_-6px_0_#01337f]"
                  >
                    <Screws className="opacity-70" />
                    {/* the ordinal, big and hollow, sitting above the tag */}
                    <div className="flex h-full items-center justify-center pb-8">
                      <span className="text-outline-white text-5xl font-bold leading-none md:text-7xl">
                        {award.ordinal}
                      </span>
                    </div>
                    {/* a tag hung near the foot of the face — from sm up, where it fits the step */}
                    <div className="podium-tag absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block">
                      <PrizeTag tone="white">
                        <span className="whitespace-nowrap text-xs">+ a prize each</span>
                      </PrizeTag>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* the ground */}
          <div className="h-3 w-full rounded-full bg-saigon shadow-[0_4px_0_#01337f]" aria-hidden="true" />

          {/* captions under each step, in the same three columns */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center md:gap-6">
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
                  <Rosette size={80} />
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
