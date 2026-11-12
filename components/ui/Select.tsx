import type { SelectHTMLAttributes } from "react";
import {
  FieldError,
  FieldLabel,
  controlStyles,
  describedBy,
  errorIdFor,
} from "@/components/ui/FormField";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  id: string;
  label: string;
  value: string;
  options: readonly SelectOption[];
  /** Label of the empty option, e.g. "All industries". Its value is "". */
  placeholder: string;
  onChange: (value: string) => void;
  /** Validation message. When set, the field is marked invalid and the message is shown below it. */
  error?: string;
}

/** Labelled native <select> (best accessibility and mobile behaviour). */
export function Select({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
  error,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ariaDescribedBy, error && errorIdFor(id))}
          className={cn(
            controlStyles(Boolean(error)),
            "h-11 appearance-none pl-3 pr-10",
            className,
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
      </div>
      <FieldError controlId={id} message={error} />
    </div>
  );
}
