import type { Metadata } from "next";
import Link from "next/link";
import { appIcons } from "@/components/Applications";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { IMAGES, applicationOrder, applications, productsFor } from "@/lib/products";

export const metadata: Metadata = {
  title: "Applications — Leather for Footwear, Handbags, Garments, Fashion & Gloves",
  description:
    "Which SID Leather leathers suit footwear, handbags, garments, fashion and working gloves — buffalo, cow, goat and sheep leather in crust and finished articles.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title={<>Leather for <em>what you make.</em></>}
        text="We make leather specifically for footwear, garments, fashion, working gloves, handbags and other goods."
        image={IMAGES.taupe}
        crumbs={[{ label: "Applications", href: "/applications" }]}
        compact
      />

      <section className="section" aria-label="Applications">
        <div className="container" style={{ display: "grid", gap: 0 }}>
          {applicationOrder.map((key, i) => {
            const Icon = appIcons[key];
            const list = productsFor(key);
            return (
              <article
                key={key}
                id={key}
                className="split split--top"
                style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0", borderTop: "1px solid var(--line)", scrollMarginTop: "calc(var(--header-h) + 1rem)" }}
              >
                <div className="stack-sm" data-reveal>
                  <span className="cap-item__num">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="app__icon" />
                  <h2 className="h2">{applications[key].title}</h2>
                </div>
                <div className="stack" data-reveal style={{ ["--d" as string]: 120 }}>
                  <p className="body-lg">{applications[key].text}</p>
                  <div>
                    <p className="eyebrow eyebrow--plain mb-2">Suitable leathers</p>
                    <ul className="related" role="list" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
                      {list.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/products/${p.slug}`} className="link-arrow" style={{ width: "100%", justifyContent: "space-between" }}>
                            {p.name} <ArrowRight />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand title={<>Tell us about <em>your product.</em></>} />
    </>
  );
}
