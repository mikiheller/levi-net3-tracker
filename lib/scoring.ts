import { getDb, responses, checkins, raters as ratersTable, events } from "./db";
import { ITEM_MAP } from "./items/items";
import { DOMAINS } from "./items/domains";
import { toGoodness } from "./items/scales";
import { getWeights } from "./settings";
import { WOODSIDE_MODE, WOODSIDE_RATER_ID } from "./woodside";

const DAY = 86_400_000;

export interface WeekPoint {
  week: string; // ISO date of the Monday
  blended: number | null;
  perRater: Record<string, number | null>;
  n: number;
}

export interface DomainSeries {
  domainId: string;
  points: WeekPoint[];
  baseline: number | null; // mean of first 3 weeks with data
  current: number | null; // mean of last 14 days
  delta: number | null;
}

export interface SnapshotPoint {
  date: string;
  alertness: number | null;
  communication: number | null;
  mood: number | null;
  regulation: number | null;
  n: number;
}

export interface DashboardData {
  domains: DomainSeries[];
  composite: WeekPoint[];
  snapshots: SnapshotPoint[];
  raterProfile: {
    raterId: string;
    overall: number | null;
    byDomain: Record<string, number | null>;
    checkinCount: number;
  }[];
  notes: { raterId: string; note: string; createdAt: string }[];
  events: { id: string; name: string; category: string; startDate: string; endDate: string | null; notes: string | null }[];
  raters: { id: string; name: string; roleLabel: string; color: string; active: boolean }[];
  totals: { responses: number; checkins: number; firstDate: string | null };
  weights: Record<string, number>;
}

function mondayOf(t: number): string {
  const d = new Date(t);
  const day = (d.getUTCDay() + 6) % 7;
  const monday = new Date(t - day * DAY);
  return monday.toISOString().slice(0, 10);
}

const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;

