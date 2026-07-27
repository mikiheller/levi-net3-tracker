import type { Scale, ScaleId } from "./types";

// Shared question stems, shown above each item. Item texts are fragments that
// continue the stem (QoL statements and the sleep-hours item have no stem).
export const SCALE_STEMS: Partial<Record<ScaleId, string>> = {
  freq5: "This past week, how often did he\u2026",
  independence4: "How independently does he\u2026",
  difficulty4: "How easy or hard is it for him to\u2026",
  sleepFreq5: "This past week, how many nights did he\u2026",
  problem5: "This past week, how much of a problem was\u2026",
};

export const SCALES: Record<ScaleId, Scale> = {
  freq5: {
    id: "freq5",
    labels: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
    allowNA: true,
    max: 4,
  },
  independence4: {
    id: "independence4",
    labels: [
      "Can't do it yet",
      "Needs a lot of help",
      "Needs a little help",
      "Fully independent",
    ],
    allowNA: true,
    max: 3,
  },
  difficulty4: {
    id: "difficulty4",
    labels: ["Very easy", "Somewhat easy", "Somewhat hard", "Very hard"],
    allowNA: true,
    max: 3,
  },
  sleepFreq5: {
    id: "sleepFreq5",
    labels: [
      "Not this week",
      "Once",
      "2-3 times",
      "4-5 times",
      "6-7 times",
    ],
    allowNA: true,
    max: 4,
  },
  problem5: {
    id: "problem5",
    labels: [
      "Not a problem",
      "Mild",
      "Moderate",
      "Severe",
      "Very severe",
    ],
    allowNA: false,
    max: 4,
  },
  agree5: {
    id: "agree5",
    labels: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
    allowNA: false,
    max: 4,
  },
  always5: {
    id: "always5",
    labels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    allowNA: false,
    max: 4,
  },
  change5: {
    id: "change5",
    labels: [
      "Got much worse",
      "Got a bit worse",
      "Same",
      "Improved a bit",
      "Improved a lot",
    ],
    allowNA: false,
    max: 4,
  },
  sleepHours: {
    id: "sleepHours",
    labels: [
      "< 5 hours",
      "5-6 hours",
      "7-8 hours",
      "9-10 hours",
      "11-12 hours",
      "13+ hours",
    ],
    allowNA: true,
    max: 5,
  },
};

/**
 * Normalize a raw response into a 0-100 "goodness" score where higher is
 * always better. Handles reverse-scoring per NET3 conventions.
 */
export function toGoodness(
  scaleId: ScaleId,
  higherIsBetter: boolean,
  value: number
): number {
  if (scaleId === "sleepHours") {
    // Per NET scoring: 9-10h ideal for a child; both extremes are bad.
    const badness = [4, 3, 1, 0, 1.5, 3][value] ?? 0; // 0-4 scale of badness
    return Math.round((1 - badness / 4) * 100);
  }
  const max = SCALES[scaleId].max;
  const frac = value / max;
  return Math.round((higherIsBetter ? frac : 1 - frac) * 100);
}
