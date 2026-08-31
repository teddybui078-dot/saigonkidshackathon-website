"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, CodeMark } from "./decorations";
import { ToteBag, KitBadge } from "./illustrations";
import { FloatBrick, ChalkScribble } from "./space";
import { SKY_LIGHT } from "./palette";
import { KIT, type KitItem } from "./kit";

gsap.registerPlugin(ScrollTrigger);

/* the goods: one round badge logo per kit item */
const ART: Record<KitItem["id"], React.ReactNode> = {
  snacks: <KitBadge kind="snacks" size={118} seed={0} />,
  stickers: <KitBadge kind="stickers" size={118} seed={1} />,
  hat: <KitBadge kind="hat" size={118} seed={2} />,
  wristbands: <KitBadge kind="wristbands" size={118} seed={1} />,
};

/* where each item comes to rest around the bag on md+ (full strings so
   tailwind can see them); below md they just fill the 2×2 grid */
const SLOT: Record<KitItem["id"], string> = {
  snacks: "md:absolute md:left-[4%] md:top-[18%]",
  stickers: "md:absolute md:left-[24%] md:top-[2%]",
  hat: "md:absolute md:right-[22%] md:top-0",
  wristbands: "md:absolute md:right-[4%] md:top-[20%]",
};

/* the resting lean of each item, landed by gsap so no-js stays straight */
const TILT: Record<KitItem["id"], number> = {
  snacks: -6,
  stickers: 3,
  hat: 6,
  wristbands: -3,
};

export default function BuildersKit() {
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

        const stage = section.querySelector<HTMLElement>(".kit-stage");
        const bagBack = section.querySelector<SVGSVGElement>(".kit-bag-back");
        const bagFront = section.querySelector<SVGSVGElement>(".kit-bag-front");
        const items = gsap.utils.toArray<HTMLElement>(".kit-item", section);
        const captions = gsap.utils.toArray<HTMLElement>(".kit-caption", section);
        const tilts = KIT.map((item) => TILT[item.id]);

        // the heading arrives once, before the bag does anything
        gsap.from(gsap.utils.toArray<HTMLElement>(".kit-line", section), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        });

        if (!stage) return;

        if (desktop && bagBack && bagFront) {
          // the mouth of the bag: halfway across the back layer, about two
          // fifths of the way down, where the dark inside is drawn
          const bagMouth = () => {
            const r = bagBack.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height * 0.4 };
          };
          const center = (el: Element) => {
            const r = el.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          };

          // each item pops out of the mouth and springs into its slot, and
          // the bag gives a little squash as it leaves. plays once — a
          // spring doesn't read when it's tied to the scrollbar. the from
          // values are functions so a resize re-measures the mouth
          const tl = gsap.timeline({
            scrollTrigger: { trigger: stage, start: "top 70%", invalidateOnRefresh: true },
          });
          items.forEach((item, i) => {
            tl.fromTo(
              item,
              {
                x: () => bagMouth().x - center(item).x,
                y: () => bagMouth().y - center(item).y,
                scale: 0.35,
                rotation: 0,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                rotation: tilts[i],
                opacity: 1,
                duration: 0.7,
                ease: "back.out(1.5)",
              },
              i * 0.18
            );
            // squash from a known upright, so overlapping pops always
            // settle the bag back to exactly its own height
            tl.fromTo(
              bagFront,
              { scaleY: 1 },
              { scaleY: 0.94, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: "50% 100%" },
              i * 0.18
            );
          });
          tl.from(captions, { y: 10, opacity: 0, duration: 0.3, stagger: 0.18 }, 0.4);
        } else {
          // small screens: the goods hop up into the grid under the bag
          gsap.from(items, {
            y: 40,
            scale: 0.8,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: stage, start: "top 75%" },
          });
        }
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kit" className="relative px-4 py-28 md:py-32">
      {/* big hooks in the corners: a sparkle, a pixel cluster, the code mark */}
      <div className="pointer-events-none absolute left-12 top-12 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={36} />
      </div>
      <div className="pointer-events-none absolute bottom-20 right-16 -z-[1] hidden lg:block">
        <CodeMark className="ambient-float" size={110} />
      </div>
      {/* a chalk zigzag skipping off the bag */}
      <div className="pointer-events-none absolute left-[18%] bottom-32 -z-[1] hidden -rotate-[6deg] lg:block">
        <ChalkScribble kind="zigzag" width={80} />
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="kit-line mb-3 text-sm font-semibold tracking-wide text-energy-deep">In your bag ✦</p>
          <h2 className="kit-line text-4xl font-bold leading-tight md:text-5xl">
            Every builder gets a <span className="text-energy-deep">builders kit</span>
          </h2>
          <p className="kit-line mt-4 font-medium text-ink/70">
            Snacks, stickers, a hat and wristbands — yours to keep.
          </p>
        </div>

        {/* the stage: on md+ a tote at the bottom with the goods sprung out
            around it; below md the bag sits on top and the goods line up in
            a 2×2 grid under it. the bag is two layers either side of the
            goods in the dom, so they start inside it and the front covers
            them until they pop out */}
        <div className="kit-stage relative mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 md:block md:h-[30rem]">
          {/* back layer: handles and the dark mouth. the front reads as a
              whole bag on its own, so this one only shows on md+ */}
          <div
            className="hidden md:absolute md:bottom-0 md:left-1/2 md:block md:-translate-x-1/2"
            aria-hidden="true"
          >
            <ToteBag layer="back" width={240} className="kit-bag-back" />
          </div>

          {KIT.map((item) => (
            <div key={item.id} className={`kit-item ${SLOT[item.id]}`}>
              {/* outer div is the pop, this one drifts */}
              <div className="ambient-float flex flex-col items-center" data-amp="s">
                {ART[item.id]}
                <span className="kit-caption mt-2 rounded-full border-2 border-ink-deep bg-white px-3 py-1 text-xs font-bold text-ink shadow-[0_2px_0_#f8ac1a]">
                  {item.name}
                </span>
              </div>
            </div>
          ))}

          {/* a brick that spilled out with the goods */}
          <FloatBrick
            color={SKY_LIGHT}
            className="ambient-float absolute -bottom-2 left-1/2 hidden w-12 -translate-x-[190px] rotate-[-8deg] md:block"
          />

          {/* front layer: the body with its band and label. first row of the
              grid below md, over the back layer on md+ */}
          <div
            className="col-span-2 row-start-1 mx-auto md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <ToteBag layer="front" width={240} className="kit-bag-front h-auto w-[200px] md:w-[240px]" />
          </div>
        </div>

        {/* the same four things in plain words, so nobody has to hunt */}
        <dl className="mt-8 grid grid-cols-2 gap-4 text-center text-sm font-medium text-ink/70 md:grid-cols-4">
          {KIT.map((item) => (
            <div key={item.id}>
              <dt className="font-bold text-ink">{item.name}</dt>
              <dd className="mt-1">{item.blurb}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
