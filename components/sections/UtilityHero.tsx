import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./UtilityHero.module.css";

type Props = {
  image: string;
  heading: string;
  description: string;
  children: ReactNode;
};

/** Full-height centered message used by the Coming Soon and 404 pages. */
export default function UtilityHero({ image, heading, description, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <Image src={image} alt="" width={220} height={220} unoptimized priority />
        </div>
        <div className={styles.title}>
          <div>
            <h1 className="h1">{heading}</h1>
          </div>
          <div>
            <p className={`body18 ${styles.description}`}>{description}</p>
          </div>
        </div>
        <div className={styles.action}>
          {children}
        </div>
      </div>
    </section>
  );
}
