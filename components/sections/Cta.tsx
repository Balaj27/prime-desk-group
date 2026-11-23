import BookingButton from "@/components/ui/BookingButton";
import Button from "@/components/ui/Button";
import type landing from "@/data/landing-page.json";
import styles from "./Cta.module.css";

export default function Cta({ content }: { content: typeof landing.cta }) {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2 className="h1">{content.heading}</h2>
        {content.description && <p className={`body18 ${styles.description}`}>{content.description}</p>}
        <div className={styles.button}>
          <BookingButton variant="white" />
          <Button href="/PrimeDesk-Portfolio.pdf" label="Download our portfolio (PDF)" variant="outline" download />
        </div>
      </div>
    </section>
  );
}
