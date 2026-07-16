import Breadcrumbs from '@/components/Breadcrumbs'
import PracticeGrid from '@/components/PracticeGrid'
import SectionHeading from '@/components/SectionHeading'
import TrustStrip from '@/components/TrustStrip'
import FinalCta from '@/components/FinalCta'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Tư Vấn Pháp Luật Theo Lĩnh Vực — 8 Chuyên Môn',
  description:
    'Chọn lĩnh vực pháp lý bạn cần: ly hôn, đất đai, doanh nghiệp, dân sự, hình sự, lao động, thừa kế, hợp đồng. Luật sư chuyên môn phản hồi trong 30 phút.',
  path: '/tu-van-theo-linh-vuc',
})

export default function PracticeDirectoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Lĩnh vực tư vấn', path: '/tu-van-theo-linh-vuc' },
        ])}
      />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Lĩnh vực tư vấn', path: '/tu-van-theo-linh-vuc' }]} />
      </section>
      <section className="container-x py-12 sm:py-16">
        <SectionHeading
          as="h1"
          eyebrow="Lĩnh vực tư vấn"
          title="Luật sư chuyên môn cho từng lĩnh vực"
          lead="Mỗi vụ việc được luật sư đúng chuyên môn phụ trách. Chọn lĩnh vực để được tư vấn chính xác và nhanh nhất."
        />
        <div className="mt-12">
          <PracticeGrid />
        </div>
      </section>
      <section className="container-x pb-16">
        <TrustStrip />
      </section>
      <FinalCta />
    </>
  )
}
