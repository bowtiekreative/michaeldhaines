'use strict';

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const db = require('./src/db');
const content = require('./src/content');
const apiRouter = require('./src/api');
const { seed } = require('./src/seed');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

// Track DB readiness so /healthz can report it and views can fall back to code.
const state = { dbReady: false, lastError: null };

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

// ---- Security & performance --------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://assets.calendly.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://assets.calendly.com', 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https://i.ytimg.com'],
        // YouTube (privacy-enhanced) + Calendly embeds
        frameSrc: ["'self'", 'https://www.youtube-nocookie.com', 'https://www.youtube.com', 'https://calendly.com'],
        connectSrc: ["'self'", 'https://calendly.com'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());

// Cache-busting: append ?v=<mtime> to /css and /js so deploys show up immediately.
const PUBLIC_DIR = path.join(__dirname, 'public');
const assetVersions = {};
function assetVersion(relPath) {
  if (assetVersions[relPath]) return assetVersions[relPath];
  try {
    const v = Math.floor(fs.statSync(path.join(PUBLIC_DIR, relPath)).mtimeMs).toString(36);
    assetVersions[relPath] = v;
    return v;
  } catch {
    return '1';
  }
}

app.use(
  express.static(PUBLIC_DIR, {
    maxAge: '7d',
    setHeaders(res, filePath) {
      if (/\.(?:png|jpg|jpeg|gif|svg|ico|webp)$/.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30d for images
      }
    },
  })
);

// ---- Data loader: DB with graceful fallback to seed content -------------
async function load(key, fallback) {
  if (!state.dbReady) return fallback;
  try {
    if (['site', 'nav', 'home', 'about', 'testimonialsPage', 'contact'].includes(key)) {
      const v = await db.getSingleton(key);
      return v || fallback;
    }
    const orderable = { pillars: 'sort_order', testimonials: 'sort_order', posts: 'sort_order', faqs: 'sort_order' };
    if (orderable[key]) {
      const rows = await db.query(`SELECT * FROM ${key} ORDER BY ${orderable[key]}`);
      if (key === 'posts') {
        rows.forEach((r) => {
          if (typeof r.body === 'string') r.body = JSON.parse(r.body);
        });
      }
      return rows.length ? rows : fallback;
    }
  } catch (err) {
    state.lastError = err.message;
  }
  return fallback;
}

// Shared template locals for every render.
async function baseLocals(req, extra = {}) {
  const site = await load('site', content.site);
  const nav = await load('nav', content.nav);
  return {
    site,
    nav,
    siteUrl: SITE_URL,
    currentPath: req.path,
    assetVersion,
    canonical: SITE_URL + req.path,
    ...extra,
  };
}

// ---- Routes --------------------------------------------------------------
app.get('/', async (req, res, next) => {
  try {
    const [home, pillars, testimonials, faqs] = await Promise.all([
      load('home', content.home),
      load('pillars', content.pillars),
      load('testimonials', content.testimonials),
      load('faqs', content.faqs),
    ]);
    res.render('home', await baseLocals(req, {
      pageTitle: `${content.site.name} — ${content.site.role}`,
      metaDescription: content.site.description,
      ogImage: SITE_URL + content.site.ogImage,
      home, pillars, testimonials, faqs,
    }));
  } catch (e) { next(e); }
});

app.get('/about', async (req, res, next) => {
  try {
    const about = await load('about', content.about);
    res.render('about', await baseLocals(req, {
      pageTitle: `About Michael — ${content.site.name}`,
      metaDescription:
        'For over two decades, Michael D. Haines has helped businesses and students learn to serve customers with challenges. Born with cerebral palsy, he speaks from lived experience.',
      ogImage: SITE_URL + content.about.hero.image,
      about,
      breadcrumb: [{ name: 'About', href: '/about' }],
    }));
  } catch (e) { next(e); }
});

app.get('/testimonials', async (req, res, next) => {
  try {
    const [page, testimonials] = await Promise.all([
      load('testimonialsPage', content.testimonialsPage),
      load('testimonials', content.testimonials),
    ]);
    res.render('testimonials', await baseLocals(req, {
      pageTitle: `Testimonials — ${content.site.name}`,
      metaDescription: 'Find out what others have to say about working with Michael D. Haines.',
      ogImage: SITE_URL + content.testimonialsPage.hero.image,
      page, testimonials,
      breadcrumb: [{ name: 'Testimonials', href: '/testimonials' }],
    }));
  } catch (e) { next(e); }
});

app.get('/insights', async (req, res, next) => {
  try {
    const posts = await load('posts', content.posts);
    res.render('insights', await baseLocals(req, {
      pageTitle: `Insights — ${content.site.name}`,
      metaDescription: 'Articles and talks from Michael D. Haines on serving the challenged customer.',
      ogImage: SITE_URL + content.site.ogImage,
      posts,
      breadcrumb: [{ name: 'Insights', href: '/insights' }],
    }));
  } catch (e) { next(e); }
});

