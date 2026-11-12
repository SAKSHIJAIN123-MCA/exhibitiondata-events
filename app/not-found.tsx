import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";

export const metadata: Metadata = { title: "Page not found" };

/** Rendered for any URL that doesn't match a route in the app. */
export default function NotFound() {
  return (
    <NotFoundView
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
    />
  );
}
