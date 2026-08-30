"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, FlightArc } from "./decorations";
import { Screws, ClipboardClip } from "./parts";
import SiteLink from "./SiteLink";
import { RUBRIC, RUBRIC_TOTAL, RUBRIC_MAX, RUBRIC_COUNT_WORD, TIE_BREAKERS, JUDGING_LAB } from "./rubric";
import { RULES } from "./rules";

gsap.registerPlugin(ScrollTrigger);

/* the rows fill one after another as you scroll — each one starts this far
   into the one before it, so the card reads like a judge working down it */
const ROW_STEP = 0.55;

/* the rulebook entry the chip points at, numbered from the data */
const JUDGING_RULE = RULES.find((r) => r.id === "judging-and-prizes");
const RULE_LABEL = `Rule ${String(JUDGING_RULE?.n ?? 9).padStart(2, "0")}`;

export default function Judging() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { motionOK } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const board = section.querySelector<HTMLElement>(".judge-board");
        const sheet = section.querySelector<HTMLElement>(".judge-sheet");
        const stamp = section.querySelector<HTMLElement>(".judge-stamp");
        const total = section.querySelector<HTMLElement>(".judge-total");
        const totalFill = section.querySelector<HTMLElement>(".judge-total-bar .judge-fill");
        const rows = gsap.utils.toArray<HTMLElement>(".judge-row", section);
        const fills = gsap.utils.toArray<HTMLElement>(".judge-fill", section);
        if (!board || !sheet || !stamp || !total || !totalFill) return;

        // the heading arrives once
        gsap.from(gsap.utils.toArray<HTMLElement>(".judge-line", section), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        });

        // the clipboard drops onto the desk once
        gsap.from(board, {
          y: 60,
          opacity: 0,
          rotation: 2,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: board, start: "top 80%" },
        });

        // the card starts blank: empty bars and zeros in the margin. the
        // printed numbers are remembered so they can go back on revert
        const originals = new Map<HTMLElement, string>();
        const counters = rows.map((row) => row.querySelector<HTMLElement>(".judge-pts"));
        [...counters, total].forEach((el) => {
          if (!el) return;
          originals.set(el, el.textContent ?? "");
          el.textContent = "0";
        });
        gsap.set(fills, { scaleX: 0, transformOrigin: "0% 50%" });
        // gsap owns the stamp's tilt from here on; the class has it otherwise
        gsap.set(stamp, { rotation: -6 });

        // the scorecard fills in as you scroll past it, and rewinds on the
        // way back up
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sheet, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
        });
        rows.forEach((row, i) => {
          const fill = row.querySelector<HTMLElement>(".judge-fill");
          const pts = counters[i];
          if (!fill || !pts) return;
          const target = Number(pts.dataset.value);
          const counter = { n: 0 };
          tl.to(fill, { scaleX: 1, duration: 1, ease: "power2.out" }, i * ROW_STEP);
          tl.to(
            counter,
            {
              n: target,
              duration: 1,
              ease: "power2.out",
              snap: { n: 1 },
              onUpdate: () => {
                pts.textContent = String(Math.round(counter.n));
              },
            },
            i * ROW_STEP
          );
        });

        // the total tallies up steadily across the whole card
        const span = rows.length * ROW_STEP + 1;
        const sum = { n: 0 };
        tl.to(totalFill, { scaleX: 1, duration: span, ease: "none" }, 0);
        tl.to(
          sum,
          {
            n: RUBRIC_TOTAL,
            duration: span,
            ease: "none",
            snap: { n: 1 },
            onUpdate: () => {
              total.textContent = String(Math.round(sum.n));
            },
          },
          0
        );

        // and the stamp comes down on the finished card
        tl.fromTo(
          stamp,
          { scale: 1.6, opacity: 0, rotation: -14 },
          { scale: 1, opacity: 1, rotation: -6, duration: 0.5, ease: "back.out(3)" }
        );

        return () => {
          originals.forEach((text, el) => {
            el.textContent = text;
          });
        };
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="judging" className="relative px-4 py-24">
      {/* big hooks: the score everyone is chasing, an arc, a sparkle */}
      <span
        className="anchor-wiggle text-outline-blue pointer-events-none absolute left-6 top-24 -z-[1] hidden select-none rotate-[-8deg] text-[13rem] font-bold leading-none lg:block"
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
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="judge-line mb-3 text-sm font-semibold text-saigon">How judging works ✦</p>
          <h2 className="judge-line text-4xl font-bold leading-tight md:text-5xl">
            {RUBRIC_TOTAL} points, <span className="text-saigon">{RUBRIC_COUNT_WORD} questions</span>
          </h2>
          <p className="judge-line mt-4 font-medium text-ink/60">{JUDGING_LAB}</p>
        </div>

        {/* a judge's clipboard: a blue board with corner screws, the metal clip
            over the top edge, and a scorecard held slightly askew under it */}
        <div className="judge-board relative mx-auto mt-16 max-w-3xl rounded-2xl border-4 border-saigon bg-saigon-deep p-5 shadow-[0_8px_0_#01337f] md:px-7 md:pb-7">
          <Screws />
          <ClipboardClip className="absolute -top-6 left-1/2 z-10 -translate-x-1/2" width={130} />
          <div className="judge-sheet paper-index relative rotate-[-0.6deg] rounded-lg border-[3px] border-saigon px-6 pb-6 pt-4 md:px-8 md:pb-8">
            {/* the printed header sits on the card's blue rule */}
            <div className="flex min-h-6 flex-wrap items-center justify-between gap-x-4 gap-y-0.5 text-[11px] font-bold tracking-widest text-saigon/70">
              <span>SCORECARD</span>
              <span>
                team <span aria-hidden="true">________</span>
              </span>
              <span>
                judge <span aria-hidden="true">________</span>
              </span>
            </div>

            {/* one row per question: the word, the bar, the points */}
            <ol className="mt-8 grid gap-y-4">
              {RUBRIC.map((c) => (
                <li
                  key={c.id}
                  className="judge-row grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-x-3 gap-y-1 md:grid-cols-[8rem_1fr_3.5rem]"
                >
                  <span className="text-sm font-bold md:text-lg">{c.title}</span>
                  <span
                    className="h-4 overflow-hidden rounded-full border-2 border-[#c9d7ee] bg-mist"
                    aria-hidden="true"
                  >
                    <span
                      className="judge-fill block h-full origin-left rounded-full bg-energy"
                      style={{ width: (c.pts / RUBRIC_MAX) * 100 + "%" }}
                    />
                  </span>
                  {/* the animated digit is decoration; the real score is read out once */}
                  <span className="text-right">
                    <span className="judge-pts text-lg font-bold text-saigon" data-value={c.pts} aria-hidden="true">
                      {c.pts}
                    </span>
                    <span className="sr-only">{c.pts} points</span>
                  </span>
                  <p className="col-span-2 col-start-2 text-sm font-medium leading-5 text-ink/60">{c.note}</p>
                </li>
              ))}
            </ol>

            {/* the total, under a dashed tear-off line */}
            <div className="mt-4 grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-x-3 border-t-2 border-dashed border-saigon/30 pt-4 md:grid-cols-[8rem_1fr_3.5rem]">
              <span className="text-lg font-bold md:text-xl">Total</span>
              <span
                className="judge-total-bar h-4 overflow-hidden rounded-full border-2 border-[#c9d7ee] bg-mist"
                aria-hidden="true"
              >
                <span className="judge-fill block h-full w-full origin-left rounded-full bg-saigon" />
              </span>
              <span className="text-right leading-none">
                <span className="judge-total text-2xl font-bold text-saigon" data-value={RUBRIC_TOTAL} aria-hidden="true">
                  {RUBRIC_TOTAL}
                </span>
                <span className="sr-only">{RUBRIC_TOTAL} points</span>
                <span className="block text-xs font-semibold text-ink/60" aria-hidden="true">
                  / {RUBRIC_TOTAL}
                </span>
              </span>
            </div>

            {/* the foot of the card: the stamp comes down here once the card
                is full (it's in flow, so it's on screen when the timeline
                reaches it), then the tie-breakers and the rulebook chip */}
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span
                  className="judge-stamp stamp inline-block text-saigon [transform:rotate(-6deg)]"
                  aria-hidden="true"
                >
                  Tested in the lab
                </span>
                <p className="mt-3 text-sm font-semibold text-ink/70">Ties: {TIE_BREAKERS.join(" → ")}</p>
              </div>
              <SiteLink
                href="/rules#judging-and-prizes"
                className="rounded-full border-2 border-saigon bg-white px-4 py-1.5 text-sm font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white"
              >
                {RULE_LABEL} in the rulebook →
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
