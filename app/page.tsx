import Link from "next/link";
import { getDb, raters } from "@/lib/db";
import { WOODSIDE_MODE, WOODSIDE_RATER_ID } from "@/lib/woodside";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = await getDb();
  // In school-facing mode, only the shared "Woodside Staff" rater is shown —
  // no other team member's name is visible, per the school's privacy policy.
  const allRaters = (await db.select().from(raters))
    .filter((r) => (WOODSIDE_MODE ? r.id === WOODSIDE_RATER_ID : r.active))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <p className="text-center text-5xl mb-4">☀️</p>
        <h1 className="text-center text-3xl font-bold tracking-tight">
          {WOODSIDE_MODE ? "Woodside LH Tracker" : "Levi's Tracker"}
        </h1>
        <p className="mt-2 text-center text-stone-500">
          {WOODSIDE_MODE
            ? "Just finished time with Levi? Tap below — it takes about a minute."
            : "Just finished time with Levi? Tap your name — it takes about a minute."}
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-2.5">
          {allRaters.map((r) => (
            <Link
              key={r.id}
              href={`/checkin/${r.id}`}
              className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                style={{ backgroundColor: r.color }}
              >
                {r.name[0]}
              </div>
              <div className="truncate text-base font-semibold">{r.name}</div>
            </Link>
          ))}
          {!WOODSIDE_MODE && (
            <Link
              href="/join"
              className="group flex items-center gap-3 rounded-xl border-2 border-dashed border-stone-300 px-4 py-3 transition hover:border-indigo-400 hover:bg-indigo-50/40"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-200 text-base font-bold text-stone-500 transition group-hover:bg-indigo-100 group-hover:text-indigo-600">
                +
              </div>
              <div className="text-base font-semibold text-stone-600 group-hover:text-indigo-700">
                Add me
              </div>
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}
