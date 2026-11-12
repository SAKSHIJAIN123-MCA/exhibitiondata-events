import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";

export const metadata: Metadata = { title: "Event not found" };

/** Rendered when `notFound()` is called inside /events/* (e.g. a bad slug). */
export default function EventNotFound() {
  return (
    <NotFoundView
      title="Event not found"
      description="We couldn't find the event you're looking for. The link may be incorrect, or the event may no longer be listed."
    />
  );
}
