"use client";

import { useState, useTransition } from "react";
import { DOMAINS } from "@/lib/items/domains";
import {
  deleteCheckin,
  deleteEvent,
  saveWeightsAction,
  setRaterActive,
  upsertEvent,
  upsertRater,
} from "@/app/actions";

interface RaterRow {
  id: string;
  name: string;
  role: string;
  roleLabel: string;
  color: string;
  active: boolean;
  sort: number;
}
interface EventItem {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string | null;
  notes: string | null;
}
interface CheckinRow {
  id: string;
  raterId: string;
  createdAt: string;
  note: string | null;
}

const ROLES = [
  { value: "parent", label: "Parent" },
  { value: "nanny", label: "Nanny" },
  { value: "babysitter", label: "Babysitter" },
  { value: "professional", label: "Therapist / teacher / professional" },
];

const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#f97316", "#14b8a6", "#84cc16", "#ef4444"];

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AdminClient({
  raters,
  events,
  checkins,
  weights: initialWeights,
}: {
  raters: RaterRow[];
  events: EventItem[];
  checkins: CheckinRow[];
  weights: Record<string, number>;
}) {
  const [, startTransition] = useTransition();
  const [weights, setWeights] = useState(initialWeights);
  const [weightsSaved, setWeightsSaved] = useState(false);

  // new rater form
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("professional");
  const [newRoleLabel, setNewRoleLabel] = useState("");

  // new event form
  const [evName, setEvName] = useState("");
  const [evCategory, setEvCategory] = useState("medication");
  const [evStart, setEvStart] = useState(new Date().toISOString().slice(0, 10));
  const [evNotes, setEvNotes] = useState("");

  const raterName = (id: string) => raters.find((r) => r.id === id)?.name ?? id;

  return (
    <div className="mt-6 space-y-6">
      <Card
        title="Team"
        subtitle="Inactive people disappear from the home screen but their data is kept."
      >
        <div className="space-y-2">
          {raters.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: r.color }}
                >
                  {r.name[0]}
                </span>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-stone-500">{r.roleLabel}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => startTransition(() => setRaterActive(r.id, !r.active))}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  r.active
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {r.active ? "Active" : "Inactive"}
              </button>
            </div>
          ))}
        </div>
        <form
          className="mt-4 flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newName.trim()) return;
            startTransition(() =>
              upsertRater({
                name: newName.trim(),
                role: newRole,
                roleLabel:
                  newRoleLabel.trim() ||
                  ROLES.find((x) => x.value === newRole)?.label ||
                  newRole,
                color: COLORS[raters.length % COLORS.length],
              }).then(() => {
                setNewName("");
                setNewRoleLabel("");
              })
            );
          }}
        >
          <div className="flex-1 min-w-32">
            <label className="text-xs font-medium text-stone-500">Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
              placeholder="e.g. Ms. Rivera"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="mt-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">
              Label (shown under name)
            </label>
            <input
              value={newRoleLabel}
              onChange={(e) => setNewRoleLabel(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
              placeholder="e.g. School aide"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
          >
            Add
          </button>
        </form>
      </Card>

      <Card
        title="Interventions & events"
        subtitle="These appear as red markers on every chart. Log med changes, therapy changes, illnesses, EEGs — anything that could explain a shift."
      >
        <div className="space-y-2">
          {events
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium">
                    {e.name}{" "}
                    <span className="ml-1 rounded bg-stone-200 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-stone-500">
                      {e.category}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500">
                    {e.startDate}
                    {e.endDate ? ` → ${e.endDate}` : " → ongoing"}
                    {e.notes ? ` · ${e.notes}` : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!e.endDate && (
                    <button
                      type="button"
                      onClick={() =>
                        startTransition(() =>
                          upsertEvent({
                            id: e.id,
                            name: e.name,
                            category: e.category,
                            startDate: e.startDate,
                            endDate: new Date().toISOString().slice(0, 10),
                            notes: e.notes ?? "",
                          })
                        )
                      }
                      className="rounded-lg bg-stone-200 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-300"
                    >
                      End today
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => startTransition(() => deleteEvent(e.id))}
                    className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <form
          className="mt-4 flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!evName.trim()) return;
            startTransition(() =>
              upsertEvent({
                name: evName.trim(),
                category: evCategory,
                startDate: evStart,
                endDate: null,
                notes: evNotes,
              }).then(() => {
                setEvName("");
                setEvNotes("");
              })
            );
          }}
        >
          <div className="flex-1 min-w-32">
            <label className="text-xs font-medium text-stone-500">Name</label>
            <input
              value={evName}
              onChange={(e) => setEvName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
              placeholder="e.g. Started clobazam"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">Type</label>
            <select
              value={evCategory}
              onChange={(e) => setEvCategory(e.target.value)}
              className="mt-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"
            >
              <option value="medication">Medication</option>
              <option value="therapy">Therapy</option>
              <option value="medical">Medical (EEG, illness…)</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">Start date</label>
            <input
              type="date"
              value={evStart}
              onChange={(e) => setEvStart(e.target.value)}
              className="mt-1 rounded-lg border border-stone-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1 min-w-40">
            <label className="text-xs font-medium text-stone-500">Notes</label>
            <input
              value={evNotes}
              onChange={(e) => setEvNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
              placeholder="dose, context…"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
          >
            Add
          </button>
        </form>
      </Card>

      <Card
        title="Domain weights"
        subtitle="How much each domain counts in the composite score AND how often its questions come up. QoL is tracked separately (weight 0)."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {DOMAINS.map((d) => (
            <div key={d.id} className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="w-40 truncate text-sm">{d.name}</span>
              <input
                type="range"
                min={0}
                max={30}
                value={weights[d.id] ?? 0}
                onChange={(e) => {
                  setWeights((w) => ({ ...w, [d.id]: Number(e.target.value) }));
                  setWeightsSaved(false);
                }}
                className="flex-1 accent-indigo-600"
              />
              <span className="w-7 text-right text-sm font-semibold">
                {weights[d.id] ?? 0}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            startTransition(() =>
              saveWeightsAction(weights).then(() => setWeightsSaved(true))
            )
          }
          className="mt-4 rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
        >
          {weightsSaved ? "Saved ✓" : "Save weights"}
        </button>
      </Card>

      <Card title="Export" subtitle="Every rating as a spreadsheet, for doctors or your own analysis.">
        <a
          href="/api/export"
          className="inline-block rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
        >
          Download CSV
        </a>
      </Card>

      <Card
        title="Recent check-ins"
        subtitle="Delete one if someone submitted by mistake."
      >
        <div className="space-y-1.5">
          {checkins.length === 0 && (
            <p className="text-sm text-stone-400">Nothing yet.</p>
          )}
          {checkins.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-lg border border-stone-100 px-3 py-1.5 text-sm"
            >
              <span>
                <span className="font-medium">{raterName(c.raterId)}</span>{" "}
                <span className="text-stone-400">
                  {new Date(c.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                {c.note && <span className="text-stone-500"> · {c.note.slice(0, 60)}</span>}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Delete this check-in and its ratings?"))
                    startTransition(() => deleteCheckin(c.id));
                }}
                className="text-xs font-semibold text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
