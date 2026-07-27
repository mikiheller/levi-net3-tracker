// Core types for the NET3-derived item bank.

export type DomainId =
  | "speech"
  | "aac"
  | "gesture"
  | "receptive"
  | "social"
  | "cognition"
  | "dls"
  | "rrb"
  | "motor";

// Every question uses the same stem and scale: "This past week, how often
// did he…" answered Never .. Very often.
export type ScaleId = "freq5";

// Who is in a position to answer an item.
export type ItemContext = "any" | "home";

export interface Scale {
  id: ScaleId;
  labels: string[]; // index = raw value
  allowNA: boolean;
  max: number;
}

export interface Item {
  id: string;
  domain: DomainId;
  text: string; // fragment continuing the shared stem
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
