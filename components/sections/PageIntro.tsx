import StatementRow from "@/components/ui/StatementRow";
import styles from "./PageIntro.module.css";

export default function PageIntro({ content }: { content: { eyebrow: string; statement: string } }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <StatementRow eyebrow={content.eyebrow} statement={content.statement} />
      </div>
    </section>
  );
}
