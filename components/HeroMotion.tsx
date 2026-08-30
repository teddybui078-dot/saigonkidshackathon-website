"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/* the moving part of the hero: the section, the entrance, the logo's
   idle drift and the parallax on the art. the layers themselves arrive
   as children from Hero.tsx, so their svg stays server-rendered and
   never ships as client code. the readable layer never scrubs. */
export default function HeroMotion({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // the entrance: logo pops, the card lands, the words arrive, the
      // rocket rises into place, the mascots pop in. all .from(), so with
      // no js (or no motion) the final state is what you get
      const intro = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });
      intro
        .from(".hero-logo", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2)",
          transformOrigin: "50% 50%",
        })
        .from(
          ".hero-sticker",
          { y: 40, scale: 0.94, opacity: 0, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.35"
        )
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=0.3"
        )
        .from(".hero-rocket", { y: 80, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.9")
        .from(
          ".hero-mascot",
          {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(2)",
            transformOrigin: "50% 50%",
          },
          "-=0.6"
        );

      // the logo drifts — translate only, it never tilts
      gsap.to(".hero-logo", {
        y: -8,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.6,
      });

      // the art parallaxes at its own depth as you scroll on; the words don't
      gsap.utils.toArray<HTMLElement>(".hero-float", section).forEach((el) => {
        const speed = Number(el.dataset.speed ?? 1);
        gsap.to(el, {
          y: () => -120 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="on-space relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-48 pt-28 md:pb-64 md:pt-32"
    >
      {children}
    </section>
  );
}
