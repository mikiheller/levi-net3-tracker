"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SCALES, STEM } from "@/lib/items/scales";
import type { Item } from "@/lib/items/types";
import { submitCheckin } from "@/app/actions";

const SNAPSHOT_METRICS = [
  {
    key: "alertness" as const,
    label: "How responsive was he? (noticing people, reacting when you talked to him)",
    low: "Much less than usual",
    high: "Much more than usual",
  },
  {
    key: "communication" as const,
    label: "How well did he communicate? (gestures, AAC, sounds — anything)",
    low: "Much worse than usual",
    high: "Much better than usual",
  },
  {
    key: "mood" as const,
    label: "How was his mood?",
    low: "Much worse than usual",
    high: "Much better than usual",
  },
  {
    key: "regulation" as const,
    label: "How was his behavior? (meltdowns, transitions, stimming)",
    low: "Much worse than usual",
    high: "Much better than usual",
  },
];

const SNAP_LABELS = ["−−", "−", "Typical", "+", "++"];

const MOOD_FLAG_OPTIONS = [
  "Sad",
  "Angry",
  "Agitated",
  "Uncomfortable",
  "Sick",
  "Tired",
  "Other",
];

type Answer = { value: number | null; isNa: boolean };

export default function CheckinForm({
  raterId,
  items,
  mode,
}: {
  raterId: string;
  items: Item[];
  /** "full" = snapshot + questions; "more" = bonus questions only */
  mode: "full" | "more";
}) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<Record<string, number | undefined>>({});
  const [moodFlags, setMoodFlags] = useState<string[]>([]);
  const [moodOther, setMoodOther] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Voice dictation for the note field (recorded here, transcribed by Whisper
  // on the server).
  const [recState, setRecState] = useState<"idle" | "recording" | "transcribing">("idle");
  const [recError, setRecError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);

  async function toggleDictation() {
    if (recState === "recording") {
      recorderRef.current?.stop();
      return;
    }
    if (recState !== "idle") return;
    setRecError(null);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecError("Dictation isn't supported in this browser — please type instead.");
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setRecError("Microphone access was blocked — allow it in your browser settings.");
      return;
    }

    // Safari records mp4/aac; Chrome and Firefox record webm. Whisper accepts both.
    const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
    const recorder = new MediaRecorder(stream, { mimeType: mime });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      setRecState("transcribing");
      try {
        const blob = new Blob(chunks, { type: mime });
        const fd = new FormData();
        fd.append("audio", blob, mime === "audio/webm" ? "note.webm" : "note.mp4");
        const res = await fetch("/api/transcribe", { method: "POST", body: fd });
        const data: { text?: string; error?: string } = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Transcription failed.");
        const text = (data.text ?? "").trim();
        if (text) setNote((n) => (n.trim() ? n.trimEnd() + " " : "") + text);
      } catch (err) {
        setRecError(err instanceof Error ? err.message : "Transcription failed.");
      } finally {
        setRecState("idle");
      }
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecState("recording");
  }

  const showSnapshot = mode === "full";
  const answeredCount =
    Object.keys(answers).length +
    (showSnapshot
      ? SNAPSHOT_METRICS.filter((m) => snapshot[m.key] !== undefined).length
      : 0);
  const totalCount =
    items.length + (showSnapshot ? SNAPSHOT_METRICS.length : 0);
  // Unanswered questions are fine — people can't always judge everything.
  const canSubmit = answeredCount > 0;
  const moodIsWorse = snapshot.mood !== undefined && snapshot.mood < 2;

  function toggleMoodFlag(flag: string) {
    setMoodFlags((f) =>
      f.includes(flag) ? f.filter((x) => x !== flag) : [...f, flag]
    );
  }

  async function handleSubmit() {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    await submitCheckin({
      raterId,
      note,
      snapshot: {
        alertness: snapshot.alertness ?? null,
        communication: snapshot.communication ?? null,
        mood: snapshot.mood ?? null,
        regulation: snapshot.regulation ?? null,
      },
      moodFlags: moodIsWorse ? moodFlags : [],
      moodOther: moodIsWorse && moodFlags.includes("Other") ? moodOther : "",
      answers: items
        .filter((i) => answers[i.id] !== undefined)
        .map((i) => ({
          itemId: i.id,
          value: answers[i.id].value,
          isNa: answers[i.id].isNa,
        })),
    });
    router.replace(`/checkin/${raterId}/thanks`);
  }

  return (
    <div className="space-y-6 pb-28">
      {/* Snapshot */}
      {showSnapshot && (
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
              {m.key === "mood" && moodIsWorse && (
                <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <div className="text-sm font-medium">
                    What seemed off about him?
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {MOOD_FLAG_OPTIONS.map((flag) => (
                      <button
                        key={flag}
                        type="button"
                        onClick={() => toggleMoodFlag(flag)}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                          moodFlags.includes(flag)
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {flag}
                      </button>
                    ))}
                  </div>
                  {moodFlags.includes("Other") && (
                    <input
                      type="text"
                      value={moodOther}
                      onChange={(e) => setMoodOther(e.target.value)}
                      placeholder="What was it? (optional)"
                      className="mt-2 w-full rounded-lg border border-stone-200 bg-white p-2 text-sm outline-none placeholder:text-stone-400 focus:border-indigo-400"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Weekly questions — one flat list, one shared prompt */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">{STEM}</h2>
        <p className="mt-0.5 text-sm text-stone-500">
          {mode === "more"
            ? "Bonus round — answer as many or as few as you like."
            : "Different questions each time. Skip anything you didn't get a chance to observe."}
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
        <p className="mt-0.5 text-sm text-stone-500">
          Type, or press the microphone and talk — it&apos;ll be written down
          for you.
        </p>
        <div className="relative mt-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="New words or sounds, a breakthrough, a rough patch, sleep, anything…"
            rows={3}
            className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-3 pr-12 text-sm outline-none placeholder:text-stone-400 focus:border-indigo-400"
          />
          <button
            type="button"
            onClick={toggleDictation}
            disabled={recState === "transcribing"}
            aria-label={recState === "recording" ? "Stop dictating" : "Dictate a note"}
            title={recState === "recording" ? "Stop dictating" : "Dictate a note"}
            className={`absolute bottom-3 right-2.5 flex h-9 w-9 items-center justify-center rounded-full transition ${
              recState === "recording"
                ? "animate-pulse bg-red-600 text-white"
                : recState === "transcribing"
                  ? "bg-stone-200 text-stone-400"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {recState === "transcribing" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              </svg>
            ) : recState === "recording" ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2.5" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0" />
                <path d="M12 18v3.5" />
              </svg>
            )}
          </button>
        </div>
        {recState === "recording" && (
          <div className="mt-1.5 text-xs font-medium text-red-600">
            Listening… press the square to finish.
          </div>
        )}
        {recState === "transcribing" && (
          <div className="mt-1.5 text-xs text-stone-500">Writing it down…</div>
        )}
        {recError && (
          <div className="mt-1.5 text-xs text-amber-700">{recError}</div>
        )}
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
            disabled={!canSubmit || submitting}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-indigo-500 disabled:opacity-40"
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
