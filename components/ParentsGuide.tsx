"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeart, Sparkle, PixelGrid, FloatingLaptop } from "./decorations";
import { Screws, Pushpin, Lanyard, SubjectIcon } from "./parts";
import { PrizeTag } from "./illustrations";
import SiteLink from "./SiteLink";
import { PARENTS_GUIDE, ON_SITE_RULE, type GuideItem } from "./parents";
import { AGENDA } from "./agenda";
import { EVENT } from "./event";

gsap.registerPlugin(ScrollTrigger);

/* the three facts a parent checks first, as chips under the title */
const CHIPS = [EVENT.dateLong, EVENT.city, `${EVENT.fee.display} per builder`];

/* the resting tilt of each paper note, in the order they're pinned */
const NOTE_TILT = [-1.5, 1, -0.8, 1.2];

/* the faq's plus button and bubble tail — full strings so tailwind sees them */
const PLUS = {
  open: "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-saigon text-xl font-bold transition-transform duration-300 rotate-45 bg-saigon text-white shadow-[0_3px_0_#01337f]",
  closed:
    "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-saigon text-xl font-bold transition-transform duration-300 bg-energy text-ink shadow-[0_3px_0_#d18e07]",
};
const TAIL = {
  left: "absolute -bottom-[13px] left-10 h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-saigon bg-white",
  right: "absolute -bottom-[13px] right-10 h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-saigon bg-white",
};

const GHOST_BUTTON =
  "rounded-full border-2 border-saigon bg-white/70 px-7 py-3 font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white";

/* ————— the objects pinned to the board, one per kind ————— */

function Notice({ item }: { item: GuideItem }) {
  // the rule, on a white card held by two pins with a stamp inked top-right
  const groups = item.body[item.body.length - 1];
  return (
    <div className="board-item relative rounded-2xl border-4 border-saigon bg-white p-6 shadow-[0_8px_0_#01337f] md:col-span-2 md:p-8">
      <Pushpin className="board-pin absolute -top-3 left-6" />
      <Pushpin className="board-pin absolute -top-3 right-6" />
      {/* the stamp rests at -6deg via transform (not the rotate property),
          so gsap picks up the same tilt and lands on it */}
      <span
        className="board-stamp stamp mb-4 max-w-[13rem] text-sm text-saigon md:absolute md:right-8 md:top-8 md:mb-0 md:text-base"
        style={{ transform: "rotate(-6deg)" }}
        aria-hidden="true"
      >
        Parent or guardian on site — all day
      </span>
      <div className="md:pr-64">
        <h2 className="text-2xl font-bold leading-tight md:text-4xl">{item.title}</h2>
        <p className="mt-3 text-lg font-bold text-saigon md:text-xl">{ON_SITE_RULE}</p>
      </div>
      <div className="mt-5 space-y-4">
        {item.body.slice(0, -1).map((text) => (
          <p key={text} className="text-lg font-medium leading-7 text-ink/75">
            {text}
          </p>
        ))}
      </div>
      {/* groups get their own dashed pocket */}
      <p className="mt-4 rounded-xl border-2 border-dashed border-saigon/40 bg-canvas p-4 text-lg font-medium leading-7 text-ink/75">
        {groups}
      </p>
    </div>
  );
}

