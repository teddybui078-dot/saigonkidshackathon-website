/* the parents' guide, as pinned notes on a board. `kind` picks the object
   each item is drawn as; the copy is plain strings so it's easy to edit */

import { EVENT, TEAM_SIZE } from "./event";

export const ON_SITE_RULE = "A parent or guardian stays on site for the whole event — start to finish.";

export const CHAPERONE_RULE =
  "School and camp groups may send one or two adult chaperones for the group instead, as long as they stay the whole day and are responsible for every child in the group.";

export type GuideItem = {
  id: string;
  kind: "notice" | "note" | "agenda" | "tag" | "checklist" | "badge" | "bubble" | "faq";
  title: string;
  body: string[];
  items?: string[];
  qa?: { q: string; a: string }[];
};

export const PARENTS_GUIDE: GuideItem[] = [
  {
    id: "on-site",
    kind: "notice",
    title: "A parent or guardian stays on site — the whole time",
    body: [
      `This is the one rule we ask every family to plan around. From check-in at 8:00 until closing after the awards, a parent or legal guardian must be at the venue. Not on call, not nearby — on site.`,
      "Why: if a child feels unwell, gets upset, or anything unexpected happens, the person who knows them best is already there. It keeps the day calm for everyone.",
      `Groups: if a school or camp brings a group — say, 20 kids — one or two adult chaperones from that organisation can stay in place of individual parents, as long as they stay for the whole day and are responsible for every child in the group.`,
    ],
  },
  {
    id: "what-it-is",
    kind: "note",
    title: "What the day is",
    body: [
      `One Saturday of building. Kids team up (${TEAM_SIZE} per team), pick a challenge revealed that morning, and make something real — a game, an app, a website, a gadget — with mentors beside them the whole way. No grades, no homework: the point is to finish something they're proud of and show it off.`,
    ],
  },
  {
    id: "agenda",
    kind: "agenda",
    title: "The day at a glance",
    body: [],
  },
  {
    id: "fee",
    kind: "tag",
    title: "The fee",
    body: [
      `${EVENT.fee.display} per builder. It covers the whole day: lunch and snacks, the builders kit, the mentors, and the judging lab. How and when to pay comes with the registration confirmation.`,
    ],
  },
  {
    id: "bring",
    kind: "checklist",
    title: "What to bring",
    body: [],
    items: [
      "A laptop and charger — loaners are available, tell us at registration",
      "A water bottle",
      "Any medication your child needs, and a note for us",
      "Comfortable clothes — it's a long, busy day",
      "A parent or guardian, for the whole day",
    ],
  },
  {
    id: "food",
    kind: "note",
    title: "Food",
    body: [
      "Breakfast at check-in, lunch at 12:00, and light snacks in the builders kit. Tell us about allergies and dietary needs at registration and we'll plan around them.",
    ],
  },
  {
    id: "safety",
    kind: "note",
    title: "Safety and supervision",
    body: [
      "Mentors and organisers are on the floor all day and easy to spot. Kids stay in the event space; anyone leaving the venue does so with their parent or chaperone. Hardware projects are checked by an organiser before they're switched on.",
    ],
  },
  {
    id: "parents-space",
    kind: "badge",
    title: "Where parents are",
    body: [
      `There's a parents' area a short walk from the tables, and you're welcome to wander the floor and watch. Everyone comes together for demos and awards at ${EVENT.demos}.`,
    ],
  },
  {
    id: "contact",
    kind: "bubble",
    title: "Getting in touch on the day",
    body: [
      "Your registration confirmation includes the organisers' number for the day. Check-in is the place to go for anything: lost items, a child who needs a break, or a question you didn't think of.",
    ],
  },
  {
    id: "faq",
    kind: "faq",
    title: "Quick questions",
    body: [],
    qa: [
      {
        q: "Can I drop my child off and come back later?",
        a: "No — a parent or guardian (or a group's chaperone) stays on site for the whole day. That's how we keep every child safe.",
      },
      {
        q: "My child has never coded. Is that a problem?",
        a: "Not at all. Beginners are exactly who this is for; mentors and beginner-friendly tools carry them the rest of the way.",
      },
      {
        q: "Do they need their own team?",
        a: "No. Solo builders can join team matching on the morning, or compete solo — both are fine.",
      },
      {
        q: "Can kids use AI tools?",
        a: "Yes, any free AI tool. They disclose what they used, and they have to be able to explain their own project to a judge.",
      },
      { q: "What if we're running late?", a: "Message an organiser — we'll help you check in and catch up." },
    ],
  },
];
