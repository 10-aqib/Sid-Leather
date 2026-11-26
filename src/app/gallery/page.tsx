import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Gallery — Leather Textures, Finished Leather & Production",
  description: "Photography from SID Leather: leather textures, finished leather, labelled development samples and production at our Karachi tannery.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Texture, colour <em>and craft.</em></>}
        text="Leather textures, finished articles and moments from production at our tannery in Karachi."
        image={IMAGES.pastelRolls}
        crumbs={[{ label: "Gallery", href: "/gallery" }]}
        compact
      />
      <section className="section section--tight" aria-label="Photo gallery">
        <div className="container">
          <Gallery />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
