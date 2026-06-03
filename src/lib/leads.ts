/**
 * leads.ts — lead payload shape + submit helper.
 *
 * No DB / no Payload on this site (the conversion hub is a thin frontend). Leads
 * are POSTed to the GAS Contact Hub (CONTACT_HUB_URL) as a fire-and-forget mirror
 * — the canonical record lives in the shared "Apolo Contact Submissions" sheet.
 * We store every field the PRD §7 `leads` collection lists so attribution data
 * survives even without a local database.
 */

import type { UrgencyLevel } from '@/config/site'

export interface LeadPayload {
  fullName: string
  phone: string
  email?: string
  question: string
  practiceArea?: string
  urgency?: UrgencyLevel
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  landingPage?: string
}

export interface LeadResult {
  ok: boolean
  error?: string
}

/** Pull UTM + landing-page attribution from the current browser context. */
export function collectAttribution(): Partial<LeadPayload> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utmSource: p.get('utm_source') ?? undefined,
    utmMedium: p.get('utm_medium') ?? undefined,
    utmCampaign: p.get('utm_campaign') ?? undefined,
    utmContent: p.get('utm_content') ?? undefined,
    source: document.referrer || undefined,
    landingPage: window.location.pathname,
  }
}

/** Client-side submit → our own /api/contact route (which mirrors to GAS). */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      return { ok: false, error: data?.error ?? `Lỗi máy chủ (${res.status})` }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Không thể kết nối. Vui lòng gọi trực tiếp.' }
  }
}
