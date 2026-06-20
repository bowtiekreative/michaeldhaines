# Michael D. Haines — michaeldhaines.ca

A modern, fast, accessible rebuild of [michaeldhaines.ca](https://michaeldhaines.ca)
— keynote speaker & customer service consultant Michael D. Haines, who helps
organizations serve customers with challenges.

> **Challenge yourself and be great.**

The original WordPress site (Stack theme + WooCommerce + Elementor) was rebuilt
as a server-rendered Node.js application. **All client copy is preserved
verbatim** — only the presentation, performance, SEO, and accessibility were
modernized.

## Stack

- **Express + EJS** — server-rendered for SEO and speed.
- **MySQL via `mysql2`** — pure-JS driver (installs cleanly on restricted shared
  hosts; no native build tools required).
- **Helmet + compression + rate-limit** — security headers, gzip, form throttling.
- `src/content.js` is the **single source of truth**, seeded into MySQL on boot.
- **Content API** (`/api`, token-protected) for live edits without a redeploy.

## Quick start

```bash
cp .env.example .env      # set DB credentials + ADMIN_PASSWORD
npm install
npm run seed              # create tables + load content (optional; boot also seeds)
npm start                 # http://localhost:3000
```

The server is **resilient**: it binds the HTTP port first, then connects to the
DB with exponential-backoff retries. If the DB is unavailable it serves content
straight from `src/content.js` (never crash-loops). Check `/healthz` for DB
status and content counts.

## Pages & routes

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, video, the Disability Fallacy, three pillars, why Michael, testimonials, FAQ, CTA |
| `/about` | About Michael — biography & quotes |
| `/testimonials` | Full client testimonials |
| `/insights` · `/insights/:slug` | Articles & talks (the original blog posts, verbatim) |
| `/contact` | Contact form (honeypot + rate-limited) + Calendly booking |
| `/privacy` | Privacy policy |
| `/robots.txt` · `/sitemap.xml` · `/healthz` | SEO + ops |
| `/api/*` | Content API — see [`docs/CONTENT-API.md`](docs/CONTENT-API.md) |

## Content model

Edit `src/content.js` and bump `contentVersion` to re-seed on the next deploy.
Once the Content API makes a live edit, a `content_source = api` flag suppresses
the version-gated reseed so live edits aren't clobbered. `npm run seed` forces a
full reset back to the code values.

## What was improved (integrity kept)

- **Design system** — purple (`#554c78`, the original brand color) with a warm
  coral accent, fluid type, modern cards, sticky header.
- **SEO** — per-route titles/descriptions, canonical, Open Graph + Twitter cards,
  JSON-LD (`ProfessionalService`, `BreadcrumbList`, `FAQPage`, `Article`),
  `robots.txt`, generated `sitemap.xml`.
- **Accessibility (WCAG)** — zoom never disabled, visible focus outlines,
  skip-link, semantic landmarks, ARIA on the nav toggle, `prefers-reduced-motion`,
  4.5:1+ contrast.
- **Performance** — gzip, lazy-loaded media, privacy-enhanced YouTube embed,
  cache-busted assets (`?v=<mtime>`).
- **Self-serve editing** — token-protected Content API.

## Deployment (Hostinger / shared hosts)

- Use `DB_HOST=127.0.0.1` (not `localhost`) — `db.js` rewrites it anyway to avoid
  the IPv6 `::1` access-denied gotcha.
- Both `server.js` and `app.js` are valid entry points.
- A `Dockerfile` is included for container hosts.
- Submit `/sitemap.xml` in Google Search Console after launch.

## Source archive

The original WordPress scrape is preserved for reference:
`architecture.md`, `styles.md`, `media.md`, `pages/`, `api/`, `css/`, and the
original `index.html`.
