"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelGrid, PixelStack } from "./decorations";
import { Screws, Hook } from "./parts";
import { Trophy, Medal, Rosette, PrizeTag, Bunting, Spotlight, Starburst } from "./illustrations";
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

/* where on the pinned timeline each step starts rising: third first, then
   second, then the winner takes the longest */
const RISE: Record<TeamAward["place"], { at: number; duration: number }> = {
  3: { at: 0.6, duration: 1 },
  2: { at: 1.0, duration: 1 },
  1: { at: 1.4, duration: 1.2 },
};

/* the confetti burst around the trophy: where each piece lands (px from
   the burst's centre) and what it is. literal, so the server and the
   browser draw the same thing */
const CONFETTI = [
  { x: -96, y: -70, r: 20, kind: "square-yellow" },
  { x: -70, y: -118, r: -30, kind: "dot-blue" },
  { x: -36, y: -140, r: 12, kind: "square-white" },
  { x: 8, y: -152, r: 40, kind: "dot-yellow" },
  { x: 52, y: -134, r: -18, kind: "square-blue" },
  { x: 92, y: -100, r: 25, kind: "dot-white" },
  { x: 112, y: -56, r: -40, kind: "square-yellow" },
  { x: -120, y: -22, r: 8, kind: "dot-yellow" },
  { x: 124, y: -8, r: -12, kind: "square-blue" },
  { x: -84, y: 10, r: 32, kind: "square-white" },
  { x: 76, y: 24, r: -26, kind: "dot-blue" },
  { x: -48, y: -92, r: -8, kind: "dot-white" },
  { x: 30, y: -108, r: 16, kind: "square-yellow" },
  { x: -14, y: -60, r: 0, kind: "dot-blue" },
] as const;

