import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface EventsHeroProps {
  eventCount: number;
  industryCount: number;
  countryCount: number;
}

export function EventsHero({
  eventCount,
  industryCount,
  countryCount,
}: EventsHeroProps) {
  const stats = [
    { value: eventCount, label: "Upcoming events" },
    { value: industryCount, label: "Industries" },
    { value: countryCount, label: "Countries" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Background image */}
      <Image
        src="/contact.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />
      {/* Dark overlay keeps the text readable over the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-slate-950/75"
      />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 -z-10 size-96 rounded-full bg-sky-500/20 blur-3xl"
      />

      {/* Bottom padding leaves room for the filter card to overlap the hero. */}
      <Container className="pb-32 pt-14 sm:pt-20 lg:pb-36 lg:pt-24">
        <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200 ring-1 ring-inset ring-white/15">
          Global exhibition directory
        </p>

        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Global Trade Shows &amp; Exhibitions
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base text-slate-300 sm:text-lg">
          Explore international trade fairs across packaging, healthcare,
          technology and food &amp; beverage. Compare dates, venues and
          industries to find the exhibition that fits your business.
        </p>

        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-2xl font-bold sm:text-3xl">{stat.value}</dd>
              <dt className="mt-1 text-xs text-slate-400 sm:text-sm">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}