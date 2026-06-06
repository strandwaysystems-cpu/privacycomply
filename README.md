# PrivacyComply.io

Affiliate review site for cookie consent management platforms and GDPR/CCPA compliance tools, targeting SMB website owners, marketers, and bootstrapped SaaS founders.

## Stack

- **Framework:** [Astro](https://astro.build) v4 (static output, MDX-ready)
- **Sitemap:** `@astrojs/sitemap` (auto-generated)
- **Hosting:** Hostinger (auto-deploy from GitHub `master`)
- **Domain:** privacycomply.io (registered on Hostinger)

## Local Development

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the production build locally
```

## Project Structure

```
privacycomply/
├── astro.config.mjs          # site config (format: 'file' → /page.html URLs)
├── public/                   # static assets copied as-is
│   ├── robots.txt
│   └── script.js             # mobile nav toggle
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML shell, head, header, footer, schema slot
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── pages/                # one file per route
│   │   ├── index.astro
│   │   ├── best-cookie-consent-tools-2026.astro
│   │   ├── cookieyes-review.astro
│   │   ├── what-is-gdpr.astro
│   │   ├── gdpr-vs-ccpa.astro
│   │   └── about.astro
│   └── styles/
│       └── global.css        # design system tokens + page styles
└── dist/                     # build output (gitignored)
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Hub — TOFU homepage |
| `/best-cookie-consent-tools-2026.html` | MOFU comparison cornerstone |
| `/cookieyes-review.html` | BOFU vendor review |
| `/what-is-gdpr.html` | TOFU educational |
| `/gdpr-vs-ccpa.html` | TOFU educational |
| `/about.html` | Trust + affiliate disclosure |

## Affiliate Programs

All affiliate links use `target="_blank" rel="noopener sponsored"` and `data-partner` attributes. Once approved by each network, append the affiliate-ID query parameter to the appropriate URLs and `data-partner` will help identify which links to update.

The CI workflow `.github/workflows/affiliate-id-guard.yml` scans for unfilled placeholder tokens (`YOUR<AFF>_ID` style strings) and fails the build if any are committed — keep all links clean (no query params) until you have real IDs.


- **CookieYes** — recurring 30% × 3 yr
- **iubenda** — 40% revenue share
- **Termly** — 35% revenue share
- **NordLayer** — $400–$1000/sale high-ticket

## Hostinger Auto-Deploy

In hPanel → Websites → privacycomply.io → Manage → Auto Deploy from GitHub:

- **Repo:** `strandwaysystems-cpu/privacycomply`
- **Branch:** `master`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20+

## SEO

- All pages emit JSON-LD structured data (Article, FAQPage, BreadcrumbList, ItemList, Review, AboutPage, Organization, WebSite)
- Canonical URLs are explicit and use `.html` extension
- `@astrojs/sitemap` outputs `sitemap-index.xml` (referenced from `robots.txt`)
- Open Graph + Twitter card meta on every page
