import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface NotFoundViewProps {
  title: string;
  description: string;
}

/**
 * Shared layout for 404 screens (used by `app/not-found.tsx` and
 * `app/events/not-found.tsx`). It's a Server Component with no client code,
 * because not-found files ship with every route under their segment.
 */
export function NotFoundView({ title, description }: NotFoundViewProps) {
  return (
    <Container className="max-w-2xl py-20 text-center sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base text-slate-600 sm:text-lg">{description}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/events" className={buttonStyles({ size: "lg" })}>
          Browse all events
        </Link>
        <Link href="/" className={buttonStyles({ variant: "secondary", size: "lg" })}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
