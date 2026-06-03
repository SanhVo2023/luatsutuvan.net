import type { FaqItem } from '@/components/FaqAccordion'
import EXTRA from './seo-articles-extra.json'

/**
 * SEO intake-intent content pages (PRD §5). Conversion-focused — 800-1,200 words
 * each, real Vietnamese copy with inline statutory citations, structured H2/H3.
 * These are NOT the 2,500-word authority rubric; they exist to capture
 * intake-intent search traffic and route it into the lead form.
 *
 * Body is markdown (rendered with <Markdown>). 10 seeded; the shape extends to
 * the full ~42 by appending entries here.
 */

export interface SeoArticle {
  slug: string
  title: string
  /** meta description / list excerpt */
  excerpt: string
  /** target keyword cluster (for internal reference) */
  keyword: string
  /** related practice-area slug, drives the embedded form pre-selection */
  practiceArea?: string
  /** R2 hero image */
  image: string
  /** ISO date */
  updated: string
  /** markdown body */
  body: string
  faqs: FaqItem[]
}

const IMG = 'https://pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev/vothienhien.com'

export const SEO_ARTICLES: SeoArticle[] = [
  {
    slug: 'cach-gui-cau-hoi-cho-luat-su-online-mien-phi',
    title: 'Cách gửi câu hỏi cho luật sư online miễn phí',
    excerpt:
      'Hướng dẫn chi tiết cách gửi câu hỏi cho luật sư online miễn phí, nhận phản hồi trong 30 phút mà không cần đến văn phòng.',
    keyword: 'gửi câu hỏi luật sư online',
    practiceArea: 'dan-su',
    image: `${IMG}/content/section-document-signing-63dc5758.webp`,
    updated: '2026-05-20',
    body: `Khi gặp một vấn đề pháp lý, điều khiến nhiều người chần chừ nhất là không biết bắt đầu từ đâu và lo ngại chi phí. Tin tốt là bạn hoàn toàn có thể **gửi câu hỏi cho luật sư online miễn phí** và nhận được phản hồi nhanh chóng, mà không cần xin nghỉ làm hay đến tận văn phòng.

## Vì sao nên hỏi luật sư online?

Tư vấn pháp luật trực tuyến đã trở thành lựa chọn phổ biến vì sự nhanh chóng và tiện lợi. Thay vì mất nửa ngày di chuyển, bạn chỉ cần mô tả vấn đề và để lại số điện thoại — luật sư sẽ chủ động gọi lại. Quyền được tư vấn và bảo vệ quyền lợi hợp pháp là quyền cơ bản của mọi công dân, và việc tiếp cận luật sư chưa bao giờ dễ dàng đến thế.

- **Tiết kiệm thời gian**: không cần di chuyển, không cần chờ đợi tại văn phòng.
- **Bảo mật**: trao đổi riêng tư qua điện thoại hoặc Zalo.
- **Miễn phí lần đầu**: bạn được đánh giá sơ bộ vụ việc trước khi quyết định.

## 3 bước gửi câu hỏi cho luật sư

### Bước 1 — Mô tả vấn đề ngắn gọn
Bạn không cần dùng thuật ngữ pháp lý. Hãy kể lại sự việc bằng ngôn ngữ đời thường: chuyện gì đã xảy ra, ai liên quan, bạn mong muốn điều gì. Càng cụ thể, luật sư càng tư vấn chính xác.

### Bước 2 — Để lại thông tin liên hệ
Chỉ cần họ tên và số điện thoại. Email là không bắt buộc. Hệ thống của chúng tôi bảo mật thông tin theo Điều 25 Luật Luật sư 2006 (sửa đổi, bổ sung 2012) về nghĩa vụ giữ bí mật thông tin khách hàng.

### Bước 3 — Nhận cuộc gọi từ luật sư
Trong giờ làm việc, luật sư phản hồi trong vòng 30 phút. Bạn sẽ được nghe phân tích sơ bộ, định hướng giải pháp và (nếu cần) báo phí dịch vụ minh bạch.

## Những thông tin nên chuẩn bị trước

Để cuộc tư vấn hiệu quả, bạn nên có sẵn:

1. **Các mốc thời gian quan trọng** của sự việc.
2. **Giấy tờ liên quan** (hợp đồng, biên bản, tin nhắn, giấy tờ tùy thân).
3. **Mong muốn cụ thể** của bạn — ví dụ đòi lại tiền, chấm dứt hợp đồng, hay bảo vệ quyền nuôi con.

## Hỏi online có giá trị pháp lý không?

Tư vấn online giúp bạn hiểu rõ quyền và nghĩa vụ của mình, định hướng cách xử lý. Tuy nhiên, với những vụ việc cần đại diện tố tụng, luật sư sẽ ký hợp đồng dịch vụ pháp lý và tham gia theo quy định tại Điều 75 Bộ luật Tố tụng Dân sự 2015. Quan hệ luật sư – khách hàng chính thức được xác lập khi hai bên ký hợp đồng.

## Đừng để vấn đề kéo dài

Nhiều rắc rối pháp lý trở nên phức tạp và tốn kém hơn chỉ vì bị trì hoãn. Thời hiệu khởi kiện đối với nhiều loại tranh chấp được quy định cụ thể (ví dụ 3 năm với tranh chấp hợp đồng theo Điều 429 Bộ luật Dân sự 2015). Hỏi sớm giúp bạn không bỏ lỡ thời điểm vàng để bảo vệ quyền lợi.

Hãy gửi câu hỏi ngay hôm nay — chỉ mất 30 giây, và một luật sư chuyên môn sẽ liên hệ với bạn.`,
    faqs: [
      {
        question: 'Hỏi luật sư online có thực sự miễn phí không?',
        answer:
          'Có. Lần tư vấn đầu tiên hoàn toàn miễn phí và không ràng buộc. Bạn chỉ trả phí khi quyết định sử dụng dịch vụ pháp lý chuyên sâu, và mức phí luôn được báo trước bằng văn bản theo Điều 55 Luật Luật sư.',
      },
      {
        question: 'Tôi gửi câu hỏi ngoài giờ thì khi nào được trả lời?',
        answer:
          'Trong giờ làm việc (8:00–20:00, T2–T7), luật sư phản hồi trong 30 phút. Ngoài giờ, câu hỏi của bạn được tiếp nhận và phản hồi ngay khi mở cửa sáng hôm sau.',
      },
      {
        question: 'Thông tin tôi gửi có bị tiết lộ không?',
        answer:
          'Không. Mọi thông tin được bảo mật theo Điều 25 Luật Luật sư và Quy tắc Đạo đức nghề nghiệp luật sư, chỉ phục vụ việc tư vấn cho bạn.',
      },
    ],
  },
  {
    slug: 'chi-phi-tu-van-luat-su-la-bao-nhieu',
    title: 'Chi phí tư vấn luật sư là bao nhiêu? Bảng giá 2026',
    excerpt:
      'Giải đáp chi phí thuê luật sư tư vấn năm 2026: các hình thức tính phí, yếu tố ảnh hưởng và cách tránh chi phí ẩn.',
    keyword: 'chi phí tư vấn luật sư',
    practiceArea: 'dan-su',
    image: `${IMG}/content/practice-commercial-b5a1a6d9.webp`,
    updated: '2026-05-22',
    body: `&ldquo;Thuê luật sư có đắt không?&rdquo; là câu hỏi đầu tiên của hầu hết khách hàng. Sự thật là **chi phí tư vấn luật sư** linh hoạt hơn nhiều người nghĩ, và quan trọng nhất là phải minh bạch ngay từ đầu.

## Phí dịch vụ pháp lý được tính như thế nào?

Theo Điều 55 Luật Luật sư 2006 (sửa đổi, bổ sung 2012), mức thù lao của luật sư được tính dựa trên các căn cứ:

- **Nội dung, tính chất của dịch vụ pháp lý**;
- **Thời gian và công sức** luật sư bỏ ra;
- **Kinh nghiệm và uy tín** của luật sư.

Phí được hai bên thỏa thuận trong hợp đồng dịch vụ pháp lý và ghi rõ bằng văn bản. Đây là điểm mấu chốt giúp bạn tránh chi phí phát sinh bất ngờ.

## Các hình thức tính phí phổ biến

### 1. Tư vấn lần đầu — thường miễn phí
Tại Apolo Lawyers, buổi đánh giá sơ bộ vụ việc đầu tiên là miễn phí. Bạn được nghe phân tích và định hướng trước khi quyết định.

### 2. Tính phí theo giờ
Áp dụng cho các vụ việc tư vấn ngắn, soạn thảo hoặc rà soát văn bản. Bạn biết trước đơn giá và ước lượng số giờ.

### 3. Phí trọn gói theo vụ việc
Phổ biến cho dịch vụ có phạm vi rõ ràng như thành lập doanh nghiệp, làm thủ tục ly hôn, soạn hợp đồng. Một mức giá cố định cho toàn bộ công việc.

### 4. Phí theo giai đoạn tố tụng
Với các vụ kiện, phí thường chia theo giai đoạn: sơ thẩm, phúc thẩm, thi hành án. Bạn chỉ thanh toán cho giai đoạn đang thực hiện.

## Những yếu tố làm thay đổi chi phí

1. **Độ phức tạp của vụ việc** — tranh chấp nhiều bên, nhiều tài sản sẽ tốn công hơn.
2. **Có cần đại diện ra tòa không** — tư vấn thuần túy rẻ hơn nhiều so với tham gia tố tụng.
3. **Mức độ khẩn cấp** — các vụ cần xử lý gấp đòi hỏi nguồn lực tập trung.
4. **Số lượng tài liệu** cần rà soát, dịch thuật, công chứng.

## Làm sao để tránh &ldquo;chi phí ẩn&rdquo;?

Hãy yêu cầu luật sư **báo phí bằng văn bản** trước khi bắt đầu, ghi rõ phạm vi công việc nào nằm trong phí và phần nào tính thêm. Một văn phòng luật uy tín luôn sẵn sàng minh bạch điều này. Hợp đồng dịch vụ pháp lý rõ ràng bảo vệ cả bạn lẫn luật sư.

## Đắt hay rẻ — hãy nhìn vào giá trị

Một khoản phí tư vấn hợp lý có thể giúp bạn tránh mất hàng trăm triệu đồng vì một điều khoản hợp đồng sơ hở, hoặc giành được quyền nuôi con, đòi lại tài sản. Chi phí phòng ngừa luôn thấp hơn chi phí khắc phục hậu quả.

Để biết chính xác chi phí cho trường hợp của bạn, hãy gửi câu hỏi — luật sư sẽ đánh giá và báo phí miễn phí, không ràng buộc.`,
    faqs: [
      {
        question: 'Tư vấn ban đầu có tính phí không?',
        answer: 'Không. Buổi đánh giá sơ bộ đầu tiên là miễn phí. Bạn chỉ trả phí khi đồng ý sử dụng dịch vụ chuyên sâu.',
      },
      {
        question: 'Phí luật sư có cố định theo quy định nhà nước không?',
        answer:
          'Không. Theo Điều 55 Luật Luật sư, phí dịch vụ được thỏa thuận giữa hai bên dựa trên tính chất vụ việc, thời gian và kinh nghiệm của luật sư, không có biểu giá cố định bắt buộc.',
      },
      {
        question: 'Tôi có thể trả phí theo từng giai đoạn không?',
        answer: 'Có. Với các vụ kiện, phí thường được chia theo giai đoạn tố tụng để giảm áp lực tài chính cho khách hàng.',
      },
    ],
  },
  {
    slug: 'dat-lich-tu-van-luat-su-tai-tphcm',
    title: 'Đặt lịch tư vấn luật sư tại TP.HCM — Hướng dẫn chi tiết',
    excerpt:
      'Cách đặt lịch hẹn tư vấn với luật sư tại TP.HCM: chọn hình thức gặp mặt, online hay qua điện thoại, và những lưu ý quan trọng.',
    keyword: 'đặt lịch luật sư tphcm',
    practiceArea: 'dan-su',
    image: `${IMG}/background/bg-office-hallway-e2bffaa5.webp`,
    updated: '2026-05-18',
    body: `Bạn đang ở TP.HCM và cần gặp luật sư để được tư vấn chuyên sâu? **Đặt lịch tư vấn luật sư** trước giúp bạn chủ động thời gian và đảm bảo luật sư đúng chuyên môn sẵn sàng đón tiếp.

## Vì sao nên đặt lịch trước?

Thay vì đến văn phòng và chờ đợi, việc đặt lịch giúp:

- **Đảm bảo có luật sư đúng lĩnh vực** phụ trách vụ việc của bạn;
- **Chuẩn bị trước hồ sơ** để buổi tư vấn hiệu quả hơn;
- **Tiết kiệm thời gian** cho cả hai bên.

## 3 hình thức tư vấn để bạn lựa chọn

### Tư vấn trực tiếp tại văn phòng
Phù hợp với các vụ việc phức tạp, cần xem xét nhiều giấy tờ gốc. Văn phòng Apolo Lawyers tọa lạc tại 108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh — thuận tiện di chuyển từ nhiều quận.

### Tư vấn trực tuyến (online)
Qua video call hoặc Zalo — lý tưởng cho khách hàng ở xa hoặc bận rộn. Bạn vẫn được tư vấn đầy đủ như gặp trực tiếp.

### Tư vấn qua điện thoại
Nhanh gọn cho những vấn đề cần giải đáp ngay. Luật sư gọi đúng khung giờ bạn chọn.

## Các bước đặt lịch

1. **Chọn lĩnh vực** cần tư vấn (ly hôn, đất đai, doanh nghiệp...).
2. **Chọn ngày và giờ** thuận tiện trong khung giờ làm việc (T2–T7, 8:00–20:00).
3. **Để lại thông tin liên hệ** để chúng tôi xác nhận lịch hẹn.
4. **Nhận xác nhận** và chuẩn bị hồ sơ theo hướng dẫn của luật sư.

## Nên chuẩn bị gì cho buổi tư vấn?

Để buổi gặp đạt hiệu quả cao nhất, bạn nên mang theo:

- Giấy tờ tùy thân (CCCD/hộ chiếu);
- Các tài liệu liên quan đến vụ việc (hợp đồng, sổ đỏ, quyết định, biên bản...);
- Danh sách câu hỏi bạn muốn được giải đáp.

## Luật sư có thể đại diện tôi tại tòa án TP.HCM không?

Có. Ngoài tư vấn, luật sư Apolo nhận đại diện theo ủy quyền và bảo vệ quyền lợi của khách hàng tại tòa án các cấp, theo quy định tại Điều 75 Bộ luật Tố tụng Dân sự 2015. Với các vụ án hình sự, luật sư tham gia bào chữa theo Điều 72 Bộ luật Tố tụng Hình sự 2015.

## Cần gặp luật sư gấp?

Nếu vụ việc của bạn khẩn cấp, đừng chờ đến lịch hẹn — hãy gọi trực tiếp tổng đài. Đặt lịch ngay hôm nay để được luật sư chuyên môn của Apolo Lawyers hỗ trợ tận tình.`,
    faqs: [
      {
        question: 'Đặt lịch tư vấn có mất phí không?',
        answer: 'Việc đặt lịch hoàn toàn miễn phí. Buổi tư vấn lần đầu cũng miễn phí và không ràng buộc.',
      },
      {
        question: 'Tôi ở tỉnh khác có đặt lịch online được không?',
        answer: 'Được. Chúng tôi tư vấn qua video call và Zalo cho khách hàng trên toàn quốc, không chỉ riêng TP.HCM.',
      },
      {
        question: 'Văn phòng Apolo Lawyers ở đâu?',
        answer:
          'Trụ sở chính tại 108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh. Ngoài ra còn có chi nhánh Đông Sài Gòn tại tòa nhà K&M, 33 Ung Văn Khiêm.',
      },
    ],
  },
  {
    slug: 'thu-tuc-ly-hon-don-phuong-can-chuan-bi-gi',
    title: 'Thủ tục ly hôn đơn phương — Cần chuẩn bị gì?',
    excerpt:
      'Hướng dẫn thủ tục ly hôn đơn phương: điều kiện, hồ sơ cần chuẩn bị, trình tự nộp đơn và thời gian giải quyết theo luật mới nhất.',
    keyword: 'thủ tục ly hôn đơn phương',
    practiceArea: 'ly-hon',
    image: `${IMG}/content/practice-family-c50dd275.webp`,
    updated: '2026-05-25',
    body: `Khi hôn nhân không thể tiếp tục mà một bên không đồng ý ly hôn, bạn vẫn có quyền yêu cầu Tòa án giải quyết. Đây gọi là **ly hôn đơn phương**. Bài viết hướng dẫn bạn những gì cần chuẩn bị.

## Ly hôn đơn phương là gì?

Ly hôn đơn phương (ly hôn theo yêu cầu của một bên) là trường hợp chỉ một trong hai vợ chồng muốn chấm dứt hôn nhân. Theo Điều 56 Luật Hôn nhân và Gia đình 2014, Tòa án sẽ giải quyết cho ly hôn khi có căn cứ về việc vợ hoặc chồng có hành vi bạo lực gia đình hoặc vi phạm nghiêm trọng nghĩa vụ, làm cho hôn nhân lâm vào tình trạng trầm trọng, đời sống chung không thể kéo dài.

## Điều kiện để được ly hôn đơn phương

Bạn cần chứng minh được ít nhất một trong các căn cứ:

- Vợ/chồng có hành vi **bạo lực gia đình**;
- **Vi phạm nghiêm trọng** quyền, nghĩa vụ của vợ chồng (ngoại tình, bỏ bê gia đình...);
- Hôn nhân lâm vào tình trạng **trầm trọng, không thể kéo dài**, mục đích hôn nhân không đạt được.

## Hồ sơ cần chuẩn bị

1. **Đơn khởi kiện ly hôn** (theo mẫu);
2. **Giấy chứng nhận đăng ký kết hôn** (bản chính);
3. **CCCD/hộ chiếu** của vợ và chồng (bản sao);
4. **Giấy khai sinh của con** (nếu có con chung);
5. **Giấy tờ chứng minh tài sản chung** (nếu yêu cầu chia tài sản);
6. **Chứng cứ** chứng minh căn cứ ly hôn (nếu có).

## Trình tự, thủ tục

### Bước 1 — Nộp đơn
Nộp đơn khởi kiện tại Tòa án nhân dân cấp huyện nơi bị đơn (vợ/chồng còn lại) cư trú hoặc làm việc, theo quy định về thẩm quyền tại Bộ luật Tố tụng Dân sự 2015.

### Bước 2 — Tòa thụ lý
Tòa án xem xét đơn và thông báo nộp tạm ứng án phí. Sau khi bạn nộp biên lai, Tòa thụ lý vụ án.

### Bước 3 — Hòa giải
Hòa giải là thủ tục bắt buộc tại Tòa theo Điều 205 Bộ luật Tố tụng Dân sự 2015. Nếu hòa giải không thành, vụ án được đưa ra xét xử.

### Bước 4 — Xét xử
Tòa mở phiên tòa, xem xét căn cứ ly hôn, vấn đề con cái và tài sản, rồi ra bản án.

## Quyền nuôi con và chia tài sản

Về con chung, Tòa xem xét quyền lợi mọi mặt của con (Điều 81). Con dưới 36 tháng tuổi thường được giao cho mẹ. Về tài sản, Tòa chia theo nguyên tắc tại Điều 59 Luật Hôn nhân và Gia đình 2014 — về cơ bản là chia đôi nhưng có tính đến công sức đóng góp.

## Mất bao lâu?

Một vụ ly hôn đơn phương thường kéo dài 4–6 tháng, có thể lâu hơn nếu có tranh chấp phức tạp về tài sản hoặc con cái. Việc chuẩn bị hồ sơ đầy đủ và có luật sư hỗ trợ giúp rút ngắn đáng kể thời gian.

Đừng để thủ tục rườm rà khiến bạn nản lòng — gửi câu hỏi để luật sư hướng dẫn từng bước cụ thể cho trường hợp của bạn.`,
    faqs: [
      {
        question: 'Chồng/vợ không chịu ký thì có ly hôn được không?',
        answer:
          'Được. Đó chính là ly hôn đơn phương. Tòa án sẽ giải quyết khi bạn chứng minh được căn cứ theo Điều 56 Luật Hôn nhân và Gia đình 2014, dù bên kia không đồng ý.',
      },
      {
        question: 'Không có giấy đăng ký kết hôn bản chính thì sao?',
        answer:
          'Bạn có thể xin trích lục bản sao tại cơ quan đã đăng ký kết hôn. Luật sư sẽ hướng dẫn thủ tục bổ sung giấy tờ này.',
      },
      {
        question: 'Ly hôn đơn phương nộp đơn ở đâu?',
        answer:
          'Nộp tại Tòa án nhân dân cấp huyện nơi vợ/chồng còn lại (bị đơn) cư trú hoặc làm việc, theo quy định về thẩm quyền của Bộ luật Tố tụng Dân sự 2015.',
      },
    ],
  },
  {
    slug: 'hoi-luat-su-ve-tranh-chap-dat-dai',
    title: 'Hỏi luật sư về tranh chấp đất đai — Gửi câu hỏi ngay',
    excerpt:
      'Các loại tranh chấp đất đai phổ biến, thủ tục hòa giải bắt buộc và khi nào cần luật sư để bảo vệ quyền sử dụng đất của bạn.',
    keyword: 'tranh chấp đất đai',
    practiceArea: 'dat-dai',
    image: `${IMG}/content/practice-civil-9e32fb02.webp`,
    updated: '2026-05-21',
    body: `Tranh chấp đất đai là một trong những loại tranh chấp phổ biến và phức tạp nhất. Một mảnh đất có thể là tài sản lớn nhất của cả gia đình, nên việc **hỏi luật sư về tranh chấp đất đai** sớm là cách khôn ngoan để bảo vệ quyền lợi.

## Các loại tranh chấp đất đai thường gặp

- **Tranh chấp ranh giới, lối đi chung** giữa các thửa đất liền kề;
- **Tranh chấp quyền sử dụng đất** khi nhiều người cùng cho rằng mình có quyền;
- **Tranh chấp hợp đồng** chuyển nhượng, tặng cho, thừa kế quyền sử dụng đất;
- **Tranh chấp khi thu hồi đất**, bồi thường, tái định cư.

## Hòa giải là thủ tục bắt buộc

Đây là điểm rất quan trọng nhiều người không biết. Theo Điều 235 Luật Đất đai 2024, tranh chấp đất đai **phải được hòa giải tại UBND cấp xã** nơi có đất trước khi khởi kiện ra Tòa án. Nếu bỏ qua bước này, đơn khởi kiện của bạn có thể bị Tòa trả lại.

### Trình tự hòa giải

1. Nộp đơn yêu cầu hòa giải tại UBND cấp xã;
2. UBND tổ chức buổi hòa giải có sự tham gia của các bên;
3. Lập biên bản hòa giải thành hoặc không thành.

Nếu hòa giải không thành, bạn mới có quyền khởi kiện ra Tòa án hoặc gửi đơn đến UBND cấp huyện/tỉnh tùy trường hợp.

## Chứng cứ quan trọng trong tranh chấp đất đai

- **Giấy chứng nhận quyền sử dụng đất** (sổ đỏ, sổ hồng);
- **Giấy tờ về nguồn gốc đất** (mua bán, thừa kế, khai hoang);
- **Bản đồ địa chính, hồ sơ đo đạc**;
- **Lời khai của người làm chứng** lâu năm tại địa phương.

Luật sư giúp bạn thu thập, hệ thống hóa và đánh giá giá trị pháp lý của các chứng cứ này.

## Khi nào nhất định cần luật sư?

Bạn nên có luật sư khi:

- Tranh chấp có giá trị lớn hoặc kéo dài;
- Bên kia có giấy tờ pháp lý mạnh hơn;
- Vụ việc liên quan đến nhiều người, nhiều thế hệ;
- Bạn không nắm rõ quy định của Luật Đất đai 2024 (vừa có hiệu lực từ 01/08/2024 với nhiều thay đổi).

## Đất bị thu hồi — quyền lợi của bạn

Khi Nhà nước thu hồi đất, người sử dụng đất hợp pháp được bồi thường về đất, tài sản gắn liền với đất và hỗ trợ tái định cư theo các quy định tại Điều 91 đến Điều 111 Luật Đất đai 2024. Nếu phương án bồi thường chưa thỏa đáng, bạn có quyền khiếu nại.

Đừng để tranh chấp kéo dài làm hao tổn thời gian và tiền bạc. Gửi câu hỏi ngay — luật sư đất đai của Apolo sẽ phân tích vụ việc và đề xuất hướng giải quyết cụ thể.`,
    faqs: [
      {
        question: 'Tranh chấp đất đai có bắt buộc hòa giải không?',
        answer:
          'Có. Theo Điều 235 Luật Đất đai 2024, tranh chấp đất đai phải hòa giải tại UBND cấp xã trước khi khởi kiện. Bỏ qua bước này, đơn khởi kiện có thể bị trả lại.',
      },
      {
        question: 'Đất tranh chấp chưa có sổ đỏ thì giải quyết thế nào?',
        answer:
          'Vẫn giải quyết được nhưng phức tạp hơn. Cần dựa vào giấy tờ về nguồn gốc đất và quá trình sử dụng. Luật sư sẽ tư vấn hướng xác lập quyền và thu thập chứng cứ.',
      },
      {
        question: 'Tôi có thể tự hòa giải mà không cần ra UBND không?',
        answer:
          'Các bên có thể tự thương lượng trước. Tuy nhiên để khởi kiện ra Tòa, thủ tục hòa giải tại UBND cấp xã là bắt buộc theo luật.',
      },
    ],
  },
  {
    slug: 'khi-nao-can-thue-luat-su',
    title: 'Khi nào cần thuê luật sư? 10 tình huống phổ biến',
    excerpt:
      '10 tình huống bạn nên thuê luật sư để bảo vệ quyền lợi, tránh rủi ro pháp lý và tiết kiệm chi phí về lâu dài.',
    keyword: 'khi nào cần thuê luật sư',
    practiceArea: 'dan-su',
    image: `${IMG}/content/article-criminal-defense-3fb4bf85.webp`,
    updated: '2026-05-19',
    body: `Nhiều người chỉ tìm đến luật sư khi mọi chuyện đã rối ren. Thực tế, có những thời điểm việc **thuê luật sư** sớm sẽ giúp bạn tránh được rủi ro lớn và tiết kiệm rất nhiều. Dưới đây là 10 tình huống bạn nên cân nhắc.

## 1. Trước khi ký hợp đồng giá trị lớn

Một điều khoản sơ hở trong hợp đồng mua bán nhà đất, hợp tác kinh doanh có thể khiến bạn mất hàng trăm triệu. Luật sư rà soát giúp bạn phát hiện rủi ro trước khi đặt bút ký, đảm bảo hợp đồng có hiệu lực theo Điều 117 Bộ luật Dân sự 2015.

## 2. Khi bị đơn phương chấm dứt hợp đồng lao động

Nếu bạn bị sa thải mà nghi ngờ trái luật, luật sư giúp đánh giá và yêu cầu bồi thường theo Điều 41 Bộ luật Lao động 2019.

## 3. Khi muốn ly hôn

Đặc biệt là ly hôn đơn phương, có tranh chấp tài sản hoặc giành quyền nuôi con. Luật sư bảo vệ quyền lợi của bạn theo Luật Hôn nhân và Gia đình 2014.

## 4. Khi có tranh chấp đất đai

Đất đai liên quan thủ tục hòa giải bắt buộc (Điều 235 Luật Đất đai 2024) và nhiều quy định phức tạp. Sai một bước có thể khiến bạn mất quyền khởi kiện.

## 5. Khi bị đòi nợ hoặc cần đòi nợ

Luật sư giúp bạn đòi nợ hợp pháp, tránh các hành vi có thể cấu thành tội phạm, và bảo vệ bạn nếu bị đòi nợ trái luật.

## 6. Khi người thân bị tạm giữ, khởi tố

Đây là tình huống khẩn cấp. Theo Điều 74 Bộ luật Tố tụng Hình sự 2015, người bị buộc tội có quyền có luật sư bào chữa ngay từ đầu. Luật sư tham gia càng sớm, quyền lợi càng được bảo vệ tốt.

## 7. Khi thành lập hoặc tái cấu trúc doanh nghiệp

Chọn loại hình, soạn điều lệ, thỏa thuận cổ đông đúng theo Luật Doanh nghiệp 2020 giúp tránh tranh chấp nội bộ về sau.

## 8. Khi giải quyết thừa kế

Phân chia di sản, lập di chúc hợp pháp (Điều 630 Bộ luật Dân sự 2015) cần sự chính xác để tránh tranh chấp gia đình.

## 9. Khi bị xâm phạm quyền lợi, danh dự

Bồi thường thiệt hại ngoài hợp đồng (Điều 584 Bộ luật Dân sự 2015) đòi hỏi chứng minh thiệt hại và lỗi — luật sư giúp bạn làm điều này.

## 10. Khi phải tham gia tố tụng tại tòa

Dù là nguyên đơn hay bị đơn, có luật sư đại diện theo Điều 75 Bộ luật Tố tụng Dân sự 2015 giúp bạn trình bày đúng trọng tâm và bảo vệ quyền lợi hiệu quả.

## Phòng bệnh hơn chữa bệnh

Điểm chung của 10 tình huống trên: **chi phí tư vấn phòng ngừa luôn thấp hơn nhiều chi phí khắc phục hậu quả**. Một cuộc gọi hôm nay có thể giúp bạn tránh nhiều tháng rắc rối.

Không chắc trường hợp của mình có cần luật sư? Gửi câu hỏi — chúng tôi sẽ tư vấn miễn phí và thẳng thắn cho bạn biết.`,
    faqs: [
      {
        question: 'Vụ việc nhỏ có cần thuê luật sư không?',
        answer:
          'Không phải lúc nào cũng cần. Với việc đơn giản, một buổi tư vấn miễn phí có thể đủ để bạn tự xử lý. Luật sư sẽ tư vấn thẳng thắn liệu bạn có thực sự cần dịch vụ chuyên sâu hay không.',
      },
      {
        question: 'Thuê luật sư từ giai đoạn nào là tốt nhất?',
        answer:
          'Càng sớm càng tốt — lý tưởng là trước khi ký kết giao dịch hoặc ngay khi tranh chấp manh nha. Can thiệp sớm giúp bảo vệ quyền lợi và tiết kiệm chi phí.',
      },
      {
        question: 'Tôi có thể chỉ thuê luật sư tư vấn mà không cần ra tòa không?',
        answer: 'Hoàn toàn được. Nhiều khách hàng chỉ cần tư vấn hoặc soạn thảo văn bản mà không cần đến tố tụng.',
      },
    ],
  },
  {
    slug: 'luat-su-tu-van-hop-dong-kiem-tra-hop-dong',
    title: 'Luật sư tư vấn hợp đồng — Kiểm tra hợp đồng của bạn',
    excerpt:
      'Vì sao nên nhờ luật sư rà soát hợp đồng trước khi ký, những điều khoản dễ gây rủi ro và cách bảo vệ quyền lợi của bạn.',
    keyword: 'luật sư tư vấn hợp đồng',
    practiceArea: 'hop-dong',
    image: `${IMG}/content/section-document-signing-63dc5758.webp`,
    updated: '2026-05-23',
    body: `Một bản hợp đồng tưởng chừng đơn giản lại có thể ẩn chứa những điều khoản khiến bạn chịu thiệt nặng nề. Đó là lý do **luật sư tư vấn hợp đồng** trở thành dịch vụ ngày càng được ưa chuộng.

## Tại sao cần kiểm tra hợp đồng trước khi ký?

Khi đã ký, hợp đồng ràng buộc bạn về mặt pháp lý. Theo Điều 401 Bộ luật Dân sự 2015, hợp đồng hợp pháp có hiệu lực bắt buộc thực hiện với các bên. Nếu sau này phát hiện điều khoản bất lợi, việc &ldquo;rút lại&rdquo; rất khó khăn và tốn kém.

Rà soát trước khi ký giúp bạn:

- Phát hiện các điều khoản gây bất lợi hoặc mơ hồ;
- Bổ sung điều khoản bảo vệ quyền lợi còn thiếu;
- Đảm bảo hợp đồng có hiệu lực, tránh nguy cơ bị tuyên vô hiệu.

## Những điều khoản dễ gây rủi ro

### 1. Điều khoản thanh toán
Mốc thời gian, phương thức, hậu quả khi chậm thanh toán cần rõ ràng.

### 2. Điều khoản phạt vi phạm và bồi thường
Theo Điều 418 Bộ luật Dân sự 2015, phạt vi phạm chỉ áp dụng nếu hai bên có thỏa thuận. Trong hợp đồng thương mại, mức phạt không quá 8% giá trị phần nghĩa vụ bị vi phạm (Điều 301 Luật Thương mại 2005).

### 3. Điều khoản chấm dứt hợp đồng
Quy định rõ trường hợp nào được đơn phương chấm dứt và hậu quả pháp lý.

### 4. Điều khoản giải quyết tranh chấp
Chọn Tòa án hay Trọng tài, luật áp dụng — điều này ảnh hưởng lớn khi xảy ra mâu thuẫn.

## Điều kiện để hợp đồng có hiệu lực

Theo Điều 117 Bộ luật Dân sự 2015, hợp đồng có hiệu lực khi:

1. Chủ thể có **năng lực pháp luật và năng lực hành vi** phù hợp;
2. Các bên tham gia **hoàn toàn tự nguyện**;
3. Mục đích, nội dung **không vi phạm điều cấm**, không trái đạo đức xã hội;
4. Tuân thủ **hình thức** luật định (một số hợp đồng phải công chứng, chứng thực).

Luật sư đảm bảo hợp đồng của bạn đáp ứng đủ các điều kiện này.

## Khi tranh chấp đã xảy ra

Nếu bên kia vi phạm, bạn có quyền yêu cầu tiếp tục thực hiện, phạt vi phạm (nếu có thỏa thuận) và bồi thường thiệt hại theo Điều 419 Bộ luật Dân sự 2015. Luật sư giúp bạn xác định đúng quyền và mức yêu cầu hợp lý.

## Đừng ký khi còn băn khoăn

Chỉ một buổi rà soát hợp đồng có thể giúp bạn tránh tổn thất lớn. Trước khi đặt bút ký bất kỳ hợp đồng quan trọng nào, hãy gửi cho luật sư xem qua — gửi câu hỏi ngay để được hỗ trợ.`,
    faqs: [
      {
        question: 'Hợp đồng đã ký rồi có sửa được không?',
        answer:
          'Có thể sửa nếu các bên cùng đồng ý bằng phụ lục hoặc hợp đồng sửa đổi. Nếu một bên không đồng ý, việc thay đổi rất khó. Vì vậy nên rà soát kỹ trước khi ký.',
      },
      {
        question: 'Hợp đồng miệng có giá trị pháp lý không?',
        answer:
          'Có giá trị trong nhiều trường hợp vì Bộ luật Dân sự công nhận hình thức lời nói. Tuy nhiên một số hợp đồng bắt buộc bằng văn bản/công chứng, và hợp đồng miệng khó chứng minh khi tranh chấp.',
      },
      {
        question: 'Mức phạt vi phạm hợp đồng tối đa là bao nhiêu?',
        answer:
          'Với hợp đồng thương mại, mức phạt không vượt quá 8% giá trị phần nghĩa vụ bị vi phạm theo Điều 301 Luật Thương mại 2005, trừ một số trường hợp đặc thù.',
      },
    ],
  },
  {
    slug: 'tu-van-luat-lao-dong-cho-nguoi-lao-dong',
    title: 'Tư vấn luật lao động cho người lao động — Miễn phí lần đầu',
    excerpt:
      'Quyền lợi của người lao động khi bị sa thải, nợ lương hay tranh chấp hợp đồng, và cách bảo vệ mình theo Bộ luật Lao động 2019.',
    keyword: 'tư vấn luật lao động',
    practiceArea: 'lao-dong',
    image: `${IMG}/content/practice-labor-aec105be.webp`,
    updated: '2026-05-24',
    body: `Trong quan hệ lao động, người lao động thường ở thế yếu hơn. Hiểu rõ quyền của mình là cách tốt nhất để tự bảo vệ. Bài viết cung cấp những kiến thức cốt lõi về **tư vấn luật lao động** cho người lao động.

## Quyền cơ bản của người lao động

Bộ luật Lao động 2019 bảo vệ nhiều quyền quan trọng:

- Được trả **lương đầy đủ, đúng hạn** (Điều 94);
- Được làm việc trong điều kiện **an toàn**;
- Được tham gia **bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp**;
- Được **đơn phương chấm dứt hợp đồng** đúng luật mà không cần lý do (với hợp đồng không xác định thời hạn, chỉ cần báo trước theo quy định).

## Khi bị sa thải trái luật

Đây là tình huống phổ biến nhất. Nếu người sử dụng lao động đơn phương chấm dứt hợp đồng **trái pháp luật**, theo Điều 41 Bộ luật Lao động 2019, họ phải:

1. **Nhận bạn trở lại** làm việc;
2. Trả **tiền lương** cho những ngày bạn không được làm việc;
3. Trả thêm **ít nhất 2 tháng tiền lương** theo hợp đồng.

Nếu bạn không muốn quay lại, còn được nhận thêm trợ cấp thôi việc và khoản bồi thường.

## Khi bị nợ lương

Bạn có quyền yêu cầu thanh toán đầy đủ. Nếu công ty cố tình không trả, bạn có thể:

- Khiếu nại với ban lãnh đạo công ty;
- Yêu cầu hòa giải viên lao động;
- Khởi kiện ra Tòa án.

## Trình tự giải quyết tranh chấp lao động

Theo Điều 188 Bộ luật Lao động 2019, phần lớn tranh chấp lao động cá nhân phải qua **hòa giải của hòa giải viên lao động** trước khi khởi kiện. Tuy nhiên, một số tranh chấp được khởi kiện thẳng ra Tòa án, gồm:

- Tranh chấp về **xử lý kỷ luật sa thải**;
- Tranh chấp về **đơn phương chấm dứt hợp đồng**;
- Tranh chấp về **bồi thường thiệt hại, trợ cấp** khi chấm dứt hợp đồng;
- Tranh chấp về **bảo hiểm xã hội, bảo hiểm thất nghiệp**.

## Chứng cứ cần thu thập

- Hợp đồng lao động;
- Bảng lương, sao kê chuyển khoản lương;
- Quyết định sa thải/chấm dứt hợp đồng (nếu có);
- Tin nhắn, email trao đổi với công ty.

Luật sư giúp bạn hệ thống hóa chứng cứ và xác định đúng trình tự khởi kiện.

## Người lao động có nên thuê luật sư?

Nhiều người lao động e ngại chi phí, nhưng buổi tư vấn lần đầu là miễn phí. Quan trọng hơn, một khoản bồi thường được đòi đúng có thể lớn gấp nhiều lần phí dịch vụ. Bạn không đơn độc trong cuộc chiến đòi quyền lợi.

Đang gặp rắc rối với công ty? Gửi câu hỏi ngay — luật sư lao động của Apolo sẽ tư vấn miễn phí và đứng về phía bạn.`,
    faqs: [
      {
        question: 'Bị sa thải trái luật được bồi thường bao nhiêu?',
        answer:
          'Theo Điều 41 Bộ luật Lao động 2019, ngoài việc được nhận lại làm việc và trả lương những ngày nghỉ, bạn còn được trả thêm ít nhất 2 tháng tiền lương theo hợp đồng.',
      },
      {
        question: 'Tranh chấp lao động có phải hòa giải trước không?',
        answer:
          'Phần lớn phải qua hòa giải viên lao động. Tuy nhiên tranh chấp về sa thải, đơn phương chấm dứt hợp đồng, bảo hiểm xã hội được khởi kiện thẳng ra Tòa theo Điều 188 Bộ luật Lao động 2019.',
      },
      {
        question: 'Tôi nghỉ việc rồi có còn đòi được lương không?',
        answer:
          'Có. Quyền được trả lương đầy đủ không mất đi khi bạn nghỉ việc. Bạn vẫn có thể khởi kiện đòi lương và các khoản chưa thanh toán trong thời hiệu luật định.',
      },
    ],
  },
  {
    slug: 'tu-van-luat-doanh-nghiep-online',
    title: 'Tư vấn luật doanh nghiệp online — Nhanh và chuyên nghiệp',
    excerpt:
      'Dịch vụ tư vấn pháp luật doanh nghiệp trực tuyến: thành lập công ty, pháp chế, hợp đồng và giải quyết tranh chấp theo Luật Doanh nghiệp 2020.',
    keyword: 'tư vấn luật doanh nghiệp',
    practiceArea: 'doanh-nghiep',
    image: `${IMG}/content/practice-corporate-5f2c5501.webp`,
    updated: '2026-05-20',
    body: `Doanh nghiệp vận hành nhanh và mọi quyết định đều có hệ quả pháp lý. **Tư vấn luật doanh nghiệp online** giúp chủ doanh nghiệp tiếp cận hỗ trợ pháp lý kịp thời mà không gián đoạn công việc.

## Tư vấn doanh nghiệp online gồm những gì?

- **Thành lập doanh nghiệp**: chọn loại hình, ngành nghề, soạn hồ sơ, đăng ký kinh doanh;
- **Pháp chế thường xuyên**: rà soát hợp đồng, quy chế nội bộ, tư vấn định kỳ;
- **Lao động**: soạn hợp đồng lao động, nội quy, xử lý kỷ luật đúng Bộ luật Lao động 2019;
- **Tranh chấp thương mại**: đàm phán, hòa giải, khởi kiện, thu hồi công nợ.

## Chọn loại hình doanh nghiệp phù hợp

Theo Luật Doanh nghiệp 2020, có các loại hình chính:

### Công ty TNHH một thành viên
Do một cá nhân hoặc tổ chức làm chủ, chịu trách nhiệm trong phạm vi vốn điều lệ. Quản trị đơn giản.

### Công ty TNHH hai thành viên trở lên
Từ 2 đến 50 thành viên. Phù hợp doanh nghiệp gia đình hoặc nhóm nhỏ.

### Công ty cổ phần
Vốn chia thành cổ phần, dễ huy động vốn và có thể niêm yết. Phù hợp doanh nghiệp có kế hoạch mở rộng lớn.

### Doanh nghiệp tư nhân
Do một cá nhân làm chủ và chịu trách nhiệm vô hạn bằng toàn bộ tài sản.

Luật sư phân tích ưu nhược điểm để bạn chọn loại hình tối ưu cho mục tiêu kinh doanh.

## Về vốn điều lệ

Luật Doanh nghiệp 2020 **không quy định mức vốn điều lệ tối thiểu** cho phần lớn ngành nghề — doanh nghiệp tự kê khai và chịu trách nhiệm. Tuy nhiên, một số ngành nghề kinh doanh có điều kiện yêu cầu vốn pháp định. Luật sư giúp bạn xác định mức vốn hợp lý, cân đối giữa uy tín và nghĩa vụ thuế.

## Vì sao cần pháp chế thường xuyên?

Nhiều doanh nghiệp chỉ tìm luật sư khi đã có tranh chấp. Dịch vụ pháp chế thường xuyên giúp **phòng ngừa** rủi ro:

- Rà soát hợp đồng trước khi ký, tránh điều khoản bất lợi;
- Đảm bảo tuân thủ quy định lao động, thuế;
- Xây dựng quy chế nội bộ chặt chẽ;
- Cảnh báo sớm các thay đổi pháp luật ảnh hưởng đến doanh nghiệp.

Chi phí phòng ngừa luôn thấp hơn nhiều so với chi phí xử lý tranh chấp.

## Giải quyết tranh chấp thương mại

Khi tranh chấp xảy ra, luật sư hỗ trợ:

1. Đàm phán, thương lượng để giữ quan hệ đối tác;
2. Hòa giải hoặc đưa ra Trọng tài thương mại;
3. Khởi kiện ra Tòa án và yêu cầu thi hành án.

## Bắt đầu ngay hôm nay

Dù bạn đang chuẩn bị thành lập công ty hay cần xử lý một hợp đồng gấp, tư vấn online giúp bạn tiết kiệm thời gian quý báu. Gửi câu hỏi — luật sư doanh nghiệp của Apolo sẽ phản hồi nhanh chóng.`,
    faqs: [
      {
        question: 'Thành lập công ty online mất bao lâu?',
        answer:
          'Thủ tục đăng ký doanh nghiệp thường hoàn tất trong 3–5 ngày làm việc kể từ khi hồ sơ hợp lệ. Luật sư giúp chuẩn bị hồ sơ chính xác để tránh bị trả lại, rút ngắn thời gian.',
      },
      {
        question: 'Vốn điều lệ tối thiểu là bao nhiêu?',
        answer:
          'Luật Doanh nghiệp 2020 không quy định mức tối thiểu cho phần lớn ngành nghề. Tuy nhiên một số ngành kinh doanh có điều kiện yêu cầu vốn pháp định cụ thể.',
      },
      {
        question: 'Doanh nghiệp nhỏ có cần luật sư riêng không?',
        answer:
          'Không nhất thiết phải có luật sư riêng. Dịch vụ pháp chế theo gói hoặc theo vụ việc phù hợp và tiết kiệm cho doanh nghiệp vừa và nhỏ.',
      },
    ],
  },
  {
    slug: 'luat-su-hinh-su-tu-van-khan-cap',
    title: 'Luật sư hình sự — Tư vấn khẩn cấp 24/7',
    excerpt:
      'Khi người thân bị tạm giữ hay khởi tố, mỗi giờ đều quan trọng. Quyền có luật sư bào chữa và những việc cần làm ngay.',
    keyword: 'luật sư hình sự',
    practiceArea: 'hinh-su',
    image: `${IMG}/content/practice-criminal-59f8f545.webp`,
    updated: '2026-05-26',
    body: `Khi người thân bất ngờ bị tạm giữ hay khởi tố, gia đình thường hoảng loạn và không biết làm gì. Trong các vụ án hình sự, **sự có mặt sớm của luật sư hình sự** có thể tạo ra khác biệt lớn. Đây là những điều bạn cần biết ngay.

## Quyền có luật sư bào chữa

Đây là quyền hiến định và được bảo đảm. Theo Điều 16 Bộ luật Tố tụng Hình sự 2015, người bị buộc tội có quyền tự bào chữa hoặc nhờ người khác bào chữa. Quan trọng hơn, theo Điều 74, **luật sư có thể tham gia bào chữa từ khi người bị buộc tội bị bắt, tạm giữ** — tức ngay từ giai đoạn sớm nhất.

Việc mời luật sư sớm giúp:

- Bảo đảm các quyền tố tụng được tôn trọng;
- Tránh việc khai báo bất lợi do thiếu hiểu biết;
- Có người theo sát quá trình điều tra.

## Những việc gia đình nên làm ngay

1. **Giữ bình tĩnh** và thu thập thông tin: ai bắt, vì lý do gì, đang giữ ở đâu.
2. **Liên hệ luật sư hình sự** càng sớm càng tốt — kể cả ngoài giờ.
3. **Không tự ý &ldquo;chạy án&rdquo;** hay đưa tiền cho người lạ — đây là hành vi vi phạm pháp luật và rất rủi ro.
4. **Chuẩn bị giấy tờ nhân thân** của người bị tạm giữ.

## Tạm giữ, tạm giam và bảo lĩnh

### Tạm giữ
Là biện pháp ngăn chặn ngắn hạn. Thời hạn tạm giữ không quá 3 ngày, có thể gia hạn theo Điều 118 Bộ luật Tố tụng Hình sự 2015.

### Bảo lĩnh để tại ngoại
Theo Điều 121 Bộ luật Tố tụng Hình sự 2015, bảo lĩnh là biện pháp thay thế tạm giam. Cá nhân đủ điều kiện hoặc tổ chức có thể đứng ra bảo lĩnh, cam kết không để bị can bỏ trốn. Luật sư giúp đánh giá khả năng và chuẩn bị hồ sơ đề nghị bảo lĩnh.

## Luật sư làm gì trong vụ án hình sự?

- **Giai đoạn điều tra**: tham gia hỏi cung, bảo vệ quyền của bị can, thu thập chứng cứ gỡ tội.
- **Giai đoạn truy tố**: nghiên cứu hồ sơ, đưa ra ý kiến.
- **Giai đoạn xét xử**: xây dựng luận cứ bào chữa, đề nghị áp dụng tình tiết giảm nhẹ.

## Tình tiết giảm nhẹ trách nhiệm hình sự

Điều 51 Bộ luật Hình sự 2015 quy định nhiều tình tiết giảm nhẹ như: thành khẩn khai báo, ăn năn hối cải, tự nguyện bồi thường, phạm tội lần đầu thuộc trường hợp ít nghiêm trọng... Luật sư giúp làm rõ và đề xuất áp dụng các tình tiết này để hướng tới mức án công bằng nhất.

## Đừng chậm trễ — hãy hành động ngay

Trong án hình sự, thời gian là yếu tố sống còn. Càng để lâu, càng khó bảo vệ quyền lợi. Nếu người thân của bạn đang gặp rắc rối với pháp luật, hãy gọi ngay tổng đài hoặc gửi câu hỏi khẩn cấp — luật sư hình sự của Apolo hỗ trợ 24/7.`,
    faqs: [
      {
        question: 'Người bị bắt được mời luật sư từ khi nào?',
        answer:
          'Ngay từ khi bị bắt, tạm giữ. Theo Điều 74 Bộ luật Tố tụng Hình sự 2015, luật sư được tham gia bào chữa từ giai đoạn sớm nhất để bảo vệ quyền lợi của người bị buộc tội.',
      },
      {
        question: 'Làm sao để người thân được tại ngoại?',
        answer:
          'Có thể đề nghị áp dụng biện pháp bảo lĩnh theo Điều 121 Bộ luật Tố tụng Hình sự 2015. Luật sư đánh giá điều kiện và chuẩn bị hồ sơ đề nghị thay đổi biện pháp ngăn chặn.',
      },
      {
        question: 'Có luật sư thì án có nhẹ hơn không?',
        answer:
          'Luật sư không thể hứa kết quả, nhưng bào chữa chuyên nghiệp giúp làm rõ tình tiết giảm nhẹ (Điều 51 Bộ luật Hình sự 2015) và bảo đảm tố tụng đúng luật, hướng tới mức án công bằng nhất.',
      },
    ],
  },
  ...(EXTRA as SeoArticle[]),
]

export function getArticle(slug: string): SeoArticle | undefined {
  return SEO_ARTICLES.find((a) => a.slug === slug)
}
