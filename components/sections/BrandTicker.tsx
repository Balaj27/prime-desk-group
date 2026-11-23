import Ticker from "@/components/ui/Ticker";
import styles from "./BrandTicker.module.css";

export default function BrandTicker({ items }: { items: string[] }) {
  return (
    <section className={styles.section} data-scroll-static>
      <Ticker gap={35}>
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className={styles.item}>
            <span className={styles.slash} aria-hidden="true">/</span>
            <span>{item}</span>
          </div>
        ))}
      </Ticker>
    </section>
  );
}
