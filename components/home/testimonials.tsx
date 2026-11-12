"use client";

import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false },
);
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { Reveal, SectionTitle } from "@/components/home/reveal";

// Sample copy: replace the newer entries with real customer quotes.
const TESTIMONIALS = [
  {
    quote:
      "Finding the right channel partners at automotive trade shows used to depend on who we happened to run into on the floor. Attendee data filtered by title let us set up meetings before the event even started.",
    name: "Sofia Alvarez",
    role: "Channel Partnerships Manager — Redline Automotive Technologies",
  },
  {
    quote:
      "We run outreach for a handful of B2B clients at once, and event-based lists consistently convert better than cold lists. Filtering exhibitor data by industry let us build lists for two clients in the same session.",
    name: "Marcus Whitfield",
    role: "Account Director — Harborview Marketing Partners",
  },
  {
    quote:
      "Part of our deal-sourcing process is tracking which companies are showing up at industry events — it’s an early signal on who’s scaling. This data made that tracking systematic instead of ad hoc.",
    name: "Claire Doyle",
    role: "Investment Research Associate — Fenwick Capital Partners",
  },
  {
    quote:
      "Our events team uses exhibitor lists to decide which shows are worth attending. Seeing who else exhibits, by country and industry, saves us weeks of manual research every quarter.",
    name: "Priya Nair",
    role: "Events Marketing Lead — Northbridge Logistics Solutions",
  },
  {
    quote:
      "We needed contacts for three industries across four countries, and the custom list arrived within two days. The emails were accurate and our bounce rate stayed low.",
    name: "Daniel Brooks",
    role: "Head of Demand Generation — Clearpoint Software",
  },
  {
    quote:
      "As a small booth-building company we can’t afford wasted outreach. Targeting exhibitors by show helped us reach decision makers who were actually planning their stands.",
    name: "Lukas Weber",
    role: "Founder — Weber Exhibit Systems",
  },
  {
    quote:
      "The monthly subscription keeps our pipeline full. New lists land every month and existing contacts are re-verified, so our team isn’t chasing dead addresses.",
    name: "Amira Hassan",
    role: "Sales Operations Manager — Brightline Staffing Group",
  },
];

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-12"
    >
      <path d="M10 6H5.5A2.5 2.5 0 0 0 3 8.5V13a2 2 0 0 0 2 2h2.5c0 1.7-.9 2.7-2.5 3l.3 1.5C8.5 19 10 16.8 10 13V6Zm11 0h-4.5A2.5 2.5 0 0 0 14 8.5V13a2 2 0 0 0 2 2h2.5c0 1.7-.9 2.7-2.5 3l.3 1.5C19.5 19 21 16.8 21 13V6Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6H4Z" />
    </svg>
  );
}

export function Testimonials() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <section
      className="overflow-hidden bg-white"
      aria-labelledby="testimonials-title"
    >
      <Container className="pt-14 sm:pt-20">
        <div id="testimonials-title">
          <SectionTitle>What our customers say!</SectionTitle>
        </div>
      </Container>

      <Reveal delay={150}>
        <div className="relative">
          {/* Soft edge fades, so cards drift out instead of being cut */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-32"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-32"
            aria-hidden="true"
          />

          <Swiper
            modules={[Autoplay, A11y, Keyboard]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActive(s.realIndex)}
            loop
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            speed={800}
            grabCursor
            keyboard={{ enabled: true }}
            autoplay={
              reducedMotion
                ? false
                : {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            a11y={{ containerMessage: "Customer testimonials" }}
            className="!pb-14 !pt-16"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide
                key={t.name}
                className="group !h-auto !w-[86vw] sm:!w-[34rem] lg:!w-[38rem]"
              >
                <figure className="relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 pt-10 opacity-50 shadow-sm transition-all duration-700 ease-out group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:border-indigo-300 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:shadow-[0_20px_60px_rgba(15,26,92,0.18)] scale-90 motion-reduce:transition-none">
                  <span className="absolute -top-6 left-7 text-slate-400 transition-colors duration-500 group-[.swiper-slide-active]:text-blue-600">
                    <QuoteIcon />
                  </span>

                  <blockquote className="text-base italic leading-relaxed text-[#0f1a5c]/75">
                    {t.quote}
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-4 pt-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0f1a5c]">
                      <UserIcon />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold uppercase text-[#0f1a5c]">
                        {t.name}
                      </span>
                      <span className="block text-sm leading-snug text-[#0f1a5c]/70">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>

      {/* Dots */}
      <div
        className="flex items-center justify-center gap-1 pb-14 sm:pb-20"
        role="group"
        aria-label="Choose a testimonial"
      >
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => swiper?.slideToLoop(i)}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={i === active}
            className="group rounded-full p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-500 motion-reduce:transition-none ${
                i === active
                  ? "w-7 bg-blue-600"
                  : "w-2 bg-slate-300 group-hover:bg-slate-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
