import Link from "next/link";
import { company } from "@/lib/site";
import { products } from "@/lib/products";
import { Logo } from "./Logo";
import { Facebook, Instagram } from "./Icons";

const socialIcon = { Facebook, Instagram } as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            {company.legalName} — manufacturers and exporters of buffalo, cow, goat and sheep leather. A Karachi tannery working
            since the {company.since}.
          </p>
          <div className="footer-social">
            {company.social.map((s) => {
              const Icon = socialIcon[s.name as keyof typeof socialIcon];
              return (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`SID Leather on ${s.name}`}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-col">
          <h2>Leather</h2>
          <ul>
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li><Link href="/capabilities">Capabilities</Link></li>
            <li><Link href="/applications">Applications</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h2>Company</h2>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/contact?type=quote">Request a Quote</Link></li>
            <li><Link href="/contact?type=samples">Request Samples</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <address>
            {company.address.street}
            <br />
            {company.address.city} {company.address.postalCode}, {company.address.country}
          </address>
          <ul className="mt-2">
            <li><a href={company.phone.href}>{company.phone.display}</a></li>
            <li><a href={`mailto:${company.emails.sales}`}>{company.emails.sales}</a></li>
            {company.emails.others.map((e) => (
              <li key={e}><a href={`mailto:${e}`}>{e}</a></li>
            ))}
            <li>WeChat ID: {company.wechat}</li>
          </ul>
          <div className="footer-hours">
            {company.hours.map((h) => (
              <span key={h.days}>
                <span>{h.days}</span>
                <span>{h.time}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-word" aria-hidden>SID LEATHER</div>

      <div className="container footer-bottom">
        <span>© {year} {company.name} ({company.legalName}). All rights reserved.</span>
        <span>Korangi Industrial Area, Karachi, Pakistan</span>
      </div>
    </footer>
  );
}
