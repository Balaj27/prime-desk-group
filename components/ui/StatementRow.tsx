import styles from "./StatementRow.module.css";

/** Small label beside a large scroll-revealed statement. */
export default function StatementRow({ eyebrow, statement }: { eyebrow: string; statement: string }) {
  return (
    <div className={styles.row}>
      <p className={`body18 ${styles.eyebrow}`}>{eyebrow}</p>
      <p className={styles.statement}>{statement}</p>
    </div>
  );
}
