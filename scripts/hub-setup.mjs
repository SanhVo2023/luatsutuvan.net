#!/usr/bin/env node
/**
 * hub-setup.mjs — register luatsutuvan.net in the central Content Hub.
 *
 * Idempotent. Creates/updates:
 *   - site-config (tenant)         — theme, parentBrandLocale, phase
 *   - navigation (per-site global) — header links + CTA, footer columns, socials
 *   - site-settings (per-site)     — NAP, frontendBaseUrl (revalidation target), OG
 *   - categories (shared)          — one per practice area, for blog taxonomy
 *
 * Usage:
 *   node scripts/hub-setup.mjs --hub http://localhost:3001 \
 *     --email <admin> --password <pw> [--frontend http://localhost:3401]
 *
 * Secrets are passed on the CLI / env, never hardcoded.
 */

import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }

const HUB = opt('--hub', process.env.HUB_API_URL || 'http://localhost:3001').replace(/\/$/, '')
const FRONTEND = opt('--frontend', 'https://luatsutuvan.net').replace(/\/$/, '')
const DOMAIN = 'luatsutuvan.net'

const die = (m) => { console.error(`✗ ${m}`); process.exit(1) }

/**
 * Credentials: never accept the password on the command line (it leaks into
 * process listings). Read the hub admin creds from the hub's own gitignored
 * .env.local (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD), or from env vars.
 */
function loadHubEnv(path) {
  try {
    const txt = fs.readFileSync(path, 'utf8')
    const get = (k) => (txt.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1] ?? '').trim()
    return { email: get('SEED_ADMIN_EMAIL'), password: get('SEED_ADMIN_PASSWORD') }
  } catch { return {} }
}
const hubEnvPath = opt('--hub-env', fileURLToPath(new URL('../../../../hub/.env.local', import.meta.url)))
const fromFile = loadHubEnv(hubEnvPath)
const EMAIL = process.env.HUB_ADMIN_EMAIL || fromFile.email
const PASSWORD = process.env.HUB_ADMIN_PASSWORD || fromFile.password
if (!EMAIL || !PASSWORD) die('No admin creds — set HUB_ADMIN_EMAIL/HUB_ADMIN_PASSWORD or pass --hub-env <hub/.env.local>.')

async function api(path, { method = 'GET', token, body } = {}) {
  const res = await fetch(`${HUB}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json; try { json = JSON.parse(text) } catch { json = { raw: text } }
  if (!res.ok) die(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`)
  return json
}
async function findId(coll, field, value, token) {
  const q = `${HUB}/api/${coll}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1&depth=0`
  const j = await (await fetch(q, { headers: token ? { Authorization: `JWT ${token}` } : {} })).json()
  return j.docs?.[0]?.id
}
async function findIdBySite(coll, siteId, token) {
  const q = `${HUB}/api/${coll}?where[site][equals]=${siteId}&limit=1&depth=0`
  const j = await (await fetch(q, { headers: token ? { Authorization: `JWT ${token}` } : {} })).json()
  return j.docs?.[0]?.id
}
async function upsert(coll, findExisting, payload, token, label) {
  const existing = await findExisting()
  if (existing) {
    await api(`/api/${coll}/${existing}`, { method: 'PATCH', token, body: payload })
    console.log(`✓ Updated ${coll} ${label} (id=${existing})`)
    return existing
  }
  const created = await api(`/api/${coll}`, { method: 'POST', token, body: payload })
  const id = created.doc?.id ?? created.id
  console.log(`✓ Created ${coll} ${label} (id=${id})`)
  return id
}

// ── Login ──────────────────────────────────────────────────────────────────
const login = await api('/api/users/login', { method: 'POST', body: { email: EMAIL, password: PASSWORD } })
const token = login.token
if (!token) die('Login failed.')
console.log(`✓ Authenticated as ${EMAIL} on ${HUB}`)

// ── 1) site-config (tenant) ──────────────────────────────────────────────────
const siteId = await upsert(
  'site-configs',
  () => findId('site-configs', 'domain', DOMAIN, token),
  {
    domain: DOMAIN,
    displayName: 'Luật Sư Tư Vấn',
    parentBrandLocale: 'vi',
    phase: 2,
    theme: {
      primary: '#0d9f6e', secondary: '#1e6bb8', accent: '#e8792b',
      navy: '#1a2332', font: 'Be Vietnam Pro',
    },
    coveredTopics: ['tư vấn pháp luật', 'hỏi luật sư online', 'đặt lịch luật sư'],
  },
  token,
  DOMAIN,
)

