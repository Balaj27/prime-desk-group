"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import BookingButton from "@/components/ui/BookingButton";
import type content from "@/data/landing-page.json";
import styles from "./Nav.module.css";

type Props = { content: typeof content.nav };

export default function Nav({ content: nav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const legal = nav.menuGroups.find((group) => group.title === "Legal");

  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 810px)");
    const onOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      buttonRef.current?.focus();
    };
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onOutsideClick);
    document.addEventListener("keydown", onEscape);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      aria-label="Main"
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}
    >
      <div className={styles.container}>
        <BrandLogo name={nav.name} className={styles.logo} />

        <div className={styles.links}>
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <BookingButton />
        </div>

        <button
          ref={buttonRef}
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Close menu" : "Menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen && "Close"}
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
        </button>
      </div>

      <div id="mobile-navigation" className={styles.menu} hidden={!menuOpen}>
        <ul className={styles.menuGrid}>
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.menuLink} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <BookingButton block />
        {legal && (
          <div className={styles.legal}>
            {legal.links.map((link) => (
              <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
