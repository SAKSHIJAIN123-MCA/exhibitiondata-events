import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/home/faq";
import { Testimonials } from "@/components/home/testimonials";
import { Container } from "@/components/ui/Container";
import { industryToParam } from "@/lib/filters";
import { INDUSTRIES } from "@/types/event";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[520px] items-center overflow-hidden text-white sm:min-h-[600px]">
        <Image
          src="/contact.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Light navy overlay: darker behind the text, clear at the bottom */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1445]/60 via-[#0a1445]/45 to-[#0a1445]/20"
          aria-hidden="true"
        />

        <Container className="py-20 text-center sm:py-28">
          <h1 className="mx-auto max-w-5xl text-balance text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your gateway to the world&apos;s trade shows
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-blue-100 sm:text-lg">
            Find international exhibitions across the industries that matter to
            your business, and plan your next appearance with confidence.
          </p>
          <Link
            href="/events"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-9 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          >
            Browse Events
          </Link>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-gradient-to-b from-white to-slate-50">
        <Container className="py-14 sm:py-20">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden h-px flex-1 bg-[#0f1a5c] sm:block" aria-hidden="true" />
            <h2 className="text-balance text-center text-2xl font-extrabold uppercase tracking-tight text-[#0f1a5c] sm:text-4xl">
              Exhibition data by industry
            </h2>
            <span className="hidden h-px flex-1 bg-[#0f1a5c] sm:block" aria-hidden="true" />
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <li key={industry}>
                <Link
                  href={`/events?industry=${industryToParam(industry)}`}
                  className="group flex aspect-square items-center justify-center rounded-3xl bg-white p-4 text-center text-sm font-extrabold uppercase leading-snug text-[#0f1a5c] shadow-[0_10px_40px_rgba(15,26,92,0.10)] transition-all duration-300 hover:rounded-full hover:bg-blue-600 hover:text-white hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] focus-visible:rounded-full focus-visible:bg-blue-600 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:p-8 sm:text-lg motion-reduce:transition-none"
                >
                  <span className="text-balance">{industry}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Faq />
      <Testimonials />
    </>
  );
}