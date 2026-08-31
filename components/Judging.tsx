"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, FlightArc, SparkleCross } from "./decorations";
import { ChalkScribble } from "./space";
import { DrawnPaddleBg } from "./drawn";
import { CoilStake } from "./parts";
import SiteLink from "./SiteLink";
import { RUBRIC, RUBRIC_TOTAL, RUBRIC_COUNT_WORD, TIE_BREAKERS, JUDGING_LAB, type Criterion } from "./rubric";
import { RULES } from "./rules";

gsap.registerPlugin(ScrollTrigger);

/* the rulebook entry the chip points at, numbered from the data */
const JUDGING_RULE = RULES.find((r) => r.id === "judging-and-prizes");
const RULE_LABEL = `Rule ${String(JUDGING_RULE?.n ?? 9).padStart(2, "0")}`;

/* a bigger paddle for a bigger score — full strings so tailwind sees them */
const PADDLE: Record<number, { card: string; number: string }> = {
  30: { card: "w-32", number: "text-5xl" },
  20: { card: "w-[7.25rem]", number: "text-4xl" },
  15: { card: "w-28", number: "text-4xl" },
  10: { card: "w-[6.5rem]", number: "text-3xl" },
};
const paddleFor = (c: Criterion) => PADDLE[c.pts] ?? PADDLE[15];

/* each paddle leans its own way on its stick, and no two sticks were
   cut the same length — full strings so tailwind sees them */
const PADDLE_TILT = [
  "-rotate-2",
  "rotate-[3deg]",
  "-rotate-[1.5deg]",
  "rotate-2",
  "-rotate-[2.5deg]",
  "rotate-[1.5deg]",
  "-rotate-[3deg]",
];
const STICK_LENGTH = ["h-14", "h-10", "h-12", "h-14", "h-10", "h-12", "h-14"];

