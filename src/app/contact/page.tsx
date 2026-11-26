import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Chat, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/lib/products";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Contact SID Leather in Korangi Industrial Area, Karachi. Request a quote or samples for buffalo, cow, goat and sheep leather. Phone and WhatsApp +92 311 1766354, sales@sidleather.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Start a conversation <em>with our sales team.</em></>}
        text="Request a quote or samples, or ask us anything about our leather. We reply to every inquiry."
        image={IMAGES.hero}
        crumbs={[{ label: "Contact", href: "/contact" }]}
        compact
      />

      <section className="section" aria-label="Contact details and inquiry form">
        <div className="container contact-grid">
          <div className="stack">
            <p className="eyebrow" data-reveal>Direct contact</p>
            <h2 className="h3" data-reveal>Talk to us directly.</h2>
            <ul className="contact-list" data-reveal>
              <li>
                <span className="contact-list__icon"><Phone /></span>
                <div>
                  <h3>Phone</h3>
                  <a href={company.phone.href}>{company.phone.display}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon"><WhatsApp /></span>
                <div>
                  <h3>WhatsApp</h3>
                  <a href={company.whatsapp.href()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp — {company.phone.display}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon"><Mail /></span>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${company.emails.sales}`}>{company.emails.sales}</a>
                  {company.emails.others.map((e) => (
                    <div key={e}><a href={`mailto:${e}`}>{e}</a></div>
                  ))}
                </div>
              </li>
              <li>
                <span className="contact-list__icon"><Chat /></span>
                <div>
                  <h3>WeChat</h3>
                  <p>ID: {company.wechat}</p>
                </div>
              </li>
              <li>
                <span className="contact-list__icon"><Pin /></span>
                <div>
                  <h3>Tannery</h3>
                  <address style={{ fontStyle: "normal" }}>
                    {company.address.street}
                    <br />
                    {company.address.city} {company.address.postalCode}, {company.address.country}
                  </address>
                  <a className="text-link small" href={company.maps.link} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon"><Clock /></span>
                <div>
                  <h3>Business hours</h3>
                  {company.hours.map((h) => (
                    <p key={h.days}>{h.days}: {h.time}</p>
                  ))}
                  <p className="muted small">{company.hoursNote}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="form-card" id="inquiry" data-reveal style={{ ["--d" as string]: 120 }}>
            <p className="eyebrow">Inquiry form</p>
            <h2 className="h3 mt-1 mb-2">Request a quote or samples</h2>
            <Suspense fallback={<InquiryForm />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section section--tight section--paper2" aria-labelledby="map-title">
        <div className="container">
          <div className="section-head section-head--split" style={{ marginBottom: "2rem" }}>
            <h2 id="map-title" className="h3" data-reveal>Find the tannery</h2>
            <p className="muted" data-reveal>{company.address.full}</p>
          </div>
          <div className="map-embed" data-reveal="fade">
            <iframe
              src={company.maps.embed}
              title="Map showing SID Leather, Korangi Industrial Area, Karachi"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
