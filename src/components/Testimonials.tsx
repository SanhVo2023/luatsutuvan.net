'use client'

import { motion } from 'framer-motion'
import { Quote, ShieldCheck } from 'lucide-react'
import TiltCard from '@/components/animations/TiltCard'

/**
 * Illustrative, anonymized client situations — NOT verified public reviews.
 * Deliberately process-focused (how the lawyer approached the matter) rather
 * than outcome-guaranteeing, and presented without star ratings, to stay
 * defensible under legal-advertising norms. The section heading on the page
 * states clearly that these are illustrative and anonymized.
 */
const SCENARIOS = [
  {
    initial: 'H',
    area: 'Ly hôn',
    quote:
      'Một khách hàng liên hệ buổi tối về thủ tục ly hôn đơn phương. Luật sư gọi lại ngay trong tối đó, làm rõ điều kiện theo Luật Hôn nhân và Gia đình 2014 và hướng dẫn chuẩn bị hồ sơ giành quyền nuôi con.',
  },
  {
    initial: 'M',
    area: 'Đất đai',
    quote:
      'Tranh chấp ranh giới đất kéo dài với hàng xóm. Luật sư rà soát giấy tờ, xác định cơ sở pháp lý và đồng hành chuẩn bị hồ sơ khởi kiện đúng trình tự tố tụng dân sự.',
  },
  {
    initial: 'L',
    area: 'Lao động',
    quote:
      'Một người lao động cho rằng bị chấm dứt hợp đồng không đúng quy định. Luật sư phân tích căn cứ theo Bộ luật Lao động 2019 và tư vấn các phương án bảo vệ quyền lợi, ưu tiên hòa giải trước khi khởi kiện.',
  },
  {
    initial: 'T',
    area: 'Doanh nghiệp',
    quote:
      'Một chủ doanh nghiệp cần thành lập công ty và soạn hợp đồng hợp tác. Luật sư tư vấn loại hình phù hợp, rà soát điều khoản rủi ro và báo phí rõ ràng bằng văn bản ngay từ đầu.',
  },
]

export default function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {SCENARIOS.map((r, i) => (
        <motion.div
          key={r.area}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard max={5} className="card h-full p-7">
            <Quote className="absolute right-5 top-5 h-9 w-9 text-[rgba(13,159,110,0.12)]" />
            <span className="pill pill-trust mb-4 text-xs">
              <ShieldCheck className="h-3.5 w-3.5" /> Tình huống minh họa
            </span>
            <blockquote className="mb-5 text-[1.02rem] leading-relaxed text-navy/90">
              {r.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-[rgba(26,35,50,0.06)] pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-trust-50 font-extrabold text-trust-700">
                {r.initial}
              </span>
              <span className="text-sm">
                <span className="block font-bold text-navy">Khách hàng (ẩn danh)</span>
                <span className="block text-steel">Lĩnh vực {r.area}</span>
              </span>
            </figcaption>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  )
}
