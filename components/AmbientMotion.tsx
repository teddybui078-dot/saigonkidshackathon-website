"use client";

import { useEffect } from "react";
import gsap from "gsap";

/* keeps the page alive: nothing here ever sits quite still. opt in by
   class — .ambient-float drifts, .ambient-twinkle pulses in and out,
   .ambient-sway rocks from the base (palms), .ambient-hang swings from
   the top (lanterns, rosettes, tags), .marquee-bulb chases and
   .bulb-ray glows. data-amp="s" halves the drift for anything sitting
   inside a card, so copy never wanders far. */
export default function AmbientMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils
        .toArray<HTMLElement>(".ambient-float")
        .forEach((el) => {
          const k = el.dataset.amp === "s" ? 0.5 : 1;
          gsap.to(el, {
            y: `+=${gsap.utils.random(10, 22) * k}`,
            x: `+=${gsap.utils.random(-14, 14) * k}`,
            rotation: gsap.utils.random(-5, 5) * k,
            duration: gsap.utils.random(2.8, 5.5),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: gsap.utils.random(0, 1.5),
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".ambient-twinkle")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.55, opacity: 0.35 },
            {
              scale: 1.15,
              opacity: 1,
              duration: gsap.utils.random(1.6, 3),
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              delay: gsap.utils.random(0, 2),
              transformOrigin: "50% 50%",
            }
          );
        });

      gsap.utils.toArray<HTMLElement>(".ambient-sway").forEach((el) => {
        gsap.to(el, {
          rotation: gsap.utils.random(2, 3),
          duration: gsap.utils.random(3.2, 4.5),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "50% 100%",
        });
      });

      // lanterns and hanging things swing gently from their hook
      gsap.utils.toArray<HTMLElement>(".ambient-hang").forEach((el) => {
        gsap.fromTo(
          el,
          { rotation: -1.5 },
          {
            rotation: 1.5,
            duration: gsap.utils.random(2.6, 3.8),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            transformOrigin: "50% 0%",
            delay: gsap.utils.random(0, 1.5),
          }
        );
      });

      // marquee bulbs chase along the sign
      gsap.fromTo(
        ".marquee-bulb",
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "sine.inOut",
          stagger: { each: 0.12, repeat: -1, yoyo: true },
        }
      );

      // the idea bulb's rays pulse
      gsap.utils.toArray<HTMLElement>(".bulb-ray").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.3, scale: 0.85 },
          {
            opacity: 1,
            scale: 1.05,
            duration: 1.1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            transformOrigin: "50% 45%",
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return null;
}
