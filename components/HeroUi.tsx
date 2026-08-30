/* layer 5 — the only part of the hero you can read or click: the logo as
   the title, floating free over the stars, and a sticker card under it
   with the date, the one-line pitch and the two buttons. every number
   comes from event.ts */

import Image from "next/image";
import SiteLink from "./SiteLink";
import { HERO_LAYER } from "./hero-layers";
import { EVENT, AGES } from "./event";

export default function HeroUi() {
  return (
    <div
      className="relative flex w-full max-w-3xl flex-col items-center text-center"
      style={{ zIndex: HERO_LAYER.ui }}
    >
      {/* the logo is the title — shown as-is, never shadowed or recoloured */}
      <h1 className="hero-logo m-0 w-[min(72vw,380px)]">
        <Image
          src="/logo-v2.png"
          alt={EVENT.name}
          width={512}
          height={341}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 640px) 380px, 72vw"
          className="h-auto w-full"
        />
      </h1>

      <div className="hero-sticker sticker-card mt-6 w-full max-w-xl px-6 py-7 sm:px-10 sm:py-8">
        <div className="hero-fade flex flex-wrap items-center justify-center gap-3">
          <span className="badge-date text-sm sm:text-base">
            <span className="sm:hidden">{EVENT.date}</span>
            <span className="hidden sm:inline">{EVENT.dateLong}</span> · {EVENT.city}
          </span>
          <span className="badge-hollow text-sm text-sun sm:text-base">✦ registration opens soon</span>
        </div>

        <p className="hero-fade mt-5 text-lg font-medium text-white/90 md:text-xl">
          one big day of building, coding and playing — for {EVENT.spots} young makers aged{" "}
          {AGES}.
        </p>

        <div className="hero-fade mt-6 flex flex-wrap items-center justify-center gap-3">
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
