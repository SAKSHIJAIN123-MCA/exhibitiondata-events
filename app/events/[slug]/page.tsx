import type { Metadata } from "next";
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

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Event not found" };

  const dateRange = formatDateRange(event.startDate, event.endDate);

  return {
    title: event.name,
    description: `${event.shortDescription} ${dateRange}, ${event.city}, ${event.country}.`,
    openGraph: {
      title: event.name,
      description: event.shortDescription,
      images: [{ url: event.image, alt: event.altText }],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const related = await getRelatedEvents(event.slug);
  const dateRange = formatDateRange(event.startDate, event.endDate);

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.name },
        ]}
      />

      <div className="mt-6">
        <EventHeader event={event} />
      </div>

      <div className="mt-8">
        <EventHeroImage event={event} />
      </div>

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

      <div className="mt-14">
        <QuoteSection eventName={event.name}>
          <QuoteForm
            event={{ id: event.id, slug: event.slug, name: event.name }}
            eventDetails={`${dateRange} · ${event.city}, ${event.country}`}
          />
        </QuoteSection>
      </div>

      <div className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14">
        <RelatedEvents industry={event.industry} events={related} />
      </div>
    </Container>
  );
}