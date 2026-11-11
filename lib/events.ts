import eventsData from "@/data/events.json";
import type { EventSummary, TradeEvent } from "@/types/event";

/**
 * Data-access layer for events.
 *
 * Rules of the road:
 *  - The JSON file is imported in this module ONLY. Nothing else in the app
 *    should touch it, so swapping to a CMS/API later is a one-file change.
 *  - Every function is async, mirroring what a real data source would look
 *    like, so callers never need to change when the source does.
 *  - Functions return copies, so callers can't mutate the shared dataset.
 *  - Dates are ISO (YYYY-MM-DD), so plain string comparison sorts correctly.
 */

// The JSON import types `industry` as `string`; the cast narrows it to our
// union. The shape is checked at test time (see events.test.ts, later phase).
const events = eventsData as TradeEvent[];

/** Soonest-first ordering. ISO date strings sort lexicographically. */
function byStartDate(a: TradeEvent, b: TradeEvent): number {
  return a.startDate.localeCompare(b.startDate);
}

/** All events, ordered by start date (soonest first). */
export async function getAllEvents(): Promise<TradeEvent[]> {
  return events.map((e) => ({ ...e })).sort(byStartDate);
}

/**
 * All events without the long description, soonest first. Use this for list
 * views, especially when the result is passed to a Client Component, so the
 * browser only receives the fields the cards need.
 */
export async function getEventSummaries(): Promise<EventSummary[]> {
  const all = await getAllEvents();
  return all.map((event) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullDescription, ...summary } = event;
    return summary;
  });
}

/** One event by slug, or `undefined` if no event matches. */
export async function getEventBySlug(
  slug: string,
): Promise<TradeEvent | undefined> {
  const event = events.find((e) => e.slug === slug);
  return event ? { ...event } : undefined;
}

/** Every slug. Intended for `generateStaticParams` on /events/[slug]. */
export async function getAllEventSlugs(): Promise<string[]> {
  return events.map((e) => e.slug);
}

/**
 * Events in the same industry as the given event, excluding the event itself.
 * Ordered by how close their start date is to the current event, so the most
 * relevant (nearest in time) come first. Capped at `limit` (default 3).
 *
 * Returns an empty array for an unknown slug.
 */
export async function getRelatedEvents(
  slug: string,
  limit = 3,
): Promise<TradeEvent[]> {
  const current = events.find((e) => e.slug === slug);
  if (!current) return [];

  const currentStart = Date.parse(current.startDate);

  return events
    .filter((e) => e.industry === current.industry && e.slug !== current.slug)
    .sort(
      (a, b) =>
        Math.abs(Date.parse(a.startDate) - currentStart) -
        Math.abs(Date.parse(b.startDate) - currentStart),
    )
    .slice(0, limit)
    .map((e) => ({ ...e }));
}
