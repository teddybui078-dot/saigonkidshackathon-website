/* the podium and the solo awards. prizes are placeholders until they're
   announced — keep the wording so it reads as intentional, not missing */

export const PRIZE_TBA = "Prize to be announced";

export type TeamAward = {
  place: 1 | 2 | 3;
  ordinal: "1st" | "2nd" | "3rd";
  name: string;
  trophy: boolean;
  medal: "gold" | "silver" | "bronze";
  wins: string[];
};

export const TEAM_AWARDS: TeamAward[] = [
  {
    place: 1,
    ordinal: "1st",
    name: "First place",
    trophy: true,
    medal: "gold",
    wins: ["The gold trophy", "Medals for the team", "A prize for every member"],
  },
  {
    place: 2,
    ordinal: "2nd",
    name: "Second place",
    trophy: false,
    medal: "silver",
    wins: ["Medals for the team", "A prize for every member"],
  },
  {
    place: 3,
    ordinal: "3rd",
    name: "Third place",
    trophy: false,
    medal: "bronze",
    wins: ["Medals for the team", "A prize for every member"],
  },
];

export type SoloAward = { id: string; name: string; blurb: string; prize: string };

/* individual awards: a prize each, no medals or trophies */
export const SOLO_AWARDS: SoloAward[] = [
  { id: "best-solo", name: "Best Solo Project", blurb: "The strongest project built by a team of one.", prize: PRIZE_TBA },
  {
    id: "best-design-solo",
    name: "Best Design Solo Project",
    blurb: "The solo build that looks and feels the most finished.",
    prize: PRIZE_TBA,
  },
  { id: "rising-hacker", name: "Rising Hacker", blurb: "The builder who came the furthest in one day.", prize: PRIZE_TBA },
];
