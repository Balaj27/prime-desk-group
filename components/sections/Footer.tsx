import Image from "next/image";
import BrandLogo from "@/components/ui/BrandLogo";
import type content from "@/data/landing-page.json";
import styles from "./Footer.module.css";

type Props = { content: typeof content.footer };

export default function Footer({ content: footer }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandLogo name={footer.name} className={styles.logo} variant="light" />
            <p>{footer.description}</p>
          </div>
        </div>

        <div className={styles.columns} data-scroll-group>
          {footer.columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.columnTitle}>{column.title}</p>
              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={`${styles.column} ${styles.contactColumn}`}>
            <p className={styles.columnTitle}>{footer.contact.title}</p>
            <ul className={styles.contactList}>
              {footer.contact.items.map((item) => (
                <li key={item.label} className={styles.contactItem}>
                  <Image src={item.icon} alt="" width={40} height={40} unoptimized />
                  <div>
                    <a href={item.href}>{item.label}</a>
                    {item.note && <p>{item.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.copyright}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
