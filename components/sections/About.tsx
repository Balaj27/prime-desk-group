import type content from "@/data/landing-page.json";
import styles from "./About.module.css";

type Props = { content: typeof content.about };

export default function About({ content: about }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.locations}>
          {about.locations.map((location) => (
            <p key={location} className="body18">
              {location}
            </p>
          ))}
        </div>
        <p className={styles.statement}>{about.statement}</p>
      </div>
    </section>
  );
}
