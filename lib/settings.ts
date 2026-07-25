import { eq } from "drizzle-orm";
import { getDb, settings } from "./db";
import { DOMAINS } from "./items/domains";

export type Weights = Record<string, number>;

export async function getWeights(): Promise<Weights> {
  const db = await getDb();
  const rows = await db.select().from(settings).where(eq(settings.key, "weights"));
  const defaults: Weights = Object.fromEntries(
    DOMAINS.map((d) => [d.id, d.defaultWeight])
  );
  if (rows.length === 0) return defaults;
  return { ...defaults, ...(rows[0].value as Weights) };
}

export async function saveWeights(weights: Weights): Promise<void> {
  const db = await getDb();
  await db
    .insert(settings)
    .values({ key: "weights", value: weights })
    .onConflictDoUpdate({ target: settings.key, set: { value: weights } });
}
