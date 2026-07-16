import Image from 'next/image'
import { CalendarClock, MapPin, Video, Phone } from 'lucide-react'
import BookingForm from '@/components/forms/BookingForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProcessSteps from '@/components/ProcessSteps'
import SectionHeading from '@/components/SectionHeading'
import FinalCta from '@/components/FinalCta'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd } from '@/lib/seo'
import { IMAGES, PHONE_DISPLAY, PHONE_TEL, SITE } from '@/config/site'

export const metadata = pageMeta({
  title: 'Đặt Lịch Tư Vấn Luật Sư — Chọn Giờ Phù Hợp Với Bạn',
  description:
    'Đặt lịch hẹn tư vấn với luật sư Apolo theo khung giờ thuận tiện. Tư vấn trực tiếp, online hoặc qua điện thoại. Miễn phí lần đầu. Gọi 0903 419 479.',
  path: '/dat-lich-tu-van',
})

const MODES = [
  { icon: MapPin, title: 'Tại văn phòng', desc: 'Gặp trực tiếp luật sư tại văn phòng 108 Trần Đình Xu, Phường Cầu Ông Lãnh, Thành phố Hồ Chí Minh.' },
  { icon: Video, title: 'Trực tuyến', desc: 'Tư vấn qua video call hoặc Zalo, tiện lợi cho khách ở xa.' },
  { icon: Phone, title: 'Qua điện thoại', desc: 'Luật sư gọi đúng khung giờ bạn chọn, không cần chờ đợi.' },
]

export default function DatLichPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Đặt lịch tư vấn', path: '/dat-lich-tu-van' },
        ])}
      />

      <section className="relative overflow-hidden bg-surface">
        <Image src={IMAGES.heroBg} alt="" fill priority sizes="100vw" className="object-cover opacity-10" />
        <div className="container-x relative grid items-start gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:py-16">
          <div>
            <Breadcrumbs items={[{ name: 'Đặt lịch tư vấn', path: '/dat-lich-tu-van' }]} />
            <span className="eyebrow mb-4 mt-6">Đặt lịch hẹn</span>
            <h1 className="text-[2.2rem] font-extrabold leading-tight text-navy sm:text-[2.8rem]">
              Đặt lịch tư vấn luật sư —<br />
              <span className="text-confidence">chọn giờ phù hợp với bạn</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">
              Chủ động sắp xếp một buổi tư vấn chuyên sâu với luật sư đúng lĩnh vực. Bạn chọn ngày giờ,
              chúng tôi xác nhận và đảm bảo luật sư sẵn sàng đúng hẹn.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {MODES.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.title} className="card p-4">
                    <Icon className="mb-2 h-6 w-6 text-confidence" strokeWidth={1.8} />
                    <h3 className="text-base font-bold text-navy">{m.title}</h3>
                    <p className="mt-1 text-sm text-steel">{m.desc}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-confidence/15 bg-white p-5">
              <CalendarClock className="h-7 w-7 shrink-0 text-confidence" />
              <div>
                <p className="text-sm font-semibold text-steel">Cần hỗ trợ đặt lịch?</p>
                <a href={`tel:${PHONE_TEL}`} className="text-xl font-extrabold text-confidence">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <SectionHeading
          eyebrow="Sau khi đặt lịch"
          title="Điều gì diễn ra tiếp theo?"
          lead="Quy trình rõ ràng để buổi tư vấn của bạn hiệu quả nhất."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </section>

      <FinalCta
        title="Sẵn sàng cho buổi tư vấn của bạn"
        subtitle={`Hoặc gọi ngay ${SITE.phoneDisplay} để được đặt lịch nhanh trong vài phút.`}
      />
    </>
  )
}
