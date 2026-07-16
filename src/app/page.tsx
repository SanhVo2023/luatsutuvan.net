import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, ShieldCheck, Wallet, UserCheck, ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import PracticeGrid from '@/components/PracticeGrid'
import AdviceGap from '@/components/AdviceGap'
import ProcessSteps from '@/components/ProcessSteps'
import Testimonials from '@/components/Testimonials'
import FaqAccordion from '@/components/FaqAccordion'
import FinalCta from '@/components/FinalCta'
import SectionHeading from '@/components/SectionHeading'
import QuickForm from '@/components/forms/QuickForm'
import ScrollReveal from '@/components/animations/ScrollReveal'
import JsonLd from '@/components/JsonLd'
import { faqLd, breadcrumbLd, absUrl } from '@/lib/seo'
import { GENERAL_FAQS } from '@/content/faqs'
import { IMAGES, SITE } from '@/config/site'

// The homepage inherits title/description from the root layout but was the only
// indexed route without a self-canonical — set it explicitly here.
export const metadata: Metadata = {
  alternates: { canonical: absUrl('/') },
}

const WHY = [
  { icon: Zap, title: 'Phản hồi tức thì', desc: 'Luật sư gọi lại trong 30 phút, không để bạn chờ đợi trong lo lắng.' },
  { icon: UserCheck, title: 'Luật sư chuyên môn', desc: 'Mỗi vụ việc do luật sư đúng lĩnh vực phụ trách, không tư vấn chung chung.' },
  { icon: Wallet, title: 'Chi phí minh bạch', desc: 'Báo phí rõ ràng bằng văn bản ngay từ đầu, không phát sinh bất ngờ.' },
  { icon: ShieldCheck, title: 'Bảo mật tuyệt đối', desc: 'Thông tin của bạn được bảo vệ theo Luật Luật sư và đạo đức nghề nghiệp.' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: 'Trang chủ', path: '/' }]),
          faqLd(GENERAL_FAQS),
        ]}
      />

      <Hero />

      {/* Trust strip */}
      <section className="container-x -mt-8 relative z-10">
        <TrustStrip />
      </section>

      {/* Practice routing grid */}
      <section className="container-x section">
        <SectionHeading
          eyebrow="Lĩnh vực tư vấn"
          title="Bạn đang gặp vấn đề pháp lý nào?"
          lead="Chọn lĩnh vực phù hợp để được luật sư chuyên môn tư vấn nhanh và chính xác nhất."
        />
        <div className="section-head-gap">
          <PracticeGrid />
        </div>
        <ScrollReveal className="mt-8 text-center">
          <Link href="/tu-van-theo-linh-vuc" className="btn btn-ghost">
            Xem tất cả lĩnh vực <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </section>

      {/* Advice gap — online/AI vs a real lawyer (core conversion narrative) */}
      <AdviceGap />

      {/* Why us — over marble texture */}
      <section className="relative overflow-hidden bg-surface section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Vì sao chọn chúng tôi"
            title="Sự an tâm bắt đầu từ một cuộc gọi"
            lead="Apolo Lawyers tiếp nhận nhanh, phân loại đúng lĩnh vực và tư vấn phương án rõ ràng — để bạn biết chính xác bước tiếp theo."
          />
          <div className="section-head-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => {
              const Icon = w.icon
              return (
                <ScrollReveal key={w.title} delay={i * 0.08}>
                  <div className="card card-lift h-full p-6">
                    <span className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-trust text-white shadow-[var(--shadow-trust)]">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <h3 className="mb-2 text-lg font-extrabold text-navy">{w.title}</h3>
                    <p className="text-[0.95rem] leading-relaxed text-steel">{w.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x section">
        <SectionHeading
          eyebrow="Quy trình tiếp nhận"
          title="Chỉ 4 bước để được luật sư hỗ trợ"
          lead="Một quy trình rõ ràng, minh bạch — bạn luôn biết điều gì sẽ diễn ra tiếp theo."
        />
        <div className="section-head-gap">
          <ProcessSteps />
        </div>
      </section>

      {/* Mid-page quick form over signing image */}
      <section className="relative overflow-hidden section">
        <Image src={IMAGES.signing} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal className="mb-6 text-center text-white">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Gửi câu hỏi ngay — đừng chần chừ</h2>
              <p className="mt-3 text-lg text-white/80">
                Mỗi ngày trì hoãn là một ngày rủi ro pháp lý tăng lên. Để lại thông tin, luật sư gọi lại trong 30 phút.
              </p>
            </ScrollReveal>
            <QuickForm heading="Nhập thông tin — luật sư sẽ liên hệ ngay với bạn" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x section">
        <SectionHeading
          eyebrow="Khách hàng chia sẻ"
          title="Những tình huống chúng tôi đã đồng hành"
          lead="Các tình huống tiêu biểu được kể lại và ẩn danh theo yêu cầu bảo mật, minh họa cách luật sư Apolo tiếp cận từng vụ việc."
        />
        <div className="section-head-gap">
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Câu hỏi thường gặp"
              title="Những điều bạn cần biết trước khi tư vấn"
              align="left"
            />
            <ScrollReveal delay={0.15} className="mt-6">
              <p className="text-steel">
                Không tìm thấy câu trả lời?{' '}
                <Link href="/gui-cau-hoi" className="font-bold text-trust-700 underline underline-offset-2">
                  Gửi câu hỏi trực tiếp cho luật sư
                </Link>{' '}
                — hoàn toàn miễn phí.
              </p>
            </ScrollReveal>
          </div>
          <div>
            <FaqAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
