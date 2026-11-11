import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";
import { industryToParam } from "@/lib/filters";
import { INDUSTRIES } from "@/types/event";

const linkClass =
  "rounded text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="text-xl font-bold tracking-tight text-white">
              Exhibition<span className="text-indigo-400">Data</span>
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Your directory of international trade shows and exhibitions.
              Find the right event, plan your presence and connect with the
              world&apos;s industries.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Browse by industry">
            <h2 className="text-sm font-semibold text-white">Industries</h2>
            <ul className="mt-4 space-y-3">
              {INDUSTRIES.map((industry) => (
                <li key={industry}>
                  <Link
                    href={`/events?industry=${industryToParam(industry)}`}
                    className={linkClass}
                  >
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
          © ExhibitionData. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
