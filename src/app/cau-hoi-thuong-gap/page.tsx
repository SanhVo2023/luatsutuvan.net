import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqAccordion from '@/components/FaqAccordion'
import SectionHeading from '@/components/SectionHeading'
import FinalCta from '@/components/FinalCta'
import QuickForm from '@/components/forms/QuickForm'
import ScrollReveal from '@/components/animations/ScrollReveal'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd, faqLd } from '@/lib/seo'
import { GENERAL_FAQS } from '@/content/faqs'
import { PRACTICE_AREAS } from '@/config/site'
import { getPracticeContent } from '@/content/practice-content'

export const metadata = pageMeta({
  title: 'Câu Hỏi Thường Gặp Về Tư Vấn Luật Sư',
  description:
    'Giải đáp các câu hỏi thường gặp về tư vấn luật sư: chi phí, thời gian phản hồi, bảo mật, đại diện tòa án. Phản hồi trong 30 phút.',
  path: '/cau-hoi-thuong-gap',
})

// Pull a couple of FAQs from each practice area for a richer page.
const AREA_FAQS = PRACTICE_AREAS.flatMap((p) => {
  const c = getPracticeContent(p.slug)
  return c ? c.faqs.slice(0, 2).map((f) => ({ ...f, area: p })) : []
})

const ALL_FAQS = [...GENERAL_FAQS, ...AREA_FAQS.map(({ question, answer }) => ({ question, answer }))]

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Câu hỏi thường gặp', path: '/cau-hoi-thuong-gap' },
          ]),
          faqLd(ALL_FAQS),
        ]}
      />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Câu hỏi thường gặp', path: '/cau-hoi-thuong-gap' }]} />
      </section>

      <section className="container-x py-10 sm:py-14">
        <SectionHeading
          eyebrow="Câu hỏi thường gặp"
          title="Giải đáp mọi thắc mắc trước khi tư vấn"
          lead="Tổng hợp những câu hỏi khách hàng quan tâm nhất. Không thấy câu trả lời? Gửi câu hỏi ngay — miễn phí."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-4 text-xl font-extrabold text-navy">Câu hỏi chung</h2>
            <FaqAccordion items={GENERAL_FAQS} />

            <h2 className="mb-4 mt-10 text-xl font-extrabold text-navy">Câu hỏi theo lĩnh vực</h2>
            <FaqAccordion items={AREA_FAQS.map(({ question, answer }) => ({ question, answer }))} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <QuickForm heading="Gửi câu hỏi của bạn" />
            <ScrollReveal>
              <div className="card p-6">
                <h3 className="mb-3 font-extrabold text-navy">Tư vấn theo lĩnh vực</h3>
                <ul className="space-y-2 text-sm">
                  {PRACTICE_AREAS.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/tu-van-theo-linh-vuc/${p.slug}`} className="text-confidence hover:text-trust">
                        {p.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
