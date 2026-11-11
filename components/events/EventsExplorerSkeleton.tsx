import { Container } from "@/components/ui/Container";

/**
 * Placeholder shown while the page reads the URL's query params. Mirrors the
 * real layout (filter bar + card grid) so nothing jumps when content arrives.
 */
export function EventsExplorerSkeleton() {
  return (
    <Container
      className="relative z-10 -mt-16 pb-20"
      aria-busy="true"
      aria-label="Loading events"
    >
      <div className="h-[22rem] animate-pulse rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 md:h-60 lg:h-32" />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200"
          />
        ))}
      </div>
    </Container>
  );
}
