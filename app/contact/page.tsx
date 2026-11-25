import ContactChannels from "@/components/sections/ContactChannels";
import ContactHero from "@/components/sections/ContactHero";
import PageShell from "@/components/sections/PageShell";
import JsonLd from "@/components/ui/JsonLd";
import pages from "@/data/pages.json";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.contact;
const title = "Contact PrimeDesk | Get in Touch";
const description = "Contact PrimeDesk in Houston by phone or email, or answer three quick questions about what you need.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/contact",
  image: "/og/contact.jpg",
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema("ContactPage", title, "/contact", description)} />
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
      <ContactHero content={page.hero} details={<ContactChannels content={page.channels} />} />
    </PageShell>
  );
}
