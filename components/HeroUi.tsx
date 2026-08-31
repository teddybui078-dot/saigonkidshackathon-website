/* layer 5 — the sign the hero hangs its name on: two cords down from the
   lantern string, a bamboo pole with a lotus on top, the red-lacquer
   frame, the hand-drawn wordmark on the white board, and the tag swinging
   underneath with the astronaut hanging off it. the sign is pure
   illustration — the facts and the buttons sit below it, on the sky.
   every number comes from event.ts */

import SiteLink from "./SiteLink";
import { HERO_LAYER } from "./hero-layers";
import { KidAstronaut, LotusFinial } from "./space";
import { Wordmark } from "./Wordmark";
import { EVENT, AGES } from "./event";

export default function HeroUi() {
  return (
    <div
      className="relative flex w-full flex-col items-center"
      style={{ zIndex: HERO_LAYER.ui }}
    >
      {/* the whole hanging assembly bobs together — gsap, translate only */}
      <div className="hero-sign flex w-[88vw] max-w-[420px] flex-col items-center sm:max-w-[500px] md:w-[min(44vw,560px)] md:max-w-none">
        {/* the two cords up to the string, knots resting on it */}
        <div className="relative -mb-1 flex w-1/2 items-start justify-between" aria-hidden="true">
          <span className="flex flex-col items-center">
            <span className="sign-knot" />
            <span className="cord-stretch sign-cord h-8 md:h-10" />
          </span>
          <span className="flex flex-col items-center">
            <span className="sign-knot" />
            <span className="cord-stretch sign-cord h-8 md:h-10" />
          </span>
        </div>

        {/* the bamboo pole with its lotus riding on top */}
        <div className="relative w-[106%]" aria-hidden="true">
          <LotusFinial className="lotus-breathe absolute -top-9 left-1/2 w-12 -translate-x-1/2 md:-top-11 md:w-14" />
          <div className="sign-pole" />
        </div>

        {/* the red-lacquer frame */}
        <div className="sign-frame mt-2 w-full">
          {/* brass corner bolts on the lacquer rail, one a little crooked */}
          <span className="sign-bolt left-1.5 top-1.5" aria-hidden="true" />
          <span className="sign-bolt right-1.5 top-1.5 rotate-12" aria-hidden="true" />
          <span className="sign-bolt bottom-1.5 left-1.5" aria-hidden="true" />
          <span className="sign-bolt bottom-1.5 right-1.5" aria-hidden="true" />

          <div className="sign-inner">
            {/* the white board: the name, painted by hand — never typeset */}
            <h1 className="m-0 bg-white px-4 py-3 sm:px-6 sm:py-4">
              <span className="sr-only">{EVENT.name}</span>
              <Wordmark className="mx-auto h-auto w-full max-w-[440px]" />
            </h1>
          </div>
        </div>

        {/* the tag on its rings, and the astronaut hanging off it */}
        <div className="hero-tag-wrap relative -mt-1 flex flex-col items-center [transform-origin:50%_0]">
          <div className="flex w-56 items-start justify-between px-6" aria-hidden="true">
            <span className="sign-cord h-5" />
            <span className="sign-cord h-5" />
          </div>
          <div className="relative">
            <span
              className="sign-tag swing-hang text-sm sm:text-base"
              style={{ "--swing": "5deg", "--swing-time": "3.2s" } as React.CSSProperties}
            >
              <span className="sign-led motion-safe:animate-led-blink" aria-hidden="true" />
              registration opens soon
            </span>
            {/* the keychain: a rope off the tag's left end, a kid on it */}
            <div
              className="swing-hang absolute left-1 top-[72%] hidden w-24 md:block"
              style={{ "--swing": "6deg", "--swing-time": "4.6s" } as React.CSSProperties}
              aria-hidden="true"
            >
              <span className="mx-auto block h-7 w-1 rounded-full bg-ink-deep" />
              <KidAstronaut className="-mt-2 h-auto w-full -translate-x-[27%]" />
            </div>
          </div>
        </div>
      </div>

      {/* the facts and the buttons — out of the art, on the sky. no
          data-speed and outside .hero-sign, so they neither bob nor drift */}
      <div className="hero-actions mt-16 flex flex-col items-center px-4 text-center text-white md:mt-24">
        <p className="hero-fade m-0">
          <span className="badge-date text-xs sm:text-base">
            <span className="sign-led motion-safe:animate-led-blink" aria-hidden="true" />
            <span className="sm:hidden">{EVENT.date.toLowerCase()}</span>
            <span className="hidden sm:inline">{EVENT.dateLong.toLowerCase()}</span>
            {" "}· {EVENT.city.toLowerCase()}
          </span>
        </p>
        <p className="hero-fade mx-auto mt-3.5 max-w-md text-base font-medium leading-snug text-white/90 md:text-lg">
          one big day of building, coding and playing — for {EVENT.spots} young makers
          aged {AGES}.
        </p>
        <div className="hero-fade mt-4 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/#about" className="cta-primary">
            what is it?
          </SiteLink>
          <SiteLink href="/rules" className="cta-secondary">
            the rules
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
