import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Generic pill-shaped label. Pass colors through `className`. */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        className,
      )}
      {...props}
    />
  );
}
