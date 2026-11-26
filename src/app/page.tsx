import Image from "next/image";
import Link from "next/link";
import { ApplicationsGrid } from "@/components/Applications";
import { CapacityStats } from "@/components/CapacityStats";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { MarketsMap } from "@/components/MarketsMap";
import { ProductCard } from "@/components/ProductCard";
import { IMAGES, capabilities, products } from "@/lib/products";
import { company, materials } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Image src={IMAGES.hero.src} alt={IMAGES.hero.alt} fill priority sizes="100vw" quality={75} />
        </div>
        <div className="container hero__content">
          <p className="eyebrow hero-in" style={{ ["--i" as string]: 0 }}>
            Leather manufacturers &amp; exporters · Karachi, Pakistan
          </p>
          <h1 id="hero-title" className="display hero__title">
            <span className="hero-in" style={{ display: "block", ["--i" as string]: 1 }}>Crafted by Nature.</span>
            <em className="hero-in" style={{ display: "block", ["--i" as string]: 2 }}>Refined by Expertise.</em>
          </h1>
          <p className="hero__text hero-in" style={{ ["--i" as string]: 3 }}>
            Since the 1990s, our Korangi tannery has produced buffalo, cow, goat and sheep leather in crust and finished
            articles — for footwear, handbags, garments, fashion and working gloves.
          </p>
          <div className="btn-row hero__ctas hero-in" style={{ ["--i" as string]: 4 }}>
            <Link href="/products" className="btn">
              Explore Products <ArrowRight />
            </Link>
            <Link href="/contact?type=quote" className="btn btn--ghost-light">
              Request a Quote
            </Link>
          </div>
          <dl className="hero__facts hero-in" style={{ ["--i" as string]: 5 }}>
            <div className="hero__fact"><dt>{company.experience} years</dt><dd>Tanning since the {company.since}</dd></div>
            <div className="hero__fact"><dt>4 leathers</dt><dd>Buffalo · Cow · Goat · Sheep</dd></div>
            <div className="hero__fact"><dt>1.6M sq ft</dt><dd>Combined monthly capacity</dd></div>
            <div className="hero__fact"><dt>Italian &amp; German</dt><dd>Machinery &amp; technology</dd></div>
          </dl>
        </div>
      </section>

      {/* 2 — Introduction */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container split split--wide-right">
          <div className="editorial" data-reveal="fade">
            <div className="editorial__main media">
              <Image
                src={IMAGES.sheepFinished.src}
                alt={IMAGES.sheepFinished.alt}
                fill
                sizes="(min-width: 960px) 40vw, 80vw"
                quality={75}
                data-parallax="0.06"
              />
            </div>
            <div className="editorial__inset media">
              <Image src={IMAGES.drying.src} alt={IMAGES.drying.alt} fill sizes="(min-width: 960px) 30vw, 60vw" quality={75} />
            </div>
            <div className="editorial__badge">
              <strong>30+</strong>
              <span>Years of tanning</span>
            </div>
          </div>
          <div className="stack">
            <p className="eyebrow" data-reveal>Introduction &amp; History</p>
            <h2 id="intro-title" className="h2" data-reveal>
              Three decades of turning hides and skins into <em>dependable leather.</em>
            </h2>
            <div className="prose body-lg" data-reveal>
              <p>
                SID Leather — Siddiqui&rsquo;s Leather — manufactures and exports goat, sheep, cow and buffalo leather. Our tannery
                has been working since the 1990s, and over more than 30 years we have built the expertise to produce leather of
                consistent, high quality.
              </p>
              <p>
                We supply crust and finished leather for shoes, handbags, garments, gloves and other leather goods, produced to each
                customer&rsquo;s article, finish and thickness.
              </p>
            </div>
            <div className="btn-row mt-1" data-reveal>
              <Link href="/about" className="link-arrow">
                Our story <ArrowRight />
              </Link>
              <Link href="/capabilities" className="link-arrow">
                Capabilities <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Collection */}
      <section className="section section--dark on-dark" aria-labelledby="collection-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>The Collection</p>
              <h2 id="collection-title" className="h2" data-reveal>Four leathers. <em>One standard.</em></h2>
            </div>
            <p className="lead" data-reveal>
              Each type is available as crust or finished leather, in the thickness your product needs. Explore the articles,
              sizes and specifications for each.
            </p>
          </div>
          <div className="collection">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Capabilities */}
      <section className="section" aria-labelledby="cap-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Manufacturing Capabilities</p>
              <h2 id="cap-title" className="h2" data-reveal>From crust to <em>finished leather.</em></h2>
            </div>
            <div className="stack-sm" data-reveal>
              <p className="lead">
                We have the skills to produce a wide range of articles — upper, lining, drum dyed, gloving, aniline, semi-aniline,
                napa, milled and tumbled leather.
              </p>
              <div><Link href="/capabilities" className="link-arrow">Full capability matrix <ArrowRight /></Link></div>
            </div>
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

      {/* 5 — Capacity */}
      <section className="section section--leather on-dark" aria-labelledby="capacity-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Production Capacity</p>
              <h2 id="capacity-title" className="h2" data-reveal>Capacity for <em>serious volume.</em></h2>
            </div>
            <p className="lead" data-reveal>
              0.4 million square feet per month for each of our four leather types — 1.6 million square feet of leather
              every month, combined.
            </p>
          </div>
          <CapacityStats />
        </div>
      </section>

      {/* 6 — Applications */}
      <section className="section" aria-labelledby="apps-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Applications</p>
              <h2 id="apps-title" className="h2" data-reveal>Made for <em>what you make.</em></h2>
            </div>
            <div className="stack-sm" data-reveal>
              <p className="lead">We make leather specifically for footwear, garments, fashion, working gloves, handbags and other goods.</p>
              <div><Link href="/applications" className="link-arrow">Explore applications <ArrowRight /></Link></div>
            </div>
          </div>
          <ApplicationsGrid />
        </div>
      </section>

      {/* 7 — Technology */}
      <section className="section section--paper2" aria-labelledby="tech-title">
        <div className="container split split--wide-left">
          <div className="stack">
            <div className="media aspect-125" data-reveal="clip">
              <Image src={IMAGES.wetBlue.src} alt={IMAGES.wetBlue.alt} fill sizes="(min-width: 960px) 55vw, 100vw" quality={75} data-parallax="0.05" />
            </div>
            <div className="grid grid--2">
              <figure data-reveal>
                <div className="media aspect-43">
                  <Image src={IMAGES.crustStack.src} alt={IMAGES.crustStack.alt} fill sizes="(min-width: 960px) 27vw, 50vw" quality={75} />
                </div>
                <figcaption className="media-caption">Crust leather, ready for finishing</figcaption>
              </figure>
              <figure data-reveal style={{ ["--d" as string]: 120 }}>
                <div className="media aspect-43">
                  <Image src={IMAGES.drying.src} alt={IMAGES.drying.alt} fill sizes="(min-width: 960px) 27vw, 50vw" quality={75} />
                </div>
                <figcaption className="media-caption">Dyed skins drying at the tannery</figcaption>
              </figure>
            </div>
          </div>
          <div className="stack">
            <p className="eyebrow" data-reveal>Technology &amp; Innovation</p>
            <h2 id="tech-title" className="h2" data-reveal>Italian and German <em>machinery.</em></h2>
            <p className="body-lg" data-reveal>
              Our tannery is equipped with Italian and German technology machinery, supported by continuous R&amp;D and a team
              that has worked with leather for decades.
            </p>
            <ul className="feature-list" data-reveal>
              {materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <div data-reveal>
              <Link href="/about#facilities" className="link-arrow">Facilities &amp; process <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — International presence */}
      <section className="section section--dark on-dark" aria-labelledby="markets-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>International Presence</p>
              <h2 id="markets-title" className="h2" data-reveal>From Karachi to <em>Asia and Europe.</em></h2>
            </div>
            <p className="lead" data-reveal>
              We serve a wide region of Asia — from Vietnam and China to South Korea and Singapore — and parts of Europe.
            </p>
          </div>
          <MarketsMap />
        </div>
      </section>

      {/* 9 — Inquiry */}
      <CtaBand />
    </>
  );
}
