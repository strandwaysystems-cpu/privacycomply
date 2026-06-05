# PrivacyComply.io

Static affiliate review site for data privacy & cookie consent compliance tools. Part of the **Strandway Ventures** affiliate marketing portfolio (Pillar 1).

## Niche

Data privacy & cookie consent compliance tools — high-ticket B2B SaaS affiliate marketing. Selected for 25% CAGR, GDPR/CCPA enforcement tailwind, and strong AI Overview citation potential.

## Affiliate stack

| Partner | Model | Status |
|---|---|---|
| CookieYes | Recurring 30% for 3 years | Placeholder — sign up at cookieyes.com/affiliate |
| iubenda | Revenue share 40% | Placeholder — sign up at iubenda.com/affiliate-program |
| Termly | Revenue share 35% | Placeholder — sign up at termly.io/affiliate-program |
| NordLayer | $400–$1,000 per sale | Placeholder — sign up at nordlayer.com/partners |
| Osano | Referral partner (enterprise) | Pending |

**Before deploying live:** Replace every instance of `?ref=YOUR_AFFILIATE_ID` across the HTML files with the real affiliate ID from each partner's dashboard.

```bash
# Find every placeholder
grep -rn "YOUR_AFFILIATE_ID" .
```

## File structure

```
privacycomply/
├── index.html                          ← Homepage
├── best-cookie-consent-tools-2026.html ← Money page #1 (comparison)
├── cookieyes-review.html               ← Money page #2 (single review)
├── what-is-gdpr.html                   ← Trust / AI-citation page
├── gdpr-vs-ccpa.html                   ← Comparison / AI-citation page
├── about.html                          ← Editorial + disclosure + privacy policy
├── style.css                           ← Shared styles
├── script.js                           ← Shared JS (mobile nav)
├── robots.txt
├── sitemap.xml
└── README.md
```

## Tech stack

- Static HTML/CSS — no framework, fast Lighthouse scores
- Hosted on Cloudflare Pages (GitHub auto-deploy)
- Domain: privacycomply.io (Cloudflare DNS)
- Analytics: Google Analytics 4 + Google Search Console (to wire post-deploy)
- Cookie banner: CookieYes (we recommend it, we use it)

## Deployment

1. Push to GitHub master
2. Cloudflare Pages auto-deploys
3. Custom domain set to `privacycomply.io` in Pages settings

## What's live vs what's queued

**Live cornerstone (this commit):**
- Homepage with 4-tool review grid + 3 guide cards
- Best Cookie Consent Tools 2026 comparison (Article + ItemList + FAQPage schema)
- CookieYes hands-on review (Review schema, 4.8/5)
- What is GDPR? plain-English guide (Article + FAQPage schema)
- GDPR vs CCPA comparison (Article + FAQPage schema)
- About + affiliate disclosure + basic privacy policy

**Queued (next batches per v2 execution plan):**
- Cookie banner WordPress install how-to
- Termly review
- iubenda review
- NordLayer review (high-ticket priority)
- CookieYes vs Termly head-to-head
- GDPR compliance for remote teams
- Google Consent Mode v2 explained
- Best privacy policy generators 2026

## Editorial integrity rules

- Commission size never influences ranking
- Affiliate disclosure at the top of every monetized page (not buried in footer)
- We re-test every recommendation quarterly
- We will downgrade ratings if a tool degrades, even at commission cost

## Why this site exists

Per the Strandway Ventures v2 execution plan: data privacy compliance is structurally underserved by major publishers, has genuine regulatory tailwind, and is disproportionately cited in AI Overviews. Realistic revenue target: $5,000/month at month 10-11 with 30+ pages + 10-20 referring domains.

See: `strandway-ventures/registry/property-index.md` for portfolio status.
