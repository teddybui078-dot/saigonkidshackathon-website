"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixelGrid, Sparkle, CodeMark, SpeedLines } from "./decorations";

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
        .from(".hero-letter", {
          y: 60,
          opacity: 0,
          rotate: () => gsap.utils.random(-12, 12),
          duration: 0.7,
          stagger: 0.035,
        })
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
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

      // gentle idle bob for the logo (translate only — never rotate the mark)
      gsap.to(".hero-logo", {
        y: -10,
        duration: 2.2,
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
        gsap.to(el, {
          y: `+=${gsap.utils.random(8, 18)}`,
          duration: gsap.utils.random(1.8, 3),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
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
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* floating accents */}
      <PixelGrid className="hero-float absolute left-[8%] top-[18%]" size={44} data-speed="1.4" />
      <Sparkle className="hero-float absolute right-[12%] top-[16%]" size={30} data-speed="1.1" />
      <Sparkle className="hero-float absolute left-[16%] bottom-[22%]" size={20} color="#0145b4" data-speed="0.7" />
      <PixelGrid className="hero-float absolute right-[7%] bottom-[28%] rotate-180" size={36} data-speed="1.8" />
      <CodeMark className="hero-float absolute left-[6%] top-[52%] hidden md:block" size={64} data-speed="0.9" />
      <SpeedLines className="hero-float absolute right-[20%] top-[38%] hidden md:block" data-speed="1.3" />
      <SpeedLines className="hero-float absolute left-[28%] top-[24%] -scale-x-100 hidden md:block" color="#f8ac1a" data-speed="0.8" />

      <div className="hero-content relative flex max-w-4xl flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="saigon kids hackathon logo"
          width={140}
          height={140}
          priority
          className="hero-logo mb-6"
        />

        <p className="hero-fade mb-4 rounded-full border-2 border-mist bg-white px-5 py-2 text-sm font-medium text-ink">
          march 6, 2027 · ho chi minh city
        </p>

        <div className="relative">
          {/* orbit swooshes that draw themselves around the headline */}
          <svg
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 h-[calc(100%+3rem)] w-[calc(100%+5rem)]"
            viewBox="0 0 700 300"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              id="orbit-blue"
              className="hero-orbit-path"
              d="M 350 20 C 620 20 690 100 690 150 C 690 220 550 280 350 280 C 150 280 10 220 10 150 C 10 100 80 20 350 20"
              stroke="#0145b4"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
            />
            <path
              className="hero-orbit-path"
              d="M 350 40 C 590 40 660 105 660 150 C 660 210 540 262 350 262 C 160 262 40 210 40 150 C 40 105 110 40 350 40"
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

          <h1 className="relative text-6xl font-bold lowercase leading-[0.95] sm:text-7xl md:text-8xl">
            <span className="sr-only">saigon kids hackathon</span>
            <SplitWord word="saigon kids" className="block text-energy" />
            <SplitWord word="hackathon" className="block text-saigon" />
          </h1>
        </div>

        <p className="hero-fade mt-8 max-w-xl text-lg font-medium text-ink/80 md:text-xl">
          one big day of building, coding, and playing — for 130 young makers
          aged 8–15.
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-4">
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
            className="rounded-full border-2 border-saigon px-7 py-3 text-base font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white"
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
