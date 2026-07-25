# Levi Tracker

A web app for tracking Levi's development across communication, cognition,
daily living skills, and more — built on the NET3 scales (Frazier et al.) plus
a custom Communication & Language ladder, designed for a whole care team to
contribute one-minute check-ins.

## How it works

- **Home page** — everyone on the team taps their name after a session with
  Levi. No accounts, no passwords.
- **Check-in (~1 minute)** — a 4-question "today vs. typical" snapshot plus
  ~5 NET3 questions chosen by a scheduler that:
  - rotates through every domain on a weekly-ish cadence per person,
  - deliberately overlaps raters on the same items within the same window
    (so scores are calibrated across people),
  - skips questions far above Levi's demonstrated skill ceiling, with
    built-in probes so breakthroughs still get caught.
- **Dashboard** (`/dashboard`) — weighted composite trend, per-domain charts
  with per-rater overlays, a daily pulse chart, intervention markers, a
  rater-comparison table, and the team's notes.
- **Admin** (`/admin`, unlisted) — manage team members, log interventions
  (meds, therapies, EEGs), tune domain weights, export all data as CSV, and
  delete mistaken check-ins.

## Tech

- Next.js (App Router) + Tailwind + Recharts
- Postgres via `DATABASE_URL` in production (Neon on Vercel)
- Embedded PGlite in `.data/` for local dev — zero setup
- The question bank lives in code: `lib/items/`

## Development

```bash
npm install
npm run dev
```

Optional: seed six weeks of fake data to preview the dashboard, and wipe it:

```bash
npx tsx scripts/seed-demo.ts
rm -rf .data
```

## Deployment

Deployed on Vercel. Requires a `DATABASE_URL` environment variable pointing
at a Postgres database (tables are created automatically on first request).

## Credits

NET survey scales © Thomas W. Frazier et al., freely available for use
(https://osf.io/cguzs/). This app adapts a subset of items for repeated
micro-administration; it is a home progress-tracking tool, not a clinical
instrument.
