"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "who can join?",
    a: "any kid aged 8–15 who's curious about making things with technology. we have around 130 spots, first come first served.",
  },
  {
    q: "do i need to know how to code?",
    a: "nope! total beginners are welcome. mentors will help you every step of the way, and there are beginner-friendly tools for every track.",
  },
  {
    q: "what should i bring?",
    a: "a laptop if you have one (we have loaners if you don't), a water bottle, and your biggest idea. we handle everything else.",
  },
  {
    q: "is it free?",
    a: "yes — free to attend, including meals, snacks, swag, and all the workshops. thanks to our sponsors!",
  },
  {
    q: "do parents stay?",
    a: "parents check you in and can hang out in the family lounge. the demo showcase at 5pm is open to everyone — bring the whole family.",
  },
  {
    q: "how do teams work?",
    a: "teams of 2–4. come with friends or join our team-matching game in the morning — either way, you won't build alone.",
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
    <section ref={sectionRef} id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="relative text-center">
          <PixelGrid className="absolute -top-8 right-0 hidden md:block" size={32} />
          <p className="mb-3 text-sm font-semibold text-saigon">
            good questions ✦
          </p>
          <h2 className="text-4xl font-bold lowercase leading-tight md:text-5xl">
            frequently asked <span className="text-energy">everything</span>
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                data-open={isOpen}
                className="faq-item rounded-2xl bg-white shadow-[0_2px_12px_rgba(30,41,59,0.05)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold lowercase">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition-transform duration-300 ${
                      isOpen
                        ? "rotate-45 bg-saigon text-white"
                        : "bg-canvas text-saigon"
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
