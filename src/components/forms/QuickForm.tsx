'use client'

import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { submitLead, collectAttribution, type LeadPayload } from '@/lib/leads'
import SuccessState from './SuccessState'
import { GUARANTEES } from '@/config/site'

/**
 * Quick inline 3-field form (PRD §10 Quick Form) — embedded in content sections
 * and SEO pages. Name | Phone | Short question | Submit. Row on desktop, stacked
 * on mobile.
 *
 * `stacked` — always stack the fields vertically. REQUIRED when the form sits in
 * a narrow container (sticky sidebars, split columns): the one-row
 * md:grid-cols-[1fr_1fr_1.4fr_auto] layout otherwise collapses each input to
 * ~45px inside a ~300px aside, clipping placeholders to a single letter.
 */
export default function QuickForm({
  practiceArea,
  heading = 'Gửi câu hỏi nhanh — luật sư phản hồi trong 30 phút',
  stacked = false,
}: {
  practiceArea?: string
  heading?: string
  stacked?: boolean
}) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [question, setQuestion] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (fullName.trim().length < 2) return setError('Vui lòng nhập họ tên.')
    if (!/^[0-9+()\s.-]{8,15}$/.test(phone)) return setError('Số điện thoại không hợp lệ.')
    if (question.trim().length < 5) return setError('Vui lòng nhập câu hỏi.')
    setSubmitting(true)
    const payload: LeadPayload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      question: question.trim(),
      practiceArea,
      urgency: 'normal',
      ...collectAttribution(),
    }
    const res = await submitLead(payload)
    setSubmitting(false)
    if (res.ok) setDone(true)
    else setError(res.error ?? 'Có lỗi xảy ra.')
  }

  return (
    <div className="rounded-2xl border border-trust/20 bg-trust-50/60 p-5 sm:p-6">
      {done ? (
        <SuccessState compact />
      ) : (
        <>
          <p className="mb-4 text-center text-base font-bold text-navy sm:text-left">{heading}</p>
          <form
            onSubmit={onSubmit}
            className={`grid gap-3 ${stacked ? '' : 'md:grid-cols-[1fr_1fr_1.4fr_auto]'}`}
          >
            <input
              className="field"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-label="Họ tên"
            />
            <input
              className="field"
              type="tel"
              inputMode="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Số điện thoại"
            />
            <input
              className="field"
              placeholder="Câu hỏi ngắn"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              aria-label="Câu hỏi ngắn"
            />
            <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-70">
              {submitting ? '...' : (
                <>
                  Gửi <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          {error && <p className="mt-2 text-sm font-medium text-danger">{error}</p>}
          <p className="mt-2 text-center text-xs text-steel sm:text-left">{GUARANTEES.free} · {GUARANTEES.confidential}</p>
        </>
      )}
    </div>
  )
}
