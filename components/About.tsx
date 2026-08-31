"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, FloatingLaptop, PixelBulb, PixelStack, PixelTrophy } from "./decorations";
import { Screws, DomeButton, Led, Pushpin, Scuffs } from "./parts";
import { DrawnBg, DrawnDiscBg } from "./drawn";
import { PartyPopper } from "./illustrations";
import { EVENT } from "./event";

gsap.registerPlugin(ScrollTrigger);

/* two numbers that count up, two that never end — the infinite ones carry
   a little illustration on the button instead of a digit */
const STATS = [
  { value: EVENT.spots, suffix: "", label: "Builder spots", icon: null },
  { value: EVENT.hours, suffix: "h", label: "Hours of building", icon: null },
  { value: null, suffix: "∞", label: "Fun", icon: <PartyPopper size={46} /> },
  { value: null, suffix: "∞", label: "Ideas", icon: <PixelBulb size={36} /> },
];

const CARDS = [
  {
    title: "No experience needed",
    body: "Total beginners welcome. If you can imagine it, we'll help you build it.",
    art: <PixelBulb size={88} />,
  },
  {
    title: "Mentors everywhere",
    body: "Friendly engineers and teachers roam the floor all day, ready to unstick you.",
    art: <FloatingLaptop width={124} />,
  },
  {
    title: "Demos, prizes & pizza",
    body: "Every team shows off what they made on the big stage — and everyone eats well.",
    art: <PixelTrophy size={96} />,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 48rem)", // tailwind's md — keeps css and gsap in step
      },
      (ctx) => {
        const { motionOK, desktop } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const pinEl = section.querySelector<HTMLElement>(".about-pin");
        const cards = gsap.utils.toArray<HTMLElement>(".about-card", section);
        const bodies = cards.map((c) => c.querySelector(".about-card-body") as HTMLElement);
        const tilt = [-2, 1.5, -1];

        // the billboard text arrives once, before the pin begins
        gsap.from(".about-line", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: pinEl ?? section, start: "top 85%" },
        });

        if (pinEl && desktop) {
          // pin the billboard + stack, and deal the notes out one per screen of
          // scroll: each new note rises in and becomes the main card while the
          // ones before it tuck up behind
          gsap.set(cards, { willChange: "transform" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // functions so a resize re-measures: centre the block, but never
              // tuck it under the fixed navbar
              start: () =>
                "top " + Math.max(88, Math.round((window.innerHeight - pinEl.offsetHeight) / 2)),
              end: () => "+=" + cards.length * window.innerHeight,
            },
          });
          cards.forEach((card, i) => {
            tl.fromTo(
              card,
              { y: 160, opacity: 0, rotation: tilt[i] * 3 },
              { y: 0, opacity: 1, rotation: tilt[i], ease: "power2.out", duration: 1 },
              i
            );
            // earlier notes straighten up and tuck behind, so only their clean
            // top strip (pushpin, no text) peeks out above the main card
            if (i > 0) {
              tl.to(cards[i - 1], { y: -34, rotation: 0, scale: 0.94, opacity: 0.6, ease: "power2.out", duration: 1 }, i);
              tl.to(bodies[i - 1], { opacity: 0, ease: "power2.out", duration: 0.5 }, i);
            }
            if (i > 1) {
              tl.to(cards[i - 2], { y: -62, rotation: 0, scale: 0.9, opacity: 0.35, ease: "power2.out", duration: 1 }, i);
            }
          });
          tl.to({}, { duration: 0.4 }); // hold on the last note before letting go
        } else {
          // small screens: the notes settle in with a tilt as they scroll into view
          gsap.fromTo(
            cards,
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
        }

        // the infinite buttons pop their little illustration into place
        gsap.from(".stat-infinite", {
          scale: 0,
          rotation: -25,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: ".about-panel", start: "top 85%" },
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
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-24">
      {/* the curated few: a laptop, a brick stack, one sparkle */}
      <div className="anchor-drift pointer-events-none absolute right-10 top-6 -z-[1] hidden opacity-70 lg:block">
        <FloatingLaptop className="anchor-wobble" width={240} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-28 left-8 -z-[1] hidden opacity-70 lg:block">
        <PixelStack width={140} />
      </div>
      <div className="pointer-events-none absolute bottom-40 right-14 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={32} />
      </div>
      <div className="mx-auto max-w-6xl">
        {/* the pinned pair: a billboard on the left, a stack of notes on the
            right that deal out one at a time as you scroll (md+) */}
        <div className="about-pin grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-center lg:gap-16">
          {/* billboard: floodlights on top, framed face, two posts */}
          <div className="about-billboard relative">
            <div className="mx-12 flex justify-around" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="relative h-5 w-12 rounded-t-full bg-space-light">
                  <span className="absolute inset-x-3.5 bottom-0 h-2 rounded-t-full bg-energy" />
                </span>
              ))}
            </div>
            <div className="relative text-ink">
              <DrawnBg aspect="wide" seed={3} tone="paper" bolts />
              <div className="relative z-10 px-8 py-10 md:px-12 md:py-14">
              {/* a marquee arrow: blue sign, chasing bulbs, pointing at the story */}
              <p
                className="about-line relative mb-5 inline-block [filter:drop-shadow(0_4px_0_#0d1b2a)]"
                style={{ "--head": "22px" } as React.CSSProperties}
              >
                <span className="clip-arrow block bg-saigon-deep">
                  <span className="clip-arrow absolute inset-[3px] right-[5px] bg-saigon" aria-hidden="true" />
                  <span className="relative flex items-center gap-3 py-2 pl-5 pr-[calc(var(--head)+1.25rem)] text-sm font-semibold text-white">
                    About the day
                    <span className="flex items-center gap-1.5" aria-hidden="true">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="marquee-bulb h-2.5 w-2.5 rounded-full border border-energy-deep bg-energy" />
                      ))}
                    </span>
                  </span>
                </span>
              </p>
              <h2 className="about-line text-5xl font-bold leading-tight lg:text-6xl">
                What is <span className="text-saigon">Saigon Kids Hackathon</span>?
              </h2>
              <p className="about-line mt-6 text-xl font-medium leading-snug text-ink/80 lg:text-2xl">
                It&apos;s a one-day invention marathon for kids. You team up with
                friends, dream up an idea, and build it — a game, an app, a robot, a
                website — with mentors beside you the whole way. No grades, no
                pressure, just making things you&apos;re proud of.
              </p>
              </div>
            </div>
            <div className="mx-16 flex justify-between" aria-hidden="true">
              <span className="h-20 w-4 rounded-b-sm bg-space-light" />
              <span className="h-20 w-4 rounded-b-sm bg-space-light" />
            </div>
          </div>

          {/* pinned paper notes: ruled paper, torn bottom edge, a pushpin. on md+
              with motion they share one grid cell and gsap deals them out */}
          <div className="about-cards grid gap-10 motion-safe:md:gap-0 motion-safe:md:items-start">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="about-card relative md:min-h-[26rem] motion-safe:md:col-start-1 motion-safe:md:row-start-1"
              >
                {/* the note is a drawn panel now — same pin, new paper */}
                <DrawnBg aspect="tall" seed={CARDS.indexOf(card)} tone="paper" />
                <Pushpin className="absolute -top-3 left-5" />
                <PixelGrid className="absolute bottom-7 right-4 opacity-60" size={16} />
                <div className="about-card-body relative px-8 pb-12 pt-12">
                  <div className="flex h-28 items-end">{card.art}</div>
                  <h3 className="mt-5 text-2xl font-semibold leading-7">{card.title}</h3>
                  <p className="mt-3 text-lg font-medium leading-7 text-ink/70">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* a riveted control panel: brushed metal, screws, domed push-buttons */}
        <div className="about-panel metal-brushed relative mt-14 rounded-3xl border-[3px] border-ink-deep px-6 pb-9 pt-10 text-ink shadow-[0_7px_0_#ffd166] md:px-10">
          <Screws />
          {/* the panel has been carried around a bit */}
          <Scuffs seed={0} className="absolute left-12 top-4 hidden md:block" />
          <Scuffs seed={2} size={56} className="absolute bottom-5 right-14 rotate-[8deg] hidden md:block" />
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
                {/* the well the button sits in, drawn */}
                <dd className="relative h-32 w-32 p-2">
                  <DrawnDiscBg seed={i} tone="sky" />
                  <DomeButton
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
                      <span className="stat-infinite flex flex-col items-center leading-none">
                        {stat.icon}
                        <span className="mt-0.5">{stat.suffix}</span>
                      </span>
                    )}
                  </DomeButton>
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
