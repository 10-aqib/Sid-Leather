import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import type { Img } from "@/lib/products";
import { JsonLd } from "./JsonLd";

type Crumb = { label: string; href: string };

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  crumbs,
  compact,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  image: Img;
  crumbs: Crumb[];
  compact?: boolean;
  children?: ReactNode;
}) {
  const all = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className={`page-hero${compact ? " page-hero--compact" : ""}`}>
      <div className="page-hero__media">
        <Image src={image.src} alt="" fill priority sizes="100vw" quality={75} />
      </div>
      <div className="container page-hero__content">
        <nav className="breadcrumbs hero-in" aria-label="Breadcrumb">
          <ol>
            {all.map((c, i) => (
              <li key={c.href}>
                {i === all.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow hero-in mt-3" style={{ ["--i" as string]: 1 }}>{eyebrow}</p>
        <h1 className="h1 page-hero__title hero-in" style={{ ["--i" as string]: 2 }}>{title}</h1>
        {text && <p className="page-hero__text hero-in" style={{ ["--i" as string]: 3 }}>{text}</p>}
        {children && <div className="hero-in" style={{ ["--i" as string]: 4 }}>{children}</div>}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </section>
  );
}
