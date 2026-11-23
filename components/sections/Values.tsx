import type landing from "@/data/landing-page.json";
import styles from "./Values.module.css";

export default function Values({ content }: { content: typeof landing.values }) {
  return (
    <section className={styles.section} aria-labelledby="values-heading">
      <div className={styles.layout}>
        <header className={styles.header}>
          <p>Our approach</p>
          <h2 className="h1" id="values-heading">{content.heading}</h2>
        </header>
        <div className={styles.art} aria-hidden="true" data-scroll-group />
        <div className={styles.values}>
          {content.items.map(value => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
