import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";
import { industryToParam } from "@/lib/filters";
import { INDUSTRIES } from "@/types/event";

const EMAIL = "info@exhibitiondata.com";

const linkClass =
  "rounded text-sm font-semibold text-[#0f1a5c] transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

const socialClass =
  "flex size-10 items-center justify-center rounded-full border border-[#0f1a5c]/30 text-[#0f1a5c] transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm5.5 0h2.9v1.7c.5-.9 1.7-1.9 3.5-1.9 3.1 0 3.6 2 3.6 4.6V21h-3v-6.5c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.200V21h-3V9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.2L2 6.4V6a1 1 0 0 1 1-1Zm19 3.700V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.7l10 6.2 10-6.2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-100 bg-white">
      {/* Soft world-map style glow, bottom right */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0.05)_45%,transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1.4fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Image
                src="/logo.svg"
                alt="ExhibitionData"
                width={190}
                height={55}
                className="h-20 w-auto object-contain"
              />
            </Link>

            <h2 className="mt-8 text-lg font-extrabold uppercase tracking-tight text-[#0f1a5c]">
              Contact us
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-block rounded text-sm text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {EMAIL}
            </a>

            <ul className="mt-6 flex gap-3">
              <li>
                <a href="#" aria-label="Facebook" className={socialClass}>
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram" className={socialClass}>
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn" className={socialClass}>
                  <LinkedinIcon />
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} aria-label="Email" className={socialClass}>
                  <MailIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* Helpful links */}
          <nav aria-label="Footer">
            <h2 className="text-lg font-extrabold uppercase tracking-tight text-[#0f1a5c]">
              Helpful links
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Browse by industry">
            <h2 className="text-lg font-extrabold uppercase tracking-tight text-[#0f1a5c]">
              Industries
            </h2>
            <ul className="mt-5 space-y-4">
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

        <div className="mt-12 border-t border-slate-300 pt-6 text-sm text-[#0f1a5c]">
          © 2026 ExhibitionData. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}