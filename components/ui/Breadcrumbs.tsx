import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page, which is shown as plain text. */
  href?: string;
}

/**
 * Breadcrumb trail, e.g. Home > Events > CES 2027.
 * Semantics: a labelled <nav> containing an ordered list; the last item is
 * marked `aria-current="page"` so screen readers announce it as the current
 * location.
 */
export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded underline-offset-4 hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-slate-900"
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRightIcon className="size-4 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
