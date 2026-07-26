// Core types for the NET3-derived item bank.

export type DomainId =
  | "speech"
  | "aac"
  | "gesture"
  | "receptive"
  | "social"
  | "cognition"
  | "dls"
  | "mood"
  | "behavior"
  | "sleep"
  | "rrb"
  | "anxiety"
  | "motor"
  | "qol";

export type ScaleId =
  | "freq5" // Never .. Very Often (0-4), with N/A
  | "independence4" // Total assistance .. Completely independent (0-3)
  | "difficulty4" // Very easy .. Very difficult (0-3)
  | "sleepFreq5" // Not in the past week .. 6+ times this week (0-4)
  | "problem5" // Not a problem .. Very severe problem (0-4)
  | "agree5" // Strongly disagree .. Strongly agree (0-4)
  | "always5" // Never .. Always (0-4)
  | "change5" // Improved substantially .. Decreased substantially
  | "sleepHours"; // average hours of sleep per night

// Who is in a position to answer an item.
export type ItemContext = "any" | "home" | "parent";

export interface Scale {
  id: ScaleId;
  labels: string[]; // index = raw value
  allowNA: boolean;
  max: number;
}

export interface Item {
  id: string;
  domain: DomainId;
  text: string; // fully self-contained question about Levi
  example?: string;
  scale: ScaleId;
  /** true when a higher raw value indicates something good (a skill / positive state) */
  higherIsBetter: boolean;
  /** rank within a developmental ladder; enables ceiling/skip logic */
  difficulty?: number;
  context: ItemContext;
  /** target days between ratings of this item by the same rater */
  cadenceDays: number;
  /** distinct raters we aim to collect within one cadence window (calibration) */
  minRaters: number;
  /** excluded from the weighted composite (e.g. family QoL) */
  excludeFromComposite?: boolean;
}

export interface DomainMeta {
  id: DomainId;
  name: string;
  shortName: string;
  /** default weight in the composite (all weights sum to 100) */
  defaultWeight: number;
  /** whether this domain uses ladder (ceiling/skip) logic */
  isLadder: boolean;
  description: string;
  color: string; // chart color
}
