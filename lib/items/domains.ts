import type { DomainMeta } from "./types";

// Weights reflect priorities for tracking cognitive recovery in DEE-SWAS:
// language and social connection first, then cognition and independence.
// Editable in the admin portal; these are defaults.
export const DOMAINS: DomainMeta[] = [
  {
    id: "communication",
    name: "Communication & Language",
    shortName: "Language",
    stem: "Over the past week, how often did Levi…",
    defaultWeight: 22,
    isLadder: true,
    description:
      "Custom developmental ladder from intentional vocalizing up to conversation. The highest-priority signal for cognitive change.",
    color: "#6366f1",
  },
  {
    id: "social",
    name: "Social Connection",
    shortName: "Social",
    stem: "Over the past week, how often did Levi…",
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
    stem: "Over the past week, how often did Levi…",
    defaultWeight: 15,
    isLadder: false,
    description:
      "Alertness, processing speed, attention, imitation and memory (from NET3 Executive Functioning + ADHD scales). Very sensitive to DEE-SWAS treatment effects.",
    color: "#0ea5e9",
  },
  {
    id: "dls",
    name: "Daily Living Skills",
    shortName: "Daily living",
    stem: "Right now, how independently can Levi…",
    defaultWeight: 14,
    isLadder: true,
    description:
      "Practical skills ordered by developmental difficulty (NET3 Practical Living Skills).",
    color: "#10b981",
  },
  {
    id: "mood",
    name: "Mood & Regulation",
    shortName: "Mood",
    stem: "Over the past week, how often did Levi seem…",
    defaultWeight: 8,
    isLadder: false,
    description: "Irritability, sadness, energy and emotional recovery (NET3 Mood scale).",
    color: "#ec4899",
  },
  {
    id: "behavior",
    name: "Challenging Behavior",
    shortName: "Behavior",
    stem: "Over the past week, how much of a problem was…",
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
    stem: "Over the past week, how often did this happen?",
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
    stem: "Over the past week, how often did Levi…",
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
    stem: "Over the past week, how often did Levi seem…",
    defaultWeight: 3,
    isLadder: false,
    description: "Observable fear and distress (NET3 Anxiety scale, observable subset).",
    color: "#14b8a6",
  },
  {
    id: "motor",
    name: "Motor Skills",
    shortName: "Motor",
    stem: "Right now, how easy or hard is it for Levi to…",
    defaultWeight: 2,
    isLadder: true,
    description: "Gross and fine motor skills (NET3 Motor scale, core items).",
    color: "#84cc16",
  },
  {
    id: "qol",
    name: "Family & Quality of Life",
    shortName: "QoL",
    stem: "Thinking about the past month…",
    defaultWeight: 0,
    isLadder: false,
    description:
      "Child and family quality of life (parents only, monthly). Tracked separately — not part of Levi's composite score.",
    color: "#64748b",
  },
];

export const DOMAIN_MAP = Object.fromEntries(DOMAINS.map((d) => [d.id, d]));
