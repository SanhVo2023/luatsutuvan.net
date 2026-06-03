import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMeta, breadcrumbLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { SITE, PHONE_DISPLAY } from '@/config/site'

export const metadata = pageMeta({
  title: 'Điều Khoản Sử Dụng',
  description: 'Điều khoản sử dụng website Luật Sư Tư Vấn — Apolo Lawyers.',
  path: '/dieu-khoan-su-dung',
})

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Trang chủ', path: '/' }, { name: 'Điều khoản sử dụng', path: '/dieu-khoan-su-dung' }])} />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Điều khoản sử dụng', path: '/dieu-khoan-su-dung' }]} />
      </section>
      <article className="container-x prose prose-lg max-w-3xl py-10">
        <h1>Điều khoản sử dụng</h1>
        <p>
          Bằng việc truy cập và sử dụng website {SITE.domain}, bạn đồng ý với các điều khoản dưới đây.
        </p>
        <h2>1. Tính chất thông tin</h2>
        <p>
          Nội dung trên website mang tính tham khảo chung, không thay thế cho tư vấn pháp lý cụ thể cho từng trường hợp.
          Để được tư vấn chính xác, vui lòng liên hệ trực tiếp với luật sư của chúng tôi.
        </p>
        <h2>2. Quan hệ luật sư – khách hàng</h2>
        <p>
          Việc gửi câu hỏi qua website không tự động hình thành quan hệ luật sư – khách hàng. Quan hệ này chỉ được xác lập
          khi hai bên ký hợp đồng dịch vụ pháp lý.
        </p>
        <h2>3. Sở hữu trí tuệ</h2>
        <p>
          Toàn bộ nội dung, hình ảnh và thiết kế trên website thuộc quyền sở hữu của {SITE.shortName}. Nghiêm cấm sao chép,
          sử dụng vì mục đích thương mại khi chưa được cho phép.
        </p>
        <h2>4. Giới hạn trách nhiệm</h2>
        <p>
          Chúng tôi không chịu trách nhiệm cho các quyết định bạn đưa ra chỉ dựa trên thông tin tham khảo trên website mà
          không có tư vấn cụ thể từ luật sư.
        </p>
        <h2>5. Liên hệ</h2>
        <p>
          Mọi thắc mắc, vui lòng gọi <strong>{PHONE_DISPLAY}</strong>.
        </p>
      </article>
    </>
  )
}
