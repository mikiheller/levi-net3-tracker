"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DOMAINS, DOMAIN_MAP } from "@/lib/items/domains";
import type { DashboardData } from "@/lib/scoring";

function fmtDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Snap each event to the nearest axis tick so ReferenceLine renders on a category axis. */
function snapEvents(
  events: DashboardData["events"],
  axisValues: string[]
): { id: string; name: string; x: string }[] {
  if (axisValues.length === 0) return [];
  return events.map((e) => {
    const after = axisValues.find((v) => v >= e.startDate);
    return { id: e.id, name: e.name, x: after ?? axisValues[axisValues.length - 1] };
  });
}

function EventLines({
  events,
  axisValues,
}: {
  events: DashboardData["events"];
  axisValues: string[];
}) {
  return (
    <>
      {snapEvents(events, axisValues).map((e) => (
        <ReferenceLine
          key={e.id}
          x={e.x}
          stroke="#dc2626"
          strokeDasharray="4 4"
          label={{
            value: e.name,
            position: "top",
            fill: "#dc2626",
            fontSize: 11,
          }}
        />
      ))}
    </>
  );
}

export default function DashboardClient({ data }: { data: DashboardData }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const hasData = data.totals.responses > 0;

  if (!hasData) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
        <div className="text-4xl">🌱</div>
        <h2 className="mt-3 text-lg font-semibold">No data yet</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-stone-500">
          Once people start checking in, trends for every domain will grow
          here. Intervention markers from the admin page will overlay the
          charts.
        </p>
      </div>
    );
  }

  const compositeData = data.composite
    .filter((p) => p.blended !== null)
    .map((p) => ({ week: p.week, score: p.blended }));

  const snapshotData = data.snapshots.map((s) => ({
    date: s.date,
    Alertness: s.alertness,
    Communication: s.communication,
    Mood: s.mood,
    Regulation: s.regulation,
  }));

  return (
    <div className="space-y-8">
      {/* Composite */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Overall progress</h2>
        <p className="text-sm text-stone-500">
          Weighted blend of all domains (0–100, higher is better), averaged
          across everyone. Red lines mark interventions.
        </p>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <LineChart data={compositeData} margin={{ top: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" />
              <XAxis dataKey="week" tickFormatter={fmtDate} fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} width={32} />
              <Tooltip labelFormatter={(l) => `Week of ${fmtDate(String(l))}`} />
              <EventLines
                events={data.events}
                axisValues={compositeData.map((p) => p.week)}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Daily snapshots */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Daily pulse</h2>
        <p className="text-sm text-stone-500">
          &ldquo;Today vs. typical&rdquo; from every check-in. 0 = a typical
          day; above 0 = better than usual.
        </p>
        <div className="mt-4 h-56">
          <ResponsiveContainer>
            <LineChart data={snapshotData} margin={{ top: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" />
              <XAxis dataKey="date" tickFormatter={fmtDate} fontSize={12} />
              <YAxis domain={[-2, 2]} fontSize={12} width={32} />
              <Tooltip labelFormatter={(l) => fmtDate(String(l))} />
              <ReferenceLine y={0} stroke="#d6d3d1" />
              <EventLines
                events={data.events}
                axisValues={snapshotData.map((p) => p.date)}
              />
              <Line type="monotone" dataKey="Alertness" stroke="#0ea5e9" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="Communication" stroke="#6366f1" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="Mood" stroke="#ec4899" strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="Regulation" stroke="#10b981" strokeWidth={2} dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-stone-500">
          {[
            ["Alertness", "#0ea5e9"],
            ["Communication", "#6366f1"],
            ["Mood", "#ec4899"],
            ["Regulation", "#10b981"],
          ].map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section>
        <h2 className="mb-3 font-semibold">By domain</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {DOMAINS.map((d) => {
            const series = data.domains.find((s) => s.domainId === d.id);
            if (!series) return null;
            const points = series.points
              .filter((p) => p.blended !== null)
              .map((p) => ({ week: p.week, ...p.perRater, blended: p.blended }));
            if (points.length === 0) return null;
            const isOpen = expanded === d.id;
            return (
              <div
                key={d.id}
                className={`rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition ${
                  isOpen ? "sm:col-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setExpanded(isOpen ? null : d.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="font-semibold">{d.name}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-stone-500">
                      {series.current !== null && (
                        <>
                          now {series.current}
                          {series.delta !== null && (
                            <span
                              className={
                                series.delta > 5
                                  ? "text-emerald-600 font-semibold"
                                  : series.delta < -5
                                    ? "text-red-500 font-semibold"
                                    : ""
                              }
                            >
                              {" "}
                              ({series.delta >= 0 ? "+" : ""}
                              {series.delta} vs. baseline)
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">
                    {isOpen ? "collapse" : "by rater →"}
                  </span>
                </button>
                <div className={isOpen ? "mt-3 h-64" : "mt-3 h-28"}>
                  <ResponsiveContainer>
                    <LineChart data={points} margin={{ top: 16, right: 12 }}>
                      {isOpen && (
                        <>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" />
                          <YAxis domain={[0, 100]} fontSize={11} width={30} />
                          <Tooltip
                            labelFormatter={(l) => `Week of ${fmtDate(String(l))}`}
                          />
                          <EventLines
                            events={data.events}
                            axisValues={points.map((p) => p.week)}
                          />
                        </>
                      )}
                      <XAxis
                        dataKey="week"
                        tickFormatter={fmtDate}
                        fontSize={11}
                        hide={!isOpen}
                      />
                      {isOpen &&
                        data.raters.map((r) => (
                          <Line
                            key={r.id}
                            type="monotone"
                            dataKey={r.id}
                            name={r.name}
                            stroke={r.color}
                            strokeWidth={1.5}
                            strokeOpacity={0.65}
                            dot={false}
                            connectNulls
                          />
                        ))}
                      <Line
                        type="monotone"
                        dataKey="blended"
                        name="Everyone"
                        stroke={d.color}
                        strokeWidth={2.5}
                        dot={{ r: 2.5 }}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rater lens */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">How it feels to each person</h2>
        <p className="text-sm text-stone-500">
          Average scores over the last 4 weeks. Systematic gaps between people
          are interesting — they may see different sides of Levi.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-xs text-stone-400">
                <th className="pb-2 pr-3 font-medium">Person</th>
                <th className="pb-2 pr-3 font-medium">Check-ins</th>
                <th className="pb-2 pr-3 font-medium">Overall</th>
                {DOMAINS.filter((d) => d.id !== "qol").map((d) => (
                  <th key={d.id} className="pb-2 pr-3 font-medium">
                    {d.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.raterProfile
                .filter((rp) => rp.checkinCount > 0)
                .map((rp) => {
                  const rater = data.raters.find((r) => r.id === rp.raterId);
                  if (!rater) return null;
                  return (
                    <tr key={rp.raterId} className="border-t border-stone-100">
                      <td className="py-2 pr-3 font-medium">
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: rater.color }}
                          />
                          {rater.name}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-stone-500">{rp.checkinCount}</td>
                      <td className="py-2 pr-3 font-semibold">{rp.overall ?? "—"}</td>
                      {DOMAINS.filter((d) => d.id !== "qol").map((d) => {
                        const v = rp.byDomain[d.id];
                        return (
                          <td key={d.id} className="py-2 pr-3">
                            {v === null ? (
                              <span className="text-stone-300">—</span>
                            ) : (
                              <span
                                className="rounded px-1.5 py-0.5 text-xs font-medium"
                                style={{
                                  backgroundColor: `${DOMAIN_MAP[d.id].color}22`,
                                }}
                              >
                                {v}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      {data.notes.length > 0 && (
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Notes from the team</h2>
          <div className="mt-3 space-y-3">
            {data.notes.map((n, i) => {
              const rater = data.raters.find((r) => r.id === n.raterId);
              return (
                <div key={i} className="flex gap-3">
                  <div
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: rater?.color ?? "#a8a29e" }}
                  >
                    {rater?.name[0] ?? "?"}
                  </div>
                  <div>
                    <div className="text-xs text-stone-400">
                      {rater?.name ?? n.raterId} ·{" "}
                      {new Date(n.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm">{n.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
