import { Phone, Mail, MapPin, MessageCircle, Clock, Building2 } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import ConsultForm from '@/components/forms/ConsultForm'
import SectionHeading from '@/components/SectionHeading'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd } from '@/lib/seo'
import { SITE, PHONE_DISPLAY, PHONE_TEL, EMAIL, ZALO_URL, WHATSAPP_URL } from '@/config/site'

export const metadata = pageMeta({
  title: 'Liên Hệ Luật Sư Tư Vấn — Apolo Lawyers TP.HCM',
  description:
    'Liên hệ Apolo Lawyers qua điện thoại, Zalo, email hoặc đến văn phòng tại TP.HCM. Phản hồi trong 30 phút. Gọi 0903 419 479.',
  path: '/lien-he',
})

const CHANNELS = [
  { icon: Phone, label: 'Hotline tư vấn', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, accent: 'trust' },
  { icon: MessageCircle, label: 'Zalo OA', value: 'zalo.me/apololawyers', href: ZALO_URL, accent: 'confidence' },
  { icon: MessageCircle, label: 'WhatsApp', value: PHONE_DISPLAY, href: WHATSAPP_URL, accent: 'trust' },
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, accent: 'confidence' },
]

export default function LienHePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Liên hệ', path: '/lien-he' },
        ])}
      />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Liên hệ', path: '/lien-he' }]} />
      </section>

      <section className="container-x py-10 sm:py-14">
        <SectionHeading
          eyebrow="Liên hệ"
          title="Nhiều cách để kết nối với luật sư"
          lead="Chọn kênh thuận tiện nhất — chúng tôi luôn có người sẵn sàng lắng nghe bạn."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* channels + office */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CHANNELS.map((c) => {
                const Icon = c.icon
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="card card-lift flex items-center gap-4 p-5"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${
                        c.accent === 'trust' ? 'bg-trust' : 'bg-confidence'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-steel">{c.label}</span>
                      <span className="block text-lg font-extrabold text-navy">{c.value}</span>
                    </span>
                  </a>
                )
              })}
            </div>

            <div className="card mt-6 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-navy">
                <Building2 className="h-5 w-5 text-trust" /> Văn phòng
              </h3>
              <div className="space-y-4 text-[0.97rem]">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-trust" />
                  <span>
                    <strong className="block text-navy">Trụ sở chính</strong>
                    <span className="text-steel">{SITE.address}</span>
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-trust" />
                  <span>
                    <strong className="block text-navy">Chi nhánh Đông Sài Gòn</strong>
                    <span className="text-steel">{SITE.branchAddress}</span>
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-trust" />
                  <span className="text-steel">Thứ 2 – Thứ 7: 08:00 – 20:00</span>
                </p>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-[rgba(26,35,50,0.08)]">
                <iframe
                  title="Bản đồ văn phòng Apolo Lawyers"
                  src="https://www.google.com/maps?q=108+Tr%E1%BA%A7n+%C4%90%C3%ACnh+Xu+TP.HCM&output=embed"
                  width="100%"
                  height="240"
                  loading="lazy"
                  className="block"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* form */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ConsultForm title="Gửi yêu cầu tư vấn" />
          </div>
        </div>
      </section>
    </>
  )
}
