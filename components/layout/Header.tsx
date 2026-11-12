import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    // Sticky from the `sm` breakpoint up; on phones it scrolls away, because
    // the two-row header would otherwise take too much of a small screen.
    <header className="z-40 border-b border-slate-200 bg-white/90 backdrop-blur sm:sticky sm:top-0">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 sm:py-3">
        <Link
          href="/"
          className="rounded-md text-xl font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Exhibition<span className="text-indigo-600">Data</span>
        </Link>
        <NavLinks />
      </Container>
    </header>
  );
}
