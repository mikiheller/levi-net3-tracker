import { desc } from "drizzle-orm";
import { getDb, raters, events, checkins } from "@/lib/db";
import { getWeights } from "@/lib/settings";
import AdminClient from "@/components/AdminClient";
import { notFound } from "next/navigation";
import { WOODSIDE_MODE } from "@/lib/woodside";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Admin manages the whole team, so it stays off the school-facing copy.
  if (WOODSIDE_MODE) notFound();
  const db = await getDb();
  const [allRaters, allEvents, recentCheckins, weights] = await Promise.all([
    db.select().from(raters),
    db.select().from(events),
    db.select().from(checkins).orderBy(desc(checkins.createdAt)).limit(30),
    getWeights(),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
      <p className="text-sm text-stone-500">
        Manage the team, interventions, and domain weights.
      </p>
      <AdminClient
        raters={allRaters.sort((a, b) => a.sort - b.sort)}
        events={allEvents.map((e) => ({
          ...e,
          startDate: String(e.startDate),
          endDate: e.endDate ? String(e.endDate) : null,
        }))}
        checkins={recentCheckins.map((c) => ({
          id: c.id,
          raterId: c.raterId,
          createdAt: new Date(c.createdAt).toISOString(),
          note: c.note,
        }))}
        weights={weights}
      />
    </main>
  );
}

