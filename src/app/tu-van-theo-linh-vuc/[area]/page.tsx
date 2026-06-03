import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Phone, ArrowUpRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import ConsultForm from '@/components/forms/ConsultForm'
import ProcessSteps from '@/components/ProcessSteps'
import Testimonials from '@/components/Testimonials'
import FaqAccordion from '@/components/FaqAccordion'
import SectionHeading from '@/components/SectionHeading'
import TrustStrip from '@/components/TrustStrip'
import FinalCta from '@/components/FinalCta'
import ScrollReveal from '@/components/animations/ScrollReveal'
import JsonLd from '@/components/JsonLd'
import PracticeIcon from '@/components/PracticeIcon'
import { pageMeta, breadcrumbLd, faqLd } from '@/lib/seo'
import { PRACTICE_AREAS, getPracticeArea, PHONE_DISPLAY, PHONE_TEL, GUARANTEES } from '@/config/site'
import { getPracticeContent } from '@/content/practice-content'

export function generateStaticParams() {
  return PRACTICE_AREAS.map((p) => ({ area: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const pa = getPracticeArea(area)
  const content = getPracticeContent(area)
  if (!pa || !content) return {}
  return pageMeta({
    title: `${pa.name} — Phản Hồi Trong 30 Phút`,
    description: `${content.heroSub} Miễn phí tư vấn lần đầu. Gọi ${PHONE_DISPLAY}.`,
    path: `/tu-van-theo-linh-vuc/${area}`,
    image: pa.image,
  })
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const pa = getPracticeArea(area)
  const content = getPracticeContent(area)
  if (!pa || !content) notFound()

  const related = PRACTICE_AREAS.filter((p) => p.slug !== area).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Lĩnh vực tư vấn', path: '/tu-van-theo-linh-vuc' },
            { name: pa.name, path: `/tu-van-theo-linh-vuc/${area}` },
          ]),
          faqLd(content.faqs),
        ]}
      />

      {/* HERO with inline form */}
      <section className="relative overflow-hidden bg-surface">
        <Image src={pa.image} alt="" fill priority sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/92 to-surface/85" />
        <div className="container-x relative grid items-start gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <Breadcrumbs
              items={[
                { name: 'Lĩnh vực tư vấn', path: '/tu-van-theo-linh-vuc' },
                { name: pa.name, path: `/tu-van-theo-linh-vuc/${area}` },
              ]}
            />
            <span className="mb-5 mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[var(--shadow-card)]">
              <PracticeIcon name={pa.icon} className="h-5 w-5 text-trust" />
              <span className="text-sm font-bold text-navy">{pa.name}</span>
            </span>
            <h1 className="text-[2.1rem] font-extrabold leading-tight text-navy sm:text-[2.7rem]">
              {content.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">{content.heroSub}</p>
            <ul className="mt-6 space-y-2.5">
              {content.whyPoints.slice(0, 3).map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-trust" />
                  <span className="font-medium text-navy">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href={`tel:${PHONE_TEL}`} className="btn btn-call ring-pulse px-7 py-4 text-lg">
                <Phone className="h-5 w-5" /> Gọi {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <ConsultForm
              variant="hero"
              defaultArea={pa.slug}
              lockArea
              title={`Tư vấn ${pa.short.toLowerCase()} miễn phí`}
            />
          </div>
        </div>
      </section>

      {/* Intro + situations */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <ScrollReveal>
            <span className="eyebrow mb-3">Về dịch vụ</span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Vì sao nên có luật sư khi xử lý {pa.short.toLowerCase()}?
            </h2>
            <p className="mt-4 leading-relaxed text-steel">{content.intro}</p>
            <ul className="mt-6 space-y-3">
              {content.whyPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-trust" />
                  <span className="text-navy">{p}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.situations.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="card card-lift h-full p-5">
                  <h3 className="mb-1.5 text-base font-extrabold text-navy">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-steel">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-x pb-4">
        <TrustStrip />
      </section>

      {/* Process */}
      <section className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="Quy trình" title={`Quy trình tư vấn ${pa.short.toLowerCase()}`} />
        <div className="mt-12">
          <ProcessSteps areaName={pa.short} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Giải đáp" title={`Câu hỏi thường gặp về ${pa.short.toLowerCase()}`} />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={content.faqs} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="Khách hàng" title="Khách hàng đã được Apolo hỗ trợ" />
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      {/* Routing + related */}
      <section className="container-x pb-16">
        <div className="card flex flex-col items-start gap-4 bg-gradient-to-br from-confidence-50 to-trust-50 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-navy">Muốn tìm hiểu sâu hơn về {pa.short.toLowerCase()}?</h3>
            <p className="mt-1 text-steel">{pa.routingLabel} trong hệ sinh thái Apolo Lawyers.</p>
          </div>
          <a href={pa.routingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary shrink-0">
            Xem chuyên trang <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-steel">Lĩnh vực liên quan</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/tu-van-theo-linh-vuc/${r.slug}`} className="card card-lift flex items-center gap-3 p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-trust-50 text-trust">
                  <PracticeIcon name={r.icon} className="h-5.5 w-5.5" />
                </span>
                <span className="font-bold text-navy">{r.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title={`Cần tư vấn ${pa.short.toLowerCase()} ngay?`}
        subtitle={`Luật sư chuyên môn sẵn sàng hỗ trợ — ${GUARANTEES.callback}, ${GUARANTEES.free.toLowerCase()}.`}
      />
    </>
  )
}
