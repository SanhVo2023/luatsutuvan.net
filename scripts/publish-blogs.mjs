#!/usr/bin/env node
/**
 * publish-blogs.mjs — bulk-publish luatsutuvan.net conversion blog posts to the
 * Content Hub. Tailored to the INTAKE-HUB conversion-blog spec (shorter than the
 * 2,500-word authority rubric): each post becomes a source `article`
 * (contentType 'blog') + a PUBLISHED per-site `rendition` with a hero image and
 * category.
 *
 * Reads Markdown files from src/content/blog-articles/*.md with frontmatter:
 *   ---
 *   title: ...
 *   slug: ...
 *   category: dat-dai          # one of the 8 practice-area category slugs
 *   excerpt: ...
 *   tags: a, b, c
 *   metaTitle: ...
 *   metaDescription: ...
 *   heroImageId: (optional, else mapped from category)
 *   ---
 *   (markdown body)
 *
 * Hero image URLs come from assets.json. Admin creds are read from
 * hub/.env.local — never the CLI.
 *
 * Usage: node scripts/publish-blogs.mjs --hub http://localhost:3001 [--dry-run]
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const has = (k) => args.includes(k)
const die = (m) => { console.error(`✗ ${m}`); process.exit(1) }

const HUB = opt('--hub', process.env.HUB_API_URL || 'http://localhost:3001').replace(/\/$/, '')
const DRY = has('--dry-run')
const DOMAIN = 'luatsutuvan.net'
const FRONTEND = 'https://luatsutuvan.net'
const here = path.dirname(fileURLToPath(import.meta.url))
const ARTICLE_DIR = opt('--dir', path.join(here, '..', 'src', 'content', 'blog-articles'))
const ASSETS = path.join(here, '..', 'assets.json')

// ── creds from hub/.env.local ────────────────────────────────────────────────
function loadHubEnv() {
  try {
    const p = fileURLToPath(new URL('../../../../hub/.env.local', import.meta.url))
    const txt = fs.readFileSync(p, 'utf8')
    const get = (k) => (txt.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1] ?? '').trim()
    return { email: get('SEED_ADMIN_EMAIL'), password: get('SEED_ADMIN_PASSWORD') }
  } catch { return {} }
}
const cred = loadHubEnv()
const EMAIL = process.env.HUB_ADMIN_EMAIL || cred.email
const PASSWORD = process.env.HUB_ADMIN_PASSWORD || cred.password
if (!EMAIL || !PASSWORD) die('No admin creds (hub/.env.local SEED_ADMIN_* or HUB_ADMIN_* env).')

// ── hero image map (category slug → default heroImageId) ─────────────────────
const HERO_BY_CATEGORY = {
  'hon-nhan-gia-dinh': 'blog-divorce',
  'dat-dai': 'practice-dat-dai',
  'doanh-nghiep': 'blog-business',
  'dan-su': 'blog-civil-debt',
  'hinh-su': 'blog-criminal',
  'lao-dong': 'blog-labor',
  'thua-ke': 'practice-thua-ke',
  'hop-dong': 'blog-contract',
}
const assets = JSON.parse(fs.readFileSync(ASSETS, 'utf8'))
const assetUrl = (id) => assets.find((a) => a.id === id)?.cdn_url || null

// ── frontmatter parser (simple scalars + comma lists) ────────────────────────
function parseDoc(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!m) return { meta: {}, body: raw.trim() }
  const meta = {}
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/)
    if (mm) meta[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '')
  }
  return { meta, body: m[2].trim() }
}

// ── validation (conversion-blog bar — intentionally below the 2,500 rubric) ──
function validate(meta, body) {
  const errs = []
  if (!meta.slug) errs.push('missing slug')
  if (!meta.title) errs.push('missing title')
  if (!meta.category) errs.push('missing category')
  const words = body.split(/\s+/).filter(Boolean).length
  if (words < 1200 || words > 2600) errs.push(`word count ${words} (need 1200–2600)`)
  const cites = (body.match(/\((Điều|Khoản|Luật|Bộ luật|Nghị định|Thông tư|Án lệ)\s/g) || []).length
  if (cites < 3) errs.push(`${cites} statutory references (need ≥3)`)
  if (!/\]\((\/lien-he|\/dat-lich-tu-van|\/gui-cau-hoi)/i.test(body) && !/0903[\s.]?419[\s.]?479/.test(body))
    errs.push('no consultation CTA (/lien-he, /dat-lich-tu-van, /gui-cau-hoi, or phone)')
  const noFences = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
  if (/<[a-zA-Z!/]/.test(noFences)) errs.push('raw HTML in body (markdown only)')
  return { errs, words, cites }
}

// ── api helpers ──────────────────────────────────────────────────────────────
async function api(p, { method = 'GET', token, body } = {}) {
  const res = await fetch(`${HUB}${p}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json; try { json = JSON.parse(text) } catch { json = { raw: text } }
  if (!res.ok) die(`${method} ${p} → ${res.status}: ${text.slice(0, 300)}`)
  return json
}
async function findId(coll, field, value, token) {
  const q = `${HUB}/api/${coll}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1&depth=0`
  const j = await (await fetch(q, { headers: token ? { Authorization: `JWT ${token}` } : {} })).json()
  return j.docs?.[0]?.id
}
async function findRendition(siteId, slug, token) {
  const q = `${HUB}/api/renditions?where[and][0][site][equals]=${siteId}&where[and][1][slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0`
  const j = await (await fetch(q, { headers: { Authorization: `JWT ${token}` } })).json()
  return j.docs?.[0]?.id
}

// ── load + validate ──────────────────────────────────────────────────────────
if (!fs.existsSync(ARTICLE_DIR)) die(`No article dir: ${ARTICLE_DIR}`)
const files = fs.readdirSync(ARTICLE_DIR).filter((f) => f.endsWith('.md'))
if (!files.length) die(`No .md articles in ${ARTICLE_DIR}`)
console.log(`Found ${files.length} markdown files in ${ARTICLE_DIR}`)

const articles = []
let invalid = 0
for (const f of files) {
  const { meta, body } = parseDoc(fs.readFileSync(path.join(ARTICLE_DIR, f), 'utf8'))
  const { errs, words, cites } = validate(meta, body)
  if (errs.length) { invalid++; console.error(`  ✗ ${f}: ${errs.join('; ')}`); continue }
  const heroId = meta.heroImageId || HERO_BY_CATEGORY[meta.category]
  const heroUrl = assetUrl(heroId)
  if (!heroUrl) console.warn(`  ! ${f}: no hero for "${heroId}"`)
  const tags = (meta.tags || '').split(',').map((s) => s.trim()).filter(Boolean)
  articles.push({ ...meta, tags, body, _words: words, _cites: cites, _heroUrl: heroUrl })
}
console.log(`Valid: ${articles.length} | Invalid: ${invalid}`)
if (DRY) {
  for (const a of articles) console.log(`  ✓ ${a.slug} — ${a._words}w, ${a._cites} refs, [${a.category}], hero=${a._heroUrl ? 'y' : 'n'}`)
  console.log('— DRY RUN — nothing published.')
  process.exit(invalid ? 1 : 0)
}
if (!articles.length) die('No valid articles to publish.')

// ── publish ──────────────────────────────────────────────────────────────────
const login = await api('/api/users/login', { method: 'POST', body: { email: EMAIL, password: PASSWORD } })
const token = login.token
if (!token) die('Login failed.')
console.log(`✓ Authenticated as ${EMAIL}`)
const siteId = await findId('site-configs', 'domain', DOMAIN, token)
if (!siteId) die(`No site-config for ${DOMAIN} — run hub-setup.mjs first.`)
const authorId = await findId('authors', 'slug', 'editorial-team', token)

let pub = 0
for (const a of articles) {
  const catId = await findId('categories', 'slug', a.category, token)
  const articlePayload = {
    title: a.title, slug: a.slug, body: a.body, excerpt: a.excerpt || '',
    locale: 'vi', contentType: 'blog',
    ...(catId ? { category: catId } : {}),
    topicTags: a.tags, targetSites: [siteId],
    ...(authorId ? { author: authorId } : {}),
    status: 'ready',
  }
  const existingArt = await findId('articles', 'slug', a.slug, token)
  let articleId
  if (existingArt) { await api(`/api/articles/${existingArt}`, { method: 'PATCH', token, body: articlePayload }); articleId = existingArt }
  else { const c = await api('/api/articles', { method: 'POST', token, body: articlePayload }); articleId = c.doc?.id ?? c.id }

  const rPayload = {
    source: articleId, site: siteId, slug: a.slug, title: a.title, body: a.body,
    excerpt: a.excerpt || '', contentType: 'blog',
    ...(catId ? { category: catId } : {}),
    tags: a.tags,
    ...(a._heroUrl ? { heroImageUrl: a._heroUrl } : {}),
    canonicalUrl: `${FRONTEND}/noi-dung-tu-van/${a.slug}`,
    status: 'published',
    ...(a.metaTitle || a.metaDescription
      ? { meta: { ...(a.metaTitle ? { title: a.metaTitle } : {}), ...(a.metaDescription ? { description: a.metaDescription } : {}) } }
      : {}),
  }
  const existingR = await findRendition(siteId, a.slug, token)
  if (existingR) await api(`/api/renditions/${existingR}`, { method: 'PATCH', token, body: rPayload })
  else await api('/api/renditions', { method: 'POST', token, body: rPayload })
  pub++
  console.log(`  ✓ ${a.slug} (article ${articleId}) → published [${a.category}]`)
}
console.log(`\nDone. Published ${pub} blog renditions for ${DOMAIN}.`)
