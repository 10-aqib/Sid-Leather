"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./InquiryForm";

/** Reads ?type= and ?product= so "Request a Quote" / "Request samples" links pre-fill the form. */
export function ContactForm() {
  const params = useSearchParams();
  return <InquiryForm defaultType={params.get("type") ?? "quote"} defaultProduct={params.get("product") ?? ""} />;
}
