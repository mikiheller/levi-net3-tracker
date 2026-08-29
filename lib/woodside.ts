// School-facing mode.
//
// When WOODSIDE_MODE=1 the deployment becomes the "Woodside LH Tracker":
// a school-privacy-safe copy of the app that
//   - shows exactly one shared rater, "Woodside Staff",
//   - writes its check-ins into the SAME database as the main app, so
//     school and home data stay unified,
//   - never displays other team members' names or their data,
//   - disables self-serve join, the admin page, and CSV export.
// The main app (no WOODSIDE_MODE env var) is completely unchanged.

export const WOODSIDE_MODE = process.env.WOODSIDE_MODE === "1";
export const WOODSIDE_RATER_ID = "woodside-staff";
export const WOODSIDE_RATER_NAME = "Woodside Staff";
export const APP_TITLE = WOODSIDE_MODE ? "Woodside LH Tracker" : "Levi Tracker";
