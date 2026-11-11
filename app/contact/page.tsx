import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ExhibitionData team.",
};

export default function ContactPage() {
  return (
    <PageIntro title="Contact us">
      <p>
        Have a question about an event or want to list an exhibition? Our team
        is happy to help.
      </p>
      <p>
        Email us at{" "}
        <a
          href="mailto:hello@exhibitiondata.example"
          className="font-medium text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
        >
          hello@exhibitiondata.example
        </a>
        .
      </p>
    </PageIntro>
  );
}