app.get('/insights/:slug', async (req, res, next) => {
  try {
    const posts = await load('posts', content.posts);
    const post = posts.find((p) => p.slug === req.params.slug);
    if (!post) return next();
    res.render('post', await baseLocals(req, {
      pageTitle: `${post.title} — ${content.site.name}`,
      metaDescription: post.excerpt,
      ogImage: SITE_URL + content.site.ogImage,
      post,
      breadcrumb: [
        { name: 'Insights', href: '/insights' },
        { name: post.title, href: `/insights/${post.slug}` },
      ],
    }));
  } catch (e) { next(e); }
});

app.get('/contact', async (req, res, next) => {
  try {
    const contactData = await load('contact', content.contact);
    res.render('contact', await baseLocals(req, {
      pageTitle: `Contact — ${content.site.name}`,
      metaDescription:
        'Book Michael D. Haines for your next speaking engagement or staff training. Get in touch today.',
      ogImage: SITE_URL + content.site.ogImage,
      contact: contactData,
      sent: req.query.sent === '1',
      breadcrumb: [{ name: 'Contact', href: '/contact' }],
    }));
  } catch (e) { next(e); }
});

// Contact form handler (stores message; rate-limited).
const formLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
app.post('/contact', formLimiter, express.urlencoded({ extended: false }), async (req, res, next) => {
  try {
    const { name, email, message, website } = req.body;
    // Honeypot — bots fill "website"; humans never see it.
    if (website) return res.redirect('/contact?sent=1');
    if (name && email && message && state.dbReady) {
      await db.query('INSERT INTO messages (name, email, message) VALUES (?,?,?)', [
        String(name).slice(0, 255),
        String(email).slice(0, 255),
        String(message).slice(0, 5000),
      ]);
    }
    res.redirect('/contact?sent=1');
  } catch (e) { next(e); }
});

app.get('/privacy', async (req, res, next) => {
  try {
    res.render('privacy', await baseLocals(req, {
      pageTitle: `Privacy Policy — ${content.site.name}`,
      metaDescription: 'Privacy policy for michaeldhaines.ca.',
      ogImage: SITE_URL + content.site.ogImage,
      breadcrumb: [{ name: 'Privacy', href: '/privacy' }],
    }));
  } catch (e) { next(e); }
});

// ---- Content API ---------------------------------------------------------
app.use('/api', apiRouter);

// ---- SEO: robots + sitemap ----------------------------------------------
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );
});

app.get('/sitemap.xml', async (req, res, next) => {
  try {
    const posts = await load('posts', content.posts);
    const staticPaths = ['/', '/about', '/testimonials', '/insights', '/contact', '/privacy'];
    const urls = [
      ...staticPaths.map((p) => ({ loc: SITE_URL + p, priority: p === '/' ? '1.0' : '0.7' })),
      ...posts.map((p) => ({ loc: `${SITE_URL}/insights/${p.slug}`, priority: '0.5' })),
    ];
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
          .map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`)
          .join('\n') +
        `\n</urlset>\n`
    );
  } catch (e) { next(e); }
});

// ---- Health check --------------------------------------------------------
app.get('/healthz', async (req, res) => {
  const out = { status: 'ok', dbReady: state.dbReady, lastError: state.lastError, counts: {} };
  if (state.dbReady) {
    try {
      for (const t of ['pillars', 'testimonials', 'posts', 'faqs', 'messages']) {
        const r = await db.one(`SELECT COUNT(*) AS n FROM ${t}`);
        out.counts[t] = r ? r.n : null;
      }
      out.contentVersion = await db.getMeta('content_version');
      out.contentSource = await db.getMeta('content_source');
    } catch (err) {
      out.status = 'degraded';
      out.lastError = err.message;
    }
  } else {
    out.status = 'degraded';
  }
  res.status(200).json(out);
});

// ---- 404 + error handlers -----------------------------------------------
app.use(async (req, res) => {
  res.status(404).render('404', await baseLocals(req, {
    pageTitle: `Page Not Found — ${content.site.name}`,
    metaDescription: '',
    ogImage: SITE_URL + content.site.ogImage,
  }));
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('[error]', err);
  res.status(500).send('Something went wrong. Please try again later.');
});

// ---- Resilient boot ------------------------------------------------------
// Bind the port FIRST, then init the DB with retries. Never process.exit() on
// DB failure — that causes 503 crash-loops on shared hosts.
const server = app.listen(PORT, () => {
  console.log(`[server] Listening on :${PORT} (${SITE_URL})`);
});

async function initDbWithRetries(attempt = 1) {
  const maxAttempts = 10;
  try {
    await db.query('SELECT 1');
    await seed({ force: false });
    state.dbReady = true;
    state.lastError = null;
    console.log('[server] Database ready.');
  } catch (err) {
    state.lastError = err.message;
    const delay = Math.min(30000, 2000 * 2 ** (attempt - 1));
    console.error(`[server] DB init failed (attempt ${attempt}): ${err.message}. Retrying in ${delay}ms.`);
    if (attempt < maxAttempts) {
      setTimeout(() => initDbWithRetries(attempt + 1), delay);
    } else {
      console.error('[server] DB unavailable after max attempts — serving from seed content.');
    }
  }
}
initDbWithRetries();

module.exports = server;
