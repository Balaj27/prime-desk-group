import type pages from "@/data/pages.json";
import styles from "./WhyPrimeDesk.module.css";

export default function WhyPrimeDesk({ content }: { content: typeof pages.about.different }) {
  return (
    <section className={styles.section} aria-labelledby="why-primedesk-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className="h1" id="why-primedesk-heading">
          {content.heading} <span>{content.accent}</span>
        </h2>
        <p className={`body18 ${styles.description}`}>{content.description}</p>
        <ol className={styles.values}>
          {content.items.map((value, index) => (
            <li key={value.title} className={`${styles.value} card-lift`}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
