"use client";

import { useEffect, useRef, type ReactNode } from "react";

const groups = "article, figure, form, li, [data-scroll-group]";
const targets = `${groups}, h1, h2, h3, h4, p, img, a[href], button`;

export default function SectionPreview({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      let entered = 0;
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || !(target instanceof HTMLElement)) continue;
        target.style.setProperty("--scroll-delay", `${Math.min(entered, 3) * 40}ms`);
        target.classList.add("section-preview");
        observer.unobserve(target);
        entered++;
      }
    }, { rootMargin: "0px 0px -24px" });

    for (const target of rootRef.current?.querySelectorAll<HTMLElement>(targets) ?? []) {
      if (target.closest("[data-scroll-static], .hero-rise, .section-preview")) continue;
      if (target.parentElement?.closest(groups)) continue;
      if (target.matches("img") && target.closest("a, button")) continue;
      const bounds = target.getBoundingClientRect();
      // Animate upcoming content and leave the initial viewport readable.
      if (bounds.height > 0 && bounds.top >= window.innerHeight) observer.observe(target);
    }

    return () => observer.disconnect();
  }, [children, footer]);

  return (
    <div ref={rootRef}>
      <main>{children}</main>
      {footer}
    </div>
  );
}
