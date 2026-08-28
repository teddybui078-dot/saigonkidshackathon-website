"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelClock } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const SLOTS = [
  { time: "8:00", title: "check-in & breakfast", body: "grab a badge, a bánh mì, and find your table." },
  { time: "9:00", title: "opening ceremony", body: "the countdown, the tracks, and a surprise or two." },
  { time: "9:30", title: "hacking begins!", body: "teams form, laptops open, ideas start flying." },
  { time: "12:00", title: "lunch break", body: "refuel with friends — and sneak a peek at other teams." },
  { time: "14:00", title: "mini workshops", body: "quick, fun sessions: game design, robots, and ai tricks." },
  { time: "16:30", title: "code freeze", body: "hands off the keyboard — time to practice your pitch." },
  { time: "17:00", title: "demo time", body: "every team on stage showing what they built today." },
  { time: "18:00", title: "awards & closing", body: "prizes, high-fives, and photos to remember it by." },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // the timeline spine draws itself as you travel down the day
      gsap.fromTo(
        ".schedule-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".schedule-list",
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".schedule-item").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="schedule" className="relative px-4 py-24">
      {/* big hook: a giant clock keeping the day\u2019s time */}
      <div className="anchor-drift pointer-events-none absolute left-8 top-1/3 -z-[1] hidden lg:block">
        <PixelClock size={310} />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-saigon">
            march 6, 2027 ✦
          </p>
          <h2 className="text-4xl font-bold lowercase leading-tight md:text-5xl">
            one <span className="text-saigon">big</span> day
          </h2>
        </div>

        <div className="schedule-list relative mt-16">
          {/* spine */}
          <div
            className="schedule-spine absolute left-[1.1rem] top-0 h-full w-1.5 rounded-full bg-saigon md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {SLOTS.map((slot, i) => (
              <li
                key={slot.time}
                className={`schedule-item relative flex items-start gap-6 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:mr-auto md:flex-row-reverse md:pr-10 md:text-right"
                    : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`absolute left-2 top-1.5 h-5 w-5 rounded-md border-[3px] border-saigon ${
                    i % 2 === 0
                      ? "bg-energy md:left-auto md:-right-2.5"
                      : "bg-white md:-left-2.5"
                  }`}
                  aria-hidden="true"
                />
                <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(30,41,59,0.05)]">
                  <p className="text-sm font-bold text-energy-deep">
                    {slot.time}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold lowercase">
                    {slot.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink/65">
                    {slot.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex justify-center">
            <Sparkle className="ambient-twinkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
