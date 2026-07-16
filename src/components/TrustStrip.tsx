'use client'

import { motion } from 'framer-motion'
import { Clock, Scale, Gift, ShieldCheck, BadgeCheck } from 'lucide-react'

/**
 * Trust strip — only DEFENSIBLE signals (an operational commitment, the firm's
 * stated free first consult, its statutory confidentiality duty, the number of
 * practice areas it covers, and its bar-association membership). No fabricated
 * client counts, star ratings, or "years of experience" — those can't be
 * substantiated here and were removed.
 */
const ITEMS = [
  { icon: Clock, value: '30 phút', label: 'Cam kết phản hồi' },
  { icon: Scale, value: '8 lĩnh vực', label: 'Tư vấn chuyên sâu' },
  { icon: Gift, value: 'Miễn phí', label: 'Tư vấn lần đầu' },
  { icon: ShieldCheck, value: 'Bảo mật', label: 'Theo Luật Luật sư' },
  { icon: BadgeCheck, value: 'Đoàn Luật sư', label: 'Thành phố Hồ Chí Minh', gold: true },
]

export default function TrustStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[rgba(26,35,50,0.07)] shadow-[var(--shadow-lift)] ring-1 ring-[rgba(26,35,50,0.05)] sm:grid-cols-3 lg:grid-cols-5">
      {ITEMS.map((it, i) => {
        const Icon = it.icon
        return (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`flex flex-col items-center gap-1.5 bg-white px-4 py-6 text-center lg:py-7 ${
              // 5 items in a 2-col mobile grid leave an empty gray cell — let the
              // last tile span the full row on mobile instead.
              i === ITEMS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <Icon
              className={`mb-1 h-6 w-6 ${it.gold ? 'text-gold' : 'text-trust'}`}
              strokeWidth={1.75}
            />
            <span className="text-[1.05rem] font-extrabold leading-tight text-navy">{it.value}</span>
            <span className="text-[0.8rem] font-medium leading-tight text-steel">{it.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
