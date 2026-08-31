/* who's behind it — the three lockups in one row, just under the hero.
   plain bold names with a logo slot each, a × between every pair. the ×
   lives inside the item of the name that follows it, so a pair never
   splits across a line break. the big pinned partnership section lower
   down and the footer read the same list. */

import { LogoSlot } from "./parts";
import { PARTNERS } from "./partners";

export default function PartnerStrip() {
  return (
    <section aria-label="Who is behind the day" className="px-4 pb-4 pt-12">
      <p className="mb-5 text-center text-sm font-semibold tracking-wide text-energy-deep">backed by ✦</p>
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {PARTNERS.map((partner, i) => (
          <li key={partner.name} className="inline-flex items-center gap-3">
            {i > 0 && (
              <span className="text-2xl font-bold leading-none text-energy md:text-3xl" aria-hidden="true">
                ×
              </span>
            )}
            <LogoSlot partner={partner} size={56} />
            <span className="text-lg font-bold text-saigon sm:text-xl">{partner.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
