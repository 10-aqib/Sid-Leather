import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { IMAGES, applicationOrder, applications, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Leather Products — Buffalo, Cow, Goat & Sheep Leather",
  description:
    "Crust and finished buffalo, cow, goat and sheep leather from SID Leather, Karachi. Thickness ranges, hide and skin sizes, articles and applications for each type.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>The leather <em>collection.</em></>}
        text="Buffalo, cow, goat and sheep leather — each available as crust or finished, produced to the article, finish and thickness your product needs."
        image={IMAGES.pastelRolls}
        crumbs={[{ label: "Products", href: "/products" }]}
      />

      <section className="section section--dark on-dark" aria-label="Leather types">
        <div className="container">
          <div className="collection">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>At a glance</p>
              <h2 id="compare-title" className="h2" data-reveal>Compare <em>our leathers.</em></h2>
            </div>
            <p className="lead" data-reveal>
              Published thickness ranges, raw-material sizes and applications. Thickness is always produced to customer demand
              within these ranges.
            </p>
          </div>
          <div className="matrix-wrap" data-reveal>
            <table className="matrix">
              <caption className="sr-only">Comparison of SID Leather leather types</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left" }}>Leather</th>
                  <th scope="col">Thickness</th>
                  <th scope="col">Sizes</th>
                  {applicationOrder.filter((a) => a !== "fashion").map((a) => (
                    <th scope="col" key={a}>{applications[a].title}</th>
                  ))}
                  <th scope="col">Capacity / month</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row">
                      <Link href={`/products/${p.slug}`} className="text-link" style={{ borderBottom: 0 }}>{p.name}</Link>
                    </th>
                    <td className="nowrap">{p.thicknessSummary}</td>
                    <td style={{ fontSize: "0.85rem", minWidth: 170 }}>
                      {p.sizes.map((s) => (
                        <div key={s.label}>{s.label.replace(/ \(.*\)/, "")}: {s.value.replace("approx. ", "")}</div>
                      ))}
                    </td>
                    {applicationOrder.filter((a) => a !== "fashion").map((a) => (
                      <td key={a} className={p.applications.includes(a) ? "yes" : "no"}>
                        {p.applications.includes(a) ? <span aria-label="Yes">●</span> : <span aria-label="No">—</span>}
                      </td>
                    ))}
                    <td className="nowrap">400,000 sq ft</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row mt-3" data-reveal>
            <Link href="/capabilities" className="link-arrow">See all articles by leather type <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
