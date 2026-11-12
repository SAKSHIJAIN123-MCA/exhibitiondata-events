import type { ReactNode } from "react";
import { QUOTE_SECTION_ID } from "@/lib/constants";

interface QuoteSectionProps {
  eventName: string;
  /** The quote form. A placeholder is shown until the form is built. */
  children?: ReactNode;
}

/**
 * Anchor target for every "Get a Quote" button (`id="quote"`).
 *
 * `scroll-mt-24` keeps the section heading from hiding under the sticky
 * header when the page scrolls here. The form itself will be passed in as
 * `children` in the quote-form phase, so this wrapper won't need to change.
 */
export function QuoteSection({ eventName, children }: QuoteSectionProps) {
  return (
    <section
      id={QUOTE_SECTION_ID}
      aria-labelledby="quote-heading"
      className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <h2
        id="quote-heading"
        className="text-2xl font-bold tracking-tight text-slate-900"
      >
        Get a Quote
      </h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Interested in exhibiting at or attending {eventName}? Tell us about your
        requirements and we&apos;ll get back to you with a tailored quote.
      </p>

      <div className="mt-6">
        {children ?? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            The quote request form will appear here.
          </p>
        )}
      </div>
    </section>
  );
}
