import Breadcrumbs from '@/components/Breadcrumbs'
import ProcessSteps from '@/components/ProcessSteps'
import SectionHeading from '@/components/SectionHeading'
import TrustStrip from '@/components/TrustStrip'
import FaqAccordion from '@/components/FaqAccordion'
import FinalCta from '@/components/FinalCta'
import ScrollReveal from '@/components/animations/ScrollReveal'
import QuickForm from '@/components/forms/QuickForm'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Quy Trình Tiếp Nhận & Tư Vấn — Minh Bạch Từng Bước',
  description:
    'Tìm hiểu quy trình tiếp nhận và tư vấn của Apolo Lawyers: từ gửi câu hỏi đến khi vụ việc được giải quyết. Minh bạch, nhanh chóng, bảo mật.',
  path: '/quy-trinh-tiep-nhan',
})

const COMMITMENTS = [
  { title: 'Tiếp nhận trong 30 phút', desc: 'Mọi yêu cầu đều được phản hồi nhanh, không để khách hàng chờ đợi trong lo lắng.' },
  { title: 'Đúng luật sư chuyên môn', desc: 'Vụ việc được phân về luật sư có kinh nghiệm đúng lĩnh vực, không tư vấn chung chung.' },
  { title: 'Báo phí trước bằng văn bản', desc: 'Bạn biết rõ chi phí trước khi bắt đầu, không bao giờ có chi phí phát sinh bất ngờ.' },
  { title: 'Cập nhật tiến độ thường xuyên', desc: 'Luật sư báo cáo tiến độ vụ việc định kỳ, bạn luôn nắm được tình hình.' },
]

const PROCESS_FAQ = [
  {
    question: 'Tôi cần chuẩn bị gì trước khi tư vấn?',
    answer:
      'Bạn chỉ cần mô tả ngắn gọn vấn đề và chuẩn bị các giấy tờ liên quan (nếu có) như hợp đồng, giấy tờ tùy thân, văn bản từ cơ quan chức năng. Luật sư sẽ hướng dẫn cụ thể những gì cần bổ sung sau cuộc trao đổi đầu tiên.',
  },
  {
    question: 'Tư vấn lần đầu có bị ràng buộc phải thuê dịch vụ không?',
    answer:
      'Không. Tư vấn lần đầu hoàn toàn miễn phí và không ràng buộc. Sau khi nghe luật sư phân tích, bạn tự quyết định có sử dụng dịch vụ hay không. Chúng tôi tôn trọng mọi quyết định của bạn.',
  },
  {
    question: 'Quy trình thanh toán phí dịch vụ như thế nào?',
    answer:
      'Sau khi thống nhất phương án, hai bên ký hợp đồng dịch vụ pháp lý ghi rõ phạm vi công việc và mức phí. Phí dịch vụ được thỏa thuận theo Điều 55 Luật Luật sư, thường thanh toán theo giai đoạn công việc.',
  },
]

export default function QuyTrinhPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Quy trình tiếp nhận', path: '/quy-trinh-tiep-nhan' },
          ]),
        ]}
      />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Quy trình tiếp nhận', path: '/quy-trinh-tiep-nhan' }]} />
      </section>

      <section className="container-x py-10 sm:py-14">
        <SectionHeading
          eyebrow="Quy trình tiếp nhận"
          title="Cách chúng tôi tiếp nhận và xử lý vụ việc của bạn"
          lead="Một quy trình rõ ràng như phòng cấp cứu pháp lý — tiếp nhận nhanh, phân loại đúng, hành động ngay."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Cam kết" title="4 cam kết với mọi khách hàng" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.08}>
                <div className="card h-full p-6">
                  <span className="mb-3 inline-flex h-9 items-center rounded-full bg-trust-50 px-3 text-sm font-bold text-trust-700">
                    Cam kết {i + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-extrabold text-navy">{c.title}</h3>
                  <p className="leading-relaxed text-steel">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <TrustStrip />
      </section>

      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Giải đáp" title="Câu hỏi về quy trình" align="left" />
            <div className="mt-8">
              <FaqAccordion items={PROCESS_FAQ} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuickForm heading="Bắt đầu ngay — gửi câu hỏi cho luật sư" />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
