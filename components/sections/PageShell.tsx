import type { ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import SectionPreview from "@/components/ui/SectionPreview";
import content from "@/data/landing-page.json";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav content={content.nav} />
      <SectionPreview footer={<Footer content={content.footer} />}>{children}</SectionPreview>
    </>
  );
}
