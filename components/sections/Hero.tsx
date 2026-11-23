import Image from "next/image";
import BookingButton from "@/components/ui/BookingButton";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Hero.module.css";

type Props = { content: typeof content.hero };

export default function Hero({ content: hero }: Props) {
  return (
    <section className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>{hero.eyebrowLeft} · {hero.eyebrowRight}</p>
        <h1 id="hero-heading" className={`h1 hero-rise ${styles.headline}`}>
          {hero.headlineLines.map((line, index) => (
            <span key={index} className={styles.headlineLine}>
              {index > 0 && " "}
              {line.text}
              {line.accent && <span className={styles.headlineAccent}>{line.text && " "}{line.accent}</span>}
            </span>
          ))}
        </h1>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={`body18 ${styles.description}`}>{hero.description}</p>
            <div className={styles.actions}>
              <BookingButton className={styles.action} />
              <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="planLight" className={styles.action} />
            </div>
          </div>
          <div className={styles.visual} data-scroll-group>
            <div className={styles.picture}>
              <Image src={hero.portrait.src} alt={hero.portrait.alt} fill sizes="(max-width: 660px) 100vw, (max-width: 745px) 190px, (max-width: 1099px) 26vw, (max-width: 1590px) 22vw, 350px" quality={85} preload />
            </div>
            <div className={styles.checklist}>
              <p className={styles.checklistTitle}>{hero.checklist.heading}</p>
              <ul>
                {hero.checklist.items.map((item) => (
                  <li key={item}><span aria-hidden="true">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
