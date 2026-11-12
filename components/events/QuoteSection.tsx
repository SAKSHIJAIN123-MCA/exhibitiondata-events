import type { ReactNode } from "react";
import { QUOTE_SECTION_ID } from "@/lib/constants";

interface QuoteSectionProps {
  eventName: string;
  /** The quote form. */
  children: ReactNode;
}

/**
 * Anchor target for every "Get a Quote" button (`id="quote"`) and the card
 * that frames the form.
 *
 * `scroll-mt-24` keeps the section heading from hiding under the sticky
 * header when the page scrolls here. The form is passed in as `children`, so
 * this wrapper stays a Server Component and ships no JavaScript of its own.
 */
export function QuoteSection({ eventName, children }: QuoteSectionProps) {
  return (
    <section
      id={QUOTE_SECTION_ID}
      aria-labelledby="quote-heading"
      className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <h2
        id="quote-heading"
        className="text-2xl font-bold tracking-tight text-slate-900"
      >
        Get a Quote
      </h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Request a quote for the exhibitor and attendee data from {eventName}.
        Tell us what you need and our team will get back to you.
      </p>

      <div className="mt-6 max-w-3xl">{children}</div>
    </section>
  );
}
