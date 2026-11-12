import type { TextareaHTMLAttributes } from "react";
import {
  FieldError,
  FieldLabel,
  controlStyles,
  describedBy,
  errorIdFor,
} from "@/components/ui/FormField";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  /** Validation message. When set, the field is marked invalid and the message is shown below it. */
  error?: string;
}

/** Labelled multi-line input with the same error behaviour as Input and Select. */
export function Textarea({
  id,
  label,
  error,
  className,
  rows = 5,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ariaDescribedBy, error && errorIdFor(id))}
        className={cn(
          controlStyles(Boolean(error)),
          "block resize-y px-3 py-2.5",
          className,
        )}
        {...props}
      />
      <FieldError controlId={id} message={error} />
    </div>
  );
}
