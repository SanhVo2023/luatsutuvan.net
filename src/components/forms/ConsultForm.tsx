'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Send, ShieldCheck, Clock } from 'lucide-react'
import { PRACTICE_AREAS, URGENCY_OPTIONS, GUARANTEES, type UrgencyLevel } from '@/config/site'
import PracticeIcon from '@/components/PracticeIcon'
import { submitLead, collectAttribution, type LeadPayload } from '@/lib/leads'
import SuccessState from './SuccessState'

/**
 * Primary multi-step consultation form (PRD §10 Form Optimization).
 * Step 1: pick practice area (icon grid) → Step 2: contact info → Step 3: question + urgency.
 * Used on the homepage hero and the dedicated /gui-cau-hoi page.
 */

interface Props {
  /** Pre-select a practice area (used on practice-area landing pages). */
  defaultArea?: string
  /** Pre-select urgency. */
  defaultUrgency?: UrgencyLevel
  /** Skip step 1 when an area is already chosen (landing pages). */
  lockArea?: boolean
  /** Optional heading shown above the form. */
  title?: string
  variant?: 'hero' | 'panel'
}

type Step = 1 | 2 | 3

export default function ConsultForm({
  defaultArea,
  defaultUrgency = 'normal',
  lockArea = false,
  title,
  variant = 'panel',
}: Props) {
  const [step, setStep] = useState<Step>(lockArea && defaultArea ? 2 : 1)
  const [area, setArea] = useState(defaultArea ?? '')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [urgency, setUrgency] = useState<UrgencyLevel>(defaultUrgency)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const phoneValid = /^[0-9+()\s.-]{8,15}$/.test(phone)
  const nameValid = fullName.trim().length >= 2

  const pickArea = (slug: string) => {
    setArea(slug)
    setStep(2)
  }

  const next = () => {
    setError('')
    if (step === 2) {
      if (!nameValid) return setError('Vui lòng nhập họ tên.')
      if (!phoneValid) return setError('Số điện thoại không hợp lệ.')
      setStep(3)
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (question.trim().length < 5) return setError('Vui lòng mô tả vấn đề của bạn.')
    setSubmitting(true)
    const payload: LeadPayload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      question: question.trim(),
      practiceArea: area || undefined,
      urgency,
      ...collectAttribution(),
    }
    const res = await submitLead(payload)
    setSubmitting(false)
    if (res.ok) {
      setDone(true)
      if (typeof window !== 'undefined') {
        // fire GA/Ads conversion if gtag present
        ;(window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'generate_lead', {
          practice_area: area,
        })
      }
    } else {
      setError(res.error ?? 'Có lỗi xảy ra. Vui lòng thử lại.')
    }
  }

  const wrap =
    variant === 'hero'
      ? 'bg-white rounded-2xl p-6 sm:p-7 shadow-[var(--shadow-form)] border border-white/60'
      : 'bg-white rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)] border border-[rgba(26,35,50,0.06)]'

  if (done) {
    return (
      <div className={wrap}>
        <SuccessState />
      </div>
    )
  }

  return (
    <div className={wrap}>
      {title && <h3 className="mb-1 text-lg font-extrabold text-navy">{title}</h3>}

      {/* progress dots */}
      <div className="mb-5 flex items-center gap-2" aria-hidden>
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-trust' : 'bg-[rgba(26,35,50,0.1)]'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1 — practice area */}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-3 font-semibold text-navy">Bạn cần tư vấn về lĩnh vực nào?</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {PRACTICE_AREAS.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => pickArea(p.slug)}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[rgba(26,35,50,0.1)] bg-surface px-2 py-3 text-center transition-all hover:border-trust hover:bg-trust-50 hover:shadow-[var(--shadow-card)]"
                >
                  <PracticeIcon
                    name={p.icon}
                    className="h-7 w-7 text-confidence transition-colors group-hover:text-trust"
                  />
                  <span className="text-sm font-semibold leading-tight text-navy">{p.short}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-steel">
              Không chắc lĩnh vực?{' '}
              <button
                type="button"
                onClick={() => pickArea('')}
                className="font-semibold text-confidence underline underline-offset-2"
              >
                Bỏ qua, gửi câu hỏi chung
              </button>
            </p>
          </motion.div>
        )}

        {/* STEP 2 — contact info */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <p className="font-semibold text-navy">Thông tin liên hệ của bạn</p>
            <div>
              <label className="field-label" htmlFor="cf-name">
                Họ và tên <span className="text-danger">*</span>
              </label>
              <input
                id="cf-name"
                className={`field ${fullName && (nameValid ? 'is-valid' : 'is-error')}`}
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                autoFocus
              />
            </div>
            <div>
              <label className="field-label" htmlFor="cf-phone">
                Số điện thoại <span className="text-danger">*</span>
              </label>
              <input
                id="cf-phone"
                type="tel"
                inputMode="tel"
                className={`field ${phone && (phoneValid ? 'is-valid' : 'is-error')}`}
                placeholder="09xx xxx xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="cf-email">
                Email <span className="text-steel font-normal">(không bắt buộc)</span>
              </label>
              <input
                id="cf-email"
                type="email"
                inputMode="email"
                className="field"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {error && <p className="text-sm font-medium text-danger">{error}</p>}
            <div className="flex items-center gap-3 pt-1">
              {!lockArea && (
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost px-4">
                  <ArrowLeft className="h-4 w-4" /> Lại
                </button>
              )}
              <button type="button" onClick={next} className="btn btn-primary flex-1">
                Tiếp tục <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 — question + urgency */}
        {step === 3 && (
          <motion.form
            key="s3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <p className="font-semibold text-navy">Mô tả vấn đề của bạn</p>
            <textarea
              className="field min-h-[110px] resize-y"
              placeholder="Ví dụ: Tôi muốn ly hôn đơn phương, vợ/chồng không đồng ý ký..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <div>
              <label className="field-label">Mức độ khẩn cấp</label>
              <div className="grid grid-cols-3 gap-2">
                {URGENCY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setUrgency(o.value)}
                    className={`rounded-xl border px-2 py-2.5 text-center text-sm font-semibold transition-all ${
                      urgency === o.value
                        ? 'border-urgency bg-urgency-50 text-urgency'
                        : 'border-[rgba(26,35,50,0.1)] bg-white text-navy hover:border-urgency'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-sm font-medium text-danger">{error}</p>}
            <div className="flex items-center gap-3 pt-1">
              <button type="button" onClick={() => setStep(2)} className="btn btn-ghost px-4">
                <ArrowLeft className="h-4 w-4" /> Lại
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary flex-1 disabled:opacity-70">
                {submitting ? 'Đang gửi...' : (
                  <>
                    <Send className="h-4 w-4" /> Gửi câu hỏi
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* trust footer */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-[rgba(26,35,50,0.06)] pt-4 text-xs font-medium text-steel">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-trust" /> {GUARANTEES.response}
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-trust" /> {GUARANTEES.confidential}
        </span>
        <span className="inline-flex items-center gap-1 text-trust-700">
          <span className="font-bold">●</span> {GUARANTEES.free}
        </span>
      </div>
    </div>
  )
}
