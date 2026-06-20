'use strict';

const mysql = require('mysql2/promise');

// Hostinger/CloudLinux gotcha: Node resolves "localhost" to IPv6 ::1, but the
// DB user is typically granted on IPv4 → "Access denied … @'::1'". Rewrite it.
function normalizeHost(host) {
  return !host || host === 'localhost' ? '127.0.0.1' : host;
}

const pool = mysql.createPool({
  host: normalizeHost(process.env.DB_HOST),
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'michaeldhaines',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function one(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

// Meta helpers (used for content_source / content_version flags).
async function getMeta(key) {
  const row = await one('SELECT v FROM meta WHERE k = ?', [key]);
  return row ? row.v : null;
}

async function setMeta(key, value) {
  await query(
    'INSERT INTO meta (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
    [key, String(value)]
  );
}

async function getSingleton(key) {
  const row = await one('SELECT data FROM singletons WHERE k = ?', [key]);
  if (!row) return null;
  return typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
}

async function setSingleton(key, data) {
  await query(
    'INSERT INTO singletons (k, data) VALUES (?, CAST(? AS JSON)) ON DUPLICATE KEY UPDATE data = VALUES(data)',
    [key, JSON.stringify(data)]
  );
}

module.exports = { pool, query, one, getMeta, setMeta, getSingleton, setSingleton };