export async function getDashboardData(): Promise<DashboardData> {
  const db = await getDb();
  const [rawResponses, rawCheckins, rawRaters, rawEvents, weights] =
    await Promise.all([
      db.select().from(responses),
      db.select().from(checkins),
      db.select().from(ratersTable),
      db.select().from(events),
      getWeights(),
    ]);

  // School-facing mode: show only what Woodside staff collected. Other
  // team members' names, scores, and notes never reach this deployment,
  // and family-logged intervention markers (medications, therapies) are
  // hidden too.
  const allResponses = WOODSIDE_MODE
    ? rawResponses.filter((r) => r.raterId === WOODSIDE_RATER_ID)
    : rawResponses;
  const allCheckins = WOODSIDE_MODE
    ? rawCheckins.filter((c) => c.raterId === WOODSIDE_RATER_ID)
    : rawCheckins;
  const allRaters = WOODSIDE_MODE
    ? rawRaters.filter((r) => r.id === WOODSIDE_RATER_ID)
    : rawRaters;
  const allEvents = WOODSIDE_MODE ? [] : rawEvents;

  const now = Date.now();

  // goodness rows: {domain, raterId, week, t, g}
  const rows = allResponses
    .filter((r) => !r.isNa && r.value !== null && ITEM_MAP[r.itemId])
    .map((r) => {
      const item = ITEM_MAP[r.itemId];
      const t = new Date(r.createdAt).getTime();
      return {
        domain: item.domain,
        raterId: r.raterId,
        t,
        week: mondayOf(t),
        g: toGoodness(item.scale, item.higherIsBetter, r.value!),
      };
    });

  const weeks = [...new Set(rows.map((r) => r.week))].sort();

  const domainSeries: DomainSeries[] = DOMAINS.map((d) => {
    const dRows = rows.filter((r) => r.domain === d.id);
    const points: WeekPoint[] = weeks.map((w) => {
      const wRows = dRows.filter((r) => r.week === w);
      const perRater: Record<string, number | null> = {};
      const raterMeans: number[] = [];
      for (const rater of allRaters) {
        const m = mean(wRows.filter((r) => r.raterId === rater.id).map((r) => r.g));
        perRater[rater.id] = m === null ? null : Math.round(m);
        if (m !== null) raterMeans.push(m);
      }
      const blended = mean(raterMeans);
      return {
        week: w,
        blended: blended === null ? null : Math.round(blended),
        perRater,
        n: wRows.length,
      };
    });

    const withData = points.filter((p) => p.blended !== null);
    const baseline = mean(withData.slice(0, 3).map((p) => p.blended!) );
    const current = mean(
      dRows.filter((r) => now - r.t < 14 * DAY).map((r) => r.g)
    );
    return {
      domainId: d.id,
      points,
      baseline: baseline === null ? null : Math.round(baseline),
      current: current === null ? null : Math.round(current),
      delta:
        baseline === null || current === null
          ? null
          : Math.round(current - baseline),
    };
  });

  // Composite: weighted mean across domains per week.
  const composite: WeekPoint[] = weeks.map((w) => {
    let num = 0;
    let den = 0;
    const perRater: Record<string, number | null> = {};
    for (const ds of domainSeries) {
      const p = ds.points.find((pt) => pt.week === w);
      if (p && p.blended !== null) {
        const wt = weights[ds.domainId] ?? 0;
        num += p.blended * wt;
        den += wt;
      }
    }
    return {
      week: w,
      blended: den > 0 ? Math.round(num / den) : null,
      perRater,
      n: 0,
    };
  });

  // Snapshot daily series.
  const byDate = new Map<string, (typeof allCheckins)[number][]>();
  for (const c of allCheckins) {
    const date = new Date(c.createdAt).toISOString().slice(0, 10);
    const list = byDate.get(date) ?? [];
    list.push(c);
    byDate.set(date, list);
  }
  const snapshots: SnapshotPoint[] = [...byDate.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, cs]) => {
      const f = (k: "snapAlertness" | "snapCommunication" | "snapMood" | "snapRegulation") => {
        const vals = cs.map((c) => c[k]).filter((v): v is number => v !== null);
        const m = mean(vals);
        // 0-4 with 2=typical → -2..+2
        return m === null ? null : Math.round((m - 2) * 100) / 100;
      };
      return {
        date,
        alertness: f("snapAlertness"),
        communication: f("snapCommunication"),
        mood: f("snapMood"),
        regulation: f("snapRegulation"),
        n: cs.length,
      };
    });

  // Rater calibration profile: last 28 days.
  const raterProfile = allRaters.map((rater) => {
    const rRows = rows.filter((r) => r.raterId === rater.id && now - r.t < 28 * DAY);
    const byDomain: Record<string, number | null> = {};
    for (const d of DOMAINS) {
      const m = mean(rRows.filter((r) => r.domain === d.id).map((r) => r.g));
      byDomain[d.id] = m === null ? null : Math.round(m);
    }
    const overall = mean(rRows.map((r) => r.g));
    return {
      raterId: rater.id,
      overall: overall === null ? null : Math.round(overall),
      byDomain,
      checkinCount: allCheckins.filter(
        (c) => c.raterId === rater.id && now - new Date(c.createdAt).getTime() < 28 * DAY
      ).length,
    };
  });

  const notes = allCheckins
    .filter((c) => c.note && c.note.trim())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 50)
    .map((c) => ({
      raterId: c.raterId,
      note: c.note!,
      createdAt: new Date(c.createdAt).toISOString(),
    }));

  const firstT = rows.length ? Math.min(...rows.map((r) => r.t)) : null;

  return {
    domains: domainSeries,
    composite,
    snapshots,
    raterProfile,
    notes,
    events: allEvents.map((e) => ({
      id: e.id,
      name: e.name,
      category: e.category,
      startDate: String(e.startDate),
      endDate: e.endDate ? String(e.endDate) : null,
      notes: e.notes,
    })),
    raters: allRaters.map((r) => ({
      id: r.id,
      name: r.name,
      roleLabel: r.roleLabel,
      color: r.color,
      active: r.active,
    })),
    totals: {
      responses: allResponses.length,
      checkins: allCheckins.length,
      firstDate: firstT ? new Date(firstT).toISOString().slice(0, 10) : null,
    },
    weights,
  };
}

