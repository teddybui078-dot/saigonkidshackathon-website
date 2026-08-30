/* the day, hour by hour — the schedule lanterns and the parents' guide
   both read from here. the times match the rules: challenges drop at
   8:45, submissions close at 16:00, judges test everything after */

export type Slot = { time: string; title: string; body: string };

export const AGENDA: Slot[] = [
  { time: "8:00", title: "Check-in & breakfast", body: "Grab a badge, a bánh mì, and find your table." },
  { time: "8:30", title: "Kickoff", body: "The countdown, the mission, and how the day works." },
  { time: "8:45", title: "Challenge reveal — build!", body: "The challenges drop, teams pick one, laptops open." },
  { time: "12:00", title: "Lunch break", body: "Refuel with friends — and sneak a peek at other teams." },
  { time: "14:00", title: "Mini workshops", body: "Quick, fun sessions: game design, robots, and AI tricks." },
  { time: "16:00", title: "Submissions close", body: "Hands off the keyboard — time to practice your pitch." },
  { time: "16:15", title: "Judging lab", body: "Judges sit down and try every project for themselves." },
  { time: "17:15", title: "Demos, awards & closing", body: "Every team on stage, then prizes, high-fives, and photos." },
];
