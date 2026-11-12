import type { ReactNode } from "react";
import { AlertCircleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Shared building blocks for form controls (Input, Select, Textarea), so every
 * control labels, styles and reports errors the same way.
 */

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
      {children}
    </label>
  );
}

/** Id of a control's error message; the control points to it with aria-describedby. */
export function errorIdFor(controlId: string): string {
  return `${controlId}-error`;
}

/**
 * Inline error message. The text is what screen readers use (the control's
 * `aria-describedby` points here); the icon is decorative so the error never
 * relies on colour alone. Renders nothing when there is no error.
 */
export function FieldError({
  controlId,
  message,
}: {
  controlId: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <p
      id={errorIdFor(controlId)}
      className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700"
    >
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

/** Joins describedby ids, skipping empty ones; `undefined` when none remain. */
export function describedBy(
  ...ids: Array<string | false | null | undefined>
): string | undefined {
  const joined = ids.filter(Boolean).join(" ");
  return joined || undefined;
}

/** Visual styles shared by all text-like controls. Height/padding stay with each control. */
export function controlStyles(hasError: boolean): string {
  return cn(
    "w-full rounded-lg border-0 bg-white text-sm text-slate-900 shadow-sm ring-1 ring-inset",
    "placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
    hasError
      ? "ring-red-500 focus:outline-red-600"
      : "ring-slate-300 focus:outline-indigo-600",
  );
}
