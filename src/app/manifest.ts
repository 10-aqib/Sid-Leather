import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SID Leather",
    short_name: "SID Leather",
    description: "Leather manufacturers and exporters, Karachi, Pakistan.",
    start_url: "/",
    display: "browser",
    background_color: "#f5f0e8",
    theme_color: "#211813",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