// ── 2) categories (shared taxonomy, one per practice area) ───────────────────
const CATEGORIES = [
  { name: 'Hôn nhân & Gia đình', slug: 'hon-nhan-gia-dinh' },
  { name: 'Đất đai', slug: 'dat-dai' },
  { name: 'Doanh nghiệp', slug: 'doanh-nghiep' },
  { name: 'Dân sự', slug: 'dan-su' },
  { name: 'Hình sự', slug: 'hinh-su' },
  { name: 'Lao động', slug: 'lao-dong' },
  { name: 'Thừa kế', slug: 'thua-ke' },
  { name: 'Hợp đồng', slug: 'hop-dong' },
]
const categoryIds = {}
for (const c of CATEGORIES) {
  categoryIds[c.slug] = await upsert(
    'categories',
    () => findId('categories', 'slug', c.slug, token),
    { name: c.name, slug: c.slug, locale: 'vi' },
    token,
    c.slug,
  )
}

// ── 3) navigation (per-site global) ──────────────────────────────────────────
await upsert(
  'navigation',
  () => findIdBySite('navigation', siteId, token),
  {
    site: siteId,
    headerLinks: [
      { label: 'Lĩnh vực tư vấn', href: '/tu-van-theo-linh-vuc' },
      { label: 'Quy trình', href: '/quy-trinh-tiep-nhan' },
      { label: 'Câu hỏi thường gặp', href: '/cau-hoi-thuong-gap' },
      { label: 'Cẩm nang', href: '/noi-dung-tu-van' },
      { label: 'Liên hệ', href: '/lien-he' },
    ],
    headerCta: { label: 'Gọi 0903 419 479', href: 'tel:+84903419479' },
    footerColumns: [
      {
        heading: 'Lĩnh vực tư vấn',
        links: [
          { label: 'Tư vấn Ly hôn', href: '/tu-van-theo-linh-vuc/tu-van-ly-hon' },
          { label: 'Tư vấn Đất đai', href: '/tu-van-theo-linh-vuc/tu-van-dat-dai' },
          { label: 'Tư vấn Doanh nghiệp', href: '/tu-van-theo-linh-vuc/tu-van-doanh-nghiep' },
          { label: 'Tư vấn Dân sự', href: '/tu-van-theo-linh-vuc/tu-van-dan-su' },
          { label: 'Tư vấn Hình sự', href: '/tu-van-theo-linh-vuc/tu-van-hinh-su' },
        ],
      },
      {
        heading: 'Tư vấn nhanh',
        links: [
          { label: 'Gửi câu hỏi cho luật sư', href: '/gui-cau-hoi' },
          { label: 'Đặt lịch tư vấn', href: '/dat-lich-tu-van' },
          { label: 'Quy trình tiếp nhận', href: '/quy-trinh-tiep-nhan' },
          { label: 'Cẩm nang pháp lý', href: '/noi-dung-tu-van' },
          { label: 'Liên hệ', href: '/lien-he' },
        ],
      },
    ],
    footerLegal:
      'Nội dung trên website mang tính tham khảo chung, không thay thế tư vấn pháp lý cho từng trường hợp cụ thể.',
    socialLinks: [
      { platform: 'zalo', url: 'https://zalo.me/apololawyers' },
    ],
  },
  token,
  `nav:${DOMAIN}`,
)

// ── 4) site-settings (per-site) ──────────────────────────────────────────────
await upsert(
  'site-settings',
  () => findIdBySite('site-settings', siteId, token),
  {
    site: siteId,
    nap: {
      legalName:
        'Công ty Luật Apolo Lawyers, thuộc Đoàn Luật sư TP. Hồ Chí Minh, trực thuộc Liên đoàn Luật sư Việt Nam',
      address: '108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh',
      phone: '0903 419 479',
      email: 'contact@apolo.com.vn',
    },
    defaultOgImageUrl: `${FRONTEND}/og-default.png`,
    frontendBaseUrl: FRONTEND,
    socialLinks: [{ platform: 'zalo', url: 'https://zalo.me/apololawyers' }],
  },
  token,
  `settings:${DOMAIN}`,
)

console.log(`\nDone. site-config id=${siteId}. frontendBaseUrl=${FRONTEND}`)
console.log('Category ids:', categoryIds)
