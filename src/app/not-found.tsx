import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/lib/products";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404 — Page not found"
      title={<>This page has <em>moved on.</em></>}
      text="The page you are looking for does not exist or has been moved. Try one of these instead."
      image={IMAGES.hero}
      crumbs={[{ label: "Not found", href: "/404" }]}
    >
      <div className="btn-row mt-3">
        <Link href="/" className="btn">Back to home <ArrowRight /></Link>
        <Link href="/products" className="btn btn--ghost-light">Our products</Link>
        <Link href="/contact" className="btn btn--ghost-light">Contact</Link>
      </div>
    </PageHero>
  );
}
