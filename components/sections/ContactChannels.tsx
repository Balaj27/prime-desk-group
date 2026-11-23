import type page from "@/data/pages.json";
import styles from "./ContactChannels.module.css";

export default function ContactChannels({ content }: { content: typeof page.contact.channels }) {
  return (
    <section className={styles.card} aria-label={content.heading} data-scroll-group>
      <dl className={styles.list}>
        {content.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</dd>
            {item.note && <dd className={styles.note}>{item.note}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}
