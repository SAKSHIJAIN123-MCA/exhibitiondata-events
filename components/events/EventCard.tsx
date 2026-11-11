import Image from "next/image";
import Link from "next/link";
import { IndustryBadge } from "@/components/events/IndustryBadge";
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
} from "@/components/ui/icons";
import { formatDateRange } from "@/lib/format";
import type { EventSummary } from "@/types/event";

interface EventCardProps {
  event: EventSummary;
  /**
   * Load the image immediately instead of lazily. Use for cards that are
   * visible without scrolling, so the first row doesn't pop in late.
   */
  eagerImage?: boolean;
}

export function EventCard({ event, eagerImage = false }: EventCardProps) {
  const { name, slug, image, altText, industry, startDate, endDate } = event;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading={eagerImage ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <IndustryBadge
          industry={industry}
          className="absolute left-3 top-3 shadow-sm"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-slate-900">
          {name}
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <CalendarIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span>{formatDateRange(startDate, endDate)}</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span>
              {event.city}, {event.country}
            </span>
          </li>
        </ul>

        <p className="mt-3 line-clamp-2 text-sm text-slate-500">
          {event.shortDescription}
        </p>

        <div className="mt-auto pt-5">
          {/* The ::after layer stretches this link over the whole card, so the
              entire card is clickable while keeping a single tab stop. */}
          <Link
            href={`/events/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 after:absolute after:inset-0 hover:text-indigo-700 focus-visible:outline-none"
          >
            View Details
            <span className="sr-only"> for {name}</span>
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </article>
  );
}
