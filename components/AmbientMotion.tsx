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
    });
    return () => mm.revert();
  }, []);

  return null;
}
