import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { EventsExplorerSkeleton } from "@/components/events/EventsExplorerSkeleton";
import { EventsHero } from "@/components/events/EventsHero";
import { getEventSummaries } from "@/lib/events";
import { parseFilters, toQueryString, type RawSearchParams } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse and filter international trade shows and exhibitions by name, industry and month.",
};

interface EventsPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default function EventsPage({ searchParams }: EventsPageProps) {
  return (
    <>
      <EventsHeroSection />
      {/* Reading `searchParams` is request-time work, so it sits inside a
          Suspense boundary. The hero above stays part of the static shell. */}
      <Suspense fallback={<EventsExplorerSkeleton />}>
        <EventsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function EventsHeroSection() {
  const events = await getEventSummaries();

  return (
    <EventsHero
      eventCount={events.length}
      industryCount={new Set(events.map((e) => e.industry)).size}
      countryCount={new Set(events.map((e) => e.country)).size}
    />
  );
}

async function EventsContent({ searchParams }: EventsPageProps) {
  const [params, events] = await Promise.all([
    searchParams,
    getEventSummaries(),
  ]);
  const initialFilters = parseFilters(params);

  return (
    <EventsExplorer
      // New key when the server-side filters change, e.g. when the "Events"
      // nav link is clicked while a filtered URL is open, so state resets.
      key={toQueryString(initialFilters)}
      events={events}
      initialFilters={initialFilters}
    />
  );
}
