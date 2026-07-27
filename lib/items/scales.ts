import type { Scale, ScaleId } from "./types";

// The single shared question stem, shown once above the batch and before each
// item. Item texts are fragments that continue it.
export const STEM = "This past week, how often did he\u2026";

export const SCALES: Record<ScaleId, Scale> = {
  freq5: {
    id: "freq5",
    labels: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
    allowNA: true,
    max: 4,
  },
};

/**
 * Normalize a raw response into a 0-100 "goodness" score where higher is
 * always better. Handles reverse-scoring (e.g. repetitive behaviors).
 */
export function toGoodness(
  scaleId: ScaleId,
  higherIsBetter: boolean,
  value: number
): number {
  const max = SCALES[scaleId].max;
  const frac = value / max;
  return Math.round((higherIsBetter ? frac : 1 - frac) * 100);
}
