# Michael D. Haines - Website Archive

## Overview

**Site:** [https://michaeldhaines.ca/](https://michaeldhaines.ca/)
**Owner:** Michael D. Haines — Customer Service Consultant  
**Location:** Kelowna, British Columbia, Canada  
**Tagline:** Challenge yourself and be great.

This directory contains a complete archive of the Michael D. Haines website, including all pages, posts, media assets, CSS, and API data.

## About Michael D. Haines

Michael D. Haines is a keynote speaker, business consultant, and author who helps organizations improve customer service for people with disabilities (which he calls "challenges"). Born with cerebral palsy, he uses an electric wheelchair and assistive speech technology. He serves businesses across Canada, helping them understand that serving customers with challenges is both a moral imperative and a profitable business strategy.

**Key offerings:**
- Keynote speaking engagements
- Staff training sessions on inclusive customer service
- Business consulting on serving the disability market
- E-book: *How to Serve Customers with Disabilities*

## Site Structure

```
michaeldhaines/
├── README.md           ← This file
├── architecture.md     ← Site architecture & navigation
├── styles.md           ← Design system, colors, fonts, CSS
├── media.md            ← Full media inventory
├── index.html          ← Homepage HTML
├── pages/
│   ├── home.md         ← Home page content
│   ├── about.md        ← About Michael page
│   ├── testimonials.md ← Testimonials page
│   └── contact.md      ← Contact page
├── images/             ← All site images (23 files)
├── css/                ← All compiled stylesheets
│   ├── theme-compiled.css  ← Main theme CSS (WP-LESS compiled)
│   ├── child-theme.css     ← Stack Child theme overrides
│   ├── bootstrap.css       ← Bootstrap framework
│   ├── icons.css           ← Icon styles
│   ├── iconsmind.css       ← Iconsmind icon set
│   ├── plugins.css         ← Plugin styles
│   ├── cf7.css             ← Contact Form 7
│   ├── woocommerce.css     ← WooCommerce
│   ├── woocommerce-layout.css
│   └── wc-blocks.css       ← WooCommerce blocks
└── api/                ← Raw WP REST API responses (JSON)
    ├── wp-v2.json              ← API index
    ├── wp-v2-pages-raw.json    ← All pages
    ├── wp-v2-posts-raw.json    ← All posts
    ├── wp-v2-media-raw.json    ← All media items
    ├── wp-v2-themes.json       ← Theme info
    └── homepage.html           ← Homepage HTML
```

## Pages (4 total)

1. **Home** - Hero section with booking CTA, video embed, "Disability Fallacy" philosophy, three core pillars (Challenge Your Business / Yourself / Others), "Why Michael" section
2. **About Michael** - Biography, over 20 years speaking experience, born with cerebral palsy, testimonial quotes
3. **Testimonials** - Four full testimonials from Don Campbell, Ian MacLeod, Tyson Ralph, Paul F. Bickert
4. **Contact** - Contact form (CF7) for booking speaking engagements

## Posts (5 total)

The blog contains posts in categories: Uncategorized, Speech that was delivered. Topics covered include Michael's personal story, statistics on disability employment, tips for serving customers with challenges, business case for inclusion, and real-world service examples.

## Key Statistics

| Metric | Value |
|--------|-------|
| Canadians with disabilities | 3.8M (13.7%) |
| Canadians affected by disability (incl. family) | 53% |
| Unemployment rate for disabled Canadians | 50-70% |
| Disabled graduates never employed | 450,000 (270,000 with post-secondary) |
| Absenteeism reduction (inclusive hiring example) | 85% lower |
| Turnover reduction (inclusive hiring example) | 38% vs 100% norm |

## Tech Stack

- **CMS:** WordPress 6.x
- **Theme:** Stack v10.5.15 (TommusRhodus) with child theme
- **E-commerce:** WooCommerce 10.7.0
- **Forms:** Contact Form 7 6.1.2
- **CSS Preprocessor:** WP-LESS (LESS to CSS compilation)
- **CSS Framework:** Bootstrap
- **CDN/Frontend:** Cloudflare (bot protection active)
- **Google Services:** reCAPTCHA v3
- **Video:** YouTube (ID: MtfGYrqxvVE)
- **Booking:** Calendly (calendly.com/mikehaines/30min)
- **Icons:** Iconsmind, Socicon, Stack Interface icons

## Directory Structure

```
/opt/data/michaeldhaines/
├── README.md
├── architecture.md
├── styles.md
├── media.md
├── index.html
├── pages/
│   ├── home.md
│   ├── about.md
│   ├── testimonials.md
│   └── contact.md
├── images/
│   ├── 01-logo.png ... 23-woocommerce-placeholder.png
├── css/
│   ├── theme-compiled.css
│   ├── child-theme.css
│   ├── bootstrap.css
│   ├── icons.css
│   ├── iconsmind.css
│   ├── plugins.css
│   ├── cf7.css
│   ├── woocommerce.css
│   ├── woocommerce-layout.css
│   └── wc-blocks.css
└── api/
    ├── wp-v2.json
    ├── wp-v2-pages-raw.json
    ├── wp-v2-posts-raw.json
    ├── wp-v2-media-raw.json
    ├── wp-v2-themes.json
    └── homepage.html
```

## API Endpoints Used

- `wp/v2/pages` - 4 pages (Home, About, Testimonials, Contact)
- `wp/v2/posts` - 5 blog posts (Uncategorized, Speech that was delivered)
- `wp/v2/media` - 23 media items (images, docs, logs)
- `wp/v2/categories` - 7 categories
- `wp/v2/tags` - 4 tags
- `wp/v2/themes` - Stack v10.5.15 + Stack Child
- Various WooCommerce, Jetpack, CF7, and Litespeed namespaces

## Archive Date

**Archived:** June 20, 2026