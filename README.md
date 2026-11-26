# SID Leather — website

Production website for **SID Leather (Siddiqui's Leather)**, a leather manufacturer and exporter in Korangi Industrial Area, Karachi.

Built with Next.js 16 (App Router), React 19 and TypeScript. Plain CSS design system, no UI framework.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, introduction, collection, capabilities, capacity, applications, technology, markets map, inquiry |
| `/about` | History, vision and mission, materials, process, facilities, capacity, quality |
| `/products` | Collection and comparison table |
| `/products/{buffalo,cow,goat,sheep}-leather` | Product detail: specifications, finishes, applications, inquiry form, related |
| `/capabilities` | Capabilities, article × leather matrix, thickness ranges, machinery |
| `/applications` | Footwear, handbags, garments, fashion, working gloves |
| `/gallery` | Filterable gallery with keyboard- and swipe-friendly lightbox |
| `/contact` | Contact details, inquiry form, Google Map. `?type=quote\|samples` and `?product=<slug>` pre-fill the form. |
| `/api/inquiry` | Inquiry endpoint (POST, JSON) |

Old URLs (`/index.html`, `/products.html`, `/image-gallery.html`, `/contactus/` …) redirect permanently to the new pages.

## Development

```bash
npm install
cp .env.example .env.local   # then fill in mail settings
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Node.js 20.9 or newer is required.

## Inquiry form — email delivery

The form posts to `/api/inquiry`. The route validates the input, applies a honeypot, a minimum fill time and a same-origin check, rate-limits each IP, then emails the inquiry to `INQUIRY_TO` with `Reply-To` set to the customer.

Configure **one** transport in the hosting environment's variables:

- **Resend** (recommended on Vercel): set `RESEND_API_KEY` and `INQUIRY_FROM`, and verify `sidleather.com` in Resend.
- **SMTP** (cPanel, Google Workspace, Zoho …): set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` and, ideally, `INQUIRY_FROM`.

If no transport is configured, or sending fails, the API returns an error. The visitor then sees an honest failure message with direct email and WhatsApp links. A success message appears only after the email server has accepted the message.

See `.env.example` for all variables.

## Deployment

- **Vercel**: import the repository, add the environment variables above, then deploy. No extra configuration is needed.
- **Any Node host**: run `npm ci && npm run build && npm start` behind a reverse proxy. Set `PORT` if needed.

The current site is static files on shared LiteSpeed hosting. This site needs a Node.js runtime (or Vercel) because of image optimisation and the inquiry API.

## Content

- Company facts: `src/lib/site.ts`
- Products, specifications, capabilities, applications: `src/lib/products.ts`
- Gallery: `src/lib/gallery.ts`
- Images: `public/images/` (genuine SID Leather photography only)
- Markets map: generated from Natural Earth data with `npm run map` (`scripts/build-map.mjs`)

Only verified information is published. Unpublished details (MOQ, lead time, certifications) appear as "confirmed per inquiry". See `docs/AUDIT.md` for the audit and the list of content to request from the company.

## Design system

Modern Luxury Industrial. Palette: Espresso `#211813`, Dark Leather `#493226`, Cognac `#A66E45`, Sand `#D4B995`, Ivory `#F5F0E8`, White. Type: Cormorant Garamond (headings), Manrope (body and UI), both self-hosted. All tokens live at the top of `src/app/globals.css`. Animations respect `prefers-reduced-motion`.
