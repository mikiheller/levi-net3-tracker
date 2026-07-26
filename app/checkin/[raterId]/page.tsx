import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb, raters } from "@/lib/db";
import { buildBatch } from "@/lib/scheduler";
import CheckinForm from "@/components/CheckinForm";

export const dynamic = "force-dynamic";

export default async function CheckinPage({
  params,
}: {
  params: Promise<{ raterId: string }>;
}) {
  const { raterId } = await params;
  const db = await getDb();
  const [rater] = await db.select().from(raters).where(eq(raters.id, raterId));
  if (!rater) notFound();

  const items = await buildBatch(raterId);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white"
            style={{ backgroundColor: rater.color }}
          >
            {rater.name[0]}
          </div>
          <div>
            <div className="font-semibold leading-tight">Hi {rater.name}!</div>
            <div className="text-sm text-stone-500">
              Quick check-in about Levi
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm text-stone-400 hover:text-stone-600"
        >
          Not you?
        </Link>
      </div>

      <CheckinForm
        raterId={rater.id}
        raterName={rater.name}
        items={items}
      />
    </main>
  );
}
