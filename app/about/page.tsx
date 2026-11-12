import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GrowthTimeline } from "@/components/ui/GrowthTimeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ExhibitionData, a provider of accurate exhibitor and attendee data for trade shows worldwide.",
};

const NAVY = "text-[#0f1a5c]";

const MILESTONES = [
  {
    year: "2017",
    title: "Building the Research Foundation",
    text: "We started by studying how international trade shows publish exhibitor information and by setting up the research methods we still use to build every list.",
  },
  {
    year: "2019",
    title: "Expanding International Event Coverage",
    text: "We added more international events and began building custom lists around each client’s industry, country and job-title needs.",
  },
  {
    year: "2021",
    title: "Raising Our Data Quality Standards",
    text: "We tightened our verification steps so contacts are checked before delivery and re-checked every month.",
  },
  {
    year: "2023",
    title: "Growing Our Worldwide Coverage",
    text: "Coverage widened across more countries and industries, and our research team grew to handle more client projects at the same pace.",
  },
  {
    year: "2026",
    title: "What We Are Building Next",
    text: "We keep investing in better research tools and wider event coverage, so clients get accurate contacts for more shows, faster.",
  },
];

const STEPS = [
  {
    title: "Share your requirements",
    text: "Tell us the event, industry, countries and job titles you need, and whether you want exhibitor data, attendee data or both.",
  },
  {
    title: "Requirement analysis",
    text: "Our researchers check which sources cover your event or audience, and whether attendee data exists for that show.",
  },
  {
    title: "Quote and approval",
    text: "We send an accurate quote, estimated delivery time and project scope. No research starts until you approve it.",
  },
  {
    title: "Research and verification",
    text: "We collect and verify company name, contact, job title, business email, phone, website, industry and country.",
  },
  {
    title: "Delivery",
    text: "You receive the data as an Excel file, CSV or Google Sheet within 24-48 hours of approval.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="flex items-center gap-4 sm:gap-6">
      <span
        className="hidden h-px flex-1 origin-right bg-[#0f1a5c]/70 sm:block"
        aria-hidden="true"
      />
      <h2
        className={`text-balance text-center text-2xl font-extrabold uppercase tracking-tight sm:text-4xl ${NAVY}`}
      >
        {children}
      </h2>
      <span
        className="hidden h-px flex-1 origin-left bg-[#0f1a5c]/70 sm:block"
        aria-hidden="true"
      />
    </Reveal>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="size-6"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative isolate flex h-56 items-center justify-center overflow-hidden bg-[#0a1445] text-white sm:h-72">
        <Image
          src="/contact.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 animate-[about-zoom_14s_ease-out_forwards] object-cover motion-reduce:animate-none"
        />
        <div
          className="absolute inset-0 -z-10 bg-[#0a1445]/60"
          aria-hidden="true"
        />
        <Reveal as="div" variant="up" duration={900} delay={150}>
          <h1 className="px-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            About Us
          </h1>
        </Reveal>
      </section>

      {/* Intro */}
      <section className="bg-white">
        <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <Reveal as="div" variant="left">
            <h2
              className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${NAVY}`}
            >
              Trade Show and Exhibition Data Since 2017
            </h2>
          </Reveal>

          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <Reveal as="p" delay={0} className={`font-bold ${NAVY}`}>
              Providing accurate exhibitor and attendee data to help companies
              reach the right decision makers at events worldwide.
            </Reveal>
            <Reveal as="p" delay={80}>
              We are specialists in verified lists of exhibitors and attendees
              for trade shows, exhibitions and conferences around the world.
            </Reveal>
            <Reveal as="p" delay={160}>
              ExhibitionData started in 2017 with one goal: make it easier for
              B2B teams to reach the right people at events. Today our research
              team in Indore, India builds custom exhibition data for a wide
              range of events and industries, covering 35+ countries and 20+
              industries.
            </Reveal>
            <Reveal as="p">
              Most of our clients sell to exhibitors. They include booth
              builders, freight forwarders, AV and lighting rental firms,
              promotional product suppliers, staffing agencies and hotels. We
              also work with B2B sales teams who want meetings with attendees,
              event marketers deciding which shows to attend, and agencies
              building lists for their own clients.
            </Reveal>
            <Reveal as="p">
              Every list is built for the request in front of us. Our
              researchers use our own tools and verified sources to collect
              company name, contact name, job title, business email, phone
              number, website, industry and country. Contacts we already hold
              are re-verified every month, and checked again before delivery if
              your project needs it.
            </Reveal>
            <Reveal as="p">
              You receive the data as an Excel file, CSV or Google Sheet within
              24-48 hours. Our database now holds 2M+ verified contacts, and it
              grows with every new event we research.
            </Reveal>
            <Reveal as="p" className="text-sm text-slate-500">
              ExhibitionData is an independent data provider and is not
              affiliated with or endorsed by the event organizers.
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission + vision */}
      <section className="bg-blue-50/70">
        <Container className="py-14 sm:py-20">
          <SectionHeading>
            Our mission: accurate event data for B2B outreach
          </SectionHeading>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal
              as="article"
              variant="left"
              className="rounded-3xl bg-white p-7 shadow-[0_10px_40px_rgba(15,26,92,0.10)] ring-1 ring-blue-100 sm:p-9"
            >
              <h3 className={`text-xl font-extrabold ${NAVY}`}>
                Mission statement
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                To provide accurate exhibitor and attendee data that helps
                companies reach the right decision makers at events worldwide.
              </p>
            </Reveal>
            <Reveal
              as="article"
              variant="right"
              delay={150}
              className="rounded-3xl bg-gradient-to-br from-[#0a1445] to-blue-600 p-7 text-white shadow-[0_10px_40px_rgba(15,26,92,0.25)] sm:p-9"
            >
              <h3 className="text-xl font-extrabold">Vision statement</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
                To be the event data provider B2B teams trust first when they
                need exhibitor contacts, attendee contacts or a custom list for
                an upcoming show.
              </p>
            </Reveal>
          </div>

          {/* Growth timeline */}
          <div className="mt-16 sm:mt-24">
            <SectionHeading>Our growth journey since 2017</SectionHeading>
            <Reveal
              as="p"
              delay={120}
              className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-500"
            >
              How ExhibitionData has grown since 2017, and what each stage
              changed in the way we build event data.
            </Reveal>

            <GrowthTimeline milestones={MILESTONES} />
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-14">
            <Reveal as="div" variant="left">
              <h2
                className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${NAVY}`}
              >
                How We Build Your Event Data List
              </h2>
            </Reveal>
            <Reveal
              as="p"
              variant="right"
              delay={120}
              className="text-sm text-slate-500 sm:text-base"
            >
              Every list follows the same five steps, from your first message to
              delivery.
            </Reveal>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 120}
                className="group relative rounded-2xl bg-indigo-50/60 p-6 pt-8 text-center shadow-[0_10px_30px_rgba(15,26,92,0.08)] hover:shadow-[0_16px_40px_rgba(15,26,92,0.16)]"
              >
                <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                  Step {i + 1}
                </span>
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0a1445] to-blue-600 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <TargetIcon />
                </span>
                <h3
                  className={`mt-4 text-base font-extrabold uppercase leading-snug ${NAVY}`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-[#0a1445] text-white">
        {/* Image: mobile par upar full width, lg+ par left side mein curved edge ke saath */}
        <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[35%] lg:[clip-path:ellipse(100%_175%_at_0%_0%)]">
          <Image
            src="/CTA.avif"
            alt=""
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="object-cover object-left"
          />
        </div>

        {/* Text: lg+ par image ke right mein, vertically centered */}
        <div className="px-4 py-12 sm:px-6 sm:py-16 lg:ml-[41%] lg:flex lg:min-h-[24.5rem] lg:flex-col lg:items-start lg:justify-center lg:py-0 lg:pl-0 lg:pr-10">
          <h2 className="text-sm font-extrabold uppercase tracking-wide sm:text-base">
            Ready to find the right business contacts?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
            Whether you need exhibitor data, attendee data, or a custom event
            list, our team is here to help you find the right prospects for your
            next outreach campaign.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
