"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { LogoSlot } from "./parts";
import SiteLink from "./SiteLink";
import { PARTNERS } from "./partners";
import { EVENT, AGES } from "./event";

gsap.registerPlugin(ScrollTrigger);

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
        <FlightArc className="ambient-float -scale-x-100" width={195} color="#ffb703" />
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
          {/* the sign */}
          <div className="hero-sign relative rounded-[2rem] border-[6px] border-saigon bg-white px-8 py-8 shadow-[inset_0_0_0_6px_#c9d7ee,inset_0_-4px_0_6px_#a8bfe2,0_10px_40px_rgba(1,69,180,0.12)] sm:px-14 sm:py-10">
            {/* pixel-grid accents tucked into the bevel's corners */}
            <PixelGrid className="absolute left-4 top-4" size={16} />
            <PixelGrid className="absolute right-4 top-4 -scale-x-100" size={16} />
            <PixelGrid className="absolute bottom-4 left-4 -scale-y-100" size={16} />
            <PixelGrid className="absolute bottom-4 right-4 -scale-100" size={16} />
            {/* spire + golden rings */}
            <svg
              className="absolute -top-16 left-1/2 h-20 w-16 -translate-x-1/2"
              viewBox="0 0 64 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M32 80 L32 14" stroke="#191970" strokeWidth="6" strokeLinecap="round" />
              <circle cx="32" cy="10" r="7" fill="#ffb703" stroke="#191970" strokeWidth="3" />
              <ellipse className="hero-spire-ring" cx="32" cy="30" rx="26" ry="7" stroke="#ffb703" strokeWidth="3.5" />
              <ellipse className="hero-spire-ring" cx="32" cy="46" rx="19" ry="5.5" stroke="#ffb703" strokeWidth="3" />
            </svg>
            {/* tapered spike planting the sign in the ground */}
            <svg
              className="absolute -bottom-20 left-1/2 h-20 w-16 -translate-x-1/2"
              viewBox="0 0 64 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M26 0 L38 0 L32 74 Z" fill="#191970" />
              <path d="M32 2 L32 60" stroke="#a8bfe2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <ellipse className="hero-spire-ring" cx="32" cy="22" rx="21" ry="6" stroke="#ffb703" strokeWidth="3" />
            </svg>
            {/* yellow bolts on the frame */}
            <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />
            <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />

            <Image
              src="/logo.png"
              alt="Saigon Kids Hackathon logo"
              width={110}
              height={110}
              priority
              className="hero-logo mx-auto mb-4"
            />

            <h1 className="relative text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl">
              <span className="sr-only">Saigon Kids Hackathon</span>
              <SplitWord word="Saigon Kids" className="block text-energy" />
              <SplitWord word="Hackathon" className="block text-saigon" />
            </h1>

            <p className="hero-fade mt-5 text-base font-semibold text-ink sm:text-lg">
              March 6, 2027 · Ho Chi Minh City
            </p>
          </div>
        </div>

        {/* who's behind it — plain bold names with a logo slot each, no pills.
            each × lives inside the span of the name that follows it, so the
            pair never splits across a line break */}
        <div className="hero-fade mt-24 flex w-max max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {PARTNERS.map((partner, i) => (
            <span key={partner.name} className="inline-flex items-center gap-3">
              {i > 0 && (
                <span className="text-2xl font-bold leading-none text-energy md:text-3xl" aria-hidden="true">
                  ×
                </span>
              )}
              <LogoSlot partner={partner} size={64} />
              <span className="text-lg font-bold text-saigon sm:text-xl xl:text-2xl">{partner.name}</span>
            </span>
          ))}
        </div>

        <p className="hero-fade mt-6 max-w-xl text-lg font-medium text-ink/80 md:text-xl">
          One big day of building, coding, and playing — for {EVENT.spots} young makers
          aged {AGES}.
        </p>

        <div className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-energy px-7 py-3.5 text-base font-semibold text-ink shadow-[0_6px_0_#d99a00]">
            Registration opens soon
            <Sparkle size={16} color="#1e293b" />
          </span>
          <SiteLink
            href="/#about"
            className="rounded-full border-2 border-saigon bg-white/70 px-7 py-3 text-base font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white"
          >
            What is it?
          </SiteLink>
        </div>
      </div>

      <p className="hero-hint absolute bottom-6 text-sm font-medium text-ink/50">
        Scroll to explore ↓
      </p>
    </section>
  );
}
