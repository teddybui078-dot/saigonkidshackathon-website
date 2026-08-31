"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrizeTag } from "./illustrations";
import { Pushpin } from "./parts";
import SiteLink from "./SiteLink";
import { EVENT, FEE_COVERS } from "./event";
import { ON_SITE_RULE, CHAPERONE_RULE } from "./parents";

gsap.registerPlugin(ScrollTrigger);

const PILL =
  "mt-5 inline-flex rounded-full bg-energy px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_0_#d18e07]";

function SquareBullet() {
  // a small yellow square in place of a dot
  return (
    <span
      className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-[3px] border-2 border-saigon bg-energy"
      aria-hidden="true"
    />
  );
}

export default function Essentials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // nothing here follows the scrollbar — these are the two facts a family
    // reads before deciding, so they arrive once and then hold still
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(gsap.utils.toArray<HTMLElement>(".essentials-line", section), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".essentials-card", section), {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="essentials" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="essentials-line mb-3 text-sm font-semibold text-saigon">
            Before anything else ✦
          </p>
          <h2 className="essentials-line text-4xl font-bold leading-tight md:text-5xl">
            What it <span className="text-saigon">costs</span>, and the one{" "}
            <span className="text-saigon">rule</span>
          </h2>
          <p className="essentials-line mt-4 font-medium text-ink/60">
            Two things decide whether the day works for your family. Here they are, up front.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
          {/* the fee, on an index card */}
          <div className="essentials-card paper-index relative rounded-lg border-[3px] border-saigon p-6 pt-14 shadow-[0_8px_0_#cbd8ee] md:p-8 md:pt-14">
            <h3 className="absolute left-6 top-3 text-xs font-bold uppercase tracking-widest text-saigon/70">
              The fee
            </h3>

            {/* the price on a luggage tag, hung from a short string */}
            <div className="relative inline-block pt-4">
              <span
                className="absolute left-[18px] top-0 h-5 w-[3px] rounded-full bg-saigon"
                aria-hidden="true"
              />
              <span className="ambient-hang inline-block">
                <PrizeTag className="[transform:rotate(-1deg)] [filter:drop-shadow(0_4px_0_#01337f)]">
                  <span className="text-lg font-bold md:text-xl">
                    {EVENT.fee.display} per builder
                  </span>
                </PrizeTag>
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink/50">
              What it covers
            </p>
            <ul className="mt-2 space-y-1">
              {FEE_COVERS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base font-medium leading-7 text-ink/70 md:text-lg"
                >
                  <SquareBullet />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base font-medium leading-7 text-ink/70 md:text-lg">
              How and when to pay comes with your registration confirmation. Registration opens
              soon.
            </p>
          </div>

          {/* the rule, on a notice pinned to the page */}
          <div className="essentials-card relative rounded-2xl border-4 border-saigon bg-white p-6 pt-9 shadow-[0_8px_0_#01337f] md:p-8 md:pt-10">
            <Pushpin className="absolute -top-3 left-6" />
            <Pushpin className="absolute -top-3 right-6" />

            <span className="stamp [transform:rotate(-3deg)] text-saigon" aria-hidden="true">
              Stays on site — all day
            </span>

            <h3 className="mt-4 text-xl font-bold leading-8 text-saigon md:text-2xl md:leading-9">
              {ON_SITE_RULE}
            </h3>
            <p className="mt-4 text-base font-medium leading-7 text-ink/70 md:text-lg">
              {CHAPERONE_RULE}
            </p>
            <p className="mt-3 text-base font-medium leading-7 text-ink/70 md:text-lg">
              Why: if a child feels unwell or anything unexpected happens, an adult who knows them
              is already on site.
            </p>

            <SiteLink href="/parents" className={PILL}>
              Read the parents&apos; guide →
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
