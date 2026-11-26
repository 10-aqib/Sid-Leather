import { IMAGES, type Img } from "./products";

export type GalleryCategory = "textures" | "finished" | "production";

export const galleryCategories: { key: GalleryCategory; label: string }[] = [
  { key: "textures", label: "Leather Textures" },
  { key: "finished", label: "Finished Leather" },
  { key: "production", label: "Production" },
];

export type GalleryItem = Img & { category: GalleryCategory; caption: string };

// Company photography only (from SID Leather's previous website). No stock or generated images.
export const gallery: GalleryItem[] = [
  { ...IMAGES.hero, category: "textures", caption: "Soft black finished leather" },
  { ...IMAGES.drying, category: "production", caption: "Dyed skins drying" },
  { ...IMAGES.sheepFinished, category: "finished", caption: "Sheep upper finished — labelled sample cards" },
  { ...IMAGES.taupe, category: "textures", caption: "Taupe finished leather" },
  { ...IMAGES.crustStack, category: "production", caption: "Crust leather, stacked" },
  { ...IMAGES.colourStack, category: "finished", caption: "Finished leather colour stack" },
  { ...IMAGES.brownNavy, category: "finished", caption: "Brown and navy finished leather" },
  { ...IMAGES.wetBlue, category: "production", caption: "Wet blue stock" },
  { ...IMAGES.greyTextured, category: "textures", caption: "Grey textured leather" },
  { ...IMAGES.sheepCrust, category: "finished", caption: "Sheep upper crust — labelled sample cards" },
  { ...IMAGES.pastelRolls, category: "finished", caption: "Finished leather in blush, black, tan and teal" },
  { ...IMAGES.blackSoft, category: "textures", caption: "Black leather, soft hand" },
  { ...IMAGES.ochreBlack, category: "finished", caption: "Ochre and black finished leather" },
  { ...IMAGES.royalBlue, category: "textures", caption: "Royal blue leather" },
  { ...IMAGES.ivory, category: "textures", caption: "Soft ivory leather" },
];
