import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["", 1],
    ["/products", 0.9],
    ...products.map((p) => [`/products/${p.slug}`, 0.9] as [string, number]),
    ["/capabilities", 0.8],
    ["/applications", 0.7],
    ["/about", 0.7],
    ["/gallery", 0.6],
    ["/contact", 0.8],
  ];
  return pages.map(([path, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
