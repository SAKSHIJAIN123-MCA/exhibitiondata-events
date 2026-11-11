import { EventCard } from "@/components/events/EventCard";
import type { EventSummary } from "@/types/event";

/** Number of cards (first row on desktop) whose images load eagerly. */
const EAGER_IMAGE_COUNT = 3;

/** Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop. */
export function EventGrid({ events }: { events: readonly EventSummary[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <li key={event.id}>
          <EventCard event={event} eagerImage={index < EAGER_IMAGE_COUNT} />
        </li>
      ))}
    </ul>
  );
}
