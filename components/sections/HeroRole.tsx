"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const ROLE_INTERVAL_MS = 2600;

export default function HeroRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const syncRotation = () => {
      window.clearInterval(timer);
      if (motionPreference.matches) return;
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % roles.length);
      }, ROLE_INTERVAL_MS);
    };

    syncRotation();
    motionPreference.addEventListener("change", syncRotation);
    return () => {
      window.clearInterval(timer);
      motionPreference.removeEventListener("change", syncRotation);
    };
  }, [roles.length]);

  const role = roles[index];

  return (
    <span aria-hidden="true">
      <span key={role} className={styles.role}>{role}<span className={styles.comma}>,</span></span>
    </span>
  );
}
