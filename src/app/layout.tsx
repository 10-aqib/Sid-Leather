import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { WhatsApp } from "@/components/Icons";
import { SITE_URL, company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SID Leather — Leather Manufacturers & Exporters, Karachi",
    template: "%s | SID Leather",
  },
  description: company.description,
  applicationName: "SID Leather",
  keywords: [
    "leather manufacturer Pakistan",
    "leather exporter Karachi",
    "buffalo leather",
    "cow leather",
    "goat leather",
    "sheep leather",
    "crust leather",
    "finished leather",
    "gloving leather",
    "footwear leather",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SID Leather",
    locale: "en_US",
    url: "/",
    title: "SID Leather — Leather Manufacturers & Exporters",
    description: company.description,
    images: [{ url: "/images/og-sid-leather.jpg", width: 1200, height: 630, alt: "Finished leather by SID Leather" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SID Leather — Leather Manufacturers & Exporters",
    description: company.description,
    images: ["/images/og-sid-leather.jpg"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#211813",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  alternateName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/images/og-sid-leather.jpg`,
  description: company.description,
  email: company.emails.sales,
  telephone: "+92-311-1766354",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+92-311-1766354",
      email: company.emails.sales,
      availableLanguage: ["English", "Urdu"],
    },
  ],
  sameAs: company.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>{children}</main>
        <Footer />
        <a
          href={company.whatsapp.href()}
          className="wa-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with SID Leather on WhatsApp"
        >
          <WhatsApp />
        </a>
        <Motion />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
