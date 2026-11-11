import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

/**
 * Class names for button styling. Exported separately so a <Link> can look
 * like a button without nesting a <button> inside an <a>.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleOptions = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    "disabled:pointer-events-none disabled:opacity-50",
    size === "md" && "h-11 px-4 text-sm",
    size === "lg" && "h-12 px-6 text-base",
    variant === "primary" && "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
    variant === "secondary" &&
      "bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
    className,
  );
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<StyleOptions, "className"> {}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
