/**
 * Single source of truth for the industries we support.
 * The `Industry` type is derived from this array, so the list used by
 * filters/UI and the type used by the data can never drift apart.
 */
export const INDUSTRIES = [
  "Packaging",
  "Healthcare",
  "Technology",
  "Food & Beverage",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

/**
 * A trade show / exhibition.
 *
 * Named `TradeEvent` (not `Event`) to avoid shadowing the global DOM `Event`
 * type, which would be confusing in files that also handle form/input events.
 */
export interface TradeEvent {
  id: string;
  name: string;
  /** Unique, URL-safe identifier used in /events/[slug]. */
  slug: string;
  /** ISO 8601 date: YYYY-MM-DD */
  startDate: string;
  /** ISO 8601 date: YYYY-MM-DD */
  endDate: string;
  city: string;
  country: string;
  venue: string;
  industry: Industry;
  /** One-line teaser for cards. */
  shortDescription: string;
  /** Longer copy for the detail page. */
  fullDescription: string;
  /** Absolute image URL (host must be allowed in next.config). */
  image: string;
  altText: string;
}

/**
 * Lightweight version of an event for list views. Leaving out the long
 * description keeps the data sent to the browser small.
 */
export type EventSummary = Omit<TradeEvent, "fullDescription">;

/**
 * Filter state for the events listing. This is the single shape shared by the
 * URL, the filter UI and the filtering function.
 *  - `q`        free-text search on the event name ("" = no search)
 *  - `industry` one industry, or null for all
 *  - `month`    1-12 (month the event starts in), or null for all
 */
export interface EventFilters {
  q: string;
  industry: Industry | null;
  month: number | null;
}
