
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { EventDetails } from "@/components/events/EventDetails";
import { EventHeader } from "@/components/events/EventHeader";
import { EventHeroImage } from "@/components/events/EventHeroImage";
import { QuoteForm } from "@/components/events/QuoteForm";
import { QuoteSection } from "@/components/events/QuoteSection";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

import { formatDateRange } from "@/lib/format";
import {
  getAllEventSlugs,
  getEventBySlug,
  getRelatedEvents,
} from "@/lib/events";

// ------------------------------------
// Types
// ------------------------------------

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ------------------------------------
// Generate Static Params
// ------------------------------------

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// ------------------------------------
// SEO Metadata
// ------------------------------------

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  const dateRange = formatDateRange(
    event.startDate,
    event.endDate
  );

  return {
    title: event.name,
    description: `${event.shortDescription} ${dateRange}, ${event.city}, ${event.country}.`,

    openGraph: {
      title: event.name,
      description: event.shortDescription,
      images: [
        {
          url: event.image,
          alt: event.altText,
        },
      ],
    },
  };
}

// ------------------------------------
// Loading Fallback
// ------------------------------------

function EventPageFallback() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="animate-pulse">
        <div className="h-4 w-48 rounded bg-slate-200" />

        <div className="mt-8 h-12 max-w-xl rounded bg-slate-200" />

        <div className="mt-8 aspect-[16/9] w-full rounded-xl bg-slate-200" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <div className="h-8 w-64 rounded bg-slate-200" />
            <div className="mt-5 h-32 rounded bg-slate-200" />
          </div>

          <div className="h-64 rounded-xl bg-slate-200" />
        </div>
      </div>
    </Container>
  );
}

// ------------------------------------
// Async Event Content
// ------------------------------------

async function EventPageContent({
  params,
}: EventPageProps) {
  // URL params are accessed inside Suspense
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const related = await getRelatedEvents(event.slug);

  const dateRange = formatDateRange(
    event.startDate,
    event.endDate
  );

  return (
    <Container className="py-8 sm:py-12">

      {/* Breadcrumb Navigation */}

      <Breadcrumbs
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Events",
            href: "/events",
          },
          {
            label: event.name,
          },
        ]}
      />

      {/* Event Header */}

      <div className="mt-6">
        <EventHeader event={event} />
      </div>

      {/* Event Hero Image */}

      <div className="mt-8">
        <EventHeroImage event={event} />
      </div>

      {/* Event Description and Details */}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">

        <section aria-labelledby="about-heading">

          <h2
            id="about-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            About this event
          </h2>

          <p className="mt-4 max-w-prose text-base leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed">
            {event.fullDescription}
          </p>

        </section>

        <div className="lg:sticky lg:top-24">
          <EventDetails event={event} />
        </div>

      </div>

      {/* Quote Form Section */}

      <div className="mt-14">
        <QuoteSection eventName={event.name}>

          <QuoteForm
            event={{
              id: event.id,
              slug: event.slug,
              name: event.name,
            }}
            eventDetails={`${dateRange} · ${event.city}, ${event.country}`}
          />

        </QuoteSection>
      </div>

      {/* Related Events */}

      <div className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14">

        <RelatedEvents
          industry={event.industry}
          events={related}
        />

      </div>

    </Container>
  );
}

// ------------------------------------
// Main Page Component
// ------------------------------------

export default function EventPage({
  params,
}: EventPageProps) {

  return (
    <Suspense fallback={<EventPageFallback />}>
      <EventPageContent params={params} />
    </Suspense>
  );
}
