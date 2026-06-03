'use client'

import { motion } from 'framer-motion'
import { MessageSquare, PhoneCall, Handshake, FileCheck } from 'lucide-react'

const STEPS = [
  { icon: MessageSquare, title: 'Gửi câu hỏi', desc: 'Điền nhanh họ tên, số điện thoại và mô tả vấn đề của bạn — chỉ 30 giây.' },
  { icon: PhoneCall, title: 'Luật sư gọi lại', desc: 'Luật sư chuyên môn liên hệ trong 30 phút để nghe và đánh giá vụ việc.' },
  { icon: Handshake, title: 'Tư vấn phương án', desc: 'Bạn nhận tư vấn rõ ràng về hướng giải quyết, chi phí và thời gian dự kiến.' },
  { icon: FileCheck, title: 'Đồng hành xử lý', desc: 'Nếu cần, luật sư đại diện làm việc với cơ quan chức năng và tòa án.' },
]

export default function ProcessSteps({ areaName }: { areaName?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      {STEPS.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {i < STEPS.length - 1 && (
              <div className="absolute left-[3.25rem] top-7 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-trust/40 to-transparent md:block" />
            )}
            <div className="card card-lift relative h-full p-6">
              <span className="absolute right-5 top-4 text-4xl font-extrabold text-[rgba(13,159,110,0.1)]">
                {i + 1}
              </span>
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-trust-50 text-trust">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mb-2 text-lg font-extrabold text-navy">{s.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-steel">
                {i === 0 && areaName ? s.desc.replace('vấn đề của bạn', `vấn đề ${areaName.toLowerCase()}`) : s.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
