"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  PixelGrid,
  Sparkle,
  SpeedLines,
  SaigonSkyline,
  PalmSilhouette,
  PixelPlanet,
  FloatingLaptop,
  FlightArc,
} from "./decorations";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function SplitWord({ word, className }: { word: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="hero-letter inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });
      intro
        .from(".hero-sign", {
          y: 50,
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
        })
        .from(
          ".hero-letter",
          {
            y: 40,
            opacity: 0,
            rotate: () => gsap.utils.random(-12, 12),
            duration: 0.6,
            stagger: 0.03,
          },
          "-=0.35"
        )
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".hero-orbit-path",
          {
            strokeDashoffset: (i, el) =>
              (el as SVGPathElement).getTotalLength(),
            duration: 1.4,
            ease: "power2.inOut",
            stagger: 0.15,
          },
          "<"
        )
        .from(
          ".hero-spire-ring",
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 50%",
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=1"
        )
        .from(".hero-logo", { scale: 0, duration: 0.7, ease: "back.out(2)" }, "-=1");

      // pixel satellite rides the blue orbit forever
      gsap.to(".hero-satellite", {
        motionPath: {
          path: "#orbit-blue",
          align: "#orbit-blue",
          alignOrigin: [0.5, 0.5],
        },
        duration: 14,
        repeat: -1,
        ease: "none",
        delay: 1.4,
      });

      // the sign gently floats (translate only — the logo inside never rotates)
      gsap.to(".hero-sign", {
        y: -8,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // floating accents drift at their own parallax speeds
      gsap.utils.toArray<HTMLElement>(".hero-float").forEach((el) => {
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
        if (speed > 0.5) {
          gsap.to(el, {
            y: `+=${gsap.utils.random(8, 18)}`,
            duration: gsap.utils.random(1.8, 3),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      });

      // the whole hero gently recedes as you scroll on
      gsap.to(".hero-content", {
        opacity: 0,
        scale: 0.94,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "40% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-hint", {
        y: 8,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-mist to-canvas px-4 pt-24 pb-16"
    >
      {/* soft swirl strokes across the sky */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-60 240 C 320 140 780 150 1500 260"
          stroke="#c9d7ee"
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M-60 620 C 420 740 980 730 1500 600"
          stroke="#c9d7ee"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M-60 430 C 460 380 900 400 1500 430"
          stroke="#dde6f4"
          strokeWidth="60"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      {/* scene: saigon skyline left, palms right (the hoover-tower analog) */}
      <SaigonSkyline
        className="hero-float pointer-events-none absolute -left-6 bottom-0 hidden sm:block md:left-0"
        width={330}
        data-speed="0.3"
      />
      <PalmSilhouette
        className="hero-float pointer-events-none absolute -right-4 bottom-0 hidden md:block"
        width={210}
        data-speed="0.35"
      />

      {/* floating scene props */}
      <PixelPlanet className="hero-float absolute left-[10%] top-[14%]" size={92} data-speed="1.2" />
      <PixelPlanet className="hero-float absolute right-[26%] bottom-[16%] hidden lg:block" size={64} data-speed="0.8" />
      <FloatingLaptop className="hero-float absolute right-[9%] top-[15%] hidden md:block" width={92} data-speed="1.4" />
      <FlightArc className="hero-float absolute right-[13%] top-[30%] hidden lg:block" width={190} data-speed="1.1" />
      <FlightArc className="hero-float absolute left-[7%] bottom-[30%] -scale-x-100 hidden lg:block" width={150} color="#f8ac1a" data-speed="0.9" />
      <PixelGrid className="hero-float absolute left-[22%] top-[24%]" size={38} data-speed="1.6" />
      <Sparkle className="hero-float absolute right-[20%] top-[10%]" size={26} data-speed="1.1" />
      <Sparkle className="hero-float absolute left-[15%] bottom-[24%]" size={18} color="#0145b4" data-speed="0.7" />
      <Sparkle className="hero-float absolute right-[6%] bottom-[34%] hidden md:block" size={20} data-speed="1.3" />
      <SpeedLines className="hero-float absolute left-[30%] top-[16%] -scale-x-100 hidden md:block" color="#f8ac1a" data-speed="0.8" />

      <div className="hero-content relative flex max-w-4xl flex-col items-center text-center">
        <div className="relative">
          {/* orbit swooshes wrap the whole sign */}
          <svg
            className="pointer-events-none absolute -inset-x-14 -inset-y-8 h-[calc(100%+4rem)] w-[calc(100%+7rem)]"
            viewBox="0 0 700 420"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              id="orbit-blue"
              className="hero-orbit-path"
              d="M 350 18 C 620 18 692 120 692 210 C 692 310 550 402 350 402 C 150 402 8 310 8 210 C 8 120 80 18 350 18"
              stroke="#0145b4"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
            />
            <path
              className="hero-orbit-path"
              d="M 350 40 C 590 40 664 128 664 210 C 664 296 540 380 350 380 C 160 380 36 296 36 210 C 36 128 110 40 350 40"
              stroke="#f8ac1a"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
            />
            <rect
              className="hero-satellite"
              x="0"
              y="0"
              width="14"
              height="14"
              rx="3"
              fill="#f8ac1a"
              stroke="#0145b4"
              strokeWidth="2.5"
            />
          </svg>

          {/* the sign */}
          <div className="hero-sign relative rounded-[2rem] border-4 border-saigon bg-white px-8 py-8 shadow-[0_10px_40px_rgba(1,69,180,0.12)] sm:px-14 sm:py-10">
            {/* spire + golden rings */}
            <svg
              className="absolute -top-[4.4rem] left-1/2 h-20 w-16 -translate-x-1/2"
              viewBox="0 0 64 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M32 80 L32 14" stroke="#0145b4" strokeWidth="6" strokeLinecap="round" />
              <circle cx="32" cy="10" r="7" fill="#f8ac1a" stroke="#0145b4" strokeWidth="3" />
              <ellipse className="hero-spire-ring" cx="32" cy="30" rx="26" ry="7" stroke="#f8ac1a" strokeWidth="3.5" />
              <ellipse className="hero-spire-ring" cx="32" cy="46" rx="19" ry="5.5" stroke="#f8ac1a" strokeWidth="3" />
            </svg>
            {/* yellow bolts on the frame */}
            <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />
            <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />

            <Image
              src="/logo.png"
              alt="saigon kids hackathon logo"
              width={110}
              height={110}
              priority
              className="hero-logo mx-auto mb-4"
            />

            <h1 className="relative text-5xl font-bold lowercase leading-[0.95] sm:text-6xl md:text-7xl">
              <span className="sr-only">saigon kids hackathon</span>
              <SplitWord word="saigon kids" className="block text-energy" />
              <SplitWord word="hackathon" className="block text-saigon" />
            </h1>

            <p className="hero-fade mt-5 text-base font-semibold text-ink sm:text-lg">
              march 6, 2027 · ho chi minh city
            </p>
          </div>
        </div>

        <p className="hero-fade mt-10 max-w-xl text-lg font-medium text-ink/80 md:text-xl">
          one big day of building, coding, and playing — for 130 young makers
          aged 8–15.
        </p>

        <div className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-ink shadow-[0_6px_0_#d18e07]">
            registration opens soon
            <Sparkle size={16} color="#1e293b" />
          </span>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#about");
              if (el && window.__lenis) {
                window.__lenis.scrollTo(el as HTMLElement, { offset: -72 });
              } else {
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="rounded-full border-2 border-saigon bg-white/70 px-7 py-3 text-base font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white"
          >
            what is it?
          </a>
        </div>
      </div>

      <p className="hero-hint absolute bottom-6 text-sm font-medium text-ink/50">
        scroll to explore ↓
      </p>
    </section>
  );
}