export default function Judging() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;
      const table = section.querySelector<HTMLElement>(".judge-table");

      // the heading arrives once
      gsap.from(gsap.utils.toArray<HTMLElement>(".judge-line", section), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      // the judges raise their paddles once, left to right, then the total
      // badge pops up beside the table. nothing here follows the scrollbar.
      gsap.from(gsap.utils.toArray<HTMLElement>(".judge-paddle", section), {
        y: 80,
        opacity: 0,
        rotation: (i: number) => (i % 2 ? 6 : -6),
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: table ?? section, start: "top 80%" },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".judge-badge", section), {
        scale: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "back.out(2)",
        scrollTrigger: { trigger: table ?? section, start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="judging" className="relative px-4 py-24">
      {/* big hooks: the score everyone is chasing, an arc, a sparkle */}
      <span
        className="anchor-wiggle text-outline-white pointer-events-none absolute left-6 top-24 -z-[1] hidden select-none rotate-[-8deg] text-[13rem] font-bold leading-none lg:block"
        aria-hidden="true"
      >
        {RUBRIC_TOTAL}
      </span>
      <div className="anchor-drift pointer-events-none absolute bottom-24 right-16 -z-[1] hidden lg:block">
        <FlightArc width={220} />
      </div>
      <div className="pointer-events-none absolute right-[12%] top-36 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={30} />
      </div>
      {/* the sky doodling around the scoreboard */}
      <div className="pointer-events-none absolute left-[24%] top-16 -z-[1] hidden -rotate-6 lg:block">
        <ChalkScribble kind="loop" width={110} />
      </div>
      <SparkleCross className="pointer-events-none absolute bottom-32 left-16 -z-[1] hidden lg:block" size={22} />

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="judge-line mb-3 text-sm font-semibold text-sun">How judging works ✦</p>
          <h2 className="judge-line text-4xl font-bold leading-tight md:text-5xl">
            {RUBRIC_TOTAL} points, <span className="text-sun">{RUBRIC_COUNT_WORD} questions</span>
          </h2>
          <p className="judge-line mt-4 font-medium text-white/70">{JUDGING_LAB}</p>
        </div>

        {/* the judges' table: seven score paddles held up in a row, each
            planted in the table by its stick. the bigger the score, the
            bigger the paddle. */}
        <div className="judge-table mt-16">
          <ol className="grid grid-cols-2 items-end justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4 md:grid-cols-7 md:gap-x-3">
            {RUBRIC.map((c) => {
              const p = paddleFor(c);
              const i = RUBRIC.indexOf(c);
              return (
                <li key={c.id} className="judge-paddle flex flex-col items-center">
                  {/* outer li is the raise, this one sways from the stick's base */}
                  <div className="ambient-sway flex flex-col items-center">
                    <div className={`${p.card} ${PADDLE_TILT[i]} relative px-2 pb-3 pt-4 text-center text-ink`}>
                      <DrawnPaddleBg shape={i} tone="paper" />
                      <span className={`${p.number} relative block font-bold leading-none text-saigon`} aria-hidden="true">
                        {c.pts}
                      </span>
                      <span
                        className="relative mt-1 block text-[10px] font-bold uppercase tracking-widest text-ink/50"
                        aria-hidden="true"
                      >
                        pts
                      </span>
                      <span className="sr-only">{c.pts} points —</span>
                      <span className="relative mt-2 block rounded-md border-2 border-ink-deep bg-energy px-1 py-1 text-xs font-bold leading-tight">
                        {c.title}
                      </span>
                    </div>
                    <span className={`${STICK_LENGTH[i]} w-2.5 rounded-b-md bg-energy border border-ink-deep`} aria-hidden="true" />
                  </div>
                  {/* on phones the note sits right under its paddle */}
                  <p className="mt-3 max-w-[11rem] text-center text-sm font-medium leading-5 text-white/70 md:hidden">
                    {c.note}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* the table the sticks are planted in */}
          <div className="h-4 rounded-full bg-space-light shadow-[0_5px_0_#ffd166]" aria-hidden="true" />
          <div className="mx-16 flex justify-between" aria-hidden="true">
            <span className="h-8 w-3 rounded-b-sm bg-space-light" />
            <span className="h-8 w-3 rounded-b-sm bg-space-light" />
          </div>

          {/* from md the notes line up under their paddles, below the table */}
          <ul className="mt-6 hidden grid-cols-7 gap-x-3 md:grid">
            {RUBRIC.map((c) => (
              <li key={c.id} className="text-center text-sm font-medium leading-5 text-white/70">
                {c.note}
              </li>
            ))}
          </ul>
        </div>

        {/* the total, the stamp, the tie-breakers, the rulebook */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          <div className="flex items-end gap-4">
            {/* the total rides a springy staked aerial, like it bounced up there */}
            <div className="judge-badge flex flex-col items-center">
              <span className="relative z-10 grid h-24 w-24 place-items-center rounded-full border-4 border-ink-deep bg-energy text-center shadow-[0_6px_0_#d99a00]">
                <span className="block text-3xl font-bold leading-none">
                  {RUBRIC_TOTAL}
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-ink/60">points</span>
                </span>
              </span>
              <CoilStake className="-mt-2" />
            </div>
            <span
              className="stamp -rotate-6 text-sun [mix-blend-mode:normal]"
              style={{ "--stamp-gap": "#0d1b2a" } as React.CSSProperties}
              aria-hidden="true"
            >
              Tested in the lab
            </span>
          </div>
          <p className="text-sm font-semibold text-white/75">Ties: {TIE_BREAKERS.join(" → ")}</p>
          <SiteLink
            href="/rules#judging-and-prizes"
            className="rounded-full border-2 border-ink-deep bg-white px-4 py-1.5 text-sm font-semibold text-saigon transition-colors hover:bg-space-light hover:text-white"
          >
            {RULE_LABEL} in the rulebook →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
