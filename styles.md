# Style Guide & Design System

## Theme Overview

| Attribute | Value |
|-----------|-------|
| **Theme** | Stack v10.5.15 (TommusRhodus) with Stack Child v10.0.0 |
| **Framework** | Bootstrap-based |
| **CSS Preprocessor** | WP-LESS (LESS compiled to CSS) |
| **Grid** | Bootstrap grid system |
| **Icons** | Iconsmind, socicon, stack-interface icon fonts |

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark text | `#252525` | Primary text color |
| Purple-primary | `#554c78` | Primary accent, buttons, links |
| Light purple | `#605688` | Hover states |
| Dark purple | `#4a4268` | Darker accent tones |
| Red accent | `#e23636` | Alert/danger, highlighted elements |
| Red dark | `#D84D4D` | Alt red |

### Background Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Light gray | `#fafafa` | Page backgrounds |
| Off-white | `#f5f5f5` | Section backgrounds |
| Border gray | `#ececec` | Borders, dividers |
| Near white | `#ebebeb` | Subtle backgrounds |
| Card border | `#e6e6e6` | Card/container borders |

### Text Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Body text | `#252525` | Main paragraphs |
| Dark gray | `#3f3f3f` | Secondary text |
| Medium gray | `#585858` | Muted text |
| Light gray text | `#808080` | Placeholder/de-emphasized |
| Lighter gray | `#a5a5a5` | Subtle text |
| Light border | `#b3b3b3` | Light borders |
| Border | `#d3d3d3` | Input borders |

### Utility Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Green | `#4ebf56` | Success |
| Pink accent | `#ea4c89` | Dribbble social |
| Red | `#e54c4c` | Pinterest social |
| Dark red | `#cb2027` | YouTube social |
| Facebook blue | `#3b5998` | Facebook share |
| Blue accent | `#053eff` | Blue accent |

## Typography

### Font Family

```
Primary:    'Open Sans', 'Helvetica', 'Arial', sans-serif
Serif:      'Merriweather', serif
Interface:  'stack-interface' (icon font)
Icons:      'socicon' (social icons), 'Material Icons'
```

### Font Usage

| Element | Font |
|---------|------|
| Body text | Open Sans |
| Headings | Open Sans (bold) |
| Blockquotes | Merriweather (serif, testimonials) |
| Icons | stack-interface, socicon, Material Icons |

## Layout & Grid

- **Bootstrap grid system** (container, row, col-*)
- **Responsive breakpoints** via Bootstrap defaults
- Content appears to be single-column layouts with full-width sections
- Hero sections use background images with text overlays

## Component Patterns

### Buttons

| Class | Style |
|-------|-------|
| `.btn` | Base button styling |
| `.btn--primary` | Primary action button (purple accent) |
| Pattern: underline on hover, rounded corners, uppercase text |

### Blockquotes (Testimonials)

- Larger serif font (Merriweather)
- Attribution below quote (name, title)
- Quote marks visually distinct
- Dark text on light backgrounds

### Navigation

- Top bar with logo (dual-image stacked "M")
- Page list with numbered item for Home
- Styled as simple text links

### Hero Sections

- Full-width background images
- Semi-transparent overlays on images
- Centered text overlaid
- Large heading with subtext and CTA button

### Image Handling

- Images use `height: auto` for responsive scaling
- Background images via CSS `background-image`
- Content images via `<img>` tags with WordPress responsive sizes (`-300x200` etc.)

## Key CSS Files

| File | Description |
|------|-------------|
| `theme-compiled.css` (158KB) | Main compiled theme CSS (WP-LESS) |
| `child-theme.css` (304B) | Child theme overrides (minimal) |
| `bootstrap.css` (64KB) | Bootstrap framework |
| `icons.css` (12KB) | Stack interface icons |
| `iconsmind.css` (96KB) | Iconsmind icon set |
| `plugins.css` (12KB) | Plugin-specific styles |
| `cf7.css` (3KB) | Contact Form 7 styles |
| `woocommerce.css` (87KB) | WooCommerce base styles |
| `woocommerce-layout.css` (20KB) | WooCommerce layout |
| `wc-blocks.css` (14KB) | WooCommerce blocks |

## JavaScript Components

All JS from `wp-content/themes/stack/style/js/`:

| Script | Purpose |
|--------|---------|
| `scripts.js` | Main theme JavaScript |
| `scripts_wp.js` | WordPress-specific theme JS |
| `flickity.js` | Carousel/slider |
| `isotope.js` | Filtering/layout |
| `lightbox.js` | Image lightbox |
| `parallax.js` | Parallax scrolling |
| `ytplayer.js` | YouTube video player |
| `granim.js` | Gradient animations |
| `smooth-scroll.js` | Smooth anchor scrolling |
| `easy-pie-chart.js` | Pie charts |
| `final-countdown.js` | Countdown timers |
| `spectragram.js` | Instagram integration |
| `steps.js` | Step/progress wizards |
| `twitter-post-fetcher.js` | Twitter feed |

## Responsive Design

- WooCommerce ships with `woocommerce-smallscreen.css` for `max-width: 768px`
- Bootstrap responsive breakpoints apply
- Images are responsive via WordPress srcset

## Design Patterns

1. **Full-width hero banners** — Large background images with text overlays
2. **Card-style content sections** — Icon/image + heading + description in grid
3. **Blockquote testimonials** — Serif font, attributed, with optional large photo
4. **Clean minimal navigation** — Simple top bar with page links
5. **Call-to-action buttons** — High contrast, uppercase, with Calendly integration
6. **Back-to-top** — Consistent anchor-based scroll-to-top on all pages