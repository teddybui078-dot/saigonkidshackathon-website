"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/* the moving part of the hero: the section, the entrance and the parallax.
   the layers arrive as children from Hero.tsx so their svg stays
   server-rendered. gsap only ever writes transforms on wrappers — the
   css loops animate the separate translate/rotate/scale properties on
   the elements inside, so the two never fight. */
export default function HeroMotion({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // the entrance: the sign drops in, the words arrive, the city
      // rises, the astronaut pops. all .from(), so with no js (or no
      // motion) the final state is what you get
      const intro = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });
      intro
        .from(".hero-sign", { y: -90, opacity: 0, duration: 0.9, ease: "back.out(1.4)" })
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".hero-landmark",
          { y: 90, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-mascot-wrap",
          { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(2)", transformOrigin: "50% 50%" },
          "-=0.6"
        );

      // the sign bobs and sways on its stems, drifting in place
      gsap.to(".hero-sign", {
        y: -10,
        rotation: 0.7,
        transformOrigin: "50% 0",
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.8,
      });

      // the art parallaxes at its own depth as you scroll on; the sign
      // stays put so the behind-board planets keep their crop
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
      className="relative isolate flex min-h-svh flex-col items-center justify-start overflow-hidden px-4 pb-44 pt-[7.5rem] md:pb-44 md:pt-[8.75rem]"
    >
      {children}
    </section>
  );
}
