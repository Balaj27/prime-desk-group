"use client";

import Image from "next/image";
import { useState } from "react";
import type content from "@/data/landing-page.json";
import styles from "./Faq.module.css";

type Props = {
  content: typeof content.faq;
  placement?: "afterPricing" | "beforePricing" | "standalone" | "afterCards";
};

export default function Faq({ content: faq, placement = "afterPricing" }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(faq.tabs[0].items[0]);
  const visible = faq.tabs[tabIndex].items;

  return (
    <section className={styles.section} data-placement={placement}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="h1">{faq.heading}</h2>
          <p className={`body18 ${styles.description}`}>{faq.description}</p>
        </div>
        <div className={styles.tabs} role="tablist">
          {faq.tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={tabIndex === index}
              className={styles.tab}
              data-active={tabIndex === index}
              onClick={() => {
                setTabIndex(index);
                setOpenIndex(tab.items[0]);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.items}>
          {visible.map((itemIndex) => {
            const item = faq.items[itemIndex];
            const open = openIndex === itemIndex;
            const answerId = `faq-answer-${itemIndex}`;
            return (
              <div key={item.question} className={styles.item} data-open={open} data-scroll-group>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : itemIndex)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon}>
                    <Image src={open ? "/images/icon-minus.svg" : "/images/icon-plus.svg"} alt="" width={24} height={24} unoptimized />
                  </span>
                </button>
                <div id={answerId} aria-hidden={!open} className={styles.answerPanel}>
                  <div className={styles.answerClip}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
