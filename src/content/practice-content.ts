import type { FaqItem } from '@/components/FaqAccordion'

/**
 * Per-practice-area landing copy (PRD §3 practice-area page spec).
 * Real Vietnamese conversion copy: hero headline/sub, "why act" points, 3–5
 * FAQs with statutory citations, and a closing reassurance line.
 */
export interface PracticeContent {
  heroHeadline: string
  heroSub: string
  /** intro paragraph under the form section */
  intro: string
  /** 3-4 trust/why-act bullets */
  whyPoints: string[]
  /** common situations we handle */
  situations: { title: string; desc: string }[]
  faqs: FaqItem[]
}

export const PRACTICE_CONTENT: Record<string, PracticeContent> = {
  'tu-van-ly-hon': {
    heroHeadline: 'Tư vấn ly hôn nhanh chóng, kín đáo và đúng luật',
    heroSub:
      'Ly hôn thuận tình hay đơn phương, chia tài sản, giành quyền nuôi con — luật sư đồng hành cùng bạn từng bước, bảo vệ tối đa quyền lợi.',
    intro:
      'Ly hôn là quyết định khó khăn về cả pháp lý lẫn cảm xúc. Theo Luật Hôn nhân và Gia đình 2014, vợ chồng có quyền yêu cầu Tòa án giải quyết ly hôn khi đời sống chung không thể kéo dài. Luật sư Apolo giúp bạn chuẩn bị hồ sơ, định hướng phương án chia tài sản chung (Điều 59) và giành quyền nuôi con (Điều 81) một cách thuận lợi nhất.',
    whyPoints: [
      'Tư vấn rõ ràng giữa ly hôn thuận tình và đơn phương, chọn phương án nhanh nhất cho bạn',
      'Bảo vệ quyền nuôi con và cấp dưỡng theo Điều 81, 82 Luật Hôn nhân và Gia đình 2014',
      'Định giá và phân chia tài sản chung công bằng theo nguyên tắc tại Điều 59',
      'Giữ kín mọi thông tin nhạy cảm — tuyệt đối bảo mật',
    ],
    situations: [
      { title: 'Ly hôn đơn phương', desc: 'Khi một bên không đồng ý ký, luật sư hướng dẫn khởi kiện và chứng minh căn cứ ly hôn.' },
      { title: 'Tranh chấp quyền nuôi con', desc: 'Xây dựng hồ sơ chứng minh điều kiện nuôi con tốt nhất cho con.' },
      { title: 'Chia tài sản chung', desc: 'Xác định tài sản chung – riêng, định giá và đề xuất phương án chia hợp lý.' },
      { title: 'Ly hôn có yếu tố nước ngoài', desc: 'Thủ tục đặc thù khi vợ/chồng ở nước ngoài hoặc kết hôn tại nước ngoài.' },
    ],
    faqs: [
      {
        question: 'Ly hôn đơn phương cần những giấy tờ gì?',
        answer:
          'Bạn cần đơn khởi kiện ly hôn, giấy chứng nhận kết hôn (bản chính), CCCD/hộ khẩu của hai vợ chồng, giấy khai sinh của con và giấy tờ chứng minh tài sản chung. Theo Điều 56 Luật Hôn nhân và Gia đình 2014, Tòa án sẽ giải quyết khi có căn cứ về việc vợ/chồng có hành vi bạo lực hoặc vi phạm nghĩa vụ làm hôn nhân lâm vào tình trạng trầm trọng.',
      },
      {
        question: 'Ly hôn mất bao lâu?',
        answer:
          'Ly hôn thuận tình thường được giải quyết trong 1–2 tháng. Ly hôn đơn phương theo thủ tục tố tụng dân sự (Bộ luật Tố tụng Dân sự 2015) kéo dài khoảng 4–6 tháng, có thể lâu hơn nếu có tranh chấp tài sản phức tạp. Luật sư giúp chuẩn bị hồ sơ đầy đủ để rút ngắn thời gian.',
      },
      {
        question: 'Con dưới 36 tháng tuổi thì ai được nuôi?',
        answer:
          'Theo khoản 3 Điều 81 Luật Hôn nhân và Gia đình 2014, con dưới 36 tháng tuổi được giao cho mẹ trực tiếp nuôi, trừ khi người mẹ không đủ điều kiện hoặc cha mẹ có thỏa thuận khác phù hợp với lợi ích của con.',
      },
      {
        question: 'Tài sản đứng tên một người có phải chia không?',
        answer:
          'Có thể. Tài sản hình thành trong thời kỳ hôn nhân được coi là tài sản chung dù chỉ đứng tên một người (Điều 33 Luật Hôn nhân và Gia đình 2014), trừ khi chứng minh được đó là tài sản riêng. Luật sư sẽ giúp bạn xác định và bảo vệ phần tài sản của mình.',
      },
    ],
  },
  'tu-van-dat-dai': {
    heroHeadline: 'Tư vấn đất đai — sổ đỏ, quy hoạch và tranh chấp',
    heroSub:
      'Tranh chấp ranh giới, chuyển nhượng, thừa kế quyền sử dụng đất hay vướng quy hoạch — luật sư giúp bạn xử lý dứt điểm, bảo vệ quyền lợi.',
    intro:
      'Đất đai là tài sản giá trị lớn nhưng cũng tiềm ẩn nhiều rủi ro pháp lý. Luật Đất đai 2024 (có hiệu lực từ 01/08/2024) đã thay đổi nhiều quy định về cấp Giấy chứng nhận, bồi thường và giải quyết tranh chấp. Luật sư Apolo cập nhật quy định mới nhất, giúp bạn tránh sai sót khi giao dịch và xử lý tranh chấp hiệu quả.',
    whyPoints: [
      'Rà soát pháp lý sổ đỏ, hợp đồng chuyển nhượng trước khi giao dịch',
      'Giải quyết tranh chấp ranh giới, lối đi chung theo Luật Đất đai 2024',
      'Hỗ trợ thủ tục cấp Giấy chứng nhận quyền sử dụng đất (sổ đỏ, sổ hồng)',
      'Tư vấn bồi thường, hỗ trợ tái định cư khi đất bị thu hồi',
    ],
    situations: [
      { title: 'Tranh chấp ranh giới đất', desc: 'Xác định mốc giới, hòa giải tại UBND và khởi kiện khi cần.' },
      { title: 'Mua bán nhà đất an toàn', desc: 'Kiểm tra pháp lý, quy hoạch, soạn hợp đồng đặt cọc và công chứng.' },
      { title: 'Đất không có sổ đỏ', desc: 'Tư vấn điều kiện và thủ tục để được cấp Giấy chứng nhận.' },
      { title: 'Đất dính quy hoạch', desc: 'Xác minh quy hoạch, quyền lợi và phương án xử lý.' },
    ],
    faqs: [
      {
        question: 'Tranh chấp đất đai có bắt buộc hòa giải không?',
        answer:
          'Có. Theo Điều 235 Luật Đất đai 2024, tranh chấp đất đai phải được hòa giải tại UBND cấp xã nơi có đất trước khi khởi kiện ra Tòa án. Đây là thủ tục bắt buộc; nếu bỏ qua, đơn khởi kiện có thể bị trả lại. Luật sư giúp bạn chuẩn bị hồ sơ hòa giải đúng quy định.',
      },
      {
        question: 'Đất không có sổ đỏ có mua bán được không?',
        answer:
          'Theo Điều 45 Luật Đất đai 2024, một trong các điều kiện để chuyển nhượng quyền sử dụng đất là phải có Giấy chứng nhận. Mua bán đất không sổ đỏ tiềm ẩn rủi ro lớn và hợp đồng có thể vô hiệu. Luật sư sẽ tư vấn điều kiện để hợp thức hóa hoặc cấp sổ trước khi giao dịch.',
      },
      {
        question: 'Đất bị thu hồi được bồi thường thế nào?',
        answer:
          'Khi Nhà nước thu hồi đất, người sử dụng đất hợp pháp được bồi thường về đất, tài sản gắn liền với đất và hỗ trợ tái định cư theo các Điều 91–111 Luật Đất đai 2024. Mức bồi thường căn cứ giá đất cụ thể. Luật sư giúp bạn kiểm tra phương án bồi thường và khiếu nại nếu chưa thỏa đáng.',
      },
    ],
  },
  'tu-van-doanh-nghiep': {
    heroHeadline: 'Tư vấn pháp luật doanh nghiệp trọn gói',
    heroSub:
      'Thành lập công ty, thay đổi đăng ký kinh doanh, hợp đồng, lao động và pháp chế nội bộ — đồng hành cùng doanh nghiệp ở mọi giai đoạn.',
    intro:
      'Một nền tảng pháp lý vững chắc giúp doanh nghiệp phát triển bền vững và tránh rủi ro. Theo Luật Doanh nghiệp 2020, doanh nghiệp có quyền tự do kinh doanh trong những ngành nghề pháp luật không cấm. Luật sư Apolo tư vấn từ khâu thành lập, cơ cấu vốn, đến hợp đồng và giải quyết tranh chấp thương mại.',
    whyPoints: [
      'Thành lập doanh nghiệp đúng loại hình theo Luật Doanh nghiệp 2020',
      'Soạn thảo điều lệ, hợp đồng, thỏa thuận cổ đông chặt chẽ',
      'Tư vấn tuân thủ thuế, lao động, bảo hiểm xã hội',
      'Đại diện giải quyết tranh chấp thương mại, thu hồi công nợ',
    ],
    situations: [
      { title: 'Thành lập công ty', desc: 'Chọn loại hình, ngành nghề, soạn hồ sơ và đăng ký kinh doanh.' },
      { title: 'Pháp chế thường xuyên', desc: 'Rà soát hợp đồng, quy chế nội bộ, tư vấn hằng tháng.' },
      { title: 'Tranh chấp hợp đồng', desc: 'Đàm phán, hòa giải, khởi kiện và thi hành án.' },
      { title: 'Tái cấu trúc, M&A', desc: 'Tư vấn sáp nhập, chuyển nhượng vốn, thẩm định pháp lý.' },
    ],
    faqs: [
      {
        question: 'Thành lập công ty cần bao nhiêu vốn?',
        answer:
          'Luật Doanh nghiệp 2020 không quy định mức vốn điều lệ tối thiểu cho phần lớn ngành nghề — doanh nghiệp tự kê khai và chịu trách nhiệm. Tuy nhiên một số ngành nghề có điều kiện yêu cầu vốn pháp định. Luật sư giúp bạn xác định mức vốn phù hợp với ngành nghề và nghĩa vụ thuế.',
      },
      {
        question: 'Nên chọn loại hình công ty TNHH hay cổ phần?',
        answer:
          'Công ty TNHH (1 hoặc 2 thành viên trở lên) phù hợp doanh nghiệp nhỏ, quản trị đơn giản. Công ty cổ phần phù hợp khi cần huy động vốn rộng và có kế hoạch niêm yết. Mỗi loại hình có quy định riêng tại Luật Doanh nghiệp 2020 về cơ cấu tổ chức và chuyển nhượng vốn. Luật sư tư vấn loại hình tối ưu cho mục tiêu của bạn.',
      },
      {
        question: 'Doanh nghiệp có cần luật sư thường xuyên không?',
        answer:
          'Rất nên. Dịch vụ pháp chế thường xuyên giúp doanh nghiệp rà soát hợp đồng, tuân thủ quy định lao động (Bộ luật Lao động 2019), thuế và phòng ngừa tranh chấp trước khi phát sinh. Chi phí phòng ngừa luôn thấp hơn nhiều so với chi phí xử lý tranh chấp.',
      },
    ],
  },
  'tu-van-dan-su': {
    heroHeadline: 'Tư vấn dân sự — đòi nợ, bồi thường, tranh chấp',
    heroSub:
      'Tranh chấp hợp đồng vay, đòi nợ, bồi thường thiệt hại ngoài hợp đồng — luật sư giúp bạn bảo vệ quyền lợi hợp pháp một cách hiệu quả.',
    intro:
      'Các tranh chấp dân sự phát sinh hằng ngày trong giao dịch và đời sống. Bộ luật Dân sự 2015 là nền tảng điều chỉnh quyền và nghĩa vụ của các bên. Luật sư Apolo giúp bạn xác định căn cứ pháp lý, thu thập chứng cứ và lựa chọn con đường giải quyết tối ưu — từ thương lượng đến khởi kiện.',
    whyPoints: [
      'Tư vấn căn cứ pháp lý theo Bộ luật Dân sự 2015',
      'Hỗ trợ đòi nợ hợp pháp, tránh vi phạm pháp luật hình sự',
      'Yêu cầu bồi thường thiệt hại trong và ngoài hợp đồng',
      'Đại diện thương lượng, hòa giải và khởi kiện tại Tòa án',
    ],
    situations: [
      { title: 'Đòi nợ cá nhân', desc: 'Thu thập chứng cứ, gửi yêu cầu và khởi kiện đòi nợ đúng luật.' },
      { title: 'Bồi thường thiệt hại', desc: 'Tai nạn, vi phạm hợp đồng, xâm phạm tài sản, sức khỏe.' },
      { title: 'Tranh chấp vay mượn', desc: 'Hợp đồng vay, lãi suất, thời hiệu khởi kiện.' },
      { title: 'Tranh chấp tài sản', desc: 'Quyền sở hữu, chiếm hữu, đòi lại tài sản.' },
    ],
    faqs: [
      {
        question: 'Cho vay không có giấy tờ thì đòi nợ được không?',
        answer:
          'Vẫn có thể đòi được nếu chứng minh được giao dịch vay tồn tại. Theo Điều 463 Bộ luật Dân sự 2015, hợp đồng vay tài sản không bắt buộc bằng văn bản. Bạn có thể dùng tin nhắn, ghi âm, lịch sử chuyển khoản, người làm chứng làm chứng cứ. Luật sư giúp thu thập và củng cố chứng cứ trước khi khởi kiện.',
      },
      {
        question: 'Thời hiệu khởi kiện tranh chấp dân sự là bao lâu?',
        answer:
          'Theo Điều 429 Bộ luật Dân sự 2015, thời hiệu khởi kiện về hợp đồng là 3 năm kể từ ngày người có quyền biết quyền lợi bị xâm phạm. Với tranh chấp đòi tài sản, một số trường hợp không áp dụng thời hiệu. Luật sư sẽ xác định chính xác thời hiệu cho vụ việc của bạn.',
      },
      {
        question: 'Đòi nợ thế nào để không phạm luật?',
        answer:
          'Tuyệt đối tránh đe dọa, giữ người hoặc cưỡng đoạt tài sản — đây có thể cấu thành tội phạm hình sự. Cách hợp pháp là gửi văn bản yêu cầu trả nợ, thương lượng, rồi khởi kiện ra Tòa án và yêu cầu thi hành án. Luật sư đồng hành để bạn đòi nợ an toàn và hiệu quả.',
      },
    ],
  },
  'tu-van-hinh-su': {
    heroHeadline: 'Luật sư hình sự — bào chữa và bảo vệ 24/7',
    heroSub:
      'Khi người thân bị tạm giữ, khởi tố hay cần bào chữa — mỗi giờ đều quý giá. Luật sư hình sự Apolo hỗ trợ khẩn cấp, bảo vệ quyền lợi tối đa.',
    intro:
      'Trong các vụ án hình sự, sự có mặt sớm của luật sư có thể thay đổi cục diện. Bộ luật Tố tụng Hình sự 2015 quy định người bị buộc tội có quyền tự bào chữa hoặc nhờ luật sư bào chữa ngay từ giai đoạn đầu. Luật sư Apolo tham gia kịp thời để bảo vệ quyền con người và quyền lợi hợp pháp của thân chủ.',
    whyPoints: [
      'Tham gia bào chữa ngay từ giai đoạn tạm giữ, điều tra',
      'Bảo vệ quyền của người bị buộc tội theo Bộ luật Tố tụng Hình sự 2015',
      'Hỗ trợ thủ tục bảo lĩnh, tại ngoại khi đủ điều kiện',
      'Tư vấn khẩn cấp 24/7 cho các vụ việc nóng',
    ],
    situations: [
      { title: 'Người thân bị tạm giữ', desc: 'Hỗ trợ pháp lý khẩn cấp, làm việc với cơ quan điều tra.' },
      { title: 'Bào chữa tại phiên tòa', desc: 'Xây dựng luận cứ, đề nghị giảm nhẹ trách nhiệm hình sự.' },
      { title: 'Bảo lĩnh, tại ngoại', desc: 'Tư vấn điều kiện và thủ tục thay đổi biện pháp ngăn chặn.' },
      { title: 'Bảo vệ bị hại', desc: 'Bảo vệ quyền lợi và yêu cầu bồi thường cho người bị hại.' },
    ],
    faqs: [
      {
        question: 'Khi nào người bị bắt được mời luật sư?',
        answer:
          'Ngay từ khi bị tạm giữ. Theo Điều 16 và Điều 74 Bộ luật Tố tụng Hình sự 2015, người bị buộc tội có quyền nhờ luật sư bào chữa từ giai đoạn sớm nhất. Việc mời luật sư sớm giúp bảo đảm các quyền tố tụng được tôn trọng trong suốt quá trình điều tra.',
      },
      {
        question: 'Bảo lĩnh để được tại ngoại cần điều kiện gì?',
        answer:
          'Bảo lĩnh là biện pháp thay thế tạm giam theo Điều 121 Bộ luật Tố tụng Hình sự 2015. Cá nhân (đủ điều kiện về nhân thân) hoặc tổ chức có thể đứng ra bảo lĩnh, cam kết không để bị can/bị cáo bỏ trốn. Luật sư giúp đánh giá khả năng và chuẩn bị hồ sơ đề nghị bảo lĩnh.',
      },
      {
        question: 'Có luật sư thì hình phạt có nhẹ hơn không?',
        answer:
          'Luật sư không thể hứa kết quả, nhưng việc bào chữa chuyên nghiệp giúp làm rõ tình tiết giảm nhẹ (Điều 51 Bộ luật Hình sự 2015), bảo đảm tố tụng đúng pháp luật và đề xuất mức án công bằng. Sự tham gia của luật sư bảo vệ tối đa quyền lợi hợp pháp của thân chủ.',
      },
    ],
  },
  'tu-van-lao-dong': {
    heroHeadline: 'Tư vấn luật lao động cho người lao động & doanh nghiệp',
    heroSub:
      'Sa thải trái luật, nợ lương, tranh chấp hợp đồng, bảo hiểm xã hội — luật sư giúp bạn đòi lại quyền lợi chính đáng.',
    intro:
      'Quan hệ lao động dễ phát sinh tranh chấp về lương, hợp đồng và chấm dứt việc làm. Bộ luật Lao động 2019 bảo vệ quyền lợi của cả người lao động và người sử dụng lao động. Luật sư Apolo giúp bạn hiểu đúng quyền của mình và xử lý tranh chấp một cách hiệu quả, đúng trình tự.',
    whyPoints: [
      'Tư vấn quyền lợi khi bị sa thải, đơn phương chấm dứt hợp đồng',
      'Đòi lương, trợ cấp thôi việc, trợ cấp mất việc theo Bộ luật Lao động 2019',
      'Giải quyết tranh chấp bảo hiểm xã hội, bảo hiểm thất nghiệp',
      'Hỗ trợ hòa giải lao động và khởi kiện tại Tòa án',
    ],
    situations: [
      { title: 'Bị sa thải trái luật', desc: 'Đánh giá tính hợp pháp và yêu cầu bồi thường, nhận lại việc.' },
      { title: 'Bị nợ lương, trợ cấp', desc: 'Đòi lương, trợ cấp thôi việc và các khoản chưa thanh toán.' },
      { title: 'Tranh chấp hợp đồng', desc: 'Hợp đồng thử việc, thời vụ, không xác định thời hạn.' },
      { title: 'Doanh nghiệp tuân thủ', desc: 'Soạn nội quy, hợp đồng và xử lý kỷ luật đúng luật.' },
    ],
    faqs: [
      {
        question: 'Bị sa thải trái luật thì được bồi thường gì?',
        answer:
          'Theo Điều 41 Bộ luật Lao động 2019, nếu người sử dụng lao động đơn phương chấm dứt hợp đồng trái pháp luật, họ phải nhận người lao động trở lại làm việc, trả tiền lương cho những ngày không được làm việc, cộng ít nhất 2 tháng tiền lương. Luật sư giúp bạn yêu cầu đầy đủ các khoản này.',
      },
      {
        question: 'Công ty nợ lương thì làm thế nào?',
        answer:
          'Bạn có quyền yêu cầu thanh toán đầy đủ và đúng hạn theo Điều 94 Bộ luật Lao động 2019. Nếu công ty không trả, bạn có thể khiếu nại, yêu cầu hòa giải viên lao động, hoặc khởi kiện ra Tòa án. Luật sư hỗ trợ thu thập chứng cứ (hợp đồng, bảng lương) và theo đuổi vụ việc.',
      },
      {
        question: 'Tranh chấp lao động có phải hòa giải trước không?',
        answer:
          'Phần lớn tranh chấp lao động cá nhân phải qua hòa giải của hòa giải viên lao động trước khi khởi kiện, theo Điều 188 Bộ luật Lao động 2019. Tuy nhiên một số trường hợp như sa thải, đơn phương chấm dứt hợp đồng được khởi kiện thẳng ra Tòa án. Luật sư xác định đúng trình tự cho vụ việc của bạn.',
      },
    ],
  },
  'tu-van-thua-ke': {
    heroHeadline: 'Tư vấn thừa kế — di chúc và phân chia di sản',
    heroSub:
      'Lập di chúc hợp pháp, phân chia di sản, giải quyết tranh chấp thừa kế — luật sư giúp gìn giữ hòa khí gia đình và đúng pháp luật.',
    intro:
      'Tranh chấp thừa kế thường nhạy cảm vì liên quan tình thân. Bộ luật Dân sự 2015 quy định rõ về thừa kế theo di chúc và theo pháp luật. Luật sư Apolo giúp bạn lập di chúc chặt chẽ, phân chia di sản công bằng và giải quyết tranh chấp một cách thấu tình đạt lý.',
    whyPoints: [
      'Soạn thảo di chúc hợp pháp, hạn chế tối đa tranh chấp về sau',
      'Phân chia di sản theo di chúc hoặc theo pháp luật (Điều 649–651 BLDS 2015)',
      'Xác định hàng thừa kế và phần thừa kế của từng người',
      'Đại diện giải quyết tranh chấp di sản tại Tòa án',
    ],
    situations: [
      { title: 'Lập di chúc', desc: 'Soạn di chúc đúng hình thức, có công chứng/chứng thực.' },
      { title: 'Khai nhận di sản', desc: 'Thủ tục khai nhận, phân chia di sản tại văn phòng công chứng.' },
      { title: 'Tranh chấp thừa kế', desc: 'Phân chia khi không có di chúc hoặc di chúc bị tranh chấp.' },
      { title: 'Thừa kế có yếu tố nước ngoài', desc: 'Người thừa kế ở nước ngoài, di sản là bất động sản.' },
    ],
    faqs: [
      {
        question: 'Di chúc viết tay có hợp pháp không?',
        answer:
          'Có thể hợp pháp. Theo Điều 633 Bộ luật Dân sự 2015, di chúc bằng văn bản không có người làm chứng phải do người lập tự viết và ký. Tuy nhiên để chắc chắn, nên công chứng hoặc chứng thực di chúc. Luật sư giúp bạn lập di chúc đúng hình thức để tránh bị tuyên vô hiệu.',
      },
      {
        question: 'Không có di chúc thì di sản chia thế nào?',
        answer:
          'Khi không có di chúc, di sản được chia theo pháp luật theo thứ tự hàng thừa kế tại Điều 651 Bộ luật Dân sự 2015. Hàng thứ nhất gồm vợ/chồng, cha mẹ, con của người chết — những người cùng hàng được hưởng phần bằng nhau. Luật sư giúp xác định đúng hàng thừa kế và phần của mỗi người.',
      },
      {
        question: 'Con riêng có được thừa kế không?',
        answer:
          'Có. Con đẻ (kể cả con riêng, con ngoài giá thú đã được xác định cha/mẹ) đều thuộc hàng thừa kế thứ nhất theo Điều 651 Bộ luật Dân sự 2015 và được hưởng phần như con trong giá thú. Luật sư hỗ trợ thủ tục xác định quan hệ cha con/mẹ con nếu cần.',
      },
    ],
  },
  'tu-van-hop-dong': {
    heroHeadline: 'Tư vấn hợp đồng — soạn thảo, rà soát, tranh chấp',
    heroSub:
      'Một hợp đồng chặt chẽ giúp bạn tránh rủi ro tiền tỷ. Luật sư rà soát, soạn thảo và xử lý tranh chấp hợp đồng nhanh, chính xác.',
    intro:
      'Hợp đồng là xương sống của mọi giao dịch. Bộ luật Dân sự 2015 quy định nguyên tắc giao kết và thực hiện hợp đồng. Một điều khoản sơ hở có thể khiến bạn mất quyền lợi hoặc gánh trách nhiệm không đáng có. Luật sư Apolo giúp bạn kiểm soát rủi ro pháp lý ngay từ khâu soạn thảo.',
    whyPoints: [
      'Soạn thảo hợp đồng chặt chẽ, đầy đủ điều khoản bảo vệ quyền lợi',
      'Rà soát hợp đồng trước khi ký, cảnh báo điều khoản bất lợi',
      'Tư vấn điều kiện có hiệu lực của hợp đồng (Điều 117 BLDS 2015)',
      'Giải quyết tranh chấp do vi phạm hợp đồng, yêu cầu bồi thường',
    ],
    situations: [
      { title: 'Soạn thảo hợp đồng', desc: 'Hợp đồng mua bán, dịch vụ, hợp tác, thuê, vay...' },
      { title: 'Rà soát hợp đồng', desc: 'Phát hiện rủi ro, đề xuất sửa đổi trước khi ký.' },
      { title: 'Tranh chấp vi phạm', desc: 'Yêu cầu phạt vi phạm, bồi thường, hủy hợp đồng.' },
      { title: 'Hợp đồng vô hiệu', desc: 'Xử lý hậu quả khi hợp đồng bị tuyên vô hiệu.' },
    ],
    faqs: [
      {
        question: 'Hợp đồng cần điều kiện gì để có hiệu lực?',
        answer:
          'Theo Điều 117 Bộ luật Dân sự 2015, hợp đồng có hiệu lực khi: chủ thể có năng lực pháp luật và hành vi dân sự; tham gia hoàn toàn tự nguyện; mục đích và nội dung không vi phạm điều cấm, không trái đạo đức xã hội; và tuân thủ hình thức luật định (nếu có). Luật sư giúp đảm bảo hợp đồng của bạn đáp ứng đầy đủ.',
      },
      {
        question: 'Bên kia vi phạm hợp đồng thì xử lý thế nào?',
        answer:
          'Khi một bên vi phạm, bạn có thể yêu cầu tiếp tục thực hiện, phạt vi phạm (nếu có thỏa thuận) và bồi thường thiệt hại theo Điều 418 và Điều 419 Bộ luật Dân sự 2015. Trong hợp đồng thương mại, mức phạt vi phạm không quá 8% giá trị phần nghĩa vụ bị vi phạm (Luật Thương mại 2005). Luật sư giúp bạn yêu cầu đúng và đủ.',
      },
      {
        question: 'Hợp đồng miệng có giá trị pháp lý không?',
        answer:
          'Có giá trị trong nhiều trường hợp, vì Bộ luật Dân sự 2015 công nhận hình thức hợp đồng bằng lời nói (Điều 119). Tuy nhiên một số hợp đồng bắt buộc bằng văn bản, công chứng (như chuyển nhượng bất động sản). Hợp đồng miệng khó chứng minh khi tranh chấp — luật sư khuyến nghị lập văn bản và giúp thu thập chứng cứ.',
      },
    ],
  },
}

export function getPracticeContent(slug: string): PracticeContent | undefined {
  return PRACTICE_CONTENT[slug]
}
