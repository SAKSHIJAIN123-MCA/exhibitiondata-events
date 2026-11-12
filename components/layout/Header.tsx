import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/components/layout/NavLinks";
import { Container } from "@/components/ui/Container";

const PHONE = "+91 7067416887";
const EMAIL = "info@exhibitiondata.com";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const topLink =
  "flex items-center text-sm font-medium text-white transition-colors hover:text-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Header() {
  return (
    // Sticky from `sm` up; on phones it scrolls away.
    // `relative` needed so the strip can be absolutely positioned on lg+.
    <header className="relative z-40 bg-white shadow-sm sm:sticky sm:top-0">
      {/* Contact strip: in-flow on sm–lg, pinned top-right on lg+ */}
      <div className="hidden bg-white sm:block lg:absolute lg:right-0 lg:top-0 lg:bg-transparent">
        <div className="flex justify-end">
          <div className="flex items-stretch bg-blue-600 pl-10 [clip-path:polygon(28px_0,100%_0,100%_100%,0_100%)]">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={topLink}>
              <span className="flex h-9 w-10 items-center justify-center bg-[#0f1a5c]">
                <PhoneIcon className="size-4" />
              </span>
              <span className="px-4">{PHONE}</span>
            </a>

            <a href={`mailto:${EMAIL}`} className={topLink}>
              <span className="flex h-9 w-10 items-center justify-center bg-[#0f1a5c]">
                <MailIcon className="size-4" />
              </span>
              <span className="px-4">{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* lg:pt-9 = strip ki height (h-9) ke barabar space nav ke upar */}

      <Container className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 lg:pb-1 lg:pt-9">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:-mt-9"
        >
          <Image
            src="/logo.svg"
            alt="ExhibitionData"
            width={180}
            height={45}
            priority
            className="h-12 w-auto object-contain sm:h-16 lg:h-[5rem]"
          />
        </Link>

        <div className="flex max-w-full flex-wrap items-center justify-end gap-x-2 gap-y-2 mt-2 mb-1 sm:gap-x-4 lg:mt-4 lg:mb-2 lg:gap-x-6">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 mt-2 mb-1 lg:mt-4 lg:mb-2">
            <NavLinks />

            <Link
              href="/get-a-quote"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0f1a5c] to-blue-600 px-3 py-2 text-xs font-bold text-white shadow-md transition hover:from-[#16247a] hover:to-blue-500 sm:px-7 sm:py-2.5 sm:text-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
