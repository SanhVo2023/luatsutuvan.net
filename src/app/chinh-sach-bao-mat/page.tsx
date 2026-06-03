import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMeta, breadcrumbLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { EMAIL, PHONE_DISPLAY, SITE } from '@/config/site'

export const metadata = pageMeta({
  title: 'Chính Sách Bảo Mật',
  description: 'Chính sách bảo mật thông tin khách hàng của Luật Sư Tư Vấn — Apolo Lawyers.',
  path: '/chinh-sach-bao-mat',
})

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Trang chủ', path: '/' }, { name: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' }])} />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' }]} />
      </section>
      <article className="container-x prose prose-lg max-w-3xl py-10">
        <h1>Chính sách bảo mật</h1>
        <p>
          {SITE.shortName} (&ldquo;chúng tôi&rdquo;) cam kết bảo vệ thông tin cá nhân của khách hàng khi sử dụng
          website {SITE.domain}. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
        </p>
        <h2>1. Thông tin chúng tôi thu thập</h2>
        <p>
          Khi bạn gửi câu hỏi hoặc đặt lịch tư vấn, chúng tôi thu thập: họ tên, số điện thoại, email (nếu có) và nội dung
          vấn đề pháp lý bạn mô tả. Chúng tôi cũng có thể thu thập dữ liệu truy cập ẩn danh để cải thiện dịch vụ.
        </p>
        <h2>2. Mục đích sử dụng</h2>
        <p>
          Thông tin của bạn chỉ được dùng để: liên hệ tư vấn, xử lý vụ việc theo yêu cầu, và nâng cao chất lượng dịch vụ.
          Chúng tôi không bán hoặc chia sẻ thông tin của bạn cho bên thứ ba vì mục đích thương mại.
        </p>
        <h2>3. Bảo mật theo Luật Luật sư</h2>
        <p>
          Nghĩa vụ giữ bí mật thông tin khách hàng được quy định tại Điều 25 Luật Luật sư và Quy tắc Đạo đức và Ứng xử
          nghề nghiệp luật sư Việt Nam. Mọi thông tin trao đổi giữa bạn và luật sư đều được bảo mật tuyệt đối.
        </p>
        <h2>4. Quyền của bạn</h2>
        <p>
          Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với
          chúng tôi.
        </p>
        <h2>5. Liên hệ</h2>
        <p>
          Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ: <strong>{EMAIL}</strong> hoặc gọi{' '}
          <strong>{PHONE_DISPLAY}</strong>.
        </p>
      </article>
    </>
  )
}
