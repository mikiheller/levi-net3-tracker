/**
 * DEV ONLY: fills the local database with ~6 weeks of synthetic check-ins so
 * you can preview the dashboard. Never run against production.
 *
 *   npx tsx scripts/seed-demo.ts        # seed
 *   rm -rf .data                        # wipe local db back to empty
 */
import { getDb, checkins, responses, events } from "../lib/db";
import { ITEMS } from "../lib/items/items";
import { SCALES } from "../lib/items/scales";

const RATERS = ["miki", "jake", "grace", "kalina", "shamim", "giuliane", "beca", "heidi"];
const DAY = 86_400_000;

function rnd(n: number) {
  return Math.floor(Math.random() * n);
}

async function main() {
  if (process.env.DATABASE_URL) {
    console.error("Refusing to run against DATABASE_URL. Dev only.");
    process.exit(1);
  }
  const db = await getDb();
  const start = Date.now() - 42 * DAY;

  await db.insert(events).values({
    name: "Steroids started",
    category: "medication",
    startDate: new Date(start + 14 * DAY).toISOString().slice(0, 10),
  });

  for (let day = 0; day < 42; day++) {
    const t = start + day * DAY;
    // improvement kicks in after the intervention on day 14
    const lift = day < 14 ? 0 : Math.min((day - 14) / 28, 1);
    for (const raterId of RATERS) {
      if (Math.random() > 0.45) continue; // not everyone checks in every day
      const noise = () => rnd(2) - rnd(2);
      const snap = (base: number) =>
        Math.max(0, Math.min(4, base + Math.round(lift * 1.2) + noise()));
      const [checkin] = await db
        .insert(checkins)
        .values({
          raterId,
          createdAt: new Date(t + rnd(12) * 3_600_000),
          note:
            Math.random() < 0.12
              ? "Synthetic demo note — looked more engaged during play."
              : null,
          snapAlertness: snap(2),
          snapCommunication: snap(2),
          snapMood: snap(2),
          snapRegulation: snap(2),
        })
        .returning();

      const picked = [...ITEMS]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      await db.insert(responses).values(
        picked.map((item) => {
          const max = SCALES[item.scale].max;
          const mid = max / 2;
          const dir = item.higherIsBetter ? 1 : -1;
          const v = Math.max(
            0,
            Math.min(
              max,
              Math.round(mid + dir * lift * (max / 2.5) + (rnd(3) - 1))
            )
          );
          return {
            checkinId: checkin.id,
            raterId,
            itemId: item.id,
            value: v,
            isNa: false,
            createdAt: new Date(t + rnd(12) * 3_600_000),
          };
        })
      );
    }
  }
  console.log("Seeded demo data.");
  process.exit(0);
}

main();
