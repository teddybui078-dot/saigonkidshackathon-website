"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingLaptop, PixelStack, Sparkle } from "./decorations";
import { SubjectIcon, type SubjectKind } from "./parts";
import { DrawnBg } from "./drawn";
import { PrizeTag } from "./illustrations";
import SiteLink from "./SiteLink";
import { EVENT, AGES, GRADES, TEAM_SIZE, FEE_COVERS } from "./event";
import { RULES } from "./rules";
import { ON_SITE_RULE, CHAPERONE_RULE } from "./parents";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "fees" | "requirements" | "parents" | "rules";

/* the four dividers, in the order they stand in the box */
const TABS: { key: TabKey; label: string; icon: SubjectKind }[] = [
  { key: "fees", label: "Fees", icon: "gear" },
  { key: "requirements", label: "Requirements", icon: "list" },
  { key: "parents", label: "Parents", icon: "heart" },
  { key: "rules", label: "Rules", icon: "book" },
];

/* a divider tab: the active one stands up in yellow, the rest sit a
   touch lower in white and lift on hover */
const TAB_CLASS = {
  active:
    "info-tab inline-flex shrink-0 items-center gap-2 rounded-t-xl border-[3px] border-b-0 border-ink-deep bg-energy px-3 py-2 text-sm font-bold text-ink translate-y-0 transition-[translate,background-color,color] duration-200 ease-out md:px-5",
  inactive:
    "info-tab inline-flex shrink-0 items-center gap-2 rounded-t-xl border-[3px] border-b-0 border-ink-deep bg-white px-3 py-2 text-sm font-bold text-ink/60 translate-y-1 transition-[translate,background-color,color] duration-200 ease-out hover:translate-y-0.5 md:px-5",
};

const PILL =
  "mt-5 inline-flex rounded-full bg-energy px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_0_#d99a00]";

const REQUIREMENTS = [
  `Ages ${AGES} (${GRADES})`,
  `Teams of ${TEAM_SIZE} — solo is fine`,
  "A laptop and charger (loaners available — say so at registration)",
  "Permission from a parent or guardian, collected at registration",
  "Any experience level, including none",
];

