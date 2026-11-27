import Reveal from "@/components/ui/Reveal";
import Ticker from "@/components/ui/Ticker";
import type content from "@/data/landing-page.json";
import styles from "./Clients.module.css";

type Props = {
  content: typeof content.clients;
  /** Keeps the tablet layout up to 1440px instead of 1200px, as inner pages do. */
  tabletUntil1440?: boolean;
};

export default function Clients({ content: clients, tabletUntil1440 = false }: Props) {
  return (
    <section className={styles.section} data-tablet-until-1440={tabletUntil1440}>
      <Reveal className={styles.header}>
        <h2 className={`h1 ${styles.heading}`}>{clients.heading}</h2>
      </Reveal>
      <Ticker gap={20}>
        {clients.cards.map(({ label, icon }) => (
          <div key={label} className={styles.block}>
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </Ticker>
    </section>
  );
}
