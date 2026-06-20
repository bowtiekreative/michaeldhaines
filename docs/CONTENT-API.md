# Content API

The site reads content from MySQL, seeded from `src/content.js`. The Content API
lets you make live edits **without a redeploy**. Once any edit is made through the
API, a `content_source = api` flag is set so the version-gated reseed on the next
deploy will **not** clobber your edits. (Run `npm run seed` to force a full reset
back to the code values.)

Base path: `/api`

## 1. Mint an API key

Authenticate with the admin credentials from `.env` (`ADMIN_USER` / `ADMIN_PASSWORD`).

```bash
curl -X POST https://michaeldhaines.ca/api/keys \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD","label":"laptop"}'
# → { "token": "abc123…", "label": "laptop" }
```

Save the token — it is shown once and used as a Bearer token below.

## 2. Read content (public, no auth)

```bash
curl https://michaeldhaines.ca/api/content/home          # singleton
curl https://michaeldhaines.ca/api/content/testimonials  # collection
```

Singletons: `site`, `nav`, `home`, `about`, `testimonialsPage`, `contact`
Collections: `pillars`, `testimonials`, `posts`, `faqs`

## 3. Update a singleton (token required)

Replaces the whole JSON object for that key.

```bash
curl -X PUT https://michaeldhaines.ca/api/content/home \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d @home.json
```

## 4. Add / remove collection items (token required)

```bash
# Add a testimonial
curl -X POST https://michaeldhaines.ca/api/content/testimonials \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"author":"Jane Doe","title":"CEO, Acme","quote":"Wonderful session!","sort_order":5}'

# Delete item id 3
curl -X DELETE https://michaeldhaines.ca/api/content/testimonials/3 \
  -H "Authorization: Bearer $TOKEN"
```

Editable collections via POST/DELETE: `testimonials`, `pillars`, `faqs`.

## Notes

- `/api/` is disallowed in `robots.txt`.
- Keys never expire here; delete the row in `api_keys` to revoke.
- All write routes set `content_source = api`. To return to code as the source of
  truth, run `npm run seed` (force reset) — it restores values from `content.js`
  and resets the flag to `code`.
