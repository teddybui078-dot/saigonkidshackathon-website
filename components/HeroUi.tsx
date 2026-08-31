/* layer 5 — the sign the hero stands its name on: the red-lacquer board
   with the hand-drawn wordmark, floating in space on its own stems. the
   sign is pure illustration — the pitch and the buttons sit below it, on
   the sky. every number comes from event.ts */

import SiteLink from "./SiteLink";
import { HERO_LAYER } from "./hero-layers";
import { SignBoard } from "./space";
import { EVENT, AGES } from "./event";

export default function HeroUi() {
  return (
    <div
      className="relative flex w-full flex-col items-center"
      style={{ zIndex: HERO_LAYER.ui }}
    >
      {/* the whole assembly bobs and sways together — gsap on the wrapper */}
      <div className="hero-sign flex w-[94vw] max-w-[480px] flex-col items-center sm:max-w-[580px] md:w-[min(58vw,760px)] md:max-w-none">
        {/* the board, drawn — frame, shadow, bolts and name in one */}
        <h1 className="m-0 w-full">
          <span className="sr-only">{EVENT.name}</span>
          <SignBoard className="h-auto w-full" />
        </h1>
      </div>

      {/* the facts and the buttons — out of the art, on the sky. no
          data-speed and outside .hero-sign, so they neither bob nor drift */}
      <div className="hero-actions mt-4 flex flex-col items-center px-4 text-center text-ink md:mt-6">
        <p className="hero-fade m-0 mx-auto max-w-md text-base font-medium leading-snug text-ink/80 md:text-lg">
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
