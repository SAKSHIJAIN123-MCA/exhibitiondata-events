import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** Decorative icon shown inside the field, on the left. */
  icon?: ReactNode;
}

/** Labelled text input. The label is always visible for accessibility. */
export function Input({ id, label, icon, className, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "h-11 w-full rounded-lg border-0 bg-white pr-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300",
            "placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-600",
            icon ? "pl-10" : "pl-3",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
