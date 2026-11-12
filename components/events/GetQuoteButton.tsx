import { buttonStyles } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { QUOTE_SECTION_ID } from "@/lib/constants";
import { cn } from "@/lib/cn";

/**
 * "Get a Quote" call to action. It is a plain in-page anchor (`#quote`), so
 * the browser does the scrolling itself: it works without JavaScript, can be
 * opened in a new tab, and respects the reduced-motion setting (smooth
 * scrolling is switched on in globals.css and off for reduced motion).
 */
export function GetQuoteButton({ className }: { className?: string }) {
  return (
    <a
      href={`#${QUOTE_SECTION_ID}`}
      className={cn(buttonStyles({ size: "lg" }), className)}
    >
      Get a Quote
      <ArrowRightIcon className="size-5" />
    </a>
  );
}
