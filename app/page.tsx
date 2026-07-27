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
          <Link
            href="/join"
            className="group flex flex-col items-start justify-center rounded-2xl border-2 border-dashed border-stone-300 p-5 transition hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 text-lg font-bold text-stone-500 transition group-hover:bg-indigo-100 group-hover:text-indigo-600">
              +
            </div>
            <div className="text-lg font-semibold text-stone-600 group-hover:text-indigo-700">
              I&apos;m new — add me
            </div>
            <div className="text-sm text-stone-400">Takes 10 seconds</div>
          </Link>
        </div>

      </div>
    </main>
  );
}
