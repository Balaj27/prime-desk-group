import Image from "next/image";

type Props = { name: string; className: string; variant?: "standard" | "light" };

export default function BrandLogo({ name, className, variant = "standard" }: Props) {
  return (
    <a href="/" className={className} aria-label={`${name} home`}>
      <Image src={variant === "light" ? "/logo-mark-light.svg" : "/logo-mark.svg"} alt="PD monogram" width={800} height={417} unoptimized />
      <span>{name}</span>
    </a>
  );
}
