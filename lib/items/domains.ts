import type { DomainMeta } from "./types";

// Weights reflect priorities for tracking cognitive recovery in DEE-SWAS:
// language (four separate tracks, 23 combined) and social connection first,
// then cognition and independence. Editable in the admin portal.
export const DOMAINS: DomainMeta[] = [
  {
    id: "speech",
    name: "Verbal Speech",
    shortName: "Speech",
    defaultWeight: 9,
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
    defaultWeight: 4,
    isLadder: true,
    description:
      "Nonverbal expressive communication: hand-leading, pointing, head shakes, social gestures, pointing to share.",
    color: "#d946ef",
  },
  {
    id: "receptive",
    name: "Understanding (Receptive)",
    shortName: "Understanding",
    defaultWeight: 5,
    isLadder: true,
    description:
      "Receptive language: responding to name, following directions, identifying named objects, understanding questions.",
    color: "#3b82f6",
  },
  {
    id: "social",
    name: "Social Connection",
    shortName: "Social",
    defaultWeight: 15,
    isLadder: false,
    description:
      "Social interest, engagement and reciprocity (NET3 Social Communication scale).",
    color: "#f59e0b",
  },
  {
    id: "cognition",
    name: "Cognition & Attention",
    shortName: "Cognition",
    defaultWeight: 15,
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
      "Practical skills ordered by developmental difficulty (NET3 Practical Living Skills).",
    color: "#10b981",
  },
  {
    id: "mood",
    name: "Mood & Regulation",
    shortName: "Mood",
    defaultWeight: 8,
    isLadder: false,
    description: "Irritability, sadness, energy and emotional recovery (NET3 Mood scale).",
    color: "#ec4899",
  },
  {
    id: "behavior",
    name: "Challenging Behavior",
    shortName: "Behavior",
    defaultWeight: 8,
    isLadder: false,
    description:
      "Aggression, self-injury, elopement, tantrums (NET3 Severe & Challenging Behavior).",
    color: "#ef4444",
  },
  {
    id: "sleep",
    name: "Sleep",
    shortName: "Sleep",
    defaultWeight: 8,
    isLadder: false,
    description:
      "Sleep quality and unusual nighttime events — especially relevant for DEE-SWAS (epileptic activity occurs in sleep).",
    color: "#8b5cf6",
  },
  {
    id: "rrb",
    name: "Repetitive & Sensory",
    shortName: "Repetitive",
    defaultWeight: 5,
    isLadder: false,
    description:
      "Repetitive behaviors, insistence on sameness, sensory sensitivities (NET3 RRB items).",
    color: "#f97316",
  },
  {
    id: "anxiety",
    name: "Anxiety",
    shortName: "Anxiety",
    defaultWeight: 3,
    isLadder: false,
    description: "Observable fear and distress (NET3 Anxiety scale, observable subset).",
    color: "#14b8a6",
  },
  {
    id: "motor",
    name: "Motor Skills",
    shortName: "Motor",
    defaultWeight: 2,
    isLadder: true,
    description: "Gross and fine motor skills (NET3 Motor scale, core items).",
    color: "#84cc16",
  },
  {
    id: "qol",
    name: "Family & Quality of Life",
    shortName: "QoL",
    defaultWeight: 0,
    isLadder: false,
    description:
      "Child and family quality of life (parents only, monthly). Tracked separately — not part of Levi's composite score.",
    color: "#64748b",
  },
];

export const DOMAIN_MAP = Object.fromEntries(DOMAINS.map((d) => [d.id, d]));
