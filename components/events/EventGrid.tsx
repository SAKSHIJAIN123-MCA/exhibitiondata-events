import { EventCard } from "@/components/events/EventCard";
import type { EventSummary } from "@/types/event";

interface EventGridProps {
  events: readonly EventSummary[];
  /**
   * How many cards (from the first) load their image immediately. Defaults to
   * the first desktop row. Use 0 when the grid sits below the fold, such as
   * "Related events", so those images stay lazy.
   */
  eagerCount?: number;
}

/** Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop. */
export function EventGrid({ events, eagerCount = 3 }: EventGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <li key={event.id}>
          <EventCard event={event} eagerImage={index < eagerCount} />
        </li>
      ))}
    </ul>
  );
}
