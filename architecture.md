# Site Architecture

## Site Information

| Attribute | Value |
|-----------|-------|
| **Domain** | michaeldhaines.ca |
| **Site Title** | Michael D. Haines |
| **Tagline** | Customer Service Consultant / Kelowna, British Columbia |
| **WordPress URL** | https://michaeldhaines.ca |
| **Front Page** | Static page (Home, ID: 1170) |
| **Posts Page** | Blog (not set as front) |
| **Site Icon** | `/wp-content/uploads/2019/04/cropped-MICHAEL.png` (512×512) |

## Active Theme

| Attribute | Value |
|-----------|-------|
| **Parent Theme** | Stack v10.5.15 by Tom Rhodes |
| **Child Theme** | Stack Child v10.0.0 |
| **Theme URI** | https://www.tommusrhodus.com/stack-wordpress-theme/ |
| **Framework** | Bootstrap-based |
| **CSS Compilation** | WP-LESS (LESS → CSS) |

## Navigation Structure

The site has a minimal flat navigation with 4 top-level pages:

```
Home (/) ─────────────────────────────── Static front page
├── About Michael (/about-michael/) ──── Biography & background
├── Testimonials (/testimonials/) ────── Client testimonials
└── Contact (/contact/) ──────────────── Contact form
```

## Navigation Bar Features

- Dual logo display: two stacked logo images (M-1.png on top of M.png) forming a stylized "M"
- Page list with numbered link to Home
- Back-to-top link on every page
- Social sharing buttons on About page (Facebook, Twitter)

## Page Content Breakdown

### Home Page

```
┌──────────────────────────────────────────────────────────┐
│ HEADER: Logo + Nav links                                │
├──────────────────────────────────────────────────────────┤
│ HERO SECTION                                            │
│ Background: michael-banner.png                          │
│ Logo overlay + "Hi, My Name is Michael D. Haines."      │
│ CTA: [BOOK A FREE CONSULTATION TODAY!] → Calendly       │
├──────────────────────────────────────────────────────────┤
│ VIDEO SECTION                                           │
│ YouTube embed: "Challenge Yourself And Be GREAT"        │
│ (ID: MtfGYrqxvVE)                                       │
├──────────────────────────────────────────────────────────┤
│ DISABILITY FALLACY SECTION                              │
│ Image: michael-chair.png                                │
│ Text: "In my mind, I do not have a disability..."       │
├──────────────────────────────────────────────────────────┤
│ THREE PILLARS (icon + text grid)                        │
│ Pillar 1: Challenge Your Business   (image: 2.png)      │
│ Pillar 2: Challenge Yourself        (image: 3.png)      │
│ Pillar 3: Challenge Others          (image: 1.png)      │
├──────────────────────────────────────────────────────────┤
│ "WHY MICHAEL?" SECTION                                  │
│ 4 bullet benefits                                       │
├──────────────────────────────────────────────────────────┤
│ FOOTER: reCAPTCHA notice, back-to-top                   │
└──────────────────────────────────────────────────────────┘
```

### About Page

```
┌──────────────────────────────────────────────────────────┐
│ HEADER: Logo + Nav links                                │
├──────────────────────────────────────────────────────────┤
│ TITLE: "about-michael"                                  │
│ Date: March 17, 2019                                    │
│ Category: Pic 1                                         │
├──────────────────────────────────────────────────────────┤
│ CONTENT (below fold on many views)                      │
│ Image: about-michael.png (1366×460)                     │
│ Social sharing: Facebook, Twitter                       │
├──────────────────────────────────────────────────────────┤
│ AUTHOR BOX: Michael D. Haines (Gravatar)                │
│ Comments section (0 comments)                           │
├──────────────────────────────────────────────────────────┤
│ FOOTER: back-to-top, reCAPTCHA                          │
└──────────────────────────────────────────────────────────┘
```

### Testimonials Page

```
┌──────────────────────────────────────────────────────────┐
│ HEADER: Logo + Nav links                                │
├──────────────────────────────────────────────────────────┤
│ HERO IMAGE: Untitled-design.png (1000×400)              │
│ HEADING: "Testimonial"                                  │
│ SUBHEAD: "Find out what others have to say about Michael"│
├──────────────────────────────────────────────────────────┤
│ TESTIMONIAL BLOCKQUOTES (4)                             │
│ 1. Don Campbell (short quote)                           │
│ 2. Ian MacLeod, Manager Milestones (medium quote)       │
│ 3. Tyson Ralph, GM Kelowna Keg (long, detailed)        │
│ 4. Paul F. Bickert, DC, CIC, CPPA (very long, 35 yrs)  │
├──────────────────────────────────────────────────────────┤
│ FOOTER: back-to-top, reCAPTCHA                          │
└──────────────────────────────────────────────────────────┘
```

### Contact Page

```
┌──────────────────────────────────────────────────────────┐
│ HEADER: Logo + Nav links                                │
├──────────────────────────────────────────────────────────┤
│ HEADING: "Contact Michael Today!"                       │
│ INTRO: Booking inquiry text                             │
├──────────────────────────────────────────────────────────┤
│ CONTACT FORM (CF7)                                      │
│ - Your Name (text input)                                │
│ - Email Address (email input)                           │
│ - Message (textarea)                                    │
│ - [Send] button (btn btn--primary)                      │
├──────────────────────────────────────────────────────────┤
│ FOOTER: back-to-top, reCAPTCHA                          │
└──────────────────────────────────────────────────────────┘
```

## Blog Posts (5 total)

Posts exist but are not the primary site content. Categories: Uncategorized (4 posts), Speech that was delivered (1 post). Tags: Inspiration, Tags, Trends, Web Design. Key topics include statistics on disability employment, tips for inclusive customer service, Michael's personal story, and real-world examples (Starbucks, WestJet, pub experience).

## Plugin & Feature Inventory

| Plugin/Feature | Purpose |
|----------------|---------|
| **WooCommerce 10.7.0** | E-commerce (products, cart, checkout) |
| **Contact Form 7 6.1.2** | Contact form on Contact page |
| **reCAPTCHA v3** | Spam protection on contact form |
| **Jetpack** | Site stats, security, performance |
| **LiteSpeed Cache** | Page caching & optimization |
| **WP-LESS** | Compile LESS → CSS for theme styles |
| **Calendly** | Booking widget (external) |
| **YouTube** | Embedded video content |
| **Revolution Slider** | Slider assets present (revslider directory) |
| **One Click Demo Import** | Initial theme setup (log files in media) |

## API Namespaces (Key)

| Namespace | Purpose |
|-----------|---------|
| `wp/v2` | Core WordPress (pages, posts, media, users, comments, etc.) |
| `wc/v3` | WooCommerce (products, orders, customers, etc.) |
| `wc/store/v1` | WooCommerce Store API (cart, checkout) |
| `contact-form-7/v1` | CF7 forms |
| `jetpack/v4` | Jetpack features |
| `litespeed/v1`, `litespeed/v3` | LiteSpeed cache |
| `oembed/1.0` | oEmbed embeds |

## Key External Services

- **Calendly** — Free consultation booking
- **YouTube** — Video hosting (Challenge Yourself And Be GREAT)
- **Google reCAPTCHA** — Form spam protection
- **Gravatar** — Author avatar

## Redirects & Links

- Home Page CTA → `https://calendly.com/mikehaines/30min`
- Social share (About) → Facebook, Twitter share dialogs
- All pages → Back to top anchor (`#start`)