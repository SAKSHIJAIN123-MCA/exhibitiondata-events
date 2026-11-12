"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal, SectionTitle } from "@/components/home/reveal";

type FaqItem = { id: string; q: string; a: string };

const LEFT: FaqItem[] = [
  {
    id: "kind",
    q: "What kind of event data does ExhibitionData provide?",
    a: "We provide verified exhibitor and attendee contacts for trade shows, exhibitions and conferences: company name, contact name, job title, business email, phone number, website, industry and country.",
  },
  {
    id: "custom",
    q: "Can I get a custom list instead of a standard one?",
    a: "Yes. Every list is built for the request in front of us, based on the event, industry, countries and job titles you need.",
  },
  {
    id: "accurate",
    q: "How do you keep the data accurate?",
    a: "Our researchers use our own tools and verified sources. Contacts we already hold are re-verified every month, and checked again before delivery if your project needs it.",
  },
  {
    id: "coverage",
    q: "Which events and industries do you cover?",
    a: "We cover events in 35+ countries across 20+ industries, and our database grows with every new event we research.",
  },
  {
    id: "attendee",
    q: "Do you have attendee lists for every event?",
    a: "No. Attendee data is available only for some events, so we confirm what exists for your show before you approve a quote.",
  },
];

const RIGHT: FaqItem[] = [
  {
    id: "cost",
    q: "How much does an event data list cost?",
    a: "We don’t publish fixed prices because no two requests are the same. You get a quote first, and research starts only after you approve it.",
  },
  {
    id: "one",
    q: "Can I buy data for just one event?",
    a: "Yes. You can order a one-time list for a specific event, or subscribe and receive new lists every month.",
  },
  {
    id: "delivery",
    q: "How is the data delivered, and how fast?",
    a: "You receive the data as an Excel file, CSV or Google Sheet within 24-48 hours.",
  },
  {
    id: "why",
    q: "Why use ExhibitionData instead of researching events yourself?",
    a: "We do the research and verification for you, so your team gets a ready-to-use list built around your target audience instead of spending days collecting contacts by hand.",
  },
];

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Item({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const buttonId = `faq-btn-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div
      className={`rounded-xl bg-white transition-shadow duration-300 motion-reduce:transition-none ${
        open
          ? "shadow-[0_14px_40px_rgba(37,99,235,0.18)]"
          : "shadow-[0_8px_30px_rgba(15,26,92,0.07)] hover:shadow-[0_10px_34px_rgba(15,26,92,0.14)]"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-medium text-[#0f1a5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span>{item.q}</span>
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0a1445] to-blue-600 text-white transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronIcon />
          </span>
        </button>
      </h3>
      {/* grid-rows trick animates height from 0 to content size */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  const column = (items: FaqItem[], offset: number) => (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={(i * 2 + offset) * 70}>
          <Item
            item={item}
            open={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        </Reveal>
      ))}
    </div>
  );

  return (
    <section className="bg-blue-50/70" aria-labelledby="faq-title">
      <Container className="py-14 sm:py-20">
        <div id="faq-title">
          <SectionTitle>Trade show data FAQs</SectionTitle>
        </div>

        <div className="mt-10 grid items-start gap-4 sm:mt-14 md:grid-cols-2 md:gap-6">
          {column(LEFT, 0)}
          {column(RIGHT, 1)}
        </div>
      </Container>
    </section>
  );
}