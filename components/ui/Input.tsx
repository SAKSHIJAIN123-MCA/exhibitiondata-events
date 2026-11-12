import type { InputHTMLAttributes, ReactNode } from "react";
import {
  FieldError,
  FieldLabel,
  controlStyles,
  describedBy,
  errorIdFor,
} from "@/components/ui/FormField";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** Decorative icon shown inside the field, on the left. */
  icon?: ReactNode;
  /** Validation message. When set, the field is marked invalid and the message is shown below it. */
  error?: string;
}

/** Labelled text input. The label is always visible for accessibility. */
export function Input({
  id,
  label,
  icon,
  error,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ariaDescribedBy, error && errorIdFor(id))}
          className={cn(
            controlStyles(Boolean(error)),
            "h-11 pr-3",
            icon ? "pl-10" : "pl-3",
            className,
          )}
          {...props}
        />
      </div>
      <FieldError controlId={id} message={error} />
    </div>
  );
}
