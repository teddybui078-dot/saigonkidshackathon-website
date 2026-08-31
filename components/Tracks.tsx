"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, PixelPlanet, FlightArc } from "./decorations";
import { DrawnBg } from "./drawn";
import { EVENT } from "./event";

gsap.registerPlugin(ScrollTrigger);

type Track = {
  n: number;
  name: string;
  blurb: string;
};

/* the theme and tracks stay off the site until the reveal — the notebook
   opens onto two placeholder pages for now */
const TRACKS: Track[] = [
  {
    n: 1,
    name: "To be revealed",
    blurb:
      "The theme and its tracks stay under wraps until closer to the day. Whatever it is, you'll build something real around it with a team and mentors beside you.",
  },
  {
    n: 2,
    name: "To be revealed",
    blurb: "Track two is a secret for now too. Bring your curiosity — we'll bring the brief on the day.",
  },
];

/* one notebook page: a subject header line, the track, its blurb, and six
   question-mark tiles where the example ideas will go */
function PageContent({ track }: { track: Track }) {
  return (
    <div className="track-page-content relative flex h-full flex-col p-7 md:p-8">
      <div className="flex items-center justify-between border-b-2 border-saigon/20 pb-2 text-sm font-bold tracking-widest text-saigon/70">
        <span>Subject: to be revealed</span>
        <span>Track {track.n}</span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-saigon bg-energy text-lg font-bold text-ink"
          aria-hidden="true"
        >
          {track.n}
        </span>
        <h3 className="text-3xl font-bold leading-tight text-saigon md:text-4xl">{track.name}</h3>
      </div>
      <p className="mt-4 text-lg font-medium leading-7 text-ink/80">{track.blurb}</p>
      {/* six empty idea squares, three by two — they fill in with the reveal */}
      <ul className="mt-auto grid grid-cols-3 gap-3 pt-6" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="flex aspect-[5/4] items-center justify-center rounded-lg bg-white text-3xl font-bold text-saigon/40"
          >
            ?
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-semibold text-ink/50">Example ideas unlock with the reveal.</p>
    </div>
  );
}

