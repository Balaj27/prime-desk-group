"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollFrame } from "@/components/ui/useScrollFrame";
import styles from "./RevealText.module.css";

const VIEWPORT_START = 0.6;
const LOAD_MEASURE_DELAY_MS = 350;

type Props = {
  text: string;
  className?: string;
  /** Fraction of the viewport, measured from the top, where the highlight finishes. */
  viewportEnd?: number;
};

/** Darkens text one character at a time as it scrolls up the viewport. */
export default function RevealText({ text, className = "", viewportEnd = 0 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [revealed, setRevealed] = useState(0);
  const characters = text.split("");

  const update = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const start = window.innerHeight * VIEWPORT_START;
    const distance = window.innerHeight * (VIEWPORT_START - viewportEnd);
    const progress = Math.min(1, Math.max(0, (start - node.getBoundingClientRect().top) / distance));
    setRevealed(Math.ceil(characters.length * progress));
  }, [characters.length, viewportEnd]);

  useScrollFrame(update);

  // The original measures once while its load-in entrance is still moving the text.
  useEffect(() => {
    const timer = window.setTimeout(update, LOAD_MEASURE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [update]);

  return (
    <p ref={ref} className={`${styles.text} ${className}`}>
      <span className={styles.readerText}>{text}</span>
      <span aria-hidden="true">
        {characters.map((character, index) => (
          <span key={index} className={styles.character} data-on={index < revealed}>
            {character}
          </span>
        ))}
      </span>
    </p>
  );
}
