"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Ticker.module.css";

const SPEED_PX_PER_SECOND = 51;
const COPIES = 4;

/** Endless left-moving marquee at a constant measured speed. */
export default function Ticker({ children, gap }: { children: ReactNode; gap: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;
    const update = () => {
      track.style.animationDuration = `${group.getBoundingClientRect().width / SPEED_PX_PER_SECOND}s`;
    };
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.viewport}>
      <div ref={trackRef} className={styles.track}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} ref={copy === 0 ? groupRef : undefined} className={styles.group} style={{ gap, paddingRight: gap }} aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
