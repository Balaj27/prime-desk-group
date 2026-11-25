import { site } from "@/lib/site";
import styles from "./LegalContent.module.css";

type TextBlock = { text: string } | { items: string[] };

type LegalPage = {
  heading: string;
  updated: string;
  intro: string;
  rows: { heading: string; blocks: TextBlock[] }[];
};

const links: Record<string, string> = {
  [site.email]: "mailto:" + site.email,
  [site.phoneDisplay]: "tel:" + site.phone,
  "Privacy Policy": "/privacy-policy",
};

function Prose({ text }: { text: string }) {
  return text.split(/(fareed\.huda@primedeskgroup\.com|\+1 \(832\) 819-8366|Privacy Policy)/g).map((part, index) => (
    Object.hasOwn(links, part) ? <a key={index} href={links[part]}>{part}</a> : part
  ));
}

export default function LegalContent({ content }: { content: LegalPage }) {
  const updated = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(content.updated));
  const sections = content.rows.map((row) => ({
    ...row,
    id: row.heading.toLowerCase().replace(/"/g, "").replaceAll(" ", "-"),
  }));

  return (
    <article className={styles.section} aria-labelledby="legal-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 id="legal-title" className={styles.heading}>{content.heading}</h1>
          <p className={styles.updated}>Last updated <time dateTime={content.updated}>{updated}</time></p>
          <p className={styles.intro}>{content.intro}</p>
        </header>

        <div className={styles.layout}>
          <nav className={styles.contents} aria-label="On this page">
            <p className={styles.contentsTitle}>On this page</p>
            <ul>
              {sections.map(({ heading, id }) => (
                <li key={id}><a href={"#" + id}>{heading}</a></li>
              ))}
            </ul>
          </nav>

          <div className={styles.body}>
            {sections.map(({ heading, id, blocks }) => (
              <section key={id} id={id} className={styles.row} aria-labelledby={id + "-heading"}>
                <h2 id={id + "-heading"}>{heading}</h2>
                {blocks.map((block, index) => "items" in block ? (
                  <ul key={index} className={styles.bullets}>
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <p key={index}><Prose text={block.text} /></p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
