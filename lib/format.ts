import { MONTH_NAMES } from "@/lib/constants";

/**
 * Formats an ISO date range for display, e.g.
 *   same month   "6–9 Jan 2027"
 *   across months "28 Feb – 2 Mar 2027"
 *   across years  "29 Dec 2027 – 2 Jan 2028"
 *   single day    "6 Jan 2027"
 *
 * Dates are parsed from the string by hand instead of through `new Date()`,
 * so the result never shifts with the server's or visitor's time zone and
 * server and client always render identical text (no hydration mismatches).
 */
export function formatDateRange(startISO: string, endISO: string): string {
  const start = parseISO(startISO);
  const end = parseISO(endISO);

  if (startISO === endISO) {
    return `${start.day} ${start.month} ${start.year}`;
  }
  if (start.year !== end.year) {
    return `${start.day} ${start.month} ${start.year} – ${end.day} ${end.month} ${end.year}`;
  }
  if (start.month !== end.month) {
    return `${start.day} ${start.month} – ${end.day} ${end.month} ${start.year}`;
  }
  return `${start.day}–${end.day} ${start.month} ${start.year}`;
}

function parseISO(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return {
    year,
    day,
    month: MONTH_NAMES[month - 1].slice(0, 3),
  };
}
