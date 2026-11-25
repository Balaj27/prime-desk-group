import LegalContent from "@/components/sections/LegalContent";
import PageShell from "@/components/sections/PageShell";
import pages from "@/data/pages.json";
import { pageMetadata } from "@/lib/site";

const { terms } = pages.legal;

// Keep the draft out of search results pending approval.
export const metadata = pageMetadata({
  title: "Terms and Conditions | PrimeDesk",
  description: terms.description,
  path: "/terms-condition",
  image: "/og/home.jpg",
  noindex: true,
});

export default function TermsPage() {
  return (
    <PageShell>
      <LegalContent content={terms} />
    </PageShell>
  );
}
