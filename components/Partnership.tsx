"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlightArc, PixelGrid, Sparkle } from "./decorations";
import { LogoSlot } from "./parts";
import { PARTNERS } from "./partners";

gsap.registerPlugin(ScrollTrigger);

export default function Partnership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 48rem)", // tailwind's md — keeps css and gsap in step
      },
      (ctx) => {
        const { motionOK, desktop } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const pinEl = section.querySelector<HTMLElement>(".partners-pin");
        const rowsEl = section.querySelector<HTMLElement>(".partners-rows");
        if (!pinEl || !rowsEl) return;
        const rows = gsap.utils.toArray<HTMLElement>(".partner-row", section);
        const crosses = gsap.utils.toArray<HTMLElement>(".partner-cross", section);

        // the heading arrives once, before the pin begins
        gsap.from(".partners-line", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: pinEl, start: "top 85%" },
        });

        if (desktop) {
          // pin the block and let the three lockups meet in the middle: each
          // name slides in from its own side, and a × stamps in between them
          // just before the next one lands. scrubbed, so scrolling up rewinds.
          gsap.set([...rows, ...crosses], { willChange: "transform" });
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
              end: () => "+=" + 0.7 * rows.length * window.innerHeight,
            },
          });
          rows.forEach((row, i) => {
            tl.fromTo(
              row,
              { x: i % 2 ? 140 : -140, opacity: 0 },
              { x: 0, opacity: 1, ease: "power2.out", duration: 1 },
              i
            );
            if (i > 0) {
              tl.fromTo(
                crosses[i - 1],
                { scale: 0, rotation: -90 },
                { scale: 1, rotation: 0, ease: "back.out(2)", duration: 0.5 },
                i - 0.35
              );
            }
          });
          tl.to({}, { duration: 0.4 }); // hold on the finished lockup before letting go
        } else {
          // small screens: the names and crosses simply arrive as you scroll
          gsap.from(".partner-row, .partner-cross", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: rowsEl, start: "top 75%" },
          });
        }
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="partners" className="relative overflow-hidden px-4 py-24">
      {/* big hooks either side — the words themselves stay bare */}
      <div className="anchor-drift pointer-events-none absolute left-6 top-16 -z-[1] hidden lg:block">
        <FlightArc width={260} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-12 right-10 -z-[1] hidden lg:block">
        <PixelGrid size={88} />
      </div>
      <div className="pointer-events-none absolute right-24 top-20 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={44} />
      </div>

      {/* pinned: the heading and the three lockups beneath it */}
      <div className="partners-pin mx-auto max-w-5xl text-center">
        <p className="partners-line mb-3 text-sm font-semibold text-saigon">The partnership ✦</p>
        <h2 className="partners-line text-4xl font-bold leading-tight md:text-5xl">
          Three teams, <span className="text-saigon">one big day</span>
        </h2>
        <p className="partners-line mt-4 font-medium text-ink/60">The partnership that makes it happen.</p>

        {/* plain lockups: a logo slot and a name, a × between each pair.
            no box — the type is the object here */}
        <div className="partners-rows mt-12 flex flex-col items-center">
          {PARTNERS.map((partner, i) => (
            <div key={partner.name} className="contents">
              {i > 0 && (
                <span
                  className="partner-cross my-3 text-5xl font-bold leading-none text-energy md:my-4 md:text-7xl"
                  aria-hidden="true"
                >
                  ×
                </span>
              )}
              <div className="partner-row flex flex-col items-center gap-3 md:flex-row md:gap-8">
                <LogoSlot partner={partner} size={120} />
                <p className="text-balance text-4xl font-bold leading-[1.05] text-saigon sm:text-5xl md:text-6xl lg:text-7xl">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