function Panel({
  id,
  title,
  active,
  children,
}: {
  id: TabKey;
  title: string;
  active: boolean;
  children: React.ReactNode;
}) {
  // an index card: the title sits in the header band above the blue rule,
  // the body starts under it so the copy lands on the faint rules
  return (
    <div
      role="tabpanel"
      id={"panel-" + id}
      aria-labelledby={"tab-" + id}
      hidden={!active}
      tabIndex={0}
      className="info-panel paper-index relative min-h-[22rem] rounded-lg border-[3px] border-ink-deep p-6 text-ink pt-14 md:p-8 md:pt-14"
    >
      <h3 className="absolute left-6 top-3 text-xs font-bold uppercase tracking-widest text-saigon/70">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SquareBullet() {
  // a small yellow square in place of a dot
  return (
    <span
      className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-[3px] border-2 border-saigon bg-energy"
      aria-hidden="true"
    />
  );
}

function CheckSquare() {
  // a ticked box on the checklist
  return (
    <span
      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-saigon bg-white text-saigon"
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.5l2.5 2.5 4.5-5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ImportantInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<TabKey>("fees");
  // the card that was last dealt — the first mount deals nothing
  const lastActive = useRef<TabKey>("fees");
  // how tall the deck was before the switch, so it can glide to the new card
  const deckHeight = useRef<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { motionOK } = ctx.conditions as Record<string, boolean>;
        const section = sectionRef.current;
        if (!section || !motionOK) return;

        const box = section.querySelector<HTMLElement>(".info-box");
        const tabs = gsap.utils.toArray<HTMLElement>(".info-tab", section);

        // the heading arrives once
        gsap.from(gsap.utils.toArray<HTMLElement>(".info-line", section), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        });

        if (!box) return;

        // the box rises into place
        gsap.from(box, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: box, start: "top 80%" },
        });

        // the dividers drop in one after another. once landed, the inline
        // transform is cleared so the css translate classes take over again
        gsap.from(tabs, {
          y: -24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(1.6)",
          clearProps: "transform",
          scrollTrigger: { trigger: box, start: "top 80%" },
        });
      }
    );
    return () => mm.revert();
  }, []);

  // before paint, so the deck is already at its old height when the new
  // card appears — then it glides to the new one and the card fades in
  useLayoutEffect(() => {
    // no deal on first mount (or a strict-mode re-run) — only on a real switch
    if (lastActive.current === active) return;
    lastActive.current = active;
    const deck = deckRef.current;
    const panel = deck?.querySelector<HTMLElement>("#panel-" + active);
    const from = deckHeight.current;
    deckHeight.current = null;
    if (!deck || !panel) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const to = deck.offsetHeight;
      if (from !== null && from !== to) {
        gsap.fromTo(
          deck,
          { height: from },
          {
            height: to,
            duration: 0.35,
            ease: "power2.out",
            clearProps: "height",
            // the sections below only need re-measuring once the glide is done
            onComplete: () => ScrollTrigger.refresh(),
          }
        );
      } else {
        ScrollTrigger.refresh();
      }
      gsap.fromTo(
        panel,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", clearProps: "transform,opacity" }
      );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, [active]);

  const select = (i: number) => {
    deckHeight.current = deckRef.current?.offsetHeight ?? null;
    setActive(TABS[i].key);
    const tab = tabRefs.current[i];
    tab?.focus();
    // keep the chosen divider in view when the strip scrolls on phones
    tab?.scrollIntoView({ inline: "nearest", block: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // arrows walk the dividers and wrap; home and end jump to the ends
    const i = TABS.findIndex((t) => t.key === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    select(next);
  };

  return (
    <section ref={sectionRef} id="info" className="relative px-4 py-24">
      {/* big hooks: a laptop rocking top-right, a pixel stack bottom-left */}
      <div className="anchor-drift pointer-events-none absolute right-8 top-10 -z-[1] hidden lg:block">
        <FloatingLaptop className="anchor-wobble" width={260} />
      </div>
      <div className="anchor-drift pointer-events-none absolute bottom-24 left-8 -z-[1] hidden lg:block">
        <PixelStack width={180} />
      </div>
      <div className="pointer-events-none absolute left-[14%] top-28 -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={48} />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="info-line mb-3 text-sm font-semibold text-sun">Before you sign up ✦</p>
          <h2 className="info-line text-4xl font-bold leading-tight md:text-5xl">
            The <span className="text-sun">important</span> information
          </h2>
          <p className="info-line mt-4 font-medium text-white/70">
            Fees, requirements, what parents need to know, and the rules — all in one box.
          </p>
        </div>

        <div className="mt-6">
          {/* the dividers stand on the box's top lip. the list has a little
              room above for the drop-in and below for the sunk tabs, so the
              scroll container never clips them. on a phone the row can
              overflow, so the scrollbar stays visible there as the cue */}
          <div
            role="tablist"
            aria-label="Important information"
            onKeyDown={onKeyDown}
            className="info-tabs relative z-10 -mb-2 flex items-end gap-1 overflow-x-auto px-4 pb-1 pt-6 md:gap-1.5 md:px-6 md:[scrollbar-width:none]"
          >
            {TABS.map((tab, i) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={"tab-" + tab.key}
                  aria-selected={isActive}
                  aria-controls={"panel-" + tab.key}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  className={isActive ? TAB_CLASS.active : TAB_CLASS.inactive}
                >
                  <SubjectIcon kind={tab.icon} size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* the card box: sky-blue tin, four screws, a riveted label plate
              on the front lip */}
          <div className="info-box relative p-6 text-ink md:p-9">
            <DrawnBg aspect="wide" seed={2} tone="sky" bolts />
            <span className="metal-brushed absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border-2 border-saigon px-3 py-0.5 text-[10px] font-bold tracking-widest text-ink/70">
              <span
                className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-saigon bg-[#a8bfe2]"
                aria-hidden="true"
              />
              important information
              <span
                className="absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-saigon bg-[#a8bfe2]"
                aria-hidden="true"
              />
            </span>

            <div className="relative mt-3">
              {/* two more cards peeking up behind the one that's out */}
              <span
                className="absolute inset-x-10 -top-4 h-6 rounded-t-lg border-[3px] border-b-0 border-saigon bg-[#fff8e7]"
                aria-hidden="true"
              />
              <span
                className="absolute inset-x-6 -top-2 h-6 rounded-t-lg border-[3px] border-b-0 border-saigon bg-white"
                aria-hidden="true"
              />

              {/* the deck: clipped while it glides between card heights */}
              <div ref={deckRef} className="info-deck relative overflow-hidden">
              <Panel id="fees" title="Fees" active={active === "fees"}>
                {/* the price on a luggage tag, hung from a short string */}
                <div className="relative inline-block pt-4">
                  <span
                    className="absolute left-[18px] top-0 h-5 w-[3px] rounded-full bg-saigon"
                    aria-hidden="true"
                  />
                  <PrizeTag className="-rotate-1 [filter:drop-shadow(0_4px_0_#0d1b2a)]">
                    <span className="text-lg font-bold">{EVENT.fee.display} per builder</span>
                  </PrizeTag>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink/50">
                  What it covers
                </p>
                <ul className="mt-2 space-y-1">
                  {FEE_COVERS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-medium leading-7 text-ink/70 md:text-lg">
                      <SquareBullet />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base font-medium leading-7 text-ink/70 md:text-lg">
                  How and when to pay comes with your registration confirmation.
                </p>
                <p className="mt-2 text-base font-medium leading-7 text-ink/70 md:text-lg">
                  Registration opens soon.
                </p>
              </Panel>

              <Panel id="requirements" title="Requirements" active={active === "requirements"}>
                <p className="text-base font-medium leading-7 text-ink/70 md:text-lg">
                  Tick these off and you&apos;re eligible.
                </p>
                <ul className="mt-4 space-y-2">
                  {REQUIREMENTS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-medium leading-7 text-ink/70 md:text-lg">
                      <CheckSquare />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel id="parents" title="Parents" active={active === "parents"}>
                <p className="text-base font-medium leading-7 text-ink/70 md:text-lg">
                  Here&apos;s what the day looks like from the family side.
                </p>
                {/* the one rule every family plans around, stamped on a notice */}
                <div className="mt-4 rounded-xl border-[3px] border-ink-deep bg-white p-4 shadow-[0_4px_0_#ffd166]">
                  <span className="stamp -rotate-3 text-saigon" aria-hidden="true">
                    Stays on site — all day
                  </span>
                  <p className="mt-3 text-base font-semibold leading-7 text-ink md:text-lg">{ON_SITE_RULE}</p>
                  <p className="mt-2 text-base font-medium leading-7 text-ink/70 md:text-lg">{CHAPERONE_RULE}</p>
                  <p className="mt-2 text-base font-medium leading-7 text-ink/70 md:text-lg">
                    Why: if a child feels unwell or anything unexpected happens, an adult who
                    knows them is already on site.
                  </p>
                </div>
                <SiteLink href="/parents" className={PILL}>
                  Read the parents&apos; guide →
                </SiteLink>
              </Panel>

              <Panel id="rules" title="Rules" active={active === "rules"}>
                <p className="text-base font-medium leading-7 text-ink/70 md:text-lg">
                  {RULES.length} short rules, published up front.
                </p>
                <ol className="mt-4 grid grid-cols-[2.5rem_1fr] gap-x-2 gap-y-2">
                  {RULES.map((rule) => (
                    <li key={rule.id} className="col-span-2 grid grid-cols-subgrid">
                      <span className="text-sm font-bold leading-7 tracking-widest text-saigon">
                        {String(rule.n).padStart(2, "0")}
                      </span>
                      <div>
                        <SiteLink
                          href={"/rules#" + rule.id}
                          className="font-semibold leading-7 transition-colors hover:text-saigon"
                        >
                          {rule.title}
                        </SiteLink>
                        <p className="text-sm text-ink/60">{rule.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <SiteLink href="/rules" className={PILL}>
                  Read the whole rulebook →
                </SiteLink>
              </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
