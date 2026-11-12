import { GetQuoteButton } from "@/components/events/GetQuoteButton";
import { IndustryBadge } from "@/components/events/IndustryBadge";
import type { TradeEvent } from "@/types/event";

/** Top of the detail page: industry, the page's single <h1>, summary and CTA. */
export function EventHeader({ event }: { event: TradeEvent }) {
  return (
    <header>
      <IndustryBadge industry={event.industry} />
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {event.name}
      </h1>
      <p className="mt-4 max-w-3xl text-pretty text-base text-slate-600 sm:text-lg">
        {event.shortDescription}
      </p>
      <div className="mt-6">
        <GetQuoteButton className="w-full sm:w-auto" />
      </div>
    </header>
  );
}
