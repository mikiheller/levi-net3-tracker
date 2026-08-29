import Link from "next/link";
import { joinTeam } from "@/app/actions";
import { notFound } from "next/navigation";
import { WOODSIDE_MODE } from "@/lib/woodside";

export const dynamic = "force-dynamic";

export default function JoinPage() {
  // School-facing mode has a single shared rater; self-serve join is off.
  if (WOODSIDE_MODE) notFound();
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Welcome to Levi&apos;s team!
        </h1>
        <p className="mt-2 text-center text-stone-500">
          Two quick things and you&apos;re in.
        </p>

        <form
          action={joinTeam}
          className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Your first name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={40}
              placeholder="e.g. Sofia"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none placeholder:text-stone-400 focus:border-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
              How do you know Levi?
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none focus:border-indigo-400"
            >
              <option value="" disabled>
                Pick one…
              </option>
              <option value="family">Family</option>
              <option value="nanny">Nanny / babysitter</option>
              <option value="therapist">Therapist (BCBA, OT, speech…)</option>
              <option value="school">School staff</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Add me &amp; start my first check-in
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-stone-400 hover:text-stone-600">
            ← Back
          </Link>
        </div>
      </div>
    </main>
  );
}

