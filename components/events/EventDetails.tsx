import type { ReactNode } from "react";
import { GetQuoteButton } from "@/components/events/GetQuoteButton";
import { IndustryBadge } from "@/components/events/IndustryBadge";
import { formatLongDate } from "@/lib/format";
import type { TradeEvent } from "@/types/event";

function DetailRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-4 lg:flex-col lg:gap-0.5">
      <dt className="text-sm text-slate-500">{term}</dt>
      <dd className="text-sm font-medium text-slate-900 sm:text-right lg:text-left">
        {children}
      </dd>
    </div>
  );
}

/**
 * Key facts as a description list (<dl>), the semantic element for
 * label/value pairs. Dates use <time> so machines can read them too.
 */
export function EventDetails({ event }: { event: TradeEvent }) {
  return (
    <section
      aria-labelledby="event-details-heading"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
    >
      <h2
        id="event-details-heading"
        className="text-lg font-semibold text-slate-900"
      >
        Event details
      </h2>

      <dl className="mt-4 divide-y divide-slate-100">
        <DetailRow term="Start date">
          <time dateTime={event.startDate}>{formatLongDate(event.startDate)}</time>
        </DetailRow>
        <DetailRow term="End date">
          <time dateTime={event.endDate}>{formatLongDate(event.endDate)}</time>
        </DetailRow>
        <DetailRow term="Venue">{event.venue}</DetailRow>
        <DetailRow term="City">{event.city}</DetailRow>
        <DetailRow term="Country">{event.country}</DetailRow>
        <DetailRow term="Industry">
          <IndustryBadge industry={event.industry} />
        </DetailRow>
      </dl>

      <GetQuoteButton className="mt-6 w-full" />
    </section>
  );
}
