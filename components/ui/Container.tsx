import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Centers content and applies the site-wide max width and side padding. */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
