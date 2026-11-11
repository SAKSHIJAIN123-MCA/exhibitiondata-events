import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface PageIntroProps {
  title: string;
  children: ReactNode;
}

/** Simple page title + body copy, used by the static pages (About, Contact). */
export function PageIntro({ title, children }: PageIntroProps) {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-base text-slate-600 sm:text-lg">
        {children}
      </div>
    </Container>
  );
}
