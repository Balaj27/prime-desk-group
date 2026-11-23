import BrandTicker from "@/components/sections/BrandTicker";
import ClientLogos from "@/components/sections/ClientLogos";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Needs from "@/components/sections/Needs";
import PageShell from "@/components/sections/PageShell";
import Process from "@/components/sections/Process";
import Values from "@/components/sections/Values";
import JsonLd from "@/components/ui/JsonLd";
import content from "@/data/landing-page.json";
import approvedClientLogos from "@/data/approved-client-logos.json";
import { faqSchema } from "@/lib/schema";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "PrimeDesk | Marketing Agency for Small Businesses",
  description: site.description,
  path: "/",
  image: "/og/home.jpg",
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={faqSchema(content.faq.items)} />
      <Hero content={content.hero} />
      <BrandTicker items={content.brandTicker} />
      <Needs content={content.needs} />
      <Process content={content.process} />
      <Values content={content.values} />
      <Services content={content.services} layout="numbered" />
      <Faq content={content.faq} />
      <ClientLogos logos={approvedClientLogos} />
      <Cta content={content.cta} />
    </PageShell>
  );
}
