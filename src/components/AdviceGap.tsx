'use client'

import { motion } from 'framer-motion'
import { Phone, Bot, UserCheck, AlertTriangle, Check } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '@/config/site'
import ScrollReveal from '@/components/animations/ScrollReveal'

/**
 * "Advice gap" — the core conversion narrative: free information from search
 * engines and AI is general, can be out of date, and carries no professional
 * accountability, whereas a licensed lawyer applies current law to YOUR facts
 * and is responsible for the advice. Wording is deliberately factual and
 * non-disparaging (we describe limits, we don't insult the tools).
 */
const ONLINE = [
  'Thông tin chung, không gắn với hồ sơ và chứng cứ cụ thể của bạn',
  'Có thể đã lỗi thời — quy định pháp luật thay đổi thường xuyên',
  'Không ai chịu trách nhiệm nếu nội dung sai hoặc bạn áp dụng nhầm',
  'Dễ bỏ sót thời hiệu, thủ tục hoặc rủi ro then chốt',
]

const LAWYER = [
  'Phân tích đúng tình huống, hồ sơ và chứng cứ thực tế của bạn',
  'Căn cứ trên quy định pháp luật đang có hiệu lực',
  'Luật sư chịu trách nhiệm nghề nghiệp với tư vấn đưa ra',
  'Cảnh báo sớm thời hiệu, thủ tục và rủi ro để bạn không trả giá đắt',
]

export default function AdviceGap() {
  return (
    <section className="relative overflow-hidden bg-navy section">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-trust/40 to-transparent" />
      <div className="container-x relative">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center mb-4 text-trust">Vì sao nên hỏi luật sư</span>
          <h2 className="text-3xl font-extrabold text-white">
            Thông tin miễn phí trên mạng có thể khiến bạn trả giá đắt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Tra cứu Google hay hỏi AI giúp bạn hiểu sơ bộ, nhưng pháp luật áp dụng cho
            <em className="not-italic font-semibold text-white"> đúng tình huống của bạn</em> lại là chuyện khác.
          </p>
        </ScrollReveal>

        <div className="section-head-gap grid gap-5 md:grid-cols-2">
          {/* Online / AI */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/70">
              <Bot className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mb-4 text-xl font-bold text-white">Tự tra cứu trên mạng &amp; hỏi AI</h3>
            <ul className="space-y-3">
              {ONLINE.map((t) => (
                <li key={t} className="flex gap-3 text-[0.97rem] leading-relaxed text-white/70">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-urgency" strokeWidth={2} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lawyer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-trust/40 bg-gradient-to-br from-trust-700/30 to-trust/10 p-7 shadow-[0_24px_60px_-24px_rgba(13,159,110,0.5)]"
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-trust text-white shadow-[var(--shadow-trust)]">
              <UserCheck className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mb-4 text-xl font-bold text-white">Tư vấn cùng luật sư Apolo</h3>
            <ul className="space-y-3">
              {LAWYER.map((t) => (
                <li key={t} className="flex gap-3 text-[0.97rem] leading-relaxed text-white/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-trust" strokeWidth={2.6} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <ScrollReveal delay={0.15} className="mt-10 text-center">
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn btn-primary px-8 py-4 text-lg"
          >
            <Phone className="h-5 w-5" /> Gọi luật sư: {PHONE_DISPLAY}
          </a>
          <p className="mt-4 text-sm text-white/55">
            Miễn phí tư vấn lần đầu · Bảo mật theo Luật Luật sư
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
