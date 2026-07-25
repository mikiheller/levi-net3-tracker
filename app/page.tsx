import Link from "next/link";
import { getDb, raters } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = await getDb();
  const allRaters = (await db.select().from(raters))
    .filter((r) => r.active)
    .sort((a, b) => a.sort - b.sort);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <p className="text-center text-5xl mb-4">☀️</p>
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Levi&apos;s Tracker
        </h1>
        <p className="mt-2 text-center text-stone-500">
          Just finished time with Levi? Tap your name — it takes about a
          minute.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {allRaters.map((r) => (
            <Link
              key={r.id}
              href={`/checkin/${r.id}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: r.color }}
              >
                {r.name[0]}
              </div>
              <div className="text-lg font-semibold">{r.name}</div>
              <div className="text-sm text-stone-500">{r.roleLabel}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline"
          >
            View progress dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
