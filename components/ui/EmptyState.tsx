import type { ReactNode } from "react";
import { SearchIcon } from "@/components/ui/icons";

interface EmptyStateProps {
  title: string;
  description: string;
  /** Optional call to action, e.g. a "Clear Filters" button. */
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <SearchIcon className="size-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
