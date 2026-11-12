"use client";

import { useEffect, useRef, useState } from "react";

type Milestone = { year: string; title: string; text: string };

function TimelineItem({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const [shown, setShown] = useState(false);
  const dark = index % 2 === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mobile: slide up. Desktop: slide in from the side the card sits on.
  const hidden = dark
    ? "opacity-0 translate-y-10 scale-95 md:translate-y-0 md:translate-x-28"
    : "opacity-0 translate-y-10 scale-95 md:translate-y-0 md:-translate-x-28";
  const visible = "opacity-100 translate-x-0 translate-y-0 scale-100";

  return (
    <li ref={ref} className="relative pl-12 md:pl-0">
      {/* Dot on the line */}
      <span
        className={`absolute left-4 top-8 z-10 size-3 -translate-x-1/2 rounded-full ring-4 ring-blue-50 transition-all duration-500 md:left-1/2 motion-reduce:transition-none ${
          shown ? "scale-125 bg-blue-600" : "scale-50 bg-blue-200"
        }`}
        aria-hidden="true"
      >
        {shown && (
          <span className="absolute inset-0 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_2] rounded-full bg-blue-500/60 motion-reduce:hidden" />
        )}
      </span>

      {/* Card */}
      <div
        className={`rounded-2xl p-6 shadow-md transition-all duration-[900ms] ease-out hover:shadow-xl sm:p-7 md:w-[calc(50%-2rem)] motion-reduce:transform-none motion-reduce:transition-none ${
          shown ? visible : hidden
        } ${
          dark
            ? "bg-gradient-to-r from-[#0a1445] to-blue-600 text-white md:ml-auto"
            : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-bold leading-snug sm:text-2xl ${
            dark ? "text-white" : "text-[#0f1a5c]/80"
          }`}
        >
          {m.title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            dark ? "text-blue-100" : "text-slate-600"
          }`}
        >
          {m.text}
        </p>
        <p
          className={`mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl ${
            dark ? "text-white" : "text-right text-[#0f1a5c]"
          }`}
        >
          {m.year}
        </p>
      </div>
    </li>
  );
}

export function GrowthTimeline({ milestones }: { milestones: Milestone[] }) {
  const listRef = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(0);

  // The blue line fills as you scroll through the list.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = (mid - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-12 space-y-10 md:space-y-14">
      {/* Track */}
      <span
        className="absolute bottom-0 left-4 top-0 w-px bg-blue-200 md:left-1/2"
        aria-hidden="true"
      />
      {/* Progress fill */}
      <span
        className="absolute bottom-0 left-4 top-0 w-0.5 origin-top bg-gradient-to-b from-blue-500 to-blue-700 md:left-1/2 md:-translate-x-1/2"
        style={{ transform: `scaleY(${progress})` }}
        aria-hidden="true"
      />
      {milestones.map((m, i) => (
        <TimelineItem key={m.year} m={m} index={i} />
      ))}
    </ol>
  );
}