import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { industryToParam } from "@/lib/filters";
import { INDUSTRIES } from "@/types/event";

export default function HomePage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your gateway to the world&apos;s trade shows
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            Find international exhibitions across the industries that matter to
            your business, and plan your next appearance with confidence.
          </p>
          <Link
            href="/events"
            className={buttonStyles({ size: "lg", className: "mt-8" })}
          >
            Browse Events
            <ArrowRightIcon className="size-5" />
          </Link>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Browse by industry
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <li key={industry}>
              <Link
                href={`/events?industry=${industryToParam(industry)}`}
                className="block rounded-2xl bg-white p-6 text-lg font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 motion-reduce:transition-none"
              >
                {industry}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
