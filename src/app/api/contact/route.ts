import { NextResponse } from 'next/server'
import type { LeadPayload } from '@/lib/leads'
import { SITE } from '@/config/site'

/**
 * POST /api/contact — receives a lead from any form on the site and mirrors it
 * to the GAS Contact Hub (CONTACT_HUB_URL). There is NO local database; the
 * shared "Apolo Contact Submissions" sheet is the canonical store.
 *
 * We map the rich PRD §7 lead shape into the hub's flat schema (name/phone/
 * email/message/source) while preserving practiceArea/urgency/utm* inside the
 * message + extra fields so nothing is lost in the sheet.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function buildMessage(lead: LeadPayload): string {
  const lines = [lead.question.trim()]
  const meta: string[] = []
  if (lead.practiceArea) meta.push(`Lĩnh vực: ${lead.practiceArea}`)
  if (lead.urgency) meta.push(`Mức độ: ${lead.urgency}`)
  if (lead.landingPage) meta.push(`Trang: ${lead.landingPage}`)
  if (meta.length) lines.push('', '— ' + meta.join(' | '))
  return lines.join('\n')
}

export async function POST(req: Request) {
  let lead: LeadPayload
  try {
    lead = (await req.json()) as LeadPayload
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 })
  }

  // Server-side validation (never trust the client).
  const fullName = (lead.fullName ?? '').trim()
  const phone = (lead.phone ?? '').trim()
  const question = (lead.question ?? '').trim()

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ error: 'Vui lòng nhập họ tên.' }, { status: 422 })
  }
  if (!/^[0-9+()\s.-]{8,15}$/.test(phone)) {
    return NextResponse.json({ error: 'Số điện thoại không hợp lệ.' }, { status: 422 })
  }
  if (!question || question.length < 5) {
    return NextResponse.json({ error: 'Vui lòng mô tả vấn đề của bạn.' }, { status: 422 })
  }

  const hubUrl = process.env.CONTACT_HUB_URL
  const record = {
    name: fullName,
    phone,
    email: (lead.email ?? '').trim(),
    message: buildMessage(lead),
    source: SITE.domain,
    // extra columns the GAS sheet keeps if present
    practiceArea: lead.practiceArea ?? '',
    urgency: lead.urgency ?? 'normal',
    utmSource: lead.utmSource ?? '',
    utmMedium: lead.utmMedium ?? '',
    utmCampaign: lead.utmCampaign ?? '',
    utmContent: lead.utmContent ?? '',
    landingPage: lead.landingPage ?? '',
    referrer: lead.source ?? '',
    submittedAt: new Date().toISOString(),
  }

  // Fire-and-forget: also record the lead in the Content Hub's contact-submissions
  // (so it shows in the one admin) — never blocks the user. Requires HUB_API_URL
  // + HUB_SITE_ID (the site-config id for this domain).
  const hubApi = process.env.HUB_API_URL
  const hubSiteId = process.env.HUB_SITE_ID
  if (hubApi && hubSiteId) {
    void fetch(`${hubApi.replace(/\/$/, '')}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site: Number(hubSiteId),
        name: fullName,
        email: record.email,
        phone,
        message: record.message,
      }),
      cache: 'no-store',
    }).catch((err) => console.warn('[contact] hub contact-submissions write failed (non-fatal):', err))
  }

  // If no GAS hub configured (local dev without env), still succeed so the UX flows.
  if (!hubUrl) {
    console.warn('[contact] CONTACT_HUB_URL not set — lead accepted but not mirrored:', record.name)
    return NextResponse.json({ ok: true, mirrored: false })
  }

  try {
    const res = await fetch(hubUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      cache: 'no-store',
    })
    // GAS web apps follow redirects + return 200; treat non-network as success.
    if (!res.ok && res.status >= 500) {
      console.error('[contact] hub responded', res.status)
      return NextResponse.json({ ok: true, mirrored: false })
    }
    return NextResponse.json({ ok: true, mirrored: true })
  } catch (err) {
    // Never block the lead on a mirror failure — they still expect success.
    console.error('[contact] mirror failed (non-fatal):', err)
    return NextResponse.json({ ok: true, mirrored: false })
  }
}
