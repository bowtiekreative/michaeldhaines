'use strict';

const crypto = require('crypto');
const express = require('express');
const db = require('./db');

const router = express.Router();
router.use(express.json({ limit: '256kb' }));

// Wrap async handlers so rejected promises become next(err) instead of crashing
// the process (Express 4 doesn't catch async errors automatically).
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Singletons editable via the API and their seed-content fallbacks.
const SINGLETONS = ['site', 'nav', 'home', 'about', 'testimonialsPage', 'contact'];

function timingSafeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// Mark code-seeded content as API-owned so the version-gated reseed won't clobber it.
async function markApiSource() {
  await db.setMeta('content_source', 'api');
}

// Mint an API key with admin username + password (Basic-style JSON body).
router.post('/keys', wrap(async (req, res) => {
  const { username, password, label } = req.body || {};
  const okUser = timingSafeEqual(username || '', process.env.ADMIN_USER || 'admin');
  const okPass = timingSafeEqual(password || '', process.env.ADMIN_PASSWORD || '');
  if (!okUser || !okPass || !process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials.' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  await db.query('INSERT INTO api_keys (token, label) VALUES (?, ?)', [token, label || null]);
  res.status(201).json({ token, label: label || null });
}));

// Bearer-token auth for all mutating routes below.
const requireToken = wrap(async (req, res, next) => {
  const auth = req.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Missing bearer token.' });
  const row = await db.one('SELECT id FROM api_keys WHERE token = ?', [token]);
  if (!row) return res.status(403).json({ error: 'Invalid token.' });
  next();
});

// ---- Read (public) -------------------------------------------------------
const READABLE = { pillars: 'sort_order', testimonials: 'sort_order', posts: 'sort_order', faqs: 'sort_order' };

router.get('/content/:key', wrap(async (req, res) => {
  const { key } = req.params;
  if (SINGLETONS.includes(key)) {
    return res.json(await db.getSingleton(key));
  }
  if (READABLE[key]) {
    return res.json(await db.query(`SELECT * FROM ${key} ORDER BY ${READABLE[key]}`));
  }
  res.status(404).json({ error: 'Unknown content key.' });
}));

// ---- Update singletons (token) ------------------------------------------
router.put('/content/:key', requireToken, wrap(async (req, res) => {
  const { key } = req.params;
  if (!SINGLETONS.includes(key)) return res.status(404).json({ error: 'Unknown singleton.' });
  if (typeof req.body !== 'object' || req.body === null) {
    return res.status(400).json({ error: 'Body must be a JSON object.' });
  }
  await db.setSingleton(key, req.body);
  await markApiSource();
  res.json({ ok: true, key });
}));

// ---- Upsert / delete collection items (token) ---------------------------
const COLLECTIONS = {
  testimonials: ['author', 'title', 'quote', 'sort_order'],
  pillars: ['slug', 'title', 'icon', 'image', 'body', 'sort_order'],
  faqs: ['question', 'answer', 'sort_order'],
};

router.post('/content/:key', requireToken, wrap(async (req, res) => {
  const { key } = req.params;
  const cols = COLLECTIONS[key];
  if (!cols) return res.status(404).json({ error: 'Unknown collection.' });
  const values = cols.map((c) => req.body[c] ?? null);
  const placeholders = cols.map(() => '?').join(',');
  const result = await db.query(
    `INSERT INTO ${key} (${cols.join(',')}) VALUES (${placeholders})`,
    values
  );
  await markApiSource();
  res.status(201).json({ ok: true, id: result.insertId });
}));

router.delete('/content/:key/:id', requireToken, wrap(async (req, res) => {
  const { key, id } = req.params;
  if (!COLLECTIONS[key]) return res.status(404).json({ error: 'Unknown collection.' });
  await db.query(`DELETE FROM ${key} WHERE id = ?`, [Number(id)]);
  await markApiSource();
  res.json({ ok: true });
}));

// JSON error handler for the API namespace (keeps the process alive when DB is down).
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const dbDown = /ECONNREFUSED|ETIMEDOUT|ER_ACCESS_DENIED/.test(err.code || err.message || '');
  res.status(dbDown ? 503 : 500).json({ error: dbDown ? 'Database unavailable.' : 'Server error.' });
});

module.exports = router;
