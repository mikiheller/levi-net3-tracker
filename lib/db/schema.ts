import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const raters = pgTable("raters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // parent | nanny | babysitter | professional
  roleLabel: text("role_label").notNull(), // shown in the UI, e.g. "BCBA"
  color: text("color").notNull(),
  active: boolean("active").notNull().default(true),
  sort: integer("sort").notNull().default(0),
});

export const checkins = pgTable("checkins", {
  id: uuid("id").primaryKey().defaultRandom(),
  raterId: text("rater_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  note: text("note"),
  // Snapshot of "today vs. typical", 0-4 where 2 = typical
  snapAlertness: integer("snap_alertness"),
  snapCommunication: integer("snap_communication"),
  snapMood: integer("snap_mood"),
  snapRegulation: integer("snap_regulation"),
});

export const responses = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  checkinId: uuid("checkin_id").notNull(),
  raterId: text("rater_id").notNull(),
  itemId: text("item_id").notNull(),
  value: integer("value"), // null when N/A
  isNa: boolean("is_na").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull().default("medication"), // medication | therapy | other
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  notes: text("notes"),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});

export type Rater = typeof raters.$inferSelect;
export type Checkin = typeof checkins.$inferSelect;
export type ResponseRow = typeof responses.$inferSelect;
export type EventRow = typeof events.$inferSelect;
