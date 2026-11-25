import ClientLogos from "@/components/sections/ClientLogos";
import Cta from "@/components/sections/Cta";
import Impact from "@/components/sections/Impact";
import PageShell from "@/components/sections/PageShell";
import Team, { Founder } from "@/components/sections/Team";
import WhyPrimeDesk from "@/components/sections/WhyPrimeDesk";
import JsonLd from "@/components/ui/JsonLd";
import approvedClientLogos from "@/data/approved-client-logos.json";
import pages from "@/data/pages.json";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.about;
const title = "About PrimeDesk | Houston Marketing Team for Small Businesses";

export const metadata = pageMetadata({
  title,
  description: page.hero.statement,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema("AboutPage", title, "/about", page.hero.statement)} />
      <JsonLd data={breadcrumbSchema("About", "/about")} />
      <Impact content={page.impact} intro={page.hero} />
      <Founder content={page.founder} />
      <WhyPrimeDesk content={page.different} />
      <Team content={page.team} founder={page.founder} />
      <ClientLogos logos={approvedClientLogos} />
      <Cta content={page.cta} />
    </PageShell>
  );
}
