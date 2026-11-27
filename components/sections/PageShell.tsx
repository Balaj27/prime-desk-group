import type { ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import content from "@/data/landing-page.json";

export default function PageShell({ children, overlayNav = false }: { children: ReactNode; overlayNav?: boolean }) {
  return (
    <>
      <Nav content={content.nav} overlay={overlayNav} />
      <main>{children}</main>
      <Footer content={content.footer} />
    </>
  );
}
