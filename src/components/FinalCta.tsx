'use client'

import Image from 'next/image'
import { Phone, MessageCircle } from 'lucide-react'
import MagneticButton from '@/components/animations/MagneticButton'
import { PHONE_DISPLAY, PHONE_TEL, ZALO_URL, GUARANTEES, IMAGES } from '@/config/site'

/** Full-width dark CTA band (PRD §6) used at the bottom of every key page. */
export default function FinalCta({
  title = 'Đừng để vấn đề pháp lý kéo dài thêm một ngày',
  subtitle = 'Một cuộc gọi hôm nay có thể tiết kiệm cho bạn nhiều tháng rắc rối. Luật sư đang sẵn sàng lắng nghe.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <Image
        src={IMAGES.heroBg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-trust-700/40" />
      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            type="button"
            onClick={() => (window.location.href = `tel:${PHONE_TEL}`)}
            className="btn btn-primary ring-pulse px-8 py-4 text-lg"
          >
            <Phone className="h-5 w-5" /> Gọi {PHONE_DISPLAY}
          </MagneticButton>
          <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost border-white/30 bg-white/5 px-8 py-4 text-lg text-white hover:bg-white/10">
            <MessageCircle className="h-5 w-5" /> Nhắn tin Zalo
          </a>
        </div>
        <p className="mt-6 text-sm font-medium text-white/60">
          {GUARANTEES.callback} · {GUARANTEES.free} · {GUARANTEES.confidential}
        </p>
      </div>
    </section>
  )
}
