"use client";

import { useState } from "react";
import Link from "next/link";
import { SCALES } from "@/lib/items/scales";
import type { Item } from "@/lib/items/types";
import { submitCheckin } from "@/app/actions";

const SNAPSHOT_METRICS = [
  {
    key: "alertness" as const,
    label: "How receptive was he? (taking things in, responding to people)",
    low: "Much less than usual",
    high: "Much more than usual",
  },
  {
    key: "communication" as const,
    label:
      "How was his expressive communication? (gestures, AAC, sounds — any way he told you things)",
    low: "Much less than usual",
    high: "Much more than usual",
  },
  {
    key: "mood" as const,
    label: "How was his mood?",
    low: "Much worse than usual",
    high: "Much better than usual",
  },
  {
    key: "regulation" as const,
    label: "How regulated was he? (behavior, transitions, stimming)",
    low: "Much harder than usual",
    high: "Much easier than usual",
  },
];

const SNAP_LABELS = ["−−", "−", "Typical", "+", "++"];

type Answer = { value: number | null; isNa: boolean };

export default function CheckinForm({
  raterId,
  raterName,
  items,
}: {
  raterId: string;
  raterName: string;
  items: Item[];
}) {
  const [snapshot, setSnapshot] = useState<Record<string, number | undefined>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const answeredCount =
    Object.keys(answers).length +
    SNAPSHOT_METRICS.filter((m) => snapshot[m.key] !== undefined).length;
  const totalCount = items.length + SNAPSHOT_METRICS.length;
  const complete =
    SNAPSHOT_METRICS.every((m) => snapshot[m.key] !== undefined) &&
    items.every((i) => answers[i.id] !== undefined);

  async function handleSubmit() {
    if (!complete || submitting) return;
    setSubmitting(true);
    await submitCheckin({
      raterId,
      note,
      snapshot: {
        alertness: snapshot.alertness!,
        communication: snapshot.communication!,
        mood: snapshot.mood!,
        regulation: snapshot.regulation!,
      },
      answers: items.map((i) => ({
        itemId: i.id,
        value: answers[i.id].value,
        isNa: answers[i.id].isNa,
      })),
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold">Thank you, {raterName}!</h2>
        <p className="mt-2 text-stone-500">
          Logged. Every check-in makes the picture of Levi&apos;s progress
          sharper.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-700"
          >
            Done
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            See dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28">
      {/* Snapshot */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Today, compared to a typical day</h2>
        <p className="mt-0.5 text-sm text-stone-500">
          Just your gut feel from this session.
        </p>
        <div className="mt-4 space-y-5">
          {SNAPSHOT_METRICS.map((m) => (
            <div key={m.key}>
              <div className="mb-1.5 text-sm font-medium">{m.label}</div>
              <div className="grid grid-cols-5 gap-1.5">
                {SNAP_LABELS.map((label, v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setSnapshot((s) => ({ ...s, [m.key]: v }))
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-medium transition ${
                      snapshot[m.key] === v
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-stone-400">
                <span>{m.low}</span>
                <span>{m.high}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly questions — one flat list, no category headers */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">A few quick questions</h2>
        <p className="mt-0.5 text-sm text-stone-500">
          Different ones each time — the app rotates through everything.
        </p>
        <div className="mt-4 space-y-6">
          {items.map((item) => {
            const scale = SCALES[item.scale];
            const a = answers[item.id];
            return (
              <div key={item.id}>
                <div className="text-[15px] font-medium leading-snug">
                  {item.text}
                </div>
                {item.example && (
                  <div className="mt-0.5 text-xs text-stone-400">
                    {item.example}
                  </div>
                )}
                <div
                  className={`mt-2 grid gap-1.5 ${
                    scale.labels.length <= 4
                      ? "grid-cols-4"
                      : scale.labels.length === 5
                        ? "grid-cols-5"
                        : "grid-cols-3"
                  }`}
                >
                  {scale.labels.map((label, v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() =>
                        setAnswers((s) => ({
                          ...s,
                          [item.id]: { value: v, isNa: false },
                        }))
                      }
                      className={`rounded-lg border px-1 py-2.5 text-xs font-medium leading-tight transition ${
                        a && !a.isNa && a.value === v
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {scale.allowNA && (
                  <button
                    type="button"
                    onClick={() =>
                      setAnswers((s) => ({
                        ...s,
                        [item.id]: { value: null, isNa: true },
                      }))
                    }
                    className={`mt-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                      a?.isNa
                        ? "bg-stone-700 text-white"
                        : "text-stone-400 hover:bg-stone-100"
                    }`}
                  >
                    Can&apos;t say / didn&apos;t observe
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Note */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Anything notable? (optional)</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="New words or sounds, a breakthrough, a rough patch, sleep, anything…"
          rows={3}
          className="mt-3 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none placeholder:text-stone-400 focus:border-indigo-400"
        />
      </section>

      {/* Sticky submit */}
      <div className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white/90 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="text-sm text-stone-500">
            {answeredCount}/{totalCount}
          </div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${(answeredCount / totalCount) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!complete || submitting}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-indigo-500 disabled:opacity-40"
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
