"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelClock, PixelStack, CodeMark, PixelGrid } from "./decorations";
import { Hook, Tassel } from "./parts";

gsap.registerPlugin(ScrollTrigger);

const SLOTS = [
  { time: "8:00", title: "Check-in & breakfast", body: "Grab a badge, a bánh mì, and find your table." },
  { time: "9:00", title: "Opening ceremony", body: "The countdown, the mission, and a surprise or two." },
  { time: "9:30", title: "Hacking begins!", body: "Teams form, laptops open, ideas start flying." },
  { time: "12:00", title: "Lunch break", body: "Refuel with friends — and sneak a peek at other teams." },
  { time: "14:00", title: "Mini workshops", body: "Quick, fun sessions: game design, robots, and AI tricks." },
  { time: "16:30", title: "Code freeze", body: "Hands off the keyboard — time to practice your pitch." },
  { time: "17:00", title: "Demo time", body: "Every team on stage showing what they built today." },
  { time: "18:00", title: "Awards & closing", body: "Prizes, high-fives, and photos to remember it by." },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // the pole draws itself as you travel down the day. as its tip passes
      // each collar, the bracket arm extends out from the pole and the
      // lantern drops onto its hook — all keyed to the pole's own progress,
      // so scrolling back up rewinds the whole thing.
      const list = section.querySelector<HTMLElement>(".schedule-list");
      if (!list) return;
      const clamp = gsap.utils.clamp(0, 1);

      const rows = gsap.utils.toArray<HTMLElement>(".schedule-item").map((li, i) => {
        const arm = li.querySelector(".schedule-arm") as HTMLElement;
        const collar = li.querySelector(".schedule-collar") as HTMLElement;
        const lantern = li.querySelector(".schedule-lantern") as HTMLElement;
        // starting state via set, so mm.revert() puts it all back
        gsap.set(arm, { scaleX: 0, transformOrigin: i % 2 === 0 ? "100% 50%" : "0% 50%" });
        gsap.set(collar, { scale: 0 });
        gsap.set(lantern, { opacity: 0, y: -16 });
        return {
          li,
          top: 0,
          a: -1,
          l: -1,
          setArm: gsap.quickSetter(arm, "scaleX"),
          setCollar: gsap.quickSetter(collar, "scale"),
          setOpacity: gsap.quickSetter(lantern, "opacity"),
          setY: gsap.quickSetter(lantern, "y", "px"),
        };
      });

      let listHeight = 1;
      // null until the tween exists: onRefresh fires during creation
      let spine: gsap.core.Tween | null = null;

      // px of pole drawn so far -> each row's arm and lantern progress
      const paint = (tip: number) => {
        rows.forEach((r) => {
          const a = clamp((tip + 40 - r.top) / 60);
          const l = clamp((tip + 40 - r.top - 50) / 90);
          if (a !== r.a) {
            r.a = a;
            r.setArm(a);
            r.setCollar(a);
          }
          if (l !== r.l) {
            r.l = l;
            r.setOpacity(l);
            r.setY(-16 * (1 - l));
          }
        });
      };

      // geometry is measured on every scrolltrigger refresh (resize, md flip)
      const measure = () => {
        listHeight = list.offsetHeight;
        rows.forEach((r) => {
          r.top = r.li.offsetTop;
        });
        if (spine) paint(spine.progress() * listHeight);
      };

      spine = gsap.fromTo(
        ".schedule-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          // read the tween, not the trigger: with scrub the pole lags the
          // scroll, and the arms must follow the pole
          onUpdate: () => {
            if (spine) paint(spine.progress() * listHeight);
          },
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
            onRefresh: measure,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="schedule" className="relative px-4 py-24">
      {/* big hooks alternating down both sides of the day */}
      <div className="anchor-drift pointer-events-none absolute left-8 top-[22%] -z-[1] hidden lg:block">
        <PixelClock size={340} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-10 top-[45%] -z-[1] hidden lg:block">
        <PixelStack width={200} />
      </div>
      <div className="anchor-drift pointer-events-none absolute left-14 top-[68%] -z-[1] hidden lg:block">
        <CodeMark className="anchor-wobble" size={150} />
      </div>
      <div className="pointer-events-none absolute right-16 top-[85%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={64} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-32 top-[90%] -z-[1] hidden lg:block">
        <PixelGrid size={80} />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-saigon">
            March 6, 2027 ✦
          </p>
          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            One <span className="text-saigon">big</span> day
          </h2>
        </div>

        <div className="schedule-list relative mt-20">
          {/* the pole, with a finial on top — draws itself as you scroll */}
          <div
            className="schedule-spine absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rounded-full bg-saigon"
            aria-hidden="true"
          />
          <span
            className="absolute -top-4 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-saigon bg-energy"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {SLOTS.map((slot, i) => (
              <li
                key={slot.time}
                className={`schedule-item relative md:w-1/2 ${
                  i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                {/* bracket arm out from the pole, and the collar it bolts to */}
                <span
                  className={`schedule-arm absolute top-0.5 hidden h-1.5 bg-saigon md:block ${
                    i % 2 === 0
                      ? "right-0 w-[calc(50%_+_1.25rem)] rounded-l-full"
                      : "left-0 w-[calc(50%_+_1.25rem)] rounded-r-full"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`schedule-collar absolute -top-1 hidden h-4 w-5 rounded-sm border-[3px] border-saigon bg-energy md:block ${
                    i % 2 === 0 ? "-right-2.5" : "-left-2.5"
                  }`}
                  aria-hidden="true"
                />
                {/* a paper lantern hanging from the arm; the outer wrapper is the
                    scroll reveal, the inner one sways, so their transforms never fight */}
                <div className="schedule-lantern">
                <div className="ambient-hang mx-auto flex max-w-sm flex-col items-center md:max-w-none">
                  <Hook />
                  <div className="w-2/3 rounded-t-xl bg-saigon px-3 py-1 text-center text-sm font-bold text-energy">
                    {slot.time}
                  </div>
                  <div className="lantern-body w-full px-10 py-5 text-center">
                    <h3 className="text-xl font-semibold">{slot.title}</h3>
                    <p className="mt-1 text-base font-medium text-ink/65">{slot.body}</p>
                  </div>
                  <div className="h-3 w-2/3 rounded-b-xl bg-saigon" aria-hidden="true" />
                  <Tassel className="h-9 w-6" />
                </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex justify-center">
            <Sparkle className="ambient-twinkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
