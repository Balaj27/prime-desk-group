import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "red" | "white" | "outline" | "planLight" | "planDark" | "work" | "submit" | "dark" | "apply";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d="M 11 3.414 L 1.414 13 L 0 11.586 L 9.586 2 L 2.5 2 L 2.5 0 L 13 0 L 13 10.5 L 11 10.5 Z"
        fill="currentColor"
        transform="translate(5.5 5.5)"
      />
    </svg>
  );
}

type InnerProps = { label: string; arrow?: boolean };

function ButtonInner({ label, arrow = true }: InnerProps) {
  return (
    <>
      <span>{label}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          <Arrow />
        </span>
      )}
    </>
  );
}

type LinkProps = Pick<ComponentPropsWithoutRef<"a">, "target" | "rel" | "download" | "onClick" | "onAuxClick">;

type ButtonProps = LinkProps & {
  href?: string;
  label: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  block?: boolean;
  as?: "a" | "span" | "button";
  className?: string;
  children?: ReactNode;
};

export default function Button({ href, label, variant = "red", arrow = true, block, as = "a", className = "", ...linkProps }: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${block ? styles.block : ""} ${className}`;
  const inner = <ButtonInner label={label} arrow={arrow} />;
  if (as === "span") return <span className={classes}>{inner}</span>;
  if (as === "button")
    return (
      <button type="submit" className={classes}>
        {inner}
      </button>
    );
  return (
    <a href={href} className={classes} {...linkProps}>
      {inner}
    </a>
  );
}

