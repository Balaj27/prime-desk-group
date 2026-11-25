import type { Metadata } from "next";

export const site = {
  // Set NEXT_PUBLIC_SITE_URL once the live domain is final.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primedeskgroup.com").replace(/\/$/, ""),
  name: "PrimeDesk",
  legalName: "PrimeDesk Business Solutions",
  phone: "+18328198366",
  phoneDisplay: "+1 (832) 819-8366",
  email: "fareed.huda@primedeskgroup.com",
  city: "Houston",
  region: "TX",
  country: "US",
  founded: "2025",
  description:
    "PrimeDesk is a Houston marketing team for small businesses. Social, ads, SEO, web, and brand work from one embedded partner.",
};

export const shareImage = {
  url: "/og/primedesk-share.png",
  width: 1200,
  height: 630,
  alt: "PrimeDesk — You run the business. We run the marketing. primedeskgroup.com",
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, noindex = false }: PageMeta): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, title, description, images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
