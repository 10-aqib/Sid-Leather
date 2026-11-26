# SID Leather — Website Audit (before redesign)

Audited: https://www.sidleather.com/ — November 2026.

## 1. Platform and architecture

| Item | Finding |
|---|---|
| Framework | Static HTML from the purchased "Fusion — A Modern Business HTML Template" by themesflat (2020). Bootstrap 3, jQuery, Revolution Slider, Owl Carousel. |
| Hosting | LiteSpeed shared hosting. Last modified June 2021. |
| Backend / forms | None. No working contact form. |
| Integrations | WhatsApp link, Facebook, Instagram, Skype invite, WeChat deep link, link to `hueleather.com`. |
| SEO | No meta description, no Open Graph, no structured data, no `sitemap.xml`, no `robots.txt` (both 404). Two of three pages still titled "Fusion - A Modern Business HTML Template". Every image has `alt="images"`. |
| Accessibility | Viewport locks zoom (`maximum-scale=1`). No skip link, no focus styles, no landmarks. |

## 2. Pages and routes

| URL | Status | Notes |
|---|---|---|
| `/` (`index.html`) | 200 | Home. Contains template leftovers (see §4). |
| `/products.html` | 200 | Single page for all four leathers. **Holds the only technical specifications — preserved in full.** |
| `/image-gallery.html` | 200 | Eight product photos and two tannery photos. |
| `/contactus/` | **404** | Main-menu "Contact Us" link is broken. |
| `/portfolio-single-type-list.html` | **404** | Linked eight times from the "Recent Portfolio" block. |
| Mega-menu items | — | All four leather links point to the same `products.html`, no anchors. |

## 3. Broken or outdated links

- `https://sidleather.com/contactus/` — 404.
- `portfolio-single-type-list.html` — 404 (×8).
- `http://www.hueleather.com` ("HUE by Siddiqui's Leather") — domain no longer resolves.
- Skype invite — Skype was discontinued in May 2025.
- `weixin://dl/chat?{leathertannersiddiq}` — malformed deep link. The WeChat ID is kept as text.
- "Developed by" credit link — removed with the redesign.

## 4. Template content that must not be published

- "Recent Portfolio" block: Lorem ipsum, and items named "Business Cards Mockup", "Black Wine Bottle", "Rambler & Co", using blank placeholder images.
- Typo "Rencent", and a stray `-->` rendered as text.
- `<meta name="author" content="themesflat.com">`.

## 5. Unverified claims — not carried over

A client-logo carousel showed **Hugo Boss, Hush Puppies and Fred Perry** logos (plus one blank logo). Nothing on the site confirms these as clients, and showing third-party trademarks needs permission. **They have been left out.** They can be re-added once SID Leather confirms the relationships and has permission to show the logos.

## 6. Images

| Source file | Verdict | Used as |
|---|---|---|
| `blog/1–4.jpg` (≈3000–4000 px) | Genuine leather photography | Hero, product banners, gallery |
| `products/1–8.jpg` (600 px) | Genuine. Nos. 2 and 4 show SID-labelled sample cards (*Sheep Upper Crust*, *Sheep Upper Finished*). | Product cards, sheep page, gallery |
| `img-single/2–3.jpg` (1200 px) | Genuine tannery photos (wet blue, dyed skins drying) | Facilities, gallery |
| `services/4.jpg` | Genuine leather photograph | Products/gallery banner, CTA |
| `slides/1–3.jpg`, `products/9.jpg` | Stock-style photography | **Not used** (genuine photography only) |
| `portfolio/*`, `img-single/1.jpg` | Blank template placeholders | Not used |
| `client/*` | Third-party brand logos | Not used (§5) |
| `logo.png` (173×36 raster) | Too small for modern screens | Replaced with a typographic SVG wordmark until a vector logo is supplied |

All reused images are resized, recompressed and served as AVIF/WebP through Next.js image optimisation.

## 7. Verified business information preserved

Name (SID Leather / Siddiqui's Leather) · since the 1990s, 30+ years · goat, sheep, cow and buffalo · crust and finished · upper, lining, drum dyed, gloving, aniline, semi-aniline, napa, milled, tumbled · footwear, garments, fashion, working gloves, handbags · Italian and German machinery · vision and mission · wet blue inventory, Pakistani, Arabic, African and European raw material · markets: Vietnam, Taiwan, Thailand, Cambodia, China, Hong Kong, South Korea, Indonesia, Singapore and parts of Europe · capacity 0.4 million sq ft per month per leather type · all thickness, size and article data per leather · address, hours, phone, three email addresses, WeChat ID, Facebook, Instagram.

## 8. Content to request from SID Leather

These would strengthen the site. None are invented in the meantime.

1. Photographs of the Italian and German machinery and the production floor. The gallery has no "Machinery" category until these exist.
2. A vector logo (SVG/AI/EPS).
3. Certifications, test reports or compliance documents (e.g. LWG, REACH, ISO), if any.
4. Minimum order quantities, lead times and colour range. Currently shown as "confirmed per inquiry".
5. Confirmation of client brands, if they should be shown (§5).
6. Founding year, if a specific year is preferred over "the 1990s".
7. Whether `hueleather.com` will return, so the sister-brand link can be restored.
