"use client";

import { useEffect, useMemo, useState } from "react";
import { EventFilters } from "@/components/events/EventFilters";
import { EventGrid } from "@/components/events/EventGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  DEFAULT_FILTERS,
  filterEvents,
  hasActiveFilters,
  toQueryString,
} from "@/lib/filters";
import type { EventFilters as Filters, EventSummary } from "@/types/event";

/** How long to wait after the last change before updating the address bar. */
const URL_SYNC_DELAY_MS = 250;

interface EventsExplorerProps {
  events: EventSummary[];
  /** Filters parsed from the URL on the server (so refresh / shared links work). */
  initialFilters: Filters;
}

/**
 * Interactive part of the listing page: holds the filter state, applies it to
 * the events, and mirrors it into the URL.
 *
 *  - Filtering runs in the browser on every change, so results update
 *    instantly while typing (no server round-trip, no loading flicker).
 *  - The server renders the first view from the URL's query params, so a
 *    refresh or a shared link shows the same filtered results immediately.
 *  - The URL is updated with `history.replaceState`: shareable, but it doesn't
 *    fill the Back button with one entry per keystroke.
 */
export function EventsExplorer({ events, initialFilters }: EventsExplorerProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const visibleEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const query = toQueryString(filters);
      const next = `${window.location.pathname}${query ? `?${query}` : ""}`;
      const current = `${window.location.pathname}${window.location.search}`;

      if (next !== current) window.history.replaceState(null, "", next);
    }, URL_SYNC_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [filters]);

  const clearFilters = () => setFilters(DEFAULT_FILTERS);
  const isFiltered = hasActiveFilters(filters);

  return (
    // Pulled up over the bottom of the hero (which reserves matching space).
    <Container className="relative z-10 -mt-16 pb-20">
      <EventFilters
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
      />

      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          {isFiltered ? "Search results" : "All events"}
        </h2>
        <p role="status" className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {visibleEvents.length}
          </span>{" "}
          of {events.length} events
        </p>
      </div>

      <div className="mt-6">
        {visibleEvents.length > 0 ? (
          <EventGrid events={visibleEvents} />
        ) : (
          <EmptyState
            title="No events found"
            description="We couldn't find any events matching your search and filters. Try a different keyword, or clear the filters to see every event."
            action={<Button onClick={clearFilters}>Clear Filters</Button>}
          />
        )}
      </div>
    </Container>
  );
}
