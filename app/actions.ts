"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getDb,
  checkins,
  responses,
  raters,
  events,
} from "@/lib/db";
import { getWeights, saveWeights, type Weights } from "@/lib/settings";
import { DOMAIN_MAP } from "@/lib/items/domains";

export interface CheckinPayload {
  raterId: string;
  note: string;
  snapshot: {
    alertness: number | null;
    communication: number | null;
    mood: number | null;
    regulation: number | null;
    aggression: number | null;
  };
  moodFlags: string[];
  moodOther: string;
  answers: { itemId: string; value: number | null; isNa: boolean }[];
}

export async function submitCheckin(payload: CheckinPayload) {
  const db = await getDb();
  const [checkin] = await db
    .insert(checkins)
    .values({
      raterId: payload.raterId,
      note: payload.note.trim() || null,
      snapAlertness: payload.snapshot.alertness,
      snapCommunication: payload.snapshot.communication,
      snapMood: payload.snapshot.mood,
      snapRegulation: payload.snapshot.regulation,
      snapAggression: payload.snapshot.aggression,
      moodFlags: payload.moodFlags.length ? payload.moodFlags.join(", ") : null,
      moodOther: payload.moodOther.trim() || null,
    })
    .returning();

  if (payload.answers.length > 0) {
    await db.insert(responses).values(
      payload.answers.map((a) => ({
        checkinId: checkin.id,
        raterId: payload.raterId,
        itemId: a.itemId,
        value: a.isNa ? null : a.value,
        isNa: a.isNa,
      }))
    );
  }
  revalidatePath("/dashboard");
  return { ok: true };
}

// ── Self-serve onboarding ("I'm new, add me") ──────────────────────────────

const JOIN_ROLES: Record<string, { role: string; roleLabel: string }> = {
  family: { role: "parent", roleLabel: "Family" },
  nanny: { role: "nanny", roleLabel: "Nanny / babysitter" },
  therapist: { role: "professional", roleLabel: "Therapist" },
  school: { role: "professional", roleLabel: "School staff" },
};

const JOIN_COLORS = [
  "#e11d48", "#7c3aed", "#0891b2", "#65a30d", "#d97706",
  "#db2777", "#4f46e5", "#059669", "#b45309", "#0284c7",
];

export async function joinTeam(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const roleKey = String(formData.get("role") ?? "");
  const roleInfo = JOIN_ROLES[roleKey];
  if (!name || !roleInfo) redirect("/join");

  const db = await getDb();
  const existing = await db.select().from(raters);

  // Reuse an existing entry with the same name (probably the same person).
  const match = existing.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );
  if (match) {
    if (!match.active) {
      await db.update(raters).set({ active: true }).where(eq(raters.id, match.id));
    }
    revalidatePath("/");
    redirect(`/checkin/${match.id}`);
  }

  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "rater";
  let id = base;
  for (let n = 2; existing.some((r) => r.id === id); n++) id = `${base}-${n}`;

  await db.insert(raters).values({
    id,
    name,
    role: roleInfo.role,
    roleLabel: roleInfo.roleLabel,
    color: JOIN_COLORS[existing.length % JOIN_COLORS.length],
    sort: Math.max(0, ...existing.map((r) => r.sort)) + 1,
  });
  revalidatePath("/");
  redirect(`/checkin/${id}`);
}

// ── Admin ──────────────────────────────────────────────────────────────────

export async function upsertRater(data: {
  id?: string;
  name: string;
  role: string;
  roleLabel: string;
  color: string;
}) {
  const db = await getDb();
  if (data.id) {
    await db
      .update(raters)
      .set({ name: data.name, role: data.role, roleLabel: data.roleLabel, color: data.color })
      .where(eq(raters.id, data.id));
  } else {
    const id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = await db.select().from(raters);
    await db.insert(raters).values({
      id,
      name: data.name,
      role: data.role,
      roleLabel: data.roleLabel,
      color: data.color,
      sort: existing.length + 1,
    });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function setRaterActive(id: string, active: boolean) {
  const db = await getDb();
  await db.update(raters).set({ active }).where(eq(raters.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertEvent(data: {
  id?: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string | null;
  notes: string;
}) {
  const db = await getDb();
  const values = {
    name: data.name,
    category: data.category,
    startDate: data.startDate,
    endDate: data.endDate || null,
    notes: data.notes.trim() || null,
  };
  if (data.id) {
    await db.update(events).set(values).where(eq(events.id, data.id));
  } else {
    await db.insert(events).values(values);
  }
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

export async function deleteEvent(id: string) {
  const db = await getDb();
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

export async function saveWeightsAction(weights: Weights) {
  // Log weight changes like an intervention, so score shifts caused by
  // re-weighting are visible on the charts and never mistaken for progress.
  const old = await getWeights();
  const changed = Object.entries(weights).filter(
    ([id, w]) => (old[id] ?? 0) !== w
  );
  await saveWeights(weights);
  if (changed.length > 0) {
    const db = await getDb();
    await db.insert(events).values({
      name: "Domain weights changed",
      category: "other",
      startDate: new Date().toISOString().slice(0, 10),
      notes: changed
        .map(
          ([id, w]) =>
            `${DOMAIN_MAP[id]?.shortName ?? id}: ${old[id] ?? 0} → ${w}`
        )
        .join(", "),
    });
  }
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

export async function deleteCheckin(id: string) {
  const db = await getDb();
  await db.delete(responses).where(eq(responses.checkinId, id));
  await db.delete(checkins).where(eq(checkins.id, id));
  revalidatePath("/dashboard");
  revalidatePath("/admin");
}