export default function Tracks() {
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

        const pinEl = section.querySelector<HTMLElement>(".track-pin");
        const book = section.querySelector<HTMLElement>(".track-book");
        const cover = section.querySelector<HTMLElement>(".track-cover");
        if (!pinEl || !book || !cover) return;
        const content = gsap.utils.toArray<HTMLElement>(".track-page-content", section);

        gsap.from(".track-line", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: pinEl, start: "top 85%" },
        });

        if (desktop) {
          // the css default is the open spread; here we close the notebook and
          // let the scroll open it: the cover swings on the spine while the
          // whole book slides so the spread ends up centred
          gsap.set(cover, { willChange: "transform" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              start: () =>
                "top " + Math.max(88, Math.round((window.innerHeight - pinEl.offsetHeight) / 2)),
              end: () => "+=" + 1.6 * window.innerHeight,
            },
          });
          tl.fromTo(book, { x: () => -book.offsetWidth / 4 }, { x: 0, ease: "none", duration: 1 }, 0)
            .fromTo(cover, { rotateY: 0 }, { rotateY: -180, ease: "power1.inOut", duration: 1 }, 0)
            .fromTo(content, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0.42) // ink shows as the pages come into view
            .to({}, { duration: 0.3 });
        } else {
          // small screens: the two pages simply arrive as you scroll
          gsap.from(".track-page", {
            y: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: book, start: "top 75%" },
          });
        }
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tracks" className="relative overflow-hidden px-4 py-28 md:py-32">
      {/* the curated few: the planet, an arc, one sparkle */}
      <div className="anchor-drift pointer-events-none absolute right-10 top-16 -z-[1] hidden opacity-70 lg:block">
        <PixelPlanet className="anchor-wobble" size={230} />
      </div>
      <div className="pointer-events-none absolute bottom-14 left-10 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={36} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-10 right-16 -z-[1] hidden lg:block">
        <FlightArc width={220} />
      </div>

      {/* pinned: the heading and the notebook that opens beneath it */}
      <div className="track-pin mx-auto max-w-4xl text-center">
        <p className="track-line mb-3 text-sm font-semibold tracking-wide text-sun">
          The theme ✦
        </p>
        <h2 className="track-line text-5xl font-bold leading-tight md:text-6xl">
          To be <span className="text-sun">revealed</span>
        </h2>
        <p className="track-line mt-4 font-medium text-white/70">
          One theme. Two tracks. Announced closer to the day.
        </p>

        {/* the notebook. on phones and under reduced motion it's two stacked
            pages; on md+ with motion it's a 3d book that gsap closes and the
            scroll opens. perspective lives on the book, preserve-3d only on the
            cover, and rounding/overflow only on the two faces */}
        <div className="track-book relative mx-auto mt-10 grid w-full max-w-[60rem] gap-6 text-left motion-safe:md:block motion-safe:md:h-[34rem] motion-safe:md:perspective-[2200px]">
          {/* right page: track 2, the base page under the cover */}
          <div className="track-page paper-ruled relative order-2 text-ink min-h-[22rem] overflow-hidden rounded-2xl border-[3px] border-ink-deep shadow-[4px_4px_0_#ffd166] motion-safe:md:absolute motion-safe:md:inset-y-0 motion-safe:md:left-1/2 motion-safe:md:min-h-0 motion-safe:md:w-1/2 motion-safe:md:rounded-l-none motion-safe:md:border-l-0">
            <span aria-hidden="true" className="absolute inset-y-0 left-6 w-0.5 bg-energy/50" />
            <PageContent track={TRACKS[1]} />
          </div>

          {/* the cover, hinged on the spine. its back face is the left page */}
          <div className="track-cover order-1 motion-safe:md:absolute motion-safe:md:inset-y-0 motion-safe:md:left-1/2 motion-safe:md:w-1/2 motion-safe:md:origin-left motion-safe:md:transform-3d motion-safe:md:rotate-y-180">
            {/* cover front: a drawn space-blue board with the label sticker */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden backface-hidden rotate-y-0 motion-safe:md:block"
            >
              <DrawnBg aspect="tall" seed={4} tone="spaceLight" />
              <span className="absolute inset-y-4 left-2 w-1 rounded-full bg-ink-deep/30" />
              <span className="absolute inset-y-4 right-9 w-2.5 rounded-full border-2 border-ink-deep bg-energy" />
              <div className="absolute left-14 right-20 top-16 rounded-lg bg-white px-6 py-6 text-ink shadow-[0_3px_0_#0d1b2a]">
                <PixelGrid size={24} />
                <p className="mt-4 text-sm font-bold tracking-widest text-saigon/70">Theme notebook</p>
                <p className="mt-1 text-3xl font-bold leading-tight text-ink">{EVENT.name}</p>
                <p className="mt-3 text-base font-semibold text-ink/60">{EVENT.date}</p>
              </div>
              <span className="absolute bottom-10 left-14 text-sm font-semibold text-white/80">scroll to open ↓</span>
            </div>
            {/* left page: track 1 */}
            <div className="track-page paper-ruled text-ink relative min-h-[22rem] overflow-hidden rounded-2xl border-[3px] border-ink-deep shadow-[4px_4px_0_#ffd166] motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:min-h-0 motion-safe:md:rounded-r-none motion-safe:md:border-r-0 motion-safe:md:shadow-none motion-safe:md:backface-hidden motion-safe:md:rotate-y-180">
              <span aria-hidden="true" className="absolute inset-y-0 left-6 w-0.5 bg-energy/50" />
              <PageContent track={TRACKS[0]} />
            </div>
          </div>

          {/* the spine is a lego rail — studs clip the two pages together */}
          <div
            aria-hidden="true"
            className="absolute inset-y-2 left-1/2 hidden w-3 -translate-x-1/2 flex-col items-center justify-evenly rounded-full bg-space-light motion-safe:md:flex"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-[4px] border-2 border-ink-deep bg-energy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
