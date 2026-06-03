'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Phone, CheckCircle2 } from 'lucide-react'
import ConsultForm from '@/components/forms/ConsultForm'
import GradientOrbs from '@/components/animations/GradientOrbs'
import ParallaxSection from '@/components/animations/ParallaxSection'
import { PHONE_DISPLAY, PHONE_TEL, GUARANTEES, IMAGES } from '@/config/site'

const PROOF = [GUARANTEES.response, GUARANTEES.free, GUARANTEES.confidential]

/**
 * Homepage hero — "Legal Urgent Care" above-the-fold. Headline + proof on the
 * left, inline multi-step lead form sliding in from the right (GSAP 0.3s
 * ease-out per PRD §2). Form is visible without scrolling on all viewports.
 */
export default function Hero() {
  const formRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
      gsap.from(formRef.current, {
        opacity: 0,
        x: 48,
        duration: 0.55,
        delay: 0.15,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* atmospheric backdrop — gentle parallax, overscanned to avoid edge gaps */}
      <ParallaxSection speed={0.55} className="absolute -inset-y-16 inset-x-0">
        <Image src={IMAGES.heroBg} alt="" fill priority sizes="100vw" className="object-cover" />
      </ParallaxSection>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-surface/90" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,white_42%,transparent_72%)]" />
      <GradientOrbs primary="#0D9F6E" secondary="#1E6BB8" accent="#E8792B" />

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* LEFT — message */}
        <div ref={leftRef}>
          <span className="eyebrow mb-5">Tổng đài tư vấn pháp luật</span>
          <h1 className="text-4xl font-extrabold text-navy">
            Cần luật sư{' '}
            <span className="relative whitespace-nowrap text-trust">
              ngay bây giờ?
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 300 10"
                fill="none"
                aria-hidden
              >
                <path d="M2 7 C 80 2, 220 2, 298 7" stroke="#E8792B" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            Gửi câu hỏi — phản hồi trong 30 phút.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            Luật sư của <strong className="text-navy">Apolo Lawyers</strong> sẵn sàng lắng nghe và tư vấn
            phương án xử lý rõ ràng cho mọi vấn đề pháp lý của bạn. Nhanh chóng, chuyên nghiệp và bảo mật.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {PROOF.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 className="h-5 w-5 text-trust" /> {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-call ring-pulse px-7 py-4 text-lg">
              <Phone className="h-5 w-5" /> Gọi {PHONE_DISPLAY}
            </a>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-steel">
              <span className="live-dot" /> Luật sư đang trực tuyến
            </span>
          </div>
        </div>

        {/* RIGHT — inline lead form */}
        <div ref={formRef} className="lg:pl-4">
          <ConsultForm
            variant="hero"
            title="Nhận tư vấn miễn phí từ luật sư"
          />
        </div>
      </div>
    </section>
  )
}
