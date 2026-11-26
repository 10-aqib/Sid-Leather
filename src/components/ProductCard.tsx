import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { applications } from "@/lib/products";
import { ArrowRight } from "./Icons";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const uses = product.applications.map((a) => applications[a].title).join(" · ");
  return (
    <Link href={`/products/${product.slug}`} className="product-card" data-reveal style={{ ["--d" as string]: index * 110 }}>
      <span className="product-card__media">
        <Image
          src={product.hero.src}
          alt={product.hero.alt}
          fill
          sizes="(min-width: 1180px) 25vw, (min-width: 700px) 50vw, 100vw"
          quality={75}
        />
      </span>
      <span className="product-card__top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{product.types.join(" & ")}</span>
      </span>
      <span className="product-card__body">
        <span className="product-card__title">{product.name}</span>
        <span className="product-card__text">{product.lead}</span>
        <span className="product-card__text">{uses}</span>
        <span className="product-card__meta">
          <span>{product.thicknessSummary}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Discover <ArrowRight />
          </span>
        </span>
      </span>
    </Link>
  );
}
