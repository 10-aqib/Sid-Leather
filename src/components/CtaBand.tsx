import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/site";
import { IMAGES } from "@/lib/products";
import { ArrowRight, WhatsApp } from "./Icons";

export function CtaBand({
  title = (
    <>
      Let&rsquo;s develop your <em>next leather article.</em>
    </>
  ),
  text = "Share your article, finish, thickness and quantity. Our sales team will come back to you with availability, samples and pricing.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="cta-band section" aria-labelledby="cta-title">
      <div className="cta-band__media">
        <Image src={IMAGES.pastelRolls.src} alt="" fill sizes="100vw" quality={70} />
      </div>
      <div className="container cta-band__inner">
        <div data-reveal>
          <p className="eyebrow">Start an inquiry</p>
          <h2 id="cta-title" className="h2 mt-2">{title}</h2>
        </div>
        <div data-reveal style={{ ["--d" as string]: 150 }}>
          <p className="lead" style={{ color: "rgba(245,240,232,.78)" }}>{text}</p>
          <div className="btn-row mt-3">
            <Link href="/contact?type=quote" className="btn">
              Request a Quote <ArrowRight />
            </Link>
            <a href={`mailto:${company.emails.sales}?subject=${encodeURIComponent("Sales inquiry")}`} className="btn btn--ghost-light">
              Contact Sales
            </a>
          </div>
          <div className="cta-band__contact">
            <a href={company.whatsapp.href()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: "0.6rem", alignItems: "center" }}>
              <WhatsApp width={18} height={18} /> WhatsApp {company.phone.display}
            </a>
            <a href={`mailto:${company.emails.sales}`}>{company.emails.sales}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
