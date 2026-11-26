// Single source of truth for verified company information (taken from the previous sidleather.com website).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sidleather.com").replace(/\/$/, "");

export const company = {
  name: "SID Leather",
  legalName: "Siddiqui's Leather",
  tagline: "Leather manufacturers and exporters",
  description:
    "SID Leather (Siddiqui's Leather) is a Karachi tannery manufacturing and exporting buffalo, cow, goat and sheep leather in crust and finished articles for footwear, handbags, garments, fashion and working gloves. Working since the 1990s.",
  since: "1990s",
  experience: "30+",
  phone: { display: "+92 311 1766354", href: "tel:+923111766354" },
  whatsapp: {
    number: "923111766354",
    href: (text = "Hello SID Leather, I would like to inquire about your leather.") =>
      `https://wa.me/923111766354?text=${encodeURIComponent(text)}`,
  },
  emails: {
    sales: "sales@sidleather.com",
    others: ["sidleather@gmail.com", "exportssidleather@gmail.com"],
  },
  wechat: "leathertannersiddiq",
  address: {
    street: "Plot No. 18, Sector 7A, Korangi Industrial Area",
    city: "Karachi",
    postalCode: "74900",
    country: "Pakistan",
    countryCode: "PK",
    full: "Plot No. 18, Sector 7A, Korangi Industrial Area, Karachi 74900, Pakistan",
  },
  hours: [
    { days: "Monday – Saturday", time: "8:00 am – 6:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursNote: "Pakistan Standard Time (UTC+5)",
  social: [
    { name: "Facebook", href: "https://www.facebook.com/siddiquisleather" },
    { name: "Instagram", href: "https://www.instagram.com/siddiquisleather/" },
  ],
  maps: {
    embed:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sPlot+18,+Sector+7A,+Korangi+Industrial+Area,+Karachi+74900,+Pakistan!6i15",
    link: "https://www.google.com/maps/search/?api=1&query=Plot%2018%2C%20Sector%207A%2C%20Korangi%20Industrial%20Area%2C%20Karachi%2074900%2C%20Pakistan",
  },
} as const;

export const markets = {
  asia: ["Vietnam", "Taiwan", "Thailand", "Cambodia", "China", "Hong Kong", "South Korea", "Indonesia", "Singapore"],
  europe: "Selected markets in Europe",
} as const;

export const vision = "Our top priority is customer satisfaction and long-term business relationships.";

export const mission = [
  "To build a business environment where suppliers, vendors and customers communicate freely and understand each other's needs.",
  "Manpower is a valuable asset for us, and their safety is our responsibility.",
  "To produce the best quality leather through continuous R&D and timely deliveries.",
];

export const materials = [
  "Our warehouse holds large inventories of wet blue, so orders can be met on time.",
  "We mainly use Pakistani-origin raw material for our leather production.",
  "Where a customer requires imported material, we use Arabic, African and European origins.",
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", mega: true },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Applications", href: "/applications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
