
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { EventDetails } from "@/components/events/EventDetails";
import { EventHeader } from "@/components/events/EventHeader";
import { EventHeroImage } from "@/components/events/EventHeroImage";
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

// Dynamic route params type
interface EventPageProps {
  params: Promise<{ slug: string }>;
}

// --------------------------------------------------
// Generate static event pages
// --------------------------------------------------

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// --------------------------------------------------
// Generate SEO metadata
// --------------------------------------------------

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: event.name,
    description: `${event.shortDescription} ${formatDateRange(
      event.startDate,
      event.endDate
    )}, ${event.city}, ${event.country}.`,

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

// --------------------------------------------------
// Loading fallback
// --------------------------------------------------

function EventPageSkeleton() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="animate-pulse space-y-8">
        <div className="h-4 w-48 rounded bg-slate-200" />

        <div className="h-10 w-3/4 rounded bg-slate-200" />

        <div className="h-64 w-full rounded-2xl bg-slate-200" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
          </div>

          <div className="h-64 rounded-xl bg-slate-200" />
        </div>
      </div>
    </Container>
  );
}

// --------------------------------------------------
// Main page component
// --------------------------------------------------

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<EventPageSkeleton />}>
      <EventPageContent params={params} />
    </Suspense>
  );
}

// --------------------------------------------------
// Event content - URL params are resolved here
// --------------------------------------------------

async function EventPageContent({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  // Show 404 if event does not exist
  if (!event) {
    notFound();
  }

  const related = await getRelatedEvents(event.slug);

  return (
    <Container className="py-8 sm:py-12">

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.name },
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

        {/* About Event */}
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

        {/* Event Details */}
        <div className="lg:sticky lg:top-24">
          <EventDetails event={event} />
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-14">
        <QuoteSection eventName={event.name} />
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
