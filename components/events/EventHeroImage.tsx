import Image from "next/image";
import type { TradeEvent } from "@/types/event";

/**
 * Large hero image. It is the biggest visible element when the page opens
 * (the Largest Contentful Paint), so it loads eagerly. `sizes` tells the
 * browser how wide it will actually be, so it downloads the smallest
 * suitable file: full width on phones, capped at the 7xl container on
 * desktop.
 */
export function EventHeroImage({ event }: { event: TradeEvent }) {
  return (
    <figure className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
      <div className="relative aspect-[3/2] sm:aspect-[16/9]">
        <Image
          src={event.image}
          alt={event.altText}
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
