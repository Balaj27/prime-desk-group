import Image from "next/image";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import HeroRole from "./HeroRole";
import styles from "./Hero.module.css";

type Props = { content: typeof content.hero };

export default function Hero({ content: hero }: Props) {
  return (
    <section className={styles.banner}>
      <Image src={hero.portrait.src} alt={hero.portrait.alt} fill sizes="100vw" quality={85} priority className={styles.portrait} />
      <div className={styles.intro}>
        <h1 className={styles.headline} aria-label={`${hero.headline.prefix} ${hero.headline.roles[0]}, ${hero.headline.suffix}`}>
          {hero.headline.prefix} <HeroRole roles={hero.headline.roles} /> {hero.headline.suffix}
        </h1>
        <p className={styles.subhead}>{hero.subhead}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
          <Button href={hero.primaryCta.href} label={hero.primaryCta.label} variant="white" />
          <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="outline" />
        </div>
        <div className={styles.tags}>
          {hero.tags.map((tag) => (
            <a key={tag.label} href={tag.href} className={styles.tag}>
              {tag.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
