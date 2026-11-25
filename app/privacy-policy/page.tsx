import LegalContent from "@/components/sections/LegalContent";
import PageShell from "@/components/sections/PageShell";
import pages from "@/data/pages.json";
import { pageMetadata } from "@/lib/site";

const { privacy } = pages.legal;

// Keep the draft out of search results pending approval.
export const metadata = pageMetadata({
  title: "Privacy Policy | PrimeDesk",
  description: privacy.description,
  path: "/privacy-policy",
  noindex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <LegalContent content={privacy} />
    </PageShell>
  );
}
