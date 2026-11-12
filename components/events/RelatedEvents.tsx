import { EventGrid } from "@/components/events/EventGrid";
import type { EventSummary, Industry } from "@/types/event";

interface RelatedEventsProps {
  industry: Industry;
  events: readonly EventSummary[];
}

/**
 * Other events in the same industry. Each card links to its own detail page.
 * Renders nothing when there are no related events, so the page never shows
 * an empty heading.
 */
export function RelatedEvents({ industry, events }: RelatedEventsProps) {
  if (events.length === 0) return null;

  return (
    <section aria-labelledby="related-events-heading">
      <h2
        id="related-events-heading"
        className="text-2xl font-bold tracking-tight text-slate-900"
      >
        Related events
      </h2>
      <p className="mt-2 text-slate-600">
        More trade shows in {industry}.
      </p>
      <div className="mt-6">
        {/* Below the fold, so keep these images lazy. */}
        <EventGrid events={events} eagerCount={0} />
      </div>
    </section>
  );
}
