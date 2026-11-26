import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { appIcons } from "@/components/Applications";
import { ArrowRight } from "@/components/Icons";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { applications, confirmOnRequest, getProduct, products } from "@/lib/products";
import { SITE_URL, company } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const description = `${p.name} from SID Leather, Karachi: ${p.types.join(" and ").toLowerCase()} leather, ${p.thicknessSummary}, in ${p.articles.slice(0, 5).join(", ")} and more. ${p.capacity.toLocaleString("en-US")} sq ft monthly capacity.`;
  return {
    title: `${p.name} — Crust & Finished`,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      type: "website",
      url: `/products/${p.slug}`,
      title: `${p.name} | SID Leather`,
      description,
      images: [{ url: p.banner.src, width: p.banner.width, height: p.banner.height, alt: p.banner.alt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const related = products.filter((x) => x.slug !== p.slug);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.intro,
    category: "Leather",
    material: `${p.animal} leather`,
    image: [p.hero, ...p.images].map((i) => `${SITE_URL}${i.src}`),
    url: `${SITE_URL}/products/${p.slug}`,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Thickness", value: p.thicknessSummary },
      { "@type": "PropertyValue", name: "Types", value: p.types.join(", ") },
      { "@type": "PropertyValue", name: "Articles", value: p.articles.join(", ") },
      ...p.sizes.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
      { "@type": "PropertyValue", name: "Production capacity", value: `${p.capacity.toLocaleString("en-US")} sq ft per month` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={`${p.types.join(" & ")} leather`}
        title={<>{p.name.replace(" Leather", "")} <em>Leather.</em></>}
        text={p.lead}
        image={p.banner}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: p.name, href: `/products/${p.slug}` },
        ]}
      >
        <dl className="facts-row">
          <div><dt>Thickness</dt><dd>{p.thicknessSummary}</dd></div>
          <div><dt>Supplied as</dt><dd>{p.types.join(" & ")}</dd></div>
          <div><dt>Articles</dt><dd>{p.articles.length} articles</dd></div>
          <div><dt>Capacity</dt><dd>{(p.capacity / 1_000_000).toFixed(1)}M sq ft / month</dd></div>
        </dl>
      </PageHero>

      {/* Introduction + imagery */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container split split--top">
          <div className="sticky-col stack">
            <p className="eyebrow" data-reveal>Introduction</p>
            <h2 id="intro-title" className="h2" data-reveal>{p.lead}</h2>
            <p className="body-lg" data-reveal>{p.intro}</p>
            <div className="btn-row" data-reveal>
              <a href="#inquiry" className="btn">Inquire about {p.short.toLowerCase()} leather <ArrowRight /></a>
              <Link href={`/contact?type=samples&product=${p.slug}`} className="btn btn--ghost">Request samples</Link>
            </div>
          </div>
          <div>
            <div className="product-gallery">
              {[p.hero, ...p.images].map((im, i) => (
                <figure key={im.src} className="media" data-reveal style={{ ["--d" as string]: i * 120 }}>
                  <Image src={im.src} alt={im.alt} fill sizes={i === 0 ? "(min-width: 960px) 45vw, 100vw" : "(min-width: 960px) 22vw, 50vw"} quality={75} />
                </figure>
              ))}
            </div>
            <p className="media-caption">
              Photography shows leather from SID Leather&rsquo;s production. Request physical samples to confirm the exact article,
              colour and feel.
            </p>
          </div>
        </div>
      </section>

      {/* Finishes & specifications */}
      <section className="section section--white" aria-labelledby="spec-title">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow" data-reveal>Specifications</p>
            <h2 id="spec-title" className="h2" data-reveal>Articles &amp; <em>finishes.</em></h2>
            <p className="body-lg" data-reveal>
              {p.types.join(" and ")} leather in the following articles. Thickness depends on customer demand and is produced within
              the ranges below.
            </p>
            <div className="note" data-reveal>
              <strong>Confirmed per inquiry</strong>
              <ul className="confirm-list">
                {confirmOnRequest.map((c) => (
                  <li key={c.label}>
                    <span>{c.label}</span>
                    <span>{c.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal>
            <table className="spec-table">
              <tbody>
                <tr>
                  <th scope="row">Supplied as</th>
                  <td><div className="chips">{p.types.map((t) => <span key={t} className="chip">{t} leather</span>)}</div></td>
                </tr>
                <tr>
                  <th scope="row">Articles</th>
                  <td><div className="chips">{p.articles.map((a) => <span key={a} className="chip">{a}</span>)}</div></td>
                </tr>
                <tr>
                  <th scope="row">Thickness ranges (mm)</th>
                  <td><div className="chips">{p.thicknessRanges.map((t) => <span key={t} className="chip chip--mm">{t}</span>)}</div></td>
                </tr>
                {p.sizes.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td>{s.value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Production capacity</th>
                  <td>{p.capacity.toLocaleString("en-US")} sq ft per month</td>
                </tr>
                <tr>
                  <th scope="row">Origin</th>
                  <td>Manufactured in Karachi, Pakistan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section section--dark on-dark" aria-labelledby="uses-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Applications</p>
            <h2 id="uses-title" className="h2" data-reveal>Where {p.short.toLowerCase()} leather <em>performs.</em></h2>
          </div>
          <div className="grid grid--3">
            {p.applications.map((key, i) => {
              const Icon = appIcons[key];
              return (
                <Link key={key} href={`/applications#${key}`} className="stack-sm" data-reveal style={{ ["--d" as string]: i * 100, paddingTop: "1.5rem", borderTop: "1px solid var(--line-light)" }}>
                  <Icon className="app__icon" />
                  <h3 className="h4">{applications[key].title}</h3>
                  <p className="muted small">{applications[key].text}</p>
                </Link>
              );
            })}
            {p.otherGoods && (
              <div className="stack-sm" data-reveal style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--line-light)" }}>
                <span className="h3" style={{ color: "var(--sand)" }} aria-hidden>+</span>
                <h3 className="h4">Other leather goods</h3>
                <p className="muted small">Tell us what you are making — we will advise on the right article and thickness.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section className="section" id="inquiry" aria-labelledby="inquiry-title">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow" data-reveal>Product inquiry</p>
            <h2 id="inquiry-title" className="h2" data-reveal>Inquire about <em>{p.name.toLowerCase()}.</em></h2>
            <p className="body-lg" data-reveal>
              Tell us the article, thickness, colours and quantity you need. Our sales team will reply with availability,
              samples and pricing.
            </p>
            <ul className="feature-list" data-reveal>
              <li><span>Phone: <a className="text-link" href={company.phone.href}>{company.phone.display}</a></span></li>
              <li><span>Email: <a className="text-link" href={`mailto:${company.emails.sales}?subject=${encodeURIComponent(p.name + " inquiry")}`}>{company.emails.sales}</a></span></li>
              <li><span>WhatsApp: <a className="text-link" href={company.whatsapp.href(`Hello SID Leather, I am interested in your ${p.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">Message us</a></span></li>
            </ul>
          </div>
          <div className="form-card" data-reveal>
            <InquiryForm defaultProduct={p.slug} compact />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section section--paper2" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="related-title" className="h2" data-reveal>Related <em>leathers.</em></h2>
            <div data-reveal><Link href="/products" className="link-arrow">All products <ArrowRight /></Link></div>
          </div>
          <div className="related">
            {related.map((r, i) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="related-card" data-reveal style={{ ["--d" as string]: i * 110 }}>
                <div className="media">
                  <Image src={r.hero.src} alt={r.hero.alt} fill sizes="(min-width: 760px) 30vw, 100vw" quality={70} />
                </div>
                <h3>{r.name}</h3>
                <p>{r.types.join(" & ")} · {r.thicknessSummary}</p>
                <span className="link-arrow" style={{ justifySelf: "start" }}>View {r.short.toLowerCase()} leather <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={productLd} />
    </>
  );
}
