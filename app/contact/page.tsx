import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ExhibitionData team.",
};

const EMAIL = "info@exhibitiondata.com";
const PHONE = "+91 7067416887";

const NAVY = "text-[#0f1a5c]";

const HELP = [
  {
    title: "Request a custom data list",
    text: "Tell us your target industry, event, country and job titles. We build a custom exhibitor or attendee list for your request.",
  },
  {
    title: "Talk to a data specialist",
    text: "Not sure which show or audience fits your offer? Our specialists help you choose the right events, job titles and data type.",
  },
  {
    title: "Questions on pricing or delivery?",
    text: "Ask about pricing, delivery timelines or custom requirements. Attendee data is available only for some events, so we confirm this first.",
  },
];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-6",
};

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" />
      <circle cx="12" cy="9.500" r="2.500" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.9v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2Z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 4l1.600 4.400L16 10l-4.400 1.600L10 16l-1.600-4.400L4 10l4.400-1.600L10 4Z" />
      <path d="M18 14l.8 2.200L21 17l-2.200.8L18 20l-.8-2.200L15 17l2.200-.8L18 14Z" />
    </svg>
  );
}

const fieldClass =
  "w-full rounded-xl border border-indigo-100 bg-indigo-50/70 px-5 py-4 text-base text-slate-900 placeholder:text-slate-500 transition focus:border-blue-500 focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-blue-500/30";

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[#0f1a5c]">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-extrabold uppercase leading-snug text-slate-900 sm:text-base">
          {title}
        </h3>
        <div className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
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
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#0a1445]/60" aria-hidden="true" />
        <h1 className="px-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
      </section>

      {/* Intro */}
      <section className="bg-white">
        <Container className="grid gap-6 pb-6 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <h2
            className={`text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${NAVY}`}
          >
            Get Help With Exhibitor and Attendee Data
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Are you looking for reliable exhibitor data, attendee data or a
            custom event database? Tell us what your business needs. The more
            detail you share (event name, industry, countries and job titles),
            the faster we can confirm what data is available and build your
            list. ExhibitionData is an independent data provider and is not
            affiliated with or endorsed by the event organizers.
          </p>
        </Container>

        {/* Info cards + map */}
        <Container className="grid gap-6 py-8 lg:grid-cols-[1fr_2fr]">
          <div className="grid gap-4 self-start">
            <InfoCard icon={<PinIcon />} title="Visit our office">
              Our office in Indore, Madhya Pradesh, India. Our research team
              works from here.
            </InfoCard>
            <InfoCard icon={<MailIcon />} title="Email our team">
              <a
                href={`mailto:${EMAIL}`}
                className="rounded text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {EMAIL}
              </a>
            </InfoCard>
            <InfoCard icon={<PhoneIcon />} title="Call an event data expert">
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="rounded hover:text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {PHONE}
              </a>
            </InfoCard>
          </div>

          <div className="min-h-72 overflow-hidden rounded-xl border border-slate-200 shadow-sm lg:min-h-[26rem]">
            <iframe
              title="ExhibitionData office location, New Palasia, Indore"
              src="https://www.google.com/maps?q=New+Palasia,+Indore,+Madhya+Pradesh&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-72 border-0 lg:min-h-[26rem]"
            />
          </div>
        </Container>

        {/* Form */}
        <Container className="py-8 sm:py-14">
          <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(15,26,92,0.12)] ring-1 ring-slate-100 sm:p-10 lg:grid-cols-[2fr_1fr] lg:gap-12 lg:p-12">
            <div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Drop us a line
              </h2>

              {/* UI only: connect to your own submit handler or API route. */}
              <form
                action={`mailto:${EMAIL}`}
                method="post"
                encType="text/plain"
                className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Name *" autoComplete="name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone number</label>
                  <input id="phone" name="phone" type="tel" required placeholder="Phone number *" autoComplete="tel" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input id="email" name="email" type="email" required placeholder="Email Address *" autoComplete="email" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">Subject</label>
                  <input id="subject" name="subject" type="text" required placeholder="Subject *" className={fieldClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea id="message" name="message" required rows={8} placeholder="Message *" className={`${fieldClass} min-h-52 resize-y`} />
                </div>
                <div className="mt-2 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-10 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>

            {/* Side image: full height of the card on lg+, banner below the form on mobile */}
            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96 lg:h-auto">
              <Image
                src="/contact-us.avif"
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* How we can help */}
      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <h2
            className={`text-center text-2xl font-extrabold uppercase tracking-tight sm:text-3xl ${NAVY}`}
          >
            How our event data specialists can help
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {HELP.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl bg-indigo-50/60 p-7 text-center shadow-[0_10px_30px_rgba(15,26,92,0.08)]"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0a1445] to-blue-600 text-white">
                  <SparkIcon />
                </span>
                <h3 className={`mt-4 text-base font-extrabold uppercase leading-snug ${NAVY}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
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
            list, our team is here to help you find the right prospects for
            your next outreach campaign.
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