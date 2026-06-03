import Link from 'next/link'
import { Phone, Home, FileQuestion } from 'lucide-react'
import QuickForm from '@/components/forms/QuickForm'
import { PHONE_DISPLAY, PHONE_TEL } from '@/config/site'

/** Custom 404 — never lose a lead (PRD §9 rule 7). Includes form + phone. */
export default function NotFound() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-[5rem] font-extrabold leading-none text-trust/20">404</span>
        <h1 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">
          Trang không tồn tại — nhưng luật sư vẫn ở đây
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-steel">
          Có thể đường dẫn đã thay đổi. Đừng để vấn đề pháp lý của bạn chờ đợi — gửi câu hỏi hoặc gọi
          trực tiếp, luật sư sẽ phản hồi trong 30 phút.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`tel:${PHONE_TEL}`} className="btn btn-call ring-pulse px-7 py-4 text-lg">
            <Phone className="h-5 w-5" /> Gọi {PHONE_DISPLAY}
          </a>
          <Link href="/" className="btn btn-ghost px-6 py-4 text-lg">
            <Home className="h-5 w-5" /> Về trang chủ
          </Link>
        </div>

        <div className="mt-12 text-left">
          <QuickForm heading="Hoặc gửi câu hỏi nhanh cho luật sư ngay tại đây" />
        </div>

        <div className="mt-8">
          <Link href="/tu-van-theo-linh-vuc" className="inline-flex items-center gap-1.5 font-bold text-trust-700 underline underline-offset-2">
            <FileQuestion className="h-4 w-4" /> Xem các lĩnh vực tư vấn
          </Link>
        </div>
      </div>
    </section>
  )
}
