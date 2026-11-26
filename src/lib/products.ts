// Product data. Every specification below is taken from SID Leather's published product information.
// Anything not published is listed under `confirmOnRequest` and never presented as fact.

export type ApplicationKey = "footwear" | "handbags" | "garments" | "fashion" | "gloves";

export type Img = { src: string; alt: string; width: number; height: number };

export type Product = {
  slug: string;
  name: string;
  short: string;
  animal: string;
  intro: string;
  lead: string;
  applications: ApplicationKey[];
  otherGoods: boolean;
  types: string[];
  articles: string[];
  thicknessRanges: string[];
  thicknessSummary: string;
  sizes: { label: string; value: string }[];
  capacity: number; // square feet per month
  hero: Img;
  /** Wide, high-resolution image for the page banner. */
  banner: Img;
  images: Img[];
};

export const CAPACITY_PER_TYPE = 400_000;

const img = (src: string, alt: string, width: number, height: number): Img => ({ src: `/images/${src}`, alt, width, height });

export const IMAGES = {
  hero: img("hero-dark-finished-leather.jpg", "Soft black finished leather with natural grain", 2400, 1366),
  brownNavy: img("leather-brown-navy-finished.jpg", "Brown and navy finished leather, grain side", 1800, 1318),
  taupe: img("leather-taupe-soft-finished.jpg", "Soft taupe finished leather draped in folds", 1800, 1350),
  ochreBlack: img("leather-ochre-black-finished.jpg", "Ochre and black finished leather sides", 1800, 1200),
  pastelRolls: img("leather-pastel-rolls.jpg", "Finished leather in blush, black, tan and teal", 1800, 1350),
  royalBlue: img("leather-royal-blue.jpg", "Royal blue finished leather", 600, 770),
  sheepCrust: img("sheep-upper-crust-swatches.jpg", "Labelled SID Leather sample cards for sheep upper crust in black, red and yellow", 600, 770),
  ivory: img("leather-ivory-soft.jpg", "Soft ivory leather", 600, 770),
  sheepFinished: img("sheep-upper-finished-swatches.jpg", "Labelled SID Leather sample cards for sheep upper finished leather", 600, 770),
  blackSoft: img("leather-black-soft-hand.jpg", "Hand testing the softness of black leather", 600, 770),
  greyTextured: img("leather-grey-textured.jpg", "Grey leather with a textured, milled surface", 600, 770),
  colourStack: img("leather-colour-stack.jpg", "Stack of finished leather in teal, magenta, navy and white", 600, 770),
  crustStack: img("crust-leather-stack.jpg", "Stacked crust leather at the tannery", 600, 770),
  wetBlue: img("wet-blue-stock.jpg", "Wet blue stock being handled at the tannery", 1200, 500),
  drying: img("dyed-skins-drying.jpg", "Red dyed skins hanging to dry at the tannery", 1200, 500),
} as const;

