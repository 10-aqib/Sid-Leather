// Shared inquiry validation, used by both the browser form and the API route.

export const PRODUCT_OPTIONS = [
  { value: "buffalo-leather", label: "Buffalo Leather" },
  { value: "cow-leather", label: "Cow Leather" },
  { value: "goat-leather", label: "Goat Leather" },
  { value: "sheep-leather", label: "Sheep Leather" },
  { value: "multiple", label: "Several types / not sure yet" },
] as const;

export const TYPE_OPTIONS = [
  { value: "quote", label: "Request a quote" },
  { value: "samples", label: "Request samples" },
  { value: "general", label: "General inquiry" },
] as const;

export type InquiryInput = {
  type: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

export const LIMITS = { name: 100, company: 120, email: 160, phone: 30, country: 80, quantity: 120, message: 4000 } as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+()\d\s.-]{6,30}$/;

const str = (v: unknown) => (typeof v === "string" ? v.replace(/\u0000/g, "").trim() : "");

export function normalise(raw: Record<string, unknown>): InquiryInput {
  return {
    type: str(raw.type) || "quote",
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email).toLowerCase(),
    phone: str(raw.phone),
    country: str(raw.country),
    product: str(raw.product),
    quantity: str(raw.quantity),
    message: str(raw.message),
  };
}

export function validate(d: InquiryInput): InquiryErrors {
  const e: InquiryErrors = {};
  if (!TYPE_OPTIONS.some((o) => o.value === d.type)) e.type = "Choose the type of inquiry.";
  if (d.name.length < 2) e.name = "Enter your full name.";
  else if (d.name.length > LIMITS.name) e.name = `Keep this under ${LIMITS.name} characters.`;
  if (d.company.length > LIMITS.company) e.company = `Keep this under ${LIMITS.company} characters.`;
  if (!d.email) e.email = "Enter your email address.";
  else if (d.email.length > LIMITS.email || !EMAIL_RE.test(d.email)) e.email = "Enter a valid email address, e.g. name@company.com.";
  if (d.phone && !PHONE_RE.test(d.phone)) e.phone = "Use digits, spaces and + only.";
  if (d.country.length < 2) e.country = "Enter your country.";
  else if (d.country.length > LIMITS.country) e.country = "Country name is too long.";
  if (!PRODUCT_OPTIONS.some((o) => o.value === d.product)) e.product = "Select the leather you are interested in.";
  if (d.quantity.length > LIMITS.quantity) e.quantity = `Keep this under ${LIMITS.quantity} characters.`;
  if (d.message.length < 10) e.message = "Tell us a little more (at least 10 characters).";
  else if (d.message.length > LIMITS.message) e.message = `Keep your message under ${LIMITS.message} characters.`;
  return e;
}

export const labelFor = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value;
