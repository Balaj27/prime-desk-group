import BookingButton from "@/components/ui/BookingButton";
import type page from "@/data/pages.json";
import styles from "./Impact.module.css";

type Props = { content: typeof page.about.impact; intro: typeof page.about.hero };

export default function Impact({ content: impact, intro }: Props) {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{intro.eyebrow}</p>
          <h1 id="about-heading" className={`h1 hero-rise ${styles.heading}`}>
            {impact.headlineLines.map((line, index) => (
              <span key={index} className={styles.line}>
                {index > 0 && " "}
                {line.text}
                {line.accent && <span className={styles.accent}>{line.text && " "}{line.accent}</span>}
              </span>
            ))}
          </h1>
          <div className={styles.copy}>
            <p className="body18">{intro.statement}</p>
            <div><BookingButton className={styles.action} /></div>
          </div>
        </div>

        <ul className={styles.stats}>
          {impact.stats.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
