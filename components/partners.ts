/* the three organisations behind the day — one list so the strip under
   the hero, the partnership section and the footer never drift apart. a
   logo carries its real pixel size so it is always drawn at its own
   proportions; a null logo gets a dashed placeholder slot until the real
   mark arrives. */

export type PartnerLogo = { src: string; width: number; height: number };

export type Partner = { name: string; logo: PartnerLogo | null };

export const PARTNERS: Partner[] = [
  { name: "Saigon Kids Hackathon", logo: { src: "/logo-v2.png", width: 512, height: 341 } },
  { name: "Project Possible", logo: null },
  { name: "Saigon South International School", logo: null },
];
