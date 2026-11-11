import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/ui/icons";

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
}

/** Labelled native <select> (best accessibility and mobile behaviour). */
export function Select({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
  className,
  ...props
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border-0 bg-white pl-3 pr-10 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300",
            "focus:outline-2 focus:outline-offset-0 focus:outline-indigo-600",
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
    </div>
  );
}
