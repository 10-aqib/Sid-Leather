import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, Check } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { IMAGES, allArticles, capabilities, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities — Crust, Finished, Aniline, Napa & More",
  description:
    "SID Leather produces crust and finished leather: upper, lining, drum dyed, gloving, aniline, semi-aniline, napa, milled and tumbled, on Italian and German machinery. Full article matrix by leather type.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing Capabilities"
        title={<>Skills across <em>every stage.</em></>}
        text="Crust and finished leather in a wide range of articles, produced on Italian and German machinery to the thickness and finish you specify."
        image={IMAGES.ochreBlack}
        crumbs={[{ label: "Capabilities", href: "/capabilities" }]}
      />

      <section className="section" aria-labelledby="cap-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>What we produce</p>
              <h2 id="cap-title" className="h2" data-reveal>Eight core <em>capabilities.</em></h2>
            </div>
            <p className="lead" data-reveal>
              Our strengths are goat, sheep, cow and buffalo leather articles, including crust and finished leather.
            </p>
          </div>
          <div className="cap-list">
            {capabilities.map((c, i) => (
              <div className="cap-item" key={c.name} data-reveal style={{ ["--d" as string]: (i % 2) * 120 }}>
                <span className="cap-item__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="cap-item__title">{c.name}</h3>
                  <p className="cap-item__text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="matrix-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Article matrix</p>
              <h2 id="matrix-title" className="h2" data-reveal>Articles by <em>leather type.</em></h2>
            </div>
            <p className="lead" data-reveal>
              Every leather is available as crust or finished. These are the articles we list for each type — ask us about
              anything not shown.
            </p>
          </div>
          <div className="matrix-wrap" data-reveal>
            <table className="matrix">
              <caption className="sr-only">Leather articles available for each leather type</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left" }}>Article</th>
                  {products.map((p) => (
                    <th scope="col" key={p.slug}>{p.short}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allArticles.map((a) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    {products.map((p) => {
                      const yes = p.articles.includes(a);
                      return (
                        <td key={p.slug} className={yes ? "yes" : "no"}>
                          {yes ? <Check aria-label={`${a} available in ${p.short}`} role="img" aria-hidden={false} /> : <span aria-label="Not listed">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="media-caption">
            Semi-aniline, milled and tumbled leather are part of our wider capabilities — contact us to confirm availability for a
            specific leather type.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="thick-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Thickness</p>
            <h2 id="thick-title" className="h2" data-reveal>Produced to <em>your substance.</em></h2>
            <p className="lead" data-reveal>Thickness depends on customer demand. These are our published ranges, in millimetres.</p>
          </div>
          <div className="grid grid--4">
            {products.map((p, i) => (
              <div key={p.slug} className="stack-sm" data-reveal style={{ ["--d" as string]: i * 100, paddingTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
                <h3 className="h4">{p.name}</h3>
                <p className="muted small">{p.thicknessSummary}</p>
                <div className="chips">
                  {p.thicknessRanges.map((t) => (
                    <span key={t} className="chip chip--mm">{t}</span>
                  ))}
                </div>
                <Link href={`/products/${p.slug}`} className="link-arrow mt-1" style={{ justifySelf: "start" }}>Specifications <ArrowRight /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark" aria-labelledby="tech-title">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow" data-reveal>Machinery &amp; technology</p>
            <h2 id="tech-title" className="h2" data-reveal>Italian and German <em>machinery.</em></h2>
            <p className="lead" data-reveal>
              Technology and innovation run through our tannery, which is equipped with Italian and German technology machinery.
              Continuous R&amp;D keeps our articles consistent and our deliveries on time.
            </p>
            <div className="btn-row" data-reveal>
              <Link href="/about#facilities" className="btn btn--ghost-light">Our facilities</Link>
              <Link href="/contact?type=quote" className="btn">Request a Quote <ArrowRight /></Link>
            </div>
          </div>
          <figure data-reveal="clip">
            <div className="media aspect-43">
              <Image src={IMAGES.drying.src} alt={IMAGES.drying.alt} fill sizes="(min-width: 960px) 50vw, 100vw" quality={75} data-parallax="0.05" />
            </div>
          </figure>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
