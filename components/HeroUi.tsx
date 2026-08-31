/* layer 5 — the sign the hero hangs its name on: two cords down from the
   lantern string, a bamboo pole with a lotus on top, and the red-lacquer
   frame with the hand-drawn wordmark. the sign is pure illustration — the
   pitch and the buttons sit below it, on the sky. every number comes
   from event.ts */

import SiteLink from "./SiteLink";
import { HERO_LAYER } from "./hero-layers";
import { LotusFinial, OrbitRings, SignBoard } from "./space";
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

        {/* the bamboo pole with its lotus riding on top, ringed in gold —
            hung a shade off level, like it was tied up by hand */}
        <div className="relative w-[106%] -rotate-[0.6deg]" aria-hidden="true">
          <OrbitRings className="absolute -top-14 left-1/2 w-36 -translate-x-1/2 md:-top-16 md:w-40" />
          <LotusFinial className="lotus-breathe absolute -top-9 left-1/2 w-12 -translate-x-1/2 md:-top-11 md:w-14" />
          <div className="sign-pole" />
        </div>

        {/* the red-lacquer board, drawn — frame, shadow, bolts and name in
            one. the negative margin swallows the svg's blank crown so the
            board tucks up under the pole */}
        <h1 className="m-0 -mt-4 w-full">
          <span className="sr-only">{EVENT.name}</span>
          <SignBoard className="h-auto w-full" />
        </h1>

      </div>

      {/* the facts and the buttons — out of the art, on the sky. no
          data-speed and outside .hero-sign, so they neither bob nor drift */}
      <div className="hero-actions mt-16 flex flex-col items-center px-4 text-center text-white md:mt-24">
        <p className="hero-fade m-0 mx-auto max-w-md text-base font-medium leading-snug text-white/90 md:text-lg">
          one big day of building, coding and playing — for {EVENT.spots} young makers
          aged {AGES}.
        </p>
        <div className="hero-fade mt-4 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/#about" className="cta-primary rotate-[0.75deg]">
            what is it?
          </SiteLink>
          <SiteLink href="/rules" className="cta-secondary -rotate-[0.5deg]">
            the rules
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
