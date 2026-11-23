import type page from "@/data/pages.json";
import BookingButton from "@/components/ui/BookingButton";
import Button from "@/components/ui/Button";
import styles from "./ServicesHero.module.css";

type Props = { content: typeof page.services.hero };

export default function ServicesHero({ content: hero }: Props) {
  return (
    <section className={styles.section} aria-labelledby="services-hero-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="services-hero-heading" className={`h1 hero-rise ${styles.heading}`}>
          {hero.headlineLines.map((line, index) => (
            <span key={index} className={styles.line}>
              {index > 0 && " "}
              {line.text}
              {line.accent && <span className={styles.accent}>{line.text && " "}{line.accent}</span>}
            </span>
          ))}
        </h1>
        <p className={`body18 ${styles.description}`}>{hero.description}</p>
        <div className={styles.actions}>
          <BookingButton className={styles.action} />
          <Button className={styles.action} href="/PrimeDesk-Portfolio.pdf" label="Download our portfolio (PDF)" variant="planLight" download />
        </div>
      </div>
    </section>
  );
}
