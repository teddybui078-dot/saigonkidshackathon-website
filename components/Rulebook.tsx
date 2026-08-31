"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelGrid, Sparkle, CodeMark, PixelPlanet } from "./decorations";
import { BinderRing } from "./parts";
import RichText from "./RichText";
import { scrollToHash, NAV_OFFSET } from "./SiteLink";
import { RULES, RULES_INTRO, RULES_CLOSING } from "./rules";
import { EVENT, AGES, GRADES, TEAM_SIZE } from "./event";

gsap.registerPlugin(ScrollTrigger);

/* the four facts that sit under the title, as chips */
const CHIPS = [
  EVENT.dateLong,
  `Ages ${AGES} (${GRADES})`,
  `Teams of ${TEAM_SIZE}`,
  ...(EVENT.aiAllowed ? ["AI allowed"] : []),
];

/* the contents entries: a yellow chip for the rule you're reading, a
   paper-white one for the rest — both spelled out in full so tailwind
   can see them. one line in the strip, wrapping in the column */
const TOC_LINK = {
  active:
    "inline-flex items-start gap-2 whitespace-nowrap rounded-full border-2 border-ink-deep px-3 py-1.5 text-sm font-semibold transition-colors bg-energy text-ink shadow-[0_2px_0_#d99a00] lg:whitespace-normal",
  inactive:
    "inline-flex items-start gap-2 whitespace-nowrap rounded-full border-2 border-ink-deep px-3 py-1.5 text-sm font-semibold transition-colors bg-white/70 text-ink/70 hover:bg-white lg:whitespace-normal",
} as const;

/* the line a sheet has to cross to count as "the one you're on": just under
   where a contents click lands it, so every sheet is tall enough */
