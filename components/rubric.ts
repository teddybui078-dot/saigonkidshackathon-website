/* how projects are scored: seven criteria, 120 points. one-word titles so
   they fit on a scorecard; the notes are the question a judge asks */

export type Criterion = { id: string; title: string; pts: number; note: string };

export const RUBRIC: Criterion[] = [
  { id: "technical", title: "Technical", pts: 30, note: "Does the project actually work, and is the build real?" },
  { id: "creativity", title: "Creativity", pts: 20, note: "Is the idea their own, or the first tutorial result?" },
  { id: "ownership", title: "Ownership", pts: 15, note: "Can they explain their own project, including the hard parts?" },
  { id: "impact", title: "Impact", pts: 15, note: "Do they name a specific person or problem this solves?" },
  { id: "design", title: "Design", pts: 15, note: "Is it clear and visually appealing — does it look finished?" },
  { id: "presentation", title: "Presentation", pts: 15, note: "Could you follow it — clear, audible, within time." },
  { id: "relevance", title: "Relevance", pts: 10, note: "Does the project genuinely fit the track it was entered in?" },
];

export const RUBRIC_TOTAL = RUBRIC.reduce((sum, c) => sum + c.pts, 0); // 120
export const RUBRIC_MAX = Math.max(...RUBRIC.map((c) => c.pts)); // the longest bar

/* "seven questions" in the heading, derived so a new criterion can't desync it */
const WORDS = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const RUBRIC_COUNT_WORD = WORDS[RUBRIC.length] ?? String(RUBRIC.length);

/* when two projects tie, these settle it, in order */
export const TIE_BREAKERS = ["Technical", "Creativity", "Impact"];

export const JUDGING_LAB =
  "Judges sit down and try every project themselves in the judging lab — this is never a pitch-only competition.";
