import Link from "next/link";
import { getDashboardData } from "@/lib/scoring";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Levi&apos;s Progress
          </h1>
          <p className="text-sm text-stone-500">
            {data.totals.checkins} check-ins · {data.totals.responses} ratings
            {data.totals.firstDate ? ` · since ${data.totals.firstDate}` : ""}
          </p>
        </div>
        <Link
          href="/"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
        >
          + New check-in
        </Link>
      </div>
      <DashboardClient data={data} />
    </main>
  );
}
