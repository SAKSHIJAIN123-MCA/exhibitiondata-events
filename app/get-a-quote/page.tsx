import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "How ExhibitionData prices exhibitor and attendee lists, with one-time and subscription options.",
};

const NAVY = "text-[#0f1a5c]";

const CHECKLIST = [
  "Quote Based on Your Request",
  "One-Time or Subscription",
  "Contacts Re-Verified Monthly",
  "Custom Exhibitor & Attendee Lists",
  "Delivered in 24-48 Hours",
];

const PLANS = [
  {
    name: "One-time purchase",
    blurb:
      "Great for businesses needing exhibitor or attendee data for a specific event, industry or marketing campaign and don’t want a subscription.",
    cta: "Get custom quote",
    billing: "One-time payment • No recurring fees",
    features: [
      "Custom exhibitor or attendee list",
      "Choose any event, industry or country",
      "Filter by the job titles you need",
      "Verified business emails and phones",
      "Delivered in 24-48 hours",
    ],
  },
  {
    name: "3-month subscription",
    blurb:
      "This is great for short term campaigns, product launches and companies experimenting with new markets.",
    cta: "Start 3-month plan",
    billing: "Billed every 3 months",
    features: [
      "New custom lists every month",
      "Contacts re-verified monthly",
      "Exhibitor and attendee data where available",
      "Excel, CSV or Google Sheet",
    ],
  },
  {
    name: "6-month subscription",
    blurb:
      "Good for sales and marketing teams that are running ongoing outreach campaigns.",
    cta: "Start 6-month plan",
    billing: "Billed every 6 months",
    features: [
      "Monthly list delivery",
      "Wider event and country coverage",
      "Custom list requests included",
      "Contacts re-verified monthly",
    ],
  },
  {
    name: "12-month subscription",
    blurb:
      "Best value for businesses requiring event intelligence and year-round lead generation.",
    cta: "Start annual plan",
    billing: "Billed annually • Save more",
    features: [
      "Monthly lists all year",
      "Exhibitor and attendee data where available",
      "Priority on custom requests",
      "Dedicated account manager",
    ],
  },
];

const FAQS = [
  {
    q: "How is exhibitor and attendee data priced?",
    a: "Every list is priced for your request. Tell us the event, industry, countries and job titles you need, and we send a quote before any research starts.",
  },
  {
    q: "Can I buy a one-time list or do I need a subscription? Either works",
    a: "Either works. Order one list for a specific event, or subscribe and receive new lists every month.",
  },
  {
    q: "Can I get a quote for a specific trade show or industry?",
    a: "Yes. Share the event name or industry along with the countries and job titles you want, and we will confirm what data is available.",
  },
  {
    q: "What is included in each subscription plan?",
    a: "Each plan includes custom lists with contacts re-verified monthly. Longer plans add wider coverage, priority on custom requests and a dedicated account manager.",
  },
  {
    q: "How up to date is your event data?",
    a: "Contacts we already hold are re-verified every month, and checked again before delivery if your project needs it.",
  },
  {
    q: "Is there a minimum order or contract length?",
    a: "A one-time purchase has no recurring fees. Subscriptions are billed every 3 months, every 6 months or annually, depending on the plan you choose.",
  },
  {
    q: "Can I change or upgrade my plan later?",
    a: "Talk to our team about moving to a longer plan. We will confirm the options for your account.",
  },
  {
    q: "Do you offer discounts for larger orders or longer plans?",
    a: "Longer plans give better value. Share your requirements and we will include the best option in your quote.",
  },
  {
    q: "Can I buy exhibitor and attendee data together?",
    a: "Yes. We can quote for exhibitor data, attendee data or both. Attendee data is available only for some events, so we confirm this first.",
  },
  {
    q: "What format is the data delivered in?",
    a: "You receive the data as an Excel file, CSV or Google Sheet within 24-48 hours.",
  },
  {
    q: "Is your pricing suitable for small businesses?",
    a: "Yes. Because each quote is based on your request, you only pay for the data you need.",
  },
  {
    q: "Which plan should I start with?",
    a: "For a single event or campaign, start with a one-time purchase. For ongoing outreach, a subscription is the better fit. Our team can help you choose.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We run outreach for a handful of B2B clients at once, and event-based lists consistently convert better than cold lists. Filtering exhibitor data by industry let us build lists for two clients in the same session.",
    name: "Marcus Whitfield",
    role: "Account Director — Harborview Marketing Partners",
  },
  {
    quote:
      "Part of our deal-sourcing process is tracking which companies are showing up at industry events — it’s an early signal on who’s scaling. This data made that tracking systematic instead of ad hoc.",
    name: "Claire Doyle",
    role: "Investment Research Associate — Fenwick Capital Partners",
  },
  {
    quote:
      "Finding the right channel partners at automotive trade shows used to depend on who we happened to run into on the floor. Attendee data filtered by title let us set up meetings before the event even started.",
    name: "Sofia Alvarez",
    role: "Channel Partnerships Manager — Redline Automotive Technologies",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <span
        className="hidden h-px flex-1 bg-[#0f1a5c]/70 sm:block"
        aria-hidden="true"
      />
      <h2
        className={`text-balance text-center text-2xl font-extrabold uppercase tracking-tight sm:text-4xl ${NAVY}`}
      >
        {children}
      </h2>
      <span
        className="hidden h-px flex-1 bg-[#0f1a5c]/70 sm:block"
        aria-hidden="true"
      />
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-9"
    >
      <path d="M10 6H5.500A2.500 2.500 0 0 0 3 8.500V13a2 2 0 0 0 2 2h2.500c0 1.700-.9 2.700-2.500 3l.3 1.500C8.500 19 10 16.800 10 13V6Zm11 0h-4.500A2.500 2.500 0 0 0 14 8.500V13a2 2 0 0 0 2 2h2.500c0 1.700-.9 2.700-2.500 3l.3 1.500C19.500 19 21 16.800 21 13V6Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.600-6 8-6s8 2 8 6H4Z" />
    </svg>
  );
}