const CONFETTI_KIND: Record<(typeof CONFETTI)[number]["kind"], string> = {
  "square-yellow": "block h-3 w-3 rounded-[3px] bg-energy",
  "square-blue": "block h-3 w-3 rounded-[3px] bg-flare",
  "square-white": "block h-3 w-3 rounded-[3px] border-2 border-ink-deep bg-white",
  "dot-yellow": "block h-3 w-3 rounded-full bg-energy",
  "dot-blue": "block h-3 w-3 rounded-full bg-flare",
  "dot-white": "block h-3 w-3 rounded-full border-2 border-ink-deep bg-white",
};

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 48rem)", // tailwind's md — keeps css and gsap in step
        tall: "(min-height: 52rem)", // room for the whole stage under the navbar while pinned
      },
      (ctx) => {
        const { motionOK, desktop, tall } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const pinEl = section.querySelector<HTMLElement>(".prizes-pin");
        const stage = section.querySelector<HTMLElement>(".podium-stage");
        const curtains = gsap.utils.toArray<HTMLElement>(".curtain-panel", section);
        const starburst = section.querySelector<HTMLElement>(".starburst");
        const bunting = section.querySelector<HTMLElement>(".bunting");
        const spotL = section.querySelector<HTMLElement>(".spotlight-l");
        const spotR = section.querySelector<HTMLElement>(".spotlight-r");
        const steps = gsap.utils.toArray<HTMLElement>(".podium-step", section);
        const toppers = gsap.utils.toArray<HTMLElement>(".podium-topper", section);
        const trophyTopper = section.querySelector<HTMLElement>(".podium-topper-trophy");
        const medalToppers = gsap.utils.toArray<HTMLElement>(".podium-topper-medal", section);
        const confetti = gsap.utils.toArray<HTMLElement>(".confetti", section);
        const tags = gsap.utils.toArray<HTMLElement>(".podium-tag", section);
        const plates = gsap.utils.toArray<HTMLElement>(".podium-plate", section);
        const captions = gsap.utils.toArray<HTMLElement>(".podium-caption", section);

        // the confetti rests where the css puts it; the burst flies it there
        // from the centre
        const confettiFrom = {
          x: (i: number) => -CONFETTI[i].x,
          y: (i: number) => -CONFETTI[i].y,
          rotation: 0,
          scale: 0,
        };
        const confettiTo = {
          x: 0,
          y: 0,
          rotation: (i: number) => CONFETTI[i].r,
          scale: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(2)",
        };

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
          // pin the stage and run the show as you scroll: the bunting drops
          // and the spotlights swing on, the curtains part on a starburst,
          // the steps rise third-second-first, the trophy and medals land,
          // confetti bursts, and the plates and tags come last
          gsap.set([...steps, ...toppers, ...tags, ...curtains, ...confetti], { willChange: "transform" });
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
              end: () => "+=" + 2.6 * window.innerHeight,
            },
          });
          if (bunting) tl.from(bunting, { y: -40, opacity: 0, duration: 0.6, ease: "power2.out" }, 0);
          if (spotL) {
            tl.fromTo(
              spotL,
              { rotation: -40 },
              { rotation: -18, duration: 0.7, ease: "power2.out", transformOrigin: "50% 10%" },
              0
            );
          }
          if (spotR) {
            tl.fromTo(
              spotR,
              { rotation: 40 },
              { rotation: 18, duration: 0.7, ease: "power2.out", transformOrigin: "50% 10%" },
              0
            );
          }
          tl.fromTo(curtains, { scaleX: 1 }, { scaleX: 0.08, duration: 1, ease: "power2.inOut" }, 0.2);
          if (starburst) {
            tl.fromTo(
              starburst,
              { scale: 0.6, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
              0.9
            );
          }
          steps.forEach((step, i) => {
            const rise = RISE[PODIUM[i].place];
            // each step rises from inside its own clip box
            tl.fromTo(step, { yPercent: 100 }, { yPercent: 0, ease: "power2.out", duration: rise.duration }, rise.at);
          });
          if (trophyTopper) {
            tl.from(trophyTopper, { y: -180, opacity: 0, ease: "bounce.out", duration: 1 }, 2.4);
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
            2.5
          );
          tl.fromTo(confetti, confettiFrom, confettiTo, 3.1);
          tl.from(plates, { y: 12, opacity: 0, duration: 0.4, stagger: 0.08 }, 3.2);
          tl.from(
            tags,
            { rotation: -35, opacity: 0, transformOrigin: "50% 0%", duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
            3.25
          );
          tl.from(captions, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, 3.3);
          tl.to({}, { duration: 0.4 }); // hold on the finished stage before letting go
        } else {
          // small screens or short windows: the curtain opens once as the
          // stage comes into view, then the steps rise, the hardware drops
          // on and the confetti pops
          const trigger = stage ?? section;
          gsap.fromTo(
            curtains,
            { scaleX: 1 },
            { scaleX: 0.08, duration: 0.9, ease: "power2.inOut", scrollTrigger: { trigger, start: "top 75%" } }
          );
          if (starburst) {
            gsap.from(starburst, {
              scale: 0.6,
              opacity: 0,
              duration: 0.5,
              delay: 0.6,
              ease: "back.out(1.5)",
              scrollTrigger: { trigger, start: "top 75%" },
            });
          }
          gsap.from(steps, {
            yPercent: 100,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: { trigger, start: "top 75%" },
          });
          gsap.from(toppers, {
            y: -60,
            opacity: 0,
            stagger: 0.12,
            delay: 1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger, start: "top 75%" },
          });
          gsap.fromTo(confetti, confettiFrom, {
            ...confettiTo,
            delay: 1.5,
            scrollTrigger: { trigger, start: "top 75%" },
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

      {/* the pinned block: heading, the stage, and the captions under it */}
      <div className="prizes-pin mx-auto max-w-5xl">
        <div className="text-center">
          <p className="prizes-line mb-3 text-sm font-semibold text-sun">Podium &amp; prizes ✦</p>
          <h2 className="prizes-line text-4xl font-bold leading-tight md:text-5xl">
            Three teams take the <span className="text-sun">podium</span>
          </h2>
          <p className="prizes-line mt-4 font-medium text-white/70">
            Every placing team goes home with medals and a prize for each member — and three solo
            awards go to individual builders.
          </p>
        </div>

        {/* the stage: a back curtain in a screwed frame, spotlights in the
            corners, bunting across the top, the podium on the boards */}
        <div className="podium-stage relative mx-auto mt-10 max-w-4xl pt-14 md:pt-16">
          {/* the back curtain — at rest the panels are tied back (the css
              state), the show closes them and draws them open again */}
          <div
            className="curtain absolute inset-x-0 bottom-10 top-6 overflow-hidden rounded-t-3xl border-4 border-ink-deep bg-saigon-deep"
            aria-hidden="true"
          >
            <Screws className="opacity-60" />
            <div className="starburst absolute left-1/2 top-2 -translate-x-1/2">
              <Starburst className="anchor-wobble" size={230} />
            </div>
            <span className="curtain-panel curtain-pleats absolute inset-y-0 left-0 w-1/2 origin-left [transform:scaleX(0.08)]" />
            <span className="curtain-panel curtain-pleats absolute inset-y-0 right-0 w-1/2 origin-right [transform:scaleX(0.08)]" />
            <span className="absolute left-[2%] top-[42%] h-9 w-[6%] rounded-full border-2 border-saigon bg-energy" />
            <span className="absolute right-[2%] top-[42%] h-9 w-[6%] rounded-full border-2 border-saigon bg-energy" />
          </div>

          {/* the lamps, aimed at first place; gsap swings them from the head */}
          <div
            className="spotlight-l pointer-events-none absolute left-1 top-0 z-20 origin-[50%_10%] [transform:rotate(-18deg)] md:left-4"
            aria-hidden="true"
          >
            <Spotlight width={80} />
          </div>
          <div
            className="spotlight-r pointer-events-none absolute right-1 top-0 z-20 origin-[50%_10%] [transform:rotate(18deg)] md:right-4"
            aria-hidden="true"
          >
            <Spotlight width={80} />
          </div>

          <Bunting className="bunting pointer-events-none absolute inset-x-4 top-0 z-20 h-12 w-[calc(100%-2rem)] md:h-14" />

          {/* the steps are the picture; the captions under them carry the words */}
          <div className="relative z-10 grid grid-cols-3 items-end gap-3 px-6 md:gap-6 md:px-12" aria-hidden="true">
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
                  {award.trophy && (
                    // the burst: every piece rests where its css puts it, and
                    // flies there from the middle when the trophy lands
                    <div className="confetti-burst pointer-events-none absolute left-1/2 top-10 h-0 w-0">
                      {CONFETTI.map((c, i) => (
                        <span key={i} className="confetti absolute" style={{ left: c.x - 6, top: c.y - 6 }}>
                          <span className={`ambient-twinkle ${CONFETTI_KIND[c.kind]}`} />
                        </span>
                      ))}
                    </div>
                  )}
                  {TOPPER[award.place]}
                </div>
                {/* the clip box: the step rises up out of this */}
                <div className={CLIP[award.place]}>
                  <div className="podium-step relative h-full w-full rounded-t-2xl border-4 border-ink-deep border-t-[10px] border-t-energy bg-space-light shadow-[inset_0_-6px_0_#0d1b2a]">
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
            className="stage-floor relative z-10 h-10 rounded-b-2xl border-4 border-t-0 border-ink-deep shadow-[0_6px_0_#ffd166]"
            aria-hidden="true"
          />
        </div>

        {/* captions under each step, in the same three columns */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 px-6 text-center md:gap-6 md:px-12">
          {PODIUM.map((award) => (
            <div key={award.place} className={CAPTION[award.place]}>
              <h3 className="font-bold">{award.name}</h3>
              <ul className="mt-1 space-y-0.5 text-sm font-medium text-white/75">
                {award.wins.map((win) => (
                  <li key={win} className="flex items-start justify-center gap-1.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-energy" aria-hidden="true" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs font-semibold text-white/75">{PRIZE_TBA}</p>
            </div>
          ))}
        </div>
      </div>

      {/* the solo awards: three rosettes hanging off one sagging string */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mt-24 text-sm font-semibold text-sun">Solo awards ✦</p>
          <h3 className="mt-3 text-2xl font-bold md:text-3xl">
            Three awards for <span className="text-energy">builders of one</span>
          </h3>
          <p className="mt-3 font-medium text-white/70">
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
            <path d="M0 8 Q300 40 600 8" stroke="#ffd166" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="solo-grid grid grid-cols-1 gap-8 md:-mt-6 md:grid-cols-3">
            {SOLO_AWARDS.map((award) => (
              <div key={award.id} className="solo-award">
                {/* the outer wrapper is the reveal, the inner one swings on the hook */}
                <div className="ambient-hang flex flex-col items-center">
                  <Hook />
                  <Rosette symbol={award.symbol} size={80} />
                  <div className="mt-2 w-full max-w-[16rem] rounded-xl border-[3px] border-ink-deep bg-white p-4 text-center text-ink shadow-[0_6px_0_#ffd166]">
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
