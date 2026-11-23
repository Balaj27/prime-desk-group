import BrandTicker from "@/components/sections/BrandTicker";
import Cta from "@/components/sections/Cta";
import PageShell from "@/components/sections/PageShell";
import Services from "@/components/sections/Services";
import ServicesHero from "@/components/sections/ServicesHero";
import JsonLd from "@/components/ui/JsonLd";
import landing from "@/data/landing-page.json";
import pages from "@/data/pages.json";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const page = pages.services;
const services = {
  ...landing.services,
  items: landing.services.items.map((item) =>
    item.id === "digital-marketing" ? { ...item, ...page.digitalMarketing } : item,
  ),
};

export const metadata = pageMetadata({
  title: "Marketing, Web, Brand & Support Services | PrimeDesk",
  description: page.hero.description,
  path: "/services",
  image: "/og/services.jpg",
});

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema("Services", "/services")} />
      {servicesSchema(services.items).map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
      <ServicesHero content={page.hero} />
      <BrandTicker items={landing.brandTicker} />
      <Services content={services} intro={page.intro} layout="numbered-photos" />
      <Cta content={page.closing} />
    </PageShell>
  );
}
