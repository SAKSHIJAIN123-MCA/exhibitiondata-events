import {
  INDUSTRIES,
  type EventFilters,
  type EventSummary,
  type Industry,
} from "@/types/event";

/**
 * Pure filtering logic for the events listing. No React, no Next.js, no
 * browser APIs, so it can be unit tested on its own and reused on the server
 * or in the browser.
 *
 * URL format (what gets shared / refreshed):
 *   /events?q=pack&industry=food-beverage&month=6
 * Defaults are left out of the URL, so no filters = a clean /events.
 */

export const DEFAULT_FILTERS: EventFilters = {
  q: "",
  industry: null,
  month: null,
};

const MAX_QUERY_LENGTH = 100;

/** Raw query params as Next.js provides them to a page. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

// ---------------------------------------------------------------------------
// Industry <-> URL value ("Food & Beverage" <-> "food-beverage")
// ---------------------------------------------------------------------------

export function industryToParam(industry: Industry): string {
  return industry
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function paramToIndustry(value: string): Industry | null {
  const wanted = value.trim().toLowerCase();
  return INDUSTRIES.find((i) => industryToParam(i) === wanted) ?? null;
}

// ---------------------------------------------------------------------------
// URL -> filters
// ---------------------------------------------------------------------------

/** Trims, collapses repeated spaces and caps the length of a search string. */
export function normalizeQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ").slice(0, MAX_QUERY_LENGTH);
}

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * Turns raw, untrusted query params into valid filters. Anything unknown or
 * malformed (`?industry=bogus`, `?month=99`) falls back to "no filter" rather
 * than throwing, because users can type any URL they like.
 */
export function parseFilters(params: RawSearchParams): EventFilters {
  const month = Number(firstValue(params.month));

  return {
    q: normalizeQuery(firstValue(params.q)),
    industry: paramToIndustry(firstValue(params.industry)),
    month: Number.isInteger(month) && month >= 1 && month <= 12 ? month : null,
  };
}

// ---------------------------------------------------------------------------
// filters -> URL
// ---------------------------------------------------------------------------

/** Query string (no leading "?") for the given filters; "" when none are set. */
export function toQueryString(filters: EventFilters): string {
  const params = new URLSearchParams();
  const q = normalizeQuery(filters.q);

  if (q) params.set("q", q);
  if (filters.industry) params.set("industry", industryToParam(filters.industry));
  if (filters.month !== null) params.set("month", String(filters.month));

  return params.toString();
}

export function hasActiveFilters(filters: EventFilters): boolean {
  return (
    normalizeQuery(filters.q) !== "" ||
    filters.industry !== null ||
    filters.month !== null
  );
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/** Lower-cases and strips accents so "dusseldorf" matches "Düsseldorf". */
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Month (1-12) an event starts in, read straight from its ISO date. */
export function getStartMonth(isoDate: string): number {
  return Number(isoDate.slice(5, 7));
}

/**
 * Applies all active filters together (logical AND):
 *  - search: every word typed must appear somewhere in the event name,
 *            so "pack east" finds "PACK EXPO East 2027"
 *  - industry: exact match
 *  - month: the month the event starts in (a 30 Mar - 2 Apr event counts as March)
 *
 * Generic so it works on full events or summaries, and keeps the input order.
 */
export function filterEvents<
  T extends Pick<EventSummary, "name" | "industry" | "startDate">,
>(events: readonly T[], filters: EventFilters): T[] {
  const words = normalizeText(filters.q).split(/\s+/).filter(Boolean);

  return events.filter((event) => {
    if (filters.industry && event.industry !== filters.industry) return false;

    if (filters.month !== null && getStartMonth(event.startDate) !== filters.month) {
      return false;
    }

    if (words.length > 0) {
      const name = normalizeText(event.name);
      if (!words.every((word) => name.includes(word))) return false;
    }

    return true;
  });
}
