import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CapacityStats } from "@/components/CapacityStats";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/lib/products";
import { company, materials, mission, vision } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A Karachi Tannery Since the 1990s",
  description:
    "SID Leather (Siddiqui's Leather) has tanned leather in Korangi Industrial Area, Karachi since the 1990s. Our history, vision, mission, materials, process and Italian and German machinery.",
  alternates: { canonical: "/about" },
};

const process = [
  { title: "Raw material", text: "Large inventories of wet blue, mainly of Pakistani origin, with Arabic, African and European material used where a customer requires it." },
  { title: "Crust", text: "Wet blue is processed into crust leather — supplied as it is for customers who finish in-house, or taken forward to finishing." },
  { title: "Dyeing", text: "Leather is dyed to the required colour, including drum-dyed articles coloured through the substance." },
  { title: "Finishing", text: "Aniline, semi-aniline, napa, glazed, burnished, PU-finished, nubuck and buffed articles, to the customer's reference." },
  { title: "Milling & tumbling", text: "Mechanical softening for milled and tumbled articles with a relaxed hand and natural grain." },
  { title: "Selection", text: "Leather is sorted into selection grades and documented by reference, article, colour and thickness — as recorded on our labelled sample cards." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SID Leather"
        title={<>A tannery built on <em>three decades of craft.</em></>}
        text="Siddiqui's Leather has manufactured and exported leather from Korangi Industrial Area, Karachi, since the 1990s."
        image={IMAGES.brownNavy}
        crumbs={[{ label: "About Us", href: "/about" }]}
      />

      {/* History */}
      <section className="section" aria-labelledby="history-title">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow" data-reveal>Our history</p>
            <h2 id="history-title" className="h2" data-reveal>Working since the 1990s.</h2>
            <div className="prose body-lg" data-reveal>
              <p>
                We are manufacturers and exporters of goat, sheep, cow and buffalo leather — leather for shoes, handbags, garments,
                gloves and other goods.
              </p>
              <p>
                Our tannery has been working since the 1990s. With more than 30 years of experience, we have the expertise to
                produce the best quality leather, in crust and finished articles, for customers across Asia and Europe.
              </p>
            </div>
          </div>
          <div className="stack" data-reveal>
            <span className="big-figure">{company.experience}</span>
            <p className="eyebrow eyebrow--plain">Years of tanning experience</p>
            <hr className="stitch" />
            <dl className="grid grid--2" style={{ gap: "1.5rem" }}>
              <div><dt className="eyebrow eyebrow--plain">Location</dt><dd className="mt-1">Korangi Industrial Area, Karachi</dd></div>
              <div><dt className="eyebrow eyebrow--plain">Leathers</dt><dd className="mt-1">Buffalo, cow, goat &amp; sheep</dd></div>
              <div><dt className="eyebrow eyebrow--plain">Supplied as</dt><dd className="mt-1">Crust &amp; finished</dd></div>
              <div><dt className="eyebrow eyebrow--plain">Capacity</dt><dd className="mt-1">1.6M sq ft per month</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section section--dark on-dark" aria-labelledby="vision-title">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow" data-reveal>Our vision</p>
            <h2 id="vision-title" className="h2" data-reveal>
              Customer satisfaction and <em>long-term relationships.</em>
            </h2>
            <p className="lead" data-reveal>{vision}</p>
          </div>
          <div className="stack">
            <p className="eyebrow" data-reveal>Our mission</p>
            <ol className="process" style={{ gridTemplateColumns: "1fr" }} role="list">
              {mission.map((m, i) => (
                <li key={m} className="process__step" data-reveal style={{ ["--d" as string]: i * 110, borderLeft: 0, paddingLeft: 0 }}>
                  <span className="process__num">{String(i + 1).padStart(2, "0")}</span>
                  <p className="process__text" style={{ fontSize: "1.05rem" }}>{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section" aria-labelledby="materials-title">
        <div className="container split split--wide-right">
          <figure data-reveal="clip">
            <div className="media aspect-45">
              <Image src={IMAGES.crustStack.src} alt={IMAGES.crustStack.alt} fill sizes="(min-width: 960px) 40vw, 100vw" quality={75} data-parallax="0.05" />
            </div>
            <figcaption className="media-caption">Crust leather stacked at the tannery.</figcaption>
          </figure>
          <div className="stack">
            <p className="eyebrow" data-reveal>Materials sourcing</p>
            <h2 id="materials-title" className="h2" data-reveal>Stock on hand. <em>Origin by choice.</em></h2>
            <ul className="feature-list" data-reveal>
              {materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--paper2" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Manufacturing process</p>
              <h2 id="process-title" className="h2" data-reveal>From wet blue to <em>finished leather.</em></h2>
            </div>
            <p className="lead" data-reveal>How an order moves through the tannery — every stage tuned to the article you specify.</p>
          </div>
          <ol className="process" role="list">
            {process.map((s, i) => (
              <li key={s.title} className="process__step" data-reveal style={{ ["--d" as string]: (i % 3) * 110 }}>
                <span className="process__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="process__title">{s.title}</h3>
                <p className="process__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facilities & machinery */}
      <section className="section" id="facilities" aria-labelledby="facilities-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div className="stack-sm">
              <p className="eyebrow" data-reveal>Production facilities</p>
              <h2 id="facilities-title" className="h2" data-reveal>Italian and German <em>technology.</em></h2>
            </div>
            <div className="stack-sm" data-reveal>
              <p className="lead">
                Our tannery in Korangi Industrial Area is equipped with Italian and German technology machinery, and backed by
                continuous R&amp;D.
              </p>
            </div>
          </div>
          <div className="grid grid--2">
            <figure data-reveal>
              <div className="media" style={{ aspectRatio: "12 / 5" }}>
                <Image src={IMAGES.wetBlue.src} alt={IMAGES.wetBlue.alt} fill sizes="(min-width: 700px) 50vw, 100vw" quality={75} />
              </div>
              <figcaption className="media-caption">Wet blue stock — the starting point of every article.</figcaption>
            </figure>
            <figure data-reveal style={{ ["--d" as string]: 120 }}>
              <div className="media" style={{ aspectRatio: "12 / 5" }}>
                <Image src={IMAGES.drying.src} alt={IMAGES.drying.alt} fill sizes="(min-width: 700px) 50vw, 100vw" quality={75} />
              </div>
              <figcaption className="media-caption">Dyed skins drying after colouring.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="section section--leather on-dark" aria-labelledby="capacity-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow" data-reveal>Production capacity</p>
            <h2 id="capacity-title" className="h2" data-reveal>0.4 million sq ft, <em>per leather, per month.</em></h2>
          </div>
          <CapacityStats />
        </div>
      </section>

      {/* Quality */}
      <section className="section" aria-labelledby="quality-title">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow" data-reveal>Quality</p>
            <h2 id="quality-title" className="h2" data-reveal>Every development, <em>on record.</em></h2>
            <p className="body-lg" data-reveal>
              Our development samples carry a labelled card recording the reference number, animal, article, colour, thickness,
              size range and selection grade — so what you approve is what we produce.
            </p>
            <div className="note" data-reveal>
              <strong>Certificates and test reports</strong>
              <span>
                Please ask our sales team for any compliance documents or laboratory test reports your market requires. Availability
                is confirmed per order.
              </span>
            </div>
            <div data-reveal>
              <Link href="/contact?type=samples" className="link-arrow">Request samples <ArrowRight /></Link>
            </div>
          </div>
          <div className="grid grid--2" style={{ gap: "1rem" }}>
            <figure className="media aspect-45" data-reveal>
              <Image src={IMAGES.sheepFinished.src} alt={IMAGES.sheepFinished.alt} fill sizes="(min-width: 960px) 22vw, 50vw" quality={75} />
            </figure>
            <figure className="media aspect-45" data-reveal style={{ ["--d" as string]: 120, marginTop: "3rem" }}>
              <Image src={IMAGES.sheepCrust.src} alt={IMAGES.sheepCrust.alt} fill sizes="(min-width: 960px) 22vw, 50vw" quality={75} />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