const READING_LINE = -NAV_OFFSET + 48;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Rulebook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(RULES[0].id);

  // which sheet is under the reader: not gated by motion, the contents
  // must track the page even when nothing animates
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rule-sheet", section).forEach((sheet) => {
        ScrollTrigger.create({
          trigger: sheet,
          start: `top ${READING_LINE}px`,
          end: `bottom ${READING_LINE}px`,
          onToggle: (self) => {
            if (self.isActive) setActive(sheet.id);
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
      const section = sectionRef.current;
      if (!section) return;

      // the title lines settle in first, then the chips pop up under them
      gsap.from(gsap.utils.toArray<HTMLElement>(".rule-line", section), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".rule-chip", section), {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(1.6)",
        delay: 0.35,
      });

      // each sheet rises onto the rail as it scrolls into view, and its ring
      // snaps shut a beat later. nothing is hidden up front — a sheet that
      // never gets an onEnter simply stays put, readable
      const sheets = gsap.utils.toArray<HTMLElement>(".rule-sheet", section);
      ScrollTrigger.batch(sheets, {
        start: "top 85%",
        once: true,
        // registered on the context so mm.revert() owns these late tweens too
        onEnter: (batch) =>
          ctx.add(() => {
            gsap.from(batch, {
              y: 40,
              opacity: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
              overwrite: true,
            });
            const rings = batch.flatMap((sheet) => gsap.utils.toArray<HTMLElement>(".rule-ring", sheet));
            if (rings.length) {
              gsap.from(rings, {
                scale: 0.6,
                transformOrigin: "50% 50%",
                duration: 0.4,
                stagger: 0.1,
                delay: 0.25,
                ease: "back.out(3)",
              });
            }
          }),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="rules" className="relative">
      {/* big hooks: a planet over the title, code marks and sparks down the side */}
      <div className="anchor-drift pointer-events-none absolute right-[7%] top-24 -z-[1] hidden lg:block">
        <PixelPlanet className="anchor-wobble" size={230} />
      </div>
      <div className="pointer-events-none absolute left-[12%] top-52 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={46} />
      </div>
      <div className="pointer-events-none absolute right-[5%] top-[46%] -z-[1] hidden lg:block">
        <CodeMark className="ambient-float" size={150} />
      </div>
      <div className="pointer-events-none absolute left-[6%] top-[62%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={30} color="#191970" />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-40 right-[9%] -z-[1] hidden lg:block">
        <PixelGrid size={90} />
      </div>

      <header className="mx-auto max-w-5xl px-4 pb-10 pt-32 text-center md:pt-40">
        <p className="rule-line mb-3 text-sm font-semibold text-sun">The rules ✦</p>
        <h1 className="rule-line text-5xl font-bold leading-tight md:text-7xl">
          The whole rulebook, <span className="text-sun">up front</span>
        </h1>
        <p className="rule-line mx-auto mt-5 max-w-2xl text-lg font-medium text-white/75 md:text-xl">
          {RULES_INTRO}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rule-chip rounded-full border-2 border-ink-deep bg-white px-4 py-1.5 text-sm font-semibold text-saigon shadow-[0_2px_0_#ffd166]"
            >
              {chip}
            </span>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-24 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
        {/* contents: a column of tabs on wide screens, a strip of chips you
            can thumb through on small ones */}
        <nav aria-labelledby="rules-toc-label" className="mb-10 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
          <p id="rules-toc-label" className="mb-3 text-xs font-bold uppercase tracking-widest text-sun/80">
            On this page
          </p>
          {/* a little breathing room so the focus ring isn't clipped by the scroller */}
          <ol className="-mx-1 -mt-2 flex gap-2 overflow-x-auto px-1 pb-2 pt-2 lg:m-0 lg:flex-col lg:overflow-visible lg:p-0">
            {RULES.map((rule) => (
              <li key={rule.id} className="shrink-0">
                <a
                  href={"#" + rule.id}
                  onClick={(e) => {
                    // a modifier click still opens the hash in a new tab
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                    e.preventDefault();
                    scrollToHash("#" + rule.id);
                    window.history.replaceState(null, "", "#" + rule.id);
                    document.getElementById(rule.id)?.focus({ preventScroll: true });
                  }}
                  aria-current={active === rule.id ? "true" : undefined}
                  className={active === rule.id ? TOC_LINK.active : TOC_LINK.inactive}
                >
                  <span className="shrink-0 font-bold text-sun">{pad(rule.n)}</span>
                  {rule.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div>
          {/* the book: a rail down the left, punched sheets clipped to it by a
              ring each — rail, ring and holes all share one centre line */}
          <div className="relative">
            <span
              className="absolute bottom-2 left-[19px] top-2 hidden w-2 rounded-full bg-space-light md:block"
              aria-hidden="true"
            />
            <ol className="space-y-8">
              {RULES.map((rule) => (
                <li key={rule.id} id={rule.id} tabIndex={-1} className="rule-sheet relative scroll-mt-28 outline-none">
                  <article className="paper-punched relative rounded-2xl border-[3px] border-ink-deep py-8 pl-8 pr-6 text-ink shadow-[0_4px_0_#ffd166] md:pl-20 md:pr-10">
                    {/* the number, big and hollow, in the top corner of the sheet */}
                    <span
                      className="text-outline-blue absolute right-6 top-4 select-none text-6xl font-bold leading-none md:text-7xl"
                      aria-hidden="true"
                    >
                      {pad(rule.n)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-saigon/70">Rule {pad(rule.n)}</span>
                    <h2 className="pr-20 text-2xl font-bold leading-tight md:text-3xl">{rule.title}</h2>
                    {rule.paragraphs.map((p) => (
                      <RichText key={p} text={p} className="mt-4 text-lg font-medium leading-7 text-ink/75" />
                    ))}
                  </article>
                  {/* after the sheet in the dom, so it paints on top, seated on the first hole */}
                  <BinderRing size={30} className="rule-ring absolute left-2 top-4 hidden md:block" />
                </li>
              ))}
            </ol>
          </div>

          {/* a loose note at the back of the book */}
          <div className="mt-12 rounded-2xl border-[3px] border-dashed border-white/30 bg-white/10 p-6">
            <RichText text={RULES_CLOSING} className="text-lg font-medium leading-7 text-white/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
