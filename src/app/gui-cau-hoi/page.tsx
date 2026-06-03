import Image from 'next/image'
import { Clock, ShieldCheck, Gift, Phone } from 'lucide-react'
import ConsultForm from '@/components/forms/ConsultForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import TrustStrip from '@/components/TrustStrip'
import FaqAccordion from '@/components/FaqAccordion'
import SectionHeading from '@/components/SectionHeading'
import FinalCta from '@/components/FinalCta'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd, faqLd } from '@/lib/seo'
import { GENERAL_FAQS } from '@/content/faqs'
import { IMAGES, PHONE_DISPLAY, PHONE_TEL, GUARANTEES } from '@/config/site'

export const metadata = pageMeta({
  title: 'Gửi Câu Hỏi Cho Luật Sư — Phản Hồi Trong 30 Phút',
  description:
    'Gửi câu hỏi pháp lý cho luật sư Apolo ngay hôm nay. Phản hồi nhanh trong 30 phút. Miễn phí tư vấn lần đầu. Gọi 0903 419 479.',
  path: '/gui-cau-hoi',
})

const POINTS = [
  { icon: Clock, text: 'Luật sư phản hồi trong vòng 30 phút (trong giờ làm việc)' },
  { icon: Gift, text: 'Hoàn toàn miễn phí cho lần tư vấn đầu tiên' },
  { icon: ShieldCheck, text: 'Thông tin được bảo mật tuyệt đối theo Luật Luật sư' },
]

export default function GuiCauHoiPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Gửi câu hỏi', path: '/gui-cau-hoi' },
          ]),
          faqLd(GENERAL_FAQS),
        ]}
      />

      <section className="relative overflow-hidden bg-surface">
        <Image src={IMAGES.library} alt="" fill priority sizes="100vw" className="object-cover opacity-10" />
        <div className="container-x relative grid items-start gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:py-16">
          <div>
            <Breadcrumbs items={[{ name: 'Gửi câu hỏi', path: '/gui-cau-hoi' }]} />
            <span className="eyebrow mb-4 mt-6">Hỏi luật sư online</span>
            <h1 className="text-[2.2rem] font-extrabold leading-tight text-navy sm:text-[2.8rem]">
              Gửi câu hỏi cho luật sư —<br />
              <span className="text-trust">nhận tư vấn trong 30 phút</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">
              Mô tả vấn đề của bạn, để lại số điện thoại. Luật sư chuyên môn của Apolo Lawyers sẽ gọi lại,
              lắng nghe và đưa ra hướng giải quyết cụ thể — không vòng vo, không cam kết ràng buộc.
            </p>
            <ul className="mt-7 space-y-3">
              {POINTS.map((p) => {
                const Icon = p.icon
                return (
                  <li key={p.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-trust-50 text-trust">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-navy">{p.text}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 rounded-2xl border border-trust/15 bg-white p-5">
              <p className="text-sm font-semibold text-steel">Không muốn chờ? Gọi trực tiếp:</p>
              <a href={`tel:${PHONE_TEL}`} className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-trust">
                <Phone className="h-6 w-6" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <ConsultForm title="Gửi câu hỏi của bạn" />
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <TrustStrip />
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Giải đáp nhanh" title="Câu hỏi thường gặp khi gửi câu hỏi" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      <FinalCta
        title="Vấn đề pháp lý không tự biến mất"
        subtitle={`Gửi câu hỏi ngay hôm nay — ${GUARANTEES.callback}, ${GUARANTEES.free.toLowerCase()}.`}
      />
    </>
  )
}
