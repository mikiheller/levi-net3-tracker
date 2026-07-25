import { getDb, responses, checkins, raters } from "@/lib/db";
import { ITEM_MAP } from "@/lib/items/items";
import { DOMAIN_MAP } from "@/lib/items/domains";
import { SCALES, toGoodness } from "@/lib/items/scales";

export const dynamic = "force-dynamic";

function csvCell(v: string | number | null): string {
  if (v === null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  const db = await getDb();
  const [allResponses, allCheckins, allRaters] = await Promise.all([
    db.select().from(responses),
    db.select().from(checkins),
    db.select().from(raters),
  ]);
  const raterMap = new Map(allRaters.map((r) => [r.id, r]));

  const header = [
    "timestamp",
    "rater",
    "rater_role",
    "domain",
    "item_id",
    "item_text",
    "raw_value",
    "response_label",
    "is_na",
    "score_0_100",
  ];
  const lines = [header.join(",")];

  for (const r of allResponses.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )) {
    const item = ITEM_MAP[r.itemId];
    if (!item) continue;
    const rater = raterMap.get(r.raterId);
    lines.push(
      [
        csvCell(new Date(r.createdAt).toISOString()),
        csvCell(rater?.name ?? r.raterId),
        csvCell(rater?.roleLabel ?? ""),
        csvCell(DOMAIN_MAP[item.domain].name),
        csvCell(item.id),
        csvCell(item.text),
        csvCell(r.isNa ? null : r.value),
        csvCell(r.isNa ? "N/A" : SCALES[item.scale].labels[r.value ?? -1] ?? ""),
        csvCell(r.isNa ? "yes" : "no"),
        csvCell(
          r.isNa || r.value === null
            ? null
            : toGoodness(item.scale, item.higherIsBetter, r.value)
        ),
      ].join(",")
    );
  }

  // Snapshots as separate rows
  const snapHeader = ["timestamp", "rater", "metric", "value_-2_to_2", "note"];
  lines.push("", snapHeader.join(","));
  for (const c of allCheckins) {
    const rater = raterMap.get(c.raterId);
    const metrics: [string, number | null][] = [
      ["alertness", c.snapAlertness],
      ["communication", c.snapCommunication],
      ["mood", c.snapMood],
      ["regulation", c.snapRegulation],
    ];
    for (const [metric, v] of metrics) {
      if (v === null) continue;
      lines.push(
        [
          csvCell(new Date(c.createdAt).toISOString()),
          csvCell(rater?.name ?? c.raterId),
          csvCell(metric),
          csvCell(v - 2),
          csvCell(c.note),
        ].join(",")
      );
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="levi-tracker-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
