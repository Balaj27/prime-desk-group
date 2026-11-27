"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Nav.module.css";

type Props = { content: typeof content.nav; overlay?: boolean };

export default function Nav({ content: nav, overlay = false }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;

    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlay]);

  return (
    <nav className={styles.nav} data-open={menuOpen} data-overlay={overlay} data-scrolled={scrolled} aria-label="Main">
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <Image src="/images/primedesk-logo.png" alt="" width={46} height={40} unoptimized />
          <span>{nav.name}</span>
        </a>

        <div className={styles.links}>
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <Button href={nav.cta.href} label={nav.cta.label} />
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={menuOpen}
          data-open={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.menu} data-open={menuOpen} aria-hidden={!menuOpen}>
        {nav.menuGroups.map((group) => (
          <div key={group.title} className={styles.menuGroup}>
            <p className={styles.groupTitle}>{group.title}</p>
            <div className={styles.menuGrid}>
              {group.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.menuLink} tabIndex={menuOpen ? 0 : -1}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
        <Button href={nav.cta.href} label={nav.cta.label} block />
      </div>
    </nav>
  );
}
