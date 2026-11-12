"use client";

import { useEffect, useRef, useState } from "react";

/** Flips to true once the element scrolls into view (and stays true). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Fade + slide-up entrance. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Section heading with side lines that draw outward from the title. */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  const line = (side: "left" | "right") => (
    <span
      className={`hidden flex-1 items-center sm:flex ${
        side === "left" ? "flex-row" : "flex-row-reverse"
      }`}
      aria-hidden="true"
    >
      <span
        className={`size-2 shrink-0 rounded-full bg-[#0f1a5c] transition-opacity delay-700 duration-300 motion-reduce:opacity-100 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`h-px flex-1 bg-[#0f1a5c] transition-transform duration-1000 ease-out motion-reduce:scale-x-100 motion-reduce:transition-none ${
          side === "left" ? "origin-right" : "origin-left"
        } ${inView ? "scale-x-100" : "scale-x-0"}`}
      />
    </span>
  );

  return (
    <div ref={ref} className="flex items-center gap-4 sm:gap-6">
      {line("left")}
      <h2
        className={`text-balance text-center text-2xl font-extrabold uppercase tracking-tight text-[#0f1a5c] transition-all duration-700 ease-out sm:text-4xl motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </h2>
      {line("right")}
    </div>
  );
}