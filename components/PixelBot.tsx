"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOT_W = 90;

/* the pixel bot — a friendly robot built from the logo's pixel language.
   travels the whole page in a smooth zigzag as you scroll (see effect below). */
export default function PixelBot() {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const root = rootRef.current;
        const inner = innerRef.current;
        if (!root || !inner) return;

        let tl: gsap.core.Timeline | null = null;
        let blinkCall: gsap.core.Tween | null = null;

        // ——— zigzag flight: keyframed timeline scrubbed over the whole page ———
        const build = () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();

          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const max = ScrollTrigger.maxScroll(window);
          const clampX = (frac: number) =>
            gsap.utils.clamp(16, vw - BOT_W - 16, vw * frac - BOT_W / 2);

          // arrive as the section top nears mid-viewport, hold until it leaves —
          // the bot parks beside a section while you read it and swoops between
          const band = (sel: string, x: number, y: number) => {
            const node = document.querySelector(sel) as HTMLElement | null;
            if (!node) return [];
            const top = node.getBoundingClientRect().top + window.scrollY;
            const h = node.offsetHeight;
            const pIn = gsap.utils.clamp(0, 1, (top - vh * 0.55) / max);
            const pOut = gsap.utils.clamp(0, 1, (top + h - vh * 0.45) / max);
            return [
              { p: pIn, x, y },
              { p: pOut, x, y },
            ];
          };

          // tracks is pinned: measure its pin-spacer so the hover band is exact
          const tracksEl = document.querySelector("#tracks");
          const spacer = (tracksEl?.closest(".pin-spacer") ?? tracksEl) as
            | HTMLElement
            | null;
          let tracksStart: number | null = null;
          let tracksEnd: number | null = null;
          if (spacer) {
            const top = spacer.getBoundingClientRect().top + window.scrollY;
            tracksStart = gsap.utils.clamp(0, 1, top / max);
            tracksEnd = gsap.utils.clamp(
              0,
              1,
              (top + spacer.offsetHeight - vh) / max
            );
          }

          const raw: Array<{ p: number | null; x: number; y: number }> = [
            { p: 0, x: 0.76, y: 0.26 }, // hero perch beside the sign
            { p: 0.04, x: 0.76, y: 0.26 }, // hold
            ...band("#about", 0.06, 0.46),
            { p: tracksStart, x: 0.88, y: 0.24 },
            { p: tracksEnd, x: 0.88, y: 0.3 }, // hover while pinned cards stream by
            ...band("#schedule", 0.06, 0.5),
            ...band("#faq", 0.92, 0.44),
            ...band("#sponsors", 0.07, 0.4),
            { p: 1, x: 0.76, y: 0.6 }, // footer landing
          ];

          // keep only valid, strictly-increasing progress stops
          const stops: Array<{ p: number; x: number; y: number }> = [];
          for (const s of raw) {
            if (s.p === null) continue;
            const p =
              stops.length > 0 ? Math.max(s.p, stops[stops.length - 1].p) : s.p;
            if (stops.length > 0 && p - stops[stops.length - 1].p < 0.005)
              continue;
            stops.push({ p, x: clampX(s.x), y: vh * s.y });
          }
          if (stops.length < 2) return;

          gsap.set(root, { x: stops[0].x, y: stops[0].y });

          tl = gsap.timeline({
            defaults: { ease: "sine.inOut" },
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 1.5,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          });
          for (let i = 1; i < stops.length; i++) {
            tl.to(
              root,
              {
                x: stops[i].x,
                y: stops[i].y,
                duration: stops[i].p - stops[i - 1].p,
              },
              stops[i - 1].p
            );
          }
          // thruster eases off for the footer landing
          tl.to(".bot-thruster", { opacity: 0.35, duration: 0.06 }, 0.94);
        };

        build();
        ScrollTrigger.addEventListener("refresh", build);

        // ——— rotation: lean into the direction of travel ———
        const rotTo = gsap.quickTo(inner, "rotation", {
          duration: 0.35,
          ease: "power2.out",
        });
        let prevX = Number(gsap.getProperty(root, "x"));
        const tick = () => {
          const x = Number(gsap.getProperty(root, "x"));
          const vx = (x - prevX) / gsap.ticker.deltaRatio();
          prevX = x;
          rotTo(gsap.utils.clamp(-12, 12, vx * 0.35));
        };
        gsap.ticker.add(tick);

        // ——— idle life ———
        gsap.to(root, { opacity: 1, duration: 0.5, delay: 0.4 });
        gsap.to(inner, {
          y: -6,
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".bot-thruster", {
          scaleY: () => gsap.utils.random(0.7, 1.15),
          opacity: () => gsap.utils.random(0.7, 1),
          duration: 0.12,
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          transformOrigin: "50% 0%",
        });
        gsap.to(".bot-antenna-sparkle", {
          scale: 1.35,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
        const blink = () => {
          gsap.to(".bot-eye", {
            scaleY: 0.12,
            duration: 0.07,
            yoyo: true,
            repeat: 1,
            transformOrigin: "50% 50%",
          });
          blinkCall = gsap.delayedCall(gsap.utils.random(2.2, 4.5), blink);
        };
        blinkCall = gsap.delayedCall(2, blink);

        return () => {
          ScrollTrigger.removeEventListener("refresh", build);
          gsap.ticker.remove(tick);
          blinkCall?.kill();
          tl?.scrollTrigger?.kill();
          tl?.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden opacity-0 will-change-transform md:motion-safe:block"
    >
      <div ref={innerRef} className="will-change-transform">
        <svg
          width={BOT_W}
          height={BOT_W}
          viewBox="0 0 96 96"
          fill="none"
          aria-hidden="true"
        >
          {/* thruster */}
          <g className="bot-thruster">
            <rect x="38" y="76" width="7" height="13" rx="3.5" fill="#f8ac1a" />
            <rect x="47" y="76" width="7" height="17" rx="3.5" fill="#f8ac1a" />
            <rect x="56" y="76" width="7" height="11" rx="3.5" fill="#f8ac1a" opacity="0.85" />
          </g>
          {/* body — canvas-color stroke keeps it readable on the blue footer */}
          <g className="bot-body">
            <rect
              x="22"
              y="30"
              width="52"
              height="46"
              rx="15"
              fill="#0145b4"
              stroke="#f1f5f9"
              strokeWidth="3"
            />
            <rect x="30" y="56" width="36" height="14" rx="7" fill="#3b6fce" />
            <rect x="26" y="36" width="6" height="6" rx="1.5" fill="#f8ac1a" />
            <rect x="64" y="66" width="6" height="6" rx="1.5" fill="#f8ac1a" />
          </g>
          {/* eyes + smile */}
          <g className="bot-eyes">
            <g className="bot-eye">
              <rect x="33" y="38" width="11" height="13" rx="5" fill="white" />
              <circle cx="38.5" cy="44.5" r="2.6" fill="#1e293b" />
            </g>
            <g className="bot-eye">
              <rect x="52" y="38" width="11" height="13" rx="5" fill="white" />
              <circle cx="57.5" cy="44.5" r="2.6" fill="#1e293b" />
            </g>
            <path
              d="M43 61 C 46 64 50 64 53 61"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
          {/* antenna with sparkle */}
          <g className="bot-antenna">
            <path d="M48 30 L48 18" stroke="#0145b4" strokeWidth="4" strokeLinecap="round" />
            <circle cx="48" cy="16" r="4" fill="#f8ac1a" stroke="#0145b4" strokeWidth="2" />
            <path
              className="bot-antenna-sparkle"
              d="M48 2 c0.45 2.35 1.15 3.35 5.4 5.4 -4.25 2.05 -4.95 3.05 -5.4 5.4 -0.45 -2.35 -1.15 -3.35 -5.4 -5.4 4.25 -2.05 4.95 -3.05 5.4 -5.4z"
              fill="#f8ac1a"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
