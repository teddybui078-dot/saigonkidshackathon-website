"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, FloatingLaptop, PixelBulb, PixelStack, FlightArc } from "./decorations";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 130, suffix: "", label: "young hackers" },
  { value: 10, suffix: "h", label: "of making" },
  { value: 20, suffix: "+", label: "mentors" },
  { value: null, suffix: "∞", label: "ideas" },
];

const CARDS = [
  {
    title: "no experience needed",
    body: "total beginners welcome. if you can imagine it, we'll help you build it.",
  },
  {
    title: "mentors everywhere",
    body: "friendly engineers and teachers roam the floor all day, ready to unstick you.",
  },
  {
    title: "demos, prizes & pizza",
    body: "every team shows off what they made on the big stage — and everyone eats well.",
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

      gsap.from(".about-card", {
        y: 60,
        opacity: 0,
        rotate: (i) => (i % 2 === 0 ? -3 : 3),
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".about-cards", start: "top 75%" },
      });

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
      <div className="anchor-drift pointer-events-none absolute left-4 -top-24 -z-[1] hidden lg:block">
        <PixelBulb size={190} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-8 top-[44%] -z-[1] hidden lg:block">
        <FloatingLaptop className="anchor-wobble" width={370} />
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
          <p className="about-line mb-3 text-sm font-semibold text-saigon">
            about the day ✦
          </p>
          <h2 className="about-line max-w-2xl text-4xl font-bold lowercase leading-tight md:text-5xl">
            what is <span className="text-saigon">saigon kids hackathon</span>?
          </h2>
          <p className="about-line mt-6 max-w-2xl text-lg font-medium text-ink/80">
            it&apos;s a one-day invention marathon for kids. you team up with
            friends, dream up an idea, and build it — a game, an app, a robot, a
            website — with mentors beside you the whole way. no grades, no
            pressure, just making things you&apos;re proud of.
          </p>
        </div>

        <div className="about-cards mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="about-card relative rounded-3xl bg-white p-7 shadow-[0_2px_16px_rgba(30,41,59,0.06)]"
            >
              <PixelGrid className="ambient-float absolute right-5 top-5" data-amp="s" size={26} />
              <div
                className={`mb-4 h-2 w-12 rounded-full ${
                  i % 2 === 0 ? "bg-energy" : "bg-saigon"
                }`}
              />
              <h3 className="text-xl font-semibold lowercase">{card.title}</h3>
              <p className="mt-2 font-medium text-ink/70">{card.body}</p>
            </div>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-8 rounded-3xl border-2 border-mist bg-white/60 p-8 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="text-4xl font-bold text-saigon md:text-5xl">
                {stat.value !== null ? (
                  <>
                    <span className="stat-number" data-value={stat.value}>
                      {stat.value}
                    </span>
                    {stat.suffix}
                  </>
                ) : (
                  <span className="text-energy">{stat.suffix}</span>
                )}
              </dd>
              <dt className="mt-1 text-sm font-medium text-ink/60">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <Sparkle className="ambient-twinkle absolute bottom-10 right-[8%] hidden lg:block" size={26} />
      </div>
    </section>
  );
}
