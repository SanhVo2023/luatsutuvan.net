'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { GUARANTEES, PHONE_DISPLAY, PHONE_TEL, ZALO_URL } from '@/config/site'

/** Satisfying checkmark + next-steps panel shown after a successful submit. */
export default function SuccessState({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-trust-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 12 }}
      >
        <svg viewBox="0 0 52 52" className="h-11 w-11 text-trust">
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l8 8 16-18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
      <h3 className="text-xl font-extrabold text-navy">Đã gửi thành công!</h3>
      <p className="mx-auto mt-2 max-w-md text-steel">
        Luật sư sẽ liên hệ với bạn — <strong className="text-trust-700">{GUARANTEES.response}</strong>.
        Vui lòng để điện thoại ở chế độ sẵn sàng.
      </p>
      {!compact && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`tel:${PHONE_TEL}`} className="btn btn-call w-full sm:w-auto">
            <Phone className="h-5 w-5" /> Gọi ngay {PHONE_DISPLAY}
          </a>
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" /> Nhắn Zalo
          </a>
        </div>
      )}
    </motion.div>
  )
}
