import { gte } from "drizzle-orm";
import { getDb, responses, raters as ratersTable, type Rater } from "./db";
import { ITEMS } from "./items/items";
import { DOMAINS, DOMAIN_MAP } from "./items/domains";
import { toGoodness } from "./items/scales";
import type { Item } from "./items/types";
import { getWeights } from "./settings";

const DAY = 86_400_000;
/** How far above the demonstrated ceiling we still ask (acts as the probe). */
const LADDER_BUFFER = 3;
const BATCH_SIZE = 5;
/** Max questions from a single domain per check-in, for variety. */
const PER_DOMAIN_CAP = 2;

function canRate(item: Item, rater: Rater): boolean {
  if (item.context === "any") return true;
  return ["parent", "nanny", "babysitter"].includes(rater.role);
}

/**
 * Pick the next ~5 items for a rater as one flat list:
 *  - only items the rater can meaningfully answer,
 *  - skip ladder items far above Levi's demonstrated ceiling,
 *  - prioritize by how overdue the item is for this rater and domain weight,
 *  - boost items other raters answered recently (calibration overlap),
 *  - cap items per domain so no area monopolizes a check-in.
 */
export async function buildBatch(raterId: string): Promise<Item[]> {
  const db = await getDb();
  const now = Date.now();
  const since = new Date(now - 120 * DAY);

  const [allRaters, recent] = await Promise.all([
    db.select().from(ratersTable),
    db.select().from(responses).where(gte(responses.createdAt, since)),
  ]);
  const rater = allRaters.find((r) => r.id === raterId);
  if (!rater) return [];

  const weights = await getWeights();
  const meanWeight =
    DOMAINS.reduce((s, d) => s + (weights[d.id] ?? d.defaultWeight), 0) /
    DOMAINS.length;

  // Latest response per (item, rater) and per item overall.
  const lastByItemRater = new Map<string, number>();
  const latestValueByItemRater = new Map<string, { value: number | null; isNa: boolean; at: number }>();
  for (const r of recent) {
    const t = new Date(r.createdAt).getTime();
    const key = `${r.itemId}|${r.raterId}`;
    if ((lastByItemRater.get(key) ?? 0) < t) {
      lastByItemRater.set(key, t);
      latestValueByItemRater.set(key, { value: r.value, isNa: r.isNa, at: t });
    }
  }

  // Ladder ceilings from consensus over the last 60 days.
  const ceilings = new Map<string, number>();
  for (const d of DOMAINS.filter((d) => d.isLadder)) {
    let ceiling = 0;
    let hasAnyData = false;
    for (const item of ITEMS.filter((i) => i.domain === d.id && i.difficulty)) {
      const vals: number[] = [];
      for (const r of allRaters) {
        const rec = latestValueByItemRater.get(`${item.id}|${r.id}`);
        if (rec && !rec.isNa && rec.value !== null && now - rec.at < 60 * DAY) {
          vals.push(toGoodness(item.scale, item.higherIsBetter, rec.value));
        }
      }
      if (vals.length > 0) {
        hasAnyData = true;
        const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
        if (mean > 0 && item.difficulty! > ceiling) ceiling = item.difficulty!;
      }
    }
    ceilings.set(d.id, hasAnyData ? ceiling : Number.POSITIVE_INFINITY);
  }

  // Score every eligible item.
  const scored: { item: Item; score: number }[] = [];
  for (const item of ITEMS) {
    if (!canRate(item, rater)) continue;

    if (item.difficulty && DOMAIN_MAP[item.domain].isLadder) {
      const ceiling = ceilings.get(item.domain) ?? Number.POSITIVE_INFINITY;
      if (item.difficulty > ceiling + LADDER_BUFFER) continue;
    }

    const last = lastByItemRater.get(`${item.id}|${rater.id}`);
    const daysSince = last ? (now - last) / DAY : item.cadenceDays * 2;
    const urgency = daysSince / item.cadenceDays;
    if (urgency < 0.75) continue; // answered too recently by this rater

    // Calibration: others answered within the window but not enough raters yet.
    const windowStart = now - item.cadenceDays * DAY;
    let othersInWindow = 0;
    for (const r of allRaters) {
      if (r.id === rater.id) continue;
      const t = lastByItemRater.get(`${item.id}|${r.id}`);
      if (t && t >= windowStart) othersInWindow++;
    }
    const calibrationBonus =
      othersInWindow > 0 && othersInWindow < item.minRaters ? 0.6 : 0;

    // Never answered by anyone: baseline coverage matters.
    const everAnswered = allRaters.some((r) =>
      lastByItemRater.has(`${item.id}|${r.id}`)
    );
    const baselineBonus = everAnswered ? 0 : 0.3;

    const weight = weights[item.domain] ?? DOMAIN_MAP[item.domain].defaultWeight;
    const domainFactor = weight / meanWeight;

    const score =
      Math.min(urgency, 3) * (0.5 + domainFactor) +
      calibrationBonus +
      baselineBonus +
      Math.random() * 0.15;
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score);

  // Take the top 5 with a per-domain cap so one area never monopolizes.
  const picked: Item[] = [];
  const perDomain = new Map<string, number>();
  for (const c of scored) {
    if (picked.length >= BATCH_SIZE) break;
    const count = perDomain.get(c.item.domain) ?? 0;
    if (count >= PER_DOMAIN_CAP) continue;
    picked.push(c.item);
    perDomain.set(c.item.domain, count + 1);
  }

  // Order: same-domain items adjacent (no headers shown), ladders easiest-first.
  const domainRank = new Map(DOMAINS.map((d, i) => [d.id, i]));
  picked.sort((a, b) => {
    const dr = (domainRank.get(a.domain) ?? 99) - (domainRank.get(b.domain) ?? 99);
    if (dr !== 0) return dr;
    return (a.difficulty ?? 999) - (b.difficulty ?? 999);
  });
  return picked;
}