function Note({ item }: { item: GuideItem }) {
  // the torn ruled note from the about section: shadow, outline, ruled face,
  // a pushpin holding it to the board
  return (
    <div className="board-item board-note relative">
      <span className="zigzag-bottom absolute inset-x-0 -bottom-1.5 top-1.5 bg-saigon-deep" aria-hidden="true" />
      <span className="zigzag-bottom absolute inset-0 bg-saigon" aria-hidden="true" />
      <span className="zigzag-bottom paper-ruled absolute inset-[3px] bottom-[5px]" aria-hidden="true" />
      <Pushpin className="board-pin absolute -top-3 left-5" />
      <PixelGrid className="absolute bottom-7 right-4 opacity-60" size={16} />
      <div className="relative px-8 pb-12 pt-12">
        <h3 className="text-2xl font-semibold leading-7">{item.title}</h3>
        {item.body.map((text) => (
          <p key={text} className="mt-3 text-lg font-medium leading-7 text-ink/70">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function AgendaTicket({ item }: { item: GuideItem }) {
  // a ticket strip: blue header band, one row per slot, a notch each side.
  // the wrapper carries the shadow — the notch mask would clip it off the card
  return (
    <div className="board-item rounded-lg shadow-[0_6px_0_#01337f]">
      <div className="ticket-notched overflow-hidden rounded-lg border-[3px] border-saigon bg-white">
        <h3 className="bg-saigon px-5 py-2 text-xs font-bold uppercase tracking-widest text-white">{item.title}</h3>
        <ol>
          {AGENDA.map((slot) => (
            <li
              key={slot.time}
              className="grid grid-cols-[4rem_1fr] gap-3 border-b border-dashed border-saigon/25 px-5 py-2 last:border-0"
            >
              <span className="font-bold text-saigon">{slot.time}</span>
              <span className="font-semibold">{slot.title}</span>
            </li>
          ))}
        </ol>
        <p className="border-t border-dashed border-saigon/25 px-5 py-2 text-xs text-ink/50">
          a parent or guardian stays for all of it
        </p>
      </div>
    </div>
  );
}

function FeeTag({ item }: { item: GuideItem }) {
  // the fee on a luggage tag, sitting on a plain card
  return (
    <div className="board-item relative rounded-2xl border-[3px] border-saigon bg-white p-6 shadow-[0_6px_0_#01337f]">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/50">{item.title}</h3>
      <div className="mt-3">
        <PrizeTag className="text-lg [&_span]:text-lg">{EVENT.fee.display} per builder</PrizeTag>
      </div>
      {item.body.map((text) => (
        <p key={text} className="mt-4 text-lg font-medium leading-7 text-ink/70">
          {text}
        </p>
      ))}
    </div>
  );
}

function Checklist({ item }: { item: GuideItem }) {
  // an index card: the title on the header rule, a checklist icon in the
  // corner, an empty check square before each line
  return (
    <div className="board-item paper-index relative rounded-lg border-[3px] border-saigon p-6 pt-12 shadow-[0_6px_0_#01337f]">
      <h3 className="absolute left-6 top-3 text-xs font-bold uppercase tracking-widest text-saigon/70">{item.title}</h3>
      <SubjectIcon kind="list" size={28} className="absolute right-5 top-2" />
      <ul>
        {item.items?.map((text) => (
          <li key={text} className="flex items-start gap-3">
            <span className="mt-1 h-5 w-5 shrink-0 rounded-md border-2 border-saigon bg-white" aria-hidden="true" />
            <span className="text-base font-medium leading-7 text-ink/75">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ParentBadge({ item }: { item: GuideItem }) {
  // the staff badge from the founders section, relabelled for parents
  return (
    <div className="board-item">
      {/* swings from the clip on hover — kept off the gsap wrapper */}
      <div className="mx-auto flex max-w-sm origin-top flex-col items-center transition-transform duration-300 hover:rotate-2">
        <Lanyard className="-mb-1" />
        <div className="w-full rounded-xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#01337f]">
          {/* header band with the punched slot the clip goes through */}
          <div className="flex h-8 items-center justify-center gap-3 rounded-t-[9px] bg-saigon text-[11px] font-bold tracking-widest text-white">
            <span className="h-1.5 w-10 rounded-full bg-white/80" aria-hidden="true" />
            parents
          </div>
          <div className="flex flex-col items-center p-5">
            <div
              className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-dashed border-mist bg-canvas"
              aria-hidden="true"
            >
              <SubjectIcon kind="heart" size={40} />
            </div>
            <h3 className="mt-4 text-center text-lg font-bold">{item.title}</h3>
            {item.body.map((text) => (
              <p key={text} className="mt-1 text-center text-sm font-medium text-ink/65">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ item }: { item: GuideItem }) {
  // a speech bubble with its tail bottom-left — how to reach us
  return (
    <div className="board-item relative rounded-2xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#01337f]">
      <span className={TAIL.left} aria-hidden="true" />
      <div className="px-6 py-5">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        {item.body.map((text) => (
          <p key={text} className="mt-2 font-medium leading-7 text-ink/70">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

function QuickFaq({ item }: { item: GuideItem }) {
  // the accordion from the faq section, one bubble open at a time
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="board-item md:col-span-2">
      <h3 className="mb-6 text-2xl font-semibold leading-7">{item.title}</h3>
      <div className="space-y-7">
        {item.qa?.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              data-open={isOpen}
              className="faq-item relative rounded-2xl border-[3px] border-saigon bg-white shadow-[0_6px_0_#01337f]"
            >
              <span className={i % 2 === 0 ? TAIL.left : TAIL.right} aria-hidden="true" />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold">{faq.q}</span>
                <span className={isOpen ? PLUS.open : PLUS.closed} aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-answer">
                <div>
                  <p className="px-6 pb-5 font-medium text-ink/70">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GuideObject({ item }: { item: GuideItem }) {
  switch (item.kind) {
    case "notice":
      return <Notice item={item} />;
    case "note":
      return <Note item={item} />;
    case "agenda":
      return <AgendaTicket item={item} />;
    case "tag":
      return <FeeTag item={item} />;
    case "checklist":
      return <Checklist item={item} />;
    case "badge":
      return <ParentBadge item={item} />;
    case "bubble":
      return <Bubble item={item} />;
    case "faq":
      return <QuickFaq item={item} />;
  }
}

export default function ParentsGuide() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ motionOK: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { motionOK } = ctx.conditions as Record<string, boolean>;
      const section = sectionRef.current;
      if (!section || !motionOK) return;

      const board = section.querySelector<HTMLElement>(".board");
      const notice = section.querySelector<HTMLElement>(".board-stamp")?.closest<HTMLElement>(".board-item");
      const lines = gsap.utils.toArray<HTMLElement>(".guide-line", section);
      const chips = gsap.utils.toArray<HTMLElement>(".board-chip", section);
      const items = gsap.utils.toArray<HTMLElement>(".board-item", section);
      const notes = gsap.utils.toArray<HTMLElement>(".board-note", section);
      const stamp = section.querySelector<HTMLElement>(".board-stamp");

      // the title arrives as the page opens, the chips a beat behind it
      gsap.from(lines, { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
      gsap.from(chips, { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.35, ease: "back.out(1.6)" });

      // the board itself rises into place
      if (board) {
        gsap.from(board, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: board, start: "top 85%" },
        });
      }

      // the notes hang a little crooked, the way pinned paper does
      gsap.set(notes, { rotation: (i: number) => NOTE_TILT[i % NOTE_TILT.length] });

      // each object rises onto the board as it scrolls in, then its pins pop
      // in. nothing is hidden beforehand, so a batch that never fires still
      // leaves the guide readable. y/opacity only — rotation would clobber
      // the notes' tilt
      ScrollTrigger.batch(items, {
        start: "top 85%",
        once: true,
        // registered on the context so mm.revert() owns these late tweens too
        onEnter: (batch) =>
          ctx.add(() => {
            gsap.from(batch, {
              y: 40,
              opacity: 0,
              stagger: 0.12,
              duration: 0.7,
              ease: "back.out(1.3)",
              overwrite: true,
            });
            const pins = batch.flatMap((el) => gsap.utils.toArray<HTMLElement>(".board-pin", el));
            if (pins.length) {
              gsap.from(pins, { scale: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(3)", delay: 0.4 });
            }
          }),
      });

      // the stamp comes down onto the notice: big and crooked, then inked flat
      if (stamp && notice) {
        gsap.set(stamp, { rotation: -6 });
        gsap.fromTo(
          stamp,
          { scale: 1.6, opacity: 0, rotation: -14 },
          {
            scale: 1,
            opacity: 1,
            rotation: -6,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: { trigger: notice, start: "top 75%" },
          }
        );
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="parents" className="relative px-4 pb-24">
      {/* big hooks: a beating heart behind the title, a laptop rocking on the right */}
      <div className="anchor-drift pointer-events-none absolute left-6 top-28 -z-[1] hidden lg:block">
        <PixelHeart className="anchor-beat" size={260} />
      </div>
      <div className="anchor-drift pointer-events-none absolute right-10 top-40 -z-[1] hidden lg:block">
        <FloatingLaptop className="anchor-wobble" width={260} />
      </div>
      <div className="anchor-drift pointer-events-none absolute left-14 top-[58%] -z-[1] hidden lg:block">
        <PixelGrid size={72} />
      </div>
      <div className="pointer-events-none absolute left-[22%] top-56 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={40} />
      </div>
      <div className="pointer-events-none absolute right-[14%] top-[62%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={56} />
      </div>
      <div className="pointer-events-none absolute right-24 top-[88%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={30} color="#0145b4" />
      </div>

      <header className="mx-auto max-w-5xl px-4 pt-32 pb-10 text-center md:pt-40">
        <p className="guide-line mb-3 text-sm font-semibold text-saigon">For parents ✦</p>
        <h1 className="guide-line text-5xl font-bold leading-tight md:text-7xl">
          The <span className="text-saigon">parents&apos;</span> guide
        </h1>
        <p className="guide-line mx-auto mt-5 max-w-2xl text-lg font-medium text-ink/70 md:text-xl">
          Everything you need to plan the day — and the one rule we ask every family to keep.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="board-chip rounded-full border-2 border-saigon bg-white px-4 py-1.5 text-sm font-semibold text-saigon shadow-[0_3px_0_#cbd8ee]"
            >
              {chip}
            </span>
          ))}
        </div>
      </header>

      {/* the noticeboard: a sky-blue cork face in a screwed-down frame, with
          every part of the guide pinned to it as its own object */}
      <div className="board relative mx-auto max-w-6xl rounded-3xl border-[6px] border-saigon bg-[#c9d7ee] p-5 shadow-[inset_0_0_0_5px_#a8bfe2,0_10px_0_#01337f] md:p-10">
        <Screws />
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          {PARENTS_GUIDE.map((item) => (
            <GuideObject key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-ink/70">Still wondering about something?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <SiteLink href="/rules" className={GHOST_BUTTON}>
            Read the rules
          </SiteLink>
          <SiteLink href="/#faq" className={GHOST_BUTTON}>
            See the FAQ
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
