import Image from "next/image";
import type content from "@/data/landing-page.json";
import styles from "./Process.module.css";

type Props = { content: typeof content.process };

export default function Process({ content: process }: Props) {
  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{process.eyebrow}</p>
          <h2 id="process-heading" className={`h1 ${styles.heading}`}>
            {process.heading} <span>{process.headingAccent}</span>
          </h2>
        </div>
        <ol className={styles.steps}>
          {process.steps.map((step) => (
            <li key={step.number} className={`${styles.step} card-lift`}>
              <div className={styles.image}>
                <Image src={step.image} alt={step.imageAlt} fill sizes="(max-width: 550px) 100vw, (max-width: 900px) 50vw, 285px" quality={85} />
              </div>
              <span className={styles.number} aria-hidden="true">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.responsibilities}>
          {process.responsibilities.map((part) => (
            <div key={part.title} className={styles.responsibility} data-scroll-group>
              <h3>{part.title}</h3>
              <p>{part.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
