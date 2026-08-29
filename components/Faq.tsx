"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Who can join?",
    a: "Any kid aged 8–15 who's curious about making things with technology. We have around 130 spots, first come first served.",
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
    q: "Is it free?",
    a: "Yes — free to attend, including meals, snacks, swag, and all the workshops. Thanks to our sponsors!",
  },
  {
    q: "Do parents stay?",
    a: "Parents check you in and can hang out in the family lounge. The demo showcase at 5pm is open to everyone — bring the whole family.",
  },
  {
    q: "How do teams work?",
    a: "Teams of 2–4. Come with friends or join our team-matching game in the morning — either way, you won't build alone.",
  },
];

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
    <section ref={sectionRef} id="faq" className="relative px-4 py-24">
      {/* big hook: a giant question mark leaning in from the right */}
      <span
        className="anchor-wiggle pointer-events-none absolute right-12 top-1/4 -z-[1] hidden rotate-12 select-none text-[16rem] font-bold leading-none text-[#c9d7ee] lg:block"
        aria-hidden="true"
      >
        ?
      </span>
      <div className="mx-auto max-w-3xl">
        <div className="relative text-center">
          <PixelGrid className="ambient-float absolute -top-8 right-0 hidden md:block" size={32} />
          <p className="mb-3 text-sm font-semibold text-saigon">
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
                className="faq-item relative rounded-2xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#cbd8ee]"
              >
                {/* speech-bubble tail, alternating sides */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-[13px] h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-saigon bg-white ${
                    i % 2 === 0 ? "left-10" : "right-10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-saigon text-xl font-bold transition-transform duration-300 ${
                      isOpen
                        ? "rotate-45 bg-saigon text-white shadow-[0_3px_0_#01337f]"
                        : "bg-energy text-ink shadow-[0_3px_0_#d18e07]"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div className="faq-answer">
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
