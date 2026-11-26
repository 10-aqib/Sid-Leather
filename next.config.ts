import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    qualities: [70, 75, 80],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  // Legacy URLs from the previous website, so existing links and search results keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/image-gallery.html", destination: "/gallery", permanent: true },
      { source: "/portfolio-single-type-list.html", destination: "/gallery", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
      { source: "/contactus/", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contactus.html", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/request-a-quote", destination: "/contact?type=quote", permanent: false },
    ];
  },
};

export default nextConfig;
