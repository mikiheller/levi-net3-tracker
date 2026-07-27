import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb, raters } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ raterId: string }>;
}) {
  const { raterId } = await params;
  const db = await getDb();
  const [rater] = await db.select().from(raters).where(eq(raters.id, raterId));
  if (!rater) notFound();

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-16">
      <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold">Thank you, {rater.name}!</h2>
        <p className="mt-2 text-stone-500">
          Logged. Every check-in makes the picture of Levi&apos;s progress
          sharper.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="w-full max-w-xs rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-700"
          >
            Done
          </Link>
          <Link
            href={`/checkin/${rater.id}?more=1`}
            className="w-full max-w-xs rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
          >
            Feeling generous? Answer a few more
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-stone-400 hover:text-stone-600"
          >
            See dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
