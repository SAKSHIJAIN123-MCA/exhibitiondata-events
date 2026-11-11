import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Industry } from "@/types/event";

// Full class names are written out (not built dynamically) so Tailwind can
// detect them. Backgrounds are opaque so the badge stays readable on photos.
const INDUSTRY_STYLES: Record<Industry, string> = {
  Packaging: "bg-amber-50 text-amber-800 ring-amber-600/30",
  Healthcare: "bg-emerald-50 text-emerald-800 ring-emerald-600/30",
  Technology: "bg-indigo-50 text-indigo-800 ring-indigo-600/30",
  "Food & Beverage": "bg-rose-50 text-rose-800 ring-rose-600/30",
};

export function IndustryBadge({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <Badge className={cn(INDUSTRY_STYLES[industry], className)}>{industry}</Badge>
  );
}
