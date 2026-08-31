/* the whole rulebook. paragraphs may carry [label](href) links, rendered
   by RichText. summaries are the one-line version for the info box. */

import { EVENT, AGES, GRADES, TEAM_SIZE } from "./event";
import { RUBRIC, RUBRIC_TOTAL, TIE_BREAKERS, JUDGING_LAB } from "./rubric";

export type Rule = { n: number; id: string; title: string; summary: string; paragraphs: string[] };

export const RULES_INTRO =
  "Short, plain, and published before registration opens — so nothing about the day is a surprise.";

export const RULES_CLOSING =
  "Questions about anything here? Reach out using the contact details in the footer, or read the [parents' guide](/parents) for the safety and supervision detail.";

export const RULES: Rule[] = [
  {
    n: 1,
    id: "eligibility",
    title: "Eligibility",
    summary: `Ages ${AGES} (${GRADES}), any school, any experience. A parent or guardian stays on site all day.`,
    paragraphs: [
      `${EVENT.name} is open to students ages ${AGES} (${GRADES}), from any school and with any amount of coding experience — including none.`,
      "Every participant under 18 needs permission from a parent or legal guardian, collected during registration. A parent or guardian must stay on site for the whole event, start to finish, so an adult who knows your child is there if anything comes up. School and camp groups may send one or two adult chaperones for the group instead — as long as they stay the whole day and are responsible for every child in the group.",
    ],
  },
  {
    n: 2,
    id: "teams",
    title: "Teams",
    summary: `${TEAM_SIZE} students per team, cross-school welcome, finalised at check-in.`,
    paragraphs: [
      `${TEAM_SIZE} students per team. Teams of ${EVENT.team.max} are recommended. If you register solo you can opt into team matching on the morning of the event, or compete solo if you'd rather go it alone.`,
      "Cross-school teams are allowed. Teams are finalised at check-in; if you need to swap a teammate before then, email us.",
    ],
  },
  {
    n: 3,
    id: "challenges",
    title: "Challenges",
    summary: `Revealed at ${EVENT.reveal} on the day. Every team picks one and builds for it.`,
    paragraphs: [
      `The challenges are revealed at ${EVENT.reveal} on the day, after kickoff. Every team picks one challenge and builds for it.`,
      `Your project should genuinely fit the challenge you entered — challenge relevance is worth ${RUBRIC.find((c) => c.id === "relevance")!.pts} points on the rubric.`,
    ],
  },
  {
    n: 4,
    id: "preparing-beforehand",
    title: "What you can prepare beforehand",
    summary: "Tools, templates and your setup: yes. The idea and the build: on the day.",
    paragraphs: [
      "You may prepare skills, reusable tools, personal libraries, frameworks, your development environment, and generic project templates ahead of time.",
      "The core concept of your project, and the substantial majority of its implementation, must be built during the event itself.",
      "If your project uses a significant pre-existing component — a library you wrote earlier, a template, an asset pack — disclose it briefly in your submission.",
    ],
  },
  {
    n: 5,
    id: "ai-tools",
    title: "AI tools",
    summary: "Any free AI tool is welcome. Disclose what you used, and be able to explain your build.",
    paragraphs: [
      "Any free AI tool is welcome: code generation, image generation, AI APIs, prebuilt agents, and AI design tools are all allowed.",
      "We don't provide or fund AI tools or API credits. We'll publish a list of optional free resources before the event.",
      "Briefly disclose which AI tools you used in your submission. Using AI well is a skill; using it to replace your own understanding of what you built is not. Be ready to explain any part of your project to a judge.",
    ],
  },
  {
    n: 6,
    id: "source-code-and-ownership",
    title: "Source code and ownership",
    summary: "Your project belongs to your team. Showcasing it afterwards is always opt-in.",
    paragraphs: [
      "Your project and its source code belong to your team. We may ask permission to feature your project — name, screenshots, demo link — in a post-event showcase, and that is always opt-in.",
      "Don't submit code, assets, or content you don't have the rights to use.",
    ],
  },
  {
    n: 7,
    id: "acceptable-content-and-conduct",
    title: "Acceptable content and conduct",
    summary: "Youth-appropriate projects, respect for everyone. Harassment ends your day.",
    paragraphs: [
      "Projects must be appropriate for a youth event — nothing explicit, hateful, or otherwise inappropriate.",
      "Treat every participant, mentor, judge, and organizer with respect. Harassment of any kind ends your day at the event.",
    ],
  },
  {
    n: 8,
    id: "hardware-and-safety",
    title: "Hardware and safety",
    summary: "Hardware must be safe for a school environment. Ask an organizer if unsure.",
    paragraphs: [
      "If your project involves hardware, keep it safe for a school environment — no exposed high voltage, open flame, or anything that could injure a participant, mentor, or judge.",
      "Check with an organizer before using tools or materials you're unsure about.",
    ],
  },
  {
    n: 9,
    id: "judging-and-prizes",
    title: "Judging and prizes",
    summary: `${RUBRIC_TOTAL} points across ${RUBRIC.length} criteria. Judges test every project in the judging lab.`,
    paragraphs: [
      `Projects are scored out of ${RUBRIC_TOTAL} points across ${RUBRIC.length} criteria: ${RUBRIC.map((c) => `${c.title} (${c.pts})`).join(", ")}.`,
      `What each one asks: ${RUBRIC.map((c) => `${c.title} — ${c.note.replace(/[.?]$/, "")}`).join("; ")}.`,
      JUDGING_LAB,
      `Ties are broken first by ${TIE_BREAKERS.join(", then ")}.`,
    ],
  },
  {
    n: 10,
    id: "late-arrival-and-submission",
    title: "Late arrival and submission",
    summary: `Running late? Message an organizer. Submissions close at ${EVENT.submissionsClose} by our clock.`,
    paragraphs: [
      "If you're running late, message an organizer — we'll help you check in and catch up.",
      `Submissions close at ${EVENT.submissionsClose}, measured by our server clock rather than your device's. Submit early if your connection is unreliable.`,
    ],
  },
  {
    n: 11,
    id: "organizer-discretion",
    title: "Organizer discretion",
    summary: "Organizers may disqualify for rule-breaking or unsafe behaviour, and will always explain why.",
    paragraphs: [
      "Organizers may disqualify a project or team for violating these rules or for unsafe behaviour. We will always explain why.",
      "These rules may be updated before the event as details are finalised. Check back if it's been a while since you last read them.",
    ],
  },
];
