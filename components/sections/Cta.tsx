import Image from "next/image";
import BookingButton from "@/components/ui/BookingButton";
import Button from "@/components/ui/Button";
import type content from "@/data/landing-page.json";
import styles from "./Cta.module.css";

type Props = { content: typeof content.cta; portfolioHref?: string; variant?: "standard" | "banner" };

export default function Cta({ content: cta, portfolioHref, variant = "standard" }: Props) {
  const banner = variant === "banner";

  return (
    <section className={styles.section} data-variant={variant}>
      {!banner && (
        <div className={styles.shape}>
          <Image src={cta.image} alt="" fill sizes="(max-width: 361px) calc(100vw - 40px), 321px" quality={85} />
        </div>
      )}
      <div className={styles.title}>
        <h2 className="h1">{cta.heading}</h2>
        {cta.description && (
          <p className={`body18 ${styles.description}`}>{cta.description}</p>
        )}
        <div className={styles.button}>
          <BookingButton variant={banner ? "white" : "red"} />
          {portfolioHref && (
            banner ? (
              <Button href={portfolioHref} label="Download our portfolio (PDF)" variant="outline" download />
            ) : (
              <a className={styles.portfolio} href={portfolioHref} download>
                Download our portfolio <span>(PDF)</span>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
