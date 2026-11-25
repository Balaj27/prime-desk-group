import type page from "@/data/pages.json";
import styles from "./ContactChannels.module.css";

function EmailAddress({ address }: { address: string }) {
  const [mailbox, domain] = address.split("@");
  return <><span className={styles.emailPart}>{mailbox}@</span><wbr /><span className={styles.emailPart}>{domain}</span></>;
}

export default function ContactChannels({ content }: { content: typeof page.contact.channels }) {
  return (
    <section className={styles.card} aria-labelledby="contact-details-heading" data-scroll-group>
      <h2 id="contact-details-heading" className={styles.heading}>{content.heading}</h2>
      <dl className={styles.list}>
        {content.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.href ? (
                <a href={item.href}>
                  {item.href.startsWith("mailto:") ? <EmailAddress address={item.title} /> : item.title}
                </a>
              ) : item.title}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