export default function GetAQuotePage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative isolate flex h-56 items-center justify-center overflow-hidden bg-[#0a1445] text-white sm:h-72">
        <Image
          src="/contact.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-[#0a1445]/60"
          aria-hidden="true"
        />
        <h1 className="px-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Pricing
        </h1>
      </section>

      {/* Intro */}
      <section className="bg-white">
        <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <h2
            className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${NAVY}`}
          >
            How We Price Exhibitor and Attendee Lists
          </h2>
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              Every list we build is priced for your request. Tell us the event,
              industry, countries and job titles you need, and we’ll quote for
              exhibitor data, attendee data or both. Order one list for a
              specific event, or subscribe and receive new lists every month.
            </p>
            <p>
              We don’t publish fixed prices because no two requests are the
              same. You get a quote first, and research starts only after you
              approve it. Want to know what you’re paying for? Read how we
              verify and maintain our data.
            </p>
            <div>
              <p className="text-sm text-slate-500">Checklist (5 items):</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        {/* Plans */}

        <Container className="pb-14 sm:pb-20">
          <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">
            {PLANS.map((plan) => (
              <li
                key={plan.name}
                className="flex flex-col rounded-3xl border border-blue-400 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-[0_12px_40px_rgba(37,99,235,0.18)] sm:p-8 lg:p-10 motion-reduce:transition-none"
              >
                <h3
                  className={`text-3xl font-extrabold uppercase tracking-tight sm:text-4xl ${NAVY}`}
                >
                  {plan.name}
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate-600">
                  {plan.blurb}
                </p>
                <div>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-8 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_6px_18px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none"
                  >
                    {plan.cta}
                  </Link>
                </div>
                <p className="mt-5 text-base text-slate-500">{plan.billing}</p>

                <span
                  className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  aria-hidden="true"
                />

                <ul className="mt-6 space-y-4 text-left text-base text-slate-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-600"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Strip image */}
                <div className="mt-auto pt-8">
                  <div className="relative aspect-[4/1] w-full overflow-hidden rounded-3xl">
                    <Image
                      src="/strip.avif"
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 520px, (min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      {/* <section className="bg-blue-50/70">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading>Frequently asked questions</SectionHeading>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl items-start gap-3 md:grid-cols-2">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-lg bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#0f1a5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white transition-transform group-open:rotate-180 motion-reduce:transition-none">
                    <ChevronIcon />
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section> */}

      <Faq />

      {/* Testimonials */}
      {/* <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <SectionHeading>What our customers say</SectionHeading>

          <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {TESTIMONIALS.map((t, i) => (
              <li
                key={t.name}
                className={`relative w-[85%] shrink-0 snap-center rounded-2xl border bg-white p-6 pt-8 sm:w-auto ${
                  i === 0
                    ? "border-blue-300 shadow-[0_12px_40px_rgba(15,26,92,0.14)]"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                <span className="absolute -top-3 left-5 text-blue-600">
                  <QuoteIcon />
                </span>
                <blockquote className="text-sm italic leading-relaxed text-slate-600">
                  {t.quote}
                </blockquote>
                <div className="mt-5 flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0f1a5c]">
                    <UserIcon />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-[#0f1a5c]">{t.name}</p>
                    <p className="text-xs leading-snug text-slate-500">{t.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section> */}

      <Testimonials />
    </>
  );
}
