import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { eq, sql } from "drizzle-orm";
import * as schema from "./schema";
import { WOODSIDE_MODE, WOODSIDE_RATER_ID, WOODSIDE_RATER_NAME } from "../woodside";

// Production: Postgres via DATABASE_URL (Neon on Vercel).
// Local dev: embedded PGlite stored in .data/ — zero setup.

type Db = ReturnType<typeof drizzlePg<typeof schema>>;

declare global {
  var __leviDb: { db: Db; ready: Promise<void> } | undefined;
}

const DDL = `
CREATE TABLE IF NOT EXISTS raters (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  role_label text NOT NULL,
  color text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rater_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  note text,
  snap_alertness integer,
  snap_communication integer,
  snap_mood integer,
  snap_regulation integer,
  snap_aggression integer,
  mood_flags text,
  mood_other text
);
CREATE TABLE IF NOT EXISTS responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id uuid NOT NULL,
  rater_id text NOT NULL,
  item_id text NOT NULL,
  value integer,
  is_na boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'medication',
  start_date date NOT NULL,
  end_date date,
  notes text
);
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL
);
ALTER TABLE checkins ADD COLUMN IF NOT EXISTS snap_aggression integer;
CREATE INDEX IF NOT EXISTS responses_item_idx ON responses (item_id, created_at);
CREATE INDEX IF NOT EXISTS responses_rater_idx ON responses (rater_id, created_at);
`;

const SEED_RATERS: (typeof schema.raters.$inferInsert)[] = [
  { id: "miki", name: "Miki", role: "parent", roleLabel: "Mom", color: "#6366f1", sort: 1 },
  { id: "jake", name: "Jake", role: "parent", roleLabel: "Dad", color: "#0ea5e9", sort: 2 },
  { id: "grace", name: "Grace", role: "professional", roleLabel: "BCBA", color: "#10b981", sort: 3 },
  { id: "kalina", name: "Kalina", role: "professional", roleLabel: "OT", color: "#f59e0b", sort: 4 },
  { id: "shamim", name: "Shamim", role: "professional", roleLabel: "Speech therapist", color: "#ec4899", sort: 5 },
  { id: "giuliane", name: "Giuliane", role: "nanny", roleLabel: "Nanny", color: "#8b5cf6", sort: 6 },
  { id: "beca", name: "Beca", role: "nanny", roleLabel: "Nanny", color: "#f97316", sort: 7 },
  { id: "heidi", name: "Heidi", role: "babysitter", roleLabel: "Babysitter", color: "#14b8a6", sort: 8 },
  { id: "ana", name: "Ana", role: "nanny", roleLabel: "Nanny", color: "#e11d48", sort: 9 },
];

async function init(db: Db) {
  for (const stmt of DDL.split(";")) {
    const trimmed = stmt.trim();
    if (trimmed) await db.execute(sql.raw(trimmed));
  }
  const existing = await db.select().from(schema.raters);
  if (existing.length === 0) {
    await db.insert(schema.raters).values(SEED_RATERS);
  }
  // School-facing deployments share this database. Make sure the single
  // shared "Woodside Staff" rater exists. It stays inactive so it never
  // appears on the main app's home screen; the school app lists it directly.
  if (WOODSIDE_MODE) {
    const ws = await db
      .select()
      .from(schema.raters)
      .where(eq(schema.raters.id, WOODSIDE_RATER_ID));
    if (ws.length === 0) {
      await db.insert(schema.raters).values({
        id: WOODSIDE_RATER_ID,
        name: WOODSIDE_RATER_NAME,
        role: "professional",
        roleLabel: "School staff",
        color: "#0e7490",
        active: false,
        sort: 999,
      });
    }
  }
  const eventRows = await db.select().from(schema.events);
  if (eventRows.length === 0) {
    await db.insert(schema.events).values({
      name: "Steroids",
      category: "medication",
      startDate: new Date().toISOString().slice(0, 10),
      notes: "Started before tracking began — edit the date in Admin.",
    });
  }
}

function create(): { db: Db; ready: Promise<void> } {
  let db: Db;
  if (process.env.DATABASE_URL) {
    db = drizzlePg(process.env.DATABASE_URL, { schema });
  } else {
    // Lazy import keeps pglite out of the serverless bundle in production.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PGlite } = require("@electric-sql/pglite") as typeof import("@electric-sql/pglite");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("node:fs") as typeof import("node:fs");
    fs.mkdirSync(".data/pglite", { recursive: true });
    const client = new PGlite(".data/pglite");
    db = drizzlePglite(client, { schema }) as unknown as Db;
  }
  return { db, ready: init(db) };
}

export async function getDb(): Promise<Db> {
  if (!globalThis.__leviDb) globalThis.__leviDb = create();
  const handle = globalThis.__leviDb;
  try {
    await handle.ready;
  } catch (err) {
    // Don't cache a failed init (e.g. transient connection issue).
    if (globalThis.__leviDb === handle) globalThis.__leviDb = undefined;
    throw err;
  }
  return handle.db;
}

export * from "./schema";

