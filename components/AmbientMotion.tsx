"use client";

import { useEffect } from "react";
import gsap from "gsap";

/* keeps every decoration alive: nothing on the page ever sits still.
   opt in by class — .ambient-float drifts, .ambient-twinkle pulses in
   and out, .ambient-sway rocks from the base (palms). data-amp="s"
   halves the drift for elements inside cards. */
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

      /* ——— signature moves for the big section anchors ——— */

      // every anchor keeps drifting vertically at full amplitude
      gsap.utils.toArray<HTMLElement>(".anchor-drift").forEach((el) => {
        gsap.to(el, {
          y: `+=${gsap.utils.random(14, 20)}`,
          duration: gsap.utils.random(3.5, 5),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 1),
        });
      });

      // laptop and planets slowly rock
      gsap.utils.toArray<HTMLElement>(".anchor-wobble").forEach((el) => {
        gsap.fromTo(
          el,
          { rotation: -6 },
          {
            rotation: 6,
            duration: gsap.utils.random(4, 6),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
          }
        );
      });

      // the question mark swings like a pendulum
      gsap.utils.toArray<HTMLElement>(".anchor-wiggle").forEach((el) => {
        gsap.fromTo(
          el,
          { rotation: 5 },
          {
            rotation: 18,
            duration: 2.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
          }
        );
      });

      // the heart beats: thump-thump… pause
      gsap.utils.toArray<HTMLElement>(".anchor-beat").forEach((el) => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2 })
          .to(el, { scale: 1.12, duration: 0.14, ease: "power2.out", transformOrigin: "50% 50%" })
          .to(el, { scale: 1, duration: 0.16, ease: "power2.in" })
          .to(el, { scale: 1.08, duration: 0.14, ease: "power2.out" })
          .to(el, { scale: 1, duration: 0.25, ease: "power2.inOut" });
      });

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

      // the clock actually ticks
      gsap.to(".clock-hand-m", {
        rotation: "+=360",
        duration: 12,
        repeat: -1,
        ease: "none",
        svgOrigin: "100 100",
      });
      gsap.to(".clock-hand-h", {
        rotation: "+=360",
        duration: 144,
        repeat: -1,
        ease: "none",
        svgOrigin: "100 100",
      });
    });
    return () => mm.revert();
  }, []);

  return null;
}
