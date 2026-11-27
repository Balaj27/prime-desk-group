import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import type content from "@/data/landing-page.json";
import styles from "./About.module.css";

type Props = { content: typeof content.about };

export default function About({ content: about }: Props) {
  return (
    <section className={styles.section}>
      <Reveal className={styles.container}>
        <RevealText text={about.statement} className={styles.statement} viewportEnd={0.4} />
      </Reveal>
    </section>
  );
}
