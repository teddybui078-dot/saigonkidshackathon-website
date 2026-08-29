"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, FloatingLaptop, PixelBulb, PixelStack, FlightArc } from "./decorations";
import { Screws, DomeButton, Led, Pushpin } from "./parts";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 130, suffix: "", label: "Young hackers" },
  { value: 10, suffix: "h", label: "Hours of making" },
  { value: 20, suffix: "+", label: "Mentors" },
  { value: null, suffix: "∞", label: "Ideas" },
];

const CARDS = [
  {
    title: "No experience needed",
    body: "Total beginners welcome. If you can imagine it, we'll help you build it.",
  },
  {
    title: "Mentors everywhere",
    body: "Friendly engineers and teachers roam the floor all day, ready to unstick you.",
  },
  {
    title: "Demos, prizes & pizza",
    body: "Every team shows off what they made on the big stage — and everyone eats well.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(".about-line", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      const tilt = [-2, 1.5, -1];
      gsap.fromTo(
        ".about-card",
        { y: 60, opacity: 0, rotation: (i: number) => tilt[i] * 3 },
        {
          y: 0,
          opacity: 1,
          rotation: (i: number) => tilt[i],
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".about-cards", start: "top 75%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value);
        if (!Number.isFinite(target)) return;
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { n: 1 },
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-24">
      {/* big hooks alternating around the content */}
      <div className="anchor-drift pointer-events-none absolute left-4 top-[6%] -z-[1] hidden lg:block">
        <PixelBulb size={112} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-10 top-[3%] -z-[1] hidden lg:block">
        <FloatingLaptop className="anchor-wobble" width={300} />
      </div>
      <div className="anchor-drift pointer-events-none absolute left-8 top-[88%] -z-[1] hidden lg:block">
        <PixelStack width={170} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-24 top-[90%] -z-[1] hidden lg:block">
        <FlightArc width={220} color="#f8ac1a" />
      </div>
      <div className="pointer-events-none absolute right-14 top-[87%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={44} />
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <PixelGrid className="ambient-float absolute -left-2 -top-10 hidden lg:block" size={36} />
          {/* a marquee arrow: blue sign, chasing bulbs, pointing at the story */}
          <p
            className="about-line relative mb-5 inline-block [filter:drop-shadow(0_4px_0_#01337f)]"
            style={{ "--head": "22px" } as React.CSSProperties}
          >
            <span className="clip-arrow block bg-saigon-deep">
              <span className="clip-arrow absolute inset-[3px] right-[5px] bg-saigon" aria-hidden="true" />
              <span className="relative flex items-center gap-3 py-2 pl-5 pr-[calc(var(--head)+1.25rem)] text-sm font-semibold text-white">
                About the day
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="marquee-bulb h-2 w-2 rounded-full border border-energy-deep bg-energy" />
                  ))}
                </span>
              </span>
            </span>
          </p>
          <h2 className="about-line max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            What is <span className="text-saigon">Saigon Kids Hackathon</span>?
          </h2>
          <p className="about-line mt-6 max-w-2xl text-lg font-medium text-ink/80">
            It&apos;s a one-day invention marathon for kids. You team up with
            friends, dream up an idea, and build it — a game, an app, a robot, a
            website — with mentors beside you the whole way. No grades, no
            pressure, just making things you&apos;re proud of.
          </p>
        </div>

        {/* pinned paper notes: ruled paper, torn bottom edge, a pushpin */}
        <div className="about-cards mt-14 grid gap-10 md:grid-cols-3">
          {CARDS.map((card) => (
            <div key={card.title} className="about-card relative">
              {/* paper layers: shadow, outline, ruled face — all torn along the bottom */}
              <span className="zigzag-bottom absolute inset-x-0 -bottom-1.5 top-1.5 bg-[#c9d7ee]" aria-hidden="true" />
              <span className="zigzag-bottom absolute inset-0 bg-saigon" aria-hidden="true" />
              <span className="zigzag-bottom paper-ruled absolute inset-[3px] bottom-[5px]" aria-hidden="true" />
              <Pushpin className="absolute -top-3 left-5" />
              <PixelGrid className="absolute bottom-7 right-4 opacity-60" size={16} />
              <div className="relative px-7 pb-10 pt-10">
                <h3 className="text-xl font-semibold leading-7">{card.title}</h3>
                <p className="mt-2 font-medium leading-7 text-ink/70">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* a riveted control panel: brushed metal, screws, domed push-buttons */}
        <div className="relative mt-14 rounded-3xl border-4 border-saigon bg-[#dbe4f2] bg-[repeating-linear-gradient(90deg,transparent_0_3px,rgba(255,255,255,0.35)_3px_4px)] px-6 pb-9 pt-10 shadow-[0_10px_0_#01337f] md:px-10">
          <Screws />
          <div className="absolute right-8 top-3 flex items-center gap-2 text-[10px] font-semibold tracking-wide text-ink/50">
            <Led className="motion-safe:animate-led-blink" />
            on
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col-reverse items-center">
                <dt className="mt-4 rounded-md bg-white/60 px-3 py-1 text-xs font-semibold text-ink/60">
                  {stat.label}
                </dt>
                {/* the well the button sits in */}
                <dd className="h-32 w-32 rounded-full bg-[#c9d7ee] p-2 shadow-[inset_0_5px_0_#a8bfe2]">
                  <DomeButton
                    shape="round"
                    tone={i % 2 === 0 ? "yellow" : "blue"}
                    pressable
                    className="text-3xl font-bold md:text-4xl"
                  >
                    {stat.value !== null ? (
                      <span>
                        <span className="stat-number" data-value={stat.value}>
                          {stat.value}
                        </span>
                        {stat.suffix}
                      </span>
                    ) : (
                      <span>{stat.suffix}</span>
                    )}
                  </DomeButton>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Sparkle className="ambient-twinkle absolute bottom-10 right-[8%] hidden lg:block" size={26} />
      </div>
    </section>
  );
}
