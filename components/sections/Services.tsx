import Image from "next/image";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Services.module.css";

type Props = {
  content: typeof content.services;
  layout?: "illustrated" | "numbered" | "numbered-photos";
  intro?: { heading: string; accent: string; description: string };
};

export default function Services({ content: services, layout = "illustrated", intro }: Props) {
  const numbered = layout !== "illustrated";
  const showPhotos = layout !== "numbered";
  const heading = intro?.heading ?? (numbered ? "Everything your business needs to be" : services.heading);
  const accent = intro?.accent ?? (numbered ? "marketed, built, presented, and staffed." : undefined);

  return (
    <section className={styles.section} data-layout={layout} aria-labelledby="services-heading">
      {numbered && <p className={styles.eyebrow}>{services.heading}</p>}
      <h2 id="services-heading" className="h1">
        {heading}{accent && <> <span className={styles.accent}>{accent}</span></>}
      </h2>
      {intro && <p className={`body18 ${styles.intro}`}>{intro.description}</p>}
      <div className={styles.rows}>
        {services.items.map((item) => (
          <article key={item.id} id={item.id} className={`${styles.row} card-lift`}>
            {numbered && <span className={styles.number} aria-hidden="true">{item.number}</span>}
            <div className={styles.label}>
              <p className={styles.serviceName}>
                {layout === "numbered-photos" && <span aria-hidden="true">{item.number} · </span>}
                {item.title}
              </p>
              <h3>{item.outcome}</h3>
              <p>{item.summary}</p>
              <Button href={`/contact?service=${encodeURIComponent(item.contactOption)}`} label="Book a call about this" variant={numbered ? "planLight" : "red"} />
            </div>
            <ul className={styles.offerings}>
              {item.offerings.map((offering) => <li key={offering}>{offering}</li>)}
            </ul>
            {showPhotos && (
              <div className={styles.picture}>
                <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 650px) 80vw, (max-width: 950px) 33vw, 265px" quality={85} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
