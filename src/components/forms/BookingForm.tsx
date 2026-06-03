'use client'

import { useState, useMemo, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarCheck, Clock } from 'lucide-react'
import { PRACTICE_AREAS, GUARANTEES } from '@/config/site'
import PracticeIcon from '@/components/PracticeIcon'
import { submitLead, collectAttribution, type LeadPayload } from '@/lib/leads'
import SuccessState from './SuccessState'

/**
 * Booking form (PRD §10 Booking Form): area → date/time → contact → confirm.
 * Slots are generated client-side (next 7 business days, fixed time grid) since
 * there is no calendar backend; the chosen slot is stored in the lead question.
 */

const TIME_SLOTS = ['09:00', '10:30', '14:00', '15:30', '17:00'] as const

function nextDays(n: number): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = []
  const dow = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() === 0) continue // skip Sunday
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: `${dow[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`,
    })
  }
  return out
}

type Step = 1 | 2 | 3

export default function BookingForm() {
  const days = useMemo(() => nextDays(6), [])
  const [step, setStep] = useState<Step>(1)
  const [area, setArea] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const phoneValid = /^[0-9+()\s.-]{8,15}$/.test(phone)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (fullName.trim().length < 2) return setError('Vui lòng nhập họ tên.')
    if (!phoneValid) return setError('Số điện thoại không hợp lệ.')
    setSubmitting(true)
    const slotLabel = days.find((d) => d.iso === day)?.label ?? day
    const payload: LeadPayload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      question: `[ĐẶT LỊCH] ${slotLabel} lúc ${time}. ${note.trim() || 'Mong được tư vấn.'}`,
      practiceArea: area || undefined,
      urgency: 'normal',
      ...collectAttribution(),
    }
    const res = await submitLead(payload)
    setSubmitting(false)
    if (res.ok) setDone(true)
    else setError(res.error ?? 'Có lỗi xảy ra.')
  }

  if (done) {
    return (
      <div className="card p-6 sm:p-8">
        <SuccessState />
      </div>
    )
  }

  return (
    <div className="card p-6 shadow-[var(--shadow-form)] sm:p-8">
      <div className="mb-5 flex items-center gap-2" aria-hidden>
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-confidence' : 'bg-[rgba(26,35,50,0.1)]'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="b1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <p className="mb-3 font-semibold text-navy">1. Chọn lĩnh vực cần tư vấn</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {PRACTICE_AREAS.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setArea(p.value)
                    setStep(2)
                  }}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[rgba(26,35,50,0.1)] bg-surface px-2 py-3 transition-all hover:border-confidence hover:bg-confidence-50"
                >
                  <PracticeIcon name={p.icon} className="h-7 w-7 text-confidence" />
                  <span className="text-sm font-semibold text-navy">{p.short}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="b2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <p className="mb-3 font-semibold text-navy">2. Chọn ngày &amp; giờ mong muốn</p>
            <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {days.map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setDay(d.iso)}
                  className={`rounded-lg border px-1 py-2 text-sm font-semibold transition-all ${
                    day === d.iso ? 'border-confidence bg-confidence text-white' : 'border-[rgba(26,35,50,0.12)] text-navy hover:border-confidence'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`rounded-lg border px-1 py-2 text-sm font-semibold transition-all ${
                    time === t ? 'border-confidence bg-confidence text-white' : 'border-[rgba(26,35,50,0.12)] text-navy hover:border-confidence'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn btn-ghost px-4">
                <ArrowLeft className="h-4 w-4" /> Lại
              </button>
              <button
                type="button"
                disabled={!day || !time}
                onClick={() => setStep(3)}
                className="btn btn-secondary flex-1 disabled:opacity-50"
              >
                Tiếp tục <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form key="b3" onSubmit={onSubmit} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="space-y-4">
            <p className="font-semibold text-navy">3. Thông tin để xác nhận lịch</p>
            <div className="rounded-xl bg-confidence-50 px-4 py-3 text-sm font-medium text-confidence-700">
              <CalendarCheck className="mr-1.5 inline h-4 w-4" />
              {days.find((d) => d.iso === day)?.label} · {time}
            </div>
            <input className="field" placeholder="Họ và tên *" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
            <input className="field" type="tel" inputMode="tel" placeholder="Số điện thoại *" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            <textarea className="field min-h-[80px]" placeholder="Mô tả ngắn (không bắt buộc)" value={note} onChange={(e) => setNote(e.target.value)} />
            {error && <p className="text-sm font-medium text-danger">{error}</p>}
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setStep(2)} className="btn btn-ghost px-4">
                <ArrowLeft className="h-4 w-4" /> Lại
              </button>
              <button type="submit" disabled={submitting} className="btn btn-secondary flex-1 disabled:opacity-70">
                {submitting ? 'Đang đặt...' : 'Xác nhận đặt lịch'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-5 flex items-center justify-center gap-1.5 border-t border-[rgba(26,35,50,0.06)] pt-4 text-xs font-medium text-steel">
        <Clock className="h-3.5 w-3.5 text-confidence" /> {GUARANTEES.callback} · {GUARANTEES.free}
      </p>
    </div>
  )
}
