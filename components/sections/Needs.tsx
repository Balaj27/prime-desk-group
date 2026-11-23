import type content from "@/data/landing-page.json";
import styles from "./Needs.module.css";

export default function Needs({ content: needs }: { content: typeof content.needs }) {
  return (
    <section className={styles.section} aria-labelledby="needs-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Who we work with</p>
        <h2 id="needs-heading" className="h1">
          {needs.heading} <span className={styles.emphasis}>{needs.emphasis}</span>
        </h2>
        <p className={`body18 ${styles.description}`}>{needs.description}</p>
        <ul className={styles.cards}>
          {needs.cards.map((card) => (
            <li key={card.title} className={`${styles.card} card-lift`}>
              <p className={styles.eyebrow}>{card.category}</p>
              <h3>{card.title}</h3>
              <p className={styles.detail}>{card.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
