import Image from "next/image";
import styles from "./ClientLogos.module.css";

type ClientLogo = { name: string; src: string };

export default function ClientLogos({ logos }: { logos: ClientLogo[] }) {
  if (logos.length < 4) return null;

  return (
    <section className={styles.section} aria-labelledby="client-logos-heading">
      <h2 id="client-logos-heading">Businesses we work with</h2>
      <ul className={styles.logos}>
        {logos.map(({ name, src }) => (
          <li key={name}>
            <Image src={src} alt={name} width={144} height={56} unoptimized />
          </li>
        ))}
      </ul>
    </section>
  );
}
