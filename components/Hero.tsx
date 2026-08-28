"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  PixelGrid,
  Sparkle,
  SaigonSkyline,
  PalmSilhouette,
  PixelPlanet,
  FloatingLaptop,
  FlightArc,
  PixelStack,
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
      // (constant idle motion lives on the inner svg via AmbientMotion)
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
      className="relative flex min-h-svh flex-col items-center justify-start overflow-hidden px-4 pt-28 pb-16 md:pt-40"
    >
      {/* scene: saigon skyline left, palms right (the hoover-tower analog) */}
      {/* the three anchors: big tower left, sign center, foliage corner right */}
      <SaigonSkyline
        className="hero-float pointer-events-none absolute -left-16 bottom-0 hidden sm:block"
        width={660}
        data-speed="0.3"
      />
      <div className="hero-float pointer-events-none absolute -right-8 bottom-0 hidden md:block" data-speed="0.35">
        <PalmSilhouette className="ambient-sway" width={420} />
      </div>
      <div className="hero-float pointer-events-none absolute -right-4 -bottom-3 hidden md:block" data-speed="0.32">
        <PixelStack className="ambient-float" data-amp="s" width={160} />
      </div>

      {/* floating scene props (fewer, bigger — the anchors carry the scene) */}
      <div className="hero-float absolute left-[7%] top-[12%]" data-speed="1.2">
        <PixelPlanet className="ambient-float" size={124} />
      </div>
      <div className="hero-float absolute right-[7%] top-[13%] hidden md:block" data-speed="1.4">
        <FloatingLaptop className="ambient-float" width={132} />
      </div>
      <div className="hero-float absolute right-[11%] top-[34%] hidden lg:block" data-speed="1.1">
        <FlightArc className="ambient-float" width={245} />
      </div>
      <div className="hero-float absolute left-[6%] bottom-[28%] hidden lg:block" data-speed="0.9">
        <FlightArc className="ambient-float -scale-x-100" width={195} color="#f8ac1a" />
      </div>
      <div className="hero-float absolute left-[21%] top-[26%]" data-speed="1.6">
        <PixelGrid className="ambient-float" size={48} />
      </div>
      <div className="hero-float absolute right-[19%] top-[9%]" data-speed="1.1">
        <Sparkle className="ambient-twinkle" size={34} />
      </div>
      <div className="hero-float absolute right-[5%] bottom-[40%] hidden md:block" data-speed="1.3">
        <Sparkle className="ambient-twinkle" size={27} />
      </div>

      <div className="hero-content relative flex max-w-4xl flex-col items-center text-center">
        <div className="relative">
          {/* full orbits wrap sign AND spire — the whole lap stays visible */}
          <svg
            className="pointer-events-none absolute -inset-x-20 -top-28 -bottom-10 h-[calc(100%+9.5rem)] w-[calc(100%+10rem)]"
            viewBox="0 0 760 560"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              id="orbit-blue"
              className="hero-orbit-path"
              d="M 380 28 C 585 28 752 142 752 286 C 752 428 585 544 380 544 C 175 544 8 428 8 286 C 8 142 175 28 380 28"
              stroke="#0145b4"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
            />
            <path
              className="hero-orbit-path"
              d="M 380 44 C 570 44 724 152 724 282 C 724 410 570 520 380 520 C 190 520 36 410 36 282 C 36 152 190 44 380 44"
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
              className="absolute -top-16 left-1/2 h-20 w-16 -translate-x-1/2"
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
