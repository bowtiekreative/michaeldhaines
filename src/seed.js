'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');
const content = require('./content');

/**
 * Version-gated seed.
 *
 * - Runs schema (idempotent CREATE TABLE IF NOT EXISTS).
 * - Seeds content only when needed:
 *     * forced (`--force` / npm run seed), OR
 *     * the stored content_version differs from content.contentVersion.
 * - If content_source === 'api', a live edit has been made via the Content API,
 *   so we DO NOT clobber it on a normal version bump (only --force resets it).
 */
async function runSchema() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await db.query(stmt);
  }
  // Lightweight forward-compatible migrations go here, guarded against dup column.
  // Example:
  //   await addColumn('posts', 'hero_image', 'VARCHAR(255)');
}

// eslint-disable-next-line no-unused-vars
async function addColumn(table, column, definition) {
  try {
    await db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (err) {
    if (err.code !== 'ER_DUP_FIELDNAME') throw err;
  }
}

async function seedContent() {
  const c = content;

  // Singletons (JSON blobs)
  await db.setSingleton('site', c.site);
  await db.setSingleton('nav', c.nav);
  await db.setSingleton('home', c.home);
  await db.setSingleton('about', c.about);
  await db.setSingleton('testimonialsPage', c.testimonialsPage);
  await db.setSingleton('contact', c.contact);

  // Pillars
  await db.query('DELETE FROM pillars');
  for (const p of c.pillars) {
    await db.query(
      'INSERT INTO pillars (slug, title, icon, image, body, sort_order) VALUES (?,?,?,?,?,?)',
      [p.slug, p.title, p.icon, p.image, p.body, p.sort_order]
    );
  }

  // Testimonials
  await db.query('DELETE FROM testimonials');
  for (const t of c.testimonials) {
    await db.query(
      'INSERT INTO testimonials (author, title, quote, sort_order) VALUES (?,?,?,?)',
      [t.author, t.title, t.quote, t.sort_order]
    );
  }

  // Posts
  await db.query('DELETE FROM posts');
  let order = 0;
  for (const p of c.posts) {
    await db.query(
      'INSERT INTO posts (slug, title, date, excerpt, body, sort_order) VALUES (?,?,?,?,CAST(? AS JSON),?)',
      [p.slug, p.title, p.date, p.excerpt, JSON.stringify(p.body), order++]
    );
  }

  // FAQs
  await db.query('DELETE FROM faqs');
  for (const f of c.faqs) {
    await db.query(
      'INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)',
      [f.question, f.answer, f.sort_order]
    );
  }

  await db.setMeta('content_version', content.contentVersion);
  // Reset the source flag — seeding from code makes code the source of truth again.
  await db.setMeta('content_source', 'code');
}

async function seed({ force = false } = {}) {
  await runSchema();

  const storedVersion = Number(await db.getMeta('content_version'));
  const source = await db.getMeta('content_source');
  const sameVersion = storedVersion === content.contentVersion;

  if (!force) {
    if (source === 'api') {
      console.log('[seed] content_source=api — skipping reseed (live edits preserved).');
      return { seeded: false, reason: 'api-source' };
    }
    if (sameVersion) {
      console.log(`[seed] content_version ${storedVersion} up to date — skipping.`);
      return { seeded: false, reason: 'up-to-date' };
    }
  }

  console.log(`[seed] Seeding content (version ${content.contentVersion}, force=${force}).`);
  await seedContent();
  console.log('[seed] Done.');
  return { seeded: true };
}

module.exports = { seed, runSchema };

// CLI entry: `npm run seed` → force a full reset.
if (require.main === module) {
  const force = process.argv.includes('--force');
  seed({ force })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[seed] FAILED:', err);
      process.exit(1);
    });
}
