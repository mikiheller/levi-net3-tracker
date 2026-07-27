import type { DomainMeta } from "./types";

// Weights reflect priorities for tracking cognitive recovery in DEE-SWAS:
// verbal speech tied for first with social connection and cognition, motor
// deliberately high, AAC ~1/3 of speech. Editable in the admin portal.
export const DOMAINS: DomainMeta[] = [
  {
    id: "speech",
    name: "Verbal Speech",
    shortName: "Speech",
    defaultWeight: 17,
    isLadder: true,
    description:
      "Custom ladder from directed vocalizing through word approximations to meaningful single words. Built for very early speech re-emergence.",
    color: "#6366f1",
  },
  {
    id: "aac",
    name: "AAC",
    shortName: "AAC",
    defaultWeight: 5,
    isLadder: true,
    description:
      "Custom ladder measuring purposeful AAC use: verifiably correct answers and independent navigation, not just button presses.",
    color: "#a855f7",
  },
  {
    id: "gesture",
    name: "Gestures & Body",
    shortName: "Gestures",
    defaultWeight: 6,
    isLadder: true,
    description:
      "Nonverbal expressive communication: hand-leading, pointing, head shakes, social gestures, pointing to share.",
    color: "#d946ef",
  },
  {
    id: "receptive",
    name: "Understanding (Receptive)",
    shortName: "Understanding",
    defaultWeight: 8,
    isLadder: true,
    description:
      "Receptive language: responding to name, following directions, identifying named objects, understanding questions.",
    color: "#3b82f6",
  },
  {
    id: "social",
    name: "Social Connection",
    shortName: "Social",
    defaultWeight: 17,
    isLadder: false,
    description:
      "Social interest, engagement and reciprocity (NET3 Social Communication scale).",
    color: "#f59e0b",
  },
  {
    id: "cognition",
    name: "Cognition & Attention",
    shortName: "Cognition",
    defaultWeight: 17,
    isLadder: false,
    description:
      "Alertness, responsiveness, attention, memory, learning and problem-solving (custom + NET3 ADHD items). Very sensitive to DEE-SWAS treatment effects.",
    color: "#0ea5e9",
  },
  {
    id: "dls",
    name: "Daily Living Skills",
    shortName: "Daily living",
    defaultWeight: 13,
    isLadder: true,
    description:
      "Practical skills ordered by developmental difficulty (NET3 Practical Living Skills), asked as how often he did them on his own.",
    color: "#10b981",
  },
  {
    id: "rrb",
    name: "Repetitive & Sensory",
    shortName: "Repetitive",
    defaultWeight: 6,
    isLadder: false,
    description:
      "Repetitive behaviors, insistence on sameness, sensory sensitivities (NET3 RRB items).",
    color: "#f97316",
  },
  {
    id: "motor",
    name: "Motor Skills",
    shortName: "Motor",
    defaultWeight: 11,
    isLadder: true,
    description: "Gross and fine motor skills (NET3 Motor scale, core items).",
    color: "#84cc16",
  },
];

export const DOMAIN_MAP = Object.fromEntries(DOMAINS.map((d) => [d.id, d]));
