import Image from "next/image";
import type page from "@/data/pages.json";
import styles from "./Team.module.css";

type FounderContent = typeof page.about.founder;

function FounderPhoto({ founder }: { founder: FounderContent }) {
  return (
    <div className={styles.art} data-scroll-group>
      <Image src={founder.portrait} alt={`${founder.name} seated outdoors`} fill sizes="(max-width: 560px) 44vw, 245px" quality={85} />
    </div>
  );
}

export function Founder({ content }: { content: FounderContent }) {
  return (
    <section className={`${styles.section} ${styles.founder}`} aria-labelledby="founder-heading">
      <div className={`${styles.container} ${styles.founderLayout}`}>
        <FounderPhoto founder={content} />
        <div>
          <p className={styles.eyebrow}>From the founder</p>
          <h2 id="founder-heading" className={styles.founderName}>{content.name}</h2>
          <p className={styles.draft}>Draft quote for founder approval</p>
          <blockquote className={styles.quote} data-scroll-group>“{content.draftQuote}”</blockquote>
          <p className={`body18 ${styles.description}`}>{content.description}</p>
        </div>
      </div>
    </section>
  );
}

export default function Team({ content: team, founder }: { content: typeof page.about.team; founder: FounderContent }) {
  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Team</p>
          <h2 id="team-heading" className="h1">{team.heading} <span>{team.accent}</span></h2>
          <p className={`body18 ${styles.description}`}>{team.description}</p>
        </div>
        <ul className={styles.grid}>
          <li className={`${styles.role} card-lift`}>
            <FounderPhoto founder={founder} />
            <h3>{founder.name}</h3>
            <p>Founder</p>
          </li>
          {team.roles.map((role) => (
            <li key={role.title} className={`${styles.role} card-lift`}>
              <div className={styles.art} aria-hidden="true">{role.mark}</div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
