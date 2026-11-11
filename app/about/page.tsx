import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";

export const metadata: Metadata = {
  title: "About",
  description: "About ExhibitionData, a directory of international trade shows.",
};

export default function AboutPage() {
  return (
    <PageIntro title="About ExhibitionData">
      <p>
        ExhibitionData helps businesses discover international trade shows and
        exhibitions. Our directory brings together events from packaging,
        healthcare, technology and food &amp; beverage, with the dates, venues
        and details you need to compare them.
      </p>
      <p>
        Whether you are looking to exhibit, visit or simply keep an eye on your
        industry, we make it easier to find the right event at the right time.
      </p>
    </PageIntro>
  );
}
