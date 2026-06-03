import Link from 'next/link'
import { Phone, MessageCircle, BookOpen, MapPin, Clock } from 'lucide-react'
import SuccessState from '@/components/forms/SuccessState'
import { pageMeta } from '@/lib/seo'
import { PHONE_DISPLAY, PHONE_TEL, ZALO_URL, SITE, GUARANTEES } from '@/config/site'

export const metadata = pageMeta({
  title: 'Cảm Ơn Bạn Đã Liên Hệ',
  description: 'Yêu cầu tư vấn của bạn đã được gửi thành công. Luật sư sẽ liên hệ trong 30 phút.',
  path: '/cam-on',
  noindex: true,
})

export default function CamOnPage() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 shadow-[var(--shadow-form)] sm:p-12">
          <SuccessState />
        </div>

        {/* next steps */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href={`tel:${PHONE_TEL}`} className="card card-lift p-5 text-center">
            <Phone className="mx-auto mb-2 h-7 w-7 text-trust" />
            <span className="block text-sm font-semibold text-steel">Cần gấp? Gọi ngay</span>
            <span className="block font-extrabold text-navy">{PHONE_DISPLAY}</span>
          </a>
          <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="card card-lift p-5 text-center">
            <MessageCircle className="mx-auto mb-2 h-7 w-7 text-confidence" />
            <span className="block text-sm font-semibold text-steel">Nhắn tin nhanh</span>
            <span className="block font-extrabold text-navy">Zalo OA</span>
          </a>
          <Link href="/noi-dung-tu-van" className="card card-lift p-5 text-center">
            <BookOpen className="mx-auto mb-2 h-7 w-7 text-trust" />
            <span className="block text-sm font-semibold text-steel">Trong khi chờ</span>
            <span className="block font-extrabold text-navy">Đọc cẩm nang</span>
          </Link>
        </div>

        {/* office reminder */}
        <div className="mt-8 rounded-2xl bg-surface p-6 text-center">
          <p className="flex items-center justify-center gap-2 font-semibold text-navy">
            <MapPin className="h-5 w-5 text-trust" /> {SITE.address}
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-steel">
            <Clock className="h-4 w-4" /> T2–T7: 08:00–20:00 · {GUARANTEES.callback}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="font-bold text-trust-700 underline underline-offset-2">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </section>
  )
}