export const products: Product[] = [
  {
    slug: "buffalo-leather",
    name: "Buffalo Leather",
    short: "Buffalo",
    animal: "buffalo",
    lead: "Our heaviest substance, built for structure and wear.",
    intro:
      "We produce buffalo leather for footwear, handbags and garments, using both full hides and half-hide sides. Leather thickness is produced to customer demand, from 0.9 mm up to 2.0 mm.",
    applications: ["footwear", "handbags", "garments"],
    otherGoods: false,
    types: ["Finished", "Crust"],
    articles: ["Upper", "Drum Dyed", "Aniline", "Glazed", "PU Finished", "Milled Plated", "Milled Natural", "Nubuck", "Buffed"],
    thicknessRanges: ["0.9–1.1", "1.0–1.2", "1.1–1.3", "1.2–1.4", "1.3–1.5", "1.4–1.6", "1.5–1.7", "1.6–1.8", "1.8–2.0"],
    thicknessSummary: "0.9 – 2.0 mm",
    sizes: [
      { label: "Hide (full skin)", value: "approx. 16–22 sq ft" },
      { label: "Side (half skin)", value: "approx. 10–24 sq ft" },
    ],
    capacity: CAPACITY_PER_TYPE,
    hero: IMAGES.brownNavy,
    banner: IMAGES.brownNavy,
    images: [IMAGES.greyTextured, IMAGES.ochreBlack],
  },
  {
    slug: "cow-leather",
    name: "Cow Leather",
    short: "Cow",
    animal: "cow",
    lead: "The widest range of articles in our collection.",
    intro:
      "We produce cow leather for footwear, handbags and other leather goods, from full hides and sides. Thickness is produced to customer demand between 0.7 mm and 1.6 mm, across our broadest range of finished and crust articles.",
    applications: ["footwear", "handbags"],
    otherGoods: true,
    types: ["Finished", "Crust"],
    articles: ["Upper", "Lining", "Drum Dyed", "Aniline", "Glazed", "Napa", "Burnish", "PU Finished", "Milled Plated", "Milled Natural", "Nubuck", "Buffed"],
    thicknessRanges: ["0.7–0.9", "0.9–1.1", "1.0–1.2", "1.1–1.3", "1.2–1.4", "1.3–1.5", "1.4–1.6"],
    thicknessSummary: "0.7 – 1.6 mm",
    sizes: [
      { label: "Hide (full skin)", value: "approx. 12–20 sq ft" },
      { label: "Side (half skin)", value: "approx. 10–22 sq ft" },
    ],
    capacity: CAPACITY_PER_TYPE,
    hero: IMAGES.ochreBlack,
    banner: IMAGES.ochreBlack,
    images: [IMAGES.colourStack, IMAGES.brownNavy],
  },
  {
    slug: "goat-leather",
    name: "Goat Leather",
    short: "Goat",
    animal: "goat",
    lead: "Fine, light and supple, from kid skins to large goat.",
    intro:
      "We produce goat leather for footwear, handbags, garments, gloving and other goods. We work with kid goat, normal-size and big-size goat skins, with thickness produced to customer demand between 0.6 mm and 1.1 mm.",
    applications: ["footwear", "handbags", "garments", "gloves"],
    otherGoods: true,
    types: ["Finished", "Crust"],
    articles: ["Upper", "Lining", "Drum Dyed", "Gloving", "Aniline", "Napa", "PU Finished", "Nubuck"],
    thicknessRanges: ["0.6–0.8", "0.7–0.9", "0.8–1.0", "0.9–1.1"],
    thicknessSummary: "0.6 – 1.1 mm",
    sizes: [
      { label: "Kid goat", value: "2.5–5.0 sq ft" },
      { label: "Normal size goat", value: "4.0–6.5 sq ft" },
      { label: "Big size goat", value: "7–11 sq ft" },
    ],
    capacity: CAPACITY_PER_TYPE,
    hero: IMAGES.taupe,
    banner: IMAGES.taupe,
    images: [IMAGES.blackSoft, IMAGES.royalBlue],
  },
  {
    slug: "sheep-leather",
    name: "Sheep Leather",
    short: "Sheep",
    animal: "sheep",
    lead: "Soft hand and fine grain for garments, gloves and footwear.",
    intro:
      "We produce sheep leather for footwear, garments, gloving and other goods, using normal-size Pakistani sheep and imported sheep. Thickness is produced to customer demand between 0.5 mm and 1.0 mm.",
    applications: ["footwear", "garments", "gloves"],
    otherGoods: true,
    types: ["Finished", "Crust"],
    articles: ["Upper", "Lining", "Drum Dyed", "Aniline", "Napa", "Burnish"],
    thicknessRanges: ["0.5–0.7", "0.6–0.8", "0.7–0.9", "0.8–1.0"],
    thicknessSummary: "0.5 – 1.0 mm",
    sizes: [
      { label: "Pakistani sheep (normal size)", value: "4–6 sq ft" },
      { label: "Imported sheep", value: "4–7 sq ft" },
    ],
    capacity: CAPACITY_PER_TYPE,
    hero: IMAGES.sheepFinished,
    banner: IMAGES.hero,
    images: [IMAGES.sheepCrust, IMAGES.ivory],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Details SID Leather has not published. Shown as "confirmed per inquiry", never as fact. */
export const confirmOnRequest = [
  { label: "Minimum order quantity", note: "Confirmed per article and colour" },
  { label: "Lead time", note: "Confirmed with each order" },
  { label: "Colour range & matching", note: "Developed to your reference" },
  { label: "Test reports & compliance documents", note: "Available on request, subject to confirmation" },
];

export const applications: Record<ApplicationKey, { title: string; text: string }> = {
  footwear: {
    title: "Footwear",
    text: "Upper and lining leather for shoes and boots, available in buffalo, cow, goat and sheep.",
  },
  handbags: {
    title: "Handbags",
    text: "Leather for handbags and leather goods in buffalo, cow and goat, in crust or finished form.",
  },
  garments: {
    title: "Garments",
    text: "Soft garment leather in buffalo, goat and sheep, produced to the thickness your pattern needs.",
  },
  fashion: {
    title: "Fashion",
    text: "Leather for fashion products and accessories, developed to the article, finish and thickness you specify.",
  },
  gloves: {
    title: "Working Gloves",
    text: "Gloving leather in goat and sheep for working gloves and other glove styles.",
  },
};

export const applicationOrder: ApplicationKey[] = ["footwear", "handbags", "garments", "fashion", "gloves"];

/** Leathers that list a given application on the product page. Fashion is served across the range. */
export const productsFor = (key: ApplicationKey) =>
  key === "fashion" ? products : products.filter((p) => p.applications.includes(key));

/** Capability list as published on the previous website. Definitions describe the article type. */
export const capabilities = [
  { name: "Crust Leather", text: "Tanned, retanned, dyed and dried leather, supplied before final surface finishing for customers who finish in-house." },
  { name: "Finished Leather", text: "Leather taken through surface finishing to the colour, feel and appearance the article requires." },
  { name: "Upper & Lining", text: "Upper leather for the visible outer of footwear and goods, and lining leather for the inside." },
  { name: "Drum Dyed", text: "Leather dyed through in the drum, giving consistent colour across the substance." },
  { name: "Gloving", text: "Soft, flexible leather for gloves, including working gloves." },
  { name: "Aniline & Semi-Aniline", text: "Aniline keeps the natural grain open and visible; semi-aniline adds a light pigmented coat for more uniformity." },
  { name: "Napa", text: "Soft, smooth, full-grain leather with a supple hand." },
  { name: "Milled & Tumbled", text: "Leather softened mechanically in the drum to develop a relaxed hand and natural grain pattern." },
];

export const allArticles = Array.from(new Set(products.flatMap((p) => p.articles)));
