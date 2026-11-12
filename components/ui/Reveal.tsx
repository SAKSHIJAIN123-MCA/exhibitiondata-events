"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade" | "grow";
type Tag = "div" | "li" | "article" | "span" | "p" | "h2" | "h3" | "a";

const HIDDEN: Record<Variant, string> = {
  up: "opacity-0 translate-y-8",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-90",
  fade: "opacity-0",
  grow: "scale-y-0",
};

const SHOWN: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  fade: "opacity-100",
  grow: "scale-y-100",
};

type Props = {
  children?: ReactNode;
  as?: Tag;
  variant?: Variant;
  /** delay in ms, useful for stagger */
  delay?: number;
  /** duration in ms */
  duration?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

/**
 * Scroll-reveal wrapper. Fades/slides its children in the first time
 * they enter the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  as = "div",
  variant = "up",
  delay = 0,
  duration = 700,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = as as React.ElementType;
  const origin = variant === "grow" ? "origin-top" : "";

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`transition-all ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${origin} ${
        shown ? SHOWN[variant] : HIDDEN[variant]
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}