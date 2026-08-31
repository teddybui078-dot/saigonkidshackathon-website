"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid } from "./decorations";
import { ChalkScribble } from "./space";
import { DrawnBubbleBg, DrawnTail, type TailKind } from "./drawn";
import { EVENT, AGES, GRADES, TEAM_SIZE } from "./event";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Who can join?",
    a: `Any kid aged ${AGES} (${GRADES}) who's curious about making things with technology. There are ${EVENT.spots} builder spots, first come first served.`,
  },
  {
    q: "Do I need to know how to code?",
    a: "Nope! Total beginners are welcome. Mentors will help you every step of the way, and there are beginner-friendly tools for every idea.",
  },
  {
    q: "What should I bring?",
    a: "A laptop if you have one (we have loaners if you don't), a water bottle, and your biggest idea. We handle everything else.",
  },
  {
    q: "How much does it cost?",
    a: `${EVENT.fee.display} per builder. That covers the whole day — lunch, snacks, the builders kit, mentors, and the judging lab. How to pay comes with registration.`,
  },
  {
    q: "Do parents stay?",
    a: `Yes — a parent or guardian stays on site for the whole day, so a grown-up is always there if anything comes up. School and camp groups can send one or two adult chaperones instead. Demos and awards at ${EVENT.demos} are open to the whole family.`,
  },
  {
    q: "How do teams work?",
    a: `Teams of ${TEAM_SIZE} — three is the sweet spot. Come with friends, join team matching on the morning, or go solo if you'd rather build alone.`,
  },
];

/* which tail each bubble trails — the nervous coding question thinks in
   dots, the money question gets the curl */
const TAIL_KINDS: TailKind[] = ["wedge", "dots", "curl", "curl", "wedge", "dots"];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative px-4 py-28 md:py-32">
      {/* big hook: a giant question mark leaning in from the right */}
      <span
        className="anchor-wiggle pointer-events-none absolute right-12 top-1/4 -z-[1] hidden rotate-12 text-outline-blue select-none text-[14rem] font-bold leading-none opacity-40 lg:block"
        aria-hidden="true"
      >
        ?
      </span>
      {/* a chalk flick looping past the question mark */}
      <div className="pointer-events-none absolute right-[24%] top-16 -z-[1] hidden -rotate-[4deg] lg:block">
        <ChalkScribble kind="loop" width={85} />
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="relative text-center">
          <PixelGrid className="ambient-float absolute -top-8 right-0 hidden md:block" size={24} />
          <p className="mb-3 text-sm font-semibold tracking-wide text-energy-deep">
            Good questions ✦
          </p>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Frequently asked <span className="text-energy">everything</span>
          </h2>
        </div>

        <div className="mt-12 space-y-7">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                data-open={isOpen}
                className="faq-item relative text-ink"
              >
                <DrawnBubbleBg shape={i} tone="paper" />
                {/* each bubble trails its own tail, alternating sides */}
                <DrawnTail
                  side={i % 2 === 0 ? "left" : "right"}
                  kind={TAIL_KINDS[i]}
                  className={`absolute -bottom-[22px] ${i % 2 === 0 ? "left-10" : "right-10"}`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="relative flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-saigon text-xl font-bold transition-transform duration-300 ${
                      isOpen
                        ? "rotate-45 bg-saigon text-white shadow-[0_2px_0_#01337f]"
                        : "bg-energy text-ink shadow-[0_2px_0_#d18e07]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div className="faq-answer relative">
                  <div>
                    <p className="px-6 pb-5 font-medium text-ink/70">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
