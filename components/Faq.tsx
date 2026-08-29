"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { PixelGrid } from "./decorations";
import { BubbleTail } from "./parts";

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

        {/* a chat thread: questions asked from the left, answered from the right */}
        <div className="mt-12 space-y-8">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} data-open={isOpen} className="faq-item flex flex-col">
                <div className="flex items-end gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-saigon bg-energy text-lg font-bold text-ink"
                    aria-hidden="true"
                  >
                    ?
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="relative flex max-w-[85%] items-center gap-4 rounded-2xl rounded-bl-md border-[3px] border-saigon bg-energy px-5 py-4 text-left shadow-[0_4px_0_#d18e07]"
                  >
                    <BubbleTail side="left" fill="#f8ac1a" />
                    <span className="text-lg font-semibold">{faq.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-saigon text-lg font-bold transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-saigon text-white" : "bg-white text-saigon"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </div>
                <div className="faq-answer">
                  <div>
                    {/* padding keeps the tail and shadow inside the clipped row */}
                    <div className="mt-5 flex items-end justify-end gap-3 pb-5 pr-1">
                      <div className="relative max-w-[85%] rounded-2xl rounded-br-md border-[3px] border-saigon bg-white px-5 py-4 shadow-[0_4px_0_#cbd8ee]">
                        <BubbleTail side="right" fill="#ffffff" />
                        <p className="font-medium text-ink/70">{faq.a}</p>
                      </div>
                      <Image src="/logo.png" alt="" width={36} height={36} className="shrink-0" />
                    </div>
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
